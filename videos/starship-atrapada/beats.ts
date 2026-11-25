import type { BeatSpec } from '../../src/Beat';
import { C } from '../../src/kit/math';

const PI = Math.PI;
const LBL = { bg: '#2d1a6e', size: 0.62 };

export const BEATS: BeatSpec[] = [
  // 1. La nave cae de panza hacia la torre
  { id: 'b01', set: 'void', cam: { from: [1.1, 1.5, 8.6], to: [0.2, 2.0, 7.4], look: [0, 1.75, 0], fov: 46 }, keywords: ['15:20', '50', 'torre.'],
    actors: [
      { type: 'tower', pos: [-0.95, 0, 0], s: 0.85, p: { armY: 2.0 } },
      { type: 'ring', pos: [-0.1, 0.03, 0], p: { r: 0.6, color: C.gold } },
      { type: 'streaks', pos: [0.45, 2.3, -0.3], p: { n: 12, w: 2.2, h: 2.4, speed: 6 } },
      { type: 'ship', pos: [0.5, 3.15, 0], s: 0.85, p: { horiz: true, roll: PI / 2 }, move: { to: [0.3, 2.45, 0], at: 0, dur: 6.2 } },
      { type: 'label', pos: [0.55, 2.55, 0.4], at: '50', p: { text: '≈ 50 METROS', w: 1.3, h: 0.34, bg: C.gold, color: '#1a1030', size: 0.62, weight: 900 }, move: { to: [0.35, 1.95, 0.4], at: 0, dur: 6.2 } },
      { type: 'label', pos: [-0.95, 0.5, 0.5], at: 'torre', p: { text: 'SU TORRE', w: 1.1, h: 0.32, ...LBL } },
    ],
    overlays: [{ type: 'pill', text: 'SÁB 14 NOV · 15:20 · TEXAS', at: 0.15 }] },

  // 2. Viene de la órbita
  { id: 'b02', set: 'void', cam: { from: [0.7, 2.6, 8.2], to: [-0.3, 2.4, 7.2], look: [0, 1.7, 0], fov: 44 }, keywords: ['espacio:', '14', '22'],
    actors: [
      { type: 'orbit', pos: [0, 2.35, 0], p: { R: 0.82, speed: 3.6 } },
    ],
    overlays: [{ type: 'big', text: '', count: { to: 14, post: ' vueltas' }, sub: 'a la Tierra en 22 horas y media', at: '14' }] },

  // 3. Motores, giro y freno
  { id: 'b03', cam: { from: [-0.8, 1.6, 7.6], to: [0.2, 1.9, 6.8], look: [0, 1.8, 0], fov: 44 }, keywords: ['motores,', 'endereza', 'frena'],
    actors: [
      { type: 'ring', pos: [0, 0.03, 0], p: { r: 0.8, color: C.gold } },
      { type: 'streaks', pos: [0, 2.0, -0.3], p: { n: 12, w: 2.4, h: 2.6, speed: 6 }, out: 'frena' },
      { type: 'ship', pos: [-0.25, 2.3, 0], s: 1.0, p: { flipAt: 1.35, flipDur: 0.9, roll: PI / 2, flame: 0.5, flameLen: 1.0 }, move: { to: [0, 1.85, 0], at: 0, dur: 2.6 } },
      { type: 'label', pos: [1.0, 1.2, 0.4], at: 'motores', out: 'endereza', p: { text: 'MOTORES', w: 1.1, h: 0.32, bg: C.gold, color: '#1a1030', size: 0.62, weight: 900 } },
    ],
    overlays: [{ type: 'pill', text: 'FRENA EN EL AIRE', at: 'frena' }] },

  // 4. Los brazos la agarran
  { id: 'b04', cam: { from: [1.2, 1.5, 7.8], to: [0.5, 1.9, 6.6], look: [-0.15, 1.6, 0], fov: 46 }, keywords: ['brazos', 'agarran', 'suelo.'],
    actors: [
      { type: 'tower', pos: [-0.95, 0, 0], s: 0.9, p: { armY: 2.3, close: 1.4 } },
      { type: 'ship', pos: [-0.14, 1.45, 0], s: 0.9, p: { flame: 0, flameOff: 1.9, flameLen: 0.7 }, move: { to: [-0.14, 0.82, 0], at: 0, dur: 1.4 } },
      { type: 'label', pos: [0.9, 2.1, 0.4], at: 'brazos', out: 'agarran', p: { text: 'DOS BRAZOS', w: 1.25, h: 0.32, ...LBL } },
      { type: 'check', pos: [0.9, 2.1, 0.4], at: 'agarran', p: { size: 0.6 } },
      { type: 'ring', pos: [-0.14, 0.03, 0], at: 'toque', p: { r: 0.5, color: C.cyan } },
    ],
    overlays: [{ type: 'pill', text: 'NO TOCA EL SUELO', at: 'suelo' }] },

  // 5. Primera vez
  { id: 'b05', cam: { from: [-1.0, 2.4, 8.8], to: [-0.2, 2.2, 7.8], look: [0, 1.5, 0], fov: 46 }, keywords: ['primera', 'SpaceX', 'Starship.'],
    actors: [
      { type: 'tower', pos: [-0.75, 0, -0.6], s: 0.9, p: { armY: 2.3, closed: true } },
      { type: 'ship', pos: [0.06, 0.82, -0.6], s: 0.9 },
      { type: 'crowd', pos: [0.2, 0, 1.0], enter: 'none', p: { n: 7, area: [2.8, 0.9], seed: 6, stagger: 0, sc: 0.5, pose: 'cheer' } },
      { type: 'label', pos: [0.95, 2.75, -0.3], at: 'SpaceX', p: { text: 'SPACEX', w: 1.1, h: 0.34, ...LBL } },
    ],
    overlays: [{ type: 'big', text: '1.ª VEZ', sub: 'que atrapan la nave de Starship', at: 'primera' }] },

  // 6. Las anteriores: al mar o destruidas
  { id: 'b06', set: 'void', cam: { from: [0.6, 2.6, 8.6], to: [-0.3, 2.3, 7.6], look: [0, 1.3, 0], fov: 46 }, keywords: ['mar', 'destruidas.'],
    actors: [
      { type: 'sea', pos: [-0.85, 0.07, 0], p: { w: 1.5, d: 1.5 } },
      { type: 'ship', pos: [-0.85, 1.25, 0], rot: [0, 0, 0.55], s: 0.75, p: { center: true }, move: { to: [-0.85, 0.35, 0], at: 0.1, dur: 2.2 } },
      { type: 'label', pos: [-0.85, 2.35, 0.3], at: 'mar', p: { text: 'AL MAR', w: 1.2, h: 0.36, bg: C.blue, size: 0.62 } },
      { type: 'ship', pos: [0.85, 0.35, 0], s: 0.75, out: 'destruidas', p: { flame: 0, flameLen: 0.35 }, bob: 0.03 },
      { type: 'boom', pos: [0.8, 1.2, 0], at: 'destruidas', enter: 'none', s: 0.7, p: { r: 0.5 } },
      { type: 'cross', pos: [0.85, 1.2, 0.5], at: 'destruidas', p: { size: 0.01 } },
      { type: 'label', pos: [0.85, 2.35, 0.3], at: 'destruidas', p: { text: 'DESTRUIDAS', w: 1.35, h: 0.36, bg: C.red, size: 0.62 } },
    ] },

  // 7. Vuelo 15: no fue perfecto
  { id: 'b07', cam: { from: [-0.7, 2.0, 8.2], to: [0.2, 2.2, 7.2], look: [0.1, 1.6, 0], fov: 46 }, keywords: ['15', 'no', 'perfecto.'],
    actors: [
      { type: 'booster', pos: [0, 0, 0], s: 0.62 },
      { type: 'ship', pos: [0, 1.74, 0], s: 0.62 },
      { type: 'label', pos: [-0.95, 2.5, 0.2], rot: [0, 0.2, 0], p: { text: 'VUELO 15', w: 1.15, h: 0.4, bg: C.gold, color: '#1a1030', size: 0.62, weight: 900 } },
      { type: 'label', pos: [1.0, 2.75, 0.2], at: 0.25, p: { text: 'NAVE', w: 0.9, h: 0.32, ...LBL } },
      { type: 'check', pos: [1.0, 2.3, 0.2], at: 0.4, p: { size: 0.5 } },
      { type: 'label', pos: [1.0, 1.3, 0.2], at: 'no', p: { text: 'PROPULSOR', w: 1.25, h: 0.32, ...LBL } },
      { type: 'cross', pos: [1.0, 0.8, 0.2], at: 'no', p: { size: 0.5 } },
    ],
    overlays: [{ type: 'pill', text: 'NO SALIÓ PERFECTO', at: 'perfecto', red: true }] },

  // 8. El día anterior: el propulsor tenía que volver a la torre
  { id: 'b08', cam: { from: [-0.9, 2.2, 9.0], to: [0.1, 2.3, 8.0], look: [0, 1.6, 0], fov: 46 }, keywords: ['anterior,', 'propulsor', 'torre.'],
    actors: [
      { type: 'calendar', pos: [-1.05, 2.75, 0], rot: [0, 0.25, 0], s: 0.5, p: { top: 'VIERNES', big: '13 NOV', color: C.blue } },
      { type: 'tower', pos: [1.05, 0, 0], rot: [0, PI, 0], s: 0.85, p: { armY: 2.2 } },
      { type: 'booster', pos: [0.3, 0, 0], s: 0.5, p: { flame: 2.0 }, move: { to: [0.3, 6.5, 0], at: 'despegar', dur: 1.0 }, out: 'propulsor' },
      { type: 'ship', pos: [0.3, 1.4, 0], s: 0.5, move: { to: [0.3, 7.9, 0], at: 'despegar', dur: 1.0 }, out: 'propulsor' },
      { type: 'label', pos: [-0.75, 0.45, 0.5], at: 'minutos', out: 'propulsor', p: { text: 'DESPEGUE', w: 1.2, h: 0.32, ...LBL } },
      { type: 'booster', pos: [-0.45, 5.5, 0], s: 0.5, at: 'propulsor', enter: 'none', p: { flame: 0, flameLen: 0.8 }, move: { to: [-0.35, 2.0, 0], at: 'propulsor', dur: 1.6 } },
      { type: 'label', pos: [-0.85, 1.45, 0.5], at: 'tenía', p: { text: 'PROPULSOR', w: 1.25, h: 0.32, ...LBL } },
      { type: 'ring', pos: [0.3, 0.03, 0], at: 'volver', p: { r: 0.5, color: C.gold } },
    ],
    overlays: [{ type: 'pill', text: 'TENÍA QUE VOLVER A LA TORRE', at: 'volver' }] },

  // 9. Cancela y se pierde en el Golfo
  { id: 'b09', set: 'void', cam: { from: [0.9, 2.8, 9.0], to: [0.1, 2.5, 8.0], look: [0, 1.3, 0], fov: 46 }, keywords: ['Canceló', 'perdió', 'Golfo'],
    actors: [
      { type: 'tower', pos: [-1.25, 0, -1.0], s: 0.7, p: { armY: 2.2 } },
      { type: 'cross', pos: [-0.75, 2.2, -0.7], at: 0.15, p: { size: 0.6 } },
      { type: 'sea', pos: [0.65, 0.07, 0.3], p: { w: 2.2, d: 2.2 } },
      { type: 'booster', pos: [-0.2, 2.5, 0], rot: [0, 0, -0.6], s: 0.55, p: { center: true, flame: 0, flameLen: 0.5 }, move: { to: [0.75, 0.6, 0.3], at: 0.5, dur: 1.15 }, out: 'perdió' },
      { type: 'boom', pos: [0.75, 0.75, 0.3], at: 'perdió', enter: 'none', p: { r: 0.6 } },
      { type: 'boom', pos: [0.75, 0.3, 0.5], at: 'perdió', enter: 'none', p: { r: 0.5, seed: 9, colors: ['#9fd0ff', '#ffffff', '#2f6bff'] } },
      { type: 'cross', pos: [0.75, 0.6, 0.6], at: 'perdió', p: { size: 0.01 } },
    ],
    overlays: [{ type: 'pill', text: 'SE PERDIÓ EN EL GOLFO', at: 'Golfo', red: true }] },

  // 10. Al propulsor ya lo atraparon tres veces
  { id: 'b10', cam: { from: [0.8, 2.5, 9.0], to: [-0.2, 2.3, 8.0], look: [0, 1.45, 0], fov: 46 }, keywords: ['tres', 'primera,', '2024.'],
    actors: [
      { type: 'tower', pos: [-1.3, 0, -0.4], s: 0.55, p: { armY: 2.3, closed: true } },
      { type: 'booster', pos: [-0.8, 0.4, -0.4], s: 0.45 },
      { type: 'check', pos: [-0.85, 2.2, -0.2], at: 'atraparon', p: { size: 0.4 } },
      { type: 'tower', pos: [-0.3, 0, -0.4], s: 0.55, at: 'atraparon', p: { armY: 2.3, closed: true } },
      { type: 'booster', pos: [0.2, 0.4, -0.4], s: 0.45, at: 'atraparon' },
      { type: 'check', pos: [0.15, 2.2, -0.2], at: 'tres', p: { size: 0.4 } },
      { type: 'tower', pos: [0.7, 0, -0.4], s: 0.55, at: 'tres', p: { armY: 2.3, closed: true } },
      { type: 'booster', pos: [1.2, 0.4, -0.4], s: 0.45, at: 'tres' },
      { type: 'check', pos: [1.15, 2.2, -0.2], at: 'veces', p: { size: 0.4 } },
      { type: 'calendar', pos: [0, 2.75, 0.3], s: 0.5, at: 'primera', p: { top: '13 OCTUBRE', big: '2024', color: C.blue } },
      { type: 'label', pos: [0.45, 2.6, 0], out: 'primera', p: { text: 'PROPULSOR', w: 1.5, h: 0.4, bg: C.gold, color: '#1a1030', size: 0.62, weight: 900 } },
      { type: 'ring', pos: [-1.0, 0.03, -0.4], at: 'primera', p: { r: 0.55, color: C.gold } },
    ],
    overlays: [{ type: 'big', text: '3 veces', sub: 'ya atraparon al propulsor', at: 'tres', size: 104 },
      { type: 'pill', text: 'LA 1.ª: 13 DE OCTUBRE DE 2024', at: 'octubre' }] },

  // 11. La nave era lo difícil: reentrada
  { id: 'b11', set: 'void', cam: { from: [-0.7, 2.4, 8.4], to: [0.2, 2.2, 7.4], look: [0, 1.6, 0], fov: 46 }, keywords: ['difícil:', 'órbita', 'fuego.'],
    actors: [
      { type: 'globe', pos: [-0.9, 0.15, -0.8], s: 1.5 },
      { type: 'ship', pos: [0.95, 2.85, 0], rot: [0, 0, 0.9], s: 0.8, p: { center: true, roll: PI / 2, plasma: 1.9 }, move: { to: [0.25, 1.95, 0], at: 0, dur: 4.4 } },
      { type: 'streaks', pos: [0.6, 2.3, -0.4], at: 'vuelve', enter: 'none', p: { n: 10, w: 1.8, h: 2.2, speed: 7, color: '#ffb52e' } },
      { type: 'label', pos: [-0.8, 2.75, 0.3], at: 0.2, p: { text: 'LO DIFÍCIL', w: 1.3, h: 0.36, bg: C.gold, color: '#1a1030', size: 0.62, weight: 900 } },
    ],
    overlays: [{ type: 'pill', text: 'VUELVE DESDE LA ÓRBITA', at: 'órbita', red: true }] },

  // 12. Las dos partes -> el cohete entero otra vez
  { id: 'b12', cam: { from: [0.8, 2.3, 8.8], to: [-0.1, 2.3, 7.8], look: [0, 1.5, 0], fov: 46 }, keywords: ['dos', 'usar', 'entero.'],
    actors: [
      { type: 'booster', pos: [-0.8, 0, 0], s: 0.55, move: { to: [0, 0, 0], at: 'podés', dur: 0.7 } },
      { type: 'ship', pos: [0.8, 0, 0], s: 0.55, move: { to: [0, 1.54, 0], at: 'podés', dur: 0.7 } },
      { type: 'label', pos: [-0.8, 1.95, 0.3], out: 'podés', p: { text: 'PROPULSOR', w: 1.2, h: 0.3, ...LBL } },
      { type: 'label', pos: [0.8, 1.5, 0.3], out: 'podés', p: { text: 'NAVE', w: 0.85, h: 0.3, ...LBL } },
      { type: 'check', pos: [-0.8, 2.45, 0.3], at: 'dos', out: 'podés', p: { size: 0.45 } },
      { type: 'check', pos: [0.8, 2.0, 0.3], at: 'partes', out: 'podés', p: { size: 0.45 } },
      { type: 'arrow', pos: [-1.0, 0.7, 0], at: 'usar', enter: 'none', p: { len: 1.3, color: C.green } },
      { type: 'arrow', pos: [1.0, 0.7, 0], at: 'usar', enter: 'none', p: { len: 1.3, color: C.green } },
    ],
    overlays: [{ type: 'pill', text: 'EL COHETE ENTERO, OTRA VEZ', at: 'cohete' }] },

  // 13. Musk: podría volver a volar / otros: la retiran
  { id: 'b13', cam: { from: [-0.8, 2.4, 8.8], to: [0.1, 2.2, 7.8], look: [0, 1.5, 0], fov: 46 }, keywords: ['Elon Musk', 'volar.', 'retirar.'],
    actors: [
      { type: 'person', pos: [-1.0, 0, 0.4], rot: [0, 0.6, 0], p: { shirt: '#15102b', hair: '#3a2a1a', pose: 'point' } },
      { type: 'ship', pos: [0.55, 0, 0], s: 0.95 },
      { type: 'ring', pos: [0.55, 0.03, 0], p: { r: 0.6, color: C.cyan } },
      { type: 'label', pos: [0.5, 2.8, 0.4], at: 'podría', p: { text: 'PODRÍA VOLVER A VOLAR', w: 2.0, h: 0.36, bg: '#1f9d55', size: 0.6 } },
      { type: 'label', pos: [0.5, 2.3, 0.4], at: 'van', p: { text: 'O LA RETIRAN', w: 1.5, h: 0.36, bg: C.red, size: 0.6 } },
    ],
    overlays: [{ type: 'plate', name: 'Elon Musk', role: 'CEO de SpaceX', at: 0.1, out: 'Otros' },
      { type: 'pill', text: 'DOS VERSIONES', at: 'Otros' }] },

  // 14. Vuelo 16: diciembre, sin fecha
  { id: 'b14', set: 'void', cam: { from: [0.7, 2.4, 8.4], to: [-0.2, 2.2, 7.4], look: [0, 1.5, 0], fov: 46 }, keywords: ['16', 'diciembre,', 'sin'],
    actors: [
      { type: 'booster', pos: [0.95, 0, 0], s: 0.52 },
      { type: 'ship', pos: [0.95, 1.456, 0], s: 0.52 },
      { type: 'label', pos: [0.95, 2.85, 0.2], at: 'vuelo', p: { text: 'VUELO 16', w: 1.15, h: 0.38, bg: C.gold, color: '#1a1030', size: 0.62, weight: 900 } },
      { type: 'calendar', pos: [-0.65, 1.95, 0], rot: [0, 0.2, 0], s: 0.85, at: 'apunta', p: { top: 'DICIEMBRE', big: '¿?', color: C.red } },
      { type: 'ring', pos: [0.95, 0.03, 0], p: { r: 0.6, color: C.cyan } },
    ],
    overlays: [{ type: 'pill', text: 'SIN FECHA CONFIRMADA', at: 'sin' }] },

  // 15. Pregunta + seguime
  { id: 'b15', cam: { from: [-0.6, 2.3, 8.8], to: [0.2, 2.4, 8.0], look: [0, 1.6, 0], fov: 46 }, keywords: ['diciembre', '2027?', 'Seguime'],
    actors: [
      { type: 'booster', pos: [0, 0.25, -0.3], s: 0.5, p: { flame: 3.1, flameLen: 0.5 }, bob: 0.04 },
      { type: 'ship', pos: [0, 1.65, -0.3], s: 0.5, bob: 0.04 },
      { type: 'calendar', pos: [-1.0, 2.2, 0.2], rot: [0, 0.25, 0], s: 0.6, p: { top: 'DICIEMBRE', big: '2026', color: '#1f9d55' } },
      { type: 'calendar', pos: [1.0, 2.2, 0.2], rot: [0, -0.25, 0], s: 0.6, at: 'pasa', p: { top: '¿O EN...?', big: '2027', color: C.red } },
      { type: 'ring', pos: [0, 0.03, -0.3], p: { r: 0.7, color: C.gold } },
    ],
    overlays: [{ type: 'tag', text: '¿DICIEMBRE O 2027?', at: '2027', out: 'Seguime', x: 50, y: 70, color: '#2d1a6e', size: 56 },
      { type: 'big', text: 'SEGUIME', sub: 'y te aviso cuando despegue', at: 'Seguime' }] },
];
