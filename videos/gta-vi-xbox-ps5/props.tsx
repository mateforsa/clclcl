import React from 'react';
import { M, Label, Console } from '../../src/kit/Props';
import { C, clamp, eio, eo, lerp, pop } from '../../src/kit/math';

type P = { t: number; tt: number; p: any };
type V3 = [number, number, number];
const B: React.FC<{ s: V3; pos?: V3; rot?: V3; c: string; e?: string; ei?: number; o?: number }> = ({ s, pos, rot, c, e, ei, o }) => (
  <mesh position={pos} rotation={rot}><boxGeometry args={s} /><M c={c} e={e} ei={ei} o={o} /></mesh>
);

/** PS5 Pro genérica: la consola blanca con tres franjas negras */
export const Pro: React.FC<P> = (a) => (
  <group>
    <Console {...a} p={{ kind: 'a' }} />
    {[0.55, 0.75, 0.95].map((y) => [-0.2, 0.2].map((x) => <B key={y + '_' + x} s={[0.15, 0.05, 0.97]} pos={[x, y, 0]} c="#15102b" />))}
  </group>
);

/** Xbox Series S genérica: caja blanca chica con círculo negro */
export const SeriesS: React.FC<P> = () => (
  <group>
    <B s={[0.5, 1.0, 0.24]} pos={[0, 0.5, 0]} c="#f4f1ff" />
    <mesh position={[0, 0.66, 0.125]}><circleGeometry args={[0.17, 12]} /><meshBasicMaterial color="#15102b" toneMapped={false} /></mesh>
    <B s={[0.3, 0.03, 0.02]} pos={[0, 0.2, 0.125]} c={C.green} e={C.green} ei={2} />
  </group>
);

const Item: React.FC<P & { it: any; cs: number }> = ({ t, tt, it, cs }) => {
  if (!it) return null;
  if (it.kind === 'label') return (
    <group position={[0, 0.32, 0]}><Label t={t} tt={tt} p={{ text: it.text, w: it.w ?? 0.95, h: 0.5, bg: it.bg ?? C.blue, color: it.color ?? '#fff', size: 0.5, weight: 900, depth: 0.12 }} /></group>);
  const Cmp = it.kind === 'pro' ? Pro : it.kind === 's' ? SeriesS : Console;
  return <group scale={cs}><Cmp t={t} tt={tt} p={{ kind: it.kind }} /></group>;
};

/** Balanza de dos platos. keys = [[segundos, ángulo]...]; ángulo > 0 baja el plato izquierdo */
export const Balance: React.FC<P> = ({ t, tt, p }) => {
  const { keys = [[0, 0]], L = 1.15, H = 2.75, hang = 1.0, left, right, cs = 0.58, color = C.gold } = p;
  let a = keys[0][1];
  for (let i = 0; i < keys.length; i++) if (tt >= keys[i][0]) { const nx = keys[i + 1]; a = nx ? lerp(keys[i][1], nx[1], eio((tt - keys[i][0]) / (nx[0] - keys[i][0]))) : keys[i][1]; }
  a += Math.sin(t * 2.3) * 0.012;
  return (
    <group>
      <mesh position={[0, 0.08, 0]}><cylinderGeometry args={[0.55, 0.7, 0.16, 8]} /><M c="#2d1a6e" /></mesh>
      <B s={[0.14, H, 0.14]} pos={[0, H / 2, 0]} c="#3a2a8a" />
      <mesh position={[0, H, 0]}><icosahedronGeometry args={[0.16, 0]} /><M c={color} e={color} ei={0.8} /></mesh>
      <group position={[0, H, 0]} rotation={[0, 0, a]}><B s={[L * 2 + 0.1, 0.09, 0.12]} c={color} e={color} ei={0.7} /></group>
      {[-1, 1].map((sd) => { const x = sd * L * Math.cos(a), y = H + sd * L * Math.sin(a); const it = sd < 0 ? left : right;
        return (
          <group key={sd} position={[x, y, 0]}>
            {[-0.36, 0.36].map((dx) => <B key={dx} s={[0.025, hang, 0.025]} pos={[dx, -hang / 2, 0]} c="#c9c4de" />)}
            <mesh position={[0, -hang, 0]}><cylinderGeometry args={[0.52, 0.46, 0.07, 10]} /><M c={color} e={color} ei={0.5} /></mesh>
            <group position={[0, -hang + 0.04, 0]}><Item t={t} tt={tt} p={{}} it={it} cs={cs} /></group>
            {it?.name && <group position={[0, -hang - 0.26, 0.2]}><Label t={t} tt={tt} p={{ text: it.name, w: it.nw ?? 0.95, h: 0.28, bg: it.nbg ?? '#15102b', color: it.ncolor ?? '#fff', size: 0.64, weight: 900 }} /></group>}
          </group>);
      })}
    </group>
  );
};

/** Medidor de cuadros por segundo: tablero con la línea de 30 y una traza que cae. dips = [[x 0..1, profundidad 0..1]...] */
export const FpsGraph: React.FC<P> = ({ t, tt, p }) => {
  const { w = 2.8, h = 1.2, dips = [], dur = 1.6, delay = 0, title, tcolor = C.cyan, target = '30', loop = false } = p;
  const N = 56; const k = loop ? 1 : eo((tt - delay) / dur); const top = h * 0.24, span = h * 0.62;
  const f = (x: number) => { let d = 0; for (const [dx, dd] of dips) { const u = Math.abs(x - dx) / 0.035; if (u < 1) d = Math.max(d, dd * (1 - u * u)); } return d; };
  const X = (x: number) => (x - 0.5) * (w - 0.5) + 0.12, Y = (d: number) => top - d * span;
  const segs: React.ReactNode[] = [];
  for (let i = 0; i < N; i++) { const x0 = i / N, x1 = (i + 1) / N; if (x1 > k) break; const d0 = f(x0), d1 = f(x1); const bad = Math.max(d0, d1) > 0.04; const col = bad ? C.red : C.green;
    const ax = X(x0), ay = Y(d0), bx = X(x1), by = Y(d1); const len = Math.hypot(bx - ax, by - ay);
    segs.push(<B key={i} s={[len + 0.03, 0.06, 0.05]} pos={[(ax + bx) / 2, (ay + by) / 2, 0.07]} rot={[0, 0, Math.atan2(by - ay, bx - ax)]} c={col} e={col} ei={1.7} />); }
  const hx = Math.min(k, 1); const hd = f(hx);
  return (
    <group>
      <B s={[w, h, 0.08]} c="#15102b" />
      <B s={[w + 0.1, 0.05, 0.1]} pos={[0, h / 2, 0]} c={tcolor} e={tcolor} ei={1.4} /><B s={[w + 0.1, 0.05, 0.1]} pos={[0, -h / 2, 0]} c={tcolor} e={tcolor} ei={1.4} />
      {Array.from({ length: 14 }, (_, i) => <B key={i} s={[(w - 0.5) / 28, 0.014, 0.01]} pos={[X((i + 0.25) / 14), top, 0.046]} c="#8d7fd6" />)}
      <group position={[-w / 2 + 0.2, top, 0.05]}><Label t={t} tt={tt} p={{ text: target, w: 0.3, h: 0.2, color: '#c9c4de', size: 0.8, weight: 800 }} /></group>
      {segs}
      {k > 0 && <mesh position={[X(hx), Y(hd), 0.09]}><sphereGeometry args={[0.07, 8, 6]} /><M c="#fff" e={hd > 0.04 ? C.red : C.green} ei={2} /></mesh>}
      {title && <group position={[0, h / 2 + 0.2, 0.02]}><Label t={t} tt={tt} p={{ text: title, w: Math.min(w, 0.2 + title.length * 0.13), h: 0.3, bg: tcolor, color: p.ttext ?? '#1a1030', size: 0.66, weight: 900 }} /></group>}
    </group>
  );
};

/** Contador de cuadros por segundo: muestra `base` en verde y, en cada intervalo de drops [[desde, hasta, texto]...], el texto en rojo */
export const Counter: React.FC<P> = ({ t, tt, p }) => {
  const { base = '30', drops = [], w = 1.0, h = 0.5, unit = 'FPS' } = p;
  let txt = base, bad = false; for (const [a, b, s] of drops) if (tt >= a && tt < b) { txt = s; bad = true; }
  const col = bad ? C.red : C.green;
  return (
    <group position={[bad ? Math.sin(t * 40) * 0.02 : 0, 0, 0]}>
      <B s={[w + 0.1, h + 0.1, 0.06]} pos={[0, 0, -0.04]} c={col} e={col} ei={1.2} />
      <Label t={t} tt={tt} p={{ text: `${txt} ${unit}`, w, h, bg: '#15102b', color: col, size: 0.6, weight: 900, depth: 0 }} />
    </group>
  );
};

/** Procesador (chip) */
export const Chip: React.FC<P> = ({ t, tt, p }) => {
  const { hot = false, text = 'CPU' } = p; const col = hot ? C.red : C.cyan; const pu = hot ? 1.2 + Math.sin(t * 9) * 0.6 : 0.8;
  return (
    <group>
      <B s={[1.3, 1.3, 0.12]} c="#15102b" />
      <B s={[0.86, 0.86, 0.16]} c={col} e={col} ei={pu} />
      {[-1, 1].map((sd) => [-0.45, -0.15, 0.15, 0.45].map((d) => (
        <React.Fragment key={sd + '_' + d}>
          <B s={[0.2, 0.07, 0.06]} pos={[sd * 0.74, d, 0]} c={C.gold} e={C.gold} ei={0.6} />
          <B s={[0.07, 0.2, 0.06]} pos={[d, sd * 0.74, 0]} c={C.gold} e={C.gold} ei={0.6} />
        </React.Fragment>)))}
      <group position={[0, 0, 0.09]}><Label t={t} tt={tt} p={{ text, w: 0.8, h: 0.4, color: '#15102b', size: 0.8, weight: 900 }} /></group>
    </group>
  );
};

/** Avión low-poly (aeropuerto) */
export const Plane: React.FC<P> = () => (
  <group>
    <B s={[2.0, 0.34, 0.34]} c="#f4f1ff" />
    <B s={[0.3, 0.26, 0.3]} pos={[1.1, -0.02, 0]} c="#c9c4de" />
    <B s={[0.5, 0.06, 1.9]} pos={[0.05, -0.05, 0]} c={C.cyan} e={C.cyan} ei={0.4} />
    <B s={[0.3, 0.5, 0.06]} pos={[-0.85, 0.36, 0]} c={C.magenta} e={C.magenta} ei={0.5} />
    <B s={[0.26, 0.05, 0.7]} pos={[-0.85, 0.1, 0]} c={C.cyan} />
    {[-0.4, -0.1, 0.2, 0.5].map((x) => <B key={x} s={[0.12, 0.1, 0.36]} pos={[x, 0.06, 0]} c="#15102b" />)}
  </group>
);

/** Explosión: bolas que crecen y se apagan, en bucle */
export const Boom: React.FC<P> = ({ tt, p }) => {
  const { period = 1.1 } = p; const u = (tt % period) / period; const s = 0.2 + eo(u) * 1.0; const o = clamp(1.2 - u * 1.2);
  return (
    <group>
      <mesh scale={s}><icosahedronGeometry args={[0.7, 0]} /><M c="#ff7a3d" e="#ff7a3d" ei={2} o={o} /></mesh>
      <mesh scale={s * 0.6}><icosahedronGeometry args={[0.7, 0]} /><M c="#ffe14a" e="#ffe14a" ei={2.5} o={o} /></mesh>
      {[0, 1, 2, 3, 4, 5].map((i) => { const an = i * 1.05; return <B key={i} s={[0.1, 0.1, 0.1]} pos={[Math.cos(an) * s * 1.1, Math.sin(an) * s * 1.1, 0]} c={C.gold} e={C.gold} ei={2} o={o} />; })}
    </group>
  );
};

export const EXTRA = { balance: Balance, fpsgraph: FpsGraph, counter: Counter, chip: Chip, plane: Plane, boom: Boom, pro: Pro, xs: SeriesS };
void pop;
