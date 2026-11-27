import React from 'react';
import * as THREE from 'three';
import { M, Person } from '../../src/kit/Props';
import { clamp, eio, eo, lerp, pop, rnd } from '../../src/kit/math';

// canva-despidos-v2: otro look que el original (violeta neón). Estudio de maqueta con paleta petróleo / coral / arena / mostaza.
// Objetos genéricos: ningún logo ni forma de marca real.
type P = { t: number; tt: number; p: any };
type V3 = [number, number, number];
export const K = {
  teal: '#0f4c55', teal2: '#0b3a41', ink: '#10262b', coral: '#ff6b4a', coral2: '#d9573f', sand: '#efe2c8', sand2: '#d8c7a5',
  mint: '#3fd0a8', mustard: '#f2c14e', cream: '#fbf6ea', grey: '#c9d3d1', steel: '#7f9396', red: '#ff4a3d',
};
const B: React.FC<{ s: V3; pos?: V3; rot?: V3; c: string; e?: string; ei?: number }> = ({ s, pos, rot, c, e, ei }) => (
  <mesh position={pos} rotation={rot}><boxGeometry args={s} /><M c={c} e={e} ei={ei} /></mesh>
);
const Cy: React.FC<{ r: number; r2?: number; h: number; n?: number; pos?: V3; rot?: V3; c: string; e?: string; ei?: number }> = ({ r, r2, h, n = 12, pos, rot, c, e, ei }) => (
  <mesh position={pos} rotation={rot}><cylinderGeometry args={[r2 ?? r, r, h, n]} /><M c={c} e={e} ei={ei} /></mesh>
);

/** Set propio (tapa el set 'room' de base): piso, pared del fondo y laterales con paleta según p.v */
export const Stage: React.FC<P> = ({ p }) => {
  const v = p.v ?? 'teal';
  const pal: any = {
    teal: { floor: K.sand, wall: K.teal, side: K.teal2, trim: K.mustard, win: true },
    coral: { floor: K.cream, wall: K.coral2, side: '#b8442f', trim: K.ink, win: false },
    ink: { floor: '#1c3f45', wall: K.ink, side: '#0b1c20', trim: K.mint, win: false },
  }[v];
  const z = p.z ?? -3.6;
  return (<group>
    <pointLight position={[-2.5, 3.5, 3]} intensity={v === 'ink' ? 30 : 10} color={v === 'ink' ? '#ffd39a' : '#fff1dc'} distance={12} />
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.006, 0]}><planeGeometry args={[60, 60]} /><M c={pal.floor} /></mesh>
    {/* juntas del piso */}
    {Array.from({ length: 13 }, (_, i) => <B key={i} s={[0.025, 0.004, 30]} pos={[-6 + i, 0.01, 0]} c={v === 'ink' ? '#16353a' : K.sand2} />)}
    <B s={[40, 18, 0.2]} pos={[0, 9, z]} c={pal.wall} />
    <B s={[40, 0.12, 0.08]} pos={[0, 1.1, z + 0.12]} c={pal.trim} e={v === 'ink' ? pal.trim : undefined} ei={0.8} />
    <B s={[40, 0.22, 0.1]} pos={[0, 0.11, z + 0.12]} c={pal.side} />
    <B s={[0.2, 18, 30]} pos={[-6.2, 9, z + 15]} c={pal.side} />
    <B s={[0.2, 18, 30]} pos={[6.2, 9, z + 15]} c={pal.side} />
    {pal.win && [-2.6, 0, 2.6].map((x) => <group key={x} position={[x, 2.15, z + 0.11]}>
      <B s={[1.5, 1.3, 0.04]} c="#6fa8a2" e="#2f6f6a" ei={0.5} />
      {Array.from({ length: 5 }, (_, i) => <B key={i} s={[1.5, 0.05, 0.03]} pos={[0, -0.5 + i * 0.25, 0.03]} c={K.teal2} />)}
      <B s={[1.62, 0.08, 0.06]} pos={[0, 0.69, 0.02]} c={K.cream} /><B s={[1.62, 0.08, 0.06]} pos={[0, -0.69, 0.02]} c={K.cream} />
    </group>)}
    {v === 'ink' && <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.012, 0]}><circleGeometry args={[2.1, 40]} /><meshBasicMaterial color="#ffd39a" transparent opacity={0.13} toneMapped={false} blending={THREE.AdditiveBlending} depthWrite={false} /></mesh>}
  </group>);
};

/** Robot genérico de cajas. p.pose: idle | point | wave. p.dim: apagado */
export const Robot: React.FC<P> = ({ t, p }) => {
  const { pose = 'idle', body = K.grey, accent = K.mint, dim = false, phase = 0 } = p;
  const sw = Math.sin((t + phase) * 2.3); const blink = Math.sin((t + phase) * 1.7) > 0.96 ? 0.15 : 1;
  const eye = dim ? '#44585b' : accent;
  let aR: V3 = [0, 0, 0.12 + sw * 0.03], aL: V3 = [0, 0, -0.12 - sw * 0.03];
  if (pose === 'point') aR = [-1.4 + sw * 0.05, 0, 0.1];
  if (pose === 'wave') aR = [0, 0, 2.5 + Math.sin(t * 8) * 0.3];
  return (<group position={[0, Math.abs(sw) * 0.02, 0]}>
    <Cy r={0.32} r2={0.26} h={0.16} n={10} pos={[0, 0.08, 0]} c={K.steel} />
    <Cy r={0.09} h={0.4} n={8} pos={[0, 0.36, 0]} c={K.steel} />
    <B s={[0.7, 0.62, 0.46]} pos={[0, 0.86, 0]} c={body} />
    <B s={[0.36, 0.2, 0.03]} pos={[0, 0.9, 0.24]} c={K.ink} />
    {[-0.1, 0, 0.1].map((x, i) => <B key={x} s={[0.06, 0.06, 0.02]} pos={[x, 0.9, 0.26]} c={accent} e={accent} ei={dim ? 0 : Math.sin(t * 5 + i) > 0 ? 2 : 0.4} />)}
    {([[-1, aL], [1, aR]] as [number, V3][]).map(([sd, r]) => <group key={sd} position={[0.43 * sd, 1.1, 0]} rotation={r}>
      <Cy r={0.06} h={0.5} n={8} pos={[0, -0.25, 0]} c={K.steel} /><B s={[0.14, 0.12, 0.14]} pos={[0, -0.54, 0]} c={body} /></group>)}
    <group position={[0, 1.42, 0]} rotation={[0, sw * 0.08, 0]}>
      <B s={[0.56, 0.4, 0.44]} c={body} />
      <B s={[0.46, 0.2, 0.03]} pos={[0, 0.0, 0.225]} c={K.ink} />
      {[-0.11, 0.11].map((x) => <B key={x} s={[0.08, 0.08 * blink, 0.02]} pos={[x, 0, 0.245]} c={eye} e={eye} ei={dim ? 0 : 2.2} />)}
      <Cy r={0.015} h={0.22} n={6} pos={[0, 0.31, 0]} c={K.steel} />
      <mesh position={[0, 0.44, 0]}><icosahedronGeometry args={[0.05, 0]} /><M c={K.coral} e={K.coral} ei={dim ? 0 : 1.5 + Math.sin(t * 6) * 0.8} /></mesh>
    </group>
  </group>);
};

/** Silla de oficina genérica. p.color. p.tip: se cae (tt-relativo, segundos) */
export const Chair: React.FC<P> = ({ tt, p }) => {
  const { color = K.coral, tip } = p; const k = tip !== undefined ? eio((tt - tip) / 0.5) : 0;
  return (<group rotation={[0, 0, -k * 1.45]} position={[k * 0.35, 0, 0]}>
    {[0, 1, 2, 3, 4].map((i) => { const a = (i / 5) * Math.PI * 2; return <B key={i} s={[0.05, 0.04, 0.3]} pos={[Math.sin(a) * 0.15, 0.04, Math.cos(a) * 0.15]} rot={[0, a, 0]} c={K.ink} />; })}
    <Cy r={0.035} h={0.38} n={6} pos={[0, 0.23, 0]} c={K.steel} />
    <B s={[0.5, 0.08, 0.48]} pos={[0, 0.45, 0]} c={color} />
    <B s={[0.48, 0.56, 0.07]} pos={[0, 0.8, -0.23]} rot={[-0.08, 0, 0]} c={color} />
    <B s={[0.06, 0.3, 0.06]} pos={[0, 0.55, -0.24]} c={K.ink} />
  </group>);
};

/** Escritorio claro con monitor (p.mon) y taza */
export const Desk2: React.FC<P> = ({ t, p }) => {
  const { mon = true, screen = K.mint, off = false } = p;
  return (<group>
    <B s={[1.5, 0.07, 0.72]} pos={[0, 0.74, 0]} c={K.cream} />
    {[-0.68, 0.68].map((x) => <B key={x} s={[0.06, 0.74, 0.62]} pos={[x, 0.37, 0]} c={K.ink} />)}
    {mon && <group position={[0, 0.78, -0.18]}>
      <B s={[0.24, 0.03, 0.16]} pos={[0, 0.015, 0]} c={K.ink} /><B s={[0.05, 0.22, 0.05]} pos={[0, 0.13, 0]} c={K.ink} />
      <B s={[0.82, 0.5, 0.04]} pos={[0, 0.45, 0]} c={K.ink} />
      <B s={[0.74, 0.42, 0.01]} pos={[0, 0.45, 0.025]} c={off ? '#22363a' : screen} e={off ? undefined : screen} ei={0.5 + Math.sin(t * 2) * 0.05} />
      {!off && [0, 1, 2].map((i) => <B key={i} s={[0.5 - i * 0.12, 0.035, 0.01]} pos={[-0.08 + i * 0.06, 0.55 - i * 0.09, 0.032]} c={K.cream} />)}
    </group>}
    <Cy r={0.05} h={0.1} n={8} pos={[0.55, 0.83, 0.12]} c={K.mustard} />
    <B s={[0.44, 0.02, 0.15]} pos={[0, 0.785, 0.15]} c={K.steel} />
  </group>);
};

/** Mini sillas en grilla (muchas personas). p.cols, p.rows, p.gap, p.stagger */
export const Chairs: React.FC<P> = ({ tt, p }) => {
  const { cols = 9, rows = 4, gap = 0.55, stagger = 0.02, seed = 4 } = p; const r = rnd(seed);
  const cl = [K.coral, K.mint, K.mustard, K.cream];
  return (<group>{Array.from({ length: cols * rows }, (_, i) => { const x = (i % cols - (cols - 1) / 2) * gap, z = -Math.floor(i / cols) * gap; const k = pop(tt - i * stagger); const c = cl[Math.floor(r() * 4)];
    if (k <= 0) return null; return <group key={i} position={[x, 0, z]} scale={0.5 * k}><Chair t={0} tt={0} p={{ color: c }} /></group>; })}</group>);
};

/** Sobre con carta que sale. p.open (segundos tt en que abre) */
export const Envelope: React.FC<P> = ({ tt, p }) => {
  const { open, color = K.cream, seal = K.coral } = p; const k = open !== undefined ? eio((tt - open) / 0.45) : 0; const k2 = open !== undefined ? eo((tt - open - 0.3) / 0.5) : 0;
  return (<group>
    <group position={[0, 0.1 + k2 * 0.62, -0.01]}>
      <B s={[0.9, 0.62, 0.02]} c="#ffffff" />
      {[0, 1, 2, 3].map((i) => <B key={i} s={[0.66 - (i % 2) * 0.18, 0.04, 0.01]} pos={[-(i % 2) * 0.09, 0.18 - i * 0.12, 0.015]} c={i === 1 ? K.mustard : K.steel} />)}
    </group>
    <B s={[1.0, 0.66, 0.05]} c={color} />
    <group position={[0, 0.33, 0.03]} rotation={[-k * 2.6, 0, 0]}>
      <mesh rotation={[0, 0, Math.PI]} position={[0, -0.2, 0]}><coneGeometry args={[0.58, 0.42, 3, 1]} /><M c={K.sand2} /></mesh>
    </group>
    {k < 0.5 && <Cy r={0.08} h={0.03} n={10} rot={[Math.PI / 2, 0, 0]} pos={[0, 0.06, 0.06]} c={seal} e={seal} ei={0.4} />}
  </group>);
};

/** Sobres que vuelan desde p.a hasta destinos repartidos (en grilla) */
export const MailFly: React.FC<P> = ({ tt, p }) => {
  const { a = [0, 1.2, 0], n = 12, area = [3, 1.2], y = 1.6, z0 = -1.2, stagger = 0.06, dur = 0.7 } = p; const cols = Math.ceil(n / 2);
  return (<group>{Array.from({ length: n }, (_, i) => { const k = eio((tt - i * stagger) / dur); if (tt - i * stagger < 0) return null;
    const bx = ((i % cols) / (cols - 1) - 0.5) * area[0], bz = z0 - Math.floor(i / cols) * area[1] * 0.5;
    return <group key={i} position={[lerp(a[0], bx, k), lerp(a[1], y, k) + Math.sin(k * Math.PI) * 0.6, lerp(a[2], bz, k)]} rotation={[0, 0, Math.sin(k * 6) * 0.2]} scale={0.28}><Envelope t={0} tt={0} p={{}} /></group>; })}</group>);
};

/** Torta 3D: p.pct (0-1) se separa y sube en p.lift (tt). Fichas sobre la porción: p.marks [{t, kind}] */
export const Pie: React.FC<P> = ({ t, tt, p }) => {
  const { pct = 0.22, lift = 0.2, r = 1.25, h = 0.3, rest = K.teal, part = K.coral } = p; const th = pct * Math.PI * 2;
  const k = eo((tt - lift) / 0.6); const mid = Math.PI / 2 - th / 2 + 0.0; // porción hacia +z (cámara)
  const dx = Math.sin(mid + th / 2 - Math.PI / 2 + Math.PI / 2) * 0; void dx;
  const ang = th / 2; // centro de la porción, medido desde +z
  const ox = Math.sin(ang) * 0.45 * k, oz = Math.cos(ang) * 0.45 * k;
  return (<group>
    <mesh position={[0, h / 2, 0]}><cylinderGeometry args={[r, r, h, 40, 1, false, th, Math.PI * 2 - th]} /><M c={rest} /></mesh>
    <group position={[ox, k * 0.35, oz]}>
      <mesh position={[0, h / 2, 0]}><cylinderGeometry args={[r, r, h * 1.1, 24, 1, false, 0, th]} /><M c={part} e={part} ei={0.25 + Math.sin(t * 4) * 0.1} /></mesh>
    </group>
  </group>);
};

/** Pizarrón con curva de crecimiento: sube por escalones y en p.flat (tt) el último tramo se aplana en coral */
export const Chart: React.FC<P> = ({ tt, p }) => {
  const { flat = 1.5, w = 2.8, h = 1.8 } = p;
  const ys = [0.1, 0.22, 0.3, 0.42, 0.5, 0.6, 0.68, 0.78, 0.86, 0.94];
  const pts = ys.map((y, i) => [-w / 2 + 0.2 + (i / (ys.length - 1)) * (w - 0.6), -h / 2 + 0.15 + y * (h - 0.4)]);
  const kF = eo((tt - flat) / 0.5); const lastY = lerp(pts[9][1], pts[8][1], 0); void lastY;
  const flatPts = [pts[8], [pts[8][0] + (w - 0.6) / 9 * 1.6 * kF, pts[8][1]]];
  const seg = (a: number[], b: number[], c: string, key: any, e = 0.8) => { const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy); if (L < 0.001) return null;
    return <B key={key} s={[L, 0.07, 0.05]} pos={[(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, 0.07]} rot={[0, 0, Math.atan2(dy, dx)]} c={c} e={c} ei={e} />; };
  const n = clamp(tt / Math.max(0.1, flat * 0.9)) * 8;
  return (<group>
    <B s={[w + 0.14, h + 0.14, 0.08]} c={K.cream} /><B s={[w, h, 0.09]} c={K.ink} />
    {[0.25, 0.5, 0.75].map((f) => <B key={f} s={[w - 0.2, 0.012, 0.01]} pos={[0, -h / 2 + f * h, 0.05]} c="#2c4a50" />)}
    {pts.slice(0, 9).map((q, i) => i < 8 && i < n ? seg(q, i + 1 <= n ? pts[i + 1] : [lerp(q[0], pts[i + 1][0], n - i), lerp(q[1], pts[i + 1][1], n - i)], K.mint, i) : null)}
    {kF > 0 && seg(flatPts[0], flatPts[1], K.coral, 'f', 1.3)}
    <mesh position={[kF > 0 ? flatPts[1][0] : pts[Math.min(8, Math.floor(n))][0], kF > 0 ? flatPts[1][1] : pts[Math.min(8, Math.floor(n))][1], 0.1]}><sphereGeometry args={[0.08, 10, 8]} /><M c={kF > 0 ? K.coral : K.mint} e={kF > 0 ? K.coral : K.mint} ei={1.5} /></mesh>
    <B s={[0.03, h - 0.2, 0.01]} pos={[-w / 2 + 0.12, 0, 0.05]} c={K.steel} /><B s={[w - 0.2, 0.03, 0.01]} pos={[0, -h / 2 + 0.1, 0.05]} c={K.steel} />
  </group>);
};

/** 6 hojas de sueldo que aparecen en arco (p.n). Cada una con franja mostaza */
export const Months: React.FC<P> = ({ t, tt, p }) => {
  const { n = 6, r = 1.5, stagger = 0.16 } = p;
  return (<group>{Array.from({ length: n }, (_, i) => { const a = -0.85 + (i / (n - 1)) * 1.7; const k = pop(tt - i * stagger); if (k <= 0) return null;
    return <group key={i} position={[Math.sin(a) * r, 1.5 + Math.cos(a * 2) * 0.12 + Math.sin(t * 2 + i) * 0.03, -Math.cos(a) * r * 0.4]} rotation={[0, -a * 0.6, 0]} scale={k}>
      <B s={[0.42, 0.56, 0.03]} c={K.cream} /><B s={[0.42, 0.13, 0.035]} pos={[0, 0.215, 0]} c={K.mustard} />
      <mesh position={[0, -0.05, 0.02]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.09, 0.09, 0.02, 12]} /><M c={K.coral} e={K.coral} ei={0.4} /></mesh>
      <B s={[0.26, 0.025, 0.01]} pos={[0, -0.2, 0.02]} c={K.steel} />
    </group>; })}</group>);
};

/** Pila de billetes verdes genéricos que crece (p.n ladrillos) */
export const Bills: React.FC<P> = ({ tt, p }) => {
  const { n = 10, stagger = 0.08 } = p;
  return (<group>{Array.from({ length: n }, (_, i) => { const k = eo((tt - i * stagger) / 0.25); if (k <= 0) return null; const col = i % 2 ? '#5fae7a' : '#4f9a69';
    return <group key={i} position={[((i * 37) % 5 - 2) * 0.012, 0.07 + i * 0.13 + (1 - k) * 1.2, 0]} rotation={[0, ((i * 13) % 7 - 3) * 0.05, 0]}>
      <B s={[1.0, 0.12, 0.5]} c={col} /><B s={[0.2, 0.125, 0.51]} c={K.cream} /></group>; })}</group>);
};

/** Lamparita que se enciende en p.on (tt) */
export const Bulb: React.FC<P> = ({ t, tt, p }) => {
  const { on = 0 } = p; const k = clamp((tt - on) / 0.2); const g = k * (1.6 + Math.sin(t * 6) * 0.3);
  return (<group>
    <mesh position={[0, 0.42, 0]}><icosahedronGeometry args={[0.34, 1]} /><M c={k > 0 ? '#fff3b0' : '#e8e2d0'} e={K.mustard} ei={g} /></mesh>
    <Cy r={0.15} h={0.22} n={8} pos={[0, 0.06, 0]} c={K.steel} />
    {k > 0 && Array.from({ length: 8 }, (_, i) => { const a = (i / 8) * Math.PI * 2; return <B key={i} s={[0.05, 0.2 * k, 0.05]} pos={[Math.cos(a) * 0.62, 0.42 + Math.sin(a) * 0.62, 0]} rot={[0, 0, a - Math.PI / 2]} c={K.mustard} e={K.mustard} ei={1.5} />; })}
  </group>);
};

/** Hoja de nota grande parada, con un renglón resaltado (p.hi tt) */
export const Memo: React.FC<P> = ({ tt, p }) => {
  const { hi = 0.5, w = 1.5, h = 2.0 } = p; const k = eo((tt - hi) / 0.4);
  return (<group>
    <B s={[w, h, 0.04]} c="#ffffff" /><B s={[w, 0.2, 0.045]} pos={[0, h / 2 - 0.1, 0]} c={K.teal} />
    {Array.from({ length: 9 }, (_, i) => { const y = h / 2 - 0.42 - i * 0.16; const ww = (i % 3 === 2 ? 0.7 : 1.1);
      return <group key={i}>
        {i === 4 && k > 0 && <B s={[1.2 * k, 0.12, 0.01]} pos={[-0.6 + 0.6 * k, y, 0.028]} c={K.mustard} e={K.mustard} ei={0.8} />}
        <B s={[ww, 0.04, 0.01]} pos={[-(1.1 - ww) / 2, y, 0.032]} c={i === 4 ? K.ink : '#b8c2c4'} /></group>; })}
  </group>);
};

/** Flecha horizontal (apunta a +x) que crece en p.dur */
export const Pointer: React.FC<P> = ({ tt, p }) => {
  const { len = 1.2, color = K.coral, dur = 0.4 } = p; const k = Math.max(0.001, eo(tt / dur));
  return (<group><B s={[len * k, 0.12, 0.12]} pos={[(len * k) / 2, 0, 0]} c={color} e={color} ei={0.8} />
    <mesh position={[len * k + 0.15, 0, 0]} rotation={[0, 0, -Math.PI / 2]}><coneGeometry args={[0.2, 0.32, 4]} /><M c={color} e={color} ei={0.8} /></mesh></group>);
};

/** Atril con micrófonos de prensa (p.n) */
export const Mics: React.FC<P> = ({ tt, p }) => {
  const { n = 3, stagger = 0.12 } = p; const cl = [K.coral, K.mint, K.mustard, K.cream];
  return (<group>
    <B s={[0.8, 1.05, 0.5]} pos={[0, 0.52, 0]} c={K.teal2} /><B s={[0.9, 0.06, 0.6]} pos={[0, 1.07, 0]} c={K.cream} />
    {Array.from({ length: n }, (_, i) => { const k = pop(tt - i * stagger); if (k <= 0) return null; const x = (i - (n - 1) / 2) * 0.2;
      return <group key={i} position={[x, 1.1, 0.1]} rotation={[0.5, -x * 0.8, 0]} scale={k}>
        <Cy r={0.015} h={0.32} n={6} pos={[0, 0.16, 0]} c={K.ink} />
        <Cy r={0.05} r2={0.045} h={0.14} n={8} pos={[0, 0.38, 0]} c={K.ink} />
        <B s={[0.12, 0.07, 0.025]} pos={[0, 0.3, 0.05]} c={cl[i % 4]} />
      </group>; })}
  </group>);
};

/** Cinta transportadora con cajas que avanzan (v) y caen al final en un cajón */
export const Belt: React.FC<P> = ({ t, p }) => {
  const { len = 3.0, n = 5, v = 0.6, colors = [K.coral, K.mustard, K.mint, K.cream] } = p;
  return (<group>
    <B s={[len, 0.12, 0.7]} pos={[0, 0.62, 0]} c={K.ink} />
    {Array.from({ length: 12 }, (_, i) => <Cy key={i} r={0.06} h={0.72} n={8} rot={[Math.PI / 2, 0, 0]} pos={[-len / 2 + 0.12 + i * ((len - 0.24) / 11), 0.6, 0]} c={K.steel} />)}
    {[-len / 2 + 0.15, len / 2 - 0.15].map((x) => <B key={x} s={[0.1, 0.6, 0.6]} pos={[x, 0.3, 0]} c={K.teal2} />)}
    {Array.from({ length: n }, (_, i) => { const u = ((t * v + i * (len / n)) % len); const x = -len / 2 + u; const c = colors[i % colors.length]; const fall = clamp((x - (len / 2 - 0.25)) / 0.25);
      return <group key={i} position={[x, 0.86 - fall * 0.3, 0]} rotation={[0, i * 0.4, fall * -0.6]}><B s={[0.36, 0.36, 0.36]} c={c} /><B s={[0.37, 0.06, 0.37]} c={K.sand2} /></group>; })}
  </group>);
};

/** Globo de diálogo con una caja de palabra (vacía) */
export const Bubble: React.FC<P> = ({ t, p }) => {
  const { color = '#ffffff' } = p;
  return (<group rotation={[0, 0, Math.sin(t * 2) * 0.03]}>
    <B s={[1.4, 0.8, 0.12]} c={color} />
    <mesh position={[-0.35, -0.5, 0]} rotation={[0, 0, Math.PI + 0.3]}><coneGeometry args={[0.16, 0.3, 3]} /><M c={color} /></mesh>
    <B s={[0.9, 0.3, 0.02]} pos={[0, 0, 0.07]} c={K.mustard} e={K.mustard} ei={0.3 + (Math.sin(t * 5) > 0 ? 0.4 : 0)} />
    <B s={[0.04, 0.22, 0.02]} pos={[0.25, 0, 0.09]} c={K.ink} />
  </group>);
};

/** Signo de pregunta grande (de cajas) */
export const Qmark: React.FC<P> = ({ t, p }) => {
  const { color = K.mustard } = p; const e = 0.6 + Math.sin(t * 3) * 0.2;
  return (<group rotation={[0, Math.sin(t * 1.5) * 0.25, 0]}>
    <B s={[0.5, 0.14, 0.14]} pos={[0, 0.62, 0]} c={color} e={color} ei={e} />
    <B s={[0.14, 0.34, 0.14]} pos={[0.25, 0.48, 0]} c={color} e={color} ei={e} />
    <B s={[0.14, 0.34, 0.14]} pos={[-0.25, 0.52, 0]} c={color} e={color} ei={e} />
    <B s={[0.36, 0.14, 0.14]} pos={[0.1, 0.3, 0]} c={color} e={color} ei={e} />
    <B s={[0.14, 0.2, 0.14]} pos={[0, 0.16, 0]} c={color} e={color} ei={e} />
    <B s={[0.15, 0.15, 0.15]} pos={[0, -0.1, 0]} c={color} e={color} ei={e} />
  </group>);
};

/** Valija */
export const Suitcase: React.FC<P> = ({ p }) => (
  <group><B s={[0.5, 0.36, 0.2]} pos={[0, 0.2, 0]} c={p.color ?? K.mustard} /><B s={[0.2, 0.06, 0.04]} pos={[0, 0.41, 0]} c={K.ink} /><B s={[0.04, 0.36, 0.21]} pos={[0, 0.2, 0]} c={K.ink} /></group>
);

/** Persona con caja de cartón en brazos */
export const Carrier: React.FC<P> = ({ t, tt, p }) => (
  <group><Person t={t} tt={tt} p={{ ...p, pose: p.walk ? 'walk' : 'hold' }} /><B s={[0.5, 0.3, 0.38]} pos={[0, 1.08, 0.38]} c="#c99a62" /><B s={[0.5, 0.02, 0.38]} pos={[0, 1.235, 0.38]} c="#a97e4a" /></group>
);

/** Disco de luz en el piso (spot) */
export const Spot: React.FC<P> = ({ t, p }) => {
  const { r = 1.2, color = '#ffd39a', o = 0.22 } = p;
  return <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.015, 0]}><circleGeometry args={[r * (1 + Math.sin(t * 2) * 0.02), 36]} /><meshBasicMaterial color={color} transparent opacity={o} toneMapped={false} blending={THREE.AdditiveBlending} depthWrite={false} /></mesh>;
};

export const EXTRA = { stage: Stage, robot: Robot, chair: Chair, desk2: Desk2, chairs: Chairs, envelope: Envelope, mailfly: MailFly, pie: Pie, chart: Chart,
  months: Months, bills: Bills, bulb: Bulb, memo: Memo, pointer: Pointer, mics: Mics, belt: Belt, bubble: Bubble, qmark: Qmark, suitcase: Suitcase, carrier: Carrier, spot: Spot };
