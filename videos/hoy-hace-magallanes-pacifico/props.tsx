import React from 'react';
import * as THREE from 'three';
import { M, useTex } from '../../src/kit/Props';
import { clamp, eio, eo, lerp, rnd } from '../../src/kit/math';

// Look propio de este video (distinto del living verde, el estadio de noche y el muelle): diorama marino.
//  - 'cold': mar austral frío, gris pizarra, con un estrecho de acantilados grises (planos 4 a 9).
//  - 'gold': océano calmo, dorado en el horizonte, cielo casi negro arriba (ahí van los subtítulos).
// El fondo es un telón pintado detrás del set 'room' (lo tapa entero); el mar es una malla facetada que se mueve como
// función pura de t. Carabelas genéricas de madera, sin escudos ni banderas. Muñecos sin rasgos (sin ojos).
// Sin carteles 3D con texto: todos los textos van en placas 2D del kit.
type P = { t: number; tt: number; p: any };
type V3 = [number, number, number];
const PI = Math.PI;

const B: React.FC<{ s: V3; pos?: V3; rot?: V3; c: string; e?: string; ei?: number; o?: number }> = ({ s, pos, rot, c, e, ei, o }) => (
  <mesh position={pos} rotation={rot}><boxGeometry args={s} /><M c={c} e={e} ei={ei} o={o} /></mesh>
);
const Cyl: React.FC<{ r: number; r2?: number; h: number; pos?: V3; rot?: V3; seg?: number; c: string; e?: string; ei?: number }> = ({ r, r2, h, pos, rot, seg = 8, c, e, ei }) => (
  <mesh position={pos} rotation={rot}><cylinderGeometry args={[r2 ?? r, r, h, seg]} /><M c={c} e={e} ei={ei} /></mesh>
);
const Flat: React.FC<{ s: [number, number]; pos?: V3; rot?: V3; c: string; o?: number; add?: boolean }> = ({ s, pos, rot, c, o, add }) => (
  <mesh position={pos} rotation={rot}><planeGeometry args={s} />
    <meshBasicMaterial color={c} toneMapped={false} transparent={o !== undefined} opacity={o ?? 1} depthWrite={!add} blending={add ? THREE.AdditiveBlending : THREE.NormalBlending} /></mesh>
);
/** curva por tramos [[t, v], ...] con easing: continua, sin saltos */
export const curve = (kf: [number, number][], t: number) => {
  if (!kf.length) return 0; if (t <= kf[0][0]) return kf[0][1];
  for (let i = 1; i < kf.length; i++) if (t < kf[i][0]) { const [t0, v0] = kf[i - 1], [t1, v1] = kf[i]; return lerp(v0, v1, eio((t - t0) / (t1 - t0))); }
  return kf[kf.length - 1][1];
};

export const WOOD = '#7a5233', WOOD2 = '#5e3d25', WOOD3 = '#93673f', SAIL = '#b3a68a', SAIL2 = '#9e9177', ROPE = '#3b2a1c', LEATHER = '#6e4326';
export const MAST = '#3a2618';
export const ROCK = ['#4d545b', '#5a6168', '#434a51', '#636a71'];

const KIND: Record<string, { sky: [number, string][]; fog: string; sea: string; amp: number; hemi: [string, string, number]; dir: string; dirI: number }> = {
  cold: { sky: [[0, '#6f7c88'], [0.05, '#56636f'], [0.14, '#2c353f'], [0.26, '#141a21'], [1, '#0a0e13']], fog: '#5f6c78', sea: '#2e4150', amp: 0.05,
    hemi: ['#b9c8d6', '#1d2a33', 0.75], dir: '#d6e2ee', dirI: 0.7 },
  gold: { sky: [[0, '#e8ad5c'], [0.04, '#c98a45'], [0.12, '#5e3d2e'], [0.24, '#1b1420'], [1, '#0b0910']], fog: '#c49052', sea: '#5b4a3a', amp: 0.012,
    hemi: ['#ffe0b0', '#2a1d18', 0.6], dir: '#ffd29a', dirI: 0.8 },
  dusk: { sky: [[0, '#b9864f'], [0.05, '#8a6446'], [0.13, '#3a2d30'], [0.25, '#15121a'], [1, '#09080d']], fog: '#9c7550', sea: '#4a4140', amp: 0.025,
    hemi: ['#f1d2ae', '#221a18', 0.6], dir: '#ffd8a8', dirI: 0.7 },
};

/** Telón del fondo + mar facetado + luces + niebla. Tapa el set 'room'. */
export const World: React.FC<P> = ({ t, p }) => {
  const kind = p.kind ?? 'gold'; const K0 = KIND[kind]; const K = p.dark ? { ...K0, sky: [[0, p.dark], [1, p.dark]] as [number, string][], fog: p.dark } : K0; const amp = p.amp ?? K.amp; const sea = p.sea ?? K.sea;
  const sky = useTex((g, W, H) => {
    const gr = g.createLinearGradient(0, H, 0, 0); for (const [f, c] of K.sky) gr.addColorStop(f, c);
    g.fillStyle = gr; g.fillRect(0, 0, W, H);
    if (kind === 'cold' && !p.dark) { // nubes bajas, oscuras, solo cerca del horizonte
      const r = rnd(7); for (let i = 0; i < 14; i++) { g.fillStyle = `rgba(30,38,46,${0.35 + r() * 0.3})`; const y = H * (0.86 + r() * 0.1); g.fillRect(r() * W - 60, y, 120 + r() * 220, 10 + r() * 14); }
    }
  }, 256, 1024, 'magsky' + kind + (p.dark ?? ''));
  const glint = useTex((g, W, H) => {
    g.clearRect(0, 0, W, H); const gx = g.createLinearGradient(0, 0, W, 0); gx.addColorStop(0, 'rgba(255,255,255,0)'); gx.addColorStop(0.5, 'rgba(255,255,255,1)'); gx.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = gx; g.fillRect(0, 0, W, H); g.globalCompositeOperation = 'destination-in';
    const gy = g.createLinearGradient(0, 0, 0, H); gy.addColorStop(0, 'rgba(0,0,0,1)'); gy.addColorStop(0.7, 'rgba(0,0,0,.5)'); gy.addColorStop(1, 'rgba(0,0,0,0)'); g.fillStyle = gy; g.fillRect(0, 0, W, H);
    g.globalCompositeOperation = 'destination-out'; g.fillStyle = 'rgba(0,0,0,.6)'; for (let y = 6; y < H; y += 14) g.fillRect(0, y, W, 5);
  }, 128, 256, 'magglint');
  const geo = React.useMemo(() => new THREE.PlaneGeometry(9.6, 12.5, 40, 52), []);
  const pos = geo.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i), z = -pos.getY(i);
    const h = 0.02 + amp * (2.2 + Math.sin(x * 2.1 + t * 1.3) + 0.8 * Math.sin(z * 1.7 - t * 1.05 + x * 0.6) + 0.35 * Math.sin((x + z) * 3.3 + t * 2.0));
    pos.setZ(i, h);
  }
  pos.needsUpdate = true;
  return (
    <group>
      <fog attach="fog" args={[K.fog, p.fogNear ?? 7, p.fogFar ?? 21]} />
      {/* telón: arranca justo en el borde lejano del mar (y = 0), así no hay costura */}
      <mesh position={[0, 6, -3.76]}><planeGeometry args={[9.6, 12]} /><meshBasicMaterial map={sky} toneMapped={false} fog={false} /></mesh>
      <mesh rotation={[-PI / 2, 0, 0]} position={[0, 0, 2.49]} geometry={geo}><M c={sea} /></mesh>
      {p.glint && <mesh rotation={[-PI / 2, 0, 0]} position={[p.glintX ?? 0, 0.12, -0.6]}><planeGeometry args={[p.glint, 6.4]} />
        <meshBasicMaterial map={glint} color="#ffcf86" toneMapped={false} transparent opacity={0.22 + 0.04 * Math.sin(t * 2.3)} depthWrite={false} blending={THREE.AdditiveBlending} /></mesh>}
      <hemisphereLight args={K.hemi} />
      <directionalLight position={[-4, 5, -6]} intensity={K.dirI} color={K.dir} />
    </group>
  );
};

/* ---------- Carabela genérica (proa hacia +x local) ---------- */
const hullShape = (() => {
  const s = new THREE.Shape();
  s.moveTo(-0.62, 0.05); s.lineTo(0.45, 0.0); s.lineTo(0.72, 0.3); s.lineTo(0.8, 0.46); s.lineTo(0.62, 0.44); s.lineTo(0.38, 0.36);
  s.lineTo(-0.3, 0.36); s.lineTo(-0.42, 0.5); s.lineTo(-0.7, 0.54); s.lineTo(-0.72, 0.22); s.closePath(); return s;
})();
const Sail: React.FC<{ w: number; h: number; pos: V3; c: string; t: number; ph: number }> = ({ w, h, pos, c, t, ph }) => {
  const bl = 0.035 + 0.01 * Math.sin(t * 1.7 + ph);
  return (
    <group position={pos}>
      <B s={[0.02, h, w * 2]} pos={[0.03, 0, 0]} c={c} />
      <B s={[0.02, h * 0.8, w * 1.4]} pos={[0.03 + bl, 0, 0]} c={c} />
    </group>
  );
};
export const Ship: React.FC<P> = ({ t, p }) => {
  const { ph = 0, sail = SAIL, hull = WOOD, cargo = 0, lantern, still = false, furl = 0 } = p;
  const bob = still ? 0 : Math.sin(t * 1.5 + ph) * 0.018; const roll = still ? 0 : Math.sin(t * 1.15 + ph) * 0.028; const pitch = still ? 0 : Math.sin(t * 0.9 + ph * 1.3) * 0.015;
  const sails = 1 - furl;
  return (
    <group position={[0, bob - 0.1, 0]} rotation={[roll, 0, pitch]}>
      <mesh position={[0, 0, -0.21]}><extrudeGeometry args={[hullShape, { depth: 0.42, bevelEnabled: false }]} /><M c={hull} /></mesh>
      {/* franja oscura en el casco y cubierta */}
      <B s={[1.36, 0.05, 0.43]} pos={[0.02, 0.22, 0]} c={WOOD2} />
      <B s={[0.7, 0.02, 0.36]} pos={[0.04, 0.365, 0]} c={WOOD3} />
      <B s={[0.3, 0.12, 0.4]} pos={[-0.56, 0.6, 0]} c={WOOD2} />
      {/* mástiles */}
      <Cyl r={0.022} h={1.35} pos={[0.32, 1.02, 0]} c={MAST} />
      <Cyl r={0.026} h={1.6} pos={[-0.02, 1.15, 0]} c={MAST} />
      <Cyl r={0.018} h={0.95} pos={[-0.4, 0.95, 0]} c={MAST} />
      <Cyl r={0.016} h={0.5} pos={[0.92, 0.5, 0]} rot={[0, 0, -1.15]} c={WOOD2} />
      {/* vergas */}
      {[[0.32, 1.2, 0.5], [0.32, 1.56, 0.38], [-0.02, 1.3, 0.6], [-0.02, 1.74, 0.44]].map(([x, y, w], i) => <B key={i} s={[0.03, 0.03, w + 0.06]} pos={[x, y, 0]} c={MAST} />)}
      {sails > 0.5 && <group>
        <Sail w={0.27} h={0.4} pos={[0.31, 0.98, 0]} c={sail} t={t} ph={ph} />
        <Sail w={0.2} h={0.3} pos={[0.31, 1.4, 0]} c={sail} t={t} ph={ph + 1} />
        <Sail w={0.32} h={0.46} pos={[-0.03, 1.05, 0]} c={sail} t={t} ph={ph + 2} />
        <Sail w={0.23} h={0.36} pos={[-0.03, 1.55, 0]} c={sail} t={t} ph={ph + 3} />
        {/* vela latina (triángulo) */}
        <mesh position={[-0.42, 0.95, 0]} rotation={[0, 0, 0]}>
          <bufferGeometry><bufferAttribute attach="attributes-position" args={[new Float32Array([0.06, 0.38, 0, -0.32, 0.62, 0, -0.18, 0.02, 0, 0.06, 0.38, 0, -0.18, 0.02, 0, 0.12, 0.05, 0]), 3]} /></bufferGeometry>
          <meshStandardMaterial color={SAIL2} flatShading side={THREE.DoubleSide} roughness={0.9} />
        </mesh>
      </group>}
      {/* carga: barriles en cubierta (la nave mejor provista) */}
      {Array.from({ length: cargo }, (_, i) => <Cyl key={i} r={0.055} r2={0.05} h={0.12} pos={[0.16 - (i % 4) * 0.12, 0.43, (Math.floor(i / 4) - 0.5) * 0.14]} c="#8a5a30" />)}
      {lantern && <group position={[-0.74, 0.66, 0]}><B s={[0.06, 0.08, 0.06]} c={lantern} e={lantern} ei={1.6} /></group>}
    </group>
  );
};

/** La San Antonio da media vuelta (de mirar a -z a mirar a +z) y después se aleja `d` (desplazamiento relativo). */
export const ShipTurn: React.FC<P> = ({ t, tt, p }) => {
  const { at = 0, dur = 1.3, go = 2, d = [0, 0, 3], gdur = 2.2 } = p;
  const k = eio((t - at) / dur); const ry = lerp(PI / 2, -PI / 2, k); const g = eio((t - go) / gdur);
  return <group position={[d[0] * g, 0, d[2] * g]} rotation={[0, ry, 0]}><Ship t={t} tt={tt} p={p} /></group>;
};

/* ---------- Acantilados grises: una costa de rocas facetadas a lo largo de z ---------- */
export const Cliffs: React.FC<P> = ({ p }) => {
  const { z0 = -3.6, z1 = 3, h = 1.8, side = 1, seed = 3, w = 1.4, n = 14, hk } = p;
  const rocks = React.useMemo(() => {
    const r = rnd(seed); return Array.from({ length: n }, (_, i) => {
      const k = i / Math.max(1, n - 1); const z = lerp(z0, z1, k) + (r() - 0.5) * 0.3;
      const hh = (hk ? hk(k) : h) * (0.75 + r() * 0.35);
      return { z, x: side * (w * 0.5 + r() * 0.25), hh, sx: w * (0.55 + r() * 0.35), sz: 0.7 + r() * 0.5, ry: r() * PI, c: ROCK[Math.floor(r() * ROCK.length)], d: Math.floor(r() * 2) };
    });
  }, [z0, z1, h, side, seed, w, n]);
  return (
    <group>
      {rocks.map((q, i) => (
        <mesh key={i} position={[q.x, q.hh * 0.42, q.z]} rotation={[0, q.ry, 0]} scale={[q.sx, q.hh, q.sz]}>
          <dodecahedronGeometry args={[0.62, 0]} /><M c={q.c} />
        </mesh>))}
      {/* base continua para que no se vea el agua entre las rocas */}
      <B s={[w * 1.1, 0.5, Math.abs(z1 - z0) + 0.4]} pos={[side * (w * 0.62), 0.12, (z0 + z1) / 2]} c="#3b4148" />
    </group>
  );
};

/* ---------- Muñeco sin rasgos (copia del kit sin los ojos) + pose 'chew' (mastica una tira de cuero) ---------- */
type Pose = { aL: V3; aR: V3; head: number; y0: number; strip: number };
const poseOf = (pose: string, t: number, phase: number): Pose => {
  const w = Math.sin((t + phase) * 9); const sway = Math.sin((t + phase) * 2.2); const ch = Math.sin((t + phase) * 7);
  let aL: V3 = [0, 0, -0.1 - sway * 0.03], aR: V3 = [0, 0, 0.1 + sway * 0.03]; let head = 0, y0 = sway * 0.012, strip = 0;
  if (pose === 'point') aR = [-1.45 + sway * 0.04, 0, 0.15];
  if (pose === 'cheer') { aL = [0, 0, -2.6 - w * 0.1]; aR = [0, 0, 2.6 + w * 0.1]; y0 = Math.abs(Math.sin((t + phase) * 6)) * 0.05; }
  if (pose === 'face') { aL = [-2.25 + sway * 0.03, 0, -0.42]; aR = [-2.25 - sway * 0.03, 0, 0.42]; head = 0.25 + 0.04 * Math.sin((t + phase) * 5); }
  if (pose === 'hold') { aL = [-1.0, 0, -0.25]; aR = [-1.0, 0, 0.25]; }
  if (pose === 'sad') { aL = [0.1, 0, -0.05]; aR = [0.1, 0, 0.05]; head = 0.3; }
  if (pose === 'chew') { aR = [-2.2 + ch * 0.06, 0, -0.5]; head = 0.08 + ch * 0.05; strip = 1; }
  return { aL, aR, head, y0, strip };
};
const mixV = (a: V3, b: V3, k: number): V3 => [lerp(a[0], b[0], k), lerp(a[1], b[1], k), lerp(a[2], b[2], k)];
/** Muñeco sin rasgos (copia del kit sin los ojos). `seq` = [[t, pose], ...]: cambia de pose con transición de 0,3 s (sin saltos). */
export const Faceless: React.FC<P> = ({ t, p }) => {
  const { shirt = '#6c5a48', pants = '#3a3228', skin = '#e0b48c', hair = '#3a2a1a', pose = 'idle', cap, phase = 0 } = p;
  const seq: [number, string][] = p.seq ?? [[0, pose]];
  let i = 0; for (let j = 0; j < seq.length; j++) if (t >= seq[j][0]) i = j;
  let q = poseOf(seq[i][1], t, phase);
  if (i > 0) { const k = eio((t - seq[i][0]) / 0.3); if (k < 1) { const a = poseOf(seq[i - 1][1], t, phase);
    q = { aL: mixV(a.aL, q.aL, k), aR: mixV(a.aR, q.aR, k), head: lerp(a.head, q.head, k), y0: lerp(a.y0, q.y0, k), strip: lerp(a.strip, q.strip, k) }; } }
  const sway = Math.sin((t + phase) * 2.2);
  return (
    <group position={[0, q.y0, 0]}>
      {[-1, 1].map((sd) => (
        <group key={sd} position={[0.12 * sd, 0.7, 0]}>
          <B s={[0.17, 0.7, 0.19]} pos={[0, -0.35, 0]} c={pants} />
          <B s={[0.18, 0.09, 0.26]} pos={[0, -0.68, 0.04]} c="#1a1410" />
        </group>
      ))}
      <group rotation={[0, 0, sway * 0.015]} position={[0, 0.7, 0]}>
        <B s={[0.52, 0.62, 0.29]} pos={[0, 0.32, 0]} c={shirt} />
        <group position={[-0.33, 0.58, 0]} rotation={q.aL}><B s={[0.13, 0.5, 0.14]} pos={[0, -0.22, 0]} c={shirt} /><B s={[0.12, 0.12, 0.13]} pos={[0, -0.52, 0]} c={skin} /></group>
        <group position={[0.33, 0.58, 0]} rotation={q.aR}><B s={[0.13, 0.5, 0.14]} pos={[0, -0.22, 0]} c={shirt} /><B s={[0.12, 0.12, 0.13]} pos={[0, -0.52, 0]} c={skin} />
          {q.strip > 0.05 && <group scale={[1, q.strip, 1]} position={[-0.02, -0.56, -0.02]}><B s={[0.07, 0.3, 0.035]} pos={[0, 0.0, 0.1]} rot={[-1.0, 0, 0]} c={LEATHER} /></group>}
        </group>
        <group position={[0, 0.84, 0]} rotation={[q.head, sway * 0.05, 0]}>
          <B s={[0.37, 0.36, 0.34]} c={skin} />
          <B s={[0.39, 0.13, 0.36]} pos={[0, 0.2, -0.005]} c={cap ?? hair} />
          {cap && <B s={[0.39, 0.04, 0.2]} pos={[0, 0.15, 0.24]} c={cap} />}
        </group>
      </group>
    </group>
  );
};

/* ---------- Mapa esquemático del estrecho (visto desde arriba) ---------- */
const N_BANK: [number, number][] = [[1.7, -0.25], [1.25, -0.22], [1.0, -0.08], [0.85, -0.5], [0.72, -0.12], [0.45, -0.05], [0.25, -0.35], [0.1, -0.42], [-0.05, -0.38], [-0.15, -0.62], [-0.3, -0.42], [-0.55, -0.55], [-0.8, -0.72], [-0.95, -1.05], [-1.1, -0.82], [-1.35, -0.95], [-1.7, -1.05]];
const S_BANK: [number, number][] = [[1.7, 0.2], [1.2, 0.16], [0.95, 0.12], [0.8, 0.12], [0.65, 0.5], [0.55, 0.14], [0.3, 0.12], [0.12, -0.1], [-0.05, -0.08], [-0.2, 0.25], [-0.32, -0.12], [-0.6, -0.26], [-0.78, -0.42], [-0.95, -0.4], [-1.05, 0.05], [-1.2, -0.52], [-1.7, -0.62]];
export const ROUTE: [number, number][] = [[1.65, -0.02], [1.2, -0.03], [0.9, 0.02], [0.6, 0.04], [0.35, -0.12], [0.05, -0.25], [-0.25, -0.27], [-0.55, -0.4], [-0.85, -0.58], [-1.2, -0.72], [-1.65, -0.82]];
const landGeo = (bank: [number, number][], north: boolean) => {
  const s = new THREE.Shape(); const edge = north ? -1.35 : 1.35;
  s.moveTo(bank[0][0], -bank[0][1]); for (const [x, z] of bank) s.lineTo(x, -z); s.lineTo(bank[bank.length - 1][0], -edge); s.lineTo(bank[0][0], -edge); s.closePath();
  const g = new THREE.ExtrudeGeometry(s, { depth: 0.14, bevelEnabled: false }); g.rotateX(-PI / 2); return g;
};
const routeAt = (k: number): [number, number] => {
  const seg = ROUTE.length - 1; const f = clamp(k) * seg; const i = Math.min(seg - 1, Math.floor(f)); const u = f - i;
  return [lerp(ROUTE[i][0], ROUTE[i + 1][0], u), lerp(ROUTE[i][1], ROUTE[i + 1][1], u)];
};
export const StraitMap: React.FC<P> = ({ t, p }) => {
  const { at = 0, dur = 3 } = p; const k = eio((t - at) / dur);
  const gN = React.useMemo(() => landGeo(N_BANK, true), []); const gS = React.useMemo(() => landGeo(S_BANK, false), []);
  const dots = 34; const shipP = routeAt(k);
  return (
    <group>
      <B s={[3.5, 0.06, 2.8]} pos={[0, -0.03, 0]} c="#23394a" />
      <mesh geometry={gN}><M c="#596258" /></mesh>
      <mesh geometry={gS}><M c="#4f574f" /></mesh>
      {Array.from({ length: dots }, (_, i) => { const u = i / (dots - 1); if (u > k) return null; const [x, z] = routeAt(u);
        return <B key={i} s={[0.05, 0.02, 0.05]} pos={[x, 0.03, z]} c="#f0d48a" e="#f0d48a" ei={0.6} />; })}
      <group position={[shipP[0], 0.02, shipP[1]]} rotation={[0, PI, 0]} scale={0.16}><Ship t={t} tt={0} p={{ still: true }} /></group>
    </group>
  );
};

/* ---------- Pergamino sobre una mesa (plano 11): costa dibujada y un rótulo en blanco ---------- */
export const Chart: React.FC<P> = ({ t, p }) => {
  const tx = useTex((g, W, H) => {
    g.fillStyle = '#d9c49a'; g.fillRect(0, 0, W, H);
    g.fillStyle = '#c9b081'; for (let i = 0; i < 40; i++) g.fillRect((i * 97) % W, (i * 53) % H, 18, 6);
    // costa a la derecha, mar a la izquierda
    g.fillStyle = '#b89a6a'; g.beginPath(); g.moveTo(W, 0); g.lineTo(W * 0.72, 0);
    for (let y = 0; y <= H; y += 16) g.lineTo(W * 0.7 + Math.sin(y / 23) * 18 + Math.sin(y / 7) * 5, y); g.lineTo(W, H); g.fill();
    g.strokeStyle = '#6e5634'; g.lineWidth = 3; g.beginPath(); for (let y = 0; y <= H; y += 16) g.lineTo(W * 0.7 + Math.sin(y / 23) * 18 + Math.sin(y / 7) * 5, y); g.stroke();
    // líneas de rumbo y rótulo vacío
    g.strokeStyle = 'rgba(110,86,52,.45)'; g.lineWidth = 2; for (let a = 0; a < 8; a++) { g.beginPath(); g.moveTo(W * 0.35, H * 0.55); g.lineTo(W * 0.35 + Math.cos(a * PI / 4) * W, H * 0.55 + Math.sin(a * PI / 4) * W); g.stroke(); }
    g.fillStyle = '#ead9b3'; g.strokeStyle = '#6e5634'; g.lineWidth = 4; g.fillRect(W * 0.14, H * 0.2, W * 0.42, H * 0.12); g.strokeRect(W * 0.14, H * 0.2, W * 0.42, H * 0.12);
  }, 512, 384, 'magchart');
  const hl = p.hl !== undefined ? clamp((t - p.hl) / 0.4) : 0;
  return (
    <group>
      <B s={[3.2, 0.12, 2.0]} pos={[0, 0.7, 0]} c={WOOD} />
      {[[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([x, z], i) => <B key={i} s={[0.12, 0.7, 0.12]} pos={[x * 1.45, 0.35, z * 0.85]} c={WOOD2} />)}
      <mesh position={[0, 0.77, 0]} rotation={[-PI / 2, 0, 0.04]}><planeGeometry args={[2.4, 1.8]} /><meshStandardMaterial map={tx} roughness={0.95} /></mesh>
      {[-1.2, 1.2].map((x) => <Cyl key={x} r={0.07} h={1.85} pos={[x, 0.8, 0]} rot={[PI / 2, 0, 0]} c="#c2a877" />)}
      {/* pluma y tintero */}
      <Cyl r={0.08} r2={0.1} h={0.14} pos={[1.0, 0.84, 0.55]} c="#1d1a18" />
      <B s={[0.03, 0.03, 0.6]} pos={[0.9, 1.05, 0.45]} rot={[0.9, 0.3, 0]} c="#e8e0cf" />
      {/* resalte del mar en el mapa */}
      {hl > 0 && <mesh position={[-0.35, 0.785, 0.15]} rotation={[-PI / 2, 0, 0]} scale={0.6 + 0.4 * eo(hl)}><ringGeometry args={[0.55, 0.62, 32]} /><meshBasicMaterial color="#e7b53c" toneMapped={false} transparent opacity={hl} /></mesh>}
      <pointLight position={[-1.2, 2.0, 1.2]} intensity={6} color="#ffcf8a" distance={6} />
    </group>
  );
};

/* ---------- Loma con palmeras y playa (plano 12) ---------- */
export const Hill: React.FC<P> = ({ t }) => (
  <group>
    <mesh position={[0.9, 0.0, 0.2]} scale={[1.8, 0.9, 1.6]}><dodecahedronGeometry args={[1, 0]} /><M c="#3f5a37" /></mesh>
    <mesh position={[1.7, 0.0, -0.9]} scale={[1.4, 1.2, 1.2]}><dodecahedronGeometry args={[1, 0]} /><M c="#35502f" /></mesh>
    <mesh position={[0.2, -0.05, 1.3]} scale={[1.3, 0.25, 0.9]}><dodecahedronGeometry args={[1, 0]} /><M c="#b49a6a" /></mesh>
    {[[1.25, 0.62, 0.95, 0], [1.9, 0.9, 0.1, 1.5], [0.45, 0.42, 0.95, 3]].map(([x, y, z, ph], i) => (
      <group key={i} position={[x, y, z]} rotation={[0, 0, 0.12 + 0.02 * Math.sin(t * 1.3 + ph)]}>
        <Cyl r={0.035} r2={0.05} h={0.75} pos={[0, 0.37, 0]} c="#6a4a2c" />
        {[0, 1, 2, 3, 4].map((j) => <mesh key={j} position={[Math.cos(j * 1.26) * 0.18, 0.76, Math.sin(j * 1.26) * 0.18]} rotation={[Math.sin(j * 1.26) * 0.6, 0, -Math.cos(j * 1.26) * 0.6]}>
          <boxGeometry args={[0.4, 0.02, 0.1]} /><M c="#3d7a3a" /></mesh>)}
      </group>))}
  </group>
);

/* ---------- Tablón con marcas de días (plano 13): 19 grupos de 5 + 4 = 99 ---------- */
export const Tally: React.FC<P> = ({ t, p }) => {
  const { at = 0, dur = 2 } = p; const n = Math.round(99 * eo((t - at) / dur));
  const marks = []; for (let i = 0; i < n; i++) {
    const g = Math.floor(i / 5), j = i % 5; const col = g % 10, row = Math.floor(g / 10); const x = -1.28 + col * 0.27, y = 0.1 - row * 0.2;
    marks.push(j < 4 ? <B key={i} s={[0.018, 0.13, 0.01]} pos={[x + j * 0.04, y, 0.03]} c="#e6dcc4" /> : <B key={i} s={[0.2, 0.016, 0.01]} pos={[x + 0.06, y, 0.032]} rot={[0, 0, 0.55]} c="#e6dcc4" />);
  }
  return (
    <group>
      <B s={[2.95, 0.5, 0.06]} c={WOOD2} />
      <B s={[3.05, 0.06, 0.12]} pos={[0, 0.27, 0]} c={WOOD} />
      {marks}
    </group>
  );
};

/* ---------- Bodega con barriles (plano 14): la comida se acaba ---------- */
export const Hold: React.FC<P> = ({ t, p }) => {
  const { at = 1 } = p; const k = eio((t - at) / 0.7);
  return (
    <group>
      <B s={[5, 3.5, 0.1]} pos={[0, 1.75, -1.6]} c="#2a1d14" />
      {[-1, 1].map((s) => <B key={s} s={[0.1, 3.5, 4]} pos={[s * 2.3, 1.75, 0.3]} c="#24180f" />)}
      <B s={[5, 0.06, 4]} pos={[0, 0.03, 0.3]} c="#4a3220" />
      {Array.from({ length: 7 }, (_, i) => <B key={i} s={[0.06, 3.4, 0.08]} pos={[-1.8 + i * 0.6, 1.7, -1.52]} c="#3a281a" />)}
      {/* barriles: los de atrás ya vacíos, tumbados */}
      {[[-1.2, -0.9, 0], [-0.55, -1.0, 0], [1.25, -0.9, 0]].map(([x, z], i) => <Cyl key={i} r={0.28} r2={0.24} h={0.6} pos={[x, 0.3, z]} c={i === 1 ? '#6e4a2a' : '#7a522e'} />)}
      <Cyl r={0.28} r2={0.24} h={0.6} pos={[0.55, 0.28, -0.6]} rot={[0, 0.4, PI / 2]} c="#6e4a2a" />
      {/* barril abierto al frente: el contenido baja hasta quedar vacío */}
      <group position={[0, 0, 0.3]}>
        <mesh position={[0, 0.36, 0]}><cylinderGeometry args={[0.34, 0.3, 0.72, 12, 1, true]} /><meshStandardMaterial color="#7a522e" side={THREE.DoubleSide} flatShading roughness={0.9} /></mesh>
        <Cyl r={0.3} h={0.02} pos={[0, 0.01, 0]} c="#3a281a" seg={12} />
        {[0.12, 0.5].map((y) => <mesh key={y} position={[0, y, 0]}><torusGeometry args={[0.32, 0.018, 4, 14]} /><M c="#2c2c30" /></mesh>)}
        <Cyl r={0.29} h={Math.max(0.01, 0.6 * (1 - k))} pos={[0, 0.02 + Math.max(0.01, 0.6 * (1 - k)) / 2, 0]} c="#b89a62" seg={12} />
      </group>
      <group position={[-1.0, 1.9, 0.6]}><B s={[0.14, 0.2, 0.14]} c="#ffb860" e="#ffb860" ei={1.2 + 0.15 * Math.sin(t * 9)} /></group>
      <pointLight position={[-1.0, 1.7, 0.9]} intensity={7 + 0.6 * Math.sin(t * 9)} color="#ffb060" distance={6} />
    </group>
  );
};

/* ---------- Globo low-poly con una carabela que lo rodea (plano 17), sin trazar la ruta ---------- */
export const World3: React.FC<P> = ({ t }) => (
  <group>
    <group rotation={[0.35, t * 0.35, 0]}>
      <mesh><icosahedronGeometry args={[1, 2]} /><M c="#2a4d66" /></mesh>
      {[[0.5, 0.6, 0.6, 0.5], [-0.7, 0.2, 0.65, 0.42], [0.1, -0.6, 0.78, 0.38], [-0.3, 0.7, -0.6, 0.48], [0.8, -0.2, -0.5, 0.42], [-0.6, -0.5, -0.6, 0.4]].map(([x, y, z, s], i) => (
        <mesh key={i} position={[x * 0.84, y * 0.84, z * 0.84]} scale={[s, s * 0.8, s]}><icosahedronGeometry args={[0.6, 0]} /><M c={i % 2 ? '#8d7a52' : '#6f7a4e'} /></mesh>))}
    </group>
    <group rotation={[0.35, 0, 0]}>
      <group rotation={[0, -t * 0.9, 0]}><group position={[0, 0, 1.08]} rotation={[PI / 2, 0, 0]} scale={0.22}><Ship t={t} tt={0} p={{ still: true }} /></group></group>
    </group>
  </group>
);

export const EXTRA = { world: World, ship: Ship, shipturn: ShipTurn, cliffs: Cliffs, faceless: Faceless, straitmap: StraitMap, chart: Chart, hill: Hill, tally: Tally, hold: Hold, globe3: World3 };
