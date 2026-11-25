import React from 'react';
import { M, Label } from '../../src/kit/Props';
import { C, eo } from '../../src/kit/math';

type P = { t: number; tt: number; p: any };
type V3 = [number, number, number];
const B: React.FC<{ s: V3; pos?: V3; rot?: V3; c: string; e?: string; ei?: number }> = ({ s, pos, rot, c, e, ei }) => (
  <mesh position={pos} rotation={rot}><boxGeometry args={s} /><M c={c} e={e} ei={ei} /></mesh>
);

/** Sillón de CEO, mira hacia +z. Asiento a y=0.56. */
export const Chair: React.FC<P> = ({ p }) => {
  const { color = '#3b2f7a', trim = C.gold, glow = false } = p;
  return (
    <group>
      <mesh position={[0, 0.04, 0]}><cylinderGeometry args={[0.42, 0.46, 0.08, 5]} /><M c="#15102b" /></mesh>
      <mesh position={[0, 0.27, 0]}><cylinderGeometry args={[0.06, 0.06, 0.42, 6]} /><M c="#8d8aa0" /></mesh>
      <B s={[0.78, 0.14, 0.74]} pos={[0, 0.5, 0]} c={color} e={glow ? color : undefined} ei={0.6} />
      <B s={[0.78, 1.15, 0.14]} pos={[0, 1.12, -0.34]} rot={[-0.08, 0, 0]} c={color} e={glow ? color : undefined} ei={0.6} />
      <B s={[0.82, 0.1, 0.16]} pos={[0, 1.72, -0.39]} c={trim} e={trim} ei={0.7} />
      {[-1, 1].map((s) => <group key={s}>
        <B s={[0.1, 0.08, 0.6]} pos={[0.42 * s, 0.82, -0.02]} c={trim} e={trim} ei={0.4} />
        <B s={[0.08, 0.28, 0.08]} pos={[0.42 * s, 0.66, 0.2]} c="#15102b" />
      </group>)}
    </group>
  );
};

/** Chip (GPU) acostado sobre el plano XZ. */
export const Chip: React.FC<P> = ({ t, p }) => {
  const { color = '#1f6b3f', core = C.green } = p; const pu = 0.9 + Math.sin(t * 4) * 0.5;
  return (
    <group>
      <B s={[1, 0.12, 1]} c={color} />
      <B s={[0.52, 0.16, 0.52]} c="#15102b" />
      <B s={[0.34, 0.18, 0.34]} c={core} e={core} ei={pu} />
      {Array.from({ length: 5 }, (_, i) => { const o = -0.4 + i * 0.2; return <group key={i}>
        <B s={[0.07, 0.06, 0.16]} pos={[o, 0, 0.56]} c={C.gold} e={C.gold} ei={0.5} /><B s={[0.07, 0.06, 0.16]} pos={[o, 0, -0.56]} c={C.gold} e={C.gold} ei={0.5} />
        <B s={[0.16, 0.06, 0.07]} pos={[0.56, 0, o]} c={C.gold} e={C.gold} ei={0.5} /><B s={[0.16, 0.06, 0.07]} pos={[-0.56, 0, o]} c={C.gold} e={C.gold} ei={0.5} /></group>; })}
    </group>
  );
};

/** Gráfico de línea sobre un panel. pts = alturas (0..h). Se dibuja en `dur` s. */
export const Chart: React.FC<P> = ({ tt, p }) => {
  const { pts = [1, 2], w = 2.6, h = 2.2, dur = 1.2, up = C.green, down = C.red, board = true, refY, thick = 0.09, start = 0 } = p as any;
  const n = pts.length - 1; const k = Math.max(0, Math.min(1, (tt - start) / dur)) * n; const X = (i: number) => -w / 2 + 0.18 + ((w - 0.36) * i) / n;
  const hx = X(Math.min(n, Math.floor(k))) + (k < n ? (X(1) - X(0)) * (k % 1) : 0);
  const hy = k >= n ? pts[n] : pts[Math.floor(k)] + (pts[Math.floor(k) + 1] - pts[Math.floor(k)]) * (k % 1);
  return (
    <group>
      {board && <B s={[w, h, 0.08]} pos={[0, h / 2, -0.06]} c="#1a1140" />}
      {board && [0.25, 0.5, 0.75].map((f) => <B key={f} s={[w - 0.2, 0.015, 0.02]} pos={[0, h * f, -0.01]} c="#3b2f7a" />)}
      {board && <B s={[w + 0.08, 0.06, 0.1]} pos={[0, 0, -0.06]} c={C.cyan} e={C.cyan} ei={1} />}
      {refY !== undefined && Array.from({ length: 9 }, (_, i) => <B key={i} s={[(w - 0.3) / 14, 0.035, 0.03]} pos={[-w / 2 + 0.25 + ((w - 0.5) * i) / 8, refY, 0]} c={C.gold} e={C.gold} ei={1} />)}
      {Array.from({ length: n }, (_, i) => {
        const f = Math.max(0, Math.min(1, k - i)); if (f <= 0) return null;
        const x0 = X(i), y0 = pts[i], x1 = x0 + (X(i + 1) - x0) * f, y1 = y0 + (pts[i + 1] - y0) * f; const len = Math.hypot(x1 - x0, y1 - y0); const col = pts[i + 1] >= pts[i] ? up : down;
        return <B key={i} s={[len + thick * 0.6, thick, 0.06]} pos={[(x0 + x1) / 2, (y0 + y1) / 2, 0.03]} rot={[0, 0, Math.atan2(y1 - y0, x1 - x0)]} c={col} e={col} ei={1.3} />;
      })}
      <mesh position={[hx, hy, 0.07]}><sphereGeometry args={[0.11, 8, 6]} /><meshBasicMaterial color="#fff" toneMapped={false} /></mesh>
    </group>
  );
};

/** Lupa. sweep = amplitud del barrido en x. */
export const Lupa: React.FC<P> = ({ t, p }) => {
  const { r = 0.5, color = C.gold, sweep = 0, sweepY = 0 } = p;
  return (
    <group position={[Math.sin(t * 1.7) * sweep, Math.cos(t * 1.3) * sweepY, 0]}>
      <mesh><torusGeometry args={[r, r * 0.16, 6, 18]} /><M c={color} e={color} ei={0.7} /></mesh>
      <mesh><circleGeometry args={[r, 18]} /><meshBasicMaterial color={C.cyan} transparent opacity={0.28} toneMapped={false} /></mesh>
      <B s={[r * 0.28, r * 1.3, r * 0.22]} pos={[r * 1.12, -r * 1.12, 0]} rot={[0, 0, Math.PI / 4]} c="#15102b" />
    </group>
  );
};

/** Hoja / expediente parado. title = encabezado. */
export const Doc: React.FC<P> = ({ t, tt, p }) => {
  const { title, color = C.blue, w = 1.0, h = 1.35, lines = 6 } = p;
  return (
    <group>
      <B s={[w, h, 0.05]} c="#f4f1ff" />
      <B s={[w, h * 0.2, 0.06]} pos={[0, h * 0.4, 0]} c={color} />
      {title && <group position={[0, h * 0.4, 0.035]}><Label t={t} tt={tt} p={{ text: title, w: w * 0.94, h: h * 0.17, size: 0.7, weight: 800 }} /></group>}
      {Array.from({ length: lines }, (_, i) => <B key={i} s={[w * (i % 3 === 2 ? 0.5 : 0.76), h * 0.035, 0.02]} pos={[i % 3 === 2 ? -w * 0.13 : 0, h * 0.2 - i * h * 0.105, 0.03]} c="#9a92c4" />)}
    </group>
  );
};

/** Sobre de mail. */
export const Mail: React.FC<P> = () => (
  <group>
    <B s={[0.62, 0.42, 0.05]} c="#f4f1ff" />
    <B s={[0.38, 0.035, 0.02]} pos={[-0.15, 0.08, 0.03]} rot={[0, 0, -0.62]} c={C.blue} />
    <B s={[0.38, 0.035, 0.02]} pos={[0.15, 0.08, 0.03]} rot={[0, 0, 0.62]} c={C.blue} />
  </group>
);

/** Escudo con tilde (sin riesgo). */
export const Shield: React.FC<P> = ({ p }) => {
  const { color = C.green } = p;
  return (
    <group>
      <B s={[1.0, 0.7, 0.1]} pos={[0, 0.3, 0]} c="#15102b" />
      <group scale={[1, 1, 0.1]}><mesh position={[0, -0.35, 0]} rotation={[Math.PI, Math.PI / 4, 0]}><coneGeometry args={[0.707, 0.6, 4]} /><M c="#15102b" /></mesh></group>
      <B s={[1.08, 0.08, 0.12]} pos={[0, 0.66, 0]} c={color} e={color} ei={1} />
      <B s={[0.26, 0.1, 0.06]} pos={[-0.17, 0.12, 0.08]} rot={[0, 0, -Math.PI / 4]} c={color} e={color} ei={1.4} />
      <B s={[0.56, 0.1, 0.06]} pos={[0.1, 0.24, 0.08]} rot={[0, 0, Math.PI / 4]} c={color} e={color} ei={1.4} />
    </group>
  );
};

export const EXTRA = { chair: Chair, chip: Chip, chart: Chart, lupa: Lupa, doc: Doc, mail: Mail, shield: Shield };
