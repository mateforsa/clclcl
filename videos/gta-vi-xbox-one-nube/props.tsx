import React from 'react';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';
import { M, useTex } from '../../src/kit/Props';
import { clamp, eio, eo, lerp, pop, rnd } from '../../src/kit/math';

// Look propio: living de noche (piso de madera oscura, pared azul petróleo, lámpara de pie cálida) con una consola vieja sobre un
// mueble bajo. Por una ventana se ve, a lo lejos, una nube con un servidor adentro; un haz de datos cian une la consola con la nube
// (pasa por el hueco de la ventana, nunca por la pared). Distinto de la ciudad de noche de reels-1000-vistas y de los GTA anteriores
// (grilla violeta / interiores lila).
// Consolas genéricas low-poly SIN logos: la nueva es un cubo blanco chico con una rejilla negra redonda; la vieja es una caja ancha y
// chata gris clara con una franja negra. La tele muestra una ciudad genérica de noche (nada del juego). Sin carteles 3D con texto.
// QC (solo con window.__QCF, nunca en el render): los objetos clave se pintan magenta plano para medir si una placa los tapa.
// Velo `Shade` (de litio-pileta-salar): pegado a la cámara, oscurece el tercio superior; la franja de subtítulos nunca queda clara.
type P = { t: number; tt: number; p: any };
type V3 = [number, number, number];
const PI = Math.PI;

const KeyCtx = React.createContext(false);
const qc = () => typeof window !== 'undefined' && !!(window as any).__QCF;
export const Key: React.FC<{ children: React.ReactNode; on?: boolean }> = ({ children, on = true }) =>
  on ? <KeyCtx.Provider value={true}>{children}</KeyCtx.Provider> : <>{children}</>;
const Mat: React.FC<{ c: string; e?: string; ei?: number; o?: number; basic?: boolean }> = ({ c, e, ei, o, basic }) => {
  const key = React.useContext(KeyCtx);
  if (key && qc()) return <meshBasicMaterial color="#ff00ff" toneMapped={false} fog={false} />;
  if (basic) return <meshBasicMaterial color={c} toneMapped={false} transparent={o !== undefined} opacity={o ?? 1} depthWrite={o === undefined} />;
  return <M c={c} e={e} ei={ei} o={o} />;
};
const B: React.FC<{ s: V3; pos?: V3; rot?: V3; c: string; e?: string; ei?: number; o?: number; basic?: boolean }> = ({ s, pos, rot, ...m }) => (
  <mesh position={pos} rotation={rot}><boxGeometry args={s} /><Mat {...m} /></mesh>
);
const Cyl: React.FC<{ r: number; r2?: number; h: number; pos?: V3; rot?: V3; seg?: number; c: string; e?: string; ei?: number; o?: number; basic?: boolean }> = ({ r, r2, h, pos, rot, seg = 12, ...m }) => (
  <mesh position={pos} rotation={rot}><cylinderGeometry args={[r2 ?? r, r, h, seg]} /><Mat {...m} /></mesh>
);
const Ball: React.FC<{ r: number; pos?: V3; c: string; e?: string; ei?: number; o?: number; d?: number; basic?: boolean; sc?: V3 }> = ({ r, pos, d = 0, sc, ...m }) => (
  <mesh position={pos} scale={sc}><icosahedronGeometry args={[r, d]} /><Mat {...m} /></mesh>
);
const rod = (a: V3, b: V3, r: number, c: string, key?: string | number, basic = false, o?: number) => {
  const dx = b[0] - a[0], dy = b[1] - a[1], dz = b[2] - a[2]; const L = Math.hypot(dx, dy, dz) || 1e-4;
  const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(dx / L, dy / L, dz / L)); const eu = new THREE.Euler().setFromQuaternion(q);
  return <mesh key={key} position={[(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2]} rotation={[eu.x, eu.y, eu.z]}><cylinderGeometry args={[r, r, L, 6]} /><Mat c={c} basic={basic} o={o} /></mesh>;
};
/** punto a lo largo de una polilínea, u en [0,1] por longitud */
const along = (pts: V3[], u: number): V3 => {
  const L: number[] = [0]; for (let i = 1; i < pts.length; i++) L.push(L[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1], pts[i][2] - pts[i - 1][2]));
  const d = clamp(u) * L[L.length - 1]; let i = 1; while (i < pts.length - 1 && L[i] < d) i++;
  const k = (d - L[i - 1]) / Math.max(1e-6, L[i] - L[i - 1]); const a = pts[i - 1], b = pts[i];
  return [lerp(a[0], b[0], k), lerp(a[1], b[1], k), lerp(a[2], b[2], k)];
};
/** curva por tramos [[t, v], ...] con easing: continua, sin saltos */
const curve = (kf: [number, number][], t: number) => {
  if (!kf.length) return 0; if (t <= kf[0][0]) return kf[0][1];
  for (let i = 1; i < kf.length; i++) if (t < kf[i][0]) { const [t0, v0] = kf[i - 1], [t1, v1] = kf[i]; return lerp(v0, v1, eio((t - t0) / (t1 - t0))); }
  return kf[kf.length - 1][1];
};
/** sub-polilínea entre u0 y u1 (para que el haz "crezca") */
const subPath = (pts: V3[], u1: number, n = 24): V3[] => Array.from({ length: n + 1 }, (_, i) => along(pts, (i / n) * u1));

export const WOOD = '#3a2a22', WALL = '#173544', WALL2 = '#122a37', TRIM = '#0d1f29', CYAN = '#27e0d8', GOLD = '#ffb52e', RED = '#ff3b4e';
export const WHITE = '#e9edf1', OLDC = '#c9ccd0', DARK = '#16181c';

/* ---------- Layout fijo del living (coordenadas compartidas por todos los planos) ---------- */
export const L = {
  wallZ: -2.4,
  win: { x0: 0.35, x1: 1.75, y0: 0.75, y1: 2.15 },          // hueco de la ventana en la pared del fondo
  stand: { x: -0.6, z: -1.95, w: 1.5, d: 0.45, h: 0.36 },    // mueble bajo de la tele
  tv: { x: -0.75, y: 0.68, z: -2.12, w: 0.84, h: 0.5 },
  newc: { x: -1.08, z: -1.88 }, oldc: { x: -0.32, z: -1.88 },
  cloud: { x: 2.3, y: 1.55, z: -10 },
};
// haz: sale de la parte de atrás de la consola vieja, sube por el costado del mueble y sale por la ventana hacia la nube
export const BEAM: V3[] = [[-0.08, 0.41, -1.95], [0.2, 0.55, -2.05], [0.62, 1.15, -2.3], [0.9, 1.35, -2.6], [L.cloud.x - 0.15, L.cloud.y - 0.05, L.cloud.z + 0.6]];

/* ---------- Velo oscuro pegado a la cámara (igual que litio-pileta-salar) ---------- */
const Shade: React.FC<{ y1?: number; a?: number }> = ({ y1 = 640, a = 0.9 }) => {
  const { camera } = useThree();
  const tex = useTex((g, W, H) => {
    g.clearRect(0, 0, W, H);
    for (let y = 0; y < H; y++) { const px = (y / H) * y1; const k = px < 430 ? 1 : 1 - clamp((px - 430) / (y1 - 430)); const al = a * (k * k * (3 - 2 * k));
      g.fillStyle = `rgba(5,9,16,${al})`; g.fillRect(0, y, W, 1); }
  }, 4, 256, 'nubeshade' + y1 + a);
  const geo = React.useMemo(() => new THREE.PlaneGeometry(1, 1), []);
  camera.updateMatrixWorld();
  const yb = 1 - (2 * y1) / 1920; const pos = geo.attributes.position as THREE.BufferAttribute;
  const pts: [number, number][] = [[-1.1, 1.1], [1.1, 1.1], [-1.1, yb], [1.1, yb]];
  pts.forEach(([x, y], i) => { const v = new THREE.Vector3(x, y, -0.9).unproject(camera); pos.setXYZ(i, v.x, v.y, v.z); });
  pos.needsUpdate = true; geo.computeBoundingSphere();
  return <mesh geometry={geo} frustumCulled={false} renderOrder={999}>
    <meshBasicMaterial map={tex} transparent depthTest={false} depthWrite={false} toneMapped={false} fog={false} /></mesh>;
};

/* ---------- Nube con servidor, a lo lejos ---------- */
const CLOUD_PUFFS: [number, number, number, number][] = [[0, 0, 0, 0.75], [-0.75, -0.15, 0.1, 0.55], [0.78, -0.12, 0.05, 0.6], [-0.35, 0.38, -0.1, 0.55], [0.4, 0.35, -0.1, 0.5], [0, -0.35, 0.25, 0.55], [-1.2, -0.35, 0, 0.35], [1.25, -0.32, 0, 0.38]];
export const CloudServer: React.FC<P> = ({ t, p }) => {
  const glow = p.glow ?? 0.5; const pulse = 0.5 + 0.5 * Math.sin(t * 2.2);
  return (
    <group>
      {CLOUD_PUFFS.map(([x, y, z, r], i) => <Ball key={i} r={r} pos={[x, y + Math.sin(t * 0.6 + i) * 0.03, z]} c="#33506b" e="#1d3d57" ei={0.6 + glow * 0.4 * pulse} d={1} />)}
      <Key>
        {/* servidor colgado debajo de la nube */}
        <group position={[0, -1.05, 0.35]}>
          <B s={[0.7, 0.95, 0.5]} c="#1c2430" />
          {Array.from({ length: 5 }, (_, i) => { const on = Math.sin(t * (6 + i) + i * 1.7) > -0.2; const col = i % 2 ? CYAN : '#3ee07a';
            return <group key={i}><B s={[0.6, 0.12, 0.02]} pos={[0, -0.36 + i * 0.18, 0.26]} c="#0f141b" />
              <B s={[0.06, 0.05, 0.02]} pos={[-0.22, -0.36 + i * 0.18, 0.275]} c={col} e={col} ei={on ? 2.2 : 0.3} />
              <B s={[0.26, 0.03, 0.02]} pos={[0.1, -0.36 + i * 0.18, 0.275]} c="#2c3f55" /></group>; })}
        </group>
      </Key>
    </group>
  );
};

/* ---------- Mundo: living de noche ----------
   p: shadeY, shadeA, noShade, lamp (0..1), noCloud, cloudGlow */
export const World: React.FC<P> = ({ t, p }) => {
  const sky = useTex((g, W, H) => {
    const gr = g.createLinearGradient(0, H, 0, 0);
    [[0, '#1a2a44'], [0.22, '#13213a'], [0.5, '#0a1428'], [1, '#050a16']].forEach(([f, c]) => gr.addColorStop(f as number, c as string));
    g.fillStyle = gr; g.fillRect(0, 0, W, H);
    const r = rnd(5); g.fillStyle = '#cfe2ff'; for (let i = 0; i < 90; i++) { g.globalAlpha = 0.2 + r() * 0.5; g.fillRect(r() * W, H * 0.35 + r() * H * 0.65, 2, 2); }
    g.globalAlpha = 1;
    // lomas oscuras con lucecitas lejanas abajo
    g.fillStyle = '#0a1220'; g.beginPath(); g.moveTo(0, H); for (let x = 0; x <= W; x += 16) g.lineTo(x, H * 0.86 - Math.sin(x * 0.012) * 18 - Math.sin(x * 0.031) * 8); g.lineTo(W, H); g.fill();
    for (let i = 0; i < 40; i++) { g.fillStyle = i % 3 ? '#ffcf7a' : '#9fd8ff'; g.globalAlpha = 0.35 + r() * 0.4; g.fillRect(r() * W, H * 0.9 + r() * H * 0.08, 2, 2); }
    g.globalAlpha = 1;
  }, 256, 512, 'nubesky');
  const floor = useTex((g, W, H) => {
    g.fillStyle = WOOD; g.fillRect(0, 0, W, H); const r = rnd(9);
    for (let i = 0; i < 16; i++) { g.fillStyle = i % 2 ? '#34251e' : '#402e25'; g.fillRect(0, (i * H) / 16, W, H / 16 - 2); g.fillStyle = '#21160f'; g.fillRect(0, ((i + 1) * H) / 16 - 2, W, 2);
      for (let k = 0; k < 3; k++) g.fillRect(r() * W, (i * H) / 16, 2, H / 16); }
  }, 512, 512, 'nubefloor');
  const lamp = p.lamp ?? 1; const { win, wallZ } = L;
  const wallT = 0.12, WW = 9, WH = 5;
  return (
    <group>
      <color attach="background" args={['#05080f']} />
      <fog attach="fog" args={['#05080f', 12, 30]} />
      {/* afuera: cielo nocturno y nube lejana */}
      <mesh position={[0, 3, -16]}><planeGeometry args={[30, 16]} /><meshBasicMaterial map={sky} toneMapped={false} fog={false} /></mesh>
      {!p.noCloud && <group position={[L.cloud.x, L.cloud.y + 0.55, L.cloud.z]}><CloudServer t={t} tt={t} p={{ glow: p.cloudGlow ?? 0.5 }} /></group>}
      {/* piso y alfombra */}
      <mesh rotation={[-PI / 2, 0, 0]} position={[0, 0.003, 1.6]}><planeGeometry args={[WW, 8]} /><meshStandardMaterial map={floor} roughness={0.9} /></mesh>
      <mesh rotation={[-PI / 2, 0, 0]} position={[-0.4, 0.008, 0.2]}><planeGeometry args={[2.6, 1.7]} /><M c="#2a3550" /></mesh>
      <mesh rotation={[-PI / 2, 0, 0]} position={[-0.4, 0.009, 0.2]}><ringGeometry args={[0.7, 0.74, 32]} /><M c="#3a4a6c" /></mesh>
      {/* pared del fondo con el hueco de la ventana */}
      <B s={[win.x0 + WW / 2, WH, wallT]} pos={[(win.x0 - WW / 2) / 2, WH / 2, wallZ]} c={WALL} />
      <B s={[WW / 2 - win.x1, WH, wallT]} pos={[(win.x1 + WW / 2) / 2, WH / 2, wallZ]} c={WALL} />
      <B s={[win.x1 - win.x0, win.y0, wallT]} pos={[(win.x0 + win.x1) / 2, win.y0 / 2, wallZ]} c={WALL} />
      <B s={[win.x1 - win.x0, WH - win.y1, wallT]} pos={[(win.x0 + win.x1) / 2, (win.y1 + WH) / 2, wallZ]} c={WALL} />
      {/* marco de la ventana (sin travesaños en el medio: el haz pasa limpio) */}
      <B s={[win.x1 - win.x0 + 0.1, 0.05, 0.16]} pos={[(win.x0 + win.x1) / 2, win.y0, wallZ + 0.02]} c={TRIM} />
      <B s={[win.x1 - win.x0 + 0.1, 0.05, 0.16]} pos={[(win.x0 + win.x1) / 2, win.y1, wallZ + 0.02]} c={TRIM} />
      <B s={[0.05, win.y1 - win.y0, 0.16]} pos={[win.x0, (win.y0 + win.y1) / 2, wallZ + 0.02]} c={TRIM} />
      <B s={[0.05, win.y1 - win.y0, 0.16]} pos={[win.x1, (win.y0 + win.y1) / 2, wallZ + 0.02]} c={TRIM} />
      {/* zócalo y pared lateral izquierda */}
      <B s={[WW, 0.08, 0.03]} pos={[0, 0.04, wallZ + 0.075]} c={TRIM} />
      <B s={[wallT, WH, 6]} pos={[-2.6, WH / 2, 0.6]} c={WALL2} />
      {/* lámpara de pie cálida a la izquierda */}
      <group position={[-1.95, 0, -1.7]}>
        <Cyl r={0.16} h={0.03} pos={[0, 0.015, 0]} c="#22201f" />
        <Cyl r={0.018} h={1.3} pos={[0, 0.67, 0]} c="#22201f" />
        <Cyl r={0.1} r2={0.2} h={0.26} pos={[0, 1.42, 0]} seg={10} c="#e8c58a" e="#ffb45a" ei={0.6 * lamp} />
      </group>
      <pointLight position={[-1.9, 1.25, -1.4]} intensity={6 * lamp} color="#ffb060" distance={5} />
      <pointLight position={[0.9, 1.4, -2.2]} intensity={3} color="#4fd6e8" distance={4} />
      {!p.noShade && <Shade y1={p.shadeY ?? 640} a={p.shadeA ?? 0.92} />}
    </group>
  );
};

/* ---------- Mueble bajo ---------- */
export const Stand: React.FC<P> = () => {
  const { w, d, h } = L.stand;
  return (<group>
    <B s={[w, 0.04, d]} pos={[0, h - 0.02, 0]} c="#4a3a30" />
    <B s={[w, h - 0.08, d - 0.02]} pos={[0, (h - 0.04) / 2 + 0.02, 0]} c="#2b211b" />
    {[-0.37, 0.37].map((x, i) => <B key={i} s={[w / 2 - 0.04, h - 0.14, 0.01]} pos={[x, h / 2, d / 2]} c="#33271f" />)}
    {[-1, 1].map((s) => [-1, 1].map((q) => <B key={s + '' + q} s={[0.04, 0.04, 0.04]} pos={[s * (w / 2 - 0.05), 0.02, q * (d / 2 - 0.05)]} c="#1a1410" />))}
  </group>);
};

/* ---------- Tele con una ciudad genérica de noche ----------
   p: on (bool), img (0..1 tamaño de la imagen: 0,667 = 720 en 1080), steps (array de tiempos en que avanza la imagen), speed */
const CityTex = () => useTex((g, W, H) => {
  const gr = g.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, '#1b2350'); gr.addColorStop(0.55, '#4a2f6b'); gr.addColorStop(0.75, '#b0556a'); gr.addColorStop(1, '#2a1830');
  g.fillStyle = gr; g.fillRect(0, 0, W, H); const r = rnd(17);
  for (let i = 0; i < 44; i++) { const w = 18 + r() * 34, h = 40 + r() * 120, x = (i / 44) * W * 1.02 - 6, y = H * 0.78 - h;
    g.fillStyle = ['#1a1530', '#221a3c', '#151226'][i % 3]; g.fillRect(x, y, w, h);
    for (let yy = y + 6; yy < H * 0.76; yy += 10) for (let xx = x + 4; xx < x + w - 5; xx += 8) if (r() > 0.55) { g.fillStyle = r() > 0.5 ? '#ffd27a' : '#8fd2ff'; g.fillRect(xx, yy, 3, 4); } }
  g.fillStyle = '#121019'; g.fillRect(0, H * 0.78, W, H * 0.22);
  g.fillStyle = '#ffcf6a'; for (let x = 0; x < W; x += 28) g.fillRect(x, H * 0.88, 14, 2);
}, 512, 256, 'nubecity');
export const Tv: React.FC<P> = ({ t, p }) => {
  const { w, h } = L.tv; const tex = CityTex(); const on = p.on ?? true; const img = p.imgKf ? curve(p.imgKf, t) : p.img ?? 1;
  // avance de la imagen: por pasos (cuadros); en `uneven` los pasos llegan desparejos
  let ph = t * (p.speed ?? 0.03);
  if (p.fps && t >= (p.fpsAt ?? 0)) { const f = p.uneven ? Math.floor(t * p.fps + 0.8 * Math.sin(t * 7.3) + 0.6 * Math.sin(t * 2.9)) : Math.floor(t * p.fps); ph = (f / p.fps) * (p.speed ?? 0.03); }
  React.useMemo(() => { tex.wrapS = THREE.RepeatWrapping; }, [tex]);
  tex.offset.x = ph % 1;
  const fl = p.flashAt !== undefined && t >= p.flashAt ? clamp(1 - (t - p.flashAt) / 0.5) : 0; const dim = Math.min(1, (p.dim ?? 0.82) + fl * 0.3);
  return (<group>
    <Key>
      <B s={[w + 0.05, h + 0.05, 0.05]} pos={[0, h / 2, 0]} c="#0c0d10" />
      <mesh position={[0, h / 2, 0.027]}><planeGeometry args={[w - 0.02, h - 0.02]} /><Mat c="#05060a" basic /></mesh>
      {on && <mesh position={[0, h / 2, 0.029]} scale={[img, img, 1]}><planeGeometry args={[w - 0.03, h - 0.03]} />
        {qc() ? <meshBasicMaterial color="#ff00ff" toneMapped={false} /> : <meshBasicMaterial map={tex} color={new THREE.Color(dim, dim, dim)} toneMapped={false} />}</mesh>}
    </Key>
  </group>);
};

/* ---------- Consolas genéricas ---------- */
export const NewConsole: React.FC<P> = ({ t, p }) => (
  <Key on={p.key ?? true}><group>
    <B s={[0.17, 0.27, 0.24]} pos={[0, 0.135, 0]} c={WHITE} />
    <mesh position={[0.086, 0.15, 0.02]} rotation={[0, PI / 2, 0]}><circleGeometry args={[0.075, 16]} /><Mat c="#111317" /></mesh>
    <B s={[0.012, 0.012, 0.01]} pos={[-0.05, 0.24, 0.121]} c={p.on === false ? '#555' : '#e9f6ff'} e={p.on === false ? undefined : '#bfe6ff'} ei={1.2} />
  </group></Key>
);
export const OldConsole: React.FC<P> = ({ t, p }) => {
  const glow = p.glow ?? 0; const pulse = glow * (0.6 + 0.4 * Math.sin(t * 6));
  return (<Key on={p.key ?? true}><group>
    <B s={[0.5, 0.08, 0.32]} pos={[0, 0.04, 0]} c={OLDC} e={CYAN} ei={0.15 * pulse} />
    <B s={[0.5, 0.012, 0.322]} pos={[0, 0.072, 0]} c="#a7abb1" />
    <B s={[0.18, 0.05, 0.005]} pos={[0.12, 0.04, 0.161]} c="#1b1d21" />
    <B s={[0.03, 0.012, 0.006]} pos={[-0.19, 0.04, 0.162]} c="#e9f6ff" e="#bfe6ff" ei={1} />
    {Array.from({ length: 7 }, (_, i) => <B key={i} s={[0.012, 0.002, 0.2]} pos={[-0.16 + i * 0.03, 0.081, -0.02]} c="#7d828a" />)}
  </group></Key>);
};

/* ---------- Haz de datos (consola <-> nube) ----------
   p: pts, grow [t0, dur], dir (1 = sale de la consola, -1 = vuelve a la consola), n (pulsos), speed, uneven, flicker, frames (cuadritos) */
export const Beam: React.FC<P> = ({ t, p }) => {
  const pts: V3[] = p.pts ?? BEAM; const [g0, gd] = p.grow ?? [-1, 0.001]; const k = eo((t - g0) / gd);
  if (k <= 0.001) return null;
  const path = subPath(pts, k, 30); const col = p.color ?? CYAN;
  let fl = 1; if (p.flicker) { const z = Math.sin(t * 13.1) + Math.sin(t * 7.7 + 1) + Math.sin(t * 3.3); fl = z > 1.1 ? 0.15 : 0.6 + 0.4 * Math.abs(Math.sin(t * 9)); }
  const n = p.n ?? 7; const speed = p.speed ?? 0.45; const dir = p.dir ?? -1;
  const pulses = Array.from({ length: n }, (_, i) => {
    let u = ((t * speed + i / n) % 1 + 1) % 1;
    if (p.uneven) { const j = Math.floor(t * speed * n + i); u = (((t * speed + (i + 0.45 * Math.sin(j * 2.1 + i)) / n) % 1) + 1) % 1; }
    return dir > 0 ? u : 1 - u;
  }).filter((u) => u <= k);
  return (<group>
    {path.slice(1).map((q, i) => rod(path[i], q, 0.008, col, 'c' + i, true, 0.9 * fl))}
    {path.slice(1).map((q, i) => rod(path[i], q, 0.022, col, 'g' + i, true, 0.18 * fl))}
    {pulses.map((u, i) => { const q = along(pts, u); const near = clamp(1 - Math.abs(u - 0.15) * 0.6);
      return p.frames
        ? <mesh key={'f' + i} position={q}><boxGeometry args={[0.07 * (0.5 + near), 0.045 * (0.5 + near), 0.005]} /><meshBasicMaterial color="#ffe0a0" toneMapped={false} transparent opacity={0.9 * fl} /></mesh>
        : <mesh key={'p' + i} position={q}><icosahedronGeometry args={[0.022 * (0.6 + near), 0]} /><meshBasicMaterial color="#d8fbff" toneMapped={false} transparent opacity={0.95 * fl} /></mesh>; })}
  </group>);
};

/* ---------- Señal que viaja una vez por un camino (plano 8) ---------- */
export const Signal: React.FC<P> = ({ t, p }) => {
  const [a, d] = p.run as [number, number]; if (t < a || t > a + d + 0.05) return null; const u = clamp((t - a) / d);
  const q = along(p.pts, u); const trail = [0.03, 0.06, 0.09].map((k) => along(p.pts, Math.max(0, u - k)));
  return (<group>
    <mesh position={q}><icosahedronGeometry args={[0.04, 1]} /><meshBasicMaterial color="#fff6c8" toneMapped={false} /></mesh>
    {trail.map((r, i) => <mesh key={i} position={r}><icosahedronGeometry args={[0.03 - i * 0.007, 0]} /><meshBasicMaterial color={GOLD} toneMapped={false} transparent opacity={0.7 - i * 0.2} /></mesh>)}
  </group>);
};

/* ---------- Cronómetro (sin números: el dato va en la placa) ----------
   p: run [t0, t1] (la aguja gira y se frena), color, total (vueltas) */
export const Stopwatch: React.FC<P> = ({ t, p }) => {
  const col = p.color ?? CYAN; const [r0, r1] = p.run ?? [0, 1.5]; const turns = p.total ?? 0.5;
  const a = -2 * PI * turns * eio((t - r0) / Math.max(0.01, r1 - r0)) * 1; const stopped = t >= r1;
  const flash = stopped ? clamp(1 - (t - r1) / 0.5) : 0;
  return (<group>
    <mesh rotation={[PI / 2, 0, 0]}><cylinderGeometry args={[0.2, 0.2, 0.05, 28]} /><Mat c="#20262e" /></mesh>
    <mesh position={[0, 0, 0.026]}><circleGeometry args={[0.175, 28]} /><Mat c="#cfd6df" /></mesh>
    <mesh position={[0, 0, 0.028]}><ringGeometry args={[0.175, 0.2, 28]} /><Mat c={col} e={col} ei={0.8 + flash * 1.5} /></mesh>
    {Array.from({ length: 12 }, (_, i) => <B key={i} s={[0.012, 0.03, 0.004]} pos={[Math.sin((i * PI) / 6) * 0.15, Math.cos((i * PI) / 6) * 0.15, 0.03]} rot={[0, 0, -(i * PI) / 6]} c="#3a4350" />)}
    <group position={[0, 0, 0.034]} rotation={[0, 0, a]}><B s={[0.012, 0.15, 0.006]} pos={[0, 0.06, 0]} c={RED} e={RED} ei={0.6} /></group>
    <Cyl r={0.018} h={0.01} pos={[0, 0, 0.036]} rot={[PI / 2, 0, 0]} c="#20262e" />
    <B s={[0.05, 0.05, 0.04]} pos={[0, 0.225, 0]} c="#20262e" />
    <B s={[0.08, 0.025, 0.04]} pos={[0, 0.258, 0]} c={col} />
  </group>);
};

/* ---------- Control genérico ----------
   p: press [tiempos], cable (punto final del cable en coords locales), held */
export const Pad: React.FC<P> = ({ t, p }) => {
  const press: number[] = p.press ?? []; const down = press.some((q) => t >= q && t < q + 0.25); const glow = press.reduce((m, q) => Math.max(m, t >= q ? clamp(1 - (t - q) / 0.6) : 0), 0);
  return (<Key><group>
    <B s={[0.3, 0.06, 0.15]} pos={[0, 0, 0]} c="#2a2e35" />
    {[-1, 1].map((s) => <B key={s} s={[0.09, 0.055, 0.14]} pos={[s * 0.13, -0.006, 0.06]} rot={[0.25, 0, s * 0.18]} c="#2a2e35" />)}
    <Cyl r={0.022} h={0.02} pos={[-0.07, 0.038, -0.01]} c="#15171b" />
    <Cyl r={0.022} h={0.02} pos={[0.035, 0.038, 0.035]} c="#15171b" />
    {[[0.085, -0.03, '#3ee07a'], [0.115, -0.005, RED], [0.055, -0.005, '#3a8dff'], [0.085, 0.02, GOLD]].map(([x, z, c], i) =>
      <Cyl key={i} r={0.011} h={0.012} pos={[x as number, i === 0 && down ? 0.026 : 0.034, z as number]} c={c as string} e={c as string} ei={i === 0 ? 0.3 + glow * 2.5 : 0.25} />)}
    {p.cable && rod([0, 0, -0.075], [0, 0, -0.16], 0.008, '#15171b', 'cb')}
  </group></Key>);
};

/* ---------- Persona genérica (sin cara) con material de QC ---------- */
export const Guy: React.FC<P> = ({ t, p }) => {
  const { shirt = '#3a8dff', pants = '#23283a', skin = '#e0b088', hair = '#2a1d14' } = p; const sway = Math.sin(t * 2.2);
  const sit = p.pose === 'sit';
  return (<Key><group position={[0, sit ? -0.3 : sway * 0.01, 0]}>
    {[-1, 1].map((sd) => (
      <group key={sd} position={[0.12 * sd, 0.7, 0]} rotation={[sit ? -1.5 : 0, 0, 0]}>
        <B s={[0.17, 0.7, 0.19]} pos={[0, -0.35, 0]} c={pants} />
        {!sit && <B s={[0.18, 0.09, 0.26]} pos={[0, -0.68, 0.04]} c="#15102b" />}
      </group>))}
    {sit && [-1, 1].map((sd) => <group key={'l' + sd} position={[0.12 * sd, 0.7, 0.62]}><B s={[0.17, 0.66, 0.19]} pos={[0, -0.33, 0]} c={pants} /><B s={[0.18, 0.09, 0.26]} pos={[0, -0.64, 0.04]} c="#15102b" /></group>)}
    <group position={[0, 0.7, 0]} rotation={[0, 0, sway * 0.012]}>
      <B s={[0.52, 0.62, 0.29]} pos={[0, 0.32, 0]} c={shirt} />
      {[-1, 1].map((sd) => <group key={'a' + sd} position={[0.33 * sd, 0.58, 0]} rotation={[-1.0 + Math.sin(t * 3 + sd) * 0.03, 0, sd * 0.25]}>
        <B s={[0.13, 0.5, 0.14]} pos={[0, -0.22, 0]} c={shirt} /><B s={[0.12, 0.12, 0.13]} pos={[0, -0.52, 0]} c={skin} /></group>)}
      <group position={[0, 0.84, 0]} rotation={[0.08, sway * 0.04, 0]}>
        <B s={[0.37, 0.36, 0.34]} c={skin} />
        <B s={[0.39, 0.13, 0.36]} pos={[0, 0.2, -0.005]} c={hair} />
      </group>
    </group>
  </group></Key>);
};
export const Couch: React.FC<P> = () => (<group>
  <B s={[1.7, 0.4, 0.8]} pos={[0, 0.2, 0]} c="#3b3f5c" />
  <B s={[1.7, 0.55, 0.2]} pos={[0, 0.55, -0.32]} c="#343852" />
  {[-1, 1].map((s) => <B key={s} s={[0.18, 0.55, 0.8]} pos={[s * 0.85, 0.3, 0]} c="#2f3349" />)}
  {[-0.4, 0.4].map((x, i) => <B key={i} s={[0.75, 0.08, 0.66]} pos={[x, 0.44, 0.05]} c="#454a6a" />)}
</group>);

/* ---------- Caja de juego genérica (sin texto ni arte del juego) ---------- */
export const Case: React.FC<P> = ({ t }) => {
  const cover = useTex((g, W, H) => {
    const gr = g.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, '#ff6aa8'); gr.addColorStop(0.55, '#ff9a4a'); gr.addColorStop(1, '#3a1f5c'); g.fillStyle = gr; g.fillRect(0, 0, W, H);
    g.fillStyle = '#ffe08a'; g.beginPath(); g.arc(W * 0.5, H * 0.52, W * 0.22, 0, PI * 2); g.fill();
    g.fillStyle = '#2a1840'; g.fillRect(0, H * 0.62, W, H * 0.38);
  }, 128, 180, 'nubecase');
  return (<group rotation={[0, Math.sin(t * 1.2) * 0.12, 0]}>
    <B s={[0.3, 0.42, 0.035]} c="#1b2a6b" />
    <mesh position={[0, 0, 0.0185]}><planeGeometry args={[0.27, 0.39]} /><meshStandardMaterial map={cover} roughness={0.8} /></mesh>
  </group>);
};
/* barra de instalación que se traba y se pone roja */
export const Install: React.FC<P> = ({ t, p }) => {
  const [a, b] = p.fill ?? [0, 1]; const k = eo((t - a) / Math.max(0.01, b - a)) * (p.max ?? 0.35); const fail = t >= (p.fail ?? 99);
  return (<group>
    <B s={[0.62, 0.07, 0.03]} c="#0f141b" />
    <B s={[0.6 * Math.max(0.002, k), 0.05, 0.035]} pos={[-0.3 + 0.3 * k, 0, 0.003]} c={fail ? RED : CYAN} e={fail ? RED : CYAN} ei={1} />
  </group>);
};

/* ---------- Medición: cámara rápida en trípode apuntando a la tele ---------- */
export const Rig: React.FC<P> = ({ t }) => (<group>
  {[0, 2.1, 4.2].map((a, i) => rod([0, 0.9, 0], [Math.sin(a) * 0.22, 0, Math.cos(a) * 0.22], 0.01, '#2a2e35', i))}
  <B s={[0.2, 0.14, 0.26]} pos={[0, 0.98, 0]} c="#1b1d21" />
  <Cyl r={0.05} h={0.12} pos={[0, 0.98, -0.18]} rot={[PI / 2, 0, 0]} c="#2a2e35" />
  <B s={[0.03, 0.03, 0.01]} pos={[0.07, 1.03, 0.131]} c={RED} e={RED} ei={Math.sin(t * 8) > 0 ? 2 : 0.2} />
</group>);
/* notebook con un gráfico genérico de líneas (sin texto) */
export const Notebook: React.FC<P> = ({ t, p }) => {
  const k = clamp((t - (p.at ?? 0)) / 1.6);
  const graph = React.useMemo(() => Array.from({ length: 24 }, (_, i) => 0.45 + 0.25 * Math.sin(i * 0.9) * Math.sin(i * 0.37 + 1)), []);
  return (<Key><group>
    <B s={[0.5, 0.02, 0.34]} pos={[0, 0.01, 0]} c="#3a3f48" />
    <group position={[0, 0.02, -0.17]} rotation={[-0.25, 0, 0]}>
      <B s={[0.5, 0.32, 0.015]} pos={[0, 0.16, 0]} c="#3a3f48" />
      <mesh position={[0, 0.16, 0.009]}><planeGeometry args={[0.46, 0.28]} /><Mat c="#0d1a24" basic /></mesh>
      {graph.slice(0, Math.max(2, Math.round(graph.length * k))).map((v, i, arr) => i === 0 ? null :
        rod([-0.21 + ((i - 1) * 0.42) / 23, 0.03 + arr[i - 1] * 0.25, 0.011], [-0.21 + (i * 0.42) / 23, 0.03 + v * 0.25, 0.011], 0.004, i % 2 ? CYAN : CYAN, i, true))}
    </group>
  </group></Key>);
};

/* ---------- Dedo que aprieta (plano 8) ---------- */
export const Finger: React.FC<P> = ({ t, p }) => {
  const press: number = p.press ?? 1; const d = t < press ? eio((t - (press - 0.5)) / 0.5) : 1 - eio((t - press - 0.25) / 0.4);
  return (<Key><group position={[0, 0.1 - 0.06 * clamp(d), 0]}>
    <B s={[0.035, 0.1, 0.04]} pos={[0, 0.05, 0]} c="#e0b088" />
    <B s={[0.12, 0.08, 0.14]} pos={[0.03, 0.12, 0.05]} c="#e0b088" />
    <group position={[0.05, 0.14, 0.11]} rotation={[0.9, 0, 0]}><B s={[0.09, 0.08, 0.22]} pos={[0, 0, 0.11]} c="#3a8dff" /></group>
  </group></Key>);
};

/* ---------- Barras de tiempo (plano 9): largo proporcional a 175,2 y 184,5 ms ---------- */
export const TimeBars: React.FC<P> = ({ t, p }) => {
  const S = p.scale ?? 1.6 / 184.5; const a = p.at ?? 0; const g = p.gap ?? 1.3; const x0 = p.x0 ?? -0.7;
  const k1 = eo((t - a) / 0.7), k2 = eo((t - a - 0.15) / 0.7); const d = eo((t - g) / 0.5);
  const L1 = 175.2 * S, L2 = 184.5 * S;
  return (<group>
    <Key>
      <B s={[Math.max(0.002, L1 * k1), 0.12, 0.12]} pos={[x0 + (L1 * k1) / 2, 0.3, 0]} c={WHITE} />
      <B s={[Math.max(0.002, L1 * k2), 0.12, 0.12]} pos={[x0 + (L1 * k2) / 2, 0.0, 0]} c={OLDC} />
      {d > 0 && <B s={[Math.max(0.002, (L2 - L1) * d), 0.13, 0.13]} pos={[x0 + L1 + ((L2 - L1) * d) / 2, 0.0, 0]} c={GOLD} e={GOLD} ei={1} />}
    </Key>
    <B s={[0.01, 0.6, 0.01]} pos={[x0 + L1, 0.15, 0.07]} c="#7d828a" />
  </group>);
};

/* ---------- Conexión: caja de fibra, cable de red, router wifi ---------- */
export const FiberBox: React.FC<P> = ({ t }) => (<Key><group>
  <B s={[0.2, 0.26, 0.06]} c="#dfe3e8" />
  <B s={[0.025, 0.025, 0.01]} pos={[-0.05, 0.08, 0.031]} c="#3ee07a" e="#3ee07a" ei={Math.sin(t * 5) > -0.3 ? 2 : 0.3} />
  <B s={[0.025, 0.025, 0.01]} pos={[0.0, 0.08, 0.031]} c="#3ee07a" e="#3ee07a" ei={1.5} />
  <B s={[0.05, 0.035, 0.01]} pos={[0, -0.08, 0.031]} c="#202328" />
</group></Key>);
export const Cable: React.FC<P> = ({ t, p }) => {
  const pts: V3[] = p.pts; const [g0, gd] = p.grow ?? [-1, 0.001]; const k = eo((t - g0) / gd); if (k <= 0.001) return null;
  const path = subPath(pts, k, 20); const lit = p.lit !== undefined && t >= p.lit ? clamp((t - p.lit) / 0.3) : 0;
  return (<Key>{path.slice(1).map((q, i) => rod(path[i], q, p.r ?? 0.012, lit > 0 ? (p.litColor ?? GOLD) : (p.color ?? '#2a6bd8'), i, lit > 0))}</Key>);
};
export const Router: React.FC<P> = ({ t, p }) => {
  const on = p.waves ?? true;
  return (<group>
    <Key>
      <B s={[0.3, 0.06, 0.2]} pos={[0, 0.03, 0]} c="#1f232a" />
      {[-0.11, 0.11].map((x, i) => <B key={i} s={[0.02, 0.2, 0.02]} pos={[x, 0.16, -0.08]} rot={[0, 0, (i ? -1 : 1) * 0.15]} c="#1f232a" />)}
      {[0, 1, 2, 3].map((i) => <B key={'l' + i} s={[0.02, 0.012, 0.01]} pos={[-0.09 + i * 0.05, 0.04, 0.101]} c="#3ee07a" e="#3ee07a" ei={Math.sin(t * 9 + i * 2) > 0 ? 2 : 0.2} />)}
    </Key>
    {on && [0, 1, 2].map((i) => { const u = ((t * 0.9 + i / 3) % 1); const r = 0.12 + u * 0.4;
      return <mesh key={'w' + i} position={[0, 0.12, 0]} rotation={[0, 0, PI / 2 - 0.7]}><torusGeometry args={[r, 0.008, 4, 18, 1.4]} /><meshBasicMaterial color={CYAN} transparent opacity={0.8 * (1 - u)} toneMapped={false} /></mesh>; })}
  </group>);
};

/* ---------- Señal de "elegí": aro en el piso ---------- */
export const Halo: React.FC<P> = ({ t, tt, p }) => {
  const col = p.color ?? GOLD; const pu = 1 + Math.sin(t * 4) * 0.04;
  return (<group rotation={[-PI / 2, 0, 0]} scale={pu}>
    <mesh><ringGeometry args={[p.r ?? 0.3, (p.r ?? 0.3) + 0.03, 32]} /><meshBasicMaterial color={col} toneMapped={false} transparent opacity={0.9} /></mesh>
  </group>);
};

export const EXTRA = { world: World, stand: Stand, tv: Tv, newc: NewConsole, oldc: OldConsole, beam: Beam, watch: Stopwatch, pad: Pad, guy: Guy, couch: Couch,
  case: Case, install: Install, rig: Rig, notebook: Notebook, finger: Finger, timebars: TimeBars, fiber: FiberBox, cable: Cable, router: Router, halo: Halo,
  cloud: CloudServer, signal: Signal, table: (({ p }: P) => <B s={p.size ?? [0.6, 0.3, 0.4]} pos={[0, (p.size?.[1] ?? 0.3) / 2, 0]} c={p.color ?? '#2b211b'} />) as React.FC<P> };
