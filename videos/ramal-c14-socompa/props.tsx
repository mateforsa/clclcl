import React from 'react';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';
import { M, useTex } from '../../src/kit/Props';
import { clamp, eio, eo, lerp, rnd } from '../../src/kit/math';

// Look propio: Puna de altura en Salta. Cerros rojizos y ocres con vetas, cumbres nevadas, cielo azul profundo casi negro arriba,
// aire limpio. Vía de trocha angosta sobre cornisa, viaducto metálico de celosía y túnel en la roca.
// Sin personas, sin carteles 3D con texto, sin logos: los datos van solo en placas 2D del kit.
// 1996 se cuenta con sobriedad: la formación chica y quieta en la nevada, después una silueta y los restos quietos en la quebrada.
// QC (solo en el bundle de control, nunca en el render): window.__QCF pinta los objetos clave (tren, vía, viaducto, túnel, restos)
// en magenta plano para medir si una placa los tapa.
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
const rod = (a: V3, b: V3, r: number, c: string, key: string, o?: number) => {
  const dx = b[0] - a[0], dy = b[1] - a[1], dz = b[2] - a[2]; const L = Math.hypot(dx, dy, dz) || 1e-4;
  const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(dx / L, dy / L, dz / L)); const eu = new THREE.Euler().setFromQuaternion(q);
  return <mesh key={key} position={[(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2]} rotation={[eu.x, eu.y, eu.z]}><cylinderGeometry args={[r, r, L, 5]} /><Mat c={c} o={o} /></mesh>;
};
/** curva por tramos [[t, v], ...] con easing: continua, sin saltos */
const curve = (kf: [number, number][], t: number) => {
  if (!kf.length) return 0; if (t <= kf[0][0]) return kf[0][1];
  for (let i = 1; i < kf.length; i++) if (t < kf[i][0]) { const [t0, v0] = kf[i - 1], [t1, v1] = kf[i]; return lerp(v0, v1, eio((t - t0) / (t1 - t0))); }
  return kf[kf.length - 1][1];
};
/** curva lineal (velocidad constante) */
const lin = (kf: [number, number][], t: number) => {
  if (t <= kf[0][0]) return kf[0][1];
  for (let i = 1; i < kf.length; i++) if (t < kf[i][0]) { const [t0, v0] = kf[i - 1], [t1, v1] = kf[i]; return lerp(v0, v1, (t - t0) / (t1 - t0)); }
  return kf[kf.length - 1][1];
};

export const ROCK = ['#7e3826', '#93492b', '#652c20', '#a35f35', '#874026'], OCHRE = '#9a6232', SAND = '#8c5532';
export const SNOW = '#eef3f8', STEEL = '#8f9aa6', STEEL2 = '#6d7884', RUST = '#7a4a36';
export const LOCO = '#d9a21e', LOCO2 = '#2b3440', HOT = '#ffd27a';

/* ---------- Velo oscuro pegado a la cámara (igual que litio-pileta-salar) ---------- */
const Shade: React.FC<{ y1?: number; a?: number }> = ({ y1 = 640, a = 0.9 }) => {
  const { camera } = useThree();
  const tex = useTex((g, W, H) => {
    g.clearRect(0, 0, W, H);
    for (let y = 0; y < H; y++) { const px = (y / H) * y1; const k = px < 430 ? 1 : 1 - clamp((px - 430) / (y1 - 430)); const al = a * (k * k * (3 - 2 * k));
      g.fillStyle = `rgba(4,8,22,${al})`; g.fillRect(0, y, W, 1); }
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

/* ---------- Nieve que cae (determinista) ---------- */
const Snowfall: React.FC<{ t: number; n: number; x: [number, number]; z: [number, number]; y: [number, number]; speed?: number; size?: number }> = ({ t, n, x, z, y, speed = 0.55, size = 0.022 }) => {
  const fl = React.useMemo(() => { const r = rnd(29); return Array.from({ length: n }, () => ({ x: lerp(x[0], x[1], r()), z: lerp(z[0], z[1], r()), y: r(), ph: r() * 6, v: 0.7 + r() * 0.6 })); }, [n]);
  const H = y[1] - y[0];
  return <group>{fl.map((f, i) => { const yy = y[0] + ((((f.y * H - t * speed * f.v) % H) + H) % H);
    return <mesh key={i} position={[f.x + Math.sin(t * 1.3 + f.ph) * 0.08 - t * 0.12 * f.v, yy, f.z]}><boxGeometry args={[size, size, size]} /><meshBasicMaterial color="#f4f8ff" toneMapped={false} /></mesh>; })}</group>;
};

/* ---------- Mundo: Puna de altura ----------
   p: range (cerros del fondo, z), snow (n copos), dusk, shadeY, shadeA, noShade, floor (color), patches (nieve en el piso), seed */
export const World: React.FC<P> = ({ t, p }) => {
  const sky = useTex((g, W, H) => {
    const gr = g.createLinearGradient(0, H, 0, 0);
    [[0, '#a9c3dc'], [0.04, '#6f9bcb'], [0.1, '#3a6db0'], [0.2, '#1d4486'], [0.34, '#0e2556'], [1, '#040b22']].forEach(([f, c]) => gr.addColorStop(f as number, c as string));
    g.fillStyle = gr; g.fillRect(0, 0, W, H);
  }, 256, 1024, 'punasky');
  const ground = useTex((g, W, H) => {
    g.fillStyle = SAND; g.fillRect(0, 0, W, H);
    const r = rnd(17);
    for (let i = 0; i < 2600; i++) { const x = r() * W, y = r() * H, s = 2 + r() * 8; g.fillStyle = ['#7f4a2a', '#9c6438', '#6f3d25', '#a87244', '#64391f'][i % 5]; g.globalAlpha = 0.35 + r() * 0.4; g.fillRect(x, y, s, s * 0.6); }
    g.globalAlpha = 1;
  }, 1024, 1024, 'punaground');
  const range = React.useMemo(() => { const r = rnd(p.seed ?? 5); return Array.from({ length: 11 }, (_, i) => ({ x: -5 + i * 1.0 + (r() - 0.5) * 0.5, h: 0.9 + r() * 0.9, w: 0.75 + r() * 0.45, z: (p.range ?? -3.3) - (i % 2) * 0.25, c: ROCK[i % 5], rot: r() * PI })); }, [p.seed, p.range]);
  const patches = React.useMemo(() => { const r = rnd(41); return Array.from({ length: p.patches ?? 0 }, () => ({ x: lerp(-3, 3, r()), z: lerp(p.patchZ ?? -0.4, 2.6, r()), w: 0.12 + r() * 0.3, d: 0.06 + r() * 0.12, ry: r() * PI })); }, [p.patches]);
  return (
    <group>
      <fog attach="fog" args={['#9fb6d0', p.fogNear ?? 11, p.fogFar ?? 30]} />
      <mesh position={[0, 6, -3.86]}><planeGeometry args={[14, 13]} /><meshBasicMaterial map={sky} toneMapped={false} fog={false} /></mesh>
      <mesh rotation={[-PI / 2, 0, 0]} position={[0, 0.002, 2.3]}><planeGeometry args={[12, 12.4]} /><meshStandardMaterial map={ground} color={p.floor ?? '#ffffff'} roughness={1} /></mesh>
      {!p.noRange && range.map((m, i) => <group key={i} position={[m.x, p.rangeY ?? 0, m.z]} rotation={[0, m.rot, 0]} scale={[p.rangeS ?? 1, p.rangeS ?? 1, 1]}>
        <mesh position={[0, m.h / 2, 0]}><coneGeometry args={[m.w, m.h, 6]} /><M c={m.c} /></mesh>
        <mesh position={[0, m.h * 0.86, 0]}><coneGeometry args={[m.w * 0.29, m.h * 0.285, 6]} /><M c={SNOW} /></mesh>
      </group>)}
      {patches.map((q, i) => <mesh key={'s' + i} position={[q.x, 0.006, q.z]} rotation={[-PI / 2, 0, q.ry]} scale={[1, q.d / q.w, 1]}><circleGeometry args={[q.w * 0.5, 7]} /><meshStandardMaterial color={SNOW} roughness={1} /></mesh>)}
      {p.snow && <Snowfall t={t} n={p.snow} x={[-3, 3.6]} z={[-1.2, 2.8]} y={[0, p.snowTop ?? 2.9]} speed={p.snowSpeed ?? 0.55} />}
      <hemisphereLight args={['#cfe0ff', '#7a4a30', p.dusk ? 0.3 : 0.55]} />
      <directionalLight position={[-3, 6, 4]} intensity={p.dusk ? 0.35 : 0.75} color="#fff4e4" />
      {!p.noShade && <Shade y1={p.shadeY ?? 640} a={p.shadeA ?? 0.9} />}
    </group>
  );
};

/* ---------- Quebrada: cornisa de roca con la vía arriba y el fondo de la quebrada adelante ----------
   p: H (alto de la cornisa), edge (z del borde), x [a,b], water (arroyo helado), snowTop */
export const Cliff: React.FC<P> = ({ p }) => {
  const { H = 1.9, edge = -0.6, x = [-5, 5] } = p; const W = x[1] - x[0], cx = (x[0] + x[1]) / 2;
  const bands = 6;
  const facets = React.useMemo(() => { const r = rnd(p.seed ?? 3); return Array.from({ length: 14 }, (_, i) => ({ x: x[0] + (i + 0.5) * (W / 14), w: W / 14 + 0.05, dz: r() * 0.12, ry: (r() - 0.5) * 0.25 })); }, [W]);
  return (
    <group>
      {/* masa de la cornisa (hasta atrás) */}
      <B s={[W, H, 3.0]} pos={[cx, H / 2, edge - 1.5 - 0.06]} c={ROCK[2]} />
      {/* cara frontal facetada con vetas horizontales rojizas y ocres */}
      {facets.map((f, i) => Array.from({ length: bands }, (_, j) => <B key={i + '-' + j} s={[f.w, H / bands + 0.004, 0.14]} pos={[f.x, (j + 0.5) * (H / bands), edge - 0.07 + f.dz * (1 - j / bands)]} rot={[0, f.ry, 0]} c={ROCK[(i + j * 2) % 5]} />))}
      {/* borde superior con nieve */}
      {p.snowTop !== false && <B s={[W, 0.02, 0.12]} pos={[cx, H + 0.01, edge - 0.08]} c={SNOW} />}
      {/* talud al pie */}
      <mesh position={[cx, 0.09, edge + 0.12]} rotation={[0, 0, 0]}><boxGeometry args={[W, 0.18, 0.3]} /><M c={OCHRE} /></mesh>
      {p.water && <mesh rotation={[-PI / 2, 0, 0]} position={[cx, 0.008, p.water]}><planeGeometry args={[W, 0.12]} /><meshStandardMaterial color="#7fb2cc" emissive="#2f6f96" emissiveIntensity={0.2} roughness={0.3} /></mesh>}
    </group>
  );
};

/* ---------- Vía: balasto + durmientes + rieles a lo largo de x ----------
   p: x [a,b], y, z, ghost [a,b] (tramo fantasma), solidAt (el tramo fantasma se arma desde ese segundo), solidDur */
export const RAIL_TOP = 0.085;
export const Track: React.FC<P> = ({ t, p }) => {
  const { x = [-5, 5], y = 0, z = 0 } = p; const L = x[1] - x[0]; const n = Math.round(L / 0.16);
  const g = p.ghost as [number, number] | undefined;
  const ghostK = (xx: number) => { if (!g || xx < g[0] || xx > g[1]) return 1; if (p.solidAt === undefined) return 0; const u = (xx - g[0]) / (g[1] - g[0]); return t >= p.solidAt + u * (p.solidDur ?? 1.2) ? 1 : 0; };
  const pieces = 10; const seg = L / pieces;
  return (
    <group position={[0, y, z]}>
      {Array.from({ length: pieces }, (_, i) => { const x0 = x[0] + i * seg + seg / 2; const k = ghostK(x0); const o = k ? undefined : 0.3;
        return <group key={'b' + i}>
          <B s={[seg + 0.002, 0.03, 0.36]} pos={[x0, 0.015, 0]} c={k ? '#6f5a4c' : '#c9e8ff'} o={o} />
          <B s={[seg + 0.002, 0.03, 0.022]} pos={[x0, 0.07, 0.1]} c={k ? '#b7bec6' : '#c9e8ff'} e={k ? undefined : '#5fb8ff'} ei={0.6} o={o} />
          <B s={[seg + 0.002, 0.03, 0.022]} pos={[x0, 0.07, -0.1]} c={k ? '#b7bec6' : '#c9e8ff'} e={k ? undefined : '#5fb8ff'} ei={0.6} o={o} />
        </group>; })}
      {Array.from({ length: n }, (_, i) => { const xx = x[0] + (i + 0.5) * (L / n); const k = ghostK(xx);
        return <B key={'d' + i} s={[0.05, 0.025, 0.3]} pos={[xx, 0.0425, 0]} c={k ? '#5a3f2e' : '#c9e8ff'} o={k ? undefined : 0.3} />; })}
    </group>
  );
};

/* ---------- Tren: locomotora + vagones sobre la vía (rieles en y) ----------
   p: kind 'cargo' | 'nubes', n (vagones), x (kf [[t,x]...] posición del frente), dir (1 = hacia +x), y (base de la vía), z,
      load: [{c, at}] por vagón (carga de mineral que aparece), ghost {at} (se vuelve silueta), o, lights */
const Wheels: React.FC<{ L: number; c?: string; o?: number }> = ({ L, c = '#20262e', o }) => (
  <group>
    {[-L * 0.32, L * 0.32].map((bx, i) => <group key={i} position={[bx, 0, 0]}>
      <B s={[0.3, 0.05, 0.24]} pos={[0, 0.085, 0]} c={c} o={o} />
      {[-0.08, 0.08].map((wx) => [-0.1, 0.1].map((wz) => <Cyl key={wx + '' + wz} r={0.055} h={0.03} pos={[wx, 0.055, wz]} rot={[PI / 2, 0, 0]} seg={10} c="#3a3f46" o={o} />))}
    </group>)}
  </group>
);
export const LocoBody: React.FC<{ o?: number; lit?: number; rusty?: boolean }> = ({ o, lit = 1, rusty }) => {
  const body = rusty ? '#8a6a3e' : LOCO, dark = rusty ? '#4a3a32' : LOCO2;
  return (
    <group>
      <Wheels L={1.0} o={o} />
      <B s={[1.02, 0.05, 0.3]} pos={[0, 0.135, 0]} c={dark} o={o} />
      {/* capó largo + cabina alta adelante */}
      <B s={[0.62, 0.22, 0.24]} pos={[-0.17, 0.27, 0]} c={body} o={o} />
      <B s={[0.3, 0.32, 0.3]} pos={[0.31, 0.32, 0]} c={body} o={o} />
      <B s={[0.32, 0.03, 0.31]} pos={[0.31, 0.495, 0]} c={dark} o={o} />
      {/* ventanas de la cabina (sin texto ni logos) */}
      <B s={[0.012, 0.09, 0.22]} pos={[0.461, 0.39, 0]} c={rusty ? '#2a2420' : '#28394a'} e={rusty ? undefined : '#3a5a7a'} ei={0.3} o={o} />
      {[-1, 1].map((sd) => <B key={sd} s={[0.16, 0.08, 0.012]} pos={[0.33, 0.39, sd * 0.151]} c={rusty ? '#2a2420' : '#28394a'} o={o} />)}
      {/* franjas de alerta en la trompa */}
      {[0, 1, 2].map((i) => <B key={'f' + i} s={[0.012, 0.03, 0.3]} pos={[0.461, 0.19 + i * 0.05, 0]} c={i % 2 ? dark : (rusty ? '#9a8a5a' : '#f4f1e6')} o={o} />)}
      <B s={[0.6, 0.025, 0.245]} pos={[-0.17, 0.215, 0]} c={dark} o={o} />
      {/* farol */}
      {!rusty && <mesh position={[0.47, 0.44, 0]}><boxGeometry args={[0.02, 0.04, 0.06]} /><meshBasicMaterial color={qc() ? '#ff00ff' : HOT} toneMapped={false} transparent={o !== undefined} opacity={o ?? 1} /></mesh>}
      {!rusty && lit > 0 && !qc() && <pointLight position={[0.6, 0.42, 0]} intensity={0.6 * lit} distance={1.6} color={HOT} />}
      <Cyl r={0.025} h={0.06} pos={[-0.3, 0.41, 0]} c={dark} o={o} />
    </group>
  );
};
export const Hopper: React.FC<{ o?: number; load?: string; lk?: number; rusty?: boolean }> = ({ o, load, lk = 1, rusty }) => {
  const c = rusty ? RUST : '#5e6b78', c2 = rusty ? '#5a3a2c' : '#46515c';
  return (
    <group>
      <Wheels L={0.75} o={o} />
      <B s={[0.76, 0.04, 0.28]} pos={[0, 0.13, 0]} c={c2} o={o} />
      <B s={[0.72, 0.22, 0.28]} pos={[0, 0.26, 0]} c={c} o={o} />
      {[-0.24, 0, 0.24].map((rx) => <B key={rx} s={[0.012, 0.22, 0.285]} pos={[rx, 0.26, 0]} c={c2} o={o} />)}
      {load && lk > 0 && <group position={[0, 0.37, 0]} scale={[1, lk, 1]}>
        {[-0.22, 0, 0.22].map((lx, i) => <mesh key={i} position={[lx, 0.035, 0]} rotation={[0, i * 0.7, 0]}><coneGeometry args={[0.15, 0.1, 5]} /><M c={load} /></mesh>)}
      </group>}
    </group>
  );
};
export const Coach: React.FC<{ o?: number }> = ({ o }) => (
  <group>
    <Wheels L={0.8} o={o} />
    <B s={[0.8, 0.28, 0.28]} pos={[0, 0.29, 0]} c="#e9e1cf" o={o} />
    <B s={[0.8, 0.07, 0.285]} pos={[0, 0.19, 0]} c="#a8322a" o={o} />
    <B s={[0.82, 0.03, 0.3]} pos={[0, 0.445, 0]} c="#7d2621" o={o} />
    {[-0.27, -0.09, 0.09, 0.27].map((wx) => [-1, 1].map((sd) => <B key={wx + '' + sd} s={[0.12, 0.08, 0.01]} pos={[wx, 0.33, sd * 0.142]} c="#2d3d52" e="#ffd9a0" ei={0.35} o={o} />))}
  </group>
);
export const Train: React.FC<P> = ({ t, p }) => {
  const { kind = 'cargo', n = 3, dir = 1, y = 0, z = 0 } = p;
  const x0 = p.x ? lin(p.x, t) : 0;
  const ghost = p.ghost !== undefined ? clamp((t - p.ghost) / 0.6) : 0; const o = ghost > 0 ? lerp(1, 0.18, ghost) : p.o;
  const gap = 0.06; const cars: { L: number; el: React.ReactNode }[] = [{ L: 1.0, el: <LocoBody o={o} lit={1 - ghost} /> }];
  for (let i = 0; i < n; i++) {
    if (kind === 'nubes') cars.push({ L: 0.8, el: <Coach o={o} /> });
    else { const ld = p.load?.[i]; const lk = ld ? (ld.at === undefined ? 1 : eo((t - ld.at) / 0.35)) : 0; cars.push({ L: 0.75, el: <Hopper o={o} load={ld?.c} lk={lk} /> }); }
  }
  let off = 0;
  return (
    <group position={[x0, y + RAIL_TOP, z]} scale={[dir, 1, 1]}>
      {cars.map((c, i) => { const cx = -(off + c.L / 2); off += c.L + gap;
        return <group key={i} position={[cx + 0.5, 0, 0]}>{c.el}{i < cars.length - 1 && <B s={[gap + 0.02, 0.03, 0.05]} pos={[-c.L / 2 - gap / 2, 0.15, 0]} c="#222" o={o} />}</group>; })}
    </group>
  );
};

/* ---------- Bocina: ondas que salen de la cabina ---------- p: at [segundos], pos (relativa), max */
export const Horn: React.FC<P> = ({ t, p }) => {
  const ats: number[] = p.at ?? [0]; const max = p.max ?? 0.75;
  return <group>{ats.flatMap((a, j) => [0, 0.28, 0.56].map((d, i) => { const u = (t - a - d) / 1.1; if (u < 0 || u > 1) return null;
    const r = lerp(0.08, max, eo(u));
    return <mesh key={j + '-' + i} rotation={[0, p.ry ?? 0, 0]}><torusGeometry args={[r, 0.022 + 0.016 * (1 - u), 6, 36]} /><meshBasicMaterial color="#ffe7a0" transparent opacity={Math.min(1, 1.3 * (1 - u))} toneMapped={false} depthWrite={false} /></mesh>; }))}</group>;
};

/* ---------- Restos en la quebrada: locomotora de costado y vagones volcados, quietos, con nieve ----------
   p: snow (capas de nieve), wagons (cantidad), silhouette (todo oscuro), o */
export const Wreck: React.FC<P> = ({ p }) => {
  const sil = !!p.silhouette; const o = p.o;
  const SilMat = sil && !qc();
  const snowCap = (s: V3, pos: V3) => p.snow !== false && !sil ? <B s={s} pos={pos} c={SNOW} /> : null;
  // vagón inclinado sobre su eje largo (ángulo th): centro a la altura justa para apoyar el borde en el piso
  const tilted = (th: number, x: number, zz: number, ry: number, key: string) => {
    const h = 0.22, w = 0.28; const cy = (h / 2) * Math.cos(Math.abs(th)) + (w / 2) * Math.sin(Math.abs(th));
    return <group key={key} position={[x, cy, zz]} rotation={[0, ry, 0]}><group rotation={[th, 0, 0]}>
      <B s={[0.72, h, w]} c={sil ? '#141a26' : RUST} o={o} />
      {[-0.24, 0, 0.24].map((rx) => <B key={rx} s={[0.012, h + 0.004, w + 0.004]} pos={[rx, 0, 0]} c={sil ? '#141a26' : '#5a3a2c'} o={o} />)}
      {snowCap([0.62, 0.02, 0.2], [0.02, h / 2 + 0.01, 0])}
    </group></group>;
  };
  return (
    <group>
      {/* locomotora inclinada sobre un costado (rolido 0,4): el borde de abajo apoya en el piso */}
      <group position={[0, 0.062, 0]} rotation={[0, p.ry ?? -0.35, 0]}>
        <group rotation={[0.4, 0, 0.05]}>
          {SilMat ? <group>
            <B s={[0.62, 0.22, 0.24]} pos={[-0.17, 0.27, 0]} c="#141a26" />
            <B s={[0.3, 0.32, 0.3]} pos={[0.31, 0.32, 0]} c="#141a26" />
            <B s={[1.02, 0.12, 0.3]} pos={[0, 0.1, 0]} c="#141a26" />
          </group> : <LocoBody rusty o={o} />}
          {p.snow !== false && !sil && <B s={[0.56, 0.02, 0.2]} pos={[-0.17, 0.39, -0.01]} c={SNOW} />}
          {p.snow !== false && !sil && <B s={[0.26, 0.02, 0.24]} pos={[0.31, 0.52, -0.01]} c={SNOW} />}
        </group>
      </group>
      {Array.from({ length: p.wagons ?? 2 }, (_, i) => tilted([0.35, -0.5, 0.25][i % 3], -1.0 - i * 0.82, -0.12 + (i % 2) * 0.22, 0.25 + i * 0.3, 'w' + i))}
    </group>
  );
};

/* ---------- Viaducto metálico de celosía ----------
   p: x [a,b], H (alto del tablero), z, piers (x de las pilas) */
export const Viaduct: React.FC<P> = ({ p }) => {
  const { x = [-3, 3], H = 1.6, z = 0 } = p; const piers: number[] = p.piers ?? [-1.5, 0, 1.5];
  const L = x[1] - x[0], cx = (x[0] + x[1]) / 2;
  const nb = Math.round(L / 0.3);
  return (
    <group position={[0, 0, z]}>
      {/* tablero: vigas laterales y piso */}
      <B s={[L, 0.08, 0.42]} pos={[cx, H - 0.04, 0]} c={STEEL2} />
      {[-0.2, 0.2].map((sz) => <B key={sz} s={[L, 0.14, 0.03]} pos={[cx, H - 0.13, sz]} c={STEEL} />)}
      {/* celosía bajo el tablero */}
      {[-0.2, 0.2].map((sz) => Array.from({ length: nb }, (_, i) => { const a = x[0] + i * (L / nb), b = a + L / nb;
        return rod([a, H - 0.2, sz], [b, H - 0.06, sz], 0.008, STEEL, 'c' + sz + i); }))}
      {/* barandas */}
      {[-0.205, 0.205].map((sz) => <B key={'r' + sz} s={[L, 0.015, 0.015]} pos={[cx, H + 0.1, sz]} c={STEEL} />)}
      {[-0.205, 0.205].map((sz) => Array.from({ length: nb + 1 }, (_, i) => <B key={'rp' + sz + i} s={[0.012, 0.1, 0.012]} pos={[x[0] + i * (L / nb), H + 0.05, sz]} c={STEEL} />))}
      {/* pilas: torres troncopiramidales de celosía, más anchas abajo */}
      {piers.map((px, k) => { const top = 0.14, bot = 0.14 + H * 0.14, zt = 0.18, zb = 0.18 + H * 0.12; const hh = H - 0.2;
        const legs: [V3, V3][] = [[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([sx, sz]) => [[px + sx * bot, 0.08, sz * zb], [px + sx * top, hh, sz * zt]]);
        const lv = 5; const at = (f: number, sx: number, sz: number): V3 => [px + sx * lerp(bot, top, f), lerp(0.08, hh, f), sz * lerp(zb, zt, f)];
        return <group key={k}>
          <B s={[bot * 2 + 0.16, 0.1, zb * 2 + 0.16]} pos={[px, 0.05, 0]} c="#8b8378" />
          {legs.map(([a, b], i) => rod(a, b, 0.018, STEEL, 'l' + i))}
          {Array.from({ length: lv }, (_, j) => { const f0 = j / lv, f1 = (j + 1) / lv;
            return <group key={'v' + j}>
              {[-1, 1].map((sz) => [rod(at(f0, -1, sz), at(f1, 1, sz), 0.008, STEEL, 'x1' + sz), rod(at(f0, 1, sz), at(f1, -1, sz), 0.008, STEEL, 'x2' + sz), rod(at(f1, -1, sz), at(f1, 1, sz), 0.009, STEEL2, 'h' + sz)])}
              {[-1, 1].map((sx) => rod(at(f1, sx, -1), at(f1, sx, 1), 0.009, STEEL2, 'hz' + sx))}
            </group>; })}
        </group>; })}
    </group>
  );
};

/* ---------- Túnel: boca de piedra en un cerro; el tren sale de adentro ----------
   p: x (cara de la boca, el cerro va hacia -x), y (base de la vía), z (eje de la vía), H (alto del cerro sobre la vía) */
export const Tunnel: React.FC<P> = ({ p }) => {
  const { x = -2, y = 0, z = 0, Hm = 1.2 } = p; const D = 3.2, cx = x - D / 2; const tot = y + Hm;
  const KeyPortal: React.FC<{ children: React.ReactNode }> = ({ children }) => <KeyCtx.Provider value={true}>{children}</KeyCtx.Provider>;
  return (
    <KeyCtx.Provider value={false}>
      <group>
        {/* cerro: bloque delantero, trasero y techo alrededor del pasillo */}
        <B s={[D, tot, 1.6]} pos={[cx, tot / 2, z + 0.26 + 0.8]} c={ROCK[0]} />
        <B s={[D, tot, 1.6]} pos={[cx, tot / 2, z - 0.26 - 0.8]} c={ROCK[2]} />
        <B s={[D, Hm - 0.62, 0.56]} pos={[cx, y + 0.62 + (Hm - 0.62) / 2, z]} c={ROCK[1]} />
        <B s={[D, y, 0.56]} pos={[cx, y / 2, z]} c={ROCK[2]} />
        {/* vetas */}
        {[0.3, 0.6, 0.85].map((f, i) => <B key={i} s={[D + 0.01, 0.06, 0.02]} pos={[cx, tot * f, z + 1.865]} c={ROCK[3 + (i % 2)]} />)}
        {/* nieve arriba */}
        <mesh position={[cx + 0.2, tot + 0.25, z]}><coneGeometry args={[1.5, 0.5, 6]} /><M c={ROCK[1]} /></mesh>
        <mesh position={[cx + 0.2, tot + 0.42, z]}><coneGeometry args={[0.55, 0.18, 6]} /><M c={SNOW} /></mesh>
        {/* oscuridad adentro */}
        <mesh position={[x - 0.75, y + 0.31, z]} rotation={[0, PI / 2, 0]}><planeGeometry args={[0.52, 0.62]} /><meshBasicMaterial color="#05070b" /></mesh>
        <KeyPortal>
          {/* boca de piedra */}
          <B s={[0.08, 0.66, 0.1]} pos={[x + 0.02, y + 0.33, z + 0.3]} c="#8d8a84" />
          <B s={[0.08, 0.66, 0.1]} pos={[x + 0.02, y + 0.33, z - 0.3]} c="#8d8a84" />
          <B s={[0.08, 0.1, 0.7]} pos={[x + 0.02, y + 0.7, z]} c="#8d8a84" />
        </KeyPortal>
      </group>
    </KeyCtx.Provider>
  );
};

/* ---------- Medida vertical de la caída (~100 m): línea punteada ámbar que baja ---------- p: H, at, dur */
export const Drop: React.FC<P> = ({ t, p }) => {
  const { H = 1.9 } = p; const k = eo((t - (p.at ?? 0)) / (p.dur ?? 0.8)); const n = 12;
  return <group>
    {Array.from({ length: n }, (_, i) => { const y0 = H - (i / n) * H; if (i / n > k) return null;
      return <mesh key={i} position={[0, y0 - H / n / 2, 0]}><boxGeometry args={[0.025, (H / n) * 0.55, 0.025]} /><meshBasicMaterial color="#ffb52e" toneMapped={false} /></mesh>; })}
    {k >= 1 && <mesh position={[0, 0.08, 0]} rotation={[PI, 0, 0]}><coneGeometry args={[0.07, 0.14, 4]} /><meshBasicMaterial color="#ffb52e" toneMapped={false} /></mesh>}
    <mesh position={[0, H, 0]}><boxGeometry args={[0.22, 0.02, 0.02]} /><meshBasicMaterial color="#ffb52e" toneMapped={false} /></mesh>
  </group>;
};

/* ---------- Tres luces junto a la vía (homenaje, sin texto) ---------- p: at [s], lx */
export const Lights: React.FC<P> = ({ t, p }) => {
  const xs: number[] = p.x ?? [-0.6, 0, 0.6]; const ats: number[] = p.at ?? [0, 0.3, 0.6];
  return <group>{xs.map((x, i) => { const k = eo((t - ats[i]) / 0.4); if (k <= 0) return null; const fl = 0.85 + 0.15 * Math.sin(t * 7 + i * 2);
    return <group key={i} position={[x, 0, 0]}>
      <B s={[0.03, 0.32, 0.03]} pos={[0, 0.16, 0]} c="#3a3430" />
      <B s={[0.08, 0.09, 0.08]} pos={[0, 0.36, 0]} c="#2a2622" />
      <mesh position={[0, 0.36, 0]} scale={[k, k, k]}><boxGeometry args={[0.062, 0.07, 0.082]} /><meshBasicMaterial color="#ffc46a" toneMapped={false} /></mesh>
      <pointLight position={[0, 0.4, 0.15]} intensity={0.5 * k * fl} distance={1.2} color="#ffb05a" />
    </group>; })}</group>;
};

/* ---------- Nubes bajas (Tren a las Nubes) ---------- p: n, x [a,b], y [a,b], z [a,b], drift */
export const Clouds: React.FC<P> = ({ t, p }) => {
  const cl = React.useMemo(() => { const r = rnd(p.seed ?? 11); const X = p.x ?? [-3, 3], Y = p.y ?? [0.4, 0.9], Z = p.z ?? [-1.5, 0.8];
    return Array.from({ length: p.n ?? 7 }, () => ({ x: lerp(X[0], X[1], r()), y: lerp(Y[0], Y[1], r()), z: lerp(Z[0], Z[1], r()), s: 0.6 + r() * 0.6, k: Math.floor(r() * 3) })); }, [p.seed, p.n]);
  return <group>{cl.map((c, i) => <group key={i} position={[c.x + t * (p.drift ?? 0.06), c.y, c.z]} scale={[c.s, c.s * 0.6, c.s * 0.8]}>
    {[[0, 0, 0, 0.32], [0.3, -0.05, 0.05, 0.24], [-0.32, -0.06, 0, 0.22], [0.1, 0.12, -0.05, 0.2]].map(([x, y, z, r], j) =>
      <mesh key={j} position={[x, y, z]}><icosahedronGeometry args={[r, 1]} /><meshStandardMaterial color="#f2f5fa" flatShading roughness={1} transparent opacity={0.92} /></mesh>)}
  </group>)}</group>;
};

/* ---------- Recorrido Salta → Socompa en relieve (plano 3) ----------
   p: route [[x,z]...] (de Salta a Socompa), go {at, dur} (el tren chico recorre), draw {at, dur} (la vía se dibuja), border x */
export const Route: React.FC<P> = ({ t, p }) => {
  const pts: [number, number][] = p.route; const lens = pts.slice(1).map((q, i) => Math.hypot(q[0] - pts[i][0], q[1] - pts[i][1])); const tot = lens.reduce((a, b) => a + b, 0);
  const at = (s: number): { x: number; z: number; h: number } => { s = clamp(s, 0, tot); let acc = 0;
    for (let i = 0; i < lens.length; i++) { if (s <= acc + lens[i] || i === lens.length - 1) { const u = (s - acc) / lens[i]; const a = pts[i], b = pts[i + 1];
      return { x: lerp(a[0], b[0], u), z: lerp(a[1], b[1], u), h: Math.atan2(-(b[1] - a[1]), b[0] - a[0]) }; } acc += lens[i]; } return { x: 0, z: 0, h: 0 }; };
  const drawK = p.draw ? eio((t - p.draw.at) / p.draw.dur) : 1; const ds = tot * drawK;
  const goK = p.go ? clamp((t - p.go.at) / p.go.dur) : 0; const head = lerp(0.35, tot - 0.05, goK);
  const n = Math.ceil(tot / 0.06);
  return (
    <group>
      <KeyCtx.Provider value={true}>
        {Array.from({ length: n }, (_, i) => { const s = (i + 0.5) * (tot / n); if (s > ds) return null; const q = at(s);
          return <group key={i} position={[q.x, 0.012, q.z]} rotation={[0, q.h, 0]}>
            <mesh><boxGeometry args={[tot / n + 0.004, 0.012, 0.05]} /><Mat c="#3a2c26" /></mesh>
            <mesh position={[0, 0.008, 0]}><boxGeometry args={[0.012, 0.006, 0.07]} /><Mat c="#cfd5db" /></mesh>
          </group>; })}
        {/* tren chico: locomotora amarilla + 3 vagones */}
        {[0, 1, 2, 3].map((i) => { const q = at(head - i * 0.22); return <group key={'c' + i} position={[q.x, 0.05, q.z]} rotation={[0, q.h, 0]}>
          <mesh><boxGeometry args={[0.2, 0.09, 0.1]} /><Mat c={i === 0 ? LOCO : '#5e6b78'} /></mesh></group>; })}
      </KeyCtx.Provider>
      {/* Salta: casitas bajas al principio del recorrido */}
      {[[0.15, 0.05], [-0.12, 0.12], [0.05, -0.14], [0.22, -0.1], [-0.18, -0.06]].map(([dx, dz], i) => <mesh key={'h' + i} position={[pts[0][0] + dx, 0.04, pts[0][1] + dz]}><boxGeometry args={[0.09, 0.08, 0.09]} /><M c={['#e8d7b4', '#d7c09a', '#f0e2c4'][i % 3]} /></mesh>)}
      {/* Socompa: estación chica al final */}
      <mesh position={[pts[pts.length - 1][0] - 0.12, 0.05, pts[pts.length - 1][1] + 0.12]}><boxGeometry args={[0.2, 0.1, 0.1]} /><M c="#d9c7a3" /></mesh>
      {/* frontera: hitos bajos en fila */}
      {p.border !== undefined && Array.from({ length: 11 }, (_, i) => { const z = -2.6 + i * 0.42; const k = p.borderAt === undefined ? 1 : eo((t - p.borderAt - i * 0.04) / 0.3); if (k <= 0) return null;
        return <mesh key={'b' + i} position={[p.border + Math.sin(i * 1.7) * 0.05, 0.07 * k, z]} scale={[1, k, 1]}><coneGeometry args={[0.04, 0.14, 4]} /><M c="#e6e2da" /></mesh>; })}
      {p.border !== undefined && <mesh rotation={[-PI / 2, 0, 0]} position={[p.border, 0.01, -0.5]}><planeGeometry args={[0.02, 4.4]} /><meshBasicMaterial color="#ffb52e" transparent opacity={0.8 * (p.borderAt === undefined ? 1 : clamp((t - p.borderAt) / 0.4))} toneMapped={false} /></mesh>}
    </group>
  );
};

/* ---------- Relieve: cerros sueltos (para el plano 3 y fondos) ---------- p: pts [[x,z,h,w,snow]] */
export const Hills: React.FC<P> = ({ p }) => (
  <group>{(p.pts as number[][]).map(([x, z, h, w, sn], i) => <group key={i} position={[x, 0, z]} rotation={[0, i * 1.3, 0]}>
    <mesh position={[0, h / 2, 0]}><coneGeometry args={[w, h, 6]} /><M c={ROCK[i % 5]} /></mesh>
    {sn ? <mesh position={[0, h * 0.86, 0]}><coneGeometry args={[w * 0.29, h * 0.285, 6]} /><M c={SNOW} /></mesh> : null}
  </group>)}</group>
);

/* ---------- Convenio: hoja sin texto (solo renglones grises) sobre una roca plana y dos lapiceras que esperan ----------
   p: at (aparecen las lapiceras) */
export const Deal: React.FC<P> = ({ t, p }) => {
  const k = eo((t - (p.at ?? 0)) / 0.5);
  return <group>
    <mesh position={[0, 0.09, 0]}><cylinderGeometry args={[0.62, 0.7, 0.18, 7]} /><M c={ROCK[2]} /></mesh>
    <group position={[0, 0.185, 0]} rotation={[-PI / 2, 0, 0.06]}>
      <mesh><planeGeometry args={[0.7, 0.92]} /><meshStandardMaterial color="#ece6d8" roughness={1} /></mesh>
      {Array.from({ length: 7 }, (_, i) => <mesh key={i} position={[0, 0.34 - i * 0.07, 0.002]}><planeGeometry args={[i === 0 ? 0.36 : 0.54, 0.014]} /><meshBasicMaterial color="#9a958c" /></mesh>)}
      {[-0.17, 0.17].map((sx) => <mesh key={sx} position={[sx, -0.33, 0.002]}><planeGeometry args={[0.24, 0.01]} /><meshBasicMaterial color="#3a3632" /></mesh>)}
    </group>
    {[-1, 1].map((sd) => <group key={sd} position={[sd * 0.17, lerp(0.75, 0.42, k) + Math.sin(t * 2 + sd) * 0.015, -0.25]} rotation={[0, 0, sd * 0.5]} scale={[k, k, k]}>
      <Cyl r={0.018} h={0.3} c={sd < 0 ? '#2f6bff' : '#e9e4da'} />
      <mesh position={[0, -0.17, 0]} rotation={[PI, 0, 0]}><coneGeometry args={[0.018, 0.04, 6]} /><M c="#c9c2b6" /></mesh>
    </group>)}
  </group>;
};

/* ---------- Plata que no está: pilas de monedas fantasma ---------- p: n, at */
export const GhostCoins: React.FC<P> = ({ t, p }) => {
  const n = p.n ?? 4; const k = eo((t - (p.at ?? 0)) / 0.5);
  return <group>{Array.from({ length: n }, (_, i) => { const hgt = [6, 9, 7, 11][i % 4]; return <group key={i} position={[(i - (n - 1) / 2) * 0.42, 0, (i % 2) * 0.12]}>
    {Array.from({ length: Math.round(hgt * k) }, (_, j) => <mesh key={j} position={[0, 0.02 + j * 0.042, 0]}><cylinderGeometry args={[0.15, 0.15, 0.036, 14]} /><meshStandardMaterial color="#ffd27a" emissive="#ffb52e" emissiveIntensity={0.25} transparent opacity={0.5} depthWrite={false} /></mesh>)}
  </group>; })}</group>;
};

const withKey = (Cm: React.FC<P>): React.FC<P> => (props) => <KeyCtx.Provider value={true}><Cm {...props} /></KeyCtx.Provider>;

export const EXTRA = {
  world: World, cliff: Cliff, horn: Horn, drop: Drop, lights: Lights, clouds: Clouds, route: Route, hills: Hills, deal: Deal, ghostcoins: GhostCoins,
  track: withKey(Track), train: withKey(Train), wreck: withKey(Wreck), viaduct: withKey(Viaduct), tunnel: Tunnel,
};
