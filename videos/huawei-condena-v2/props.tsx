import React from 'react';
import * as THREE from 'three';
import { M, Label, useTex } from '../../src/kit/Props';
import { clamp, eio, eo, lerp } from '../../src/kit/math';

// Look propio de la versión 2 (el original era neón violeta: tribunal, chips, monedas, pantallas).
// Acá: invierno en Vancouver. Azul noche y hielo, una sola luz cálida ámbar por plano, rojo solo para "culpable".
// Sets: sala de embarque de noche con nieve en el ventanal, sala del jurado de madera clara y verde pino,
// hall de banco de mármol, mesa con mapa del Pacífico, mesa de trabajo, celda de hormigón y escalinata de tribunal.
// Metáfora que abre y cierra: la fila de sillas de la sala de embarque; en el cierre la silla de Meng queda vacía
// y la ocupa la caja de la empresa frente al calendario de septiembre de 2027. Nada de logos reales.
type P = { t: number; tt: number; p: any };
type V3 = [number, number, number];
const B: React.FC<{ s: V3; pos?: V3; rot?: V3; c: string; e?: string; ei?: number; o?: number }> = ({ s, pos, rot, c, e, ei, o }) => (
  <mesh position={pos} rotation={rot}><boxGeometry args={s} /><M c={c} e={e} ei={ei} o={o} /></mesh>
);
const Flat: React.FC<{ s: [number, number]; pos?: V3; rot?: V3; c?: string; map?: THREE.Texture; o?: number }> = ({ s, pos, rot, c = '#fff', map, o }) => (
  <mesh position={pos} rotation={rot}><planeGeometry args={s} /><meshBasicMaterial color={c} map={map} toneMapped={false} transparent={o !== undefined} opacity={o ?? 1} /></mesh>
);
const Cyl: React.FC<{ r: number; h: number; pos?: V3; rot?: V3; c: string; e?: string; ei?: number; seg?: number; r2?: number }> = ({ r, h, pos, rot, c, e, ei, seg = 10, r2 }) => (
  <mesh position={pos} rotation={rot}><cylinderGeometry args={[r2 ?? r, r, h, seg]} /><M c={c} e={e} ei={ei} /></mesh>
);
const seeded = (seed: number) => { let s = seed; return () => ((s = (s * 9301 + 49297) % 233280) / 233280); };

export const NAVY = '#0b1a2b', NAVY2 = '#13263d', ICE = '#dfe9f2', STEEL = '#6f8aa3', AMBER = '#ffb000', RED = '#d7263d',
  PINE = '#16352c', MAPLE = '#d9b98a', MARBLE = '#e9e6df', SNOW = '#f4f8fb', COAT = '#b5835a', INKB = 'rgba(8,18,30,.92)';

/* ---------- Escenarios (se apoyan sobre el set 'room' y lo tapan) ---------- */
const Snow: React.FC<{ t: number; w: number; h: number; y0: number; z: number; n?: number }> = ({ t, w, h, y0, z, n = 70 }) => {
  const r = seeded(11); const fl = Array.from({ length: n }, () => [r(), r(), 0.3 + r() * 0.5, r()]);
  return (<group>{fl.map(([x, y, sp, ph], i) => {
    const yy = y0 + h - (((y + t * sp * 0.35) % 1) * h); const xx = -w / 2 + x * w + Math.sin(t * 1.3 + ph * 6) * 0.06;
    return <mesh key={i} position={[xx, yy, z]}><planeGeometry args={[0.045, 0.045]} /><meshBasicMaterial color={SNOW} toneMapped={false} /></mesh>; })}</group>);
};

export const Stage: React.FC<P> = ({ t, p }) => {
  const kind = p.kind ?? 'gate';
  const carpet = useTex((g, W, H) => {
    g.fillStyle = '#1d3552'; g.fillRect(0, 0, W, H);
    for (let y = 0; y < H; y += 32) for (let x = 0; x < W; x += 32) { g.fillStyle = (x + y) % 64 ? '#22405f' : '#19304a'; g.fillRect(x, y, 30, 30); }
    g.fillStyle = 'rgba(223,233,242,.25)'; for (let y = 16; y < H; y += 64) for (let x = 16; x < W; x += 64) g.fillRect(x - 3, y - 3, 6, 6);
  }, 512, 512, 'hw2carpet');
  const night = useTex((g, W, H) => {
    const gr = g.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, '#050c18'); gr.addColorStop(0.62, '#173252'); gr.addColorStop(1, '#27496b');
    g.fillStyle = gr; g.fillRect(0, 0, W, H);
    g.fillStyle = '#081324'; for (let i = 0; i < 9; i++) { const x = i * 60; g.beginPath(); g.moveTo(x - 50, H * 0.7); g.lineTo(x + 20, H * (0.45 + (i % 3) * 0.06)); g.lineTo(x + 90, H * 0.7); g.fill(); }
    g.fillStyle = '#e8eef4'; g.fillRect(0, H * 0.74, W, H * 0.26);
    g.fillStyle = '#c5d2de'; g.fillRect(0, H * 0.82, W, 6);
    for (let i = 0; i < 40; i++) { g.fillStyle = i % 3 ? '#ffb347' : '#9fd0ff'; g.fillRect(8 + i * 13, H * 0.79 + (i % 2) * 8, 6, 4); }
  }, 512, 256, 'hw2night');
  if (kind === 'gate') return (
    <group>
      <pointLight position={[0, 3.2, 2.6]} intensity={20} color="#d8e8ff" distance={12} />
      <pointLight position={[-2.2, 1.6, 0.6]} intensity={9} color={AMBER} distance={6} />
      <Flat s={[24, 24]} pos={[0, 0.02, 0]} rot={[-Math.PI / 2, 0, 0]} map={carpet} />
      <B s={[12, 0.5, 0.2]} pos={[0, 0.25, -3.75]} c="#26384d" />
      <Flat s={[9, 1.3]} pos={[0, 1.15, -3.64]} map={night} />
      <Snow t={t} w={8.6} h={1.2} y0={0.55} z={-3.6} />
      <group position={[1.6, 1.25, -5.0]} rotation={[0, -0.35, 0]} scale={0.75}>
        <Cyl r={0.34} h={4.4} rot={[0, 0, Math.PI / 2]} c="#c9d3dc" /><B s={[1.0, 0.06, 4.4]} pos={[0.2, -0.08, 0]} c="#aebbc7" />
        <B s={[0.55, 1.0, 0.06]} pos={[-2.0, 0.55, 0]} c={RED} />
        {Array.from({ length: 10 }, (_, i) => <B key={i} s={[0.1, 0.08, 0.02]} pos={[-1.2 + i * 0.26, 0.1, 0.34]} c={AMBER} e={AMBER} ei={1.2} />)}
      </group>
      {[-4.5, -3, -1.5, 0, 1.5, 3, 4.5].map((x) => <B key={x} s={[0.1, 1.4, 0.14]} pos={[x, 1.15, -3.56]} c="#0e1724" />)}
      <B s={[12, 0.12, 0.16]} pos={[0, 1.84, -3.56]} c="#0e1724" />
      <B s={[12, 6.9, 0.2]} pos={[0, 5.35, -3.66]} c={NAVY} />
      {[-4.3, 4.3].map((x) => <B key={x} s={[0.2, 9, 12]} pos={[x, 4.5, 0]} c={NAVY2} />)}
      {p.sign && <group position={[p.signX ?? -2.35, 1.45, -3.0]}>
        <B s={[0.03, 0.5, 0.03]} pos={[0, 0.42, 0]} c="#556" />
        <Label t={t} tt={0} p={{ text: p.sign, w: 1.25, h: 0.32, bg: ICE, color: NAVY, size: 0.62, weight: 900, depth: 0.05 }} />
      </group>}
    </group>
  );
  if (kind === 'jury') {
    const parquet = useTex((g, W, H) => {
      for (let y = 0; y < 16; y++) for (let x = 0; x < 8; x++) { g.fillStyle = ['#caa06a', '#bf9460', '#d4ac76'][(x + y * 3) % 3]; g.fillRect(x * (W / 8) + ((y % 2) * W) / 16, y * (H / 16), W / 8 - 2, H / 16 - 2); }
    }, 512, 512, 'hw2parq');
    return (
      <group>
        <pointLight position={[0, 3.6, 2.2]} intensity={22} color="#fff4e2" distance={12} />
        <pointLight position={[2.4, 2.0, -1.5]} intensity={8} color={AMBER} distance={6} />
        <Flat s={[24, 24]} pos={[0, 0.02, 0]} rot={[-Math.PI / 2, 0, 0]} map={parquet} c="#5a4a3a" />
        <B s={[12, 0.8, 0.2]} pos={[0, 0.4, -3.75]} c={MAPLE} />
        <B s={[12, 0.08, 0.26]} pos={[0, 0.82, -3.7]} c="#9c7a4c" />
        <B s={[12, 8.4, 0.2]} pos={[0, 5.0, -3.78]} c={PINE} />
        
        {[-4.3, 4.3].map((x) => <B key={x} s={[0.2, 9, 12]} pos={[x, 4.5, 0]} c="#1b3e33" />)}
        <group position={[2.8, 1.6, -3.64]}>
          <Cyl r={0.34} h={0.06} rot={[Math.PI / 2, 0, 0]} c="#f2ecdf" seg={20} />
          <B s={[0.03, 0.26, 0.02]} pos={[0, 0.1, 0.05]} c="#222" />
          <group rotation={[0, 0, -t * 1.2]} position={[0, 0, 0.06]}><B s={[0.02, 0.3, 0.02]} pos={[0, 0.13, 0]} c={RED} /></group>
        </group>
      </group>
    );
  }
  if (kind === 'bank') {
    const tiles = useTex((g, W, H) => {
      for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++) { g.fillStyle = (x + y) % 2 ? '#e9e6df' : '#1f4a3e'; g.fillRect(x * W / 8, y * H / 8, W / 8, H / 8); }
      g.strokeStyle = 'rgba(255,255,255,.15)'; g.lineWidth = 2; for (let i = 0; i < 30; i++) { g.beginPath(); g.moveTo((i * 71) % W, (i * 37) % H); g.lineTo((i * 71 + 40) % W, (i * 37 + 25) % H); g.stroke(); }
    }, 512, 512, 'hw2tiles');
    return (
      <group>
        <pointLight position={[0, 3.5, 2.5]} intensity={22} color="#f3f6ff" distance={12} />
        <pointLight position={[-2.2, 2.2, -1.8]} intensity={9} color={AMBER} distance={6} />
        <Flat s={[24, 24]} pos={[0, 0.02, 0]} rot={[-Math.PI / 2, 0, 0]} map={tiles} />
        <B s={[12, 1.4, 0.2]} pos={[0, 0.7, -3.75]} c={MARBLE} />
        <B s={[12, 0.1, 0.28]} pos={[0, 1.42, -3.7]} c="#b8964e" />
        <B s={[12, 8, 0.2]} pos={[0, 5.45, -3.78]} c="#0f2a24" />
        {[-3.3, -1.1, 1.1, 3.3].map((x) => <group key={x} position={[x, 0, -3.3]}>
          <B s={[0.6, 0.2, 0.6]} pos={[0, 0.1, 0]} c="#cfcac0" /><Cyl r={0.22} h={4} pos={[0, 2.2, 0]} c="#1f4a3e" seg={12} /><B s={[0.6, 0.2, 0.6]} pos={[0, 4.25, 0]} c="#cfcac0" /></group>)}
        {[-4.3, 4.3].map((x) => <B key={x} s={[0.2, 9, 12]} pos={[x, 4.5, 0]} c="#173a32" />)}
      </group>
    );
  }
  if (kind === 'map' || kind === 'bench') {
    const wood = useTex((g, W, H) => {
      for (let i = 0; i < 12; i++) { g.fillStyle = i % 2 ? '#4a3424' : '#553c29'; g.fillRect(0, (i * H) / 12, W, H / 12 + 1); }
    }, 256, 256, 'hw2wood');
    return (
      <group>
        <pointLight position={[0, 3.4, 0.6]} intensity={26} color="#ffe2b0" distance={9} />
        <pointLight position={[0, 3.0, 3.0]} intensity={8} color="#bcd6ff" distance={10} />
        <Flat s={[24, 24]} pos={[0, 0.02, 0]} rot={[-Math.PI / 2, 0, 0]} c="#0d1726" />
        <B s={[12, 9, 0.2]} pos={[0, 4.5, -3.75]} c={NAVY} />
        {[-4.3, 4.3].map((x) => <B key={x} s={[0.2, 9, 12]} pos={[x, 4.5, 0]} c={NAVY2} />)}
        {kind === 'bench' && <group>
          <B s={[6, 2.0, 0.06]} pos={[0, 1.95, -2.2]} c="#22374f" />
          {Array.from({ length: 96 }, (_, i) => <mesh key={i} position={[-2.8 + (i % 16) * 0.37, 1.1 + Math.floor(i / 16) * 0.33, -2.16]}><circleGeometry args={[0.03, 6]} /><meshBasicMaterial color="#0c1626" /></mesh>)}
        </group>}
        {/* mesa */}
        <B s={[3.8, 0.12, 2.4]} pos={[0, 0.9, 0]} c="#3b2a1d" />
        <Flat s={[3.8, 2.4]} pos={[0, 0.962, 0]} rot={[-Math.PI / 2, 0, 0]} map={wood} />
        {[[-1.7, -1.0], [1.7, -1.0], [-1.7, 1.0], [1.7, 1.0]].map(([x, z]) => <B key={x + '' + z} s={[0.12, 0.9, 0.12]} pos={[x, 0.45, z]} c="#2a1e15" />)}
        {/* lámpara colgante */}
        <B s={[0.02, 1.4, 0.02]} pos={[0, 4.2, 0.2]} c="#111" />
        <Cyl r={0.42} h={0.32} r2={0.14} pos={[0, 3.4, 0.2]} c="#1f2f42" e={AMBER} ei={0.25} seg={12} />
      </group>
    );
  }
  if (kind === 'cell') {
    const conc = useTex((g, W, H) => {
      g.fillStyle = '#8a9097'; g.fillRect(0, 0, W, H); const r = seeded(5);
      for (let i = 0; i < 900; i++) { g.fillStyle = r() > 0.5 ? '#7d838a' : '#959ba2'; g.fillRect(r() * W, r() * H, 4, 4); }
      g.strokeStyle = 'rgba(40,44,50,.4)'; g.lineWidth = 3; for (let y = 0; y < H; y += 64) { g.beginPath(); g.moveTo(0, y); g.lineTo(W, y); g.stroke(); }
    }, 512, 512, 'hw2conc');
    return (
      <group>
        <pointLight position={[0, 3.4, 2.4]} intensity={20} color="#dfe9f2" distance={12} />
        <pointLight position={[1.6, 1.8, 0.8]} intensity={9} color={AMBER} distance={6} />
        <Flat s={[24, 24]} pos={[0, 0.02, 0]} rot={[-Math.PI / 2, 0, 0]} c="#5b6168" />
        <mesh position={[0, 1.0, -3.75]}><planeGeometry args={[9, 2.0]} /><meshStandardMaterial map={conc} flatShading /></mesh>
        <B s={[12, 7.6, 0.2]} pos={[0, 5.8, -3.8]} c="#141c26" />
        <B s={[12, 0.05, 0.1]} pos={[0, 2.02, -3.68]} c={ICE} e={ICE} ei={0.4} />
        {[-4.3, 4.3].map((x) => <B key={x} s={[0.2, 9, 12]} pos={[x, 4.5, 0]} c="#2a333d" />)}
      </group>
    );
  }
  // steps: escalinata de tribunal de noche
  const sky = useTex((g, W, H) => {
    const gr = g.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, '#050b16'); gr.addColorStop(1, '#1e3a5c'); g.fillStyle = gr; g.fillRect(0, 0, W, H);
    g.fillStyle = '#0a1424'; for (let i = 0; i < 14; i++) { const h = 40 + ((i * 37) % 90); g.fillRect(i * 38, H - h, 34, h); }
    for (let i = 0; i < 60; i++) { g.fillStyle = i % 4 ? '#ffcf73' : '#a9d3ff'; g.fillRect(4 + ((i * 53) % 520), H - 10 - ((i * 29) % 80), 4, 5); }
  }, 512, 256, 'hw2sky');
  return (
    <group>
      <pointLight position={[0, 3.2, 3.0]} intensity={22} color="#e6eeff" distance={12} />
      <pointLight position={[-1.8, 1.4, 1.2]} intensity={10} color={AMBER} distance={6} />
      <Flat s={[24, 24]} pos={[0, 0.02, 0]} rot={[-Math.PI / 2, 0, 0]} c="#3a4350" />
      <Flat s={[9, 8]} pos={[0, 4, -3.86]} map={sky} />
      {Array.from({ length: 5 }, (_, i) => <B key={i} s={[7, 0.3 * (i + 1), 0.55]} pos={[0, 0.15 * (i + 1), -0.2 - i * 0.55]} c={i % 2 ? '#c9cdd3' : '#bcc1c8'} />)}
      <B s={[7, 1.5, 1.2]} pos={[0, 0.75, -3.15]} c="#c9cdd3" />
      {[-2.4, -1.2, 0, 1.2, 2.4].map((x) => <group key={x} position={[x, 1.5, -3.35]}>
        <Cyl r={0.22} h={2.6} pos={[0, 1.3, 0]} c="#4d5560" seg={12} /></group>)}
      <B s={[6.4, 0.35, 0.6]} pos={[0, 4.25, -3.35]} c="#3a414b" />
    </group>
  );
};

/* ---------- Fila de sillas de embarque. p: n, empty (índice que brilla), glow (segundos) ---------- */
export const Seats: React.FC<P> = ({ t, p }) => {
  const { n = 4, gap = 0.62, empty, glow = 0, c = '#2f5d8a' } = p; const tot = (n - 1) * gap; const k = clamp((t - glow) / 0.4);
  return (<group>
    <B s={[tot + 0.6, 0.06, 0.08]} pos={[0, 0.3, 0]} c="#9aa7b4" />
    {[-tot / 2, tot / 2].map((x) => <B key={x} s={[0.06, 0.3, 0.5]} pos={[x, 0.15, 0]} c="#9aa7b4" />)}
    {Array.from({ length: n }, (_, i) => { const x = -tot / 2 + i * gap; const hi = empty === i;
      return <group key={i} position={[x, 0, 0]}>
        <B s={[0.52, 0.1, 0.5]} pos={[0, 0.42, 0]} c={hi ? lerp(0, 1, k) > 0.5 ? '#3f7bb5' : c : c} e={hi ? AMBER : undefined} ei={hi ? 0.35 * k : 0} />
        <B s={[0.52, 0.55, 0.08]} pos={[0, 0.72, -0.24]} rot={[-0.12, 0, 0]} c={c} e={hi ? AMBER : undefined} ei={hi ? 0.35 * k : 0} />
        <B s={[0.06, 0.2, 0.42]} pos={[0.29, 0.56, 0]} c="#9aa7b4" />
      </group>; })}
  </group>);
};

/* ---------- Valija con ruedas ---------- */
export const Bag: React.FC<P> = ({ p }) => {
  const { color = '#7b2d3a' } = p;
  return (<group>
    <B s={[0.38, 0.55, 0.24]} pos={[0, 0.36, 0]} c={color} />
    {[-0.1, 0.1].map((x) => <B key={x} s={[0.02, 0.5, 0.25]} pos={[x, 0.36, 0]} c="#00000055" />)}
    <B s={[0.03, 0.35, 0.03]} pos={[-0.1, 0.8, -0.08]} c="#888" /><B s={[0.03, 0.35, 0.03]} pos={[0.1, 0.8, -0.08]} c="#888" /><B s={[0.24, 0.04, 0.04]} pos={[0, 0.97, -0.08]} c="#333" />
    {[-0.14, 0.14].map((x) => <Cyl key={x} r={0.04} h={0.04} pos={[x, 0.05, 0]} rot={[0, 0, Math.PI / 2]} c="#111" />)}
  </group>);
};

/* ---------- Caja de la empresa (nombre en texto plano). p: tape (segundos de plano en que aparece la cinta roja), w ---------- */
export const HBox: React.FC<P> = ({ t, tt, p }) => {
  const { w = 0.9, tape, name = 'HUAWEI', glow } = p; const h = w * 0.8; const k = tape !== undefined ? eo((t - tape) / 0.35) : 0;
  return (<group>
    <B s={[w, h, w * 0.8]} pos={[0, h / 2, 0]} c="#c9b28a" />
    <B s={[w * 1.01, 0.05, w * 0.81]} pos={[0, h - 0.025, 0]} c="#b39a70" />
    <group position={[0, h * 0.5, w * 0.4 + 0.006]}>
      <Label t={t} tt={tt} p={{ text: name, w: w * 0.86, h: h * 0.34, bg: glow ? RED : '#f6efe0', color: glow ? '#fff' : '#2a1d12', size: 0.7, weight: 900, depth: 0 }} />
    </group>
    {k > 0 && <group scale={[1, 1, 1]}>
      <B s={[w * 1.06 * k, 0.1, w * 0.84]} pos={[0, h * 0.18, 0]} c={RED} e={RED} ei={0.3} />
      <B s={[0.1, h * 1.04 * k, w * 0.84]} pos={[w * 0.33, h / 2, 0]} c={RED} e={RED} ei={0.3} />
    </group>}
  </group>);
};

/* ---------- Mesa del jurado: 12 sillas y 12 papeletas que se dan vuelta. p: flip (segundos), step, glow ---------- */
export const Jury: React.FC<P> = ({ t, p }) => {
  const { flip = 1, step = 0.11, glow } = p; const g = glow !== undefined ? clamp((t - glow) / 0.3) : 0;
  const seat = (x: number, z: number, ry: number, i: number) => (<group key={'s' + i} position={[x, 0, z]} rotation={[0, ry, 0]}>
    <B s={[0.36, 0.06, 0.36]} pos={[0, 0.48, 0]} c="#2c5a4a" /><B s={[0.36, 0.45, 0.06]} pos={[0, 0.72, -0.17]} c="#2c5a4a" />
    {[[-0.15, -0.15], [0.15, -0.15], [-0.15, 0.15], [0.15, 0.15]].map(([a, b]) => <B key={a + '' + b} s={[0.04, 0.48, 0.04]} pos={[a, 0.24, b]} c="#6d4f2e" />)}
  </group>);
  const seats = [] as React.ReactNode[]; let n = 0;
  for (let i = 0; i < 5; i++) { const x = -1.32 + i * 0.66; seats.push(seat(x, -0.95, 0, n++)); seats.push(seat(x, 0.95, Math.PI, n++)); }
  seats.push(seat(-1.95, 0, Math.PI / 2, n++)); seats.push(seat(1.95, 0, -Math.PI / 2, n++));
  return (<group>
    <B s={[3.4, 0.1, 1.3]} pos={[0, 0.78, 0]} c="#b88e5a" />
    {[[-1.5, -0.5], [1.5, -0.5], [-1.5, 0.5], [1.5, 0.5]].map(([x, z]) => <B key={x + '' + z} s={[0.1, 0.78, 0.1]} pos={[x, 0.39, z]} c="#7a5a35" />)}
    {seats}
    {Array.from({ length: 12 }, (_, i) => {
      const x = -1.25 + (i % 6) * 0.5, z = i < 6 ? -0.3 : 0.3; const ft = flip + i * step; const k = eio((t - ft) / 0.25); const guilty = i < 10;
      const col = guilty ? RED : '#9aa7b4';
      return <group key={i} position={[x, 0.84, z]} rotation={[0, 0, Math.PI * (1 - k)]}>
        <B s={[0.36, 0.02, 0.48]} c={k > 0.5 ? col : '#f3efe6'} e={k > 0.5 && guilty ? RED : undefined} ei={0.25 + g * 0.6} />
        {k > 0.5 && (guilty
          ? <group position={[0, 0.015, 0]}><B s={[0.3, 0.012, 0.05]} rot={[0, Math.PI / 4, 0]} c="#fff" /><B s={[0.3, 0.012, 0.05]} rot={[0, -Math.PI / 4, 0]} c="#fff" /></group>
          : <mesh position={[0, 0.015, 0]} rotation={[-Math.PI / 2, 0, 0]}><ringGeometry args={[0.08, 0.12, 16]} /><meshBasicMaterial color="#fff" /></mesh>)}
      </group>; })}
  </group>);
};

/* ---------- Ventanilla de banco con reja de bronce ---------- */
export const Teller: React.FC<P> = () => (
  <group>
    <B s={[3.2, 1.05, 0.6]} pos={[0, 0.525, 0]} c="#e2ddd2" />
    <B s={[3.3, 0.08, 0.7]} pos={[0, 1.09, 0]} c="#1f4a3e" />
    {Array.from({ length: 15 }, (_, i) => <B key={i} s={[0.03, 0.95, 0.03]} pos={[-1.5 + i * (3 / 14), 1.6, -0.2]} c="#b8964e" e="#4a3a10" ei={0.4} />)}
    <B s={[3.1, 0.05, 0.05]} pos={[0, 2.08, -0.2]} c="#b8964e" />
    <B s={[0.8, 0.05, 0.05]} pos={[0.1, 1.42, -0.2]} c="#b8964e" />
  </group>
);

/* ---------- Hoja: renglones; p.redact (segundos) tapa renglones con barras negras; p.sign agrega firma ---------- */
export const Paper: React.FC<P> = ({ t, p }) => {
  const { w = 0.7, h = 0.9, redact, sign, lines = 7 } = p; const k = redact !== undefined ? clamp((t - redact) / 0.5) : 0; const ks = sign !== undefined ? clamp((t - sign) / 0.5) : 0;
  return (<group>
    <B s={[w, h, 0.01]} c="#fbf8f0" />
    {Array.from({ length: lines }, (_, i) => { const lw = (w * 0.78) * (i % 3 === 2 ? 0.6 : 1); const y = h * 0.36 - i * (h * 0.72) / (lines - 1);
      const hide = i >= 2 && i <= 4; const kk = hide ? clamp(k * 3 - (i - 2)) : 0;
      return <group key={i}><B s={[lw, 0.022, 0.012]} pos={[-(w * 0.78 - lw) / 2, y, 0.006]} c="#8a94a0" />
        {kk > 0 && <B s={[w * 0.84 * kk, 0.075, 0.014]} pos={[-w * 0.42 + (w * 0.84 * kk) / 2, y, 0.01]} c="#0b0b0f" />}</group>; })}
    {ks > 0 && <B s={[w * 0.5 * ks, 0.03, 0.014]} pos={[-w * 0.1 + (w * 0.5 * ks) / 2 - w * 0.15, -h * 0.4, 0.01]} rot={[0, 0, 0.15]} c="#1a3a8a" />}
  </group>);
};

/* ---------- Banderín con texto sobre un palito ---------- */
export const Pin: React.FC<P> = ({ t, tt, p }) => {
  const { text = '', color = RED, h = 0.6, side = 1 } = p;
  return (<group>
    <mesh position={[0, 0.03, 0]}><sphereGeometry args={[0.06, 10, 8]} /><M c={color} e={color} ei={1} /></mesh>
    <B s={[0.025, h, 0.025]} pos={[0, h / 2, 0]} c="#e6e6e6" />
    <group position={[side * 0.36, h - 0.12, 0]}><Label t={t} tt={tt} p={{ text, w: 0.68, h: 0.22, bg: color, color: '#fff', size: 0.66, weight: 900, depth: 0.02 }} /></group>
  </group>);
};

/* ---------- Mapa del Pacífico sobre la mesa (vista cenital). Asia a la izquierda, América del Norte a la derecha ---------- */
export const MapTop: React.FC<P> = () => {
  const tx = useTex((g, W, H) => {
    g.fillStyle = '#2a5d7c'; g.fillRect(0, 0, W, H);
    g.strokeStyle = 'rgba(255,255,255,.08)'; g.lineWidth = 2; for (let x = 0; x < W; x += 64) { g.beginPath(); g.moveTo(x, 0); g.lineTo(x, H); g.stroke(); } for (let y = 0; y < H; y += 64) { g.beginPath(); g.moveTo(0, y); g.lineTo(W, y); g.stroke(); }
    g.fillStyle = '#e8dfc7';
    const poly = (pts: number[][]) => { g.beginPath(); g.moveTo(pts[0][0] * W, pts[0][1] * H); pts.slice(1).forEach(([x, y]) => g.lineTo(x * W, y * H)); g.closePath(); g.fill(); };
    poly([[0, 0.05], [0.3, 0.02], [0.33, 0.2], [0.28, 0.32], [0.3, 0.45], [0.24, 0.6], [0.2, 0.72], [0.12, 0.8], [0, 0.85]]);
    poly([[0.34, 0.42], [0.37, 0.38], [0.38, 0.5], [0.35, 0.55]]);
    poly([[0.64, 0.02], [1, 0.02], [1, 0.9], [0.9, 0.85], [0.8, 0.74], [0.74, 0.62], [0.7, 0.42], [0.66, 0.3], [0.6, 0.18]]);
    g.strokeStyle = '#b9ac8c'; g.lineWidth = 3; g.setLineDash([10, 8]); g.beginPath(); g.moveTo(0.66 * W, 0.3 * H); g.lineTo(1 * W, 0.3 * H); g.stroke(); g.setLineDash([]);
    g.fillStyle = '#5d6b5a'; g.font = '800 34px Poppins'; g.textAlign = 'center';
    g.fillText('CHINA', 0.15 * W, 0.42 * H); g.fillText('CANADÁ', 0.85 * W, 0.2 * H); g.fillText('EE.UU.', 0.86 * W, 0.5 * H);
    g.fillStyle = 'rgba(255,255,255,.35)'; g.font = '700 26px Poppins'; g.fillText('OCÉANO PACÍFICO', 0.5 * W, 0.62 * H);
  }, 1024, 640, 'hw2map');
  return <Flat s={[3.5, 2.2]} rot={[-Math.PI / 2, 0, 0]} map={tx} />;
};

/* ---------- Avión de juguete que viaja en arco. p: from, to (xz), at, dur, h ---------- */
export const Plane: React.FC<P> = ({ t, p }) => {
  const { from = [1, 0], to = [-1, 0], at = 0, dur = 1.2, h = 0.5 } = p; const k = eio((t - at) / dur);
  const x = lerp(from[0], to[0], k), z = lerp(from[1], to[1], k), y = Math.sin(Math.PI * k) * h; const ang = Math.atan2(-(to[1] - from[1]), to[0] - from[0]);
  return (<group position={[x, y, z]} rotation={[0, ang, 0]}>
    <Cyl r={0.06} h={0.5} rot={[0, 0, Math.PI / 2]} c={ICE} />
    <B s={[0.14, 0.015, 0.5]} c="#c4d0dc" /><B s={[0.08, 0.12, 0.015]} pos={[-0.22, 0.07, 0]} c={RED} />
    {/* estela */}
    {Array.from({ length: 6 }, (_, i) => <mesh key={i} position={[-0.32 - i * 0.12, 0, 0]}><sphereGeometry args={[0.03 - i * 0.004, 6, 4]} /><meshBasicMaterial color="#fff" transparent opacity={0.6 - i * 0.09} /></mesh>)}
  </group>);
};

/* ---------- Teléfono parado con grilla de apps genéricas que se van. p.gone (segundos) ---------- */
export const Phone2: React.FC<P> = ({ t, p }) => {
  const { gone = 1 } = p; const cols = ['#e8505b', '#f9b234', '#3fb68b', '#4c8ef7', '#9b6bd6', '#f37d3b', '#2bb3c0', '#d9d9d9'];
  return (<group>
    <B s={[1.1, 2.0, 0.1]} pos={[0, 1.0, 0]} c="#10161f" />
    <Flat s={[0.98, 1.82]} pos={[0, 1.0, 0.052]} c="#1e3550" />
    {Array.from({ length: 12 }, (_, i) => { const cx = -0.3 + (i % 3) * 0.3, cy = 1.6 - Math.floor(i / 3) * 0.34; const st = gone + (i % 6) * 0.06; const k = eo((t - st) / 0.5);
      return <group key={i} position={[cx + k * (i % 3 - 1) * 0.9, cy + k * 0.8, 0.07 + k * 0.6]} rotation={[k * 1.5, k * (i % 2 ? 1 : -1), 0]} scale={1 - k * 0.6}>
        <B s={[0.2, 0.2, 0.03]} c={cols[i % cols.length]} o={1 - clamp((t - st - 0.3) / 0.25)} /></group>; })}
    <B s={[0.3, 0.03, 0.02]} pos={[0, 0.17, 0.055]} c="#556" />
  </group>);
};

/* ---------- Chip con patas ---------- */
export const Chip: React.FC<P> = ({ p }) => {
  const { s = 0.6 } = p;
  return (<group>
    <B s={[s, 0.08, s]} pos={[0, 0.06, 0]} c="#1d232b" />
    <B s={[s * 0.55, 0.02, s * 0.55]} pos={[0, 0.11, 0]} c="#b8c3cf" e="#6f8aa3" ei={0.3} />
    {Array.from({ length: 6 }, (_, i) => [-1, 1].map((sd) => <group key={i + '' + sd}>
      <B s={[0.03, 0.03, 0.1]} pos={[-s * 0.4 + i * s * 0.16, 0.04, sd * (s / 2 + 0.04)]} c="#c9a24a" />
      <B s={[0.1, 0.03, 0.03]} pos={[sd * (s / 2 + 0.04), 0.04, -s * 0.4 + i * s * 0.16]} c="#c9a24a" /></group>))}
  </group>);
};

/* ---------- Dos columnas de lingotes: récord 2020 contra 2025 (98,9%). p: a (seg), b (seg), line (seg) ---------- */
export const Ingots: React.FC<P> = ({ t, tt, p }) => {
  const { a = 0, b = 0.6, line, H = 2.3 } = p; const hA = H, hB = H * 0.989; const n = 10;
  const col = (x: number, hh: number, st: number, c: string, lab: string) => {
    const k = eo((t - st) / 0.9); const hv = hh * k;
    return (<group position={[x, 0, 0]}>
      {Array.from({ length: n }, (_, i) => { const y0 = (i * hh) / n; if (y0 >= hv) return null; const hi = Math.min(hh / n - 0.02, hv - y0);
        return <B key={i} s={[0.8, hi, 0.55]} pos={[0, y0 + hi / 2, 0]} c={i % 2 ? c : '#e3b64f'} e="#5a3d00" ei={0.25} />; })}
      <group position={[0, Math.max(0.2, hv * 0.5), 0.3]}><Label t={t} tt={tt} p={{ text: lab, w: 0.9, h: 0.3, bg: NAVY, color: ICE, size: 0.7, weight: 900, depth: 0.03 }} /></group>
    </group>);
  };
  const kl = line !== undefined ? clamp((t - line) / 0.4) : 0;
  return (<group position={[0, 0.3, 0]}>
    <B s={[2.4, 0.3, 0.9]} pos={[0, -0.15, 0]} c="#1d2c3e" />
    {col(-0.6, hA, a, '#d9a43a', '2020')}
    {col(0.6, hB, b, '#d9a43a', '2025')}
    {kl > 0 && <B s={[2.4 * kl, 0.035, 0.035]} pos={[-1.2 + 1.2 * kl, hA + 0.03, 0.3]} c={AMBER} e={AMBER} ei={2} />}
  </group>);
};

/* ---------- Carpeta de expediente con sello que baja. p: color, stamp (segundos) ---------- */
export const Folder: React.FC<P> = ({ t, p }) => {
  const { color = '#c9a86a', stamp } = p; const ks = stamp !== undefined ? t - stamp : -1;
  const down = ks < 0 ? 1 : ks < 0.15 ? 1 - ks / 0.15 : ks < 0.45 ? 0 : clamp((ks - 0.45) / 0.3);
  return (<group>
    <B s={[0.9, 0.05, 0.65]} pos={[0, 0.025, 0]} c={color} />
    <B s={[0.3, 0.05, 0.1]} pos={[-0.25, 0.025, -0.36]} c={color} />
    <B s={[0.8, 0.012, 0.56]} pos={[0, 0.056, 0]} c="#f5f1e6" />
    {ks >= 0.15 && <B s={[0.36, 0.008, 0.24]} pos={[0.1, 0.066, 0.05]} rot={[0, 0.2, 0]} c={RED} e={RED} ei={0.5} />}
    {stamp !== undefined && ks > -0.35 && ks < 1 && <group position={[0.1, 0.08 + (ks < 0 ? -ks / 0.35 * 0.5 + 0.4 : down * 0.4), 0.05]} rotation={[0, 0.2, 0]}>
      <B s={[0.38, 0.06, 0.26]} pos={[0, 0.03, 0]} c={RED} /><B s={[0.3, 0.1, 0.2]} pos={[0, 0.11, 0]} c="#3a2a1d" />
      <Cyl r={0.05} h={0.3} pos={[0, 0.3, 0]} c="#3a2a1d" /><mesh position={[0, 0.5, 0]}><sphereGeometry args={[0.1, 10, 8]} /><M c="#2a1e15" /></mesh></group>}
  </group>);
};

/* ---------- Reja de celda y catre ---------- */
export const Cell: React.FC<P> = ({ t, p }) => {
  const { w = 2.2, open } = p; const k = open !== undefined ? eio((t - open) / 0.5) : 0;
  return (<group>
    {/* catre al fondo */}
    <B s={[1.5, 0.12, 0.6]} pos={[0, 0.45, -1.0]} c="#596573" /><B s={[1.4, 0.1, 0.55]} pos={[0, 0.56, -1.0]} c="#c7ced6" />
    {[-0.65, 0.65].map((x) => <B key={x} s={[0.06, 0.45, 0.06]} pos={[x, 0.22, -0.8]} c="#3c4652" />)}
    <B s={[0.4, 0.4, 0.04]} pos={[0.2, 2.0, -1.33]} c="#2a333d" />
    {/* reja: la puerta se corre */}
    {Array.from({ length: 9 }, (_, i) => { const x = -w / 2 + (i * w) / 8; const door = i >= 3 && i <= 5;
      return <Cyl key={i} r={0.03} h={2.4} pos={[x + (door ? k * 0.75 : 0), 1.2, 0]} c="#3c4652" seg={6} />; })}
    {[0.1, 1.2, 2.38].map((y) => <B key={y} s={[w + 0.08, 0.06, 0.06]} pos={[0, y, 0]} c="#3c4652" />)}
    {[-w / 2 - 0.05, w / 2 + 0.05].map((x) => <B key={x} s={[0.12, 2.5, 1.6]} pos={[x, 1.25, -0.8]} c="#7d838a" />)}
  </group>);
};

/* ---------- Bolsa de multa (con $) y cajón decomisado (faja roja) ---------- */
export const Sack: React.FC<P> = ({ t, tt }) => {
  const tx = useTex((g, W, H) => { g.clearRect(0, 0, W, H); g.fillStyle = '#2f4a2a'; g.font = '900 190px Poppins'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('$', W / 2, H / 2 + 10); }, 256, 256, 'hw2sack');
  return (<group>
    <mesh position={[0, 0.3, 0]} scale={[1, 0.9, 1]}><icosahedronGeometry args={[0.32, 1]} /><M c="#c8b48a" /></mesh>
    <Cyl r={0.12} h={0.12} r2={0.06} pos={[0, 0.62, 0]} c="#b39f74" />
    <B s={[0.26, 0.04, 0.04]} pos={[0, 0.58, 0]} c={RED} />
    <Flat s={[0.36, 0.36]} pos={[0, 0.3, 0.31]} map={tx} />
  </group>);
};
export const Crate: React.FC<P> = () => (
  <group>
    <B s={[0.7, 0.55, 0.55]} pos={[0, 0.275, 0]} c="#8a6a44" />
    {[-0.2, 0.2].map((x) => <B key={x} s={[0.06, 0.56, 0.57]} pos={[x, 0.275, 0]} c="#6a4e30" />)}
    <B s={[0.72, 0.1, 0.57]} pos={[0, 0.3, 0]} rot={[0, 0, 0.5]} c={RED} e={RED} ei={0.3} />
  </group>
);

/* ---------- Formulario grande con el renglón del monto vacío y cursor que titila ---------- */
export const Form: React.FC<P> = ({ t, tt, p }) => {
  const { cursor = 0 } = p; const on = t > cursor && Math.floor(t * 2.5) % 2 === 0;
  return (<group>
    <B s={[1.5, 1.9, 0.04]} c="#fbf8f0" />
    <group position={[0, 0.72, 0.03]}><Label t={t} tt={tt} p={{ text: 'PEDIDO DE PENA', w: 1.3, h: 0.22, color: NAVY, size: 0.7, weight: 900 }} /></group>
    {[0.4, 0.22, 0.04].map((y, i) => <B key={y} s={[1.15 - i * 0.2, 0.03, 0.01]} pos={[-0.02 - i * 0.1, y, 0.025]} c="#9aa3ad" />)}
    <group position={[-0.38, -0.3, 0.03]}><Label t={t} tt={tt} p={{ text: 'MONTO:', w: 0.6, h: 0.2, color: NAVY, size: 0.72, weight: 900 }} /></group>
    <B s={[0.62, 0.03, 0.01]} pos={[0.33, -0.39, 0.025]} c={NAVY} />
    {on && <B s={[0.03, 0.17, 0.01]} pos={[0.06, -0.3, 0.03]} c={RED} e={RED} ei={1} />}
    {[-0.6, -0.75].map((y, i) => <B key={y} s={[0.9 - i * 0.3, 0.03, 0.01]} pos={[-0.12 - i * 0.15, y, 0.025]} c="#9aa3ad" />)}
    {[-0.6, 0.6].map((x) => <B key={x} s={[0.06, 1.0, 0.06]} pos={[x, -1.3, -0.04]} c="#3b2a1d" />)}
  </group>);
};

/* ---------- Calendario de escritorio (hojas) con mes y día fijos ---------- */
export const DeskCal: React.FC<P> = ({ t, tt, p }) => {
  const { top = 'SEP 2027', day = '14', color = RED, w = 1.3 } = p; const h = w * 1.05;
  return (<group>
    <B s={[w, h, 0.12]} pos={[0, h / 2, 0]} c="#f3f1ea" />
    <B s={[w, h * 0.28, 0.13]} pos={[0, h * 0.86, 0]} c={color} />
    <group position={[0, h * 0.86, 0.07]}><Label t={t} tt={tt} p={{ text: top, w: w * 0.92, h: h * 0.24, color: '#fff', size: 0.62, weight: 900 }} /></group>
    <group position={[0, h * 0.38, 0.065]}><Label t={t} tt={tt} p={{ text: day, w: w * 0.9, h: h * 0.62, color: NAVY, size: 0.78, weight: 900 }} /></group>
    {[-0.3, 0.3].map((x) => <Cyl key={x} r={0.03} h={0.2} pos={[x * w, h, 0]} c="#556" />)}
  </group>);
};

/* ---------- Reloj de pared que avanza ---------- */
export const Clock: React.FC<P> = ({ t }) => (
  <group>
    <Cyl r={0.42} h={0.08} rot={[Math.PI / 2, 0, 0]} c={ICE} seg={24} />
    <Cyl r={0.46} h={0.06} rot={[Math.PI / 2, 0, 0]} pos={[0, 0, -0.02]} c={NAVY2} seg={24} />
    <group position={[0, 0, 0.05]} rotation={[0, 0, -t * 2]}><B s={[0.03, 0.34, 0.02]} pos={[0, 0.15, 0]} c={RED} /></group>
    <group position={[0, 0, 0.05]} rotation={[0, 0, -t * 0.2]}><B s={[0.05, 0.22, 0.02]} pos={[0, 0.1, 0]} c={NAVY} /></group>
  </group>
);

export const EXTRA = { stage: Stage, seats: Seats, bag: Bag, hbox: HBox, jury: Jury, teller: Teller, paper: Paper, pin: Pin, maptop: MapTop, plane: Plane,
  phone2: Phone2, chip: Chip, ingots: Ingots, folder: Folder, cell: Cell, sack: Sack, crate: Crate, form: Form, deskcal: DeskCal, clock: Clock };
