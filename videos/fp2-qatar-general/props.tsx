import React from 'react';
import * as THREE from 'three';
import { M, Label, useTex } from '../../src/kit/Props';
import { clamp, eio, eo, lerp } from '../../src/kit/math';

// Look propio de este video (distinto de colapinto-qatar-v2, que era Lusail de noche con arena, box gris y celeste,
// Las Vegas y la torre ámbar): Lusail al caer el sol (cielo índigo con franja magenta y naranja solo en el horizonte,
// pianos verdes y blancos, grava gris), sala de telemetría azul petróleo con pantallas cian apagadas, calle de boxes
// de noche (garajes con luz cálida abajo, todo oscuro arriba) y una sala de prensa azul noche.
// Autos genéricos: azul con detalles rosa para el equipo de Colapinto y Gasly (los dos iguales), blanco y azul para el
// rival del cierre. Sin logos, sin sponsors, sin caras. La parte alta de cada fondo es oscura: ahí van los subtítulos.
type P = { t: number; tt: number; p: any };
type V3 = [number, number, number];
const B: React.FC<{ s: V3; pos?: V3; rot?: V3; c: string; e?: string; ei?: number; o?: number }> = ({ s, pos, rot, c, e, ei, o }) => (
  <mesh position={pos} rotation={rot}><boxGeometry args={s} /><M c={c} e={e} ei={ei} o={o} /></mesh>
);
const Flat: React.FC<{ s: [number, number]; pos?: V3; rot?: V3; c?: string; map?: THREE.Texture; o?: number }> = ({ s, pos, rot, c = '#fff', map, o }) => (
  <mesh position={pos} rotation={rot}><planeGeometry args={s} /><meshBasicMaterial color={c} map={map} toneMapped={false} transparent={o !== undefined} opacity={o ?? 1} /></mesh>
);
const Cyl: React.FC<{ r: number; h: number; pos?: V3; rot?: V3; c: string; e?: string; ei?: number; seg?: number; r2?: number }> = ({ r, h, pos, rot, c, e, ei, seg = 12, r2 }) => (
  <mesh position={pos} rotation={rot}><cylinderGeometry args={[r2 ?? r, r, h, seg]} /><M c={c} e={e} ei={ei} /></mesh>
);
const seedR = (seed: number) => { let s = seed; return () => ((s = (s * 9301 + 49297) % 233280) / 233280); };

export const BLUE = '#1f4fd8', BLUED = '#0c1c4f', PINK = '#ff5fa2', WHITE = '#f3f5f7', INK = '#0b1020', TEAL = '#1fd1c4',
  AMBER = '#ffb000', RED = '#e2412f', GREEN = '#22a35a', KERB = '#1f9b4f', GRAVEL = '#6e6a66', STEEL = '#8a8f96', DARK = '#11141b';

/* ---------- Escenarios (se apoyan sobre el set 'room' y lo tapan entero) ---------- */
export const Stage: React.FC<P> = ({ t, p }) => {
  const kind = p.kind ?? 'tarde'; const speed = p.speed ?? 0;
  const asph = useTex((g, W, H) => {
    g.fillStyle = '#26282d'; g.fillRect(0, 0, W, H); const r = seedR(7);
    for (let i = 0; i < 2400; i++) { g.fillStyle = ['#2f3238', '#1f2125', '#383b42'][i % 3]; g.fillRect(r() * W, r() * H, 3, 3); }
  }, 512, 512, 'fp2asph');
  const gravel = useTex((g, W, H) => {
    g.fillStyle = GRAVEL; g.fillRect(0, 0, W, H); const r = seedR(19);
    for (let i = 0; i < 3000; i++) { g.fillStyle = ['#5e5a56', '#7d7873', '#545150'][i % 3]; g.fillRect(r() * W, r() * H, 3, 3); }
  }, 512, 512, 'fp2grav');
  const sky = useTex((g, W, H) => {
    const gr = g.createLinearGradient(0, 0, 0, H);
    gr.addColorStop(0, '#020208'); gr.addColorStop(0.6, '#05071a'); gr.addColorStop(0.8, '#0c1430'); gr.addColorStop(0.9, '#1a2550'); gr.addColorStop(1, '#2a3566');
    g.fillStyle = gr; g.fillRect(0, 0, W, H);
    // tribuna de noche: silueta con luces chicas, solo en la franja baja; torres de focos bajas
    g.fillStyle = '#0a0b16'; g.fillRect(W * 0.02, H * 0.86, W * 0.62, H * 0.06); g.fillRect(W * 0.06, H * 0.83, W * 0.5, H * 0.03);
    for (let i = 0; i < 40; i++) { g.fillStyle = i % 4 ? '#8fa6d8' : '#ffffff'; g.fillRect(W * 0.05 + i * 7.6, H * 0.87 + (i % 3) * 5, 3, 2); }
    for (let i = 0; i < 6; i++) { const x = W * (0.1 + i * 0.16); g.fillStyle = '#c9d6ff'; g.fillRect(x, H * 0.8, 10, 4); g.fillStyle = '#141828'; g.fillRect(x + 4, H * 0.81, 2, H * 0.05); }
    g.fillStyle = '#0c0e1a'; g.beginPath(); g.moveTo(W * 0.62, H); for (let x = W * 0.62; x <= W; x += 12) g.lineTo(x, H * 0.9 - Math.sin(x / 40) * 8); g.lineTo(W, H); g.fill();
  }, 512, 512, 'fp2sky');
  const screens = useTex((g, W, H) => {
    g.fillStyle = '#060a12'; g.fillRect(0, 0, W, H); const r = seedR(23);
    // pantallas de telemetría: solo en la mitad baja, con líneas cian tenues
    for (let i = 0; i < 4; i++) {
      const x = 14 + i * 124, y = H * 0.6, w = 110, h = H * 0.22;
      g.fillStyle = '#0b1a24'; g.fillRect(x, y, w, h); g.strokeStyle = '#1b3a48'; g.lineWidth = 3; g.strokeRect(x, y, w, h);
      g.strokeStyle = i % 2 ? '#2a8f97' : '#9a3a6a'; g.lineWidth = 2; g.beginPath(); g.moveTo(x + 6, y + h * 0.7);
      for (let k = 0; k < 20; k++) g.lineTo(x + 6 + k * 5, y + h * (0.25 + r() * 0.5)); g.stroke();
    }
  }, 512, 512, 'fp2screens');
  const pitwall = useTex((g, W, H) => {
    g.fillStyle = '#0a0c11'; g.fillRect(0, 0, W, H);
    // garajes: aberturas con luz cálida en la franja baja
    for (let i = 0; i < 5; i++) {
      const x = 8 + i * 102, y = H * 0.74, w = 90, h = H * 0.26;
      g.fillStyle = '#2a2620'; g.fillRect(x, y, w, h); g.fillStyle = '#6b5434'; g.fillRect(x + 4, y + 6, w - 8, h - 6);
      g.fillStyle = '#1a1c22'; g.fillRect(x - 6, y - 10, w + 12, 8);
    }
  }, 512, 512, 'fp2pit');
  const press = useTex((g, W, H) => {
    g.fillStyle = '#070a18'; g.fillRect(0, 0, W, H);
    for (let i = 0; i < 8; i++) for (let j = 0; j < 4; j++) { g.fillStyle = (i + j) % 2 ? '#0d1430' : '#0a1026'; g.fillRect(i * 64, H * 0.6 + j * 52, 64, 52); }
  }, 512, 512, 'fp2press');
  const scroll = (len: number) => ((t * speed) % len + len) % len;
  const walls = (map: THREE.Texture) => (<>
    <Flat s={[13, 11]} pos={[0, 3.6, -3.7]} map={map} />
    {[-1, 1].map((k) => <Flat key={k} s={[12, 11]} pos={[k * 4.34, 3.6, 0]} rot={[0, -k * Math.PI / 2, 0]} map={map} />)}
  </>);

  if (kind === 'tarde' || kind === 'pista') {
    const off = scroll(1.2); const tx = p.trackX ?? 0;
    return (
      <group>
        <pointLight position={[0, 4, 3]} intensity={30} color="#ffe9d6" distance={14} />
        <pointLight position={[-3, 1.6, -2]} intensity={16} color="#7f9cff" distance={10} />
        <Flat s={[40, 40]} pos={[0, 0.015, 0]} rot={[-Math.PI / 2, 0, 0]} map={gravel} />
        <Flat s={[4.4, 40]} pos={[tx, 0.02, 0]} rot={[-Math.PI / 2, 0, 0]} map={asph} />
        {p.barrier && <group position={[0, 0, -2.6]}>{Array.from({ length: 16 }, (_, i) => <group key={i}>{[0, 1, 2].map((j) => <Cyl key={j} r={0.2} h={0.17} pos={[-3.2 + i * 0.42, 0.09 + j * 0.17, 0]} c={j === 1 ? (i % 2 ? RED : WHITE) : '#17181c'} seg={10} />)}</group>)}</group>}
        {[tx - 2.2, tx + 2.2].map((x) => <group key={x}>{Array.from({ length: 34 }, (_, i) => <B key={i} s={[0.3, 0.03, 0.6]} pos={[x, 0.03, 8 - i * 0.6 - (off % 1.2)]} c={i % 2 ? KERB : WHITE} />)}</group>)}
        {[tx - 2.0, tx + 2.0].map((x) => <B key={'l' + x} s={[0.06, 0.025, 40]} pos={[x, 0.028, 0]} c="#e8e8e8" />)}
        {walls(sky)}
      </group>
    );
  }
  if (kind === 'data') return (
    <group>
      <pointLight position={[0, 3.2, 2.6]} intensity={22} color="#d9f4ff" distance={12} />
      <pointLight position={[-2.6, 1.4, -1.5]} intensity={12} color={TEAL} distance={8} />
      <Flat s={[24, 24]} pos={[0, 0.02, 0]} rot={[-Math.PI / 2, 0, 0]} c="#0a1620" />
      {Array.from({ length: 14 }, (_, i) => <Flat key={'z' + i} s={[24, 0.02]} pos={[0, 0.03, 4 - i * 0.6]} rot={[-Math.PI / 2, 0, 0]} c="#16414a" />)}
      {Array.from({ length: 15 }, (_, i) => <Flat key={'x' + i} s={[0.02, 24]} pos={[-4.2 + i * 0.6, 0.03, 0]} rot={[-Math.PI / 2, 0, 0]} c="#16414a" />)}
      {walls(screens)}
      <B s={[12, 0.04, 0.1]} pos={[0, 0.3, -3.6]} c={TEAL} e={TEAL} ei={0.6} />
    </group>
  );
  if (kind === 'pit') {
    const off = scroll(1.4);
    return (
      <group>
        <pointLight position={[0, 3.2, 2.6]} intensity={26} color="#fff1dc" distance={12} />
        <pointLight position={[2.6, 1.2, -2.2]} intensity={14} color={AMBER} distance={8} />
        <Flat s={[24, 24]} pos={[0, 0.02, 0]} rot={[-Math.PI / 2, 0, 0]} map={asph} />
        {Array.from({ length: 18 }, (_, i) => <B key={i} s={[0.7, 0.02, 0.08]} pos={[0, 0.03, 6 - i * 1.4 + off * 0]} c="#d9c24a" />)}
        <B s={[12, 0.02, 0.08]} pos={[0, 0.03, -1.9]} c="#d9c24a" />
        <B s={[12, 0.02, 0.08]} pos={[0, 0.03, 1.9]} c={WHITE} />
        {walls(pitwall)}
      </group>
    );
  }
  // press: sala de prensa azul noche con banda baja
  return (
    <group>
      <pointLight position={[0, 3, 3]} intensity={22} color="#fff4e6" distance={12} />
      <pointLight position={[2.4, 1.6, 0]} intensity={10} color={PINK} distance={7} />
      <Flat s={[24, 24]} pos={[0, 0.02, 0]} rot={[-Math.PI / 2, 0, 0]} c="#141826" />
      {walls(press)}
      <B s={[12, 0.05, 0.1]} pos={[0, 0.45, -3.6]} c={PINK} e={PINK} ei={0.5} />
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

/* ---------- Piloto genérico con buzo y casco (sin cara) ---------- */
export const Driver: React.FC<P> = ({ t, p }) => {
  const { suit = BLUE, accent = PINK, helmet = WHITE, visor = '#16222e', pose = 'idle', phase = 0, headset = false } = p;
  const sw = Math.sin((t + phase) * 2.1), w = Math.sin((t + phase) * 8);
  let aL: V3 = [0, 0, -0.12 - sw * 0.03], aR: V3 = [0, 0, 0.12 + sw * 0.03];
  if (pose === 'cheer') { aL = [0, 0, -2.7 - w * 0.12]; aR = [0, 0, 2.7 + w * 0.12]; }
  if (pose === 'point') aR = [-1.5 + sw * 0.05, 0, 0.1];
  if (pose === 'talk') { aR = [-0.9 + sw * 0.15, 0, 0.25]; aL = [-0.5 - sw * 0.1, 0, -0.2]; }
  if (pose === 'ear') { aR = [-2.6, 0, 0.9]; }
  if (pose === 'shrug') { aL = [0, 0, -1.1 - sw * 0.08]; aR = [0, 0, 1.1 + sw * 0.08]; }
  const y0 = pose === 'cheer' ? Math.abs(Math.sin((t + phase) * 6)) * 0.1 : sw * 0.01;
  return (
    <group position={[0, y0, 0]}>
      {[-1, 1].map((s) => <B key={s} s={[0.2, 0.78, 0.22]} pos={[0.13 * s, 0.39, 0]} c={suit} />)}
      {[-1, 1].map((s) => <B key={'b' + s} s={[0.22, 0.1, 0.3]} pos={[0.13 * s, 0.05, 0.04]} c="#15181c" />)}
      <B s={[0.56, 0.7, 0.32]} pos={[0, 1.13, 0]} c={suit} />
      <B s={[0.57, 0.12, 0.33]} pos={[0, 0.98, 0]} c={accent} />
      {([[-0.36, aL], [0.36, aR]] as [number, V3][]).map(([x, r], i) => (
        <group key={i} position={[x, 1.42, 0]} rotation={r}><B s={[0.16, 0.62, 0.18]} pos={[0, -0.28, 0]} c={suit} /><B s={[0.17, 0.14, 0.19]} pos={[0, -0.62, 0]} c="#15181c" /></group>
      ))}
      {p.bare ? (<>
        <mesh position={[0, 1.72, 0]}><icosahedronGeometry args={[0.22, 1]} /><M c={p.skin ?? '#d9a27a'} /></mesh>
        <mesh position={[0, 1.83, -0.03]}><icosahedronGeometry args={[0.2, 1]} /><M c={p.hair ?? '#2a1d14'} /></mesh>
        {headset && <><B s={[0.5, 0.06, 0.08]} pos={[0, 1.92, 0]} c="#1b1e23" />{[-1, 1].map((s) => <B key={s} s={[0.08, 0.16, 0.14]} pos={[0.24 * s, 1.74, 0]} c="#1b1e23" />)}
          <B s={[0.03, 0.03, 0.2]} pos={[0.2, 1.66, 0.12]} rot={[0, -0.5, 0]} c="#1b1e23" /></>}
      </>) : (<>
        <mesh position={[0, 1.72, 0]}><icosahedronGeometry args={[0.25, 1]} /><M c={helmet} /></mesh>
        <B s={[0.36, 0.1, 0.1]} pos={[0, 1.74, 0.2]} c={visor} />
        <B s={[0.06, 0.2, 0.46]} pos={[0, 1.9, 0]} c={accent} />
      </>)}
    </group>
  );
};

/* ---------- Cartel de boxes (pit board) en un palo: p.lines [{t, c}] ---------- */
export const PitBoard: React.FC<P> = ({ t, tt, p }) => {
  const { lines = [{ t: 'P?' }], w = 1.2, frame = PINK, pole = 1.4, swing = 0 } = p;
  const h = 0.36 * lines.length + 0.14;
  return (
    <group rotation={[0, 0, Math.sin(t * 2) * swing]}>
      <Cyl r={0.035} h={pole} pos={[0, pole / 2, 0]} c={STEEL} />
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

/* ---------- Torre de tiempos (paneles blancos con letras oscuras, posiciones en rosa) ---------- */
export const TimingTower: React.FC<P> = ({ t, tt, p }) => {
  const { rows = [], w = 2.6, rh = 0.46 } = p;
  return (
    <group>
      <B s={[w + 0.14, rows.length * rh + 0.14, 0.08]} pos={[0, -((rows.length - 1) * rh) / 2, -0.06]} c="#0b0e16" />
      {rows.map((r: any, i: number) => {
        const vis = r.at === undefined || t >= r.at; if (!vis) return null; const k = r.at === undefined ? 1 : eo((t - r.at) / 0.25);
        return (
          <group key={i} position={[(1 - k) * -0.6, -i * rh, 0]} scale={[1, Math.max(0.01, k), 1]}>
            <group position={[-w / 2 + 0.32, 0, 0.01]}><B s={[0.56, rh - 0.06, 0.04]} pos={[0, 0, -0.03]} c={r.dots ? '#141824' : PINK} />
              <group position={[0, 0, 0.02]}><Label t={t} tt={tt} p={{ text: r.pos, w: 0.56, h: rh - 0.1, color: r.dots ? '#6d7590' : '#fff', size: 0.72, weight: 900, depth: 0 }} /></group></group>
            <group position={[0.32, 0, r.hi ? 0.05 : 0]}>
              <B s={[w - 0.64, rh - 0.06, 0.04]} pos={[0, 0, -0.02]} c={r.dots ? '#141824' : r.hi ? BLUE : '#e9edf3'} />
              <group position={[0, 0, 0.02]}><Label t={t} tt={tt} p={{ text: r.name, w: w - 0.8, h: rh - 0.1, color: r.dots ? '#6d7590' : r.hi ? '#fff' : INK, size: 0.6, weight: 800, depth: 0 }} /></group>
            </group>
          </group>);
      })}
    </group>
  );
};

/* ---------- Cronómetro grande: aguja que gira y visor con p.text desde p.showAt ---------- */
export const Stopwatch: React.FC<P> = ({ t, tt, p }) => {
  const { r = 0.9, text = '', showAt = 0 } = p; const a = -tt * 2.4;
  const show = t >= showAt;
  return (
    <group>
      <mesh rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[r + 0.1, r + 0.1, 0.16, 28]} /><M c={STEEL} /></mesh>
      <mesh position={[0, 0, 0.085]}><circleGeometry args={[r, 28]} /><meshBasicMaterial color="#10151f" toneMapped={false} /></mesh>
      {Array.from({ length: 30 }, (_, i) => { const b = (i / 30) * Math.PI * 2; return <B key={i} s={[0.03, i % 5 ? 0.08 : 0.16, 0.02]} pos={[Math.sin(b) * r * 0.86, Math.cos(b) * r * 0.86, 0.1]} rot={[0, 0, -b]} c={i % 5 ? '#5a6480' : '#e9edf3'} />; })}
      <group rotation={[0, 0, a]} position={[0, 0, 0.12]}><B s={[0.04, r * 0.78, 0.02]} pos={[0, r * 0.36, 0]} c={PINK} e={PINK} ei={0.8} /></group>
      <Cyl r={0.06} h={0.05} pos={[0, 0, 0.13]} rot={[Math.PI / 2, 0, 0]} c={PINK} />
      <Cyl r={0.12} h={0.22} pos={[0, r + 0.2, 0]} c={STEEL} />
      <B s={[0.32, 0.1, 0.12]} pos={[0, r + 0.34, 0]} c={STEEL} />
      {show && <group position={[0, -r * 0.42, 0.14]} scale={Math.min(1, eo((t - showAt) / 0.2) * 1.0 + 0.001)}>
        <B s={[r * 1.2, 0.34, 0.03]} c="#05070b" />
        <group position={[0, 0, 0.02]}><Label t={t} tt={tt} p={{ text, w: r * 1.15, h: 0.3, color: TEAL, size: 0.85, weight: 900, depth: 0 }} /></group>
      </group>}
    </group>
  );
};

/* ---------- Neumático de pie con banda de compuesto; p.wear (0..1) gasta la banda de rodadura desde p.wearAt ---------- */
export const Tyre: React.FC<P> = ({ t, p }) => {
  const { r = 0.6, w = 0.45, band = AMBER, roll = 0, wear = 0, wearAt = 0, wearDur = 1.6 } = p;
  const k = wear * eio((t - wearAt) / wearDur);
  const rr = r * (1 - 0.12 * k);
  const tread = useTex((g, W, H) => { g.fillStyle = '#1a1a1c'; g.fillRect(0, 0, W, H); g.fillStyle = '#2c2c30'; for (let i = 0; i < 24; i++) g.fillRect((i * W) / 24, 0, W / 60, H); }, 256, 64, 'fp2tread');
  return (
    <group rotation={[t * roll, 0, 0]}>
      <mesh rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[rr, rr, w, 22]} /><meshStandardMaterial color={k > 0.5 ? '#3a2a24' : '#1d1d20'} map={tread} flatShading /></mesh>
      {[-1, 1].map((s) => <mesh key={s} position={[s * (w / 2 + 0.003), 0, 0]} rotation={[0, s * Math.PI / 2, 0]}><ringGeometry args={[r * 0.62, r * 0.7, 22]} /><meshBasicMaterial color={band} toneMapped={false} side={THREE.DoubleSide} /></mesh>)}
      {[-1, 1].map((s) => <mesh key={'h' + s} position={[s * (w / 2 + 0.002), 0, 0]} rotation={[0, s * Math.PI / 2, 0]}><circleGeometry args={[r * 0.5, 16]} /><meshBasicMaterial color="#5d636c" toneMapped={false} side={THREE.DoubleSide} /></mesh>)}
    </group>
  );
};

/* ---------- Aro de vueltas: p.n segmentos alrededor que se encienden uno por uno desde tt=0 durante p.dur ---------- */
export const LapRing: React.FC<P> = ({ tt, p }) => {
  const { n = 27, r = 1.05, dur = 1.6, color = TEAL, last = PINK } = p;
  const lit = Math.floor(clamp(tt / dur) * n + 0.0001);
  return (
    <group>{Array.from({ length: n }, (_, i) => { const a = Math.PI / 2 - (i / n) * Math.PI * 2; const on = i < lit; const c = on ? (i === n - 1 ? last : color) : '#1d2a33';
      return <B key={i} s={[0.09, 0.2, 0.05]} pos={[Math.cos(a) * r, Math.sin(a) * r, 0]} rot={[0, 0, a - Math.PI / 2]} c={c} e={on ? c : undefined} ei={1.2} />; })}</group>
  );
};

/* ---------- Medidor vertical de desgaste: marca "esperado" en p.exp y relleno que sube hasta p.val desde tt ---------- */
export const WearGauge: React.FC<P> = ({ t, tt, p }) => {
  const { h = 1.9, w = 0.42, exp = 0.45, val = 0.88, dur = 1.6, expLabel = 'ESPERADO', delay = 0 } = p;
  const v = val * eio((tt - delay) / dur); const fh = Math.max(0.001, v * h);
  const over = Math.max(0, v - exp) * h;
  return (
    <group>
      <B s={[w + 0.12, h + 0.12, 0.1]} pos={[0, h / 2, -0.06]} c="#1b2230" />
      <B s={[w, h, 0.04]} pos={[0, h / 2, 0]} c="#0a0d14" />
      <B s={[w * 0.92, Math.min(fh, exp * h), 0.05]} pos={[0, Math.min(fh, exp * h) / 2, 0.01]} c={TEAL} e={TEAL} ei={0.6} />
      {over > 0.001 && <B s={[w * 0.92, over, 0.05]} pos={[0, exp * h + over / 2, 0.01]} c={RED} e={RED} ei={0.9} />}
      <B s={[w + 0.9, 0.04, 0.06]} pos={[-0.38, exp * h, 0.04]} c={WHITE} />
      <group position={[-(w / 2 + 0.5), exp * h + 0.16, 0.04]}><Label t={t} tt={tt} p={{ text: expLabel, w: 0.8, h: 0.2, bg: '#0a0d14', color: WHITE, size: 0.7, weight: 800, depth: 0 }} /></group>
    </group>
  );
};

/* ---------- Pila de fichas de puntos: p.n discos que se apilan desde tt; p.hiFrom resalta los de arriba ---------- */
export const Stack: React.FC<P> = ({ t, tt, p }) => {
  const { n = 35, r = 0.36, dh = 0.045, color = BLUE, edge = PINK, every = 0.035, hiFrom = 999, hiColor = AMBER, hiAt = 0, top = '', topColor = '#fff', topBg, sub } = p;
  const shown = Math.min(n, Math.floor(Math.max(0, tt) / every) + 1);
  return (
    <group>
      {Array.from({ length: shown }, (_, i) => { const hi = i >= hiFrom && t >= hiAt; return (
        <group key={i} position={[0, dh / 2 + i * dh, 0]}>
          <Cyl r={r} h={dh * 0.86} c={hi ? hiColor : i % 2 ? color : edge === color ? color : color} e={hi ? hiColor : undefined} ei={0.7} seg={14} />
          <Cyl r={r + 0.004} h={dh * 0.2} pos={[0, dh * 0.4, 0]} c={hi ? '#fff2c4' : edge} seg={14} />
        </group>); })}
      {top && shown >= n && <group position={[0, n * dh + (sub ? 0.36 : 0.28), 0]}><Label t={t} tt={tt} p={{ text: top, sub, w: 0.95, h: sub ? 0.56 : 0.36, color: topColor, bg: topBg, size: sub ? 0.62 : 0.8, weight: 900, depth: topBg ? 0.04 : 0 }} /></group>}
    </group>
  );
};

/* ---------- Juego de 4 neumáticos en un carrito con cartel ---------- */
export const TyreSet: React.FC<P> = ({ t, tt, p }) => {
  const { band = WHITE, text = '', bg = BLUE } = p;
  return (
    <group>
      <B s={[0.9, 0.06, 0.6]} pos={[0, 0.14, 0]} c={STEEL} />
      {[-0.3, 0.3].map((x) => <Cyl key={x} r={0.07} h={0.06} pos={[x, 0.07, 0.22]} rot={[0, 0, Math.PI / 2]} c="#222" />)}
      {[0, 1].map((j) => [-0.2, 0.2].map((x) => (
        <group key={j + '' + x} position={[x, 0.36 + j * 0.0, j ? -0.13 : 0.13]}><Tyre t={0} tt={0} p={{ r: 0.2, w: 0.16, band }} /></group>)))}
      {text && <group position={[0, 0.8, 0.1]}><Label t={t} tt={tt} p={{ text, w: 0.9, h: 0.26, bg, color: '#fff', size: 0.7, weight: 900, depth: 0.03 }} /></group>}
    </group>
  );
};

/* ---------- Pie de micrófono (sin marcas) ---------- */
export const Mic: React.FC<P> = ({ p }) => {
  const { h = 1.5, c = '#2a2f3a', tip = PINK } = p;
  return (
    <group>
      <Cyl r={0.18} h={0.03} pos={[0, 0.015, 0]} c="#1b1e23" />
      <Cyl r={0.02} h={h} pos={[0, h / 2, 0]} c={STEEL} />
      <B s={[0.05, 0.05, 0.35]} pos={[0, h, 0.15]} c={c} />
      <mesh position={[0, h, 0.36]}><icosahedronGeometry args={[0.07, 1]} /><M c="#3b3f48" /></mesh>
      <B s={[0.1, 0.06, 0.06]} pos={[0, h, 0.27]} c={tip} />
    </group>
  );
};

/* ---------- Tarjeta de pie (fecha / resultado) ---------- */
export const RaceCard: React.FC<P> = ({ t, tt, p }) => {
  const { top = '', big = '', color = '#1f2433', hi = false, w = 1.05, h = 1.2, bigColor } = p;
  return (
    <group>
      <B s={[w + 0.1, h + 0.1, 0.08]} pos={[0, h / 2 + 0.6, -0.05]} c={hi ? PINK : '#3a4152'} e={hi ? PINK : undefined} ei={0.25} />
      <B s={[w, h, 0.06]} pos={[0, h / 2 + 0.6, 0]} c={color} />
      <group position={[0, 0.6 + h * 0.76, 0.04]}><Label t={t} tt={tt} p={{ text: top, w: w * 0.92, h: 0.28, color: '#fff', size: 0.62, weight: 800, depth: 0 }} /></group>
      <group position={[0, 0.6 + h * 0.34, 0.04]}><Label t={t} tt={tt} p={{ text: big, w: w * 0.92, h: 0.5, color: bigColor ?? (hi ? PINK : '#fff'), size: 0.8, weight: 900, depth: 0 }} /></group>
      <Cyl r={0.04} h={0.6} pos={[0, 0.3, 0]} c={STEEL} />
    </group>
  );
};

/* ---------- Reloj de pared con agujas fijas ---------- */
export const Clock: React.FC<P> = ({ p }) => {
  const { h = 3, m = 0, r = 0.5, rim = BLUE } = p; const ah = -((h % 12) + m / 60) / 12 * Math.PI * 2, am = -(m / 60) * Math.PI * 2;
  return (
    <group>
      <mesh rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[r + 0.07, r + 0.07, 0.1, 24]} /><M c={rim} /></mesh>
      <mesh position={[0, 0, 0.055]}><circleGeometry args={[r, 24]} /><meshBasicMaterial color="#d9dde6" toneMapped={false} /></mesh>
      {Array.from({ length: 12 }, (_, i) => { const a = (i / 12) * Math.PI * 2; return <B key={i} s={[0.04, i % 3 ? 0.08 : 0.16, 0.02]} pos={[Math.sin(a) * r * 0.85, Math.cos(a) * r * 0.85, 0.07]} rot={[0, 0, -a]} c="#1a1a1a" />; })}
      <group rotation={[0, 0, ah]} position={[0, 0, 0.09]}><B s={[0.07, r * 0.55, 0.02]} pos={[0, r * 0.25, 0]} c="#111" /></group>
      <group rotation={[0, 0, am]} position={[0, 0, 0.1]}><B s={[0.045, r * 0.8, 0.02]} pos={[0, r * 0.38, 0]} c={PINK} /></group>
    </group>
  );
};

/* ---------- Reloj de sesión: panel con texto (p.text) que cambia a p.text2 en p.at2; barra de tiempo restante ---------- */
export const SessionClock: React.FC<P> = ({ t, tt, p }) => {
  const { w = 2.4, h = 1.0, text = 'FP2', text2, at2 = 999, color = WHITE, color2 = AMBER, bar0 = 0.3, bar1 = 0.04, barDur = 1.6, ext = 0.55, extDur = 0.8, top = 'TIEMPO DE SESIÓN' } = p;
  const second = t >= at2; const k2 = second ? eo((t - at2) / 0.25) : 0;
  const bw = w - 0.3; const base = lerp(bar0, bar1, eio(tt / barDur)); const e = second ? ext * eo((t - at2) / extDur) : 0;
  return (
    <group>
      <Cyl r={0.05} h={1.2} pos={[-w / 2 + 0.25, -h / 2 - 0.6, -0.05]} c={STEEL} />
      <Cyl r={0.05} h={1.2} pos={[w / 2 - 0.25, -h / 2 - 0.6, -0.05]} c={STEEL} />
      <B s={[w + 0.12, h + 0.12, 0.1]} pos={[0, 0, -0.07]} c="#2a3040" />
      <B s={[w, h, 0.04]} pos={[0, 0, -0.02]} c="#05070c" />
      <group position={[0, h * 0.34, 0.02]}><Label t={t} tt={tt} p={{ text: top, w: w * 0.9, h: 0.18, color: '#8a93ad', size: 0.8, weight: 800, depth: 0 }} /></group>
      <group position={[0, h * 0.02, 0.02]} scale={second ? Math.max(0.01, k2) : 1}>
        <Label t={t} tt={tt} p={{ text: second ? text2 : text, w: w * 0.9, h: 0.5, color: second ? color2 : color, size: 0.9, weight: 900, depth: 0 }} />
      </group>
      <B s={[bw, 0.09, 0.02]} pos={[0, -h * 0.36, 0.0]} c="#1b2130" />
      <B s={[Math.max(0.001, base * bw), 0.09, 0.02]} pos={[-bw / 2 + (base * bw) / 2, -h * 0.36, 0.02]} c={TEAL} e={TEAL} ei={0.8} />
      {e > 0.001 && <B s={[e * bw, 0.09, 0.02]} pos={[-bw / 2 + base * bw + (e * bw) / 2, -h * 0.36, 0.02]} c={AMBER} e={AMBER} ei={1} />}
    </group>
  );
};

/* ---------- Bandera roja en un mástil que flamea ---------- */
export const RedFlag: React.FC<P> = ({ t, p }) => {
  const { pole = 1.3, w = 0.7, h = 0.45, phase = 0 } = p;
  return (
    <group>
      <Cyl r={0.025} h={pole} pos={[0, pole / 2, 0]} c={STEEL} />
      {Array.from({ length: 5 }, (_, i) => { const x = (i + 0.5) * (w / 5); const z = Math.sin(t * 6 + phase - i * 0.9) * 0.05 * (i / 4 + 0.2);
        return <B key={i} s={[w / 5 + 0.005, h, 0.02]} pos={[x + 0.02, pole - h / 2, z]} c={RED} e={RED} ei={0.6} />; })}
    </group>
  );
};

/* ---------- Piedritas de leca desparramadas: salen de [0,0,0] hacia afuera durante p.dur ---------- */
export const GravelBits: React.FC<P> = ({ tt, p }) => {
  const { n = 26, rx = 1.2, rz = 0.8, dur = 0.7, seed = 5, dir = 1 } = p; const r = seedR(seed); const k = eo(tt / dur);
  return (
    <group>{Array.from({ length: n }, (_, i) => { const a = r() * Math.PI * 2, d = 0.25 + r() * 0.75, sz = 0.04 + r() * 0.05;
      const x = Math.cos(a) * d * rx * dir, z = Math.sin(a) * d * rz; const c = ['#8a847c', '#6e6a66', '#a39c92'][i % 3];
      return <B key={i} s={[sz, sz * 0.7, sz]} pos={[x * k, sz * 0.35 + Math.sin(k * Math.PI) * 0.25 * (1 - d * 0.5), z * k]} rot={[r() * 2, r() * 3, 0]} c={c} />; })}</group>
  );
};

/* ---------- Montículos de leca (para tapar las ruedas de un auto enterrado) ---------- */
export const GravelHeap: React.FC<P> = ({ p }) => {
  const { pts = [[0, 0]], r = 0.32, h = 0.22 } = p;
  return (<group>{pts.map(([x, z]: number[], i: number) => (
    <mesh key={i} position={[x, h / 2, z]} rotation={[0, i * 0.7, 0]}><coneGeometry args={[r, h, 7]} /><M c={i % 2 ? '#77726c' : '#6a6560'} /></mesh>))}</group>);
};

/* ---------- Ondas de radio que salen de un punto (arcos que crecen y se apagan) ---------- */
export const RadioWaves: React.FC<P> = ({ tt, p }) => {
  const { n = 3, period = 0.9, max = 0.9, color = TEAL, dir = 1 } = p;
  return (<group rotation={[0, 0, dir > 0 ? 0 : Math.PI]}>{Array.from({ length: n }, (_, i) => {
    const ph = ((tt / period + i / n) % 1 + 1) % 1; const r = 0.15 + ph * max; const o = 1 - ph;
    return (<mesh key={i} rotation={[0, 0, -Math.PI / 4]}><torusGeometry args={[r, 0.025, 4, 16, Math.PI / 2]} /><meshBasicMaterial color={color} transparent opacity={o} toneMapped={false} /></mesh>);
  })}</group>);
};

/* ---------- Puesto del muro de boxes: mesa con pantallas apagadas y una silla; auriculares sobre la mesa ---------- */
export const PitStand: React.FC<P> = ({ t, tt, p }) => {
  const { chair = true, headset = true } = p;
  return (
    <group>
      <B s={[1.9, 0.08, 0.7]} pos={[0, 0.9, -0.35]} c="#2a2f3a" />
      <B s={[1.9, 0.9, 0.06]} pos={[0, 0.45, -0.68]} c="#1b1f28" />
      {[-0.6, 0.0, 0.6].map((x) => <group key={x}><B s={[0.52, 0.34, 0.04]} pos={[x, 1.2, -0.6]} rot={[-0.15, 0, 0]} c="#0b1a24" /><B s={[0.46, 0.02, 0.01]} pos={[x, 1.12, -0.57]} rot={[-0.15, 0, 0]} c={TEAL} e={TEAL} ei={0.5} /></group>)}
      {headset && <group position={[0.35, 0.96, -0.15]}><mesh rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[0.1, 0.018, 4, 10, Math.PI]} /><M c="#1b1e23" /></mesh>
        {[-1, 1].map((s) => <B key={s} s={[0.07, 0.05, 0.1]} pos={[0.1 * s, 0, 0]} c="#2b2f35" />)}</group>}
      {chair && <group position={[0, 0, 0.45]}><B s={[0.5, 0.06, 0.5]} pos={[0, 0.5, 0]} c="#333a48" /><B s={[0.5, 0.6, 0.06]} pos={[0, 0.82, 0.24]} c="#333a48" />
        <Cyl r={0.03} h={0.48} pos={[0, 0.24, 0]} c={STEEL} /></group>}
    </group>
  );
};

export const EXTRA = { sessclock: SessionClock, redflag: RedFlag, gravelbits: GravelBits, heap: GravelHeap, radio: RadioWaves, pitstand: PitStand, stage: Stage, f1: Car, pilot: Driver, pitboard: PitBoard, timing: TimingTower, stopwatch: Stopwatch, tyre: Tyre,
  lapring: LapRing, wear: WearGauge, stack: Stack, tyreset: TyreSet, mic: Mic, racecard: RaceCard, clock: Clock };
