import type { BeatSpec } from '../../src/Beat';
import { C } from '../../src/kit/math';

const ANT = { shirt: '#d97757', hair: '#15102b', skin: '#f2c39b', pants: '#2a2350' };   // "vos": uno de los siete (genérico)
const DARIO = { shirt: '#2f4fd6', hair: '#2a1c12', skin: '#f2c39b' };                    // genérico
const DANIELA = { shirt: '#c2307e', hair: '#5a3a1a', skin: '#ffd9b8' };                  // genérico
const SEVEN = [
  { shirt: '#8a6bff', hair: '#3a2a1a', skin: '#c98d62' }, DARIO, { shirt: '#3ee07a', hair: '#15102b', skin: '#ffd9b8' }, ANT,
  DANIELA, { shirt: C.cyan, hair: '#7a3b1a', skin: '#f2c39b' }, { shirt: C.gold, hair: '#15102b', skin: '#8a5a3c' },
];
const FX = [-1.38, -0.92, -0.46, 0, 0.46, 0.92, 1.38];
type O = { z?: number; sc?: number; at?: any; out?: any; v?: number; stag?: number; enter?: any; skipMe?: boolean; onlyMe?: boolean };
/** los siete fundadores en fila (vos = el del medio) */
const seven = (pose: string, o: O = {}): any[] => FX.map((x, i) => ({ type: 'person', pos: [x, 0, (o.z ?? 0) - Math.abs(x) * (o.v ?? 0)], s: o.sc ?? 0.62,
  at: typeof o.at === 'number' && o.stag ? (i === 3 ? undefined : o.at + i * o.stag) : o.at, out: o.out, enter: o.enter, p: { ...SEVEN[i], pose, phase: i * 0.7 } }))
  .filter((_, i) => !(o.skipMe && i === 3));
const SHARE = { text: 'ANT', sub: 'ACCIÓN', w: 1.2, h: 0.8, bg: '#f4f1ff', color: '#1a1030', border: C.gold, size: 0.42, weight: 900 };
const PATH = [83, 97.17, 88.91, 87.64, 81.91];            // precio inicial y cierres jue 19, vie 20, lun 23, mar 24
const DAYS = ['IPO', 'JUE', 'VIE', 'LUN', 'MAR'];
const HQ = { w: 2.6, h: 2.0, d: 1.3, seed: 12, color: '#7a3320', sign: 'ANTHROPIC' };
const TOWER = '#5b3fd6';

export const BEATS: BeatSpec[] = [
  /* ---------- GANCHO ---------- */
  { id: 'b01', cam: { from: [0.8, 2.5, 8.8], to: [0, 2.0, 7.2], look: [0, 1.0, 0], fov: 46 }, keywords: ['siete', 'Anthropic'],
    actors: [
      { type: 'building', pos: [0, 0, -2.2], p: HQ },
      { type: 'ring', pos: [0, 0.03, 0], p: { r: 0.4, color: C.gold } },
      ...seven('idle', { at: 0.05, stag: 0.09, v: 0.25 }),
      { type: 'label', pos: [0, 1.5, 0], at: 'uno', bob: 0.03, p: { text: 'VOS', w: 0.62, h: 0.3, bg: C.gold, color: '#1a1030', size: 0.7, weight: 900 } },
    ],
    overlays: [{ type: 'pill', text: 'LOS 7 FUNDADORES', at: 'siete' }] },
  { id: 'b02', set: 'void', cam: { from: [-0.9, 2.5, 8.8], to: [0.4, 2.3, 7.6], look: [0, 1.5, 0], fov: 46 }, keywords: ['récord', '280'],
    actors: [
      { type: 'bell', pos: [-0.75, 0, -1.2], s: 0.9, p: { ring: true } },
      { type: 'ring', pos: [0.35, 0.03, 0.4], p: { r: 0.6, color: C.gold } },
      { type: 'person', pos: [0.35, 0, 0.4], p: { ...ANT, pose: 'hold' }, out: '280' },
      { type: 'person', pos: [0.35, 0, 0.4], at: '280', enter: 'none', p: { ...ANT, pose: 'cheer' } },
      { type: 'label', pos: [0.35, 1.2, 0.85], s: 0.55, p: SHARE, move: { to: [3.6, 2.6, 0.2], at: 'vendés', dur: 0.7 } },
      { type: 'coins', pos: [1.25, 0, 0.1], at: 'acciones', enter: 'none', p: { n: 14, dur: 0.8, r: 0.3 } },
      { type: 'coins', pos: [1.25, 0, -0.6], at: '280', enter: 'none', p: { n: 22, dur: 1.0, r: 0.3 } },
    ],
    overlays: [
      { type: 'pill', text: 'SALIDA A BOLSA RÉCORD', at: 'récord' },
      { type: 'big', text: '', count: { to: 280, pre: 'US$ ', post: ' M' }, sub: 'vendés en acciones', at: '280' },
    ] },
  { id: 'b03', cam: { from: [-0.8, 2.7, 8.6], to: [0.4, 2.3, 7.6], look: [0, 0.9, 0], fov: 46 }, keywords: ['seis', 'mismo'],
    actors: [
      ...seven('hold', { out: 'mismo' }),
      ...seven('cheer', { at: 'mismo', enter: 'none' }),
      { type: 'ring', pos: [0, 0.03, 0], p: { r: 0.36, color: C.gold } },
      ...FX.map((x, i) => ({ type: 'coins', pos: [x, 0, 0.55] as any, at: i === 3 ? undefined : 0.15 + (i > 3 ? i - 1 : i) * 0.28, enter: 'none' as any, p: { n: 9, dur: i === 3 ? 0.01 : 0.4, r: 0.17 } })),
    ],
    overlays: [{ type: 'big', text: '× 7', sub: 'cada fundador vende lo mismo', at: 'exactamente' }] },
  { id: 'b04', set: 'void', cam: { from: [0.5, 1.9, 8.6], to: [-0.4, 2.9, 11.0], look: [0, 1.2, 0], lookTo: [0, 1.6, 0], fov: 46 }, keywords: ['2.000', 'TechCrunch'],
    actors: [
      { type: 'ring', pos: [0, 0.03, 0], p: { r: 1.5, color: C.gold } },
      { type: 'coins', pos: [-1.15, 0, 0], enter: 'none', p: { n: 16, dur: 0.7, r: 0.36 } },
      { type: 'coins', pos: [-0.38, 0, 0], at: 'siete', enter: 'none', p: { n: 27, dur: 1.0, r: 0.36 } },
      { type: 'coins', pos: [0.38, 0, 0], at: 'cobran', enter: 'none', p: { n: 33, dur: 1.2, r: 0.36 } },
      { type: 'coins', pos: [1.15, 0, 0], at: '2.000', enter: 'none', p: { n: 22, dur: 0.9, r: 0.36 } },
      ...seven('cheer', { z: 1.25, sc: 0.46 }),
    ],
    overlays: [
      { type: 'big', text: '', count: { to: 1960, pre: 'US$ ', post: ' M' }, sub: 'entre los siete fundadores', at: '2.000', size: 108 },
      { type: 'pill', text: 'SEGÚN TECHCRUNCH', at: 'según' },
    ] },
  { id: 'b05', set: 'room', cam: { from: [0.9, 2.6, 6.6], to: [-0.4, 2.4, 5.8], look: [0, 1.9, -1.5], fov: 46, shift: 0.0 }, keywords: ['cuarto', 'debajo'],
    actors: [
      { type: 'chart', pos: [0, 2.55, -1.6], s: 0.95, p: { pts: PATH, lo: 76, hi: 100, base: 83, baseText: 'VENDISTE A 83', dur: 3.2, delay: 0.1, days: DAYS, tags: [null, null, null, null, { text: '81,91', dy: -0.27, dx: -0.1 }] } },
      { type: 'person', pos: [0.75, 0, -0.5], rot: [0, 2.7, 0], s: 0.8, p: { ...ANT, pose: 'idle' } },
    ],
    overlays: [{ type: 'pill', text: 'DÍA 4: CIERRA BAJO 83', at: 'debajo', red: true }] },

  /* ---------- REPASO ---------- */
  { id: 'b06', cam: { from: [1.0, 2.7, 9.6], to: [0, 2.3, 8.2], look: [0, 1.55, 0], fov: 46 }, keywords: ['repaso', '81.300', '83'],
    actors: [
      { type: 'ring', pos: [0, 0.03, -0.3], p: { r: 1.25, color: C.gold } },
      { type: 'bell', pos: [0, 0, -0.3], p: {}, out: 'junta' },
      { type: 'bell', pos: [0, 0, -0.3], at: 'junta', enter: 'none', p: { ring: true } },
      { type: 'label', pos: [0, 3.02, -0.15], at: '19', p: { text: 'NASDAQ', w: 1.5, h: 0.36, bg: '#15102b', color: C.cyan, size: 0.66 } },
      { type: 'coins', pos: [-1.4, 0, 0.1], at: '81.300', enter: 'none', p: { n: 26, dur: 1.1 } },
      { type: 'coins', pos: [1.4, 0, 0.1], at: 'dólares', enter: 'none', p: { n: 30, dur: 1.0 } },
      { type: 'label', pos: [0, 0.75, 0.3], at: '83', p: { text: 'US$ 83 POR ACCIÓN', w: 1.9, h: 0.42, bg: C.gold, color: '#1a1030', size: 0.6, weight: 900 } },
    ],
    overlays: [
      { type: 'pill', text: 'REPASO: PARTE 1', at: 0.1, out: '19' },
      { type: 'pill', text: 'JUEVES 19 NOV 2026', at: '19' },
      { type: 'big', text: '', count: { to: 81300, pre: 'US$ ', post: ' M' }, sub: 'recaudados en la salida a bolsa', at: '81.300', size: 104 },
    ] },
  { id: 'b07', set: 'room', cam: { from: [-0.8, 2.5, 6.6], to: [0.3, 2.2, 5.6], look: [0, 1.35, -0.6], fov: 46, shift: 0.06 }, keywords: ['Casi', 'caja'],
    actors: [
      { type: 'box', pos: [0, 0.75, -0.8], p: { size: [2.0, 1.5, 1.1], color: '#2b2740' } },
      { type: 'label', pos: [0, 1.0, -0.24], p: { text: 'CAJA', w: 1.3, h: 0.46, bg: '#15102b', border: C.gold, color: C.gold, size: 0.62, weight: 900 } },
      { type: 'label', pos: [0, 0.45, -0.24], p: { text: 'ANTHROPIC', w: 1.3, h: 0.3, color: '#fff', size: 0.7 } },
      { type: 'coins', pos: [-0.62, 1.5, -0.8], enter: 'none', p: { n: 8, dur: 0.01, r: 0.28 } },
      { type: 'coins', pos: [0, 1.5, -0.8], at: 'plata', enter: 'none', p: { n: 15, dur: 0.6, r: 0.28 } },
      { type: 'coins', pos: [0.62, 1.5, -0.8], at: 'caja', enter: 'none', p: { n: 12, dur: 0.6, r: 0.28 } },
    ],
    overlays: [{ type: 'pill', text: 'CASI TODO VA A LA EMPRESA', at: 'va' }] },
  { id: 'b08', set: 'void', cam: { from: [0.9, 2.4, 8.9], to: [-0.4, 2.3, 8.0], look: [0, 1.5, 0], fov: 46 }, keywords: ['paquete', 'tuyo'],
    actors: [
      { type: 'box', pos: [-0.05, 2.2, 0], p: { size: [2.86, 0.9, 0.4], color: '#3b2f7a', glow: true, ei: 0.3 } },
      { type: 'label', pos: [-0.05, 2.2, 0.21], p: { text: 'ACCIONES VENDIDAS: 980 M', w: 2.6, h: 0.36, color: '#fff', size: 0.62 } },
      { type: 'box', pos: [1.415, 2.2, 0], p: { size: [0.07, 0.9, 0.42], color: C.gold, glow: true, ei: 1.6 }, move: { to: [0.95, 1.05, 0.3], at: 'no', dur: 0.6 } },
      { type: 'label', pos: [0.1, 1.05, 0.3], at: 'no', p: { text: '2,4%', w: 1.1, h: 0.5, bg: '#15102b', border: C.gold, color: C.gold, size: 0.6, weight: 900 } },
      { type: 'arrow', pos: [1.415, 3.25, 0.1], rot: [0, 0, Math.PI], s: 0.4, enter: 'none', out: 'no', p: { len: 0.6, color: C.gold, dur: 0.4 } },
      ...seven('idle', { z: 0.9, sc: 0.5, at: 'tuyo' }),
    ],
    overlays: [{ type: 'pill', text: 'ERA DE LOS FUNDADORES', at: 'tuyo' }] },

  /* ---------- CAPÍTULO 1 ---------- */
  { id: 'b09', set: 'void', cam: { from: [0, 2.2, 7], to: [0, 2.1, 6.2], look: [0, 1.4, 0] },
    actors: [{ type: 'label', pos: [0, 1.5, 0], p: { ...SHARE, w: 2.1, h: 1.4 } }, { type: 'ring', pos: [0, 0.03, 0], p: { r: 1.2, color: C.gold } }],
    overlays: [{ type: 'chapter', n: 'CAPÍTULO 1', title: 'LA VENTA', at: 0 }] },
  { id: 'b10', set: 'room', cam: { from: [0.8, 2.4, 6.6], to: [-0.2, 2.1, 5.6], look: [0, 1.4, -0.6], fov: 46, shift: 0.0 }, keywords: ['prospecto', '3,4'],
    actors: [
      { type: 'paper', pos: [-0.85, 2.1, -0.8], rot: [0, 0.25, -0.04], s: 1.1, p: { title: 'PROSPECTO' } },
      { type: 'box', pos: [0.8, 0.4, -0.8], p: { size: [1.7, 0.8, 0.9], color: '#8a5a3a' } },
      { type: 'cards', pos: [0.8, 0.8, -0.8], p: { n: 3, dur: 0.01 } },
      { type: 'cards', pos: [0.8, 1.025, -0.8], at: 'vende', enter: 'none', p: { n: 14, dur: 1.0 } },
    ],
    overlays: [
      { type: 'pill', text: 'SEGÚN EL PROSPECTO', at: 'prospecto' },
      { type: 'big', text: '3.378.378', sub: 'acciones vende cada fundador', at: '3,4', size: 104 },
    ] },
  { id: 'b11', cam: { from: [-1.0, 2.5, 8.8], to: [0.4, 2.3, 7.8], look: [0, 1.6, 0], fov: 46 }, keywords: ['esperaba', '250'],
    actors: [
      { type: 'screen', pos: [0.35, 2.2, -0.6], s: 1.3, p: { kind: 'text', text: '74,00', stand: true } },
      { type: 'label', pos: [0.35, 3.1, -0.5], p: { text: 'PRECIO ESPERADO', w: 1.9, h: 0.36, bg: '#15102b', color: C.cyan, size: 0.62 } },
      { type: 'person', pos: [-1.15, 0, 0.6], rot: [0, 0.6, 0], p: { ...ANT, pose: 'point' } },
      { type: 'coins', pos: [0.1, 0, 0.3], at: 'cuenta', enter: 'none', p: { n: 10, dur: 0.7, r: 0.3 } },
      { type: 'coins', pos: [0.85, 0, 0.3], at: '250', enter: 'none', p: { n: 13, dur: 0.8, r: 0.3 } },
    ],
    overlays: [{ type: 'big', text: '', count: { to: 250, pre: 'US$ ', post: ' M' }, sub: 'por persona, al precio esperado', at: '250' }] },
  { id: 'b12', set: 'void', cam: { from: [0.9, 2.2, 8.4], to: [-0.4, 2.6, 9.0], look: [0, 1.5, 0], fov: 46 }, keywords: ['83', '280'],
    actors: [
      { type: 'bars', pos: [-0.72, 0, 0], p: { vals: [2.2], colors: [C.cyan], w: 0.95, dur: 0.5, stagger: 0 } },
      { type: 'label', pos: [-0.72, 2.5, 0], at: 0.35, p: { text: '250 M', w: 1.15, h: 0.36, bg: '#15102b', size: 0.62 } },
      { type: 'label', pos: [-0.72, 0.6, 0.49], p: { text: 'A US$ 74', w: 0.88, h: 0.3, size: 0.7, color: '#1a1030' } },
      { type: 'bars', pos: [0.72, 0, 0], at: 'sube', enter: 'none', p: { vals: [2.464], colors: [C.gold], w: 0.95, dur: 0.8, stagger: 0 } },
      { type: 'label', pos: [0.72, 0.6, 0.49], at: '83', p: { text: 'A US$ 83', w: 0.88, h: 0.3, size: 0.7, color: '#1a1030' } },
      { type: 'label', pos: [0.72, 2.77, 0], at: '280', p: { text: '280 M', w: 1.15, h: 0.36, bg: '#15102b', color: C.gold, size: 0.62, weight: 900 } },
    ],
    overlays: [{ type: 'pill', text: 'PRECIO FINAL: US$ 83', at: '83' }, { type: 'big', text: '', count: { to: 280, pre: 'US$ ', post: ' M' }, sub: 'cobra cada fundador', at: 'cobra' }] },
  { id: 'b13', cam: { from: [-1.0, 2.6, 9.4], to: [0.5, 2.3, 8.4], look: [0, 1.5, 0], fov: 46 }, keywords: ['no', 'vendedor'],
    actors: [
      { type: 'building', pos: [-0.95, 0, -1.0], p: { ...HQ, w: 1.5, h: 1.9, d: 1.2 } },
      { type: 'cross', pos: [-0.95, 1.1, -0.3], at: 'no', p: { size: 0.9 } },
      { type: 'coins', pos: [-0.2, 0, 0.6], enter: 'none', p: { n: 12, dur: 0.01, r: 0.3 }, move: { to: [0.45, 0, 0.6], at: 'Va', dur: 0.6 } },
      { type: 'arrow', pos: [-0.15, 1.75, 0.3], rot: [0, 0, -Math.PI / 2], s: 0.6, at: 'Va', enter: 'none', p: { len: 1.0, color: C.gold, dur: 0.5 } },
      { type: 'ring', pos: [1.2, 0.03, 0.6], p: { r: 0.45, color: C.gold } },
      { type: 'person', pos: [1.2, 0, 0.6], rot: [0, -0.4, 0], p: { ...ANT, pose: 'idle' }, out: 'vendedor' },
      { type: 'person', pos: [1.2, 0, 0.6], rot: [0, -0.4, 0], at: 'vendedor', enter: 'none', p: { ...ANT, pose: 'cheer' } },
    ],
    overlays: [{ type: 'pill', text: 'NO ENTRA A LA EMPRESA', at: 'no', red: true, out: 'Va' }, { type: 'pill', text: 'VA A CADA FUNDADOR', at: 'Va' }] },
  { id: 'b14', set: 'room', cam: { from: [0.8, 2.3, 6.4], to: [-0.2, 2.0, 5.4], look: [0, 1.25, -0.4], fov: 46, shift: 0.06 }, keywords: ['Dario', 'Daniela', 'Amodei'],
    actors: [
      { type: 'person', pos: [-0.55, 0, -0.4], s: 1.15, p: { ...DARIO, pose: 'idle' } },
      { type: 'person', pos: [0.55, 0, -0.4], s: 1.15, p: { ...DANIELA, pose: 'idle' } },
      { type: 'label', pos: [-0.55, 2.35, -0.4], at: 'Dario', p: { text: 'DARIO', w: 1.0, h: 0.36, bg: '#15102b', color: '#fff', size: 0.66 } },
      { type: 'label', pos: [0.55, 2.35, -0.4], at: 'Daniela', p: { text: 'DANIELA', w: 1.0, h: 0.36, bg: '#15102b', color: '#fff', size: 0.66 } },
      { type: 'coins', pos: [-1.3, 0, -0.5], at: 'hermanos', enter: 'none', p: { n: 12, dur: 0.7, r: 0.26 } },
      { type: 'coins', pos: [1.3, 0, -0.5], at: 'dirigen', enter: 'none', p: { n: 12, dur: 0.7, r: 0.26 } },
    ],
    overlays: [{ type: 'plate', name: 'AMODEI', role: 'CEO y presidenta', at: 'Amodei', y: 72, out: 'hermanos' }, { type: 'pill', text: 'US$ 280 M CADA UNO', at: 'hermanos' }] },

  /* ---------- CAPÍTULO 2 ---------- */
  { id: 'b15', set: 'void', cam: { from: [0, 2.2, 7.4], to: [0, 2.1, 6.6], look: [0, 1.4, 0] },
    actors: [{ type: 'box', pos: [0, 1.3, 0], p: { size: [1.2, 2.6, 1.2], color: TOWER, glow: true, ei: 0.25 } }, { type: 'ring', pos: [0, 0.03, 0], p: { r: 1.2, color: C.cyan } }],
    overlays: [{ type: 'chapter', n: 'CAPÍTULO 2', title: 'LO QUE TE QUEDA', at: 0 }] },
  { id: 'b16', set: 'void', cam: { from: [-0.9, 2.5, 8.8], to: [0.5, 2.3, 7.8], look: [0, 1.6, 0], fov: 46 }, keywords: ['1,4'],
    actors: [
      { type: 'ring', pos: [-0.4, 0.03, 0], p: { r: 1.0, color: C.cyan } },
      { type: 'box', pos: [-0.4, 1.4, 0], p: { size: [1.2, 2.8, 1.2], color: TOWER, glow: true, ei: 0.25 } },
      { type: 'label', pos: [-0.4, 1.6, 0.61], p: { text: 'TUS ACCIONES', w: 1.08, h: 0.3, color: '#fff', size: 0.7, weight: 900 } },
      { type: 'box', pos: [-0.4, 2.83, 0], p: { size: [1.2, 0.05, 1.2], color: C.gold, glow: true, ei: 1.5 }, move: { to: [0.8, 2.83, 0], at: 'cerca', dur: 0.8 } },
      { type: 'label', pos: [0.85, 2.45, 0.3], at: '1,4', p: { text: 'VENDIDO', w: 1.0, h: 0.32, bg: '#15102b', color: C.gold, size: 0.66, weight: 900 } },
    ],
    overlays: [{ type: 'big', text: '1,4%', sub: 'de tus acciones, lo que vendiste', at: '1,4' }] },
  { id: 'b17', cam: { from: [1.0, 2.5, 8.8], to: [-0.4, 2.3, 7.8], look: [0, 1.5, 0], fov: 46 }, keywords: ['240'],
    actors: [
      { type: 'ring', pos: [0.45, 0.03, 0], p: { r: 1.0, color: C.gold } },
      { type: 'cards', pos: [0.45, 0, 0], p: { n: 36, dur: 1.7 } },
      { type: 'person', pos: [-1.05, 0, 0.5], rot: [0, 0.6, 0], p: { ...ANT, pose: 'point' } },
    ],
    overlays: [{ type: 'big', text: '', count: { to: 240, post: ' M' }, sub: 'de acciones te quedan', at: '240' }] },
  { id: 'b18', set: 'void', cam: { from: [-0.6, 1.9, 9.0], to: [0.5, 2.9, 11.0], look: [0, 1.4, 0], lookTo: [0, 1.8, 0], fov: 46 }, keywords: ['martes', '19.500'],
    actors: [
      { type: 'coins', pos: [-1.1, 0, 0.2], enter: 'none', p: { n: 1, dur: 0.01, r: 0.36 } },
      { type: 'label', pos: [-1.0, 0.85, 0.2], p: { text: 'VENDIDO: 280 M', w: 1.75, h: 0.46, bg: '#15102b', color: C.gold, size: 0.62 } },
      { type: 'coins', pos: [0.35, 0, 0], at: 0.1, enter: 'none', p: { n: 35, dur: 1.6, r: 0.36 } },
      { type: 'coins', pos: [1.12, 0, 0], at: 'valen', enter: 'none', p: { n: 35, dur: 1.4, r: 0.36 } },
    ],
    overlays: [
      { type: 'pill', text: 'A US$ 81,91 POR ACCIÓN', at: 'martes' },
      { type: 'big', text: '', count: { to: 19500, pre: 'US$ ', post: ' M' }, sub: 'lo que conserva cada fundador', at: '19.500', size: 100 },
    ] },
  { id: 'b19', cam: { from: [0.9, 2.6, 8.8], to: [-0.3, 2.3, 7.8], look: [0, 1.5, 0], fov: 46 }, keywords: ['mayoría', 'votos'],
    actors: [
      { type: 'screen', pos: [0, 2.3, -0.9], s: 1.4, p: { kind: 'text', text: 'VOTOS', stand: true }, out: 'mayoría' },
      { type: 'screen', pos: [0, 2.3, -0.9], s: 1.4, at: 'mayoría', enter: 'none', p: { kind: 'text', text: '> 50%', stand: true } },
      ...seven('idle', { z: 0.5, sc: 0.56, out: 'controlando' }),
      ...seven('cheer', { z: 0.5, sc: 0.56, at: 'controlando', enter: 'none' }),
      { type: 'check', pos: [1.35, 3.0, -0.7], at: 'votos', p: { size: 0.5 } },
    ],
    overlays: [{ type: 'pill', text: 'MAYORÍA DE LOS VOTOS', at: 'mayoría' }] },
  { id: 'b20', set: 'room', cam: { from: [-0.8, 2.4, 6.4], to: [0.3, 2.1, 5.4], look: [0, 1.4, -0.6], fov: 46, shift: 0.06 }, keywords: ['contrato', '2027'],
    actors: [
      { type: 'box', pos: [-0.35, 0.4, -0.8], p: { size: [1.7, 0.8, 0.9], color: '#8a5a3a' } },
      { type: 'cards', pos: [-0.35, 0.8, -0.8], p: { n: 12, dur: 0.01 } },
      { type: 'padlock', pos: [-0.35, 1.72, -0.75], s: 0.95, at: 'contrato', enter: 'drop', p: {} },
      { type: 'calendar', pos: [0.95, 2.4, -1.4], rot: [0, -0.3, 0], s: 0.62, at: '2027', p: { top: 'HASTA', big: '2027', color: C.red } },
    ],
    overlays: [{ type: 'pill', text: 'NO PODÉS VENDER MÁS', at: 'vender', red: true }] },

  /* ---------- CAPÍTULO 3 ---------- */
  { id: 'b21', set: 'void', cam: { from: [0, 2.2, 7.2], to: [0, 2.1, 6.4], look: [0, 1.3, 0] },
    actors: [{ type: 'gift', pos: [0, 0.4, 0], s: 1.4, p: {} }, { type: 'ring', pos: [0, 0.03, 0], p: { r: 1.2, color: C.magenta } }],
    overlays: [{ type: 'chapter', n: 'CAPÍTULO 3', title: 'LA PROMESA', at: 0 }] },
  { id: 'b22', cam: { from: [-0.9, 2.6, 9.0], to: [0.4, 2.3, 8.0], look: [0, 1.5, 0], fov: 46 }, keywords: ['donar', '80'],
    actors: [
      { type: 'box', pos: [0, 0.5, -0.7], p: { size: [1.3, 1.0, 1.0], color: '#2d1a6e' } },
      { type: 'gift', pos: [0, 1.0, -0.7], s: 1.0, p: {} },
      { type: 'heart', pos: [0, 2.75, -0.6], at: 'donar', bob: 0.05, p: {} },
      ...seven('hold', { z: 0.7, sc: 0.55 }),
    ],
    overlays: [{ type: 'big', text: '80%', sub: 'de sus acciones, a donar', at: '80' }] },
  { id: 'b23', set: 'room', cam: { from: [0.8, 2.4, 6.6], to: [-0.2, 2.1, 5.6], look: [0, 1.5, -0.6], fov: 46, shift: 0.06 }, keywords: ['prospecto', 'voluntario', 'revocar'],
    actors: [
      { type: 'paper', pos: [1.05, 2.0, -1.0], rot: [0, -0.25, 0.04], s: 1.0, p: { title: 'PROSPECTO' } },
      { type: 'person', pos: [-0.95, 0, -0.6], rot: [0, 0.35, 0], p: { ...ANT, pose: 'hold' } },
      { type: 'gift', pos: [-0.85, 1.0, -0.15], s: 0.42, p: {}, move: { to: [0.05, 1.35, -0.2], at: 'compromiso', dur: 0.6 }, out: 'revocar' },
      { type: 'gift', pos: [0.05, 1.35, -0.2], s: 0.42, at: 'revocar', enter: 'none', p: {}, move: { to: [-0.85, 1.0, -0.15], at: 'revocar', dur: 0.7 } },
      { type: 'label', pos: [-0.35, 3.0, -0.9], at: 'voluntario', p: { text: 'VOLUNTARIO', w: 1.7, h: 0.4, bg: '#15102b', border: C.cyan, color: '#fff', size: 0.6, weight: 900 } },
      { type: 'label', pos: [-0.35, 2.52, -0.9], at: 'revocar', p: { text: 'REVOCABLE', w: 1.7, h: 0.4, bg: '#15102b', border: C.gold, color: C.gold, size: 0.6, weight: 900 } },
    ],
    overlays: [{ type: 'pill', text: 'LO ACLARA EL PROSPECTO', at: 'prospecto' }] },
  { id: 'b24', set: 'void', cam: { from: [0, 2.3, 7.4], to: [0, 2.2, 6.6], look: [0, 1.5, 0] }, keywords: ['legal'],
    actors: [
      { type: 'ring', pos: [0, 0.03, 0], p: { r: 1.2, color: C.cyan } },
      { type: 'paper', pos: [0, 1.75, 0], s: 1.35, p: { title: 'OBLIGACIÓN' } },
      { type: 'cross', pos: [0, 1.6, 0.3], at: 0.3, p: { size: 1.0 } },
    ],
    overlays: [{ type: 'pill', text: 'SIN OBLIGACIÓN LEGAL', at: 0.35 }] },

  /* ---------- LA ACCIÓN ---------- */
  { id: 'b25', set: 'void', cam: { from: [0.9, 2.4, 8.9], to: [-0.5, 2.3, 8.1], look: [0, 1.5, 0], fov: 46 }, keywords: ['desinfla', '111,50', '81,91'],
    actors: [
      { type: 'chart', pos: [0, 2.15, 0], p: { pts: [83, 111.5, 97.17, 88.91, 87.64, 81.91], lo: 64, hi: 120, base: 83, baseText: 'PRECIO 83', dur: 4.6, delay: 2.5, h: 2.1,
        days: ['IPO', 'ABRE', 'JUE', 'VIE', 'LUN', 'MAR'], tags: [null, { text: '111,50', dx: 0.3, dy: 0.2 }, null, null, null, { text: '81,91', dy: -0.27, dx: -0.1 }] } },
      { type: 'label', pos: [0, 0.72, 0.2], p: { text: 'ANT · NASDAQ', w: 1.9, h: 0.34, bg: '#15102b', color: C.cyan, size: 0.62 } },
      { type: 'arrow', pos: [1.25, 2.95, 0.3], rot: [0, 0, Math.PI], s: 0.45, at: 'desinfla', enter: 'none', out: 'Abre', p: { len: 1.4, color: C.red, dur: 0.6 } },
    ],
    overlays: [{ type: 'pill', text: 'ABRE A US$ 111,50', at: '111,50', out: 'martes' }, { type: 'big', text: 'US$ 81,91', sub: 'cierre del martes 24', at: '81,91', red: true }] },
  { id: 'b26', cam: { from: [0.9, 2.5, 8.4], to: [-0.3, 2.2, 7.4], look: [0, 1.5, 0], fov: 46 }, keywords: ['inicial', '1,3'],
    actors: [
      { type: 'ring', pos: [-0.45, 0.03, 0.3], p: { r: 0.6, color: C.cyan } },
      { type: 'person', pos: [-0.45, 0, 0.3], s: 1.1, p: { shirt: C.cyan, hair: '#7a3b1a', skin: '#c98d62', pose: 'hold' } },
      { type: 'label', pos: [-0.45, 1.3, 0.85], s: 0.5, p: SHARE },
      { type: 'label', pos: [0.95, 2.3, 0.3], rot: [0, 0, -0.08], at: 'precio', p: { text: 'A US$ 83', w: 1.25, h: 0.46, bg: C.gold, color: '#1a1030', size: 0.6, weight: 900 } },
      { type: 'arrow', pos: [0.95, 1.9, 0.3], rot: [0, 0, Math.PI], s: 0.5, at: 'pierde', enter: 'none', p: { len: 0.5, color: C.red } },
    ],
    overlays: [{ type: 'big', text: '−1,3%', sub: 'si compró al precio inicial', at: '1,3', red: true }] },
  { id: 'b27', set: 'void', cam: { from: [-0.9, 2.5, 9.0], to: [0.4, 2.3, 8.0], look: [0, 1.5, 0], fov: 46 }, keywords: ['apertura', '26'],
    actors: [
      { type: 'person', pos: [-1.15, 0, 0.2], s: 0.8, p: { shirt: C.cyan, hair: '#7a3b1a', skin: '#c98d62', pose: 'hold' } },
      { type: 'label', pos: [-1.15, 1.6, 0.2], p: { text: '−1,3%', w: 0.85, h: 0.32, bg: '#15102b', color: C.red, size: 0.66, weight: 900 } },
      { type: 'ring', pos: [0.3, 0.03, 0.3], p: { r: 0.6, color: C.magenta } },
      { type: 'person', pos: [0.3, 0, 0.3], s: 1.1, p: { shirt: '#8a6bff', hair: '#15102b', skin: '#ffd9b8', pose: 'hold' }, out: 'pierde' },
      { type: 'person', pos: [0.3, 0, 0.3], s: 1.1, at: 'pierde', enter: 'none', p: { shirt: '#8a6bff', hair: '#15102b', skin: '#ffd9b8', pose: 'sad' } },
      { type: 'label', pos: [0.3, 2.35, 0.3], rot: [0, 0, 0.06], at: 'apertura', p: { text: 'A US$ 111,50', w: 1.5, h: 0.46, bg: C.green, color: '#1a1030', size: 0.6, weight: 900 } },
      { type: 'arrow', pos: [1.4, 3.0, 0.2], rot: [0, 0, Math.PI], s: 0.7, at: 'pierde', enter: 'none', p: { len: 2.6, color: C.red, dur: 0.7 } },
    ],
    overlays: [{ type: 'big', text: '−26,5%', sub: 'si compró en la apertura', at: '26', red: true }] },
  { id: 'b28', set: 'room', cam: { from: [-0.8, 2.4, 6.8], to: [0.4, 2.2, 6.0], look: [0, 1.5, -0.6], fov: 46, shift: 0.0 }, keywords: ['pega', '7.000'],
    actors: [
      { type: 'person', pos: [-1.3, 0, -0.3], rot: [0, 0.5, 0], p: { ...ANT, pose: 'idle' }, out: 'pega' },
      { type: 'person', pos: [-1.3, 0, -0.3], rot: [0, 0.5, 0], at: 'pega', enter: 'none', p: { ...ANT, pose: 'sad' } },
      { type: 'bars', pos: [-0.2, 0, -0.9], p: { vals: [2.5], colors: [C.green], w: 0.85, dur: 0.6, stagger: 0 } },
      { type: 'label', pos: [-0.2, 2.72, -0.9], at: 0.4, p: { text: '26.500 M', w: 1.1, h: 0.34, bg: '#15102b', color: '#fff', size: 0.62 } },
      { type: 'label', pos: [-0.2, 1.5, -0.46], p: { text: 'APERTURA', w: 0.8, h: 0.26, size: 0.7, color: '#1a1030', weight: 900 } },
      { type: 'bars', pos: [1.0, 0, -0.9], at: 'conservás', enter: 'none', p: { vals: [1.84], colors: [C.red], w: 0.85, dur: 0.7, stagger: 0 } },
      { type: 'label', pos: [1.0, 2.06, -0.9], at: 'vale', p: { text: '19.500 M', w: 1.1, h: 0.34, bg: '#15102b', color: '#fff', size: 0.62 } },
      { type: 'label', pos: [1.0, 1.3, -0.46], at: 'vale', p: { text: 'MARTES', w: 0.8, h: 0.26, size: 0.7, color: '#fff', weight: 900 } },
    ],
    overlays: [{ type: 'big', text: '', count: { to: 7000, pre: '−US$ ', post: ' M' }, sub: 'vale tu parte contra la apertura', at: '7.000', red: true, size: 100 }] },

  /* ---------- LA DUDA ---------- */
  { id: 'b29', cam: { from: [-1.2, 2.5, 9.4], to: [0.8, 2.3, 8.4], look: [0, 1.6, 0], fov: 46 }, keywords: ['pregunta', '1,4', 'mucho', 'poco'],
    actors: [
      { type: 'ring', pos: [0, 0.03, -0.3], p: { r: 1.1, color: C.magenta } },
      { type: 'box', pos: [0, 1.3, -0.3], p: { size: [1.2, 2.6, 1.2], color: TOWER, glow: true, ei: 0.25 } },
      { type: 'box', pos: [0, 2.95, -0.3], bob: 0.05, p: { size: [1.2, 0.05, 1.2], color: C.gold, glow: true, ei: 1.5 } },
      { type: 'label', pos: [0, 1.5, 0.31], at: 'pregunta', bob: 0.04, p: { text: '?', w: 0.9, h: 0.9, size: 0.95, color: C.gold, weight: 900 } },
      { type: 'label', pos: [1.2, 2.95, 0], at: '1,4', p: { text: '1,4%', w: 0.8, h: 0.34, bg: C.gold, color: '#1a1030', size: 0.66, weight: 900 } },
      { type: 'label', pos: [-1.2, 2.0, 0.5], rot: [0, 0, 0.1], at: 'mucho', p: { text: 'MUCHO', w: 1.05, h: 0.4, bg: '#15102b', border: C.magenta, color: '#fff', size: 0.6, weight: 900 } },
      { type: 'label', pos: [1.2, 1.4, 0.5], rot: [0, 0, -0.1], at: 'poco', p: { text: 'POCO', w: 1.05, h: 0.4, bg: '#15102b', border: C.cyan, color: '#fff', size: 0.6, weight: 900 } },
    ],
    overlays: [{ type: 'pill', text: '¿MUCHO O POCO?', at: 'mucho' }] },
  { id: 'b30', set: 'void', cam: { from: [0.6, 2.0, 8.8], to: [-0.4, 2.8, 10.6], look: [0, 1.2, 0], lookTo: [0, 1.5, 0], fov: 46 }, keywords: ['plata', '2.000', 'siete'],
    actors: [
      ...FX.map((x, i) => ({ type: 'coins', pos: [x, 0, -0.5] as any, at: 0.05 + i * 0.16, enter: 'none' as any, p: { n: 26, dur: 0.9, r: 0.2 } })),
      ...seven('cheer', { z: 0.6, sc: 0.5 }),
    ],
    overlays: [{ type: 'pill', text: 'EN PLATA', at: 0.1 }, { type: 'big', text: '', count: { to: 1960, pre: 'US$ ', post: ' M' }, sub: 'entre siete personas', at: '2.000', size: 108 }] },
  { id: 'b31', cam: { from: [1.0, 2.6, 9.0], to: [-0.4, 2.3, 8.0], look: [0, 1.5, 0], fov: 46 }, keywords: ['proporción', '98'],
    actors: [
      ...FX.map((x, i) => ({ type: 'box', pos: [x, 1.2, 0] as any, p: { size: [0.34, 2.4, 0.34], color: SEVEN[i].shirt, glow: true, ei: 0.3 } })),
      ...FX.map((x, i) => ({ type: 'box', pos: [x, 2.43, 0] as any, p: { size: [0.34, 0.04, 0.34], color: C.gold, glow: true, ei: 1.6 }, move: { to: [x, 2.85, 0] as any, at: 0.3 + i * 0.14, dur: 0.4 } })),
    ],
    overlays: [{ type: 'pill', text: 'EN PROPORCIÓN', at: 0.1 }, { type: 'big', text: '98,6%', sub: 'conserva cada fundador', at: '98' }] },

  /* ---------- CIERRE ---------- */
  { id: 'b32', cam: { from: [-0.8, 2.5, 8.8], to: [0, 2.1, 7.4], look: [0, 1.0, 0], fov: 46 }, keywords: ['siete', '280', '83'],
    actors: [
      { type: 'building', pos: [0, 0, -2.2], p: HQ },
      { type: 'ring', pos: [0, 0.03, 0], p: { r: 0.4, color: C.gold } },
      ...seven('idle', { v: 0.25, skipMe: true }),
      { type: 'person', pos: [0, 0, 0], s: 0.62, p: { ...ANT, pose: 'idle' }, out: 'Cobraste' },
      { type: 'person', pos: [0, 0, 0], s: 0.62, at: 'Cobraste', enter: 'none', p: { ...ANT, pose: 'cheer' } },
      { type: 'label', pos: [0, 1.5, 0], bob: 0.03, p: { text: 'VOS', w: 0.62, h: 0.3, bg: C.gold, color: '#1a1030', size: 0.7, weight: 900 } },
      ...FX.map((x, i) => ({ type: 'coins', pos: [x, 0, 0.55 - Math.abs(x) * 0.25] as any, at: i === 3 ? 'Cobraste' : '280', enter: 'none' as any, p: { n: 9, dur: 0.5 + i * 0.12, r: 0.17 } })),
    ],
    overlays: [{ type: 'big', text: '', count: { to: 280, pre: 'US$ ', post: ' M' }, sub: 'a US$ 83 por acción', at: '280' }] },
  { id: 'b33', set: 'void', cam: { from: [0.9, 2.2, 8.2], to: [-0.4, 2.4, 9.2], look: [0, 1.7, 0], fov: 46 }, keywords: ['atado', 'debajo'],
    actors: [
      { type: 'chart', pos: [0, 2.05, 0], p: { pts: PATH, lo: 76, hi: 100, base: 83, baseText: 'VENDISTE A 83', dur: 2.4, delay: 0.1, days: DAYS, tags: [null, null, null, null, { text: '81,91', dy: -0.27, dx: -0.1 }] } },
      { type: 'cards', pos: [-1.05, 0, 0.5], s: 0.7, p: { n: 9, dur: 0.01 } },
      { type: 'padlock', pos: [-1.05, 0.5, 0.55], s: 0.5, at: 'atado', enter: 'drop', p: {} },
      { type: 'person', pos: [1.05, 0, 0.7], rot: [0, -0.5, 0], s: 0.65, p: { ...ANT, pose: 'idle' }, out: 'debajo' },
      { type: 'person', pos: [1.05, 0, 0.7], rot: [0, -0.5, 0], s: 0.65, at: 'debajo', enter: 'none', p: { ...ANT, pose: 'shrug' } },
    ],
    overlays: [{ type: 'pill', text: 'HOY: US$ 81,91', at: 'debajo', red: true }] },
  { id: 'b34', cam: { from: [0.4, 2.2, 7.0], to: [0, 2.0, 6.0], look: [0, 1.2, 0], fov: 44 },
    actors: [
      { type: 'ring', pos: [0, 0.03, 0], p: { r: 0.85, color: C.gold } },
      { type: 'person', p: { ...ANT, pose: 'point' } },
      { type: 'bell', pos: [-0.8, 0.9, 0.2], s: 0.42, at: 0.15, p: { ring: true, frame: false } },
    ],
    overlays: [{ type: 'big', text: 'SEGUIME', sub: 'para la próxima historia', at: 0.15, size: 110 }] },
];
