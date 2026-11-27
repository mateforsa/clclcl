import React, { useMemo } from 'react';
import { M, Label, Person } from '../../src/kit/Props';
import { C, clamp, eo, eio, lerp, pop, rnd } from '../../src/kit/math';

type P = { t: number; tt: number; p: any };
type V3 = [number, number, number];
const PI = Math.PI;
const B: React.FC<{ s: V3; pos?: V3; rot?: V3; c: string; e?: string; ei?: number }> = ({ s, pos, rot, c, e, ei }) => (
  <mesh position={pos} rotation={rot}><boxGeometry args={s} /><M c={c} e={e} ei={ei} /></mesh>
);
const Cyl: React.FC<{ r: number; r2?: number; h: number; pos?: V3; rot?: V3; seg?: number; c: string; e?: string; ei?: number }> = ({ r, r2, h, pos, rot, seg = 10, c, e, ei }) => (
  <mesh position={pos} rotation={rot}><cylinderGeometry args={[r2 ?? r, r, h, seg]} /><M c={c} e={e} ei={ei} /></mesh>
);
/** valor animado: de `from` a `to` entre `at` y `at + dur` (segundos del plano) */
const anim = (t: number, from: number, to: number, at = 0, dur = 0.8) => lerp(from, to, eio((t - at) / dur));

export const MAIZ = '#f2b632';
export const SOJA = '#b9dc6e';
const VERDE = '#2f7a43';

/** Suelo oscuro grande (tapa la grilla cerca de cámara). p: w, d, color */
export const Suelo: React.FC<P> = ({ p }) => {
  const { w = 40, d = 30, color = '#1a1433' } = p;
  return <B s={[w, 0.02, d]} pos={[0, 0.01, 0]} c={color} />;
};

/** Parcela sembrada: surcos + plantas bajas. p: w, d, rows, kind ('maiz' | 'soja' | 'tierra'), seed, grow (cuándo crecen), dur */
export const Campo: React.FC<P> = ({ t, p }) => {
  const { w = 3, d = 2, rows = 6, kind = 'maiz', seed = 1, grow, dur = 0.8, per = 7, ground = '#3a2a20' } = p;
  const k = grow === undefined ? 1 : eo((t - grow) / dur);
  const pl = useMemo(() => { const r = rnd(seed); const out: [number, number, number][] = [];
    for (let i = 0; i < rows; i++) for (let j = 0; j < per; j++) out.push([-w / 2 + (j + 0.5) * (w / per) + (r() - 0.5) * 0.06, -d / 2 + (i + 0.5) * (d / rows), 0.8 + r() * 0.4]);
    return out; }, [w, d, rows, per, seed]);
  return (
    <group>
      <B s={[w, 0.05, d]} pos={[0, 0.025, 0]} c={ground} />
      {Array.from({ length: rows }, (_, i) => <B key={i} s={[w * 0.98, 0.03, (d / rows) * 0.42]} pos={[0, 0.06, -d / 2 + (i + 0.5) * (d / rows)]} c={kind === 'tierra' ? '#5a3b22' : '#1f4a2c'} />)}
      {kind !== 'tierra' && k > 0 && pl.map(([x, z, s], i) => kind === 'maiz'
        ? <group key={i} position={[x, 0.06, z]} scale={[1, k * s, 1]}>
            <mesh position={[0, 0.22, 0]}><coneGeometry args={[0.055, 0.44, 4]} /><M c={VERDE} /></mesh>
            <B s={[0.16, 0.02, 0.03]} pos={[0, 0.2, 0]} rot={[0, (i % 3) * 1.1, 0.4]} c="#3f9a52" />
          </group>
        : <mesh key={i} position={[x, 0.06 + 0.07 * k * s, z]} scale={[k, k * 0.7, k]}><icosahedronGeometry args={[0.09, 0]} /><M c="#4f9a3a" /></mesh>)}
    </group>
  );
};

/** Montaña de granos (cono low-poly) cuyo alto va de h0 a h1 entre `at` y at+dur. El radio acompaña al alto. p: h0, h1, at, dur, color, ratio */
export const Pila: React.FC<P> = ({ t, p }) => {
  const { h0 = 1, h1, at = 0, dur = 1.0, color = MAIZ, ratio = 1.6, seed = 3 } = p;
  const h = h1 === undefined ? h0 : anim(t, h0, h1, at, dur); const r = h * ratio;
  const bumps = useMemo(() => { const q = rnd(seed); return Array.from({ length: 14 }, () => [q() * PI * 2, 0.25 + q() * 0.6, 0.6 + q() * 0.5]); }, [seed]);
  return (
    <group>
      <mesh position={[0, h / 2, 0]}><coneGeometry args={[r, h, 9, 2]} /><M c={color} e={color} ei={0.18} /></mesh>
      {bumps.map(([a, u, s], i) => { const y = h * u; const rr = r * (1 - u) * 0.98;
        return <mesh key={i} position={[Math.cos(a) * rr, y, Math.sin(a) * rr]} scale={s * h * 0.12}><icosahedronGeometry args={[1, 0]} /><M c={color} e={color} ei={0.12} /></mesh>; })}
    </group>
  );
};

/** Silo genérico con ventana de llenado. p: h, r, fill0, fill1, at, dur, color */
export const Silo: React.FC<P> = ({ t, p }) => {
  const { h = 2.2, r = 0.5, fill0 = 0.2, fill1, at = 0, dur = 1.2, color = '#6f6a9e', grain = MAIZ } = p;
  const f = fill1 === undefined ? fill0 : anim(t, fill0, fill1, at, dur);
  const wh = h * 0.86;
  return (
    <group>
      <Cyl r={r} h={h} seg={12} pos={[0, h / 2, 0]} c={color} />
      {[0.25, 0.5, 0.75].map((u) => <Cyl key={u} r={r + 0.015} h={0.04} seg={12} pos={[0, h * u, 0]} c="#504a82" />)}
      <mesh position={[0, h + r * 0.3, 0]}><coneGeometry args={[r * 1.04, r * 0.6, 12]} /><M c="#57528a" /></mesh>
      <Cyl r={0.08} h={0.12} pos={[0, h + r * 0.62, 0]} c="#3b3570" />
      {/* ventana de llenado al frente */}
      <B s={[r * 0.5, wh, 0.03]} pos={[0, h * 0.07 + wh / 2, r - 0.01]} c="#15102b" />
      {f > 0.005 && <B s={[r * 0.4, wh * f, 0.03]} pos={[0, h * 0.07 + (wh * f) / 2, r + 0.01]} c={grain} e={grain} ei={0.9} />}
    </group>
  );
};

/** Camión genérico con tolva (sin marca). De frente a +x. p: color, load */
export const Camion: React.FC<P> = ({ t, p }) => {
  const { color = '#3d5bd6', load = true, grain = MAIZ } = p;
  return (
    <group>
      <B s={[2.0, 0.14, 0.62]} pos={[0, 0.32, 0]} c="#1b1340" />
      <B s={[0.55, 0.62, 0.62]} pos={[0.82, 0.7, 0]} c={color} />
      <B s={[0.04, 0.26, 0.5]} pos={[1.1, 0.82, 0]} c="#9fd8ff" e="#4aa0d8" ei={0.6} />
      <B s={[1.3, 0.55, 0.64]} pos={[-0.3, 0.68, 0]} c="#8d8aa0" />
      {load && <mesh position={[-0.3, 0.98, 0]} scale={[1.6, 1, 0.75]}><coneGeometry args={[0.4, 0.2, 4]} /><M c={grain} e={grain} ei={0.3} /></mesh>}
      {[-0.75, -0.2, 0.8].map((x) => [-0.32, 0.32].map((z) => (
        <mesh key={x + '' + z} position={[x, 0.2, z]} rotation={[PI / 2, 0, -t * 6]}><cylinderGeometry args={[0.18, 0.18, 0.1, 8]} /><M c="#15102b" /></mesh>)))}
    </group>
  );
};

/** Cosechadora genérica (sin marca), de frente a +x, con el molinete girando. */
export const Cosechadora: React.FC<P> = ({ t, p }) => {
  const { color = '#e0812e', run = true } = p;
  return (
    <group>
      <B s={[1.4, 0.75, 0.8]} pos={[-0.1, 0.75, 0]} c={color} />
      <B s={[0.5, 0.45, 0.6]} pos={[0.35, 1.35, 0]} c="#2a2350" />
      <B s={[0.03, 0.34, 0.5]} pos={[0.61, 1.36, 0]} c="#9fd8ff" e="#4aa0d8" ei={0.6} />
      <B s={[0.7, 0.28, 0.7]} pos={[-0.4, 1.27, 0]} c="#8d8aa0" />
      <B s={[0.32, 0.12, 1.6]} pos={[0.9, 0.3, 0]} c="#504a82" />
      <mesh position={[0.95, 0.5, 0]} rotation={[PI / 2, run ? -t * 5 : 0, 0]}><cylinderGeometry args={[0.2, 0.2, 1.55, 6]} /><M c="#e0dbf5" /></mesh>
      <B s={[0.9, 0.07, 0.07]} pos={[-0.55, 1.45, -0.42]} rot={[0, 0.6, 0.15]} c="#504a82" />
      {[[-0.5, 0.32], [0.3, 0.42]].map(([x, r]) => [-0.44, 0.44].map((z) => (
        <mesh key={x + '' + z} position={[x, r, z]} rotation={[PI / 2, 0, -t * 3]}><cylinderGeometry args={[r, r, 0.16, 8]} /><M c="#15102b" /></mesh>)))}
    </group>
  );
};

/** Choclo low-poly con chala. p: s */
export const Choclo: React.FC<P> = ({ t }) => (
  <group rotation={[0, 0, Math.sin(t * 1.3) * 0.08]}>
    <mesh position={[0, 0.55, 0]}><cylinderGeometry args={[0.13, 0.2, 1.1, 8, 4]} /><M c={MAIZ} e={MAIZ} ei={0.35} /></mesh>
    <mesh position={[0, 1.13, 0]}><coneGeometry args={[0.13, 0.12, 8]} /><M c={MAIZ} e={MAIZ} ei={0.35} /></mesh>
    {[0, 1, 2].map((i) => <group key={i} rotation={[0, (i * 2 * PI) / 3, 0]}>
      <B s={[0.16, 0.85, 0.03]} pos={[0, 0.35, 0.2]} rot={[-0.22, 0, 0]} c="#3f9a52" /></group>)}
    <Cyl r={0.06} h={0.22} pos={[0, -0.08, 0]} c="#2f7a43" />
  </group>
);

/** Planta de soja: tallo, hojas y vainas. */
export const PlantaSoja: React.FC<P> = ({ t }) => (
  <group rotation={[0, Math.sin(t * 1.1) * 0.15, 0]}>
    <Cyl r={0.03} h={0.9} pos={[0, 0.45, 0]} c="#3f8a3a" />
    {[[0.2, 0.55, 0.05], [-0.22, 0.7, -0.02], [0.12, 0.9, -0.1], [-0.1, 0.98, 0.08]].map(([x, y, z], i) => (
      <mesh key={i} position={[x, y, z]} scale={[1.2, 0.35, 0.9]}><icosahedronGeometry args={[0.17, 0]} /><M c="#4f9a3a" /></mesh>))}
    {[[0.07, 0.35], [-0.07, 0.45], [0.08, 0.62], [-0.06, 0.78]].map(([x, y], i) => (
      <mesh key={i} position={[x, y, 0.06]} rotation={[0, 0, x > 0 ? -0.5 : 0.5]} scale={[0.6, 1.6, 0.6]}><icosahedronGeometry args={[0.06, 0]} /><M c={SOJA} e={SOJA} ei={0.25} /></mesh>))}
  </group>
);

/**
 * Barras a escala desde cero (alto = valor * k). p: items [{ v, c, top, cap, at, add: { v, c, at, top } }], k, w, gap, dur
 * top = cartel arriba de la barra; cap = cartel en la cara frontal (2 cm adelante).
 */
export const Barras: React.FC<P> = ({ t, tt, p }) => {
  const { items = [], k = 0.012, w = 0.8, gap = 0.5, dur = 0.7, topW = 1.1, capW } = p;
  const tot = items.length * w + (items.length - 1) * gap;
  return (
    <group>
      {items.map((it: any, i: number) => {
        const x = -tot / 2 + w / 2 + i * (w + gap); const g = eo((t - (it.at ?? 0)) / dur); if (g <= 0) return null;
        const h = Math.max(0.001, it.v * k * g);
        const ga = it.add ? eo((t - it.add.at) / dur) : 0; const ha = it.add ? it.add.v * k * ga : 0;
        const topY = h + ha + 0.26; const topK = pop(t - (it.at ?? 0) - dur * 0.6); const topAK = it.add ? pop(t - it.add.at - dur * 0.6) : 0;
        return (
          <group key={i} position={[x, 0, 0]}>
            <B s={[w, h, w]} pos={[0, h / 2, 0]} c={it.c} e={it.c} ei={0.35} />
            {ha > 0.002 && <B s={[w * 1.02, ha, w * 1.02]} pos={[0, h + ha / 2, 0]} c={it.add.c} e={it.add.c} ei={0.9} />}
            {it.top && topK > 0 && !(it.add && topAK > 0 && it.add.top) && <group position={[0, h + 0.26, 0]} scale={topK}>
              <Label t={t} tt={tt} p={{ text: it.top, w: topW, h: 0.34, bg: '#15102b', color: '#fff', size: 0.72, weight: 900 }} /></group>}
            {it.add?.top && topAK > 0 && <group position={[0, topY, 0]} scale={topAK}>
              <Label t={t} tt={tt} p={{ text: it.add.top, w: topW, h: 0.34, bg: it.add.c, color: '#1a1030', size: 0.72, weight: 900 }} /></group>}
            {it.cap && <group position={[0, Math.min(0.24, h / 2), w / 2 + 0.02]}>
              <Label t={t} tt={tt} p={{ text: it.cap, w: capW ?? w * 0.96, h: 0.22, color: it.capColor ?? '#1a1030', size: 0.72, weight: 900, depth: 0 }} /></group>}
          </group>);
      })}
    </group>
  );
};

/** Fajo de billetes genéricos (US$), alto de h0 a h1 entre at y at+dur. p: h0, h1, at, dur */
export const Fajo: React.FC<P> = ({ t, tt, p }) => {
  const { h0 = 0.4, h1, at = 0, dur = 1.0, w = 0.9 } = p; const h = h1 === undefined ? h0 : anim(t, h0, h1, at, dur);
  const n = Math.max(1, Math.round(h / 0.1)); const lh = h / n;
  return (
    <group>
      {Array.from({ length: n }, (_, i) => (
        <group key={i} position={[Math.sin(i * 2.1) * 0.02, lh * i + lh / 2, Math.cos(i * 1.3) * 0.02]} rotation={[0, Math.sin(i * 1.7) * 0.05, 0]}>
          <B s={[w, lh * 0.9, w * 0.46]} c="#2e9e5b" e="#2e9e5b" ei={0.35} />
          <B s={[w * 0.3, lh * 0.92, w * 0.47]} c="#bff0cf" />
        </group>))}
      <group position={[0, h + 0.012, 0]} rotation={[-PI / 2, 0, 0]}>
        <B s={[w, w * 0.46, 0.005]} c="#2e9e5b" />
        <group position={[0, 0, 0.02]}><Label t={t} tt={tt} p={{ text: 'US$', w: w * 0.6, h: w * 0.3, size: 0.8, weight: 900, color: '#14532d', depth: 0 }} /></group>
      </group>
    </group>
  );
};

/** Barco granelero genérico sin nombre. p: color, len */
export const Barco: React.FC<P> = ({ t, p }) => {
  const { color = '#8f2b3e', len = 2.6, loadAt } = p; const kl = loadAt === undefined ? 0 : eo((t - loadAt) / 0.8);
  return (
    <group rotation={[Math.sin(t * 1.4) * 0.015, 0, 0]}>
      <B s={[len, 0.42, 0.7]} pos={[0, 0.21, 0]} c={color} />
      <mesh position={[len / 2 + 0.2, 0.21, 0]} rotation={[0, 0, -PI / 2]} scale={[0.6, 1, 1]}><cylinderGeometry args={[0, 0.36, 0.4, 4]} /><M c={color} /></mesh>
      <B s={[len, 0.06, 0.72]} pos={[0, 0.44, 0]} c="#2b2350" />
      <B s={[0.4, 0.55, 0.56]} pos={[-len / 2 + 0.25, 0.72, 0]} c="#d9d2f5" />
      <B s={[0.04, 0.06, 0.46]} pos={[-len / 2 + 0.46, 0.85, 0]} c={C.cyan} e={C.cyan} ei={1} />
      {[-0.55, 0.05, 0.65].map((x) => <group key={x}><B s={[0.45, 0.06, 0.5]} pos={[x, 0.48, 0]} c="#3b2f7a" />
        {kl > 0 && <mesh position={[x, 0.51 + 0.09 * kl, 0]} scale={[1, kl, 1]}><coneGeometry args={[0.22, 0.18, 6]} /><M c={MAIZ} e={MAIZ} ei={0.35} /></mesh>}</group>)}
    </group>
  );
};

/** Agua: plano oscuro con olas suaves. p: w, d */
export const Agua: React.FC<P> = ({ t, p }) => {
  const { w = 8, d = 3 } = p;
  return (<group><B s={[w, 0.03, d]} pos={[0, 0.02, 0]} c="#14245a" />
    {Array.from({ length: 6 }, (_, i) => <B key={i} s={[0.5, 0.02, 0.04]} pos={[((i * 1.7 + t * 0.4) % w) - w / 2, 0.045, -d / 2 + (i + 0.5) * (d / 6)]} c="#4a6fd8" e="#2f4fb0" ei={0.6} />)}</group>);
};

/** Vaca genérica low-poly mirando a +x; la cabeza baja a comer. */
export const Vaca: React.FC<P> = ({ t }) => {
  const k = (Math.sin(t * 2.2) + 1) / 2;
  return (
    <group>
      <B s={[1.0, 0.5, 0.48]} pos={[0, 0.72, 0]} c="#d8d2e8" />
      <B s={[0.36, 0.3, 0.5]} pos={[-0.15, 0.82, 0]} c="#2a2350" />
      <B s={[0.22, 0.24, 0.49]} pos={[0.25, 0.66, 0]} c="#2a2350" />
      {[[-0.38, -0.16], [-0.38, 0.16], [0.36, -0.16], [0.36, 0.16]].map(([x, z], i) => <B key={i} s={[0.12, 0.48, 0.12]} pos={[x, 0.24, z]} c="#cfc8e0" />)}
      <group position={[0.52, 0.85, 0]} rotation={[0, 0, -0.5 - k * 0.5]}>
        <B s={[0.36, 0.26, 0.3]} pos={[0.16, 0, 0]} c="#d8d2e8" />
        <B s={[0.1, 0.16, 0.24]} pos={[0.36, -0.04, 0]} c="#f0a7b8" />
        <B s={[0.06, 0.12, 0.06]} pos={[0.06, 0.16, 0.12]} c="#8d8aa0" /><B s={[0.06, 0.12, 0.06]} pos={[0.06, 0.16, -0.12]} c="#8d8aa0" />
      </group>
    </group>
  );
};

/** Podio de dos escalones con texto 2 cm delante del frente. p: t1 (texto del 1), top1H, top2H */
export const Podio: React.FC<P> = ({ t, tt, p }) => {
  const { h1 = 1.0, h2 = 0.55, text1 = '1' } = p;
  return (
    <group>
      <B s={[1.0, h1, 0.9]} pos={[-0.5, h1 / 2, 0]} c="#3b2f7a" />
      <B s={[1.0, 0.05, 0.92]} pos={[-0.5, h1 + 0.02, 0]} c={C.gold} e={C.gold} ei={0.8} />
      <B s={[1.0, h2, 0.9]} pos={[0.52, h2 / 2, 0]} c="#2a2350" />
      <group position={[-0.5, h1 * 0.5, 0.47]}><Label t={t} tt={tt} p={{ text: text1, w: 0.7, h: 0.7, color: C.gold, size: 0.85, weight: 900, depth: 0 }} /></group>
    </group>
  );
};

/** Casa genérica de pueblo */
const Casa: React.FC<{ pos: V3; c: string; r?: number; s?: number }> = ({ pos, c, r = 0, s = 1 }) => (
  <group position={pos} rotation={[0, r, 0]} scale={s}>
    <B s={[0.6, 0.45, 0.5]} pos={[0, 0.225, 0]} c={c} />
    <mesh position={[0, 0.58, 0]} rotation={[0, PI / 4, 0]}><coneGeometry args={[0.48, 0.28, 4]} /><M c="#8f2b3e" /></mesh>
    <B s={[0.14, 0.14, 0.02]} pos={[0.15, 0.27, 0.26]} c="#ffd27a" e="#ffb52e" ei={0.9} />
    <B s={[0.12, 0.24, 0.02]} pos={[-0.14, 0.12, 0.26]} c="#2a2350" />
  </group>
);
/** Pueblo chico: casas y un tanque de agua, sin nombres. p: seed */
export const Pueblo: React.FC<P> = ({ tt, p }) => {
  const cs = ['#b9a3e8', '#e9e2ff', '#a48ddb', '#d9c7ff', '#c4b5f0'];
  const pos: [number, number, number][] = [[-0.8, 0, 0.1], [0, 0, 0.3], [0.75, 0, 0.05], [-0.35, 0, -0.55], [0.4, 0, -0.6]];
  return (
    <group>
      {pos.map((q, i) => { const k = p.popIn ? pop(tt - i * 0.08) : 1; return k > 0 ? <group key={i} scale={k}><Casa pos={q} c={cs[i]} r={(i - 2) * 0.12} /></group> : null; })}
      <group position={[1.25, 0, -0.5]}>
        {[[-0.12, -0.12], [0.12, -0.12], [-0.12, 0.12], [0.12, 0.12]].map(([x, z], i) => <B key={i} s={[0.04, 0.9, 0.04]} pos={[x, 0.45, z]} c="#8d8aa0" />)}
        <Cyl r={0.24} h={0.3} pos={[0, 1.05, 0]} c="#c4c0dc" />
      </group>
    </group>
  );
};

/** Pin de mapa con la punta en el suelo */
export const Pin: React.FC<P> = ({ t, p }) => {
  const { color = C.magenta } = p;
  return (<group position={[0, Math.abs(Math.sin(t * 2.4)) * 0.0, 0]}>
    <mesh position={[0, 0.3, 0]} rotation={[PI, 0, 0]}><coneGeometry args={[0.2, 0.6, 8]} /><M c={color} e={color} ei={0.8} /></mesh>
    <mesh position={[0, 0.66, 0]}><sphereGeometry args={[0.24, 10, 8]} /><M c={color} e={color} ei={0.8} /></mesh>
    <mesh position={[0, 0.66, 0.2]}><sphereGeometry args={[0.09, 8, 6]} /><M c="#fff" /></mesh>
  </group>);
};

/** Flecha que baja (para la soja) */
export const FlechaAbajo: React.FC<P> = ({ tt, p }) => {
  const { len = 1.0, color = C.red, dur = 0.5 } = p; const k = Math.max(0.001, eo(tt / dur));
  return (<group><B s={[0.2, len * k, 0.2]} pos={[0, -(len * k) / 2, 0]} c={color} e={color} ei={1.1} />
    <mesh position={[0, -len * k - 0.2, 0]} rotation={[PI, 0, 0]}><coneGeometry args={[0.32, 0.42, 4]} /><M c={color} e={color} ei={1.1} /></mesh></group>);
};

export const EXTRA: Record<string, React.FC<P>> = {
  suelo: Suelo, campo: Campo, pila: Pila, silo: Silo, camion: Camion, cosechadora: Cosechadora, choclo: Choclo, plantaSoja: PlantaSoja,
  barras: Barras, fajo: Fajo, barco: Barco, agua: Agua, vaca: Vaca, podio: Podio, pueblo: Pueblo, pin: Pin, flechaAbajo: FlechaAbajo,
};
// silenciar imports no usados en algunos props
void clamp; void Person;
