import type { BeatSpec } from '../../src/Beat';
import { INK, YEL, TAG, TEAL, KRAFT } from './props';

// Versión 2: otro look que el original (neón violeta, robot "bot", teléfono gigante con chat, edificios, globo).
// Acá: Black Friday en negro, amarillo, rojo etiqueta y kraft. Pasillo de súper, galería comercial de noche con persianas,
// sala de reuniones de madera y banco de pruebas a oscuras. El bot es el carrito (pantallita amarilla en la manija).
// Metáfora que abre y cierra: el carrito que se llena solo (b01) y el mismo carrito lleno frente a la persiana (b05, b13).
// Textos 2D: exactamente los de "## Placas por plano" de guion.md, entre el 66 % y el 75 % de alto.
const AISLE = (o: any = {}) => ({ type: 'stage', p: { kind: 'aisle', ...o } });
const STREET = { type: 'stage', p: { kind: 'street' } };
const MEET = { type: 'stage', p: { kind: 'meet' } };
const LAB = { type: 'stage', p: { kind: 'lab' } };
const GREY = '#2b2a31', GREEN = '#1f9a58';
const tag = (text: string, at: any, o: any = {}) => ({ type: 'tag' as const, text, at, x: 50, y: 70, color: GREY, size: 46, ...o });
const PI = Math.PI;
const A = { shirt: TEAL, pants: '#23222a', hair: '#2a1c12', skin: '#e0b48f' };          // genérico "Meta"
const Z = { shirt: '#f07a2a', pants: '#23222a', hair: '#15121a', skin: '#c98d62' };     // genérico "Amazon"
const U = { shirt: '#e9e4da', pants: '#3a4a6a', hair: '#5a3a1a', skin: '#f0c9a4' };     // vos
const W1 = { shirt: '#8a5cd6', pants: '#23222a', hair: '#1a1410', skin: '#c98d62' };
const W2 = { shirt: '#3fbf7f', pants: '#2a2f38', hair: '#8a5a2a', skin: '#f0c9a4' };
const card = (text: string, x: number, z: number, at?: any) => ({ type: 'label', pos: [x, 0.92, z] as any, rot: [-0.35, 0, 0] as any, at, p: { text, w: 0.62, h: 0.2, bg: INK, color: YEL, size: 0.66, weight: 900, depth: 0.04 } });

export const BEATS: BeatSpec[] = [
  // 1. Un carrito que se llena solo.  (travelling bajo que empuja hacia el carrito; los productos ya están cayendo en el cuadro 0)
  { id: 'b01', set: 'room', cam: { from: [1.9, 1.6, 4.6], to: [1.3, 1.45, 3.7], look: [0, 0.5, 0], lookTo: [-0.1, 0.45, 0], fov: 46 }, keywords: ['carrito'],
    actors: [
      AISLE(),
      { type: 'shelf', pos: [-1.9, 0, -0.6], rot: [0, PI / 2, 0], p: { w: 4.2, seed: 2, levels: 3 } },
      { type: 'shelf', pos: [1.95, 0, -1.2], rot: [0, -PI / 2, 0], p: { w: 3.4, seed: 5, levels: 3 } },
      { type: 'shelf', pos: [0, 0, -3.3], p: { w: 3.6, seed: 8, levels: 3 } },
      { type: 'spot', pos: [0, 0, 0.3], p: { r: 0.85 } },
      { type: 'cart', pos: [0, 0, 0.3], rot: [0, -0.35, 0], p: { n: 9, fill: { at: -0.5, every: 0.16 }, seed: 3 } },
    ],
    overlays: [tag('SE LLENA SOLO', 0, { color: TAG, size: 66, y: 70 })] },

  // 2. Lo arma un bot de Meta, que busca y compara por vos.  (picado en tres cuartos que gira: el haz barre la góndola)
  { id: 'b02', set: 'room', cam: { from: [2.6, 4.2, 4.6], to: [1.7, 3.8, 4.0], look: [0, 0.45, -0.6], lookTo: [-0.1, 0.45, -0.8], fov: 46 }, keywords: ['Meta', 'compara'],
    actors: [
      AISLE({ noflags: true }),
      { type: 'shelf', pos: [0, 0, -1.7], p: { w: 3.4, seed: 11, hl: [6, 12], glow: 2.35, levels: 3 } },
      { type: 'shelf', pos: [-1.95, 0, 0.2], rot: [0, PI / 2, 0], p: { w: 3.0, seed: 4, levels: 3 } },
      { type: 'cart', pos: [0.1, 0, 0.5], rot: [0, PI / 2, 0], p: { n: 9, full: true, seed: 3, scan: 1.7 } },
      { type: 'check', pos: [0.75, 2.05, -1.45], at: 'vos', p: { size: 0.45 } },
    ],
    overlays: [tag('META', 'Meta', { size: 60, y: 67 }), tag('BUSCA · COMPARA · ARMA EL CARRITO', 'busca', { size: 38, y: 74, color: TEAL })] },

  // 3. Se llama Muse. Vos solo aprobás la compra.  (órbita alrededor del teléfono parado en la caja)
  { id: 'b03', set: 'room', cam: { from: [-1.5, 1.9, 4.4], to: [0.7, 1.8, 4.2], look: [0.1, 0.95, 0], lookTo: [0.15, 0.95, 0], fov: 46 }, keywords: ['Muse', 'aprobás'],
    actors: [
      AISLE({ noflags: true }),
      { type: 'shelf', pos: [0, 0, -2.6], p: { w: 4.0, seed: 7 } },
      { type: 'box', pos: [0.25, 0.35, 0], p: { size: [1.3, 0.7, 0.7], color: KRAFT } },
      { type: 'box', pos: [0.25, 0.72, 0], p: { size: [1.36, 0.04, 0.76], color: INK } },
      { type: 'phone2', pos: [0.25, 1.36, 0.05], rot: [-0.08, 0, 0], s: 0.6, p: { mode: 'cart', ok: 2.05 } },
      { type: 'person', pos: [-0.85, 0, -0.15], rot: [0, 0.6, 0], p: { ...U, pose: 'idle' }, out: 'aprobás' },
      { type: 'person', pos: [-0.85, 0, -0.15], rot: [0, 0.6, 0], at: 'aprobás', enter: 'none', p: { ...U, pose: 'point' } },
      { type: 'cart', pos: [1.45, 0, -0.9], rot: [0, -0.6, 0], s: 0.9, p: { full: true, seed: 3 } },
    ],
    overlays: [tag('MUSE', 'Muse', { size: 64, y: 67, color: TEAL }), tag('VOS APROBÁS LA COMPRA', 'aprobás', { color: GREEN, size: 44, y: 74 })] },

  // 4. Pero hoy, en pleno Black Friday, hay una tienda que no lo deja entrar.  (travelling lateral por la galería; baja una persiana)
  { id: 'b04', set: 'room', cam: { from: [-1.9, 2.1, 5.6], to: [0.9, 2.0, 5.3], look: [-1.3, 0.95, -1], lookTo: [1.2, 0.95, -1.2], fov: 46 }, keywords: ['Black', 'tienda', 'entrar'],
    actors: [
      STREET,
      { type: 'store', pos: [-3.3, 0, -2.0], p: { w: 2.1, seed: 1 } },
      { type: 'store', pos: [-0.9, 0, -2.0], p: { w: 2.1, seed: 4 } },
      { type: 'store', pos: [1.5, 0, -2.0], p: { w: 2.1, seed: 2, shut: 3.6 } },
      { type: 'cart', pos: [-2.6, 0, 0.3], p: { full: true, seed: 3 }, move: { to: [0.7, 0, 0.3], at: 0, dur: 3.4 } },
      { type: 'person', pos: [-0.6, 0, -0.6], rot: [0, -PI / 2, 0], p: { ...W1, pose: 'walk' }, move: { to: [-2.4, 0, -0.6], at: 0, dur: 4.4 } },
      { type: 'person', pos: [2.4, 0, 0.9], rot: [0, -PI / 2, 0], at: 'tienda', p: { ...W2, pose: 'walk', phase: 1 }, move: { to: [1.6, 0, 0.9], at: 'tienda', dur: 1.6 } },
    ],
    overlays: [tag('BLACK FRIDAY · 27/11', 'Black', { color: INK, size: 54, y: 70 })] },

  // 5. Amazon lo bloqueó en septiembre.  (contrapicado que empuja hacia la persiana que cae)
  { id: 'b05', set: 'room', cam: { from: [0.5, 1.0, 4.8], to: [0.2, 1.1, 4.0], look: [0, 1.05, -1.2], lookTo: [0, 1.1, -1.3], fov: 46 }, keywords: ['Amazon', 'bloqueó', 'septiembre'],
    actors: [
      STREET,
      { type: 'store', pos: [0, 0, -1.6], s: 0.85, p: { w: 2.4, seed: 5, sign: 'AMAZON', shut: 0.6 } },
      { type: 'store', pos: [-2.6, 0, -1.6], p: { w: 2.1, seed: 3 } },
      { type: 'store', pos: [2.6, 0, -1.6], p: { w: 2.1, seed: 6, lit: false } },
      { type: 'cross', pos: [0, 1.05, -1.38], at: 'en', p: { size: 0.65 } },
      { type: 'cart', pos: [0.15, 0, 0.35], rot: [0, PI / 2 - 0.3, 0], p: { full: true, seed: 3 } },
    ],
    overlays: [tag('AMAZON · BLOQUEADO', 'Amazon', { color: TAG, size: 54, y: 67 }), tag('SEPTIEMBRE 2026', 'septiembre', { size: 42, y: 74 })] },

  // 6. Dijo que el bot no avisa que es una inteligencia artificial.  (dolly lateral junto al molinete: la gente pasa en verde, el carrito en rojo)
  { id: 'b06', set: 'room', cam: { from: [2.4, 1.9, 4.3], to: [1.6, 1.8, 3.8], look: [-0.2, 0.75, -0.4], lookTo: [-0.1, 0.75, -0.3], fov: 46 }, keywords: ['avisa', 'inteligencia', 'artificial'],
    actors: [
      STREET,
      { type: 'store', pos: [0, 0, -2.1], s: 0.8, p: { w: 2.4, seed: 5 } },
      { type: 'gate', pos: [0, 0, -0.2], p: { green: 0, red: 0.98 } },
      { type: 'person', pos: [0, 0, 0.9], rot: [0, PI, 0], p: { ...W2, pose: 'walk' }, move: { to: [0, 0, -1.6], at: 0, dur: 0.9 }, out: 'bot' },
      { type: 'cart', pos: [0, 0, 1.6], rot: [0, PI / 2, 0], p: { full: true, seed: 3 }, move: { to: [0, 0, 0.75], at: 'bot', dur: 0.5 } },
      { type: 'label', pos: [0, 1.7, 0.75], at: 'inteligencia', bob: 0.04, p: { text: '?', w: 0.5, h: 0.5, bg: TAG, color: '#fff', size: 0.8, weight: 900 } },
    ],
    overlays: [tag('NO AVISA QUE ES UNA IA · SEGÚN AMAZON', 'avisa', { color: TAG, size: 36, y: 72 })] },

  // 7. Esta semana llegó al Reino Unido, pero en Amazon sigue afuera.  (grúa que sube y paneo de izquierda a derecha)
  { id: 'b07', set: 'room', cam: { from: [-1.6, 1.5, 5.2], to: [0.8, 2.1, 5.4], look: [-1.0, 0.85, -1], lookTo: [1.0, 0.9, -1], fov: 46 }, keywords: ['semana', 'Reino', 'Amazon', 'afuera'],
    actors: [
      STREET,
      { type: 'store', pos: [-1.2, 0, -1.4], s: 0.85, p: { w: 2.2, seed: 2 } },
      { type: 'store', pos: [1.2, 0, -1.4], s: 0.85, p: { w: 2.2, seed: 5, sign: 'AMAZON', signAt: 2.29, closed: true } },
      { type: 'cart', pos: [-1.2, 0, 1.3], rot: [0, PI / 2, 0], p: { full: true, seed: 3 }, move: { to: [-1.2, 0, -0.75], at: 'llegó', dur: 1.0 } },
      { type: 'cart', pos: [1.2, 0, 0.3], rot: [0, PI / 2 - 0.2, 0], at: 'Amazon', p: { full: true, seed: 3 } },
      { type: 'cross', pos: [1.2, 1.05, -1.18], at: 'afuera', p: { size: 0.55 } },
    ],
    overlays: [tag('REINO UNIDO · 23-24/11/2026', 'Reino', { color: TEAL, size: 42, y: 67 }), tag('AMAZON: SIGUE CERRADO', 'afuera', { color: TAG, size: 44, y: 74 })] },

  // 8. El 25 de noviembre, Fortune contó que las dos empresas negocian.  (órbita alrededor de la mesa de reunión)
  { id: 'b08', set: 'room', cam: { from: [-1.8, 3.1, 6.0], to: [1.0, 2.9, 5.9], look: [0, 0.6, -0.3], lookTo: [0, 0.65, -0.4], fov: 46 }, keywords: ['noviembre', 'Fortune', 'empresas', 'negocian'],
    actors: [
      MEET,
      { type: 'table', pos: [0, 0, 0], p: { w: 1.9, d: 1.1 } },
      { type: 'person', pos: [-1.25, 0, 0], rot: [0, PI / 2, 0], p: { ...A, pose: 'idle' }, out: 'negocian' },
      { type: 'person', pos: [-1.25, 0, 0], rot: [0, PI / 2, 0], at: 'negocian', enter: 'none', p: { ...A, pose: 'point' } },
      { type: 'person', pos: [1.25, 0, 0], rot: [0, -PI / 2, 0], at: 'Fortune', p: { ...Z, pose: 'idle' }, out: 'negocian' },
      { type: 'person', pos: [1.25, 0, 0], rot: [0, -PI / 2, 0], at: 'negocian', enter: 'none', p: { ...Z, pose: 'shrug' } },
      card('META', -0.55, 0.3, 'dos'), card('AMAZON', 0.55, 0.3, 'empresas'),
      { type: 'box', pos: [0, 0.82, -0.1], at: 'negocian', p: { size: [0.5, 0.05, 0.36], color: '#f3efe6' } },
    ],
    overlays: [tag('NEGOCIAN · SEGÚN FORTUNE · 25/11/2026', 'Fortune', { size: 36, y: 72 })] },

  // 9. Según la revista, se traban por la publicidad y por las búsquedas.  (lateral bajo frente a la cinchada)
  { id: 'b09', set: 'room', cam: { from: [-0.6, 1.5, 6.0], to: [0.6, 1.7, 5.6], look: [0, 0.8, 0], lookTo: [0, 0.85, 0], fov: 46 }, keywords: ['revista', 'traban', 'publicidad', 'búsquedas'],
    actors: [
      MEET,
      { type: 'person', pos: [-1.2, 0, 0.25], rot: [0, PI / 2, 0], p: { ...A, pose: 'hold' } },
      { type: 'person', pos: [1.2, 0, 0.25], rot: [0, -PI / 2, 0], p: { ...Z, pose: 'hold' } },
      { type: 'rope', pos: [0, 1.0, 0.25], at: 'traban', enter: 'grow', p: { L: 1.0 } },
      { type: 'mega', pos: [-0.42, 1.5, 0.25], s: 0.9, at: 'publicidad', bob: 0.04 },
      { type: 'lens', pos: [0.42, 1.6, 0.25], s: 0.8, at: 'búsquedas', bob: 0.04 },
    ],
    overlays: [tag('PUBLICIDAD', 'publicidad', { x: 31, y: 72, color: TAG, size: 46 }), tag('BÚSQUEDAS', 'búsquedas', { x: 69, y: 72, color: TAG, size: 46 })] },

  // 10. Y Muse tiene otro problema.  (empuje rápido: el pasillo se apaga y queda el carrito bajo un foco)
  { id: 'b10', set: 'room', cam: { from: [0.2, 1.8, 5.0], to: [0, 1.45, 3.8], look: [0, 0.6, 0], lookTo: [0, 0.65, 0], fov: 46 }, keywords: ['Muse', 'problema'],
    actors: [
      AISLE({ dim: 0.5, noflags: true }),
      { type: 'shelf', pos: [-1.9, 0, -0.8], rot: [0, PI / 2, 0], p: { w: 4.0, seed: 9 } },
      { type: 'shelf', pos: [1.9, 0, -0.8], rot: [0, -PI / 2, 0], p: { w: 4.0, seed: 12 } },
      { type: 'spot', pos: [0, 0, 0], at: 'tiene', p: { r: 0.8, color: TAG } },
      { type: 'cart', pos: [0, 0, 0], rot: [0, -0.25, 0], p: { full: true, seed: 3, eye: TAG } },
      { type: 'warn', pos: [0.72, 1.35, 0.1], s: 0.45, at: 'problema' },
    ] },

  // 11. Según Reuters, en pruebas pudo leer mensajes de Signal en Android, con el permiso de notificaciones.  (grúa que baja sobre el banco de pruebas)
  { id: 'b11', set: 'room', cam: { from: [0.7, 2.6, 4.4], to: [0.3, 2.0, 3.6], look: [0, 1.0, 0], lookTo: [0, 1.1, 0], fov: 46 }, keywords: ['Reuters', 'pruebas', 'mensajes', 'Signal', 'Android', 'permiso', 'notificaciones'],
    actors: [
      LAB,
      { type: 'box', pos: [0, 0.4, 0], p: { size: [2.6, 0.8, 1.2], color: '#2a2c36' } },
      { type: 'stand', pos: [0, 0.8, -0.05] },
      { type: 'phone2', pos: [0, 1.45, 0.0], s: 0.6, p: { mode: 'notif', from: 2.1, every: 0.5, perm: 4.45 } },
      { type: 'lamp', pos: [-1.0, 0.8, -0.2] },
      { type: 'cart', pos: [0.95, 0.8, 0.15], rot: [0, PI - 0.2, 0], s: 0.55, at: 'pruebas', p: { full: true, seed: 3, scan: 0.5, eye: TAG } },
      { type: 'lens', pos: [-0.25, 1.75, 0.3], s: 0.55, at: 'leer', move: { to: [0.15, 1.3, 0.3], at: 'mensajes', dur: 2.2 } },
    ],
    overlays: [tag('SEGÚN REUTERS', 'Reuters', { y: 74, size: 42, out: 'Signal' }), tag('SIGNAL · ANDROID', 'Signal', { y: 67, color: TEAL, size: 50 }),
      tag('PERMISO DE NOTIFICACIONES', 'permiso', { y: 74, size: 40 })] },

  // 12. Meta dice que son casos aislados y que solo usa los permisos que vos le das.  (dolly hacia el atril, en diagonal)
  { id: 'b12', set: 'room', cam: { from: [1.2, 2.0, 5.9], to: [0.5, 1.9, 5.0], look: [0.3, 0.95, -0.2], lookTo: [0.3, 0.95, -0.2], fov: 46 }, keywords: ['Meta', 'aislados', 'permisos'],
    actors: [
      MEET,
      { type: 'podium', pos: [-0.25, 0, 0], rot: [0, 0.25, 0], p: { name: 'META' } },
      { type: 'person', pos: [-0.3, 0, -0.55], rot: [0, 0.25, 0], p: { ...A, pose: 'idle' }, out: 'aislados' },
      { type: 'person', pos: [-0.3, 0, -0.55], rot: [0, 0.25, 0], at: 'aislados', enter: 'none', p: { ...A, pose: 'shrug' } },
      { type: 'phone2', pos: [0.85, 1.4, -0.8], rot: [0, -0.25, 0], s: 0.5, at: 'permisos', p: { mode: 'notif', from: -3, perm: 0 } },
      { type: 'person', pos: [1.0, 0, 0.75], rot: [0, -0.6, 0], at: 'vos', p: { ...U, pose: 'hold' } },
    ],
    overlays: [tag('META: CASOS AISLADOS', 'aislados', { size: 50, y: 70 })] },

  // 13. Y hasta el jueves 26 no hubo acuerdo.  (se aleja y sube: el carrito lleno sigue frente a la persiana)
  { id: 'b13', set: 'room', cam: { from: [0.35, 1.75, 5.0], to: [-0.3, 2.3, 5.7], look: [0, 1.2, -1.2], lookTo: [0, 1.15, -1.3], fov: 46 }, keywords: ['jueves', 'acuerdo'],
    actors: [
      STREET,
      { type: 'store', pos: [0, 0, -1.6], s: 0.85, p: { w: 2.4, seed: 5, sign: 'AMAZON', closed: true } },
      { type: 'store', pos: [-2.6, 0, -1.6], p: { w: 2.1, seed: 3, lit: false, closed: true } },
      { type: 'store', pos: [2.6, 0, -1.6], p: { w: 2.1, seed: 6, lit: false } },
      { type: 'calendar', pos: [0.55, 1.3, -1.42], s: 0.42, at: 'jueves', p: { top: 'JUEVES', big: '26', color: TAG } },
      { type: 'cart', pos: [-0.2, 0, 0.3], rot: [0, PI / 2 + 0.2, 0], p: { full: true, seed: 3 } },
      { type: 'spot', pos: [-0.2, 0, 0.3], p: { r: 0.8 } },
    ],
    overlays: [tag('SIN ACUERDO AL 26/11/2026', 'acuerdo', { color: TAG, size: 46, y: 70 })] },

  // 14. ¿Firman antes de fin de año? Sí o no, dejá tu apuesta.  (órbita alta sobre el acuerdo sin firmar)
  { id: 'b14', set: 'room', cam: { from: [1.1, 2.0, 3.4], to: [-0.8, 1.95, 3.4], look: [0, 0.85, -0.1], lookTo: [0, 0.88, -0.1], fov: 46 }, keywords: ['Firman', 'apuesta'],
    actors: [
      MEET,
      { type: 'table', pos: [0, 0, 0], p: { w: 2.0, d: 1.2 } },
      { type: 'contract', pos: [0, 0.8, 0] },
      { type: 'person', pos: [-1.3, 0, -0.1], rot: [0, PI / 2, 0], p: { ...A, pose: 'idle' } },
      { type: 'person', pos: [1.3, 0, -0.1], rot: [0, -PI / 2, 0], p: { ...Z, pose: 'idle' } },
      { type: 'check', pos: [-0.55, 1.45, 0.1], at: 'Sí', p: { size: 0.5 } },
      { type: 'cross', pos: [0.55, 1.45, 0.1], at: 'no', p: { size: 0.4 } },
    ],
    overlays: [tag('¿FIRMAN ANTES DE FIN DE AÑO?', 'Firman', { size: 42, y: 67, color: INK }), tag('SÍ / NO', 'Sí', { size: 58, y: 74.5, color: TEAL })] },
];
