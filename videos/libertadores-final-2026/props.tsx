import React, { useMemo } from 'react';
import { M, Label, Person } from '../../src/kit/Props';
import { C, clamp, eo, lerp, pop, rnd } from '../../src/kit/math';

type P = { t: number; tt: number; p: any };
type V3 = [number, number, number];
const PI = Math.PI;
// Colores genéricos, sin escudos ni camisetas oficiales: rojo y blanco / verde.
export const RED = '#d81f33', WHITE = '#f4f1ff', GREEN = '#1f9d55';
const B: React.FC<{ s: V3; pos?: V3; rot?: V3; c: string; e?: string; ei?: number }> = ({ s, pos, rot, c, e, ei }) => (
  <mesh position={pos} rotation={rot}><boxGeometry args={s} /><M c={c} e={e} ei={ei} /></mesh>
);
/** Barra entre dos puntos del plano xy. */
const Bar: React.FC<{ a: [number, number]; b: [number, number]; z?: number; th?: number; d?: number; c: string; e?: string; ei?: number }> = ({ a, b, z = 0, th = 0.05, d = 0.05, c, e, ei }) => {
  const dx = b[0] - a[0], dy = b[1] - a[1];
  return <B s={[Math.hypot(dx, dy), th, d]} pos={[(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, z]} rot={[0, 0, Math.atan2(dy, dx)]} c={c} e={e} ei={ei} />;
};

/** Bicicleta con ciclista genérico. Mira hacia +x. p: shirt, color (cuadro), speed, rider, cheer, stopAt (tt en que deja de pedalear). */
export const Bike: React.FC<P> = ({ t, tt, p }) => {
  const { shirt = RED, color = C.cyan, speed = 7, rider = true, cheer = false, skin = '#e3ad80', hair = '#15102b', pants = '#15102b', phase = 0 } = p;
  const tm = p.stopAt !== undefined ? Math.min(tt, p.stopAt) : t; const a = -(tm * speed) + phase;
  const wheel = (x: number) => (
    <group position={[x, 0.32, 0]}>
      <mesh rotation={[PI / 2, 0, 0]}><cylinderGeometry args={[0.32, 0.32, 0.05, 16]} /><M c="#0d0a1c" /></mesh>
      <mesh rotation={[PI / 2, 0, 0]}><cylinderGeometry args={[0.25, 0.25, 0.055, 16]} /><M c="#2d1a6e" /></mesh>
      <group rotation={[0, 0, a * 1.6]}>{[0, 1, 2].map((i) => <B key={i} s={[0.5, 0.025, 0.07]} rot={[0, 0, (i * PI) / 3]} c="#dcdaea" e="#dcdaea" ei={0.6} />)}</group>
    </group>
  );
  const crank: [number, number] = [-0.05, 0.32], seat: [number, number] = [-0.2, 0.86], head: [number, number] = [0.36, 0.84], hip: [number, number] = [-0.2, 0.98], sh: [number, number] = [0.12, 1.44], grip: [number, number] = [0.42, 1.04];
  const sway = Math.sin(t * 7 + phase) * 0.012;
  return (
    <group>
      {wheel(-0.5)}{wheel(0.5)}
      <Bar a={[-0.5, 0.32]} b={crank} c={color} e={color} ei={0.6} /><Bar a={[-0.5, 0.32]} b={seat} c={color} e={color} ei={0.6} />
      <Bar a={crank} b={seat} c={color} e={color} ei={0.6} /><Bar a={crank} b={head} c={color} e={color} ei={0.6} />
      <Bar a={seat} b={head} c={color} e={color} ei={0.6} /><Bar a={head} b={[0.5, 0.32]} c={color} e={color} ei={0.6} />
      <Bar a={head} b={[0.4, 1.02]} c="#dcdaea" /><B s={[0.06, 0.05, 0.42]} pos={[0.41, 1.03, 0]} c="#15102b" />
      <B s={[0.26, 0.06, 0.14]} pos={[-0.22, 0.93, 0]} c="#15102b" />
      {[0, 1].map((i) => { const an = a + i * PI; const px = crank[0] + Math.cos(an) * 0.15, py = crank[1] + Math.sin(an) * 0.15; const z = i ? -0.11 : 0.11;
        return <group key={i}><Bar a={crank} b={[px, py]} z={z * 0.7} th={0.04} d={0.04} c="#dcdaea" /><B s={[0.14, 0.04, 0.1]} pos={[px, py, z]} c="#15102b" />
          {rider && <><Bar a={hip} b={[px + 0.12, py + 0.36]} z={z} th={0.15} d={0.14} c={pants} /><Bar a={[px + 0.12, py + 0.36]} b={[px, py + 0.06]} z={z} th={0.12} d={0.12} c={skin} /><B s={[0.2, 0.08, 0.12]} pos={[px + 0.03, py + 0.05, z]} c="#0d0a1c" /></>}</group>; })}
      {rider && <group position={[0, sway, 0]}>
        <Bar a={hip} b={sh} th={0.3} d={0.4} c={shirt} />
        {[-1, 1].map((s) => cheer
          ? <group key={s}><Bar a={sh} b={[sh[0] + 0.05, sh[1] + 0.36 + Math.sin(t * 9 + s) * 0.03]} z={s * 0.27} th={0.11} d={0.11} c={shirt} /><Bar a={[sh[0] + 0.05, sh[1] + 0.36]} b={[sh[0] + 0.02, sh[1] + 0.66 + Math.sin(t * 9 + s) * 0.04]} z={s * 0.3} th={0.1} d={0.1} c={skin} /></group>
          : <group key={s}><Bar a={[sh[0], sh[1] - 0.04]} b={[0.3, 1.2]} z={s * 0.24} th={0.11} d={0.11} c={shirt} /><Bar a={[0.3, 1.2]} b={grip} z={s * 0.2} th={0.1} d={0.1} c={skin} /></group>)}
        <group position={[0.22, 1.66, 0]} rotation={[0, 0, -0.12]}>
          <B s={[0.3, 0.3, 0.3]} c={skin} /><B s={[0.34, 0.14, 0.34]} pos={[-0.01, 0.17, 0]} c={hair} /><B s={[0.12, 0.2, 0.34]} pos={[-0.15, 0.04, 0]} c={hair} />
        </group>
      </group>}
    </group>
  );
};

/** Micro de larga distancia genérico. Mira hacia +z. Largo 2.6. */
export const Bus: React.FC<P> = ({ t, p }) => {
  const { color = WHITE, stripe = RED, spin = 8 } = p;
  return (
    <group>
      <B s={[0.86, 0.95, 2.6]} pos={[0, 0.75, 0]} c={color} e={color} ei={0.12} />
      <B s={[0.88, 0.13, 2.62]} pos={[0, 0.5, 0]} c={stripe} e={stripe} ei={0.5} />
      <B s={[0.88, 0.3, 2.3]} pos={[0, 0.94, -0.05]} c="#15102b" e="#27e0d8" ei={0.18} />
      {[-0.9, -0.45, 0, 0.45, 0.9].map((z) => <B key={z} s={[0.885, 0.3, 0.05]} pos={[0, 0.94, z - 0.05]} c={color} />)}
      <B s={[0.74, 0.4, 0.03]} pos={[0, 0.9, 1.305]} c="#15102b" e="#27e0d8" ei={0.25} />
      <B s={[0.5, 0.1, 0.03]} pos={[0, 1.15, 1.305]} c={C.gold} e={C.gold} ei={1.4} />
      {[-0.28, 0.28].map((x) => <B key={x} s={[0.18, 0.09, 0.03]} pos={[x, 0.42, 1.31]} c="#fff8c9" e="#fff8c9" ei={3} />)}
      <B s={[0.7, 0.08, 0.03]} pos={[0, 0.45, -1.31]} c={C.red} e={C.red} ei={2} />
      {[[-0.44, 0.85], [0.44, 0.85], [-0.44, -0.8], [0.44, -0.8]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.2, z]} rotation={[t * spin, 0, PI / 2]}><cylinderGeometry args={[0.2, 0.2, 0.12, 8]} /><M c="#0d0a1c" /></mesh>))}
    </group>
  );
};

/** Fila de micros en dos carriles que avanza hacia +z. p: n, gap, speed, dur (aparecen de a uno). */
export const Convoy: React.FC<P> = ({ t, tt, p }) => {
  const { n = 12, gap = 3.1, speed = 1.0, lane = 0.72, stagger = 0.12 } = p;
  return (<group>{Array.from({ length: n }, (_, i) => { const k = pop(tt - i * stagger); if (k <= 0) return null;
    return <group key={i} position={[i % 2 ? lane : -lane, 0, -Math.floor(i / 2) * gap - (i % 2) * gap * 0.45 + t * speed]} scale={k}><Bus t={t} tt={tt} p={{ stripe: i % 3 === 1 ? '#8d8aa0' : RED }} /></group>; })}</group>);
};

/** Hinchas genéricos de rojo y blanco. p: n, area [x,z], pose, sc, face, stagger */
export const Fans: React.FC<P> = ({ t, tt, p }) => {
  const { n = 10, seed = 5, area = [3, 1.5], pose = 'cheer', stagger = 0.05, face = 0, sc = 0.7, colors = [RED, WHITE, RED] } = p;
  const ppl = useMemo(() => { const r = rnd(seed); const cols = Math.ceil(Math.sqrt((n * area[0]) / area[1])); const rows = Math.ceil(n / cols);
    return Array.from({ length: n }, (_, i) => ({ x: ((i % cols) + 0.5) / cols - 0.5 + ((r() - 0.5) * 0.4) / cols, z: (Math.floor(i / cols) + 0.5) / rows - 0.5 + ((r() - 0.5) * 0.4) / rows,
      shirt: colors[Math.floor(r() * colors.length)], hair: ['#3a2a1a', '#15102b', '#c98a3a', '#7a3b1a'][Math.floor(r() * 4)], skin: ['#f2c39b', '#c98d62', '#8a5a3c', '#ffd9b8'][Math.floor(r() * 4)], ph: r() * 6 })); }, [n, seed]);
  return (<group>{ppl.map((q, i) => { const k = pop(tt - i * stagger); if (k <= 0) return null;
    return <group key={i} position={[q.x * area[0], 0, q.z * area[1]]} rotation={[0, face, 0]} scale={k * sc}><Person t={t} tt={tt} p={{ shirt: q.shirt, hair: q.hair, skin: q.skin, pose, phase: q.ph }} /></group>; })}</group>);
};

/** Multitud de muñequitos (cajitas) rojos y blancos sobre el piso; se llena en `dur` segundos. */
export const Mass: React.FC<P> = ({ t, tt, p }) => {
  const { cols = 20, rows = 16, w = 5, d = 7, seed = 7, dur = 1.6, colors = [RED, WHITE, RED, WHITE, '#b3182a'] } = p;
  const ppl = useMemo(() => { const r = rnd(seed); const o: { x: number; z: number; c: string; ph: number; h: number; ord: number }[] = [];
    for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) o.push({ x: -w / 2 + ((i + 0.5) / cols) * w + (r() - 0.5) * 0.08, z: d / 2 - ((j + 0.5) / rows) * d + (r() - 0.5) * 0.08, c: colors[Math.floor(r() * colors.length)], ph: r() * 6, h: 0.26 + r() * 0.1, ord: r() });
    return o; }, [cols, rows, seed]);
  const k = dur > 0 ? eo(tt / dur) : 1;
  return (<group>{ppl.map((q, i) => { if (q.ord > k + 0.04) return null; const j = Math.max(0, Math.sin(t * 6 + q.ph)) * 0.08;
    return <group key={i} position={[q.x, j, q.z]}><B s={[0.17, q.h, 0.15]} pos={[0, q.h / 2, 0]} c={q.c} e={q.c} ei={0.25} /><B s={[0.12, 0.12, 0.12]} pos={[0, q.h + 0.07, 0]} c="#e3ad80" /></group>; })}</group>);
};

/** Entrada genérica (sin marcas). */
export const Ticket: React.FC<P> = ({ t, tt, p }) => {
  const { text = 'ENTRADA', color = C.gold } = p;
  return (
    <group rotation={[0, Math.sin(t * 1.6) * 0.25, 0.1]}>
      <B s={[1.5, 0.7, 0.05]} c={color} e={color} ei={0.45} />
      <B s={[0.03, 0.7, 0.06]} pos={[0.42, 0, 0]} c="#15102b" />
      {[-0.2, -0.07, 0.06, 0.19].map((y) => <B key={y} s={[0.2, 0.05, 0.06]} pos={[0.58, y, 0]} c="#15102b" />)}
      <group position={[-0.17, 0, 0.03]}><Label t={t} tt={tt} p={{ text, w: 1.05, h: 0.4, color: '#15102b', size: 0.62, weight: 900, depth: 0 }} /></group>
    </group>
  );
};

/** Estadio genérico: anillo de tribunas, cancha y una torre. Radio x ~1.6. */
export const Stadium: React.FC<P> = ({ t, p }) => {
  const { rx = 1.35, rz = 1.0, n = 22, tower = true } = p;
  return (
    <group>
      <B s={[rx * 1.45, 0.05, rz * 1.35]} pos={[0, 0.03, 0]} c="#178a4a" e="#178a4a" ei={0.3} />
      <B s={[0.03, 0.02, rz * 1.35]} pos={[0, 0.065, 0]} c="#eafff2" e="#eafff2" ei={0.8} />
      <mesh position={[0, 0.065, 0]} rotation={[-PI / 2, 0, 0]}><ringGeometry args={[0.22, 0.25, 20]} /><meshBasicMaterial color="#eafff2" toneMapped={false} /></mesh>
      {[0, 1, 2].map((j) => Array.from({ length: n }, (_, i) => { const a = (i / n) * PI * 2; const sc = 1 + j * 0.17; const h = 0.3 + j * 0.27;
        const x = Math.cos(a) * rx * sc, z = Math.sin(a) * rz * sc; const tx = -Math.sin(a) * rx, tz = Math.cos(a) * rz; const len = ((2 * PI) / n) * Math.hypot(tx, tz) * sc * 1.08;
        const col = (i + j) % 2 ? '#3a2590' : '#2d1a6e'; const crowd = [RED, WHITE, GREEN, WHITE, RED, GREEN][(i * 5 + j * 3) % 6];
        return <group key={j + '-' + i} position={[x, 0, z]} rotation={[0, -Math.atan2(tz, tx), 0]}>
          <B s={[len, h, 0.2]} pos={[0, h / 2, 0]} c={col} />
          <B s={[len * 0.8, 0.06, 0.14]} pos={[0, h + 0.03 + Math.max(0, Math.sin(t * 5 + i + j)) * 0.02, 0]} c={crowd} e={crowd} ei={0.5} />
          {j === 2 && <B s={[len, 0.04, 0.22]} pos={[0, h + 0.1, 0]} c={C.cyan} e={C.cyan} ei={1.3} />}
        </group>; }))}
      {tower && <group position={[0, 0, -rz * 1.55]}>
        <B s={[0.26, 2.1, 0.26]} pos={[0, 1.05, 0]} c="#dcdaea" e="#7f7aa6" ei={0.35} />
        {[-1, 1].map((s) => <B key={s} s={[0.16, 1.3, 0.12]} pos={[s * 0.2, 0.65, 0.02]} c="#b9a3e8" />)}
        <B s={[0.4, 0.07, 0.34]} pos={[0, 1.75, 0]} c="#b9a3e8" />
        <B s={[0.12, 0.3, 0.12]} pos={[0, 2.25, 0]} c={C.gold} e={C.gold} ei={1.6 + Math.sin(t * 4) * 0.5} />
      </group>}
      {[[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([sx, sz], i) => <group key={i} position={[sx * rx * 1.42, 0, sz * rz * 1.3]}>
        <B s={[0.05, 1.5, 0.05]} pos={[0, 0.75, 0]} c="#8d8aa0" /><B s={[0.3, 0.16, 0.08]} pos={[0, 1.55, 0]} c="#fff8c9" e="#fff8c9" ei={2.5} /></group>)}
    </group>
  );
};

/** Reloj de agujas. p: h, m (hora que marca). */
export const Clock: React.FC<P> = ({ tt, p }) => {
  const { h = 5, m = 0 } = p; const k = eo(tt / 0.7); const am = -(m / 60) * PI * 2 - (1 - k) * PI * 2; const ah = -((h + m / 60) / 12) * PI * 2 * k;
  return (
    <group>
      <mesh rotation={[PI / 2, 0, 0]}><cylinderGeometry args={[0.72, 0.72, 0.1, 24]} /><M c={C.cyan} e={C.cyan} ei={0.9} /></mesh>
      <mesh position={[0, 0, 0.03]} rotation={[PI / 2, 0, 0]}><cylinderGeometry args={[0.62, 0.62, 0.1, 24]} /><M c="#f4f1ff" e="#f4f1ff" ei={0.25} /></mesh>
      {Array.from({ length: 12 }, (_, i) => <group key={i} rotation={[0, 0, (i * PI) / 6]}><B s={[0.04, i % 3 ? 0.07 : 0.14, 0.02]} pos={[0, 0.52, 0.09]} c="#15102b" /></group>)}
      <group rotation={[0, 0, ah]}><B s={[0.08, 0.36, 0.03]} pos={[0, 0.16, 0.1]} c="#15102b" /></group>
      <group rotation={[0, 0, am]}><B s={[0.05, 0.52, 0.03]} pos={[0, 0.24, 0.115]} c={RED} e={RED} ei={0.6} /></group>
      <mesh position={[0, 0, 0.12]} rotation={[PI / 2, 0, 0]}><cylinderGeometry args={[0.06, 0.06, 0.04, 10]} /><M c="#15102b" /></mesh>
    </group>
  );
};

/** Camino esquemático entre dos puntos (plano xy), con guiones que se dibujan y una bici que lo recorre. */
export const Route: React.FC<P> = ({ t, tt, p }) => {
  const { a = [-1.1, 1.2], b = [1.1, 2.7], c = [0.9, 1.0], n = 16, dur = 2.2, delay = 0.3 } = p;
  const at = (u: number): [number, number] => [(1 - u) * (1 - u) * a[0] + 2 * (1 - u) * u * c[0] + u * u * b[0], (1 - u) * (1 - u) * a[1] + 2 * (1 - u) * u * c[1] + u * u * b[1]];
  const k = eo((tt - delay) / dur); const [mx, my] = at(k * 0.86);
  const pin = (q: number[], col: string, on: boolean) => (
    <group position={[q[0], q[1], 0]} scale={on ? 1 + Math.sin(t * 5) * 0.06 : 1}>
      <mesh position={[0, 0.2, 0]} rotation={[PI, 0, 0]}><coneGeometry args={[0.13, 0.3, 8]} /><M c={col} e={col} ei={1.0} /></mesh>
      <mesh position={[0, 0.42, 0]}><icosahedronGeometry args={[0.17, 1]} /><M c={col} e={col} ei={1.0} /></mesh>
      <mesh rotation={[-PI / 2, 0, 0]}><ringGeometry args={[0.16, 0.2, 20]} /><meshBasicMaterial color={col} toneMapped={false} /></mesh>
    </group>);
  return (
    <group>
      {Array.from({ length: n }, (_, i) => { const u0 = (i + 0.2) / n, u1 = (i + 0.8) / n; if (u0 > k) return null; const q0 = at(u0), q1 = at(Math.min(u1, k));
        return <Bar key={i} a={q0} b={q1} th={0.06} d={0.04} c={C.gold} e={C.gold} ei={1.6} />; })}
      {pin(a, C.cyan, false)}{pin(b, RED, k >= 1)}
      <group position={[mx, my + 0.06, 0.25]} scale={0.32}><Bike t={t} tt={tt} p={{ shirt: RED, speed: 9 }} /></group>
    </group>
  );
};

/** Grilla de cubos que aparecen de a uno. Origen: centro de la base. */
export const Cubes: React.FC<P> = ({ tt, p }) => {
  const { n = 14, cols = 5, size = 0.2, gap = 0.04, color = C.gold, stagger = 0.03 } = p; const st = size + gap; const w = cols * st - gap;
  return (<group>{Array.from({ length: n }, (_, i) => { const k = pop(tt - i * stagger); if (k <= 0) return null;
    return <mesh key={i} position={[-w / 2 + size / 2 + (i % cols) * st, size / 2 + Math.floor(i / cols) * st, 0]} scale={k}><boxGeometry args={[size, size, size]} /><M c={color} e={color} ei={0.55} /></mesh>; })}</group>);
};

const KITS: Record<string, { shirt: string; shorts: string; socks: string }> = {
  est: { shirt: RED, shorts: WHITE, socks: RED },
  pal: { shirt: GREEN, shorts: WHITE, socks: GREEN },
};
/** Jugador genérico de color liso (sin escudo, sin número). kit: est (rojo y blanco) | pal (verde). */
export const Player: React.FC<P> = ({ t, p }) => {
  const { kit = 'est', pose = 'idle', phase = 0, skin = '#e3ad80', hair = '#15102b' } = p; const K = KITS[kit] ?? KITS.est;
  const w = Math.sin((t + phase) * 11), sway = Math.sin((t + phase) * 2.2);
  let aL: V3 = [0, 0, -0.1 - sway * 0.03], aR: V3 = [0, 0, 0.1 + sway * 0.03];
  if (pose === 'cheer') { aL = [0, 0, -2.6 - w * 0.12]; aR = [0, 0, 2.6 + w * 0.12]; }
  if (pose === 'fist') { aL = [0.3, 0, -0.5]; aR = [0, 0, 2.95]; }
  if (pose === 'sad') { aL = [0.1, 0, -0.05]; aR = [0.1, 0, 0.05]; }
  const y0 = pose === 'cheer' ? Math.abs(Math.sin((t + phase) * 7)) * 0.1 : sway * 0.012;
  const arm = (x: number, r: V3) => (
    <group position={[x, 0.58, 0]} rotation={r}><B s={[0.14, 0.26, 0.15]} pos={[0, -0.1, 0]} c={K.shirt} /><B s={[0.11, 0.3, 0.12]} pos={[0, -0.36, 0]} c={skin} /><B s={[0.12, 0.12, 0.13]} pos={[0, -0.54, 0]} c={skin} /></group>);
  return (
    <group position={[0, y0, 0]}>
      {[-1, 1].map((sd) => (
        <group key={sd} position={[0.12 * sd, 0.7, 0]}>
          <B s={[0.2, 0.26, 0.22]} pos={[0, -0.1, 0]} c={K.shorts} /><B s={[0.14, 0.2, 0.15]} pos={[0, -0.32, 0]} c={skin} />
          <B s={[0.15, 0.22, 0.16]} pos={[0, -0.52, 0]} c={K.socks} /><B s={[0.18, 0.09, 0.27]} pos={[0, -0.68, 0.04]} c="#0d0a1c" />
        </group>))}
      <group position={[0, 0.7, 0]} rotation={[pose === 'sad' ? 0.25 : 0, 0, sway * 0.015]}>
        <B s={[0.52, 0.62, 0.29]} pos={[0, 0.32, 0]} c={K.shirt} e={K.shirt} ei={0.15} />
        {arm(-0.33, aL)}{arm(0.33, aR)}
        <group position={[0, 0.84, 0]} rotation={[pose === 'sad' ? 0.3 : 0, sway * 0.05, 0]}>
          <B s={[0.37, 0.36, 0.34]} c={skin} /><B s={[0.43, 0.17, 0.4]} pos={[0, 0.2, -0.01]} c={hair} /><B s={[0.43, 0.2, 0.12]} pos={[0, 0.06, -0.16]} c={hair} />
        </group>
      </group>
    </group>
  );
};

/** Cancha: w (x) por d (z), centrada. */
export const Pitch: React.FC<P> = ({ p }) => {
  const { w = 7, d = 14, bands = 8 } = p; const L = '#eafff2'; const bd = d / bands;
  return (
    <group>
      {Array.from({ length: bands }, (_, i) => <B key={i} s={[w, 0.04, bd]} pos={[0, 0.02, -d / 2 + bd / 2 + i * bd]} c={i % 2 ? '#178a4a' : '#12733d'} />)}
      {[-1, 1].map((s) => <B key={s} s={[0.06, 0.02, d]} pos={[(w / 2) * s, 0.05, 0]} c={L} e={L} ei={0.8} />)}
      {[-1, 1].map((s) => <B key={'z' + s} s={[w, 0.02, 0.06]} pos={[0, 0.05, (d / 2) * s]} c={L} e={L} ei={0.8} />)}
    </group>
  );
};

/** Tribuna escalonada con gente (cajitas). Mira hacia +z. p: w, rows, pal, fill (segundos en llenarse), cheer */
export const Stands: React.FC<P> = ({ t, tt, p }) => {
  const { w = 10, rows = 7, seed = 3, fill = 99, cheer = 1, pal = [RED, WHITE, GREEN, WHITE, RED, GREEN] } = p;
  const ppl = useMemo(() => { const r = rnd(seed); const n = Math.floor(w / 0.27); const o: { x: number; row: number; c: string; ph: number; h: number }[] = [];
    for (let row = 0; row < rows; row++) for (let i = 0; i < n; i++) o.push({ x: -w / 2 + 0.14 + i * 0.27 + (r() - 0.5) * 0.05, row, c: pal[Math.floor(r() * pal.length)], ph: r() * 6, h: 0.24 + r() * 0.1 });
    return o; }, [w, rows, seed]);
  const k = clamp(tt / fill);
  return (
    <group>
      {Array.from({ length: rows }, (_, r) => <B key={r} s={[w, 0.45, 0.6]} pos={[0, 0.225 + r * 0.45, -r * 0.6]} c={r % 2 ? '#2d1a6e' : '#241659'} />)}
      <B s={[w, 0.5, 0.08]} pos={[0, 0.25, 0.34]} c="#15102b" />
      {ppl.map((q, i) => { if (fill < 90 && ((i * 37) % ppl.length) / ppl.length > k) return null; const j = Math.max(0, Math.sin(t * 6 + q.ph)) * 0.09 * cheer;
        return <group key={i} position={[q.x, 0.45 + q.row * 0.45 + j, -q.row * 0.6]}>
          <B s={[0.17, q.h, 0.16]} pos={[0, q.h / 2, 0]} c={q.c} e={q.c} ei={0.2} /><B s={[0.12, 0.12, 0.12]} pos={[0, q.h + 0.07, 0]} c="#e3ad80" /></group>; })}
    </group>
  );
};

/** Copa genérica dorada (~0.9 de alto) */
export const Cup: React.FC<P> = ({ t }) => { const g = C.gold; const pu = 0.6 + Math.sin(t * 4) * 0.25;
  return (
    <group>
      <mesh position={[0, 0.06, 0]}><cylinderGeometry args={[0.2, 0.24, 0.12, 8]} /><M c="#2d1a6e" /></mesh>
      <mesh position={[0, 0.27, 0]}><cylinderGeometry args={[0.06, 0.12, 0.3, 6]} /><M c={g} e={g} ei={pu} /></mesh>
      <mesh position={[0, 0.6, 0]}><cylinderGeometry args={[0.27, 0.1, 0.4, 8]} /><M c={g} e={g} ei={pu} /></mesh>
      <mesh position={[0, 0.83, 0]}><cylinderGeometry args={[0.29, 0.27, 0.07, 8]} /><M c="#ffe08a" e={g} ei={pu} /></mesh>
      {[-1, 1].map((s) => <group key={s}><B s={[0.16, 0.05, 0.06]} pos={[0.3 * s, 0.74, 0]} c={g} e={g} ei={pu} /><B s={[0.05, 0.26, 0.06]} pos={[0.37 * s, 0.62, 0]} c={g} e={g} ei={pu} /><B s={[0.14, 0.05, 0.06]} pos={[0.29 * s, 0.5, 0]} c={g} e={g} ei={pu} /></group>)}
    </group>
  ); };

/** Marcador: dos filas (equipo + goles). p: a, b, sa, sb, ca, cb, top, hi */
export const Score: React.FC<P> = ({ t, tt, p }) => {
  const { a = 'LOCAL', b = 'VISITA', sa = 0, sb = 0, ca = C.blue, cb = C.red, top = '', hi } = p;
  const row = (y: number, name: string, sc: number | string, col: string, on: boolean) => (
    <group position={[0, y, 0.06]}>
      <B s={[0.16, 0.5, 0.05]} pos={[-1.36, 0, 0]} c={col} e={col} ei={0.6} />
      <group position={[-0.3, 0, 0]}><Label t={t} tt={tt} p={{ text: name, w: 1.9, h: 0.5, bg: '#241659', size: 0.6, weight: 900, depth: 0.02 }} /></group>
      <group position={[1.08, 0, 0.02]}><Label t={t} tt={tt} p={{ text: String(sc), w: 0.66, h: 0.5, bg: on ? C.gold : '#f4f1ff', color: '#15102b', size: 0.86, weight: 900, depth: 0.02 }} /></group>
    </group>);
  return (
    <group>
      <B s={[3.1, 1.62, 0.1]} c="#15102b" />
      <B s={[3.18, 1.7, 0.06]} pos={[0, 0, -0.04]} c={C.cyan} e={C.cyan} ei={1.2} />
      <group position={[0, 0.62, 0.06]}><Label t={t} tt={tt} p={{ text: top, w: 2.9, h: 0.26, color: C.cyan, size: 0.66, weight: 800, depth: 0 }} /></group>
      {row(0.18, a, sa, ca, hi === 'a')}{row(-0.42, b, sb, cb, hi === 'b')}
    </group>
  );
};

export const EXTRA = { bike: Bike, bus: Bus, convoy: Convoy, fans: Fans, mass: Mass, ticket: Ticket, stadium: Stadium, clock: Clock, route: Route, cubes: Cubes,
  player: Player, pitch: Pitch, stands: Stands, cup: Cup, score: Score };
