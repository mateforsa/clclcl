import type { BeatSpec } from '../../src/Beat';
import timing from './timing.json';

// Video suelto (no es serie). Formato "Argentina productiva": un muelle de puerto al amanecer (props.tsx), paleta naranja
// contenedor, verde agua, crema y trigo (distinta del violeta y maíz de cosecha-record-171).
// Imagen que abre y cierra: la balanza del muelle (planos 1-2 y 16). Recorrido por complejos sobre una cinta (planos 8-10).
// Textos 2D = solo los de "## Placas por plano" (tags, sin pill), borde inferior <= 1450 px, fuentes planos 3 a 16.
// Carteles 3D sin datos: "US$" de los fajos, "1" del podio, iniciales de los meses, "?" sobre la lana, VALOR / VOLUMEN.
const PI = Math.PI;
const PANEL = 'rgba(11,18,32,.92)';
const fit = (text: string, max: number, px = 820) => Math.min(max, Math.floor(px / (text.length * 0.64)));
const P1 = (text: string, at: any, o: any = {}) => ({ type: 'tag' as const, text, at, x: 46, y: 63.5, color: PANEL, size: fit(text, 46), ...o });
const P2 = (text: string, at: any, o: any = {}) => ({ type: 'tag' as const, text, at, x: 46, y: 68, color: PANEL, size: fit(text, 40), ...o });
const SMALL = (text: string, y: number, at: any = 0) => ({ type: 'tag' as const, text, at, x: 46, y, color: 'rgba(11,18,32,.78)', size: 20 });

const B = (timing as any).beats as { id: string; start: number; end: number; words: { w: string; s: number; e: number }[] }[];
const DUR = (id: string) => { const b = B.find((x) => x.id === id)!; return b.end - b.start; };
/** at negativo grande = medio segundo antes del inicio del plano: el pop ya terminó en el cuadro 0 */
const PRE = (id: string) => -(DUR(id) + 0.5);
/** segundos desde el inicio del plano hasta la palabra EXACTA `word` (n-ésima aparición), para animaciones internas */
const W = (id: string, word: string, nth = 1): number => {
  const b = B.find((x) => x.id === id)!; let k = nth;
  for (const w of b.words) if ((w.w === word || w.w.split(' ')[0] === word) && --k === 0) return w.s - b.start;
  throw new Error(`[${id}] no está "${word}"`);
};
const F1 = SMALL('FUENTE: SECRETARÍA DE AGRICULTURA (DATOS INDEC)', 72.2);
const F2 = (extra = '') => SMALL('LA NACIÓN, 27/11/2026' + extra, 74.0);
const FU = (extra = '') => [F1, F2(extra)];
const ESQ = ' · ESQUEMA, NO A ESCALA';

const WORLD = { type: 'world', p: {} };
const SECO = { type: 'world', p: { water: false } };
const WORKER = { shirt: '#ff7a3d', pants: '#2c333d', skin: '#c98d62', hair: '#15102b', cap: '#e9e3d6' };

export const BEATS: BeatSpec[] = [
  // 1. En octubre, la tonelada de carne bovina fresca se exportó a 15.397 dólares.
  { id: 'b01', set: 'room', cam: { from: [0.7, 2.35, 8.4], to: [0.15, 2.2, 7.6], look: [0, 1.3, 0], fov: 44 }, keywords: ['carne', '15.397'],
    actors: [WORLD,
      { type: 'barco', pos: [0.2, 0, -2.4], p: { len: 3.0, n: 12, pre: 5, loadAt: W('b01', 'exportó'), step: 0.14 } },
      { type: 'balanza', pos: [0, 0, 0.3], p: { kf: [[0, 0.1], [W('b01', '15.397'), 0.1], [W('b01', '15.397') + 0.9, 0.2]], left: { kind: 'carne' } } },
      { type: 'ring', pos: [-1.1, 0.03, 0.3], at: 'carne', p: { r: 0.6, color: '#ff7a3d' } },
      { type: 'fajo', pos: [1.25, 0, 1.3], at: '15.397', p: { h0: 0.1, h1: 0.5, at: W('b01', '15.397'), dur: 1.2, w: 0.6 } },
    ],
    overlays: [P1('CARNE BOVINA FRESCA', PRE('b01')), P2('US$ 15.397 / TONELADA', '15.397'), SMALL('ESQUEMA, NO A ESCALA', 74.0)] },

  // 2. Y algo se vendió a más del doble.
  { id: 'b02', set: 'room', cam: { from: [-0.6, 2.2, 7.6], to: [-0.2, 2.1, 7.0], look: [0.1, 1.45, 0.3], fov: 44 }, keywords: ['algo', 'doble.'],
    actors: [WORLD,
      { type: 'barco', pos: [0.2, 0, -2.4], p: { len: 3.0, n: 12, pre: 12 } },
      { type: 'balanza', pos: [0, 0, 0.3], p: { kf: [[0, 0.2], [W('b02', 'algo') + 0.25, 0.2], [W('b02', 'algo') + 1.0, -0.24]], left: { kind: 'carne' }, right: { kind: 'frasco', at: W('b02', 'algo') } } },
      { type: 'ring', pos: [1.1, 0.03, 0.3], at: 'doble.', p: { r: 0.6, color: '#25b3a1' } },
    ],
    overlays: [P1('MÁS DEL DOBLE', 'doble.'), SMALL('ESQUEMA, NO A ESCALA', 74.0)] },

  // 3. Aceite esencial de cítricos: 32.449 dólares, según la Secretaría de Agricultura.
  { id: 'b03', set: 'room', cam: { from: [0.6, 2.05, 6.6], to: [0.05, 1.9, 5.9], look: [0, 1.2, 0], fov: 44 }, keywords: ['Aceite', 'cítricos:', '32.449', 'Secretaría'],
    actors: [SECO,
      { type: 'box', pos: [-0.35, 0.25, 0], p: { size: [1.0, 0.5, 0.8], color: '#3a4350' } },
      { type: 'frasco', pos: [-0.35, 0.5, 0], s: 2.0, p: {} },
      { type: 'citrico', pos: [-1.15, 0.2, 0.7], at: 'cítricos:', p: { c: '#ff9a2e', r: 0.2 } },
      { type: 'citrico', pos: [-0.65, 0.18, 1.0], at: W('b03', 'cítricos:') + 0.2, p: { c: '#ffd23f', r: 0.17, sc: [1.15, 1, 1] } },
      { type: 'citrico', pos: [0.2, 0.22, 0.85], at: W('b03', 'cítricos:') + 0.4, p: { c: '#ff7a6b', r: 0.22 } },
      { type: 'fajo', pos: [0.9, 0, 0.1], at: '32.449', p: { h0: 0.1, h1: 1.1, at: W('b03', '32.449'), dur: 1.6, w: 0.7 } },
      { type: 'ring', pos: [-0.35, 0.03, 0], at: 'Agricultura.', p: { r: 0.85, color: '#25b3a1' } },
    ],
    overlays: [P1('ACEITE ESENCIAL DE CÍTRICOS', 'cítricos:', { out: 'Agricultura.' }), P2('US$ 32.449 / TONELADA', '32.449'),
      P1('SEGÚN LA SECRETARÍA DE AGRICULTURA · OCTUBRE 2026', 'Agricultura.', { size: fit('SEGÚN LA SECRETARÍA DE AGRICULTURA · OCTUBRE 2026', 46, 840) }), ...FU()] },

  // 4. Fue lo mejor pagado de un mes récord.
  { id: 'b04', set: 'room', cam: { from: [-0.7, 2.2, 6.6], to: [-0.2, 2.05, 6.0], look: [0, 1.15, 0], fov: 44 }, keywords: ['mejor', 'récord.'],
    actors: [WORLD,
      { type: 'podio', pos: [0, 0, 0], p: { two: false } },
      { type: 'frasco', pos: [-0.52, 1.05, 0], s: 1.25, at: 0.05, enter: 'drop', p: {} },
      { type: 'ring', pos: [-0.52, 1.07, 0], at: 'pagado', p: { r: 0.36, color: '#ffd23f' } },
    ],
    overlays: [P1('N.º 1 EN PRECIO POR TONELADA', 'pagado'), ...FU()] },

  // 5. Las exportaciones agroindustriales llegaron a 5.717 millones de dólares.
  { id: 'b05', set: 'room', cam: { from: [1.1, 2.6, 8.4], to: [0.4, 2.4, 7.6], look: [0, 1.0, -1.0], fov: 44 }, keywords: ['agroindustriales', '5.717 millones'],
    actors: [WORLD,
      { type: 'barco', pos: [0, 0, -2.3], p: { len: 3.0, n: 24, pre: 4, loadAt: W('b05', 'agroindustriales'), step: 0.15 } },
      { type: 'grua', pos: [-0.9, 0, -0.5], p: { trolley: [[0, 0.5], [1.2, 0.5], [2.6, -1.7]], cable: [[0, 0.3], [1.2, 0.3], [2.6, 0.5], [3.4, 1.15]], box: '#25b3a1' } },
      { type: 'pila3', pos: [0.55, 0, 0.3], p: { seed: 3 } },
      { type: 'ring', pos: [0, 0.03, 0.9], at: '5.717', p: { r: 1.0, color: '#ffd23f' } },
    ],
    overlays: [P1('OCTUBRE 2026: US$ 5.717 MILLONES', '5.717'), P2('RÉCORD HISTÓRICO', 'dólares.'), ...FU()] },

  // 6. Y a 11 millones de toneladas: las dos, un 23% más que un año antes.
  { id: 'b06', set: 'room', cam: { from: [-0.7, 2.4, 7.8], to: [0, 2.2, 7.1], look: [0, 1.0, -0.2], fov: 44 }, keywords: ['11 millones', 'toneladas:', '23%'],
    actors: [SECO,
      { type: 'pila', pos: [0, 0, -1.6], p: { h0: 0.25, h1: 1.35, at: W('b06', '11'), dur: 1.4, ratio: 1.05, seed: 5 } },
      { type: 'par', pos: [-0.78, 0, 0.7], at: 'las', p: { h: 0.9, ratio: 1.23, at: W('b06', '23%'), c: '#25b3a1', cap: 'VALOR' } },
      { type: 'par', pos: [0.78, 0, 0.7], at: W('b06', 'las') + 0.15, p: { h: 0.9, ratio: 1.23, at: W('b06', '23%') + 0.15, c: '#e0ad55', cap: 'VOLUMEN' } },
    ],
    overlays: [P1('11 MILLONES DE TONELADAS', '11'), P2('+23% EN VALOR Y EN VOLUMEN', '23%'),
      SMALL('GRIS: UN AÑO ANTES', 59.0, 'las'), ...FU()] },

  // 7. 21 complejos productivos marcaron su propio récord del mes.
  { id: 'b07', set: 'room', cam: { from: [0.6, 3.3, 6.0], to: [0.1, 3.1, 5.4], look: [0, 0.45, 0], fov: 44 }, keywords: ['21', 'complejos', 'récord'],
    actors: [WORLD,
      { type: 'barco', pos: [0, 0, -2.4], p: { len: 3.0, n: 12, pre: 12 } },
      { type: 'person', pos: [1.25, 0, -0.75], rot: [0, -0.5, 0], s: 0.8, p: { ...WORKER, pose: 'idle' } },
      { type: 'cajas', pos: [0, 0, 0.3], p: { n: 21, cols: 7, at: W('b07', '21'), step: 0.05, lit: W('b07', 'récord'), litStep: 0.03 } },
    ],
    overlays: [P1('21 COMPLEJOS CON RÉCORD DE VENTAS', '21'), ...FU()] },

  // 8. El trigo vendió un 47% más.
  { id: 'b08', set: 'room', cam: { from: [-0.8, 2.1, 6.6], to: [-0.3, 2.0, 6.0], look: [0, 0.95, 0], fov: 44 }, keywords: ['trigo', '47%'],
    actors: [WORLD,
      { type: 'cinta', pos: [0, 0, 0], p: { len: 8, speed: 0.35 } },
      { type: 'bolsa', pos: [-1.0, 0.58, 0], move: { to: [0.2, 0.58, 0], at: 0, dur: 3.42 }, p: { mark: 'trigo' } },
      { type: 'pila', pos: [-1.9, 0.58, 0], move: { to: [-0.7, 0.58, 0], at: 0, dur: 3.42 }, p: { h0: 0.3, ratio: 1.0, seed: 2 } },
      ...[-1.3, -0.95, -0.6].map((x, i) => ({ type: 'espiga', pos: [x, 0, -0.75] as any, p: { ph: i } })),
      { type: 'sube', pos: [1.05, 0.6, 0], at: '47%', p: { len: 0.7, color: '#25b3a1' } },
    ],
    overlays: [P1('TRIGO +47%', '47%'), ...FU()] },

  // 9. El alimento para animales, un 42%.
  { id: 'b09', set: 'room', cam: { from: [0.9, 2.2, 6.4], to: [0.4, 2.05, 5.8], look: [0, 0.95, 0], fov: 44 }, keywords: ['alimento', '42%.'],
    actors: [WORLD,
      { type: 'cinta', pos: [0, 0, 0], p: { len: 8, speed: 0.35 } },
      { type: 'bolsa', pos: [-0.8, 0.58, 0], move: { to: [0.25, 0.58, 0], at: 0, dur: 3.05 }, p: { c: '#5f9a55', band: '#2c5a32', mark: 'pellet' } },
      { type: 'pellets', pos: [-1.6, 0.6, 0], move: { to: [-0.55, 0.6, 0], at: 0, dur: 3.05 }, p: { n: 30, r: 0.3 } },
      { type: 'sube', pos: [1.05, 0.6, 0], at: '42%.', p: { len: 0.6, color: '#25b3a1' } },
    ],
    overlays: [P1('ALIMENTO PARA ANIMALES +42%', '42%.'), ...FU()] },

  // 10. El girasol y las legumbres, un 32%.
  { id: 'b10', set: 'room', cam: { from: [-0.5, 2.3, 6.8], to: [0.1, 2.15, 6.2], look: [0, 1.0, 0], fov: 44 }, keywords: ['girasol', 'legumbres,', '32%.'],
    actors: [WORLD,
      { type: 'cinta', pos: [0, 0, 0], p: { len: 8, speed: 0.35 } },
      { type: 'girasol', pos: [-1.2, 0.58, 0], move: { to: [-0.15, 0.58, 0], at: 0, dur: 3.37 }, p: { h: 0.9 } },
      { type: 'porotos', pos: [-0.45, 0.58, 0], at: 'legumbres,', move: { to: [0.55, 0.58, 0], at: W('b10', 'legumbres,'), dur: 3.37 - W('b10', 'legumbres,') + 0.8 } },
      { type: 'sube', pos: [-0.75, 0.6, 0.55], at: '32%.', p: { len: 0.5, color: '#25b3a1' } },
      { type: 'sube', pos: [1.15, 0.6, 0.0], at: '32%.', p: { len: 0.5, color: '#25b3a1' } },
    ],
    overlays: [P1('GIRASOL +32%', '32%.'), P2('LEGUMBRES +32%', '32%.'), ...FU()] },

  // 11. Y los bovinos, un 23%.
  { id: 'b11', set: 'room', cam: { from: [0.7, 2.3, 6.8], to: [0.2, 2.15, 6.2], look: [0, 0.8, 0], fov: 44 }, keywords: ['bovinos,', '23%.'],
    actors: [SECO,
      { type: 'corral', pos: [0, 0, -0.2], p: { w: 3.0, d: 1.7 } },
      { type: 'vaca', pos: [-0.55, 0, -0.45], rot: [0, 0.3, 0], s: 0.85, p: {} },
      { type: 'vaca', pos: [0.6, 0, 0.15], rot: [0, -2.6, 0], s: 0.85, p: { ph: 1.4 } },
      { type: 'sube', pos: [1.2, 0.0, 0.9], at: '23%.', p: { len: 0.7, color: '#25b3a1' } },
    ],
    overlays: [P1('BOVINOS +23%', '23%.'), ...FU()] },

  // 12. Ahora mirá el año entero.
  { id: 'b12', set: 'room', cam: { from: [0.5, 1.9, 7.2], to: [0.05, 1.8, 6.6], look: [0, 1.35, 0], fov: 44 }, keywords: ['año'],
    actors: [WORLD,
      { type: 'meses', pos: [0, 1.4, 0], p: { on: 10, at: 0.25, step: 0.085 } },
      ...[-1.2, 1.2].map((x) => ({ type: 'box', pos: [x, 0.45, -0.05] as any, p: { size: [0.08, 0.9, 0.08], color: '#6c7884' } })),
    ],
    overlays: [P1('ENERO A OCTUBRE', 'año'), ...FU()] },

  // 13. De enero a octubre salieron 106,82 millones de toneladas: récord para esos diez meses.
  { id: 'b13', set: 'room', cam: { from: [0.8, 2.1, 8.8], to: [0.15, 2.6, 8.0], look: [0, 1.0, -0.8], fov: 44 }, keywords: ['salieron', '106,82 millones', 'toneladas:'],
    actors: [WORLD,
      { type: 'barco', pos: [-0.2, 0, -2.4], p: { len: 3.0, grain: '#e0ad55', grainAt: 0.2, grainDur: 1.5 }, move: { to: [3.2, 0, -2.4], at: W('b13', 'toneladas:'), dur: 3.0 } },
      { type: 'pila', pos: [-0.35, 0, 0.0], p: { h0: 0.35, h1: 1.5, at: W('b13', '106,82'), dur: 2.3, ratio: 0.95, seed: 9 } },
      { type: 'pila', pos: [1.15, 0, 0.7], p: { h0: 0.2, h1: 0.6, at: W('b13', '106,82') + 0.4, dur: 2.0, ratio: 0.95, seed: 4 } },
      { type: 'ring', pos: [-0.35, 0.03, 0.0], at: 'meses.', p: { r: 1.55, color: '#ffd23f' } },
    ],
    overlays: [P1('106,82 MILLONES DE TONELADAS', '106,82'), P2('RÉCORD PARA ESE PERÍODO', 'meses.'), ...FU()] },

  // 14. En dólares, 48.967 millones.
  { id: 'b14', set: 'room', cam: { from: [-0.6, 2.3, 7.0], to: [0, 2.1, 6.3], look: [0, 1.1, 0], fov: 44 }, keywords: ['dólares,', '48.967 millones.'],
    actors: [WORLD,
      { type: 'fajo', pos: [0, 0, 0], p: { h0: 0.3, h1: 1.7, at: W('b14', '48.967'), dur: 2.6, w: 1.0 } },
      { type: 'fajo', pos: [-1.15, 0, 0.5], at: 'dólares,', p: { h0: 0.3, w: 0.6 } },
      { type: 'fajo', pos: [1.15, 0, 0.5], at: W('b14', 'dólares,') + 0.25, p: { h0: 0.3, w: 0.6 } },
      { type: 'ring', pos: [0, 0.03, 0], at: '48.967', p: { r: 0.9, color: '#25b3a1' } },
    ],
    overlays: [P1('US$ 48.967 MILLONES', '48.967'), ...FU(ESQ)] },

  // 15. Y eso no es récord: es el segundo valor de la historia.
  { id: 'b15', set: 'room', cam: { from: [0.7, 2.25, 6.6], to: [0.2, 2.1, 6.0], look: [0, 1.15, 0], fov: 44 }, keywords: ['récord:', 'segundo'],
    actors: [WORLD,
      { type: 'podio', pos: [0, 0, 0], p: {} },
      { type: 'cross', pos: [-0.52, 1.6, 0.1], s: 0.45, at: 'no' },
      { type: 'fajo', pos: [0.52, 0.65, 0], at: 'segundo', enter: 'drop', p: { h0: 0.45, w: 0.65 } },
    ],
    overlays: [P1('2.º VALOR DE LA HISTORIA', 'segundo'), ...FU()] },

  // 16. Justo debajo de la carne, en esa lista, está la lana peinada.
  { id: 'b16', set: 'room', cam: { from: [-0.75, 2.35, 8.3], to: [-0.1, 2.2, 7.5], look: [0, 1.3, 0.3], fov: 44 }, keywords: ['carne,', 'lana', 'peinada.'],
    actors: [WORLD,
      { type: 'barco', pos: [0.2, 0, -2.4], p: { len: 3.0, n: 12, pre: 12 } },
      { type: 'balanza', pos: [0, 0, 0.3], p: { kf: [[0, 0.2], [W('b16', 'lana') + 0.2, 0.2], [W('b16', 'lana') + 0.9, 0.08]], left: { kind: 'carne' }, right: { kind: 'lana', at: W('b16', 'lana') } } },
      { type: 'ring', pos: [-1.1, 0.03, 0.3], at: 'lista,', p: { r: 0.6, color: '#ff7a3d' } },
      { type: 'sign', pos: [1.05, 2.45, 0.3], at: 'peinada.', p: { text: '?', w: 0.42, h: 0.42, bg: '#0b1220', color: '#ffd23f', size: 0.8 } },
    ],
    overlays: [P1('LANA PEINADA', 'lana'), P2('US$ ¿? / TONELADA', 'peinada.'), ...FU(ESQ)] },

  // 17. ¿Cuánto vale su tonelada? Dejá tu número sin buscar. La respuesta, en la descripción.
  { id: 'b17', set: 'room', cam: { from: [0.6, 2.1, 6.4], to: [0.1, 1.95, 5.8], look: [0, 1.1, 0], fov: 44 }, keywords: ['tonelada?', 'número', 'descripción.'],
    actors: [WORLD,
      { type: 'box', pos: [-0.35, 0.05, 0], p: { size: [1.4, 0.1, 1.0], color: '#6b4f33' } },
      { type: 'lana', pos: [-0.35, 0.1, 0], s: 1.7 },
      { type: 'sign', pos: [-0.35, 1.25, 0.1], bob: 0.05, p: { text: '?', w: 0.5, h: 0.5, bg: '#0b1220', color: '#ffd23f', size: 0.8 } },
      { type: 'person', pos: [1.05, 0, 0.35], rot: [0, -0.5, 0], s: 0.85, p: { ...WORKER, pose: 'shrug' } },
      ...[0, 1, 2].map((i) => ({ type: 'sign', pos: [0.55 + i * 0.45, 1.85 + (i % 2) * 0.12, 0.35] as any, at: W('b17', 'número') + i * 0.18,
        p: { text: '?', w: 0.24, h: 0.24, bg: '#25b3a1', color: '#0b1220', size: 0.8 } })),
      { type: 'ring', pos: [-0.35, 0.12, 0], at: 'respuesta,', p: { r: 0.95, color: '#ffd23f' } },
    ],
    overlays: [P1('¿CUÁNTO VALE LA TONELADA?', 'tonelada?'), P2('DEJÁ TU NÚMERO · SIN BUSCAR', 'buscar.')] },
];
void PI;
