import type { BeatSpec } from '../../src/Beat';
import timing from './timing.json';

// Video suelto (no es serie). Look propio, distinto del de Shorts: ciudad de noche azul con ventanas cálidas; cada reel es una
// burbuja de luz coral con un play que sube de terraza en terraza, de un grupo de personas a otro más grande. Los que te siguen
// llevan remera cian. Imagen que abre y cierra: burbujas que suben (o se traban) sobre la ciudad, planos 1 y 13.
// Textos 2D = solo los de "## Placas por plano" (tags, sin pill, borde inferior <= 1450 px). Ningún cartel 3D con texto.
// Anclas: todas con W() = palabra EXACTA del timing (evita choques por prefijo: "1.000" vs "1.000.", "300," vs "30").
const PANEL = 'rgba(8,12,26,.9)';
const RED = 'rgba(150,22,38,.94)';
const fit = (text: string, max: number, px = 760) => Math.min(max, Math.floor(px / (text.length * 0.72)));
const P1 = (text: string, at: any, o: any = {}) => ({ type: 'tag' as const, text, at, x: 46, y: 65.5, color: PANEL, size: fit(text, 46), ...o });
const P2 = (text: string, at: any, o: any = {}) => ({ type: 'tag' as const, text, at, x: 46, y: 69.6, color: PANEL, size: fit(text, 40), ...o });
const SMALL = (text: string, at: any = 0) => ({ type: 'tag' as const, text, at, x: 46, y: 73.4, color: 'rgba(8,12,26,.78)', size: 21 });

const B = (timing as any).beats as { id: string; start: number; end: number; words: { w: string; s: number; e: number }[] }[];
const DUR = (id: string) => { const b = B.find((x) => x.id === id)!; return b.end - b.start; };
/** segundos desde el inicio del plano hasta la palabra EXACTA `word` (n-ésima aparición) */
const W = (id: string, word: string, nth = 1): number => {
  const b = B.find((x) => x.id === id)!; let k = nth;
  for (const w of b.words) if (w.w === word && --k === 0) return w.s - b.start;
  throw new Error(`[${id}] no está "${word}"`);
};
const FU_MAY24 = SMALL('FUENTE: META (MAYO DE 2024)');
const FU_JUN23 = SMALL('FUENTE: META (JUNIO DE 2023)');
const FU_ABR23 = SMALL('FUENTE: META (ABRIL DE 2023)');
const FU_DIC24 = SMALL('FUENTE: META (DICIEMBRE DE 2024)');

const WORLD = { type: 'world', p: {} };
const SET = 'room' as const; // el set solo aporta luces y piso; el mundo de noche lo tapa todo
const LY = 0.3; // subo el punto de mira: la escena baja al centro del cuadro, lejos de la franja de subtítulos
const up = (v?: number[]) => (v ? [v[0], v[1] + LY, v[2]] : undefined);
const CAM = (from: number[], to: number[], look: number[], lookTo?: number[]) => ({ from, to, look: up(look), lookTo: up(lookTo), fov: 44, shift: -0.03 }) as any;
const ME = { shirt: '#ffb347', skin: '#e9b48f', hair: '#2a1d14' }; // vos, el que sube el reel (remera ámbar)
const TRIAL = '#ffcf5a'; // reel de prueba: burbuja dorada

export const BEATS: BeatSpec[] = [
  // 1. ¿Tu reel se clava en 300, 1.000 o 1.500 vistas? Instagram explicó por qué.
  { id: 'b01', set: SET, cam: CAM([0.55, 1.65, 6.1], [0.15, 1.6, 5.5], [0.1, 1.2, 0]), keywords: ['reel', '1.000', 'vistas?'],
    actors: [WORLD,
      { type: 'folk', pos: [-1.05, 0, 1.05], rot: [0, 0.55, 0], s: 0.9, p: { ...ME, seq: [[0, 'phone'], [W('b01', 'Instagram'), 'look']] } },
      { type: 'glass', pos: [-0.35, 1.5, 0.2], p: { w: 0.72, d: 0.5, flash: W('b01', '300,') } },
      { type: 'bubble', p: { kf: [[0, -0.95, 0.75, 1.25], [1.0, -0.35, 1.21, 0.2]], wob: 0.006 } },
      { type: 'glass', pos: [0.42, 2.0, -0.35], at: W('b01', '1.000'), p: { w: 0.72, d: 0.5, flash: W('b01', '1.000') + 0.6 } },
      { type: 'bubble', at: W('b01', '1.000') - 0.05, enter: 'none', p: { kf: [[W('b01', '1.000') - 0.05, -0.95, 0.75, 1.25], [W('b01', '1.000') + 0.6, 0.42, 1.71, -0.35, 0.1]], wob: 0.006 } },
      { type: 'glass', pos: [1.15, 2.48, -0.9], at: W('b01', '1.500'), p: { w: 0.72, d: 0.5, flash: W('b01', '1.500') + 0.6 } },
      { type: 'bubble', at: W('b01', '1.500') - 0.05, enter: 'none', p: { kf: [[W('b01', '1.500') - 0.05, -0.95, 0.75, 1.25], [W('b01', '1.500') + 0.65, 1.15, 2.19, -0.9, 0.1]], wob: 0.006 } },
      { type: 'halo', pos: [-0.35, 0, 0.2], at: W('b01', 'Instagram'), p: { r: 0.42, c: '#27e0d8' } },
      { type: 'halo', pos: [0.42, 0, -0.35], at: W('b01', 'explicó'), p: { r: 0.42, c: '#27e0d8' } },
      { type: 'halo', pos: [1.15, 0, -0.9], at: W('b01', 'por'), p: { r: 0.42, c: '#27e0d8' } },
    ],
    overlays: [P1('300 · 1.000 · 1.500 VISTAS', W('b01', '300,'))] },

  // 2. Primero se lo muestra a un grupo chico, te siga o no.
  { id: 'b02', set: SET, cam: CAM([-0.35, 1.45, 5.3], [0.05, 1.42, 4.8], [0.15, 0.8, 0]), keywords: ['chico,'],
    actors: [WORLD,
      { type: 'folk', pos: [-1.05, 0, 0.95], rot: [0, 0.7, 0], s: 0.9, p: { ...ME, pose: 'phone' } },
      { type: 'group', pos: [0.55, 0, -0.25], p: { n: 4, h: 0.3, seed: 2, fol: 1, lit: W('b02', 'grupo'), look: W('b02', 'grupo') + 0.2 } },
      { type: 'bubble', p: { kf: [[0, -0.98, 0.8, 1.15], [W('b02', 'muestra'), -0.98, 0.95, 1.15], [W('b02', 'grupo') + 0.25, 0.55, 1.42, -0.25, 0.3]] } },
      { type: 'halo', pos: [0.55, 0.32, -0.25], at: W('b02', 'siga'), p: { r: 0.62, c: '#27e0d8' } },
    ],
    overlays: [P1('PRIMERO: UN GRUPO CHICO', W('b02', 'grupo')), FU_MAY24] },

  // 3. Si responde, pasa a uno más grande, y después a otro.
  { id: 'b03', set: SET, cam: CAM([0.2, 1.35, 6.4], [0.35, 1.9, 6.0], [0.1, 1.0, -0.6], [0.2, 1.35, -0.8]), keywords: ['grande,', 'otro.'],
    actors: [WORLD,
      { type: 'group', pos: [-1.05, 0, 0.7], p: { n: 3, h: 0.25, seed: 3, fol: 1, react: W('b03', 'responde,') } },
      { type: 'group', pos: [0.05, 0, -0.5], p: { n: 5, h: 0.75, seed: 5, fol: 1, lit: W('b03', 'pasa') + 0.3, react: W('b03', 'grande,') + 0.2 } },
      { type: 'group', pos: [1.05, 0, -1.75], p: { n: 8, h: 1.25, seed: 8, fol: 2, lit: W('b03', 'después') + 0.3, react: W('b03', 'otro.') } },
      { type: 'bubble', p: { kf: [[0, -1.05, 1.4, 0.7], [W('b03', 'pasa'), -1.05, 1.4, 0.7], [W('b03', 'pasa') + 0.6, 0.05, 1.9, -0.5, 0.25], [W('b03', 'después'), 0.05, 1.9, -0.5], [W('b03', 'después') + 0.55, 1.05, 2.4, -1.75, 0.2]] } },
    ],
    overlays: [P1('GRUPO 1 → GRUPO 2 → GRUPO 3', W('b03', 'pasa')), FU_MAY24] },

  // 4. Si no responde, ahí te quedaste.
  { id: 'b04', set: SET, cam: CAM([-0.65, 1.3, 4.7], [-0.35, 1.26, 4.25], [-0.25, 0.85, -0.2]), keywords: ['quedaste.'],
    actors: [WORLD,
      { type: 'group', pos: [-0.55, 0, 0.2], p: { n: 4, h: 0.25, seed: 4, fol: 1, phone: true, away: W('b04', 'responde,'), off: W('b04', 'ahí') } },
      { type: 'group', pos: [0.95, 0, -1.6], p: { n: 6, h: 0.8, seed: 6, fol: 1, off: W('b04', 'ahí') } },
      { type: 'bubble', p: { kf: [[0, -0.55, 1.42, 0.2], [W('b04', 'ahí'), -0.55, 1.42, 0.2], [W('b04', 'quedaste.') + 0.5, -0.55, 1.26, 0.2]], dim: W('b04', 'responde,') } },
    ],
    overlays: [P1('SI NO RESPONDE: TE QUEDASTE', W('b04', 'no'), { color: RED })] },

  // 5. Meta, la dueña de Instagram, contó una de las cosas que mira:
  { id: 'b05', set: SET, cam: CAM([0.75, 1.55, 5.7], [0.4, 1.65, 5.2], [0.15, 1.05, -0.5]), keywords: ['Meta,', 'mira:'],
    actors: [WORLD,
      { type: 'beacon', pos: [1.05, 0, -1.7], p: { h: 1.65, lock: W('b05', 'cosas'), a0: 0.35, a1: -0.62, tilt: 0.33, len: 2.75 } },
      { type: 'group', pos: [-0.5, 0, 0.45], p: { n: 3, h: 0.0, foot: false, seed: 11, fol: 1, look: W('b05', 'mira:') } },
      { type: 'bubble', p: { kf: [[0, -0.5, 1.15, 0.45]] } },
      { type: 'group', pos: [-1.25, 0, -1.3], p: { n: 3, h: 0.55, seed: 12 } },
    ],
    overlays: [P1('META, DUEÑA DE INSTAGRAM', W('b05', 'Meta,')), FU_JUN23] },

  // 6. si es probable que la gente lo comparta.
  { id: 'b06', set: SET, cam: CAM([0.0, 1.45, 5.5], [0.3, 1.5, 5.0], [0.05, 0.85, -0.3]), keywords: ['comparta.'],
    actors: [WORLD,
      { type: 'group', pos: [-0.95, 0, 0.5], p: { n: 3, h: 0.2, seed: 13, fol: 1 } },
      { type: 'bubble', p: { kf: [[0, -0.95, 1.3, 0.5]] } },
      { type: 'group', pos: [0.35, 0, -0.75], p: { n: 3, h: 0.55, seed: 14, lit: W('b06', 'gente') + 0.5, look: W('b06', 'gente') + 0.5 } },
      { type: 'group', pos: [1.15, 0, 0.45], p: { n: 2, h: 0.2, seed: 15, lit: W('b06', 'comparta.') + 0.4, look: W('b06', 'comparta.') + 0.4 } },
      { type: 'plane', p: { a: [-0.8, 0.95, 0.5], b: [0.3, 1.25, -0.75], at: W('b06', 'probable'), dur: 0.75, arc: 0.4 } },
      { type: 'plane', p: { a: [-0.8, 0.95, 0.5], b: [1.1, 0.95, 0.45], at: W('b06', 'gente'), dur: 0.75, arc: 0.45 } },
      { type: 'plane', p: { a: [0.35, 1.25, -0.75], b: [1.1, 0.95, 0.45], at: W('b06', 'comparta.'), dur: 0.7, arc: 0.3 } },
    ],
    overlays: [P1('¿LO VAN A COMPARTIR?', W('b06', 'probable')), FU_JUN23] },

  // 7. Y en tus estadísticas te muestra cuánto tiempo lo miran, para que veas dónde se van.
  { id: 'b07', set: SET, cam: CAM([0.3, 1.35, 4.7], [0.0, 1.4, 4.2], [0, 0.95, -0.5]), keywords: ['estadísticas', 'tiempo', 'van.'],
    actors: [WORLD,
      { type: 'screen', pos: [0, 0, -0.95], p: { w: 2.0, h: 0.95, at: 0.1, dur: DUR('b07') - 0.2, marks: [W('b07', 'tiempo') - 0.1, W('b07', 'miran,') - 0.1, W('b07', 'dónde') - 0.1, W('b07', 'van.') - 0.1] } },
      { type: 'viewers', pos: [0, 0, 0.35], p: { xs: [-1.0, -0.6, -0.2, 0.2, 0.6, 1.0], leave: [W('b07', 'tiempo'), W('b07', 'dónde'), null, null, W('b07', 'van.'), W('b07', 'miran,')] } },
    ],
    overlays: [P1('ESTADÍSTICAS:', W('b07', 'estadísticas')), P2('TIEMPO DE VISUALIZACIÓN', W('b07', 'tiempo')), FU_ABR23] },

  // 8. Con marca de agua, como el logo de otra aplicación, ni entra a esa prueba.
  { id: 'b08', set: SET, cam: CAM([-0.6, 1.3, 4.9], [-0.25, 1.35, 4.4], [0, 0.8, -0.35]), keywords: ['marca', 'logo', 'prueba.'],
    actors: [WORLD,
      { type: 'gate', pos: [0.35, 0, -0.45], p: { w: 1.0, h: 1.25, deny: W('b08', 'ni') } },
      { type: 'group', pos: [0.35, 0, -1.65], p: { n: 5, h: 0.45, seed: 16, fol: 1 } },
      { type: 'bubble', p: { mark: true, kf: [[0, -1.15, 0.85, 0.85], [W('b08', 'aplicación,'), -0.3, 0.75, 0.15], [W('b08', 'ni'), -0.3, 0.75, 0.15], [W('b08', 'entra'), 0.15, 0.72, -0.08], [W('b08', 'prueba.') + 0.3, -0.75, 0.6, 0.5, 0.15]], dim: W('b08', 'entra') } },
    ],
    overlays: [P1('MARCA DE AGUA = NO ENTRA', W('b08', 'marca')), FU_MAY24] },

  // 9. Y si subís videos de otros 10 veces en 30 días, te saca de las recomendaciones.
  { id: 'b09', set: SET, cam: CAM([0.05, 1.5, 5.4], [-0.15, 1.55, 4.95], [-0.1, 0.85, 0]), keywords: ['10', '30', 'recomendaciones.'],
    actors: [WORLD,
      { type: 'group', pos: [-1.15, 0, 0.55], p: { n: 1, h: 0.35, seed: 17, phone: true } },
      ...Array.from({ length: 10 }, (_, i) => ({ type: 'bubble', pos: [-1.5 + (i % 5) * 0.2, 1.35 + Math.floor(i / 5) * 0.27, 0.35] as any,
        at: W('b09', 'videos') + i * ((W('b09', 'veces') - W('b09', 'videos')) / 10), p: { r: 0.09, gray: true, mark: true, trail: false } })),
      { type: 'bridge', pos: [-0.66, 0.37, 0.55], p: { len: 0.62, drop: W('b09', 'saca') } },
      { type: 'group', pos: [0.75, 0, 0.45], p: { n: 6, h: 0.35, seed: 18, fol: 1, off: W('b09', 'saca'), away: W('b09', 'saca') + 0.1 } },
      { type: 'month', pos: [0.15, 0.0, 1.35], at: W('b09', '30'), p: { at: W('b09', '30'), dur: 0.45 } },
    ],
    overlays: [P1('10 REPOSTEOS EN 30 DÍAS', W('b09', '10')), P2('= FUERA DE RECOMENDACIONES', W('b09', 'saca')), FU_MAY24] },

  // 10. Para probar están los reels de prueba: primero los ve solo gente que no te sigue.
  { id: 'b10', set: SET, cam: CAM([0.3, 1.6, 5.4], [0.0, 1.55, 4.9], [0, 0.85, -0.15]), keywords: ['reels', 'sigue.'],
    actors: [WORLD,
      { type: 'folk', pos: [0.0, 0, 1.15], rot: [0, Math.PI, 0], s: 0.9, p: { ...ME, pose: 'phone' } },
      { type: 'group', pos: [-0.95, 0, -0.35], p: { n: 5, h: 0.5, seed: 19, fol: 5, off: W('b10', 'primero') } },
      { type: 'group', pos: [0.9, 0, 0.1], p: { n: 5, h: 0.3, seed: 20, fol: 0, lit: W('b10', 'gente'), look: W('b10', 've'), react: W('b10', 'sigue.') } },
      { type: 'bubble', p: { c: TRIAL, kf: [[0, 0.0, 0.85, 1.05], [W('b10', 'prueba:'), 0.0, 1.35, 0.55], [W('b10', 'primero') + 0.7, 0.9, 1.45, 0.1, 0.2]] } },
    ],
    overlays: [P1('REELS DE PRUEBA (TRIAL REELS):', W('b10', 'reels')), P2('SOLO NO SEGUIDORES', W('b10', 'solo')), FU_DIC24] },

  // 11. Al día siguiente ves cómo les fue, y si anduvo, lo pasás a tus seguidores.
  { id: 'b11', set: SET, cam: CAM([0.0, 1.5, 5.2], [0.2, 1.55, 4.75], [0, 0.8, -0.1]), keywords: ['siguiente', 'seguidores.'],
    actors: [WORLD,
      { type: 'dial', pos: [0.0, 0, 1.0], p: { at: 0.05, dur: W('b11', 'ves') } },
      { type: 'group', pos: [-0.95, 0, -0.4], p: { n: 5, h: 0.5, seed: 19, fol: 5, off: 0.0, lit: W('b11', 'pasás') + 0.5, react: W('b11', 'seguidores.') } },
      { type: 'group', pos: [0.9, 0, -0.1], p: { n: 5, h: 0.3, seed: 20, fol: 0, react: W('b11', 'anduvo,') } },
      { type: 'stats', pos: [0.9, 0.0, 0.75], at: W('b11', 'ves'), p: { at: W('b11', 'ves') } },
      { type: 'bubble', p: { c: TRIAL, kf: [[0, 0.9, 1.45, -0.1], [W('b11', 'pasás'), 0.9, 1.45, -0.1], [W('b11', 'pasás') + 0.7, -0.95, 1.65, -0.4, 0.3]] } },
    ],
    overlays: [P1('24 HORAS DESPUÉS:', W('b11', 'día')), P2('COMPARTIR CON TODOS', W('b11', 'pasás')), FU_DIC24] },

  // 12. Vas a leer que el corte está en 1.000. Instagram nunca publicó ese número.
  { id: 'b12', set: SET, cam: CAM([0.4, 1.4, 5.0], [0.0, 1.55, 4.65], [0, 1.1, -0.25]), keywords: ['1.000.', 'nunca'],
    actors: [WORLD,
      { type: 'group', pos: [0, 0, -0.2], p: { n: 4, h: 0.0, foot: false, seed: 21, fol: 1, look: W('b12', 'nunca') } },
      { type: 'cut', pos: [0, 1.6, -0.25], at: W('b12', 'corte'), p: { w: 2.9, brk: W('b12', 'nunca') } },
      { type: 'bubble', p: { kf: [[0, 0, 1.22, -0.25], [W('b12', 'publicó'), 0, 1.22, -0.25], [W('b12', 'número.') + 0.5, 0, 2.05, -0.25]], wob: 0.012 } },
      { type: 'group', pos: [-1.15, 0, -1.3], p: { n: 3, h: 0.85, seed: 22, lit: W('b12', 'número.') } },
      { type: 'group', pos: [1.15, 0, -1.3], p: { n: 3, h: 0.85, seed: 23, lit: W('b12', 'número.') + 0.15 } },
    ],
    overlays: [P1('"EL CORTE ES EN 1.000":', W('b12', 'corte')), P2('NO ES OFICIAL', W('b12', 'nunca'), { color: RED }), ] },

  // 13. Mandáselo al que sube reels, y contame cuántas vistas tiene tu último.
  { id: 'b13', set: SET, cam: CAM([0.0, 1.45, 5.5], [0.15, 1.5, 5.1], [0, 1.0, -0.3]), keywords: ['reels,', 'vistas'],
    actors: [WORLD,
      ...[[-1.3, 0.0, -1.9, 0.0], [-0.45, 0.4, -2.1, 0.7], [0.6, 0.2, -2.0, 1.3], [1.35, 0.5, -1.85, 0.4]].map(([x, y, z, d]) => ({ type: 'bubble', p: { r: 0.16, kf: [[0, x, 0.6 + y, z], [DUR('b13'), x, 1.35 + y, z]], trail: false } })),
      { type: 'folk', pos: [-0.75, 0, 0.55], rot: [0, 0.9, 0], s: 0.95, p: { ...ME, seq: [[0, 'throw'], [0.9, 'phone']] } },
      { type: 'folk', pos: [0.75, 0, 0.4], rot: [0, -0.9, 0], s: 0.95, p: { shirt: '#8f7be8', skin: '#c98d66', hair: '#111', seq: [[0, 'idle'], [0.85, 'phone']] } },
      { type: 'plane', p: { a: [-0.6, 1.15, 0.6], b: [0.68, 0.85, 0.5], at: 0.0, dur: 0.85, arc: 0.35 } },
      { type: 'phone2', pos: [0, 1.4, -0.55], at: W('b13', 'contame'), bob: 0.03, p: { at: W('b13', 'vistas'), grow: 0.8 } },
    ],
    overlays: [P1('¿CUÁNTAS VISTAS TIENE TU ÚLTIMO REEL?', W('b13', 'cuántas'))] },
];
