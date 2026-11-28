import type { BeatSpec } from '../../src/Beat';
import timing from './timing.json';

// Video suelto (no es serie). Look propio: corte transversal del Río de la Plata y la ciudad (ver props.tsx). Un solo mundo continuo:
// río marrón con la torre de toma -> caño bajo el lecho -> planta (bombas, coagulación, decantación, filtración, tanques) -> túnel
// de salida bajo la ciudad -> casa con la canilla. Planos 5 y 10 en una plataforma aparte (x = 30), sin datos inventados.
// Imagen que abre y cierra: la canilla (plano 1) y el recorrido torre -> canilla con una gota guía (plano 13).
// Textos 2D = solo los de "## Placas por plano" (tags, sin pill, borde inferior <= 1450 px), siempre abajo, sobre la tierra
// profunda oscura del corte (nada clave por debajo de ~1200 px). Sin personas y sin carteles 3D con texto.
// Anclas: todas con W() = palabra EXACTA del timing (sin choques por prefijo).
const OZ = -22; // el mundo vive detrás de la pared del fondo del set 'room'
const PANEL = 'rgba(10,14,22,.9)';
const fit = (text: string, max: number, px = 760) => Math.min(max, Math.floor(px / (text.length * 0.72)));
const P1 = (text: string, at: any, o: any = {}) => ({ type: 'tag' as const, text, at, x: 50, y: 67, color: PANEL, size: fit(text, 46), ...o });
const P2 = (text: string, at: any, o: any = {}) => ({ type: 'tag' as const, text, at, x: 50, y: 71, color: PANEL, size: fit(text, 40), ...o });
const SMALL = (text: string, at: any = 0, size = 20) => ({ type: 'tag' as const, text, at, x: 50, y: 74.2, color: 'rgba(10,14,22,.78)', size });

const B = (timing as any).beats as { id: string; start: number; end: number; words: { w: string; s: number; e: number }[] }[];
const DUR = (id: string) => { const b = B.find((x) => x.id === id)!; return b.end - b.start; };
/** segundos desde el inicio del plano hasta la palabra EXACTA `word` (n-ésima aparición) */
const W = (id: string, word: string, nth = 1): number => {
  const b = B.find((x) => x.id === id)!; let k = nth;
  for (const w of b.words) if (w.w === word && --k === 0) return w.s - b.start;
  throw new Error(`[${id}] no está "${word}"`);
};
const PRE = (id: string) => -(DUR(id) + 0.5);
type V3 = [number, number, number];
const z = (v: V3): V3 => [v[0], v[1], v[2] + OZ];
const cam = (from: V3, to: V3, look: V3, lookTo?: V3, fov = 44) => ({ from: z(from), to: z(to), look: z(look), lookTo: lookTo ? z(lookTo) : undefined, fov, shift: 0 });
const A = (type: string, p: any = {}) => ({ type, pos: [0, 0, OZ] as V3, p });

const FU_GOB = SMALL('FUENTE: ARGENTINA.GOB.AR (5/9/2016)');
const FU_INF = SMALL('FUENTE: INFOBAE (19/12/2019)');
const FU_DOS = SMALL('FUENTES: ARGENTINA.GOB.AR (5/9/2016) E INFOBAE (19/12/2019)');

const WORLD = { type: 'world', pos: [0, 0, 0] as V3, p: { oz: OZ } }, EARTH = A('earth');
const RIVER = (p: any = {}) => A('river', p);
const PIPES = (p: any = {}) => A('pipes', { flow: { main: 0, tun: 0, br: 0 }, ...p });
const PLANT = (p: any = {}) => A('plant', { all: true, ...p });
const CITY = (p: any = {}) => A('city', p);
const PAD = (p: any) => ({ type: 'pad', pos: [30, 0, OZ] as V3, p });

export const BEATS: BeatSpec[] = [
  // 1. Abrís la canilla en Buenos Aires.
  { id: 'b01', set: 'room', cam: cam([12.1, 1.05, 0.75], [11.98, 0.98, 0.5], [11.9, 0.53, -0.62]), keywords: ['canilla', 'Aires.'],
    actors: [WORLD, EARTH, PIPES(), CITY({ open: 0.05, flow: W('b01', 'canilla') })],
    overlays: [P1('TU CANILLA', W('b01', 'canilla'))] },

  // 2. Esa agua puede haber arrancado a 1.200 metros de la costa, adentro del Río de la Plata.
  { id: 'b02', set: 'room', cam: cam([-1.9, 0.75, 12.4], [-2.4, 0.65, 12.0], [-2.0, -0.45, 0], [-2.3, -0.45, 0]), keywords: ['1.200', 'Plata.'],
    actors: [WORLD, EARTH, RIVER({ ruler: W('b02', '1.200'), hl: W('b02', 'adentro') }), PIPES({ flow: {} })],
    overlays: [P1('1.200 M ADENTRO DEL RÍO DE LA PLATA', W('b02', '1.200')), FU_GOB] },

  // 3. Ahí una torre la toma, y un caño de 5,4 metros de diámetro la lleva a Palermo.
  { id: 'b03', set: 'room', cam: cam([-3.5, 0.6, 9.6], [-2.9, 0.5, 9.3], [-3.4, -0.5, 0], [-2.9, -0.55, 0]), keywords: ['torre', '5,4', 'Palermo.'],
    actors: [WORLD, EARTH, RIVER({ take: W('b03', 'toma,') }), PIPES({ flow: { main: W('b03', 'toma,') + 0.6 }, hl: { main: W('b03', 'caño') }, dia: W('b03', '5,4') })],
    overlays: [P1('TORRE DE TOMA · CAÑO DE 5,4 M DE DIÁMETRO', W('b03', 'torre')), FU_GOB] },

  // 4. A la planta potabilizadora General San Martín.
  { id: 'b04', set: 'room', cam: cam([4.4, 3.4, 9.6], [5.0, 3.1, 9.0], [5.1, -0.1, -0.7]), keywords: ['potabilizadora', 'Martín.'],
    actors: [WORLD, EARTH, PIPES(), PLANT(), CITY()],
    overlays: [P1('PLANTA GENERAL SAN MARTÍN · AYSA · PALERMO', W('b04', 'planta')), FU_GOB] },

  // 5. Según el Gobierno, en 2016 era una de las cuatro más grandes del mundo.
  { id: 'b05', set: 'room', cam: cam([30.4, 4.4, 7.4], [30.0, 4.1, 6.9], [30, -0.1, -0.5]), keywords: ['Gobierno,', '2016', 'mundo.'],
    actors: [WORLD, PAD({ mode: 'four', hl: W('b05', 'grandes') })],
    overlays: [P1('"UNA DE LAS 4 MÁS GRANDES DEL MUNDO"', W('b05', 'Gobierno,')), P2('GOBIERNO NACIONAL, 2016', W('b05', '2016')), FU_GOB] },

  // 6. Primero pasa por las bombas, y empieza a limpiarse por gravedad.
  { id: 'b06', set: 'room', cam: cam([2.8, 0.9, 8.6], [3.3, 0.8, 8.2], [3.0, -0.7, -0.3], [3.4, -0.7, -0.3]), keywords: ['bombas,', 'gravedad.'],
    actors: [WORLD, EARTH, PIPES({ fast: true }), PLANT({ all: false, st: { bombas: W('b06', 'bombas,') } })],
    overlays: [P1('1. BOMBAS · LIMPIEZA POR GRAVEDAD', W('b06', 'bombas,')), FU_GOB] },

  // 7. Después la coagulan, la decantan y la filtran para desinfectarla.
  { id: 'b07', set: 'room', cam: cam([4.2, 1.3, 6.6], [6.1, 1.2, 6.3], [4.4, 0.0, -0.4], [6.1, 0.0, -0.4]), keywords: ['coagulan,', 'decantan', 'filtran'],
    actors: [WORLD, EARTH, PIPES(), PLANT({ all: false, st: { bombas: -5, coag: W('b07', 'coagulan,'), dec: W('b07', 'decantan'), fil: W('b07', 'filtran') } })],
    overlays: [P1('2. COAGULACIÓN → DECANTACIÓN → FILTRACIÓN', W('b07', 'coagulan,')), FU_GOB] },

  // 8. Al final, en tanques, le agregan las últimas sustancias.
  { id: 'b08', set: 'room', cam: cam([7.3, 0.6, 5.9], [7.7, 0.5, 5.5], [7.5, -0.6, -0.5]), keywords: ['tanques,', 'sustancias.'],
    actors: [WORLD, EARTH, PIPES(), PLANT({ st: { tan: W('b08', 'agregan') } })],
    overlays: [P1('3. TANQUES · ÚLTIMAS SUSTANCIAS', W('b08', 'tanques,')), FU_GOB] },

  // 9. Y sale a la ciudad por ríos subterráneos.
  { id: 'b09', set: 'room', cam: cam([8.6, 0.8, 7.2], [10.4, 0.7, 7.0], [8.8, -0.2, -0.3], [10.6, -0.2, -0.3]), keywords: ['ríos', 'subterráneos.'],
    actors: [WORLD, EARTH, PIPES({ flow: { main: 0, tun: 0.05, br: W('b09', 'ríos') }, hl: { tun: W('b09', 'ríos') } }), PLANT(), CITY()],
    overlays: [P1('4. RÍOS SUBTERRÁNEOS', W('b09', 'ríos')), FU_GOB] },

  // 10. La planta puede tratar 3.100 millones de litros por día.
  { id: 'b10', set: 'room', cam: cam([29.6, 1.7, 6.6], [30.2, 1.55, 6.1], [30.1, 0.55, -0.6]), keywords: ['3.100 millones', 'litros'],
    actors: [WORLD, PAD({ mode: 'cube', at: W('b10', 'tratar'), dur: W('b10', 'día.') - W('b10', 'tratar') + 0.3 })],
    overlays: [P1('3,1 MILLONES DE M³ POR DÍA', W('b10', '3.100 millones')), P2('= 3.100 MILLONES DE LITROS · 28,7 HECTÁREAS', W('b10', 'litros')), FU_DOS] },

  // 11. Se inauguró en parte en 1913 y completa en 1928.
  { id: 'b11', set: 'room', cam: cam([4.8, 1.5, 7.8], [5.4, 1.35, 7.3], [5.25, 0.0, -1.0]), keywords: ['1913', '1928.'],
    actors: [WORLD, EARTH, PIPES(), PLANT({ build: [W('b11', '1913') - 0.25, W('b11', '1928.') - 0.25] })],
    overlays: [P1('1913: PARCIAL', W('b11', '1913')), P2('1928: COMPLETA', W('b11', '1928.')), FU_INF] },

  // 12. Según Infobae, en 2019 abastecía a 5,8 millones de personas, con toda la Ciudad.
  { id: 'b12', set: 'room', cam: cam([11.0, 1.6, 10.6], [11.9, 1.45, 10.0], [11.6, 0.1, -0.6]), keywords: ['Infobae,', '5,8 millones', 'Ciudad.'],
    actors: [WORLD, EARTH, PIPES({ flow: { main: 0, tun: 0, br: W('b12', 'abastecía'), }, brStep: 0.35 }), PLANT(), CITY({ lit: [W('b12', 'abastecía'), 0.32] })],
    overlays: [P1('5,8 MILLONES DE PERSONAS', W('b12', '5,8 millones')), P2('SEGÚN INFOBAE, 2019', W('b12', 'Según')), FU_INF] },

  // 13. Si vivís en la Ciudad, tu canilla puede empezar a 1.200 metros adentro del río.
  { id: 'b13', set: 'room', cam: cam([-3.0, 1.0, 12.0], [11.4, 0.9, 11.6], [-3.0, -0.3, 0], [11.4, -0.3, 0]), keywords: ['canilla', '1.200', 'río.'],
    actors: [WORLD, EARTH, RIVER(), PIPES(), PLANT(), CITY(), A('drop', { at: 0.1, dur: DUR('b13') - 0.4 })],
    overlays: [P1('1.200 M ADENTRO DEL RÍO', W('b13', '1.200')), FU_GOB] },

  // 14. ¿Trabajás en una planta de agua? Contá abajo en qué etapa.
  { id: 'b14', set: 'room', cam: cam([5.6, 0.5, 11.4], [5.2, 0.6, 10.8], [5.3, -0.45, 0]), keywords: ['¿Trabajás', 'agua?', 'etapa.'],
    actors: [WORLD, EARTH, PIPES(), PLANT({ st: (() => { const t0 = W('b14', 'Contá'), d = 0.32; return { bombas: t0, bombasOff: t0 + d, coag: t0 + d, coagOff: t0 + 2 * d, dec: t0 + 2 * d, decOff: t0 + 3 * d, fil: t0 + 3 * d, filOff: t0 + 4 * d, tan: t0 + 4 * d }; })() }), CITY()],
    overlays: [P1('¿TRABAJÁS EN UNA PLANTA DE AGUA?', PRE('b14'))] },
];
