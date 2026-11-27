import type { BeatSpec } from '../../src/Beat';
import { K, RIDGE } from './props';

// Versión 2: otro look que el original (neón violeta, bóveda, ciudad de noche, barras hacia arriba).
// Acá: escritorio nocturno de madera con billetes verdes (la plata del que mira), una montaña al atardecer para el precio
// (une solo los 3 puntos confirmados con rectas) y una planta de tanques en azul acero y amarillo de seguridad (los fondos).
// Textos 2D: exactamente los de "## Placas por plano" de guion.md, entre el 30% y el 76% de la pantalla, x entre 10% y 85%.
const DESK = { type: 'stage', p: { kind: 'desk' } };
const PEAK = { type: 'stage', p: { kind: 'peak' } };
const PLANT = { type: 'stage', p: { kind: 'plant' } };
const tag = (text: string, at: any, o: any = {}) => ({ type: 'tag' as const, text, at, x: 47, y: 70, color: 'rgba(8,20,26,.9)', size: 40, ...o });
const [PK, VL, RS] = RIDGE;

export const BEATS: BeatSpec[] = [
  // 1. 100 dólares en Bitcoin en su máximo. El jueves 26 eran unos 48.  (grúa que baja desde arriba del escritorio; el fajo se vuela hasta 48%)
  { id: 'b01', set: 'room', cam: { from: [0.1, 6.2, 2.4], to: [0.35, 3.7, 4.6], look: [0, 0.3, 0], lookTo: [0.05, 0.75, 0], fov: 46 }, keywords: ['100', 'Bitcoin', '48'],
    actors: [
      DESK,
      { type: 'stack', pos: [0, 0, 0.1], rot: [0, -0.12, 0], p: { n: 21, to: 10, at: 2.65, dur: 1.6, gap: 0.055 } },
      { type: 'btc', pos: [-1.15, 0.06, 0.8], at: 'Bitcoin', p: { r: 0.34, flat: true } },
      { type: 'btc', pos: [-1.05, 0.15, 0.72], at: 'máximo', p: { r: 0.34, flat: true } },
      { type: 'calc', pos: [1.2, 0, 0.75], rot: [0, -0.35, 0], at: 'jueves', p: { show: '≈ 48' } },
    ],
    overlays: [
      { type: 'big', text: 'US$ 100 → US$ 48', at: 0, y: 60, size: 84 },
      tag('100 × 61.000 ÷ 126.000 ≈ 48 · SIN COMISIONES', '48', { y: 71.5, size: 30 }),
    ] },

  // 2. Ese máximo fue el 6 de octubre de 2025: unos 126.000 dólares.  (grúa que sube por la ladera hasta la cumbre)
  { id: 'b02', set: 'room', cam: { from: [-0.4, 0.9, 6.4], to: [-0.9, 2.5, 5.7], look: [-0.9, 1.5, 0], lookTo: [-1.1, 2.55, 0], fov: 46 }, keywords: ['2025', '126.000'],
    actors: [
      PEAK,
      { type: 'ridge', pos: [0, 0, 0] },
      { type: 'flag', pos: [PK[0], PK[1], 0.2], at: 'máximo', p: { text: '', w: 0.6, h: 0.36, pole: 0.7, color: K.orange } },
      { type: 'btc', pos: [-0.25, 2.55, 0.9], at: '126.000', bob: 0.05, p: { r: 0.38, spin: 1.2 } },
    ],
    overlays: [
      tag('MÁXIMO: 6/10/2025', '6', { y: 57, color: K.orange2, size: 50 }),
      { type: 'big', text: '', count: { to: 126000, pre: '1 BITCOIN ≈ US$ ' }, at: '126.000', y: 63, size: 70 },
    ] },

  // 3. El 21 de noviembre bajó hasta 55.000, y el jueves rondaba los 61.000.  (travelling lateral bajando por la cresta)
  { id: 'b03', set: 'room', cam: { from: [-0.9, 2.6, 5.9], to: [0.75, 1.9, 5.6], look: [-0.7, 2.1, 0], lookTo: [0.65, 1.45, 0], fov: 46 }, keywords: ['55.000', '61.000'],
    actors: [
      PEAK,
      { type: 'ridge', pos: [0, 0, 0] },
      { type: 'flag', pos: [PK[0], PK[1], 0.2], p: { text: '', w: 0.6, h: 0.36, pole: 0.7, color: K.orange } },
      { type: 'rope', pos: [0, 0, 0], at: 'bajó', p: { a: PK, b: VL, dur: 1.2, color: K.red } },
      { type: 'flag', pos: [VL[0], VL[1], 0.82], at: '21', p: { text: '21/11/2026: ≈ 55.000', w: 1.55, h: 0.3, pole: 1.15, side: -1, color: K.red } },
      { type: 'rope', pos: [0, 0, 0], at: 'rondaba', p: { a: VL, b: RS, dur: 0.6, color: K.green } },
      { type: 'flag', pos: [RS[0], RS[1], 0.82], at: '61.000', p: { text: '26/11/2026: ≈ 61.000', w: 1.55, h: 0.3, pole: 0.55, side: -1, color: '#1f8f55' } },
    ],
    overlays: [
      tag('3 PUNTOS, NO ES EL RECORRIDO REAL', 0, { y: 74.5, size: 26, color: 'rgba(8,20,26,.78)' }),
      tag('≈ −52% DESDE EL MÁXIMO', -0.75, { y: 66, color: K.red, size: 50 }),
    ] },

  // 4. En noviembre se fue la plata de los fondos que compran bitcoins de verdad en Estados Unidos.  (órbita alrededor de los tanques)
  { id: 'b04', set: 'room', cam: { from: [-1.5, 2.4, 6.0], to: [1.3, 2.1, 6.1], look: [-0.2, 1.25, 0], lookTo: [0.2, 1.2, 0], fov: 46 }, keywords: ['fondos', 'bitcoins', 'verdad'],
    actors: [
      PLANT,
      { type: 'tank', pos: [-1.15, 0, -0.3], p: { h: 2.1, r: 0.5, level: 0.88, to: 0.62, at: 1.25, dur: 3.2 } },
      { type: 'tank', pos: [0, 0, -0.6], p: { h: 2.4, r: 0.55, level: 0.9, to: 0.6, at: 1.3, dur: 3.2 } },
      { type: 'tank', pos: [1.15, 0, -0.3], p: { h: 2.1, r: 0.5, level: 0.85, to: 0.6, at: 1.35, dur: 3.2 } },
      { type: 'flow', pos: [0, 0, 0], at: 'fue', p: { from: [-0.6, 0.35, 0.3], to: [-2.6, 0.05, 1.6], n: 10, speed: 1.1, arc: 0.4 } },
      { type: 'flow', pos: [0, 0, 0], at: 'plata', p: { from: [0.6, 0.35, 0.3], to: [2.6, 0.05, 1.6], n: 10, speed: 1.1, arc: 0.4 } },
      { type: 'btc', pos: [0, 2.85, -0.6], at: 'verdad', bob: 0.04, p: { r: 0.32, spin: 1.4 } },
    ],
    overlays: [
      tag('FONDOS ETF DE BITCOIN AL CONTADO · EE. UU.', 'fondos', { y: 64, size: 34 }),
      tag('TIENEN BITCOINS DE VERDAD', 'verdad', { y: 70.5, color: K.orange2, size: 44 }),
    ] },

  // 5. Hasta el 25 salieron 5.390 millones de dólares, según SoSoValue.  (empuje bajo hacia el desagüe)
  { id: 'b05', set: 'room', cam: { from: [0.6, 0.9, 6.0], to: [0.25, 1.4, 4.9], look: [0.1, 1.15, 0], lookTo: [0.15, 1.05, 0], fov: 46 }, keywords: ['5.390', 'SoSoValue'],
    actors: [
      PLANT,
      { type: 'tank', pos: [-0.7, 0, -0.6], p: { h: 2.7, r: 0.75, level: 0.75, to: 0.32, at: 1.45, dur: 4.6 } },
      { type: 'pipe', pos: [-0.05, 0, -0.6], p: { len: 1.0, h: 0.45 } },
      { type: 'drain', pos: [1.25, 0, 0.5] },
      { type: 'flow', pos: [0, 0, 0], at: 'salieron', p: { from: [0.95, 0.45, -0.6], to: [1.25, 0.02, 0.5], n: 12, speed: 1.6, arc: 0.15, r: 0.09 } },
      { type: 'ring', pos: [1.25, 0.03, 0.5], at: '5.390', p: { r: 0.7, color: K.red } },
    ],
    overlays: [
      { type: 'big', text: '', count: { to: 5390, pre: '−US$ ', post: ' MILLONES' }, at: '5.390', red: true, y: 60, size: 76 },
      tag('1 AL 25/11/2026 · DATOS: SOSOVALUE', 'SoSoValue', { y: 69, size: 34 }),
    ] },

  // 6. Es el mes con más salidas desde que nacieron, en 2024.  (paneo lateral por la pared de meses; el último se prende rojo)
  { id: 'b06', set: 'room', cam: { from: [-0.9, 2.0, 6.2], to: [0.6, 1.85, 5.8], look: [-0.3, 1.75, -0.5], lookTo: [0.35, 1.7, -0.5], fov: 46 }, keywords: ['salidas', '2024'],
    actors: [
      PLANT,
      { type: 'box', pos: [0, 1.75, -0.62], p: { size: [3.7, 1.55, 0.1], color: K.steel2 } },
      { type: 'months', pos: [0.15, 0, -0.5], p: { stagger: 0.018, hot: 0.95, cw: 0.26 } },
      { type: 'tank', pos: [-1.25, 0, 0.6], s: 0.55, p: { h: 1.6, r: 0.5, level: 0.5, to: 0.3, at: 0.9, dur: 2.5 } },
      { type: 'drain', pos: [1.0, 0, 0.8], s: 0.7 },
    ],
    overlays: [tag('RÉCORD MENSUAL DESDE ENERO DE 2024', 'más', { y: 64, color: K.red, size: 40 })] },

  // 7. El récord anterior era de junio: 4.510 millones.  (tilt hacia abajo siguiendo las barras que cuelgan)
  { id: 'b07', set: 'room', cam: { from: [0.6, 3.1, 6.2], to: [-0.3, 2.3, 5.6], look: [0, 2.6, 0], lookTo: [0, 1.6, 0], fov: 46 }, keywords: ['récord', 'junio', '4.510'],
    actors: [
      PLANT,
      { type: 'shelf', pos: [0, 2.95, 0], p: { w: 2.8 } },
      { type: 'dropbar', pos: [-0.6, 2.93, 0], at: 'junio', p: { v: 2.2 * 4510 / 5390, color: '#c27a5c', w: 0.75 } },
      { type: 'dropbar', pos: [0.6, 2.93, 0], at: '4.510', p: { v: 2.2, color: K.red, w: 0.75, dur: 1.0 } },
      { type: 'label', pos: [-0.6, 3.15, 0], at: 'junio', p: { text: 'JUN', w: 0.7, h: 0.28, color: '#fff', size: 0.7, weight: 900, depth: 0 } },
      { type: 'label', pos: [0.6, 3.15, 0], at: '4.510', p: { text: 'NOV', w: 0.7, h: 0.28, color: '#fff', size: 0.7, weight: 900, depth: 0 } },
    ],
    overlays: [
      tag('JUNIO 2026: −4.510 M', 'junio', { y: 62, color: '#9a5a40', size: 42 }),
      tag('NOVIEMBRE 2026: −5.390 M', '4.510', { y: 69, color: K.red, size: 42 }),
    ] },

  // 8. Pero desde 2024 les entró más de lo que salió: unos 51.600 millones a favor.  (grúa que sube por el tanque grande que se llena)
  { id: 'b08', set: 'room', cam: { from: [1.0, 0.9, 6.6], to: [0.3, 2.5, 6.2], look: [0, 1.1, 0], lookTo: [0, 1.85, 0], fov: 46 }, keywords: ['2024', '51.600'],
    actors: [
      PLANT,
      { type: 'tank', pos: [0, 0, -0.3], p: { h: 3.0, r: 0.95, level: 0.12, to: 0.86, at: 0.3, dur: 3.2, inflow: true } },
      { type: 'pipe', pos: [-2.3, 2.9, -0.3], rot: [0, 0, 0], p: { len: 2.3, h: 0.25, color: '#2f9c63' } },
      { type: 'flow', pos: [0, 0, 0], at: 'desde', p: { from: [-2.0, 3.15, -0.3], to: [0, 2.9, -0.3], n: 14, speed: 1.3, arc: 0.35, color: K.green } },
      { type: 'pipe', pos: [0.9, 0, -0.3], p: { len: 0.8, h: 0.35 } },
      { type: 'flow', pos: [0, 0, 0], at: 'salió', p: { from: [1.7, 0.35, -0.3], to: [2.0, 0.02, 0.4], n: 5, speed: 1.4, arc: 0.1, r: 0.08 } },
    ],
    overlays: [
      tag('SALDO DESDE 2024: +US$ 51.600 M', '51.600', { y: 63, color: '#1f8f55', size: 50 }),
      tag('AL 25/11/2026', '51.600', { y: 69.5, size: 34 }),
    ] },

  // 9. Esto no es consejo de inversión.  (vuelta al escritorio: alejamiento lento)
  { id: 'b09', set: 'room', cam: { from: [0.3, 2.5, 3.6], to: [-0.15, 2.95, 4.5], look: [0, 0.45, 0], lookTo: [0, 0.6, 0], fov: 46 }, keywords: ['consejo'],
    actors: [
      DESK,
      { type: 'stack', pos: [0, 0, 0.1], rot: [0, -0.12, 0], p: { n: 10, gap: 0.055 } },
      { type: 'calc', pos: [1.2, 0, 0.75], rot: [0, -0.35, 0], p: { show: '≈ 48' } },
      { type: 'btc', pos: [-1.1, 0.06, 0.8], p: { r: 0.34, flat: true } },
    ],
    overlays: [tag('NO ES CONSEJO DE INVERSIÓN', 'consejo', { y: 60, color: '#b8860b', size: 50 })] },

  // 10. Completá la frase: con esos 100 dólares, yo hubiera...  (cenital que gira sobre el fajo que vuelve entero)
  { id: 'b10', set: 'room', cam: { from: [0.9, 5.8, 1.7], to: [-0.7, 5.6, 2.1], look: [0, 0.2, 0], lookTo: [0, 0.4, 0], fov: 46 }, keywords: ['Completá', '100'],
    actors: [
      DESK,
      { type: 'stack', pos: [0, 0, 0.1], rot: [0, -0.12, 0], p: { n: 21, from: 10, grow: 1.0, gap: 0.055 } },
      { type: 'btc', pos: [-1.1, 0.06, 0.8], p: { r: 0.34, flat: true } },
      { type: 'ring', pos: [0, 0.03, 0.1], at: 0.2, p: { r: 1.05, color: K.green } },
    ],
    overlays: [
      { type: 'big', text: 'US$ 100', at: 0, y: 58, size: 120 },
      tag('CON ESOS 100 DÓLARES, YO HUBIERA...', 'Completá', { y: 70, size: 40 }),
    ] },
];
