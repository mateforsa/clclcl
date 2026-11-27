import type { BeatSpec } from '../../src/Beat';
import { ORANGE, TEAL, SIGN, INK, RED, BSOD, BURG, CREAM } from './props';

// Versión 2: otro look que el original (ciudad neón violeta, monitores, monedas, gráficos de línea).
// Acá: terminal de aeropuerto al atardecer (terrazo crema, ventanal naranja, cartel de paletas, mostradores de check-in),
// pista de noche, sala de directorio de nogal y bordó, sala de reguladores de piedra. Metáfora que abre y cierra:
// el mostrador de la aerolínea con la pantalla azul (plano 2) vuelve en el plano 12, ahora con un arco de seguridad al lado.
// Textos 2D: exactamente los de "## Placas por plano" de guion.md. Todo entre el 62% y el 77% de alto, centrado en x 48%.
const TERMINAL = { type: 'stage', p: { kind: 'terminal' } };
const TARMAC = { type: 'stage', p: { kind: 'tarmac' } };
const BOARD = { type: 'stage', p: { kind: 'board' } };
const HALL = { type: 'stage', p: { kind: 'hall' } };
const tag = (text: string, at: any, o: any = {}) => ({ type: 'tag' as const, text, at, x: 48, y: 70, color: INK, size: 44, ...o });
const PAX = { shirt: '#3c4a6b', pants: '#2a2a2a', hair: '#2a1c12', skin: '#e0b48f' };
const PAX2 = { shirt: '#c8576a', pants: '#3a3d44', hair: '#5a3a1a', skin: '#c98d62' };
const SUIT = { shirt: '#2b2b30', pants: '#1d1d22', hair: '#8d8aa0', skin: '#f0c9a4' };
const ROWS = (flip?: number) => [
  { f: 'XQ 210', city: 'NUEVA YORK', st: 'A HORARIO', c: '#9fe8a8', flip, to: 'CANCELADO' },
  { f: 'XQ 482', city: 'ATLANTA', st: 'A HORARIO', c: '#9fe8a8', flip: flip !== undefined ? flip + 0.25 : undefined, to: 'CANCELADO' },
  { f: 'XQ 907', city: 'MIAMI', st: 'CANCELADO', c: '#ff6b6b' },
  { f: 'XQ 133', city: 'LONDRES', st: 'A HORARIO', c: '#9fe8a8', flip: flip !== undefined ? flip + 0.5 : undefined, to: 'CANCELADO' },
];

export const BEATS: BeatSpec[] = [
  // 1. Llegás al aeropuerto y tu vuelo no sale. Julio de 2024.  (grúa baja que sube desde la valija hasta el cartel)
  { id: 'b01', set: 'room', cam: { from: [0.5, 0.8, 6.6], to: [-0.2, 1.75, 6.0], look: [0, 1.2, -0.5], lookTo: [0, 1.75, -1], fov: 46 }, keywords: ['aeropuerto', '2024'],
    actors: [
      TERMINAL,
      { type: 'flap', pos: [0, 2.35, -2.2], p: { rows: ROWS(1.9), w: 3.0, h: 1.45 } },
      { type: 'person', pos: [-0.45, 0, 0.9], rot: [0, Math.PI * 0.85, 0], p: { ...PAX, pose: 'walk' }, out: 'no', move: { to: [-0.3, 0, 0.3], at: 0, dur: 1.8 } },
      { type: 'person', pos: [-0.3, 0, 0.3], rot: [0, Math.PI * 0.95, 0], at: 'no', enter: 'none', p: { ...PAX, pose: 'shrug' } },
      { type: 'bag', pos: [0.2, 0, 0.9], rot: [0, -0.3, 0], p: { color: ORANGE }, move: { to: [0.25, 0, 0.35], at: 0, dur: 1.8 } },
      { type: 'person', pos: [1.25, 0, -0.4], rot: [0, -0.4, 0], s: 0.9, at: 'Julio', p: { ...PAX2, pose: 'sad' } },
      { type: 'bag', pos: [1.7, 0, -0.2], s: 0.8, at: 'Julio', p: { color: TEAL } },
    ],
    overlays: [tag('VUELO CANCELADO', 0, { color: RED, size: 56, y: 69 }), tag('19/7/2024', '2024', { color: TEAL, size: 48, y: 75.5 })] },

  // 2. En las computadoras de la aerolínea, una pantalla azul.  (travelling lateral por la fila de mostradores)
  { id: 'b02', set: 'room', cam: { from: [-1.3, 1.9, 5.2], to: [0.9, 1.8, 5.0], look: [-0.6, 1.45, 0], lookTo: [0.4, 1.45, 0], fov: 46 }, keywords: ['computadoras', 'aerolínea', 'azul'],
    actors: [
      TERMINAL,
      { type: 'kiosk', pos: [-1.3, 0, -0.3], p: { sign: '1', blue: 0.3 } },
      { type: 'kiosk', pos: [0, 0, -0.3], p: { sign: '2', blue: 1.2 } },
      { type: 'kiosk', pos: [1.3, 0, -0.3], p: { sign: '3', blue: 2.19 } },
      { type: 'person', pos: [0.05, 0, 1.0], rot: [0, Math.PI, 0], s: 0.95, p: { ...PAX, pose: 'idle' }, out: 'pantalla' },
      { type: 'person', pos: [0.05, 0, 1.0], rot: [0, Math.PI, 0], s: 0.95, at: 'pantalla', enter: 'none', p: { ...PAX, pose: 'shrug' } },
      { type: 'bag', pos: [0.55, 0, 1.05], s: 0.9, p: { color: ORANGE } },
    ] },

  // 3. Según Microsoft, pasa en 8,5 millones de computadoras con Windows.  (cenital que gira y se eleva sobre el mosaico)
  { id: 'b03', set: 'room', cam: { from: [0.3, 5.6, 2.6], to: [-0.4, 7.2, 2.2], look: [0, 0, 0.3], lookTo: [0, 0, 0], fov: 46 }, keywords: ['Microsoft', '8,5', 'computadoras'],
    actors: [
      TERMINAL,
      { type: 'tiles', pos: [0, 0, 0], p: { cols: 13, rows: 17, gap: 0.34, start: 1.31, speed: 1.6 } },
      { type: 'kiosk', pos: [0, 0, 0.2], s: 0.55, p: { blue: 0.2 } },
    ],
    overlays: [tag('SEGÚN MICROSOFT', 'Microsoft', { color: TEAL, size: 40, y: 75.5 }), tag('8,5 MILLONES DE COMPUTADORAS', '8,5', { color: BSOD, size: 50, y: 69 })] },

  // 4. La causa: una actualización fallada de CrowdStrike, la empresa que las protege.  (contrapicado que corre junto a la cinta)
  { id: 'b04', set: 'room', cam: { from: [1.7, 0.9, 4.4], to: [0.7, 1.2, 4.0], look: [-0.4, 1.0, 0], lookTo: [-0.1, 1.2, -0.4], fov: 46 }, keywords: ['actualización', 'CrowdStrike'],
    actors: [
      TERMINAL,
      { type: 'belt', pos: [0, 0, 0.3], p: { len: 4.4, crate: { at: 0.98, from: -2.4, to: 0.1, dur: 0.85, bad: 1.88 } } },
      { type: 'kiosk', pos: [-0.9, 0, -1.2], p: { blue: 1.95 } },
      { type: 'kiosk', pos: [0.4, 0, -1.2], p: { blue: 2.1 } },
      { type: 'dome', pos: [-0.25, 0, -1.2], at: 'empresa', p: { r: 1.25 } },
    ],
    overlays: [
      tag('ACTUALIZACIÓN CON ERROR', 'actualización', { color: RED, size: 50, y: 69, out: 'CrowdStrike' }),
      tag('NO FUE UN ATAQUE', 'fallada', { color: INK, size: 44, y: 75.5 }),
      tag('CROWDSTRIKE', 'CrowdStrike', { color: RED, size: 56, y: 69 }),
    ] },

  // 5. La aerolínea Delta dice que perdió unos 500 millones de dólares.  (órbita de noche alrededor del avión)
  { id: 'b05', set: 'room', cam: { from: [2.6, 1.5, 6.4], to: [-1.0, 1.9, 6.6], look: [0, 1.0, 0], lookTo: [0, 1.1, 0], fov: 46 }, keywords: ['aerolínea', 'Delta', '500', 'dólares'],
    actors: [
      TARMAC,
      { type: 'jet', pos: [0, 0, -1.0], rot: [0, -0.35, 0], s: 0.85, p: {} },
      { type: 'cash', pos: [0.2, 0, 1.4], at: 'dice', enter: 'none', p: { n: 15, grow: 0.5, lose: 1.5 } },
      { type: 'cross', pos: [-0.6, 1.95, -0.6], at: 'perdió', p: { size: 0.8, color: RED } },
    ],
    overlays: [tag('SEGÚN DELTA', 'dice', { color: TEAL, size: 40, y: 75.5 }), tag('DELTA: US$ 500 MILLONES', '500', { color: RED, size: 54, y: 69 })] },

  // 6. La acción de CrowdStrike cae más de un tercio.  (grúa que baja siguiendo la torre de valijas)
  { id: 'b06', set: 'room', cam: { from: [0.8, 3.4, 6.0], to: [0.2, 2.0, 5.6], look: [0, 2.4, 0], lookTo: [0, 1.4, 0], fov: 46 }, keywords: ['CrowdStrike', 'tercio'],
    actors: [
      TERMINAL,
      { type: 'tower', pos: [0, 0, 0], p: { n: 12, cut: 4, fall: 1.6 } },
      { type: 'label', pos: [0, 3.35, 0], out: 'cae', p: { text: 'ACCIÓN', w: 1.1, h: 0.32, bg: INK, color: SIGN, size: 0.66, weight: 900 } },
      { type: 'arrow', pos: [-1.0, 2.5, 0.3], rot: [0, 0, Math.PI], at: 'tercio', s: 0.9, p: { len: 1.0, color: RED } },
    ],
    overlays: [tag('−36% EN DOS SEMANAS', 'tercio', { color: RED, size: 58, y: 70 })] },

  // 7. Y este lunes compra Zscaler, que filtra el internet de otras empresas.  (empujón frontal hacia el arco de seguridad)
  { id: 'b07', set: 'room', cam: { from: [-0.6, 1.9, 7.4], to: [0.1, 1.65, 6.0], look: [0, 1.35, 0], lookTo: [0, 1.25, 0], fov: 46 }, keywords: ['lunes', 'Zscaler', 'internet', 'empresas'],
    actors: [
      TERMINAL,
      { type: 'calendar', pos: [-1.15, 2.95, -2.6], rot: [0, 0.2, 0], s: 0.5, at: 'lunes', p: { top: 'NOV 2026', big: '23', color: TEAL } },
      { type: 'scanner', pos: [0.15, 0, -0.4], at: 'Zscaler', p: { start: 0.9, name: 'ZSCALER' } },
      { type: 'person', pos: [-0.95, 0, 0.9], rot: [0, 0.6, 0], s: 0.85, at: 'compra', p: { shirt: RED, pants: '#2a2a2a', hair: '#15102b', skin: '#f2c39b', pose: 'point' } },
    ],
    overlays: [tag('23/11/2026 · DOS AÑOS DESPUÉS', 'lunes', { color: TEAL, size: 44, y: 75.5 }), tag('COMPRA ZSCALER', 'Zscaler', { color: RED, size: 56, y: 69 })] },

  // 8. Paga casi 44.000 millones de dólares, todo en acciones.  (picado que se desliza a lo largo de la mesa)
  { id: 'b08', set: 'room', cam: { from: [-1.3, 3.3, 5.0], to: [0.9, 2.9, 5.4], look: [-0.3, 1.0, -0.4], lookTo: [0.3, 1.1, -0.4], fov: 46 }, keywords: ['44.000', 'millones', 'acciones'],
    actors: [
      BOARD,
      { type: 'table', pos: [0, 0, -0.4], p: { w: 3.6, d: 1.5 } },
      ...([[-1.2, 0, 0.1], [-0.6, 0.3, 'casi'], [0, 0, '44.000'], [0.6, 0.3, 'millones'], [1.2, 0, 'dólares']] as any[]).map(([x, z, at], i) => (
        { type: 'certs', pos: [x, 0.96, -0.6 + z] as [number, number, number], at, enter: 'none' as const, p: { n: 16 + i * 6, dur: 0.7 } })),
      { type: 'person', pos: [-0.5, 0, -1.65], s: 0.95, p: { ...SUIT, pose: 'idle' } },
      { type: 'person', pos: [0.6, 0, -1.65], s: 0.95, p: { ...SUIT, shirt: BURG, hair: '#2a1c12', pose: 'idle' }, out: 'acciones' },
      { type: 'person', pos: [0.6, 0, -1.65], s: 0.95, at: 'acciones', enter: 'none', p: { ...SUIT, shirt: BURG, hair: '#2a1c12', pose: 'cheer' } },
    ],
    overlays: [{ type: 'big', text: '', count: { to: 43900, pre: 'US$ ', post: ' MILLONES' }, at: '44.000', y: 62, size: 72 }, tag('TODO EN ACCIONES', 'acciones', { color: '#2d5a3d', size: 46, y: 75 })] },

  // 9. Más que Google por Wiz: 32.000 millones.  (contrapicado frontal que se acerca a la balanza)
  { id: 'b09', set: 'room', cam: { from: [-0.2, 1.1, 6.6], to: [0.15, 1.5, 5.7], look: [0, 1.75, 0], lookTo: [0, 1.65, 0], fov: 46 }, keywords: ['Google', '32.000'],
    actors: [
      BOARD,
      { type: 'scale', pos: [-0.05, 0.35, -0.2], s: 0.62, p: { tip: 0.9, left: '43.900', right: '32.000' } },
    ],
    overlays: [tag('RÉCORD ANTERIOR: GOOGLE → WIZ · US$ 32.000 M', 'Google', { color: '#3c4a6b', size: 34, y: 72 })] },

  // 10. Ese día su acción cae un 9 por ciento, y la oferta vale menos.  (paneo que baja con la etiqueta de la grúa)
  { id: 'b10', set: 'room', cam: { from: [1.0, 2.9, 6.6], to: [-0.2, 2.1, 6.0], look: [0.1, 2.6, 0], lookTo: [0.1, 1.9, 0], fov: 46 }, keywords: ['9', 'oferta'],
    actors: [
      TARMAC,
      { type: 'crane', pos: [0.2, 0, 0] },
      { type: 'pricetag', pos: [0.6, 3.1, 0], p: { v0: 'US$ 260', v1: 'US$ 237', drop: 1.65, flip: 3.76 } },
      { type: 'arrow', pos: [-0.75, 2.2, 0.4], rot: [0, 0, Math.PI], at: '9', s: 0.85, p: { len: 1.0, color: RED } },
      { type: 'bag', pos: [1.5, 0, 0.6], rot: [0, -0.5, 0], p: { color: SIGN } },
      { type: 'bag', pos: [-1.4, 0, 0.9], rot: [0, 0.4, 0], s: 0.9, p: { color: CREAM } },
    ],
    overlays: [tag('CROWDSTRIKE −9%', '9', { color: RED, size: 54, y: 69 }), tag('OFERTA: US$ 260 → 237 POR ACCIÓN', 'menos', { color: INK, size: 42, y: 75.5 })] },

  // 11. Faltan los reguladores: no cierra antes de agosto de 2027.  (órbita lenta frente al estrado)
  { id: 'b11', set: 'room', cam: { from: [-1.4, 2.1, 6.6], to: [1.0, 2.3, 6.4], look: [0, 1.4, -0.5], fov: 46 }, keywords: ['reguladores', 'cierra', 'agosto'],
    actors: [
      HALL,
      { type: 'bench', pos: [0, 0, -1.6] },
      ...[-1.1, 0, 1.1].map((x, i) => ({ type: 'person', pos: [x, 0, -2.2] as [number, number, number], s: 0.95, at: i === 1 ? 'los' : i === 0 ? 'reguladores' : 'no', p: { ...SUIT, shirt: ['#3c4a6b', '#2b2b30', '#5b5f66'][i], pose: 'idle' } })),
      { type: 'hourglass', pos: [0, 0, 0.6], s: 1.1, p: {} },
      { type: 'calendar', pos: [1.15, 2.35, -0.6], rot: [0, -0.25, 0], s: 0.55, at: 'agosto', p: { top: 'AGOSTO', big: '2027', color: ORANGE } },
    ],
    overlays: [tag('CIERRE: NO ANTES DE AGOSTO DE 2027', 'agosto', { color: TEAL, size: 42, y: 72 })] },

  // 12. La de la pantalla azul quiere cuidar también el internet de las empresas.  (vuelve el mostrador; dolly out que revela el arco)
  { id: 'b12', set: 'room', cam: { from: [-0.5, 1.7, 4.4], to: [0.3, 2.2, 7.2], look: [-0.7, 1.5, 0], lookTo: [0, 1.4, 0], fov: 46 }, keywords: ['azul', 'internet'],
    actors: [
      TERMINAL,
      { type: 'kiosk', pos: [-0.9, 0, -0.2], p: { blue: true, sign: '2' } },
      { type: 'wire', pos: [0.15, 0.9, -0.2], at: 'cuidar', p: { len: 1.2 } },
      { type: 'scanner', pos: [1.15, 0, -0.6], s: 0.85, at: 'internet', p: { start: 0.3, name: 'ZSCALER' } },
      { type: 'dome', pos: [0.1, 0, -0.4], at: 'también', p: { r: 2.0, color: '#ff8a8a' } },
    ],
    overlays: [tag('2024: PANTALLA AZUL', 'azul', { color: BSOD, size: 46, y: 69 }), tag('2026: EL INTERNET DE LAS EMPRESAS', 'internet', { color: TEAL, size: 42, y: 75.5 })] },

  // 13. Cuando decidan los reguladores, te lo cuento acá.  (empujón lento al cartel, el pasajero espera sentado)
  { id: 'b13', set: 'room', cam: { from: [0.5, 1.7, 7.6], to: [0.1, 1.8, 6.7], look: [0, 1.5, -1], lookTo: [0, 1.6, -1.4], fov: 46 }, keywords: ['decidan', 'reguladores'],
    actors: [
      TERMINAL,
      { type: 'flap', pos: [0, 2.45, -2.2], p: { w: 3.0, h: 1.45, rows: [
        { f: 'CS→Z', city: 'COMPRA', st: 'EN ESPERA', c: SIGN },
        { f: 'XQ 210', city: 'NUEVA YORK', st: 'A HORARIO', c: '#9fe8a8' },
        { f: 'XQ 482', city: 'ATLANTA', st: 'A HORARIO', c: '#9fe8a8' },
        { f: 'XQ 133', city: 'LONDRES', st: 'A HORARIO', c: '#9fe8a8' }] } },
      { type: 'seats', pos: [0, 0, 0.4], p: { n: 3 } },
      { type: 'person', pos: [-0.62, 0.15, 0.45], p: { ...PAX, pose: 'sit' } },
      { type: 'bag', pos: [0.62, 0.0, 0.85], p: { color: ORANGE } },
      { type: 'hourglass', pos: [0.62, 0.5, 0.35], s: 0.35, at: 'decidan', p: {} },
    ],
    overlays: [tag('CUANDO DECIDAN LOS REGULADORES,', 'decidan', { color: INK, size: 44, y: 68.5 }), tag('LO CUENTO ACÁ', 'decidan', { color: INK, size: 44, y: 74 })] },
];
