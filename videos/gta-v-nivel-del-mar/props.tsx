import React from 'react';
import * as THREE from 'three';
import { M, Label, useTex } from '../../src/kit/Props';
import { clamp, eio, eo, lerp, pop, rnd } from '../../src/kit/math';

// Look propio de este video (distinto de los de hoy: escritorio de nogal, Lusail de noche, neón violeta): una maqueta
// costera en bloque, cortada como una porción de torta (se ven las capas de tierra en los costados), a la hora azul.
// Fondo azul petróleo casi negro arriba (ahí van los subtítulos) y una franja de bruma verde agua solo abajo.
// El agua es un volumen translúcido que sube y baja de forma continua; en los costados del bloque se ve su nivel.
// Ciudad genérica: muelle con grúas, palmeras, costanera, canales. Sin logos ni nada copiado del juego.
type P = { t: number; tt: number; p: any };
type V3 = [number, number, number];

export const SAND = '#e2c690', CONC = '#9b9ea3', SEAF = '#123f4c', WATER = '#2a9fb3', INK = '#07131c', TEAL = '#38d6c4',
  RED = '#ff4a3d', GREEN = '#46d17a', STEEL = '#5b6670', WOOD = '#a7794a', PALM = '#3f9b57';
const STUCCO = ['#efe4d2', '#f3d9c0', '#e9cfa6', '#dfe6e8', '#f0c9a8', '#d9e2d0'];

const B: React.FC<{ s: V3; pos?: V3; rot?: V3; c: string; e?: string; ei?: number; o?: number }> = ({ s, pos, rot, c, e, ei, o }) => (
  <mesh position={pos} rotation={rot}><boxGeometry args={s} /><M c={c} e={e} ei={ei} o={o} /></mesh>
);
const Cyl: React.FC<{ r: number; h: number; pos?: V3; rot?: V3; c: string; e?: string; ei?: number; seg?: number; r2?: number }> = ({ r, h, pos, rot, c, e, ei, seg = 10, r2 }) => (
  <mesh position={pos} rotation={rot}><cylinderGeometry args={[r2 ?? r, r, h, seg]} /><M c={c} e={e} ei={ei} /></mesh>
);
const ss = (a: number, b: number, x: number) => { const k = clamp((x - a) / (b - a)); return k * k * (3 - 2 * k); };
/** valor de una curva por tramos [[t, v], ...] con easing: continua, sin saltos */
export const curve = (kf: [number, number][], t: number) => {
  if (!kf.length) return 0; if (t <= kf[0][0]) return kf[0][1];
  for (let i = 1; i < kf.length; i++) if (t < kf[i][0]) { const [t0, v0] = kf[i - 1], [t1, v1] = kf[i]; return lerp(v0, v1, eio((t - t0) / (t1 - t0))); }
  return kf[kf.length - 1][1];
};

/* ---------- Cartel con el texto 2 cm delante del panel ---------- */
export const Sign: React.FC<P> = ({ t, tt, p }) => {
  const { w = 1, h = 0.3, bg = INK, border, color = '#fff', size = 0.62, weight = 900, depth = 0.04, text = '' } = p;
  return (
    <group>
      <B s={[w, h, depth]} c={bg} />
      {border && <B s={[w + 0.04, h + 0.04, depth * 0.6]} pos={[0, 0, -depth * 0.3]} c={border} e={border} ei={0.5} />}
      <group position={[0, 0, depth / 2 + 0.02]}><Label t={t} tt={tt} p={{ text, w: w * 0.96, h: h * 0.9, color, size, weight, depth: 0 }} /></group>
    </group>
  );
};

/* ---------- Mundo: fondo de hora azul que tapa el set 'room' ---------- */
export const World: React.FC<P> = ({ p }) => {
  const kind = p.kind ?? 'dusk';
  const sky = useTex((g, W, H) => {
    const gr = g.createLinearGradient(0, 0, 0, H);
    if (kind === 'dusk') {
      gr.addColorStop(0, '#03080f'); gr.addColorStop(0.5, '#061421'); gr.addColorStop(0.7, '#0b2433'); gr.addColorStop(0.8, '#14404b');
      gr.addColorStop(0.86, '#2f7470'); gr.addColorStop(0.9, '#1a4a50'); gr.addColorStop(1, '#0b1f28');
    } else if (kind === 'deep') {
      gr.addColorStop(0, '#03080f'); gr.addColorStop(0.6, '#051019'); gr.addColorStop(0.8, '#081c26'); gr.addColorStop(0.88, '#0f3038'); gr.addColorStop(0.93, '#0b2a31'); gr.addColorStop(1, '#0a1c24');
    } else if (kind === 'lab') {
      gr.addColorStop(0, '#03090d'); gr.addColorStop(0.6, '#071820'); gr.addColorStop(0.85, '#0d2a33'); gr.addColorStop(1, '#0a1e25');
    } else { gr.addColorStop(0, '#04070c'); gr.addColorStop(0.6, '#0a141c'); gr.addColorStop(0.86, '#15262f'); gr.addColorStop(1, '#0c171e'); }
    g.fillStyle = gr; g.fillRect(0, 0, W, H);
    if (kind === 'dusk' || kind === 'deep') {
      // lomas lejanas, muy oscuras, solo en la franja baja
      g.fillStyle = '#0a1d26'; g.beginPath(); g.moveTo(0, H);
      for (let x = 0; x <= W; x += 8) g.lineTo(x, H * 0.875 - Math.sin(x / 37) * 9 - Math.sin(x / 13) * 4); g.lineTo(W, H); g.fill();
    }
    if (kind === 'lab') {
      // paneles de la pared del laboratorio: líneas tenues solo en la mitad baja
      g.strokeStyle = '#123540'; g.lineWidth = 2;
      for (let x = 0; x <= W; x += 64) { g.beginPath(); g.moveTo(x, H * 0.62); g.lineTo(x, H); g.stroke(); }
      for (let y = H * 0.62; y <= H; y += 48) { g.beginPath(); g.moveTo(0, y); g.lineTo(W, y); g.stroke(); }
    }
  }, 512, 1024, 'gvsky' + kind);
  const floor = kind === 'dusk' || kind === 'deep' ? '#09161e' : kind === 'lab' ? '#0c1b21' : '#0d151b';
  return (
    <group>
      <mesh position={[0, 4.5, -3.7]}><planeGeometry args={[9.6, 12]} /><meshBasicMaterial map={sky} toneMapped={false} /></mesh>
      {[-1, 1].map((k) => <mesh key={k} position={[k * 4.3, 4.5, 4]} rotation={[0, -k * Math.PI / 2, 0]}><planeGeometry args={[16, 12]} /><meshBasicMaterial map={sky} toneMapped={false} /></mesh>)}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 4]}><planeGeometry args={[40, 40]} /><M c={floor} /></mesh>
      <hemisphereLight args={['#9fd8ff', '#2a1d14', 0.55]} />
      <directionalLight position={[-5, 4, 3]} intensity={0.6} color="#9fe8ff" />
    </group>
  );
};

/* ---------- Terreno de la maqueta principal (coordenadas locales; y = 0 es el nivel del mar de hoy) ---------- */
const X0 = -1.6, X1 = 1.6, Z0 = -2.0, Z1 = 2.0, BOT = -0.55;
const zc = (x: number) => (x < -0.3 ? 0.6 : 0.75);
export const hCoast = (x: number, z: number) => {
  const d = zc(x) - z;
  if (d >= 0) {
    const town = 0.06 + 0.06 * d; const port = 0.07 + 0.02 * d;
    const base = x < -0.3 ? lerp(port, town, ss(0.8, 1.15, d)) : town;
    return base + 0.22 * ss(1.0, 1.3, d) + 0.25 * ss(2.0, 2.3, d);
  }
  const e = -d;
  if (x < -0.3) return lerp(0.07, -0.4, ss(0, 0.06, e));
  return e < 0.4 ? lerp(0.06, -0.12, e / 0.4) : lerp(-0.12, -0.4, ss(0.4, 0.8, e));
};
const colCoast = (x: number, z: number, y: number) => {
  const d = zc(x) - z;
  if (y < -0.16) return SEAF;
  if (d < 0) return x < -0.3 ? CONC : SAND;
  if (x < -0.3 && d < 1.0) return CONC;
  if (d < 0.32 && x >= -0.3) return SAND;
  return d < 1.15 ? '#c2b386' : d < 2.1 ? '#a4ad74' : '#8b9862';
};

const heightGeo = (fn: (x: number, z: number) => number, col: (x: number, z: number, y: number) => string, x0: number, x1: number, z0: number, z1: number, nx: number, nz: number, bot: number, soil: string[]) => {
  const pos: number[] = [], cl: number[] = []; const c = new THREE.Color();
  const tri = (a: V3, b: V3, d: V3, color: string) => { pos.push(...a, ...b, ...d); c.set(color); for (let k = 0; k < 3; k++) cl.push(c.r, c.g, c.b); };
  const P = (i: number, j: number): V3 => { const x = lerp(x0, x1, i / nx), z = lerp(z0, z1, j / nz); return [x, fn(x, z), z]; };
  for (let i = 0; i < nx; i++) for (let j = 0; j < nz; j++) {
    const a = P(i, j), b = P(i + 1, j), d = P(i, j + 1), e = P(i + 1, j + 1);
    const cx = (a[0] + e[0]) / 2, cz = (a[2] + e[2]) / 2; const co = col(cx, cz, (a[1] + b[1] + d[1] + e[1]) / 4);
    tri(a, d, b, co); tri(b, d, e, co);
  }
  // costados: capas de tierra
  const skirt = (pts: V3[], flip: boolean) => {
    for (let k = 0; k < pts.length - 1; k++) {
      const a = pts[k], b = pts[k + 1]; const top = Math.min(a[1], b[1]);
      const layers = [[bot, -0.3, soil[2]], [-0.3, -0.05, soil[1]], [-0.05, 10, soil[0]]] as [number, number, string][];
      for (const [y0, y1, sc] of layers) {
        const ya0 = Math.min(Math.max(y0, bot), a[1]), ya1 = Math.min(y1, a[1]), yb0 = Math.min(Math.max(y0, bot), b[1]), yb1 = Math.min(y1, b[1]);
        if (ya1 <= ya0 && yb1 <= yb0) continue;
        const A0: V3 = [a[0], ya0, a[2]], A1: V3 = [a[0], Math.max(ya0, ya1), a[2]], B0: V3 = [b[0], yb0, b[2]], B1: V3 = [b[0], Math.max(yb0, yb1), b[2]];
        if (flip) { tri(A0, B0, A1, sc); tri(B0, B1, A1, sc); } else { tri(A0, A1, B0, sc); tri(B0, A1, B1, sc); }
      }
      void top;
    }
  };
  const edge = (f: (k: number) => V3, n: number) => Array.from({ length: n + 1 }, (_, k) => f(k));
  skirt(edge((k) => P(k, nz), nx), false);           // frente (z = z1)
  skirt(edge((k) => P(k, 0), nx), true);             // fondo
  skirt(edge((k) => P(nx, k), nz), true);            // derecha
  skirt(edge((k) => P(0, k), nz), false);            // izquierda
  const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); g.setAttribute('color', new THREE.Float32BufferAttribute(cl, 3)); g.computeVertexNormals();
  return g;
};

/** Volumen de agua: superficie + paredes laterales solo donde el agua está por encima del suelo (corte de la maqueta). */
const WaterVol: React.FC<{ fn: (x: number, z: number) => number; lvl: number; x0: number; x1: number; z0: number; z1: number; n?: number; color?: string; o?: number }> = ({ fn, lvl, x0, x1, z0, z1, n = 64, color = WATER, o = 0.72 }) => {
  const geo = React.useMemo(() => {
    const pos: number[] = []; const q = 0.004;
    const wall = (f: (k: number) => [number, number], out: [number, number], flip: boolean) => {
      for (let k = 0; k < n; k++) {
        const [xa, za] = f(k / n), [xb, zb] = f((k + 1) / n); const ha = fn(xa, za), hb = fn(xb, zb);
        if (lvl <= ha && lvl <= hb) continue; const ta = Math.max(ha, lvl), tb = Math.max(hb, lvl);
        const A0: V3 = [xa + out[0], ha, za + out[1]], A1: V3 = [xa + out[0], ta, za + out[1]], B0: V3 = [xb + out[0], hb, zb + out[1]], B1: V3 = [xb + out[0], tb, zb + out[1]];
        if (flip) pos.push(...A0, ...B0, ...A1, ...B0, ...B1, ...A1); else pos.push(...A0, ...A1, ...B0, ...B0, ...A1, ...B1);
      }
    };
    wall((k) => [lerp(x0, x1, k), z1], [0, q], false);
    wall((k) => [lerp(x0, x1, k), z0], [0, -q], true);
    wall((k) => [x1, lerp(z0, z1, k)], [q, 0], true);
    wall((k) => [x0, lerp(z0, z1, k)], [-q, 0], false);
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); g.computeVertexNormals(); return g;
  }, [lvl.toFixed(4), x0, x1, z0, z1]);
  React.useEffect(() => () => geo.dispose(), [geo]);
  return (
    <group>
      <mesh position={[(x0 + x1) / 2, lvl, (z0 + z1) / 2]} rotation={[-Math.PI / 2, 0, 0]} renderOrder={2}>
        <planeGeometry args={[x1 - x0 + 0.008, z1 - z0 + 0.008]} />
        <meshStandardMaterial color={color} transparent opacity={o} roughness={0.25} metalness={0.1} depthWrite={false} side={THREE.DoubleSide} />
      </mesh>
      <mesh geometry={geo} renderOrder={2}><meshStandardMaterial color="#1d7f92" transparent opacity={o * 0.9} roughness={0.3} depthWrite={false} side={THREE.DoubleSide} /></mesh>
    </group>
  );
};

/* ---------- Piezas ---------- */
const winTex = (g: CanvasRenderingContext2D, W: number, H: number, cols: number, rows: number, seed: number) => {
  g.clearRect(0, 0, W, H); const r = rnd(seed); const cw = W / cols, rh = H / rows;
  for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) { g.fillStyle = r() > 0.72 ? '#ffcf7a' : '#2a4f66'; g.fillRect(x * cw + cw * 0.25, y * rh + rh * 0.25, cw * 0.5, rh * 0.45); }
};
const House: React.FC<{ w: number; h: number; d: number; c: string; seed: number; roof?: string; ghost?: number }> = ({ w, h, d, c, seed, roof, ghost }) => {
  const cols = Math.max(2, Math.round(w / 0.06)), rows = Math.max(1, Math.round(h / 0.08));
  const tx = useTex((g, W, H) => winTex(g, W, H, cols, rows, seed), 64, 128, `gvwin${cols}-${rows}-${seed}`);
  if (ghost !== undefined) return (
    <group>{ghost > 0.001 && <mesh position={[0, h / 2, 0]}><boxGeometry args={[w, h, d]} /><meshBasicMaterial color="#9fe8ff" wireframe transparent opacity={0.85 * ghost} toneMapped={false} /></mesh>}</group>
  );
  return (
    <group>
      <B s={[w, h, d]} pos={[0, h / 2, 0]} c={c} />
      {roof && <B s={[w + 0.01, 0.025, d + 0.01]} pos={[0, h + 0.012, 0]} c={roof} />}
      <mesh position={[0, h / 2, d / 2 + 0.002]}><planeGeometry args={[w * 0.92, h * 0.86]} /><meshBasicMaterial map={tx} transparent toneMapped={false} /></mesh>
      <mesh position={[w / 2 + 0.002, h / 2, 0]} rotation={[0, Math.PI / 2, 0]}><planeGeometry args={[d * 0.9, h * 0.86]} /><meshBasicMaterial map={tx} transparent toneMapped={false} /></mesh>
      <mesh position={[-w / 2 - 0.002, h / 2, 0]} rotation={[0, -Math.PI / 2, 0]}><planeGeometry args={[d * 0.9, h * 0.86]} /><meshBasicMaterial map={tx} transparent toneMapped={false} /></mesh>
    </group>
  );
};
const Palm: React.FC<{ h?: number; lean?: number; t: number; ph?: number }> = ({ h = 0.32, lean = 0.12, t, ph = 0 }) => {
  const sw = Math.sin(t * 1.6 + ph) * 0.04;
  return (
    <group rotation={[0, 0, lean + sw * 0.3]}>
      <Cyl r={0.014} r2={0.009} h={h} pos={[0, h / 2, 0]} c="#7d5c3c" seg={6} />
      <group position={[0, h, 0]}>
        {Array.from({ length: 6 }, (_, i) => (
          <group key={i} rotation={[0, (i / 6) * Math.PI * 2, 0]}><group rotation={[0, 0, 0.5 + sw]}>
            <B s={[0.16, 0.008, 0.04]} pos={[0.075, -0.02, 0]} rot={[0, 0, -0.35]} c={PALM} />
          </group></group>
        ))}
        <mesh><sphereGeometry args={[0.022, 6, 5]} /><M c="#5b4026" /></mesh>
      </group>
    </group>
  );
};
export const Crane: React.FC<{ c?: string }> = ({ c = '#e0663f' }) => (
  <group>
    {[[-0.07, -0.06], [0.07, -0.06], [-0.07, 0.06], [0.07, 0.06]].map(([x, z], i) => <B key={i} s={[0.018, 0.36, 0.018]} pos={[x, 0.18, z]} c={c} />)}
    <B s={[0.17, 0.03, 0.15]} pos={[0, 0.36, 0]} c={c} />
    <B s={[0.05, 0.03, 0.62]} pos={[0, 0.39, 0.14]} c={c} />
    <B s={[0.07, 0.05, 0.07]} pos={[0, 0.43, -0.1]} c="#f2efe8" />
  </group>
);
const Ship: React.FC = () => (
  <group>
    <B s={[0.9, 0.1, 0.22]} pos={[0, 0.0, 0]} c="#8e2f2a" />
    <B s={[0.88, 0.02, 0.2]} pos={[0, 0.06, 0]} c="#2b2f36" />
    <B s={[0.14, 0.16, 0.18]} pos={[0, 0.15, 0]} c="#f2efe8" />
    <B s={[0.1, 0.03, 0.12]} pos={[0, 0.245, 0]} c="#2b2f36" />
    {[-0.3, -0.16, 0.16, 0.3].map((x, i) => <B key={i} s={[0.12, 0.07, 0.17]} pos={[x, 0.105, 0]} c={['#2f6bb0', '#d1a531', '#3a9a6a', '#c0503a'][i]} />)}
  </group>
);
export const Plant: React.FC = () => (
  <group>
    <B s={[0.36, 0.16, 0.24]} pos={[0, 0.08, 0]} c="#c9ccd0" />
    <B s={[0.37, 0.02, 0.25]} pos={[0, 0.17, 0]} c="#6f7780" />
    {[-0.1, 0.08].map((x, i) => <group key={i} position={[x, 0, -0.03]}><Cyl r={0.035} r2={0.028} h={0.48} pos={[0, 0.24, 0]} c="#e8e8e8" /><Cyl r={0.029} h={0.06} pos={[0, 0.46, 0]} c="#d4473a" /></group>)}
  </group>
);
export const Tanks: React.FC = () => (
  <group>
    {[[-0.12, 0], [0.1, -0.04], [0, 0.14]].map(([x, z], i) => <group key={i} position={[x, 0, z]}>
      <Cyl r={0.085} h={0.07} pos={[0, 0.035, 0]} c="#b8bcc0" seg={14} />
      <mesh position={[0, 0.071, 0]} rotation={[-Math.PI / 2, 0, 0]}><circleGeometry args={[0.072, 14]} /><M c="#4d8a6a" /></mesh>
    </group>)}
  </group>
);
const MiniCar: React.FC<{ t: number; color?: string }> = ({ t, color = '#e8c547' }) => (
  <group>
    <B s={[0.085, 0.032, 0.18]} pos={[0, 0.03, 0]} c={color} />
    <B s={[0.075, 0.03, 0.09]} pos={[0, 0.06, -0.01]} c="#1b2a36" />
    {[[-0.045, 0.06], [0.045, 0.06], [-0.045, -0.06], [0.045, -0.06]].map(([x, z], i) => (
      <mesh key={i} position={[x, 0.016, z]} rotation={[t * 12, 0, Math.PI / 2]}><cylinderGeometry args={[0.016, 0.016, 0.012, 8]} /><M c="#0d0d10" /></mesh>))}
    <B s={[0.02, 0.01, 0.004]} pos={[-0.025, 0.035, 0.091]} c="#fff6c8" e="#fff6c8" ei={1.5} />
    <B s={[0.02, 0.01, 0.004]} pos={[0.025, 0.035, 0.091]} c="#fff6c8" e="#fff6c8" ei={1.5} />
  </group>
);
const Mark: React.FC<{ tt: number; kind: string; color?: string; size?: number }> = ({ tt, kind, color, size = 1 }) => {
  const k = pop(tt); if (k <= 0) return null; const c = color ?? (kind === 'ok' ? GREEN : RED);
  return (
    <group scale={k * size} rotation={[0, 0, 0]}>
      {kind === 'x' && <group><B s={[0.3, 0.06, 0.03]} rot={[0, 0, Math.PI / 4]} c={c} e={c} ei={0.9} /><B s={[0.3, 0.06, 0.03]} rot={[0, 0, -Math.PI / 4]} c={c} e={c} ei={0.9} /></group>}
      {kind === 'pin' && <group><mesh position={[0, 0.07, 0]} rotation={[Math.PI, 0, 0]}><coneGeometry args={[0.05, 0.12, 4]} /><M c={c} e={c} ei={0.8} /></mesh><mesh position={[0, 0.16, 0]}><sphereGeometry args={[0.045, 8, 6]} /><M c={c} e={c} ei={0.8} /></mesh></group>}
      {kind === 'ok' && <group><B s={[0.08, 0.035, 0.03]} pos={[-0.04, -0.015, 0]} rot={[0, 0, -Math.PI / 4]} c={c} e={c} ei={0.9} /><B s={[0.16, 0.035, 0.03]} pos={[0.03, 0.01, 0]} rot={[0, 0, Math.PI / 4]} c={c} e={c} ei={0.9} /></group>}
    </group>
  );
};

type Bld = { x: number; z: number; w: number; d: number; h: number; c: string; roof?: string; seed: number };
const BUILDINGS: Bld[] = (() => {
  const r = rnd(77); const out: Bld[] = [];
  const row = (dd: number, xa: number, xb: number, hmin: number, hmax: number, step: number) => {
    for (let x = xa; x < xb - 0.05; x += step) {
      const w = step * (0.62 + r() * 0.2), dep = 0.14 + r() * 0.06; const xx = x + step / 2 + (r() - 0.5) * 0.03;
      out.push({ x: xx, z: zc(xx) - dd, w, d: dep, h: hmin + r() * (hmax - hmin), c: STUCCO[Math.floor(r() * STUCCO.length)], roof: r() > 0.55 ? (r() > 0.5 ? '#c4673f' : '#b5553a') : undefined, seed: out.length + 3 });
    }
  };
  row(0.78, -0.3, 1.6, 0.07, 0.13, 0.24);
  row(1.55, -1.6, 1.6, 0.12, 0.3, 0.26);
  row(1.85, -1.6, 1.6, 0.14, 0.34, 0.3);
  row(2.45, -1.6, -0.5, 0.25, 0.5, 0.3);
  row(2.45, -0.5, 0.9, 0.4, 0.7, 0.28);
  row(2.45, 0.9, 1.6, 0.25, 0.45, 0.3);
  return out.filter((b) => b.z - b.d / 2 > Z0 + 0.02 && b.x - b.w / 2 > X0 + 0.02 && b.x + b.w / 2 < X1 - 0.02);
})();
const PALMS = [-0.15, 0.22, 0.92, 1.32];

/* ---------- La maqueta costera ---------- */
export const Coast: React.FC<P> = ({ t, p }) => {
  const lvl = curve(p.lv ?? [[0, 0]], t) + (p.wave ? Math.sin(t * 2.3) * p.wave : 0);
  const geo = React.useMemo(() => heightGeo(hCoast, colCoast, X0, X1, Z0, Z1, 72, 80, BOT, ['#8a6844', '#5f4532', '#3a2a22']), []);
  const bmode = p.buildings ?? 'on';
  const ghost = bmode === 'ghost' ? clamp((t - (p.ghostAt ?? 0)) / 0.5) : undefined;
  const levee = p.leveeAt !== undefined ? clamp((t - p.leveeAt) / 0.5) : 0;
  const car = p.car; const ckx = car ? lerp(car.x0, car.x1, eio((t - car.at) / car.dur)) : 0;
  const cnt = p.counter; const year = cnt ? Math.round(lerp(cnt.from, cnt.to, eo((t - (cnt.at ?? 0)) / cnt.dur))) : 0;
  const ctx = useTex((g, W, H) => {
    g.clearRect(0, 0, W, H); g.fillStyle = TEAL; g.textAlign = 'center'; g.textBaseline = 'middle'; g.font = `800 ${H * 0.7}px Poppins`; g.fillText(String(year), W / 2, H * 0.54);
  }, 512, 200, 'gvcnt' + year);
  const shipY = lvl - 0.02;
  return (
    <group>
      <B s={[X1 - X0 + 0.14, 0.07, Z1 - Z0 + 0.14]} pos={[0, BOT - 0.035, 0]} c="#0e1c24" />
      <mesh geometry={geo}><meshStandardMaterial vertexColors flatShading roughness={0.9} metalness={0.02} side={THREE.DoubleSide} /></mesh>
      {/* costanera */}
      <B s={[1.86, 0.008, 0.1]} pos={[0.65, hCoast(0.5, 0.25) + 0.004, 0.25]} c="#353a42" />
      {Array.from({ length: 9 }, (_, i) => <B key={i} s={[0.07, 0.009, 0.008]} pos={[-0.2 + i * 0.2, hCoast(0.5, 0.25) + 0.005, 0.25]} c="#e8e2c8" />)}
      {/* muelle */}
      <group>
        <B s={[0.16, 0.02, 1.1]} pos={[0.55, 0.1, 1.25]} c={WOOD} />
        <B s={[0.34, 0.02, 0.22]} pos={[0.55, 0.1, 1.86]} c={WOOD} />
        {Array.from({ length: 8 }, (_, i) => { const z = 0.82 + i * 0.15; const hb = hCoast(0.55, z); return [-1, 1].map((k) => <B key={i + '' + k} s={[0.018, 0.09 - hb, 0.018]} pos={[0.55 + k * 0.065, (0.09 + hb) / 2, z]} c="#6b4a2c" />); })}
      </group>
      {/* puerto */}
      {[-1.3, -0.72].map((x, i) => <group key={i} position={[x, hCoast(x, 0.48), 0.48]}><Crane /></group>)}
      {[[-1.48, 0.25], [-1.05, 0.2], [-0.55, 0.28], [-1.3, 0.02], [-0.85, 0.0]].map(([x, z], i) => <group key={i} position={[x, hCoast(x, z), z]}>
        <B s={[0.2, 0.07, 0.09]} pos={[0, 0.035, 0]} c={['#2f6bb0', '#d1a531', '#3a9a6a', '#c0503a', '#7a5bb0'][i]} />
        {i % 2 === 0 && <B s={[0.2, 0.07, 0.09]} pos={[0, 0.105, 0]} c={['#c0503a', '#2f6bb0', '#d1a531'][i / 2]} />}
      </group>)}
      {p.ship !== false && <group position={[-1.0, shipY, 0.86]}><Ship /></group>}
      {p.infra && <>
        <group position={[-1.22, hCoast(-1.22, -0.3), -0.3]}><Plant /></group>
        <group position={[-0.62, hCoast(-0.62, -0.32), -0.32]}><Tanks /></group>
      </>}
      {/* palmeras */}
      {PALMS.map((x, i) => <group key={i} position={[x, hCoast(x, 0.46), 0.46]}><Palm t={t} ph={i} lean={i % 2 ? -0.12 : 0.1} h={0.28 + (i % 3) * 0.04} /></group>)}
      {/* ciudad */}
      {bmode !== 'off' && BUILDINGS.map((b, i) => <group key={i} position={[b.x, hCoast(b.x, b.z + b.d / 2) - 0.01, b.z]}>
        <House w={b.w} h={b.h} d={b.d} c={b.c} roof={b.roof} seed={b.seed} ghost={ghost} />
      </group>)}
      {levee > 0.001 && <group position={[0.65, 0.21, 0.13]}>
        <mesh renderOrder={3}><boxGeometry args={[1.85, 0.22, 0.08]} /><meshBasicMaterial color="#ffc44d" transparent opacity={0.6 * levee} depthWrite={false} toneMapped={false} /></mesh>
        <mesh renderOrder={3}><boxGeometry args={[1.85, 0.22, 0.08]} /><meshBasicMaterial color="#fff0c8" wireframe transparent opacity={levee} toneMapped={false} /></mesh>
      </group>}
      {/* mareógrafo con contador */}
      {p.gauge !== false && <group position={[0.85, 0, 1.6]}>
        {Array.from({ length: 12 }, (_, i) => <Cyl key={i} r={0.022} h={0.1} pos={[0, -0.35 + i * 0.1, 0]} c={i % 2 ? '#d4473a' : '#efece4'} seg={8} />)}
        {cnt && <group position={[0, 0.95, 0]}>
          <B s={[0.5, 0.21, 0.04]} c={INK} />
          <B s={[0.54, 0.25, 0.02]} pos={[0, 0, -0.03]} c={TEAL} e={TEAL} ei={0.4} />
          <mesh position={[0, 0, 0.04]}><planeGeometry args={[0.48, 0.19]} /><meshBasicMaterial map={ctx} transparent toneMapped={false} /></mesh>
        </group>}
      </group>}
      {car && <group position={[ckx, hCoast(0.5, 0.25) + 0.008, 0.25]} rotation={[0, Math.PI / 2, 0]}><MiniCar t={t} /></group>}
      {(p.marks ?? []).map((m: any, i: number) => <group key={i} position={m.pos}><Mark tt={t - m.at} kind={m.kind} size={m.size} /></group>)}
      <WaterVol fn={hCoast} lvl={lvl} x0={X0} x1={X1} z0={Z0} z1={Z1} />
    </group>
  );
};

/* ---------- Tablero de 100 cuadros: cada cuadro = 1% de la ciudad (a escala) ---------- */
const TP = 0.285, TS = 0.25;
export const Tiles: React.FC<P> = ({ t, p }) => {
  const n = lerp(0, p.n ?? 0, eo((t - (p.at ?? 0)) / (p.dur ?? 1)));
  const r = React.useMemo(() => { const g = rnd(5); return Array.from({ length: 100 }, () => ({ h: 0.035 + g() * 0.09, w: 0.09 + g() * 0.07, c: STUCCO[Math.floor(g() * STUCCO.length)] })); }, []);
  const infra: number[] = p.infra ?? [];
  const waveA = p.storm ? 0.035 : 0.012;
  const pos = (i: number): [number, number] => { const row = Math.floor(i / 10), col = i % 10; return [(col - 4.5) * TP, (4.5 - row) * TP]; };
  return (
    <group>
      <B s={[2.95, 0.08, 2.95]} pos={[0, -0.04, 0]} c="#0e1c24" />
      {Array.from({ length: 100 }, (_, i) => {
        const [x, z] = pos(i); const f = clamp(n - i); const row = Math.floor(i / 10);
        return (
          <group key={i} position={[x, 0, z]}>
            <B s={[TS, 0.03, TS]} pos={[0, 0.015, 0]} c={row === 0 ? SAND : row < 4 ? '#c2b386' : '#a4ad74'} />
            {!infra.includes(i) && <B s={[r[i].w, r[i].h, r[i].w]} pos={[0, 0.03 + r[i].h / 2, -0.02]} c={r[i].c} />}
            {f > 0.001 && <mesh position={[0, 0.03 + 0.065, TS / 2 - (TS * f) / 2]} renderOrder={2}><boxGeometry args={[TS + 0.006, 0.13, TS * f + 0.006]} /><meshStandardMaterial color="#36c3d6" emissive="#0d5966" emissiveIntensity={0.6} transparent opacity={0.88} roughness={0.25} depthWrite={false} /></mesh>}
          </group>
        );
      })}
      {infra.map((i, k) => { const [x, z] = pos(i); return (
        <group key={'i' + i} position={[x, 0.03, z]} scale={0.55}>{k === 0 ? <Crane /> : k === 1 ? <Plant /> : <Tanks />}</group>); })}
      {(p.okAt !== undefined) && infra.map((i, k) => { const [x, z] = pos(i); return <group key={'ok' + i} position={[x, 0.42, z + 0.05]} rotation={[0, p.flip ? Math.PI : 0, 0]}><Mark tt={t - p.okAt - k * 0.15} kind="ok" size={0.9} /></group>; })}
      {/* mar al frente, con olas */}
      <mesh position={[0, 0.005, 1.72]} renderOrder={2}><boxGeometry args={[2.95, 0.17, 0.5]} /><meshStandardMaterial color={WATER} transparent opacity={0.8} roughness={0.25} depthWrite={false} /></mesh>
      {Array.from({ length: 3 }, (_, k) => { const ph = ((t * 0.35 + k / 3) % 1); return (
        <B key={k} s={[2.9, 0.02 + waveA * Math.sin(ph * Math.PI), 0.04]} pos={[0, 0.095 + waveA * Math.sin(ph * Math.PI) * 0.5, lerp(1.94, 1.5, ph)]} c="#bfeff0" o={0.75 * Math.sin(ph * Math.PI)} />); })}
    </group>
  );
};

/* ---------- Canales de la playa (plano 8) ---------- */
const CX0 = -1.5, CX1 = 1.5, CZ0 = -1.5, CZ1 = 1.6;
const inCanal = (x: number, z: number) => {
  const zs = [-0.75, 0.05]; const xs = [-0.55, 0.55]; const w = 0.09;
  const a = zs.some((c) => Math.abs(z - c) < w) && x > -1.5 && x < 1.5;
  const b = xs.some((c) => Math.abs(x - c) < w) && z > -1.5 && z < 0.5;
  return a || b;
};
export const hCanal = (x: number, z: number) => {
  const shore = 0.9; const d = shore - z;
  if (d < 0) { const e = -d; return e < 0.35 ? lerp(0.07, -0.1, e / 0.35) : lerp(-0.1, -0.35, ss(0.35, 0.7, e)); }
  if (inCanal(x, z)) return -0.16;
  return 0.07 + 0.015 * d;
};
const colCanal = (x: number, z: number, y: number) => (y < -0.12 ? SEAF : z > 0.62 ? SAND : '#c2b386');
export const Canals: React.FC<P> = ({ t, p }) => {
  const lvl = curve(p.lv ?? [[0, 0]], t);
  const geo = React.useMemo(() => heightGeo(hCanal, colCanal, CX0, CX1, CZ0, CZ1, 96, 96, BOT, ['#8a6844', '#5f4532', '#3a2a22']), []);
  const hl = p.hlAt !== undefined ? clamp((t - p.hlAt) / 0.4) : 0;
  const houses = React.useMemo(() => {
    const r = rnd(31); const out: Bld[] = [];
    const xsC = [-1.05, 0, 1.05], zsC = [-1.15, -0.35, 0.33];
    for (const cx of xsC) for (const cz of zsC) for (let k = 0; k < 3; k++) {
      const x = cx + (k - 1) * 0.28, z = cz + (r() - 0.5) * 0.05; if (Math.abs(x) > 1.38) continue;
      out.push({ x, z, w: 0.18, d: 0.17, h: 0.08 + r() * 0.1, c: STUCCO[Math.floor(r() * STUCCO.length)], roof: r() > 0.4 ? '#c4673f' : undefined, seed: 100 + out.length });
    }
    return out;
  }, []);
  const edges: [V3, V3][] = [];
  for (const z of [-0.75, 0.05]) for (const s of [-1, 1]) edges.push([[0, 0, z + s * 0.095], [2.96, 0.012, 0.012]]);
  for (const x of [-0.55, 0.55]) for (const s of [-1, 1]) edges.push([[x + s * 0.095, 0, -0.5], [0.012, 0.012, 2.0]]);
  return (
    <group>
      <B s={[CX1 - CX0 + 0.14, 0.07, CZ1 - CZ0 + 0.14]} pos={[0, BOT - 0.035, (CZ0 + CZ1) / 2]} c="#0e1c24" />
      <mesh geometry={geo}><meshStandardMaterial vertexColors flatShading roughness={0.9} side={THREE.DoubleSide} /></mesh>
      {houses.map((b, i) => <group key={i} position={[b.x, hCanal(b.x, b.z) - 0.005, b.z]}><House w={b.w} h={b.h} d={b.d} c={b.c} roof={b.roof} seed={b.seed} /></group>)}
      {[[-0.55, -0.35], [0.55, -0.35], [0, -0.75], [0, 0.05], [-1.05, 0.05], [1.05, -0.75]].map(([x, z], i) => {
        const along = Math.abs(x) === 0.55 && i < 2; return (
          <B key={i} s={along ? [0.24, 0.02, 0.1] : [0.1, 0.02, 0.24]} pos={[x, 0.12, z]} c="#e9e2d0" />);
      })}
      {[-1.1, -0.4, 0.4, 1.1].map((x, i) => <group key={i} position={[x, hCanal(x, 0.75), 0.75]}><Palm t={t} ph={i} lean={i % 2 ? -0.1 : 0.12} h={0.3} /></group>)}
      {hl > 0.001 && edges.map(([pp, s], i) => <mesh key={i} position={[pp[0], 0.115, pp[2]]}><boxGeometry args={s} /><meshBasicMaterial color={RED} transparent opacity={hl} toneMapped={false} /></mesh>)}
      <WaterVol fn={hCanal} lvl={lvl} x0={CX0} x1={CX1} z0={CZ0} z1={CZ1} n={96} />
    </group>
  );
};

/* ---------- Plano del estudio de 2013 (sobre atril) ---------- */
export const Study: React.FC<P> = ({ t, tt, p }) => {
  const hl = p.hlAt !== undefined ? clamp((t - p.hlAt) / 0.4) : 0;
  const tx = useTex((g, W, H) => {
    g.fillStyle = '#0f2c40'; g.fillRect(0, 0, W, H); g.strokeStyle = '#2a5876'; g.lineWidth = 2;
    for (let x = 0; x < W; x += 32) { g.beginPath(); g.moveTo(x, 0); g.lineTo(x, H); g.stroke(); }
    for (let y = 0; y < H; y += 32) { g.beginPath(); g.moveTo(0, y); g.lineTo(W, y); g.stroke(); }
    g.fillStyle = '#c9b98a'; g.fillRect(0, H * 0.78, W, H * 0.22);
    g.strokeStyle = '#ff5a4a'; g.lineWidth = 12; g.lineCap = 'round';
    [[0.18, 0.18], [0.52, 0.52]].forEach(([a]) => { g.beginPath(); g.moveTo(W * 0.06, H * (0.1 + a * 0.9)); g.lineTo(W * 0.94, H * (0.1 + a * 0.9)); g.stroke(); });
    [0.32, 0.68].forEach((a) => { g.beginPath(); g.moveTo(W * a, H * 0.08); g.lineTo(W * a, H * 0.62); g.stroke(); });
  }, 512, 360, 'gvstudy');
  return (
    <group>
      {[-1, 1].map((k) => <B key={k} s={[0.035, p.leg ?? 1.6, 0.035]} pos={[k * 0.45, -(p.leg ?? 1.6) / 2 + 0.1, -0.12]} rot={[-0.08, 0, 0]} c="#3b4650" />)}
      <B s={[1.12, 0.8, 0.04]} pos={[0, 0.3, 0]} c="#1b2b36" />
      <mesh position={[0, 0.3, 0.022]}><planeGeometry args={[1.04, 0.72]} /><meshBasicMaterial map={tx} toneMapped={false} transparent opacity={0.5 + 0.5 * hl} /></mesh>
      <group position={[0.36, 0.58, 0.044]}><B s={[0.34, 0.15, 0.02]} c="#f2efe8" /><group position={[0, 0, 0.03]}><Label t={t} tt={tt} p={{ text: '2013', w: 0.3, h: 0.13, color: '#0f2c40', size: 0.8, weight: 900, depth: 0 }} /></group></group>
    </group>
  );
};

/* ---------- Caja fuerte con los datos originales (plano 3) ---------- */
export const Safe: React.FC<P> = ({ t, tt, p }) => {
  const dial = Math.sin(t * 1.3) * 0.4;
  return (
    <group>
      <B s={[1.0, 1.2, 0.7]} pos={[0, 0.6, 0]} c={STEEL} />
      <B s={[0.86, 1.06, 0.03]} pos={[0, 0.6, 0.365]} c="#6c7882" />
      <group position={[0.12, 0.62, 0.39]} rotation={[0, 0, dial]}>
        <Cyl r={0.15} h={0.04} rot={[Math.PI / 2, 0, 0]} c="#c9ced3" seg={16} />
        <B s={[0.02, 0.1, 0.02]} pos={[0, 0.08, 0.025]} c="#2b2f36" />
      </group>
      <B s={[0.06, 0.3, 0.05]} pos={[-0.25, 0.62, 0.4]} c="#c9ced3" />
      <group position={[0, 1.02, 0.38]}><Sign t={t} tt={tt} p={{ text: 'DATOS ORIGINALES', w: 0.8, h: 0.15, bg: INK, color: '#f2efe8', size: 0.6, depth: 0.02 }} /></group>
      {[-0.4, 0.4].map((x, i) => <B key={i} s={[0.1, 0.06, 0.6]} pos={[x, 0.03, 0]} c="#3b4650" />)}
    </group>
  );
};

/* ---------- Mesa, notebook y pedestal ---------- */
export const Table: React.FC<P> = ({ p }) => {
  const { w = 1, d = 0.6, h = 0.85, c = '#24343e' } = p;
  return (
    <group>
      <B s={[w, 0.05, d]} pos={[0, h - 0.025, 0]} c={c} />
      {[[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([a, b], i) => <B key={i} s={[0.05, h - 0.05, 0.05]} pos={[a * (w / 2 - 0.06), (h - 0.05) / 2, b * (d / 2 - 0.06)]} c="#3b4650" />)}
    </group>
  );
};
export const Notebook: React.FC<P> = ({ t }) => {
  const tx = useTex((g, W, H) => { g.fillStyle = '#0d1a22'; g.fillRect(0, 0, W, H); }, 64, 64, 'gvnb');
  return (
    <group>
      <B s={[0.42, 0.02, 0.28]} pos={[0, 0.01, 0]} c="#9aa3ab" />
      <group position={[0, 0.02, -0.14]} rotation={[-0.25, 0, 0]}>
        <B s={[0.42, 0.28, 0.015]} pos={[0, 0.14, 0]} c="#9aa3ab" />
        <mesh position={[0, 0.14, 0.009]}><planeGeometry args={[0.38, 0.24]} /><meshBasicMaterial map={tx} toneMapped={false} /></mesh>
      </group>
      <mesh position={[0, 0.021, 0.05]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[0.36, 0.12]} /><meshBasicMaterial color={Math.sin(t * 9) > 0 ? '#3b4650' : '#47535e'} toneMapped={false} /></mesh>
    </group>
  );
};
export const Pedestal: React.FC<P> = ({ p }) => {
  const { w = 1.5, d = 1.8, h = 0.5, rim = TEAL } = p;
  return (
    <group>
      <B s={[w, h, d]} pos={[0, h / 2, 0]} c="#16252e" />
      <B s={[w + 0.02, 0.04, d + 0.02]} pos={[0, h - 0.06, 0]} c={rim} e={rim} ei={0.6} />
    </group>
  );
};

/** Copia del muñeco del kit SIN la geometría de los ojos (el guion pide personas sin cara). */
export const Faceless: React.FC<P> = ({ t, p }) => {
  const { shirt = '#27e0d8', pants = '#2a2350', skin = '#f2c39b', hair = '#3a2a1a', pose = 'idle', cap, phase = 0 } = p;
  const w = Math.sin((t + phase) * 9);
  const sway = Math.sin((t + phase) * 2.2);
  const sit = pose === 'sit' || pose === 'sitType';
  const legRot = (side: number) => (sit ? -1.5 : pose === 'walk' ? w * 0.6 * side : 0);
  let aL: V3 = [0, 0, -0.1 - sway * 0.03], aR: V3 = [0, 0, 0.1 + sway * 0.03];
  if (pose === 'walk') { aL = [-w * 0.5, 0, -0.1]; aR = [w * 0.5, 0, 0.1]; }
  if (pose === 'point') aR = [-1.45 + sway * 0.04, 0, 0.15];
  if (pose === 'cheer') { aL = [0, 0, -2.6 - w * 0.15]; aR = [0, 0, 2.6 + w * 0.15]; }
  if (pose === 'type' || pose === 'sitType') { aL = [-1.1 + w * 0.07, 0, -0.15]; aR = [-1.1 - w * 0.07, 0, 0.15]; }
  if (pose === 'hold') { aL = [-1.0, 0, -0.25]; aR = [-1.0, 0, 0.25]; }
  if (pose === 'sad') { aL = [0.1, 0, -0.05]; aR = [0.1, 0, 0.05]; }
  if (pose === 'shrug') { aL = [0, 0, -1.2 - sway * 0.1]; aR = [0, 0, 1.2 + sway * 0.1]; }
  const y0 = (sit ? -0.3 : 0) + (pose === 'cheer' ? Math.abs(Math.sin((t + phase) * 7)) * 0.12 : sway * 0.012);
  return (
    <group position={[0, y0, 0]}>
      {[-1, 1].map((sd) => (
        <group key={sd} position={[0.12 * sd, 0.7, 0]} rotation={[legRot(sd), 0, 0]}>
          <B s={[0.17, 0.7, 0.19]} pos={[0, -0.35, 0]} c={pants} />
          <B s={[0.18, 0.09, 0.26]} pos={[0, -0.68, 0.04]} c="#15102b" />
        </group>
      ))}
      <group rotation={[pose === 'sad' ? 0.25 : 0, 0, sway * 0.015]} position={[0, 0.7, 0]}>
        <B s={[0.52, 0.62, 0.29]} pos={[0, 0.32, 0]} c={shirt} />
        <group position={[-0.33, 0.58, 0]} rotation={aL}><B s={[0.13, 0.5, 0.14]} pos={[0, -0.22, 0]} c={shirt} /><B s={[0.12, 0.12, 0.13]} pos={[0, -0.52, 0]} c={skin} /></group>
        <group position={[0.33, 0.58, 0]} rotation={aR}><B s={[0.13, 0.5, 0.14]} pos={[0, -0.22, 0]} c={shirt} /><B s={[0.12, 0.12, 0.13]} pos={[0, -0.52, 0]} c={skin} /></group>
        <group position={[0, 0.84, 0]} rotation={[pose === 'sad' ? 0.3 : 0, sway * 0.05, 0]}>
          <B s={[0.37, 0.36, 0.34]} c={skin} />
          <B s={[0.39, 0.13, 0.36]} pos={[0, 0.2, -0.005]} c={cap ?? hair} />
          {cap && <B s={[0.39, 0.04, 0.2]} pos={[0, 0.15, 0.24]} c={cap} />}
        </group>
      </group>
    </group>
  );
};

export const EXTRA = { faceless: Faceless, world: World, coast: Coast, tiles: Tiles, canals: Canals, study: Study, safe: Safe, table: Table, notebook: Notebook, pedestal: Pedestal, sign: Sign };
