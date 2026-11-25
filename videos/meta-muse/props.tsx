import React from 'react';
import { M, Label } from '../../src/kit/Props';
import { C, eo } from '../../src/kit/math';

type P = { t: number; tt: number; p: any };
type V3 = [number, number, number];
const B: React.FC<{ s: V3; pos?: V3; rot?: V3; c: string; e?: string; ei?: number }> = ({ s, pos, rot, c, e, ei }) => (
  <mesh position={pos} rotation={rot}><boxGeometry args={s} /><M c={c} e={e} ei={ei} /></mesh>
);

/** Robot (el agente): cabeza con ojos, antena, cuerpo */
export const Bot: React.FC<P> = ({ t, p }) => {
  const { color = '#8a6bff', eye = C.cyan } = p; const bl = Math.sin(t * 3) > 0.94 ? 0.2 : 1; const w = Math.sin(t * 5) * 0.25;
  return (<group position={[0, Math.sin(t * 2.6) * 0.04, 0]}>
    <B s={[0.62, 0.6, 0.4]} pos={[0, 0.5, 0]} c={color} />
    <B s={[0.3, 0.2, 0.02]} pos={[0, 0.5, 0.21]} c="#15102b" /><B s={[0.12, 0.06, 0.03]} pos={[0, 0.5, 0.22]} c={eye} e={eye} ei={2} />
    <B s={[0.74, 0.56, 0.5]} pos={[0, 1.12, 0]} c="#f4f1ff" />
    <B s={[0.6, 0.3, 0.02]} pos={[0, 1.14, 0.255]} c="#15102b" />
    {[-0.15, 0.15].map((x) => <B key={x} s={[0.13, 0.13 * bl, 0.03]} pos={[x, 1.15, 0.265]} c={eye} e={eye} ei={2.5} />)}
    <B s={[0.05, 0.22, 0.05]} pos={[0, 1.5, 0]} c="#8d8aa0" /><mesh position={[0, 1.65, 0]}><icosahedronGeometry args={[0.09, 0]} /><M c={C.magenta} e={C.magenta} ei={2.5} /></mesh>
    {[-1, 1].map((sd) => <group key={sd} position={[0.38 * sd, 0.7, 0]} rotation={[0, 0, sd * (0.5 + w * 0.3)]}><B s={[0.12, 0.42, 0.14]} pos={[0, -0.18, 0]} c="#f4f1ff" /></group>)}
    {[-0.16, 0.16].map((x) => <B key={x} s={[0.18, 0.2, 0.26]} pos={[x, 0.1, 0.02]} c="#2b2740" />)}
  </group>);
};

/** Celular grande con cabecera; las burbujas se ponen encima con label */
export const BigPhone: React.FC<P> = ({ t, tt, p }) => {
  const { w = 1.7, h = 3.0, title = 'CHAT', head = '#128c5e' } = p;
  return (<group>
    <B s={[w + 0.14, h + 0.14, 0.12]} c="#0c0a18" /><B s={[w, h, 0.13]} c="#141c36" />
    <B s={[w, 0.4, 0.14]} pos={[0, h / 2 - 0.2, 0]} c={head} e={head} ei={0.4} />
    <group position={[0, h / 2 - 0.2, 0.075]}><Label t={t} tt={tt} p={{ text: title, w: w * 0.9, h: 0.32, size: 0.7, weight: 900 }} /></group>
    <B s={[0.4, 0.04, 0.14]} pos={[0, -h / 2 + 0.1, 0.005]} c="#8d8aa0" />
  </group>);
};

/** Carrito que se llena */
export const Cart: React.FC<P> = ({ tt, p }) => {
  const { n = 6, dur = 1.2, from = 0 } = p; const vis = Math.round(from + (n - from) * eo(tt / dur));
  const cols = [C.gold, C.magenta, C.green, C.cyan, '#ff7a3d', '#f4f1ff'];
  return (<group>
    <B s={[1.0, 0.06, 0.66]} pos={[0, 0.34, 0]} c="#c9c4de" />
    {[[-0.5, 0], [0.5, 0]].map(([x], i) => <B key={i} s={[0.05, 0.5, 0.66]} pos={[x, 0.6, 0]} c="#c9c4de" />)}
    {[-0.33, 0.33].map((z) => <B key={z} s={[1.0, 0.5, 0.05]} pos={[0, 0.6, z]} c="#8d8aa0" />)}
    <B s={[0.06, 0.5, 0.06]} pos={[-0.62, 0.95, 0]} rot={[0, 0, 0.4]} c="#c9c4de" /><B s={[0.08, 0.08, 0.7]} pos={[-0.72, 1.17, 0]} c={C.magenta} e={C.magenta} ei={1.2} />
    {[[-0.38, -0.25], [0.38, -0.25], [-0.38, 0.25], [0.38, 0.25]].map(([x, z], i) => <mesh key={i} position={[x, 0.12, z]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.12, 0.12, 0.08, 8]} /><M c="#15102b" /></mesh>)}
    {Array.from({ length: vis }, (_, i) => <B key={i} s={[0.3, 0.32 + (i % 3) * 0.1, 0.28]} pos={[-0.3 + (i % 3) * 0.3, 0.56 + Math.floor(i / 3) * 0.36 + (i % 3) * 0.05, i % 2 ? 0.12 : -0.12]} rot={[0, i * 0.4, 0]} c={cols[i % 6]} e={cols[i % 6]} ei={0.35} />)}
  </group>);
};

/** Candado */
export const Lock: React.FC<P> = ({ p }) => { const { color = C.gold } = p; return (<group>
  <B s={[0.7, 0.55, 0.22]} c={color} e={color} ei={0.5} /><B s={[0.1, 0.2, 0.23]} pos={[0, -0.02, 0.01]} c="#15102b" />
  <B s={[0.1, 0.4, 0.1]} pos={[-0.2, 0.45, 0]} c="#c9c4de" /><B s={[0.1, 0.4, 0.1]} pos={[0.2, 0.45, 0]} c="#c9c4de" /><B s={[0.5, 0.1, 0.1]} pos={[0, 0.66, 0]} c="#c9c4de" />
</group>); };

/** Tarjeta */
export const Card: React.FC<P> = ({ t, p }) => { const { color = '#2f6bff' } = p; return (<group rotation={[0, Math.sin(t * 1.5) * 0.3, 0.08]}>
  <B s={[1.3, 0.82, 0.05]} c={color} e={color} ei={0.4} /><B s={[1.3, 0.14, 0.06]} pos={[0, 0.2, 0]} c="#15102b" />
  <B s={[0.22, 0.17, 0.07]} pos={[-0.38, -0.08, 0]} c={C.gold} e={C.gold} ei={1} />
  {[0, 1, 2, 3].map((i) => <B key={i} s={[0.2, 0.05, 0.07]} pos={[-0.42 + i * 0.27, -0.28, 0]} c="#f4f1ff" />)}
</group>); };

export const EXTRA = { bot: Bot, bigphone: BigPhone, cart: Cart, lock: Lock, card: Card };
