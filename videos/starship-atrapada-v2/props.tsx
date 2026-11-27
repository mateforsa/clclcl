import React from 'react';
import * as THREE from 'three';
import { M, Person, useTex } from '../../src/kit/Props';
import { clamp, eio, eo, lerp, rnd } from '../../src/kit/math';

// Look propio de la versión 2 (el original era neón violeta con grilla y vacío): cocina de mesa de madera con mantel a cuadros
// (la mosca y los palitos), costa de Texas al atardecer (arena, dunas, mar verde agua, cielo naranja), espacio azul profundo,
// golfo al anochecer, hangar de chapa con luces industriales y la costa de noche con reflectores. Nada de logos reales.
type P = { t: number; tt: number; p: any };
type V3 = [number, number, number];
const PI = Math.PI;
export const STEEL = '#d3d6dc', TILE = '#23272e', ORANGE = '#ff7a2f', BAMBOO = '#e2b866', SEA = '#1f7f86', SAND = '#dcb57d',
  INK = '#1d2a33', TEAL = '#14707a', RED = '#d8343f', SKY = '#2a5d7c', CREAM = '#f3e6c9';

const B: React.FC<{ s: V3; pos?: V3; rot?: V3; c: string; e?: string; ei?: number; o?: number }> = ({ s, pos, rot, c, e, ei, o }) => (
  <mesh position={pos} rotation={rot}><boxGeometry args={s} /><M c={c} e={e} ei={ei} o={o} /></mesh>
);
const Cy: React.FC<{ r: number; r2?: number; h: number; pos?: V3; rot?: V3; c: string; e?: string; ei?: number; seg?: number }> = ({ r, r2, h, pos, rot, c, e, ei, seg = 12 }) => (
  <mesh position={pos} rotation={rot}><cylinderGeometry args={[r, r2 ?? r, h, seg]} /><M c={c} e={e} ei={ei} /></mesh>
);
const Flat: React.FC<{ s: [number, number]; pos?: V3; rot?: V3; c?: string; map?: THREE.Texture; o?: number; add?: boolean }> = ({ s, pos, rot, c = '#fff', map, o, add }) => (
  <mesh position={pos} rotation={rot}><planeGeometry args={s} />
    <meshBasicMaterial color={c} map={map} toneMapped={false} transparent={o !== undefined} opacity={o ?? 1} depthWrite={!add} blending={add ? THREE.AdditiveBlending : THREE.NormalBlending} /></mesh>
);

/* ---------- Cielos ---------- */
const skyTex = (kind: string) => (g: CanvasRenderingContext2D, W: number, H: number) => {
  const gr = g.createLinearGradient(0, 0, 0, H);
  if (kind === 'sunset') { gr.addColorStop(0, '#163e5c'); gr.addColorStop(0.42, '#3f7d97'); gr.addColorStop(0.68, '#f2a560'); gr.addColorStop(0.82, '#ffcf8a'); gr.addColorStop(1, '#ffe3b0'); }
  else if (kind === 'dusk') { gr.addColorStop(0, '#0e2236'); gr.addColorStop(0.5, '#2f4d6e'); gr.addColorStop(0.75, '#c2705a'); gr.addColorStop(1, '#e89a6a'); }
  else if (kind === 'night') { gr.addColorStop(0, '#040a16'); gr.addColorStop(0.6, '#0c1d33'); gr.addColorStop(1, '#1d3550'); }
  else { gr.addColorStop(0, '#02040c'); gr.addColorStop(1, '#071430'); }
  g.fillStyle = gr; g.fillRect(0, 0, W, H);
  const r = rnd(kind.length * 7 + 3); const n = kind === 'space' ? 260 : kind === 'night' ? 120 : kind === 'dusk' ? 40 : 0;
  g.fillStyle = '#fff'; for (let i = 0; i < n; i++) { g.globalAlpha = 0.3 + r() * 0.7; const s = r() < 0.1 ? 3 : 2; g.fillRect(r() * W, r() * H * (kind === 'space' ? 1 : 0.6), s, s); }
  g.globalAlpha = 1;
  if (kind === 'sunset') { const sg = g.createRadialGradient(W * 0.68, H * 0.8, 4, W * 0.68, H * 0.8, W * 0.32); sg.addColorStop(0, 'rgba(255,250,220,1)'); sg.addColorStop(0.18, 'rgba(255,220,150,.9)'); sg.addColorStop(1, 'rgba(255,190,120,0)'); g.fillStyle = sg; g.fillRect(0, 0, W, H); }
};
const Backdrop: React.FC<{ kind: string }> = ({ kind }) => {
  const tx = useTex(skyTex(kind), 256, 512, 'sv2sky' + kind);
  return (
    <group>
      <Flat s={[18, 16]} pos={[0, 6, -3.7]} map={tx} />
      {[-4.2, 4.2].map((x) => <Flat key={x} s={[16, 16]} pos={[x, 6, 0]} rot={[0, x < 0 ? PI / 2 : -PI / 2, 0]} map={tx} />)}
    </group>
  );
};

/* ---------- Escenarios (tapan el set 'room' de base) ---------- */
export const Stage: React.FC<P> = ({ t, p }) => {
  const kind = p.kind ?? 'kitchen';
  const cloth = useTex((g, W, H) => {
    const n = 12; for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) { g.fillStyle = (i + j) % 2 ? '#c8333c' : '#f6efe2'; g.fillRect((i * W) / n, (j * H) / n, W / n + 1, H / n + 1); }
    g.fillStyle = 'rgba(200,51,60,.35)'; for (let i = 0; i < n; i++) { g.fillRect((i * W) / n, 0, W / n / 2, H); }
  }, 512, 512, 'sv2cloth');
  const wood = useTex((g, W, H) => {
    for (let i = 0; i < 10; i++) { g.fillStyle = ['#8a5a33', '#946239', '#7d5030'][i % 3]; g.fillRect(0, (i * H) / 10, W, H / 10 + 1); }
    g.strokeStyle = 'rgba(40,20,8,.35)'; g.lineWidth = 3; for (let i = 0; i <= 10; i++) { g.beginPath(); g.moveTo(0, (i * H) / 10); g.lineTo(W, (i * H) / 10); g.stroke(); }
  }, 256, 256, 'sv2wood');
  const sand = useTex((g, W, H) => {
    g.fillStyle = SAND; g.fillRect(0, 0, W, H); const r = rnd(4);
    for (let i = 0; i < 900; i++) { g.fillStyle = i % 2 ? '#cfa66e' : '#e6c48f'; g.fillRect(r() * W, r() * H, 3, 3); }
  }, 256, 256, 'sv2sand');
  const waves = useTex((g, W, H) => {
    g.fillStyle = SEA; g.fillRect(0, 0, W, H); g.fillStyle = 'rgba(180,240,235,.35)';
    for (let i = 0; i < 26; i++) g.fillRect((i * 53) % W, (i * 37) % H, 60, 4);
  }, 256, 256, 'sv2waves');
  waves.wrapS = waves.wrapT = THREE.RepeatWrapping; waves.repeat.set(6, 6); waves.offset.set(t * 0.03, t * 0.05);
  if (kind === 'kitchen') return (
    <group>
      <pointLight position={[-1.2, 3.6, 1.6]} intensity={30} color="#ffd9a0" distance={12} />
      <pointLight position={[2.5, 2.4, -1.5]} intensity={10} color="#ffb070" distance={8} />
      <B s={[30, 18, 0.2]} pos={[0, 9, -3.6]} c="#e9dcbf" />
      {[-4.3, 4.3].map((x) => <B key={x} s={[0.2, 18, 30]} pos={[x, 9, 11]} c="#dccdaa" />)}
      {/* azulejos detrás de la mesa */}
      {Array.from({ length: 30 }, (_, i) => <B key={i} s={[0.56, 0.56, 0.03]} pos={[-4 + (i % 15) * 0.6, 0.6 + Math.floor(i / 15) * 0.6, -3.48]} c={i % 2 ? '#7fb7b0' : '#e9f1ea'} />)}
      {/* ventana con el cielo de la tarde */}
      <group position={[-1.5, 3.2, -3.47]}>
        <B s={[2.3, 1.9, 0.05]} pos={[0, 0, -0.02]} c={CREAM} />
        <Flat s={[2.1, 1.7]} pos={[0, 0, 0.02]} c="#f7b26f" />
        <Flat s={[2.1, 0.8]} pos={[0, 0.45, 0.025]} c="#4d88a8" />
        <B s={[0.07, 1.8, 0.06]} pos={[0, 0, 0.04]} c={CREAM} /><B s={[2.2, 0.07, 0.06]} pos={[0, 0, 0.04]} c={CREAM} />
      </group>
      {/* repisa con frascos */}
      <B s={[2.2, 0.08, 0.4]} pos={[1.8, 2.7, -3.3]} c="#7d5030" />
      {[1.1, 1.5, 1.9, 2.3].map((x, i) => <Cy key={x} r={0.13} h={0.36 + (i % 2) * 0.12} pos={[x, 2.92 + (i % 2) * 0.06, -3.3]} c={['#e7a24a', '#9fc4b8', '#c9553b', '#efe2c0'][i]} />)}
      {/* mesa: madera + mantel */}
      <mesh rotation={[-PI / 2, 0, 0]} position={[0, 0.004, 0]}><planeGeometry args={[30, 30]} /><meshStandardMaterial map={wood} flatShading roughness={0.9} /></mesh>
      <mesh rotation={[-PI / 2, 0, 0.12]} position={[0.2, 0.012, 0.3]}><planeGeometry args={[4.6, 4.6]} /><meshStandardMaterial map={cloth} flatShading roughness={0.95} /></mesh>
      {/* lámpara colgante */}
      <group position={[0.4, 4.6, 0.2]}>
        <B s={[0.02, 1.4, 0.02]} pos={[0, 0.7, 0]} c="#333" />
        <mesh><coneGeometry args={[0.5, 0.4, 10, 1, true]} /><M c="#2f6b62" /></mesh>
        <mesh position={[0, -0.12, 0]}><sphereGeometry args={[0.14, 8, 6]} /><M c="#fff3c4" e="#fff3c4" ei={2.5} /></mesh>
      </group>
    </group>
  );
  if (kind === 'space') {
    const st = useTex(skyTex('space'), 512, 512, 'sv2space2');
    return (
      <group>
        <pointLight position={[4, 3, 4]} intensity={40} color="#fff2dc" distance={16} />
        <Flat s={[20, 18]} pos={[0, 5, -3.7]} map={st} />
        {[-4.2, 4.2].map((x) => <Flat key={x} s={[18, 18]} pos={[x, 5, 0]} rot={[0, x < 0 ? PI / 2 : -PI / 2, 0]} map={st} />)}
        <Flat s={[30, 30]} pos={[0, 0.006, 0]} rot={[-PI / 2, 0, 0]} map={st} />
        <Flat s={[30, 30]} pos={[0, 9, 0]} rot={[PI / 2, 0, 0]} map={st} />
        {/* sol lejano */}
        <mesh position={[3.6, 4.6, -3.6]}><circleGeometry args={[0.35, 20]} /><meshBasicMaterial color="#fff6dc" toneMapped={false} /></mesh>
        <mesh position={[3.6, 4.6, -3.59]}><circleGeometry args={[0.9, 24]} /><meshBasicMaterial color="#ffd79a" transparent opacity={0.18} toneMapped={false} depthWrite={false} /></mesh>
      </group>
    );
  }
  if (kind === 'sea') return (
    <group>
      <pointLight position={[2.5, 3.5, 3]} intensity={26} color="#ffc08a" distance={14} />
      <pointLight position={[-3, 2, 1]} intensity={12} color="#7fb6ff" distance={10} />
      <Backdrop kind="dusk" />
      <mesh rotation={[-PI / 2, 0, 0]} position={[0, 0.006, 0]}><planeGeometry args={[40, 40]} /><meshStandardMaterial map={waves} color="#ffffff" flatShading roughness={0.35} metalness={0.2} /></mesh>
      {/* reflejo del sol */}
      <Flat s={[0.8, 8]} pos={[1.2, 0.02, -1.0]} rot={[-PI / 2, 0, 0]} c="#ffb27a" o={0.22} add />
    </group>
  );
  if (kind === 'hangar') {
    const dim = p.dim !== undefined ? eo((t - p.dim) / 0.9) : 0;
    return (
      <group>
        <pointLight position={[0, 4.2, 1.5]} intensity={34 * (1 - dim * 0.65)} color="#fff0c8" distance={14} />
        <pointLight position={[-2.8, 1.5, 1]} intensity={8} color={ORANGE} distance={7} />
        <mesh rotation={[-PI / 2, 0, 0]} position={[0, 0.006, 0]}><planeGeometry args={[40, 40]} /><M c="#7a7f86" /></mesh>
        {Array.from({ length: 12 }, (_, i) => <B key={i} s={[0.03, 0.004, 30]} pos={[-5.5 + i, 0.01, 0]} c="#666b72" />)}
        <B s={[30, 18, 0.2]} pos={[0, 9, -3.6]} c="#3d4855" />
        {Array.from({ length: 30 }, (_, i) => <B key={'r' + i} s={[0.08, 8, 0.06]} pos={[-7.25 + i * 0.5, 4, -3.48]} c="#4a5664" />)}
        {[-4.3, 4.3].map((x) => <B key={x} s={[0.2, 18, 30]} pos={[x, 9, 11]} c="#343e4a" />)}
        {Array.from({ length: 24 }, (_, i) => <B key={'h' + i} s={[0.3, 0.32, 0.03]} pos={[-6 + i * 0.5, 0.3, -3.44]} rot={[0, 0, 0.6]} c={i % 2 ? '#f2c230' : '#1a1a1a'} />)}
        {[-2.2, 0, 2.2].map((x, i) => { const off = p.dim !== undefined && t > p.dim + i * 0.35;
          return <group key={x} position={[x, 4.4, -1.2]}>
            <B s={[0.9, 0.12, 0.4]} c="#2a2f36" />
            <B s={[0.8, 0.05, 0.3]} pos={[0, -0.08, 0]} c={off ? '#4a4a40' : '#fff6d0'} e={off ? undefined : '#fff6d0'} ei={2} />
          </group>; })}
      </group>
    );
  }
  // costa de Texas: 'coast' al atardecer o de noche (p.night)
  const night = !!p.night;
  return (
    <group>
      <pointLight position={[2.6, 3.4, 3]} intensity={night ? 14 : 30} color={night ? '#b8d4ff' : '#ffc890'} distance={14} />
      <pointLight position={[-3, 2.2, 1.5]} intensity={12} color={night ? '#ffcf7a' : '#7fc6d8'} distance={10} />
      <Backdrop kind={night ? 'night' : 'sunset'} />
      <mesh rotation={[-PI / 2, 0, 0]} position={[0, 0.006, 0]}><planeGeometry args={[40, 40]} /><meshStandardMaterial map={sand} color={night ? '#5d6a80' : '#ffffff'} flatShading roughness={0.95} /></mesh>
      {/* franja de mar al fondo */}
      <mesh rotation={[-PI / 2, 0, 0]} position={[0, 0.012, -3.0]}><planeGeometry args={[30, 1.4]} /><meshStandardMaterial map={waves} color={night ? '#3a5470' : '#ffffff'} flatShading roughness={0.4} /></mesh>
      {/* dunas */}
      {Array.from({ length: 9 }, (_, i) => { const r = rnd(30 + i); return <mesh key={i} position={[-4.4 + i * 1.1, 0, -2.0 - r() * 0.3]} scale={[0.9 + r() * 0.6, 0.25 + r() * 0.25, 0.5]}>
        <sphereGeometry args={[1, 8, 5, 0, PI * 2, 0, PI / 2]} /><M c={night ? '#4a5568' : i % 2 ? '#d4a96c' : '#c99c60'} /></mesh>; })}
      {/* pasto de costa */}
      {Array.from({ length: 14 }, (_, i) => { const r = rnd(60 + i); return <mesh key={'g' + i} position={[-3.6 + i * 0.55 + r() * 0.2, 0.12, 1.6 + r() * 1.4]} rotation={[0, r() * 3, (r() - 0.5) * 0.4]}>
        <coneGeometry args={[0.06, 0.28 + r() * 0.2, 4]} /><M c={night ? '#33443c' : '#7b8f4a'} /></mesh>; })}
      {/* plataforma de hormigón */}
      <B s={[3.2, 0.06, 2.0]} pos={[-0.4, 0.03, -0.4]} c={night ? '#555c66' : '#bdb6aa'} />
      {night && [-2.6, 2.6].map((x) => <group key={x} position={[x, 0, -1.6]}>
        <B s={[0.08, 2.6, 0.08]} pos={[0, 1.3, 0]} c="#2a2f36" />
        <B s={[0.4, 0.22, 0.12]} pos={[0, 2.62, 0.05]} c="#fff2c4" e="#fff2c4" ei={2.5} />
        <mesh position={[x < 0 ? 0.9 : -0.9, 1.4, 0.6]} rotation={[0, 0, x < 0 ? 0.55 : -0.55]}><coneGeometry args={[0.9, 2.8, 16, 1, true]} />
          <meshBasicMaterial color="#fff2c4" transparent opacity={0.08} toneMapped={false} depthWrite={false} blending={THREE.AdditiveBlending} side={THREE.DoubleSide} /></mesh>
      </group>)}
    </group>
  );
};

/* ---------- La mosca ---------- */
/** p.buzz: amplitud del zumbido; p.stop: segundo (tt) en que queda quieta en el origen; p.free: sigue volando siempre */
export const Fly: React.FC<P> = ({ t, tt, p }) => {
  const { buzz = 0.35, stop } = p;
  const k = stop !== undefined ? 1 - eio((tt - stop) / 0.18) : 1;
  const x = (Math.sin(t * 5.3) * 0.7 + Math.sin(t * 11.7) * 0.3) * buzz * k;
  const y = (Math.sin(t * 7.1 + 1) * 0.6 + Math.sin(t * 13.3) * 0.25) * buzz * 0.6 * k;
  const z = Math.sin(t * 4.1 + 2) * buzz * 0.4 * k;
  const flap = Math.sin(t * 47) * (k > 0.05 ? 0.6 : 0.15);
  return (
    <group position={[x, y, z]} rotation={[0, Math.sin(t * 3) * 0.6 * k + 0.4, Math.sin(t * 6) * 0.15 * k]}>
      <mesh scale={[0.34, 0.2, 0.2]}><icosahedronGeometry args={[1, 1]} /><M c="#1c1d22" e="#2b4a3a" ei={0.25} /></mesh>
      <mesh position={[-0.36, 0.02, 0]} scale={[0.2, 0.16, 0.16]}><icosahedronGeometry args={[1, 1]} /><M c="#24262c" /></mesh>
      <mesh position={[-0.46, 0.06, 0]} scale={[0.15, 0.15, 0.18]}><icosahedronGeometry args={[1, 0]} /><M c="#2a2d33" /></mesh>
      {[-1, 1].map((sd) => <mesh key={sd} position={[-0.5, 0.1, sd * 0.11]} scale={[0.07, 0.09, 0.07]}><icosahedronGeometry args={[1, 1]} /><M c="#8a1f1a" e="#c0392b" ei={0.5} /></mesh>)}
      {[-1, 1].map((sd) => <group key={'w' + sd} position={[-0.25, 0.17, sd * 0.06]} rotation={[sd * (0.35 + flap), 0, -0.15]}>
        <mesh position={[0.22, 0, sd * 0.18]} rotation={[-PI / 2, 0, 0]} scale={[1, 0.55, 1]}><circleGeometry args={[0.3, 10]} />
          <meshBasicMaterial color="#d8ecff" transparent opacity={0.5} side={THREE.DoubleSide} depthWrite={false} toneMapped={false} /></mesh>
      </group>)}
      {[-0.42, -0.3, -0.18].map((lx, i) => [-1, 1].map((sd) => <B key={i + '' + sd} s={[0.025, 0.2, 0.025]} pos={[lx, -0.2, sd * 0.12]} rot={[sd * 0.5, 0, (i - 1) * 0.3]} c="#15161a" />))}
    </group>
  );
};

/* ---------- Palitos chinos ---------- */
/** Las puntas quedan en el origen y los palitos salen hacia +x. p: len, open (separación de las puntas), gap (cerrados),
 * close (tt en que se cierran), closed, butt (separación atrás), hand (mano que los sostiene), color */
export const Sticks: React.FC<P> = ({ tt, p }) => {
  const { len = 2.6, open = 0.9, gap = 0.12, close, closed, butt = 0.3, hand = true, color = BAMBOO, r = 0.05 } = p;
  const k = closed ? 1 : close !== undefined ? eio((tt - close) / 0.22) : 0;
  const g = lerp(open, gap, k);
  return (
    <group>
      {[-1, 1].map((sd) => { const ty = (sd * g) / 2, by = sd * butt; const dy = by - ty; const L = Math.hypot(len, dy); const a = Math.atan2(dy, len);
        return <group key={sd}>
          <mesh position={[len / 2, (ty + by) / 2, 0]} rotation={[0, 0, a - PI / 2]}><cylinderGeometry args={[r * 1.6, r * 0.55, L, 8]} /><M c={color} e="#7a5520" ei={0.15} /></mesh>
          <mesh position={[len * 0.88, ty + dy * 0.88, 0]} rotation={[0, 0, a - PI / 2]}><cylinderGeometry args={[r * 1.6, r * 1.55, L * 0.2, 8]} /><M c="#b53a2c" /></mesh>
        </group>; })}
      {hand && <group position={[len * 0.8, 0, 0]}>
        <mesh scale={[0.38, 0.5, 0.36]}><icosahedronGeometry args={[1, 1]} /><M c="#e7b48f" /></mesh>
        <mesh position={[0.2, -0.45, 0]} scale={[0.32, 0.5, 0.3]}><icosahedronGeometry args={[1, 1]} /><M c="#e7b48f" /></mesh>
        <Cy r={0.26} h={0.6} pos={[0.45, -0.95, 0]} rot={[0, 0, 0.3]} c="#3f6f8f" />
      </group>}
    </group>
  );
};

/* ---------- Bol de arroz ---------- */
export const Bowl: React.FC<P> = () => (
  <group>
    <mesh position={[0, 0.3, 0]} rotation={[PI, 0, 0]}><sphereGeometry args={[0.6, 14, 8, 0, PI * 2, 0, PI / 2]} /><M c="#f2ede2" /></mesh>
    <Cy r={0.62} r2={0.6} h={0.06} pos={[0, 0.3, 0]} c="#2f6b8f" seg={16} />
    <Cy r={0.26} h={0.06} pos={[0, 0.0, 0]} c="#e9e3d6" seg={14} />
    <mesh position={[0, 0.32, 0]} scale={[1, 0.35, 1]}><icosahedronGeometry args={[0.55, 1]} /><M c="#fbfaf4" /></mesh>
  </group>
);

/* ---------- Llama ---------- */
const Flame: React.FC<{ t: number; r?: number; len?: number }> = ({ t, r = 0.16, len = 0.9 }) => {
  const l = len * (0.82 + 0.18 * Math.sin(t * 41) * Math.sin(t * 17 + 1));
  return (
    <group>
      <mesh position={[0, -l / 2, 0]} rotation={[PI, 0, 0]}><coneGeometry args={[r, l, 8]} /><meshBasicMaterial color="#ff9a3a" toneMapped={false} /></mesh>
      <mesh position={[0, -l * 0.3, 0]} rotation={[PI, 0, 0]}><coneGeometry args={[r * 0.55, l * 0.6, 8]} /><meshBasicMaterial color="#e9f4ff" toneMapped={false} /></mesh>
    </group>
  );
};
const flameOn = (p: any, tt: number) => p.flame !== undefined && p.flame !== false && tt >= (p.flame === true ? 0 : p.flame) && (p.flameOff === undefined || tt < p.flameOff);

/* ---------- Nave (mitad de arriba). Largo 2. Origen en la base; con center/flipAt/horiz, en el centro ---------- */
export const Ship: React.FC<P> = ({ t, tt, p }) => {
  const L = 2, R = 0.2, body = 1.48;
  const flip = p.flipAt !== undefined; const k = flip ? eio((tt - p.flipAt) / (p.flipDur ?? 0.8)) : 0;
  const rz = flip ? lerp(PI / 2, 0, k) : p.horiz ? PI / 2 : 0;
  const centered = flip || p.horiz || p.center;
  const pl = p.plasma ? 1 : 0; const glow = p.glow;
  const steel = p.ghost ? '#8fa3b0' : STEEL;
  return (
    <group rotation={[0, 0, rz]}>
      <group position={[0, centered ? -L / 2 : 0, 0]} rotation={[0, p.roll ?? 0, 0]}>
        <Cy r={R} h={body} pos={[0, body / 2, 0]} c={steel} e={glow} ei={glow ? 0.8 : 0} seg={14} />
        <mesh position={[0, body / 2, 0]}><cylinderGeometry args={[R + 0.006, R + 0.006, body, 14, 1, true, PI / 2, PI]} /><M c={TILE} /></mesh>
        {[0.35, 0.75, 1.15].map((y) => <Cy key={y} r={R + 0.008} h={0.018} pos={[0, y, 0]} c="#9aa0aa" seg={14} />)}
        <mesh position={[0, body + 0.28, 0]}><coneGeometry args={[R, 0.56, 14]} /><M c={steel} e={glow} ei={glow ? 0.8 : 0} /></mesh>
        <mesh position={[0, body + 0.28, 0]}><coneGeometry args={[R + 0.006, 0.565, 14, 1, true, PI / 2, PI]} /><M c={TILE} /></mesh>
        {[-1, 1].map((sd) => <B key={'a' + sd} s={[0.22, 0.48, 0.05]} pos={[sd * 0.3, 0.3, -0.03]} c={TILE} />)}
        {[-1, 1].map((sd) => <B key={'f' + sd} s={[0.15, 0.32, 0.05]} pos={[sd * 0.24, body - 0.02, -0.03]} rot={[0, 0, sd * 0.12]} c={TILE} />)}
        {/* pernos de agarre (donde la atrapan los brazos) */}
        {[-1, 1].map((sd) => <B key={'p' + sd} s={[0.08, 0.06, 0.08]} pos={[sd * 0.22, body - 0.32, 0.05]} c={ORANGE} e={ORANGE} ei={0.6} />)}
        <Cy r={R * 0.86} h={0.06} pos={[0, 0.02, 0]} c="#0d0f14" />
        {flameOn(p, tt) && <Flame t={t} r={0.15} len={p.flameLen ?? 0.8} />}
        {pl > 0 && <group position={[0, L / 2, -0.14]} scale={1 + 0.06 * Math.sin(t * 30)}>
          <mesh scale={[0.5, 1.3, 0.42]}><icosahedronGeometry args={[1, 1]} /><meshBasicMaterial color="#ff6a2a" transparent opacity={0.4} toneMapped={false} depthWrite={false} /></mesh>
          <mesh position={[0, 0, -0.16]} scale={[0.34, 1.12, 0.22]}><icosahedronGeometry args={[1, 1]} /><meshBasicMaterial color="#ffe0a0" transparent opacity={0.6} toneMapped={false} depthWrite={false} /></mesh>
        </group>}
      </group>
    </group>
  );
};

/* ---------- Propulsor (mitad de abajo). Largo 2.8. Origen en la base, o en el centro con center ---------- */
export const Booster: React.FC<P> = ({ t, tt, p }) => {
  const L = 2.8, R = 0.2; const glow = p.glow; const steel = p.ghost ? '#8fa3b0' : STEEL;
  return (
    <group position={[0, p.center ? -L / 2 : 0, 0]}>
      <Cy r={R} h={L} pos={[0, L / 2, 0]} c={steel} e={glow} ei={glow ? 0.8 : 0} seg={14} />
      <Cy r={R + 0.012} h={0.12} pos={[0, L - 0.06, 0]} c={TILE} seg={14} />
      <Cy r={R + 0.02} h={0.26} pos={[0, 0.13, 0]} c={TILE} seg={14} />
      {[[1, 0], [-1, 0], [0, 1], [0, -1]].map(([x, z], i) => <B key={i} s={[x ? 0.24 : 0.05, 0.2, z ? 0.24 : 0.05]} pos={[x * 0.31, L - 0.3, z * 0.31]} c="#8d929c" />)}
      {[0.7, 1.4, 2.1].map((y) => <Cy key={y} r={R + 0.006} h={0.018} pos={[0, y, 0]} c="#9aa0aa" seg={14} />)}
      {[-1, 1].map((sd) => <B key={'p' + sd} s={[0.08, 0.06, 0.08]} pos={[sd * 0.22, L - 0.55, 0.05]} c={ORANGE} e={ORANGE} ei={0.6} />)}
      {flameOn(p, tt) && <Flame t={t} r={0.19} len={p.flameLen ?? 1.0} />}
    </group>
  );
};

/* ---------- Torre de reticulado con dos brazos largos (los "palitos"). Brazos hacia +x ---------- */
/** p: H, armY, len, close (tt), closed, lights */
export const Tower: React.FC<P> = ({ t, tt, p }) => {
  const { H = 3.6, armY = 2.3, len = 1.25 } = p;
  const k = p.closed ? 1 : p.close !== undefined ? eo((tt - p.close) / 0.3) : 0; const a = 0.6 * (1 - k);
  const W = 0.44; const n = Math.floor(H / 0.45);
  return (
    <group>
      {[[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([x, z], i) => <B key={i} s={[0.06, H, 0.06]} pos={[(x * W) / 2, H / 2, (z * W) / 2]} c="#3a3f47" />)}
      {Array.from({ length: n }, (_, i) => <group key={i} position={[0, 0.25 + i * 0.45, 0]}>
        <B s={[W, 0.04, 0.04]} pos={[0, 0, W / 2]} c="#4a5059" /><B s={[W, 0.04, 0.04]} pos={[0, 0, -W / 2]} c="#4a5059" />
        <B s={[0.035, 0.6, 0.03]} pos={[0, 0.22, W / 2]} rot={[0, 0, 0.8]} c="#5a616b" />
        <B s={[0.035, 0.6, 0.03]} pos={[0, 0.22, W / 2]} rot={[0, 0, -0.8]} c="#5a616b" />
      </group>)}
      <B s={[W * 0.8, H, W * 0.8]} pos={[0, H / 2, 0]} c="#2a2e35" o={0.55} />
      <B s={[0.5, 0.18, 0.5]} pos={[0, H + 0.09, 0]} c="#2a2e35" />
      <mesh position={[0, H + 0.3, 0]}><sphereGeometry args={[0.06, 8, 6]} /><M c="#ff3b3b" e="#ff3b3b" ei={1 + Math.max(0, Math.sin(t * 5)) * 2} /></mesh>
      {/* carro de los brazos */}
      <B s={[0.24, 0.36, 0.72]} pos={[0.28, armY, 0]} c="#2a2e35" />
      {[1, -1].map((sd) => (
        <group key={sd} position={[0.34, armY, sd * 0.28]} rotation={[0, -sd * a, 0]}>
          <mesh position={[len / 2, 0, 0]} rotation={[0, 0, -PI / 2]}><cylinderGeometry args={[0.085, 0.05, len, 6]} /><M c={ORANGE} e={ORANGE} ei={0.35} /></mesh>
          <B s={[0.12, 0.05, 0.1]} pos={[len * 0.55, 0.08, 0]} c="#ffd9b0" e="#ffd9b0" ei={1.2} />
        </group>))}
    </group>
  );
};

/* ---------- Tierra propia (mar verde agua, continentes arena, nubes) con 14 órbitas que se van dibujando ---------- */
export const Earth: React.FC<P> = ({ t, tt, p }) => {
  const { n = 14, dur = 3, R = 1 } = p;
  const shown = clamp(tt / dur) * n;
  return (
    <group>
      <group rotation={[0.35, t * 0.35, 0]}>
        <mesh><icosahedronGeometry args={[R, 2]} /><M c="#1e6f8f" e="#0d3550" ei={0.35} /></mesh>
        {[[0.5, 0.6, 0.6, 0.5], [-0.7, 0.2, 0.65, 0.45], [0.1, -0.6, 0.78, 0.42], [-0.3, 0.7, -0.6, 0.5], [0.8, -0.2, -0.5, 0.45], [-0.6, -0.5, -0.6, 0.4]].map(([x, y, z, s], i) => (
          <mesh key={i} position={[x * 0.84 * R, y * 0.84 * R, z * 0.84 * R]} scale={[s * R, s * R, s * R]}><icosahedronGeometry args={[0.6, 0]} /><M c={i % 2 ? '#d9b67a' : '#8fae5c'} /></mesh>))}
        <mesh scale={1.06}><icosahedronGeometry args={[R, 1]} /><meshBasicMaterial color="#ffffff" transparent opacity={0.12} toneMapped={false} depthWrite={false} wireframe /></mesh>
      </group>
      <mesh scale={1.18}><sphereGeometry args={[R, 24, 16]} /><meshBasicMaterial color="#7fd8ff" transparent opacity={0.1} toneMapped={false} depthWrite={false} blending={THREE.AdditiveBlending} side={THREE.BackSide} /></mesh>
      {Array.from({ length: n }, (_, i) => { const f = clamp(shown - i); if (f <= 0) return null; const r = R * (1.28 + i * 0.022);
        return <group key={i} rotation={[1.15 + i * 0.03, 0.12 * Math.sin(i * 1.3), 0.3 + i * 0.07]}>
          <mesh><torusGeometry args={[r, 0.012, 4, 64, f * 2 * PI]} /><meshBasicMaterial color={i === Math.floor(shown) ? '#ffffff' : '#ffb35a'} transparent opacity={0.85} toneMapped={false} /></mesh>
        </group>; })}
      {shown < n && (() => { const i = Math.floor(shown); const r = R * (1.28 + i * 0.022); const ang = (shown - i) * 2 * PI;
        return <group rotation={[1.15 + i * 0.03, 0.12 * Math.sin(i * 1.3), 0.3 + i * 0.07]}>
          <group position={[Math.cos(ang) * r, Math.sin(ang) * r, 0]} rotation={[0, 0, ang]}>
            <mesh><cylinderGeometry args={[0.05, 0.05, 0.22, 8]} /><meshBasicMaterial color="#ffffff" toneMapped={false} /></mesh>
            <mesh position={[0, 0.16, 0]}><coneGeometry args={[0.05, 0.12, 8]} /><meshBasicMaterial color="#ffffff" toneMapped={false} /></mesh>
          </group></group>; })()}
    </group>
  );
};

/* ---------- Rayas de velocidad (la cosa cae) ---------- */
export const Streaks: React.FC<P> = ({ t, p }) => {
  const { n = 12, w = 2, h = 2.6, speed = 5, color = '#fff4dc', seed = 3 } = p;
  const pts = React.useMemo(() => { const r = rnd(seed); return Array.from({ length: n }, () => [r() - 0.5, r(), r() - 0.5, 0.25 + r() * 0.45]); }, [n, seed]);
  return (<group>{pts.map(([x, y0, z, l], i) => { const y = ((y0 + (t * speed) / h) % 1) * h - h / 2; const f = 1 - Math.abs(y / (h / 2));
    return <mesh key={i} position={[x * w, y, z * 0.6]}><boxGeometry args={[0.022, l, 0.022]} /><meshBasicMaterial color={color} transparent opacity={0.7 * f} toneMapped={false} /></mesh>; })}</group>);
};

/* ---------- Regla de altura (marcas cada 10 m, sin texto) ---------- */
export const Ruler: React.FC<P> = ({ tt, p }) => {
  const { h = 2, n = 5, color = '#fff4dc' } = p; const k = eo(tt / 0.6);
  return (
    <group scale={[1, Math.max(0.001, k), 1]}>
      <B s={[0.04, h, 0.04]} pos={[0, h / 2, 0]} c={color} e={color} ei={0.8} />
      {Array.from({ length: n + 1 }, (_, i) => <B key={i} s={[i % n === 0 ? 0.3 : 0.18, 0.035, 0.04]} pos={[0, (i * h) / n, 0]} c={color} e={color} ei={0.8} />)}
    </group>
  );
};

/* ---------- Salpicón en el mar ---------- */
export const Splash: React.FC<P> = ({ tt, p }) => {
  const { r = 0.8, seed = 4 } = p;
  const pts = React.useMemo(() => { const q = rnd(seed); return Array.from({ length: 14 }, () => [q() * 2 * PI, 0.4 + q() * 0.6, 0.08 + q() * 0.1]); }, [seed]);
  if (tt < 0) return null;
  const k = eo(tt / 0.5); const fall = clamp((tt - 0.6) / 1.2);
  return (
    <group>
      {pts.map(([a, h, s], i) => { const d = r * 0.6 * k; const y = Math.max(0, h * 2 * k * (1 - fall) - fall * 0.4);
        return <mesh key={i} position={[Math.cos(a) * d, y, Math.sin(a) * d]} scale={s * (1 + k)}><icosahedronGeometry args={[1, 0]} /><M c="#e9fbff" e="#bfefff" ei={0.6} /></mesh>; })}
      <mesh position={[0, 0.5 * k * (1 - fall * 0.6), 0]} scale={[0.35 * k + 0.01, 1.1 * k * (1 - fall * 0.7) + 0.01, 0.35 * k + 0.01]}><coneGeometry args={[1, 1, 10, 1, true]} />
        <meshBasicMaterial color="#e9fbff" transparent opacity={0.6} side={THREE.DoubleSide} toneMapped={false} depthWrite={false} /></mesh>
      {[0, 1, 2].map((i) => { const q = clamp((tt - i * 0.25) / 1.4); if (q <= 0) return null;
        return <mesh key={'r' + i} rotation={[-PI / 2, 0, 0]} position={[0, 0.03, 0]}><ringGeometry args={[r * q * 1.6, r * q * 1.6 + 0.06, 32]} />
          <meshBasicMaterial color="#e9fbff" transparent opacity={0.7 * (1 - q)} toneMapped={false} /></mesh>; })}
    </group>
  );
};

/* ---------- Explosión chica (bolas que se abren) ---------- */
export const Burst: React.FC<P> = ({ t, tt, p }) => {
  const { r = 0.6, seed = 5, colors = ['#ff8a2a', '#ffd36b', '#ff4a3a', '#fff3c0'] } = p;
  const pts = React.useMemo(() => { const q = rnd(seed); return Array.from({ length: 11 }, () => [q() - 0.5, q() - 0.3, q() - 0.5, 0.16 + q() * 0.24]); }, [seed]);
  if (tt < 0) return null; const k = eo(tt / 0.45); const fade = lerp(1, 0.55, clamp((tt - 0.5) / 1.2));
  return (<group>{pts.map(([x, y, z, s], i) => (
    <mesh key={i} position={[x * 2 * r * k, y * 2 * r * k + tt * 0.08, z * r * k]} scale={s * (0.4 + k) * fade * (1 + 0.08 * Math.sin(t * 12 + i))} rotation={[i, tt * 0.6 + i, 0]}>
      <icosahedronGeometry args={[1, 0]} /><meshBasicMaterial color={colors[i % colors.length]} toneMapped={false} /></mesh>))}</group>);
};

/* ---------- Restos que flotan / caen ---------- */
export const Debris: React.FC<P> = ({ t, tt, p }) => {
  const { n = 9, seed = 8, spread = 0.9 } = p;
  const pts = React.useMemo(() => { const q = rnd(seed); return Array.from({ length: n }, () => [q() - 0.5, q(), q() - 0.5, q()]); }, [n, seed]);
  const k = eo(tt / 0.8);
  return (<group>{pts.map(([x, y, z, s], i) => (
    <group key={i} position={[x * spread * 2 * k, 0.05 + y * 0.12, z * spread * k]} rotation={[i, i * 0.7 + t * 0.1, i * 0.3]}>
      <B s={[0.12 + s * 0.25, 0.04, 0.08 + s * 0.12]} c={i % 3 ? STEEL : TILE} />
    </group>))}</group>);
};

/* ---------- Reloj de arena (pendiente) ---------- */
export const Hourglass: React.FC<P> = ({ t, tt, p }) => {
  const { color = BAMBOO } = p; const sand = clamp((tt % 3) / 3);
  return (
    <group rotation={[0, t * 0.4, 0]}>
      <Cy r={0.42} h={0.08} pos={[0, 0, 0]} c="#6b4426" seg={10} /><Cy r={0.42} h={0.08} pos={[0, 1.2, 0]} c="#6b4426" seg={10} />
      {[0, 1, 2].map((i) => <B key={i} s={[0.04, 1.2, 0.04]} pos={[Math.cos((i * 2 * PI) / 3) * 0.36, 0.6, Math.sin((i * 2 * PI) / 3) * 0.36]} c="#6b4426" />)}
      <mesh position={[0, 0.88, 0]} rotation={[PI, 0, 0]}><coneGeometry args={[0.3, 0.56, 12, 1, true]} /><meshBasicMaterial color="#cfefff" transparent opacity={0.35} side={THREE.DoubleSide} depthWrite={false} toneMapped={false} /></mesh>
      <mesh position={[0, 0.32, 0]}><coneGeometry args={[0.3, 0.56, 12, 1, true]} /><meshBasicMaterial color="#cfefff" transparent opacity={0.35} side={THREE.DoubleSide} depthWrite={false} toneMapped={false} /></mesh>
      <mesh position={[0, 0.9 - (1 - sand) * 0.02, 0]} rotation={[PI, 0, 0]} scale={[1 - sand * 0.8, 1 - sand * 0.8, 1 - sand * 0.8]}><coneGeometry args={[0.26, 0.4, 10]} /><M c={color} /></mesh>
      <mesh position={[0, 0.06 + sand * 0.14, 0]} scale={[0.2 + sand * 0.8, 0.2 + sand * 0.8, 0.2 + sand * 0.8]}><coneGeometry args={[0.26, 0.36, 10]} /><M c={color} /></mesh>
      <B s={[0.02, 0.5, 0.02]} pos={[0, 0.5, 0]} c={color} />
    </group>
  );
};

/* ---------- Atril con micrófono ---------- */
export const Podium: React.FC<P> = () => (
  <group>
    <B s={[0.7, 0.95, 0.45]} pos={[0, 0.475, 0]} c="#2b3440" />
    <B s={[0.8, 0.06, 0.55]} pos={[0, 0.98, 0]} rot={[-0.15, 0, 0]} c="#3c4756" />
    <B s={[0.03, 0.35, 0.03]} pos={[0, 1.15, 0.12]} rot={[-0.4, 0, 0]} c="#111" />
    <mesh position={[0, 1.32, 0.2]}><sphereGeometry args={[0.05, 8, 6]} /><M c="#222" /></mesh>
  </group>
);

/* ---------- Costura que brilla entre las dos mitades ---------- */
export const Seam: React.FC<P> = ({ t, tt }) => {
  const k = eo(tt / 0.3);
  return <mesh scale={[k, 1, k]}><cylinderGeometry args={[0.32, 0.32, 0.04, 20]} /><meshBasicMaterial color="#ffd27a" transparent opacity={0.6 + 0.3 * Math.sin(t * 8)} toneMapped={false} /></mesh>;
};

/* ---------- Muñeco con lentes de sol para la playa (genérico) ---------- */
export const Watcher: React.FC<P> = (a) => <Person {...a} />;

export const EXTRA = { stage: Stage, fly: Fly, sticks: Sticks, bowl: Bowl, ship: Ship, booster: Booster, tower: Tower, earth: Earth, streaks: Streaks,
  ruler: Ruler, splash: Splash, burst: Burst, debris: Debris, hourglass: Hourglass, podium: Podium, seam: Seam, watcher: Watcher };
