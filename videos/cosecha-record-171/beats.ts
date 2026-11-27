import type { BeatSpec } from '../../src/Beat';
import { C } from '../../src/kit/math';
import timing from './timing.json';

const PI = Math.PI;
const DARK = '#15102b';
const PANEL = 'rgba(20,10,46,.92)';
const MAIZ = '#f2b632';
const SOJA = '#b9dc6e';
const GRIS = '#6f6a9e';

/** segundos desde el inicio del plano hasta que se dice `word` (para animaciones internas de un prop) */
const W = (id: string, word: string, nth = 1): number => {
  const b = (timing as any).beats.find((x: any) => x.id === id); let k = nth;
  const n = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]/g, '');
  for (const w of b.words) if (n(w.w).startsWith(n(word)) && --k === 0) return w.s - b.start;
  throw new Error(`[${id}] no está "${word}"`);
};

// Texto 2D, todo con el borde inferior en 1450 px o menos y sin píldoras:
// PLACA 1 centrada en 63,5 % (1219 px), PLACA 2 en 68 % (1306 px), fuentes en 71,4 % y 73,9 % (borde ~1443 px).
const S1 = (text: string, at: any, o: any = {}) => ({ type: 'tag' as const, text, at, x: 50, y: 63.5, color: o.red ? C.red : PANEL, size: 44, ...o });
const S2 = (text: string, at: any, o: any = {}) => ({ type: 'tag' as const, text, at, x: 50, y: 68, color: o.red ? C.red : PANEL, size: 36, ...o });
const FUENTES = [
  { type: 'tag' as const, text: 'FUENTES: ÁMBITO (27/11) Y CLARÍN (26/11/2026)', at: 0, x: 50, y: 71.4, color: 'rgba(20,10,46,.75)', size: 24 },
  { type: 'tag' as const, text: 'DATOS: SECRETARÍA DE AGRICULTURA Y AGRITREND', at: 0, x: 50, y: 73.9, color: 'rgba(20,10,46,.75)', size: 24 },
];

/** cartel 3D chico con fondo (el texto queda delante de su propio panel) */
const L = (text: string, w: number, bg: string, extra: any = {}) => ({ text, w, h: 0.34, bg, size: 0.7, weight: 900, color: '#fff', ...extra });
/** alto de una montaña de granos para un valor en millones de toneladas */
const PH = (mt: number) => mt * 0.018;

const SUELO = { type: 'suelo', pos: [0, 0, -4] as any, p: { w: 40, d: 30 } };

export const BEATS: BeatSpec[] = [
  // 1. La soja bajó. Y aun así... más granos que nunca: la soja baja, el maíz crece, el silo se llena
  { id: 'b01', set: 'void', cam: { from: [0.8, 2.3, 8.8], to: [-0.1, 2.1, 7.9], look: [0, 1.0, -0.6], fov: 44, shift: -0.08 }, keywords: ['Argentina', 'cosechó'],
    actors: [
      SUELO,
      { type: 'campo', pos: [-2.2, 0, -3.4], p: { w: 3.4, d: 2.2, kind: 'soja', seed: 2 } },
      { type: 'campo', pos: [1.6, 0, -3.6], p: { w: 3.4, d: 2.2, kind: 'maiz', seed: 5 } },
      { type: 'silo', pos: [0, 0, -2.4], p: { h: 1.95, r: 0.5, fill0: 0.25, fill1: 0.98, at: W('b01', 'Argentina'), dur: 1.6 } },
      { type: 'pila', pos: [-1.05, 0, 0], p: { h0: PH(51.5), h1: PH(49.3), at: W('b01', 'bajó'), dur: 0.8, color: SOJA, ratio: 0.85, seed: 4 } },
      { type: 'pila', pos: [1.0, 0, 0.1], p: { h0: PH(51.69), h1: PH(72.5), at: W('b01', 'cosechó'), dur: 1.2, color: MAIZ, ratio: 0.85, seed: 7 } },
      { type: 'flechaAbajo', pos: [-1.05, 1.75, 0.2], at: 'bajó', p: { len: 0.45, color: C.red } , out: 'Y' },
      { type: 'ring', pos: [1.0, 0.04, 0.1], at: 'nunca', p: { r: 1.3, color: C.gold } },
    ],
    overlays: [S1('LA SOJA BAJÓ', 0, { red: true }), S2('Y AUN ASÍ, RÉCORD', 'nunca', { color: '#1f9d55', size: 40 })] },

  // 2. 171 millones de toneladas, según la Secretaría: tres silos que se llenan y un camión que llega
  { id: 'b02', set: 'void', cam: { from: [-0.8, 2.4, 9.0], to: [0.2, 2.2, 8.1], look: [0, 1.2, -0.4], fov: 44, shift: -0.08 }, keywords: ['171 millones', 'toneladas,', 'Secretaría', 'Agricultura.'],
    actors: [
      SUELO,
      { type: 'campo', pos: [0, 0, -3.6], p: { w: 6, d: 2.2, kind: 'maiz', seed: 9, per: 12 } },
      { type: 'silo', pos: [-1.15, 0, -1.0], p: { h: 1.8, r: 0.45, fill0: 0.15, fill1: 0.95, at: W('b02', '171'), dur: 1.4 } },
      { type: 'silo', pos: [0, 0, -1.2], p: { h: 1.95, r: 0.48, fill0: 0.15, fill1: 0.95, at: W('b02', '171') + 0.3, dur: 1.4 } },
      { type: 'silo', pos: [1.15, 0, -1.0], p: { h: 1.8, r: 0.45, fill0: 0.15, fill1: 0.95, at: W('b02', '171') + 0.6, dur: 1.4 } },
      { type: 'camion', pos: [-3.6, 0, 0.55], s: 0.8, p: {}, move: { to: [-0.2, 0, 0.55], at: 0, dur: 2.6 } },
    ],
    overlays: [{ type: 'big', text: '', count: { to: 171, post: ' MILLONES' }, sub: 'DE TONELADAS', at: '171', size: 96, y: 55 },
      S2('SEGÚN LA SECRETARÍA DE AGRICULTURA · CAMPAÑA 2025/26', 'Agricultura', { size: 27 }), ...FUENTES] },

  // 3. 30 millones más que la campaña anterior: barras a escala desde cero
  { id: 'b03', set: 'void', cam: { from: [0.7, 2.3, 8.4], to: [-0.1, 2.1, 7.6], look: [0, 1.05, 0], fov: 44, shift: -0.08 }, keywords: ['30 millones', 'campaña'],
    actors: [
      SUELO,
      { type: 'ring', pos: [0.55, 0.04, 0], at: '30', p: { r: 0.75, color: C.gold } },
      { type: 'barras', pos: [0, 0, 0], p: { k: 0.009, w: 0.8, gap: 0.3, topW: 0.9, items: [
        { v: 141, c: GRIS, top: '141', cap: 'ANTERIOR', capColor: '#fff', at: -1 },
        { v: 141, c: MAIZ, cap: '2025/26', at: -1, add: { v: 30, c: C.gold, at: W('b03', '30'), top: '171' } },
      ] } },
    ],
    overlays: [S1('141 → 171 MILLONES DE T', '30'), S2('+21%', 'anterior', { color: '#1f9d55', size: 44 }), ...FUENTES] },

  // 4. ¿quién empujó el récord? la cosechadora avanza entre las dos montañas
  { id: 'b04', set: 'void', cam: { from: [-0.6, 2.2, 8.4], to: [0.3, 2.0, 7.6], look: [0, 1.0, -0.6], fov: 44, shift: -0.08 }, keywords: ['Entonces,', 'empujó'],
    actors: [
      SUELO,
      { type: 'campo', pos: [0, 0, -0.2], p: { w: 5, d: 2.0, kind: 'maiz', seed: 3, per: 10 } },
      { type: 'pila', pos: [-1.25, 0, -2.2], p: { h0: PH(49.3), color: SOJA, ratio: 0.85, seed: 2 } },
      { type: 'pila', pos: [1.25, 0, -2.2], p: { h0: PH(72.5), color: MAIZ, ratio: 0.85, seed: 8 } },
      { type: 'cosechadora', pos: [-2.6, 0, 1.4], s: 0.75, p: {}, move: { to: [-0.4, 0, 1.4], at: 0, dur: 2.6 } },
      { type: 'label', pos: [0, 1.45, -2.2], at: 'quién', p: { text: '?', w: 0.55, h: 0.65, bg: DARK, color: C.gold, size: 0.85, weight: 900 } },
    ],
    overlays: [S1('¿QUIÉN EMPUJÓ EL RÉCORD?', 'récord', { color: C.blue }), ...FUENTES] },

  // 5. El maíz: llegó a 72,5 millones: la montaña de maíz crece y aparece el choclo
  { id: 'b05', set: 'void', cam: { from: [0.8, 2.3, 8.2], to: [0, 2.1, 7.4], look: [0, 1.0, -0.4], fov: 44, shift: -0.08 }, keywords: ['maíz:', '72,5', 'millones', 'toneladas.'],
    actors: [
      SUELO,
      { type: 'campo', pos: [0, 0, -3.2], p: { w: 6, d: 2.0, kind: 'maiz', seed: 11, per: 12 } },
      { type: 'pila', pos: [0.55, 0, -0.6], p: { h0: PH(51.69), h1: PH(72.5), at: W('b05', '72,5'), dur: 1.3, color: MAIZ, ratio: 0.85, seed: 5 } },
      { type: 'choclo', pos: [-1.25, 0.15, 0.7], s: 1.0, at: 'maíz', rot: [0, 0, 0.15] },
      { type: 'ring', pos: [0.55, 0.04, -0.6], at: 'toneladas', p: { r: 1.25, color: C.gold } },
    ],
    overlays: [S1('MAÍZ', 'maíz', { color: '#c98a12', size: 50 }), S2('51,69 → 72,5 MILLONES DE T', '72,5'), ...FUENTES] },

  // 6. más de 20 millones extra, de un solo cultivo: barra apilada a escala desde cero
  { id: 'b06', set: 'void', cam: { from: [-0.7, 2.3, 8.0], to: [0.1, 2.1, 7.3], look: [0, 1.05, 0], fov: 44, shift: -0.08 }, keywords: ['20 millones', 'cultivo.'],
    actors: [
      SUELO,
      { type: 'barras', pos: [0.55, 0, 0], p: { k: 0.02, w: 0.9, gap: 0.3, topW: 1.0, items: [
        { v: 51.69, c: '#b8841c', cap: 'MAÍZ', at: -1, add: { v: 20.81, c: C.gold, at: W('b06', '20'), top: '+20,81' } },
      ] } },
      { type: 'choclo', pos: [-0.9, 0.15, 0.3], s: 0.95, rot: [0, 0, 0.12] },
      { type: 'ring', pos: [-0.9, 0.04, 0.3], at: 'solo', p: { r: 0.55, color: C.cyan } },
    ],
    overlays: [S1('+20,81 MILLONES DE T', '20'), S2('UN SOLO CULTIVO', 'cultivo', { color: '#c98a12', size: 40 }), ...FUENTES] },

  // 7. hoy es el cultivo más grande del país: podio con el choclo arriba
  { id: 'b07', set: 'void', cam: { from: [0.6, 2.2, 7.6], to: [-0.1, 2.0, 6.9], look: [0, 1.15, 0], fov: 44, shift: -0.08 }, keywords: ['cultivo', 'grande'],
    actors: [
      SUELO,
      { type: 'campo', pos: [0, 0, -3.0], p: { w: 6, d: 2.0, kind: 'maiz', seed: 13, per: 12 } },
      { type: 'podio', pos: [0, 0, 0], p: { h1: 0.7, h2: 0.4 } },
      { type: 'choclo', pos: [-0.5, 0.73, 0], s: 0.75 },
      { type: 'plantaSoja', pos: [0.52, 0.42, 0], s: 0.8 },
      { type: 'ring', pos: [0, 0.04, 0], at: 'cultivo', p: { r: 1.25, color: C.gold } },
    ],
    overlays: [S1('N.º 1 DEL PAÍS EN TONELADAS', 'grande', { color: '#c98a12' }), ...FUENTES] },

  // 8. La soja bajó de 51,5 a 49,3: planta y barras a escala desde cero
  { id: 'b08', set: 'void', cam: { from: [-0.7, 2.3, 8.2], to: [0.1, 2.1, 7.4], look: [0, 1.0, 0], fov: 44, shift: -0.08 }, keywords: ['cambio,', '51,5', '49,3'],
    actors: [
      SUELO,
      { type: 'campo', pos: [0, 0, -3.0], p: { w: 6, d: 2.0, kind: 'soja', seed: 4, per: 12 } },
      { type: 'plantaSoja', pos: [-1.15, 0, 0.3], s: 1.4 },
      { type: 'barras', pos: [0.6, 0, -0.2], p: { k: 0.026, w: 0.7, gap: 0.3, topW: 0.85, items: [
        { v: 51.5, c: GRIS, top: '51,5', cap: 'ANTES', capColor: '#fff', at: W('b08', '51,5') - 0.5 },
        { v: 49.3, c: SOJA, top: '49,3', cap: 'AHORA', at: W('b08', '49,3') - 0.3 },
      ] } },
      { type: 'flechaAbajo', pos: [-1.15, 2.0, 0.3], at: 'bajó', p: { len: 0.4, color: C.red } },
    ],
    overlays: [S1('SOJA', 'soja', { color: '#4f8a2a', size: 50 }), S2('51,5 → 49,3 MILLONES DE T', '49,3', { red: true }), ...FUENTES] },

  // 9. área +2,1%, cosecha +21%: dos pares de barras a escala desde cero
  { id: 'b09', set: 'void', cam: { from: [0.7, 2.3, 8.4], to: [-0.1, 2.1, 7.6], look: [0, 1.0, 0], fov: 44, shift: -0.08 }, keywords: ['sembrada', 'apenas', 'cosecha,'],
    actors: [
      SUELO,
      { type: 'campo', pos: [-0.85, 0, -1.0], p: { w: 1.5, d: 0.9, kind: 'soja', seed: 6, rows: 3, per: 5 } },
      { type: 'barras', pos: [-0.85, 0, 0.1], p: { k: 0.012, w: 0.5, gap: 0.15, topW: 0.75, items: [
        { v: 100, c: GRIS, at: -1 },
        { v: 102.1, c: C.cyan, top: '+2,1%', at: W('b09', 'creció') },
      ] } },
      { type: 'pila', pos: [0.85, 0, -1.0], p: { h0: 0.35, h1: 0.42, at: W('b09', 'cosecha'), dur: 0.8, color: MAIZ, ratio: 1.3 } },
      { type: 'barras', pos: [0.85, 0, 0.1], p: { k: 0.012, w: 0.5, gap: 0.15, topW: 0.75, items: [
        { v: 100, c: GRIS, at: -1 },
        { v: 121, c: C.gold, top: '+21%', at: W('b09', 'cosecha') },
      ] } },
      { type: 'label', pos: [-0.85, 0.03, 0.62], rot: [-1.0, 0, 0], p: { text: 'ÁREA', w: 0.9, h: 0.2, bg: DARK, color: '#fff', size: 0.75, weight: 900 } },
      { type: 'label', pos: [0.85, 0.03, 0.62], rot: [-1.0, 0, 0], p: { text: 'COSECHA', w: 0.9, h: 0.2, bg: DARK, color: '#fff', size: 0.75, weight: 900 } },
      { type: 'label', pos: [0, 0.02, 0.98], rot: [-1.0, 0, 0], p: { text: 'A ESCALA DESDE CERO', w: 1.4, h: 0.13, color: '#b9a3e8', size: 0.7, weight: 700 } },
    ],
    overlays: [S1('SUPERFICIE: +2,1%', '2,1%'), S2('44,6 MILLONES DE HECTÁREAS (RÉCORD)', '2,1%', { size: 28, out: '21%' }),
      S2('COSECHA: +21%', '21%', { color: '#1f9d55', size: 40 }), ...FUENTES] },

  // 10. una consultora cuenta 164,4: no suma el maíz para forraje (la vaca)
  { id: 'b10', set: 'void', cam: { from: [-0.6, 2.3, 8.4], to: [0.2, 2.1, 7.6], look: [0, 1.05, 0], fov: 44, shift: -0.08 }, keywords: ['consultora', '164,4', 'millones:', 'forraje.'],
    actors: [
      SUELO,
      { type: 'barras', pos: [0.6, 0, -0.3], p: { k: 0.009, w: 0.75, gap: 0.3, topW: 0.95, items: [
        { v: 171, c: MAIZ, top: '171', cap: 'SECRETARÍA', at: -1 },
        { v: 164.4, c: C.cyan, top: '164,4', cap: 'CONSULTORA', at: W('b10', '164,4') - 0.3 },
      ] } },
      { type: 'person', pos: [-1.1, 0, 0.3], rot: [0, 0.7, 0], s: 0.85, at: 'consultora', p: { shirt: C.magenta, hair: '#15102b', skin: '#f2c39b', pose: 'point' }, out: 'no' },
      { type: 'vaca', pos: [-1.15, 0, -0.1], rot: [0, -PI / 2, 0], s: 0.85, at: 'no' },
      { type: 'pila', pos: [-1.15, 0, 1.05], at: 'forraje', p: { h0: 0.3, color: '#8fb04a', ratio: 1.2, seed: 9 } },
    ],
    overlays: [S1('164,4 MILLONES DE T · SEGÚN AGRITREND', '164,4', { size: 34 }), S2('NO CUENTA EL MAÍZ PARA FORRAJE', 'forraje', { size: 34 }), ...FUENTES] },

  // 11. exportaciones: el puerto, el barco que se carga y el fajo que crece
  { id: 'b11', set: 'void', cam: { from: [0.7, 2.4, 8.6], to: [-0.1, 2.2, 7.8], look: [0, 1.0, -0.4], fov: 44, shift: -0.08 }, keywords: ['consultora,', 'exportaciones', 'granos', '44.869 millones'],
    actors: [
      { type: 'suelo', pos: [0, 0, -8.0], p: { w: 40, d: 16 } },
      { type: 'agua', pos: [0, 0, 1.0], p: { w: 12, d: 3.6 } },
      { type: 'silo', pos: [-1.35, 0, -2.0], p: { h: 1.9, r: 0.42, fill0: 0.85 } },
      { type: 'silo', pos: [-0.45, 0, -2.2], p: { h: 1.9, r: 0.42, fill0: 0.85 } },
      { type: 'box', pos: [0.05, 1.33, -0.77], rot: [0.515, 0, 0], at: 'exportaciones', p: { size: [0.12, 0.08, 2.33], color: C.gold, glow: true, ei: 0.5 } },
      { type: 'box', pos: [0.05, 0.66, -0.77], at: 'exportaciones', enter: 'grow', p: { size: [0.09, 1.32, 0.09], color: '#8d8aa0' } },
      { type: 'box', pos: [0.05, 0.95, -1.75], at: 'exportaciones', enter: 'grow', p: { size: [0.09, 1.9, 0.09], color: '#8d8aa0' } },
      { type: 'barco', pos: [-0.2, 0, 0.25], s: 0.9, p: { loadAt: W('b11', 'granos') }, move: { to: [0.4, 0, 0.25], at: 'dólares', dur: 0.9 } },
      { type: 'fajo', pos: [0.95, 0, -1.3], at: '44.869', enter: 'none', p: { h0: 0.0, h1: 1.6, at: W('b11', '44.869'), dur: 1.6, w: 0.85 } },
      { type: 'ring', pos: [0.95, 0.04, -1.3], at: 'dólares', p: { r: 0.7, color: C.green } },
    ],
    overlays: [S2('CÁLCULO PRIVADO · SEGÚN AGRITREND', 'consultora', { size: 32 }), S1('US$ 44.869 MILLONES EN EXPORTACIONES', '44.869', { size: 36 }), ...FUENTES] },

  // 12. la soja sigue siendo la que más dólares trae: montañas y fajos a escala desde cero
  { id: 'b12', set: 'void', cam: { from: [-0.7, 2.4, 8.8], to: [0.1, 2.2, 8.0], look: [0, 1.05, -0.3], fov: 44, shift: -0.08 }, keywords: ['dólares', '21.300 millones.'],
    actors: [
      SUELO,
      { type: 'pila', pos: [-1.05, 0, -1.2], p: { h0: PH(72.5), color: MAIZ, ratio: 0.85, seed: 3 } },
      { type: 'pila', pos: [1.05, 0, -1.2], p: { h0: PH(51.5), h1: PH(49.3), at: W('b12', 'bajó'), dur: 0.7, color: SOJA, ratio: 0.85, seed: 6 } },
      { type: 'fajo', pos: [0.7, 0, 0.6], enter: 'none', p: { h0: 0.08, h1: 21.3 * 0.08, at: W('b12', 'dólares'), dur: 1.4, w: 0.8 } },
      { type: 'fajo', pos: [-0.7, 0, 0.6], enter: 'none', p: { h0: 0.08, h1: 10 * 0.08, at: W('b12', '21.300') + 0.6, dur: 1.0, w: 0.8 } },
      { type: 'label', pos: [-1.05, 1.95, -1.2], p: L('MAÍZ', 0.8, '#8a5a0a', { h: 0.24 }) },
      { type: 'label', pos: [1.05, 1.95, -1.2], p: L('SOJA', 0.8, '#3f6a22', { h: 0.24 }) },
      { type: 'label', pos: [0, 1.95, -1.2], p: { text: 'A ESCALA DESDE CERO', w: 1.2, h: 0.15, color: '#b9a3e8', size: 0.7, weight: 700 } },
    ],
    overlays: [S1('SOJA: US$ 21.300 MILLONES', '21.300', { color: '#3f7a22' }),
      S2('MAÍZ: CASI US$ 10.000 MILLONES · SEGÚN AGRITREND', W('b12', '21.300') + 0.9, { size: 26 }), ...FUENTES] },

  // 13. contá qué se siembra cerca de donde vivís: el pueblo entre campos
  { id: 'b13', set: 'void', cam: { from: [0.6, 2.3, 7.2], to: [-0.1, 2.15, 6.4], look: [0, 1.0, -0.6], fov: 44, shift: -0.08 }, keywords: ['siembra', 'vivís:', 'cultivo.'],
    actors: [
      SUELO,
      { type: 'campo', pos: [-2.0, 0, -0.6], p: { w: 1.7, d: 3.0, kind: 'maiz', seed: 1, rows: 8, per: 4, grow: W('b13', 'siembra'), dur: 0.9 } },
      { type: 'campo', pos: [2.0, 0, -0.6], p: { w: 1.7, d: 3.0, kind: 'soja', seed: 2, rows: 8, per: 4, grow: W('b13', 'siembra') + 0.2, dur: 0.9 } },
      { type: 'campo', pos: [0, 0, -3.0], p: { w: 5.6, d: 1.6, kind: 'maiz', seed: 3, per: 12 } },
      { type: 'pueblo', pos: [0, 0, -0.5] },
      { type: 'pin', pos: [0, 0.85, -0.5], at: 'vivís', p: { color: C.magenta } },
      { type: 'ring', pos: [0, 0.05, -0.4], at: 'pueblo', p: { r: 1.6, color: C.cyan } },
      { type: 'choclo', pos: [-1.0, 1.55, 0.1], s: 0.5, at: 'cultivo', bob: 0.04 },
      { type: 'plantaSoja', pos: [1.0, 1.55, 0.1], s: 0.6, at: 'cultivo', bob: 0.04 },
    ],
    overlays: [S1('¿QUÉ SE SIEMBRA CERCA TUYO?', 'siembra', { color: C.blue }), S2('CONTÁ EL PUEBLO Y EL CULTIVO', 'cultivo', { color: '#c98a12' })] },
];
