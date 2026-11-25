import React from 'react';
import { M, Label } from '../../src/kit/Props';
import { C, clamp, eo, lerp } from '../../src/kit/math';

type P = { t: number; tt: number; p: any };
type V3 = [number, number, number];
const B: React.FC<{ s: V3; pos?: V3; rot?: V3; c: string; e?: string; ei?: number; o?: number }> = ({ s, pos, rot, c, e, ei, o }) => (
  <mesh position={pos} rotation={rot}><boxGeometry args={s} /><M c={c} e={e} ei={ei} o={o} /></mesh>
);

/** Gráfico de acción: tablero oscuro + línea que se dibuja. pts normalizados 0..1 */
export const Chart: React.FC<P> = ({ tt, p }) => {
  const { pts = [[0, 0.3], [0.3, 0.5], [0.6, 0.4], [1, 0.8]], w = 2.4, h = 1.6, dur = 1.0, delay = 0, board = true } = p;
  const n = pts.length - 1; const k = eo((tt - delay) / dur) * n;
  const X = (x: number) => (x - 0.5) * (w - 0.3), Y = (y: number) => (y - 0.5) * (h - 0.3);
  let end: V3 = [X(pts[0][0]), Y(pts[0][1]), 0.08]; let lastUp = true;
  return (
    <group>
      {board && <B s={[w, h, 0.08]} c="#15102b" />}
      {board && [0.25, 0.5, 0.75].map((y) => <B key={y} s={[w - 0.2, 0.012, 0.01]} pos={[0, (y - 0.5) * (h - 0.3), 0.045]} c="#3b2f7a" />)}
      {board && <><B s={[w + 0.1, 0.06, 0.1]} pos={[0, h / 2, 0]} c={C.cyan} e={C.cyan} ei={1.5} /><B s={[w + 0.1, 0.06, 0.1]} pos={[0, -h / 2, 0]} c={C.cyan} e={C.cyan} ei={1.5} /></>}
      {Array.from({ length: n }, (_, i) => {
        const f = clamp(k - i); if (f <= 0) return null;
        const x0 = X(pts[i][0]), y0 = Y(pts[i][1]); const x1 = lerp(x0, X(pts[i + 1][0]), f), y1 = lerp(y0, Y(pts[i + 1][1]), f);
        const L = Math.hypot(x1 - x0, y1 - y0); const up = pts[i + 1][1] >= pts[i][1]; const col = up ? C.green : C.red; end = [x1, y1, 0.08]; lastUp = up;
        return <B key={i} s={[L + 0.05, 0.08, 0.05]} pos={[(x0 + x1) / 2, (y0 + y1) / 2, 0.07]} rot={[0, 0, Math.atan2(y1 - y0, x1 - x0)]} c={col} e={col} ei={1.6} />;
      })}
      <mesh position={end}><sphereGeometry args={[0.09, 8, 6]} /><M c="#fff" e={lastUp ? C.green : C.red} ei={2} /></mesh>
    </group>
  );
};

/** Barra de descarga */
export const Progress: React.FC<P> = ({ tt, p }) => {
  const { w = 2, h = 0.3, dur = 1.2, to = 1, color = C.green } = p; const k = Math.max(0.001, eo(tt / dur) * to);
  return (<group>
    <B s={[w + 0.1, h + 0.1, 0.08]} c="#f4f1ff" /><B s={[w, h, 0.1]} c="#15102b" />
    <B s={[w * k, h * 0.7, 0.12]} pos={[-w / 2 + (w * k) / 2, 0, 0.01]} c={color} e={color} ei={1.2} />
  </group>);
};

/** Nube con lluvia (frozen = la lluvia no se mueve) */
export const Cloud: React.FC<P> = ({ t, p }) => {
  const { frozen = true, color = '#d9d5f0' } = p;
  return (<group>
    {[[-0.45, 0, 0.42], [0, 0.18, 0.55], [0.5, 0, 0.4], [0.1, -0.08, 0.45]].map(([x, y, r], i) => (
      <mesh key={i} position={[x, y, 0]}><icosahedronGeometry args={[r, 0]} /><M c={color} /></mesh>))}
    {Array.from({ length: 9 }, (_, i) => { const x = -0.6 + (i % 5) * 0.3 + (i > 4 ? 0.15 : 0); const y0 = -0.55 - (i > 4 ? 0.45 : 0.15); const y = frozen ? y0 : y0 - ((t * 1.6 + i * 0.37) % 0.6);
      return <B key={i} s={[0.07, 0.26, 0.07]} pos={[x, y, 0.3]} rot={[0, 0, 0.2]} c={C.cyan} e={C.cyan} ei={1.5} />; })}
  </group>);
};

/** Bicho (error del juego) */
export const Bug: React.FC<P> = ({ t, p }) => {
  const { color = C.red, ph = 0 } = p; const w = Math.sin(t * 9 + ph) * 0.25;
  return (<group rotation={[0, 0, Math.sin(t * 2 + ph) * 0.2]}>
    <mesh scale={[1, 1.3, 0.6]}><icosahedronGeometry args={[0.3, 0]} /><M c={color} e={color} ei={0.6} /></mesh>
    <mesh position={[0, 0.42, 0]}><icosahedronGeometry args={[0.17, 0]} /><M c="#15102b" /></mesh>
    {[-1, 1].map((sd) => [-0.18, 0.02, 0.22].map((y, i) => (
      <B key={sd + '_' + i} s={[0.3, 0.05, 0.05]} pos={[sd * 0.4, y, 0]} rot={[0, 0, sd * (0.3 - i * 0.3) + w * sd]} c="#15102b" />)))}
    {[-1, 1].map((sd) => <B key={sd} s={[0.04, 0.2, 0.04]} pos={[sd * 0.09, 0.62, 0]} rot={[0, 0, -sd * 0.4]} c="#15102b" />)}
    {[-1, 1].map((sd) => <B key={'e' + sd} s={[0.06, 0.06, 0.03]} pos={[sd * 0.07, 0.44, 0.15]} c="#fff" e="#fff" ei={1} />)}
  </group>);
};

/** Caja de regalo */
export const Gift: React.FC<P> = ({ p }) => {
  const { color = C.magenta, ribbon = C.gold } = p;
  return (<group>
    <B s={[1, 0.8, 1]} pos={[0, 0.4, 0]} c={color} e={color} ei={0.25} />
    <B s={[1.08, 0.22, 1.08]} pos={[0, 0.88, 0]} c={color} e={color} ei={0.35} />
    <B s={[0.2, 1.01, 1.1]} pos={[0, 0.5, 0]} c={ribbon} e={ribbon} ei={0.5} />
    <B s={[1.1, 1.01, 0.2]} pos={[0, 0.5, 0]} c={ribbon} e={ribbon} ei={0.5} />
    {[-1, 1].map((sd) => <B key={sd} s={[0.34, 0.2, 0.2]} pos={[sd * 0.2, 1.12, 0]} rot={[0, 0, sd * 0.5]} c={ribbon} e={ribbon} ei={0.5} />)}
  </group>);
};

/** Lugar vacío: contorno punteado de una torre que no está */
export const Slot: React.FC<P> = ({ t, p }) => {
  const { h = 3, r = 0.45, color = C.cyan } = p; const n = Math.round(h / 0.3); const pu = 0.55 + Math.sin(t * 3) * 0.25;
  return (<group>
    {[[-1, -1], [1, -1], [1, 1], [-1, 1]].map(([x, z], i) => Array.from({ length: n }, (_, j) => (
      <B key={i + '_' + j} s={[0.05, 0.16, 0.05]} pos={[x * r, 0.12 + j * 0.3, z * r]} c={color} e={color} ei={1.4} />)))}
    {[0, 1, 2, 3].map((i) => [-0.5, 0, 0.5].map((d) => { const a = i % 2 === 0; const sg = i < 2 ? 1 : -1;
      return [0.02, h].map((y) => <B key={i + '_' + d + '_' + y} s={a ? [0.2, 0.05, 0.05] : [0.05, 0.05, 0.2]} pos={a ? [d * r * 1.3, y, sg * r] : [sg * r, y, d * r * 1.3]} c={color} e={color} ei={1.4} />); }))}
    <B s={[r * 2, h, r * 2]} pos={[0, h / 2, 0]} c={color} e={color} ei={0.4} o={0.07 + pu * 0.06} />
  </group>);
};

/** Disquete de guardado */
export const Disk: React.FC<P> = () => (<group>
  <B s={[0.9, 0.9, 0.08]} c={C.blue} e={C.blue} ei={0.3} />
  <B s={[0.5, 0.3, 0.1]} pos={[0.05, 0.3, 0]} c="#c9c4de" /><B s={[0.12, 0.22, 0.11]} pos={[0.15, 0.3, 0]} c="#15102b" />
  <B s={[0.66, 0.4, 0.1]} pos={[0, -0.2, 0]} c="#f4f1ff" />
</group>);

/** Gorra (accesorio) */
export const Cap: React.FC<P> = ({ p }) => { const { color = C.cyan } = p; return (<group>
  <mesh position={[0, 0.14, 0]}><cylinderGeometry args={[0.26, 0.32, 0.28, 8]} /><M c={color} e={color} ei={0.4} /></mesh>
  <B s={[0.5, 0.05, 0.34]} pos={[0, 0.03, 0.34]} c={color} e={color} ei={0.4} />
</group>); };

/** Garaje chico */
export const Garage: React.FC<P> = ({ t, tt }) => (<group>
  <B s={[1.5, 1.0, 1.1]} pos={[0, 0.5, 0]} c="#3a2a8a" /><B s={[1.6, 0.12, 1.2]} pos={[0, 1.06, 0]} c={C.cyan} e={C.cyan} ei={0.8} />
  <B s={[1.1, 0.72, 0.05]} pos={[0, 0.37, 0.56]} c="#15102b" />
  {[0.15, 0.33, 0.51].map((y) => <B key={y} s={[1.1, 0.03, 0.06]} pos={[0, y, 0.57]} c="#6b5aa8" />)}
  <group position={[0, 0.9, 0.57]}><Label t={t} tt={tt} p={{ text: 'GARAJE', w: 1.0, h: 0.24, size: 0.7, color: C.gold }} /></group>
</group>);

export const EXTRA = { chart: Chart, progress: Progress, cloud: Cloud, bug: Bug, gift: Gift, slot: Slot, disk: Disk, cap: Cap, garage: Garage };
