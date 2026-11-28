import React from 'react';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';
import { M, useTex } from '../../src/kit/Props';
import { clamp, eio, eo, lerp, rnd } from '../../src/kit/math';

// Look propio: corte transversal de la central, como una maqueta de museo técnico sobre una mesa oscura.
// Esfera de hormigón gris cortada al medio (mitad sobre el pasto, mitad bajo tierra), olla de acero con la corona de 72
// tornillos, agua pesada en azul profundo, río Paraná marrón detrás. Fondo pizarra azul verdoso con grilla de plano técnico.
// Sin carteles 3D con texto (nombres y cifras van en placas 2D), muñecos sin rasgos, sin humo ni explosiones ni alarmas.
// El piso del set del motor está en y = 0: la maqueta se apoya en una mesa propia y el pasto queda en y = G.
// `Shade` (velo de litio-pileta-salar) mantiene oscuro el tercio superior: la franja de subtítulos nunca queda clara.
type P = { t: number; tt: number; p: any };
type V3 = [number, number, number];
const PI = Math.PI;
export const G = 2.5; // altura del pasto

const B: React.FC<{ s: V3; pos?: V3; rot?: V3; c: string; e?: string; ei?: number; o?: number }> = ({ s, pos, rot, c, e, ei, o }) => (
  <mesh position={pos} rotation={rot}><boxGeometry args={s} /><M c={c} e={e} ei={ei} o={o} /></mesh>
);
const Cyl: React.FC<{ r: number; r2?: number; h: number; pos?: V3; rot?: V3; seg?: number; c: string; e?: string; ei?: number; o?: number }> = ({ r, r2, h, pos, rot, seg = 12, c, e, ei, o }) => (
  <mesh position={pos} rotation={rot}><cylinderGeometry args={[r2 ?? r, r, h, seg]} /><M c={c} e={e} ei={ei} o={o} /></mesh>
);
const Ball: React.FC<{ r: number; pos?: V3; c: string; e?: string; ei?: number; o?: number; seg?: number }> = ({ r, pos, c, e, ei, o, seg = 1 }) => (
  <mesh position={pos}><icosahedronGeometry args={[r, seg]} /><M c={c} e={e} ei={ei} o={o} /></mesh>
);
const pipeBetween = (a: V3, b: V3, r: number, c: string, key?: string, o?: number) => {
  const dx = b[0] - a[0], dy = b[1] - a[1], dz = b[2] - a[2]; const L = Math.hypot(dx, dy, dz);
  const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(dx / L, dy / L, dz / L)); const e = new THREE.Euler().setFromQuaternion(q);
  return <mesh key={key} position={[(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2]} rotation={[e.x, e.y, e.z]}><cylinderGeometry args={[r, r, L, 10]} /><M c={c} o={o} /></mesh>;
};

export const CONC = '#6f7477', CONC_IN = '#3c4247', STEEL = '#7c8690', STEEL2 = '#4b5560', DARK = '#1e252b';
export const HW = '#0a2a6e', HW_E = '#123c9c'; // agua pesada
export const RIVER = '#7a5634', RIVER2 = '#9a7048';
export const NEU = '#e9fbff', HOT = '#ff8a3a', GOLD = '#ffb52e', GRASS = '#34492b';

/* ---------- Velo oscuro pegado a la cámara (igual que litio-pileta-salar) ---------- */
const Shade: React.FC<{ y1?: number; a?: number }> = ({ y1 = 640, a = 0.9 }) => {
  const { camera } = useThree();
  const tex = useTex((g, W, H) => {
    g.clearRect(0, 0, W, H);
    for (let y = 0; y < H; y++) { const px = (y / H) * y1; const k = px < 430 ? 1 : 1 - clamp((px - 430) / (y1 - 430)); const al = a * (k * k * (3 - 2 * k));
      g.fillStyle = `rgba(4,8,12,${al})`; g.fillRect(0, y, W, 1); }
  }, 4, 256, 'atushade' + y1 + a);
  const geo = React.useMemo(() => new THREE.PlaneGeometry(1, 1), []);
  camera.updateMatrixWorld();
  const yb = 1 - (2 * y1) / 1920; const pos = geo.attributes.position as THREE.BufferAttribute;
  const pts: [number, number][] = [[-1.1, 1.1], [1.1, 1.1], [-1.1, yb], [1.1, yb]];
  pts.forEach(([x, y], i) => { const v = new THREE.Vector3(x, y, -0.9).unproject(camera); pos.setXYZ(i, v.x, v.y, v.z); });
  pos.needsUpdate = true; geo.computeBoundingSphere();
  return <mesh geometry={geo} frustumCulled={false} renderOrder={999}>
    <meshBasicMaterial map={tex} transparent depthTest={false} depthWrite={false} toneMapped={false} fog={false} /></mesh>;
};

/* ---------- Mundo: fondo pizarra con grilla técnica, mesa oscura y (opcional) bloque de tierra en corte ---------- */
const SPH = { R: 1.4, cy: 0.4 }; // esfera de la central: radio 1,4 (56 m), centro 0,4 sobre el pasto (20 m bajo tierra)
const strataTex = (g: CanvasRenderingContext2D, W: number, H: number) => {
  const layers: [number, string][] = [[0, '#4a3a26'], [0.05, '#6e5136'], [0.3, '#8a6a46'], [0.55, '#6a4e34'], [0.78, '#5a412b'], [1, '#4d3824']];
  for (let i = 0; i < layers.length - 1; i++) { g.fillStyle = layers[i][1]; g.fillRect(0, layers[i][0] * H, W, (layers[i + 1][0] - layers[i][0]) * H + 1); }
  const r = rnd(31);
  for (let i = 0; i < 420; i++) { const y = r() * H; if (y < H * 0.05) continue; g.fillStyle = ['#9b7d58', '#5b442d', '#a88b62', '#4a3623'][i % 4]; g.globalAlpha = 0.5;
    g.beginPath(); g.ellipse(r() * W, y, 2 + r() * 5, 1.5 + r() * 3, 0, 0, PI * 2); g.fill(); }
  g.globalAlpha = 1; g.fillStyle = GRASS; g.fillRect(0, 0, W, H * 0.018);
};
const GroundBlock: React.FC<{ pit: boolean }> = ({ pit }) => {
  const cap = useTex(strataTex, 1024, 256, 'atustrata');
  const { R, cy } = SPH; const Rp = R + 0.012; const xg = Math.sqrt(Rp * Rp - cy * cy); const a1 = Math.atan2(-cy, xg);
  const geos = React.useMemo(() => {
    const mk = (withPit: boolean, depth: number) => {
      const s = new THREE.Shape(); s.moveTo(-6, -2.4); s.lineTo(6, -2.4); s.lineTo(6, 0);
      if (withPit) { s.lineTo(xg, 0); s.absarc(0, cy, Rp, a1, -PI - a1, true); }
      s.lineTo(-6, 0); s.lineTo(-6, -2.4);
      const g = new THREE.ExtrudeGeometry(s, { depth, bevelEnabled: false, curveSegments: 48 });
      // UV de las tapas: u = x/12 + .5, v = y/2.4 + 1 (las tapas usan las coordenadas de la forma)
      const uv = g.attributes.uv as THREE.BufferAttribute; const ps = g.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < uv.count; i++) uv.setXY(i, ps.getX(i) / 12 + 0.5, ps.getY(i) / 2.4 + 1);
      return g;
    };
    const top = new THREE.Shape(); top.moveTo(-xg, 0); top.lineTo(-xg, 1.5); top.lineTo(xg, 1.5); top.lineTo(xg, 0); top.absarc(0, 0, xg, 0, PI, false);
    return { front: mk(pit, pit ? 1.5 : 3.7), back: mk(false, 2.2), top: new THREE.ShapeGeometry(top, 32) };
  }, [pit]);
  const side = <meshStandardMaterial attach="material-1" color={GRASS} flatShading roughness={0.95} />;
  return (
    <group position={[0, G, 0]}>
      <mesh geometry={geos.front} position={[0, 0, pit ? -1.5 : -3.7]}><meshStandardMaterial attach="material-0" map={cap} roughness={0.95} />{side}</mesh>
      {pit && <mesh geometry={geos.back} position={[0, 0, -3.7]}><meshStandardMaterial attach="material-0" map={cap} roughness={0.95} />{side}</mesh>}
      {pit && <mesh geometry={geos.top} rotation={[-PI / 2, 0, 0]} position={[0, 0.001, 0]}><M c={GRASS} /></mesh>}
    </group>
  );
};
const River: React.FC<{ t: number; z?: number; y?: number }> = ({ t, z = -3.05, y = G }) => {
  const tex = useTex((g, W, H) => { g.fillStyle = RIVER; g.fillRect(0, 0, W, H); const r = rnd(12);
    for (let i = 0; i < 46; i++) { g.fillStyle = i % 2 ? RIVER2 : '#6a4a2c'; g.globalAlpha = 0.7; g.fillRect(r() * W, r() * H, 30 + r() * 60, 3); } g.globalAlpha = 1; }, 512, 128, 'aturiver');
  tex.wrapS = THREE.RepeatWrapping; tex.repeat.set(3, 1); tex.offset.x = -t * 0.06; tex.needsUpdate = false;
  return <group>
    <mesh rotation={[-PI / 2, 0, 0]} position={[0, y + 0.006, z]}><planeGeometry args={[12, 1.1]} /><meshStandardMaterial map={tex} roughness={0.6} /></mesh>
    <B s={[12, 0.03, 0.12]} pos={[0, y + 0.012, z + 0.6]} c="#4a4736" />
  </group>;
};
export const World: React.FC<P> = ({ t, p }) => {
  const { ground = 'none', river = ground !== 'none' } = p;
  const bg = useTex((g, W, H) => {
    const gr = g.createLinearGradient(0, H, 0, 0);
    [[0, '#1b3440'], [0.25, '#10222b'], [0.5, '#0a151b'], [1, '#04080b']].forEach(([f, c]) => gr.addColorStop(f as number, c as string));
    g.fillStyle = gr; g.fillRect(0, 0, W, H);
    g.strokeStyle = 'rgba(120,180,200,0.07)'; g.lineWidth = 1;
    for (let x = 0; x <= W; x += 32) { g.beginPath(); g.moveTo(x, 0); g.lineTo(x, H); g.stroke(); }
    for (let y = 0; y <= H; y += 32) { g.beginPath(); g.moveTo(0, y); g.lineTo(W, y); g.stroke(); }
  }, 512, 1024, 'atubg');
  return (
    <group>
      <color attach="background" args={['#05090c']} />
      <fog attach="fog" args={['#0a141a', p.fogNear ?? 13, p.fogFar ?? 30]} />
      <mesh position={[0, 6, -3.78]}><planeGeometry args={[16, 18]} /><meshBasicMaterial map={bg} toneMapped={false} fog={false} /></mesh>
      <mesh rotation={[-PI / 2, 0, 0]} position={[0, 0.02, 0]}><planeGeometry args={[30, 30]} /><M c="#070a0d" /></mesh>
      {ground !== 'none' && <GroundBlock pit={ground === 'pit'} />}
      {river && <River t={t} />}
      <hemisphereLight args={['#cfe2f0', '#3a3020', 0.35]} />
      <directionalLight position={[-3, 8, 6]} intensity={0.6} color="#f2f6ff" />
      {!p.noShade && <Shade y1={p.shadeY ?? 640} a={p.shadeA ?? 0.9} />}
    </group>
  );
};

/* ---------- Tapa con su corona de tornillos (origen = cara de arriba de la brida). `lit` = desde cuándo se encienden en ronda ---------- */
const Lid: React.FC<{ t: number; R: number; n?: number; lit?: number; litDur?: number; hl?: number; dome?: boolean }> = ({ t, R, n = 72, lit, litDur = 1.2, hl, dome = true }) => {
  const nuts = [];
  for (let i = 0; i < n; i++) {
    const a = (i / n) * PI * 2; const x = Math.sin(a) * R, z = Math.cos(a) * R;
    const on = lit === undefined ? 0 : clamp((t - lit - (i / n) * litDur) / 0.15);
    const isH = hl !== undefined && i === 0; const hk = isH ? clamp((t - hl) / 0.7) : 0;
    const lift = isH ? (1 - eio(hk)) * 0.12 * R : 0; const spin = isH ? eio(hk) * PI * 2 : 0;
    const glow = Math.max(on, isH ? clamp((t - hl) / 0.2) : 0);
    nuts.push(<group key={i} position={[x, 0, z]}>
      <Cyl r={0.016 * R} h={0.13 * R} pos={[0, 0.06 * R, 0]} c="#8f989f" seg={6} />
      <group position={[0, 0.035 * R + lift, 0]} rotation={[0, spin + a, 0]}><Cyl r={0.042 * R} h={0.06 * R} seg={6} c={glow > 0 ? '#b98a30' : '#3a424a'} e={glow > 0 ? GOLD : undefined} ei={0.9 * glow} /></group>
    </group>);
  }
  return (
    <group>
      <Cyl r={1.14 * R} h={0.13 * R} pos={[0, -0.065 * R, 0]} seg={48} c={STEEL} />
      <Cyl r={1.14 * R} h={0.15 * R} pos={[0, -0.21 * R, 0]} seg={48} c={STEEL2} />
      {dome && <mesh position={[0, 0, 0]} scale={[1, 0.42, 1]}><sphereGeometry args={[0.9 * R, 28, 10, 0, PI * 2, 0, PI / 2]} /><M c="#8a939b" /></mesh>}
      {dome && <Cyl r={0.12 * R} h={0.12 * R} pos={[0, 0.42 * 0.9 * R + 0.05 * R, 0]} c={STEEL2} />}
      {nuts}
    </group>
  );
};

/* ---------- Flecha que baja y se apoya (presión), sin atravesar: la punta queda en y = 0 ---------- */
const Press: React.FC<{ t: number; at: number; len: number; c?: string }> = ({ t, at, len, c = GOLD }) => {
  const k = eo((t - at) / 0.6); if (t < at) return null;
  const y = (1 - k) * len * 0.8;
  return <group position={[0, y, 0]}>
    <mesh position={[0, len * 0.18, 0]} rotation={[PI, 0, 0]}><coneGeometry args={[len * 0.2, len * 0.36, 4]} /><M c={c} e={c} ei={0.55} o={clamp(k * 2)} /></mesh>
    <B s={[len * 0.12, len * 0.64, len * 0.12]} pos={[0, len * 0.36 + len * 0.32, 0]} c={c} e={c} ei={0.55} o={clamp(k * 2)} />
  </group>;
};

/* ---------- Central en corte: esfera, piso de operación, olla con la tapa, grúa. Origen = centro en el pasto (y = G) ---------- */
const Dim: React.FC<{ t: number; at: number; a: V3; h: number; c?: string }> = ({ t, at, a, h, c = '#27e0d8' }) => {
  if (t < at) return null; const k = eo((t - at) / 0.6); const hh = Math.max(0.001, h * k);
  return <group position={a}>
    <B s={[0.018, hh, 0.018]} pos={[0, -hh / 2, 0]} c={c} e={c} ei={0.9} />
    <B s={[0.14, 0.018, 0.018]} c={c} e={c} ei={0.9} />
    <B s={[0.14, 0.018, 0.018]} pos={[0, -hh, 0]} c={c} e={c} ei={0.9} />
  </group>;
};
const Guide: React.FC<{ t: number; s?: number; walk?: [number, number, number, number] }> = ({ t, s = 0.11, walk }) => {
  // guía sin rasgos; walk = [x0, x1, t0, dur]
  let x = 0, ph = 0; if (walk) { const k = clamp((t - walk[2]) / walk[3]); x = lerp(walk[0], walk[1], eio(k)); ph = k > 0 && k < 1 ? Math.sin(t * 9) : 0; }
  return <group position={[x, 0, 0]} scale={[s, s, s]} rotation={[0, walk && walk[1] < walk[0] ? -PI / 2 : PI / 2, 0]}><Figure t={t} coat="#e8e4d6" pose="idle" legs={ph} /></group>;
};
export const Central: React.FC<P> = ({ t, p }) => {
  const { R, cy } = SPH;
  const { open, lit, litDur = 1.6, press, potGlow, dim20, dim18, guide, front } = p;
  const fk = open === undefined ? (front ? 1 : 0) : 1 - clamp((t - open) / 0.7);
  const gk = potGlow === undefined ? 0 : clamp((t - potGlow) / 0.4) * (0.55 + 0.25 * Math.sin((t - potGlow) * 5));
  const thG = Math.acos(-cy / R); // ángulo theta del pasto
  const yS = 0.07; // piso de operación (cara de arriba en 0,10)
  return (
    <group>
      <group position={[0, cy, 0]}>
        {/* mitad de atrás: cara de afuera (gris claro) y de adentro (gris oscuro) */}
        <mesh><sphereGeometry args={[R, 48, 24, PI, PI]} /><meshStandardMaterial color={CONC} flatShading roughness={0.9} side={THREE.FrontSide} /></mesh>
        <mesh><sphereGeometry args={[R - 0.005, 48, 24, PI, PI]} /><meshStandardMaterial color={CONC_IN} flatShading roughness={0.9} side={THREE.BackSide} /></mesh>
        {/* borde del corte: espesor del hormigón */}
        <mesh position={[0, 0, 0.002]}><ringGeometry args={[R - 0.09, R, 64]} /><M c="#8c9194" /></mesh>
        <mesh position={[0, 0, 0.003]}><ringGeometry args={[R - 0.11, R - 0.09, 64]} /><M c="#5a6166" /></mesh>
        {/* mitad de adelante (solo sobre el pasto), se desvanece en `open` */}
        {fk > 0.001 && <mesh><sphereGeometry args={[R + 0.004, 48, 24, 0, PI, 0, thG]} /><meshStandardMaterial color={CONC} flatShading roughness={0.9} transparent={fk < 1} opacity={fk} depthWrite={fk >= 1} /></mesh>}
      </group>
      {/* piso de operación y losa de abajo (medios cilindros que no salen de la esfera) */}
      <mesh position={[0, yS, 0]}><cylinderGeometry args={[Math.sqrt(R * R - (yS + 0.03 - cy) ** 2) - 0.1, Math.sqrt(R * R - (yS - 0.03 - cy) ** 2) - 0.1, 0.06, 40, 1, false, PI / 2, PI]} /><M c="#565d63" /></mesh>
      <mesh position={[0, -0.86, 0]}><cylinderGeometry args={[0.66, 0.6, 0.06, 32, 1, false, PI / 2, PI]} /><M c="#565d63" /></mesh>
      {/* grúa polar */}
      {!p.noCrane && <group position={[0, 1.2, -0.45]}>
        <B s={[1.9, 0.07, 0.1]} c="#8a7020" />
        <B s={[0.12, 0.09, 0.16]} pos={[-0.25, -0.06, 0]} c="#4a5058" />
        <B s={[0.006, 0.4, 0.006]} pos={[-0.25, -0.3, 0]} c="#9aa0a6" />
        <B s={[0.05, 0.03, 0.05]} pos={[-0.25, -0.5, 0]} c="#c9a227" />
      </group>}
      {/* olla a presión: cuerpo, fondo redondo, apoyo */}
      <group position={[0, 0, -0.3]}>
        <B s={[0.22, 0.06, 0.22]} pos={[0, -0.81, 0]} c="#5c636a" />
        <Cyl r={0.2} h={0.76} pos={[0, -0.3, 0]} seg={28} c={STEEL} e={gk > 0 ? '#3a7bff' : undefined} ei={gk} />
        <mesh position={[0, -0.68, 0]}><sphereGeometry args={[0.2, 28, 8, 0, PI * 2, PI / 2, PI / 2]} /><M c={STEEL} e={gk > 0 ? '#3a7bff' : undefined} ei={gk} /></mesh>
        {/* caños de agua pesada que salen de la olla (sin datos) */}
        {pipeBetween([0.18, -0.2, 0.02], [0.75, -0.2, 0.02], 0.035, STEEL2, 'p1')}
        {pipeBetween([-0.18, -0.2, 0.02], [-0.75, -0.2, 0.02], 0.035, STEEL2, 'p2')}
        <Cyl r={0.12} h={0.62} pos={[0.85, -0.42, 0.02]} seg={16} c="#5d666e" />
        <Cyl r={0.12} h={0.62} pos={[-0.85, -0.42, 0.02]} seg={16} c="#5d666e" />
        <group position={[0, yS + 0.03 + 0.032 + 0.03, 0]}><Lid t={t} R={0.2} lit={lit} litDur={litDur} /></group>
        {press !== undefined && [0, 1, 2, 3, 4, 5].map((i) => { const a = (i / 6) * PI * 2 + PI / 6; return <group key={i} position={[Math.sin(a) * 0.2, yS + 0.13 + 0.045, Math.cos(a) * 0.2]}><Press t={t} at={press + i * 0.08} len={0.14} /></group>; })}
      </group>
      {dim20 !== undefined && <Dim t={t} at={dim20} a={[-1.62, 0.0, 0.05]} h={R - cy} />}
      {dim18 !== undefined && <Dim t={t} at={dim18} a={[0.36, 0.16, -0.1]} h={0.9} c={GOLD} />}
      {guide && <group position={[0, yS + 0.03, -0.12]}><Guide t={t} walk={guide} /></group>}
    </group>
  );
};

/* ---------- Muñeco sin rasgos (casco, chaleco o guardapolvo); seq = [[t, pose], ...] ---------- */
const poseOf = (pose: string, t: number): { aL: V3; aR: V3 } => {
  const sway = Math.sin(t * 2.2); const w = Math.sin(t * 7);
  if (pose === 'wave') return { aL: [0, 0, -0.1], aR: [0, 0, 2.5 + w * 0.3] };
  if (pose === 'point') return { aL: [0, 0, -0.1 - sway * 0.03], aR: [0, 0, 1.45 + sway * 0.04] };
  return { aL: [0, 0, -0.1 - sway * 0.03], aR: [0, 0, 0.1 + sway * 0.03] };
};
const Figure: React.FC<{ t: number; coat?: string; helmet?: string; pose?: string; seq?: [number, string][]; legs?: number }> = ({ t, coat = '#ff7a1a', helmet = '#f1efe6', pose = 'idle', seq, legs = 0 }) => {
  const sq: [number, string][] = seq ?? [[0, pose]];
  let i = 0; for (let j = 0; j < sq.length; j++) if (t >= sq[j][0]) i = j;
  let q = poseOf(sq[i][1], t);
  if (i > 0) { const k = eio((t - sq[i][0]) / 0.3); const a = poseOf(sq[i - 1][1], t); const m = (x: V3, y: V3): V3 => [lerp(x[0], y[0], k), lerp(x[1], y[1], k), lerp(x[2], y[2], k)]; q = { aL: m(a.aL, q.aL), aR: m(a.aR, q.aR) }; }
  const skin = '#c99a72';
  return (
    <group>
      {[-1, 1].map((sd) => <group key={sd} position={[0.12 * sd, 0.7, 0]} rotation={[legs * 0.35 * sd, 0, 0]}><B s={[0.17, 0.7, 0.19]} pos={[0, -0.35, 0]} c="#2e3a4a" /><B s={[0.18, 0.09, 0.26]} pos={[0, -0.68, 0.04]} c="#1a1410" /></group>)}
      <group position={[0, 0.7, 0]}>
        <B s={[0.52, 0.62, 0.29]} pos={[0, 0.32, 0]} c={coat} />
        <B s={[0.53, 0.05, 0.3]} pos={[0, 0.2, 0]} c="#5d666e" />
        <group position={[-0.33, 0.58, 0]} rotation={q.aL}><B s={[0.13, 0.5, 0.14]} pos={[0, -0.22, 0]} c={coat} /><B s={[0.12, 0.12, 0.13]} pos={[0, -0.52, 0]} c={skin} /></group>
        <group position={[0.33, 0.58, 0]} rotation={q.aR}><B s={[0.13, 0.5, 0.14]} pos={[0, -0.22, 0]} c={coat} /><B s={[0.12, 0.12, 0.13]} pos={[0, -0.52, 0]} c={skin} /></group>
        <group position={[0, 0.84, 0]}>
          <B s={[0.37, 0.36, 0.34]} c={skin} />
          <mesh position={[0, 0.17, 0]}><sphereGeometry args={[0.22, 10, 6, 0, PI * 2, 0, PI / 2]} /><M c={helmet} /></mesh>
          <B s={[0.46, 0.03, 0.44]} pos={[0, 0.17, 0.02]} c={helmet} />
        </group>
      </group>
    </group>
  );
};
export const Worker: React.FC<P> = ({ t, p }) => <Figure t={t} coat={p.coat} helmet={p.helmet} pose={p.pose} seq={p.seq} />;

/* ---------- Tapa de cerca: brida grande con los 72 tornillos y el borde de la olla ---------- */
export const LidClose: React.FC<P> = ({ t, p }) => {
  const R = p.R ?? 1.2;
  return (
    <group>
      <B s={[6, 0.3, 4]} pos={[0, -0.28 * R - 0.15, -0.6]} c="#3a4046" />
      <Cyl r={1.25 * R} h={0.02} pos={[0, -0.28 * R + 0.01, 0]} seg={48} c="#262c31" />
      <Lid t={t} R={R} lit={p.lit} litDur={p.litDur} hl={p.hl} />
      {p.press !== undefined && <group position={[0, 0.035 * R + 0.07 * R / 2 + 0.01, R]}><Press t={t} at={p.press} len={0.36} /></group>}
    </group>
  );
};

/* ---------- Neutrones: bolitas rápidas con estela; en agua (o grafito) se frenan. Funciones puras del tiempo ---------- */
type Neu = { s: number; y: number; x0: number; v0: number; slow: boolean; end?: number };
const nx = (n: Neu, tau: number, xe: number, v1 = 0.22, k = 4.2) => {
  const te = (xe - n.x0) / n.v0; if (tau <= te) return n.x0 + n.v0 * tau;
  const t2 = tau - te; return n.slow ? xe + v1 * t2 + ((n.v0 - v1) / k) * (1 - Math.exp(-k * t2)) : xe + n.v0 * t2;
};
const Neutrons: React.FC<{ t: number; list: Neu[]; xe: number; xmax: number; z: number; fade?: number }> = ({ t, list, xe, xmax, z, fade }) => (
  <group>{list.map((n, i) => {
    const tau = t - n.s; if (tau < 0) return null; const x = Math.min(nx(n, tau, xe), n.end ?? 99); if (x > xmax) return null;
    const life = n.end !== undefined ? 1 : clamp(2.4 - tau) ; const fo = fade === undefined ? 1 : 1 - clamp((t - fade) / 0.5);
    const o = life * fo; if (o <= 0.01) return null;
    return <group key={i}>
      {[0, 1, 2, 3].map((j) => { const xj = Math.min(nx(n, Math.max(0, tau - j * 0.035), xe), n.end ?? 99); if (j > 0 && Math.abs(x - xj) < 0.02) return null;
        return <Ball key={j} r={0.045 * (1 - j * 0.2)} pos={[xj, n.y, z]} c={NEU} e={NEU} ei={1.2} o={o * (1 - j * 0.25)} />; })}
    </group>; })}</group>
);
/** genera neutrones cada `every` s desde `from` hasta `to` */
const spawn = (from: number, to: number, every: number, ys: number[], x0: number, slow: boolean, v0 = 3.6): Neu[] => {
  const o: Neu[] = []; let i = 0; for (let s = from; s < to; s += every, i++) o.push({ s, y: ys[i % ys.length], x0, v0, slow }); return o;
};
/** calcula cuándo largar un neutrón para que llegue a `ax` justo en `hit` */
const aimed = (hit: number, y: number, x0: number, xe: number, ax: number, v0 = 3.6): Neu => {
  let lo = 0, hi = 12; for (let k = 0; k < 40; k++) { const m = (lo + hi) / 2; if (nx({ s: 0, y, x0, v0, slow: true }, m, xe) < ax) lo = m; else hi = m; }
  return { s: hit - (lo + hi) / 2, y, x0, v0, slow: true, end: ax };
};

/* ---------- Átomo: racimo de bolitas; en `split` se separa en dos mitades despacio y suelta calor (halo naranja suave) ---------- */
const Atom: React.FC<{ t: number; split?: number; s?: number }> = ({ t, split, s = 1 }) => {
  const pts = React.useMemo(() => { const r = rnd(7); return Array.from({ length: 11 }, (_, i) => ({ v: [(r() - 0.5) * 0.17, (r() - 0.5) * 0.17, (r() - 0.5) * 0.12] as V3, c: i % 2 ? '#ff7a3a' : GOLD })); }, []);
  const k = split === undefined ? 0 : eio((t - split) / 0.9); const hk = split === undefined ? 0 : clamp((t - split) / 0.5);
  const wob = Math.sin(t * 6) * 0.006;
  return <group scale={[s, s, s]}>
    {pts.map((q, i) => { const sd = q.v[0] < 0 ? -1 : 1; return <Ball key={i} r={0.055} pos={[q.v[0] + sd * k * 0.2 + wob, q.v[1] + sd * k * 0.05, q.v[2]]} c={q.c} e={q.c} ei={0.35 + hk * 0.4} />; })}
    {hk > 0 && <Ball r={0.14 + 0.1 * eo((t - split!) / 1.2)} c={HOT} e={HOT} ei={0.8} o={0.2 * hk * (0.85 + 0.15 * Math.sin(t * 4))} seg={2} />}
  </group>;
};

/* ---------- Tanque en corte con agua pesada: neutrones, átomo, burbujas (hierve) y apagado ---------- */
export const Tank: React.FC<P> = ({ t, p }) => {
  const { w = 2.2, h = 1.3, d = 0.7, atom, hit, split, boil, off, fast, neuFrom = 0, neuTo = 99, every = 0.55, steam } = p;
  const zf = d / 2 + 0.03; const xe = -w / 2 + 0.06;
  const ok = off === undefined ? 1 : 1 - clamp((t - off) / 0.9);
  const ys = [0.3, 0.72, 0.5, 0.82, 0.4, 0.62].map((y) => y * h);
  const list = React.useMemo(() => {
    const l = spawn(neuFrom, Math.min(neuTo, off ?? 99), every, ys, -w / 2 - 0.9, !fast);
    if (atom && hit !== undefined) l.push(aimed(hit, atom[1], -w / 2 - 0.9, xe, atom[0] - 0.1));
    return l; }, [w, h, neuFrom, neuTo, off, every, fast, hit]);
  const bk = boil === undefined ? 0 : clamp((t - boil) / 0.6);
  return (
    <group>
      {/* casco de acero: fondo, base y costados (frente cortado) */}
      <B s={[w + 0.1, h + 0.1, 0.05]} pos={[0, h / 2, -d / 2 - 0.025]} c={STEEL2} />
      <B s={[w + 0.1, 0.06, d]} pos={[0, 0.03, 0]} c={STEEL2} />
      {[-1, 1].map((sd) => <B key={sd} s={[0.05, h + 0.06, d]} pos={[sd * (w / 2 + 0.025), h / 2 + 0.03, 0]} c={STEEL2} />)}
      {[-1, 1].map((sd) => <B key={'e' + sd} s={[0.06, h + 0.1, 0.06]} pos={[sd * (w / 2 + 0.03), h / 2 + 0.03, d / 2]} c="#8d969e" />)}
      <B s={[w + 0.12, 0.06, 0.06]} pos={[0, 0.03, d / 2]} c="#8d969e" />
      {/* agua pesada: azul profundo, el corte se ve de frente */}
      <B s={[w, h * 0.92, d - 0.02]} pos={[0, 0.06 + (h * 0.92) / 2, 0]} c={HW} e={HW_E} ei={0.55 * ok + 0.08} o={0.93} />
      {/* brillo de la superficie que se mueve */}
      {[0, 1, 2].map((i) => { const u = (t * 0.15 + i / 3) % 1; return <B key={'g' + i} s={[w * 0.22, 0.01, 0.03]} pos={[lerp(-w / 2 + w * 0.12, w / 2 - w * 0.12, u), 0.06 + h * 0.92 + 0.006, -d / 4 + i * 0.12]} c="#9cc4ff" e="#9cc4ff" ei={0.5 * ok} />; })}
      <pointLight position={[0, h * 0.6, d / 2 + 0.6]} intensity={3.5 * ok} color="#4a86ff" distance={3} />
      <Neutrons t={t} list={list} xe={xe} xmax={w / 2 - 0.05} z={zf} fade={off} />
      {atom && <group position={[atom[0], atom[1], zf]}><Atom t={t} split={split} /></group>}
      {/* burbujas al hervir: suben y se achican en la superficie */}
      {bk > 0 && Array.from({ length: 22 }, (_, i) => { const ph = (((t - boil) * 0.55 + (i * 0.37) % 1) % 1); const x = ((((i * 0.61) % 1) - 0.5) * (w - 0.2));
        const y = 0.12 + ph * (h * 0.88 - 0.1); const r = (0.025 + ph * 0.035) * bk;
        return <Ball key={'b' + i} r={r} pos={[x + Math.sin(ph * 8 + i) * 0.03, y, zf - 0.01]} c="#d6ecff" e="#a9d2ff" ei={0.3} o={0.75 * bk * clamp((1 - ph) * 5)} />; })}
      {/* vapor que sale por arriba hacia la turbina (planos 6) */}
      {steam !== undefined && t >= steam && Array.from({ length: 10 }, (_, i) => { const ph = (((t - steam) * 0.5 + i / 10) % 1); const sk = clamp((t - steam) / 0.5);
        return <Ball key={'s' + i} r={(0.05 + ph * 0.06) * sk} pos={[w / 2 - 0.25 + Math.sin(ph * 5 + i) * 0.03, h + 0.12 + ph * 0.55, 0]} c="#eef3f7" o={0.55 * sk * clamp((1 - ph) * 4) * clamp(ph * 6)} seg={1} />; })}
    </group>
  );
};

/* ---------- Turbina en corte (eje horizontal) + generador. `start` = desde cuándo gira ---------- */
export const Turbine: React.FC<P> = ({ t, p }) => {
  const { start = 0, L = 1.1, r = 0.32, w0 = 9 } = p;
  const tau = Math.max(0, t - start); const ang = tau < 1 ? (w0 * tau * tau) / 2 : w0 * (tau - 0.5);
  return (
    <group>
      {/* mitad de atrás de la carcasa */}
      <mesh rotation={[0, 0, PI / 2]}><cylinderGeometry args={[r + 0.06, r + 0.12, L, 24, 1, true, PI / 2, PI]} /><meshStandardMaterial color={STEEL2} side={THREE.DoubleSide} flatShading roughness={0.8} /></mesh>
      <Cyl r={0.035} h={L + 0.5} rot={[0, 0, PI / 2]} pos={[0.12, 0, 0]} c="#9aa2a9" />
      {[0, 1, 2, 3, 4].map((k) => { const x = -L / 2 + 0.12 + k * ((L - 0.24) / 4); const rr = r * (0.6 + k * 0.1);
        return <group key={k} position={[x, 0, 0]} rotation={[ang + k * 0.3, 0, 0]}>
          {Array.from({ length: 10 }, (_, j) => <B key={j} s={[0.03, rr, 0.07]} pos={[0, Math.cos((j / 10) * PI * 2) * rr / 2, Math.sin((j / 10) * PI * 2) * rr / 2]} rot={[(j / 10) * PI * 2, 0, 0.25]} c={j % 2 ? '#a5adb4' : '#7f8891'} />)}
          <Cyl r={0.07} h={0.06} rot={[0, 0, PI / 2]} c="#8a939c" />
        </group>; })}
      {/* generador */}
      <group position={[L / 2 + 0.3, 0, 0]}>
        <B s={[0.3, 0.4, 0.4]} c="#3d6f5a" />
        <B s={[0.32, 0.06, 0.42]} pos={[0, 0.16, 0]} c="#2f5848" />
        <B s={[0.04, 0.04, 0.02]} pos={[0.07, 0.04, 0.21]} c="#3ee07a" e="#3ee07a" ei={tau > 0.3 ? 1 : 0.1} />
      </group>
      <B s={[L + 0.7, 0.08, 0.5]} pos={[0.15, -r - 0.18, 0]} c="#4a525a" />
      <B s={[0.12, r + 0.1, 0.4]} pos={[-L / 2 + 0.1, -r / 2 - 0.1, 0]} c="#4a525a" />
      <B s={[0.12, r + 0.1, 0.4]} pos={[L / 2 - 0.1, -r / 2 - 0.1, 0]} c="#4a525a" />
    </group>
  );
};
/** caño translúcido con soplos de vapor que viajan de a hacia b */
export const SteamPipe: React.FC<P> = ({ t, p }) => {
  const { pts = [[0, 0, 0], [1, 0, 0]], from = 0, c = '#eef3f7', r = 0.07, n = 7, speed = 0.55, dots = 'puff' } = p;
  const segs: [V3, V3][] = []; for (let i = 0; i < pts.length - 1; i++) segs.push([pts[i], pts[i + 1]]);
  const lens = segs.map(([a, b]) => Math.hypot(b[0] - a[0], b[1] - a[1], b[2] - a[2])); const tot = lens.reduce((x, y) => x + y, 0);
  const at = (u: number): V3 => { let d = u * tot; for (let i = 0; i < segs.length; i++) { if (d <= lens[i] || i === segs.length - 1) { const k = clamp(d / lens[i]); const [a, b] = segs[i]; return [lerp(a[0], b[0], k), lerp(a[1], b[1], k), lerp(a[2], b[2], k)]; } d -= lens[i]; } return pts[0]; };
  const on = clamp((t - from) / 0.4);
  return <group>
    {segs.map(([a, b], i) => pipeBetween(a, b, r, '#9fb3c2', 'sp' + i, 0.35))}
    {pts.slice(1, -1).map((q: V3, i: number) => <Ball key={'j' + i} r={r * 1.02} pos={q} c="#9fb3c2" o={0.35} />)}
    {on > 0 && Array.from({ length: n }, (_, i) => { const u = ((t - from) * speed / tot * 1.0 + i / n) % 1; if (t - from < 0) return null;
      return <Ball key={i} r={(dots === 'puff' ? r * 0.75 : r * 0.55) * on} pos={at(u)} c={c} e={dots === 'puff' ? undefined : c} ei={0.4} o={dots === 'puff' ? 0.85 : 1} />; })}
  </group>;
};

/* ---------- Condensador en corte: haz de tubos con agua del Paraná; el vapor que baja se vuelve gotas ---------- */
export const Condenser: React.FC<P> = ({ t, p }) => {
  const { w = 1.9, h = 1.25, d = 0.7, tubes = 0, rows = 9, flow = 0, rain = 99, steamFrom = 0 } = p;
  const zf = d / 2;
  const tk = (row: number) => clamp((t - tubes - row * 0.07) / 0.25);
  const lvl = 0.06 + 0.16 * eo((t - rain) / 1.2) * (t >= rain ? 1 : 0);
  const fk = clamp((t - flow) / 0.4);
  return (
    <group>
      <B s={[w + 0.1, h + 0.1, 0.05]} pos={[0, h / 2, -d / 2 - 0.025]} c={STEEL2} />
      <B s={[w + 0.1, 0.06, d]} pos={[0, 0.03, 0]} c={STEEL2} />
      <B s={[w + 0.1, 0.06, d]} pos={[0, h + 0.03, 0]} c={STEEL2} />
      {[-1, 1].map((sd) => <B key={sd} s={[0.05, h + 0.06, d]} pos={[sd * (w / 2 + 0.025), h / 2 + 0.03, 0]} c={STEEL2} />)}
      {[-1, 1].map((sd) => <B key={'e' + sd} s={[0.06, h + 0.12, 0.06]} pos={[sd * (w / 2 + 0.03), h / 2 + 0.03, zf]} c="#8d969e" />)}
      <B s={[w + 0.12, 0.06, 0.06]} pos={[0, 0.03, zf]} c="#8d969e" /><B s={[w + 0.12, 0.06, 0.06]} pos={[0, h + 0.03, zf]} c="#8d969e" />
      <B s={[w, 0.25, d - 0.04]} pos={[0, h / 2 + 0.03, -d / 2 + 0.02]} c="#3b4550" />
      {/* haz de tubos (de costado): filas que aparecen en `tubes` */}
      {Array.from({ length: rows }, (_, row) => { const k = tk(row); if (k <= 0) return null; const y = 0.42 + row * ((h - 0.62) / (rows - 1));
        return <group key={row}>{[-0.18, 0.04, 0.24].map((z, j) => <mesh key={j} position={[0, y + (j === 1 ? 0.025 : 0), z]} rotation={[0, 0, PI / 2]} scale={[1, Math.max(0.001, k), 1]}>
          <cylinderGeometry args={[0.022, 0.022, w - 0.06, 8]} /><M c={j === 2 ? '#c88a52' : '#a87444'} e={RIVER} ei={0.15} /></mesh>)}
          {/* agua marrón del río que corre por los tubos de adelante, de derecha a izquierda */}
          {fk > 0 && k >= 1 && [0, 1, 2].map((i) => { const u = ((t - flow) * 0.5 + i / 3 + row * 0.13) % 1; return <Ball key={'f' + i} r={0.022 * fk} pos={[lerp(w / 2 - 0.05, -w / 2 + 0.05, u), y, 0.24 + 0.03]} c={RIVER2} e={RIVER2} ei={0.4} />; })}
        </group>; })}
      {/* vapor que entra por arriba y baja entre los tubos; desde `rain` se vuelve gotas azules que caen al pozo de abajo */}
      {Array.from({ length: 12 }, (_, i) => { if (t < steamFrom) return null; const ph = (((t - steamFrom) * 0.42 + i / 12) % 1); const x = (((i * 0.53) % 1) - 0.5) * (w - 0.3);
        const y = lerp(h - 0.05, 0.12, ph); const isDrop = t >= rain && ph > 0.45; const z = zf - 0.02;
        if (isDrop) return <mesh key={'r' + i} position={[x, y, z]} scale={[0.8, 1.4, 0.8]}><icosahedronGeometry args={[0.022, 1]} /><M c="#5aa0ff" e="#5aa0ff" ei={0.7} /></mesh>;
        return <Ball key={'v' + i} r={0.05 + (1 - ph) * 0.03} pos={[x, y, z]} c="#eef3f7" o={0.6 * clamp((1 - ph) * 2.2)} />; })}
      {/* pozo de agua de abajo */}
      <B s={[w, lvl, d - 0.04]} pos={[0, 0.06 + lvl / 2, 0]} c="#2f6fd6" e="#2f6fd6" ei={0.35} o={0.92} />
    </group>
  );
};

/* ---------- Pileta del río Paraná en corte (agua marrón) con la toma ---------- */
export const RiverCut: React.FC<P> = ({ t, p }) => {
  const { w = 0.7, h = 0.5, d = 0.9 } = p;
  return <group>
    <B s={[w, h, d]} pos={[0, h / 2, 0]} c={RIVER} e={RIVER} ei={0.15} />
    {[0, 1, 2, 3].map((i) => { const u = ((t * 0.25 + i / 4) % 1); return <B key={i} s={[0.16, 0.008, 0.03]} pos={[lerp(-w / 2 + 0.08, w / 2 - 0.08, u), h + 0.005, -d / 3 + i * 0.2]} c={RIVER2} />; })}
    <B s={[w + 0.06, 0.04, d + 0.06]} pos={[0, 0.02, 0]} c="#4c4a3e" />
  </group>;
};

/* ---------- Bloques de grafito (Chernóbil): gris oscuro, se calientan y siguen frenando neutrones ---------- */
export const Graphite: React.FC<P> = ({ t, p }) => {
  const { cols = 4, rows = 3, s = 0.42, hot = 99, neuFrom = 0 } = p; const gap = 0.04;
  const W = cols * s + (cols - 1) * gap, H = rows * s + (rows - 1) * gap; const hk = clamp((t - hot) / 0.9);
  const ys = [0.25, 0.7, 0.5, 0.95, 0.35, 0.8].map((y) => y * H);
  const list = React.useMemo(() => spawn(neuFrom, 99, 0.5, ys, -W / 2 - 0.9, true), [neuFrom, W]);
  return <group>
    {Array.from({ length: cols * rows }, (_, i) => { const cx = -W / 2 + s / 2 + (i % cols) * (s + gap), cy = s / 2 + Math.floor(i / cols) * (s + gap); const v = 0.5 + 0.5 * Math.sin(i * 1.7 + t * 2);
      return <group key={i} position={[cx, cy, 0]}>
        <B s={[s, s, s]} c={hk > 0 ? '#2a2725' : '#2a2e32'} e={hk > 0 ? '#ff6a2a' : undefined} ei={hk * (0.06 + 0.03 * v)} />
        <Cyl r={s * 0.14} h={0.02} rot={[PI / 2, 0, 0]} pos={[0, 0, s / 2 + 0.005]} c="#15181b" />
      </group>; })}
    {hk > 0 && <pointLight position={[0, H / 2, 1]} intensity={0.4 * hk} color="#ff7a3a" distance={3} />}
    <Neutrons t={t} list={list} xe={-W / 2} xmax={W / 2} z={s / 2 + 0.06} />
  </group>;
};

/* ---------- Esfera vista de afuera (Atucha I y II) sobre el pasto; `on` = luces de la base ---------- */
export const Dome: React.FC<P> = ({ t, p }) => {
  const { R = 0.7, on } = p; const cy = R * 0.29; const thG = Math.acos(-cy / R); const k = on === undefined ? 0 : clamp((t - on) / 0.4);
  return <group>
    <mesh position={[0, cy, 0]}><sphereGeometry args={[R, 40, 20, 0, PI * 2, 0, thG]} /><M c="#8a8f93" /></mesh>
    <B s={[R * 2.4, R * 0.35, R * 1.2]} pos={[R * 0.2, R * 0.175, -R * 0.75]} c="#8c9196" />
    <Cyl r={R * 0.18} h={R * 1.3} pos={[R * 1.15, R * 0.65, -R * 0.6]} c="#9aa0a6" />
    {[-0.5, -0.17, 0.17, 0.5].map((x, i) => <B key={i} s={[R * 0.16, R * 0.09, 0.01]} pos={[R * 0.2 + x * R * 2, R * 0.2, -R * 0.15 + 0.005]} c={k > 0 ? '#ffd98a' : '#3a4046'} e={k > 0 ? '#ffc65a' : undefined} ei={k * 0.9} />)}
  </group>;
};

/* ---------- Red eléctrica: torres, cable con energía que viaja y casas que se encienden ---------- */
export const Grid: React.FC<P> = ({ t, p }) => {
  const { from = 0, houses = 0, hDur = 2, people } = p;
  const towers = [-0.9, -0.1, 0.7];
  const hs = React.useMemo(() => { const r = rnd(4); const o: { x: number; z: number; w: number; h: number; c: string }[] = [];
    for (let row = 0; row < 3; row++) for (let i = 0; i < 6; i++) o.push({ x: 0.2 + i * 0.24 + (r() - 0.5) * 0.04, z: -0.8 + row * 0.42, w: 0.17 + r() * 0.04, h: 0.14 + r() * 0.08, c: ['#c9b48e', '#b9a27a', '#d2c3a0'][(i + row) % 3] }); return o; }, []);
  return <group>
    {towers.map((x, i) => <group key={i} position={[x - 0.9, 0, -1.0]}>
      {[-1, 1].map((s) => <B key={s} s={[0.025, 0.8, 0.025]} pos={[s * 0.06, 0.4, 0]} rot={[0, 0, -s * 0.07]} c="#8d969e" />)}
      <B s={[0.3, 0.025, 0.025]} pos={[0, 0.74, 0]} c="#8d969e" /><B s={[0.2, 0.02, 0.02]} pos={[0, 0.55, 0]} c="#8d969e" />
    </group>)}
    {[0, 1].map((k) => pipeBetween([towers[k] - 0.9, 0.74, -1.0], [towers[k + 1] - 0.9, 0.74, -1.0], 0.007, '#3a3f44', 'w' + k))}
    {pipeBetween([towers[2] - 0.9, 0.74, -1.0], [0.25, 0.25, -0.85], 0.007, '#3a3f44', 'w3')}
    {t >= from && Array.from({ length: 8 }, (_, i) => { const u = ((t - from) * 0.6 + i / 8) % 1; const ax = towers[0] - 0.9, bx = 0.25; const x = lerp(ax, bx, u); const y = x < towers[2] - 0.9 ? 0.74 : lerp(0.74, 0.25, (x - (towers[2] - 0.9)) / (bx - (towers[2] - 0.9)));
      return <Ball key={i} r={0.03} pos={[x, y, x < towers[2] - 0.9 ? -1.0 : lerp(-1.0, -0.85, (x - (towers[2] - 0.9)) / (bx - (towers[2] - 0.9)))]} c="#ffe27a" e="#ffd23a" ei={1.2} />; })}
    {hs.map((q, i) => { const on = clamp((t - houses - (i / hs.length) * hDur) / 0.25);
      return <group key={'h' + i} position={[q.x, 0, q.z]}>
        <B s={[q.w, q.h, q.w]} pos={[0, q.h / 2, 0]} c={q.c} />
        <mesh position={[0, q.h + 0.05, 0]} rotation={[0, PI / 4, 0]}><coneGeometry args={[q.w * 0.75, 0.1, 4]} /><M c="#8a4a3a" /></mesh>
        <B s={[q.w * 0.35, q.h * 0.35, 0.01]} pos={[0, q.h * 0.5, q.w / 2 + 0.003]} c={on > 0 ? '#ffd98a' : '#2a2f35'} e={on > 0 ? '#ffc65a' : undefined} ei={on} />
      </group>; })}
    {people !== undefined && Array.from({ length: 14 }, (_, i) => { const k = clamp((t - people - i * 0.04) / 0.3); if (k <= 0) return null; const x = 0.15 + (i % 7) * 0.21, z = 0.12 + Math.floor(i / 7) * 0.18;
      return <group key={'q' + i} position={[x, 0, z]} scale={[k, k, k]}>
        <Cyl r={0.035} h={0.13} pos={[0, 0.065, 0]} c={['#3f6fb0', '#c8482f', '#3e9c6a', '#d9a640', '#7a5aa8'][i % 5]} />
        <Ball r={0.035} pos={[0, 0.165, 0]} c="#c99a72" seg={1} />
      </group>; })}
  </group>;
};

export const EXTRA = { world: World, central: Central, lidclose: LidClose, tank: Tank, turbine: Turbine, steampipe: SteamPipe, condenser: Condenser, rivercut: RiverCut, graphite: Graphite, dome: Dome, grid: Grid, worker: Worker };
