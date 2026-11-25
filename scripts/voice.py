#!/usr/bin/env python3
"""Genera la voz por párrafos con ElevenLabs (with-timestamps), recorta silencios
entre frases y escribe public/voz.wav + src/timing.json (beats y palabras)."""
import json, re, subprocess, base64, os, sys, wave
import numpy as np
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
VOICE = os.environ.get("VOICE_ID", "QK4xDwo9ESPHA4JNUpX3")
SR = 44100; MAXGAP = 0.30; PAD_IN = 0.04; PAD_OUT = 0.10
paras = json.load(open(f"{ROOT}/guion/parrafos.json"))
cache = f"{ROOT}/guion/.voz"; os.makedirs(cache, exist_ok=True)
G = re.compile(r"\[([^|\]]+)\|([^\]]+)\]")

def tokens(sentence):
    """-> lista de (texto_hablado, texto_mostrado). Un grupo [a b|X] es 1 token."""
    out, pos = [], 0
    for m in G.finditer(sentence):
        out += [(w, w) for w in sentence[pos:m.start()].split()]
        out.append((m.group(1), m.group(2))); pos = m.end()
    out += [(w, w) for w in sentence[pos:].split()]
    # pegar puntuación suelta al token anterior
    res = []
    for sp, sh in out:
        if res and re.fullmatch(r"[.,:;?!]+", sp): res[-1] = (res[-1][0] + sp, res[-1][1] + sh)
        else: res.append((sp, sh))
    return res

audio, beats, t_out, bi = [], [], 0.0, 0
for pi, para in enumerate(paras):
    toks = [tokens(s) for s in para]
    spoken = " ".join(" ".join(sp for sp, _ in ts) for ts in toks)
    key = f"{cache}/p{pi:02d}"
    if not (os.path.exists(key + ".json") and json.load(open(key + ".json")).get("text") == spoken):
        body = json.dumps({"text": spoken, "model_id": "eleven_multilingual_v2",
                           "voice_settings": {"stability": 0.45, "similarity_boost": 0.8, "style": 0.25, "speed": 1.08}})
        r = subprocess.run(["curl", "-sS", "-m", "180", "-X", "POST",
            f"https://api.elevenlabs.io/v1/text-to-speech/{VOICE}/with-timestamps?output_format=mp3_44100_128",
            "-H", "Content-Type: application/json", "-d", body], capture_output=True, text=True)
        d = json.loads(r.stdout)
        if "audio_base64" not in d: sys.exit(f"ElevenLabs error p{pi}: {r.stdout[:400]}")
        d["text"] = spoken; json.dump(d, open(key + ".json", "w"))
        open(key + ".mp3", "wb").write(base64.b64decode(d["audio_base64"]))
    d = json.load(open(key + ".json")); al = d["alignment"]
    pcm = np.frombuffer(subprocess.run(["ffmpeg", "-v", "error", "-i", key + ".mp3", "-ac", "1", "-ar", str(SR),
                        "-f", "s16le", "-"], capture_output=True).stdout, dtype=np.int16).astype(np.float32)
    chars, cs, ce = al["characters"], al["character_start_times_seconds"], al["character_end_times_seconds"]
    assert "".join(chars) == spoken, "alineación no coincide con el texto"
    c = 0; prev_end = None
    for si, ts in enumerate(toks):
        words = []
        for sp, sh in ts:
            while spoken[c] == " ": c += 1
            a, b = c, c + len(sp); assert spoken[a:b] == sp
            words.append({"w": sh, "s": cs[a], "e": ce[b - 1]}); c = b
        s0 = max(0.0, words[0]["s"] - PAD_IN); e0 = words[-1]["e"] + PAD_OUT
        if prev_end is not None:                      # no pisar la frase anterior
            s0 = max(s0, prev_end)
        nxt = None
        if si + 1 < len(toks):                        # límite: inicio de la próxima frase
            j = c
            while spoken[j] == " ": j += 1
            nxt = cs[j] - PAD_IN
            e0 = min(max(e0, words[-1]["e"]), max(nxt, words[-1]["e"]))
        else: e0 = min(e0 + 0.05, len(pcm) / SR)
        seg = pcm[int(s0 * SR):int(e0 * SR)].copy()
        f = int(0.008 * SR); seg[:f] *= np.linspace(0, 1, f); seg[-f:] *= np.linspace(1, 0, f)
        gap = 0.0 if nxt is None else min(MAXGAP, max(0.0, nxt - e0))
        if nxt is None and pi + 1 < len(paras): gap = MAXGAP
        audio += [seg, np.zeros(int(gap * SR), np.float32)]
        dur = len(seg) / SR
        beats.append({"id": f"b{bi+1:02d}", "start": round(t_out, 3), "end": round(t_out + dur + gap, 3),
                      "text": " ".join(sh for _, sh in ts),
                      "words": [{"w": w["w"], "s": round(t_out + w["s"] - s0, 3), "e": round(t_out + w["e"] - s0, 3)} for w in words]})
        t_out += dur + gap; bi += 1; prev_end = e0
out = np.concatenate(audio + [np.zeros(int(0.4 * SR), np.float32)])
with wave.open(f"{ROOT}/public/voz.wav", "wb") as w:
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes(np.clip(out, -32768, 32767).astype(np.int16).tobytes())
json.dump({"duration": round(len(out) / SR, 3), "beats": beats}, open(f"{ROOT}/src/timing.json", "w"), ensure_ascii=False, indent=1)
print("beats", len(beats), "dur", round(len(out) / SR, 2))
for b in beats: print(b["id"], b["start"], round(b["end"] - b["start"], 2), b["text"][:60])
