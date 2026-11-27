import React from 'react';
import * as THREE from 'three';
import { M, Label, useTex } from '../../src/kit/Props';
import { clamp, eio, eo, lerp } from '../../src/kit/math';

// Look propio de este video (distinto de colapinto-fp1-qatar, que era Lusail al caer el sol con pianos verdes, telemetría
// azul petróleo, boxes y sala de prensa; y de fp2-qatar-general, Lusail de noche): un diorama de escritorio. Mesa de nogal
// oscuro con una pista de juguete (asfalto con pianos ROJOS y blancos y dos rieles plateados por carril), un almanaque de
// escritorio (VIERNES -> SÁBADO) y una lámpara cálida fuera de cuadro. Para los datos, una pizarra verde oscura; para los
// frenos, un taller negro; para la roja, una leca de noche; para Las Vegas, un cielo violeta con neones solo abajo.
// Autos genéricos sin logos ni sponsors: azul con rosa (Alpine), azul marino con celeste (Williams), plateado (genérico).
// La parte alta de cada fondo es oscura y lisa: ahí van los subtítulos (y 290-390 px).
// Texto 3D siempre 0,02 delante de la cara del panel.
type P = { t: number; tt: number; p: any };
type V3 = [number, number, number];
const B: React.FC<{ s: V3; pos?: V3; rot?: V3; c: string; e?: string; ei?: number; o?: number }> = ({ s, pos, rot, c, e, ei, o }) => (
  <mesh position={pos} rotation={rot}><boxGeometry args={s} /><M c={c} e={e} ei={ei} o={o} /></mesh>
);
const Flat: React.FC<{ s: [number, number]; pos?: V3; rot?: V3; c?: string; map?: THREE.Texture; o?: number; add?: boolean }> = ({ s, pos, rot, c = '#fff', map, o, add }) => (
  <mesh position={pos} rotation={rot}><planeGeometry args={s} /><meshBasicMaterial color={c} map={map} toneMapped={false} transparent={o !== undefined} opacity={o ?? 1}
    blending={add ? THREE.AdditiveBlending : THREE.NormalBlending} depthWrite={!add} /></mesh>
);
const Cyl: React.FC<{ r: number; h: number; pos?: V3; rot?: V3; c: string; e?: string; ei?: number; seg?: number; r2?: number }> = ({ r, h, pos, rot, c, e, ei, seg = 12, r2 }) => (
  <mesh position={pos} rotation={rot}><cylinderGeometry args={[r2 ?? r, r, h, seg]} /><M c={c} e={e} ei={ei} /></mesh>
);
const seedR = (seed: number) => { let s = seed; return () => ((s = (s * 9301 + 49297) % 233280) / 233280); };
const GAP = 0.02; // texto 3D: 2 cm delante del panel

export const BLUE = '#1f4fd8', BLUED = '#0c1c4f', PINK = '#ff5fa2', WHITE = '#f3f5f7', INK = '#0b1020', AMBER = '#ffb000',
  RED = '#e2412f', NAVY = '#0b2a66', SKY = '#4fb3ff', SILVER = '#b9bec6', STEEL = '#8a8f96', CHALK = '#e8efe6', LIME = '#c8f25a';

export const ALP = { color: BLUE, accent: PINK, stripe: BLUED };
export const WIL = { color: NAVY, accent: SKY, stripe: '#061538' };
export const SIL = { color: SILVER, accent: '#2b2f35', stripe: '#1b1e23' };

/* ---------- Pista de juguete: recta a lo largo de z (ancho w), pianos rojos y blancos, dos rieles por carril ---------- */
const Straight: React.FC<{ w?: number; len?: number; off?: number; x?: number; asph: THREE.Texture }> = ({ w = 2.6, len = 30, off = 0, x = 0, asph }) => (
  <group position={[x, 0, 0]}>
    <Flat s={[w, len]} pos={[0, 0.02, 0]} rot={[-Math.PI / 2, 0, 0]} map={asph} />
    {[-1, 1].map((k) => <group key={k}>{Array.from({ length: Math.ceil(len / 0.5) }, (_, i) => (
      <B key={i} s={[0.22, 0.03, 0.5]} pos={[k * (w / 2 + 0.11), 0.025, len / 2 - i * 0.5 - (off % 1)]} c={i % 2 ? RED : WHITE} />))}</group>)}
    {[-w / 4, w / 4].map((lx) => [-0.05, 0.05].map((d) => <B key={lx + '' + d} s={[0.018, 0.012, len]} pos={[lx + d, 0.03, 0]} c="#9aa1ab" />))}
  </group>
);

/* ---------- Escenarios (tapan el set 'room' entero) ---------- */
export const Stage: React.FC<P> = ({ t, p }) => {
  const kind = p.kind ?? 'mesa'; const speed = p.speed ?? 0; const off = ((t * speed) % 1 + 1) % 1;
  const wood = useTex((g, W, H) => {
    g.fillStyle = '#3a2416'; g.fillRect(0, 0, W, H); const r = seedR(5);
    for (let i = 0; i < 90; i++) { g.strokeStyle = ['#2e1c11', '#45291a', '#331f13'][i % 3]; g.lineWidth = 2 + r() * 4; g.beginPath(); const y = r() * H; g.moveTo(0, y);
      for (let x = 0; x <= W; x += 32) g.lineTo(x, y + Math.sin(x / 70 + i) * 6); g.stroke(); }
  }, 512, 512, 'fp2wood');
  const asph = useTex((g, W, H) => {
    g.fillStyle = '#23252a'; g.fillRect(0, 0, W, H); const r = seedR(9);
    for (let i = 0; i < 2200; i++) { g.fillStyle = ['#2c2f35', '#1c1e22', '#33363d'][i % 3]; g.fillRect(r() * W, r() * H, 3, 3); }
  }, 512, 512, 'fp2asph');
  const gravel = useTex((g, W, H) => {
    g.fillStyle = '#5b5752'; g.fillRect(0, 0, W, H); const r = seedR(17);
    for (let i = 0; i < 3200; i++) { g.fillStyle = ['#4d4a46', '#6a6560', '#433f3c'][i % 3]; g.fillRect(r() * W, r() * H, 3, 3); }
  }, 512, 512, 'fp2grav');
  const room = useTex((g, W, H) => {
    // pared de la habitación: muy oscura arriba, un resplandor cálido de lámpara solo en la franja baja
    const gr = g.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, '#07060a'); gr.addColorStop(0.6, '#0c0a10'); gr.addColorStop(0.86, '#1f1610'); gr.addColorStop(1, '#2c1e12');
    g.fillStyle = gr; g.fillRect(0, 0, W, H);
    for (let i = 0; i < 9; i++) { g.fillStyle = 'rgba(255,255,255,.025)'; g.fillRect(i * 58 + 10, H * 0.62, 4, H * 0.38); }
  }, 512, 512, 'fp2room');
  const board = useTex((g, W, H) => {
    g.fillStyle = '#0a1310'; g.fillRect(0, 0, W, H);
    const gr = g.createLinearGradient(0, H * 0.55, 0, H); gr.addColorStop(0, '#0a1310'); gr.addColorStop(1, '#16271f'); g.fillStyle = gr; g.fillRect(0, H * 0.55, W, H * 0.45);
    // trazos de tiza borrados, solo abajo
    const r = seedR(31); g.strokeStyle = 'rgba(220,235,220,.08)'; g.lineWidth = 5;
    for (let i = 0; i < 14; i++) { g.beginPath(); const y = H * (0.7 + r() * 0.26); g.moveTo(r() * W, y); g.lineTo(r() * W, y + (r() - 0.5) * 30); g.stroke(); }
    g.fillStyle = '#3a2a1c'; g.fillRect(0, H * 0.965, W, H * 0.035);
  }, 512, 512, 'fp2board');
  const garage = useTex((g, W, H) => {
    g.fillStyle = '#050608'; g.fillRect(0, 0, W, H);
    g.fillStyle = '#2a1a0c'; g.fillRect(0, H * 0.88, W, H * 0.012); g.fillStyle = '#ffb35a'; g.globalAlpha = 0.35; g.fillRect(0, H * 0.885, W, H * 0.004); g.globalAlpha = 1;
    for (let i = 0; i < 6; i++) { g.fillStyle = '#0d0f13'; g.fillRect(12 + i * 84, H * 0.9, 70, H * 0.1); }
  }, 512, 512, 'fp2garage');
  const night = useTex((g, W, H) => {
    const gr = g.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, '#030511'); gr.addColorStop(0.7, '#060a1c'); gr.addColorStop(0.9, '#0f1630'); gr.addColorStop(1, '#151d3a');
    g.fillStyle = gr; g.fillRect(0, 0, W, H);
    // barrera de neumáticos y focos lejanos, solo en la franja baja
    for (let i = 0; i < 26; i++) { g.fillStyle = i % 2 ? '#1a1d24' : '#24120f'; g.fillRect(i * 20, H * 0.93, 18, H * 0.07); }
    for (let i = 0; i < 7; i++) { g.fillStyle = '#ffe9b8'; g.globalAlpha = 0.5; g.fillRect(30 + i * 72, H * 0.9, 6, 3); g.globalAlpha = 1; }
  }, 512, 512, 'fp2night');
  const vegas = useTex((g, W, H) => {
    const gr = g.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, '#05020c'); gr.addColorStop(0.66, '#0d0520'); gr.addColorStop(0.86, '#2a0b3e'); gr.addColorStop(1, '#3d0f4a');
    g.fillStyle = gr; g.fillRect(0, 0, W, H); const r = seedR(41);
    // skyline bajo con ventanas de neón (todo por debajo del 82 % de la altura)
    for (let i = 0; i < 16; i++) { const w = 22 + r() * 18, h = H * (0.06 + r() * 0.1), x = i * 33; g.fillStyle = '#120822'; g.fillRect(x, H - h, w, h);
      for (let k = 0; k < 6; k++) { g.fillStyle = ['#ff3ea5', '#27e0d8', '#ffb52e'][(i + k) % 3]; g.globalAlpha = 0.55; g.fillRect(x + 4 + (k % 2) * 10, H - h + 8 + Math.floor(k / 2) * 12, 5, 4); } g.globalAlpha = 1; }
  }, 512, 512, 'fp2vegas');
  const walls = (map: THREE.Texture) => (<>
    <Flat s={[14, 12]} pos={[0, 3.9, -3.7]} map={map} />
    {[-1, 1].map((k) => <Flat key={k} s={[12, 12]} pos={[k * 4.34, 3.9, 0]} rot={[0, -k * Math.PI / 2, 0]} map={map} />)}
  </>);
  const floor = (map: THREE.Texture) => <Flat s={[30, 30]} pos={[0, 0.012, 0]} rot={[-Math.PI / 2, 0, 0]} map={map} />;

  if (kind === 'mesa') return (
    <group>
      <pointLight position={[1.6, 3.4, 2.2]} intensity={30} color="#ffd9a8" distance={14} />
      <pointLight position={[-2.6, 1.2, -1]} intensity={8} color={PINK} distance={7} />
      {floor(wood)}
      {p.track !== false && <Straight asph={asph} off={off} x={p.tx ?? 0} w={p.tw ?? 2.6} />}
      {walls(room)}
    </group>
  );
  if (kind === 'curva') {
    // curva de 90° vista desde arriba: entra desde +z por x = cx - r y sale hacia +x por z = cz - r
    const { cx = 1.2, cz = 0.4, r0 = 1.0, r1 = 2.9 } = p;
    const n = 24;
    return (
      <group>
        <pointLight position={[0.5, 4.0, 2.5]} intensity={34} color="#ffd9a8" distance={14} />
        {floor(wood)}
        <group position={[cx, 0.02, cz]} rotation={[-Math.PI / 2, 0, 0]}>
          <mesh><ringGeometry args={[r0, r1, 40, 1, Math.PI / 2, Math.PI / 2]} /><meshBasicMaterial map={asph} toneMapped={false} /></mesh>
        </group>
        <Flat s={[r1 - r0, 12]} pos={[cx - (r0 + r1) / 2, 0.02, cz + 6]} rot={[-Math.PI / 2, 0, 0]} map={asph} />
        <Flat s={[12, r1 - r0]} pos={[cx + 6, 0.02, cz - (r0 + r1) / 2]} rot={[-Math.PI / 2, 0, 0]} map={asph} />
        {[r0 - 0.11, r1 + 0.11].map((rr, j) => Array.from({ length: n }, (_, i) => { const a = Math.PI / 2 + ((i + 0.5) / n) * (Math.PI / 2);
          return <B key={j + '-' + i} s={[0.22, 0.03, (rr * Math.PI / 2) / n]} pos={[cx + Math.cos(a) * rr, 0.025, cz - Math.sin(a) * rr]} rot={[0, a, 0]} c={i % 2 ? RED : WHITE} />; }))}
        {[r0 - 0.11, r1 + 0.11].map((rr, j) => Array.from({ length: 22 }, (_, i) => <B key={'z' + j + i} s={[0.22, 0.03, 0.5]} pos={[cx - rr, 0.025, cz + 0.25 + i * 0.5]} c={i % 2 ? WHITE : RED} />))}
        {[r0 - 0.11, r1 + 0.11].map((rr, j) => Array.from({ length: 22 }, (_, i) => <B key={'x' + j + i} s={[0.5, 0.03, 0.22]} pos={[cx + 0.25 + i * 0.5, 0.025, cz - rr]} c={i % 2 ? WHITE : RED} />))}
        {walls(room)}
      </group>
    );
  }
  if (kind === 'pizarra') return (
    <group>
      <pointLight position={[0, 3.0, 3]} intensity={26} color="#fff1dc" distance={12} />
      {floor(wood)}
      {walls(board)}
    </group>
  );
  if (kind === 'taller') return (
    <group>
      <pointLight position={[1.2, 2.4, 2.6]} intensity={26} color="#fff1dc" distance={10} />
      <pointLight position={[-1.5, 0.6, 0.8]} intensity={14} color="#ff7a2a" distance={6} />
      <Flat s={[30, 30]} pos={[0, 0.012, 0]} rot={[-Math.PI / 2, 0, 0]} c="#15171b" />
      {Array.from({ length: 12 }, (_, i) => <Flat key={i} s={[30, 0.015]} pos={[0, 0.016, 3 - i * 0.8]} rot={[-Math.PI / 2, 0, 0]} c="#22252b" />)}
      {walls(garage)}
    </group>
  );
  if (kind === 'leca') return (
    <group>
      <pointLight position={[0, 3.4, 2.6]} intensity={28} color="#e6ecff" distance={13} />
      <pointLight position={[-2.2, 1.0, -1.5]} intensity={10} color={RED} distance={7} />
      {floor(gravel)}
      <Straight asph={asph} x={2.6} w={1.8} />
      {walls(night)}
    </group>
  );
  // vegas
  return (
    <group>
      <pointLight position={[0, 3.2, 2.6]} intensity={24} color="#ffe6ff" distance={12} />
      <pointLight position={[-2.4, 0.8, -1]} intensity={14} color="#ff3ea5" distance={7} />
      <pointLight position={[2.4, 0.8, -1]} intensity={14} color="#27e0d8" distance={7} />
      <Flat s={[30, 30]} pos={[0, 0.012, 0]} rot={[-Math.PI / 2, 0, 0]} c="#0b0716" />
      <Straight asph={asph} off={off} />
      {[-1.75, 1.75].map((x, i) => <B key={x} s={[0.05, 0.04, 30]} pos={[x, 0.03, 0]} c={i ? '#27e0d8' : '#ff3ea5'} e={i ? '#27e0d8' : '#ff3ea5'} ei={1.4} />)}
      {walls(vegas)}
    </group>
  );
};

/* ---------- Monoplaza genérico: trompa hacia +z, ~3 de largo a escala 1 ---------- */
export const Car: React.FC<P> = ({ t, p }) => {
  const { color = BLUE, accent = PINK, stripe = BLUED, helmet = WHITE, speed = 0, glow = 0.1 } = p;
  const dk = '#111317';
  return (
    <group>
      <B s={[1.05, 0.05, 2.0]} pos={[0, 0.12, -0.15]} c={dk} />
      <B s={[0.3, 0.14, 0.95]} pos={[0, 0.26, 1.0]} rot={[0.08, 0, 0]} c={color} e={color} ei={glow} />
      <B s={[0.32, 0.03, 0.95]} pos={[0, 0.34, 0.98]} rot={[0.08, 0, 0]} c={stripe} />
      <B s={[1.35, 0.04, 0.28]} pos={[0, 0.1, 1.5]} c={accent} />
      <B s={[1.2, 0.04, 0.18]} pos={[0, 0.17, 1.42]} rot={[-0.25, 0, 0]} c={color} />
      {[-1, 1].map((s) => <B key={'fe' + s} s={[0.04, 0.2, 0.36]} pos={[0.68 * s, 0.17, 1.47]} c={stripe} />)}
      <B s={[0.5, 0.26, 1.2]} pos={[0, 0.34, -0.1]} c={color} e={color} ei={glow} />
      {[-1, 1].map((s) => <B key={'sp' + s} s={[0.28, 0.22, 0.85]} pos={[0.38 * s, 0.3, -0.2]} rot={[0, -0.12 * s, 0]} c={color} />)}
      {[-1, 1].map((s) => <B key={'sl' + s} s={[0.29, 0.05, 0.85]} pos={[0.38 * s, 0.4, -0.2]} rot={[0, -0.12 * s, 0]} c={accent} />)}
      <B s={[0.26, 0.34, 0.75]} pos={[0, 0.55, -0.6]} c={color} e={color} ei={glow} />
      <B s={[0.18, 0.18, 0.18]} pos={[0, 0.78, -0.3]} c={dk} />
      <B s={[0.05, 0.36, 0.8]} pos={[0, 0.78, -0.85]} c={accent} />
      <B s={[0.95, 0.08, 0.3]} pos={[0, 0.98, -1.25]} c={stripe} />
      <B s={[0.95, 0.05, 0.2]} pos={[0, 0.82, -1.27]} c={color} />
      {[-1, 1].map((s) => <B key={'re' + s} s={[0.04, 0.5, 0.44]} pos={[0.49 * s, 0.8, -1.25]} c={accent} />)}
      <B s={[0.14, 0.08, 0.04]} pos={[0, 0.36, -1.32]} c={RED} e={RED} ei={2.5} />
      <mesh position={[0, 0.6, 0.18]}><icosahedronGeometry args={[0.14, 1]} /><M c={helmet} /></mesh>
      <B s={[0.2, 0.05, 0.03]} pos={[0, 0.62, 0.31]} c={dk} />
      <B s={[0.04, 0.04, 0.46]} pos={[0, 0.76, 0.34]} rot={[0.5, 0, 0]} c={dk} />
      <B s={[0.34, 0.04, 0.04]} pos={[0, 0.76, 0.08]} c={dk} />
      {[[-0.64, 1.05], [0.64, 1.05], [-0.66, -0.95], [0.66, -0.95]].map(([x, z], i) => (
        <group key={i} position={[x, 0.29, z]} rotation={[t * speed, 0, 0]}>
          <mesh rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.29, 0.29, i < 2 ? 0.26 : 0.32, 9]} /><M c={dk} /></mesh>
          <mesh rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.3, 0.3, 0.06, 9]} /><M c={p.band ?? WHITE} /></mesh>
          <B s={[0.34, 0.05, 0.4]} c="#2b2f35" />
        </group>
      ))}
    </group>
  );
};

/* ---------- Auto que recorre la curva 1: recta por x = cx - r (hacia -z), cuarto de círculo, recta hacia +x ----------
   p.r radio de su línea, p.s0 / p.s1 distancia recorrida al principio y al final (0 = entrada a la curva), p.dur, p.delay */
export const pathAt = (cx: number, cz: number, r: number, s: number): { x: number; z: number; ry: number } => {
  const L = (Math.PI / 2) * r;
  if (s <= 0) return { x: cx - r, z: cz - s, ry: Math.PI };
  if (s >= L) return { x: cx + (s - L), z: cz - r, ry: Math.PI / 2 };
  const f = s / r; return { x: cx - r * Math.cos(f), z: cz - r * Math.sin(f), ry: Math.atan2(Math.sin(f), -Math.cos(f)) };
};
export const CurveCar: React.FC<P> = ({ t, p }) => {
  const { cx = 1.2, cz = 0.4, r = 1.6, s0 = -2, s1 = 3, dur = 3, delay = 0, sc = 0.42, car = {} } = p;
  const k = clamp((t - delay) / dur); const s = lerp(s0, s1, k * 0.35 + eio(k) * 0.65);
  const q = pathAt(cx, cz, r, s);
  return <group position={[q.x, 0, q.z]} rotation={[0, q.ry, 0]} scale={sc}><Car t={t} tt={t} p={{ ...car, speed: 14 }} /></group>;
};

/* ---------- Almanaque de escritorio: p.pages [{ top, big, sub, at }]; la hoja vieja se da vuelta hacia arriba ---------- */
export const Almanac: React.FC<P> = ({ t, tt, p }) => {
  const { pages = [{ top: 'VIERNES', big: '27' }], w = 1.5, h = 1.25, band = RED } = p;
  let cur = 0; pages.forEach((pg: any, i: number) => { if (i > 0 && t >= pg.at) cur = i; });
  const flipK = cur > 0 ? eio((t - pages[cur].at) / 0.45) : 1;
  const page = (pg: any) => (
    <group>
      <B s={[w, h, 0.04]} pos={[0, -h / 2, 0]} c="#f1ede4" />
      <B s={[w, 0.34, 0.045]} pos={[0, -0.17, 0.002]} c={pg.band ?? band} />
      <group position={[0, -0.17, 0.0245 + GAP]}><Label t={t} tt={tt} p={{ text: pg.top, w: w * 0.92, h: 0.3, color: '#fff', size: 0.74, weight: 900, depth: 0 }} /></group>
      <group position={[0, -0.34 - (h - 0.34) * 0.48, 0.02 + GAP]}><Label t={t} tt={tt} p={{ text: pg.big, w: w * 0.9, h: (h - 0.34) * 0.8, color: '#1a1420', size: 0.82, weight: 900, depth: 0 }} /></group>
    </group>
  );
  return (
    <group>
      {/* atril: dos patas en A, oscuras */}
      {[-1, 1].map((s) => <B key={s} s={[0.06, h + 0.25, 0.06]} pos={[s * (w / 2 - 0.12), (h + 0.25) / 2 - 0.02, -0.22]} rot={[-0.28, 0, 0]} c="#2a2a30" />)}
      <B s={[w + 0.08, 0.08, 0.1]} pos={[0, h + 0.12, -0.02]} c="#2a2a30" />
      {[-0.45, 0, 0.45].map((x) => <Cyl key={x} r={0.035} h={0.12} pos={[x * w / 1.5, h + 0.16, 0.02]} rot={[0, 0, Math.PI / 2]} c={STEEL} />)}
      <group position={[0, h + 0.08, 0.05]} rotation={[-0.28, 0, 0]}>
        <B s={[w, h, 0.03]} pos={[0, -h / 2, -0.04]} c="#d8d2c6" />
        {page(pages[cur])}
        {cur > 0 && flipK < 1 && <group rotation={[-Math.PI * flipK * 0.95, 0, 0]} position={[0, 0, 0.03]}>{page(pages[cur - 1])}</group>}
      </group>
    </group>
  );
};

/* ---------- Hojita suelta de almanaque (para "un par de viernes") ---------- */
export const Sheet: React.FC<P> = ({ t, tt, p }) => {
  const { top = 'VIERNES', big = '', w = 0.8, h = 0.62, band = RED } = p;
  return (
    <group>
      <B s={[w, h, 0.02]} pos={[0, h / 2, 0]} c="#f1ede4" />
      <B s={[w, 0.2, 0.025]} pos={[0, h - 0.1, 0.001]} c={band} />
      <group position={[0, h - 0.1, 0.0135 + GAP]}><Label t={t} tt={tt} p={{ text: top, w: w * 0.9, h: 0.17, color: '#fff', size: 0.78, weight: 900, depth: 0 }} /></group>
      {big && <group position={[0, (h - 0.2) / 2, 0.01 + GAP]}><Label t={t} tt={tt} p={{ text: big, w: w * 0.86, h: (h - 0.2) * 0.8, color: '#1a1420', size: 0.8, weight: 900, depth: 0 }} /></group>}
    </group>
  );
};

/* ---------- Piloto genérico con buzo y casco (sin cara, sin nombre) ---------- */
export const Driver: React.FC<P> = ({ t, p }) => {
  const { suit = BLUE, accent = PINK, helmet = WHITE, visor = '#16222e', pose = 'idle', phase = 0 } = p;
  const sw = Math.sin((t + phase) * 2.1);
  let aL: V3 = [0, 0, -0.12 - sw * 0.03], aR: V3 = [0, 0, 0.12 + sw * 0.03];
  if (pose === 'shrug') { aL = [0, 0, -1.1 - sw * 0.08]; aR = [0, 0, 1.1 + sw * 0.08]; }
  if (pose === 'point') aR = [-1.5 + sw * 0.05, 0, 0.1];
  if (pose === 'hips') { aL = [0, 0, -0.75]; aR = [0, 0, 0.75]; }
  return (
    <group position={[0, sw * 0.01, 0]}>
      {[-1, 1].map((s) => <B key={s} s={[0.2, 0.78, 0.22]} pos={[0.13 * s, 0.39, 0]} c={suit} />)}
      {[-1, 1].map((s) => <B key={'b' + s} s={[0.22, 0.1, 0.3]} pos={[0.13 * s, 0.05, 0.04]} c="#15181c" />)}
      <B s={[0.56, 0.7, 0.32]} pos={[0, 1.13, 0]} c={suit} />
      <B s={[0.57, 0.12, 0.33]} pos={[0, 0.98, 0]} c={accent} />
      {([[-0.36, aL], [0.36, aR]] as [number, V3][]).map(([x, r], i) => (
        <group key={i} position={[x, 1.42, 0]} rotation={r}><B s={[0.16, 0.62, 0.18]} pos={[0, -0.28, 0]} c={suit} /><B s={[0.17, 0.14, 0.19]} pos={[0, -0.62, 0]} c="#15181c" /></group>
      ))}
      <mesh position={[0, 1.72, 0]}><icosahedronGeometry args={[0.25, 1]} /><M c={helmet} /></mesh>
      <B s={[0.36, 0.1, 0.1]} pos={[0, 1.74, 0.2]} c={visor} />
      <B s={[0.06, 0.2, 0.46]} pos={[0, 1.9, 0]} c={accent} />
    </group>
  );
};

/* ---------- Ondas de radio: arcos que salen hacia arriba y adelante desde tt = 0 ---------- */
export const Radio: React.FC<P> = ({ t, tt, p }) => {
  const { color = AMBER, n = 3, r = 0.35, every = 0.35, life = 1.2, loops = 3 } = p;
  return (<group>{Array.from({ length: n * loops }, (_, i) => { const a = tt - i * every; if (a < 0 || a > life) return null; const k = a / life;
    return <mesh key={i} rotation={[0, 0, Math.PI / 4]} scale={r + k * 0.5}><torusGeometry args={[1, 0.05 / (r + k * 0.5), 4, 16, Math.PI / 2]} /><meshBasicMaterial color={color} transparent opacity={1 - k} toneMapped={false} /></mesh>; })}</group>);
};

/* ---------- Chispa de "casi se tocan": destello entre dos ruedas ---------- */
export const Flash: React.FC<P> = ({ tt, p }) => {
  const { color = AMBER, life = 0.5 } = p; const k = clamp(tt / life); if (k >= 1) return null; const s = 0.15 + eo(k) * 0.45;
  return (<group scale={s}>{[0, 1, 2, 3].map((i) => <B key={i} s={[0.08, 1, 0.08]} rot={[0, 0, (i * Math.PI) / 4]} c={color} e={color} ei={2} o={1 - k} />)}</group>);
};

/* ---------- Rueda delantera de cerca con disco de freno que se pone al rojo desde tt ---------- */
export const Brake: React.FC<P> = ({ t, tt, p }) => {
  const { heat = 1.2, r = 0.9 } = p; const k = eio(tt / heat); const flick = 0.85 + Math.sin(t * 23) * 0.15;
  const hot = new THREE.Color('#3a3d44').lerp(new THREE.Color('#ff4a12'), k).getStyle();
  return (
    <group>
      {/* goma (de canto hacia cámara: el eje es z) */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.25]}><cylinderGeometry args={[r, r, 0.5, 18]} /><M c="#17181b" /></mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.005]}><cylinderGeometry args={[r * 0.66, r * 0.66, 0.02, 18]} /><M c="#2a2d33" /></mesh>
      {/* disco */}
      <mesh rotation={[Math.PI / 2, t * 4, 0]} position={[0, 0, 0.04]}><cylinderGeometry args={[r * 0.56, r * 0.56, 0.06, 20]} /><M c={hot} e={k > 0.05 ? '#ff3a0a' : undefined} ei={1.6 * k * flick} /></mesh>
      {Array.from({ length: 10 }, (_, i) => { const a = (i / 10) * Math.PI * 2 + t * 4; return <B key={i} s={[0.05, 0.05, 0.02]} pos={[Math.cos(a) * r * 0.42, Math.sin(a) * r * 0.42, 0.08]} c="#121316" />; })}
      <Cyl r={r * 0.16} h={0.1} pos={[0, 0, 0.1]} rot={[Math.PI / 2, 0, 0]} c={STEEL} />
      {/* pinza */}
      <B s={[0.34, 0.5, 0.16]} pos={[r * 0.45, r * 0.18, 0.12]} rot={[0, 0, -0.3]} c={BLUE} />
      {/* resplandor */}
      {k > 0.05 && <mesh position={[0, 0, 0.12]}><circleGeometry args={[r * 0.9, 20]} /><meshBasicMaterial color="#ff5a1a" transparent opacity={0.25 * k * flick} toneMapped={false} blending={THREE.AdditiveBlending} depthWrite={false} /></mesh>}
    </group>
  );
};

/* ---------- Neumático de pie con banda de compuesto ---------- */
export const Tyre: React.FC<P> = ({ t, p }) => {
  const { r = 0.6, w = 0.45, band = RED, roll = 0 } = p;
  return (
    <group rotation={[t * roll, 0, 0]}>
      <mesh rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[r, r, w, 22]} /><M c="#1b1b1e" /></mesh>
      {[-1, 1].map((s) => <mesh key={s} position={[s * (w / 2 + 0.003), 0, 0]} rotation={[0, s * Math.PI / 2, 0]}><ringGeometry args={[r * 0.62, r * 0.72, 22]} /><meshBasicMaterial color={band} toneMapped={false} side={THREE.DoubleSide} /></mesh>)}
      {[-1, 1].map((s) => <mesh key={'h' + s} position={[s * (w / 2 + 0.002), 0, 0]} rotation={[0, s * Math.PI / 2, 0]}><circleGeometry args={[r * 0.5, 16]} /><meshBasicMaterial color="#5d636c" toneMapped={false} side={THREE.DoubleSide} /></mesh>)}
    </group>
  );
};

/* ---------- Vuelta a medias: anillo de p.n tramos que se encienden hasta p.stop (fracción) y se corta en rojo ---------- */
export const HalfLap: React.FC<P> = ({ tt, p }) => {
  const { n = 24, r = 0.75, dur = 1.4, stop = 0.5, color = '#ff5a5a', cutAt = 99 } = p;
  const lit = Math.floor(clamp(tt / dur) * n * stop + 0.0001);
  return (<group>{Array.from({ length: n }, (_, i) => { const a = Math.PI / 2 - (i / n) * Math.PI * 2; const on = i < lit; const cut = tt >= cutAt && i >= lit && i < n * stop + 0.5;
    const c = on ? color : cut ? '#4a1414' : '#262a33';
    return <B key={i} s={[0.1, 0.22, 0.05]} pos={[Math.cos(a) * r, Math.sin(a) * r, 0]} rot={[0, 0, a - Math.PI / 2]} c={c} e={on ? c : undefined} ei={1.1} />; })}</group>);
};

/* ---------- Bandera roja que flamea en un mástil ---------- */
export const RedFlag: React.FC<P> = ({ t, p }) => {
  const { pole = 1.5, w = 0.9, h = 0.55, segs = 6 } = p;
  return (
    <group>
      <Cyl r={0.03} h={pole} pos={[0, pole / 2, 0]} c={STEEL} />
      <group position={[0.03, pole - h / 2 - 0.02, 0]}>
        {Array.from({ length: segs }, (_, i) => { const x = (i + 0.5) * (w / segs); const z = Math.sin(t * 7 - i * 0.9) * 0.05 * (i / segs + 0.2);
          return <B key={i} s={[w / segs + 0.005, h, 0.02]} pos={[x, 0, z]} rot={[0, Math.cos(t * 7 - i * 0.9) * 0.25, 0]} c="#e0262a" e="#e0262a" ei={0.35} />; })}
      </group>
    </group>
  );
};

/* ---------- Montoncitos de leca alrededor de un auto enterrado ---------- */
export const Heap: React.FC<P> = ({ p }) => {
  const { n = 14, seed = 3, spread = [1.4, 0.9] } = p; const r = seedR(seed);
  const pts = React.useMemo(() => Array.from({ length: n }, () => [(r() - 0.5) * spread[0] * 2, (r() - 0.5) * spread[1] * 2, 0.12 + r() * 0.16]), [n, seed]);
  return (<group>{pts.map(([x, z, s], i) => <mesh key={i} position={[x, 0.02, z]} scale={[s * 1.6, s * 0.7, s * 1.3]}><icosahedronGeometry args={[1, 0]} /><M c={i % 2 ? '#625e59' : '#55514c'} /></mesh>)}</group>);
};

/* ---------- Torre de tiempos: filas { pos, time, sw (color del equipo), hi, dots, at (s del plano) } ---------- */
export const Tower: React.FC<P> = ({ t, tt, p }) => {
  const { rows = [], w = 2.4, rh = 0.46 } = p; const frame = rows.length * rh + 0.14;
  return (
    <group>
      <B s={[w + 0.14, frame, 0.08]} pos={[0, -((rows.length - 1) * rh) / 2, -0.06]} c="#05080a" />
      {rows.map((r: any, i: number) => {
        const vis = r.at === undefined || t >= r.at; if (!vis) return null; const k = r.at === undefined ? 1 : eo((t - r.at) / 0.25);
        const face = 0.02; // cara delantera de las celdas
        return (
          <group key={i} position={[(1 - k) * -0.4, -i * rh, 0]} scale={[1, Math.max(0.01, k), 1]}>
            <B s={[0.56, rh - 0.06, 0.04]} pos={[-w / 2 + 0.32, 0, 0]} c={r.dots ? '#0c1210' : r.hi ? PINK : '#1d2a24'} />
            <group position={[-w / 2 + 0.32, 0, face + GAP]}><Label t={t} tt={tt} p={{ text: r.pos, w: 0.52, h: rh - 0.12, color: r.dots ? '#5c6a62' : '#fff', size: 0.72, weight: 900, depth: 0 }} /></group>
            {!r.dots && <B s={[0.12, rh - 0.06, 0.04]} pos={[-w / 2 + 0.7, 0, 0]} c={r.sw ?? SILVER} />}
            <B s={[w - 0.9, rh - 0.06, 0.04]} pos={[0.37, 0, 0]} c={r.dots ? '#0c1210' : r.hi ? BLUE : '#14201b'} />
            <group position={[0.37, 0, face + GAP]}><Label t={t} tt={tt} p={{ text: r.time, w: w - 1.0, h: rh - 0.12, color: r.dots ? '#5c6a62' : '#fff', size: 0.62, weight: 800, depth: 0 }} /></group>
          </group>);
      })}
    </group>
  );
};

/* ---------- Cartel de boxes en un palo: p.lines [{t, c}] ---------- */
export const PitBoard: React.FC<P> = ({ t, tt, p }) => {
  const { lines = [{ t: 'P?' }], w = 1.0, frame = PINK, pole = 0.6 } = p;
  const h = 0.32 * lines.length + 0.12;
  return (
    <group>
      <Cyl r={0.03} h={pole} pos={[0, pole / 2, 0]} c={STEEL} />
      <group position={[0, pole + h / 2, 0]}>
        <B s={[w + 0.08, h + 0.08, 0.05]} pos={[0, 0, -0.03]} c={frame} />
        <B s={[w, h, 0.04]} pos={[0, 0, 0]} c="#0c0d10" />
        {lines.map((l: any, i: number) => (
          <group key={i} position={[0, h / 2 - 0.06 - 0.16 - i * 0.32, 0.02 + GAP]}>
            <Label t={t} tt={tt} p={{ text: l.t, w: w - 0.08, h: 0.3, color: l.c ?? '#ffffff', size: 0.8, weight: 900, depth: 0 }} />
          </group>))}
      </group>
    </group>
  );
};

/* ---------- Fila de tramos de vuelta (14) que se encienden uno por uno ---------- */
export const LapTiles: React.FC<P> = ({ tt, p }) => {
  const { n = 14, every = 0.07, color = PINK, gap = 0.17 } = p; const lit = Math.floor(Math.max(0, tt) / every) + 1;
  return (<group>{Array.from({ length: n }, (_, i) => <B key={i} s={[0.12, 0.04, 0.2]} pos={[(i - (n - 1) / 2) * gap, 0.02, 0]} c={i < lit ? color : '#2a2320'} e={i < lit ? color : undefined} ei={0.9} />)}</group>);
};

/* ---------- Reloj de escritorio con agujas fijas ---------- */
export const Clock: React.FC<P> = ({ p }) => {
  const { h = 3, m = 0, r = 0.42, rim = PINK } = p; const ah = -((h % 12) + m / 60) / 12 * Math.PI * 2, am = -(m / 60) * Math.PI * 2;
  return (
    <group>
      <B s={[0.5, 0.08, 0.3]} pos={[0, -r - 0.08, 0]} c="#2a2a30" />
      <mesh rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[r + 0.07, r + 0.07, 0.12, 24]} /><M c={rim} /></mesh>
      <mesh position={[0, 0, 0.065]}><circleGeometry args={[r, 24]} /><meshBasicMaterial color="#d9dde6" toneMapped={false} /></mesh>
      {Array.from({ length: 12 }, (_, i) => { const a = (i / 12) * Math.PI * 2; return <B key={i} s={[0.04, i % 3 ? 0.07 : 0.14, 0.02]} pos={[Math.sin(a) * r * 0.85, Math.cos(a) * r * 0.85, 0.075]} rot={[0, 0, -a]} c="#1a1a1a" />; })}
      <group rotation={[0, 0, ah]} position={[0, 0, 0.09]}><B s={[0.06, r * 0.55, 0.02]} pos={[0, r * 0.25, 0]} c="#111" /></group>
      <group rotation={[0, 0, am]} position={[0, 0, 0.1]}><B s={[0.04, r * 0.8, 0.02]} pos={[0, r * 0.38, 0]} c={PINK} /></group>
    </group>
  );
};

/* ---------- Flechas de luz en el piso (marcan la línea por adentro) ---------- */
export const Chevrons: React.FC<P> = ({ t, tt, p }) => {
  const { n = 4, color = LIME, gap = 0.45 } = p;
  return (<group>{Array.from({ length: n }, (_, i) => { const on = tt > i * 0.12; const pul = 0.6 + 0.4 * Math.sin(t * 6 - i);
    return on ? <group key={i} position={[0, 0.026, -i * gap]}>{[-1, 1].map((s) => <B key={s} s={[0.32, 0.004, 0.07]} pos={[s * 0.12, 0, 0.1]} rot={[0, s * 0.7, 0]} c={color} e={color} ei={1.4 * pul} />)}</group> : null; })}</group>);
};

export const EXTRA = { stage: Stage, f1: Car, curvecar: CurveCar, almanac: Almanac, sheet: Sheet, pilot: Driver, radio: Radio, flash: Flash, brake: Brake,
  tyre: Tyre, halflap: HalfLap, redflag: RedFlag, heap: Heap, tower: Tower, pitboard: PitBoard, laptiles: LapTiles, clock: Clock, chevrons: Chevrons };
