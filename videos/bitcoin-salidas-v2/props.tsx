import React from 'react';
import * as THREE from 'three';
import { M, Label, useTex } from '../../src/kit/Props';
import { clamp, eio, eo, lerp, rnd } from '../../src/kit/math';

// bitcoin-salidas-v2: otro look que el original (neón violeta, bóveda, ciudad). Acá: escritorio nocturno con billetes verdes,
// una montaña al atardecer para el precio y una planta de tanques (los fondos) en azul acero y amarillo de seguridad.
// Moneda genérica naranja con "BTC" en texto: ningún logo real.
type P = { t: number; tt: number; p: any };
type V3 = [number, number, number];
export const K = {
  navy: '#0c1a26', steel: '#2b3d4f', steel2: '#1e2c3a', concrete: '#7d8580', concrete2: '#6b726e', hazard: '#f2c230',
  orange: '#f7931a', orange2: '#c96f0c', mint: '#9fdcae', mint2: '#4f9a68', paper: '#efe8d6', wood: '#4a2e1c', wood2: '#382213',
  red: '#ff4a3d', green: '#34d27b', snow: '#eef3f7', rock: '#8a5a44', rock2: '#6e4433', dusk: '#e0703a',
};
const B: React.FC<{ s: V3; pos?: V3; rot?: V3; c: string; e?: string; ei?: number; o?: number }> = ({ s, pos, rot, c, e, ei, o }) => (
  <mesh position={pos} rotation={rot}><boxGeometry args={s} /><M c={c} e={e} ei={ei} o={o} /></mesh>
);
const Cy: React.FC<{ r: number; r2?: number; h: number; n?: number; pos?: V3; rot?: V3; c: string; e?: string; ei?: number; o?: number }> = ({ r, r2, h, n = 14, pos, rot, c, e, ei, o }) => (
  <mesh position={pos} rotation={rot}><cylinderGeometry args={[r2 ?? r, r, h, n]} /><M c={c} e={e} ei={ei} o={o} /></mesh>
);
const Flat: React.FC<{ s: [number, number]; pos?: V3; rot?: V3; c?: string; map?: THREE.Texture; o?: number }> = ({ s, pos, rot, c = '#fff', map, o }) => (
  <mesh position={pos} rotation={rot}><planeGeometry args={s} /><meshBasicMaterial color={c} map={map} toneMapped={false} transparent={o !== undefined} opacity={o ?? 1} fog={false} /></mesh>
);

/* ---------- Escenarios (tapan el set 'room' de base) ---------- */
export const Stage: React.FC<P> = ({ t, p }) => {
  const kind = p.kind ?? 'desk';
  const sky = useTex((g, W, H) => {
    const gr = g.createLinearGradient(0, 0, 0, H);
    gr.addColorStop(0, '#0b1626'); gr.addColorStop(0.45, '#23365a'); gr.addColorStop(0.72, '#b8574a'); gr.addColorStop(0.86, K.dusk); gr.addColorStop(1, '#f3a65a');
    g.fillStyle = gr; g.fillRect(0, 0, W, H);
    const r = rnd(5); g.fillStyle = '#fff'; for (let i = 0; i < 60; i++) { g.globalAlpha = 0.25 + r() * 0.6; g.fillRect(r() * W, r() * H * 0.4, 2, 2); }
  }, 256, 512, 'skyv2');
  if (kind === 'desk') return (
    <group>
      <color attach="background" args={['#081419']} />
      <pointLight position={[-1.6, 3.4, 1.4]} intensity={34} color="#ffd59a" distance={10} />
      <pointLight position={[2.6, 2.2, -1.5]} intensity={8} color="#5fd0c0" distance={8} />
      {/* pared verde petróleo con ventana nocturna */}
      <B s={[30, 18, 0.2]} pos={[0, 9, -3.6]} c="#0f2a2c" />
      <group position={[1.6, 3.0, -3.48]}>
        <B s={[2.0, 1.7, 0.05]} c="#16334f" e="#0e2240" ei={0.8} />
        {[-0.5, 0, 0.5].map((x, i) => <B key={i} s={[0.12 + i * 0.05, 0.4 + ((i * 7) % 5) * 0.12, 0.02]} pos={[x, -0.6 + (0.2 + ((i * 7) % 5) * 0.06), 0.04]} c="#22405e" e="#ffcf7a" ei={0.15} />)}
        <B s={[2.1, 0.07, 0.08]} pos={[0, 0, 0.03]} c="#d9cfb8" /><B s={[0.07, 1.8, 0.08]} pos={[0, 0, 0.03]} c="#d9cfb8" />
        <B s={[2.16, 1.82, 0.04]} pos={[0, 0, -0.01]} c="#d9cfb8" />
      </group>
      {[-4.3, 4.3].map((x) => <B key={x} s={[0.2, 18, 30]} pos={[x, 9, 11]} c="#0b2022" />)}
      {/* tablero del escritorio (llena el piso) */}
      <B s={[30, 0.6, 30]} pos={[0, -0.29, 0]} c={K.wood} />
      {Array.from({ length: 16 }, (_, i) => <B key={i} s={[30, 0.006, 0.02]} pos={[0, 0.012, -3.4 + i * 0.5]} c={K.wood2} />)}
      {/* lámpara */}
      <group position={[-1.75, 0, -1.2]}>
        <Cy r={0.32} h={0.08} pos={[0, 0.04, 0]} c="#1c2a2a" />
        <B s={[0.06, 1.9, 0.06]} pos={[0, 0.95, 0]} rot={[0, 0, 0.18]} c="#1c2a2a" />
        <B s={[0.06, 1.0, 0.06]} pos={[0.45, 2.05, 0]} rot={[0, 0, -1.0]} c="#1c2a2a" />
        <group position={[0.92, 2.22, 0]} rotation={[0, 0, -0.5]}>
          <mesh><coneGeometry args={[0.36, 0.42, 10, 1, true]} /><M c="#2e6b5e" /></mesh>
          <mesh position={[0, -0.14, 0]}><sphereGeometry args={[0.13, 8, 6]} /><M c="#fff3c4" e="#fff3c4" ei={2.5} /></mesh>
        </group>
      </group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-0.4, 0.015, -0.4]}><circleGeometry args={[2.0, 36]} />
        <meshBasicMaterial color="#ffd59a" transparent opacity={0.12} toneMapped={false} blending={THREE.AdditiveBlending} depthWrite={false} /></mesh>
      {/* taza */}
      <group position={[1.75, 0, -1.6]}><Cy r={0.26} h={0.5} pos={[0, 0.25, 0]} c="#e9e3d2" /><Cy r={0.22} h={0.02} pos={[0, 0.5, 0]} c="#3a2214" /></group>
    </group>
  );
  if (kind === 'peak') return (
    <group>
      <color attach="background" args={['#0b1626']} />
      <fog attach="fog" args={['#4a4060', 7, 16]} />
      <pointLight position={[3, 4, 4]} intensity={30} color="#ffb27a" distance={16} />
      <pointLight position={[-4, 3, 2]} intensity={14} color="#7fa8ff" distance={14} />
      <Flat s={[16, 14]} pos={[0, 5.5, -3.7]} map={sky} />
      {[-4.2, 4.2].map((x) => <Flat key={x} s={[14, 14]} pos={[x, 5.5, 0]} rot={[0, x < 0 ? Math.PI / 2 : -Math.PI / 2, 0]} map={sky} />)}
      {/* sierras lejanas */}
      {Array.from({ length: 11 }, (_, i) => { const r = rnd(40 + i); const x = -12 + i * 2.4 + r() * 0.8; const h = 2.2 + r() * 3.2;
        return <mesh key={i} position={[x * 0.6, h * 0.35 - 0.1, -3.0 - r() * 0.5]}><coneGeometry args={[1.2 + r() * 0.6, h * 0.7, 5]} /><M c={i % 2 ? '#2d3a5c' : '#36446a'} /></mesh>; })}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.006, 0]}><planeGeometry args={[80, 80]} /><M c="#3c3f4a" /></mesh>
      {Array.from({ length: 9 }, (_, i) => { const r = rnd(70 + i); return <mesh key={i} position={[-3.5 + i * 0.9, 0.12, 1.4 + r() * 1.5]}><dodecahedronGeometry args={[0.12 + r() * 0.16, 0]} /><M c="#55586a" /></mesh>; })}
    </group>
  );
  // planta de tanques
  return (
    <group>
      <color attach="background" args={['#0a131b']} />
      <pointLight position={[0, 3.8, 2.4]} intensity={26} color="#dfefff" distance={12} />
      <pointLight position={[-3, 1.4, 1]} intensity={10} color={K.orange} distance={8} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.006, 0]}><planeGeometry args={[60, 60]} /><M c={K.concrete} /></mesh>
      {Array.from({ length: 13 }, (_, i) => <B key={i} s={[0.02, 0.004, 30]} pos={[-6 + i, 0.01, 0]} c={K.concrete2} />)}
      {Array.from({ length: 10 }, (_, i) => <B key={'z' + i} s={[30, 0.004, 0.02]} pos={[0, 0.01, -3.4 + i]} c={K.concrete2} />)}
      <B s={[30, 18, 0.2]} pos={[0, 9, -3.6]} c={K.steel} />
      {/* franja de seguridad */}
      {Array.from({ length: 28 }, (_, i) => <B key={i} s={[0.28, 0.3, 0.03]} pos={[-7 + i * 0.5, 0.35, -3.48]} rot={[0, 0, 0.6]} c={i % 2 ? K.hazard : '#1a1a1a'} />)}
      <B s={[30, 0.06, 0.06]} pos={[0, 0.55, -3.47]} c={K.hazard} />
      {/* caños en la pared */}
      {[1.5, 2.3].map((y, j) => <Cy key={y} r={0.08} h={30} pos={[0, y, -3.35]} rot={[0, 0, Math.PI / 2]} c={j ? '#b87333' : '#5d6f80'} />)}
      {Array.from({ length: 6 }, (_, i) => <B key={'r' + i} s={[0.06, 3.8, 0.06]} pos={[-5 + i * 2, 1.9, -3.38]} c="#3c5063" />)}
      {/* luces de techo */}
      {[-1.8, 1.8].map((x) => <group key={x} position={[x, 4.3, 0]}><B s={[1.2, 0.08, 0.2]} c="#e8f3ff" e="#e8f3ff" ei={1.5} /></group>)}
      {[-4.3, 4.3].map((x) => <B key={x} s={[0.2, 18, 30]} pos={[x, 9, 11]} c={K.steel2} />)}
      {/* señal intermitente */}
      <mesh position={[-3.0, 3.4, -3.4]}><sphereGeometry args={[0.12, 8, 6]} /><M c={K.orange} e={K.orange} ei={Math.sin(t * 6) > 0 ? 3 : 0.3} /></mesh>
    </group>
  );
};

/* ---------- Billete y fajo ---------- */
const billDraw = (g: CanvasRenderingContext2D, W: number, H: number) => {
  g.fillStyle = K.mint; g.fillRect(0, 0, W, H);
  g.strokeStyle = K.mint2; g.lineWidth = 14; g.strokeRect(14, 14, W - 28, H - 28);
  g.lineWidth = 4; g.strokeRect(34, 34, W - 68, H - 68);
  g.fillStyle = K.mint2; g.beginPath(); g.ellipse(W / 2, H / 2, H * 0.3, H * 0.34, 0, 0, Math.PI * 2); g.fill();
  g.fillStyle = K.mint; g.beginPath(); g.ellipse(W / 2, H / 2, H * 0.24, H * 0.28, 0, 0, Math.PI * 2); g.fill();
  g.fillStyle = '#2f6d47'; g.font = '900 64px Poppins'; g.textAlign = 'center'; g.textBaseline = 'middle';
  g.fillText('100', 90, 72); g.fillText('100', W - 90, H - 66); g.font = '900 96px Poppins'; g.fillText('$', W / 2, H / 2 + 4);
};
export const Bill: React.FC<P> = () => {
  const tx = useTex(billDraw, 512, 232, 'billv2');
  return (<group>
    <B s={[1.3, 0.012, 0.59]} c={K.mint2} />
    <mesh position={[0, 0.007, 0]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[1.28, 0.57]} /><meshBasicMaterial map={tx} toneMapped={false} /></mesh>
  </group>);
};
/** Fajo de billetes. p: n (billetes al inicio), to (billetes al final), at (s desde que aparece), dur, gap (alto por billete).
 *  Los que sobran salen volando hacia arriba y atrás. */
export const Stack: React.FC<P> = ({ t, tt, p }) => {
  const { n = 20, to = n, at = 0, dur = 1.4, gap = 0.05, grow, from = 1 } = p;
  const k = eio((tt - at) / dur);
  const keep = Math.round(lerp(n, to, k));
  const g0 = grow !== undefined ? Math.max(1, Math.round(lerp(from, n, eo(tt / grow)))) : n;
  return (<group>
    {Array.from({ length: Math.min(n, g0) }, (_, i) => {
      const r = rnd(i + 3); const jx = (r() - 0.5) * 0.06, jz = (r() - 0.5) * 0.05, jr = (r() - 0.5) * 0.12;
      if (i < keep) return <group key={i} position={[jx, 0.02 + i * gap, jz]} rotation={[0, jr, 0]}><Bill t={t} tt={tt} p={{}} /></group>;
      // vuela: cada billete sale en su turno (de arriba hacia abajo)
      const order = n - 1 - i; const ts = at + (order / Math.max(1, n - to)) * dur * 0.8; const f = clamp((tt - ts) / 1.1);
      if (f >= 1) return null;
      const dir = r() > 0.5 ? 1 : -1;
      return <group key={i} position={[jx + dir * (0.6 + r()) * f * 2.2, 0.02 + i * gap + f * (2.0 + r()), jz - f * 2.4]} rotation={[f * (2 + r() * 3), jr + f * 3 * dir, f * 1.5 * dir]}>
        <Bill t={t} tt={tt} p={{}} /></group>;
    })}
  </group>);
};

/* ---------- Moneda genérica (sin logo) ---------- */
export const Btc: React.FC<P> = ({ t, tt, p }) => {
  const { r = 0.5, spin = 0.8, flat = false } = p;
  const face = useTex((g, W, H) => {
    g.fillStyle = K.orange; g.fillRect(0, 0, W, H); g.strokeStyle = '#ffd08a'; g.lineWidth = 16; g.beginPath(); g.arc(W / 2, H / 2, W * 0.42, 0, Math.PI * 2); g.stroke();
    g.fillStyle = '#fff6e6'; g.font = '900 120px Poppins'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('BTC', W / 2, H / 2 + 6);
  }, 512, 512, 'btcv2');
  return (<group rotation={flat ? [0, 0, 0] : [Math.PI / 2, 0, t * spin]}>
    <Cy r={r} h={r * 0.22} n={20} c={K.orange2} />
    <mesh position={[0, r * 0.111 + 0.002, 0]} rotation={[-Math.PI / 2, 0, 0]}><circleGeometry args={[r * 0.98, 24]} /><meshBasicMaterial map={face} toneMapped={false} /></mesh>
    <mesh position={[0, -r * 0.111 - 0.002, 0]} rotation={[Math.PI / 2, 0, 0]}><circleGeometry args={[r * 0.98, 24]} /><meshBasicMaterial map={face} toneMapped={false} /></mesh>
  </group>);
};

/* ---------- Calculadora ---------- */
export const Calc: React.FC<P> = ({ t, tt, p }) => {
  const { show = '48' } = p;
  return (<group>
    <B s={[0.9, 0.1, 1.25]} pos={[0, 0.05, 0]} c="#22272b" />
    <group position={[0, 0.105, -0.36]} rotation={[-Math.PI / 2, 0, 0]}>
      <Label t={t} tt={tt} p={{ text: show, w: 0.74, h: 0.3, bg: '#bcd6a2', color: '#1d2a1a', size: 0.74, weight: 800, depth: 0 }} />
    </group>
    {Array.from({ length: 16 }, (_, i) => <B key={i} s={[0.15, 0.04, 0.13]} pos={[-0.27 + (i % 4) * 0.18, 0.11, -0.08 + Math.floor(i / 4) * 0.18]} c={i % 4 === 3 ? K.orange : '#4a5258'} />)}
  </group>);
};

/* ---------- Montaña del precio: une solo 3 puntos (máximo, mínimo, jueves) con rectas ---------- */
/** y de un precio en miles de US$ */
export const PRICE_Y = (v: number) => (v / 126) * 3.0;
export const RIDGE: [number, number][] = [[-1.15, PRICE_Y(126)], [0.55, PRICE_Y(55)], [1.45, PRICE_Y(61)]];
export const Ridge: React.FC<P> = ({ p }) => {
  const { depth = 1.4 } = p;
  const geo = React.useMemo(() => {
    const s = new THREE.Shape(); s.moveTo(-3.4, 0); s.lineTo(RIDGE[0][0], RIDGE[0][1]); s.lineTo(RIDGE[1][0], RIDGE[1][1]); s.lineTo(RIDGE[2][0], RIDGE[2][1]); s.lineTo(3.0, 0); s.lineTo(-3.4, 0);
    const g = new THREE.ExtrudeGeometry(s, { depth, bevelEnabled: false }); g.translate(0, 0, -depth / 2); return g;
  }, [depth]);
  const snow = React.useMemo(() => {
    const [px, py] = RIDGE[0]; const s = new THREE.Shape(); const f = 0.22;
    s.moveTo(lerp(px, -3.4, f), lerp(py, 0, f)); s.lineTo(px, py); s.lineTo(lerp(px, RIDGE[1][0], f), lerp(py, RIDGE[1][1], f));
    s.lineTo(lerp(px, RIDGE[1][0], f * 0.6), lerp(py, RIDGE[1][1], f * 0.6) - 0.12); s.lineTo(px, py - 0.25); s.lineTo(lerp(px, -3.4, f * 0.6), lerp(py, 0, f * 0.6) - 0.1);
    const g = new THREE.ExtrudeGeometry(s, { depth: depth + 0.04, bevelEnabled: false }); g.translate(0, 0, -(depth + 0.04) / 2); return g;
  }, [depth]);
  return (<group>
    <mesh geometry={geo}><meshStandardMaterial color={K.rock} flatShading roughness={0.9} /></mesh>
    <mesh geometry={snow}><meshStandardMaterial color={K.snow} flatShading roughness={0.8} /></mesh>
    {/* sombra de capas para que no se vea plana */}
    {[0.4, 0.9, 1.4].map((y) => <B key={y} s={[6.4, 0.02, depth + 0.02]} pos={[-0.2, y, 0]} c={K.rock2} o={0.55} />)}
  </group>);
};
/** Bandera con texto en un punto de la montaña. p: text, color, w */
export const Flag: React.FC<P> = ({ t, tt, p }) => {
  const { text = '', color = K.orange, w = 1.4, h = 0.34, pole = 0.55, side = 1, fg = '#fff' } = p;
  const wave = Math.sin(t * 4) * 0.05;
  return (<group>
    <mesh position={[0, 0.03, 0]}><sphereGeometry args={[0.09, 10, 8]} /><M c={color} e={color} ei={1.4} /></mesh>
    <B s={[0.03, pole, 0.03]} pos={[0, pole / 2, 0]} c="#e6e6e6" />
    <group position={[side * (w / 2 + 0.02), pole - h / 2, 0.02]} rotation={[0, wave * side, 0]}>
      <Label t={t} tt={tt} p={{ text, w, h, bg: color, color: fg, size: 0.62, weight: 900, depth: 0.02 }} />
    </group>
  </group>);
};
/** Tramo de soga entre dos puntos de la montaña que se dibuja (el recorrido entre puntos, recto). p: a, b (xy), dur, color */
export const Rope: React.FC<P> = ({ tt, p }) => {
  const { a = [0, 0], b = [1, 1], dur = 0.8, color = '#ffe08a', z = 0.72 } = p;
  const k = eo(tt / dur); const ex = lerp(a[0], b[0], k), ey = lerp(a[1], b[1], k);
  const len = Math.hypot(ex - a[0], ey - a[1]); const ang = Math.atan2(ey - a[1], ex - a[0]);
  return (<group position={[(a[0] + ex) / 2, (a[1] + ey) / 2, z]} rotation={[0, 0, ang]}>
    <B s={[Math.max(0.001, len), 0.04, 0.04]} c={color} e={color} ei={1.2} /></group>);
};

/* ---------- Tanque de vidrio (un fondo) con monedas adentro ---------- */
/** p: h, r, level (0-1 al inicio), to (0-1 al final), at, dur, fill (color), tag (texto de la placa), coin (monedas visibles) */
export const Tank: React.FC<P> = ({ t, tt, p }) => {
  const { h = 2.2, r = 0.55, level = 0.8, to = level, at = 0, dur = 1.5, fill = K.orange, tag, tagW = 1.1, coins = true, inflow = false } = p;
  const lv = lerp(level, to, eio((tt - at) / dur)) * (h - 0.3);
  const wob = Math.sin(t * 3) * 0.01;
  return (<group>
    <Cy r={r + 0.08} h={0.14} pos={[0, 0.07, 0]} c="#46596b" />
    <Cy r={r + 0.08} h={0.14} pos={[0, h + 0.07, 0]} c="#46596b" />
    {[0, 1, 2, 3].map((i) => <B key={i} s={[0.06, h, 0.06]} pos={[Math.cos(i * Math.PI / 2 + 0.785) * (r + 0.04), h / 2, Math.sin(i * Math.PI / 2 + 0.785) * (r + 0.04)]} c="#46596b" />)}
    {lv > 0.01 && <Cy r={r - 0.03} h={lv} pos={[0, 0.15 + lv / 2, 0]} c={fill} e={fill} ei={0.35} />}
    {lv > 0.01 && <Cy r={r - 0.03} h={0.02} pos={[0, 0.15 + lv + wob, 0]} c="#ffd08a" e="#ffd08a" ei={0.8} />}
    {coins && lv > 0.2 && Array.from({ length: 8 }, (_, i) => { const y = 0.25 + ((i * 0.37) % 1) * (lv - 0.15); const a = i * 2.3;
      return <group key={i} position={[Math.cos(a) * (r - 0.12), y, Math.sin(a) * (r - 0.12)]} rotation={[Math.PI / 2 + i, i * 0.7, 0]}>
        <Cy r={0.12} h={0.03} n={12} c="#ffcc66" e="#ffaa33" ei={0.5} /></group>; })}
    <mesh position={[0, h / 2 + 0.07, 0]}><cylinderGeometry args={[r, r, h - 0.02, 20, 1, true]} />
      <meshStandardMaterial color="#bfe3ff" transparent opacity={0.22} roughness={0.1} metalness={0.2} side={THREE.DoubleSide} depthWrite={false} /></mesh>
    {inflow && <group position={[0, h + 0.14, 0]}><Cy r={0.1} h={0.5} pos={[0, 0.25, 0]} c="#b87333" /></group>}
    {tag && <group position={[0, h * 0.55, r + 0.03]}><Label t={t} tt={tt} p={{ text: tag, w: tagW, h: 0.3, bg: '#e9eef2', color: '#13202b', size: 0.62, weight: 900, depth: 0.02 }} /></group>}
  </group>);
};

/** Chorro de monedas que salen por un caño. p: from, to (relativos), n, rate (monedas por s), at, color */
export const Flow: React.FC<P> = ({ tt, p }) => {
  const { from = [0, 0, 0], to = [2, -1, 0], n = 14, speed = 0.9, at = 0, color = '#ffcc66', arc = 0.6, r = 0.1, until } = p;
  const T = tt - at; if (T < 0) return null;
  return (<group>{Array.from({ length: n }, (_, i) => {
    const ph = T * speed - i / n; if (ph < 0) return null; const f = ph % 1; if (until !== undefined && T - f / speed > until) return null;
    const x = lerp(from[0], to[0], f), y = lerp(from[1], to[1], f) + Math.sin(f * Math.PI) * arc, z = lerp(from[2], to[2], f);
    return <group key={i} position={[x, y, z]} rotation={[f * 6 + i, i, f * 4]}><Cy r={r} h={r * 0.25} n={12} c={color} e={color} ei={0.6} /></group>;
  })}</group>);
};

/** Caño en L. p: len, h, color */
export const Pipe: React.FC<P> = ({ p }) => {
  const { len = 1.2, h = 0.4, color = '#b87333', r = 0.09 } = p;
  return (<group>
    <Cy r={r} h={len} pos={[len / 2, h, 0]} rot={[0, 0, Math.PI / 2]} c={color} />
    <Cy r={r + 0.03} h={0.1} pos={[len, h, 0]} rot={[0, 0, Math.PI / 2]} c="#7a4a20" />
    <mesh position={[0.25, h, 0]}><torusGeometry args={[0.14, 0.03, 6, 12]} /><M c={K.red} /></mesh>
  </group>);
};

/** Rejilla de desagüe en el piso */
export const Drain: React.FC<P> = ({ t }) => (<group>
  <Cy r={0.55} h={0.03} pos={[0, 0.015, 0]} c="#2a2f33" />
  {Array.from({ length: 5 }, (_, i) => <B key={i} s={[0.9, 0.03, 0.05]} pos={[0, 0.035, -0.32 + i * 0.16]} c="#565d63" />)}
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.04, 0]}><circleGeometry args={[0.9 + Math.sin(t * 4) * 0.04, 28]} />
    <meshBasicMaterial color={K.red} transparent opacity={0.16} toneMapped={false} blending={THREE.AdditiveBlending} depthWrite={false} /></mesh>
</group>);

/* ---------- Pared de meses (enero 2024 a noviembre 2026): sin datos por mes, solo el calendario ---------- */
const MES = ['E', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
export const Months: React.FC<P> = ({ t, tt, p }) => {
  const { stagger = 0.045, hot = 2.3, cols = 12, cw = 0.29, ch = 0.36 } = p;
  const n = 35;
  return (<group>
    {Array.from({ length: n }, (_, i) => {
      const col = i % cols, row = Math.floor(i / cols); const last = i === n - 1;
      const k = eo((tt - i * stagger) / 0.25); if (k <= 0) return null;
      const lit = last && tt >= hot; const pulse = lit ? 1 + Math.sin(t * 8) * 0.04 : 1;
      return <group key={i} position={[(col - (cols - 1) / 2) * cw, 2.2 - row * (ch + 0.06), 0]} rotation={[(1 - k) * 1.6, 0, 0]} scale={lit ? [1.25 * pulse, 1.25 * pulse, 1.25] : [1, 1, 1]}>
        <Label t={t} tt={tt} p={{ text: MES[i % 12], w: cw - 0.04, h: ch, bg: lit ? K.red : row === 2 ? '#e7edf2' : '#c9d4dd', color: lit ? '#fff' : '#13202b', size: 0.5, weight: 900, depth: 0.04 }} />
      </group>;
    })}
    {['2024', '2025', '2026'].map((y, r) => <group key={y} position={[-(cols / 2) * cw - 0.27, 2.2 - r * (ch + 0.06), 0]}>
      <Label t={t} tt={tt} p={{ text: y, w: 0.5, h: 0.24, color: '#e7edf2', size: 0.62, weight: 800, depth: 0 }} /></group>)}
  </group>);
};

/* ---------- Barra que cuelga hacia abajo (salidas) ---------- */
export const DropBar: React.FC<P> = ({ tt, p }) => {
  const { v = 2, color = K.red, w = 0.8, dur = 0.8 } = p; const h = Math.max(0.001, v * eo(tt / dur));
  return (<group>
    <B s={[w, h, w]} pos={[0, -h / 2, 0]} c={color} e={color} ei={0.35} />
    <B s={[w + 0.06, 0.04, w + 0.06]} pos={[0, -h, 0]} c="#ffd0c8" e="#ffd0c8" ei={0.6} />
  </group>);
};
/** Estante de vidrio = el cero */
export const Shelf: React.FC<P> = ({ p }) => (<group>
  <B s={[p.w ?? 3.2, 0.05, 1.2]} c="#cfe8ff" o={0.45} />
  <B s={[p.w ?? 3.2, 0.06, 0.06]} pos={[0, 0, 0.6]} c="#e8f3ff" e="#e8f3ff" ei={1.0} />
</group>);

export const EXTRA = { stage: Stage, bill: Bill, stack: Stack, btc: Btc, calc: Calc, ridge: Ridge, flag: Flag, rope: Rope, tank: Tank, flow: Flow, pipe: Pipe, drain: Drain, months: Months, dropbar: DropBar, shelf: Shelf };
