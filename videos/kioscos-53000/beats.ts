import type { BeatSpec } from '../../src/Beat';
import { C } from '../../src/kit/math';
import timing from './timing.json';

const PI = Math.PI;
const DARK = '#15102b';
const PANEL = 'rgba(20,10,46,.92)';
const KIOSQUERO = { shirt: C.gold, pants: '#2a2350', hair: '#3a2a1a', skin: '#e3ad80' };   // genérico
const CLIENTE = { shirt: C.cyan, hair: '#15102b', skin: '#f2c39b' };                        // genérico
const KC = ['#2d1a6e', '#3a2a8a', '#241659', '#33206f'];

/** segundos desde el inicio del plano hasta que se dice `word` (para animaciones internas de un prop) */
const W = (id: string, word: string, nth = 1): number => {
  const b = (timing as any).beats.find((x: any) => x.id === id); let k = nth;
  const n = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]/g, '');
  for (const w of b.words) if (n(w.w).startsWith(n(word)) && --k === 0) return w.s - b.start;
  throw new Error(`[${id}] no está "${word}"`);
};

// Texto 2D: todo con el borde inferior en 1450 px o menos.
// PLACA 1 centrada en 65,5 % (1258 px), PLACA 2 en 70 % (1344 px), fuentes en 73,9 % (1419 px, alto ~43 px -> borde 1440).
const P1 = (text: string, at: any, o: any = {}) => ({ type: 'tag' as const, text, at, x: 50, y: 65.5, color: o.red ? C.red : PANEL, size: 44, ...o });
const P2 = (text: string, at: any, o: any = {}) => ({ type: 'tag' as const, text, at, x: 50, y: 70, color: o.red ? C.red : PANEL, size: 38, ...o });
const FUENTE = (at: any = 0.2) => ({ type: 'tag' as const, text: 'FUENTES: ÁMBITO E INFOBAE, 26/11/2026', at, x: 50, y: 73.9, color: 'rgba(20,10,46,.75)', size: 28 });

/** fila de kioscos en x, de frente a cámara */
const fila = (xs: number[], z: number, o: (i: number) => any = () => ({}), base: any = {}) =>
  xs.map((x, i) => ({ type: 'kiosco', pos: [x, 0, z] as any, ...base, p: { w: 0.8, h: 1.75, color: KC[i % KC.length], seed: i * 2, ...o(i) } }));

export const BEATS: BeatSpec[] = [
  // 1. la cuadra: las persianas bajan una por una, en el único abierto hay un alfajor
  { id: 'b01', set: 'void', cam: { from: [0.8, 2.3, 8.2], to: [-0.1, 2.0, 7.3], look: [0, 1.0, 0], fov: 44 }, keywords: ['dos', 'kioscos', 'tres'],
    actors: [
      { type: 'ring', pos: [-0.42, 0.03, 0.7], p: { r: 0.5, color: C.gold } },
      ...fila([-1.26, -0.42, 0.42, 1.26], 0, (i) => (i % 2 === 1 ? {} : { down: [W('b01', 'cada'), 0, W('b01', 'cerró')][i], dur: 0.6 })),
      { type: 'alfajor', pos: [-0.42, 0.92, 0.62], s: 0.5, at: 'país', bob: 0.03, p: {} },
    ],
    overlays: [P1('CASI 1 DE CADA 2 KIOSCOS CERRÓ', 0, { size: 46 }), P2('EN 3 AÑOS', 'años', { red: true, size: 44 })] },

  // 2. +53.000, según UKRA: el padrón se apaga casi a la mitad
  { id: 'b02', set: 'void', cam: { from: [-0.7, 2.6, 7.8], to: [0.2, 2.3, 7.0], look: [0, 1.15, 0], fov: 44 }, keywords: ['53.000', 'Kiosqueros.'],
    actors: [
      { type: 'padron', pos: [0, 0.1, 0], p: { n: 18, cols: 6, sp: 0.42, off: 8, every: 0.12, delay: W('b02', '53.000') } },
      { type: 'person', pos: [-1.2, 0, 1.2], rot: [0, 0.5, 0], s: 0.75, at: 'Unión', p: { ...KIOSQUERO, pose: 'point' } },
    ],
    overlays: [{ type: 'big', text: '', count: { to: 53000, pre: '+', post: ' CERRADOS' }, at: '53.000', red: true, size: 84, y: 56 },
      P2('SEGÚN UKRA · UNIÓN DE KIOSQUEROS DE LA REPÚBLICA ARGENTINA', 'Kiosqueros', { size: 27 }), FUENTE()] },

  // 3. pero el alfajor se vende más
  { id: 'b03', set: 'room', cam: { from: [0.7, 2.2, 6.6], to: [-0.2, 2.0, 5.8], look: [0, 1.3, -0.4], fov: 44 }, keywords: ['vende', 'más:', 'alfajor.'],
    actors: [
      { type: 'pared', p: {} },
      { type: 'kiosco', pos: [-1.3, 0, -1.6], rot: [0, 0.3, 0], p: { w: 0.92, h: 1.75, closed: true } },
      { type: 'kiosco', pos: [1.35, 0, -1.8], rot: [0, -0.3, 0], p: { w: 0.92, h: 1.75, closed: true, color: KC[1] } },
      { type: 'ring', pos: [0, 0.03, 0], at: 'algo', p: { r: 0.9, color: C.gold } },
      { type: 'alfajor', pos: [0, 1.35, 0], s: 2.0, rot: [0.15, 0.55, 0], at: 'algo', bob: 0.05, p: {} },
      { type: 'arrow', pos: [1.05, 0.3, 0.3], s: 0.7, at: 'más', enter: 'none', p: { len: 1.6, color: C.green, dur: 0.6 } },
    ],
    overlays: [P1('EL ALFAJOR VENDE MÁS', 'alfajor', { size: 48, color: '#1f9d55' }), FUENTE()] },

  // 4. quedan menos de 59.000
  { id: 'b04', set: 'void', cam: { from: [0.6, 3.0, 8.4], to: [-0.2, 2.7, 7.6], look: [0, 0.9, -0.5], fov: 44 }, keywords: ['quedan', '59.000'],
    actors: [
      ...fila([-1.6, -0.55, 0.5, 1.55], -1.7, () => ({ closed: true, sign: '' }), { s: 0.85 }),
      ...fila([-1.05, 0, 1.05], 0.1, (i) => ({ seed: i + 3 }), { at: 'quedan', enter: 'grow' }),
      { type: 'ring', pos: [0, 0.03, 0.4], at: '59.000', p: { r: 1.5, color: C.cyan } },
    ],
    overlays: [{ type: 'big', text: 'QUEDAN MENOS DE 59.000', sub: 'SEGÚN UKRA', at: '59.000', size: 64, y: 57 }, FUENTE()] },

  // 5. unos 72.000 empleos menos
  { id: 'b05', set: 'void', cam: { from: [-0.7, 2.4, 7.6], to: [0.2, 2.2, 6.9], look: [0, 1.1, 0], fov: 44 }, keywords: ['perdieron', '72.000'],
    actors: [
      { type: 'kiosco', pos: [-0.9, 0, -0.6], p: { w: 1.1, h: 1.8, down: 0.1, dur: 0.9 } },
      { type: 'person', pos: [-0.9, 0, 0.35], rot: [0, 0, 0], p: { ...KIOSQUERO, pose: 'sad' }, out: 'perdieron' },
      { type: 'person', pos: [-0.9, 0, 0.35], rot: [0, 1.6, 0], at: 'perdieron', enter: 'none', p: { ...KIOSQUERO, pose: 'walk' }, move: { to: [0.9, 0, 0.9], at: 'perdieron', dur: 2.0 } },
      { type: 'crowd', pos: [0.8, 0, -1.3], at: '72.000', p: { n: 12, area: [1.8, 1.2], seed: 7, sc: 0.6, pose: 'sad', stagger: 0.03 } },
    ],
    overlays: [{ type: 'big', text: 'UNOS 72.000 EMPLEOS MENOS', at: '72.000', red: true, size: 50, y: 58 },
      P2('1 O 2 EMPLEOS POR KIOSCO · ESTIMACIÓN DE UKRA', 'empleos', { size: 32 }), FUENTE()] },

  // 6. la compra al pasar: el chocolate
  { id: 'b06', set: 'room', cam: { from: [0.8, 2.2, 7.0], to: [-0.1, 2.0, 6.3], look: [0, 1.15, 0], fov: 44 }, keywords: ['comprás', 'pasar,', 'chocolate.'],
    actors: [
      { type: 'pared', p: {} },
      { type: 'kiosco', pos: [0.55, 0, -0.5], p: { w: 1.2, h: 1.85, seed: 4 } },
      { type: 'person', pos: [-2.0, 0, 0.6], rot: [0, PI / 2, 0], p: { ...CLIENTE, pose: 'walk' }, move: { to: [-0.35, 0, 0.6], at: 0, dur: 1.4 }, out: 'pasar' },
      { type: 'person', pos: [-0.35, 0, 0.6], rot: [0, 0.5, 0], at: 'pasar', enter: 'none', p: { ...CLIENTE, pose: 'hold' } },
      { type: 'choco', pos: [-0.3, 1.95, 0.7], s: 0.7, at: 'chocolate', bob: 0.05, p: {} },
      { type: 'coins', pos: [0.15, 0.9, 0.2], at: 'pasar', enter: 'none', p: { n: 2, dur: 0.3, r: 0.13 } },
    ],
    overlays: [P1('COMPRA AL PASAR', 'pasar', { size: 48 }), FUENTE()] },

  // 7. gasto hormiga: lo primero que se cortó
  { id: 'b07', set: 'void', cam: { from: [-0.5, 2.6, 6.4], to: [0.3, 2.4, 5.8], look: [0, 0.3, -1.0], fov: 44 }, keywords: ['hormiga,', 'cortó.'],
    actors: [
      { type: 'kiosco', pos: [0.2, 0, -2.4], p: { w: 1.2, h: 1.55, down: W('b07', 'cortó'), dur: 0.5, seed: 1 } },
      { type: 'hormigas', pos: [0, 0, -1.0], rot: [0, -0.35, 0], s: 1.2, p: { n: 4, speed: 0.45, gap: 0.5, len: 2.0 }, out: 'cortó' },
      { type: 'hormigas', pos: [0, 0, -1.0], rot: [0, -0.35, 0], s: 1.2, at: 'cortó', enter: 'none', p: { n: 4, speed: 0.0, gap: 0.5, len: 2.0, carry: false } },
      { type: 'cross', pos: [0, 0.9, -1.0], at: 'cortó', p: { size: 0.7 } },
    ],
    overlays: [P1('«GASTO HORMIGA»', 'hormiga', { size: 52 }), P2('LO PRIMERO QUE SE CORTÓ', 'cortó', { red: true, size: 40 }), FUENTE()] },

  // 8. el alfajor va a contramano
  { id: 'b08', set: 'room', cam: { from: [0.6, 2.2, 6.6], to: [-0.2, 2.0, 6.0], look: [0, 1.2, -0.3], fov: 44 }, keywords: ['contramano.'],
    actors: [
      { type: 'pared', p: {} },
      { type: 'choco', pos: [-0.95, 1.0, 0], s: 0.6, p: { wrap: C.blue } },
      { type: 'choco', pos: [-0.35, 0.75, 0.3], s: 0.6, p: { wrap: '#ff7a3d' } },
      { type: 'arrow', pos: [-0.65, 2.15, 0.1], rot: [0, 0, PI], s: 0.55, at: 0.15, enter: 'none', p: { len: 1.1, color: C.red, dur: 0.4 } },
      { type: 'alfajor', pos: [0.75, 1.0, 0.2], rot: [0.15, -0.5, 0], s: 1.0, bob: 0.04, p: {} },
      { type: 'arrow', pos: [0.75, 1.45, 0.2], s: 0.55, at: 'contramano', enter: 'none', p: { len: 1.1, color: C.green, dur: 0.4 } },
    ],
    overlays: [P1('A CONTRAMANO', 'contramano', { size: 52, color: '#1f9d55' }), FUENTE()] },

  // 9. 2.º que más crece entre los chocolates (esquema)
  { id: 'b09', set: 'void', cam: { from: [-0.6, 2.5, 8.2], to: [0.2, 2.3, 7.4], look: [0, 1.35, 0], fov: 44 }, keywords: ['crece', 'chocolates,', 'consultora.'],
    actors: [
      { type: 'ring', pos: [0, 0.03, 0.2], p: { r: 1.45, color: '#8a6bff' } },
      { type: 'bars', pos: [0, 0, 0], at: 0, enter: 'none', p: { vals: [2.5, 2.0, 1.4, 0.9], colors: ['#8a6bff', C.gold, '#8a6bff', '#8a6bff'], w: 0.5, gap: 0.22, dur: 0.6, stagger: 0.15 } },
      { type: 'choco', pos: [-1.08, 2.8, 0], s: 0.45, at: 'crece', p: { wrap: C.blue } },
      { type: 'alfajor', pos: [-0.36, 2.35, 0.1], rot: [0.15, 0.4, 0], s: 0.7, at: 'chocolates', bob: 0.04, p: {} },
      { type: 'choco', pos: [0.36, 1.7, 0], s: 0.45, at: 'chocolates', p: { wrap: '#ff7a3d' } },
      { type: 'choco', pos: [1.08, 1.2, 0], s: 0.45, at: 'chocolates', p: { wrap: C.magenta } },
    ],
    overlays: [P1('2.º QUE MÁS CRECE ENTRE LOS CHOCOLATES', 'crece', { size: 36 }), P2('SEGÚN NIELSENIQ', 'consultora', { size: 38 }), FUENTE()] },

  // 10. 85 por persona al año, +10 millones por día
  { id: 'b10', set: 'void', cam: { from: [0.8, 2.5, 8.0], to: [-0.1, 2.3, 7.2], look: [0, 1.35, 0], fov: 44 }, keywords: ['argentino', '85', '10 millones'],
    actors: [
      { type: 'ring', pos: [-0.9, 0.03, 0.3], p: { r: 0.6, color: C.cyan } },
      { type: 'person', pos: [-0.9, 0, 0.3], rot: [0, 0.4, 0], p: { ...CLIENTE, pose: 'hold' } },
      { type: 'alfajor', pos: [-0.9, 1.15, 0.65], s: 0.45, at: 'come', p: { wrap: C.gold } },
      { type: 'pila', pos: [0.65, 0, 0.1], at: '85', enter: 'none', p: { n: 12, dur: 1.4, r: 0.32 } },
      { type: 'crowd', pos: [0.2, 0, -1.9], at: 'millones', p: { n: 24, area: [3.2, 1.2], seed: 3, sc: 0.55, pose: 'hold', stagger: 0.02 } },
    ],
    overlays: [P1('85 ALFAJORES POR PERSONA AL AÑO', '85', { size: 40, out: 'millones' }),
      { type: 'big', text: '+10 MILLONES POR DÍA', sub: 'SEGÚN EL SECTOR', at: 'millones', size: 66, y: 57 }, FUENTE()] },

  // 11. para una parte de la gente reemplaza una comida
  { id: 'b11', set: 'room', cam: { from: [-0.6, 2.4, 5.6], to: [0.2, 2.2, 5.0], look: [0, 1.0, -0.3], fov: 44 }, keywords: ['sector,', 'reemplaza', 'comida.'],
    actors: [
      { type: 'pared', p: {} },
      { type: 'desk', pos: [0, 0, -0.3] },
      { type: 'plato', pos: [-0.25, 0.82, -0.25], p: { r: 0.36 } },
      { type: 'alfajor', pos: [-0.25, 0.99, -0.25], rot: [-PI / 2 + 0.25, 0, 0], s: 0.6, at: 'reemplaza', p: { wrap: C.gold } },
      { type: 'gaseosa', pos: [0.5, 0.82, -0.3], s: 0.75, at: 'comida', p: {} },
      { type: 'person', pos: [-1.05, 0, 0.2], rot: [0, 0.7, 0], s: 0.85, p: { shirt: '#8a6bff', hair: '#7a3b1a', pose: 'idle' }, out: 'gente' },
      { type: 'person', pos: [-1.05, 0, 0.2], rot: [0, 0.7, 0], s: 0.85, at: 'gente', enter: 'none', p: { shirt: '#8a6bff', hair: '#7a3b1a', pose: 'shrug' } },
    ],
    overlays: [P1('REEMPLAZO DE COMIDAS · SEGÚN EL SECTOR', 'reemplaza', { size: 38 }), P2('SUELE VENIR EN PROMO CON GASEOSA', 'comida', { size: 36 }), FUENTE()] },

  // 12. UCA: el 61% se saltó una comida en el trabajo por plata
  { id: 'b12', set: 'void', cam: { from: [0.7, 2.5, 7.8], to: [-0.2, 2.3, 7.0], look: [0, 1.1, 0], fov: 44 }, keywords: ['encuesta', 'Universidad', '61%', 'trabajadores', 'plata.'],
    actors: [
      ...[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => ({ type: 'person', pos: [-1.2 + (i % 5) * 0.6, 0, i < 5 ? -0.6 : 0.4] as any, s: 0.72, at: i < 5 ? 0 : 0.1 + (i - 5) * 0.05, enter: (i < 5 ? 'none' : 'pop') as any, out: i < 6 ? 'saltó' : undefined,
        p: { shirt: ['#3b4a8a', '#8a6bff', C.cyan, '#2a7a6a', '#6b5aa8'][i % 5], hair: ['#3a2a1a', '#15102b', '#c98a3a', '#7a3b1a'][i % 4], pose: 'idle', phase: i } })),
      ...[0, 1, 2, 3, 4, 5].map((i) => ({ type: 'person', pos: [-1.2 + (i % 5) * 0.6, 0, i < 5 ? -0.6 : 0.4] as any, s: 0.72, at: 'saltó', enter: 'none' as const,
        p: { shirt: ['#3b4a8a', '#8a6bff', C.cyan, '#2a7a6a', '#6b5aa8'][i % 5], hair: ['#3a2a1a', '#15102b', '#c98a3a', '#7a3b1a'][i % 4], pose: 'sad', phase: i } })),
      ...[0, 1, 2, 3, 4, 5].map((i) => ({ type: 'ring', pos: [-1.2 + (i % 5) * 0.6, 0.03, i < 5 ? -0.6 : 0.4] as any, at: 'saltó', p: { r: 0.28, color: C.red } })),
    ],
    overlays: [{ type: 'big', text: '61%', at: '61%', red: true, size: 110, y: 54 },
      P1('SE SALTÓ UNA COMIDA EN EL TRABAJO POR PLATA', 'saltó', { size: 34 }),
      P2('UCA · ENCUESTA A 1.171 ASALARIADOS FORMALES', 'plata', { size: 32 }), FUENTE()] },

  // 13. el gremio, desde 1944: nunca una caída así (esquema)
  { id: 'b13', set: 'void', cam: { from: [-0.7, 2.5, 8.0], to: [0.2, 2.3, 7.3], look: [0, 1.4, 0], fov: 44 }, keywords: ['1944', 'caída'],
    actors: [
      { type: 'calendar', pos: [-0.75, 2.5, -0.6], rot: [0, 0.2, 0], s: 0.55, p: { top: 'DESDE', big: '1944', color: C.blue } },
      { type: 'bars', pos: [-0.35, 0, 0], at: 0.1, enter: 'none', p: { vals: [1.5, 1.6, 1.55, 1.7, 1.65], colors: [C.cyan], w: 0.32, gap: 0.12, dur: 0.4, stagger: 0.12 } },
      { type: 'bars', pos: [1.05, 0, 0], at: 'caída', enter: 'none', p: { vals: [0.85], colors: [C.red], w: 0.32, dur: 0.5 } },
      { type: 'arrow', pos: [1.05, 2.0, 0.2], rot: [0, 0, PI], s: 0.5, at: 'caída', enter: 'none', p: { len: 0.8, color: C.red, dur: 0.4 } },
    ],
    overlays: [P1('UKRA · DESDE 1944', '1944', { size: 46 }), P2('NUNCA REGISTRÓ UNA CAÍDA ASÍ EN SU PADRÓN', 'así', { red: true, size: 34 }), FUENTE()] },

  // 14. vuelve la cuadra: persianas bajas y la pila de alfajores más alta
  { id: 'b14', set: 'void', cam: { from: [0.8, 2.4, 8.0], to: [-0.2, 2.2, 7.0], look: [0, 1.1, 0], fov: 44 }, keywords: ['persianas', 'vendido.'],
    actors: [
      ...fila([-1.6, -0.55, 0.5, 1.55], -1.6, () => ({ closed: true, sign: '' }), { s: 0.85 }),
      ...fila([-1.5, -0.5, 0.5, 1.5], 0, (i) => (i === 1 ? {} : i === 0 ? { closed: true } : { down: W('b14', 'persianas') + (i - 2) * 0.25, dur: 0.5 })),
      { type: 'ring', pos: [-0.5, 0.03, 0.8], at: 'alfajor', p: { r: 0.5, color: C.gold } },
      { type: 'pila', pos: [-0.5, 0, 0.8], at: 'alfajor', enter: 'none', p: { n: 9, dur: 1.4, r: 0.28 } },
    ],
    overlays: [P1('+53.000 PERSIANAS BAJAS', 'persianas', { red: true, size: 48, out: 'alfajor' }), P1('EL ALFAJOR, CADA VEZ MÁS VENDIDO', 'vendido', { size: 40 }), FUENTE()] },

  // 15. pregunta a los de adentro
  { id: 'b15', set: 'room', cam: { from: [-0.6, 2.2, 6.4], to: [0.2, 2.0, 5.7], look: [0, 1.1, -0.4], fov: 44 }, keywords: ['kiosco,', 'sale'],
    actors: [
      { type: 'pared', p: {} },
      { type: 'kiosco', pos: [0.45, 0, -0.9], p: { w: 1.4, h: 1.95, seed: 2 } },
      { type: 'person', pos: [-1.05, 0, 0.1], rot: [0, 0.35, 0], p: { ...KIOSQUERO, pose: 'idle' }, out: 'contá' },
      { type: 'person', pos: [-1.05, 0, 0.1], rot: [0, 0.35, 0], at: 'contá', enter: 'none', p: { ...KIOSQUERO, pose: 'point' } },
      { type: 'alfajor', pos: [-0.45, 1.85, 0.45], s: 0.45, at: 'sale', bob: 0.05, p: { wrap: C.gold } },
      { type: 'choco', pos: [-0.45, 1.4, 0.45], s: 0.45, at: 'sale', bob: 0.05, p: {} },
      { type: 'label', pos: [-0.45, 2.22, 0.45], at: 'hoy', bob: 0.05, p: { text: '?', w: 0.5, h: 0.5, size: 0.95, color: C.gold, weight: 900 } },
    ],
    overlays: [P1('¿TENÉS O TUVISTE UN KIOSCO?', 'kiosco', { size: 46 }), P2('CONTÁ QUÉ ES LO QUE MÁS SALE HOY', 'sale', { size: 40 })] },
];
