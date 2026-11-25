import React from 'react';
import { M, Label } from '../../src/kit/Props';
import { C, clamp, eo } from '../../src/kit/math';

type P = { t: number; tt: number; p: any };
type V = [number, number, number];
const B: React.FC<{ s: V; pos?: V; rot?: V; c: string; e?: string; ei?: number }> = ({ s, pos, rot, c, e, ei }) => (
  <mesh position={pos} rotation={rot}><boxGeometry args={s} /><M c={c} e={e} ei={ei} /></mesh>
);

/** Bloque de región (sin bandera): plataforma + cartel + pila de monedas. p: name, color, n, val, delay, dur, w, lit */
export const Region: React.FC<P> = ({ t, tt, p }) => {
  const { name = 'EUROPA', color = C.blue, n = 0, val, delay = 0, dur = 1.0, w = 0.98, lit = false, r = 0.3 } = p;
  const k = eo((tt - delay) / dur); const vis = tt < delay ? 0 : Math.max(n > 0 ? 1 : 0, Math.round(n * k));
  const top = 0.55 + vis * 0.09;
  return (
    <group>
      <B s={[w, 0.5, 0.9]} pos={[0, 0.25, 0]} c={color} e={color} ei={lit ? 0.7 + Math.sin(t * 4) * 0.25 : 0.25} />
      <B s={[w + 0.08, 0.06, 0.98]} pos={[0, 0.52, 0]} c="#f4f1ff" e="#f4f1ff" ei={lit ? 0.9 : 0.3} />
      <group position={[0, 0.25, 0.47]}><Label t={t} tt={tt} p={{ text: name, w: w * 0.96, h: 0.34, color: '#fff', size: 0.66, weight: 900, depth: 0 }} /></group>
      {Array.from({ length: vis }, (_, i) => (
        <mesh key={i} position={[Math.sin(i * 2.4) * 0.02, 0.6 + i * 0.09, Math.cos(i * 1.7) * 0.02]} rotation={[0, i * 0.5, 0]}>
          <cylinderGeometry args={[r, r, 0.075, 10]} /><M c={i % 2 ? C.gold : C.gold2} e={C.gold} ei={0.4} /></mesh>))}
      {val && tt > delay + 0.15 && <group position={[0, top + 0.34, 0.1]} scale={Math.min(1, (tt - delay - 0.15) * 6)}>
        <Label t={t} tt={tt} p={{ text: val, w: 0.78, h: 0.46, bg: '#15102b', color: C.gold, size: 0.74, weight: 900 }} /></group>}
    </group>
  );
};

/** Chip acostado sobre XZ (copiado de huawei-condena). */
export const Chip: React.FC<P> = ({ t, p }) => {
  const { color = '#1f6b3f', core = C.green } = p; const pu = 0.9 + Math.sin(t * 4) * 0.5;
  return (
    <group>
      <B s={[1, 0.12, 1]} c={color} /><B s={[0.52, 0.16, 0.52]} c="#15102b" /><B s={[0.34, 0.18, 0.34]} c={core} e={core} ei={pu} />
      {Array.from({ length: 5 }, (_, i) => { const o = -0.4 + i * 0.2; return <group key={i}>
        <B s={[0.07, 0.06, 0.16]} pos={[o, 0, 0.56]} c={C.gold} e={C.gold} ei={0.5} /><B s={[0.07, 0.06, 0.16]} pos={[o, 0, -0.56]} c={C.gold} e={C.gold} ei={0.5} />
        <B s={[0.16, 0.06, 0.07]} pos={[0.56, 0, o]} c={C.gold} e={C.gold} ei={0.5} /><B s={[0.16, 0.06, 0.07]} pos={[-0.56, 0, o]} c={C.gold} e={C.gold} ei={0.5} /></group>; })}
    </group>
  );
};

/** Átomo: núcleo + 3 órbitas (computación cuántica). */
export const Atom: React.FC<P> = ({ t, p }) => {
  const { color = C.magenta, r = 0.5 } = p;
  return (
    <group>
      <mesh><icosahedronGeometry args={[r * 0.36, 0]} /><M c={color} e={color} ei={1.2 + Math.sin(t * 4) * 0.4} /></mesh>
      {[0, 1, 2].map((i) => (
        <group key={i} rotation={[Math.PI / 2 + 0.25, (i * Math.PI) / 3, 0]}>
          <mesh><torusGeometry args={[r, r * 0.045, 5, 20]} /><M c={C.cyan} e={C.cyan} ei={1.1} /></mesh>
          <mesh position={[Math.cos(t * 2.2 + i * 2) * r, Math.sin(t * 2.2 + i * 2) * r, 0]}><icosahedronGeometry args={[r * 0.13, 0]} /><M c="#fff" e="#fff" ei={1.5} /></mesh>
        </group>))}
    </group>
  );
};

/** Fondo: cofre con ventana de nivel. p: sign, fill (0..1), from, delay, dur, ghost (nivel = meta, en cian), alarm */
export const Pot: React.FC<P> = ({ t, tt, p }) => {
  const { sign, fill = 0, from = 0, delay = 0, dur = 1.2, ghost = false, alarm = false } = p;
  const lv = clamp(from + (fill - from) * eo((tt - delay) / dur), 0, 1); const trim = alarm ? C.red : C.cyan; const col = ghost ? C.cyan : C.gold;
  return (
    <group>
      <B s={[1.9, 1.7, 1.1]} pos={[0, 0.95, 0]} c="#2d1a6e" />
      <B s={[2.02, 0.1, 1.2]} pos={[0, 1.85, 0]} c={trim} e={trim} ei={1} /><B s={[2.02, 0.1, 1.2]} pos={[0, 0.06, 0]} c={trim} e={trim} ei={1} />
      <group position={[0, 0.95, 0.56]}>
        <B s={[1.5, 1.3, 0.04]} c="#0c0720" />
        <B s={[1.38, Math.max(0.001, 1.18 * lv), 0.05]} pos={[0, -0.59 + (1.18 * lv) / 2, 0.02]} c={col} e={col} ei={ghost ? 0.5 + Math.sin(t * 5) * 0.2 : 0.7} />
        {[0.25, 0.5, 0.75].map((f) => <B key={f} s={[1.38, 0.015, 0.01]} pos={[0, -0.59 + 1.18 * f, 0.05]} c="#15102b" />)}
        <B s={[1.38, 0.04, 0.06]} pos={[0, 0.59, 0.04]} c="#fff" e="#fff" ei={1.2} />
      </group>
      {sign && <group position={[0, 2.2, 0]}><Label t={t} tt={tt} p={{ text: sign, w: 1.9, h: 0.44, bg: '#15102b', color: C.gold, size: 0.62, weight: 900 }} /></group>}
    </group>
  );
};

/** Diez bloques en fila de 5x2; se enciende uno. p: delay, gap, s */
export const Tenth: React.FC<P> = ({ t, tt, p }) => {
  const { delay = 1, gap = 0.6, s = 0.5 } = p;
  return (
    <group>
      {Array.from({ length: 10 }, (_, i) => { const cx = i % 5, cy = Math.floor(i / 5); const on = i === 5 && tt > delay; const k = Math.min(1, Math.max(0.001, (tt - i * 0.06) * 6));
        return <group key={i} position={[(cx - 2) * gap, (0.5 - cy) * gap, on ? 0.15 : 0]} scale={k * (on ? 1.12 + Math.sin(t * 5) * 0.04 : 1)}>
          <B s={[s, s, 0.3]} c={on ? C.gold : '#3b2f7a'} e={on ? C.gold : '#6b3cff'} ei={on ? 1.1 : 0.25} /></group>; })}
    </group>
  );
};

export const EXTRA = { region: Region, chip: Chip, atom: Atom, pot: Pot, tenth: Tenth };
