import React from 'react';
import { M, Label } from '../../src/kit/Props';
import { C, clamp, eo, pop } from '../../src/kit/math';

type P = { t: number; tt: number; p: any };
type V3 = [number, number, number];
const B: React.FC<{ s: V3; pos?: V3; rot?: V3; c: string; e?: string; ei?: number }> = ({ s, pos, rot, c, e, ei }) => (
  <mesh position={pos} rotation={rot}><boxGeometry args={s} /><M c={c} e={e} ei={ei} /></mesh>
);

/** Integral de una velocidad lineal a tramos. prof = [[t, v], ...] (ordenado por t). */
const integ = (prof: number[][], t: number) => {
  let a = 0; if (t <= prof[0][0]) return prof[0][1] * t; a = prof[0][1] * prof[0][0];
  for (let i = 0; i < prof.length - 1; i++) { const [t0, v0] = prof[i], [t1, v1] = prof[i + 1];
    if (t >= t1) a += ((v0 + v1) / 2) * (t1 - t0); else { const f = (t - t0) / (t1 - t0); const v = v0 + (v1 - v0) * f; return a + ((v0 + v) / 2) * (t - t0); } }
  const last = prof[prof.length - 1]; return a + last[1] * (t - last[0]);
};
const speedAt = (prof: number[][], t: number) => {
  if (t <= prof[0][0]) return prof[0][1];
  for (let i = 0; i < prof.length - 1; i++) { const [t0, v0] = prof[i], [t1, v1] = prof[i + 1]; if (t < t1) return v0 + ((v1 - v0) * (t - t0)) / (t1 - t0); }
  return prof[prof.length - 1][1];
};
const profOf = (p: any): number[][] => p.prof ?? [[0, p.speed ?? 2.4]];

/** Engranaje de frente a cámara (+z). Gira según p.prof / p.speed. */
export const Gear: React.FC<P> = ({ t, p }) => {
  const { r = 0.5, color = C.gold, teeth = 8, depth = 0.14, dir = 1 } = p; const a = integ(profOf(p), t) * dir + (p.phase ?? 0);
  return (
    <group rotation={[0, 0, -a]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[r, r, depth, 16]} /><M c={color} e={color} ei={0.45} /></mesh>
      {Array.from({ length: teeth }, (_, i) => { const g = (i / teeth) * Math.PI * 2;
        return <B key={i} s={[r * 0.34, r * 0.36, depth]} pos={[Math.cos(g) * r * 1.08, Math.sin(g) * r * 1.08, 0]} rot={[0, 0, g + Math.PI / 2]} c={color} e={color} ei={0.45} />; })}
      <mesh position={[0, 0, depth / 2 + 0.01]}><circleGeometry args={[r * 0.36, 12]} /><meshBasicMaterial color="#15102b" toneMapped={false} /></mesh>
      <B s={[r * 0.9, r * 0.12, 0.02]} pos={[0, 0, depth / 2 + 0.02]} c="#15102b" />
    </group>
  );
};

/** Fábrica mirando a +z: nave con techo en sierra, dos chimeneas con humo, engranaje y cinta con cajas.
 *  El humo, el engranaje y la cinta se mueven con la misma velocidad (p.prof). */
export const Factory: React.FC<P> = ({ t, tt, p }) => {
  const { color = '#2d1a6e', belt = true, sign } = p; const prof = profOf(p); const a = integ(prof, t); const v = speedAt(prof, t); const lit = clamp(v / 2.4, 0.15, 1);
  return (
    <group>
      <B s={[2.7, 1.3, 1.2]} pos={[0, 0.65, 0]} c={color} />
      <B s={[2.8, 0.1, 1.3]} pos={[0, 1.33, 0]} c="#15102b" />
      {[-0.9, 0, 0.9].map((x) => <group key={x} position={[x, 1.38, 0]}>
        <B s={[0.95, 0.07, 1.2]} pos={[0, 0.2, 0]} rot={[0, 0, 0.42]} c="#3b2f7a" />
        <B s={[0.07, 0.42, 1.2]} pos={[0.42, 0.2, 0]} c={C.cyan} e={C.cyan} ei={0.5 + lit} />
      </group>)}
      {[-1.0, -0.2, 0.6].map((x, i) => <B key={i} s={[0.42, 0.32, 0.03]} pos={[x - 0.02, 0.95, 0.61]} c="#fff3c4" e="#ffd36b" ei={0.3 + lit * 1.6} />)}
      <B s={[0.5, 0.62, 0.03]} pos={[-1.0, 0.31, 0.61]} c="#15102b" />
      {sign && <group position={[-0.2, 0.52, 0.63]}><Label t={t} tt={tt} p={{ text: sign, w: 0.95, h: 0.3, bg: '#15102b', color: C.gold, size: 0.62, weight: 900, depth: 0.01 }} /></group>}
      {[-0.95, -0.4].map((x, j) => <group key={x} position={[x, 0, -0.3]}>
        <mesh position={[0, 1.95 + j * 0.12, 0]}><cylinderGeometry args={[0.13, 0.17, 1.2 + j * 0.24, 8]} /><M c="#8d6bd8" /></mesh>
        <mesh position={[0, 2.5 + j * 0.24, 0]}><cylinderGeometry args={[0.15, 0.15, 0.1, 8]} /><M c={C.magenta} e={C.magenta} ei={0.8} /></mesh>
        {[0, 1, 2].map((i) => { const f = (((a * 0.16 + i / 3 + j * 0.17) % 1) + 1) % 1; const sc = (0.12 + f * 0.16) * clamp(0.35 + lit);
          return <mesh key={i} position={[f * 0.22, 2.62 + j * 0.24 + f * 0.62, 0]} scale={sc}><icosahedronGeometry args={[1, 0]} /><M c="#e9e2ff" o={0.85 * (1 - f * f)} /></mesh>; })}
      </group>)}
      <group position={[0.72, 0.72, 0.68]}><Gear t={t} tt={tt} p={{ r: 0.4, prof, color: C.gold }} /></group>
      <group position={[1.12, 0.36, 0.68]}><Gear t={t} tt={tt} p={{ r: 0.2, prof: prof.map(([x, s]) => [x, s * 2]), color: C.cyan, dir: -1, teeth: 6, phase: 0.3 }} /></group>
      {belt && <group position={[0, 0, 1.25]}>
        <B s={[3.3, 0.1, 0.5]} pos={[0, 0.3, 0]} c="#15102b" />
        <B s={[3.3, 0.04, 0.52]} pos={[0, 0.24, 0]} c={C.cyan} e={C.cyan} ei={0.9} />
        {[-1.4, -0.5, 0.5, 1.4].map((x) => <B key={x} s={[0.08, 0.26, 0.4]} pos={[x, 0.13, 0]} c="#3b2f7a" />)}
        {[0, 1, 2, 3].map((i) => { const u = (((a * 0.11 + i / 4) % 1) + 1) % 1; const x = -1.5 + u * 3.0; const sc = Math.min(1, u * 8, (1 - u) * 8);
          return <B key={i} s={[0.3 * sc, 0.3 * sc, 0.3 * sc]} pos={[x, 0.35 + 0.15 * sc, 0]} c={i % 2 ? C.gold : '#ff7a3d'} e={i % 2 ? C.gold : '#ff7a3d'} ei={0.35} />; })}
      </group>}
    </group>
  );
};

/** Gráfico de línea sobre panel. times[i] = segundo (desde que aparece) en que arranca el tramo i. */
export const Chart: React.FC<P> = ({ t, tt, p }) => {
  const { pts = [1, 2, 1], lo = 0, hi = 3, w = 3.0, h = 2.2, base, baseText, dur = 1.6, days, tags, delay = 0, panel = true, times, seg = 0.45 } = p;
  const n = pts.length; const px = 0.34, py = 0.34;
  const X = (i: number) => -w / 2 + px + (i * (w - 2 * px)) / (n - 1);
  const Y = (v: number) => -h / 2 + py + ((v - lo) / (hi - lo)) * (h - 2 * py);
  const kOf = (i: number) => (times ? eo((tt - times[i]) / seg) : clamp(eo((tt - delay) / dur) * (n - 1) - i));
  return (
    <group>
      {panel && <>
        <B s={[w, h, 0.08]} pos={[0, 0, -0.05]} c="#120a2c" />
        <B s={[w + 0.12, 0.06, 0.1]} pos={[0, h / 2 + 0.03, -0.05]} c={C.cyan} e={C.cyan} ei={1} />
        <B s={[w + 0.12, 0.06, 0.1]} pos={[0, -h / 2 - 0.03, -0.05]} c={C.cyan} e={C.cyan} ei={1} />
        <B s={[0.06, h, 0.1]} pos={[-w / 2 - 0.03, 0, -0.05]} c={C.cyan} e={C.cyan} ei={1} />
        <B s={[0.06, h, 0.1]} pos={[w / 2 + 0.03, 0, -0.05]} c={C.cyan} e={C.cyan} ei={1} />
        {[0.25, 0.5, 0.75].map((f) => <B key={f} s={[w - 0.1, 0.012, 0.01]} pos={[0, -h / 2 + f * h, 0]} c="#3b2f7a" />)}
      </>}
      {base !== undefined && <>
        {Array.from({ length: 12 }, (_, i) => <B key={i} s={[(w - 0.2) / 24, 0.04, 0.02]} pos={[-w / 2 + 0.1 + ((i + 0.25) * (w - 0.2)) / 12, Y(base), 0.02]} c={C.gold} e={C.gold} ei={1.5} />)}
        {baseText && <group position={[(p.baseLeft ? -1 : 1) * (w / 2 - 0.75), Y(base) + 0.2, 0.05]}><Label t={t} tt={tt} p={{ text: baseText, w: 1.3, h: 0.26, bg: C.gold, color: '#1a1030', size: 0.7, weight: 900, depth: 0.02 }} /></group>}
      </>}
      {pts.slice(0, -1).map((v: number, i: number) => { const f = kOf(i); if (f <= 0) return null;
        const x1 = X(i), y1 = Y(v), x2 = x1 + (X(i + 1) - x1) * f, y2 = y1 + (Y(pts[i + 1]) - y1) * f; const L = Math.hypot(x2 - x1, y2 - y1); const up = pts[i + 1] >= v; const col = up ? C.green : C.red;
        return <B key={i} s={[L, 0.1, 0.07]} pos={[(x1 + x2) / 2, (y1 + y2) / 2, 0.06]} rot={[0, 0, Math.atan2(y2 - y1, x2 - x1)]} c={col} e={col} ei={1.6} />; })}
      {pts.map((v: number, i: number) => { if (i > 0 && kOf(i - 1) < 0.98) return null; const lastP = i === n - 1; const col = i === 0 ? C.gold : pts[i] >= pts[i - 1] ? C.green : C.red;
        return (<group key={i}>
          <mesh position={[X(i), Y(v), 0.08]} scale={lastP ? 1 + Math.sin(t * 6) * 0.15 : 1}><sphereGeometry args={[lastP ? 0.13 : 0.1, 8, 6]} /><M c={col} e={col} ei={1.8} /></mesh>
          {tags && tags[i] && <group position={[X(i) + (tags[i].dx ?? 0), Y(v) + (tags[i].dy ?? 0.28), 0.1]}><Label t={t} tt={tt} p={{ text: tags[i].text, w: tags[i].w ?? 0.8, h: 0.3, bg: '#15102b', color: col, size: 0.72, weight: 900, depth: 0.01 }} /></group>}
        </group>); })}
      {days && days.map((d: string, i: number) => <group key={i} position={[X(i), -h / 2 + 0.14, 0.03]}><Label t={t} tt={tt} p={{ text: d, w: 0.6, h: 0.2, color: '#d6c8ff', size: 0.85, weight: 700 }} /></group>)}
    </group>
  );
};

/** Grilla vertical de fichas (sectores). mode 'base' = todas; si no, solo las de idx, que aparecen de a una. */
export const Tiles: React.FC<P> = ({ tt, p }) => {
  const { cols = 5, rows = 3, size = 0.5, gap = 0.1, idx, color = '#3b2f7a', stagger = 0.09 } = p; const st = size + gap;
  const list: number[] = idx ?? Array.from({ length: cols * rows }, (_, i) => i);
  return (
    <group>
      {list.map((i, j) => { const x = ((i % cols) - (cols - 1) / 2) * st, y = (rows - 1 - Math.floor(i / cols)) * st + size / 2; const k = idx ? pop(tt - j * stagger) : 1; if (k <= 0) return null;
        return <group key={i} position={[x, y, idx ? 0.06 : 0]} scale={k}><B s={[size, size, 0.12]} c={color} e={idx ? color : undefined} ei={0.7} />
          {!idx && <B s={[size * 0.5, size * 0.08, 0.13]} c="#5a4aa8" />}</group>; })}
    </group>
  );
};

/** Pila de cajones (producción). */
export const Crates: React.FC<P> = ({ tt, p }) => {
  const { n = 4, size = 0.4, color = C.gold, stagger = 0.08, cols = 2 } = p;
  return (
    <group>
      {Array.from({ length: n }, (_, i) => { const k = pop(tt - i * stagger + 0.33); if (k <= 0) return null; const x = ((i % cols) - (cols - 1) / 2) * (size + 0.03), y = Math.floor(i / cols) * (size + 0.02) + size / 2;
        return <group key={i} position={[x, y, 0]} scale={k}><B s={[size, size, size]} c={color} e={color} ei={0.3} /><B s={[size + 0.02, size * 0.12, size + 0.02]} c="#15102b" /></group>; })}
    </group>
  );
};

/** Billete genérico con signo $ */
export const Bill: React.FC<P> = ({ t, tt, p }) => {
  const { color = '#2e9e5b', w = 1.6 } = p; const h = w * 0.46;
  return (
    <group rotation={[0, Math.sin(t * 1.3) * 0.18, 0]}>
      <B s={[w, h, 0.05]} c={color} e={color} ei={0.35} />
      <B s={[w - 0.14, h - 0.14, 0.06]} c="#bff0cf" />
      <B s={[w - 0.22, h - 0.22, 0.07]} c={color} e={color} ei={0.35} />
      <mesh position={[0, 0, 0.04]}><circleGeometry args={[h * 0.3, 14]} /><meshBasicMaterial color="#bff0cf" toneMapped={false} /></mesh>
      <group position={[0, 0, 0.05]}><Label t={t} tt={tt} p={{ text: '$', w: h * 0.6, h: h * 0.6, size: 0.9, weight: 900, color: '#14532d' }} /></group>
    </group>
  );
};

/** Changuito de súper, mira hacia +x. p.n = productos adentro (aparecen de a uno). */
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

/** Góndola de súper de frente a +z. */
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

/** Atril con dos micrófonos, de frente a +z. */
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

/** Diario: hoja con cabezal, titular y renglones. */
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

export const EXTRA: Record<string, React.FC<P>> = { gear: Gear, factory: Factory, chart: Chart, tiles: Tiles, crates: Crates, bill: Bill, cart: Cart, shelf: Shelf, podium: Podium, paper: Paper };
