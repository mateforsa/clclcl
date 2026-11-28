import type { BeatSpec } from '../../src/Beat';
import timing from './timing.json';

// Video suelto (no es serie). Look propio: Puna salteña de altura, cerros rojizos y ocres con vetas, cumbres nevadas, cielo azul
// profundo; vía de trocha angosta en cornisa, viaducto metálico de celosía y túnel en la roca.
// Imagen que abre y cierra: la quebrada con la vía arriba y los restos quietos abajo; el tren pasa y la bocina sale en ondas (planos 1-2,
// 9 y 13). 1996 sin personas ni caída animada: la formación chica y quieta en la nevada, se apaga y queda la medida de ~100 m.
// Textos 2D = solo los de "## Placas por plano" (tags, sin pill, borde inferior <= 1450 px). Sin carteles 3D, sin logos.
// Anclas: todas con W() = palabra EXACTA del timing (sin choques por prefijo: "30", "100", "1948", "1996", "4.000").
const PANEL = 'rgba(10,14,24,.9)';
const fit = (text: string, max: number, px = 760) => Math.min(max, Math.floor(px / (text.length * 0.72)));
const P1 = (text: string, at: any, o: any = {}) => ({ type: 'tag' as const, text, at, x: 46, y: 65.5, color: PANEL, size: Math.max(20, fit(text, 46)), ...o });
const P2 = (text: string, at: any, o: any = {}) => ({ type: 'tag' as const, text, at, x: 46, y: 69.6, color: PANEL, size: Math.max(20, fit(text, 40)), ...o });
const SMALL = (text: string, y: number, at: any = 0, size = 20) => ({ type: 'tag' as const, text, at, x: 46, y, color: 'rgba(10,14,24,.78)', size });

const B = (timing as any).beats as { id: string; start: number; end: number; words: { w: string; s: number; e: number }[] }[];
const DUR = (id: string) => { const i = B.findIndex((x) => x.id === id); const e = B[i + 1] ? B[i + 1].start : (timing as any).duration; return e - B[i].start; };
/** segundos desde el inicio del plano hasta la palabra EXACTA `word` (n-ésima aparición) */
const W = (id: string, word: string, nth = 1): number => {
  const b = B.find((x) => x.id === id)!; let k = nth;
  for (const w of b.words) if (w.w === word && --k === 0) return w.s - b.start;
  throw new Error(`[${id}] no está "${word}"`);
};
const lerpX = (a: number, b: number, u: number) => a + (b - a) * u;
const FU_DU = SMALL('FUENTE: DIARIO UNO (23/6/2026)', 73.4);
// en la quebrada las placas van sobre la pared de roca (entre la vía y los restos)
const Q1 = (t: string, at: any, o: any = {}) => P1(t, at, { y: 45.5, ...o });
const Q2 = (t: string, at: any, o: any = {}) => P2(t, at, { y: 49.6, ...o });
const FUQ = SMALL('FUENTE: DIARIO UNO (23/6/2026)', 53.2);
const FU_AM = SMALL('FUENTE: ÁMBITO (27/11/2026)', 73.4);

// quebrada: cornisa de 1,9 con la vía arriba (z -0,95) y los restos abajo
const H = 1.9, TZ = -0.95;
const WORLD = (p: any = {}) => ({ type: 'world', p: { range: -3.75, rangeY: H, rangeS: 1.5, ...p } });
const CLIFF = (p: any = {}) => ({ type: 'cliff', p: { H, edge: -0.6, water: 1.05, ...p } });
const TRACK = { type: 'track', p: { x: [-6, 6], y: H, z: TZ } };
const WRECK = (p: any = {}) => ({ type: 'wreck', pos: [0.55, 0, 0.0] as [number, number, number], p });
const TRAIN = (x: [number, number][], p: any = {}) => ({ type: 'train', p: { x, y: H, z: TZ, n: 3, ...p } });

export const BEATS: BeatSpec[] = [
  // 1. Parte de una locomotora sigue en la cordillera de Salta, a más de 4.000 metros.
  { id: 'b01', set: 'room', cam: { from: [0.7, 2.6, 6.0], to: [0.35, 2.3, 5.3], look: [0.15, 0.8, -0.3], fov: 44, shift: 0.07 }, keywords: ['locomotora', 'cordillera', '4.000'],
    actors: [WORLD({ snow: 70, patches: 26 }), CLIFF(), TRACK, WRECK()],
    overlays: [Q2('SALTA', W('b01', 'Salta,')), Q1('+4.000 METROS', W('b01', '4.000')), FUQ] },

  // 2. Y cada tren que pasa por ahí toca bocina.
  { id: 'b02', set: 'room', cam: { from: [-0.5, 2.3, 6.8], to: [-0.1, 2.2, 6.2], look: [0, 0.95, -0.4], fov: 44, shift: 0.07 }, keywords: ['tren', 'bocina.'],
    actors: [WORLD({ patches: 26 }), CLIFF(), TRACK, WRECK(),
      TRAIN([[0, -1.4], [DUR('b02'), 1.0]]),
      { type: 'horn', pos: [lerpX(-1.4, 1.0, W('b02', 'toca') / DUR('b02')) + 0.3, H + 0.55, TZ + 0.2], at: W('b02', 'toca'), enter: 'none', p: { at: [0, 0.7], max: 0.7 } },
    ],
    overlays: [Q1('CADA TREN TOCA BOCINA ACÁ', W('b02', 'cada')), Q2('SEGÚN DIARIO UNO', W('b02', 'toca')), FUQ] },

  // 3. Es el ramal C14, de Salta a Socompa, en la frontera con Chile.
  { id: 'b03', set: 'room', cam: { from: [0.3, 5.4, 4.0], to: [0.0, 5.0, 3.6], look: [0, 0, -0.5], fov: 44, shift: 0.05 }, keywords: ['C14,', 'Socompa,', 'Chile.'],
    actors: [WORLD({ noRange: true, noShade: false, shadeA: 0.94 }),
      { type: 'hills', p: { pts: [[1.5, -0.4, 0.5, 0.35, 0], [-0.4, 0.9, 0.35, 0.3, 0], [0.55, 0.78, 0.3, 0.25, 0], [-1.0, -0.2, 0.6, 0.38, 1], [0.9, -1.4, 0.55, 0.35, 1], [-1.2, -2.6, 0.8, 0.45, 1], [-2.3, -1.2, 0.9, 0.45, 1], [0.0, -2.3, 0.7, 0.4, 1], [1.9, 1.3, 0.3, 0.3, 0], [-2.0, 0.6, 0.5, 0.35, 0]] } },
      { type: 'route', p: { route: [[1.6, 1.6], [1.25, 1.2], [1.3, 0.45], [0.2, 0.15], [0.35, -0.6], [-0.35, -0.85], [-0.45, -1.4], [-1.25, -1.75]], border: -1.62,
        draw: { at: 0, dur: W('b03', 'Socompa,') + 0.3 }, go: { at: 0.2, dur: W('b03', 'Socompa,') + 0.5 }, borderAt: W('b03', 'frontera') } },
    ],
    overlays: [P1('RAMAL C14 · SALTA → SOCOMPA', W('b03', 'ramal')), P2('FRONTERA CON CHILE', W('b03', 'frontera')), FU_DU] },

  // 4. Lo inauguraron en 1948, y cruza túneles y viaductos de alta montaña.
  { id: 'b04', set: 'room', cam: { from: [0.6, 1.7, 6.6], to: [0.1, 1.65, 6.0], look: [-1.0, 1.0, 0], fov: 44, shift: 0.08 }, keywords: ['1948,', 'túneles', 'viaductos'],
    actors: [WORLD({ range: -3.3, patches: 10 }),
      { type: 'viaduct', p: { x: [-1.9, 4.5], H: 1.5, piers: [0.3, 2.1, 3.9] } },
      { type: 'tunnel', p: { x: -1.9, y: 1.5, z: 0, Hm: 1.0 } },
      { type: 'track', p: { x: [-4.5, 4.5], y: 1.5, z: 0 } },
      { type: 'train', p: { x: [[0, -3.6], [DUR('b04'), 1.3]], y: 1.5, z: 0, n: 3 } },
      { type: 'hills', p: { pts: [[2.6, -1.4, 0.9, 0.7, 1], [-0.2, -2.0, 1.1, 0.8, 1], [1.2, -2.6, 1.3, 0.9, 1]] } },
    ],
    overlays: [P1('INAUGURADO EN 1948', W('b04', '1948,')), P2('TÚNELES · VIADUCTOS', W('b04', 'túneles')), FU_DU] },

  // 5. Un tramo de la vía lo usa el Tren a las Nubes.
  { id: 'b05', set: 'room', cam: { from: [-0.6, 1.25, 5.6], to: [-0.25, 1.35, 5.1], look: [0, 1.1, 0], fov: 44, shift: 0.08 }, keywords: ['tramo', 'Nubes.'],
    actors: [WORLD({ range: -3.3 }),
      { type: 'viaduct', p: { x: [-5, 5], H: 1.6, piers: [-3.2, -1.6, 1.4, 3.0] } },
      { type: 'track', p: { x: [-5, 5], y: 1.6, z: 0 } },
      { type: 'clouds', p: { n: 9, x: [-3, 2.6], y: [0.25, 0.95], z: [-1.6, 1.0], drift: 0.08 } },
      { type: 'train', p: { kind: 'nubes', x: [[0, -0.7], [DUR('b05'), 0.6]], dir: 1, y: 1.6, z: 0, n: 3 } },
    ],
    overlays: [P1('TRAMO COMPARTIDO CON EL TREN A LAS NUBES', W('b05', 'tramo')), FU_DU] },

  // 6. En 1996, en Quebrada del Agua, una formación cayó cerca de 100 metros durante una nevada.
  { id: 'b06', set: 'room', cam: { from: [0.2, 2.5, 8.8], to: [0.0, 2.35, 8.1], look: [0, 0.95, -0.5], fov: 44, shift: 0.07 }, keywords: ['1996,', 'formación', '100'],
    actors: [WORLD({ dusk: true, snow: 320, snowTop: 3.4, snowSpeed: 0.9, patches: 40, fogNear: 4, fogFar: 16 }), CLIFF(), TRACK,
      TRAIN([[0, 0.0], [DUR('b06'), 0.0]], { ghost: W('b06', 'cayó') }),
      { type: 'drop', pos: [1.25, 0, -0.5], at: W('b06', '100'), enter: 'none', p: { H, at: W('b06', '100'), dur: 0.6 } },
      { type: 'wreck', pos: [0.55, 0, 0.0], at: W('b06', 'metros'), p: { silhouette: true } },
    ],
    overlays: [Q1('1996 · QUEBRADA DEL AGUA', W('b06', '1996,'), { out: W('b06', 'cayó') }), Q1('LOCOMOTORA GT22 9702 · ~100 M', W('b06', 'cayó')),
      Q2('NEVADA Y PRESUNTAS AVALANCHAS', W('b06', 'durante')), FUQ] },

  // 7. Murieron tres trabajadores ferroviarios.
  { id: 'b07', set: 'room', cam: { from: [0.35, 2.6, 2.9], to: [0.05, 2.5, 2.5], look: [0, 1.75, -1.0], fov: 44, shift: 0.07 }, keywords: ['tres', 'ferroviarios.'],
    actors: [WORLD({ dusk: true, snow: 140, snowTop: 3.6, patches: 10 }), CLIFF(), TRACK,
      { type: 'lights', pos: [0, H, -0.7], p: { x: [-0.45, 0, 0.45], at: [W('b07', 'tres'), W('b07', 'tres') + 0.18, W('b07', 'tres') + 0.36] } },
    ],
    overlays: [P1('3 TRABAJADORES FERROVIARIOS', W('b07', 'tres')), FU_DU] },

  // 8. Parte de la locomotora y varios vagones no se pudieron sacar.
  { id: 'b08', set: 'room', cam: { from: [1.5, 1.3, 3.8], to: [0.95, 1.2, 3.4], look: [0.3, 0.35, -0.1], fov: 44, shift: -0.07 }, keywords: ['locomotora', 'vagones'],
    actors: [WORLD({ snow: 60, patches: 30 }), CLIFF(), TRACK, WRECK({ wagons: 3 })],
    overlays: [P1('LOS RESTOS SIGUEN AHÍ', W('b08', 'vagones')), FU_DU] },

  // 9. La bocina es un homenaje a ellos, y suena desde hace casi 30 años.
  { id: 'b09', set: 'room', cam: { from: [-0.6, 2.2, 6.9], to: [-0.2, 2.3, 6.3], look: [0, 0.95, -0.4], fov: 44, shift: 0.07 }, keywords: ['bocina', 'homenaje', '30'],
    actors: [WORLD({ patches: 26 }), CLIFF(), TRACK, WRECK(),
      TRAIN([[0, -2.1], [DUR('b09'), 1.6]]),
      { type: 'horn', pos: [-1.1, H + 0.55, TZ + 0.2], enter: 'none', p: { at: [0, W('b09', 'suena') - 0.9], max: 0.7 } },
      { type: 'horn', pos: [0.75, H + 0.55, TZ + 0.2], at: W('b09', 'suena'), enter: 'none', p: { at: [0, 1.0], max: 0.7 } },
    ],
    overlays: [Q1('UN HOMENAJE', W('b09', 'homenaje')), Q2('CASI 30 AÑOS', W('b09', '30')), FUQ] },

  // 10. Hoy el ramal es clave para el cobre y el litio de la Puna.
  { id: 'b10', set: 'room', cam: { from: [0.6, 1.3, 4.6], to: [0.25, 1.2, 4.1], look: [-0.5, 0.35, -0.3], fov: 44, shift: 0.025 }, keywords: ['clave', 'cobre', 'litio'],
    actors: [WORLD({ range: -3.2 }),
      { type: 'hills', p: { pts: [[-1.8, -1.6, 1.2, 0.8, 1], [1.9, -2.0, 1.4, 0.9, 1], [0.3, -2.6, 1.6, 1.0, 1]] } },
      { type: 'track', p: { x: [-5, 6], y: 0, z: -0.3 } },
      { type: 'train', p: { x: [[0, -1.0], [DUR('b10'), -1.5]], dir: -1, y: 0, z: -0.3, n: 2,
        load: [{ c: '#c8662f', at: W('b10', 'cobre') }, { c: '#e8edf2', at: W('b10', 'litio') }] } },
    ],
    overlays: [P1('COBRE Y LITIO DE LA PUNA', W('b10', 'cobre')), FU_AM] },

  // 11. Según Ámbito, el lunes 30 de noviembre Nación y Salta firmarían un convenio para recuperarlo.
  { id: 'b11', set: 'room', cam: { from: [0.3, 2.6, 3.9], to: [0.0, 2.45, 3.4], look: [0, 0.15, -0.8], fov: 44, shift: -0.01 }, keywords: ['Ámbito,', 'lunes', 'convenio'],
    actors: [WORLD({ range: -3.2 }),
      { type: 'hills', p: { pts: [[-1.9, -1.8, 1.2, 0.8, 1], [1.8, -2.1, 1.3, 0.9, 1]] } },
      { type: 'track', p: { x: [-5, 5], y: 0, z: -1.25, ghost: [-1.6, 1.6], solidAt: W('b11', 'recuperarlo.'), solidDur: 0.9 } },
      { type: 'deal', pos: [0, 0, -0.4], s: 0.75, p: { at: W('b11', 'firmarían') } },
    ],
    overlays: [P1('LUNES 30/11 · CONVENIO NACIÓN-SALTA (PREVISTO)', W('b11', 'lunes'), { size: 26 }),
      P2('DIEGO SANTILLI Y GUSTAVO SÁENZ', W('b11', 'Nación'), { out: W('b11', 'convenio') }), P2('RAMALES C14 Y C15', W('b11', 'convenio')), FU_AM] },

  // 12. Pero sus fuentes aclaran que no implica inversión confirmada.
  { id: 'b12', set: 'room', cam: { from: [-0.3, 1.5, 3.9], to: [0.0, 1.45, 3.5], look: [0, 0.45, -0.3], fov: 44, shift: -0.01 }, keywords: ['fuentes', 'inversión'],
    actors: [WORLD({ range: -3.2 }),
      { type: 'track', p: { x: [-5, 5], y: 0, z: -0.9, ghost: [-1.6, 1.6] } },
      { type: 'ghostcoins', pos: [0, 0, 0.1], p: { n: 4, at: 0 } },
      { type: 'cross', pos: [0, 0.75, 0.35], at: W('b12', 'inversión'), p: { size: 0.36 } },
    ],
    overlays: [P1('"ACUERDO DE APOYO"', W('b12', 'fuentes')), P2('NO ES INVERSIÓN CONFIRMADA', W('b12', 'inversión')), FU_AM] },

  // 13. En Quebrada del Agua, la bocina sigue sonando.
  { id: 'b13', set: 'room', cam: { from: [0.9, 2.5, 6.6], to: [0.5, 2.35, 6.0], look: [0, 0.95, -0.4], fov: 44, shift: 0.07 }, keywords: ['Quebrada', 'bocina'],
    actors: [WORLD({ snow: 60, patches: 26, dusk: true }), CLIFF(), TRACK, WRECK(),
      TRAIN([[0, -1.6], [DUR('b13'), 0.7]]),
      { type: 'horn', pos: [-0.05, H + 0.55, TZ + 0.2], at: W('b13', 'bocina'), enter: 'none', p: { at: [0, 0.7], max: 0.7 } },
    ],
    overlays: [Q1('QUEBRADA DEL AGUA', W('b13', 'Quebrada')), FUQ] },

  // 14. ¿Subiste alguna vez al Tren a las Nubes? Contá en qué año.
  { id: 'b14', set: 'room', cam: { from: [0.8, 0.95, 5.4], to: [0.4, 1.1, 4.9], look: [0, 1.25, 0], fov: 44, shift: 0.08 }, keywords: ['Tren', 'Nubes?', 'año.'],
    actors: [WORLD({ range: -3.3 }),
      { type: 'viaduct', p: { x: [-5, 5], H: 1.6, piers: [-3.1, -1.5, 1.3, 2.9] } },
      { type: 'track', p: { x: [-5, 5], y: 1.6, z: 0 } },
      { type: 'clouds', p: { n: 10, seed: 23, x: [-3, 2.6], y: [0.2, 0.9], z: [-1.6, 1.2], drift: 0.07 } },
      { type: 'train', p: { kind: 'nubes', x: [[0, -1.6], [DUR('b14'), 0.4]], y: 1.6, z: 0, n: 3 } },
    ],
    overlays: [P1('¿SUBISTE AL TREN A LAS NUBES?', 0)] },
];
