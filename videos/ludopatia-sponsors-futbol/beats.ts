import type { BeatSpec } from '../../src/Beat';
import { C } from '../../src/kit/math';
import timing from './timing.json';

const PI = Math.PI;
const PANEL = 'rgba(20,10,46,.92)';
// muñecos genéricos (sin caras ni escudos)
const DIRIGENTE = { shirt: '#3b4a8a', pants: '#15102b', hair: '#3a2a1a', skin: '#e3ad80' };
const EMPRESA = { shirt: '#15102b', pants: '#15102b', hair: '#7a3b1a', skin: '#f2c39b' };
const FUNCIONARIO = { shirt: '#2a2350', pants: '#15102b', hair: '#c98a3a', skin: '#f2c39b' };
// camisetas con colores genéricos
const CAM1 = { color: '#8a6bff', sleeve: '#2d1a6e' };
const SHIRTS = [
  { color: '#ff7a3d', sleeve: '#2d1a6e' }, { color: C.cyan, sleeve: '#241659' }, { color: '#8a6bff', sleeve: '#15102b' },
  { color: C.magenta, sleeve: '#2d1a6e' }, { color: '#3ee07a', sleeve: '#241659' }, { color: C.gold, sleeve: '#2d1a6e' },
];

/** segundos desde el inicio del plano hasta que se dice `word` (para animaciones internas de un prop) */
const W = (id: string, word: string, nth = 1): number => {
  const b = (timing as any).beats.find((x: any) => x.id === id); let k = nth;
  const n = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]/g, '');
  for (const w of b.words) if (n(w.w).startsWith(n(word)) && --k === 0) return w.s - b.start;
  throw new Error(`[${id}] no está "${word}"`);
};

// Texto 2D: todo con el borde inferior en 1450 px o menos.
// PLACA 1 centrada en 65,5 % (1258 px), PLACA 2 en 70 % (1344 px, alto ~62 px -> borde ~1375).
const P1 = (text: string, at: any, o: any = {}) => ({ type: 'tag' as const, text, at, x: 50, y: 65.5, color: o.red ? C.red : PANEL, size: 44, ...o });
const P2 = (text: string, at: any, o: any = {}) => ({ type: 'tag' as const, text, at, x: 50, y: 70, color: o.red ? C.red : PANEL, size: 38, ...o });

export const BEATS: BeatSpec[] = [
  // 1. la camiseta con el pecho vacío; Lanús aparta la valija grande (750.000)
  { id: 'b01', set: 'void', cam: { from: [0.7, 2.4, 8.2], to: [-0.1, 2.15, 7.2], look: [0, 1.15, 0], fov: 44 }, keywords: ['750.000'],
    actors: [
      { type: 'camiseta', pos: [0, 0, -0.9], p: { ...CAM1, chest: 'empty' } },
      { type: 'ring', pos: [0.95, 0.03, 0.7], p: { r: 0.65, color: C.gold } },
      { type: 'valija', pos: [0.95, 0, 0.7], rot: [0, -0.35, 0], s: 1.05, p: { open: 0 }, move: { to: [2.2, 0, -0.6], at: 'dólares', dur: 1.0 } },
      { type: 'person', pos: [-1.0, 0, 0.6], rot: [0, 0.5, 0], p: { ...DIRIGENTE, pose: 'idle' }, out: 'no' },
      { type: 'person', pos: [-1.0, 0, 0.6], rot: [0, 0.9, 0], at: 'no', enter: 'none', p: { ...DIRIGENTE, pose: 'point' } },
      { type: 'cross', pos: [0.95, 1.25, 0.7], s: 0.45, at: '750.000', out: 'dólares' },
    ],
    overlays: [P1('LANÚS DIJO QUE NO', 0, { size: 50 }), P2('US$ 750.000 POR AÑO', '750.000', { size: 44 })] },

  // 2. la oferta venía de una empresa del juego
  { id: 'b02', set: 'room', cam: { from: [-0.6, 2.2, 6.4], to: [0.2, 2.0, 5.7], look: [0, 1.0, -0.3], fov: 44 }, keywords: ['empresa', 'juego.'],
    actors: [
      { type: 'pared', p: {} },
      { type: 'desk', pos: [0, 0, -0.4] },
      { type: 'valija', pos: [0, 0.8, -0.35], s: 0.8, p: { open: 0 } },
      { type: 'person', pos: [0.15, 0, -1.4], p: { ...EMPRESA, pose: 'hold' } },
      { type: 'fichas', pos: [-0.75, 0.8, -0.2], at: 'ofrecía', enter: 'none', p: { n: 7, color: C.red, dur: 0.5 } },
      { type: 'fichas', pos: [-0.52, 0.8, 0.0], at: 'empresa', enter: 'none', p: { n: 5, color: C.blue, dur: 0.4 } },
      { type: 'dado', pos: [0.75, 1.02, 0.0], rot: [0.2, 0.5, 0.1], at: 'empresa', p: { size: 0.36 } },
      { type: 'dado', pos: [0.5, 0.98, 0.25], rot: [0.1, -0.4, 0], at: 'juego', p: { size: 0.3 } },
    ],
    overlays: [P1('EMPRESA DEL JUEGO', 'juego', { size: 50 })] },

  // 3. renovó con la valija chica: el pecho se ocupa (sin marca en la camiseta)
  { id: 'b03', set: 'void', cam: { from: [0.6, 2.3, 7.4], to: [-0.2, 2.1, 6.6], look: [0, 1.25, 0], fov: 44 }, keywords: ['Mapei,', 'medio'],
    actors: [
      { type: 'camiseta', pos: [0, 0, -0.6], p: { ...CAM1, chest: 'empty', litAt: W('b03', 'Mapei'), glow: C.cyan } },
      { type: 'ring', pos: [0.8, 0.03, 0.8], at: 'medio', p: { r: 0.5, color: C.cyan } },
      { type: 'valija', pos: [0.8, 0, 0.8], rot: [0, -0.3, 0], s: 0.75, p: { open: W('b03', 'medio'), color: '#4a3a6a' } },
      { type: 'person', pos: [-0.95, 0, 0.7], rot: [0, 0.6, 0], p: { ...DIRIGENTE, pose: 'cheer' }, out: 'Mapei' },
      { type: 'person', pos: [-0.95, 0, 0.7], rot: [0, 0.6, 0], at: 'Mapei', enter: 'none', p: { ...DIRIGENTE, pose: 'point' } },
    ],
    overlays: [P1('MAPEI · US$ 500.000 POR AÑO', 'Mapei', { size: 46 })] },

  // 4. una ley les saca la elección a todos
  { id: 'b04', set: 'room', cam: { from: [0.7, 2.3, 7.0], to: [-0.1, 2.1, 6.2], look: [0, 1.05, -0.6], fov: 44 }, keywords: ['ley', 'elección'],
    actors: [
      { type: 'pared', p: {} },
      ...[-1.35, -0.45, 0.45, 1.35].map((x, i) => ({ type: 'camiseta', pos: [x, 0, -1.5] as any, s: 0.62,
        p: { ...SHIRTS[i], chest: 'lit', glow: [C.gold, C.cyan, C.magenta, C.green][i], offAt: W('b04', 'todos') + i * 0.12 } })),
      { type: 'ley', pos: [0, 0.75, 0.6], rot: [-0.15, 0, 0], at: 'ley', p: { w: 0.8, h: 1.05, sello: W('b04', 'sacar') - W('b04', 'ley'), selloColor: C.red } },
    ],
    overlays: [P1('UNA LEY NUEVA', 'ley', { size: 50 })] },

  // 5. el Senado: 72 bancas en verde, ninguna en contra
  { id: 'b05', set: 'void', cam: { from: [-0.6, 2.2, 6.6], to: [0.2, 2.05, 5.9], look: [0, 0.95, -1.0], fov: 44 }, keywords: ['jueves,', 'Senado', 'ludopatía:', '72'],
    actors: [
      { type: 'hemiciclo', pos: [0, 0, -0.4], s: 0.68, p: { on: W('b05', '72'), every: 0.009, rim: W('b05', 'Senado') } },
      { type: 'ley', pos: [0, 0.75, 0.15], rot: [-0.3, 0, 0], s: 0.35, at: 'ludopatía', p: { w: 0.8, h: 1.05 } },
      { type: 'check', pos: [0, 1.5, -0.6], s: 0.55, at: 'cero' },
    ],
    overlays: [P2('SENADO · JUEVES 26/11', 'Senado', { size: 44 }), { type: 'big', text: '72 A 0', at: '72', size: 120, y: 36 }] },

  // 6. uno de cada tres equipos tendrá que buscar otra marca
  { id: 'b06', set: 'room', cam: { from: [-0.6, 2.4, 7.4], to: [0.2, 2.2, 6.7], look: [0, 0.65, -0.8], fov: 44 }, keywords: ['tres', 'Profesional', 'buscar'],
    actors: [
      { type: 'pared', p: {} },
      ...[0, 1, 2, 3, 4, 5].map((i) => ({ type: 'camiseta', pos: [-1.0 + (i % 3) * 1.0, 0, i < 3 ? -1.8 : -0.4] as any, s: i < 3 ? 0.5 : 0.55, at: i < 3 ? undefined : 0.1 + (i - 3) * 0.12,
        p: { ...SHIRTS[i], pole: i < 3 ? 2.3 : 0.9, chest: 'lit', glow: C.gold, mark: i === 2 || i === 3 ? W('b06', 'tres') - (i < 3 ? 0 : 0.1 + (i - 3) * 0.12) : undefined,
          qAt: i === 2 || i === 3 ? W('b06', 'buscar') - (i < 3 ? 0 : 0.1 + (i - 3) * 0.12) : undefined } })),
    ],
    overlays: [P1('1 DE CADA 3 EQUIPOS', 'tres', { size: 50 }), P2('LIGA PROFESIONAL · SEGÚN LA NACIÓN', 'Profesional', { size: 36 })] },

  // 7. el diario calcula al menos 20 millones
  { id: 'b07', set: 'void', cam: { from: [0.7, 2.2, 7.0], to: [-0.1, 2.05, 6.4], look: [0, 0.9, 0], fov: 44 }, keywords: ['diario', '20', 'millones'],
    actors: [
      { type: 'ring', pos: [0, 0.03, 0], p: { r: 1.0, color: C.gold } },
      { type: 'fajos', pos: [0, 0, 0], at: 0, enter: 'none', p: { n: 30, from: 6, dur: W('b07', 'juego') + 0.3, cols: 3, rows: 2 } },
      { type: 'panel', pos: [-0.75, 1.45, 0.2], rot: [0, 0.3, 0], at: 'diario', p: { text: 'DIARIO', w: 0.9, h: 0.3, size: 0.6, color: '#1a1030', bg: '#d9d2f2' } },
    ],
    overlays: [{ type: 'big', text: 'US$ 20 MILLONES', sub: 'IMPACTO MÍNIMO', at: '20', size: 84, y: 59 }, P2('SEGÚN LA NACIÓN', 'juego', { size: 40 })] },

  // 8. Boca: camiseta, contrato y calendario hasta 2028
  { id: 'b08', set: 'room', cam: { from: [-0.7, 2.3, 7.0], to: [0.2, 2.1, 6.3], look: [0, 0.9, -0.5], fov: 44 }, keywords: ['Boca', 'Betsson', '2028.'],
    actors: [
      { type: 'pared', p: {} },
      { type: 'camiseta', pos: [-0.75, 0, -0.9], s: 0.85, p: { ...SHIRTS[0], chest: 'lit', glow: C.cyan } },
      { type: 'fajos', pos: [0.6, 0, -0.7], at: '7', enter: 'none', p: { n: 16, from: 0, dur: W('b08', 'millones') - W('b08', '7') + 0.2, cols: 2, rows: 2 } },
      { type: 'calendar', pos: [0.85, 2.0, -1.4], rot: [0, -0.2, 0], s: 0.5, at: '2028', p: { top: 'HASTA', big: '2028', color: C.blue } },
    ],
    overlays: [P1('BOCA · BETSSON', 'Boca', { size: 50 }), P2('US$ 7 A 8 MILLONES POR AÑO', '8', { size: 40, out: '2028' }), P2('CONTRATO HASTA FINES DE 2028', '2028', { size: 40 })] },

  // 9. River: 6 millones
  { id: 'b09', set: 'void', cam: { from: [0.6, 2.4, 7.2], to: [-0.2, 2.2, 6.5], look: [0, 0.85, -0.2], fov: 44 }, keywords: ['River,', 'Betano.'],
    actors: [
      { type: 'camiseta', pos: [0.7, 0, -0.7], s: 0.85, p: { ...SHIRTS[4], chest: 'lit', glow: C.magenta } },
      { type: 'ring', pos: [-0.6, 0.03, 0.2], p: { r: 0.6, color: C.cyan } },
      { type: 'fajos', pos: [-0.6, 0, 0.2], at: 0, enter: 'none', p: { n: 12, from: 2, dur: W('b09', 'millones') + 0.3, cols: 2, rows: 2 } },
    ],
    overlays: [P1('RIVER · BETANO', 0.05, { size: 50 }), P2('US$ 6 MILLONES', '6', { size: 44 })] },

  // 10. la ley todavía no rige: el reloj de arena
  { id: 'b10', set: 'room', cam: { from: [0.6, 2.2, 6.0], to: [-0.2, 2.0, 5.4], look: [0, 1.05, -0.3], fov: 44 }, keywords: ['todavía', 'rige.'],
    actors: [
      { type: 'pared', p: {} },
      { type: 'desk', pos: [0, 0, -0.4] },
      { type: 'ley', pos: [-0.45, 0.83, -0.3], rot: [-PI / 2 + 0.35, 0, 0.12], s: 0.75, p: { w: 0.8, h: 1.05 } },
      { type: 'reloj', pos: [0.55, 0.8, -0.3], s: 0.75, p: { dur: 6, flip: W('b10', 'todavía') - 0.25 } },
      { type: 'cross', pos: [-0.45, 1.45, 0.1], s: 0.4, at: 'rige' },
    ],
    overlays: [P1('TODAVÍA NO RIGE', 'rige', { red: true, size: 50 })] },

  // 11. 10 días hábiles para vetar o promulgar
  { id: 'b11', set: 'void', cam: { from: [-0.7, 2.4, 7.6], to: [0.2, 2.2, 6.9], look: [0, 1.0, 0], fov: 44 }, keywords: ['Ejecutivo', '10', 'promulgada.'],
    actors: [
      { type: 'ring', pos: [0, 0.03, -0.3], p: { r: 0.7, color: '#8a6bff' } },
      { type: 'desk', pos: [0, 0, -0.3] },
      { type: 'person', pos: [0, 0, -1.0], p: { ...FUNCIONARIO, pose: 'idle' }, out: 'vetarla' },
      { type: 'person', pos: [0, 0, -1.0], at: 'vetarla', enter: 'none', p: { ...FUNCIONARIO, pose: 'shrug' } },
      { type: 'ley', pos: [0, 0.82, -0.15], rot: [-PI / 2 + 0.3, 0, 0], s: 0.6, p: { w: 0.8, h: 1.05 } },
      { type: 'calendar', pos: [-0.95, 1.6, 0.1], rot: [0, 0.3, 0], s: 0.5, at: '10', p: { top: 'DÍAS HÁBILES', big: '10', color: C.blue } },
      { type: 'cross', pos: [0.95, 1.75, 0.1], s: 0.4, at: 'vetarla' },
      { type: 'check', pos: [0.95, 1.05, 0.1], s: 0.45, at: 'promulgada' },
    ],
    overlays: [P1('10 DÍAS HÁBILES PARA VETAR O PROMULGAR', '10', { size: 38 })] },

  // 12. y después 120 días para reglamentarla
  { id: 'b12', set: 'room', cam: { from: [0.7, 2.3, 6.6], to: [-0.2, 2.1, 5.9], look: [0, 1.1, -0.5], fov: 44 }, keywords: ['120', 'reglamentarla.'],
    actors: [
      { type: 'pared', p: {} },
      { type: 'desk', pos: [0.45, 0, -0.6] },
      { type: 'laptop', pos: [0.45, 0.8, -0.7] },
      { type: 'person', pos: [0.45, 0, -1.4], p: { ...FUNCIONARIO, pose: 'type' } },
      { type: 'calendar', pos: [-1.0, 1.35, -0.2], rot: [0, 0.3, 0], s: 0.6, at: 0, enter: 'none', p: { top: 'DÍAS', big: '+120', color: C.magenta } },
      ...[0, 1, 2].map((i) => ({ type: 'ley', pos: [0.95, 0.84 + i * 0.03, -0.35] as any, rot: [-PI / 2, 0, 0.2 - i * 0.15] as any, s: 0.45, at: 'reglamentarla', p: { w: 0.8, h: 1.05 } })),
    ],
    overlays: [P1('+120 DÍAS PARA REGLAMENTAR', '120', { size: 46 })] },

  // 13. las apuestas pagaban hasta el triple
  { id: 'b13', set: 'void', cam: { from: [-0.6, 2.4, 7.6], to: [0.2, 2.2, 6.9], look: [0, 0.95, 0], fov: 44 }, keywords: ['apuestas', 'triple', 'siempre.'],
    actors: [
      { type: 'ring', pos: [0, 0.03, 0.2], p: { r: 1.4, color: '#8a6bff' } },
      { type: 'box', pos: [-0.65, 0.4, 0], p: { size: [0.75, 0.8, 0.75], color: '#8a6bff', glow: true, ei: 0.4 } },
      { type: 'bars', pos: [0.65, 0, 0], at: 'triple', enter: 'none', p: { vals: [2.4], colors: [C.gold], w: 0.75, dur: 0.6 } },
      { type: 'box', pos: [0.65, 0.4, 0], out: 'triple', p: { size: [0.75, 0.8, 0.75], color: C.gold, glow: true, ei: 0.4 } },
      { type: 'panel', pos: [-0.65, 1.05, 0.0], at: 'marcas', p: { text: 'MARCAS DE SIEMPRE', w: 1.2, h: 0.28, size: 0.55, color: '#fff' } },
      { type: 'panel', pos: [0.65, 1.05, 0.0], at: 'apuestas', out: 'triple', p: { text: 'APUESTAS', w: 1.1, h: 0.28, size: 0.6, color: C.gold } },
      { type: 'panel', pos: [0.65, 2.65, 0.0], at: 'triple', p: { text: 'APUESTAS', w: 1.1, h: 0.28, size: 0.6, color: C.gold } },
    ],
    overlays: [P1('HASTA EL TRIPLE', 'triple', { size: 52 }), P2('SEGÚN LA NACIÓN', 'siempre', { size: 40 })] },

  // 14. vuelve la imagen del inicio: la cuenta de Lanús
  { id: 'b14', set: 'void', cam: { from: [0.7, 2.2, 8.0], to: [-0.1, 2.05, 7.2], look: [0, 0.85, 0], fov: 44 }, keywords: ['cuenta:', '250.000'],
    actors: [
      { type: 'camiseta', pos: [0, 0, -0.9], p: { ...CAM1, chest: 'lit', glow: C.cyan } },
      { type: 'valija', pos: [1.35, 0, -2.2], rot: [0, -0.35, 0], s: 1.05, p: { open: 0 } },
      { type: 'cross', pos: [1.35, 1.25, -2.2], s: 0.4, at: 'cuenta' },
      { type: 'ring', pos: [0.85, 0.03, 0.8], p: { r: 0.5, color: C.cyan } },
      { type: 'valija', pos: [0.85, 0, 0.8], rot: [0, -0.3, 0], s: 0.75, p: { open: 0, color: '#4a3a6a' } },
      { type: 'person', pos: [-1.0, 0, 0.6], rot: [0, 0.6, 0], p: { ...DIRIGENTE, pose: 'idle' }, out: '250.000' },
      { type: 'person', pos: [-1.0, 0, 0.6], rot: [0, 0.6, 0], at: '250.000', enter: 'none', p: { ...DIRIGENTE, pose: 'shrug' } },
    ],
    overlays: [{ type: 'big', text: '750.000 − 500.000 = 250.000', at: 'cuenta', size: 58, y: 60 }, P2('US$ 250.000 MENOS POR AÑO', '250.000', { red: true, size: 42 })] },

  // 15. comentá tu club
  { id: 'b15', set: 'room', cam: { from: [-0.6, 2.3, 6.8], to: [0.2, 2.1, 6.1], look: [0, 1.0, -0.6], fov: 44 }, keywords: ['Comentá', 'club,', 'cuántos', 'camiseta.'],
    actors: [
      { type: 'pared', p: {} },
      ...[0, 1, 2, 3].map((i) => ({ type: 'camiseta', pos: [-1.35 + i * 0.9, 0, -1.4] as any, s: 0.6, p: { ...SHIRTS[(i + 1) % 6], chest: 'empty', qAt: W('b15', 'club') + i * 0.15 } })),
      { type: 'person', pos: [-1.0, 0, -0.1], rot: [0, 0.5, 0], p: { ...DIRIGENTE, pose: 'idle' }, out: 'club' },
      { type: 'person', pos: [-1.0, 0, -0.1], rot: [0, 0.5, 0], at: 'club', enter: 'none', p: { ...DIRIGENTE, pose: 'point' } },
      { type: 'ring', pos: [-1.0, 0.03, -0.1], at: 'cambiar', p: { r: 0.45, color: C.gold } },
    ],
    overlays: [P1('COMENTÁ TU CLUB', 'club', { size: 52 })] },
];
