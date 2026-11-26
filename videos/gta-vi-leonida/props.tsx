import React from 'react';
import { M } from '../../src/kit/Props';
import { C, clamp, eo, pop, rnd } from '../../src/kit/math';

type P = { t: number; tt: number; p: any };
type V3 = [number, number, number];
const B: React.FC<{ s: V3; pos?: V3; rot?: V3; c: string; e?: string; ei?: number }> = ({ s, pos, rot, c, e, ei }) => (
  <mesh position={pos} rotation={rot}><boxGeometry args={s} /><M c={c} e={e} ei={ei} /></mesh>
);

/** Carpeta de archivos genérica */
export const Folder: React.FC<P> = ({ p }) => {
  const { color = C.gold, glow = true } = p;
  return (<group>
    <B s={[0.56, 0.38, 0.06]} c={color} e={glow ? color : undefined} ei={0.45} />
    <B s={[0.24, 0.08, 0.06]} pos={[-0.16, 0.22, 0]} c={color} e={glow ? color : undefined} ei={0.45} />
    <B s={[0.5, 0.05, 0.02]} pos={[0, 0.1, 0.035]} c="#15102b" />
  </group>);
};

/** n carpetas que salen disparadas desde un punto */
export const Files: React.FC<P> = ({ t, tt, p }) => {
  const { n = 14, seed = 4, spread = [1.5, 1.6, 0.8], stagger = 0.06, color = C.red, s = 0.6 } = p;
  const pts = React.useMemo(() => { const r = rnd(seed); return Array.from({ length: n }, () => [(r() - 0.5) * 2, r(), (r() - 0.5) * 2, (r() - 0.5) * 0.9]); }, [n, seed]);
  return (<group>{pts.map(([x, y, z, rz], i) => { const k = eo((tt - i * stagger) / 0.6); if (k <= 0) return null;
    return <group key={i} position={[x * spread[0] * k, y * spread[1] * k + Math.sin(t * 2 + i) * 0.03, z * spread[2] * k]} rotation={[0, 0, rz * k]} scale={pop(tt - i * stagger) * s}>
      <Folder t={t} tt={tt} p={{ color }} /></group>; })}</group>);
};

/** Grilla de proyectos (tarjetas). fallAt = segundo (desde que aparece) en que se apagan y caen al piso; drop = distancia de la base al piso */
export const Repos: React.FC<P> = ({ tt, p }) => {
  const { cols = 9, rows = 6, cw = 0.3, ch = 0.22, gap = 0.06, stagger = 0.012, fallAt, drop = 1, seed = 3, hi = -1 } = p;
  const rs = React.useMemo(() => { const r = rnd(seed); return Array.from({ length: cols * rows }, () => [r(), r(), r()]); }, [cols, rows, seed]);
  const pal = [C.cyan, C.magenta, '#8a6bff', C.green, C.blue];
  const W = cols * (cw + gap) - gap;
  return (<group>{rs.map(([a, b, c], i) => {
    const col = i % cols, row = Math.floor(i / cols); const x = -W / 2 + cw / 2 + col * (cw + gap); const y = (rows - 1 - row) * (ch + gap) + ch / 2;
    const k = pop(tt - i * stagger); if (k <= 0) return null;
    const f = fallAt === undefined ? 0 : clamp((tt - fallAt - row * 0.05 - a * 0.25) / 0.55); const g = f * f;
    const color = i === hi ? C.gold : pal[Math.floor(b * pal.length)];
    return (<group key={i}>
      {f > 0 && <B s={[cw, ch, 0.02]} pos={[x, y, -0.02]} c="#3a2a8a" e="#3a2a8a" ei={0.5} />}
      <group position={[x + g * (c - 0.5) * 0.5, y - g * (y + drop - 0.04 - a * 0.1), g * (0.3 + b * 1.3)]} rotation={[-g * Math.PI / 2, 0, g * (c - 0.5) * 1.6]} scale={k}>
        <B s={[cw, ch, 0.04]} c={f > 0.15 ? '#4a4468' : '#f4f1ff'} />
        <B s={[cw, ch * 0.3, 0.045]} pos={[0, ch * 0.35, 0]} c={f > 0.15 ? '#35304f' : color} e={f > 0.15 ? undefined : color} ei={0.9} />
        <B s={[cw * 0.6, ch * 0.1, 0.045]} pos={[-cw * 0.12, -ch * 0.1, 0]} c={f > 0.15 ? '#35304f' : '#6b5aa8'} />
      </group>
    </group>);
  })}</group>);
};

/** Cubo que se desarma en 8 piezas y deja ver un núcleo */
export const Explode: React.FC<P> = ({ t, tt, p }) => {
  const { at = 0.5, dur = 0.9, color = '#c2307e', size = 0.4 } = p; const k = eo((tt - at) / dur);
  const d = size / 2 + 0.01 + k * size * 0.75;
  return (<group rotation={[0.25, t * 0.5, 0]}>
    <mesh scale={0.6 + k * 0.5}><icosahedronGeometry args={[size * 0.5, 0]} /><M c={C.gold} e={C.gold} ei={1.6} /></mesh>
    {[-1, 1].flatMap((x) => [-1, 1].flatMap((y) => [-1, 1].map((z) =>
      <B key={`${x}${y}${z}`} s={[size, size, size]} pos={[x * d, y * d, z * d]} c={(x * y * z) > 0 ? color : '#8a2a6a'} e={color} ei={0.25} />)))}
  </group>);
};

export const EXTRA = { folder: Folder, files: Files, repos: Repos, explode: Explode };
