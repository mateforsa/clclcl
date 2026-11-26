import React from 'react';
import * as THREE from 'three';
import { M, Label } from '../../src/kit/Props';
import { C, clamp, eo, lerp, pop, rnd } from '../../src/kit/math';

type P = { t: number; tt: number; p: any };
type V3 = [number, number, number];
const STEEL = '#dcdaea', DARK = '#1c1832', PI = Math.PI;
const B: React.FC<{ s: V3; pos?: V3; rot?: V3; c: string; e?: string; ei?: number }> = ({ s, pos, rot, c, e, ei }) => (
  <mesh position={pos} rotation={rot}><boxGeometry args={s} /><M c={c} e={e} ei={ei} /></mesh>
);

/** Satélite: cuerpo + dos paneles solares. rackAt = segundo (tt) en que el frente muestra los servidores;
 *  sunAt = segundo en que los paneles se encienden; grey = apagado (zona sin permiso). */
const Sat: React.FC<P> = ({ t, tt, p }) => {
  const rack = p.rackAt !== undefined ? clamp((tt - p.rackAt) / 0.3) : p.rack ? 1 : 0;
  const sun = p.sunAt !== undefined ? clamp((tt - p.sunAt) / 0.4) : 0;
  const body = p.grey ? '#6d6a80' : STEEL; const pan = p.grey ? '#3a3850' : '#1f48c9';
  return (
    <group rotation={[0.18, Math.sin(t * (p.sway ?? 0.7)) * 0.38, Math.sin(t * 0.5) * 0.05]}>
      <B s={[0.5, 0.62, 0.42]} c={body} e="#7f7aa6" ei={0.3} />
      <B s={[0.52, 0.06, 0.44]} pos={[0, 0.31, 0]} c={C.gold} e={C.gold} ei={p.grey ? 0 : 0.5} />
      {rack > 0 && <group scale={[1, rack, 1]}>
        <B s={[0.42, 0.5, 0.02]} pos={[0, -0.02, 0.215]} c="#15102b" />
        {Array.from({ length: 4 }, (_, i) => { const on = Math.sin(t * (6 + i) + i * 2.1) > -0.2; const col = i % 2 ? C.cyan : C.green;
          return <group key={i}><B s={[0.36, 0.085, 0.02]} pos={[0, -0.2 + i * 0.12, 0.225]} c="#2d1a6e" /><B s={[0.05, 0.05, 0.02]} pos={[-0.13, -0.2 + i * 0.12, 0.24]} c={col} e={col} ei={on ? 3 : 0.4} /><B s={[0.16, 0.025, 0.02]} pos={[0.06, -0.2 + i * 0.12, 0.24]} c="#6b3cff" e="#6b3cff" ei={0.8} /></group>; })}
      </group>}
      {[-1, 1].map((sd) => (
        <group key={sd} position={[sd * 0.25, 0, 0]}>
          <B s={[0.12, 0.05, 0.05]} pos={[sd * 0.06, 0, 0]} c="#8d8aa0" />
          <B s={[0.9, 0.03, 0.5]} pos={[sd * 0.57, 0, 0]} rot={[0.5, 0, 0]} c={pan} e={p.grey ? undefined : '#2f6bff'} ei={0.5 + sun * 1.4} />
          {[0.27, 0.57, 0.87].map((x) => <B key={x} s={[0.02, 0.034, 0.5]} pos={[sd * x, 0, 0]} rot={[0.5, 0, 0]} c={p.grey ? '#55526a' : C.cyan} e={p.grey ? undefined : C.cyan} ei={0.6 + sun * 1.6} />)}
        </group>))}
      <mesh position={[0, -0.4, 0.05]} rotation={[PI, 0, 0]}><coneGeometry args={[0.14, 0.16, 8]} /><M c="#8d8aa0" /></mesh>
    </group>
  );
};

/** Enjambre de puntos en órbita alrededor del origen. n puntos entre R0 y R1; con dur aparecen de a poco. */
const Dots: React.FC<P> = ({ t, tt, p }) => {
  const { n = 60, R0 = 1.2, R1 = 1.5, color = C.cyan, size = 0.07, seed = 4, speed = 0.5, dur = 0 } = p;
  const orb = React.useMemo(() => { const r = rnd(seed); return Array.from({ length: n }, () => {
    const th = r() * PI * 2, ph = Math.acos(2 * r() - 1); const ax = new THREE.Vector3(Math.sin(ph) * Math.cos(th), Math.cos(ph), Math.sin(ph) * Math.sin(th));
    const u = new THREE.Vector3(ax.y, -ax.x, 0); if (u.lengthSq() < 0.01) u.set(1, 0, 0); u.normalize(); const v = new THREE.Vector3().crossVectors(ax, u);
    return { u, v, R: lerp(R0, R1, r()), a0: r() * PI * 2, w: (0.6 + r() * 0.8) * (r() > 0.5 ? 1 : -1) }; }); }, [n, seed, R0, R1]);
  const vis = dur > 0 ? Math.round(n * eo(tt / dur)) : n;
  const geo = React.useMemo(() => { const arr = new Float32Array(Math.max(vis, 1) * 3);
    for (let i = 0; i < vis; i++) { const o = orb[i]; const a = o.a0 + t * speed * o.w; const cs = Math.cos(a) * o.R, sn = Math.sin(a) * o.R;
      arr[i * 3] = o.u.x * cs + o.v.x * sn; arr[i * 3 + 1] = o.u.y * cs + o.v.y * sn; arr[i * 3 + 2] = o.u.z * cs + o.v.z * sn; }
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(arr, 3)); return g; }, [t, vis, orb, speed]);
  if (vis <= 0) return null;
  return <points geometry={geo} frustumCulled={false}><pointsMaterial color={color} size={size} sizeAttenuation toneMapped={false} /></points>;
};

/** Anillo de órbita vacío (punteado). */
const OrbitRing: React.FC<P> = ({ t, p }) => {
  const { R = 1.3, color = C.cyan, n = 28 } = p;
  return (<group rotation={[1.25, 0, 0.3]}><group rotation={[0, 0, t * 0.35]}>
    {Array.from({ length: n }, (_, i) => { const a = (i / n) * PI * 2; return <mesh key={i} position={[Math.cos(a) * R, Math.sin(a) * R, 0]} rotation={[0, 0, a]}><boxGeometry args={[0.035, 0.16, 0.035]} /><meshBasicMaterial color={color} toneMapped={false} /></mesh>; })}
  </group></group>);
};

/** Documento con título, renglones y sello. stampAt = segundo (tt) en que cae el sello. */
const Doc: React.FC<P> = ({ t, tt, p }) => {
  const { title = '', stamp, stampColor = '#1f9d55', stampAt = 0.3, lines = 4 } = p; const k = pop(tt - stampAt);
  return (
    <group rotation={[0, Math.sin(t * 1.3 + (p.ph ?? 0)) * 0.12, 0]}>
      <B s={[0.9, 1.2, 0.04]} c="#f4f1ff" />
      {title && <group position={[0, 0.42, 0.025]}><Label t={t} tt={tt} p={{ text: title, w: 0.8, h: 0.2, color: '#1a1030', size: 0.7, weight: 900 }} /></group>}
      {Array.from({ length: lines }, (_, i) => <B key={i} s={[i === lines - 1 ? 0.4 : 0.68, 0.04, 0.01]} pos={[i === lines - 1 ? -0.14 : 0, 0.2 - i * 0.14, 0.025]} c="#b9a3e8" />)}
      {stamp && k > 0 && <group position={[0.05, -0.3, 0.06]} rotation={[0, 0, 0.16]} scale={k}>
        <Label t={t} tt={tt} p={{ text: stamp, w: 0.84, h: 0.3, bg: stampColor, color: '#fff', size: 0.62, weight: 900, depth: 0.03 }} /></group>}
    </group>
  );
};

/** Cohete genérico. Alto 2. Origen en la base. flame = segundo (tt) en que enciende. */
const Rocket: React.FC<P> = ({ t, tt, p }) => {
  const on = p.flame !== undefined && tt >= p.flame; const l = 0.9 * (0.82 + 0.18 * Math.sin(t * 41) * Math.sin(t * 17 + 1));
  return (
    <group>
      <mesh position={[0, 0.85, 0]}><cylinderGeometry args={[0.2, 0.2, 1.5, 12]} /><M c={STEEL} e="#7f7aa6" ei={0.35} /></mesh>
      <mesh position={[0, 1.8, 0]}><coneGeometry args={[0.2, 0.4, 12]} /><M c={STEEL} e="#7f7aa6" ei={0.35} /></mesh>
      <mesh position={[0, 1.2, 0]}><cylinderGeometry args={[0.206, 0.206, 0.14, 12]} /><M c={C.magenta} e={C.magenta} ei={0.6} /></mesh>
      <mesh position={[0, 0.16, 0]}><cylinderGeometry args={[0.21, 0.21, 0.16, 12]} /><M c={DARK} /></mesh>
      {[0, 1, 2, 3].map((i) => <group key={i} rotation={[0, (i * PI) / 2, 0]}><B s={[0.22, 0.42, 0.04]} pos={[0.27, 0.3, 0]} c={DARK} /></group>)}
      {on && <group position={[0, 0.08, 0]}>
        <mesh position={[0, -l / 2, 0]} rotation={[PI, 0, 0]}><coneGeometry args={[0.17, l, 8]} /><meshBasicMaterial color="#ff8a1e" toneMapped={false} /></mesh>
        <mesh position={[0, -l * 0.3, 0]} rotation={[PI, 0, 0]}><coneGeometry args={[0.09, l * 0.6, 8]} /><meshBasicMaterial color="#fff3b0" toneMapped={false} /></mesh>
      </group>}
    </group>
  );
};

/** Grilla de cubos que aparecen de a uno (de abajo hacia arriba). Origen: centro de la base. */
const Cubes: React.FC<P> = ({ tt, p }) => {
  const { n = 58, cols = 8, size = 0.18, gap = 0.04, color = C.gold, stagger = 0.02 } = p; const st = size + gap; const w = cols * st - gap;
  return (<group>{Array.from({ length: n }, (_, i) => { const k = pop(tt - i * stagger); if (k <= 0) return null;
    return <mesh key={i} position={[-w / 2 + size / 2 + (i % cols) * st, size / 2 + Math.floor(i / cols) * st, 0]} scale={k}><boxGeometry args={[size, size, size]} /><M c={color} e={color} ei={0.55} /></mesh>; })}</group>);
};

/** Red: mini satélites en zigzag unidos por líneas. */
const Net: React.FC<P> = ({ t, tt, p }) => {
  const { n = 5, w = 2.6, zig = 0.2, stagger = 0.12, sc = 0.3 } = p;
  const pts = Array.from({ length: n }, (_, i) => [-w / 2 + (i / (n - 1)) * w, (i % 2 ? 1 : -1) * zig + Math.sin(t * 1.4 + i) * 0.03] as [number, number]);
  return (<group>
    {pts.slice(1).map(([x, y], i) => { const [x0, y0] = pts[i]; const k = eo((tt - (i + 1) * stagger) / 0.25); if (k <= 0) return null; const dx = x - x0, dy = y - y0; const len = Math.hypot(dx, dy) * k;
      return <mesh key={'l' + i} position={[x0 + (dx * k) / 2, y0 + (dy * k) / 2, -0.05]} rotation={[0, 0, Math.atan2(dy, dx)]}><boxGeometry args={[len, 0.025, 0.025]} /><meshBasicMaterial color={C.cyan} toneMapped={false} /></mesh>; })}
    {pts.map(([x, y], i) => { const k = pop(tt - i * stagger); if (k <= 0) return null; return <group key={i} position={[x, y, 0]} scale={k * sc}><Sat t={t + i} tt={tt} p={{ rack: true }} /></group>; })}
  </group>);
};

/** Basura espacial: pedazos que giran y derivan. */
const Debris: React.FC<P> = ({ t, tt, p }) => {
  const { n = 9, w = 1.6, h = 0.9, seed = 8 } = p;
  const pts = React.useMemo(() => { const r = rnd(seed); return Array.from({ length: n }, () => [r() - 0.5, r() - 0.5, r() - 0.5, 0.06 + r() * 0.1, r() * 6]); }, [n, seed]);
  return (<group>{pts.map(([x, y, z, s, ph], i) => { const k = pop(tt - i * 0.05); if (k <= 0) return null;
    return <mesh key={i} position={[x * w + Math.sin(t * 0.7 + ph) * 0.08, y * h + Math.cos(t * 0.9 + ph) * 0.06, z * 0.5]} rotation={[t * 1.5 + ph, t * 1.1 + ph, ph]} scale={k}>
      {i % 3 === 0 ? <boxGeometry args={[s * 2.4, s * 0.3, s * 1.2]} /> : <icosahedronGeometry args={[s, 0]} />}<M c={i % 3 === 0 ? '#3a57b0' : '#8d8aa0'} e={i % 3 === 0 ? '#2f6bff' : '#ff7a3d'} ei={0.35} /></mesh>; })}</group>);
};

/** Zona translúcida (plano de color). */
const Zone: React.FC<P> = ({ tt, p }) => {
  const { w = 3.6, h = 1.2, color = C.red, o = 0.2 } = p;
  return <mesh><planeGeometry args={[w, h]} /><meshBasicMaterial color={color} transparent opacity={o * clamp(tt / 0.3 + (p.fade ? 0 : 1))} toneMapped={false} depthWrite={false} /></mesh>;
};

/** Línea punteada horizontal. */
const Dash: React.FC<P> = ({ t, p }) => {
  const { w = 3.6, n = 14, color = C.cyan } = p; const st = w / n; const off = ((t * 0.25) % 1) * st;
  return (<group>{Array.from({ length: n }, (_, i) => <mesh key={i} position={[-w / 2 + i * st + off, 0, 0]}><boxGeometry args={[st * 0.6, 0.04, 0.04]} /><meshBasicMaterial color={color} toneMapped={false} /></mesh>)}</group>);
};

/** Sol low-poly con rayos. */
const Sun: React.FC<P> = ({ t, p }) => {
  const { r = 0.3 } = p;
  return (<group>
    <mesh rotation={[0, t * 0.6, 0]} scale={1 + Math.sin(t * 4) * 0.04}><icosahedronGeometry args={[r, 1]} /><meshBasicMaterial color="#ffd36b" toneMapped={false} /></mesh>
    <group rotation={[0, 0, t * 0.5]}>{Array.from({ length: 8 }, (_, i) => <group key={i} rotation={[0, 0, (i * PI) / 4]}><mesh position={[0, r * 1.75, 0]}><boxGeometry args={[0.05, r * 0.7, 0.05]} /><meshBasicMaterial color={C.gold} toneMapped={false} /></mesh></group>)}</group>
  </group>);
};

export const EXTRA = { sat: Sat, dots: Dots, orbitring: OrbitRing, doc: Doc, rocket: Rocket, cubes: Cubes, net: Net, debris: Debris, zone: Zone, dash: Dash, sun: Sun };
