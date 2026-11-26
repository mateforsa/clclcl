#!/usr/bin/env python3
"""Acceso común a la API de Instagram (Instagram API with Facebook Login, graph.facebook.com).

Token: nunca en git. Dos formas de darlo:
  - En la nube (entorno `clclcl`): secreto de red para graph.facebook.com; el proxy lo agrega solo y este
    código no lo ve. No hay que definir ninguna variable.
  - En tu computadora: variable de entorno IG_ACCESS_TOKEN.

Uso suelto:  python3 scripts/meta_api.py cuenta   -> muestra las cuentas de Instagram que ve el token
             python3 scripts/meta_api.py token    -> dice si el token funciona y cuándo vence
"""
import json, os, sys, time
import requests, yaml

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CFG = yaml.safe_load(open(f"{ROOT}/instagram/config.yaml"))
VER = CFG.get("api_version", "v27.0")
GRAPH = f"https://graph.facebook.com/{VER}"
TOKEN = os.environ.get("IG_ACCESS_TOKEN", "")


class MetaError(Exception):
    pass


def _headers(extra=None, upload=False):
    h = dict(extra or {})
    if TOKEN:  # la subida a rupload usa el prefijo OAuth; el resto, Bearer (documentación de Meta)
        h["Authorization"] = ("OAuth " if upload else "Bearer ") + TOKEN
    return h


def call(method, path, params=None, data=None, timeout=60):
    url = path if path.startswith("http") else f"{GRAPH}/{path.lstrip('/')}"
    for intento in range(4):
        try:
            r = requests.request(method, url, params=params, data=data, headers=_headers(), timeout=timeout)
        except requests.RequestException as e:
            if intento == 3: raise MetaError(f"sin conexión con {url.split('/')[2]}: {e}")
            time.sleep(2 ** intento); continue
        if r.status_code in (429, 500, 502, 503) and intento < 3:
            time.sleep(2 ** (intento + 1)); continue
        try: j = r.json()
        except ValueError: raise MetaError(f"respuesta no JSON ({r.status_code}): {r.text[:200]}")
        if "error" in j:
            e = j["error"]; raise MetaError(f"{e.get('message')} (código {e.get('code')}, tipo {e.get('type')})")
        return j
    raise MetaError("sin respuesta")


def get(path, **params): return call("GET", path, params=params)
def post(path, **data): return call("POST", path, data=data)


def ig_id():
    v = str(CFG.get("ig_user_id") or os.environ.get("IG_USER_ID", "")).strip()
    if not v: raise MetaError("falta ig_user_id en instagram/config.yaml (corré: python3 scripts/meta_api.py cuenta)")
    return v


def cuentas():
    """Páginas de Facebook que ve el token y la cuenta de Instagram vinculada a cada una."""
    j = get("me/accounts", fields="name,instagram_business_account{id,username,followers_count}")
    return [(p.get("name"), p.get("instagram_business_account")) for p in j.get("data", [])]


def estado_token():
    """Vencimiento del token. Solo se puede leer cuando el token está en IG_ACCESS_TOKEN."""
    if not TOKEN:
        me = get("me", fields="id,name"); return {"valido": True, "id": me.get("id"), "vence": "no visible desde la nube"}
    d = get("debug_token", input_token=TOKEN).get("data", {})
    exp = d.get("expires_at") or 0
    return {"valido": d.get("is_valid"), "tipo": d.get("type"), "permisos": d.get("scopes"),
            "vence": "no vence" if exp == 0 else time.strftime("%Y-%m-%d", time.gmtime(exp)),
            "dias": None if exp == 0 else round((exp - time.time()) / 86400)}


if __name__ == "__main__":
    cmd = sys.argv[1] if len(sys.argv) > 1 else ""
    try:
        if cmd == "cuenta":
            for nombre, ig in cuentas():
                print(f"Página: {nombre} -> Instagram: {ig or 'SIN CUENTA VINCULADA'}")
        elif cmd == "token":
            print(json.dumps(estado_token(), ensure_ascii=False, indent=1))
        else:
            print(__doc__)
    except MetaError as e:
        sys.exit(f"Error de Meta: {e}")
