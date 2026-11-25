import React, { useMemo } from 'react';
import { M, Label } from '../../src/kit/Props';
import { C, clamp, eo, lerp, pop, rnd } from '../../src/kit/math';

type P = { t: number; tt: number; p: any };
type V3 = [number, number, number];
const B: React.FC<{ s: V3; pos?: V3; rot?: V3; c: string; e?: string; ei?: number }> = ({ s, pos, rot, c, e, ei }) => (
  <mesh position={pos} rotation={rot}><boxGeometry args={s} /><M c={c} e={e} ei={ei} /></mesh>
);

const KITS: Record<string, { shirt: string; shorts: string; socks: string; stripe?: string; numc: string }> = {
  stripes: { shirt: '#6cc4ff', shorts: '#15102b', socks: '#f4f1ff', stripe: '#f4f1ff', numc: '#15102b' },
  blue: { shirt: '#2a4fe0', shorts: '#15102b', socks: '#f4f1ff', numc: '#f4f1ff' },
  eng: { shirt: '#f4f1ff', shorts: '#27409c', socks: '#f4f1ff', numc: '#27409c' },
  gk: { shirt: '#9aa3bd', shorts: '#15102b', socks: '#9aa3bd', numc: '#15102b' },
  ref: { shirt: '#15102b', shorts: '#15102b', socks: '#15102b', numc: '#15102b' },
};

/** Jugador genérico (sin rasgos). kit: stripes | blue | eng | gk | ref. pose: idle | run | cheer | fist | point | shrug | sad | hold */
export const Player: React.FC<P> = ({ t, tt, p }) => {
  const { kit = 'stripes', num, pose = 'idle', phase = 0, skin = '#e3ad80', hair = '#15102b' } = p;
  const K = KITS[kit] ?? KITS.stripes;
  const w = Math.sin((t + phase) * 11), sway = Math.sin((t + phase) * 2.2);
  const run = pose === 'run';
  let aL: V3 = [0, 0, -0.1 - sway * 0.03], aR: V3 = [0, 0, 0.1 + sway * 0.03];
  if (run) { aL = [-w * 0.8, 0, -0.12]; aR = [w * 0.8, 0, 0.12]; }
  if (pose === 'cheer') { aL = [0, 0, -2.6 - w * 0.12]; aR = [0, 0, 2.6 + w * 0.12]; }
  if (pose === 'fist') { aL = [0.3, 0, -0.5]; aR = [0, 0, 2.95]; }
  if (pose === 'point') aR = [-1.45 + sway * 0.04, 0, 0.15];
  if (pose === 'shrug') { aL = [0, 0, -1.2 - sway * 0.1]; aR = [0, 0, 1.2 + sway * 0.1]; }
  if (pose === 'sad') { aL = [0.1, 0, -0.05]; aR = [0.1, 0, 0.05]; }
  if (pose === 'hold') { aL = [-1.0, 0, -0.25]; aR = [-1.0, 0, 0.25]; }
  const y0 = pose === 'cheer' ? Math.abs(Math.sin((t + phase) * 7)) * 0.1 : run ? Math.abs(w) * 0.06 : sway * 0.012;
  const arm = (x: number, r: V3) => (
    <group position={[x, 0.58, 0]} rotation={r}>
      <B s={[0.14, 0.26, 0.15]} pos={[0, -0.1, 0]} c={K.shirt} />
      <B s={[0.11, 0.3, 0.12]} pos={[0, -0.36, 0]} c={skin} />
      <B s={[0.12, 0.12, 0.13]} pos={[0, -0.54, 0]} c={kit === 'gk' ? '#f4f1ff' : skin} />
    </group>
  );
  return (
    <group position={[0, y0, 0]} rotation={[run ? 0.14 : 0, 0, 0]}>
      {[-1, 1].map((sd) => (
        <group key={sd} position={[0.12 * sd, 0.7, 0]} rotation={[run ? w * 0.85 * sd : 0, 0, 0]}>
          <B s={[0.2, 0.26, 0.22]} pos={[0, -0.1, 0]} c={K.shorts} />
          <B s={[0.14, 0.2, 0.15]} pos={[0, -0.32, 0]} c={skin} />
          <B s={[0.15, 0.22, 0.16]} pos={[0, -0.52, 0]} c={K.socks} />
          <B s={[0.18, 0.09, 0.27]} pos={[0, -0.68, 0.04]} c="#0d0a1c" />
        </group>
      ))}
      <group position={[0, 0.7, 0]} rotation={[pose === 'sad' ? 0.25 : 0, 0, sway * 0.015]}>
        <B s={[0.52, 0.62, 0.29]} pos={[0, 0.32, 0]} c={K.shirt} />
        {K.stripe && [-0.2, 0, 0.2].map((x) => <B key={x} s={[0.075, 0.625, 0.3]} pos={[x, 0.32, 0]} c={K.stripe!} />)}
        {num && <group position={[0, 0.36, -0.153]} rotation={[0, Math.PI, 0]}>
          <Label t={t} tt={tt} p={{ text: String(num), w: 0.42, h: 0.4, size: 0.86, weight: 900, color: K.numc, bg: K.stripe ? '#f4f1ff' : undefined, depth: 0 }} /></group>}
        {arm(-0.33, aL)}{arm(0.33, aR)}
        <group position={[0, 0.84, 0]} rotation={[pose === 'sad' ? 0.3 : 0, sway * 0.05, 0]}>
          <B s={[0.37, 0.36, 0.34]} c={skin} />
          <B s={[0.43, 0.17, 0.4]} pos={[0, 0.2, -0.01]} c={hair} />
          <B s={[0.43, 0.2, 0.12]} pos={[0, 0.06, -0.16]} c={hair} />
        </group>
      </group>
    </group>
  );
};

/** Pelota (radio 0.17) */
export const Ball: React.FC<P> = ({ t, p }) => {
  const { spin = 3, r = 0.17 } = p;
  const pts: V3[] = [[0, 1, 0], [0, -1, 0], [0.9, 0.3, 0.3], [-0.9, 0.3, -0.3], [0.3, 0.3, -0.9], [-0.3, -0.3, 0.9], [0.5, -0.6, -0.6], [-0.5, 0.6, 0.6]];
  return (
    <group rotation={[t * spin, t * spin * 0.6, 0]} scale={r / 0.17}>
      <mesh><icosahedronGeometry args={[0.17, 1]} /><M c="#f4f1ff" e="#f4f1ff" ei={0.25} /></mesh>
      {pts.map((q, i) => <mesh key={i} position={[q[0] * 0.135, q[1] * 0.135, q[2] * 0.135]}><icosahedronGeometry args={[0.065, 0]} /><M c="#15102b" /></mesh>)}
    </group>
  );
};

/** Arco: boca hacia +z. w ancho, h alto */
export const Goal: React.FC<P> = ({ p }) => {
  const { w = 3, h = 1.5, d = 0.9 } = p; const post = '#f4f1ff', net = '#b9c2ff';
  const nx = Math.round(w / 0.3), ny = Math.round(h / 0.3);
  return (
    <group>
      {[-1, 1].map((s) => <B key={s} s={[0.1, h, 0.1]} pos={[(w / 2) * s, h / 2, 0]} c={post} e={post} ei={0.5} />)}
      <B s={[w + 0.1, 0.1, 0.1]} pos={[0, h, 0]} c={post} e={post} ei={0.5} />
      {Array.from({ length: nx + 1 }, (_, i) => <B key={'v' + i} s={[0.022, h, 0.022]} pos={[-w / 2 + (i * w) / nx, h / 2, -d]} c={net} />)}
      {Array.from({ length: ny + 1 }, (_, i) => <B key={'h' + i} s={[w, 0.022, 0.022]} pos={[0, (i * h) / ny, -d]} c={net} />)}
      {[-1, 1].map((s) => Array.from({ length: ny + 1 }, (_, i) => <B key={s + 'd' + i} s={[0.022, 0.022, d]} pos={[(w / 2) * s, (i * h) / ny, -d / 2]} c={net} />))}
      {Array.from({ length: nx + 1 }, (_, i) => <B key={'t' + i} s={[0.022, 0.022, d]} pos={[-w / 2 + (i * w) / nx, h, -d / 2]} c={net} />)}
    </group>
  );
};

/** Cancha: w (x) por d (z), centrada. center: z de la línea del medio. box: z del fondo con área. */
export const Pitch: React.FC<P> = ({ p }) => {
  const { w = 7, d = 14, center, box, bands = 8 } = p; const L = '#eafff2'; const bd = d / bands;
  const ln = (s: V3, pos: V3, k: string) => <B key={k} s={s} pos={pos} c={L} e={L} ei={0.8} />;
  return (
    <group>
      {Array.from({ length: bands }, (_, i) => <B key={i} s={[w, 0.04, bd]} pos={[0, 0.02, -d / 2 + bd / 2 + i * bd]} c={i % 2 ? '#178a4a' : '#12733d'} />)}
      {ln([0.06, 0.02, d], [-w / 2, 0.05, 0], 'l')}{ln([0.06, 0.02, d], [w / 2, 0.05, 0], 'r')}
      {ln([w, 0.02, 0.06], [0, 0.05, -d / 2], 'f')}{ln([w, 0.02, 0.06], [0, 0.05, d / 2], 'n')}
      {center !== undefined && <group>
        {ln([w, 0.02, 0.06], [0, 0.05, center], 'c')}
        <mesh position={[0, 0.055, center]} rotation={[-Math.PI / 2, 0, 0]}><ringGeometry args={[1.0, 1.06, 28]} /><meshBasicMaterial color={L} toneMapped={false} /></mesh>
      </group>}
      {box !== undefined && <group>
        {ln([4.4, 0.02, 0.06], [0, 0.05, box + 2.0], 'b1')}{ln([0.06, 0.02, 2.0], [-2.2, 0.05, box + 1.0], 'b2')}{ln([0.06, 0.02, 2.0], [2.2, 0.05, box + 1.0], 'b3')}
        {ln([2.2, 0.02, 0.06], [0, 0.05, box + 0.8], 'b4')}{ln([0.06, 0.02, 0.8], [-1.1, 0.05, box + 0.4], 'b5')}{ln([0.06, 0.02, 0.8], [1.1, 0.05, box + 0.4], 'b6')}
      </group>}
    </group>
  );
};

/** Tribuna escalonada con gente (cajitas) que salta. Mira hacia +z. */
export const Stands: React.FC<P> = ({ t, tt, p }) => {
  const { w = 10, rows = 7, seed = 3, fill = 99, cheer = 1 } = p;
  const pal = ['#6cc4ff', '#f4f1ff', '#6cc4ff', '#f4f1ff', C.gold, C.magenta, '#3ee07a', '#ff7a3d', '#8a6bff'];
  const ppl = useMemo(() => { const r = rnd(seed); const n = Math.floor(w / 0.27); const o: { x: number; row: number; c: string; ph: number; h: number }[] = [];
    for (let row = 0; row < rows; row++) for (let i = 0; i < n; i++) o.push({ x: -w / 2 + 0.14 + i * 0.27 + (r() - 0.5) * 0.05, row, c: pal[Math.floor(r() * pal.length)], ph: r() * 6, h: 0.24 + r() * 0.1 });
    return o; }, [w, rows, seed]);
  const k = clamp(tt / fill);
  return (
    <group>
      {Array.from({ length: rows }, (_, r) => <B key={r} s={[w, 0.45, 0.6]} pos={[0, 0.225 + r * 0.45, -r * 0.6]} c={r % 2 ? '#2d1a6e' : '#241659'} />)}
      <B s={[w, 0.5, 0.08]} pos={[0, 0.25, 0.34]} c="#15102b" />
      {ppl.map((q, i) => { if (fill < 90 && (i * 37 % ppl.length) / ppl.length > k) return null; const j = Math.max(0, Math.sin(t * 6 + q.ph)) * 0.09 * cheer;
        return <group key={i} position={[q.x, 0.45 + q.row * 0.45 + j, -q.row * 0.6]}>
          <B s={[0.17, q.h, 0.16]} pos={[0, q.h / 2, 0]} c={q.c} /><B s={[0.12, 0.12, 0.12]} pos={[0, q.h + 0.07, 0]} c="#e3ad80" /></group>; })}
    </group>
  );
};

/** Copa genérica dorada (~0.9 de alto) */
export const Cup: React.FC<P> = ({ t }) => { const g = C.gold; const pu = 0.6 + Math.sin(t * 4) * 0.25;
  return (
    <group>
      <mesh position={[0, 0.06, 0]}><cylinderGeometry args={[0.2, 0.24, 0.12, 8]} /><M c="#1f8a4c" /></mesh>
      <mesh position={[0, 0.27, 0]}><cylinderGeometry args={[0.06, 0.12, 0.3, 6]} /><M c={g} e={g} ei={pu} /></mesh>
      <mesh position={[0, 0.6, 0]}><cylinderGeometry args={[0.27, 0.1, 0.4, 8]} /><M c={g} e={g} ei={pu} /></mesh>
      <mesh position={[0, 0.83, 0]}><cylinderGeometry args={[0.29, 0.27, 0.07, 8]} /><M c="#ffe08a" e={g} ei={pu} /></mesh>
      {[-1, 1].map((s) => <group key={s}><B s={[0.16, 0.05, 0.06]} pos={[0.3 * s, 0.74, 0]} c={g} e={g} ei={pu} /><B s={[0.05, 0.26, 0.06]} pos={[0.37 * s, 0.62, 0]} c={g} e={g} ei={pu} /><B s={[0.14, 0.05, 0.06]} pos={[0.29 * s, 0.5, 0]} c={g} e={g} ei={pu} /></group>)}
    </group>
  ); };

/** Camiseta plana para exhibir. kit: stripes | blue. Muestra el número. */
export const Shirt: React.FC<P> = ({ t, tt, p }) => {
  const { kit = 'blue', num = '10', glow = false } = p; const K = KITS[kit];
  return (
    <group>
      <B s={[1.0, 1.25, 0.1]} c={K.shirt} e={glow ? K.shirt : undefined} ei={0.35} />
      {K.stripe && [-0.375, -0.125, 0.125, 0.375].map((x) => <B key={x} s={[0.125, 1.255, 0.11]} pos={[x, 0, 0]} c={K.stripe!} e={glow ? '#ffffff' : undefined} ei={0.25} />)}
      {[-1, 1].map((s) => <B key={s} s={[0.42, 0.36, 0.1]} pos={[0.64 * s, 0.4, 0]} rot={[0, 0, 0.5 * s]} c={K.shirt} e={glow ? K.shirt : undefined} ei={0.35} />)}
      <B s={[0.36, 0.1, 0.12]} pos={[0, 0.62, 0]} c={K.stripe ? '#15102b' : '#f4f1ff'} />
      <group position={[0, -0.05, 0.06]}><Label t={t} tt={tt} p={{ text: String(num), w: 0.74, h: 0.7, size: 0.9, weight: 900, color: K.numc, bg: K.stripe ? '#f4f1ff' : undefined, depth: 0 }} /></group>
    </group>
  );
};

/** Mano dorada luminosa, dedos hacia abajo */
export const Hand: React.FC<P> = ({ t }) => { const g = '#ffd36b'; const pu = 1.0 + Math.sin(t * 5) * 0.4;
  return (
    <group rotation={[0, 0, Math.PI]}>
      <B s={[0.56, 0.56, 0.18]} c={g} e={C.gold} ei={pu} />
      {[-0.21, -0.07, 0.07, 0.21].map((x, i) => <B key={x} s={[0.11, i === 1 || i === 2 ? 0.5 : 0.4, 0.15]} pos={[x, 0.28 + (i === 1 || i === 2 ? 0.25 : 0.2), 0]} c={g} e={C.gold} ei={pu} />)}
      <B s={[0.3, 0.12, 0.15]} pos={[-0.4, -0.05, 0]} rot={[0, 0, 0.5]} c={g} e={C.gold} ei={pu} />
      <B s={[0.44, 0.3, 0.2]} pos={[0, -0.42, 0]} c="#f4f1ff" e="#f4f1ff" ei={0.4} />
    </group>
  ); };

/** Corrida con pelota por un camino [x,z][]; deja estela; rivales que quedan atrás con su número. */
export const Dribble: React.FC<P> = ({ t, tt, p }) => {
  const { path = [[0, 4], [0, -4]], dur = 3, delay = 0, rivals = [], keeper, goalZ, kit = 'blue', count = true, sc = 1 } = p as any;
  const segs = useMemo(() => { let tot = 0; const l: number[] = []; for (let i = 1; i < path.length; i++) { const dl = Math.hypot(path[i][0] - path[i - 1][0], path[i][1] - path[i - 1][1]); l.push(dl); tot += dl; } return { l, tot }; }, [JSON.stringify(path)]);
  const at = (k: number): [number, number, number] => { let dist = clamp(k) * segs.tot; for (let i = 0; i < segs.l.length; i++) { if (dist <= segs.l[i] || i === segs.l.length - 1) { const u = clamp(dist / segs.l[i]); const a = path[i], b = path[i + 1];
    return [lerp(a[0], b[0], u), lerp(a[1], b[1], u), Math.atan2(b[0] - a[0], b[1] - a[1])]; } dist -= segs.l[i]; } return [path[0][0], path[0][1], Math.PI]; };
  const k = clamp((tt - delay) / dur); const [x, z, ang] = at(k); const done = k >= 1;
  const after = Math.max(0, tt - delay - dur); const shot = goalZ !== undefined ? eo(after / 0.35) : 0;
  const bx = x + Math.sin(ang) * 0.38, bz = z + Math.cos(ang) * 0.38;
  const dots = Math.floor((k * segs.tot) / 0.3);
  const all: { x: number; z: number; gk?: boolean }[] = [...rivals.map((r: number[]) => ({ x: r[0], z: r[1] })), ...(keeper ? [{ x: keeper[0], z: keeper[1], gk: true }] : [])];
  return (
    <group>
      {Array.from({ length: dots }, (_, i) => { const q = at((i * 0.3) / segs.tot); return <B key={i} s={[0.1, 0.03, 0.1]} pos={[q[0], 0.07, q[1]]} c={C.gold} e={C.gold} ei={2} />; })}
      {all.map((r, i) => { const passed = z < r.z - 0.15; const kk = passed ? pop(tt - delay - 0.0001) : 0; const lean = passed ? 0.35 : 0;
        return <group key={i} position={[r.x, 0, r.z]}>
          <group rotation={[0, passed ? Math.PI * 0.8 : 0, lean * (r.x > x ? -1 : 1)]} scale={sc}><Player t={t} tt={tt} p={{ kit: r.gk ? 'gk' : 'eng', pose: passed ? 'sad' : 'idle', phase: i * 1.3, skin: ['#f2c39b', '#ffd9b8', '#e8b48c'][i % 3], hair: ['#7a4b1a', '#c98a3a', '#3a2a1a'][i % 3] }} /></group>
          {count && passed && <group position={[0, 2.3 * sc, 0]} rotation={[-0.75, 0, 0]} scale={kk > 0 ? 1.0 : 0}><Label t={t} tt={tt} p={{ text: String(i + 1), w: 0.6, h: 0.6, size: 0.8, weight: 900, bg: C.gold, color: '#15102b' }} /></group>}
        </group>; })}
      <group position={[x, 0, z]} rotation={[0, ang, 0]} scale={sc}><Player t={t} tt={tt} p={{ kit, num: '10', pose: done ? 'cheer' : 'run' }} /></group>
      <group position={[lerp(bx, 0.3, shot), 0.17 + Math.sin(shot * Math.PI) * 0.3, goalZ !== undefined ? lerp(bz, goalZ, shot) : bz]}><Ball t={t} tt={tt} p={{ spin: done ? 1 : 9 }} /></group>
    </group>
  );
};

export const EXTRA = { player: Player, ball: Ball, goal: Goal, pitch: Pitch, stands: Stands, cup: Cup, shirt: Shirt, hand: Hand, dribble: Dribble };
