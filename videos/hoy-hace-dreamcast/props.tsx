import React from 'react';
import * as THREE from 'three';
import { M, useTex } from '../../src/kit/Props';
import { C, clamp, eo, lerp, pop } from '../../src/kit/math';

// Objetos genéricos: ninguna forma, color ni logo copiado de una marca real.
type P = { t: number; tt: number; p: any };
type V3 = [number, number, number];
const B: React.FC<{ s: V3; pos?: V3; rot?: V3; c: string; e?: string; ei?: number }> = ({ s, pos, rot, c, e, ei }) => (
  <mesh position={pos} rotation={rot}><boxGeometry args={s} /><M c={c} e={e} ei={ei} /></mesh>
);
const Cy: React.FC<{ r: number; r2?: number; h: number; n?: number; pos?: V3; rot?: V3; c: string; e?: string; ei?: number }> = ({ r, r2, h, n = 10, pos, rot, c, e, ei }) => (
  <mesh position={pos} rotation={rot}><cylinderGeometry args={[r2 ?? r, r, h, n]} /><M c={c} e={e} ei={ei} /></mesh>
);
const W = '#f4f1ff', W2 = '#d9d4ea', DK = '#15102b';

/** Consola genérica blanca con forma de caja, apoyada en y=0, frente hacia +z. p.led = color de la luz de encendido */
export const Dc: React.FC<P> = ({ t, p }) => {
  const { led = C.gold, glow = 1 } = p;
  return (<group>
    <B s={[1.3, 0.3, 1.3]} pos={[0, 0.15, 0]} c={W} />
    <B s={[1.18, 0.1, 1.18]} pos={[0, 0.35, -0.02]} c={W} />
    <Cy r={0.43} h={0.04} n={14} pos={[0, 0.41, -0.08]} c={W2} />
    <Cy r={0.07} h={0.05} n={8} pos={[-0.42, 0.41, 0.42]} c={W2} />
    <B s={[0.07, 0.04, 0.07]} pos={[-0.25, 0.4, 0.48]} c={led} e={led} ei={(1.6 + Math.sin(t * 4) * 0.5) * glow} />
    {[-0.45, -0.15, 0.15, 0.45].map((x) => <B key={x} s={[0.2, 0.1, 0.03]} pos={[x, 0.12, 0.655]} c={DK} />)}
    <B s={[1.32, 0.03, 1.32]} pos={[0, 0.015, 0]} c="#bdb6d6" />
  </group>);
};

/** Módem genérico (placa con luz que parpadea y entrada de teléfono) */
export const Modem: React.FC<P> = ({ t }) => (
  <group>
    <B s={[0.5, 0.26, 0.42]} pos={[0, 0.13, 0]} c="#3a3550" />
    <B s={[0.44, 0.03, 0.36]} pos={[0, 0.275, 0]} c="#1f7a4a" e="#1f7a4a" ei={0.4} />
    {[-0.12, 0, 0.12].map((x, i) => <B key={x} s={[0.08, 0.03, 0.06]} pos={[x, 0.3, -0.06 + (i % 2) * 0.1]} c="#15102b" />)}
    <B s={[0.12, 0.09, 0.02]} pos={[0.1, 0.12, 0.215]} c={DK} />
    <B s={[0.05, 0.05, 0.02]} pos={[-0.14, 0.15, 0.215]} c={C.green} e={C.green} ei={Math.sin(t * 9) > 0 ? 3 : 0.3} />
  </group>
);

/** Cable que se dibuja de p.a a p.b con una comba (crece en p.dur s) */
export const Cable: React.FC<P> = ({ tt, p }) => {
  const { a = [0, 0, 0], b = [1, 0, 0], sag = 0.3, color = '#e8e4f5', r = 0.025, dur = 0.6 } = p;
  const k = Math.max(0.02, eo(tt / dur));
  const pts = Array.from({ length: 21 }, (_, i) => { const u = (i / 20) * k; return new THREE.Vector3(lerp(a[0], b[0], u), lerp(a[1], b[1], u) - Math.sin(u * Math.PI) * sag, lerp(a[2], b[2], u)); });
  const curve = new THREE.CatmullRomCurve3(pts);
  return <mesh><tubeGeometry args={[curve, 40, r, 6, false]} /><M c={color} /></mesh>;
};

/** Ficha de teléfono en la pared */
export const Jack: React.FC<P> = () => (
  <group><B s={[0.34, 0.44, 0.06]} c={W} /><B s={[0.14, 0.12, 0.03]} pos={[0, -0.04, 0.035]} c={DK} /></group>
);

/** Joystick genérico blanco visto de frente (plano XY, frente hacia +z), con ventana para la tarjeta de memoria */
export const Pad: React.FC<P> = () => (
  <group>
    <B s={[1.0, 0.6, 0.2]} c={W} />
    {[-1, 1].map((sd) => <B key={sd} s={[0.3, 0.5, 0.2]} pos={[sd * 0.38, -0.42, 0]} rot={[0, 0, sd * 0.32]} c={W} />)}
    <B s={[0.3, 0.2, 0.03]} pos={[0, 0.1, 0.105]} c="#2a2445" />
    <Cy r={0.09} h={0.08} n={10} pos={[-0.32, 0.12, 0.13]} rot={[Math.PI / 2, 0, 0]} c="#8d8aa0" />
    <B s={[0.2, 0.06, 0.04]} pos={[-0.3, -0.14, 0.11]} c={DK} /><B s={[0.06, 0.2, 0.04]} pos={[-0.3, -0.14, 0.11]} c={DK} />
    {[[0.3, 0.02, C.gold], [0.3, -0.24, C.red], [0.18, -0.11, C.blue], [0.42, -0.11, C.green]].map(([x, y, c]: any) =>
      <Cy key={c} r={0.05} h={0.05} n={8} pos={[x, y, 0.115]} rot={[Math.PI / 2, 0, 0]} c={c} e={c} ei={0.3} />)}
    <B s={[0.34, 0.05, 0.12]} pos={[0, 0.31, 0]} c={DK} />
  </group>
);

/** Tarjeta de memoria genérica con pantallita LCD. p.game = minijuego animado en la pantalla */
export const Vmu: React.FC<P> = ({ t, tt, p }) => {
  const { game = false } = p;
  const fr = game ? Math.floor(tt * 6) % 4 : 0;
  const tx = useTex((g, w, h) => {
    g.fillStyle = '#a7b892'; g.fillRect(0, 0, w, h); g.fillStyle = '#1e2a16';
    const px = (x: number, y: number) => g.fillRect(x * 8, y * 8, 8, 8);
    if (!game) { [[3, 3], [4, 3], [5, 3], [9, 3], [10, 3], [11, 3], [3, 4], [11, 4], [5, 6], [9, 6], [6, 7], [7, 7], [8, 7]].forEach(([x, y]) => px(x + 1, y)); return; }
    for (let x = 0; x < 16; x++) px(x, 11);                                // piso
    const jy = [0, 2, 3, 2][fr]; const ox = 4;                                // muñequito que salta
    [[1, 0], [0, 1], [1, 1], [2, 1], [1, 2], [0, 3], [2, 3]].forEach(([x, y]) => px(ox + x, 7 - jy + y));
    const bx = 14 - ((fr * 3) % 12); [[0, 0], [0, 1], [1, 1]].forEach(([x, y]) => px(bx + x, 9 + y));   // obstáculo que avanza
  }, 128, 96, 'vmu' + game + fr);
  return (<group>
    <B s={[0.46, 0.7, 0.12]} c={W} />
    <B s={[0.38, 0.29, 0.02]} pos={[0, 0.16, 0.06]} c="#3a3550" />
    <mesh position={[0, 0.16, 0.072]}><planeGeometry args={[0.33, 0.24]} /><meshBasicMaterial map={tx} toneMapped={false} /></mesh>
    <B s={[0.15, 0.045, 0.04]} pos={[-0.1, -0.17, 0.07]} c={DK} /><B s={[0.045, 0.15, 0.04]} pos={[-0.1, -0.17, 0.07]} c={DK} />
    <Cy r={0.035} h={0.04} n={8} pos={[0.1, -0.13, 0.075]} rot={[Math.PI / 2, 0, 0]} c={C.magenta} />
    <Cy r={0.035} h={0.04} n={8} pos={[0.17, -0.2, 0.075]} rot={[Math.PI / 2, 0, 0]} c={C.cyan} />
  </group>);
};

/** Consola genérica negra parada (vertical), apoyada en y=0 */
export const Tower: React.FC<P> = ({ t, p }) => {
  const { color = '#1a1726', light = C.blue } = p;
  return (<group>
    <B s={[0.34, 1.4, 1.05]} pos={[0, 0.7, 0]} c={color} />
    {[0.25, 0.55, 0.85, 1.15].map((y) => <B key={y} s={[0.355, 0.03, 1.06]} pos={[0, y, 0]} c="#2c2840" />)}
    <B s={[0.04, 1.1, 0.03]} pos={[0.1, 0.72, 0.53]} c={light} e={light} ei={2 + Math.sin(t * 3) * 0.4} />
    <B s={[0.4, 0.06, 0.5]} pos={[0, 0.03, 0]} c="#2c2840" />
  </group>);
};

/** Cubo de consola genérico (otro fabricante), apoyado en y=0 */
export const Cube: React.FC<P> = ({ p }) => {
  const { color = '#5b3fc4', accent = '#c9c4de' } = p;
  return (<group>
    <B s={[0.75, 0.62, 0.75]} pos={[0, 0.31, 0]} c={color} />
    <B s={[0.5, 0.04, 0.5]} pos={[0, 0.64, 0]} c={accent} />
    <B s={[0.12, 0.08, 0.02]} pos={[0.22, 0.1, 0.38]} c={accent} />
  </group>);
};

/** Caja de juego genérica sin título (color + franja) */
export const Gbox: React.FC<P> = ({ t, p }) => {
  const { color = C.cyan } = p;
  return (<group rotation={[0, Math.sin(t * 1.4 + (p.ph ?? 0)) * 0.2, 0]}>
    <B s={[0.5, 0.7, 0.08]} c={color} e={color} ei={0.35} />
    <B s={[0.5, 0.12, 0.085]} pos={[0, 0.26, 0]} c={DK} />
    <B s={[0.3, 0.3, 0.085]} pos={[0, -0.06, 0]} c={W} />
  </group>);
};

/** Cinta de fábrica con consolas que avanzan y frenan en p.stopAt (s desde que aparece). Luz verde -> roja */
export const Belt: React.FC<P> = ({ t, tt, p }) => {
  const { stopAt = 99, n = 5, len = 3.6, v = 0.9 } = p;
  const run = Math.min(tt, stopAt) + clamp((tt - stopAt) / 0.5) * 0.2;   // frena suave
  const stopped = tt >= stopAt; const lamp = stopped ? C.red : C.green;
  const gap = len / n;
  return (<group>
    <B s={[len + 0.3, 0.14, 0.8]} pos={[0, 0.72, 0]} c="#2c2840" />
    <B s={[len + 0.3, 0.02, 0.7]} pos={[0, 0.8, 0]} c="#4a4468" />
    {[-1.5, -0.5, 0.5, 1.5].map((x) => <B key={x} s={[0.1, 0.7, 0.7]} pos={[x * len / 3.4, 0.33, 0]} c="#221a4a" />)}
    {Array.from({ length: n }, (_, i) => { let x = ((i * gap + run * v) % len) - len / 2; const edge = clamp(Math.min(x + len / 2, len / 2 - x) / 0.25);
      return <group key={i} position={[x, 0.81, 0]} scale={0.38 * edge}><Dc t={t} tt={tt} p={{ led: lamp, glow: stopped ? 0.2 : 1 }} /></group>; })}
    <B s={[0.08, 1.9, 0.08]} pos={[len / 2 + 0.05, 0.95, -0.3]} c="#4a4468" />
    <mesh position={[len / 2 + 0.05, 1.98, -0.3]}><sphereGeometry args={[0.2, 10, 8]} /><M c={lamp} e={lamp} ei={stopped ? 1.5 + Math.sin(t * 10) * 1.2 : 1.6} /></mesh>
  </group>);
};

/** Atril con micrófonos y flashes de prensa */
export const Podium: React.FC<P> = ({ t }) => (
  <group>
    <B s={[0.8, 1.05, 0.5]} pos={[0, 0.52, 0]} c="#2d1a6e" />
    <B s={[0.9, 0.06, 0.6]} pos={[0, 1.07, 0.02]} rot={[0.15, 0, 0]} c="#3a2a8a" />
    <B s={[0.6, 0.12, 0.02]} pos={[0, 0.72, 0.255]} c={C.gold} e={C.gold} ei={0.6} />
    {[-0.2, 0, 0.2].map((x, i) => <group key={x} position={[x, 1.1, 0.12]} rotation={[0.5, 0, x * -1.2]}>
      <Cy r={0.015} h={0.4} n={6} pos={[0, 0.2, 0]} c="#8d8aa0" />
      <mesh position={[0, 0.42, 0]}><sphereGeometry args={[0.055, 8, 6]} /><M c={[C.red, DK, C.blue][i]} /></mesh>
    </group>)}
    {[[-1.3, 1.3, 0.8], [1.3, 1.6, 0.6], [-1.1, 1.8, 0.4], [1.2, 1.0, 1.0]].map(([x, y, z], i) => { const f = Math.max(0, Math.sin(t * 7 + i * 2.1)) ** 8;
      return <mesh key={i} position={[x, y, z]} scale={0.05 + f * 0.16}><sphereGeometry args={[1, 8, 6]} /><meshBasicMaterial color="#ffffff" transparent opacity={f} toneMapped={false} /></mesh>; })}
  </group>
);

/** Consola vieja genérica para la línea de tiempo: v 0..2 */
export const Retro: React.FC<P> = ({ p }) => {
  const v = p.v ?? 0;
  if (v === 0) return (<group><B s={[0.9, 0.26, 0.7]} pos={[0, 0.13, 0]} c="#d8d2c4" /><B s={[0.9, 0.08, 0.7]} pos={[0, 0.3, -0.05]} rot={[-0.2, 0, 0]} c="#b33a3a" /><B s={[0.3, 0.05, 0.04]} pos={[0.2, 0.14, 0.36]} c={DK} /></group>);
  if (v === 1) return (<group><B s={[1.0, 0.18, 0.75]} pos={[0, 0.09, 0]} c="#1d1b25" /><B s={[0.7, 0.05, 0.4]} pos={[0, 0.2, -0.05]} c="#3a3550" /><B s={[0.9, 0.02, 0.02]} pos={[0, 0.12, 0.38]} c={C.red} e={C.red} ei={1} /></group>);
  return (<group><Cy r={0.42} r2={0.36} h={0.24} n={8} pos={[0, 0.12, 0]} c="#2a2838" /><Cy r={0.2} h={0.04} n={8} pos={[0, 0.26, 0]} c="#5a5670" /><B s={[0.14, 0.04, 0.03]} pos={[0, 0.12, 0.4]} c={C.blue} e={C.blue} ei={1.5} /></group>);
};

/** Sillón simple */
export const Sofa: React.FC<P> = ({ p }) => {
  const { color = '#c2307e' } = p;
  return (<group>
    <B s={[1.8, 0.4, 0.8]} pos={[0, 0.2, 0]} c={color} />
    <B s={[1.8, 0.7, 0.22]} pos={[0, 0.6, -0.32]} c={color} />
    {[-1, 1].map((s) => <B key={s} s={[0.2, 0.55, 0.8]} pos={[s * 0.9, 0.4, 0]} c="#9c2266" />)}
  </group>);
};

/** Puntos que dibujan un arco de p.a a p.b (viaje) */
export const Trip: React.FC<P> = ({ tt, p }) => {
  const { a = [-1, 1, 0], b = [1, 1, 0], lift = 0.6, n = 14, dur = 1.0, color = C.gold } = p;
  return (<group>{Array.from({ length: n }, (_, i) => { const u = i / (n - 1); const k = pop(tt - u * dur); if (k <= 0) return null;
    return <mesh key={i} position={[lerp(a[0], b[0], u), lerp(a[1], b[1], u) + Math.sin(u * Math.PI) * lift, lerp(a[2], b[2], u)]} scale={k * 0.05}>
      <sphereGeometry args={[1, 6, 4]} /><M c={color} e={color} ei={1.5} /></mesh>; })}</group>);
};

export const EXTRA = { dc: Dc, modem: Modem, cable: Cable, jack: Jack, pad: Pad, vmu: Vmu, tower: Tower, cube: Cube, gbox: Gbox, belt: Belt,
  podium: Podium, retro: Retro, sofa: Sofa, trip: Trip };
