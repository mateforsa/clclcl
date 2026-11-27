import type { BeatSpec } from '../../src/Beat';
import { C } from '../../src/kit/math';

const PI = Math.PI;
const PANEL = 'rgba(20,10,46,.92)';
// muñecos genéricos (sin caras ni nombres de personas reales)
const JUEZ = { shirt: '#15102b', pants: '#15102b', hair: '#8d8aa0', skin: '#e3ad80' };
const TRAJE = { shirt: '#3b4a8a', pants: '#15102b', hair: '#3a2a1a', skin: '#f2c39b' };
const TRAJE2 = { shirt: '#2a2350', pants: '#15102b', hair: '#7a3b1a', skin: '#c98d62' };

// Texto 2D: todo con el borde inferior en 1450 px o menos, y a la izquierda del 12 % derecho.
// PLACA 1 centrada en 65,5 % (1258 px), PLACA 2 en 70 % (1344 px, alto ~60 px -> borde ~1375), fuentes en 74 % (borde ~1440).
const X = 46;
const P1 = (text: string, at: any, o: any = {}) => ({ type: 'tag' as const, text, at, x: X, y: 65.5, color: o.red ? C.red : PANEL, size: 44, ...o });
const P2 = (text: string, at: any, o: any = {}) => ({ type: 'tag' as const, text, at, x: X, y: 70, color: o.red ? C.red : PANEL, size: 36, ...o });
const FUENTE = { type: 'tag' as const, text: 'FUENTES: BAE NEGOCIOS Y CLARÍN, 25/11/2026', at: 0, x: X, y: 74, color: 'rgba(20,10,46,.75)', size: 22 };

export const BEATS: BeatSpec[] = [
  // 1. el mazo baja en Nueva York y la pila se cae de la balanza
  { id: 'b01', set: 'void', cam: { from: [0.7, 2.4, 8.3], to: [0.05, 2.2, 7.4], look: [0, 0.75, 0], fov: 44 }, keywords: ['creés', 'juicio', 'YPF'],
    actors: [
      { type: 'edificio', pos: [-0.6, 0, -2.4], p: { w: 1.9, h: 2.1, d: 1.0, seed: 3, cols: 5, sign: 'NUEVA YORK' } },
      { type: 'desk', pos: [-0.75, 0, 0.6], s: 0.7 },
      { type: 'mazo', pos: [-0.85, 0.574, 0.6], s: 1.1, p: { hit: 2.37 } },
      { type: 'ring', pos: [0.45, 0.03, 0.4], p: { r: 0.75, color: C.gold } },
      { type: 'balanza', pos: [0.2, 0, 0.3], s: 1.0, p: { n: 12, fall: 2.9, max: 0.16 } },
    ],
    overlays: [P1('JUICIO POR YPF: ¿TERMINÓ?', 0, { size: 50 })] },

  // 2. la Justicia de Nueva York revocó la condena
  { id: 'b02', set: 'room', cam: { from: [-0.6, 2.2, 6.6], to: [0.15, 2.0, 5.9], look: [0, 0.85, -0.8], fov: 44 }, keywords: ['Justicia', 'revocó'],
    actors: [
      { type: 'pared', p: {} },
      { type: 'panel', pos: [-0.55, 2.1, -3.72], p: { text: 'NUEVA YORK', w: 1.8, h: 0.42, size: 0.62, color: C.gold, weight: 900 } },
      { type: 'person', pos: [0.5, 0, -1.7], p: { ...JUEZ, pose: 'idle' }, out: 'revocó' },
      { type: 'person', pos: [0.5, 0, -1.7], at: 'revocó', enter: 'none', p: { ...JUEZ, pose: 'point' } },
      { type: 'estrado', pos: [0, 0, -0.9], p: { w: 2.4, d: 0.7, h: 0.95 } },
      { type: 'papel', pos: [-0.55, 1.35, -0.75], rot: [-0.12, 0.15, 0], at: 'Justicia', p: { text: 'CONDENA', w: 0.75, h: 0.8 } },
      { type: 'cross', pos: [-0.55, 1.18, -0.6], s: 0.45, at: 'revocó' },
      { type: 'mazo', pos: [0.3, 0.95, -0.85], s: 0.9, p: { hit: 2.25 } },
    ],
    overlays: [P1('MARZO 2026 · NUEVA YORK', 'mes'), P2('REVOCARON LA CONDENA', 'revocó', { size: 40 }), FUENTE] },

  // 3. en juego había cerca de 16.000 millones (la pila crece en la balanza)
  { id: 'b03', set: 'void', cam: { from: [0.6, 2.2, 6.6], to: [-0.1, 2.0, 5.9], look: [0.2, 0.8, 0], fov: 44 }, keywords: ['16.000 millones', 'dólares.'],
    actors: [
      { type: 'ring', pos: [0.6, 0.03, 0], p: { r: 0.8, color: C.gold } },
      { type: 'balanza', pos: [0, 0, 0], s: 1.15, p: { n: 12, from: 4, grow: 0.3, dur: 1.6, max: 0.16 } },
    ],
    overlays: [P1('~US$ 16.000 MILLONES EN JUEGO', '16.000', { size: 46 }), P2('ESQUEMA, NO A ESCALA', 0.2, { size: 30, color: 'rgba(20,10,46,.75)' }), FUENTE] },

  // 4. otro reclamo, en otro tribunal: de Nueva York al CIADI
  { id: 'b04', set: 'void', cam: { from: [-0.5, 2.5, 8.6], to: [0.2, 2.3, 7.8], look: [0, 0.8, -1.0], fov: 44 }, keywords: ['Burford', 'abrió', 'CIADI,'],
    actors: [
      { type: 'edificio', pos: [-1.15, 0, -2.2], p: { w: 1.5, h: 1.9, d: 1.0, seed: 3, cols: 4, sign: 'NUEVA YORK', signSize: 0.6 } },
      { type: 'ring', pos: [-1.15, 0.03, -0.6], p: { r: 0.55, color: C.gold } },
      { type: 'flecha', pos: [-0.38, 1.15, -1.9], at: 'otro', p: { len: 0.85, color: C.cyan, dur: 0.7 } },
      { type: 'edificio', pos: [1.05, 0, -2.2], at: 'tribunal', p: { w: 1.6, h: 2.1, d: 1.0, seed: 8, color: '#2d1a6e', sign: 'CIADI', signSub: 'BANCO MUNDIAL', signSize: 0.62 } },
      { type: 'ring', pos: [0.95, 0.03, 1.0], at: 'CIADI', p: { r: 0.5, color: C.magenta } },
      { type: 'balanza', pos: [0.7, 0, 1.0], s: 0.7, at: 'CIADI', p: { n: 11, from: 0, grow: 0.6, dur: 2.4, max: 0.14 } },
    ],
    overlays: [P1('NUEVO RECLAMO: CIADI', 'CIADI', { size: 48 }), P2('REGISTRADO EL 15/9', 5.4, { out: 'del', size: 40 }),
      P2('DEPENDE DEL BANCO MUNDIAL', 'del', { size: 40 }), FUENTE] },

  // 5. ahora pide 14.400 millones más intereses, según el informe al Senado
  { id: 'b05', set: 'room', cam: { from: [0.6, 2.25, 6.6], to: [-0.15, 2.05, 5.9], look: [0, 0.85, -0.6], fov: 44 }, keywords: ['14.400 millones', 'dólares', 'informe'],
    actors: [
      { type: 'pared', p: {} },
      { type: 'ring', pos: [0.75, 0.03, -0.6], p: { r: 0.7, color: C.magenta } },
      { type: 'balanza', pos: [0.15, 0, -0.6], s: 1.05, p: { n: 11, from: 3, grow: 0.55, dur: 1.5, max: 0.14 } },
      { type: 'panel', pos: [-0.5, 2.0, -0.6], at: 'intereses', p: { text: '+ INTERESES', w: 0.95, h: 0.26, size: 0.66, color: C.gold, border: C.gold } },
      { type: 'desk', pos: [-1.25, 0, -1.4], s: 0.75 },
      { type: 'papel', pos: [-1.25, 1.0, -1.4], rot: [-0.1, 0.35, 0], at: 'informe', p: { text: 'INFORME', w: 0.7, h: 0.75 } },
    ],
    overlays: [P1('PIDE US$ 14.400 MILLONES + INTERESES', '14.400', { size: 40, out: 'según' }),
      P1('SEGÚN EL INFORME DE JEFATURA', 'según', { size: 40 }), P2('DE GABINETE AL SENADO', 'según', { size: 40 }), FUENTE] },

  // 6. todo viene de la expropiación de YPF, en 2012
  { id: 'b06', set: 'void', cam: { from: [-0.6, 2.25, 7.4], to: [0.15, 2.05, 6.7], look: [0, 0.7, 0], fov: 44 }, keywords: ['expropiación', '2012.'],
    actors: [
      { type: 'ring', pos: [-0.2, 0.03, -0.3], p: { r: 1.0, color: '#ff7a3d' } },
      { type: 'bomba', pos: [-0.2, 0, -0.4], s: 0.85 },
      { type: 'panel', pos: [-0.2, 2.0, -0.4], at: 'expropiación', p: { text: 'EXPROPIACIÓN', w: 1.3, h: 0.3, size: 0.66, color: '#fff', border: '#ff7a3d' } },
      { type: 'calendario', pos: [0.95, 0.95, 0.3], rot: [0, -0.3, 0], s: 0.5, at: '2012', p: { top: 'AÑO', big: '2012', color: C.red } },
    ],
    overlays: [P1('EXPROPIACIÓN DE YPF · 2012', '2012', { size: 48 }), FUENTE] },

  // 7. reclaman dos sociedades Petersen; Burford tiene intereses en ese juicio
  { id: 'b07', set: 'room', cam: { from: [0.6, 2.25, 7.0], to: [-0.15, 2.05, 6.3], look: [0, 0.8, -0.8], fov: 44 }, keywords: ['Reclaman', 'sociedades', 'intereses', 'juicio.'],
    actors: [
      { type: 'pared', p: {} },
      { type: 'edificio', pos: [-1.15, 0, -1.9], p: { w: 0.95, h: 2.0, d: 0.8, seed: 5, sign: 'PETERSEN', signSize: 0.6 } },
      { type: 'edificio', pos: [-0.05, 0, -1.9], at: 'dos', p: { w: 0.95, h: 2.0, d: 0.8, seed: 6, color: '#2d1a6e', sign: 'PETERSEN', signSize: 0.6 } },
      { type: 'estrado', pos: [-0.55, 0, -0.5], p: { w: 1.0, d: 0.5, h: 0.6 } },
      { type: 'papel', pos: [-0.55, 0.98, -0.5], rot: [-0.1, 0, 0], at: 'Petersen', p: { text: 'JUICIO', w: 0.7, h: 0.75 } },
      { type: 'person', pos: [0.8, 0, -0.6], rot: [0, -0.5, 0], at: 'Burford', p: { ...TRAJE, pose: 'idle' }, out: 'intereses' },
      { type: 'person', pos: [0.8, 0, -0.6], rot: [0, -0.5, 0], at: 'intereses', enter: 'none', p: { ...TRAJE, pose: 'point' } },
      { type: 'panel', pos: [0.8, 2.0, -0.6], rot: [0, -0.3, 0], at: 'Burford', p: { text: 'BURFORD', w: 0.9, h: 0.28, size: 0.66, color: C.gold } },
      { type: 'linea', pos: [0, 0, 0], at: 'intereses', p: { a: [0.6, 1.0, -0.45], b: [-0.18, 0.98, -0.47], color: C.gold, dur: 0.45 } },
    ],
    overlays: [P1('DEMANDANTES: PETERSEN ENERGÍA', 'Petersen', { size: 42, out: 'Burford' }), P2('Y PETERSEN ENERGÍA INVERSORA', 'Petersen', { size: 40, out: 'Burford' }),
      P1('BURFORD CAPITAL TIENE INTERESES', 'Burford', { size: 42 }), P2('EN EL LITIGIO', 'Burford', { size: 40 }), FUENTE] },

  // 8. el mismo argumento que en Nueva York: no les ofrecieron comprarles las acciones
  { id: 'b08', set: 'void', cam: { from: [-0.6, 2.25, 7.2], to: [0.15, 2.05, 6.5], look: [0, 0.75, -0.6], fov: 44 }, keywords: ['mismo', 'ofrecieron', 'acciones.'],
    actors: [
      { type: 'edificio', pos: [-0.45, 0, -2.8], p: { w: 1.6, h: 1.9, d: 0.9, seed: 3, cols: 4, sign: 'NUEVA YORK' } },
      { type: 'desk', pos: [-0.6, 0, -0.2], s: 0.75 },
      { type: 'papel', pos: [-0.9, 0.98, -0.25], rot: [-0.2, 0.15, 0.06], p: { text: 'ACCIONES', w: 0.55, h: 0.72, paper: '#bfe8c4' } },
      { type: 'papel', pos: [-0.3, 0.98, -0.15], rot: [-0.2, -0.1, -0.05], at: 0.3, p: { text: 'ACCIONES', w: 0.55, h: 0.72, paper: '#bfe8c4' } },
      { type: 'sobre', pos: [0.62, 0.88, 0.1], rot: [0, -0.25, 0], at: 'ofrecieron', p: { text: 'OFERTA', w: 0.85, h: 0.55 } },
      { type: 'cross', pos: [0.62, 1.03, 0.17], rot: [0, -0.25, 0], s: 0.22, at: 'comprarles' },
    ],
    overlays: [P1('MISMO ARGUMENTO QUE EN NUEVA YORK', 'York', { size: 40, out: 'ofrecieron' }),
      P1('NO LES HICIERON UNA OFERTA', 'ofrecieron', { size: 42 }), P2('POR SUS ACCIONES (SEGÚN EL RECLAMO)', 'ofrecieron', { size: 34 }), FUENTE] },

  // 9. es un reclamo; no hay fallo; el tribunal se está formando (sillas vacías)
  { id: 'b09', set: 'room', cam: { from: [0.6, 2.25, 6.6], to: [-0.15, 2.05, 5.9], look: [0, 0.85, -1.0], fov: 44 }, keywords: ['reclamo.', 'ningún'],
    actors: [
      { type: 'pared', p: {} },
      { type: 'silla', pos: [-0.85, 0, -2.0], p: { label: 'ÁRBITRO' } },
      { type: 'silla', pos: [0, 0, -2.0], at: 0.35, p: { label: 'NEUTRAL', color: '#2d1a6e' } },
      { type: 'silla', pos: [0.85, 0, -2.0], at: 0.7, p: { label: 'ÁRBITRO' } },
      { type: 'estrado', pos: [0, 0, -1.2], p: { w: 2.6, d: 0.6, h: 0.85 } },
      { type: 'panel', pos: [0, 1.95, -3.72], p: { text: 'TRIBUNAL EN FORMACIÓN', w: 2.4, h: 0.38, size: 0.62, color: C.cyan } },
      { type: 'papel', pos: [0.1, 0.865, -1.15], rot: [-PI / 2, 0, -0.1], at: 'reclamo', p: { text: 'RECLAMO', w: 0.8, h: 0.45, size: 0.66 } },
    ],
    overlays: [P1('ES UN RECLAMO', 'reclamo', { size: 50 }), P2('TODAVÍA NO HAY FALLO', 'todavía', { size: 42 }), FUENTE] },

  // 10. según Clarín, de 5 a 10 años
  { id: 'b10', set: 'void', cam: { from: [-0.5, 2.25, 6.8], to: [0.15, 2.05, 6.1], look: [0, 0.75, 0], fov: 44 }, keywords: ['casos', '5', '10'],
    actors: [
      { type: 'ring', pos: [0, 0.03, 0], p: { r: 0.8, color: C.gold } },
      { type: 'reloj', pos: [0, 0, 0], s: 1.1, p: { dur: 3.6 } },
      { type: 'calendario', pos: [-0.95, 1.15, -0.3], rot: [0, 0.3, 0], s: 0.55, at: '5', p: { top: 'AÑOS', big: '5', color: C.blue } },
      { type: 'calendario', pos: [0.95, 1.15, -0.3], rot: [0, -0.3, 0], s: 0.55, at: '10', p: { top: 'AÑOS', big: '10', color: C.magenta } },
    ],
    overlays: [P1('5 A 10 AÑOS · SEGÚN CLARÍN', '5', { size: 46 }), P2('PROMEDIO DEL CIADI: 47 MESES · INFORME ANUAL 2026', 'años', { size: 28 }), FUENTE] },

  // 11. en Estados Unidos, los demandantes le piden a la Corte Suprema que revise el fallo
  { id: 'b11', set: 'void', cam: { from: [0.6, 2.35, 7.6], to: [-0.15, 2.15, 6.8], look: [0, 0.8, -1.0], fov: 44 }, keywords: ['demandantes', 'revise', 'Corte'],
    actors: [
      { type: 'edificio', pos: [0.2, 0, -2.6], p: { w: 2.2, h: 2.5, d: 1.0, seed: 11, cols: 6, color: '#2d1a6e', sign: 'CORTE SUPREMA · EE.UU.', signSize: 0.52 } },
      { type: 'person', pos: [-1.0, 0, -0.4], rot: [0, 0.5, 0], s: 0.9, at: 'demandantes', p: { ...TRAJE, pose: 'hold' } },
      { type: 'person', pos: [-0.35, 0, -0.2], rot: [0, 0.2, 0], s: 0.9, at: 1.55, p: { ...TRAJE2, pose: 'hold' } },
      { type: 'papel', pos: [0.7, 1.15, -0.2], rot: [0, -0.2, 0], p: { text: 'FALLO', w: 0.7, h: 0.8 } },
      { type: 'lupa', pos: [0.62, 0.98, 0.15], rot: [0, -0.2, 0.2], s: 0.8, at: 'revise' },
    ],
    overlays: [P1('EE.UU.: PIDIERON QUE LA CORTE', 'Corte', { size: 42, out: 'revise' }), P2('SUPREMA REVISE EL FALLO', 'Corte', { size: 40, out: 'revise' }),
      P1('LA CORTE TODAVÍA NO DECIDIÓ SI LO TOMA', 'revise', { size: 38 }), FUENTE] },

  // 12. las dos balanzas: 16.000 en Nueva York, 14.400 en el CIADI
  { id: 'b12', set: 'void', cam: { from: [-0.5, 2.4, 8.4], to: [0.15, 2.2, 7.6], look: [-0.05, 0.8, 0], fov: 44 }, keywords: ['16.000 millones.', '14.400,', 'tribunal.'],
    actors: [
      { type: 'ring', pos: [-0.45, 0.03, 0], p: { r: 0.6, color: C.gold } },
      { type: 'balanza', pos: [-0.8, 0, 0], s: 0.75, p: { n: 10, max: 0.15, ref: 10 } },
      { type: 'panel', pos: [-0.8, 1.95, 0], p: { text: 'NUEVA YORK', w: 0.95, h: 0.24, size: 0.62, color: C.gold } },
      { type: 'ring', pos: [1.05, 0.03, 0], at: 'Ahora', p: { r: 0.6, color: C.magenta } },
      { type: 'balanza', pos: [0.7, 0, 0], s: 0.75, at: 'Ahora', p: { n: 9, from: 0, grow: 0.35, dur: 1.0, max: 0.135, ref: 10 } },
      { type: 'panel', pos: [0.7, 1.95, 0], at: 'Ahora', p: { text: 'CIADI', w: 0.95, h: 0.24, size: 0.62, color: C.magenta } },
      { type: 'panel', pos: [-0.05, 0.6, 0.3], p: { text: 'ESQUEMA, NO A ESCALA', w: 1.0, h: 0.18, size: 0.62, color: '#b9a3e8', bg: '#1b1340' } },
    ],
    overlays: [P1('NUEVA YORK: ~US$ 16.000 M', '16.000', { size: 46 }), P2('CIADI: US$ 14.400 M + INTERESES', '14.400', { size: 40 }), FUENTE] },

  // 13. hasta el 2 de diciembre para responder en la Corte Suprema de EE.UU.
  { id: 'b13', set: 'room', cam: { from: [0.6, 2.25, 6.8], to: [-0.15, 2.05, 6.1], look: [0, 0.8, -0.8], fov: 44 }, keywords: ['Argentina', '2', 'diciembre', 'responder', 'Suprema', 'Estados'],
    actors: [
      { type: 'pared', p: {} },
      { type: 'desk', pos: [0.45, 0, -0.9] },
      { type: 'laptop', pos: [0.6, 0.8, -0.9] },
      { type: 'person', pos: [0.45, 0, -1.65], p: { ...TRAJE2, pose: 'type' } },
      { type: 'calendario', pos: [-0.8, 1.45, -1.3], rot: [0, 0.3, 0], s: 0.65, p: { top: 'DICIEMBRE', big: '2', color: C.red } },
      { type: 'ring', pos: [-0.8, 0.03, -1.0], at: '2', p: { r: 0.55, color: C.gold } },
      { type: 'papel', pos: [-0.15, 0.84, -0.66], rot: [-PI / 2, 0, 0.15], at: 'responder', p: { text: 'RESPUESTA', w: 0.55, h: 0.36, size: 0.5 } },
    ],
    overlays: [P1('EE.UU.: PLAZO PARA RESPONDER EL PEDIDO', '2', { size: 38, out: 'cuento' }), P2('2 DE DICIEMBRE', '2', { size: 48 }),
      P1('ESE DÍA TE CUENTO', 'cuento', { size: 50 }), FUENTE] },
];
