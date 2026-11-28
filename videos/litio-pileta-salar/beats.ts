import type { BeatSpec } from '../../src/Beat';
import timing from './timing.json';

// Video suelto (no es serie). Look propio: salar de la Puna de altura (sal blanca con costra poligonal, piletas celestes, cerros
// ocres, cielo de altura que se oscurece arriba) con una planta compacta de extracción directa.
// Imagen que abre y cierra: pileta con calendario (más de un año) contra máquina con reloj (días), planos 1 y 13.
// Textos 2D = solo los de "## Placas por plano" (tags, sin pill, borde inferior <= 1450 px). Nombres y cifras solo en placas 2D,
// nunca carteles 3D. La resina (0,06% -> 0,15%) es de Fénix: la columna en corte solo aparece en el plano 7, con su placa;
// Rincón (plano 8) se muestra por fuera, sin resina a la vista. Barras de dólares a escala: 0,00102 m por millón.
// Anclas: todas con W() = palabra EXACTA del timing (evita choques por prefijo: "piletas" vs "piletas,", "salar" vs "salares,").
const PI = Math.PI;
const PANEL = 'rgba(10,14,22,.9)';
const fit = (text: string, max: number, px = 760) => Math.min(max, Math.floor(px / (text.length * 0.72)));
const P1 = (text: string, at: any, o: any = {}) => ({ type: 'tag' as const, text, at, x: 46, y: 65.5, color: PANEL, size: fit(text, 46), ...o });
const P2 = (text: string, at: any, o: any = {}) => ({ type: 'tag' as const, text, at, x: 46, y: 69.6, color: PANEL, size: fit(text, 40), ...o });
const H1 = (text: string, at: any, o: any = {}) => P1(text, at, { y: 31.5, ...o });
const H2 = (text: string, at: any, o: any = {}) => P2(text, at, { y: 36, ...o });
const SMALL = (text: string, y: number, at: any = 0, size = 20) => ({ type: 'tag' as const, text, at, x: 46, y, color: 'rgba(10,14,22,.78)', size });

const B = (timing as any).beats as { id: string; start: number; end: number; words: { w: string; s: number; e: number }[] }[];
const DUR = (id: string) => { const b = B.find((x) => x.id === id)!; return b.end - b.start; };
/** at negativo grande = medio segundo antes del inicio del plano: el pop ya terminó en el cuadro 0 */
const PRE = (id: string) => -(DUR(id) + 0.5);
/** segundos desde el inicio del plano hasta la palabra EXACTA `word` (n-ésima aparición) */
const W = (id: string, word: string, nth = 1): number => {
  const b = B.find((x) => x.id === id)!; let k = nth;
  for (const w of b.words) if (w.w === word && --k === 0) return w.s - b.start;
  throw new Error(`[${id}] no está "${word}"`);
};
const FU_LN = SMALL('FUENTE: LA NACIÓN (12/10/2026)', 73.4);
const FU_FB = SMALL('FUENTE: FORBES ARGENTINA (1/11/2026)', 73.4);
const FU_RT = SMALL('RIO TINTO · FUENTE: LA NACIÓN (12/10/2026)', 73.4);
const FU_SM = SMALL('FUENTE: SEC. DE MINERÍA VÍA ÁMBITO Y FORBES (25/11/2026)', 73.4);

const WORLD = { type: 'world', p: {} };
const K = 0.0009; // metros por millón de dólares (1.858 M = 1,67 m)
const V25 = 1858 / 2.622; // ene-oct 2025, derivado del +162,2 % (sin mostrar la cifra)

export const BEATS: BeatSpec[] = [
  // 1. Más de un año en una pileta, o unos días en una máquina.
  { id: 'b01', set: 'room', cam: { from: [0.2, 2.3, 6.4], to: [0.0, 2.1, 5.8], look: [0, 0.7, 0], fov: 44, shift: -0.035 }, keywords: ['pileta,', 'máquina.'],
    actors: [WORLD,
      { type: 'pond', pos: [-0.7, 0, 0.1], p: { w: 1.2, d: 0.95 } },
      { type: 'cal', pos: [-0.7, 1.2, 0.1], s: 0.85, at: W('b01', 'año'), p: { at: W('b01', 'año') + 0.3, rate: 4 } },
      { type: 'plant', pos: [0.85, 0, -0.1], s: 0.6, at: W('b01', 'unos'), p: { flow: W('b01', 'unos') } },
      { type: 'clock', pos: [0.85, 1.2, 0.1], s: 0.85, at: W('b01', 'días'), p: { at: W('b01', 'días'), rate: 1.6 } },
    ],
    overlays: [P1('PILETA: MÁS DE 1 AÑO', W('b01', 'pileta,')), P2('MÁQUINA: DÍAS', W('b01', 'máquina.')), FU_LN] },

  // 2. Así puede salir el litio de la Puna, según La Nación.
  { id: 'b02', set: 'room', cam: { from: [0.6, 1.5, 7.4], to: [0.2, 2.5, 7.0], look: [0, 0.35, -0.6], fov: 44, shift: -0.035 }, keywords: ['litio', 'Puna,', 'Nación.'],
    actors: [WORLD,
      { type: 'pond', pos: [-1.1, 0, -1.3], p: { w: 1.3, d: 0.8, c: '#4fc4dc' } },
      { type: 'pond', pos: [0.4, 0, -1.5], p: { w: 1.5, d: 0.9, c: '#62d0e2' } },
      { type: 'pond', pos: [-0.5, 0, -0.2], at: W('b02', 'litio'), p: { w: 1.6, d: 0.9, c: '#3fb3d0' } },
      { type: 'pond', pos: [1.1, 0, -0.3], at: W('b02', 'Puna,'), p: { w: 1.1, d: 0.8, c: '#77d8e6' } },
      { type: 'plant', pos: [1.6, 0, -2.4], s: 0.5 },
    ],
    overlays: [P1('LITIO DE LA PUNA', W('b02', 'litio')), P2('SEGÚN LA NACIÓN', W('b02', 'según')), FU_LN] },

  // 3. En los salares, el litio viene disuelto en agua muy salada, la salmuera.
  { id: 'b03', set: 'room', cam: { from: [0.4, 1.6, 5.6], to: [0.0, 1.45, 4.9], look: [0, 0.8, 0], fov: 44, shift: -0.035 }, keywords: ['salares,', 'disuelto', 'salmuera.'],
    actors: [WORLD,
      { type: 'brinecut', pos: [0, 0, -0.3], s: 0.85, p: { li: W('b03', 'litio'), salt: W('b03', 'salada,'), well: W('b03', 'salmuera.') } },
    ],
    overlays: [H1('SALMUERA = AGUA MUY SALADA CON LITIO', W('b03', 'agua'))] },

  // 4. La pileta es lo de siempre: la salmuera queda quieta y el agua se evapora.
  { id: 'b04', set: 'room', cam: { from: [-0.3, 2.3, 4.9], to: [0.0, 2.1, 4.3], look: [0, 0.15, -0.5], fov: 44, shift: -0.035 }, keywords: ['pileta', 'salmuera', 'evapora.'],
    actors: [WORLD,
      { type: 'pond', pos: [-0.15, 0, -0.5], p: { w: 2.0, d: 1.2, c: '#4fc4dc', lvl: [[W('b04', 'quieta'), 0.13], [DUR('b04'), 0.045]], vapor: W('b04', 'agua') - 0.2 } },
    ],
    overlays: [H1('PILETA DE EVAPORACIÓN', W('b04', 'pileta'))] },

  // 5. Son esas piletas celestes contra el blanco de la sal.
  { id: 'b05', set: 'room', cam: { from: [0.0, 4.4, 4.2], to: [0.0, 4.1, 3.6], look: [0, 0, -0.8], fov: 44, shift: -0.035 }, keywords: ['piletas', 'celestes', 'blanco'],
    actors: [WORLD,
      ...[[-1.0, -1.6], [0, -1.6], [1.0, -1.6], [-1.0, -0.85], [0, -0.85], [1.0, -0.85], [-1.0, -0.1], [0, -0.1], [1.0, -0.1]].map(([x, z], i) => ({
        type: 'pond', pos: [x, 0, z] as any, at: i < 3 ? undefined : W('b05', 'piletas') + (i - 3) * 0.12,
        p: { w: 0.92, d: 0.62, c: ['#4fc4dc', '#62d0e2', '#3fb3d0', '#77d8e6', '#56bcd6'][i % 5], level: 0.08 + (i % 3) * 0.02 } })),
    ],
    overlays: [P1('JUJUY · SALTA · CATAMARCA', 0.15)] },

  // 6. La máquina es la extracción directa.
  { id: 'b06', set: 'room', cam: { from: [1.3, 1.9, 4.8], to: [0.8, 1.8, 4.2], look: [0, 0.4, 0], fov: 44, shift: -0.035 }, keywords: ['máquina', 'extracción', 'directa.'],
    actors: [WORLD,
      { type: 'plant', pos: [0.1, 0, -0.2], s: 1.05, p: { flow: W('b06', 'extracción') } },
      { type: 'ring', pos: [0.1, 0.02, -0.2], at: W('b06', 'máquina'), p: { r: 0.8, color: '#27e0d8' } },
    ],
    overlays: [P1('EXTRACCIÓN DIRECTA (DLE)', W('b06', 'extracción'))] },

  // 7. Una resina atrapa el litio, sin grandes piletas, y la salmuera que sobra vuelve al salar.
  { id: 'b07', set: 'room', cam: { from: [-0.3, 1.4, 4.6], to: [0.1, 1.3, 4.0], look: [0, 0.75, 0], fov: 44, shift: -0.035 }, keywords: ['resina', 'atrapa', 'salmuera', 'salar.'],
    actors: [WORLD,
      { type: 'column', pos: [0, 0, 0], s: 0.85, p: { atrapa: W('b07', 'atrapa'), back: W('b07', 'vuelve') } },
      { type: 'ring', pos: [1.06, 0.02, 0], at: W('b07', 'vuelve'), p: { r: 0.2, color: '#3aa7ff' } },
    ],
    overlays: [P1('RESINA: 0,06% → 0,15% DE LITIO', W('b07', 'resina')), P2('ASÍ FUNCIONA EN FÉNIX, CATAMARCA', PRE('b07')), FU_FB] },

  // 8. Rincón, en Salta, va a tener capacidad para 60.000 toneladas por año con extracción directa.
  { id: 'b08', set: 'room', cam: { from: [-1.2, 2.0, 5.6], to: [-0.7, 1.9, 5.0], look: [0, 0.5, -0.4], fov: 44, shift: -0.035 }, keywords: ['Rincón,', '60.000', 'toneladas'],
    actors: [WORLD,
      { type: 'plant', pos: [0.4, 0, -0.9], s: 1.0, p: { cols: 4, flow: 0.1, back: 0.1 } },
      { type: 'bags', pos: [-0.85, 0, -0.35], p: { n: 16, at: W('b08', '60.000'), dur: 2.2, cols: 4, gap: 0.3 } },
    ],
    overlays: [P1('RINCÓN, SALTA', W('b08', 'Rincón,')), P2('60.000 T/AÑO DE CAPACIDAD', W('b08', '60.000')), FU_RT] },

  // 9. Y el litio ya deja dólares.
  { id: 'b09', set: 'room', cam: { from: [0.8, 1.9, 5.0], to: [0.45, 1.8, 4.5], look: [0, 0.35, 0], fov: 44, shift: -0.035 }, keywords: ['litio', 'dólares.'],
    actors: [WORLD,
      { type: 'box', pos: [0, 0.006, 0], p: { size: [9, 0.012, 0.8], color: '#6e6a62' } },
      { type: 'truck', pos: [-1.0, 0, 0], move: { to: [0.0, 0, 0], at: 0, dur: DUR('b09') } },
      { type: 'coins', pos: [-0.6, 0, -0.9], at: W('b09', 'dólares.'), enter: 'none', p: { n: 9, dur: 0.6, r: 0.2 } },
    ],
    overlays: [P1('EXPORTACIONES DE LITIO', W('b09', 'litio'))] },

  // 10. Entre enero y octubre de 2026 exportó 1.858 millones.
  { id: 'b10', set: 'room', cam: { from: [0.5, 1.3, 5.6], to: [0.15, 1.4, 5.0], look: [0, 1.0, 0], fov: 44, shift: -0.035 }, keywords: ['enero', 'octubre', '1.858 millones.'],
    actors: [WORLD,
      { type: 'xbars', pos: [0.35, 0, 0], p: { k: K, bars: [{ x: 0, v: 1858, c: '#ffb52e', grow: W('b10', 'Entre'), dur: W('b10', '1.858 millones.') - W('b10', 'Entre') + 0.3 }] } },
      { type: 'bags', pos: [-0.6, 0, -0.1], p: { n: 8, from: 2, at: 0, dur: 3, cols: 2, gap: 0.3 } },
    ],
    overlays: [P1('ENE-OCT 2026: US$ 1.858 MILLONES', W('b10', '1.858 millones.')), FU_SM] },

  // 11. 162 por ciento más que en esos meses de 2025.
  { id: 'b11', set: 'room', cam: { from: [-0.9, 1.3, 5.3], to: [-0.5, 1.4, 4.8], look: [0, 0.9, 0], fov: 44, shift: -0.035 }, keywords: ['162', 'más', '2025.'],
    actors: [WORLD,
      { type: 'xbars', pos: [0, 0, 0], p: { k: K, bars: [{ x: -0.5, v: V25, c: '#8d96a1', grow: W('b11', 'más'), dur: 0.8 }, { x: 0.5, v: 1858, c: '#ffb52e' }] } },
      { type: 'up', pos: [0, V25 * K + 0.1, 0.45], at: W('b11', 'que'), p: { len: (1858 - V25) * K - 0.35 } },
    ],
    overlays: [P1('+162,2% VS. ENE-OCT 2025', W('b11', '162')), FU_SM] },

  // 12. En octubre fueron 184 millones: según la Secretaría de Minería, por la suba del precio.
  { id: 'b12', set: 'room', cam: { from: [0.6, 1.6, 5.0], to: [0.3, 1.7, 4.4], look: [0, 1.05, 0], fov: 44, shift: -0.035 }, keywords: ['octubre', '184 millones:', 'Secretaría', 'precio.'],
    actors: [WORLD,
      { type: 'xbars', pos: [-0.35, 0, 0], p: { k: K, bars: [{ x: 0, v: 1858, c: '#ffb52e', hl: { v: 184, at: W('b12', 'octubre'), c: '#27e0d8' } }] } },
      { type: 'bags', pos: [0.45, 0, -0.9], at: W('b12', 'suba'), p: { n: 1, cols: 1 } },
      { type: 'up', pos: [0.45, 0.32, -0.9], at: W('b12', 'suba') + 0.2, p: { len: 0.55 } },
    ],
    overlays: [P1('OCTUBRE 2026: US$ 184 M (+61,5%)', W('b12', '184 millones:')), P2('RÉCORD DEL MES', W('b12', 'según')), FU_SM] },

  // 13. La pileta tarda más de un año. La máquina, días.
  { id: 'b13', set: 'room', cam: { from: [-0.4, 2.0, 5.6], to: [0.2, 2.2, 6.2], look: [0, 0.7, 0], fov: 44, shift: -0.035 }, keywords: ['pileta', 'año.', 'máquina,'],
    actors: [WORLD,
      { type: 'pond', pos: [-0.7, 0, 0.1], p: { w: 1.2, d: 0.95 } },
      { type: 'cal', pos: [-0.7, 1.2, 0.1], s: 0.85, p: { at: 0, rate: 4 } },
      { type: 'plant', pos: [0.85, 0, -0.1], s: 0.6, p: { flow: 0.01 } },
      { type: 'clock', pos: [0.85, 1.2, 0.1], s: 0.85, at: W('b13', 'máquina,'), p: { at: W('b13', 'máquina,'), rate: 1.6 } },
    ],
    overlays: [P1('MÁS DE 1 AÑO VS. DÍAS', W('b13', 'tarda')), P2('SEGÚN LA NACIÓN', W('b13', 'año.')), FU_LN] },

  // 14. ¿Trabajás en un salar? Contá abajo cuál usan en el tuyo.
  { id: 'b14', set: 'room', cam: { from: [0.0, 1.5, 4.6], to: [0.0, 1.45, 4.0], look: [0, 0.8, 0], fov: 44, shift: -0.035 }, keywords: ['¿Trabajás', 'salar?', 'tuyo.'],
    actors: [WORLD,
      { type: 'pond', pos: [-1.0, 0, -0.8], p: { w: 1.2, d: 0.9 } },
      { type: 'plant', pos: [1.05, 0, -0.9], s: 0.65, p: { flow: 0.01 } },
      { type: 'worker', pos: [0, 0, 0.1], rot: [0, 0, 0], s: 0.5, p: { seq: [[0, 'idle'], [W('b14', 'salar?'), 'wave'], [W('b14', 'cuál'), 'idle']] } },
      { type: 'ring', pos: [-1.0, 0.02, -0.8], at: W('b14', 'cuál'), p: { r: 0.62, color: '#27e0d8' } },
      { type: 'ring', pos: [1.05, 0.02, -0.9], at: W('b14', 'cuál') + 0.15, p: { r: 0.62, color: '#27e0d8' } },
    ],
    overlays: [H1('¿TRABAJÁS EN UN SALAR?', PRE('b14'))] },
];
