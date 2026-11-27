import type { BeatSpec } from '../../src/Beat';
import { C } from '../../src/kit/math';

const PI = Math.PI;
const RED = '#d81f33', GREEN = '#1f9d55', DARK = '#241659';
// Placas: etiquetas HTML centradas en x 46% (fuera del 12% derecho), borde inferior por encima de 1450 px.
const T = (text: string, at: any, y: number, color: string, extra: any = {}) => ({ type: 'tag' as const, text, at, x: 46, y, color, size: 44, ...extra });
const FUENTE = 'FUENTES: TRANSFERMARKT VÍA EL ECONOMISTA, CONMEBOL VÍA INFOBAE';
const F = (text = FUENTE) => ({ type: 'tag' as const, text, at: 0, x: 46, y: 73.2, color: 'rgba(20,10,46,.78)', size: 22 });

export const BEATS: BeatSpec[] = [
  // 1. la balanza: dos de verde contra todo el plantel rojo y blanco
  { id: 'b01', set: 'void', cam: { from: [0.5, 1.5, 7.8], to: [0, 1.4, 7.2], look: [0, 0.95, 0], fov: 44 }, keywords: ['Palmeiras', 'Estudiantes'],
    actors: [
      { type: 'cleansky' },
      { type: 'ring', pos: [0, 0.03, 0], p: { r: 1.3, color: C.gold } },
      { type: 'balanza', pos: [0, 0, 0], p: { tilt0: 0, tiltAt: 3.95, crowdAt: 2.81 } },
    ],
    overlays: [T('FINAL DE LA LIBERTADORES', 0, 60, C.magenta, { out: 'otro.' }), T('2 JUGADORES DE PALMEIRAS', 'Palmeiras', 66, GREEN), T('TODO ESTUDIANTES', 'otro.', 60, RED),
      F('ESQUEMA, NO A ESCALA')] },
  // 2. valen más los dos
  { id: 'b02', set: 'void', cam: { from: [-0.8, 1.5, 7.0], to: [-0.5, 1.45, 6.5], look: [-0.2, 0.95, 0], fov: 44 }, keywords: ['dos,', 'Transfermarkt.'],
    actors: [
      { type: 'cleansky' },
      { type: 'balanza', pos: [0, 0, 0], p: { tilt0: 1, crowdAt: -1 } },
      { type: 'ring', pos: [-1.0, 0.03, 0], at: 'dos,', p: { r: 0.6, color: GREEN } },
    ],
    overlays: [T('VALEN MÁS LOS DOS', 'dos,', 60, GREEN), T('SEGÚN TRANSFERMARKT', 'Transfermarkt.', 66, DARK), F('ESQUEMA, NO A ESCALA · FUENTE: TRANSFERMARKT VÍA EL ECONOMISTA')] },
  // 3. Vitor Roque 38, Flaco López 30
  { id: 'b03', set: 'void', cam: { from: [0.7, 1.4, 8.6], to: [0.1, 1.3, 7.9], look: [0.15, 0.7, 0], fov: 44 }, keywords: ['Vitor Roque,', '38', '30.'],
    actors: [
      { type: 'cleansky' },
      { type: 'ring', pos: [-0.95, 0.03, 0], p: { r: 0.5, color: GREEN } },
      { type: 'player', pos: [-0.95, 0, 0], rot: [0, 0.25, 0], p: { kit: 'pal' } },
      { type: 'pile', pos: [-0.2, 0, 0.1], at: '38', enter: 'none', p: { n: 16, dur: 0.9 } },
      { type: 'ring', pos: [0.55, 0.03, 0], at: 'Flaco', p: { r: 0.5, color: GREEN } },
      { type: 'player', pos: [0.55, 0, 0], rot: [0, -0.25, 0], at: 'Flaco', p: { kit: 'pal', phase: 1 } },
      { type: 'pile', pos: [1.32, 0, 0.1], at: '30', enter: 'none', p: { n: 13, dur: 0.6 } },
    ],
    overlays: [T('VITOR ROQUE · 38 M€', '38', 60, GREEN), T('FLACO LÓPEZ · 30 M€', '30', 66, GREEN), F()] },
  // 4. 68 contra menos de 55
  { id: 'b04', set: 'void', cam: { from: [-0.6, 1.6, 9.2], to: [0.1, 1.5, 8.5], look: [0, 1.0, 0], fov: 44 }, keywords: ['68.', '55.'],
    actors: [
      { type: 'cleansky' },
      { type: 'col', pos: [-0.7, 0, 0], p: { h: 2.0, from: 0.35, grow: 0.04, dur: 0.6, color: GREEN, top: 'pal2' } },
      { type: 'col', pos: [0.7, 0, 0], at: 'Estudiantes', enter: 'none', p: { h: 1.61, from: 0.02, grow: 0, dur: 1.6, color: RED, stripes: true, top: 'est', crowdAt: 0.1 } },
      { type: 'ring', pos: [-0.7, 0.03, 0], at: '68', p: { r: 0.75, color: C.gold } },
    ],
    overlays: [T('38 + 30 = 68 M€', '68', 60, GREEN), T('ESTUDIANTES: 54,78 M€', '55', 66, RED), F()] },
  // 5. el Flaco López es argentino
  { id: 'b05', set: 'void', cam: { from: [0.5, 1.3, 6.4], to: [0.1, 1.2, 5.7], look: [0.1, 0.75, 0], fov: 44 }, keywords: ['argentino.'],
    actors: [
      { type: 'cleansky' },
      { type: 'ring', pos: [-0.25, 0.03, 0], p: { r: 0.6, color: C.cyan } },
      { type: 'player', pos: [-0.25, 0, 0], p: { kit: 'pal' }, out: 'argentino' },
      { type: 'player', pos: [-0.25, 0, 0], at: 'argentino', enter: 'none', p: { kit: 'pal', pose: 'cheer' } },
      { type: 'flag', pos: [0.55, 0, -0.5], at: 'argentino' },
    ],
    overlays: [{ type: 'plate', name: 'Flaco López', role: 'Palmeiras', at: 'Flaco', y: 58 }, T('ARGENTINO', 'argentino', 66, '#3d8fd1', { size: 56 }), F()] },
  // 6. la final: sábado 17 h, Centenario
  { id: 'b06', set: 'void', cam: { from: [0, 2.6, 8.6], to: [0.3, 2.4, 7.8], look: [0, 0.1, 0], fov: 44 }, keywords: ['sábado', 'Centenario,'],
    actors: [
      { type: 'cleansky' },
      { type: 'stadium', pos: [0, 0, 0], s: 0.95 },
      { type: 'player', pos: [-0.3, 0.05, 0.1], rot: [0, PI / 2, 0], s: 0.42, at: 'final', p: { kit: 'pal' } },
      { type: 'player', pos: [0.3, 0.05, 0.1], rot: [0, -PI / 2, 0], s: 0.42, at: 'contra', p: { kit: 'est' } },
      { type: 'ball', pos: [0, 0.12, 0.1], at: 'final', p: { r: 0.06 } },
    ],
    overlays: [T('SÁBADO 28/11 · 17 H', 'cinco', 60, C.magenta), T('ESTADIO CENTENARIO, MONTEVIDEO', 'Centenario', 66, DARK), F()] },
  // 7. Palmeiras entero: casi cuatro veces más
  { id: 'b07', set: 'void', cam: { from: [0.7, 1.7, 9.6], to: [0, 1.6, 8.9], look: [0, 1.0, 0], fov: 44 }, keywords: ['cuatro', '218'],
    actors: [
      { type: 'cleansky' },
      { type: 'col', pos: [-0.7, 0, 0], p: { h: 2.6, from: 0.25, grow: 0.04, dur: 1.2, color: GREEN } },
      { type: 'col', pos: [0.7, 0, 0], p: { h: 0.64, from: 1, color: RED, stripes: true } },
      { type: 'col', pos: [0.7, 0.66, 0], at: 'cuatro', p: { h: 0.62, from: 1, color: RED, stripes: true } },
      { type: 'col', pos: [0.7, 1.3, 0], at: 1.95, p: { h: 0.62, from: 1, color: RED, stripes: true } },
      { type: 'col', pos: [0.7, 1.94, 0], at: 2.15, p: { h: 0.62, from: 1, color: RED, stripes: true } },
      { type: 'ring', pos: [-0.7, 0.03, 0], at: '218', p: { r: 0.75, color: C.gold } },
    ],
    overlays: [T('PALMEIRAS: 218,58 M€', '218', 60, GREEN), T('CASI 4 VECES MÁS', 'millones', 66, C.magenta), F()] },
  // 8. los nueve más valiosos son de Palmeiras
  { id: 'b08', set: 'void', cam: { from: [-0.5, 1.4, 8.0], to: [0.1, 1.3, 7.4], look: [0, 0.45, 0], fov: 44 }, keywords: ['nueve', 'suyos.'],
    actors: [
      { type: 'cleansky' },
      { type: 'ranking', pos: [0, 0, 0], p: { kits: ['pal', 'pal', 'pal', 'pal', 'pal', 'pal', 'pal', 'pal', 'pal', 'est'], delay: -0.25, stagger: 0.12 } },
    ],
    overlays: [T('LOS 9 MÁS VALIOSOS: DE PALMEIRAS', 'nueve', 60, GREEN, { size: 40 }), T('EL 1° DE ESTUDIANTES, 10°: TOMÁS PALACIOS · 8 M€', 'suyos', 66, RED, { size: 30 }), F()] },
  // 9. Palmeiras pagó 167,4; Estudiantes 11,5 (solo en placa)
  { id: 'b09', set: 'void', cam: { from: [0.7, 1.7, 9.6], to: [0, 1.6, 8.9], look: [0, 1.0, 0], fov: 44 }, keywords: ['jugadores', '167'],
    actors: [
      { type: 'cleansky' },
      { type: 'player', pos: [-1.15, 0, 0.1], rot: [0, 0.3, 0], p: { kit: 'pal' } },
      { type: 'pile', pos: [-0.35, 0, 0], at: 'pagó', enter: 'none', p: { n: 30, dur: 1.4, r: 0.32 } },
      { type: 'player', pos: [0.55, 0, 0.1], rot: [0, -0.3, 0], p: { kit: 'est' } },
      { type: 'pile', pos: [1.34, 0, 0], at: 'millones', enter: 'none', p: { n: 2, dur: 0.3, r: 0.32 } },
      { type: 'ring', pos: [-0.35, 0.03, 0], at: '167', p: { r: 0.5, color: C.gold } },
    ],
    overlays: [T('PALMEIRAS PAGÓ 167,4 M€', '167', 60, GREEN), T('ESTUDIANTES: 11,5 M€', 'millones', 66, RED), F()] },
  // 10. pero Estudiantes ya eliminó a dos brasileños
  { id: 'b10', set: 'void', cam: { from: [-0.6, 1.4, 8.2], to: [0.1, 1.3, 7.5], look: [0, 0.6, 0], fov: 44 }, keywords: ['Estudiantes', 'Corinthians'],
    actors: [
      { type: 'cleansky' },
      { type: 'ring', pos: [0, 0.03, 0.4], p: { r: 0.55, color: RED } },
      { type: 'player', pos: [0, 0, 0.4], p: { kit: 'est' }, out: 'eliminó' },
      { type: 'player', pos: [0, 0, 0.4], at: 'eliminó', enter: 'none', p: { kit: 'est', pose: 'cheer' } },
      { type: 'player', pos: [-1.05, 0, -0.6], rot: [0, 0.3, 0], s: 0.85, p: { kit: 'gris' }, out: 'Corinthians' },
      { type: 'player', pos: [-1.05, 0, -0.6], rot: [0, 0.3, 0], s: 0.85, at: 'Corinthians', enter: 'none', p: { kit: 'gris', pose: 'sad' } },
      { type: 'equis', pos: [-1.05, 1.0, -0.05], at: 'Corinthians', p: { size: 0.55 } },
      { type: 'player', pos: [1.05, 0, -0.6], rot: [0, -0.3, 0], s: 0.85, p: { kit: 'gris', phase: 2 }, out: 'Flamengo' },
      { type: 'player', pos: [1.05, 0, -0.6], rot: [0, -0.3, 0], s: 0.85, at: 'Flamengo', enter: 'none', p: { kit: 'gris', pose: 'sad', phase: 2 } },
      { type: 'equis', pos: [1.05, 1.0, -0.05], at: 'Flamengo', p: { size: 0.55 } },
    ],
    overlays: [T('YA ELIMINÓ A CORINTHIANS', 'Corinthians', 60, RED), T('Y A FLAMENGO', 'Flamengo', 66, RED), F()] },
  // 11. premios: campeón US$ 25 M, subcampeón US$ 7 M
  { id: 'b11', set: 'void', cam: { from: [0.6, 1.5, 8.6], to: [-0.1, 1.4, 7.9], look: [0, 0.75, 0], fov: 44 }, keywords: ['campeón', '25', '7.'],
    actors: [
      { type: 'cleansky' },
      { type: 'ring', pos: [-0.8, 0.03, 0], p: { r: 0.75, color: C.gold } },
      { type: 'cup', pos: [-1.25, 0, 0], s: 1.1, p: {} },
      { type: 'fajos', pos: [-0.45, 0, 0], at: '25', enter: 'none', p: { n: 25, dur: 1.2 } },
      { type: 'medal', pos: [1.25, 0.9, 0], at: 'subcampeón', s: 0.9 },
      { type: 'fajos', pos: [0.6, 0, 0], at: '7', enter: 'none', p: { n: 7, dur: 0.4 } },
    ],
    overlays: [T('CAMPEÓN: US$ 25 MILLONES', '25', 60, '#b87a00'), T('PREMIOS DE LA CONMEBOL', 'Conmebol', 66, DARK, { out: '7' }),
      T('SUBCAMPEÓN: US$ 7 MILLONES', '7', 66, '#5b6b8a'), F()] },
  // 12. quinta Libertadores y corta siete títulos brasileños
  { id: 'b12', set: 'void', cam: { from: [-0.5, 1.5, 8.4], to: [0.1, 1.4, 7.7], look: [0, 0.8, 0], fov: 44 }, keywords: ['Estudiantes', 'quinta', 'brasileños'],
    actors: [
      { type: 'cleansky' },
      { type: 'shelf', pos: [0, 1.3, -0.6], p: { n: 5, have: 4, at5: 1.89 } },
      { type: 'box', pos: [0, 0.65, -0.6], p: { size: [0.25, 1.3, 0.25], color: '#2d1a6e' } },
      { type: 'ring', pos: [1.24, 1.42, -0.6], at: 'quinta', p: { r: 0.3, color: C.gold } },
      { type: 'titles', pos: [0, 0, 0.7], at: 2.5, enter: 'none', p: { n: 7, cut: 2.65 } },
    ],
    overlays: [T('SERÍA SU 5ª LIBERTADORES', 'quinta', 60, RED), T('CORTARÍA 7 TÍTULOS BRASILEÑOS SEGUIDOS', 'seguidos', 66, RED, { size: 36 }), F()] },
  // 13. en la balanza gana Palmeiras; en la cancha, el sábado
  { id: 'b13', set: 'void', cam: { from: [0.5, 1.5, 8.2], to: [0, 1.4, 7.6], look: [0, 0.75, 0], fov: 44 }, keywords: ['balanza', 'cancha,'],
    actors: [
      { type: 'cleansky' },
      { type: 'balanza', pos: [-0.45, 0, 0.3], s: 0.8, p: { tilt0: 1, crowdAt: -1, cheer: false } },
      { type: 'ring', pos: [-0.45, 0.03, 0.3], p: { r: 1.0, color: C.gold } },
      { type: 'box', pos: [1.05, 0.3, -1.15], p: { size: [1.3, 0.6, 1.6], color: '#2d1a6e' } },
      { type: 'pitch', pos: [1.05, 0.6, -1.15], at: 'cancha', p: { w: 1.2, d: 1.5 } },
      { type: 'ball', pos: [1.05, 0.7, -1.15], at: 'define', p: { r: 0.09 } },
    ],
    overlays: [T('EN LA BALANZA: PALMEIRAS', 'Palmeiras', 60, GREEN), T('EN LA CANCHA: EL SÁBADO', 'sábado', 66, C.magenta), F('ESQUEMA, NO A ESCALA')] },
  // 14. dejá tu resultado exacto
  { id: 'b14', set: 'void', cam: { from: [-0.4, 1.6, 8.6], to: [0.1, 1.5, 8.0], look: [0, 0.9, 0], fov: 44 }, keywords: ['abajo', 'exacto'],
    actors: [
      { type: 'cleansky' },
      { type: 'score', pos: [0, 2.05, 0], s: 0.7, p: { top: 'FINAL', blink: 1.38 } },
      { type: 'arrow', pos: [-0.8, 1.35, 0.5], rot: [0, 0, PI], s: 0.3, at: 'abajo', enter: 'none', p: { len: 0.8, color: C.cyan, dur: 0.4 } },
      { type: 'clock', pos: [0.8, 1.05, 0.5], s: 0.32, at: 'cinco' },
    ],
    overlays: [T('DEJÁ TU RESULTADO EXACTO', 'exacto', 60, C.magenta), T('ANTES DE LAS 17 H DEL SÁBADO 28/11', 'sábado', 66, DARK, { size: 40 })] },
];
