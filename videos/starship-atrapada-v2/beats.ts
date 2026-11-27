import type { BeatSpec } from '../../src/Beat';
import { INK, ORANGE, RED, TEAL } from './props';

// Versión 2: otro look que el original (neón violeta, grilla, vacío, carteles 3D).
// Acá: cocina con mesa de madera y mantel a cuadros (la mosca y los palitos chinos), costa de Texas al atardecer y de noche,
// espacio azul profundo, golfo al anochecer y hangar de chapa. Metáfora que abre y cierra: la mosca atrapada con palitos (planos 1,
// 2 y 6) vuelve en el plano 12 con dos pares de palitos: una mosca atrapada y otra que sigue volando.
// Textos 2D: exactamente los de "## Placas por plano" de guion.md (las largas, partidas en dos renglones). Todo entre el 63% y el
// 77% de alto, centrado en x 48%. Sin carteles 3D.
const PI = Math.PI;
const KITCHEN = { type: 'stage', p: { kind: 'kitchen' } };
const COAST = { type: 'stage', p: { kind: 'coast' } };
const NIGHT = { type: 'stage', p: { kind: 'coast', night: true } };
const SPACE = { type: 'stage', p: { kind: 'space' } };
const SEA = { type: 'stage', p: { kind: 'sea' } };
const tag = (text: string, at: any, o: any = {}) => ({ type: 'tag' as const, text, at, x: 48, y: 70, color: INK, size: 46, ...o });
const T1 = 68.5, T2 = 75; // dos renglones
const BEACH = { shirt: '#e07a4f', pants: '#2f4a5c', hair: '#3a2a1a', skin: '#e0b48f' };
const BEACH2 = { shirt: '#3f8f88', pants: '#3a3d44', hair: '#5a3a1a', skin: '#c98d62' };

export const BEATS: BeatSpec[] = [
  // 1. Es como agarrar una mosca con palitos chinos.  (empujón bajo, a la altura de la mesa)
  { id: 'b01', set: 'room', cam: { from: [0.7, 1.15, 6.0], to: [0.1, 1.45, 4.7], look: [0.1, 1.25, 0], lookTo: [0, 1.4, 0], fov: 46 }, keywords: ['mosca', 'chinos'],
    actors: [
      KITCHEN,
      { type: 'bowl', pos: [-0.35, 0, 0.3] },
      { type: 'sticks', pos: [-0.35, 1.45, 0.3], rot: [0, 0, 0.5], p: { len: 2.6, open: 0.75, gap: 0.1, close: 1.82 } },
      { type: 'fly', pos: [-0.35, 1.45, 0.3], s: 0.42, p: { buzz: 0.45, stop: 1.8 } },
    ],
    overlays: [tag('UNA MOSCA · DOS PALITOS', 'mosca', { size: 50 })] },

  // 2. Pero la mosca mide unos 50 metros y viene del espacio.  (grúa que sube por la nave hasta el cielo)
  { id: 'b02', set: 'room', cam: { from: [0.4, 0.55, 6.2], to: [-0.2, 1.7, 7.0], look: [0, 1.0, 0], lookTo: [0, 1.6, 0], fov: 46 }, keywords: ['50', 'espacio'],
    actors: [
      COAST,
      { type: 'fly', pos: [0, 1.4, 0], s: 1.5, out: '50', p: { buzz: 0.25 } },
      { type: 'person', pos: [0.75, 0, 0.6], s: 0.22, rot: [0, -0.4, 0], p: { ...BEACH, pose: 'point' } },
      { type: 'ship', pos: [0, 0.06, 0], s: 1.1, at: '50', out: 'viene', enter: 'grow' },
      { type: 'ruler', pos: [-0.75, 0.06, 0.2], at: 'mide', p: { h: 2.2, n: 5 } },
      { type: 'streaks', pos: [0, 2.0, -0.4], at: 'viene', enter: 'none', p: { n: 14, w: 2.6, h: 3.2, speed: 7 } },
      { type: 'ship', pos: [0.2, 2.9, 0], s: 1.0, at: 'viene', enter: 'none', p: { horiz: true, roll: PI / 2, plasma: true }, move: { to: [0.1, 2.1, 0], at: 'viene', dur: 1.3 } },
    ],
    overlays: [tag('LA "MOSCA": UNOS 50 METROS', 'mosca', { size: 46, y: T1 }), tag('VIENE DEL ESPACIO', 'viene', { color: TEAL, size: 46, y: T2 })] },

  // 3. Pasó el 14 de noviembre en Texas, con la nave Starship de SpaceX.  (travelling lateral por la playa)
  { id: 'b03', set: 'room', cam: { from: [1.3, 1.5, 7.4], to: [-0.6, 1.9, 7.2], look: [0.3, 1.6, 0], lookTo: [-0.2, 1.8, 0], fov: 46 }, keywords: ['14', 'Texas', 'Starship'],
    actors: [
      COAST,
      { type: 'tower', pos: [-1.0, 0, -0.6], s: 0.95, p: { armY: 2.3 } },
      { type: 'ship', pos: [0.9, 3.0, -0.5], s: 0.55, p: { horiz: true, roll: PI / 2, plasma: true }, move: { to: [0.35, 2.55, -0.5], at: 0, dur: 4.7 } },
      { type: 'streaks', pos: [0.6, 2.7, -0.8], p: { n: 8, w: 1.4, h: 1.6, speed: 5 } },
      { type: 'person', pos: [0.2, 0, 1.6], rot: [0, PI + 0.3, 0], s: 0.6, at: 'Texas', p: { ...BEACH, pose: 'point' } },
      { type: 'person', pos: [0.8, 0, 1.9], rot: [0, PI - 0.2, 0], s: 0.6, at: 'nave', p: { ...BEACH2, pose: 'cheer' } },
    ],
    overlays: [tag('STARSHIP · SPACEX', 'Starship', { size: 48, y: T1 }), tag('TEXAS · 14/11/2026', '14', { color: TEAL, size: 46, y: T2 })] },

  // 4. Venía de dar 14 vueltas a la Tierra en 22 horas y media.  (órbita de cámara alrededor de la Tierra)
  { id: 'b04', set: 'room', cam: { from: [1.6, 2.3, 6.2], to: [-1.3, 1.7, 6.5], look: [0, 1.65, 0], fov: 46 }, keywords: ['14', '22'],
    actors: [
      SPACE,
      { type: 'earth', pos: [0, 1.75, 0], at: '14', enter: 'none', p: { n: 14, dur: 2.9, R: 0.95 } },
      { type: 'earth', pos: [0, 1.75, 0], out: '14', p: { n: 0, R: 0.95 } },
    ],
    overlays: [tag('14 VUELTAS A LA TIERRA', '14', { color: ORANGE, size: 50, y: T1 }), tag('22 H 30 MIN', '22', { color: TEAL, size: 50, y: T2 })] },

  // 5. Prendió los motores, frenó en el aire y dos brazos de la torre la atraparon.  (contrapicado desde la arena)
  { id: 'b05', set: 'room', cam: { from: [1.3, 0.45, 6.2], to: [0.6, 0.85, 5.5], look: [0.1, 2.0, 0], lookTo: [-0.1, 2.0, 0], fov: 48 }, keywords: ['motores', 'brazos'],
    actors: [
      COAST,
      { type: 'tower', pos: [-0.95, 0, 0], p: { armY: 2.3, close: 3.95 } },
      { type: 'streaks', pos: [0.3, 2.4, -0.3], out: 'frenó', p: { n: 12, w: 2.2, h: 2.4, speed: 7 } },
      { type: 'ship', pos: [0.45, 2.95, 0], s: 0.9, p: { flipAt: 0.6, flipDur: 0.8, roll: PI / 2, flame: 0.58, flameOff: 3.95, flameLen: 0.9 }, move: { to: [0.2, 2.22, 0], at: 'frenó', dur: 2.4 } },
    ],
    overlays: [tag('MOTORES ENCENDIDOS', 'motores', { color: ORANGE, size: 48, y: T1 }), tag('FRENA EN EL AIRE', 'frenó', { color: TEAL, size: 48, y: T2 })] },

  // 6. Su apodo en inglés significa eso: palitos chinos.  (vista de tres cuartos que gira sobre la mesa)
  { id: 'b06', set: 'room', cam: { from: [1.3, 2.9, 4.8], to: [-0.7, 2.5, 5.0], look: [0, 1.3, 0], lookTo: [0, 1.35, 0], fov: 46 }, keywords: ['apodo', 'chinos'],
    actors: [
      KITCHEN,
      { type: 'bowl', pos: [0.2, 0, -0.1] },
      { type: 'ship', pos: [0.1, 1.15, 0.2], s: 0.5, p: { center: true }, bob: 0.03 },
      { type: 'sticks', pos: [0.1, 1.53, 0.2], rot: [0, PI, 0.38], p: { len: 2.4, open: 0.7, gap: 0.2, close: 2.4 } },
    ],
    overlays: [tag('"CHOPSTICKS" = PALITOS CHINOS', 'apodo', { size: 44 })] },

  // 7. Nunca habían agarrado la nave. Las anteriores terminaban en el mar o destruidas.  (travelling lateral a ras del agua)
  { id: 'b07', set: 'room', cam: { from: [-1.2, 1.3, 6.2], to: [1.0, 1.7, 6.4], look: [-0.4, 1.1, 0], lookTo: [0.4, 1.0, 0], fov: 46 }, keywords: ['Nunca', 'anteriores', 'destruidas'],
    actors: [
      SEA,
      { type: 'ring', pos: [-0.7, 0.03, 0], p: { r: 0.45, color: ORANGE } },
      { type: 'ship', pos: [-0.7, 2.3, 0], rot: [0, 0, 0.5], s: 0.75, p: { center: true }, move: { to: [-0.75, 0.05, 0], at: 'anteriores', dur: 1.3 } },
      { type: 'splash', pos: [-0.75, 0, 0], at: 'mar', enter: 'none', p: { r: 0.7 } },
      { type: 'ship', pos: [0.85, 0.06, -0.3], s: 0.75, at: 'nave', out: 'destruidas', bob: 0.02 },
      { type: 'burst', pos: [0.85, 0.9, -0.3], at: 'destruidas', enter: 'none', p: { r: 0.55 } },
      { type: 'debris', pos: [0.85, 0, -0.3], at: 'destruidas', enter: 'none', p: { n: 10, spread: 0.7 } },
    ],
    overlays: [tag('PRIMERA VEZ QUE ATRAPAN LA NAVE', 'Nunca', { size: 40 })] },

  // 8. Pero el cohete tiene dos mitades.  (grúa que baja por el cohete en el hangar)
  { id: 'b08', set: 'room', cam: { from: [0.5, 3.0, 5.8], to: [-0.4, 1.7, 6.6], look: [0, 2.3, 0], lookTo: [0, 1.55, 0], fov: 46 }, keywords: ['cohete', 'mitades'],
    actors: [
      { type: 'stage', p: { kind: 'hangar' } },
      { type: 'booster', pos: [0, 0, 0], s: 0.6, p: { glow: '#7a3a10' } },
      { type: 'ship', pos: [0, 1.68, 0], s: 0.6, move: { to: [0, 2.25, 0], at: 'dos', dur: 0.5 }, p: { glow: '#0d5a60' } },
      { type: 'seam', pos: [0, 1.7, 0], at: 'dos', enter: 'none' },
    ],
    overlays: [tag('ARRIBA: NAVE', 'dos', { color: TEAL, size: 50, y: T1 }), tag('ABAJO: PROPULSOR', 'mitades', { color: ORANGE, size: 50, y: T2 })] },

  // 9. Al propulsor, la mitad de abajo, ya lo habían atrapado tres veces.  (travelling por tres torres en fila)
  { id: 'b09', set: 'room', cam: { from: [-1.1, 1.6, 6.6], to: [0.7, 1.9, 6.9], look: [-0.6, 1.2, 0], lookTo: [0.4, 1.2, 0], fov: 46 }, keywords: ['propulsor', 'tres'],
    actors: [
      COAST,
      ...[[-1.4, 0], [-0.47, 'ya'], [0.46, 'atrapado']].flatMap(([x, at], i) => [
        { type: 'tower', pos: [x as number, 0, -0.3 - i * 0.1] as [number, number, number], s: 0.6, at: at || undefined, p: { closed: true } },
        { type: 'booster', pos: [(x as number) + 0.63, 0.3, -0.3 - i * 0.1] as [number, number, number], s: 0.5, at: at || undefined, p: { glow: '#7a3a10' } },
        { type: 'check', pos: [(x as number) + 0.6, 2.3, 0.1] as [number, number, number], s: 0.9, at: ['ya', 'atrapado', 'tres'][i], p: { size: 0.42 } },
      ]),
    ],
    overlays: [tag('PROPULSOR: 3 VECES ATRAPADO ANTES', 'atrapado', { size: 38 })] },

  // 10. Esta vez se perdió en el Golfo de México.  (picado alto que baja hacia el agua)
  { id: 'b10', set: 'room', cam: { from: [0.6, 4.2, 5.0], to: [-0.4, 3.0, 5.6], look: [0, 1.2, 0], lookTo: [0, 0.6, 0], fov: 46 }, keywords: ['perdió', 'Golfo'],
    actors: [
      SEA,
      { type: 'booster', pos: [0.5, 2.6, 0], rot: [0, 0, 0.7], s: 0.6, out: 'perdió', p: { center: true }, move: { to: [0.05, 0.4, 0.2], at: 0.1, dur: 0.85 } },
      { type: 'burst', pos: [0.05, 0.4, 0.2], at: 'perdió', enter: 'none', p: { r: 0.6 } },
      { type: 'splash', pos: [0.05, 0, 0.2], at: 'perdió', enter: 'none', p: { r: 0.8 } },
      { type: 'debris', pos: [0.05, 0, 0.2], at: 'Golfo', enter: 'none', p: { n: 12, spread: 1.0, seed: 3 } },
    ],
    overlays: [tag('VUELO 15: PROPULSOR PERDIDO', 'perdió', { color: RED, size: 46, y: T1 }), tag('GOLFO DE MÉXICO', 'Golfo', { color: TEAL, size: 46, y: T2 })] },

  // 11. Elon Musk dijo después que esta nave se retira.  (acercamiento en el hangar; las luces se apagan)
  { id: 'b11', set: 'room', cam: { from: [0.4, 1.9, 7.6], to: [0.05, 1.6, 6.5], look: [0, 1.3, 0], lookTo: [0, 1.35, 0], fov: 46 }, keywords: ['Elon Musk', 'retira'],
    actors: [
      { type: 'stage', p: { kind: 'hangar', dim: 2.7 } },
      { type: 'ship', pos: [-0.55, 0, -0.4], s: 1.15 },
      { type: 'person', pos: [0.9, 0, 0.3], rot: [0, -0.5, 0], s: 0.85, p: { shirt: '#1f242b', pants: '#1a1d22', hair: '#3a2a1a', skin: '#e9c3a0', pose: 'point' } },
      { type: 'podium', pos: [0.82, 0, 0.75], rot: [0, -0.5, 0], s: 0.85 },
    ],
    overlays: [tag('ELON MUSK: ESTA NAVE SE RETIRA', 'Elon', { size: 42 })] },

  // 12. Agarrar las dos en el mismo vuelo sigue pendiente.  (órbita corta sobre la mesa: una mosca atrapada, otra suelta)
  { id: 'b12', set: 'room', cam: { from: [-1.0, 2.0, 5.6], to: [0.9, 2.2, 5.4], look: [0, 1.4, 0], fov: 46 }, keywords: ['dos', 'pendiente'],
    actors: [
      KITCHEN,
      { type: 'bowl', pos: [0, 0, 0.2] },
      { type: 'sticks', pos: [-0.55, 1.5, 0], rot: [0, PI, 0.35], p: { len: 1.9, closed: true, gap: 0.1 } },
      { type: 'fly', pos: [-0.55, 1.5, 0], s: 0.4, p: { stop: 0 } },
      { type: 'check', pos: [-0.6, 2.2, 0.2], at: 'dos', p: { size: 0.35 } },
      { type: 'sticks', pos: [0.55, 1.5, 0], rot: [0, 0, 0.35], p: { len: 1.9, open: 0.7 } },
      { type: 'fly', pos: [0.6, 1.55, 0], s: 0.4, p: { buzz: 0.4 } },
      { type: 'hourglass', pos: [0.7, 0, 1.0], s: 0.6, at: 'pendiente' },
    ],
    overlays: [tag('LAS DOS MITADES EN UN VUELO:', 'dos', { size: 44, y: T1 }), tag('PENDIENTE', 'pendiente', { color: ORANGE, size: 52, y: T2 })] },

  // 13. Al 26 de noviembre, el vuelo 16 apunta a diciembre, sin fecha confirmada.  (grúa que sube por el cohete nuevo, de noche)
  { id: 'b13', set: 'room', cam: { from: [0.7, 0.6, 6.4], to: [0.2, 2.1, 7.3], look: [0, 1.0, 0], lookTo: [0, 1.75, 0], fov: 46 }, keywords: ['16', 'confirmada'],
    actors: [
      NIGHT,
      { type: 'tower', pos: [-1.05, 0, -0.3], p: { armY: 2.5 } },
      { type: 'booster', pos: [-0.25, 0.06, -0.3], s: 0.6 },
      { type: 'ship', pos: [-0.25, 1.74, -0.3], s: 0.6, at: 'vuelo', enter: 'drop' },
      { type: 'hourglass', pos: [0.95, 0.06, 0.5], s: 0.75, at: 'sin' },
    ],
    overlays: [tag('VUELO 16 · DICIEMBRE', '16', { color: TEAL, size: 50, y: T1 }), tag('SIN FECHA CONFIRMADA (AL 26/11/2026)', 'sin', { size: 36, y: T2 })] },

  // 14. ¿Qué parte te costó creer? Te leo.  (acercamiento sobre la mesa)
  { id: 'b14', set: 'room', cam: { from: [0.9, 2.4, 5.6], to: [0.2, 1.9, 4.6], look: [0, 0.9, 0], lookTo: [0, 1.0, 0], fov: 46 }, keywords: ['creer', 'leo'],
    actors: [
      KITCHEN,
      { type: 'bowl', pos: [-0.2, 0, 0] },
      { type: 'sticks', pos: [-1.0, 0.66, 0.05], rot: [-PI / 2, 0, 0.05], p: { len: 2.2, open: 0.2, butt: 0.14, hand: false } },
      { type: 'ship', pos: [0.95, 0.01, -0.2], s: 0.45 },
      { type: 'fly', pos: [-0.1, 1.45, 0.4], s: 0.4, p: { buzz: 0.4 } },
    ],
    overlays: [tag('¿QUÉ PARTE TE COSTÓ CREER?', 0, { color: ORANGE, size: 50 })] },
];
