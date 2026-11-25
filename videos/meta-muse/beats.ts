import type { BeatSpec } from '../../src/Beat';
import { C } from '../../src/kit/math';

const USER = { shirt: C.cyan, hair: '#3a2a1a' };
const AMZ = { shirt: '#ff9a2e', hair: '#15102b', skin: '#c98d62', pants: '#1c1830' };   // genérico "Amazon"
const MET = { shirt: '#2f6bff', hair: '#7a3b1a', pants: '#1c1830' };                     // genérico "Meta"
const DARK = '#15102b';
const bub = (text: string, x: number, y: number, me: boolean, at: any, w = 1.25, z = 0.22) => ({ type: 'label', pos: [x, y, z] as any, at, p: { text, w, h: 0.4, bg: me ? '#1fa868' : '#2d3a66', color: '#fff', size: 0.5, weight: 800 } });

export const BEATS: BeatSpec[] = [
  // 1. le escribís a un bot
  { id: 'b01', cam: { from: [0.7, 2.2, 7.4], to: [-0.2, 2.0, 6.4], look: [0, 1.7, 0], fov: 46 }, keywords: ['WhatsApp', 'bot', 'cena'],
    actors: [
      { type: 'bigphone', pos: [0, 1.75, 0], rot: [0, -0.08, 0], p: { title: 'CHAT CON EL BOT' } },
      bub('Hola 👋', -0.35, 2.55, false, undefined, 0.8),
      bub('comprame la cena', 0.2, 1.95, true, 'comprame', 1.25),
      bub('escribiendo...', -0.2, 1.35, false, 'cena', 1.1),
      { type: 'bot', pos: [0.95, 0, 1.1], rot: [0, -0.5, 0], s: 0.8, at: 'bot' },
      { type: 'person', pos: [-0.8, 0, 1.2], rot: [0, 0.6, 0], s: 0.8, p: { ...USER, pose: 'type' } },
    ],
    overlays: [{ type: 'pill', text: '"COMPRAME LA CENA"', at: 'comprame' }] },
  // 2. entra al súper, llena el carrito, pide el OK
  { id: 'b02', set: 'void', cam: { from: [-0.8, 2.4, 8.4], to: [0.3, 2.2, 7.4], look: [0, 1.4, 0], fov: 46 }, keywords: ['súper', 'carrito', 'OK'],
    actors: [
      { type: 'building', pos: [-0.95, 0, -0.8], p: { w: 1.5, h: 2.0, d: 1, seed: 4, sign: 'SÚPER' } },
      { type: 'bot', pos: [1.05, 0, 0.6], rot: [0, -0.5, 0], move: { to: [-0.3, 0, 0.6], at: 'entra', dur: 0.8 } },
      { type: 'cart', pos: [0.85, 0, 0.9], rot: [0, -0.3, 0], s: 1.05, at: 'llena', p: { n: 9, dur: 1.2 } },
      { type: 'label', pos: [0.85, 2.3, 0.6], at: 'pide', bob: 0.05, p: { text: '¿OK?', w: 1.2, h: 0.6, bg: C.gold, color: '#1a1030', size: 0.7, weight: 900 } },
      { type: 'check', pos: [0.85, 3.0, 0.6], at: 'OK', p: { size: 0.6 } },
    ],
    overlays: [{ type: 'pill', text: 'ARMA EL CARRITO · VOS APROBÁS', at: 'pide' }] },
  // 3. se llama Muse, de Meta
  { id: 'b03', cam: { from: [0.5, 2.0, 5.6], to: [-0.2, 1.9, 5.0], look: [0, 1.45, 0], fov: 44 }, keywords: ['Muse', 'Meta'],
    actors: [
      { type: 'ring', pos: [0, 0.03, 0], p: { r: 0.85, color: '#8a6bff' } },
      { type: 'bot', pos: [0, 0.35, 0], s: 1.35 },
      { type: 'label', pos: [0, 0.3, 0.9], at: 'Meta', p: { text: 'DE META', w: 1.3, h: 0.4, bg: '#2f6bff', color: '#fff', size: 0.64, weight: 900 } },
    ],
    overlays: [{ type: 'plate', name: 'MUSE', role: 'agente de IA', at: 'Muse', y: 70 }] },
  // 4. agente de IA
  { id: 'b04', set: 'void', cam: { from: [-0.6, 2.3, 8.0], to: [0.3, 2.1, 7.2], look: [0, 1.6, 0], fov: 46 }, keywords: ['agente', 'IA', 'trámites'],
    actors: [
      { type: 'bot', pos: [-1.0, 0, 0.4], rot: [0, 0.5, 0], s: 1.1 },
      ...['COMPRAR', 'RESERVAR', 'PAGAR'].map((tx, i) => ({ type: 'label', pos: [0.5, 2.75 - i * 0.7, 0] as any, at: [0.2, 'programa', 'trámites'][i], p: { text: tx, w: 1.3, h: 0.5, bg: '#2d1a6e', color: '#fff', size: 0.56, weight: 900 } })),
      ...[0, 1, 2].map((i) => ({ type: 'check', pos: [1.38, 2.8 - i * 0.7, 0.2] as any, at: ['programa', 'trámites', 'vos'][i], p: { size: 0.4 } })),
    ],
    overlays: [{ type: 'tag', text: 'AGENTE DE IA', at: 'agente', x: 50, y: 27, color: '#8a6bff', size: 52 }, { type: 'pill', text: 'HACE TRÁMITES POR VOS', at: 'trámites' }] },
  // 5. Reino Unido
  { id: 'b05', cam: { from: [0.9, 2.6, 9.0], to: [-0.3, 2.3, 7.8], look: [0, 1.5, 0], fov: 46 }, keywords: ['Reino Unido', 'Argos', "Sainsbury's"],
    actors: [
      { type: 'globe', pos: [0, 2.6, -0.4], s: 0.7 },
      { type: 'bot', pos: [0, 0, 1.2], s: 0.7, at: 0.3, enter: 'drop' },
      { type: 'building', pos: [-1.15, 0, -0.2], at: 'Argos', enter: 'grow', p: { w: 1.0, h: 1.2, d: 0.9, seed: 2, sign: 'ARGOS' } },
      { type: 'building', pos: [1.15, 0, -0.2], at: 'Sainsbury', enter: 'grow', p: { w: 1.0, h: 1.2, d: 0.9, seed: 7, color: '#3a1a55', sign: "SAINSBURY'S" } },
    ],
    overlays: [{ type: 'pill', text: 'REINO UNIDO · ESTA SEMANA', at: 'Reino' }] },
  // 6. Amazon lo bloqueó
  { id: 'b06', set: 'void', cam: { from: [-0.8, 2.5, 8.6], to: [0.3, 2.2, 7.6], look: [0, 1.6, 0], fov: 46 }, keywords: ['falta', 'Amazon', 'bloqueó', 'septiembre'],
    actors: [
      { type: 'building', pos: [0.5, 0, -0.6], p: { w: 1.8, h: 2.6, d: 1.1, seed: 9, color: '#3a2410' } },
      { type: 'label', pos: [0.5, 3.0, -0.6], at: 'Amazon', p: { text: 'AMAZON', w: 1.9, h: 0.5, bg: DARK, color: '#ff9a2e', size: 0.66, weight: 900 } },
      { type: 'bot', pos: [-1.3, 0, 1.0], rot: [0, 0.6, 0], s: 0.9, move: { to: [-0.75, 0, 0.8], at: 0.3, dur: 1.2 } },
      { type: 'box', pos: [0.2, 1.0, 0.5], at: 'bloqueó', enter: 'drop', p: { size: [2.2, 0.16, 0.12], color: C.red, glow: true, ei: 1.4 } },
      { type: 'cross', pos: [0.5, 1.7, 0.4], at: 'bloqueó', p: { size: 1.0 } },
      { type: 'calendar', pos: [-1.05, 2.5, 0], rot: [0, 0.25, 0], s: 0.6, at: 'septiembre', p: { top: 'SEPTIEMBRE', big: '2026', color: C.red } },
    ],
    overlays: [{ type: 'pill', text: 'AMAZON LO BLOQUEÓ', at: 'bloqueó', red: true }] },
  // 7. viola condiciones de uso
  { id: 'b07', set: 'room', cam: { from: [0.7, 2.3, 6.2], to: [-0.2, 2.1, 5.5], look: [0, 1.55, -0.5], fov: 46, shift: 0.06 }, keywords: ['viola', 'condiciones'],
    actors: [
      { type: 'person', pos: [-0.95, 0, 0], rot: [0, 0.6, 0], s: 0.95, p: { ...AMZ, pose: 'point' } },
      { type: 'label', pos: [0.5, 2.0, -0.5], rot: [0, -0.15, 0.04], p: { text: 'CONDICIONES', w: 1.5, h: 1.7, bg: '#f4f1ff', color: '#1a1030', size: 0.13, weight: 900, sub: 'DE USO', subColor: '#6b5aa8' } },
      { type: 'bot', pos: [0.75, 0, 0.3], rot: [0, -0.6, 0], s: 0.65 },
      { type: 'cross', pos: [0.75, 0.6, 0.6], at: 'viola', p: { size: 0.7 } },
    ],
    overlays: [{ type: 'plate', name: 'AMAZON', role: 'según la empresa', at: 0.1, y: 68 }] },
  // 8. Fortune: negocian, sin acuerdo
  { id: 'b08', set: 'room', cam: { from: [-0.8, 2.4, 6.6], to: [0.3, 2.1, 5.8], look: [0, 1.4, -0.4], fov: 46, shift: 0.06 }, keywords: ['Fortune', 'negocian', 'Todavía', 'acuerdo'],
    actors: [
      { type: 'desk', pos: [0, 0, -0.3], s: 0.8 },
      { type: 'person', pos: [-0.95, 0, -0.2], rot: [0, 1.2, 0], s: 0.95, p: { ...MET, pose: 'hold' } },
      { type: 'person', pos: [0.95, 0, -0.2], rot: [0, -1.2, 0], s: 0.95, p: { ...AMZ, pose: 'hold' } },
      { type: 'label', pos: [-0.8, 2.15, -0.2], at: 0.15, p: { text: 'META', w: 0.95, h: 0.36, bg: '#2f6bff', color: '#fff', size: 0.64, weight: 900 } },
      { type: 'label', pos: [0.8, 2.15, -0.2], at: 0.3, p: { text: 'AMAZON', w: 1.1, h: 0.36, bg: '#ff9a2e', color: '#1a1030', size: 0.64, weight: 900 } },
      { type: 'label', pos: [0, 1.15, -0.2], rot: [-0.3, 0, 0.05], at: 'negocian', p: { text: 'ACUERDO', w: 0.9, h: 0.6, bg: '#f4f1ff', color: '#1a1030', size: 0.3, weight: 900 } },
      { type: 'label', pos: [0, 1.95, -0.1], at: 'Todavía', bob: 0.05, p: { text: '?', w: 0.8, h: 0.8, size: 0.95, color: C.gold, weight: 900 } },
    ],
    overlays: [{ type: 'tag', text: 'según Fortune', at: 'Fortune', x: 50, y: 27, color: C.blue }, { type: 'pill', text: 'NEGOCIAN', at: 'negocian', out: 'Todavía' }, { type: 'pill', text: 'TODAVÍA NO HAY ACUERDO', at: 'Todavía', red: true }] },
  // 9. Reuters: más de 20 quejas internas
  { id: 'b09', cam: { from: [0.8, 2.6, 8.8], to: [-0.3, 2.3, 7.8], look: [0, 1.7, 0], fov: 46 }, keywords: ['otro problema', 'Reuters', 'veinte', 'empleados'],
    actors: [
      { type: 'screen', pos: [0, 2.7, -0.6], p: { kind: 'text', text: 'REUTERS', w: 1.9, h: 0.75 } },
      ...Array.from({ length: 8 }, (_, i) => ({ type: 'label', pos: [-1.2 + (i % 4) * 0.8, 1.9 - Math.floor(i / 4) * 0.55, 0.1 + (i % 2) * 0.1] as any, rot: [0, 0, (i % 3 - 1) * 0.08] as any, at: 2.3 + i * 0.13, p: { text: 'QUEJA', w: 0.72, h: 0.44, bg: '#f4f1ff', color: C.red, size: 0.5, weight: 900 } })),
      { type: 'crowd', pos: [0, 0, 0.9], at: 0.2, p: { n: 7, area: [3.0, 0.8], seed: 3, pose: 'sad', sc: 0.62, face: 0 } },
    ],
    overlays: [{ type: 'pill', text: 'OTRO PROBLEMA', at: 'otro', red: true, out: 'veinte' }, { type: 'big', text: '', count: { to: 20, pre: '+' }, sub: 'quejas internas · revisadas por Reuters', at: 'veinte', size: 120 }] },
  // 10. Signal en Android por notificaciones
  { id: 'b10', set: 'void', cam: { from: [-0.7, 2.3, 7.8], to: [0.3, 2.1, 6.8], look: [0, 1.75, 0], fov: 46 }, keywords: ['Muse', 'leer', 'Signal', 'Android', 'notificaciones'],
    actors: [
      { type: 'bigphone', pos: [0.6, 1.75, 0], rot: [0, -0.12, 0], p: { title: 'SIGNAL', head: '#2f6bff', w: 1.6, h: 2.9 } },
      { type: 'lock', pos: [0.6, 1.2, 0.25], s: 0.75, out: 'leer' },
      bub('mensaje privado', 0.6, 2.2, false, 'mensajes', 1.25, 0.25),
      bub('otro mensaje', 0.7, 1.65, true, 'Signal', 1.1, 0.25),
      { type: 'label', pos: [0.6, 2.85, 0.4], at: 'permiso', enter: 'drop', p: { text: 'NOTIFICACIÓN', w: 1.5, h: 0.4, bg: C.gold, color: '#1a1030', size: 0.56, weight: 900 } },
      { type: 'bot', pos: [-0.85, 0, 0.9], rot: [0, 0.7, 0], s: 0.9 },
      { type: 'label', pos: [-0.8, 1.95, 0.9], at: 'leer', bob: 0.04, p: { text: 'LEE', w: 0.8, h: 0.4, bg: C.red, color: '#fff', size: 0.64, weight: 900 } },
    ],
    overlays: [{ type: 'tag', text: 'pruebas citadas por Reuters', at: 0.1, x: 50, y: 27, color: C.red }, { type: 'pill', text: 'ANDROID', at: 'Android', out: 'permiso' }, { type: 'pill', text: 'VÍA PERMISO DE NOTIFICACIONES', at: 'permiso', red: true }] },
  // 11. chat a la persona equivocada
  { id: 'b11', set: 'room', cam: { from: [0.6, 2.4, 6.6], to: [-0.3, 2.2, 5.9], look: [0, 1.4, -0.3], fov: 46, shift: 0.06 }, keywords: ['temían', 'chat', 'equivocada'],
    actors: [
      { type: 'bot', pos: [0, 0, 0.6], s: 0.8 },
      { type: 'person', pos: [-0.9, 0, -0.3], rot: [0, 0.4, 0], s: 0.9, p: { shirt: C.green, pose: 'shrug' } },
      { type: 'person', pos: [0.9, 0, -0.3], rot: [0, -0.4, 0], s: 0.9, p: { shirt: C.magenta, hair: '#15102b', pose: 'hold' } },
      { type: 'label', pos: [-0.85, 2.05, -0.3], p: { text: 'PARA ÉL', w: 0.95, h: 0.34, bg: C.green, color: '#0d2b18', size: 0.62, weight: 900 } },
      { type: 'label', pos: [0, 1.75, 0.6], at: 'chat', move: { to: [0.8, 2.05, -0.1], at: 'persona', dur: 0.7 }, p: { text: 'CHAT', w: 0.85, h: 0.42, bg: '#1fa868', color: '#fff', size: 0.6, weight: 900 } },
      { type: 'cross', pos: [0.8, 2.6, 0], at: 'equivocada', p: { size: 0.6 } },
    ],
    overlays: [{ type: 'tag', text: 'temor de empleados', at: 0.1, x: 50, y: 27, color: C.blue }, { type: 'pill', text: 'A LA PERSONA EQUIVOCADA', at: 'equivocada', red: true }] },
  // 12. Meta responde
  { id: 'b12', cam: { from: [-0.7, 2.3, 8.0], to: [0.3, 2.1, 7.2], look: [0, 1.6, 0], fov: 46 }, keywords: ['Meta', 'aislados', 'permisos'],
    actors: [
      { type: 'person', pos: [-1.0, 0, 0.5], rot: [0, 0.5, 0], p: { ...MET, pose: 'point' } },
      { type: 'label', pos: [-1.0, 2.3, 0.5], p: { text: 'META', w: 0.95, h: 0.38, bg: '#2f6bff', color: '#fff', size: 0.64, weight: 900 } },
      { type: 'label', pos: [0.7, 2.6, 0], at: 'casos', p: { text: 'CASOS AISLADOS', w: 1.75, h: 0.5, bg: '#2d1a6e', color: '#fff', size: 0.5, weight: 900 } },
      { type: 'label', pos: [0.7, 1.9, 0], at: 'solo', p: { text: 'SOLO TUS PERMISOS', w: 1.75, h: 0.5, bg: '#2d1a6e', color: '#fff', size: 0.5, weight: 900 } },
      { type: 'bot', pos: [0.8, 0, 0.6], rot: [0, -0.4, 0], s: 0.75, at: 'agente' },
    ],
    overlays: [{ type: 'pill', text: 'META: CASOS AISLADOS', at: 'aislados' }] },
  // 13. vuelve al chat
  { id: 'b13', cam: { from: [-0.6, 2.0, 6.4], to: [0.3, 2.2, 7.4], look: [0, 1.7, 0], fov: 46 }, keywords: ['chat', 'carrito', 'OK'],
    actors: [
      { type: 'bigphone', pos: [0, 1.75, 0], rot: [0, 0.08, 0], p: { title: 'CHAT CON EL BOT' } },
      bub('comprame la cena', 0.2, 2.55, true, undefined, 1.25),
      bub('carrito listo 🛒', -0.2, 1.95, false, 'carrito', 1.2),
      { type: 'label', pos: [0, 1.15, 0.15], at: 'espera', bob: 0.04, p: { text: '¿OK?', w: 1.1, h: 0.55, bg: C.gold, color: '#1a1030', size: 0.7, weight: 900 } },
      { type: 'cart', pos: [0.9, 0, 1.2], rot: [0, -0.4, 0], s: 0.7, at: 'carrito', p: { n: 9, dur: 0.6 } },
      { type: 'bot', pos: [-0.9, 0, 1.2], rot: [0, 0.5, 0], s: 0.75 },
    ],
    overlays: [{ type: 'pill', text: 'EL BOT ESPERA TU OK', at: 'espera' }] },
  // 14. la pregunta
  { id: 'b14', set: 'void', cam: { from: [0.5, 2.3, 8.0], to: [-0.2, 2.1, 7.2], look: [0, 1.6, 0], fov: 46 }, keywords: ['tarjeta', 'IA', 'vos'],
    actors: [
      { type: 'bot', pos: [-0.95, 0, 0], rot: [0, 0.3, 0] },
      { type: 'card', pos: [-0.95, 2.45, 0.1], s: 0.85, at: 'tarjeta' },
      { type: 'person', pos: [0.95, 0, 0], rot: [0, -0.3, 0], at: 'seguís', p: { ...USER, pose: 'hold' } },
      { type: 'cart', pos: [0.95, 0, 0.9], s: 0.6, at: 'comprando', p: { n: 6, dur: 0.5 } },
      { type: 'label', pos: [0.95, 2.45, 0.1], at: 'vos', p: { text: 'COMPRO YO', w: 1.4, h: 0.46, bg: C.cyan, color: '#10203a', size: 0.6, weight: 900 } },
    ],
    overlays: [{ type: 'big', text: '¿TARJETA A UNA IA?', sub: 'o seguís comprando vos · te leo', at: 'IA', size: 80 }] },
  // 15. seguime
  { id: 'b15', cam: { from: [-0.5, 2.4, 8.4], to: [0.3, 2.2, 7.4], look: [0, 1.6, 0], fov: 46 }, keywords: ['Seguime', 'Amazon', 'firma'],
    actors: [
      { type: 'building', pos: [0.6, 0, -0.6], p: { w: 1.7, h: 2.4, d: 1.1, seed: 9, color: '#3a2410' } },
      { type: 'label', pos: [0.6, 2.8, -0.6], p: { text: 'AMAZON', w: 1.8, h: 0.48, bg: DARK, color: '#ff9a2e', size: 0.66, weight: 900 } },
      { type: 'bot', pos: [-0.95, 0, 0.8], rot: [0, 0.5, 0], s: 0.95 },
      { type: 'label', pos: [-0.95, 2.2, 0.8], at: 'firma', bob: 0.06, p: { text: '?', w: 0.8, h: 0.8, size: 0.95, color: C.gold, weight: 900 } },
    ],
    overlays: [{ type: 'big', text: 'SEGUIME', sub: 'si Amazon firma, lo cuento acá', at: 'Seguime', size: 110 }] },
];
