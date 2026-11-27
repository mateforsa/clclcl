#!/usr/bin/env python3
"""Cómo le va a cada reel publicado, para el panel.

  python3 fabrica/rendimiento.py      -> pide las métricas actuales a Instagram y escribe fabrica/rendimiento.json

Veredicto, contra la mediana de vistas del canal (reels con 48 h o más; si hay pocos, con 24 h o más):
  - con 24 h o más:  "le fue bien" (≥ 1,5 × mediana o se compartió mucho) · "normal" · "le fue mal" (< 0,5 × mediana)
  - con menos de 24 h: se compara contra la mediana escalada por la edad (las vistas crecen rápido al principio):
                       "va bien" · "normal" · "va lento"
"""
import datetime as dt, json, os, statistics, sys
D = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.dirname(D)
sys.path.insert(0, f"{ROOT}/scripts")
import meta_api as m

METRICAS = "views,reach,ig_reels_avg_watch_time,shares,saved,likes,comments,total_interactions"
AHORA = dt.datetime.now(dt.timezone.utc)


def main():
    reg = json.load(open(f"{ROOT}/instagram/publicados.json"))
    filas = []
    for p in reg:
        try:
            ins = m.get(f"{p['id']}/insights", metric=METRICAS)["data"]
        except m.MetaError:
            continue  # borrado, o reel de prueba que la API no deja leer
        v = {x["name"]: (x.get("values") or [{}])[0].get("value", x.get("total_value", {}).get("value")) for x in ins}
        try: ts = m.get(p["id"], fields="timestamp")["timestamp"].replace("+0000", "+00:00")  # fecha real de publicación
        except (m.MetaError, KeyError): ts = p["fecha"]
        edad = (AHORA - dt.datetime.fromisoformat(ts)).total_seconds() / 3600
        filas.append({"slug": p["slug"], "id": p["id"], "link": p.get("link"), "prueba": bool(p.get("prueba")), "edad_h": round(edad, 1),
                      **{k: v.get(k) for k in METRICAS.split(",")}})
    if reg and not filas:  # Meta no respondió nada (token vencido, acceso bloqueado): no pisar las métricas anteriores
        sys.exit("Instagram no devolvió métricas de ningún reel; dejo fabrica/rendimiento.json como estaba.")
    # referencia: los reels con 48 h o más; si todavía no hay suficientes, los de 24 h o más
    maduros = [f["views"] or 0 for f in filas if f["edad_h"] >= 48]
    if len(maduros) < 5: maduros = [f["views"] or 0 for f in filas if f["edad_h"] >= 24]
    med = statistics.median(maduros) if maduros else None
    for f in filas:
        vis = f["views"] or 0
        if not med: f["veredicto"] = "sin referencia"; continue
        if f["edad_h"] < 3: f["veredicto"] = "recién subido"; continue
        if f["edad_h"] >= 24:
            r = vis / med
            f["veredicto"] = "le fue bien" if r >= 1.5 or (f["shares"] or 0) >= 20 else ("le fue mal" if r < 0.5 else "normal")
        else:
            esperado = med * min(1, max(f["edad_h"], 1) / 24) ** 0.5
            r = vis / esperado
            f["veredicto"] = "va bien" if r >= 1.3 else ("va lento" if r < 0.5 else "normal")
        f["frente_a_mediana"] = round(r, 2)
    json.dump({"actualizado": AHORA.isoformat(timespec="seconds"), "mediana_vistas": med, "reels": filas},
              open(f"{D}/rendimiento.json", "w"), ensure_ascii=False, indent=1)
    print(f"{len(filas)} reels medidos · mediana {med} vistas")
    for f in sorted(filas, key=lambda x: x.get("frente_a_mediana") or 0):
        print(f"  {f['veredicto']:<15} {f['views'] or 0:>6} vistas · {f['edad_h']:>6} h · {f['slug']}")


if __name__ == "__main__":
    main()
