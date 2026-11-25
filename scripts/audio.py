#!/usr/bin/env python3
"""Mezcla final: voz + música sintetizada (18-20 dB abajo) + SFX sincronizados -> public/mix.wav a -14 LUFS."""
import json, os, subprocess, wave
import numpy as np
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__))); SR = 44100
rng = np.random.default_rng(7)
def rd(p):
    w = wave.open(p); a = np.frombuffer(w.readframes(w.getnframes()), np.int16).astype(np.float32) / 32768; return a
voice = rd(f"{ROOT}/public/voz.wav"); N = len(voice); T = N / SR
_r = 20 * np.log10(np.sqrt(np.mean(voice[np.abs(voice) > 1e-4] ** 2)) + 1e-9)
voice = np.tanh(voice * 10 ** ((-13 - _r) / 20) * 0.9) / 0.9   # todas las voces al mismo nivel antes de mezclar
tl = np.arange(N) / SR
def env(n, a=0.005, d=0.2): t = np.arange(n) / SR; return np.minimum(1, t / a) * np.exp(-t / d)
def tone(f, dur, a=0.005, d=0.2, h=(1,)):
    n = int(dur * SR); t = np.arange(n) / SR; x = sum(np.sin(2 * np.pi * f * (i + 1) * t) * amp for i, amp in enumerate(h)); return x * env(n, a, d)
def lp(x, k):  # pasa-bajos de un polo (k chico = más grave)
    y = np.empty_like(x); acc = 0.0
    for i in range(len(x)): acc += k * (x[i] - acc); y[i] = acc
    return y
# ---------- música: Am F C G, 100 bpm ----------
bpm = 100; beat = 60 / bpm; bar = 4 * beat
chords = [[57, 60, 64], [53, 57, 60], [48, 52, 55], [55, 59, 62]]
hz = lambda m: 440 * 2 ** ((m - 69) / 12)
L = np.zeros(N + SR * 4, np.float32); R = np.zeros_like(L)
def add(buf, x, t0, g=1.0):
    i = int(t0 * SR)
    if i < 0 or i >= len(buf): return
    x = x[: len(buf) - i]; buf[i:i + len(x)] += x * g
nbars = int(T / bar) + 2
kick = np.sin(2 * np.pi * np.cumsum(np.linspace(120, 42, int(0.28 * SR))) / SR) * env(int(0.28 * SR), 0.002, 0.09)
hat = np.diff(rng.standard_normal(int(0.05 * SR) + 1)) * env(int(0.05 * SR), 0.001, 0.012)
for b in range(nbars):
    ch = chords[b % 4]; t0 = b * bar; n = int(bar * SR); t = np.arange(n) / SR
    pad = sum(np.sin(2 * np.pi * hz(m) * t * dt) for m in ch for dt in (0.997, 1.003)) / 6
    pad += sum(np.sin(2 * np.pi * hz(m + 12) * t) for m in ch) / 9
    pe = np.minimum(1, t / 0.35) * np.minimum(1, (bar - t) / 0.35)
    add(L, pad * pe, t0, 0.20); add(R, pad * pe, t0 + 0.012, 0.20)
    intense = 1.0 if b >= 2 else 0.0                      # entra la base después del gancho
    for q in range(8):
        tq = t0 + q * beat / 2
        bs = tone(hz(ch[0] - 24), 0.3, 0.004, 0.16, (1, 0.35)); add(L, bs, tq, 0.42 * intense); add(R, bs, tq, 0.42 * intense)
        if q % 2 == 0: add(L, kick, tq, 0.55 * intense); add(R, kick, tq, 0.55 * intense)
        else: add(L, hat, tq, 0.05 * intense); add(R, hat, tq, 0.07 * intense)
    for s16 in range(16):
        m = ch[[0, 1, 2, 1][s16 % 4]] + 12 + (12 if s16 % 8 >= 4 else 0)
        pl = tone(hz(m), 0.25, 0.003, 0.09, (1, 0.25, 0.1)); ts = t0 + s16 * beat / 4
        add(L if s16 % 2 else R, pl, ts, 0.10); add(R if s16 % 2 else L, pl, ts + 0.09, 0.04)
music = np.stack([L[:N], R[:N]], 1)
fade = np.minimum(1, tl / 0.6) * np.minimum(1, (T - tl) / 1.2); music *= fade[:, None]
# ---------- SFX ----------
sfx = np.zeros((N + SR * 3, 2), np.float32)
def put(x, t, g=1.0, pan=0.0):
    i = int(t * SR); x = x[: len(sfx) - i]; sfx[i:i + len(x), 0] += x * g * (1 - max(0, pan)); sfx[i:i + len(x), 1] += x * g * (1 + min(0, pan))
nz = rng.standard_normal(int(0.32 * SR)).astype(np.float32)
sw = np.linspace(0, 1, len(nz)); whoosh = (lp(nz, 0.08) * np.sin(np.pi * sw) ** 2 * 2.2 + np.diff(np.concatenate([[0], lp(nz, 0.5)])) * np.sin(np.pi * sw) ** 4)
def blip(f0, f1, dur, d=0.05): n = int(dur * SR); return np.sin(2 * np.pi * np.cumsum(np.linspace(f0, f1, n)) / SR) * env(n, 0.002, d)
pops = [blip(520 * r, 880 * r, 0.09) for r in (1, 1.12, 1.26, 0.9, 1.5)]
bad = blip(300, 110, 0.22, 0.09) + 0.4 * blip(303, 113, 0.22, 0.09)
boom = blip(95, 38, 0.7, 0.22) * 1.2 + lp(rng.standard_normal(int(0.7 * SR)), 0.03) * env(int(0.7 * SR), 0.002, 0.12) * 1.5
tick = blip(1900, 1700, 0.03, 0.008)
coin = blip(1320, 1320, 0.12, 0.05) + 0.6 * blip(1980, 1980, 0.12, 0.04)
nr = int(0.5 * SR); riser = lp(rng.standard_normal(nr), 0.2) * np.linspace(0, 1, nr) ** 2
ev = json.load(open(f"{ROOT}/guion/events.json")); last = {}
for i, e in enumerate(ev):
    t, k = e["t"], e["k"]
    if t - last.get(k, -9) < 0.07: continue
    last[k] = t; pan = ((i * 37) % 11 - 5) / 12
    if k == "cut" and t > 0.1: put(whoosh, max(0, t - 0.12), 0.20)
    elif k == "pop": put(pops[i % len(pops)], t, 0.20, pan)
    elif k == "bad": put(bad, t, 0.32, pan)
    elif k == "swarm":
        for j in range(8): put(pops[(i + j) % len(pops)], t + j * 0.06, 0.09, ((j * 5) % 7 - 3) / 5)
    elif k == "coins":
        for j in range(6): put(coin, t + j * 0.11, 0.07, pan)
    elif k == "boom": put(boom, t, 0.42)
    elif k == "count":
        put(boom, t, 0.36)
        for j in range(14): put(tick, t + 0.06 * j, 0.10)
        put(coin, t + 0.9, 0.16)
    elif k == "chapter": put(riser, max(0, t - 0.1), 0.10); put(boom, t + 0.05, 0.5)
sfx = sfx[:N]
# ---------- niveles ----------
rms = lambda x: 20 * np.log10(np.sqrt(np.mean(x[np.abs(x) > 1e-4] ** 2)) + 1e-9)
music *= 10 ** ((rms(voice) - 19 - rms(music.mean(1))) / 20)
mix = np.stack([voice, voice], 1) + music + sfx
mix = np.tanh(mix * 1.0)
tmp = f"{ROOT}/out/premix.wav"; os.makedirs(f"{ROOT}/out", exist_ok=True)
with wave.open(tmp, "wb") as w: w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((np.clip(mix, -1, 1) * 32767).astype(np.int16).tobytes())
subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", tmp, "-af", "loudnorm=I=-14:TP=-1.5:LRA=11", "-ar", "48000", f"{ROOT}/public/mix.wav"], check=True)
print("voz rms", round(rms(voice), 1), "musica rms", round(rms(music.mean(1)), 1), "sfx rms", round(rms(sfx.mean(1)), 1), "dur", round(T, 2))
