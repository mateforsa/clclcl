import type { BeatSpec } from '../../src/Beat';
import { C } from '../../src/kit/math';

const PI = Math.PI;
const ME = { shirt: C.cyan, hair: '#3a2a1a', skin: '#f2c39b' };      // jugador genérico
const WK = { shirt: '#3b3470', hair: '#15102b', skin: '#c98d62', cap: C.gold };   // operario genérico
const LBL = { bg: '#2d1a6e', size: 0.56, weight: 900 };
const GOLD = { bg: C.gold, color: '#1a1030', size: 0.56, weight: 900 };
const TAG = '#2d1a6e';
// Todo el texto 2D queda entre 250 px desde arriba y 420 px desde abajo: `tag` (y <= 75,3 %) y `big` en y 62 %. Sin píldoras.
// Textos en pantalla: los de "Placas por plano" de guion.md, sin agregados. Carteles 3D: solo nombres.
const tag = (text: string, at: any, o: any = {}) => ({ type: 'tag' as const, text, at, x: 50, y: 75.3, color: TAG, size: 40, ...o });

export const BEATS: BeatSpec[] = [
  // 1. En 1998, esta consola ya traía módem para jugar por internet. Y fue la última de Sega.
  { id: 'b01', set: 'void', cam: { from: [0.9, 2.4, 8.4], to: [-0.2, 2.2, 7.3], look: [0, 0.72, 0], fov: 46 }, keywords: ['1998', 'consola', 'Sega'],
    actors: [
      { type: 'ring', pos: [0, 0.03, 0], p: { r: 1.45, color: C.cyan }, out: 'última' },
      { type: 'ring', pos: [0, 0.03, 0], at: 'última', enter: 'none', p: { r: 1.45, color: C.gold } },
      { type: 'box', pos: [0, 0.25, 0], p: { size: [2.0, 0.5, 1.9], color: '#2d1a6e' } },
      { type: 'dc', pos: [0, 0.5, 0], rot: [0, -0.3, 0], s: 1.45 },
      { type: 'modem', pos: [1.0, 0.5, 0.25], rot: [0, -0.3, 0], s: 1.1, at: 'módem' },
      { type: 'globe', pos: [1.05, 2.1, -0.6], s: 0.4, at: 'internet' },
      { type: 'trip', at: 'jugar', enter: 'none', p: { a: [1.0, 0.95, 0.25], b: [1.0, 1.7, -0.5], lift: 0.12, n: 10, dur: 0.6, color: C.cyan } },
      { type: 'label', pos: [-0.85, 2.15, 0.2], at: 'última', p: { text: 'SEGA', w: 1.1, h: 0.4, ...GOLD } },
    ],
    overlays: [{ type: 'big', text: '1998', at: 0, y: 62, size: 140 }, tag('MÓDEM ADENTRO', 'módem', { size: 46 })] },

  // 2. Se llama Dreamcast y salió a la venta en Japón hoy, hace 28 años.
  { id: 'b02', set: 'room', cam: { from: [-0.8, 2.4, 7.6], to: [0.2, 2.2, 6.8], look: [0, 1.25, 0], fov: 46 }, keywords: ['Dreamcast', 'Japón', '28'],
    actors: [
      { type: 'calendar', pos: [-0.9, 2.05, -0.2], rot: [0, 0.25, 0], s: 0.72, p: { top: 'NOVIEMBRE', big: '27', color: C.red } },
      { type: 'box', pos: [0.65, 0.4, 0], p: { size: [1.5, 0.8, 1.3], color: '#3a2a8a' } },
      { type: 'dc', pos: [0.65, 0.8, 0], rot: [0, -0.35, 0], s: 0.95 },
      { type: 'label', pos: [0.65, 1.65, 0.2], at: 'Dreamcast', p: { text: 'DREAMCAST', w: 1.5, h: 0.38, ...GOLD } },
      { type: 'box', pos: [-1.05, 0.25, 0.6], at: 'venta', p: { size: [0.6, 0.5, 0.5], color: '#f4f1ff' } },
      { type: 'box', pos: [-1.05, 0.75, 0.6], at: 'en', p: { size: [0.6, 0.5, 0.5], color: '#e8e4f5' } },
      { type: 'box', pos: [-0.4, 0.25, 0.75], at: 'Japón', p: { size: [0.6, 0.5, 0.5], color: '#f4f1ff' } },
    ],
    overlays: [{ type: 'big', text: 'HOY HACE 28 AÑOS', at: 'hoy', y: 62, size: 84 }, tag('27/11/1998 · JAPÓN', 'Japón', { size: 44 })] },

  // 3. A Estados Unidos llegó recién al año siguiente.
  { id: 'b03', set: 'void', cam: { from: [0.6, 2.3, 7.8], to: [-0.3, 2.2, 7.0], look: [0, 1.45, 0], fov: 46 }, keywords: ['Estados', 'Unidos', 'siguiente'],
    actors: [
      { type: 'globe', pos: [0, 1.25, -0.6], s: 0.95 },
      { type: 'label', pos: [-1.05, 1.5, 0.7], p: { text: 'Japón', w: 0.95, h: 0.34, ...LBL } },
      { type: 'trip', at: 'Estados', enter: 'none', p: { a: [-1.05, 1.8, 0.7], b: [1.05, 1.8, 0.7], lift: 0.75, n: 16, dur: 1.3, color: C.gold } },
      { type: 'dc', pos: [-1.05, 2.0, 0.7], s: 0.32, move: { to: [1.05, 2.0, 0.7], at: 'Estados', dur: 1.5 } },
      { type: 'label', pos: [1.05, 1.5, 0.7], at: 'Unidos', p: { text: 'EE. UU.', w: 0.95, h: 0.34, ...GOLD } },
    ],
    overlays: [tag('EE. UU.: 9/9/1999', 'Estados', { size: 46 })] },

  // 4. El módem venía adentro. Enchufabas el cable del teléfono y jugabas en línea.
  { id: 'b04', set: 'room', cam: { from: [0.8, 2.4, 7.2], to: [-0.1, 2.2, 6.4], look: [0, 1.05, 0], fov: 46 }, keywords: ['Enchufabas', 'teléfono', 'jugabas'],
    actors: [
      { type: 'box', pos: [-0.35, 0.3, 0], p: { size: [1.6, 0.6, 1.3], color: '#3a2a8a' } },
      { type: 'dc', pos: [-0.45, 0.6, 0], rot: [0, 0.2, 0], s: 0.95 },
      { type: 'modem', pos: [-0.3, 0.62, 0], rot: [0, 0.2, 0], at: 'módem', s: 0.9, move: { to: [0.62, 0.62, 0.15], at: 'venía', dur: 0.6 } },
      { type: 'box', pos: [1.3, 0.85, -0.5], p: { size: [0.7, 1.7, 0.12], color: '#b9a3e8' } },
      { type: 'jack', pos: [1.3, 0.85, -0.42], at: 'cable' },
      { type: 'cable', at: 'cable', enter: 'none', p: { a: [0.72, 0.72, 0.36], b: [1.3, 0.82, -0.38], sag: 0.25, dur: 0.6 } },
      { type: 'screen', pos: [-0.5, 2.2, -0.5], s: 0.75, at: 'jugabas', p: { kind: 'play' } },
      { type: 'globe', pos: [0.45, 2.55, -0.7], s: 0.3, at: 'línea' },
    ],
    overlays: [tag('MÓDEM DE FÁBRICA', 'adentro', { size: 46 })] },

  // 5. La tarjeta de memoria tenía pantalla propia y se enchufaba en el joystick.
  { id: 'b05', set: 'void', cam: { from: [-0.7, 2.3, 7.0], to: [0.2, 2.15, 6.3], look: [0, 1.45, 0], fov: 46 }, keywords: ['tarjeta', 'memoria', 'enchufaba'],
    actors: [
      { type: 'ring', pos: [0, 0.03, 0.3], p: { r: 1.2, color: C.magenta } },
      { type: 'vmu', pos: [0, 2.25, 0.3], s: 1.5, bob: 0.03, move: { to: [0, 1.55, 0.3], at: 'enchufaba', dur: 0.6 } },
      { type: 'ring', pos: [0, 2.48, 0.45], rot: [PI / 2, 0, 0], s: 0.2, at: 'pantalla', p: { r: 1.2, color: C.gold }, out: 'propia' },
      { type: 'pad', pos: [0, 0.95, 0.3], rot: [-0.12, 0, 0], s: 1.5, at: 'se', enter: 'drop' },
    ],
    overlays: [tag('TARJETA DE MEMORIA CON PANTALLA', 'pantalla', { size: 40 })] },

  // 6. Con algunos juegos, la sacabas y tenías un minijuego en la mano.
  { id: 'b06', set: 'room', cam: { from: [0.7, 2.3, 6.6], to: [-0.1, 2.15, 5.9], look: [0, 1.35, 0], fov: 46 }, keywords: ['algunos', 'sacabas', 'minijuego'],
    actors: [
      { type: 'gbox', pos: [-0.95, 2.35, -0.4], at: 'algunos', p: { color: C.cyan } },
      { type: 'gbox', pos: [-0.45, 2.45, -0.4], at: 'juegos', p: { color: C.magenta, ph: 1 } },
      { type: 'pad', pos: [0.85, 0.8, 0], rot: [-0.15, -0.25, 0], s: 1.1 },
      { type: 'vmu', pos: [0.85, 1.13, -0.02], rot: [-0.15, -0.25, 0], s: 1.1, out: 'tenías', move: { to: [-0.3, 1.3, 0.95], at: 'sacabas', dur: 0.6 } },
      { type: 'vmu', pos: [-0.3, 1.3, 0.95], rot: [-0.1, 0.2, 0], s: 1.1, at: 'tenías', enter: 'none', p: { game: true } },
      { type: 'person', pos: [-0.5, 0, 0.35], rot: [0, 0.35, 0], s: 1.1, p: { ...ME, pose: 'hold' } },
    ],
    overlays: [tag('MINIJUEGO EN LA MANO', 'tenías', { size: 46 })] },

  // 7. Pero en marzo de 2000 salió en Japón la PlayStation 2.
  { id: 'b07', set: 'void', cam: { from: [-0.8, 2.3, 7.8], to: [0.2, 2.1, 7.0], look: [0, 1.0, 0], fov: 46 }, keywords: ['2000', 'Japón', 'PlayStation'],
    actors: [
      { type: 'calendar', pos: [-0.95, 2.35, -0.3], rot: [0, 0.25, 0], s: 0.62, at: 'marzo', p: { top: 'MARZO', big: '2000', color: C.blue } },
      { type: 'dc', pos: [-0.75, 0, 0.3], rot: [0, 0.35, 0], s: 0.75 },
      { type: 'ring', pos: [0.6, 0.03, 0], at: 'salió', p: { r: 0.95, color: C.blue } },
      { type: 'tower', pos: [0.6, 0, 0], rot: [0, -0.5, 0], s: 1.2, at: 'salió', enter: 'grow', p: { color: '#34304a' } },
    ],
    overlays: [tag('PLAYSTATION 2 · JAPÓN · 4/3/2000', 'salió', { size: 38 })] },

  // 8. El 31 de enero de 2001, Sega anunció que dejaba de fabricarla.
  { id: 'b08', set: 'room', cam: { from: [0.8, 2.6, 7.6], to: [-0.1, 2.4, 6.8], look: [0, 1.15, 0], fov: 46 }, keywords: ['31', '2001', 'Sega', 'anunció', 'fabricarla'],
    actors: [
      { type: 'calendar', pos: [-0.95, 2.15, -0.4], rot: [0, 0.25, 0], s: 0.62, at: '31', p: { top: 'ENERO', big: '31', color: C.red } },
      { type: 'box', pos: [0.35, 0.3, 0], p: { size: [2.2, 0.6, 1.4], color: '#3a2a8a' } },
      { type: 'podium', pos: [0.45, 0.6, 0.1] },
      { type: 'label', pos: [0.45, 1.32, 0.37], at: 'Sega', p: { text: 'SEGA', w: 0.6, h: 0.18, bg: C.gold, color: '#1a1030', size: 0.7, weight: 900, depth: 0.02 } },
      { type: 'dc', pos: [-0.65, 0.6, 0.35], rot: [0, 0.4, 0], s: 0.55, out: 'dejaba' },
      { type: 'cross', pos: [-0.65, 1.0, 0.75], at: 'dejaba', p: { size: 0.5 } },
      { type: 'dc', pos: [-0.65, 0.6, 0.35], rot: [0, 0.4, 0], s: 0.55, at: 'dejaba', enter: 'none', p: { led: '#555', glow: 0 } },
    ],
    overlays: [{ type: 'big', text: '31/1/2001', at: '31', y: 62, red: true, size: 120 }, tag('SEGA DEJA DE FABRICARLA', 'anunció', { size: 44, color: C.red })] },

  // 9. La fabricación se frenó a fin de marzo, a poco más de dos años del lanzamiento.
  { id: 'b09', set: 'neon', cam: { from: [-0.8, 2.4, 7.2], to: [0.2, 2.2, 6.5], look: [0, 1.05, 0], fov: 46 }, keywords: ['fabricación', 'lanzamiento'],
    actors: [
      { type: 'belt', pos: [0, 0, 0.3], p: { stopAt: 1.0, n: 4, len: 2.8, v: 0.9 } },
      { type: 'person', pos: [-0.8, 0, -0.75], s: 0.85, p: { ...WK, pose: 'idle' }, out: 'frenó' },
      { type: 'person', pos: [-0.8, 0, -0.75], s: 0.85, at: 'frenó', enter: 'none', p: { ...WK, pose: 'shrug' } },
      { type: 'person', pos: [0.6, 0, -0.75], s: 0.85, p: { ...WK, shirt: C.magenta, pose: 'idle', phase: 1.3 }, out: 'fin' },
      { type: 'person', pos: [0.6, 0, -0.75], s: 0.85, at: 'fin', enter: 'none', p: { ...WK, shirt: C.magenta, pose: 'sad', phase: 1.3 } },
      { type: 'cross', pos: [0, 1.75, 0.6], at: 'poco', p: { size: 0.5 } },
    ],
    overlays: [tag('FIN DE FABRICACIÓN: 31/3/2001', 'marzo', { size: 42, color: C.red })] },

  // 10. Sega hacía consolas desde 1983.
  { id: 'b10', set: 'void', cam: { from: [0.8, 2.5, 8.4], to: [-0.2, 2.3, 7.6], look: [0, 1.1, 0], fov: 46 }, keywords: ['Sega', '1983'],
    actors: [
      { type: 'label', pos: [0, 2.6, -0.2], at: 0.05, p: { text: 'SEGA', w: 1.2, h: 0.42, ...GOLD } },
      { type: 'box', pos: [-1.3, 0.15, 0], at: 0.1, enter: 'grow', p: { size: [0.85, 0.3, 0.8], color: '#2d1a6e' } },
      { type: 'retro', pos: [-1.3, 0.3, 0], rot: [0, 0.3, 0], s: 0.8, at: 0.2, p: { v: 0 } },
      { type: 'box', pos: [-0.45, 0.3, 0], at: 'hacía', enter: 'grow', p: { size: [0.85, 0.6, 0.8], color: '#3a2a8a' } },
      { type: 'retro', pos: [-0.45, 0.6, 0], rot: [0, 0.2, 0], s: 0.78, at: 'hacía', p: { v: 1 } },
      { type: 'box', pos: [0.45, 0.45, 0], at: 'consolas', enter: 'grow', p: { size: [0.85, 0.9, 0.8], color: '#2d1a6e' } },
      { type: 'retro', pos: [0.45, 0.9, 0], rot: [0, -0.2, 0], s: 0.85, at: 'consolas', p: { v: 2 } },
      { type: 'box', pos: [1.3, 0.6, 0], at: 'desde', enter: 'grow', p: { size: [0.85, 1.2, 0.8], color: '#3a2a8a' } },
      { type: 'dc', pos: [1.3, 1.2, 0], rot: [0, -0.3, 0], s: 0.55, at: 'desde' },
      { type: 'box', pos: [0, 0.05, 0.6], p: { size: [3.4, 0.05, 0.06], color: C.gold, glow: true, ei: 0.8 } },
    ],
    overlays: [tag('SEGA · CONSOLAS: 1983 → 2001', '1983', { size: 42 })] },

  // 11. Desde 2001, hace juegos para las de sus rivales: Sony, Nintendo y Microsoft.
  { id: 'b11', set: 'neon', cam: { from: [-0.8, 2.5, 8.4], to: [0.2, 2.3, 7.6], look: [0, 0.95, 0], fov: 46 }, keywords: ['2001', 'Sony', 'Nintendo', 'Microsoft'],
    actors: [
      { type: 'label', pos: [0, 2.85, -0.3], p: { text: 'SEGA', w: 1.1, h: 0.38, ...GOLD } },
      { type: 'gbox', pos: [-0.45, 2.15, -0.3], at: 'juegos', s: 0.8, p: { color: C.cyan }, move: { to: [-1.15, 1.65, 0.2], at: 'Sony', dur: 0.6 } },
      { type: 'gbox', pos: [0, 2.15, -0.3], at: 'para', s: 0.8, p: { color: C.magenta, ph: 1 }, move: { to: [0, 1.35, 0.5], at: 'Nintendo', dur: 0.6 } },
      { type: 'gbox', pos: [0.45, 2.15, -0.3], at: 'las', s: 0.8, p: { color: C.gold, ph: 2 }, move: { to: [1.15, 1.65, 0.2], at: 'Microsoft', dur: 0.6 } },
      { type: 'tower', pos: [-1.15, 0, 0], rot: [0, 0.4, 0], s: 0.7, at: 'Sony', enter: 'grow' },
      { type: 'cube', pos: [0, 0, 0.3], rot: [0, -0.2, 0], s: 1.1, at: 'Nintendo' },
      { type: 'console', pos: [1.15, 0, 0], rot: [0, -0.4, 0], s: 0.68, at: 'Microsoft', enter: 'grow', p: { kind: 'b' } },
    ],
    overlays: [tag('DESDE 2001: JUEGOS PARA OTRAS CONSOLAS', '2001', { size: 36, y: 69.5 }), tag('SONY · NINTENDO · MICROSOFT', 'Sony', { size: 42 })] },

  // 12. ¿Vos tuviste una? Contá a qué jugabas.
  { id: 'b12', set: 'room', cam: { from: [0.6, 2.4, 7.0], to: [-0.1, 2.25, 6.4], look: [0, 0.95, 0], fov: 46 }, keywords: ['tuviste'],
    actors: [
      { type: 'box', pos: [-0.9, 0.45, -0.4], p: { size: [1.2, 0.9, 0.7], color: '#3a2a8a' } },
      { type: 'dc', pos: [-0.9, 0.9, -0.35], rot: [0, 0.3, 0], s: 0.6 },
      { type: 'screen', pos: [-0.9, 1.95, -0.55], rot: [0, 0.3, 0], s: 0.85, p: { kind: 'play' } },
      { type: 'sofa', pos: [0.75, 0, 0.1], rot: [0, -0.4, 0], s: 0.85 },
      { type: 'person', pos: [0.75, 0, 0.15], rot: [0, -0.4, 0], s: 0.85, p: { ...ME, pose: 'sit' } },
      { type: 'pad', pos: [0.62, 0.55, 0.45], rot: [-1.1, -0.4, 0], s: 0.4, at: 'Contá' },
    ],
    overlays: [{ type: 'big', text: '¿TUVISTE UNA?', at: 'tuviste', y: 62, size: 110 }] },
];
