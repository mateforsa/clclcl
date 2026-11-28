import React from 'react';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';
import { M, useTex } from '../../src/kit/Props';
import { clamp, eio, eo, lerp, rnd } from '../../src/kit/math';

// Look propio: corte transversal del Río de la Plata y la ciudad, como lámina de ingeniería. Un solo bloque de tierra cortado de frente
// (cara del corte en z = 0): a la izquierda el río marrón con la torre de toma, debajo el caño que cruza hasta la planta (bombas,
// coagulación, decantación, filtración, tanques) y, a la derecha, el túnel de salida bajo la ciudad hasta una casa con la canilla.
// El agua cambia de color en el recorrido: marrón del río -> beige -> celeste limpio.
// Sin carteles 3D con texto y sin personas. El mundo vive detrás de la pared del fondo del set 'room' (los beats lo ubican en z = -14).
// `Shade` (de litio-pileta-salar): velo pegado a la cámara que deja oscura la franja de subtítulos en todos los cuadros.
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
const on = (t: number, at: number | undefined, d = 0.4) => (at === undefined ? 1 : clamp((t - at) / d));
const mixc = (a: string, b: string, k: number) => '#' + new THREE.Color(a).lerp(new THREE.Color(b), clamp(k)).getHexString();

/* ---------- medidas del mundo (unidades de escena) ---------- */
export const L = {
  X0: -7.5, X1: 15, ZB: -1.8, GROUND: 0.2, SURF: 0.12, BED: -0.85, SILT: -1.0, BOTTOM: -3.0,
  TOWER: -4.2, PIPE_Y: -1.2, PIPE_R: 0.15, PUMP: [2.7, 3.5], COAG: [3.75, 4.55], DEC: [4.75, 5.75], FIL: [5.95, 6.75], TANK: [7.0, 8.0],
  TUN_Y: -0.7, TUN_R: 0.13, BRANCH: [9.3, 10.5, 11.9, 13.1], HOUSE: 11.9,
};
export const MUD = '#7a5832', MUD2 = '#8d6a3e', TAN = '#a08a62', HAZE = '#8fa592', FILT = '#6fb3c8', CLEAN = '#4fb4e6', CLEAN2 = '#3aa7ff';
const STEEL = '#b9c1c9', STEEL2 = '#7d8792', CONC = '#a7a49a', CONC2 = '#8e8b82', BRICK = '#a4542f', TRIM = '#efe6d2';

/* ---------- Velo oscuro pegado a la cámara (igual que litio-pileta-salar) ---------- */
const Shade: React.FC<{ y1?: number; a?: number }> = ({ y1 = 640, a = 0.9 }) => {
  const { camera } = useThree();
  const tex = useTex((g, W, H) => {
    g.clearRect(0, 0, W, H);
    for (let y = 0; y < H; y++) { const px = (y / H) * y1; const k = px < 430 ? 1 : 1 - clamp((px - 430) / (y1 - 430)); const al = a * (k * k * (3 - 2 * k));
      g.fillStyle = `rgba(6,10,20,${al})`; g.fillRect(0, y, W, 1); }
  }, 4, 256, 'rioshade' + y1 + a);
  const geo = React.useMemo(() => new THREE.PlaneGeometry(1, 1), []);
  camera.updateMatrixWorld();
  const yb = 1 - (2 * y1) / 1920; const pos = geo.attributes.position as THREE.BufferAttribute;
  const pts: [number, number][] = [[-1.1, 1.1], [1.1, 1.1], [-1.1, yb], [1.1, yb]];
  pts.forEach(([x, y], i) => { const v = new THREE.Vector3(x, y, -0.9).unproject(camera); pos.setXYZ(i, v.x, v.y, v.z); });
  pos.needsUpdate = true; geo.computeBoundingSphere();
  return <mesh geometry={geo} frustumCulled={false} renderOrder={999}>
    <meshBasicMaterial map={tex} transparent depthTest={false} depthWrite={false} toneMapped={false} fog={false} /></mesh>;
};

/* ---------- Fondo: cielo nublado sobre el río (gris verdoso abajo, azul noche arriba), piso oscuro y velo ---------- */
export const World: React.FC<P> = ({ p }) => {
  const sky = useTex((g, W, H) => {
    const gr = g.createLinearGradient(0, H, 0, 0);
    [[0, '#b7b9a4'], [0.06, '#8c9c94'], [0.14, '#51677a'], [0.26, '#22324a'], [0.42, '#0f1828'], [1, '#070b14']].forEach(([f, c]) => gr.addColorStop(f as number, c as string));
    g.fillStyle = gr; g.fillRect(0, 0, W, H);
    // costa uruguaya lejana: una línea baja apenas sobre el horizonte
    const r = rnd(7); g.fillStyle = '#6f7a73'; g.beginPath(); g.moveTo(0, H);
    for (let x = 0; x <= W; x += 8) g.lineTo(x, H * (0.985 - r() * 0.008)); g.lineTo(W, H); g.fill();
  }, 256, 1024, 'riosky');
  return (
    <group>
      <group position={[0, 0, p.oz ?? 0]}>
      <fog attach="fog" args={['#2b3640', p.fogNear ?? 14, p.fogFar ?? 40]} />
      <mesh position={[4, 6, -9]}><planeGeometry args={[80, 26]} /><meshBasicMaterial map={sky} toneMapped={false} fog={false} /></mesh>
      <mesh rotation={[-PI / 2, 0, 0]} position={[4, L.BOTTOM - 0.02, 0]}><planeGeometry args={[80, 40]} /><M c="#0c1117" /></mesh>
      <hemisphereLight args={['#dfe6ee', '#4a3d30', 0.45]} />
      <directionalLight position={[-3, 6, 5]} intensity={0.5} color="#fff1dc" />
      </group>
      {!p.noShade && <Shade y1={p.shadeY ?? 640} a={p.shadeA ?? 0.9} />}
    </group>
  );
};

/* ---------- Bloque de tierra cortado: una sola malla con colores por vértice, con huecos para río, caños, cámaras y piletas ---------- */
type Box6 = [number, number, number, number, number, number]; // x0 x1 y0 y1 z0 z1
const HOLES: Box6[] = (() => {
  const h: Box6[] = [];
  h.push([L.X0, 0, L.BED, L.GROUND + 1, L.ZB, 0.01]); // río
  h.push([L.TOWER - 0.14, L.TOWER + 0.14, L.PIPE_Y - L.PIPE_R - 0.02, L.BED + 0.01, -0.45, 0.01]); // pozo bajo la torre
  h.push([L.TOWER - 0.14, L.PUMP[0] + 0.01, L.PIPE_Y - L.PIPE_R - 0.02, L.PIPE_Y + L.PIPE_R + 0.02, -0.45, 0.01]); // caño de 5,4 m
  h.push([L.PUMP[0], L.PUMP[1], L.PIPE_Y - L.PIPE_R - 0.02, L.GROUND + 0.01, -0.9, 0.01]); // cámara de bombas
  for (const [a, b] of [L.COAG, L.DEC, L.FIL]) h.push([a, b, -0.45, L.GROUND + 0.01, -1.0, 0.01]);
  h.push([L.TANK[0], L.TANK[1], -0.95, L.SURF, -1.2, 0.01]); // tanques (techados)
  h.push([L.TANK[1] - 0.01, L.X1 + 0.1, L.TUN_Y - L.TUN_R - 0.02, L.TUN_Y + L.TUN_R + 0.02, -0.4, 0.01]); // túnel de salida
  for (const x of L.BRANCH) h.push([x - 0.06, x + 0.06, L.TUN_Y, L.GROUND + 0.01, -0.25, 0.01]);
  return h;
})();
const earthColor = (x: number, y: number) => {
  if (y > L.SURF) return x < 2.5 ? '#5f7346' : x < 8.25 ? CONC : '#4f535b';
  if (x < 0) return y > L.SILT ? '#4e3d2b' : y > -1.9 ? '#7d6a52' : '#3f3a36';
  return y > -0.5 ? '#6a4a30' : y > L.SILT ? '#5c4630' : y > -1.9 ? '#7d6a52' : '#3f3a36';
};
const buildEarth = () => {
  const xs = new Set<number>([L.X0, L.X1]), ys = new Set<number>([L.BOTTOM, L.GROUND, L.SURF, L.BED, L.SILT, -0.5, -1.9]), zs = new Set<number>([L.ZB, 0]);
  [0, 2.5, 8.25].forEach((x) => xs.add(x));
  for (const h of HOLES) { xs.add(clamp(h[0], L.X0, L.X1)); xs.add(clamp(h[1], L.X0, L.X1)); ys.add(clamp(h[2], L.BOTTOM, L.GROUND)); ys.add(clamp(h[3], L.BOTTOM, L.GROUND)); zs.add(clamp(h[4], L.ZB, 0)); zs.add(clamp(h[5], L.ZB, 0)); }
  const X = [...xs].sort((a, b) => a - b), Y = [...ys].sort((a, b) => a - b), Z = [...zs].sort((a, b) => a - b);
  const inHole = (x: number, y: number, z: number) => HOLES.some((h) => x > h[0] && x < h[1] && y > h[2] && y < h[3] && z > h[4] && z < h[5]);
  const pos: number[] = [], nor: number[] = [], col: number[] = [];
  const c = new THREE.Color();
  const box = (x0: number, x1: number, y0: number, y1: number, z0: number, z1: number, hex: string, shade: number) => {
    c.set(hex).multiplyScalar(shade);
    const g = new THREE.BoxGeometry(x1 - x0, y1 - y0, z1 - z0); g.translate((x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2);
    const ng = g.toNonIndexed(); const pa = ng.attributes.position.array, na = ng.attributes.normal.array;
    for (let i = 0; i < pa.length; i++) { pos.push(pa[i]); nor.push(na[i]); }
    for (let i = 0; i < pa.length / 3; i++) col.push(c.r, c.g, c.b);
  };
  for (let k = 0; k < Z.length - 1; k++) for (let j = 0; j < Y.length - 1; j++) {
    const yc = (Y[j] + Y[j + 1]) / 2, zc = (Z[k] + Z[k + 1]) / 2; let i = 0;
    while (i < X.length - 1) {
      const xc = (X[i] + X[i + 1]) / 2; if (inHole(xc, yc, zc)) { i++; continue; }
      const hex = earthColor(xc, yc); let e = i + 1;
      while (e < X.length - 1) { const xe = (X[e] + X[e + 1]) / 2; if (inHole(xe, yc, zc) || earthColor(xe, yc) !== hex) break; e++; }
      box(X[i], X[e], Y[j], Y[j + 1], Z[k], Z[k + 1], hex, 1); i = e;
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); g.setAttribute('normal', new THREE.Float32BufferAttribute(nor, 3)); g.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
  return g;
};
export const Earth: React.FC<P> = () => {
  const geo = React.useMemo(buildEarth, []);
  // piedritas de tosca y roca pegadas a la cara del corte (solo en la tierra profunda, donde van las placas: todas oscuras)
  const stones = React.useMemo(() => { const r = rnd(31); const o: { x: number; y: number; s: number; c: string }[] = [];
    for (let i = 0; i < 90; i++) { const x = L.X0 + 0.2 + r() * (L.X1 - L.X0 - 0.4); const y = -1.25 - r() * 1.6; if (y > -1.42 && x < L.PUMP[1] + 0.1) continue; o.push({ x, y, s: 0.03 + r() * 0.05, c: y > -1.9 ? '#6b5a45' : '#2f2b28' }); } return o; }, []);
  return (
    <group>
      <mesh geometry={geo}><meshStandardMaterial vertexColors flatShading roughness={0.95} metalness={0} /></mesh>
      {stones.map((s, i) => <B key={i} s={[s.s, s.s * 0.7, 0.02]} pos={[s.x, s.y, 0.005]} rot={[0, 0, i]} c={s.c} />)}
      {/* bordes del corte: una línea clara apenas marcada donde termina el pasto/vereda */}
      <B s={[L.X1, 0.012, 0.012]} pos={[L.X1 / 2, L.GROUND - 0.006, 0.006]} c="#2a2a2a" />
      {/* veredas y cordón en la ciudad, faroles bajos en el parque costero */}
      {[0.5, 1.2, 1.9].map((x) => <group key={x} position={[x, L.GROUND, -1.3]}><Cyl r={0.012} h={0.32} pos={[0, 0.16, 0]} c="#2b2f36" /><Ball r={0.03} pos={[0, 0.33, 0]} c="#ffe6a8" e="#ffe6a8" ei={0.8} /></group>)}
      {[[0.6, -0.4], [1.5, -0.9], [2.1, -0.3]].map(([x, z], i) => <group key={'tr' + i} position={[x, L.GROUND, z]}><Cyl r={0.025} h={0.16} pos={[0, 0.08, 0]} c="#4a3626" /><mesh position={[0, 0.25, 0]}><icosahedronGeometry args={[0.13, 0]} /><M c="#4d6a3a" /></mesh></group>)}
    </group>
  );
};

/* ---------- Río: agua marrón (corte translúcido), oleaje, torre de toma y regla desde la costa ---------- */
export const River: React.FC<P> = ({ t, p }) => {
  const W = -L.X0; const dep = -L.BED;
  const silt = React.useMemo(() => { const r = rnd(12); return Array.from({ length: 46 }, () => ({ x: L.X0 + 0.2 + r() * (W - 0.4), y: L.BED + 0.08 + r() * (dep - 0.16), ph: r() * 6, s: 0.018 + r() * 0.02 })); }, []);
  const take = p.take; const tk = take === undefined ? 0 : clamp((t - take) / 0.5);
  const hl = p.hl === undefined ? 0 : clamp((t - p.hl) / 0.3);
  return (
    <group>
      <B s={[W, dep, -L.ZB]} pos={[L.X0 / 2, L.BED / 2, L.ZB / 2]} c={MUD} e={MUD} ei={0.12} o={0.82} />
      {/* olas en la superficie */}
      {Array.from({ length: 14 }, (_, i) => { const u = ((t * 0.05 + i / 14) % 1); return <B key={i} s={[0.5, 0.008, 0.03]} pos={[lerp(L.X0 + 0.4, -0.4, u), 0.004, -0.2 - ((i * 0.37) % 1) * 1.4]} c="#b08c5c" />; })}
      {/* sedimento flotando contra la cara del corte */}
      {silt.map((s, i) => <B key={'s' + i} s={[s.s, s.s, s.s]} pos={[s.x + Math.sin(t * 0.7 + s.ph) * 0.05, s.y + Math.sin(t * 1.1 + s.ph) * 0.03, 0.012]} rot={[s.ph, s.ph, 0]} c="#c49a62" />)}
      {/* costa: barranca baja de piedras */}
      {[0.05, 0.15, 0.26].map((y, i) => <B key={'c' + i} s={[0.16, 0.1, 1.7]} pos={[-0.06 - i * 0.03, y - 0.1, -0.9]} c={i % 2 ? '#6d6458' : '#7d746a'} />)}
      {/* torre de toma */}
      <group position={[L.TOWER, 0, -0.3]}>
        <Cyl r={0.24} h={-L.BED + 0.55} pos={[0, (L.BED + 0.55) / 2, 0]} seg={12} c="#c9c2b4" />
        <Cyl r={0.3} h={0.06} pos={[0, L.BED + 0.03, 0]} seg={12} c="#9e968a" />
        {[-0.6, -0.4].map((y) => [-0.17, 0, 0.17].map((x) => <B key={y + ':' + x} s={[0.08, 0.1, 0.02]} pos={[x, y, 0.235]} c="#2a2d30" />))}
        <B s={[0.62, 0.22, 0.5]} pos={[0, 0.66, 0]} c="#d8d1c2" />
        <B s={[0.7, 0.05, 0.58]} pos={[0, 0.795, 0]} c="#5a4a3a" />
        {[-0.18, 0, 0.18].map((x) => <B key={'w' + x} s={[0.09, 0.08, 0.01]} pos={[x, 0.67, 0.252]} c="#2c3644" e="#ffcf7a" ei={0.25} />)}
        <B s={[0.05, 0.05, 0.05]} pos={[0.26, 0.85, 0.2]} c="#ff3b3b" e="#ff3b3b" ei={1.2 + Math.sin(t * 5)} />
        {/* pasarela a la costa no hay: se llega en lancha. Anillo de resalte */}
        {hl > 0 && <mesh position={[0, 0.006, 0]} rotation={[-PI / 2, 0, 0]}><ringGeometry args={[0.36, 0.36 + 0.05 * hl, 32]} /><meshBasicMaterial color="#ffd23a" transparent opacity={0.9 * hl} toneMapped={false} /></mesh>}
      </group>
      {/* agua que entra a la torre: partículas que van hacia la reja y bajan por el pozo */}
      {tk > 0 && Array.from({ length: 12 }, (_, i) => { const side = i % 2 ? 1 : -1; const u = ((t - take) * 0.55 + i / 12) % 1;
        const x = L.TOWER + side * lerp(1.1, 0.08, eo(clamp(u * 1.6))); const y = u < 0.62 ? lerp(-0.25 - (i % 3) * 0.12, -0.5, u / 0.62) : lerp(-0.5, L.PIPE_Y + 0.02, (u - 0.62) / 0.38);
        const xx = u < 0.62 ? x : L.TOWER + side * 0.05;
        return <Ball key={'k' + i} r={0.035 * tk} pos={[xx, y, 0.02]} c="#d8a868" e="#d8a868" ei={0.7} />; })}
      {/* regla desde la costa hasta la torre (sin números: la cifra va en la placa) */}
      {p.ruler !== undefined && (() => { const k = eio(clamp((t - p.ruler) / 1.0)); const len = Math.max(0.001, -L.TOWER * k);
        return <group position={[0, 0.03, -0.05]}>
          <B s={[len, 0.03, 0.05]} pos={[-len / 2, 0, 0]} c="#ffd23a" e="#ffd23a" ei={0.5} />
          {Array.from({ length: 13 }, (_, i) => { const x = -(i / 12) * -L.TOWER; return x >= -len - 0.001 ? <B key={i} s={[0.02, i % 3 === 0 ? 0.1 : 0.06, 0.05]} pos={[x, 0.02, 0]} c="#1a1a1a" /> : null; })}
          <B s={[0.03, 0.2, 0.06]} pos={[0, 0.06, 0]} c="#ffd23a" e="#ffd23a" ei={0.5} />
          {k > 0.98 && <B s={[0.03, 0.2, 0.06]} pos={[L.TOWER + 0.26, 0.06, 0]} c="#ffd23a" e="#ffd23a" ei={0.5} />}
        </group>; })()}
    </group>
  );
};

/* ---------- Caños en corte: media caña de atrás, cara de agua y partículas; tramos horizontales o verticales ---------- */
type Seg = { a: [number, number]; b: [number, number]; r: number; c: string; flow?: number; speed?: number; hl?: number; dia?: number };
const PipeSeg: React.FC<{ s: Seg; t: number }> = ({ s, t }) => {
  const [x0, y0] = s.a, [x1, y1] = s.b; const horiz = Math.abs(y1 - y0) < 1e-6; const len = Math.hypot(x1 - x0, y1 - y0);
  const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2; const fk = on(t, s.flow); const hl = s.hl === undefined ? 0 : clamp((t - s.hl) / 0.3) * (0.6 + 0.4 * Math.sin((t - s.hl) * 6));
  const rot: V3 = horiz ? [0, 0, PI / 2] : [0, 0, 0];
  const n = Math.max(3, Math.round(len * 4));
  return (
    <group>
      <mesh position={[cx, cy, 0]} rotation={rot}><cylinderGeometry args={[s.r, s.r, len, 14, 1, true, horiz ? PI / 2 : PI / 2, PI]} /><meshStandardMaterial color={STEEL2} side={THREE.DoubleSide} flatShading roughness={0.7} /></mesh>
      <B s={horiz ? [len, s.r * 1.7, 0.01] : [s.r * 1.7, len, 0.01]} pos={[cx, cy, -0.012]} c={s.c} e={s.c} ei={0.18} />
      {[-1, 1].map((k) => <B key={k} s={horiz ? [len, 0.025, 0.03] : [0.025, len, 0.03]} pos={horiz ? [cx, cy + k * s.r * 0.93, -0.005] : [cx + k * s.r * 0.93, cy, -0.005]} c={STEEL} e={hl ? '#ffd23a' : undefined} ei={hl * 1.2} />)}
      {fk > 0 && Array.from({ length: n }, (_, i) => { const u = ((t * (s.speed ?? 0.5) / Math.max(len, 0.3) + i / n) % 1); const off = (((i * 0.37) % 1) - 0.5) * s.r * 1.1;
        return <B key={i} s={horiz ? [0.07 * fk, 0.025 * fk, 0.01] : [0.025 * fk, 0.07 * fk, 0.01]} pos={horiz ? [lerp(x0, x1, u), cy + off, 0.0] : [cx + off, lerp(y0, y1, u), 0.0]} c={mixc(s.c, '#ffffff', 0.45)} e={mixc(s.c, '#ffffff', 0.45)} ei={0.5} />; })}
      {s.dia !== undefined && t >= s.dia && (() => { const k = eo(clamp((t - s.dia) / 0.35)); const h = s.r * 2 * k; const x = horiz ? lerp(x0, x1, 0.3) : cx;
        return <group position={[x, cy, 0.04]}>
          <B s={[0.03, h, 0.02]} c="#ffd23a" e="#ffd23a" ei={0.8} />
          {k > 0.9 && [-1, 1].map((d) => <mesh key={d} position={[0, d * (s.r - 0.035), 0]} rotation={[0, 0, d > 0 ? 0 : PI]}><coneGeometry args={[0.045, 0.07, 4]} /><M c="#ffd23a" e="#ffd23a" ei={0.8} /></mesh>)}
        </group>; })()}
    </group>
  );
};
export const Pipes: React.FC<P> = ({ t, p }) => {
  const f = p.flow ?? {}; const h = p.hl ?? {};
  const segs: Seg[] = [
    { a: [L.TOWER, L.BED], b: [L.TOWER, L.PIPE_Y], r: 0.12, c: MUD, flow: f.main, hl: h.main },
    { a: [L.TOWER, L.PIPE_Y], b: [L.PUMP[0], L.PIPE_Y], r: L.PIPE_R, c: MUD, flow: f.main, speed: p.fast ? 1.6 : 0.9, hl: h.main, dia: p.dia },
    { a: [L.TANK[1], L.TUN_Y], b: [L.X1, L.TUN_Y], r: L.TUN_R, c: CLEAN2, flow: f.tun, speed: 0.9, hl: h.tun },
    ...L.BRANCH.map((x, i) => ({ a: [x, L.TUN_Y] as [number, number], b: [x, L.GROUND] as [number, number], r: 0.045, c: CLEAN2, flow: f.br === undefined ? undefined : f.br + i * (p.brStep ?? 0), speed: 0.4 })),
  ];
  return <group>{segs.map((s, i) => <PipeSeg key={i} s={s} t={t} />)}</group>;
};

/* ---------- Planta en corte: bombas, coagulación, decantación, filtración, tanques y edificio histórico ---------- */
const Basin: React.FC<{ x: [number, number]; y0: number; lvl: number; c: string; d?: number; lit: number; t: number }> = ({ x, y0, lvl, c, d = 1.0, lit, t }) => {
  const w = x[1] - x[0], cx = (x[0] + x[1]) / 2, h = lvl - y0;
  return (
    <group>
      <B s={[w, h, d]} pos={[cx, y0 + h / 2, -d / 2]} c={c} e={c} ei={0.14 + lit * 0.35} o={0.92} />
      {/* brillo en la superficie */}
      {[0, 1].map((i) => { const u = ((t * 0.2 + i / 2) % 1); return <B key={i} s={[w * 0.3, 0.006, 0.03]} pos={[lerp(x[0] + w * 0.18, x[1] - w * 0.18, u), lvl + 0.004, -0.3 - i * 0.35]} c={mixc(c, '#ffffff', 0.5)} />; })}
      {lit > 0 && <B s={[w + 0.04, 0.025, 0.03]} pos={[cx, L.GROUND + 0.013, 0.012]} c="#ffd23a" e="#ffd23a" ei={0.9 * lit} />}
    </group>
  );
};
export const Plant: React.FC<P> = ({ t, p }) => {
  const s = p.st ?? {}; // tiempos de cada etapa: bombas, coag, dec, fil, tan
  const lit = (k: string) => (s[k] === undefined ? 0 : clamp((t - s[k]) / 0.3) * (p.keep || s[k + 'Off'] === undefined || t < s[k + 'Off'] ? 1 : 1 - clamp((t - s[k + 'Off']) / 0.3)));
  const run = (k: string) => (p.all ? 1 : s[k] === undefined ? 0 : clamp((t - s[k]) / 0.4));
  // bombas: sedimento que cae y se junta en el fondo
  const sed = p.all ? 1 : s.bombas === undefined ? 0 : eo(clamp((t - s.bombas) / 2.5));
  const flocs = React.useMemo(() => { const r = rnd(41); return Array.from({ length: 18 }, () => ({ x: r(), y: r(), ph: r() * 6 })); }, []);
  const coagK = run('coag'), decK = run('dec'), filK = run('fil');
  const tdec = p.all ? 3 : s.dec === undefined ? 0 : t - s.dec;
  const bk = p.build; const b1 = bk ? eo(clamp((t - bk[0]) / 0.6)) : 1, b2 = bk ? eo(clamp((t - bk[1]) / 0.6)) : 1;
  return (
    <group>
      {/* cámara de bombas */}
      <Basin x={L.PUMP as any} y0={L.PIPE_Y - L.PIPE_R} lvl={0.02} c={mixc(MUD, MUD2, sed)} d={0.9} lit={lit('bombas')} t={t} />
      <B s={[0.76, 0.1 * sed + 0.002, 0.9]} pos={[3.1, L.PIPE_Y - L.PIPE_R + 0.05 * sed, -0.45]} c="#4a3420" />
      {Array.from({ length: 10 }, (_, i) => { const u = (((t * 0.3) + i / 10) % 1); const x = 2.78 + ((i * 0.41) % 1) * 0.64; const y = lerp(-0.1, L.PIPE_Y - L.PIPE_R + 0.1 * sed + 0.02, u);
        return sed > 0 && sed < 1.01 ? <B key={i} s={[0.03, 0.03, 0.01]} pos={[x, y, 0.004]} c="#3d2a18" /> : null; })}
      {/* bombas: columnas que suben a la sala de máquinas */}
      {[2.92, 3.28].map((x, i) => <group key={i}>
        <Cyl r={0.05} h={0.9} pos={[x, -0.4, -0.45]} c={STEEL2} />
        <Cyl r={0.08} h={0.16} pos={[x, L.GROUND + 0.1, -0.45]} c="#2f6bff" e="#2f6bff" ei={0.25} />
        <group position={[x, L.GROUND + 0.22, -0.45]} rotation={[0, run('bombas') * t * 8 + i, 0]}><B s={[0.2, 0.04, 0.04]} c="#e8e4d0" /></group>
      </group>)}
      <B s={[0.86, 0.04, 0.9]} pos={[3.1, L.GROUND + 0.02, -0.45]} c={CONC2} o={0.35} />
      <B s={[0.9, 0.36, 0.08]} pos={[3.1, L.GROUND + 0.18, -0.95]} c="#c8bfae" />
      <B s={[0.9, 0.05, 1.0]} pos={[3.1, L.GROUND + 0.42, -0.5]} c="#5a4a3a" />
      {[-0.45, 0.45].map((d) => <B key={d} s={[0.04, 0.4, 1.0]} pos={[3.1 + d, L.GROUND + 0.2, -0.5]} c="#c8bfae" />)}
      {/* caño de las bombas a la coagulación (por arriba) */}
      <Cyl r={0.035} h={0.4} rot={[0, 0, PI / 2]} pos={[3.55, L.GROUND + 0.12, -0.5]} c={STEEL2} />
      {/* coagulación: agua marrón, paleta que mezcla y flóculos que se juntan */}
      <Basin x={L.COAG as any} y0={-0.45} lvl={0.14} c={mixc(MUD2, TAN, coagK)} lit={lit('coag')} t={t} />
      <group position={[4.15, 0.24, -0.5]}><Cyl r={0.015} h={0.6} pos={[0, -0.25, 0]} c={STEEL2} /><group position={[0, -0.45, 0]} rotation={[0, t * (0.6 + 2.5 * coagK), 0]}><B s={[0.5, 0.08, 0.03]} c={STEEL} /></group></group>
      {flocs.map((f, i) => { const gx = 3.85 + (Math.floor(i / 6) + 0.5) * 0.2, gy = -0.15 - (i % 3) * 0.08; const fx = lerp(3.82 + f.x * 0.66, gx + Math.sin(i) * 0.04, coagK * 0.85), fy = lerp(-0.4 + f.y * 0.5, gy + Math.cos(i) * 0.03, coagK * 0.85);
        return <B key={i} s={[0.03 + 0.02 * coagK, 0.03 + 0.02 * coagK, 0.01]} pos={[fx + Math.sin(t + f.ph) * 0.02, fy + Math.cos(t * 1.3 + f.ph) * 0.02, 0.004]} c="#5a3e22" />; })}
      {/* decantación: los flóculos bajan al fondo y el agua aclara */}
      <Basin x={L.DEC as any} y0={-0.45} lvl={0.14} c={mixc(TAN, HAZE, eo(clamp(tdec / 2.2)))} lit={lit('dec')} t={t} />
      {Array.from({ length: 14 }, (_, i) => { const x = 4.85 + ((i * 0.53) % 1) * 0.8; const y0 = -0.05 - ((i * 0.29) % 1) * 0.25; const y = lerp(y0, -0.42 + (i % 3) * 0.015, eo(clamp((tdec - (i % 5) * 0.15) / 1.4)));
        return <B key={i} s={[0.045, 0.035, 0.01]} pos={[x, y, 0.004]} c="#5a3e22" />; })}
      <B s={[1.0, 0.04 * (decK || (p.all ? 1 : 0)) + 0.002, 1.0]} pos={[5.25, -0.43, -0.5]} c="#4a3420" />
      {/* filtración: grava y arena abajo, agua que baja y sale limpia */}
      <Basin x={L.FIL as any} y0={-0.08} lvl={0.14} c={mixc(HAZE, FILT, filK)} lit={lit('fil')} t={t} />
      <B s={[0.8, 0.2, 1.0]} pos={[6.35, -0.18, -0.5]} c="#d8c690" />
      <B s={[0.8, 0.17, 1.0]} pos={[6.35, -0.365, -0.5]} c="#8b8378" />
      {Array.from({ length: 16 }, (_, i) => <B key={'g' + i} s={[0.04, 0.03, 0.01]} pos={[6.0 + ((i * 0.61) % 1) * 0.7, -0.33 - ((i * 0.37) % 1) * 0.1, 0.004]} c={i % 2 ? '#6c655c' : '#a59c90'} />)}
      {filK > 0 && Array.from({ length: 8 }, (_, i) => { const u = ((t * 0.45 + i / 8) % 1); return <B key={'d' + i} s={[0.02, 0.04, 0.01]} pos={[6.05 + ((i * 0.43) % 1) * 0.6, lerp(0.1, -0.42, u), 0.008]} c={FILT} e={FILT} ei={0.8 * filK} />; })}
      <Cyl r={0.03} h={0.3} rot={[0, 0, PI / 2]} pos={[6.87, -0.38, -0.5]} c={STEEL2} />
      {/* tanques techados con agua limpia y dosificadores de las últimas sustancias */}
      <Basin x={L.TANK as any} y0={-0.95} lvl={-0.05} c={CLEAN} d={1.2} lit={lit('tan')} t={t} />
      {[7.25, 7.75].map((x, i) => <Cyl key={i} r={0.03} h={0.95} pos={[x, -0.47, -0.9]} c={CONC2} />)}
      {[7.3, 7.7].map((x, i) => <group key={'ds' + i}>
        <Cyl r={0.06} h={0.16} pos={[x, L.GROUND + 0.08, -0.55]} c={i ? '#e8e4d0' : '#d0e8e0'} />
        <Cyl r={0.012} h={0.22} pos={[x, 0.04, -0.55]} c={STEEL2} />
        {run('tan') > 0 && Array.from({ length: 4 }, (_, j) => { const u = ((t * 0.9 + j / 4 + i * 0.3) % 1); return <Ball key={j} r={0.022} pos={[x, lerp(-0.08, -0.05 - 0.02, u) - u * 0.0, -0.55 + 0.0]} c={i ? '#ffe68a' : '#9ff0d0'} e={i ? '#ffe68a' : '#9ff0d0'} ei={0.9} o={1 - u} />; })}
        {run('tan') > 0 && [0, 1, 2].map((j) => { const u = ((t * 0.7 + j / 3 + i * 0.5) % 1); return <B key={'r' + j} s={[0.04 + u * 0.18, 0.005, 0.04 + u * 0.18]} pos={[x, -0.045, -0.55]} c="#ffffff" o={0.5 * (1 - u)} />; })}
      </group>)}
      {/* edificio histórico de la planta (atrás de las piletas): mitad izquierda y mitad derecha */}
      {[[3.6, 5.25, b1], [5.25, 6.9, b2]].map(([x0, x1, k], i) => { const w = (x1 as number) - (x0 as number), cx = ((x0 as number) + (x1 as number)) / 2, h = 0.72 * Math.max(0.001, k as number);
        if ((k as number) <= 0) return null;
        return <group key={'ed' + i} position={[cx, L.GROUND, -1.48]} scale={[1, Math.max(0.001, k as number), 1]}>
          <B s={[w, 0.72, 0.56]} pos={[0, 0.36, 0]} c={BRICK} />
          <B s={[w + 0.02, 0.05, 0.6]} pos={[0, 0.74, 0]} c={TRIM} />
          <B s={[w + 0.02, 0.04, 0.6]} pos={[0, 0.3, 0]} c={TRIM} />
          {Array.from({ length: 6 }, (_, j) => <group key={j} position={[-w / 2 + (j + 0.5) * (w / 6), 0, 0.285]}>
            <B s={[0.12, 0.17, 0.01]} pos={[0, 0.5, 0]} c="#2c3644" e="#ffcf7a" ei={0.18} /><Cyl r={0.06} h={0.012} rot={[PI / 2, 0, 0]} pos={[0, 0.585, 0]} c="#2c3644" />
            <B s={[0.12, 0.14, 0.01]} pos={[0, 0.14, 0]} c="#2c3644" />
          </group>)}
          {i === 0 && <group position={[-w / 2 + 0.12, 0, 0]}><B s={[0.26, 1.0, 0.6]} pos={[0, 0.5, 0]} c={BRICK} /><mesh position={[0, 1.08, 0]}><coneGeometry args={[0.2, 0.18, 4]} /><M c="#4f5f6a" /></mesh></group>}
          {i === 1 && <group position={[w / 2 - 0.12, 0, 0]}><B s={[0.26, 1.0, 0.6]} pos={[0, 0.5, 0]} c={BRICK} /><mesh position={[0, 1.08, 0]}><coneGeometry args={[0.2, 0.18, 4]} /><M c="#4f5f6a" /></mesh></group>}
        </group>; })}
    </group>
  );
};

/* ---------- Ciudad: edificios atrás y una casa cortada al frente con la cocina y la canilla ---------- */
export const City: React.FC<P> = ({ t, p }) => {
  const bl = React.useMemo(() => { const r = rnd(23); const o: { x: number; w: number; h: number; z: number; c: string }[] = []; let x = 8.5;
    while (x < 14.8) { const w = 0.5 + r() * 0.45; o.push({ x: x + w / 2, w, h: 0.55 + r() * 0.65, z: -1.35 - r() * 0.15, c: ['#59606b', '#6b6458', '#4f5866', '#76706a'][o.length % 4] }); x += w + 0.08; } return o; }, []);
  const litAt = p.lit; // [t0, step] para encender ventanas edificio por edificio
  const open = p.open, flow = p.flow; const hk = open === undefined ? 1 : eio(clamp((t - open) / 0.4)); const fk = flow === undefined ? 1 : clamp((t - flow) / 0.25);
  const H = L.HOUSE;
  return (
    <group>
      {bl.map((b, i) => { const k = litAt === undefined ? 1 : clamp((t - litAt[0] - i * litAt[1]) / 0.3); const nx = Math.max(2, Math.floor(b.w / 0.16)), ny = Math.max(2, Math.floor(b.h / 0.16));
        return <group key={i} position={[b.x, L.GROUND, b.z]}>
          <B s={[b.w, b.h, 0.5]} pos={[0, b.h / 2, 0]} c={b.c} />
          <B s={[b.w + 0.02, 0.03, 0.52]} pos={[0, b.h, 0]} c="#3a3f47" />
          {Array.from({ length: nx * ny }, (_, j) => { const ix = j % nx, iy = Math.floor(j / nx); const lit = ((ix * 7 + iy * 3 + i) % 4) !== 0;
            return <B key={j} s={[0.07, 0.07, 0.01]} pos={[-b.w / 2 + (ix + 0.5) * (b.w / nx), 0.12 + iy * ((b.h - 0.16) / ny), 0.255]} c="#2a3240" e="#ffd58a" ei={lit ? 0.15 + 0.85 * k : 0.08} />; })}
        </group>; })}
      {/* casa cortada al frente */}
      <group position={[H, L.GROUND, -0.42]}>
        <B s={[1.1, 0.03, 0.84]} pos={[0, 0.015, 0]} c="#c9a27a" />
        <B s={[1.1, 0.8, 0.04]} pos={[0, 0.4, -0.4]} c="#e6dccb" />
        {[-0.55, 0.55].map((x) => <B key={x} s={[0.04, 0.8, 0.84]} pos={[x, 0.4, 0]} c="#d8ccb8" />)}
        <B s={[1.2, 0.04, 0.9]} pos={[0, 0.82, 0]} c="#8a4a32" />
        <mesh position={[0, 0.98, -0.02]} rotation={[0, PI / 4, 0]}><coneGeometry args={[0.82, 0.3, 4]} /><M c="#9a5236" /></mesh>
        {/* ventana del fondo con luz */}
        <B s={[0.26, 0.2, 0.01]} pos={[-0.3, 0.52, -0.375]} c="#2c3644" e="#ffcf7a" ei={0.4} />
        {/* mesada con bacha */}
        <B s={[0.66, 0.3, 0.24]} pos={[0.05, 0.15, -0.26]} c="#7a5638" />
        <B s={[0.7, 0.03, 0.27]} pos={[0.05, 0.315, -0.26]} c="#e9e7e1" />
        {[-0.18, 0.16].map((x) => <B key={x} s={[0.2, 0.22, 0.005]} pos={[0.05 + x, 0.15, -0.138]} c="#6a4a30" />)}
        <B s={[0.24, 0.012, 0.16]} pos={[0, 0.33, -0.27]} c="#9aa3ad" />
        <B s={[0.2, 0.012, 0.12]} pos={[0, 0.318, -0.27]} c="#4a5560" />
        {/* canilla */}
        <group position={[0, 0.33, -0.36]}>
          <Cyl r={0.012} h={0.12} pos={[0, 0.06, 0]} c={STEEL} />
          <B s={[0.016, 0.016, 0.09]} pos={[0, 0.115, 0.04]} c={STEEL} />
          <Cyl r={0.009} h={0.02} pos={[0, 0.1, 0.082]} c={STEEL} />
          <group position={[0.035, 0.07, 0]} rotation={[0, 0, -hk * 0.9]}><B s={[0.05, 0.012, 0.012]} pos={[0.02, 0, 0]} c={STEEL} /></group>
        </group>
        {fk > 0 && <group>
          <B s={[0.018, 0.085 * fk, 0.018]} pos={[0, 0.425 - 0.0425 * fk, -0.278]} c="#bfe8ff" e="#bfe8ff" ei={0.7} o={0.85} />
          {[0, 1, 2].map((j) => { const u = ((t * 1.2 + j / 3) % 1); return <B key={j} s={[0.02 + u * 0.08, 0.002, 0.02 + u * 0.06]} pos={[0, 0.327, -0.27]} c="#dff4ff" o={0.6 * (1 - u)} />; })}
        </group>}
        {/* caño de la casa: sube desde la vereda por la esquina y entra bajo la mesada */}
      </group>
    </group>
  );
};

/* ---------- Gota guía (plano 13): solo por huecos reales del corte. Tramo A: torre -> pozo -> caño -> cámara de bombas (se apaga
   adentro del agua). En la planta no viaja: se encienden las etapas. Tramo B: aparece dentro del tanque -> túnel -> ramal de la casa. ---------- */
const RA: [number, number][] = [[L.TOWER, -0.4], [L.TOWER, L.PIPE_Y], [3.1, L.PIPE_Y], [3.1, -0.75]];
const RB: [number, number][] = [[7.35, -0.62], [L.TANK[1] - 0.05, L.TUN_Y], [L.HOUSE, L.TUN_Y], [L.HOUSE, L.GROUND - 0.04]];
export const routeOf = (R: [number, number][], u: number): [number, number] => {
  const d: number[] = [0]; for (let i = 1; i < R.length; i++) d.push(d[i - 1] + Math.hypot(R[i][0] - R[i - 1][0], R[i][1] - R[i - 1][1]));
  const s = clamp(u) * d[d.length - 1]; let i = 1; while (i < d.length - 1 && d[i] < s) i++;
  const k = (s - d[i - 1]) / Math.max(1e-6, d[i] - d[i - 1]); return [lerp(R[i - 1][0], R[i][0], k), lerp(R[i - 1][1], R[i][1], k)];
};
/** posición de la gota para el avance g (0-1); null = oculta (mientras se encienden las etapas de la planta) */
export const dropAt = (g: number, split: [number, number]): { x: number; y: number; s: number; c: string; R: [number, number][]; u: number } | null => {
  if (g <= split[0]) { const u = g / split[0]; const [x, y] = routeOf(RA, u); return { x, y, s: 1 - clamp((u - 0.9) / 0.1), c: MUD2, R: RA, u }; }
  if (g < split[1]) return null;
  const u = (g - split[1]) / (1 - split[1]); const [x, y] = routeOf(RB, u); return { x, y, s: clamp(u / 0.06), c: CLEAN2, R: RB, u };
};
export const Drop: React.FC<P> = ({ t, p }) => {
  const { at = 0, dur = 4, split = [0.42, 0.72] } = p; const q = clamp((t - at) / dur); const g = eio(q) * 0.5 + q * 0.5;
  const d = dropAt(g, split); if (!d || d.s <= 0.001) return null;
  const c = mixc(d.c, '#ffffff', 0.15);
  return <group position={[d.x, d.y, 0.02]} scale={[d.s, d.s, d.s]}>
    <Ball r={0.05} c={c} e={c} ei={0.9} />
    {[1, 2, 3].map((k) => { const [px, py] = routeOf(d.R, Math.max(0, d.u - k * 0.015)); return <Ball key={k} r={0.04 - k * 0.008} pos={[px - d.x, py - d.y, 0]} c={c} e={c} ei={0.7} o={0.6 - k * 0.15} />; })}
  </group>;
};

/* ---------- Plataforma aparte (x = 30): cuatro plantas en miniatura (plano 5) y el cubo de agua de un día (plano 10) ---------- */
const MiniPlant: React.FC<{ c: string; e?: number }> = ({ c, e = 0 }) => (
  <group>
    <B s={[0.9, 0.08, 0.7]} pos={[0, 0.04, 0]} c={CONC} />
    {[-0.27, 0, 0.27].map((x) => <B key={x} s={[0.22, 0.03, 0.5]} pos={[x, 0.09, 0]} c={c} e={c} ei={0.2 + e} />)}
    <B s={[0.3, 0.18, 0.12]} pos={[0, 0.17, -0.3]} c={e ? BRICK : '#7d7a74'} />
  </group>
);
export const Pad: React.FC<P> = ({ t, p }) => {
  const mode = p.mode ?? 'four';
  return (
    <group>
      <B s={[4.6, 3.0, 2.4]} pos={[0, -1.5, -0.6]} c="#2f343b" />
      <B s={[4.62, 0.03, 2.42]} pos={[0, 0.005, -0.6]} c="#59616b" />
      {mode === 'four' && [-1.35, -0.45, 0.45, 1.35].map((x, i) => { const k = p.at === undefined ? 1 : clamp((t - p.at - i * 0.18) / 0.35); const me = i === 1;
        const hk = me && p.hl !== undefined ? clamp((t - p.hl) / 0.3) : 0;
        return k > 0 ? <group key={i} position={[x, 0, -0.5]} scale={[k, k, k]}>
          <MiniPlant c={me && hk ? CLEAN : '#7ea7b8'} e={hk * 0.5} />
          {hk > 0 && <mesh position={[0, 0.01, 0]} rotation={[-PI / 2, 0, 0]}><ringGeometry args={[0.55, 0.55 + 0.06 * hk, 32]} /><meshBasicMaterial color="#ffd23a" transparent opacity={0.9 * hk} toneMapped={false} /></mesh>}
        </group> : null; })}
      {mode === 'cube' && (() => { const k = p.at === undefined ? 1 : eio(clamp((t - p.at) / (p.dur ?? 2.5))); const S = 1.3; const h = Math.max(0.002, S * k);
        const sun = clamp((t - (p.at ?? 0)) / (p.dur ?? 2.5));
        return <group position={[0.35, 0, -0.6]}>
          {/* aristas del cubo (vidrio) */}
          {[[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([a, b], i) => <B key={i} s={[0.03, S, 0.03]} pos={[a * S / 2, S / 2, b * S / 2]} c={STEEL} />)}
          {[0, S].map((y) => [[S, 0.03, 0.03, 0, S / 2], [S, 0.03, 0.03, 0, -S / 2], [0.03, 0.03, S, S / 2, 0], [0.03, 0.03, S, -S / 2, 0]].map(([w, hh, d, x, z], i) => <B key={y + ':' + i} s={[w, hh, d]} pos={[x, y, z]} c={STEEL} />))}
          <B s={[S - 0.04, h, S - 0.04]} pos={[0, h / 2, 0]} c={CLEAN} e={CLEAN} ei={0.3} o={0.85} />
          {/* caño que lo llena */}
          <Cyl r={0.06} h={0.9} rot={[0, 0, PI / 2]} pos={[-1.1, 0.35, 0]} c={STEEL2} />
          {k < 1 && <B s={[0.08, 0.35, 0.08]} pos={[-0.62, 0.35 - 0.1, 0]} c={CLEAN2} e={CLEAN2} ei={0.6} o={0.8} />}
          {/* sol que cruza el día */}
          <group position={[lerp(-1.6, 1.6, sun), 1.0 + Math.sin(sun * PI) * 0.35, -0.9]}><Ball r={0.13} c="#ffd23a" e="#ffd23a" ei={1.2} /></group>
        </group>; })()}
    </group>
  );
};

export const EXTRA = { world: World, earth: Earth, river: River, pipes: Pipes, plant: Plant, city: City, drop: Drop, pad: Pad };
