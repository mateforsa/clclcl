import type { BeatSpec } from '../../src/Beat';
import { C } from '../../src/kit/math';

const PI = Math.PI;
type V = [number, number, number];
const K = { psg: '#1d2f8a', roma: '#b01c33', lille: '#e8334a', bayern: '#c21f2f', inter: '#1f5fe0', stut: '#f4f1ff', atl: '#e8334a', vik: '#16245e', liv: '#d81f33', bru: '#3d8bff', bar: '#27409c', sab: '#6cc4ff' };
const SOULE = { kit: 'roma', hair: '#7a4b1a', skin: '#f2c39b' };
const LAUTARO = { kit: 'inter', hair: '#15102b', skin: '#e3ad80' };
const JULIAN = { kit: 'atleti', hair: '#3a2a1a', skin: '#f2c39b' };
const name = (text: string, pos: V, at: any, bg = '#f4f1ff', color = '#15102b', w = 1.25, extra: any = {}) => ({ type: 'label', pos, at, p: { text, w, h: 0.36, bg, color, size: 0.62, weight: 900 }, ...extra });
const board = (a: string, sa: number | string, b: string, sb: number | string, ca: string, cb: string, hi?: string) => ({ a, b, sa, sb, ca, cb, hi });

export const BEATS: BeatSpec[] = [
  // 1. PSG 2, Roma 2 + un argentino
  { id: 'b01', cam: { from: [0.9, 2.5, 8.9], to: [0.1, 2.2, 7.8], look: [0, 1.6, 0], fov: 44 }, keywords: ['PSG', 'Roma', 'argentino'],
    actors: [
      { type: 'pitch', pos: [0, 0, 1], p: { w: 9, d: 7, bands: 6 } },
      { type: 'stands', pos: [0, 0, -3.2], p: { w: 11, rows: 6, seed: 4 } },
      { type: 'score', pos: [0, 2.75, -0.4], s: 0.9, p: board('PSG', 2, 'ROMA', 2, K.psg, K.roma, 'ab') },
      { type: 'player', pos: [-0.8, 0, 1.2], rot: [0, 0.6, 0], s: 0.85, p: { kit: 'psg', pose: 'sad' } },
      { type: 'player', pos: [0.8, 0, 1.2], rot: [0, -0.5, 0], s: 0.85, p: { ...SOULE, pose: 'idle' }, out: 'argentino' },
      { type: 'player', pos: [0.8, 0, 1.2], rot: [0, -0.5, 0], s: 0.85, at: 'argentino', enter: 'none', p: { ...SOULE, pose: 'cheer' } },
      { type: 'ball', pos: [0, 0.17, 1.7], p: { spin: 0.6 } },
      name('ARGENTINO', [0.8, 1.66, 1.2], 'argentino', '#6cc4ff'),
      { type: 'ring', pos: [0.8, 0.07, 1.2], at: 'goles', p: { r: 0.6, color: C.gold } },
    ],
    overlays: [{ type: 'pill', text: 'PARÍS · MIÉRCOLES 25 NOV', at: 0.1, out: 'goles' }, { type: 'pill', text: 'EN LOS 2 GOLES DE LA ROMA', at: 'goles' }] },
  // 2. venía de ganar los cuatro
  { id: 'b02', set: 'void', cam: { from: [-0.7, 2.4, 8.2], to: [0.3, 2.2, 7.3], look: [0, 1.5, 0], fov: 44 }, keywords: ['cuatro', 'ganar'],
    actors: [
      ...[0, 1, 2, 3].map((i) => ({ type: 'label', pos: [-0.75 + (i % 2) * 1.5, 2.75 - Math.floor(i / 2) * 0.85, 0] as V, ...(i === 0 ? {} : { at: 0.3 + i * 0.5 }),
        p: { text: 'GANÓ', sub: 'FECHA ' + (i + 1), w: 1.35, h: 0.72, bg: '#0d2b18', border: C.green, color: C.green, size: 0.42, weight: 900, subColor: '#fff' } })),
      { type: 'player', pos: [0, 0, 0.6], s: 0.8, p: { kit: 'psg', pose: 'fist' } },
      { type: 'ball', pos: [0.55, 0.17, 0.9], p: { spin: 0.5 } },
    ],
    overlays: [{ type: 'pill', text: 'PSG: 4 DE 4', at: 'cuatro' }] },
  // 3. Soulé se la sirvió a Hermoso
  { id: 'b03', cam: { from: [-0.9, 3.0, 7.6], to: [-0.2, 2.7, 6.7], look: [0, 1.0, -0.8], fov: 46 }, keywords: ['Soulé', 'Hermoso', 'Uno', 'cero'],
    actors: [
      { type: 'pitch', pos: [0, 0, 0.5], p: { w: 8, d: 7, box: -3, bands: 5 } },
      { type: 'goal', pos: [0, 0, -2.6], p: { w: 3.0, h: 1.5 } },
      { type: 'stands', pos: [0, 0, -4.2], p: { w: 10, rows: 5, seed: 6 } },
      { type: 'player', pos: [0, 0, -2.3], s: 0.9, p: { kit: 'gk', pose: 'shrug' } },
      { type: 'player', pos: [-0.75, 0, 0.7], rot: [0, 2.3, 0], s: 0.9, p: { ...SOULE, pose: 'run' }, out: 'Hermoso' },
      { type: 'player', pos: [-0.75, 0, 0.7], rot: [0, 2.3, 0], s: 0.9, at: 'Hermoso', enter: 'none', p: { ...SOULE, pose: 'point' } },
      { type: 'player', pos: [0.75, 0, -0.5], rot: [0, PI, 0], s: 0.95, p: { kit: 'roma', pose: 'run', phase: 2 }, out: 'Uno' },
      { type: 'player', pos: [0.75, 0, -0.5], rot: [0, 0, 0], s: 0.95, at: 'Uno', enter: 'none', p: { kit: 'roma', pose: 'cheer' } },
      { type: 'ball', pos: [-0.5, 0.17, 0.4], p: { spin: 8 }, out: 'Hermoso', move: { to: [0.6, 0.17, -0.75], at: 'sirvió', dur: 0.5 } },
      { type: 'ball', pos: [0.6, 0.17, -0.75], at: 'Hermoso', enter: 'none', p: { spin: 10 }, move: { to: [-0.9, 0.7, -3.3], at: 'Hermoso', dur: 0.45 } },
      name('SOULÉ', [-0.75, 1.8, 0.7], 0.1, '#6cc4ff', '#15102b', 1.0),
      name('HERMOSO', [0.75, 1.95, -0.5], 'Hermoso', '#f4f1ff', '#15102b', 1.15),
    ],
    overlays: [{ type: 'pill', text: 'PASE DE SOULÉ', at: 'sirvió', out: 'Uno' }, { type: 'big', text: 'ROMA 1-0', sub: 'gol de Hermoso · pase de Soulé', at: 'Uno', size: 104 }] },
  // 4. París lo dio vuelta
  { id: 'b04', set: 'void', cam: { from: [0.7, 2.4, 8.4], to: [-0.2, 2.2, 7.5], look: [0, 1.55, 0], fov: 44 }, keywords: ['vuelta', 'Zabarnyi', 'Dembélé'],
    actors: [
      { type: 'score', pos: [0, 2.75, 0], s: 0.9, p: board('PSG', 0, 'ROMA', 1, K.psg, K.roma, 'b'), out: 'Zabarnyi' },
      { type: 'score', pos: [0, 2.75, 0], s: 0.9, at: 'Zabarnyi', enter: 'none', p: board('PSG', 1, 'ROMA', 1, K.psg, K.roma, 'a'), out: 'penal' },
      { type: 'score', pos: [0, 2.75, 0], s: 0.9, at: 'penal', enter: 'none', p: board('PSG', 2, 'ROMA', 1, K.psg, K.roma, 'a') },
      { type: 'player', pos: [-0.8, 0, 0.8], s: 0.85, p: { kit: 'psg', pose: 'idle' }, out: 'Zabarnyi' },
      { type: 'player', pos: [-0.8, 0, 0.8], s: 0.85, at: 'Zabarnyi', enter: 'none', p: { kit: 'psg', pose: 'cheer' } },
      { type: 'player', pos: [0.8, 0, 0.8], s: 0.85, p: { kit: 'psg', pose: 'idle', hair: '#3a2a1a', skin: '#8a5a3c', phase: 2 }, out: 'penal' },
      { type: 'player', pos: [0.8, 0, 0.8], s: 0.85, at: 'penal', enter: 'none', p: { kit: 'psg', pose: 'cheer', hair: '#3a2a1a', skin: '#8a5a3c', phase: 2 } },
      name('ZABARNYI', [-0.8, 1.72, 0.8], 'Zabarnyi', '#f4f1ff', '#15102b', 1.3),
      name('DEMBÉLÉ', [0.8, 1.72, 0.8], 'Dembélé', '#f4f1ff', '#15102b', 1.3),
      { type: 'ball', pos: [0, 0.17, 1.4], p: { spin: 1 } },
    ],
    overlays: [{ type: 'pill', text: 'PSG LO DIO VUELTA: 2-1', at: 'penal' }] },
  // 5. Dybala, remate de Soulé, mano, penal, Malen 78
  { id: 'b05', cam: { from: [0.9, 3.1, 7.8], to: [0.2, 2.8, 6.9], look: [0, 1.0, -0.8], fov: 46 }, keywords: ['Dybala', 'mano', 'penal', '78'],
    actors: [
      { type: 'pitch', pos: [0, 0, 0.5], p: { w: 8, d: 7, box: -3, bands: 5 } },
      { type: 'goal', pos: [0, 0, -2.6], p: { w: 3.0, h: 1.5 } },
      { type: 'stands', pos: [0, 0, -4.2], p: { w: 10, rows: 5, seed: 9 } },
      { type: 'player', pos: [0.6, 0, -2.3], s: 0.9, p: { kit: 'gk', pose: 'idle' } },
      { type: 'player', pos: [0.85, 0, 0.9], rot: [0, -2.5, 0], s: 0.85, p: { kit: 'roma', pose: 'point', hair: '#3a2a1a' } },
      name('DYBALA', [0.85, 1.7, 0.9], 0.15, '#6cc4ff', '#15102b', 1.05),
      { type: 'player', pos: [-0.8, 0, 0.6], rot: [0, 2.6, 0], s: 0.85, p: { ...SOULE, pose: 'run' } },
      name('SOULÉ', [-0.8, 1.7, 0.6], 'remate', '#6cc4ff', '#15102b', 1.0, { out: 'Malen' }),
      { type: 'player', pos: [-0.2, 0, -1.0], s: 0.9, p: { kit: 'psg', pose: 'shrug' } },
      { type: 'ball', pos: [-0.6, 0.17, 0.25], p: { spin: 9 }, out: 'Malen', move: { to: [-0.5, 0.95, -0.85], at: 'remate', dur: 0.5 } },
      { type: 'label', pos: [-0.2, 1.95, -0.9], at: 'mano', out: 'Malen', p: { text: 'MANO', w: 1.1, h: 0.42, bg: C.red, size: 0.66, weight: 900 } },
      { type: 'player', pos: [0.1, 0, -0.1], rot: [0, PI, 0], s: 0.85, at: 'Malen', p: { kit: 'roma', pose: 'run', hair: '#15102b', skin: '#8a5a3c' } },
      name('MALEN', [0.1, 2.05, -0.1], 'Malen', '#f4f1ff', '#15102b', 1.0),
      { type: 'ball', pos: [0.1, 0.17, -0.6], at: 'Malen', p: { spin: 10 }, move: { to: [-1.1, 0.6, -3.3], at: 'empató', dur: 0.4 } },
    ],
    overlays: [{ type: 'pill', text: 'MANO EN EL ÁREA: PENAL', at: 'mano', red: true, out: 'empató' }, { type: 'big', text: 'PSG 2-2 ROMA', sub: "Malen, de penal, a los 78'", at: 'empató', size: 96 }] },
  // 6. tabla: Madrid 15, PSG 13
  { id: 'b06', set: 'void', cam: { from: [-0.6, 2.4, 8.4], to: [0.3, 2.2, 7.6], look: [0, 1.55, 0], fov: 44 }, keywords: ['Real', 'Madrid', '15', '13'],
    actors: [
      { type: 'label', pos: [0, 2.95, 0], p: { text: 'TABLA · FECHA 5', w: 2.9, h: 0.4, bg: '#15102b', border: C.cyan, size: 0.5 } },
      { type: 'label', pos: [0, 2.3, 0.1], at: 'Real', p: { text: '1°  REAL MADRID  15', w: 3.05, h: 0.6, bg: C.gold, color: '#15102b', size: 0.5, weight: 900 } },
      { type: 'label', pos: [0, 1.6, 0], p: { text: '?°  PSG  13', w: 2.9, h: 0.52, bg: '#2d1a6e', color: '#c9c4de', size: 0.56, weight: 900 }, out: 'París' },
      { type: 'label', pos: [0, 1.6, 0], at: 'París', p: { text: '2°  PSG  13', w: 2.9, h: 0.52, bg: K.psg, border: '#f4f1ff', size: 0.56, weight: 900 } },
      { type: 'player', pos: [-0.85, 0, 0.9], rot: [0, 0.4, 0], s: 0.62, at: 'Real', p: { kit: 'madrid', pose: 'cheer' } },
      { type: 'player', pos: [0.85, 0, 0.9], rot: [0, -0.4, 0], s: 0.62, p: { kit: 'psg', pose: 'sad' } },
    ],
    overlays: [{ type: 'pill', text: 'REAL MADRID, SOLO EN LA PUNTA', at: 'punta', out: 'París' }, { type: 'pill', text: 'PSG, SEGUNDO CON 13', at: 'segundo' }] },
  // 7. Lille 2, Bayern 1
  { id: 'b07', cam: { from: [0.9, 2.5, 8.9], to: [0.0, 2.2, 7.9], look: [0, 1.6, 0], fov: 44 }, keywords: ['sorpresa', 'Lille', 'Bayern', 'tres', 'contra'],
    actors: [
      { type: 'pitch', pos: [0, 0, 1], p: { w: 9, d: 7, bands: 6 } },
      { type: 'stands', pos: [0, 0, -3.2], p: { w: 11, rows: 6, seed: 12, cheer: 1.5 } },
      { type: 'score', pos: [0, 2.75, -0.4], s: 0.9, p: board('LILLE', 0, 'BAYERN', 1, K.lille, K.bayern, 'b'), out: 'Lille' },
      { type: 'score', pos: [0, 2.75, -0.4], s: 0.9, at: 'Lille', enter: 'none', p: board('LILLE', 2, 'BAYERN', 1, K.lille, K.bayern, 'a') },
      { type: 'player', pos: [-0.85, 0, 1.2], rot: [0, 0.4, 0], s: 0.85, p: { kit: 'lille', pose: 'idle' }, out: 'Lille' },
      { type: 'player', pos: [-0.85, 0, 1.2], rot: [0, 0.4, 0], s: 0.85, at: 'Lille', enter: 'none', p: { kit: 'lille', pose: 'cheer' } },
      { type: 'player', pos: [0.85, 0, 1.2], rot: [0, -0.4, 0], s: 0.85, p: { kit: 'bayern', pose: 'idle', hair: '#c98a3a', skin: '#f2c39b' }, out: 'contra' },
      { type: 'player', pos: [0.85, 0, 1.2], rot: [0, -0.4, 0], s: 0.85, at: 'contra', enter: 'none', p: { kit: 'bayern', pose: 'sad', hair: '#c98a3a', skin: '#f2c39b' } },
      { type: 'label', pos: [-0.8, 1.72, 1.3], at: 'tres', p: { text: "62'  1-1", w: 1.3, h: 0.4, bg: '#2d1a6e', border: C.cyan, size: 0.6, weight: 900 } },
      { type: 'label', pos: [0.8, 1.72, 1.3], at: 'minutos', p: { text: "65'  2-1", w: 1.3, h: 0.4, bg: C.gold, color: '#15102b', size: 0.6, weight: 900 } },
      { type: 'ball', pos: [0.3, 0.17, 1.7], p: { spin: 2 } },
    ],
    overlays: [{ type: 'pill', text: 'LA SORPRESA DE LA NOCHE', at: 0.1, out: 'tres' }, { type: 'pill', text: 'GOL EN CONTRA DEL BAYERN', at: 'contra', red: true }] },
  // 8. Inter 2, Stuttgart 0. Lautaro
  { id: 'b08', set: 'void', cam: { from: [-0.9, 2.6, 8.6], to: [-0.1, 2.3, 7.6], look: [0, 1.5, 0], fov: 44 }, keywords: ['Inter', 'Lautaro', 'Martínez', '74'],
    actors: [
      { type: 'pitch', pos: [0, 0, 0.6], p: { w: 8, d: 6, bands: 4 } },
      { type: 'score', pos: [0, 2.8, -0.6], s: 0.9, p: board('INTER', 2, 'STUTTGART', 0, K.inter, '#f4f1ff', 'a') },
      { type: 'bench', pos: [1.05, 0, -0.2], rot: [0, -0.4, 0], s: 0.85 },
      { type: 'player', pos: [1.05, 0, 0.1], rot: [0, -0.4, 0], s: 0.85, p: { ...LAUTARO, pose: 'idle' }, out: 'entró' },
      { type: 'player', pos: [1.05, 0, 0.1], rot: [0, -1.2, 0], s: 0.85, at: 'entró', enter: 'none', p: { ...LAUTARO, pose: 'run' }, out: 'marcó', move: { to: [-0.5, 0, 1.2], at: 'entró', dur: 1.2 } },
      { type: 'player', pos: [-0.5, 0, 1.2], rot: [0, 0.2, 0], s: 0.85, at: 'marcó', enter: 'none', p: { ...LAUTARO, pose: 'cheer' } },
      { type: 'ball', pos: [-0.9, 0.17, 1.6], p: { spin: 2 } },
      name('LAUTARO', [-0.5, 1.75, 1.2], 'marcó', '#6cc4ff', '#15102b', 1.2),
    ],
    overlays: [{ type: 'pill', text: 'MILÁN · INTER 2-0 STUTTGART', at: 0.1, out: 'Lautaro' }, { type: 'plate', name: 'Lautaro Martínez', role: 'entró desde el banco', at: 'Lautaro', out: 'marcó', y: 77 }, { type: 'pill', text: "GOL DE LAUTARO A LOS 74'", at: 'marcó' }] },
  // 9. Atlético 2, Viking 0. Julián
  { id: 'b09', cam: { from: [0.8, 2.5, 8.8], to: [0.0, 2.2, 7.8], look: [0, 1.6, 0], fov: 44 }, keywords: ['Atlético', 'Viking', 'Julián', 'Álvarez'],
    actors: [
      { type: 'pitch', pos: [0, 0, 0.5], p: { w: 9, d: 7, box: -3, bands: 5 } },
      { type: 'goal', pos: [0, 0, -2.6], p: { w: 3.4, h: 1.5 } },
      { type: 'score', pos: [0, 2.8, -0.6], s: 0.9, p: board('ATLÉTICO', 2, 'VIKING', 0, K.atl, K.vik, 'a') },
      { type: 'player', pos: [-0.2, 0, 1.2], rot: [0, PI, 0], s: 0.9, p: { ...JULIAN, pose: 'run' }, out: 'gol' },
      { type: 'player', pos: [-0.2, 0, 1.2], s: 0.9, at: 'gol', enter: 'none', p: { ...JULIAN, pose: 'cheer' } },
      { type: 'ball', pos: [-0.2, 0.17, 0.7], p: { spin: 8 }, move: { to: [1.0, 0.8, -3.2], at: 'volvió', dur: 0.6 } },
      { type: 'player', pos: [-0.9, 0, -2.3], s: 0.9, p: { kit: 'gk', pose: 'shrug' } },
      name('JULIÁN', [-0.2, 1.85, 1.2], 'Julián', '#6cc4ff', '#15102b', 1.1),
    ],
    overlays: [{ type: 'pill', text: 'MADRID · ATLÉTICO 2-0 VIKING', at: 0.1, out: 'También' }, { type: 'pill', text: 'GOL DE JULIÁN ÁLVAREZ', at: 'gol' }] },
  // 10. Liverpool 3-0 Brujas. Mac Allister 73
  { id: 'b10', set: 'void', cam: { from: [-0.8, 2.5, 8.6], to: [0.0, 2.2, 7.7], look: [0, 1.55, 0], fov: 44 }, keywords: ['Liverpool', 'tres', 'Mac Allister', '73'],
    actors: [
      { type: 'score', pos: [0, 2.75, 0], s: 0.9, p: board('BRUJAS', 0, 'LIVERPOOL', 3, K.bru, K.liv, 'b') },
      { type: 'player', pos: [1.0, 0, 0.2], rot: [0, -0.4, 0], s: 0.75, p: { kit: 'brujas', pose: 'sad' } },
      { type: 'player', pos: [-1.7, 0, 0.9], rot: [0, 1.2, 0], s: 0.85, at: 'Mac', enter: 'none', p: { kit: 'liverpool', pose: 'run', hair: '#b8642a', skin: '#f2c39b' }, move: { to: [-0.55, 0, 0.9], at: 'Mac', dur: 1.0 } },
      { type: 'label', pos: [-0.5, 1.72, 0.9], at: 'entró', p: { text: 'MAC ALLISTER', w: 1.5, h: 0.36, bg: '#6cc4ff', color: '#15102b', size: 0.62, weight: 900 } },
      { type: 'label', pos: [0.2, 0.9, 1.4], at: '73', p: { text: "73'", w: 0.8, h: 0.5, bg: '#0d2b18', border: C.green, color: C.green, size: 0.7, weight: 900 } },
      { type: 'ball', pos: [0.3, 0.17, 1.6], p: { spin: 1 } },
    ],
    overlays: [{ type: 'pill', text: 'BRUJAS 0-3 LIVERPOOL', at: 'tres', out: 'Mac' }, { type: 'pill', text: "MAC ALLISTER ENTRÓ A LOS 73'", at: 'entró' }] },
  // 11. Barcelona 4-1
  { id: 'b11', cam: { from: [0.8, 2.5, 8.8], to: [0.0, 2.2, 7.9], look: [0, 1.6, 0], fov: 44 }, keywords: ['Barcelona', 'cuatro', 'Azerbaiyán'],
    actors: [
      { type: 'pitch', pos: [0, 0, 1], p: { w: 9, d: 7, bands: 6 } },
      { type: 'stands', pos: [0, 0, -3.2], p: { w: 11, rows: 6, seed: 21 } },
      { type: 'score', pos: [0, 2.75, -0.4], s: 0.9, p: board('SABAH', 1, 'BARCELONA', 4, K.sab, K.bar, 'b') },
      { type: 'player', pos: [0, 0, 1.3], s: 0.85, p: { kit: 'barca', pose: 'cheer' } },
      ...[0, 1, 2, 3].map((i) => ({ type: 'ball', pos: [-1.05 + i * 0.7, 1.75, 0.6] as V, s: 1.5, ...(i === 0 ? {} : { at: 0.5 + i * 0.4 }), bob: 0.04, p: { spin: 1.5 } })),
    ],
    overlays: [{ type: 'pill', text: 'BAKÚ · SABAH 1-4 BARCELONA', at: 'goleó' }] },
  // 12. ¿quién fue el argentino de la noche?
  { id: 'b12', set: 'void', cam: { from: [0.0, 2.5, 9.0], to: [0.0, 2.2, 7.6], look: [0, 1.3, 0], fov: 44 }, keywords: ['argentino', 'noche'],
    actors: [
      { type: 'ring', pos: [0, 0.03, 0.4], p: { r: 1.6, color: C.gold } },
      { type: 'player', pos: [-1.05, 0, 0.4], rot: [0, 0.3, 0], s: 0.9, p: { ...SOULE, pose: 'idle' } },
      { type: 'player', pos: [0, 0, 0.4], s: 0.9, p: { ...LAUTARO, pose: 'idle', phase: 1 } },
      { type: 'player', pos: [1.05, 0, 0.4], rot: [0, -0.3, 0], s: 0.9, p: { ...JULIAN, pose: 'idle', phase: 2 } },
      ...[-1.05, 0, 1.05].map((x, i) => ({ type: 'label', pos: [x, 2.05, 0.4] as V, at: 0.3 + i * 0.4, bob: 0.03, p: { text: '?', w: 0.5, h: 0.5, bg: C.gold, color: '#15102b', size: 0.8, weight: 900 } })),
      { type: 'cup', pos: [0, 2.5, -0.5], s: 0.9, at: 'noche', bob: 0.04 },
    ],
    overlays: [{ type: 'big', text: '¿QUIÉN FUE?', sub: 'el argentino de la noche', at: 'quién', size: 92 }] },
  // 13. ¿Soulé, Lautaro o Julián?
  { id: 'b13', set: 'room', cam: { from: [-0.6, 2.3, 7.4], to: [0.3, 2.1, 6.6], look: [0, 1.35, 0], fov: 44 }, keywords: ['Soulé', 'Lautaro', 'Julián', 'nombre'],
    actors: [
      { type: 'player', pos: [-1.0, 0, 0], rot: [0, 0.3, 0], s: 0.9, p: { ...SOULE, pose: 'idle' }, out: 'Soulé' },
      { type: 'player', pos: [-1.0, 0, 0], rot: [0, 0.3, 0], s: 0.9, at: 'Soulé', enter: 'none', p: { ...SOULE, pose: 'cheer' } },
      { type: 'player', pos: [0, 0, 0], s: 0.9, p: { ...LAUTARO, pose: 'idle', phase: 1 }, out: 'Lautaro' },
      { type: 'player', pos: [0, 0, 0], s: 0.9, at: 'Lautaro', enter: 'none', p: { ...LAUTARO, pose: 'cheer', phase: 1 } },
      { type: 'player', pos: [1.0, 0, 0], rot: [0, -0.3, 0], s: 0.9, p: { ...JULIAN, pose: 'idle', phase: 2 }, out: 'Julián' },
      { type: 'player', pos: [1.0, 0, 0], rot: [0, -0.3, 0], s: 0.9, at: 'Julián', enter: 'none', p: { ...JULIAN, pose: 'cheer', phase: 2 } },
      { type: 'label', pos: [-1.0, 2.0, 0], at: 'Soulé', p: { text: 'SOULÉ', sub: 'EN LOS 2 GOLES', w: 0.95, h: 0.56, bg: '#6cc4ff', color: '#15102b', size: 0.36, weight: 900 } },
      { type: 'label', pos: [0, 2.45, 0], at: 'Lautaro', p: { text: 'LAUTARO', sub: 'GOL', w: 0.95, h: 0.56, bg: '#6cc4ff', color: '#15102b', size: 0.36, weight: 900 } },
      { type: 'label', pos: [1.0, 2.0, 0], at: 'Julián', p: { text: 'JULIÁN', sub: 'GOL', w: 0.95, h: 0.56, bg: '#6cc4ff', color: '#15102b', size: 0.36, weight: 900 } },
    ],
    overlays: [{ type: 'big', text: 'COMENTÁ UN NOMBRE', sub: '¿Soulé, Lautaro o Julián?', at: 'Respondé', size: 64 }] },
  // 14. seguime: cada fecha
  { id: 'b14', cam: { from: [0.7, 2.4, 8.2], to: [0.0, 2.2, 7.3], look: [0, 1.6, 0], fov: 44 }, keywords: ['Seguime', 'fecha', 'resultados', 'minuto'],
    actors: [
      { type: 'ring', pos: [0, 0.03, 0.6], p: { r: 1.2, color: C.cyan } },
      { type: 'cup', pos: [0, 0, 0.8], s: 1.5 },
      { type: 'label', pos: [0, 3.0, 0], p: { text: 'PSG 2-2 ROMA', w: 2.5, h: 0.42, bg: '#2d1a6e', border: C.cyan, size: 0.6, weight: 900 } },
      { type: 'label', pos: [0, 2.5, 0], at: 0.5, p: { text: 'LILLE 2-1 BAYERN', w: 2.5, h: 0.42, bg: '#2d1a6e', border: C.cyan, size: 0.6, weight: 900 } },
      { type: 'label', pos: [0, 2.0, 0], at: 1.0, p: { text: 'INTER 2-0 STUTTGART', w: 2.5, h: 0.42, bg: '#2d1a6e', border: C.cyan, size: 0.6, weight: 900 } },
      { type: 'ball', pos: [-0.9, 0.17, 1.2], p: { spin: 1 } },
      { type: 'ball', pos: [0.9, 0.17, 1.2], p: { spin: -1 } },
    ],
    overlays: [{ type: 'big', text: 'SEGUIME', sub: 'cada fecha de Champions, los resultados', at: 'cada', size: 110 }] },
];
