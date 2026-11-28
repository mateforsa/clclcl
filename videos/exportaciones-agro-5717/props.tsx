import React, { useMemo } from 'react';
import { M, Label, useTex } from '../../src/kit/Props';
import { clamp, eio, eo, lerp, pop, rnd } from '../../src/kit/math';

// Look propio de este video ("Argentina productiva", paleta distinta de cosecha-record-171, que era violeta y maíz dorado):
// un muelle de puerto al amanecer. Cielo azul marino casi negro arriba (ahí van los subtítulos) y una franja naranja coral
// solo en el horizonte, agua verde petróleo, muelle de hormigón gris pizarra. Acentos: naranja contenedor, verde agua,
// crema y trigo. Todo genérico: barcos, cajas, bolsas y contenedores sin nombre ni logo.
type P = { t: number; tt: number; p: any };
type V3 = [number, number, number];
const PI = Math.PI;

export const NAR = '#ff7a3d', TEAL = '#25b3a1', CREMA = '#f2e6c8', CORAL = '#e2533f', TRIGO = '#e0ad55', INK = '#0b1220',
  HORM = '#3a4350', HORM2 = '#2c333d', MAR = '#0f3b45', ACERO = '#6c7884', AZUL = '#2f6bb0';

const B: React.FC<{ s: V3; pos?: V3; rot?: V3; c: string; e?: string; ei?: number; o?: number }> = ({ s, pos, rot, c, e, ei, o }) => (
  <mesh position={pos} rotation={rot}><boxGeometry args={s} /><M c={c} e={e} ei={ei} o={o} /></mesh>
);
const Cyl: React.FC<{ r: number; r2?: number; h: number; pos?: V3; rot?: V3; seg?: number; c: string; e?: string; ei?: number; o?: number }> = ({ r, r2, h, pos, rot, seg = 10, c, e, ei, o }) => (
  <mesh position={pos} rotation={rot}><cylinderGeometry args={[r2 ?? r, r, h, seg]} /><M c={c} e={e} ei={ei} o={o} /></mesh>
);
const Ball: React.FC<{ r: number; pos?: V3; sc?: V3; c: string; e?: string; ei?: number; d?: number }> = ({ r, pos, sc, c, e, ei, d = 0 }) => (
  <mesh position={pos} scale={sc}><icosahedronGeometry args={[r, d]} /><M c={c} e={e} ei={ei} /></mesh>
);
/** curva por tramos [[t, v], ...] con easing: continua, sin saltos */
export const curve = (kf: [number, number][], t: number) => {
  if (!kf || !kf.length) return 0; if (t <= kf[0][0]) return kf[0][1];
  for (let i = 1; i < kf.length; i++) if (t < kf[i][0]) { const [t0, v0] = kf[i - 1], [t1, v1] = kf[i]; return lerp(v0, v1, eio((t - t0) / (t1 - t0))); }
  return kf[kf.length - 1][1];
};
const anim = (t: number, from: number, to: number, at = 0, dur = 0.8) => lerp(from, to, eio((t - at) / dur));

/* ---------- Cartel 3D: el texto va 2 cm delante del panel ---------- */
export const Sign: React.FC<P> = ({ t, tt, p }) => {
  const { w = 1, h = 0.3, bg = INK, color = '#fff', size = 0.62, weight = 900, depth = 0.04, text = '' } = p;
  return (
    <group>
      <B s={[w, h, depth]} c={bg} />
      <group position={[0, 0, depth / 2 + 0.02]}><Label t={t} tt={tt} p={{ text, w: w * 0.96, h: h * 0.9, color, size, weight, depth: 0 }} /></group>
    </group>
  );
};

/* ---------- Mundo: amanecer en el puerto (tapa el set 'room') ---------- */
export const World: React.FC<P> = ({ t, p }) => {
  const { water = true, cranes = true } = p;
  const sky = useTex((g, W, H) => {
    const gr = g.createLinearGradient(0, 0, 0, H);
    gr.addColorStop(0, '#04070f'); gr.addColorStop(0.5, '#08101f'); gr.addColorStop(0.64, '#121b33'); gr.addColorStop(0.72, '#2a2a44');
    gr.addColorStop(0.78, '#7a3b3a'); gr.addColorStop(0.82, '#c2603f'); gr.addColorStop(0.85, '#7a3b3a'); gr.addColorStop(1, '#1a1d2b');
    g.fillStyle = gr; g.fillRect(0, 0, W, H);
    // costa lejana muy oscura sobre el horizonte
    g.fillStyle = '#141826'; g.beginPath(); g.moveTo(0, H);
    for (let x = 0; x <= W; x += 8) g.lineTo(x, H * 0.835 - Math.sin(x / 41) * 6 - Math.sin(x / 17) * 3); g.lineTo(W, H); g.fill();
  }, 512, 1024, 'exsky3');
  const waves = useMemo(() => { const r = rnd(5); return Array.from({ length: 14 }, () => [r() * 9 - 4.5, -1.6 - r() * 1.9, 0.3 + r() * 0.5]); }, []);
  return (
    <group>
      <mesh position={[0, 4.5, -3.7]}><planeGeometry args={[9.6, 12]} /><meshBasicMaterial map={sky} toneMapped={false} /></mesh>
      {[-1, 1].map((k) => <mesh key={k} position={[k * 4.3, 4.5, 4]} rotation={[0, -k * PI / 2, 0]}><planeGeometry args={[16, 12]} /><meshBasicMaterial map={sky} toneMapped={false} /></mesh>)}
      <mesh rotation={[-PI / 2, 0, 0]} position={[0, 0.01, 4]}><planeGeometry args={[40, 40]} /><M c={HORM2} /></mesh>
      {water && <group>
        <B s={[9.4, 0.03, 2.4]} pos={[0, 0.02, -2.5]} c={MAR} />
        {waves.map(([x, z, w], i) => <B key={i} s={[w, 0.01, 0.03]} pos={[((x + t * 0.25 + 4.5) % 9) - 4.5, 0.04, z]} c="#2f7f86" e="#1d5d66" ei={0.5} />)}
        <B s={[9.4, 0.16, 0.12]} pos={[0, 0.08, -1.28]} c="#4b5562" />
        {[-3.4, -1.7, 0, 1.7, 3.4].map((x) => <Cyl key={x} r={0.06} h={0.18} pos={[x, 0.2, -1.2]} c="#20262e" />)}
      </group>}
      {cranes && [-2.9, 2.9].map((x) => <group key={x} position={[x, 0, -3.2]} scale={0.9}><Grua t={t} tt={0} p={{ c: '#3d4656' }} /></group>)}
      <hemisphereLight args={['#ffd2b0', '#1a2230', 0.5]} />
      <directionalLight position={[-4, 3, 2]} intensity={0.7} color="#ffb48a" />
    </group>
  );
};

/* ---------- Grúa pórtico de muelle genérica. p: c, trolley (kf z), cable (kf), box (color del contenedor colgado) ---------- */
export const Grua: React.FC<P> = ({ t, p }) => {
  const { c = NAR, trolley, cable, box } = p;
  const tz = trolley ? curve(trolley, t) : 0.2; const cl = cable ? curve(cable, t) : 0.5;
  return (
    <group>
      {[[-0.45, -0.35], [0.45, -0.35], [-0.45, 0.35], [0.45, 0.35]].map(([x, z], i) => <B key={i} s={[0.08, 1.9, 0.08]} pos={[x, 0.95, z]} c={c} />)}
      <B s={[1.0, 0.1, 0.1]} pos={[0, 0.5, -0.35]} c={c} /><B s={[1.0, 0.1, 0.1]} pos={[0, 0.5, 0.35]} c={c} />
      <B s={[1.04, 0.16, 0.86]} pos={[0, 1.95, 0]} c={c} />
      {/* pluma hacia -z (sobre el agua) y contrapluma hacia +z */}
      <B s={[0.5, 0.1, 2.6]} pos={[0, 2.0, -0.85]} c={c} />
      <B s={[0.36, 0.3, 0.36]} pos={[0, 2.22, 0.25]} c="#e9e3d6" />
      <B s={[0.03, 0.42, 0.03]} pos={[0.2, 2.25, -1.9]} rot={[0.5, 0, 0]} c={c} />
      {trolley && <group position={[0, 1.92, tz]}>
        <B s={[0.3, 0.08, 0.22]} c="#20262e" />
        <B s={[0.02, cl, 0.02]} pos={[-0.08, -cl / 2, 0]} c="#20262e" /><B s={[0.02, cl, 0.02]} pos={[0.08, -cl / 2, 0]} c="#20262e" />
        {box && <B s={[0.3, 0.2, 0.62]} pos={[0, -cl - 0.1, 0]} c={box} />}
      </group>}
    </group>
  );
};

/* ---------- Contenedor genérico (sin marca) ---------- */
const Cont: React.FC<{ pos?: V3; c: string; l?: number }> = ({ pos, c, l = 0.62 }) => (
  <group position={pos}>
    <B s={[0.3, 0.2, l]} c={c} />
    {[-0.2, 0, 0.2].map((z) => <B key={z} s={[0.31, 0.16, 0.012]} pos={[0, 0, z * l]} c="#1c222b" />)}
  </group>
);

/* ---------- Barco portacontenedores genérico, proa a +x. p: len, n (contenedores), loadAt, step, hull ---------- */
export const Barco: React.FC<P> = ({ t, p }) => {
  const { len = 3.0, hull = '#1d4e5c', loadAt, step = 0.12, n = 12, pre = 0, grain, grainAt, grainDur = 1.2 } = p;
  const cols = [NAR, CREMA, TEAL, CORAL, AZUL, '#d9a032'];
  const slots = useMemo(() => { const out: [number, number, number][] = []; const nx = 6;
    for (let i = 0; i < n; i++) { const layer = Math.floor(i / (nx * 2)); const j = i % (nx * 2); out.push([-len / 2 + 0.75 + (j % nx) * 0.34, 0.6 + layer * 0.2, j < nx ? -0.17 : 0.17]); }
    return out; }, [n, len]);
  const gk = grain ? eo((t - (grainAt ?? 0)) / grainDur) : 0;
  return (
    <group rotation={[Math.sin(t * 1.3) * 0.012, 0, 0]}>
      <B s={[len, 0.46, 0.72]} pos={[0, 0.23, 0]} c={hull} />
      <mesh position={[len / 2 + 0.2, 0.23, 0]} rotation={[0, 0, -PI / 2]} scale={[0.66, 1, 1]}><cylinderGeometry args={[0, 0.36, 0.4, 4]} /><M c={hull} /></mesh>
      <B s={[len, 0.04, 0.74]} pos={[0, 0.46, 0]} c="#c2503f" />
      <B s={[0.42, 0.62, 0.6]} pos={[-len / 2 + 0.25, 0.78, 0]} c="#e9e3d6" />
      <B s={[0.03, 0.08, 0.5]} pos={[-len / 2 + 0.47, 0.95, 0]} c="#ffd9a0" e="#ffb06a" ei={0.8} />
      <Cyl r={0.06} h={0.3} pos={[-len / 2 + 0.2, 1.22, 0]} c={NAR} />
      {grain ? [0, 1, 2].map((i) => <group key={i} position={[-len / 2 + 1.0 + i * 0.7, 0.48, 0]}>
          <B s={[0.56, 0.04, 0.58]} c="#20262e" />
          {gk > 0.01 && <mesh position={[0, 0.02 + 0.12 * gk, 0]} scale={[1, gk, 1]}><coneGeometry args={[0.3, 0.24, 7]} /><M c={grain} e={grain} ei={0.25} /></mesh>}
        </group>)
        : slots.map((q, i) => { const k = loadAt === undefined ? (i < pre ? 1 : 0) : (i < pre ? 1 : pop(t - loadAt - (i - pre) * step));
          return k > 0 ? <group key={i} scale={k}><Cont pos={q} c={cols[(i * 7) % cols.length]} /></group> : null; })}
    </group>
  );
};

/* ---------- Balanza de dos platos (los platos se apoyan sobre postes, siempre horizontales). p: kf (ángulo), left, right ---------- */
export const Balanza: React.FC<P> = ({ t, tt, p }) => {
  const { kf = [[0, 0]], left, right, L = 1.1, col = '#c9cfd6' } = p;
  const a = curve(kf, t); const y0 = 1.2;
  const end = (s: number): V3 => [s * L * Math.cos(a), y0 + s * L * Math.sin(a), 0];
  const item = (it: any, s: number) => {
    if (!it) return null; const [x, y] = end(s); const k = it.at === undefined ? 1 : eo((t - it.at) / 0.35);
    if (it.at !== undefined && t < it.at) return null; const lift = (1 - k) * 1.4;
    if (it.out !== undefined && t >= it.out) return null;
    return <group position={[x + (it.dx ?? 0), y + 0.33 + lift, 0]}><Item t={t} tt={tt} p={it} /></group>;
  };
  return (
    <group>
      <Cyl r={0.42} r2={0.34} h={0.12} pos={[0, 0.06, 0]} seg={12} c={HORM} />
      <Cyl r={0.07} h={y0} pos={[0, y0 / 2 + 0.06, 0]} c={col} />
      <group position={[0, y0, 0]} rotation={[0, 0, a]}>
        <B s={[L * 2 + 0.12, 0.09, 0.12]} c={col} />
        <B s={[0.04, 0.5, 0.04]} pos={[0, 0.27, 0.07]} c={NAR} e={NAR} ei={0.6} />
      </group>
      <Ball r={0.1} pos={[0, y0, 0]} c="#e9e3d6" d={1} />
      {[-1, 1].map((s) => { const [x, y] = end(s); return (
        <group key={s} position={[x, y, 0]}>
          <B s={[0.05, 0.3, 0.05]} pos={[0, 0.15, 0]} c={col} />
          <Cyl r={0.42} r2={0.46} h={0.05} pos={[0, 0.32, 0]} seg={16} c="#e1e5ea" />
        </group>); })}
      {item(left, -1)}{item(right, 1)}
    </group>
  );
};

/** Lo que va arriba de un plato */
const Item: React.FC<P> = ({ t, tt, p }) => {
  if (p.kind === 'carne') return <Carne t={t} tt={tt} p={{}} />;
  if (p.kind === 'frasco') return <Frasco t={t} tt={tt} p={{}} />;
  if (p.kind === 'lana') return <Lana t={t} tt={tt} p={{}} />;
  return null;
};

/* ---------- Caja de carne: cartón con un bife arriba ---------- */
export const Carne: React.FC<P> = () => (
  <group>
    <B s={[0.62, 0.34, 0.46]} pos={[0, 0.17, 0]} c="#b98a52" />
    <B s={[0.63, 0.05, 0.47]} pos={[0, 0.25, 0]} c="#8f6a3c" />
    <group position={[0, 0.37, 0]}>
      <mesh scale={[1.25, 0.28, 0.85]}><icosahedronGeometry args={[0.2, 1]} /><M c="#f2e4d8" /></mesh>
      <mesh position={[0.02, 0.012, 0]} scale={[1.05, 0.3, 0.68]}><icosahedronGeometry args={[0.2, 1]} /><M c="#b8323a" /></mesh>
    </group>
  </group>
);

/* ---------- Frasco de aceite esencial (vidrio ámbar, tapa verde) ---------- */
export const Frasco: React.FC<P> = ({ t, p }) => {
  const { s = 1 } = p; const gl = 0.55 + Math.sin(t * 3) * 0.1;
  return (
    <group scale={s}>
      <Cyl r={0.15} h={0.4} pos={[0, 0.2, 0]} seg={12} c="#f5b82e" e="#e08a12" ei={gl} />
      <Cyl r={0.15} r2={0.07} h={0.1} pos={[0, 0.45, 0]} seg={12} c="#f5b82e" e="#e08a12" ei={gl} />
      <Cyl r={0.07} h={0.1} pos={[0, 0.54, 0]} seg={10} c="#2f7d4a" />
      <B s={[0.2, 0.16, 0.02]} pos={[0, 0.2, 0.15]} c={CREMA} />
      <Ball r={0.045} pos={[0, 0.2, 0.17]} sc={[1, 1, 0.4]} c="#ffd23f" />
    </group>
  );
};

/* ---------- Cítrico: naranja, limón o pomelo genérico ---------- */
export const Citrico: React.FC<P> = ({ t, p }) => {
  const { c = '#ff9a2e', r = 0.18, sc = [1, 1, 1] } = p;
  return (
    <group rotation={[0, t * 0.4, 0]}>
      <mesh scale={sc}><icosahedronGeometry args={[r, 1]} /><M c={c} e={c} ei={0.25} /></mesh>
      <B s={[0.1, 0.02, 0.05]} pos={[0.03, r * sc[1] + 0.01, 0]} rot={[0, 0, 0.4]} c="#3f9a52" />
    </group>
  );
};

/* ---------- Fardo de lana ---------- */
export const Lana: React.FC<P> = () => {
  const bumps = useMemo(() => { const r = rnd(8); return Array.from({ length: 16 }, () => [(r() - 0.5) * 0.56, 0.06 + r() * 0.3, (r() - 0.5) * 0.4, 0.06 + r() * 0.04]); }, []);
  return (
    <group>
      <B s={[0.62, 0.42, 0.46]} pos={[0, 0.21, 0]} c="#ece3cf" />
      {bumps.map(([x, y, z, r], i) => <Ball key={i} r={r} pos={[x, y + (i % 2 ? 0.0 : 0.13), i % 2 ? 0.23 : z]} c="#f7f1e3" />)}
      {[-0.17, 0.17].map((x) => <B key={x} s={[0.04, 0.44, 0.48]} pos={[x, 0.21, 0]} c="#8a6a45" />)}
    </group>
  );
};

/* ---------- Fajo de billetes genéricos (US$), alto de h0 a h1 ---------- */
export const Fajo: React.FC<P> = ({ t, tt, p }) => {
  const { h0 = 0.4, h1, at = 0, dur = 1.0, w = 0.9 } = p; const h = h1 === undefined ? h0 : anim(t, h0, h1, at, dur);
  const n = Math.max(1, Math.round(h / 0.1)); const lh = h / n;
  return (
    <group>
      {Array.from({ length: n }, (_, i) => (
        <group key={i} position={[Math.sin(i * 2.1) * 0.02, lh * i + lh / 2, Math.cos(i * 1.3) * 0.02]} rotation={[0, Math.sin(i * 1.7) * 0.05, 0]}>
          <B s={[w, lh * 0.9, w * 0.46]} c="#2e9e5b" e="#2e9e5b" ei={0.3} />
          <B s={[w * 0.3, lh * 0.92, w * 0.47]} c="#bff0cf" />
        </group>))}
      <group position={[0, h + 0.012, 0]} rotation={[-PI / 2, 0, 0]}>
        <B s={[w, w * 0.46, 0.005]} c="#2e9e5b" />
        <group position={[0, 0, 0.02]}><Label t={t} tt={tt} p={{ text: 'US$', w: w * 0.6, h: w * 0.3, size: 0.8, weight: 900, color: '#14532d', depth: 0 }} /></group>
      </group>
    </group>
  );
};

/* ---------- Pila de granos (cono low-poly), alto h0 -> h1 ---------- */
export const Pila: React.FC<P> = ({ t, p }) => {
  const { h0 = 1, h1, at = 0, dur = 1.0, color = TRIGO, ratio = 1.5, seed = 3 } = p;
  const h = Math.max(0.001, h1 === undefined ? h0 : anim(t, h0, h1, at, dur)); const r = h * ratio;
  const bumps = useMemo(() => { const q = rnd(seed); return Array.from({ length: 14 }, () => [q() * PI * 2, 0.25 + q() * 0.6, 0.6 + q() * 0.5]); }, [seed]);
  return (
    <group>
      <mesh position={[0, h / 2, 0]}><coneGeometry args={[r, h, 9, 2]} /><M c={color} e={color} ei={0.15} /></mesh>
      {bumps.map(([a, u, s], i) => { const y = h * u; const rr = r * (1 - u) * 0.98;
        return <mesh key={i} position={[Math.cos(a) * rr, y, Math.sin(a) * rr]} scale={s * h * 0.12}><icosahedronGeometry args={[1, 0]} /><M c={color} e={color} ei={0.1} /></mesh>; })}
    </group>
  );
};

/* ---------- Par de barras a escala: antes (gris) y ahora (= antes x ratio). p: h, ratio, c, at, cap ---------- */
export const Par: React.FC<P> = ({ t, tt, p }) => {
  const { h = 1.0, ratio = 1.23, c = TEAL, at = 0, dur = 0.8, cap = '', w = 0.42 } = p;
  const g = eo((t - at) / dur); const h2 = Math.max(0.001, h * ratio * g);
  return (
    <group>
      <B s={[1.25, 0.16, 0.7]} pos={[0, 0.08, 0]} c={HORM} />
      <group position={[0, 0.08, 0.37]}><Label t={t} tt={tt} p={{ text: cap, w: 1.15, h: 0.13, color: '#fff', size: 0.86, weight: 900, depth: 0 }} /></group>
      <B s={[w, h, w]} pos={[-0.27, 0.16 + h / 2, 0]} c="#7d8794" />
      {g > 0 && <B s={[w, h2, w]} pos={[0.27, 0.16 + h2 / 2, 0]} c={c} e={c} ei={0.35} />}
    </group>
  );
};

/* ---------- 21 cajas (una por complejo) que entran de a una; en `lit` se les prende la tapa ---------- */
export const Cajas: React.FC<P> = ({ t, p }) => {
  const { n = 21, cols = 7, at = 0, step = 0.05, lit, litStep = 0.04, s = 0.3, gap = 0.1 } = p;
  const pal = [TRIGO, TEAL, NAR, CREMA, CORAL, '#8fc46a', AZUL];
  const rows = Math.ceil(n / cols); const W = cols * s + (cols - 1) * gap;
  return (
    <group>
      <B s={[W + 0.2, 0.08, rows * (s + gap) + 0.1]} pos={[0, 0.04, 0]} c="#6b4f33" />
      {Array.from({ length: n }, (_, i) => { const cx = i % cols, rz = Math.floor(i / cols); const k = pop(t - at - i * step); if (k <= 0) return null;
        const x = -W / 2 + s / 2 + cx * (s + gap); const z = -((rows - 1) * (s + gap)) / 2 + rz * (s + gap); const c = pal[(i * 3) % pal.length];
        const on = lit !== undefined ? pop(t - lit - i * litStep) : 0;
        return (
          <group key={i} position={[x, 0.08, z]} scale={k}>
            <B s={[s, s, s]} pos={[0, s / 2, 0]} c={c} />
            {on > 0 && <group position={[0, s + 0.02, 0]} scale={on}><B s={[s * 0.8, 0.04, s * 0.8]} c="#ffd23f" e="#ffb52e" ei={1.0} /></group>}
          </group>);
      })}
    </group>
  );
};

/* ---------- Cinta transportadora del puerto. p: len, speed ---------- */
export const Cinta: React.FC<P> = ({ t, p }) => {
  const { len = 7, speed = 0.33, h = 0.55 } = p; const sp = 0.4; const off = (t * speed) % sp;
  return (
    <group>
      <B s={[len, 0.06, 0.8]} pos={[0, h, 0]} c="#1c222b" />
      {Array.from({ length: Math.ceil(len / sp) + 1 }, (_, i) => { const x = -len / 2 + i * sp + off; if (x > len / 2) return null;
        return <B key={i} s={[0.03, 0.012, 0.78]} pos={[x, h + 0.035, 0]} c="#4b5562" />; })}
      {[-1, 1].map((z) => <B key={z} s={[len, 0.1, 0.05]} pos={[0, h + 0.03, z * 0.42]} c={NAR} />)}
      {Array.from({ length: Math.floor(len / 1.2) + 1 }, (_, i) => <group key={i}>
        {[-0.36, 0.36].map((z) => <B key={z} s={[0.06, h, 0.06]} pos={[-len / 2 + 0.2 + i * 1.2, h / 2, z]} c={ACERO} />)}</group>)}
    </group>
  );
};

/* ---------- Bolsa (saco) genérica. p: c, band, mark ('trigo' | 'pellet' | none) ---------- */
export const Bolsa: React.FC<P> = ({ p }) => {
  const { c = '#d8c39a', band = '#8a6a45', mark } = p;
  return (
    <group>
      <mesh position={[0, 0.3, 0]} scale={[0.5, 0.6, 0.34]}><icosahedronGeometry args={[0.62, 1]} /><M c={c} /></mesh>
      <B s={[0.5, 0.42, 0.32]} pos={[0, 0.27, 0]} c={c} />
      <B s={[0.3, 0.08, 0.2]} pos={[0, 0.62, 0]} c={band} />
      <B s={[0.51, 0.05, 0.33]} pos={[0, 0.12, 0]} c={band} />
      {mark === 'trigo' && <group position={[0, 0.3, 0.17]}>
        <B s={[0.015, 0.22, 0.01]} c="#8a6a45" />
        {[0, 1, 2, 3].map((i) => [-1, 1].map((s) => <mesh key={i + '' + s} position={[s * 0.025, -0.05 + i * 0.045, 0.005]} rotation={[0, 0, -s * 0.5]} scale={[0.6, 1, 0.3]}><icosahedronGeometry args={[0.03, 0]} /><M c={TRIGO} e={TRIGO} ei={0.3} /></mesh>))}
      </group>}
      {mark === 'pellet' && <group position={[0, 0.3, 0.17]}>
        {[[-0.05, 0], [0.05, 0.02], [0, -0.05], [0.02, 0.06]].map(([x, y], i) => <Cyl key={i} r={0.025} h={0.02} pos={[x, y, 0.005]} rot={[PI / 2, 0, 0]} c="#8a5a2b" />)}
      </group>}
    </group>
  );
};

/* ---------- Espiga de trigo ---------- */
export const Espiga: React.FC<P> = ({ t, p }) => {
  const { ph = 0 } = p;
  return (
    <group rotation={[0, 0, Math.sin(t * 1.6 + ph) * 0.07]}>
      <Cyl r={0.015} h={0.7} pos={[0, 0.35, 0]} c="#c9963f" />
      {Array.from({ length: 6 }, (_, i) => [-1, 1].map((s) => (
        <mesh key={i + '' + s} position={[s * 0.035, 0.72 + i * 0.05, 0]} rotation={[0, 0, -s * 0.45]} scale={[0.6, 1, 0.6]}><icosahedronGeometry args={[0.04, 0]} /><M c={TRIGO} e={TRIGO} ei={0.25} /></mesh>)))}
    </group>
  );
};

/* ---------- Montoncito de pellets de alimento balanceado ---------- */
export const Pellets: React.FC<P> = ({ p }) => {
  const { n = 26, seed = 4, r = 0.32 } = p;
  const q = useMemo(() => { const g = rnd(seed); return Array.from({ length: n }, (_, i) => { const a = g() * PI * 2, d = Math.sqrt(g()) * r; return [Math.cos(a) * d, 0.03 + (r - d) * 0.5 + (i % 3) * 0.01, Math.sin(a) * d, g() * PI]; }); }, [n, seed, r]);
  return <group>{q.map(([x, y, z, a], i) => <Cyl key={i} r={0.035} h={0.05} pos={[x, y, z]} rot={[a, 0, PI / 2]} c={i % 3 ? '#8a5a2b' : '#a7713a'} seg={6} />)}</group>;
};

/* ---------- Girasol ---------- */
export const Girasol: React.FC<P> = ({ t, p }) => {
  const { h = 1.0, ph = 0 } = p;
  return (
    <group rotation={[0, 0, Math.sin(t * 1.2 + ph) * 0.05]}>
      <Cyl r={0.025} h={h} pos={[0, h / 2, 0]} c="#3f8a3a" />
      {[0.35, 0.6].map((y, i) => <mesh key={i} position={[i ? -0.1 : 0.1, h * y, 0]} rotation={[0, 0, i ? 0.6 : -0.6]} scale={[1.3, 0.3, 0.8]}><icosahedronGeometry args={[0.1, 0]} /><M c="#4f9a3a" /></mesh>)}
      <group position={[0, h + 0.02, 0.03]} rotation={[0.25, 0, 0]}>
        <Cyl r={0.13} h={0.05} rot={[PI / 2, 0, 0]} seg={12} c="#4a2d16" />
        {Array.from({ length: 12 }, (_, i) => { const a = (i / 12) * PI * 2;
          return <mesh key={i} position={[Math.cos(a) * 0.2, Math.sin(a) * 0.2, 0]} rotation={[0, 0, a]} scale={[1.6, 0.6, 0.3]}><icosahedronGeometry args={[0.06, 0]} /><M c="#ffc928" e="#ffb52e" ei={0.35} /></mesh>; })}
      </group>
    </group>
  );
};

/* ---------- Cajón de porotos (legumbres) ---------- */
export const Porotos: React.FC<P> = ({ p }) => {
  const { seed = 6 } = p;
  const q = useMemo(() => { const g = rnd(seed); return Array.from({ length: 30 }, () => [(g() - 0.5) * 0.5, 0.3 + g() * 0.08, (g() - 0.5) * 0.34, g() * PI]); }, [seed]);
  return (
    <group>
      <B s={[0.62, 0.3, 0.46]} pos={[0, 0.15, 0]} c="#8a6a45" />
      {[-0.1, 0.05].map((y) => <B key={y} s={[0.63, 0.03, 0.47]} pos={[0, 0.15 + y, 0]} c="#6b4f33" />)}
      {q.map(([x, y, z, a], i) => <mesh key={i} position={[x, y, z]} rotation={[0, a, 0]} scale={[1.5, 0.8, 1]}><icosahedronGeometry args={[0.035, 0]} /><M c={i % 4 ? '#e9dcc4' : '#9a3b2f'} /></mesh>)}
    </group>
  );
};

/* ---------- Vaca genérica (marrón con manchas blancas) mirando a +x ---------- */
export const Vaca: React.FC<P> = ({ t, p }) => {
  const { ph = 0 } = p; const k = (Math.sin(t * 2.0 + ph) + 1) / 2;
  return (
    <group>
      <B s={[1.0, 0.5, 0.48]} pos={[0, 0.72, 0]} c="#7a4a2a" />
      <B s={[0.34, 0.3, 0.5]} pos={[-0.18, 0.8, 0]} c="#f2ead8" />
      <B s={[0.2, 0.22, 0.49]} pos={[0.24, 0.64, 0]} c="#f2ead8" />
      {[[-0.38, -0.16], [-0.38, 0.16], [0.36, -0.16], [0.36, 0.16]].map(([x, z], i) => <B key={i} s={[0.12, 0.48, 0.12]} pos={[x, 0.24, z]} c="#5c3720" />)}
      <B s={[0.04, 0.3, 0.04]} pos={[-0.52, 0.66, 0]} rot={[0, 0, -0.25 + Math.sin(t * 3 + ph) * 0.15]} c="#5c3720" />
      <group position={[0.52, 0.85, 0]} rotation={[0, 0, -0.3 - k * 0.45]}>
        <B s={[0.36, 0.26, 0.3]} pos={[0.16, 0, 0]} c="#7a4a2a" />
        <B s={[0.1, 0.16, 0.24]} pos={[0.36, -0.04, 0]} c="#e8a8a0" />
        <B s={[0.06, 0.12, 0.06]} pos={[0.06, 0.16, 0.12]} c="#e9e3d6" /><B s={[0.06, 0.12, 0.06]} pos={[0.06, 0.16, -0.12]} c="#e9e3d6" />
      </group>
    </group>
  );
};

/* ---------- Corral (cerco bajo) ---------- */
export const Corral: React.FC<P> = ({ p }) => {
  const { w = 3, d = 1.6 } = p; const c = '#9a7350';
  return (
    <group>
      <B s={[w, 0.02, d]} pos={[0, 0.02, 0]} c="#4d5b3a" />
      {[-1, 1].map((s) => <group key={s}>
        <B s={[w, 0.06, 0.05]} pos={[0, 0.35, s * d / 2]} c={c} /><B s={[w, 0.06, 0.05]} pos={[0, 0.18, s * d / 2]} c={c} />
        <B s={[0.05, 0.06, d]} pos={[s * w / 2, 0.35, 0]} c={c} /><B s={[0.05, 0.06, d]} pos={[s * w / 2, 0.18, 0]} c={c} />
      </group>)}
      {Array.from({ length: 7 }, (_, i) => [-1, 1].map((s) => <B key={i + '' + s} s={[0.07, 0.45, 0.07]} pos={[-w / 2 + (i * w) / 6, 0.22, s * d / 2]} c={c} />))}
    </group>
  );
};

/* ---------- Tablero de 12 meses: se prenden los primeros `on` (de enero a octubre) ---------- */
export const Meses: React.FC<P> = ({ t, tt, p }) => {
  const { on = 10, at = 0, step = 0.06, c = TEAL } = p;
  const ini = ['E', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
  const s = 0.42, g = 0.08, W = 6 * s + 5 * g;
  return (
    <group>
      <B s={[W + 0.24, 2 * s + g + 0.24, 0.06]} pos={[0, 0, -0.06]} c="#1a2030" />
      {ini.map((m, i) => { const x = -W / 2 + s / 2 + (i % 6) * (s + g); const y = i < 6 ? (s + g) / 2 : -(s + g) / 2;
        const k = i < on ? clamp((t - at - i * step) / 0.15) : 0; const col = k > 0.5 ? c : '#3a4350';
        return (
          <group key={i} position={[x, y, 0]}>
            <group scale={1 + 0.12 * Math.sin(PI * k)}><B s={[s, s, 0.06]} c={col} e={k > 0.5 ? c : undefined} ei={0.5} /></group>
            <group position={[0, 0, 0.05]}><Label t={t} tt={tt} p={{ text: m, w: s * 0.8, h: s * 0.8, color: k > 0.5 ? INK : '#8d96a3', size: 0.7, weight: 900, depth: 0 }} /></group>
          </group>);
      })}
    </group>
  );
};

/* ---------- Podio de dos escalones con el número 2 cm delante del frente ---------- */
export const Podio: React.FC<P> = ({ t, tt, p }) => {
  const { h1 = 1.0, h2 = 0.62, two = true } = p;
  return (
    <group>
      <B s={[1.0, h1, 0.9]} pos={[-0.52, h1 / 2, 0]} c="#3d4656" />
      <B s={[1.0, 0.05, 0.92]} pos={[-0.52, h1 + 0.02, 0]} c="#ffd23f" e="#ffb52e" ei={0.6} />
      <B s={[1.0, h2, 0.9]} pos={[0.52, h2 / 2, 0]} c="#2c333d" />
      <B s={[1.0, 0.05, 0.92]} pos={[0.52, h2 + 0.02, 0]} c="#c9cfd6" e="#9aa3ad" ei={0.3} />
      <group position={[-0.52, h1 * 0.5, 0.47]}><Label t={t} tt={tt} p={{ text: '1', w: 0.6, h: 0.6, color: '#ffd23f', size: 0.85, weight: 900, depth: 0 }} /></group>
      {two && <group position={[0.52, h2 * 0.5, 0.47]}><Label t={t} tt={tt} p={{ text: '2', w: 0.5, h: 0.5, color: '#e1e5ea', size: 0.85, weight: 900, depth: 0 }} /></group>}
    </group>
  );
};

/* ---------- Flecha hacia arriba que crece ---------- */
export const Sube: React.FC<P> = ({ tt, p }) => {
  const { len = 0.8, color = TEAL, dur = 0.5 } = p; const k = Math.max(0.001, eo(tt / dur));
  return (<group><B s={[0.16, len * k, 0.16]} pos={[0, (len * k) / 2, 0]} c={color} e={color} ei={0.8} />
    <mesh position={[0, len * k + 0.16, 0]}><coneGeometry args={[0.28, 0.36, 4]} /><M c={color} e={color} ei={0.8} /></mesh></group>);
};

/* ---------- Pila de contenedores en el muelle ---------- */
export const Pila3: React.FC<P> = ({ p }) => {
  const { seed = 2, nx = 3, ny = 2 } = p; const cols = [NAR, CREMA, TEAL, CORAL, AZUL];
  const r = useMemo(() => { const g = rnd(seed); return Array.from({ length: nx * ny * 2 }, () => Math.floor(g() * cols.length)); }, [seed]);
  return (
    <group>
      {Array.from({ length: nx * ny * 2 }, (_, i) => { const x = (i % nx) * 0.32, y = 0.1 + Math.floor(i / (nx * 2)) * 0.2, z = Math.floor(i / nx) % 2 ? 0.66 : 0;
        return <group key={i} position={[x, y, z]} rotation={[0, PI / 2, 0]}><Cont pos={[0, 0, 0]} c={cols[r[i]]} /></group>; })}
    </group>
  );
};

export const EXTRA: Record<string, React.FC<P>> = {
  world: World, grua: Grua, barco: Barco, balanza: Balanza, carne: Carne, frasco: Frasco, citrico: Citrico, lana: Lana, fajo: Fajo,
  pila: Pila, par: Par, cajas: Cajas, cinta: Cinta, bolsa: Bolsa, espiga: Espiga, pellets: Pellets, girasol: Girasol, porotos: Porotos,
  vaca: Vaca, corral: Corral, meses: Meses, podio: Podio, sube: Sube, sign: Sign, pila3: Pila3,
};
