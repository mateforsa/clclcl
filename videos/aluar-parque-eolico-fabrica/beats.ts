import type { BeatSpec } from '../../src/Beat';
import timing from './timing.json';

// Video suelto (no es serie). Look propio: estepa patagónica ventosa junto al mar (Golfo Nuevo), con la fábrica de aluminio y los
// molinos. Imagen que abre y cierra: el reloj de 6 horas (seis gajos, sin números) que se vacía sobre la fábrica (planos 1-2) y que
// en el plano 12 vuelve lleno, alimentado por tres cables (viento, gas, agua).
// Textos 2D = solo los de "## Placas por plano" (tags, sin pill, borde inferior <= 1450 px). Sin carteles 3D, sin logos.
// Escalas: molino nuevo 182,5 m a la punta = 2,7 Obeliscos de 67,5 m (plano 8); +1.500 MW vs 582 MW = 2,58 veces (plano 13:
// 12 molinos hechos, 31 posibles); torta del plano 11-12: viento 12 % -> 33 %, gas 31 %, hidro 36 % (Ámbito).
// Anclas: todas con W() = palabra EXACTA del timing (sin choques por prefijo: "6" vs "600.000", "Según" repetido, etc.).
const PANEL = 'rgba(10,14,22,.9)';
const fit = (text: string, max: number, px = 760) => Math.min(max, Math.floor(px / (text.length * 0.72)));
const P1 = (text: string, at: any, o: any = {}) => ({ type: 'tag' as const, text, at, x: 46, y: 65.5, color: PANEL, size: fit(text, 46), ...o });
const P2 = (text: string, at: any, o: any = {}) => ({ type: 'tag' as const, text, at, x: 46, y: 69.6, color: PANEL, size: fit(text, 40), ...o });
const SMALL = (text: string, y: number, at: any = 0, size = 20) => ({ type: 'tag' as const, text, at, x: 46, y, color: 'rgba(10,14,22,.78)', size });

const B = (timing as any).beats as { id: string; start: number; end: number; words: { w: string; s: number; e: number }[] }[];
const DUR = (id: string) => { const i = B.findIndex((x) => x.id === id); const e = B[i + 1] ? B[i + 1].start : (timing as any).duration; return e - B[i].start; };
/** segundos desde el inicio del plano hasta la palabra EXACTA `word` (n-ésima aparición) */
const W = (id: string, word: string, nth = 1): number => {
  const b = B.find((x) => x.id === id)!; let k = nth;
  for (const w of b.words) if (w.w === word && --k === 0) return w.s - b.start;
  throw new Error(`[${id}] no está "${word}"`);
};
const FU_AM = SMALL('FUENTE: ÁMBITO (22/10/2026)', 73.4);
const FU_4 = SMALL('FUENTE: ÁMBITO (22/10/2026) · IPROFESIONAL (22/11/2026)', 73.4);
const FU_AI = SMALL('FUENTE: ÁMBITO (22/10/2026) · IPROFESIONAL (10/01/2025)', 73.4);
const FU_IP = SMALL('FUENTE: IPROFESIONAL (10/01/2025)', 73.4);

const WORLD = (p: any = {}) => ({ type: 'world', p });
// parque visto desde el suelo: filas escalonadas (x, z, H)
const ROWS: [number, number, number][] = [];
[[-0.8, 5, 0.62], [-1.5, 6, 0.58], [-2.1, 7, 0.55], [-2.8, 7, 0.52]].forEach(([z, n, h], r) => { for (let i = 0; i < n; i++) ROWS.push([-2.3 + (i + (r % 2) * 0.5) * (4.6 / (n - 0.5)), z, h]); });
// plano 13: 12 molinos hechos (adelante) y 31 posibles (2,58 veces)
const BUILT: [number, number][] = Array.from({ length: 12 }, (_, i) => [-1.65 + (i % 6) * 0.66, -0.4 - Math.floor(i / 6) * 0.6]);
const MAYBE: [number, number][] = Array.from({ length: 31 }, (_, i) => [-2.2 + (i % 8) * 0.63 + (Math.floor(i / 8) % 2) * 0.3, -1.75 - Math.floor(i / 8) * 0.48]);

export const BEATS: BeatSpec[] = [
  // 1. Seis horas.
  { id: 'b01', set: 'room', cam: { from: [0.35, 2.1, 4.6], to: [0.15, 2.0, 4.1], look: [0, 0.75, -0.3], fov: 44, shift: -0.04 }, keywords: ['6'],
    actors: [WORLD({ sea: -1.9, dusk: true }),
      { type: 'smelter', pos: [0, 0, -0.9], p: { L: 2.2, flick: 0.35 } },
      { type: 'plume', pos: [1.32, 0.8, -1.2] }, { type: 'plume', pos: [1.62, 0.8, -1.2], p: { n: 6 } },
      { type: 'clock6', pos: [-0.15, 1.15, -0.2], p: { r: 0.4, kf: [[0, 6], [0.9, 5]] } },
    ],
    overlays: [P1('6 HORAS', 0), FU_AM] },

  // 2. Es lo máximo que aguanta sin luz esta fábrica de Puerto Madryn.
  { id: 'b02', set: 'room', cam: { from: [-0.9, 2.5, 5.2], to: [-0.4, 2.3, 4.7], look: [0, 0.6, -0.6], fov: 44, shift: -0.04 }, keywords: ['máximo', 'Puerto Madryn.'],
    actors: [WORLD({ sea: -1.7, dusk: true, tufts: { z: [0.9, 3.2] } }),
      { type: 'smelter', pos: [0, 0, -0.9], p: { L: 2.2, flick: W('b02', 'luz'), pier: 1.3, ship: true } },
      { type: 'plume', pos: [1.32, 0.8, -1.2] }, { type: 'plume', pos: [1.62, 0.8, -1.2], p: { n: 6 } },
      { type: 'clock6', pos: [-0.15, 1.2, -0.2], p: { r: 0.4, kf: [[0, 5], [W('b02', 'aguanta'), 5], [DUR('b02'), 2]] } },
    ],
    overlays: [P1('LO MÁXIMO SIN LUZ · PUERTO MADRYN', W('b02', 'máximo')), FU_AM] },

  // 3. Según Ámbito, con un corte más largo se le dañan los equipos.
  { id: 'b03', set: 'room', cam: { from: [0.1, 1.1, 2.4], to: [0.0, 1.05, 1.9], look: [0, 0.35, -2.4], fov: 44, shift: -0.08 }, keywords: ['corte', 'dañan', 'equipos.'],
    actors: [{ type: 'pothall', p: { corte: W('b03', 'corte'), dano: W('b03', 'dañan'), n: 2, z0: -2.0 } },
      { type: 'clock6', pos: [0, 0.75, -3.5], p: { r: 0.3, kf: [[0, 2], [W('b03', 'corte'), 0.6], [W('b03', 'largo'), 0]] } },
    ],
    overlays: [P1('MÁS DE 6 H DE CORTE = EQUIPOS DAÑADOS', W('b03', 'corte')), P2('SEGÚN ÁMBITO', W('b03', 'Según')), FU_AM] },

  // 4. Es la planta de aluminio de Aluar. Si fuera una provincia, sería la cuarta en consumo.
  { id: 'b04', set: 'room', cam: { from: [0.6, 2.2, 4.4], to: [0.2, 2.5, 5.2], look: [0, 0.5, -0.5], fov: 44, shift: -0.04 }, keywords: ['aluminio', 'Aluar.', 'provincia,', 'cuarta'],
    actors: [WORLD({ sea: -2.6, tufts: { z: [1.4, 3.2] } }),
      { type: 'smelter', pos: [0, 0, -1.0], p: { L: 2.2, go: { at: W('b04', 'Si'), dur: 0.9, pos: [0, 0, -0.9], s: 0.7 } } },
      { type: 'podium', pos: [0, 0, -0.15], s: 0.8, at: W('b04', 'Si'), enter: 'none', p: { at: W('b04', 'Si'), hl: W('b04', 'cuarta') } },
      { type: 'smelter', pos: [0.96, 0.256, -0.15], s: 0.14, at: W('b04', 'cuarta'), p: { L: 2.2 } },
    ],
    overlays: [P1('ALUAR · HASTA 460.000 T DE ALUMINIO POR AÑO', W('b04', 'planta')), P2('"LA 4ª PROVINCIA EN CONSUMO", SEGÚN ÁMBITO', W('b04', 'provincia,')), FU_4] },

  // 5. Por eso tiene su propio parque eólico, de 582 megavatios.
  { id: 'b05', set: 'room', cam: { from: [-0.5, 1.6, 4.4], to: [0.1, 1.75, 4.0], look: [0, 0.55, -1.4], fov: 44, shift: -0.04 }, keywords: ['parque', 'eólico,', '582'],
    actors: [WORLD({ tufts: { z: [0.8, 3.2] } }),
      { type: 'park', p: { pts: ROWS.filter((q) => q[1] < -2), spin: 1.5 } },
      { type: 'park', p: { pts: ROWS.filter((q) => q[1] > -2), spin: 1.5, popAt: W('b05', 'propio'), popDur: W('b05', '582') - W('b05', 'propio'), order: 'x' } },
    ],
    overlays: [P1('PARQUE EÓLICO PROPIO · 582 MW', W('b05', 'parque')), FU_AI] },

  // 6. Son 119 molinos en un campo parecido a la Ciudad de Buenos Aires.
  { id: 'b06', set: 'room', cam: { from: [0.0, 5.2, 3.0], to: [0.0, 4.8, 2.5], look: [0, 0, -0.6], fov: 44, shift: -0.04 }, keywords: ['119', 'molinos', 'Ciudad', 'Aires.'],
    actors: [WORLD({ noBardas: true, tufts: { n: 0 }, noDust: true, shadeA: 0.96 }),
      { type: 'park', pos: [0, 0, -0.95], p: { caba: 119, w: 2.5, H: 0.16, spin: 2.0, outline: true, outAt: W('b06', 'Ciudad') } },
    ],
    overlays: [P1('119 MOLINOS · ~200 KM²', W('b06', '119')), P2('COMO LA CIUDAD DE BUENOS AIRES', W('b06', 'Ciudad')), FU_AI] },

  // 7. Los 56 más nuevos miden 182,5 metros hasta la punta del aspa.
  { id: 'b07', set: 'room', cam: { from: [0.5, 1.55, 7.6], to: [0.25, 1.5, 7.1], look: [0, 1.15, 0], fov: 44, shift: -0.07 }, keywords: ['56', 'nuevos', '182,5', 'aspa.'],
    actors: [WORLD({ tufts: { z: [0.6, 3.2] } }),
      { type: 'park', pos: [0, 0, -2.2], p: { pts: Array.from({ length: 9 }, (_, i) => [-2.4 + i * 0.6, (i % 2) * -0.4, 0.7]), spin: 1.5, popAt: W('b07', '56'), popDur: 0.6, order: 'x' } },
      { type: 'turbine', pos: [-0.35, 0, 0], p: { H: 2.0, spin: 1.1, settle: W('b07', 'miden') } },
      { type: 'gauge', pos: [0.75, 0, 0.05], at: W('b07', 'miden'), enter: 'none', p: { H: 2.0, at: W('b07', 'miden'), dur: W('b07', 'metros') - W('b07', 'miden'), w: 0.0 } },
    ],
    overlays: [P1('56 MOLINOS GOLDWIND DE 6 MW', W('b07', '56')), P2('182,5 M HASTA LA PUNTA', W('b07', '182,5')), FU_AI] },

  // 8. Según Ámbito, unas 2,7 veces el Obelisco.
  { id: 'b08', set: 'room', cam: { from: [-0.4, 1.55, 7.3], to: [-0.15, 1.5, 6.9], look: [0.1, 1.15, 0], fov: 44, shift: -0.07 }, keywords: ['2,7', 'Obelisco.'],
    actors: [WORLD({ tufts: { z: [0.6, 3.2] } }),
      { type: 'turbine', pos: [-0.45, 0, 0], p: { H: 2.0, spin: 0 } },
      { type: 'obel', pos: [0.75, 0, 0.05], p: { h: 2.0 / 2.7, at: W('b08', 'unas'), dt: (W('b08', 'veces') - W('b08', 'unas')) / 2.4 } },
      { type: 'box', pos: [0.17, 2.0, 0.05], at: W('b08', 'Obelisco.'), p: { size: [1.15, 0.018, 0.018], color: '#ffb52e', glow: true } },
    ],
    overlays: [P1('2,7 OBELISCOS, SEGÚN ÁMBITO', W('b08', '2,7')), P2('ROTOR DE 165 M', W('b08', 'veces')), FU_AI] },

  // 9. La luz viaja por una línea privada de unos 34 kilómetros.
  { id: 'b09', set: 'room', cam: { from: [0.9, 2.4, 4.6], to: [0.5, 2.3, 4.1], look: [0, 0.35, -0.9], fov: 44, shift: -0.04 }, keywords: ['línea', 'privada', '34'],
    actors: [WORLD({ sea: -2.9, tufts: { z: [1.3, 3.2] } }),
      { type: 'park', pos: [0, 0, 0], p: { pts: [[-1.9, -1.9, 0.55], [-1.3, -2.2, 0.55], [-2.3, -2.4, 0.5], [-0.8, -2.45, 0.5], [-1.75, -2.65, 0.48]], spin: 1.5 } },
      { type: 'line', p: { pts: [[-1.6, -2.2], [-1.05, -1.9], [-0.5, -1.6], [0.0, -1.32], [0.42, -1.1]], h: 0.5, pulse: W('b09', 'viaja'), at: W('b09', 'línea') - 0.9, dt: 0.15 } },
      { type: 'smelter', pos: [1.2, 0, -1.1], s: 0.45, p: { L: 2.2 } },
    ],
    overlays: [P1('LÍNEA PRIVADA · 34,16 KM · 132 KV', W('b09', 'línea')), FU_IP] },

  // 10. Según la empresa, el parque alcanza para 600.000 hogares.
  { id: 'b10', set: 'room', cam: { from: [-0.3, 2.6, 4.4], to: [0.1, 2.45, 3.9], look: [0, 0.3, -1.2], fov: 44, shift: -0.04 }, keywords: ['empresa,', '600.000', 'hogares.'],
    actors: [WORLD({ dusk: true, tufts: { z: [1.2, 3.2] } }),
      { type: 'park', pos: [0, 0, 0], p: { pts: [[-1.6, -2.3, 0.6], [-0.8, -2.6, 0.6], [0, -2.35, 0.6], [0.8, -2.6, 0.6], [1.6, -2.3, 0.6]], spin: 1.5 } },
      { type: 'homes', pos: [0, 0, -1.2], p: { nx: 9, nz: 4, gap: 0.33, at: W('b10', 'alcanza'), dur: W('b10', 'hogares.') - W('b10', 'alcanza') } },
    ],
    overlays: [P1('600.000 HOGARES · SEGÚN LA EMPRESA', W('b10', '600.000')), FU_AM] },

  // 11. Pero el viento le va a dar solo un tercio de lo que consume.
  { id: 'b11', set: 'room', cam: { from: [0.4, 3.0, 3.6], to: [0.1, 2.8, 3.2], look: [0, 0.2, -0.4], fov: 44, shift: -0.04 }, keywords: ['viento', 'tercio', 'consume.'],
    actors: [WORLD({ tufts: { z: [1.4, 3.2] }, shadeA: 0.96 }),
      { type: 'pie', pos: [0, 0, -0.8], rot: [0, 0.6, 0], p: { r: 0.8, wind: [[W('b11', 'viento'), 0.12], [W('b11', 'tercio') + 0.2, 0.33]] } },
    ],
    overlays: [P1('VIENTO: 12% → 33% DEL CONSUMO', W('b11', 'viento')), FU_AM] },

  // 12. El resto sale del gas y de las represas, porque no puede pasar más de 6 horas sin luz.
  { id: 'b12', set: 'room', cam: { from: [0.0, 2.7, 5.0], to: [0.0, 2.5, 4.5], look: [0, 0.5, -1.1], fov: 44, shift: -0.04 }, keywords: ['gas', 'represas,', '6'],
    actors: [WORLD({ sea: -2.7, tufts: { z: [1.5, 3.2] } }),
      { type: 'smelter', pos: [-0.2, 0, -1.2], s: 0.65, p: { L: 2.2 } },
      { type: 'clock6', pos: [0, 1.25, -0.6], p: { r: 0.36, fed: true } },
      { type: 'turbine', pos: [-1.1, 0, -0.6], p: { H: 1.0, spin: 1.5 } },
      { type: 'gasplant', pos: [-0.3, 0, -0.45], at: W('b12', 'gas') },
      { type: 'dam', pos: [1.0, 0, -0.6], at: W('b12', 'represas,') },
      { type: 'cable', p: { a: [-1.08, 0.3, -0.6], b: [-0.3, 1.1, -0.58], c: '#27e0d8', on: 0 } },
      { type: 'cable', p: { a: [-0.3, 0.62, -0.53], b: [-0.05, 0.95, -0.58], c: '#ff8a2a', on: W('b12', 'gas') + 0.2 } },
      { type: 'cable', p: { a: [1.0, 0.44, -0.6], b: [0.3, 1.1, -0.58], c: '#3a8dff', on: W('b12', 'represas,') + 0.2 } },
    ],
    overlays: [P1('GAS 31% · HIDRO 36% · VIENTO 33%', W('b12', 'resto')), FU_AM] },

  // 13. Aluar dice que tiene lugar para 1.500 megavatios más.
  { id: 'b13', set: 'room', cam: { from: [0.3, 2.3, 4.2], to: [0.0, 2.45, 4.7], look: [0, 0.45, -1.2], fov: 44, shift: -0.04 }, keywords: ['Aluar', 'lugar', '1.500'],
    actors: [WORLD({ tufts: { z: [1.0, 3.2] } }),
      { type: 'park', p: { pts: BUILT.map(([x, z]) => [x, z, 0.62]), spin: 1.5 } },
      { type: 'park', p: { pts: MAYBE.map(([x, z]) => [x, z, 0.62]), ghost: true, spin: 0.6, popAt: W('b13', '1.500'), popDur: 1.2, order: 'x' } },
    ],
    overlays: [P1('+1.500 MW POSIBLES', W('b13', '1.500')), P2('SEGÚN ALUAR, SIN CONFIRMAR', W('b13', 'Aluar')), FU_AM] },

  // 14. ¿Los termina construyendo? Sí o no, abajo.
  { id: 'b14', set: 'room', cam: { from: [-0.4, 1.5, 5.6], to: [-0.15, 1.45, 5.1], look: [0.1, 0.85, -0.3], fov: 44, shift: -0.07 }, keywords: ['termina', 'construyendo?', 'Sí'],
    actors: [WORLD({ tufts: { z: [0.8, 3.2] } }),
      { type: 'turbine', pos: [-0.75, 0, -1.2], p: { H: 1.2, spin: 1.4 } },
      { type: 'turbine', pos: [0.25, 0, -0.3], p: { H: 1.5, spin: 0.6, rest: true, build: { at: 0, n: 4, dt: W('b14', 'construyendo?') / 4 } } },
      { type: 'check', pos: [-0.5, 0.6, 0.5], at: W('b14', 'Sí'), p: { size: 0.32, color: '#27e0d8' } },
      { type: 'cross', pos: [1.0, 0.6, 0.5], at: W('b14', 'no,'), p: { size: 0.3 } },
    ],
    overlays: [P1('¿LOS CONSTRUYE? SÍ O NO', 0), ] },
];
