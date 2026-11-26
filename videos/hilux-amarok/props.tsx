import React from 'react';
import { M, Label } from '../../src/kit/Props';
import { C } from '../../src/kit/math';

type P = { t: number; tt: number; p: any };
type V3 = [number, number, number];
const B: React.FC<{ s: V3; pos?: V3; rot?: V3; c: string; e?: string; ei?: number }> = ({ s, pos, rot, c, e, ei }) => (
  <mesh position={pos} rotation={rot}><boxGeometry args={s} /><M c={c} e={e} ei={ei} /></mesh>
);
const DK = '#0d0a1c';

/** Pick-up genérica doble cabina, trompa hacia +z, ~2,7 de largo. p: color, speed (giro de ruedas), glow, cover (tapada con una lona), dim */
export const Pickup: React.FC<P> = ({ t, p }) => {
  const { color = C.gold, speed = 0, glow = 0.22, cover = false, lona = '#cfc8ea' } = p;
  const wheels = [[-0.5, 0.86], [0.5, 0.86], [-0.5, -0.84], [0.5, -0.84]].map(([x, z], i) => (
    <group key={i} position={[x, 0.27, z]} rotation={[t * speed, 0, 0]}>
      <mesh rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.27, 0.27, 0.2, 10]} /><M c={DK} /></mesh>
      <mesh rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.12, 0.12, 0.22, 6]} /><M c="#c9c4de" e="#c9c4de" ei={0.25} /></mesh>
    </group>));
  if (cover) return (
    <group>
      {wheels}
      <B s={[1.12, 0.5, 2.8]} pos={[0, 0.55, 0]} c={lona} e={lona} ei={0.12} />
      <B s={[1.08, 0.42, 1.25]} pos={[0, 0.98, 0.1]} c={lona} e={lona} ei={0.12} />
      <B s={[1.1, 0.12, 0.6]} pos={[0, 0.84, 0.98]} rot={[0.5, 0, 0]} c={lona} e={lona} ei={0.12} />
      <B s={[1.1, 0.12, 0.5]} pos={[0, 0.86, -0.7]} rot={[-0.6, 0, 0]} c={lona} e={lona} ei={0.12} />
      {[-1, 1].map((s) => <B key={s} s={[0.04, 0.5, 2.6]} pos={[0.57 * s, 0.5, 0]} rot={[0, 0, 0.06 * s]} c="#a79fd0" />)}
    </group>);
  return (
    <group>
      {wheels}
      <B s={[1.0, 0.3, 2.66]} pos={[0, 0.5, 0]} c={color} e={color} ei={glow} />
      <B s={[1.04, 0.12, 2.7]} pos={[0, 0.33, 0]} c={DK} />
      {/* capot */}
      <B s={[0.98, 0.2, 0.74]} pos={[0, 0.74, 0.94]} c={color} e={color} ei={glow} />
      <B s={[0.8, 0.2, 0.05]} pos={[0, 0.66, 1.32]} c={DK} />
      {[-1, 1].map((s) => <B key={'h' + s} s={[0.2, 0.1, 0.05]} pos={[0.38 * s, 0.76, 1.33]} c="#fff8c9" e="#fff8c9" ei={3} />)}
      <B s={[1.06, 0.12, 0.1]} pos={[0, 0.42, 1.34]} c="#8d8aa0" />
      {/* cabina */}
      <B s={[1.0, 0.24, 1.08]} pos={[0, 0.76, 0.05]} c={color} e={color} ei={glow} />
      <B s={[0.92, 0.3, 1.0]} pos={[0, 1.02, 0.03]} c="#1a1238" e="#27e0d8" ei={0.08} />
      <B s={[0.96, 0.06, 0.96]} pos={[0, 1.2, 0.02]} c={color} e={color} ei={glow} />
      {[-1, 1].map((s) => <B key={'p' + s} s={[0.06, 0.3, 0.08]} pos={[0.46 * s, 1.02, 0.03]} c={color} />)}
      {[-1, 1].map((s) => <B key={'m' + s} s={[0.12, 0.08, 0.1]} pos={[0.56 * s, 0.92, 0.5]} c={DK} />)}
      {/* caja de carga */}
      {[-1, 1].map((s) => <B key={'w' + s} s={[0.08, 0.3, 0.84]} pos={[0.46 * s, 0.78, -0.9]} c={color} e={color} ei={glow} />)}
      <B s={[1.0, 0.3, 0.08]} pos={[0, 0.78, -1.3]} c={color} e={color} ei={glow} />
      <B s={[0.84, 0.04, 0.8]} pos={[0, 0.66, -0.9]} c={DK} />
      <B s={[0.9, 0.06, 0.06]} pos={[0, 1.0, -0.5]} c="#8d8aa0" />
      {[-1, 1].map((s) => <B key={'t' + s} s={[0.14, 0.18, 0.04]} pos={[0.42 * s, 0.76, -1.35]} c={C.red} e={C.red} ei={2.2} />)}
      <B s={[1.04, 0.1, 0.1]} pos={[0, 0.42, -1.34]} c="#8d8aa0" />
    </group>
  );
};

/** Nave industrial con techo en diente de sierra y chimeneas. p: w, h, d, color, sign, signBg, teeth */
export const Factory: React.FC<P> = ({ t, tt, p }) => {
  const { w = 3, h = 1.2, d = 1.6, color = '#2d1a6e', sign, signBg = C.gold, signColor = '#1a1030', teeth = 4, win = C.cyan } = p; const tw = w / teeth;
  return (
    <group>
      <B s={[w, h, d]} pos={[0, h / 2, 0]} c={color} />
      {Array.from({ length: teeth }, (_, i) => { const x = -w / 2 + tw * (i + 0.5);
        return <group key={i} position={[x, h, 0]}>
          <B s={[tw * 1.12, 0.06, d]} pos={[0, 0.2, 0]} rot={[0, 0, 0.42]} c="#3b2a86" />
          <B s={[0.06, 0.42, d * 0.94]} pos={[tw / 2 - 0.03, 0.2, 0]} c={win} e={win} ei={1.4} />
        </group>; })}
      {Array.from({ length: 6 }, (_, i) => <B key={'v' + i} s={[w / 9, h * 0.22, 0.04]} pos={[-w / 2 + (w / 6) * (i + 0.5), h * 0.68, d / 2 + 0.01]} c={win} e={win} ei={1.2} />)}
      <B s={[w * 0.26, h * 0.46, 0.05]} pos={[0, h * 0.23, d / 2 + 0.01]} c="#15102b" e="#ffb52e" ei={0.5} />
      {[0.32, 0.42].map((fx, i) => <group key={'c' + i} position={[-w * fx, 0, -d * 0.2]}>
        <mesh position={[0, h + 0.55 + i * 0.2, 0]}><cylinderGeometry args={[0.1, 0.13, 1.1 + i * 0.4, 8]} /><M c="#5b4aa0" /></mesh>
        {[0, 1, 2].map((k) => { const q = ((t * 0.5 + k / 3 + i * 0.2) % 1);
          return <mesh key={k} position={[q * 0.25, h + 1.25 + i * 0.4 + q * 0.7, 0]} scale={0.12 + q * 0.16}><icosahedronGeometry args={[1, 0]} /><M c="#c9c4de" o={0.7 * (1 - q)} /></mesh>; })}
      </group>)}
      {sign && <group position={[0, h * 0.5 + 0.1, d / 2 + 0.12]}><group position={[w * 0.28, h * 0.02, 0]} /></group>}
      {sign && <group position={[0, h + 0.95, 0.1]}><Label t={t} tt={tt} p={{ text: sign, w: w * 0.72, h: 0.44, bg: signBg, color: signColor, size: 0.64, weight: 900 }} /></group>}
    </group>
  );
};

/** Línea de montaje a lo largo de x con pick-ups que avanzan. p: len, n, speed, colors[], stopAt (s), sc, cover */
export const Line: React.FC<P> = ({ t, p }) => {
  const { len = 6, n = 4, speed = 0.9, colors = [C.gold], stopAt = 999, sc = 0.5, cover = false, arches = 2 } = p;
  const run = speed * Math.min(t, stopAt); const gap = len / n; const stopped = t >= stopAt;
  return (
    <group>
      <B s={[len, 0.16, 1.0]} pos={[0, 0.08, 0]} c="#231a4d" />
      {[-1, 1].map((s) => <B key={s} s={[len, 0.06, 0.06]} pos={[0, 0.19, 0.5 * s]} c={stopped ? C.red : C.cyan} e={stopped ? C.red : C.cyan} ei={1.4} />)}
      {Array.from({ length: Math.floor(len / 0.5) }, (_, i) => { const x = ((i * 0.5 + run) % len + len) % len - len / 2;
        return <B key={'s' + i} s={[0.06, 0.02, 0.9]} pos={[x, 0.17, 0]} c="#5b4aa0" />; })}
      {Array.from({ length: n }, (_, i) => { const x = ((i * gap + run) % len + len) % len - len / 2; const k = Math.floor((i * gap + run) / len);
        const col = colors[(((i - k * n) % colors.length) + colors.length * 99) % colors.length];
        return <group key={i} position={[x, 0.16, 0]} rotation={[0, Math.PI / 2, 0]} scale={sc}><Pickup t={t} tt={t} p={{ color: col, cover }} /></group>; })}
      {Array.from({ length: arches }, (_, i) => { const x = -len / 2 + (len / (arches + 1)) * (i + 1); const on = Math.sin(t * 6 + i * 2) > 0 && !stopped;
        return <group key={'a' + i} position={[x, 0, 0]}>
          {[-1, 1].map((s) => <B key={s} s={[0.08, 1.25, 0.08]} pos={[0, 0.62, 0.62 * s]} c="#8d8aa0" />)}
          <B s={[0.1, 0.08, 1.34]} pos={[0, 1.26, 0]} c="#8d8aa0" />
          <B s={[0.12, 0.1, 0.24]} pos={[0, 1.18, 0]} c={on ? C.gold : '#5a4a1a'} e={on ? C.gold : undefined} ei={3} />
        </group>; })}
    </group>
  );
};

/** Bandera argentina (franjas y sol planos) en un mástil corto */
export const Bandera: React.FC<P> = ({ t, p }) => {
  const { w = 2.6, h = 1.6 } = p; const cols = 10; const cw = w / cols; const ce = '#74acdf';
  return (
    <group>
      {Array.from({ length: cols }, (_, i) => { const z = Math.sin(t * 3 - i * 0.7) * 0.05 * (i / cols);
        return <group key={i} position={[-w / 2 + cw * (i + 0.5), 0, z]}>
          <B s={[cw + 0.005, h / 3, 0.04]} pos={[0, h / 3, 0]} c={ce} e={ce} ei={0.55} />
          <B s={[cw + 0.005, h / 3, 0.04]} pos={[0, 0, 0]} c="#f4f1ff" e="#f4f1ff" ei={0.5} />
          <B s={[cw + 0.005, h / 3, 0.04]} pos={[0, -h / 3, 0]} c={ce} e={ce} ei={0.55} />
        </group>; })}
      <mesh position={[0, 0, 0.06]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[h * 0.12, h * 0.12, 0.03, 12]} /><M c={C.gold} e={C.gold} ei={1.2} /></mesh>
    </group>
  );
};

/** Cronómetro: la aguja da una vuelta cada p.per segundos. p: r, per, text */
export const Crono: React.FC<P> = ({ t, tt, p }) => {
  const { r = 0.7, per = 2, text } = p; const a = -(t / per) * Math.PI * 2;
  return (
    <group>
      <mesh rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[r, r, 0.14, 20]} /><M c="#f4f1ff" e="#f4f1ff" ei={0.35} /></mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.02]}><cylinderGeometry args={[r * 1.12, r * 1.12, 0.12, 20]} /><M c={C.gold} e={C.gold} ei={0.5} /></mesh>
      <B s={[0.2, 0.22, 0.12]} pos={[0, r * 1.22, 0]} c={C.gold} />
      {Array.from({ length: 12 }, (_, i) => { const b = (i / 12) * Math.PI * 2; return <B key={i} s={[0.04, r * 0.14, 0.02]} pos={[Math.sin(b) * r * 0.84, Math.cos(b) * r * 0.84, 0.08]} rot={[0, 0, -b]} c={DK} />; })}
      <group rotation={[0, 0, a]}><B s={[0.06, r * 0.78, 0.03]} pos={[0, r * 0.36, 0.1]} c={C.red} e={C.red} ei={1.5} /></group>
      <mesh position={[0, 0, 0.1]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.07, 0.07, 0.05, 8]} /><M c={DK} /></mesh>
      {text && <group position={[0, -r * 1.5, 0.05]}><Label t={t} tt={tt} p={{ text, w: r * 2.6, h: 0.42, bg: '#15102b', border: C.gold, color: C.gold, size: 0.62, weight: 900 }} /></group>}
    </group>
  );
};

export const EXTRA = { pickup: Pickup, factory: Factory, line: Line, bandera: Bandera, crono: Crono };
