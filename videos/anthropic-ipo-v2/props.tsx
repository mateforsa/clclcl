import React from 'react';
import * as THREE from 'three';
import { M, Label, useTex } from '../../src/kit/Props';
import { C, clamp, eio, eo, lerp } from '../../src/kit/math';

// Look propio de esta versión (distinto del original neón violeta): redacción de diario (crema, tinta, verde
// oscuro) y pizarra de cotizaciones (pizarra negro-verdosa, LED ámbar, verde/rojo). Nada de logos reales.
type P = { t: number; tt: number; p: any };
type V3 = [number, number, number];
const B: React.FC<{ s: V3; pos?: V3; rot?: V3; c: string; e?: string; ei?: number }> = ({ s, pos, rot, c, e, ei }) => (
  <mesh position={pos} rotation={rot}><boxGeometry args={s} /><M c={c} e={e} ei={ei} /></mesh>
);
const Flat: React.FC<{ s: [number, number]; pos?: V3; rot?: V3; c?: string; map?: THREE.Texture; o?: number }> = ({ s, pos, rot, c = '#fff', map, o }) => (
  <mesh position={pos} rotation={rot}><planeGeometry args={s} /><meshBasicMaterial color={c} map={map} toneMapped={false} transparent={o !== undefined} opacity={o ?? 1} /></mesh>
);

export const INK = '#16212b', PAPER = '#f1e8d3', PAPER2 = '#ddd2b8', MOSS = '#1f3b34', AMBER = '#ffb21e', UP = '#2fd27a', DOWN = '#ff4a4a';
/** Altura de un precio en la pizarra (la raya de 83 queda en y = 0.8) */
export const PY = (v: number) => 0.8 + (v - 83) * 0.065;

/* ---------- Escenarios (se apoyan sobre el set 'room' y lo tapan) ---------- */
export const Stage: React.FC<P> = ({ t, p }) => {
  const kind = p.kind ?? 'news';
  const floor = useTex((g, W, H) => {
    const n = 16;
    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
      g.fillStyle = kind === 'news' ? ((i + j) % 2 ? '#2a2f36' : '#cfc4a8') : ((i + j) % 2 ? '#101a1e' : '#14232a');
      g.fillRect((i * W) / n, (j * H) / n, W / n + 1, H / n + 1);
    }
    if (kind === 'board') { g.strokeStyle = 'rgba(47,210,122,.22)'; g.lineWidth = 2; for (let i = 0; i <= n; i += 2) { g.beginPath(); g.moveTo((i * W) / n, 0); g.lineTo((i * W) / n, H); g.stroke(); g.beginPath(); g.moveTo(0, (i * H) / n); g.lineTo(W, (i * H) / n); g.stroke(); } }
  }, 512, 512, 'floor' + kind);
  const poster = useTex((g, W, H) => {
    g.fillStyle = PAPER; g.fillRect(0, 0, W, H); g.fillStyle = INK; g.font = '900 34px Poppins'; g.textAlign = 'center'; g.fillText('EL DIARIO', W / 2, 46);
    g.fillRect(16, 60, W - 32, 4); g.fillStyle = '#6b6457';
    for (let i = 0; i < 14; i++) g.fillRect(20 + (i % 2) * (W / 2 - 4), 90 + Math.floor(i / 2) * 26, W / 2 - 32, 9);
    g.fillStyle = '#9b927f'; g.fillRect(20, 290, W - 40, 90);
  }, 256, 400, 'poster');
  if (kind === 'news') return (
    <group>
      <pointLight position={[0, 3.6, 2.5]} intensity={26} color="#ffe2b0" distance={12} />
      <Flat s={[24, 24]} pos={[0, 0.02, 0]} rot={[-Math.PI / 2, 0, 0]} map={floor} c="#ffffff" />
      <B s={[12, 9, 0.2]} pos={[0, 4.5, -3.75]} c="#e6dcc3" />
      <B s={[12, 1.25, 0.24]} pos={[0, 0.62, -3.6]} c={MOSS} />
      <B s={[12, 0.08, 0.3]} pos={[0, 1.27, -3.58]} c="#c9a24a" />
      {[-4.3, 4.3].map((x) => <B key={x} s={[0.2, 9, 12]} pos={[x, 4.5, 0]} c="#d5c9ac" />)}
      {[-2.4, -0.8, 0.8, 2.4].map((x, i) => <group key={x} position={[x, 2.55 + (i % 2) * 0.15, -3.62]} rotation={[0, 0, (i % 2 ? 1 : -1) * 0.03]}>
        <B s={[1.0, 1.5, 0.04]} c={INK} /><Flat s={[0.9, 1.4]} pos={[0, 0, 0.025]} map={poster} /></group>)}
      {[-1.6, 1.6].map((x) => <group key={x} position={[x, 4.6, 0.4]}>
        <B s={[0.03, 1.2, 0.03]} pos={[0, 0.6, 0]} c="#444" />
        <mesh><coneGeometry args={[0.4, 0.35, 10, 1, true]} /><M c={MOSS} /></mesh>
        <mesh position={[0, -0.12, 0]}><sphereGeometry args={[0.13, 8, 6]} /><M c="#fff3c4" e="#fff3c4" ei={2} /></mesh>
      </group>)}
    </group>
  );
  // pizarra de cotizaciones
  const tick = useTex((g, W, H) => {
    g.fillStyle = '#05090a'; g.fillRect(0, 0, W, H); g.font = '800 44px monospace'; g.textBaseline = 'middle';
    const items = [['ANT', DOWN], ['TEC', DOWN], ['IPO', AMBER], ['NASDAQ', '#9fe8ff'], ['ANT', DOWN], ['TEC', UP]];
    let x = 10; for (let k = 0; k < 2; k++) for (const [s, c] of items) { g.fillStyle = c; g.fillText(s + (c === UP ? ' ▲' : c === DOWN ? ' ▼' : ' ●'), x, H / 2); x += 170; }
  }, 2048, 64, 'tick');
  tick.wrapS = THREE.RepeatWrapping; tick.offset.x = (t * 0.06) % 1;
  return (
    <group>
      <pointLight position={[0, 3.0, 3]} intensity={18} color="#bff5dc" distance={12} />
      <pointLight position={[-3, 1.5, 1]} intensity={10} color={AMBER} distance={8} />
      <Flat s={[24, 24]} pos={[0, 0.02, 0]} rot={[-Math.PI / 2, 0, 0]} map={floor} c="#ffffff" />
      <B s={[12, 9, 0.2]} pos={[0, 4.5, -3.75]} c="#0c1518" />
      {[-4.3, 4.3].map((x) => <B key={x} s={[0.2, 9, 12]} pos={[x, 4.5, 0]} c="#0f1c20" />)}
      {Array.from({ length: 18 }, (_, i) => { const x = -3.4 + (i % 6) * 1.36, y = 1.1 + Math.floor(i / 6) * 0.95; const on = Math.sin(i * 7.3 + t * 1.7) > -0.2;
        return <group key={i} position={[x, y, -3.62]}><B s={[1.2, 0.8, 0.05]} c="#1b2a30" />
          <Flat s={[1.08, 0.68]} pos={[0, 0, 0.03]} c={i % 3 === 0 ? '#0f3b2a' : i % 3 === 1 ? '#3b1414' : '#2e2610'} o={on ? 0.95 : 0.6} />
          {[0, 1, 2].map((r) => <Flat key={r} s={[0.2 + ((i * 3 + r) % 5) * 0.14, 0.06]} pos={[-0.3, 0.2 - r * 0.18, 0.04]} c={i % 3 === 0 ? UP : i % 3 === 1 ? DOWN : AMBER} o={0.8} />)}
        </group>; })}
      {p.ticker !== false && <group position={[0, 0.45, -3.6]}><B s={[8.4, 0.34, 0.06]} c="#05090a" /><Flat s={[8.2, 0.26]} pos={[0, 0, 0.04]} map={tick} /></group>}
    </group>
  );
};

/* ---------- Diario con titular y esquina que se arranca ---------- */
const TEAR: [number, number][] = [[0.58, 1], [0.6, 0.93], [0.55, 0.88], [0.62, 0.82], [0.66, 0.76], [0.74, 0.79], [0.8, 0.72], [0.88, 0.75], [0.94, 0.7], [1, 0.71], [1, 1]];
const drawPage = (head: string, mast: string) => (g: CanvasRenderingContext2D, W: number, H: number) => {
  g.fillStyle = PAPER; g.fillRect(0, 0, W, H);
  g.fillStyle = INK; g.textAlign = 'center'; g.font = '900 64px Georgia, serif'; g.fillText(mast, W / 2, 78);
  g.fillRect(30, 100, W - 60, 6); g.fillRect(30, 114, W - 60, 2);
  g.font = '600 22px Poppins'; g.fillStyle = '#5b5446'; g.fillText('EDICIÓN ESPECIAL · ECONOMÍA', W / 2, 142);
  // titular en varias líneas, grande
  g.fillStyle = INK; const words = head.split(' '); const lines: string[] = []; let cur = ''; g.font = '900 86px Poppins';
  for (const w of words) { const tst = cur ? cur + ' ' + w : w; if (g.measureText(tst).width > W - 70) { lines.push(cur); cur = w; } else cur = tst; }
  if (cur) lines.push(cur);
  lines.forEach((l, i) => g.fillText(l, W / 2, 238 + i * 92));
  const y0 = 238 + lines.length * 92 - 30;
  g.fillStyle = '#b7ad95'; g.fillRect(30, y0, W * 0.55, 230);
  g.strokeStyle = '#2f7a4f'; g.lineWidth = 10; g.beginPath(); g.moveTo(50, y0 + 190); g.lineTo(140, y0 + 120); g.lineTo(220, y0 + 150); g.lineTo(330, y0 + 50); g.lineTo(400, y0 + 80); g.stroke();
  g.fillStyle = '#7a725f'; for (let i = 0; i < 9; i++) g.fillRect(W * 0.6, y0 + i * 26, W * 0.35, 10);
  for (let i = 0; i < 14; i++) g.fillRect(30 + (i % 2) * (W / 2), y0 + 255 + Math.floor(i / 2) * 26, W / 2 - 60, 10);
};
const tearPath = (g: CanvasRenderingContext2D, W: number, H: number) => { g.beginPath(); TEAR.forEach(([x, y], i) => (i ? g.lineTo(x * W, y * H) : g.moveTo(x * W, y * H))); g.closePath(); };

/** p: head, mast, w, h, torn (sin esquina desde el inicio), tear (s desde que aparece: la esquina sale volando) */
export const Paper: React.FC<P> = ({ tt, p }) => {
  const { head = '', mast = 'EL DIARIO', w = 2.2, h = 2.75, torn = false, tear } = p;
  const Wc = 768, Hc = Math.round((768 * h) / w);
  const main = useTex((g, W, H) => { drawPage(head, mast)(g, W, H); g.globalCompositeOperation = 'destination-out'; tearPath(g, W, H); g.fill(); }, Wc, Hc, 'pm' + head + w + h);
  const piece = useTex((g, W, H) => { drawPage(head, mast)(g, W, H); g.globalCompositeOperation = 'destination-in'; tearPath(g, W, H); g.fill(); }, Wc, Hc, 'pp' + head + w + h);
  const k = tear !== undefined ? eo((tt - tear) / 0.7) : 1;
  const showPiece = !torn && (tear === undefined || k < 1);
  const mat = (map: THREE.Texture) => <meshBasicMaterial map={map} toneMapped={false} transparent alphaTest={0.5} side={THREE.DoubleSide} />;
  return (
    <group>
      <mesh position={[0.04, -0.04, -0.03]}><planeGeometry args={[w, h]} /><meshBasicMaterial color="#000" transparent opacity={0.35} /></mesh>
      <mesh>{<planeGeometry args={[w, h]} />}{mat(main)}</mesh>
      {showPiece && <group position={[k * 1.4, k * 0.9, k * 0.6]} rotation={[k * 0.6, k * -0.8, k * 1.2]}>
        <mesh>{<planeGeometry args={[w, h]} />}{mat(piece)}</mesh></group>}
    </group>
  );
};

/** La esquina arrancada sola (para el cierre del gancho). p.w, p.h como el diario. */
export const Piece: React.FC<P> = ({ p }) => {
  const { head = '', mast = 'EL DIARIO', w = 2.2, h = 2.75 } = p;
  const piece = useTex((g, W, H) => { drawPage(head, mast)(g, W, H); g.globalCompositeOperation = 'destination-in'; tearPath(g, W, H); g.fill(); }, 768, Math.round((768 * h) / w), 'pp' + head + w + h);
  return <mesh><planeGeometry args={[w, h]} /><meshBasicMaterial map={piece} toneMapped={false} transparent alphaTest={0.5} side={THREE.DoubleSide} /></mesh>;
};

/* ---------- Pila de acciones de papel (certificados) que crece ---------- */
export const Sheets: React.FC<P> = ({ t, tt, p }) => {
  const { n = 20, dur = 0.8, color = UP, top } = p; const m = Math.max(1, Math.round(eo(tt / dur) * n));
  return (
    <group>
      {Array.from({ length: m }, (_, i) => <group key={i} position={[Math.sin(i * 2.1) * 0.02, 0.025 + i * 0.05, Math.cos(i * 1.7) * 0.02]} rotation={[0, Math.sin(i * 3.3) * 0.06, 0]}>
        <B s={[0.8, 0.04, 0.55]} c={i % 2 ? PAPER : PAPER2} /><B s={[0.82, 0.012, 0.57]} pos={[0, 0.02, 0]} c={color} /></group>)}
      {top && <group position={[0, 0.07 + m * 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}><Label t={t} tt={tt} p={{ text: top, w: 0.74, h: 0.5, bg: PAPER, color: INK, border: color, size: 0.42, weight: 900, depth: 0 }} /></group>}
    </group>
  );
};

/* ---------- Tablero LED ---------- */
export const Led: React.FC<P> = ({ t, p }) => {
  const { w = 2.2, h = 1.0, rows = [{ t: 'ANT', c: AMBER }] } = p;
  const tx = useTex((g, W, H) => {
    g.fillStyle = '#040707'; g.fillRect(0, 0, W, H);
    g.fillStyle = 'rgba(255,255,255,.04)'; for (let x = 0; x < W; x += 8) for (let y = 0; y < H; y += 8) g.fillRect(x, y, 5, 5);
    g.textAlign = 'center'; g.textBaseline = 'middle';
    const n = rows.length; rows.forEach((r: any, i: number) => { const px = (H / n) * (r.s ?? 0.62); g.font = `800 ${px}px monospace`;
      let f = px; while (g.measureText(r.t).width > W * 0.9) { f *= 0.94; g.font = `800 ${f}px monospace`; }
      g.shadowColor = r.c; g.shadowBlur = 18; g.fillStyle = r.c; g.fillText(r.t, W / 2, (H / n) * (i + 0.55)); });
  }, 1024, Math.round((1024 * h) / w), 'led' + JSON.stringify(rows) + w + h);
  return (
    <group>
      <B s={[w + 0.14, h + 0.14, 0.1]} pos={[0, 0, -0.06]} c="#2a3236" />
      <Flat s={[w, h]} map={tx} c={`hsl(0,0%,${92 + Math.sin(t * 9) * 4}%)`} />
    </group>
  );
};

/* ---------- Raya del precio de salida (US$ 83) ---------- */
export const Line83: React.FC<P> = ({ t, tt, p }) => {
  const { w = 3.6, red, label = 'US$ 83', lx = -1.45 } = p;
  const isRed = red !== undefined && tt >= red; const col = isRed ? DOWN : '#f4f7ff';
  const k = eo(tt / 0.5);
  return (
    <group>
      <B s={[w * Math.max(0.01, k), 0.05, 0.05]} c={col} e={col} ei={1.6 + Math.sin(t * 5) * 0.2} />
      <mesh position={[0, -0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[w * k, 0.5]} />
        <meshBasicMaterial color={col} transparent opacity={0.08} toneMapped={false} depthWrite={false} blending={THREE.AdditiveBlending} /></mesh>
      {label && <group position={[lx, 0.2, 0.05]}><Label t={t} tt={tt} p={{ text: label, w: 0.82, h: 0.28, bg: isRed ? DOWN : '#f4f7ff', color: INK, size: 0.7, weight: 900, depth: 0.03 }} /></group>}
    </group>
  );
};

/** Paleta de precio: tallo desde la raya de 83 hasta el precio. p: v, v0 (precio desde el que viaja), dur, delay, day */
export const Lolli: React.FC<P> = ({ t, tt, p }) => {
  const { v = 83, v0, dur = 0.7, delay = 0, day, tag, r = 0.13 } = p;
  const k = eio((tt - delay) / dur); const cur = v0 !== undefined ? lerp(v0, v, k) : lerp(83, v, eo((tt - delay) / dur));
  const y0 = PY(83), y1 = PY(cur); const col = cur >= 83 ? UP : DOWN; const len = Math.abs(y1 - y0);
  return (
    <group>
      {len > 0.005 && <B s={[0.07, len, 0.07]} pos={[0, (y0 + y1) / 2, 0]} c={col} e={col} ei={0.9} />}
      <mesh position={[0, y1, 0]}><sphereGeometry args={[r, 10, 8]} /><M c={col} e={col} ei={1.4} /></mesh>
      {day && <group position={[0, 0.16, 0.25]} rotation={[-0.5, 0, 0]}><Label t={t} tt={tt} p={{ text: day, w: 0.62, h: 0.3, bg: '#1b2a30', color: '#e8f4ef', size: 0.58, weight: 800, depth: 0 }} /></group>}
      {tag && <group position={[0, y1 + (cur >= 83 ? 0.3 : -0.3), 0.08]}><Label t={t} tt={tt} p={{ text: tag, w: 0.86, h: 0.3, bg: col, color: INK, size: 0.68, weight: 900, depth: 0.03 }} /></group>}
    </group>
  );
};

/* ---------- Medidor de rango (70 a 78) con aguja que pasa a 83 ---------- */
export const Gauge: React.FC<P> = ({ t, tt, p }) => {
  const { r = 1.25, swing = 1.0 } = p; const lo = 62, hi = 92;
  const ang = (v: number) => Math.PI - ((v - lo) / (hi - lo)) * Math.PI;
  const k = eio((tt - swing) / 0.7); const needle = lerp(74 + Math.sin(t * 3) * 0.6 * (1 - k), 83, k);
  return (
    <group>
      <mesh rotation={[0, 0, 0]}><circleGeometry args={[r + 0.2, 32, 0, Math.PI]} /><M c={INK} /></mesh>
      {Array.from({ length: 31 }, (_, i) => { const v = lo + i; const a = ang(v); const inR = v >= 70 && v <= 78; const big = v % 5 === 0 || v === 83;
        return <B key={i} s={[big ? 0.24 : 0.14, inR ? 0.07 : 0.035, 0.04]} pos={[Math.cos(a) * r, Math.sin(a) * r, 0.03]} rot={[0, 0, a]} c={inR ? '#46c6ff' : v === 83 ? AMBER : '#8e9aa0'} e={inR ? '#46c6ff' : v === 83 ? AMBER : undefined} ei={1.2} />; })}
      {[70, 78].map((v) => <group key={v} position={[Math.cos(ang(v)) * (r - 0.38), Math.sin(ang(v)) * (r - 0.38), 0.05]}><Label t={t} tt={tt} p={{ text: String(v), w: 0.44, h: 0.26, color: '#bfeaff', size: 0.8, weight: 800, depth: 0 }} /></group>)}
      {k > 0.95 && <group position={[Math.cos(ang(83)) * (r + 0.42), Math.sin(ang(83)) * (r + 0.42), 0.05]}><Label t={t} tt={tt} p={{ text: '83', w: 0.5, h: 0.3, bg: AMBER, color: INK, size: 0.78, weight: 900, depth: 0.03 }} /></group>}
      <group rotation={[0, 0, ang(needle)]} position={[0, 0, 0.08]}><B s={[r * 0.95, 0.06, 0.04]} pos={[r * 0.47, 0, 0]} c={k > 0.5 ? AMBER : '#f4f1ff'} e={k > 0.5 ? AMBER : undefined} ei={1.2} /></group>
      <mesh position={[0, 0, 0.1]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.1, 0.1, 0.06, 12]} /><M c="#f4f1ff" /></mesh>
    </group>
  );
};

/** Barra que cae (acciones tecnológicas genéricas). p: h0, h1, fall (s), dur, w */
export const Fall: React.FC<P> = ({ t, tt, p }) => {
  const { h0 = 1.6, h1 = 0.5, fall = 0.5, dur = 0.6, w = 0.42, label } = p;
  const k = eio((tt - fall) / dur); const h = lerp(h0, h1, k); const col = k > 0.3 ? DOWN : UP;
  return (
    <group>
      <B s={[w, h, w]} pos={[0, h / 2, 0]} c={col} e={col} ei={0.35} />
      <B s={[w + 0.06, 0.05, w + 0.06]} pos={[0, h + 0.02, 0]} c="#f4f1ff" />
      {label && <group position={[0, h + 0.22, 0]}><Label t={t} tt={tt} p={{ text: label, w: 0.6, h: 0.22, bg: '#1b2a30', color: '#e8f4ef', size: 0.7, weight: 800, depth: 0 }} /></group>}
    </group>
  );
};

/** Cartel de advertencia genérico (triángulo con signo de admiración) */
export const Warn: React.FC<P> = () => (
  <group>
    <B s={[0.08, 1.2, 0.08]} pos={[0, 0.6, -0.05]} c="#5b6166" />
    <group position={[0, 1.5, 0]} rotation={[0, 0, Math.PI]}><mesh rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.62, 0.62, 0.06, 3]} /><M c={AMBER} /></mesh></group>
    <B s={[0.1, 0.3, 0.04]} pos={[0, 1.5, 0.05]} c={INK} /><B s={[0.1, 0.1, 0.04]} pos={[0, 1.29, 0.05]} c={INK} />
  </group>
);

/** Botón grande de votación (pedestal con tapa de color y texto) */
export const Vote: React.FC<P> = ({ t, tt, p }) => {
  const { text = 'SÍ', color = UP } = p; const press = Math.max(0, Math.sin(clamp(tt / 0.4) * Math.PI)) * 0.06;
  return (
    <group>
      <B s={[0.9, 0.7, 0.9]} pos={[0, 0.35, 0]} c="#2a3236" />
      <mesh position={[0, 0.78 - press, 0]}><cylinderGeometry args={[0.38, 0.4, 0.16, 16]} /><M c={color} e={color} ei={0.6} /></mesh>
      <group position={[0, 1.25, 0]}><Label t={t} tt={tt} p={{ text, w: 0.9, h: 0.5, bg: color, color: INK, size: 0.78, weight: 900 }} /></group>
    </group>
  );
};

export const EXTRA = { stage: Stage, paper: Paper, piece: Piece, sheets: Sheets, led: Led, line83: Line83, lolli: Lolli, gauge: Gauge, fall: Fall, warn: Warn, vote: Vote };
