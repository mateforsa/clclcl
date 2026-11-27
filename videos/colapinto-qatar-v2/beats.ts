import type { BeatSpec } from '../../src/Beat';
import { CEL, NAVY, WHITE, AMBER, RED, GREEN, GRAPH, ORANGE, CELD, MAROON } from './props';

// Versión 2: otro look que el original (ciudad neón violeta con grilla, auto azul y magenta, calendarios y ruleta).
// Acá: Lusail de noche en el desierto (asfalto, pianos rojo y blanco, arena, dunas bajo cielo azul petróleo), box de boxes
// gris y carbón con celeste, calle de Las Vegas con barreras de hormigón y torres de ventanas ámbar, torre de tiempos negra
// con letras ámbar y el atardecer rojo de Abu Dabi. Auto genérico celeste y blanco con casco blanco: sin logos ni sponsors.
// Metáfora que abre y cierra: el cartel de boxes (pit board) que el equipo le muestra al piloto. Abre con el semáforo de
// largada y "QATAR 0"; cierra con el cartel "P?" y los números del público.
// Textos 2D: exactamente los de "## Placas por plano" de guion.md, centrados en x 48% y a 72% de alto (abajo de 1500 px).
// Cifras que son datos (puntos, puestos, horarios) aparecen fijas: nada cuenta desde 0.
const L = (o: any = {}) => ({ type: 'stage', p: { kind: 'lusail', ...o } });
const DUSK = (o: any = {}) => ({ type: 'stage', p: { kind: 'dusk', ...o } });
const GAR = { type: 'stage', p: { kind: 'garage' } };
const VEG = (o: any = {}) => ({ type: 'stage', p: { kind: 'vegas', ...o } });
const BOARD = { type: 'stage', p: { kind: 'board' } };
const sz = (text: string) => Math.min(52, Math.floor(820 / (text.length * 0.6)));
const placa = (text: string, at: any, color = NAVY) => ({ type: 'tag' as const, text, at, x: 48, y: 72, color, size: sz(text) });
const PI = Math.PI;
const ME = { color: CEL, accent: WHITE, stripe: NAVY, helmet: WHITE };
const ME2024 = { color: '#7c8590', accent: WHITE, stripe: ORANGE, helmet: WHITE };
const RIV = [
  { color: GRAPH, accent: ORANGE, stripe: '#1b1e23', helmet: '#e0e0e0' },
  { color: '#b8221c', accent: WHITE, stripe: '#1b1e23', helmet: '#f2c230' },
  { color: '#e9ecef', accent: '#2b2f35', stripe: '#4caf50', helmet: '#2b2f35' },
  { color: '#16403a', accent: '#9be3c6', stripe: '#0c1a18', helmet: '#e0e0e0' },
];
const PILOT = { suit: CEL, accent: NAVY, helmet: WHITE };
const OTHER = { suit: '#5d636c', accent: '#2b2f35', helmet: '#c9ccd1' };

export const BEATS: BeatSpec[] = [
  // 1. Domingo 29, una de la tarde.  (grúa baja desde atrás del auto: se encienden las cinco luces y se apagan)
  { id: 'b01', set: 'room', cam: { from: [0.9, 0.55, 5.6], to: [0.5, 1.25, 5.0], look: [0, 1.0, -1], lookTo: [0, 1.25, -1.2], fov: 46 }, keywords: ['29'],
    actors: [
      L(),
      { type: 'gantry', pos: [0, 0, -1.6], s: 0.85, p: { on: [0.15, 0.55, 0.95, 1.35, 1.75], off: 2.35 } },
      { type: 'f1', pos: [0.7, 0, -0.2], rot: [0, PI, 0], s: 0.5, p: RIV[1] },
      { type: 'f1', pos: [-0.1, 0, 1.5], rot: [0, PI, 0], s: 0.6, p: ME },
    ],
    overlays: [placa('DOMINGO 29 · 13:00 (ARG)', '29')] },

  // 2. Colapinto larga en Qatar, donde nunca sumó un punto.  (frontal que retrocede delante del auto lanzado)
  { id: 'b02', set: 'room', cam: { from: [-0.9, 1.3, 4.6], to: [-0.4, 1.6, 6.0], look: [0, 0.7, 0], lookTo: [0.2, 0.95, 0], fov: 46 }, keywords: ['Qatar', 'nunca'],
    actors: [
      L({ speed: 7 }),
      { type: 'f1', pos: [0, 0, 0], s: 0.62, p: { ...ME, speed: 14 } },
      { type: 'label', pos: [-0.3, 1.25, 0], at: 'Colapinto', bob: 0.03, p: { text: 'COLAPINTO', w: 1.4, h: 0.36, bg: CEL, color: NAVY, size: 0.66, weight: 900 } },
      { type: 'pitboard', pos: [0.95, 0, -1.2], rot: [0, -0.3, 0], at: 'nunca', p: { lines: [{ t: 'QATAR' }, { t: '0 PTS', c: '#ff5a4e' }], w: 0.9, pole: 0.6, frame: RED } },
    ],
    overlays: [placa('QATAR: 0 PUNTOS EN SU CARRERA', 'nunca', RED)] },

  // 3. En 2024 chocó en la primera vuelta y abandonó.  (picado alto que gira mientras el auto se va contra los neumáticos)
  { id: 'b03', set: 'room', cam: { from: [2.0, 3.1, 5.6], to: [0.4, 2.7, 6.0], look: [0.4, 0.3, 0], lookTo: [0.7, 0.4, 0.3], fov: 46 }, keywords: ['2024', 'abandonó'],
    actors: [
      L(),
      { type: 'tyres', pos: [1.85, 0, 0.4], rot: [0, -PI / 2 + 0.25, 0], p: { n: 7, rows: 3 } },
      { type: 'f1', pos: [-0.6, 0, -2.6], rot: [0, 0.18, 0], s: 0.55, out: 'chocó', p: { ...ME2024, speed: 14 }, move: { to: [0.3, 0, 0.2], at: 0, dur: 1.35 } },
      { type: 'f1', pos: [1.15, 0.05, 0.5], rot: [0.05, 1.25, 0.12], s: 0.55, at: 'chocó', enter: 'none', p: ME2024 },
      { type: 'smoke', pos: [1.35, 0, 0.5], at: 'chocó', p: { n: 10, spread: 0.9 } },
      { type: 'cross', pos: [1.05, 1.35, 0.6], at: 'abandonó', p: { size: 0.55 } },
    ],
    overlays: [placa('2024: ABANDONO EN LA VUELTA 1', '2024', RED)] },

  // 4. En 2025 llegó 14°.  (cámara al ras del piano: el auto cruza la llegada a cuadros)
  { id: 'b04', set: 'room', cam: { from: [-1.5, 0.55, 5.2], to: [-0.9, 0.75, 4.5], look: [0, 0.65, -0.5], lookTo: [0.2, 0.8, -0.2], fov: 46 }, keywords: ['2025', '14'],
    actors: [
      L(),
      { type: 'finish', pos: [0, 0, -0.4], s: 0.9, p: { w: 4.2, h: 1.6 } },
      { type: 'f1', pos: [-0.2, 0, -3.5], s: 0.55, p: { ...ME, speed: 14 }, move: { to: [-0.2, 0, 1.2], at: 0.3, dur: 1.5 } },
      { type: 'pitboard', pos: [0.4, 0, -0.3], rot: [0, -0.3, 0], at: '14', p: { lines: [{ t: 'P14' }], w: 0.9, pole: 0.8 } },
    ],
    overlays: [placa('2025: 14°', '2025')] },

  // 5. Pero esta vez llega con 35 puntos.  (contrapicado que avanza hacia el auto en el box; el 35 sube detrás)
  { id: 'b05', set: 'room', cam: { from: [0.9, 0.5, 6.0], to: [0.3, 0.85, 4.9], look: [0, 1.0, 0], lookTo: [0, 1.15, 0], fov: 46 }, keywords: ['35'],
    actors: [
      GAR,
      { type: 'f1', pos: [-0.25, 0, 0.3], rot: [0, 0.55, 0], s: 0.62, p: ME },
      { type: 'pilot', pos: [0.95, 0, 0.6], rot: [0, -0.35, 0], s: 0.78, out: '35', p: { ...PILOT, pose: 'idle' } },
      { type: 'pilot', pos: [0.95, 0, 0.6], rot: [0, -0.35, 0], s: 0.78, at: '35', enter: 'none', p: { ...PILOT, pose: 'cheer' } },
      { type: 'label', pos: [-0.55, 1.95, -3.0], at: '35', enter: 'grow', p: { text: '35', sub: 'PUNTOS EN 2026', w: 1.8, h: 1.15, bg: NAVY, border: CEL, color: AMBER, size: 0.7, weight: 900, subColor: '#fff' } },
    ],
    overlays: [placa('2026: 35 PUNTOS', '35', GREEN)] },

  // 6. El año pasado, con el mismo equipo, Alpine, terminó con cero.  (travelling lateral de izquierda a derecha por el box)
  { id: 'b06', set: 'room', cam: { from: [-1.3, 1.5, 5.4], to: [0.9, 1.6, 5.6], look: [-0.5, 1.0, 0], lookTo: [0.3, 1.0, 0], fov: 46 }, keywords: ['Alpine', 'cero'],
    actors: [
      GAR,
      { type: 'f1', pos: [-0.5, 0, -0.2], rot: [0, 0.9, 0], s: 0.58, p: ME },
      { type: 'pilot', pos: [0.75, 0, 0.5], rot: [0, -0.4, 0], s: 0.78, out: 'cero', p: { ...PILOT, pose: 'idle' } },
      { type: 'pilot', pos: [0.75, 0, 0.5], rot: [0, -0.4, 0], s: 0.78, at: 'cero', enter: 'none', p: { ...PILOT, pose: 'shrug' } },
      { type: 'pitboard', pos: [-0.75, 0, -1.4], rot: [0, 0.2, 0], at: 'cero', p: { lines: [{ t: '2025' }, { t: '0 PTS', c: '#ff5a4e' }], w: 0.95, pole: 1.25, frame: RED } },
    ],
    overlays: [placa('2025 CON ALPINE: 0', 'Alpine', RED)] },

  // 7. La semana pasada, en Las Vegas, largó noveno y cruzó la meta séptimo.  (grúa alta sobre la grilla en la calle)
  { id: 'b07', set: 'room', cam: { from: [1.3, 4.3, 6.8], to: [0.5, 3.4, 6.0], look: [0, 0, -0.8], lookTo: [0, 0.2, -1.2], fov: 46 }, keywords: ['Vegas', 'noveno', 'séptimo'],
    actors: [
      VEG(),
      ...[0, 1, 2, 3, 4, 5, 6, 7].map((i) => ({ type: 'f1', pos: [i % 2 ? 0.7 : -0.7, 0, 2 - (8 - i) * 0.8] as [number, number, number], rot: [0, PI, 0] as [number, number, number], s: 0.42, p: RIV[i % 4] })),
      { type: 'f1', pos: [-0.7, 0, 2.0], rot: [0, PI, 0], s: 0.42, p: { ...ME, speed: 0 }, move: { to: [-0.7, 0, 0.4], at: 'cruzó', dur: 0.9 } },
      { type: 'ring', pos: [-0.7, 0.05, 2.0], at: 'largó', out: 'cruzó', p: { r: 0.6, color: AMBER } },
      { type: 'pitboard', pos: [0.6, 0, 1.2], rot: [0, -0.3, 0], s: 1.1, at: 'largó', out: 'séptimo', p: { lines: [{ t: 'P9' }], w: 0.8, pole: 0.7 } },
      { type: 'pitboard', pos: [0.6, 0, 1.2], rot: [0, -0.3, 0], s: 1.1, at: 'séptimo', p: { lines: [{ t: 'P7', c: AMBER }], w: 0.8, pole: 0.7, frame: GREEN } },
    ],
    overlays: [placa('LAS VEGAS: LARGÓ 9° · LLEGÓ 7°', 'Vegas')] },

  // 8. Una penalización a otro piloto lo subió a sexto, su mejor puesto en la Fórmula 1.  (diagonal que sube por la torre de tiempos)
  { id: 'b08', set: 'room', cam: { from: [-1.1, 0.9, 6.6], to: [0.6, 1.3, 6.0], look: [0, 1.0, 0], lookTo: [0, 1.15, 0], fov: 46 }, keywords: ['penalización', 'sexto'],
    actors: [
      BOARD,
      { type: 'timing', pos: [0, 2.45, 0], p: { w: 2.6, rh: 0.5, swap: { a: 1, b: 2, at: 1.86 }, rows: [
        { pos: 'P5', name: '· · ·' }, { pos: 'P6', name: '· · ·' }, { pos: 'P7', name: 'COLAPINTO', hi: true }, { pos: 'P8', name: '· · ·' }] } },
      { type: 'label', pos: [0, 0.5, 2.0], rot: [-0.3, 0, 0], at: 'penalización', out: 'subió', p: { text: 'OTRO PILOTO  +10 s', w: 1.5, h: 0.3, bg: RED, size: 0.62, weight: 900 } },
    ],
    overlays: [placa('SANCIÓN A OTRO PILOTO: 6°', 'sexto', GREEN)] },

  // 9. Y con eso cortó seis carreras seguidas sin sumar.  (travelling por la fila de seis ceros hasta la tarjeta verde)
  { id: 'b09', set: 'room', cam: { from: [-0.6, 1.5, 6.0], to: [0.3, 1.4, 5.8], look: [-0.4, 0.9, 0], lookTo: [0.05, 0.9, 0], fov: 46 }, keywords: ['seis', 'sumar'],
    actors: [
      DUSK(),
      ...[0, 1, 2, 3, 4, 5].map((i) => ({ type: 'racecard', pos: [-1.3 + i * 0.36, 0, -0.3 - i * 0.02] as [number, number, number], s: 0.85, ...(i < 2 ? {} : { at: 0.1 * i }),
        p: { top: '', big: '0', color: '#3a1d1d', w: 0.4, h: 0.56 } })),
      { type: 'racecard', pos: [1.05, 0, -0.1], s: 0.82, at: 'seguidas', p: { top: 'LAS VEGAS', big: '6°', color: GREEN, hi: true, w: 0.62, h: 0.7 } },
      { type: 'check', pos: [1.05, 1.55, 0.0], at: 'sumar', p: { size: 0.4 } },
    ],
    overlays: [placa('6 CARRERAS SIN PUNTOS: SE TERMINÓ', 'cortó')] },

  // 10. Llega 12° en el campeonato, a tres puntos del 11°.  (órbita alrededor de los escalones)
  { id: 'b10', set: 'room', cam: { from: [1.4, 1.4, 5.6], to: [-0.9, 1.6, 5.8], look: [0, 0.75, 0], fov: 46 }, keywords: ['12', 'campeonato', 'tres', 'puntos'],
    actors: [
      BOARD,
      { type: 'step', pos: [-0.6, 0, 0], p: { h: 0.95, w: 1.05, color: GRAPH, text: '11°' } },
      { type: 'pilot', pos: [-0.6, 0.95, 0], s: 0.55, p: { ...OTHER, pose: 'idle' } },
      { type: 'step', pos: [0.55, 0, 0], at: 'Llega', p: { h: 0.7, w: 1.05, color: CELD, text: '12°' } },
      { type: 'pilot', pos: [0.55, 0.7, 0], s: 0.55, at: '12', p: { ...PILOT, pose: 'point' } },
      { type: 'label', pos: [0.0, 1.75, 0.4], at: 'tres', p: { text: '3 PTS', w: 0.7, h: 0.32, bg: AMBER, color: NAVY, size: 0.7, weight: 900 } },
    ],
    overlays: [placa('CAMPEONATO: 12° · A 3 PUNTOS DEL 11°', 'campeonato')] },

  // 11. Qatar es la anteúltima carrera del año.  (picado que avanza por la fila de tarjetas del calendario)
  { id: 'b11', set: 'room', cam: { from: [0.4, 2.6, 6.4], to: [-0.2, 2.1, 5.4], look: [0, 0.8, -0.5], lookTo: [0, 0.9, -0.8], fov: 46 }, keywords: ['Qatar', 'anteúltima'],
    actors: [
      L({ speed: 5 }),
      ...[0, 1, 2].map((i) => ({ type: 'racecard', pos: [-1.3 + i * 0.55, 0, -1.2] as [number, number, number], s: 0.75, p: { top: '', big: '✓', color: '#4a4f57', w: 0.5, h: 0.6 } })),
      { type: 'racecard', pos: [0.4, 0, -1.0], s: 1.0, at: 'Qatar', p: { top: 'QATAR', big: '29 NOV', color: MAROON, hi: true, w: 0.9, h: 0.85 } },
      { type: 'racecard', pos: [1.3, 0, -1.2], s: 0.75, at: 'anteúltima', p: { top: '', big: '?', color: '#4a4f57', w: 0.5, h: 0.6 } },
      { type: 'f1', pos: [-0.3, 0, 1.0], s: 0.5, p: { ...ME, speed: 14 } },
    ],
    overlays: [placa('ANTEÚLTIMA FECHA', 'anteúltima')] },

  // 12. Clasifica el sábado a las tres de la tarde, hora argentina.  (el auto sale del box y la cámara retrocede)
  { id: 'b12', set: 'room', cam: { from: [0.3, 1.0, 4.4], to: [-0.4, 1.35, 5.8], look: [0, 1.0, -0.5], lookTo: [0, 1.1, -0.5], fov: 46 }, keywords: ['Clasifica', 'sábado', 'tres', 'argentina'],
    actors: [
      GAR,
      { type: 'clock', pos: [1.0, 1.95, -3.55], at: 'tres', p: { h: 3, m: 0, r: 0.55 } },
      { type: 'f1', pos: [0.25, 0, -1.6], s: 0.58, p: { ...ME, speed: 0 }, move: { to: [0.25, 0, 0.6], at: 'Clasifica', dur: 2.6 } },
      { type: 'pilot', pos: [-0.95, 0, -0.6], rot: [0, 0.5, 0], s: 0.7, p: { suit: NAVY, accent: CEL, helmet: '#d9dde2', pose: 'point' } },
    ],
    overlays: [placa('CLASIFICACIÓN: SÁBADO 28 · 15:00 (ARG)', 'Clasifica')] },

  // 13. Después queda solo Abu Dabi.  (grúa que sube con el atardecer rojo; la última tarjeta)
  { id: 'b13', set: 'room', cam: { from: [-0.3, 0.5, 5.6], to: [0.3, 1.45, 6.0], look: [0, 1.0, -0.5], lookTo: [0, 1.0, -0.6], fov: 46 }, keywords: ['Abu Dabi'],
    actors: [
      DUSK({ speed: 4 }),
      { type: 'finish', pos: [0, 0, -1.6], s: 0.9, p: { w: 4.2, h: 1.6 } },
      { type: 'racecard', pos: [0.6, 0, 0.0], s: 1.0, at: 'Abu', p: { top: 'ABU DABI', big: '6 DIC', color: '#7a1f12', hi: true, w: 0.95, h: 0.85 } },
      { type: 'f1', pos: [-0.45, 0, 0.6], s: 0.55, p: { ...ME, speed: 14 } },
    ],
    overlays: [placa('ÚLTIMA: ABU DABI · 6 DE DICIEMBRE', 'Abu', RED)] },

  // 14. ¿En qué puesto termina Colapinto en Qatar?  (órbita amplia alrededor del piloto con el cartel P?)
  { id: 'b14', set: 'room', cam: { from: [-1.8, 1.4, 5.0], to: [1.6, 1.6, 5.2], look: [0, 1.0, 0], fov: 46 }, keywords: ['puesto', 'Colapinto'],
    actors: [
      L(),
      { type: 'f1', pos: [0.15, 0, -0.6], rot: [0, 0.35, 0], s: 0.6, p: ME },
      { type: 'pilot', pos: [-0.65, 0, 0.8], rot: [0, 0.3, 0], s: 0.8, p: { ...PILOT, pose: 'think' } },
      { type: 'pitboard', pos: [0.7, 0, 0.5], rot: [0, -0.3, 0], at: 'qué', p: { lines: [{ t: 'P ?', c: AMBER }], w: 0.95, pole: 0.9, swing: 0.04 } },
    ],
    overlays: [placa('¿EN QUÉ PUESTO TERMINA?', 'qué')] },

  // 15. Dejá un solo número en los comentarios.  (grúa que sube con los globos de números)
  { id: 'b15', set: 'room', cam: { from: [0.5, 0.7, 5.4], to: [-0.2, 1.3, 5.8], look: [0, 1.0, 0], lookTo: [0, 1.2, 0], fov: 46 }, keywords: ['número', 'comentarios'],
    actors: [
      BOARD,
      { type: 'pilot', pos: [-0.85, 0, 0.6], rot: [0, 0.4, 0], s: 0.8, p: { ...PILOT, pose: 'point' } },
      { type: 'bubbles', pos: [0, 0, 0.3], p: { rise: 0.5, items: [
        { t: '7', x: 0.3, y: 0.25, at: 0.15 }, { t: '10', x: 1.0, y: 0.55, at: 0.5, c: CEL }, { t: '5', x: 0.3, y: 1.2, at: 0.85, c: AMBER },
        { t: '12', x: 1.0, y: 1.5, at: 1.2 }] } },
    ],
    overlays: [placa('COMENTÁ UN SOLO NÚMERO', 'número')] },

  // 16. Los que más se acerquen salen nombrados en el video del resultado.  (avance hacia la torre con los nombres)
  { id: 'b16', set: 'room', cam: { from: [0.8, 1.2, 6.8], to: [0.1, 1.15, 6.0], look: [0, 1.05, 0], lookTo: [0, 1.0, 0], fov: 46 }, keywords: ['acerquen', 'nombrados', 'resultado'],
    actors: [
      GAR,
      { type: 'timing', pos: [0.05, 1.75, -0.6], p: { w: 2.2, rh: 0.46, rows: [
        { pos: '1', name: 'TU NOMBRE', hiAt: 1.42 }, { pos: '2', name: 'TU NOMBRE', hiAt: 1.6 }, { pos: '3', name: 'TU NOMBRE', hiAt: 1.78 }] } },
      { type: 'f1', pos: [0, 0, 2.1], rot: [0, 0.2, 0], s: 0.45, at: 'resultado', p: ME },
    ],
    overlays: [placa('LOS MÁS CERCANOS, NOMBRADOS', 'nombrados', GREEN)] },
];
