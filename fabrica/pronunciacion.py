#!/usr/bin/env python3
"""El "oído" de la fábrica: escucha la voz con Whisper y prueba pronunciaciones con ElevenLabs.

  python3 fabrica/pronunciacion.py oir <slug>
      Transcribe videos/<slug>/public/voz.wav y marca las palabras que no se entienden como deberían
      (sobre todo las de [dicho|mostrado]). Deja el informe en fabrica/log/<slug>.log.

  python3 fabrica/pronunciacion.py probar "<TÉRMINO>" "<frase con ##>" variante1 variante2 ...
      Genera una toma corta por variante (la frase con ## reemplazado), la escucha en castellano y en inglés,
      y elige la que mejor se entiende como <TÉRMINO>. Deja los audios numerados en fabrica/pronunciacion/<término>/
      y anota la ganadora en fabrica/pronunciacion.json como "probada" (el dueño puede pasarla a "confirmada").

  python3 fabrica/pronunciacion.py glosario
      Muestra el glosario. El guionista tiene que usar esas formas en [dicho|mostrado].

Hace falta: pip install faster-whisper (el modelo se baja de Hugging Face la primera vez; HF_HUB_DISABLE_XET=1).
"""
import difflib, json, os, re, subprocess, sys, unicodedata
D = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.dirname(D)
GLOS = f"{D}/pronunciacion.json"
VOICE = "N6aRe3hk1YqaHDtQpTAH"  # Juanma, la misma voz y ajustes que scripts/voice.py
AJUSTES = {"stability": 0.8, "similarity_boost": 0.8, "style": 0.0, "use_speaker_boost": True, "speed": 1.06}
G = re.compile(r"\[([^|\]]+)\|([^\]]+)\]")
os.environ.setdefault("HF_HUB_DISABLE_XET", "1")
_modelo = None


def modelo():
    global _modelo
    if _modelo is None:
        from faster_whisper import WhisperModel
        _modelo = WhisperModel("small", device="cpu", compute_type="int8")
    return _modelo


def audio(p):
    import numpy as np
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", p, "-f", "f32le", "-ac", "1", "-ar", "16000", "-"], capture_output=True).stdout
    return np.frombuffer(raw, np.float32)


def oir_palabras(p, idioma="es"):
    segs, _ = modelo().transcribe(audio(p), language=idioma, condition_on_previous_text=False, beam_size=5, word_timestamps=True)
    return [w for s in segs for w in s.words]


def oir_archivo(p, idioma="es"):
    return "".join(w.word for w in oir_palabras(p, idioma)).strip()


SEGURIDAD = 0.6  # por debajo, Whisper duda: la palabra no se entiende clara


def norm(s):
    s = unicodedata.normalize("NFD", s.lower()); s = "".join(c for c in s if unicodedata.category(c) != "Mn")
    return re.sub(r"[^a-z0-9ñ ]+", " ", s).split()


def glosario():
    return json.load(open(GLOS)) if os.path.exists(GLOS) else {}


def tts(texto, destino):
    body = json.dumps({"text": texto, "model_id": "eleven_multilingual_v2", "voice_settings": AJUSTES})
    r = subprocess.run(["curl", "-sS", "-m", "120", "-X", "POST", f"https://api.elevenlabs.io/v1/text-to-speech/{VOICE}?output_format=mp3_44100_128",
                        "-H", "Content-Type: application/json", "-d", body, "-o", destino, "-w", "%{http_code}"], capture_output=True, text=True)
    if r.stdout.strip() != "200": sys.exit(f"ElevenLabs respondió {r.stdout.strip()}: {open(destino, errors='ignore').read()[:300]}")


def parecido(a, b):
    return difflib.SequenceMatcher(None, " ".join(norm(a)), " ".join(norm(b))).ratio()


def cmd_oir(slug):
    vd = f"{ROOT}/videos/{slug}"
    texto = " ".join(s for p in json.load(open(f"{vd}/parrafos.json")) for s in p)
    mostrado = G.sub(lambda m: m.group(2), texto)
    pal = oir_palabras(f"{vd}/public/voz.wav"); oido = "".join(w.word for w in pal).strip()
    esperado, escuchado = norm(mostrado), norm(oido)
    sm = difflib.SequenceMatcher(None, esperado, escuchado)
    raros = [(" ".join(esperado[i1:i2]), " ".join(escuchado[j1:j2])) for op, i1, i2, j1, j2 in sm.get_opcodes() if op != "equal"]
    # términos con pronunciación forzada: ¿se entienden?
    terminos = sorted({m.group(2).strip(" .,:;") for m in G.finditer(texto) if re.search(r"[A-Za-z]", m.group(2))})
    dudosos = [t for t in terminos if not any(parecido(t, " ".join(escuchado[k:k + len(norm(t))])) > 0.8 for k in range(len(escuchado)))]
    # aunque Whisper "adivine" bien la marca, si duda al oírla es que se dijo mal
    for t in terminos:
        ps = [w.probability for w in pal if parecido(t.split()[0], w.word) > 0.7]
        if ps and min(ps) < SEGURIDAD and t not in dudosos: dudosos.append(f"{t} (seguridad {round(100 * min(ps))} %)")
    print("Whisper escuchó:\n " + oido)
    print(f"\nCoincidencia con el guion: {round(100 * sm.ratio())} %")
    if raros: print("Diferencias (guion → lo que se oyó):"); [print(f"  - «{a}» → «{b}»") for a, b in raros]
    if dudosos: print("Términos que NO se entienden como deberían:", ", ".join(dudosos))
    linea = f"oído: {round(100 * sm.ratio())} % de coincidencia; dudosos: {', '.join(dudosos) or 'ninguno'}; diferencias: " + \
            "; ".join(f"{a}→{b}" for a, b in raros[:12])
    subprocess.run([sys.executable, f"{D}/estado.py", "log", slug, "oido", linea], check=False)
    return dudosos


def cmd_probar(termino, frase, variantes):
    carpeta = f"{D}/pronunciacion/{re.sub(r'[^a-z0-9]+', '-', termino.lower()).strip('-')}"; os.makedirs(carpeta, exist_ok=True)
    filas = []
    for i, v in enumerate(variantes, 1):
        mp3 = f"{carpeta}/{i}.mp3"; tts(frase.replace("##", v), mp3)
        pes, pen = oir_palabras(mp3, "es"), oir_palabras(mp3, "en")
        es, en = "".join(w.word for w in pes).strip(), "".join(w.word for w in pen).strip()
        objetivo = frase.replace("##", termino)
        def nota(pal, txt):  # se entiende como el término y sin dudar
            ps = [w.probability for w in pal if any(parecido(t, w.word) > 0.6 for t in termino.split())]
            return parecido(objetivo, txt) * (min(ps) if ps else 0.5)
        puntaje = max(nota(pes, es), nota(pen, en))
        filas.append((puntaje, i, v, es, en))
        print(f"{i}. «{v}» → es: «{es}» · en: «{en}» · {round(100 * puntaje)} %")
    # un solo audio con "uno… dos… tres…" para que el dueño compare de oído
    lista = f"{carpeta}/lista.txt"
    with open(lista, "w") as f:
        for _, i, *_ in sorted(filas, key=lambda x: x[1]): f.write(f"file '{i}.mp3'\nfile 'pausa.mp3'\n")
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-f", "lavfi", "-i", "anullsrc=r=44100:cl=mono", "-t", "0.8", f"{carpeta}/pausa.mp3"])
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-f", "concat", "-safe", "0", "-i", lista, "-c:a", "libmp3lame", "-q:a", "3", f"{carpeta}/todas.mp3"])
    mejor = max(filas)
    g = glosario(); previo = g.get(termino, {})
    if previo.get("estado") != "confirmada":
        g[termino] = {"dicho": mejor[2], "estado": "probada", "puntaje": round(mejor[0], 2), "variantes": [f[2] for f in sorted(filas, key=lambda x: x[1])]}
        json.dump(g, open(GLOS, "w"), ensure_ascii=False, indent=1)
    print(f"\nGanadora: {mejor[1]}. «{mejor[2]}» ({round(100 * mejor[0])} %). Audios: {carpeta}/todas.mp3")


if __name__ == "__main__":
    a = sys.argv[1:]
    if not a: sys.exit(__doc__)
    if a[0] == "oir" and len(a) == 2: cmd_oir(a[1])
    elif a[0] == "probar" and len(a) >= 4: cmd_probar(a[1], a[2], a[3:])
    elif a[0] == "glosario": [print(f"{k}: [{v['dicho']}|{k}] ({v['estado']})") for k, v in sorted(glosario().items())]
    else: sys.exit(__doc__)
