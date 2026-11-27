import type { BeatSpec } from '../../src/Beat';
import { PY, UP, DOWN, AMBER, INK, PAPER } from './props';

// Versión 2: otro look que el original (neón violeta, campana, monedas, línea de precio).
// Acá: redacción de diario (crema, tinta, verde musgo, piso a cuadros) y pizarra de cotizaciones (negro verdoso, LED ámbar,
// paletas verde/rojo sobre la raya blanca de US$ 83). Metáfora: el diario al que le falta una esquina = los 21 centavos.
// Textos 2D: exactamente los de "## Placas por plano" de guion.md. Todo entre 250 px desde arriba y 420 px desde abajo.
const HEAD = '“LA MAYOR SALIDA A BOLSA DE LA HISTORIA”';
const NEWS = { type: 'stage', p: { kind: 'news' } };
const BOARD = { type: 'stage', p: { kind: 'board' } };
const tag = (text: string, at: any, o: any = {}) => ({ type: 'tag' as const, text, at, x: 48, y: 70, color: '#1d3a33', size: 42, ...o });
const FIX = { type: 'tag' as const, text: 'en dólares, Nasdaq', at: 0, x: 48, y: 76.2, color: 'rgba(10,20,22,.85)', size: 30 };
const READER = { shirt: '#2f6f5a', pants: '#2a2f36', hair: '#2a1c12', skin: '#e0b48f' };
const TRADER = { shirt: '#e8e2d0', pants: '#1b2a30', hair: '#15102b', skin: '#c98d62' };
// x de cada día en la pizarra
const DX = { jue: -1.2, vie: -0.4, mar: 0.4, mie: 1.2 };

export const BEATS: BeatSpec[] = [
  // 1. Los diarios titularon: la mayor salida a bolsa de la historia.  (grúa que sube desde el piso de la redacción)
  { id: 'b01', set: 'room', cam: { from: [0.2, 0.7, 7.4], to: [-0.2, 1.9, 6.6], look: [0, 1.25, 0], lookTo: [0, 1.55, 0], fov: 46 }, keywords: ['titularon', 'historia'],
    actors: [
      NEWS,
      { type: 'sheets', pos: [-1.35, 0, 0.9], rot: [0, 0.3, 0], p: { n: 14, dur: 0.01, color: INK } },
      { type: 'sheets', pos: [1.35, 0, 1.0], rot: [0, -0.4, 0], at: 'diarios', enter: 'none', p: { n: 18, dur: 0.6, color: INK } },
      { type: 'paper', pos: [0, 1.55, -0.3], at: 'titularon', enter: 'drop', p: { head: HEAD } },
      { type: 'person', pos: [1.0, 0, 0.5], rot: [0, -0.5, 0], s: 0.9, at: 'mayor', p: { ...READER, pose: 'hold' } },
      { type: 'person', pos: [-1.0, 0, 0.5], rot: [0, 0.5, 0], s: 0.9, at: 'historia', p: { ...READER, shirt: '#b8503a', hair: '#5a3a1a', pose: 'point' } },
    ] },

  // 2. 81.300 millones de dólares en acciones.  (cenital que baja sobre las pilas de acciones)
  { id: 'b02', set: 'room', cam: { from: [0.3, 6.4, 4.2], to: [-0.2, 5.0, 5.4], look: [0, 0.6, 0.2], lookTo: [0, 0.8, 0], fov: 46 }, keywords: ['81.300'],
    actors: [
      NEWS,
      { type: 'sheets', pos: [-1.0, 0, -0.6], enter: 'none', p: { n: 16, dur: 0.5, color: UP } },
      { type: 'sheets', pos: [0, 0, -0.6], at: '81.300', enter: 'none', p: { n: 26, dur: 0.9, color: UP } },
      { type: 'sheets', pos: [1.0, 0, -0.6], at: 'millones', enter: 'none', p: { n: 22, dur: 0.8, color: UP } },
      { type: 'sheets', pos: [-0.5, 0, 0.35], at: 'dólares', enter: 'none', p: { n: 30, dur: 0.8, color: UP, top: 'ACCIÓN' } },
      { type: 'sheets', pos: [0.5, 0, 0.35], at: 'acciones', enter: 'none', p: { n: 20, dur: 0.6, color: UP } },
    ],
    overlays: [{ type: 'big', text: '', count: { to: 81300, pre: 'US$ ', post: ' M' }, sub: '980 millones de acciones x US$ 83', at: '81.300', y: 61, size: 104 }] },

  // 3. Les faltó una parte.  (empujón rápido al diario: la esquina sale volando)
  { id: 'b03', set: 'room', cam: { from: [0.7, 1.9, 5.4], to: [0.35, 1.75, 4.4], look: [0.2, 1.5, -0.3], fov: 46 }, keywords: ['parte'],
    actors: [
      NEWS,
      { type: 'paper', pos: [0, 1.55, -0.3], p: { head: HEAD, tear: 0.3 } },
      { type: 'ring', pos: [0.65, 0.04, 0.4], at: 'parte', p: { r: 0.7, color: DOWN } },
    ],
    overlays: [tag('LE FALTÓ UNA PARTE', 'faltó', { color: DOWN, size: 52 })] },

  // 4. Cuatro días después, la acción valía menos que al salir.  (travelling lateral sobre cuatro calendarios)
  { id: 'b04', set: 'room', cam: { from: [-0.9, 2.1, 7.7], to: [0.7, 2.0, 7.2], look: [-0.4, 1.45, 0], lookTo: [0.4, 1.4, 0], fov: 46 }, keywords: ['Cuatro', 'menos'],
    actors: [
      NEWS,
      { type: 'calendar', pos: [-1.2, 2.45, -0.6], s: 0.44, at: 'Cuatro', p: { top: 'JUE', big: '19', color: '#2f6f5a' } },
      { type: 'calendar', pos: [-0.4, 2.45, -0.6], s: 0.44, at: 'días', p: { top: 'VIE', big: '20', color: '#2f6f5a' } },
      { type: 'calendar', pos: [0.4, 2.45, -0.6], s: 0.44, at: 'después', p: { top: 'LUN', big: '23', color: '#2f6f5a' } },
      { type: 'calendar', pos: [1.2, 2.45, -0.6], s: 0.44, at: 'la', p: { top: 'MAR', big: '24', color: DOWN } },
      { type: 'line83', pos: [0, 1.0, 0], p: { w: 3.4, red: 2.3, lx: -0.55 } },
      { type: 'sheets', pos: [0.9, 1.05, 0.1], s: 0.7, enter: 'none', p: { n: 6, dur: 0.01, color: UP, top: 'ACCIÓN' }, move: { to: [0.9, 0.35, 0.1], at: 'menos', dur: 0.6 } },
      { type: 'arrow', pos: [0.15, 1.55, 0.2], rot: [0, 0, Math.PI], at: 'menos', s: 0.8, p: { len: 0.9, color: DOWN } },
    ],
    overlays: [tag('4 DÍAS DESPUÉS: MENOS QUE AL SALIR', 'después', { color: DOWN, size: 38 })] },

  // 5. Es Anthropic, la empresa que hace Claude, un asistente de inteligencia artificial.  (órbita alrededor del escritorio)
  { id: 'b05', set: 'room', cam: { from: [1.4, 2.3, 6.4], to: [-1.0, 2.15, 6.6], look: [0, 1.35, -0.4], fov: 46 }, keywords: ['Anthropic', 'Claude', 'inteligencia'],
    actors: [
      NEWS,
      { type: 'label', pos: [0, 2.75, -1.4], at: 'Anthropic', p: { text: 'ANTHROPIC', w: 2.0, h: 0.42, bg: INK, color: PAPER, size: 0.62, weight: 900 } },
      { type: 'desk', pos: [0, 0, -0.6], s: 1.25 },
      { type: 'screen', pos: [0, 1.62, -0.85], s: 0.85, at: 'empresa', p: { kind: 'chat' } },
      { type: 'person', pos: [0.05, 0, 0.35], rot: [0, Math.PI, 0], at: 'hace', p: { ...READER, pose: 'type' } },
      { type: 'label', pos: [-0.85, 2.15, -0.5], rot: [0, 0, 0.06], at: 'Claude', p: { text: 'Claude', w: 0.95, h: 0.36, bg: '#2f6f5a', color: '#fff', size: 0.66, weight: 800 } },
      { type: 'box', pos: [0.95, 2.0, -0.5], at: 'asistente', p: { size: [0.6, 0.18, 0.02], color: PAPER } },
      { type: 'box', pos: [0.85, 1.75, -0.5], at: 'inteligencia', p: { size: [0.7, 0.18, 0.02], color: '#9fd8c0' } },
      { type: 'box', pos: [0.95, 1.5, -0.5], at: 'artificial', p: { size: [0.5, 0.18, 0.02], color: PAPER } },
    ],
    overlays: [{ type: 'plate', name: 'ANTHROPIC', role: 'la empresa que hace Claude', at: 'Anthropic', y: 68 }] },

  // 6. Vendió cada acción a 83 dólares, más de lo esperado.  (contrapicado que se acerca al medidor)
  { id: 'b06', set: 'room', cam: { from: [0.5, 0.9, 6.6], to: [-0.2, 1.35, 5.9], look: [0, 1.75, 0], lookTo: [0, 1.65, 0], fov: 46 }, keywords: ['83', 'esperado'],
    actors: [
      NEWS,
      { type: 'box', pos: [0, 0.55, -0.2], p: { size: [3.0, 1.1, 0.4], color: '#2a2f36' } },
      { type: 'gauge', pos: [0, 1.25, 0], p: { r: 1.25, swing: 1.3 } },
      { type: 'sheets', pos: [-1.2, 1.1, 0.35], s: 0.6, at: 'cada', p: { n: 8, dur: 0.4, color: UP, top: 'ACCIÓN' } },
    ],
    overlays: [tag('PRECIO DE SALIDA: US$ 83', '83', { y: 69, color: '#7a5408', size: 46 }), tag('esperaban de 70 a 78', 'esperado', { y: 75.3, color: '#1d3a33', size: 36 })] },

  /* ---------- Pizarra de cotizaciones (planos 7 a 13): placa fija "en dólares, Nasdaq" y raya de 83 siempre visible ---------- */
  // 7. Jueves 19 de noviembre: abre a 111,50.  (travelling lateral bajo, la paleta sube)
  { id: 'b07', set: 'room', cam: { from: [-1.0, 1.5, 7.2], to: [0.4, 1.8, 6.8], look: [-0.5, 1.55, 0], lookTo: [-0.2, 1.65, 0], fov: 46 }, keywords: ['Jueves', '111,50'],
    actors: [
      BOARD,
      { type: 'line83', pos: [0, PY(83), 0], p: { w: 3.4, lx: 0.1 } },
      { type: 'led', pos: [0.75, 2.55, -1.4], at: 'noviembre', p: { w: 1.7, h: 0.8, rows: [{ t: 'JUE 19/11', c: '#9fe8ff', s: 0.5 }, { t: '111,50 ▲', c: UP, s: 0.7 }] } },
      { type: 'lolli', pos: [DX.jue, 0, 0], at: 'abre', enter: 'none', p: { v: 111.5, dur: 0.6, day: 'JUE', tag: '111,50' } },
      { type: 'person', pos: [1.3, 0, 0.6], rot: [0, -0.6, 0], s: 0.9, p: { ...TRADER, pose: 'idle' }, out: 'abre' },
      { type: 'person', pos: [1.3, 0, 0.6], rot: [0, -0.6, 0], s: 0.9, at: 'abre', enter: 'none', p: { ...TRADER, pose: 'cheer' } },
    ],
    overlays: [tag('JUEVES 19/11 · ABRE: US$ 111,50', 'Jueves', { y: 69.5, color: '#14532f', size: 40 }), FIX] },

  // 8. Al abrir, vale cerca de dos billones de dólares.  (grúa que sube con la torre)
  { id: 'b08', set: 'room', cam: { from: [0.9, 0.8, 6.4], to: [0.4, 2.2, 7.0], look: [0, 1.0, 0], lookTo: [0, 1.7, 0], fov: 46 }, keywords: ['billones'],
    actors: [
      BOARD,
      { type: 'line83', pos: [0, PY(83), 0.6], p: { w: 3.4, label: '' } },
      ...[-0.45, 0.45].flatMap((x) => [-0.3, 0.3].map((z, j) => ({ type: 'sheets', pos: [x, 0, z - 0.4] as [number, number, number], at: j ? 'vale' : 'abrir', enter: 'none' as const, p: { n: 54, dur: 1.6, color: AMBER } }))),
      { type: 'ring', pos: [0, 0.04, -0.4], at: 'billones', p: { r: 1.2, color: AMBER } },
    ],
    overlays: [{ type: 'big', text: '~US$ 2 BILLONES', sub: 'al abrir', at: 'billones', y: 59, size: 84 }, FIX] },

  // 9. Pero cierra en 97.  (empujón sobre la paleta que baja)
  { id: 'b09', set: 'room', cam: { from: [-0.4, 2.0, 6.0], to: [-0.9, 1.9, 5.0], look: [-1.0, 1.75, 0], fov: 46 }, keywords: ['97'],
    actors: [
      BOARD,
      { type: 'line83', pos: [0, PY(83), 0], p: { w: 3.4, label: '' } },
      { type: 'lolli', pos: [DX.jue, 0, 0], enter: 'none', p: { v0: 111.5, v: 97.17, delay: 0.2, dur: 0.9, day: 'JUE', tag: '97,17' } },
      { type: 'led', pos: [-0.5, 2.8, -1.4], at: 'cierra', p: { w: 1.5, h: 0.7, rows: [{ t: 'CIERRE', c: AMBER, s: 0.5 }, { t: '97,17', c: UP, s: 0.7 }] } },
    ],
    overlays: [tag('CIERRE DÍA 1: US$ 97,17', 'cierra', { y: 69.5, color: '#14532f', size: 46 }), FIX] },

  // 10. El viernes caen las tecnológicas y pierde 8,5 por ciento.  (paneo de derecha a izquierda, en picado)
  { id: 'b10', set: 'room', cam: { from: [1.1, 3.3, 6.8], to: [-0.6, 2.9, 6.6], look: [0.4, 1.0, 0], lookTo: [-0.3, 1.1, 0], fov: 46 }, keywords: ['tecnológicas', '8,5'],
    actors: [
      BOARD,
      { type: 'line83', pos: [0, PY(83), 0.2], p: { w: 3.6, lx: -1.3 } },
      { type: 'lolli', pos: [DX.jue, 0, 0.2], p: { v: 97.17, dur: 0.01, day: 'JUE' } },
      { type: 'fall', pos: [0.2, 0, -0.9], p: { h0: 1.7, h1: 0.55, fall: 0.7, label: 'TEC' } },
      { type: 'fall', pos: [0.8, 0, -0.9], p: { h0: 1.9, h1: 0.6, fall: 0.85, label: 'TEC' } },
      { type: 'fall', pos: [1.4, 0, -0.9], p: { h0: 1.5, h1: 0.5, fall: 1.0, label: 'TEC' } },
      { type: 'lolli', pos: [DX.vie, 0, 0.2], at: 'pierde', enter: 'none', p: { v0: 97.17, v: 88.91, dur: 0.7, day: 'VIE' } },
    ],
    overlays: [tag('VIERNES 20/11 · −8,5%', 'viernes', { y: 69.5, color: DOWN, size: 48 }), FIX] },

  // 11. El martes, 81,91: abajo de los 83.  (dolly out frontal: la raya se pone roja)
  { id: 'b11', set: 'room', cam: { from: [0.1, 1.5, 5.6], to: [0.5, 1.75, 6.9], look: [0.3, 1.1, 0], fov: 46 }, keywords: ['81,91', '83'],
    actors: [
      BOARD,
      { type: 'line83', pos: [0, PY(83), 0], p: { w: 3.6, lx: -0.95, red: 2.85 } },
      { type: 'lolli', pos: [DX.jue, 0, 0], p: { v: 97.17, dur: 0.01, day: 'JUE' } },
      { type: 'lolli', pos: [DX.vie, 0, 0], p: { v: 88.91, dur: 0.01, day: 'VIE' } },
      { type: 'lolli', pos: [DX.mar, 0, 0], at: '81,91', enter: 'none', p: { v0: 88.91, v: 81.91, dur: 0.8, day: 'MAR', tag: '81,91' } },
      { type: 'led', pos: [0.4, 2.55, -1.4], at: 'martes', p: { w: 1.6, h: 0.7, rows: [{ t: 'MAR 24/11', c: '#9fe8ff', s: 0.5 }, { t: '81,91 ▼', c: DOWN, s: 0.7 }] } },
    ],
    overlays: [tag('MARTES 24/11 · US$ 81,91 · bajo los 83', '81,91', { y: 69.5, color: DOWN, size: 36 }), FIX] },

  // 12. Miércoles 25 de noviembre: cierra en 82,79.  (bajada en picado a la altura de la raya)
  { id: 'b12', set: 'room', cam: { from: [1.0, 3.0, 6.8], to: [0.6, 1.5, 6.2], look: [0.5, 1.1, 0], lookTo: [0.5, 1.0, 0], fov: 46 }, keywords: ['25', '82,79'],
    actors: [
      BOARD,
      { type: 'line83', pos: [0, PY(83), 0], p: { w: 3.6, lx: 0.0 } },
      { type: 'lolli', pos: [DX.jue, 0, 0], p: { v: 97.17, dur: 0.01, day: 'JUE' } },
      { type: 'lolli', pos: [DX.vie, 0, 0], p: { v: 88.91, dur: 0.01, day: 'VIE' } },
      { type: 'lolli', pos: [DX.mar, 0, 0], p: { v: 81.91, dur: 0.01, day: 'MAR' } },
      { type: 'lolli', pos: [DX.mie, 0, 0], at: 'cierra', enter: 'none', p: { v: 82.79, dur: 0.6, day: 'MIÉ', tag: '82,79' } },
      { type: 'led', pos: [-0.3, 2.6, -1.4], at: 'noviembre', p: { w: 1.7, h: 0.7, rows: [{ t: 'MIÉ 25/11', c: '#9fe8ff', s: 0.5 }, { t: '82,79', c: DOWN, s: 0.7 }] } },
    ],
    overlays: [tag('CIERRE 25/11/2026 · US$ 82,79', 'cierra', { y: 69.5, color: '#1d3a33', size: 42 }), FIX] },

  // 13. 21 centavos abajo del precio de salida.  (macro: la esquina del diario tapa el hueco entre 82,79 y la raya)
  { id: 'b13', set: 'room', cam: { from: [1.75, 0.98, 2.3], to: [1.4, 0.9, 1.6], look: [1.25, 0.84, 0], fov: 40 }, keywords: ['21', 'salida'],
    actors: [
      BOARD,
      { type: 'line83', pos: [0, PY(83), 0], p: { w: 3.6, lx: 0.3 } },
      { type: 'lolli', pos: [DX.mie, 0, 0], p: { v: 82.79, dur: 0.01, r: 0.06 } },
      { type: 'piece', pos: [2.3, 1.7, 0.4], rot: [0.3, -0.5, 0.4], s: 0.25, at: 'centavos', p: { head: HEAD }, move: { to: [1.04, 1.17, 0.12], at: 'abajo', dur: 0.8 } },
    ],
    overlays: [{ type: 'big', text: '−21 CENTAVOS', sub: 'vs US$ 83', at: '21', y: 60, red: true, size: 96 }, FIX] },

  // 14. Esto no es consejo de inversión.  (órbita corta en la redacción)
  { id: 'b14', set: 'room', cam: { from: [-0.9, 2.2, 6.4], to: [0.1, 2.1, 6.0], look: [0, 1.3, 0], fov: 46 }, keywords: ['consejo'],
    actors: [
      NEWS,
      { type: 'desk', pos: [0.6, 0, -0.5], s: 1.2 },
      { type: 'sheets', pos: [0.6, 0.97, -0.5], s: 0.8, enter: 'none', p: { n: 6, dur: 0.01, color: UP, top: 'ACCIÓN' } },
      { type: 'warn', pos: [-0.55, 0, 0.5], s: 1.2, at: 'no', enter: 'pop' },
    ],
    overlays: [tag('NO ES CONSEJO DE INVERSIÓN', 'no', { y: 70, color: '#7a5408', size: 46 })] },

  // 15. ¿Vuelve arriba de 83 este año? Escribí sí o no.  (vuelve el diario roto; grúa que baja a los botones)
  { id: 'b15', set: 'room', cam: { from: [0.3, 2.6, 7.6], to: [-0.2, 1.8, 6.9], look: [0, 1.6, -0.6], lookTo: [0, 1.3, 0], fov: 46 }, keywords: ['83', 'sí', 'no'],
    actors: [
      NEWS,
      { type: 'paper', pos: [0, 1.65, -1.2], s: 0.95, p: { head: HEAD, torn: true } },
      { type: 'line83', pos: [0, 0.75, 0.5], p: { w: 3.4, label: '' } },
      { type: 'vote', pos: [-0.75, 0, 0.9], s: 0.85, at: 'sí', p: { text: 'SÍ', color: UP } },
      { type: 'vote', pos: [0.75, 0, 0.9], s: 0.85, at: 'no.', p: { text: 'NO', color: DOWN } },
    ],
    overlays: [tag('¿VUELVE ARRIBA DE US$ 83 ESTE AÑO?', '¿Vuelve', { y: 63, color: '#1d3a33', size: 40 }), { type: 'big', text: 'SÍ / NO', at: 'Escribí', y: 67.5, size: 96 }] },
];
