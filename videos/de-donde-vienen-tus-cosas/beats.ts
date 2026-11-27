import type { BeatSpec } from '../../src/Beat';
import { C } from '../../src/kit/math';
import timing from './timing.json';
import { mp } from './props';

// Recorrido por cinco ciudades. Metáfora que abre y cierra: la mano con el objeto (plano 1 celular, plano 16 frasco genérico).
// Entre paradas se repite el mapa low-poly de la Argentina (acostado en el piso, esquema aproximado, sin nombres) con un pin
// magenta que viaja Río Grande -> Puerto Madryn -> Arroyito -> Gran Rosario -> Bariloche dejando un rastro dorado.
// Nombres de ciudades y cifras: solo en las placas 2D de "## Placas por plano" de guion.md. Sin logos.
// Textos 2D con el borde inferior en 1450 px o menos: placa 1 centrada en 64 %, placa 2 en 68,5 %, fuentes en 71,8 % y 74,2 %.

const PANEL = 'rgba(20,10,46,.92)';
const fit = (text: string, max: number) => Math.min(max, Math.floor(820 / (text.length * 0.61)));
const P1 = (text: string, at: any, o: any = {}) => ({ type: 'tag' as const, text, at, x: 47, y: 64, color: PANEL, size: fit(text, 46), ...o });
const P2 = (text: string, at: any, o: any = {}) => ({ type: 'tag' as const, text, at, x: 47, y: 68.5, color: PANEL, size: fit(text, 40), ...o });
const FUENTE = [
  { type: 'tag' as const, text: 'FUENTES: LA NACIÓN, EL CRONISTA, MINISTERIO DE ECONOMÍA,', at: 0, x: 47, y: 71.8, color: 'rgba(20,10,46,.75)', size: 21 },
  { type: 'tag' as const, text: 'LA CAPITAL, ÁMBITO, ARGENTINA.GOB.AR', at: 0, x: 47, y: 74.2, color: 'rgba(20,10,46,.75)', size: 21 },
];
const BIG = (text: string, at: any, o: any = {}) => ({ type: 'big' as const, text, at, y: 55.5, ...o });

/** segundos desde el inicio del plano hasta que se dice `word` */
const W = (id: string, word: string, nth = 1): number => {
  const b = (timing as any).beats.find((x: any) => x.id === id); let k = nth;
  const n = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]/g, '');
  for (const w of b.words) if (n(w.w).startsWith(n(word)) && --k === 0) return w.s - b.start;
  throw new Error(`[${id}] no está "${word}"`);
};
/** aleja la cámara f veces desde el punto que mira */
const Z = (c: any, f = 1.45) => { const L = c.look; const sc = (v: number[]) => v.map((x, i) => L[i] + (x - L[i]) * f); return { ...c, from: sc(c.from), to: sc(c.to) }; };
const ALL = ['rg', 'pm', 'ar', 'ro', 'ba'];
const MAPCAM = (dx = 0) => ({ from: [0.25 + dx, 5.3, 5.5] as any, to: [-0.1 + dx, 4.95, 4.95] as any, look: [dx, 0, 0.2] as any, fov: 40 });

// fábricas del plano 3 (isla a escala 7): 8 alrededor de Río Grande, 2 en Ushuaia
const RG8: [number, number][] = [[-0.78, -0.15], [-0.58, -0.15], [-0.8, 0.08], [-0.6, 0.08], [-0.4, 0.08], [-0.7, 0.3], [-0.5, 0.3], [-0.3, 0.3]];
const US2: [number, number][] = [[-0.8, 0.6], [-0.58, 0.62]];
const KDF = 7, ODF: [number, number, number] = [1.88, 0, -10.78];

const BEATS0: BeatSpec[] = [
  // 1. Mirá el celular en el que ves esto.
  { id: 'b01', set: 'void', cam: Z({ from: [0.35, 1.7, 3.5], to: [0.05, 1.62, 3.0], look: [0, 1.38, 0], fov: 44 }), keywords: ['celular'],
    actors: [
      { type: 'ring', pos: [0, 0.03, 0], p: { r: 0.9, color: C.cyan } },
      { type: 'mano', pos: [0, 1.4, 0], rot: [-0.08, -0.22, 0.07], p: { obj: 'phone', screen: 'play' } },
    ],
    overlays: [P1('LO QUE TENÉS EN LA MANO', 0, { size: 46 }), P2('TIENE DOMICILIO', 0, { size: 46, color: C.blue })] },

  // 2. 9 de cada 10 celulares, teles y aires salían de Tierra del Fuego
  { id: 'b02', set: 'void', cam: Z(MAPCAM(-0.2)), keywords: ['hace', 'poco,', 'celulares,', 'Tierra'],
    actors: [
      { type: 'mapa', pos: [0.5, 0, 0], p: { dots: ALL, pin: { from: null, to: 'rg', at: W('b02', 'Tierra') }, hl: { at: W('b02', 'Tierra') } } },
      ...Array.from({ length: 10 }, (_, i) => ({ type: 'aparato', pos: [-1.3 + (i % 2) * 0.66, 0, -1.3 + Math.floor(i / 2) * 0.62] as any,
        p: { kind: ['phone', 'tv', 'ac'][i % 3], lit: i < 9 ? W('b02', '9') + i * 0.09 : null } })),
    ],
    overlays: [P1('9 DE CADA 10', '9', { size: 50 }), P2('CELULARES, TELES Y AIRES · HASTA HACE POCO', 'aires', { out: 'Tierra' }), P2('SEGÚN AFARTE', 'Tierra'), ...FUENTE] },

  // 3. Sobre todo, de Río Grande. (la isla de cerca: 8 fábricas en Río Grande, 2 en Ushuaia)
  { id: 'b03', set: 'void', cam: Z({ from: [0.25, 3.0, 3.3], to: [-0.1, 2.75, 2.9], look: [-0.35, 0, 0.15], fov: 42 }), keywords: ['Grande.'],
    actors: [
      { type: 'mapa', pos: ODF, p: { k: KDF, only: 'tdf', pin: { from: null, to: 'rg', at: W('b03', 'Río') }, pinS: 1.5 } },
      ...RG8.map(([x, z], i) => ({ type: 'fabrica', pos: [x, 0.08, z] as any, s: 0.15, p: { lit: C.cyan, color: '#3b2f7a' } })),
      ...US2.map(([x, z]) => ({ type: 'fabrica', pos: [x, 0.08, z] as any, s: 0.15, p: { lit: '#8d7fd0', color: '#2d1a6e' } })),
    ],
    overlays: [P1('RÍO GRANDE · TIERRA DEL FUEGO', 'Río'), P2('8 DE CADA 10 FÁBRICAS DE ELECTRÓNICA', 'Grande'), ...FUENTE] },

  // 4. Lo que tenés en la mano tiene domicilio.
  { id: 'b04', set: 'void', cam: Z({ from: [-0.55, 1.68, 3.4], to: [-0.25, 1.6, 2.95], look: [0, 1.36, 0], fov: 44 }), keywords: ['domicilio.'],
    actors: [
      { type: 'ring', pos: [0, 0.03, 0], p: { r: 0.9, color: C.gold } },
      { type: 'mano', pos: [0, 1.4, 0], rot: [-0.06, 0.25, -0.06], p: { obj: 'phone', screen: 'map', sleeve: '#ff7a3d' } },
      { type: 'pin', pos: [0.02, 1.15, 0.32], rot: [0.15, 0.25, 0], at: 'domicilio', p: { s: 0.75 } },
    ],
    overlays: [...FUENTE] },

  // 5. La lata es de aluminio; una sola fábrica lo hace nuevo, en Puerto Madryn
  { id: 'b05', set: 'void', cam: Z(MAPCAM(0.0)), keywords: ['gaseosa', 'aluminio.', 'Madryn.'],
    actors: [
      { type: 'mapa', pos: [0.62, 0, -0.1], p: { dots: ALL, visited: ['rg'], pin: { from: 'rg', to: 'pm', at: W('b05', 'Puerto') - 0.25, dur: 0.75 } } },
      { type: 'fabrica', pos: [...mp('pm', 1, [0.62 - 0.32, 0, -0.1])] as any, s: 0.2, at: 'fábrica', p: { lit: C.gold, smoke: true } },
      { type: 'lata', pos: [-0.95, 0.72, 0.55], s: 0.9, p: { band: C.magenta } },
      { type: 'lingote', pos: [-1.0, 0, 1.45], at: 'aluminio', p: {} },
    ],
    overlays: [P2('ALUAR: ÚNICA PRODUCTORA DE ALUMINIO PRIMARIO DEL PAÍS', 'fábrica'), P1('PUERTO MADRYN · CHUBUT', 'Madryn'), ...FUENTE] },

  // 6. Hasta 460.000 toneladas por año.
  { id: 'b06', set: 'void', cam: Z({ from: [0.7, 2.55, 5.3], to: [0.25, 2.35, 4.7], look: [0, 0.75, -0.4], fov: 42 }), keywords: ['460.000'],
    actors: [
      { type: 'fabrica', pos: [-0.2, 0, -1.6], s: 1.2, p: { lit: C.gold } },
      { type: 'fabrica', pos: [1.35, 0, -2.2], s: 1.0, p: { lit: C.cyan } },
      { type: 'lingotes', pos: [0, 0, 0.45], at: '460.000', enter: 'none', p: { n: 26, dur: 1.5 } },
      { type: 'lingote', pos: [-0.9, 0, 1.2], p: {} },
    ],
    overlays: [BIG('460.000', '460.000', { count: { to: 460000 }, sub: 'TONELADAS POR AÑO', size: 104 }), P2('CAPACIDAD DE LA PLANTA', 'año', { y: 68.8 }), ...FUENTE] },

  // 7. El caramelo tiene dirección: Arroyito, en Córdoba.
  { id: 'b07', set: 'void', cam: Z(MAPCAM(0.1)), keywords: ['caramelo', 'Arroyito,', 'Córdoba.'],
    actors: [
      { type: 'mapa', pos: [0.68, 0, -0.1], p: { dots: ALL, visited: ['rg', 'pm'], trail: [['rg', 'pm']], pin: { from: 'pm', to: 'ar', at: W('b07', 'Arroyito') - 0.2, dur: 0.7 } } },
      { type: 'caramelo', pos: [-0.62, 0.75, 0.75], s: 0.95, bob: 0.05, p: {} },
    ],
    overlays: [P1('ARROYITO · CÓRDOBA', 'Arroyito'), ...FUENTE] },

  // 8. Ahí nació Arcor en 1951, por ARroyito y CÓRdoba.
  { id: 'b08', set: 'void', cam: Z({ from: [-0.45, 3.1, 5.4], to: [0.05, 2.9, 4.8], look: [0, 0.85, -0.4], fov: 42 }), keywords: ['Arcor', '1951,', 'ARroyito', 'CÓRdoba.'],
    actors: [
      { type: 'ring', pos: [0.95, 0.03, -1.3], p: { r: 0.6, color: C.gold } },
      { type: 'casita', pos: [0.95, 0, -1.3], rot: [0, -0.4, 0], at: 'nació', enter: 'drop' },
      { type: 'caramelitos', pos: [0, 0, 0.9], enter: 'none', p: { n: 12, seed: 7, area: [2.6, 0.7], stagger: 0.01, drop: 0 } },
      { type: 'siglas', pos: [0, 1.75, -0.6], at: 'Arcor', p: { hA: W('b08', 'ARroyito'), hB: W('b08', 'CÓRdoba') } },
    ],
    overlays: [BIG('1951', '1951', { size: 104 }), P2('AR(royito) + COR(doba) = ARCOR', 'CÓRdoba', { y: 68.8 }), ...FUENTE] },

  // 9. El mayor fabricante de caramelos del mundo.
  { id: 'b09', set: 'void', cam: Z({ from: [0.5, 2.25, 5.4], to: [0.1, 2.05, 4.8], look: [0, 1.15, 0], fov: 42 }), keywords: ['fabricante', 'caramelos'],
    actors: [
      { type: 'ring', pos: [0, 0.03, -0.3], p: { r: 1.1, color: C.gold } },
      { type: 'globe', pos: [0, 1.25, -0.4], s: 0.8 },
      { type: 'caramelitos', pos: [0, 0, 0.75], enter: 'none', p: { n: 8, seed: 2, area: [2.6, 0.6], stagger: 0.0, drop: 0 } },
      { type: 'caramelitos', pos: [0, 0, 0.6], at: 'mayor', enter: 'none', p: { n: 16, seed: 9, area: [2.8, 1.0], stagger: 0.07, drop: 2.2 } },
    ],
    overlays: [P1('MAYOR FABRICANTE DE CARAMELOS DEL MUNDO', 'mayor', { size: 32 }), P2('SEGÚN LA NACIÓN', 'mundo'), ...FUENTE] },

  // 10. El aceite sale de moler granos.
  { id: 'b10', set: 'void', cam: Z({ from: [-0.4, 2.15, 5.0], to: [0.05, 2.0, 4.5], look: [0, 0.85, 0], fov: 42 }), keywords: ['aceite', 'granos.'],
    actors: [
      { type: 'granos', pos: [-0.95, 0, 0.35], p: { r: 0.45, h: 0.4 } },
      { type: 'molino', pos: [0.05, 0, -0.35], p: { fallAt: W('b10', 'moler') } },
      { type: 'botella', pos: [0.92, 0, 0.35], p: { fill: 1, fillAt: W('b10', 'moler') - 0.6, dur: 1.4 } },
    ],
    overlays: [P1('GRANO MOLIDO = ACEITE', 'moler'), ...FUENTE] },

  // 11. Tres cuartos de lo que el país puede moler está cerca de Rosario.
  { id: 'b11', set: 'void', cam: Z(MAPCAM(-0.1)), keywords: ['cuartos', 'Rosario.'],
    actors: [
      { type: 'mapa', pos: [0.55, 0, -0.15], p: { dots: ALL, visited: ['rg', 'pm', 'ar'], trail: [['rg', 'pm'], ['pm', 'ar']], pin: { from: 'ar', to: 'ro', at: W('b11', 'Rosario') - 0.25, dur: 0.55 } } },
      { type: 'torta', pos: [-0.95, 0.05, 0.45], s: 0.6, at: 'tres', enter: 'none', p: {} },
      { type: 'granos', pos: [-1.05, 0, -0.75], s: 0.7, p: { r: 0.4, h: 0.32 } },
    ],
    overlays: [P2('75% DE LA CAPACIDAD DE MOLIENDA DEL PAÍS', 'tres'), P1('GRAN ROSARIO · SANTA FE', 'Rosario'), ...FUENTE] },

  // 12. En 2025, esa costa despachó 75,7 millones de toneladas.
  { id: 'b12', set: 'void', cam: Z({ from: [1.9, 3.1, 4.7], to: [1.5, 2.85, 4.1], look: [0.1, 0.35, -0.6], fov: 42 }), keywords: ['despachó', '75,7 millones', 'toneladas.'],
    actors: [
      { type: 'rio', pos: [0.55, 0, -1], p: { w: 1.8, len: 14 } },
      ...[-2.2, -0.2, 1.8].map((z) => ({ type: 'terminal', pos: [-0.85, 0, z] as any, p: { n: 3 } })),
      { type: 'barco', pos: [0.15, 0, -0.2], p: { loadAt: 0.2 } },
      { type: 'barco', pos: [0.95, 0, -3.6], p: { loadAt: -5 }, move: { to: [0.95, 0, 1.2], at: 0, dur: 5.6 } },
    ],
    overlays: [BIG('75,7 MILLONES', '75', { count: { to: 75.7, dec: 1, post: ' MILLONES' }, sub: 'DE TONELADAS · 2025', size: 86 }),
      P2('70 KM DE COSTA · 30 TERMINALES · TIMBÚES A ARROYO SECO', 'toneladas', { y: 68.8 }), ...FUENTE] },

  // 13. Ninguna zona de puertos agrícolas del mundo sacó más (a escala, desde cero)
  { id: 'b13', set: 'void', cam: Z({ from: [0.4, 3.3, 5.4], to: [0.0, 3.1, 4.8], look: [0, 0.55, 0], fov: 42 }), keywords: ['Ninguna', 'agrícolas', 'Comercio'],
    actors: [
      { type: 'box', pos: [0, 0.04, 0], p: { size: [2.8, 0.08, 1.1], color: '#2d1a6e' } },
      { type: 'ranking', pos: [0, 0.08, 0], p: { max: 80, hmax: 1.6, w: 0.72, gap: 0.2, stagger: 0.3, items: [
        { v: 75.7, name: 'GRAN ROSARIO', val: '75,7', c: C.gold }, { v: 74.8, name: 'NUEVA ORLEANS', val: '74,8', c: C.cyan }, { v: 60, name: 'SANTOS', val: '60', c: C.magenta }] } },
    ],
    overlays: [P1('N.º 1 DEL MUNDO', 0.04, { size: 50, color: C.blue }), P2('MÁS QUE NUEVA ORLEANS (74,8) Y SANTOS (60)', 'más', { out: 'Bolsa' }),
      P2('SEGÚN LA BOLSA DE COMERCIO DE ROSARIO', 'Bolsa'), ...FUENTE] },

  // 14. Lo que te pasa por arriba: un satélite armado en Bariloche.
  { id: 'b14', set: 'void', cam: Z(MAPCAM(-0.15)), keywords: ['satélite', 'Bariloche.'],
    actors: [
      { type: 'mapa', pos: [0.4, 0, 0.1], p: { dots: ALL, visited: ['rg', 'pm', 'ar', 'ro'], trail: [['rg', 'pm'], ['pm', 'ar'], ['ar', 'ro']], pin: { from: 'ro', to: 'ba', at: W('b14', 'Bariloche') - 0.3, dur: 0.7 } } },
      { type: 'satelite', pos: [-1.9, 0.6, -1.5], s: 0.55, p: {}, move: { to: [1.2, 0.6, -1.5], at: 0, dur: 3.7 } },
    ],
    overlays: [P2('ARSAT-1 · ARMADO POR INVAP', 'satélite'), P1('BARILOCHE · RÍO NEGRO', 'Bariloche'), ...FUENTE] },

  // 15. En 2014 la Argentina entró al grupo de 8 países que fabricaban satélites así.
  { id: 'b15', set: 'void', cam: Z({ from: [0.35, 2.0, 5.6], to: [0.0, 1.9, 5.0], look: [0, 1.3, 0], fov: 42 }), keywords: ['2014,', 'Argentina', '8', 'fabricaban'],
    actors: [
      { type: 'ring', pos: [0, 0.03, 0], p: { r: 1.2, color: C.cyan } },
      { type: 'orbita', pos: [0, 1.45, 0], s: 0.85, p: { n: 7, newAt: W('b15', 'entró') - 0.3, glowAt: W('b15', '8') } },
    ],
    overlays: [BIG('2014', '2014', { size: 104, out: 'grupo' }), P1('1 DE 8 PAÍSES CON SATÉLITES GEOESTACIONARIOS PROPIOS', '8'),
      P2('2.º DE AMÉRICA, DESPUÉS DE EE. UU.', 'satélites'), ...FUENTE] },

  // 16. Agarrá lo primero que tengas cerca, fijate dónde se hizo y contalo en los comentarios.
  { id: 'b16', set: 'void', cam: Z({ from: [0.5, 2.15, 5.0], to: [0.1, 2.05, 4.4], look: [0, 1.35, 0], fov: 44 }), keywords: ['cerca,', 'comentarios.'],
    actors: [
      { type: 'agarre', pos: [0, 1.1, 0], p: { t1: W('b16', 'lo') + 0.1, t2: W('b16', 'primero') + 0.3, legs: 0.68, sleeve: '#1b1340', lift: 0.6 } },
      { type: 'pregunta', pos: [1.05, 2.05, 0.1], at: 'fijate' },
      { type: 'globito', pos: [-1.1, 1.95, 0.2], rot: [0, 0.2, 0], at: 'contalo', p: { c: C.cyan, w: 0.78 } },
      { type: 'globito', pos: [-1.0, 2.55, 0.0], rot: [0, 0.2, 0], at: 'comentarios', p: { c: C.gold, w: 0.7 } },
    ],
    overlays: [P1('¿DÓNDE SE HIZO LO QUE TENÉS CERCA?', 'cerca'), P2('CONTALO EN LOS COMENTARIOS', 'comentarios')] },
];

// encuadre vertical: sube el contenido para que nada importante quede detrás de las placas (negativo = más arriba)
const SHIFT: Record<string, number> = { b01: -0.02, b02: -0.06, b03: -0.02, b04: -0.02, b05: -0.06, b06: -0.07, b07: -0.06, b08: -0.02,
  b09: -0.05, b10: -0.05, b11: -0.06, b12: -0.06, b13: -0.04, b14: -0.01, b15: -0.02, b16: 0.0 };
export const BEATS: BeatSpec[] = BEATS0.map((b) => ({ ...b, cam: { ...b.cam, shift: SHIFT[b.id] ?? b.cam.shift } }));
