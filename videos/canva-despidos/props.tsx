import React from 'react';
import { M, Person } from '../../src/kit/Props';
import { C, eo, eio, lerp, pop, rnd } from '../../src/kit/math';

type P = { t: number; tt: number; p: any };
type V3 = [number, number, number];
const B: React.FC<{ s: V3; pos?: V3; rot?: V3; c: string; e?: string; ei?: number }> = ({ s, pos, rot, c, e, ei }) => (
  <mesh position={pos} rotation={rot}><boxGeometry args={s} /><M c={c} e={e} ei={ei} /></mesh>
);
const KIND: Record<string, string> = { out: C.red, role: C.gold, move: C.magenta };

/** Oficina: grilla de escritorios con una persona cada uno. p.ch = [{ i, t, kind: 'out'|'role'|'move' }] */
export const Office: React.FC<P> = ({ t, tt, p }) => {
  const { cols = 5, rows = 3, dx = 0.66, dz = 1.0, ch = [], seed = 4 } = p;
  const ppl = React.useMemo(() => { const r = rnd(seed); const pal = [C.cyan, '#8a6bff', '#3ee07a', '#ff7a3d', '#f4f1ff', C.blue];
    return Array.from({ length: cols * rows }, () => ({ shirt: pal[Math.floor(r() * pal.length)], hair: ['#3a2a1a', '#15102b', '#c98a3a', '#7a3b1a'][Math.floor(r() * 4)], skin: ['#f2c39b', '#c98d62', '#8a5a3c', '#ffd9b8'][Math.floor(r() * 4)], ph: r() * 6 })); }, [cols, rows, seed]);
  return (
    <group>
      {ppl.map((q, i) => {
        const x = ((i % cols) - (cols - 1) / 2) * dx, z = (Math.floor(i / cols) - (rows - 1) / 2) * dz;
        const c = ch.find((k: any) => k.i === i); const k = c ? tt - c.t : -1; const on = c && k >= 0; const col = c ? KIND[c.kind] : C.cyan;
        let sc = 0.5, px = 0, pose = 'type', shirt = q.shirt, hop = 0, ry = 0;
        if (on && c.kind === 'out') sc = 0.5 * (1 - eo(k / 0.35));
        if (on && c.kind === 'role') { shirt = C.gold; hop = Math.sin(Math.min(1, k / 0.4) * Math.PI) * 0.18; pose = 'idle'; }
        if (on && c.kind === 'move') { px = eio(k / 1.6) * 4.2 * (x >= 0 ? 1 : -1); pose = 'walk'; ry = (x >= 0 ? 1 : -1) * Math.PI / 2; }
        const lit = !on || c.kind === 'role';
        return (
          <group key={i} position={[x, 0, z]}>
            <B s={[0.6, 0.02, 0.86]} pos={[0, 0.012, 0]} c={on ? col : '#2d1a6e'} e={on ? col : undefined} ei={on ? 0.9 * Math.min(1, k / 0.2) : 0} />
            <B s={[0.5, 0.04, 0.3]} pos={[0, 0.42, 0.14]} c="#f4f1ff" />
            <B s={[0.04, 0.42, 0.28]} pos={[-0.22, 0.21, 0.14]} c="#8d8aa0" /><B s={[0.04, 0.42, 0.28]} pos={[0.22, 0.21, 0.14]} c="#8d8aa0" />
            <B s={[0.26, 0.17, 0.025]} pos={[0, 0.53, 0.2]} rot={[0.15, 0, 0]} c={lit ? '#27e0d8' : '#2b2740'} e={lit ? '#27e0d8' : undefined} ei={1.2} />
            {on && <mesh position={[0, 1.22 + Math.sin(t * 3 + i) * 0.04, 0]} rotation={[0, t * 1.5, 0]} scale={pop(k)}><octahedronGeometry args={[0.13, 0]} /><M c={col} e={col} ei={1.6} /></mesh>}
            {sc > 0.01 && <group position={[px, hop, -0.16]} rotation={[0, ry, 0]} scale={sc}><Person t={t} tt={tt} p={{ shirt, hair: q.hair, skin: q.skin, pose, phase: q.ph }} /></group>}
          </group>
        );
      })}
    </group>
  );
};

/** Lámina de diseño con formas. p.drag: las formas llegan arrastradas de a una. */
export const Design: React.FC<P> = ({ tt, p }) => {
  const { drag = false, t0 = 0.2, gap = 0.55 } = p;
  const sh: { to: V3; from: V3 }[] = [
    { to: [-0.42, 0.2, 0.06], from: [-1.9, -0.9, 0.5] }, { to: [0.38, 0.22, 0.06], from: [1.9, -0.7, 0.5] }, { to: [-0.05, -0.27, 0.06], from: [1.6, -1.3, 0.5] } ];
  const k = (i: number) => (drag ? eio((tt - t0 - i * gap) / 0.45) : 1);
  const at = (i: number): V3 => [lerp(sh[i].from[0], sh[i].to[0], k(i)), lerp(sh[i].from[1], sh[i].to[1], k(i)), lerp(sh[i].from[2], sh[i].to[2], k(i))];
  let cur = -1; if (drag) for (let i = 0; i < 3; i++) if (tt >= t0 + i * gap - 0.15 && tt < t0 + i * gap + 0.6) cur = i;
  const cp = cur >= 0 ? at(cur) : null;
  return (
    <group>
      <B s={[1.6, 1.15, 0.06]} c="#f4f1ff" /><B s={[1.72, 1.27, 0.04]} pos={[0, 0, -0.03]} c="#8a6bff" e="#8a6bff" ei={0.6} />
      <mesh position={at(0)} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.24, 0.24, 0.06, 14]} /><M c={C.magenta} e={C.magenta} ei={0.5} /></mesh>
      <B s={[0.42, 0.42, 0.06]} pos={at(1)} c={C.cyan} e={C.cyan} ei={0.4} />
      <group position={at(2)}><B s={[1.0, 0.12, 0.05]} c="#2d1a6e" /><B s={[0.7, 0.09, 0.05]} pos={[-0.15, -0.2, 0]} c={C.gold} e={C.gold} ei={0.4} /></group>
      {cp && <mesh position={[cp[0] + 0.2, cp[1] - 0.24, cp[2] + 0.12]} rotation={[0, 0, 0.5]}><coneGeometry args={[0.1, 0.26, 4]} /><M c="#15102b" e="#ffffff" ei={0.25} /></mesh>}
    </group>
  );
};

export const Suitcase: React.FC<P> = ({ p }) => { const c = p.color ?? C.magenta; return (
  <group><B s={[0.52, 0.4, 0.2]} pos={[0, 0.24, 0]} c={c} /><B s={[0.54, 0.05, 0.21]} pos={[0, 0.24, 0]} c="#15102b" />
    <B s={[0.04, 0.14, 0.04]} pos={[-0.1, 0.5, 0]} c="#15102b" /><B s={[0.04, 0.14, 0.04]} pos={[0.1, 0.5, 0]} c="#15102b" /><B s={[0.24, 0.04, 0.04]} pos={[0, 0.58, 0]} c="#15102b" /></group>); };

export const EXTRA = { office: Office, design: Design, suitcase: Suitcase };
