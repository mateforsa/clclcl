import type { BeatSpec } from '../../src/Beat';
import timing from './timing.json';

// Video suelto (no es serie). Look propio: un living de día (props.tsx) con pared verde botella oscura arriba, piso de tablas
// miel, alfombra terracota, ventana con cielo de día. Imagen que abre y cierra: las dos pilas de billetes sobre la mesa baja
// (planos 3-5 y 15). Pilas a escala: 2025 = 26.392 y 2026 = 26.814 (1,5 u por 26.392 M); julio 3.319 y octubre 3.020 (0,2 u por
// 1.000 M); 1.100 y 500 (0,5 u por 1.000 M).
// Textos 2D = solo los de "## Placas por plano" (tags, sin pill), borde inferior <= 1450 px, fuentes planos 2 a 15.
// Sin carteles 3D con datos: solo las iniciales del calendario del plano 6.
const PI = Math.PI;
const PANEL = 'rgba(14,22,20,.92)';
const fit = (text: string, max: number, px = 820) => Math.min(max, Math.floor(px / (text.length * 0.64)));
const P1 = (text: string, at: any, o: any = {}) => ({ type: 'tag' as const, text, at, x: 46, y: 63.5, color: PANEL, size: fit(text, 46), ...o });
const P2 = (text: string, at: any, o: any = {}) => ({ type: 'tag' as const, text, at, x: 46, y: 68, color: PANEL, size: fit(text, 40), ...o });
const SMALL = (text: string, y: number, at: any = 0) => ({ type: 'tag' as const, text, at, x: 46, y, color: 'rgba(14,22,20,.8)', size: 20 });

const B = (timing as any).beats as { id: string; start: number; end: number; words: { w: string; s: number; e: number }[] }[];
const DUR = (id: string) => { const b = B.find((x) => x.id === id)!; return b.end - b.start; };
/** at negativo grande = medio segundo antes del inicio del plano: el pop ya terminó en el cuadro 0 */
const PRE = (id: string) => -(DUR(id) + 0.5);
/** segundos desde el inicio del plano hasta la palabra EXACTA `word` (n-ésima aparición) */
const W = (id: string, word: string, nth = 1): number => {
  const b = B.find((x) => x.id === id)!; let k = nth;
  for (const w of b.words) if ((w.w === word || w.w.split(' ')[0] === word) && --k === 0) return w.s - b.start;
  throw new Error(`[${id}] no está "${word}"`);
};
const FU = [SMALL('FUENTE: BCRA, BALANCE CAMBIARIO OCT. 2026', 72.2), SMALL('INFOBAE Y ÁMBITO, 27/11/2026', 74.0)];

const WORLD = { type: 'world', p: {} };
const SINVEN = { type: 'world', p: { win: false } };
const S = 1.5 / 26392; // alto por millón de las pilas anuales
const H25 = 26392 * S, H26 = 26814 * S;
const MESA = (z = 0, w = 2.4) => ({ type: 'mesa', pos: [0, 0, z] as any, p: { w, d: 1.0, h: 0.32 } });
const TOP = 0.36; // alto de la mesa baja
const PERS = [
  { shirt: '#c8553d', pants: '#2b2f3a', skin: '#c98d62', hair: '#2a1a10' },
  { shirt: '#e7b53c', pants: '#3a3226', skin: '#f2c39b', hair: '#5a3a1a' },
  { shirt: '#4f86a8', pants: '#232a33', skin: '#8a5a3c', hair: '#15102b' },
  { shirt: '#efe3c6', pants: '#41352b', skin: '#ffd9b8', hair: '#7a3b1a' },
  { shirt: '#6f9a5e', pants: '#2b2f3a', skin: '#c98d62', hair: '#15102b' },
  { shirt: '#a9503a', pants: '#3a3226', skin: '#f2c39b', hair: '#3a2a1a' },
];

export const BEATS: BeatSpec[] = [
  // 1. Octubre de 2026. 1,7 millones de personas compran dólares en la Argentina.
  { id: 'b01', set: 'room', cam: { from: [1.0, 2.3, 8.4], to: [0.3, 2.15, 7.6], look: [0, 1.05, -0.4], fov: 44, shift: -0.08 }, keywords: ['2026.', '1,7 millones de'],
    actors: [WORLD,
      { type: 'mostrador', pos: [-0.9, 0, -1.6], p: { w: 2.4 } },
      { type: 'person', pos: [-0.9, 0, -2.25], s: 0.85, p: { shirt: '#2f4f6b', pants: '#232a33', skin: '#f2c39b', hair: '#15102b', pose: 'idle' } },
      ...[0, 1, 2, 3, 4, 5].map((i) => ({ type: 'cliente', pos: [-0.75 + i * 0.5, 0, -0.85 + i * 0.42] as any, rot: [0, Math.atan2(-0.5, -0.42), 0] as any, s: 0.78,
        at: i < 2 ? undefined : W('b01', '1,7') + (i - 2) * 0.16, p: { ...PERS[i], phase: i * 1.3, fajoAt: i === 0 ? W('b01', 'compran') : undefined } })),
    ],
    overlays: [P1('OCTUBRE 2026', PRE('b01')), P2('1,7 MILLONES DE PERSONAS', '1,7')] },

  // 2. Suman 3.020 millones, según el Banco Central.
  { id: 'b02', set: 'room', cam: { from: [-0.6, 2.0, 6.6], to: [-0.15, 1.9, 6.0], look: [0, 0.9, 0], fov: 44, shift: -0.08 }, keywords: ['3.020 millones,', 'Central.'],
    actors: [WORLD, MESA(0, 2.0),
      { type: 'pila', pos: [0, TOP, 0], p: { h0: 0.05, h1: 3020 * 0.0002, at: W('b02', '3.020'), dur: 1.3, w: 0.7, d: 0.36 } },
      { type: 'pila', pos: [-0.7, TOP, 0.1], p: { h0: 0.07, w: 0.34, d: 0.17 } },
      { type: 'pila', pos: [0.72, TOP, -0.05], p: { h0: 0.1, w: 0.34, d: 0.17 } },
      { type: 'ring', pos: [0, 0.03, 0], at: '3.020', p: { r: 1.15, color: '#e7b53c' } },
    ],
    overlays: [P1('US$ 3.020 MILLONES', '3.020'), P2('SEGÚN EL BCRA', 'Central.'), ...FU] },

  // 3. Y con ese mes, el año ya le ganó a todo 2025.
  { id: 'b03', set: 'room', cam: { from: [0.7, 2.3, 7.4], to: [0.2, 2.2, 6.8], look: [0, 1.0, 0], fov: 44, shift: -0.08 }, keywords: ['ganó', '2025.'],
    actors: [WORLD, MESA(),
      { type: 'pila', pos: [-0.55, TOP, 0], p: { h0: H25, w: 0.7, d: 0.36 } },
      { type: 'pila', pos: [0.55, TOP, 0], p: { h0: H26 * 0.6, h1: H26, at: W('b03', 'año') - 0.4, dur: W('b03', 'ganó') - W('b03', 'año') + 0.7, w: 0.7, d: 0.36 } },
      { type: 'nivel', pos: [0, TOP + H25 + 0.012, 0.2], at: 'mes,', p: { w: 2.0 } },
    ],
    overlays: [P1('MÁS QUE EN TODO 2025', '2025.'), ...FU] },

  // 4. La pila de 2025 llegó a 26.392 millones.
  { id: 'b04', set: 'room', cam: { from: [-1.1, 2.1, 6.2], to: [-0.75, 2.0, 5.7], look: [-0.45, 1.1, 0], fov: 44, shift: -0.08 }, keywords: ['pila', '26.392 millones.'],
    actors: [WORLD, MESA(),
      { type: 'pila', pos: [-0.55, TOP, 0], p: { h0: H25, w: 0.7, d: 0.36, lit: W('b04', '2025') } },
      { type: 'pila', pos: [0.55, TOP, 0], p: { h0: H26, w: 0.7, d: 0.36 } },
      { type: 'ring', pos: [-0.55, 0.03, 0], at: '2025', p: { r: 0.7, color: '#e7b53c' } },
    ],
    overlays: [P1('2025: US$ 26.392 MILLONES', '26.392'), ...FU] },

  // 5. La nueva, de enero a octubre, ya suma 26.814 millones.
  { id: 'b05', set: 'room', cam: { from: [1.2, 2.1, 6.2], to: [0.85, 2.0, 5.7], look: [0.45, 1.1, 0], fov: 44, shift: -0.08 }, keywords: ['nueva,', '26.814 millones.'],
    actors: [WORLD, MESA(),
      { type: 'pila', pos: [-0.55, TOP, 0], p: { h0: H25, w: 0.7, d: 0.36 } },
      { type: 'pila', pos: [0.55, TOP, 0], p: { h0: H26, w: 0.7, d: 0.36, lit: W('b05', 'nueva,') } },
      { type: 'nivel', pos: [0, TOP + H25 + 0.012, 0.2], p: { w: 2.0 } },
      { type: 'ring', pos: [0.55, 0.03, 0], at: 'nueva,', p: { r: 0.7, color: '#6f9a5e' } },
    ],
    overlays: [P1('2026 (ENE-OCT): US$ 26.814 MILLONES', '26.814'), SMALL('ESQUEMA, NO A ESCALA', 70.4, -1.3), ...FU] },

  // 6. En 2025 el cepo siguió hasta abril, y los primeros tres meses casi no hubo compras.
  { id: 'b06', set: 'room', cam: { from: [0.4, 1.7, 7.9], to: [0.05, 1.6, 7.3], look: [0, 1.2, 0], fov: 44, shift: -0.08 }, keywords: ['cepo', 'abril,', 'compras.'],
    actors: [SINVEN,
      { type: 'meses', pos: [0, 1.37, -0.2], p: { at: -1, step: 0.04, gray: [0, 1, 2], grayAt: W('b06', 'primeros') } },
      { type: 'box', pos: [0, 0.45, -0.25], p: { size: [3.1, 0.9, 0.4], color: '#5a3a24' } },
      { type: 'candado', pos: [-0.69, 1.86, -0.2], at: 'cepo', p: { openAt: W('b06', 'abril,'), s: 0.55 } },
    ],
    overlays: [P1('CEPO HASTA ABRIL 2025', 'abril,'), P2('ENE-MAR 2025: CASI SIN COMPRAS', 'compras.'), ...FU] },

  // 7. Octubre fue el segundo mes más alto del año.
  { id: 'b07', set: 'room', cam: { from: [0.9, 1.95, 5.8], to: [0.5, 1.85, 5.2], look: [0.1, 0.85, 0], fov: 44, shift: -0.08 }, keywords: ['segundo', 'año.'],
    actors: [WORLD,
      { type: 'podio', pos: [0, 0, 0], p: { h1: 0.5, h2: 0.32 } },
      { type: 'pila', pos: [0.46, 0.34, 0], at: 'segundo', enter: 'pop', p: { h0: 3020 * 0.0002, w: 0.5, d: 0.26 } },
      { type: 'hueco', pos: [-0.46, 0.52 + 3319 * 0.0001, 0], at: 'alto', p: { w: 0.5, h: 3319 * 0.0002, d: 0.26 } },
    ],
    overlays: [P1('2.º MES MÁS ALTO DE 2026', 'segundo'), P2('+US$ 124 M VS. SEPTIEMBRE', 'año.'), ...FU] },

  // 8. Solo julio estuvo arriba.
  { id: 'b08', set: 'room', cam: { from: [-0.9, 2.05, 5.6], to: [-0.6, 1.95, 5.1], look: [-0.15, 0.9, 0], fov: 44, shift: -0.08 }, keywords: ['julio', 'arriba.'],
    actors: [WORLD,
      { type: 'podio', pos: [0, 0, 0], p: { h1: 0.5, h2: 0.32 } },
      { type: 'pila', pos: [0.46, 0.34, 0], p: { h0: 3020 * 0.0002, w: 0.5, d: 0.26 } },
      { type: 'pila', pos: [-0.46, 0.52, 0], at: 'julio', enter: 'pop', p: { h0: 3319 * 0.0002, w: 0.5, d: 0.26, lit: W('b08', 'julio') + 0.3 } },
    ],
    overlays: [P1('JULIO: US$ 3.319 MILLONES', 'julio'), ...FU] },

  // 9. Y son compras brutas, sin restar lo que otros vendieron.
  { id: 'b09', set: 'room', cam: { from: [0.3, 2.3, 7.3], to: [-0.1, 2.15, 6.7], look: [0, 1.0, -0.6], fov: 44, shift: -0.08 }, keywords: ['brutas,', 'vendieron.'],
    actors: [WORLD,
      { type: 'mostrador', pos: [0, 0, -1.4], p: { w: 3.0 } },
      { type: 'pila', pos: [-1.25, 1.06, -1.35], p: { h0: 0.45, w: 0.5, d: 0.26 } },
      { type: 'cliente', pos: [-0.75, 0, -0.35], rot: [0, PI, 0], s: 0.8, p: { ...PERS[0], fajoAt: W('b09', 'compras') } },
      { type: 'cliente', pos: [0.8, 0, -0.35], rot: [0, PI, 0], s: 0.8, at: 'sin', p: { ...PERS[2], fajoAt: W('b09', 'sin'), pose: 'hold' }, out: 'otros' },
      { type: 'person', pos: [0.8, 0, -0.35], rot: [0, PI, 0], s: 0.8, at: 'otros', enter: 'none', p: { ...PERS[2], pose: 'idle' } },
      { type: 'pila', pos: [0.75, 1.42, -0.95], at: 'otros', enter: 'none', move: { to: [0.75, 1.06, -1.35], at: 'otros', dur: 0.5 }, p: { h0: 0.08, w: 0.3, d: 0.15 } },
    ],
    overlays: [P1('BRUTO: SIN RESTAR VENTAS', 'brutas,'), ...FU] },

  // 10. Ahora, adónde fueron.
  { id: 'b10', set: 'room', cam: { from: [0.0, 2.6, 8.6], to: [0.0, 2.45, 7.9], look: [0, 0.75, -0.3], fov: 44, shift: -0.08 }, keywords: ['adónde'],
    actors: [WORLD, MESA(0.3, 1.4),
      { type: 'pila', pos: [0, TOP, 0.3], p: { h0: 0.6, w: 0.6, d: 0.3 } },
      { type: 'colchon', pos: [-1.55, 0, -1.2], rot: [0, 0.35, 0], s: 0.8 },
      { type: 'banco', pos: [1.55, 0, -1.2], rot: [0, -0.35, 0], s: 0.75 },
      { type: 'ruta', pos: [-0.25, 0.75, 0.3], at: 'adónde', p: { to: [-1.05, -0.4, -1.3], h: 0.5 } },
      { type: 'ruta', pos: [0.25, 0.75, 0.3], at: W('b10', 'adónde') + 0.2, p: { to: [1.05, -0.2, -1.3], h: 0.5 } },
    ] },

  // 11. Según el Banco Central, cuatro de cada diez dólares que compraron personas y empresas quedaron fuera de los bancos del país.
  { id: 'b11', set: 'room', cam: { from: [-0.5, 2.25, 7.2], to: [0.1, 2.1, 6.5], look: [0, 0.85, -0.2], fov: 44, shift: -0.08 }, keywords: ['cuatro', 'diez', 'fuera'],
    actors: [WORLD, MESA(0.35, 2.6),
      ...Array.from({ length: 10 }, (_, i) => {
        const x = -1.08 + i * 0.24; const out = i < 4; const tm = W('b11', 'quedaron') + i * 0.12;
        return { type: 'pila', pos: [x, TOP, 0.35] as any, ...(out ? { move: { to: [-1.45 + i * 0.17, 0.19, -1.15] as any, at: tm, dur: 0.7 } } : {}),
          p: { h0: 0.1, w: 0.18, d: 0.32, lit: out ? W('b11', 'cuatro') + 0.3 : undefined, hop: out ? { at: tm, dur: 0.7, h: 0.35 } : undefined } };
      }),
      { type: 'ring', pos: [0, 0.03, 0.35], at: 'diez', p: { r: 1.35, color: '#e7b53c' } },
      { type: 'colchon', pos: [-1.2, 0, -1.3], rot: [0, 0.15, 0], s: 0.8, p: { lift: [[0, 0], [W('b11', 'quedaron') - 0.3, 0], [W('b11', 'quedaron') + 0.3, 1], [W('b11', 'quedaron') + 1.4, 1]] } },
      { type: 'banco', pos: [1.5, 0, -1.5], rot: [0, -0.3, 0], s: 0.6 },
    ],
    overlays: [P1('4 DE CADA 10', 'cuatro'), P2('FUERA DE LOS BANCOS DEL PAÍS', 'bancos'), SMALL('PERSONAS Y EMPRESAS · ESTIMACIÓN BCRA', 70.4, -1.6), ...FU] },

  // 12. Unos 1.100 millones, en billetes guardados o afuera.
  { id: 'b12', set: 'room', cam: { from: [-0.6, 2.0, 6.3], to: [-0.3, 1.9, 5.7], look: [0.0, 0.7, -0.3], fov: 44, shift: -0.08 }, keywords: ['1.100 millones,', 'guardados', 'afuera.'],
    actors: [SINVEN,
      { type: 'colchon', pos: [-0.5, 0, -0.6], p: { lift: [[0, 0.3], [0.25, 1]] } },
      { type: 'pila', pos: [-0.5, 0.22, -0.35], p: { h0: 0.1, h1: 1100 * 0.0004, at: W('b12', '1.100'), dur: 1.2, w: 0.6, d: 0.3 } },
      { type: 'valija', pos: [0.4, 0, 0.15], rot: [0, -0.4, 0], at: 'afuera.' },
      { type: 'pila', pos: [0.4, 0.62, 0.15], rot: [0, -0.4, 0], at: W('b12', 'afuera.') + 0.2, p: { h0: 0.08, w: 0.4, d: 0.2 } },
    ],
    overlays: [P1('~US$ 1.100 MILLONES', '1.100'), P2('BILLETES GUARDADOS O ACTIVOS AFUERA', 'afuera.'), ...FU] },

  // 13. Es la proporción más alta desde la salida del cepo.
  { id: 'b13', set: 'room', cam: { from: [0.6, 1.8, 5.6], to: [0.2, 1.7, 5.0], look: [0, 0.95, 0], fov: 44, shift: -0.08 }, keywords: ['proporción', 'alta', 'cepo.'],
    actors: [WORLD,
      { type: 'box', pos: [0, 0.3, 0], p: { size: [2.2, 0.6, 0.8], color: '#5a3a24' } },
      { type: 'medidor', pos: [-0.3, 0.6, 0], p: { kf: [[0, 0.3], [W('b13', 'proporción'), 0.3], [W('b13', 'alta') + 0.2, 0.92]] } },
      { type: 'candado', pos: [0.75, 0.6, 0.1], rot: [0, -0.3, 0], at: 'salida', p: { openAt: 0, s: 0.8 } },
    ],
    overlays: [P1('MÁXIMO DESDE LA SALIDA DEL CEPO (ABRIL 2025)', 'proporción'), ...FU] },

  // 14. En los bancos de acá quedaron apenas 500 millones.
  { id: 'b14', set: 'room', cam: { from: [0.5, 2.0, 6.4], to: [0.2, 1.9, 5.8], look: [0.05, 0.75, -0.3], fov: 44, shift: -0.08 }, keywords: ['bancos', '500 millones.'],
    actors: [WORLD,
      { type: 'banco', pos: [0.7, 0, -0.8], s: 0.9, p: {} },
      { type: 'pila', pos: [0.7, 0, 0.2], at: 'apenas', p: { h0: 500 * 0.0004, w: 0.5, d: 0.26, lit: W('b14', '500') } },
      { type: 'colchon', pos: [-0.75, 0, -0.6], rot: [0, 0.3, 0], s: 0.7, p: { lift: [[0, 1]] } },
      { type: 'pila', pos: [-0.6, 0, 0.2], p: { h0: 1100 * 0.0004, w: 0.5, d: 0.26 } },
    ],
    overlays: [P1('EN BANCOS LOCALES: US$ 500 MILLONES', '500'), P2('EL MENOR DESDE NOVIEMBRE 2025', -1.2), ...FU] },

  // 15. La pila nueva ya es más alta, y le quedan dos meses para crecer.
  { id: 'b15', set: 'room', cam: { from: [-0.7, 2.4, 7.6], to: [-0.2, 2.25, 6.9], look: [0, 1.15, 0], fov: 44, shift: -0.08 }, keywords: ['nueva', 'alta,', 'crecer.'],
    actors: [WORLD, MESA(),
      { type: 'pila', pos: [-0.55, TOP, 0], p: { h0: H25, w: 0.7, d: 0.36 } },
      { type: 'pila', pos: [0.55, TOP, 0], p: { h0: H26, w: 0.7, d: 0.36, lit: W('b15', 'nueva') } },
      { type: 'nivel', pos: [0, TOP + H25 + 0.012, 0.2], p: { w: 2.0 } },
      { type: 'hueco', pos: [0.55, TOP + H26 + 0.1, 0], at: 'dos', p: { w: 0.7, h: 0.18, d: 0.36 } },
      { type: 'hueco', pos: [0.55, TOP + H26 + 0.3, 0], at: W('b15', 'dos') + 0.2, p: { w: 0.7, h: 0.18, d: 0.36 } },
    ],
    overlays: [P1('2026 > 2025', 'alta,'), P2('FALTAN NOVIEMBRE Y DICIEMBRE', 'crecer.'), ...FU] },

  // 16. ¿Y vos? ¿Colchón o banco? Una palabra.
  { id: 'b16', set: 'room', cam: { from: [0.5, 2.15, 7.3], to: [0.0, 2.0, 6.6], look: [0, 0.85, -0.3], fov: 44, shift: -0.08 }, keywords: ['¿Colchón', 'banco?', 'palabra.'],
    actors: [WORLD,
      { type: 'colchon', pos: [-0.95, 0, -0.7], rot: [0, 0.3, 0], s: 0.75, p: { lift: [[0, 0], [W('b16', '¿Colchón'), 0], [W('b16', '¿Colchón') + 0.4, 0.8]] } },
      { type: 'banco', pos: [1.0, 0, -0.8], rot: [0, -0.3, 0], s: 0.7 },
      { type: 'person', pos: [0, 0, 0.6], s: 0.8, p: { ...PERS[3], pose: 'shrug' } },
      { type: 'ring', pos: [-0.95, 0.03, -0.7], at: '¿Colchón', out: 'banco?', p: { r: 0.85, color: '#e7b53c' } },
      { type: 'ring', pos: [1.0, 0.03, -0.8], at: 'banco?', p: { r: 0.85, color: '#e7b53c' } },
    ],
    overlays: [P1('¿COLCHÓN O BANCO?', '¿Colchón'), P2('UNA PALABRA', 'palabra.'), SMALL('NO ES CONSEJO DE INVERSIÓN', 72.2, PRE('b16'))] },
];
