import React, { useMemo } from 'react';
import { M, Label, useTex } from '../../src/kit/Props';
import { C, clamp, eio, eo, lerp, pop, rnd } from '../../src/kit/math';

type P = { t: number; tt: number; p: any };
type V3 = [number, number, number];
const PI = Math.PI;
// Colores genéricos, sin escudos, sin números, sin logos: verde liso / rojo y blanco a rayas.
export const RED = '#d81f33', WHITE = '#f4f1ff', GREEN = '#1f9d55', GRAY = '#8d8aa0';
const B: React.FC<{ s: V3; pos?: V3; rot?: V3; c: string; e?: string; ei?: number }> = ({ s, pos, rot, c, e, ei }) => (
  <mesh position={pos} rotation={rot}><boxGeometry args={s} /><M c={c} e={e} ei={ei} /></mesh>
);

/** Texto plano sobre un panel: el texto va 2 cm delante de la cara del panel. Origen en el centro del panel. */
export const Panel: React.FC<P> = ({ t, tt, p }) => {
  const { text = '', w = 1.4, h = 0.4, color = '#fff', bg = '#15102b', size = 0.6, weight = 800, border } = p;
  return (<group>
    <B s={[w, h, 0.05]} pos={[0, 0, -0.025]} c={bg} e={border} ei={border ? 0.25 : 0} />
    <group position={[0, 0, 0.02]}><Label t={t} tt={tt} p={{ text, w: w * 0.96, h: h * 0.9, size, color, weight, depth: 0 }} /></group>
  </group>);
};

/** Jugador genérico. kit: pal (verde liso) | est (rojo y blanco a rayas) | gris (rival genérico). pose: idle | cheer | sad | walk */
export const Player: React.FC<P> = ({ t, p }) => {
  const { kit = 'est', pose = 'idle', phase = 0, skin = '#e3ad80', hair = '#15102b' } = p;
  const shirt = kit === 'pal' ? GREEN : kit === 'gris' ? GRAY : RED; const shorts = kit === 'gris' ? '#2a2350' : WHITE; const socks = kit === 'gris' ? '#2a2350' : shirt;
  const w = Math.sin((t + phase) * 11), sway = Math.sin((t + phase) * 2.2);
  let aL: V3 = [0, 0, -0.1 - sway * 0.03], aR: V3 = [0, 0, 0.1 + sway * 0.03];
  if (pose === 'cheer') { aL = [0, 0, -2.6 - w * 0.12]; aR = [0, 0, 2.6 + w * 0.12]; }
  if (pose === 'sad') { aL = [0.1, 0, -0.05]; aR = [0.1, 0, 0.05]; }
  const y0 = pose === 'cheer' ? Math.abs(Math.sin((t + phase) * 7)) * 0.1 : sway * 0.012;
  const arm = (x: number, r: V3) => (
    <group position={[x, 0.58, 0]} rotation={r}><B s={[0.14, 0.26, 0.15]} pos={[0, -0.1, 0]} c={shirt} /><B s={[0.11, 0.3, 0.12]} pos={[0, -0.36, 0]} c={skin} /><B s={[0.12, 0.12, 0.13]} pos={[0, -0.54, 0]} c={skin} /></group>);
  return (
    <group position={[0, y0, 0]}>
      {[-1, 1].map((sd) => (
        <group key={sd} position={[0.12 * sd, 0.7, 0]}>
          <B s={[0.2, 0.26, 0.22]} pos={[0, -0.1, 0]} c={shorts} /><B s={[0.14, 0.2, 0.15]} pos={[0, -0.32, 0]} c={skin} />
          <B s={[0.15, 0.22, 0.16]} pos={[0, -0.52, 0]} c={socks} /><B s={[0.18, 0.09, 0.27]} pos={[0, -0.68, 0.04]} c="#0d0a1c" />
        </group>))}
      <group position={[0, 0.7, 0]} rotation={[pose === 'sad' ? 0.25 : 0, 0, sway * 0.015]}>
        <B s={[0.52, 0.62, 0.29]} pos={[0, 0.32, 0]} c={shirt} e={shirt} ei={0.15} />
        {kit === 'est' && [-0.15, 0, 0.15].map((x) => <B key={x} s={[0.07, 0.62, 0.3]} pos={[x, 0.32, 0]} c={WHITE} e={WHITE} ei={0.1} />)}
        {arm(-0.33, aL)}{arm(0.33, aR)}
        <group position={[0, 0.84, 0]} rotation={[pose === 'sad' ? 0.3 : 0, sway * 0.05, 0]}>
          <B s={[0.37, 0.36, 0.34]} c={skin} /><B s={[0.43, 0.17, 0.4]} pos={[0, 0.2, -0.01]} c={hair} /><B s={[0.43, 0.2, 0.12]} pos={[0, 0.06, -0.16]} c={hair} />
        </group>
      </group>
    </group>
  );
};

/** Plantel chico: grilla de jugadores a escala sc, aparecen de a uno desde `delay`. Origen: centro de la base. */
const Squad: React.FC<{ t: number; tt: number; n: number; cols: number; gap: number; sc: number; kit: string; delay: number; pose?: string }> = ({ t, tt, n, cols, gap, sc, kit, delay, pose = 'idle' }) => {
  const rows = Math.ceil(n / cols);
  return (<group>{Array.from({ length: n }, (_, i) => { const k = pop(tt - delay - i * 0.05); if (k <= 0) return null;
    const c = i % cols, r = Math.floor(i / cols);
    return <group key={i} position={[(c - (cols - 1) / 2) * gap, 0, (r - (rows - 1) / 2) * gap]} scale={k * sc}><Player t={t} tt={tt} p={{ kit, pose, phase: i * 0.7 }} /></group>; })}</group>);
};

/** Balanza de platillos (Roberval: platillos siempre horizontales). Izquierda: dos jugadores de verde. Derecha: plantel rojo y blanco.
 *  p: tilt0 (inclinación al inicio, 0..1), tiltAt (tt en que baja la izquierda), crowdAt (tt en que aparece el plantel; -1 = desde el inicio) */
export const Balanza: React.FC<P> = ({ t, tt, p }) => {
  const { tilt0 = 0, tiltAt = 99, crowdAt = -1, max = 0.16, cheer = false } = p;
  const a = max * lerp(tilt0, 1, eio((tt - tiltAt) / 0.7));
  const PX = 1.0, PIV = 1.25, POST = 0.18; const metal = '#c9b98a';
  // a > 0: el lado izquierdo baja
  const yL = PIV - PX * Math.sin(a), yR = PIV + PX * Math.sin(a); const xL = -PX * Math.cos(a), xR = PX * Math.cos(a);
  const pan = (x: number, y: number) => (<group>
    <B s={[0.06, POST, 0.06]} pos={[x, y + POST / 2, 0]} c={metal} />
    <mesh position={[x, y + POST + 0.03, 0]}><cylinderGeometry args={[0.55, 0.5, 0.06, 18]} /><M c={metal} e={C.gold} ei={0.15} /></mesh>
  </group>);
  const top = (y: number) => y + POST + 0.06;
  return (
    <group>
      <B s={[0.9, 0.08, 0.55]} pos={[0, 0.04, 0]} c="#2d1a6e" />
      <B s={[0.12, PIV - 0.08, 0.12]} pos={[0, 0.08 + (PIV - 0.08) / 2, 0]} c={metal} />
      <group position={[0, PIV, 0]} rotation={[0, 0, a]}><B s={[2 * PX + 0.08, 0.07, 0.08]} c={metal} /></group>
      <mesh position={[0, PIV, 0.07]} rotation={[PI / 2, 0, 0]}><cylinderGeometry args={[0.08, 0.08, 0.04, 12]} /><M c={C.gold} e={C.gold} ei={0.4} /></mesh>
      {pan(xL, yL)}{pan(xR, yR)}
      {[-1, 1].map((s) => <group key={s} position={[xL + s * 0.22, top(yL), 0]} scale={0.5}><Player t={t} tt={tt} p={{ kit: 'pal', pose: cheer ? 'cheer' : 'idle', phase: s }} /></group>)}
      <group position={[xR, top(yR), 0]}><Squad t={t} tt={tt} n={9} cols={3} gap={0.27} sc={0.26} kit="est" delay={crowdAt < 0 ? -9 : crowdAt} /></group>
    </group>
  );
};

/** Columna que crece desde `from` (fracción) hasta h, con gente arriba. p: h, from, grow (tt), dur, color, w, top: 'pal2' | 'est' | '', stripes */
export const Col: React.FC<P> = ({ t, tt, p }) => {
  const { h = 2, from = 0.3, grow = 0, dur = 0.8, color = GREEN, w = 0.9, top = '', stripes = false, crowdAt = 0 } = p;
  const hh = Math.max(0.01, h * lerp(from, 1, eo((tt - grow) / dur)));
  return (<group>
    <B s={[w, hh, w]} pos={[0, hh / 2, 0]} c={color} e={color} ei={0.35} />
    {stripes && [-0.3, 0, 0.3].map((x) => <B key={x} s={[0.1, hh, w + 0.01]} pos={[x * w, hh / 2, 0]} c={WHITE} e={WHITE} ei={0.15} />)}
    {top === 'pal2' && [-1, 1].map((s) => <group key={s} position={[s * 0.19, hh, 0]} scale={0.4}><Player t={t} tt={tt} p={{ kit: 'pal', phase: s }} /></group>)}
    {top === 'est' && <group position={[0, hh, 0]}><Squad t={t} tt={tt} n={6} cols={3} gap={0.26} sc={0.24} kit="est" delay={crowdAt} /></group>}
  </group>);
};

/** Pila de monedas que crece. p: n, from, grow, dur, r */
export const Pile: React.FC<P> = ({ tt, p }) => {
  const { n = 12, from = 0, grow = 0, dur = 1.0, r = 0.3 } = p;
  const vis = Math.round(lerp(from, n, eo((tt - grow) / dur)));
  return (<group>{Array.from({ length: vis }, (_, i) => (
    <mesh key={i} position={[Math.sin(i * 2.4) * 0.015, 0.04 + i * 0.085, Math.cos(i * 1.7) * 0.015]} rotation={[0, i * 0.5, 0]}>
      <cylinderGeometry args={[r, r, 0.07, 12]} /><M c={i % 2 ? C.gold : C.gold2} e={C.gold} ei={0.35} /></mesh>))}</group>);
};

/** Fajos de billetes verdes genéricos (sin diseño de ningún billete), 2 por capa. p: n, grow, dur */
export const Fajos: React.FC<P> = ({ tt, p }) => {
  const { n = 10, grow = 0, dur = 0.9, from = 0 } = p; const vis = Math.round(lerp(from, n, eo((tt - grow) / dur)));
  return (<group>{Array.from({ length: vis }, (_, i) => { const l = Math.floor(i / 2), j = i % 2;
    return <group key={i} position={[(l % 2) * 0.02 - 0.01, 0.05 + l * 0.105, j === 0 ? -0.1 : 0.1]}><B s={[0.42, 0.1, 0.19]} c="#3aa860" e="#3aa860" ei={0.25} /><B s={[0.08, 0.104, 0.195]} c="#bfe8c4" /></group>; })}</group>);
};

/** Estadio genérico sin torre: tribunas en anillo y cancha. */
export const Stadium: React.FC<P> = ({ t }) => {
  const rx = 1.35, rz = 1.0, n = 22;
  return (
    <group>
      <B s={[rx * 1.45, 0.05, rz * 1.35]} pos={[0, 0.03, 0]} c="#178a4a" e="#178a4a" ei={0.3} />
      <B s={[0.03, 0.02, rz * 1.35]} pos={[0, 0.065, 0]} c="#eafff2" e="#eafff2" ei={0.8} />
      <mesh position={[0, 0.065, 0]} rotation={[-PI / 2, 0, 0]}><ringGeometry args={[0.22, 0.25, 20]} /><meshBasicMaterial color="#eafff2" toneMapped={false} /></mesh>
      {[0, 1, 2].map((j) => Array.from({ length: n }, (_, i) => { const a = (i / n) * PI * 2; const sc = 1 + j * 0.17; const h = 0.3 + j * 0.27;
        const x = Math.cos(a) * rx * sc, z = Math.sin(a) * rz * sc; const tx = -Math.sin(a) * rx, tz = Math.cos(a) * rz; const len = ((2 * PI) / n) * Math.hypot(tx, tz) * sc * 1.08;
        const col = (i + j) % 2 ? '#3a2590' : '#2d1a6e'; const crowd = [RED, WHITE, GREEN, WHITE, RED, GREEN][(i * 5 + j * 3) % 6];
        return <group key={j + '-' + i} position={[x, 0, z]} rotation={[0, -Math.atan2(tz, tx), 0]}>
          <B s={[len, h, 0.2]} pos={[0, h / 2, 0]} c={col} />
          <B s={[len * 0.8, 0.06, 0.14]} pos={[0, h + 0.03 + Math.max(0, Math.sin(t * 5 + i + j)) * 0.02, 0]} c={crowd} e={crowd} ei={0.5} />
          {j === 2 && <B s={[len, 0.04, 0.22]} pos={[0, h + 0.1, 0]} c={C.cyan} e={C.cyan} ei={1.3} />}
        </group>; }))}
    </group>
  );
};

/** Reloj de agujas. p: h, m */
export const Clock: React.FC<P> = ({ tt, p }) => {
  const { h = 5, m = 0 } = p; const k = eo(tt / 0.7); const am = -(m / 60) * PI * 2 - (1 - k) * PI * 2; const ah = -((h + m / 60) / 12) * PI * 2 * k;
  return (
    <group>
      <mesh rotation={[PI / 2, 0, 0]}><cylinderGeometry args={[0.72, 0.72, 0.1, 24]} /><M c={C.cyan} e={C.cyan} ei={0.9} /></mesh>
      <mesh position={[0, 0, 0.03]} rotation={[PI / 2, 0, 0]}><cylinderGeometry args={[0.62, 0.62, 0.1, 24]} /><M c="#f4f1ff" e="#f4f1ff" ei={0.25} /></mesh>
      {Array.from({ length: 12 }, (_, i) => <group key={i} rotation={[0, 0, (i * PI) / 6]}><B s={[0.04, i % 3 ? 0.07 : 0.14, 0.02]} pos={[0, 0.52, 0.09]} c="#15102b" /></group>)}
      <group rotation={[0, 0, ah]}><B s={[0.08, 0.36, 0.03]} pos={[0, 0.16, 0.1]} c="#15102b" /></group>
      <group rotation={[0, 0, am]}><B s={[0.05, 0.52, 0.03]} pos={[0, 0.24, 0.115]} c={RED} e={RED} ei={0.6} /></group>
      <mesh position={[0, 0, 0.12]} rotation={[PI / 2, 0, 0]}><cylinderGeometry args={[0.06, 0.06, 0.04, 10]} /><M c="#15102b" /></mesh>
    </group>
  );
};

/** Copa genérica dorada (~0.9 de alto) */
export const Cup: React.FC<P> = ({ t, p }) => { const g = p.color ?? C.gold; const pu = 0.6 + Math.sin(t * 4) * 0.25;
  return (
    <group>
      <mesh position={[0, 0.06, 0]}><cylinderGeometry args={[0.2, 0.24, 0.12, 8]} /><M c="#2d1a6e" /></mesh>
      <mesh position={[0, 0.27, 0]}><cylinderGeometry args={[0.06, 0.12, 0.3, 6]} /><M c={g} e={g} ei={pu} /></mesh>
      <mesh position={[0, 0.6, 0]}><cylinderGeometry args={[0.27, 0.1, 0.4, 8]} /><M c={g} e={g} ei={pu} /></mesh>
      <mesh position={[0, 0.83, 0]}><cylinderGeometry args={[0.29, 0.27, 0.07, 8]} /><M c="#ffe08a" e={g} ei={pu} /></mesh>
      {[-1, 1].map((s) => <group key={s}><B s={[0.16, 0.05, 0.06]} pos={[0.3 * s, 0.74, 0]} c={g} e={g} ei={pu} /><B s={[0.05, 0.26, 0.06]} pos={[0.37 * s, 0.62, 0]} c={g} e={g} ei={pu} /><B s={[0.14, 0.05, 0.06]} pos={[0.29 * s, 0.5, 0]} c={g} e={g} ei={pu} /></group>)}
    </group>
  ); };

/** Medalla genérica plateada colgando de una cinta. */
export const Medal: React.FC<P> = ({ t }) => (
  <group rotation={[0, Math.sin(t * 1.5) * 0.3, 0]}>
    <B s={[0.12, 0.5, 0.03]} pos={[-0.09, 0.3, 0]} rot={[0, 0, -0.25]} c={C.blue} /><B s={[0.12, 0.5, 0.03]} pos={[0.09, 0.3, 0]} rot={[0, 0, 0.25]} c={C.blue} />
    <mesh rotation={[PI / 2, 0, 0]}><cylinderGeometry args={[0.22, 0.22, 0.06, 18]} /><M c="#c9cbd8" e="#c9cbd8" ei={0.3} /></mesh>
  </group>
);

/** Bandera argentina en mástil corto (celeste, blanco, celeste, sol dorado). Alto total ~1.9. */
export const Flag: React.FC<P> = ({ t }) => {
  const wv = (i: number) => Math.sin(t * 4 + i * 0.9) * 0.04; const CEL = '#74b9e8';
  return (<group>
    <B s={[0.05, 1.9, 0.05]} pos={[0, 0.95, 0]} c="#8d8aa0" />
    {Array.from({ length: 6 }, (_, i) => <group key={i} position={[0.06 + i * 0.13 + 0.065, 1.55, wv(i)]}>
      <B s={[0.13, 0.13, 0.02]} pos={[0, 0.13, 0]} c={CEL} e={CEL} ei={0.25} /><B s={[0.13, 0.13, 0.02]} c={WHITE} e={WHITE} ei={0.1} /><B s={[0.13, 0.13, 0.02]} pos={[0, -0.13, 0]} c={CEL} e={CEL} ei={0.25} />
    </group>)}
    <mesh position={[0.06 + 2.5 * 0.13 + 0.065, 1.55, 0.02 + wv(2.5)]} rotation={[PI / 2, 0, 0]}><cylinderGeometry args={[0.04, 0.04, 0.02, 10]} /><M c={C.gold} e={C.gold} ei={0.8} /></mesh>
  </group>);
};

/** Escalera de ranking: n escalones que bajan de izquierda a derecha, con un jugador en cada uno. kits: lista de kits por escalón. */
export const Ranking: React.FC<P> = ({ t, tt, p }) => {
  const { kits = [] as string[], step = 0.31, h0 = 0.95, dh = 0.09, delay = 0, stagger = 0.11 } = p; const n = kits.length; const w = n * step;
  return (<group>{kits.map((k: string, i: number) => { const h = Math.max(0.06, h0 - i * dh); const x = -w / 2 + step / 2 + i * step; const kk = pop(tt - delay - i * stagger);
    return <group key={i}>
      <B s={[step - 0.02, h, 0.5]} pos={[x, h / 2, 0]} c={i % 2 ? '#2d1a6e' : '#3a2590'} e={k === 'pal' ? GREEN : RED} ei={0.12} />
      <B s={[step - 0.02, 0.03, 0.51]} pos={[x, h, 0]} c={k === 'pal' ? GREEN : RED} e={k === 'pal' ? GREEN : RED} ei={1.0} />
      {kk > 0 && <group position={[x, h, 0]} scale={0.4 * kk}><Player t={t} tt={tt} p={{ kit: k, phase: i * 0.6 }} /></group>}
    </group>; })}</group>);
};

/** Pelota low-poly blanca. */
export const Ball: React.FC<P> = ({ t, p }) => (
  <group rotation={[t * (p.spin ?? 1.5), t * 0.7, 0]}>
    <mesh><icosahedronGeometry args={[p.r ?? 0.14, 1]} /><M c="#f4f1ff" e="#f4f1ff" ei={0.2} /></mesh>
    {[[1, 0.3, 0.2], [-0.6, 0.7, 0.3], [0.1, -0.8, 0.5], [-0.4, -0.2, -0.9]].map(([x, y, z], i) => { const r = p.r ?? 0.14; const l = Math.hypot(x, y, z);
      return <mesh key={i} position={[(x / l) * r * 0.93, (y / l) * r * 0.93, (z / l) * r * 0.93]}><icosahedronGeometry args={[r * 0.3, 0]} /><M c="#15102b" /></mesh>; })}
  </group>
);

/** Cancha chica: w (x) por d (z). */
export const Pitch: React.FC<P> = ({ p }) => {
  const { w = 1.4, d = 2.0, bands = 6 } = p; const L = '#eafff2'; const bd = d / bands;
  return (
    <group>
      {Array.from({ length: bands }, (_, i) => <B key={i} s={[w, 0.04, bd]} pos={[0, 0.02, -d / 2 + bd / 2 + i * bd]} c={i % 2 ? '#178a4a' : '#12733d'} />)}
      {[-1, 1].map((s) => <B key={s} s={[0.04, 0.02, d]} pos={[(w / 2) * s, 0.05, 0]} c={L} e={L} ei={0.8} />)}
      {[-1, 0, 1].map((s) => <B key={'z' + s} s={[w, 0.02, 0.04]} pos={[0, 0.05, (d / 2) * s]} c={L} e={L} ei={0.8} />)}
      <mesh position={[0, 0.055, 0]} rotation={[-PI / 2, 0, 0]}><ringGeometry args={[0.2, 0.23, 20]} /><meshBasicMaterial color={L} toneMapped={false} /></mesh>
      {[-1, 1].map((s) => <group key={'g' + s} position={[0, 0, (d / 2) * s]}>
        <B s={[0.03, 0.22, 0.03]} pos={[-0.22, 0.11, 0]} c={L} /><B s={[0.03, 0.22, 0.03]} pos={[0.22, 0.11, 0]} c={L} /><B s={[0.47, 0.03, 0.03]} pos={[0, 0.22, 0]} c={L} /></group>)}
    </group>
  );
};

/** Marcador sin goles: dos filas (equipo + ?). Texto 2 cm delante de cada panel. */
export const Score: React.FC<P> = ({ t, tt, p }) => {
  const { a = 'ESTUDIANTES', b = 'PALMEIRAS', top = 'FINAL', blink = 0 } = p;
  const on = blink > 0 && tt > blink && Math.floor((tt - blink) * 3) % 2 === 0;
  const row = (y: number, name: string, col: string, stripe: boolean) => (
    <group position={[0, y, 0.05]}>
      <B s={[0.16, 0.5, 0.05]} pos={[-1.36, 0, 0.025]} c={col} e={col} ei={0.6} />
      {stripe && <B s={[0.05, 0.5, 0.052]} pos={[-1.36, 0, 0.027]} c={WHITE} />}
      <group position={[-0.3, 0, 0.05]}><Panel t={t} tt={tt} p={{ text: name, w: 1.9, h: 0.5, bg: '#241659', size: 0.56, weight: 900 }} /></group>
      <group position={[1.08, 0, 0.05]}><Panel t={t} tt={tt} p={{ text: '?', w: 0.66, h: 0.5, bg: on ? C.gold : '#f4f1ff', color: '#15102b', size: 0.86, weight: 900 }} /></group>
    </group>);
  return (
    <group>
      <B s={[3.1, 1.62, 0.1]} c="#15102b" />
      <B s={[3.18, 1.7, 0.06]} pos={[0, 0, -0.04]} c={C.cyan} e={C.cyan} ei={1.2} />
      <group position={[0, 0.6, 0.07]}><Panel t={t} tt={tt} p={{ text: top, w: 2.0, h: 0.28, bg: '#15102b', color: C.cyan, size: 0.66, weight: 800 }} /></group>
      {row(0.12, a, RED, true)}{row(-0.46, b, GREEN, false)}
    </group>
  );
};

/** Estante con n huecos para copas; las primeras `have` están desde el inicio y la última aparece en `at5`. */
export const Shelf: React.FC<P> = ({ t, tt, p }) => {
  const { n = 5, have = 4, at5 = 1, gap = 0.62 } = p; const w = n * gap;
  return (<group>
    <B s={[w + 0.2, 0.1, 0.6]} pos={[0, 0.05, 0]} c="#3a2590" e="#6b3cff" ei={0.2} />
    {Array.from({ length: n }, (_, i) => { const k = i < have ? 1 : pop(tt - at5); if (k <= 0) return null;
      return <group key={i} position={[-w / 2 + gap / 2 + i * gap, 0.1, 0]} scale={0.6 * k}><Cup t={t} tt={tt} p={{}} /></group>; })}
  </group>);
};

/** Fila de n títulos (bloques verdes y dorados) que aparecen de a uno; en `cut` una barra roja los corta y caen hacia atrás. */
export const Titles: React.FC<P> = ({ tt, p }) => {
  const { n = 7, gap = 0.4, delay = 0, cut = 99 } = p; const w = n * gap;
  const kc = eo((tt - cut) / 0.4);
  return (<group>
    {Array.from({ length: n }, (_, i) => { const k = pop(tt - delay - i * 0.07); if (k <= 0) return null; const fall = clamp((tt - cut - 0.25 - i * 0.04) / 0.35);
      return <group key={i} position={[-w / 2 + gap / 2 + i * gap, 0, -0.16]} rotation={[-fall * PI * 0.45, 0, 0]} scale={k}>
        <B s={[0.3, 0.42, 0.12]} pos={[0, 0.21, 0.06]} c="#1f9d55" e="#1f9d55" ei={0.35} /><B s={[0.3, 0.1, 0.125]} pos={[0, 0.35, 0.06]} c="#ffd400" e="#ffd400" ei={0.5} /></group>; })}
    {kc > 0 && <B s={[w * kc + 0.1, 0.1, 0.1]} pos={[-w / 2 + (w * kc) / 2, 0.24, 0.25]} c={RED} e={RED} ei={1.4} />}
  </group>);
};

/** Cruz roja (rival eliminado). */
export const Equis: React.FC<P> = ({ p }) => { const { size = 0.5 } = p; return (
  <group><B s={[size * 1.3, size * 0.2, 0.06]} rot={[0, 0, PI / 4]} c={RED} e={RED} ei={1.4} /><B s={[size * 1.3, size * 0.2, 0.06]} rot={[0, 0, -PI / 4]} c={RED} e={RED} ei={1.4} /></group>); };

/** Cielo igual al del set pero sin estrellas: tapa los puntos claros que caían detrás de la franja de subtítulos. */
export const CleanSky: React.FC<P> = () => {
  const tx = useTex((g, W, H) => { const gr = g.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, '#0b0520'); gr.addColorStop(0.62, '#2a1066'); gr.addColorStop(0.8, '#a02a8c'); gr.addColorStop(1, '#a02a8c'); g.fillStyle = gr; g.fillRect(0, 0, W, H); }, 256, 512, 'cleansky');
  return <mesh position={[0, 16, -41.9]}><planeGeometry args={[130, 70]} /><meshBasicMaterial map={tx} toneMapped={false} fog={false} /></mesh>;
};

export const EXTRA = { cleansky: CleanSky, panel: Panel, player: Player, balanza: Balanza, col: Col, pile: Pile, fajos: Fajos, stadium: Stadium, clock: Clock, cup: Cup, medal: Medal,
  flag: Flag, ranking: Ranking, ball: Ball, pitch: Pitch, score: Score, shelf: Shelf, titles: Titles, equis: Equis };
void useMemo; void rnd;
