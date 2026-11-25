import React from 'react';
import { M, Label } from '../../src/kit/Props';
import { C } from '../../src/kit/math';

type P = { t: number; tt: number; p: any };
type V3 = [number, number, number];
const B: React.FC<{ s: V3; pos?: V3; rot?: V3; c: string; e?: string; ei?: number }> = ({ s, pos, rot, c, e, ei }) => (
  <mesh position={pos} rotation={rot}><boxGeometry args={s} /><M c={c} e={e} ei={ei} /></mesh>
);

/** Monoplaza genérico, trompa hacia +z, ~3,4 de largo. p: color, accent, helmet, speed (giro de ruedas) */
export const F1Car: React.FC<P> = ({ t, p }) => {
  const { color = C.blue, accent = '#f4f1ff', helmet = C.gold, speed = 0, glow = 0.25 } = p;
  const dk = '#0d0a1c';
  return (
    <group>
      <B s={[0.56, 0.2, 1.7]} pos={[0, 0.3, -0.05]} c={color} e={color} ei={glow} />
      <B s={[0.34, 0.16, 0.7]} pos={[0, 0.27, 1.05]} c={color} e={color} ei={glow} />
      <B s={[0.2, 0.12, 0.5]} pos={[0, 0.23, 1.6]} c={accent} />
      <B s={[1.3, 0.05, 0.3]} pos={[0, 0.12, 1.78]} c={accent} e={accent} ei={0.2} />
      {[-1, 1].map((s) => <B key={'fe' + s} s={[0.05, 0.2, 0.34]} pos={[0.65 * s, 0.19, 1.78]} c={color} />)}
      {[-1, 1].map((s) => <B key={'sp' + s} s={[0.3, 0.24, 0.95]} pos={[0.42 * s, 0.32, -0.15]} c={color} e={color} ei={glow} />)}
      {[-1, 1].map((s) => <B key={'si' + s} s={[0.31, 0.06, 0.6]} pos={[0.42 * s, 0.41, -0.1]} c={accent} />)}
      <B s={[0.3, 0.3, 0.95]} pos={[0, 0.52, -0.55]} c={color} e={color} ei={glow} />
      <B s={[0.2, 0.16, 0.22]} pos={[0, 0.72, -0.2]} c={dk} />
      <B s={[0.07, 0.3, 0.7]} pos={[0, 0.72, -0.95]} c={accent} />
      {/* alerón trasero */}
      <B s={[1.05, 0.07, 0.34]} pos={[0, 0.9, -1.28]} c={accent} e={accent} ei={0.2} />
      <B s={[1.05, 0.05, 0.24]} pos={[0, 0.74, -1.3]} c={color} />
      {[-1, 1].map((s) => <B key={'re' + s} s={[0.05, 0.5, 0.42]} pos={[0.53 * s, 0.72, -1.28]} c={color} e={color} ei={glow} />)}
      <B s={[0.12, 0.3, 0.12]} pos={[0, 0.55, -1.2]} c={dk} />
      {/* piloto y halo */}
      <mesh position={[0, 0.56, 0.22]}><icosahedronGeometry args={[0.15, 1]} /><M c={helmet} e={helmet} ei={0.5} /></mesh>
      <B s={[0.22, 0.06, 0.03]} pos={[0, 0.57, 0.36]} c={dk} />
      <B s={[0.05, 0.05, 0.5]} pos={[0, 0.72, 0.42]} rot={[0.42, 0, 0]} c={dk} />
      <B s={[0.36, 0.05, 0.05]} pos={[0, 0.74, 0.12]} c={dk} />
      {/* ruedas */}
      {[[-0.66, 1.12], [0.66, 1.12], [-0.68, -0.95], [0.68, -0.95]].map(([x, z], i) => (
        <group key={i} position={[x, 0.3, z]} rotation={[t * speed, 0, 0]}>
          <mesh rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.3, 0.3, i < 2 ? 0.28 : 0.34, 10]} /><M c={dk} /></mesh>
          <mesh rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.13, 0.13, i < 2 ? 0.3 : 0.36, 6]} /><M c={accent} e={accent} ei={0.3} /></mesh>
        </group>
      ))}
      {[-1, 1].map((s) => <B key={'fs' + s} s={[0.42, 0.04, 0.05]} pos={[0.36 * s, 0.3, 1.12]} c={dk} />)}
      <B s={[0.16, 0.08, 0.04]} pos={[0, 0.34, -1.47]} c={C.red} e={C.red} ei={2.5} />
    </group>
  );
};

/** Piloto genérico con buzo y casco (sin cara). pose: idle | cheer | sad | shrug | point | hold */
export const Driver: React.FC<P> = ({ t, p }) => {
  const { suit = C.blue, accent = '#f4f1ff', helmet = C.gold, pose = 'idle', phase = 0 } = p;
  const w = Math.sin((t + phase) * 9), sway = Math.sin((t + phase) * 2.2);
  let aL: V3 = [0, 0, -0.1 - sway * 0.03], aR: V3 = [0, 0, 0.1 + sway * 0.03];
  if (pose === 'point') aR = [-1.45 + sway * 0.04, 0, 0.15];
  if (pose === 'cheer') { aL = [0, 0, -2.6 - w * 0.15]; aR = [0, 0, 2.6 + w * 0.15]; }
  if (pose === 'hold') { aL = [-1.0, 0, -0.25]; aR = [-1.0, 0, 0.25]; }
  if (pose === 'sad') { aL = [0.1, 0, -0.05]; aR = [0.1, 0, 0.05]; }
  if (pose === 'shrug') { aL = [0, 0, -1.2 - sway * 0.1]; aR = [0, 0, 1.2 + sway * 0.1]; }
  const y0 = pose === 'cheer' ? Math.abs(Math.sin((t + phase) * 7)) * 0.12 : sway * 0.012;
  const dk = '#0d0a1c';
  return (
    <group position={[0, y0, 0]}>
      {[-1, 1].map((sd) => (
        <group key={sd} position={[0.12 * sd, 0.7, 0]}>
          <B s={[0.18, 0.7, 0.2]} pos={[0, -0.35, 0]} c={suit} />
          <B s={[0.19, 0.12, 0.27]} pos={[0, -0.66, 0.04]} c={dk} />
        </group>
      ))}
      <group rotation={[pose === 'sad' ? 0.25 : 0, 0, sway * 0.015]} position={[0, 0.7, 0]}>
        <B s={[0.54, 0.62, 0.3]} pos={[0, 0.32, 0]} c={suit} />
        <B s={[0.55, 0.1, 0.31]} pos={[0, 0.42, 0]} c={accent} />
        <B s={[0.55, 0.07, 0.31]} pos={[0, 0.05, 0]} c={dk} />
        {[[-0.33, aL], [0.33, aR]].map(([x, r]: any, i) => (
          <group key={i} position={[x, 0.58, 0]} rotation={r}><B s={[0.14, 0.5, 0.15]} pos={[0, -0.22, 0]} c={suit} /><B s={[0.14, 0.13, 0.15]} pos={[0, -0.52, 0]} c={dk} /></group>
        ))}
        <group position={[0, 0.88, 0]} rotation={[pose === 'sad' ? 0.3 : 0, sway * 0.05, 0]}>
          <mesh><icosahedronGeometry args={[0.27, 1]} /><M c={helmet} e={helmet} ei={0.35} /></mesh>
          <B s={[0.4, 0.13, 0.2]} pos={[0, 0.03, 0.17]} c={dk} />
          <B s={[0.3, 0.06, 0.5]} pos={[0, 0.22, 0]} c={accent} />
        </group>
      </group>
    </group>
  );
};

/** Pista recta a lo largo de z. p: len, w, speed (líneas que corren), finish (z de la línea de llegada), grid (n cajones), gz (z del primer cajón), gap */
export const Track: React.FC<P> = ({ t, p }) => {
  const { len = 30, w = 3.4, speed = 0, finish, grid = 0, gz = 0, gap = 1.6 } = p;
  const off = (t * speed) % 2; const n = Math.floor(len / 1);
  return (
    <group>
      <B s={[w, 0.04, len]} pos={[0, 0.02, 0]} c="#231a4d" />
      {[-1, 1].map((s) => <B key={s} s={[0.07, 0.05, len]} pos={[(w / 2 - 0.08) * s, 0.045, 0]} c="#f4f1ff" e="#f4f1ff" ei={1.2} />)}
      {[-1, 1].map((s) => Array.from({ length: n }, (_, i) => { const z = -len / 2 + i + ((t * speed) % 2);
        return <B key={s + 'k' + i} s={[0.3, 0.07, 0.98]} pos={[(w / 2 + 0.15) * s, 0.035, z]} c={i % 2 ? C.red : '#f4f1ff'} e={i % 2 ? C.red : '#f4f1ff'} ei={0.7} />; }))}
      {speed !== 0 && Array.from({ length: Math.floor(len / 2) }, (_, i) => <B key={'d' + i} s={[0.1, 0.05, 0.8]} pos={[0, 0.045, -len / 2 + i * 2 + off]} c={C.cyan} e={C.cyan} ei={1} />)}
      {finish !== undefined && Array.from({ length: 2 }, (_, r) => Array.from({ length: 10 }, (_, i) => (
        <B key={'f' + r + i} s={[w / 10 - 0.02, 0.05, 0.3]} pos={[-w / 2 + (i + 0.5) * (w / 10), 0.05, finish + r * 0.3]} c={(i + r) % 2 ? '#f4f1ff' : '#0d0a1c'} e={(i + r) % 2 ? '#f4f1ff' : undefined} ei={1} />)))}
      {Array.from({ length: grid }, (_, i) => { const x = (i % 2 ? 0.75 : -0.75), z = gz + i * gap;
        return <group key={'g' + i} position={[x, 0.05, z]}><B s={[1.0, 0.03, 0.07]} pos={[0, 0, -1.0]} c="#f4f1ff" e="#f4f1ff" ei={1} />
          {[-1, 1].map((s) => <B key={s} s={[0.07, 0.03, 0.5]} pos={[0.5 * s, 0, -0.78]} c="#f4f1ff" e="#f4f1ff" ei={1} />)}</group>; })}
    </group>
  );
};

/** Semáforo de largada: 5 luces rojas que prenden de a una (p.step) y se apagan en p.off */
export const Lights: React.FC<P> = ({ tt, p }) => {
  const { step = 0.45, off = 99, w = 2.6, h = 2.4, start = 0 } = p; const dk = '#15102b';
  return (
    <group>
      {[-1, 1].map((s) => <B key={s} s={[0.12, h, 0.12]} pos={[(w / 2 + 0.1) * s, h / 2, 0]} c="#8d8aa0" />)}
      <B s={[w + 0.4, 0.16, 0.2]} pos={[0, h, 0]} c="#8d8aa0" />
      {Array.from({ length: 5 }, (_, i) => { const on = tt >= start + i * step && tt < off; const x = -w / 2 + 0.3 + i * ((w - 0.6) / 4);
        return <group key={i} position={[x, h - 0.45, 0.05]}><B s={[0.42, 0.74, 0.16]} c={dk} />
          {[0.17, -0.17].map((y) => <mesh key={y} position={[0, y, 0.09]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.13, 0.13, 0.05, 10]} />
            <M c={on ? C.red : '#3a1420'} e={on ? C.red : undefined} ei={3} /></mesh>)}</group>; })}
    </group>
  );
};

/** Podio de tres escalones con números planos */
export const Podium: React.FC<P> = ({ t, tt }) => (
  <group>
    {[{ x: 0, h: 1.0, n: '1', c: C.gold }, { x: -0.95, h: 0.7, n: '2', c: '#c9c4de' }, { x: 0.95, h: 0.5, n: '3', c: '#c98a3a' }].map((q) => (
      <group key={q.n} position={[q.x, 0, 0]}>
        <B s={[0.93, q.h, 0.9]} pos={[0, q.h / 2, 0]} c="#2d1a6e" /><B s={[0.95, 0.08, 0.92]} pos={[0, q.h, 0]} c={q.c} e={q.c} ei={0.6} />
        <group position={[0, q.h / 2, 0.46]}><Label t={t} tt={tt} p={{ text: q.n, w: 0.6, h: Math.min(0.6, q.h * 0.8), size: 0.9, weight: 900, color: q.c }} /></group>
      </group>))}
  </group>
);

/** Bandera a cuadros que flamea */
export const Flag: React.FC<P> = ({ t, p }) => {
  const { cols = 6, rows = 4, q = 0.17, pole = 1.7 } = p;
  return (
    <group>
      <B s={[0.06, pole, 0.06]} pos={[0, pole / 2, 0]} c="#c9c4de" />
      {Array.from({ length: cols }, (_, i) => Array.from({ length: rows }, (_, j) => { const wv = Math.sin(t * 6 - i * 0.9) * 0.05 * (i + 1) / cols * 2;
        return <B key={i + '-' + j} s={[q, q, 0.03]} pos={[0.03 + q / 2 + i * q, pole - q / 2 - j * q, wv]} c={(i + j) % 2 ? '#f4f1ff' : '#0d0a1c'} e={(i + j) % 2 ? '#f4f1ff' : undefined} ei={0.7} />; }))}
    </group>
  );
};

/** Cartel con un número que cambia (1..max) */
export const Roulette: React.FC<P> = ({ t, tt, p }) => {
  const { max = 20, rate = 7, w = 1.5, h = 1.3 } = p; const n = (Math.floor(t * rate) * 7) % max + 1;
  return <Label t={t} tt={tt} p={{ text: n + '°', w, h, bg: '#15102b', border: C.gold, color: C.gold, size: 0.6, weight: 900 }} />;
};

export const EXTRA = { f1car: F1Car, driver: Driver, track: Track, lights: Lights, podium: Podium, flag: Flag, roulette: Roulette };
