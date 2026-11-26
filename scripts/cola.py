#!/usr/bin/env python3
"""Publica lo que esté en instagram/cola.json y ya tenga la hora cumplida. Pensado para la tarea programada.

  python3 scripts/cola.py            -> publica los vencidos (cada entrada de la cola es un OK tuyo dado de antemano)
  python3 scripts/cola.py --simular  -> muestra qué publicaría

Formato de instagram/cola.json:  [{"slug": "hoy-hace-26-nov", "cuando": "2026-11-26T20:00", "prueba": false}]
`cuando` es hora de Argentina. Si falta el MP4 (out/ no está en git) lo vuelve a renderizar: unos 10 minutos por corto.
"""
import datetime as dt, json, os, subprocess, sys
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
COLA = f"{ROOT}/instagram/cola.json"; REG = f"{ROOT}/instagram/publicados.json"; SIM = "--simular" in sys.argv
AR = dt.timezone(dt.timedelta(hours=-3)); ahora = dt.datetime.now(AR)
cola = json.load(open(COLA)) if os.path.exists(COLA) else []
hechos = {x["slug"] for x in (json.load(open(REG)) if os.path.exists(REG) else [])}
pend = [c for c in cola if c["slug"] not in hechos and dt.datetime.fromisoformat(c["cuando"]).replace(tzinfo=AR) <= ahora]
print(f"{ahora:%Y-%m-%d %H:%M} (Argentina): {len(pend)} para publicar de {len(cola)} en cola")
fallas = 0
for c in pend:
    s = c["slug"]
    if not os.path.exists(f"{ROOT}/out/{s}/{s}.mp4") and not SIM:
        print(f"  {s}: falta el MP4, renderizando..."); subprocess.run([f"{ROOT}/scripts/render.sh", s], check=False)
    cmd = ["python3", f"{ROOT}/scripts/publicar.py", s, "--simular" if SIM else "--confirmado"] + (["--prueba"] if c.get("prueba") else [])
    fallas += subprocess.run(cmd).returncode != 0
sys.exit(1 if fallas else 0)
