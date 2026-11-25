import type { BeatSpec } from '../../src/Beat';
import { C } from '../../src/kit/math';

const PI = Math.PI;
const ME = { suit: C.blue, accent: C.magenta, helmet: C.gold };            // el piloto (genérico)
const CAR = { color: C.blue, accent: C.magenta, helmet: C.gold };          // su auto
const GREY = { color: '#5b4aa0', accent: '#9a8fd0', helmet: '#c9c4de', glow: 0.05 };
const RED = { color: C.red, accent: '#f4f1ff', helmet: '#f4f1ff' };
const NAVY = { suit: '#27306e', accent: C.red, helmet: '#f4f1ff' };

export const BEATS: BeatSpec[] = [
  // 1. 35 puntos
  { id: 'b01', cam: { from: [1.0, 3.0, 8.6], to: [0.2, 2.6, 7.6], look: [0, 1.0, 0], fov: 44 }, keywords: ['35', 'Colapinto'],
    actors: [
      { type: 'ring', pos: [0, 0.03, 0], p: { r: 1.5, color: C.cyan } },
      { type: 'box', pos: [0, 0.3, 0], p: { size: [2.0, 0.6, 3.6], color: '#241659' } },
      { type: 'f1car', pos: [0, 0.6, 0], rot: [0, 0.75, 0], spin: 0.12, s: 0.85, p: CAR },
      { type: 'label', pos: [0, 2.25, -0.6], at: 'Franco', bob: 0.03, p: { text: 'COLAPINTO', w: 2.3, h: 0.46, bg: C.blue, size: 0.62, weight: 900 } },
    ],
    overlays: [{ type: 'big', text: '', count: { to: 35, post: ' PUNTOS' }, sub: 'Fórmula 1 · temporada 2026', at: 0.05, size: 118 }] },
  // 2. el año pasado, cero
  { id: 'b02', set: 'void', cam: { from: [-0.7, 2.4, 8.2], to: [0.3, 2.2, 7.3], look: [0, 1.45, 0], fov: 44 }, keywords: ['cero'],
    actors: [
      { type: 'calendar', pos: [0.85, 2.15, 0], rot: [0, -0.2, 0], s: 0.78, p: { top: '2026', big: '35', color: C.blue } },
      { type: 'driver', pos: [0.85, 0, 0.3], s: 0.82, p: { ...ME, pose: 'cheer' } },
      { type: 'calendar', pos: [-0.85, 2.15, 0], rot: [0, 0.2, 0], s: 0.78, at: 'pasado', out: 'cero', p: { top: '2025', big: '?', color: '#5b4aa0' } },
      { type: 'calendar', pos: [-0.85, 2.15, 0], rot: [0, 0.2, 0], s: 0.78, at: 'cero', p: { top: '2025', big: '0', color: C.red } },
      { type: 'driver', pos: [-0.85, 0, 0.3], s: 0.82, at: 'pasado', p: { ...ME, pose: 'sad' } },
      { type: 'label', pos: [0, 0.5, 1.2], at: 'mismo', p: { text: 'MISMO EQUIPO', w: 1.9, h: 0.4, bg: '#2d1a6e', size: 0.6 } },
    ],
    overlays: [{ type: 'pill', text: '2025: CERO PUNTOS', at: 'cero', red: true }] },
  // 3. 23 años, Alpine
  { id: 'b03', set: 'room', cam: { from: [0.7, 2.2, 6.4], to: [-0.2, 2.0, 5.6], look: [0, 1.25, 0], fov: 44 }, keywords: ['23', 'Alpine'],
    actors: [
      { type: 'driver', pos: [-0.62, 0, 0.2], rot: [0, 0.3, 0], s: 1.0, p: { ...ME, pose: 'idle' } },
      { type: 'f1car', pos: [0.55, 0, -0.9], rot: [0, -0.9, 0], s: 0.6, p: CAR },
      { type: 'label', pos: [0.5, 2.3, 0], at: '23', p: { text: '23 AÑOS', w: 1.15, h: 0.46, bg: C.gold, color: '#1a1030', size: 0.62, weight: 900 } },
      { type: 'label', pos: [0.5, 1.75, 0], at: 'Alpine', p: { text: 'ALPINE', w: 1.15, h: 0.46, bg: C.blue, size: 0.62, weight: 900 } },
    ],
    overlays: [{ type: 'plate', name: 'Franco Colapinto', role: 'piloto argentino', at: 0.1, y: 72 }] },
  // 4. Las Vegas, largó noveno
  { id: 'b04', cam: { from: [-1.2, 5.6, 8.4], to: [-0.9, 4.9, 7.4], look: [-0.2, 0.2, -2.6], fov: 46 }, keywords: ['Vegas', 'noveno'],
    actors: [
      { type: 'track', pos: [0, 0, -3], p: { len: 22, grid: 10, gz: -10.6, gap: 1.5 } },
      ...[0, 1, 2, 3, 4, 5, 6, 7, 9].map((i) => ({ type: 'f1car', pos: [i % 2 ? 0.75 : -0.75, 0.05, -10.6 + i * 1.5 + 0.2] as [number, number, number], rot: [0, PI, 0] as [number, number, number], s: 0.55, p: GREY })),
      { type: 'f1car', pos: [-0.75, 0.05, 1.6], rot: [0, PI, 0], s: 0.6, p: CAR },
      { type: 'ring', pos: [-0.75, 0.08, 1.6], at: 'largó', p: { r: 0.85, color: C.gold } },
      { type: 'label', pos: [-0.75, 1.3, 1.2], rot: [-0.5, 0, 0], at: 'noveno', p: { text: '9°', w: 0.9, h: 0.6, bg: C.gold, color: '#1a1030', size: 0.8, weight: 900 } },
      { type: 'lights', pos: [0, 0, -13.5], s: 1.3, p: { step: 0.3 } },
    ],
    overlays: [{ type: 'pill', text: 'LAS VEGAS · LARGÓ 9°', at: 'largó' }] },
  // 5. cruzó séptimo, penalización, sexto
  { id: 'b05', set: 'void', cam: { from: [1.3, 3.3, 8.6], to: [0.5, 2.9, 7.7], look: [0, 0.9, 0], fov: 46 }, keywords: ['séptimo', 'sexto'],
    actors: [
      { type: 'track', pos: [0, 0, -4], p: { len: 24, finish: 3.4 } },
      { type: 'flag', pos: [1.5, 0, -2.5], s: 1.6 },
      { type: 'f1car', pos: [0.75, 0.05, 2.2], s: 0.62, p: RED, move: { to: [0.75, 0.05, -3.4], at: 'lo', dur: 0.7 } },
      { type: 'f1car', pos: [-0.6, 0.05, -5], s: 0.62, p: { ...CAR, speed: 8 }, move: { to: [-0.6, 0.05, 0.3], at: 0.05, dur: 0.85 } },
      { type: 'label', pos: [-0.6, 1.45, 0.3], at: 'séptimo', out: 'sexto', p: { text: '7°', w: 0.95, h: 0.62, bg: '#2d1a6e', border: C.cyan, size: 0.72, weight: 900 } },
      { type: 'label', pos: [-0.6, 1.45, 0.3], at: 'sexto', p: { text: '6°', w: 0.95, h: 0.62, bg: C.gold, color: '#1a1030', size: 0.76, weight: 900 } },
      { type: 'arrow', pos: [-1.35, 1.0, 0.3], at: 'sexto', enter: 'none', p: { len: 0.7, color: C.green, dur: 0.4 } },
      { type: 'label', pos: [0.8, 1.4, 2.2], at: 'penalización', out: 'lo', p: { text: '+10 s', w: 1.1, h: 0.5, bg: C.red, size: 0.66, weight: 900 } },
    ],
    overlays: [{ type: 'pill', text: 'PENALIZACIÓN A OTRO PILOTO', at: 'penalización', red: true, out: 'sexto' }, { type: 'pill', text: 'DE 7° A 6°', at: 'sexto' }] },
  // 6. sexto = mejor resultado, Canadá
  { id: 'b06', set: 'room', cam: { from: [-0.6, 2.4, 7.0], to: [0.3, 2.2, 6.2], look: [0, 1.35, 0], fov: 44 }, keywords: ['mejor', 'Canadá'],
    actors: [
      { type: 'box', pos: [0, 0.2, 0], p: { size: [1.0, 0.4, 0.9], color: C.gold, glow: true, ei: 0.35 } },
      { type: 'driver', pos: [0, 0.4, 0], s: 0.8, p: { ...ME, pose: 'cheer' } },
      { type: 'label', pos: [-0.6, 2.45, 0], rot: [0, 0.15, 0], at: 0.15, p: { text: 'LAS VEGAS', sub: '6° · NOV 2026', w: 1.12, h: 0.56, bg: '#2d1a6e', border: C.cyan, size: 0.34, weight: 900 } },
      { type: 'label', pos: [0.6, 2.45, 0], rot: [0, -0.15, 0], at: 'logrado', p: { text: 'CANADÁ', sub: '6° · MAYO 2026', w: 1.12, h: 0.56, bg: '#2d1a6e', border: C.cyan, size: 0.34, weight: 900 } },
    ],
    overlays: [{ type: 'pill', text: 'SU MEJOR RESULTADO EN F1', at: 'mejor' }] },
  // 7. seis carreras sin sumar
  { id: 'b07', set: 'void', cam: { from: [0.6, 2.4, 8.0], to: [-0.3, 2.2, 7.1], look: [0, 1.5, 0], fov: 44 }, keywords: ['seis', 'sin'],
    actors: [
      ...[0, 1, 2, 3, 4, 5].map((i) => ({ type: 'label', pos: [-0.95 + (i % 3) * 0.95, 2.7 - Math.floor(i / 3) * 0.8, 0] as [number, number, number], ...(i === 0 ? {} : { at: 0.25 + i * 0.26 }),
        p: { text: '0', sub: 'CARRERA ' + (i + 1), w: 0.82, h: 0.68, bg: '#2d1a6e', border: C.red, color: C.red, size: 0.52, weight: 900, subColor: '#fff' } })),
      { type: 'driver', pos: [0, 0, 0.6], s: 0.75, p: { ...ME, pose: 'sad' } },
    ],
    overlays: [{ type: 'pill', text: '6 CARRERAS SIN PUNTOS', at: 'seis', red: true }] },
  // 8. ganó Verstappen
  { id: 'b08', cam: { from: [0.8, 2.4, 7.6], to: [0, 2.2, 6.8], look: [0, 1.45, 0], fov: 44 }, keywords: ['ganó', 'Verstappen'],
    actors: [
      { type: 'podium', pos: [0, 0, 0] },
      { type: 'driver', pos: [0, 1.04, 0], s: 0.9, p: { ...NAVY, pose: 'cheer' } },
      { type: 'driver', pos: [-0.95, 0.74, 0], s: 0.9, p: { suit: '#5b4aa0', accent: '#9a8fd0', helmet: '#c9c4de' } },
      { type: 'driver', pos: [0.95, 0.54, 0], s: 0.9, p: { suit: '#5b4aa0', accent: '#9a8fd0', helmet: '#c9c4de' } },
      { type: 'flag', pos: [-1.55, 0, -0.8], s: 1.5 },
    ],
    overlays: [{ type: 'plate', name: 'Max Verstappen', role: 'ganó en Las Vegas', at: 'Max', y: 70 }] },
  // 9. puesto 12, a tres del 11
  { id: 'b09', set: 'void', cam: { from: [-0.6, 2.4, 8.4], to: [0.3, 2.2, 7.6], look: [0, 1.55, 0], fov: 44 }, keywords: ['12', 'tres'],
    actors: [
      { type: 'label', pos: [0, 2.95, 0], p: { text: 'CAMPEONATO DE PILOTOS', w: 2.9, h: 0.4, bg: '#15102b', border: C.cyan, size: 0.5 } },
      { type: 'label', pos: [0, 2.35, 0], p: { text: '10°   GASLY   52', w: 2.9, h: 0.5, bg: '#2d1a6e', color: '#c9c4de', size: 0.56 } },
      { type: 'label', pos: [0, 1.78, 0], p: { text: '11°   LINDBLAD   38', w: 2.9, h: 0.5, bg: '#2d1a6e', color: '#c9c4de', size: 0.56 } },
      { type: 'label', pos: [0, 1.18, 0.1], at: 'puesto', p: { text: '12°   COLAPINTO   35', w: 3.05, h: 0.58, bg: C.blue, border: C.gold, size: 0.5, weight: 900 } },
      { type: 'label', pos: [0.75, 0.6, 0.35], rot: [0, 0, -0.06], at: 'tres', p: { text: 'A 3 PUNTOS', w: 1.3, h: 0.4, bg: C.gold, color: '#1a1030', size: 0.6, weight: 900 } },
      { type: 'driver', pos: [-0.9, 0, 0.9], rot: [0, 0.5, 0], s: 0.5, p: { ...ME, pose: 'point' } },
    ],
    overlays: [{ type: 'pill', text: '12° CON 35 PUNTOS', at: '12' }] },
  // 10. ahora viene Qatar
  { id: 'b10', cam: { from: [1.1, 2.3, 8.6], to: [0.3, 2.0, 7.6], look: [0, 1.2, 0], fov: 46 }, keywords: ['Qatar', 'anteúltima'],
    actors: [
      { type: 'track', pos: [0, 0, -6], p: { len: 30, speed: 9 } },
      { type: 'f1car', pos: [0, 0.05, -1.5], s: 0.95, p: { ...CAR, speed: 14 }, move: { to: [0, 0.05, 1.6], at: 0, dur: 3.3 } },
      { type: 'arch', pos: [0, 0, -4], s: 0.8, at: 'Qatar', p: { text: 'QATAR' } },
      { type: 'calendar', pos: [-1.0, 1.9, 1.2], rot: [0, 0.3, 0], s: 0.6, at: 'anteúltima', p: { top: 'NOVIEMBRE', big: '27-29', color: C.red } },
    ],
    overlays: [{ type: 'pill', text: 'ANTEÚLTIMA CARRERA', at: 'anteúltima' }] },
  // 11. en Qatar nunca sumó
  { id: 'b11', set: 'void', cam: { from: [-0.7, 2.4, 8.2], to: [0.3, 2.2, 7.2], look: [0, 1.5, 0], fov: 44 }, keywords: ['nunca', '14'],
    actors: [
      { type: 'label', pos: [0, 3.0, 0], p: { text: 'COLAPINTO EN QATAR', w: 2.8, h: 0.42, bg: C.gold, color: '#1a1030', size: 0.56, weight: 900 } },
      { type: 'f1car', pos: [0, 0, 0.9], rot: [0, 0.6, 0], s: 0.7, p: CAR, out: '2024' },
      { type: 'label', pos: [0, 1.9, 0], at: 'nunca', out: '2024', p: { text: '0 PUNTOS', w: 2.2, h: 0.75, bg: '#15102b', border: C.red, color: C.red, size: 0.6, weight: 900 } },
      { type: 'calendar', pos: [-0.85, 2.0, 0], rot: [0, 0.2, 0], s: 0.72, at: '2024', p: { top: 'QATAR', big: '2024', color: '#5b4aa0' } },
      { type: 'f1car', pos: [-0.85, 0, 0.7], rot: [0, 0.6, 0.12], s: 0.55, at: '2024', p: { ...CAR, glow: 0.05 } },
      { type: 'cross', pos: [-0.85, 0.5, 1.3], at: 'abandonó', p: { size: 0.7 } },
      { type: 'label', pos: [-0.85, 1.12, 0.2], at: 'abandonó', p: { text: 'ABANDONÓ', w: 1.35, h: 0.36, bg: C.red, size: 0.62, weight: 900 } },
      { type: 'calendar', pos: [0.85, 2.0, 0], rot: [0, -0.2, 0], s: 0.72, at: '2025', p: { top: 'QATAR', big: '2025', color: '#5b4aa0' } },
      { type: 'f1car', pos: [0.85, 0, 0.7], rot: [0, -0.6, 0], s: 0.55, at: '2025', p: CAR },
      { type: 'label', pos: [0.78, 1.12, 0.2], at: '14', p: { text: 'PUESTO 14', w: 1.2, h: 0.36, bg: '#2d1a6e', border: C.cyan, size: 0.6, weight: 900 } },
    ],
    overlays: [{ type: 'pill', text: 'NUNCA SUMÓ EN QATAR', at: 'puntos', red: true, out: '2024' }] },
  // 12. sin sprint, clasificación sábado 15
  { id: 'b12', set: 'room', cam: { from: [0.7, 2.3, 6.8], to: [-0.2, 2.1, 6.0], look: [0, 1.45, 0], fov: 44 }, keywords: ['sprint', '15:00'],
    actors: [
      { type: 'label', pos: [-0.6, 2.25, 0], rot: [0, 0.15, 0], p: { text: 'SPRINT', w: 1.1, h: 0.5, bg: '#2d1a6e', border: C.magenta, size: 0.56, weight: 900 } },
      { type: 'cross', pos: [-0.6, 2.25, 0.2], at: 'no', p: { size: 0.75 } },
      { type: 'calendar', pos: [0.6, 2.15, 0], rot: [0, -0.15, 0], s: 0.62, at: 'Clasifica', p: { top: 'SÁBADO 28', big: '15:00', color: C.blue } },
      { type: 'f1car', pos: [-0.6, 0, 0], rot: [0, PI / 2, 0], s: 0.5, p: { ...CAR, speed: 10 }, move: { to: [0.35, 0, 0], at: 'Clasifica', dur: 1.6 } },
    ],
    overlays: [{ type: 'pill', text: 'CLASIFICACIÓN: SÁB 15:00', at: '15:00' }] },
  // 13. carrera domingo 13:00
  { id: 'b13', cam: { from: [0.9, 3.2, 9.0], to: [0.2, 2.9, 8.0], look: [0, 0.5, -0.6], fov: 46 }, keywords: ['domingo', '13:00'],
    actors: [
      { type: 'track', pos: [0, 0, -5], p: { len: 26 } },
      { type: 'lights', pos: [0, 0, -2.6], p: { step: 0.5, start: 0.2, w: 2.7, h: 2.7 } },
      { type: 'f1car', pos: [-0.75, 0.05, -0.9], s: 0.7, p: CAR },
      { type: 'f1car', pos: [0.75, 0.05, -2.9], s: 0.7, p: GREY },
      { type: 'f1car', pos: [-0.75, 0.05, -4.9], s: 0.7, p: GREY },
    ],
    overlays: [{ type: 'big', text: 'DOM 13:00', sub: 'la carrera · hora argentina', at: 'domingo', size: 112 }] },
  // 14. queda Abu Dabi
  { id: 'b14', set: 'void', cam: { from: [-0.7, 2.4, 8.2], to: [0.3, 2.2, 7.3], look: [0, 1.4, 0], fov: 44 }, keywords: ['una sola', 'Abu', 'Dabi'],
    actors: [
      { type: 'label', pos: [-0.85, 2.5, 0], rot: [0, 0.2, 0], p: { text: 'QATAR', sub: '29 NOV', w: 1.4, h: 0.72, bg: '#2d1a6e', border: C.cyan, size: 0.36, weight: 900 } },
      { type: 'box', pos: [-0.8, 0.36, 0], p: { size: [1.7, 0.72, 0.9], color: '#241659' } },
      { type: 'label', pos: [0.85, 2.5, 0], rot: [0, -0.2, 0], at: 'Abu', p: { text: 'ABU DABI', sub: 'ÚLTIMA CARRERA', w: 1.4, h: 0.72, bg: C.gold, color: '#1a1030', size: 0.34, weight: 900 } },
      { type: 'calendar', pos: [0.85, 1.35, 0.2], rot: [0, -0.2, 0], s: 0.6, at: '6', p: { top: 'DICIEMBRE', big: '6', color: C.red } },
      { type: 'flag', pos: [1.45, 0, 0.6], s: 0.9, at: '6' },
      { type: 'f1car', pos: [-0.95, 0.75, 0], rot: [0, PI / 2 - 0.2, 0], s: 0.5, p: { ...CAR, speed: 9 }, move: { to: [-0.6, 0.75, 0], at: 'Abu', dur: 1.6 } },
    ],
    overlays: [{ type: 'pill', text: 'QUEDA UNA SOLA', at: 'sola' }] },
  // 15. ¿en qué puesto termina?
  { id: 'b15', cam: { from: [0.7, 2.4, 7.6], to: [0, 2.2, 6.6], look: [0, 1.5, 0], fov: 44 }, keywords: ['puesto', 'Qatar'],
    actors: [
      { type: 'ring', pos: [0, 0.03, 0], p: { r: 1.2, color: C.gold } },
      { type: 'driver', pos: [-0.75, 0, 0], rot: [0, 0.4, 0], p: { ...ME, pose: 'shrug' } },
      { type: 'roulette', pos: [0.65, 1.8, 0], rot: [0, -0.2, 0], bob: 0.04, p: { w: 1.3, h: 1.1, max: 22 } },
      { type: 'label', pos: [0.65, 2.62, 0], rot: [0, -0.2, 0], at: 'Qatar', p: { text: 'QATAR', w: 1.3, h: 0.36, bg: C.red, size: 0.62, weight: 900 } },
    ],
    overlays: [{ type: 'big', text: '¿EN QUÉ PUESTO?', sub: 'termina Colapinto en Qatar', at: 'qué', size: 88 }] },
  // 16. respondé con un número
  { id: 'b16', set: 'room', cam: { from: [-0.5, 2.3, 7.0], to: [0.2, 2.1, 6.2], look: [0, 1.5, 0], fov: 44 }, keywords: ['un solo número', 'nombrados'],
    actors: [
      { type: 'phone', pos: [0.6, 1.75, 0.2], rot: [0, -0.25, 0], s: 1.5, bob: 0.03, p: { kind: 'chat' } },
      { type: 'driver', pos: [-0.6, 0, 0], rot: [0, 0.5, 0], s: 0.9, p: { ...ME, pose: 'point' } },
      { type: 'label', pos: [-0.55, 2.45, 0.2], at: 'solo', p: { text: '1 NÚMERO', w: 1.15, h: 0.42, bg: C.gold, color: '#1a1030', size: 0.62, weight: 900 } },
      { type: 'label', pos: [0.6, 2.72, 0.2], at: 'nombrados', p: { text: 'TU NOMBRE', w: 1.15, h: 0.36, bg: C.green, color: '#0d2b18', size: 0.6, weight: 900 } },
    ],
    overlays: [{ type: 'big', text: 'COMENTÁ TU NÚMERO', sub: 'los más cercanos salen en el próximo video', at: 'cercanos', size: 74 }] },
];
