import React from 'react';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';
import { M, useTex } from '../../src/kit/Props';
import { clamp, eio, eo, lerp, pop, rnd } from '../../src/kit/math';

// Look propio (distinto del de Shorts: nada de grilla violeta, celular gigante ni carteles 3D): ciudad de noche azul profundo
// con ventanas cálidas. Cada reel es una burbuja de luz coral con un triángulo de play que sube de terraza en terraza, de un grupo
// de personas a otro más grande. Los que te siguen llevan remera cian en todo el video.
// Sin textos 3D: nombres y cifras van en placas 2D del kit. Sin logos reales: la "marca de agua" es un sello gris genérico.
// Personas low-poly sin rasgos (cabeza lisa). La franja de subtítulos (y 290-390 px) siempre queda oscura: `Shade` es un velo
// pegado a la cámara (copiado de litio-pileta-salar) que oscurece el tercio superior.
// Toda animación es función pura de t / tt.
type P = { t: number; tt: number; p: any };
type V3 = [number, number, number];
const PI = Math.PI;

const B: React.FC<{ s: V3; pos?: V3; rot?: V3; c: string; e?: string; ei?: number; o?: number }> = ({ s, pos, rot, c, e, ei, o }) => (
  <mesh position={pos} rotation={rot}><boxGeometry args={s} /><M c={c} e={e} ei={ei} o={o} /></mesh>
);
const Cyl: React.FC<{ r: number; r2?: number; h: number; pos?: V3; rot?: V3; seg?: number; c: string; e?: string; ei?: number; o?: number }> = ({ r, r2, h, pos, rot, seg = 12, c, e, ei, o }) => (
  <mesh position={pos} rotation={rot}><cylinderGeometry args={[r2 ?? r, r, h, seg]} /><M c={c} e={e} ei={ei} o={o} /></mesh>
);
const Ball: React.FC<{ r: number; pos?: V3; c: string; e?: string; ei?: number; o?: number; d?: number }> = ({ r, pos, c, e, ei, o, d = 1 }) => (
  <mesh position={pos}><icosahedronGeometry args={[r, d]} /><M c={c} e={e} ei={ei} o={o} /></mesh>
);
/** curva por tramos [[t, v], ...] con easing: continua, sin saltos */
export const curve = (kf: [number, number][], t: number) => {
  if (!kf.length) return 0; if (t <= kf[0][0]) return kf[0][1];
  for (let i = 1; i < kf.length; i++) if (t < kf[i][0]) { const [t0, v0] = kf[i - 1], [t1, v1] = kf[i]; return lerp(v0, v1, eio((t - t0) / (t1 - t0))); }
  return kf[kf.length - 1][1];
};
/** recorrido por tramos [[t, x, y, z], ...] con easing */
export const path = (kf: number[][], t: number): V3 => {
  if (t <= kf[0][0]) return [kf[0][1], kf[0][2], kf[0][3]];
  for (let i = 1; i < kf.length; i++) if (t < kf[i][0]) { const a = kf[i - 1], b = kf[i]; const k = eio((t - a[0]) / (b[0] - a[0]));
    return [lerp(a[1], b[1], k), lerp(a[2], b[2], k) + Math.sin(k * PI) * (b[4] ?? 0), lerp(a[3], b[3], k)]; }
  const l = kf[kf.length - 1]; return [l[1], l[2], l[3]];
};
const on = (t: number, at: number | undefined, d = 0.35) => (at === undefined ? 0 : clamp((t - at) / d));

export const CORAL = '#ff6a55', CORAL2 = '#ffb199', AMBER = '#ffb347', TEAL = '#27e0d8', NIGHT = '#060a18';
export const SHIRTS = ['#e8794a', '#8f7be8', '#f2c14e', '#e05a7a', '#6fcf7f', '#d9d4c7', '#5aa0e6', '#c46be0'];
export const SKINS = ['#e9b48f', '#c98d66', '#8d5a3c', '#f3c9a6', '#a8704b'];
export const FOL = TEAL; // remera de los que te siguen

/* ---------- Velo oscuro pegado a la cámara (de litio-pileta-salar): la franja de subtítulos nunca queda clara ---------- */
const Shade: React.FC<{ y1?: number; a?: number }> = ({ y1 = 640, a = 0.9 }) => {
  const { camera } = useThree();
  const tex = useTex((g, W, H) => {
    g.clearRect(0, 0, W, H);
    for (let y = 0; y < H; y++) { const px = (y / H) * y1; const k = px < 430 ? 1 : 1 - clamp((px - 430) / (y1 - 430)); const al = a * (k * k * (3 - 2 * k));
      g.fillStyle = `rgba(4,7,18,${al})`; g.fillRect(0, y, W, 1); }
  }, 4, 256, 'reelshade' + y1 + a);
  const geo = React.useMemo(() => new THREE.PlaneGeometry(1, 1), []);
  camera.updateMatrixWorld();
  const yb = 1 - (2 * y1) / 1920; const pos = geo.attributes.position as THREE.BufferAttribute;
  const pts: [number, number][] = [[-1.1, 1.1], [1.1, 1.1], [-1.1, yb], [1.1, yb]];
  pts.forEach(([x, y], i) => { const v = new THREE.Vector3(x, y, -0.9).unproject(camera); pos.setXYZ(i, v.x, v.y, v.z); });
  pos.needsUpdate = true; geo.computeBoundingSphere();
  return <mesh geometry={geo} frustumCulled={false} renderOrder={999}>
    <meshBasicMaterial map={tex} transparent depthTest={false} depthWrite={false} toneMapped={false} fog={false} /></mesh>;
};

/* ---------- Fachada con ventanas cálidas (textura compartida) ---------- */
const useFacade = (seed: number) => useTex((g, W, H) => {
  g.fillStyle = '#10172b'; g.fillRect(0, 0, W, H); const r = rnd(seed);
  for (let y = 6; y < H - 6; y += 16) for (let x = 6; x < W - 6; x += 14) {
    const v = r(); if (v < 0.45) continue;
    g.fillStyle = v > 0.93 ? '#8fe8ff' : v > 0.7 ? '#ffc56b' : '#7a5530'; g.fillRect(x, y, 7, 9);
  }
}, 128, 256, 'facade' + seed);
const Facade: React.FC<{ w: number; h: number; d: number; seed: number; pos?: V3; c?: string; ei?: number }> = ({ w, h, d, seed, pos = [0, 0, 0], c = '#141c33', ei = 0.85 }) => {
  const tex = useFacade(seed % 4);
  const t2 = React.useMemo(() => { const x = tex.clone(); x.wrapS = x.wrapT = THREE.RepeatWrapping; x.repeat.set(Math.max(1, w / 0.9), Math.max(0.5, h / 1.6)); x.needsUpdate = true; return x; }, [tex, w, h]);
  return (
    <group position={pos}>
      <mesh position={[0, h / 2, 0]}><boxGeometry args={[w, h, d]} />
        <meshStandardMaterial attach="material" map={t2} emissiveMap={t2} emissive="#ffffff" emissiveIntensity={ei} flatShading roughness={0.9} color="#ffffff" /></mesh>
      <B s={[w + 0.04, 0.05, d + 0.04]} pos={[0, h + 0.025, 0]} c={c} />
    </group>
  );
};

/* ---------- Mundo: cielo de noche, dos filas de edificios con ventanas, calle oscura, faroles ---------- */
export const World: React.FC<P> = ({ p }) => {
  const sky = useTex((g, W, H) => {
    const gr = g.createLinearGradient(0, H, 0, 0);
    [[0, '#22406e'], [0.1, '#18305a'], [0.25, '#0d1a36'], [0.45, '#070d1f'], [1, '#03050d']].forEach(([f, c]) => gr.addColorStop(f as number, c as string));
    g.fillStyle = gr; g.fillRect(0, 0, W, H);
    const r = rnd(3); for (let i = 0; i < 40; i++) { const y = H * (0.62 + r() * 0.3); g.globalAlpha = 0.25 + r() * 0.35; g.fillStyle = '#cfe0ff'; g.fillRect(r() * W, y, 2, 2); }
    g.globalAlpha = 1;
  }, 256, 1024, 'reelsky');
  const ground = useTex((g, W, H) => {
    g.fillStyle = '#151c2e'; g.fillRect(0, 0, W, H);
    g.fillStyle = '#0f1422'; g.fillRect(0, H * 0.38, W, H * 0.24);
    g.fillStyle = '#3c4458'; for (let x = 10; x < W; x += 70) g.fillRect(x, H * 0.495, 36, 5);
    g.strokeStyle = '#1c2438'; g.lineWidth = 2; for (let x = 0; x < W; x += 48) { g.beginPath(); g.moveTo(x, 0); g.lineTo(x, H * 0.38); g.stroke(); g.beginPath(); g.moveTo(x, H * 0.62); g.lineTo(x, H); g.stroke(); }
  }, 1024, 1024, 'reelground');
  const back = React.useMemo(() => { const r = rnd(p.seed ?? 7); return Array.from({ length: 14 }, (_, i) => ({ x: -4.6 + i * 0.7 + (r() - 0.5) * 0.3, z: -3.45 - r() * 0.1, w: 0.6 + r() * 0.35, h: 0.9 + r() * 1.5, s: i })); }, [p.seed]);
  const mid = React.useMemo(() => { const r = rnd((p.seed ?? 7) + 5); return Array.from({ length: 10 }, (_, i) => ({ x: -3.6 + i * 0.8 + (r() - 0.5) * 0.3, z: -2.95 - r() * 0.15, w: 0.6 + r() * 0.3, h: 0.35 + r() * 0.6, s: i + 3 })); }, [p.seed]);
  return (
    <group>
      <color attach="background" args={[NIGHT]} />
      <fog attach="fog" args={['#0b1430', p.fogNear ?? 10, p.fogFar ?? 26]} />
      <mesh position={[0, 4, -3.75]}><planeGeometry args={[9.4, 10]} /><meshBasicMaterial map={sky} toneMapped={false} fog={false} /></mesh>
      <mesh rotation={[-PI / 2, 0, 0]} position={[0, 0.02, 2.2]}><planeGeometry args={[9.4, 12]} /><meshStandardMaterial map={ground} roughness={0.95} /></mesh>
      {!p.noCity && back.map((b, i) => <Facade key={'b' + i} w={b.w} h={b.h} d={0.5} seed={b.s} pos={[b.x, 0, b.z]} ei={0.6} />)}
      {!p.noCity && mid.map((b, i) => <Facade key={'m' + i} w={b.w} h={b.h} d={0.7} seed={b.s} pos={[b.x, 0, b.z]} ei={0.75} />)}
      {/* faroles a los costados de la calle */}
      {[-2.4, 2.4].map((x, i) => <group key={'l' + i} position={[x, 0, 2.2]}>
        <Cyl r={0.03} h={1.4} pos={[0, 0.7, 0]} c="#2a3146" /><Ball r={0.07} pos={[0, 1.44, 0]} c="#ffd08a" e="#ffd08a" ei={1.2} /></group>)}
      <hemisphereLight args={['#8aa6ff', '#1a1424', 0.75]} />
      <directionalLight position={[-4, 7, 5]} intensity={0.9} color="#c8d6ff" />
      <pointLight position={[2.2, 2.4, 3.2]} intensity={10} color="#ffcf8a" distance={10} />
      <pointLight position={[-2.2, 2.4, 3.2]} intensity={8} color="#ffcf8a" distance={10} />
      {!p.noShade && <Shade y1={p.shadeY ?? 640} a={p.shadeA ?? 0.9} />}
    </group>
  );
};

/* ---------- Persona low-poly sin rasgos (cabeza lisa) ---------- */
type Pose = { aL: V3; aR: V3; lean: number; jump: number };
const poseOf = (name: string, t: number, ph: number): Pose => {
  const s = Math.sin((t + ph) * 2.3), w = Math.sin((t + ph) * 8);
  switch (name) {
    case 'cheer': return { aL: [w * 0.15, 0, -3.1], aR: [-w * 0.15, 0, 3.1], lean: 0, jump: Math.abs(Math.sin((t + ph) * 6)) * 0.06 };
    case 'phone': return { aL: [-1.05, 0, -0.3], aR: [-1.05, 0, 0.3], lean: 0.12, jump: 0 };
    case 'point': return { aL: [0.05, 0, -0.1], aR: [-1.4 + s * 0.04, 0, 0.1], lean: 0, jump: 0 };
    case 'throw': return { aL: [0.05, 0, -0.1], aR: [-2.6, 0, 0.2], lean: -0.05, jump: 0 };
    case 'sad': return { aL: [0.08, 0, -0.05], aR: [0.08, 0, 0.05], lean: 0.28, jump: 0 };
    case 'look': return { aL: [0, 0, -0.12], aR: [0, 0, 0.12], lean: -0.22, jump: 0 };
    default: return { aL: [0, 0, -0.12 - s * 0.03], aR: [0, 0, 0.12 + s * 0.03], lean: 0, jump: 0 };
  }
};
const mix = (a: V3, b: V3, k: number): V3 => [lerp(a[0], b[0], k), lerp(a[1], b[1], k), lerp(a[2], b[2], k)];
export const Folk: React.FC<P> = ({ t, p }) => {
  const { shirt = SHIRTS[0], pants = '#283048', skin = SKINS[0], hair = '#2a1d14', ph = 0, phone } = p;
  const seq: [number, string][] = p.seq ?? [[0, p.pose ?? 'idle']];
  let i = 0; for (let j = 0; j < seq.length; j++) if (t >= seq[j][0]) i = j;
  let q = poseOf(seq[i][1], t, ph);
  if (i > 0) { const k = eio((t - seq[i][0]) / 0.3); const a = poseOf(seq[i - 1][1], t, ph); q = { aL: mix(a.aL, q.aL, k), aR: mix(a.aR, q.aR, k), lean: lerp(a.lean, q.lean, k), jump: lerp(a.jump, q.jump, k) }; }
  const walking = seq[i][1] === 'walk'; const wl = walking ? Math.sin((t + ph) * 9) * 0.5 : 0;
  const hasPhone = phone ?? seq[i][1] === 'phone';
  return (
    <group position={[0, q.jump, 0]}>
      {[-1, 1].map((sd) => <group key={sd} position={[0.085 * sd, 0.44, 0]} rotation={[wl * sd, 0, 0]}>
        <B s={[0.12, 0.44, 0.13]} pos={[0, -0.22, 0]} c={pants} /><B s={[0.13, 0.06, 0.18]} pos={[0, -0.42, 0.025]} c="#0d1120" /></group>)}
      <group position={[0, 0.44, 0]} rotation={[q.lean, 0, 0]}>
        <B s={[0.31, 0.4, 0.2]} pos={[0, 0.2, 0]} c={shirt} />
        <group position={[-0.2, 0.37, 0]} rotation={walking ? [-wl, 0, -0.1] : q.aL}><B s={[0.09, 0.32, 0.1]} pos={[0, -0.15, 0]} c={shirt} /><B s={[0.085, 0.08, 0.09]} pos={[0, -0.34, 0]} c={skin} /></group>
        <group position={[0.2, 0.37, 0]} rotation={walking ? [wl, 0, 0.1] : q.aR}><B s={[0.09, 0.32, 0.1]} pos={[0, -0.15, 0]} c={shirt} /><B s={[0.085, 0.08, 0.09]} pos={[0, -0.34, 0]} c={skin} /></group>
        {hasPhone && <group position={[0, 0.24, 0.27]} rotation={[-0.5, 0, 0]}><B s={[0.13, 0.2, 0.02]} c="#1b2233" /><B s={[0.11, 0.16, 0.005]} pos={[0, 0, 0.012]} c="#203a66" e="#2a5aa8" ei={0.5} /></group>}
        <group position={[0, 0.55, 0]}>
          <Ball r={0.125} c={skin} />
          <mesh position={[0, 0.03, -0.01]}><sphereGeometry args={[0.132, 10, 6, 0, PI * 2, 0, PI / 2.2]} /><M c={hair} /></mesh>
        </group>
      </group>
    </group>
  );
};

/* ---------- Corazoncito que sube (reacción) ---------- */
const Heart: React.FC<{ k: number; c?: string }> = ({ k, c = CORAL }) => (k <= 0 || k >= 1 ? null :
  <group position={[0, k * 0.55, 0]} scale={[0.6 * pop(k * 1.2), 0.6 * pop(k * 1.2), 0.6 * pop(k * 1.2)]}>
    <group rotation={[0, 0, PI / 4]}><B s={[0.09, 0.09, 0.04]} c={c} e={c} ei={0.7} o={1 - k} /></group>
    <Ball r={0.048} pos={[-0.032, 0.035, 0]} c={c} e={c} ei={0.7} o={1 - k} d={0} /><Ball r={0.048} pos={[0.032, 0.035, 0]} c={c} e={c} ei={0.7} o={1 - k} d={0} />
  </group>);

/* ---------- Terraza con un grupo de personas ----------
   p: n, h (altura de la terraza), seed, fol (cuántos te siguen: remera cian), react (aplauden + corazones), away (se dan vuelta),
   lit / off (borde encendido / apagado), edge (color), sc (escala de la gente), phone (miran el celular), dim (se apaga todo) */
export const Group: React.FC<P> = ({ t, p }) => {
  const { n = 3, h = 0.4, seed = 1, fol = 0, react, away, lit, off, edge = TEAL, sc = 0.8, phone = false, foot = true, look } = p;
  const cols = Math.ceil(Math.sqrt(n * 1.6)); const rows = Math.ceil(n / cols); const sx = 0.42 * sc / 0.8, sz = 0.3 * sc / 0.8;
  const w = p.w ?? cols * sx + 0.35, d = p.d ?? rows * sz + 0.35;
  const people = React.useMemo(() => { const r = rnd(seed); return Array.from({ length: n }, (_, i) => { const c = i % cols, rw = Math.floor(i / cols);
    const inRow = Math.min(cols, n - rw * cols);
    return { x: (c - (inRow - 1) / 2) * sx + (r() - 0.5) * 0.02, z: (rw - (rows - 1) / 2) * sz + (r() - 0.5) * 0.04, ph: r() * 6, skin: SKINS[Math.floor(r() * SKINS.length)],
      shirt: i < fol ? FOL : SHIRTS[(seed * 3 + i) % SHIRTS.length], hair: ['#2a1d14', '#4a3020', '#111', '#7a5a3a'][Math.floor(r() * 4)] }; }); }, [n, seed, fol]);
  const ek = (lit === undefined ? 1 : on(t, lit)) * (off === undefined ? 1 : 1 - on(t, off, 0.4));
  const ak = away === undefined ? 0 : eio((t - away) / 0.45);
  return (
    <group>
      {foot && <Facade w={w} h={h} d={d} seed={seed} ei={0.7} />}
      <B s={[w + 0.06, 0.04, d + 0.06]} pos={[0, h + 0.02, 0]} c="#1a2238" />
      {[[0, d / 2 + 0.03, w + 0.06, 0.025], [0, -d / 2 - 0.03, w + 0.06, 0.025]].map(([x, z, ww, dd], i) =>
        <B key={i} s={[ww, 0.03, dd]} pos={[x, h + 0.045, z]} c={ek > 0.02 ? edge : '#2a3146'} e={edge} ei={0.9 * ek} />)}
      {[[-w / 2 - 0.03, 0], [w / 2 + 0.03, 0]].map(([x, z], i) => <B key={'s' + i} s={[0.025, 0.03, d + 0.06]} pos={[x, h + 0.045, z]} c={ek > 0.02 ? edge : '#2a3146'} e={edge} ei={0.9 * ek} />)}
      {people.map((q, i) => {
        const turn = ak * PI * (i % 2 ? 1 : -1);
        const seq: [number, string][] = p.seq ?? [[0, look !== undefined ? 'idle' : phone ? 'phone' : 'idle'], ...(look !== undefined ? [[look, 'look'] as [number, string]] : []),
          ...(react !== undefined ? [[react + (i % 3) * 0.06, 'cheer'] as [number, string]] : []), ...(away !== undefined ? [[away, 'sad'] as [number, string]] : [])];
        const hk = react === undefined ? 0 : ((t - react - (i % 4) * 0.18) / 1.1);
        return <group key={i} position={[q.x, h + 0.04, q.z]} rotation={[0, turn, 0]} scale={[sc, sc, sc]}>
          <Folk t={t} tt={t} p={{ shirt: q.shirt, skin: q.skin, hair: q.hair, ph: q.ph, seq }} />
          {hk > 0 && hk < 1 && <group position={[0, 1.15, 0]}><Heart k={hk} /></group>}
        </group>;
      })}
    </group>
  );
};

/* ---------- La burbuja = un reel: esfera de luz coral con un play adentro ----------
   p: kf [[t, x, y, z, arco], ...] recorrido relativo, r, c, mark (sello gris de otra app), gray (video de otro),
   dim [t] (se apaga), wob (tiembla trabada), trail (estela) */
export const Bubble: React.FC<P> = ({ t, p }) => {
  const { r = 0.24, mark = false, gray = false, wob = 0, trail = true } = p;
  const c = gray ? '#9aa3b5' : (p.c ?? CORAL);
  const kf = p.kf ?? [[0, 0, 0, 0]];
  const dk = p.dim === undefined ? 0 : on(t, p.dim, 0.5);
  const at = (u: number): V3 => { const q = path(kf, u); return [q[0] + Math.sin(u * 3.1) * 0.015, q[1] + Math.sin(u * 2.2) * 0.03 + (wob ? Math.sin(u * 17) * wob : 0), q[2]]; };
  const [x, y, z] = at(t);
  const ei = lerp(1.1, 0.12, dk), op = lerp(0.82, 0.5, dk);
  return (
    <group>
      {trail && [0.07, 0.14, 0.21].map((dt, i) => { const q = at(t - dt); const dist = Math.hypot(q[0] - x, q[1] - y, q[2] - z); if (dist < 0.02) return null;
        return <Ball key={i} r={r * (0.5 - i * 0.12)} pos={q} c={c} e={c} ei={ei * 0.8} o={0.35 - i * 0.1} d={0} />; })}
      <group position={[x, y, z]}>
        <Ball r={r} c={c} e={c} ei={ei} o={op} d={2} />
        <Ball r={r * 1.35} c={c} e={c} ei={ei * 0.6} o={0.1 * (1 - dk)} d={1} />
        <group position={[0.04 * r, 0, r * 0.55]} rotation={[0, 0, PI / 2]}><mesh rotation={[PI / 2, 0, 0]}><cylinderGeometry args={[r * 0.4, r * 0.4, r * 0.1, 3]} /><M c="#fff4ee" e="#fff4ee" ei={lerp(0.7, 0.1, dk)} /></mesh></group>
        {mark && <group position={[r * 0.52, r * 0.5, r * 0.62]}>
          <B s={[r * 0.55, r * 0.55, r * 0.08]} c="#5b6172" />
          <mesh position={[0, 0, r * 0.05]}><torusGeometry args={[r * 0.15, r * 0.045, 6, 14]} /><M c="#d8dbe3" /></mesh>
        </group>}
      </group>
    </group>
  );
};

/* ---------- Techo de vidrio (donde se traba el reel) ---------- */
export const Glass: React.FC<P> = ({ t, p }) => {
  const { w = 0.8, d = 0.6, flash, brk } = p;
  const fk = flash === undefined ? 0 : Math.max(0, 1 - Math.abs(t - flash - 0.25) / 0.25);
  const bk = brk === undefined ? 0 : clamp((t - brk) / 0.9);
  if (bk >= 1) return null;
  const col = fk > 0 ? '#ffd9a0' : '#8fd8ff';
  return (
    <group position={[0, -bk * bk * 1.4, 0]} rotation={[bk * 0.6, 0, bk * 0.4]}>
      <B s={[w, 0.025, d]} c="#9fdcff" e="#9fdcff" ei={0.15} o={0.28 * (1 - bk)} />
      {[[0, d / 2], [0, -d / 2]].map(([x, z], i) => <B key={i} s={[w, 0.03, 0.03]} pos={[x, 0, z]} c={col} e={col} ei={0.8 + fk} o={1 - bk} />)}
      {[[-w / 2, 0], [w / 2, 0]].map(([x, z], i) => <B key={'s' + i} s={[0.03, 0.03, d]} pos={[x, 0, z]} c={col} e={col} ei={0.8 + fk} o={1 - bk} />)}
    </group>
  );
};

/* ---------- Línea punteada de luz que "corta" (el corte en 1.000 que nadie publicó): se rompe y cae ---------- */
export const Cut: React.FC<P> = ({ t, p }) => {
  const { w = 3.0, n = 14, brk } = p;
  return (
    <group>{Array.from({ length: n }, (_, i) => {
      const x = -w / 2 + (i + 0.5) * (w / n); const bk = brk === undefined ? 0 : clamp((t - brk - (i % 5) * 0.05) / 1.0);
      if (bk >= 1) return null;
      return <B key={i} s={[w / n * 0.6, 0.045, 0.045]} pos={[x + bk * (i - n / 2) * 0.04, -bk * bk * 1.8 + Math.sin(t * 6 + i) * 0.005, bk * 0.3]} rot={[bk * (i % 3), 0, bk * (i % 2 ? 2 : -2)]}
        c="#ff7f6e" e="#ff7f6e" ei={1.0} o={1 - bk} />;
    })}</group>
  );
};

/* ---------- Avioncito de papel (compartir): vuela de a hacia b con arco ---------- */
export const Plane: React.FC<P> = ({ t, p }) => {
  const { a = [0, 0, 0], b = [1, 0, 0], at = 0, dur = 0.9, arc = 0.5, c = '#f4f6ff', s = 1 } = p;
  const k = (t - at) / dur; if (k < 0) return null; const u = eio(Math.min(1, k));
  const pt = (v: number): V3 => [lerp(a[0], b[0], v), lerp(a[1], b[1], v) + Math.sin(v * PI) * arc, lerp(a[2], b[2], v)];
  const q = pt(u), q2 = pt(Math.min(1, u + 0.02)); const yaw = Math.atan2(q2[0] - q[0], q2[2] - q[2]); const pitch = Math.atan2(q2[1] - q[1], Math.hypot(q2[0] - q[0], q2[2] - q[2]));
  const fade = k > 1 ? clamp(1 - (k - 1) * 3) : 1; if (fade <= 0) return null;
  return (
    <group position={q} rotation={[0, yaw, 0]} scale={[s * fade, s * fade, s * fade]}>
      <group rotation={[-pitch, 0, 0]}>
        <mesh rotation={[PI / 2, 0, 0]} scale={[1, 1, 0.18]}><coneGeometry args={[0.1, 0.32, 3]} /><M c={c} e={c} ei={0.35} /></mesh>
        <mesh position={[0, -0.025, 0]} rotation={[PI / 2, 0, 0]} scale={[0.25, 1, 0.8]}><coneGeometry args={[0.07, 0.3, 3]} /><M c="#c9d2ea" /></mesh>
      </group>
    </group>
  );
};

/* ---------- Pantalla de cine en una terraza: barra de tiempo que avanza, marcas rojas donde la gente se va ---------- */
export const Screen: React.FC<P> = ({ t, p }) => {
  const { w = 2.2, h = 1.0, at = 0, dur = 4, marks = [] as number[] } = p;
  const k = clamp((t - at) / dur);
  return (
    <group>
      {[-1, 1].map((s) => <Cyl key={s} r={0.035} h={0.9} pos={[s * (w / 2 - 0.15), 0.45, -0.05]} c="#2a3146" />)}
      <group position={[0, 0.9 + h / 2, 0]}>
        <B s={[w + 0.1, h + 0.1, 0.06]} pos={[0, 0, -0.04]} c="#1a2238" />
        <B s={[w, h, 0.02]} c="#0e1a33" e="#13254a" ei={0.6} />
        {/* play grande, tenue */}
        <group position={[0.02, 0.12, 0.03]} rotation={[0, 0, PI / 2]}><mesh rotation={[PI / 2, 0, 0]}><cylinderGeometry args={[0.2, 0.2, 0.02, 3]} /><M c={CORAL} e={CORAL} ei={0.5} /></mesh></group>
        {/* barra de tiempo */}
        <B s={[w * 0.86, 0.06, 0.02]} pos={[0, -h / 2 + 0.16, 0.02]} c="#2b3450" />
        <B s={[Math.max(0.001, w * 0.86 * k), 0.06, 0.025]} pos={[-w * 0.43 + (w * 0.86 * k) / 2, -h / 2 + 0.16, 0.025]} c={CORAL} e={CORAL} ei={0.8} />
        <Ball r={0.05} pos={[-w * 0.43 + w * 0.86 * k, -h / 2 + 0.16, 0.035]} c="#fff4ee" e="#fff4ee" ei={0.5} d={0} />
        {marks.map((m: number, i: number) => { const mk = m / dur; if (k < mk) return null; return <B key={i} s={[0.035, 0.16, 0.03]} pos={[-w * 0.43 + w * 0.86 * mk, -h / 2 + 0.16, 0.04]} c="#ff3b4e" e="#ff3b4e" ei={0.9} />; })}
      </group>
    </group>
  );
};

/* ---------- Espectadores de espaldas mirando la pantalla; cada uno se va en su momento ---------- */
export const Viewers: React.FC<P> = ({ t, p }) => {
  const { xs = [-0.9, -0.5, -0.1, 0.3, 0.7, 1.1], leave = [] as (number | null)[], seed = 4 } = p;
  return (
    <group>{xs.map((x: number, i: number) => {
      const lv = leave[i]; const k = lv == null ? 0 : clamp((t - lv) / 1.2); const side = x < 0.1 ? -1 : 1;
      const rot = lv == null ? PI : lerp(PI, PI + side * (PI / 2), eio(clamp((t - lv) / 0.3)));
      const dx = side * eo(k) * 1.4 * (k > 0 ? 1 : 0); const fade = 1 - clamp((k - 0.75) / 0.25);
      if (fade <= 0) return null;
      const seq: [number, string][] = lv == null ? [[0, 'idle']] : [[0, 'idle'], [lv, 'walk']];
      return <group key={i} position={[x + dx, 0, (i % 2) * 0.22]} rotation={[0, rot, 0]} scale={[0.85, 0.85, 0.85]}>
        <Folk t={t} tt={t} p={{ shirt: SHIRTS[(i + seed) % SHIRTS.length], skin: SKINS[i % SKINS.length], ph: i * 1.3, seq }} /></group>;
    })}</group>
  );
};

/* ---------- Arco de entrada a la prueba: cian; con marca de agua se pone rojo y baja una barrera ---------- */
export const Gate: React.FC<P> = ({ t, p }) => {
  const { w = 1.0, h = 1.2, deny } = p;
  const dk = deny === undefined ? 0 : clamp((t - deny) / 0.25);
  const col = dk > 0.5 ? '#ff3b4e' : TEAL;
  return (
    <group>
      {[-1, 1].map((s) => <B key={s} s={[0.09, h, 0.09]} pos={[s * w / 2, h / 2, 0]} c={col} e={col} ei={0.75} />)}
      <B s={[w + 0.09, 0.09, 0.09]} pos={[0, h, 0]} c={col} e={col} ei={0.75} />
      {dk > 0 && <group position={[0, h - (h * 0.5) * eo(dk) - 0.05, 0]}>
        <B s={[w - 0.05, 0.06, 0.05]} c="#ff3b4e" e="#ff3b4e" ei={0.6} />
        <B s={[w - 0.08, h * 0.5 * eo(dk), 0.02]} pos={[0, h * 0.25 * eo(dk), 0]} c="#ff3b4e" e="#ff3b4e" ei={0.2} o={0.22} />
      </group>}
    </group>
  );
};

/* ---------- Puente entre terrazas: se cae (te sacan de las recomendaciones) ---------- */
export const Bridge: React.FC<P> = ({ t, p }) => {
  const { len = 1.4, drop } = p;
  const k = drop === undefined ? 0 : clamp((t - drop) / 0.7);
  return (
    <group rotation={[0, 0, -eio(k) * 1.2]} position={[0, -k * k * 0.6, 0]}>
      <B s={[len, 0.05, 0.32]} pos={[len / 2, 0, 0]} c="#27304a" />
      {[-1, 1].map((s) => <B key={s} s={[len, 0.03, 0.03]} pos={[len / 2, 0.04, s * 0.16]} c={k > 0 ? '#ff3b4e' : TEAL} e={k > 0 ? '#ff3b4e' : TEAL} ei={0.8 * (1 - k * 0.6)} />)}
    </group>
  );
};

/* ---------- Mes: 30 baldosas que se prenden de a una ---------- */
export const Month: React.FC<P> = ({ t, p }) => {
  const { at = 0, dur = 0.8, c = '#ffb347' } = p;
  const n = Math.floor(clamp((t - at) / dur) * 30 + 0.0001);
  return (
    <group>{Array.from({ length: 30 }, (_, i) => { const x = (i % 6) - 2.5, z = Math.floor(i / 6) - 2; const lit = i < n;
      return <B key={i} s={[0.1, 0.03, 0.1]} pos={[x * 0.13, 0.035, z * 0.13]} c={lit ? c : '#1e2740'} e={c} ei={lit ? 0.35 : 0} />; })}</group>
  );
};

/* ---------- Faro: torre con un reflector que barre la ciudad y se queda en el reel ---------- */
export const Beacon: React.FC<P> = ({ t, p }) => {
  const { h = 1.9, lock = 1.5, a0 = -0.9, a1 = 0.55, tilt = 0.85, len = 2.4 } = p;
  const k = eio(clamp(t / lock)); const yaw = lerp(a0, a1, k) + (t > lock ? Math.sin((t - lock) * 1.4) * 0.03 : 0);
  return (
    <group>
      <Facade w={0.7} h={h} d={0.6} seed={9} ei={0.65} />
      <Cyl r={0.12} h={0.16} pos={[0, h + 0.1, 0]} c="#2a3146" />
      <group position={[0, h + 0.2, 0]} rotation={[0, yaw, 0]}>
        <group rotation={[tilt, 0, 0]}>
          <Ball r={0.1} c="#fff1c9" e="#fff1c9" ei={1.0} d={1} />
          <mesh position={[0, 0, len / 2]} rotation={[PI / 2, 0, 0]}><cylinderGeometry args={[0.42, 0.06, len, 16, 1, true]} />
            <meshBasicMaterial color="#ffe6a8" transparent opacity={0.16} depthWrite={false} side={THREE.DoubleSide} toneMapped={false} /></mesh>
        </group>
      </group>
    </group>
  );
};

/* ---------- Reloj de 24 horas en el piso: un anillo que se completa (al día siguiente), sin números ---------- */
export const Dial: React.FC<P> = ({ t, p }) => {
  const { r = 0.55, at = 0, dur = 1.0 } = p; const k = eio(clamp((t - at) / dur));
  return (
    <group rotation={[-PI / 2, 0, 0]} position={[0, 0.02, 0]}>
      <mesh><ringGeometry args={[r * 0.82, r, 40]} /><meshStandardMaterial color="#263050" /></mesh>
      {k > 0.001 && <mesh position={[0, 0, 0.003]} rotation={[0, 0, PI / 2]}><ringGeometry args={[r * 0.82, r, 40, 1, 0, -Math.max(0.01, k * PI * 2)]} />
        <meshStandardMaterial color={AMBER} emissive={AMBER} emissiveIntensity={0.8} /></mesh>}
      <group rotation={[0, 0, PI / 2 - k * PI * 2]} position={[0, 0, 0.01]}><mesh position={[r * 0.4, 0, 0]}><boxGeometry args={[r * 0.8, 0.04, 0.02]} /><M c="#fff4e0" e="#fff4e0" ei={0.4} /></mesh></group>
      {/* luna que se va y sol que llega, chiquitos, sobre el anillo */}
      <mesh position={[0, 0, 0.02]}><circleGeometry args={[0.06, 10]} /><M c="#fff4e0" /></mesh>
    </group>
  );
};

/* ---------- Barritas de resultados (vistas, me gusta, comentarios, compartidos) sin números ---------- */
export const Stats: React.FC<P> = ({ t, p }) => {
  const { at = 0, vals = [0.8, 0.55, 0.3, 0.45], cols = [CORAL, '#ff8fb0', AMBER, TEAL], k: kk = 0.6 } = p;
  return (
    <group>{vals.map((v: number, i: number) => { const k = eo(clamp((t - at - i * 0.12) / 0.6)); const hh = Math.max(0.001, v * kk * k);
      return <group key={i} position={[(i - (vals.length - 1) / 2) * 0.17, 0, 0]}>
        <B s={[0.12, hh, 0.12]} pos={[0, hh / 2, 0]} c={cols[i]} e={cols[i]} ei={0.45} />
      </group>; })}</group>
  );
};

/* ---------- Celular genérico: pantalla OSCURA (nada claro bajo los subtítulos) con play, ojito de vistas y barritas ---------- */
export const Phone: React.FC<P> = ({ t, p }) => {
  const { at = 0, grow = 0.6 } = p; const k = eo(clamp((t - at) / 1.2));
  return (
    <group>
      <B s={[0.62, 1.15, 0.06]} c="#1b2233" />
      <B s={[0.54, 1.0, 0.01]} pos={[0, 0.0, 0.032]} c="#0c1630" e="#10224a" ei={0.6} />
      <group position={[0.01, 0.16, 0.042]} rotation={[0, 0, PI / 2]}><mesh rotation={[PI / 2, 0, 0]}><cylinderGeometry args={[0.11, 0.11, 0.01, 3]} /><M c={CORAL} e={CORAL} ei={0.6} /></mesh></group>
      {/* ojito (vistas) */}
      <group position={[-0.17, -0.28, 0.04]}>
        <mesh scale={[1.5, 1, 1]}><torusGeometry args={[0.04, 0.012, 6, 14]} /><M c="#dfe6ff" e="#dfe6ff" ei={0.3} /></mesh>
        <Ball r={0.018} c="#dfe6ff" e="#dfe6ff" ei={0.3} d={0} />
      </group>
      {/* contador genérico: segmentos que se van prendiendo */}
      {Array.from({ length: 5 }, (_, i) => { const lit = k * 5 * grow > i; return <B key={i} s={[0.05, 0.07, 0.01]} pos={[-0.06 + i * 0.065, -0.28, 0.04]} c={lit ? AMBER : '#26314f'} e={AMBER} ei={lit ? 0.6 : 0} />; })}
      <B s={[0.16, 0.02, 0.01]} pos={[0, 0.5, 0.035]} c="#26314f" />
    </group>
  );
};

/* ---------- Anillo de luz en el piso ---------- */
export const Halo: React.FC<P> = ({ t, tt, p }) => {
  const { r = 0.6, c = TEAL } = p; const k = eo(clamp(tt / 0.5));
  return <mesh rotation={[-PI / 2, 0, 0]} position={[0, 0.015, 0]} scale={[k, k, k]}><ringGeometry args={[r * 0.86, r, 40]} />
    <meshStandardMaterial color={c} emissive={c} emissiveIntensity={0.9 + Math.sin(t * 4) * 0.15} transparent opacity={0.9} /></mesh>;
};

export const EXTRA = { world: World, folk: Folk, group: Group, bubble: Bubble, glass: Glass, cut: Cut, plane: Plane, screen: Screen, viewers: Viewers,
  gate: Gate, bridge: Bridge, month: Month, beacon: Beacon, dial: Dial, stats: Stats, phone2: Phone, halo: Halo };
