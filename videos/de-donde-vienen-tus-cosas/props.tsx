import React, { useMemo } from 'react';
import * as THREE from 'three';
import { M, Label, Screen, useTex } from '../../src/kit/Props';
import { C, clamp, eio, eo, lerp, pop, rnd } from '../../src/kit/math';

type P = { t: number; tt: number; p: any };
type V3 = [number, number, number];
const PI = Math.PI;
const B: React.FC<{ s: V3; pos?: V3; rot?: V3; c: string; e?: string; ei?: number }> = ({ s, pos, rot, c, e, ei }) => (
  <mesh position={pos} rotation={rot}><boxGeometry args={s} /><M c={c} e={e} ei={ei} /></mesh>
);
const Cyl: React.FC<{ r: number; r2?: number; h: number; seg?: number; pos?: V3; rot?: V3; c: string; e?: string; ei?: number }> = ({ r, r2, h, seg = 12, pos, rot, c, e, ei }) => (
  <mesh position={pos} rotation={rot}><cylinderGeometry args={[r2 ?? r, r, h, seg]} /><M c={c} e={e} ei={ei} /></mesh>
);

/* ================= MAPA DE LA ARGENTINA (esquema low-poly, sin nombres) ================= */
// contorno aproximado (lon, lat), en sentido horario desde La Quiaca
const MAIN: [number, number][] = [
  [-65.75, -22.1], [-64.6, -22.2], [-64.3, -22.8], [-63.9, -22.0], [-62.8, -22.0], [-62.3, -22.6], [-61.0, -23.8], [-59.6, -24.5],
  [-58.4, -25.2], [-57.6, -25.4], [-57.6, -27.4], [-56.3, -27.5], [-55.6, -27.0], [-54.6, -25.6], [-53.65, -26.2], [-53.9, -27.2],
  [-55.6, -28.2], [-56.7, -29.6], [-57.6, -30.3], [-58.1, -32.0], [-58.4, -33.6], [-58.5, -34.4], [-57.4, -35.1], [-57.2, -35.8],
  [-56.7, -36.4], [-57.6, -38.1], [-59.1, -38.7], [-61.4, -38.9], [-62.3, -38.9], [-62.1, -39.7], [-62.5, -40.6], [-63.8, -41.1],
  [-65.1, -40.9], [-65.0, -42.0], [-64.0, -42.2], [-63.6, -42.8], [-64.4, -42.9], [-65.0, -43.4], [-65.3, -44.6], [-66.9, -45.2],
  [-67.6, -46.0], [-66.0, -47.0], [-65.8, -47.9], [-67.5, -49.0], [-68.2, -50.1], [-69.1, -50.9], [-69.2, -51.6], [-68.4, -52.35],
  [-70.0, -52.0], [-71.9, -52.0], [-72.4, -51.2], [-73.3, -50.6], [-73.4, -49.5], [-72.5, -48.6], [-72.3, -47.6], [-71.8, -46.6],
  [-71.6, -45.5], [-71.8, -44.4], [-71.4, -43.6], [-71.8, -42.6], [-71.7, -41.0], [-71.6, -39.6], [-71.2, -38.0], [-71.0, -37.0],
  [-70.5, -36.2], [-70.0, -34.8], [-69.9, -33.5], [-70.1, -32.4], [-70.5, -31.0], [-69.8, -29.5], [-69.1, -28.3], [-68.5, -27.1],
  [-68.6, -26.1], [-68.3, -25.1], [-67.3, -24.2], [-67.0, -23.0], [-66.8, -22.4],
];
const TDF: [number, number][] = [[-68.6, -52.6], [-68.3, -52.8], [-67.6, -53.6], [-66.6, -54.4], [-65.2, -54.6], [-66.4, -55.0], [-68.6, -54.9]];
// ciudades del recorrido (y Ushuaia, solo para las fábricas del plano 3)
export const CITY: Record<string, [number, number]> = {
  rg: [-67.7, -53.8], pm: [-65.05, -42.75], ar: [-63.05, -31.42], ro: [-60.65, -32.95], ba: [-71.3, -41.13], us: [-68.3, -54.75],
};
const LON0 = -63.5, LAT0 = -38.4, KX = 0.079, KY = 0.1; export const MAP_D = 0.08;
/** lon/lat -> coordenadas del mapa acostado (x este, z sur) para un mapa de escala k */
export const ll = (lon: number, lat: number, k = 1): [number, number] => [(lon - LON0) * KX * k, -(lat - LAT0) * KY * k];
/** posición en el mundo del punto `key` para un mapa de escala k puesto en `o` */
export const mp = (key: string, k = 1, o: V3 = [0, 0, 0], dy = 0): V3 => { const [x, z] = ll(...CITY[key], k); return [o[0] + x, o[1] + MAP_D + dy, o[2] + z]; };

const shapeOf = (pts: [number, number][], k: number) => { const s = new THREE.Shape(); pts.forEach(([lo, la], i) => { const [x, z] = ll(lo, la, k); i ? s.lineTo(x, -z) : s.moveTo(x, -z); }); s.closePath(); return s; };

const Land: React.FC<{ pts: [number, number][]; k: number; cap: string; glow?: number }> = ({ pts, k, cap, glow = 0 }) => {
  const geo = useMemo(() => new THREE.ExtrudeGeometry(shapeOf(pts, k), { depth: MAP_D, bevelEnabled: false }), [k, pts]);
  const line = useMemo(() => { const g = new THREE.BufferGeometry().setFromPoints(pts.concat([pts[0]]).map(([lo, la]) => { const [x, z] = ll(lo, la, k); return new THREE.Vector3(x, -z, MAP_D + 0.004); })); return g; }, [k, pts]);
  const capC = glow > 0 ? new THREE.Color(cap).lerp(new THREE.Color(C.cyan), glow * 0.7).getStyle() : cap;
  return (
    <group rotation={[-PI / 2, 0, 0]}>
      <mesh geometry={geo}>
        <meshStandardMaterial attach="material-0" color={capC} emissive={glow > 0 ? C.cyan : '#000'} emissiveIntensity={glow * 0.5} flatShading roughness={0.9} />
        <meshStandardMaterial attach="material-1" color={C.cyan} emissive={C.cyan} emissiveIntensity={0.8} flatShading />
      </mesh>
      {/* @ts-ignore */}
      <line geometry={line}><lineBasicMaterial color={C.cyan} toneMapped={false} /></line>
    </group>
  );
};

/** Andes: pirámides bajas a lo largo de la cordillera */
const ANDES: [number, number][] = [[-66.9, -23.6], [-68.0, -26.0], [-69.0, -28.6], [-69.6, -31.0], [-69.9, -33.4], [-70.3, -35.6], [-70.9, -37.8], [-71.1, -40.0], [-71.4, -41.6], [-71.3, -43.4], [-71.3, -45.4], [-72.0, -47.6], [-72.7, -49.6], [-71.9, -51.3]];
const Andes: React.FC<{ k: number; snow?: boolean }> = ({ k, snow = true }) => (
  <group>{ANDES.map(([lo, la], i) => { const [x, z] = ll(lo, la, k); const h = (0.11 + (i % 3) * 0.03) * Math.min(k, 2.2); const r = 0.075 * Math.min(k, 2.2);
    return <group key={i} position={[x + 0.02 * k, MAP_D, z]}>
      <mesh position={[0, h / 2, 0]}><coneGeometry args={[r, h, 4]} /><M c="#5a4a9a" /></mesh>
      {snow && <mesh position={[0, h * 0.82, 0]}><coneGeometry args={[r * 0.36, h * 0.36, 4]} /><M c="#d9d2f5" /></mesh>}
    </group>; })}</group>
);

/** Pin de mapa: gota con la punta en el suelo */
export const PinMark: React.FC<{ s?: number; c?: string }> = ({ s = 1, c = C.magenta }) => (
  <group scale={s}>
    <mesh position={[0, 0.17, 0]} rotation={[PI, 0, 0]}><coneGeometry args={[0.085, 0.3, 8]} /><M c={c} e={c} ei={0.55} /></mesh>
    <mesh position={[0, 0.34, 0]}><sphereGeometry args={[0.12, 10, 8]} /><M c={c} e={c} ei={0.55} /></mesh>
    <mesh position={[0, 0.34, 0.1]}><sphereGeometry args={[0.045, 8, 6]} /><M c="#fff" e="#fff" ei={0.4} /></mesh>
  </group>
);
const arc = (a: V3, b: V3, k: number, hgt: number): V3 => [lerp(a[0], b[0], k), lerp(a[1], b[1], k) + Math.sin(PI * k) * hgt, lerp(a[2], b[2], k)];
const Dot: React.FC<{ pos: V3; c: string; r?: number; ei?: number }> = ({ pos, c, r = 0.05, ei = 1 }) => (
  <mesh position={pos}><cylinderGeometry args={[r, r, 0.02, 12]} /><M c={c} e={c} ei={ei} /></mesh>
);

/**
 * Mapa acostado en el piso. p:
 *  k (escala), only ('tdf' = solo la isla), dots (ciudades marcadas), visited (ya recorridas, doradas),
 *  pin: { from, to, at, dur } (from null = cae desde arriba en `at`), trail (tramos ya hechos: [[a,b],...]),
 *  hl: { at } enciende Tierra del Fuego, andes (bool), pinS (escala del pin)
 */
export const Mapa: React.FC<P> = ({ t, p }) => {
  const { k = 1, only, dots = [], visited = [], pin, trail = [], hl, andes = true, pinS = 1, cap = '#3a2a8a' } = p;
  const g = hl ? eo((t - hl.at) / 0.4) : 0;
  const P0 = (key: string): V3 => mp(key, k);
  const segDots = (a: string, b: string, kk: number, key: string) => { const A = P0(a), Bp = P0(b); const n = 16; const hgt = 0.25 + 0.05 * Math.hypot(A[0] - Bp[0], A[2] - Bp[2]);
    return Array.from({ length: n }, (_, i) => (i + 0.5) / n).filter((u) => u <= kk).map((u, i) => <mesh key={key + i} position={arc(A, Bp, u, hgt)}><sphereGeometry args={[0.022 * Math.min(pinS, 1.6), 6, 4]} /><M c={C.gold} e={C.gold} ei={1.4} /></mesh>); };
  let pinPos: V3 | null = null; let pk = 0; let arrived = 0;
  if (pin) {
    const tk = (t - (pin.at ?? 0)) / (pin.dur ?? 0.7); pk = eio(tk);
    if (pin.from) { const A = P0(pin.from), Bp = P0(pin.to); pinPos = arc(A, Bp, pk, 0.25 + 0.05 * Math.hypot(A[0] - Bp[0], A[2] - Bp[2])); arrived = clamp((t - (pin.at ?? 0) - (pin.dur ?? 0.7)) / 0.3); }
    else if (t >= (pin.at ?? 0)) { const Bp = P0(pin.to); const d = eo(tk * 1.4); pinPos = [Bp[0], Bp[1] + (1 - d) * 1.6, Bp[2]]; arrived = clamp((t - (pin.at ?? 0) - 0.5) / 0.3); }
  }
  return (
    <group>
      {only !== 'tdf' && <Land pts={MAIN} k={k} cap={cap} />}
      <Land pts={TDF} k={k} cap={cap} glow={g} />
      {andes && only !== 'tdf' && <Andes k={k} />}
      {dots.map((d: string) => <Dot key={d} pos={P0(d)} c={visited.includes(d) || (pin && pin.to === d && arrived > 0) ? C.gold : '#8d7fd0'} r={0.05 * Math.min(pinS, 2)} ei={visited.includes(d) ? 1.2 : 0.3} />)}
      {trail.map(([a, b]: string[], i: number) => <group key={'tr' + i}>{segDots(a, b, 1, 'tr' + i)}</group>)}
      {pin && pin.from && pk > 0 && segDots(pin.from, pin.to, pk, 'act')}
      {pinPos && <group position={pinPos}><PinMark s={pinS} /></group>}
      {pin && arrived > 0 && (() => { const Bp = P0(pin.to); const pu = 1 + Math.sin(t * 5) * 0.08; return (
        <group position={[Bp[0], Bp[1] + 0.012, Bp[2]]} rotation={[-PI / 2, 0, 0]} scale={arrived * pu * pinS}>
          <mesh><ringGeometry args={[0.13, 0.17, 28]} /><meshBasicMaterial color={C.gold} toneMapped={false} /></mesh>
          <mesh><ringGeometry args={[0.24, 0.26, 28]} /><meshBasicMaterial color={C.gold} transparent opacity={0.6} toneMapped={false} /></mesh>
        </group>); })()}
    </group>
  );
};

/** pantalla del celular con la silueta del mapa y un pin (plano 4) */
const drawMiniMap = (g: CanvasRenderingContext2D, W: number, H: number) => {
  const gr = g.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, '#1d1150'); gr.addColorStop(1, '#0d0726'); g.fillStyle = gr; g.fillRect(0, 0, W, H);
  const sc = H / 40; const X = (lo: number) => W / 2 + (lo - LON0) * sc * 0.79, Y = (la: number) => H * 0.06 + (-21.5 - la) * sc * 0.92;
  [MAIN, TDF].forEach((pts) => { g.beginPath(); pts.forEach(([lo, la], i) => (i ? g.lineTo(X(lo), Y(la)) : g.moveTo(X(lo), Y(la)))); g.closePath(); g.fillStyle = '#3a2a8a'; g.fill(); g.strokeStyle = C.cyan; g.lineWidth = 3; g.stroke(); });
  Object.entries(CITY).filter(([k]) => k !== 'us').forEach(([, [lo, la]]) => { g.fillStyle = C.gold; g.beginPath(); g.arc(X(lo), Y(la), 6, 0, 7); g.fill(); });
};
const drawPlay = (g: CanvasRenderingContext2D, W: number, H: number) => {
  const grad = g.createLinearGradient(0, 0, W, H); grad.addColorStop(0, '#ff7a3d'); grad.addColorStop(0.55, '#ff3ea5'); grad.addColorStop(1, '#5b2bd6'); g.fillStyle = grad; g.fillRect(0, 0, W, H);
  g.fillStyle = '#1a0f3d'; for (let i = 0; i < 6; i++) { const bw = W / 6, bh = H * (0.12 + ((i * 37) % 23) / 110); g.fillRect(i * bw, H - bh, bw - 5, bh); }
  g.fillStyle = 'rgba(0,0,0,.3)'; g.beginPath(); g.arc(W / 2, H * 0.45, W * 0.2, 0, 7); g.fill();
  g.fillStyle = '#fff'; g.beginPath(); g.moveTo(W / 2 - W * 0.07, H * 0.45 - W * 0.1); g.lineTo(W / 2 + W * 0.1, H * 0.45); g.lineTo(W / 2 - W * 0.07, H * 0.45 + W * 0.1); g.fill();
  g.fillStyle = 'rgba(255,255,255,.85)'; g.fillRect(W * 0.08, H * 0.93, W * 0.84 * 0.4, 8); g.fillStyle = 'rgba(255,255,255,.3)'; g.fillRect(W * 0.08 + W * 0.84 * 0.4, H * 0.93, W * 0.84 * 0.6, 8);
};
const PhoneBody: React.FC<{ screen: 'play' | 'map' }> = ({ screen }) => {
  const tx = useTex(screen === 'map' ? drawMiniMap : drawPlay, 256, 520, 'ph-' + screen);
  return (<group>
    <B s={[0.66, 1.3, 0.08]} c="#15102b" />
    <mesh position={[0, 0, 0.042]}><planeGeometry args={[0.56, 1.16]} /><meshBasicMaterial map={tx} toneMapped={false} /></mesh>
    <B s={[0.14, 0.03, 0.01]} pos={[0, 0.6, 0.042]} c="#2b2350" />
  </group>);
};

/**
 * Mano low-poly. El objeto va en el origen; la palma queda detrás (z negativo), el pulgar por la izquierda y
 * los dedos por la derecha, siempre por fuera del objeto. p: obj ('phone' | 'none'), screen, ow/od (medio ancho y
 * media profundidad del objeto), grip (0 abierta, 1 cerrada), skin, sleeve
 */
const HandShape: React.FC<{ ow: number; od: number; grip: number; skin: string; sleeve: string }> = ({ ow, od, grip, skin, sleeve }) => {
  const open = (1 - grip) * 0.2; const zb = -od - 0.02; // espalda del objeto
  return (
    <group>
      <B s={[0.62, 0.86, 0.15]} pos={[0.04, -0.3, zb - 0.075]} c={skin} />
      <B s={[0.5, 0.5, 0.3]} pos={[0.06, -0.86, zb - 0.12]} c={skin} />
      <B s={[0.56, 1.0, 0.36]} pos={[0.08, -1.45, zb - 0.14]} c={sleeve} />
      {/* pulgar */}
      <B s={[0.14, 0.36, 0.14]} pos={[-ow - 0.075 - open, -0.42, zb + 0.02]} rot={[0, 0, -0.25]} c={skin} />
      <B s={[0.13, 0.26, 0.13]} pos={[-ow - 0.07 - open, -0.16, od + 0.075]} rot={[0.0, 0, -0.1]} c={skin} />
      <B s={[0.14, 0.14, od * 2 + 0.2]} pos={[-ow - 0.075 - open, -0.28, 0]} c={skin} />
      {/* cuatro dedos */}
      {[-0.52, -0.3, -0.08, 0.14].map((y, i) => <group key={i}>
        <B s={[0.13, 0.125, 0.2]} pos={[ow + 0.075 + open, y, zb - 0.04]} c={skin} />
        <B s={[0.12, 0.115, od * 2 + 0.06]} pos={[ow + 0.075 + open, y, 0]} c={skin} />
        <B s={[0.11, 0.11, 0.12]} pos={[ow + 0.07 + open, y, od + 0.07]} c={skin} />
      </group>)}
    </group>
  );
};
export const Mano: React.FC<P> = ({ t, p }) => {
  const { obj = 'phone', screen = 'play', ow = 0.35, od = 0.045, skin = '#e3ad80', sleeve = '#2f6bff' } = p;
  return (<group rotation={[0, Math.sin(t * 1.4) * 0.05, Math.sin(t * 1.1) * 0.02]}>
    {obj === 'phone' && <PhoneBody screen={screen} />}
    <HandShape ow={ow} od={od} grip={1} skin={skin} sleeve={sleeve} />
  </group>);
};

/** Frasco genérico (sin etiqueta) sobre una mesa; la mano baja, lo agarra y lo levanta. p: t1 (llega), t2 (levanta) */
export const Agarre: React.FC<P> = ({ t, p }) => {
  const { t1 = 0.4, t2 = 0.9, skin = '#e3ad80', sleeve = '#2f6bff', lift = 0.75, legs = 0 } = p;
  const r = 0.27, h = 0.62;
  const down = eio(t / t1); const grip = eio((t - t1) / 0.2); const up = eio((t - t2) / 0.6);
  const handY = lerp(1.4, 0, down) + up * lift; const jarY = up * lift;
  return (<group>
    {/* mesa */}
    <B s={[2.6, 0.1, 1.5]} pos={[0, -h / 2 - 0.05 - 0.01, -0.1]} c="#8a5a3a" />
    <B s={[2.6, 0.06, 0.04]} pos={[0, -h / 2 - 0.03, 0.66]} c={C.gold} e={C.gold} ei={0.5} />
    {legs > 0 && [[-1.2, -0.75], [1.2, -0.75], [-1.2, 0.55], [1.2, 0.55]].map(([x, z], i) => <B key={i} s={[0.1, legs, 0.1]} pos={[x, -h / 2 - 0.11 - legs / 2, z]} c="#5c3a26" />)}
    <group position={[0, jarY, 0]} rotation={[0, up * 0.6, 0]}>
      <Cyl r={r} h={h} seg={10} c="#46c7b8" e="#46c7b8" ei={0.15} />
      <Cyl r={r * 0.82} h={0.12} seg={10} pos={[0, h / 2 + 0.06, 0]} c="#f4f1ff" />
      <Cyl r={r * 1.01} h={0.14} seg={10} pos={[0, 0.02, 0]} c="#2d1a6e" />
    </group>
    <group position={[0, handY - 0.1, 0]} rotation={[0, 0, PI]}>
      <HandShape ow={r + 0.01} od={r} grip={grip} skin={skin} sleeve={sleeve} />
    </group>
  </group>);
};

/* ================= OBJETOS DE CADA PARADA ================= */
/** Lata de gaseosa genérica, sin marca */
export const Lata: React.FC<P> = ({ t, p }) => {
  const { band = C.magenta, spin = 0.6 } = p; const r = 0.42, h = 1.25;
  return (<group rotation={[0.08, t * spin, 0]}>
    <Cyl r={r} h={h} seg={16} c="#c9cbd8" e="#8f93a8" ei={0.25} />
    <Cyl r={r * 1.005} h={h * 0.56} seg={16} pos={[0, -0.02, 0]} c={band} e={band} ei={0.35} />
    <Cyl r={r * 1.01} h={0.06} seg={16} pos={[0, 0.12, 0]} c="#f4f1ff" />
    <Cyl r={r * 0.86} r2={r} h={0.08} seg={16} pos={[0, h / 2 + 0.04, 0]} c="#dfe1ee" />
    <Cyl r={r * 0.8} h={0.03} seg={16} pos={[0, h / 2 + 0.09, 0]} c="#aeb1c4" />
    <B s={[0.16, 0.025, 0.09]} pos={[0, h / 2 + 0.115, 0.1]} c="#8d90a6" />
    <Cyl r={r} r2={r * 0.86} h={0.08} seg={16} pos={[0, -h / 2 - 0.04, 0]} c="#aeb1c4" />
  </group>);
};
/** Lingote de aluminio */
const Ingot: React.FC<{ pos: V3; k?: number }> = ({ pos, k = 1 }) => (
  <group position={pos} scale={k}>
    <mesh position={[0, 0.07, 0]}><cylinderGeometry args={[0.2, 0.26, 0.14, 4, 1]} /><M c="#c6cad8" e="#8f93a8" ei={0.3} /></mesh>
  </group>
);
export const Lingote: React.FC<P> = ({ tt }) => (<group rotation={[0, PI / 4, 0]} scale={[1.6, 1, 0.8]}><Ingot pos={[0, 0, 0]} k={pop(tt)} /></group>);
/** pila de lingotes que crece (n por capas) */
export const Lingotes: React.FC<P> = ({ tt, p }) => {
  const { n = 24, dur = 1.4 } = p; const vis = Math.round(n * eo(tt / dur)); const out: JSX.Element[] = []; let i = 0;
  for (let layer = 0; layer < 6 && i < n; layer++) { const cols = 4 - Math.floor(layer / 2), rows = 2; for (let r = 0; r < rows; r++) for (let c = 0; c < cols && i < n; c++, i++) {
    if (i >= vis) continue; const x = (c - (cols - 1) / 2) * 0.5, z = (r - 0.5) * 0.42; const rot = layer % 2 ? PI / 2 : 0;
    out.push(<group key={i} position={[layer % 2 ? z : x, layer * 0.15, layer % 2 ? x * 0.84 : z]} rotation={[0, rot + PI / 4, 0]} scale={[1.0, 1, 0.55]}><Ingot pos={[0, 0, 0]} k={0.82} /></group>); } }
  return <group>{out}</group>;
};
/** Fábrica genérica: nave con techo en serrucho y chimenea. p: color, lit, w */
export const Fabrica: React.FC<P> = ({ t, p }) => {
  const { w = 1, color = '#3b2f7a', lit = C.cyan, smoke = false } = p;
  return (<group scale={w}>
    <B s={[1.2, 0.5, 0.7]} pos={[0, 0.25, 0]} c={color} />
    {[-0.4, 0, 0.4].map((x) => <mesh key={x} position={[x, 0.6, 0]} rotation={[PI / 2, 0, 0]}><cylinderGeometry args={[0.23, 0.23, 0.7, 3]} /><M c="#4d3fa0" /></mesh>)}
    <B s={[1.0, 0.1, 0.02]} pos={[0, 0.3, 0.36]} c={lit} e={lit} ei={1.4} />
    <Cyl r={0.08} h={0.75} pos={[0.45, 0.85, -0.2]} c="#5a4a9a" />
    <Cyl r={0.085} h={0.07} pos={[0.45, 1.05, -0.2]} c={C.red} e={C.red} ei={0.8} />
    {smoke && [0, 1, 2].map((i) => { const u = ((t * 0.5 + i / 3) % 1); return <mesh key={i} position={[0.45 + u * 0.2, 1.25 + u * 0.5, -0.2]} scale={0.6 + u}><icosahedronGeometry args={[0.1, 0]} /><M c="#6f62a8" /></mesh>; })}
  </group>);
};
/** Íconos de aparatos: celular, tele, aire. p: kind, lit (cuándo se enciende, s del plano; null = apagado) */
export const Aparato: React.FC<P> = ({ t, p }) => {
  const { kind = 'phone', lit = null, col = C.cyan } = p; const on = lit !== null && t >= lit; const sc = on ? col : '#3b3560'; const ei = on ? 1.1 : 0;
  if (kind === 'tv') return (<group>
    <B s={[0.56, 0.36, 0.05]} pos={[0, 0.3, 0]} c="#15102b" /><B s={[0.5, 0.3, 0.01]} pos={[0, 0.3, 0.03]} c={sc} e={sc} ei={ei} />
    <B s={[0.06, 0.1, 0.04]} pos={[0, 0.07, 0]} c="#15102b" /><B s={[0.26, 0.03, 0.14]} pos={[0, 0.015, 0]} c="#15102b" /></group>);
  if (kind === 'ac') return (<group>
    <B s={[0.6, 0.2, 0.16]} pos={[0, 0.3, 0]} c="#e9e6f5" /><B s={[0.5, 0.025, 0.01]} pos={[0, 0.24, 0.085]} c="#8d8aa0" />
    <B s={[0.06, 0.03, 0.01]} pos={[0.22, 0.35, 0.085]} c={sc} e={sc} ei={ei * 2} /><B s={[0.05, 0.2, 0.05]} pos={[0, 0.1, -0.04]} c="#5a4a9a" /></group>);
  return (<group><B s={[0.22, 0.42, 0.04]} pos={[0, 0.25, 0]} c="#15102b" /><B s={[0.18, 0.36, 0.01]} pos={[0, 0.25, 0.025]} c={sc} e={sc} ei={ei} />
    <B s={[0.12, 0.04, 0.12]} pos={[0, 0.02, -0.02]} c="#2b2350" /></group>);
};
/** Caramelo envuelto con las puntas retorcidas */
export const Caramelo: React.FC<P> = ({ t, p }) => {
  const { c1 = C.gold, c2 = C.red, spin = 0.9 } = p;
  return (<group rotation={[0.2, 0, Math.sin(t * 1.2) * 0.15]}><group rotation={[0, t * spin, 0]}>
    <mesh scale={[1.25, 0.8, 0.8]}><icosahedronGeometry args={[0.42, 1]} /><M c={c1} e={c1} ei={0.25} /></mesh>
    <mesh scale={[1.255, 0.25, 0.81]} position={[0, 0.0, 0]}><icosahedronGeometry args={[0.42, 1]} /><M c={c2} e={c2} ei={0.25} /></mesh>
    {[-1, 1].map((sx) => <group key={sx}>
      <mesh position={[sx * 0.6, 0, 0]} rotation={[0, 0, sx * PI / 2]}><coneGeometry args={[0.1, 0.16, 5]} /><M c={c1} /></mesh>
      <mesh position={[sx * 0.78, 0, 0]} rotation={[0, 0, -sx * PI / 2]}><coneGeometry args={[0.22, 0.26, 5]} /><M c={c1} e={c1} ei={0.2} /></mesh>
    </group>)}
  </group></group>);
};
/** caramelitos chicos (lluvia/pila) */
export const Caramelitos: React.FC<P> = ({ tt, p }) => {
  const { n = 14, seed = 3, area = [2.2, 1.2], stagger = 0.06, drop = 2 } = p;
  const pts = useMemo(() => { const r = rnd(seed); return Array.from({ length: n }, () => [(r() - 0.5) * area[0], (r() - 0.5) * area[1], r() * PI, Math.floor(r() * 3)]); }, [n, seed]);
  const cols = [[C.gold, C.red], [C.cyan, '#f4f1ff'], [C.magenta, C.gold]];
  return (<group>{pts.map(([x, z, ry, ci], i) => { const k = eo((tt - i * stagger) / 0.45); if (tt - i * stagger <= 0) return null; const [a, b] = cols[ci];
    return <group key={i} position={[x, 0.12 + (1 - k) * drop, z]} rotation={[0, ry, 0]} scale={0.32}>
      <mesh scale={[1.25, 0.8, 0.8]}><icosahedronGeometry args={[0.42, 0]} /><M c={a} e={a} ei={0.25} /></mesh>
      <mesh scale={[1.26, 0.25, 0.81]}><icosahedronGeometry args={[0.42, 0]} /><M c={b} /></mesh>
      {[-1, 1].map((sx) => <mesh key={sx} position={[sx * 0.72, 0, 0]} rotation={[0, 0, -sx * PI / 2]}><coneGeometry args={[0.2, 0.26, 5]} /><M c={a} /></mesh>)}
    </group>; })}</group>);
};
/** Paneles AR + COR juntos (se leen ARCOR); en hA se resalta AR y en hB se resalta COR. Texto 3D 2 cm delante del panel. */
export const Siglas: React.FC<P> = ({ t, tt, p }) => {
  const { hA = 1, hB = 2 } = p; const h = 0.62; const wA = 0.9, wB = 1.25, gap = 0.08;
  const kA = clamp((t - hA) / 0.25), kB = clamp((t - hB) / 0.25);
  const panel = (text: string, w: number, bg: string, x: number, k: number) => (
    <group position={[x, k * 0.18, k * 0.12]} scale={1 + 0.12 * k}>
      <B s={[w, h, 0.12]} c={k > 0 ? bg : '#3b3560'} e={bg} ei={0.15 + 0.5 * k} />
      <group position={[0, 0, 0.06 + 0.02]}><Label t={t} tt={tt} p={{ text, w: w * 0.94, h: h * 0.9, size: 0.86, weight: 900, color: k > 0 ? '#1a1030' : '#f4f1ff', depth: 0 }} /></group>
    </group>);
  return (<group>{panel('AR', wA, C.cyan, -(wA / 2) - gap / 2 - 0.06 * kA, kA)}{panel('COR', wB, C.gold, wB / 2 + gap / 2 + 0.06 * kB, kB)}</group>);
};
/** Casa-fábrica chica (donde nació la empresa), genérica */
export const Casita: React.FC<P> = () => (
  <group>
    <B s={[0.9, 0.55, 0.6]} pos={[0, 0.275, 0]} c="#7a5a44" />
    <mesh position={[0, 0.72, 0]} rotation={[0, PI / 4, 0]}><coneGeometry args={[0.62, 0.36, 4]} /><M c={C.red} /></mesh>
    <B s={[0.2, 0.32, 0.02]} pos={[-0.2, 0.16, 0.31]} c="#15102b" />
    <B s={[0.22, 0.16, 0.02]} pos={[0.2, 0.32, 0.31]} c={C.gold} e={C.gold} ei={1.2} />
  </group>
);
/** Botella de aceite genérica, sin etiqueta */
export const Botella: React.FC<P> = ({ t, tt, p }) => {
  const { fill = 1, fillAt = 0, dur = 1.2 } = p; const f = fill * clamp((t - fillAt) / dur); const h = 1.3, r = 0.3;
  return (<group rotation={[0, Math.sin(t) * 0.2, 0]}>
    <mesh position={[0, h / 2, 0]}><cylinderGeometry args={[r, r, h, 10]} /><meshStandardMaterial color="#f4f1ff" transparent opacity={0.32} flatShading /></mesh>
    {f > 0 && <mesh position={[0, (h * 0.95 * f) / 2 + 0.02, 0]}><cylinderGeometry args={[r * 0.93, r * 0.93, h * 0.95 * f, 10]} /><M c="#f2c230" e="#c99a12" ei={0.5} /></mesh>}
    <mesh position={[0, h + 0.16, 0]}><cylinderGeometry args={[r * 0.4, r, 0.32, 10]} /><meshStandardMaterial color="#f4f1ff" transparent opacity={0.32} flatShading /></mesh>
    <Cyl r={0.13} h={0.14} pos={[0, h + 0.39, 0]} c="#3ee07a" e="#1f9d55" ei={0.3} />
  </group>);
};
/** Molino: tolva, dos rodillos que giran y granos que caen. p: fallAt */
export const Molino: React.FC<P> = ({ t, p }) => {
  const { fallAt = 0 } = p; const run = t >= fallAt;
  const grains = Array.from({ length: 10 }, (_, i) => { const u = ((t - fallAt) * 1.1 + i / 10) % 1; return run && t - fallAt > i * 0.07 ? <mesh key={i} position={[((i * 37) % 7 - 3) * 0.04, 1.35 - u * 0.75, ((i * 13) % 5 - 2) * 0.04]}><icosahedronGeometry args={[0.045, 0]} /><M c={C.gold} e={C.gold} ei={0.5} /></mesh> : null; });
  return (<group>
    <B s={[1.1, 0.5, 0.7]} pos={[0, 0.25, 0]} c="#3b2f7a" />
    {[-0.16, 0.16].map((x, i) => <mesh key={x} position={[x, 0.62, 0]} rotation={[PI / 2, (i ? -1 : 1) * t * 4, 0]}><cylinderGeometry args={[0.15, 0.15, 0.6, 8]} /><M c="#8d8aa0" e="#4d4a66" ei={0.3} /></mesh>)}
    <mesh position={[0, 1.15, 0]} rotation={[PI, PI / 4, 0]}><cylinderGeometry args={[0.45, 0.12, 0.45, 4, 1, true]} /><meshStandardMaterial color="#5a4a9a" side={THREE.DoubleSide} flatShading /></mesh>
    <mesh position={[0, 1.32, 0]}><coneGeometry args={[0.26, 0.18, 8]} /><M c={C.gold} e={C.gold} ei={0.3} /></mesh>
    {grains}
    <B s={[0.9, 0.06, 0.02]} pos={[0, 0.32, 0.36]} c={C.green} e={C.green} ei={1.2} />
  </group>);
};
/** Montón de granos */
export const Granos: React.FC<P> = ({ p }) => {
  const { r = 0.5, h = 0.4, n = 26, seed = 4 } = p;
  const pts = useMemo(() => { const q = rnd(seed); return Array.from({ length: n }, () => { const a = q() * PI * 2, d = Math.sqrt(q()) * r; return [Math.cos(a) * d, h * (1 - d / r) + 0.03, Math.sin(a) * d]; }); }, [r, h, n, seed]);
  return (<group><mesh position={[0, h / 2, 0]}><coneGeometry args={[r, h, 9]} /><M c="#d99a20" e="#a8720c" ei={0.3} /></mesh>
    {pts.map((q, i) => <mesh key={i} position={q as V3}><icosahedronGeometry args={[0.05, 0]} /><M c={C.gold} e={C.gold} ei={0.4} /></mesh>)}</group>);
};
/** Torta 3/4 que crece. p: frac */
export const Torta: React.FC<P> = ({ t, tt, p }) => {
  const { frac = 0.75, r = 0.85, h = 0.28 } = p; const k = eo(tt / 0.9); const a = PI * 2 * frac * k;
  return (<group rotation={[0.35, 0, 0]}>
    <mesh position={[0, h / 2, 0]}><cylinderGeometry args={[r, r, h, 32, 1, false, 0, Math.max(0.001, a)]} /><M c={C.gold} e={C.gold} ei={0.45} /></mesh>
    <mesh position={[0, h * 0.35, 0]}><cylinderGeometry args={[r * 0.97, r * 0.97, h * 0.7, 32, 1, false, a, PI * 2 - a + 0.0001]} /><M c="#3b3560" /></mesh>
  </group>);
};
/** Río con olas suaves */
export const Rio: React.FC<P> = ({ t, p }) => {
  const { w = 2.2, len = 14 } = p;
  return (<group>
    <mesh rotation={[-PI / 2, 0, 0]} position={[0, 0.01, 0]}><planeGeometry args={[w, len]} /><M c="#1d3f8f" e="#123070" ei={0.5} /></mesh>
    {Array.from({ length: 14 }, (_, i) => { const z = -len / 2 + ((i * 1.1 + t * 0.4) % len); return <B key={i} s={[0.35, 0.01, 0.03]} pos={[((i * 53) % 9 - 4) * w * 0.1, 0.02, z]} c="#4f7fe0" e="#4f7fe0" ei={0.8} />; })}
  </group>);
};
/** Terminal: silos + cinta hasta el muelle */
export const Terminal: React.FC<P> = ({ p }) => {
  const { n = 3 } = p;
  return (<group>
    {Array.from({ length: n }, (_, i) => <group key={i} position={[0, 0, (i - (n - 1) / 2) * 0.62]}>
      <Cyl r={0.28} h={1.3} seg={10} pos={[0, 0.65, 0]} c="#b9b3cf" />
      <mesh position={[0, 1.42, 0]}><coneGeometry args={[0.3, 0.25, 10]} /><M c="#8d8aa0" /></mesh>
    </group>)}
    <B s={[0.9, 0.08, 0.1]} pos={[0.6, 1.25, 0]} rot={[0, 0, -0.35]} c={C.gold} e={C.gold} ei={0.5} />
    <B s={[0.08, 1.1, 0.08]} pos={[0.55, 0.55, 0]} c="#5a4a9a" />
  </group>);
};
/** Barco granelero genérico (sin nombre). p: load (cuándo se llena), speed, at */
export const Barco: React.FC<P> = ({ t, p }) => {
  const { loadAt = 0, color = '#8f2b3e', len = 2.0 } = p; const k = eo((t - loadAt) / 0.8);
  return (<group rotation={[0, 0, Math.sin(t * 1.6) * 0.02]}>
    <B s={[0.62, 0.3, len]} pos={[0, 0.15, 0]} c={color} />
    <mesh position={[0, 0.15, len / 2 + 0.2]} rotation={[0, 0, 0]}><cylinderGeometry args={[0.0, 0.31, 0.4, 4, 1]} /><M c={color} /></mesh>
    <B s={[0.64, 0.06, len]} pos={[0, 0.32, 0]} c="#2b2350" />
    <B s={[0.5, 0.4, 0.36]} pos={[0, 0.55, -len / 2 + 0.22]} c="#d9d2f5" />
    <B s={[0.52, 0.06, 0.2]} pos={[0, 0.62, -len / 2 + 0.05]} c="#15102b" />
    <B s={[0.44, 0.05, 0.02]} pos={[0, 0.62, -len / 2 + 0.41]} c={C.cyan} e={C.cyan} ei={1} />
    {[-0.45, 0.05, 0.55].map((z) => <group key={z}><B s={[0.46, 0.05, 0.4]} pos={[0, 0.36, z]} c="#3b2f7a" />
      {k > 0 && <mesh position={[0, 0.38 + 0.11 * k, z]} scale={[1, k, 1]}><coneGeometry args={[0.2, 0.22, 6]} /><M c={C.gold} e={C.gold} ei={0.4} /></mesh>}</group>)}
  </group>);
};
/** Satélite genérico (sin logo) */
export const Satelite: React.FC<P> = ({ t, p }) => {
  const { s = 1, spinP = 0.4, body = C.gold } = p;
  return (<group scale={s} rotation={[0.2, 0, Math.sin(t * 0.8) * 0.08]}>
    <B s={[0.5, 0.55, 0.5]} c={body} e={body} ei={0.35} />
    <B s={[0.52, 0.06, 0.52]} pos={[0, 0.2, 0]} c="#c99a12" />
    {[-1, 1].map((sx) => <group key={sx} position={[sx * 0.3, 0, 0]} rotation={[t * spinP * 0.3, 0, 0]}>
      <B s={[0.25, 0.04, 0.04]} pos={[sx * 0.12, 0, 0]} c="#8d8aa0" />
      <group position={[sx * 0.82, 0, 0]}>
        <B s={[1.1, 0.03, 0.42]} c="#1d3f8f" e="#2f6bff" ei={0.55} />
        {[-0.27, 0, 0.27].map((x) => <B key={x} s={[0.015, 0.035, 0.42]} pos={[x, 0, 0]} c="#8fb4ff" />)}
      </group>
    </group>)}
    <mesh position={[0, -0.36, 0.12]} rotation={[0.5, 0, 0]}><cylinderGeometry args={[0.28, 0.06, 0.12, 12]} /><M c="#e9e6f5" /></mesh>
    <Cyl r={0.015} h={0.3} pos={[0, 0.42, 0]} c="#e9e6f5" />
  </group>);
};
/** Globo con una órbita de satélites chicos. p: n (fijos), newAt (cuándo entra el dorado), glowAt */
export const Orbita: React.FC<P> = ({ t, p }) => {
  const { n = 7, newAt = 1, R = 1.65, glowAt = 99 } = p; const rot = t * 0.25;
  const kIn = eio((t - newAt) / 0.9); const gl = clamp((t - glowAt) / 0.3);
  const sat = (a: number, c: string, sc = 0.22, key: any = 0, rr = R) => (<group key={key} position={[Math.cos(a) * rr, 0, Math.sin(a) * rr]} rotation={[0, -a, 0]} scale={sc}>
    <B s={[0.5, 0.5, 0.5]} c={c} e={c} ei={0.5} /><B s={[1.6, 0.04, 0.4]} c="#1d3f8f" e="#2f6bff" ei={0.6} /></group>);
  return (<group>
    <group rotation={[0.3, t * 0.5, 0]}>
      <mesh><icosahedronGeometry args={[1, 1]} /><M c="#2f6bff" e="#16307a" ei={0.6} /></mesh>
      {[[0.5, 0.6, 0.6, 0.5], [-0.7, 0.2, 0.65, 0.45], [0.1, -0.6, 0.78, 0.4], [-0.3, 0.7, -0.6, 0.5], [0.8, -0.2, -0.5, 0.45], [-0.6, -0.5, -0.6, 0.4]].map(([x, y, z, s], i) => (
        <mesh key={i} position={[x * 0.86, y * 0.86, z * 0.86]} scale={[s, s, s]}><icosahedronGeometry args={[0.6, 0]} /><M c={C.green} /></mesh>))}
    </group>
    <group rotation={[0.18, 0, 0]}>
      <mesh rotation={[-PI / 2, 0, 0]}><ringGeometry args={[R - 0.015, R + 0.015, 64]} /><meshBasicMaterial color={gl > 0 ? C.gold : '#8a6bff'} transparent opacity={0.5 + 0.4 * gl} toneMapped={false} side={THREE.DoubleSide} /></mesh>
      <group rotation={[0, rot, 0]}>
        {Array.from({ length: n }, (_, i) => sat((i / (n + 1)) * PI * 2, C.cyan, 0.22, i))}
        {t >= newAt - 0.01 && sat((n / (n + 1)) * PI * 2 + (1 - kIn) * 0.6, C.gold, 0.22 + 0.08 * (1 - kIn) + 0.04 * gl, 'g', R + (1 - kIn) * 1.6)}
      </group>
    </group>
  </group>);
};
/** Barras a escala con nombre y valor (datos del guion). p: items [{v, name, val, c}], max, hmax */
export const Ranking: React.FC<P> = ({ t, tt, p }) => {
  const { items = [], max = 80, hmax = 2.2, w = 0.72, gap = 0.36, stagger = 0.35, dur = 0.7 } = p;
  const tot = items.length * w + (items.length - 1) * gap;
  return (<group>{items.map((it: any, i: number) => { const k = eo((tt - i * stagger) / dur); const h = Math.max(0.001, (it.v / max) * hmax * k); const x = -tot / 2 + w / 2 + i * (w + gap);
    return <group key={i} position={[x, 0, 0]}>
      <B s={[w, h, w]} pos={[0, h / 2, 0]} c={it.c} e={it.c} ei={0.4} />
      {k > 0.98 && <group position={[0, h + 0.2, 0]}><Label t={t} tt={tt} p={{ text: it.val, w: w + 0.12, h: 0.3, bg: '#15102b', color: '#fff', size: 0.68, weight: 900 }} /></group>}
      <group position={[0, 0.2, w / 2 + 0.02]}><Label t={t} tt={tt} p={{ text: it.name, w: w * 0.96, h: 0.2, color: '#1a1030', size: 0.66, weight: 900, depth: 0 }} /></group>
    </group>; })}</group>);
};
/** Globito de comentario (sin texto: tres puntos) */
export const Globito: React.FC<P> = ({ t, p }) => {
  const { c = C.cyan, w = 0.9 } = p; const h = w * 0.55;
  return (<group>
    <B s={[w, h, 0.12]} c={c} e={c} ei={0.4} />
    <mesh position={[-w * 0.25, -h / 2 - 0.08, 0]} rotation={[0, 0, PI]}><coneGeometry args={[0.1, 0.2, 3]} /><M c={c} e={c} ei={0.4} /></mesh>
    {[-1, 0, 1].map((i) => <mesh key={i} position={[i * w * 0.24, 0, 0.08 + 0.01]} scale={1 + 0.15 * Math.max(0, Math.sin(t * 6 - i))}><sphereGeometry args={[0.055, 8, 6]} /><M c="#1a1030" /></mesh>)}
  </group>);
};
/** Signo de pregunta sobre un panel */
export const Pregunta: React.FC<P> = ({ t, tt }) => (
  <group rotation={[0, Math.sin(t * 1.5) * 0.2, 0]}>
    <B s={[0.62, 0.72, 0.1]} c={C.magenta} e={C.magenta} ei={0.45} />
    <group position={[0, 0, 0.05 + 0.02]}><Label t={t} tt={tt} p={{ text: '?', w: 0.56, h: 0.66, size: 0.9, weight: 900, color: '#fff', depth: 0 }} /></group>
  </group>
);

export const EXTRA: Record<string, React.FC<P>> = {
  mapa: Mapa, mano: Mano, agarre: Agarre, lata: Lata, lingote: Lingote, lingotes: Lingotes, fabrica: Fabrica, aparato: Aparato,
  caramelo: Caramelo, caramelitos: Caramelitos, siglas: Siglas, casita: Casita, botella: Botella, molino: Molino, granos: Granos,
  torta: Torta, rio: Rio, terminal: Terminal, barco: Barco, satelite: Satelite, orbita: Orbita, ranking: Ranking, globito: Globito,
  pregunta: Pregunta, pin: ({ p }: P) => <PinMark s={p.s ?? 1} c={p.c} />,
};
