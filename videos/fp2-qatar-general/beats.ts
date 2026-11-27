import type { BeatSpec } from '../../src/Beat';
import { BLUE, BLUED, PINK, WHITE, INK, TEAL, AMBER, RED } from './props';

// Video suelto (no es continuación de nada). Look propio: Lusail de noche (cielo azul noche, tribuna y focos solo en la
// franja baja, pianos verdes y blancos, leca gris), sala de telemetría azul petróleo, calle de boxes de noche y muro de boxes.
// Autos genéricos sin logos ni sponsors: plateados (Mercedes), rojo (Leclerc), azul con rosa (Alpine), naranja (McLaren).
// Metáfora que abre y cierra: el reloj de sesión (plano 1 suma +13:00; plano 13 en 0:00 con los dos plateados adelante).
// Textos 2D: los de "## Placas por plano" de guion.md. Todo con el borde inferior en 1450 px o menos (tags, sin pill).
// Carteles 3D: solo datos del guion (FP2, +13:00, 0:00, CURVA 14, 1-2-3 de la torre, 7 DÉCIMAS, 27, 57, PARADA 1/2, SÁBADO 28 15:00).
const PI = Math.PI;
const PANEL = 'rgba(11,16,32,.92)';
const fit = (text: string, max: number) => Math.min(max, Math.floor(840 / (text.length * 0.62)));
const P1 = (text: string, at: any, o: any = {}) => ({ type: 'tag' as const, text, at, x: 48, y: 65.5, color: PANEL, size: fit(text, 46), ...o });
const P2 = (text: string, at: any, o: any = {}) => ({ type: 'tag' as const, text, at, x: 48, y: 70, color: PANEL, size: fit(text, 40), ...o });
const FUENTE = { type: 'tag' as const, text: 'FUENTES: FORMULA1.COM, RACEFANS, THE RACE, TYC SPORTS, INFOBAE, LA NACIÓN', at: 0.2, x: 48, y: 73.9, color: 'rgba(11,16,32,.75)', size: 21 };

const ST = (kind: string, o: any = {}) => ({ type: 'stage', p: { kind, ...o } });
const SILVER = { color: '#c3c8d0', accent: '#1fd1c4', stripe: '#1b1e23', helmet: '#e8e8e8' };       // Mercedes genérico
const SILVER2 = { ...SILVER, helmet: '#f2c230' };
const REDC = { color: '#d42a1f', accent: '#f2c230', stripe: '#5a0d0a', helmet: '#f2c230' };          // Leclerc genérico
const ALP = { color: BLUE, accent: PINK, stripe: BLUED, helmet: WHITE };                              // Alpine genérico
const ORANGE = { color: '#ff8a1f', accent: '#1a1d24', stripe: '#1a1d24', helmet: '#f2e14a' };       // McLaren genérico
const name = (text: string, bg: string, color = '#fff', w = 0.85) => ({ text, w, h: 0.21, bg, color, size: 0.66, weight: 900 });

export const BEATS: BeatSpec[] = [
  // 1. Trece minutos extra: eso se estiró la segunda práctica de Qatar.  (reloj de sesión que no llega a cero y suma +13:00)
  { id: 'b01', set: 'room', cam: { from: [0.6, 1.2, 5.6], to: [-0.2, 1.35, 5.0], look: [0, 1.15, -0.6], lookTo: [0, 1.2, -0.6], fov: 46 }, keywords: ['Trece', 'extra:', 'Qatar.'],
    actors: [
      ST('pista', { speed: 6 }),
      { type: 'sessclock', pos: [0, 1.55, -0.9], p: { text: 'FP2', text2: '+13:00', at2: 0.35, bar0: 0.18, bar1: 0.03, barDur: 0.35, ext: 0.6, extDur: 1.2 } },
      { type: 'f1', pos: [-0.55, 0, 0.9], s: 0.42, p: { ...SILVER, speed: 14 } },
      { type: 'f1', pos: [0.6, 0, 0.3], s: 0.42, at: 'estiró', p: { ...ORANGE, speed: 14 } },
    ],
    overlays: [P1('+13 MINUTOS', 0, { size: 46 }), P2('PRÁCTICA 2 · GP DE QATAR · VIERNES 27/11', 'Qatar')] },

  // 2. Dos banderas rojas, y aun así Mercedes volvió a hacer el 1-2.  (dos banderas y los dos plateados con 1 y 2)
  { id: 'b02', set: 'room', cam: { from: [-0.8, 1.3, 5.8], to: [0.3, 1.45, 5.3], look: [0, 0.75, -0.4], fov: 46 }, keywords: ['banderas', 'rojas,', 'Mercedes', '1-2.'],
    actors: [
      ST('pista'),
      { type: 'redflag', pos: [-1.35, 0, -1.4], p: { pole: 1.5, phase: 0 } },
      { type: 'redflag', pos: [-0.65, 0, -1.9], at: 'rojas', p: { pole: 1.5, phase: 1.7 } },
      { type: 'f1', pos: [0.75, 0, -0.1], s: 0.45, at: 'Mercedes', p: SILVER },
      { type: 'f1', pos: [-0.35, 0, 0.5], s: 0.45, at: 'Mercedes', p: SILVER2 },
      { type: 'label', pos: [0.75, 0.82, -0.1], at: '1-2', p: name('1', PINK, '#fff', 0.36) },
      { type: 'label', pos: [-0.35, 0.82, 0.5], at: '1-2', p: name('2', PINK, '#fff', 0.36) },
    ],
    overlays: [P1('2 BANDERAS ROJAS', 'rojas'), P2('MERCEDES 1-2', '1-2'), FUENTE] },

  // 3. Sin que ninguno de sus autos cerrara una vuelta con blandas.  (boxes: los dos plateados quietos y el juego de blandas tachado)
  { id: 'b03', set: 'room', cam: { from: [0.9, 1.6, 6.0], to: [-0.3, 1.5, 5.5], look: [0, 0.6, -0.4], fov: 46 }, keywords: ['ninguno', 'blandas.'],
    actors: [
      ST('pit'),
      { type: 'f1', pos: [-0.75, 0, -1.2], rot: [0, 0.35, 0], s: 0.5, p: SILVER },
      { type: 'f1', pos: [0.75, 0, -1.4], rot: [0, -0.35, 0], s: 0.5, p: SILVER2 },
      { type: 'tyreset', pos: [0, 0, 0.6], at: 'vuelta', p: { band: RED, text: 'BLANDAS', bg: RED } },
      { type: 'cross', pos: [0, 0.75, 1.0], s: 0.5, at: 'blandas' },
    ],
    overlays: [P1('NINGÚN MERCEDES CERRÓ VUELTA CON BLANDAS', 'blandas'), FUENTE] },

  // 4. La primera roja: Leclerc hizo un trompo y dejó leca en la pista.  (auto rojo en trompo, piedritas de leca sobre el asfalto)
  { id: 'b04', set: 'room', cam: { from: [-0.6, 2.4, 5.8], to: [0.4, 2.1, 5.2], look: [0, 0.1, -0.5], lookTo: [0, 0.2, -0.5], fov: 46 }, keywords: ['roja:', 'Leclerc', 'trompo', 'pista.'],
    actors: [
      ST('pista'),
      { type: 'redflag', pos: [1.25, 0, -1.6], p: { pole: 1.3 } },
      { type: 'f1', pos: [-0.2, 0, -0.5], rot: [0, 0.4, 0], s: 0.55, out: 'trompo', p: REDC },
      { type: 'f1', pos: [-0.2, 0, -0.5], rot: [0, 0.4, 0], s: 0.55, at: 'trompo', enter: 'none', spin: 7, out: 'dejó', p: REDC },
      { type: 'f1', pos: [-0.2, 0, -0.5], rot: [0, 2.6, 0], s: 0.55, at: 'dejó', enter: 'none', p: REDC },
      { type: 'gravelbits', pos: [0.15, 0, 0.55], at: 'dejó', enter: 'none', p: { n: 34, rx: 1.2, rz: 0.55, dur: 0.6, seed: 11 } },
      { type: 'label', pos: [-0.2, 1.1, -0.5], at: 'Leclerc', p: name('LECLERC', '#5a0d0a') },
    ],
    overlays: [P1('ROJA 1: TROMPO DE LECLERC (FERRARI)', 'Leclerc'), P2('LECA EN LA PISTA', 'pista'), FUENTE] },

  // 5. La segunda: Gasly perdió el Alpine en la curva 14 y quedó enterrado en la leca.  (auto azul hundido en la leca, cartel CURVA 14)
  { id: 'b05', set: 'room', cam: { from: [0.8, 1.5, 5.6], to: [-0.2, 1.3, 5.0], look: [0, 0.45, -0.5], fov: 46 }, keywords: ['Gasly', 'Alpine', '14', 'enterrado'],
    actors: [
      ST('pista', { trackX: -3.6, barrier: true }),
      { type: 'pitboard', pos: [1.2, 0, -2.0], rot: [0, -0.2, 0], p: { lines: [{ t: 'CURVA' }, { t: '14', c: AMBER }], w: 0.8, pole: 0.5, frame: '#3a4152' } },
      { type: 'f1', pos: [-1.2, 0, 1.0], rot: [0, PI / 2 + 0.3, 0], s: 0.5, p: ALP, out: 'curva', move: { to: [0.0, 0, -0.4], at: 'perdió', dur: 1.0 } },
      { type: 'f1', pos: [0.0, -0.1, -0.4], rot: [0.06, PI / 2 + 1.1, 0.05], s: 0.5, at: 'curva', enter: 'none', p: ALP },
      { type: 'heap', pos: [0.0, 0, -0.4], at: 'enterrado', enter: 'grow', p: { pts: [[0.52, -0.08], [0.6, 0.5], [-0.42, -0.1], [-0.35, 0.45], [0.0, 0.75]], r: 0.3, h: 0.24 } },
      { type: 'label', pos: [-0.3, 0.95, -0.3], at: 'Gasly', p: name('GASLY', BLUED) },
    ],
    overlays: [P1('ROJA 2: GASLY (ALPINE) · CURVA 14', 'Gasly'), P2('A 22 MINUTOS DEL FINAL', 'leca'), FUENTE] },

  // 6. «Estoy estancado», avisó por radio.  (de cerca: el piloto en el auto hundido y las ondas de radio)
  { id: 'b06', set: 'room', cam: { from: [-0.5, 1.2, 3.6], to: [0.3, 1.3, 3.2], look: [0, 0.55, 0], fov: 46 }, keywords: ['estancado»,', 'radio.'],
    actors: [
      ST('pista', { trackX: -3.6 }),
      { type: 'f1', pos: [0, -0.1, 0], rot: [0.06, 0.5, 0.05], s: 0.6, p: ALP },
      { type: 'heap', pos: [0, 0, 0], p: { pts: [[0.55, 0.65], [-0.5, 0.75], [0.55, -0.55], [-0.6, -0.45]], r: 0.34, h: 0.26 } },
      { type: 'radio', pos: [0.15, 0.6, 0.2], p: { n: 3, period: 0.9, max: 0.8, color: TEAL } },
    ],
    overlays: [P1('«ESTOY ESTANCADO»', 'estancado'), P2('PIERRE GASLY, POR RADIO', -0.9), FUENTE] },

  // 7. Y Briatore, el jefe de Alpine, se levantó y se fue del box.  (muro de boxes: se levanta, deja los auriculares y se va)
  { id: 'b07', set: 'room', cam: { from: [0.7, 1.6, 5.4], to: [-0.2, 1.5, 4.9], look: [0, 0.9, -0.4], fov: 46 }, keywords: ['Briatore,', 'levantó', 'box.'],
    actors: [
      ST('pit'),
      { type: 'pitstand', pos: [0, 0, -0.8] },
      { type: 'person', pos: [0, 0.28, -0.3], rot: [0, PI, 0], out: 'levantó', p: { shirt: BLUED, pants: '#1b1e28', hair: '#c8c8c8', skin: '#e0ad86', pose: 'sit' } },
      { type: 'person', pos: [0, 0, 0.35], rot: [0, PI, 0], at: 'levantó', enter: 'none', out: 'fue', p: { shirt: BLUED, pants: '#1b1e28', hair: '#c8c8c8', skin: '#e0ad86', pose: 'idle' } },
      { type: 'person', pos: [0, 0, 0.35], rot: [0, PI / 2, 0], at: 'fue', enter: 'none', move: { to: [2.6, 0, 0.6], at: 'fue', dur: 1.4 }, p: { shirt: BLUED, pants: '#1b1e28', hair: '#c8c8c8', skin: '#e0ad86', pose: 'walk' } },
    ],
    overlays: [P1('FLAVIO BRIATORE, JEFE DE ALPINE', 'Briatore'), P2('SE FUE DEL BOX', 'box'), FUENTE] },

  // 8. Esa roja también dejó sin vuelta con blandas a Antonelli y a Colapinto, que terminó 15°.  (boxes: los dos con blandas, frenados)
  { id: 'b08', set: 'room', cam: { from: [-0.8, 1.8, 6.2], to: [0.4, 1.6, 5.6], look: [0, 0.5, -0.6], fov: 46 }, keywords: ['blandas', 'Antonelli', 'Colapinto,', '15°.'],
    actors: [
      ST('pit'),
      { type: 'redflag', pos: [1.35, 0, -2.4], p: { pole: 1.2 } },
      { type: 'f1', pos: [-0.65, 0, -0.9], s: 0.5, p: { ...SILVER, band: RED } },
      { type: 'f1', pos: [0.7, 0, -0.5], s: 0.5, at: 'Colapinto', p: { ...ALP, band: RED } },
      { type: 'label', pos: [-0.65, 0.85, -0.9], at: 'Antonelli', p: name('ANTONELLI', '#2a2f3a') },
      { type: 'label', pos: [0.7, 0.85, -0.5], at: 'Colapinto', p: name('COLAPINTO', PINK, INK) },
      { type: 'label', pos: [0.7, 1.12, -0.5], at: '15', p: name('15°', BLUED, '#fff', 0.4) },
    ],
    overlays: [P1('SIN VUELTA CON BLANDAS: ANTONELLI Y COLAPINTO', 'blandas'), P2('COLAPINTO 15° · +2,656 S', '15'), FUENTE] },

  // 9. Antonelli quedó primero con gomas medias. Russell, segundo.  (torre de tiempos 1 y 2, goma media amarilla)
  { id: 'b09', set: 'room', cam: { from: [-0.9, 1.0, 6.2], to: [0.4, 1.35, 5.6], look: [0, 0.95, 0], lookTo: [0, 1.0, 0], fov: 46 }, keywords: ['primero', 'medias.', 'Russell,'],
    actors: [
      ST('data'),
      { type: 'timing', pos: [0.35, 2.0, -0.8], p: { w: 2.3, rh: 0.48, rows: [
        { pos: '1', name: 'ANTONELLI' },
        { pos: '2', name: 'RUSSELL', at: 2.0 }] } },
      { type: 'tyre', pos: [-0.95, 0.6, 0.3], rot: [0, PI / 2 - 0.4, 0], p: { r: 0.55, w: 0.42, band: AMBER, roll: 0.5 } },
      { type: 'label', pos: [-0.95, 1.35, 0.3], at: 'medias', p: name('MEDIAS', AMBER, INK) },
    ],
    overlays: [P1('1° ANTONELLI (MERCEDES) · 1:23.077 · GOMAS MEDIAS', 'medias'), P2('2° RUSSELL (MERCEDES) · +0,127 S', 'Russell'), FUENTE] },

  // 10. Norris, tercero, calcula que McLaren está unas siete décimas por vuelta detrás de Mercedes.  (naranja detrás del plateado)
  { id: 'b10', set: 'room', cam: { from: [1.0, 1.3, 5.6], to: [-0.1, 1.45, 5.2], look: [0, 0.5, -0.6], fov: 46 }, keywords: ['Norris,', 'McLaren', 'décimas', 'Mercedes.'],
    actors: [
      ST('pista', { speed: 7 }),
      { type: 'f1', pos: [-0.45, 0, -1.6], s: 0.45, p: { ...SILVER, speed: 14 } },
      { type: 'f1', pos: [0.45, 0, 0.6], s: 0.45, p: { ...ORANGE, speed: 14 } },
      { type: 'label', pos: [0.45, 0.82, 0.6], at: 'Norris', p: name('3° NORRIS', '#7a3a08') },
      { type: 'label', pos: [-0.45, 0.82, -1.6], at: 'Mercedes', p: name('MERCEDES', '#2a2f3a') },
      { type: 'label', pos: [0.0, 0.32, -0.5], rot: [-PI / 2, 0, 0], at: 'décimas', p: { text: '≈ 7 DÉCIMAS', w: 1.1, h: 0.3, bg: AMBER, color: INK, size: 0.7, weight: 900 } },
    ],
    overlays: [P1('3° NORRIS (MCLAREN) · +0,445 S', 'Norris', { out: 'décimas' }), P1('SEGÚN NORRIS: UNAS 7 DÉCIMAS', 'décimas'), P2('POR VUELTA DETRÁS DE MERCEDES', 'décimas'), FUENTE] },

  // 11. Y para el domingo, Pirelli limitó cada juego de gomas a 27 vueltas.  (goma de frente con el aro de 27 vueltas)
  { id: 'b11', set: 'room', cam: { from: [0.9, 1.3, 5.6], to: [-0.4, 1.5, 6.1], look: [0, 0.95, 0], fov: 46 }, keywords: ['domingo,', 'Pirelli', '27'],
    actors: [
      ST('data'),
      { type: 'tyre', pos: [0, 1.5, -0.2], rot: [0, PI / 2, 0], p: { r: 0.62, w: 0.55, band: '#e9edf3', roll: 0.6 } },
      { type: 'lapring', pos: [0, 1.5, -0.2], at: 'limitó', p: { n: 27, r: 0.84, dur: 1.2 } },
      { type: 'label', pos: [0, 1.5, 0.1], at: '27', p: { text: '27', w: 0.6, h: 0.42, color: '#fff', size: 0.9, weight: 900 } },
      { type: 'tyreset', pos: [0.95, 0, 0.7], rot: [0, -0.4, 0], at: 'juego', p: { band: '#e9edf3' } },
    ],
    overlays: [P1('MÁXIMO 27 VUELTAS POR JUEGO DE GOMAS', '27'), P2('REGLA DE PIRELLI', -0.9), FUENTE] },

  // 12. Con 57 vueltas de carrera, todos paran por lo menos dos veces.  (picado sobre la calle de boxes: dos paradas)
  { id: 'b12', set: 'room', cam: { from: [0.8, 3.4, 6.6], to: [0.2, 3.0, 6.1], look: [0, -0.2, -0.6], lookTo: [0, -0.1, -0.8], fov: 46 }, keywords: ['57', 'paran', 'veces.'],
    actors: [
      ST('pit'),
      { type: 'f1', pos: [0.0, 0, -3.4], s: 0.5, p: SILVER, move: { to: [0.0, 0, -0.9], at: 'carrera', dur: 1.6 } },
      { type: 'pitboard', pos: [-0.95, 0, -1.4], rot: [0, 0.25, 0], at: '57', p: { lines: [{ t: '57' }, { t: 'VUELTAS', c: TEAL }], w: 0.95, pole: 0.45 } },
      { type: 'tyreset', pos: [0.95, 0, -2.5], rot: [0, -0.3, 0], at: 'paran', p: { band: '#e9edf3', text: 'PARADA 1', bg: PINK } },
      { type: 'tyreset', pos: [0.95, 0, -0.4], rot: [0, -0.3, 0], at: 'veces', p: { band: '#e9edf3', text: 'PARADA 2', bg: PINK } },
    ],
    overlays: [P1('CARRERA: 57 VUELTAS · DOMINGO 29 · 13:00 (ARG)', '57'), P2('= AL MENOS 2 PARADAS', 'veces'), FUENTE] },

  // 13. Dos rojas, trece minutos extra, y Mercedes igual adelante.  (vuelve el reloj, ya en 0:00, con los dos plateados adelante)
  { id: 'b13', set: 'room', cam: { from: [-0.6, 1.2, 5.6], to: [0.2, 1.35, 5.0], look: [0, 1.15, -0.6], lookTo: [0, 1.2, -0.6], fov: 46 }, keywords: ['rojas,', 'extra,', 'Mercedes', 'adelante.'],
    actors: [
      ST('pista', { speed: 6 }),
      { type: 'sessclock', pos: [0, 1.55, -0.9], p: { text: '+13:00', color: AMBER, text2: '0:00', at2: 0.9, color2: WHITE, bar0: 0.6, bar1: 0.0, barDur: 0.9 } },
      { type: 'redflag', pos: [-1.4, 0, -1.6], p: { pole: 1.0 } },
      { type: 'redflag', pos: [1.4, 0, -1.6], p: { pole: 1.0, phase: 1.3 } },
      { type: 'f1', pos: [-0.5, 0, 0.6], s: 0.42, at: 'Mercedes', p: { ...SILVER, speed: 14 } },
      { type: 'f1', pos: [0.5, 0, 0.9], s: 0.42, at: 'Mercedes', p: { ...SILVER2, speed: 14 } },
    ],
    overlays: [P1('2 ROJAS · +13 MINUTOS · MERCEDES 1-2', 'extra'), FUENTE] },

  // 14. ¿Cuántas décimas le saca a McLaren el sábado? Dejá tu número.  (plateado contra naranja, tarjeta de la clasificación)
  { id: 'b14', set: 'room', cam: { from: [0.3, 1.2, 6.0], to: [-0.3, 1.35, 5.2], look: [0, 1.0, -0.6], fov: 46 }, keywords: ['décimas', 'McLaren', 'sábado?', 'número.'],
    actors: [
      ST('press'),
      { type: 'racecard', pos: [0, 0.35, -1.6], s: 0.8, p: { top: 'SÁBADO 28', big: '15:00', w: 1.2, h: 0.8, hi: true } },
      { type: 'f1', pos: [-0.65, 0, 0.3], s: 0.42, p: SILVER },
      { type: 'f1', pos: [0.65, 0, 0.3], s: 0.42, p: ORANGE },
      { type: 'label', pos: [0, 0.55, 0.6], at: 'número', p: { text: '¿ ? DÉCIMAS', w: 1.0, h: 0.3, bg: AMBER, color: INK, size: 0.7, weight: 900 } },
    ],
    overlays: [P1('CLASIFICACIÓN: SÁBADO 28 · 15:00 (ARG)', 'sábado'), P2('¿CUÁNTAS DÉCIMAS LE SACA MERCEDES A MCLAREN?', 'número')] },
];
