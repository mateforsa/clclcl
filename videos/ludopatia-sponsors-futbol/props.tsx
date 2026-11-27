import React from 'react';
import { M, Label } from '../../src/kit/Props';
import { C, clamp, eo, lerp } from '../../src/kit/math';

type P = { t: number; tt: number; p: any };
type V3 = [number, number, number];
const B: React.FC<{ s: V3; pos?: V3; rot?: V3; c: string; e?: string; ei?: number }> = ({ s, pos, rot, c, e, ei }) => (
  <mesh position={pos} rotation={rot}><boxGeometry args={s} /><M c={c} e={e} ei={ei} /></mesh>
);
const on = (tt: number, at: number | undefined) => at !== undefined && tt >= at;

/** Camiseta genérica (sin escudo ni marca) colgada de un soporte, de frente a +z. Origen en el piso.
 *  p: color, sleeve, stripe, chest: 'empty' | 'lit' | 'q' | 'off'; litAt / offAt (seg. desde que aparece) cambian el pecho;
 *  glow (color del pecho encendido), pole (alto del soporte) */
export const Camiseta: React.FC<P> = ({ t, tt, p }) => {
  const { color = '#8a6bff', sleeve, stripe, chest = 'empty', litAt, offAt, qAt, glow = C.cyan, pole = 0.9, mark } = p;
  const y0 = pole; const sl = sleeve ?? color;
  let st = chest; if (on(tt, litAt)) st = 'lit'; if (on(tt, qAt)) st = 'q'; if (on(tt, offAt)) st = 'off';
  const k = st === 'lit' && litAt !== undefined ? eo((tt - litAt) / 0.3) : 1;
  const mk = mark !== undefined && tt >= mark ? eo((tt - mark) / 0.3) : 0;
  return (
    <group>
      {/* soporte */}
      <B s={[0.08, y0 + 0.1, 0.08]} pos={[0, (y0 + 0.1) / 2, -0.05]} c="#15102b" />
      <mesh position={[0, 0.03, -0.05]}><cylinderGeometry args={[0.35, 0.4, 0.06, 12]} /><M c="#15102b" /></mesh>
      <group position={[0, y0, 0]}>
        <B s={[1.15, 1.35, 0.3]} pos={[0, 0.68, 0]} c={color} />
        {stripe && <B s={[0.22, 1.35, 0.31]} pos={[0, 0.68, 0]} c={stripe} />}
        {[-1, 1].map((sd) => <B key={sd} s={[0.5, 0.42, 0.28]} pos={[sd * 0.72, 1.12, 0]} rot={[0, 0, sd * -0.55]} c={sl} />)}
        <B s={[0.44, 0.1, 0.32]} pos={[0, 1.33, 0]} c="#15102b" />
        <B s={[0.18, 0.16, 0.02]} pos={[0, 1.24, 0.151]} c="#15102b" />
        {/* lugar del sponsor en el pecho */}
        {st === 'empty' && <group position={[0, 0.78, 0.155]}>
          <B s={[0.78, 0.34, 0.01]} c="#1b1340" />
          {[[0, 0.17, 0.78, 0.03], [0, -0.17, 0.78, 0.03], [-0.39, 0, 0.03, 0.37], [0.39, 0, 0.03, 0.37]].map(([x, y, w, h], i) =>
            <B key={i} s={[w, h, 0.012]} pos={[x, y, 0.004]} c="#cfc8ff" e="#cfc8ff" ei={0.25} />)}
        </group>}
        {st === 'lit' && <B s={[0.78 * k, 0.34 * k, 0.012]} pos={[0, 0.78, 0.156]} c={glow} e={glow} ei={0.9} />}
        {st === 'off' && <B s={[0.78, 0.34, 0.012]} pos={[0, 0.78, 0.156]} c="#4a4566" />}
        {st === 'q' && <group position={[0, 0.78, 0.155]}>
          <B s={[0.78, 0.34, 0.01]} c="#1b1340" />
          <group position={[0, 0, 0.026]}><Label t={t} tt={tt} p={{ text: '?', w: 0.4, h: 0.34, size: 0.95, color: C.gold, weight: 900 }} /></group>
        </group>}
        {mk > 0 && <mesh position={[0, -0.12, 0.2]} rotation={[-Math.PI / 2, 0, 0]} scale={mk}><ringGeometry args={[0.55, 0.62, 32]} /><meshBasicMaterial color={C.red} toneMapped={false} /></mesh>}
      </group>
    </group>
  );
};

/** Valija con fajos genéricos. Origen en el piso. p: w, d, h, color, open (seg. en que se abre; 0 = abierta desde el inicio), rows, cols */
export const Valija: React.FC<P> = ({ tt, p }) => {
  const { w = 1.1, d = 0.7, h = 0.32, color = '#6b4a2a', open = 0, rows = 2, cols = 4, bill = '#3aa860' } = p;
  const a = open === null ? 0 : open <= 0 ? -1.95 : lerp(0, -1.95, eo((tt - open) / 0.45));
  const fw = (w - 0.12) / cols, fd = (d - 0.12) / rows;
  return (
    <group>
      <B s={[w, h, d]} pos={[0, h / 2, 0]} c={color} />
      <B s={[w - 0.08, 0.02, d - 0.08]} pos={[0, h + 0.002, 0]} c="#2a1a10" />
      {a < -0.3 && Array.from({ length: rows * cols }, (_, i) => { const cx = i % cols, cz = Math.floor(i / cols);
        return <group key={i} position={[-w / 2 + 0.06 + fw * (cx + 0.5), h + 0.06, -d / 2 + 0.06 + fd * (cz + 0.5)]}>
          <B s={[fw - 0.03, 0.12, fd - 0.03]} c={bill} e={bill} ei={0.25} />
          <B s={[0.07, 0.125, fd - 0.02]} c="#bfe8c4" />
        </group>; })}
      <group position={[0, h, -d / 2]} rotation={[a, 0, 0]}>
        <B s={[w, 0.08, d]} pos={[0, 0.04, d / 2]} c={color} />
        <B s={[0.34, 0.06, 0.05]} pos={[0, 0.02, d + 0.03]} c="#d8a23a" />
      </group>
      <B s={[0.36, 0.06, 0.08]} pos={[0, h * 0.7, d / 2 + 0.04]} c="#2a1a10" />
    </group>
  );
};

/** Pila de fajos que crece. p: n, dur, from, cols, rows */
export const Fajos: React.FC<P> = ({ tt, p }) => {
  const { n = 18, dur = 1.0, from = 0, cols = 3, rows = 2, bill = '#3aa860' } = p;
  const vis = Math.round(lerp(from, n, eo(tt / dur))); const per = cols * rows;
  return (
    <group>{Array.from({ length: vis }, (_, i) => { const l = Math.floor(i / per), j = i % per; const cx = j % cols, cz = Math.floor(j / cols);
      return <group key={i} position={[(cx - (cols - 1) / 2) * 0.46 + (l % 2) * 0.04, 0.07 + l * 0.15, (cz - (rows - 1) / 2) * 0.26]} rotation={[0, (i % 3 - 1) * 0.06, 0]}>
        <B s={[0.42, 0.13, 0.22]} c={bill} e={bill} ei={0.25} />
        <B s={[0.08, 0.135, 0.23]} c="#bfe8c4" />
      </group>; })}</group>
  );
};

/** Dado genérico. p: size */
export const Dado: React.FC<P> = ({ p }) => {
  const { size = 0.45, color = '#f0ecff' } = p; const s = size / 2 + 0.006; const r = size * 0.09;
  const pip = (pos: V3, k: number) => <mesh key={k} position={pos}><sphereGeometry args={[r, 6, 4]} /><M c="#1a1030" /></mesh>;
  const q = size * 0.25;
  return (
    <group>
      <B s={[size, size, size]} c={color} />
      {/* 5 al frente, 3 arriba, 2 a la derecha */}
      {[[0, 0], [-q, -q], [q, q], [-q, q], [q, -q]].map(([x, y], i) => pip([x, y, s], i))}
      {[[0, 0], [-q, -q], [q, q]].map(([x, z], i) => pip([x, s, z], 10 + i))}
      {[[-q, q], [q, -q]].map(([y, z], i) => pip([s, y, z], 20 + i))}
    </group>
  );
};

/** Pila de fichas de casino genéricas. p: n, color */
export const Fichas: React.FC<P> = ({ tt, p }) => {
  const { n = 6, color = C.red, dur = 0.5 } = p; const vis = Math.max(1, Math.round(n * eo(tt / dur)));
  return (
    <group>{Array.from({ length: vis }, (_, i) => <group key={i} position={[Math.sin(i * 2.3) * 0.015, 0.035 + i * 0.065, 0]}>
      <mesh><cylinderGeometry args={[0.2, 0.2, 0.06, 16]} /><M c={color} e={color} ei={0.35} /></mesh>
      <mesh><cylinderGeometry args={[0.13, 0.13, 0.062, 16]} /><M c="#f0ecff" /></mesh>
    </group>)}</group>
  );
};

/** Hemiciclo genérico: bancas en arco que se encienden en verde de izquierda a derecha.
 *  p: rows (bancas por fila), on (seg. en que arrancan), every, rim (seg. en que se enciende el borde) */
export const Hemiciclo: React.FC<P> = ({ tt, p }) => {
  const { rows = [14, 17, 19, 22], on: t0 = 99, every = 0.008, rim, r0 = 1.2, dr = 0.42 } = p;
  const seats: { x: number; y: number; z: number; a: number; ry: number }[] = [];
  rows.forEach((n: number, r: number) => { const R = r0 + r * dr;
    for (let i = 0; i < n; i++) { const a = lerp(-1.35, 1.35, n === 1 ? 0.5 : i / (n - 1)); seats.push({ x: R * Math.sin(a), y: 0.12 + r * 0.16, z: -R * Math.cos(a), a, ry: -a }); } });
  const order = seats.map((s, i) => i).sort((i, j) => seats[i].a - seats[j].a);
  const rank: number[] = []; order.forEach((idx, k) => { rank[idx] = k; });
  const rimK = rim !== undefined ? clamp((tt - rim) / 0.3) : 0;
  return (
    <group>
      {seats.map((s, i) => { const lit = tt >= t0 + rank[i] * every; const c = lit ? C.green : '#5a5480';
        return <group key={i} position={[s.x, s.y, s.z]} rotation={[0, s.ry, 0]}>
          <B s={[0.3, s.y, 0.34]} pos={[0, -s.y / 2, -0.02]} c={i % 2 ? '#241659' : '#2d1a6e'} />
          <B s={[0.16, 0.14, 0.14]} pos={[0, 0.07, 0]} c={c} e={lit ? C.green : undefined} ei={0.8} />
          <B s={[0.16, 0.12, 0.04]} pos={[0, 0.2, -0.06]} c="#15102b" />
        </group>; })}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[r0 + rows.length * dr - 0.1, r0 + rows.length * dr - 0.02, 40, 1, Math.PI / 2 - 1.45, 2.9]} />
        <meshBasicMaterial color={C.cyan} transparent opacity={0.25 + 0.75 * rimK} toneMapped={false} />
      </mesh>
      {/* estrado */}
      <B s={[0.9, 0.5, 0.4]} pos={[0, 0.25, 0.2]} c="#3a2a8a" />
      <B s={[0.94, 0.05, 0.44]} pos={[0, 0.52, 0.2]} c={C.gold} e={C.gold} ei={0.5} />
    </group>
  );
};

/** Hoja de la ley (genérica): papel con "LEY" y renglones. p: w, h, sello (seg. en que aparece un sello), selloColor */
export const Ley: React.FC<P> = ({ t, tt, p }) => {
  const { w = 0.9, h = 1.2, paper = '#d9d2f2', sello, selloColor = C.green } = p;
  const sk = sello !== undefined && tt >= sello ? eo((tt - sello) / 0.25) : 0;
  return (
    <group>
      <B s={[w, h, 0.03]} c={paper} />
      <group position={[0, h * 0.34, 0.035]}><Label t={t} tt={tt} p={{ text: 'LEY', w: w * 0.8, h: h * 0.22, size: 0.8, color: '#1a1030', weight: 900 }} /></group>
      {Array.from({ length: 5 }, (_, i) => <B key={i} s={[w * (i === 4 ? 0.45 : 0.72), 0.035, 0.01]} pos={[i === 4 ? -w * 0.13 : 0, h * 0.1 - i * h * 0.12, 0.02]} c="#8d86b0" />)}
      {sk > 0 && <mesh position={[w * 0.22, -h * 0.34, 0.04]} scale={lerp(1.6, 1, sk)}><ringGeometry args={[0.14, 0.19, 24]} /><meshBasicMaterial color={selloColor} toneMapped={false} transparent opacity={sk} /></mesh>}
    </group>
  );
};

/** Reloj de arena que se vacía. p: dur, flip (seg. en que gira), color */
export const Reloj: React.FC<P> = ({ tt, p }) => {
  const { dur = 3, color = C.gold, flip } = p;
  const fk = flip !== undefined ? eo((tt - flip) / 0.4) : 1; const tt2 = flip !== undefined ? Math.max(0, tt - flip - 0.4) : tt;
  const k = clamp(tt2 / dur); const top = 1 - k;
  return (
    <group rotation={[0, 0, (1 - fk) * Math.PI]}>
      <B s={[0.7, 0.08, 0.5]} pos={[0, 0.04, 0]} c="#8a5a3a" /><B s={[0.7, 0.08, 0.5]} pos={[0, 1.16, 0]} c="#8a5a3a" />
      {[-0.28, 0.28].map((x) => <B key={x} s={[0.05, 1.1, 0.05]} pos={[x, 0.6, 0.18]} c="#8a5a3a" />)}
      <mesh position={[0, 0.88, 0]}><cylinderGeometry args={[0.24, 0.03, 0.5, 10, 1, true]} /><M c="#8fd8ff" e="#8fd8ff" ei={0.15} o={0.35} /></mesh>
      <mesh position={[0, 0.33, 0]}><cylinderGeometry args={[0.03, 0.24, 0.5, 10, 1, true]} /><M c="#8fd8ff" e="#8fd8ff" ei={0.15} o={0.35} /></mesh>
      {top > 0.02 && <mesh position={[0, 0.63 + 0.25 * (1 - top) + 0.25 * top * 0.5 + 0.02, 0]}><cylinderGeometry args={[0.03 + 0.2 * top, 0.03, 0.45 * top, 10]} /><M c={color} e={color} ei={0.4} /></mesh>}
      {k > 0.02 && <mesh position={[0, 0.08 + 0.2 * k, 0]}><cylinderGeometry args={[0.03 + 0.18 * (1 - k), 0.22, 0.4 * k, 10]} /><M c={color} e={color} ei={0.4} /></mesh>}
      {k > 0 && k < 1 && <B s={[0.015, 0.5, 0.015]} pos={[0, 0.4, 0]} c={color} e={color} ei={0.6} />}
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

/** Texto plano apoyado en un panel oscuro (texto 2 cm delante del panel). p: text, w, h, color, bg, size */
export const Panel: React.FC<P> = ({ t, tt, p }) => {
  const { text = '', w = 1.4, h = 0.4, color = '#fff', bg = '#15102b', size = 0.6, weight = 800, border } = p;
  return (<group>
    <B s={[w, h, 0.05]} pos={[0, 0, -0.025]} c={bg} e={border} ei={border ? 0.15 : 0} />
    <group position={[0, 0, 0.02]}><Label t={t} tt={tt} p={{ text, w: w * 0.96, h: h * 0.9, size, color, weight }} /></group>
  </group>);
};

export const EXTRA: Record<string, React.FC<P>> = { camiseta: Camiseta, valija: Valija, fajos: Fajos, dado: Dado, fichas: Fichas, hemiciclo: Hemiciclo, ley: Ley, reloj: Reloj, pared: Pared, panel: Panel };
