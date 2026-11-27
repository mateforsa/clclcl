import type { BeatSpec } from '../../src/Beat';
import timing from './timing.json';
import { ALP, WIL, SIL, BLUE, PINK, WHITE, NAVY, SKY, AMBER, RED, LIME } from './props';

// Video suelto. Look propio (distinto de colapinto-fp1-qatar y de fp2-qatar-general): diorama de escritorio, mesa de nogal
// oscuro con pista de juguete (pianos rojos y blancos, rieles), almanaque de escritorio VIERNES -> SÁBADO (abre y cierra),
// pizarra verde oscura para la tabla, taller negro para los frenos, leca de noche para la roja y neón violeta para Las Vegas.
// Autos genéricos sin logos: azul con rosa (Alpine), azul marino con celeste (Williams), plateado (genérico).
// Pilotos genéricos con cascos de colores; los nombres van solo en las placas 2D.
// Textos 2D: los de "## Placas por plano" de guion.md (tags, sin pill, borde inferior <= 1450 px).
// Carteles 3D solo con datos del guion: VIERNES 27, SÁBADO 28, PRÁCTICA 2, CURVA 1, la torre (1, 15), 14 VUELTAS, VIERNES 20.
// Se sacaron los planos 10 (Sainz 16°) y 5 ("Puede ser") porque la toma pasaba de 60 s.
const PI = Math.PI;
const PANEL = 'rgba(11,16,32,.92)';
const fit = (text: string, max: number) => Math.min(max, Math.floor(780 / (text.length * 0.64)));
const P1 = (text: string, at: any, o: any = {}) => ({ type: 'tag' as const, text, at, x: 46, y: 65.5, color: PANEL, size: fit(text, 46), ...o });
const P2 = (text: string, at: any, o: any = {}) => ({ type: 'tag' as const, text, at, x: 46, y: 70, color: PANEL, size: fit(text, 40), ...o });
const FUENTE = { type: 'tag' as const, text: 'FUENTES: FORMULA1.COM, RACEFANS, INFOBAE, TN, TYC SPORTS, LA NACIÓN', at: 0.2, x: 46, y: 73.9, color: 'rgba(11,16,32,.75)', size: 19 };

// segundos desde el inicio del plano en que empieza una palabra (misma regla que el render)
const norm = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9$]/g, '');
const W = (id: string, word: string, nth = 1): number => {
  const tb = (timing as any).beats.find((b: any) => b.id === id); let k = nth;
  for (const w of tb.words) if (w.w.split(' ').some((x: string) => norm(x).startsWith(norm(word))) && --k === 0) return w.s - tb.start;
  throw new Error(`[${id}] falta "${word}"`);
};

const ST = (kind: string, o: any = {}) => ({ type: 'stage', p: { kind, ...o } });
const COLA = { ...ALP, helmet: '#ffd23a' };          // casco amarillo
const GAS = { ...ALP, helmet: '#f3f5f7' };           // casco blanco
const SAI = { ...WIL, helmet: '#ff7a1a' };           // casco naranja
const RUS = { ...SIL, helmet: '#7ad0ff' };           // casco celeste
const CUR = { cx: 0.9, cz: 0.2, r0: 0.9, r1: 2.9 };  // curva 1

export const BEATS: BeatSpec[] = [
  // 1. «Corre como si fuera domingo». Carlos Sainz lo dijo de Colapinto, después de la segunda práctica de Qatar.
  { id: 'b01', set: 'room', cam: { from: [0.6, 1.6, 6.6], to: [0.15, 1.45, 5.8], look: [0, 0.45, -0.5], lookTo: [0, 0.42, -0.5], fov: 46 }, keywords: ['domingo».', 'Sainz', 'Colapinto,', 'Qatar.'],
    actors: [
      ST('mesa', { track: false }),
      { type: 'almanac', pos: [0, 0, -0.9], p: { pages: [{ top: 'VIERNES', big: '27' }] } },
      { type: 'f1', pos: [-1.0, 0, -0.35], rot: [0, 0.3, 0], s: 0.36, p: SAI },
      { type: 'f1', pos: [1.0, 0, -0.35], rot: [0, -0.3, 0], s: 0.36, p: COLA },
      { type: 'ring', pos: [-1.0, 0.03, -0.35], at: 'Sainz', p: { r: 0.38, color: SKY } },
      { type: 'ring', pos: [1.0, 0.03, -0.35], at: 'Colapinto,', p: { r: 0.38, color: PINK } },
      { type: 'pitboard', pos: [1.15, 0, -1.6], rot: [0, -0.3, 0], s: 0.6, at: 'segunda', p: { lines: [{ t: 'PRÁCTICA 2' }], w: 1.2, pole: 0.5 } },
    ],
    overlays: [P1('«CORRE COMO SI FUERA DOMINGO»', 0), P2('CARLOS SAINZ, SOBRE COLAPINTO', 'Colapinto', { out: 'Qatar' }), P2('PRÁCTICA 2 · GP DE QATAR · VIERNES 27/11', 'Qatar'), FUENTE] },

  // 2. En la curva 1, Colapinto se le tiró por adentro y lo pasó.  (picado sobre la curva: el Alpine por adentro)
  { id: 'b02', set: 'room', cam: { from: [-0.5, 7.4, 4.8], to: [-0.1, 6.9, 4.2], look: [-0.1, 0, -0.7], lookTo: [0.1, 0, -0.8], fov: 46 }, keywords: ['1,', 'adentro', 'pasó.'],
    actors: [
      ST('curva', CUR),
      { type: 'curvecar', p: { ...CUR, r: 2.35, s0: -0.7, s1: 3.4, dur: 3.6, sc: 0.5, car: SAI } },
      { type: 'curvecar', p: { ...CUR, r: 1.35, s0: -1.8, s1: 3.1, dur: 3.6, sc: 0.5, car: COLA } },
      { type: 'pitboard', pos: [-1.2, 0, -2.3], rot: [-0.3, 0.3, 0], s: 0.75, at: '1,', p: { lines: [{ t: 'CURVA 1' }], w: 1.1, pole: 0.35 } },
    ],
    overlays: [P1('CURVA 1', '1,'), P2('COLAPINTO (ALPINE) POR ADENTRO', 'adentro'), FUENTE] },

  // 3. Casi se tocan, y atrás Russell soltó por radio: «Oh, wow».  (de frente, al ras: rueda con rueda; atrás el plateado)
  { id: 'b03', set: 'room', cam: { from: [1.1, 1.2, 5.4], to: [0.5, 1.15, 4.7], look: [0, 0.0, -0.6], lookTo: [0, 0.05, -0.8], fov: 46 }, keywords: ['tocan,', 'Russell', '«Oh, wow».'],
    actors: [
      ST('mesa', { speed: 6 }),
      { type: 'f1', pos: [-0.36, 0, 0.5], s: 0.45, p: { ...COLA, speed: 16 } },
      { type: 'f1', pos: [0.36, 0, 0.35], s: 0.45, p: { ...SAI, speed: 16 } },
      { type: 'f1', pos: [0.0, 0, -1.9], s: 0.45, p: { ...RUS, speed: 16 } },
      { type: 'flash', pos: [0.0, 0.14, 0.95], at: 'tocan', p: { color: AMBER } },
      { type: 'ring', pos: [0.0, 0.03, -1.9], at: 'Russell', p: { r: 0.45, color: '#7ad0ff' } },
      { type: 'radio', pos: [0.0, 0.45, -1.8], at: 'radio', p: { color: AMBER, r: 0.25, loops: 4 } },
    ],
    overlays: [P1('CASI SE TOCAN', 'tocan'), P2('GEORGE RUSSELL, POR RADIO: «OH, WOW»', 'wow'), FUENTE] },

  // 4. Sainz dijo que ya van un par de viernes así.  (el piloto de casco naranja y las hojas de VIERNES que se juntan)
  { id: 'b04', set: 'room', cam: { from: [-0.4, 1.4, 5.8], to: [-0.1, 1.3, 5.2], look: [0.1, 0.45, -0.3], fov: 46 }, keywords: ['Sainz', 'viernes'],
    actors: [
      ST('mesa', { track: false }),
      { type: 'pilot', pos: [-0.6, 0, -0.2], rot: [0, 0.35, 0], s: 0.85, p: { suit: NAVY, accent: SKY, helmet: '#ff7a1a', pose: 'shrug' } },
      { type: 'sheet', pos: [0.2, 0, -0.8], rot: [0, -0.2, 0], s: 0.8, at: 'par', p: { top: 'VIERNES' } },
      { type: 'sheet', pos: [0.92, 0, -0.35], rot: [0, -0.4, 0.0], s: 0.8, at: 'viernes', p: { top: 'VIERNES' } },
      { type: 'ring', pos: [-0.6, 0.03, -0.2], at: 'dijo', p: { r: 0.5, color: SKY } },
    ],
    overlays: [P1('«YA VAN UN PAR DE VIERNES»', 'viernes'), P2('SAINZ (WILLIAMS)', 'viernes'), FUENTE] },

  // 5. Pero en la tabla terminó en el puesto 15, a más de dos segundos y medio del primero.  (torre de tiempos en la pizarra)
  { id: 'b05', set: 'room', cam: { from: [0.8, 1.45, 5.6], to: [0.2, 1.4, 5.0], look: [0, 1.05, -0.8], fov: 46 }, keywords: ['tabla', '15,', 'primero.'],
    actors: [
      ST('pizarra'),
      { type: 'tower', pos: [0.15, 1.75, -1.4], p: { w: 2.3, rh: 0.5, rows: [
        { pos: '1', time: '1:23.077', sw: '#c9ced6' },
        { pos: '', time: '· · ·', dots: true, at: W('b05', 'tabla') },
        { pos: '15', time: '1:25.733', sw: PINK, hi: true, at: W('b05', '15') }] } },
      { type: 'f1', pos: [-0.55, 0, 0.9], rot: [0, 0.6, 0], s: 0.4, p: COLA },
      { type: 'ring', pos: [-0.55, 0.03, 0.9], at: 'primero', p: { r: 0.45, color: PINK } },
    ],
    overlays: [P1('COLAPINTO 15° · 1:25.733', '15'), P2('A 2,656 S DE ANTONELLI (1°)', 'primero'), FUENTE] },

  // 6. Tuvo problemas de frenos, y su vuelta con gomas blandas, las más rápidas, quedó a medias.  (disco al rojo; vuelta cortada)
  { id: 'b06', set: 'room', cam: { from: [-0.4, 1.3, 6.0], to: [0.1, 1.2, 5.4], look: [0.2, 0.55, -0.3], fov: 46 }, keywords: ['frenos,', 'blandas,', 'medias.'],
    actors: [
      ST('taller'),
      { type: 'brake', pos: [-0.55, 0.95, -0.5], p: { r: 0.75, heat: 1.0 } },
      { type: 'halflap', pos: [0.5, 1.55, 0.1], at: 'vuelta', p: { r: 0.42, n: 24, stop: 0.5, dur: W('b06', 'medias') - W('b06', 'vuelta'), cutAt: W('b06', 'medias') - W('b06', 'vuelta') } },
      { type: 'tyre', pos: [0.72, 0.42, 0.45], rot: [0, PI / 2 - 0.45, 0], at: 'blandas', p: { r: 0.4, w: 0.3, band: RED } },
    ],
    overlays: [P1('«TUVIMOS PROBLEMAS CON LOS FRENOS»', 'frenos'), P2('SIN VUELTA CON BLANDAS', 'medias'), FUENTE] },

  // 7. La cortó la bandera roja de Gasly, su compañero, enterrado en la leca.  (Alpine de casco blanco hundido en la grava)
  { id: 'b07', set: 'room', cam: { from: [1.0, 1.9, 6.2], to: [0.4, 1.7, 5.5], look: [0, -0.25, -0.6], fov: 46 }, keywords: ['roja', 'Gasly,', 'leca.'],
    actors: [
      ST('leca'),
      { type: 'f1', pos: [-0.45, -0.13, -0.3], rot: [0.05, 0.85, 0.07], s: 0.5, p: GAS },
      { type: 'heap', pos: [-0.45, 0, -0.3], p: { n: 12, seed: 4, spread: [0.9, 0.7] } },
      { type: 'redflag', pos: [0.6, 0, -1.3], at: 'roja', enter: 'grow', p: { pole: 1.3, w: 0.75, h: 0.45 } },
      { type: 'ring', pos: [-0.45, 0.03, -0.3], at: 'compañero', p: { r: 0.75, color: PINK } },
      { type: 'heap', pos: [-0.45, 0, -0.3], at: 'enterrado', enter: 'grow', p: { n: 10, seed: 9, spread: [1.0, 0.8] } },
    ],
    overlays: [P1('BANDERA ROJA: GASLY EN LA LECA', 'roja'), FUENTE] },

  // 8. Gasly dio apenas 14 vueltas, y aun así terminó casi un segundo adelante.  (los dos Alpine; el de casco blanco se escapa)
  { id: 'b08', set: 'room', cam: { from: [-0.7, 2.2, 7.0], to: [-0.2, 2.0, 6.3], look: [0, -0.1, -0.8], fov: 46 }, keywords: ['Gasly', '14', 'adelante.'],
    actors: [
      ST('mesa', { speed: 5 }),
      { type: 'f1', pos: [-0.5, 0, 0.3], s: 0.42, p: { ...GAS, speed: 16 }, move: { to: [-0.5, 0, 1.0], at: 'casi', dur: 1.2 } },
      { type: 'f1', pos: [0.5, 0, -1.0], s: 0.42, p: { ...COLA, speed: 16 } },
      { type: 'pitboard', pos: [-0.9, 0, -2.6], rot: [0, 0.2, 0], s: 0.8, at: '14', p: { lines: [{ t: '14' }, { t: 'VUELTAS', c: PINK }], w: 1.0, pole: 0.4 } },
      { type: 'ring', pos: [-0.5, 0.03, 0.3], at: 'apenas', out: 'casi', p: { r: 0.45, color: WHITE } },
    ],
    overlays: [P1('GASLY: 14 VUELTAS · 12° · 1:24.764', '14'), P2('COLAPINTO: 31 VUELTAS · 15° · A 0,969 S', 'casi'), FUENTE] },

  // 9. El viernes anterior, en Las Vegas, el enojado era Colapinto, que pidió por radio: «Lo tienen que penalizar».
  { id: 'b09', set: 'room', cam: { from: [0.8, 1.6, 6.6], to: [0.3, 1.5, 5.9], look: [0, 0.0, -0.9], fov: 46 }, keywords: ['Vegas,', 'Colapinto,', 'penalizar».'],
    actors: [
      ST('vegas', { speed: 6 }),
      { type: 'f1', pos: [0.45, 0, 0.5], s: 0.42, p: { ...SAI, speed: 16 } },
      { type: 'f1', pos: [-0.45, 0, -0.7], s: 0.42, p: { ...COLA, speed: 16 } },
      { type: 'sheet', pos: [1.05, 0, -2.4], rot: [0, -0.3, 0], s: 1.1, at: 'viernes', p: { top: 'VIERNES', big: '20' } },
      { type: 'ring', pos: [-0.45, 0.03, -0.7], at: 'enojado', p: { r: 0.45, color: RED } },
      { type: 'radio', pos: [-0.45, 0.45, -0.6], at: 'radio', p: { color: RED, r: 0.25, loops: 5 } },
    ],
    overlays: [P1('LAS VEGAS · PRÁCTICA 3 · VIERNES 20/11', 'Vegas', { out: '«Lo' }), P1('COLAPINTO, POR RADIO:', '«Lo'), P2('«LO TIENEN QUE PENALIZAR»', '«Lo'), FUENTE] },

  // 10. El sábado a las tres de la tarde clasifican. Ahí sí, todos corren como si fuera domingo.  (el almanaque pasa a SÁBADO)
  { id: 'b10', set: 'room', cam: { from: [-0.5, 1.6, 6.6], to: [-0.1, 1.45, 5.8], look: [0, 0.55, -0.5], lookTo: [0, 0.5, -0.5], fov: 46 }, keywords: ['sábado', 'tres', 'clasifican.', 'domingo.'],
    actors: [
      ST('mesa', { track: false }),
      { type: 'box', pos: [-0.3, 0.17, -0.8], p: { size: [1.8, 0.34, 1.0], color: '#5a1f2a' } },
      { type: 'box', pos: [-0.3, 0.36, -0.8], p: { size: [1.7, 0.04, 0.95], color: '#d8c9a8' } },
      { type: 'almanac', pos: [-0.3, 0.38, -0.8], p: { pages: [{ top: 'VIERNES', big: '27' }, { top: 'SÁBADO', big: '28', at: W('b10', 'sábado') }] } },
      { type: 'clock', pos: [1.0, 0.5, -0.4], rot: [0, -0.35, 0], at: 'tres', p: { h: 3, m: 0, r: 0.34 } },
      ...[COLA, SAI, RUS, { color: '#e2412f', accent: '#ffd23a', stripe: '#5a0f0a', helmet: '#f3f5f7' }].map((c, i) => ({
        type: 'f1', pos: [-2.6 - i * 1.1, 0, 1.35 - (i % 2) * 0.35] as [number, number, number], rot: [0, PI / 2, 0] as [number, number, number], s: 0.32, enter: 'none' as const,
        p: { ...c, speed: 18 }, move: { to: [3.4 - i * 1.1, 0, 1.35 - (i % 2) * 0.35] as [number, number, number], at: 'todos', dur: 1.9 } })),
    ],
    overlays: [P1('CLASIFICACIÓN: SÁBADO 28 · 15:00 (ARG)', 'tres'), P2('COMO SI FUERA DOMINGO', 'como'), FUENTE] },

  // 11. En una práctica, ¿vos te tirabas por adentro? Contalo abajo.  (desde atrás: los dos entrando a la curva 1, la luz marca el hueco)
  { id: 'b11', set: 'room', cam: { from: [-1.5, 2.7, 6.6], to: [-1.1, 2.4, 5.8], look: [-0.45, -0.5, -0.9], lookTo: [-0.35, -0.5, -1.0], fov: 46 }, keywords: ['práctica,', 'adentro?', 'abajo.'],
    actors: [
      ST('curva', CUR),
      { type: 'curvecar', p: { ...CUR, r: 2.35, s0: -2.8, s1: -0.7, dur: 4.0, car: SAI } },
      { type: 'curvecar', p: { ...CUR, r: 1.35, s0: -3.7, s1: -2.0, dur: 4.0, car: COLA } },
      { type: 'chevrons', pos: [CUR.cx - 1.35, 0, CUR.cz + 0.2], at: 'tirabas', p: { n: 4, color: LIME } },
    ],
    overlays: [P1('¿VOS TE TIRABAS POR ADENTRO?', 'adentro')] },
];
