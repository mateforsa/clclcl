#!/usr/bin/env python3
"""Genera fabrica/panel/panel.html: una sola página, sin dependencias, con los datos adentro.
La llama estado.py en cada cambio. `datos()` también la usa servidor.py para el modo en vivo."""
import base64, datetime as dt, json, os, re
D = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.dirname(D)
AR = dt.timezone(dt.timedelta(hours=-3))
EN_CURSO = ["voz", "render", "revision"]; COLA = ["idea", "guion", "verificado"]; FRENOS = ["esperando_ok_voz", "esperando_ok_final"]
SEG_RENDER_POR_SEG = 10.5  # medido en este contenedor: ~10 min por minuto de video


def mini(slug):
    src = f"{ROOT}/instagram/portadas/{slug}.jpg"; dst = f"{D}/panel/mini/{slug}.jpg"
    if not os.path.exists(src): return None
    if not os.path.exists(dst) or os.path.getmtime(dst) < os.path.getmtime(src):
        from PIL import Image
        os.makedirs(os.path.dirname(dst), exist_ok=True)
        im = Image.open(src).convert("RGB"); im.thumbnail((300, 540)); im.save(dst, quality=72)
    return "data:image/jpeg;base64," + base64.b64encode(open(dst, "rb").read()).decode()


def seccion(slug, titulo):
    p = f"{ROOT}/videos/{slug}/guion.md"
    if not os.path.exists(p): return ""
    m = re.search(rf"^## {titulo}.*?\n(.*?)(?=^## |\Z)", open(p).read(), re.S | re.M)
    if not m: return ""
    c = re.search(r"```\n?(.*?)```", m.group(1), re.S)
    return (c.group(1) if c else m.group(1)).strip()


def cola_log(slug, n=6):
    p = f"{D}/log/{slug}.log"
    return [l.rstrip() for l in open(p).readlines()[-n:]] if os.path.exists(p) else []


def progreso(slug, v):
    """El render no informa avance (y no se toca render.sh): se estima por tramos terminados y tiempo."""
    if v["etapa"] != "render": return None
    ini = next((h["cuando"] for h in reversed(v["historial"]) if h["etapa"] == "render"), None)
    t = f"{ROOT}/videos/{slug}/timing.json"
    if not ini or not os.path.exists(t): return None
    dur = json.load(open(t))["duration"]; paso = (dt.datetime.now(AR) - dt.datetime.fromisoformat(ini)).total_seconds()
    if os.path.exists(f"{ROOT}/out/{slug}/{slug}.mp4") and os.path.getmtime(f"{ROOT}/out/{slug}/{slug}.mp4") > dt.datetime.fromisoformat(ini).timestamp(): return 100
    return max(1, min(97, round(100 * paso / (dur * SEG_RENDER_POR_SEG))))


def datos():
    e = json.load(open(f"{D}/estado.json")) if os.path.exists(f"{D}/estado.json") else {"videos": {}}
    cfg = json.load(open(f"{D}/config.json")); hoy = dt.datetime.now(AR); out = []
    for slug, v in e["videos"].items():
        x = {"slug": slug, **{k: v.get(k) for k in ("titulo", "tema", "etapa", "nota", "puntaje", "fuentes", "link", "link_prueba", "caracteres_voz")}}
        x["desde"] = v["historial"][-1]["cuando"] if v.get("historial") else v.get("creado")
        if v["etapa"] in EN_CURSO: x["log"] = cola_log(slug); x["progreso"] = progreso(slug, v)
        if v["etapa"] in FRENOS:
            x["log"] = cola_log(slug, 4)
            g = f"{ROOT}/videos/{slug}/guion.md"
            x["guion"] = seccion(slug, "Guion final") or (open(g).read()[:1800] if os.path.exists(g) else "")
            p = f"{ROOT}/videos/{slug}/parrafos.json"
            if os.path.exists(p) and not x["guion"]: x["guion"] = "\n".join(s for par in json.load(open(p)) for s in par)
            x["mp4"] = f"out/{slug}/{slug}.mp4" if os.path.exists(f"{ROOT}/out/{slug}/{slug}.mp4") else None
        if v["etapa"] in ("esperando_ok_final", "listo", "publicado"): x["descripcion"] = seccion(slug, "Descripción de Instagram")
        out.append(x)
    out.sort(key=lambda x: x["desde"] or "", reverse=True)
    for x in out:
        if x["etapa"] == "listo": x["mp4"] = os.path.exists(f"{ROOT}/out/{x['slug']}/{x['slug']}.mp4")
    gal = sorted([x for x in out if x["etapa"] in ("esperando_ok_final", "listo", "publicado")], key=lambda x: x["etapa"] != "listo")[:18]
    for x in gal: x["mini"] = mini(x["slug"])
    sem = (hoy - dt.timedelta(days=7)).isoformat()
    prod_hoy = sum(any(h["etapa"] == "voz" and h["cuando"][:10] == hoy.strftime("%Y-%m-%d") for h in v.get("historial", [])) for v in e["videos"].values())
    return {"actualizado": e.get("actualizado") or hoy.isoformat(timespec="seconds"), "videos": out, "tope": cfg["tope_por_dia"], "producidos_hoy": prod_hoy,
            "semana": [x["slug"] for x in out if x["etapa"] in ("listo", "publicado") and (x["desde"] or "") >= sem], "creditos": cfg.get("creditos_elevenlabs_disponibles")}


def main():
    html = open(f"{D}/panel/plantilla.html").read().replace("/*DATOS*/null", json.dumps(datos(), ensure_ascii=False).replace("</", "<\\/"))
    tmp = f"{D}/panel/panel.html.tmp"; open(tmp, "w").write(html); os.replace(tmp, f"{D}/panel/panel.html")


if __name__ == "__main__": main()
