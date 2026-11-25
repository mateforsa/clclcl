import type { BeatSpec } from '../../src/Beat';
import { C } from '../../src/kit/math';

const ENG = { shirt: C.blue, hair: '#15102b', skin: '#c98d62' };   // ingeniero genérico
const ME = { shirt: C.cyan, hair: '#3a2a1a', skin: '#f2c39b' };

export const BEATS: BeatSpec[] = [
  // 1. Hoy, 26 de noviembre, hace 15 años, un cohete despega de Cabo Cañaveral.
  { id: 'b01', cam: { from: [0.6, 2.3, 8.8], to: [0, 2.1, 7.8], look: [0, 1.05, 0], fov: 44 }, keywords: ['26', '15', 'cohete'],
    actors: [
      { type: 'calendar', pos: [-0.85, 1.75, 0], rot: [0, 0.25, 0], s: 0.8, p: { top: 'NOVIEMBRE', big: '26', color: C.red } },
      { type: 'box', pos: [0.8, 0.12, -0.3], p: { size: [1.3, 0.24, 1.0], color: '#3a3550' } },
      { type: 'tower', pos: [1.45, 0.24, -0.5], p: { h: 2.3 } },
      { type: 'rocket', pos: [0.75, 0.24, -0.3], s: 0.78, move: { to: [0.75, 1.0, -0.3], at: 'despega', dur: 1.9 } },
      { type: 'flame', pos: [0.75, 0.3, -0.3], at: 'despega', enter: 'none', move: { to: [0.75, 1.06, -0.3], at: 'despega', dur: 1.9 }, p: { r: 0.2, len: 0.9 } },
      { type: 'smoke', pos: [0.75, 0.24, -0.1], at: 'despega', enter: 'none', p: { n: 8, spread: 0.9, sz: 0.55 } },
    ],
    overlays: [{ type: 'big', text: 'HACE 15 AÑOS', sub: '26 de noviembre de 2011', at: '15', size: 100 }] },
  // 2. Arriba lleva un robot de 899 kilos, del tamaño de un auto.
  { id: 'b02', set: 'void', cam: { from: [-0.7, 2.4, 8.6], to: [0.2, 2.1, 7.6], look: [0, 0.9, 0], fov: 44 }, keywords: ['robot', '899', 'auto'],
    actors: [
      { type: 'ring', pos: [0, 0.03, -0.2], p: { r: 1.5, color: C.cyan } },
      { type: 'rover', pos: [0, 0, -0.2], rot: [0, -0.5, 0], s: 0.85, move: { to: [-0.9, 0, -0.5], at: 'del', dur: 0.5 } },
      { type: 'car', pos: [1.0, 0, 0.1], rot: [0, 1.0, 0], s: 0.62, at: 'tamaño', p: { color: C.magenta } },
      { type: 'label', pos: [0, 2.35, -0.2], at: 'robot', out: 'del', p: { text: 'ROBOT', w: 1.3, h: 0.42, bg: C.gold, color: '#1a1030', size: 0.66, weight: 900 } },
    ],
    overlays: [{ type: 'big', text: '', count: { to: 899, post: ' kg' }, sub: 'del tamaño de un auto', at: '899' }] },
  // 3. La misión costó 2.500 millones de dólares. Y estaba pensada para durar menos de dos años.
  { id: 'b03', set: 'room', cam: { from: [0.8, 2.3, 6.2], to: [-0.2, 2.1, 5.4], look: [0, 1.5, -0.8], fov: 46, shift: 0.06 }, keywords: ['2.500', 'menos', 'dos años'],
    actors: [
      { type: 'desk', pos: [-0.55, 0, -0.6], s: 1.2 },
      { type: 'coins', pos: [-1.1, 0.98, -0.6], at: 0.1, enter: 'none', p: { n: 7, r: 0.2, dur: 0.6 } },
      { type: 'coins', pos: [-0.6, 0.98, -0.6], at: 'costó', enter: 'none', p: { n: 11, r: 0.2, dur: 0.7 } },
      { type: 'coins', pos: [-0.1, 0.98, -0.6], at: '2.500', enter: 'none', p: { n: 16, r: 0.2, dur: 0.9 } },
      { type: 'person', pos: [0.9, 0, -0.5], rot: [0, -0.6, 0], s: 0.9, p: { ...ENG, pose: 'hold' }, out: 'pensada' },
      { type: 'person', pos: [0.9, 0, -0.5], rot: [0, -0.3, 0], s: 0.9, at: 'pensada', enter: 'none', p: { ...ENG, pose: 'point' } },
      { type: 'calendar', pos: [0.8, 2.45, -0.9], rot: [0, -0.2, 0], s: 0.7, at: 'pensada', p: { top: 'PLAN', big: '2 AÑOS', color: C.blue } },
    ],
    overlays: [
      { type: 'big', text: '', count: { to: 2500, pre: 'US$ ', post: ' M' }, sub: 'costó la misión', at: '2.500', out: 'pensada', size: 104 },
      { type: 'pill', text: 'PLAN: MENOS DE 2 AÑOS', at: 'menos' },
    ] },
  // 4. El robot se llama Curiosity. Su destino es Marte.
  { id: 'b04', set: 'void', cam: { from: [-0.7, 2.3, 7.6], to: [0.3, 2.1, 6.8], look: [0, 1.35, 0], fov: 44 }, keywords: ['Curiosity', 'Marte'],
    actors: [
      { type: 'ring', pos: [-0.15, 0.03, 0], p: { r: 1.3, color: C.gold } },
      { type: 'rover', pos: [-0.15, 0, 0], rot: [0, -0.55, 0], s: 1.1 },
      { type: 'mars', pos: [1.05, 2.75, -2.2], s: 0.75, at: 'destino' },
    ],
    overlays: [{ type: 'plate', name: 'CURIOSITY', role: 'robot de la NASA', at: 'Curiosity', y: 79 }] },
  // 5. El viaje dura más de ocho meses.
  { id: 'b05', set: 'void', cam: { from: [-0.3, 2.2, 7.8], to: [0.3, 2.1, 7.2], look: [0, 1.55, 0], fov: 44 }, keywords: ['ocho meses'],
    actors: [
      { type: 'globe', pos: [-1.0, 0.95, 0], s: 0.6 },
      { type: 'mars', pos: [1.0, 2.5, 0], s: 0.5 },
      { type: 'trip', enter: 'none', at: 0.05, p: { from: [-0.6, 1.4, 0.2], to: [0.7, 2.2, 0.2], dur: 1.8, lift: 0.5 } },
      { type: 'label', pos: [-1.0, 1.75, 0.2], p: { text: 'TIERRA', w: 0.9, h: 0.28, bg: C.blue, size: 0.66 } },
      { type: 'label', pos: [1.0, 1.82, 0.2], p: { text: 'MARTE', w: 0.9, h: 0.28, bg: C.red, size: 0.66 } },
    ],
    overlays: [{ type: 'pill', text: '8 MESES DE VIAJE', at: 'ocho' }] },
  // 6. En agosto de 2012, una grúa voladora lo baja con cables hasta el suelo.
  { id: 'b06', set: 'void', cam: { from: [0.8, 2.4, 8.8], to: [-0.2, 2.1, 8.0], look: [0, 1.4, 0], fov: 44 }, keywords: ['2012', 'grúa', 'cables'],
    actors: [
      { type: 'marsground', p: { seed: 6 } },
      { type: 'skycrane', pos: [0, 3.0, 0], rot: [0, -0.45, 0], move: { to: [0, 2.6, 0], at: 0, dur: 1.9 }, p: { start: 2.0, dur: 2.3, drop: 1.62, rs: 0.72, touch: true } },
      { type: 'label', pos: [1.05, 1.75, 0.3], at: 'grúa', p: { text: 'GRÚA VOLADORA', w: 1.25, h: 0.3, bg: C.gold, color: '#1a1030', size: 0.6, weight: 900 } },
    ],
    overlays: [{ type: 'pill', text: 'MARTE · AGOSTO DE 2012', at: '2012' }] },
  // 7. Su trabajo: averiguar si Marte alguna vez pudo tener vida.
  { id: 'b07', set: 'void', cam: { from: [-0.8, 2.2, 7.6], to: [0.2, 2.0, 6.8], look: [0, 1.2, 0], fov: 44 }, keywords: ['trabajo', 'vida'],
    actors: [
      { type: 'marsground', p: { seed: 9 } },
      { type: 'rover', pos: [-0.6, 0, 0], rot: [0, -0.3, 0], s: 0.95, p: { glow: true } },
      { type: 'rock', pos: [1.05, 0.28, 0.3], s: 0.36 },
      { type: 'rock', pos: [1.5, 0.15, -0.6], s: 0.2 },
      { type: 'beam', at: 'averiguar', enter: 'none', p: { from: [-0.16, 1.6, 0.44], to: [0.95, 0.5, 0.35] } },
      { type: 'label', pos: [0.9, 1.35, 0.3], at: 'tener', bob: 0.04, p: { text: '¿VIDA?', w: 0.9, h: 0.4, bg: C.gold, color: '#1a1030', size: 0.66, weight: 900 } },
    ],
    overlays: [{ type: 'pill', text: '¿MARTE PUDO TENER VIDA?', at: 'Marte' }] },
  // 8. No usa paneles solares. Lleva un generador nuclear.
  { id: 'b08', set: 'void', cam: { from: [0.6, 2.2, 7.6], to: [-0.3, 2.1, 6.9], look: [0, 1.5, 0], fov: 44 }, keywords: ['solares', 'nuclear'],
    actors: [
      { type: 'ring', pos: [0, 0.03, 0], p: { r: 1.4, color: C.blue } },
      { type: 'solar', pos: [-0.8, 1.55, 0], rot: [0, 0.3, 0], s: 0.95 },
      { type: 'cross', pos: [-0.8, 1.6, 0.5], at: 'solares', p: { size: 0.95 } },
      { type: 'rtg', pos: [0.85, 1.55, 0], s: 0.9, at: 'Lleva', bob: 0.04 },
    ],
    overlays: [{ type: 'pill', text: 'GENERADOR NUCLEAR', at: 'generador' }] },
  // 9. Pasan los dos años del plan. Y no se apaga.
  { id: 'b09', set: 'void', cam: { from: [0.7, 2.3, 8.2], to: [-0.2, 2.1, 7.4], look: [0, 1.35, 0], fov: 44 }, keywords: ['dos años', 'no'],
    actors: [
      { type: 'marsground', p: { seed: 12 } },
      { type: 'calendar', pos: [-0.85, 2.15, 0], rot: [0, 0.25, 0], s: 0.75, p: { top: 'PLAN', big: '2 AÑOS', color: C.blue } },
      { type: 'check', pos: [-0.85, 1.2, 0.3], at: 'plan', p: { size: 0.55 } },
      { type: 'rover', pos: [0.55, 0, 0.2], rot: [0, -0.45, 0], s: 0.9, p: { drive: 3, glow: true } },
      { type: 'label', pos: [0.6, 2.05, 0.2], at: 'no', p: { text: 'SIGUE ENCENDIDO', w: 1.7, h: 0.36, bg: '#1f9d55', size: 0.6, weight: 900 } },
    ] },
  // 10. Pasan cinco. Pasan diez.
  { id: 'b10', set: 'void', cam: { from: [-0.5, 2.3, 8.0], to: [0.3, 2.1, 7.4], look: [0, 1.4, 0], fov: 44 }, keywords: ['cinco', 'diez'],
    actors: [
      { type: 'marsground', p: { seed: 15 } },
      { type: 'rover', pos: [-0.5, 0, 0.3], rot: [0, -0.25, 0], s: 0.8, p: { drive: 5, glow: true }, move: { to: [0.4, 0, 0.3], at: 0, dur: 2.3 } },
      { type: 'calendar', pos: [0, 2.3, -0.3], s: 0.85, out: 'cinco', p: { top: 'PASARON', big: '2 AÑOS', color: C.blue } },
      { type: 'calendar', pos: [0, 2.3, -0.3], s: 0.85, at: 'cinco', out: 'diez', p: { top: 'PASARON', big: '5 AÑOS', color: C.magenta } },
      { type: 'calendar', pos: [0, 2.3, -0.3], s: 0.85, at: 'diez', p: { top: 'PASARON', big: '10 AÑOS', color: C.red } },
    ] },
  // 11. Las piedras le agujerean las ruedas. Sigue.
  { id: 'b11', set: 'void', cam: { from: [0.6, 2.0, 6.6], to: [0, 1.8, 5.9], look: [0, 1.25, 0], fov: 44 }, keywords: ['piedras', 'ruedas', 'Sigue'],
    actors: [
      { type: 'marsground', p: { seed: 18, rocks: 8 } },
      { type: 'wheel', pos: [0, 1.06, 0], rot: [0, -0.95, 0], out: 'agujerean', p: { holes: 0 } },
      { type: 'wheel', pos: [0, 1.06, 0], rot: [0, -0.95, 0], at: 'agujerean', enter: 'none', p: { holes: 7 } },
      { type: 'rock', pos: [-1.25, 0.16, 0.7], s: 0.22, p: { sy: 1.2 } },
      { type: 'rock', pos: [1.2, 0.2, 0.5], s: 0.26, p: { sy: 1.3 } },
      { type: 'rock', pos: [0.75, 0.1, 1.2], s: 0.14, p: { sy: 1.4 } },
      { type: 'check', pos: [-0.7, 2.35, 0.4], at: 'Sigue', p: { size: 0.6 } },
    ],
    overlays: [{ type: 'pill', text: 'RUEDAS AGUJEREADAS', at: 'ruedas', red: true }] },
  // 12. Según la NASA, recorrió más de 38 kilómetros.
  { id: 'b12', set: 'void', cam: { from: [-0.6, 2.4, 8.8], to: [0.3, 2.1, 8.0], look: [0, 0.95, 0], fov: 44 }, keywords: ['NASA', '38'],
    actors: [
      { type: 'marsground', p: { seed: 21 } },
      { type: 'box', pos: [-2.2, 0.035, 0.1], p: { size: [5, 0.02, 0.1], color: '#5c1c0c' } },
      { type: 'box', pos: [-2.2, 0.035, -0.75], p: { size: [5, 0.02, 0.1], color: '#5c1c0c' } },
      { type: 'rover', pos: [-0.9, 0, -0.3], rot: [0, -0.3, 0], s: 0.85, p: { drive: 5, glow: true }, move: { to: [0.55, 0, -0.3], at: 0, dur: 3.4 } },
      { type: 'label', pos: [-0.5, 2.25, -0.3], at: 'NASA', p: { text: 'DATO DE LA NASA', w: 1.6, h: 0.34, bg: '#2d1a6e', size: 0.6 } },
    ],
    overlays: [{ type: 'big', text: '', count: { to: 38, pre: '+', post: ' km' }, sub: 'recorridos en Marte', at: '38' }] },
  // 13. Ya lleva más de 14 años trabajando en Marte. Más de siete veces lo planeado.
  { id: 'b13', set: 'void', cam: { from: [0.6, 2.4, 8.9], to: [-0.2, 2.1, 8.2], look: [0, 0.95, 0], fov: 44 }, keywords: ['14', 'siete veces'],
    actors: [
      { type: 'bars', pos: [0, 0, 0], at: 0.1, enter: 'none', p: { vals: [0.32, 2.25], colors: [C.cyan, C.gold], w: 0.8, gap: 0.7, dur: 0.8, stagger: 0.7 } },
      { type: 'label', pos: [-0.75, 0.75, 0], p: { text: 'PLAN: 2 AÑOS', w: 1.25, h: 0.32, bg: '#2d1a6e', color: C.cyan, size: 0.6, weight: 900 } },
      { type: 'label', pos: [0.75, 2.55, 0], at: '14', p: { text: '14 AÑOS', w: 1.25, h: 0.38, bg: C.gold, color: '#1a1030', size: 0.66, weight: 900 } },
      { type: 'rover', pos: [-0.75, 1.0, 0], rot: [0, -0.4, 0], s: 0.42, at: 'trabajando', p: { glow: true } },
    ],
    overlays: [{ type: 'big', text: 'MÁS DE 7 VECES', sub: 'lo planeado', at: 'siete', size: 96 }] },
  // 14. Mañana, otro Hoy hace.
  { id: 'b14', cam: { from: [-0.5, 2.2, 7.4], to: [0.2, 2.0, 6.8], look: [0, 1.05, 0], fov: 44 }, keywords: ['Mañana', 'Hoy hace'],
    actors: [
      { type: 'ring', pos: [0, 0.03, 0], p: { r: 1.2, color: C.magenta } },
      { type: 'calendar', pos: [0, 1.6, 0], s: 1.05, out: 0.35, p: { top: 'NOVIEMBRE', big: '26', color: C.red } },
      { type: 'calendar', pos: [0, 1.6, 0], s: 1.05, at: 0.35, p: { top: 'MAÑANA', big: '27', color: C.blue } },
    ],
    overlays: [{ type: 'big', text: 'HOY HACE', sub: 'mañana, otro', at: 'otro', size: 110 }] },
  // 15. Decime tu fecha de cumpleaños y busco qué pasó ese día.
  { id: 'b15', cam: { from: [0.5, 2.3, 8.0], to: [0, 2.1, 7.2], look: [0, 1.0, 0], fov: 44 }, keywords: ['cumpleaños'],
    actors: [
      { type: 'person', pos: [-0.8, 0, 0], rot: [0, 0.3, 0], p: { ...ME, pose: 'point' } },
      { type: 'box', pos: [0.75, 0.4, 0], p: { size: [1.0, 0.8, 1.0], color: '#2d1a6e' } },
      { type: 'cake', pos: [0.75, 0.8, 0], s: 0.75 },
      { type: 'calendar', pos: [0.75, 2.3, -0.3], rot: [0, -0.2, 0], s: 0.62, at: 'fecha', p: { top: 'TU CUMPLE', big: '¿?', color: C.magenta } },
    ],
    overlays: [{ type: 'big', text: 'TU CUMPLEAÑOS', sub: 'decime la fecha en los comentarios', at: 'cumpleaños', size: 88 }] },
];
