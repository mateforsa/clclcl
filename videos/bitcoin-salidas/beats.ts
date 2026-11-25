import type { BeatSpec } from '../../src/Beat';
import { C } from '../../src/kit/math';

const PI = Math.PI;
const GUY = { shirt: '#3b4a8a', hair: '#15102b', skin: '#f2c39b' };   // vocero genérico
const ME = { shirt: C.cyan, hair: '#3a2a1a', skin: '#f2c39b' };

export const BEATS: BeatSpec[] = [
  // 1. contradicción, parte A: salida récord
  { id: 'b01', cam: { from: [1.0, 2.5, 9.9], to: [0.5, 2.2, 8.9], look: [0.45, 1.35, 0], fov: 44 }, keywords: ['5.000', 'récord'],
    actors: [
      { type: 'vault', pos: [-0.3, 0, 0], rot: [0, 0.18, 0], p: { sign: 'FONDO BITCOIN', flow: 'out', n: 7, alarm: true } },
      { type: 'ring', pos: [-0.3, 0.03, 0], p: { r: 1.5, color: C.red } },
      { type: 'label', pos: [1.25, 2.6, 0.2], rot: [0, -0.15, 0], at: 'récord', p: { text: 'RÉCORD', w: 1.3, h: 0.46, bg: C.red, size: 0.66, weight: 900 } },
    ],
    overlays: [{ type: 'big', text: '', count: { to: 4940, pre: '−US$ ', post: ' M' }, sub: 'salieron en noviembre (al 24)', at: '5.000', red: true, size: 100 }] },
  // 2. parte B: el saldo desde 2024 sigue siendo positivo
  { id: 'b02', set: 'void', cam: { from: [-0.8, 2.6, 8.6], to: [0.1, 2.3, 7.7], look: [0, 1.5, 0], fov: 44 }, keywords: ['2024', '52.000'],
    actors: [
      { type: 'ring', pos: [0, 0.03, 0], p: { r: 1.5, color: C.gold } },
      { type: 'box', pos: [0, 0.45, 0], p: { size: [3.1, 0.9, 1.3], color: '#2d1a6e' } },
      { type: 'box', pos: [0, 0.92, 0], p: { size: [3.2, 0.06, 1.4], color: C.gold, glow: true } },
      { type: 'coins', pos: [0.85, 0.95, 0.1], enter: 'none', p: { n: 2, dur: 0.2, r: 0.44 } },
      { type: 'label', pos: [0.85, 1.55, 0.1], p: { text: 'NOVIEMBRE', w: 1.25, h: 0.34, bg: C.red, size: 0.62, weight: 900 } },
      { type: 'coins', pos: [-0.7, 0.95, 0], at: 'desde', enter: 'none', p: { n: 21, dur: 2.6, r: 0.46 } },
      { type: 'label', pos: [-0.7, 3.12, 0], at: '52.000', p: { text: 'DESDE 2024', w: 1.35, h: 0.36, bg: '#1f9d55', size: 0.62, weight: 900 } },
    ],
    overlays: [{ type: 'big', text: '', count: { to: 52000, pre: '+US$ ', post: ' M' }, sub: 'entró más de lo que salió', at: '52.000', size: 96 }] },
  // 3. qué es un ETF al contado
  { id: 'b03', set: 'room', cam: { from: [0.9, 2.3, 7.6], to: [0.3, 2.1, 6.9], look: [0.35, 1.45, -0.8], fov: 46, shift: 0.06 }, keywords: ['ETF', 'verdad'],
    actors: [
      { type: 'vault', pos: [-0.35, 0, -0.8], rot: [0, 0.15, 0], p: { sign: 'ETF = FONDO', flow: 'in', n: 6, delay: 2.0, rate: 0.6 } },
      { type: 'bcoin', pos: [1.35, 2.5, -0.6], bob: 0.05, p: { r: 0.42 } },
    ],
    overlays: [{ type: 'pill', text: 'COMPRA BITCOINS DE VERDAD', at: 'compra' }] },
  // 4. qué significa "los fondos venden"
  { id: 'b04', cam: { from: [-0.9, 2.7, 9.0], to: [-0.1, 2.3, 8.0], look: [0, 1.3, 0], fov: 46 }, keywords: ['sale', 'vende'],
    actors: [
      { type: 'vault', pos: [0.1, 0, -0.3], p: { sign: 'FONDO', flow: 'out', n: 7, delay: 2.3, alarm: true } },
      { type: 'crowd', pos: [-0.9, 0, 1.1], enter: 'none', p: { n: 5, area: [1.3, 0.9], seed: 11, stagger: 0, sc: 0.6, face: -PI / 2, pose: 'walk' }, move: { to: [-2.3, 0, 1.1], at: 'sale', dur: 3.4 } },
      { type: 'label', pos: [0.1, 2.95, -0.2], at: 'vende', p: { text: 'EL FONDO VENDE', w: 2.0, h: 0.42, bg: C.red, size: 0.62, weight: 900 } },
    ],
    overlays: [{ type: 'pill', text: 'MÁS SALIDAS QUE ENTRADAS', at: 'sale', red: true }] },
  // 5. la cifra con fuente y el récord anterior
  { id: 'b05', set: 'void', cam: { from: [0.7, 2.5, 8.4], to: [-0.2, 2.2, 7.5], look: [0, 1.45, 0], fov: 44 }, keywords: ['4.940', 'Bloomberg'],
    actors: [
      { type: 'bars', pos: [0, 0, 0], enter: 'none', p: { vals: [2.05, 2.25], colors: ['#8a6bff', C.red], w: 0.85, gap: 0.65, dur: 0.7, stagger: 1.0 } },
      { type: 'label', pos: [-0.75, 0.45, 0.6], p: { text: 'JUNIO', w: 1.0, h: 0.3, bg: '#15102b', size: 0.64, weight: 900 } },
      { type: 'label', pos: [-0.75, 2.4, 0], at: 0.5, p: { text: '4.510 M', w: 1.1, h: 0.36, bg: '#2d1a6e', size: 0.66, weight: 900 } },
      { type: 'label', pos: [0.75, 0.45, 0.6], at: 'salieron', p: { text: 'NOVIEMBRE', w: 1.15, h: 0.3, bg: '#15102b', size: 0.64, weight: 900 } },
      { type: 'label', pos: [0.75, 2.62, 0], at: '4.940', p: { text: '4.940 M', w: 1.25, h: 0.42, bg: C.red, size: 0.68, weight: 900 } },
      { type: 'label', pos: [-0.75, 2.85, 0], at: 2.4, p: { text: 'RÉCORD ANTERIOR', w: 1.3, h: 0.26, color: '#b9a3e8', size: 0.7, weight: 800 } },
    ],
    overlays: [{ type: 'pill', text: 'SALIDAS AL 24 DE NOVIEMBRE', at: '24', out: 'según' }, { type: 'pill', text: 'SEGÚN DATOS DE BLOOMBERG', at: 'según' }] },
  // 6. el máximo
  { id: 'b06', cam: { from: [-0.7, 2.4, 8.2], to: [0.1, 2.2, 7.2], look: [0, 1.6, 0], fov: 44 }, keywords: ['2025', '126.000'],
    actors: [
      { type: 'ring', pos: [0, 0.03, 0], p: { r: 1.3, color: C.gold } },
      { type: 'bcoin', pos: [0.15, 1.3, 0.2], p: { r: 0.6 }, move: { to: [0.15, 2.25, 0.2], at: 'tocó', dur: 1.2 } },
      { type: 'calendar', pos: [-1.05, 2.45, -0.2], rot: [0, 0.25, 0], s: 0.66, at: 0.25, p: { top: '6 OCT', big: '2025', color: C.blue } },
      { type: 'arrow', pos: [1.05, 0.5, 0], at: 'tocó', enter: 'none', p: { len: 2.0, color: C.green, dur: 1.1 } },
    ],
    overlays: [{ type: 'big', text: '', count: { to: 126000, pre: 'US$ ' }, sub: 'máximo: 6 de octubre de 2025', at: '126.000', size: 100 }] },
  // 7. la caída con fechas
  { id: 'b07', set: 'void', cam: { from: [0.5, 2.3, 9.0], to: [-0.2, 2.15, 8.3], look: [0, 1.75, 0], fov: 44 }, keywords: ['55.000', '59.000'],
    actors: [
      { type: 'chart', pos: [0, 2.1, 0], p: { pts: [126, 55.3, 59.4], lo: 35, hi: 140, w: 2.9, h: 2.3, dur: 5.4, delay: 0.5,
        days: ['6 OCT 2025', '21 NOV', '25 NOV'],
        tags: [{ text: '126.000', w: 0.95, dx: 0.5, dy: 0.02, color: C.gold }, { text: '55.000', w: 0.85, dy: -0.28 }, { text: '59.000', w: 0.85, dx: -0.15, dy: 0.32 }] } },
      { type: 'label', pos: [0, 0.68, 0.1], p: { text: 'PRECIO EN US$ · 3 DATOS, NO EL RECORRIDO', w: 2.9, h: 0.24, color: '#b9a3e8', size: 0.68, weight: 700 } },
    ],
    overlays: [{ type: 'pill', text: '21 NOV 2026: MÍNIMO 55.254', at: '21', red: true, out: 'El#2' }, { type: 'pill', text: '25 NOV 2026: ~59.000', at: 'El#2' },
      { type: 'tag', text: '≈ −53% DESDE EL MÁXIMO', at: '59.000', x: 62, y: 45, color: C.red, size: 36 }] },
  // 8. monedas en ganancia
  { id: 'b08', set: 'room', cam: { from: [-0.6, 2.4, 6.6], to: [0.2, 2.2, 5.9], look: [0, 1.8, -0.8], fov: 46 }, keywords: ['8,5', 'costaron'],
    actors: [
      { type: 'coingrid', pos: [0, 2.25, -0.8], p: { cols: 8, rows: 5, on: 17, gap: 0.335, delay: 1.0, stagger: 0.05 } },
      { type: 'label', pos: [0, 1.22, -0.7], p: { text: '1 MONEDA ≈ 500.000 BITCOINS', w: 2.5, h: 0.26, color: '#fff', bg: '#15102b', size: 0.66, weight: 700 } },
    ],
    overlays: [{ type: 'big', text: '', count: { to: 8.5, dec: 1, post: ' M' }, sub: 'de bitcoins valen más de lo que costaron', at: '8,5', size: 104 }] },
  // 9. comparación con FTX
  { id: 'b09', cam: { from: [0.8, 2.6, 8.8], to: [0, 2.3, 7.9], look: [0, 1.4, 0], fov: 46 }, keywords: ['FTX', '2022', 'CoinDesk'],
    actors: [
      { type: 'building', pos: [-0.9, 0, -0.3], rot: [0, 0.25, 0], p: { w: 1.25, h: 2.1, d: 1.0, seed: 6, sign: 'FTX' } },
      { type: 'cross', pos: [-0.85, 1.2, 0.45], at: 'quiebra', p: { size: 1.0 } },
      { type: 'calendar', pos: [0.9, 2.45, 0], rot: [0, -0.2, 0], s: 0.6, at: '2022', p: { top: 'NOV', big: '2022', color: C.red } },
      { type: 'label', pos: [0.9, 1.5, 0.2], at: '2022', p: { text: '2022: 8,6 M', w: 1.45, h: 0.4, bg: '#2d1a6e', size: 0.64, weight: 900 } },
      { type: 'label', pos: [0.9, 0.95, 0.3], at: 0.1, p: { text: '2026: 8,5 M', w: 1.45, h: 0.4, bg: C.red, size: 0.64, weight: 900 } },
    ],
    overlays: [{ type: 'pill', text: 'CON GANANCIA: MENOS QUE EN 2022', at: 'Menos', out: 'según' }, { type: 'pill', text: 'GLASSNODE, VÍA COINDESK', at: 'según' }] },
  // 10. quién lo llama mercado bajista
  { id: 'b10', set: 'void', cam: { from: [-0.7, 2.4, 8.2], to: [0.1, 2.2, 7.4], look: [0, 1.6, 0], fov: 44 }, keywords: ['Grayscale', 'bajista', '411'],
    actors: [
      { type: 'ring', pos: [-0.85, 0.03, 0], p: { r: 0.7, color: C.cyan } },
      { type: 'person', pos: [-0.85, 0, 0], rot: [0, 0.45, 0], p: { ...GUY, pose: 'idle' }, out: 'llama' },
      { type: 'person', pos: [-0.85, 0, 0], rot: [0, 0.45, 0], at: 'llama', enter: 'none', p: { ...GUY, pose: 'point' } },
      { type: 'label', pos: [-0.85, 2.15, 0], at: 'Grayscale', p: { text: 'GRAYSCALE', w: 1.45, h: 0.38, bg: '#fff', color: '#1a1030', size: 0.62, weight: 900 } },
      { type: 'label', pos: [0.62, 3.0, 0], at: 'mercado', p: { text: 'MERCADO BAJISTA', w: 1.6, h: 0.4, bg: C.red, size: 0.62, weight: 900 } },
      { type: 'arrow', pos: [0.75, 2.65, 0], rot: [0, 0, PI], at: 'bajista', enter: 'none', p: { len: 1.5, color: C.red, dur: 0.7 } },
    ],
    overlays: [{ type: 'big', text: '', count: { to: 411, post: ' DÍAS' }, sub: 'según Grayscale, al 23 de noviembre', at: '411', red: true, size: 104 }] },
  // 11. vuelta a la imagen del inicio: la mayor parte sigue adentro
  { id: 'b11', cam: { from: [0.7, 2.4, 7.6], to: [0, 2.2, 6.8], look: [0, 1.35, 0], fov: 44 }, keywords: ['80', 'adentro'],
    actors: [
      { type: 'ring', pos: [0, 0.03, 0], p: { r: 1.5, color: C.gold } },
      { type: 'vault', pos: [0, 0, 0], rot: [0, -0.12, 0], s: 1.15, p: { sign: 'FONDOS BITCOIN', fill: 0.83, from: 1, delay: 0.5 } },
    ],
    overlays: [{ type: 'big', text: '83%', sub: 'de lo que entró sigue adentro', at: '80', size: 110 }] },
  // 12. aviso
  { id: 'b12', set: 'void', cam: { from: [-0.4, 2.2, 7.4], to: [0.2, 2.1, 6.9], look: [0, 1.6, 0], fov: 44 }, keywords: ['consejo'],
    actors: [
      { type: 'label', pos: [0, 2.5, 0], p: { text: 'NO ES CONSEJO DE INVERSIÓN', w: 2.7, h: 0.5, bg: C.gold, color: '#1a1030', size: 0.6, weight: 900 } },
      { type: 'bcoin', pos: [0, 1.25, 0.2], p: { r: 0.62 } },
      { type: 'ring', pos: [0, 0.03, 0], p: { r: 1.2, color: C.gold } },
    ],
    overlays: [{ type: 'pill', text: 'SOLO DATOS, CON FECHA', at: 0.4 }] },
  // 13. pregunta de dos opciones
  { id: 'b13', set: 'room', cam: { from: [0.5, 2.3, 6.9], to: [-0.1, 2.1, 6.3], look: [0, 1.5, -0.6], fov: 46, shift: 0.06 }, keywords: ['cerca', 'mirás'],
    actors: [
      { type: 'person', pos: [0, 0, -0.5], p: { ...ME, pose: 'shrug' } },
      { type: 'label', pos: [-0.74, 2.5, -0.6], rot: [0, 0.15, 0], at: 0.1, p: { text: 'LO SIGO DE CERCA', w: 1.4, h: 0.5, bg: C.blue, size: 0.6, weight: 900 } },
      { type: 'label', pos: [0.74, 2.5, -0.6], rot: [0, -0.15, 0], at: 'ya', p: { text: 'YA NI MIRO', w: 1.4, h: 0.5, bg: C.magenta, size: 0.6, weight: 900 } },
    ],
    overlays: [{ type: 'pill', text: '¿CUÁL SOS? COMENTÁ', at: 'mirás' }] },
  // 14. motivo para seguir
  { id: 'b14', cam: { from: [0.4, 2.2, 6.9], to: [0, 2.0, 6.0], look: [0, 1.25, 0], fov: 44 },
    actors: [
      { type: 'ring', pos: [0, 0.03, 0], p: { r: 0.9, color: C.cyan } },
      { type: 'person', pos: [0.1, 0, 0], p: { ...ME, pose: 'point' } },
      { type: 'calendar', pos: [-0.85, 1.75, 0.2], rot: [0, 0.3, 0], s: 0.55, at: 0.15, bob: 0.04, p: { top: 'NOV', big: '30', color: C.red } },
    ],
    overlays: [{ type: 'big', text: 'SEGUIME', sub: 'y te cuento cómo cierra noviembre', at: 0.15, size: 110 }] },
];
