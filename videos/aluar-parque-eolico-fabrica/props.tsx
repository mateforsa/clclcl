import React from 'react';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';
import { M, useTex } from '../../src/kit/Props';
import { clamp, eio, eo, lerp, rnd } from '../../src/kit/math';

// Look propio: estepa patagónica ventosa junto al mar (Golfo Nuevo). Piso de estepa ocre con matas de coirón que se doblan con el
// viento, ráfagas de polvo bajas, bardas chatas al fondo y el mar azul oscuro detrás. Cielo patagónico limpio que se oscurece arriba.
// La fábrica de aluminio: naves de cubas largas con ventanas naranjas, silos de alúmina y dos chimeneas. Molinos blancos de tres aspas.
// Sin carteles 3D con texto ni logos: nombres y cifras van solo en placas 2D del kit. Sin personas.
// Escalas: molino nuevo = 182,5 m hasta la punta del aspa vertical, buje a 100 m, rotor de 165 m (radio 82,5) => buje 0,548 H, radio
// 0,452 H. Obelisco = 67,5 m => 182,5 / 67,5 = 2,7 Obeliscos.
// Las aspas giran en un plano delante de la torre (separado 0,09 H del eje) y la punta más baja queda a 0,096 H del suelo: nunca
// cruzan la torre ni el piso.
// QC (solo en el bundle de control, nunca en el render): window.__QCF pinta los objetos clave en magenta plano para medir si una placa
// los tapa. `Key` marca qué es objeto clave.
// Velo `Shade` (de litio-pileta-salar): pegado a la cámara, oscurece el tercio superior; la franja de subtítulos nunca queda clara.
type P = { t: number; tt: number; p: any };
type V3 = [number, number, number];
const PI = Math.PI;

const KeyCtx = React.createContext(false);
const qc = () => typeof window !== 'undefined' && !!(window as any).__QCF;
const Mat: React.FC<{ c: string; e?: string; ei?: number; o?: number }> = ({ c, e, ei, o }) => {
  const key = React.useContext(KeyCtx);
  if (key && qc()) return <meshBasicMaterial color="#ff00ff" toneMapped={false} fog={false} />;
  return <M c={c} e={e} ei={ei} o={o} />;
};
const B: React.FC<{ s: V3; pos?: V3; rot?: V3; c: string; e?: string; ei?: number; o?: number }> = ({ s, pos, rot, c, e, ei, o }) => (
  <mesh position={pos} rotation={rot}><boxGeometry args={s} /><Mat c={c} e={e} ei={ei} o={o} /></mesh>
);
const Cyl: React.FC<{ r: number; r2?: number; h: number; pos?: V3; rot?: V3; seg?: number; c: string; e?: string; ei?: number; o?: number }> = ({ r, r2, h, pos, rot, seg = 10, c, e, ei, o }) => (
  <mesh position={pos} rotation={rot}><cylinderGeometry args={[r2 ?? r, r, h, seg]} /><Mat c={c} e={e} ei={ei} o={o} /></mesh>
);
const Ball: React.FC<{ r: number; pos?: V3; c: string; e?: string; ei?: number; o?: number; d?: number }> = ({ r, pos, c, e, ei, o, d = 0 }) => (
  <mesh position={pos}><icosahedronGeometry args={[r, d]} /><Mat c={c} e={e} ei={ei} o={o} /></mesh>
);
const rodBetween = (a: V3, b: V3, r: number, c: string, key?: string, e?: string, ei?: number) => {
  const dx = b[0] - a[0], dy = b[1] - a[1], dz = b[2] - a[2]; const L = Math.hypot(dx, dy, dz) || 1e-4;
  const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(dx / L, dy / L, dz / L)); const eu = new THREE.Euler().setFromQuaternion(q);
  return <mesh key={key} position={[(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2]} rotation={[eu.x, eu.y, eu.z]}><cylinderGeometry args={[r, r, L, 6]} /><Mat c={c} e={e} ei={ei} /></mesh>;
};
/** curva por tramos [[t, v], ...] con easing: continua, sin saltos */
const curve = (kf: [number, number][], t: number) => {
  if (!kf.length) return 0; if (t <= kf[0][0]) return kf[0][1];
  for (let i = 1; i < kf.length; i++) if (t < kf[i][0]) { const [t0, v0] = kf[i - 1], [t1, v1] = kf[i]; return lerp(v0, v1, eio((t - t0) / (t1 - t0))); }
  return kf[kf.length - 1][1];
};

export const STEPPE = '#95875c', STEPPE2 = '#9a8452', DUST = '#c9b58a', SEA = '#24607e', BARDA = '#b59b6c';
export const WHITE = '#eef1f3', ALU = '#b9c0c7', ALU2 = '#8f979f', ROOF = '#6f777f', HOT = '#ff9a3a';
export const WIND = '#27e0d8', GAS = '#ff8a2a', HYDRO = '#3a8dff', GOLD = '#ffb52e';

/* ---------- Velo oscuro pegado a la cámara (igual que litio-pileta-salar) ---------- */
const Shade: React.FC<{ y1?: number; a?: number }> = ({ y1 = 640, a = 0.9 }) => {
  const { camera } = useThree();
  const tex = useTex((g, W, H) => {
    g.clearRect(0, 0, W, H);
    for (let y = 0; y < H; y++) { const px = (y / H) * y1; const k = px < 430 ? 1 : 1 - clamp((px - 430) / (y1 - 430)); const al = a * (k * k * (3 - 2 * k));
      g.fillStyle = `rgba(6,10,20,${al})`; g.fillRect(0, y, W, 1); }
  }, 4, 256, 'patashade' + y1 + a);
  const geo = React.useMemo(() => new THREE.PlaneGeometry(1, 1), []);
  camera.updateMatrixWorld();
  const yb = 1 - (2 * y1) / 1920; const pos = geo.attributes.position as THREE.BufferAttribute;
  const pts: [number, number][] = [[-1.1, 1.1], [1.1, 1.1], [-1.1, yb], [1.1, yb]];
  pts.forEach(([x, y], i) => { const v = new THREE.Vector3(x, y, -0.9).unproject(camera); pos.setXYZ(i, v.x, v.y, v.z); });
  pos.needsUpdate = true; geo.computeBoundingSphere();
  return <mesh geometry={geo} frustumCulled={false} renderOrder={999}>
    <meshBasicMaterial map={tex} transparent depthTest={false} depthWrite={false} toneMapped={false} fog={false} /></mesh>;
};

/* ---------- Mundo: estepa patagónica junto al mar ----------
   p: sea (z del borde de la barda, el mar va detrás), tufts {x:[a,b], z:[a,b], n}, dust (ráfagas), shadeY, shadeA, noShade, dusk */
export const World: React.FC<P> = ({ t, p }) => {
  const sky = useTex((g, W, H) => {
    const gr = g.createLinearGradient(0, H, 0, 0);
    [[0, '#d9dfde'], [0.03, '#b4c9d6'], [0.08, '#6f95b8'], [0.17, '#2c4f78'], [0.3, '#12233d'], [1, '#070d1a']].forEach(([f, c]) => gr.addColorStop(f as number, c as string));
    g.fillStyle = gr; g.fillRect(0, 0, W, H);
  }, 256, 1024, 'patasky');
  const ground = useTex((g, W, H) => {
    g.fillStyle = STEPPE; g.fillRect(0, 0, W, H);
    const r = rnd(13);
    for (let i = 0; i < 2600; i++) { const x = r() * W, y = r() * H, s = 2 + r() * 7; g.fillStyle = ['#8f7a48', '#b9a26e', '#8a8350', '#7d6e44', '#c2ad7c'][i % 5]; g.globalAlpha = 0.35 + r() * 0.4; g.fillRect(x, y, s, s * 0.6); }
    g.globalAlpha = 1;
    // huellas de ripio claras
    g.strokeStyle = '#cbb98f'; g.lineWidth = 3; for (let i = 0; i < 6; i++) { g.beginPath(); const y0 = r() * H; g.moveTo(0, y0); for (let x = 0; x <= W; x += 64) g.lineTo(x, y0 + Math.sin(x * 0.01 + i) * 18); g.globalAlpha = 0.25; g.stroke(); }
    g.globalAlpha = 1;
  }, 1024, 1024, 'pataground');
  const seaZ = p.sea as number | undefined;
  const tufts = React.useMemo(() => { const r = rnd(p.seed ?? 7); const tz = p.tufts?.z ?? [1.0, 3.2], tx = p.tufts?.x ?? [-2.6, 2.6]; const n = p.tufts?.n ?? 46;
    return Array.from({ length: n }, () => ({ x: lerp(tx[0], tx[1], r()), z: lerp(tz[0], tz[1], r()), h: 0.05 + r() * 0.06, ph: r() * 6, c: ['#c9b26a', '#b89f58', '#d4bf7c'][Math.floor(r() * 3)] })); }, [p.seed, JSON.stringify(p.tufts)]);
  const bardas = React.useMemo(() => { const r = rnd(4); return Array.from({ length: 9 }, (_, i) => ({ x: -4.4 + i * 1.1 + (r() - 0.5) * 0.3, h: 0.18 + r() * 0.22, w: 0.9 + r() * 0.6, d: 0.35 + r() * 0.2 })); }, []);
  const gust = 0.5 + 0.5 * Math.sin(t * 1.3);
  return (
    <group>
      <fog attach="fog" args={['#b9c4c8', p.fogNear ?? 10, p.fogFar ?? 26]} />
      <mesh position={[0, 6, -3.76]}><planeGeometry args={[9.6, 12]} /><meshBasicMaterial map={sky} toneMapped={false} fog={false} /></mesh>
      <mesh rotation={[-PI / 2, 0, 0]} position={[0, 0.002, 2.49]}><planeGeometry args={[9.6, 12.5]} /><meshStandardMaterial map={ground} roughness={1} /></mesh>
      {seaZ !== undefined && <group>
        <mesh rotation={[-PI / 2, 0, 0]} position={[0, 0.006, (seaZ - 3.75) / 2]}><planeGeometry args={[9.6, Math.max(0.01, seaZ + 3.75)]} /><meshStandardMaterial color={SEA} roughness={0.5} metalness={0.1} flatShading /></mesh>
        {/* olas que corren con el viento */}
        {Array.from({ length: 14 }, (_, i) => { const u = (t * 0.25 + i * 0.37) % 1; const z = lerp(-3.6, seaZ - 0.08, ((i * 0.53) % 1));
          return <mesh key={'w' + i} position={[lerp(-4.2, 4.2, u), 0.01, z]}><boxGeometry args={[0.35, 0.004, 0.02]} /><meshBasicMaterial color="#8fc3d6" transparent opacity={0.55 * Math.sin(u * PI)} toneMapped={false} /></mesh>; })}
        {/* barda: borde de acantilado bajo */}
        <mesh position={[0, 0.03, seaZ + 0.04]}><boxGeometry args={[9.6, 0.06, 0.1]} /><M c={BARDA} /></mesh>
      </group>}
      {seaZ === undefined && !p.noBardas && bardas.map((b, i) => <mesh key={i} position={[b.x, b.h / 2, -3.4 - (i % 2) * 0.15]}><boxGeometry args={[b.w, b.h, b.d]} /><M c={i % 2 ? '#b9a372' : '#a8925f'} /></mesh>)}
      {/* matas de coirón: se doblan con el viento */}
      {tufts.map((q, i) => <group key={'t' + i} position={[q.x, 0, q.z]} rotation={[0, 0, -(0.12 + 0.22 * gust) - Math.sin(t * 4 + q.ph) * 0.07]}>
        <mesh position={[0, q.h / 2, 0]}><coneGeometry args={[0.045, q.h, 5]} /><M c={q.c} /></mesh></group>)}
      {/* ráfagas de polvo bajas que cruzan el cuadro */}
      {!p.noDust && Array.from({ length: 7 }, (_, i) => { const u = (t * (0.32 + (i % 3) * 0.06) + i * 0.29) % 1; const z = lerp(p.dustZ?.[0] ?? 0.8, p.dustZ?.[1] ?? 2.6, (i * 0.41) % 1);
        return <mesh key={'d' + i} position={[lerp(-3.2, 3.2, u), 0.04 + ((i * 0.37) % 1) * 0.18, z]}><boxGeometry args={[0.5 + (i % 3) * 0.2, 0.012, 0.012]} /><meshBasicMaterial color={DUST} transparent opacity={0.35 * Math.sin(u * PI)} toneMapped={false} depthWrite={false} /></mesh>; })}
      <hemisphereLight args={['#e6eef5', '#7a6a4a', p.dusk ? 0.35 : 0.6]} />
      <directionalLight position={[-3, 6, 4]} intensity={p.dusk ? 0.45 : 0.7} color="#fff1dc" />
      {!p.noShade && <Shade y1={p.shadeY ?? 640} a={p.shadeA ?? 0.9} />}
    </group>
  );
};

/* ---------- Molino: H = altura hasta la punta del aspa vertical ----------
   p: H, spin (rad/s), a0, settle {at} (frena con un aspa vertical hacia arriba, sin salto de velocidad), ghost, noRotor, build {at, n} */
const bladeAngle = (t: number, spin: number, a0: number, settle?: number) => {
  if (settle === undefined || t < settle) return a0 + spin * t;
  const as = a0 + spin * settle; const step = (2 * PI) / 3; const target = Math.ceil(as / step + 1e-6) * step; const diff = target - as;
  const dur = (3 * diff) / Math.max(1e-3, spin); return as + diff * eo((t - settle) / dur);
};
export const Turbine: React.FC<P> = ({ t, p }) => {
  // p.build {at, n, dt}: la torre se arma en tramos; con p.rest lo que falta se ve fantasma (sin superponerse con lo armado)
  const { H = 1, spin = 1.2, a0 = 0, noRotor } = p;
  const hub = 0.548 * H, R = 0.452 * H; const zr = 0.09 * H;
  const a = bladeAngle(t, spin, a0, p.settle);
  const nSec = p.build?.n ?? 3;
  const nb = p.build ? clamp(Math.floor((t - p.build.at) / (p.build.dt ?? 0.5)) + 1, 0, nSec) : nSec;
  const look = (g: boolean) => ({ o: g ? 0.45 : undefined, c: g ? '#cfefff' : WHITE, e: g ? '#7fd8ff' : undefined });
  const gAll = !!p.ghost;
  const show = (built: boolean) => built ? true : !!p.rest;
  const topBuilt = nb >= nSec;
  const T = look(gAll || !topBuilt);
  return (
    <group>
      <Cyl r={0.04 * H} h={0.012 * H} pos={[0, 0.006 * H, 0]} c="#9a9ea3" o={look(gAll).o} />
      {Array.from({ length: nSec }, (_, i) => { const built = i < nb; if (!show(built)) return null; const L = look(gAll || !built);
        const y0 = (i / nSec) * hub, y1 = ((i + 1) / nSec) * hub; const r0 = lerp(0.022, 0.013, i / nSec) * H, r1 = lerp(0.022, 0.013, (i + 1) / nSec) * H;
        return <Cyl key={i} r={r0} r2={r1} h={y1 - y0} pos={[0, (y0 + y1) / 2, 0]} seg={12} c={L.c} e={L.e} ei={0.4} o={L.o} />; })}
      {show(topBuilt) && <group position={[0, hub, 0]}>
        <B s={[0.05 * H, 0.045 * H, 0.13 * H]} pos={[0, 0.01 * H, 0.025 * H]} c={T.c} e={T.e} ei={0.4} o={T.o} />
        {!noRotor && <group position={[0, 0, zr]}>
          <mesh rotation={[PI / 2, 0, 0]}><coneGeometry args={[0.024 * H, 0.05 * H, 8]} /><Mat c={T.c} e={T.e} ei={0.4} o={T.o} /></mesh>
          <group rotation={[0, 0, -a]}>
            {[0, 1, 2].map((i) => <group key={i} rotation={[0, 0, (i * 2 * PI) / 3]}>
              <mesh position={[0, R * 0.5 + 0.012 * H, 0]} rotation={[0, 0.25, 0]}><boxGeometry args={[0.032 * H, R * 0.98, 0.008 * H]} /><Mat c={T.c} e={T.e} ei={0.4} o={T.o} /></mesh>
              <mesh position={[0, R * 0.93, 0]} rotation={[0, 0.25, 0]}><boxGeometry args={[0.016 * H, R * 0.14, 0.006 * H]} /><Mat c={T.o ? T.c : '#e05a4a'} e={T.e} ei={0.4} o={T.o} /></mesh>
            </group>)}
          </group>
        </group>}
      </group>}
    </group>
  );
};

/* ---------- Parque: muchos molinos ----------
   p: pts [[x,z,H?]...] o grid {n, area:[w,d], seed}; H; spin; popAt (aparecen en orden), popDur; outline (contorno CABA) */
export const CABA: [number, number][] = [
  [-58.531, -34.616], [-58.512, -34.592], [-58.497, -34.567], [-58.470, -34.543], [-58.452, -34.531], [-58.432, -34.546], [-58.401, -34.572],
  [-58.375, -34.585], [-58.355, -34.596], [-58.337, -34.618], [-58.348, -34.641], [-58.375, -34.652], [-58.402, -34.651], [-58.427, -34.662],
  [-58.452, -34.682], [-58.462, -34.705], [-58.484, -34.688], [-58.503, -34.664], [-58.529, -34.650],
];
const projCaba = (w: number): [number, number][] => { const lat0 = -34.615, lon0 = -58.435; const kx = Math.cos((lat0 * PI) / 180);
  const pts = CABA.map(([lo, la]) => [(lo - lon0) * kx, -(la - lat0)] as [number, number]); const span = Math.max(...pts.map((q) => q[0])) - Math.min(...pts.map((q) => q[0]));
  return pts.map(([x, y]) => [(x / span) * w, (-y / span) * w * -1]); };
const inside = (pt: [number, number], poly: [number, number][]) => { let c = false; for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
  const [xi, yi] = poly[i], [xj, yj] = poly[j]; if ((yi > pt[1]) !== (yj > pt[1]) && pt[0] < ((xj - xi) * (pt[1] - yi)) / (yj - yi) + xi) c = !c; } return c; };
export const cabaPts = (w: number, n: number, seed = 3): [number, number][] => {
  const poly = projCaba(w); const r = rnd(seed); const out: [number, number][] = []; const xs = poly.map((q) => q[0]), zs = poly.map((q) => q[1]);
  const x0 = Math.min(...xs), x1 = Math.max(...xs), z0 = Math.min(...zs), z1 = Math.max(...zs);
  // filas irregulares (como un parque real) hasta llegar a n exactos
  for (let step = 0.2; out.length < n && step > 0.05; step *= 0.97) { out.length = 0;
    for (let z = z0 + step / 2; z < z1; z += step * 0.85) for (let x = x0 + step / 2; x < x1; x += step) { const q: [number, number] = [x + (((Math.round(z / step)) % 2) * step) / 2 + (r() - 0.5) * step * 0.1, z + (r() - 0.5) * step * 0.2];
      if (inside(q, poly) && inside([q[0] + 0.06, q[1]], poly) && inside([q[0] - 0.06, q[1]], poly)) out.push(q); } }
  // si sobran, se sacan de a uno parejo hasta dejar n
  while (out.length > n) out.splice(Math.floor((out.length * 0.618 * (out.length % 7 + 1)) % out.length), 1);
  return out;
};
export const Park: React.FC<P> = ({ t, p }) => {
  const { H = 0.4, spin = 1.4, popAt, popDur = 1.2, outline, outAt = 0, w = 3 } = p;
  const pts: [number, number, number?][] = React.useMemo(() => p.caba ? cabaPts(w, p.caba, p.seed ?? 3) : p.pts, [JSON.stringify(p.pts), p.caba, w]);
  const poly = React.useMemo(() => projCaba(w), [w]);
  const ok = outline ? eo((t - outAt) / 0.9) : 0;
  return (
    <group>
      {pts.map((q, i) => { const order = p.order === 'x' ? (q[0] + w) / (2 * w) : i / pts.length; const at = popAt === undefined ? -1 : popAt + order * popDur; if (t < at) return null;
        const k = popAt === undefined ? 1 : clamp((t - at) / 0.25); const sc = k < 1 ? lerp(0, 1.12, eo(k)) : 1;
        return <group key={i} position={[q[0], 0, q[1]]} scale={[sc, sc, sc]}><Turbine t={t} tt={0} p={{ H: q[2] ?? H, spin: spin * (0.9 + ((i * 0.37) % 1) * 0.2), a0: i * 1.7, ghost: p.ghost }} /></group>; })}
      {/* contorno de la Ciudad de Buenos Aires a la misma escala (se dibuja en `outAt`) */}
      {ok > 0 && <ContourLine poly={poly} k={ok} c={GOLD} y={0.02} />}
    </group>
  );
};
const ContourLine: React.FC<{ poly: [number, number][]; k: number; c: string; y: number }> = ({ poly, k, c, y }) => {
  const segs = poly.map((a, i) => [a, poly[(i + 1) % poly.length]] as [[number, number], [number, number]]);
  const L = segs.reduce((s, [a, b]) => s + Math.hypot(b[0] - a[0], b[1] - a[1]), 0); let acc = 0;
  return <group>{segs.map(([a, b], i) => { const l = Math.hypot(b[0] - a[0], b[1] - a[1]); const f = clamp((k * L - acc) / l); acc += l; if (f <= 0) return null;
    const e: [number, number] = [lerp(a[0], b[0], f), lerp(a[1], b[1], f)]; const ang = Math.atan2(e[1] - a[1], e[0] - a[0]);
    return <mesh key={i} position={[(a[0] + e[0]) / 2, y, (a[1] + e[1]) / 2]} rotation={[0, -ang, 0]}><boxGeometry args={[Math.hypot(e[0] - a[0], e[1] - a[1]) + 0.03, 0.012, 0.03]} /><meshBasicMaterial color={c} toneMapped={false} /></mesh>; })}</group>;
};

/* ---------- Fábrica de aluminio: naves de cubas, silos, chimeneas, muelle ----------
   p: flick (desde cuándo tiemblan las luces), off (se apagan), pier, ship, plume */
export const Smelter: React.FC<P> = ({ t, p }) => {
  const { flick, off, L = 2.4 } = p;
  const fl = flick !== undefined && t >= flick ? (Math.sin(t * 37) > 0.2 ? 1 : 0.25) * (0.7 + 0.3 * Math.sin(t * 11)) : 1;
  const offk = off !== undefined ? 1 - clamp((t - off) / 0.25) : 1;
  const win = 0.9 * fl * offk + 0.05;
  return (
    <group>
      {/* dos naves de cubas, largas y bajas */}
      {[-0.26, 0.26].map((z, j) => <group key={j} position={[0, 0, z]}>
        <B s={[L, 0.26, 0.34]} pos={[0, 0.13, 0]} c={ALU} />
        {/* techo a dos aguas: caja girada 45° (la mitad de abajo queda dentro de la nave) */}
        <mesh position={[0, 0.26, 0]} rotation={[PI / 4, 0, 0]}><boxGeometry args={[L, 0.24, 0.24]} /><Mat c={ROOF} /></mesh>
        <B s={[L * 0.96, 0.04, 0.08]} pos={[0, 0.43, 0]} c={ALU2} />
        {/* ventanas naranjas corridas (luz de las cubas) */}
        <B s={[L * 0.92, 0.045, 0.01]} pos={[0, 0.11, 0.172]} c="#5a3a20" e={HOT} ei={win} />
        <B s={[L * 0.92, 0.045, 0.01]} pos={[0, 0.11, -0.172]} c="#5a3a20" e={HOT} ei={win} />
      </group>)}
      {/* planta de carbón + silos de alúmina */}
      <B s={[0.5, 0.36, 0.4]} pos={[L / 2 + 0.35, 0.18, 0.05]} c="#a7adb4" />
      <B s={[0.5, 0.05, 0.42]} pos={[L / 2 + 0.35, 0.385, 0.05]} c={ROOF} />
      {[-0.5, -0.2].map((x, i) => <group key={'s' + i} position={[-L / 2 + x, 0, -0.75]}>
        <Cyl r={0.13} h={0.5} pos={[0, 0.25, 0]} seg={12} c={WHITE} />
        <mesh position={[0, 0.56, 0]}><coneGeometry args={[0.13, 0.12, 12]} /><Mat c="#d4d8dc" /></mesh>
      </group>)}
      {/* chimeneas con franjas */}
      {[[L / 2 + 0.2, -0.3], [L / 2 + 0.5, -0.3]].map(([x, z], i) => <group key={'c' + i} position={[x, 0, z]}>
        <Cyl r={0.045} r2={0.035} h={0.78} pos={[0, 0.39, 0]} c="#d9d9d9" />
        <Cyl r={0.04} h={0.06} pos={[0, 0.7, 0]} c="#d9443a" />
        <Cyl r={0.043} h={0.06} pos={[0, 0.5, 0]} c="#d9443a" />
      </group>)}
      {/* subestación de entrada (donde llegan las líneas) */}
      <group position={[-L / 2 - 0.35, 0, 0.1]}>
        <B s={[0.36, 0.02, 0.4]} pos={[0, 0.01, 0]} c="#8b8f94" />
        {[-0.1, 0.1].map((x) => <B key={x} s={[0.08, 0.14, 0.1]} pos={[x, 0.08, 0]} c="#7a8088" />)}
        {[-0.12, 0.12].map((x) => <Cyl key={'p' + x} r={0.012} h={0.28} pos={[x, 0.14, 0.15]} c="#6a7078" />)}
      </group>
      {/* muelle al mar */}
      {p.pier && <group><B s={[0.12, 0.04, p.pier]} pos={[0.3, 0.03, -0.5 - p.pier / 2]} c="#8c8a84" />
        {p.ship && <group position={[0.62, 0.01, -0.5 - p.pier * 0.7]}>
          <B s={[0.24, 0.1, 1.0]} pos={[0, 0.05, 0]} c="#3a4656" /><B s={[0.25, 0.02, 1.01]} pos={[0, 0.09, 0]} c="#c8482f" />
          <B s={[0.18, 0.12, 0.16]} pos={[0, 0.16, 0.38]} c={WHITE} /></group>}
      </group>}
    </group>
  );
};

/* ---------- Penachos de las chimeneas: bolitas que el viento tira de costado (no son objeto clave) ---------- */
export const Plume: React.FC<P> = ({ t, p }) => {
  const { n = 7, len = 0.9 } = p;
  return <group>{Array.from({ length: n }, (_, i) => { const u = (t * 0.35 + i / n) % 1;
    return <Ball key={i} r={0.04 + u * 0.06} pos={[u * len, u * 0.12, -u * 0.05]} c="#f1f2f2" o={0.5 * (1 - u)} />; })}</group>;
};

/* ---------- Reloj de 6 horas (sin números): seis gajos que se vacían ----------
   p: kf [[t, gajos llenos]...]; fed (queda lleno y late); r */
export const Clock6: React.FC<P> = ({ t, p }) => {
  const { r = 0.5 } = p; const v = p.kf ? curve(p.kf, t) : 6; const low = v < 2.2 && !p.fed;
  const blink = low ? (Math.sin(t * 14) > 0 ? 1 : 0.35) : 1; const beat = p.fed ? 1 + 0.04 * Math.max(0, Math.sin(t * 4)) : 1;
  return (
    <group scale={[beat, beat, beat]}>
      <Cyl r={r * 1.08} h={0.05} rot={[PI / 2, 0, 0]} pos={[0, 0, -0.03]} seg={36} c="#1c2433" />
      <Cyl r={r * 1.12} h={0.03} rot={[PI / 2, 0, 0]} pos={[0, 0, -0.05]} seg={36} c="#c9cfd6" />
      {Array.from({ length: 6 }, (_, i) => { const fill = clamp(v - i); const th0 = PI / 2 - (i + 1) * (PI / 3) + 0.04, len = PI / 3 - 0.08;
        return <group key={i}>
          <mesh position={[0, 0, 0.001]}><ringGeometry args={[r * 0.38, r, 10, 1, th0, len]} /><meshBasicMaterial color={qc() ? '#ff00ff' : '#2c3442'} toneMapped={false} side={THREE.DoubleSide} /></mesh>
          {fill > 0 && <mesh position={[0, 0, 0.004]}><ringGeometry args={[r * 0.38, lerp(r * 0.38, r, fill), 10, 1, th0, len]} /><meshBasicMaterial color={qc() ? '#ff00ff' : (low ? '#ff5a3c' : GOLD)} transparent opacity={qc() ? 1 : blink} toneMapped={false} side={THREE.DoubleSide} /></mesh>}
        </group>; })}
      <Cyl r={r * 0.3} h={0.06} rot={[PI / 2, 0, 0]} pos={[0, 0, 0.0]} seg={24} c={p.fed ? '#3ee07a' : '#c9cfd6'} e={p.fed ? '#3ee07a' : undefined} ei={0.6} />
      {/* rayo de luz en el centro (enchufe sin texto) */}
      <group position={[0, 0, 0.04]} rotation={[0, 0, 0.35]}>
        <B s={[r * 0.07, r * 0.26, 0.01]} pos={[r * 0.02, r * 0.08, 0]} c="#1c2433" />
        <B s={[r * 0.07, r * 0.26, 0.01]} pos={[-r * 0.02, -r * 0.08, 0]} c="#1c2433" />
      </group>
    </group>
  );
};

/* ---------- Interior de una nave de cubas (plano 3) ----------
   p: corte (las luces tiemblan y se apagan), dano (las cubas se enfrían y se agrietan) */
export const PotHall: React.FC<P> = ({ t, p }) => {
  const { corte = 1, dano = 2.5, n = 6, z0 = 0.9 } = p;
  const fl = t >= corte ? (Math.sin(t * 41) > 0 ? 0.25 : 1) * (1 - clamp((t - corte - 0.6) / 0.6)) : 1;
  const cool = clamp((t - dano) / 0.7);
  const crust = (i: number) => (1 - cool) * (0.9 + 0.15 * Math.sin(t * 3 + i)) * (t >= corte ? 0.55 + 0.45 * fl : 1);
  return (
    <group>
      {/* piso y paredes oscuras de la nave */}
      <mesh rotation={[-PI / 2, 0, 0]} position={[0, 0.004, 0]}><planeGeometry args={[4.6, 9]} /><M c="#5d6166" /></mesh>
      {[-2.2, 2.2].map((x) => <mesh key={x} position={[x, 1.3, 0]}><boxGeometry args={[0.1, 2.6, 9]} /><M c="#363c44" /></mesh>)}
      <mesh position={[0, 1.3, -3.7]}><boxGeometry args={[4.6, 2.6, 0.1]} /><M c="#2c3138" /></mesh>
      {/* ventanas altas con luz de día, del lado izquierdo, bajas para no entrar en los subtítulos */}
      {Array.from({ length: 5 }, (_, i) => <mesh key={'v' + i} position={[-2.14, 1.05, -3 + i * 1.3]}><boxGeometry args={[0.02, 0.3, 0.7]} /><meshBasicMaterial color="#9fb3c4" toneMapped={false} /></mesh>)}
      <KeyCtx.Provider value={true}>
        {Array.from({ length: n }, (_, i) => { const z = z0 - i * 0.85; return <group key={i}>{[-0.72, 0.72].map((x, j) => <group key={j} position={[x, 0, z]}>
          <B s={[0.95, 0.34, 0.6]} pos={[0, 0.17, 0]} c="#4f5660" />
          <B s={[0.85, 0.02, 0.5]} pos={[0, 0.345, 0]} c={cool > 0.5 ? '#3a3f46' : '#5a2a12'} e={HOT} ei={crust(i + j)} />
          {/* grietas cuando se enfría */}
          {cool > 0 && [0, 1, 2].map((k) => <B key={k} s={[0.5 - k * 0.1, 0.004, 0.015]} pos={[-0.1 + k * 0.08, 0.358, -0.15 + k * 0.14]} rot={[0, 0.5 - k * 0.6, 0]} c="#1a1c20" o={cool} />)}
          {/* varillas de ánodo y viga */}
          {[-0.3, -0.1, 0.1, 0.3].map((ax) => <Cyl key={ax} r={0.018} h={0.3} pos={[ax, 0.5, 0]} c="#9aa0a8" />)}
          <B s={[0.9, 0.06, 0.08]} pos={[0, 0.66, 0]} c="#7a8088" />
        </group>)}</group>; })}
      </KeyCtx.Provider>
      {/* pasillo central y barras colectoras */}
      <B s={[0.3, 0.03, 8]} pos={[0, 0.015, -1.5]} c="#3d424a" />
      {[-1.28, 1.28].map((x) => <B key={x} s={[0.08, 0.1, 8]} pos={[x, 0.05, -1.5]} c="#b07a3c" />)}
      <pointLight position={[0, 0.8, 0.6]} intensity={6 * (0.25 + 0.75 * (1 - cool)) * (t >= corte ? 0.4 + 0.6 * fl : 1)} color="#ff9a4a" distance={6} />
      <hemisphereLight args={['#cfd8e0', '#3a3028', 0.45 * (t >= corte ? 0.5 + 0.5 * fl : 1)]} />
      <directionalLight position={[-3, 4, 2]} intensity={0.35} color="#dfe8f0" />
      <Shade y1={p.shadeY ?? 640} a={0.92} />
    </group>
  );
};

/* ---------- Ranking de cuatro lugares (ordinal, sin cifras): puntitos 1 a 4, el cuarto lleva la fábrica ---------- */
export const Podium: React.FC<P> = ({ t, p }) => {
  const xs = [-1.2, -0.4, 0.4, 1.2]; const hl = p.hl !== undefined ? clamp((t - p.hl) / 0.3) : 0;
  return (
    <group>
      {xs.map((x, i) => { const at = (p.at ?? 0) + i * 0.18; if (t < at) return null; const k = eo((t - at) / 0.3);
        const isF = i === 3; const col = isF && hl > 0.5 ? GOLD : '#6f7c8c';
        return <group key={i} position={[x, 0, 0]} scale={[1, Math.max(0.01, k), 1]}>
          <B s={[0.62, 0.32, 0.62]} pos={[0, 0.16, 0]} c={col} e={isF && hl > 0 ? GOLD : undefined} ei={0.35 * hl} />
          {Array.from({ length: i + 1 }, (_, j) => <B key={j} s={[0.07, 0.07, 0.01]} pos={[(j - i / 2) * 0.11, 0.16, 0.316]} c="#1c2433" />)}
          {!isF && <group position={[0, 0.32, 0]}>{[[-0.15, -0.1, 0.32], [0.02, 0.08, 0.48], [0.16, -0.05, 0.26], [-0.05, -0.15, 0.2]].map(([bx, bz, bh], j) =>
            <B key={j} s={[0.13, bh, 0.13]} pos={[bx, bh / 2, bz]} c={['#8f99a6', '#a3adb8', '#7c8794', '#b4bdc6'][j]} />)}</group>}
        </group>; })}
    </group>
  );
};

/* ---------- Obelisco (67,5 m) y columna de 2,7 Obeliscos ----------
   p: h (altura de un Obelisco), n (2,7), grow (aparecen en orden desde `at`) */
const Obel: React.FC<{ h: number; frac?: number }> = ({ h, frac = 1 }) => {
  const shaft = h * 0.94, top = h - shaft; const b0 = h * 0.1, b1 = h * 0.06;
  const hs = Math.min(shaft, frac * h); const bt = lerp(b0, b1, hs / shaft);
  return <group>
    <mesh position={[0, hs / 2, 0]} rotation={[0, PI / 4, 0]}><cylinderGeometry args={[bt / Math.SQRT2, b0 / Math.SQRT2, hs, 4]} /><Mat c="#f2efe8" /></mesh>
    {frac >= 1 && <mesh position={[0, shaft + top / 2, 0]} rotation={[0, PI / 4, 0]}><coneGeometry args={[b1 / Math.SQRT2, top, 4]} /><Mat c="#f2efe8" /></mesh>}
    {/* ventanita de la punta */}
    {frac >= 1 && <B s={[b1 * 0.3, b1 * 0.45, 0.004]} pos={[0, shaft - b1 * 0.6, b1 / 2 + 0.003]} c="#2c3442" />}
  </group>;
};
export const ObelStack: React.FC<P> = ({ t, p }) => {
  const { h = 0.889, n = 2.7, at = 0, dt = 0.35 } = p; const full = Math.floor(n); const rest = n - full;
  return <group>{Array.from({ length: full + (rest > 0 ? 1 : 0) }, (_, i) => { const st = at + i * dt; if (t < st) return null; const k = eo((t - st) / 0.3);
    return <group key={i} position={[0, i * h + (1 - k) * 0.4, 0]}><Obel h={h} frac={i < full ? 1 : rest} /></group>; })}</group>;
};

/* ---------- Cota de altura: barra dorada que sube hasta `H` con marcas ---------- */
export const Gauge: React.FC<P> = ({ t, p }) => {
  const { H = 2.4, at = 0, dur = 1.6, w = 0.6 } = p; const k = eo((t - at) / dur); const h = Math.max(0.001, H * k);
  return <group>
    <B s={[0.03, h, 0.03]} pos={[0, h / 2, 0]} c={GOLD} e={GOLD} ei={0.7} />
    <B s={[0.16, 0.025, 0.03]} pos={[0, 0.012, 0]} c={GOLD} e={GOLD} ei={0.7} />
    {k > 0.02 && <B s={[w, 0.022, 0.02]} pos={[-w / 2 + 0.08, h, 0]} c={GOLD} e={GOLD} ei={0.9} />}
  </group>;
};

/* ---------- Línea eléctrica: torres + tres conductores con comba + pulsos de energía ----------
   p: pts [[x,z]...], h (altura de la torre), pulse (desde cuándo viaja la energía), grow (las torres aparecen en orden desde `at`) */
const Pylon: React.FC<{ h: number; ang: number }> = ({ h, ang }) => (
  <group rotation={[0, ang, 0]}>
    <mesh position={[0, h * 0.45, 0]} rotation={[0, PI / 4, 0]}><cylinderGeometry args={[0.012, 0.06, h * 0.9, 4, 1, true]} /><Mat c="#59606a" /></mesh>
    {[-1, 1].map((s) => rodBetween([s * 0.042, 0.0, 0], [s * 0.012, h * 0.9, 0], 0.006, '#59606a', 'l' + s))}
    <B s={[0.012, 0.012, 0.36]} pos={[0, h * 0.82, 0]} c="#59606a" />
    <B s={[0.012, 0.012, 0.26]} pos={[0, h * 0.95, 0]} c="#59606a" />
    {[-0.17, 0.17].map((z) => <B key={z} s={[0.01, 0.04, 0.01]} pos={[0, h * 0.8, z]} c="#cfd8e0" />)}
    <B s={[0.01, 0.04, 0.01]} pos={[0, h * 0.93, 0.12]} c="#cfd8e0" />
    <Cyl r={0.02} h={h * 0.14} pos={[0, h * 0.95 + h * 0.07, 0]} c="#59606a" />
  </group>
);
export const Line: React.FC<P> = ({ t, p }) => {
  const { pts = [], h = 0.6, pulse, at, dt = 0.18, sag = 0.06 } = p as { pts: [number, number][]; h: number; pulse?: number; at?: number; dt: number; sag: number };
  const n = pts.length;
  // la cruceta (eje z local) queda perpendicular a la línea: (sin a, cos a) · (dx, dz) = 0
  const ang = (i: number) => { const a = pts[Math.max(0, i - 1)], b = pts[Math.min(n - 1, i + 1)]; return Math.atan2(-(b[1] - a[1]), b[0] - a[0]); };
  const shown = (i: number) => at === undefined || t >= at + i * dt;
  const att = (i: number, k: number): V3 => { const a = ang(i); const [off, y] = [[-0.17, h * 0.8 - 0.04], [0.17, h * 0.8 - 0.04], [0.12, h * 0.93 - 0.04]][k];
    return [pts[i][0] + off * Math.sin(a), y, pts[i][1] + off * Math.cos(a)]; };
  const wire = (a: V3, b: V3, key: string, c = '#2b3038') => { const segs = 6; const out: JSX.Element[] = [];
    for (let s = 0; s < segs; s++) { const u0 = s / segs, u1 = (s + 1) / segs; const pnt = (u: number): V3 => [lerp(a[0], b[0], u), lerp(a[1], b[1], u) - sag * 4 * u * (1 - u), lerp(a[2], b[2], u)];
      out.push(rodBetween(pnt(u0), pnt(u1), 0.005, c, key + s)); } return out; };
  const L = pts.slice(1).reduce((s, q, i) => s + Math.hypot(q[0] - pts[i][0], q[1] - pts[i][1]), 0);
  const at2 = (d: number): V3 => { let acc = 0; for (let i = 1; i < n; i++) { const l = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); if (acc + l >= d) { const u = (d - acc) / l; const a = att(i - 1, 2), b = att(i, 2);
    return [lerp(a[0], b[0], u), lerp(a[1], b[1], u) - sag * 4 * u * (1 - u), lerp(a[2], b[2], u)]; } acc += l; } return att(n - 1, 2); };
  return (
    <group>
      {pts.map((q, i) => shown(i) && <group key={i} position={[q[0], 0, q[1]]} scale={[1, at === undefined ? 1 : Math.max(0.01, eo((t - at - i * dt) / 0.3)), 1]}><Pylon h={h} ang={ang(i)} /></group>)}
      {pts.slice(1).map((_, i) => shown(i + 1) && t >= (at ?? -9) + (i + 1) * dt + 0.25 && [0, 1, 2].map((k) => wire(att(i, k), att(i + 1, k), `w${i}-${k}`)))}
      {pulse !== undefined && t >= pulse && Array.from({ length: 6 }, (_, j) => { const d = ((t - pulse) * 1.6 + (j / 6) * L) % L; if ((t - pulse) * 1.6 < (j / 6) * L) return null;
        return <Ball key={'pu' + j} r={0.04} pos={at2(d)} c={WIND} e={WIND} ei={1.4} />; })}
    </group>
  );
};

/* ---------- Casas (hogares): se encienden en barrido ---------- */
export const Homes: React.FC<P> = ({ t, p }) => {
  const { nx = 8, nz = 5, gap = 0.34, at = 0, dur = 2 } = p;
  const r = React.useMemo(() => rnd(p.seed ?? 5), [p.seed]); const cols = React.useMemo(() => Array.from({ length: nx * nz }, () => ['#d9c7a3', '#c9a37a', '#b9c2c9', '#e2d3b6', '#a7b8a0'][Math.floor(r() * 5)]), [nx, nz]);
  return <group>{Array.from({ length: nx * nz }, (_, i) => { const ix = i % nx, iz = Math.floor(i / nx); const x = (ix - (nx - 1) / 2) * gap + (iz % 2) * gap * 0.3, z = (iz - (nz - 1) / 2) * gap;
    const on = clamp((t - at - ((ix + iz * 0.6) / (nx + nz * 0.6)) * dur) / 0.2);
    return <group key={i} position={[x, 0, z]}>
      <B s={[0.2, 0.14, 0.18]} pos={[0, 0.07, 0]} c={cols[i]} />
      <mesh position={[0, 0.18, 0]} rotation={[0, PI / 4, 0]}><coneGeometry args={[0.16, 0.09, 4]} /><Mat c="#8a4a3a" /></mesh>
      <B s={[0.06, 0.05, 0.005]} pos={[-0.045, 0.08, 0.092]} c="#3a3a3a" e="#ffd36a" ei={on * 1.2} />
      <B s={[0.06, 0.05, 0.005]} pos={[0.05, 0.08, 0.092]} c="#3a3a3a" e="#ffd36a" ei={on * 1.2} />
    </group>; })}</group>;
};

/* ---------- Torta de consumo: viento (kf de fracción) + resto (gris o gas/hidro) ----------
   p: wind [[t, frac]...], split (desde cuándo el resto se separa en gas 31 % e hidro 36 %), r */
export const Pie: React.FC<P> = ({ t, p }) => {
  const { r = 1.0, h = 0.14 } = p; const w = p.wind ? curve(p.wind, t) : 0.33; const sp = p.split !== undefined ? eo((t - p.split) / 0.6) : 0;
  const gasF = 0.31, hyF = 0.36; const rest = 1 - w;
  const sector = (a0: number, len: number, c: string, lift: number, key: string, e?: string) => len <= 0.002 ? null :
    <mesh key={key} position={[Math.sin(a0 + len / 2) * lift, h / 2, Math.cos(a0 + len / 2) * lift]}><cylinderGeometry args={[r, r, h, Math.max(3, Math.ceil(len * 12)), 1, false, a0, len]} /><Mat c={c} e={e} ei={0.35} /></mesh>;
  const W0 = 0, WL = w * 2 * PI; const R0 = WL;
  return <group>
    {sector(W0, WL, WIND, 0.08, 'w', WIND)}
    {sp <= 0 && sector(R0, rest * 2 * PI, '#8f979f', 0, 'r')}
    {sp > 0 && sector(R0, gasF / (gasF + hyF) * rest * 2 * PI, GAS, 0.05 * sp, 'g', GAS)}
    {sp > 0 && sector(R0 + gasF / (gasF + hyF) * rest * 2 * PI, hyF / (gasF + hyF) * rest * 2 * PI, HYDRO, 0.05 * sp, 'h', HYDRO)}
    {/* molinito sobre la porción de viento */}
    <group position={[Math.sin(WL / 2) * r * 0.55 + Math.sin(WL / 2) * 0.08, h, Math.cos(WL / 2) * r * 0.55 + Math.cos(WL / 2) * 0.08]}><Turbine t={t} tt={0} p={{ H: 0.42, spin: 2 }} /></group>
  </group>;
};

/* ---------- Central de gas y represa (plano 12) ---------- */
export const GasPlant: React.FC<P> = ({ t }) => (
  <group>
    <B s={[0.5, 0.26, 0.34]} pos={[0, 0.13, 0]} c="#a7adb4" />
    <B s={[0.52, 0.04, 0.36]} pos={[0, 0.28, 0]} c={ROOF} />
    {[-0.12, 0.12].map((x) => <Cyl key={x} r={0.035} h={0.46} pos={[x, 0.36, -0.08]} c="#cfd3d8" />)}
    {[0, 1].map((i) => <Ball key={i} r={0.03 + 0.01 * Math.sin(t * 9 + i)} pos={[-0.12 + i * 0.24, 0.62, -0.08]} c={GAS} e={GAS} ei={1.5} />)}
    <Cyl r={0.04} h={0.3} rot={[0, 0, PI / 2]} pos={[-0.38, 0.04, 0.1]} c="#e0b04a" />
  </group>
);
export const Dam: React.FC<P> = ({ t }) => (
  <group>
    <B s={[0.9, 0.12, 0.3]} pos={[0, 0.3, -0.22]} c={HYDRO} e={HYDRO} ei={0.25} />
    <B s={[0.95, 0.44, 0.14]} pos={[0, 0.22, 0]} c="#bdbab2" />
    <B s={[0.16, 0.36, 0.02]} pos={[0, 0.2, 0.08]} c="#8fc3ff" e="#8fc3ff" ei={0.3 + 0.2 * Math.sin(t * 6)} />
  </group>
);
/** cable que lleva energía de `a` a `b` (con comba) y pulsos de color */
export const Cable: React.FC<P> = ({ t, p }) => {
  const { a = [0, 0, 0], b = [1, 0, 0], c = WIND, sag = 0.12, on = 0 } = p as { a: V3; b: V3; c: string; sag: number; on: number };
  const pt = (u: number): V3 => [lerp(a[0], b[0], u), lerp(a[1], b[1], u) - sag * 4 * u * (1 - u), lerp(a[2], b[2], u)];
  const grow = eo((t - on) / 0.5); const segs = 10;
  return <group>
    {Array.from({ length: segs }, (_, s) => s / segs < grow ? rodBetween(pt(s / segs), pt(Math.min(grow, (s + 1) / segs)), 0.012, c, 's' + s, c, 0.5) : null)}
    {grow >= 1 && Array.from({ length: 4 }, (_, j) => <Ball key={j} r={0.035} pos={pt(((t - on) * 0.7 + j / 4) % 1)} c="#ffffff" e={c} ei={1.6} />)}
  </group>;
};

/* ---------- Envoltorio: anima posición/escala de cualquier prop propio (p.go = {at, dur, pos, s}) ---------- */
const withGo = (C: React.FC<P>, key = true): React.FC<P> => (props) => {
  const g = props.p.go; let inner = <C {...props} />;
  if (g) { const k = eio((props.t - g.at) / (g.dur ?? 0.8)); const s = lerp(1, g.s ?? 1, k); const pp = g.pos ?? [0, 0, 0];
    inner = <group position={[pp[0] * k, pp[1] * k, pp[2] * k]} scale={[s, s, s]}>{inner}</group>; }
  return key ? <KeyCtx.Provider value={true}>{inner}</KeyCtx.Provider> : inner;
};

export const EXTRA = {
  world: World, pothall: PotHall, plume: Plume,
  turbine: withGo(Turbine), park: withGo(Park), smelter: withGo(Smelter), clock6: withGo(Clock6), podium: withGo(Podium), obel: withGo(ObelStack),
  gauge: withGo(Gauge), line: withGo(Line), homes: withGo(Homes), pie: withGo(Pie), gasplant: withGo(GasPlant), dam: withGo(Dam), cable: withGo(Cable),
};
