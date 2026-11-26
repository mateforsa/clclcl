#!/usr/bin/env python3
"""Radar de cuentas de referencia: qué reels les reventaron y qué se puede aprender.

  python3 scripts/radar.py            -> consulta la API y escribe instagram/referencias/AAAA-MM-DD.md
  python3 scripts/radar.py --demo     -> lo mismo con datos INVENTADOS, para ver el formato sin token

Usa Business Discovery (solo lee datos públicos de cuentas profesionales). No descarga ningún video.
El script calcula y ordena; las secciones "Por qué funcionó" y "5 ideas" las completa Claude después,
verificando cada dato con una fuente (ver docs/COMO-HACER-UN-VIDEO.md).
"""
import datetime as dt, json, os, re, sqlite3, statistics, sys
import yaml
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import meta_api as m

ROOT = m.ROOT; DEMO = "--demo" in sys.argv
CFG = yaml.safe_load(open(f"{ROOT}/instagram/radar.yaml"))
HOY = dt.datetime.now(dt.timezone.utc)
DB = f"{ROOT}/instagram/radar.sqlite" if not DEMO else ":memory:"
CAMPOS = "id,caption,permalink,timestamp,media_type,media_product_type,like_count,comments_count,view_count"


def traer(cuenta, n):
    """Últimos n reels de una cuenta. La paginación va dentro de la expansión de campos (.limit/.after)."""
    reels, cursor = [], None
    for _ in range(6):
        pag = f".limit(50)" + (f".after({cursor})" if cursor else "")
        j = m.get(m.ig_id(), fields=f"business_discovery.username({cuenta}){{followers_count,media{pag}{{{CAMPOS}}}}}")
        bd = j.get("business_discovery", {}); med = bd.get("media", {})
        for x in med.get("data", []):
            if x.get("media_product_type") == "REELS" or (x.get("media_type") == "VIDEO" and "/reel/" in (x.get("permalink") or "")):
                reels.append(x)
        cursor = med.get("paging", {}).get("cursors", {}).get("after")
        if len(reels) >= n or not cursor: break
    return bd.get("followers_count"), reels[:n]


def demo(cuenta, n):
    import random; r = random.Random(cuenta); base = r.randint(8000, 60000); out = []
    ganchos = ["Esto costó 2.000 millones. Lo usaron 9 veces.", "¿Por qué nadie habla de esto?", "En 4 minutos cambió todo.",
               "El error de un dólar que salió carísimo.", "Lo despidieron de su propia empresa."]
    for i in range(n):
        v = int(base * r.uniform(0.4, 1.8)) * (r.choice([1, 1, 1, 1, 1, 1, 1, 7, 12]) if i < 12 else 1)
        f = HOY - dt.timedelta(days=i * 2 + r.randint(0, 1))
        out.append({"id": f"demo_{cuenta}_{i}", "caption": f"{r.choice(ganchos)}\n\nTexto de ejemplo.\n¿Vos qué harías?\n#demo",
                    "permalink": f"https://www.instagram.com/reel/DEMO{cuenta}{i}/", "timestamp": f.strftime("%Y-%m-%dT%H:%M:%S+0000"),
                    "like_count": v // 25, "comments_count": v // 400, "view_count": v, "media_product_type": "REELS"})
    return base * 3, out


def gancho(c): return next((l.strip() for l in (c or "").splitlines() if l.strip()), "(sin texto)")[:140]


def cierre(c):
    """Tipo de cierre según las últimas líneas del texto (heurística, no es un dato de la API)."""
    ls = [l.strip() for l in (c or "").splitlines() if l.strip() and not l.strip().startswith("#")]
    fin = " ".join(ls[-2:]).lower() if ls else ""
    if re.search(r"coment[aá] [\"“']?[A-ZÁÉÍÓÚ]{3,}|comment [A-Z]{3,}", " ".join(ls[-2:])): return "palabra clave"
    if "?" in fin: return "pregunta"
    if re.search(r"parte \d|part \d|mañana|continuar", fin): return "continuación"
    if re.search(r"segui|sígue|follow", fin): return "pedido de seguir"
    if re.search(r"guard|compart|mand[aá]|save|share", fin): return "guardar o compartir"
    return "sin pedido"


def tema(c):
    t = (c or "").lower()
    for nombre, pal in [("fútbol", "gol|mundial|champions|boca|river|messi|selecci"), ("plata y economía", "dólar|inflaci|sueldo|precio|millones|bolsa|acciones|plata"),
                        ("tecnología e IA", " ia |inteligencia artificial|chatgpt|apple|google|meta|nvidia|app"), ("videojuegos", "gta|juego|consola|playstation|xbox|nintendo|fortnite"),
                        ("espacio y ciencia", "nasa|marte|cohete|spacex|planeta|cient"), ("historia", "hace \\d+ años|en 19\\d\\d|historia de")]:
        if re.search(pal, t): return nombre
    return "otro"


def main():
    cuentas = ["cuenta_demo_a", "cuenta_demo_b", "cuenta_demo_c"] if DEMO else [c.lstrip("@") for c in (CFG.get("cuentas") or [])]
    if not cuentas: sys.exit("instagram/radar.yaml no tiene cuentas. Agregá entre 5 y 20 usuarios en `cuentas:`.")
    n, X, VENT = CFG.get("ultimos", 30), CFG.get("reventado_x", 5), CFG.get("ventana_dias", 30)
    db = sqlite3.connect(DB)
    db.execute("""create table if not exists reels(id text primary key, cuenta text, permalink text, publicado text, caption text,
                  vistas int, likes int, comentarios int, mediana real, veces real, visto_por_primera_vez text, informado_en text)""")
    filas, resumen, errores = [], [], []
    for c in cuentas:
        try: seg, reels = demo(c, n) if DEMO else traer(c, n)
        except m.MetaError as e: errores.append(f"@{c}: {e}"); continue
        vistas = [r["view_count"] for r in reels if r.get("view_count") is not None]
        if not vistas: errores.append(f"@{c}: sin reels con vistas visibles"); continue
        med = statistics.median(vistas); resumen.append((c, seg, len(reels), med, max(vistas)))
        for r in reels:
            v = r.get("view_count");
            if v is None: continue
            f = dt.datetime.strptime(r["timestamp"][:19], "%Y-%m-%dT%H:%M:%S").replace(tzinfo=dt.timezone.utc)
            veces = v / med if med else 0
            db.execute("""insert into reels values(?,?,?,?,?,?,?,?,?,?,?,null) on conflict(id) do update set
                          vistas=excluded.vistas, likes=excluded.likes, comentarios=excluded.comentarios, mediana=excluded.mediana, veces=excluded.veces""",
                       (r["id"], c, r.get("permalink"), r["timestamp"], r.get("caption"), v, r.get("like_count"), r.get("comments_count"), med, veces, HOY.isoformat()))
            if veces >= X and (HOY - f).days <= VENT: filas.append((veces, c, r, f, med))
    ya = {x[0] for x in db.execute("select id from reels where informado_en is not null")}
    nuevos = sorted([x for x in filas if x[2]["id"] not in ya], key=lambda x: -x[0])[:10]
    usados = json.load(open(f"{ROOT}/instagram/hooks_used.json"))[-6:]
    fecha = HOY.astimezone(dt.timezone(dt.timedelta(hours=-3))).strftime("%Y-%m-%d")
    L = [f"# Radar de referencias · {fecha}" + (" · DEMO (datos inventados)" if DEMO else ""), "",
         f"Regla: reventado = {X}x o más la mediana de vistas de su cuenta, publicado en los últimos {VENT} días. "
         "Vistas, me gusta y comentarios vienen de la API de Meta; gancho, tema y cierre se deducen del texto. "
         "La duración no está disponible para reels ajenos.", "", "## Cuentas", "", "| Cuenta | Seguidores | Reels leídos | Mediana de vistas | Máximo |", "|---|---|---|---|---|"]
    L += [f"| @{c} | {s if s is not None else 's/d'} | {k} | {int(md):,} | {mx:,} |".replace(",", ".") for c, s, k, md, mx in resumen]
    L += ["", f"## Los {len(nuevos)} reels reventados que no estaban en informes anteriores", ""]
    if not nuevos: L.append("Ninguno nuevo esta vez.")
    for i, (veces, c, r, f, med) in enumerate(nuevos, 1):
        L += [f"### {i}. @{c} · {veces:.1f}x su mediana", "",
              f"- Vistas: {r['view_count']:,} (mediana {int(med):,}) · me gusta {r.get('like_count', 0):,} · comentarios {r.get('comments_count', 0):,}".replace(",", "."),
              f"- Publicado: {f.strftime('%Y-%m-%d')} · {r.get('permalink')}", f"- Gancho: «{gancho(r.get('caption'))}»",
              f"- Tema: {tema(r.get('caption'))} · Cierre: {cierre(r.get('caption'))} · Duración: no disponible",
              "- Por qué funcionó: _pendiente (lo completa Claude)_", ""]
    L += ["## Ganchos y cierres usados en mis últimos 6 videos", "", "| Video | Inicio | Cierre |", "|---|---|---|"]
    L += [f"| {u['video']} | {u['inicio']} | {u['cierre']} |" for u in usados]
    L += ["", "## 5 ideas para el canal", "", "_Pendiente: las completa Claude a partir de esta lista. Cada idea lleva un tipo de gancho que no esté "
          "en la tabla de arriba y un dato con fuente verificable. No se copia el texto ni el video de nadie._", ""]
    if errores: L += ["## Cuentas que no se pudieron leer", ""] + [f"- {e}" for e in errores] + [""]
    ruta = f"{ROOT}/instagram/referencias/{fecha}{'-demo' if DEMO else ''}.md"; k = 2
    while os.path.exists(ruta) and not DEMO:  # segunda corrida del mismo día: no pisar el informe anterior
        ruta = f"{ROOT}/instagram/referencias/{fecha}-{k}.md"; k += 1
    open(ruta, "w").write("\n".join(L))
    if not DEMO:
        db.executemany("update reels set informado_en=? where id=?", [(fecha, x[2]["id"]) for x in nuevos]); db.commit()
    print(f"{len(resumen)} cuentas leídas, {len(filas)} reventados en la ventana, {len(nuevos)} nuevos -> {os.path.relpath(ruta, ROOT)}")
    for e in errores: print("  no leída:", e)


if __name__ == "__main__":
    try: main()
    except m.MetaError as e: sys.exit(f"Error de Meta: {e}")
