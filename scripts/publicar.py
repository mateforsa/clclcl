#!/usr/bin/env python3
"""Publica un reel propio en Instagram.

  python3 scripts/publicar.py <slug> --simular     -> valida y muestra todo lo que haría, sin tocar Instagram
  python3 scripts/publicar.py <slug>               -> valida, muestra y pide que escribas PUBLICAR <slug>
  python3 scripts/publicar.py <slug> --prueba      -> lo manda como reel de prueba (solo a no seguidores)
  python3 scripts/publicar.py <slug> --confirmado  -> sin pregunta; solo para la cola programada (instagram/cola.json)

Toma out/<slug>/<slug>.mp4, instagram/portadas/<slug>.jpg y el bloque "Descripción de Instagram" de
videos/<slug>/guion.md. Sube el video con subida reanudable (rupload.facebook.com), espera FINISHED y publica.
"""
import datetime as dt, json, os, re, subprocess, sys, time
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import meta_api as m
import requests

ROOT = m.ROOT
args = [a for a in sys.argv[1:] if not a.startswith("--")]; flags = {a for a in sys.argv[1:] if a.startswith("--")}
if len(args) != 1: sys.exit(__doc__)
SLUG = args[0]; SIM = "--simular" in flags; PRUEBA = "--prueba" in flags
MP4 = f"{ROOT}/out/{SLUG}/{SLUG}.mp4"; PORTADA = f"instagram/portadas/{SLUG}.jpg"; REG = f"{ROOT}/instagram/publicados.json"


def descripcion():
    g = open(f"{ROOT}/videos/{SLUG}/guion.md").read()
    mm = re.search(r"^## Descripción de Instagram\s*\n(.*?)(?=^## |\Z)", g, re.S | re.M)
    if not mm: return None
    b = re.search(r"```[a-z]*\n(.*?)```", mm.group(1), re.S)
    return (b.group(1) if b else mm.group(1)).strip()


def validar():
    """Devuelve (errores, avisos, datos). Especificaciones de Reels según la referencia de Meta (IG User Media)."""
    err, av, d = [], [], {}
    if not os.path.exists(MP4): return [f"no existe out/{SLUG}/{SLUG}.mp4 (out/ no está en git: corré scripts/render.sh {SLUG})"], av, d
    p = json.loads(subprocess.run(["ffprobe", "-v", "error", "-show_streams", "-show_format", "-of", "json", MP4], capture_output=True, text=True).stdout)
    v = next((s for s in p["streams"] if s["codec_type"] == "video"), None); a = next((s for s in p["streams"] if s["codec_type"] == "audio"), None)
    if not v: return ["el archivo no tiene video"], av, d
    num, den = (int(x) for x in v["r_frame_rate"].split("/")); fps = num / den
    d = {"resolución": f"{v['width']}x{v['height']}", "duración_s": round(float(p["format"]["duration"]), 1), "fps": round(fps, 2), "video": v["codec_name"],
         "pix_fmt": v.get("pix_fmt"), "audio": a and f"{a['codec_name']} {a.get('sample_rate')} Hz {a.get('channels')} canales", "tamaño_MB": round(os.path.getsize(MP4) / 1e6, 1)}
    if (v["width"], v["height"]) != (1080, 1920): err.append(f"resolución {d['resolución']}, tiene que ser 1080x1920")
    if not 3 <= d["duración_s"] <= 900: err.append(f"duración {d['duración_s']} s, Meta acepta de 3 s a 15 min")
    if d["duración_s"] > 180: av.append(f"dura {d['duración_s']} s: el objetivo del canal es 45 a 70 s")
    if v["codec_name"] not in ("h264", "hevc"): err.append(f"códec de video {v['codec_name']}, tiene que ser H264 o HEVC")
    if v.get("pix_fmt") not in ("yuv420p", "yuvj420p"): err.append(f"formato de color {v.get('pix_fmt')}, tiene que ser 4:2:0")
    if not 23 <= fps <= 60: err.append(f"{fps:.0f} cuadros por segundo, tiene que estar entre 23 y 60")
    if not a: err.append("no tiene audio")
    elif a["codec_name"] != "aac" or int(a.get("sample_rate", 0)) > 48000 or a.get("channels") not in (1, 2): err.append(f"audio {d['audio']}, tiene que ser AAC hasta 48 kHz, mono o estéreo")
    if d["tamaño_MB"] > 300: err.append(f"pesa {d['tamaño_MB']} MB, el máximo es 300")
    with open(MP4, "rb") as f: cab = f.read(4096)
    if b"moov" not in cab: av.append("el índice (moov) no está al principio del archivo; render.sh lo deja bien con +faststart")
    desc = descripcion()
    if not desc: err.append('guion.md no tiene el bloque "## Descripción de Instagram"'); return err, av, d
    tags = re.findall(r"#\w+", desc); d["descripción"] = desc; d["etiquetas"] = tags
    if len(tags) != 5: err.append(f"la descripción tiene {len(tags)} etiquetas, tienen que ser 5")
    if len(desc) > 2200: err.append(f"la descripción tiene {len(desc)} caracteres, el máximo es 2.200")
    if not os.path.exists(f"{ROOT}/{PORTADA}"): err.append(f"falta la portada {PORTADA}")
    else:
        rama = m.CFG["rama_portadas"]
        en_remoto = subprocess.run(["git", "-C", ROOT, "ls-tree", "-r", "--name-only", f"origin/{rama}", "--", PORTADA], capture_output=True, text=True).stdout.strip()
        if not en_remoto: err.append(f"la portada no está subida a origin/{rama}: Meta la descarga desde una URL pública, hacé commit y push")
        d["cover_url"] = f"https://raw.githubusercontent.com/{m.CFG['repo']}/{rama}/{PORTADA}"
    ya = [x for x in (json.load(open(REG)) if os.path.exists(REG) else []) if x["slug"] == SLUG]
    if any(bool(x.get("prueba")) == PRUEBA for x in ya): err.append("ese slug ya figura publicado " + ("como reel de prueba" if PRUEBA else "") + " en instagram/publicados.json")
    return err, av, d


def publicar(d):
    ig = m.ig_id()
    lim = m.get(f"{ig}/content_publishing_limit", fields="quota_usage,config")["data"][0]
    print(f"Límite de Meta: {lim.get('quota_usage')} de {lim.get('config', {}).get('quota_total')} publicaciones en 24 h")
    datos = {"media_type": "REELS", "upload_type": "resumable", "caption": d["descripción"], "cover_url": d["cover_url"], "share_to_feed": "true"}
    if PRUEBA: datos["trial_params"] = json.dumps({"graduation_strategy": "MANUAL"})
    c = m.post(f"{ig}/media", **datos); cid, uri = c["id"], c["uri"]
    print("Contenedor creado:", cid)
    tam = os.path.getsize(MP4)
    # Subida con curl, con el formato exacto de la documentación de Meta.
    cab = [x for k, v in m._headers({"offset": "0", "file_size": str(tam)}, upload=True).items() for x in ("-H", f"{k}: {v}")]
    ok, r = False, None
    for intento in range(6):  # el contenedor tarda unos segundos en aceptar la subida: si se manda enseguida, falla
        time.sleep(15)
        r = subprocess.run(["curl", "-sS", "-m", "900", "-X", "POST", uri, *cab, "--data-binary", f"@{MP4}"], capture_output=True, text=True)
        try: ok = json.loads(r.stdout).get("success")
        except ValueError: ok = False
        if ok: break
    if not ok: raise m.MetaError(f"la subida falló tras 6 intentos: {(r.stdout or r.stderr)[:300]}")
    print("Video subido:", round(tam / 1e6, 1), "MB")
    for _ in range(60):
        st = m.get(cid, fields="status_code,status").get("status_code")
        if st == "FINISHED": break
        if st in ("ERROR", "EXPIRED"): raise m.MetaError(f"el contenedor quedó en {st}: {m.get(cid, fields='status').get('status')}")
        time.sleep(10)
    else: raise m.MetaError("el video no terminó de procesarse en 10 minutos; el contenedor sigue vivo 24 h, reintentá")
    mid = m.post(f"{ig}/media_publish", creation_id=cid)["id"]
    link = m.get(mid, fields="permalink").get("permalink")
    reg = json.load(open(REG)) if os.path.exists(REG) else []
    reg.append({"slug": SLUG, "id": mid, "fecha": dt.datetime.now(dt.timezone.utc).isoformat(timespec="seconds"), "link": link, "prueba": PRUEBA})
    json.dump(reg, open(REG, "w"), ensure_ascii=False, indent=1)
    print("PUBLICADO:", link)


err, av, d = validar()
print(f"== {SLUG} ==" + ("  [SIMULACIÓN: no se publica nada]" if SIM else ""))
for k in ("resolución", "duración_s", "fps", "video", "pix_fmt", "audio", "tamaño_MB", "cover_url"):
    if k in d: print(f"  {k}: {d[k]}")
if "descripción" in d: print("  etiquetas:", " ".join(d["etiquetas"])); print("  descripción:\n" + "\n".join("    | " + l for l in d["descripción"].splitlines()))
for a in av: print("  AVISO:", a)
for e in err: print("  ERROR:", e)
if err: sys.exit("No se publica: hay errores.")
print("  modo:", "reel de prueba (solo no seguidores, se gradúa a mano)" if PRUEBA else "reel normal, también en el feed")
if SIM:
    print("\nPasos que haría:\n  1. POST /<ig>/media (media_type=REELS, upload_type=resumable, caption, cover_url" + (", trial_params" if PRUEBA else "") + ")"
          f"\n  2. POST rupload.facebook.com/ig-api-upload/{m.VER}/<contenedor> con el MP4 ({d['tamaño_MB']} MB)"
          "\n  3. GET /<contenedor>?fields=status_code hasta FINISHED\n  4. POST /<ig>/media_publish\n  5. Anotar slug, id, fecha y link en instagram/publicados.json")
    sys.exit(0)
if "--confirmado" not in flags:
    if input(f"\nEscribí PUBLICAR {SLUG} para subirlo a Instagram: ").strip() != f"PUBLICAR {SLUG}": sys.exit("Cancelado.")
try: publicar(d)
except m.MetaError as e: sys.exit(f"Error de Meta: {e}")
