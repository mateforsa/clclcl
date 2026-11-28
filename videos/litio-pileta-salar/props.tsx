import React from 'react';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';
import { M, useTex } from '../../src/kit/Props';
import { clamp, eio, eo, lerp, rnd } from '../../src/kit/math';

// Look propio: salar de la Puna de altura. Piso de sal blanca con costra poligonal, cerros ocres al fondo, cielo azul de altura
// que se oscurece arriba (ahí van los subtítulos). Piletas celestes con bordes de sal y una planta compacta de extracción directa.
// Sin carteles 3D con texto: nombres y cifras van en placas 2D del kit. Muñecos sin rasgos.
// La franja de subtítulos (y 290-390 px) siempre queda oscura: `Shade` es un velo pegado a la cámara (función pura de la cámara
// del cuadro) que oscurece el tercio superior aunque el plano mire la sal desde arriba.
type P = { t: number; tt: number; p: any };
type V3 = [number, number, number];
const PI = Math.PI;

const B: React.FC<{ s: V3; pos?: V3; rot?: V3; c: string; e?: string; ei?: number; o?: number }> = ({ s, pos, rot, c, e, ei, o }) => (
  <mesh position={pos} rotation={rot}><boxGeometry args={s} /><M c={c} e={e} ei={ei} o={o} /></mesh>
);
const Cyl: React.FC<{ r: number; r2?: number; h: number; pos?: V3; rot?: V3; seg?: number; c: string; e?: string; ei?: number; o?: number }> = ({ r, r2, h, pos, rot, seg = 10, c, e, ei, o }) => (
  <mesh position={pos} rotation={rot}><cylinderGeometry args={[r2 ?? r, r, h, seg]} /><M c={c} e={e} ei={ei} o={o} /></mesh>
);
const Ball: React.FC<{ r: number; pos?: V3; c: string; e?: string; ei?: number; o?: number }> = ({ r, pos, c, e, ei, o }) => (
  <mesh position={pos}><icosahedronGeometry args={[r, 0]} /><M c={c} e={e} ei={ei} o={o} /></mesh>
);
/** curva por tramos [[t, v], ...] con easing: continua, sin saltos */
const curve = (kf: [number, number][], t: number) => {
  if (!kf.length) return 0; if (t <= kf[0][0]) return kf[0][1];
  for (let i = 1; i < kf.length; i++) if (t < kf[i][0]) { const [t0, v0] = kf[i - 1], [t1, v1] = kf[i]; return lerp(v0, v1, eio((t - t0) / (t1 - t0))); }
  return kf[kf.length - 1][1];
};

export const SALT = '#d6d2c8', SALT2 = '#e4e0d6', CRUST = '#bdb6a8';
export const POOL = ['#4fc4dc', '#62d0e2', '#3fb3d0', '#77d8e6'];
export const OCHRE = ['#a8683a', '#b97a44', '#93582f', '#c48a52', '#8a5330'];
export const STEEL = '#c9cfd6', STEEL2 = '#8d96a1', PIPE = '#6f7882', BLUE = '#2f6bff';
export const BRINE = '#3aa7ff', LI = '#ff4fb0', RESIN = '#e5a03a';

/* ---------- Velo oscuro pegado a la cámara: tercio superior oscuro, la franja de subtítulos nunca queda clara ---------- */
const Shade: React.FC<{ y1?: number; a?: number }> = ({ y1 = 640, a = 0.9 }) => {
  const { camera } = useThree();
  const tex = useTex((g, W, H) => {
    g.clearRect(0, 0, W, H);
    for (let y = 0; y < H; y++) { const px = (y / H) * y1; const k = px < 430 ? 1 : 1 - clamp((px - 430) / (y1 - 430)); const al = a * (k * k * (3 - 2 * k));
      g.fillStyle = `rgba(6,10,20,${al})`; g.fillRect(0, y, W, 1); }
  }, 4, 256, 'punashade' + y1 + a);
  const geo = React.useMemo(() => new THREE.PlaneGeometry(1, 1), []);
  camera.updateMatrixWorld();
  const yb = 1 - (2 * y1) / 1920; const pos = geo.attributes.position as THREE.BufferAttribute;
  const pts: [number, number][] = [[-1.1, 1.1], [1.1, 1.1], [-1.1, yb], [1.1, yb]];
  pts.forEach(([x, y], i) => { const v = new THREE.Vector3(x, y, -0.9).unproject(camera); pos.setXYZ(i, v.x, v.y, v.z); });
  pos.needsUpdate = true; geo.computeBoundingSphere();
  return <mesh geometry={geo} frustumCulled={false} renderOrder={999}>
    <meshBasicMaterial map={tex} transparent depthTest={false} depthWrite={false} toneMapped={false} fog={false} /></mesh>;
};

/* ---------- Mundo: telón de cielo de altura + cerros ocres + piso de sal ---------- */
export const World: React.FC<P> = ({ p }) => {
  const sky = useTex((g, W, H) => {
    const gr = g.createLinearGradient(0, H, 0, 0);
    [[0, '#c9d3d8'], [0.03, '#9db7cc'], [0.09, '#4f7aa6'], [0.18, '#1d3a62'], [0.3, '#0e1d36'], [1, '#070d1a']].forEach(([f, c]) => gr.addColorStop(f as number, c as string));
    g.fillStyle = gr; g.fillRect(0, 0, W, H);
    // cordillera lejana pintada (violácea por la distancia), apenas sobre el horizonte
    const r = rnd(5); g.fillStyle = '#7d6f7a'; g.beginPath(); g.moveTo(0, H);
    for (let x = 0; x <= W; x += 16) g.lineTo(x, H * (0.955 - r() * 0.035)); g.lineTo(W, H); g.fill();
  }, 256, 1024, 'punasky');
  const ground = useTex((g, W, H) => {
    g.fillStyle = SALT; g.fillRect(0, 0, W, H);
    const r = rnd(9); g.strokeStyle = CRUST; g.lineWidth = 2;
    // costra poligonal del salar: celdas hexagonales irregulares
    const s = 34; for (let y = -1; y < H / (s * 0.86) + 1; y++) for (let x = -1; x < W / s + 1; x++) {
      const cx = x * s + (y % 2) * s * 0.5 + (r() - 0.5) * 8, cy = y * s * 0.86 + (r() - 0.5) * 8; g.beginPath();
      for (let k = 0; k < 6; k++) { const a = (k / 6) * PI * 2 + 0.5; const rr = s * 0.52 + (r() - 0.5) * 6; const px = cx + Math.cos(a) * rr, py = cy + Math.sin(a) * rr; k ? g.lineTo(px, py) : g.moveTo(px, py); }
      g.closePath(); g.stroke(); }
  }, 1024, 1024, 'punaground');
  const hills = React.useMemo(() => { const r = rnd(p.seed ?? 3); return Array.from({ length: 11 }, (_, i) => ({ x: -4.6 + i * 0.92 + (r() - 0.5) * 0.4, z: -3.25 - r() * 0.35, h: 0.35 + r() * 0.55, w: 0.6 + r() * 0.45, c: OCHRE[i % OCHRE.length], rot: r() * PI })); }, [p.seed]);
  return (
    <group>
      <fog attach="fog" args={['#aab5bd', p.fogNear ?? 9, p.fogFar ?? 24]} />
      <mesh position={[0, 6, -3.76]}><planeGeometry args={[9.6, 12]} /><meshBasicMaterial map={sky} toneMapped={false} fog={false} /></mesh>
      <mesh rotation={[-PI / 2, 0, 0]} position={[0, 0.002, 2.49]}><planeGeometry args={[9.6, 12.5]} /><meshStandardMaterial map={ground} roughness={0.95} /></mesh>
      {!p.noHills && hills.map((h, i) => <mesh key={i} position={[h.x, h.h / 2, h.z]} rotation={[0, h.rot, 0]}><coneGeometry args={[h.w, h.h, 5]} /><M c={h.c} /></mesh>)}
      <hemisphereLight args={['#dfe9f5', '#7a6a58', 0.5]} />
      <directionalLight position={[-3, 6, 4]} intensity={0.55} color="#fff3e0" />
      {!p.noShade && <Shade y1={p.shadeY ?? 640} a={p.shadeA ?? 0.9} />}
    </group>
  );
};

/* ---------- Pileta de evaporación: bordes de sal, agua celeste; `lvl` = curva del nivel; `vapor` = desde cuándo sube vapor ---------- */
export const Pond: React.FC<P> = ({ t, p }) => {
  const { w = 1.6, d = 1.0, c = POOL[0], vapor } = p;
  const lvl = p.lvl ? curve(p.lvl, t) : (p.level ?? 0.11);
  const iw = w - 0.14, id = d - 0.14;
  const vk = vapor === undefined ? 0 : clamp((t - vapor) / 0.5);
  return (
    <group>
      {[[0, d / 2 - 0.035, w, 0.07], [0, -d / 2 + 0.035, w, 0.07]].map(([x, z, ww, dd], i) => <B key={i} s={[ww, 0.15, dd]} pos={[x, 0.075, z]} c={SALT2} />)}
      {[[-w / 2 + 0.035, 0], [w / 2 - 0.035, 0]].map(([x, z], i) => <B key={'s' + i} s={[0.07, 0.15, d - 0.14]} pos={[x, 0.075, z]} c={SALT2} />)}
      <B s={[iw, 0.01, id]} pos={[0, 0.005, 0]} c="#a9c3c4" />
      <B s={[iw, Math.max(0.005, lvl), id]} pos={[0, Math.max(0.005, lvl) / 2 + 0.005, 0]} c={c} e={c} ei={0.22} />
      {/* reflejos que se desplazan sobre el agua */}
      {[0, 1, 2].map((i) => { const u = ((t * 0.18 + i / 3) % 1); return <B key={'g' + i} s={[iw * 0.35, 0.004, 0.025]} pos={[lerp(-iw / 2 + iw * 0.18, iw / 2 - iw * 0.18, u), lvl + 0.009, -id / 2 + id * (0.25 + i * 0.25)]} c="#c8f4fa" e="#c8f4fa" ei={0.4} />; })}
      {vk > 0 && Array.from({ length: 9 }, (_, i) => { const ph = (((t - vapor) * 0.45 + i / 9) % 1); const x = (((i * 0.37) % 1) - 0.5) * iw * 0.8, z = (((i * 0.61) % 1) - 0.5) * id * 0.7;
        return <Ball key={'v' + i} r={0.05 + ph * 0.07} pos={[x + Math.sin(ph * 6 + i) * 0.04, lvl + 0.04 + ph * 0.75, z]} c="#f4f7fa" o={0.45 * vk * (1 - ph) * clamp(ph * 6)} />; })}
    </group>
  );
};

/* ---------- Calendario sin texto: hojas en blanco que se arrancan una tras otra (más de un año) ---------- */
export const Cal: React.FC<P> = ({ t, p }) => {
  const { rate = 4, at = 0 } = p;
  const f = Math.max(0, (t - at) * rate); const k = f % 1; const n = Math.floor(f);
  const page = (key: string, rotX: number) => (
    <group key={key} position={[0, 0.23, 0.04]} rotation={[rotX, 0, 0]}>
      <group position={[0, -0.23, 0]}>
        <B s={[0.44, 0.46, 0.008]} c="#eeebe3" />
        <B s={[0.44, 0.09, 0.012]} pos={[0, 0.185, 0.002]} c="#d9443a" />
        {Array.from({ length: 20 }, (_, j) => <B key={j} s={[0.06, 0.05, 0.01]} pos={[-0.15 + (j % 5) * 0.075, 0.08 - Math.floor(j / 5) * 0.075, 0.004]} c={(j + n) % 7 === 0 ? '#c9b9a8' : '#cfccc4'} />)}
      </group>
    </group>);
  return (
    <group>
      <B s={[0.52, 0.58, 0.06]} c="#2b2f3a" />
      <B s={[0.44, 0.46, 0.03]} pos={[0, 0, 0.03]} c="#d8d4cb" />
      {page('base', 0)}
      {t >= at && page('flip', -eio(clamp(k * 1.6)) * PI * 0.92)}
      {[-0.12, 0.12].map((x) => <Cyl key={x} r={0.02} h={0.08} pos={[x, 0.3, 0.04]} c="#9aa0aa" />)}
    </group>
  );
};

/* ---------- Reloj sin números: agujas rápidas (pocos días) ---------- */
export const Clock: React.FC<P> = ({ t, p }) => {
  const { rate = 1.2, at = 0 } = p; const a = -Math.max(0, t - at) * rate * PI * 2;
  return (
    <group>
      <Cyl r={0.3} h={0.07} rot={[PI / 2, 0, 0]} seg={24} c="#2b2f3a" />
      <Cyl r={0.26} h={0.08} rot={[PI / 2, 0, 0]} seg={24} c="#eeebe3" />
      {Array.from({ length: 12 }, (_, i) => <B key={i} s={[0.02, 0.05, 0.01]} pos={[Math.sin((i / 12) * PI * 2) * 0.21, Math.cos((i / 12) * PI * 2) * 0.21, 0.045]} rot={[0, 0, -(i / 12) * PI * 2]} c="#3b3f4a" />)}
      <group position={[0, 0, 0.05]} rotation={[0, 0, a]}><B s={[0.022, 0.2, 0.01]} pos={[0, 0.09, 0]} c="#d9443a" /></group>
      <group position={[0, 0, 0.055]} rotation={[0, 0, a / 12]}><B s={[0.03, 0.13, 0.01]} pos={[0, 0.055, 0]} c="#2b2f3a" /></group>
      <Cyl r={0.025} h={0.02} rot={[PI / 2, 0, 0]} pos={[0, 0, 0.06]} c="#2b2f3a" />
    </group>
  );
};

/* ---------- Planta compacta de extracción directa (vista de afuera, sin resina a la vista) ---------- */
const Flow: React.FC<{ a: V3; b: V3; t: number; n?: number; c: string; speed?: number; r?: number; on?: number }> = ({ a, b, t, n = 6, c, speed = 0.6, r = 0.03, on = 1 }) => (
  <group>{on > 0 && Array.from({ length: n }, (_, i) => { const u = ((t * speed + i / n) % 1); return <Ball key={i} r={r * on} pos={[lerp(a[0], b[0], u), lerp(a[1], b[1], u), lerp(a[2], b[2], u)]} c={c} e={c} ei={0.8} />; })}</group>
);
const pipeBetween = (a: V3, b: V3, r: number, c: string, key?: string) => {
  const dx = b[0] - a[0], dy = b[1] - a[1], dz = b[2] - a[2]; const L = Math.hypot(dx, dy, dz);
  const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(dx / L, dy / L, dz / L)); const e = new THREE.Euler().setFromQuaternion(q);
  return <mesh key={key} position={[(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2]} rotation={[e.x, e.y, e.z]}><cylinderGeometry args={[r, r, L, 8]} /><M c={c} /></mesh>;
};
export const Plant: React.FC<P> = ({ t, p }) => {
  const { flow = 0, cols = 3, shed = true, back = 0, glow = 1 } = p;
  const xs = cols === 3 ? [-0.42, 0, 0.42] : [-0.6, -0.2, 0.2, 0.6];
  const fk = flow ? clamp((t - flow) / 0.4) : 0; const bk = back ? clamp((t - back) / 0.4) : 0;
  return (
    <group>
      <B s={[1.7, 0.06, 1.05]} pos={[0, 0.03, 0]} c="#9b9890" />
      {xs.map((x, i) => (
        <group key={i} position={[x, 0.06, -0.12]}>
          <Cyl r={0.16} h={0.82} pos={[0, 0.41, 0]} c={STEEL} />
          <mesh position={[0, 0.82, 0]}><sphereGeometry args={[0.16, 10, 6, 0, PI * 2, 0, PI / 2]} /><M c={STEEL} /></mesh>
          <Cyl r={0.165} h={0.05} pos={[0, 0.25, 0]} c={BLUE} e={BLUE} ei={0.3} />
          <Cyl r={0.165} h={0.05} pos={[0, 0.6, 0]} c={BLUE} e={BLUE} ei={0.3} />
          {[-1, 1].map((s) => <B key={s} s={[0.03, 0.12, 0.03]} pos={[s * 0.12, 0.03, 0.12]} c={PIPE} />)}
          <B s={[0.05, 0.05, 0.02]} pos={[0, 0.45, 0.165]} c="#3ee07a" e="#3ee07a" ei={glow * (0.6 + 0.6 * (Math.sin(t * 4 + i * 2) > 0 ? 1 : 0))} />
        </group>))}
      {/* colector de arriba y de abajo */}
      <Cyl r={0.035} h={xs[xs.length - 1] - xs[0]} rot={[0, 0, PI / 2]} pos={[0, 0.98, -0.12]} c={PIPE} />
      <Cyl r={0.035} h={xs[xs.length - 1] - xs[0] + 0.5} rot={[0, 0, PI / 2]} pos={[0.1, 0.16, 0.12]} c={PIPE} />
      {xs.map((x) => <Cyl key={'v' + x} r={0.03} h={0.1} pos={[x, 0.93, -0.12]} c={PIPE} />)}
      {/* entrada de salmuera desde el pozo (izquierda) */}
      {pipeBetween([-1.25, 0.16, 0.12], [-0.6, 0.16, 0.12], 0.035, PIPE, 'in')}
      {pipeBetween([-0.6, 0.16, 0.12], [-0.6, 0.98, -0.12], 0.03, PIPE, 'up')}
      {pipeBetween([-0.6, 0.98, -0.12], [xs[0], 0.98, -0.12], 0.03, PIPE, 'top')}
      <group position={[-1.25, 0, 0.12]}>
        <B s={[0.18, 0.1, 0.18]} pos={[0, 0.05, 0]} c="#7b818a" />
        <Cyl r={0.05} h={0.26} pos={[0, 0.2, 0]} c={PIPE} />
        <B s={[0.16, 0.04, 0.04]} pos={[0, 0.3, 0]} c="#d9443a" />
      </group>
      <Flow a={[-1.25, 0.2, 0.12]} b={[-0.6, 0.2, 0.12]} t={t} c={BRINE} on={fk} n={5} />
      {/* salida: la salmuera que sobra vuelve al salar (pozo de reinyección a la derecha) */}
      {pipeBetween([0.5, 0.16, 0.12], [1.2, 0.16, 0.12], 0.035, PIPE, 'out')}
      <group position={[1.2, 0, 0.12]}><Cyl r={0.06} h={0.2} pos={[0, 0.1, 0]} c="#7b818a" /></group>
      <Flow a={[0.5, 0.2, 0.12]} b={[1.2, 0.2, 0.12]} t={t} c={BRINE} on={bk} n={5} />
      {shed && <group position={[0.62, 0.06, 0.32]}>
        <B s={[0.42, 0.3, 0.3]} pos={[0, 0.15, 0]} c="#c7a774" />
        <B s={[0.46, 0.04, 0.34]} pos={[0, 0.32, 0]} c="#5a4a3a" />
        <B s={[0.12, 0.08, 0.01]} pos={[-0.08, 0.18, 0.152]} c="#ffd98a" e="#ffd98a" ei={0.7} />
        <B s={[0.1, 0.18, 0.01]} pos={[0.1, 0.09, 0.152]} c="#5a4a3a" />
      </group>}
    </group>
  );
};

/* ---------- Columna de resina en corte (así funciona en Fénix): perlas de resina, salmuera que pasa, litio que queda pegado ---------- */
export const Column: React.FC<P> = ({ t, p }) => {
  const { atrapa = 1, back = 3, H = 1.7, R = 0.5 } = p;
  const beads = React.useMemo(() => { const r = rnd(17); const o: V3[] = [];
    for (let y = 0; y < 7; y++) for (let k = 0; k < 9; k++) { const a = (k / 9) * PI + (y % 2) * 0.17 + (r() - 0.5) * 0.12; const rr = 0.12 + r() * (R - 0.2);
      o.push([Math.cos(a) * rr * (k % 2 ? 1 : 0.6), 0.45 + y * 0.12 + (r() - 0.5) * 0.03, -Math.sin(a) * rr * 0.55 + 0.05]); } return o; }, [R]);
  const NB = 14, NL = 16;
  const tl = t - atrapa;
  return (
    <group>
      {/* mitad de atrás del tanque + tapa y base */}
      <mesh position={[0, H / 2, 0]}><cylinderGeometry args={[R, R, H, 20, 1, true, PI / 2, PI]} /><meshStandardMaterial color="#aab3bd" side={THREE.DoubleSide} flatShading roughness={0.8} /></mesh>
      <Cyl r={R + 0.03} h={0.08} pos={[0, 0.04, 0]} seg={20} c={STEEL2} />
      <mesh position={[0, H, 0]}><cylinderGeometry args={[R + 0.03, R + 0.03, 0.06, 20, 1, false, PI / 2, PI]} /><M c={STEEL2} /></mesh>
      {/* borde del corte */}
      {[-1, 1].map((s) => <B key={s} s={[0.04, H, 0.06]} pos={[s * R, H / 2, 0]} c={STEEL2} />)}
      {/* lecho de perlas de resina */}
      {beads.map((b, i) => <Ball key={i} r={0.062} pos={b} c={RESIN} e={RESIN} ei={0.18} />)}
      {/* salmuera que entra por arriba, atraviesa el lecho y sale por abajo */}
      {Array.from({ length: NB }, (_, i) => { const u = ((t * 0.42 + i / NB) % 1); const x = (((i * 0.53) % 1) - 0.5) * R * 1.4;
        return <Ball key={'b' + i} r={0.032} pos={[x + Math.sin(u * 9 + i) * 0.04, lerp(H - 0.08, 0.14, u), 0.16 + ((i * 0.29) % 1) * 0.12]} c={BRINE} e={BRINE} ei={0.6} />; })}
      {/* litio: antes de 'atrapa' pasa; después cada partícula baja y queda pegada a una perla */}
      {Array.from({ length: NL }, (_, i) => { const tg = beads[(i * 7) % beads.length]; const s0 = i * 0.22; const x0 = (((i * 0.71) % 1) - 0.5) * R * 1.2;
        if (tl < s0) { const u = ((t * 0.42 + i / NL + 0.05) % 1); return <Ball key={'l' + i} r={0.04} pos={[x0, lerp(H - 0.08, 0.14, u), 0.22]} c={LI} e={LI} ei={1.1} />; }
        const k = eio((tl - s0) / 0.8); const u0 = ((s0 + atrapa) * 0.42 + i / NL + 0.05) % 1; const y0 = lerp(H - 0.08, 0.14, u0);
        return <Ball key={'l' + i} r={0.04} pos={[lerp(x0, tg[0], k), lerp(y0, tg[1] + 0.05, k), lerp(0.22, tg[2] + 0.06, k)]} c={LI} e={LI} ei={1.1} />; })}
      {/* caños: entrada arriba a la izquierda, salida abajo a la derecha que baja al salar */}
      {pipeBetween([-1.35, H - 0.15, 0], [-R, H - 0.15, 0], 0.05, PIPE, 'in')}
      {pipeBetween([R, 0.22, 0], [1.25, 0.22, 0], 0.05, PIPE, 'out')}
      {pipeBetween([1.25, 0.22, 0], [1.25, -0.05, 0], 0.05, PIPE, 'down')}
      <Cyl r={0.09} h={0.06} pos={[1.25, 0.02, 0]} c="#7b818a" />
      <Flow a={[-1.35, H - 0.15, 0.0]} b={[-R, H - 0.15, 0.0]} t={t} c={BRINE} n={5} r={0.035} />
      <Flow a={[R, 0.22, 0.0]} b={[1.25, 0.22, 0.0]} t={t} c={BRINE} n={5} r={0.035} on={clamp((t - back) / 0.4)} />
      <Flow a={[1.25, 0.22, 0.0]} b={[1.25, -0.1, 0.0]} t={t} c={BRINE} n={2} r={0.035} on={clamp((t - back) / 0.4)} />
    </group>
  );
};

/* ---------- Corte del salar: costra de sal arriba, salmuera debajo con sal y litio disueltos ---------- */
export const BrineCut: React.FC<P> = ({ t, p }) => {
  const { w = 2.8, d = 1.1, li = 1, salt = 2, well = 0 } = p;
  const lk = clamp((t - li) / 0.4), sk = clamp((t - salt) / 0.4);
  const crust = React.useMemo(() => { const r = rnd(4); return Array.from({ length: 16 }, (_, i) => ({ x: -w / 2 + 0.1 + (i / 15) * (w - 0.2), h: 0.03 + r() * 0.05, s: 0.12 + r() * 0.1 })); }, [w]);
  const dots = React.useMemo(() => { const r = rnd(8); return Array.from({ length: 34 }, () => ({ x: (r() - 0.5) * (w - 0.3), y: 0.42 + r() * 0.78, ph: r() * 6 })); }, [w]);
  return (
    <group>
      <B s={[w, 0.32, d]} pos={[0, 0.16, 0]} c="#7d6a50" />
      <B s={[w, 0.9, d]} pos={[0, 0.77, 0]} c="#1f6f96" e="#1f6f96" ei={0.15} />
      <B s={[w, 0.2, d]} pos={[0, 1.32, 0]} c={SALT2} />
      {crust.map((c, i) => <B key={i} s={[c.s, c.h, c.s]} pos={[c.x, 1.42 + c.h / 2, ((i * 0.37) % 1 - 0.5) * (d - 0.2)]} rot={[0, i, 0]} c={SALT} />)}
      {/* poros: granitos de sal y gotas de litio flotando contra la cara del corte */}
      {dots.map((q, i) => { const y = q.y + Math.sin(t * 1.3 + q.ph) * 0.03; const x = q.x + Math.sin(t * 0.9 + q.ph * 2) * 0.03;
        if (i % 3 === 0) return lk > 0 ? <Ball key={i} r={0.045 * lk} pos={[x, y, d / 2 + 0.03]} c={LI} e={LI} ei={1.1} /> : null;
        return sk > 0 ? <B key={i} s={[0.05 * sk, 0.05 * sk, 0.05 * sk]} pos={[x, y, d / 2 + 0.03]} rot={[q.ph, q.ph, 0]} c="#f2f4f5" e="#ffffff" ei={0.2} /> : null; })}
      {well > 0 && t >= well && <group>{pipeBetween([w * 0.3, 0.6, 0.1], [w * 0.3, 1.9, 0.1], 0.04, PIPE, 'well')}<Cyl r={0.08} h={0.12} pos={[w * 0.3, 1.9, 0.1]} c="#7b818a" /></group>}
    </group>
  );
};

/* ---------- Big-bags de carbonato de litio en pallets (sin rótulos) ---------- */
export const Bags: React.FC<P> = ({ t, p }) => {
  const { n = 8, at = 0, dur = 2, cols = 4, gap = 0.3 } = p; const vis = Math.round(lerp(p.from ?? 0, n, eo((t - at) / dur)));
  return (<group>{Array.from({ length: vis }, (_, i) => { const lay = Math.floor(i / (cols * 2)), j = i % (cols * 2); const x = (j % cols - (cols - 1) / 2) * gap, z = (Math.floor(j / cols) - 0.5) * gap;
    return <group key={i} position={[x, lay * 0.27, z]}>
      <B s={[0.25, 0.03, 0.25]} pos={[0, 0.015, 0]} c="#9a7a52" />
      <B s={[0.22, 0.2, 0.22]} pos={[0, 0.13, 0]} c="#ecebe6" />
      {[-1, 1].map((s) => <B key={s} s={[0.03, 0.06, 0.03]} pos={[s * 0.08, 0.25, 0]} c="#2f6bff" />)}
    </group>; })}</group>);
};

/* ---------- Camión con big-bags ---------- */
export const Truck: React.FC<P> = ({ t }) => (
  <group>
    <B s={[0.42, 0.36, 0.5]} pos={[0.72, 0.3, 0]} c="#c8482f" />
    <B s={[0.05, 0.16, 0.42]} pos={[0.94, 0.38, 0]} c="#2a3440" />
    <B s={[1.2, 0.08, 0.54]} pos={[-0.1, 0.2, 0]} c="#4a4f57" />
    {[-0.5, -0.1, 0.3].map((x) => <group key={x}>{[-0.13, 0.13].map((z) => <B key={z} s={[0.22, 0.22, 0.22]} pos={[x, 0.35, z]} c="#ecebe6" />)}</group>)}
    {[-0.45, 0.1, 0.72].map((x) => [-0.27, 0.27].map((z) => <mesh key={x + ':' + z} position={[x, 0.1, z]} rotation={[PI / 2, 0, t * 6]}><cylinderGeometry args={[0.1, 0.1, 0.07, 8]} /><M c="#1d2126" /></mesh>))}
  </group>
);

/* ---------- Barras de exportación a escala (US$ millones): `vals` en millones, `k` metros por millón ---------- */
export const XBars: React.FC<P> = ({ t, p }) => {
  const { bars = [], k = 0.0011, w = 0.6 } = p;
  return (<group>{bars.map((b: any, i: number) => {
    const g = b.grow === undefined ? 1 : eo((t - b.grow) / (b.dur ?? 1.2)); const h = Math.max(0.002, b.v * k * g);
    const hl = b.hl && t >= b.hl.at ? eo((t - b.hl.at) / 0.4) : 0; const hh = b.hl ? b.hl.v * k : 0;
    return <group key={i} position={[b.x, 0, b.z ?? 0]}>
      <B s={[w + 0.08, 0.04, w + 0.08]} pos={[0, 0.02, 0]} c="#3b3f4a" />
      <B s={[w, h, w]} pos={[0, 0.04 + h / 2, 0]} c={b.c} e={b.c} ei={0.25} />
      {/* rayas de billetes, cada 100 millones */}
      {Array.from({ length: Math.floor(h / (100 * k)) }, (_, j) => <B key={j} s={[w + 0.01, 0.006, w + 0.01]} pos={[0, 0.04 + (j + 1) * 100 * k, 0]} c="#00000044" o={0.35} />)}
      {hl > 0 && <B s={[w + 0.06 * hl, hh, w + 0.06 * hl]} pos={[0, 0.04 + h - hh / 2, 0]} c={b.hl.c} e={b.hl.c} ei={0.6 + 0.2 * Math.sin(t * 5)} />}
    </group>; })}</group>);
};

/* ---------- Flecha de subida (precio) ---------- */
export const Up: React.FC<P> = ({ tt, p }) => {
  const { len = 0.9, c = '#3ee07a' } = p; const k = Math.max(0.001, eo(tt / 0.5));
  return (<group><B s={[0.12, len * k, 0.12]} pos={[0, (len * k) / 2, 0]} c={c} e={c} ei={0.6} />
    <mesh position={[0, len * k + 0.12, 0]}><coneGeometry args={[0.2, 0.26, 4]} /><M c={c} e={c} ei={0.6} /></mesh></group>);
};

/* ---------- Operario sin rasgos (casco y chaleco); `seq` = [[t, pose], ...] con transición de 0,3 s ---------- */
const poseOf = (pose: string, t: number): { aL: V3; aR: V3 } => {
  const sway = Math.sin(t * 2.2); const w = Math.sin(t * 7);
  if (pose === 'wave') return { aL: [0, 0, -0.1], aR: [0, 0, 2.5 + w * 0.3] };
  if (pose === 'point') return { aL: [0, 0, -0.1], aR: [-1.45 + sway * 0.04, 0, 0.15] };
  return { aL: [0, 0, -0.1 - sway * 0.03], aR: [0, 0, 0.1 + sway * 0.03] };
};
export const Worker: React.FC<P> = ({ t, p }) => {
  const seq: [number, string][] = p.seq ?? [[0, p.pose ?? 'idle']];
  let i = 0; for (let j = 0; j < seq.length; j++) if (t >= seq[j][0]) i = j;
  let q = poseOf(seq[i][1], t);
  if (i > 0) { const k = eio((t - seq[i][0]) / 0.3); const a = poseOf(seq[i - 1][1], t); const m = (x: V3, y: V3): V3 => [lerp(x[0], y[0], k), lerp(x[1], y[1], k), lerp(x[2], y[2], k)]; q = { aL: m(a.aL, q.aL), aR: m(a.aR, q.aR) }; }
  const vest = '#ff7a1a', skin = '#c99a72';
  return (
    <group>
      {[-1, 1].map((sd) => <group key={sd} position={[0.12 * sd, 0.7, 0]}><B s={[0.17, 0.7, 0.19]} pos={[0, -0.35, 0]} c="#2e3a4a" /><B s={[0.18, 0.09, 0.26]} pos={[0, -0.68, 0.04]} c="#1a1410" /></group>)}
      <group position={[0, 0.7, 0]}>
        <B s={[0.52, 0.62, 0.29]} pos={[0, 0.32, 0]} c={vest} />
        <B s={[0.53, 0.05, 0.3]} pos={[0, 0.2, 0]} c="#e8e4d0" />
        <group position={[-0.33, 0.58, 0]} rotation={q.aL}><B s={[0.13, 0.5, 0.14]} pos={[0, -0.22, 0]} c={vest} /><B s={[0.12, 0.12, 0.13]} pos={[0, -0.52, 0]} c={skin} /></group>
        <group position={[0.33, 0.58, 0]} rotation={q.aR}><B s={[0.13, 0.5, 0.14]} pos={[0, -0.22, 0]} c={vest} /><B s={[0.12, 0.12, 0.13]} pos={[0, -0.52, 0]} c={skin} /></group>
        <group position={[0, 0.84, 0]}>
          <B s={[0.37, 0.36, 0.34]} c={skin} />
          <mesh position={[0, 0.17, 0]}><sphereGeometry args={[0.22, 10, 6, 0, PI * 2, 0, PI / 2]} /><M c="#f1efe6" /></mesh>
          <B s={[0.46, 0.03, 0.44]} pos={[0, 0.17, 0.02]} c="#f1efe6" />
        </group>
      </group>
    </group>
  );
};

export const EXTRA = { world: World, pond: Pond, cal: Cal, clock: Clock, plant: Plant, column: Column, brinecut: BrineCut, bags: Bags, truck: Truck, xbars: XBars, up: Up, worker: Worker };
