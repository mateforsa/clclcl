import React from 'react';
import * as THREE from 'three';
import { M, Label, useTex } from '../../src/kit/Props';
import { clamp, eio, eo, lerp, rnd } from '../../src/kit/math';

// Look propio de la versión 2. El original (meta-muse) era neón violeta: robot "bot", teléfono gigante con chat,
// edificios con cartel, globo terráqueo. Acá: "Black Friday" en negro, amarillo seguridad, rojo etiqueta y cartón kraft.
// Escenarios: pasillo de supermercado con techo oscuro, galería comercial de noche con persianas metálicas,
// sala de reuniones con piso de madera y banco de pruebas a oscuras. El bot es el propio carrito (pantallita en la manija).
// Nada de logos reales: los nombres van en texto plano.
type P = { t: number; tt: number; p: any };
type V3 = [number, number, number];
const B: React.FC<{ s: V3; pos?: V3; rot?: V3; c: string; e?: string; ei?: number; o?: number }> = ({ s, pos, rot, c, e, ei, o }) => (
  <mesh position={pos} rotation={rot}><boxGeometry args={s} /><M c={c} e={e} ei={ei} o={o} /></mesh>
);
const Flat: React.FC<{ s: [number, number]; pos?: V3; rot?: V3; c?: string; map?: THREE.Texture; o?: number; add?: boolean }> = ({ s, pos, rot, c = '#fff', map, o, add }) => (
  <mesh position={pos} rotation={rot}><planeGeometry args={s} /><meshBasicMaterial color={c} map={map} toneMapped={false} transparent={o !== undefined || add} opacity={o ?? 1}
    depthWrite={!add} blending={add ? THREE.AdditiveBlending : THREE.NormalBlending} /></mesh>
);
const Cyl: React.FC<{ r: number; h: number; pos?: V3; rot?: V3; c: string; e?: string; ei?: number; seg?: number; r2?: number }> = ({ r, h, pos, rot, c, e, ei, seg = 12, r2 }) => (
  <mesh position={pos} rotation={rot}><cylinderGeometry args={[r2 ?? r, r, h, seg]} /><M c={c} e={e} ei={ei} /></mesh>
);

export const INK = '#121116', YEL = '#ffd21f', TAG = '#ff4a3d', KRAFT = '#c8955a', CREAM = '#f3efe6', TEAL = '#14a39a',
  CHROME = '#b9bec6', DEEP = '#1c1b22', WOOD = '#9a6a42';
const GOODS = [TAG, YEL, '#2f9be0', '#3fbf7f', CREAM, KRAFT, '#8a5cd6', '#f07a2a'];

/* ---------- Escenarios (sobre el set 'room', lo tapan entero) ---------- */
export const Stage: React.FC<P> = ({ t, p }) => {
  const k = p.kind ?? 'aisle';
  return (
    <group>
      <color attach="background" args={[k === 'lab' ? '#07080d' : '#0d0c11']} />
      {k === 'aisle' && <Aisle t={t} p={p} />}
      {k === 'street' && <Street t={t} p={p} />}
      {k === 'meet' && <Meet t={t} p={p} />}
      {k === 'lab' && <Lab t={t} p={p} />}
    </group>
  );
};

/** Banderines negros y amarillos colgados (sin texto). */
const Pennants: React.FC<{ y: number; z: number; w: number; n?: number }> = ({ y, z, w, n = 14 }) => (
  <group position={[0, y, z]}>
    <B s={[w, 0.015, 0.015]} c="#2a2a2a" />
    {Array.from({ length: n }, (_, i) => (
      <mesh key={i} position={[-w / 2 + (i + 0.5) * (w / n), -0.14, 0]} rotation={[0, 0, Math.PI]}>
        <coneGeometry args={[0.1, 0.26, 3]} /><M c={i % 2 ? YEL : INK} e={i % 2 ? YEL : undefined} ei={0.25} />
      </mesh>))}
  </group>
);

/** Pasillo de súper: piso claro de baldosas, techo y paredes altas oscuras (para que el subtítulo se lea). p.dim = luces que se apagan desde ese t. */
const Aisle: React.FC<{ t: number; p: any }> = ({ t, p }) => {
  const tiles = useTex((g, W, H) => {
    g.fillStyle = '#cfc8bb'; g.fillRect(0, 0, W, H);
    for (let i = 0; i < 8; i++) for (let j = 0; j < 8; j++) { g.fillStyle = (i + j) % 2 ? '#d8d2c6' : '#c6beb0'; g.fillRect((i * W) / 8 + 2, (j * H) / 8 + 2, W / 8 - 4, H / 8 - 4); }
  }, 512, 512, 'mm2tiles');
  const dim = p.dim !== undefined ? clamp((t - p.dim) / 0.6) : 0;
  return (
    <group>
      <ambientLight intensity={lerp(0.2, -0.9, dim)} color="#ffffff" />
      <pointLight position={[0, 3.4, 2.5]} intensity={lerp(22, 3, dim)} color="#fff6e4" distance={14} />
      <pointLight position={[0, 3.0, -1.5]} intensity={lerp(12, 0, dim)} color="#ffe9b8" distance={9} />
      {dim > 0 && <pointLight position={[0, 2.4, 0.9]} intensity={16 * dim} color="#fff2c8" distance={4} />}
      <Flat s={[30, 30]} pos={[0, 0.02, 0]} rot={[-Math.PI / 2, 0, 0]} map={tiles} c={dim > 0 ? '#777' : '#ffffff'} />
      {/* pared del fondo: franja amarilla baja, todo lo alto en negro */}
      <B s={[14, 1.2, 0.2]} pos={[0, 0.6, -4.2]} c={YEL} />
      <B s={[14, 8, 0.2]} pos={[0, 5.2, -4.2]} c={DEEP} />
      {[-4.4, 4.4].map((x) => <B key={x} s={[0.2, 9, 16]} pos={[x, 4.5, 0]} c={DEEP} />)}
      <B s={[9, 0.1, 16]} pos={[0, 4.4, 0]} c="#141318" />
      {/* tubos de luz del techo */}
      {[-2.5, -0.5, 1.5].map((z) => <Flat key={z} s={[0.12, 1.4]} pos={[0, 4.34, z]} rot={[Math.PI / 2, 0, 0]} c={dim > 0.5 ? '#333' : '#fffbe8'} />)}
      {!p.noflags && <Pennants y={3.05} z={-3.4} w={7} />}
    </group>
  );
};

/** Galería comercial de noche: vereda gris, cielo azul oscuro, frentes de locales se ponen como actores. */
const Street: React.FC<{ t: number; p: any }> = () => {
  const walk = useTex((g, W, H) => {
    g.fillStyle = '#4a4850'; g.fillRect(0, 0, W, H);
    for (let i = 0; i < 6; i++) for (let j = 0; j < 6; j++) { g.fillStyle = (i * 7 + j * 3) % 5 ? '#545259' : '#4f4d55'; g.fillRect((i * W) / 6 + 3, (j * H) / 6 + 3, W / 6 - 6, H / 6 - 6); }
  }, 512, 512, 'mm2walk');
  return (
    <group>
      <ambientLight intensity={-0.4} color="#ffffff" />
      <pointLight position={[0, 3.6, 3.5]} intensity={20} color="#ffe0b0" distance={14} />
      <pointLight position={[-3, 2.5, 1]} intensity={10} color="#8fb8ff" distance={10} />
      <Flat s={[30, 30]} pos={[0, 0.02, 0]} rot={[-Math.PI / 2, 0, 0]} map={walk} />
      <B s={[30, 0.12, 0.3]} pos={[0, 0.06, 3.6]} c="#77757c" />
      {/* fachada alta oscura, con techo de galería */}
      <B s={[30, 9, 0.2]} pos={[0, 4.5, -2.95]} c="#1a1920" />
      <B s={[30, 0.18, 2.2]} pos={[0, 3.55, -1.9]} c="#24232b" />
      {Array.from({ length: 9 }, (_, i) => <Flat key={i} s={[0.5, 0.08]} pos={[-8 + i * 2, 3.455, -1.4]} rot={[Math.PI / 2, 0, 0]} c="#fff1cf" />)}
      <Pennants y={3.35} z={-0.85} w={14} n={28} />
    </group>
  );
};

/** Sala de reuniones: piso de madera, zócalo kraft, pared alta oscura, una lámpara colgante. */
const Meet: React.FC<{ t: number; p: any }> = () => {
  const floor = useTex((g, W, H) => {
    g.fillStyle = '#8a5f3c'; g.fillRect(0, 0, W, H);
    for (let j = 0; j < 16; j++) { g.fillStyle = j % 2 ? '#93663f' : '#835936'; g.fillRect(0, (j * H) / 16 + 1, W, H / 16 - 2);
      g.fillStyle = 'rgba(0,0,0,.18)'; for (let i = 0; i < 3; i++) g.fillRect(((j * 97 + i * 173) % W), (j * H) / 16, 3, H / 16); }
  }, 512, 512, 'mm2wood');
  return (
    <group>
      <ambientLight intensity={-0.2} color="#ffffff" />
      <pointLight position={[0, 3.3, 0.6]} intensity={26} color="#ffe2b0" distance={12} />
      <pointLight position={[0, 2.6, 3.4]} intensity={8} color="#ffffff" distance={9} />
      <Flat s={[30, 30]} pos={[0, 0.02, 0]} rot={[-Math.PI / 2, 0, 0]} map={floor} />
      <B s={[14, 1.4, 0.2]} pos={[0, 0.7, -3.6]} c={KRAFT} />
      <B s={[14, 8, 0.2]} pos={[0, 5.4, -3.6]} c={DEEP} />
      {[-4.2, 4.2].map((x) => <B key={x} s={[0.2, 9, 14]} pos={[x, 4.5, 0]} c="#201e26" />)}
      {/* lámpara colgante */}
      <B s={[0.02, 1.1, 0.02]} pos={[0, 3.9, 0]} c="#2a2a2a" />
      <Cyl r={0.42} r2={0.12} h={0.3} pos={[0, 3.2, 0]} c={INK} />
      <Flat s={[0.6, 0.6]} pos={[0, 3.04, 0]} rot={[Math.PI / 2, 0, 0]} c="#fff3cf" />
    </group>
  );
};

/** Banco de pruebas a oscuras: piso azul muy oscuro, una lámpara de escritorio cálida (la pone el actor 'lamp'). */
const Lab: React.FC<{ t: number; p: any }> = () => (
  <group>
    <ambientLight intensity={-0.95} color="#ffffff" />
    <pointLight position={[0, 3.0, 3.2]} intensity={5} color="#6f8fd8" distance={10} />
    <Flat s={[30, 30]} pos={[0, 0.02, 0]} rot={[-Math.PI / 2, 0, 0]} c="#10131c" />
    {Array.from({ length: 14 }, (_, i) => <Flat key={i} s={[30, 0.015]} pos={[0, 0.03, 4 - i * 0.6]} rot={[-Math.PI / 2, 0, 0]} c="#1b2030" />)}
    <B s={[14, 9, 0.2]} pos={[0, 4.5, -3.4]} c="#0b0d14" />
    {[-4.2, 4.2].map((x) => <B key={x} s={[0.2, 9, 14]} pos={[x, 4.5, 0]} c="#0b0d14" />)}
  </group>
);

/* ---------- Carrito (el bot) ---------- */
// p.n = cantidad de productos; p.fill = { at, every } (tt desde que empiezan a caer); p.full = todos ya adentro.
// p.scan = tt desde que barre el haz de la pantallita; p.eye = color de la pantalla.
export const Cart: React.FC<P> = ({ t, tt, p }) => {
  const { n = 9, fill, full, scan, eye = YEL } = p;
  const items = React.useMemo(() => { const r = rnd(p.seed ?? 4); return Array.from({ length: n }, (_, i) => ({
    x: -0.3 + (i % 3) * 0.3 + (r() - 0.5) * 0.05, z: -0.14 + (Math.floor(i / 3) % 2) * 0.27, y: 0.58 + Math.floor(i / 6) * 0.24,
    w: 0.22 + r() * 0.06, h: 0.18 + r() * 0.14, c: GOODS[Math.floor(r() * GOODS.length)], ry: (r() - 0.5) * 0.5 })); }, [n, p.seed]);
  const bars: React.ReactNode[] = [];
  for (let i = 0; i < 7; i++) bars.push(<B key={'f' + i} s={[0.018, 0.48, 0.018]} pos={[-0.45 + i * 0.15, 0.72, 0.29]} c={CHROME} />, <B key={'b' + i} s={[0.018, 0.48, 0.018]} pos={[-0.45 + i * 0.15, 0.72, -0.29]} c={CHROME} />);
  for (let i = 0; i < 4; i++) bars.push(<B key={'s' + i} s={[0.018, 0.48, 0.018]} pos={[0.46, 0.72, -0.27 + i * 0.18]} c={CHROME} />, <B key={'h' + i} s={[0.018, 0.48, 0.018]} pos={[-0.46, 0.72, -0.27 + i * 0.18]} c={CHROME} />);
  const sweep = scan !== undefined && tt >= scan ? Math.sin((tt - scan) * 3.2) * 0.6 : 0;
  return (
    <group>
      {/* canasto */}
      <B s={[0.94, 0.03, 0.6]} pos={[0, 0.48, 0]} c={CHROME} />
      {[0.96, 0.72].map((y) => <group key={y}><B s={[0.94, 0.03, 0.03]} pos={[0, y, 0.29]} c={CHROME} /><B s={[0.94, 0.03, 0.03]} pos={[0, y, -0.29]} c={CHROME} />
        <B s={[0.03, 0.03, 0.6]} pos={[0.46, y, 0]} c={CHROME} /><B s={[0.03, 0.03, 0.6]} pos={[-0.46, y, 0]} c={CHROME} /></group>)}
      {bars}
      {/* chasis y ruedas */}
      <B s={[0.8, 0.03, 0.5]} pos={[0, 0.16, 0]} c="#8f949c" />
      {[[-0.4, -0.23], [-0.4, 0.23], [0.4, -0.23], [0.4, 0.23]].map(([x, z], i) => <group key={i}>
        <B s={[0.03, 0.34, 0.03]} pos={[x, 0.3, z]} c={CHROME} />
        <Cyl r={0.06} h={0.04} pos={[x, 0.06, z]} rot={[Math.PI / 2, 0, 0]} c={INK} /></group>)}
      {/* manija amarilla y pantallita */}
      <B s={[0.03, 0.3, 0.03]} pos={[-0.52, 1.08, 0.27]} rot={[0, 0, 0.35]} c={CHROME} />
      <B s={[0.03, 0.3, 0.03]} pos={[-0.52, 1.08, -0.27]} rot={[0, 0, 0.35]} c={CHROME} />
      <B s={[0.06, 0.06, 0.66]} pos={[-0.58, 1.22, 0]} c={YEL} />
      <group position={[-0.5, 1.33, 0]} rotation={[0, sweep * 0.3, 0]}>
        <B s={[0.08, 0.18, 0.3]} c={INK} />
        <B s={[0.012, 0.13, 0.24]} pos={[0.045, 0, 0]} c={eye} e={eye} ei={1.6} />
        <B s={[0.012, 0.03, 0.03]} pos={[0.052, 0.02, -0.05]} c={INK} /><B s={[0.012, 0.03, 0.03]} pos={[0.052, 0.02, 0.05]} c={INK} />
      </group>
      {scan !== undefined && tt >= scan && (
        <group position={[-0.45, 1.33, 0]} rotation={[0, sweep, 0]}>
          <mesh position={[1.6, 0, 0]} rotation={[0, 0, Math.PI / 2]}><coneGeometry args={[0.55, 3.2, 4, 1, true]} />
            <meshBasicMaterial color={eye} transparent opacity={0.13} blending={THREE.AdditiveBlending} depthWrite={false} toneMapped={false} side={THREE.DoubleSide} /></mesh>
        </group>)}
      {/* productos */}
      {items.map((it, i) => {
        let y = it.y, s = 1;
        if (!full) { const t0 = (fill?.at ?? 0) + i * (fill?.every ?? 0.18); const k = tt - t0; if (fill === undefined || k < 0) return null; y += (1 - eo(k / 0.3)) * 1.4; s = Math.min(1, 0.4 + k * 3); }
        return <B key={i} s={[it.w * s, it.h * s, 0.2 * s]} pos={[it.x, y + it.h / 2 - 0.08, it.z]} rot={[0, it.ry, 0]} c={it.c} />;
      })}
    </group>
  );
};

/* ---------- Góndola ---------- */
// Mira a +z. p.w ancho, p.seed. p.glow = tt en que el producto marcado se ilumina (comparar); p.pick = índices que se van.
export const Shelf: React.FC<P> = ({ tt, p }) => {
  const { w = 2.6, seed = 1, levels = 4 } = p;
  const goods = React.useMemo(() => { const r = rnd(seed); const out: { x: number; y: number; w: number; h: number; c: string }[] = [];
    for (let l = 0; l < levels; l++) { let x = -w / 2 + 0.08; while (x < w / 2 - 0.3) { const bw = 0.18 + r() * 0.2, bh = 0.2 + r() * 0.2; out.push({ x: x + bw / 2, y: 0.18 + l * 0.48, w: bw, h: bh, c: GOODS[Math.floor(r() * GOODS.length)] }); x += bw + 0.04; } }
    return out; }, [w, seed, levels]);
  const hl: number[] = p.hl ?? [];
  return (
    <group>
      <B s={[w, levels * 0.48 + 0.1, 0.06]} pos={[0, (levels * 0.48) / 2, -0.25]} c="#2b2a31" />
      {Array.from({ length: levels }, (_, l) => <group key={l}>
        <B s={[w, 0.04, 0.5]} pos={[0, 0.14 + l * 0.48, 0]} c="#d9d6d0" />
        <B s={[w, 0.06, 0.02]} pos={[0, 0.12 + l * 0.48, 0.255]} c={YEL} /></group>)}
      {[-w / 2, w / 2].map((x) => <B key={x} s={[0.05, levels * 0.48 + 0.1, 0.52]} pos={[x, (levels * 0.48) / 2, 0]} c="#3a3940" />)}
      {goods.map((g, i) => { const lit = hl.includes(i) && p.glow !== undefined && tt >= p.glow;
        return <B key={i} s={[g.w, g.h, 0.3]} pos={[g.x, g.y + g.h / 2, 0.02]} c={g.c} e={lit ? g.c : undefined} ei={lit ? 0.9 : 0} />; })}
    </group>
  );
};

/* ---------- Frente de local con persiana ---------- */
// p.sign = texto del cartel (vacío = cartel apagado); p.signAt = tt en que se prende; p.shut = tt en que baja la persiana;
// p.closed = ya cerrada; p.lit = vidriera iluminada; p.w ancho.
export const Store: React.FC<P> = ({ t, tt, p }) => {
  const { w = 2.2, sign = '', lit = true, signColor = YEL } = p;
  const H = 2.3;
  const k = p.closed ? 1 : p.shut !== undefined ? eo((tt - p.shut) / 0.45) : 0;
  const bounce = p.shut !== undefined && tt > p.shut + 0.45 && tt < p.shut + 0.7 ? Math.sin((tt - p.shut - 0.45) * 25) * 0.02 : 0;
  const shutter = useTex((g, W, Hh) => { g.fillStyle = '#8c9099'; g.fillRect(0, 0, W, Hh);
    for (let i = 0; i < 40; i++) { g.fillStyle = i % 2 ? '#7a7e87' : '#a0a4ac'; g.fillRect(0, (i * Hh) / 40, W, Hh / 80); } }, 256, 512, 'mm2shutter');
  const signOn = sign && (p.signAt === undefined || tt >= p.signAt);
  return (
    <group>
      {/* marco */}
      <B s={[w + 0.3, 0.2, 0.3]} pos={[0, H + 0.1, 0]} c="#2c2b33" />
      {[-1, 1].map((sd) => <B key={sd} s={[0.15, H, 0.3]} pos={[sd * (w / 2 + 0.075), H / 2, 0]} c="#2c2b33" />)}
      {/* vidriera con productos */}
      <Flat s={[w, H]} pos={[0, H / 2, -0.12]} c={lit ? '#ffe7b8' : '#2a2a30'} />
      {lit && <pointLight position={[0, 1.4, 0.6]} intensity={6} color="#ffd890" distance={4} />}
      {[0.5, 1.15].map((y) => <B key={y} s={[w * 0.85, 0.04, 0.25]} pos={[0, y, -0.05]} c="#d0c7b6" />)}
      {Array.from({ length: 8 }, (_, i) => <B key={i} s={[0.22, 0.26, 0.18]} pos={[-w * 0.36 + (i % 4) * (w * 0.24), (i < 4 ? 0.52 : 1.17) + 0.15, -0.05]} c={GOODS[(i * 3 + (p.seed ?? 0)) % GOODS.length]} />)}
      {/* persiana */}
      {k > 0 && <group position={[0, H - (H * k) / 2 + bounce, 0.1]}>
        <mesh><planeGeometry args={[w, H * k]} /><meshStandardMaterial map={shutter} flatShading roughness={0.7} metalness={0.2} /></mesh>
        <B s={[w, 0.06, 0.05]} pos={[0, -(H * k) / 2, 0.02]} c="#5b5f67" />
      </group>}
      <B s={[w + 0.1, 0.18, 0.2]} pos={[0, H - 0.02, 0.14]} c="#3a3940" />
      {/* cartel */}
      <group position={[0, H + 0.48, 0.05]}>
        <B s={[w, 0.56, 0.14]} c={INK} />
        {signOn && <group position={[0, 0, 0.075]}><Label t={t} tt={tt} p={{ text: sign, w: w - 0.1, h: 0.5, color: signColor, size: 0.62, weight: 900 }} /></group>}
      </group>
    </group>
  );
};

/* ---------- Teléfono genérico ---------- */
// p.mode: 'cart' (resumen + botón aprobar; p.ok = tt en que se aprueba) | 'notif' (p.every: avisos que entran; p.perm = tt del permiso)
const phoneTex = (mode: string, st: number, ok: boolean) => (g: CanvasRenderingContext2D, W: number, H: number) => {
  g.textBaseline = 'middle';
  if (mode === 'cart') {
    g.fillStyle = CREAM; g.fillRect(0, 0, W, H);
    g.fillStyle = INK; g.fillRect(0, 0, W, H * 0.11);
    g.fillStyle = YEL; g.font = `900 ${H * 0.045}px Poppins`; g.textAlign = 'center'; g.fillText('TU CARRITO', W / 2, H * 0.06);
    for (let i = 0; i < 3; i++) { const y = H * (0.16 + i * 0.15); g.fillStyle = '#ffffff'; g.fillRect(W * 0.06, y, W * 0.88, H * 0.12);
      g.fillStyle = [TAG, '#2f9be0', '#3fbf7f'][i]; g.fillRect(W * 0.1, y + H * 0.02, H * 0.08, H * 0.08);
      g.fillStyle = '#3b3a40'; g.fillRect(W * 0.32, y + H * 0.03, W * 0.45, H * 0.022); g.fillStyle = '#b3aea4'; g.fillRect(W * 0.32, y + H * 0.07, W * 0.3, H * 0.018); }
    g.fillStyle = ok ? '#2fb36a' : YEL; g.beginPath(); (g as any).roundRect(W * 0.08, H * 0.7, W * 0.84, H * 0.14, 40); g.fill();
    g.fillStyle = ok ? '#ffffff' : INK; g.font = `900 ${H * 0.05}px Poppins`; g.fillText(ok ? 'APROBADA ✓' : 'APROBAR', W / 2, H * 0.775);
  } else {
    const gr = g.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, '#1b2440'); gr.addColorStop(1, '#0c101e'); g.fillStyle = gr; g.fillRect(0, 0, W, H);
    g.fillStyle = 'rgba(255,255,255,.5)'; g.fillRect(W * 0.38, H * 0.08, W * 0.24, H * 0.012);
    for (let i = 0; i < st; i++) { const y = H * (0.16 + i * 0.13); g.fillStyle = 'rgba(240,244,255,.93)'; g.beginPath(); (g as any).roundRect(W * 0.06, y, W * 0.88, H * 0.11, 26); g.fill();
      g.fillStyle = '#4a78d6'; g.beginPath(); g.arc(W * 0.16, y + H * 0.055, H * 0.03, 0, 7); g.fill();
      g.fillStyle = '#2c3346'; g.fillRect(W * 0.26, y + H * 0.03, W * 0.42, H * 0.02); g.fillStyle = '#9aa3b8'; g.fillRect(W * 0.26, y + H * 0.065, W * 0.58, H * 0.016); }
    if (ok) { const y = H * 0.8; g.fillStyle = '#ffffff'; g.beginPath(); (g as any).roundRect(W * 0.06, y, W * 0.88, H * 0.12, 26); g.fill();
      g.fillStyle = '#2c3346'; g.textAlign = 'left'; g.font = `800 ${H * 0.03}px Poppins`; g.fillText('NOTIFICACIONES', W * 0.11, y + H * 0.06);
      g.fillStyle = '#2fb36a'; g.beginPath(); (g as any).roundRect(W * 0.7, y + H * 0.035, W * 0.18, H * 0.05, 30); g.fill();
      g.fillStyle = '#fff'; g.beginPath(); g.arc(W * 0.84, y + H * 0.06, H * 0.02, 0, 7); g.fill(); }
  }
};
export const Phone2: React.FC<P> = ({ tt, p }) => {
  const { mode = 'cart', w = 1.0, h = 1.9 } = p;
  const st = mode === 'notif' ? clamp(Math.floor((tt - (p.from ?? 0)) / (p.every ?? 0.6)) + 1, 0, 4) : 0;
  const ok = mode === 'cart' ? p.ok !== undefined && tt >= p.ok : p.perm !== undefined && tt >= p.perm;
  const tx = useTex(phoneTex(mode, st, ok), 512, Math.round((512 * h) / w), 'mm2ph' + mode + st + ok + w + h);
  return (
    <group>
      <B s={[w + 0.1, h + 0.12, 0.08]} pos={[0, 0, -0.045]} c={INK} />
      <Flat s={[w, h]} map={tx} />
      <B s={[0.18, 0.03, 0.01]} pos={[0, h / 2 + 0.025, 0.003]} c="#2a2a30" />
    </group>
  );
};

/** Lupa: aro + vidrio + mango. */
export const Lens: React.FC<P> = ({ p }) => {
  const { color = YEL } = p;
  return (
    <group>
      <mesh><torusGeometry args={[0.3, 0.05, 6, 20]} /><M c={color} e={color} ei={0.5} /></mesh>
      <mesh><circleGeometry args={[0.28, 20]} /><meshBasicMaterial color="#cfe8ff" transparent opacity={0.25} toneMapped={false} /></mesh>
      <B s={[0.08, 0.42, 0.08]} pos={[0.27, -0.42, 0]} rot={[0, 0, 0.6]} c={INK} />
    </group>
  );
};

/** Megáfono (la publicidad). */
export const Mega: React.FC<P> = () => (
  <group rotation={[0, 0, -Math.PI / 2]}>
    <mesh position={[0, 0.15, 0]}><cylinderGeometry args={[0.34, 0.12, 0.55, 10, 1, true]} /><meshStandardMaterial color={TAG} flatShading side={THREE.DoubleSide} /></mesh>
    <Cyl r={0.12} h={0.25} pos={[0, -0.2, 0]} c={CREAM} />
    <B s={[0.08, 0.2, 0.08]} pos={[0.12, -0.25, 0]} c={INK} />
  </group>
);

/** Molinete con lector: los que pasan con credencial prenden verde; p.red = tt en que se pone rojo. */
export const Gate: React.FC<P> = ({ t, tt, p }) => {
  const red = p.red !== undefined && tt >= p.red;
  const col = red ? TAG : p.green !== undefined && tt >= p.green ? '#2fd07a' : '#6d7280';
  const blink = red ? 0.6 + 0.6 * Math.abs(Math.sin(t * 9)) : 1;
  return (
    <group>
      {[-0.7, 0.7].map((x) => <group key={x}>
        <B s={[0.22, 1.05, 0.6]} pos={[x, 0.525, 0]} c="#3a3940" />
        <B s={[0.24, 0.06, 0.62]} pos={[x, 1.08, 0]} c="#24232b" />
        <B s={[0.16, 0.12, 0.02]} pos={[x, 0.9, 0.31]} c={col} e={col} ei={1.8 * blink} />
      </group>)}
      <B s={[1.18, 0.05, 0.05]} pos={[0, 0.85, 0]} rot={[0, 0, red ? 0 : 0]} c={red ? TAG : CHROME} e={red ? TAG : undefined} ei={0.6} />
    </group>
  );
};

/** Mesa de reunión de madera. */
export const Table: React.FC<P> = ({ p }) => {
  const { w = 2.4, d = 1.1 } = p;
  return (
    <group>
      <B s={[w, 0.07, d]} pos={[0, 0.76, 0]} c={WOOD} />
      {[[-1, -1], [-1, 1], [1, -1], [1, 1]].map(([a, b], i) => <B key={i} s={[0.07, 0.74, 0.07]} pos={[a * (w / 2 - 0.12), 0.37, b * (d / 2 - 0.1)]} c={INK} />)}
    </group>
  );
};

/** Carpeta de acuerdo con renglones y línea de firma vacía; la lapicera duda encima. */
export const Contract: React.FC<P> = ({ t, p }) => {
  const tex = useTex((g, W, H) => {
    g.fillStyle = CREAM; g.fillRect(0, 0, W, H);
    g.fillStyle = INK; g.font = `900 ${H * 0.085}px Poppins`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('ACUERDO', W / 2, H * 0.1);
    g.fillStyle = '#b8b0a2'; for (let i = 0; i < 7; i++) g.fillRect(W * 0.1, H * (0.22 + i * 0.07), W * (i % 3 === 2 ? 0.55 : 0.8), H * 0.018);
    g.fillStyle = '#3b3a40'; g.fillRect(W * 0.1, H * 0.86, W * 0.32, H * 0.008); g.fillRect(W * 0.58, H * 0.86, W * 0.32, H * 0.008);
  }, 512, 640, 'mm2contract');
  const hov = p.still ? 0 : Math.sin(t * 2.4);
  return (
    <group>
      <Flat s={[0.9, 1.12]} rot={[-Math.PI / 2, 0, 0]} pos={[0, 0.005, 0]} map={tex} />
      <group position={[0.18 + hov * 0.12, 0.2 + Math.abs(hov) * 0.06, 0.38]} rotation={[0.9, 0.3, 0.5]}>
        <Cyl r={0.025} h={0.6} c={INK} /><mesh position={[0, -0.33, 0]} rotation={[Math.PI, 0, 0]}><coneGeometry args={[0.025, 0.07, 6]} /><M c={YEL} /></mesh>
      </group>
    </group>
  );
};

/** Triángulo de advertencia (sin texto). */
export const Warn: React.FC<P> = ({ t }) => {
  const k = 0.8 + 0.2 * Math.abs(Math.sin(t * 5));
  return (
    <group>
      <mesh rotation={[0, 0, 0]}><cylinderGeometry args={[0.62, 0.62, 0.08, 3]} /><M c={YEL} e={YEL} ei={0.5 * k} /></mesh>
      <group rotation={[Math.PI / 2, 0, 0]}>
        <B s={[0.1, 0.36, 0.02]} pos={[0, 0.05, -0.05]} c={INK} rot={[0, 0, 0]} />
      </group>
    </group>
  );
};

/** Atril con micrófono; p.name en el frente (texto plano). */
export const Podium: React.FC<P> = ({ t, tt, p }) => (
  <group>
    <B s={[0.8, 1.05, 0.5]} pos={[0, 0.525, 0]} c={INK} />
    <B s={[0.9, 0.06, 0.58]} pos={[0, 1.08, -0.02]} rot={[-0.2, 0, 0]} c="#2c2b33" />
    {p.name && <group position={[0, 0.62, 0.256]}><Label t={t} tt={tt} p={{ text: p.name, w: 0.7, h: 0.24, bg: YEL, color: INK, size: 0.7, weight: 900, depth: 0.02 }} /></group>}
    <B s={[0.02, 0.3, 0.02]} pos={[0, 1.25, 0.1]} rot={[0.4, 0, 0]} c="#555" />
    <mesh position={[0, 1.39, 0.16]}><sphereGeometry args={[0.04, 8, 6]} /><M c="#333" /></mesh>
  </group>
);

/** Soga de la cinchada entre dos (x -L..L). Se mueve de un lado a otro. */
export const Rope: React.FC<P> = ({ t, p }) => {
  const { L = 1.3 } = p; const sh = Math.sin(t * 3.1) * 0.06;
  return (
    <group position={[sh, 0, 0]}>
      <Cyl r={0.035} h={L * 2} rot={[0, 0, Math.PI / 2]} c={KRAFT} />
      {Array.from({ length: 9 }, (_, i) => <B key={i} s={[0.03, 0.08, 0.08]} pos={[-L + (i + 0.5) * ((2 * L) / 9), 0, 0]} c="#a87a46" />)}
      <B s={[0.06, 0.16, 0.16]} c={TAG} />
    </group>
  );
};

/** Faro de luz sobre el piso (aro amarillo en lugar del aro neón). */
export const Spot: React.FC<P> = ({ p }) => {
  const { r = 0.9, color = YEL } = p;
  return (
    <group rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
      <mesh><circleGeometry args={[r, 32]} /><meshBasicMaterial color={color} transparent opacity={0.16} toneMapped={false} blending={THREE.AdditiveBlending} depthWrite={false} /></mesh>
      <mesh><ringGeometry args={[r - 0.04, r, 40]} /><meshBasicMaterial color={color} toneMapped={false} /></mesh>
    </group>
  );
};

/** Lámpara de escritorio cálida. */
export const Lamp: React.FC<P> = () => (
  <group>
    <Cyl r={0.16} h={0.04} pos={[0, 0.02, 0]} c={INK} />
    <B s={[0.03, 0.55, 0.03]} pos={[0.05, 0.3, 0]} rot={[0, 0, -0.2]} c="#333" />
    <B s={[0.03, 0.45, 0.03]} pos={[0.25, 0.68, 0]} rot={[0, 0, 1.1]} c="#333" />
    <mesh position={[0.45, 0.72, 0]} rotation={[0, 0, -2.2]}><coneGeometry args={[0.14, 0.2, 10, 1, true]} /><meshStandardMaterial color={YEL} side={THREE.DoubleSide} flatShading /></mesh>
    <pointLight position={[0.5, 0.6, 0.1]} intensity={9} color="#ffd890" distance={4.5} />
  </group>
);

/** Soporte de pruebas: pinza que sostiene el teléfono parado. */
export const Stand: React.FC<P> = () => (
  <group>
    <B s={[0.7, 0.05, 0.45]} pos={[0, 0.025, 0]} c="#2c2b33" />
    <B s={[0.06, 0.5, 0.06]} pos={[0, 0.27, -0.12]} c={CHROME} />
    <B s={[0.5, 0.06, 0.1]} pos={[0, 0.5, -0.12]} c={TAG} />
  </group>
);

export const EXTRA: Record<string, React.FC<P>> = {
  stage: Stage, cart: Cart, shelf: Shelf, store: Store, phone2: Phone2, lens: Lens, mega: Mega, gate: Gate, table: Table,
  contract: Contract, warn: Warn, podium: Podium, rope: Rope, spot: Spot, lamp: Lamp, stand: Stand,
};
