import React from 'react';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';
import { M, useTex } from '../../src/kit/Props';
import { clamp, eio, eo, lerp, rnd } from '../../src/kit/math';

// Look propio: mar austral frío, gris verdoso, cielo cubierto que se oscurece arriba (ahí van los subtítulos). Vista de superficie
// o corte bajo el agua (cara frontal del diorama en z = CUTZ): columna de agua de 70 m, lecho marino y estratos de roca con los
// pozos horizontales dibujados en la cara del corte. Escala: 1 unidad = 28 m (70 m de agua = 2,5 u; barcos de 308 m = 11 u).
// Todo va por encima del piso del set 'room' (y = 0): la roca ocupa 0..SB, el agua SB..SEA.
// Sin carteles 3D con texto ni logos. QC: con window.__QCF los objetos clave se pintan magenta plano (medición de placas).
type P = { t: number; tt: number; p: any };
type V3 = [number, number, number];
const PI = Math.PI;
export const SB = 1.3, D = 2.5, SEA = SB + D, CUTZ = 0.9, BACK = -3.85;
const qc = () => typeof window !== 'undefined' && (window as any).__QCF;
const KEY = '#ff00ff';

const B: React.FC<{ s: V3; pos?: V3; rot?: V3; c: string; e?: string; ei?: number; o?: number }> = ({ s, pos, rot, c, e, ei, o }) => (
  <mesh position={pos} rotation={rot}><boxGeometry args={s} /><M c={c} e={e} ei={ei} o={o} /></mesh>
);
const Cyl: React.FC<{ r: number; r2?: number; h: number; pos?: V3; rot?: V3; seg?: number; c: string; e?: string; ei?: number; o?: number }> = ({ r, r2, h, pos, rot, seg = 8, c, e, ei, o }) => (
  <mesh position={pos} rotation={rot}><cylinderGeometry args={[r2 ?? r, r, h, seg]} /><M c={c} e={e} ei={ei} o={o} /></mesh>
);
const Ball: React.FC<{ r: number; pos?: V3; c: string; e?: string; ei?: number; o?: number }> = ({ r, pos, c, e, ei, o }) => (
  <mesh position={pos}><icosahedronGeometry args={[r, 0]} /><M c={c} e={e} ei={ei} o={o} /></mesh>
);
/** cilindro de a a b */
const Seg: React.FC<{ a: V3; b: V3; r: number; c: string; e?: string; ei?: number; o?: number; seg?: number }> = ({ a, b, r, c, e, ei, o, seg = 8 }) => {
  const va = new THREE.Vector3(...a), vb = new THREE.Vector3(...b); const len = va.distanceTo(vb); if (len < 1e-4) return null;
  const mid = va.clone().add(vb).multiplyScalar(0.5); const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), vb.clone().sub(va).normalize());
  return <mesh position={mid} quaternion={q}><cylinderGeometry args={[r, r, len, seg]} /><M c={c} e={e} ei={ei} o={o} /></mesh>;
};
/** curva por tramos [[t, v], ...] con easing */
export const curve = (kf: [number, number][], t: number) => {
  if (!kf || !kf.length) return 0; if (t <= kf[0][0]) return kf[0][1];
  for (let i = 1; i < kf.length; i++) if (t < kf[i][0]) { const [t0, v0] = kf[i - 1], [t1, v1] = kf[i]; return lerp(v0, v1, eio((t - t0) / (t1 - t0))); }
  return kf[kf.length - 1][1];
};
/* polilínea: largo, punto a distancia s, recorte hasta fracción k */
const plen = (pts: V3[]) => { let L = 0; for (let i = 1; i < pts.length; i++) L += new THREE.Vector3(...pts[i]).distanceTo(new THREE.Vector3(...pts[i - 1])); return L; };
const pat = (pts: V3[], s: number): V3 => {
  for (let i = 1; i < pts.length; i++) { const a = new THREE.Vector3(...pts[i - 1]), b = new THREE.Vector3(...pts[i]); const l = a.distanceTo(b);
    if (s <= l || i === pts.length - 1) { const v = a.lerp(b, clamp(s / l)); return [v.x, v.y, v.z]; } s -= l; }
  return pts[pts.length - 1];
};
const pcut = (pts: V3[], k: number): V3[] => {
  const L = plen(pts) * clamp(k); if (L <= 0) return []; const out: V3[] = [pts[0]]; let acc = 0;
  for (let i = 1; i < pts.length; i++) { const l = new THREE.Vector3(...pts[i]).distanceTo(new THREE.Vector3(...pts[i - 1]));
    if (acc + l >= L) { out.push(pat(pts, L)); return out; } out.push(pts[i]); acc += l; }
  return out;
};
const Poly: React.FC<{ pts: V3[]; r: number; c: string; e?: string; ei?: number; o?: number }> = ({ pts, r, c, e, ei, o }) => (
  <group>{pts.slice(1).map((b, i) => <Seg key={i} a={pts[i]} b={b} r={r} c={c} e={e} ei={ei} o={o} />)}
    {pts.slice(1, -1).map((q, i) => <mesh key={'j' + i} position={q}><sphereGeometry args={[r, 8, 6]} /><M c={c} e={e} ei={ei} o={o} /></mesh>)}</group>
);
/** burbujas de gas que corren por la polilínea (de pts[0] al final), siempre DENTRO del caño (r < radio del caño) */
const Flow: React.FC<{ pts: V3[]; t: number; n?: number; speed?: number; r?: number; on?: number; c?: string }> = ({ pts, t, n = 8, speed = 0.9, r = 0.022, on = 1, c = '#9ff3ff' }) => {
  const L = plen(pts); if (on <= 0 || L <= 0) return null;
  return <group>{Array.from({ length: n }, (_, i) => { const s = ((t * speed + (i / n) * L) % L + L) % L; return <mesh key={i} position={pat(pts, s)} scale={on}>
    <sphereGeometry args={[r, 8, 6]} /><meshBasicMaterial color={c} toneMapped={false} /></mesh>; })}</group>;
};

/* ---------- Velo oscuro pegado a la cámara: el tercio superior queda oscuro, la franja de subtítulos nunca es clara ---------- */
const Shade: React.FC<{ y1?: number; a?: number }> = ({ y1 = 640, a = 0.92 }) => {
  const { camera } = useThree();
  const tex = useTex((g, W, H) => {
    g.clearRect(0, 0, W, H);
    for (let y = 0; y < H; y++) { const px = (y / H) * y1; const k = px < 430 ? 1 : 1 - clamp((px - 430) / (y1 - 430)); const al = a * (k * k * (3 - 2 * k));
      g.fillStyle = `rgba(5,9,11,${al})`; g.fillRect(0, y, W, 1); }
  }, 4, 256, 'austshade' + y1 + a);
  const geo = React.useMemo(() => new THREE.PlaneGeometry(1, 1), []);
  camera.updateMatrixWorld();
  const yb = 1 - (2 * y1) / 1920; const pos = geo.attributes.position as THREE.BufferAttribute;
  const pts: [number, number][] = [[-1.1, 1.1], [1.1, 1.1], [-1.1, yb], [1.1, yb]];
  pts.forEach(([x, y], i) => { const v = new THREE.Vector3(x, y, -0.9).unproject(camera); pos.setXYZ(i, v.x, v.y, v.z); });
  pos.needsUpdate = true; geo.computeBoundingSphere();
  return <mesh geometry={geo} frustumCulled={false} renderOrder={999}>
    <meshBasicMaterial map={tex} transparent depthTest={false} depthWrite={false} toneMapped={false} fog={false} /></mesh>;
};

/* ---------- Mundo: cielo cubierto + mar gris verdoso; con p.cut, corte frontal con agua, lecho y estratos ---------- */
export const World: React.FC<P> = ({ t, p }) => {
  const cut = !!p.cut;
  const sky = useTex((g, W, H) => {
    const hz = SEA / 16; const gr = g.createLinearGradient(0, H, 0, 0);
    [[0, '#0b1517'], [hz - 0.12, '#13252a'], [hz - 0.004, '#22393c'], [hz, '#8c9e9b'], [hz + 0.025, '#6f8584'], [hz + 0.07, '#47605f'], [hz + 0.16, '#24363a'], [0.55, '#111c20'], [1, '#060a0c']]
      .forEach(([f, c]) => gr.addColorStop(clamp(f as number), c as string));
    g.fillStyle = gr; g.fillRect(0, 0, W, H);
    // nubes bajas planas, apenas más claras, cerca del horizonte
    const r = rnd(4); for (let i = 0; i < 26; i++) { const y = H * (1 - hz - 0.03 - r() * 0.12); g.fillStyle = `rgba(150,170,168,${0.05 + r() * 0.06})`; g.fillRect(r() * W - 40, y, 60 + r() * 140, 5 + r() * 9); }
  }, 256, 1024, 'austsky');
  const waterFace = useTex((g, W, H) => {
    const gr = g.createLinearGradient(0, 0, 0, H); [[0, '#3f6764'], [0.08, '#2e5251'], [0.5, '#1d3a3b'], [1, '#10221f']].forEach(([f, c]) => gr.addColorStop(f as number, c as string));
    g.fillStyle = gr; g.fillRect(0, 0, W, H);
    const r = rnd(8); for (let i = 0; i < 60; i++) { g.fillStyle = `rgba(160,200,196,${0.03 + r() * 0.04})`; g.fillRect(r() * W, r() * H, 2 + r() * 4, 2 + r() * 4); }
  }, 64, 256, 'austwater');
  const rock = useTex((g, W, H) => {
    // estratos (de arriba abajo): sedimento, arcilla gris, arenisca del reservorio (ocre), roca de base
    const L: [number, number, string][] = [[0, 0.16, '#5c5a4c'], [0.16, 0.34, '#4a4a42'], [0.34, 0.47, '#55524a'], [0.47, 0.72, '#7a6a48'], [0.72, 1, '#3c3a36']];
    L.forEach(([a, b, c]) => { g.fillStyle = c; g.fillRect(0, a * H, W, (b - a) * H + 1); });
    const r = rnd(12); for (let i = 0; i < 500; i++) { const y = r() * H; g.fillStyle = `rgba(${r() < 0.5 ? '0,0,0' : '200,190,160'},${0.06 + r() * 0.08})`; g.fillRect(r() * W, y, 3 + r() * 10, 2 + r() * 3); }
    g.strokeStyle = 'rgba(20,18,14,.35)'; g.lineWidth = 2; [0.16, 0.34, 0.47, 0.72].forEach((f) => { g.beginPath(); for (let x = 0; x <= W; x += 16) { const y = f * H + Math.sin(x * 0.03 + f * 20) * 3; x ? g.lineTo(x, y) : g.moveTo(x, y); } g.stroke(); });
  }, 512, 256, 'austrock');
  const zf = cut ? CUTZ : (p.front ?? 8);
  const seaGeo = React.useMemo(() => { const g = new THREE.PlaneGeometry(9.6, zf - BACK, 30, 26); g.rotateX(-PI / 2); g.translate(0, 0, (zf + BACK) / 2); return g; }, [zf]);
  const pos = seaGeo.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < pos.count; i++) { const x = pos.getX(i), z = pos.getZ(i);
    pos.setY(i, Math.sin(x * 2.1 + t * 1.3) * 0.018 + Math.sin(z * 2.7 - t * 1.1 + x) * 0.016); }
  pos.needsUpdate = true; seaGeo.computeVertexNormals();
  const rocks = [[-3.1, -1.4, 0.16], [-2.3, -2.4, 0.11], [-1.9, -1.0, 0.09], [2.4, -1.9, 0.12], [3.2, -0.9, 0.15], [2.9, -3.0, 0.1]];
  if (p.mapOnly) return <group><hemisphereLight args={['#b9cccc', '#26332f', 0.55]} />{!p.noShade && <Shade y1={p.shadeY ?? 640} a={p.shadeA ?? 0.92} />}</group>;
  return (
    <group>
      <fog attach="fog" args={[p.fogC ?? '#4a5e5e', p.fogNear ?? 10, p.fogFar ?? 30]} />
      <mesh position={[0, 8, -3.77]}><planeGeometry args={[9.8, 16]} /><meshBasicMaterial map={sky} toneMapped={false} fog={false} /></mesh>
      <mesh geometry={seaGeo} position={[0, SEA, 0]}><meshStandardMaterial color={p.seaC ?? '#3b5754'} flatShading roughness={0.7} metalness={0.1} /></mesh>
      {cut && <>
        <mesh position={[0, SB + D / 2, CUTZ]} renderOrder={5}><planeGeometry args={[9.6, D]} /><meshBasicMaterial map={waterFace} transparent opacity={0.72} depthWrite={false} toneMapped={false} fog={false} /></mesh>
        <mesh rotation={[-PI / 2, 0, 0]} position={[0, SB, (CUTZ + BACK) / 2]}><planeGeometry args={[9.6, CUTZ - BACK]} /><M c="#55554a" /></mesh>
        <mesh position={[0, SB / 2, CUTZ]}><planeGeometry args={[9.6, SB]} /><meshBasicMaterial map={rock} toneMapped={false} fog={false} /></mesh>
        {[-1, 1].map((sx) => <mesh key={sx} position={[sx * 4.36, 8, 2]} rotation={[0, -sx * PI / 2, 0]}><planeGeometry args={[12, 16]} /><meshBasicMaterial color="#0b1315" toneMapped={false} fog={false} /></mesh>)}
        {/* piso oscuro delante del corte: tapa el piso del set */}
        <mesh rotation={[-PI / 2, 0, 0]} position={[0, 0.004, CUTZ + 5]}><planeGeometry args={[12, 10]} /><meshBasicMaterial color="#0a1012" toneMapped={false} /></mesh>
        {rocks.map(([x, z, r], i) => <mesh key={i} position={[x, SB + r * 0.4, z]}><dodecahedronGeometry args={[r, 0]} /><M c="#4a4b44" /></mesh>)}
        {/* borde de espuma oscura en la línea de agua del corte */}
        <mesh position={[0, SEA - 0.01, CUTZ + 0.002]}><planeGeometry args={[9.6, 0.03]} /><meshBasicMaterial color="#6d8a86" toneMapped={false} fog={false} /></mesh>
      </>}
      {p.coast && <Coast {...p.coast} />}
      <hemisphereLight args={['#b9cccc', '#26332f', 0.55]} />
      <directionalLight position={[-3, 8, 5]} intensity={0.5} color="#dfe8ea" />
      {!p.noShade && <Shade y1={p.shadeY ?? 640} a={p.shadeA ?? 0.92} />}
    </group>
  );
};

/* Costa de Tierra del Fuego vista desde el mar: losa de tierra con borde quebrado y lomas bajas (x < x0) */
const Coast: React.FC<{ x0?: number; z0?: number; z1?: number; h?: number }> = ({ x0 = -1.6, z0 = BACK, z1 = 6, h = 0.06 }) => {
  const geo = React.useMemo(() => { const r = rnd(21); const s = new THREE.Shape(); s.moveTo(-5, z0);
    for (let z = z0; z <= z1; z += 0.35) s.lineTo(x0 + (r() - 0.5) * 0.35 + Math.sin(z * 1.3) * 0.18, z);
    s.lineTo(-5, z1); s.closePath(); const g = new THREE.ExtrudeGeometry(s, { depth: h, bevelEnabled: false }); g.rotateX(PI / 2); g.translate(0, h, 0); return g; }, [x0, z0, z1, h]);
  const hills = React.useMemo(() => { const r = rnd(31); return Array.from({ length: 14 }, () => ({ x: -4.6 + r() * (x0 + 4.2), z: z0 + 0.3 + r() * (z1 - z0 - 0.6), w: 0.25 + r() * 0.35, h: 0.06 + r() * 0.12, c: ['#46513f', '#3c4636', '#55584a'][Math.floor(r() * 3)] })); }, [x0, z0, z1]);
  return <group position={[0, SEA - 0.03, 0]}>
    <mesh geometry={geo}><M c="#4d5745" /></mesh>
    {hills.map((q, i) => <mesh key={i} position={[q.x, h + q.h / 2, q.z]}><coneGeometry args={[q.w, q.h, 5]} /><M c={q.c} /></mesh>)}
  </group>;
};

/* ---------- Punto de luz mar adentro (la plataforma vista de muy lejos) ---------- */
export const Beacon: React.FC<P> = ({ t, tt, p }) => {
  const k = 0.55 + 0.45 * Math.max(0, Math.sin(t * 5.2)); const r = p.r ?? 0.05;
  return <group>
    <mesh><sphereGeometry args={[r, 10, 8]} /><meshBasicMaterial color={qc() ? KEY : '#ffd36a'} toneMapped={false} /></mesh>
    <mesh scale={1 + 0.5 * k}><ringGeometry args={[r * 1.8, r * 2.3, 24]} /><meshBasicMaterial color="#ffd36a" transparent opacity={0.6 * k} toneMapped={false} side={THREE.DoubleSide} /></mesh>
    <mesh rotation={[-PI / 2, 0, 0]} position={[0, -0.02, 0]} scale={1 + (tt % 1.4) * 2.2}><ringGeometry args={[r * 2.2, r * 2.6, 32]} /><meshBasicMaterial color="#ffd36a" transparent opacity={clamp(1 - (tt % 1.4) / 1.4) * 0.7} toneMapped={false} side={THREE.DoubleSide} /></mesh>
  </group>;
};

/* ---------- Plataforma Fénix: origen en el lecho marino. Jacket (base) de 4 patas + parte de arriba (módulos, grúa) ----------
   p.jacket / p.top (por defecto true), p.topY: curva [[t, dy]] para izar/bajar la parte de arriba, p.light: luz que titila,
   p.flag: banderita de Italia en la cubierta (aparece en p.flag segundos), p.risers: caños verticales de subida y bajada. */
export const JH = D + 0.55; // alto del jacket: 70 m de agua + 15 m sobre el agua
export const Platform: React.FC<P> = ({ t, p }) => {
  const Q = qc(); const Y = Q ? KEY : '#c9a43a', Y2 = Q ? KEY : '#a8862c', G1 = Q ? KEY : '#b9bec2', G2 = Q ? KEY : '#8e979c', OR = Q ? KEY : '#d8692b';
  const w0 = 0.4, w1 = 0.3; const lv = [0.0, 0.8, 1.55, 2.3, JH];
  const leg = (sx: number, sz: number) => <Seg key={sx + '' + sz} a={[sx * w0, 0, sz * w0]} b={[sx * w1, JH, sz * w1]} r={0.035} c={Y} />;
  const wAt = (y: number) => lerp(w0, w1, y / JH);
  const dy = p.topY ? curve(p.topY, t) : 0;
  return (
    <group>
      {p.jacket !== false && <group>
        {[[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([a, b]) => leg(a, b))}
        {lv.slice(0, -1).map((y, i) => { const y2 = lv[i + 1]; const a = wAt(y), b = wAt(y2);
          return <group key={i}>
            {[-1, 1].map((sz) => <group key={sz}><Seg a={[-a, y, sz * a]} b={[b, y2, sz * b]} r={0.014} c={Y2} /><Seg a={[a, y, sz * a]} b={[-b, y2, sz * b]} r={0.014} c={Y2} /></group>)}
            {[-1, 1].map((sx) => <group key={'s' + sx}><Seg a={[sx * a, y, -a]} b={[sx * b, y2, b]} r={0.014} c={Y2} /></group>)}
            <Seg a={[-b, y2, b]} b={[b, y2, b]} r={0.016} c={Y2} /><Seg a={[-b, y2, -b]} b={[b, y2, -b]} r={0.016} c={Y2} />
          </group>; })}
        {[[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([a, b], i) => <B key={'m' + i} s={[0.16, 0.05, 0.16]} pos={[a * w0, 0.025, b * w0]} c={Y2} />)}
        {p.risers !== false && <>
          <Seg a={[-0.2, 0, 0.2]} b={[-0.14, JH + 0.05, 0.15]} r={0.022} c={Q ? KEY : '#5e676b'} />
          <Seg a={[0.2, 0, 0.2]} b={[0.14, JH + 0.05, 0.15]} r={0.022} c={Q ? KEY : '#5e676b'} />
        </>}
      </group>}
      {p.top !== false && <group position={[0, JH + dy, 0]}>
        <B s={[0.92, 0.07, 0.92]} pos={[0, 0.035, 0]} c={G2} />
        <B s={[0.86, 0.06, 0.86]} pos={[0, 0.36, 0]} c={G2} />
        {[[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([a, b], i) => <B key={i} s={[0.05, 0.3, 0.05]} pos={[a * 0.4, 0.2, b * 0.4]} c={G2} />)}
        <B s={[0.36, 0.24, 0.5]} pos={[-0.2, 0.19, 0]} c={G1} />
        <B s={[0.3, 0.2, 0.3]} pos={[0.24, 0.17, -0.16]} c={Q ? KEY : '#9aa5a0'} />
        <B s={[0.38, 0.22, 0.3]} pos={[0.0, 0.5, -0.12]} c={G1} />
        <B s={[0.22, 0.14, 0.22]} pos={[0.25, 0.46, 0.22]} c={OR} />
        <Cyl r={0.05} h={0.28} pos={[0.3, 0.2, 0.25]} c={G1} />
        {/* grúa: pedestal + pluma */}
        <Cyl r={0.05} h={0.34} pos={[-0.34, 0.56, 0.3]} c={Q ? KEY : '#d9cf6a'} />
        <group position={[-0.34, 0.72, 0.3]} rotation={[0, 0.6 + Math.sin(t * 0.4) * 0.1, 0.55]}><B s={[0.04, 0.62, 0.04]} pos={[0, 0.31, 0]} c={Q ? KEY : '#d9cf6a'} /></group>
        {/* mástil con luz */}
        <Seg a={[0.3, 0.39, -0.3]} b={[0.3, 0.95, -0.3]} r={0.012} c={G2} />
        {p.light && <mesh position={[0.3, 0.97, -0.3]}><sphereGeometry args={[0.035, 8, 6]} /><meshBasicMaterial color={Math.sin(t * 5.2) > 0 ? '#ffd36a' : '#7a6a40'} toneMapped={false} /></mesh>}
        {p.flag !== undefined && t >= p.flag && <group position={[-0.05, 0.62, 0.32]} scale={eo((t - p.flag) / 0.35)}>
          <Seg a={[0, 0, 0]} b={[0, 0.36, 0]} r={0.008} c="#d8d8d8" />
          {['#1f8a4c', '#e8e6df', '#c8343a'].map((c, i) => <mesh key={i} position={[0.03 + i * 0.06, 0.3, 0]} rotation={[0, 0, Math.sin(t * 3 + i) * 0.05]}><boxGeometry args={[0.06, 0.12, 0.006]} /><M c={Q ? KEY : c} /></mesh>)}
        </group>}
      </group>}
    </group>
  );
};

/* ---------- Otra plataforma (Vega Pléyade): más chica, de 3 patas, módulos azulados; origen en el lecho ---------- */
export const Other: React.FC<P> = ({ t, p }) => {
  const Q = qc(); const c = Q ? KEY : '#9aa7ad', y = Q ? KEY : '#b79a3a'; const H = D + 0.45;
  return <group>
    {[0, 1, 2].map((i) => { const a = (i / 3) * PI * 2 + 0.3; return <Seg key={i} a={[Math.cos(a) * 0.32, 0, Math.sin(a) * 0.32]} b={[Math.cos(a) * 0.22, H, Math.sin(a) * 0.22]} r={0.032} c={y} />; })}
    {[0.8, 1.6, 2.3].map((h, i) => <mesh key={i} position={[0, h, 0]} rotation={[PI / 2, 0, 0]}><torusGeometry args={[lerp(0.32, 0.22, h / H), 0.012, 4, 3]} /><M c={y} /></mesh>)}
    <Seg a={[0.18, 0, 0.18]} b={[0.12, H + 0.05, 0.14]} r={0.02} c={Q ? KEY : '#5e676b'} />
    <group position={[0, H, 0]}>
      <B s={[0.7, 0.06, 0.6]} pos={[0, 0.03, 0]} c={c} /><B s={[0.32, 0.22, 0.36]} pos={[-0.12, 0.17, 0]} c={Q ? KEY : '#7f95a3'} />
      <B s={[0.22, 0.16, 0.22]} pos={[0.18, 0.14, -0.08]} c={c} /><Seg a={[0.22, 0.06, 0.18]} b={[0.22, 0.6, 0.18]} r={0.01} c={c} />
    </group>
    {p.glow !== undefined && t >= p.glow && <mesh position={[0, H + 0.04, 0]} rotation={[-PI / 2, 0, 0]} scale={1 + 0.1 * Math.sin(t * 4)}>
      <ringGeometry args={[0.5, 0.56, 32]} /><meshBasicMaterial color="#27e0d8" transparent opacity={0.9 * eo((t - p.glow) / 0.3)} toneMapped={false} side={THREE.DoubleSide} /></mesh>}
  </group>;
};

/* ---------- Caño submarino apoyado en el lecho: p.pts (puntos en el lecho, y = SB + r), p.grow [[t,k]], p.flow (desde cuándo corre gas) ---------- */
export const Pipe: React.FC<P> = ({ t, p }) => {
  const Q = qc(); const r = p.r ?? 0.045; const pts: V3[] = p.pts; const k = p.grow ? curve(p.grow, t) : 1; const vis = pcut(pts, k);
  const on = p.flow !== undefined ? clamp((t - p.flow) / 0.3) : 0;
  return <group>
    {vis.length > 1 && <Poly pts={vis} r={r} c={Q ? KEY : '#2b2f31'} o={on > 0 && !Q ? 0.55 : undefined} />}
    {on > 0 && !Q && <Flow pts={pts} t={t - p.flow} n={p.n ?? 10} speed={p.speed ?? 0.9} r={r * 0.5} on={on} />}
  </group>;
};

/* ---------- Pozos horizontales dibujados en la cara del corte (z = CUTZ + 0,012), siempre dentro de la roca (0 < y < SB) ----------
   p.x0: boca del pozo bajo la plataforma. p.drill[i]: [[t,k]] avance del pozo i. p.flow[i]: desde cuándo sale gas del pozo i. */
const WZ = CUTZ + 0.012;
export const wellPath = (x0: number, i: number): V3[] => {
  const s = [-1, 1, 1][i], deep = [0.7, 0.7, 0.85][i], reach = [1.35, 1.3, 0.9][i], off = [-0.08, 0.08, 0.0][i];
  const pts: V3[] = [[x0 + off, SB, WZ], [x0 + off, SB - 0.22, WZ]];
  for (let k = 1; k <= 6; k++) { const a = (k / 6) * (PI / 2); pts.push([x0 + off + s * (1 - Math.cos(a)) * 0.3, SB - 0.22 - Math.sin(a) * (deep - 0.22), WZ]); }
  pts.push([x0 + off + s * (0.3 + reach), SB - deep, WZ]); return pts;
};
export const Wells: React.FC<P> = ({ t, p }) => {
  const Q = qc(); const x0 = p.x0 ?? 0;
  return <group>{[0, 1, 2].map((i) => {
    const pts = wellPath(x0, i); const k = p.drill ? curve(p.drill[i], t) : 1; if (k <= 0) return null; const vis = pcut(pts, k);
    const on = p.flow && p.flow[i] !== undefined ? clamp((t - p.flow[i]) / 0.3) : 0; const tip = vis[vis.length - 1];
    return <group key={i}>
      {vis.length > 1 && <Poly pts={vis} r={0.03} c={Q ? KEY : on > 0 ? '#2a5c62' : '#22282a'} e={on > 0 && !Q ? '#1c6f74' : undefined} ei={0.6} />}
      {k < 1 && k > 0 && <mesh position={tip}><octahedronGeometry args={[0.05, 0]} /><M c={Q ? KEY : '#e0b23a'} e="#7a5a10" ei={0.6} /></mesh>}
      {on > 0 && !Q && <Flow pts={[...pts].reverse()} t={t - p.flow[i]} n={9} speed={0.8} r={0.016} on={on} />}
    </group>; })}</group>;
};

/* ---------- Gas por los caños de subida/bajada de la plataforma (dentro del caño) ---------- */
export const RiserFlow: React.FC<P> = ({ t, p }) => {
  if (qc() || t < (p.at ?? 0)) return null; const on = clamp((t - (p.at ?? 0)) / 0.3);
  const up: V3[] = [[-0.2, 0, 0.2], [-0.14, JH + 0.05, 0.15]]; const dn: V3[] = [[0.14, JH + 0.05, 0.15], [0.2, 0, 0.2]];
  return <group><Flow pts={up} t={t} n={7} speed={1.1} r={0.012} on={on} />{p.down !== false && <Flow pts={dn} t={t} n={7} speed={1.1} r={0.012} on={on} />}</group>;
};

/* ---------- Barco tendedor de caño (S-lay): casco a lo largo de x, popa en x = 0; el caño baja de la popa al lecho ---------- */
export const LayShip: React.FC<P> = ({ t, p }) => {
  const Q = qc(); const L = p.len ?? 8; const hull = Q ? KEY : '#3f474c', deck = Q ? KEY : '#7d8589', w = 0.5;
  return <group position={[curve(p.xs, t), SEA, p.z ?? 0]}>
    <B s={[L, 0.32, w]} pos={[L / 2, 0.04, 0]} c={hull} />
    <B s={[L, 0.03, w * 0.92]} pos={[L / 2, 0.215, 0]} c={deck} />
    <B s={[0.9, 0.36, 0.42]} pos={[2.6, 0.41, 0]} c={Q ? KEY : '#c9ccc6'} />
    <B s={[0.5, 0.2, 0.36]} pos={[2.5, 0.69, 0]} c={Q ? KEY : '#c9ccc6'} />
    {/* rampa de tendido en la popa */}
    <group position={[0.05, 0.2, 0]} rotation={[0, 0, -0.5]}><B s={[0.9, 0.05, 0.16]} pos={[-0.45, 0, 0]} c={Q ? KEY : '#c06a2a'} /></group>
    {[0.6, 1.1, 1.6].map((x, i) => <B key={i} s={[0.06, 0.06, w * 0.8]} pos={[x, 0.26, 0]} c={Q ? KEY : '#5d666a'} />)}
  </group>;
};
/** caño tendido: en el lecho desde xa hasta el punto de contacto, y en catenaria hasta la popa del barco (xs) */
export const LaidPipe: React.FC<P> = ({ t, p }) => {
  const Q = qc(); const xs = curve(p.xs, t); const z = p.z ?? 0; const r = 0.04; const td = xs - 1.7; const y0 = SB + r;
  const bed: V3[] = [[p.xa ?? -5, y0, z], [Math.max(p.xa ?? -5, td), y0, z]];
  const cat: V3[] = Array.from({ length: 10 }, (_, i) => { const u = i / 9; return [lerp(td, xs - 0.35, u), y0 + (SEA + 0.03 - y0) * Math.pow(u, 1.8), z] as V3; });
  return <group><Poly pts={bed} r={r} c={Q ? KEY : '#2b2f31'} /><Poly pts={cat} r={r} c={Q ? KEY : '#2b2f31'} /></group>;
};

/* ---------- Barco de dos cascos (más de 300 m) que trae la parte de arriba entre los cascos ----------
   Cascos a lo largo de x, de x = -1,6 a x = -1,6 + 11 (308 m a escala); el par de vigas de izado está en x = 0 del grupo. */
export const TwinShip: React.FC<P> = ({ t, p }) => {
  const Q = qc(); const L = 11, x0 = -1.6; const hull = Q ? KEY : '#3d4448', dk = Q ? KEY : '#6f787c';
  return <group position={[0, SEA, 0]}>
    {[-0.74, 0.74].map((z) => <group key={z}>
      <B s={[L, 0.34, 0.28]} pos={[x0 + L / 2, 0.02, z]} c={hull} />
      <B s={[L, 0.03, 0.26]} pos={[x0 + L / 2, 0.205, z]} c={dk} />
      <B s={[0.5, 0.4, 0.26]} pos={[x0 + 6.5, 0.42, z]} c={Q ? KEY : '#c9ccc6'} />
    </group>)}
    <B s={[0.9, 0.08, 0.3]} pos={[x0 + 7.5, 0.3, 0]} c={dk} />
    {/* brazos de izado: salen de cada casco hacia adentro y sostienen la cubierta por debajo (bajan con ella) */}
    {(() => { const yd = SB + JH + (p.topY ? curve(p.topY, t) : 0) - SEA - 0.03; return [-0.38, 0.38].map((x) => [-1, 1].map((sz) => <group key={x + '' + sz}>
      <B s={[0.07, Math.max(0.05, yd - 0.2), 0.07]} pos={[x, 0.2 + Math.max(0.05, yd - 0.2) / 2, sz * 0.7]} c={Q ? KEY : '#c06a2a'} />
      <B s={[0.07, 0.05, 0.3]} pos={[x, yd - 0.025, sz * 0.57]} c={Q ? KEY : '#c06a2a'} />
    </group>)); })()}
  </group>;
};
/** cables de izado de las vigas (y = SEA + 1,1) a la parte de arriba (que está en y = SB + JH + dy) */
export const Slings: React.FC<P> = ({ t, p }) => {
  const dy = curve(p.topY, t); const yTop = SB + JH + dy + 0.4; const yB = SEA + 1.1; if (yB - yTop < 0.02) return null;
  return <group>{[[-0.4, -0.35], [0.4, -0.35], [-0.4, 0.35], [0.4, 0.35]].map(([x, z], i) => <Seg key={i} a={[x * 1.2, yB, z]} b={[x, yTop, z]} r={0.006} c="#202426" />)}</group>;
};

/* ---------- Astillero (Rávena): muelle, pórtico grúa, la base acostada y la parte de arriba; banderita de Italia ---------- */
export const Yard: React.FC<P> = ({ t, p }) => {
  const Q = qc(); const conc = '#8d8f88';
  return <group position={[0, SEA, 0]}>
    <B s={[9.6, 0.24, 3.2]} pos={[0, 0.0, -2.2]} c={conc} />
    <B s={[9.6, 0.05, 0.08]} pos={[0, 0.14, -0.64]} c="#5d605a" />
    {/* pórtico */}
    {[-1.35, 1.35].map((x) => <B key={x} s={[0.1, 1.9, 0.1]} pos={[x, 1.07, -2.2]} c={Q ? '#888' : '#b8463a'} />)}
    <B s={[2.9, 0.14, 0.16]} pos={[0, 2.04, -2.2]} c={Q ? '#888' : '#b8463a'} />
    {/* base (jacket) acostada sobre soportes */}
    <group position={[-0.45, 0.42, -1.6]} rotation={[0, 0, PI / 2]} scale={0.42}>
      {p.jacketAt === undefined || t >= p.jacketAt ? <group scale={p.jacketAt === undefined ? 1 : eo((t - p.jacketAt) / 0.35)}><Platform t={t} tt={t} p={{ top: false, risers: false }} /></group> : null}
    </group>
    {[-1.2, -0.3, 0.6].map((x, i) => <B key={i} s={[0.12, 0.2, 0.5]} pos={[x - 0.45, 0.22, -1.6]} c="#5d605a" />)}
    {/* parte de arriba sobre el muelle */}
    <group position={[0.95, 0.12, -2.0]} scale={0.8}>
      {p.topAt === undefined || t >= p.topAt ? <group scale={p.topAt === undefined ? 1 : eo((t - p.topAt) / 0.35)}><group position={[0, -JH, 0]}><Platform t={t} tt={t} p={{ jacket: false }} /></group></group> : null}
    </group>
    {/* mástil con la banderita de Italia */}
    <group position={[-1.75, 0.12, -1.2]}>
      <Seg a={[0, 0, 0]} b={[0, 1.3, 0]} r={0.015} c="#d8d8d8" />
      {['#1f8a4c', '#e8e6df', '#c8343a'].map((c, i) => <mesh key={i} position={[0.07 + i * 0.14, 1.12, 0]} rotation={[0, Math.sin(t * 2.4 + i * 0.6) * 0.18, 0]}><boxGeometry args={[0.14, 0.3, 0.01]} /><M c={c} /></mesh>)}
    </group>
  </group>;
};

/* ---------- Mapa (sur de la Argentina, norte arriba): tierra baja sobre mar oscuro, trazas que se dibujan ----------
   Coordenadas reales aproximadas (lon, lat) proyectadas: x = (lon + 64,5) · K · 0,69, z = -(lat + 46) · K. */
const K = 0.2, ZO = 0.86; export const LL = (lon: number, lat: number, y = 0): V3 => [(lon + 64.5) * K * 0.69, y, -(lat + 46.2) * K + ZO];
const MAIN: [number, number][] = [[-56.7, -36.4], [-57.5, -38.1], [-59.0, -38.7], [-61.3, -39.0], [-62.1, -38.85], [-62.4, -39.4], [-62.1, -40.0], [-62.8, -40.7], [-64.9, -40.75], [-65.1, -41.3],
  [-64.0, -42.2], [-63.6, -42.7], [-64.4, -42.6], [-65.0, -43.3], [-65.3, -44.6], [-66.5, -45.1], [-67.6, -45.9], [-67.4, -46.8], [-65.9, -47.8], [-67.0, -48.6], [-67.7, -49.4],
  [-68.4, -50.2], [-69.0, -51.0], [-69.1, -51.7], [-68.4, -52.3], [-70.0, -52.6], [-71.5, -52.7], [-72.6, -51.0], [-72.4, -48.0], [-71.8, -46.0], [-71.6, -43.5], [-71.8, -41.0], [-71.0, -36.4]];
const TDF: [number, number][] = [[-68.6, -52.65], [-68.25, -53.1], [-67.75, -53.6], [-67.1, -54.15], [-66.3, -54.5], [-65.15, -54.65], [-66.6, -55.0], [-68.3, -54.9], [-69.6, -55.2], [-70.8, -54.2], [-70.3, -53.4], [-69.4, -52.75]];
export const FENIX: [number, number] = [-67.6, -52.7], VEGA: [number, number] = [-68.05, -52.55], PLANT1: [number, number] = [-68.45, -52.9], PLANT2: [number, number] = [-68.35, -53.1];
const ROUTE: [number, number][] = [PLANT2, [-68.6, -52.6], [-68.7, -52.25], [-69.2, -51.6], [-68.8, -50.6], [-67.9, -49.4], [-67.6, -48.4], [-68.2, -46.9], [-67.9, -45.8], [-66.5, -45.0],
  [-65.6, -43.5], [-65.4, -42.0], [-64.4, -40.9], [-63.2, -40.0], [-62.3, -38.75]];
export const MapAR: React.FC<P> = ({ t, p }) => {
  const Q = qc();
  const mk = (pts: [number, number][]) => { const s = new THREE.Shape(); pts.forEach(([lo, la], i) => { const [x, , z] = LL(lo, la); i ? s.lineTo(x, -z) : s.moveTo(x, -z); }); s.closePath();
    const g = new THREE.ExtrudeGeometry(s, { depth: 0.05, bevelEnabled: false }); g.rotateX(-PI / 2); return g; };
  const main = React.useMemo(() => mk(MAIN), []), tdf = React.useMemo(() => mk(TDF), []);
  const y = 0.07; const rk = p.route ? curve(p.route, t) : 0; const route = pcut(ROUTE.map(([a, b]) => LL(a, b, y)), rk);
  const sea: V3[] = [LL(...FENIX, y), LL(...VEGA, y), LL(...PLANT1, y)]; const sk = p.sea ? curve(p.sea, t) : 0; const seaVis = pcut(sea, sk);
  return <group>
    <mesh rotation={[-PI / 2, 0, 0]} position={[0, 0.015, 0]}><planeGeometry args={[9.6, 8.4]} /><meshBasicMaterial color="#162629" toneMapped={false} /></mesh>
    <mesh geometry={main} position={[0, 0.016, 0]}><M c="#5b6550" /></mesh>
    <mesh geometry={tdf} position={[0, 0.016, 0]}><M c="#5b6550" /></mesh>
    {seaVis.length > 1 && <Poly pts={seaVis} r={0.022} c={Q ? KEY : '#27e0d8'} e={Q ? undefined : '#1a9c96'} ei={0.8} />}
    {route.length > 1 && <Poly pts={route} r={0.026} c={Q ? KEY : '#ffb52e'} e={Q ? undefined : '#b07010'} ei={0.8} />}
    {[[FENIX, p.fenix], [VEGA, p.vega], [PLANT1, p.plants], [PLANT2, p.plants], [[-62.27, -38.72], p.bahia]].map(([ll, at]: any, i) => at !== undefined && t >= at ?
      <mesh key={i} position={LL(ll[0], ll[1], y + 0.02)} scale={eo((t - at) / 0.3)}><cylinderGeometry args={[i < 2 ? 0.045 : 0.055, i < 2 ? 0.045 : 0.055, 0.05, 12]} />
        <meshBasicMaterial color={Q ? KEY : i === 4 ? '#ffb52e' : i < 2 ? '#ffd36a' : '#e8ecea'} toneMapped={false} /></mesh> : null)}
    <hemisphereLight args={['#c8d6d6', '#2a3430', 0.5]} />
  </group>;
};

/* ---------- Ficha flotante del cierre: plinto oscuro + miniatura (p.kind: flag | well | other) ---------- */
export const Token: React.FC<P> = ({ t, p }) => {
  const Q = qc(); const bob = Math.sin(t * 1.6 + (p.ph ?? 0)) * 0.03; const k = p.at === undefined ? 1 : t < p.at ? 0 : eo((t - p.at) / 0.35) * (1 + 0.15 * Math.sin(clamp((t - p.at) / 0.35) * PI));
  return <group position={[0, bob, 0]}>
    <Cyl r={0.42} r2={0.38} h={0.12} pos={[0, 0.06, 0]} seg={8} c={Q ? KEY : '#2a3436'} />
    {k > 0 && <group scale={k}>
    {p.kind === 'flag' && <group position={[0, 0.12, 0]}>
      <Seg a={[-0.25, 0, 0]} b={[-0.25, 0.85, 0]} r={0.014} c={Q ? KEY : '#d8d8d8'} />
      {['#1f8a4c', '#e8e6df', '#c8343a'].map((c, i) => <mesh key={i} position={[-0.18 + i * 0.15, 0.68, 0]} rotation={[0, Math.sin(t * 2.4 + i * 0.6) * 0.15, 0]}><boxGeometry args={[0.15, 0.32, 0.012]} /><M c={Q ? KEY : c} /></mesh>)}
    </group>}
    {p.kind === 'well' && <group position={[0, 0.12, 0]}>
      <B s={[0.7, 0.36, 0.3]} pos={[0, 0.18, 0]} c={Q ? KEY : '#7a6a48'} />
      <Poly pts={[[-0.22, 0.38, 0.16], [-0.22, 0.2, 0.16], [-0.12, 0.1, 0.16], [0.28, 0.1, 0.16]]} r={0.03} c={Q ? KEY : '#2a5c62'} e={Q ? undefined : '#1c6f74'} ei={0.6} />
    </group>}
    {p.kind === 'other' && <group position={[0, 0.12, 0]} scale={0.2}><Other t={t} tt={t} p={{}} /></group>}
    </group>}
  </group>;
};

/* ---------- Torta del 8 % (a escala: la cuña dorada es 8 % de la vuelta), parada mirando a cámara ---------- */
export const Pie: React.FC<P> = ({ t, p }) => {
  const Q = qc(); const k = p.at !== undefined ? eo((t - p.at) / 0.5) : 1; const f = 0.08; const a0 = PI / 2 - f * PI;
  return <group rotation={[PI / 2, 0, 0]}>
    <mesh><cylinderGeometry args={[0.5, 0.5, 0.12, 40, 1, false, a0 + f * 2 * PI, (1 - f) * 2 * PI]} /><M c={Q ? KEY : '#5f6f70'} /></mesh>
    {k > 0 && <group position={[Math.sin(a0 + f * PI) * 0.08 * k, 0, Math.cos(a0 + f * PI) * 0.08 * k]}><mesh scale={[1, 1.4, 1]}><cylinderGeometry args={[0.5, 0.5, 0.12, 40, 1, false, a0, f * 2 * PI * k]} /><M c={Q ? KEY : '#ffb52e'} e="#a86a00" ei={0.5} /></mesh></group>}
  </group>;
};

export const EXTRA = { pie: Pie, world: World, beacon: Beacon, platform: Platform, other: Other, pipe: Pipe, wells: Wells, riserflow: RiserFlow, layship: LayShip, laidpipe: LaidPipe,
  twinship: TwinShip, slings: Slings, yard: Yard, mapar: MapAR, token: Token };
