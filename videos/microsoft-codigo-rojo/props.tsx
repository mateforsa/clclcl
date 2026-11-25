import React from 'react';
import * as THREE from 'three';
import { M, Label } from '../../src/kit/Props';
import { C, clamp, eo, pop, rnd } from '../../src/kit/math';

type P = { t: number; tt: number; p: any };
type V3 = [number, number, number];
const B: React.FC<{ s: V3; pos?: V3; rot?: V3; c: string; e?: string; ei?: number }> = ({ s, pos, rot, c, e, ei }) => (
  <mesh position={pos} rotation={rot}><boxGeometry args={s} /><M c={c} e={e} ei={ei} /></mesh>
);
const fallK = (tt: number, delay: number, dur: number) => { const x = clamp((tt - delay) / dur); return x * x; };
export const DCOL = [C.cyan, C.gold, C.magenta, C.blue, C.green];

/* Ficha suelta, de frente a cámara (+z). Con fall cae hacia atrás y queda con la cara hacia arriba. */
const Domino: React.FC<P> = ({ t, tt, p }) => {
  const { label = '', color = C.cyan, fall = false, delay = 0, dur = 0.55, ang = 1.5, w = 0.62, h = 1.2, d = 0.16, dir = -1, wob = 0 } = p;
  const k = fall ? fallK(tt, delay, dur) : 0;
  const a = dir * ang * k + (wob ? Math.sin(t * 9) * wob : 0);
  return (
    <group position={[0, 0, (dir * d) / 2]} rotation={[a, 0, 0]}>
      <group position={[0, h / 2, (-dir * d) / 2]}>
        <B s={[w, h, d]} c="#15102b" />
        <B s={[w - 0.08, h - 0.08, d + 0.02]} c={color} e={color} ei={0.55} />
        <B s={[w - 0.16, 0.03, d + 0.04]} c="#15102b" />
        {label && <group position={[0, h * 0.24, d / 2 + 0.025]}><Label t={t} tt={tt} p={{ text: label, w: w - 0.1, h: 0.3, size: 0.7, weight: 900, color: '#15102b' }} /></group>}
        {[-0.14, 0.14].map((x) => <mesh key={x} position={[x, -h * 0.24, d / 2 + 0.02]}><circleGeometry args={[0.07, 10]} /><meshBasicMaterial color="#15102b" toneMapped={false} /></mesh>)}
      </group>
    </group>
  );
};

/* Fila de fichas a lo largo de +x local; caen en cadena hacia +x. La cara con texto mira a -x. */
const Dominoes: React.FC<P> = ({ t, tt, p }) => {
  const { labels = ['', '', '', '', ''], gap = 0.66, fall = false, delay = 0.2, step = 0.2, dur = 0.42, w = 0.7, h = 1.25, d = 0.16, upto = 99 } = p;
  const n = labels.length; const rest = Math.PI / 2 - Math.asin(d / gap) - 0.04;
  return (
    <group position={[(-(n - 1) * gap) / 2, 0, 0]}>
      {labels.map((lb: string, i: number) => {
        const k = fall && i < upto ? fallK(tt, delay + i * step, dur) : 0; const a = -(i === n - 1 ? Math.PI / 2 : rest) * k; const col = DCOL[i % DCOL.length];
        return (
          <group key={i} position={[i * gap + d / 2, 0, 0]} rotation={[0, 0, a]}>
            <group position={[-d / 2, h / 2, 0]}>
              <B s={[d, h, w]} c="#15102b" />
              <B s={[d + 0.02, h - 0.08, w - 0.08]} c={col} e={col} ei={0.55} />
              <B s={[d + 0.04, 0.03, w - 0.16]} c="#15102b" />
              {lb && <group position={[-d / 2 - 0.025, h * 0.24, 0]} rotation={[0, -Math.PI / 2, 0]}><Label t={t} tt={tt} p={{ text: lb, w: w - 0.1, h: 0.32, size: 0.7, weight: 900, color: '#15102b' }} /></group>}
              {[-0.15, 0.15].map((z) => <mesh key={z} position={[-d / 2 - 0.02, -h * 0.24, z]} rotation={[0, -Math.PI / 2, 0]}><circleGeometry args={[0.07, 10]} /><meshBasicMaterial color="#15102b" toneMapped={false} /></mesh>)}
            </group>
          </group>
        );
      })}
    </group>
  );
};

/* Avión, nariz hacia +z */
const Plane: React.FC<P> = ({ p }) => {
  const { color = C.cyan, body = '#f4f1ff' } = p;
  return (
    <group position={[0, 0.42, 0]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.24, 0.24, 2.0, 8]} /><M c={body} /></mesh>
      <mesh position={[0, 0, 1.25]} rotation={[Math.PI / 2, 0, 0]}><coneGeometry args={[0.24, 0.5, 8]} /><M c={body} /></mesh>
      <mesh position={[0, 0.06, -1.2]} rotation={[-Math.PI / 2, 0, 0]}><coneGeometry args={[0.24, 0.5, 8]} /><M c={body} /></mesh>
      <B s={[2.5, 0.07, 0.5]} pos={[0, -0.05, 0.05]} c={color} e={color} ei={0.4} />
      <B s={[0.95, 0.06, 0.3]} pos={[0, 0.08, -1.05]} c={color} e={color} ei={0.4} />
      <B s={[0.07, 0.55, 0.42]} pos={[0, 0.36, -1.05]} c={color} e={color} ei={0.4} />
      <B s={[0.5, 0.03, 0.26]} pos={[0, 0.18, 0.85]} c="#15102b" />
      {[-0.6, 0.6].map((x) => <mesh key={x} position={[x, -0.2, 0.15]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.11, 0.11, 0.4, 8]} /><M c="#8d8aa0" /></mesh>)}
      {[[-0.5, 0], [0.5, 0], [0, 0.9]].map(([x, z], i) => <B key={i} s={[0.08, 0.26, 0.14]} pos={[x, -0.3, z]} c="#15102b" />)}
    </group>
  );
};

const Router: React.FC<P> = ({ t, p }) => {
  const { old = false, led = C.green, w = 1.1 } = p; const body = old ? '#8d8aa0' : '#f4f1ff';
  return (
    <group>
      <B s={[w, 0.24, 0.62]} pos={[0, 0.12, 0]} c={body} />
      <B s={[w, 0.05, 0.63]} pos={[0, 0.03, 0]} c={old ? '#5c5a70' : C.cyan} e={old ? undefined : C.cyan} ei={0.8} />
      {[-0.38, 0.38].map((x) => <B key={x} s={[0.05, 0.6, 0.05]} pos={[x, 0.5, -0.24]} rot={[0, 0, -x * 0.5]} c="#15102b" />)}
      {[0, 1, 2, 3].map((i) => { const on = old ? i === 0 : Math.sin(t * (9 + i * 3) + i * 2) > -0.2; const col = old ? '#ffb52e' : led;
        return <B key={i} s={[0.08, 0.08, 0.03]} pos={[-0.3 + i * 0.2, 0.14, 0.32]} c={col} e={col} ei={on ? 3.5 : 0.2} />; })}
    </group>
  );
};

/* Paquetes de datos que salen en todas direcciones */
const Packets: React.FC<P> = ({ tt, p }) => {
  const { n = 46, R = 2.6, color = C.red, speed = 0.75, seed = 4, up = 0.9 } = p;
  const pts = React.useMemo(() => { const r = rnd(seed); return Array.from({ length: n }, () => { const a = r() * Math.PI * 2; return [Math.cos(a), r() * up, Math.sin(a) * 0.6, r()]; }); }, [n, seed]);
  if (tt <= 0) return null;
  return (<group>{pts.map(([x, y, z, ph], i) => { const k = tt * speed + ph; if (k < 1) return null; const f = k % 1; const s = 0.11 * (1 - f * 0.4);
    return <mesh key={i} position={[x * R * f, y * R * f, z * R * f]} rotation={[k * 3, k * 2, 0]}><boxGeometry args={[s, s, s]} /><M c={color} e={color} ei={2.2} /></mesh>; })}</group>);
};

const Mail: React.FC<P> = ({ p }) => {
  const { color = '#f4f1ff' } = p;
  return (
    <group>
      <B s={[1.3, 0.86, 0.08]} c={color} />
      <B s={[0.82, 0.045, 0.02]} pos={[-0.325, 0.16, 0.05]} rot={[0, 0, -0.62]} c="#6b5aa8" />
      <B s={[0.82, 0.045, 0.02]} pos={[0.325, 0.16, 0.05]} rot={[0, 0, 0.62]} c="#6b5aa8" />
      <B s={[1.3, 0.05, 0.1]} pos={[0, 0.43, 0]} c="#c9c4de" /><B s={[1.3, 0.05, 0.1]} pos={[0, -0.43, 0]} c="#c9c4de" />
    </group>
  );
};

const Spinner: React.FC<P> = ({ t, p }) => {
  const { r = 0.3, color = C.cyan } = p; const head = Math.floor(t * 9) % 8;
  return (<group>{Array.from({ length: 8 }, (_, i) => { const a = (-i / 8) * Math.PI * 2; const age = (head - i + 8) % 8; const ei = 3 - age * 0.4;
    return <mesh key={i} position={[Math.cos(a) * r, Math.sin(a) * r, 0]}><boxGeometry args={[r * 0.34, r * 0.34, 0.05]} /><M c={color} e={color} ei={Math.max(0.1, ei)} o={age > 5 ? 0.35 : 1} /></mesh>; })}</group>);
};

const Tower: React.FC<P> = ({ t, tt, p }) => {
  const { h = 2.4, sign, alarm = false } = p; const col = alarm ? C.red : C.cyan; const bl = Math.sin(t * 8) > 0;
  return (
    <group>
      <mesh position={[0, h / 2, 0]}><cylinderGeometry args={[0.26, 0.4, h, 8]} /><M c="#3a2a8a" /></mesh>
      <mesh position={[0, h + 0.08, 0]}><cylinderGeometry args={[0.72, 0.5, 0.16, 8]} /><M c="#15102b" /></mesh>
      <mesh position={[0, h + 0.4, 0]}><cylinderGeometry args={[0.66, 0.74, 0.5, 8]} /><M c={col} e={col} ei={alarm ? (bl ? 1.6 : 0.4) : 0.9} /></mesh>
      <mesh position={[0, h + 0.72, 0]}><cylinderGeometry args={[0.76, 0.76, 0.14, 8]} /><M c="#15102b" /></mesh>
      <B s={[0.05, 0.6, 0.05]} pos={[0, h + 1.05, 0]} c="#f4f1ff" />
      <B s={[0.1, 0.1, 0.1]} pos={[0, h + 1.38, 0]} c={C.red} e={C.red} ei={bl ? 4 : 0.3} />
      {sign && <group position={[0, h * 0.55, 0.42]}><Label t={t} tt={tt} p={{ text: sign, w: 0.9, h: 0.36, bg: '#15102b', color: C.gold, size: 0.7, weight: 900 }} /></group>}
    </group>
  );
};

const Bank: React.FC<P> = ({ t, tt, p }) => {
  const { sign = 'BANCO', w = 2.2 } = p;
  return (
    <group>
      <B s={[w + 0.3, 0.2, 1.3]} pos={[0, 0.1, 0]} c="#c9c4de" /><B s={[w + 0.1, 0.16, 1.15]} pos={[0, 0.28, 0]} c="#f4f1ff" />
      <B s={[w - 0.2, 1.5, 0.7]} pos={[0, 1.1, -0.2]} c="#3a2a8a" />
      {[-1.5, -0.5, 0.5, 1.5].map((i) => <mesh key={i} position={[(i * (w - 0.3)) / 3, 1.1, 0.3]}><cylinderGeometry args={[0.11, 0.13, 1.5, 8]} /><M c="#f4f1ff" /></mesh>)}
      <B s={[w + 0.1, 0.38, 1.15]} pos={[0, 2.04, 0]} c="#f4f1ff" />
      <mesh position={[0, 2.5, 0]} rotation={[0, Math.PI / 4, 0]} scale={[1, 1, 0.75]}><coneGeometry args={[w * 0.75, 0.55, 4]} /><M c={C.gold} e={C.gold} ei={0.35} /></mesh>
      <group position={[0, 2.04, 0.585]}><Label t={t} tt={tt} p={{ text: sign, w: w - 0.1, h: 0.32, size: 0.78, weight: 900, color: '#15102b' }} /></group>
    </group>
  );
};

const Bug: React.FC<P> = ({ t, p }) => {
  const { color = C.red } = p; const w = Math.sin(t * 14) * 0.25;
  return (
    <group rotation={[0, 0, Math.sin(t * 5) * 0.12]}>
      <mesh scale={[1, 1.25, 0.6]}><icosahedronGeometry args={[0.3, 0]} /><M c={color} e={color} ei={0.9} /></mesh>
      <mesh position={[0, 0.42, 0]} scale={[1, 1, 0.6]}><icosahedronGeometry args={[0.17, 0]} /><M c="#15102b" /></mesh>
      {[-1, 1].map((sd) => [0.2, 0, -0.2].map((y, i) => <B key={sd + '' + i} s={[0.3, 0.045, 0.045]} pos={[sd * 0.38, y, 0]} rot={[0, 0, sd * (0.35 - i * 0.35) + w * sd]} c="#15102b" />))}
      {[-1, 1].map((sd) => <B key={sd} s={[0.035, 0.22, 0.035]} pos={[sd * 0.09, 0.62, 0]} rot={[0, 0, -sd * 0.4]} c="#15102b" />)}
    </group>
  );
};

const Clock: React.FC<P> = ({ tt, p }) => {
  const { r = 0.8, speed = 5, color = C.gold, turns } = p; const a = turns !== undefined ? -eo(tt / (p.dur ?? 1.6)) * turns * Math.PI * 2 : -tt * speed;
  return (
    <group>
      <mesh rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[r + 0.1, r + 0.1, 0.1, 12]} /><M c={color} e={color} ei={0.6} /></mesh>
      <mesh position={[0, 0, 0.03]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[r, r, 0.1, 12]} /><M c="#f4f1ff" /></mesh>
      {Array.from({ length: 12 }, (_, i) => { const q = (i / 12) * Math.PI * 2; return <B key={i} s={[0.05, i % 3 ? 0.1 : 0.18, 0.02]} pos={[Math.sin(q) * r * 0.84, Math.cos(q) * r * 0.84, 0.09]} rot={[0, 0, -q]} c="#15102b" />; })}
      <group rotation={[0, 0, a]} position={[0, 0, 0.1]}><B s={[0.07, r * 0.72, 0.03]} pos={[0, r * 0.3, 0]} c={C.red} e={C.red} ei={1} /></group>
      <group rotation={[0, 0, a / 12]} position={[0, 0, 0.11]}><B s={[0.09, r * 0.45, 0.03]} pos={[0, r * 0.18, 0]} c="#15102b" /></group>
      <mesh position={[0, 0, 0.13]}><sphereGeometry args={[0.07, 6, 4]} /><M c="#15102b" /></mesh>
    </group>
  );
};

/* Tablero de n luces; `bad` de ellas pasan a rojo de a una */
const Dots: React.FC<P> = ({ t, tt, p }) => {
  const { n = 22, bad = 17, cols = 6, gap = 0.42, stagger = 0.07, flip = true, size = 0.26 } = p; const rows = Math.ceil(n / cols);
  const order = React.useMemo(() => { const r = rnd(13); const idx = Array.from({ length: n }, (_, i) => i); for (let i = n - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [idx[i], idx[j]] = [idx[j], idx[i]]; } const o: Record<number, number> = {}; idx.slice(0, bad).forEach((v, k) => (o[v] = k)); return o; }, [n, bad]);
  return (
    <group>
      <B s={[cols * gap + 0.2, rows * gap + 0.2, 0.08]} pos={[0, 0, -0.08]} c="#15102b" />
      {Array.from({ length: n }, (_, i) => { const cx = i % cols, cy = Math.floor(i / cols); const isBad = flip && order[i] !== undefined && tt > order[i] * stagger; const col = isBad ? C.red : C.green;
        const bl = isBad ? (Math.sin(t * 10 + i) > 0 ? 3 : 0.8) : 1.6;
        return <B key={i} s={[size, size, 0.08]} pos={[(cx - (cols - 1) / 2) * gap, ((rows - 1) / 2 - cy) * gap, 0]} c={col} e={col} ei={bl} />; })}
    </group>
  );
};

const Progress: React.FC<P> = ({ t, tt, p }) => {
  const { w = 2, h = 0.26, to = 0.7, dur = 1.2, color = C.cyan, stuck = false } = p; const k = Math.max(0.02, to * eo(tt / dur)); const bad = stuck && tt > dur; const col = bad ? C.red : color;
  return (
    <group>
      <B s={[w + 0.12, h + 0.12, 0.06]} c="#f4f1ff" /><B s={[w, h, 0.08]} c="#15102b" />
      <B s={[w * k, h * 0.74, 0.1]} pos={[-w / 2 + (w * k) / 2 + 0.02, 0, 0.01]} c={col} e={col} ei={bad ? (Math.sin(t * 10) > 0 ? 2.4 : 0.8) : 1.2} />
    </group>
  );
};

/* Monitores en grilla: con flip pasan de a uno a pantalla azul de error */
const Monitors: React.FC<P> = ({ t, tt, p }) => {
  const { cols = 3, rows = 3, gx = 1.05, gy = 0.95, flip = false, stagger = 0.16, w = 0.86, h = 0.56 } = p;
  return (
    <group>
      {Array.from({ length: cols * rows }, (_, i) => { const cx = i % cols, cy = Math.floor(i / cols); const bad = flip && tt > ((i * 5) % (cols * rows)) * stagger;
        return (
          <group key={i} position={[(cx - (cols - 1) / 2) * gx, cy * gy, 0]}>
            <B s={[w + 0.1, h + 0.1, 0.08]} pos={[0, h / 2 + 0.2, 0]} c="#15102b" />
            <B s={[w, h, 0.04]} pos={[0, h / 2 + 0.2, 0.035]} c={bad ? C.blue : '#0c2b22'} e={bad ? C.blue : C.green} ei={bad ? 1.3 : 0.5} />
            {!bad && [0, 1, 2].map((j) => <B key={j} s={[w * (0.6 - j * 0.14), 0.05, 0.02]} pos={[-w * (0.14 + j * 0.07), h / 2 + 0.36 - j * 0.14, 0.06]} c={C.green} e={C.green} ei={1.5} />)}
            {bad && <group position={[0, h / 2 + 0.2, 0.065]}><Label t={t} tt={tt} p={{ text: ':(', w: h, h, size: 0.62, weight: 900 }} /></group>}
            <B s={[0.1, 0.16, 0.06]} pos={[0, 0.1, 0]} c="#15102b" /><B s={[0.44, 0.04, 0.24]} pos={[0, 0.02, 0]} c="#15102b" />
          </group>
        );
      })}
    </group>
  );
};

const Lupa: React.FC<P> = ({ t, p }) => {
  const { r = 0.5, sweep = 1.1, color = C.gold } = p;
  return (
    <group position={[Math.sin(t * 1.5) * sweep, Math.sin(t * 3) * 0.08, 0]}>
      <mesh><torusGeometry args={[r, 0.07, 6, 14]} /><M c={color} e={color} ei={0.8} /></mesh>
      <mesh><circleGeometry args={[r, 14]} /><meshBasicMaterial color="#9fe9ff" transparent opacity={0.22} toneMapped={false} /></mesh>
      <B s={[0.12, 0.7, 0.1]} pos={[r * 0.95, -r * 0.95 - 0.1, 0]} rot={[0, 0, 0.78]} c="#15102b" />
    </group>
  );
};

/* Auto que avanza por +z y salta al pasar por los lomos */
const BumpCar: React.FC<P> = ({ t, p }) => {
  const { from = -7, speed = 2.2, bumps = [-4, -1.5, 1], color = C.cyan } = p; const z = from + t * speed;
  let y = 0, rx = 0; for (const b of bumps) { const d = z - b; if (Math.abs(d) < 0.9) { const q = 1 - Math.abs(d) / 0.9; y = Math.max(y, q * 0.42); rx = -Math.sign(d) * q * 0.28; } }
  return (
    <group position={[0, y, z]} rotation={[rx, 0, 0]}>
      <B s={[0.9, 0.3, 1.9]} pos={[0, 0.36, 0]} c={color} e={color} ei={0.3} /><B s={[0.8, 0.28, 0.95]} pos={[0, 0.64, -0.1]} c="#1a1238" />
      {[[-0.48, 0.62], [0.48, 0.62], [-0.48, -0.62], [0.48, -0.62]].map(([x, zz], i) => <mesh key={i} position={[x, 0.2, zz]} rotation={[t * 10, 0, Math.PI / 2]}><cylinderGeometry args={[0.2, 0.2, 0.14, 8]} /><M c="#0d0a1c" /></mesh>)}
      <B s={[0.22, 0.1, 0.04]} pos={[-0.28, 0.4, 0.96]} c="#fff8c9" e="#fff8c9" ei={3} /><B s={[0.22, 0.1, 0.04]} pos={[0.28, 0.4, 0.96]} c="#fff8c9" e="#fff8c9" ei={3} />
    </group>
  );
};

/* Signo de pregunta que late (para no depender de pop solo) */
const Pulse: React.FC<P> = ({ t, tt, p }) => { const s = 1 + Math.sin(t * 5) * 0.08; return <group scale={[s * pop(tt + 1), s, s]}><Label t={t} tt={tt} p={p} /></group>; };


/* ---------- Props propios de microsoft-codigo-rojo ---------- */
/* Baliza de alarma: on = encendida (gira y pulsa). pole = altura del poste. */
const Beacon: React.FC<P> = ({ t, p }) => {
  const { on = true, pole = 0, speed = 5 } = p; const a = t * speed; const bl = on ? 0.95 + Math.sin(t * 10) * 0.35 : 0.1; const L = 1.7;
  const beam = <meshBasicMaterial color={C.red} transparent opacity={0.2} blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.DoubleSide} toneMapped={false} />;
  return (
    <group>
      {pole > 0 && <mesh position={[0, pole / 2, 0]}><cylinderGeometry args={[0.07, 0.1, pole, 6]} /><M c="#15102b" /></mesh>}
      <group position={[0, pole, 0]}>
        <mesh position={[0, 0.08, 0]}><cylinderGeometry args={[0.36, 0.4, 0.16, 8]} /><M c="#15102b" /></mesh>
        <mesh position={[0, 0.2, 0]}><cylinderGeometry args={[0.3, 0.34, 0.08, 8]} /><M c="#8d8aa0" /></mesh>
        <mesh position={[0, 0.44, 0]}><cylinderGeometry args={[0.26, 0.28, 0.42, 8]} /><M c={on ? C.red : '#6a2030'} e={C.red} ei={bl} /></mesh>
        <mesh position={[0, 0.65, 0]} scale={[1, 0.6, 1]}><sphereGeometry args={[0.26, 8, 5]} /><M c={on ? C.red : '#6a2030'} e={C.red} ei={bl} /></mesh>
        {on && <group position={[0, 0.46, 0]} rotation={[0, a, 0]}>
          <mesh position={[L / 2, 0, 0]} rotation={[0, 0, Math.PI / 2]}><coneGeometry args={[0.42, L, 8, 1, true]} />{beam}</mesh>
          <mesh position={[-L / 2, 0, 0]} rotation={[0, 0, -Math.PI / 2]}><coneGeometry args={[0.42, L, 8, 1, true]} />{beam}</mesh>
        </group>}
        {on && <mesh position={[0, 0.48, 0]} scale={1 + Math.sin(t * 10) * 0.08}><sphereGeometry args={[0.72, 10, 8]} /><meshBasicMaterial color={C.red} transparent opacity={0.12} blending={THREE.AdditiveBlending} depthWrite={false} toneMapped={false} /></mesh>}
      </group>
    </group>
  );
};

/* Hoja de memo / informe */
const Doc: React.FC<P> = ({ t, tt, p }) => {
  const { title, color = C.blue, w = 1.0, h = 1.35, lines = 6 } = p;
  return (
    <group>
      <B s={[w, h, 0.05]} c="#f4f1ff" />
      <B s={[w, h * 0.2, 0.06]} pos={[0, h * 0.4, 0]} c={color} />
      {title && <group position={[0, h * 0.4, 0.035]}><Label t={t} tt={tt} p={{ text: title, w: w * 0.94, h: h * 0.17, size: 0.7, weight: 800 }} /></group>}
      {Array.from({ length: lines }, (_, i) => <B key={i} s={[w * (i % 3 === 2 ? 0.5 : 0.76), h * 0.035, 0.02]} pos={[i % 3 === 2 ? -w * 0.13 : 0, h * 0.2 - i * h * 0.105, 0.03]} c="#9a92c4" />)}
    </group>
  );
};

/* Robot simple (agente de IA) */
const Robot: React.FC<P> = ({ t, p }) => {
  const { color = C.cyan, phase = 0 } = p; const w = Math.sin((t + phase) * 6);
  return (
    <group position={[0, Math.abs(w) * 0.04, 0]}>
      <B s={[0.5, 0.2, 0.4]} pos={[0, 0.1, 0]} c="#15102b" />
      <B s={[0.6, 0.62, 0.42]} pos={[0, 0.55, 0]} c="#f4f1ff" />
      <B s={[0.3, 0.16, 0.02]} pos={[0, 0.6, 0.22]} c={color} e={color} ei={1.6} />
      <B s={[0.52, 0.42, 0.42]} pos={[0, 1.12, 0]} c="#c9c4de" />
      <B s={[0.42, 0.2, 0.02]} pos={[0, 1.14, 0.22]} c="#15102b" />
      {[-0.1, 0.1].map((x) => <B key={x} s={[0.09, 0.09, 0.02]} pos={[x, 1.14, 0.235]} c={color} e={color} ei={Math.sin((t + phase) * 3) > -0.9 ? 3 : 0.2} />)}
      <B s={[0.04, 0.22, 0.04]} pos={[0, 1.44, 0]} c="#15102b" />
      <mesh position={[0, 1.58, 0]}><sphereGeometry args={[0.07, 6, 4]} /><M c={color} e={color} ei={3} /></mesh>
      {[-1, 1].map((sd) => <group key={sd} position={[sd * 0.37, 0.78, 0]} rotation={[-0.9 + w * 0.15 * sd, 0, 0]}><B s={[0.12, 0.42, 0.12]} pos={[0, -0.18, 0]} c="#c9c4de" /></group>)}
    </group>
  );
};

/* Niebla: bolas translúcidas que crecen y se mueven */
const Fog: React.FC<P> = ({ t, tt, p }) => {
  const { n = 9, w = 3.4, h = 1.6, seed = 3, color = '#c9c4de' } = p; const g = eo(tt / 1.0);
  const pts = React.useMemo(() => { const r = rnd(seed); return Array.from({ length: n }, () => [r() - 0.5, r() - 0.5, r() - 0.5, 0.5 + r() * 0.5, r() * 6]); }, [n, seed]);
  if (tt <= 0) return null;
  return (<group>{pts.map(([x, y, z, s, ph], i) => (
    <mesh key={i} position={[x * w + Math.sin(t * 0.7 + ph) * 0.25, y * h, z * 1.0]} scale={[s * g * 1.5, s * g, s * g]}>
      <sphereGeometry args={[0.6, 7, 5]} /><meshBasicMaterial color={color} transparent opacity={0.34} depthWrite={false} toneMapped={false} /></mesh>))}</group>);
};

/* Cubitos que viajan de `from` a `to` haciendo un arco */
const Stream: React.FC<P> = ({ tt, p }) => {
  const { from = [-1, 1, 0], to = [1, 1, 0], n = 9, color = C.magenta, speed = 0.55, arc = 0.7, size = 0.16 } = p;
  if (tt <= 0) return null;
  return (<group>{Array.from({ length: n }, (_, i) => { const k = tt * speed - i / n; if (k < 0) return null; const f = k % 1;
    return <mesh key={i} position={[from[0] + (to[0] - from[0]) * f, from[1] + (to[1] - from[1]) * f + Math.sin(f * Math.PI) * arc, from[2] + (to[2] - from[2]) * f]} rotation={[k * 4, k * 3, 0]}>
      <boxGeometry args={[size, size, size]} /><M c={color} e={color} ei={2} /></mesh>; })}</group>);
};

export const EXTRA: Record<string, React.FC<P>> = {
  domino: Domino, mail: Mail, spinner: Spinner, bug: Bug, clock: Clock, dots: Dots, progress: Progress, monitors: Monitors, lupa: Lupa, pulse: Pulse, packets: Packets,
  beacon: Beacon, doc: Doc, robot: Robot, fog: Fog, stream: Stream,
};
