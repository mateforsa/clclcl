import React, { useMemo } from 'react';
import { M, Label } from '../../src/kit/Props';
import { C, clamp, eo, lerp, pop, rnd } from '../../src/kit/math';

type P = { t: number; tt: number; p: any };
type V3 = [number, number, number];
const B: React.FC<{ s: V3; pos?: V3; rot?: V3; c: string; e?: string; ei?: number }> = ({ s, pos, rot, c, e, ei }) => (
  <mesh position={pos} rotation={rot}><boxGeometry args={s} /><M c={c} e={e} ei={ei} /></mesh>
);

const KITS: Record<string, { shirt: string; shorts: string; socks: string; stripe?: string; numc: string }> = {
  psg: { shirt: '#1d2f8a', shorts: '#1d2f8a', socks: '#1d2f8a', numc: '#f4f1ff' },
  roma: { shirt: '#b01c33', shorts: '#b01c33', socks: '#f2a91e', numc: '#f2a91e' },
  lille: { shirt: '#e8334a', shorts: '#1b2a5a', socks: '#e8334a', numc: '#f4f1ff' },
  bayern: { shirt: '#f4f1ff', shorts: '#c21f2f', socks: '#f4f1ff', numc: '#c21f2f' },
  inter: { shirt: '#1f5fe0', shorts: '#15102b', socks: '#15102b', stripe: '#15102b', numc: '#f4f1ff' },
  stuttgart: { shirt: '#f4f1ff', shorts: '#f4f1ff', socks: '#f4f1ff', numc: '#c21f2f' },
  atleti: { shirt: '#e8334a', shorts: '#27409c', socks: '#e8334a', stripe: '#f4f1ff', numc: '#15102b' },
  viking: { shirt: '#16245e', shorts: '#16245e', socks: '#16245e', numc: '#f4f1ff' },
  liverpool: { shirt: '#d81f33', shorts: '#d81f33', socks: '#d81f33', numc: '#f4f1ff' },
  brujas: { shirt: '#3d8bff', shorts: '#15102b', socks: '#15102b', stripe: '#15102b', numc: '#f4f1ff' },
  barca: { shirt: '#27409c', shorts: '#27409c', socks: '#27409c', stripe: '#a3182d', numc: '#ffd36b' },
  sabah: { shirt: '#6cc4ff', shorts: '#f4f1ff', socks: '#6cc4ff', numc: '#15102b' },
  madrid: { shirt: '#f4f1ff', shorts: '#f4f1ff', socks: '#f4f1ff', numc: '#15102b' },
  stripes: { shirt: '#6cc4ff', shorts: '#15102b', socks: '#f4f1ff', stripe: '#f4f1ff', numc: '#15102b' },
  gk: { shirt: '#3ee07a', shorts: '#15102b', socks: '#3ee07a', numc: '#15102b' },
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
          <Label t={t} tt={tt} p={{ text: String(num), w: 0.42, h: 0.4, size: 0.86, weight: 900, color: K.numc, depth: 0 }} /></group>}
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

/** Marcador: dos filas (equipo + goles). p: a, b, sa, sb, ca, cb, top */
export const Score: React.FC<P> = ({ t, tt, p }) => {
  const { a = 'LOCAL', b = 'VISITA', sa = 0, sb = 0, ca = C.blue, cb = C.red, top = 'CHAMPIONS · FECHA 5', hi } = p;
  const row = (y: number, name: string, sc: number | string, col: string, on: boolean) => (
    <group position={[0, y, 0.06]}>
      <B s={[0.16, 0.5, 0.05]} pos={[-1.36, 0, 0]} c={col} e={col} ei={0.6} />
      <group position={[-0.3, 0, 0]}><Label t={t} tt={tt} p={{ text: name, w: 1.9, h: 0.5, bg: '#241659', size: 0.6, weight: 900, depth: 0.02 }} /></group>
      <group position={[1.08, 0, 0.02]}><Label t={t} tt={tt} p={{ text: String(sc), w: 0.66, h: 0.5, bg: on ? C.gold : '#f4f1ff', color: '#15102b', size: 0.86, weight: 900, depth: 0.02 }} /></group>
    </group>
  );
  return (
    <group>
      <B s={[3.1, 1.62, 0.1]} c="#15102b" />
      <B s={[3.18, 1.7, 0.06]} pos={[0, 0, -0.04]} c={C.cyan} e={C.cyan} ei={1.2} />
      <group position={[0, 0.62, 0.06]}><Label t={t} tt={tt} p={{ text: top, w: 2.9, h: 0.26, color: C.cyan, size: 0.66, weight: 800, depth: 0 }} /></group>
      {row(0.18, a, sa, ca, hi === 'a' || hi === 'ab')}
      {row(-0.42, b, sb, cb, hi === 'b' || hi === 'ab')}
    </group>
  );
};

/** Banco de suplentes */
export const Bench: React.FC<P> = () => (
  <group>
    <B s={[1.3, 0.12, 0.4]} pos={[0, 0.42, 0]} c="#5b4aa0" />
    <B s={[1.3, 0.7, 0.08]} pos={[0, 0.75, -0.2]} c="#2d1a6e" />
    <B s={[1.4, 0.08, 0.7]} pos={[0, 1.45, 0]} c="#9a8fd0" />
    {[-1, 1].map((s) => <B key={s} s={[0.08, 1.45, 0.08]} pos={[0.66 * s, 0.72, -0.2]} c="#9a8fd0" />)}
  </group>
);

export const EXTRA = { player: Player, ball: Ball, goal: Goal, pitch: Pitch, stands: Stands, cup: Cup, score: Score, bench: Bench };
