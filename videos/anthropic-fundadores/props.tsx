import React from 'react';
import { M, Label } from '../../src/kit/Props';
import { C, clamp, eo, lerp } from '../../src/kit/math';

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

/** Documento (prospecto / contrato) */
export const Paper: React.FC<P> = ({ t, tt, p }) => (
  <group>
    <Bx s={[1.2, 1.6, 0.05]} pos={[0.07, -0.06, -0.06]} c="#c9c4de" />
    <Bx s={[1.2, 1.6, 0.05]} c="#f4f1ff" />
    <group position={[0, 0.52, 0.03]}><Label t={t} tt={tt} p={{ text: p.title ?? 'PROSPECTO', w: 1.05, h: 0.3, bg: '#1a1030', color: '#fff', size: 0.6, weight: 900, depth: 0 }} /></group>
    {[0.2, 0.02, -0.16, -0.34, -0.52].map((y, i) => <Bx key={i} s={[i % 2 ? 0.75 : 0.98, 0.07, 0.01]} pos={[i % 2 ? -0.115 : 0, y, 0.03]} c="#8d8aa0" />)}
  </group>
);

/** Candado (bloqueo de venta). Origen en la base. */
export const Padlock: React.FC<P> = ({ t }) => (
  <group rotation={[0, Math.sin(t * 1.6) * 0.18, 0]}>
    <Bx s={[0.86, 0.66, 0.32]} pos={[0, 0.33, 0]} c={C.gold} e={C.gold} ei={0.45} />
    <Bx s={[0.9, 0.1, 0.34]} pos={[0, 0.62, 0]} c={C.gold2} />
    <Bx s={[0.12, 0.46, 0.12]} pos={[-0.25, 0.88, 0]} c="#c9c4de" />
    <Bx s={[0.12, 0.46, 0.12]} pos={[0.25, 0.88, 0]} c="#c9c4de" />
    <Bx s={[0.62, 0.12, 0.12]} pos={[0, 1.14, 0]} c="#c9c4de" />
    <mesh position={[0, 0.38, 0.17]}><sphereGeometry args={[0.09, 6, 5]} /><M c="#1a1030" /></mesh>
    <Bx s={[0.07, 0.2, 0.02]} pos={[0, 0.24, 0.17]} c="#1a1030" />
  </group>
);

/** Caja de regalo (donación). Origen en la base. */
export const Gift: React.FC<P> = ({ t, p }) => { const c = p.color ?? C.magenta; return (
  <group rotation={[0, 0.5 + Math.sin(t * 1.3) * 0.15, 0]}>
    <Bx s={[1.0, 0.8, 1.0]} pos={[0, 0.4, 0]} c={c} e={c} ei={0.25} />
    <Bx s={[1.1, 0.2, 1.1]} pos={[0, 0.9, 0]} c={c} e={c} ei={0.4} />
    <Bx s={[0.18, 1.02, 1.12]} pos={[0, 0.5, 0]} c={C.gold} e={C.gold} ei={0.5} />
    <Bx s={[1.12, 1.02, 0.18]} pos={[0, 0.5, 0]} c={C.gold} e={C.gold} ei={0.5} />
    <Bx s={[0.42, 0.16, 0.18]} pos={[-0.2, 1.12, 0]} rot={[0, 0, 0.6]} c={C.gold} e={C.gold} ei={0.5} />
    <Bx s={[0.42, 0.16, 0.18]} pos={[0.2, 1.12, 0]} rot={[0, 0, -0.6]} c={C.gold} e={C.gold} ei={0.5} />
  </group>); };

/** Corazón low-poly */
export const Heart: React.FC<P> = ({ t, p }) => { const c = p.color ?? C.red; const s = 1 + Math.sin(t * 5) * 0.06; return (
  <group scale={[s, s, s * 0.6]}>
    <mesh position={[-0.2, 0.14, 0]}><sphereGeometry args={[0.27, 7, 5]} /><M c={c} e={c} ei={0.8} /></mesh>
    <mesh position={[0.2, 0.14, 0]}><sphereGeometry args={[0.27, 7, 5]} /><M c={c} e={c} ei={0.8} /></mesh>
    <mesh position={[0, -0.22, 0]} rotation={[Math.PI, 0, 0]}><coneGeometry args={[0.45, 0.62, 6]} /><M c={c} e={c} ei={0.8} /></mesh>
  </group>); };

/** Pila de acciones (tarjetas apiladas que crecen). p: n, dur */
export const Cards: React.FC<P> = ({ tt, p }) => { const { n = 12, dur = 1.0 } = p; const vis = Math.max(1, Math.round(lerp(0, n, eo(tt / dur))));
  return (<group>{Array.from({ length: vis }, (_, i) => (
    <group key={i} position={[Math.sin(i * 2.4) * 0.03, 0.0375 + i * 0.075, 0]} rotation={[0, Math.sin(i * 1.9) * 0.1, 0]}>
      <Bx s={[1.2, 0.06, 0.8]} c={i % 2 ? '#f4f1ff' : '#d9d3ee'} />
      <Bx s={[0.34, 0.064, 0.82]} c={C.gold} e={C.gold} ei={0.4} />
    </group>))}</group>); };

export const EXTRA = { bell: Bell, chart: Chart, paper: Paper, padlock: Padlock, gift: Gift, heart: Heart, cards: Cards };
