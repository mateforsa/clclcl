#!/usr/bin/env python3
"""Revisa y renueva el token de larga duración de Meta.

  python3 scripts/renovar_token.py            -> estado y días que faltan; sale con código 1 si faltan menos de 10 días
  python3 scripts/renovar_token.py --renovar  -> cambia el token por uno nuevo de 60 días y lo guarda en ~/.ig_token (permiso 600)

La renovación solo funciona donde el script puede leer el token: en tu computadora, con IG_ACCESS_TOKEN,
META_APP_ID y META_APP_SECRET como variables de entorno. En la nube el proxy guarda el token y este código no
lo ve: ahí hay que pegar el token nuevo a mano en los secretos del entorno. Un token de usuario del sistema
(Business Manager) generado sin vencimiento evita todo esto.
"""
import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import meta_api as m

try:
    e = m.estado_token()
except m.MetaError as err:
    sys.exit(f"El token no funciona: {err}")
print("Token válido:", e.get("valido"), "| vence:", e.get("vence"), "| permisos:", ", ".join(e.get("permisos") or []) or "no visibles")
if "--renovar" in sys.argv:
    app, sec = os.environ.get("META_APP_ID"), os.environ.get("META_APP_SECRET")
    if not (m.TOKEN and app and sec):
        sys.exit("Para renovar hacen falta IG_ACCESS_TOKEN, META_APP_ID y META_APP_SECRET en variables de entorno (no en la nube).")
    j = m.get("oauth/access_token", grant_type="fb_exchange_token", client_id=app, client_secret=sec, fb_exchange_token=m.TOKEN)
    ruta = os.path.expanduser("~/.ig_token")
    fd = os.open(ruta, os.O_WRONLY | os.O_CREAT | os.O_TRUNC, 0o600)
    with os.fdopen(fd, "w") as f: f.write(j["access_token"])
    dias = round(j.get("expires_in", 0) / 86400)
    print(f"Token nuevo guardado en {ruta} ({'sin vencimiento informado' if not dias else str(dias) + ' días'}). Cargalo en el secreto del entorno.")
elif e.get("dias") is not None and e["dias"] < 10:
    print(f"ATENCIÓN: faltan {e['dias']} días. Corré: python3 scripts/renovar_token.py --renovar"); sys.exit(1)
