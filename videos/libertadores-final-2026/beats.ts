import type { BeatSpec } from '../../src/Beat';
import { C } from '../../src/kit/math';

const PI = Math.PI;
const RED = '#d81f33', WHITE = '#f4f1ff', GREEN = '#1f9d55';
const LBL = { bg: '#2d1a6e', size: 0.62 };
const GOLD = { bg: C.gold, color: '#1a1030', size: 0.62, weight: 900 };
const TAG = '#2d1a6e';
// Todo el texto 2D queda entre 250 px desde arriba y 420 px desde abajo: se usan `tag` (y <= 75,3 %) y `big` en y 62 %.
const FUENTE = 'según El Observador (agencia EFE)';
const fuente = (at: any) => ({ type: 'tag' as const, text: FUENTE, at, x: 50, y: 75.3, color: TAG, size: 38 });

export const BEATS: BeatSpec[] = [
  // 1. Dos hinchas salen de La Plata en bicicleta
  { id: 'b01', cam: { from: [1.3, 2.3, 8.8], to: [0.2, 2.0, 7.5], look: [0, 1.0, 0.4], fov: 46 }, keywords: ['Estudiantes', 'bicicleta'],
    actors: [
      { type: 'road', pos: [0, 0, 0.6], rot: [0, PI / 2, 0], p: { len: 30, speed: -3.2 } },
      { type: 'box', pos: [-0.9, 1.15, -1.3], p: { size: [0.1, 2.3, 0.1], color: '#8d8aa0' }, move: { to: [-2.6, 1.15, -1.3], at: 0.6, dur: 3.2 } },
      { type: 'label', pos: [-0.9, 2.45, -1.25], p: { text: 'LA PLATA', w: 1.6, h: 0.44, bg: '#15102b', border: C.cyan, size: 0.6 }, move: { to: [-2.6, 2.45, -1.25], at: 0.6, dur: 3.2 } },
      { type: 'bike', pos: [-0.75, 0.05, 1.0], p: { shirt: RED, color: C.cyan }, bob: 0.01 },
      { type: 'bike', pos: [0.7, 0.05, 0.2], p: { shirt: WHITE, color: C.gold, phase: 1.7, hair: '#3a2a1a', skin: '#f2c39b' }, bob: 0.01 },
    ],
    overlays: [fuente(0.5)] },

  // 2. Destino: Montevideo, a unos 600 km
  { id: 'b02', set: 'void', cam: { from: [-0.8, 2.3, 8.8], to: [0.2, 2.2, 7.7], look: [0, 1.6, 0], fov: 46 }, keywords: ['Montevideo', '600', 'kilómetros'],
    actors: [
      { type: 'route', pos: [0, 0, 0], p: { a: [-1.1, 1.3], b: [1.05, 2.5], c: [0.9, 1.15], dur: 2.3, delay: 0.25 } },
      { type: 'label', pos: [-1.0, 1.08, 0.2], p: { text: 'LA PLATA', w: 1.15, h: 0.3, ...LBL } },
      { type: 'label', pos: [-0.15, 2.85, 0.2], at: 'Montevideo', p: { text: 'MONTEVIDEO', w: 1.5, h: 0.34, ...GOLD } },
    ],
    overlays: [{ type: 'big', text: '600 km', sub: 'unos 600 kilómetros', at: '600', y: 62 }, fuente(0.3)] },

  // 3. Era una promesa
  { id: 'b03', set: 'room', cam: { from: [0.8, 2.3, 8.6], to: [-0.1, 2.2, 7.6], look: [0, 1.0, 0], fov: 46 }, keywords: ['promesa', 'Libertadores', 'pedaleando'],
    actors: [
      { type: 'person', pos: [-1.15, 0, 0.2], rot: [0, 0.7, 0], s: 0.95, p: { shirt: RED, hair: '#15102b', skin: '#e3ad80', pose: 'idle' }, out: 'promesa' },
      { type: 'person', pos: [-1.15, 0, 0.2], rot: [0, 0.7, 0], s: 0.95, at: 'promesa', enter: 'none', p: { shirt: RED, hair: '#15102b', skin: '#e3ad80', pose: 'point' } },
      { type: 'person', pos: [-0.3, 0, 0.5], rot: [0, -0.5, 0], s: 0.95, p: { shirt: WHITE, pose: 'idle', phase: 1.5 }, out: 'pedaleando' },
      { type: 'person', pos: [-0.3, 0, 0.5], rot: [0, -0.5, 0], s: 0.95, at: 'pedaleando', enter: 'none', p: { shirt: WHITE, pose: 'cheer', phase: 1.5 } },
      { type: 'label', pos: [-0.75, 2.35, 0.3], at: 'promesa', p: { text: 'UNA PROMESA', w: 1.5, h: 0.36, ...GOLD } },
      { type: 'box', pos: [1.0, 0.55, -0.3], at: 'final', p: { size: [0.55, 1.1, 0.55], color: '#2d1a6e' } },
      { type: 'cup', pos: [1.0, 1.1, -0.3], s: 1.0, at: 'final' },
      { type: 'label', pos: [0.75, 2.85, 0], at: 'final', p: { text: 'FINAL DE LA LIBERTADORES', w: 1.75, h: 0.34, ...LBL } },
      { type: 'bike', pos: [0.75, 0, 0.9], s: 0.72, at: 'iban', p: { rider: false, color: C.cyan, speed: 0 } },
    ],
    overlays: [fuente(0.4)] },

  // 4. Llegaron el miércoles
  { id: 'b04', cam: { from: [-0.9, 2.2, 8.9], to: [0.1, 2.1, 7.9], look: [0, 0.85, 0], fov: 46 }, keywords: ['Llegaron', 'miércoles', 'Observador'],
    actors: [
      { type: 'road', pos: [0, 0, 0.6], rot: [0, PI / 2, 0], p: { len: 30, speed: 0 } },
      { type: 'arch', pos: [0, 0, -0.5], s: 0.7, p: { text: 'MONTEVIDEO' } },
      { type: 'bike', pos: [-2.6, 0.05, 1.0], s: 0.95, p: { shirt: RED, color: C.cyan, stopAt: 1.2, cheer: true }, move: { to: [-0.75, 0.05, 1.0], at: 0, dur: 1.2 } },
      { type: 'bike', pos: [-1.6, 0.05, 0.2], s: 0.95, p: { shirt: WHITE, color: C.gold, phase: 1.7, hair: '#3a2a1a', skin: '#f2c39b', stopAt: 1.2, cheer: true }, move: { to: [0.7, 0.05, 0.2], at: 0, dur: 1.2 } },
      { type: 'ring', pos: [0, 0.07, 0.6], at: 'miércoles', p: { r: 1.5, color: C.gold } },
    ],
    overlays: [{ type: 'tag', text: 'salieron el 20/11 · llegaron el miércoles 25/11', at: 'miércoles', x: 50, y: 70.6, color: C.blue, size: 34 }, fuente('según')] },

  // 5. Viernes 27: 121 micros
  { id: 'b05', set: 'void', cam: { from: [1.7, 3.6, 9.6], to: [1.0, 3.2, 8.4], look: [0, 0.2, -1.5], fov: 46 }, keywords: ['viernes', '27', '121', 'caravana'],
    actors: [
      { type: 'road', pos: [0, 0, -8], p: { len: 44, speed: 0 } },
      { type: 'convoy', pos: [0, 0, 1.6], enter: 'none', p: { n: 14, gap: 3.2, speed: 0.9, stagger: 0 } },
      { type: 'calendar', pos: [-1.25, 2.1, -1.0], rot: [0, 0.35, 0], s: 0.6, at: 'viernes', p: { top: 'VIERNES', big: '27', color: C.blue } },
      { type: 'label', pos: [1.35, 2.0, -2.2], rot: [0, -0.2, 0], at: 'La', p: { text: 'LA PLATA', w: 1.5, h: 0.42, bg: '#15102b', border: C.cyan, size: 0.6 } },
    ],
    overlays: [{ type: 'big', text: '', count: { to: 121 }, sub: 'micros de la caravana', at: '121', y: 62 },
      { type: 'tag', text: 'viernes 27/11/2026', at: 'viernes', out: 'micros', x: 50, y: 75.3, color: TAG, size: 44 },
      { type: 'tag', text: 'caravana: micros del club y de agrupaciones', at: 'micros', x: 50, y: 75.3, color: TAG, size: 34 }] },

  // 6. Más de 6.500 hinchas, según estima el club
  { id: 'b06', cam: { from: [-1.0, 2.5, 9.0], to: [0.0, 2.3, 8.0], look: [0, 0.35, 0], fov: 46 }, keywords: ['6.500', 'estima'],
    actors: [
      { type: 'bus', pos: [0, 0, -0.7], rot: [0, PI / 2, 0], s: 1.05, p: { spin: 0 } },
      { type: 'fans', pos: [0, 0, 0.9], p: { n: 12, area: [3.0, 1.1], pose: 'cheer', sc: 0.55, stagger: 0.07 } },
      { type: 'label', pos: [0, 1.85, -0.7], at: 'hinchas', p: { text: 'HINCHAS', w: 1.3, h: 0.36, ...GOLD } },
    ],
    overlays: [{ type: 'big', text: '', count: { to: 6500, pre: '+' }, sub: 'más de 6.500 hinchas en los micros', at: '6.500', y: 62 },
      { type: 'tag', text: 'estimación del club', at: 'según', x: 50, y: 75.3, color: TAG, size: 46 }] },

  // 7. En total, más de 35.000
  { id: 'b07', set: 'void', cam: { from: [0.9, 3.4, 9.4], to: [0.0, 2.9, 8.0], look: [0, -0.2, -1.0], fov: 46 }, keywords: ['total', 'estima', '35.000'],
    actors: [
      { type: 'mass', pos: [0, 0, -1.6], enter: 'none', at: 0.05, p: { cols: 22, rows: 17, w: 5.4, d: 7.0, dur: 2.6 } },
      { type: 'bus', pos: [-1.9, 0, 2.6], rot: [0, 0.5, 0], s: 0.7, p: { spin: 0 } },
    ],
    overlays: [{ type: 'big', text: '', count: { to: 35000, pre: '+' }, sub: 'se estima que van a viajar más de 35.000', at: 'más', y: 62 },
      { type: 'tag', text: 'estimación, no es un conteo', at: 'estima', x: 50, y: 75.3, color: TAG, size: 44 }] },

  // 8. Su tribuna: casi 14.000 entradas, agotadas
  { id: 'b08', cam: { from: [0.9, 2.6, 8.8], to: [0.0, 2.3, 7.7], look: [0, 0.75, -0.6], fov: 46 }, keywords: ['Pero', 'tribuna', '14.000', 'entradas', 'agotaron'],
    actors: [
      { type: 'stands', pos: [0, 0, -0.4], p: { w: 4.6, rows: 5, seed: 8, fill: 1.3, pal: [RED, WHITE, RED, WHITE, '#b3182a'] } },
      { type: 'ticket', pos: [-0.85, 2.0, 0.9], s: 0.72, at: 'entradas', p: {} },
      { type: 'label', pos: [0.25, 1.35, 1.0], rot: [0, 0, 0.1], at: 'agotaron', p: { text: 'AGOTADAS', w: 2.2, h: 0.56, bg: C.red, color: '#fff', border: '#fff', size: 0.62, weight: 900 } },
    ],
    overlays: [{ type: 'big', text: 'casi 14.000', sub: 'entradas en su tribuna', at: 'casi', y: 62, size: 104 },
      { type: 'tag', text: 'Categoría 3 · sector de Estudiantes', at: 0.05, out: 1.45, x: 50, y: 75.3, color: TAG, size: 40 },
      { type: 'tag', text: 'cupo inicial 12.000, ampliado a casi 14.000', at: 1.45, out: 'agotaron', x: 50, y: 75.3, color: TAG, size: 34 },
      { type: 'tag', text: 'agotadas', at: 'agotaron', x: 50, y: 75.3, color: C.red, size: 52 }] },

  // 9. Viajan más del doble; no se sabe cuántos sin entrada
  { id: 'b09', set: 'void', cam: { from: [-0.7, 2.4, 8.8], to: [0.2, 2.25, 7.8], look: [0, 1.55, 0], fov: 46 }, keywords: ['estima', 'doble', 'sabe', 'entrada'],
    actors: [
      { type: 'box', pos: [0, 0.98, 0], p: { size: [3.3, 0.06, 0.5], color: '#2d1a6e' } },
      { type: 'cubes', pos: [-0.85, 1.02, 0], enter: 'none', p: { n: 14, cols: 5, size: 0.2, gap: 0.04, color: C.gold, stagger: 0.02 } },
      { type: 'label', pos: [-0.85, 2.02, 0.1], p: { text: 'ENTRADAS', w: 1.25, h: 0.3, ...GOLD } },
      { type: 'cubes', pos: [0.85, 1.02, 0], at: 0.5, enter: 'none', p: { n: 35, cols: 5, size: 0.2, gap: 0.04, color: RED, stagger: 0.025 } },
      { type: 'label', pos: [0.85, 2.98, 0.1], at: 'viajan', p: { text: 'VIAJAN', w: 1.1, h: 0.3, bg: RED, size: 0.62, weight: 900 } },
      { type: 'label', pos: [0.85, 1.85, 0.45], at: 'no', bob: 0.04, p: { text: '?', w: 0.6, h: 0.6, bg: '#15102b', border: C.cyan, color: '#fff', size: 0.8, weight: 900 } },
    ],
    overlays: [{ type: 'tag', text: 'esquema, no a escala', at: 0.1, x: 29, y: 27.5, color: TAG, size: 30 },
      { type: 'big', text: '35.000 ÷ 14.000 = 2,5', sub: 'los 35.000 son una estimación', at: 'más', y: 62, size: 62 },
      { type: 'tag', text: 'no hay dato de cuántos viajan sin entrada', at: 'no', x: 50, y: 75.3, color: TAG, size: 36 }] },

  // 10. Sábado 28, 17 h, contra Palmeiras, Estadio Centenario
  { id: 'b10', cam: { from: [1.0, 2.9, 9.2], to: [-0.1, 2.5, 7.9], look: [0, 1.0, -0.4], fov: 46 }, keywords: ['sábado', '28', 'noviembre', 'cinco', 'Palmeiras', 'Centenario'],
    actors: [
      { type: 'stadium', pos: [0, 0, -1.4], s: 1.0 },
      { type: 'calendar', pos: [-0.95, 2.55, 0.2], rot: [0, 0.25, 0], s: 0.58, at: 'sábado', p: { top: 'SÁBADO', big: '28', color: C.blue } },
      { type: 'clock', pos: [0.95, 2.55, 0.2], rot: [0, -0.25, 0], s: 0.62, at: 'cinco', p: { h: 5, m: 0 } },
      { type: 'player', pos: [-0.85, 0, 1.3], rot: [0, 0.4, 0], s: 0.78, p: { kit: 'est', pose: 'idle' } },
      { type: 'label', pos: [-0.85, 1.55, 1.3], at: 'final', p: { text: 'ESTUDIANTES', w: 1.4, h: 0.3, bg: RED, size: 0.62, weight: 900 } },
      { type: 'player', pos: [0.85, 0, 1.3], rot: [0, -0.4, 0], s: 0.78, at: 'contra', p: { kit: 'pal', pose: 'idle', phase: 2, hair: '#3a2a1a', skin: '#c98d62' } },
      { type: 'label', pos: [0.85, 1.55, 1.3], at: 'Palmeiras', p: { text: 'PALMEIRAS', w: 1.3, h: 0.3, bg: GREEN, size: 0.62, weight: 900 } },
      { type: 'label', pos: [0, 1.9, -0.6], at: 'Estadio', p: { text: 'ESTADIO CENTENARIO', w: 2.3, h: 0.36, ...GOLD } },
    ],
    overlays: [{ type: 'tag', text: 'sábado 28/11/2026 · 17 h de Argentina y Uruguay', at: 'sábado', x: 50, y: 75.3, color: TAG, size: 34 }] },

  // 11. 1968: Estudiantes 2, Palmeiras 0 en ese mismo estadio
  { id: 'b11', set: 'void', cam: { from: [-0.9, 2.5, 8.9], to: [-0.1, 2.2, 7.8], look: [0, 1.6, 0], fov: 46 }, keywords: ['estadio', '1968', 'Estudiantes', 'Palmeiras', '2-0'],
    actors: [
      { type: 'pitch', pos: [0, 0, 1], p: { w: 9, d: 7, bands: 6 } },
      { type: 'stands', pos: [0, 0, -3.2], p: { w: 11, rows: 6, seed: 4 } },
      { type: 'score', pos: [0, 2.7, -0.4], s: 0.9, at: '1968', p: { a: 'ESTUDIANTES', b: 'PALMEIRAS', sa: '', sb: '', ca: RED, cb: GREEN, top: '1968' }, out: '2-0' },
      { type: 'score', pos: [0, 2.7, -0.4], s: 0.9, at: '2-0', enter: 'none', p: { a: 'ESTUDIANTES', b: 'PALMEIRAS', sa: 2, sb: 0, ca: RED, cb: GREEN, top: '1968', hi: 'a' } },
      { type: 'player', pos: [-0.85, 0, 1.2], rot: [0, 0.4, 0], s: 0.85, p: { kit: 'est', pose: 'idle' }, out: 'ganó' },
      { type: 'player', pos: [-0.85, 0, 1.2], rot: [0, 0.4, 0], s: 0.85, at: 'ganó', enter: 'none', p: { kit: 'est', pose: 'cheer' } },
      { type: 'player', pos: [0.85, 0, 1.2], rot: [0, -0.4, 0], s: 0.85, p: { kit: 'pal', pose: 'idle', phase: 2, hair: '#3a2a1a', skin: '#c98d62' }, out: '2-0' },
      { type: 'player', pos: [0.85, 0, 1.2], rot: [0, -0.4, 0], s: 0.85, at: '2-0', enter: 'none', p: { kit: 'pal', pose: 'sad', phase: 2, hair: '#3a2a1a', skin: '#c98d62' } },
    ],
    overlays: [{ type: 'tag', text: '16/5/1968 · desempate de la final', at: '1968', x: 50, y: 75.3, color: TAG, size: 42 }] },

  // 12. Su primera Copa Libertadores
  { id: 'b12', set: 'room', cam: { from: [0.7, 2.0, 7.8], to: [0.0, 2.2, 6.9], look: [0, 1.5, 0], fov: 46 }, keywords: ['primera', 'Libertadores'],
    actors: [
      { type: 'ring', pos: [0, 0.03, 0], p: { r: 1.2, color: C.gold } },
      { type: 'box', pos: [0, 0.45, 0], p: { size: [0.7, 0.9, 0.7], color: '#2d1a6e' } },
      { type: 'cup', pos: [0, 0.9, 0], s: 1.7 },
      { type: 'player', pos: [-1.05, 0, 0.4], rot: [0, 0.5, 0], s: 0.85, p: { kit: 'est', pose: 'cheer' } },
      { type: 'player', pos: [1.05, 0, 0.4], rot: [0, -0.5, 0], s: 0.85, p: { kit: 'est', pose: 'cheer', phase: 1.3, hair: '#3a2a1a', skin: '#f2c39b' } },
      { type: 'label', pos: [0, 2.95, 0.1], at: 'primera', p: { text: 'PRIMERA COPA LIBERTADORES', w: 2.9, h: 0.38, ...GOLD } },
    ],
    overlays: [{ type: 'tag', text: '1968', at: 0.1, x: 50, y: 74.5, color: C.blue, size: 64 }] },

  // 13. 58 años después: mismo rival, misma cancha
  { id: 'b13', set: 'void', cam: { from: [0.9, 2.7, 9.2], to: [0.0, 2.4, 8.1], look: [0, 0.75, 0], fov: 46 }, keywords: ['58', 'después', 'rival', 'cancha'],
    actors: [
      { type: 'stadium', pos: [0, 0, -1.3], s: 0.85, p: { tower: false } },
      { type: 'calendar', pos: [-1.0, 2.15, 0.2], rot: [0, 0.2, 0], s: 0.5, p: { top: 'FINAL', big: '1968', color: C.blue } },
      { type: 'arrow', pos: [-0.38, 2.1, 0.2], rot: [0, 0, -PI / 2], at: 'años', enter: 'none', p: { len: 0.5, color: C.gold, dur: 0.4 } },
      { type: 'calendar', pos: [1.0, 2.15, 0.2], rot: [0, -0.2, 0], s: 0.5, at: 'después', p: { top: 'FINAL', big: '2026', color: C.red } },
      { type: 'player', pos: [-0.8, 0, 1.3], rot: [0, 0.4, 0], s: 0.7, p: { kit: 'est', pose: 'idle' } },
      { type: 'player', pos: [0.8, 0, 1.3], rot: [0, -0.4, 0], s: 0.7, at: 'rival', p: { kit: 'pal', pose: 'idle', phase: 2, hair: '#3a2a1a', skin: '#c98d62' } },
      { type: 'label', pos: [0.8, 1.42, 1.3], at: 'rival', p: { text: 'MISMO RIVAL', w: 1.3, h: 0.3, bg: GREEN, size: 0.62, weight: 900 } },
      { type: 'label', pos: [-0.8, 1.42, 1.3], at: 'cancha', p: { text: 'MISMA CANCHA', w: 1.3, h: 0.3, ...GOLD } },
    ],
    overlays: [{ type: 'big', text: '58 años', sub: '1968 → 2026', at: 0.05, y: 62 }] },

  // 14. ¿Cuál fue el viaje más largo que hiciste por tu club?
  { id: 'b14', cam: { from: [-1.1, 2.3, 8.8], to: [-0.1, 2.1, 7.7], look: [0, 0.45, 0.4], fov: 46 }, keywords: ['viaje', 'largo', 'club', 'Contalo'],
    actors: [
      { type: 'road', pos: [0, 0, 0.6], rot: [0, PI / 2, 0], p: { len: 30, speed: -3.2 } },
      { type: 'bike', pos: [-0.7, 0.05, 0.8], p: { shirt: RED, color: C.cyan }, bob: 0.01 },
      { type: 'label', pos: [0.75, 1.9, 0.3], at: 'viaje', bob: 0.04, p: { text: '?', w: 0.6, h: 0.6, bg: C.gold, color: '#15102b', size: 0.8, weight: 900 } },
      { type: 'phone', pos: [0.8, 1.0, 0.9], rot: [0, -0.3, 0], s: 1.0, at: 'Contalo', p: { kind: 'chat' } },
    ],
    overlays: [{ type: 'big', text: 'CONTALO ABAJO', sub: '¿tu viaje más largo por tu club?', at: 'Contalo', y: 62, size: 84 }] },
];
