import type { BeatSpec } from '../../src/Beat';
import timing from './timing.json';

// Video suelto (no es serie). Look propio: diorama marino. Mar austral frío y estrecho de acantilados grises (planos 4 a 9),
// océano calmo dorado (planos 1-3 y 10-17). Imagen que abre y cierra: el mismo mar quieto con la placa PACÍFICO (1 y 16).
// Textos 2D = solo los de "## Placas por plano" (tags, sin pill, borde inferior <= 1450 px). Nombres (Magallanes, San Antonio,
// Balboa) solo en placas 2D, nunca carteles 3D. Muñecos sin rasgos; carabelas genéricas sin escudos ni banderas.
// Anclas: todas con W() = palabra EXACTA del timing (evita choques por prefijo: "506", "Pacífico" vs "Pacífico.").
const PI = Math.PI;
const PANEL = 'rgba(10,14,20,.9)';
const fit = (text: string, max: number, px = 820) => Math.min(max, Math.floor(px / (text.length * 0.64)));
const P1 = (text: string, at: any, o: any = {}) => ({ type: 'tag' as const, text, at, x: 46, y: 63.5, color: PANEL, size: fit(text, 46), ...o });
const P2 = (text: string, at: any, o: any = {}) => ({ type: 'tag' as const, text, at, x: 46, y: 68, color: PANEL, size: fit(text, 40), ...o });
const SMALL = (text: string, y: number, at: any = 0) => ({ type: 'tag' as const, text, at, x: 46, y, color: 'rgba(10,14,20,.78)', size: 20 });

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
const FU = SMALL('FUENTES: HISTORY.COM · INFOBAE (30/10/2020)', 72.2);

const GOLD = { type: 'world', p: { kind: 'gold' } };
const MIRROR = { type: 'world', p: { kind: 'gold', amp: 0.006, glint: 0.9 } };
const COLD = { type: 'world', p: { kind: 'cold' } };
const DUSK = { type: 'world', p: { kind: 'dusk' } };
const SAILOR = [
  { shirt: '#7a6a55', pants: '#3a3228', skin: '#e0b48c', hair: '#2a1d12' },
  { shirt: '#8a4f3a', pants: '#2e2a26', skin: '#c99a72', hair: '#3a2a1a' },
  { shirt: '#5d6a6e', pants: '#3a3228', skin: '#f0c7a0', hair: '#5a3a1a' },
];
// costa del estrecho: dos líneas de acantilados a lo largo de z
const STRAIT = (gap = 1.1, h = 1.7, z0 = -3.6, z1 = 3.2, seed = 3) => [
  { type: 'cliffs', pos: [-gap, 0, 0] as any, p: { side: -1, z0, z1, h, seed, w: 1.6 } },
  { type: 'cliffs', pos: [gap, 0, 0] as any, p: { side: 1, z0, z1, h, seed: seed + 4, w: 1.6 } },
];
const SHIP = (pos: any, rotY: number, o: any = {}) => ({ type: 'ship', pos, rot: [0, rotY, 0] as any, s: o.s ?? 1, ...o, p: { ph: pos[0] * 3 + pos[2], ...(o.p ?? {}) } });

export const BEATS: BeatSpec[] = [
  // 1. Magallanes lo llamó Pacífico porque el agua estaba en calma.
  { id: 'b01', set: 'room', cam: { from: [0.5, 1.9, 8.6], to: [0.1, 1.75, 7.6], look: [0, 0.75, 0], fov: 44 }, keywords: ['Pacífico', 'calma.'],
    actors: [MIRROR,
      SHIP([0.4, 0, -1.6], PI * 0.62, { s: 0.85, move: { to: [0.0, 0, -2.2], at: 0, dur: 3.6 }, p: { still: true } }),
    ],
    overlays: [P1('PACÍFICO', PRE('b01')), P2('"TRANQUILO", EN LATÍN', W('b01', 'calma.'))] },

  // 2. Y en ese mar tan calmo, sus marineros terminaron masticando cuero.
  { id: 'b02', set: 'room', cam: { from: [1.5, 1.9, 5.6], to: [1.1, 1.8, 4.9], look: [0, 0.95, 0], fov: 44 }, keywords: ['marineros', 'terminaron', 'cuero.'],
    actors: [MIRROR,
      SHIP([0, 0, -0.2], PI * 0.08, { s: 1.6, p: { still: true, furl: 1 } }),
      { type: 'faceless', pos: [0.15, 0.43, 0.05], rot: [0, 0.7, 0], s: 0.32, p: { ...SAILOR[0], seq: [[0, 'idle'], [W('b02', 'terminaron'), 'chew']] } },
      { type: 'faceless', pos: [-0.35, 0.43, -0.08], rot: [0, 0.9, 0], s: 0.32, at: W('b02', 'masticando'), p: { ...SAILOR[1], pose: 'chew', phase: 1.3 } },
    ],
    overlays: [P1('MASTICARON CUERO', W('b02', 'cuero.'))] },

  // 3. Hoy hace 506 años, el 28 de noviembre de 1520, sus naves salían a ese océano.
  { id: 'b03', set: 'room', cam: { from: [0.0, 2.6, 8.4], to: [0.0, 2.35, 7.2], look: [0, 0.7, -0.6], fov: 44 }, keywords: ['506', '1520,', 'océano.'],
    actors: [GOLD, ...STRAIT(1.35, 1.25, 0.2, 5.0, 11),
      SHIP([-0.35, 0, 2.6], PI / 2, { s: 0.6, move: { to: [-0.35, 0, -0.9], at: 0, dur: 7.6 } }),
      SHIP([0.4, 0, 3.6], PI / 2, { s: 0.6, move: { to: [0.4, 0, 0.0], at: 0.2, dur: 7.6 } }),
      SHIP([0.0, 0, 4.6], PI / 2, { s: 0.6, at: W('b03', '1520,'), move: { to: [0.0, 0, 1.6], at: W('b03', '1520,'), dur: 5 } }),
    ],
    overlays: [P1('HOY HACE 506 AÑOS', W('b03', '506')), P2('28 DE NOVIEMBRE DE 1520', W('b03', '28')), FU] },

  // 4. Pero primero tuvieron que encontrar la entrada.
  { id: 'b04', set: 'room', cam: { from: [2.0, 1.6, 6.4], to: [1.3, 1.55, 6.0], look: [0.6, 0.8, 0], fov: 44 }, keywords: ['entrada.'],
    actors: [COLD,
      { type: 'cliffs', pos: [-0.4, 0, 0], rot: [0, -PI / 2, 0], p: { side: 1, z0: -3, z1: -0.6, h: 1.5, seed: 21, w: 1.6 } },
      { type: 'cliffs', pos: [-0.4, 0, 0], rot: [0, -PI / 2, 0], p: { side: 1, z0: 0.6, z1: 3.4, h: 1.5, seed: 25, w: 1.6 } },
      SHIP([1.6, 0, 0.6], PI, { s: 0.6, move: { to: [0.7, 0, 0.6], at: 0, dur: 2.8 } }),
      SHIP([2.6, 0, 1.0], PI, { s: 0.6, move: { to: [1.7, 0, 1.0], at: 0, dur: 2.8 } }),
    ],
    overlays: [FU] },

  // 5. El 21 de octubre dan con el paso: un estrecho de 500 kilómetros, lleno de bifurcaciones.
  { id: 'b05', set: 'room', cam: { from: [0.3, 4.6, 4.4], to: [0.0, 4.3, 3.7], look: [0, 0, -0.1], fov: 44 }, keywords: ['21', '500', 'bifurcaciones.'],
    actors: [{ type: 'world', p: { kind: 'cold', dark: '#10161c' } },
      { type: 'straitmap', pos: [0, 0.4, 0], s: 0.85, p: { at: W('b05', 'paso:'), dur: DUR('b05') - W('b05', 'paso:') - 0.2 } },
    ],
    overlays: [P1('21 DE OCTUBRE', W('b05', '21')), P2('ESTRECHO: 500 KM', W('b05', '500')), SMALL('ESQUEMA, NO A ESCALA', 59.5, 0), FU] },

  // 6. Cruzarlo les lleva más de un mes.
  { id: 'b06', set: 'room', cam: { from: [0.0, 1.5, 7.2], to: [0.0, 1.45, 6.4], look: [0, 0.8, 0], fov: 44 }, keywords: ['Cruzarlo', 'mes.'],
    actors: [COLD, ...STRAIT(0.9, 1.9, -3.6, 4.0, 5),
      SHIP([0.0, 0, 1.8], PI / 2, { s: 0.65, move: { to: [0.0, 0, 0.6], at: 0, dur: 2.6 } }),
      SHIP([0.15, 0, 0.0], PI / 2, { s: 0.65, move: { to: [0.15, 0, -1.2], at: 0, dur: 2.6 } }),
    ],
    overlays: [P1('MÁS DE UN MES', W('b06', 'mes.')), FU] },

  // 7. Cuando por fin ve el mar abierto, Magallanes llora de alegría.
  { id: 'b07', set: 'room', cam: { from: [0.9, 1.75, 4.8], to: [0.7, 1.7, 4.2], look: [-0.1, 0.8, -1.5], fov: 44 }, keywords: ['abierto,', 'alegría.'],
    actors: [GOLD, ...STRAIT(1.25, 1.4, -0.6, 4.0, 8),
      SHIP([0, 0, 0.6], PI / 2, { s: 1.3, p: { still: true, furl: 1 } }),
      { type: 'faceless', pos: [0.0, 0.37, 0.3], rot: [0, PI, 0], s: 0.42, p: { shirt: '#3d4a5a', pants: '#2a2622', skin: '#e0b48c', hair: '#3a2a1a', seq: [[0, 'idle'], [W('b07', 'llora'), 'face'], [W('b07', 'alegría.'), 'cheer']] } },
    ],
    overlays: [P1('FERNANDO DE MAGALLANES', W('b07', 'Magallanes')), FU] },

  // 8. Pero ahí llega la traición.
  { id: 'b08', set: 'room', cam: { from: [-0.8, 1.7, 6.6], to: [-0.5, 1.6, 6.0], look: [0.2, 0.6, 0], fov: 44 }, keywords: ['traición.'],
    actors: [COLD, ...STRAIT(1.3, 1.6, -3.6, 0.0, 14),
      SHIP([-0.5, 0, 0.4], PI / 2, { s: 0.6 }),
      SHIP([0.1, 0, 1.4], PI / 2, { s: 0.6 }),
      SHIP([-0.2, 0, 2.4], PI / 2, { s: 0.6 }),
      SHIP([0.75, 0, 0.0], PI / 2, { s: 0.78, p: { cargo: 8, lantern: '#ff3b2e' } }),
      { type: 'ring', pos: [0.75, 0.04, 0.0], at: W('b08', 'traición.'), p: { r: 0.62, color: '#ff3b4e' } },
    ],
    overlays: [FU] },

  // 9. La San Antonio, la nave más grande y mejor provista, da media vuelta, rumbo a España.
  { id: 'b09', set: 'room', cam: { from: [1.6, 2.0, 6.4], to: [1.1, 1.9, 5.8], look: [0.3, 0.7, 0], fov: 44 }, keywords: ['Antonio,', 'provista,', 'España.'],
    actors: [COLD, ...STRAIT(1.6, 1.5, -3.6, -0.6, 14),
      SHIP([-0.55, 0, 0.2], PI / 2, { s: 0.6 }),
      SHIP([-0.1, 0, 1.3], PI / 2, { s: 0.6 }),
      SHIP([-0.5, 0, 2.3], PI / 2, { s: 0.6 }),
      { type: 'ship', pos: [0.75, 0, 0.0], rot: [0, PI / 2, 0], s: 0.78, p: { cargo: 8, lantern: '#ff3b2e' }, out: W('b09', 'vuelta,') },
      { type: 'shipturn', pos: [0.75, 0, 0.0], s: 0.78, at: W('b09', 'vuelta,'), enter: 'none', p: { cargo: 8, lantern: '#ff3b2e', at: W('b09', 'vuelta,'), dur: 1.3, go: W('b09', 'rumbo'), d: [0.3, 0, 3.2] } },
    ],
    overlays: [P1('SAN ANTONIO', W('b09', 'Antonio,'), { out: W('b09', 'provista,') }), P1('LA MÁS GRANDE Y MEJOR PROVISTA', W('b09', 'provista,')), P2('RUMBO A ESPAÑA', W('b09', 'España.')), FU] },

  // 10. Al océano salen solo tres naves.
  { id: 'b10', set: 'room', cam: { from: [-2.2, 1.3, 5.4], to: [-1.8, 1.25, 4.8], look: [0.2, 0.55, -0.6], fov: 44 }, keywords: ['tres'],
    actors: [GOLD,
      { type: 'cliffs', pos: [2.1, 0, 0], p: { side: 1, z0: -1.0, z1: 3.0, h: 1.2, seed: 31, w: 1.6 } },
      SHIP([0.9, 0, 0.6], -PI * 0.15, { s: 0.6, move: { to: [-0.3, 0, -0.2], at: 0, dur: 2.4 } }),
      SHIP([1.5, 0, 1.6], -PI * 0.15, { s: 0.6, at: W('b10', 'tres'), move: { to: [0.4, 0, 0.9], at: 0, dur: 2.4 } }),
      SHIP([1.9, 0, 2.6], -PI * 0.15, { s: 0.6, at: W('b10', 'tres') + 0.15, move: { to: [0.9, 0, 1.9], at: 0, dur: 2.4 } }),
    ],
    overlays: [P1('3 NAVES', W('b10', 'tres')), FU] },

  // 11. Y ese mar ya tenía nombre.
  { id: 'b11', set: 'room', cam: { from: [0.4, 4.2, 5.4], to: [0.15, 4.0, 4.8], look: [0, 0.6, 0], fov: 44 }, keywords: ['nombre.'],
    actors: [DUSK,
      { type: 'chart', pos: [0, 0, 0], p: { hl: W('b11', 'nombre.') } },
    ],
    overlays: [FU] },

  // 12. En 1513, Vasco Núñez de Balboa lo había descubierto y llamado Mar del Sur.
  { id: 'b12', set: 'room', cam: { from: [-0.9, 1.7, 6.6], to: [-0.5, 1.6, 6.0], look: [0.35, 0.8, 0], fov: 44 }, keywords: ['1513,', 'Balboa', 'Sur.'],
    actors: [GOLD,
      { type: 'hill', pos: [0, 0, 0] },
      { type: 'faceless', pos: [0.9, 0.74, 0.55], rot: [0, -PI / 2 - 0.4, 0], s: 0.5, p: { shirt: '#7d8590', pants: '#3b3127', skin: '#e0b48c', hair: '#2a1d12', seq: [[0, 'idle'], [W('b12', 'descubierto'), 'point']] } },
      { type: 'ring', pos: [-1.0, 0.04, -0.6], at: W('b12', 'Mar'), p: { r: 0.6, color: '#e7b53c' } },
    ],
    overlays: [P1('1513', W('b12', '1513,'), { out: W('b12', 'Balboa') }), P1('VASCO NÚÑEZ DE BALBOA', W('b12', 'Balboa')), P2('"MAR DEL SUR"', W('b12', 'Sur.')), FU] },

  // 13. Según History, la travesía dura 99 días.
  { id: 'b13', set: 'room', cam: { from: [0.3, 1.6, 5.6], to: [0.1, 1.55, 5.1], look: [0, 0.9, 0], fov: 44 }, keywords: ['History,', '99'],
    actors: [GOLD,
      SHIP([1.1, 0, -0.6], PI * 0.9, { s: 0.75, move: { to: [0.85, 0, -0.8], at: 0, dur: 3.8 } }),
      { type: 'tally', pos: [-0.08, 1.12, 2.2], rot: [-0.15, 0.2, 0], s: 0.3, p: { at: W('b13', 'travesía'), dur: W('b13', 'días.') - W('b13', 'travesía') + 0.3 } },
    ],
    overlays: [P1('99 DÍAS', W('b13', '99')), P2('SEGÚN HISTORY.COM', -1.2), FU] },

  // 14. Y la comida se acaba.
  { id: 'b14', set: 'room', cam: { from: [0.5, 1.7, 4.4], to: [0.25, 1.6, 3.9], look: [0, 0.55, 0], fov: 44 }, keywords: ['comida', 'acaba.'],
    actors: [DUSK,
      { type: 'hold', pos: [0, 0, 0], p: { at: W('b14', 'comida') } },
    ],
    overlays: [P1('SIN COMIDA', W('b14', 'acaba.')), FU] },

  // 15. Para seguir vivos, mastican las partes de cuero de sus equipos.
  { id: 'b15', set: 'room', cam: { from: [-0.5, 1.55, 5.2], to: [-0.25, 1.5, 4.7], look: [0, 0.9, 0], fov: 44 }, keywords: ['mastican', 'cuero'],
    actors: [DUSK,
      { type: 'box', pos: [0, 0.3, 0], p: { size: [3.4, 0.08, 1.4], color: '#7a5233' } },
      { type: 'box', pos: [0, 0.5, -0.72], p: { size: [3.4, 0.4, 0.08], color: '#5e3d25' } },
      { type: 'faceless', pos: [-0.7, 0.34, 0], rot: [0, 0.4, 0], s: 0.6, p: { ...SAILOR[0], pose: 'chew' } },
      { type: 'faceless', pos: [0.05, 0.34, 0.15], rot: [0, 0, 0], s: 0.6, at: W('b15', 'mastican'), p: { ...SAILOR[1], pose: 'chew', phase: 1.1 } },
      { type: 'faceless', pos: [0.8, 0.34, -0.05], rot: [0, -0.4, 0], s: 0.6, at: W('b15', 'cuero'), p: { ...SAILOR[2], pose: 'chew', phase: 2.3 } },
    ],
    overlays: [P1('CUERO DE SUS EQUIPOS', W('b15', 'cuero')), FU] },

  // 16. 506 años después, ese mar del hambre se sigue llamando Pacífico.
  { id: 'b16', set: 'room', cam: { from: [-0.5, 1.9, 8.6], to: [-0.1, 1.75, 7.6], look: [0, 0.75, 0], fov: 44 }, keywords: ['506', 'Pacífico.'],
    actors: [MIRROR],
    overlays: [P1('PACÍFICO', W('b16', 'Pacífico.')), FU] },

  // 17. Verdadero o falso: Magallanes completó la vuelta al mundo. Respondé abajo, sin buscar.
  { id: 'b17', set: 'room', cam: { from: [0.3, 1.8, 7.4], to: [0.0, 1.7, 6.6], look: [0, 1.2, 0], fov: 44 }, keywords: ['Verdadero', 'completó', 'buscar.'],
    actors: [GOLD,
      { type: 'globe3', pos: [0, 1.45, 0], s: 0.72 },
      { type: 'check', pos: [-1.15, 1.45, 0.3], s: 0.4, at: W('b17', 'Verdadero') },
      { type: 'cross', pos: [1.15, 1.45, 0.3], s: 0.4, at: W('b17', 'falso:') },
    ],
    overlays: [P1('¿VERDADERO O FALSO?', W('b17', 'Verdadero'), { out: W('b17', 'buscar.') }), P1('RESPONDÉ SIN BUSCAR', W('b17', 'buscar.')),
      P2('MAGALLANES COMPLETÓ LA VUELTA AL MUNDO', W('b17', 'mundo.'))] },
];
