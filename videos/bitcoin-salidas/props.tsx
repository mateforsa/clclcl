import React from 'react';
import { M, Label } from '../../src/kit/Props';
import { C, clamp, eo } from '../../src/kit/math';

type P = { t: number; tt: number; p: any };
type V = [number, number, number];
const Bx: React.FC<{ s: V; pos?: V; rot?: V; c: string; e?: string; ei?: number }> = ({ s, pos, rot, c, e, ei }) => (
  <mesh position={pos} rotation={rot}><boxGeometry args={s} /><M c={c} e={e} ei={ei} /></mesh>
);

/** Disco de moneda mirando a cámara (sin logo). b: muestra una B lisa. */
const Disc: React.FC<{ r: number; col?: string; rim?: string; b?: boolean; t: number; ei?: number }> = ({ r, col = C.gold, rim = C.gold2, b, t, ei = 0.55 }) => (
  <group>
    <mesh rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[r, r, r * 0.2, 14]} /><M c={rim} e={rim} ei={ei * 0.7} /></mesh>
    <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, r * 0.03]}><cylinderGeometry args={[r * 0.84, r * 0.84, r * 0.2, 14]} /><M c={col} e={col} ei={ei} /></mesh>
    {b && <group position={[0, 0, r * 0.14]}><Label t={t} tt={0} p={{ text: 'B', w: r * 1.3, h: r * 1.3, color: '#5a3400', size: 0.86, weight: 900 }} /></group>}
  </group>
);

/** Moneda grande con una B lisa. p: r, swing */
export const BCoin: React.FC<P> = ({ t, p }) => {
  const { r = 0.6, swing = 0.45, color } = p;
  return <group rotation={[0, Math.sin(t * 1.6) * swing, 0]}><Disc r={r} b t={t} col={color} rim={color ? color : undefined} /></group>;
};

/** Caja fuerte / fondo. p: sign, flow ('out' | 'in' | undefined), n (monedas en vuelo), side (1 derecha, -1 izquierda),
 *  fill (0..1: muestra una ventana con el nivel de monedas), from (nivel inicial), rate */
export const Vault: React.FC<P> = ({ t, tt, p }) => {
  const { sign, flow, n = 7, side = 1, fill, from = 1, rate = 0.55, alarm = false, delay = 0 } = p;
  const trim = alarm ? C.red : C.cyan;
  const lv = fill === undefined ? 0 : from + (fill - from) * eo((tt - delay) / 1.1);
  return (
    <group>
      <Bx s={[1.9, 1.7, 1.1]} pos={[0, 0.95, 0]} c="#2d1a6e" />
      <Bx s={[2.02, 0.1, 1.2]} pos={[0, 1.85, 0]} c={trim} e={trim} ei={1} />
      <Bx s={[2.02, 0.1, 1.2]} pos={[0, 0.06, 0]} c={trim} e={trim} ei={1} />
      {[-0.7, 0.7].map((x) => <Bx key={x} s={[0.2, 0.1, 0.9]} pos={[x, 0.0, 0]} c="#15102b" />)}
      {fill === undefined ? (
        <group position={[0, 0.95, 0.56]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.56, 0.56, 0.08, 14]} /><M c="#3b2f7a" /></mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.03]}><cylinderGeometry args={[0.44, 0.44, 0.08, 14]} /><M c="#15102b" /></mesh>
          <group position={[0, 0, 0.1]} rotation={[0, 0, flow ? t * 1.6 : Math.sin(t) * 0.3]}>
            <Bx s={[0.62, 0.07, 0.05]} c={C.gold} e={C.gold} ei={0.8} /><Bx s={[0.07, 0.62, 0.05]} c={C.gold} e={C.gold} ei={0.8} />
          </group>
        </group>
      ) : (
        <group position={[0, 0.95, 0.56]}>
          <Bx s={[1.5, 1.3, 0.04]} c="#0c0720" />
          <Bx s={[1.38, Math.max(0.001, 1.18 * lv), 0.05]} pos={[0, -0.59 + (1.18 * lv) / 2, 0.02]} c={C.gold} e={C.gold} ei={0.7} />
          {[0.25, 0.5, 0.75].map((f) => <Bx key={f} s={[1.38, 0.015, 0.01]} pos={[0, -0.59 + 1.18 * f, 0.05]} c="#15102b" />)}
          <Bx s={[1.38, 0.04, 0.06]} pos={[0, -0.59 + 1.18 * from, 0.04]} c="#fff" e="#fff" ei={1.2} />
        </group>
      )}
      {sign && <group position={[0, 2.2, 0]}><Label t={t} tt={tt} p={{ text: sign, w: 1.9, h: 0.44, bg: '#15102b', color: C.gold, border: undefined, size: 0.62, weight: 900 }} /></group>}
      {flow && Array.from({ length: n }, (_, i) => {
        let k = (((tt - delay) * rate + i / n) % 1 + 1) % 1; if (tt - delay < 0) return null; if (flow === 'in') k = 1 - k;
        const x = side * (1.0 + k * 1.9), y = 1.0 + Math.sin(k * Math.PI) * 0.75 - k * 0.55, sc = Math.min(1, k * 6, (1 - k) * 5);
        return <group key={i} position={[x, y, 0.35 + Math.sin(i * 2.1) * 0.25]} rotation={[0, 0, k * 5 + i]} scale={Math.max(0.001, sc)}><Disc r={0.2} t={t} b /></group>;
      })}
    </group>
  );
};

/** Grilla de monedas: las primeras `on` quedan doradas y el resto se apaga en rojo. p: cols, rows, on, gap, r, delay */
export const CoinGrid: React.FC<P> = ({ t, tt, p }) => {
  const { cols = 8, rows = 5, on = 17, gap = 0.37, r = 0.15, delay = 0.6, stagger = 0.035 } = p;
  const N = cols * rows;
  return (
    <group>
      {Array.from({ length: N }, (_, i) => {
        const cx = i % cols, cy = Math.floor(i / cols); const off = i >= on && tt > delay + (i - on) * stagger;
        return <group key={i} position={[(cx - (cols - 1) / 2) * gap, ((rows - 1) / 2 - cy) * gap, off ? -0.12 : 0]} scale={off ? 0.82 : 1 + Math.sin(t * 3 + i) * 0.03}>
          <Disc r={r} t={t} col={off ? '#7a2233' : C.gold} rim={off ? '#4a1626' : C.gold2} ei={off ? 0.35 : 0.7} /></group>;
      })}
    </group>
  );
};

/** Línea de precio en un panel (copiado de anthropic-ipo). p: pts, lo, hi, w, h, base, baseText, dur, days[], tags[] */
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
        {baseText && <group position={[w / 2 - 0.72, Y(base) - 0.2, 0.05]}><Label t={t} tt={tt} p={{ text: baseText, w: 1.2, h: 0.26, bg: C.gold, color: '#1a1030', size: 0.7, weight: 900, depth: 0.02 }} /></group>}
      </>}
      {pts.slice(0, -1).map((v: number, i: number) => { const f = clamp(k - i); if (f <= 0) return null;
        const x1 = X(i), y1 = Y(v), x2 = x1 + (X(i + 1) - x1) * f, y2 = y1 + (Y(pts[i + 1]) - y1) * f; const L = Math.hypot(x2 - x1, y2 - y1); const up = pts[i + 1] >= v; const col = up ? C.green : C.red;
        return <Bx key={i} s={[L, 0.09, 0.07]} pos={[(x1 + x2) / 2, (y1 + y2) / 2, 0.06]} rot={[0, 0, Math.atan2(y2 - y1, x2 - x1)]} c={col} e={col} ei={1.6} />; })}
      {pts.map((v: number, i: number) => { if (k < i - 0.02) return null; const lastP = i === n - 1; const col = i === 0 ? C.gold : pts[i] >= pts[i - 1] ? C.green : C.red;
        return (<group key={i}>
          <mesh position={[X(i), Y(v), 0.08]} scale={lastP ? 1 + Math.sin(t * 6) * 0.15 : 1}><sphereGeometry args={[lastP ? 0.13 : 0.09, 8, 6]} /><M c={col} e={col} ei={1.8} /></mesh>
          {tags && tags[i] && <group position={[X(i) + (tags[i].dx ?? 0), Y(v) + (tags[i].dy ?? 0.26), 0.1]}><Label t={t} tt={tt} p={{ text: tags[i].text ?? tags[i], w: tags[i].w ?? 0.7, h: 0.26, bg: '#15102b', color: tags[i].color ?? col, size: 0.72, weight: 900, depth: 0.01 }} /></group>}
        </group>); })}
      {days && days.map((d: string, i: number) => d ? <group key={i} position={[X(i), -h / 2 + 0.13, 0.03]}><Label t={t} tt={tt} p={{ text: d, w: 0.6, h: 0.18, color: '#b9a3e8', size: 0.8, weight: 700 }} /></group> : null)}
    </group>
  );
};

export const EXTRA = { bcoin: BCoin, vault: Vault, coingrid: CoinGrid, chart: Chart };
