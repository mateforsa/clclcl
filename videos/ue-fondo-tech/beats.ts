import type { BeatSpec } from '../../src/Beat';
import { C } from '../../src/kit/math';

const PI = Math.PI;
const US = '#2f6bff', CN = '#c0392b', EU = '#1f9d8a';
const ME = { shirt: C.cyan, hair: '#3a2a1a', skin: '#f2c39b' };
const SUIT = { shirt: '#3b4a8a', hair: '#15102b', skin: '#f2c39b' };

export const BEATS: BeatSpec[] = [
  // 1. la diferencia: 52 de cada 100 a EE.UU.
  { id: 'b01', cam: { from: [0.9, 2.7, 9.2], to: [0.2, 2.4, 8.3], look: [0, 1.45, 0], fov: 44 }, keywords: ['100', '52', 'EE.UU.'],
    actors: [
      { type: 'region', pos: [-1.12, 0, 0], p: { name: 'EE.UU.', color: US, n: 20, val: '52', delay: 2.6, dur: 1.4, lit: true } },
      { type: 'region', pos: [0, 0, 0], p: { name: 'CHINA', color: CN } },
      { type: 'region', pos: [1.12, 0, 0], p: { name: 'EUROPA', color: EU } },
      { type: 'label', pos: [0.6, 2.2, -0.2], p: { text: 'DE CADA US$ 100', w: 1.9, h: 0.42, bg: C.gold, color: '#1a1030', size: 0.62, weight: 900 } },
    ],
    overlays: [{ type: 'pill', text: 'CAPITAL DE RIESGO EN EL MUNDO', at: 'capital' }] },
  // 2. 40 a China, 5 a la UE
  { id: 'b02', set: 'void', cam: { from: [-0.9, 2.5, 8.8], to: [0.3, 2.3, 8.0], look: [0.1, 1.4, 0], fov: 44 }, keywords: ['40', '5,', 'UE.'],
    actors: [
      { type: 'region', pos: [-1.12, 0, 0], p: { name: 'EE.UU.', color: US, n: 20, val: '52', delay: -5, dur: 0.1 } },
      { type: 'region', pos: [0, 0, 0], p: { name: 'CHINA', color: CN, n: 15, val: '40', delay: 0.1, dur: 1.0 } },
      { type: 'region', pos: [1.12, 0, 0], at: 0, enter: 'none', p: { name: 'EUROPA', color: EU, n: 2, val: '5', delay: 2.0, dur: 0.4, lit: true } },
      { type: 'ring', pos: [1.12, 0.03, 0], at: '5', p: { r: 0.75, color: C.gold } },
    ],
    overlays: [{ type: 'pill', text: 'REPARTO DE CADA US$ 100', at: 0.2, out: '5' }, { type: 'pill', text: '5 DE CADA 100 VAN A LA UE', at: '5' }] },
  // 3. la propuesta
  { id: 'b03', cam: { from: [0.8, 2.6, 8.8], to: [0.1, 2.3, 7.9], look: [0, 1.5, 0], fov: 46 }, keywords: ['25', 'Comisión', 'fondo'],
    actors: [
      { type: 'building', pos: [-0.75, 0, -0.4], rot: [0, 0.22, 0], p: { w: 1.5, h: 2.0, d: 1.0, seed: 4, color: '#1f3a8a', sign: 'COMISIÓN EUROPEA' } },
      { type: 'calendar', pos: [0.95, 2.4, 0.1], rot: [0, -0.22, 0], s: 0.62, at: 0.15, p: { top: 'NOV 2026', big: '25', color: C.blue } },
      { type: 'person', pos: [0.35, 0, 0.9], rot: [0, -0.3, 0], s: 0.8, p: { ...SUIT, pose: 'idle' }, out: 'propuso' },
      { type: 'person', pos: [0.35, 0, 0.9], rot: [0, -0.3, 0], s: 0.8, at: 'propuso', enter: 'none', p: { ...SUIT, pose: 'hold' } },
      { type: 'label', pos: [1.0, 1.62, 0.3], at: 'propuso', p: { text: 'PROPUESTA', w: 1.35, h: 0.4, bg: C.gold, color: '#1a1030', size: 0.62, weight: 900 } },
    ],
    overlays: [{ type: 'pill', text: 'BRUSELAS · 25 NOV 2026', at: 0.3, out: 'fondo' }, { type: 'pill', text: 'UN FONDO PARA TECNOLOGÍA', at: 'fondo' }] },
  // 4. la meta
  { id: 'b04', set: 'void', cam: { from: [-0.6, 2.4, 7.9], to: [0.1, 2.2, 7.2], look: [0, 0.95, 0], fov: 44 }, keywords: ['hasta', '50.000', 'euros.'],
    actors: [
      { type: 'ring', pos: [0, 0.03, 0], p: { r: 1.45, color: C.cyan } },
      { type: 'pot', pos: [0, 0, 0], rot: [0, 0.12, 0], p: { sign: 'FONDO TECNOLÓGICO UE', fill: 1, from: 0, delay: 0.9, dur: 1.6, ghost: true } },
      { type: 'label', pos: [0.75, 1.72, 0.75], rot: [0, 0.12, 0], at: 'meta', p: { text: 'META', w: 0.8, h: 0.34, bg: C.cyan, color: '#1a1030', size: 0.66, weight: 900 } },
    ],
    overlays: [{ type: 'big', text: '', count: { to: 50000, pre: '€ ', post: ' M' }, sub: 'hasta 50.000 millones de euros', at: '50.000', size: 104 }] },
  // 5. qué compraría
  { id: 'b05', set: 'room', cam: { from: [0.7, 2.4, 7.4], to: [0, 2.2, 6.7], look: [0, 1.6, -0.6], fov: 46, shift: 0.06 }, keywords: ['compraría', 'inteligencia', 'artificial', 'cuántica.'],
    actors: [
      { type: 'coins', pos: [0, 0, -0.2], enter: 'none', p: { n: 9, dur: 0.6, r: 0.4 } },
      { type: 'label', pos: [0, 1.15, -0.2], p: { text: 'FONDO', w: 1.0, h: 0.34, bg: '#15102b', color: C.gold, size: 0.64, weight: 900 } },
      { type: 'chip', pos: [-0.85, 2.25, -0.6], rot: [PI / 2, 0, 0], s: 0.95, bob: 0.04, p: {} },
      { type: 'label', pos: [-0.85, 1.48, -0.5], at: 'inteligencia', p: { text: 'IA', w: 0.9, h: 0.36, bg: '#1f9d55', size: 0.7, weight: 900 } },
      { type: 'atom', pos: [0.88, 2.25, -0.6], bob: 0.04, p: { r: 0.52 } },
      { type: 'label', pos: [0.88, 1.48, -0.5], at: 'computación', p: { text: 'CUÁNTICA', w: 1.2, h: 0.36, bg: C.magenta, size: 0.64, weight: 900 } },
    ],
    overlays: [{ type: 'pill', text: 'COMPRARÍA PARTES DE EMPRESAS', at: 'compraría' }] },
  // 6. apuestas más grandes y largas
  { id: 'b06', cam: { from: [-0.8, 2.6, 8.6], to: [0, 2.3, 7.8], look: [0, 1.45, 0], fov: 44 }, keywords: ['grandes', 'largo', 'plazo'],
    actors: [
      { type: 'bars', pos: [0, 0, 0], enter: 'none', p: { vals: [0.7, 2.3], colors: ['#8a6bff', C.gold], w: 0.85, gap: 0.7, dur: 0.8, stagger: 1.0 } },
      { type: 'label', pos: [-0.78, 1.05, 0], p: { text: 'HOY', w: 0.95, h: 0.36, bg: '#2d1a6e', size: 0.66, weight: 900 } },
      { type: 'label', pos: [0.78, 2.68, 0], at: 'grandes', p: { text: 'EL FONDO', w: 1.25, h: 0.38, bg: C.gold, color: '#1a1030', size: 0.64, weight: 900 } },
      { type: 'arrow', pos: [-0.78, 1.4, 0], rot: [0, 0, -0.85], at: 'grandes', enter: 'none', p: { len: 0.9, color: C.green, dur: 0.6 } },
    ],
    overlays: [{ type: 'pill', text: 'MÁS GRANDES', at: 'grandes', out: 'largo' }, { type: 'pill', text: 'A MÁS LARGO PLAZO', at: 'largo' }] },
  // 7. es un plan
  { id: 'b07', set: 'void', cam: { from: [0.6, 2.4, 7.8], to: [0, 2.2, 7.1], look: [0, 1.5, 0], fov: 44 }, keywords: ['plan.', 'todavía'],
    actors: [
      { type: 'ring', pos: [0, 0.03, 0], p: { r: 1.45, color: C.red } },
      { type: 'pot', pos: [0, 0, 0], rot: [0, -0.12, 0], p: { sign: 'FONDO: VACÍO', fill: 0, from: 0, alarm: true } },
      { type: 'label', pos: [0, 2.85, 0.1], at: 0.15, p: { text: 'ES UN PLAN', w: 1.9, h: 0.5, bg: C.gold, color: '#1a1030', size: 0.64, weight: 900 } },
      { type: 'label', pos: [0, 0.95, 0.66], at: 'plata', p: { text: '€ 0', w: 1.0, h: 0.6, color: '#ff8b96', size: 0.8, weight: 900 } },
    ],
    overlays: [{ type: 'pill', text: 'LA PLATA TODAVÍA NO ESTÁ', at: 'plata', red: true }] },
  // 8. de dónde sale
  { id: 'b08', set: 'room', cam: { from: [-0.7, 2.4, 7.6], to: [0, 2.2, 6.9], look: [0, 1.45, -0.5], fov: 46, shift: 0.06 }, keywords: ['dónde', 'Banco', 'Inversiones.'],
    actors: [
      { type: 'person', pos: [-0.75, 0, -0.3], rot: [0, 0.6, 0], p: { ...SUIT, pose: 'shrug' }, out: 'Comisión' },
      { type: 'person', pos: [-0.75, 0, -0.3], rot: [0, 0.9, 0], at: 'Comisión', enter: 'none', p: { ...SUIT, pose: 'point' } },
      { type: 'label', pos: [-0.75, 2.2, -0.3], p: { text: 'COMISIÓN', w: 1.2, h: 0.34, bg: '#1f3a8a', size: 0.64, weight: 900 } },
      { type: 'label', pos: [0.2, 2.85, -0.4], at: 0.2, out: 'Comisión', p: { text: '¿DE DÓNDE SALE?', w: 2.0, h: 0.46, bg: C.red, size: 0.62, weight: 900 } },
      { type: 'person', pos: [0.8, 0, -0.3], rot: [0, -0.9, 0], at: 'habla', p: { shirt: C.gold, hair: '#5a3a1a', skin: '#e0ac69', pose: 'idle' } },
      { type: 'label', pos: [0.8, 2.2, -0.3], at: 'habla', p: { text: 'BANCO EUROPEO', w: 1.35, h: 0.34, bg: C.gold, color: '#1a1030', size: 0.62, weight: 900 } },
    ],
    overlays: [{ type: 'pill', text: 'FINANCIAMIENTO: SIN DEFINIR', at: 'definió', red: true, out: 'Comisión' }, { type: 'pill', text: 'CONVERSACIONES CON EL BEI', at: 'habla' }] },
  // 9. febrero
  { id: 'b09', cam: { from: [0.5, 2.3, 7.2], to: [0, 2.2, 6.6], look: [0, 1.7, 0], fov: 44 }, keywords: ['febrero.'],
    actors: [
      { type: 'ring', pos: [0, 0.03, 0], p: { r: 1.1, color: C.cyan } },
      { type: 'calendar', pos: [0, 1.85, 0], rot: [0, -0.12, 0], s: 1.05, bob: 0.03, p: { top: 'FEBRERO', big: '2027', color: C.red } },
    ],
    overlays: [{ type: 'pill', text: 'DETALLES: FEBRERO DE 2027', at: 'febrero' }] },
  // 10. conversión con fuente
  { id: 'b10', set: 'void', cam: { from: [-0.7, 2.5, 8.4], to: [0.1, 2.3, 7.6], look: [0, 1.05, 0], fov: 44 }, keywords: ['55.000', 'Reuters.'],
    actors: [
      { type: 'coins', pos: [-0.85, 0, 0], enter: 'none', p: { n: 15, dur: 0.7, r: 0.42 } },
      { type: 'label', pos: [-0.85, 1.85, 0], p: { text: '€ 50.000 M', w: 1.45, h: 0.42, bg: C.cyan, color: '#1a1030', size: 0.64, weight: 900 } },
      { type: 'label', pos: [0, 2.55, 0], at: 'son', p: { text: '=', w: 0.5, h: 0.5, color: '#fff', size: 0.9, weight: 900 } },
      { type: 'coins', pos: [0.85, 0, 0], at: 'son', enter: 'none', p: { n: 15, dur: 0.7, r: 0.42 } },
      { type: 'label', pos: [0.85, 1.85, 0], at: '55.000', p: { text: '≈ US$ 55.000 M', w: 1.6, h: 0.42, bg: C.gold, color: '#1a1030', size: 0.62, weight: 900 } },
    ],
    overlays: [{ type: 'big', text: '', count: { to: 54730, pre: '≈ US$ ', post: ' M' }, sub: 'equivalencia publicada por Reuters', at: '55.000', size: 92 }] },
  // 11. la comparación
  { id: 'b11', cam: { from: [0.8, 2.7, 9.0], to: [0, 2.4, 8.1], look: [0, 1.65, 0], fov: 44 }, keywords: ['Anthropic', '81.300', 'día,'],
    actors: [
      { type: 'bars', pos: [0, 0, 0], enter: 'none', p: { vals: [1.62, 2.4], colors: [EU, C.magenta], w: 0.95, gap: 0.6, dur: 0.7, stagger: 0.9 } },
      { type: 'label', pos: [-0.78, 2.05, 0], p: { text: 'FONDO UE', w: 1.3, h: 0.34, bg: '#15102b', color: '#fff', size: 0.64, weight: 900, sub: undefined } },
      { type: 'label', pos: [-0.78, 1.0, 0.5], p: { text: '≈ 55.000 M', w: 1.0, h: 0.3, color: '#fff', size: 0.72, weight: 900 } },
      { type: 'label', pos: [0.78, 2.85, 0], at: 0.9, p: { text: 'ANTHROPIC', w: 1.35, h: 0.34, bg: '#15102b', color: '#fff', size: 0.64, weight: 900 } },
      { type: 'label', pos: [0.78, 1.4, 0.5], at: '81.300', p: { text: '81.300 M', w: 1.0, h: 0.3, color: '#fff', size: 0.72, weight: 900 } },
      { type: 'label', pos: [0.78, 3.22, 0], at: 'solo', p: { text: 'EN 1 DÍA', w: 1.0, h: 0.3, bg: C.gold, color: '#1a1030', size: 0.66, weight: 900 } },
    ],
    overlays: [{ type: 'big', text: '', count: { to: 81300, pre: 'US$ ', post: ' M' }, sub: 'salida a bolsa de Anthropic, en un día', at: '81.300', size: 100 }] },
  // 12. una décima parte
  { id: 'b12', set: 'void', cam: { from: [-0.5, 2.3, 7.8], to: [0.2, 2.2, 7.1], look: [0, 1.75, 0], fov: 44 }, keywords: ['funcionarios', 'décima', 'parte'],
    actors: [
      { type: 'tenth', pos: [0, 1.95, 0], p: { delay: 2.6, gap: 0.5, s: 0.42 } },
      { type: 'label', pos: [0, 2.8, 0], p: { text: 'LO QUE HARÍA FALTA', w: 2.4, h: 0.38, bg: '#2d1a6e', size: 0.62, weight: 900 } },
      { type: 'label', pos: [-0.75, 1.12, 0.2], at: 'décima', p: { text: 'EL FONDO', w: 1.15, h: 0.34, bg: C.gold, color: '#1a1030', size: 0.64, weight: 900 } },
    ],
    overlays: [{ type: 'big', text: '1 de 10', sub: 'según funcionarios europeos (vía FT)', at: 'décima', size: 104 }] },
  // 13. pregunta
  { id: 'b13', set: 'room', cam: { from: [0.5, 2.3, 6.9], to: [-0.1, 2.1, 6.3], look: [0, 1.5, -0.6], fov: 46, shift: 0.06 }, keywords: ['Alcanza', 'poco?'],
    actors: [
      { type: 'person', pos: [0, 0, -0.5], p: { ...ME, pose: 'shrug' } },
      { type: 'label', pos: [-0.74, 2.5, -0.6], rot: [0, 0.15, 0], at: 0.05, p: { text: 'ALCANZA', w: 1.35, h: 0.5, bg: C.blue, size: 0.6, weight: 900 } },
      { type: 'label', pos: [0.74, 2.5, -0.6], rot: [0, -0.15, 0], at: 'poco', p: { text: 'ES POCO', w: 1.35, h: 0.5, bg: C.magenta, size: 0.6, weight: 900 } },
    ],
    overlays: [{ type: 'pill', text: 'COMENTÁ CON UNA PALABRA', at: 'poco' }] },
  // 14. motivo para seguir
  { id: 'b14', cam: { from: [0.4, 2.2, 6.9], to: [0, 2.0, 6.0], look: [0, 1.25, 0], fov: 44 },
    actors: [
      { type: 'ring', pos: [0, 0.03, 0], p: { r: 0.9, color: C.cyan } },
      { type: 'person', pos: [0.15, 0, 0], p: { ...ME, pose: 'point' } },
      { type: 'calendar', pos: [-0.85, 1.75, 0.2], rot: [0, 0.3, 0], s: 0.55, at: 0.15, bob: 0.04, p: { top: 'FEBRERO', big: '2027', color: C.red } },
    ],
    overlays: [{ type: 'big', text: 'SEGUIME', sub: 'en febrero te cuento si la plata aparece', at: 0.15, size: 110 }] },
];
