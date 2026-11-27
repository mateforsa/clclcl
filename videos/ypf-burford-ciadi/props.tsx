import React from 'react';
import * as THREE from 'three';
import { M, Label, useTex } from '../../src/kit/Props';
import { C, clamp, eio, eo, lerp, rnd } from '../../src/kit/math';

type P = { t: number; tt: number; p: any };
type V3 = [number, number, number];
const B: React.FC<{ s: V3; pos?: V3; rot?: V3; c: string; e?: string; ei?: number }> = ({ s, pos, rot, c, e, ei }) => (
  <mesh position={pos} rotation={rot}><boxGeometry args={s} /><M c={c} e={e} ei={ei} /></mesh>
);
const BILL = '#3aa860';

/** Texto plano sobre un panel oscuro: el texto va 2 cm delante de la cara del panel. Origen en el centro del panel. */
export const Panel: React.FC<P> = ({ t, tt, p }) => {
  const { text = '', w = 1.4, h = 0.4, color = '#fff', bg = '#15102b', size = 0.6, weight = 800, border, sub, subColor } = p;
  return (<group>
    <B s={[w, h, 0.05]} pos={[0, 0, -0.025]} c={bg} e={border} ei={border ? 0.25 : 0} />
    <group position={[0, 0, 0.02]}><Label t={t} tt={tt} p={{ text, w: w * 0.96, h: h * 0.9, size, color, weight, sub, subColor }} /></group>
  </group>);
};

/** Fajo genérico (sin diseño de ningún billete). Origen en el centro. */
const Fajo: React.FC<{ pos?: V3 }> = ({ pos }) => (
  <group position={pos}><B s={[0.3, 0.1, 0.17]} c={BILL} e={BILL} ei={0.25} /><B s={[0.06, 0.104, 0.175]} c="#bfe8c4" /></group>
);
/** Pila de fajos: 2 por capa. Origen en la base de la pila (centro). */
const Pila: React.FC<{ n: number }> = ({ n }) => (
  <group>{Array.from({ length: n }, (_, i) => { const l = Math.floor(i / 2), j = i % 2;
    return <Fajo key={i} pos={[(l % 2) * 0.02 - 0.01, 0.05 + l * 0.105, j === 0 ? -0.09 : 0.09]} />; })}</group>
);

/** Balanza de dos platillos (tipo Roberval: los platillos quedan siempre horizontales, sin cadenas).
 *  La pila va en el platillo derecho (+x). Origen en el piso.
 *  p: n (fajos al final), from (fajos al inicio), grow (seg. en que empieza a crecer), dur,
 *     fall (seg. en que la pila se vuelca hacia adelante y cae al piso), max (inclinación con la pila completa) */
export const Balanza: React.FC<P> = ({ tt, p }) => {
  const { n = 12, from, grow = 0, dur = 1.0, fall, max = 0.16, ref = 12, metal = '#c9b98a' } = p;
  const f0 = from ?? n;
  const vis = Math.round(lerp(f0, n, eo((tt - grow) / Math.max(dur, 0.01))));
  const fallen = fall !== undefined && tt >= fall; const ft = fall !== undefined ? tt - fall : -1;
  // inclinación: con la pila, el lado derecho baja; si la pila ya cayó, vuelve a nivel
  const w = fallen ? Math.max(0, 1 - eo((ft - 0.5) / 0.45)) * (vis / ref) : vis / ref;
  const a = max * clamp(w, 0, 1.2);
  const PX = 0.62, PIV = 1.2, POST = 0.26; const dy = PX * Math.sin(a);
  const panR = (side: number) => PIV + POST + (side > 0 ? -dy : dy); // altura del platillo
  const panTopR = panR(1) + 0.025;
  // pila que se vuelca: gira sobre su borde delantero y cae
  let pile: React.ReactNode = null;
  if (vis > 0) {
    if (!fallen) pile = <group position={[PX, panTopR, 0]}><Pila n={vis} /></group>;
    else {
      const ang = (Math.PI / 2) * eio(ft / 0.35); const zs = 0.32 * eo((ft - 0.22) / 0.2);
      const yk = clamp((ft - 0.42) / 0.3); const y = lerp(panTopR, 0, yk * yk);
      pile = <group position={[PX, y, 0.18 + zs]} rotation={[ang, 0, 0]}><group position={[0, 0, -0.18]}><Pila n={vis} /></group></group>;
    }
  }
  return (
    <group>
      <B s={[0.8, 0.08, 0.5]} pos={[0, 0.04, 0]} c="#2d1a6e" />
      <B s={[0.1, PIV - 0.08, 0.1]} pos={[0, 0.08 + (PIV - 0.08) / 2, 0]} c={metal} />
      <mesh position={[0, PIV, 0.07]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.07, 0.07, 0.04, 12]} /><M c={C.gold} e={C.gold} ei={0.4} /></mesh>
      <group position={[0, PIV, 0]} rotation={[0, 0, -a]}><B s={[1.42, 0.07, 0.07]} c={metal} /></group>
      {[-1, 1].map((sd) => { const y = panR(sd);
        return <group key={sd}>
          <B s={[0.05, POST, 0.05]} pos={[sd * PX, y - POST / 2, 0]} c={metal} />
          <mesh position={[sd * PX, y, 0]}><cylinderGeometry args={[0.36, 0.3, 0.05, 16]} /><M c={metal} e={C.gold} ei={0.15} /></mesh>
        </group>; })}
      {pile}
    </group>
  );
};

/** Mazo de juez sobre su base. Origen en la base. p: hit (seg. del golpe), color */
export const Mazo: React.FC<P> = ({ tt, p }) => {
  const { hit = 1, color = '#8a5a3a' } = p;
  const L = 0.6, PY = 0.2;
  let a = 0.8;
  if (tt >= hit - 0.22) a = lerp(0.8, 0, clamp((tt - (hit - 0.22)) / 0.22) ** 2);
  if (tt >= hit) { const k = tt - hit; a = k < 0.24 ? 0.14 * Math.sin((k / 0.24) * Math.PI) : 0; }
  return (
    <group>
      <mesh position={[0, 0.05, 0]}><cylinderGeometry args={[0.26, 0.28, 0.1, 16]} /><M c="#5c3a26" /></mesh>
      <group position={[L, PY, 0]} rotation={[0, 0, -a]}>
        <mesh position={[-L / 2 - 0.02, 0, 0]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.03, 0.035, L - 0.06, 8]} /><M c={color} /></mesh>
        <mesh position={[-L, 0, 0]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.1, 0.1, 0.34, 12]} /><M c={color} /></mesh>
        {[-0.13, 0.13].map((z) => <mesh key={z} position={[-L, 0, z]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.105, 0.105, 0.03, 12]} /><M c={C.gold} e={C.gold} ei={0.3} /></mesh>)}
      </group>
    </group>
  );
};

/** Edificio genérico (sin logos) con cartel en la fachada. Origen en el piso.
 *  p: w, h, d, color, seed, sign, signColor, cols (columnas al frente) */
export const Edificio: React.FC<P> = ({ t, tt, p }) => {
  const { w = 1.6, h = 2.2, d = 1.0, color = '#241659', seed = 3, sign, signColor = C.gold, cols = 0, signW, signSize = 0.6, signSub } = p;
  const tx = useTex((g, W, H) => {
    g.fillStyle = color; g.fillRect(0, 0, W, H); const r = rnd(seed); const nc = 5, nr = Math.max(3, Math.round((h / w) * 5));
    const cw = W / nc, rh = H / nr; const pal = ['#6a5bd6', '#3fa7a3', '#b08a3a', '#8a6bff'];
    for (let y = 1; y < nr; y++) for (let x = 0; x < nc; x++) if (r() > 0.35) { g.fillStyle = pal[Math.floor(r() * pal.length)]; g.fillRect(x * cw + cw * 0.25, y * rh + rh * 0.25, cw * 0.5, rh * 0.5); }
  }, 128, 256, 'ed' + w + h + color + seed);
  const sh = signSub ? 0.6 : 0.42; const sy = h - sh / 2 - 0.12;
  return (
    <group>
      <mesh position={[0, h / 2, 0]}><boxGeometry args={[w, h, d]} /><meshStandardMaterial map={tx} emissiveMap={tx} emissive="#fff" emissiveIntensity={0.45} flatShading /></mesh>
      <B s={[w + 0.12, 0.08, d + 0.12]} pos={[0, h + 0.04, 0]} c="#15102b" />
      <B s={[w + 0.2, 0.1, d + 0.3]} pos={[0, 0.05, 0.08]} c="#2d1a6e" />
      {cols > 0 && Array.from({ length: cols }, (_, i) => (
        <mesh key={i} position={[lerp(-w / 2 + 0.16, w / 2 - 0.16, cols === 1 ? 0.5 : i / (cols - 1)), (h - 0.55) / 2 + 0.1, d / 2 + 0.16]}>
          <cylinderGeometry args={[0.07, 0.08, h - 0.65, 8]} /><M c="#cfc8ff" e="#cfc8ff" ei={0.08} /></mesh>))}
      {cols > 0 && <B s={[w + 0.1, 0.12, 0.34]} pos={[0, h - 0.5, d / 2 + 0.12]} c="#cfc8ff" />}
      {sign && <group position={[0, sy, d / 2 + (cols > 0 ? 0.36 : 0.05)]}>
        <Panel t={t} tt={tt} p={{ text: sign, w: signW ?? w * 0.92, h: sh, size: signSize, color: signColor, bg: '#15102b', weight: 900, sub: signSub, subColor: '#fff' }} />
      </group>}
    </group>
  );
};

/** Hoja de papel parada con título y renglones (título 2 cm delante del papel). Origen en el centro. p: text, w, h, paper, color */
export const Papel: React.FC<P> = ({ t, tt, p }) => {
  const { text = '', w = 0.8, h = 1.0, paper = '#d9d2f2', color = '#1a1030', size = 0.62 } = p;
  return (
    <group>
      <B s={[w, h, 0.03]} c={paper} />
      <group position={[0, h * 0.3, 0.035]}><Label t={t} tt={tt} p={{ text, w: w * 0.9, h: h * 0.22, size, color, weight: 900 }} /></group>
      {Array.from({ length: 4 }, (_, i) => <B key={i} s={[w * (i === 3 ? 0.45 : 0.72), 0.03, 0.01]} pos={[i === 3 ? -w * 0.13 : 0, h * 0.02 - i * h * 0.13, 0.02]} c="#8d86b0" />)}
    </group>
  );
};

/** Sobre cerrado con texto (2 cm delante). Origen en el centro. */
export const Sobre: React.FC<P> = ({ t, tt, p }) => {
  const { text = '', w = 0.9, h = 0.55, color = '#f4f1ff' } = p;
  return (
    <group>
      <B s={[w, h, 0.04]} c={color} />
      {[-1, 1].map((sd) => <B key={sd} s={[w * 0.56, 0.025, 0.01]} pos={[sd * w * 0.24, h * 0.3, 0.025]} rot={[0, 0, sd * 0.5]} c="#9d95c8" />)}
      <group position={[0, -h * 0.18, 0.042]}><Label t={t} tt={tt} p={{ text, w: w * 0.9, h: h * 0.34, size: 0.7, color: '#1a1030', weight: 900 }} /></group>
    </group>
  );
};

/** Silla vacía. Origen en el piso, respaldo hacia -z. p: color, label (texto en el respaldo) */
export const Silla: React.FC<P> = ({ t, tt, p }) => {
  const { color = '#3b4a8a', label } = p;
  return (
    <group>
      {[[-0.22, -0.22], [0.22, -0.22], [-0.22, 0.22], [0.22, 0.22]].map(([x, z], i) => <B key={i} s={[0.06, 0.5, 0.06]} pos={[x, 0.25, z]} c="#15102b" />)}
      <B s={[0.56, 0.08, 0.56]} pos={[0, 0.54, 0]} c={color} />
      <B s={[0.56, 0.8, 0.08]} pos={[0, 0.98, -0.26]} c={color} />
      {label && <group position={[0, 1.08, -0.17]}><Panel t={t} tt={tt} p={{ text: label, w: 0.52, h: 0.18, size: 0.62, color: C.gold }} /></group>}
    </group>
  );
};

/** Bomba de petróleo genérica (balancín). Origen en el piso. */
export const Bomba: React.FC<P> = ({ t }) => {
  const a = Math.sin(t * 2.2) * 0.22; const col = '#ff7a3d';
  return (
    <group>
      <B s={[1.9, 0.12, 0.6]} pos={[0, 0.06, 0]} c="#2d1a6e" />
      {[-0.2, 0.2].map((z) => <group key={z}>
        <B s={[0.08, 1.25, 0.08]} pos={[-0.18, 0.72, z]} rot={[0, 0, -0.18]} c="#5a5480" />
        <B s={[0.08, 1.25, 0.08]} pos={[0.18, 0.72, z]} rot={[0, 0, 0.18]} c="#5a5480" />
      </group>)}
      <group position={[0, 1.36, 0]} rotation={[0, 0, a]}>
        <B s={[1.7, 0.14, 0.14]} c={col} e={col} ei={0.2} />
        <B s={[0.16, 0.42, 0.18]} pos={[-0.88, -0.12, 0]} c={col} e={col} ei={0.2} />
        <B s={[0.3, 0.3, 0.3]} pos={[0.8, -0.05, 0]} c="#5a5480" />
      </group>
      <mesh position={[-0.88, 0.35, 0]}><cylinderGeometry args={[0.04, 0.04, 0.5, 8]} /><M c="#8d8aa0" /></mesh>
      <B s={[0.3, 0.3, 0.3]} pos={[-0.88, 0.27, 0]} c="#15102b" />
    </group>
  );
};

/** Lupa. Origen en el centro del vidrio, mirando a +z. */
export const Lupa: React.FC<P> = () => (
  <group>
    <mesh><torusGeometry args={[0.32, 0.05, 8, 24]} /><M c={C.gold} e={C.gold} ei={0.4} /></mesh>
    <mesh><circleGeometry args={[0.3, 24]} /><meshBasicMaterial color="#8fd8ff" transparent opacity={0.25} toneMapped={false} side={THREE.DoubleSide} /></mesh>
    <B s={[0.09, 0.5, 0.08]} pos={[0.3, -0.48, 0]} rot={[0, 0, 0.6]} c="#5c3a26" />
  </group>
);

/** Flecha horizontal que crece hacia +x. Origen en la cola. p: len (largo total con punta), color, dur */
export const Flecha: React.FC<P> = ({ tt, p }) => {
  const { len = 1.2, color = C.cyan, dur = 0.6 } = p; const k = Math.max(0.001, eo(tt / dur)); const head = 0.3; const sh = Math.max(0.001, (len - head) * k);
  return (<group>
    <B s={[sh, 0.12, 0.12]} pos={[sh / 2, 0, 0]} c={color} e={color} ei={1.0} />
    <mesh position={[sh + head / 2, 0, 0]} rotation={[0, 0, -Math.PI / 2]}><coneGeometry args={[0.2, head, 4]} /><M c={color} e={color} ei={1.0} /></mesh>
  </group>);
};

/** Línea luminosa entre dos puntos (relativos al origen del actor). p: a, b, color, dur */
export const Linea: React.FC<P> = ({ tt, p }) => {
  const { a = [0, 0, 0], b = [1, 0, 0], color = C.gold, dur = 0.4 } = p; const k = Math.max(0.001, eo(tt / dur));
  const A = new THREE.Vector3(...(a as V3)), Bv = new THREE.Vector3(...(b as V3)); const E = A.clone().lerp(Bv, k);
  const mid = A.clone().add(E).multiplyScalar(0.5); const len = A.distanceTo(E);
  const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), E.clone().sub(A).normalize());
  return <mesh position={mid} quaternion={q}><cylinderGeometry args={[0.025, 0.025, Math.max(len, 0.001), 6]} /><meshBasicMaterial color={color} toneMapped={false} /></mesh>;
};

/** Calendario de pared (textos 2 cm delante). Origen en el centro. p: top, big, color */
export const Calendario: React.FC<P> = ({ t, tt, p }) => {
  const { top = 'AÑO', big = '2012', color = C.red, bigSize = 0.62 } = p;
  return (<group>
    <B s={[1.5, 1.6, 0.1]} c="#f4f1ff" /><B s={[1.5, 0.42, 0.12]} pos={[0, 0.59, 0.01]} c={color} />
    <group position={[0, 0.59, 0.09]}><Label t={t} tt={tt} p={{ text: top, w: 1.4, h: 0.36, size: 0.7 }} /></group>
    <group position={[0, -0.2, 0.07]}><Label t={t} tt={tt} p={{ text: big, w: 1.4, h: 1.0, size: bigSize, color: '#1a1030', weight: 900 }} /></group>
    {[-0.45, 0.45].map((x) => <B key={x} s={[0.08, 0.22, 0.14]} pos={[x, 0.84, 0]} c="#8d8aa0" />)}
  </group>);
};

/** Reloj de arena que se vacía, apoyado (sin giro). Origen en el piso. p: dur, color */
export const Reloj: React.FC<P> = ({ tt, p }) => {
  const { dur = 3, color = C.gold } = p; const k = clamp(tt / dur); const top = 1 - k;
  return (
    <group>
      <B s={[0.7, 0.08, 0.5]} pos={[0, 0.04, 0]} c="#8a5a3a" /><B s={[0.7, 0.08, 0.5]} pos={[0, 1.16, 0]} c="#8a5a3a" />
      {[-0.28, 0.28].map((x) => <B key={x} s={[0.05, 1.04, 0.05]} pos={[x, 0.6, 0.18]} c="#8a5a3a" />)}
      <mesh position={[0, 0.865, 0]}><cylinderGeometry args={[0.24, 0.03, 0.5, 10, 1, true]} /><M c="#8fd8ff" e="#8fd8ff" ei={0.15} o={0.35} /></mesh>
      <mesh position={[0, 0.335, 0]}><cylinderGeometry args={[0.03, 0.24, 0.5, 10, 1, true]} /><M c="#8fd8ff" e="#8fd8ff" ei={0.15} o={0.35} /></mesh>
      {top > 0.02 && <mesh position={[0, 0.62 + 0.25 * (1 - top) + 0.225 * top, 0]}><cylinderGeometry args={[0.03 + 0.19 * top, 0.03, 0.45 * top, 10]} /><M c={color} e={color} ei={0.4} /></mesh>}
      {k > 0.02 && <mesh position={[0, 0.08 + 0.2 * k, 0]}><cylinderGeometry args={[0.03 + 0.18 * (1 - k), 0.22, 0.4 * k, 10]} /><M c={color} e={color} ei={0.4} /></mesh>}
      {k > 0 && k < 1 && <B s={[0.015, 0.45, 0.015]} pos={[0, 0.4, 0]} c={color} e={color} ei={0.6} />}
    </group>
  );
};

/** Paredes oscuras por encima de y0 (set 'room'), para que nada claro quede detrás de los subtítulos. */
export const Pared: React.FC<P> = ({ p }) => {
  const { y0 = 2.3, color = '#24194f' } = p; const h = 8 - y0;
  return (<group>
    <mesh position={[0, y0 + h / 2, -3.78]}><boxGeometry args={[9, h, 0.02]} /><meshBasicMaterial color={color} toneMapped={false} /></mesh>
    {[-1, 1].map((sx) => <mesh key={sx} position={[sx * 4.38, y0 + h / 2, 0]}><boxGeometry args={[0.02, h, 8]} /><meshBasicMaterial color={color} toneMapped={false} /></mesh>)}
    <B s={[9, 0.06, 0.03]} pos={[0, y0, -3.76]} c={C.cyan} e={C.cyan} ei={1.2} />
    {[-1, 1].map((sx) => <B key={'m' + sx} s={[0.03, 0.06, 8]} pos={[sx * 4.37, y0, 0]} c={C.cyan} e={C.cyan} ei={1.2} />)}
  </group>);
};

/** Estrado / mesa larga. Origen en el piso. p: w, d, h, color */
export const Estrado: React.FC<P> = ({ p }) => {
  const { w = 2.6, d = 0.7, h = 0.9, color = '#5c3a26', top = '#8a5a3a' } = p;
  return (<group>
    <B s={[w, h - 0.06, d]} pos={[0, (h - 0.06) / 2, 0]} c={color} />
    <B s={[w + 0.08, 0.06, d + 0.08]} pos={[0, h - 0.03, 0]} c={top} />
  </group>);
};

export const EXTRA: Record<string, React.FC<P>> = {
  panel: Panel, balanza: Balanza, mazo: Mazo, edificio: Edificio, papel: Papel, sobre: Sobre, silla: Silla, bomba: Bomba,
  lupa: Lupa, flecha: Flecha, linea: Linea, calendario: Calendario, reloj: Reloj, pared: Pared, estrado: Estrado,
};
