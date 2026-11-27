import React from 'react';
import * as THREE from 'three';
import { M, Label, useTex } from '../../src/kit/Props';
import { clamp, eio, eo, lerp } from '../../src/kit/math';

// Look propio de la versión 2 (el original era ciudad neón violeta con monitores, monedas y gráficos):
// terminal de aeropuerto (terrazo crema, ventanales al atardecer naranja, cartel de vuelos de paletas, mostradores),
// pista de noche (asfalto, luces ámbar), sala de directorio (nogal, bordó, bronce) y sala de reguladores (piedra gris,
// columnas). Señalética de aeropuerto: amarillo y negro. Nada de logos reales.
type P = { t: number; tt: number; p: any };
type V3 = [number, number, number];
const B: React.FC<{ s: V3; pos?: V3; rot?: V3; c: string; e?: string; ei?: number }> = ({ s, pos, rot, c, e, ei }) => (
  <mesh position={pos} rotation={rot}><boxGeometry args={s} /><M c={c} e={e} ei={ei} /></mesh>
);
const Flat: React.FC<{ s: [number, number]; pos?: V3; rot?: V3; c?: string; map?: THREE.Texture; o?: number }> = ({ s, pos, rot, c = '#fff', map, o }) => (
  <mesh position={pos} rotation={rot}><planeGeometry args={s} /><meshBasicMaterial color={c} map={map} toneMapped={false} transparent={o !== undefined} opacity={o ?? 1} /></mesh>
);
const Cyl: React.FC<{ r: number; h: number; pos?: V3; rot?: V3; c: string; e?: string; ei?: number; seg?: number; r2?: number }> = ({ r, h, pos, rot, c, e, ei, seg = 10, r2 }) => (
  <mesh position={pos} rotation={rot}><cylinderGeometry args={[r2 ?? r, r, h, seg]} /><M c={c} e={e} ei={ei} /></mesh>
);

export const CREAM = '#efe6d2', TEAL = '#0f5c63', ORANGE = '#ff7a1a', SIGN = '#ffcc1f', INK = '#141414', BSOD = '#1f5fd1',
  WALNUT = '#5a3620', BURG = '#5b1a24', BRASS = '#c9a24a', STONE = '#9aa0a6', RED = '#e0262b', GREEN = '#22b35e';

/* ---------- Escenarios (se apoyan sobre el set 'room' y lo tapan) ---------- */
export const Stage: React.FC<P> = ({ t, p }) => {
  const kind = p.kind ?? 'terminal';
  const terr = useTex((g, W, H) => {
    g.fillStyle = '#e9dfc8'; g.fillRect(0, 0, W, H);
    let s = 7; const r = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
    for (let i = 0; i < 2600; i++) { g.fillStyle = ['#b9ad93', '#8c7f68', '#d6c9ab', '#5f8f8f'][i % 4]; g.fillRect(r() * W, r() * H, 3, 3); }
    g.strokeStyle = 'rgba(80,70,50,.35)'; g.lineWidth = 3;
    for (let i = 0; i <= 8; i++) { g.beginPath(); g.moveTo((i * W) / 8, 0); g.lineTo((i * W) / 8, H); g.stroke(); g.beginPath(); g.moveTo(0, (i * H) / 8); g.lineTo(W, (i * H) / 8); g.stroke(); }
  }, 512, 512, 'cz2terr');
  const sky = useTex((g, W, H) => {
    const gr = g.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, '#2b3a67'); gr.addColorStop(0.5, '#c8576a'); gr.addColorStop(0.78, '#ff9a3c'); gr.addColorStop(1, '#ffd27a');
    g.fillStyle = gr; g.fillRect(0, 0, W, H); g.fillStyle = '#1d2438'; g.fillRect(0, H * 0.86, W, H * 0.14);
    g.fillStyle = '#ffe9b0'; g.beginPath(); g.arc(W * 0.7, H * 0.74, 34, 0, Math.PI * 2); g.fill();
  }, 512, 256, 'cz2sky');
  if (kind === 'terminal') return (
    <group>
      <pointLight position={[0, 3.4, 2.6]} intensity={22} color="#fff1d6" distance={12} />
      <pointLight position={[2.5, 2.0, -2.5]} intensity={14} color={ORANGE} distance={8} />
      <Flat s={[24, 24]} pos={[0, 0.02, 0]} rot={[-Math.PI / 2, 0, 0]} map={terr} />
      {/* pared del fondo: zócalo verde petróleo + ventanal */}
      <B s={[12, 1.0, 0.2]} pos={[0, 0.5, -3.75]} c={TEAL} />
      <B s={[12, 0.06, 0.24]} pos={[0, 1.02, -3.72]} c={SIGN} e={SIGN} ei={0.3} />
      <Flat s={[9, 3.2]} pos={[0, 2.65, -3.84]} map={sky} />
      {[-4.5, -2.25, 0, 2.25, 4.5].map((x) => <B key={x} s={[0.14, 3.3, 0.16]} pos={[x, 2.65, -3.72]} c="#2a2a2a" />)}
      <B s={[12, 0.16, 0.16]} pos={[0, 4.3, -3.72]} c="#2a2a2a" />
      <B s={[12, 4, 0.2]} pos={[0, 6.4, -3.75]} c="#ddd3bd" />
      {/* avión estacionado afuera, recortado contra el atardecer */}
      <group position={[2.2, 1.35, -5.2]} rotation={[0, -0.5, 0]} scale={0.8}>
        <Cyl r={0.32} h={4.2} rot={[0, 0, Math.PI / 2]} c="#2d2f3a" /><B s={[0.9, 0.06, 4.2]} pos={[0.2, -0.05, 0]} c="#2d2f3a" />
        <B s={[0.5, 0.9, 0.06]} pos={[-1.9, 0.5, 0]} c="#2d2f3a" />
      </group>
      {[-4.3, 4.3].map((x) => <B key={x} s={[0.2, 9, 12]} pos={[x, 4.5, 0]} c="#e2d8c2" />)}
      {/* cartel colgante de puertas */}
      <group position={[-2.6, 3.05, -2.6]}>
        <B s={[0.03, 0.6, 0.03]} pos={[0, 0.5, 0]} c="#333" />
        <Label t={t} tt={0} p={{ text: 'PUERTAS 1-12  →', w: 1.5, h: 0.34, bg: SIGN, color: INK, size: 0.6, weight: 900, depth: 0.05 }} />
      </group>
    </group>
  );
  if (kind === 'tarmac') {
    const asph = useTex((g, W, H) => {
      g.fillStyle = '#23262b'; g.fillRect(0, 0, W, H);
      let s = 3; const r = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
      for (let i = 0; i < 1500; i++) { g.fillStyle = i % 2 ? '#2d3036' : '#1b1e22'; g.fillRect(r() * W, r() * H, 4, 4); }
      g.fillStyle = SIGN; for (let y = 0; y < H; y += 64) g.fillRect(W / 2 - 5, y, 10, 36);
      g.fillStyle = '#e8e8e8'; g.fillRect(W * 0.18, 0, 6, H); g.fillRect(W * 0.82, 0, 6, H);
    }, 512, 512, 'cz2asph');
    const night = useTex((g, W, H) => {
      const gr = g.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, '#060d1c'); gr.addColorStop(0.7, '#15325a'); gr.addColorStop(1, '#3b5f7a');
      g.fillStyle = gr; g.fillRect(0, 0, W, H);
      g.fillStyle = '#0a1220'; g.fillRect(0, H * 0.72, W, H * 0.28);
      for (let i = 0; i < 46; i++) { g.fillStyle = i % 3 ? '#ffb347' : '#fff1c4'; g.fillRect(10 + i * 11, H * 0.78 + (i % 4) * 9, 6, 4); }
      g.fillStyle = '#fff'; for (let i = 0; i < 60; i++) g.fillRect((i * 97) % W, (i * 53) % (H * 0.6), 2, 2);
    }, 512, 256, 'cz2night');
    return (
      <group>
        <pointLight position={[0, 4, 3]} intensity={20} color="#cfe0ff" distance={14} />
        <pointLight position={[-3, 1.2, 1]} intensity={14} color={ORANGE} distance={8} />
        <Flat s={[30, 30]} pos={[0, 0.02, 0]} rot={[-Math.PI / 2, Math.PI / 2, 0]} map={asph} />
        <Flat s={[60, 22]} pos={[0, 6, -14]} map={night} />
        {Array.from({ length: 14 }, (_, i) => { const x = i % 2 ? 3.2 : -3.2, z = 3 - Math.floor(i / 2) * 1.8; const on = 0.6 + 0.4 * Math.max(0, Math.sin(t * 4 - i * 0.6));
          return <mesh key={i} position={[x, 0.08, z]}><sphereGeometry args={[0.07, 8, 6]} /><M c={ORANGE} e={ORANGE} ei={1.5 * on} /></mesh>; })}
      </group>
    );
  }
  if (kind === 'board') {
    const wood = useTex((g, W, H) => {
      for (let i = 0; i < 16; i++) { g.fillStyle = i % 3 === 0 ? '#5f3a22' : i % 3 === 1 ? '#6d4429' : '#553320'; g.fillRect(0, (i * H) / 16, W, H / 16 + 1); }
      g.strokeStyle = 'rgba(0,0,0,.35)'; g.lineWidth = 2; for (let i = 0; i <= 16; i++) { g.beginPath(); g.moveTo(0, (i * H) / 16); g.lineTo(W, (i * H) / 16); g.stroke(); }
      for (let i = 0; i < 40; i++) { g.beginPath(); const y = (i * H) / 16 / 2.5; g.moveTo(((i * 137) % W), y % H); g.lineTo(((i * 137) % W) + 2, (y % H) + H / 16); g.stroke(); }
    }, 512, 512, 'cz2wood');
    return (
      <group>
        <pointLight position={[0, 3.3, 2]} intensity={22} color="#ffd9a6" distance={12} />
        <pointLight position={[-2.6, 2.4, -2]} intensity={10} color={BRASS} distance={7} />
        <Flat s={[24, 24]} pos={[0, 0.02, 0]} rot={[-Math.PI / 2, 0, 0]} map={wood} />
        <B s={[12, 9, 0.2]} pos={[0, 4.5, -3.75]} c={BURG} />
        <B s={[12, 1.1, 0.26]} pos={[0, 0.55, -3.62]} c="#3b1f12" />
        <B s={[12, 0.06, 0.3]} pos={[0, 1.12, -3.6]} c={BRASS} />
        {[-4.3, 4.3].map((x) => <B key={x} s={[0.2, 9, 12]} pos={[x, 4.5, 0]} c="#4a1620" />)}
        {[-2.3, 0, 2.3].map((x, i) => <group key={x} position={[x, 2.55, -3.62]}>
          <B s={[1.3, 0.95, 0.06]} c={BRASS} /><Flat s={[1.14, 0.8]} pos={[0, 0, 0.035]} c={['#2b3a52', '#3d5240', '#5a3a2a'][i]} />
          <Flat s={[0.7, 0.3]} pos={[0.1 - i * 0.1, -0.12, 0.04]} c={['#b0884a', '#c7b089', '#d8b26b'][i]} /></group>)}
        {[-3.0, 3.0].map((x) => <group key={x} position={[x, 0, -2.8]}>
          <Cyl r={0.05} h={1.9} pos={[0, 0.95, 0]} c={BRASS} /><Cyl r={0.36} h={0.38} r2={0.2} pos={[0, 2.0, 0]} c="#f1e3c0" e="#ffe3a8" ei={0.7} /></group>)}
      </group>
    );
  }
  // hall: sala de reguladores
  return (
    <group>
      <pointLight position={[0, 3.6, 2.5]} intensity={24} color="#eef3ff" distance={13} />
      <Flat s={[24, 24]} pos={[0, 0.02, 0]} rot={[-Math.PI / 2, 0, 0]} c="#8d9298" />
      {Array.from({ length: 10 }, (_, i) => <Flat key={i} s={[24, 0.02]} pos={[0, 0.03, 3 - i * 0.8]} rot={[-Math.PI / 2, 0, 0]} c="#6f747a" />)}
      <B s={[12, 9, 0.2]} pos={[0, 4.5, -3.75]} c="#c8ccd2" />
      {[-4.3, 4.3].map((x) => <B key={x} s={[0.2, 9, 12]} pos={[x, 4.5, 0]} c="#b5bac1" />)}
      {[-3.2, -1.6, 1.6, 3.2].map((x) => <group key={x} position={[x, 0, -3.2]}>
        <B s={[0.7, 0.2, 0.7]} pos={[0, 0.1, 0]} c="#e3e6ea" /><Cyl r={0.26} h={4.2} pos={[0, 2.3, 0]} c="#e9ecef" seg={12} /><B s={[0.7, 0.2, 0.7]} pos={[0, 4.45, 0]} c="#e3e6ea" /></group>)}
      <B s={[12, 0.3, 0.6]} pos={[0, 4.4, -3.4]} c="#dfe2e6" />
    </group>
  );
};

/* ---------- Cartel de vuelos de paletas ---------- */
/** p.rows: [{ f, city, st, c, flip?: segundos (tt), to?, toC? }] */
export const Flap: React.FC<P> = ({ tt, p }) => {
  const { rows = [], w = 3.2, h = 1.5 } = p;
  const state = rows.map((r: any) => (r.flip !== undefined && tt >= r.flip ? (tt < r.flip + 0.35 ? 'x' : 'b') : 'a')).join('');
  const tx = useTex((g, W, H) => {
    g.fillStyle = '#0c0d10'; g.fillRect(0, 0, W, H);
    const n = rows.length + 1; const rh = H / n;
    g.fillStyle = SIGN; g.fillRect(0, 0, W, rh * 0.9); g.fillStyle = INK; g.font = `900 ${rh * 0.5}px Poppins`; g.textBaseline = 'middle';
    g.textAlign = 'left'; g.fillText('PARTIDAS', 24, rh * 0.47); g.textAlign = 'right'; g.fillText('ESTADO', W - 24, rh * 0.47);
    rows.forEach((r: any, i: number) => {
      const y = rh * (i + 1.5); const s = state[i];
      for (let k = 0; k < 26; k++) { g.fillStyle = '#1c1e24'; g.fillRect(16 + k * ((W - 32) / 26), y - rh * 0.38, (W - 32) / 26 - 4, rh * 0.76); }
      g.fillStyle = 'rgba(0,0,0,.6)'; g.fillRect(16, y - 1, W - 32, 2);
      g.font = `800 ${rh * 0.46}px monospace`; g.textAlign = 'left'; g.fillStyle = '#f4f1e6'; g.fillText(r.f, 26, y); g.fillText(r.city, W * 0.25, y);
      const st = s === 'a' ? r.st : s === 'x' ? '#%&@?#&' : r.to; const c = s === 'a' ? (r.c ?? '#f4f1e6') : s === 'x' ? '#888' : (r.toC ?? RED);
      g.textAlign = 'right'; g.fillStyle = c; g.fillText(st, W - 26, y);
    });
  }, 1024, Math.round((1024 * h) / w), 'flap' + JSON.stringify(rows) + state + w + h);
  return (
    <group>
      <B s={[w + 0.16, h + 0.16, 0.14]} pos={[0, 0, -0.08]} c="#2a2a2a" />
      <Flat s={[w, h]} map={tx} />
      {[-w / 3, w / 3].map((x) => <B key={x} s={[0.03, 1.2, 0.03]} pos={[x, h / 2 + 0.6, -0.05]} c="#333" />)}
    </group>
  );
};

/* ---------- Mostrador de check-in con pantalla (se pone azul) ---------- */
const screenTex = (blue: boolean) => (g: CanvasRenderingContext2D, W: number, H: number) => {
  if (blue) {
    g.fillStyle = BSOD; g.fillRect(0, 0, W, H); g.fillStyle = '#fff'; g.font = `700 ${H * 0.34}px Poppins`; g.textBaseline = 'top'; g.fillText(':(', W * 0.08, H * 0.08);
    g.globalAlpha = 0.85; for (let i = 0; i < 4; i++) g.fillRect(W * 0.08, H * (0.56 + i * 0.1), W * (0.8 - i * 0.14), H * 0.04);
  } else {
    g.fillStyle = '#f4f1e6'; g.fillRect(0, 0, W, H); g.fillStyle = TEAL; g.fillRect(0, 0, W, H * 0.22);
    g.fillStyle = '#fff'; g.font = `800 ${H * 0.13}px Poppins`; g.textBaseline = 'middle'; g.fillText('CHECK-IN', W * 0.06, H * 0.11);
    g.fillStyle = '#9aa'; for (let i = 0; i < 4; i++) g.fillRect(W * 0.06, H * (0.34 + i * 0.13), W * (0.7 - (i % 2) * 0.25), H * 0.06);
    g.fillStyle = ORANGE; g.fillRect(W * 0.62, H * 0.76, W * 0.3, H * 0.14);
  }
};
export const Screen2: React.FC<P> = ({ tt, p }) => {
  const { w = 0.9, h = 0.6, blue } = p; const isBlue = blue === true || (typeof blue === 'number' && tt >= blue);
  const flick = typeof blue === 'number' && tt >= blue && tt < blue + 0.12;
  const tx = useTex(screenTex(isBlue), 512, Math.round((512 * h) / w), 'scr' + isBlue + w + h);
  return (
    <group>
      <B s={[w + 0.08, h + 0.08, 0.06]} pos={[0, 0, -0.035]} c="#1d1d1f" />
      <Flat s={[w, h]} map={tx} c={flick ? '#ffffff' : '#e8e8e8'} />
      {isBlue && <mesh position={[0, 0, 0.02]}><planeGeometry args={[w * 1.8, h * 1.8]} /><meshBasicMaterial color={BSOD} transparent opacity={0.18} toneMapped={false} depthWrite={false} blending={THREE.AdditiveBlending} /></mesh>}
    </group>
  );
};
export const Kiosk: React.FC<P> = (a) => {
  const { sign } = a.p;
  return (
    <group>
      <B s={[1.05, 1.0, 0.6]} pos={[0, 0.5, 0]} c={CREAM} />
      <B s={[1.1, 0.06, 0.66]} pos={[0, 1.02, 0]} c={TEAL} />
      <B s={[1.06, 0.14, 0.02]} pos={[0, 0.82, 0.31]} c={ORANGE} />
      <B s={[0.08, 0.45, 0.08]} pos={[0, 1.25, -0.15]} c="#333" />
      <group position={[0, 1.7, -0.12]} rotation={[-0.08, 0, 0]}><Screen2 {...a} p={{ w: 0.86, h: 0.56, ...a.p }} /></group>
      {sign && <group position={[0, 2.25, -0.2]}><Label t={a.t} tt={a.tt} p={{ text: sign, w: 0.8, h: 0.26, bg: SIGN, color: INK, size: 0.68, weight: 900, depth: 0.04 }} /></group>}
    </group>
  );
};

/* ---------- Valija ---------- */
export const Bag: React.FC<P> = ({ p }) => {
  const { color = ORANGE, s = [0.5, 0.7, 0.24] } = p;
  return (
    <group>
      <B s={s} pos={[0, s[1] / 2 + 0.06, 0]} c={color} />
      {[-0.3, 0.3].map((k) => <B key={k} s={[s[0] + 0.01, 0.04, s[2] + 0.01]} pos={[0, s[1] / 2 + 0.06 + k * s[1], 0]} c="#2a2a2a" />)}
      <B s={[0.04, 0.22, 0.04]} pos={[-0.1, s[1] + 0.17, 0]} c="#333" /><B s={[0.04, 0.22, 0.04]} pos={[0.1, s[1] + 0.17, 0]} c="#333" />
      <B s={[0.24, 0.04, 0.05]} pos={[0, s[1] + 0.28, 0]} c="#333" />
      {[-1, 1].map((k) => <mesh key={k} position={[k * (s[0] / 2 - 0.06), 0.04, 0]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.04, 0.04, 0.05, 8]} /><M c="#111" /></mesh>)}
    </group>
  );
};

/* ---------- Cinta de equipaje con una caja que llega ---------- */
/** p.crate: { at (tt), from, to, dur, bad (tt: se pone roja y tiembla) } */
export const Belt: React.FC<P> = ({ t, tt, p }) => {
  const { len = 4.6, crate = {} } = p; const off = (t * 0.6) % 0.3;
  const k = eio((tt - (crate.at ?? 0)) / (crate.dur ?? 1.0)); const x = lerp(crate.from ?? -2.2, crate.to ?? 0, k);
  const bad = crate.bad !== undefined && tt >= crate.bad; const sh = bad ? Math.sin(tt * 60) * 0.03 * Math.max(0, 1 - (tt - crate.bad) / 0.6) : 0;
  return (
    <group>
      <B s={[len, 0.5, 0.9]} pos={[0, 0.25, 0]} c="#3a3d44" />
      {Array.from({ length: Math.ceil(len / 0.3) }, (_, i) => { const xx = -len / 2 + i * 0.3 + off; return xx < len / 2 ? <B key={i} s={[0.26, 0.04, 0.82]} pos={[xx, 0.52, 0]} c="#565a63" /> : null; })}
      {[-0.47, 0.47].map((z) => <B key={z} s={[len, 0.1, 0.06]} pos={[0, 0.56, z]} c={SIGN} />)}
      {(crate.at === undefined || tt >= crate.at) && <group position={[x + sh, 0.86, 0]} rotation={[0, bad ? 0.12 : 0, bad ? 0.06 : 0]}>
        <B s={[0.62, 0.6, 0.6]} c={bad ? RED : '#c79a5a'} e={bad ? RED : undefined} ei={0.35} />
        <B s={[0.64, 0.1, 0.62]} c={bad ? '#7a0f12' : '#8a6233'} />
        <B s={[0.1, 0.62, 0.62]} c={bad ? '#7a0f12' : '#8a6233'} />
        <group position={[0, 0.12, 0.31]}><Label t={t} tt={tt} p={{ text: bad ? '✕' : '⟳', w: 0.34, h: 0.3, color: '#fff', size: 0.9, weight: 900, depth: 0 }} /></group>
      </group>}
    </group>
  );
};

/* ---------- Mosaico de pantallas vistas desde arriba (se ponen azules en ola) ---------- */
export const Tiles: React.FC<P> = ({ tt, p }) => {
  const { cols = 11, rows = 15, gap = 0.36, start = 0.2, speed = 3.2 } = p;
  const w = cols * gap, d = rows * gap; const R = Math.hypot(w, d) / 2;
  return (
    <group>
      {Array.from({ length: cols * rows }, (_, i) => {
        const cx = -w / 2 + (i % cols) * gap + gap / 2, cz = -d / 2 + Math.floor(i / cols) * gap + gap / 2;
        const dist = Math.hypot(cx, cz) + ((i * 37) % 7) * 0.04; const on = tt - start > (dist / R) * (R / speed);
        return <group key={i} position={[cx, 0.06, cz]}>
          <B s={[gap * 0.86, 0.04, gap * 0.62]} c="#1d1d1f" />
          <Flat s={[gap * 0.76, gap * 0.52]} pos={[0, 0.025, 0]} rot={[-Math.PI / 2, 0, 0]} c={on ? '#2f74ff' : '#e7e2d2'} />
        </group>;
      })}
    </group>
  );
};

/* ---------- Escudo de cúpula (la empresa que las protege) ---------- */
export const Dome: React.FC<P> = ({ t, tt, p }) => {
  const { r = 1.2, color = '#7fd6ff' } = p; const k = eo(tt / 0.5);
  return (
    <group scale={[k, k, k]}>
      <mesh><sphereGeometry args={[r, 18, 10, 0, Math.PI * 2, 0, Math.PI / 2]} /><meshBasicMaterial color={color} transparent opacity={0.14 + Math.sin(t * 4) * 0.03} toneMapped={false} depthWrite={false} side={THREE.DoubleSide} /></mesh>
      <mesh><sphereGeometry args={[r, 12, 6, 0, Math.PI * 2, 0, Math.PI / 2]} /><meshBasicMaterial color={color} wireframe transparent opacity={0.45} toneMapped={false} /></mesh>
    </group>
  );
};

/* ---------- Avión de línea low-poly (sin marca) ---------- */
export const Jet: React.FC<P> = ({ t, p }) => {
  const { body = '#f2f2f0', stripe = ORANGE, tail = TEAL } = p;
  return (
    <group>
      <Cyl r={0.42} h={4.0} rot={[0, 0, Math.PI / 2]} pos={[0, 1.0, 0]} c={body} seg={12} />
      <mesh position={[2.3, 1.0, 0]} rotation={[0, 0, -Math.PI / 2]}><coneGeometry args={[0.42, 0.7, 12]} /><M c={body} /></mesh>
      <mesh position={[-2.35, 1.12, 0]} rotation={[0, 0, Math.PI / 2]}><coneGeometry args={[0.42, 0.8, 12]} /><M c={body} /></mesh>
      <B s={[4.0, 0.1, 0.02]} pos={[0, 0.98, 0.425]} c={stripe} /><B s={[4.0, 0.1, 0.02]} pos={[0, 0.98, -0.425]} c={stripe} />
      {Array.from({ length: 10 }, (_, i) => <B key={i} s={[0.12, 0.1, 0.02]} pos={[1.6 - i * 0.34, 1.18, 0.42]} c="#1e2a3a" />)}
      <B s={[0.34, 0.14, 0.02]} pos={[2.15, 1.22, 0.36]} rot={[0, 0.5, 0]} c="#1e2a3a" />
      <B s={[0.9, 0.08, 4.4]} pos={[0.1, 0.78, 0]} rot={[0, 0, 0.04]} c="#dcdcd8" />
      <B s={[0.8, 1.0, 0.08]} pos={[-2.2, 1.75, 0]} rot={[0, 0, -0.35]} c={tail} />
      <B s={[0.5, 0.06, 1.5]} pos={[-2.3, 1.2, 0]} c="#dcdcd8" />
      {[-1.1, 1.1].map((z) => <group key={z} position={[0.4, 0.5, z]}><Cyl r={0.18} h={0.6} rot={[0, 0, Math.PI / 2]} c="#b9bcc2" /><mesh position={[0.31, 0, 0]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.13, 0.13, 0.02, 12]} /><meshBasicMaterial color="#222" /></mesh></group>)}
      {[[1.6, 0], [-0.2, 0.5], [-0.2, -0.5]].map(([x, z], i) => <group key={i} position={[x, 0, z]}><B s={[0.05, 0.5, 0.05]} pos={[0, 0.4, 0]} c="#555" /><Cyl r={0.12} h={0.1} rot={[Math.PI / 2, 0, 0]} pos={[0, 0.12, 0]} c="#111" /></group>)}
      <mesh position={[-2.5, 2.2, 0]}><sphereGeometry args={[0.05, 6, 4]} /><M c={RED} e={RED} ei={Math.sin(t * 8) > 0 ? 3 : 0.2} /></mesh>
    </group>
  );
};

/* ---------- Ladrillos de billetes que se van ---------- */
export const Cash: React.FC<P> = ({ tt, p }) => {
  const { n = 12, lose, grow = 0.6 } = p; const m = Math.max(1, Math.round(eo(tt / grow) * n));
  return (
    <group>
      {Array.from({ length: m }, (_, i) => {
        const col = i % 3, lay = Math.floor(i / 3); let pos: V3 = [(col - 1) * 0.42, 0.09 + lay * 0.16, (lay % 2) * 0.05];
        let rot: V3 = [0, 0, 0];
        if (lose !== undefined) { const k = eio((tt - lose - (n - i) * 0.04) / 0.7); pos = [pos[0] + k * (1.6 + col * 0.5), pos[1] + k * (2.4 + lay * 0.3), pos[2] - k * 1.5]; rot = [k * 2, k * 3, k * 1.5]; }
        return <group key={i} position={pos} rotation={rot}><B s={[0.4, 0.15, 0.22]} c="#4c9a5d" /><B s={[0.08, 0.155, 0.225]} c="#e8e2c8" /></group>;
      })}
    </group>
  );
};

/* ---------- Torre de valijas: se cae un tercio de arriba ---------- */
export const Tower: React.FC<P> = ({ tt, p }) => {
  const { n = 12, fall, cut = 4 } = p; const cols = [ORANGE, TEAL, SIGN, '#c8576a', CREAM, '#3c4a6b'];
  return (
    <group>
      {Array.from({ length: n }, (_, i) => {
        const top = i >= n - cut; let pos: V3 = [Math.sin(i * 2.3) * 0.05, 0.13 + i * 0.25, Math.cos(i * 1.9) * 0.04]; let rot: V3 = [0, Math.sin(i * 1.7) * 0.15, 0];
        if (top && fall !== undefined) { const j = i - (n - cut); const k = clamp((tt - fall - j * 0.05) / 0.75); const e = k * k;
          pos = [pos[0] + (j % 2 ? -1 : 1) * e * (1.0 + j * 0.35), Math.max(0.13 + j * 0.05, pos[1] - e * (pos[1] - 0.13)), pos[2] + e * (0.6 + j * 0.2)]; rot = [e * (j % 2 ? 1.4 : -1.2), rot[1] + e, e * (j % 2 ? 1.5 : -1.5)]; }
        return <group key={i} position={pos} rotation={rot}><B s={[0.78, 0.24, 0.5]} c={cols[i % cols.length]} /><B s={[0.2, 0.05, 0.05]} pos={[0, 0.14, 0]} c="#2a2a2a" /></group>;
      })}
    </group>
  );
};

/* ---------- Arco de seguridad que filtra paquetes (verde pasa, rojo queda) ---------- */
export const Scanner: React.FC<P> = ({ t, tt, p }) => {
  const { start = 0.3, name } = p; const N = 7;
  return (
    <group>
      <B s={[0.24, 2.3, 0.5]} pos={[-0.85, 1.15, 0]} c="#d9d4c6" /><B s={[0.24, 2.3, 0.5]} pos={[0.85, 1.15, 0]} c="#d9d4c6" />
      <B s={[1.94, 0.3, 0.5]} pos={[0, 2.42, 0]} c="#d9d4c6" />
      {[-0.72, 0.72].map((x) => <B key={x} s={[0.02, 2.0, 0.3]} pos={[x, 1.15, 0]} c={TEAL} e="#5fe0d2" ei={0.9 + Math.sin(t * 6) * 0.3} />)}
      {name && <group position={[0, 2.42, 0.26]}><Label t={t} tt={tt} p={{ text: name, w: 1.7, h: 0.26, color: INK, size: 0.72, weight: 900, depth: 0 }} /></group>}
      <B s={[0.9, 0.08, 4.4]} pos={[0, 0.5, 0.4]} c="#3a3d44" />
      {Array.from({ length: N }, (_, i) => {
        const bad = i % 3 === 1; const ph = tt - start - i * 0.42; if (ph < 0) return null;
        const z = bad ? Math.min(-1.6 + ph * 1.6, -0.45) : -1.6 + ph * 1.6; if (z > 2.6) return null;
        const col = bad ? (z >= -0.45 ? RED : '#9aa0a6') : z > 0.2 ? GREEN : '#9aa0a6';
        return <group key={i} position={[0, 0.66, z]}><B s={[0.3, 0.24, 0.3]} c={col} e={col === '#9aa0a6' ? undefined : col} ei={0.5} /></group>;
      })}
    </group>
  );
};

/* ---------- Pilas de certificados de acciones sobre la mesa ---------- */
export const Certs: React.FC<P> = ({ tt, p }) => {
  const { n = 20, dur = 0.8, seal = BRASS } = p; const m = Math.max(1, Math.round(eo(tt / dur) * n));
  return (
    <group>
      {Array.from({ length: m }, (_, i) => <group key={i} position={[Math.sin(i * 2.1) * 0.02, 0.02 + i * 0.045, Math.cos(i * 1.3) * 0.02]} rotation={[0, Math.sin(i * 3.1) * 0.05, 0]}>
        <B s={[0.56, 0.035, 0.4]} c={i % 2 ? '#f3ead2' : '#e6dbbd'} /><B s={[0.5, 0.037, 0.04]} pos={[0, 0, 0.15]} c="#2d5a3d" /></group>)}
      <mesh position={[0.16, 0.06 + m * 0.045, 0.08]}><cylinderGeometry args={[0.07, 0.07, 0.02, 12]} /><M c={seal} e={seal} ei={0.4} /></mesh>
    </group>
  );
};

export const Table: React.FC<P> = ({ p }) => {
  const { w = 3.4, d = 1.4 } = p;
  return (
    <group>
      <B s={[w, 0.1, d]} pos={[0, 0.9, 0]} c="#3b2213" />
      <B s={[w - 0.1, 0.02, d - 0.1]} pos={[0, 0.96, 0]} c="#6b4226" />
      {[[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([a, b], i) => <B key={i} s={[0.1, 0.86, 0.1]} pos={[a * (w / 2 - 0.15), 0.43, b * (d / 2 - 0.15)]} c="#2b170c" />)}
    </group>
  );
};

/* ---------- Balanza: la compra pesa más que Google-Wiz ---------- */
export const Scale: React.FC<P> = ({ t, tt, p }) => {
  const { tip = 0.8, left = '43.900', right = '32.000' } = p; const a = eio((tt - tip) / 0.8) * 0.22 + Math.sin(t * 2) * 0.01;
  const arm = 1.25;
  const Pan = ({ x, label, n, col }: { x: number; label: string; n: number; col: string }) => (
    <group position={[x, -0.75, 0]}>
      {[-0.3, 0.3].map((k) => <B key={k} s={[0.02, 0.75, 0.02]} pos={[k, 0.37, 0]} c="#7a6a3a" />)}
      <Cyl r={0.45} h={0.06} c={BRASS} seg={14} />
      <group position={[0, 0.04, 0]} scale={0.8}><Certs t={t} tt={99} p={{ n, dur: 0.01, seal: col }} /></group>
      <group position={[0, -0.3, 0.3]}><Label t={t} tt={tt} p={{ text: label, w: 0.9, h: 0.3, bg: col, color: '#fff', size: 0.68, weight: 900, depth: 0.03 }} /></group>
    </group>
  );
  return (
    <group>
      <Cyl r={0.4} h={0.1} pos={[0, 0.05, 0]} c="#2b170c" /><Cyl r={0.06} h={2.6} pos={[0, 1.35, 0]} c={BRASS} />
      <mesh position={[0, 2.7, 0]}><sphereGeometry args={[0.1, 10, 8]} /><M c={BRASS} /></mesh>
      <group position={[0, 2.62, 0]} rotation={[0, 0, a]}>
        <B s={[arm * 2 + 0.1, 0.07, 0.07]} c={BRASS} />
        <group position={[-arm, 0, 0]} rotation={[0, 0, -a]}><Pan x={0} label={left} n={30} col={RED} /></group>
        <group position={[arm, 0, 0]} rotation={[0, 0, -a]}><Pan x={0} label={right} n={20} col="#3c4a6b" /></group>
      </group>
    </group>
  );
};

/* ---------- Etiqueta de precio colgada de una grúa: 260 pasa a 237 ---------- */
export const PriceTag: React.FC<P> = ({ t, tt, p }) => {
  const { v0 = 'US$ 260', v1 = 'US$ 237', flip = 2.0, drop = 1.0 } = p;
  const k = eio((tt - drop) / 0.6); const y = -k * 0.45; const fl = clamp((tt - flip) / 0.35); const showB = fl > 0.5;
  const sw = Math.sin(t * 2.2) * 0.05 + Math.sin(Math.max(0, tt - drop) * 9) * 0.08 * Math.max(0, 1 - (tt - drop) / 1.2) * (tt > drop ? 1 : 0);
  return (
    <group>
      <B s={[0.03, 1.6, 0.03]} pos={[0, 0.8 + y / 2, 0]} c="#444" />
      <group position={[0, y, 0]} rotation={[0, 0, sw]}>
        <B s={[0.03, 0.4, 0.03]} pos={[0, -0.2, 0]} c="#444" />
        <group position={[0, -1.0, 0]} rotation={[0, Math.sin(fl * Math.PI) * 1.4, 0]}>
          <mesh position={[0, 0.62, 0]} rotation={[0, 0, Math.PI / 4]}><boxGeometry args={[0.86, 0.86, 0.05]} /><M c={showB ? RED : SIGN} /></mesh>
          <B s={[1.6, 1.0, 0.05]} pos={[0, 0, 0]} c={showB ? RED : SIGN} />
          <mesh position={[0, 0.78, 0.03]}><cylinderGeometry args={[0.07, 0.07, 0.06, 10]} /><M c="#222" /></mesh>
          <group position={[0, -0.02, 0.035]}><Label t={t} tt={tt} p={{ text: showB ? v1 : v0, w: 1.5, h: 0.6, color: showB ? '#fff' : INK, size: 0.62, weight: 900, depth: 0 }} /></group>
          <group position={[0, 0.34, 0.035]}><Label t={t} tt={tt} p={{ text: 'POR ACCIÓN', w: 1.2, h: 0.2, color: showB ? '#fff' : INK, size: 0.7, weight: 800, depth: 0 }} /></group>
        </group>
      </group>
    </group>
  );
};
export const Crane: React.FC<P> = () => (
  <group>
    <B s={[0.24, 4.6, 0.24]} pos={[-1.7, 2.3, -0.6]} c={SIGN} />
    <B s={[3.0, 0.2, 0.2]} pos={[-0.3, 4.5, -0.6]} c={SIGN} />
    {Array.from({ length: 9 }, (_, i) => <B key={i} s={[0.03, 0.5, 0.03]} pos={[-1.7, 0.3 + i * 0.5, -0.47]} rot={[0, 0, 0.5]} c="#2a2a2a" />)}
    <B s={[0.5, 0.4, 0.5]} pos={[-1.7, 0.2, -0.6]} c="#2a2a2a" />
  </group>
);

/* ---------- Reloj de arena ---------- */
export const Hourglass: React.FC<P> = ({ t, tt, p }) => {
  const { flip = 0 } = p; const k = clamp((tt - flip) / 6); const rot = Math.sin(t * 0.8) * 0.04;
  return (
    <group rotation={[0, rot, 0]}>
      {[0, 1.5].map((y) => <Cyl key={y} r={0.5} h={0.12} pos={[0, y, 0]} c={WALNUT} seg={8} />)}
      {[[-0.4, -0.4], [0.4, -0.4], [-0.4, 0.4], [0.4, 0.4]].map(([x, z], i) => <Cyl key={i} r={0.04} h={1.4} pos={[x, 0.75, z]} c={WALNUT} />)}
      <mesh position={[0, 1.1, 0]}><coneGeometry args={[0.34, 0.68, 10, 1, true]} /><meshStandardMaterial color="#cfe8f0" transparent opacity={0.35} side={THREE.DoubleSide} /></mesh>
      <mesh position={[0, 0.4, 0]} rotation={[Math.PI, 0, 0]}><coneGeometry args={[0.34, 0.68, 10, 1, true]} /><meshStandardMaterial color="#cfe8f0" transparent opacity={0.35} side={THREE.DoubleSide} /></mesh>
      <mesh position={[0, 1.0 + (1 - k) * 0.08, 0]} scale={[1 - k * 0.7, 1 - k * 0.7, 1 - k * 0.7]}><coneGeometry args={[0.26, 0.45, 10]} /><M c={SIGN} e={SIGN} ei={0.2} /></mesh>
      <mesh position={[0, 0.12 + k * 0.12, 0]} scale={[0.3 + k * 0.7, 0.3 + k * 0.7, 0.3 + k * 0.7]}><coneGeometry args={[0.3, 0.3, 10]} /><M c={SIGN} e={SIGN} ei={0.2} /></mesh>
      <Cyl r={0.015} h={0.6} pos={[0, 0.5, 0]} c={SIGN} e={SIGN} ei={0.6} />
    </group>
  );
};

/* ---------- Estrado de reguladores ---------- */
export const Bench: React.FC<P> = () => (
  <group>
    <B s={[3.4, 1.1, 0.7]} pos={[0, 0.55, 0]} c="#5b5f66" />
    <B s={[3.5, 0.08, 0.8]} pos={[0, 1.12, 0]} c="#3d4046" />
    <B s={[3.36, 0.1, 0.02]} pos={[0, 0.8, 0.36]} c={BRASS} />
  </group>
);

/* ---------- Banco de espera de aeropuerto ---------- */
export const Seats: React.FC<P> = ({ p }) => {
  const { n = 3 } = p;
  return (
    <group>
      <B s={[n * 0.62, 0.06, 0.08]} pos={[0, 0.3, 0]} c="#555" />
      {Array.from({ length: n }, (_, i) => <group key={i} position={[(i - (n - 1) / 2) * 0.62, 0, 0]}>
        <B s={[0.54, 0.06, 0.5]} pos={[0, 0.45, 0]} c={TEAL} /><B s={[0.54, 0.5, 0.06]} pos={[0, 0.72, -0.24]} c={TEAL} />
        <B s={[0.05, 0.3, 0.05]} pos={[0, 0.3, 0]} c="#555" /></group>)}
      {[-1, 1].map((k) => <B key={k} s={[0.06, 0.32, 0.4]} pos={[k * n * 0.31, 0.15, 0]} c="#555" />)}
    </group>
  );
};

/* ---------- Cable de red: un pulso que viaja hasta el arco ---------- */
export const Wire: React.FC<P> = ({ t, p }) => {
  const { len = 2, color = '#5fe0d2' } = p; const x = ((t * 1.4) % 1) * len - len / 2;
  return (
    <group>
      <B s={[len, 0.04, 0.04]} c="#2a2a2a" />
      <mesh position={[x, 0, 0]}><sphereGeometry args={[0.07, 8, 6]} /><M c={color} e={color} ei={2} /></mesh>
    </group>
  );
};

export const EXTRA = { stage: Stage, flap: Flap, screen2: Screen2, kiosk: Kiosk, bag: Bag, belt: Belt, tiles: Tiles, dome: Dome, jet: Jet, cash: Cash,
  tower: Tower, scanner: Scanner, certs: Certs, table: Table, scale: Scale, pricetag: PriceTag, crane: Crane, hourglass: Hourglass, bench: Bench, seats: Seats, wire: Wire };
