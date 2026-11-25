import React, { useMemo } from 'react';
import * as THREE from 'three';
import { C, clamp, eo, eio, lerp, pop, rnd, V3 } from './math';

type P = { t: number; tt: number; p: any };
export const M: React.FC<{ c: string; e?: string; ei?: number; o?: number }> = ({ c, e, ei = 1, o }) => (
  <meshStandardMaterial color={c} emissive={e ?? '#000'} emissiveIntensity={e ? ei : 0} flatShading roughness={0.85} metalness={0.05}
    transparent={o !== undefined} opacity={o ?? 1} />
);
const B: React.FC<{ s: V3; pos?: V3; rot?: V3; c: string; e?: string; ei?: number }> = ({ s, pos, rot, c, e, ei }) => (
  <mesh position={pos} rotation={rot}><boxGeometry args={s} /><M c={c} e={e} ei={ei} /></mesh>
);

export function useTex(draw: (g: CanvasRenderingContext2D, w: number, h: number) => void, w: number, h: number, key: string) {
  return useMemo(() => {
    const cv = document.createElement('canvas'); cv.width = w; cv.height = h;
    const g = cv.getContext('2d')!; draw(g, w, h);
    const tx = new THREE.CanvasTexture(cv); tx.colorSpace = THREE.SRGBColorSpace; tx.anisotropy = 8; return tx;
  }, [key]);
}

/* ---------- Persona ---------- */
export const Person: React.FC<P> = ({ t, p }) => {
  const { shirt = C.cyan, pants = '#2a2350', skin = '#f2c39b', hair = '#3a2a1a', pose = 'idle', cap, phase = 0 } = p;
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
          <B s={[0.05, 0.06, 0.02]} pos={[-0.09, 0.02, 0.171]} c="#1a1030" />
          <B s={[0.05, 0.06, 0.02]} pos={[0.09, 0.02, 0.171]} c="#1a1030" />
        </group>
      </group>
    </group>
  );
};

/* ---------- Monedas ---------- */
export const Coins: React.FC<P> = ({ tt, p }) => {
  const { n = 12, dur = 0.8, r = 0.34, from = 0 } = p;
  const vis = Math.round(lerp(from, n, eo(tt / dur)));
  return (
    <group>
      {Array.from({ length: vis }, (_, i) => (
        <mesh key={i} position={[Math.sin(i * 2.4) * 0.02, 0.045 + i * 0.09, Math.cos(i * 1.7) * 0.02]} rotation={[0, i * 0.5, 0]}>
          <cylinderGeometry args={[r, r, 0.075, 10]} />
          <M c={i % 2 ? C.gold : C.gold2} e={C.gold} ei={0.35} />
        </mesh>
      ))}
    </group>
  );
};

/* ---------- Cartel con texto (textura) ---------- */
export const Label: React.FC<P> = ({ p }) => {
  const { text = '', w = 2, h = 0.8, color = '#fff', bg, border, size = 0.6, weight = 800, depth = 0.06, sub, subColor } = p;
  const W = 1024, H = Math.round((1024 * h) / w);
  const tx = useTex((g) => {
    g.clearRect(0, 0, W, H);
    if (bg) { g.fillStyle = bg; g.fillRect(0, 0, W, H); }
    if (border) { g.strokeStyle = border; g.lineWidth = 28; g.strokeRect(14, 14, W - 28, H - 28); }
    g.fillStyle = color; g.textAlign = 'center'; g.textBaseline = 'middle';
    let px = H * size; g.font = `${weight} ${px}px Poppins`;
    const mw = g.measureText(text).width; if (mw > W * 0.88) { px *= (W * 0.88) / mw; g.font = `${weight} ${px}px Poppins`; }
    g.fillText(text, W / 2, sub ? H * 0.42 : H * 0.53);
    if (sub) { g.fillStyle = subColor ?? color; g.font = `600 ${H * 0.16}px Poppins`; g.fillText(sub, W / 2, H * 0.82); }
  }, W, H, JSON.stringify(p));
  return (
    <group>
      {bg && depth > 0 && <B s={[w, h, depth]} pos={[0, 0, -depth / 2 - 0.005]} c={bg} />}
      <mesh><planeGeometry args={[w, h]} /><meshBasicMaterial map={tx} transparent toneMapped={false} /></mesh>
    </group>
  );
};

/* ---------- Caja de juego ---------- */
export const GameBox: React.FC<P> = ({ t, tt, p }) => {
  const { label = 'V', color = '#2e9e5b', glow } = p;
  return (
    <group rotation={[0, Math.sin(t * 1.2) * 0.25, 0]}>
      <B s={[1.1, 1.5, 0.16]} c={color} e={glow ? color : undefined} ei={0.5} />
      <B s={[1.1, 0.22, 0.17]} pos={[0, 0.64, 0]} c="#14102a" />
      <group position={[0, -0.08, 0.085]}><Label t={t} tt={tt} p={{ text: label, w: 1.0, h: 1.0, size: 0.7, weight: 900 }} /></group>
      <group position={[0, 0.64, 0.09]}><Label t={t} tt={tt} p={{ text: 'GTA', w: 0.9, h: 0.2, size: 0.8, weight: 800, color: C.gold }} /></group>
    </group>
  );
};

/* ---------- Pantallas ---------- */
const drawScreen = (kind: string, text?: string) => (g: CanvasRenderingContext2D, W: number, H: number) => {
  const grad = g.createLinearGradient(0, 0, W, H);
  if (kind === 'code') {
    g.fillStyle = '#06140f'; g.fillRect(0, 0, W, H); const r = rnd(7);
    for (let i = 0; i < 12; i++) { g.fillStyle = i % 4 === 0 ? '#27e0d8' : '#3ee07a'; g.fillRect(30 + (i % 3) * 20, 24 + i * 24, 60 + r() * (W - 200), 11); }
  } else if (kind === 'play' || kind === 'trailer') {
    grad.addColorStop(0, '#ff7a3d'); grad.addColorStop(0.55, '#ff3ea5'); grad.addColorStop(1, '#5b2bd6'); g.fillStyle = grad; g.fillRect(0, 0, W, H);
    g.fillStyle = '#ffd36b'; g.beginPath(); g.arc(W * 0.75, H * 0.42, H * 0.2, 0, 7); g.fill();
    g.fillStyle = '#1a0f3d'; for (let i = 0; i < 9; i++) { const bw = W / 9, bh = H * (0.15 + ((i * 37) % 23) / 70); g.fillRect(i * bw, H - bh, bw - 6, bh); }
    g.fillStyle = 'rgba(0,0,0,.35)'; g.beginPath(); g.arc(W / 2, H / 2, H * 0.24, 0, 7); g.fill();
    g.fillStyle = '#fff'; g.beginPath(); g.moveTo(W / 2 - H * 0.08, H / 2 - H * 0.13); g.lineTo(W / 2 + H * 0.14, H / 2); g.lineTo(W / 2 - H * 0.08, H / 2 + H * 0.13); g.fill();
    if (kind === 'trailer') { g.fillStyle = '#ff3b4e'; g.fillRect(0, H - 14, W * 0.3, 14); }
  } else if (kind === 'text') {
    grad.addColorStop(0, '#2a1466'); grad.addColorStop(1, '#0f0828'); g.fillStyle = grad; g.fillRect(0, 0, W, H);
    g.fillStyle = '#fff'; g.textAlign = 'center'; g.textBaseline = 'middle'; let px = H * 0.5; g.font = `900 ${px}px Poppins`;
    const mw = g.measureText(text ?? '').width; if (mw > W * 0.86) { px *= (W * 0.86) / mw; g.font = `900 ${px}px Poppins`; }
    g.fillText(text ?? '', W / 2, H * 0.54);
  } else if (kind === 'chat') {
    g.fillStyle = '#101a33'; g.fillRect(0, 0, W, H);
    [[30, 30, 0.5, '#2f6bff'], [W * 0.4, 110, 0.55, '#27e0d8'], [30, 190, 0.4, '#2f6bff']].forEach(([x, y, k, c]: any) => { g.fillStyle = c; g.fillRect(x, y, W * k, 52); });
  } else { g.fillStyle = '#0c0a18'; g.fillRect(0, 0, W, H); }
};
export const Screen: React.FC<P> = ({ p }) => {
  const { kind = 'play', w = 1.6, h = 0.9, text, frame = '#15102b', stand = false } = p;
  const tx = useTex(drawScreen(kind, text), 512, Math.round((512 * h) / w), kind + text + w + h);
  return (
    <group>
      <B s={[w + 0.12, h + 0.12, 0.08]} c={frame} />
      <mesh position={[0, 0, 0.045]}><planeGeometry args={[w, h]} /><meshBasicMaterial map={tx} toneMapped={false} /></mesh>
      {stand && <><B s={[0.12, 0.3, 0.08]} pos={[0, -h / 2 - 0.2, 0]} c={frame} /><B s={[0.6, 0.05, 0.3]} pos={[0, -h / 2 - 0.36, 0]} c={frame} /></>}
    </group>
  );
};
export const Phone: React.FC<P> = (a) => (
  <group><B s={[0.5, 0.95, 0.06]} c="#15102b" /><group position={[0, 0, 0.035]}><Screen {...a} p={{ kind: a.p.kind ?? 'chat', w: 0.42, h: 0.84, frame: '#15102b', text: a.p.text }} /></group></group>
);
export const Laptop: React.FC<P> = (a) => (
  <group>
    <B s={[0.9, 0.05, 0.6]} pos={[0, 0.025, 0]} c="#c9c4de" />
    <group position={[0, 0.33, -0.3]} rotation={[-0.2, 0, 0]}><Screen {...a} p={{ kind: a.p.kind ?? 'code', w: 0.8, h: 0.52, frame: '#c9c4de' }} /></group>
  </group>
);
export const FireStick: React.FC<P> = () => (
  <group><B s={[0.22, 0.6, 0.08]} c="#17131f" /><B s={[0.12, 0.14, 0.05]} pos={[0, 0.36, 0]} c="#8d8aa0" /><B s={[0.05, 0.05, 0.01]} pos={[0, -0.18, 0.045]} c={C.gold} e={C.gold} ei={2} /></group>
);

/* ---------- Muebles / objetos ---------- */
export const Bed: React.FC<P> = () => (
  <group><B s={[1.3, 0.3, 2.1]} pos={[0, 0.25, 0]} c="#7a5a44" /><B s={[1.24, 0.2, 2.0]} pos={[0, 0.5, 0]} c="#f4f1ff" /><B s={[1.24, 0.22, 1.2]} pos={[0, 0.52, 0.4]} c="#ff6b8b" /><B s={[0.8, 0.14, 0.4]} pos={[0, 0.66, -0.72]} c="#fff" /><B s={[1.3, 0.9, 0.1]} pos={[0, 0.6, -1.05]} c="#5c4030" /></group>
);
export const Desk: React.FC<P> = () => (
  <group><B s={[1.6, 0.08, 0.8]} pos={[0, 0.78, 0]} c="#8a5a3a" />{[[-0.72, -0.32], [0.72, -0.32], [-0.72, 0.32], [0.72, 0.32]].map(([x, z], i) => <B key={i} s={[0.08, 0.78, 0.08]} pos={[x, 0.39, z]} c="#5c3a26" />)}</group>
);
export const Building: React.FC<P> = ({ p }) => {
  const { w = 1.4, h = 3, d = 1.2, color = '#241659', seed = 1, sign } = p;
  const tx = useTex((g, W, H) => {
    g.fillStyle = color; g.fillRect(0, 0, W, H); const r = rnd(seed); const cols = 4, rows = Math.max(3, Math.round((h / w) * 4));
    const cw = W / cols, rh = H / rows; const pal = [C.cyan, C.magenta, C.gold, '#8a6bff', '#fff3c4'];
    for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) if (r() > 0.3) { g.fillStyle = pal[Math.floor(r() * pal.length)]; g.fillRect(x * cw + cw * 0.22, y * rh + rh * 0.22, cw * 0.56, rh * 0.52); }
  }, 128, 256, 'b' + w + h + color + seed);
  return (
    <group>
      <mesh position={[0, h / 2, 0]}><boxGeometry args={[w, h, d]} /><meshStandardMaterial map={tx} emissiveMap={tx} emissive="#fff" emissiveIntensity={0.9} flatShading /></mesh>
      {sign && <group position={[0, h + 0.35, 0]}><Label t={0} tt={0} p={{ text: sign, w: w * 1.1, h: 0.5, bg: '#15102b', color: C.gold, size: 0.62 }} /></group>}
    </group>
  );
};
export const Car: React.FC<P> = ({ t, p }) => {
  const { color = C.magenta } = p;
  return (
    <group>
      <B s={[0.9, 0.3, 2.0]} pos={[0, 0.36, 0]} c={color} /><B s={[0.8, 0.28, 1.0]} pos={[0, 0.64, -0.1]} c="#1a1238" />
      {[[-0.48, 0.65], [0.48, 0.65], [-0.48, -0.65], [0.48, -0.65]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.2, z]} rotation={[t * 10, 0, Math.PI / 2]}><cylinderGeometry args={[0.2, 0.2, 0.14, 8]} /><M c="#0d0a1c" /></mesh>
      ))}
      <B s={[0.22, 0.1, 0.04]} pos={[-0.28, 0.4, 1.01]} c="#fff8c9" e="#fff8c9" ei={3} /><B s={[0.22, 0.1, 0.04]} pos={[0.28, 0.4, 1.01]} c="#fff8c9" e="#fff8c9" ei={3} />
      <B s={[0.7, 0.08, 0.04]} pos={[0, 0.4, -1.01]} c={C.red} e={C.red} ei={2} />
    </group>
  );
};
export const Console: React.FC<P> = ({ p }) => p.kind === 'b' ? (
  <group><B s={[0.7, 1.4, 0.7]} pos={[0, 0.7, 0]} c="#18181d" /><mesh position={[0, 1.405, 0]} rotation={[-Math.PI / 2, 0, 0]}><circleGeometry args={[0.24, 10]} /><meshBasicMaterial color={C.green} toneMapped={false} /></mesh><B s={[0.5, 0.03, 0.02]} pos={[0, 1.1, 0.351]} c={C.green} e={C.green} ei={2} /></group>
) : (
  <group><B s={[0.14, 1.5, 0.95]} pos={[-0.2, 0.75, 0]} c="#f4f1ff" /><B s={[0.14, 1.5, 0.95]} pos={[0.2, 0.75, 0]} c="#f4f1ff" /><B s={[0.28, 1.36, 0.85]} pos={[0, 0.72, 0]} c="#15102b" /><B s={[0.04, 1.0, 0.03]} pos={[0, 0.8, 0.43]} c={C.blue} e={C.blue} ei={3} /></group>
);
export const Pc: React.FC<P> = (a) => (
  <group><B s={[0.5, 1.1, 1.0]} pos={[0.95, 0.55, 0]} c="#2b2740" /><B s={[0.04, 0.8, 0.03]} pos={[0.82, 0.6, 0.51]} c={C.magenta} e={C.magenta} ei={2} />
    <group position={[-0.15, 0.82, 0]}><Screen {...a} p={{ kind: 'off', w: 1.3, h: 0.78, stand: true }} /></group></group>
);
export const Cross: React.FC<P> = ({ p }) => { const { size = 1, color = C.red } = p; return (
  <group><B s={[size * 1.3, size * 0.2, 0.08]} rot={[0, 0, Math.PI / 4]} c={color} e={color} ei={1.4} /><B s={[size * 1.3, size * 0.2, 0.08]} rot={[0, 0, -Math.PI / 4]} c={color} e={color} ei={1.4} /></group>); };
export const Check: React.FC<P> = ({ p }) => { const { size = 1, color = C.green } = p; return (
  <group><B s={[size * 0.5, size * 0.18, 0.08]} pos={[-size * 0.3, -size * 0.12, 0]} rot={[0, 0, -Math.PI / 4]} c={color} e={color} ei={1.4} /><B s={[size * 1.0, size * 0.18, 0.08]} pos={[size * 0.18, 0.06 * size, 0]} rot={[0, 0, Math.PI / 4]} c={color} e={color} ei={1.4} /></group>); };
export const Arrow: React.FC<P> = ({ tt, p }) => {
  const { len = 2, color = C.green, dur = 0.5 } = p; const k = Math.max(0.001, eo(tt / dur));
  return (<group><B s={[0.22, len * k, 0.22]} pos={[0, (len * k) / 2, 0]} c={color} e={color} ei={1.2} />
    <mesh position={[0, len * k + 0.22, 0]}><coneGeometry args={[0.36, 0.5, 4]} /><M c={color} e={color} ei={1.2} /></mesh></group>);
};
export const Ring: React.FC<P> = ({ t, p }) => {
  const { r = 1.2, color = C.cyan } = p; const pu = 1 + Math.sin(t * 3) * 0.03;
  return (<group rotation={[-Math.PI / 2, 0, 0]} scale={pu}>
    <mesh><ringGeometry args={[r, r + 0.07, 40]} /><meshBasicMaterial color={color} toneMapped={false} /></mesh>
    <mesh><ringGeometry args={[r + 0.22, r + 0.26, 40]} /><meshBasicMaterial color={color} transparent opacity={0.6} toneMapped={false} /></mesh>
    <mesh position={[0, 0, -0.01]}><circleGeometry args={[r + 0.9, 40]} /><meshBasicMaterial color={color} transparent opacity={0.1} toneMapped={false} blending={THREE.AdditiveBlending} depthWrite={false} /></mesh>
  </group>);
};
export const Globe: React.FC<P> = ({ t }) => (
  <group rotation={[0.3, t * 0.5, 0]}>
    <mesh><icosahedronGeometry args={[1, 1]} /><M c="#2f6bff" e="#16307a" ei={0.6} /></mesh>
    {[[0.5, 0.6, 0.6, 0.5], [-0.7, 0.2, 0.65, 0.45], [0.1, -0.6, 0.78, 0.4], [-0.3, 0.7, -0.6, 0.5], [0.8, -0.2, -0.5, 0.45], [-0.6, -0.5, -0.6, 0.4]].map(([x, y, z, s], i) => (
      <mesh key={i} position={[x * 0.86, y * 0.86, z * 0.86]} scale={[s, s, s]}><icosahedronGeometry args={[0.6, 0]} /><M c={C.green} /></mesh>))}
  </group>
);
export const Server: React.FC<P> = ({ t, p }) => (
  <group><B s={[1, 2, 0.8]} pos={[0, 1, 0]} c="#221a4a" />
    {Array.from({ length: 6 }, (_, i) => { const on = Math.sin(t * (5 + i) + i * 2) > 0; const col = p.alarm ? C.red : i % 2 ? C.cyan : C.green;
      return <group key={i}><B s={[0.86, 0.22, 0.04]} pos={[0, 0.3 + i * 0.3, 0.4]} c="#15102b" /><B s={[0.08, 0.08, 0.03]} pos={[-0.3, 0.3 + i * 0.3, 0.43]} c={col} e={col} ei={on ? 3 : 0.3} /><B s={[0.3, 0.04, 0.03]} pos={[0.15, 0.3 + i * 0.3, 0.43]} c="#3b2f7a" /></group>; })}
  </group>
);
export const Bars: React.FC<P> = ({ tt, p }) => {
  const { vals = [1, 2], colors = [C.cyan, C.gold], w = 0.8, gap = 0.5, dur = 0.8, stagger = 0.5 } = p;
  const tot = vals.length * w + (vals.length - 1) * gap;
  return (<group>{vals.map((v: number, i: number) => { const h = Math.max(0.001, v * eo((tt - i * stagger) / dur));
    return <B key={i} s={[w, h, w]} pos={[-tot / 2 + w / 2 + i * (w + gap), h / 2, 0]} c={colors[i % colors.length]} e={colors[i % colors.length]} ei={0.4} />; })}</group>);
};
export const Calendar: React.FC<P> = ({ t, tt, p }) => {
  const { top = 'MAYO', big = '2026', color = C.red } = p;
  return (<group>
    <B s={[1.5, 1.6, 0.1]} c="#f4f1ff" /><B s={[1.5, 0.42, 0.11]} pos={[0, 0.59, 0]} c={color} />
    <group position={[0, 0.59, 0.06]}><Label t={t} tt={tt} p={{ text: top, w: 1.4, h: 0.36, size: 0.72 }} /></group>
    <group position={[0, -0.2, 0.056]}><Label t={t} tt={tt} p={{ text: big, w: 1.4, h: 1.0, size: 0.62, color: '#1a1030', weight: 900 }} /></group>
    {[-0.45, 0.45].map((x) => <B key={x} s={[0.08, 0.22, 0.14]} pos={[x, 0.84, 0]} c="#8d8aa0" />)}
  </group>);
};
/** n miniaturas de video que salen disparadas */
export const Clips: React.FC<P> = ({ tt, p }) => {
  const { n = 30, seed = 3, spread = [3.2, 3.2, 2], stagger = 0.035 } = p;
  const tx = useTex(drawScreen('play'), 128, 72, 'clip');
  const pts = useMemo(() => { const r = rnd(seed); return Array.from({ length: n }, () => [(r() - 0.5) * 2, r() * 1.0, (r() - 0.5) * 2, (r() - 0.5) * 0.8]); }, [n, seed]);
  return (<group>{pts.map(([x, y, z, rz], i) => { const k = eo((tt - i * stagger) / 0.5); if (k <= 0) return null;
    return <mesh key={i} position={[x * spread[0] * k, 0.2 + y * spread[1] * k, z * spread[2] * k]} rotation={[0, 0, rz * k]} scale={pop(tt - i * stagger)}>
      <planeGeometry args={[0.62, 0.36]} /><meshBasicMaterial map={tx} toneMapped={false} side={THREE.DoubleSide} /></mesh>; })}</group>);
};
/** multitud de muñecos que aparecen de a uno */
export const Crowd: React.FC<P> = ({ t, tt, p }) => {
  const { n = 12, seed = 5, area = [5, 3], pose = 'idle', stagger = 0.05, face = 0, sc = 0.8 } = p;
  const pal = [C.cyan, C.magenta, C.gold, '#8a6bff', '#3ee07a', '#ff7a3d', '#f4f1ff'];
  const ppl = useMemo(() => { const r = rnd(seed); const cols = Math.ceil(Math.sqrt(n * area[0] / area[1])); const rows = Math.ceil(n / cols);
    return Array.from({ length: n }, (_, i) => ({ x: ((i % cols) + 0.5) / cols - 0.5 + (r() - 0.5) * 0.5 / cols, z: (Math.floor(i / cols) + 0.5) / rows - 0.5 + (r() - 0.5) * 0.4 / rows,
      shirt: pal[Math.floor(r() * pal.length)], hair: ['#3a2a1a', '#15102b', '#c98a3a', '#7a3b1a'][Math.floor(r() * 4)], skin: ['#f2c39b', '#c98d62', '#8a5a3c', '#ffd9b8'][Math.floor(r() * 4)], ph: r() * 6 })); }, [n, seed]);
  return (<group>{ppl.map((q, i) => { const k = pop(tt - i * stagger); if (k <= 0) return null;
    return <group key={i} position={[q.x * area[0], 0, q.z * area[1]]} rotation={[0, face, 0]} scale={k * sc}><Person t={t} tt={tt} p={{ shirt: q.shirt, hair: q.hair, skin: q.skin, pose, phase: q.ph }} /></group>; })}</group>);
};
export const Box: React.FC<P> = ({ p }) => <B s={p.size ?? [1, 1, 1]} c={p.color ?? '#fff'} e={p.glow ? p.color : undefined} ei={p.ei ?? 1} />;
export const Road: React.FC<P> = ({ t, p }) => { const { len = 40, speed = 0 } = p; const off = (t * speed) % 2;
  return (<group><B s={[3.2, 0.04, len]} pos={[0, 0.02, 0]} c="#1c1440" />
    {[-1.6, 1.6].map((x) => <B key={x} s={[0.08, 0.06, len]} pos={[x, 0.04, 0]} c={C.magenta} e={C.magenta} ei={2} />)}
    {Array.from({ length: Math.floor(len / 2) }, (_, i) => <B key={i} s={[0.12, 0.05, 0.9]} pos={[0, 0.045, -len / 2 + i * 2 + off]} c={C.gold} e={C.gold} ei={1.2} />)}</group>); };
export const Arch: React.FC<P> = ({ t, tt, p }) => (
  <group><B s={[0.25, 3, 0.25]} pos={[-2, 1.5, 0]} c={C.cyan} e={C.cyan} ei={1} /><B s={[0.25, 3, 0.25]} pos={[2, 1.5, 0]} c={C.cyan} e={C.cyan} ei={1} />
    <group position={[0, 3.2, 0]}><Label t={t} tt={tt} p={{ text: p.text ?? 'META', w: 4.4, h: 0.9, bg: '#15102b', border: C.cyan, color: '#fff', size: 0.6 }} /></group></group>
);

export const REG: Record<string, React.FC<P>> = {
  person: Person, coins: Coins, label: Label, gamebox: GameBox, screen: Screen, phone: Phone, laptop: Laptop, firestick: FireStick, bed: Bed, desk: Desk,
  building: Building, car: Car, console: Console, pc: Pc, cross: Cross, check: Check, arrow: Arrow, ring: Ring, globe: Globe, server: Server, bars: Bars,
  calendar: Calendar, clips: Clips, crowd: Crowd, box: Box, road: Road, arch: Arch,
};
