import React from 'react';
import * as THREE from 'three';
import { M } from '../../src/kit/Props';
import { C, eio, eo, lerp, pop, rnd } from '../../src/kit/math';

type P = { t: number; tt: number; p: any };
type V3 = [number, number, number];
const B: React.FC<{ s: V3; pos?: V3; rot?: V3; c: string; e?: string; ei?: number }> = ({ s, pos, rot, c, e, ei }) => (
  <mesh position={pos} rotation={rot}><boxGeometry args={s} /><M c={c} e={e} ei={ei} /></mesh>
);
const Cy: React.FC<{ r: number; r2?: number; h: number; n?: number; pos?: V3; rot?: V3; c: string; e?: string; ei?: number }> = ({ r, r2, h, n = 10, pos, rot, c, e, ei }) => (
  <mesh position={pos} rotation={rot}><cylinderGeometry args={[r2 ?? r, r, h, n]} /><M c={c} e={e} ei={ei} /></mesh>
);

/* Rover: frente hacia +x, ruedas apoyadas en y=0. p.drive = velocidad de giro de ruedas, p.glow = generador encendido */
const Rover: React.FC<P> = ({ t, p }) => {
  const { drive = 0, glow = false, arm = true, mast = true } = p;
  const wx = [-0.58, 0, 0.58];
  const pulse = 1.2 + Math.sin(t * 5) * 0.6;
  return (
    <group position={[0, drive ? Math.abs(Math.sin(t * 7)) * 0.012 : 0, 0]}>
      {wx.map((x) => [-0.52, 0.52].map((z) => (
        <group key={x + '_' + z} position={[x, 0.21, z]} rotation={[0, 0, -t * drive]}>
          <Cy r={0.21} h={0.17} n={10} rot={[Math.PI / 2, 0, 0]} c="#2b2740" />
          <Cy r={0.09} h={0.19} n={6} rot={[Math.PI / 2, 0, 0]} c="#c9c4de" />
          {[0, 1, 2, 3].map((i) => <B key={i} s={[0.05, 0.44, 0.18]} rot={[0, 0, (i * Math.PI) / 4]} c="#4a4468" />)}
        </group>
      )))}
      {[-0.52, 0.52].map((z) => (
        <group key={z}>
          <B s={[0.7, 0.06, 0.06]} pos={[0.3, 0.42, z * 0.9]} rot={[0, 0, -0.5]} c="#c9c4de" />
          <B s={[0.7, 0.06, 0.06]} pos={[-0.3, 0.42, z * 0.9]} rot={[0, 0, 0.5]} c="#c9c4de" />
          <B s={[0.06, 0.3, 0.06]} pos={[0, 0.36, z * 0.9]} c="#c9c4de" />
        </group>
      ))}
      <B s={[1.25, 0.3, 0.78]} pos={[0, 0.72, 0]} c="#f4f1ff" />
      <B s={[1.27, 0.06, 0.8]} pos={[0, 0.89, 0]} c="#2b2740" />
      <B s={[1.26, 0.05, 0.79]} pos={[0, 0.6, 0]} c={C.gold} e={C.gold} ei={0.25} />
      {/* mástil con cámara */}
      {mast && <group>
        <B s={[0.08, 0.72, 0.08]} pos={[0.42, 1.26, 0.22]} c="#c9c4de" />
        <B s={[0.24, 0.2, 0.34]} pos={[0.45, 1.68, 0.22]} c="#f4f1ff" />
        <B s={[0.03, 0.1, 0.1]} pos={[0.58, 1.68, 0.3]} c={C.cyan} e={C.cyan} ei={2.5} />
        <B s={[0.03, 0.07, 0.07]} pos={[0.58, 1.68, 0.14]} c="#15102b" />
      </group>}
      {/* antena */}
      <Cy r={0.2} h={0.04} n={6} pos={[-0.2, 1.08, -0.18]} rot={[0.5, 0, 0.3]} c="#c9c4de" />
      <B s={[0.04, 0.2, 0.04]} pos={[-0.2, 0.98, -0.18]} c="#8d8aa0" />
      {/* brazo */}
      {arm && <group>
        <B s={[0.5, 0.07, 0.07]} pos={[0.82, 0.72, -0.2]} rot={[0, 0, 0.25]} c="#c9c4de" />
        <B s={[0.07, 0.36, 0.07]} pos={[1.06, 0.62, -0.2]} c="#c9c4de" />
        <B s={[0.2, 0.16, 0.2]} pos={[1.06, 0.4, -0.2]} c="#8d8aa0" />
      </group>}
      {/* generador nuclear atrás */}
      <group position={[-0.82, 0.98, 0]} rotation={[0, 0, 0.9]}>
        <Cy r={0.13} h={0.6} n={8} c={glow ? '#ffb070' : '#e8e4f8'} e={glow ? '#ff6a1a' : undefined} ei={pulse} />
        {[0, 1, 2, 3].map((i) => <B key={i} s={[0.44, 0.5, 0.03]} rot={[0, (i * Math.PI) / 4, 0]} c={glow ? '#ffd0a0' : '#c9c4de'} e={glow ? '#ff6a1a' : undefined} ei={pulse * 0.5} />)}
      </group>
    </group>
  );
};

/* Cohete parado sobre y=0 */
const Rocket: React.FC<P> = () => (
  <group>
    <Cy r={0.14} r2={0.2} h={0.22} n={8} pos={[0, 0.11, 0]} c="#3a3550" />
    <Cy r={0.24} h={1.45} n={10} pos={[0, 0.94, 0]} c="#c8763a" e="#5a2a0a" ei={0.3} />
    {[-1, 1].map((sd) => <group key={sd} position={[0.31 * sd, 0.72, 0]}><Cy r={0.09} h={1.0} n={8} c="#f4f1ff" /><mesh position={[0, 0.6, 0]}><coneGeometry args={[0.09, 0.2, 8]} /><M c="#f4f1ff" /></mesh><Cy r={0.06} r2={0.08} h={0.12} n={8} pos={[0, -0.56, 0]} c="#3a3550" /></group>)}
    <Cy r={0.24} r2={0.32} h={0.18} n={10} pos={[0, 1.75, 0]} c="#f4f1ff" />
    <Cy r={0.32} h={0.62} n={10} pos={[0, 2.15, 0]} c="#f4f1ff" />
    <mesh position={[0, 2.71, 0]}><coneGeometry args={[0.32, 0.5, 10]} /><M c="#f4f1ff" /></mesh>
    <Cy r={0.325} h={0.07} n={10} pos={[0, 2.0, 0]} c={C.cyan} e={C.cyan} ei={1.2} />
    <Cy r={0.245} h={0.07} n={10} pos={[0, 1.2, 0]} c="#15102b" />
  </group>
);
/* Llama hacia abajo desde y=0 */
const Flame: React.FC<P> = ({ t, tt, p }) => {
  const { r = 0.22, len = 1.3 } = p; const k = eo(tt / 0.25) * (1 + Math.sin(t * 38) * 0.12);
  return (
    <group scale={[1, k, 1]}>
      <mesh position={[0, -len / 2, 0]} rotation={[Math.PI, 0, 0]}><coneGeometry args={[r, len, 8]} /><meshBasicMaterial color="#ff7a1a" toneMapped={false} /></mesh>
      <mesh position={[0, -len * 0.32, 0]} rotation={[Math.PI, 0, 0]}><coneGeometry args={[r * 0.6, len * 0.64, 8]} /><meshBasicMaterial color="#ffe14a" toneMapped={false} /></mesh>
      <pointLight position={[0, -0.4, 0.4]} intensity={18} color="#ff9a3a" distance={6} />
    </group>
  );
};
/* Humo que se abre en el piso */
const Smoke: React.FC<P> = ({ tt, p }) => {
  const { n = 9, seed = 3, spread = 1.5, sz: SZ = 1 } = p; const r = rnd(seed);
  return (<group>{Array.from({ length: n }, (_, i) => { const a = r() * 6.28, d = 0.25 + r() * spread, sz = (0.22 + r() * 0.3) * SZ, dl = r() * 0.5; const k = eo((tt - dl) / 1.6); if (k <= 0) return null;
    return <mesh key={i} position={[Math.cos(a) * d * k, sz * 0.6 * k + k * 0.15, Math.sin(a) * d * k * 0.6]} scale={sz * (0.4 + k)}><icosahedronGeometry args={[1, 0]} /><M c="#d9d2f2" e="#6a5aa8" ei={0.4} /></mesh>; })}</group>);
};
/* Torre de lanzamiento */
const Tower: React.FC<P> = ({ p }) => { const { h = 3 } = p; return (
  <group>
    {[-0.14, 0.14].map((x) => <B key={x} s={[0.05, h, 0.05]} pos={[x, h / 2, 0]} c="#8d8aa0" />)}
    {Array.from({ length: Math.floor(h / 0.3) }, (_, i) => <B key={i} s={[0.4, 0.035, 0.035]} pos={[0, 0.2 + i * 0.3, 0]} rot={[0, 0, i % 2 ? 0.6 : -0.6]} c="#8d8aa0" />)}
    <B s={[0.08, 0.08, 0.08]} pos={[0, h + 0.06, 0]} c={C.red} e={C.red} ei={3} />
  </group>); };

/* Planeta Marte */
const Mars: React.FC<P> = ({ t }) => (
  <group rotation={[0.25, t * 0.4, 0]}>
    <mesh><icosahedronGeometry args={[1, 1]} /><M c="#d9572b" e="#7a2410" ei={0.7} /></mesh>
    {[[0.5, 0.5, 0.65, 0.34], [-0.7, 0.1, 0.65, 0.3], [0.1, -0.6, 0.75, 0.26], [-0.3, 0.65, -0.65, 0.34], [0.8, -0.2, -0.5, 0.3], [-0.55, -0.55, -0.55, 0.28]].map(([x, y, z, s], i) => (
      <mesh key={i} position={[x * 0.84, y * 0.84, z * 0.84]} scale={s}><icosahedronGeometry args={[0.6, 0]} /><M c="#a03a1c" e="#4a1408" ei={0.6} /></mesh>))}
    <mesh position={[0, 0.93, 0]} scale={[0.4, 0.14, 0.4]}><icosahedronGeometry args={[1, 0]} /><M c="#f4f1ff" /></mesh>
  </group>
);
/* Suelo de Marte: tapa la grilla */
const MarsGround: React.FC<P> = ({ p }) => {
  const { seed = 4, rocks = 14 } = p; const r = rnd(seed);
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}><circleGeometry args={[60, 24]} /><M c="#b8492a" e="#5c1c0c" ei={0.55} /></mesh>
      {Array.from({ length: rocks }, (_, i) => { const x = (r() - 0.5) * 9, z = -1.2 - r() * 9, s = 0.12 + r() * 0.3;
        return <mesh key={i} position={[x, s * 0.4, z]} rotation={[r() * 3, r() * 3, 0]} scale={[s * 1.3, s * 0.8, s]}><icosahedronGeometry args={[1, 0]} /><M c="#7c2c18" /></mesh>; })}
      {[[-6, -14, 5, 1.6], [3, -18, 8, 2.4], [9, -13, 5, 1.4]].map(([x, z, w, h], i) => (
        <mesh key={'m' + i} position={[x, h * 0.3, z]} scale={[w, h, w * 0.6]}><icosahedronGeometry args={[1, 0]} /><M c="#8a321a" e="#3a1006" ei={0.5} /></mesh>))}
    </group>
  );
};
const Rock: React.FC<P> = ({ p }) => { const { color = '#7c2c18', sx = 1.3, sy = 0.8 } = p; return (
  <mesh rotation={[0.4, 0.7, 0.2]} scale={[sx, sy, 1]}><icosahedronGeometry args={[1, 0]} /><M c={color} /></mesh>); };

/* Grúa voladora: etapa de descenso con cohetes que baja al rover con cables. Origen = la etapa. */
const SkyCrane: React.FC<P> = ({ t, p }) => {
  const { start = 1.8, dur = 2.2, drop = 1.5, rs = 0.72, touch = false } = p;
  const k = eio((t - start) / dur); const L = 0.12 + drop * k; const ry = -(0.16 + L + 0.94 * rs);
  return (
    <group>
      <B s={[1.15, 0.2, 0.85]} c="#3a3550" />
      <B s={[0.7, 0.16, 0.5]} pos={[0, 0.16, 0]} c="#c9c4de" />
      <B s={[1.17, 0.05, 0.87]} pos={[0, -0.08, 0]} c={C.gold} e={C.gold} ei={0.4} />
      {[[-0.6, -0.42], [0.6, -0.42], [-0.6, 0.42], [0.6, 0.42]].map(([x, z], i) => (
        <group key={i} position={[x, -0.08, z]} rotation={[0, 0, x > 0 ? 0.35 : -0.35]}>
          <Cy r={0.1} r2={0.06} h={0.16} n={6} c="#15102b" />
          <group position={[0, -0.08, 0]}><Flame t={t + i} tt={1} p={{ r: 0.1, len: 0.55 }} /></group>
        </group>))}
      {[[-0.3, 0.2], [0.3, 0.2], [0, -0.25]].map(([x, z], i) => <B key={i} s={[0.025, L + 0.1, 0.025]} pos={[x, -0.1 - (L + 0.1) / 2, z]} c="#f4f1ff" e="#fff" ei={0.8} />)}
      <group position={[0, ry, 0]} scale={rs}><Rover t={t} tt={0} p={{ arm: false, mast: false }} /></group>
      {touch && k > 0.97 && <group position={[0, ry, 0]}><Smoke t={t} tt={(t - start - dur * 0.97) * 2.2} p={{ n: 6, spread: 0.9, seed: 8 }} /></group>}
    </group>
  );
};

/* Rayo entre dos puntos (láser) */
const Beam: React.FC<P> = ({ t, tt, p }) => {
  const { from = [0, 0, 0], to = [1, 0, 0], color = C.red } = p;
  const a = new THREE.Vector3(...(from as V3)), b = new THREE.Vector3(...(to as V3)); const k = eo(tt / 0.18);
  const d = b.clone().sub(a); const len = d.length() * k; const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.clone().normalize());
  const mid = a.clone().add(d.clone().normalize().multiplyScalar(len / 2)); const fl = 1 + Math.sin(t * 40) * 0.3;
  return (<group>
    <mesh position={mid} quaternion={q}><boxGeometry args={[0.035, len, 0.035]} /><meshBasicMaterial color={color} toneMapped={false} /></mesh>
    {k > 0.95 && <mesh position={b} scale={0.12 * fl}><icosahedronGeometry args={[1, 0]} /><meshBasicMaterial color="#ffe14a" toneMapped={false} /></mesh>}
  </group>);
};

/* Viaje: puntos en arco entre dos posiciones y una cápsula que avanza */
const Trip: React.FC<P> = ({ t, tt, p }) => {
  const { from = [-1, 0.6, 0], to = [1, 2.6, 0], dur = 1.8, n = 14, lift = 0.7, start = 0 } = p; const k = eio((tt - start) / dur);
  const pt = (u: number): V3 => [lerp(from[0], to[0], u), lerp(from[1], to[1], u) + Math.sin(u * Math.PI) * lift, lerp(from[2], to[2], u)];
  const c = pt(k), c2 = pt(Math.min(1, k + 0.02)); const ang = Math.atan2(c2[1] - c[1], c2[0] - c[0]);
  return (<group>
    {Array.from({ length: n }, (_, i) => { const u = (i + 0.5) / n; return <mesh key={i} position={pt(u)} scale={u <= k ? 0.06 : 0.035}><icosahedronGeometry args={[1, 0]} /><meshBasicMaterial color={u <= k ? C.gold : '#6b5aa8'} toneMapped={false} /></mesh>; })}
    <group position={c} rotation={[0, 0, ang - Math.PI / 2]}>
      <mesh position={[0, 0.12, 0]}><coneGeometry args={[0.13, 0.26, 8]} /><M c="#f4f1ff" e="#fff" ei={0.4} /></mesh>
      <Cy r={0.13} h={0.12} n={8} pos={[0, -0.06, 0]} c="#c9c4de" />
      <group position={[0, -0.12, 0]}><Flame t={t} tt={1} p={{ r: 0.08, len: 0.3 }} /></group>
    </group>
  </group>);
};

/* Rueda grande en primer plano, eje en z. holes = agujeros que aparecen */
const Wheel: React.FC<P> = ({ t, tt, p }) => {
  const { holes = 0, speed = 0.9, holeAt = 0 } = p; const R = 1, W = 0.62; const r = rnd(17);
  return (
    <group rotation={[0, 0, -t * speed]}>
      <Cy r={R} h={W} n={20} rot={[Math.PI / 2, 0, 0]} c="#a9a4c2" />
      <Cy r={R * 0.86} h={W + 0.02} n={20} rot={[Math.PI / 2, 0, 0]} c="#2b2740" />
      <Cy r={0.2} h={W + 0.1} n={8} rot={[Math.PI / 2, 0, 0]} c="#c9c4de" />
      {[0, 1, 2].map((i) => <B key={i} s={[0.09, R * 1.7, W + 0.04]} rot={[0, 0, (i * Math.PI) / 3]} c="#8d8aa0" />)}
      {Array.from({ length: 20 }, (_, i) => { const a = (i / 20) * Math.PI * 2; return <B key={i} s={[0.08, 0.07, W + 0.04]} pos={[Math.cos(a) * (R + 0.02), Math.sin(a) * (R + 0.02), 0]} rot={[0, 0, a + Math.PI / 2]} c="#e8e4f8" />; })}
      {Array.from({ length: holes }, (_, i) => { const a = ((i + 0.5) / holes) * Math.PI * 2 + r() * 0.2; const z = (r() - 0.5) * 0.28; const w = 0.34 + r() * 0.2; const k = pop(tt - holeAt - i * 0.05); if (k <= 0) return null;
        return <group key={'h' + i} position={[Math.cos(a) * (R + 0.012), Math.sin(a) * (R + 0.012), z]} rotation={[0, 0, a + Math.PI / 2]} scale={k}>
          <B s={[w, 0.05, 0.3 + r() * 0.14]} c="#0b0714" /><B s={[w + 0.07, 0.03, 0.05]} pos={[0, 0, 0.14]} rot={[0, 0.5, 0]} c={C.red} e={C.red} ei={1.6} />
        </group>; })}
    </group>
  );
};

const Solar: React.FC<P> = () => (
  <group>
    <B s={[0.07, 0.9, 0.07]} pos={[0, -0.75, -0.05]} c="#8d8aa0" />
    <group rotation={[-0.35, 0, 0]}>
      <B s={[1.35, 0.9, 0.05]} c="#c9c4de" />
      {[-0.44, 0, 0.44].map((x) => [-0.21, 0.21].map((y) => <B key={x + '_' + y} s={[0.4, 0.38, 0.06]} pos={[x, y, 0.005]} c="#1f4fd6" e="#2f6bff" ei={0.5} />))}
    </group>
  </group>
);
const Rtg: React.FC<P> = ({ t }) => { const pu = 1.6 + Math.sin(t * 5) * 0.8; return (
  <group>
    <mesh scale={0.3}><icosahedronGeometry args={[1, 1]} /><M c="#ffb070" e="#ff6a1a" ei={pu} /></mesh>
    {[0, 1, 2].map((i) => (
      <group key={i} rotation={[Math.PI / 2, 0, 0]}><group rotation={[0, (i * Math.PI) / 3, 0]}><group scale={[1, 0.38, 1]} rotation={[Math.PI / 2, 0, 0]}>
        <mesh><torusGeometry args={[0.85, 0.035, 6, 28]} /><meshBasicMaterial color={C.cyan} toneMapped={false} /></mesh>
        <mesh position={[Math.cos(t * 3 + i * 2.1) * 0.85, Math.sin(t * 3 + i * 2.1) * 0.85, 0]} scale={[0.09, 0.09 / 0.38, 0.09]}><icosahedronGeometry args={[1, 0]} /><meshBasicMaterial color="#fff" toneMapped={false} /></mesh>
      </group></group></group>))}
    <pointLight position={[0, 0, 0.8]} intensity={10} color="#ff8a3a" distance={5} />
  </group>); };

const Cake: React.FC<P> = ({ t }) => (
  <group>
    <Cy r={0.62} h={0.06} n={12} pos={[0, 0.03, 0]} c="#f4f1ff" />
    <Cy r={0.52} h={0.4} n={12} pos={[0, 0.26, 0]} c="#ff6b9a" />
    <Cy r={0.54} h={0.1} n={12} pos={[0, 0.46, 0]} c="#fff" />
    {[-0.24, 0, 0.24].map((x, i) => <group key={i} position={[x, 0.51, i === 1 ? 0.12 : -0.05]}>
      <B s={[0.06, 0.3, 0.06]} pos={[0, 0.15, 0]} c={[C.cyan, C.gold, C.green][i]} />
      <mesh position={[0, 0.38 + Math.sin(t * 20 + i) * 0.01, 0]} scale={[1, 1 + Math.sin(t * 17 + i * 2) * 0.2, 1]}><coneGeometry args={[0.055, 0.16, 6]} /><meshBasicMaterial color="#ffe14a" toneMapped={false} /></mesh>
    </group>)}
  </group>
);

export const EXTRA = { rover: Rover, rocket: Rocket, flame: Flame, smoke: Smoke, tower: Tower, mars: Mars, marsground: MarsGround, rock: Rock,
  skycrane: SkyCrane, beam: Beam, trip: Trip, wheel: Wheel, solar: Solar, rtg: Rtg, cake: Cake };
