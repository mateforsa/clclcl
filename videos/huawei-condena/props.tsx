import React from 'react';
import { M, Label } from '../../src/kit/Props';
import { C, clamp, eo, eio, lerp } from '../../src/kit/math';

type P = { t: number; tt: number; p: any };
type V3 = [number, number, number];
const B: React.FC<{ s: V3; pos?: V3; rot?: V3; c: string; e?: string; ei?: number }> = ({ s, pos, rot, c, e, ei }) => (
  <mesh position={pos} rotation={rot}><boxGeometry args={s} /><M c={c} e={e} ei={ei} /></mesh>
);

/** Mazo de juez sobre su base. hits = instantes (tt) en que golpea. raised = queda levantado, sin golpear. */
export const Gavel: React.FC<P> = ({ tt, p }) => {
  const { hits = [0.5], raised = false, color = '#8a5a3a', trim = C.gold } = p;
  const UP = 1.0; let a = UP + Math.sin(tt * 2.2) * 0.06; let flash = 0;
  if (!raised) for (const h of hits as number[]) {
    const d = tt - h;
    if (d >= -0.16 && d < 0) a = lerp(UP, 0, eio((d + 0.16) / 0.16));
    else if (d >= 0 && d < 0.5) { a = lerp(0, UP, eo((d - 0.12) / 0.38)) * (d < 0.12 ? 0 : 1); flash = Math.max(flash, 1 - d / 0.3); }
  }
  return (
    <group>
      {/* base */}
      <mesh position={[0.62, 0.09, 0]}><cylinderGeometry args={[0.5, 0.56, 0.18, 8]} /><M c="#5c3a26" /></mesh>
      <mesh position={[0.62, 0.2, 0]}><cylinderGeometry args={[0.4, 0.4, 0.06, 8]} /><M c={trim} e={trim} ei={0.4 + flash * 2.5} /></mesh>
      {flash > 0 && <mesh position={[0.62, 0.24, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={1 + (1 - flash) * 1.6}><ringGeometry args={[0.5, 0.58, 20]} /><meshBasicMaterial color="#fff" transparent opacity={flash} toneMapped={false} /></mesh>}
      {/* mazo: pivota en el extremo del mango */}
      <group position={[-0.75, 0.55, 0]} rotation={[0, 0, a]}>
        <B s={[1.4, 0.11, 0.11]} pos={[0.6, 0, 0]} c={color} />
        <group position={[1.37, 0, 0]}>
          <mesh><cylinderGeometry args={[0.24, 0.24, 0.62, 8]} /><M c={color} /></mesh>
          <mesh position={[0, 0.27, 0]}><cylinderGeometry args={[0.26, 0.26, 0.09, 8]} /><M c={trim} e={trim} ei={0.5} /></mesh>
          <mesh position={[0, -0.27, 0]}><cylinderGeometry args={[0.26, 0.26, 0.09, 8]} /><M c={trim} e={trim} ei={0.5} /></mesh>
        </group>
      </group>
    </group>
  );
};

/** Tribunal / banco: escalones, columnas, frontón y cartel. */
export const Court: React.FC<P> = ({ t, tt, p }) => {
  const { sign = 'TRIBUNAL', w = 3.0, h = 2.0, color = '#d9d3f0', signBg = '#15102b', signColor = C.gold } = p;
  const n = 5;
  return (
    <group>
      <B s={[w + 0.5, 0.16, 1.5]} pos={[0, 0.08, 0.1]} c="#a79fd0" />
      <B s={[w + 0.2, 0.16, 1.3]} pos={[0, 0.24, 0]} c="#bdb5e2" />
      <B s={[w - 0.2, h, 0.7]} pos={[0, 0.32 + h / 2, -0.3]} c="#3b2f7a" />
      {Array.from({ length: n }, (_, i) => (
        <mesh key={i} position={[-w / 2 + 0.25 + (i * (w - 0.5)) / (n - 1), 0.32 + h / 2, 0.3]}><cylinderGeometry args={[0.13, 0.15, h, 8]} /><M c={color} /></mesh>
      ))}
      <B s={[w + 0.1, 0.22, 1.2]} pos={[0, 0.43 + h, 0]} c={color} />
      <group position={[0, 0.54 + h, 0]} scale={[1, 1, 0.5]}><mesh position={[0, 0.3, 0]} rotation={[0, Math.PI / 4, 0]}><coneGeometry args={[w * 0.72, 0.6, 4]} /><M c="#bdb5e2" /></mesh></group>
      <group position={[0, 0.43 + h, 0.62]}><Label t={t} tt={tt} p={{ text: sign, w: w * 0.9, h: 0.34, bg: signBg, color: signColor, size: 0.66, weight: 800, depth: 0.03 }} /></group>
    </group>
  );
};

/** Celular grande con barras de señal y apps. from/to = barras (0-4), at = tt del cambio. appsOut / appsIn = tt en que las apps se van / vuelven. */
export const SigPhone: React.FC<P> = ({ t, tt, p }) => {
  const { from = 4, to = 4, at = 0.5, dur = 0.8, appsOut, appsIn, apps = true, color = '#15102b', text } = p;
  const lvl = lerp(from, to, clamp((tt - at) / dur));
  const cols = ['#ff7a3d', C.blue, C.green, C.gold, C.magenta, C.cyan];
  const appK = (i: number) => {
    if (!apps) return appsIn !== undefined ? eo((tt - appsIn - i * 0.08) / 0.25) : 0;
    if (appsOut !== undefined) return 1 - eo((tt - appsOut - i * 0.1) / 0.25);
    return 1;
  };
  return (
    <group>
      <B s={[1.2, 2.3, 0.12]} c={color} />
      <B s={[1.06, 2.1, 0.02]} pos={[0, 0, 0.065]} c="#1d1650" e="#2a1f7a" ei={0.6} />
      <B s={[0.3, 0.05, 0.02]} pos={[0, 0.98, 0.08]} c="#0b0820" />
      {/* barras de señal */}
      {Array.from({ length: 4 }, (_, i) => { const on = lvl > i + 0.5; const h = 0.12 + i * 0.09; const col = on ? (lvl < 1.6 ? C.red : C.green) : '#3b2f7a';
        return <B key={i} s={[0.1, h, 0.03]} pos={[-0.4 + i * 0.14, 0.62 + h / 2, 0.085]} c={col} e={on ? col : undefined} ei={1.6} />; })}
      {lvl < 0.5 && <group position={[0.2, 0.75, 0.09]}><B s={[0.3, 0.06, 0.02]} rot={[0, 0, Math.PI / 4]} c={C.red} e={C.red} ei={2} /><B s={[0.3, 0.06, 0.02]} rot={[0, 0, -Math.PI / 4]} c={C.red} e={C.red} ei={2} /></group>}
      {/* apps */}
      {Array.from({ length: 6 }, (_, i) => { const k = clamp(appK(i)); if (k <= 0.01) return null;
        return <group key={i} position={[-0.3 + (i % 3) * 0.3, 0.25 - Math.floor(i / 3) * 0.34, 0.085]} scale={k}><B s={[0.22, 0.22, 0.03]} c={cols[i]} e={cols[i]} ei={0.7} /></group>; })}
      {text && <group position={[0, -0.55, 0.085]}><Label t={t} tt={tt} p={{ text, w: 0.96, h: 0.3, size: 0.62, weight: 900, color: '#fff' }} /></group>}
    </group>
  );
};

/** Chip acostado sobre el plano XZ (usar rot para pararlo). */
export const Chip: React.FC<P> = ({ t, p }) => {
  const { color = '#1f6b3f', core = C.green } = p; const pu = 0.9 + Math.sin(t * 4) * 0.5;
  return (
    <group>
      <B s={[1, 0.12, 1]} c={color} />
      <B s={[0.52, 0.16, 0.52]} c="#15102b" />
      <B s={[0.34, 0.18, 0.34]} c={core} e={core} ei={pu} />
      {Array.from({ length: 5 }, (_, i) => { const o = -0.4 + i * 0.2; return <group key={i}>
        <B s={[0.07, 0.06, 0.16]} pos={[o, 0, 0.56]} c={C.gold} e={C.gold} ei={0.5} /><B s={[0.07, 0.06, 0.16]} pos={[o, 0, -0.56]} c={C.gold} e={C.gold} ei={0.5} />
        <B s={[0.16, 0.06, 0.07]} pos={[0.56, 0, o]} c={C.gold} e={C.gold} ei={0.5} /><B s={[0.16, 0.06, 0.07]} pos={[-0.56, 0, o]} c={C.gold} e={C.gold} ei={0.5} /></group>; })}
    </group>
  );
};

/** Avión visto de costado (nariz hacia +x). */
export const Plane: React.FC<P> = ({ p }) => {
  const { color = C.cyan, body = '#f4f1ff' } = p;
  return (
    <group rotation={[0, Math.PI / 2, 0]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.24, 0.24, 2.0, 8]} /><M c={body} /></mesh>
      <mesh position={[0, 0, 1.25]} rotation={[Math.PI / 2, 0, 0]}><coneGeometry args={[0.24, 0.5, 8]} /><M c={body} /></mesh>
      <mesh position={[0, 0.06, -1.2]} rotation={[-Math.PI / 2, 0, 0]}><coneGeometry args={[0.24, 0.5, 8]} /><M c={body} /></mesh>
      <B s={[2.5, 0.07, 0.5]} pos={[0, -0.05, 0.05]} c={color} e={color} ei={0.4} />
      <B s={[0.95, 0.06, 0.3]} pos={[0, 0.08, -1.05]} c={color} e={color} ei={0.4} />
      <B s={[0.07, 0.55, 0.42]} pos={[0, 0.36, -1.05]} c={color} e={color} ei={0.4} />
      {[-0.6, 0.6].map((x) => <mesh key={x} position={[x, -0.2, 0.15]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.11, 0.11, 0.4, 8]} /><M c="#8d8aa0" /></mesh>)}
    </group>
  );
};

/** Robot que prueba celulares: base, celular acostado y un brazo que lo toca. */
export const Robot: React.FC<P> = ({ t }) => {
  const tap = Math.max(0, Math.sin(t * 7)); const sx = Math.sin(t * 1.6) * 0.18;
  return (
    <group>
      <B s={[1.7, 0.16, 1.2]} pos={[0, 0.08, 0]} c="#2b2740" />
      <B s={[0.5, 0.05, 0.9]} pos={[0, 0.19, 0.05]} rot={[0, 0.0, 0]} c="#15102b" />
      <B s={[0.42, 0.02, 0.8]} pos={[0, 0.22, 0.05]} c={C.cyan} e={C.cyan} ei={0.8} />
      <B s={[0.16, 1.5, 0.16]} pos={[-0.7, 0.9, -0.45]} c="#8d8aa0" />
      <B s={[0.16, 1.5, 0.16]} pos={[0.7, 0.9, -0.45]} c="#8d8aa0" />
      <B s={[1.6, 0.16, 0.16]} pos={[0, 1.6, -0.45]} c="#c9c4de" />
      <group position={[sx, 1.6, -0.45]}>
        <B s={[0.3, 0.26, 0.6]} pos={[0, 0, 0.25]} c={C.magenta} e={C.magenta} ei={0.5} />
        <B s={[0.08, 1.05, 0.08]} pos={[0, -0.6 + tap * 0.22, 0.5]} c="#f4f1ff" />
        <mesh position={[0, -1.14 + tap * 0.22, 0.5]}><sphereGeometry args={[0.08, 8, 6]} /><M c={C.gold} e={C.gold} ei={1.2} /></mesh>
      </group>
    </group>
  );
};

/** Hoja / expediente parado. title = encabezado. */
export const Doc: React.FC<P> = ({ t, tt, p }) => {
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

/** Antena de red con ondas. */
export const Tower: React.FC<P> = ({ t, p }) => {
  const { color = C.cyan, h = 2.6 } = p;
  return (
    <group>
      <mesh position={[0, h / 2, 0]}><cylinderGeometry args={[0.05, 0.28, h, 4]} /><M c="#c9c4de" /></mesh>
      {[0.3, 0.55, 0.8].map((f) => <B key={f} s={[0.5 * (1.1 - f), 0.05, 0.05]} pos={[0, h * f, 0]} c="#8d8aa0" />)}
      <mesh position={[0, h + 0.08, 0]}><sphereGeometry args={[0.1, 8, 6]} /><M c={color} e={color} ei={2} /></mesh>
      {[0, 1, 2].map((i) => { const k = ((t * 0.9 + i / 3) % 1); return (
        <mesh key={i} position={[0, h + 0.08, 0]} scale={0.3 + k * 1.3}><torusGeometry args={[0.5, 0.025, 4, 20]} /><meshBasicMaterial color={color} transparent opacity={1 - k} toneMapped={false} /></mesh>); })}
    </group>
  );
};

/** Estrado del jurado: 12 asientos en dos filas con un check o cruz encima (ver beats). Solo la baranda. */
export const JuryBox: React.FC<P> = ({ p }) => {
  const { w = 3.2 } = p;
  return (
    <group>
      <B s={[w, 0.7, 0.12]} pos={[0, 0.35, 0.55]} c="#8a5a3a" />
      <B s={[w + 0.1, 0.08, 0.2]} pos={[0, 0.72, 0.55]} c="#5c3a26" />
      <B s={[w, 0.3, 0.9]} pos={[0, 0.15, -0.55]} c="#5c3a26" />
    </group>
  );
};

/** Fila de casilleros: n cargos, los primeros `ok` se marcan en rojo (culpable) de a uno, el resto en verde. step = s entre marcas. */
export const Counts: React.FC<P> = ({ tt, p }) => {
  const { n = 12, bad = 10, cols = 6, step = 0.25, start = 0.3, size = 0.42, goodAt } = p;
  const rows = Math.ceil(n / cols); const g = size * 1.22;
  return (
    <group>
      {Array.from({ length: n }, (_, i) => { const x = ((i % cols) - (cols - 1) / 2) * g, y = ((rows - 1) / 2 - Math.floor(i / cols)) * g;
        const isBad = i < bad; const k = isBad ? clamp((tt - start - i * step) / 0.15) : goodAt === undefined ? 0 : clamp((tt - goodAt - (i - bad) * 0.35) / 0.15); const lit = k > 0;
        const col = lit ? (isBad ? C.red : C.green) : '#3b2f7a';
        return <group key={i} position={[x, y, 0]} scale={1 + (lit ? (1 - k) * 0.35 : 0)}><B s={[size, size, 0.1]} c={col} e={lit ? col : undefined} ei={1.2} /></group>; })}
    </group>
  );
};

export const EXTRA = { gavel: Gavel, court: Court, sigphone: SigPhone, chip: Chip, plane: Plane, robot: Robot, doc: Doc, tower: Tower, jurybox: JuryBox, counts: Counts };
