import type { BeatSpec } from '../../src/Beat';
import { BLUE, BLUED, PINK, WHITE, INK, TEAL, AMBER, RED, GREEN } from './props';

// Video nuevo (no es continuación de colapinto-qatar-v2). Look propio: Lusail al caer el sol (pianos verdes y blancos,
// grava gris, cielo índigo con el horizonte magenta y naranja), sala de telemetría azul petróleo, calle de boxes de noche
// y sala de prensa azul noche. Autos genéricos sin logos: azul con rosa (los dos del mismo equipo), blanco con azul (rival).
// Metáfora que abre y cierra: dos autos en paralelo (plano 1 los dos iguales; plano 13 Colapinto contra Lindblad).
// Textos 2D: exactamente los de "## Placas por plano" de guion.md (placa 7 sin comillas, como pidió el verificador).
// Todo con el borde inferior en 1450 px o menos: placa 1 centrada en 65,5 %, placa 2 en 70 %, fuentes en 73,9 %.
// Puntos de campeonato: una ficha por punto (a escala), por eso no lleva "ESQUEMA".
const PI = Math.PI;
const PANEL = 'rgba(11,16,32,.92)';
const fit = (text: string, max: number) => Math.min(max, Math.floor(840 / (text.length * 0.62)));
const P1 = (text: string, at: any, o: any = {}) => ({ type: 'tag' as const, text, at, x: 48, y: 65.5, color: PANEL, size: fit(text, 46), ...o });
const P2 = (text: string, at: any, o: any = {}) => ({ type: 'tag' as const, text, at, x: 48, y: 70, color: PANEL, size: fit(text, 40), ...o });
const FUENTE = { type: 'tag' as const, text: 'FUENTES: FORMULA1.COM, RACEFANS, INFOBAE, LA NACIÓN', at: 0.2, x: 48, y: 73.9, color: 'rgba(11,16,32,.75)', size: 24 };

const ST = (kind: string, o: any = {}) => ({ type: 'stage', p: { kind, ...o } });
const ALP = { color: BLUE, accent: PINK, stripe: BLUED, helmet: WHITE };                 // mismo auto para Gasly y Colapinto
const RB = { color: '#eef1f6', accent: '#2346b8', stripe: '#16224f', helmet: '#f2c230', band: AMBER };   // rival genérico del cierre
const SILVER = { color: '#b9bec6', accent: '#2b2f35', stripe: '#1b1e23', helmet: '#e8e8e8' };
const FRANCO = { suit: BLUE, accent: PINK, helmet: WHITE };
const name = (text: string, bg: string, color = '#fff') => ({ text, w: 0.85, h: 0.21, bg, color, size: 0.66, weight: 900 });

export const BEATS: BeatSpec[] = [
  // 1. Mismo Alpine, misma pista: Gasly, puesto 10. Colapinto, puesto 12.  (dos autos iguales lanzados; la cámara retrocede delante)
  { id: 'b01', set: 'room', cam: { from: [0.8, 1.15, 4.3], to: [0.3, 1.4, 5.0], look: [0, -0.1, -0.6], lookTo: [0, 0.0, -0.6], fov: 46 }, keywords: ['Alpine', 'Colapinto', '10', '12'],
    actors: [
      ST('tarde', { speed: 9 }),
      { type: 'f1', pos: [-0.5, 0, 0.55], s: 0.55, p: { ...ALP, speed: 16 }, bob: 0.01 },
      { type: 'f1', pos: [0.55, 0, -0.45], s: 0.55, p: { ...ALP, speed: 16 } },
      { type: 'label', pos: [-0.5, 0.85, 0.55], at: 'Gasly', bob: 0.02, p: name('GASLY', BLUED) },
      { type: 'label', pos: [0.55, 0.85, -0.45], at: 'Colapinto', bob: 0.02, p: name('COLAPINTO', PINK, INK) },
    ],
    overlays: [P1('MISMO AUTO: ALPINE', 0), P2('GASLY 10°', '10', { x: 28 }), P2('COLAPINTO 12°', '12', { x: 66 })] },

  // 2. Medio segundo entre los dos, en la primera práctica de Qatar.  (sala de telemetría: el cronómetro marca la diferencia)
  { id: 'b02', set: 'room', cam: { from: [0.7, 1.5, 6.2], to: [-0.2, 1.4, 5.3], look: [0, 1.15, 0], fov: 46 }, keywords: ['segundo', 'práctica', 'Qatar'],
    actors: [
      ST('data'),
      { type: 'stopwatch', pos: [0, 1.4, -0.6], s: 0.95, p: { r: 0.85, text: '+0,535 S', showAt: 0.4 } },
      { type: 'f1', pos: [-0.5, 0, 1.3], s: 0.32, at: 'entre', p: ALP },
      { type: 'f1', pos: [0.5, 0, 1.0], s: 0.32, at: 'los', p: ALP },
      { type: 'ring', pos: [0, 0.04, -0.6], at: 'práctica', p: { r: 1.0, color: TEAL } },
    ],
    overlays: [P1('0,535 S ENTRE LOS DOS', 'segundo'), P2('PRÁCTICA 1 · GP DE QATAR · VIERNES 27/11', 'Qatar'), FUENTE] },

  // 3. Arriba quedó Antonelli, el campeón, y Colapinto terminó a más de dos segundos.  (torre de tiempos en la recta)
  { id: 'b03', set: 'room', cam: { from: [-0.9, 0.9, 6.2], to: [0.4, 1.35, 5.6], look: [0, 0.75, 0], lookTo: [0, 0.85, 0], fov: 46 }, keywords: ['Antonelli', 'Colapinto', 'segundos'],
    actors: [
      ST('tarde'),
      { type: 'timing', pos: [0.15, 2.2, -0.8], p: { w: 2.5, rh: 0.48, rows: [
        { pos: '1', name: 'ANTONELLI', at: 0.75 },
        { pos: '', name: '· · ·', dots: true, at: 2.0 },
        { pos: '12', name: 'COLAPINTO +2,192', hi: true, at: 2.5 }] } },
      { type: 'f1', pos: [-0.75, 0, 0.0], rot: [0, 0.5, 0], s: 0.42, at: 'Antonelli', p: SILVER },
      { type: 'ring', pos: [-0.75, 0.04, 0.0], at: 'campeón', p: { r: 0.55, color: AMBER } },
    ],
    overlays: [P1('1° ANTONELLI (MERCEDES) · 1:23.217', 'Antonelli'), P2('COLAPINTO A 2,192 S · 28 VUELTAS', 'segundos'), FUENTE] },

  // 4. Pero lo que pesa para el domingo es otra cosa: las gomas.  (calle de boxes: cae la goma gigante)
  { id: 'b04', set: 'room', cam: { from: [-0.9, 1.5, 6.2], to: [0.5, 1.6, 6.4], look: [-0.1, 0.55, 0], lookTo: [0.2, 0.55, 0], fov: 46 }, keywords: ['domingo', 'gomas'],
    actors: [
      ST('pit'),
      { type: 'f1', pos: [-0.9, 0, -1.6], rot: [0, 0.6, 0], s: 0.55, p: ALP },
      { type: 'pilot', pos: [-1.35, 0, -0.6], rot: [0, 0.5, 0], s: 0.7, p: { suit: BLUED, accent: PINK, pose: 'idle', bare: true, headset: true } },
      { type: 'racecard', pos: [1.0, 0, -1.2], s: 0.85, at: 'domingo', p: { top: 'DOMINGO', big: 'CARRERA', w: 1.0, h: 0.7, hi: true } },
      { type: 'tyre', pos: [-0.25, 0.62, 0.6], rot: [0, PI / 2 - 0.35, 0], at: 'gomas', p: { r: 0.6, w: 0.48, band: AMBER } },
      { type: 'tyreset', pos: [0.95, 0, 0.9], rot: [0, -0.4, 0], at: 'otra', p: { band: WHITE } },
    ],
    overlays: [P1('EL PROBLEMA DEL DOMINGO: LAS GOMAS', 'gomas'), FUENTE] },

  // 5. Pirelli puso un límite de 27 vueltas por juego de neumáticos.  (la goma de frente y el aro de 27 vueltas que se llena)
  { id: 'b05', set: 'room', cam: { from: [0.9, 1.3, 5.6], to: [-0.4, 1.5, 6.1], look: [0, 0.95, 0], fov: 46 }, keywords: ['Pirelli', '27', 'juego', 'neumáticos'],
    actors: [
      ST('data'),
      { type: 'tyre', pos: [0, 1.5, -0.2], rot: [0, PI / 2, 0], p: { r: 0.62, w: 0.55, band: '#e9edf3', roll: 0.6 } },
      { type: 'lapring', pos: [0, 1.5, -0.2], at: 'límite', p: { n: 27, r: 0.84, dur: 1.2 } },
      { type: 'label', pos: [0, 1.5, 0.1], at: '27', p: { text: '27', w: 0.6, h: 0.42, color: '#fff', size: 0.9, weight: 900 } },
      { type: 'tyreset', pos: [0.95, 0, 0.7], rot: [0, -0.4, 0], at: 'juego', p: { band: '#e9edf3' } },
    ],
    overlays: [P1('MÁXIMO 27 VUELTAS POR JUEGO', '27'), P2('REGLA DE PIRELLI', 'neumáticos'), FUENTE] },

  // 6. La carrera tiene 57, así que todos tienen que parar dos veces.  (picado sobre la calle de boxes: dos paradas)
  { id: 'b06', set: 'room', cam: { from: [0.8, 3.4, 6.6], to: [0.2, 3.0, 6.1], look: [0, -0.2, -0.6], lookTo: [0, -0.1, -0.8], fov: 46 }, keywords: ['carrera', '57', 'parar'],
    actors: [
      ST('pit'),
      { type: 'f1', pos: [0.0, 0, -3.4], s: 0.5, p: { ...ALP, speed: 0 }, move: { to: [0.0, 0, -0.9], at: 'así', dur: 1.6 } },
      { type: 'pitboard', pos: [-0.95, 0, -1.4], rot: [0, 0.25, 0], at: '57', p: { lines: [{ t: '57' }, { t: 'VUELTAS', c: TEAL }], w: 0.95, pole: 0.45 } },
      { type: 'tyreset', pos: [0.95, 0, -2.5], rot: [0, -0.3, 0], at: 'dos', p: { band: '#e9edf3', text: 'PARADA 1', bg: PINK } },
      { type: 'tyreset', pos: [0.95, 0, -0.4], rot: [0, -0.3, 0], at: 'veces', p: { band: '#e9edf3', text: 'PARADA 2', bg: PINK } },
    ],
    overlays: [P1('CARRERA: 57 VUELTAS', '57'), P2('= 2 PARADAS OBLIGADAS', 'dos'), FUENTE] },

  // 7. Y en la práctica el desgaste fue mucho más alto de lo esperado, según el ingeniero de Hamilton.  (medidor que pasa la marca)
  { id: 'b07', set: 'room', cam: { from: [-0.7, 1.35, 6.2], to: [0.4, 1.5, 5.7], look: [0, 0.75, 0], fov: 46 }, keywords: ['desgaste', 'esperado', 'Hamilton'],
    actors: [
      ST('data'),
      { type: 'wear', pos: [-0.05, 0, -0.3], p: { h: 2.0, exp: 0.45, val: 0.9, dur: 1.7, delay: 1.19 } },
      { type: 'tyre', pos: [0.95, 0.55, 0.1], rot: [0, PI / 2 - 0.5, 0], out: 'según', p: { r: 0.5, w: 0.4, r: 0.6, w: 0.45, band: AMBER, wear: 1, wearAt: 1.3, wearDur: 1.6 } },
      { type: 'pilot', pos: [0.65, 0, 0.3], rot: [0, -0.5, 0], s: 0.7, at: 'según', p: { suit: '#2a2f3a', accent: RED, pose: 'ear', bare: true, headset: true, skin: '#c99272', hair: '#3a3a3a' } },
    ],
    overlays: [P1('DESGASTE MUCHO MÁS ALTO DE LO ESPERADO', 'esperado'), P2('SEGÚN EL INGENIERO DE HAMILTON (RADIO)', 'Hamilton'), FUENTE] },

  // 8. Colapinto ya lo había avisado: «Es donde más se muestran nuestras debilidades».  (sala de prensa, micrófonos)
  { id: 'b08', set: 'room', cam: { from: [0.6, 1.6, 5.4], to: [-0.1, 1.55, 4.7], look: [0, 0.85, 0], fov: 46 }, keywords: ['Colapinto', 'avisado', 'muestran', 'debilidades'],
    actors: [
      ST('press'),
      { type: 'pilot', pos: [0, 0, -0.5], s: 0.85, out: 'Es', p: { ...FRANCO, pose: 'idle', bare: true, skin: '#e0ad86', hair: '#3a2416' } },
      { type: 'pilot', pos: [0, 0, -0.5], s: 0.85, at: 'Es', enter: 'none', p: { ...FRANCO, pose: 'talk', bare: true, skin: '#e0ad86', hair: '#3a2416' } },
      { type: 'box', pos: [0, 0.45, 0.2], p: { size: [1.9, 0.9, 0.5], color: '#1a2038' } },
      { type: 'box', pos: [0, 0.91, 0.2], p: { size: [1.92, 0.04, 0.52], color: PINK, glow: true, ei: 0.4 } },
      ...[-0.6, -0.2, 0.2, 0.6].map((x, i) => ({ type: 'mic', pos: [x, 0.93, 0.25] as [number, number, number], rot: [0, -x * 0.5, 0] as [number, number, number], at: 0.25 + i * 0.35, p: { h: 0.38 } })),
      { type: 'label', pos: [0, 0.72, 0.47], at: 'avisado', p: { text: 'COLAPINTO', w: 1.3, h: 0.28, bg: BLUE, color: '#fff', size: 0.66, weight: 900 } },
    ],
    overlays: [P1('«ES DONDE MÁS SE MUESTRAN NUESTRAS DEBILIDADES»', 'debilidades'), P2('FRANCO COLAPINTO, ANTES DE LA PRÁCTICA', -0.6), FUENTE] },

  // 9. Encima, en Qatar nunca sumó un punto.  (al ras de la pista: las dos tarjetas en cero)
  { id: 'b09', set: 'room', cam: { from: [-1.3, 0.7, 5.4], to: [-0.7, 0.95, 4.8], look: [0.1, 0.6, -0.4], lookTo: [0.2, 0.65, -0.5], fov: 46 }, keywords: ['Qatar', 'nunca', 'punto'],
    actors: [
      ST('tarde', { speed: 3 }),
      { type: 'racecard', pos: [-0.55, 0, -0.6], s: 0.95, at: 'Qatar', p: { top: 'QATAR 2024', big: '0 PTS', color: '#3a1a22', w: 1.05, h: 0.85, bigColor: '#ff6a5a' } },
      { type: 'racecard', pos: [0.75, 0, -0.4], s: 0.95, at: 'nunca', p: { top: 'QATAR 2025', big: '0 PTS', color: '#3a1a22', w: 1.05, h: 0.85, bigColor: '#ff6a5a' } },
      { type: 'f1', pos: [0.1, 0, 0.6], s: 0.4, p: { ...ALP, speed: 4 } },
    ],
    overlays: [P1('QATAR 2024: ABANDONO · 0 PUNTOS', 'Qatar'), P2('QATAR 2025: 14° · 0 PUNTOS', 'punto'), FUENTE] },

  // 10. Y hay algo en juego: es 12° en el campeonato, con 35 puntos.  (se apilan 35 fichas, una por punto)
  { id: 'b10', set: 'room', cam: { from: [1.1, 1.1, 5.8], to: [-0.3, 1.4, 6.0], look: [0, 0.65, 0], lookTo: [0, 0.75, 0], fov: 46 }, keywords: ['12', 'campeonato', '35'],
    actors: [
      ST('data'),
      { type: 'stack', pos: [0.45, 0, -0.1], at: 'campeonato', enter: 'none', p: { n: 35, every: 0.033, top: '35', topBg: BLUE } },
      { type: 'pilot', pos: [-0.6, 0, -0.2], rot: [0, 0.35, 0], s: 0.78, p: { ...FRANCO, pose: 'idle' } },
      { type: 'racecard', pos: [-0.75, 0, -1.4], s: 0.85, at: '12', p: { top: 'CAMPEONATO', big: '12°', w: 1.1, h: 0.8, hi: true } },
    ],
    overlays: [P1('CAMPEONATO: COLAPINTO 12° · 35 PUNTOS', '35'), FUENTE] },

  // 11. Lindblad, el 11°, tiene 38: tres más.  (las dos pilas una al lado de la otra; las 3 fichas de más se encienden)
  { id: 'b11', set: 'room', cam: { from: [-0.9, 1.7, 5.6], to: [0.5, 1.6, 5.8], look: [0, 0.75, 0], fov: 46 }, keywords: ['Lindblad', '38', 'tres'],
    actors: [
      ST('pit'),
      { type: 'stack', pos: [-0.55, 0, 0], p: { n: 35, every: 0.0001, top: '35', sub: 'COLAPINTO 12°', topBg: BLUE } },
      { type: 'stack', pos: [0.55, 0, 0], at: 'Lindblad', enter: 'none', p: { n: 38, every: 0.045, color: '#eef1f6', edge: '#2346b8', hiFrom: 35, hiAt: 2.98, top: '38', sub: 'LINDBLAD 11°', topBg: '#2346b8' } },
      { type: 'label', pos: [0.0, 1.15, 0.45], at: 'tres', p: { text: '+3', w: 0.5, h: 0.32, bg: AMBER, color: INK, size: 0.8, weight: 900 } },
    ],
    overlays: [P1('LINDBLAD 11° · 38 PUNTOS', 'Lindblad'), P2('+3', 'tres', { size: 44 }), FUENTE] },

  // 12. Clasifica el sábado a las tres de la tarde, hora argentina, y corre el domingo a la una.  (dos relojes y dos tarjetas)
  { id: 'b12', set: 'room', cam: { from: [0.3, 1.2, 6.0], to: [-0.3, 1.35, 5.1], look: [0, 1.1, -0.6], fov: 46 }, keywords: ['Clasifica', 'tres', 'argentina', 'domingo'],
    actors: [
      ST('press'),
      { type: 'clock', pos: [-0.75, 1.75, -2.0], p: { h: 3, m: 0, r: 0.42 } },
      { type: 'clock', pos: [0.75, 1.75, -2.0], at: 'sábado', p: { h: 1, m: 0, r: 0.42, rim: PINK } },
      { type: 'racecard', pos: [-0.75, 0, -1.2], s: 0.8, at: 'tres', p: { top: 'SÁBADO 28', big: '15:00', w: 1.1, h: 0.8 } },
      { type: 'racecard', pos: [0.75, 0, -1.2], s: 0.8, at: 'domingo', p: { top: 'DOMINGO 29', big: '13:00', w: 1.1, h: 0.8, hi: true } },
      { type: 'f1', pos: [-2.6, 0, 0.9], rot: [0, PI / 2, 0], s: 0.42, p: { ...ALP, speed: 10 }, move: { to: [2.8, 0, 0.9], at: 'Clasifica', dur: 2.4 } },
    ],
    overlays: [P1('CLASIFICACIÓN: SÁBADO 28 · 15:00 (ARG)', 'tarde'), P2('CARRERA: DOMINGO 29 · 13:00 (ARG)', 'una'), FUENTE] },

  // 13. ¿Quién termina adelante el domingo: Colapinto o Lindblad?  (otros dos autos en paralelo, ahora de distinto color)
  { id: 'b13', set: 'room', cam: { from: [-0.8, 1.15, 4.3], to: [0.1, 1.4, 5.0], look: [0, -0.1, -0.6], lookTo: [0, 0.0, -0.6], fov: 46 }, keywords: ['adelante', 'Colapinto', 'Lindblad'],
    actors: [
      ST('tarde', { speed: 9 }),
      { type: 'f1', pos: [-0.62, 0, 0.0], s: 0.55, p: { ...ALP, speed: 16 }, move: { to: [-0.62, 0, 0.35], at: 'domingo', dur: 1.2 } },
      { type: 'f1', pos: [0.62, 0, 0.3], s: 0.55, p: { ...RB, speed: 16 }, move: { to: [0.62, 0, 0.0], at: 'domingo', dur: 1.2 } },
      { type: 'label', pos: [-0.62, 0.85, 0.2], at: 'Colapinto', bob: 0.02, p: name('COLAPINTO', PINK, INK) },
      { type: 'label', pos: [0.62, 0.85, 0.15], at: 'Lindblad', bob: 0.02, p: name('LINDBLAD', '#2346b8') },
    ],
    overlays: [P1('¿QUIÉN TERMINA ADELANTE?', 'adelante'), P2('COLAPINTO O LINDBLAD', 'Lindblad')] },
];
