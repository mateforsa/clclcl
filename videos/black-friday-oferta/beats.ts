import type { BeatSpec } from '../../src/Beat';
import { C } from '../../src/kit/math';

// Precios de ejemplo (redondos, ilustrativos): no son una publicación real.
const ME = { shirt: C.cyan, hair: '#3a2a1a', skin: '#f2c39b' };
const ANTES = { text: '$1.000.000', top: 'ANTES', w: 1.5, h: 0.78 };
const AHORA = { text: '$600.000', top: 'AHORA', w: 1.5, h: 0.78, bg: C.gold, topColor: '#7a3b1a' };
const NUM = (n: string) => ({ text: n, w: 0.62, h: 0.62, bg: C.gold, color: '#1a1030', size: 0.78, weight: 900 });

export const BEATS: BeatSpec[] = [
  // 1. Un televisor. Antes: $1.000.000. Ahora: $600.000.
  { id: 'b01', cam: { from: [0.7, 2.4, 8.4], to: [0, 2.1, 7.0], look: [0, 1.55, 0], fov: 44 }, keywords: ['$1.000.000', '$600.000'],
    actors: [
      { type: 'ring', pos: [0, 0.03, 0], p: { r: 1.3, color: C.cyan } },
      { type: 'box', pos: [0, 0.3, 0], p: { size: [1.5, 0.6, 0.8], color: '#2d1a6e' } },
      { type: 'tv', pos: [0, 2.2, 0], s: 1.08, bob: 0.02, p: { w: 2.0, h: 1.15, stand: false } },
      { type: 'box', pos: [0, 1.05, 0], p: { size: [0.18, 0.9, 0.1], color: '#15102b' } },
      { type: 'tag', pos: [-0.7, 0.8, 0.6], rot: [0, 0.1, 0], s: 0.85, at: 'Antes', p: { ...ANTES, strike: 2.2 } },
      { type: 'tag', pos: [0.7, 0.8, 0.6], rot: [0, -0.1, 0], s: 0.85, at: 'Ahora', p: AHORA },
      { type: 'label', pos: [0.7, 3.0, 0.4], rot: [0, 0, -0.14], at: '$600', p: { text: '40% OFF', w: 1.25, h: 0.46, bg: C.red, size: 0.66, weight: 900 } },
    ] },
  // 2. 40 por ciento menos. Salvo que nunca haya costado un millón.
  { id: 'b02', set: 'void', cam: { from: [-0.5, 2.2, 7.4], to: [0.3, 2.0, 6.2], look: [0, 1.6, 0], fov: 44 }, keywords: ['40', 'nunca'],
    actors: [
      { type: 'ring', pos: [0, 0.03, 0], p: { r: 1.2, color: C.magenta } },
      { type: 'label', pos: [0, 2.6, 0], rot: [0, 0, -0.06], bob: 0.03, p: { text: '40% OFF', w: 2.3, h: 0.8, bg: C.red, size: 0.68, weight: 900 } },
      { type: 'tag', pos: [0, 1.45, 0.3], s: 1.3, p: { ...ANTES, strike: -1 } },
      { type: 'lupa', pos: [0, 1.0, 0.9], at: 'Salvo', p: { r: 0.4, sweep: 0.55, sweepY: 0.08 } },
    ],
    overlays: [{ type: 'pill', text: '¿EL "ANTES" ERA REAL?', at: 'nunca', red: true }] },
  // 3. El Black Friday es este viernes 27 y varias tiendas ya arrancaron.
  { id: 'b03', cam: { from: [0.8, 2.6, 8.8], to: [-0.2, 2.3, 7.8], look: [0, 1.4, 0], fov: 46 }, keywords: ['Black', 'Friday', '27'],
    actors: [
      { type: 'calendar', pos: [0, 2.5, -0.6], s: 0.95, bob: 0.03, p: { top: 'VIERNES', big: '27', color: C.red } },
      { type: 'label', pos: [0, 1.5, -0.5], at: 'Friday', p: { text: 'BLACK FRIDAY', w: 1.9, h: 0.4, bg: '#15102b', border: C.gold, color: C.gold, size: 0.6, weight: 900 } },
      { type: 'shop', pos: [-0.85, 0, -0.2], rot: [0, 0.2, 0], s: 0.85, at: 'varias', p: { sign: 'OFERTAS', aw: C.magenta, color: '#4a2fb0' } },
      { type: 'shop', pos: [0.85, 0, -0.2], rot: [0, -0.2, 0], s: 0.85, at: 'tiendas', p: { sign: 'OFERTAS', aw: C.cyan, color: '#4a2fb0' } },
      { type: 'check', pos: [-1.3, 1.75, 0], at: 'ya', p: { size: 0.4 } },
      { type: 'check', pos: [1.3, 1.75, 0], at: 'arrancaron', p: { size: 0.4 } },
    ],
    overlays: [{ type: 'pill', text: 'ALGUNAS, DESDE EL 25', at: 'varias' }] },
  // 4. Antes de pagar, hacé cuatro chequeos.
  { id: 'b04', set: 'room', cam: { from: [0.7, 2.3, 6.6], to: [-0.2, 2.1, 5.8], look: [0, 1.4, -0.4], fov: 46 }, keywords: ['cuatro'],
    actors: [
      { type: 'person', pos: [-1.1, 0, -0.2], rot: [0, 1.2, 0], s: 0.95, p: { ...ME, pose: 'hold' } },
      { type: 'cart', pos: [0.0, 0, -0.1], rot: [0, 0.25, 0], s: 0.95, p: { n: 2, color: C.cyan } },
      { type: 'tv', pos: [0.1, 1.42, -0.1], rot: [0, 0.25, 0], s: 0.42, p: { stand: false } },
      ...[0, 1, 2, 3].map((i) => ({ type: 'label', pos: [-0.9 + i * 0.6, 2.5, -0.6] as [number, number, number], at: 0.95 + i * 0.22, p: NUM(String(i + 1)) })),
    ],
    overlays: [{ type: 'big', text: '4 CHEQUEOS', sub: 'antes de pagar', at: 'cuatro', size: 104 }] },
  // 5. Uno. Buscá el historial de precios de ese producto.
  { id: 'b05', set: 'void', cam: { from: [-0.6, 2.3, 7.6], to: [0.3, 2.1, 6.6], look: [0, 1.55, 0], fov: 44 }, keywords: ['historial', 'precios'],
    actors: [
      { type: 'chart', pos: [0, 0.55, 0], p: { pts: [0.9, 1.0, 0.85, 1.0, 0.95, 1.6, 1.55, 0.9], w: 2.6, h: 2.1, dur: 1.9, start: 0.15 } },
      { type: 'label', pos: [-0.9, 2.95, 0.1], p: NUM('1') },
      { type: 'tv', pos: [0.75, 3.0, 0.1], s: 0.34, at: 0.2, p: { stand: false } },
      { type: 'lupa', pos: [0.2, 1.6, 0.6], at: 'Buscá', p: { r: 0.5, sweep: 0.8, sweepY: 0.15 } },
    ],
    overlays: [{ type: 'pill', text: 'HISTORIAL DE PRECIOS', at: 'historial' }] },
  // 6. Si subió justo antes y ahora baja, el descuento es más chico que el del cartel.
  { id: 'b06', cam: { from: [0.6, 2.4, 7.8], to: [-0.3, 2.2, 6.8], look: [0, 1.6, 0], fov: 44 }, keywords: ['subió', 'baja', 'chico'],
    actors: [
      { type: 'chart', pos: [-0.4, 0.5, 0], p: { pts: [1.0, 1.0, 1.95, 1.95, 0.8], w: 2.1, h: 2.5, dur: 2.0, start: 0, refY: 1.0 } },
      { type: 'label', pos: [-1.0, 2.8, 0.2], at: 'subió', p: { text: 'SUBIÓ', w: 0.9, h: 0.32, bg: C.red, size: 0.66, weight: 900 } },
      { type: 'label', pos: [-0.1, 2.8, 0.2], at: 'baja', p: { text: 'BAJA', w: 0.8, h: 0.32, bg: '#1f9d55', size: 0.66, weight: 900 } },
      { type: 'box', pos: [1.1, 1.875, 0.1], at: 'descuento', p: { size: [0.12, 1.15, 0.08], color: C.red, glow: true } },
      { type: 'label', pos: [0.98, 2.8, 0.2], at: 'descuento', p: { text: 'CARTEL', w: 0.8, h: 0.28, bg: C.red, size: 0.64, weight: 900 } },
      { type: 'box', pos: [0.85, 1.4, 0.1], at: 'chico', p: { size: [0.12, 0.2, 0.08], color: C.gold, glow: true } },
      { type: 'label', pos: [0.95, 0.95, 0.3], at: 'chico', p: { text: 'REAL', w: 0.75, h: 0.28, bg: C.gold, color: '#1a1030', size: 0.66, weight: 900 } },
    ],
    overlays: [{ type: 'pill', text: 'DESCUENTO REAL: MÁS CHICO', at: 'chico' }] },
  // 7. Dos. Compará el mismo modelo en otras dos tiendas.
  { id: 'b07', set: 'void', cam: { from: [0.7, 2.5, 8.6], to: [-0.2, 2.3, 7.6], look: [0, 1.5, 0], fov: 46 }, keywords: ['Compará', 'tiendas'],
    actors: [
      { type: 'label', pos: [-1.1, 3.0, 0.2], p: NUM('2') },
      { type: 'tv', pos: [0, 2.9, 0], s: 0.5, p: { stand: false } },
      { type: 'shop', pos: [-1.05, 0, 0.2], s: 0.66, p: { sign: 'TIENDA A', aw: C.magenta } },
      { type: 'tag', pos: [-1.05, 1.5, 0.4], s: 0.62, p: { text: '$600.000', w: 1.5, h: 0.6 } },
      { type: 'shop', pos: [0, 0, 0.2], s: 0.66, at: 'otras', p: { sign: 'TIENDA B', aw: C.cyan } },
      { type: 'tag', pos: [0, 1.5, 0.4], s: 0.62, at: 'otras', p: { text: '$570.000', w: 1.5, h: 0.6, bg: C.gold } },
      { type: 'shop', pos: [1.05, 0, 0.2], s: 0.66, at: 'dos#2', p: { sign: 'TIENDA C', aw: C.gold } },
      { type: 'tag', pos: [1.05, 1.5, 0.4], s: 0.62, at: 'dos#2', p: { text: '$630.000', w: 1.5, h: 0.6 } },
      { type: 'check', pos: [0, 2.0, 0.5], at: 'tiendas', p: { size: 0.42 } },
    ],
    overlays: [{ type: 'pill', text: 'MISMO MODELO, 3 TIENDAS', at: 'mismo' }] },
  // 8. Tres. Mirá el precio final. Por norma, el precio exhibido es el total que pagás, con impuestos.
  { id: 'b08', set: 'room', cam: { from: [-0.7, 2.3, 6.6], to: [0.3, 2.1, 5.8], look: [0, 1.55, -0.4], fov: 46 }, keywords: ['final', 'total', 'impuestos'],
    actors: [
      { type: 'label', pos: [-1.1, 2.85, -0.4], p: NUM('3') },
      { type: 'tag', pos: [0.15, 1.95, -0.3], s: 1.3, p: { text: '$600.000', top: 'PRECIO FINAL', w: 1.6, h: 0.85, bg: C.gold, topColor: '#7a3b1a' } },
      { type: 'person', pos: [-1.2, 0, 0.1], rot: [0, 0.8, 0], s: 0.9, at: 'Mirá', enter: 'none', p: { ...ME, pose: 'point' } },
      { type: 'coins', pos: [0.75, 0, 0.3], at: 'total', enter: 'none', p: { n: 9, dur: 0.9, r: 0.26 } },
      { type: 'label', pos: [0.4, 1.05, 0.1], at: 'exhibido', p: { text: '= LO QUE PAGÁS', w: 1.7, h: 0.36, bg: '#15102b', border: C.cyan, size: 0.56, weight: 900 } },
      { type: 'check', pos: [1.25, 2.5, 0], at: 'impuestos', p: { size: 0.45 } },
    ],
    overlays: [{ type: 'pill', text: 'CON IMPUESTOS INCLUIDOS', at: 'impuestos' }] },
  // 9. Si viene en cuotas, tiene que decir el precio de contado y el costo financiero total.
  { id: 'b09', set: 'void', cam: { from: [0.6, 2.3, 7.6], to: [-0.3, 2.1, 6.6], look: [0, 1.6, 0], fov: 44 }, keywords: ['cuotas', 'contado', 'financiero'],
    actors: [
      { type: 'ring', pos: [0, 0.03, 0], p: { r: 1.3, color: C.blue } },
      { type: 'label', pos: [0, 2.7, 0], bob: 0.03, p: { text: 'EN CUOTAS', w: 2.2, h: 0.62, bg: C.magenta, size: 0.62, weight: 900 } },
      { type: 'box', pos: [0, 2.28, 0], at: 'cuotas', p: { size: [0.06, 0.3, 0.06], color: '#f4f1ff' } },
      { type: 'label', pos: [-0.1, 1.8, 0.2], at: 'contado', p: { text: 'PRECIO DE CONTADO', w: 2.3, h: 0.5, bg: '#f4f1ff', color: '#1a1030', size: 0.52, weight: 900 } },
      { type: 'check', pos: [1.3, 1.8, 0.4], at: 'contado', p: { size: 0.34 } },
      { type: 'label', pos: [-0.1, 1.12, 0.2], at: 'costo', p: { text: 'COSTO FINANCIERO TOTAL', w: 2.3, h: 0.5, bg: '#f4f1ff', color: '#1a1030', size: 0.52, weight: 900 } },
      { type: 'check', pos: [1.3, 1.12, 0.4], at: 'financiero', p: { size: 0.34 } },
    ],
    overlays: [{ type: 'pill', text: 'TIENE QUE DECIRLO', at: 'decir' }] },
  // 10. Cuatro. Entrá vos a la página de la tienda. No compres desde un link que te llegó por mensaje.
  { id: 'b10', cam: { from: [-0.8, 2.5, 8.8], to: [0.3, 2.3, 7.8], look: [0, 1.4, 0], fov: 46 }, keywords: ['página', 'link'],
    actors: [
      { type: 'label', pos: [-1.15, 3.05, 0.2], p: NUM('4') },
      { type: 'shop', pos: [-0.85, 0, -0.2], rot: [0, 0.2, 0], s: 1.05, p: { sign: 'TIENDA', aw: C.cyan } },
      { type: 'person', pos: [-1.5, 0, 1.6], rot: [0, 2.6, 0], s: 0.8, at: 'Entrá', enter: 'none', p: { ...ME, pose: 'walk' }, move: { to: [-1.3, 0, 0.7], at: 'Entrá', dur: 1.6 } },
      { type: 'check', pos: [-0.2, 2.3, 0.4], at: 'tienda', p: { size: 0.5 } },
      { type: 'phone', pos: [0.95, 1.5, 0.6], rot: [0, -0.3, 0], s: 1.5, at: 'No', bob: 0.04, p: { kind: 'chat' } },
      { type: 'label', pos: [0.95, 1.52, 0.75], rot: [0, -0.3, 0], at: 'link', p: { text: 'LINK', w: 0.56, h: 0.2, bg: C.blue, size: 0.66, weight: 900 } },
      { type: 'cross', pos: [0.95, 1.5, 1.0], at: 'mensaje', p: { size: 0.85 } },
    ],
    overlays: [{ type: 'pill', text: 'ENTRÁ VOS A LA PÁGINA', at: 'página', out: 'No' }, { type: 'pill', text: 'NO DESDE UN LINK', at: 'link', red: true }] },
  // 11. Y si te arrepentís, la ley te da 10 días corridos desde que te llega para cancelar una compra online.
  { id: 'b11', set: 'room', cam: { from: [0.7, 2.4, 6.8], to: [-0.2, 2.2, 6.0], look: [0, 1.7, -0.4], fov: 46 }, keywords: ['10', 'cancelar'],
    actors: [
      { type: 'person', pos: [-1.0, 0, -0.1], rot: [0, 0.6, 0], s: 0.85, p: { ...ME, pose: 'sad' }, out: 'ley' },
      { type: 'person', pos: [-1.0, 0, -0.1], rot: [0, 0.6, 0], s: 0.85, at: 'ley', enter: 'none', p: { ...ME, pose: 'idle' }, out: 'cancelar' },
      { type: 'person', pos: [-1.0, 0, -0.1], rot: [0, 0.6, 0], s: 0.85, at: 'cancelar', enter: 'none', p: { ...ME, pose: 'cheer' } },
      { type: 'box', pos: [0.35, 0.4, -0.3], p: { size: [1.5, 0.8, 0.9], color: '#8a5a3a' } },
      { type: 'parcel', pos: [0.3, 0.8, -0.2], rot: [0, -0.3, 0], s: 0.9, p: { s: 0.8, ret: 3.9 } },
      { type: 'label', pos: [-0.7, 2.75, -0.5], at: 'ley', p: { text: 'LEY 24.240', w: 1.3, h: 0.38, bg: C.blue, size: 0.62, weight: 900 } },
      { type: 'calendar', pos: [0.95, 2.75, -0.6], rot: [0, -0.2, 0], s: 0.6, at: '10', p: { top: 'DÍAS', big: '10', color: C.green } },
    ],
    overlays: [{ type: 'big', text: '', count: { to: 10, post: ' DÍAS' }, sub: 'corridos, desde que te llega', at: '10', size: 108 }] },
  // 12. La tienda tiene que mostrar un botón de arrepentimiento en su página.
  { id: 'b12', set: 'void', cam: { from: [-0.5, 2.2, 8.2], to: [0.3, 2.0, 7.3], look: [0, 1.55, 0], fov: 44 }, keywords: ['botón', 'arrepentimiento'],
    actors: [
      { type: 'box', pos: [0, 1.75, -0.2], p: { size: [3.0, 2.5, 0.08], color: '#1a1140' } },
      { type: 'box', pos: [0, 2.86, -0.14], p: { size: [3.0, 0.28, 0.06], color: '#3b2f7a' } },
      { type: 'label', pos: [-0.75, 2.86, -0.1], p: { text: 'tienda.com.ar', w: 1.3, h: 0.2, color: '#fff', size: 0.72, weight: 600 } },
      { type: 'tv', pos: [-0.7, 2.15, -0.1], s: 0.52, p: { stand: false } },
      { type: 'box', pos: [0.75, 2.3, -0.12], p: { size: [1.1, 0.12, 0.04], color: '#5b4aa0' } },
      { type: 'box', pos: [0.6, 2.05, -0.12], p: { size: [0.8, 0.12, 0.04], color: '#5b4aa0' } },
      { type: 'webbutton', pos: [0, 1.15, 0.1], at: 'botón', p: { text: 'BOTÓN DE ARREPENTIMIENTO', w: 2.6, h: 0.6, click: 1.3 } },
    ],
    overlays: [{ type: 'pill', text: 'TIENE QUE ESTAR EN LA PÁGINA', at: 'página' }] },
  // 13. Entonces, el televisor: primero el historial, después el cartel.
  { id: 'b13', cam: { from: [-0.6, 2.5, 8.6], to: [0.2, 2.2, 7.4], look: [0, 1.55, 0], fov: 44 }, keywords: ['historial', 'cartel'],
    actors: [
      { type: 'ring', pos: [0, 0.03, 0], p: { r: 1.3, color: C.cyan } },
      { type: 'tv', pos: [0, 2.75, 0], s: 0.62, bob: 0.02, p: { stand: false } },
      { type: 'tag', pos: [0, 1.25, 0.3], s: 1.1, out: 'primero', p: { ...ANTES, strike: -1 } },
      { type: 'chart', pos: [-0.72, 0.3, 0.3], at: 'primero', p: { pts: [0.8, 0.8, 1.3, 1.3, 0.6], w: 1.3, h: 1.5, dur: 0.9, start: 0.25, refY: 0.8, thick: 0.07 } },
      { type: 'label', pos: [-0.72, 2.02, 0.4], at: 'primero', p: { text: '1° HISTORIAL', w: 1.3, h: 0.3, bg: C.gold, color: '#1a1030', size: 0.62, weight: 900 } },
      { type: 'tag', pos: [0.72, 1.2, 0.3], at: 'después', p: { ...AHORA, w: 1.25, h: 0.7 } },
      { type: 'label', pos: [0.72, 2.02, 0.4], at: 'después', p: { text: '2° CARTEL', w: 1.25, h: 0.3, bg: '#2d1a6e', size: 0.62, weight: 900 } },
      { type: 'label', pos: [0.72, 0.5, 0.5], rot: [0, 0, -0.1], at: 'cartel', p: { text: '40% OFF', w: 1.1, h: 0.4, bg: C.red, size: 0.66, weight: 900 } },
    ] },
  // 14. Guardá este video para el viernes y mandáselo al que está por comprar algo.
  { id: 'b14', set: 'room', cam: { from: [0.6, 2.3, 6.6], to: [-0.2, 2.1, 5.8], look: [0, 1.6, -0.4], fov: 46 }, keywords: ['Guardá', 'viernes', 'mandáselo'],
    actors: [
      { type: 'phone', pos: [-0.75, 1.9, -0.3], rot: [0, 0.2, 0], s: 1.9, bob: 0.03, p: { kind: 'play' } },
      { type: 'icon', pos: [-0.72, 1.95, -0.1], at: 0.1, bob: 0.03, p: { kind: 'bookmark', size: 0.85 } },
      { type: 'calendar', pos: [0.55, 2.3, -0.4], s: 0.55, at: 'viernes', out: 'mandáselo', p: { top: 'VIERNES', big: '27', color: C.red } },
      { type: 'icon', pos: [-0.1, 2.2, 0], at: 'mandáselo', p: { kind: 'send', size: 0.55, color: C.cyan }, move: { to: [0.85, 2.0, 0], at: 'mandáselo', dur: 0.8 } },
      { type: 'person', pos: [0.95, 0.0, -0.5], rot: [0, -0.5, 0], s: 0.85, at: 'mandáselo', p: { shirt: C.magenta, hair: '#15102b', skin: '#c98d62', pose: 'hold' } },
      { type: 'cart', pos: [0.2, 0, 0.3], rot: [0, 2.6, 0], s: 0.7, at: 'comprar', p: { n: 3, color: C.gold } },
    ],
    overlays: [{ type: 'big', text: 'GUARDALO', sub: 'para el viernes', at: 0.15, size: 108, out: 'mandáselo' }, { type: 'big', text: 'MANDÁSELO', sub: 'al que está por comprar', at: 'mandáselo', size: 104 }] },
  // 15. ¿Cuál fue tu peor compra de Black Friday?
  { id: 'b15', cam: { from: [0.4, 2.3, 7.4], to: [0, 2.1, 6.4], look: [0, 1.4, 0], fov: 44 }, keywords: ['peor'],
    actors: [
      { type: 'ring', pos: [0, 0.03, 0], p: { r: 1.2, color: C.magenta } },
      { type: 'person', pos: [-0.75, 0, 0], rot: [0, 0.3, 0], p: { ...ME, pose: 'shrug' } },
      { type: 'cart', pos: [0.75, 0, 0.1], rot: [0, -0.5, 0], p: { n: 6, color: C.cyan } },
      { type: 'label', pos: [0.75, 2.2, 0.2], at: 'peor', bob: 0.05, p: { text: '?', w: 0.7, h: 0.7, bg: C.gold, color: '#1a1030', size: 0.8, weight: 900 } },
    ],
    overlays: [{ type: 'big', text: '¿TU PEOR COMPRA?', sub: 'de Black Friday · contala en los comentarios', at: 0.15, size: 84 }] },
];
