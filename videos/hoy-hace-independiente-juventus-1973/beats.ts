import type { BeatSpec } from '../../src/Beat';
import timing from './timing.json';

// Efeméride suelta (sin "parte N"). Look: el Olímpico de Roma de noche en 1973 con tonos de TV vieja, y un living con velador
// para el VHS (props.tsx). Imagen que abre y cierra: el VHS negro con el papel en el lomo (planos 1 y 12).
// Textos 2D = solo los de "## Placas por plano" (tags, sin pill), borde inferior <= 1450 px; fuentes en planos 3 a 12;
// RECREACIÓN en la jugada (planos 6 a 8). Carteles 3D sin datos nuevos: el papel del lomo, BOCHINI/BERTONI/DINO ZOFF, RAI,
// IDA/VUELTA, "?" y "€".
const PI = Math.PI;
const fit = (text: string, max: number, px = 820) => Math.min(max, Math.floor(px / (text.length * 0.64)));
const P1 = (text: string, at: any, o: any = {}) => ({ type: 'tag' as const, text, at, x: 46, y: 63.5, color: 'rgba(200,16,46,.94)', size: fit(text, 46), ...o });
const P2 = (text: string, at: any, o: any = {}) => ({ type: 'tag' as const, text, at, x: 46, y: 68, color: 'rgba(11,13,20,.92)', size: fit(text, 40), ...o });
const SMALL = (text: string, y = 73.2, at: any = 0) => ({ type: 'tag' as const, text, at, x: 46, y, color: 'rgba(11,13,20,.8)', size: 20 });
const FU = SMALL('FUENTES: LA NACIÓN E INFOBAE (28/11/2023)');
const FUR = SMALL('RECREACIÓN · FUENTES: LA NACIÓN E INFOBAE (28/11/2023)');

const B = (timing as any).beats as { id: string; start: number; end: number; words: { w: string; s: number; e: number }[] }[];
const DUR = (id: string) => { const b = B.find((x) => x.id === id)!; return b.end - b.start; };
/** segundos desde el inicio del plano hasta la palabra EXACTA `word` (n-ésima aparición) */
const W = (id: string, word: string, nth = 1): number => {
  const b = B.find((x) => x.id === id)!; let k = nth;
  for (const w of b.words) if (w.w === word && --k === 0) return w.s - b.start;
  throw new Error(`[${id}] no está "${word}"`);
};
/** parábola de la pelota de a (t0) a b (t1) con altura máxima `top`: devuelve keyframes [[t,x,y,z]] */
const arc = (t0: number, t1: number, a: number[], b: number[], top: number, n = 14) => Array.from({ length: n + 1 }, (_, i) => {
  const u = i / n; const y0 = a[1] + (b[1] - a[1]) * u; return [t0 + (t1 - t0) * u, a[0] + (b[0] - a[0]) * u, y0 + 4 * (top - Math.max(a[1], b[1])) * u * (1 - u) + 0, a[2] + (b[2] - a[2]) * u]; });

const LIV = (o: any = {}) => ({ type: 'living', p: o });
const EST = (o: any = {}) => ({ type: 'stadium', p: o });

// tiempos internos
const K6 = W('b06', 'tira') + 0.22;          // patada del penal
const K8 = W('b08', 'pica.') - 0.12;         // la picada
const tV = W('b12', 'VHS');                  // el casete entra
const tG = W('b12', 'golazo');               // la tele se prende

export const BEATS: BeatSpec[] = [
  // 1. Un VHS negro llega por correo desde Italia. En el lomo: Juventus contra Independiente.
  { id: 'b01', set: 'room', cam: { from: [0.45, 2.9, 2.2], to: [0.4, 2.45, 1.5], look: [0.45, -0.3, -1.75], lookTo: [0.45, -0.35, -1.6], fov: 44, shift: 0 }, keywords: ['VHS', 'Italia.', 'Juventus'],
    actors: [LIV({ door: true, mat: true, lampX: -2.2 }),
      { type: 'sobre', pos: [-0.92, 0.052, -1.3], rot: [0, 0.3, 0], s: 0.55, p: {} },
      { type: 'cassette', pos: [0, 0, 0], p: { path: [[0, 0.62, 0.052, -2.1], [W('b01', 'correo'), 0.56, 0.052, -1.95], [W('b01', 'lomo:') + 0.4, 0.5, 0.052, -1.85]] } },
      { type: 'aro', pos: [0.5, 0, -1.85], at: 'lomo:', p: { r: 0.95 } },
    ],
    overlays: [P1('DESDE ITALIA', 'Italia.')] },

  // 2. Adentro hay un gol perdido desde 1973.
  { id: 'b02', set: 'room', cam: { from: [0.45, 2.5, 4.7], to: [0.15, 2.2, 3.95], look: [0, 0.3, -0.7], fov: 44, shift: 0 }, keywords: ['gol', '1973.'],
    actors: [LIV({ lampX: -2.1 }),
      { type: 'mesa', pos: [0, 0, 0.2], p: { w: 1.9, d: 1.1, h: 0.5 } },
      { type: 'cassette', pos: [0, 0.525, 0.25], p: { reels: 2.2 } },
      { type: 'tv', pos: [0, 0.42, -1.3], p: { kind: 'static', on: [[0, 0.55], [W('b02', 'perdido'), 0.55], [W('b02', 'perdido') + 0.5, 0.3]] } },
      { type: 'sign', pos: [0.98, 0.95, -0.95], at: 'perdido', p: { text: '?', w: 0.38, h: 0.38, bg: '#1a1c24', color: '#e8c060', size: 0.8 } },
    ],
    overlays: [P1('EL GOL PERDIDO', 'gol'), P2('1973', '1973.')] },

  // 3. Roma, 28 de noviembre. Hoy hace 53 años.
  { id: 'b03', set: 'void', cam: { from: [1.0, 4.6, 9.0], to: [0.3, 3.9, 7.6], look: [0, 0.2, -1.5], fov: 44, shift: 0 }, keywords: ['Roma,', '53'],
    actors: [EST({ center: 0 }),
      ...[[-1.2, 1.6], [0.8, 2.6], [-0.4, -1.3], [1.5, -0.6], [-2.2, -2.8], [2.1, 1.0]].map(([x, z], i) => ({ type: 'player', pos: [x, 0, z] as any, rot: [0, i % 2 ? PI : 0, 0] as any, s: 0.85,
        p: { kit: i % 2 ? 'juv' : 'ind', pose: 'idle', phase: i } })),
      { type: 'ball', pos: [0, 0, 0], p: { path: [[0, 0.2, 0.13, 0.1], [4.4, -0.5, 0.13, 0.5]], spin: 2 } },
    ],
    overlays: [P1('ROMA · 28/11/1973', 'Roma,'), P2('HOY HACE 53 AÑOS', '53'), FU] },

  // 4. El Ajax, campeón de Europa, no quiso jugar la final contra Independiente.
  { id: 'b04', set: 'void', cam: { from: [-0.5, 2.3, 7.0], to: [0.1, 2.1, 6.2], look: [0, 1.0, 0], fov: 44, shift: 0 }, keywords: ['Ajax,', 'Europa,', 'quiso'],
    actors: [EST({ center: 0.6 }),
      { type: 'player', pos: [-0.95, 0, 0.2], rot: [0, 0.35, 0], p: { kit: 'ind', pose: 'idle' } },
      { type: 'player', pos: [0.95, 0, 0.2], rot: [0, PI / 2, 0], move: { to: [2.9, 0, 0.0], at: 'quiso', dur: 2.2 }, p: { kit: 'ajax', poses: [[0, 'idle'], [W('b04', 'quiso') - 0.2, 'walk']], phase: 1 } },
      { type: 'cup', pos: [0.95, 0, -0.75], at: 'campeón', p: {} },
      { type: 'cruz', pos: [0.25, 1.0, 0.5], at: 'no', s: 0.8, p: {} },
    ],
    overlays: [P1('AJAX: CAMPEÓN DE EUROPA', 'Europa,', { out: 'quiso' }), P1('NO QUISO JUGAR', 'quiso'), FU] },

  // 5. Lo reemplazó el subcampeón, Juventus, con una condición: un solo partido, y en Italia.
  { id: 'b05', set: 'void', cam: { from: [0.5, 2.3, 6.9], to: [-0.1, 2.1, 6.1], look: [0, 0.9, 0], fov: 44, shift: 0 }, keywords: ['subcampeón,', 'condición:', 'partido,'],
    actors: [EST({ center: 0.6 }),
      { type: 'player', pos: [-1.15, 0, 0.2], rot: [0, 0.35, 0], p: { kit: 'ind', pose: 'idle' } },
      { type: 'player', pos: [2.7, 0, 0.0], rot: [0, -PI / 2, 0], move: { to: [1.15, 0, 0.2], at: 0, dur: 1.9 }, p: { kit: 'juv', poses: [[0, 'walk'], [1.7, 'idle']], phase: 2 } },
      { type: 'idavuelta', pos: [0, 1.25, 0.2], at: 'condición:', p: { fallAt: W('b05', 'solo'), drop: 1.12 } },
    ],
    overlays: [P1('JUVENTUS, SUBCAMPEÓN', 'subcampeón,', { out: 'partido,' }), P1('UN SOLO PARTIDO, EN ITALIA', 'partido,'), P2('(ERA IDA Y VUELTA)', 'Italia.'), FU] },

  // 6. En el segundo tiempo, Juventus tira un penal por arriba del travesaño.
  { id: 'b06', set: 'void', cam: { from: [2.3, 2.1, 4.7], to: [1.8, 1.9, 4.0], look: [0, 0.85, -1.4], fov: 44, shift: 0 }, keywords: ['segundo', 'penal', 'travesaño.'],
    actors: [EST({ box: -2.0 }),
      { type: 'goal', pos: [0, 0, -2.0], p: { w: 2.8, h: 1.15, d: 0.8 } },
      { type: 'player', pos: [0, 0, -1.8], p: { kit: 'gk', poses: [[0, 'gk'], [K6 + 0.05, 'reach'], [K6 + 1.0, 'sad']] } },
      { type: 'player', pos: [0.7, 0, 0.9], rot: [0, PI + 0.3, 0], move: { to: [0.14, 0, -0.18], at: 0.4, dur: K6 - 0.4 }, p: { kit: 'juv', poses: [[0, 'idle'], [0.35, 'run'], [K6 - 0.15, 'kick'], [K6 + 0.45, 'sad']] } },
      { type: 'ball', pos: [0, 0, 0], p: { path: [[0, 0, 0.13, -0.55], [K6, 0, 0.13, -0.55], ...arc(K6, K6 + 1.0, [0, 0.13, -0.55], [0.45, 1.75, -3.6], 2.0).slice(1)], spin: 6 } },
    ],
    overlays: [P1('PENAL DE CUCCUREDDU: AFUERA', 'penal'), FUR] },

  // 7. Faltan diez minutos. Bochini y Bertoni, dos pibes, hacen dos paredes seguidas.
  { id: 'b07', set: 'void', cam: { from: [0.4, 5.0, 6.2], to: [0.1, 4.6, 5.3], look: [0, 0.0, -2.2], lookTo: [0, 0.0, -2.6], fov: 44, shift: 0 }, keywords: ['Bochini', 'Bertoni,', 'paredes'],
    actors: [EST({}),
      { type: 'paredes', pos: [0, 0, 0], p: { t0: 1.2, dur: 4.4, passes: [0.6, 1.4, 2.2, 3.0], z0: 2.2, z1: -1.6, la: W('b07', 'Bochini'), lb: W('b07', 'Bertoni,') } },
      { type: 'player', pos: [1.55, 0, -0.1], rot: [0, 0, 0], p: { kit: 'juv', poses: [[0, 'idle'], [3.2, 'sad']], phase: 1 } },
      { type: 'player', pos: [-1.65, 0, -0.9], rot: [0, 0.3, 0], p: { kit: 'juv', poses: [[0, 'idle'], [4.0, 'sad']], phase: 2.5 } },
      { type: 'player', pos: [0.05, 0, -3.0], p: { kit: 'juv', pose: 'gk', phase: 0.7 } },
    ],
    overlays: [P1('FALTAN 10 MINUTOS', 'Faltan'), FUR] },

  // 8. Bochini queda solo contra el arquero y se la pica. Primera Intercontinental del club.
  { id: 'b08', set: 'void', cam: { from: [1.2, 3.4, 7.2], to: [0.9, 3.1, 6.4], look: [0.35, 0.7, -0.8], fov: 44, shift: 0 }, keywords: ['solo', 'pica.', 'Intercontinental'],
    actors: [EST({ box: -2.0, cheer: 1, cheerAt: K8 + 1.0 }),
      { type: 'goal', pos: [0, 0, -2.0], p: { w: 2.8, h: 1.15, d: 0.8 } },
      { type: 'player', pos: [0, 0, -0.35], p: { kit: 'zoff', poses: [[0, 'gk'], [K8 + 0.05, 'reach'], [K8 + 1.0, 'sad']], label: 'DINO ZOFF', labelAt: W('b08', 'arquero'), labelOff: 1.35, labelY: 2.35, labelRot: -0.1 } },
      { type: 'player', pos: [0.75, 0, 2.5], rot: [0, PI, 0], move: { to: [0.6, 0, 1.25], at: 0, dur: K8 }, p: { kit: 'ind', poses: [[0, 'run'], [K8 - 0.15, 'kick'], [K8 + 0.5, 'idle'], [K8 + 1.0, 'cheer']] } },
      { type: 'ball', pos: [0, 0, 0], p: { path: [[0, 0.8, 0.13, 2.05], [K8, 0.6, 0.13, 0.95], ...arc(K8, K8 + 0.95, [0.6, 0.13, 0.95], [0.1, 0.5, -2.35], 2.45, 16).slice(1), [K8 + 1.2, 0.03, 0.13, -2.6]], spin: 5 } },
    ],
    overlays: [P1('INDEPENDIENTE 1 · JUVENTUS 0', 'pica.'), P2('PRIMERA INTERCONTINENTAL DEL CLUB', 'Intercontinental'), FUR] },

  // 9. Canal 7 lo pasó en vivo. Después, no quedó rastro: solo fotos y dibujos.
  { id: 'b09', set: 'room', cam: { from: [0.6, 3.5, 4.7], to: [0.3, 3.1, 4.0], look: [0, 0.35, -0.9], fov: 44, shift: 0 }, keywords: ['Canal', 'rastro:', 'dibujos.'],
    actors: [LIV({ lampX: -2.0 }),
      { type: 'tv', pos: [0, 0.42, -1.7], p: { kind: 'pitch', staticAt: W('b09', 'Después,'), offAt: W('b09', 'rastro:'), ball: [[0, -0.5, -0.3, 0], [2.0, 0.4, -0.1, 0]] } },
      { type: 'mesa', pos: [0, 0, -0.3], p: { w: 1.6, d: 0.8, h: 0.4 } },
      { type: 'sofa', pos: [0, 0, 1.15], p: {} },
      { type: 'player', pos: [-0.5, 0.0, 1.1], rot: [0, PI, 0], p: { kit: 'civ', pose: 'sit', hair: '#3a2a1a' } },
      { type: 'player', pos: [0.5, 0.0, 1.1], rot: [0, PI, 0], p: { kit: 'abuela', pose: 'sit', hair: '#2a1a10', phase: 1.2 } },
      ...[['foto', -0.5, 1], ['foto', 0.05, 2], ['dibujo', 0.55, 3]].map(([kind, x, seed], i) => ({ type: 'foto', pos: [x, 0.44, -0.3] as any, rot: [-PI / 2, 0, (i - 1) * 0.15] as any, s: 0.48,
        at: W('b09', i < 2 ? 'fotos' : 'dibujos.') + (i % 2) * 0.2, p: { kind: kind === 'dibujo' ? 'dibujo' : 'foto', seed } })),
    ],
    overlays: [P1('CANAL 7 · EN VIVO', 'Canal', { out: 'Después,' }), P1('DESPUÉS: SOLO FOTOS Y DIBUJOS DE EL GRÁFICO', 'fotos'), FU] },

  // 10. Hasta que un hincha, Mariano Asch, llegó a la RAI, la tele italiana, por un amigo de allá.
  { id: 'b10', set: 'room', cam: { from: [0.6, 2.95, 5.5], to: [0.3, 2.7, 4.8], look: [0.15, 0.85, -0.7], fov: 44, shift: 0 }, keywords: ['hincha,', 'Asch,', 'RAI,'],
    actors: [LIV({ era: 'new', lampX: -2.4 }),
      { type: 'compu', pos: [-0.75, 0, -0.3], p: {} },
      { type: 'box', pos: [-0.75, 0.42, 0.45], p: { size: [0.5, 0.06, 0.5], color: '#2a2d38' } },
      ...[[-0.97, 0.23], [-0.53, 0.23], [-0.97, 0.67], [-0.53, 0.67]].map(([x, z]) => ({ type: 'box', pos: [x, 0.2, z] as any, p: { size: [0.04, 0.4, 0.04], color: '#1a1c24' } })),
      { type: 'player', pos: [-0.75, 0, 0.5], rot: [0, PI, 0], p: { kit: 'hincha', pose: 'type', scarf: '#e9e6dc' } },
      { type: 'canal', pos: [1.0, 0, -1.6], at: 'RAI,', p: { h: 1.45 } },
      { type: 'player', pos: [-0.05, 0, -1.05], rot: [0, 0.3, 0], at: 'amigo', s: 0.92, p: { kit: 'amigo', poses: [[0, 'idle'], [0.3, 'point']] } },
    ],
    overlays: [P1('MARIANO ASCH · HINCHA DE INDEPENDIENTE', 'Asch,'), P2('RAI · TELEVISIÓN ITALIANA', 'RAI,'), FU] },

  // 11. Mandó mail tras mail. Le pidieron 500 euros por digitalizar la cinta, sin saber si estaba el gol.
  { id: 'b11', set: 'room', cam: { from: [-0.4, 2.6, 4.9], to: [0.0, 2.4, 4.25], look: [0.05, 0.85, -0.7], fov: 44, shift: 0 }, keywords: ['mail', 'mail.', '500', 'digitalizar'],
    actors: [LIV({ era: 'new', lampX: 2.4 }),
      { type: 'compu', pos: [-0.8, 0, -0.3], p: {} },
      { type: 'player', pos: [-0.8, 0, 0.5], rot: [0, PI, 0], p: { kit: 'hincha', pose: 'type', scarf: '#e9e6dc' } },
      { type: 'box', pos: [-0.8, 0.42, 0.45], p: { size: [0.5, 0.06, 0.5], color: '#2a2d38' } },
      { type: 'mails', pos: [0, 0, 0], p: { from: [-0.8, 1.15, -0.1], to: [0.85, 1.0, -0.9], times: [0.1, 0.55, 0.95, 1.35], dur: 0.9, arc: 0.55 } },
      { type: 'archivo', pos: [0.85, 0, -1.2], s: 0.8, p: { hi: 13 } },
      { type: 'euros', pos: [0.15, 0, 0.6], at: '500', p: { n: 5 } },
      { type: 'sign', pos: [0.85, 1.62, -1.0], at: 'gol.', p: { text: '?', w: 0.42, h: 0.42, bg: '#1a1c24', color: '#e8c060', size: 0.8 } },
    ],
    overlays: [P1('500 EUROS PARA DIGITALIZAR', '500'), P2('¿ESTÁ EL GOL?', 'gol.'), FU] },

  // 12. En 2007 le tocaron el timbre: el VHS negro, con el golazo del Bocha.
  { id: 'b12', set: 'room', cam: { from: [1.1, 1.85, 2.9], to: [0.15, 1.75, 2.5], look: [0.7, 1.15, -3.0], lookTo: [-0.15, 1.1, -1.3], fov: 44, shift: 0 }, keywords: ['2007', 'timbre:', 'VHS', 'golazo'],
    actors: [LIV({ door: true, era: 'new', lampX: -2.3 }),
      { type: 'timbre', pos: [0.98, 1.25, -3.5], p: { at: W('b12', 'timbre:') } },
      { type: 'mesa', pos: [-0.2, 0, -1.0], p: { w: 2.1, d: 2.0, h: 0.45, c: '#3a2618' } },
      { type: 'vcr', pos: [-0.2, 0.475, -1.5], p: { led: [[0, 0], [tV + 1.0, 0], [tV + 1.2, 1]] } },
      { type: 'tv', pos: [-0.2, 0.895, -1.6], p: { wood: '#36241a', legs: false, kind: 'pitch', on: [[0, 0], [tG - 0.25, 0], [tG + 0.1, 1]], ball: [[tG, -0.5, -0.5, 0], [tG + 0.5, 0.0, 0.1, 0], [tG + 0.9, 0.25, -0.35, 0]] } },
      { type: 'cassette', pos: [0, 0, 0], p: { path: [[0, -0.2, 0.475, -0.42], [tV, -0.2, 0.475, -0.42], [tV + 0.35, -0.2, 0.56, -0.42], [tV + 1.1, -0.2, 0.56, -1.42]] } },
    ],
    overlays: [P1('2007', '2007', { out: 'VHS' }), FUR] },

  // 13. ¿Alguien en tu casa lo vio en vivo? Contalo abajo.
  { id: 'b13', set: 'room', cam: { from: [-0.7, 3.4, 4.9], to: [-0.3, 3.0, 4.2], look: [0, 0.65, -1.2], fov: 44, shift: 0 }, keywords: ['casa', 'vivo?', 'Contalo'],
    actors: [LIV({ era: 'new', lampX: 2.2 }),
      { type: 'mesa', pos: [0, 0, -1.6], p: { w: 1.6, d: 1.0, h: 0.45, c: '#3a2618' } },
      { type: 'vcr', pos: [0, 0.475, -1.55], p: { led: [[0, 1]] } },
      { type: 'tv', pos: [0, 0.895, -1.65], p: { legs: false, kind: 'pitch', ball: [[0, -0.5, -0.5, 0], [0.6, 0.0, 0.1, 0], [1.1, 0.25, -0.35, 0], [3.2, 0.3, -0.4, 0]] } },
      { type: 'sofa', pos: [0, 0, 1.05], p: { c: '#3a2a3a' } },
      { type: 'player', pos: [-0.5, 0, 1.0], rot: [0, PI, 0], p: { kit: 'civ', pose: 'sit', hair: '#7e7a74' } },
      { type: 'player', pos: [0.5, 0, 1.0], rot: [0, PI, 0], p: { kit: 'abuela', pose: 'sit', hair: '#8e887e', phase: 1.1 } },
    ],
    overlays: [P1('¿ALGUIEN EN TU CASA LO VIO EN VIVO?', '¿Alguien')] },
];
void DUR;
