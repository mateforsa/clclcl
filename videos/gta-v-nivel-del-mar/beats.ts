import type { BeatSpec } from '../../src/Beat';

// Video suelto (no es serie). Look propio: maqueta costera en bloque, cortada como una porción de torta, a la hora azul.
// El agua es un volumen translúcido que sube y baja de forma continua (curvas por tramos con easing, nunca saltos).
// Ciudad genérica low-poly: muelle con grúas, barco, palmeras, costanera, canales. Sin logos ni nada del juego.
// Porcentajes: tablero de 100 cuadros a escala (cada cuadro = 1% de la ciudad). El agua sobre la maqueta es un esquema:
// lleva «ESQUEMA, NO A ESCALA». Textos 2D: los de «## Placas por plano» (tags, sin pill, borde inferior <= 1450 px).
// Carteles 3D solo con datos del guion: DATOS ORIGINALES, 2013 y el contador de año que llega a 2300.
// Se sacó el plano 4 (helicóptero) porque la toma pasaba de 60 s.
const PI = Math.PI;
const PANEL = 'rgba(7,19,28,.92)';
const fit = (text: string, max: number) => Math.min(max, Math.floor(780 / (text.length * 0.64)));
const P1 = (text: string, at: any, o: any = {}) => ({ type: 'tag' as const, text, at, x: 46, y: 63.5, color: PANEL, size: fit(text, 46), ...o });
const P2 = (text: string, at: any, o: any = {}) => ({ type: 'tag' as const, text, at, x: 46, y: 68, color: PANEL, size: fit(text, 40), ...o });
const SMALL = (text: string, y: number, at: any = 0.2) => ({ type: 'tag' as const, text, at, x: 46, y, color: 'rgba(7,19,28,.78)', size: 18 });
// at negativo grande = medio segundo antes del inicio del plano: así el pop ya terminó en el cuadro 0
const SIM = (dur: number) => ({ type: 'tag' as const, text: 'SIMULACIÓN', at: -(dur + 0.5), x: 50, y: 23, color: 'rgba(7,19,28,.88)', size: 36 });
const F1 = SMALL('FUENTES: INFOBAE (27/11) Y XATAKA (25/11/2026)', 72.2);
const F2 = (extra = '') => SMALL('SIMULACIÓN SOBRE EL MAPA DE UN JUEGO, NO PRONÓSTICO' + extra, 74.0);
const ESQ = ' · ESQUEMA, NO A ESCALA';
const LEG = { type: 'tag' as const, text: 'CADA CUADRO = 1% DE LA CIUDAD', at: 0.3, x: 46, y: 59, color: 'rgba(11,70,80,.9)', size: 30 };
const W = { type: 'world', p: { kind: 'dusk' } };
const COAT = { shirt: '#e9eef0', pants: '#2a3440', skin: '#f2c39b' };

export const BEATS: BeatSpec[] = [
  // 1. Año 2300. Se inunda el puerto de Los Santos, la ciudad de GTA V.
  { id: 'b01', set: 'room', cam: { from: [0.8, 3.3, 7.4], to: [0.3, 3.0, 6.6], look: [0, 1.05, 0], lookTo: [0, 1.0, 0.1], fov: 44 }, keywords: ['2300.', 'puerto', 'GTA V.'],
    actors: [W,
      { type: 'coast', pos: [0, 0.64, 0], p: { lv: [[0, 0], [1.0, 0.02], [4.8, 0.2]], counter: { from: 2026, to: 2300, at: 0, dur: 1.6 } } },
    ],
    overlays: [SIM(7.007), P1('AÑO 2300', 1.6, { size: 46 }), SMALL('ESQUEMA, NO A ESCALA', 74.0)] },

  // 2. Es una simulación de dos científicos alemanes sobre el mapa del juego, que imita a Los Ángeles.
  { id: 'b02', set: 'room', cam: { from: [0.6, 2.5, 4.6], to: [0.1, 2.3, 4.0], look: [0, 1.15, -0.3], fov: 44 }, keywords: ['simulación', 'científicos', 'alemanes', 'juego,', 'Ángeles.'],
    actors: [{ type: 'world', p: { kind: 'lab' } },
      { type: 'table', pos: [0, 0, -0.05], p: { w: 2.0, d: 1.6, h: 0.85 } },
      { type: 'coast', pos: [0, 0.85 + 0.62 * 0.34, -0.05], s: 0.34, p: { lv: [[0, 0], [5.5, 0.18]], gauge: false } },
      { type: 'faceless', pos: [-0.8, 0, -1.25], rot: [0, 0.3, 0], p: { ...COAT, hair: '#3a2a1a', pose: 'point' } },
      { type: 'faceless', pos: [0.8, 0, -1.25], rot: [0, -0.3, 0], p: { ...COAT, hair: '#b9a27a', pose: 'idle', phase: 1.3 } },
    ],
    overlays: [SIM(5.585), P2('PAUL NÖRENBERG Y HUGUES LANTUIT · UNIVERSIDAD DE POTSDAM', 'alemanes'), P1('LOS SANTOS (GTA V) IMITA A LOS ÁNGELES', 'mapa'), F1, F2()] },

  // 3. Rockstar se negó a darles los datos originales, por derechos de publicación. Usaron el mapa de un fan.
  { id: 'b03', set: 'room', cam: { from: [0.2, 2.1, 6.4], to: [0.05, 1.95, 5.8], look: [0.1, 1.05, 0], fov: 44 }, keywords: ['Rockstar', 'darles', 'originales,', 'derechos', 'publicación.', 'fan.'],
    actors: [{ type: 'world', p: { kind: 'studio' } },
      { type: 'safe', pos: [-0.68, 0, -0.2], rot: [0, 0.25, 0] },
      { type: 'cross', pos: [-0.55, 0.62, 0.48], rot: [0, 0.25, 0], s: 0.5, at: 'negó' },
      { type: 'table', pos: [0.64, 0, 0.12], rot: [0, -0.35, 0], p: { w: 1.2, d: 0.6, h: 1.0 } },
      { type: 'notebook', pos: [0.42, 1.0, -0.013], rot: [0, -0.35 + PI, 0] },
      { type: 'faceless', pos: [0.594, 0, -0.483], rot: [0, -0.35, 0], p: { shirt: '#ff8a3d', pants: '#2a3440', skin: '#c98d62', hair: '#15102b', cap: '#20303a', pose: 'type' } },
      { type: 'coast', pos: [0.96, 1.0 + 0.62 * 0.12, 0.26], rot: [0, -0.35, 0], s: 0.12, at: 'mapa', enter: 'grow', p: { gauge: false } },
    ],
    overlays: [P1('ROCKSTAR SE NEGÓ A DAR LOS DATOS ORIGINALES', 'negó'), P2('MAPA 3D DE UN FAN (SKETCHFAB)', 'Usaron'), F1, F2()] },

  // 4. Y probaron dos escenarios del IPCC, el panel de clima de la ONU.
  { id: 'b04', set: 'room', cam: { from: [0.35, 3.0, 6.4], to: [-0.1, 2.7, 5.7], look: [0, 0.8, 0], fov: 44 }, keywords: ['escenarios', 'IPCC,', 'ONU.'],
    actors: [W,
      { type: 'pedestal', pos: [-0.72, 0, 0], p: { w: 1.26, d: 1.56, h: 0.55, rim: '#ff6a4a' } },
      { type: 'pedestal', pos: [0.72, 0, 0], p: { w: 1.26, d: 1.56, h: 0.55, rim: '#46d17a' } },
      { type: 'coast', pos: [-0.72, 0.55 + 0.62 * 0.36, 0], s: 0.36, p: { lv: [[0, 0], [1.0, 0], [5.6, 0.24]], gauge: false } },
      { type: 'coast', pos: [0.72, 0.55 + 0.62 * 0.36, 0], s: 0.36, p: { lv: [[0, 0], [1.0, 0], [5.6, 0.06]], gauge: false } },
    ],
    overlays: [P2('2 ESCENARIOS', 'dos'), P1('IPCC: EL PANEL DE CLIMA DE LA ONU', 'IPCC,'), F1, F2(ESQ)] },

  // 5. Con emisiones altas y marejada, en 2300 se inunda el 5,1% de la ciudad.
  { id: 'b05', set: 'room', cam: { from: [0.45, 4.9, 6.4], to: [0.1, 4.6, 5.8], look: [0, -0.15, 0.0], fov: 44 }, keywords: ['emisiones', 'marejada,', '5,1%', 'ciudad.'],
    actors: [{ type: 'world', p: { kind: 'deep' } },
      { type: 'pedestal', pos: [0, 0, -0.25], p: { w: 3.05, d: 3.6, h: 0.3, rim: '#ff6a4a' } },
      { type: 'tiles', pos: [0, 0.38, 0], rot: [0, PI, 0], p: { flip: true,  n: 5.1, at: 3.84, dur: 1.2, storm: true } },
    ],
    overlays: [LEG, P1('EMISIONES ALTAS + MAREJADA', 'emisiones', { out: 5.6 }), P1('MAR A 5,18 M · 2,25 KM²', 5.6), P2('2300: 5,1% BAJO EL AGUA', '5,1%'), F1, F2()] },

  // 6. Se corta el puerto. También quedan afectadas la energía y las aguas residuales.
  { id: 'b06', set: 'room', cam: { from: [-1.5, 3.2, 5.1], to: [-0.85, 3.0, 4.7], look: [-0.8, 0.98, 0.0], lookTo: [-0.7, 0.98, -0.3], fov: 44 }, keywords: ['corta', 'puerto.', 'energía', 'residuales.'],
    actors: [W,
      { type: 'coast', pos: [0, 0.64, 0], p: { infra: true, lv: [[0, 0.1], [0.4, 0.11], [4.9, 0.24]],
        marks: [{ kind: 'pin', at: 0.67, pos: [-1.0, 0.6, 0.62] }, { kind: 'pin', at: 2.84, pos: [-1.22, 0.62, -0.3] }, { kind: 'pin', at: 3.66, pos: [-0.62, 0.22, -0.32] }] } },
    ],
    overlays: [P1('2300: PUERTO FUERA DE SERVICIO', 'puerto.', { out: 'También' }), P2('TAMBIÉN: ENERGÍA Y AGUAS RESIDUALES', 'También'), F1, F2(ESQ)] },

  // 7. Si las emisiones bajan fuerte, se inunda el 2,2%, sin tocar ninguna infraestructura importante.
  { id: 'b07', set: 'room', cam: { from: [-0.5, 4.6, 6.0], to: [-0.1, 4.9, 6.5], look: [0, -0.15, 0.0], lookTo: [0, -0.15, -0.1], fov: 44 }, keywords: ['bajan', '2,2%,', 'infraestructura'],
    actors: [{ type: 'world', p: { kind: 'deep' } },
      { type: 'pedestal', pos: [0, 0, -0.25], p: { w: 3.05, d: 3.6, h: 0.3, rim: '#46d17a' } },
      { type: 'tiles', pos: [0, 0.38, 0], rot: [0, PI, 0], p: { flip: true,  n: 2.2, at: 2.08, dur: 0.9, infra: [12, 15, 17], okAt: 4.71 } },
    ],
    overlays: [LEG, P1('EMISIONES BAJAN: 2,2%', '2,2%,'), P2('SIN INFRAESTRUCTURA IMPORTANTE AFECTADA', 'importante.'), F1, F2()] },

  // 8. Y en Vespucci, la playa del juego, quedan expuestos los mismos canales que un estudio de 2013 marcó en Los Ángeles.
  { id: 'b08', set: 'room', cam: { from: [0.55, 2.6, 5.0], to: [0.1, 2.4, 4.4], look: [0, 0.9, -0.4], fov: 44 }, keywords: ['Vespucci,', 'expuestos', 'canales', '2013'],
    actors: [W,
      { type: 'canals', pos: [0, 0.64, 0], p: { lv: [[0, 0], [2.5, 0.02], [4.2, 0.08]], hlAt: 3.77 } },
      { type: 'study', pos: [0, 1.3, -2.0], at: 'estudio', p: { leg: 1.4, hlAt: 5.02 } },
    ],
    overlays: [P1('VESPUCCI = VENICE BEACH', 'Vespucci,'), P2('MISMOS CANALES QUE UN ESTUDIO DE 2013', '2013'), F1, F2(ESQ)] },

  // 9. Los autores avisan que no es una predicción: el mapa no distingue edificios ni terraplenes.
  { id: 'b09', set: 'room', cam: { from: [0.95, 4.0, 5.6], to: [0.4, 3.7, 5.0], look: [0, 0.9, 0], fov: 44 }, keywords: ['predicción:', 'edificios', 'terraplenes.'],
    actors: [W,
      { type: 'coast', pos: [0, 0.64, 0], p: { buildings: 'ghost', ghostAt: 4.24, leveeAt: 5.16, ship: false, lv: [[0, 0.05], [6.2, 0.18]] } },
    ],
    overlays: [P1('NO ES UNA PREDICCIÓN', 'predicción:'), P2('EL MAPA NO DISTINGUE EDIFICIOS NI TERRAPLENES', 'terraplenes.'), F1, F2(ESQ)] },

  // 10. Mandáselo al que todavía pasea por Los Santos.
  { id: 'b10', set: 'room', cam: { from: [-0.3, 2.6, 3.6], to: [0.7, 2.5, 3.4], look: [0, 1.25, 0], lookTo: [0.7, 1.2, 0], fov: 44 }, keywords: ['Mandáselo', 'Santos.'],
    actors: [W,
      { type: 'coast', pos: [0, 0.64, 0], p: { lv: [[0, 0.075], [1.4, 0.0]], car: { x0: -0.25, x1: 1.45, at: 0.5, dur: 2.7 } } },
    ],
    overlays: [P1('MANDÁSELO AL QUE PASEA POR LOS SANTOS', 'Mandáselo'), SMALL('ESQUEMA, NO A ESCALA', 74.0)] },
];
