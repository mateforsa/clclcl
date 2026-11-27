import React from 'react';
import { M, Label } from '../../src/kit/Props';
import { C, clamp, eo, eio, lerp } from '../../src/kit/math';

type P = { t: number; tt: number; p: any };
type V3 = [number, number, number];
const B: React.FC<{ s: V3; pos?: V3; rot?: V3; c: string; e?: string; ei?: number; o?: number }> = ({ s, pos, rot, c, e, ei, o }) => (
  <mesh position={pos} rotation={rot}><boxGeometry args={s} /><M c={c} e={e} ei={ei} o={o} /></mesh>
);

/** Papeleta genérica: hoja blanca con una marca (x roja, tilde verde o nada). */
export const Papeleta: React.FC<P> = ({ p }) => {
  const { mark, w = 0.5 } = p; const h = w * 0.7;
  return (
    <group>
      <B s={[w, h, 0.02]} c="#f4f1ff" />
      <B s={[w * 0.7, 0.03, 0.025]} pos={[0, h * 0.28, 0]} c="#b9b3cf" />
      {mark === 'no' && <group position={[0, -h * 0.08, 0.02]}>
        <B s={[w * 0.42, w * 0.08, 0.02]} rot={[0, 0, Math.PI / 4]} c={C.red} e={C.red} ei={0.8} />
        <B s={[w * 0.42, w * 0.08, 0.02]} rot={[0, 0, -Math.PI / 4]} c={C.red} e={C.red} ei={0.8} /></group>}
      {mark === 'si' && <group position={[0, -h * 0.08, 0.02]}>
        <B s={[w * 0.16, w * 0.07, 0.02]} pos={[-w * 0.08, -w * 0.03, 0]} rot={[0, 0, -Math.PI / 4]} c={C.green} e={C.green} ei={0.8} />
        <B s={[w * 0.32, w * 0.07, 0.02]} pos={[w * 0.05, w * 0.02, 0]} rot={[0, 0, Math.PI / 4]} c={C.green} e={C.green} ei={0.8} /></group>}
    </group>
  );
};

/** Urna genérica (sin marcas): caja translúcida con ranura. Caen papeletas por la ranura (`drops`, cada `every` s).
 *  sealed = tapa con faja roja (votación cerrada). */
export const Urna: React.FC<P> = ({ tt, p }) => {
  const { drops = 0, every = 0.45, delay = 0, sealed = false, fill = 0.35, fillTo, fillDur = 2 } = p;
  const f = fillTo !== undefined ? lerp(fill, fillTo, eo((tt - delay) / fillDur)) : fill;
  const W = 1.2, H = 1.3, D = 0.9;
  return (
    <group>
      <B s={[W + 0.1, 0.12, D + 0.1]} pos={[0, 0.06, 0]} c="#2d1a6e" e={C.cyan} ei={0.25} />
      {/* papeletas acumuladas adentro */}
      <B s={[W - 0.12, Math.max(0.01, (H - 0.2) * f), D - 0.12]} pos={[0, 0.14 + ((H - 0.2) * f) / 2, 0]} c="#e9e2ff" e="#e9e2ff" ei={0.25} />
      {/* paredes translúcidas */}
      <B s={[W, H, D]} pos={[0, 0.12 + H / 2, 0]} c="#7fd8ff" e={C.cyan} ei={0.25} o={0.32} />
      {/* aristas */}
      {[-1, 1].map((sx) => [-1, 1].map((sz) => <B key={sx + '' + sz} s={[0.06, H, 0.06]} pos={[sx * W / 2, 0.12 + H / 2, sz * D / 2]} c={C.cyan} e={C.cyan} ei={1.2} />))}
      {/* tapa */}
      <B s={[W + 0.08, 0.1, D + 0.08]} pos={[0, 0.17 + H, 0]} c="#3b2f7a" e={C.cyan} ei={0.3} />
      <B s={[0.6, 0.04, 0.1]} pos={[0, 0.23 + H, 0]} c="#0c0a18" />
      {sealed && <B s={[0.16, 0.13, D + 0.12]} pos={[0, 0.2 + H, 0]} c={C.red} e={C.red} ei={1.0} />}
      {sealed && <B s={[0.16, H + 0.02, 0.03]} pos={[0, 0.12 + H / 2, D / 2 + 0.03]} c={C.red} e={C.red} ei={1.0} />}
      {Array.from({ length: drops }, (_, i) => {
        const x = tt - delay - i * every; if (x < 0 || x > 0.6) return null; const k = eio(x / 0.6);
        return <group key={i} position={[0, 0.25 + H + 0.5 * (1 - k), 0]} rotation={[Math.PI / 2 * 0.0, 0, 0]} scale={[1, 1 - k * 0.6, 1]}>
          <group rotation={[0, 0, Math.PI / 2]}><Papeleta t={0} tt={0} p={{ w: 0.42 }} /></group></group>;
      })}
    </group>
  );
};

/** Mazo de juez que golpea una base. Golpea a los `delay` s y repite `n` veces. */
export const Mazo: React.FC<P> = ({ tt, p }) => {
  const { delay = 0.15, n = 1, every = 0.7 } = p;
  let a = -0.9;
  for (let i = 0; i < n; i++) { const x = tt - delay - i * every; if (x >= 0 && x < every) a = x < 0.12 ? -0.9 + (x / 0.12) * 0.9 : -0.9 * clamp((x - 0.12) / 0.4); }
  if (tt - delay >= n * every) a = -0.9;
  return (<group>
    <B s={[0.9, 0.14, 0.5]} pos={[0, 0.07, 0]} c="#5a3a22" />
    <B s={[0.6, 0.06, 0.34]} pos={[0, 0.17, 0]} c="#8a5a3a" />
    <group position={[0.75, 0.3, 0]} rotation={[0, 0, -a]}>
      <B s={[0.9, 0.08, 0.08]} pos={[-0.4, 0, 0]} c="#c98a3a" />
      <B s={[0.3, 0.42, 0.3]} pos={[-0.8, 0, 0]} c="#8a5a3a" />
      <B s={[0.32, 0.07, 0.32]} pos={[-0.8, 0.12, 0]} c={C.gold} e={C.gold} ei={0.8} />
      <B s={[0.32, 0.07, 0.32]} pos={[-0.8, -0.12, 0]} c={C.gold} e={C.gold} ei={0.8} />
    </group>
  </group>);
};

/** Estrado de tribunal genérico: mueble de madera, silla alta vacía detrás. */
export const Estrado: React.FC<P> = () => (
  <group>
    <B s={[2.0, 1.1, 0.7]} pos={[0, 0.55, 0]} c="#5a3a22" />
    <B s={[2.1, 0.08, 0.8]} pos={[0, 1.14, 0]} c="#8a5a3a" />
    <B s={[1.8, 0.06, 0.02]} pos={[0, 0.85, 0.36]} c={C.gold} e={C.gold} ei={0.8} />
    <B s={[0.7, 0.1, 0.6]} pos={[0, 0.95, -0.75]} c="#3b2f7a" />
    <B s={[0.7, 1.7, 0.12]} pos={[0, 1.4, -1.05]} c="#3b2f7a" />
    {[-0.3, 0.3].map((x) => <B key={x} s={[0.08, 0.9, 0.08]} pos={[x, 0.45, -0.75]} c="#241659" />)}
  </group>
);

/** Mesa de negociación con dos sillas enfrentadas. */
export const Mesa: React.FC<P> = () => (
  <group>
    <B s={[2.2, 0.08, 0.9]} pos={[0, 0.78, 0]} c="#8a5a3a" />
    {[[-1.0, -0.38], [1.0, -0.38], [-1.0, 0.38], [1.0, 0.38]].map(([x, z], i) => <B key={i} s={[0.08, 0.78, 0.08]} pos={[x, 0.39, z]} c="#5c3a26" />)}
  </group>
);
export const Silla: React.FC<P> = ({ p }) => {
  const { color = '#3b2f7a' } = p;
  return (<group>
    <B s={[0.5, 0.08, 0.5]} pos={[0, 0.48, 0]} c={color} />
    <B s={[0.5, 0.6, 0.08]} pos={[0, 0.8, -0.22]} c={color} />
    {[[-0.2, -0.2], [0.2, -0.2], [-0.2, 0.2], [0.2, 0.2]].map(([x, z], i) => <B key={i} s={[0.06, 0.48, 0.06]} pos={[x, 0.24, z]} c="#15102b" />)}
  </group>);
};

/** Oficina genérica chica (sin nombre): caja con ventanas encendidas y techo cian. */
export const Oficina: React.FC<P> = ({ p }) => {
  const { color = '#2d1a6e', h = 1.0 } = p;
  return (<group>
    <B s={[0.62, h, 0.62]} pos={[0, h / 2, 0]} c={color} />
    <B s={[0.68, 0.06, 0.68]} pos={[0, h + 0.03, 0]} c={C.cyan} e={C.cyan} ei={0.9} />
    {Array.from({ length: Math.round(h / 0.3) }, (_, i) => [-0.14, 0.14].map((x) => <B key={i + '' + x} s={[0.14, 0.12, 0.02]} pos={[x, 0.22 + i * 0.3, 0.315]} c={C.gold} e={C.gold} ei={1.1} />))}
  </group>);
};

/** Pantalla de chat genérica (sin logos): burbujas que aparecen de a una. */
export const Chat: React.FC<P> = ({ tt, p }) => {
  const { n = 5, every = 0.35, w = 1.5, h = 1.0 } = p;
  const rows = Array.from({ length: n }, (_, i) => i);
  return (<group>
    <B s={[w + 0.12, h + 0.12, 0.08]} c="#15102b" />
    <B s={[w, h, 0.02]} pos={[0, 0, 0.045]} c="#1d2140" />
    <B s={[w * 0.22, h, 0.025]} pos={[-w / 2 + w * 0.11, 0, 0.05]} c="#141733" />
    {[0, 1, 2, 3].map((i) => <B key={'c' + i} s={[w * 0.12, 0.08, 0.03]} pos={[-w / 2 + w * 0.11, h / 2 - 0.15 - i * 0.18, 0.055]} c="#3b3f6a" />)}
    {rows.map((i) => { const k = clamp((tt - i * every) / 0.2); if (k <= 0) return null; const right = i % 2 === 1; const bw = (0.35 + ((i * 37) % 5) * 0.06) * w;
      return <B key={i} s={[bw * k, 0.1, 0.03]} pos={[right ? w / 2 - 0.08 - bw / 2 : -w / 2 + w * 0.26 + bw / 2, h / 2 - 0.14 - i * 0.17, 0.06]} c={right ? '#8a6bff' : '#3b3f6a'} e={right ? '#8a6bff' : undefined} ei={0.6} />; })}
  </group>);
};

export const EXTRA = { papeleta: Papeleta, urna: Urna, mazo: Mazo, estrado: Estrado, mesa: Mesa, silla: Silla, oficina: Oficina, chat: Chat, label2: Label };
