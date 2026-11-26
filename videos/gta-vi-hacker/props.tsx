import React from 'react';
import { M } from '../../src/kit/Props';
import { C, clamp, eo } from '../../src/kit/math';

type P = { t: number; tt: number; p: any };
type V3 = [number, number, number];
const B: React.FC<{ s: V3; pos?: V3; rot?: V3; c: string; e?: string; ei?: number }> = ({ s, pos, rot, c, e, ei }) => (
  <mesh position={pos} rotation={rot}><boxGeometry args={s} /><M c={c} e={e} ei={ei} /></mesh>
);

/** Rejas: marco + barrotes. slide = los barrotes se corren hacia la derecha (se abre) */
export const Rejas: React.FC<P> = ({ tt, p }) => {
  const { w = 1.5, h = 2.3, n = 6, slide = false, dir = 1, dur = 0.7, color = '#b9b4d6' } = p;
  const k = slide ? eo(tt / dur) : 0;
  return (<group>
    <B s={[w + 0.16, 0.12, 0.16]} pos={[0, h, 0]} c="#3b2f7a" e={C.cyan} ei={0.5} />
    <B s={[w + 0.16, 0.1, 0.16]} pos={[0, 0.05, 0]} c="#3b2f7a" />
    <group position={[dir * k * (w + 0.1), 0, 0]}>
      {Array.from({ length: n }, (_, i) => <B key={i} s={[0.07, h, 0.07]} pos={[-w / 2 + (w / (n - 1)) * i, h / 2, 0]} c={color} e={color} ei={0.35} />)}
      <B s={[w, 0.06, 0.06]} pos={[0, h * 0.5, 0]} c={color} e={color} ei={0.35} />
    </group>
  </group>);
};

/** Mazo de juez que golpea una base. Golpea a los `delay` s y repite `n` veces */
export const Mazo: React.FC<P> = ({ tt, p }) => {
  const { delay = 0.15, n = 1, every = 0.7 } = p;
  let a = -0.9;
  for (let i = 0; i < n; i++) { const x = tt - delay - i * every; if (x >= 0 && x < every) a = x < 0.12 ? -0.9 + (x / 0.12) * 0.9 : -0.9 * clamp((x - 0.12) / 0.4); }
  if (tt - delay >= n * every) a = -0.9;
  return (<group>
    <B s={[0.9, 0.14, 0.5]} pos={[0, 0.07, 0]} c="#5a3a22" />
    <B s={[0.6, 0.06, 0.34]} pos={[0, 0.17, 0]} c="#8a5a3a" />
    <group position={[0.75, 0.3, 0]} rotation={[0, 0, -a]}>
      <B s={[0.9, 0.08, 0.08]} pos={[-0.4, 0, 0]} c="#c98a3a" />
      <B s={[0.3, 0.42, 0.3]} pos={[-0.8, 0, 0]} c="#8a5a3a" />
      <B s={[0.32, 0.07, 0.32]} pos={[-0.8, 0.12, 0]} c={C.gold} e={C.gold} ei={0.8} />
      <B s={[0.32, 0.07, 0.32]} pos={[-0.8, -0.12, 0]} c={C.gold} e={C.gold} ei={0.8} />
    </group>
  </group>);
};

/** Barra que se llena */
export const Progress: React.FC<P> = ({ tt, p }) => {
  const { w = 2, h = 0.3, dur = 1.2, to = 1, color = C.green } = p; const k = Math.max(0.001, eo(tt / dur) * to);
  return (<group>
    <B s={[w + 0.1, h + 0.1, 0.08]} c="#f4f1ff" /><B s={[w, h, 0.1]} c="#15102b" />
    <B s={[w * k, h * 0.7, 0.12]} pos={[-w / 2 + (w * k) / 2, 0, 0.01]} c={color} e={color} ei={1.2} />
  </group>);
};

export const EXTRA = { rejas: Rejas, mazo: Mazo, progress: Progress };
