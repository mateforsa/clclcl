import type { BeatSpec } from '../../src/Beat';
import { C } from '../../src/kit/math';

const PI = Math.PI;
const ME = { shirt: C.cyan, hair: '#3a2a1a', skin: '#f2c39b' };
const GUY = { shirt: '#3b4a8a', hair: '#15102b', skin: '#f2c39b' };   // muñeco genérico
const L = (text: string, w: number, bg: string, extra: any = {}) => ({ text, w, h: 0.42, bg, size: 0.66, weight: 900, ...extra });
const DARK = '#15102b';

export const BEATS: BeatSpec[] = [
  // 1. un dólar, tres precios
  { id: 'b01', cam: { from: [0.7, 2.4, 7.8], to: [0, 2.2, 6.9], look: [0, 1.75, 0], fov: 44 }, keywords: ['26', 'tres'],
    actors: [
      { type: 'ring', pos: [0, 0.03, 0], p: { r: 1.4, color: C.green } },
      { type: 'bill', pos: [0, 2.1, 0], s: 1.25, bob: 0.06, p: { w: 1.9, swing: 0.25 } },
      { type: 'label', pos: [-1.0, 1.2, 0.3], rot: [0, 0.2, 0], at: 'tres', p: L('$ 1.630', 1.05, C.cyan, { color: '#1a1030' }) },
      { type: 'label', pos: [0, 0.85, 0.5], at: 2.95, p: L('$ 1.710', 1.05, C.blue) },
      { type: 'label', pos: [1.0, 1.2, 0.3], rot: [0, -0.2, 0], at: 3.2, p: L('$ 1.770', 1.05, C.magenta) },
    ],
    overlays: [{ type: 'pill', text: 'JUEVES 26 NOV 2026 · ARGENTINA', at: 0.1 }] },
  // 2. los tres precios, de a uno
  { id: 'b02', set: 'void', cam: { from: [-0.7, 2.5, 8.8], to: [0.1, 2.3, 8.0], look: [0, 1.5, 0], fov: 44 }, keywords: ['1.630', '1.710', '1.770'],
    actors: [
      { type: 'box', pos: [-1.1, 0.4, 0], p: { size: [0.95, 0.8, 0.8], color: C.cyan, glow: true, ei: 0.45 } },
      { type: 'bill', pos: [-1.1, 1.85, 0], p: { w: 0.95 } },
      { type: 'label', pos: [-1.1, 1.25, 0.1], at: 0.15, p: L('1.630', 0.95, DARK, { color: C.cyan }) },
      { type: 'label', pos: [-1.1, 0.4, 0.42], at: 0.15, p: { text: 'OFICIAL', w: 0.9, h: 0.26, color: '#1a1030', size: 0.74, weight: 900, depth: 0 } },
      { type: 'box', pos: [0, 0.65, 0], at: '1.710', enter: 'grow', p: { size: [0.95, 1.3, 0.8], color: C.blue, glow: true, ei: 0.45 } },
      { type: 'bill', pos: [0, 2.35, 0], at: '1.710', p: { w: 0.95 } },
      { type: 'label', pos: [0, 1.75, 0.1], at: '1.710', p: L('1.710', 0.95, DARK, { color: '#8fb4ff' }) },
      { type: 'label', pos: [0, 0.4, 0.42], at: '1.710', p: { text: 'BLUE', w: 0.9, h: 0.26, color: '#fff', size: 0.74, weight: 900, depth: 0 } },
      { type: 'box', pos: [1.1, 0.85, 0], at: 'cerca', enter: 'grow', p: { size: [0.95, 1.7, 0.8], color: C.magenta, glow: true, ei: 0.45 } },
      { type: 'bill', pos: [1.1, 2.75, 0], at: 'cerca', p: { w: 0.95 } },
      { type: 'label', pos: [1.1, 2.15, 0.1], at: '1.770', p: L('≈ 1.770', 0.95, DARK, { color: '#ff9bd8' }) },
      { type: 'label', pos: [1.1, 0.4, 0.42], at: 'cerca', p: { text: 'CCL', w: 0.9, h: 0.26, color: '#fff', size: 0.74, weight: 900, depth: 0 } },
    ],
    overlays: [{ type: 'pill', text: 'PESOS POR DÓLAR · 26/11/2026', at: 0.3 },
      { type: 'tag', text: 'las alturas no están a escala', at: '1.710', x: 50, y: 71, color: '#2d1a6e', size: 34 }] },
  // 3. oficial
  { id: 'b03', cam: { from: [0.9, 2.5, 8.6], to: [0.2, 2.2, 7.7], look: [0, 1.45, 0], fov: 44 }, keywords: ['oficial', 'banco', '1.630'],
    actors: [
      { type: 'bank', pos: [0, 0, -0.2], rot: [0, 0.12, 0], p: { sign: 'BANCO' } },
      { type: 'label', pos: [0, 2.95, 0], at: 'oficial', p: L('OFICIAL', 1.5, C.cyan, { color: '#1a1030' }) },
      { type: 'person', pos: [0.9, 0, 1.0], rot: [0, -2.6, 0], s: 0.8, p: { ...ME, pose: 'hold' } },
      { type: 'bill', pos: [0.55, 0.95, 0.75], at: 'vende', p: { w: 0.6 } },
    ],
    overlays: [{ type: 'big', text: '$ 1.630', sub: 'Banco Nación, venta · 26/11/2026', at: '1.630', size: 110 }] },
  // 4. récord tras siete subas
  { id: 'b04', set: 'void', cam: { from: [-0.6, 2.4, 8.6], to: [0.2, 2.2, 7.8], look: [0, 1.4, 0], fov: 44 }, keywords: ['alto', 'siete'],
    actors: [
      { type: 'bars', pos: [0, 0, 0], enter: 'none', p: { vals: [0.7, 0.95, 1.2, 1.45, 1.7, 1.95, 2.2], colors: [C.cyan, C.cyan, C.cyan, C.cyan, C.cyan, C.cyan, C.gold], w: 0.3, gap: 0.12, dur: 0.35, stagger: 0.3 } },
      { type: 'label', pos: [1.26, 2.5, 0], at: 'alto', p: L('1.630', 0.95, C.gold, { color: '#1a1030' }) },
      { type: 'label', pos: [-0.5, 2.75, 0], at: 'siete', p: L('7 SUBAS SEGUIDAS', 2.0, DARK, { color: C.gold }) },
      { type: 'label', pos: [0, 0.16, 0.75], p: { text: 'RUEDAS · ESQUEMA, NO A ESCALA', w: 2.8, h: 0.22, color: '#b9a3e8', size: 0.7, weight: 700 } },
    ],
    overlays: [{ type: 'pill', text: 'CIERRE DEL 25/11: MÁXIMO NOMINAL', at: 'más' }] },
  // 5. blue
  { id: 'b05', cam: { from: [-0.8, 2.3, 7.6], to: [0, 2.1, 6.8], look: [0, 1.3, 0], fov: 46 }, keywords: ['blue', 'calle', '1.710'],
    actors: [
      { type: 'building', pos: [-1.5, 0, -2.2], p: { w: 1.3, h: 3.4, d: 1.0, seed: 4 } },
      { type: 'building', pos: [1.5, 0, -2.4], p: { w: 1.3, h: 2.8, d: 1.0, seed: 9 } },
      { type: 'person', pos: [-0.6, 0, 0], rot: [0, PI / 2, 0], p: { ...GUY, pose: 'hold' } },
      { type: 'person', pos: [0.6, 0, 0], rot: [0, -PI / 2, 0], p: { shirt: C.gold, hair: '#7a3b1a', skin: '#c98d62', pose: 'hold' } },
      { type: 'bill', pos: [0, 1.12, 0.1], at: 0.3, bob: 0.05, p: { w: 0.62 } },
      { type: 'label', pos: [0, 2.45, 0], at: 'blue', p: L('BLUE', 1.3, C.blue) },
      { type: 'label', pos: [0, 2.0, 0], at: 'calle', p: { text: 'INFORMAL · SIN BANCO', w: 1.7, h: 0.28, bg: DARK, color: '#fff', size: 0.64, weight: 800 } },
    ],
    overlays: [{ type: 'big', text: '$ 1.710', sub: 'blue, venta · 26/11/2026', at: '1.710', size: 110 }] },
  // 6. MEP
  { id: 'b06', set: 'room', cam: { from: [0.8, 2.3, 7.0], to: [0.1, 2.1, 6.3], look: [0, 1.4, -0.6], fov: 46, shift: 0.05 }, keywords: ['MEP', 'bonos', '1.670'],
    actors: [
      { type: 'desk', pos: [-0.5, 0, -0.6] },
      { type: 'laptop', pos: [-0.5, 0.82, -0.6], p: { kind: 'code' } },
      { type: 'person', pos: [-0.5, 0, 0.1], rot: [0, PI, 0], p: { ...ME, pose: 'type' } },
      { type: 'paper', pos: [0.95, 1.55, -0.5], rot: [0, -0.25, 0], at: 'bonos', bob: 0.04, p: { text: 'BONO', w: 0.95, color: '#1f6f43' } },
      { type: 'label', pos: [-0.5, 2.55, -0.6], at: 'MEP', p: L('MEP', 1.2, C.green, { color: '#1a1030' }) },
      { type: 'label', pos: [-0.5, 2.1, -0.6], at: 'legal', p: { text: 'LEGAL · CON BONOS', w: 1.6, h: 0.28, bg: DARK, color: '#fff', size: 0.64, weight: 800 } },
    ],
    overlays: [{ type: 'big', text: '≈ $ 1.670', sub: 'MEP · 26/11/2026', at: '1.670', size: 110 }] },
  // 7. CCL
  { id: 'b07', set: 'void', cam: { from: [-0.7, 2.5, 8.6], to: [0.2, 2.2, 7.7], look: [0, 1.5, 0], fov: 44 }, keywords: ['CCL', 'afuera', '1.770'],
    actors: [
      { type: 'ring', pos: [0, 0.03, 0], p: { r: 1.5, color: C.magenta } },
      { type: 'paper', pos: [-1.0, 1.3, 0], rot: [0, 0.25, 0], bob: 0.04, p: { text: 'BONO', w: 0.9, color: '#1f6f43' } },
      { type: 'globe', pos: [0.95, 1.5, 0], s: 0.78, at: 'deja' },
      { type: 'bill', pos: [-0.9, 1.35, 0.4], at: 'dólares', p: { w: 0.62 }, move: { to: [0.95, 2.65, 0.3], at: 'afuera', dur: 1.1 } },
      { type: 'label', pos: [0, 3.0, 0], at: 0.5, p: L('CONTADO CON LIQUIDACIÓN', 2.9, C.magenta) },
      { type: 'label', pos: [-1.0, 2.25, 0], at: 'CCL', p: L('CCL', 0.95, DARK, { color: '#ff9bd8' }) },
    ],
    overlays: [{ type: 'big', text: '≈ $ 1.770', sub: 'CCL · 26/11 · varía según el medio', at: '1.770', size: 110 }] },
  // 8. cuatro mercados
  { id: 'b08', cam: { from: [0.6, 2.6, 8.8], to: [0, 2.4, 8.2], look: [0, 1.5, 0], fov: 44 }, keywords: ['mercado', 'distinto'],
    actors: [
      { type: 'box', pos: [-1.2, 0.7, 0], p: { size: [0.7, 1.4, 0.7], color: C.cyan, glow: true, ei: 0.45 } },
      { type: 'box', pos: [-0.4, 0.7, 0], p: { size: [0.7, 1.4, 0.7], color: C.blue, glow: true, ei: 0.45 } },
      { type: 'box', pos: [0.4, 0.7, 0], p: { size: [0.7, 1.4, 0.7], color: C.green, glow: true, ei: 0.45 } },
      { type: 'box', pos: [1.2, 0.7, 0], p: { size: [0.7, 1.4, 0.7], color: C.magenta, glow: true, ei: 0.45 } },
      { type: 'label', pos: [-1.2, 1.65, 0], p: { text: 'BANCO', w: 0.74, h: 0.3, bg: DARK, color: '#fff', size: 0.66, weight: 900 } },
      { type: 'label', pos: [-0.4, 2.05, 0], at: 0.3, p: { text: 'CALLE', w: 0.74, h: 0.3, bg: DARK, color: '#fff', size: 0.66, weight: 900 } },
      { type: 'label', pos: [0.4, 1.65, 0], at: 0.6, p: { text: 'BOLSA', w: 0.74, h: 0.3, bg: DARK, color: '#fff', size: 0.66, weight: 900 } },
      { type: 'label', pos: [1.2, 2.05, 0], at: 0.9, p: { text: 'AFUERA', w: 0.74, h: 0.3, bg: DARK, color: '#fff', size: 0.66, weight: 900 } },
      { type: 'label', pos: [-1.2, 0.8, 0.36], p: { text: 'OFICIAL', w: 0.66, h: 0.22, color: '#1a1030', size: 0.74, weight: 900, depth: 0 } },
      { type: 'label', pos: [-0.4, 0.8, 0.36], p: { text: 'BLUE', w: 0.66, h: 0.22, color: '#fff', size: 0.74, weight: 900, depth: 0 } },
      { type: 'label', pos: [0.4, 0.8, 0.36], p: { text: 'MEP', w: 0.66, h: 0.22, color: '#1a1030', size: 0.74, weight: 900, depth: 0 } },
      { type: 'label', pos: [1.2, 0.8, 0.36], p: { text: 'CCL', w: 0.66, h: 0.22, color: '#fff', size: 0.74, weight: 900, depth: 0 } },
      { type: 'bill', pos: [0, 2.9, 0], s: 0.9, bob: 0.05, p: { w: 1.2 } },
    ],
    overlays: [{ type: 'pill', text: 'CADA MERCADO, SUS REGLAS', at: 'mercado' }] },
  // 9. la brecha
  { id: 'b09', set: 'void', cam: { from: [-0.6, 2.5, 8.4], to: [0.1, 2.3, 7.6], look: [0, 1.5, 0], fov: 44 }, keywords: ['barato', 'caro', 'brecha'],
    actors: [
      { type: 'gap', pos: [0, 0, 0], p: { h1: 1.3, h2: 2.5, delay: 2.5, loName: 'OFICIAL', hiName: 'CCL' } },
      { type: 'label', pos: [-0.95, 2.05, 0], at: 'barato', p: { text: 'EL MÁS BARATO', w: 1.25, h: 0.26, color: C.cyan, size: 0.7, weight: 900 } },
      { type: 'label', pos: [0.95, 3.2, 0], at: 'caro', p: { text: 'EL MÁS CARO', w: 1.25, h: 0.26, color: '#ff9bd8', size: 0.7, weight: 900 } },
    ],
    overlays: [{ type: 'pill', text: 'BRECHA = LA DIFERENCIA', at: 'brecha' }] },
  // 10. la cuenta
  { id: 'b10', cam: { from: [0.7, 2.4, 8.2], to: [0, 2.2, 7.4], look: [0, 1.7, 0], fov: 44 }, keywords: ['140', '9'],
    actors: [
      { type: 'ring', pos: [0, 0.03, 0], p: { r: 1.4, color: C.gold } },
      { type: 'label', pos: [0, 2.75, 0], p: L('1.770 − 1.630', 2.5, DARK, { color: '#fff', h: 0.5 }) },
      { type: 'label', pos: [0, 2.1, 0], at: '140', p: L('= 140 PESOS', 2.3, C.gold, { color: '#1a1030', h: 0.5 }) },
      { type: 'label', pos: [0, 1.5, 0], at: 'cerca', p: { text: '140 ÷ 1.630 = 8,6%', w: 2.3, h: 0.36, bg: '#2d1a6e', color: '#fff', size: 0.64, weight: 800 } },
      { type: 'coins', pos: [1.05, 0, 0.4], at: '140', enter: 'none', p: { n: 7, dur: 0.8, r: 0.3 } },
    ],
    overlays: [{ type: 'big', text: '≈ 9%', sub: 'brecha entre oficial y CCL · 26/11', at: '9', size: 120 }] },
  // 11. Caputo
  { id: 'b11', set: 'room', cam: { from: [-0.7, 2.3, 7.2], to: [0, 2.1, 6.5], look: [0, 1.35, -0.4], fov: 46 }, keywords: ['Caputo', 'preocupa', 'precios'],
    actors: [
      { type: 'podium', pos: [0, 0, 0] },
      { type: 'person', pos: [0, 0, -0.55], p: { shirt: '#2a2350', hair: '#8d8aa0', skin: '#f2c39b', pose: 'idle' }, out: 'dijo' },
      { type: 'person', pos: [0, 0, -0.55], at: 'dijo', enter: 'none', p: { shirt: '#2a2350', hair: '#8d8aa0', skin: '#f2c39b', pose: 'shrug' } },
      { type: 'label', pos: [0, 2.6, -0.5], at: 'suba', p: L('DIJO: NO LE PREOCUPA', 2.5, DARK, { color: C.gold }) },
      { type: 'arrow', pos: [1.25, 0.3, -0.3], s: 0.6, at: 'traslado', enter: 'none', p: { len: 1.2, color: C.cyan, dur: 0.8 } },
    ],
    overlays: [{ type: 'plate', name: 'Luis Caputo', role: 'ministro de Economía', at: 'Luis', out: 'espera' },
      { type: 'pill', text: 'ESPERA POCO TRASLADO A PRECIOS', at: 'espera' }] },
  // 12. se ve en la inflación
  { id: 'b12', cam: { from: [0.7, 2.3, 7.8], to: [0.1, 2.1, 7.2], look: [0, 1.3, 0], fov: 46 }, keywords: ['datos', 'inflación'],
    actors: [
      { type: 'shelf', pos: [-0.6, 0, -0.6], p: { w: 1.7, rows: 3, seed: 2 } },
      { type: 'cart', pos: [0.75, 0, 0.5], rot: [0, 0.5, 0], p: { n: 5, stagger: 0.12 } },
      { type: 'calendar', pos: [0.95, 2.35, -0.3], rot: [0, -0.25, 0], s: 0.6, at: 0.2, p: { top: 'PRÓXIMO DATO', big: 'IPC', color: C.red } },
    ],
    overlays: [{ type: 'pill', text: 'SE VE EN EL DATO DE INFLACIÓN', at: 'datos' }] },
  // 13. aviso
  { id: 'b13', set: 'void', cam: { from: [-0.4, 2.2, 7.4], to: [0.1, 2.1, 7.0], look: [0, 1.6, 0], fov: 44 }, keywords: ['consejo'],
    actors: [
      { type: 'label', pos: [0, 2.55, 0], p: { text: 'NO ES CONSEJO DE INVERSIÓN', w: 2.8, h: 0.52, bg: C.gold, color: '#1a1030', size: 0.6, weight: 900 } },
      { type: 'bill', pos: [0, 1.3, 0.2], s: 1.1, p: { w: 1.6 } },
      { type: 'ring', pos: [0, 0.03, 0], p: { r: 1.2, color: C.gold } },
    ],
    overlays: [{ type: 'pill', text: 'SOLO DATOS, CON FECHA', at: 0.3 }] },
  // 14. la pregunta
  { id: 'b14', set: 'room', cam: { from: [0.5, 2.3, 7.2], to: [-0.1, 2.1, 6.6], look: [0, 1.55, -0.6], fov: 46, shift: 0.05 }, keywords: ['cuál', 'Oficial', 'blue', 'MEP'],
    actors: [
      { type: 'person', pos: [0, 0, -0.5], p: { ...ME, pose: 'shrug' } },
      { type: 'label', pos: [-1.05, 2.55, -0.6], rot: [0, 0.18, 0], at: 'Oficial', p: L('OFICIAL', 1.0, C.cyan, { color: '#1a1030', h: 0.46 }) },
      { type: 'label', pos: [0, 2.85, -0.6], at: 'blue', p: L('BLUE', 0.9, C.blue, { h: 0.46 }) },
      { type: 'label', pos: [1.05, 2.55, -0.6], rot: [0, -0.18, 0], at: 'MEP', p: L('MEP', 0.9, C.green, { color: '#1a1030', h: 0.46 }) },
      { type: 'label', pos: [0, 2.3, -0.6], out: 'Oficial', p: L('¿VOS CUÁL MIRÁS?', 2.2, DARK, { color: C.gold, h: 0.46 }) },
    ],
    overlays: [{ type: 'pill', text: 'COMENTÁ CON UNA PALABRA', at: 'Oficial' }] },
  // 15. motivo para seguir
  { id: 'b15', cam: { from: [0.4, 2.2, 7.0], to: [0, 2.0, 6.2], look: [0, 1.3, 0], fov: 44 },
    actors: [
      { type: 'ring', pos: [0, 0.03, 0], p: { r: 0.9, color: C.cyan } },
      { type: 'person', pos: [0.15, 0, 0], p: { ...ME, pose: 'point' } },
      { type: 'calendar', pos: [-0.9, 1.85, 0.2], rot: [0, 0.3, 0], s: 0.55, at: 0.15, bob: 0.04, p: { top: 'CADA DÍA', big: '1 MIN', color: C.red } },
      { type: 'bill', pos: [0.95, 2.1, 0.1], at: 'número', bob: 0.05, p: { w: 0.75 } },
    ],
    overlays: [{ type: 'big', text: 'SEGUIME', sub: 'un número de la economía por día', at: 0.15, size: 110 }] },
];
