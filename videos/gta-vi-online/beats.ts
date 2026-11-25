import type { BeatSpec } from '../../src/Beat';
import { C } from '../../src/kit/math';

const ROCK = { shirt: C.gold, hair: '#15102b', skin: '#f2c39b' };       // muñeco "Rockstar" (el mismo de la serie)
const SUIT = { shirt: '#2b2740', hair: '#c98a3a', pants: '#1c1830' };   // analista (genérico)
const TT = { shirt: '#f4f1ff', hair: '#7a3b1a', skin: '#c98d62', pants: '#1c1830' };   // Take-Two (genérico)
const VI = { label: 'VI', color: '#c2307e', glow: true };
const V = { label: 'V', color: '#2e9e5b' };
const UP = [[0, 0.2], [0.25, 0.32], [0.5, 0.3], [0.75, 0.58], [1, 0.88]];
const FORT = '#8a6bff';

export const BEATS: BeatSpec[] = [
  // 1. pregunta
  { id: 'b01', cam: { from: [-0.8, 2.1, 8.6], to: [0.3, 2.4, 7.4], look: [0, 1.4, 0], fov: 46 }, keywords: ['plata', 'GTA'],
    actors: [
      { type: 'ring', pos: [0, 0.03, 0.9], p: { r: 0.75, color: C.cyan } },
      { type: 'person', pos: [0, 0, 0.9], p: { ...ROCK, pose: 'shrug' } },
      { type: 'gamebox', pos: [-1.1, 1.75, 0], s: 0.7, bob: 0.05, p: VI },
      { type: 'coins', pos: [1.1, 0, 0], s: 0.85, enter: 'none', p: { n: 30, dur: 1.6, r: 0.4, from: 6 } },
      { type: 'label', pos: [0, 2.75, 0.9], at: 'plata', bob: 0.06, p: { text: '?', w: 0.9, h: 0.9, size: 0.95, color: C.gold, weight: 900 } },
    ],
    overlays: [{ type: 'pill', text: '¿DÓNDE ESTÁ LA PLATA?', at: 'plata' }] },
  // 2. en la caja no, en el online
  { id: 'b02', set: 'void', cam: { from: [0.7, 2.3, 7.8], to: [-0.3, 2.1, 7.0], look: [0, 1.5, 0], fov: 44 }, keywords: ['no', 'online'],
    actors: [
      { type: 'gamebox', pos: [-0.9, 1.75, 0], s: 0.85, p: VI },
      { type: 'label', pos: [-0.9, 0.7, 0.2], p: { text: 'LA CAJA', w: 1.2, h: 0.36, bg: '#15102b', color: '#fff', size: 0.62 } },
      { type: 'cross', pos: [-0.9, 1.75, 0.4], at: 'no', p: { size: 0.9 } },
      { type: 'ring', pos: [0.9, 0.03, 0], p: { r: 0.6, color: C.gold } },
      { type: 'coins', pos: [0.9, 0, 0], s: 0.85, at: 'Está', enter: 'none', p: { n: 34, dur: 1.1, r: 0.4 } },
      { type: 'label', pos: [1.0, 0.45, 0.6], at: 'online', p: { text: 'ONLINE', w: 1.05, h: 0.36, bg: C.cyan, color: '#10203a', size: 0.66, weight: 900 } },
    ],
    overlays: [{ type: 'pill', text: 'LA PLATA: EN EL ONLINE', at: 'online' }] },
  // 3. GTA VI todavía no lo tiene
  { id: 'b03', cam: { from: [0.6, 1.9, 7.8], to: [-0.3, 2.5, 8.7], look: [0, 1.5, 0], fov: 46 }, keywords: ['GTA', 'todavía'],
    actors: [
      { type: 'coins', pos: [-0.95, 0, 0], s: 0.85, enter: 'none', p: { n: 40, dur: 0.01, r: 0.4 } },
      { type: 'label', pos: [-1.1, 0.42, 0.6], p: { text: 'VENTAS', w: 0.95, h: 0.32, bg: '#15102b', color: C.gold, size: 0.66 } },
      { type: 'slot', pos: [0.95, 0, 0], p: { h: 3.0, r: 0.42, color: C.cyan } },
      { type: 'label', pos: [1.1, 0.42, 0.6], p: { text: 'ONLINE', w: 0.95, h: 0.32, bg: '#15102b', color: C.cyan, size: 0.66 } },
      { type: 'gamebox', pos: [0.95, 2.0, 0], s: 0.55, bob: 0.05, p: VI, out: 'todavía' },
      { type: 'label', pos: [0.95, 2.0, 0], at: 'todavía', bob: 0.06, p: { text: '?', w: 0.9, h: 0.9, size: 0.95, color: C.gold, weight: 900 } },
      { type: 'person', pos: [0, 0, 1.5], s: 0.8, rot: [0, 0.5, 0], p: { ...ROCK, pose: 'idle' }, out: 'todavía' },
      { type: 'person', pos: [0, 0, 1.5], s: 0.8, rot: [0, 0.5, 0], at: 'todavía', enter: 'none', p: { ...ROCK, pose: 'shrug' } },
    ],
    overlays: [{ type: 'pill', text: 'GTA VI: SIN ONLINE', at: 'todavía', red: true }] },
  // 4. el analista
  { id: 'b04', set: 'room', cam: { from: [0.8, 2.3, 6.2], to: [-0.2, 2.1, 5.4], look: [0, 1.5, -0.6], fov: 46, shift: 0.06 }, keywords: ['23', 'Bank', 'informe'],
    actors: [
      { type: 'calendar', pos: [-0.95, 2.15, -0.8], rot: [0, 0.2, 0], s: 0.72, p: { top: 'NOVIEMBRE', big: '23', color: C.red } },
      { type: 'desk', pos: [0.45, 0, -0.5], s: 1.15 },
      { type: 'laptop', pos: [0.45, 0.92, -0.5], s: 1.1, at: 'analista', p: { kind: 'code' } },
      { type: 'person', pos: [-0.75, 0, 0.1], rot: [0, 0.6, 0], s: 0.95, p: { ...SUIT, pose: 'idle' }, out: 'publicó' },
      { type: 'person', pos: [-0.75, 0, 0.1], rot: [0, 0.6, 0], s: 0.95, at: 'publicó', enter: 'none', p: { ...SUIT, pose: 'point' } },
      { type: 'label', pos: [0.6, 2.2, -0.3], rot: [0, -0.15, 0.05], at: 'publicó', bob: 0.04, p: { text: 'INFORME', w: 1.2, h: 1.2, bg: '#f4f1ff', color: '#1a1030', size: 0.2, weight: 900, sub: 'GTA VI', subColor: '#6b5aa8' } },
    ],
    overlays: [{ type: 'plate', name: 'OMAR DESSOUKY', role: 'Bank of America', at: 'Bank', y: 68 }] },
  // 5. más grande que Fortnite
  { id: 'b05', set: 'void', cam: { from: [-0.7, 2.2, 8.4], to: [0.3, 2.5, 7.6], look: [0, 1.5, 0], fov: 46 }, keywords: ['Según', 'grande', 'Fortnite'],
    actors: [
      { type: 'box', pos: [-0.85, 0.95, 0], p: { size: [0.85, 1.9, 0.85], color: FORT, glow: true, ei: 0.45 } },
      { type: 'label', pos: [-0.85, 0.5, 0.62], p: { text: 'FORTNITE', w: 1.15, h: 0.36, bg: '#15102b', color: '#fff', size: 0.62, weight: 900 } },
      { type: 'slot', pos: [0.85, 0, 0], at: 'online', enter: 'grow', p: { h: 1.2, r: 0.42, color: C.cyan } },
      { type: 'slot', pos: [0.85, 1.2, 0], at: 'grande', enter: 'grow', p: { h: 1.6, r: 0.42, color: C.gold } },
      { type: 'label', pos: [0.85, 0.5, 0.62], at: 'online', p: { text: 'GTA VI ONLINE', w: 1.3, h: 0.36, bg: '#15102b', color: C.cyan, size: 0.6, weight: 900 } },
      { type: 'label', pos: [0.85, 2.0, 0], at: 'grande', bob: 0.06, p: { text: '?', w: 0.9, h: 0.9, size: 0.95, color: C.gold, weight: 900 } },
      { type: 'arrow', pos: [1.6, 1.2, 0], at: 'grande', enter: 'none', p: { len: 1.3, color: C.gold, dur: 0.7 } },
    ],
    overlays: [{ type: 'tag', text: 'SEGÚN UN ANALISTA', at: 0.1, x: 50, y: 27, color: C.red }, { type: 'pill', text: '¿MÁS GRANDE QUE FORTNITE?', at: 'Fortnite' }] },
  // 6. la vara: Fortnite 2018
  { id: 'b06', cam: { from: [0.9, 2.7, 9.2], to: [-0.4, 2.3, 7.8], look: [0, 1.8, 0], fov: 46 }, keywords: ['vara', '2018', '5.480', 'Epic'],
    actors: [
      { type: 'bars', pos: [0, 0, -0.2], enter: 'none', p: { vals: [2.9], colors: [FORT], w: 1.0, dur: 1.3 } },
      { type: 'box', pos: [0, 2.98, -0.2], at: 'alta', p: { size: [2.9, 0.07, 0.07], color: C.gold, glow: true, ei: 1.6 } },
      { type: 'label', pos: [0, 2.2, 0.35], at: 0.3, p: { text: 'FORTNITE', w: 1.0, h: 0.3, bg: '#15102b', color: '#fff', size: 0.62, weight: 900 } },
      { type: 'calendar', pos: [-1.15, 2.1, 0.4], rot: [0, 0.25, 0], s: 0.6, at: '2018', p: { top: 'AÑO', big: '2018', color: C.blue } },
      { type: 'coins', pos: [-1.2, 0, 0.3], at: 'facturó', enter: 'none', p: { n: 14, dur: 0.9 } },
      { type: 'coins', pos: [1.2, 0, 0.3], at: '5.480', enter: 'none', p: { n: 20, dur: 1.0 } },
      { type: 'label', pos: [1.15, 2.3, 0.4], rot: [0, -0.25, 0.05], at: 'documentos', bob: 0.04, p: { text: 'DOCUMENTOS', w: 1.0, h: 1.0, bg: '#f4f1ff', color: '#1a1030', size: 0.17, weight: 900, sub: 'DE EPIC', subColor: '#6b5aa8' } },
    ],
    overlays: [{ type: 'big', text: '', count: { to: 5480, pre: 'US$ ', post: ' M' }, sub: 'Fortnite en 2018 · documentos de Epic', at: '5.480', size: 108 }] },
  // 7. GTA Online: ~5.000 M en 12 años
  { id: 'b07', set: 'void', cam: { from: [-0.8, 2.6, 8.8], to: [0.4, 2.3, 7.8], look: [0, 1.8, 0], fov: 46 }, keywords: ['estima', '5.000', 'doce'],
    actors: [
      { type: 'ring', pos: [0, 0.03, 0], p: { r: 0.7, color: '#2e9e5b' } },
      { type: 'gamebox', pos: [0, 2.55, 0], s: 0.6, bob: 0.04, p: V, out: 'Pero' },
      { type: 'label', pos: [0, 1.75, 0.3], at: 0.2, out: 'juntó', p: { text: 'GTA ONLINE', w: 1.4, h: 0.38, bg: '#2e9e5b', color: '#fff', size: 0.62, weight: 900 } },
      { type: 'coins', pos: [0, 0, 0], s: 0.9, at: 'juntó', enter: 'none', p: { n: 22, dur: 4.2, r: 0.4 } },
      { type: 'calendar', pos: [-1.1, 2.3, 0.2], rot: [0, 0.25, 0], s: 0.62, at: 'Pero', p: { top: 'DESDE', big: '2013', color: '#2e9e5b' } },
      { type: 'calendar', pos: [1.1, 2.3, 0.2], rot: [0, -0.25, 0], s: 0.62, at: 'doce', p: { top: 'HASTA', big: '2026', color: C.red } },
      { type: 'arrow', pos: [-0.45, 2.3, 0.2], rot: [0, 0, -Math.PI / 2], at: 'más', enter: 'none', p: { len: 0.7, color: C.gold, dur: 0.6 } },
    ],
    overlays: [{ type: 'big', text: '', count: { to: 5000, pre: '≈ US$ ', post: ' M' }, sub: 'GTA Online · estimación, no oficial', at: '5.000', size: 100 }] },
  // 8. Take-Two nunca lo publicó
  { id: 'b08', set: 'room', cam: { from: [-0.7, 2.3, 6.2], to: [0.3, 2.1, 5.4], look: [0, 1.55, -0.6], fov: 46, shift: 0.06 }, keywords: ['nunca', 'filtrados'],
    actors: [
      { type: 'person', pos: [-1.1, 0, -0.1], rot: [0, 0.6, 0], s: 0.92, p: { ...TT, pose: 'idle' }, out: 'nunca' },
      { type: 'person', pos: [-1.1, 0, -0.1], rot: [0, 0.6, 0], s: 0.92, at: 'nunca', enter: 'none', p: { ...TT, pose: 'shrug' } },
      { type: 'label', pos: [0.35, 2.45, -0.8], p: { text: '≈ 5.000 M', w: 1.9, h: 0.8, bg: '#15102b', border: C.gold, color: C.gold, size: 0.55, weight: 900 } },
      { type: 'label', pos: [0.35, 1.72, -0.7], p: { text: 'CIFRA OFICIAL', w: 1.5, h: 0.36, bg: '#2d1a6e', color: '#fff', size: 0.6, weight: 900 } },
      { type: 'cross', pos: [0.35, 1.72, -0.5], at: 'nunca', p: { size: 0.6 } },
      { type: 'server', pos: [0.75, 0, 0.1], s: 0.62, at: 'Sale', p: { alarm: true } },
    ],
    overlays: [{ type: 'plate', name: 'TAKE-TWO', role: 'no publicó la cifra', at: 0.15, out: 'Sale', y: 68 }, { type: 'pill', text: 'SALE DE DATOS FILTRADOS', at: 'filtrados', red: true }] },
  // 9. precio objetivo
  { id: 'b09', cam: { from: [0.8, 2.5, 8.8], to: [-0.3, 2.3, 7.6], look: [0, 1.9, 0], fov: 46 }, keywords: ['precio objetivo', '330', '350'],
    actors: [
      { type: 'chart', pos: [0.25, 2.2, -0.2], p: { pts: UP, w: 2.7, h: 1.8, dur: 5.2, delay: 0.4 } },
      { type: 'person', pos: [-1.3, 0, 0.9], rot: [0, 0.7, 0], s: 0.85, p: { ...SUIT, pose: 'point' } },
      { type: 'label', pos: [-0.5, 1.75, 0], at: '330', p: { text: '330', w: 0.7, h: 0.32, bg: '#15102b', color: '#fff', size: 0.7, weight: 900 } },
      { type: 'label', pos: [1.05, 3.0, 0], at: '350', p: { text: '350', w: 0.8, h: 0.36, bg: C.green, color: '#0d2b18', size: 0.7, weight: 900 } },
    ],
    overlays: [
      { type: 'tag', text: 'acción de Take-Two', at: 'acción', x: 50, y: 27, color: C.blue },
      { type: 'big', text: 'US$ 330', sub: 'precio objetivo anterior', at: '330', out: '350', size: 108 },
      { type: 'big', text: 'US$ 350', sub: 'precio objetivo · Bank of America', at: '350', size: 108 },
    ] },
  // 10. es un pronóstico
  { id: 'b10', set: 'void', cam: { from: [-0.6, 2.3, 7.8], to: [0.4, 2.1, 7.0], look: [0, 1.5, 0], fov: 44 }, keywords: ['pronóstico', 'nada'],
    actors: [
      { type: 'person', pos: [-0.9, 0, 0], rot: [0, 0.4, 0], s: 0.95, p: { ...SUIT, pose: 'hold' } },
      { type: 'label', pos: [-0.8, 2.35, 0.1], at: 0.1, p: { text: 'PRONÓSTICO', w: 1.5, h: 0.44, bg: C.gold, color: '#1a1030', size: 0.6, weight: 900 } },
      { type: 'person', pos: [0.9, 0, 0], rot: [0, -0.4, 0], s: 0.95, at: 'Rockstar', p: { ...ROCK, pose: 'shrug' } },
      { type: 'label', pos: [0.85, 2.35, 0.1], at: 'Rockstar', p: { text: 'ROCKSTAR', w: 1.3, h: 0.4, bg: '#15102b', color: C.gold, size: 0.62, weight: 900 } },
      { type: 'cross', pos: [0.85, 2.95, 0.1], at: 'nada', p: { size: 0.6 } },
    ],
    overlays: [{ type: 'pill', text: 'ROCKSTAR NO ANUNCIÓ NADA', at: 'nada', red: true }] },
  // 11. ni fecha, ni nombre, ni precio
  { id: 'b11', cam: { from: [0.5, 2.4, 8.4], to: [-0.3, 2.2, 7.6], look: [0, 1.6, 0], fov: 46 }, keywords: ['fecha', 'nombre', 'precio'],
    actors: [
      { type: 'slot', pos: [0, 0, -0.6], p: { h: 1.1, r: 0.5, color: C.cyan } },
      { type: 'label', pos: [0, 0.6, 0.1], p: { text: 'ONLINE', w: 1.05, h: 0.34, bg: '#15102b', color: C.cyan, size: 0.66 } },
      ...['FECHA', 'NOMBRE', 'PRECIO'].map((tx, i) => ({ type: 'label', pos: [-1.05 + i * 1.05, 2.2 + (i === 1 ? 0.35 : 0), 0] as any, p: { text: tx, w: 0.98, h: 0.42, bg: '#2d1a6e', color: '#fff', size: 0.56, weight: 900 } })),
      ...['fecha', 'nombre', 'precio'].map((wd, i) => ({ type: 'cross', pos: [-0.68 + i * 1.05, 2.42 + (i === 1 ? 0.35 : 0), 0.25] as any, at: wd, p: { size: 0.36 } })),
    ],
    overlays: [{ type: 'pill', text: 'SIN FECHA · SIN NOMBRE', at: 'nombre', red: true }] },
  // 12. Bloomberg: 2027, sin confirmar
  { id: 'b12', set: 'room', cam: { from: [0.7, 2.3, 6.2], to: [-0.3, 2.1, 5.5], look: [0, 1.6, -0.6], fov: 46, shift: 0.06 }, keywords: ['Bloomberg', '2027', 'Nadie'],
    actors: [
      { type: 'screen', pos: [-0.72, 2.0, -0.8], rot: [0, 0.15, 0], p: { kind: 'text', text: 'BLOOMBERG', w: 1.5, h: 0.85, stand: true } },
      { type: 'desk', pos: [-0.72, 0, -0.8], s: 1.1 },
      { type: 'calendar', pos: [0.85, 1.75, -0.3], rot: [0, -0.2, 0], s: 0.74, at: '2027', p: { top: 'ONLINE', big: '2027', color: C.blue } },
      { type: 'label', pos: [0.05, 2.75, -0.2], at: 'Nadie', bob: 0.05, p: { text: '?', w: 0.8, h: 0.8, size: 0.95, color: C.gold, weight: 900 } },
      { type: 'person', pos: [0.7, 0, 0.5], rot: [0, -0.5, 0], s: 0.8, at: 'Nadie', p: { ...ROCK, pose: 'shrug' } },
    ],
    overlays: [{ type: 'pill', text: 'NO ESTÁ CONFIRMADO', at: 'Nadie', red: true }] },
  // 13. la torre y el lugar vacío
  { id: 'b13', cam: { from: [0.5, 1.7, 8.4], to: [-0.4, 2.9, 10.6], look: [0, 1.2, 0], lookTo: [0, 1.8, 0], fov: 46 }, keywords: ['torre', 'vacío', 'online'],
    actors: [
      { type: 'ring', pos: [-0.95, 0.03, 0], p: { r: 0.7, color: C.gold } },
      { type: 'coins', pos: [-0.95, 0, 0], s: 0.85, enter: 'none', p: { n: 47, dur: 2.0, r: 0.4, from: 14 } },
      { type: 'label', pos: [-1.1, 0.42, 0.6], p: { text: 'VENTAS', w: 0.95, h: 0.32, bg: '#15102b', color: C.gold, size: 0.66 } },
      { type: 'slot', pos: [0.95, 0, 0], at: 'lado', enter: 'grow', p: { h: 3.5, r: 0.42, color: C.cyan } },
      { type: 'label', pos: [1.1, 0.42, 0.6], at: 'online', p: { text: 'ONLINE', w: 0.95, h: 0.32, bg: '#15102b', color: C.cyan, size: 0.66 } },
      { type: 'label', pos: [0.95, 2.0, 0], at: 'vacío', bob: 0.06, p: { text: '?', w: 0.9, h: 0.9, size: 0.95, color: C.gold, weight: 900 } },
      { type: 'person', pos: [0, 0, 1.5], s: 0.8, p: { ...ROCK, pose: 'cheer' }, out: 'lado' },
      { type: 'person', pos: [0, 0, 1.5], s: 0.8, rot: [0, 0.6, 0], at: 'lado', enter: 'none', p: { ...ROCK, pose: 'idle' } },
    ],
    overlays: [{ type: 'pill', text: 'ONLINE: SIN FECHA', at: 'online', red: true }] },
  // 14. parte 4, seguime
  { id: 'b14', set: 'void', cam: { from: [-0.5, 2.3, 7.6], to: [0.2, 2.1, 6.6], look: [0, 1.5, 0], fov: 44 }, keywords: ['parte cuatro', 'anuncien'],
    actors: [
      { type: 'ring', pos: [0, 0.03, 0.3], p: { r: 0.85, color: C.cyan } },
      { type: 'person', pos: [0, 0, 0.3], p: { ...ROCK, pose: 'point' } },
      ...[1, 2, 3].map((n, i) => ({ type: 'label', pos: [-1.2 + i * 0.72, 2.45, 0] as any, at: 0.05 + i * 0.12, p: { text: String(n), w: 0.58, h: 0.58, bg: '#2d1a6e', color: '#9a8fd0', size: 0.7, weight: 900 } })),
      { type: 'label', pos: [1.05, 2.5, 0.1], at: 'cuatro', p: { text: '4', w: 0.78, h: 0.78, bg: C.gold, color: '#1a1030', size: 0.74, weight: 900 } },
    ],
    overlays: [{ type: 'tag', text: 'GTA VI · PARTE 4', at: 'parte', x: 50, y: 27, color: C.red, out: 'Seguime' }, { type: 'big', text: 'SEGUIME', sub: 'el día del anuncio, lo cuento acá', at: 'Seguime', size: 110 }] },
  // 15. ¿online o historia?
  { id: 'b15', cam: { from: [0.5, 2.3, 8.0], to: [-0.2, 2.1, 7.0], look: [0, 1.5, 0], fov: 46 }, keywords: ['Online', 'historia'],
    actors: [
      { type: 'coins', pos: [-0.9, 0, 0], s: 0.85, enter: 'none', p: { n: 22, dur: 0.6, r: 0.4, from: 8 } },
      { type: 'label', pos: [-0.9, 2.55, 0], rot: [0, 0.2, 0], at: 0.05, p: { text: 'ONLINE', w: 1.35, h: 0.5, bg: C.cyan, color: '#10203a', size: 0.62, weight: 900 } },
      { type: 'gamebox', pos: [0.9, 1.35, 0], s: 0.75, at: 'historia', p: VI },
      { type: 'label', pos: [0.9, 2.55, 0], rot: [0, -0.2, 0], at: 'historia', p: { text: 'HISTORIA', w: 1.35, h: 0.5, bg: C.magenta, color: '#fff', size: 0.62, weight: 900 } },
    ],
    overlays: [{ type: 'big', text: '¿ONLINE O HISTORIA?', sub: 'te leo en los comentarios', at: 'Te', size: 76 }] },
];
