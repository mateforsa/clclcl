import React from 'react';
import { M, Label } from '../../src/kit/Props';
import { C, clamp, eo, lerp } from '../../src/kit/math';

type P = { t: number; tt: number; p: any };
type V3 = [number, number, number];
const B: React.FC<{ s: V3; pos?: V3; rot?: V3; c: string; e?: string; ei?: number }> = ({ s, pos, rot, c, e, ei }) => (
  <mesh position={pos} rotation={rot}><boxGeometry args={s} /><M c={c} e={e} ei={ei} /></mesh>
);
const CANDY = ['#ff7a3d', C.gold, C.magenta, '#3ee07a', C.blue, C.cyan, '#ff5a6e'];

/** Kiosco genérico de frente a +z: ventanita con golosinas sin marca y una persiana que baja.
 *  p: w, h, color, down (seg. desde que aparece en que baja la persiana; omitir = abierto), dur, closed (ya cerrado), sign, seed */
export const Kiosco: React.FC<P> = ({ t, tt, p }) => {
  const { w = 1.3, h = 1.9, d = 0.9, color = '#2d1a6e', down, dur = 0.7, closed = false, sign = 'KIOSCO', seed = 0, glow = C.cyan } = p;
  const ow = w - 0.3, oy0 = 0.75, oy1 = 1.55, oh = oy1 - oy0;
  const k = closed ? 1 : down === undefined ? 0 : eo((tt - down) / dur);
  const sh = oh * k; const nS = Math.max(1, Math.round(sh / 0.08));
  const lit = 1 - k;
  return (
    <group>
      <B s={[w, h, d]} pos={[0, h / 2, 0]} c={color} />
      <B s={[w + 0.08, 0.08, d + 0.08]} pos={[0, h + 0.04, 0]} c="#15102b" />
      {/* hueco de la ventanita */}
      <B s={[ow, oh, 0.05]} pos={[0, (oy0 + oy1) / 2, d / 2 + 0.005]} c="#3a2a1a" e="#ffb86b" ei={0.35 * lit} />
      {/* golosinas genéricas en dos estantes */}
      {[0, 1].map((r) => <group key={r} position={[0, oy0 + 0.06 + r * 0.38, d / 2 + 0.03]}>
        <B s={[ow, 0.03, 0.08]} pos={[0, -0.02, 0]} c="#8d8aa0" />
        {Array.from({ length: 5 }, (_, i) => { const c = CANDY[(i * 3 + r * 2 + seed) % CANDY.length]; const hh = 0.16 + ((i + r + seed) % 3) * 0.04;
          return <B key={i} s={[ow / 6.2, hh, 0.06]} pos={[-ow / 2 + ow / 10 + i * (ow / 5), hh / 2, 0.01]} c={c} e={c} ei={0.3 * lit + 0.05} />; })}
      </group>)}
      {/* mostrador */}
      <B s={[ow + 0.16, 0.06, 0.22]} pos={[0, oy0 - 0.03, d / 2 + 0.1]} c="#8a5a3a" />
      {/* persiana: listones grises desde arriba */}
      {k > 0.001 && <group position={[0, oy1, d / 2 + 0.09]}>
        <B s={[ow + 0.06, sh, 0.03]} pos={[0, -sh / 2, 0]} c="#6f6a88" />
        {Array.from({ length: nS }, (_, i) => <B key={i} s={[ow + 0.07, 0.012, 0.04]} pos={[0, -i * (sh / nS) - 0.01, 0]} c="#4a4566" />)}
      </group>}
      <B s={[ow + 0.16, 0.1, 0.12]} pos={[0, oy1 + 0.05, d / 2 + 0.06]} c="#4a4566" />
      {/* cartel genérico */}
      {sign && <group position={[0, h - 0.17, d / 2 + 0.04]}>
        <B s={[w - 0.1, 0.26, 0.04]} c="#15102b" e={glow} ei={0.15 * lit} />
        <group position={[0, 0, 0.025]}><Label t={t} tt={tt} p={{ text: sign, w: w - 0.16, h: 0.22, color: lit > 0.5 ? glow : '#8d8aa0', size: 0.8, weight: 900 }} /></group>
      </group>}
    </group>
  );
};

/** Alfajor genérico: dos tapas, relleno y baño; con `wrap` va en envoltorio liso sin marca. p: r, wrap, coat */
export const Alfajor: React.FC<P> = ({ p }) => {
  const { r = 0.32, wrap, coat = '#4a2a1a' } = p;
  if (wrap) return (
    <group rotation={[Math.PI / 2, 0, 0]}>
      <mesh><cylinderGeometry args={[r, r, 0.2, 18]} /><M c={wrap} e={wrap} ei={0.25} /></mesh>
      <mesh><cylinderGeometry args={[r + 0.05, r + 0.05, 0.03, 18]} /><M c={wrap} /></mesh>
      <mesh position={[0, 0.101, 0]}><cylinderGeometry args={[r * 0.55, r * 0.55, 0.005, 18]} /><M c="#f4f1ff" e="#f4f1ff" ei={0.15} /></mesh>
    </group>);
  return (
    <group rotation={[Math.PI / 2, 0, 0]}>
      <mesh position={[0, -0.06, 0]}><cylinderGeometry args={[r, r, 0.08, 18]} /><M c={coat} /></mesh>
      <mesh><cylinderGeometry args={[r * 0.96, r * 0.96, 0.05, 18]} /><M c="#e0a85a" e="#c98a3a" ei={0.3} /></mesh>
      <mesh position={[0, 0.06, 0]}><cylinderGeometry args={[r, r, 0.08, 18]} /><M c={coat} /></mesh>
    </group>);
};

/** Pila de alfajores acostados que crece. p: n, dur, from, r */
export const PilaAlfa: React.FC<P> = ({ tt, p }) => {
  const { n = 8, dur = 1.0, from = 0, r = 0.3, wraps = [C.gold, '#c2307e', C.cyan, '#ff7a3d'] } = p;
  const vis = Math.round(lerp(from, n, eo(tt / dur)));
  return (
    <group>{Array.from({ length: vis }, (_, i) => { const c = wraps[i % wraps.length];
      return <group key={i} position={[Math.sin(i * 2.1) * 0.025, 0.1 + i * 0.2, Math.cos(i * 1.3) * 0.02]} rotation={[0, i * 0.4, 0]}>
        <mesh><cylinderGeometry args={[r, r, 0.18, 18]} /><M c={c} e={c} ei={0.3} /></mesh>
        <mesh><cylinderGeometry args={[r + 0.04, r + 0.04, 0.03, 18]} /><M c={c} /></mesh>
      </group>; })}</group>
  );
};

/** Barra de chocolate genérica, con envoltorio liso en la mitad. p: w, wrap */
export const Choco: React.FC<P> = ({ p }) => {
  const { w = 0.9, wrap = C.magenta } = p; const h = w * 0.42;
  return (
    <group>
      <B s={[w, h, 0.07]} c="#5a321e" />
      {Array.from({ length: 3 }, (_, i) => <B key={i} s={[w / 3 - 0.04, h / 2 - 0.04, 0.08]} pos={[-w / 3 + i * (w / 3), h / 4, 0]} c="#6b3d24" />)}
      <B s={[w * 0.55, h + 0.03, 0.1]} pos={[w * 0.24, 0, 0]} c={wrap} e={wrap} ei={0.35} />
    </group>
  );
};

/** Botella de gaseosa genérica, sin etiqueta. */
export const Gaseosa: React.FC<P> = ({ p }) => {
  const { cap = C.red } = p;
  return (
    <group>
      <mesh position={[0, 0.28, 0]}><cylinderGeometry args={[0.13, 0.13, 0.56, 12]} /><M c="#3a1a10" e="#5a2a18" ei={0.3} /></mesh>
      <mesh position={[0, 0.64, 0]}><cylinderGeometry args={[0.05, 0.13, 0.18, 12]} /><M c="#3a1a10" /></mesh>
      <mesh position={[0, 0.77, 0]}><cylinderGeometry args={[0.05, 0.05, 0.08, 10]} /><M c="#3a1a10" /></mesh>
      <mesh position={[0, 0.83, 0]}><cylinderGeometry args={[0.06, 0.06, 0.05, 10]} /><M c={cap} e={cap} ei={0.5} /></mesh>
    </group>
  );
};

/** Fila de hormigas que cruzan en x llevando una moneda. p: n, speed, gap, len, carry, stop (seg. en que se van) */
export const Hormigas: React.FC<P> = ({ tt, p }) => {
  const { n = 6, speed = 0.7, gap = 0.55, len = 4, color = '#ff7a3d', carry = true } = p;
  return (
    <group>{Array.from({ length: n }, (_, i) => {
      const x = -len / 2 + ((tt * speed + i * gap) % len); const leg = Math.sin(tt * 18 + i) * 0.35;
      return <group key={i} position={[x, 0, 0]}>
        {[[-0.14, 0.07], [0, 0.06], [0.14, 0.075]].map(([dx, rr], j) => <mesh key={j} position={[dx, 0.1, 0]}><sphereGeometry args={[rr, 8, 6]} /><M c={color} e={color} ei={0.35} /></mesh>)}
        {[-0.08, 0, 0.08].map((dx) => [-1, 1].map((sd) => <B key={dx + '' + sd} s={[0.012, 0.012, 0.16]} pos={[dx, 0.05, sd * 0.07]} rot={[0, leg * sd, 0]} c="#15102b" />))}
        {carry && <mesh position={[0.02, 0.26, 0]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.09, 0.09, 0.025, 14]} /><M c={C.gold} e={C.gold} ei={0.6} /></mesh>}
      </group>; })}</group>
  );
};

/** Plato con cubiertos (opcional: un alfajor encima). p: r, alfajor */
export const Plato: React.FC<P> = ({ t, tt, p }) => {
  const { r = 0.5, alfajor = false, wrap } = p;
  return (
    <group>
      <mesh position={[0, 0.02, 0]}><cylinderGeometry args={[r, r * 0.8, 0.04, 22]} /><M c="#d9d4ee" /></mesh>
      <mesh position={[0, 0.045, 0]}><cylinderGeometry args={[r * 0.7, r * 0.7, 0.01, 22]} /><M c="#c4bde0" /></mesh>
      <B s={[0.04, 0.02, r * 1.5]} pos={[-r - 0.14, 0.01, 0]} c="#8d8aa0" />
      <B s={[0.05, 0.02, r * 1.5]} pos={[r + 0.14, 0.01, 0]} c="#8d8aa0" />
      {alfajor && <group position={[0, 0.14, 0]} rotation={[-Math.PI / 2, 0, 0]}><Alfajor t={t} tt={tt} p={{ r: r * 0.55, wrap }} /></group>}
    </group>
  );
};

/** Paredes oscuras por encima de y0, para que nada claro quede detrás de los subtítulos en el set 'room'. */
export const Pared: React.FC<P> = ({ p }) => {
  const { y0 = 2.3, color = '#24194f' } = p; const h = 8 - y0;
  return (<group>
    <mesh position={[0, y0 + h / 2, -3.78]}><boxGeometry args={[9, h, 0.02]} /><meshBasicMaterial color={color} toneMapped={false} /></mesh>
    {[-1, 1].map((sx) => <mesh key={sx} position={[sx * 4.38, y0 + h / 2, 0]}><boxGeometry args={[0.02, h, 8]} /><meshBasicMaterial color={color} toneMapped={false} /></mesh>)}
    <B s={[9, 0.06, 0.03]} pos={[0, y0, -3.76]} c={C.cyan} e={C.cyan} ei={1.2} />
    {[-1, 1].map((sx) => <B key={'m' + sx} s={[0.03, 0.06, 8]} pos={[sx * 4.37, y0, 0]} c={C.cyan} e={C.cyan} ei={1.2} />)}
  </group>);
};

/** Contador de padrón: fila de casillas que se apagan de izquierda a derecha (esquema). p: n, off (cuántas se apagan), every, delay */
export const Padron: React.FC<P> = ({ tt, p }) => {
  const { n = 10, off = 5, every = 0.15, delay = 0.2, cols = 5, on = C.cyan, sp = 0.5 } = p;
  return (
    <group>{Array.from({ length: n }, (_, i) => { const x = (i % cols) - (cols - 1) / 2, y = Math.floor(i / cols);
      const gone = i < off && tt > delay + i * every; const k = gone ? clamp((tt - delay - i * every) / 0.25) : 0;
      return <group key={i} position={[x * sp, 0.25 + y * 0.55, 0]}>
        <B s={[0.38, lerp(0.42, 0.06, k), 0.3]} pos={[0, -lerp(0, 0.18, k), 0]} c={gone ? '#4a4566' : on} e={gone ? undefined : on} ei={0.5} />
      </group>; })}</group>
  );
};

export const EXTRA: Record<string, React.FC<P>> = { kiosco: Kiosco, alfajor: Alfajor, pila: PilaAlfa, choco: Choco, gaseosa: Gaseosa, hormigas: Hormigas, plato: Plato, pared: Pared, padron: Padron };
