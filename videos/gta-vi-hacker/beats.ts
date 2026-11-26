import type { BeatSpec } from '../../src/Beat';
import { C } from '../../src/kit/math';

const ROCK = { shirt: C.gold, hair: '#15102b', skin: '#f2c39b' };       // muñeco "Rockstar" (el mismo de la serie)
const KID = { shirt: '#3b3470', hair: '#3a2a1a', skin: '#ffd9b8', cap: '#3b3470' }; // hacker (genérico, sin nombre ni cara)
const JUEZ = { shirt: '#15102b', pants: '#15102b', hair: '#e8e4f5', skin: '#e9b98f' }; // juez (genérico)
const VI = { label: 'VI', color: '#c2307e', glow: true };

export const BEATS: BeatSpec[] = [
  // 1. el objeto fuera de lugar
  { id: 'b01', set: 'void', cam: { from: [0.7, 2.3, 6.6], to: [-0.3, 2.1, 5.6], look: [0, 1.7, 0], fov: 44 }, keywords: ['Fire Stick', 'robó', 'GTA VI'],
    actors: [
      { type: 'ring', pos: [0, 0.03, 0], p: { r: 1.0, color: C.gold } },
      { type: 'firestick', pos: [-0.2, 1.9, 0], rot: [0, 0, 0.3], s: 2.1, spin: 0.9, bob: 0.06, p: {}, move: { to: [-0.85, 2.0, 0], at: 'robó', dur: 0.4 } },
      { type: 'label', pos: [0, 0.5, 0.9], out: 'robó', p: { text: 'FIRE STICK', w: 1.6, h: 0.42, bg: '#15102b', color: C.gold, size: 0.62, weight: 900 } },
      { type: 'gamebox', pos: [0.75, 1.7, 0], s: 0.8, at: 'robó', bob: 0.05, p: VI },
      { type: 'arrow', pos: [-0.5, 2.75, 0.3], rot: [0, 0, -Math.PI / 2], s: 0.7, at: 'GTA', enter: 'none', p: { len: 1.2, color: C.red, dur: 0.4 } },
    ],
    overlays: [{ type: 'pill', text: 'CON ESTO SE ROBÓ GTA VI', at: 'robó', red: true }] },
  // 2. siete años
  { id: 'b02', cam: { from: [-0.9, 2.6, 8.6], to: [0.2, 2.2, 7.2], look: [0, 1.6, 0], fov: 46 }, keywords: ['lunes', 'siete años'],
    actors: [
      { type: 'ring', pos: [0, 0.03, 0], p: { r: 0.9, color: C.red } },
      { type: 'person', pos: [0, 0, 0], p: { ...KID, pose: 'idle' } },
      { type: 'mazo', pos: [1.0, 2.2, 0.3], rot: [0, -0.4, 0], s: 0.9, at: 'dieron', p: { delay: 0.25, n: 2 } },
      { type: 'calendar', pos: [-1.15, 2.4, 0], rot: [0, 0.25, 0], s: 0.6, p: { top: 'LUNES', big: '23', color: C.red } },
      { type: 'rejas', pos: [0, 0, 0.55], at: 'siete', enter: 'drop', p: { w: 1.5, h: 2.2 } },
    ],
    overlays: [{ type: 'big', text: '7 AÑOS', sub: 'de prisión para el hacker', at: 'siete', red: true, size: 120 }] },
  // 3. y salió ese mismo día
  { id: 'b03', set: 'void', cam: { from: [1.0, 2.2, 7.6], to: [0.1, 2.4, 8.4], look: [0.2, 1.4, 0], fov: 46 }, keywords: ['mismo día', 'libertad'],
    actors: [
      { type: 'rejas', pos: [-0.5, 0, 0.55], out: 'mismo', p: { w: 1.5, h: 2.2 } },
      { type: 'rejas', pos: [-0.5, 0, 0.55], at: 'mismo', enter: 'none', p: { w: 1.5, h: 2.2, slide: true, dir: -1, dur: 0.6 } },
      { type: 'person', pos: [-0.5, 0, 0], p: { ...KID, pose: 'idle' }, out: 'salió' },
      { type: 'person', pos: [-0.5, 0, 0], rot: [0, 0.5, 0], at: 'salió', enter: 'none', p: { ...KID, pose: 'walk' }, move: { to: [0.75, 0, 1.7], at: 'salió', dur: 1.3 } },
      { type: 'calendar', pos: [1.05, 2.5, 0], rot: [0, -0.25, 0], s: 0.6, p: { top: 'LUNES', big: '23', color: C.green } },
      { type: 'check', pos: [1.05, 1.55, 0.2], at: 'libertad', p: { size: 0.6 } },
    ],
    overlays: [{ type: 'pill', text: 'SALIÓ ESE MISMO DÍA', at: 'libertad' }] },
  // 4. septiembre de 2022, el hotel
  { id: 'b04', cam: { from: [1.5, 2.8, 10.5], to: [-0.4, 2.2, 8.2], look: [0, 1.7, 0], fov: 46 }, keywords: ['2022', '17', 'policía', 'computadora'],
    actors: [
      { type: 'building', pos: [0, 0, -1.5], p: { w: 2.6, h: 3.6, d: 1.6, seed: 31, color: '#3a2a8a', sign: 'HOTEL' } },
      { type: 'ring', pos: [-0.5, 0.03, 0.8], p: { r: 0.6, color: C.magenta } },
      { type: 'person', pos: [-0.5, 0, 0.8], at: 'chico', p: { ...KID, pose: 'idle' } },
      { type: 'person', pos: [0.75, 0, 0.9], rot: [0, -0.5, 0], at: 'policía', p: { shirt: '#2f4fd6', cap: '#16224f', pants: '#16224f', pose: 'point' } },
      { type: 'laptop', pos: [-1.35, 0.9, 1.4], rot: [0.3, 0.4, 0], s: 0.9, at: 'sin', bob: 0.04, p: {} },
      { type: 'cross', pos: [-1.35, 1.15, 1.75], at: 'computadora', p: { size: 0.7 } },
    ],
    overlays: [{ type: 'pill', text: 'SEPTIEMBRE 2022', at: 0.1 }, { type: 'tag', text: '17 años', at: '17', x: 37, y: 47, color: C.blue }] },
  // 5. Fire Stick, tele, celular
  { id: 'b05', set: 'room', cam: { from: [-0.6, 2.5, 6.2], to: [0.4, 2.2, 5.4], look: [0, 1.3, -1], fov: 46, shift: 0.06 }, keywords: ['Fire Stick', 'tele', 'celular'],
    actors: [
      { type: 'box', pos: [0, 0.45, -1], p: { size: [3.0, 0.9, 1.0], color: '#8a5a3a' } },
      { type: 'firestick', pos: [-0.85, 1.4, -0.9], rot: [0, 0, 0.25], s: 1.1, at: 'Fire', spin: 0.6, p: {} },
      { type: 'label', pos: [-0.85, 0.55, -0.49], at: 'Fire', p: { text: 'FIRE STICK', w: 0.8, h: 0.28, size: 0.6 } },
      { type: 'screen', pos: [0, 1.6, -1], s: 0.5, out: 'tele', p: { kind: 'off', stand: true } },
      { type: 'screen', pos: [0, 1.6, -1], s: 0.5, at: 'tele', enter: 'none', p: { kind: 'code', stand: true } },
      { type: 'label', pos: [0, 0.55, -0.49], at: 'tele', p: { text: 'TELE', w: 0.8, h: 0.28, size: 0.6 } },
      { type: 'phone', pos: [0.85, 1.45, -0.9], rot: [0, -0.3, -0.12], at: 'celular', bob: 0.03, p: { kind: 'chat' } },
      { type: 'label', pos: [0.85, 0.55, -0.49], at: 'celular', p: { text: 'CELULAR', w: 0.8, h: 0.28, size: 0.6 } },
    ],
    overlays: [{ type: 'pill', text: 'TODO LO QUE USÓ', at: 'celular' }] },
  // 6. 90 videos
  { id: 'b06', set: 'void', cam: { from: [0.8, 2.4, 8.6], to: [-0.5, 2.6, 9.6], look: [0, 1.7, 0], fov: 46 }, keywords: ['Rockstar', '90'],
    actors: [
      { type: 'server', pos: [0, 0, -0.5], p: { alarm: true } },
      { type: 'label', pos: [0, 2.3, -0.5], p: { text: 'ROCKSTAR', w: 1.3, h: 0.4, bg: '#15102b', color: C.gold, size: 0.62, weight: 900 } },
      { type: 'ring', pos: [0, 0.03, -0.5], p: { r: 1.1, color: C.red } },
      { type: 'person', pos: [-1.15, 0, 0.3], rot: [0, 0.9, 0], s: 0.9, p: { ...KID, pose: 'type' } },
      { type: 'clips', pos: [0, 1.5, 0.2], at: 'publica', enter: 'none', p: { n: 45, seed: 8, spread: [1.8, 2.0, 1.6] } },
    ],
    overlays: [{ type: 'big', text: '90 VIDEOS', sub: 'del juego sin terminar', at: '90', red: true, size: 110 }] },
  // 7. US$ 5 millones según Rockstar
  { id: 'b07', set: 'room', cam: { from: [0.7, 2.3, 6.4], to: [-0.2, 2.1, 5.6], look: [0, 1.4, -0.4], fov: 46, shift: 0.06 }, keywords: ['Según', '5 millones'],
    actors: [
      { type: 'person', pos: [-0.6, 0, -0.2], rot: [0, 0.5, 0], p: { ...ROCK, pose: 'sad' } },
      { type: 'label', pos: [-0.5, 2.15, -0.2], p: { text: 'ROCKSTAR', w: 1.1, h: 0.36, bg: '#15102b', color: C.gold, size: 0.62, weight: 900 } },
      { type: 'coins', pos: [0.8, 0, -0.3], s: 0.9, enter: 'none', p: { n: 16, dur: 0.01, r: 0.4 } },
      { type: 'arrow', pos: [0.8, 2.75, -0.3], rot: [0, 0, Math.PI], at: 'costó', enter: 'none', p: { len: 1.0, color: C.red, dur: 0.5 } },
      { type: 'cross', pos: [0.8, 1.0, 0.3], at: '5', p: { size: 0.7 } },
    ],
    overlays: [{ type: 'big', text: 'US$ 5 MILLONES', sub: 'costo del ataque, según Rockstar', at: '5', red: true, size: 92 }] },
  // 8. 2023: hospital, sin plazo
  { id: 'b08', cam: { from: [-1.0, 2.6, 9.6], to: [0.5, 2.3, 8.4], look: [0, 1.7, 0], fov: 46 }, keywords: ['2023', 'no', 'hospital', 'sin plazo'],
    actors: [
      { type: 'calendar', pos: [-1.1, 2.5, 0.6], rot: [0, 0.25, 0], s: 0.6, p: { top: 'AÑO', big: '2023', color: C.blue } },
      { type: 'mazo', pos: [0.6, 1.9, 0.6], rot: [0, -0.4, 0], s: 0.8, out: 'Un', p: { delay: 99 } },
      { type: 'cross', pos: [0.6, 2.15, 0.9], at: 'no', out: 'Un', p: { size: 0.7 } },
      { type: 'building', pos: [0.35, 0, -1.2], at: 'Un', enter: 'grow', p: { w: 2.2, h: 2.6, d: 1.4, seed: 12, color: '#274a7a', sign: 'HOSPITAL' } },
      { type: 'person', pos: [-0.75, 0, 0.9], rot: [0, 0.5, 0], s: 0.9, p: { ...KID, pose: 'idle' } },
      { type: 'label', pos: [0.35, 1.6, -0.45], at: 'hospital', p: { text: '+', w: 0.7, h: 0.7, bg: '#f4f1ff', color: C.red, size: 0.95, weight: 900 } },
      { type: 'label', pos: [1.0, 0.7, 0.9], at: 'sin', bob: 0.05, p: { text: '?', w: 0.8, h: 0.8, size: 0.95, color: C.gold, weight: 900 } },
    ],
    overlays: [{ type: 'pill', text: 'SIN CONDENA', at: 'condena', out: 'hospital' }, { type: 'pill', text: 'INTERNADO, SIN PLAZO', at: 'sin', red: true }] },
  // 9. enero 2026: se levanta la orden
  { id: 'b09', set: 'void', cam: { from: [0.7, 2.4, 8.2], to: [-0.3, 2.2, 7.4], look: [0, 1.6, 0], fov: 46 }, keywords: ['enero', 'levantó', 'justicia'],
    actors: [
      { type: 'calendar', pos: [-1.0, 2.4, 0], rot: [0, 0.25, 0], s: 0.66, p: { top: 'ENERO', big: '2026', color: C.blue } },
      { type: 'label', pos: [-1.0, 0.95, 0.2], rot: [0, 0.15, 0.04], p: { text: 'ORDEN', w: 1.2, h: 1.0, bg: '#f4f1ff', color: '#1a1030', size: 0.26, weight: 900, sub: 'DE HOSPITAL', subColor: '#6b5aa8' }, move: { to: [-1.0, 6.5, 0.2], at: 'levantó', dur: 0.8 } },
      { type: 'arrow', pos: [-0.25, 1.0, 0.2], rot: [0, 0, -Math.PI / 2], at: 'caso', enter: 'none', p: { len: 0.7, color: C.gold, dur: 0.5 } },
      { type: 'mazo', pos: [0.85, 1.05, 0.2], rot: [0, -0.4, 0], s: 0.95, at: 'justicia', p: { delay: 0.2, n: 1 } },
      { type: 'label', pos: [0.85, 2.2, 0.2], at: 'justicia', p: { text: 'TRIBUNAL', w: 1.3, h: 0.4, bg: '#2d1a6e', color: '#fff', size: 0.6, weight: 900 } },
      { type: 'person', pos: [-0.9, 0, 1.3], s: 0.75, rot: [0, 0.5, 0], at: 'caso', p: { ...KID, pose: 'idle' } },
    ],
    overlays: [{ type: 'pill', text: 'EL CASO VUELVE A LA JUSTICIA', at: 'justicia' }] },
  // 10. 16 de noviembre: culpable de seis cargos
  { id: 'b10', set: 'room', cam: { from: [-0.7, 2.3, 6.4], to: [0.2, 2.1, 5.6], look: [0, 1.5, -0.4], fov: 46, shift: 0.06 }, keywords: ['16', 'culpable', 'seis cargos'],
    actors: [
      { type: 'calendar', pos: [-0.95, 2.3, -0.6], rot: [0, 0.2, 0], s: 0.68, p: { top: 'NOVIEMBRE', big: '16', color: C.red } },
      { type: 'person', pos: [-0.9, 0, 0.2], rot: [0, 0.4, 0], s: 0.95, p: { ...KID, pose: 'idle' }, out: 'culpable' },
      { type: 'person', pos: [-0.9, 0, 0.2], rot: [0, 0.4, 0], s: 0.95, at: 'culpable', enter: 'none', p: { ...KID, pose: 'sad' } },
      ...[0, 1, 2, 3, 4, 5].map((i) => ({ type: 'label', pos: [0.15 + (i % 2) * 0.7, 2.55 - Math.floor(i / 2) * 0.62, -0.3] as any, at: i < 1 ? 'culpable' : 'seis', p: { text: 'CARGO ' + (i + 1), w: 0.64, h: 0.5, bg: '#f4f1ff', color: '#1a1030', size: 0.3, weight: 900 } })),
      ...[0, 1, 2, 3, 4, 5].map((i) => ({ type: 'check', pos: [0.4 + (i % 2) * 0.7, 2.4 - Math.floor(i / 2) * 0.62, -0.1] as any, at: 'cargos', p: { size: 0.22 } })),
    ],
    overlays: [{ type: 'big', text: 'CULPABLE', sub: 'se declaró él · 6 cargos', at: 'culpable', red: true, size: 104 }] },
  // 11. lunes 23: siete años
  { id: 'b11', cam: { from: [0.9, 2.5, 8.6], to: [-0.2, 2.2, 7.4], look: [0, 1.6, 0], fov: 46 }, keywords: ['23', 'fiscalía', 'siete años'],
    actors: [
      { type: 'box', pos: [0.3, 1.0, 0], p: { size: [2.0, 2.0, 0.7], color: '#5a3a22' } },
      { type: 'person', pos: [0.3, 1.15, -0.6], s: 1.1, p: { ...JUEZ, pose: 'idle' } },
      { type: 'mazo', pos: [0.6, 2.0, 0.05], s: 0.7, at: 'juez', p: { delay: 0.5, n: 2, every: 0.6 } },
      { type: 'calendar', pos: [-1.1, 2.45, 0.3], rot: [0, 0.25, 0], s: 0.6, p: { top: 'LUNES', big: '23', color: C.red } },
      { type: 'label', pos: [0.3, 1.55, 0.37], p: { text: 'TRIBUNAL', w: 1.4, h: 0.4, bg: '#2d1a6e', color: '#fff', size: 0.6, weight: 900 } },
    ],
    overlays: [{ type: 'tag', text: 'según la fiscalía británica', at: 'según', x: 50, y: 27, color: C.blue }, { type: 'big', text: '7 AÑOS', sub: 'la condena del juez', at: 'siete', red: true, size: 120 }] },
  // 12. le contaron el tiempo: sale ese día, con controles
  { id: 'b12', set: 'void', cam: { from: [-0.8, 2.3, 8.0], to: [0.3, 2.5, 8.8], look: [0, 1.5, 0], fov: 46 }, keywords: ['tiempo', 'salió', 'controles'],
    actors: [
      { type: 'rejas', pos: [-0.6, 0, 0.55], out: 'salió', p: { w: 1.4, h: 2.1 } },
      { type: 'rejas', pos: [-0.6, 0, 0.55], at: 'salió', enter: 'none', p: { w: 1.4, h: 2.1, slide: true, dir: -1, dur: 0.6 } },
      { type: 'person', pos: [-0.6, 0, 0], p: { ...KID, pose: 'idle' }, out: 'salió' },
      { type: 'person', pos: [-0.6, 0, 0], rot: [0, 0.5, 0], at: 'salió', enter: 'none', p: { ...KID, pose: 'walk' }, move: { to: [0.7, 0, 1.6], at: 'salió', dur: 1.4 } },
      { type: 'label', pos: [0, 3.0, 0], at: 'tiempo', p: { text: 'TIEMPO YA CUMPLIDO', w: 2.0, h: 0.36, bg: '#15102b', color: '#fff', size: 0.6, weight: 900 } },
      { type: 'progress', pos: [0, 2.55, 0], at: 'tiempo', p: { w: 2.1, h: 0.32, dur: 1.4, color: C.green } },
      { type: 'ring', pos: [0.7, 0.03, 1.6], at: 'controles', p: { r: 0.6, color: C.gold } },
    ],
    overlays: [{ type: 'pill', text: 'LIBRE, CON CONTROLES', at: 'controles' }] },
  // 13. el juego salió hace una semana
  { id: 'b13', cam: { from: [0.9, 2.7, 9.2], to: [-0.4, 2.3, 7.8], look: [0, 1.8, 0], fov: 46 }, keywords: ['una semana', 'Take-Two', '3.790 millones'],
    actors: [
      { type: 'ring', pos: [-0.8, 0.03, 0], p: { r: 0.7, color: C.magenta } },
      { type: 'gamebox', pos: [-0.7, 1.9, 0], s: 0.9, bob: 0.05, p: VI },
      { type: 'calendar', pos: [0.9, 2.5, 0], rot: [0, -0.25, 0], s: 0.62, at: 'salió', out: 'vendió', p: { top: 'NOVIEMBRE', big: '19', color: C.green } },
      { type: 'coins', pos: [0.9, 0, 0], s: 0.85, at: 'vendió', enter: 'none', p: { n: 44, dur: 2.2, r: 0.4 } },
    ],
    overlays: [{ type: 'pill', text: 'SALIÓ EL 19 DE NOVIEMBRE', at: 'salió', out: '3.790' }, { type: 'big', text: '', count: { to: 3790, pre: 'US$ ', post: ' M' }, sub: 'en un día · según Take-Two', at: '3.790', size: 108 }] },
  // 14. parte 5, seguime
  { id: 'b14', set: 'void', cam: { from: [-0.5, 2.3, 7.6], to: [0.2, 2.1, 6.6], look: [0, 1.5, 0], fov: 44 }, keywords: ['parte cinco', 'Seguime', 'GTA VI'],
    actors: [
      { type: 'ring', pos: [0, 0.03, 0.3], p: { r: 0.85, color: C.cyan } },
      { type: 'person', pos: [0, 0, 0.3], p: { ...ROCK, pose: 'point' } },
      ...[1, 2, 3, 4].map((n, i) => ({ type: 'label', pos: [-1.25 + i * 0.52, 2.45, 0] as any, at: 0.05 + i * 0.1, p: { text: String(n), w: 0.5, h: 0.5, bg: '#2d1a6e', color: '#9a8fd0', size: 0.7, weight: 900 } })),
      { type: 'label', pos: [0.95, 2.5, 0.1], at: 'cinco', p: { text: '5', w: 0.78, h: 0.78, bg: C.gold, color: '#1a1030', size: 0.74, weight: 900 } },
    ],
    overlays: [{ type: 'tag', text: 'GTA VI · PARTE 5', at: 'parte', x: 50, y: 27, color: C.red, out: 'Seguime' }, { type: 'big', text: 'SEGUIME', sub: 'lo que siga con GTA VI, acá', at: 'Seguime', size: 110 }] },
  // 15. ¿sabías cómo lo hizo?
  { id: 'b15', set: 'room', cam: { from: [0.5, 2.4, 6.0], to: [-0.2, 2.2, 5.3], look: [0, 1.3, -1], fov: 46, shift: 0.06 }, keywords: ['cómo'],
    actors: [
      { type: 'box', pos: [0, 0.45, -1], p: { size: [3.0, 0.9, 1.0], color: '#8a5a3a' } },
      { type: 'firestick', pos: [-0.85, 1.4, -0.9], rot: [0, 0, 0.25], s: 1.2, spin: 0.8, p: {} },
      { type: 'screen', pos: [0, 1.6, -1], s: 0.5, p: { kind: 'code', stand: true } },
      { type: 'phone', pos: [0.85, 1.45, -0.9], rot: [0, -0.3, -0.12], bob: 0.03, p: { kind: 'chat' } },
    ],
    overlays: [{ type: 'big', text: '¿SABÍAS CÓMO LO HIZO?', sub: 'te leo en los comentarios', at: 0.1, size: 62 }] },
];
