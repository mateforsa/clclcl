import type { BeatSpec } from '../../src/Beat';
import { C } from '../../src/kit/math';

const JEFA = { shirt: C.magenta, pants: '#2a2350', hair: '#7a3b1a', skin: '#f2c39b' };   // jefa de publicación (genérica, sin cara)
const EMPRESA = { shirt: C.gold, hair: '#15102b', skin: '#f2c39b' };                     // "la empresa" (genérico)
const AFIL = { shirt: C.cyan, hair: '#3a2a1a', skin: '#c98d62' };                         // afiliado (genérico)
const NOMBRE = (text: string, color = C.gold) => ({ text, w: 1.3, h: 0.36, bg: '#15102b', color, size: 0.62, weight: 900 });
const JUEGO = { label: '6', color: '#c2307e', glow: true };

export const BEATS: BeatSpec[] = [
  // 1. la cita, sobre la urna
  { id: 'b01', set: 'void', cam: { from: [0.8, 2.3, 6.4], to: [-0.2, 2.0, 5.5], look: [0, 1.1, 0], fov: 44 }, keywords: ['sindicato.»'],
    actors: [
      { type: 'ring', pos: [0, 0.03, 0], p: { r: 1.0, color: C.cyan } },
      { type: 'urna', pos: [0, 0, 0], p: { drops: 6, every: 0.45, delay: 0.1, fill: 0.2, fillTo: 0.45, fillDur: 2.8 } },
      { type: 'person', pos: [-1.15, 0, 0.5], rot: [0, 0.6, 0], s: 0.85, at: 'van', p: { ...AFIL, pose: 'hold' } },
      { type: 'person', pos: [1.15, 0, 0.5], rot: [0, -0.6, 0], s: 0.85, at: 'tener', p: { shirt: '#8a6bff', hair: '#c98a3a', pose: 'hold' } },
    ],
    overlays: [
      { type: 'tag', text: '«SI QUIEREN UN SINDICATO,', at: 0, x: 50, y: 69, color: '#15102b', size: 54 },
      { type: 'tag', text: 'VAN A TENER UN SINDICATO»', at: 0, x: 50, y: 74.5, color: '#15102b', size: 54 },
    ] },
  // 2. quién lo dijo
  { id: 'b02', set: 'room', cam: { from: [-0.7, 2.3, 6.6], to: [0.3, 2.1, 5.7], look: [0, 1.3, -0.4], fov: 46, shift: 0.06 }, keywords: ['jefa', 'Rockstar', 'GTA 6.'],
    actors: [
      { type: 'ring', pos: [-0.55, 0.03, -0.2], p: { r: 0.6, color: C.magenta } },
      { type: 'person', pos: [-0.55, 0, -0.2], rot: [0, 0.35, 0], p: { ...JEFA, pose: 'idle' }, out: 'publicación' },
      { type: 'person', pos: [-0.55, 0, -0.2], rot: [0, 0.35, 0], at: 'publicación', enter: 'none', p: { ...JEFA, pose: 'point' } },
      { type: 'label', pos: [0.85, 2.05, -0.6], at: 'Rockstar', p: NOMBRE('ROCKSTAR') },
      { type: 'gamebox', pos: [0.85, 1.05, -0.4], s: 0.75, at: 'GTA', bob: 0.04, p: JUEGO },
    ],
    overlays: [
      { type: 'big', text: 'JENNIFER KOLBE', sub: 'JEFA DE PUBLICACIÓN DE ROCKSTAR', at: 'jefa', size: 78 },
      { type: 'pill', text: 'A BLOOMBERG', at: 'Rockstar' },
    ] },
  // 3. el jueves terminaron de votar (fila ante la urna)
  { id: 'b03', set: 'void', cam: { from: [1.4, 2.6, 8.6], to: [0.3, 2.3, 7.4], look: [0, 1.2, 0], fov: 46 }, keywords: ['jueves', 'Reino', 'votar.'],
    actors: [
      { type: 'ring', pos: [0.9, 0.03, -0.3], p: { r: 0.9, color: C.cyan } },
      { type: 'urna', pos: [0.9, 0, -0.3], s: 0.85, p: { drops: 6, every: 0.5, delay: 0.5, fill: 0.5, fillTo: 0.8, fillDur: 3 } },
      { type: 'crowd', pos: [-0.9, 0, 0.6], at: 'empleados', p: { n: 8, area: [1.4, 2.4], seed: 4, sc: 0.75, face: 1.2, stagger: 0.06 } },
      { type: 'calendar', pos: [-1.0, 2.0, -1.2], rot: [0, 0.25, 0], s: 0.55, p: { top: 'JUEVES', big: '26/11', color: C.blue } },
    ],
    overlays: [{ type: 'tag', text: 'REINO UNIDO · VOTACIÓN DEL 12 AL 26/11', at: 'Reino', x: 50, y: 79, color: 'rgba(20,10,46,.92)', size: 40 }] },
  // 4. tres de cada cuatro: no
  { id: 'b04', set: 'room', cam: { from: [-0.6, 2.2, 7.2], to: [0.3, 2.0, 6.3], look: [0, 1.0, 0], fov: 44 }, keywords: ['tres', 'cuatro', 'no.'],
    actors: [
      ...[0, 1, 2, 3].map((i) => ({ type: 'person', pos: [-1.2 + i * 0.8, 0, 0] as any, s: 0.8, at: i < 3 ? 'tres' : 'cuatro', p: { shirt: i < 3 ? '#8a6bff' : C.cyan, hair: ['#3a2a1a', '#15102b', '#c98a3a', '#7a3b1a'][i], pose: 'idle', phase: i } })),
      ...[0, 1, 2].map((i) => ({ type: 'papeleta', pos: [-1.2 + i * 0.8, 1.75, 0.2] as any, at: 'no', p: { mark: 'no', w: 0.55 } })),
      { type: 'papeleta', pos: [1.2, 1.75, 0.2], at: 'no', p: { mark: 'si', w: 0.55 } },
      ...[0, 1, 2].map((i) => ({ type: 'ring', pos: [-1.2 + i * 0.8, 0.03, 0] as any, at: 'no', p: { r: 0.32, color: C.red } })),
    ],
    overlays: [{ type: 'big', text: '3 DE CADA 4: NO', at: 'no', red: true, size: 96 }] },
  // 5. 1.163 contra 381
  { id: 'b05', set: 'void', cam: { from: [0.8, 2.6, 8.4], to: [-0.3, 2.3, 7.4], look: [0, 1.3, 0], fov: 46 }, keywords: ['1.163', '381'],
    actors: [
      { type: 'bars', pos: [-0.7, 0, 0], p: { vals: [2.4], colors: [C.red], w: 0.9, dur: 1.2 } },
      { type: 'label', pos: [-0.7, 0.35, 0.5], p: { text: 'NO: 1.163', w: 1.2, h: 0.36, bg: '#15102b', color: C.red, size: 0.62, weight: 900 } },
      { type: 'bars', pos: [0.7, 0, 0], at: '381', enter: 'none', p: { vals: [0.79], colors: [C.green], w: 0.9, dur: 0.8 } },
      { type: 'label', pos: [0.7, 0.35, 0.5], at: '381', p: { text: 'SÍ: 381', w: 1.2, h: 0.36, bg: '#15102b', color: C.green, size: 0.62, weight: 900 } },
      { type: 'papeleta', pos: [-0.7, 2.75, 0], at: 'contra', bob: 0.05, p: { mark: 'no', w: 0.6 } },
      { type: 'papeleta', pos: [0.7, 1.2, 0], at: 'favor', bob: 0.05, p: { mark: 'si', w: 0.6 } },
    ],
    overlays: [{ type: 'pill', text: 'SEGÚN IGN', at: 'favor' }] },
  // 6. votó más del 93%, en cinco oficinas
  { id: 'b06', set: 'room', cam: { from: [-0.9, 2.8, 8.2], to: [0.3, 2.5, 7.2], look: [0, 1.1, 0], fov: 46 }, keywords: ['93%,', 'cinco'],
    actors: [
      { type: 'progress', pos: [0, 2.3, 0], p: { w: 2.6, h: 0.3, dur: 1.4, to: 0.93, color: C.cyan } },
      ...[0, 1, 2, 3, 4].map((i) => ({ type: 'oficina', pos: [-1.3 + i * 0.65, 0, -0.2 + (i % 2) * 0.5] as any, at: 'cinco', enter: 'grow' as const, p: { h: 0.9 + (i % 3) * 0.3, color: ['#2d1a6e', '#241659', '#3a2a8a'][i % 3] } })),
      ...[0, 1, 2, 3, 4].map((i) => ({ type: 'ring', pos: [-1.3 + i * 0.65, 0.03, -0.2 + (i % 2) * 0.5] as any, at: 'oficinas', p: { r: 0.3, color: C.gold } })),
    ],
    overlays: [
      { type: 'big', text: '', count: { to: 93, pre: 'VOTÓ MÁS DEL ', post: '%' }, at: '93', size: 76 },
      { type: 'tag', text: 'EDIMBURGO · LEEDS · LINCOLN · DUNDEE · LONDRES', at: 'oficinas', x: 50, y: 80, color: 'rgba(20,10,46,.92)', size: 34 },
    ] },
  // 7. en el medio salió el juego: +30 millones
  { id: 'b07', set: 'void', cam: { from: [0.9, 2.7, 9.0], to: [-0.4, 2.3, 7.8], look: [0, 1.6, 0], fov: 46 }, keywords: ['juego,', '30 millones'],
    actors: [
      { type: 'ring', pos: [-0.75, 0.03, 0], at: 'salió', p: { r: 0.7, color: C.magenta } },
      { type: 'gamebox', pos: [-0.75, 1.5, 0], s: 0.95, at: 'salió', bob: 0.05, p: JUEGO },
      { type: 'urna', pos: [1.0, 0, -1.4], s: 0.7, p: { fill: 0.6 } },
      { type: 'coins', pos: [0.75, 0, 0.2], s: 0.85, at: 'vendió', enter: 'none', p: { n: 26, dur: 1.8, r: 0.4 } },
    ],
    overlays: [{ type: 'pill', text: 'GTA 6 · 19/11', at: 'juego', out: '30' }, { type: 'big', text: '+30 MILLONES', sub: 'EL PRIMER DÍA', at: '30', size: 104 }] },
  // 8. con el sí, iban a negociar
  { id: 'b08', set: 'room', cam: { from: [0.7, 2.6, 6.8], to: [-0.3, 2.3, 5.9], look: [0, 1.1, -0.5], fov: 46, shift: 0.06 }, keywords: ['sí,', 'negociar', 'inteligencia'],
    actors: [
      { type: 'mesa', pos: [0, 0, -0.5] },
      { type: 'silla', pos: [-1.25, 0, -0.5], rot: [0, Math.PI / 2, 0] },
      { type: 'silla', pos: [1.25, 0, -0.5], rot: [0, -Math.PI / 2, 0], p: { color: '#8a5a3a' } },
      { type: 'person', pos: [-1.25, 0, -0.5], rot: [0, Math.PI / 2, 0], s: 0.9, p: { ...AFIL, pose: 'sit' } },
      { type: 'person', pos: [1.25, 0, -0.5], rot: [0, -Math.PI / 2, 0], s: 0.9, at: 'negociar', p: { ...EMPRESA, pose: 'sit' } },
      { type: 'papeleta', pos: [0, 2.2, -0.5], at: 'sí', out: 'horas', p: { mark: 'si', w: 0.8 } },
      { type: 'label', pos: [-0.5, 1.0, -0.25], rot: [-0.5, 0, 0], at: 'horas', p: { text: 'HORAS EXTRA', w: 0.9, h: 0.3, bg: '#f4f1ff', color: '#1a1030', size: 0.5, weight: 900 } },
      { type: 'label', pos: [0.5, 1.0, -0.25], rot: [-0.5, 0, 0], at: 'despidos', p: { text: 'DESPIDOS', w: 0.8, h: 0.3, bg: '#f4f1ff', color: '#1a1030', size: 0.55, weight: 900 } },
      { type: 'label', pos: [0.0, 1.25, -0.8], rot: [-0.15, 0, 0], at: 'inteligencia', p: { text: 'IA', w: 0.5, h: 0.3, bg: '#f4f1ff', color: '#1a1030', size: 0.6, weight: 900 } },
    ],
    overlays: [{ type: 'pill', text: 'HORAS EXTRA · DESPIDOS · IA', at: 'negociar' }] },
  // 9. con el no, nada obliga
  { id: 'b09', set: 'void', cam: { from: [-0.8, 2.4, 7.0], to: [0.4, 2.2, 6.2], look: [0, 1.0, -0.4], fov: 46 }, keywords: ['no,', 'obliga'],
    actors: [
      { type: 'mesa', pos: [0, 0, -0.5] },
      { type: 'silla', pos: [-1.25, 0, -0.5], rot: [0, Math.PI / 2, 0] },
      { type: 'silla', pos: [1.25, 0, -0.5], rot: [0, -Math.PI / 2, 0], p: { color: '#8a5a3a' } },
      { type: 'person', pos: [-1.25, 0, -0.5], rot: [0, Math.PI / 2, 0], s: 0.9, p: { ...AFIL, pose: 'sit' } },
      { type: 'person', pos: [1.25, 0, -0.5], rot: [0, -Math.PI / 2, 0], s: 0.9, p: { ...EMPRESA, pose: 'sit' }, out: 'empresa' },
      { type: 'person', pos: [1.25, 0, -0.5], rot: [0, -2.4, 0], s: 0.9, at: 'empresa', enter: 'none', p: { ...EMPRESA, pose: 'walk' }, move: { to: [1.5, 0, -2.6], at: 'empresa', dur: 1.4 } },
      { type: 'papeleta', pos: [0, 2.0, -0.5], at: 'no', p: { mark: 'no', w: 0.8 } },
      { type: 'cross', pos: [1.25, 1.2, -0.1], at: 'sentarse', p: { size: 0.55 } },
    ],
    overlays: [{ type: 'pill', text: 'SIN OBLIGACIÓN DE NEGOCIAR', at: 'obliga', red: true }] },
  // 10. un año antes (salto de fecha)
  { id: 'b10', set: 'room', cam: { from: [0.6, 2.4, 7.6], to: [-0.3, 2.2, 6.8], look: [0, 1.5, 0], fov: 44 }, keywords: ['pelea', 'antes.'],
    actors: [
      { type: 'calendar', pos: [0.5, 1.6, 0], rot: [0, -0.15, 0], s: 0.85, out: 'año', p: { top: 'NOVIEMBRE', big: '2026', color: C.blue } },
      { type: 'calendar', pos: [0.5, 1.6, 0], rot: [0, -0.15, 0], s: 0.85, at: 'año', p: { top: 'OCTUBRE', big: '2025', color: C.red } },
      { type: 'arrow', pos: [-0.35, 1.6, 0.3], rot: [0, 0, Math.PI / 2], at: 'empezó', enter: 'none', p: { len: 0.9, color: C.gold, dur: 0.5 } },
      { type: 'person', pos: [-1.1, 0, 0.4], rot: [0, 0.5, 0], s: 0.85, p: { ...AFIL, pose: 'shrug' } },
      { type: 'ring', pos: [-1.1, 0.03, 0.4], p: { r: 0.5, color: C.red } },
    ],
    overlays: [{ type: 'pill', text: 'UN AÑO ANTES', at: 'antes', red: true }] },
  // 11. octubre 2025: 31 despidos
  { id: 'b11', set: 'room', cam: { from: [-0.6, 2.5, 6.8], to: [0.3, 2.3, 6.0], look: [0, 1.4, -0.6], fov: 46 }, keywords: ['octubre', 'despidió', '31'],
    actors: [
      { type: 'person', pos: [-1.0, 0, -0.6], rot: [0, 0.6, 0], p: { ...EMPRESA, pose: 'point' } },
      { type: 'label', pos: [-1.0, 2.05, -0.6], at: 'Rockstar', p: NOMBRE('ROCKSTAR') },
      { type: 'calendar', pos: [1.0, 2.4, -3.0], rot: [0, -0.2, 0], s: 0.6, p: { top: 'OCTUBRE', big: '2025', color: C.red } },
      { type: 'crowd', pos: [0.5, 0, -2.4], at: '31', p: { n: 31, area: [2.4, 1.2], seed: 9, sc: 0.5, pose: 'sad', face: Math.PI * 0.0, stagger: 0.025 } },
    ],
    overlays: [
      { type: 'pill', text: 'OCTUBRE 2025', at: 'octubre', out: '31' },
      { type: 'big', text: '31 DESPIDOS', sub: 'SEGÚN THE REGISTER', at: '31', red: true, size: 104 },
    ] },
  // 12. según el sindicato: un grupo privado de Discord
  { id: 'b12', set: 'void', cam: { from: [0.7, 2.3, 6.6], to: [-0.3, 2.1, 5.7], look: [0, 1.3, 0], fov: 46 }, keywords: ['sindicato', 'eligieron', 'Discord.'],
    actors: [
      { type: 'chat', pos: [0, 1.55, -0.3], at: 'grupo', p: { n: 5, every: 0.18, w: 1.7, h: 1.05 } },
      { type: 'screen', pos: [0, 1.55, -0.3], out: 'grupo', p: { kind: 'off', w: 1.7, h: 1.05 } },
      ...[0, 1, 2].map((i) => ({ type: 'person', pos: [-0.9 + i * 0.9, 0, 0.7] as any, rot: [0, Math.PI, 0] as any, s: 0.7, p: { ...AFIL, shirt: [C.cyan, '#8a6bff', C.green][i], pose: 'type', phase: i } })),
      { type: 'ring', pos: [0, 0.03, 0.7], at: 'eligieron', p: { r: 1.2, color: C.magenta } },
    ],
    overlays: [{ type: 'big', text: 'GRUPO PRIVADO DE DISCORD', sub: 'SEGÚN EL SINDICATO', at: 'Discord', size: 52 }] },
  // 13. Rockstar dice: falta grave
  { id: 'b13', set: 'room', cam: { from: [0.6, 2.3, 6.2], to: [-0.2, 2.1, 5.4], look: [0, 1.3, -0.5], fov: 46, shift: 0.06 }, keywords: ['Rockstar', 'grave.'],
    actors: [
      { type: 'person', pos: [-0.6, 0, -0.6], rot: [0, 0.4, 0], p: { ...EMPRESA, pose: 'idle' }, out: 'falta' },
      { type: 'person', pos: [-0.6, 0, -0.6], rot: [0, 0.4, 0], at: 'falta', enter: 'none', p: { ...EMPRESA, pose: 'point' } },
      { type: 'label', pos: [-0.6, 2.05, -0.6], p: NOMBRE('ROCKSTAR') },
      { type: 'label', pos: [0.6, 1.3, -0.4], rot: [0, -0.25, 0], at: 'falta', p: { text: 'FALTA GRAVE', w: 1.1, h: 0.5, bg: C.red, color: '#fff', size: 0.5, weight: 900 } },
    ],
    overlays: [{ type: 'pill', text: 'SEGÚN ROCKSTAR: FALTA GRAVE', at: 'grave' }] },
  // 14. el tribunal todavía no dio el fallo
  { id: 'b14', set: 'void', cam: { from: [-0.8, 2.5, 7.6], to: [0.3, 2.3, 6.6], look: [0, 1.3, 0], fov: 46 }, keywords: ['tribunal', 'fallo.'],
    actors: [
      { type: 'estrado', pos: [0, 0, -0.4] },
      { type: 'mazo', pos: [0.45, 1.18, -0.3], rot: [0, -0.4, 0], s: 0.7, p: { delay: 99 } },
      { type: 'label', pos: [0, 0.6, 0.0], at: 'tribunal', p: { text: 'TRIBUNAL', w: 1.3, h: 0.36, bg: '#2d1a6e', color: '#fff', size: 0.6, weight: 900 } },
      { type: 'label', pos: [-0.55, 1.7, -0.3], at: 'todavía', bob: 0.05, p: { text: '?', w: 0.6, h: 0.6, size: 0.95, color: C.gold, weight: 900 } },
    ],
    overlays: [{ type: 'pill', text: 'TRIBUNAL LABORAL · SIN FALLO', at: 'tribunal' }] },
  // 15. IWGB promete seguir organizándose
  { id: 'b15', set: 'room', cam: { from: [0.9, 2.4, 8.2], to: [-0.3, 2.2, 7.2], look: [0, 1.2, 0], fov: 46 }, keywords: ['IWGB,', 'organizándose.'],
    actors: [
      { type: 'crowd', pos: [0, 0, 0.2], p: { n: 9, area: [2.6, 1.4], seed: 12, sc: 0.8, pose: 'walk', face: Math.PI * 0.0, stagger: 0.04 } },
      { type: 'label', pos: [0, 1.75, -0.6], at: 'IWGB', p: { text: 'IWGB', w: 1.5, h: 0.5, bg: '#15102b', border: C.cyan, color: '#fff', size: 0.62, weight: 900 } },
      { type: 'ring', pos: [0, 0.03, 0.2], at: 'promete', p: { r: 1.3, color: C.cyan } },
    ],
    overlays: [{ type: 'pill', text: 'IWGB · SIGUE ORGANIZÁNDOSE', at: 'IWGB' }] },
  // 16. vuelve la urna: el equipo ya votó, falta el tribunal
  { id: 'b16', set: 'void', cam: { from: [-0.7, 2.6, 8.0], to: [0.4, 2.3, 7.0], look: [0, 1.2, 0], fov: 46 }, keywords: ['equipo', 'votó.', 'tribunal.'],
    actors: [
      { type: 'ring', pos: [-0.8, 0.03, 0], p: { r: 0.8, color: C.cyan } },
      { type: 'urna', pos: [-0.8, 0, 0], s: 0.8, p: { fill: 0.85 } },
      { type: 'urna', pos: [-0.8, 0, 0], s: 0.8, at: 'votó', enter: 'none', p: { fill: 0.85, sealed: true } },
      { type: 'estrado', pos: [0.95, 0, -0.6], s: 0.6 },
      { type: 'mazo', pos: [1.2, 0.7, -0.5], rot: [0, -0.4, 0], s: 0.5, p: { delay: 99 } },
      { type: 'label', pos: [0.95, 1.55, -0.6], at: 'Falta', bob: 0.05, p: { text: '?', w: 0.5, h: 0.5, size: 0.95, color: C.gold, weight: 900 } },
    ],
    overlays: [{ type: 'pill', text: 'EL EQUIPO VOTÓ', at: 'votó', out: 'tribunal' }, { type: 'pill', text: 'FALTA EL FALLO', at: 'tribunal', red: true }] },
  // 17. cuando salga el fallo, te lo cuento acá
  { id: 'b17', set: 'void', cam: { from: [0.6, 2.0, 6.0], to: [-0.2, 1.8, 5.2], look: [0, 0.9, -0.5], fov: 44 }, keywords: ['fallo,', 'acá.'],
    actors: [
      { type: 'ring', pos: [0, 0.03, -0.5], p: { r: 1.0, color: C.gold } },
      { type: 'mazo', pos: [-0.5, 0, -0.5], rot: [0, 0.3, 0], s: 1.4, p: { delay: 0.6, n: 1 } },
      { type: 'urna', pos: [-0.9, 0, -1.6], s: 0.6, p: { fill: 0.85, sealed: true } },
      { type: 'label', pos: [1.1, 1.3, -0.6], at: 'fallo', bob: 0.05, p: { text: '?', w: 0.55, h: 0.55, size: 0.95, color: C.gold, weight: 900 } },
    ],
    overlays: [{ type: 'big', text: 'CUANDO SALGA EL FALLO,', sub: 'TE LO CUENTO ACÁ', at: 'fallo', size: 62, y: 73 }] },
];
