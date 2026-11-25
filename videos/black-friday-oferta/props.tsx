import React from 'react';
import { M, Label, useTex } from '../../src/kit/Props';
import { C, clamp, eo, pop } from '../../src/kit/math';

type P = { t: number; tt: number; p: any };
type V3 = [number, number, number];
const B: React.FC<{ s: V3; pos?: V3; rot?: V3; c: string; e?: string; ei?: number }> = ({ s, pos, rot, c, e, ei }) => (
  <mesh position={pos} rotation={rot}><boxGeometry args={s} /><M c={c} e={e} ei={ei} /></mesh>
);

/** Televisor de frente (+z). w, h = tamaño de la pantalla. */
export const Tv: React.FC<P> = ({ t, p }) => {
  const { w = 2.0, h = 1.15, stand = true } = p;
  const tx = useTex((g, W, H) => {
    const gr = g.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, '#2f6bff'); gr.addColorStop(0.6, '#27e0d8'); gr.addColorStop(1, '#3ee07a'); g.fillStyle = gr; g.fillRect(0, 0, W, H);
    g.fillStyle = '#ffe14a'; g.beginPath(); g.arc(W * 0.74, H * 0.3, H * 0.15, 0, 7); g.fill();
    g.fillStyle = '#1b1340'; g.beginPath(); g.moveTo(0, H); g.lineTo(W * 0.28, H * 0.42); g.lineTo(W * 0.5, H * 0.78); g.lineTo(W * 0.68, H * 0.55); g.lineTo(W, H * 0.95); g.lineTo(W, H); g.fill();
  }, 512, 288, 'tv');
  return (
    <group>
      <B s={[w + 0.14, h + 0.14, 0.1]} c="#15102b" />
      <mesh position={[0, 0, 0.055]}><planeGeometry args={[w, h]} /><meshBasicMaterial map={tx} toneMapped={false} /></mesh>
      <B s={[0.1, 0.1, 0.02]} pos={[w / 2 - 0.08, -h / 2 - 0.02, 0.06]} c={C.red} e={C.red} ei={1.5 + Math.sin(t * 4)} />
      {stand && <><B s={[0.16, 0.3, 0.08]} pos={[0, -h / 2 - 0.2, 0]} c="#15102b" /><B s={[0.9, 0.06, 0.4]} pos={[0, -h / 2 - 0.36, 0]} c="#2b2740" /></>}
    </group>
  );
};

/** Etiqueta de precio colgante. top = encabezado chico, text = precio. strike = segundo (desde que aparece) en que se tacha. */
export const Tag: React.FC<P> = ({ t, tt, p }) => {
  const { text = '$', top, w = 1.5, h = 0.8, bg = '#f4f1ff', color = '#1a1030', topColor = '#6b5aa8', strike, swing = 0.04 } = p;
  const W = 768, H = Math.round((768 * h) / w);
  const tx = useTex((g) => {
    g.clearRect(0, 0, W, H); g.textAlign = 'center'; g.textBaseline = 'middle';
    if (top) { g.fillStyle = topColor; g.font = `800 ${H * 0.2}px Poppins`; g.fillText(top, W * 0.54, H * 0.22); }
    let px = H * (top ? 0.46 : 0.56); g.font = `900 ${px}px Poppins`; const mw = g.measureText(text).width; if (mw > W * 0.8) { px *= (W * 0.8) / mw; g.font = `900 ${px}px Poppins`; }
    g.fillStyle = color; g.fillText(text, W * 0.54, top ? H * 0.62 : H * 0.54);
  }, W, H, JSON.stringify([text, top, w, h, color, topColor]));
  const k = strike === undefined ? 0 : eo((tt - strike) / 0.3);
  return (
    <group rotation={[0, 0, Math.sin(t * 2.1) * swing]}>
      <B s={[w, h, 0.07]} pos={[0, 0, -0.04]} c={bg} e={bg} ei={0.25} />
      <mesh position={[-w / 2 + 0.13, h / 2 - 0.13, 0.002]}><circleGeometry args={[0.055, 10]} /><meshBasicMaterial color="#15102b" toneMapped={false} /></mesh>
      <mesh position={[0, 0, 0.004]}><planeGeometry args={[w, h]} /><meshBasicMaterial map={tx} transparent toneMapped={false} /></mesh>
      {k > 0 && <B s={[w * 1.05 * k, h * 0.065, 0.05]} pos={[-(w * 1.05 * (1 - k)) / 2, -h * 0.1, 0.05]} rot={[0, 0, -0.14]} c={C.red} e={C.red} ei={1.6} />}
    </group>
  );
};

/** Changuito, mira hacia +x. p.n = productos adentro (aparecen de a uno). */
export const Cart: React.FC<P> = ({ tt, p }) => {
  const { n = 4, color = C.cyan, stagger = 0.18 } = p; const cols = ['#ff7a3d', C.gold, C.magenta, '#3ee07a', '#f4f1ff', C.blue];
  return (
    <group>
      <B s={[1.0, 0.05, 0.6]} pos={[0, 0.42, 0]} c={color} e={color} ei={0.5} />
      {[-0.29, 0.29].map((z) => <group key={z}><B s={[1.0, 0.05, 0.04]} pos={[0, 0.95, z]} c={color} e={color} ei={0.5} />
        {[-0.48, -0.16, 0.16, 0.48].map((x) => <B key={x} s={[0.04, 0.5, 0.04]} pos={[x, 0.68, z]} c={color} e={color} ei={0.5} />)}</group>)}
      {[-0.48, 0.48].map((x) => <B key={x} s={[0.04, 0.05, 0.6]} pos={[x, 0.95, 0]} c={color} e={color} ei={0.5} />)}
      <B s={[0.05, 0.5, 0.05]} pos={[-0.62, 1.05, 0]} rot={[0, 0, 0.5]} c="#f4f1ff" />
      <B s={[0.07, 0.07, 0.66]} pos={[-0.74, 1.26, 0]} c={C.magenta} e={C.magenta} ei={0.8} />
      {[[-0.38, -0.25], [0.38, -0.25], [-0.38, 0.25], [0.38, 0.25]].map(([x, z], i) => <group key={i}><B s={[0.04, 0.26, 0.04]} pos={[x, 0.28, z]} c="#8d8aa0" />
        <mesh position={[x, 0.1, z]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.1, 0.1, 0.07, 8]} /><M c="#15102b" /></mesh></group>)}
      {Array.from({ length: n }, (_, i) => { const k = pop(tt - i * stagger + 0.33); if (k <= 0) return null; const x = -0.3 + (i % 3) * 0.3, z = i % 2 ? 0.13 : -0.13, hh = 0.34 + (i % 3) * 0.1;
        return <group key={i} position={[x, 0.45 + hh / 2 + Math.floor(i / 3) * 0.3, z]} scale={k}><B s={[0.24, hh, 0.22]} c={cols[i % cols.length]} e={cols[i % cols.length]} ei={0.25} /></group>; })}
    </group>
  );
};

/** Lupa. sweep = amplitud del barrido en x. */
export const Lupa: React.FC<P> = ({ t, p }) => {
  const { r = 0.5, color = C.gold, sweep = 0, sweepY = 0 } = p;
  return (
    <group position={[Math.sin(t * 1.7) * sweep, Math.cos(t * 1.3) * sweepY, 0]}>
      <mesh><torusGeometry args={[r, r * 0.16, 6, 18]} /><M c={color} e={color} ei={0.7} /></mesh>
      <mesh><circleGeometry args={[r, 18]} /><meshBasicMaterial color={C.cyan} transparent opacity={0.28} toneMapped={false} /></mesh>
      <B s={[r * 0.28, r * 1.3, r * 0.22]} pos={[r * 1.12, -r * 1.12, 0]} rot={[0, 0, Math.PI / 4]} c="#15102b" />
    </group>
  );
};

/** Historial de precios: línea sobre un panel. pts = alturas, cols = color por tramo, refY = línea punteada. */
export const Chart: React.FC<P> = ({ tt, p }) => {
  const { pts = [1, 2], cols, w = 2.6, h = 2.2, dur = 1.2, board = true, refY, thick = 0.09, start = 0 } = p as any;
  const n = pts.length - 1; const k = clamp((tt - start) / dur) * n; const X = (i: number) => -w / 2 + 0.2 + ((w - 0.4) * i) / n;
  const fi = Math.min(n - 1, Math.floor(k)); const ff = k - fi;
  const hx = X(fi) + (X(1) - X(0)) * ff, hy = pts[fi] + (pts[fi + 1] - pts[fi]) * ff;
  return (
    <group>
      {board && <B s={[w, h, 0.08]} pos={[0, h / 2, -0.06]} c="#1a1140" />}
      {board && [0.25, 0.5, 0.75].map((f) => <B key={f} s={[w - 0.2, 0.015, 0.02]} pos={[0, h * f, -0.01]} c="#3b2f7a" />)}
      {board && <B s={[w + 0.08, 0.06, 0.1]} pos={[0, 0, -0.06]} c={C.cyan} e={C.cyan} ei={1} />}
      {refY !== undefined && Array.from({ length: 9 }, (_, i) => <B key={i} s={[(w - 0.3) / 14, 0.035, 0.03]} pos={[-w / 2 + 0.25 + ((w - 0.5) * i) / 8, refY, 0]} c="#f4f1ff" e="#f4f1ff" ei={0.8} />)}
      {Array.from({ length: n }, (_, i) => {
        const f = clamp(k - i); if (f <= 0) return null;
        const x0 = X(i), y0 = pts[i], x1 = x0 + (X(i + 1) - x0) * f, y1 = y0 + (pts[i + 1] - y0) * f; const len = Math.hypot(x1 - x0, y1 - y0);
        const col = cols ? cols[i] : pts[i + 1] > pts[i] ? C.red : pts[i + 1] < pts[i] ? C.green : C.gold;
        return <B key={i} s={[len + thick * 0.6, thick, 0.06]} pos={[(x0 + x1) / 2, (y0 + y1) / 2, 0.03]} rot={[0, 0, Math.atan2(y1 - y0, x1 - x0)]} c={col} e={col} ei={1.3} />;
      })}
      {tt > start && <mesh position={[hx, hy, 0.07]}><sphereGeometry args={[0.1, 8, 6]} /><meshBasicMaterial color="#fff" toneMapped={false} /></mesh>}
    </group>
  );
};

/** Local / tienda de frente (+z). sign = cartel. */
export const Shop: React.FC<P> = ({ t, tt, p }) => {
  const { sign = 'TIENDA', color = '#2d1a6e', aw = C.magenta, w = 1.3, h = 1.1, d = 0.8, signBg = '#15102b', signColor = C.gold } = p;
  return (
    <group>
      <B s={[w, h, d]} pos={[0, h / 2, 0]} c={color} />
      <B s={[w * 0.26, h * 0.62, 0.04]} pos={[-w * 0.26, h * 0.31, d / 2 + 0.01]} c="#15102b" />
      <B s={[w * 0.4, h * 0.36, 0.04]} pos={[w * 0.2, h * 0.42, d / 2 + 0.01]} c={C.cyan} e={C.cyan} ei={0.9} />
      {Array.from({ length: 6 }, (_, i) => <B key={i} s={[(w + 0.16) / 6, 0.06, 0.42]} pos={[-(w + 0.16) / 2 + ((w + 0.16) / 6) * (i + 0.5), h * 0.86, d / 2 + 0.16]} rot={[0.5, 0, 0]} c={i % 2 ? '#f4f1ff' : aw} e={i % 2 ? undefined : aw} ei={0.5} />)}
      <group position={[0, h + 0.24, d / 2 - 0.1]}><Label t={t} tt={tt} p={{ text: sign, w: w * 1.02, h: 0.36, bg: signBg, color: signColor, size: 0.66, weight: 900 }} /></group>
    </group>
  );
};

/** Caja de envío. ret = flecha de devolución arriba (aparece a los `ret` s). */
export const Parcel: React.FC<P> = ({ tt, p }) => {
  const { s = 0.8, ret } = p; const k = ret === undefined ? 0 : pop(tt - ret); const col = C.green;
  return (
    <group>
      <B s={[s, s * 0.8, s]} pos={[0, s * 0.4, 0]} c="#c98d62" />
      <B s={[s * 0.16, s * 0.81, s * 1.01]} pos={[0, s * 0.4, 0]} c="#f2c39b" />
      <B s={[s * 1.01, s * 0.04, s * 0.16]} pos={[0, s * 0.8, 0]} c="#f2c39b" />
      <B s={[s * 0.3, s * 0.2, 0.02]} pos={[s * 0.26, s * 0.24, s / 2 + 0.01]} c="#f4f1ff" />
      {k > 0 && <group position={[0, s * 0.8 + 0.55, 0]} scale={k}>
        <B s={[0.9, 0.13, 0.13]} pos={[0, 0.3, 0]} c={col} e={col} ei={1.3} />
        <B s={[0.13, 0.42, 0.13]} pos={[0.45, 0.14, 0]} c={col} e={col} ei={1.3} />
        <B s={[0.13, 0.3, 0.13]} pos={[-0.45, 0.2, 0]} c={col} e={col} ei={1.3} />
        <mesh position={[-0.45, -0.08, 0]} rotation={[0, 0, Math.PI]}><coneGeometry args={[0.24, 0.34, 4]} /><M c={col} e={col} ei={1.3} /></mesh>
      </group>}
    </group>
  );
};

/** Botón de página web con cursor que hace clic. click = segundo (desde que aparece) del clic. */
export const WebButton: React.FC<P> = ({ t, tt, p }) => {
  const { text = 'BOTÓN', w = 2.6, h = 0.62, bg = C.gold, color = '#1a1030', click = 1 } = p;
  const d = tt - click; const press = d > 0 && d < 0.22 ? 0.93 : 1; const a = eo((tt - (click - 0.7)) / 0.6);
  const cx = 1.5 - a * (1.5 - w * 0.3), cy = -1.0 + a * 0.82;
  return (
    <group>
      <group scale={press}><Label t={t} tt={tt} p={{ text, w, h, bg, color, size: 0.5, weight: 900, depth: 0.14 }} /></group>
      {d > 0 && <mesh position={[0, 0, -0.1]} scale={1 + clamp(d / 0.5) * 0.25}><planeGeometry args={[w + 0.16, h + 0.16]} /><meshBasicMaterial color={bg} transparent opacity={0.55 * (1 - clamp(d / 0.6)) + 0.12} toneMapped={false} /></mesh>}
      <group position={[cx, cy, 0.3]} rotation={[0, 0, 0.5]} scale={press}>
        <mesh position={[0, 0.02, 0]}><coneGeometry args={[0.17, 0.42, 4]} /><meshBasicMaterial color="#fff" toneMapped={false} /></mesh>
        <B s={[0.08, 0.26, 0.05]} pos={[0, -0.3, 0]} c="#fff" e="#fff" ei={1} />
      </group>
    </group>
  );
};

/** Ícono plano: 'bookmark' (guardar) o 'send' (avioncito de enviar). */
export const Icon: React.FC<P> = ({ p }) => {
  const { kind = 'bookmark', size = 1, color = C.gold } = p;
  const tx = useTex((g, W, H) => {
    g.clearRect(0, 0, W, H); g.fillStyle = color; g.strokeStyle = '#15102b'; g.lineWidth = 14; g.lineJoin = 'round'; g.beginPath();
    if (kind === 'bookmark') { g.moveTo(W * 0.24, H * 0.08); g.lineTo(W * 0.76, H * 0.08); g.lineTo(W * 0.76, H * 0.92); g.lineTo(W * 0.5, H * 0.68); g.lineTo(W * 0.24, H * 0.92); }
    else { g.moveTo(W * 0.06, H * 0.42); g.lineTo(W * 0.94, H * 0.1); g.lineTo(W * 0.62, H * 0.92); g.lineTo(W * 0.46, H * 0.58); }
    g.closePath(); g.fill(); g.stroke();
    if (kind !== 'bookmark') { g.beginPath(); g.moveTo(W * 0.46, H * 0.58); g.lineTo(W * 0.94, H * 0.1); g.stroke(); }
  }, 256, 256, kind + color);
  return <mesh><planeGeometry args={[size, size]} /><meshBasicMaterial map={tx} transparent toneMapped={false} /></mesh>;
};

export const EXTRA: Record<string, React.FC<P>> = { tv: Tv, tag: Tag, cart: Cart, lupa: Lupa, chart: Chart, shop: Shop, parcel: Parcel, webbutton: WebButton, icon: Icon };
