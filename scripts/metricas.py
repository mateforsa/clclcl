#!/usr/bin/env python3
"""Métricas de los reels propios.

  python3 scripts/metricas.py            -> guarda la foto de las 48 h y la de los 7 días de cada reel que ya la cumplió
  python3 scripts/metricas.py --importar -> suma a instagram/publicados.json los reels subidos a mano (los empareja por la primera línea)
  python3 scripts/metricas.py --informe  -> informe semanal: qué gancho, tema y duración rindió mejor contra el promedio

Datos en instagram/metricas.json. Métricas de Meta para reels: views, reach, ig_reels_avg_watch_time (ms),
shares, saved, likes, comments, total_interactions, reposts.
"""
import datetime as dt, glob, json, os, re, statistics, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import meta_api as m

ROOT = m.ROOT; REG = f"{ROOT}/instagram/publicados.json"; MET = f"{ROOT}/instagram/metricas.json"
METRICAS = "views,reach,ig_reels_avg_watch_time,ig_reels_video_view_total_time,shares,saved,likes,comments,total_interactions,reposts"
CORTES = {"48h": 48, "7d": 168}
leer = lambda p, d: json.load(open(p)) if os.path.exists(p) else d
AHORA = dt.datetime.now(dt.timezone.utc)


def primera_linea(slug):
    try: g = open(f"{ROOT}/videos/{slug}/guion.md").read()
    except OSError: return None
    b = re.search(r"^## Descripción de Instagram\s*\n.*?```[a-z]*\n(.*?)```", g, re.S | re.M)
    return b.group(1).strip().splitlines()[0].strip() if b else None


def importar():
    reg = leer(REG, []); ids = {x["id"] for x in reg}
    clave = lambda t: re.sub(r"[^a-z0-9áéíóúñ]", "", (t or "").lower())[:45]
    lineas = {clave(primera_linea(os.path.basename(os.path.dirname(p)))): os.path.basename(os.path.dirname(p)) for p in glob.glob(f"{ROOT}/videos/*/guion.md")}
    try:  # descripciones de la primera tanda, guardadas aparte
        for slug, txt in re.findall(r"\(`([a-z0-9-]+?)(?:-v2)?\.mp4`\)\s*```\n(.*?)```", open(f"{ROOT}/instagram/descripciones.md").read(), re.S):
            lineas.setdefault(clave(txt.strip().splitlines()[0]), slug)
    except OSError: pass
    lineas.pop("", None)
    j = m.get(f"{m.ig_id()}/media", fields="id,caption,permalink,timestamp,media_product_type", limit=100); n = 0
    for x in j.get("data", []):
        if x["id"] in ids or x.get("media_product_type") != "REELS": continue
        l1 = (x.get("caption") or "").strip().splitlines()[0].strip() if x.get("caption") else ""
        slug = lineas.get(clave(l1))
        reg.append({"slug": slug or "(sin emparejar)", "id": x["id"], "fecha": x["timestamp"], "link": x.get("permalink"), "prueba": False, "importado": True}); n += 1
    json.dump(reg, open(REG, "w"), ensure_ascii=False, indent=1); print(f"{n} reels importados a instagram/publicados.json")


def medir():
    reg = leer(REG, []); met = leer(MET, {}); n = 0
    for x in reg:
        f = dt.datetime.fromisoformat(x["fecha"].replace("+0000", "+00:00")); horas = (AHORA - f).total_seconds() / 3600
        fotos = met.setdefault(x["id"], {"slug": x["slug"], "link": x.get("link"), "publicado": x["fecha"]})
        for nombre, h in CORTES.items():
            if horas < h or nombre in fotos: continue
            try: d = m.get(f"{x['id']}/insights", metric=METRICAS)["data"]
            except m.MetaError as e: print(f"  {x['slug']}: {e}"); continue
            v = {i["name"]: (i.get("values") or [{}])[0].get("value", i.get("total_value", {}).get("value")) for i in d}
            fotos[nombre] = {"tomada": AHORA.isoformat(timespec="seconds"), "horas_reales": round(horas), "vistas": v.get("views"), "alcance": v.get("reach"),
                             "tiempo_promedio_s": round((v.get("ig_reels_avg_watch_time") or 0) / 1000, 1), "compartidos": v.get("shares"), "guardados": v.get("saved"),
                             "me_gusta": v.get("likes"), "comentarios": v.get("comments"), "reposteos": v.get("reposts")}; n += 1
    json.dump(met, open(MET, "w"), ensure_ascii=False, indent=1); print(f"{n} fotos nuevas guardadas en instagram/metricas.json")


def informe():
    met = leer(MET, {}); usados = {u["video"]: u for u in leer(f"{ROOT}/instagram/hooks_used.json", [])}; filas = []
    for mid, f in met.items():
        s = f.get("7d") or f.get("48h")
        if not s or not s.get("vistas"): continue
        try: dur = json.load(open(f"{ROOT}/videos/{f['slug']}/timing.json"))["duration"]
        except OSError: dur = None
        u = usados.get(f["slug"], {}); alc = s.get("alcance") or s["vistas"]
        filas.append({"slug": f["slug"], "vistas": s["vistas"], "envíos_x1000": round(1000 * (s.get("compartidos") or 0) / alc, 1), "tiempo": s.get("tiempo_promedio_s"),
                      "retención": round(100 * s["tiempo_promedio_s"] / dur) if dur and s.get("tiempo_promedio_s") else None, "duración": dur,
                      "inicio": (u.get("inicio") or "sin dato")[:40], "cierre": (u.get("cierre") or "sin dato")[:40],
                      "tramo": "sin dato" if not dur else "hasta 70 s" if dur <= 70 else "70 a 150 s" if dur <= 150 else "más de 150 s"})
    if not filas: print("Todavía no hay reels con métricas. Corré antes: python3 scripts/metricas.py"); return
    prom = statistics.mean(x["vistas"] for x in filas)
    L = [f"# Informe semanal · {AHORA.strftime('%Y-%m-%d')}", "", f"{len(filas)} reels con métricas. Promedio: {prom:,.0f} vistas.".replace(",", "."), "",
         "| Reel | Vistas | Contra el promedio | Envíos cada 1.000 | Tiempo promedio | Retención |", "|---|---|---|---|---|---|"]
    for x in sorted(filas, key=lambda x: -x["vistas"]):
        L.append(f"| {x['slug']} | {x['vistas']} | {x['vistas'] / prom:.1f}x | {x['envíos_x1000']} | {x['tiempo']} s | {str(x['retención']) + '%' if x['retención'] else 's/d'} |")
    for campo, titulo in (("inicio", "Por tipo de inicio"), ("cierre", "Por tipo de cierre"), ("tramo", "Por duración")):
        L += ["", f"## {titulo}", "", "| Grupo | Reels | Vistas promedio | Contra el promedio |", "|---|---|---|---|"]
        g = {}
        for x in filas: g.setdefault(x[campo], []).append(x["vistas"])
        for k, v in sorted(g.items(), key=lambda kv: -statistics.mean(kv[1])): L.append(f"| {k} | {len(v)} | {statistics.mean(v):,.0f} | {statistics.mean(v) / prom:.1f}x |".replace(",", "."))
    L += ["", "Con menos de 5 reels por grupo, la diferencia puede ser casualidad."]
    ruta = f"{ROOT}/instagram/referencias/informe-{AHORA.strftime('%Y-%m-%d')}.md"; open(ruta, "w").write("\n".join(L)); print("\n".join(L)); print("\n->", os.path.relpath(ruta, ROOT))


if __name__ == "__main__":
    try:
        if "--importar" in sys.argv: importar()
        elif "--informe" in sys.argv: informe()
        else: medir()
    except m.MetaError as e: sys.exit(f"Error de Meta: {e}")
