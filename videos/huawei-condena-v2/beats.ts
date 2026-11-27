import type { BeatSpec } from '../../src/Beat';
import { AMBER, COAT, INKB, RED, STEEL } from './props';

// Versión 2: otro look que el original (neón violeta con tribunal, chips, monedas y pantallas, narrado en segunda persona).
// Acá: invierno en Vancouver, azul noche y hielo con una luz ámbar por plano y rojo solo para la condena.
// Sala de embarque nevada (abre y cierra), sala del jurado de madera y verde pino, hall de banco de mármol, mesa con mapa,
// mesa de trabajo, celda de hormigón y escalinata de tribunal. Metáfora: la silla de Meng en la sala de embarque queda vacía
// y en el cierre la ocupa la caja de la empresa, delante del calendario de septiembre de 2027.
// Textos 2D: exactamente los de "## Placas por plano" de guion.md (partidos en dos renglones donde son largos),
// todos entre el 64% y el 76% de alto. Cifras fijas, sin contadores.
const GATE = { type: 'stage', p: { kind: 'gate' } };
const JURY = { type: 'stage', p: { kind: 'jury' } };
const BANK = { type: 'stage', p: { kind: 'bank' } };
const MAP = { type: 'stage', p: { kind: 'map' } };
const BENCH = { type: 'stage', p: { kind: 'bench' } };
const CELL = { type: 'stage', p: { kind: 'cell' } };
const STEPS = { type: 'stage', p: { kind: 'steps' } };
const tag = (text: string, at: any, o: any = {}) => ({ type: 'tag' as const, text, at, x: 47, y: 70, color: INKB, size: 40, ...o });
const MENG = { shirt: COAT, pants: '#2a2a33', hair: '#141018', skin: '#e9c3a0' };
const COP = { shirt: '#1f3550', pants: '#16243a', cap: '#0f1b2c', skin: '#d9a77f' };
const SUIT = { shirt: '#2b3240', pants: '#1b2029', hair: '#6b6f7a', skin: '#f0c9a4' };
const SUIT2 = { shirt: '#4a3a2a', pants: '#1b2029', hair: '#2a1c12', skin: '#c98d62' };

export const BEATS: BeatSpec[] = [
  // 1. Aeropuerto de Vancouver, diciembre de 2018.  (grúa que baja desde el ventanal nevado hasta la pasajera)
  { id: 'b01', set: 'room', cam: { from: [0.6, 3.4, 7.0], to: [-0.1, 2.0, 6.4], look: [0, 1.9, -2], lookTo: [0, 0.75, 0], fov: 46, shift: -0.04 }, keywords: ['Aeropuerto', 'Vancouver', 'diciembre'],
    actors: [
      { ...GATE, p: { kind: 'gate', sign: 'PUERTA 34', signX: 0.6 } },
      { type: 'seats', pos: [0.7, 0, -1.4], p: { n: 4 } },
      { type: 'person', pos: [-1.5, 0, 0.6], rot: [0, Math.PI / 2, 0], p: { ...MENG, pose: 'walk' }, out: '2018', move: { to: [-0.35, 0, 0.6], at: 0, dur: 2.2 } },
      { type: 'person', pos: [-0.35, 0, 0.6], rot: [0, 0.4, 0], at: '2018', enter: 'none', p: { ...MENG, pose: 'idle' } },
      { type: 'bag', pos: [-1.95, 0, 0.6], rot: [0, Math.PI / 2, 0], p: { color: '#7b2d3a' }, move: { to: [-0.8, 0, 0.6], at: 0, dur: 2.2 } },
      { type: 'ring', pos: [-0.35, 0.03, 0.6], at: 'diciembre', p: { r: 0.5, color: AMBER } },
    ],
    overlays: [tag('AEROPUERTO DE VANCOUVER · 1/12/2018', 'Vancouver', { size: 38, y: 72 })] },

  // 2. Canadá detiene a Meng Wanzhou, directora financiera de Huawei e hija del fundador.  (órbita corta alrededor de la detención)
  { id: 'b02', set: 'room', cam: { from: [-1.6, 2.0, 5.8], to: [1.2, 2.1, 6.0], look: [0, 0.8, 0], lookTo: [0.1, 0.85, 0], fov: 46, shift: -0.04 }, keywords: ['Meng', 'directora', 'financiera', 'Huawei', 'fundador'],
    actors: [
      GATE,
      { type: 'seats', pos: [0, 0, -1.6], p: { n: 5 } },
      { type: 'person', pos: [0, 0, 0], p: { ...MENG, pose: 'idle' }, out: 'detiene' },
      { type: 'person', pos: [0, 0, 0], at: 'detiene', enter: 'none', p: { ...MENG, pose: 'sad' } },
      { type: 'bag', pos: [0.45, 0, 0.15], rot: [0, -0.3, 0], p: { color: '#7b2d3a' } },
      { type: 'person', pos: [-1.3, 0, 0.5], rot: [0, 1.1, 0], at: 0.2, enter: 'none', p: { ...COP, pose: 'walk' }, move: { to: [-0.7, 0, 0.35], at: 0.2, dur: 0.8 }, out: 'a' },
      { type: 'person', pos: [-0.7, 0, 0.35], rot: [0, 1.1, 0], at: 'a', enter: 'none', p: { ...COP, pose: 'point' }, out: 'fundador' },
      { type: 'person', pos: [-0.7, 0, 0.35], rot: [0, 1.1, 0], at: 'fundador', enter: 'none', p: { ...COP, pose: 'idle' } },
      { type: 'person', pos: [1.4, 0, 0.6], rot: [0, -1.1, 0], at: 0.35, enter: 'none', p: { ...COP, pose: 'walk' }, move: { to: [0.95, 0, 0.45], at: 0.35, dur: 0.8 }, out: 'Meng' },
      { type: 'person', pos: [0.95, 0, 0.45], rot: [0, -1.1, 0], at: 'Meng', enter: 'none', p: { ...COP, pose: 'idle' }, out: 'Huawei' },
      { type: 'person', pos: [0.95, 0, 0.45], rot: [0, -1.1, 0], at: 'Huawei', enter: 'none', p: { ...COP, pose: 'hold' } },
      { type: 'ring', pos: [0, 0.03, 0], at: 'Meng', p: { r: 0.55, color: RED } },
    ],
    overlays: [
      tag('Meng Wanzhou', 'Meng', { size: 54, y: 67 }),
      tag('directora financiera de Huawei · hija del fundador', 'directora', { size: 31, y: 73.5 }),
    ] },

  // 3. Casi ocho años después, un jurado de Brooklyn declara culpable a su empresa en 10 de 12 cargos.  (cenital que gira y sube sobre la mesa del jurado)
  { id: 'b03', set: 'room', cam: { from: [0.8, 3.3, 4.6], to: [-0.6, 3.7, 4.2], look: [0, 0.3, -0.3], lookTo: [0, 0.35, -0.4], fov: 46, shift: 0.03 }, keywords: ['Brooklyn', 'declara', 'culpable', '10', '12'],
    actors: [
      JURY,
      { type: 'jury', pos: [0, 0, 0], p: { flip: 3.22, step: 0.11, glow: 4.71 } },
      ...[[-1.32, -0.95, 0], [0, -0.95, 0], [1.32, -0.95, 0], [-0.66, 0.95, Math.PI], [0.66, 0.95, Math.PI]].map(([x, z, r], i) => (
        { type: 'person', pos: [x, 0.08, z] as [number, number, number], rot: [0, r, 0] as [number, number, number], at: i < 3 ? 'jurado' : 'Brooklyn', p: { ...[SUIT, SUIT2, { ...MENG, shirt: '#3f6b5a' }, SUIT2, SUIT][i], pose: 'sit' } })),
      { type: 'hbox', pos: [0, 0.84, 0], s: 0.42, at: 'empresa', p: { glow: true } },
    ],
    overlays: [
      tag('24/11/2026 · Jurado de Brooklyn', 'jurado', { size: 40, y: 67 }),
      tag('CULPABLE en 10 de 12 cargos (absuelta en 2)', 'culpable', { size: 36, y: 73.5, color: RED }),
    ] },

  // 4. Según los fiscales, ella le mintió a un banco sobre negocios en Irán.  (travelling lateral a lo largo de la ventanilla)
  { id: 'b04', set: 'room', cam: { from: [-1.2, 2.3, 5.6], to: [0.6, 2.1, 5.3], look: [-0.3, 0.85, -0.6], lookTo: [0.2, 0.8, -0.6], fov: 46, shift: -0.04 }, keywords: ['fiscales', 'mintió', 'banco', 'negocios', 'Irán'],
    actors: [
      BANK,
      { type: 'teller', pos: [0, 0, -0.8] },
      { type: 'person', pos: [0.1, 0, -1.6], s: 0.95, p: { ...SUIT, pose: 'idle' } },
      { type: 'person', pos: [-0.25, 0, 0.1], rot: [0, Math.PI * 0.95, 0], p: { ...MENG, pose: 'hold' } },
      { type: 'paper', pos: [0.3, 1.5, -0.55], rot: [-0.35, -0.1, 0], s: 0.9, at: 'banco', p: { redact: 1.7 } },
      { type: 'pin', pos: [0.95, 1.13, -0.5], at: 'Irán', p: { text: 'IRÁN', color: RED, side: -1 } },
      { type: 'person', pos: [-1.5, 0, 0.6], rot: [0, 0.5, 0], s: 0.92, at: 'fiscales', p: { ...SUIT2, pose: 'point' } },
    ],
    overlays: [
      tag('Según los fiscales:', 'fiscales', { size: 40, y: 67 }),
      tag('mintió a un banco sobre negocios en Irán', 'mintió', { size: 38, y: 73.5 }),
    ] },

  // 5. Hizo un acuerdo y volvió a China. La empresa siguió acusada.  (picado que sigue al avión sobre el mapa)
  { id: 'b05', set: 'room', cam: { from: [0.4, 5.6, 4.2], to: [-0.2, 5.9, 3.8], look: [0.15, 0.4, -0.3], lookTo: [-0.05, 0.4, -0.3], fov: 46 }, keywords: ['acuerdo', 'volvió', 'China', 'empresa', 'acusada'],
    actors: [
      MAP,
      { type: 'maptop', pos: [0, 0.97, 0] },
      { type: 'pin', pos: [0.56, 0.97, -0.44], p: { text: 'VANCOUVER', color: STEEL, h: 0.4, side: -1 } },
      { type: 'paper', pos: [0.45, 1.0, 0.6], rot: [-Math.PI / 2, 0, 0.2], s: 0.7, at: 'acuerdo', p: { sign: 0.6, lines: 6 } },
      { type: 'plane', pos: [0, 1.0, 0], at: 'volvió', enter: 'none', p: { from: [0.56, -0.44], to: [-0.8, -0.3], at: 1.14, dur: 1.1, h: 0.6 } },
      { type: 'ring', pos: [-0.8, 0.99, -0.3], at: 'China', p: { r: 0.22, color: AMBER } },
      { type: 'hbox', pos: [1.05, 0.97, 0.2], rot: [0, -0.2, 0], s: 0.5, at: 'empresa', p: { tape: 3.55 } },
    ],
    overlays: [
      tag('2021: acuerdo y vuelta a China', 'acuerdo', { size: 42, y: 67 }),
      tag('La empresa sigue acusada', 'empresa', { size: 42, y: 73.5, color: RED }),
    ] },

  // 6. Mientras, perdió Google y los chips más avanzados.  (empujón frontal al teléfono sobre la mesa de trabajo)
  { id: 'b06', set: 'room', cam: { from: [0.3, 2.5, 6.2], to: [-0.1, 2.2, 5.2], look: [0, 1.4, 0], lookTo: [0, 1.3, 0], fov: 46, shift: -0.03 }, keywords: ['perdió', 'Google', 'chips', 'avanzados'],
    actors: [
      BENCH,
      { type: 'phone2', pos: [-0.35, 0.96, -0.2], rot: [-0.1, 0.15, 0], s: 0.9, p: { gone: 1.04 } },
      { type: 'chip', pos: [0.55, 0.96, -0.3], s: 1.2, at: 'chips', p: { s: 0.55 }, move: { to: [0.7, 0.96, 0.5], at: 'más', dur: 0.6 } },
      { type: 'cross', pos: [0.7, 1.55, 0.55], at: 'avanzados', p: { size: 0.45, color: RED } },
      { type: 'cross', pos: [-0.35, 2.0, 0.2], at: 'Google', p: { size: 0.5, color: RED } },
      { type: 'hbox', pos: [-0.8, 0.96, 0.6], rot: [0, 0.4, 0], s: 0.45, p: {} },
    ],
    overlays: [
      tag('2019: sin apps de Google', 'Google', { size: 42, y: 67 }),
      tag('2020: sin chips de punta', 'chips', { size: 42, y: 73.5 }),
    ] },

  // 7. Y en 2025 facturó casi como en su mejor año, según su balance.  (grúa que sube junto a las columnas de lingotes)
  { id: 'b07', set: 'room', cam: { from: [1.3, 1.2, 6.0], to: [0.5, 2.6, 6.4], look: [0, 0.6, 0], lookTo: [0, 1.0, 0], fov: 46, shift: -0.06 }, keywords: ['2025', 'facturó', 'mejor', 'balance'],
    actors: [
      BANK,
      { type: 'ingots', pos: [0, 0, -0.2], p: { a: 0, b: 1.53, line: 2.8, H: 1.6 } },
      { type: 'paper', pos: [1.15, 1.2, -0.1], rot: [0, -0.4, 0], s: 0.8, at: 'balance', p: { lines: 7 } },
    ],
    overlays: [
      tag('2025: US$ 126.000 M', '2025', { size: 52, y: 67, color: INKB }),
      tag('98,9% de su récord (fuente: balance de Huawei)', 'mejor', { size: 32, y: 73.5 }),
    ] },

  // 8. El veredicto incluye fraude bancario, violar sanciones a Irán y conspirar para robar secretos comerciales.  (contrapicado que corre por la mesa)
  { id: 'b08', set: 'room', cam: { from: [-1.3, 1.9, 4.4], to: [1.1, 2.1, 4.5], look: [-0.5, 0.7, 0], lookTo: [0.5, 0.7, 0], fov: 46, shift: -0.04 }, keywords: ['veredicto', 'incluye', 'fraude', 'bancario', 'sanciones', 'conspirar', 'secretos', 'comerciales'],
    actors: [
      JURY,
      { type: 'box', pos: [0, 0.8, 0], p: { size: [3.6, 0.1, 1.3], color: '#5e4329' } },
      ...[[-1.2, 0.8], [1.2, 0.8], [-1.2, -0.8]].map(([x, z]) => ({ type: 'box', pos: [x, 0.4, z * 0.5] as [number, number, number], p: { size: [0.1, 0.8, 0.1], color: '#7a5a35' } })),
      { type: 'folder', pos: [-1.05, 0.86, 0.1], rot: [0, 0.15, 0], at: 'fraude', enter: 'drop', p: { color: '#c9a86a', stamp: 1.8 } },
      { type: 'folder', pos: [0, 0.86, 0.05], rot: [0, -0.1, 0], at: 'violar', enter: 'drop', p: { color: '#8fb0c9', stamp: 3.5 } },
      { type: 'folder', pos: [1.05, 0.86, 0.1], rot: [0, 0.12, 0], at: 'conspirar', enter: 'drop', p: { color: '#b7a3c9', stamp: 5.5 } },
      { type: 'person', pos: [0, 0, -1.3], s: 0.95, p: { ...SUIT, pose: 'idle' } },
    ],
    overlays: [
      tag('Fraude bancario · Sanciones a Irán', 'fraude', { size: 42, y: 67 }),
      tag('Conspiración para robar secretos comerciales', 'conspirar', { size: 34, y: 73.5 }),
    ] },

  // 9. Huawei anunció que va a apelar.  (paneo que sube por la escalinata)
  { id: 'b09', set: 'room', cam: { from: [0.9, 1.4, 6.2], to: [0.2, 2.3, 6.4], look: [0, 0.7, -0.5], lookTo: [0, 1.4, -1.4], fov: 46, shift: -0.04 }, keywords: ['Huawei', 'apelar'],
    actors: [
      STEPS,
      { type: 'hbox', pos: [-0.4, 0, 0.6], rot: [0, 0.2, 0], s: 0.7, p: {}, move: { to: [-0.4, 0.6, -0.8], at: 'apelar', dur: 0.5 } },
      { type: 'person', pos: [0.7, 0, 0.5], rot: [0, -0.4, 0], at: 'anunció', p: { ...SUIT2, pose: 'point' } },
      { type: 'arrow', pos: [-0.4, 1.1, -0.4], at: 'apelar', s: 0.7, p: { len: 0.9, color: AMBER } },
    ],
    overlays: [tag('Huawei va a apelar', 'anunció', { size: 50, y: 70 })] },

  // 10. Una empresa no va presa, arriesga multas y decomisos.  (travelling de la celda vacía a las bolsas)
  { id: 'b10', set: 'room', cam: { from: [-0.9, 2.2, 6.2], to: [0.6, 2.1, 5.9], look: [-0.5, 0.8, -0.6], lookTo: [0.4, 0.6, -0.4], fov: 46, shift: -0.05 }, keywords: ['empresa', 'presa', 'arriesga', 'multas', 'decomisos'],
    actors: [
      CELL,
      { type: 'cell', pos: [-0.9, 0, -0.8], s: 0.9, p: { w: 2.0 } },
      { type: 'hbox', pos: [1.2, 0, -1.4], rot: [0, -0.3, 0], s: 0.75, at: 'empresa', p: {} },
      { type: 'cross', pos: [-0.9, 1.3, -0.6], at: 'presa', p: { size: 0.55, color: RED } },
      { type: 'sack', pos: [0.15, 0, 0.25], at: 'multas', enter: 'drop', p: {} },
      { type: 'sack', pos: [0.6, 0, 0.6], s: 0.85, at: 'multas', enter: 'drop', p: {} },
      { type: 'crate', pos: [0.95, 0, 0.45], rot: [0, -0.4, 0], at: 'decomisos', enter: 'drop', p: {} },
    ],
    overlays: [
      tag('Una empresa no va presa', 'presa', { size: 44, y: 67 }),
      tag('Multas y decomisos', 'multas', { size: 44, y: 73.5, color: RED }),
    ] },

  // 11. Al 26 de noviembre, la fiscalía no pidió monto.  (empujón lento al formulario vacío)
  { id: 'b11', set: 'room', cam: { from: [-0.4, 2.0, 5.8], to: [0.1, 1.9, 4.9], look: [0, 1.3, -0.4], lookTo: [0.1, 1.25, -0.4], fov: 46, shift: -0.05 }, keywords: ['noviembre', 'fiscalía', 'monto'],
    actors: [
      JURY,
      { type: 'form', pos: [0.15, 1.6, -0.5], rot: [-0.05, -0.08, 0], s: 0.85, p: { cursor: 2.3 } },
      { type: 'calendar', pos: [-0.72, 1.05, -0.1], rot: [0, 0.35, 0], s: 0.45, at: '26', p: { top: 'NOV 2026', big: '26', color: STEEL } },
      { type: 'person', pos: [0.95, 0, -1.0], rot: [0, -0.5, 0], s: 0.9, at: 'fiscalía', p: { ...SUIT, pose: 'shrug' } },
    ],
    overlays: [
      tag('Al 26/11/2026:', '26', { size: 44, y: 67 }),
      tag('la fiscalía no pidió monto', 'fiscalía', { size: 44, y: 73.5 }),
    ] },

  // 12. Meng ya está libre. La pena de Huawei llega el 14 de septiembre de 2027.  (vuelve la sala de embarque; la silla queda vacía; dolly out)
  { id: 'b12', set: 'room', cam: { from: [-0.2, 1.8, 4.6], to: [0.3, 2.2, 6.4], look: [-0.1, 0.75, -0.6], lookTo: [0.1, 0.85, -0.8], fov: 46, shift: -0.05 }, keywords: ['libre', 'Huawei', 'septiembre', '2027'],
    actors: [
      GATE,
      { type: 'seats', pos: [0, 0, -0.6], p: { n: 4, empty: 1, glow: 0.74 } },
      { type: 'person', pos: [-0.31, 0.15, -0.55], p: { ...MENG, pose: 'sit' }, out: 'libre' },
      { type: 'person', pos: [-0.31, 0, -0.2], rot: [0, -Math.PI / 2, 0], at: 'libre', enter: 'none', p: { ...MENG, pose: 'walk' }, move: { to: [-2.6, 0, 0.2], at: 'libre', dur: 1.2 } },
      { type: 'hbox', pos: [-0.31, 0.47, -0.62], s: 0.5, at: 'Huawei', enter: 'drop', p: {} },
      { type: 'box', pos: [0.75, 0.45, -1.7], p: { size: [1.3, 0.9, 0.7], color: '#26384d' } },
      { type: 'deskcal', pos: [0.75, 0.9, -1.6], rot: [0, -0.15, 0], s: 0.8, at: 'septiembre', p: { top: 'SEP 2027', day: '14' } },
    ],
    overlays: [tag('Sentencia: 14/9/2027', '14', { size: 54, y: 70, color: RED })] },

  // 13. Seguime y ese día te cuento cómo termina.  (órbita lenta: la caja espera en la silla, nieva)
  { id: 'b13', set: 'room', cam: { from: [1.2, 1.9, 6.0], to: [-0.5, 2.1, 5.8], look: [0.1, 0.8, -0.8], lookTo: [0.1, 0.85, -0.8], fov: 46, shift: -0.05 }, keywords: ['Seguime', 'termina'],
    actors: [
      GATE,
      { type: 'seats', pos: [0, 0, -0.6], p: { n: 4, empty: 1, glow: 0 } },
      { type: 'hbox', pos: [-0.31, 0.47, -0.62], s: 0.5, p: {} },
      { type: 'box', pos: [0.75, 0.45, -1.7], p: { size: [1.3, 0.9, 0.7], color: '#26384d' } },
      { type: 'deskcal', pos: [0.75, 0.9, -1.6], rot: [0, -0.15, 0], s: 0.8, p: { top: 'SEP 2027', day: '14' } },
      { type: 'clock', pos: [-1.25, 1.15, -3.45], s: 0.7, p: {} },
      { type: 'ring', pos: [-0.31, 0.03, -0.3], at: 'día', p: { r: 0.55, color: AMBER } },
    ],
    overlays: [
      tag('Seguime:', 'Seguime', { size: 46, y: 67 }),
      tag('ese día te cuento cómo termina', 'día', { size: 42, y: 73.5 }),
    ] },
];
