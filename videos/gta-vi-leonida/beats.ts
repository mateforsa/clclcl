import type { BeatSpec } from '../../src/Beat';
import { C } from '../../src/kit/math';

const PI = Math.PI;
const ROCK = { shirt: C.gold, hair: '#15102b', skin: '#f2c39b' };                    // muñeco "Rockstar" (el mismo de la serie)
const DEV = { shirt: '#3b3470', hair: '#3a2a1a', skin: '#ffd9b8', cap: '#3b3470' };  // programador (genérico, sin nombre ni cara)
const TT = { shirt: '#15102b', pants: '#15102b', hair: '#e8e4f5', skin: '#e9b98f' };  // muñeco "Take-Two" (genérico)
const LBL = { bg: '#2d1a6e', size: 0.62 };
const GOLD = { bg: C.gold, color: '#1a1030', size: 0.62, weight: 900 };
const DARK = { bg: '#15102b', color: C.gold, size: 0.62, weight: 900 };
const DOC = { bg: '#f4f1ff', color: '#1a1030', size: 0.3, weight: 900, subColor: '#6b5aa8' };
const TAG = '#2d1a6e';
// Todo el texto 2D queda entre 250 px desde arriba y 420 px desde abajo: `tag` (y <= 75,3 %) y `big` en y 62 %. Sin píldoras.
const tag = (text: string, at: any, o: any = {}) => ({ type: 'tag' as const, text, at, x: 50, y: 75.3, color: TAG, size: 40, ...o });

export const BEATS: BeatSpec[] = [
  // 1. Cero versiones de GTA VI para PC
  { id: 'b01', set: 'void', cam: { from: [0.8, 2.5, 8.6], to: [-0.2, 2.3, 7.4], look: [0, 0.9, 0], fov: 46 }, keywords: ['Cero', 'versiones', 'GTA VI', 'PC'],
    actors: [
      { type: 'ring', pos: [0, 0.03, 0], p: { r: 1.25, color: C.red } },
      { type: 'pc', pos: [-0.3, 0.1, 0], rot: [0, -0.15, 0], s: 1.15, p: {} },
      { type: 'label', pos: [0, 2.2, 0], p: { text: 'GTA VI PARA PC', w: 2.3, h: 0.42, ...DARK } },
      { type: 'cross', pos: [-0.45, 1.1, 0.35], at: 'PC', p: { size: 0.75 } },
    ],
    overlays: [{ type: 'big', text: '0', sub: 'versiones oficiales para PC', at: 0.05, y: 62, red: true, size: 150 }] },

  // 2. Un programador intentó armar una por su cuenta
  { id: 'b02', set: 'room', cam: { from: [-0.9, 2.4, 7.4], to: [0.1, 2.2, 6.5], look: [0, 1.0, 0], fov: 46 }, keywords: ['programador'],
    actors: [
      { type: 'desk', pos: [0, 0, 0.2], s: 1.2, p: {} },
      { type: 'laptop', pos: [0, 0.99, 0.25], rot: [0, PI, 0], s: 0.8, p: { kind: 'code' } },
      { type: 'person', pos: [0, 0, -0.55], p: { ...DEV, pose: 'type' } },
      { type: 'box', pos: [-1.05, 1.55, 0.2], at: 'armar', bob: 0.03, p: { size: [0.36, 0.36, 0.36], color: C.cyan, glow: true, ei: 0.5 } },
      { type: 'box', pos: [-1.05, 1.95, 0.2], at: 1.4, bob: 0.03, p: { size: [0.36, 0.36, 0.36], color: C.magenta, glow: true, ei: 0.5 } },
      { type: 'box', pos: [-1.05, 2.35, 0.2], at: 1.6, bob: 0.03, p: { size: [0.36, 0.36, 0.36], color: C.gold, glow: true, ei: 0.5 } },
    ],
    overlays: [tag('un programador, por su cuenta', 0.15, { size: 44 })] },

  // 3. Take-Two reclamó y la bajaron, junto con 3.006 copias
  { id: 'b03', set: 'void', cam: { from: [0.8, 2.6, 9.0], to: [-0.1, 2.4, 8.0], look: [0, 0.75, 0], fov: 46 }, keywords: ['Take-Two', 'reclamó', 'bajaron', '3.006'],
    actors: [
      { type: 'repos', pos: [0, 0.35, -0.4], enter: 'none', p: { cols: 8, rows: 5, cw: 0.32, ch: 0.24, fallAt: 2.0, drop: 0.35, hi: 3, seed: 6 } },
      { type: 'label', pos: [0, 2.3, 0.2], rot: [0, 0, -0.04], at: 'Take-Two', enter: 'drop', p: { text: 'RECLAMO', w: 1.7, h: 0.62, ...DOC, size: 0.4, sub: 'DE TAKE-TWO' } },
    ],
    overlays: [{ type: 'big', text: '1 + 3.006 = 3.007', sub: 'la original y 3.006 copias', at: 'junto', y: 62, red: true, size: 84 }] },

  // 4. Se llamaba Leonida y estaba en GitHub
  { id: 'b04', cam: { from: [-1.0, 2.6, 9.4], to: [0.0, 2.3, 8.2], look: [0, 1.0, 0], fov: 46 }, keywords: ['Leonida', 'GitHub', 'programadores'],
    actors: [
      { type: 'ring', pos: [0, 0.03, -0.4], p: { r: 1.3, color: C.cyan } },
      { type: 'server', pos: [0, 0, -0.6], s: 1.0, p: {} },
      { type: 'label', pos: [0, 2.3, -0.2], at: 'Leonida', p: { text: 'LEONIDA', w: 1.5, h: 0.42, ...GOLD } },
      { type: 'label', pos: [0, 2.85, -0.6], at: 'GitHub', p: { text: 'GITHUB', w: 1.3, h: 0.36, ...LBL } },
      { type: 'person', pos: [-1.1, 0, 0.7], rot: [0, 0.7, 0], s: 0.85, at: 'donde', p: { ...DEV, pose: 'type' } },
      { type: 'person', pos: [1.1, 0, 0.7], rot: [0, -0.7, 0], s: 0.85, at: 'programadores', p: { shirt: C.cyan, hair: '#15102b', skin: '#c98d62', pose: 'type', phase: 1.4 } },
      { type: 'screen', pos: [-0.75, 1.55, 0.5], rot: [0, 0.3, 0], s: 0.55, at: 'publican', bob: 0.03, p: { kind: 'code' } },
      { type: 'screen', pos: [0.75, 1.55, 0.5], rot: [0, -0.3, 0], s: 0.55, at: 'código', bob: 0.03, p: { kind: 'code' } },
    ],
    overlays: [tag('GitHub: donde los programadores publican código', 'donde', { size: 34 })] },

  // 5. La versión de Xbox, en una computadora
  { id: 'b05', set: 'room', cam: { from: [0.8, 2.4, 7.7], to: [-0.1, 2.2, 7.0], look: [0, 0.9, 0], fov: 46 }, keywords: ['computadora', 'Xbox'],
    actors: [
      { type: 'console', pos: [-1.05, 0, 0], rot: [0, 0.3, 0], s: 0.9, p: { kind: 'b' } },
      { type: 'label', pos: [-1.05, 1.75, 0], p: { text: 'XBOX', w: 0.95, h: 0.36, bg: '#1f9d55', size: 0.62, weight: 900 } },
      { type: 'arrow', pos: [-0.5, 0.95, 0.2], rot: [0, 0, -PI / 2], s: 0.6, at: 'andar', enter: 'none', p: { len: 0.9, color: C.gold, dur: 0.5 } },
      { type: 'pc', pos: [0.55, 0, 0], rot: [0, -0.25, 0], s: 0.85, at: 'computadora', p: {} },
      { type: 'label', pos: [0.85, 1.85, 0], at: 'computadora', p: { text: 'PC', w: 0.8, h: 0.36, ...LBL } },
    ],
    overlays: [tag('la versión de Xbox, en una computadora', 'andar', { size: 40 })] },

  // 6. Según Take-Two, el 20/11 se difundieron archivos robados
  { id: 'b06', set: 'void', cam: { from: [-0.8, 2.5, 9.0], to: [0.2, 2.3, 8.0], look: [0, 1.1, 0], fov: 46 }, keywords: ['Take-Two', '20', 'difundieron'],
    actors: [
      { type: 'ring', pos: [0.3, 0.03, 0], p: { r: 1.1, color: C.red } },
      { type: 'console', pos: [0.3, 0, 0], rot: [0, -0.3, 0], s: 0.85, p: { kind: 'b' } },
      { type: 'calendar', pos: [-1.05, 2.45, 0.2], rot: [0, 0.25, 0], s: 0.56, at: '20', p: { top: 'NOVIEMBRE', big: '20', color: C.red } },
      { type: 'files', pos: [0.3, 1.2, 0.5], at: 'difundieron', enter: 'none', p: { n: 14, seed: 9, spread: [1.3, 1.5, 0.7], color: C.red } },
      { type: 'label', pos: [0.45, 0.55, 1.2], at: 'archivos', p: { text: 'ARCHIVOS ROBADOS', w: 1.9, h: 0.36, bg: C.red, color: '#fff', size: 0.62, weight: 900 } },
    ],
    overlays: [tag('20/11, según Take-Two', 0.05, { size: 46 })] },

  // 7. Enseguida nació Leonida, y miles lo copiaron
  { id: 'b07', cam: { from: [0.9, 2.5, 9.2], to: [0.0, 2.4, 8.3], look: [0, 1.25, 0], fov: 46 }, keywords: ['Enseguida', 'nació', 'Leonida'],
    actors: [
      { type: 'ring', pos: [0, 0.03, 0], p: { r: 1.2, color: C.gold } },
      { type: 'label', pos: [0, 2.9, 0.1], at: 0.05, p: { text: 'LEONIDA', w: 1.6, h: 0.44, ...GOLD } },
      { type: 'folder', pos: [0, 2.2, 0.1], s: 1.3, at: 0.05, out: 'miles', bob: 0.04, p: { color: C.gold } },
      { type: 'repos', pos: [0, 0.5, 0], at: 'miles', enter: 'none', p: { cols: 9, rows: 7, cw: 0.3, ch: 0.22, stagger: 0.009, seed: 2, hi: 4 } },
    ] },

  // 8. El 24 se publicó el reclamo
  { id: 'b08', set: 'room', cam: { from: [-0.7, 2.3, 7.6], to: [0.1, 2.2, 6.8], look: [0, 1.3, 0], fov: 46 }, keywords: ['24'],
    actors: [
      { type: 'calendar', pos: [-0.75, 1.75, 0], rot: [0, 0.2, 0], s: 0.75, p: { top: 'NOVIEMBRE', big: '24', color: C.red } },
      { type: 'label', pos: [0.65, 1.75, 0.1], rot: [0, -0.1, 0.04], at: 0.35, enter: 'drop', p: { text: 'RECLAMO', w: 1.3, h: 0.85, ...DOC, size: 0.3, sub: 'DE TAKE-TWO' } },
    ],
    overlays: [tag('24/11/2026 · se publicó el reclamo', '24', { size: 42 })] },

  // 9. Las reglas de Rockstar prohíben la ingeniería inversa
  { id: 'b09', set: 'void', cam: { from: [0.8, 2.5, 8.8], to: [-0.2, 2.3, 7.8], look: [0, 0.9, 0], fov: 46 }, keywords: ['Rockstar', 'ingeniería'],
    actors: [
      { type: 'label', pos: [-0.72, 2.0, 0], rot: [0, 0.1, -0.03], p: { text: 'REGLAS', w: 1.3, h: 0.85, ...DOC, size: 0.32, sub: 'DE ROCKSTAR' } },
      { type: 'label', pos: [-0.72, 1.25, 0.15], rot: [0, 0.1, 0], at: 'prohíben', p: { text: 'PROHIBIDO', w: 1.25, h: 0.36, bg: C.red, color: '#fff', size: 0.62, weight: 900 } },
      { type: 'ring', pos: [0.85, 0.03, 0], p: { r: 0.7, color: C.magenta } },
      { type: 'explode', pos: [0.85, 1.7, 0], at: 'reglas', p: { at: 2.96, dur: 1.0 } },
    ],
    overlays: [{ type: 'big', text: 'INGENIERÍA INVERSA', sub: 'desarmar un juego para ver cómo funciona', at: 'ingeniería', y: 62, size: 68 }] },

  // 10. Leonida no traía el juego. Cada uno ponía los archivos
  { id: 'b10', set: 'room', cam: { from: [-0.8, 2.5, 8.0], to: [0.1, 2.3, 7.2], look: [0, 1.0, 0], fov: 46 }, keywords: ['Leonida'],
    actors: [
      { type: 'box', pos: [0, 0.45, 0], p: { size: [1.5, 0.9, 0.9], color: '#3a2a8a' } },
      { type: 'box', pos: [0, 0.9, 0], p: { size: [1.3, 0.04, 0.7], color: '#15102b' } },
      { type: 'label', pos: [0, 0.45, 0.46], p: { text: 'LEONIDA', w: 1.3, h: 0.4, ...GOLD } },
      { type: 'label', pos: [-0.3, 1.75, 0], at: 0.3, out: 'Cada', p: { text: 'JUEGO', w: 1.0, h: 0.5, bg: '#c2307e', color: '#fff', size: 0.6, weight: 900 } },
      { type: 'cross', pos: [0.6, 1.75, 0.1], at: 'no', out: 'Cada', p: { size: 0.45 } },
      { type: 'person', pos: [-1.15, 0, 0.5], rot: [0, 0.7, 0], s: 0.8, at: 'Cada', p: { shirt: C.cyan, pose: 'hold' } },
      { type: 'person', pos: [1.15, 0, 0.5], rot: [0, -0.7, 0], s: 0.8, at: 'uno', p: { shirt: C.magenta, hair: '#15102b', skin: '#c98d62', pose: 'hold', phase: 1.2 } },
      { type: 'folder', pos: [-0.9, 1.9, 0.5], s: 0.9, at: 'Cada', p: { color: C.gold }, move: { to: [-0.3, 1.2, 0], at: 'ponía', dur: 0.7 } },
      { type: 'folder', pos: [0.9, 1.9, 0.5], s: 0.9, at: 'uno', p: { color: C.gold }, move: { to: [0.3, 1.2, 0], at: 'los', dur: 0.7 } },
    ],
    overlays: [tag('Leonida no traía el juego', 0.1, { out: 'Cada', size: 44 }), tag('cada uno ponía los archivos', 'Cada', { size: 44 })] },

  // 11. Para Take-Two, los únicos que servían eran los filtrados
  { id: 'b11', set: 'void', cam: { from: [0.8, 2.5, 8.6], to: [-0.1, 2.3, 7.7], look: [0, 1.1, 0], fov: 46 }, keywords: ['Take-Two'],
    actors: [
      { type: 'person', pos: [-1.0, 0, 0.3], rot: [0, 0.6, 0], s: 0.95, p: { ...TT, pose: 'point' } },
      { type: 'label', pos: [-0.95, 2.05, 0.3], p: { text: 'TAKE-TWO', w: 1.2, h: 0.34, ...DARK } },
      { type: 'folder', pos: [0.2, 2.35, 0], s: 1.0, p: { color: '#8d8aa0', glow: false } },
      { type: 'folder', pos: [1.0, 2.35, 0], s: 1.0, p: { color: '#8d8aa0', glow: false } },
      { type: 'cross', pos: [0.2, 2.35, 0.15], at: 'únicos', p: { size: 0.35 } },
      { type: 'cross', pos: [1.0, 2.35, 0.15], at: 'que', p: { size: 0.35 } },
      { type: 'ring', pos: [0.6, 0.03, 0.2], p: { r: 0.6, color: C.red } },
      { type: 'folder', pos: [0.6, 1.25, 0.2], s: 1.5, bob: 0.04, p: { color: C.red } },
      { type: 'check', pos: [0.6, 1.25, 0.4], at: 'filtrados', p: { size: 0.4 } },
    ],
    overlays: [tag('para Take-Two: solo servían los filtrados', 'únicos', { size: 40 })] },

  // 12. GitHub bajó 3.007 proyectos con un solo reclamo
  { id: 'b12', cam: { from: [-0.9, 2.7, 9.4], to: [0.0, 2.4, 8.3], look: [0, 0.6, 0], fov: 46 }, keywords: ['GitHub', '3.007', 'proyectos'],
    actors: [
      { type: 'label', pos: [0, 2.3, -0.3], p: { text: 'GITHUB', w: 1.3, h: 0.36, ...LBL } },
      { type: 'repos', pos: [0, 0.5, -0.3], enter: 'none', p: { cols: 9, rows: 5, cw: 0.3, ch: 0.22, stagger: 0, fallAt: 0.64, drop: 0.5, seed: 5 } },
    ],
    overlays: [{ type: 'big', text: '', count: { to: 3007 }, sub: 'proyectos, con un solo reclamo', at: '3.007', y: 62, red: true },
      tag('1 original + 3.006 copias', 'proyectos', { size: 42 })] },

  // 13. Según medios especializados, otros siguen con una copia. Todavía no se puede jugar
  { id: 'b13', set: 'room', cam: { from: [0.8, 2.4, 8.0], to: [-0.1, 2.2, 7.1], look: [0, 1.0, 0], fov: 46 }, keywords: ['jugar'],
    actors: [
      { type: 'desk', pos: [0, 0, 0.2], s: 1.25, p: {} },
      { type: 'screen', pos: [0, 1.6, 0.1], s: 0.75, out: 'Todavía', p: { kind: 'code', stand: true } },
      { type: 'screen', pos: [0, 1.6, 0.1], s: 0.75, at: 'Todavía', enter: 'none', p: { kind: 'off', stand: true } },
      { type: 'person', pos: [-1.15, 0, 0.5], rot: [0, 0.8, 0], s: 0.85, at: 'otros', p: { shirt: C.cyan, hair: '#15102b', pose: 'type' } },
      { type: 'person', pos: [1.15, 0, 0.5], rot: [0, -0.8, 0], s: 0.85, at: 'siguen', p: { shirt: C.magenta, skin: '#c98d62', pose: 'type', phase: 1.3 } },
      { type: 'label', pos: [0, 2.5, 0.1], at: 'una', p: { text: 'UNA COPIA', w: 1.4, h: 0.38, ...GOLD } },
      { type: 'cross', pos: [0, 1.62, 0.3], at: 'no', p: { size: 0.6 } },
    ],
    overlays: [tag('según medios especializados', 'según', { out: 'Todavía', size: 44 }), tag('todavía no se puede jugar', 'Todavía', { size: 46, color: C.red })] },

  // 14. Rockstar no anunció versión de PC. Oficiales, sigue habiendo cero
  { id: 'b14', set: 'void', cam: { from: [-0.8, 2.5, 8.6], to: [0.2, 2.3, 7.4], look: [0, 0.9, 0], fov: 46 }, keywords: ['Rockstar', 'PC', 'Oficiales', 'cero'],
    actors: [
      { type: 'ring', pos: [0.35, 0.03, 0], p: { r: 1.0, color: C.red } },
      { type: 'pc', pos: [0.1, 0.2, 0], rot: [0, -0.15, 0], s: 1.0, p: {} },
      { type: 'person', pos: [-1.15, 0.2, 0.3], rot: [0, 0.5, 0], s: 0.85, p: { ...ROCK, pose: 'shrug' } },
      { type: 'label', pos: [-1.05, 2.05, 0.3], p: { text: 'ROCKSTAR', w: 1.1, h: 0.34, ...DARK } },
      { type: 'cross', pos: [-0.03, 1.07, 0.35], at: 'no', p: { size: 0.65 } },
    ],
    overlays: [tag('Rockstar no anunció versión de PC', 'no', { out: 'Oficiales', size: 42 }),
      { type: 'big', text: '0', sub: 'versiones oficiales para PC', at: 'Oficiales', y: 62, red: true, size: 150 }] },

  // 15. Mandáselo al que lo espera en PC (sin número de parte, pedido del dueño)
  { id: 'b15', set: 'room', cam: { from: [0.6, 2.4, 7.6], to: [-0.1, 2.2, 6.8], look: [0, 1.0, 0], fov: 46 }, keywords: ['Mandáselo', 'PC'],
    actors: [
      { type: 'person', pos: [-0.75, 0, 0.3], rot: [0, 0.4, 0], s: 0.8, p: { ...DEV, shirt: C.cyan, cap: undefined, pose: 'hold' } },
      { type: 'phone', pos: [-0.3, 1.0, 0.6], rot: [0, 0.3, 0], s: 0.8, bob: 0.03, p: { kind: 'chat' }, move: { to: [0.55, 1.0, 0.6], at: 'Mandáselo', dur: 0.6 } },
      { type: 'person', pos: [1.1, 0, 0.3], rot: [0, -0.5, 0], s: 0.8, at: 'al', p: { shirt: C.magenta, hair: '#15102b', skin: '#c98d62', pose: 'cheer' } },
    ],
    overlays: [{ type: 'tag', text: 'GTA VI', at: 0.05, x: 50, y: 25.5, color: C.red },
      { type: 'big', text: 'Mandáselo', sub: 'al que lo espera en PC', at: 'Mandáselo', y: 62, size: 104 }] },
];
