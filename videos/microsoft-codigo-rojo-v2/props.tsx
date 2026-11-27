import React from 'react';
import * as THREE from 'three';
import { M, Label, useTex } from '../../src/kit/Props';
import { clamp, eio, eo, lerp } from '../../src/kit/math';

// Look propio de la versión 2 (el original era neón violeta: edificio con cartel, sobres, globo, memos con lupa, balizas,
// servidores violetas, carteles de capítulo). Acá: oficina abierta de día (alfombra gris azulada, paredes blancas,
// ventanales celestes), datacenter grafito con luces blancas que se pone rojo, sala de operaciones azul marino con pared
// de pantallas y una mesa-mapa. Paleta: pizarra, blanco, rojo señal, ámbar y verde menta. Nada de logos reales.
type P = { t: number; tt: number; p: any };
type V3 = [number, number, number];
const B: React.FC<{ s: V3; pos?: V3; rot?: V3; c: string; e?: string; ei?: number; o?: number }> = ({ s, pos, rot, c, e, ei, o }) => (
  <mesh position={pos} rotation={rot}><boxGeometry args={s} /><M c={c} e={e} ei={ei} o={o} /></mesh>
);
const Flat: React.FC<{ s: [number, number]; pos?: V3; rot?: V3; c?: string; map?: THREE.Texture; o?: number; add?: boolean }> = ({ s, pos, rot, c = '#fff', map, o, add }) => (
  <mesh position={pos} rotation={rot}><planeGeometry args={s} /><meshBasicMaterial color={c} map={map} toneMapped={false} transparent={o !== undefined || add} opacity={o ?? 1}
    depthWrite={!add} blending={add ? THREE.AdditiveBlending : THREE.NormalBlending} /></mesh>
);
const Cyl: React.FC<{ r: number; h: number; pos?: V3; rot?: V3; c: string; e?: string; ei?: number; seg?: number; r2?: number }> = ({ r, h, pos, rot, c, e, ei, seg = 12, r2 }) => (
  <mesh position={pos} rotation={rot}><cylinderGeometry args={[r2 ?? r, r, h, seg]} /><M c={c} e={e} ei={ei} /></mesh>
);

export const SLATE = '#1f2a3a', NAVY = '#13203a', SIG = '#e3262f', AMBER = '#ffb000', MINT = '#2fc98e', SKY = '#8fc6ee',
  PAPER = '#f6f3ea', GRAPH = '#2b3038', STEEL = '#aeb7c2', CARPET = '#9fb0c0', WALLW = '#eef1f4', MANILA = '#e2c57f';

/* ---------- Escenarios (sobre el set 'room', lo tapan entero) ---------- */
export const Stage: React.FC<P> = ({ t, p }) => {
  const kind = p.kind ?? 'office';
  if (kind === 'office') return <Office t={t} p={p} />;
  if (kind === 'dc') return <DataCenter t={t} p={p} />;
  return <Ops t={t} p={p} />;
};

const Office: React.FC<{ t: number; p: any }> = ({ p }) => {
  const carpet = useTex((g, W, H) => {
    g.fillStyle = CARPET; g.fillRect(0, 0, W, H);
    for (let i = 0; i < 8; i++) for (let j = 0; j < 8; j++) { g.fillStyle = (i + j) % 2 ? '#97a9ba' : '#a7b7c6'; g.fillRect((i * W) / 8 + 2, (j * H) / 8 + 2, W / 8 - 4, H / 8 - 4); }
  }, 512, 512, 'mcr2carpet');
  const view = useTex((g, W, H) => {
    const gr = g.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, '#5aa8e6'); gr.addColorStop(0.7, '#bfe2f7'); gr.addColorStop(1, '#e8f4fb');
    g.fillStyle = gr; g.fillRect(0, 0, W, H);
    let s = 5; const r = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
    for (let i = 0; i < 26; i++) { const w = 20 + r() * 40, h = 60 + r() * 150, x = i * (W / 24) - 10; g.fillStyle = ['#7c93ad', '#90a6bf', '#6b829c'][i % 3]; g.fillRect(x, H - h, w, h);
      g.fillStyle = 'rgba(255,255,255,.35)'; for (let k = 0; k < h / 14; k++) g.fillRect(x + 4, H - h + 6 + k * 14, w - 8, 3); }
    g.fillStyle = 'rgba(255,255,255,.8)'; g.beginPath(); g.ellipse(W * 0.25, H * 0.2, 60, 16, 0, 0, 7); g.fill(); g.beginPath(); g.ellipse(W * 0.7, H * 0.13, 80, 14, 0, 0, 7); g.fill();
  }, 1024, 384, 'mcr2view');
  const tint = p.tint ?? '#ffffff';
  return (
    <group>
      <pointLight position={[0, 3.6, 3]} intensity={18} color="#ffffff" distance={13} />
      <pointLight position={[0, 2.5, -2.6]} intensity={10} color="#d8ecff" distance={8} />
      <Flat s={[30, 30]} pos={[0, 0.02, 0]} rot={[-Math.PI / 2, 0, 0]} map={carpet} c={tint} />
      {/* pared del fondo: zócalo pizarra, ventanal corrido con parantes */}
      <B s={[14, 0.9, 0.2]} pos={[0, 0.45, -3.75]} c={SLATE} />
      <Flat s={[12, 2.8]} pos={[0, 2.35, -3.84]} map={view} />
      {[-5, -3.3, -1.65, 0, 1.65, 3.3, 5].map((x) => <B key={x} s={[0.1, 2.9, 0.14]} pos={[x, 2.35, -3.72]} c="#dfe4ea" />)}
      <B s={[14, 0.12, 0.16]} pos={[0, 0.92, -3.7]} c="#dfe4ea" />
      <B s={[14, 0.12, 0.16]} pos={[0, 3.78, -3.7]} c="#dfe4ea" />
      <B s={[14, 5, 0.2]} pos={[0, 6.3, -3.75]} c={WALLW} />
      {[-4.4, 4.4].map((x) => <B key={x} s={[0.2, 9, 14]} pos={[x, 4.5, 0]} c="#e3e8ee" />)}
      {/* techo con paneles de luz */}
      {!p.open && <B s={[9, 0.1, 14]} pos={[0, 4.6, 0]} c="#f3f5f7" />}
      {!p.open && [-2, 0, 2].map((z) => [-1.8, 1.8].map((x) => <Flat key={x + '' + z} s={[1.4, 0.5]} pos={[x, 4.54, z]} rot={[Math.PI / 2, 0, 0]} c="#ffffff" />))}
      {/* planta */}
      <group position={[-3.6, 0, -3.0]}><Cyl r={0.28} h={0.5} r2={0.34} pos={[0, 0.25, 0]} c={SLATE} />
        {[0, 1, 2, 3, 4].map((i) => <mesh key={i} position={[Math.cos(i * 1.3) * 0.2, 0.8 + i * 0.12, Math.sin(i * 1.3) * 0.2]}><icosahedronGeometry args={[0.28, 0]} /><M c={i % 2 ? '#3f8f5a' : '#4fa86a'} /></mesh>)}</group>
      <group position={[3.6, 0, -3.0]}><Cyl r={0.28} h={0.5} r2={0.34} pos={[0, 0.25, 0]} c={SLATE} />
        {[0, 1, 2, 3].map((i) => <mesh key={i} position={[Math.cos(i * 1.7) * 0.2, 0.8 + i * 0.14, Math.sin(i * 1.7) * 0.2]}><icosahedronGeometry args={[0.3, 0]} /><M c={i % 2 ? '#3f8f5a' : '#4fa86a'} /></mesh>)}</group>
    </group>
  );
};

/** Datacenter: piso técnico, pasillo de racks. p.red = segundos (t del plano) desde que la luz pasa a roja. */
const DataCenter: React.FC<{ t: number; p: any }> = ({ t, p }) => {
  const tiles = useTex((g, W, H) => {
    g.fillStyle = '#3a4048'; g.fillRect(0, 0, W, H);
    for (let i = 0; i < 6; i++) for (let j = 0; j < 6; j++) { const x = (i * W) / 6, y = (j * H) / 6; g.fillStyle = '#4a515b'; g.fillRect(x + 3, y + 3, W / 6 - 6, H / 6 - 6);
      if ((i + j) % 3 === 0) { g.fillStyle = '#2c3138'; for (let a = 0; a < 5; a++) for (let b = 0; b < 5; b++) g.fillRect(x + 14 + a * 12, y + 14 + b * 12, 5, 5); } }
  }, 512, 512, 'mcr2tiles');
  const red = p.red !== undefined ? clamp((t - p.red) / 0.25) : 0;
  const pulse = red > 0 ? 0.55 + 0.45 * Math.abs(Math.sin((t - p.red) * 4.2)) : 0;
  return (
    <group>
      <pointLight position={[0, 3.6, 2.5]} intensity={lerp(20, 6, red)} color="#e8f1ff" distance={13} />
      <pointLight position={[0, 3.2, 0.5]} intensity={34 * red * pulse} color="#ff2a2a" distance={14} />
      <Flat s={[30, 30]} pos={[0, 0.02, 0]} rot={[-Math.PI / 2, 0, 0]} map={tiles} c={red > 0 ? '#ffd6d6' : '#ffffff'} />
      <B s={[14, 9, 0.2]} pos={[0, 4.5, -3.9]} c="#252a31" />
      {[-4.4, 4.4].map((x) => <B key={x} s={[0.2, 9, 14]} pos={[x, 4.5, 0]} c="#22262c" />)}
      <B s={[9, 0.1, 14]} pos={[0, 4.4, 0]} c="#1b1f24" />
      {/* bandejas de cables y tiras de luz en el techo */}
      {[-1.4, 1.4].map((x) => <group key={x}><B s={[0.5, 0.08, 14]} pos={[x, 3.6, 0]} c="#6b7480" />
        <Flat s={[0.12, 14]} pos={[x * 0.5, 4.32, 0]} rot={[Math.PI / 2, 0, 0]} c={red > 0 ? '#ff5050' : '#f2f7ff'} /></group>)}
      {/* puerta de emergencia con cartel verde */}
      <B s={[1.0, 2.1, 0.1]} pos={[0, 1.05, -3.8]} c="#3a4048" />
      <B s={[0.6, 0.2, 0.06]} pos={[0, 2.4, -3.78]} c={MINT} e={MINT} ei={1.2} />
    </group>
  );
};

/** Sala de operaciones: pared de pantallas. p.red = segundos desde que todo se pone rojo. */
const Ops: React.FC<{ t: number; p: any }> = ({ t, p }) => {
  const red = p.red !== undefined ? clamp((t - p.red) / 0.2) : 0;
  const pulse = red > 0 ? 0.5 + 0.5 * Math.abs(Math.sin((t - p.red) * 5)) : 0;
  const wall = useTex((g, W, H) => {
    g.fillStyle = '#0b1424'; g.fillRect(0, 0, W, H);
    const cw = W / 4, ch = H / 2;
    for (let i = 0; i < 4; i++) for (let j = 0; j < 2; j++) {
      const x = i * cw, y = j * ch; const bad = red > 0 && (i + j) % 2 === 0;
      g.fillStyle = bad ? '#3a0b10' : '#10223d'; g.fillRect(x + 6, y + 6, cw - 12, ch - 12);
      g.strokeStyle = bad ? '#ff4b4b' : '#4fb3ff'; g.lineWidth = 4; g.beginPath();
      for (let k = 0; k <= 20; k++) { const xx = x + 18 + (k * (cw - 36)) / 20; const yy = y + ch * 0.6 - Math.sin(k * 0.8 + i * 2 + j) * ch * 0.18 + (bad ? (k / 20) * ch * 0.25 : 0); k ? g.lineTo(xx, yy) : g.moveTo(xx, yy); }
      g.stroke(); g.fillStyle = bad ? '#ff4b4b' : '#7fd1ff'; g.fillRect(x + 18, y + 18, cw * 0.35, 10);
    }
  }, 1024, 384, 'mcr2wall' + (red > 0));
  return (
    <group>
      <pointLight position={[0, 3.4, 2.8]} intensity={lerp(18, 7, red)} color="#cfe0ff" distance={13} />
      <pointLight position={[0, 3.0, 0]} intensity={30 * red * pulse} color="#ff2020" distance={14} />
      <Flat s={[30, 30]} pos={[0, 0.02, 0]} rot={[-Math.PI / 2, 0, 0]} c={red > 0 ? '#2a1418' : '#1a2233'} />
      {Array.from({ length: 12 }, (_, i) => <Flat key={i} s={[30, 0.02]} pos={[0, 0.03, 4 - i * 0.7]} rot={[-Math.PI / 2, 0, 0]} c="#2a3448" />)}
      <B s={[14, 9, 0.2]} pos={[0, 4.5, -3.9]} c={NAVY} />
      <B s={[7.6, 2.9, 0.12]} pos={[0, 2.5, -3.75]} c="#05080f" />
      <Flat s={[7.4, 2.75]} pos={[0, 2.5, -3.68]} map={wall} />
      {[-4.4, 4.4].map((x) => <B key={x} s={[0.2, 9, 14]} pos={[x, 4.5, 0]} c="#16233d" />)}
      <B s={[9, 0.1, 14]} pos={[0, 4.5, 0]} c="#0e1626" />
      {/* tira de alarma sobre la pared */}
      <B s={[7.6, 0.12, 0.1]} pos={[0, 4.05, -3.7]} c={red > 0 ? SIG : '#3a4458'} e={red > 0 ? SIG : undefined} ei={2.5 * pulse} />
    </group>
  );
};

/* ---------- Monitor con bandeja de entrada ---------- */
// p.mode: 'inbox' | 'off' | 'sent'.  p.off = segundos (tt) en que se corta.  p.dots = spinner girando.
const monTex = (mode: string, spin: number) => (g: CanvasRenderingContext2D, W: number, H: number) => {
  g.fillStyle = '#f7f9fb'; g.fillRect(0, 0, W, H);
  g.fillStyle = SLATE; g.fillRect(0, 0, W, H * 0.16);
  g.fillStyle = '#fff'; g.font = `800 ${H * 0.09}px Poppins`; g.textBaseline = 'middle'; g.fillText('BANDEJA DE ENTRADA', W * 0.05, H * 0.085);
  g.fillStyle = '#e3e8ee'; g.fillRect(0, H * 0.16, W * 0.22, H);
  for (let i = 0; i < 4; i++) { g.fillStyle = '#b9c3cf'; g.fillRect(W * 0.03, H * (0.24 + i * 0.12), W * 0.15, H * 0.05); }
  if (mode === 'off') {
    g.fillStyle = '#c7ced7'; for (let i = 0; i < 5; i++) g.fillRect(W * 0.26, H * (0.22 + i * 0.13), W * 0.68, H * 0.09);
    g.fillStyle = 'rgba(255,255,255,.75)'; g.fillRect(W * 0.22, H * 0.16, W, H);
    g.strokeStyle = SIG; g.lineWidth = H * 0.04; g.beginPath(); g.arc(W * 0.6, H * 0.5, H * 0.16, spin, spin + 4.4); g.stroke();
    g.fillStyle = SIG; g.font = `800 ${H * 0.085}px Poppins`; g.textAlign = 'center'; g.fillText('SIN CONEXIÓN', W * 0.6, H * 0.82); g.textAlign = 'left';
  } else {
    const rows = mode === 'sent' ? 5 : 5;
    for (let i = 0; i < rows; i++) {
      const y = H * (0.2 + i * 0.15); const hl = mode === 'sent' && i === 0;
      g.fillStyle = hl ? '#ffe7a3' : i % 2 ? '#ffffff' : '#f0f3f6'; g.fillRect(W * 0.24, y, W * 0.73, H * 0.13);
      g.fillStyle = hl ? AMBER : ['#4f8fd6', MINT, '#9b7bd1', '#e07a4f', '#4f8fd6'][i]; g.beginPath(); g.arc(W * 0.29, y + H * 0.065, H * 0.04, 0, 7); g.fill();
      g.fillStyle = '#3b4656'; g.fillRect(W * 0.34, y + H * 0.03, W * (0.3 - (i % 2) * 0.08), H * 0.03); g.fillStyle = '#a3adb9'; g.fillRect(W * 0.34, y + H * 0.08, W * 0.5, H * 0.025);
    }
  }
};
export const Monitor: React.FC<P> = ({ t, tt, p }) => {
  const { w = 1.2, h = 0.72 } = p;
  const mode = p.off !== undefined && tt >= p.off ? 'off' : p.mode ?? 'inbox';
  const spin = mode === 'off' ? Math.floor(t * 8) * 0.8 : 0;
  const tx = useTex(monTex(mode, spin), 512, Math.round((512 * h) / w), 'mcr2mon' + mode + spin + w + h);
  const flick = p.off !== undefined && tt >= p.off && tt < p.off + 0.1;
  return (
    <group>
      <B s={[w + 0.08, h + 0.08, 0.06]} pos={[0, 0, -0.035]} c="#1b2028" />
      <Flat s={[w, h]} map={tx} c={flick ? '#888' : '#ffffff'} />
      <B s={[0.08, 0.32, 0.08]} pos={[0, -h / 2 - 0.16, -0.08]} c="#1b2028" />
      <B s={[0.4, 0.03, 0.26]} pos={[0, -h / 2 - 0.32, -0.04]} c="#1b2028" />
    </group>
  );
};

/** Escritorio blanco de oficina con monitor. p.mon = props del monitor. */
export const WorkDesk: React.FC<P> = (a) => {
  const { mug = AMBER } = a.p;
  return (
    <group>
      <B s={[1.7, 0.05, 0.85]} pos={[0, 0.75, 0]} c="#f4f6f8" />
      {[-0.78, 0.78].map((x) => <B key={x} s={[0.05, 0.75, 0.75]} pos={[x, 0.375, 0]} c={STEEL} />)}
      <B s={[1.5, 0.3, 0.03]} pos={[0, 0.55, -0.38]} c="#c9d1da" />
      <group position={[0, 1.47, -0.18]}><Monitor t={a.t} tt={a.tt} p={{ ...(a.p.mon ?? {}) }} /></group>
      <B s={[0.6, 0.025, 0.2]} pos={[0, 0.79, 0.18]} c="#2b3038" />
      <Cyl r={0.06} h={0.13} pos={[0.6, 0.84, 0.15]} c={mug} />
      <B s={[0.3, 0.02, 0.22]} pos={[-0.6, 0.785, 0.12]} c={PAPER} />
    </group>
  );
};

/* ---------- Rack del datacenter ---------- */
// p.red = tt en que pasa a rojo; p.dark = tt en que se apaga (menos capacidad); p.label = cartel arriba
export const Rack: React.FC<P> = ({ t, tt, p }) => {
  const isRed = p.red !== undefined && tt >= p.red; const dark = p.dark !== undefined && tt >= p.dark;
  return (
    <group>
      <B s={[0.8, 2.1, 0.8]} pos={[0, 1.05, 0]} c={GRAPH} />
      <B s={[0.7, 1.9, 0.02]} pos={[0, 1.07, 0.41]} c="#16191e" />
      {Array.from({ length: 9 }, (_, i) => {
        const on = Math.sin(t * (4 + (i % 4)) + i * 1.7 + (p.seed ?? 0)) > -0.2;
        const col = dark ? '#333' : isRed ? SIG : i % 3 === 0 ? MINT : '#9fd8ff';
        return <group key={i}>
          <B s={[0.62, 0.15, 0.02]} pos={[0, 0.3 + i * 0.2, 0.425]} c="#252a31" />
          <B s={[0.06, 0.05, 0.02]} pos={[-0.24, 0.3 + i * 0.2, 0.44]} c={col} e={dark ? undefined : col} ei={on ? 2.6 : 0.4} />
          <B s={[0.06, 0.05, 0.02]} pos={[-0.15, 0.3 + i * 0.2, 0.44]} c={col} e={dark ? undefined : col} ei={on ? 0.4 : 2.2} />
          <B s={[0.28, 0.03, 0.02]} pos={[0.12, 0.3 + i * 0.2, 0.44]} c="#3d4550" />
        </group>;
      })}
      {p.label && <group position={[0, 2.32, 0.2]}><Label t={t} tt={tt} p={{ text: p.label, w: 0.78, h: 0.24, bg: '#0d1117', color: STEEL, size: 0.62, weight: 800, depth: 0.03 }} /></group>}
    </group>
  );
};

/* ---------- Defecto latente: grieta roja que late dentro del rack ---------- */
export const Glitch: React.FC<P> = ({ t, tt }) => {
  const k = 0.7 + 0.3 * Math.abs(Math.sin(t * 6));
  return (
    <group scale={eo(tt / 0.3)}>
      {[[0, 0, 0.4], [0.1, -0.12, -0.5], [-0.08, 0.13, 0.9], [0.06, 0.26, -0.3]].map(([x, y, r], i) => <B key={i} s={[0.05, 0.16, 0.03]} pos={[x, y, 0]} rot={[0, 0, r]} c={SIG} e={SIG} ei={3 * k} />)}
      <Flat s={[0.7, 0.7]} pos={[0, 0.06, -0.02]} c={SIG} o={0.22 * k} add />
    </group>
  );
};

/* ---------- Señal de prohibido (no fue un ataque) sobre una silueta encapuchada ---------- */
export const NoAttack: React.FC<P> = ({ t, tt, p }) => {
  const k = p.ban !== undefined ? eo((tt - p.ban) / 0.25) : 1;
  return (
    <group>
      {/* silueta encapuchada */}
      <B s={[0.5, 0.75, 0.3]} pos={[0, 1.05, 0]} c="#0f1216" />
      <mesh position={[0, 1.6, 0]}><icosahedronGeometry args={[0.24, 0]} /><M c="#0f1216" /></mesh>
      <B s={[0.36, 0.7, 0.26]} pos={[0, 0.35, 0]} c="#1a1e24" />
      <B s={[0.6, 0.05, 0.4]} pos={[0, 0.78, 0.3]} c="#2b3038" />
      <B s={[0.5, 0.02, 0.32]} pos={[0, 0.82, 0.3]} c="#4fb3ff" e="#4fb3ff" ei={0.8} />
      {k > 0 && <group position={[0, 1.15, 0.5]} scale={Math.max(0.001, k)}>
        <mesh><torusGeometry args={[0.78, 0.09, 8, 36]} /><M c={SIG} e={SIG} ei={1.6} /></mesh>
        <B s={[1.5, 0.16, 0.08]} rot={[0, 0, -Math.PI / 4]} c={SIG} e={SIG} ei={1.6} />
      </group>}
    </group>
  );
};

/* ---------- Almanaque de pared que pasa los meses ---------- */
export const FlipCal: React.FC<P> = ({ t, tt, p }) => {
  const months: string[] = p.months ?? ['JUL', 'AGO', 'SEP', 'OCT', 'NOV'];
  const start = p.start ?? 0.5, every = p.every ?? 0.45;
  const idx = Math.max(0, Math.min(months.length - 1, Math.floor((tt - start) / every) + 1));
  const ph = clamp(((tt - start) % every) / 0.15);
  const flipping = tt >= start && idx < months.length - 1 + 1 && ph < 1 && tt < start + every * (months.length - 1);
  const m = months[tt < start ? 0 : idx]; const last = idx === months.length - 1;
  return (
    <group>
      <B s={[0.95, 1.05, 0.05]} pos={[0, 0, -0.03]} c="#ffffff" />
      <Label t={t} tt={tt} p={{ text: m, w: 0.9, h: 0.3, bg: last ? SIG : SLATE, color: '#fff', size: 0.7, weight: 900, depth: 0.02 }} />
      <group position={[0, 0.34, 0.01]}>{[-0.3, 0, 0.3].map((x) => <Cyl key={x} r={0.025} h={0.12} pos={[x, 0.18, 0]} c="#777" />)}</group>
      <group position={[0, -0.25, 0.02]}>
        {Array.from({ length: 20 }, (_, i) => <B key={i} s={[0.13, 0.09, 0.01]} pos={[-0.36 + (i % 5) * 0.18, 0.12 - Math.floor(i / 5) * 0.13, 0]} c={'#d5dbe2'} />)}
      </group>
      {flipping && <group position={[0, 0.17, 0.06]} rotation={[-ph * Math.PI * 0.9, 0, 0]}><B s={[0.9, 0.5, 0.01]} pos={[0, -0.25, 0]} c="#f0f0f0" /></group>}
    </group>
  );
};

/* ---------- Cinta de tráfico (cubos violeta-azulados = Teams) que entra a los racks y se traba ---------- */
// p.len, p.gap, p.speed. p.extra = tt desde el que entran el doble de cubos (los nuevos, de otro color = Teams).
// p.jam = tt desde el que no entran más: los cubos se apilan contra el final.
export const Traffic: React.FC<P> = ({ tt, p }) => {
  const { len = 3.2, gap = 0.36, speed = 1.0, jam, extra, color = '#8fa3b8', color2 = '#7b6bff', T = 7 } = p;
  const spawns: { s: number; teams: boolean }[] = [];
  for (let s = -len / speed; s < T; ) { const teams = extra !== undefined && s >= extra; spawns.push({ s, teams }); s += (teams ? gap / 2.2 : gap) / speed; }
  let rank = 0; const travel = len / speed;
  const belt = jam !== undefined && tt >= jam ? 0 : tt * speed;
  return (
    <group>
      <B s={[len + 0.3, 0.1, 0.55]} pos={[len / 2, 0.05, 0]} c="#3d4550" />
      {Array.from({ length: Math.ceil(len / 0.3) }, (_, i) => <B key={i} s={[0.02, 0.02, 0.5]} pos={[((i * 0.3 + belt) % len), 0.11, 0]} c="#59626e" />)}
      {spawns.map(({ s, teams }, i) => {
        if (tt < s) return null;
        const arrive = s + travel; let x = (tt - s) * speed, y = 0.22, z = 0, rz = 0;
        if (x > len) {
          if (jam === undefined || arrive < jam) return null;
          const r = rank++; x = len - 0.12 - (r % 3) * 0.22; z = (Math.floor(r / 3) % 2 ? 0.12 : -0.12); y = 0.22 + Math.floor(r / 6) * 0.21; rz = ((r * 13) % 5 - 2) * 0.1;
        }
        const fade = clamp(Math.min(x / 0.2, 1));
        const c = teams ? color2 : color;
        return <group key={i} position={[x, y, z]} rotation={[0, 0, rz]} scale={Math.max(0.001, fade)}><B s={[0.2, 0.2, 0.2]} c={c} e={c} ei={0.45} /></group>;
      })}
    </group>
  );
};

/* ---------- Mesa-mapa con ruta del arreglo ---------- */
export const MapTable: React.FC<P> = ({ t, tt, p }) => {
  const { w = 3.2, d = 2.0, pins = [], travel } = p;
  const tex = useTex((g, W, H) => {
    g.fillStyle = '#0f2a44'; g.fillRect(0, 0, W, H);
    g.strokeStyle = 'rgba(120,180,230,.18)'; g.lineWidth = 2; for (let i = 0; i < 16; i++) { g.beginPath(); g.moveTo((i * W) / 16, 0); g.lineTo((i * W) / 16, H); g.stroke(); }
    for (let i = 0; i < 10; i++) { g.beginPath(); g.moveTo(0, (i * H) / 10); g.lineTo(W, (i * H) / 10); g.stroke(); }
    g.fillStyle = '#2f6f63';
    const blob = (pts: number[][]) => { g.beginPath(); pts.forEach(([x, y], i) => (i ? g.lineTo(x * W, y * H) : g.moveTo(x * W, y * H))); g.closePath(); g.fill(); };
    blob([[0.08, 0.18], [0.27, 0.12], [0.32, 0.3], [0.24, 0.42], [0.2, 0.5], [0.12, 0.38]]);
    blob([[0.22, 0.52], [0.3, 0.55], [0.3, 0.75], [0.25, 0.9], [0.21, 0.7]]);
    blob([[0.44, 0.15], [0.56, 0.12], [0.55, 0.3], [0.47, 0.33], [0.43, 0.25]]);
    blob([[0.46, 0.38], [0.58, 0.38], [0.6, 0.6], [0.53, 0.78], [0.48, 0.58]]);
    blob([[0.58, 0.12], [0.88, 0.14], [0.9, 0.38], [0.76, 0.45], [0.62, 0.35]]);
    blob([[0.8, 0.62], [0.92, 0.64], [0.9, 0.78], [0.8, 0.76]]);
  }, 1024, Math.round((1024 * d) / w), 'mcr2map');
  // la caja del arreglo recorre los pines en orden, lento
  let cx = 0, cz = 0;
  if (travel && pins.length > 1) {
    const k = clamp((tt - (travel.at ?? 0)) / (travel.dur ?? 4)) * (pins.length - 1); const i = Math.min(pins.length - 2, Math.floor(k)); const f = eio(k - i);
    cx = lerp(pins[i][0], pins[i + 1][0], f); cz = lerp(pins[i][1], pins[i + 1][1], f);
  }
  const reached = travel ? clamp((tt - (travel.at ?? 0)) / (travel.dur ?? 4)) * (pins.length - 1) : 99;
  return (
    <group>
      <B s={[w + 0.2, 0.12, d + 0.2]} pos={[0, 0.84, 0]} c="#2a3446" />
      <B s={[w - 0.4, 0.8, d - 0.4]} pos={[0, 0.4, 0]} c="#1b2333" />
      <Flat s={[w, d]} pos={[0, 0.91, 0]} rot={[-Math.PI / 2, 0, 0]} map={tex} />
      <Flat s={[w + 0.6, d + 0.6]} pos={[0, 0.915, 0]} rot={[-Math.PI / 2, 0, 0]} c="#3a8cff" o={0.08} add />
      {pins.map(([x, z]: number[], i: number) => { const on = i <= reached + 0.01; const s = on ? 1 : 0.6;
        return <group key={i} position={[x, 0.92, z]} scale={s}>
          <Cyl r={0.02} h={0.3} pos={[0, 0.15, 0]} c="#ddd" />
          <mesh position={[0, 0.33, 0]}><sphereGeometry args={[0.07, 8, 6]} /><M c={on ? MINT : SIG} e={on ? MINT : SIG} ei={1.4} /></mesh>
        </group>; })}
      {pins.slice(0, -1).map(([x, z]: number[], i: number) => { const [x2, z2] = pins[i + 1]; const L = Math.hypot(x2 - x, z2 - z); const a = Math.atan2(z2 - z, x2 - x);
        const fill = clamp(reached - i);
        return <group key={'l' + i} position={[x, 0.925, z]} rotation={[0, -a, 0]}>
          <B s={[L, 0.008, 0.03]} pos={[L / 2, 0, 0]} c="#5b6b82" />
          {fill > 0 && <B s={[L * fill, 0.012, 0.035]} pos={[(L * fill) / 2, 0.002, 0]} c={AMBER} e={AMBER} ei={1.2} />}
        </group>; })}
      {travel && <group position={[cx, 1.05 + Math.abs(Math.sin(t * 5)) * 0.03, cz]}>
        <B s={[0.22, 0.18, 0.22]} c={AMBER} />
        <B s={[0.23, 0.04, 0.05]} pos={[0, 0.05, 0]} c="#7a4b00" />
      </group>}
    </group>
  );
};

/* ---------- Cronómetro gigante ---------- */
// p.sweep: vueltas por segundo de la aguja. p.label: texto de la esfera
export const Stopwatch: React.FC<P> = ({ t, tt, p }) => {
  const { r = 1.0, label = '60 MIN' } = p;
  const face = useTex((g, W, H) => {
    g.fillStyle = '#fbfbf7'; g.beginPath(); g.arc(W / 2, H / 2, W / 2, 0, 7); g.fill();
    g.fillStyle = SLATE; for (let i = 0; i < 60; i++) { const a = (i / 60) * Math.PI * 2; const L = i % 5 === 0 ? 46 : 20; g.save(); g.translate(W / 2, H / 2); g.rotate(a); g.fillRect(-3, -W / 2 + 18, i % 5 === 0 ? 8 : 4, L); g.restore(); }
    g.font = `900 ${W * 0.07}px Poppins`; g.textAlign = 'center'; g.textBaseline = 'middle';
    [0, 15, 30, 45].forEach((n, i) => { const a = (i / 4) * Math.PI * 2 - Math.PI / 2; g.fillText(String(n === 0 ? 60 : n), W / 2 + Math.cos(a) * W * 0.32, H / 2 + Math.sin(a) * W * 0.32); });
    
    // sector verde de la meta
    g.fillStyle = 'rgba(47,201,142,.18)'; g.beginPath(); g.moveTo(W / 2, H / 2); g.arc(W / 2, H / 2, W * 0.44, -Math.PI / 2, Math.PI * 1.5); g.fill();
  }, 512, 512, 'mcr2watch' + label);
  const a = -tt * (p.sweep ?? 0.25) * Math.PI * 2;
  return (
    <group>
      <Cyl r={r * 1.08} h={0.2} rot={[Math.PI / 2, 0, 0]} c={STEEL} seg={32} />
      <Flat s={[r * 2, r * 2]} pos={[0, 0, 0.105]} map={face} />
      <group position={[0, 0, 0.13]} rotation={[0, 0, a]}><B s={[0.05, r * 0.85, 0.02]} pos={[0, r * 0.38, 0]} c={SIG} e={SIG} ei={0.8} /></group>
      <Cyl r={0.06} h={0.05} pos={[0, 0, 0.14]} rot={[Math.PI / 2, 0, 0]} c={SLATE} />
      <Cyl r={0.16} h={0.26} pos={[0, r * 1.18, 0]} c={STEEL} />
      <B s={[0.5, 0.12, 0.2]} pos={[0, r * 1.36, 0]} c={STEEL} />
      <group position={[r * 0.78, r * 0.86, 0]} rotation={[0, 0, -0.75]}><Cyl r={0.08} h={0.2} c={STEEL} /></group>
    </group>
  );
};

/* ---------- Carpeta con memo y sello ---------- */
// p.stamp = tt del sello. p.open = tt en que se abre. p.text = sello
export const Folder: React.FC<P> = ({ t, tt, p }) => {
  const { stamp, open = 0, text = 'INTERNO', title = 'MEMO' } = p;
  const k = eo((tt - open) / 0.5);
  const sk = stamp !== undefined ? clamp((tt - stamp) / 0.12) : 0;
  const memo = useTex((g, W, H) => {
    g.fillStyle = PAPER; g.fillRect(0, 0, W, H); g.fillStyle = SLATE; g.font = `900 ${H * 0.1}px Poppins`; g.fillText(title, W * 0.08, H * 0.14);
    g.fillStyle = '#a7a296'; for (let i = 0; i < 9; i++) g.fillRect(W * 0.08, H * (0.24 + i * 0.075), W * (i % 3 === 2 ? 0.5 : 0.82), H * 0.022);
  }, 384, 512, 'mcr2memo' + title);
  return (
    <group>
      <B s={[1.05, 0.03, 1.35]} pos={[0, 0.015, 0]} c={MANILA} />
      <group position={[-0.52, 0.03, 0]} rotation={[0, 0, k * 2.9]}><B s={[1.05, 0.02, 1.35]} pos={[0.52, 0, 0]} c="#d9b86a" /></group>
      {[0, 1, 2].map((i) => <group key={i} position={[0.04 * i, 0.04 + i * 0.006, -0.03 * i]} rotation={[-Math.PI / 2, 0, (i - 1) * 0.12 * k]}>
        <Flat s={[0.9, 1.2]} map={memo} />
      </group>)}
      {sk > 0 && <group position={[0.1, 0.07, 0.15]} rotation={[-Math.PI / 2, 0, 0.25]} scale={lerp(1.6, 1, sk)}>
        <Label t={t} tt={tt} p={{ text, w: 0.85, h: 0.28, color: SIG, border: SIG, size: 0.6, weight: 900, depth: 0.005 }} />
      </group>}
    </group>
  );
};

/* ---------- Pared de vidrio ---------- */
export const Glass: React.FC<P> = ({ p }) => {
  const { w = 4, h = 2.6 } = p;
  return (
    <group>
      <mesh position={[0, h / 2, 0]}><boxGeometry args={[w, h, 0.04]} /><meshStandardMaterial color="#cfe8ff" transparent opacity={0.22} roughness={0.1} metalness={0.2} /></mesh>
      <B s={[w, 0.06, 0.08]} pos={[0, 0.03, 0]} c={STEEL} /><B s={[w, 0.06, 0.08]} pos={[0, h, 0]} c={STEEL} />
      {[-w / 2, 0, w / 2].map((x) => <B key={x} s={[0.06, h, 0.08]} pos={[x, h / 2, 0]} c={STEEL} />)}
      <B s={[w, 0.08, 0.05]} pos={[0, 1.2, 0.01]} c="#ffffff" o={0.5} />
    </group>
  );
};

/* ---------- Factura de licencias ---------- */
export const Invoice: React.FC<P> = ({ p }) => {
  const { w = 0.9, h = 1.2 } = p;
  const tx = useTex((g, W, H) => {
    g.fillStyle = '#ffffff'; g.fillRect(0, 0, W, H); g.fillStyle = SLATE; g.fillRect(0, 0, W, H * 0.12);
    g.fillStyle = '#fff'; g.font = `900 ${H * 0.07}px Poppins`; g.textBaseline = 'middle'; g.fillText('FACTURA', W * 0.07, H * 0.06);
    for (let i = 0; i < 6; i++) { g.fillStyle = '#c7ced7'; g.fillRect(W * 0.07, H * (0.3 + i * 0.08), W * 0.55, H * 0.025); g.fillRect(W * 0.72, H * (0.3 + i * 0.08), W * 0.2, H * 0.025); }
    g.fillStyle = SLATE; g.fillRect(W * 0.07, H * 0.82, W * 0.86, H * 0.006); g.font = `900 ${H * 0.06}px Poppins`; g.fillText('TOTAL', W * 0.07, H * 0.89);
    g.fillRect(W * 0.6, H * 0.875, W * 0.32, H * 0.035);
  }, 384, 512, 'mcr2inv');
  return <group><B s={[w + 0.04, h + 0.04, 0.02]} pos={[0, 0, -0.012]} c="#d4d8dd" /><Flat s={[w, h]} map={tx} /></group>;
};

/* ---------- Ticket de descuento ---------- */
export const Ticket: React.FC<P> = ({ t, tt, p }) => {
  const { w = 1.4, h = 0.6, text = 'DESCUENTO' } = p;
  const tx = useTex((g, W, H) => {
    g.fillStyle = AMBER; g.fillRect(0, 0, W, H);
    g.fillStyle = '#fff'; for (let i = 0; i < 12; i++) { g.beginPath(); g.arc(W * 0.24, (i + 0.5) * (H / 12), 6, 0, 7); g.fill(); }
    g.fillStyle = SLATE; g.font = `900 ${H * 0.3}px Poppins`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(text, W * 0.62, H * 0.52);
    g.fillStyle = SLATE; g.beginPath(); g.arc(W * 0.12, H / 2, H * 0.22, 0, 7); g.fill(); g.fillStyle = AMBER; g.font = `900 ${H * 0.3}px Poppins`; g.fillText('$', W * 0.12, H * 0.54);
  }, 768, Math.round((768 * h) / w), 'mcr2tick' + text);
  return <group rotation={[0, Math.sin(t * 1.6) * 0.15, Math.sin(t * 1.2) * 0.04]}><B s={[w, h, 0.03]} pos={[0, 0, -0.02]} c="#d18f00" /><Flat s={[w, h]} map={tx} /></group>;
};

/* ---------- Formulario de reclamo en tablilla, se va tildando ---------- */
// p.checks = [tt...] en que se tilda cada renglón
export const Claim: React.FC<P> = ({ tt, p }) => {
  const { checks = [] } = p as { checks: number[] };
  const n = checks.filter((c) => tt >= c).length;
  const tx = useTex((g, W, H) => {
    g.fillStyle = '#ffffff'; g.fillRect(0, 0, W, H); g.fillStyle = SIG; g.fillRect(0, 0, W, H * 0.13);
    
    for (let i = 0; i < 4; i++) { const y = H * (0.25 + i * 0.17);
      g.strokeStyle = SLATE; g.lineWidth = 6; g.strokeRect(W * 0.08, y, H * 0.09, H * 0.09);
      g.fillStyle = '#b3bcc7'; g.fillRect(W * 0.3, y + H * 0.03, W * (0.6 - (i % 2) * 0.15), H * 0.03);
      if (i < n) { g.strokeStyle = MINT; g.lineWidth = 12; g.beginPath(); g.moveTo(W * 0.09, y + H * 0.045); g.lineTo(W * 0.14, y + H * 0.085); g.lineTo(W * 0.24, y - H * 0.01); g.stroke(); } }
  }, 384, 512, 'mcr2claim' + n);
  return (
    <group>
      <B s={[1.0, 1.32, 0.04]} pos={[0, 0, -0.03]} c="#8a5a33" />
      <Flat s={[0.88, 1.15]} pos={[0, -0.04, 0]} map={tx} />
      <B s={[0.4, 0.12, 0.06]} pos={[0, 0.62, 0.01]} c={STEEL} />
    </group>
  );
};

/* ---------- Almanaque de escritorio con el 31 encerrado ---------- */
export const DeskCal: React.FC<P> = ({ t, tt, p }) => {
  const k = p.circle !== undefined ? clamp((tt - p.circle) / 0.5) : 0;
  return (
    <group>
      <group rotation={[-0.25, 0, 0]}>
        <B s={[1.1, 1.0, 0.04]} pos={[0, 0.5, 0]} c="#ffffff" />
        <group position={[0, 0.88, 0.03]}><Label t={t} tt={tt} p={{ text: 'DICIEMBRE', w: 1.08, h: 0.22, bg: SLATE, color: '#fff', size: 0.62, weight: 900, depth: 0.01 }} /></group>
        <group position={[0, 0.42, 0.03]}><Label t={t} tt={tt} p={{ text: '31', w: 0.9, h: 0.6, color: SLATE, size: 0.95, weight: 900, depth: 0.01 }} /></group>
        {k > 0 && <mesh position={[0, 0.42, 0.06]}><torusGeometry args={[0.36, 0.035, 6, 40, Math.PI * 2 * k]} /><M c={SIG} e={SIG} ei={1.3} /></mesh>}
      </group>
      <B s={[1.1, 0.04, 0.5]} pos={[0, 0.02, -0.2]} c={STEEL} />
    </group>
  );
};

/* ---------- Bandeja de papeles vacía ---------- */
export const Tray: React.FC<P> = () => (
  <group>
    <B s={[0.9, 0.04, 0.65]} pos={[0, 0.02, 0]} c="#4a5361" />
    {[-1, 1].map((s) => <B key={s} s={[0.04, 0.16, 0.65]} pos={[s * 0.45, 0.08, 0]} c="#4a5361" />)}
    <B s={[0.9, 0.16, 0.04]} pos={[0, 0.08, -0.32]} c="#4a5361" />
  </group>
);

/* ---------- Sobre que vuela en arco (reenviar) ---------- */
// p.to: destino relativo, p.at: tt de salida, p.dur
export const Fly: React.FC<P> = ({ tt, p }) => {
  const { to = [2, 0, 0], at = 0, dur = 0.9, color = AMBER } = p;
  const k = eio((tt - at) / dur);
  const x = to[0] * k, z = to[2] * k, y = to[1] * k + Math.sin(k * Math.PI) * 0.7;
  return (
    <group position={[x, y, z]} rotation={[0, 0, Math.sin(k * Math.PI) * 0.3]}>
      <B s={[0.5, 0.32, 0.03]} c="#ffffff" />
      <B s={[0.36, 0.04, 0.035]} pos={[-0.1, 0.07, 0]} rot={[0, 0, -0.55]} c={color} />
      <B s={[0.36, 0.04, 0.035]} pos={[0.1, 0.07, 0]} rot={[0, 0, 0.55]} c={color} />
    </group>
  );
};

/* ---------- Sirena de pared (bombilla roja que gira) ---------- */
export const Siren: React.FC<P> = ({ t, tt, p }) => {
  const on = p.on === undefined || tt >= p.on; const a = on ? t * 7 : 0;
  return (
    <group>
      <B s={[0.36, 0.1, 0.36]} pos={[0, 0, 0]} c="#2b3038" />
      <mesh position={[0, 0.2, 0]}><cylinderGeometry args={[0.15, 0.17, 0.3, 10]} /><M c={on ? SIG : '#6b2a2e'} e={on ? SIG : undefined} ei={on ? 2.2 : 0} o={0.9} /></mesh>
      {on && <group position={[0, 0.2, 0]} rotation={[0, a, 0]}>
        <mesh position={[0.9, 0, 0]} rotation={[0, 0, Math.PI / 2]}><coneGeometry args={[0.45, 1.6, 10, 1, true]} /><meshBasicMaterial color={SIG} transparent opacity={0.22} toneMapped={false} side={THREE.DoubleSide} depthWrite={false} blending={THREE.AdditiveBlending} /></mesh>
      </group>}
    </group>
  );
};

/* ---------- Cartel de piso de sistemas (escritorio del de IT) ---------- */
export const HangSign: React.FC<P> = ({ t, tt, p }) => (
  <group>
    <B s={[0.03, 0.7, 0.03]} pos={[-0.5, 0.45, 0]} c="#555" /><B s={[0.03, 0.7, 0.03]} pos={[0.5, 0.45, 0]} c="#555" />
    <Label t={t} tt={tt} p={{ text: p.text ?? 'SISTEMAS', w: 1.4, h: 0.36, bg: p.bg ?? SLATE, color: '#fff', size: 0.6, weight: 900, depth: 0.04 }} />
  </group>
);

export const EXTRA: Record<string, React.FC<P>> = {
  stage: Stage, monitor: Monitor, workdesk: WorkDesk, rack: Rack, glitch: Glitch, noattack: NoAttack, flipcal: FlipCal, traffic: Traffic,
  maptable: MapTable, stopwatch: Stopwatch, folder: Folder, glass: Glass, invoice: Invoice, ticket: Ticket, claim: Claim, deskcal: DeskCal,
  tray: Tray, fly: Fly, siren: Siren, hangsign: HangSign,
};
