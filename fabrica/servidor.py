#!/usr/bin/env python3
"""Panel en vivo (opcional, para correr en tu compu): python3 fabrica/servidor.py  ->  http://localhost:8787
Los botones Aprobar / Rechazar escriben en estado.json a través de estado.py."""
import json, os, subprocess, sys
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
D = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, D); import panel


class H(BaseHTTPRequestHandler):
    def _r(self, code, cuerpo, tipo="application/json"):
        b = cuerpo if isinstance(cuerpo, bytes) else cuerpo.encode()
        self.send_response(code); self.send_header("Content-Type", tipo + "; charset=utf-8"); self.send_header("Content-Length", str(len(b))); self.end_headers(); self.wfile.write(b)

    def do_GET(self):
        if self.path == "/api/estado": return self._r(200, json.dumps(panel.datos(), ensure_ascii=False))
        if self.path in ("/", "/panel.html"): panel.main(); return self._r(200, open(f"{D}/panel/panel.html", "rb").read(), "text/html")
        self._r(404, "{}")

    def do_POST(self):
        if self.headers.get("Origin") not in (None, f"http://localhost:{PUERTO}", f"http://127.0.0.1:{PUERTO}"): return self._r(403, "{}")
        d = json.loads(self.rfile.read(int(self.headers.get("Content-Length", 0))) or b"{}"); slug = str(d.get("slug", ""))
        if self.path == "/api/aprobar": cmd = ["aprobar", slug]
        elif self.path == "/api/rechazar": cmd = ["rechazar", slug, str(d.get("motivo") or "sin motivo")]
        elif self.path == "/api/publicar": cmd = ["publicar", slug] + (["--prueba"] if d.get("prueba") else [])
        else: return self._r(404, "{}")
        r = subprocess.run([sys.executable, f"{D}/estado.py", *cmd], capture_output=True, text=True)
        self._r(200 if r.returncode == 0 else 400, json.dumps({"ok": r.returncode == 0, "msg": (r.stdout + r.stderr).strip()}, ensure_ascii=False))

    def log_message(self, *a): pass


PUERTO = int(os.environ.get("PUERTO", 8787))
if __name__ == "__main__":
    print(f"Panel en http://localhost:{PUERTO}"); ThreadingHTTPServer(("127.0.0.1", PUERTO), H).serve_forever()
