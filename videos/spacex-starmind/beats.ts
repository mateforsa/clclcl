import type { BeatSpec } from '../../src/Beat';
import { C } from '../../src/kit/math';

const PI = Math.PI;
const LBL = { bg: '#2d1a6e', size: 0.62 };
const GOLD = { bg: C.gold, color: '#1a1030', size: 0.62, weight: 900 };
const TAG = '#2d1a6e';

export const BEATS: BeatSpec[] = [
  // 1. La Tierra con los satélites de hoy
  { id: 'b01', set: 'void', cam: { from: [0.9, 2.0, 8.8], to: [0, 2.2, 7.4], look: [0, 1.5, 0], fov: 46 }, keywords: ['17.000', 'satélites.'],
    actors: [
      { type: 'globe', pos: [0, 2.05, 0], s: 0.8 },
      { type: 'dots', pos: [0, 2.05, 0], p: { n: 90, R0: 1.0, R1: 1.25, color: C.cyan, size: 0.13, dur: 1.4 } },
    ],
    overlays: [{ type: 'big', text: '', count: { to: 17000 }, sub: 'satélites activos, de todos los países', at: 'unos', y: 62 },
      { type: 'tag', text: 'TODAS LAS EMPRESAS · DATO AL 18/11/2026', at: 'satélites', x: 50, y: 75.3, color: TAG, size: 38 }] },

  // 2. 25 de noviembre: Estados Unidos autoriza hasta un millón
  { id: 'b02', cam: { from: [-0.8, 2.4, 8.8], to: [0.1, 2.2, 7.8], look: [0, 1.4, 0], fov: 46 }, keywords: ['25', 'autorizó', 'millón.'],
    actors: [
      { type: 'calendar', pos: [-0.9, 2.6, 0], rot: [0, 0.25, 0], s: 0.6, p: { top: 'NOV 2026', big: '25', color: C.blue } },
      { type: 'building', pos: [-0.9, 0, -0.6], p: { w: 1.0, h: 1.5, d: 0.9, seed: 4 } },
      { type: 'label', pos: [0.8, 3.12, 0.1], at: 'Estados', p: { text: 'ESTADOS UNIDOS', w: 1.5, h: 0.32, ...LBL } },
      { type: 'doc', pos: [0.8, 2.3, 0.2], s: 0.95, at: 'autorizó', enter: 'drop', p: { title: 'PERMISO', stamp: 'AUTORIZADO', stampAt: 0.45 } },
      { type: 'label', pos: [-0.9, 1.75, -0.1], at: 'una', p: { text: 'UNA EMPRESA', w: 1.25, h: 0.3, ...GOLD } },
      { type: 'ring', pos: [0.8, 0.03, 0.2], p: { r: 0.6, color: C.gold } },
      { type: 'person', pos: [0.8, 0, 0.2], rot: [0, -0.3, 0], s: 0.78, p: { shirt: '#15102b', hair: '#3a2a1a', pose: 'hold' } },
    ],
    overlays: [{ type: 'big', text: '', count: { to: 1000000 }, sub: 'tope de satélites autorizado', at: 'sumar', y: 62 }] },

  // 3. 58 veces: 1 cubo contra 58
  { id: 'b03', set: 'void', cam: { from: [0.7, 2.5, 8.8], to: [-0.2, 2.3, 7.8], look: [0, 1.45, 0], fov: 46 }, keywords: ['58', 'veces'],
    actors: [
      { type: 'box', pos: [0, 0.95, 0], p: { size: [3.3, 0.06, 0.5], color: '#2d1a6e' } },
      { type: 'box', pos: [-1.2, 1.09, 0], p: { size: [0.2, 0.2, 0.2], color: C.cyan, glow: true } },
      { type: 'label', pos: [-1.2, 1.6, 0.1], p: { text: 'HOY', w: 0.7, h: 0.3, bg: C.blue, size: 0.62 } },
      { type: 'cubes', pos: [0.45, 0.99, 0], at: 0.3, enter: 'none', p: { n: 58, cols: 8, size: 0.2, gap: 0.035, stagger: 0.022 } },
      { type: 'label', pos: [0.45, 3.1, 0.1], at: 'veces', p: { text: 'PERMITIDO', w: 1.3, h: 0.32, ...GOLD } },
    ],
    overlays: [{ type: 'big', text: '× 58', sub: '1.000.000 ÷ 17.247 = 58', at: '58', y: 62 },
      { type: 'tag', text: '1 CUBO = TODOS LOS ACTIVOS DE HOY', at: 'los', x: 50, y: 75.3, color: TAG, size: 38 }] },

  // 4. SpaceX y la red Starmind
  { id: 'b04', cam: { from: [0.9, 2.3, 8.8], to: [0, 2.3, 7.8], look: [0, 1.7, 0], fov: 46 }, keywords: ['SpaceX', 'Starmind.'],
    actors: [
      { type: 'building', pos: [-0.75, 0, -0.3], p: { w: 1.3, h: 1.55, d: 1.0, seed: 9, color: '#2d1a6e' } },
      { type: 'label', pos: [-0.75, 1.85, -0.2], at: 'SpaceX', p: { text: 'SPACEX', w: 1.3, h: 0.4, bg: '#15102b', color: '#fff', border: C.cyan, size: 0.6 } },
      { type: 'person', pos: [0.95, 0, 0.4], rot: [0, -0.5, 0], s: 0.9, p: { shirt: C.cyan, pose: 'point' } },
      { type: 'net', pos: [0, 2.85, 0.2], at: 'red', enter: 'none', p: { n: 5, w: 2.7, zig: 0.2, sc: 0.3 } },
      { type: 'label', pos: [0.75, 2.15, 0.3], at: 'Starmind', p: { text: 'STARMIND', w: 1.45, h: 0.4, ...GOLD } },
    ],
  },

  // 5. Cada satélite sería un centro de datos con energía solar
  { id: 'b05', set: 'void', cam: { from: [-0.9, 2.2, 7.8], to: [0.3, 2.3, 6.8], look: [0, 1.85, 0], fov: 46 }, keywords: ['centro', 'datos:', 'artificial,', 'solar.'],
    actors: [
      { type: 'sat', pos: [0, 2.05, 0], s: 1.15, p: { rackAt: 1.3, sunAt: 5.2, sway: 0.8 }, bob: 0.03 },
      { type: 'label', pos: [0, 3.0, 0.2], at: 'centro', out: 'con', p: { text: 'CENTRO DE DATOS', w: 1.9, h: 0.36, ...GOLD } },
      { type: 'label', pos: [0, 1.3, 0.4], at: 'computadoras', p: { text: 'COMPUTADORAS PARA IA', w: 2.3, h: 0.36, ...LBL } },
      { type: 'sun', pos: [-1.0, 3.0, -0.3], at: 'con', p: { r: 0.26 } },
      { type: 'label', pos: [0.45, 3.0, 0.2], at: 'energía', p: { text: 'ENERGÍA SOLAR', w: 1.6, h: 0.36, ...GOLD } },
    ],
    overlays: [{ type: 'tag', text: 'PROYECTO: TODAVÍA NO EXISTE', at: 0.5, x: 50, y: 75, color: TAG, size: 44 }] },

  // 6. La FCC: primera autorización de este tipo
  { id: 'b06', set: 'room', cam: { from: [0.8, 2.3, 8.6], to: [-0.1, 2.2, 7.5], look: [0, 1.45, 0], fov: 46 }, keywords: ['FCC,', 'comunicaciones', 'primera'],
    actors: [
      { type: 'label', pos: [0, 2.95, -0.4], p: { text: 'FCC', w: 1.3, h: 0.5, bg: '#15102b', color: C.gold, border: C.gold, size: 0.62 } },
      { type: 'person', pos: [-0.95, 0, 0.2], rot: [0, 0.5, 0], s: 1.05, p: { shirt: '#15102b', hair: '#3a2a1a', pose: 'point' } },
      { type: 'phone', pos: [0.2, 2.0, 0.2], rot: [0, -0.2, 0.1], at: 'comunicaciones', out: 'dijo', p: { kind: 'chat' } },
      { type: 'screen', pos: [1.0, 1.65, 0], rot: [0, -0.3, 0], s: 0.6, at: 'Estados', out: 'dijo', p: { kind: 'play', stand: true } },
      { type: 'doc', pos: [0.55, 1.85, 0.3], s: 1.15, at: 'dijo', p: { title: 'AUTORIZACIÓN', stamp: 'LA PRIMERA', stampColor: '#e08a12', stampAt: 0.75 } },
    ],
    overlays: [{ type: 'tag', text: 'FCC = COMISIÓN FEDERAL DE COMUNICACIONES', at: 'regula', x: 50, y: 75.3, color: TAG, size: 36 },
      { type: 'big', text: '1.ª VEZ', sub: 'según la FCC, en la historia de EE.UU.', at: 'primera', y: 62 }] },

  // 7. Amazon, Viasat y la Sociedad Astronómica pidieron rechazarla
  { id: 'b07', cam: { from: [-0.7, 2.2, 9.0], to: [0.2, 2.1, 8.0], look: [0, 1.0, 0], fov: 46 }, keywords: ['Amazon,', 'Viasat', 'Astronómica', 'rechazaran.'],
    actors: [
      { type: 'person', pos: [-1.1, 0, 0], rot: [0, 0.2, 0], s: 0.85, p: { shirt: C.gold, pose: 'hold' } },
      { type: 'label', pos: [-1.1, 1.85, 0.1], at: 0.1, p: { text: 'AMAZON', w: 0.95, h: 0.3, ...LBL } },
      { type: 'person', pos: [0, 0, 0], s: 0.85, at: 'Viasat', p: { shirt: C.blue, hair: '#15102b', skin: '#c98d62', pose: 'hold' } },
      { type: 'label', pos: [0, 1.85, 0.1], at: 'Viasat', p: { text: 'VIASAT', w: 0.9, h: 0.3, ...LBL } },
      { type: 'person', pos: [1.1, 0, 0], rot: [0, -0.2, 0], s: 0.85, at: 'Sociedad', p: { shirt: C.magenta, hair: '#c98a3a', pose: 'hold' } },
      { type: 'label', pos: [0.95, 2.35, 0.1], at: 'Sociedad', p: { text: 'SOC. ASTRONÓMICA', sub: 'ESTADOUNIDENSE', w: 1.5, h: 0.5, bg: '#2d1a6e', size: 0.36 } },
      { type: 'doc', pos: [-1.1, 0.95, 0.4], s: 0.5, at: 'pidieron', p: { stamp: 'DENEGAR', stampColor: C.red, stampAt: 0.2, lines: 3, ph: 1 } },
      { type: 'doc', pos: [0, 0.95, 0.4], s: 0.5, at: 4.15, p: { stamp: 'DENEGAR', stampColor: C.red, stampAt: 0.2, lines: 3, ph: 2 } },
      { type: 'doc', pos: [1.1, 0.95, 0.4], s: 0.5, at: 4.3, p: { stamp: 'DENEGAR', stampColor: C.red, stampAt: 0.2, lines: 3, ph: 3 } },
    ],
    overlays: [{ type: 'tag', text: 'PIDIERON DENEGAR LA SOLICITUD', at: 'pidieron', x: 50, y: 72, color: C.red, size: 46 }] },

  // 8. El organismo descartó los tres pedidos
  { id: 'b08', set: 'room', cam: { from: [0.6, 2.3, 8.0], to: [-0.2, 2.1, 7.1], look: [0, 1.65, 0], fov: 46 }, keywords: ['descartó', 'tres'],
    actors: [
      { type: 'doc', pos: [-1.0, 2.0, 0], s: 0.8, p: { title: 'PEDIDO 1', ph: 1 } },
      { type: 'doc', pos: [0, 2.0, 0], s: 0.8, p: { title: 'PEDIDO 2', ph: 2 } },
      { type: 'doc', pos: [1.0, 2.0, 0], s: 0.8, p: { title: 'PEDIDO 3', ph: 3 } },
      { type: 'cross', pos: [-1.0, 2.0, 0.3], at: 'descartó', p: { size: 0.6 } },
      { type: 'cross', pos: [0, 2.0, 0.3], at: 1.0, p: { size: 0.6 } },
      { type: 'cross', pos: [1.0, 2.0, 0.3], at: 1.3, p: { size: 0.6 } },
      { type: 'desk', pos: [0, 0, 0] },
      { type: 'label', pos: [0, 3.0, -0.3], p: { text: 'FCC', w: 1.0, h: 0.4, bg: '#15102b', color: C.gold, border: C.gold, size: 0.62 } },
    ],
    overlays: [{ type: 'tag', text: '3 PEDIDOS DESCARTADOS', at: 'tres', x: 50, y: 71, color: C.red, size: 52 }] },

  // 9. El permiso solo vale por debajo de los 600 km
  { id: 'b09', set: 'void', cam: { from: [-0.7, 2.4, 8.6], to: [0.2, 2.2, 7.7], look: [0, 1.5, 0], fov: 46 }, keywords: ['solo', 'debajo', '600'],
    actors: [
      { type: 'globe', pos: [0, -1.25, 0], s: 2.3 },
      { type: 'dash', pos: [0, 2.15, 0], p: { w: 3.8, n: 14 } },
      { type: 'sat', pos: [0.45, 1.6, 0.2], s: 0.42, p: { rack: true } },
      { type: 'sat', pos: [-0.5, 2.8, 0], s: 0.42, p: { grey: true } },
      { type: 'check', pos: [1.25, 1.6, 0.3], at: 'permiso', p: { size: 0.4 } },
      { type: 'zone', pos: [0, 2.8, -0.3], at: 'solo', enter: 'none', p: { w: 4.2, h: 1.26, color: C.red, o: 0.22, fade: true } },
      { type: 'cross', pos: [0.5, 2.8, 0.3], at: 'solo', p: { size: 0.4 } },
      { type: 'label', pos: [-1.05, 2.33, 0.3], at: 'debajo', p: { text: '600 KM', w: 0.95, h: 0.3, ...GOLD } },
    ],
    overlays: [{ type: 'big', text: '600 km', sub: 'por ahora, solo por debajo', at: 'los', y: 62 }] },

  // 10. Para ir más arriba: plan final contra la basura espacial
  { id: 'b10', set: 'void', cam: { from: [0.9, 1.7, 7.9], to: [0.2, 2.1, 7.0], look: [0, 2.0, 0], fov: 46 }, keywords: ['arriba,', 'plan', 'basura'],
    actors: [
      { type: 'globe', pos: [0, -1.75, 0], s: 2.3 },
      { type: 'dash', pos: [0, 1.6, 0], p: { w: 3.8, n: 14 } },
      { type: 'label', pos: [1.05, 1.42, 0.3], p: { text: '600 KM', w: 0.9, h: 0.28, ...GOLD } },
      { type: 'sat', pos: [0.2, 1.05, 0.2], s: 0.42, p: { rack: true } },
      { type: 'zone', pos: [0, 2.6, -0.4], p: { w: 4.2, h: 2.0, color: C.red, o: 0.16 } },
      { type: 'arrow', pos: [-1.0, 1.7, 0], at: 'ir', enter: 'none', p: { len: 0.9, color: C.gold, dur: 0.6 } },
      { type: 'doc', pos: [0.5, 2.55, 0.3], s: 1.0, at: 'presentar', p: { title: 'PLAN FINAL', stamp: 'FALTA', stampColor: C.red, stampAt: 0.9 } },
      { type: 'debris', pos: [-0.65, 3.0, 0], at: 'contra', enter: 'none', p: { n: 9, w: 1.3, h: 0.6 } },
    ],
    overlays: [{ type: 'tag', text: 'CONDICIÓN: PLAN FINAL DE BASURA ESPACIAL', at: 'plan', x: 50, y: 73, color: TAG, size: 36 }] },

  // 11. El millón es un tope
  { id: 'b11', cam: { from: [-0.8, 2.5, 9.0], to: [0.1, 2.3, 8.0], look: [0, 1.3, 0], fov: 46 }, keywords: ['tope:', 'no', 'obliga'],
    actors: [
      { type: 'box', pos: [-0.2, 1.35, 0], p: { size: [0.08, 2.7, 0.08], color: '#6b3cff', glow: true } },
      { type: 'box', pos: [1.3, 1.35, 0], p: { size: [0.08, 2.7, 0.08], color: '#6b3cff', glow: true } },
      { type: 'box', pos: [0.55, 2.72, 0], p: { size: [1.8, 0.1, 0.5], color: C.gold, glow: true } },
      { type: 'label', pos: [0.55, 3.05, 0.1], at: 'millón', p: { text: 'TOPE: 1.000.000', w: 1.8, h: 0.36, ...GOLD } },
      { type: 'rocket', pos: [0.55, 0, 0], s: 0.75 },
      { type: 'ring', pos: [0.55, 0.03, 0], p: { r: 0.55, color: C.cyan } },
      { type: 'person', pos: [-1.0, 0, 0.3], rot: [0, 0.4, 0], s: 0.9, p: { shirt: C.cyan, pose: 'idle' }, out: 'no' },
      { type: 'person', pos: [-1.0, 0, 0.3], rot: [0, 0.4, 0], s: 0.9, at: 'no', enter: 'none', p: { shirt: C.cyan, pose: 'shrug' } },
      { type: 'label', pos: [-0.95, 2.05, 0.3], at: 'no', p: { text: 'NO OBLIGA', w: 1.15, h: 0.32, ...LBL } },
    ],
    overlays: [{ type: 'tag', text: 'TOPE, NO COMPROMISO', at: 'tope', x: 50, y: 75, color: TAG, size: 52 }] },

  // 12. Hoy no hay ninguno en órbita
  { id: 'b12', set: 'void', cam: { from: [0.7, 2.4, 8.4], to: [-0.2, 2.2, 7.3], look: [0, 1.5, 0], fov: 46 }, keywords: ['ninguno'],
    actors: [
      { type: 'globe', pos: [0, 2.05, 0], s: 0.8 },
      { type: 'orbitring', pos: [0, 2.05, 0], p: { R: 1.3 } },
    ],
    overlays: [{ type: 'big', text: '0', sub: 'satélites Starmind en órbita hoy', at: 'ninguno', y: 62 }] },

  // 13. Primero en 2027, plazo 2040
  { id: 'b13', cam: { from: [-0.9, 2.4, 9.2], to: [0.1, 2.3, 8.1], look: [0, 1.3, 0], fov: 46 }, keywords: ['2027', '2040'],
    actors: [
      { type: 'rocket', pos: [-0.95, 0, 0], s: 0.8 },
      { type: 'ring', pos: [-0.95, 0.03, 0], p: { r: 0.55, color: C.gold } },
      { type: 'label', pos: [-0.95, 1.95, 0.2], at: 'primero', out: '2027', p: { text: 'EL PRIMERO', w: 1.25, h: 0.32, ...LBL } },
      { type: 'calendar', pos: [-0.95, 2.55, 0.2], rot: [0, 0.2, 0], s: 0.6, at: '2027', p: { top: 'OBJETIVO', big: '2027', color: C.blue } },
      { type: 'arrow', pos: [-0.3, 2.55, 0], rot: [0, 0, -PI / 2], at: 'hasta', enter: 'none', p: { len: 0.5, color: C.gold, dur: 0.4 } },
      { type: 'calendar', pos: [0.95, 2.55, 0.2], rot: [0, -0.2, 0], s: 0.6, at: '2040', p: { top: 'PLAZO', big: '2040', color: C.red } },
      { type: 'net', pos: [0.95, 1.3, 0.2], at: 'completar', enter: 'none', p: { n: 4, w: 1.3, zig: 0.22, sc: 0.26 } },
    ],
    overlays: [{ type: 'tag', text: 'OBJETIVO DE LA EMPRESA, NO CONFIRMADO', at: '2027', out: 'tiene', x: 50, y: 75, color: TAG, size: 36 },
      { type: 'tag', text: 'PLAZO DEL PERMISO: 2040', at: '2040', x: 50, y: 75, color: TAG, size: 48 }] },

  // 14. Hoy 17.000, permitidos un millón
  { id: 'b14', set: 'void', cam: { from: [0.8, 2.4, 8.8], to: [0, 2.2, 7.3], look: [0, 1.5, 0], fov: 46 }, keywords: ['17.000.', 'millón.'],
    actors: [
      { type: 'globe', pos: [0, 2.05, 0], s: 0.72 },
      { type: 'dots', pos: [0, 2.05, 0], p: { n: 90, R0: 0.92, R1: 1.1, color: C.cyan, size: 0.12 } },
      { type: 'dots', pos: [0, 2.05, 0], at: 'Permitidos', enter: 'none', p: { n: 1100, R0: 0.95, R1: 1.32, color: C.gold, size: 0.05, seed: 13, dur: 1.5 } },
    ],
    overlays: [{ type: 'tag', text: 'HOY: 17.000', at: 'Hoy', x: 50, y: 75.3, color: C.blue, size: 46 },
      { type: 'big', text: '1.000.000', sub: 'permitidos', at: 'un', y: 62 }] },

  // 15. ¿Cuántos llegan a volar? Dejá tu número
  { id: 'b15', cam: { from: [-0.6, 2.3, 8.8], to: [0.2, 2.3, 7.9], look: [0, 1.2, 0], fov: 46 }, keywords: ['¿Cuántos', 'volar?', 'número.'],
    actors: [
      { type: 'person', pos: [-0.9, 0, 0.3], rot: [0, 0.4, 0], p: { shirt: C.cyan, pose: 'shrug' } },
      { type: 'ring', pos: [-0.9, 0.03, 0.3], p: { r: 0.55, color: C.cyan } },
      { type: 'label', pos: [0.65, 2.9, 0], at: 0.15, p: { text: '¿1.000?', w: 1.3, h: 0.42, ...LBL } },
      { type: 'label', pos: [0.75, 2.35, 0.1], at: 'creés', p: { text: '¿100.000?', w: 1.5, h: 0.42, ...LBL } },
      { type: 'label', pos: [0.65, 1.8, 0.2], at: 'llegan', p: { text: '¿1.000.000?', w: 1.7, h: 0.42, ...GOLD } },
      { type: 'phone', pos: [0.65, 0.95, 0.5], rot: [0, -0.3, 0], s: 1.1, at: 'Dejá', p: { kind: 'chat' } },
    ],
    overlays: [{ type: 'tag', text: 'DEJÁ TU NÚMERO', at: 'Dejá', x: 50, y: 74.5, color: C.blue, size: 60 }] },

  // 16. Seguime: cuando despegue el primero
  { id: 'b16', set: 'void', cam: { from: [0.7, 2.0, 8.6], to: [0, 2.4, 7.7], look: [0, 1.5, 0], lookTo: [0, 1.75, 0], fov: 46 }, keywords: ['Seguime', 'despegue'],
    actors: [
      { type: 'box', pos: [0, 0.98, 0], p: { size: [1.5, 0.1, 1.0], color: '#2d1a6e' } },
      { type: 'box', pos: [0, 1.04, 0], p: { size: [1.2, 0.03, 0.8], color: C.cyan, glow: true } },
      { type: 'rocket', pos: [0, 1.06, 0], s: 0.7, p: { flame: 1.55 }, move: { to: [0, 1.9, 0], at: 'despegue', dur: 1.3 } },
      { type: 'sat', pos: [-1.1, 2.9, -0.3], s: 0.4, p: { rack: true }, bob: 0.04 },
      { type: 'sat', pos: [1.1, 2.5, -0.3], s: 0.4, at: 'revisamos', p: { rack: true }, bob: 0.04 },
    ],
    overlays: [{ type: 'big', text: 'SEGUIME', sub: 'y lo revisamos cuando despegue', at: 0.05, y: 62 }] },
];
