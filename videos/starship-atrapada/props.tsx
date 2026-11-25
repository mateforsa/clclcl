import React from 'react';
import { M, Globe } from '../../src/kit/Props';
import { C, clamp, eo, eio, lerp, rnd } from '../../src/kit/math';

type P = { t: number; tt: number; p: any };
type V3 = [number, number, number];
const STEEL = '#dcdaea', DARK = '#1c1832', PI = Math.PI;
const B: React.FC<{ s: V3; pos?: V3; rot?: V3; c: string; e?: string; ei?: number }> = ({ s, pos, rot, c, e, ei }) => (
  <mesh position={pos} rotation={rot}><boxGeometry args={s} /><M c={c} e={e} ei={ei} /></mesh>
);

/** llama del motor: nace en y=0 y apunta hacia -y */
const Flame: React.FC<{ t: number; r?: number; len?: number }> = ({ t, r = 0.16, len = 0.9 }) => {
  const l = len * (0.82 + 0.18 * Math.sin(t * 41) * Math.sin(t * 17 + 1));
  return (
    <group>
      <mesh position={[0, -l / 2, 0]} rotation={[PI, 0, 0]}><coneGeometry args={[r, l, 8]} /><meshBasicMaterial color="#ff8a1e" toneMapped={false} /></mesh>
      <mesh position={[0, -l * 0.3, 0]} rotation={[PI, 0, 0]}><coneGeometry args={[r * 0.55, l * 0.6, 8]} /><meshBasicMaterial color="#fff3b0" toneMapped={false} /></mesh>
    </group>
  );
};
const flameOn = (p: any, tt: number) => p.flame !== undefined && p.flame !== false && tt >= (p.flame === true ? 0 : p.flame) && (p.flameOff === undefined || tt < p.flameOff);

/** Nave (etapa superior). Largo 2. Origen en la base; con center/horiz/flipAt el origen es el centro. */
const Ship: React.FC<P> = ({ t, tt, p }) => {
  const L = 2, R = 0.2, body = 1.45;
  const flip = p.flipAt !== undefined; const k = flip ? eio((tt - p.flipAt) / (p.flipDur ?? 0.8)) : 0;
  const rz = flip ? lerp(PI / 2, 0, k) : p.horiz ? PI / 2 : 0;
  const roll = flip ? lerp(p.roll ?? 0, 0, k) : (p.roll ?? 0);
  const centered = flip || p.horiz || p.center;
  const pl = p.plasma !== undefined ? clamp((tt - p.plasma) / 0.6) : 0;
  return (
    <group rotation={[0, 0, rz]}>
      <group position={[0, centered ? -L / 2 : 0, 0]} rotation={[0, roll, 0]}>
        <mesh position={[0, body / 2, 0]}><cylinderGeometry args={[R, R, body, 12]} /><M c={STEEL} e="#7f7aa6" ei={0.35} /></mesh>
        <mesh position={[0, body / 2, 0]}><cylinderGeometry args={[R + 0.006, R + 0.006, body, 12, 1, true, PI / 2, PI]} /><M c={DARK} /></mesh>
        <mesh position={[0, body + 0.275, 0]}><coneGeometry args={[R, 0.55, 12]} /><M c={STEEL} e="#7f7aa6" ei={0.35} /></mesh>
        <mesh position={[0, body + 0.275, 0]}><coneGeometry args={[R + 0.006, 0.555, 12, 1, true, PI / 2, PI]} /><M c={DARK} /></mesh>
        {[-1, 1].map((sd) => <B key={'a' + sd} s={[0.2, 0.46, 0.05]} pos={[sd * 0.29, 0.3, -0.03]} c={DARK} />)}
        {[-1, 1].map((sd) => <B key={'f' + sd} s={[0.15, 0.32, 0.05]} pos={[sd * 0.23, body - 0.02, -0.03]} rot={[0, 0, sd * 0.12]} c={DARK} />)}
        <mesh position={[0, 0.02, 0]}><cylinderGeometry args={[R * 0.86, R * 0.86, 0.06, 10]} /><M c="#0d0a1c" /></mesh>
        {flameOn(p, tt) && <Flame t={t} r={0.15} len={p.flameLen ?? 0.8} />}
        {pl > 0 && <group position={[0, L / 2, -0.12]} scale={pl * (1 + 0.06 * Math.sin(t * 30))}>
          <mesh scale={[0.5, 1.3, 0.42]}><icosahedronGeometry args={[1, 1]} /><meshBasicMaterial color="#ff5a1e" transparent opacity={0.42} toneMapped={false} depthWrite={false} /></mesh>
          <mesh position={[0, 0, -0.16]} scale={[0.34, 1.12, 0.22]}><icosahedronGeometry args={[1, 1]} /><meshBasicMaterial color="#ffd36b" transparent opacity={0.6} toneMapped={false} depthWrite={false} /></mesh>
        </group>}
      </group>
    </group>
  );
};

/** Propulsor (primera etapa). Largo 2.8. Origen en la base, o en el centro con center. */
const Booster: React.FC<P> = ({ t, tt, p }) => {
  const L = 2.8, R = 0.2;
  return (
    <group position={[0, p.center ? -L / 2 : 0, 0]}>
      <mesh position={[0, L / 2, 0]}><cylinderGeometry args={[R, R, L, 12]} /><M c={STEEL} e="#7f7aa6" ei={0.35} /></mesh>
      <mesh position={[0, L - 0.06, 0]}><cylinderGeometry args={[R + 0.012, R + 0.012, 0.12, 12]} /><M c={DARK} /></mesh>
      <mesh position={[0, 0.12, 0]}><cylinderGeometry args={[R + 0.012, R + 0.012, 0.24, 12]} /><M c={DARK} /></mesh>
      {[[1, 0], [-1, 0], [0, 1], [0, -1]].map(([x, z], i) => <B key={i} s={[x ? 0.22 : 0.05, 0.2, z ? 0.22 : 0.05]} pos={[x * 0.3, L - 0.28, z * 0.3]} c="#8d8aa0" />)}
      {[0.8, 1.5, 2.1].map((y) => <mesh key={y} position={[0, y, 0]}><cylinderGeometry args={[R + 0.004, R + 0.004, 0.02, 12]} /><M c="#8d8aa0" /></mesh>)}
      {flameOn(p, tt) && <Flame t={t} r={0.19} len={p.flameLen ?? 1.0} />}
    </group>
  );
};

/** Torre de lanzamiento con dos brazos. Los brazos salen hacia +x. close = segundo (tt) en que se cierran; closed = cerrados. */
const Tower: React.FC<P> = ({ tt, p }) => {
  const { H = 3.4, armY = 2.2, len = 1.3, armColor = C.gold } = p;
  const k = p.closed ? 1 : p.close !== undefined ? eo((tt - p.close) / 0.3) : 0; const a = 0.55 * (1 - k);
  return (
    <group>
      <B s={[0.42, H, 0.42]} pos={[0, H / 2, 0]} c="#2d1a6e" />
      {Array.from({ length: Math.floor(H / 0.4) }, (_, i) => <B key={i} s={[0.45, 0.035, 0.45]} pos={[0, 0.3 + i * 0.4, 0]} c={C.cyan} e={C.cyan} ei={0.7} />)}
      <B s={[0.3, 0.16, 0.3]} pos={[0, H + 0.08, 0]} c="#15102b" /><B s={[0.05, 0.4, 0.05]} pos={[0, H + 0.34, 0]} c={C.red} e={C.red} ei={2} />
      <B s={[1.9, 0.08, 1.1]} pos={[0.6, 0.04, 0]} c="#241659" />
      <B s={[0.2, 0.3, 0.7]} pos={[0.26, armY, 0]} c="#15102b" />
      {[1, -1].map((sd) => (
        <group key={sd} position={[0.3, armY, sd * 0.27]} rotation={[0, -sd * a, 0]}>
          <B s={[len, 0.13, 0.1]} pos={[len / 2, 0, 0]} c={armColor} e={armColor} ei={0.7} />
          <B s={[0.12, 0.2, 0.12]} pos={[len, 0, 0]} c="#fff3c4" e="#fff3c4" ei={1} />
        </group>))}
    </group>
  );
};

/** Tierra con anillo de órbita y una nave dando vueltas. */
const Orbit: React.FC<P> = ({ t, tt, p }) => {
  const { R = 1, k = 1.45, speed = 3.2 } = p; const a = tt * speed; const r = R * k;
  return (
    <group>
      <group scale={R}><Globe t={t} tt={tt} p={{}} /></group>
      <group rotation={[1.2, 0, 0.35]}>
        <mesh><torusGeometry args={[r, 0.022, 6, 48]} /><meshBasicMaterial color={C.cyan} toneMapped={false} /></mesh>
        <group position={[Math.cos(a) * r, Math.sin(a) * r, 0]} rotation={[0, 0, a]}>
          <mesh><cylinderGeometry args={[0.07, 0.07, 0.3, 8]} /><meshBasicMaterial color="#ffffff" toneMapped={false} /></mesh>
          <mesh position={[0, 0.22, 0]}><coneGeometry args={[0.07, 0.16, 8]} /><meshBasicMaterial color="#ffffff" toneMapped={false} /></mesh>
          <mesh position={[0, -0.26, 0]} rotation={[PI, 0, 0]}><coneGeometry args={[0.06, 0.24, 6]} /><meshBasicMaterial color="#ff8a1e" toneMapped={false} /></mesh>
        </group>
      </group>
    </group>
  );
};

/** Líneas de velocidad: rayas que suben (la cosa cae). */
const Streaks: React.FC<P> = ({ t, p }) => {
  const { n = 10, w = 2, h = 2.6, speed = 5, color = '#ffffff', seed = 3 } = p;
  const pts = React.useMemo(() => { const r = rnd(seed); return Array.from({ length: n }, () => [r() - 0.5, r(), r() - 0.5, 0.25 + r() * 0.45]); }, [n, seed]);
  return (<group>{pts.map(([x, y0, z, l], i) => { const y = ((y0 + (t * speed) / h) % 1) * h - h / 2; const f = 1 - Math.abs(y / (h / 2));
    return <mesh key={i} position={[x * w, y, z * 0.6]}><boxGeometry args={[0.025, l, 0.025]} /><meshBasicMaterial color={color} transparent opacity={0.75 * f} toneMapped={false} /></mesh>; })}</group>);
};

/** Mar: placa azul con olas que se mueven. */
const Sea: React.FC<P> = ({ t, p }) => {
  const { w = 2, d = 1.6 } = p;
  return (
    <group>
      <B s={[w, 0.14, d]} pos={[0, 0, 0]} c="#1d4fd6" e="#1238a8" ei={0.8} />
      {Array.from({ length: 5 }, (_, i) => { const z = -d / 2 + ((i + 0.5) / 5) * d; const x = Math.sin(t * 1.6 + i * 1.9) * w * 0.12;
        return <B key={i} s={[w * 0.5, 0.03, 0.05]} pos={[x, 0.085, z]} c="#9fd0ff" e="#9fd0ff" ei={0.9} />; })}
    </group>
  );
};

/** Explosión: bolas que se abren y quedan humeando. */
const Boom: React.FC<P> = ({ t, tt, p }) => {
  const { r = 0.9, seed = 5, colors = ['#ff8a1e', '#ffd36b', '#ff3b4e', '#fff3b0'] } = p;
  const pts = React.useMemo(() => { const q = rnd(seed); return Array.from({ length: 11 }, () => [q() - 0.5, q() - 0.3, q() - 0.5, 0.18 + q() * 0.26]); }, [seed]);
  if (tt < 0) return null; const k = eo(tt / 0.45); const fade = lerp(1, 0.6, clamp((tt - 0.5) / 1.2));
  return (<group>{pts.map(([x, y, z, s], i) => (
    <mesh key={i} position={[x * 2 * r * k, y * 2 * r * k + tt * 0.08, z * r * k]} scale={s * (0.4 + k) * fade * (1 + 0.08 * Math.sin(t * 12 + i))} rotation={[i, tt * 0.6 + i, 0]}>
      <icosahedronGeometry args={[1, 0]} /><meshBasicMaterial color={colors[i % colors.length]} toneMapped={false} /></mesh>))}</group>);
};

export const EXTRA = { ship: Ship, booster: Booster, tower: Tower, orbit: Orbit, streaks: Streaks, sea: Sea, boom: Boom };
