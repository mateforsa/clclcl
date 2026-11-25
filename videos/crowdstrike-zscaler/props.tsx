import React from 'react';
import { M, Label, useTex } from '../../src/kit/Props';
import { C, eo, pop } from '../../src/kit/math';

type P = { t: number; tt: number; p: any };
type V3 = [number, number, number];
const B: React.FC<{ s: V3; pos?: V3; rot?: V3; c: string; e?: string; ei?: number }> = ({ s, pos, rot, c, e, ei }) => (
  <mesh position={pos} rotation={rot}><boxGeometry args={s} /><M c={c} e={e} ei={ei} /></mesh>
);

const drawOk = (g: CanvasRenderingContext2D, W: number, H: number) => {
  g.fillStyle = '#0b1a2e'; g.fillRect(0, 0, W, H);
  g.fillStyle = '#143a5c'; g.fillRect(0, H - 34, W, 34);
  [[30, 30, 150, 96, '#27e0d8'], [200, 30, 150, 96, '#3ee07a'], [30, 146, 320, 20, '#5a7ea8'], [30, 180, 240, 20, '#5a7ea8']].forEach(([x, y, w, h, c]: any) => { g.fillStyle = c; g.fillRect(x, y, w, h); });
};
const drawBsod = (g: CanvasRenderingContext2D, W: number, H: number) => {
  g.fillStyle = '#1463e6'; g.fillRect(0, 0, W, H);
  g.fillStyle = '#fff'; g.textAlign = 'left'; g.textBaseline = 'middle'; g.font = `700 ${H * 0.42}px Poppins`; g.fillText(':(', W * 0.1, H * 0.34);
  g.fillRect(W * 0.1, H * 0.62, W * 0.7, H * 0.045); g.fillRect(W * 0.1, H * 0.72, W * 0.55, H * 0.045); g.fillRect(W * 0.1, H * 0.82, W * 0.3, H * 0.045);
};

/** Monitor con pie. p.state: 'ok' | 'bsod' (pantalla azul de error). */
export const Monitor: React.FC<P> = ({ p }) => {
  const { state = 'ok', w = 1.5, h = 1.0, stand = true } = p;
  const ok = useTex(drawOk, 384, 256, 'mon-ok'); const bs = useTex(drawBsod, 384, 256, 'mon-bsod');
  const blue = state === 'bsod';
  return (
    <group>
      <B s={[w + 0.14, h + 0.14, 0.1]} c="#15102b" />
      <mesh position={[0, 0, 0.056]}><planeGeometry args={[w, h]} /><meshBasicMaterial map={blue ? bs : ok} toneMapped={false} /></mesh>
      {blue && <B s={[w + 0.3, h + 0.3, 0.02]} pos={[0, 0, -0.07]} c="#1463e6" e="#1463e6" ei={1.6} />}
      {stand && <><B s={[0.14, 0.3, 0.1]} pos={[0, -h / 2 - 0.2, 0]} c="#15102b" /><B s={[0.7, 0.06, 0.36]} pos={[0, -h / 2 - 0.36, 0]} c="#15102b" /></>}
    </group>
  );
};

/** Pared de monitores. p.blue: cuántos se ponen en azul (de a uno, según tt). p.all: todos azules de entrada. */
export const Wall: React.FC<P> = ({ tt, p }) => {
  const { cols = 3, rows = 3, gx = 1.0, gy = 0.78, blue = 0, stagger = 0.12, all = false, seed = 3 } = p;
  const ok = useTex(drawOk, 384, 256, 'mon-ok'); const bs = useTex(drawBsod, 384, 256, 'mon-bsod');
  const n = cols * rows;
  return (
    <group>
      {Array.from({ length: n }, (_, i) => {
        const order = (i * 7 + seed) % n; const isBlue = all || (order < blue && tt >= order * stagger);
        const x = ((i % cols) - (cols - 1) / 2) * gx, y = (Math.floor(i / cols) - (rows - 1) / 2) * gy;
        return (
          <group key={i} position={[x, y, 0]}>
            <B s={[0.9, 0.66, 0.08]} c="#15102b" />
            <mesh position={[0, 0, 0.045]}><planeGeometry args={[0.8, 0.56]} /><meshBasicMaterial map={isBlue ? bs : ok} toneMapped={false} /></mesh>
          </group>
        );
      })}
    </group>
  );
};

/** Contrato: hoja con renglones, firma que se dibuja (p.sign = segundos desde que aparece) y sello. */
export const Contract: React.FC<P> = ({ t, tt, p }) => {
  const { title = 'CONTRATO', sign = 0.4, seal = true, sub } = p;
  const k = eo((tt - sign) / 0.7); const segs = 9; const vis = Math.round(segs * k);
  return (
    <group>
      <B s={[1.7, 2.3, 0.06]} c="#f4f1ff" />
      <B s={[1.7, 0.4, 0.07]} pos={[0, 0.95, 0]} c="#2d1a6e" />
      <group position={[0, 0.95, 0.04]}><Label t={t} tt={tt} p={{ text: title, w: 1.6, h: 0.34, size: 0.66, color: '#fff' }} /></group>
      {sub && <group position={[0, 0.5, 0.035]}><Label t={t} tt={tt} p={{ text: sub, w: 1.5, h: 0.3, size: 0.74, color: '#1a1030', weight: 900 }} /></group>}
      {[0.5, 0.28, 0.06, -0.16].slice(sub ? 1 : 0).map((y, i) => <B key={i} s={[i % 2 ? 1.1 : 1.35, 0.07, 0.02]} pos={[i % 2 ? -0.125 : 0, y, 0.035]} c="#b9b3d6" />)}
      <B s={[1.0, 0.03, 0.02]} pos={[-0.2, -0.78, 0.035]} c="#1a1030" />
      {Array.from({ length: vis }, (_, i) => (
        <B key={i} s={[0.17, 0.05, 0.02]} pos={[-0.62 + i * 0.105, -0.62 + (i % 2 ? 0.05 : -0.03), 0.04]} rot={[0, 0, i % 2 ? -0.9 : 0.9]} c="#1463e6" e="#1463e6" ei={0.6} />
      ))}
      {seal && tt > sign + 0.75 && (
        <mesh position={[0.58, -0.7, 0.05]} rotation={[Math.PI / 2, 0, 0]} scale={pop(tt - sign - 0.75)}><cylinderGeometry args={[0.2, 0.2, 0.05, 10]} /><M c={C.gold} e={C.gold} ei={0.8} /></mesh>
      )}
    </group>
  );
};

/** Avión low-poly visto de costado. */
export const Plane: React.FC<P> = ({ p }) => {
  const { color = '#f4f1ff', accent = C.cyan } = p;
  return (
    <group>
      <mesh rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.2, 0.2, 1.9, 8]} /><M c={color} /></mesh>
      <mesh position={[1.12, 0, 0]} rotation={[0, 0, -Math.PI / 2]}><coneGeometry args={[0.2, 0.36, 8]} /><M c={color} /></mesh>
      <B s={[0.5, 0.06, 2.0]} pos={[0.05, -0.05, 0]} c={accent} />
      <B s={[0.3, 0.05, 0.8]} pos={[-0.85, 0.05, 0]} c={accent} />
      <B s={[0.34, 0.46, 0.06]} pos={[-0.85, 0.28, 0]} rot={[0, 0, 0.35]} c={accent} />
      {[-0.4, -0.1, 0.2, 0.5].map((x) => <B key={x} s={[0.12, 0.08, 0.41]} pos={[x, 0.07, 0]} c="#15102b" />)}
    </group>
  );
};

/** Escudo (protección). */
export const Shield: React.FC<P> = ({ p }) => {
  const { color = C.cyan, dark = '#15102b', mark = true } = p;
  return (
    <group>
      <B s={[1.0, 0.7, 0.14]} pos={[0, 0.25, 0]} c={color} e={color} ei={0.5} />
      <mesh position={[0, -0.36, 0]} rotation={[Math.PI, Math.PI / 4, 0]} scale={[1, 1, 0.2]}><coneGeometry args={[0.705, 0.55, 4]} /><M c={color} e={color} ei={0.5} /></mesh>
      {mark && <><B s={[0.26, 0.11, 0.16]} pos={[-0.17, 0.05, 0.02]} rot={[0, 0, -Math.PI / 4]} c="#fff" /><B s={[0.55, 0.11, 0.16]} pos={[0.1, 0.16, 0.02]} rot={[0, 0, Math.PI / 4]} c="#fff" /></>}
    </group>
  );
};

/** Nube low-poly. */
export const Cloud: React.FC<P> = ({ p }) => {
  const { color = '#f4f1ff', glow } = p;
  return (
    <group>
      {[[0, 0, 0, 0.5], [-0.5, -0.08, 0, 0.36], [0.5, -0.06, 0, 0.4], [0.2, 0.22, 0, 0.34]].map(([x, y, z, r], i) => (
        <mesh key={i} position={[x, y, z]}><icosahedronGeometry args={[r, 0]} /><M c={color} e={glow ? color : undefined} ei={0.35} /></mesh>))}
    </group>
  );
};

/** Gráfico de línea que se dibuja. p.pts: [[x,y],...], p.dur. Color por tramo: sube verde / baja rojo salvo p.color. */
export const Chart: React.FC<P> = ({ tt, p }) => {
  const { pts = [[0, 0], [1, 1]], dur = 1.2, color, th = 0.09, axes = true, w = 3, h = 2 } = p;
  const n = pts.length - 1; const k = eo(tt / dur) * n;
  return (
    <group>
      {axes && <><B s={[w, 0.04, 0.04]} pos={[w / 2 - 0.1, 0, 0]} c="#6b5fb0" /><B s={[0.04, h, 0.04]} pos={[-0.1, h / 2, 0]} c="#6b5fb0" /></>}
      {pts.slice(0, -1).map((a: number[], i: number) => {
        const f = Math.min(1, Math.max(0, k - i)); if (f <= 0) return null;
        const b = pts[i + 1]; const dx = (b[0] - a[0]) * f, dy = (b[1] - a[1]) * f; const len = Math.hypot(dx, dy); const col = color ?? (b[1] >= a[1] ? C.green : C.red);
        return (
          <group key={i}>
            <B s={[len, th, th]} pos={[a[0] + dx / 2, a[1] + dy / 2, 0]} rot={[0, 0, Math.atan2(dy, dx)]} c={col} e={col} ei={1.3} />
            <mesh position={[a[0] + dx, a[1] + dy, 0]}><icosahedronGeometry args={[th * 0.95, 0]} /><M c={col} e={col} ei={1.3} /></mesh>
          </group>
        );
      })}
    </group>
  );
};

/** Línea punteada horizontal que avanza (tráfico). p.len, p.color, p.blocked. */
export const Dots: React.FC<P> = ({ t, p }) => {
  const { len = 2, color = C.cyan, n = 6, speed = 0.6 } = p;
  return (
    <group>
      {Array.from({ length: n }, (_, i) => { const x = (((i / n + t * speed / len) % 1) + 1) % 1 * len - len / 2;
        return <B key={i} s={[0.16, 0.1, 0.1]} pos={[x, 0, 0]} c={color} e={color} ei={1.6} />; })}
    </group>
  );
};

export const EXTRA = { monitor: Monitor, wall: Wall, contract: Contract, plane: Plane, shield: Shield, cloud: Cloud, chart: Chart, dots: Dots };
