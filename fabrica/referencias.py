#!/usr/bin/env python3
"""Lee con la API (Business Discovery) los últimos posteos de cuentas de referencia y muestra los que más pegaron.
Solo texto y números (descripción, me gusta, comentarios, link): no baja ni reusa videos ajenos.

  python3 fabrica/referencias.py                 -> cuentas de CUENTAS
  python3 fabrica/referencias.py usuario1 usuario2
Solo sirve con cuentas de empresa o creador; una cuenta personal da "Invalid user id".
"""
import os, sys
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__))); sys.path.insert(0, f"{ROOT}/scripts")
import meta_api as m

CUENTAS = ["induscoreig", "cafeconfeli"]


def main():
    for u in sys.argv[1:] or CUENTAS:
        try:
            r = m.get(m.ig_id(), fields=f"business_discovery.username({u}){{followers_count,media.limit(40)"
                      "{caption,like_count,comments_count,media_product_type,permalink,timestamp}}")
        except m.MetaError as e:
            print(f"== {u}: no se pudo leer ({e})"); continue
        bd = r["business_discovery"]; md = sorted(bd["media"]["data"], key=lambda x: x.get("like_count") or 0, reverse=True)
        print(f"== {u} · {bd.get('followers_count')} seguidores")
        for x in md[:8]:
            c = (x.get("caption") or "").replace("\n", " ")[:140]
            print(f"  {x.get('like_count') or 0:>6} me gusta · {x.get('comments_count') or 0:>4} coment. · {x['timestamp'][:10]} · {x['permalink']}\n     {c}")


if __name__ == "__main__":
    main()
