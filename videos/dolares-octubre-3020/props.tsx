import React from 'react';
import * as THREE from 'three';
import { M, Label, Person } from '../../src/kit/Props';
import { clamp, eio, eo, lerp, pop } from '../../src/kit/math';

// Look propio de este video (distinto del muelle al amanecer y del estadio de noche): un living de día. Pared verde
// botella muy oscura arriba (ahí van los subtítulos), zócalo de madera, piso de tablas color miel con manchas de sol,
// alfombra terracota, una ventana con cielo de día baja y a un costado. Billetes verde musgo con faja crema, sin texto
// ni marca. Sin carteles 3D con datos: los textos son placas 2D del kit.
type P = { t: number; tt: number; p: any };
type V3 = [number, number, number];
const PI = Math.PI;

export const VERDE = '#3f7048', VERDE2 = '#345e3c', FAJA = '#d8c89c', MADERA = '#8a5a35', MADERA2 = '#6b4428', MIEL = '#b07a45',
  TERRA = '#a9503a', PARED = '#16221f', CREMA = '#efe3c6', ORO = '#e7b53c', PIEDRA = '#b9b0a0', INK = '#121a18', CIELO = '#9fd4ec';

const B: React.FC<{ s: V3; pos?: V3; rot?: V3; c: string; e?: string; ei?: number; o?: number }> = ({ s, pos, rot, c, e, ei, o }) => (
  <mesh position={pos} rotation={rot}><boxGeometry args={s} /><M c={c} e={e} ei={ei} o={o} /></mesh>
);
const Flat: React.FC<{ s: V3; pos?: V3; rot?: V3; c: string; o?: number; add?: boolean }> = ({ s, pos, rot, c, o, add }) => (
  <mesh position={pos} rotation={rot}><boxGeometry args={s} />
    <meshBasicMaterial color={c} toneMapped={false} transparent={o !== undefined} opacity={o ?? 1} depthWrite={!add} blending={add ? THREE.AdditiveBlending : THREE.NormalBlending} /></mesh>
);
const Cyl: React.FC<{ r: number; r2?: number; h: number; pos?: V3; rot?: V3; seg?: number; c: string; e?: string; ei?: number }> = ({ r, r2, h, pos, rot, seg = 10, c, e, ei }) => (
  <mesh position={pos} rotation={rot}><cylinderGeometry args={[r2 ?? r, r, h, seg]} /><M c={c} e={e} ei={ei} /></mesh>
);
const anim = (t: number, from: number, to: number, at = 0, dur = 0.8) => lerp(from, to, eio((t - at) / dur));

/* ---------- Mundo: living de día (tapa el set 'room') ---------- */
export const World: React.FC<P> = ({ t, p }) => {
  const { win = true, rug = true, plant = true } = p;
  return (
    <group>
      {/* pared del fondo: verde botella oscuro sin luz (controla la franja de subtítulos) */}
      <Flat s={[11, 9, 0.1]} pos={[0, 4.5, -3.6]} c={PARED} />
      {[-1, 1].map((k) => <Flat key={k} s={[0.1, 9, 14]} pos={[k * 4.35, 4.5, 2]} c="#121c1a" />)}
      {/* zócalo de madera */}
      <B s={[11, 0.95, 0.06]} pos={[0, 0.475, -3.53]} c={MADERA2} />
      <B s={[11, 0.06, 0.1]} pos={[0, 0.97, -3.5]} c={MADERA} />
      {[-1, 1].map((k) => <B key={k} s={[0.06, 0.95, 14]} pos={[k * 4.28, 0.475, 2]} c={MADERA2} />)}
      {/* piso de tablas */}
      <mesh rotation={[-PI / 2, 0, 0]} position={[0, 0.006, 3]}><planeGeometry args={[9, 14]} /><M c={MIEL} /></mesh>
      {Array.from({ length: 14 }, (_, i) => <B key={i} s={[0.015, 0.004, 14]} pos={[-4.2 + i * 0.62, 0.009, 3]} c="#8f5f33" />)}
      {rug && <B s={[3.8, 0.012, 2.4]} pos={[0, 0.012, 0.1]} c={TERRA} />}
      {rug && <B s={[3.5, 0.013, 2.1]} pos={[0, 0.013, 0.1]} c="#b8613f" />}
      {/* manchas de sol en el piso (entran por la ventana) */}
      {[0, 1].map((i) => <Flat key={i} s={[0.9, 0.002, 1.5]} pos={[-2.4 + i * 1.05, 0.02, 1.0]} rot={[0, 0.5, 0]} c="#ffd9a0" o={0.18} add />)}
      {/* ventana baja al costado, con cielo de día */}
      {win && <group position={[-2.55, 1.33, -3.5]}>
        <Flat s={[1.5, 0.6, 0.02]} pos={[0, 0, 0.02]} c={CIELO} />
        <Flat s={[1.5, 0.18, 0.021]} pos={[0, -0.21, 0.025]} c="#cfe9f2" />
        <B s={[1.66, 0.06, 0.1]} pos={[0, 0.32, 0.05]} c={CREMA} /><B s={[1.66, 0.08, 0.16]} pos={[0, -0.32, 0.07]} c={CREMA} />
        <B s={[0.08, 0.66, 0.1]} pos={[-0.8, 0, 0.05]} c={CREMA} /><B s={[0.08, 0.66, 0.1]} pos={[0.8, 0, 0.05]} c={CREMA} />
        <B s={[0.05, 0.6, 0.06]} pos={[0, 0, 0.05]} c={CREMA} />
      </group>}
      {plant && <group position={[3.1, 0, -2.7]}>
        <Cyl r={0.26} r2={0.32} h={0.5} pos={[0, 0.25, 0]} c={TERRA} />
        {[0, 1, 2, 3, 4].map((i) => <mesh key={i} position={[Math.sin(i * 1.3) * 0.18, 0.75 + (i % 3) * 0.15, Math.cos(i * 1.3) * 0.12]}
          rotation={[0.3 * Math.sin(i), i, 0.35 * Math.cos(i * 2) + Math.sin(t * 1.4 + i) * 0.03]}><coneGeometry args={[0.16, 0.6, 4]} /><M c={i % 2 ? '#3f7a3a' : '#2f6330'} /></mesh>)}
      </group>}
      <hemisphereLight args={['#fff3dc', '#5a3b22', 0.65]} />
      <directionalLight position={[-5, 4, 3]} intensity={0.9} color="#ffe2b8" />
    </group>
  );
};

/* ---------- Mesa de madera ---------- */
export const Mesa: React.FC<P> = ({ p }) => {
  const { w = 2.6, d = 1.2, h = 0.55, c = MADERA } = p;
  return (
    <group>
      <B s={[w, 0.08, d]} pos={[0, h, 0]} c={c} />
      {[[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([x, z], i) => <B key={i} s={[0.08, h - 0.04, 0.08]} pos={[x * (w / 2 - 0.12), (h - 0.04) / 2, z * (d / 2 - 0.12)]} c={MADERA2} />)}
    </group>
  );
};

/* ---------- Pila de billetes genéricos (sin texto): alto h0 -> h1 entre at y at+dur ---------- */
export const Pila: React.FC<P> = ({ t, p }) => {
  const { h0 = 0.3, h1, at = 0, dur = 1.0, w = 0.62, d = 0.32, lit } = p;
  const h = Math.max(0.0005, h1 === undefined ? h0 : anim(t, h0, h1, at, dur));
  const n = Math.max(1, Math.ceil(h / 0.07)); const lh = h / n;
  const glow = lit !== undefined ? clamp((t - lit) / 0.3) : 0;
  // salto en arco mientras el actor se mueve (move del actor): no roza el borde de la mesa
  const hy = p.hop ? Math.sin(PI * eio((t - p.hop.at) / p.hop.dur)) * p.hop.h : 0;
  return (
    <group position={[0, hy, 0]}>
      {Array.from({ length: n }, (_, i) => (
        <group key={i} position={[Math.sin(i * 2.1) * 0.012, lh * i + lh / 2, Math.cos(i * 1.3) * 0.01]} rotation={[0, Math.sin(i * 1.7) * 0.03, 0]}>
          <B s={[w, lh * 0.92, d]} c={i % 2 ? VERDE : VERDE2} e={glow > 0 ? ORO : undefined} ei={0.25 * glow} />
          <B s={[w * 0.22, lh * 0.94, d + 0.006]} c={FAJA} />
        </group>))}
    </group>
  );
};

/* ---------- Raya de nivel (dorada, translúcida) ---------- */
export const Nivel: React.FC<P> = ({ tt, p }) => {
  const { w = 2.0 } = p; const k = eo(tt / 0.4);
  return <group scale={[Math.max(0.001, k), 1, 1]}><Flat s={[w, 0.022, 0.022]} c={ORO} /><Flat s={[w, 0.06, 0.004]} pos={[0, 0, -0.02]} c={ORO} o={0.25} /></group>;
};

/* ---------- Casillero vacío (contorno) ---------- */
export const Hueco: React.FC<P> = ({ t, tt, p }) => {
  const { w = 0.62, h = 0.18, d = 0.32, c = CREMA } = p; const a = 0.55 + 0.25 * Math.sin(t * 4);
  const e = 0.014; const k = eo(tt / 0.3);
  const edges: [V3, V3][] = [];
  for (const y of [-h / 2, h / 2]) for (const z of [-d / 2, d / 2]) edges.push([[w, e, e], [0, y, z]]);
  for (const y of [-h / 2, h / 2]) for (const x of [-w / 2, w / 2]) edges.push([[e, e, d], [x, y, 0]]);
  for (const x of [-w / 2, w / 2]) for (const z of [-d / 2, d / 2]) edges.push([[e, h, e], [x, 0, z]]);
  return <group scale={k}>{edges.map(([s, q], i) => <Flat key={i} s={s} pos={q} c={c} o={a} />)}</group>;
};

/* ---------- Mostrador de casa de cambio, con vidrio y ventanilla ---------- */
export const Mostrador: React.FC<P> = ({ p }) => {
  const { w = 3.0 } = p;
  return (
    <group>
      <B s={[w, 1.0, 0.6]} pos={[0, 0.5, 0]} c="#7a4b2c" />
      <B s={[w + 0.06, 0.06, 0.7]} pos={[0, 1.03, 0.03]} c={CREMA} />
      {[-1, 1].map((k) => <B key={k} s={[w * 0.06, 0.9, 0.62]} pos={[k * w * 0.25, 0.5, 0.005]} c="#6a4024" />)}
      {/* vidrio con hueco central */}
      {[-1, 1].map((k) => <mesh key={k} position={[k * (w / 4 + 0.15), 1.48, -0.12]}><boxGeometry args={[w / 2 - 0.3, 0.85, 0.02]} />
        <meshStandardMaterial color="#cfe9f2" transparent opacity={0.22} roughness={0.1} /></mesh>)}
      <B s={[w, 0.06, 0.08]} pos={[0, 1.93, -0.12]} c={CREMA} />
      {[-w / 2, -0.15, 0.15, w / 2].map((x) => <B key={x} s={[0.05, 0.9, 0.06]} pos={[x, 1.48, -0.12]} c={CREMA} />)}
    </group>
  );
};

/* ---------- Colchón sobre una base; lift levanta el borde de adelante (0..1) ---------- */
export const Colchon: React.FC<P> = ({ t, p }) => {
  const { lift = [[0, 0]], w = 1.7, d = 1.0 } = p;
  const kf: [number, number][] = lift; let a = kf[0][1];
  for (let i = 1; i < kf.length; i++) if (t >= kf[i - 1][0]) a = t < kf[i][0] ? lerp(kf[i - 1][1], kf[i][1], eio((t - kf[i - 1][0]) / (kf[i][0] - kf[i - 1][0]))) : kf[i][1];
  return (
    <group>
      <B s={[w + 0.1, 0.22, d + 0.1]} pos={[0, 0.11, 0]} c={MADERA2} />
      {/* bisagra en el borde de atrás: el colchón se abre hacia la cámara */}
      <group position={[0, 0.24, -d / 2]} rotation={[-a * 0.9, 0, 0]}>
        <B s={[w, 0.24, d]} pos={[0, 0.12, d / 2]} c="#d6dbe3" />
        {[-0.6, -0.3, 0, 0.3, 0.6].map((x) => <B key={x} s={[0.07, 0.245, d + 0.004]} pos={[x * w / 1.7, 0.12, d / 2]} c="#7f98bb" />)}
        <B s={[w * 0.35, 0.1, d * 0.3]} pos={[-w * 0.28, 0.29, d * 0.22]} c="#eef0f4" />
      </group>
    </group>
  );
};

/* ---------- Banco genérico en miniatura (sin texto ni logo) ---------- */
export const Banco: React.FC<P> = () => (
  <group>
    <B s={[1.5, 0.1, 0.9]} pos={[0, 0.05, 0]} c="#9b9283" />
    <B s={[1.36, 0.08, 0.8]} pos={[0, 0.14, 0]} c={PIEDRA} />
    <B s={[1.2, 0.95, 0.5]} pos={[0, 0.65, -0.12]} c="#a99f8e" />
    {[-0.45, -0.15, 0.15, 0.45].map((x) => <Cyl key={x} r={0.06} h={0.86} pos={[x, 0.61, 0.22]} c="#d8d0bf" seg={8} />)}
    <B s={[1.36, 0.1, 0.78]} pos={[0, 1.1, 0]} c={PIEDRA} />
    <group position={[0, 1.33, 0]} scale={[1, 0.45, 1]}><mesh rotation={[-PI / 2, 0, 0]}><cylinderGeometry args={[0.8, 0.8, 0.7, 3]} /><M c="#c7bead" /></mesh></group>
    <B s={[0.3, 0.5, 0.02]} pos={[0, 0.43, 0.135]} c="#3b2a1e" />
  </group>
);

/* ---------- Candado: open 0 -> 1 abre el arco ---------- */
export const Candado: React.FC<P> = ({ t, p }) => {
  const { openAt, s = 1, c = ORO } = p; const k = openAt === undefined ? 0 : eo((t - openAt) / 0.4);
  return (
    <group scale={s}>
      <B s={[0.5, 0.42, 0.18]} pos={[0, 0.21, 0]} c={c} />
      <Cyl r={0.05} h={0.04} pos={[0, 0.24, 0.1]} rot={[PI / 2, 0, 0]} c={INK} />
      <group position={[0.15, 0.42 + 0.14 * k, 0]} rotation={[0, k * 1.2, 0]}>
        <mesh position={[-0.15, 0, 0]}><torusGeometry args={[0.15, 0.04, 6, 14, PI]} /><M c="#c9cfd6" /></mesh>
      </group>
    </group>
  );
};

/* ---------- Doce meses (iniciales) en fila; gray = índices apagados ---------- */
export const Meses: React.FC<P> = ({ t, tt, p }) => {
  const { gray = [0, 1, 2], at = 0, step = 0.05, grayAt = 99 } = p;
  const ini = ['E', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
  const s = 0.4, g = 0.06, W = 6 * s + 5 * g;
  return (
    <group>
      <B s={[W + 0.2, 2 * s + g + 0.2, 0.05]} pos={[0, 0, -0.05]} c="#2a2220" />
      {ini.map((m, i) => { const k = pop(t - at - i * step); const off = gray.includes(i) && t >= grayAt;
        const x = -W / 2 + s / 2 + (i % 6) * (s + g); const y = i < 6 ? (s + g) / 2 : -(s + g) / 2;
        return (
          <group key={i} position={[x, y, 0]} scale={k}>
            <B s={[s, s, 0.04]} c={off ? '#5d5f5c' : CREMA} />
            <group position={[0, 0, 0.04]}><Label t={t} tt={tt} p={{ text: m, w: s * 0.8, h: s * 0.8, color: off ? '#9a9c98' : '#2a2220', size: 0.7, weight: 900, depth: 0 }} /></group>
          </group>);
      })}
    </group>
  );
};

/* ---------- Podio de dos escalones sin números ---------- */
export const Podio: React.FC<P> = ({ p }) => {
  const { h1 = 0.5, h2 = 0.32 } = p;
  return (
    <group>
      <B s={[0.9, h1, 0.7]} pos={[-0.46, h1 / 2, 0]} c="#5a3a24" />
      <B s={[0.9, 0.04, 0.72]} pos={[-0.46, h1 + 0.02, 0]} c={ORO} />
      <B s={[0.9, h2, 0.7]} pos={[0.46, h2 / 2, 0]} c="#4a3020" />
      <B s={[0.9, 0.04, 0.72]} pos={[0.46, h2 + 0.02, 0]} c="#c9cfd6" />
    </group>
  );
};

/* ---------- Valija ---------- */
export const Valija: React.FC<P> = () => (
  <group>
    <B s={[0.7, 0.5, 0.26]} pos={[0, 0.3, 0]} c="#2f4f6b" />
    <B s={[0.72, 0.05, 0.27]} pos={[0, 0.3, 0]} c="#22394d" />
    <B s={[0.24, 0.05, 0.06]} pos={[0, 0.6, 0]} c="#1a1a1a" />
    {[-0.2, 0.2].map((x) => <Cyl key={x} r={0.04} h={0.03} pos={[x, 0.03, 0.08]} rot={[0, 0, PI / 2]} c="#1a1a1a" />)}
  </group>
);

/* ---------- Medidor de aguja (sin números): v de 0 a 1 ---------- */
export const Medidor: React.FC<P> = ({ t, p }) => {
  const { kf = [[0, 0.4]] } = p; const kfs: [number, number][] = kf; let v = kfs[0][1];
  for (let i = 1; i < kfs.length; i++) if (t >= kfs[i - 1][0]) v = t < kfs[i][0] ? lerp(kfs[i - 1][1], kfs[i][1], eio((t - kfs[i - 1][0]) / (kfs[i][0] - kfs[i - 1][0]))) : kfs[i][1];
  const segs = 9;
  return (
    <group>
      <B s={[1.3, 0.75, 0.08]} pos={[0, 0.35, -0.03]} c="#2a2220" />
      {Array.from({ length: segs }, (_, i) => { const a = PI - (i + 0.5) * PI / segs; const col = i < 3 ? '#6f9a5e' : i < 6 ? ORO : '#c8553d';
        return <B key={i} s={[0.12, 0.06, 0.02]} pos={[Math.cos(a) * 0.48, 0.12 + Math.sin(a) * 0.48, 0.02]} rot={[0, 0, a + PI / 2]} c={col} />; })}
      <group position={[0, 0.12, 0.04]} rotation={[0, 0, PI / 2 - v * PI]}>
        <B s={[0.03, 0.42, 0.02]} pos={[0, 0.21, 0]} c={CREMA} />
      </group>
      <Cyl r={0.05} h={0.03} pos={[0, 0.12, 0.05]} rot={[PI / 2, 0, 0]} c={CREMA} />
    </group>
  );
};

/* ---------- Flecha curva punteada de a hacia b (en el plano xz, a la altura y) ---------- */
export const Ruta: React.FC<P> = ({ tt, p }) => {
  const { to = [1, 0, 0], h = 0.5, n = 9, c = ORO, dur = 0.6 } = p; const k = eo(tt / dur);
  return (
    <group>
      {Array.from({ length: n }, (_, i) => { const u = (i + 1) / (n + 1); if (u > k) return null;
        const x = to[0] * u, z = to[2] * u, y = to[1] * u + Math.sin(u * PI) * h;
        return <mesh key={i} position={[x, y, z]}><sphereGeometry args={[0.035, 6, 4]} /><meshBasicMaterial color={c} toneMapped={false} /></mesh>; })}
      {k > 0.95 && <mesh position={to} rotation={[PI, 0, 0]}><coneGeometry args={[0.08, 0.16, 4]} /><meshBasicMaterial color={c} toneMapped={false} /></mesh>}
    </group>
  );
};

/* ---------- Persona con un fajo en la mano ---------- */
export const Cliente: React.FC<P> = ({ t, tt, p }) => (
  <group>
    <Person t={t} tt={tt} p={{ ...p, pose: p.fajoAt !== undefined && t >= p.fajoAt ? 'hold' : p.pose ?? 'idle' }} />
    {p.fajoAt !== undefined && t >= p.fajoAt && <group position={[0, 1.02, 0.42]} scale={pop(t - p.fajoAt)}>
      <B s={[0.3, 0.08, 0.15]} c={VERDE} /><B s={[0.07, 0.085, 0.155]} c={FAJA} /></group>}
  </group>
);

export const EXTRA: Record<string, React.FC<P>> = {
  world: World, mesa: Mesa, pila: Pila, nivel: Nivel, hueco: Hueco, mostrador: Mostrador, colchon: Colchon, banco: Banco,
  candado: Candado, meses: Meses, podio: Podio, valija: Valija, medidor: Medidor, ruta: Ruta, cliente: Cliente,
};
