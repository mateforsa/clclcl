import type { BeatSpec } from '../../src/Beat';
import timing from './timing.json';
import { L, BEAM } from './props';

// Video suelto (no es serie). Look propio: living de noche con una consola vieja sobre un mueble bajo y, por la ventana, una nube con
// un servidor a lo lejos, unidos por un haz de datos cian. Imagen que abre y cierra: dos cronómetros sobre dos consolas genéricas
// (planos 1-2 y 13). Textos 2D = solo los de "## Placas por plano" (tags, sin pill, borde inferior <= 1450 px). Sin carteles 3D,
// sin logos, la tele muestra una ciudad genérica. Barras del plano 9 a escala: 175,2 y 184,5 ms.
// Anclas: todas con W() = palabra EXACTA del timing (sin choques por prefijo: "9" vs "9,3", "10", etc.).
type V3 = [number, number, number];
const PANEL = 'rgba(10,14,22,.9)';
const fit = (text: string, max: number, px = 760) => Math.min(max, Math.floor(px / (text.length * 0.72)));
const P1 = (text: string, at: any, o: any = {}) => ({ type: 'tag' as const, text, at, x: 46, y: 65.5, color: PANEL, size: fit(text, 46), ...o });
const P2 = (text: string, at: any, o: any = {}) => ({ type: 'tag' as const, text, at, x: 46, y: 69.6, color: PANEL, size: fit(text, 40), ...o });
const SMALL = (text: string, y: number, at: any = 0, size = 20) => ({ type: 'tag' as const, text, at, x: 46, y, color: 'rgba(10,14,22,.78)', size });

const B = (timing as any).beats as { id: string; start: number; end: number; words: { w: string; s: number; e: number }[] }[];
const DUR = (id: string) => { const i = B.findIndex((x) => x.id === id); const e = B[i + 1] ? B[i + 1].start : (timing as any).duration; return e - B[i].start; };
/** segundos desde el inicio del plano hasta la palabra EXACTA `word` (n-ésima aparición) */
const W = (id: string, word: string, nth = 1): number => {
  const b = B.find((x) => x.id === id)!; let k = nth;
  for (const w of b.words) if (w.w === word && --k === 0) return w.s - b.start;
  throw new Error(`[${id}] no está "${word}"`);
};
const FU = SMALL('DIGITAL FOUNDRY, VÍA VANDAL (27/11/2026) Y 3DJUEGOS (28/11/2026)', 73.4);
const FU13 = SMALL('FUENTE: XBOX WIRE (18/07/2016)', 73.4);

const S = L.stand, H = S.h;
const WORLD = (p: any = {}) => ({ type: 'world', p });
const STAND = { type: 'stand', pos: [S.x, 0, S.z] as V3 };
const TV = (p: any = {}) => ({ type: 'tv', pos: [L.tv.x, L.tv.y, L.tv.z] as V3, p });
const NEWC = (p: any = {}, o: any = {}) => ({ type: 'newc', pos: [L.newc.x, H, L.newc.z] as V3, p, ...o });
const OLDC = (p: any = {}, o: any = {}) => ({ type: 'oldc', pos: [L.oldc.x, H, L.oldc.z] as V3, p, ...o });
const WATCH_N: V3 = [L.newc.x, 0.84, -1.72], WATCH_O: V3 = [L.oldc.x + 0.02, 0.84, -1.72];
const ROOM = (w: any = {}, tv: any = {}) => [WORLD(w), STAND, TV(tv)];
// camino de la señal del plano 8: control -> consola -> haz -> nube -> haz -> consola -> tele
const PAD8: V3 = [-0.25, 0.47, -0.95];
const SIG: V3[] = [PAD8, [-0.2, 0.5, -1.4], [L.oldc.x + 0.1, H + 0.06, L.oldc.z], ...BEAM.slice(0), ...BEAM.slice(0, -1).reverse(), [L.oldc.x + 0.1, H + 0.06, L.oldc.z],
  [L.tv.x + 0.3, L.tv.y + 0.1, L.tv.z + 0.08], [L.tv.x, L.tv.y + 0.29, L.tv.z + 0.05]];
// cable de red del plano 10: caja de fibra en la pared -> baja -> por atrás del mueble -> consola vieja
const FIB: V3 = [0.3, 0.7, L.wallZ + 0.09];
const ETH: V3[] = [[FIB[0], FIB[1] - 0.13, FIB[2] + 0.01], [0.3, 0.42, L.wallZ + 0.1], [0.12, H + 0.012, -2.1], [L.oldc.x + 0.12, H + 0.012, -2.1], [L.oldc.x + 0.12, H + 0.04, L.oldc.z - 0.16]];
const PAD10: V3 = [-0.05, H + 0.03, -1.66];
const USB: V3[] = [[PAD10[0], PAD10[1], PAD10[2] - 0.16], [PAD10[0] - 0.05, H + 0.008, -1.78], [L.oldc.x + 0.2, H + 0.008, -1.73], [L.oldc.x + 0.2, H + 0.04, L.oldc.z + 0.16]];

export const BEATS: BeatSpec[] = [
  // 1. GTA 6 en la Series S: 175,2 milisegundos.
  { id: 'b01', set: 'void', cam: { from: [-0.85, 0.98, 2.2], to: [-0.95, 0.96, 1.9], look: [-1.0, 0.6, -1.9], fov: 40, shift: -0.04 }, keywords: ['Series S:', '175,2'],
    actors: [...ROOM(), NEWC(), OLDC(),
      { type: 'halo', pos: [L.newc.x, H + 0.005, L.newc.z], at: W('b01', 'Series S:'), p: { r: 0.17, color: '#27e0d8' } },
      { type: 'watch', pos: WATCH_N, s: 0.8, p: { run: [W('b01', 'Series S:'), W('b01', 'milisegundos.')], total: 0.48 } },
    ],
    overlays: [P1('SERIES S NATIVA: 175,2 MS', W('b01', '175,2')), FU] },

  // 2. En una Xbox One S, por la nube: 184,5.
  { id: 'b02', set: 'void', cam: { from: [-0.3, 0.98, 2.9], to: [-0.15, 0.96, 2.6], look: [-0.4, 0.62, -2.0], fov: 42, shift: -0.04 }, keywords: ['Xbox One S,', 'nube:', '184,5.'],
    actors: [...ROOM(), NEWC(), OLDC({ glow: 1 }),
      { type: 'watch', pos: WATCH_N, s: 0.8, p: { run: [-1, -0.5], total: 0.48 } },
      { type: 'watch', pos: WATCH_O, s: 0.8, at: W('b02', 'Xbox One S,'), p: { run: [W('b02', 'Xbox One S,') + 0.2, W('b02', '184,5.') + 0.3], total: 0.505, color: '#ffb52e' } },
      { type: 'beam', p: { grow: [W('b02', 'nube:') - 0.3, 0.8] } },
    ],
    overlays: [P1('XBOX ONE S POR LA NUBE: 184,5 MS', W('b02', '184,5.')), FU] },

  // 3. Y esa consola no puede instalar el juego.
  { id: 'b03', set: 'void', cam: { from: [-0.15, 0.85, 1.75], to: [-0.25, 0.83, 1.45], look: [-0.32, 0.55, -1.9], fov: 40, shift: -0.04 }, keywords: ['instalar'],
    actors: [...ROOM({}, { on: false }), OLDC(), NEWC({ on: false }),
      { type: 'case', pos: [L.oldc.x, 0.765, -1.75], p: {} },
      { type: 'install', pos: [L.oldc.x, 0.5, -1.6], at: W('b03', 'puede'), p: { fill: [0, 0.6], max: 0.32, fail: W('b03', 'instalar') + 0.25 } },
      { type: 'cross', pos: [L.oldc.x, 0.77, -1.65], at: W('b03', 'instalar') + 0.3, p: { size: 0.22 } },
    ],
    overlays: [P1('NO PUEDE INSTALAR GTA 6', W('b03', 'no')), FU] },

  // 4. Lo midió Digital Foundry, que analiza juegos.
  { id: 'b04', set: 'void', cam: { from: [1.1, 0.95, 2.1], to: [0.9, 0.93, 1.8], look: [-0.4, 0.55, -1.5], fov: 42, shift: -0.04 }, keywords: ['Digital Foundry,', 'analiza'],
    actors: [...ROOM({}, { fps: 30, speed: 0.04 }), NEWC(), OLDC(),
      { type: 'rig', pos: [-0.72, 0, -0.95], s: 0.75, p: {} },
      { type: 'table', pos: [0.05, 0, -1.05], p: { size: [0.55, 0.4, 0.4], color: '#2b211b' } },
      { type: 'notebook', pos: [0.05, 0.4, -1.02], rot: [0, -0.5, 0], at: W('b04', 'Digital Foundry,'), p: { at: W('b04', 'que') } },
    ],
    overlays: [P1('MEDICIÓN DE DIGITAL FOUNDRY', W('b04', 'Digital Foundry,')), FU] },

  // 5. El juego corre en un servidor de Microsoft y le manda la imagen por internet.
  { id: 'b05', set: 'void', cam: { from: [0.2, 1.3, -0.4], to: [0.35, 1.35, -0.85], look: [2.2, 1.35, -10], fov: 42, shift: -0.04 }, keywords: ['servidor', 'Microsoft', 'imagen'],
    actors: [WORLD({ noCloud: true }), STAND, TV(), OLDC({ glow: 1 }),
      { type: 'cloud', pos: [L.cloud.x, L.cloud.y + 0.55, L.cloud.z], p: { glow: 0.5 } },
      { type: 'beam', p: { n: 6 } },
      { type: 'beam', at: W('b05', 'imagen'), enter: 'none', p: { frames: true, n: 5, speed: 0.4, dir: -1 } },
    ],
    overlays: [P1('XBOX CLOUD GAMING', W('b05', 'servidor')), P2('SERVIDOR CON HARDWARE DE SERIES X', W('b05', 'servidor')), FU] },

  // 6. A la One S le llega la versión de Series S.
  { id: 'b06', set: 'void', cam: { from: [1.6, 2.6, 4.3], to: [1.45, 2.55, 4.0], look: [-0.55, 0.42, -0.9], fov: 40, shift: -0.04 }, keywords: ['One S', 'versión', 'Series S.'],
    actors: [...ROOM({ shadeA: 0.97, lamp: 0.6 }, { fps: 30, speed: 0.04 }), NEWC(), OLDC({ glow: 1 }),
      { type: 'beam', p: { n: 5 } },
      { type: 'beam', at: W('b06', 'llega'), enter: 'none', p: { frames: true, n: 4, speed: 0.45, dir: -1 } },
      { type: 'couch', pos: [-0.3, 0, 0.3], rot: [0, Math.PI, 0], s: 0.7 },
      { type: 'guy', pos: [-0.3, 0.06, 0.32], rot: [0, Math.PI, 0], s: 0.7, p: { pose: 'sit', shirt: '#3a8dff' } },
      { type: 'pad', pos: [-0.3, 0.55, 0.0], rot: [0.4, 0, 0], s: 0.8, p: {} },
    ],
    overlays: [P1('LA ONE S RECIBE LA VERSIÓN DE SERIES S', W('b06', 'llega')), P2('THOMAS MORGAN, DIGITAL FOUNDRY', 0, { size: 24 }), FU] },

  // 7. La imagen se estira de 720 a 1080, entre 20 y 30 cuadros por segundo.
  { id: 'b07', set: 'void', cam: { from: [-0.68, 0.98, 0.6], to: [-0.75, 0.96, 0.35], look: [-0.75, 0.85, -2.1], fov: 40, shift: -0.04 }, keywords: ['720', '1080,', '20 y 30'],
    actors: [...ROOM({}, { imgKf: [[0, 0.667], [W('b07', '720') + 0.3, 0.667], [W('b07', '1080,') + 0.3, 1]], fps: 25, fpsAt: W('b07', 'entre'), speed: 0.05 }) ],
    overlays: [P1('720p → 1080p (FSR 4.1) · 20-30 FPS', W('b07', '720')), FU] },

  // 8. Esos milisegundos son la latencia: lo que pasa entre apretar un botón y verlo en la pantalla.
  { id: 'b08', set: 'void', cam: { from: [0.8, 1.2, 1.7], to: [0.65, 1.17, 1.4], look: [-0.35, 0.62, -1.4], fov: 42, shift: -0.04 }, keywords: ['latencia:', 'botón', 'pantalla.'],
    actors: [...ROOM({}, { flashAt: W('b08', 'pantalla.') }), NEWC(), OLDC({ glow: 0.8 }),
      { type: 'beam', p: { n: 5 } },
      { type: 'table', pos: [-0.25, 0, -0.95], p: { size: [0.55, 0.42, 0.4], color: '#2b211b' } },
      { type: 'pad', pos: PAD8, p: { press: [W('b08', 'botón')] } },
      { type: 'finger', s: 0.8, pos: [PAD8[0] + 0.085, PAD8[1] + 0.03, PAD8[2] - 0.03], at: W('b08', 'apretar') - 0.4, p: { press: W('b08', 'botón') - W('b08', 'apretar') + 0.4 } },
      { type: 'signal', p: { pts: SIG, run: [W('b08', 'botón') + 0.1, W('b08', 'pantalla.') - W('b08', 'botón') - 0.1] } },
    ],
    overlays: [P1('LATENCIA (INPUT LAG) = BOTÓN → PANTALLA', W('b08', 'latencia:')), FU] },

  // 9. Por la nube son 9,3 más, menos de una centésima de segundo.
  { id: 'b09', set: 'void', cam: { from: [0.0, 1.25, 3.6], to: [-0.1, 1.22, 3.3], look: [-0.05, 0.95, -1.6], fov: 42, shift: -0.04 }, keywords: ['9,3', 'centésima'],
    actors: [WORLD({ lamp: 0.6 }), STAND,
      { type: 'timebars', pos: [0.1, 1.0, -1.55], p: { at: -0.3, gap: W('b09', '9,3'), scale: 1.4 / 184.5 } },
      { type: 'newc', pos: [-0.85, 1.22, -1.55], s: 0.55, p: {} },
      { type: 'oldc', pos: [-0.85, 0.98, -1.55], s: 0.55, p: {} },
    ],
    overlays: [P1('184,5 − 175,2 = +9,3 MS', W('b09', '9,3')), FU] },

  // 10. Eso sí, probaron con fibra, cable de red y el control enchufado.
  { id: 'b10', set: 'void', cam: { from: [0.45, 1.0, 0.75], to: [0.35, 0.98, 0.45], look: [-0.2, 0.5, -2.0], fov: 42, shift: -0.04 }, keywords: ['fibra,', 'cable', 'control'],
    actors: [...ROOM({}, { fps: 30, speed: 0.04 }), NEWC(), OLDC(),
      { type: 'fiber', pos: FIB, at: W('b10', 'fibra,') },
      { type: 'cable', p: { pts: ETH, grow: [W('b10', 'cable'), 0.6], color: '#2a6bd8' } },
      { type: 'pad', pos: PAD10, at: W('b10', 'control'), p: { cable: true } },
      { type: 'cable', p: { pts: USB, grow: [W('b10', 'control') + 0.15, 0.5], color: '#15171b', r: 0.008 } },
    ],
    overlays: [P1('FIBRA ÓPTICA · CABLE DE RED', W('b10', 'fibra,')), P2('CONTROL CON CABLE', W('b10', 'control')), FU] },

  // 11. Con otra conexión, en tu casa puede andar distinto.
  { id: 'b11', set: 'void', cam: { from: [-0.4, 1.1, 3.0], to: [-0.3, 1.08, 2.7], look: [-0.25, 0.72, -2.0], fov: 42, shift: -0.04 }, keywords: ['conexión,', 'casa', 'distinto.'],
    actors: [...ROOM({}, { fps: 30, uneven: true, speed: 0.04 }), OLDC({ glow: 0.5 }),
      { type: 'router', pos: [-0.98, H, -1.95], at: W('b11', 'otra') },
      { type: 'beam', p: { n: 6, flicker: true, speed: 0.35 } },
    ],
    overlays: [P1('CON WIFI O OTRA CONEXIÓN, PUEDE CAMBIAR', W('b11', 'conexión,')), FU] },

  // 12. Y los cuadros llegan desparejos, así que se siente menos fluido.
  { id: 'b12', set: 'void', cam: { from: [1.2, 1.0, 0.9], to: [1.05, 0.98, 0.6], look: [-0.3, 0.65, -2.1], fov: 42, shift: -0.04 }, keywords: ['cuadros', 'desparejos,', 'fluido.'],
    actors: [...ROOM({}, { fps: 24, uneven: true, speed: 0.06 }), NEWC(), OLDC({ glow: 0.8 }),
      { type: 'beam', p: { n: 3 } },
      { type: 'beam', p: { frames: true, n: 6, speed: 0.4, dir: -1, uneven: true } },
    ],
    overlays: [P1('CUADROS DESPAREJOS', W('b12', 'cuadros')), P2('YA SE LO AVISARON A MICROSOFT', W('b12', 'así')), FU] },

  // 13. Una consola de hace 10 años, a 9 milisegundos de la nueva.
  { id: 'b13', set: 'void', cam: { from: [-0.3, 0.98, 2.9], to: [-0.15, 0.96, 2.6], look: [-0.45, 0.6, -2.0], fov: 42, shift: -0.04 }, keywords: ['10', '9', 'nueva.'],
    actors: [...ROOM({}, { fps: 30, speed: 0.04 }), NEWC(), OLDC({ glow: 1 }),
      { type: 'beam', p: { n: 6 } },
      { type: 'watch', pos: WATCH_N, s: 0.8, p: { run: [-1, -0.5], total: 0.48 } },
      { type: 'watch', pos: WATCH_O, s: 0.8, p: { run: [-1, -0.5], total: 0.505, color: '#ffb52e' } },
      { type: 'halo', pos: [L.oldc.x, H + 0.005, L.oldc.z], at: W('b13', '10'), p: { r: 0.3 } },
      { type: 'halo', pos: [L.newc.x, H + 0.005, L.newc.z], at: W('b13', 'nueva.'), p: { r: 0.17, color: '#27e0d8' } },
    ],
    overlays: [P1('10 AÑOS · +9 MS', W('b13', '10')), FU13] },

  // 14. ¿Nube o consola nueva? Elegí una, abajo.
  { id: 'b14', set: 'void', cam: { from: [-0.1, 1.05, 4.0], to: [-0.2, 1.03, 3.7], look: [-0.2, 0.72, -2.2], fov: 44, shift: -0.04 }, keywords: ['¿Nube', 'nueva?'],
    actors: [WORLD({ noCloud: true }), STAND, TV({ fps: 30, speed: 0.04 }), OLDC({ glow: 0.6 }),
      { type: 'cloud', pos: [L.cloud.x, L.cloud.y + 0.55, L.cloud.z], p: { glow: 1 } },
      { type: 'beam', p: { n: 7 } },
      { type: 'newc', pos: [L.newc.x, H, L.newc.z], at: W('b14', 'consola'), s: 1.0, p: {} },
      { type: 'halo', pos: [L.newc.x, H + 0.005, L.newc.z], at: W('b14', 'nueva?'), p: { r: 0.17, color: '#27e0d8' } },
    ],
    overlays: [P1('¿NUBE O CONSOLA NUEVA?', 0)] },
];
