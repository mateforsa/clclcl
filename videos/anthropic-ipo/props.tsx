import React from 'react';
import { M, Label } from '../../src/kit/Props';
import { C, clamp, eo } from '../../src/kit/math';

type P = { t: number; tt: number; p: any };
const Bx: React.FC<{ s: [number, number, number]; pos?: [number, number, number]; rot?: [number, number, number]; c: string; e?: string; ei?: number }> = ({ s, pos, rot, c, e, ei }) => (
  <mesh position={pos} rotation={rot}><boxGeometry args={s} /><M c={c} e={e} ei={ei} /></mesh>
);

/** Campana de la bolsa colgada de un pórtico. p.ring: se balancea desde que aparece. p.sign: cartel arriba. */
export const Bell: React.FC<P> = ({ t, tt, p }) => {
  const { ring = false, sign, frame = true } = p;
  const sw = ring ? Math.sin(tt * 11) * (0.13 + 0.25 * Math.exp(-tt * 0.7)) : Math.sin(t * 1.5) * 0.03;
  return (
    <group>
      {frame && <>
        <Bx s={[0.14, 2.9, 0.14]} pos={[-1.0, 1.45, 0]} c="#3b2f7a" />
        <Bx s={[0.14, 2.9, 0.14]} pos={[1.0, 1.45, 0]} c="#3b2f7a" />
        <Bx s={[2.3, 0.16, 0.2]} pos={[0, 2.9, 0]} c={C.cyan} e={C.cyan} ei={0.9} />
        <Bx s={[0.5, 0.06, 0.4]} pos={[-1.0, 0.03, 0]} c="#3b2f7a" /><Bx s={[0.5, 0.06, 0.4]} pos={[1.0, 0.03, 0]} c="#3b2f7a" />
      </>}
      {sign && <group position={[0, 0.5, 0.12]}><Label t={t} tt={tt} p={{ text: sign, w: 1.7, h: 0.4, bg: '#15102b', color: C.gold, size: 0.62 }} /></group>}
      <group position={[0, 2.82, 0]} rotation={[0, 0, sw]}>
        <Bx s={[0.1, 0.3, 0.1]} pos={[0, -0.15, 0]} c="#8d8aa0" />
        <mesh position={[0, -0.42, 0]}><sphereGeometry args={[0.36, 8, 5, 0, Math.PI * 2, 0, Math.PI / 2]} /><M c={C.gold} e={C.gold} ei={0.45} /></mesh>
        <mesh position={[0, -0.78, 0]}><cylinderGeometry args={[0.36, 0.66, 0.72, 8]} /><M c={C.gold} e={C.gold} ei={0.45} /></mesh>
        <mesh position={[0, -1.17, 0]}><cylinderGeometry args={[0.74, 0.76, 0.1, 8]} /><M c={C.gold2} e={C.gold} ei={0.35} /></mesh>
        <group position={[0, -0.5, 0]} rotation={[0, 0, -sw * 1.6]}>
          <mesh position={[0, -0.82, 0]}><sphereGeometry args={[0.15, 6, 5]} /><M c="#f4f1ff" e="#f4f1ff" ei={0.4} /></mesh>
        </group>
      </group>
      {ring && [0, 1, 2].map((i) => { const k = ((tt * 1.3 + i / 3) % 1); return (
        <mesh key={i} position={[0, 1.75, -0.2]} scale={0.8 + k * 1.3}><ringGeometry args={[0.98, 1.03, 24]} /><meshBasicMaterial color={C.gold} transparent opacity={(1 - k) * 0.7} toneMapped={false} /></mesh>); })}
    </group>
  );
};

/** Línea de precio en un panel. p: pts, lo, hi, w, h, base (línea punteada), baseText, dur, days[], tags[], last (color del último punto) */
export const Chart: React.FC<P> = ({ t, tt, p }) => {
  const { pts = [1, 2, 1], lo = 0, hi = 3, w = 3.0, h = 2.2, base, baseText, dur = 1.6, days, tags, delay = 0, panel = true } = p;
  const n = pts.length; const px = 0.3, py = 0.28;
  const X = (i: number) => -w / 2 + px + (i * (w - 2 * px)) / (n - 1);
  const Y = (v: number) => -h / 2 + py + ((v - lo) / (hi - lo)) * (h - 2 * py);
  const k = eo((tt - delay) / dur) * (n - 1);
  return (
    <group>
      {panel && <>
        <Bx s={[w, h, 0.08]} pos={[0, 0, -0.05]} c="#120a2c" />
        <Bx s={[w + 0.12, 0.06, 0.1]} pos={[0, h / 2 + 0.03, -0.05]} c={C.cyan} e={C.cyan} ei={1} />
        <Bx s={[w + 0.12, 0.06, 0.1]} pos={[0, -h / 2 - 0.03, -0.05]} c={C.cyan} e={C.cyan} ei={1} />
        <Bx s={[0.06, h, 0.1]} pos={[-w / 2 - 0.03, 0, -0.05]} c={C.cyan} e={C.cyan} ei={1} />
        <Bx s={[0.06, h, 0.1]} pos={[w / 2 + 0.03, 0, -0.05]} c={C.cyan} e={C.cyan} ei={1} />
        {[0.25, 0.5, 0.75].map((f) => <Bx key={f} s={[w - 0.1, 0.012, 0.01]} pos={[0, -h / 2 + f * h, 0]} c="#3b2f7a" />)}
      </>}
      {base !== undefined && <>
        {Array.from({ length: 12 }, (_, i) => <Bx key={i} s={[(w - 0.2) / 24, 0.04, 0.02]} pos={[-w / 2 + 0.1 + ((i + 0.25) * (w - 0.2)) / 12, Y(base), 0.02]} c={C.gold} e={C.gold} ei={1.5} />)}
        {baseText && <group position={[-w / 2 + 0.62, Y(base) - 0.2, 0.05]}><Label t={t} tt={tt} p={{ text: baseText, w: 1.0, h: 0.26, bg: C.gold, color: '#1a1030', size: 0.7, weight: 900, depth: 0.02 }} /></group>}
      </>}
      {pts.slice(0, -1).map((v: number, i: number) => { const f = clamp(k - i); if (f <= 0) return null;
        const x1 = X(i), y1 = Y(v), x2 = x1 + (X(i + 1) - x1) * f, y2 = y1 + (Y(pts[i + 1]) - y1) * f; const L = Math.hypot(x2 - x1, y2 - y1); const up = pts[i + 1] >= v; const col = up ? C.green : C.red;
        return <Bx key={i} s={[L, 0.09, 0.07]} pos={[(x1 + x2) / 2, (y1 + y2) / 2, 0.06]} rot={[0, 0, Math.atan2(y2 - y1, x2 - x1)]} c={col} e={col} ei={1.6} />; })}
      {pts.map((v: number, i: number) => { if (k < i - 0.02) return null; const lastP = i === n - 1; const col = i === 0 ? C.gold : pts[i] >= pts[i - 1] ? C.green : C.red;
        return (<group key={i}>
          <mesh position={[X(i), Y(v), 0.08]} scale={lastP ? 1 + Math.sin(t * 6) * 0.15 : 1}><sphereGeometry args={[lastP ? 0.13 : 0.09, 8, 6]} /><M c={col} e={col} ei={1.8} /></mesh>
          {tags && tags[i] && <group position={[X(i) + (tags[i].dx ?? 0), Y(v) + (tags[i].dy ?? 0.26), 0.1]}><Label t={t} tt={tt} p={{ text: tags[i].text ?? tags[i], w: tags[i].w ?? 0.7, h: 0.26, bg: '#15102b', color: col, size: 0.72, weight: 900, depth: 0.01 }} /></group>}
        </group>); })}
      {days && days.map((d: string, i: number) => <group key={i} position={[X(i), -h / 2 + 0.13, 0.03]}><Label t={t} tt={tt} p={{ text: d, w: 0.5, h: 0.18, color: '#b9a3e8', size: 0.8, weight: 700 }} /></group>)}
    </group>
  );
};

/** Cohete genérico (sin logos) */
export const Rocket: React.FC<P> = ({ t }) => (
  <group>
    <mesh position={[0, 1.3, 0]}><cylinderGeometry args={[0.32, 0.32, 1.8, 8]} /><M c="#f4f1ff" /></mesh>
    <mesh position={[0, 2.5, 0]}><coneGeometry args={[0.32, 0.6, 8]} /><M c="#f4f1ff" /></mesh>
    <mesh position={[0, 1.7, 0]}><cylinderGeometry args={[0.33, 0.33, 0.12, 8]} /><M c="#15102b" /></mesh>
    {[0, 1, 2, 3].map((i) => <group key={i} rotation={[0, (i * Math.PI) / 2, 0]}><Bx s={[0.06, 0.5, 0.4]} pos={[0, 0.6, 0.45]} c="#2b2740" /></group>)}
    <mesh position={[0, 0.28, 0]} rotation={[Math.PI, 0, 0]} scale={[1, 1 + Math.sin(t * 20) * 0.15, 1]}><coneGeometry args={[0.24, 0.5, 6]} /><M c="#ff7a3d" e="#ff7a3d" ei={2.5} /></mesh>
  </group>
);

/** Barril de petróleo */
export const Barrel: React.FC<P> = ({ p }) => (
  <group>
    <mesh position={[0, 0.5, 0]}><cylinderGeometry args={[0.36, 0.36, 1.0, 10]} /><M c={p.color ?? '#2b2740'} /></mesh>
    {[0.2, 0.5, 0.8].map((y) => <mesh key={y} position={[0, y, 0]}><cylinderGeometry args={[0.38, 0.38, 0.06, 10]} /><M c={C.gold} e={C.gold} ei={0.5} /></mesh>)}
  </group>
);

/** Documento (prospecto) */
export const Paper: React.FC<P> = ({ t, tt, p }) => (
  <group>
    <Bx s={[1.2, 1.6, 0.05]} pos={[0.07, -0.06, -0.06]} c="#c9c4de" />
    <Bx s={[1.2, 1.6, 0.05]} c="#f4f1ff" />
    <group position={[0, 0.52, 0.03]}><Label t={t} tt={tt} p={{ text: p.title ?? 'PROSPECTO', w: 1.05, h: 0.3, bg: '#1a1030', color: '#fff', size: 0.6, weight: 900, depth: 0 }} /></group>
    {[0.2, 0.02, -0.16, -0.34, -0.52].map((y, i) => <Bx key={i} s={[i % 2 ? 0.75 : 0.98, 0.07, 0.01]} pos={[i % 2 ? -0.115 : 0, y, 0.03]} c="#8d8aa0" />)}
  </group>
);

export const EXTRA = { bell: Bell, chart: Chart, rocket: Rocket, barrel: Barrel, paper: Paper };
