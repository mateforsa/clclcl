import React, { useMemo } from 'react';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';
import { M, Label, useTex } from '../../src/kit/Props';
import { clamp, eio, eo, lerp, pop, rnd } from '../../src/kit/math';

// Look propio de este video (distinto del muelle al amanecer de exportaciones-agro-5717): el Olímpico de Roma de noche en 1973,
// con tonos de TV vieja (verde de cancha apagado, negro azulado, rojo Independiente) y un living de casa con luz de velador para el
// VHS. Personas: muñecos sin rasgos (cabeza lisa, sin ojos). Camisetas lisas sin escudos ni números. Todo genérico, sin logos.
type P = { t: number; tt: number; p: any };
type V3 = [number, number, number];
const PI = Math.PI;

export const ROJO = '#c8102e', ROJO2 = '#8e0c22', CREMA = '#efe6cf', INK = '#0b0d14', NEGRO = '#121318', BLANCO = '#e9e6dc';

const B: React.FC<{ s: V3; pos?: V3; rot?: V3; c: string; e?: string; ei?: number; o?: number }> = ({ s, pos, rot, c, e, ei, o }) => (
  <mesh position={pos} rotation={rot}><boxGeometry args={s} /><M c={c} e={e} ei={ei} o={o} /></mesh>
);
const Cyl: React.FC<{ r: number; r2?: number; h: number; pos?: V3; rot?: V3; seg?: number; c: string; e?: string; ei?: number }> = ({ r, r2, h, pos, rot, seg = 12, c, e, ei }) => (
  <mesh position={pos} rotation={rot}><cylinderGeometry args={[r2 ?? r, r, h, seg]} /><M c={c} e={e} ei={ei} /></mesh>
);
/** curva por tramos [[t, v], ...] con easing: continua, sin saltos */
export const curve = (kf: [number, number][], t: number) => {
  if (!kf || !kf.length) return 0; if (t <= kf[0][0]) return kf[0][1];
  for (let i = 1; i < kf.length; i++) if (t < kf[i][0]) { const [t0, v0] = kf[i - 1], [t1, v1] = kf[i]; return lerp(v0, v1, eio((t - t0) / (t1 - t0))); }
  return kf[kf.length - 1][1];
};
/** camino por tramos [[t, x, y, z], ...] interpolado lineal (para pelota y jugadores: movimiento continuo) */
const path3 = (kf: number[][], t: number, ease = false): V3 => {
  if (t <= kf[0][0]) return [kf[0][1], kf[0][2], kf[0][3]];
  for (let i = 1; i < kf.length; i++) if (t < kf[i][0]) { const a = kf[i - 1], b = kf[i]; let u = (t - a[0]) / (b[0] - a[0]); if (ease) u = eio(u);
    return [lerp(a[1], b[1], u), lerp(a[2], b[2], u), lerp(a[3], b[3], u)]; }
  const l = kf[kf.length - 1]; return [l[1], l[2], l[3]];
};

/* ---------- Cartel 3D: el texto va 2 cm delante del panel ---------- */
export const Sign: React.FC<P> = ({ t, tt, p }) => {
  const { w = 1, h = 0.3, bg = INK, color = '#fff', size = 0.62, weight = 900, depth = 0.04, text = '', border } = p;
  return (
    <group>
      <B s={[w, h, depth]} c={bg} />
      <group position={[0, 0, depth / 2 + 0.02]}><Label t={t} tt={tt} p={{ text, w: w * 0.96, h: h * 0.9, color, size, weight, depth: 0, border }} /></group>
    </group>
  );
};

/* ---------- Muñeco sin rasgos con poses que se mezclan (sin saltos) ---------- */
const KITS: Record<string, { shirt: string; shorts: string; socks: string; stripe?: string; sleeve?: string }> = {
  ind: { shirt: ROJO, shorts: '#1b2440', socks: ROJO2 },
  juv: { shirt: BLANCO, shorts: BLANCO, socks: NEGRO, stripe: NEGRO },
  ajax: { shirt: BLANCO, shorts: BLANCO, socks: BLANCO },
  zoff: { shirt: '#4a4f5c', shorts: NEGRO, socks: '#4a4f5c' },
  gk: { shirt: '#3f6b46', shorts: NEGRO, socks: '#3f6b46' },
  civ: { shirt: '#6a5a48', shorts: '#2a2d38', socks: '#2a2d38' },
  hincha: { shirt: ROJO, shorts: '#2a2d38', socks: '#2a2d38' },
  amigo: { shirt: '#2f5d8a', shorts: '#2a2d38', socks: '#2a2d38' },
  abuela: { shirt: '#7a5b8a', shorts: '#3a3340', socks: '#3a3340' },
};
type Pose = { aL: V3; aR: V3; run: number; jump: number; kick: number; sit: number; head: number; dive: number };
const POSES: Record<string, Pose> = {
  idle: { aL: [0, 0, -0.1], aR: [0, 0, 0.1], run: 0, jump: 0, kick: 0, sit: 0, head: 0, dive: 0 },
  walk: { aL: [0, 0, -0.1], aR: [0, 0, 0.1], run: 0.45, jump: 0, kick: 0, sit: 0, head: 0, dive: 0 },
  run: { aL: [0, 0, -0.14], aR: [0, 0, 0.14], run: 1, jump: 0, kick: 0, sit: 0, head: 0, dive: 0 },
  cheer: { aL: [0, 0, -2.6], aR: [0, 0, 2.6], run: 0, jump: 1, kick: 0, sit: 0, head: 0, dive: 0 },
  kick: { aL: [-0.5, 0, -0.7], aR: [0.5, 0, 0.7], run: 0, jump: 0, kick: 1, sit: 0, head: 0, dive: 0 },
  gk: { aL: [0, 0, -0.9], aR: [0, 0, 0.9], run: 0, jump: 0, kick: 0, sit: 0, head: 0, dive: 0 },
  reach: { aL: [0, 0, -2.3], aR: [0, 0, 2.3], run: 0, jump: 0.6, kick: 0, sit: 0, head: -0.2, dive: 0 },
  dive: { aL: [0, 0, -2.4], aR: [0, 0, 2.4], run: 0, jump: 0, kick: 0, sit: 0, head: 0, dive: 1 },
  sad: { aL: [0.1, 0, -0.05], aR: [0.1, 0, 0.05], run: 0, jump: 0, kick: 0, sit: 0, head: 0.3, dive: 0 },
  sit: { aL: [-0.6, 0, -0.15], aR: [-0.6, 0, 0.15], run: 0, jump: 0, kick: 0, sit: 1, head: 0, dive: 0 },
  type: { aL: [-1.1, 0, -0.15], aR: [-1.1, 0, 0.15], run: 0, jump: 0, kick: 0, sit: 1, head: 0.1, dive: 0 },
  hold: { aL: [-1.0, 0, -0.25], aR: [-1.0, 0, 0.25], run: 0, jump: 0, kick: 0, sit: 0, head: 0.15, dive: 0 },
  point: { aL: [0, 0, -0.1], aR: [-1.45, 0, 0.15], run: 0, jump: 0, kick: 0, sit: 0, head: 0, dive: 0 },
};
const mixPose = (seq: [number, string][], t: number, d = 0.35): Pose => {
  let cur = POSES[seq[0][1]];
  for (let i = 1; i < seq.length; i++) { const [ti, nm] = seq[i]; if (t < ti) break; const k = eio((t - ti) / d); const nx = POSES[nm];
    const L = (a: number, b: number) => lerp(a, b, k); const LV = (a: V3, b: V3): V3 => [L(a[0], b[0]), L(a[1], b[1]), L(a[2], b[2])];
    cur = { aL: LV(cur.aL, nx.aL), aR: LV(cur.aR, nx.aR), run: L(cur.run, nx.run), jump: L(cur.jump, nx.jump), kick: L(cur.kick, nx.kick), sit: L(cur.sit, nx.sit), head: L(cur.head, nx.head), dive: L(cur.dive, nx.dive) }; }
  return cur;
};
/** p: kit, pose ('idle'...) o poses [[t, pose], ...], phase, skin, hair, scarf, label (cartel 3D encima), labelAt */
export const Player: React.FC<P> = ({ t, tt, p }) => {
  const { kit = 'ind', pose = 'idle', poses, phase = 0, skin = '#d9a27a', hair = '#1a1410', scarf, label, labelAt = 0, labelW, labelOff = 0, labelY = 2.25, labelRot = 0 } = p;
  const K = KITS[kit] ?? KITS.ind;
  const P0 = mixPose(poses ?? [[0, pose]], t);
  const w = Math.sin((t + phase) * 11), sway = Math.sin((t + phase) * 2.2);
  const aL: V3 = [P0.aL[0] - w * 0.8 * P0.run, P0.aL[1], P0.aL[2] - sway * 0.03];
  const aR: V3 = [P0.aR[0] + w * 0.8 * P0.run, P0.aR[1], P0.aR[2] + sway * 0.03];
  const y0 = P0.jump * Math.abs(Math.sin((t + phase) * 7)) * 0.1 + P0.run * Math.abs(w) * 0.05 + sway * 0.01 - P0.sit * 0.3 + P0.dive * 0.25;
  const leg = (sd: number) => (-1.5 * P0.sit) + w * 0.85 * sd * P0.run + (sd > 0 ? -1.0 * P0.kick : 0.25 * P0.kick);
  const arm = (x: number, r: V3) => (
    <group position={[x, 0.58, 0]} rotation={r}>
      <B s={[0.14, 0.26, 0.15]} pos={[0, -0.1, 0]} c={K.shirt} />
      <B s={[0.11, 0.3, 0.12]} pos={[0, -0.36, 0]} c={kit === 'civ' || kit === 'hincha' || kit === 'amigo' || kit === 'abuela' ? K.shirt : skin} />
      <B s={[0.12, 0.12, 0.13]} pos={[0, -0.54, 0]} c={kit === 'zoff' || kit === 'gk' ? '#d8d4c8' : skin} />
    </group>
  );
  const lk = label ? pop(t - labelAt) : 0;
  return (
    <group>
      <group position={[0, y0, 0]} rotation={[P0.run * 0.14, 0, P0.dive * 1.25]}>
        {[-1, 1].map((sd) => (
          <group key={sd} position={[0.12 * sd, 0.7, 0]} rotation={[leg(sd), 0, 0]}>
            <B s={[0.2, 0.26, 0.22]} pos={[0, -0.1, 0]} c={K.shorts} />
            <B s={[0.14, 0.2, 0.15]} pos={[0, -0.32, 0]} c={K.socks === K.shorts ? K.socks : skin} />
            <B s={[0.15, 0.22, 0.16]} pos={[0, -0.52, 0]} c={K.socks} />
            <B s={[0.18, 0.09, 0.27]} pos={[0, -0.68, 0.04]} c="#0d0a10" />
          </group>
        ))}
        <group position={[0, 0.7, 0]} rotation={[P0.head * 0.6, 0, sway * 0.015]}>
          <B s={[0.52, 0.62, 0.29]} pos={[0, 0.32, 0]} c={K.shirt} />
          {K.stripe && [-0.17, 0, 0.17].map((x) => <B key={x} s={[0.07, 0.625, 0.3]} pos={[x, 0.32, 0]} c={K.stripe!} />)}
          {scarf && <B s={[0.42, 0.1, 0.33]} pos={[0, 0.6, 0]} c={scarf} />}
          {arm(-0.33, aL)}{arm(0.33, aR)}
          <group position={[0, 0.84, 0]} rotation={[P0.head, sway * 0.05, 0]}>
            <B s={[0.37, 0.36, 0.34]} c={skin} />
            <B s={[0.43, 0.17, 0.4]} pos={[0, 0.2, -0.01]} c={hair} />
            <B s={[0.43, 0.2, 0.12]} pos={[0, 0.06, -0.16]} c={hair} />
          </group>
        </group>
      </group>
      {label && lk > 0 && <group position={[labelOff, labelY, 0]} rotation={[0, labelRot, 0]} scale={lk}>
        <Sign t={t} tt={tt} p={{ text: label, w: labelW ?? label.length * 0.13 + 0.25, h: 0.3, bg: INK, color: '#fff', size: 0.62 }} /></group>}
    </group>
  );
};

/* ---------- Pelota (radio 0.13), path: [[t, x, y, z], ...] ---------- */
export const Ball: React.FC<P> = ({ t, p }) => {
  const { r = 0.13, path, spin = 4 } = p;
  const pos = path ? path3(path, t) : [0, r, 0];
  return (
    <group position={pos as V3} rotation={[t * spin, t * spin * 0.6, 0]} scale={r / 0.17}>
      <mesh><icosahedronGeometry args={[0.17, 1]} /><M c="#e6e2d6" e="#e6e2d6" ei={0.15} /></mesh>
      {[[0, 1, 0], [0, -1, 0], [0.9, 0.3, 0.3], [-0.9, 0.3, -0.3], [0.3, 0.3, -0.9], [-0.3, -0.3, 0.9]].map((q, i) =>
        <mesh key={i} position={[q[0] * 0.14, q[1] * 0.14, q[2] * 0.14]}><icosahedronGeometry args={[0.06, 0]} /><M c="#15151c" /></mesh>)}
    </group>
  );
};

/* ---------- Arco con red. Boca hacia +z ---------- */
export const Goal: React.FC<P> = ({ p }) => {
  const { w = 2.8, h = 1.2, d = 0.8 } = p; const post = '#d8d6cc', net = '#5f6670';
  const nx = Math.round(w / 0.28), ny = Math.round(h / 0.28);
  return (
    <group>
      {[-1, 1].map((s) => <B key={s} s={[0.08, h, 0.08]} pos={[(w / 2) * s, h / 2, 0]} c={post} />)}
      <B s={[w + 0.08, 0.08, 0.08]} pos={[0, h, 0]} c={post} />
      {Array.from({ length: nx + 1 }, (_, i) => <B key={'v' + i} s={[0.018, h, 0.018]} pos={[-w / 2 + (i * w) / nx, h / 2, -d]} c={net} />)}
      {Array.from({ length: ny + 1 }, (_, i) => <B key={'h' + i} s={[w, 0.018, 0.018]} pos={[0, (i * h) / ny, -d]} c={net} />)}
      {[-1, 1].map((s) => Array.from({ length: ny + 1 }, (_, i) => <B key={s + 'd' + i} s={[0.018, 0.018, d]} pos={[(w / 2) * s, (i * h) / ny, -d / 2]} c={net} />))}
      {Array.from({ length: nx + 1 }, (_, i) => <B key={'t' + i} s={[0.018, 0.018, d]} pos={[-w / 2 + (i * w) / nx, h, -d / 2]} c={net} />)}
    </group>
  );
};

/* ---------- Estadio de noche (tapa el set 'room'): cancha, pista de atletismo, tribunas bajas y oscuras ---------- */
export const Stadium: React.FC<P> = ({ t, p }) => {
  const { box, center, crowd = true, cheer = 0, cheerAt = 0 } = p;
  const pal = ['#5a1620', '#3b3d47', '#5a1620', '#2c2e36', '#4a4436', '#3b3d47'];
  const ppl = useMemo(() => { const r = rnd(17); const o: { x: number; z: number; y: number; c: string; ph: number }[] = [];
    // tribuna del fondo (z de -9.2 hacia atrás) y laterales (x = ±5.4)
    for (let row = 0; row < 5; row++) for (let i = 0; i < 40; i++) o.push({ x: -7.8 + i * 0.4 + (r() - 0.5) * 0.1, z: -9.6 - row * 0.55, y: 0.35 + row * 0.38, c: pal[Math.floor(r() * pal.length)], ph: r() * 6 });
    for (const s of [-1, 1]) for (let row = 0; row < 5; row++) for (let i = 0; i < 34; i++) o.push({ x: s * (5.7 + row * 0.55), z: -9 + i * 0.5 + (r() - 0.5) * 0.1, y: 0.35 + row * 0.38, c: pal[Math.floor(r() * pal.length)], ph: r() * 6 });
    return o; }, []);
  const ch = cheer ? clamp((t - cheerAt) / 0.4) : 0;
  // Este mundo va sobre el set 'void' (sin paredes): se apagan sus luces de color y la niebla violeta, para la noche de 1973.
  const { scene } = useThree();
  React.useLayoutEffect(() => {
    scene.traverse((o: any) => { if (o.isPointLight && o.distance === 18) o.intensity = 0; if (o.isAmbientLight) o.intensity = 0.55; if (o.isDirectionalLight && o.intensity > 1.5) o.intensity = 0.9; });
    if (scene.fog) { (scene.fog as any).near = 60; (scene.fog as any).far = 200; }
  });
  const L = '#c9d3c4';
  const ln = (s: V3, pos: V3, k: string) => <B key={k} s={s} pos={pos} c={L} />;
  return (
    <group>
      <color attach="background" args={['#04050a']} />
      <mesh position={[0, 6, -14]}><planeGeometry args={[60, 30]} /><meshBasicMaterial color="#05060b" toneMapped={false} /></mesh>
      {[-1, 1].map((k) => <mesh key={k} position={[k * 9, 6, 0]} rotation={[0, -k * PI / 2, 0]}><planeGeometry args={[60, 30]} /><meshBasicMaterial color="#05060b" toneMapped={false} /></mesh>)}
      {/* pista (rojiza apagada) y cancha */}
      <mesh rotation={[-PI / 2, 0, 0]} position={[0, 0.016, 0]}><planeGeometry args={[40, 40]} /><meshBasicMaterial color="#2a1a18" toneMapped={false} /></mesh>
      {Array.from({ length: 10 }, (_, i) => <B key={i} s={[8, 0.04, 1.6]} pos={[0, 0.02, -8 + 0.8 + i * 1.6]} c={i % 2 ? '#2f6a3c' : '#285b34'} />)}
      {ln([0.05, 0.02, 16], [-4, 0.05, 0], 'l')}{ln([0.05, 0.02, 16], [4, 0.05, 0], 'r')}
      {box !== undefined && <group>
        {ln([8, 0.02, 0.05], [0, 0.05, box], 'g')}
        {ln([4.6, 0.02, 0.05], [0, 0.05, box + 2.0], 'b1')}{ln([0.05, 0.02, 2.0], [-2.3, 0.05, box + 1.0], 'b2')}{ln([0.05, 0.02, 2.0], [2.3, 0.05, box + 1.0], 'b3')}
        {ln([2.4, 0.02, 0.05], [0, 0.05, box + 0.8], 'b4')}{ln([0.05, 0.02, 0.8], [-1.2, 0.05, box + 0.4], 'b5')}{ln([0.05, 0.02, 0.8], [1.2, 0.05, box + 0.4], 'b6')}
        <B s={[0.12, 0.021, 0.12]} pos={[0, 0.05, box + 1.45]} c={L} />
      </group>}
      {center !== undefined && <group>{ln([8, 0.02, 0.05], [0, 0.05, center], 'c')}
        <mesh position={[0, 0.055, center]} rotation={[-PI / 2, 0, 0]}><ringGeometry args={[1.0, 1.05, 28]} /><meshBasicMaterial color={L} toneMapped={false} /></mesh></group>}
      {/* tribunas: escalones oscuros */}
      {Array.from({ length: 5 }, (_, r) => <B key={'f' + r} s={[18, 0.38, 0.55]} pos={[0, 0.19 + r * 0.38, -9.6 - r * 0.55]} c={r % 2 ? '#14161e' : '#191b24'} />)}
      {[-1, 1].map((s) => Array.from({ length: 5 }, (_, r) => <B key={s + 's' + r} s={[0.55, 0.38, 18]} pos={[s * (5.7 + r * 0.55), 0.19 + r * 0.38, 0]} c={r % 2 ? '#14161e' : '#191b24'} />))}
      <B s={[18, 0.5, 0.1]} pos={[0, 0.25, -9.2]} c="#0e0f15" />
      {[-1, 1].map((s) => <B key={s} s={[0.1, 0.5, 18]} pos={[s * 5.35, 0.25, 0]} c="#0e0f15" />)}
      {crowd && ppl.map((q, i) => { const j = ch * Math.max(0, Math.sin(t * 7 + q.ph)) * 0.08;
        return <B key={i} s={[0.2, 0.26, 0.18]} pos={[q.x, q.y + 0.13 + j, q.z]} c={q.c} />; })}
      <hemisphereLight args={['#c8d6ff', '#1a1010', 0.25]} />
      <directionalLight position={[2, 8, 4]} intensity={0.35} color="#dfe8ff" />
    </group>
  );
};

/* ---------- Living (tapa el set 'room'): pared con papel oscuro, piso de madera, velador. door: puerta en el fondo ---------- */
export const Living: React.FC<P> = ({ t, p }) => {
  const { door = false, lamp = true, lampX = -1.9, mat = false, era = 'old' } = p;
  const wall = useTex((g, W, H) => {
    g.fillStyle = era === 'old' ? '#1d1712' : '#16171d'; g.fillRect(0, 0, W, H);
    g.strokeStyle = era === 'old' ? '#251d16' : '#1b1c23'; g.lineWidth = 6; for (let x = 0; x < W; x += 40) { g.beginPath(); g.moveTo(x, 0); g.lineTo(x, H); g.stroke(); }
  }, 512, 512, 'livwall' + era);
  return (
    <group>
      <color attach="background" args={['#07070a']} />
      <mesh position={[0, 4, -3.6]}><planeGeometry args={[9.6, 9]} /><meshBasicMaterial map={wall} toneMapped={false} /></mesh>
      {[-1, 1].map((k) => <mesh key={k} position={[k * 4.3, 4, 2]}rotation={[0, -k * PI / 2, 0]}><planeGeometry args={[14, 9]} /><meshBasicMaterial color="#0e0c0a" toneMapped={false} /></mesh>)}
      <mesh rotation={[-PI / 2, 0, 0]} position={[0, 0.01, 4]}><planeGeometry args={[40, 40]} /><M c="#3a2618" /></mesh>
      {Array.from({ length: 9 }, (_, i) => <B key={i} s={[0.02, 0.005, 14]} pos={[-4 + i * 1, 0.016, 1]} c="#2a1a10" />)}
      <B s={[9.2, 0.16, 0.05]} pos={[0, 0.08, -3.57]} c="#2a1c12" />
      {door && <group position={[0, 0, -3.55]}>
        <B s={[1.5, 2.6, 0.06]} pos={[0, 1.3, 0.03]} c="#24180e" />
        <B s={[1.3, 2.45, 0.05]} pos={[0, 1.26, 0.08]} c="#352314" />
        {[0.6, 1.7].map((y) => <B key={y} s={[1.0, 0.7, 0.03]} pos={[0, y, 0.12]} c="#2c1d10" />)}
        <Cyl r={0.05} h={0.08} rot={[PI / 2, 0, 0]} pos={[0.5, 1.2, 0.14]} c="#b08a3e" />
        <B s={[0.3, 0.02, 0.06]} pos={[0, 0.22, 0.13]} c="#1a1410" />
      </group>}
      {mat && <group position={[0, 0, -1.9]}>
        <B s={[2.6, 0.04, 2.2]} pos={[0, 0.03, 0]} c="#4b3620" />
        <B s={[2.4, 0.042, 2.0]} pos={[0, 0.032, 0]} c="#5d4428" />
      </group>}
      {lamp && <group position={[lampX, 0, -2.6]}>
        <Cyl r={0.2} h={0.05} pos={[0, 0.03, 0]} c="#2a2a2a" />
        <Cyl r={0.025} h={1.25} pos={[0, 0.65, 0]} c="#3a3a3a" />
        <Cyl r={0.2} r2={0.12} h={0.3} pos={[0, 1.38, 0]} c="#e8c890" e="#ffb45a" ei={0.9} />
        <pointLight position={[0, 1.2, 0.3]} intensity={6} color="#ffb060" distance={6} />
      </group>}
      <hemisphereLight args={['#ffd8a8', '#100a08', 0.2]} />
    </group>
  );
};

/* ---------- Casete VHS negro: w 1.6 x h 0.22 x d 0.9. El lomo (cara +z) lleva el papel con la leyenda. ---------- */
export const Cassette: React.FC<P> = ({ t, tt, p }) => {
  const { text = 'JUVENTUS VS INDEPENDIENTE', reels = 0, label = true, path } = p;
  const w = 1.6, h = 0.22, d = 0.9;
  return (
    <group position={path ? path3(path, t, true) : [0, 0, 0]}>
      <B s={[w, h, d]} pos={[0, h / 2, 0]} c="#141416" />
      {/* ventana de arriba con los dos carretes */}
      <B s={[0.9, 0.01, 0.32]} pos={[0, h + 0.006, -0.08]} c="#26262c" />
      {[-0.27, 0.27].map((x, i) => <group key={x} position={[x, h + 0.012, -0.08]} rotation={[0, t * reels * (i ? 1 : 1.2), 0]}>
        <Cyl r={0.13} h={0.008} c="#3a2a22" /><B s={[0.2, 0.01, 0.03]} pos={[0, 0.006, 0]} c="#bdb7a8" /><B s={[0.03, 0.01, 0.2]} pos={[0, 0.006, 0]} c="#bdb7a8" />
      </group>)}
      {label && <group position={[0, h / 2, d / 2]}>
        <B s={[1.42, 0.15, 0.01]} pos={[0, 0, 0.005]} c={CREMA} />
        <group position={[0, 0, 0.03]}><Label t={t} tt={tt} p={{ text, w: 1.38, h: 0.14, color: '#16120c', size: 0.72, weight: 800, depth: 0 }} /></group>
      </group>}
    </group>
  );
};

/* ---------- Sobre de correo con estampillas genéricas (sin texto) ---------- */
export const Sobre: React.FC<P> = ({ p }) => {
  const { open = 0 } = p;
  return (
    <group>
      <B s={[2.1, 0.06, 1.25]} pos={[0, 0.03, 0]} c="#c9a877" />
      <mesh position={[0, 0.065, -0.2]} rotation={[-PI / 2, 0, 0]}><circleGeometry args={[0.55, 3, PI / 2 + PI, PI]} /><M c="#b8975f" /></mesh>
      <B s={[0.22, 0.01, 0.28]} pos={[0.8, 0.065, -0.4]} c="#2f6a3c" />
      <B s={[0.22, 0.01, 0.28]} pos={[0.52, 0.065, -0.4]} c={ROJO2} />
      {[0, 1, 2].map((i) => <B key={i} s={[0.7, 0.008, 0.03]} pos={[-0.35, 0.065, 0.15 + i * 0.12]} c="#7a6340" />)}
      <B s={[0.05, 0.065 + open * 0, 1.25]} pos={[1.03, 0.03, 0]} c="#b8975f" />
    </group>
  );
};

/* ---------- Tele de tubo. kind: pitch | static | off | snow-pitch. on: [[t, 0..1]] brillo ---------- */
export const TV: React.FC<P> = ({ t, p }) => {
  const { kind = 'pitch', on, legs = true, wood = '#4a3020', ball, offAt, staticAt, w = 1.3, h = 1.0 } = p;
  const pitch = useTex((g, W, H) => {
    g.fillStyle = '#26402c'; g.fillRect(0, 0, W, H);
    for (let i = 0; i < 6; i++) { g.fillStyle = i % 2 ? '#2c4a32' : '#233a28'; g.fillRect(0, (H * 0.25) + i * (H * 0.75 / 6), W, H * 0.75 / 6); }
    g.fillStyle = '#101216'; g.fillRect(0, 0, W, H * 0.25);
    g.fillStyle = '#3a3b40'; for (let i = 0; i < 70; i++) g.fillRect((i * 37) % W, H * 0.08 + ((i * 13) % 30), 5, 7);
    g.strokeStyle = '#a8b4a2'; g.lineWidth = 3; g.strokeRect(W * 0.3, H * 0.25, W * 0.4, H * 0.22); g.beginPath(); g.moveTo(0, H * 0.25); g.lineTo(W, H * 0.25); g.stroke();
    const pl = [[0.4, 0.62, '#b4243a'], [0.55, 0.7, '#b4243a'], [0.47, 0.42, '#d8d6cc'], [0.62, 0.5, '#d8d6cc'], [0.5, 0.31, '#6a6f7a']];
    for (const [x, y, c] of pl as any) { g.fillStyle = c; g.fillRect(W * x - 6, H * y - 16, 12, 22); g.fillStyle = '#c09070'; g.fillRect(W * x - 4, H * y - 24, 8, 8); }
    g.fillStyle = 'rgba(0,0,0,.22)'; for (let y = 0; y < H; y += 4) g.fillRect(0, y, W, 2);
  }, 256, 192, 'tvpitch3');
  const snow = useMemo(() => Array.from({ length: 6 }, (_, k) => { const cv = document.createElement('canvas'); cv.width = 128; cv.height = 96; const g = cv.getContext('2d')!; const r = rnd(k + 3);
    for (let y = 0; y < 96; y += 2) for (let x = 0; x < 128; x += 2) { const v = Math.floor(30 + r() * 110); g.fillStyle = `rgb(${v},${v},${v})`; g.fillRect(x, y, 2, 2); }
    const tx = new THREE.CanvasTexture(cv); tx.colorSpace = THREE.SRGBColorSpace; return tx; }), []);
  const bright = on ? curve(on, t) : 1;
  let mode = kind; if (staticAt !== undefined && t >= staticAt) mode = 'static'; if (offAt !== undefined && t >= offAt) mode = 'off';
  const map = mode === 'static' ? snow[Math.floor(t * 15) % 6] : pitch;
  const sw = w * 0.78, sh = h * 0.74;
  const bp = ball ? path3(ball, t) : null;
  return (
    <group>
      <B s={[w, h, 0.9]} pos={[0, h / 2, 0]} c={wood} />
      <B s={[sw + 0.08, sh + 0.08, 0.02]} pos={[-w * 0.06, h / 2, 0.455]} c="#16120e" />
      {mode !== 'off' ? <mesh position={[-w * 0.06, h / 2, 0.47]}><planeGeometry args={[sw, sh]} /><meshBasicMaterial map={map} color={new THREE.Color(bright, bright, bright)} toneMapped={false} /></mesh>
        : <mesh position={[-w * 0.06, h / 2, 0.47]}><planeGeometry args={[sw, sh]} /><meshBasicMaterial color="#0d0f0e" toneMapped={false} /></mesh>}
      {bp && mode === 'pitch' && bright > 0.5 && <mesh position={[-w * 0.06 + bp[0] * sw * 0.5, h / 2 + bp[1] * sh * 0.5, 0.48]}><circleGeometry args={[0.025, 8]} /><meshBasicMaterial color="#f0eee6" toneMapped={false} /></mesh>}
      {[0.2, 0.36].map((y) => <Cyl key={y} r={0.04} h={0.04} rot={[PI / 2, 0, 0]} pos={[w * 0.42, h * y + 0.25, 0.46]} c="#b0a080" />)}
      {legs && [-1, 1].map((s) => <B key={s} s={[0.05, 0.42, 0.05]} pos={[s * w * 0.4, -0.2, 0.2]} rot={[0, 0, s * 0.12]} c="#2a1a10" />)}
      {legs && [-1, 1].map((s) => <B key={'b' + s} s={[0.05, 0.42, 0.05]} pos={[s * w * 0.4, -0.2, -0.25]} rot={[0, 0, s * 0.12]} c="#2a1a10" />)}
    </group>
  );
};

/* ---------- Videocasetera: el casete entra por la ranura (hueco real, sin atravesar) ---------- */
export const VCR: React.FC<P> = ({ t, p }) => {
  const { led = 0 } = p; const c = '#1c1d22';
  return (
    <group>
      <B s={[1.9, 0.06, 1.2]} pos={[0, 0.03, 0]} c={c} />
      <B s={[1.9, 0.06, 1.2]} pos={[0, 0.39, 0]} c={c} />
      {[-1, 1].map((s) => <B key={s} s={[0.06, 0.42, 1.2]} pos={[s * 0.92, 0.21, 0]} c={c} />)}
      <B s={[1.9, 0.42, 0.06]} pos={[0, 0.21, -0.57]} c={c} />
      {/* frente: marco alrededor de la ranura (1.7 x 0.26) */}
      <B s={[0.12, 0.3, 0.05]} pos={[-0.88, 0.21, 0.58]} c="#26272e" />
      <B s={[0.12, 0.3, 0.05]} pos={[0.88, 0.21, 0.58]} c="#26272e" />
      <B s={[1.66, 0.04, 0.6]} pos={[0, 0.06, 0.3]} c="#0a0a0c" />
      <B s={[1.66, 0.02, 1.0]} pos={[0, 0.355, 0.08]} c="#0a0a0c" />
      <B s={[0.05, 0.03, 0.01]} pos={[0.7, 0.41, 0.6]} c="#3a0a0a" e="#ff3030" ei={led ? curve(led, t) * 2 : 0} />
    </group>
  );
};

/* ---------- Timbre en la pared con ondas ---------- */
export const Timbre: React.FC<P> = ({ t, p }) => {
  const { at = 0 } = p; const dt = t - at;
  return (
    <group>
      <B s={[0.22, 0.3, 0.05]} c="#cfc6b0" />
      <Cyl r={0.06} h={0.04} rot={[PI / 2, 0, 0]} pos={[0, 0, 0.04]} c={dt > 0 && dt < 0.6 ? '#ffd27a' : '#8a7a5a'} e={dt > 0 && dt < 0.6 ? '#ffb040' : undefined} ei={0.8} />
      {dt > 0 && [0, 1, 2].map((i) => { const k = clamp((dt - i * 0.22) / 0.9); if (k <= 0 || k >= 1) return null;
        return <mesh key={i} position={[0, 0, 0.03]}><ringGeometry args={[0.2 + k * 0.5, 0.23 + k * 0.5, 24]} /><meshBasicMaterial color="#e8b860" transparent opacity={(1 - k) * 0.8} toneMapped={false} /></mesh>; })}
    </group>
  );
};

/* ---------- Copa genérica (~0.8 de alto) ---------- */
export const Cup: React.FC<P> = () => { const g = '#c9a640';
  return (
    <group>
      <B s={[0.36, 0.14, 0.36]} pos={[0, 0.07, 0]} c="#2a2420" />
      <Cyl r={0.07} h={0.28} pos={[0, 0.28, 0]} c={g} e={g} ei={0.15} />
      <Cyl r={0.12} r2={0.26} h={0.36} pos={[0, 0.6, 0]} seg={10} c={g} e={g} ei={0.15} />
      {[-1, 1].map((s) => <mesh key={s} position={[s * 0.28, 0.62, 0]} rotation={[0, 0, PI / 2]}><torusGeometry args={[0.09, 0.025, 6, 10, PI]} /><M c={g} /></mesh>)}
    </group>); };

/* ---------- Escritorio 2000 con monitor de tubo. screen: mail | off ---------- */
export const Compu: React.FC<P> = ({ t }) => {
  const scr = useTex((g, W, H) => {
    g.fillStyle = '#c8d0dc'; g.fillRect(0, 0, W, H); g.fillStyle = '#2f4d86'; g.fillRect(0, 0, W, 22);
    g.fillStyle = '#ffffff'; g.fillRect(14, 36, W - 28, H - 50);
    for (let i = 0; i < 6; i++) { g.fillStyle = i === 0 ? '#2f4d86' : '#8a96a8'; g.fillRect(24, 48 + i * 22, i === 0 ? 120 : 80 + ((i * 53) % 110), 9); }
    g.strokeStyle = '#2f4d86'; g.lineWidth = 4; g.strokeRect(W - 96, 50, 66, 44); g.beginPath(); g.moveTo(W - 96, 50); g.lineTo(W - 63, 76); g.lineTo(W - 30, 50); g.stroke();
  }, 256, 192, 'compumail');
  return (
    <group>
      <B s={[1.7, 0.06, 0.9]} pos={[0, 0.78, 0]} c="#5a3e28" />
      {[-0.78, 0.78].map((x) => <B key={x} s={[0.06, 0.78, 0.8]} pos={[x, 0.39, 0]} c="#4a3220" />)}
      <B s={[0.62, 0.52, 0.55]} pos={[0, 1.08, -0.12]} c="#cfc8b4" />
      <B s={[0.4, 0.3, 0.3]} pos={[0, 1.02, -0.5]} c="#bfb8a4" />
      <mesh position={[0, 1.1, 0.158]}><planeGeometry args={[0.5, 0.38]} /><meshBasicMaterial map={scr} color="#b8b8b8" toneMapped={false} /></mesh>
      <B s={[0.6, 0.03, 0.2]} pos={[0, 0.825, 0.28]} c="#d8d2c0" />
      <B s={[0.1, 0.03, 0.14]} pos={[0.45, 0.825, 0.28]} c="#d8d2c0" />
      <pointLight position={[0, 1.1, 0.6]} intensity={1.2} color="#9fb8ff" distance={2.5} />
    </group>
  );
};

/* ---------- Edificio genérico de televisión con cartel "RAI" (sin logo) ---------- */
export const Canal: React.FC<P> = ({ t, tt, p }) => {
  const { text = 'RAI', w = 1.5, h = 1.9 } = p;
  return (
    <group>
      <B s={[w, h, 0.9]} pos={[0, h / 2, 0]} c="#2a2f3a" />
      {Array.from({ length: Math.max(1, Math.floor((h - 0.5) / 0.36)) }, (_, r) => Array.from({ length: 3 }, (_, c) => <B key={r + "-" + c} s={[0.26, 0.2, 0.02]} pos={[-w / 3 + c * (w / 3), 0.35 + r * 0.36, 0.455]} c="#3a3226" e="#e0a850" ei={((r * 3 + c) * 7) % 5 > 1 ? 0.5 : 0.05} />))}
      <group position={[0, h - 0.06, 0.47]}><Sign t={t} tt={tt} p={{ text, w: 0.9, h: 0.32, bg: '#101218', color: '#f0ece0', size: 0.7 }} /></group>
    </group>
  );
};

/* ---------- Sobrecitos de mail que vuelan de A a B en arco. p: from, to, times[] ---------- */
export const Mails: React.FC<P> = ({ t, p }) => {
  const { from = [0, 0, 0], to = [1, 0, 0], times = [0], dur = 0.9, arc = 0.8 } = p;
  return (
    <group>{times.map((t0: number, i: number) => { const k = (t - t0) / dur; if (k < 0 || k > 1) return null; const u = eio(k);
      const x = lerp(from[0], to[0], u), y = lerp(from[1], to[1], u) + Math.sin(u * PI) * arc, z = lerp(from[2], to[2], u); const s = Math.min(1, k * 6, (1 - k) * 6);
      return <group key={i} position={[x, y, z]} scale={s} rotation={[0, 0, Math.sin(u * PI) * 0.3]}>
        <B s={[0.3, 0.2, 0.02]} c="#e9e4d4" />
        <mesh position={[0, 0.03, 0.012]}><circleGeometry args={[0.15, 3, PI + PI / 2, PI]} /><meshBasicMaterial color="#9a9280" /></mesh>
      </group>; })}</group>
  );
};

/* ---------- Estante de archivo con cintas; una se destaca ---------- */
export const Archivo: React.FC<P> = ({ t, p }) => {
  const { hi = -1 } = p;
  return (
    <group>
      {[-1, 1].map((s) => <B key={s} s={[0.05, 1.5, 0.45]} pos={[s * 0.9, 0.75, 0]} c="#3a3f4a" />)}
      {[0.02, 0.5, 1.0, 1.48].map((y) => <B key={y} s={[1.85, 0.04, 0.45]} pos={[0, y, 0]} c="#3a3f4a" />)}
      {[0, 1, 2].map((r) => Array.from({ length: 9 }, (_, i) => { const k = r * 9 + i; const isH = k === hi;
        return <B key={k} s={[0.13, 0.4, 0.34]} pos={[-0.72 + i * 0.18, 0.25 + r * 0.48, isH ? 0.06 + 0.08 * clamp(t) : 0]} c={isH ? '#141416' : ['#2b2d33', '#33302a', '#262830'][k % 3]} />; }))}
    </group>
  );
};

/* ---------- Fajo de billetes genérico (sin cifras): solo el signo € ---------- */
export const Euros: React.FC<P> = ({ t, tt, p }) => {
  const { n = 5 } = p;
  return (
    <group>
      {Array.from({ length: n }, (_, i) => { const k = pop(tt - i * 0.08); if (k <= 0) return null;
        return <group key={i} position={[Math.sin(i * 2.1) * 0.03, 0.03 + i * 0.06, Math.cos(i * 1.3) * 0.03]} scale={[k, 1, k]}><B s={[0.8, 0.05, 0.42]} c={i % 2 ? '#7a6a9a' : '#8a7aaa'} /></group>; })}
      <group position={[0, 0.06 * n + 0.05, 0]} rotation={[-PI / 2, 0, 0]}><Label t={t} tt={tt} p={{ text: '€', w: 0.3, h: 0.3, color: '#f0ece0', size: 0.8, weight: 900, depth: 0 }} /></group>
    </group>
  );
};

/* ---------- Fotos en blanco y negro y un dibujo a lápiz (genéricos) ---------- */
export const Foto: React.FC<P> = ({ p }) => {
  const { kind = 'foto', seed = 1 } = p;
  const tx = useTex((g, W, H) => {
    const r = rnd(seed);
    if (kind === 'foto') {
      const gr = g.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, '#3a3a3a'); gr.addColorStop(0.45, '#5a5a5a'); gr.addColorStop(1, '#7a7a7a'); g.fillStyle = gr; g.fillRect(0, 0, W, H);
      for (let i = 0; i < 4; i++) { const x = W * (0.2 + r() * 0.6), y = H * (0.45 + r() * 0.3); g.fillStyle = i % 2 ? '#1e1e1e' : '#d0d0d0'; g.fillRect(x - 10, y - 30, 20, 40); g.fillStyle = '#9a9a9a'; g.beginPath(); g.arc(x, y - 40, 9, 0, 7); g.fill(); }
      g.fillStyle = '#eee'; g.beginPath(); g.arc(W * 0.7, H * 0.4, 6, 0, 7); g.fill();
      g.strokeStyle = '#f2f0ea'; g.lineWidth = 14; g.strokeRect(0, 0, W, H);
    } else {
      g.fillStyle = '#e8e2d2'; g.fillRect(0, 0, W, H); g.strokeStyle = '#4a4a50'; g.lineWidth = 2;
      g.strokeRect(W * 0.3, H * 0.12, W * 0.4, H * 0.12);
      for (let i = 0; i < 5; i++) { const x = W * (0.2 + r() * 0.6), y = H * (0.4 + r() * 0.4); g.beginPath(); g.arc(x, y - 22, 7, 0, 7); g.stroke(); g.beginPath(); g.moveTo(x, y - 15); g.lineTo(x, y + 10); g.lineTo(x - 8, y + 26); g.moveTo(x, y + 10); g.lineTo(x + 8, y + 26); g.stroke(); }
      g.setLineDash([6, 6]); g.beginPath(); g.moveTo(W * 0.3, H * 0.75); g.quadraticCurveTo(W * 0.5, H * 0.1, W * 0.5, H * 0.2); g.stroke();
    }
  }, 256, 200, 'foto' + kind + seed);
  return (
    <group>
      <B s={[1.0, 0.8, 0.03]} c="#d8d2c4" />
      <mesh position={[0, 0, 0.02]}><planeGeometry args={[0.94, 0.74]} /><meshBasicMaterial map={tx} color="#c8c8c8" toneMapped={false} /></mesh>
    </group>
  );
};

/* ---------- Sillón de dos cuerpos (mira a -z) ---------- */
export const Sofa: React.FC<P> = ({ p }) => { const { c = '#4a2e2a' } = p;
  return (
    <group>
      <B s={[2.2, 0.42, 0.85]} pos={[0, 0.21, 0]} c={c} />
      <B s={[2.2, 0.75, 0.22]} pos={[0, 0.6, 0.36]} c={c} />
      {[-1, 1].map((s) => <B key={s} s={[0.2, 0.62, 0.85]} pos={[s * 1.1, 0.31, 0]} c={c} />)}
    </group>); };

/* ---------- Mesita ---------- */
export const Mesa: React.FC<P> = ({ p }) => { const { w = 1.4, d = 0.7, h = 0.55, c = '#4a3020' } = p;
  return (<group><B s={[w, 0.05, d]} pos={[0, h, 0]} c={c} />{[-1, 1].map((sx) => [-1, 1].map((sz) => <B key={sx + '' + sz} s={[0.05, h, 0.05]} pos={[sx * (w / 2 - 0.06), h / 2, sz * (d / 2 - 0.06)]} c="#2a1a10" />))}</group>); };

/* ---------- Dos tarjetas IDA / VUELTA; la de VUELTA se cae ---------- */
export const IdaVuelta: React.FC<P> = ({ t, tt, p }) => {
  const { fallAt = 99, drop = 1.0 } = p; const f = eio((t - fallAt) / 0.6);
  return (
    <group>
      <group position={[-0.4, 0, 0]}><Sign t={t} tt={tt} p={{ text: 'IDA', w: 0.72, h: 0.36, bg: '#1a1c24', color: '#fff', size: 0.6 }} /></group>
      <group position={[0.4, -f * drop, f * 0.15]} rotation={[-f * 1.45, 0, f * 0.15]}><Sign t={t} tt={tt} p={{ text: 'VUELTA', w: 0.72, h: 0.36, bg: '#1a1c24', color: f > 0 ? '#8a8a90' : '#fff', size: 0.5 }} /></group>
    </group>
  );
};

/* ---------- Cruz roja ---------- */
export const Cruz: React.FC<P> = ({ p }) => { const { size = 1, color = ROJO } = p;
  return <group>{[1, -1].map((s) => <B key={s} s={[0.16 * size, 1.0 * size, 0.12]} rot={[0, 0, s * PI / 4]} c={color} e={color} ei={0.35} />)}</group>; };

/* ---------- Aro en el piso ---------- */
export const Aro: React.FC<P> = ({ t, p }) => { const { r = 0.6, color = ROJO } = p;
  return <mesh rotation={[-PI / 2, 0, 0]} position={[0, 0.06, 0]}><ringGeometry args={[r, r + 0.07, 32]} /><meshBasicMaterial color={color} transparent opacity={0.75 + Math.sin(t * 5) * 0.15} toneMapped={false} /></mesh>; };

/* ---------- Jugada de las dos paredes: Bochini (A) y Bertoni (B) avanzan hacia -z y la pelota va y vuelve ---------- */
export const Paredes: React.FC<P> = ({ t, tt, p }) => {
  const { t0 = 0, passes = [0.6, 1.4, 2.2, 3.0], z0 = 2.2, z1 = -1.6, dur = 4.0, la = 0, lb = 0 } = p;
  // A va por la izquierda en zigzag suave; B por la derecha. Posiciones continuas.
  const k = clamp((t - t0) / dur);
  const zA = lerp(z0, z1, k), zB = lerp(z0 - 0.5, z1 - 0.4, k);
  const xA = -0.75 + Math.sin(k * PI) * 0.1, xB = 0.8 - Math.sin(k * PI) * 0.15;
  // la pelota: al pie de quien la tiene; entre pases viaja en línea por el piso
  const posAt = (who: number, tq: number): V3 => { const kq = clamp((tq - t0) / dur); return who === 0 ? [lerp(-0.75, -0.75, kq) + 0.18, 0.13, lerp(z0, z1, kq) - 0.3] : [0.8 - 0.18, 0.13, lerp(z0 - 0.5, z1 - 0.4, kq) - 0.3]; };
  let ball: V3 = posAt(0, t); const pt = 0.38;
  for (let i = 0; i < passes.length; i++) { const ts = t0 + passes[i]; const from = i % 2 === 0 ? 0 : 1; const to = 1 - from;
    if (t >= ts && t < ts + pt) { const a = posAt(from, ts), b = posAt(to, ts + pt); const u = (t - ts) / pt; ball = [lerp(a[0], b[0], u), 0.13, lerp(a[2], b[2], u)]; break; }
    if (t >= ts + pt) ball = posAt(to, t); }
  return (
    <group>
      <group position={[xA, 0, zA]} rotation={[0, PI, 0]}><Player t={t} tt={tt} p={{ kit: 'ind', poses: [[0, 'walk'], [t0 - 0.3, 'run']], phase: 0.3, hair: '#2a1a10' }} /></group>
      <group position={[xB, 0, zB]} rotation={[0, PI, 0]}><Player t={t} tt={tt} p={{ kit: 'ind', poses: [[0, 'walk'], [t0 - 0.3, 'run']], phase: 1.4, hair: '#5a3a1a' }} /></group>
      {pop(t - la) > 0 && <group position={[xA - 0.15, 2.2, zA]} rotation={[-0.7, 0, 0]} scale={pop(t - la)}><Sign t={t} tt={tt} p={{ text: 'BOCHINI', w: 1.15, h: 0.3, bg: INK, size: 0.62 }} /></group>}
      {pop(t - lb) > 0 && <group position={[xB + 0.15, 2.2, zB]} rotation={[-0.7, 0, 0]} scale={pop(t - lb)}><Sign t={t} tt={tt} p={{ text: 'BERTONI', w: 1.15, h: 0.3, bg: INK, size: 0.62 }} /></group>}
      <Ball t={t} tt={tt} p={{ path: [[0, ball[0], ball[1], ball[2]]] }} />
    </group>
  );
};

export const EXTRA: Record<string, React.FC<P>> = {
  sign: Sign, player: Player, ball: Ball, goal: Goal, stadium: Stadium, living: Living, cassette: Cassette, sobre: Sobre, tv: TV, vcr: VCR,
  timbre: Timbre, cup: Cup, compu: Compu, canal: Canal, mails: Mails, archivo: Archivo, euros: Euros, foto: Foto, sofa: Sofa, mesa: Mesa,
  idavuelta: IdaVuelta, cruz: Cruz, aro: Aro, paredes: Paredes,
};
