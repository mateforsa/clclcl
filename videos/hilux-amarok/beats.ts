import type { BeatSpec } from '../../src/Beat';
import { C } from '../../src/kit/math';

const PI = Math.PI;
const HIL = C.gold;      // pick-up 1 (Hilux): dorado liso
const AMA = C.cyan;      // pick-up 2 (Amarok): celeste liso
const DARK = '#1a1030';
type V = [number, number, number];

export const BEATS: BeatSpec[] = [
  // 1. este mes dejan de fabricarse
  { id: 'b01', cam: { from: [1.0, 3.0, 8.8], to: [0.2, 2.6, 7.8], look: [0, 1.1, 0], fov: 44 }, keywords: ['dejan', 'fabricarse', 'dos'],
    actors: [
      { type: 'ring', pos: [0, 0.03, 0], p: { r: 1.7, color: C.magenta } },
      { type: 'pickup', pos: [-0.8, 0, 0], rot: [0, 0.45, 0], s: 0.82, p: { color: HIL } },
      { type: 'pickup', pos: [0.8, 0, 0], rot: [0, -0.45, 0], s: 0.82, p: { color: AMA } },
      { type: 'calendar', pos: [0, 2.55, -0.6], s: 0.72, at: 'mes', bob: 0.03, p: { top: 'NOVIEMBRE', big: '2026', color: C.red } },
      { type: 'cross', pos: [-0.8, 1.35, 0.6], at: 'fabricarse', p: { size: 0.55 } },
      { type: 'cross', pos: [0.8, 1.35, 0.6], at: 'dos', p: { size: 0.55 } },
    ],
    overlays: [{ type: 'big', text: 'SE DESPIDEN', sub: 'dejan de fabricarse este mes', at: 'fabricarse', red: true, size: 104 }] },
  // 2. Hilux y Amarok actuales, línea de montaje
  { id: 'b02', set: 'void', cam: { from: [-0.8, 2.9, 7.6], to: [0.3, 2.5, 6.8], look: [0, 1.0, 0], fov: 46 }, keywords: ['Hilux', 'Amarok', 'despiden'],
    actors: [
      { type: 'line', pos: [0, 0, -1.3], p: { len: 7, n: 4, speed: 1.0, colors: [HIL], stopAt: 2.4, sc: 0.62 } },
      { type: 'line', pos: [0, 0, 0.9], p: { len: 7, n: 4, speed: -1.0, colors: [AMA], stopAt: 2.4, sc: 0.62 } },
      { type: 'label', pos: [-0.7, 2.25, -1.3], at: 'Hilux', bob: 0.03, p: { text: 'HILUX', w: 1.5, h: 0.5, bg: HIL, color: DARK, size: 0.64, weight: 900 } },
      { type: 'label', pos: [0.7, 1.75, 0.9], at: 'Amarok', bob: 0.03, p: { text: 'AMAROK', w: 1.6, h: 0.5, bg: AMA, color: DARK, size: 0.64, weight: 900 } },
    ],
    overlays: [{ type: 'pill', text: 'FIN DE LAS VERSIONES ACTUALES', at: 'despiden', red: true }] },
  // 3. las dos se hacen en Argentina
  { id: 'b03', cam: { from: [0.6, 2.4, 7.6], to: [0, 2.2, 6.9], look: [0, 1.4, 0], fov: 44 }, keywords: ['dos', 'Argentina'],
    actors: [
      { type: 'box', pos: [-1.35, 1.6, -0.6], p: { size: [0.08, 3.2, 0.08], color: '#c9c4de' } },
      { type: 'bandera', pos: [0, 2.45, -0.6], p: { w: 2.6, h: 1.5 } },
      { type: 'pickup', pos: [-0.75, 0, 0.5], rot: [0, 0.35, 0], s: 0.7, p: { color: HIL } },
      { type: 'pickup', pos: [0.75, 0, 0.5], rot: [0, -0.35, 0], s: 0.7, p: { color: AMA } },
    ],
    overlays: [{ type: 'pill', text: 'HECHAS EN ARGENTINA', at: 'hacen' }] },
  // 4. Hilux, Zárate, 1997
  { id: 'b04', set: 'void', cam: { from: [-1.0, 2.6, 8.8], to: [-0.2, 2.3, 7.8], look: [0, 1.25, 0], fov: 44 }, keywords: ['Hilux', 'Zárate', '1997'],
    actors: [
      { type: 'factory', pos: [0, 0, -1.6], p: { w: 3.3, h: 1.3, d: 1.6, sign: 'ZÁRATE' } },
      { type: 'road', pos: [0, 0, 2], p: { len: 8 } },
      { type: 'pickup', pos: [0, 0.04, -0.6], s: 0.72, p: { color: HIL, speed: 5 }, move: { to: [0.2, 0.04, 2.3], at: 'sale', dur: 2.6 } },
      { type: 'calendar', pos: [1.0, 3.0, 0.2], rot: [0, -0.2, 0], s: 0.55, at: '1997', p: { top: 'DESDE', big: '1997', color: C.blue } },
    ],
    overlays: [{ type: 'pill', text: 'ZÁRATE · DESDE 1997', at: '1997' }] },
  // 5. arrancó con 10.000 por año
  { id: 'b05', set: 'room', cam: { from: [0.8, 2.4, 7.2], to: [0, 2.2, 6.5], look: [0, 1.2, 0], fov: 44 }, keywords: ['10.000'],
    actors: [
      { type: 'box', pos: [0, 0.25, 0], p: { size: [1.9, 0.5, 2.6], color: '#241659' } },
      { type: 'pickup', pos: [0, 0.5, 0], rot: [0, 0.7, 0], spin: 0.25, s: 0.85, p: { color: HIL } },
      { type: 'label', pos: [0, 2.35, 0], at: 0.15, p: { text: 'AÑO 1997', w: 1.7, h: 0.46, bg: C.blue, size: 0.62, weight: 900 } },
    ],
    overlays: [{ type: 'big', text: '', count: { to: 10000, pre: '~' }, sub: 'unidades por año al empezar', at: 0.1, size: 118 }] },
  // 6. una cada 89 segundos  [FOTO planta-zarate]
  { id: 'b06', set: 'void', cam: { from: [-0.9, 3.0, 8.0], to: [0.1, 2.7, 7.2], look: [0, 1.2, 0], fov: 46 }, keywords: ['planta', '89'],
    actors: [
      { type: 'line', pos: [0, 0, 1.0], p: { len: 7, n: 5, speed: 2.2, colors: [HIL, '#f4f1ff'], sc: 0.6, arches: 3 } },
      { type: 'factory', pos: [0, 0, -2.2], p: { w: 3.4, h: 1.2, d: 1.2, sign: 'ZÁRATE' } },
      { type: 'crono', pos: [0, 2.55, 0.6], s: 0.8, p: { r: 0.62, per: 1.6, text: '89 SEGUNDOS' } },
    ],
    overlays: [
      { type: 'photo', src: 'planta-zarate.jpg', at: 0.25, out: 3.0, mode: 'full', caption: 'Planta de Zárate', credit: 'Toyota', zoom: [1.04, 1.14], pan: [-1.5, 0] },
      { type: 'pill', text: '1 CADA 89 SEGUNDOS', at: '89' }] },
  // 7. el más fabricado, según Toyota  [FOTO hilux-actual]
  { id: 'b07', set: 'room', cam: { from: [0.7, 2.5, 7.4], to: [-0.2, 2.2, 6.6], look: [0, 1.3, 0], fov: 44 }, keywords: ['Toyota', 'más', 'fabricado'],
    actors: [
      { type: 'box', pos: [0, 0.4, 0], p: { size: [1.7, 0.8, 2.4], color: C.gold, glow: true, ei: 0.3 } },
      { type: 'label', pos: [0, 0.4, 1.22], p: { text: 'N° 1', w: 1.2, h: 0.6, color: DARK, size: 0.8, weight: 900 } },
      { type: 'pickup', pos: [0, 0.8, 0], rot: [0, 0.6, 0], spin: 0.15, s: 0.8, p: { color: HIL } },
      { type: 'label', pos: [0, 2.75, 0], bob: 0.03, p: { text: 'MÁS FABRICADO DEL PAÍS', w: 2.7, h: 0.44, bg: '#15102b', border: C.gold, color: C.gold, size: 0.56, weight: 900 } },
    ],
    overlays: [
      { type: 'photo', src: 'hilux-actual.jpg', at: 0.3, out: 3.3, mode: 'card', caption: 'Hilux actual', credit: 'Toyota' },
      { type: 'pill', text: 'SEGÚN TOYOTA', at: 'Toyota' }] },
  // 8. Amarok, Pacheco, más de 15 años  [FOTO amarok-actual]
  { id: 'b08', cam: { from: [1.0, 2.6, 8.6], to: [0.1, 2.3, 7.7], look: [0, 1.25, 0], fov: 44 }, keywords: ['Amarok', 'Pacheco', 'quince'],
    actors: [
      { type: 'factory', pos: [0, 0, -1.5], p: { w: 3.3, h: 1.3, d: 1.6, sign: 'PACHECO', signBg: AMA, color: '#27306e', win: C.magenta } },
      { type: 'pickup', pos: [0.3, 0, 0.9], rot: [0, -0.6, 0], s: 0.85, p: { color: AMA } },
      { type: 'person', pos: [-1.05, 0, 1.2], rot: [0, 0.5, 0], s: 0.8, p: { shirt: C.blue, cap: C.gold, pose: 'point' } },
      { type: 'label', pos: [-0.9, 3.0, 0.3], rot: [0, 0.15, 0], at: 'quince', p: { text: '+15 AÑOS', w: 1.4, h: 0.46, bg: C.gold, color: DARK, size: 0.64, weight: 900 } },
    ],
    overlays: [
      { type: 'photo', src: 'amarok-actual.jpg', at: 0.2, out: 3.1, mode: 'card', caption: 'Amarok actual', credit: 'Volkswagen', tilt: 2 },
      { type: 'pill', text: 'GENERAL PACHECO', at: 'General' }] },
  // 9. la número 800.000
  { id: 'b09', set: 'void', cam: { from: [-0.7, 3.2, 8.4], to: [0.2, 2.8, 7.4], look: [0, 1.0, -0.4], fov: 44 }, keywords: ['julio', '800.000'],
    actors: [
      ...[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => ({ type: 'pickup', pos: [-1.3 + (i % 3) * 1.3, 0, -1.2 - Math.floor(i / 3) * 1.9] as V, s: 0.5, p: { color: '#1c8f96', glow: 0.08 } })),
      { type: 'ring', pos: [0, 0.03, 1.0], p: { r: 1.1, color: C.gold } },
      { type: 'pickup', pos: [0, 0, 1.0], rot: [0, 0.5, 0], spin: 0.3, s: 0.8, p: { color: AMA } },
      { type: 'calendar', pos: [-1.0, 2.75, 0], rot: [0, 0.2, 0], s: 0.5, at: 'julio', p: { top: 'JULIO', big: '2026', color: C.blue } },
    ],
    overlays: [{ type: 'big', text: '', count: { to: 800000 }, sub: 'Amarok fabricadas en Pacheco', at: 'número', size: 124 }] },
  // 10. seis de cada diez exportadas  [FOTO planta-pacheco]
  { id: 'b10', cam: { from: [0.8, 3.4, 8.8], to: [0, 3.0, 8.0], look: [0, 1.0, 0], fov: 44 }, keywords: ['Seis', 'diez', 'exportaron', 'cien'],
    actors: [
      { type: 'globe', pos: [0, 2.3, -1.0], s: 0.95 },
      ...[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => ({ type: 'pickup', pos: [-1.4 + (i % 5) * 0.7, 0, 2.6 - Math.floor(i / 5) * 1.5] as V, s: 0.4,
        p: i < 6 ? { color: AMA, glow: 0.5 } : { color: '#3a3470', glow: 0.02 } })),
      { type: 'label', pos: [0, 0.95, -0.6], at: 'cien', p: { text: '+100 DESTINOS', w: 2.2, h: 0.46, bg: C.green, color: '#0d2b18', size: 0.62, weight: 900 } },
    ],
    overlays: [
      { type: 'photo', src: 'planta-pacheco.jpg', at: 0.2, out: 2.9, mode: 'full', caption: 'Planta de General Pacheco', credit: 'Volkswagen', zoom: [1.14, 1.04], pan: [1.5, 0] },
      { type: 'pill', text: '6 DE CADA 10 SE EXPORTARON', at: 'exportaron' }] },
  // 11. ahora vienen los reemplazos
  { id: 'b11', set: 'room', cam: { from: [-0.6, 2.4, 7.4], to: [0, 2.2, 6.8], look: [0, 1.1, 0], fov: 44 }, keywords: ['reemplazos'],
    actors: [
      { type: 'pickup', pos: [-0.8, 0, 0], rot: [0, 0.45, 0], s: 0.8, p: { cover: true } },
      { type: 'pickup', pos: [0.8, 0, 0], rot: [0, -0.45, 0], s: 0.8, p: { cover: true } },
      { type: 'label', pos: [-0.8, 1.75, 0], at: 0.3, bob: 0.04, p: { text: '?', w: 0.6, h: 0.7, bg: HIL, color: DARK, size: 0.8, weight: 900 } },
      { type: 'label', pos: [0.8, 1.75, 0], at: 0.6, bob: 0.04, p: { text: '?', w: 0.6, h: 0.7, bg: AMA, color: DARK, size: 0.8, weight: 900 } },
    ],
    overlays: [{ type: 'pill', text: 'LOS REEMPLAZOS', at: 'los' }] },
  // 12. nueva Hilux, 1° de diciembre, según el sector
  { id: 'b12', set: 'void', cam: { from: [0.9, 2.8, 8.2], to: [0, 2.5, 7.3], look: [0, 1.3, 0], fov: 44 }, keywords: ['sector', 'nueva', 'Hilux', '1°', 'diciembre'],
    actors: [
      { type: 'factory', pos: [0, 0, -2.0], p: { w: 3.3, h: 1.2, d: 1.2, sign: 'ZÁRATE' } },
      { type: 'line', pos: [0, 0, 0.8], p: { len: 7, n: 3, speed: 0.9, colors: [HIL], sc: 0.72, cover: true } },
      { type: 'label', pos: [-0.75, 2.2, 0.8], at: 'nueva', bob: 0.03, p: { text: 'NUEVA HILUX', w: 1.75, h: 0.44, bg: HIL, color: DARK, size: 0.62, weight: 900 } },
      { type: 'calendar', pos: [0.95, 2.4, 0.9], rot: [0, -0.2, 0], s: 0.6, at: '1°', p: { top: 'DICIEMBRE', big: '1', color: C.green } },
    ],
    overlays: [{ type: 'pill', text: 'SEGÚN PROVEEDORES DEL SECTOR', at: 'sector', out: '1°' }, { type: 'pill', text: 'ARRANCA EL 1° DE DICIEMBRE', at: '1°' }] },
  // 13. nueva Amarok, proyecto con SAIC
  { id: 'b13', cam: { from: [-0.8, 2.5, 8.2], to: [0.1, 2.3, 7.4], look: [0, 1.3, 0], fov: 44 }, keywords: ['nueva', 'Amarok', 'otro', 'SAIC'],
    actors: [
      { type: 'ring', pos: [0, 0.03, 0], p: { r: 1.4, color: AMA } },
      { type: 'pickup', pos: [0, 0, 0], rot: [0, 0.5, 0], spin: 0.12, s: 0.85, p: { cover: true } },
      { type: 'label', pos: [0, 1.75, 0], at: 'nueva', bob: 0.03, p: { text: 'NUEVA AMAROK', w: 2.0, h: 0.46, bg: AMA, color: DARK, size: 0.62, weight: 900 } },
      { type: 'person', pos: [-1.15, 0, 0.9], rot: [0, 0.6, 0], s: 0.78, p: { shirt: C.blue, pose: 'idle' } },
      { type: 'label', pos: [-0.95, 2.55, 0.4], at: 'otro', p: { text: 'VOLKSWAGEN', w: 1.55, h: 0.4, bg: '#2d1a6e', border: C.cyan, size: 0.56, weight: 900 } },
      { type: 'person', pos: [1.15, 0, 0.9], rot: [0, -0.6, 0], s: 0.78, at: 'grupo', p: { shirt: C.red, pose: 'hold' } },
      { type: 'label', pos: [0.95, 2.55, 0.4], at: 'chino', p: { text: 'SAIC · CHINA', w: 1.55, h: 0.4, bg: '#2d1a6e', border: C.red, size: 0.56, weight: 900 } },
    ],
    overlays: [{ type: 'pill', text: 'PROYECTO PATAGONIA', at: 'proyecto' }] },
  // 14. US$ 580 millones, 2027
  { id: 'b14', set: 'room', cam: { from: [0.7, 2.5, 7.6], to: [-0.2, 2.2, 6.8], look: [0, 1.3, 0], fov: 44 }, keywords: ['Volkswagen', '580', '2027'],
    actors: [
      { type: 'factory', pos: [0.2, 0, -1.2], s: 0.9, p: { w: 3.0, h: 1.2, d: 1.4, sign: 'PACHECO', signBg: AMA, color: '#27306e', win: C.magenta } },
      { type: 'coins', pos: [-0.8, 0, 0.9], enter: 'none', at: '580', p: { n: 16, dur: 1.4, r: 0.36 } },
      { type: 'coins', pos: [0.1, 0, 1.2], enter: 'none', at: 'millones', p: { n: 11, dur: 1.2, r: 0.36 } },
      { type: 'calendar', pos: [0.95, 2.9, 0.4], rot: [0, -0.2, 0], s: 0.62, at: '2027', p: { top: 'SE ESPERA', big: '2027', color: C.green } },
    ],
    overlays: [{ type: 'big', text: '', count: { to: 580, pre: 'US$ ', post: ' M' }, sub: 'inversión anunciada en Pacheco', at: '580', out: 'espera', size: 112 },
      { type: 'pill', text: 'LLEGARÍA EN 2027', at: '2027' }] },
  // 15. ¿Hilux o Amarok?
  { id: 'b15', set: 'void', cam: { from: [0.6, 2.6, 8.4], to: [0, 2.3, 7.4], look: [0, 1.2, 0], fov: 44 }, keywords: ['pregunta', 'Hilux', 'Amarok'],
    actors: [
      { type: 'pickup', pos: [-0.82, 0, 0.3], rot: [0, 0.25, 0], s: 0.85, p: { color: HIL } },
      { type: 'pickup', pos: [0.82, 0, 0.3], rot: [0, -0.25, 0], s: 0.85, p: { color: AMA } },
      { type: 'ring', pos: [-0.82, 0.03, 0.3], at: '¿Hilux', p: { r: 0.9, color: HIL } },
      { type: 'ring', pos: [0.82, 0.03, 0.3], at: 'Amarok', p: { r: 0.9, color: AMA } },
      { type: 'label', pos: [0, 2.3, 0], at: 'sola', out: '¿Hilux', bob: 0.04, p: { text: '?', w: 0.9, h: 1.0, bg: C.magenta, size: 0.8, weight: 900 } },
      { type: 'label', pos: [-0.82, 2.0, 0.3], at: '¿Hilux', bob: 0.03, p: { text: 'HILUX', w: 1.45, h: 0.5, bg: HIL, color: DARK, size: 0.64, weight: 900 } },
      { type: 'label', pos: [0.82, 2.0, 0.3], at: 'Amarok', bob: 0.03, p: { text: 'AMAROK', w: 1.5, h: 0.5, bg: AMA, color: DARK, size: 0.64, weight: 900 } },
    ],
    overlays: [{ type: 'big', text: '¿HILUX O AMAROK?', sub: 'una sola palabra en los comentarios', at: '¿Hilux', size: 84 }] },
  // 16. respondé y seguime
  { id: 'b16', set: 'room', cam: { from: [-0.5, 2.4, 7.4], to: [0.2, 2.2, 6.6], look: [0, 1.4, 0], fov: 44 }, keywords: ['una palabra', 'seguime', 'nuevas', 'muestro'],
    actors: [
      { type: 'phone', pos: [0, 2.05, 0.2], s: 1.35, bob: 0.03, p: { kind: 'chat' } },
      { type: 'pickup', pos: [-0.85, 0, 0.2], rot: [0, 0.5, 0], s: 0.6, p: { color: HIL }, out: 'Cuando' },
      { type: 'pickup', pos: [0.85, 0, 0.2], rot: [0, -0.5, 0], s: 0.6, p: { color: AMA }, out: 'Cuando' },
      { type: 'pickup', pos: [-0.85, 0, 0.2], rot: [0, 0.5, 0], s: 0.6, at: 'Cuando', p: { cover: true } },
      { type: 'pickup', pos: [0.85, 0, 0.2], rot: [0, -0.5, 0], s: 0.6, at: 'Cuando', p: { cover: true } },
      { type: 'label', pos: [0, 1.05, 0.6], at: 'nuevas', p: { text: 'LAS NUEVAS', w: 1.6, h: 0.42, bg: C.green, color: '#0d2b18', size: 0.62, weight: 900 } },
    ],
    overlays: [{ type: 'big', text: 'SEGUIME', sub: 'cuando salgan las nuevas, te las muestro', at: 'seguime', size: 110 }] },
];
