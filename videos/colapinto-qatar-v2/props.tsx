import React from 'react';
import * as THREE from 'three';
import { M, Label, useTex } from '../../src/kit/Props';
import { clamp, eio, eo, lerp } from '../../src/kit/math';

// Look propio de la versión 2 (el original era la ciudad neón violeta con grilla, monoplaza azul y magenta, calendarios).
// Acá: circuito de Lusail de noche en el desierto (asfalto, pianos rojo y blanco, arena, dunas, cielo azul petróleo),
// box de boxes (gris cemento, carbón y celeste), calle de Las Vegas (barreras de hormigón, torres con ventanas ámbar),
// torre de tiempos (negro con letras ámbar) y atardecer rojo de Abu Dabi. Auto genérico celeste y blanco, sin logos.
type P = { t: number; tt: number; p: any };
type V3 = [number, number, number];
const B: React.FC<{ s: V3; pos?: V3; rot?: V3; c: string; e?: string; ei?: number }> = ({ s, pos, rot, c, e, ei }) => (
  <mesh position={pos} rotation={rot}><boxGeometry args={s} /><M c={c} e={e} ei={ei} /></mesh>
);
const Flat: React.FC<{ s: [number, number]; pos?: V3; rot?: V3; c?: string; map?: THREE.Texture; o?: number }> = ({ s, pos, rot, c = '#fff', map, o }) => (
  <mesh position={pos} rotation={rot}><planeGeometry args={s} /><meshBasicMaterial color={c} map={map} toneMapped={false} transparent={o !== undefined} opacity={o ?? 1} /></mesh>
);
const Cyl: React.FC<{ r: number; h: number; pos?: V3; rot?: V3; c: string; e?: string; ei?: number; seg?: number; r2?: number }> = ({ r, h, pos, rot, c, e, ei, seg = 10, r2 }) => (
  <mesh position={pos} rotation={rot}><cylinderGeometry args={[r2 ?? r, r, h, seg]} /><M c={c} e={e} ei={ei} /></mesh>
);
const seedR = (seed: number) => { let s = seed; return () => ((s = (s * 9301 + 49297) % 233280) / 233280); };

export const CEL = '#6cc4f0', CELD = '#2a86c4', WHITE = '#f3f5f7', NAVY = '#102a43', AMBER = '#ffb000', RED = '#d63a2f',
  GREEN = '#1e8a4c', SAND = '#d4a35e', GRAPH = '#3b4048', ORANGE = '#ff7a2f', CHAR = '#24282e', MAROON = '#7a1430';

/* ---------- Escenarios (se apoyan sobre el set 'room' y lo tapan) ---------- */
export const Stage: React.FC<P> = ({ t, p }) => {
  const kind = p.kind ?? 'lusail'; const speed = p.speed ?? 0;
  const asph = useTex((g, W, H) => {
    g.fillStyle = '#2b2e33'; g.fillRect(0, 0, W, H); const r = seedR(5);
    for (let i = 0; i < 2200; i++) { g.fillStyle = ['#34373d', '#24272b', '#3d4046'][i % 3]; g.fillRect(r() * W, r() * H, 3, 3); }
  }, 512, 512, 'cq2asph');
  const sand = useTex((g, W, H) => {
    g.fillStyle = SAND; g.fillRect(0, 0, W, H); const r = seedR(9);
    for (let i = 0; i < 2600; i++) { g.fillStyle = ['#c08d4c', '#e0b475', '#b47f42'][i % 3]; g.fillRect(r() * W, r() * H, 3, 2); }
  }, 512, 512, 'cq2sand');
  const sky = useTex((g, W, H) => {
    const dusk = kind === 'dusk';
    const gr = g.createLinearGradient(0, 0, 0, H);
    if (dusk) { gr.addColorStop(0, '#1a0f1c'); gr.addColorStop(0.45, '#3a1424'); gr.addColorStop(0.72, '#b8402a'); gr.addColorStop(0.86, '#ff9a4a'); gr.addColorStop(1, '#ffc27a'); }
    else { gr.addColorStop(0, '#050b14'); gr.addColorStop(0.5, '#0a1a2b'); gr.addColorStop(0.8, '#17414e'); gr.addColorStop(1, '#2b6670'); }
    g.fillStyle = gr; g.fillRect(0, 0, W, H);
    if (!dusk) { const r = seedR(3); g.fillStyle = '#fff'; for (let i = 0; i < 50; i++) { g.globalAlpha = 0.25 + r() * 0.5; g.fillRect(r() * W, r() * H * 0.4, 2, 2); } g.globalAlpha = 1; }
    // dunas
    g.fillStyle = dusk ? '#4a1f1a' : '#2c2219';
    g.beginPath(); g.moveTo(0, H); for (let x = 0; x <= W; x += 16) g.lineTo(x, H * 0.84 - Math.sin(x / 60) * 14 - Math.sin(x / 23) * 6); g.lineTo(W, H); g.fill();
    // tribuna lejana con luces
    g.fillStyle = dusk ? '#2a1414' : '#141b22'; g.fillRect(W * 0.08, H * 0.82, W * 0.5, H * 0.05);
    for (let i = 0; i < 34; i++) { g.fillStyle = i % 3 ? '#ffd38a' : '#ffffff'; g.fillRect(W * 0.09 + i * 7.4, H * 0.835 + (i % 2) * 6, 3, 3); }
  }, 512, 512, 'cq2sky' + kind);
  const city = useTex((g, W, H) => {
    const gr = g.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, '#05070c'); gr.addColorStop(0.6, '#0d1320'); gr.addColorStop(1, '#2a1d12');
    g.fillStyle = gr; g.fillRect(0, 0, W, H); const r = seedR(17);
    for (let i = 0; i < 16; i++) {
      const w = 22 + r() * 30, x = (i * W) / 15 - 10 + r() * 8, h = H * (0.22 + r() * 0.26);
      g.fillStyle = i % 2 ? '#11151d' : '#181c25'; g.fillRect(x, H - h, w, h);
      for (let yy = H - h + 8; yy < H - 6; yy += 9) for (let xx = x + 4; xx < x + w - 4; xx += 7) if (r() > 0.45) { g.fillStyle = r() > 0.75 ? '#fff2c8' : r() > 0.5 ? AMBER : '#ff6a3d'; g.fillRect(xx, yy, 3, 4); }
    }
  }, 512, 512, 'cq2city');
  const garage = useTex((g, W, H) => {
    g.fillStyle = '#bfc3c9'; g.fillRect(0, 0, W, H);
    g.fillStyle = AMBER; g.fillRect(W * 0.12, 0, 10, H); g.fillRect(W * 0.88 - 10, 0, 10, H);
    g.strokeStyle = 'rgba(0,0,0,.12)'; g.lineWidth = 2; for (let i = 0; i <= 8; i++) { g.beginPath(); g.moveTo(0, (i * H) / 8); g.lineTo(W, (i * H) / 8); g.stroke(); }
  }, 512, 512, 'cq2gar');
  const scroll = (len: number) => ((t * speed) % len + len) % len;

  if (kind === 'lusail' || kind === 'dusk') {
    const dusk = kind === 'dusk'; const off = scroll(1.2);
    return (
      <group>
        <pointLight position={[0, 4, 3]} intensity={30} color={dusk ? '#ffd2a6' : '#f4f8ff'} distance={14} />
        <pointLight position={[-3, 2.5, -1]} intensity={16} color={dusk ? ORANGE : '#9fdcff'} distance={10} />
        <Flat s={[40, 40]} pos={[0, 0.015, 0]} rot={[-Math.PI / 2, 0, 0]} map={sand} />
        <Flat s={[4.2, 40]} pos={[0, 0.02, 0]} rot={[-Math.PI / 2, 0, 0]} map={asph} />
        {[-2.1, 2.1].map((x) => <group key={x}>{Array.from({ length: 34 }, (_, i) => <B key={i} s={[0.32, 0.03, 0.6]} pos={[x, 0.03, 8 - i * 0.6 - ((off * 1) % 1.2)]} c={i % 2 ? RED : WHITE} />)}</group>)}
        {Array.from({ length: 14 }, (_, i) => <B key={i} s={[0.1, 0.025, 0.8]} pos={[0, 0.03, 8 - i * 1.8 - (scroll(1.8))]} c="#d8dade" />)}
        <Flat s={[13, 11]} pos={[0, 3.6, -3.7]} map={sky} />
        {[-1, 1].map((k) => <Flat key={k} s={[12, 11]} pos={[k * 4.34, 3.6, 0]} rot={[0, -k * Math.PI / 2, 0]} map={sky} />)}
        {/* torres de luz (silueta, cabezal abajo del cuadro de subtítulos) */}
        {[-3.4, 3.4].map((x) => <group key={x} position={[x, 0, -2.8]}>
          <Cyl r={0.06} h={2.8} pos={[0, 1.4, 0]} c="#1a1d22" />
          <B s={[0.9, 0.35, 0.12]} pos={[0, 2.85, 0]} c="#1a1d22" />
          <Flat s={[0.8, 0.26]} pos={[0, 2.85, 0.07]} c="#fff6dc" /></group>)}
      </group>
    );
  }
  if (kind === 'vegas') {
    const off = scroll(1.0);
    return (
      <group>
        <pointLight position={[0, 4, 3]} intensity={26} color="#ffe2b0" distance={14} />
        <pointLight position={[2.5, 1.6, -1]} intensity={18} color={ORANGE} distance={9} />
        <Flat s={[40, 40]} pos={[0, 0.015, 0]} rot={[-Math.PI / 2, 0, 0]} map={asph} />
        {Array.from({ length: 16 }, (_, i) => <B key={i} s={[0.1, 0.025, 0.7]} pos={[0, 0.03, 8 - i * 1.4 - scroll(1.4)]} c="#e8e8e8" />)}
        {[-2.2, 2.2].map((x) => <group key={x}>
          {Array.from({ length: 20 }, (_, i) => <B key={i} s={[0.3, 0.55, 0.96]} pos={[x, 0.28, 8 - i * 1.0 - off]} c={i % 2 ? '#c9c4bb' : '#b3aea5'} />)}
          <B s={[0.32, 0.08, 20]} pos={[x, 0.58, -2]} c={RED} e={RED} ei={0.3} /></group>)}
        <Flat s={[13, 11]} pos={[0, 3.6, -3.7]} map={city} />
        {[-1, 1].map((k) => <Flat key={k} s={[12, 11]} pos={[k * 4.34, 3.6, 0]} rot={[0, -k * Math.PI / 2, 0]} map={city} />)}
      </group>
    );
  }
  if (kind === 'garage') return (
    <group>
      <pointLight position={[0, 3.4, 2.4]} intensity={26} color="#eef6ff" distance={12} />
      <pointLight position={[-2.4, 2, -1.5]} intensity={12} color={CEL} distance={7} />
      <Flat s={[24, 24]} pos={[0, 0.02, 0]} rot={[-Math.PI / 2, 0, 0]} map={garage} />
      <B s={[12, 9, 0.2]} pos={[0, 4.5, -3.75]} c={CHAR} />
      <B s={[12, 0.12, 0.24]} pos={[0, 1.35, -3.62]} c={CEL} e={CEL} ei={0.35} />
      {[-4.3, 4.3].map((x) => <B key={x} s={[0.2, 9, 12]} pos={[x, 4.5, 0]} c="#2c3138" />)}
      {/* estantes de neumáticos */}
      {[-2.7, 2.7].map((x) => <group key={x} position={[x, 0, -3.3]}>
        <B s={[1.3, 0.05, 0.5]} pos={[0, 0.55, 0]} c="#555b64" />
        {[-0.4, 0, 0.4].map((dx) => <Cyl key={dx} r={0.2} h={0.18} pos={[dx, 0.78, 0]} rot={[Math.PI / 2, 0, 0]} c="#141414" />)}
        {[-0.4, 0, 0.4].map((dx) => <Cyl key={'b' + dx} r={0.2} h={0.18} pos={[dx, 0.25, 0]} rot={[Math.PI / 2, 0, 0]} c="#141414" />)}
      </group>)}
      {/* caja de herramientas */}
      <group position={[2.6, 0, -1.6]}><B s={[0.8, 0.9, 0.5]} pos={[0, 0.45, 0]} c={RED} />
        {[0.2, 0.45, 0.7].map((y) => <B key={y} s={[0.7, 0.03, 0.02]} pos={[0, y, 0.26]} c="#dddddd" />)}</group>
    </group>
  );
  // board: torre de tiempos, sala negra
  return (
    <group>
      <pointLight position={[0, 3, 3]} intensity={14} color="#ffe6b0" distance={12} />
      <Flat s={[24, 24]} pos={[0, 0.02, 0]} rot={[-Math.PI / 2, 0, 0]} c="#0c0d10" />
      {Array.from({ length: 12 }, (_, i) => <Flat key={i} s={[24, 0.02]} pos={[0, 0.03, 3 - i * 0.7]} rot={[-Math.PI / 2, 0, 0]} c="#2a2416" />)}
      <B s={[12, 9, 0.2]} pos={[0, 4.5, -3.75]} c="#0a0b0e" />
      {[-4.3, 4.3].map((x) => <B key={x} s={[0.2, 9, 12]} pos={[x, 4.5, 0]} c="#0a0b0e" />)}
      <B s={[12, 0.05, 0.1]} pos={[0, 0.4, -3.6]} c={AMBER} e={AMBER} ei={0.8} />
    </group>
  );
};

/* ---------- Monoplaza genérico: trompa hacia +z, ~3 de largo a escala 1 ---------- */
export const Car: React.FC<P> = ({ t, p }) => {
  const { color = CEL, accent = WHITE, stripe = NAVY, helmet = WHITE, speed = 0, glow = 0.12 } = p;
  const dk = '#111317';
  return (
    <group>
      {/* piso y fondo plano */}
      <B s={[1.05, 0.05, 2.0]} pos={[0, 0.12, -0.15]} c={dk} />
      {/* trompa en cuña */}
      <B s={[0.3, 0.14, 0.95]} pos={[0, 0.26, 1.0]} rot={[0.08, 0, 0]} c={color} e={color} ei={glow} />
      <B s={[0.32, 0.03, 0.95]} pos={[0, 0.34, 0.98]} rot={[0.08, 0, 0]} c={stripe} />
      {/* alerón delantero de dos planos */}
      <B s={[1.35, 0.04, 0.28]} pos={[0, 0.1, 1.5]} c={accent} />
      <B s={[1.2, 0.04, 0.18]} pos={[0, 0.17, 1.42]} rot={[-0.25, 0, 0]} c={color} />
      {[-1, 1].map((s) => <B key={'fe' + s} s={[0.04, 0.2, 0.36]} pos={[0.68 * s, 0.17, 1.47]} c={stripe} />)}
      {/* cockpit y pontones */}
      <B s={[0.5, 0.26, 1.2]} pos={[0, 0.34, -0.1]} c={color} e={color} ei={glow} />
      {[-1, 1].map((s) => <B key={'sp' + s} s={[0.28, 0.22, 0.85]} pos={[0.38 * s, 0.3, -0.2]} rot={[0, -0.12 * s, 0]} c={accent} />)}
      {[-1, 1].map((s) => <B key={'sl' + s} s={[0.29, 0.05, 0.85]} pos={[0.38 * s, 0.4, -0.2]} rot={[0, -0.12 * s, 0]} c={color} />)}
      <B s={[0.26, 0.34, 0.75]} pos={[0, 0.55, -0.6]} c={color} e={color} ei={glow} />
      <B s={[0.18, 0.18, 0.18]} pos={[0, 0.78, -0.3]} c={dk} />
      <B s={[0.05, 0.36, 0.8]} pos={[0, 0.78, -0.85]} c={stripe} />
      {/* alerón trasero */}
      <B s={[0.95, 0.08, 0.3]} pos={[0, 0.98, -1.25]} c={stripe} />
      <B s={[0.95, 0.05, 0.2]} pos={[0, 0.82, -1.27]} c={color} />
      {[-1, 1].map((s) => <B key={'re' + s} s={[0.04, 0.5, 0.44]} pos={[0.49 * s, 0.8, -1.25]} c={accent} />)}
      <B s={[0.14, 0.08, 0.04]} pos={[0, 0.36, -1.32]} c={RED} e={RED} ei={2.5} />
      {/* casco y halo */}
      <mesh position={[0, 0.6, 0.18]}><icosahedronGeometry args={[0.14, 1]} /><M c={helmet} /></mesh>
      <B s={[0.2, 0.05, 0.03]} pos={[0, 0.62, 0.31]} c={dk} />
      <B s={[0.04, 0.04, 0.46]} pos={[0, 0.76, 0.34]} rot={[0.5, 0, 0]} c={dk} />
      <B s={[0.34, 0.04, 0.04]} pos={[0, 0.76, 0.08]} c={dk} />
      {/* ruedas */}
      {[[-0.64, 1.05], [0.64, 1.05], [-0.66, -0.95], [0.66, -0.95]].map(([x, z], i) => (
        <group key={i} position={[x, 0.29, z]} rotation={[t * speed, 0, 0]}>
          <mesh rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.29, 0.29, i < 2 ? 0.26 : 0.32, 9]} /><M c={dk} /></mesh>
          <mesh rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.3, 0.3, 0.06, 9]} /><M c={i < 2 ? '#ffd23a' : '#ffd23a'} /></mesh>
          <B s={[0.34, 0.05, 0.4]} c="#2b2f35" />
        </group>
      ))}
    </group>
  );
};

/* ---------- Piloto genérico con buzo y casco (sin cara) ---------- */
export const Driver: React.FC<P> = ({ t, p }) => {
  const { suit = CEL, accent = NAVY, helmet = WHITE, visor = '#16222e', pose = 'idle', phase = 0 } = p;
  const sw = Math.sin((t + phase) * 2.1), w = Math.sin((t + phase) * 8);
  let aL: V3 = [0, 0, -0.12 - sw * 0.03], aR: V3 = [0, 0, 0.12 + sw * 0.03];
  if (pose === 'cheer') { aL = [0, 0, -2.7 - w * 0.12]; aR = [0, 0, 2.7 + w * 0.12]; }
  if (pose === 'point') aR = [-1.5 + sw * 0.05, 0, 0.1];
  if (pose === 'hold') { aL = [-1.25, 0, -0.2]; aR = [-1.25, 0, 0.2]; }
  if (pose === 'think') { aR = [-2.3, 0, 0.5]; }
  if (pose === 'shrug') { aL = [0, 0, -1.1 - sw * 0.08]; aR = [0, 0, 1.1 + sw * 0.08]; }
  const y0 = pose === 'cheer' ? Math.abs(Math.sin((t + phase) * 6)) * 0.1 : sw * 0.01;
  return (
    <group position={[0, y0, 0]}>
      {[-1, 1].map((s) => <B key={s} s={[0.2, 0.78, 0.22]} pos={[0.13 * s, 0.39, 0]} c={suit} />)}
      {[-1, 1].map((s) => <B key={'b' + s} s={[0.22, 0.1, 0.3]} pos={[0.13 * s, 0.05, 0.04]} c="#15181c" />)}
      <B s={[0.56, 0.7, 0.32]} pos={[0, 1.13, 0]} c={suit} />
      <B s={[0.57, 0.12, 0.33]} pos={[0, 0.98, 0]} c={accent} />
      <B s={[0.1, 0.7, 0.33]} pos={[0, 1.13, 0.005]} c={WHITE} />
      {([[-0.36, aL], [0.36, aR]] as [number, V3][]).map(([x, r], i) => (
        <group key={i} position={[x, 1.42, 0]} rotation={r}><B s={[0.16, 0.62, 0.18]} pos={[0, -0.28, 0]} c={suit} /><B s={[0.17, 0.14, 0.19]} pos={[0, -0.62, 0]} c="#15181c" /></group>
      ))}
      <mesh position={[0, 1.72, 0]}><icosahedronGeometry args={[0.25, 1]} /><M c={helmet} /></mesh>
      <B s={[0.36, 0.1, 0.1]} pos={[0, 1.74, 0.2]} c={visor} />
      <B s={[0.06, 0.2, 0.46]} pos={[0, 1.9, 0]} c={accent} />
    </group>
  );
};

/* ---------- Semáforo de largada: 5 columnas, se encienden en p.on[i] (s del plano) ---------- */
export const Gantry: React.FC<P> = ({ t, p }) => {
  const on: number[] = p.on ?? [0.2, 0.6, 1.0, 1.4, 1.8]; const off = p.off ?? 99;
  return (
    <group>
      {[-1.7, 1.7].map((x) => <B key={x} s={[0.14, 2.3, 0.14]} pos={[x, 1.15, 0]} c="#1b1e23" />)}
      <B s={[3.6, 0.14, 0.2]} pos={[0, 2.3, 0]} c="#1b1e23" />
      {on.map((ts, i) => { const lit = t >= ts && t < off; return (
        <group key={i} position={[-1.2 + i * 0.6, 1.85, 0.05]}>
          <B s={[0.42, 0.78, 0.18]} c="#0b0c0e" />
          {[0.18, -0.18].map((y) => <mesh key={y} position={[0, y, 0.1]}><sphereGeometry args={[0.13, 10, 8]} /><M c={lit ? '#ff2a1e' : '#3a0d0b'} e={lit ? '#ff2a1e' : undefined} ei={2.6} /></mesh>)}
        </group>); })}
    </group>
  );
};

/* ---------- Cartel de boxes (pit board) en un palo: p.lines [{t, c}] ---------- */
export const PitBoard: React.FC<P> = ({ t, tt, p }) => {
  const { lines = [{ t: 'P?' }], w = 1.2, frame = AMBER, pole = 1.4, swing = 0 } = p;
  const h = 0.36 * lines.length + 0.14;
  return (
    <group rotation={[0, 0, Math.sin(t * 2) * swing]}>
      <Cyl r={0.035} h={pole} pos={[0, pole / 2, 0]} c="#8a8f96" />
      <group position={[0, pole + h / 2, 0]}>
        <B s={[w + 0.08, h + 0.08, 0.05]} pos={[0, 0, -0.03]} c={frame} />
        <B s={[w, h, 0.04]} pos={[0, 0, -0.005]} c="#0c0d10" />
        {lines.map((l: any, i: number) => (
          <group key={i} position={[0, h / 2 - 0.07 - 0.18 - i * 0.36, 0.02]}>
            <Label t={t} tt={tt} p={{ text: l.t, w: w - 0.06, h: 0.34, color: l.c ?? '#ffffff', size: 0.8, weight: 900, depth: 0 }} />
          </group>))}
      </group>
    </group>
  );
};

/* ---------- Muro de neumáticos ---------- */
export const Tyres: React.FC<P> = ({ p }) => {
  const { n = 6, rows = 3, band = RED } = p;
  return (
    <group>
      {Array.from({ length: n }, (_, i) => <group key={i} position={[-((n - 1) * 0.42) / 2 + i * 0.42, 0, 0]}>
        {Array.from({ length: rows }, (_, j) => <Cyl key={j} r={0.2} h={0.16} pos={[0, 0.08 + j * 0.17, 0]} c="#151515" seg={9} />)}
        <Cyl r={0.205} h={0.05} pos={[0, 0.08 + (rows - 1) * 0.085, 0]} c={i % 2 ? band : WHITE} seg={9} />
      </group>)}
    </group>
  );
};

/* ---------- Humo del choque: bolas grises que crecen y suben desde tt=0 ---------- */
export const Smoke: React.FC<P> = ({ tt, p }) => {
  const { n = 9, spread = 0.8 } = p; const r = seedR(13);
  const puffs = React.useMemo(() => Array.from({ length: n }, () => ({ x: (r() - 0.5) * spread, z: (r() - 0.5) * spread, d: r() * 0.5, s: 0.18 + r() * 0.2 })), [n, spread]);
  return (
    <group>{puffs.map((q, i) => { const k = clamp((tt - q.d) / 1.6); if (k <= 0) return null;
      return <mesh key={i} position={[q.x * (1 + k), 0.25 + k * 1.1, q.z]} scale={q.s * (0.6 + k * 1.6)}><icosahedronGeometry args={[1, 0]} /><M c="#8d9399" o={0.85 * (1 - k * 0.7)} /></mesh>; })}</group>
  );
};

/* ---------- Pórtico de llegada a cuadros (banner bajo, sin texto) + línea en el piso ---------- */
export const Finish: React.FC<P> = ({ p }) => {
  const { w = 4.6, h = 1.7 } = p;
  const chk = useTex((g, W, H) => { const n = 16, m = 4; for (let i = 0; i < n; i++) for (let j = 0; j < m; j++) { g.fillStyle = (i + j) % 2 ? '#111' : '#f5f5f5'; g.fillRect((i * W) / n, (j * H) / m, W / n + 1, H / m + 1); } }, 512, 128, 'cq2chk');
  return (
    <group>
      <Flat s={[w - 0.4, 0.5]} pos={[0, 0.035, 0]} rot={[-Math.PI / 2, 0, 0]} map={chk} />
      {[-w / 2, w / 2].map((x) => <B key={x} s={[0.14, h, 0.14]} pos={[x, h / 2, 0]} c="#d9dde2" />)}
      <B s={[w + 0.1, 0.4, 0.1]} pos={[0, h, 0]} c="#111" />
      <Flat s={[w, 0.34]} pos={[0, h, 0.06]} map={chk} />
    </group>
  );
};

/* ---------- Torre de tiempos: filas negras con letras ámbar; p.swap = { a, b, at } intercambia filas ---------- */
export const TimingTower: React.FC<P> = ({ t, tt, p }) => {
  const { rows = [], w = 2.7, rh = 0.44, swap } = p;
  const k = swap ? eio((t - swap.at) / 0.6) : 0;
  return (
    <group>
      <B s={[w + 0.14, rows.length * rh + 0.14, 0.08]} pos={[0, -((rows.length - 1) * rh) / 2, -0.06]} c="#1b1c20" />
      {rows.map((r: any, i: number) => {
        let y = -i * rh;
        if (swap && i === swap.a) y = lerp(-swap.a * rh, -swap.b * rh, k);
        if (swap && i === swap.b) y = lerp(-swap.b * rh, -swap.a * rh, k);
        const flash = r.flashAt !== undefined && t >= r.flashAt; const hi = r.hi || (r.hiAt !== undefined && t >= r.hiAt);
        return (
          <group key={i}>
            <group position={[-w / 2 + 0.3, -i * rh, 0.01]}><B s={[0.5, rh - 0.05, 0.04]} pos={[0, 0, -0.03]} c="#0d0e11" /><Label t={t} tt={tt} p={{ text: r.pos, w: 0.5, h: rh - 0.08, color: AMBER, size: 0.72, weight: 900, depth: 0 }} /></group>
            <group position={[0.3, y, hi ? 0.06 : 0]}>
              <B s={[w - 0.62, rh - 0.05, 0.04]} pos={[0, 0, -0.02]} c={hi ? CELD : flash ? '#7a1a12' : '#0d0e11'} />
              {flash && r.tag && <group position={[(w - 0.62) / 2 - 0.42, 0, 0.04]}><B s={[0.8, rh - 0.1, 0.03]} c={RED} /><group position={[0, 0, 0.02]}><Label t={t} tt={tt} p={{ text: r.tag, w: 0.74, h: rh - 0.14, color: '#fff', size: 0.72, weight: 900, depth: 0 }} /></group></group>}
              <group position={[flash && r.tag ? -0.4 : 0, 0, 0.01]}><Label t={t} tt={tt} p={{ text: r.name, w: flash && r.tag ? w - 1.6 : w - 0.8, h: rh - 0.08, color: '#ffffff', size: 0.6, weight: 800, depth: 0 }} /></group>
            </group>
          </group>);
      })}
    </group>
  );
};

/* ---------- Reloj de pared con agujas fijas (p.h, p.m) ---------- */
export const Clock: React.FC<P> = ({ p }) => {
  const { h = 3, m = 0, r = 0.8 } = p; const ah = -((h % 12) + m / 60) / 12 * Math.PI * 2, am = -(m / 60) * Math.PI * 2;
  return (
    <group>
      <mesh rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[r + 0.08, r + 0.08, 0.1, 24]} /><M c={NAVY} /></mesh>
      <mesh position={[0, 0, 0.055]}><circleGeometry args={[r, 24]} /><meshBasicMaterial color="#f6f3ea" toneMapped={false} /></mesh>
      {Array.from({ length: 12 }, (_, i) => { const a = (i / 12) * Math.PI * 2; return <B key={i} s={[0.05, i % 3 ? 0.1 : 0.2, 0.02]} pos={[Math.sin(a) * r * 0.85, Math.cos(a) * r * 0.85, 0.07]} rot={[0, 0, -a]} c="#1a1a1a" />; })}
      <group rotation={[0, 0, ah]} position={[0, 0, 0.09]}><B s={[0.08, r * 0.55, 0.02]} pos={[0, r * 0.25, 0]} c="#111" /></group>
      <group rotation={[0, 0, am]} position={[0, 0, 0.1]}><B s={[0.05, r * 0.8, 0.02]} pos={[0, r * 0.38, 0]} c={RED} /></group>
      <mesh position={[0, 0, 0.11]}><circleGeometry args={[0.06, 10]} /><meshBasicMaterial color="#111" /></mesh>
    </group>
  );
};

/* ---------- Globos de comentario que suben: p.items [{ t, x, at, c }] ---------- */
export const Bubbles: React.FC<P> = ({ t, tt, p }) => {
  const { items = [], rise = 1.4, dur = 1.1 } = p;
  return (
    <group>{items.map((it: any, i: number) => { const k = (t - it.at) / dur; if (k < 0) return null; const e = eo(k);
      const s = Math.min(1, k * 4) * (1 + Math.max(0, 0.15 - Math.abs(k - 0.25)));
      return (
        <group key={i} position={[it.x, (it.y ?? 0) + e * rise, it.z ?? 0]} scale={s}>
          <B s={[0.78, 0.5, 0.08]} c={it.c ?? WHITE} />
          <B s={[0.16, 0.16, 0.08]} pos={[-0.22, -0.29, 0]} rot={[0, 0, Math.PI / 4]} c={it.c ?? WHITE} />
          <group position={[0, 0, 0.05]}><Label t={t} tt={tt} p={{ text: it.t, w: 0.7, h: 0.44, color: it.tc ?? NAVY, size: 0.75, weight: 900, depth: 0 }} /></group>
        </group>);
    })}</group>
  );
};

/* ---------- Bloque de campeonato: escalón con número ---------- */
export const Step: React.FC<P> = ({ t, tt, p }) => {
  const { h = 1, w = 1, color = GRAPH, text = '', tc = '#fff' } = p;
  return (
    <group>
      <B s={[w, h, 0.9]} pos={[0, h / 2, 0]} c={color} />
      <B s={[w + 0.02, 0.06, 0.92]} pos={[0, h, 0]} c={WHITE} />
      <group position={[0, h - 0.32, 0.46]}><Label t={t} tt={tt} p={{ text, w: w * 0.9, h: 0.44, color: tc, size: 0.8, weight: 900, depth: 0 }} /></group>
    </group>
  );
};

/* ---------- Tarjeta de fecha del calendario (de pie) ---------- */
export const RaceCard: React.FC<P> = ({ t, tt, p }) => {
  const { top = '', big = '', color = GRAPH, hi = false, w = 1.05, h = 1.2 } = p;
  return (
    <group>
      <B s={[w + 0.1, h + 0.1, 0.08]} pos={[0, h / 2 + 0.6, -0.05]} c={hi ? AMBER : '#5a6069'} e={hi ? AMBER : undefined} ei={0.25} />
      <B s={[w, h, 0.06]} pos={[0, h / 2 + 0.6, 0]} c={color} />
      <group position={[0, 0.6 + h * 0.74, 0.04]}><Label t={t} tt={tt} p={{ text: top, w: w * 0.92, h: 0.3, color: '#fff', size: 0.62, weight: 800, depth: 0 }} /></group>
      <group position={[0, 0.6 + h * 0.32, 0.04]}><Label t={t} tt={tt} p={{ text: big, w: w * 0.92, h: 0.5, color: hi ? AMBER : '#fff', size: 0.8, weight: 900, depth: 0 }} /></group>
      <Cyl r={0.04} h={0.6} pos={[0, 0.3, 0]} c="#8a8f96" />
    </group>
  );
};

export const EXTRA = { stage: Stage, f1: Car, pilot: Driver, gantry: Gantry, pitboard: PitBoard, tyres: Tyres, smoke: Smoke, finish: Finish,
  timing: TimingTower, clock: Clock, bubbles: Bubbles, step: Step, racecard: RaceCard };
