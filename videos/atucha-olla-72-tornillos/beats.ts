import type { BeatSpec } from '../../src/Beat';
import timing from './timing.json';

// Video suelto (no es serie). Look propio: corte transversal de la central como maqueta técnica sobre una mesa oscura
// (esfera de hormigón gris cortada, olla de acero con 72 tornillos, agua pesada azul profundo, río Paraná marrón).
// Imagen que abre y cierra: el corte de la esfera con la corona de tornillos (planos 1 y 13).
// Textos 2D = solo los de "## Placas por plano" (tags, sin pill). Todas las placas van ARRIBA (y 600-750 px, sobre el velo
// oscuro), la fuente chica también arriba (y ~545 px): lo importante del 3D queda en la franja 790-1390 px,
// así ninguna placa tapa a una persona ni a la esfera, la olla, los tornillos, la turbina o los tubos. Sin carteles 3D con texto.
// Anclas: todas con W() = palabra EXACTA del timing (evita choques por prefijo: "72" vs "72.000", "mil" vs "millones").
const G = 2.5; // altura del pasto (ver props.tsx)
const PANEL = 'rgba(8,14,20,.9)';
const fit = (text: string, max: number, px = 760) => Math.min(max, Math.floor(px / (text.length * 0.72)));
const H1 = (text: string, at: any, o: any = {}) => ({ type: 'tag' as const, text, at, x: 46, y: 33, color: PANEL, size: fit(text, 46), ...o });
const H2 = (text: string, at: any, o: any = {}) => ({ type: 'tag' as const, text, at, x: 46, y: 37.4, color: PANEL, size: fit(text, 40), ...o });
const SMALL = (text: string, at: any = 0, size = 20) => ({ type: 'tag' as const, text, at, x: 46, y: 28.4, color: 'rgba(8,14,20,.78)', size });

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
const FU_IB = SMALL('FUENTE: INFOBAE (8/7/2019)');
const FU_PF = SMALL('FUENTE: PERFIL (14/6/2019)');
const SH = 0.07;
const PIT = { type: 'world', p: { ground: 'pit' } };
const FLAT = { type: 'world', p: { ground: 'flat' } };
const LAB = { type: 'world', p: { ground: 'none' } };
const STAND = (x: number, w: number, d = 0.8) => ({ type: 'box', pos: [x, 0.11, 0] as any, p: { size: [w, 0.18, d], color: '#262e35' } });

export const BEATS: BeatSpec[] = [
  // 1. Una esfera de hormigón de 56 metros. Abajo, 72 tornillos aprietan una tapa.
  { id: 'b01', set: 'room', cam: { from: [0.45, G + 1.0, 12.8], to: [0.1, G + 0.8, 11.6], look: [0, G + 0.35, 0], fov: 44, shift: SH }, keywords: ['hormigón', '72'],
    actors: [PIT,
      { type: 'central', pos: [0, G, 0], p: { lit: W('b01', '72'), litDur: 1.4, potGlow: W('b01', 'Abajo,'), press: W('b01', 'aprietan') } },
    ],
    overlays: [H1('ESFERA DE 56 M', W('b01', 'esfera')), H2('72 TORNILLOS', W('b01', '72')), FU_IB] },

  // 2. Así es Atucha por dentro, según Infobae en 2019.
  { id: 'b02', set: 'room', cam: { from: [-0.7, G + 1.3, 12.2], to: [-0.25, G + 1.0, 11.2], look: [0, G + 0.3, 0], fov: 44, shift: SH }, keywords: ['Atucha', 'Infobae'],
    actors: [PIT,
      { type: 'central', pos: [0, G, 0], p: { open: W('b02', 'dentro,'), guide: [-0.75, -0.4, W('b02', 'según'), 1.6] } },
    ],
    overlays: [H1('ATUCHA POR DENTRO', W('b02', 'Atucha')), H2('SEGÚN INFOBAE (2019)', W('b02', 'según')), FU_IB] },

  // 3. La esfera sigue 20 metros bajo tierra. Ahí está el reactor, una olla a presión de 18 metros.
  { id: 'b03', set: 'room', cam: { from: [0.8, G + 1.0, 11.6], to: [0.45, G + 0.4, 10.6], look: [0, G + 0.35, 0], lookTo: [0, G + 0.25, 0], fov: 44, shift: SH }, keywords: ['tierra.', 'reactor,', 'presión'],
    actors: [PIT,
      { type: 'central', pos: [0, G, 0], p: { dim20: W('b03', '20'), potGlow: W('b03', 'reactor,'), dim18: W('b03', '18') } },
    ],
    overlays: [H1('20 M BAJO TIERRA', W('b03', '20')), H2('OLLA DE 18 X 8 M (ATUCHA II)', W('b03', 'olla')), FU_IB] },

  // 4. Cada tornillo aprieta con mil toneladas.
  { id: 'b04', set: 'room', cam: { from: [0.35, 4.4, 5.6], to: [0.12, 4.1, 5.0], look: [0, 1.45, 0.4], fov: 44, shift: SH }, keywords: ['tornillo', 'toneladas.'],
    actors: [LAB,
      { type: 'lidclose', pos: [0, 1.75, 0], p: { R: 1.2, hl: W('b04', 'tornillo'), press: W('b04', 'mil') } },
    ],
    overlays: [H1('CADA TORNILLO APRIETA CON 1.000 TONELADAS', W('b04', 'aprieta')), FU_IB] },

  // 5. Adentro, el agua pesada frena a los neutrones para que rompan átomos.
  { id: 'b05', set: 'room', cam: { from: [-0.35, 1.3, 6.4], to: [0.0, 1.2, 5.9], look: [0, 0.85, 0], fov: 44, shift: SH }, keywords: ['pesada', 'neutrones'],
    actors: [LAB, STAND(0, 2.5),
      { type: 'tank', pos: [0, 0.2, 0], p: { w: 2.2, h: 1.3, atom: [0.62, 0.7], hit: W('b05', 'átomos.'), neuFrom: W('b05', 'agua') - 0.3, every: 0.6 } },
    ],
    overlays: [H1('AGUA PESADA: FRENA LOS NEUTRONES', W('b05', 'agua')), FU_IB] },

  // 6. Cada átomo roto da calor, y ese calor hace el vapor que mueve la turbina.
  { id: 'b06', set: 'room', cam: { from: [-0.3, 1.25, 6.4], to: [-0.05, 1.15, 5.9], look: [-0.05, 0.9, 0], fov: 44, shift: SH }, keywords: ['átomo', 'vapor', 'turbina.'],
    actors: [LAB, STAND(-0.8, 1.1, 0.7),
      { type: 'tank', pos: [-0.8, 0.2, 0], p: { w: 0.9, h: 0.9, d: 0.6, atom: [0.1, 0.45], split: W('b06', 'roto'), neuTo: 0 } },
      { type: 'turbine', pos: [0.35, 0.75, 0], p: { L: 0.7, r: 0.22, start: W('b06', 'mueve') } },
      { type: 'steampipe', pos: [0, 0, 0], p: { pts: [[-0.6, 1.16, 0], [-0.6, 1.55, 0], [0.2, 1.55, 0], [0.2, 1.1, 0]], from: W('b06', 'vapor'), r: 0.06 } },
    ],
    overlays: [H1('CALOR → VAPOR → TURBINA', W('b06', 'calor,')), FU_IB] },

  // 7. Después, 70.000 tubos con agua del Paraná lo enfrían, y vuelve a ser agua.
  { id: 'b07', set: 'room', cam: { from: [0.35, 1.2, 6.2], to: [0.15, 1.1, 5.7], look: [0.0, 0.85, 0], fov: 44, shift: SH }, keywords: ['70.000', 'Paraná', 'vuelve'],
    actors: [LAB, STAND(-0.35, 1.7),
      { type: 'condenser', pos: [-0.35, 0.2, 0], p: { w: 1.5, h: 1.15, tubes: W('b07', '70.000'), flow: W('b07', 'agua'), rain: W('b07', 'vuelve'), steamFrom: 0 } },
      { type: 'steampipe', pos: [0, 0, 0], p: { pts: [[-0.35, 1.7, 0], [-0.35, 1.42, 0]], from: 0, r: 0.07 } },
      { type: 'rivercut', pos: [0.8, 0.02, 0.0], p: { w: 0.5, h: 0.5, d: 0.8 } },
      { type: 'steampipe', pos: [0, 0, 0], p: { pts: [[0.8, 0.45, 0.2], [0.8, 0.8, 0.2], [0.46, 0.8, 0.2]], from: W('b07', 'agua'), r: 0.045, c: '#9a7048', dots: 'flow', n: 6 } },
    ],
    overlays: [H1('70.000 TUBOS CON AGUA DEL PARANÁ', W('b07', '70.000')), FU_IB] },

  // 8. ¿Y si el agua pesada hierve?
  { id: 'b08', set: 'room', cam: { from: [0.5, 1.4, 6.4], to: [0.3, 1.3, 5.95], look: [0, 0.85, 0], fov: 44, shift: SH }, keywords: ['pesada', 'hierve?'],
    actors: [LAB, STAND(0, 2.5),
      { type: 'tank', pos: [0, 0.2, 0], p: { w: 2.2, h: 1.3, neuFrom: -3, every: 0.6, boil: W('b08', 'agua') } },
    ],
    overlays: [H1('¿Y SI EL AGUA PESADA HIERVE?', PRE('b08'))] },

  // 9. Según una ingeniera en Perfil, deja de frenar y el reactor se apaga.
  { id: 'b09', set: 'room', cam: { from: [-0.3, 1.3, 6.6], to: [0.0, 1.2, 6.1], look: [-0.1, 0.85, 0], fov: 44, shift: SH }, keywords: ['ingeniera', 'frenar', 'apaga.'],
    actors: [LAB, STAND(0.5, 1.6, 0.7),
      { type: 'worker', pos: [-0.95, 0.02, 0.2], s: 0.55, p: { coat: '#e8e4d6', helmet: '#f1efe6', seq: [[0, 'idle'], [W('b09', 'deja'), 'point']] } },
      { type: 'tank', pos: [0.5, 0.2, 0], p: { w: 1.4, h: 1.0, d: 0.6, neuFrom: -2, every: 0.45, fast: true, boil: -2, off: W('b09', 'apaga.') } },
    ],
    overlays: [H1('DEJA DE FRENAR → SE APAGA', W('b09', 'deja')), H2('SEGÚN PERFIL (2019)', W('b09', 'Según')), FU_PF] },

  // 10. En Chernobyl frenaban con grafito, que caliente sigue frenando.
  { id: 'b10', set: 'room', cam: { from: [-0.45, 1.3, 6.0], to: [-0.1, 1.2, 5.5], look: [0, 0.85, 0], fov: 44, shift: SH }, keywords: ['Chernobyl', 'grafito,', 'caliente'],
    actors: [LAB, STAND(0, 2.1, 0.7),
      { type: 'graphite', pos: [0, 0.2, 0], p: { hot: W('b10', 'caliente'), neuFrom: -2 } },
    ],
    overlays: [H1('CHERNOBYL: GRAFITO', W('b10', 'grafito,')), FU_PF] },

  // 11. Atucha I arrancó en 1974. Atucha II, en 2014.
  { id: 'b11', set: 'room', cam: { from: [-0.75, G + 1.15, 6.9], to: [0.55, G + 1.05, 6.5], look: [-0.45, G + 0.35, -1.6], lookTo: [0.35, G + 0.35, -1.6], fov: 44, shift: SH }, keywords: ['Atucha I', 'Atucha II,'],
    actors: [FLAT,
      { type: 'dome', pos: [-0.75, G, -1.6], p: { R: 0.6, on: W('b11', 'arrancó') } },
      { type: 'dome', pos: [0.85, G, -1.6], at: W('b11', 'Atucha II,'), p: { R: 0.6, on: W('b11', '2014.') } },
    ],
    overlays: [H1('ATUCHA I: 1974', W('b11', '1974.')), H2('ATUCHA II: 2014', W('b11', '2014.')), FU_IB] },

  // 12. Según Infobae, dan electricidad a cinco millones de personas.
  { id: 'b12', set: 'room', cam: { from: [0.25, G + 1.6, 5.8], to: [0.0, G + 1.4, 5.2], look: [-0.25, G + 0.25, -0.8], fov: 44, shift: SH }, keywords: ['electricidad', 'millones'],
    actors: [FLAT,
      { type: 'dome', pos: [-1.55, G, -1.6], p: { R: 0.45, on: 0 } },
      { type: 'grid', pos: [-0.55, G, -0.55], p: { from: 0, houses: W('b12', 'electricidad'), hDur: 1.6, people: W('b12', 'cinco') } },
    ],
    overlays: [H1('5 MILLONES DE PERSONAS', W('b12', 'cinco')), H2('SEGÚN INFOBAE (2019)', W('b12', 'Según')), FU_IB] },

  // 13. Y abajo de la esfera, 72.000 toneladas aprietan una tapa.
  { id: 'b13', set: 'room', cam: { from: [0.12, G + 2.3, 0.6], to: [0.05, G + 1.85, 0.4], look: [0, G + 0.12, -0.3], fov: 44, shift: SH }, keywords: ['esfera,', '72.000'],
    actors: [PIT,
      { type: 'central', pos: [0, G, 0], p: { noCrane: true, lit: W('b13', '72.000'), litDur: 0.9, press: W('b13', 'aprietan') } },
    ],
    overlays: [H1('72.000 TONELADAS DE PRESIÓN SOBRE LA TAPA', W('b13', '72.000')), FU_IB] },

  // 14. ¿Trabajás en energía? Contá abajo qué parte de una central conocés por dentro.
  { id: 'b14', set: 'room', cam: { from: [0.8, G + 1.0, 8.6], to: [0.6, G + 0.9, 7.9], look: [0.4, G + 0.3, -0.2], fov: 44, shift: SH }, keywords: ['¿Trabajás', 'energía?', 'central'],
    actors: [PIT,
      { type: 'central', pos: [0, G, 0], p: { potGlow: W('b14', 'parte'), lit: W('b14', 'central'), litDur: 0.6 } },
      { type: 'worker', pos: [1.6, G, -0.35], s: 0.3, p: { seq: [[0, 'idle'], [W('b14', 'Contá'), 'wave'], [W('b14', 'qué'), 'idle']] } },
    ],
    overlays: [H1('¿TRABAJÁS EN ENERGÍA?', PRE('b14'))] },
];
