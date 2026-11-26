#!/usr/bin/env python3
"""Estado y cola de la fábrica de videos. Toda escritura pasa por acá, y cada cambio regenera el panel.

  python3 fabrica/estado.py nuevo <slug> --titulo "..." --tema "..." [--fuentes url1 url2] [--puntaje 8.5]
  python3 fabrica/estado.py etapa <slug> <etapa> [--nota "..."]
  python3 fabrica/estado.py log <slug> <agente> "texto"
  python3 fabrica/estado.py aprobar <slug>           # destraba el freno en el que esté
  python3 fabrica/estado.py rechazar <slug> "motivo" # vuelve a la etapa anterior con el motivo
  python3 fabrica/estado.py publicar <slug> [--prueba] [--simular]  # sube a Instagram un video en `listo` (solo por pedido del dueño)
  python3 fabrica/estado.py resumen                  # texto para /fabrica estado
  python3 fabrica/estado.py tope                     # ¿cuántos se pueden producir hoy?
  python3 fabrica/estado.py creditos <slug>          # caracteres de voz que va a gastar y si alcanzan

Etapas: idea > guion > verificado > esperando_ok_voz > voz > render > revision > esperando_ok_final > listo > publicado
(los dos "esperando" son los frenos: solo `aprobar` los pasa). También: descartado.
"""
import argparse, datetime as dt, json, os, re, subprocess, sys
D = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.dirname(D)
EST = f"{D}/estado.json"; CFG = json.load(open(f"{D}/config.json"))
ETAPAS = ["idea", "guion", "verificado", "esperando_ok_voz", "voz", "render", "revision", "esperando_ok_final", "listo", "publicado"]
FRENOS = {"esperando_ok_voz": "voz", "esperando_ok_final": "listo"}
VUELVE = {"esperando_ok_voz": "guion", "esperando_ok_final": "render"}
AR = dt.timezone(dt.timedelta(hours=-3))
ahora = lambda: dt.datetime.now(AR).isoformat(timespec="seconds")
hoy = lambda: dt.datetime.now(AR).strftime("%Y-%m-%d")


def leer():
    return json.load(open(EST)) if os.path.exists(EST) else {"videos": {}}


def guardar(e):
    e["actualizado"] = ahora()
    tmp = EST + ".tmp"; json.dump(e, open(tmp, "w"), ensure_ascii=False, indent=1); os.replace(tmp, EST)
    subprocess.run([sys.executable, f"{D}/panel.py"], check=False)


def log(slug, agente, texto):
    os.makedirs(f"{D}/log", exist_ok=True)
    with open(f"{D}/log/{slug}.log", "a") as f: f.write(f"{ahora()} [{agente}] {texto}\n")


def producidos_hoy(e):
    return [s for s, v in e["videos"].items() if any(h["etapa"] == "voz" and h["cuando"][:10] == hoy() for h in v.get("historial", []))]


def caracteres(slug):
    p = f"{ROOT}/videos/{slug}/parrafos.json"
    if not os.path.exists(p): return None
    t = " ".join(s for par in json.load(open(p)) for s in par)
    return len(re.sub(r"\[([^|\]]+)\|[^\]]+\]", r"\1", t))  # se cobra lo que se dice, no lo que se muestra


def main():
    a = argparse.ArgumentParser(); sub = a.add_subparsers(dest="cmd", required=True)
    n = sub.add_parser("nuevo"); n.add_argument("slug"); n.add_argument("--titulo", required=True); n.add_argument("--tema", default=""); n.add_argument("--fuentes", nargs="*", default=[]); n.add_argument("--puntaje", type=float)
    t = sub.add_parser("etapa"); t.add_argument("slug"); t.add_argument("etapa", choices=ETAPAS + ["descartado"]); t.add_argument("--nota", default="")
    l = sub.add_parser("log"); l.add_argument("slug"); l.add_argument("agente"); l.add_argument("texto")
    ap = sub.add_parser("aprobar"); ap.add_argument("slug")
    rj = sub.add_parser("rechazar"); rj.add_argument("slug"); rj.add_argument("motivo")
    pb = sub.add_parser("publicar"); pb.add_argument("slug"); pb.add_argument("--prueba", action="store_true"); pb.add_argument("--simular", action="store_true")
    sub.add_parser("resumen"); sub.add_parser("tope"); sub.add_parser("panel")
    cr = sub.add_parser("creditos"); cr.add_argument("slug")
    x = a.parse_args(); e = leer(); V = e["videos"]

    if x.cmd == "nuevo":
        if x.slug in V: sys.exit(f"{x.slug} ya existe (etapa {V[x.slug]['etapa']})")
        V[x.slug] = {"titulo": x.titulo, "tema": x.tema, "fuentes": x.fuentes, "puntaje": x.puntaje, "etapa": "idea", "creado": ahora(), "historial": [{"etapa": "idea", "cuando": ahora()}]}
        log(x.slug, "fabrica", f"idea creada: {x.titulo}"); guardar(e); print("ok")
    elif x.cmd == "etapa":
        v = V.get(x.slug) or sys.exit(f"no existe {x.slug}")
        if x.etapa in FRENOS.values() and v["etapa"] in FRENOS and FRENOS[v["etapa"]] == x.etapa:
            sys.exit(f"FRENO: {x.slug} está en {v['etapa']}. Solo el dueño lo destraba, con `estado.py aprobar {x.slug}`.")
        if x.etapa == "voz" and v["etapa"] != "voz":
            sys.exit(f"FRENO: no se pasa a voz sin aprobación. Poné {x.slug} en esperando_ok_voz y esperá el OK.")
        if x.etapa == "listo": sys.exit("FRENO: a `listo` solo se llega con `aprobar` desde esperando_ok_final.")
        if x.etapa == "esperando_ok_voz" and v["etapa"] != "verificado": sys.exit("Nada pasa al freno de voz sin estar `verificado` por el verificador.")
        v["etapa"] = x.etapa; v["nota"] = x.nota; v["historial"].append({"etapa": x.etapa, "cuando": ahora(), "nota": x.nota})
        log(x.slug, "fabrica", f"etapa -> {x.etapa}" + (f" ({x.nota})" if x.nota else "")); guardar(e); print("ok")
    elif x.cmd == "log":
        log(x.slug, x.agente, x.texto); guardar(e)
    elif x.cmd == "aprobar":
        v = V.get(x.slug) or sys.exit(f"no existe {x.slug}")
        if v["etapa"] not in FRENOS: sys.exit(f"{x.slug} no está esperando aprobación (etapa {v['etapa']})")
        if v["etapa"] == "esperando_ok_voz" and len(producidos_hoy(e)) >= CFG["tope_por_dia"]: sys.exit(f"Tope diario alcanzado ({CFG['tope_por_dia']}). Queda aprobable mañana.")
        de = v["etapa"]; v["etapa"] = FRENOS[de]; v["nota"] = ""; v["historial"].append({"etapa": v["etapa"], "cuando": ahora(), "nota": f"aprobado por el dueño desde {de}"})
        log(x.slug, "dueño", f"APROBADO ({de} -> {v['etapa']})"); guardar(e); print(f"{x.slug}: {de} -> {v['etapa']}")
    elif x.cmd == "rechazar":
        v = V.get(x.slug) or sys.exit(f"no existe {x.slug}")
        if v["etapa"] not in FRENOS: sys.exit(f"{x.slug} no está esperando aprobación (etapa {v['etapa']})")
        de = v["etapa"]; v["etapa"] = VUELVE[de]; v["nota"] = "RECHAZADO: " + x.motivo; v["historial"].append({"etapa": v["etapa"], "cuando": ahora(), "nota": v["nota"]})
        log(x.slug, "dueño", f"RECHAZADO en {de}: {x.motivo}"); guardar(e); print(f"{x.slug}: vuelve a {v['etapa']}")
    elif x.cmd == "publicar":
        v = V.get(x.slug) or sys.exit(f"no existe {x.slug}")
        if v["etapa"] != "listo": sys.exit(f"Solo se publica lo que está en `listo` (aprobado por el dueño). {x.slug} está en {v['etapa']}.")
        if not os.path.exists(f"{ROOT}/out/{x.slug}/{x.slug}.mp4"): sys.exit(f"Falta el MP4 (out/ no está en git). Regeneralo con: scripts/render.sh {x.slug}")
        modo = "--simular" if x.simular else "--confirmado"
        r = subprocess.run([sys.executable, f"{ROOT}/scripts/publicar.py", x.slug, modo] + (["--prueba"] if x.prueba else []), capture_output=True, text=True, cwd=ROOT)
        sal = (r.stdout + r.stderr).strip(); print(sal[-1500:])
        if x.simular: return
        if r.returncode != 0:
            log(x.slug, "publicador", "FALLÓ la subida: " + sal[-300:].replace("\n", " | ")); guardar(e); sys.exit(1)
        reg = [p for p in json.load(open(f"{ROOT}/instagram/publicados.json")) if p["slug"] == x.slug and bool(p.get("prueba")) == x.prueba]
        link = reg[-1].get("link") if reg else None
        if x.prueba:
            v["link_prueba"] = link; log(x.slug, "publicador", f"subido como REEL DE PRUEBA: {link}")
        else:
            v["link"] = link; v["etapa"] = "publicado"; v["nota"] = ""; v["historial"].append({"etapa": "publicado", "cuando": ahora(), "nota": link or ""})
            log(x.slug, "publicador", f"PUBLICADO: {link}")
        guardar(e); print(f"{x.slug}: {'reel de prueba' if x.prueba else 'publicado'} {link or ''}")
    elif x.cmd == "resumen":
        print(f"Fábrica · {ahora()} · producidos hoy: {len(producidos_hoy(e))} de {CFG['tope_por_dia']}")
        for et in ETAPAS[:-1][::-1]:
            xs = [(s, v) for s, v in V.items() if v["etapa"] == et]
            if xs: print(f"\n{et.upper().replace('_', ' ')} ({len(xs)})"); [print(f"  - {s}: {v['titulo']}" + (f"  [{v['nota']}]" if v.get('nota') else "")) for s, v in xs]
        print(f"\nPUBLICADOS: {sum(v['etapa'] == 'publicado' for v in V.values())}")
    elif x.cmd == "tope":
        k = len(producidos_hoy(e)); esp = sum(v["etapa"] in FRENOS for v in V.values())
        ideas_hoy = sum(v.get("creado", "")[:10] == hoy() and v["historial"][0]["etapa"] == "idea" for v in V.values())
        print(json.dumps({"producidos_hoy": k, "tope": CFG["tope_por_dia"], "quedan": max(0, CFG["tope_por_dia"] - k), "elige_por_dia": CFG["videos_por_dia"],
                          "elige_por_corrida": CFG.get("videos_por_corrida", 1), "esperando_ok": esp, "max_esperando_ok": CFG.get("max_esperando_ok", 4),
                          "ideas_creadas_hoy": ideas_hoy, "buscar_temas": esp < CFG.get("max_esperando_ok", 4) and ideas_hoy < CFG["tope_por_dia"]}))
    elif x.cmd == "creditos":
        c = caracteres(x.slug); disp = CFG.get("creditos_elevenlabs_disponibles")
        if c is None: sys.exit("todavía no hay parrafos.json")
        msg = f"{x.slug}: la voz gasta unos {c} caracteres de ElevenLabs."
        if disp is None: msg += " AVISO: no se puede leer el saldo (la clave no tiene ese permiso); anotalo en fabrica/config.json."
        elif c > disp: msg += f" NO ALCANZA: quedan {disp}."
        else: msg += f" Alcanza: quedan {disp}."
        V[x.slug]["caracteres_voz"] = c; log(x.slug, "fabrica", msg); guardar(e); print(msg)
    elif x.cmd == "panel":
        guardar(e); print(f"{D}/panel/panel.html")


if __name__ == "__main__": main()
