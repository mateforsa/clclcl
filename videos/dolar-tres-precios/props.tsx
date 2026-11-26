import React from 'react';
import { M, Label } from '../../src/kit/Props';
import { C, clamp, eo, pop } from '../../src/kit/math';

type P = { t: number; tt: number; p: any };
type V3 = [number, number, number];
const B: React.FC<{ s: V3; pos?: V3; rot?: V3; c: string; e?: string; ei?: number }> = ({ s, pos, rot, c, e, ei }) => (
  <mesh position={pos} rotation={rot}><boxGeometry args={s} /><M c={c} e={e} ei={ei} /></mesh>
);

/** Billete genérico verde con texto (sin retratos ni logos). p: w, text, swing */
export const Bill: React.FC<P> = ({ t, tt, p }) => {
  const { color = '#2e9e5b', w = 1.6, text = 'US$', swing = 0.18 } = p; const h = w * 0.46;
  return (
    <group rotation={[0, Math.sin(t * 1.3) * swing, 0]}>
      <B s={[w, h, 0.05]} c={color} e={color} ei={0.45} />
      <B s={[w - 0.14, h - 0.14, 0.06]} c="#bff0cf" />
      <B s={[w - 0.22, h - 0.22, 0.07]} c={color} e={color} ei={0.45} />
      <B s={[h * 1.15, h * 0.62, 0.08]} c="#bff0cf" />
      <group position={[0, 0, 0.045]}><Label t={t} tt={tt} p={{ text, w: h * 1.1, h: h * 0.6, size: 0.8, weight: 900, color: '#14532d' }} /></group>
    </group>
  );
};

/** Banco genérico de frente a +z: escalinata, columnas, frontón y cartel. */
export const Bank: React.FC<P> = ({ t, tt, p }) => {
  const { sign = 'BANCO', color = '#e9e2ff' } = p;
  return (
    <group>
      <B s={[2.6, 0.14, 1.3]} pos={[0, 0.07, 0]} c="#8d8aa0" />
      <B s={[2.4, 0.14, 1.15]} pos={[0, 0.21, 0]} c="#b9b3cf" />
      <B s={[2.1, 1.5, 0.8]} pos={[0, 1.03, -0.12]} c="#2d1a6e" />
      <B s={[0.5, 0.9, 0.04]} pos={[0, 0.73, 0.3]} c="#15102b" />
      {[-0.9, -0.45, 0.45, 0.9].map((x) => <mesh key={x} position={[x, 1.03, 0.42]}><cylinderGeometry args={[0.11, 0.13, 1.5, 8]} /><M c={color} e={color} ei={0.25} /></mesh>)}
      <B s={[2.5, 0.2, 1.2]} pos={[0, 1.88, 0.05]} c={color} e={color} ei={0.25} />
      <B s={[2.0, 0.2, 1.1]} pos={[0, 2.08, 0.05]} c="#b9b3cf" />
      <B s={[1.3, 0.2, 1.0]} pos={[0, 2.28, 0.05]} c={C.cyan} e={C.cyan} ei={0.8} />
      <group position={[0, 1.88, 0.67]}><Label t={t} tt={tt} p={{ text: sign, w: 1.5, h: 0.2, color: '#1a1030', size: 0.8, weight: 900 }} /></group>
    </group>
  );
};

/** Brecha: dos columnas (barata y cara) y un corchete dorado que marca la diferencia. No está a escala.
 *  p: h1, h2, lo, hi (textos), loName, hiName, delay (cuándo aparece el corchete), text */
export const Gap: React.FC<P> = ({ t, tt, p }) => {
  const { h1 = 1.5, h2 = 2.5, lo = '1.630', hi = '1.770', loName = 'OFICIAL', hiName = 'CCL', delay = 1.2, text = 'BRECHA', showText = true } = p;
  const k = eo((tt - delay) / 0.6); const kk = pop(tt - delay - 0.4); const xb = 0.02;
  return (
    <group>
      <B s={[0.85, h1, 0.7]} pos={[-0.95, h1 / 2, 0]} c={C.cyan} e={C.cyan} ei={0.45} />
      <B s={[0.85, h2, 0.7]} pos={[0.95, h2 / 2, 0]} c={C.magenta} e={C.magenta} ei={0.45} />
      <group position={[-0.95, h1 + 0.24, 0]}><Label t={t} tt={tt} p={{ text: lo, w: 1.0, h: 0.36, bg: '#15102b', color: '#fff', size: 0.7, weight: 900 }} /></group>
      <group position={[0.95, h2 + 0.24, 0]}><Label t={t} tt={tt} p={{ text: hi, w: 1.0, h: 0.36, bg: '#15102b', color: '#fff', size: 0.7, weight: 900 }} /></group>
      <group position={[-0.95, 0.3, 0.37]}><Label t={t} tt={tt} p={{ text: loName, w: 0.82, h: 0.24, color: '#1a1030', size: 0.74, weight: 900, depth: 0 }} /></group>
      <group position={[0.95, 0.3, 0.37]}><Label t={t} tt={tt} p={{ text: hiName, w: 0.82, h: 0.24, color: '#fff', size: 0.74, weight: 900, depth: 0 }} /></group>
      {k > 0 && <>
        {Array.from({ length: 6 }, (_, i) => <B key={i} s={[0.12, 0.04, 0.04]} pos={[-0.45 + i * 0.19, h1, 0.36]} c={C.gold} e={C.gold} ei={1.6} />)}
        <B s={[0.07, (h2 - h1) * k, 0.07]} pos={[xb, h1 + ((h2 - h1) * k) / 2, 0.36]} c={C.gold} e={C.gold} ei={1.8} />
        <B s={[0.3, 0.06, 0.07]} pos={[xb, h1, 0.36]} c={C.gold} e={C.gold} ei={1.8} />
        <B s={[0.3, 0.06, 0.07]} pos={[xb, h1 + (h2 - h1) * k, 0.36]} c={C.gold} e={C.gold} ei={1.8} />
      </>}
      {showText && kk > 0 && <group position={[0.02, (h1 + h2) / 2, 0.5]} scale={kk}><Label t={t} tt={tt} p={{ text, w: 0.92, h: 0.34, bg: C.gold, color: '#1a1030', size: 0.7, weight: 900 }} /></group>}
    </group>
  );
};

export const Cart: React.FC<P> = ({ tt, p }) => {
  const { n = 4, color = C.cyan, stagger = 0.18 } = p; const cols = ['#ff7a3d', C.gold, C.magenta, '#3ee07a', '#f4f1ff', C.blue];
  return (
    <group>
      <B s={[1.0, 0.05, 0.6]} pos={[0, 0.42, 0]} c={color} e={color} ei={0.5} />
      {[-0.29, 0.29].map((z) => <group key={z}><B s={[1.0, 0.05, 0.04]} pos={[0, 0.95, z]} c={color} e={color} ei={0.5} />
        {[-0.48, -0.16, 0.16, 0.48].map((x) => <B key={x} s={[0.04, 0.5, 0.04]} pos={[x, 0.68, z]} c={color} e={color} ei={0.5} />)}</group>)}
      {[-0.48, 0.48].map((x) => <B key={x} s={[0.04, 0.05, 0.6]} pos={[x, 0.95, 0]} c={color} e={color} ei={0.5} />)}
      <B s={[0.05, 0.5, 0.05]} pos={[-0.62, 1.05, 0]} rot={[0, 0, 0.5]} c="#f4f1ff" />
      <B s={[0.07, 0.07, 0.66]} pos={[-0.74, 1.26, 0]} c={C.magenta} e={C.magenta} ei={0.8} />
      {[[-0.38, -0.25], [0.38, -0.25], [-0.38, 0.25], [0.38, 0.25]].map(([x, z], i) => <group key={i}><B s={[0.04, 0.26, 0.04]} pos={[x, 0.28, z]} c="#8d8aa0" />
        <mesh position={[x, 0.1, z]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.1, 0.1, 0.07, 8]} /><M c="#15102b" /></mesh></group>)}
      {Array.from({ length: n }, (_, i) => { const k = pop(tt - i * stagger + 0.33); if (k <= 0) return null; const x = -0.3 + (i % 3) * 0.3, z = i % 2 ? 0.13 : -0.13, hh = 0.34 + (i % 3) * 0.1;
        return <group key={i} position={[x, 0.45 + hh / 2 + Math.floor(i / 3) * 0.3, z]} scale={k}><B s={[0.24, hh, 0.22]} c={cols[i % cols.length]} e={cols[i % cols.length]} ei={0.25} /></group>; })}
    </group>
  );
};


export const Shelf: React.FC<P> = ({ p }) => {
  const { w = 1.5, rows = 3, seed = 0 } = p; const cols = ['#ff7a3d', C.gold, C.magenta, '#3ee07a', '#f4f1ff', C.blue, C.cyan]; const nx = Math.floor(w / 0.26);
  return (
    <group>
      <B s={[w, rows * 0.62 + 0.2, 0.08]} pos={[0, (rows * 0.62 + 0.2) / 2, -0.2]} c="#241659" />
      {Array.from({ length: rows }, (_, r) => <group key={r} position={[0, 0.16 + r * 0.62, 0]}>
        <B s={[w, 0.06, 0.44]} c="#f4f1ff" />
        <B s={[w, 0.1, 0.03]} pos={[0, -0.02, 0.23]} c={C.gold} e={C.gold} ei={0.5} />
        {Array.from({ length: nx }, (_, i) => { const c = cols[(i * 3 + r * 2 + seed) % cols.length]; const hh = 0.3 + ((i * 7 + r * 5 + seed) % 3) * 0.07;
          return <B key={i} s={[0.2, hh, 0.2]} pos={[-w / 2 + 0.16 + i * ((w - 0.32) / (nx - 1)), 0.03 + hh / 2, 0.02]} c={c} e={c} ei={0.2} />; })}
      </group>)}
    </group>
  );
};


export const Podium: React.FC<P> = ({ p }) => {
  const { color = '#3b2f7a' } = p;
  return (
    <group>
      <B s={[0.8, 1.0, 0.5]} pos={[0, 0.5, 0]} c={color} />
      <B s={[0.9, 0.08, 0.6]} pos={[0, 1.04, 0]} rot={[0.2, 0, 0]} c="#15102b" />
      <B s={[0.5, 0.5, 0.02]} pos={[0, 0.55, 0.26]} c={C.cyan} e={C.cyan} ei={0.5} />
      {[-0.16, 0.16].map((x) => <group key={x} position={[x, 1.1, 0.1]} rotation={[0.3, 0, -x]}>
        <mesh position={[0, 0.16, 0]}><cylinderGeometry args={[0.018, 0.018, 0.32, 6]} /><M c="#8d8aa0" /></mesh>
        <mesh position={[0, 0.35, 0]}><sphereGeometry args={[0.06, 8, 6]} /><M c="#15102b" /></mesh></group>)}
    </group>
  );
};


export const Paper: React.FC<P> = ({ t, tt, p }) => {
  const { text = 'RECESIÓN', w = 1.25, color = C.red, sub } = p; const h = w * 1.2;
  return (
    <group>
      <B s={[w, h, 0.04]} c="#f4f1ff" />
      <B s={[w - 0.12, h * 0.1, 0.05]} pos={[0, h * 0.4, 0]} c="#15102b" />
      <group position={[0, h * 0.19, 0.03]}><Label t={t} tt={tt} p={{ text, w: w - 0.12, h: h * 0.2, size: 0.82, weight: 900, color }} /></group>
      {sub && <group position={[0, h * 0.03, 0.03]}><Label t={t} tt={tt} p={{ text: sub, w: w - 0.12, h: h * 0.14, size: 0.8, weight: 900, color }} /></group>}
      {[0, 1, 2, 3].map((i) => <B key={i} s={[(w - 0.2) * (i === 3 ? 0.6 : 1), h * 0.035, 0.05]} pos={[i === 3 ? -(w - 0.2) * 0.2 : 0, -h * 0.12 - i * h * 0.085, 0]} c="#b9b3cf" />)}
    </group>
  );
};


export const EXTRA: Record<string, React.FC<P>> = { bill: Bill, bank: Bank, gap: Gap, cart: Cart, shelf: Shelf, podium: Podium, paper: Paper };
