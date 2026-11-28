import type { BeatSpec } from '../../src/Beat';
import timing from './timing.json';

// Video suelto (no es serie). Look propio: mar austral frío, gris verdoso, cielo cubierto; corte bajo el agua con los 70 m de agua,
// el lecho y los estratos de roca con los tres pozos horizontales dibujados en la cara del corte (siempre dentro de la roca).
// Imagen que abre y cierra: la plataforma en el mar frente a Tierra del Fuego (planos 1-2) y en corte, parada en 70 m de agua (12).
// Textos 2D = solo los de "## Placas por plano" (tags arriba, bajo los subtítulos, sin pill; todo lo 3D clave va de y ≈ 800 px para
// abajo). Nada de carteles 3D con texto ni logos. Escala: 1 u = 28 m (70 m de agua = 2,5 u; barcos de 308 m = 11 u; torta del 8 %).
// Anclas: todas con W() = palabra EXACTA del timing (sin choques por prefijo: "4.000", "8%", "36", "70", "10 millones").
const SB = 1.3, SEA = 3.8, CUTZ = 0.9;
const PANEL = 'rgba(10,14,16,.9)';
const fit = (text: string, max: number, px = 800) => Math.min(max, Math.floor(px / (text.length * 0.72)));
const H1 = (text: string, at: any, o: any = {}) => ({ type: 'tag' as const, text, at, x: 50, y: 31.6, color: PANEL, size: fit(text, 44), ...o });
const H2 = (text: string, at: any, o: any = {}) => ({ type: 'tag' as const, text, at, x: 50, y: 35.6, color: PANEL, size: fit(text, 38), ...o });
const SRC = (text: string, at: any = 0) => ({ type: 'tag' as const, text, at, x: 50, y: 39.2, color: 'rgba(10,14,16,.78)', size: 20 });

const BT = (timing as any).beats as { id: string; start: number; end: number; words: { w: string; s: number; e: number }[] }[];
const DUR = (id: string) => { const b = BT.find((x) => x.id === id)!; return b.end - b.start; };
/** at negativo grande = medio segundo antes del inicio del plano: el pop ya terminó en el cuadro 0 */
const PRE = (id: string) => -(DUR(id) + 0.5);
/** segundos desde el inicio del plano hasta la palabra EXACTA `word` (n-ésima aparición) */
const W = (id: string, word: string, nth = 1): number => {
  const b = BT.find((x) => x.id === id)!; let k = nth;
  for (const w of b.words) if (w.w === word && --k === 0) return w.s - b.start;
  throw new Error(`[${id}] no está "${word}"`);
};
const LN = SRC('FUENTE: LA NACIÓN (20/9/2024)');
const IP = SRC('FUENTE: IPROFESIONAL (22/1/2025)');

/** cámara frontal al corte: la franja de y (a..b) del mundo ocupa la pantalla de ~800 a ~1600 px */
const cutCam = (a: number, b: number, x = 0, o: { dz?: number; dx?: number; dy?: number; up?: number } = {}) => {
  const h = b - a; const Hv = h * 2.4; const d = Hv / 0.808; const ly = (a + b) / 2 + 0.15 * Hv; const up = o.up ?? 0.25;
  return { from: [x + (o.dx ?? 0.25), ly + up + (o.dy ?? 0), CUTZ + d * (1 + (o.dz ?? 0.05))] as any, to: [x - (o.dx ?? 0.25) * 0.4, ly + up, CUTZ + d] as any,
    look: [x, ly, 0] as any, fov: 44, shift: 0 };
};
const SEAW = (o: any = {}) => ({ type: 'world', p: o });
const CUT = SEAW({ cut: true });

export const BEATS: BeatSpec[] = [
  // 1. Mirá ese punto en el mar, a 60 kilómetros de Tierra del Fuego.
  { id: 'b01', set: 'room', cam: { from: [0.0, SEA + 7.4, 4.6], to: [0.15, SEA + 6.7, 3.9], look: [0.0, SEA, -1.6], fov: 44, shift: 0 }, keywords: ['punto', 'Fuego.'],
    actors: [SEAW({ coast: { x0: -1.2 }, front: 9 }),
      { type: 'beacon', pos: [1.2, SEA + 0.06, -0.4], s: 1.0 },
    ],
    overlays: [H1('A 60 KM DE TIERRA DEL FUEGO', W('b01', '60')), IP] },

  // 2. Es una plataforma de 4.000 toneladas, y según La Nación iba a dar el equivalente al 8% del gas argentino.
  { id: 'b02', set: 'room', cam: { from: [0.8, SEA + 1.5, 7.6], to: [0.45, SEA + 1.35, 6.8], look: [0.2, SEA + 1.35, 0], fov: 44, shift: 0 }, keywords: ['plataforma', '4.000', '8%'],
    actors: [SEAW({ coast: { x0: -3.6 } }),
      { type: 'platform', pos: [-0.45, SB, -0.2], p: { light: true } },
      { type: 'pie', pos: [1.0, SEA + 0.55, 0.8], s: 0.6, at: W('b02', 'equivalente'), p: { at: W('b02', '8%') } },
    ],
    overlays: [H1('4.000 TONELADAS', W('b02', '4.000')), H2('PENSADA PARA EL 8% DEL GAS ARGENTINO', W('b02', '8%')), LN] },

  // 3. Se llama Fénix. Y no la hicieron acá.
  { id: 'b03', set: 'room', cam: { from: [-1.8, SEA + 1.7, 4.4], to: [-1.2, SEA + 1.5, 4.8], look: [0, SEA + 1.7, 0], fov: 44, shift: 0 }, keywords: ['Fénix.', 'acá.'],
    actors: [SEAW({ coast: { x0: -4.2 } }),
      { type: 'platform', pos: [0, SB, 0], p: { light: true } },
    ],
    overlays: [H1('PLATAFORMA FÉNIX', W('b03', 'Fénix.')), H2('TOTALENERGIES Y SOCIOS', W('b03', 'hicieron')), LN] },

  // 4. La armaron en dos partes en Rávena, Italia.
  { id: 'b04', set: 'room', cam: { from: [0.5, SEA + 2.6, 6.4], to: [0.2, SEA + 2.4, 5.8], look: [-0.15, SEA + 1.55, -1.6], fov: 44, shift: 0 }, keywords: ['dos', 'Rávena,'],
    actors: [SEAW({ seaC: '#405b58' }),
      { type: 'yard', pos: [0, 0, 0], p: { jacketAt: W('b04', 'dos'), topAt: W('b04', 'partes') } },
    ],
    overlays: [H1('HECHA EN DOS PARTES', W('b04', 'dos')), H2('EN RÁVENA, ITALIA', W('b04', 'Rávena,')), IP] },

  // 5. Pero primero, en 2023, tendieron un caño de 36 kilómetros por el fondo.
  { id: 'b05', set: 'room', cam: cutCam(SB - 0.2, SEA + 1.2, 0.0, { dx: 0.35 }), keywords: ['2023,', 'caño', '36'],
    actors: [CUT,
      { type: 'layship', p: { z: 0.3, xs: [[0, -1.2], [DUR('b05'), 0.7]] } },
      { type: 'laidpipe', p: { z: 0.3, xs: [[0, -1.2], [DUR('b05'), 0.7]] } },
    ],
    overlays: [H1('2023: 36 KM DE CAÑO SUBMARINO', W('b05', '2023,')), IP] },

  // 6. Después apoyaron la base en 70 metros de agua y montaron la parte de arriba.
  { id: 'b06', set: 'room', cam: cutCam(SB - 0.15, SEA + 1.9, 0.0), keywords: ['base', '70', 'arriba.'],
    actors: [CUT,
      { type: 'pipe', p: { pts: [[0.2, SB + 0.045, 0.2], [0.2, SB + 0.045, 0.62], [4.8, SB + 0.045, 0.62]] } },
      { type: 'platform', pos: [0, SB + 1.0, 0], p: { top: false }, move: { to: [0, SB, 0], at: W('b06', 'apoyaron'), dur: 1.6 } },
      { type: 'twinship', pos: [4.6, 0, 0], at: W('b06', 'y') - 0.3, enter: 'none', p: { topY: [[0, 0.45], [W('b06', 'parte') + 0.15, 0.45], [DUR('b06') - 0.05, 0.0]] },
        move: { to: [0, 0, 0], at: W('b06', 'y') - 0.3, dur: W('b06', 'parte') - W('b06', 'y') + 0.4 } },
      { type: 'platform', pos: [4.6, SB, 0], at: W('b06', 'y') - 0.3, enter: 'none', p: { jacket: false, topY: [[0, 0.45], [W('b06', 'parte') + 0.15, 0.45], [DUR('b06') - 0.05, 0.0]] },
        move: { to: [0, SB, 0], at: W('b06', 'y') - 0.3, dur: W('b06', 'parte') - W('b06', 'y') + 0.4 } },
    ],
    overlays: [H1('70 M DE AGUA', W('b06', '70')), H2('BARCOS DE MÁS DE 300 M', W('b06', 'montaron')), IP] },

  // 7. Desde ahí perforaron tres pozos horizontales, de costado bajo el fondo.
  { id: 'b07', set: 'room', cam: cutCam(0.25, SEA + 1.6, 0.0, { dx: -0.3 }), keywords: ['perforaron', 'horizontales,', 'costado'],
    actors: [CUT,
      { type: 'platform', pos: [0, SB, 0] },
      { type: 'wells', p: { x0: 0, drill: [[[W('b07', 'perforaron'), 0], [W('b07', 'pozos') + 0.6, 1]], [[W('b07', 'tres'), 0], [W('b07', 'costado') + 0.2, 1]], [[W('b07', 'horizontales,'), 0], [W('b07', 'fondo.') + 0.3, 1]]] } },
    ],
    overlays: [H1('3 POZOS HORIZONTALES', W('b07', 'tres')), IP] },

  // 8. El gas sube, entra al caño y llega a otra plataforma, Vega Pléyade.
  { id: 'b08', set: 'room', cam: { ...cutCam(0.25, SEA + 1.6, 0.25, { dx: 0.3 }) }, keywords: ['gas', 'caño', 'Vega Pléyade.'],
    actors: [CUT,
      { type: 'platform', pos: [-0.9, SB, 0] },
      { type: 'wells', p: { x0: -0.9, flow: [W('b08', 'gas'), W('b08', 'gas') + 0.15, W('b08', 'gas') + 0.3] } },
      { type: 'riserflow', pos: [-0.9, SB, 0], p: { at: W('b08', 'sube,') } },
      { type: 'other', pos: [1.6, SB, -2.6], p: { glow: W('b08', 'Vega Pléyade.') } },
      { type: 'pipe', p: { pts: [[-0.7, SB + 0.045, 0.2], [-0.7, SB + 0.045, 0.62], [-0.1, SB + 0.045, 0.62], [1.78, SB + 0.045, -2.42]], flow: W('b08', 'caño'), n: 12 } },
    ],
    overlays: [H1('→ PLATAFORMA VEGA PLÉYADE', W('b08', 'otra')), LN] },

  // 9. De ahí sigue a tierra, y por gasoducto hasta Bahía Blanca.
  { id: 'b09', set: 'room', cam: { from: [0.1, 10.2, 0.9], to: [0.0, 9.6, 0.6], look: [0, 0, -0.15], fov: 44, shift: 0 }, keywords: ['tierra,', 'gasoducto', 'Bahía'],
    actors: [SEAW({ mapOnly: true }),
      { type: 'mapar', p: { fenix: 0, vega: 0, sea: [[0.05, 0], [W('b09', 'tierra,') + 0.3, 1]], plants: W('b09', 'tierra,'), route: [[W('b09', 'gasoducto'), 0], [W('b09', 'Blanca.') + 0.3, 1]], bahia: W('b09', 'Bahía') } },
    ],
    overlays: [H1('RÍO CULLEN Y CAÑADÓN ALFA', W('b09', 'tierra,')), H2('→ 2.000 KM HASTA BAHÍA BLANCA', W('b09', 'gasoducto')), LN] },

  // 10. El primer pozo arrancó en septiembre de 2024.
  { id: 'b10', set: 'room', cam: cutCam(0.25, SEA + 1.6, 0.0, { dx: 0.3 }), keywords: ['primer', 'septiembre'],
    actors: [CUT,
      { type: 'platform', pos: [0, SB, 0] },
      { type: 'wells', p: { x0: 0, flow: [W('b10', 'arrancó')] } },
      { type: 'riserflow', pos: [0, SB, 0], p: { at: W('b10', 'arrancó') + 0.4, down: false } },
    ],
    overlays: [H1('SEPTIEMBRE 2024: PRIMER POZO', W('b10', 'primer')), H2('5 MILLONES DE M³/DÍA', W('b10', 'septiembre')), LN] },

  // 11. En enero de 2025 andaban los tres: 10 millones de metros cúbicos por día.
  { id: 'b11', set: 'room', cam: cutCam(0.25, SEA + 1.6, 0.0, { dx: -0.3, dz: -0.04 }), keywords: ['enero', 'tres:', '10 millones'],
    actors: [CUT,
      { type: 'platform', pos: [0, SB, 0] },
      { type: 'wells', p: { x0: 0, flow: [0, W('b11', 'andaban'), W('b11', 'tres:')] } },
      { type: 'riserflow', pos: [0, SB, 0], p: { at: 0, down: false } },
    ],
    overlays: [H1('ENERO 2025: 3 POZOS', W('b11', 'enero')), H2('10 MILLONES DE M³/DÍA', W('b11', '10 millones')), IP] },

  // 12. 4.000 toneladas de Italia, paradas en 70 metros de agua.
  { id: 'b12', set: 'room', cam: cutCam(0.25, SEA + 1.7, 0.0, { dz: -0.07, dx: 0.3 }), keywords: ['4.000', 'Italia,', '70'],
    actors: [CUT,
      { type: 'pipe', p: { pts: [[0.2, SB + 0.045, 0.2], [0.2, SB + 0.045, 0.62], [4.8, SB + 0.045, 0.62]] } },
      { type: 'platform', pos: [0, SB, 0], p: { light: true, flag: W('b12', 'Italia,') } },
      { type: 'wells', p: { x0: 0 } },
    ],
    overlays: [H1('4.000 TONELADAS EN 70 M DE AGUA', W('b12', '4.000')), IP] },

  // 13. ¿Cuántas de estas tres sabías: Italia, los pozos de costado o la otra plataforma? Dejá el número.
  { id: 'b13', set: 'room', cam: { from: [0.0, SEA + 2.7, 7.9], to: [0.0, SEA + 2.45, 7.1], look: [0, SEA + 1.55, 0], fov: 44, shift: 0 }, keywords: ['¿Cuántas', 'Italia,', 'pozos', 'plataforma?'],
    actors: [SEAW({ coast: { x0: -4.2 } }),
      { type: 'token', pos: [-1.05, SEA - 0.02, 0], p: { kind: 'flag', ph: 0, at: W('b13', 'Italia,') } },
      { type: 'token', pos: [0, SEA - 0.02, 0], p: { kind: 'well', ph: 1, at: W('b13', 'pozos') } },
      { type: 'token', pos: [1.05, SEA - 0.02, 0], p: { kind: 'other', ph: 2, at: W('b13', 'plataforma?') } },
    ],
    overlays: [H1('¿CUÁNTAS DE ESTAS 3 SABÍAS?', PRE('b13'))] },
];
