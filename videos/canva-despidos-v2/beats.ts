import type { BeatSpec } from '../../src/Beat';

// canva-despidos-v2: estudio de maqueta (set propio `stage` sobre 'room'), paleta petróleo / coral / arena / mostaza.
// Metáfora: escritorio + silla vacía + robot al lado (plano 1); en el 11 el robot se corre y la silla sigue ahí; en el 13 la silla es tuya.
// Texto 2D entre 250 px desde arriba y 420 px desde abajo: `tag` en y <= 75,3 % y `big` en y 62 %. Sin píldoras.
// Textos en pantalla: los de "## Placas por plano" de guion.md, sin agregados. Carteles 3D: ninguno.
const K = { teal: '#0f4c55', teal2: '#0b3a41', ink: '#10262b', coral: '#ff6b4a', coral2: '#d9573f', mint: '#3fd0a8', mustard: '#f2c14e', cream: '#fbf6ea' };
const ST = (v: 'teal' | 'coral' | 'ink', z = -3.6) => ({ type: 'stage', p: { v, z } });
const CEO = { shirt: K.mustard, pants: K.ink, hair: '#2a1a12', skin: '#f2c39b' };   // muñeco genérico + placa
const YOU = { shirt: K.mint, pants: '#1c3f45', hair: '#3a2a1a', skin: '#e0a97e' };
const tag = (text: string, at: any, o: any = {}) => ({ type: 'tag' as const, text, at, x: 50, y: 75.3, color: K.teal2, size: 46, ...o });

export const BEATS: BeatSpec[] = [
  // 1. ¿La inteligencia artificial dejó sin puesto a 1.271 personas en Canva?  — grúa que baja desde arriba
  { id: 'b01', set: 'room', cam: { from: [0.2, 5.2, 8.6], to: [0.5, 2.5, 7.0], look: [0, 0.3, -1.0], lookTo: [0, 1.0, -0.4], fov: 46 }, keywords: ['inteligencia', '1.271'],
    actors: [
      ST('teal'),
      { type: 'spot', pos: [-0.3, 0, 0.2], p: { r: 1.3, color: '#fff1c4', o: 0.18 } },
      { type: 'desk2', pos: [-0.3, 0, -0.2], s: 1.15 },
      { type: 'chair', pos: [-0.3, 0, 0.55], rot: [0, Math.PI, 0], s: 1.15, p: { color: K.coral } },
      { type: 'robot', pos: [1.05, 0, 0.45], rot: [0, -0.5, 0], s: 1.05, at: 'inteligencia', enter: 'drop', p: { pose: 'idle' }, out: 'puesto' },
      { type: 'robot', pos: [1.05, 0, 0.45], rot: [0, -0.5, 0], s: 1.05, at: 'puesto', enter: 'none', p: { pose: 'point' } },
      { type: 'chairs', pos: [0, 0, -1.4], at: '1.271', enter: 'none', p: { cols: 11, rows: 3, gap: 0.5, stagger: 0.025 } },
    ],
    overlays: [tag('¿LA IA DEJÓ SIN PUESTO', 'dejó', { y: 69.5, size: 52 }), tag('A 1.271 PERSONAS?', '1.271', { size: 60, color: K.coral2 })] },

  // 2. Si trabajás, es tu pregunta. Respuesta al final.  — órbita lateral amplia
  { id: 'b02', set: 'room', cam: { from: [-2.2, 2.4, 6.6], to: [1.6, 2.6, 6.9], look: [0, 1.15, 0], fov: 46 }, keywords: ['trabajás', 'pregunta'],
    actors: [
      ST('coral'),
      { type: 'desk2', pos: [0, 0, -0.3], p: { screen: K.mustard } },
      { type: 'chair', pos: [0, 0, 0.45], rot: [0, Math.PI, 0], p: { color: K.mint } },
      { type: 'person', pos: [0, 0, 0.42], rot: [0, Math.PI, 0], p: { ...YOU, pose: 'sitType' } },
      { type: 'qmark', pos: [0.15, 2.05, -0.3], s: 1.0, at: 'pregunta', bob: 0.05 },
      { type: 'envelope', pos: [0.95, 0.95, 0.4], rot: [0, -0.4, 0], s: 0.8, at: 'Respuesta', enter: 'drop' },
    ],
    overlays: [tag('RESPUESTA AL FINAL', 'Respuesta', { size: 58 })] },

  // 3. 4 de noviembre. La jefa de Canva le escribe a todo su equipo.  — contrapicado que sube
  { id: 'b03', set: 'room', cam: { from: [-0.9, 1.3, 7.4], to: [0.3, 2.3, 6.4], look: [0, 1.5, 0], lookTo: [0, 1.15, -0.6], fov: 46 }, keywords: ['noviembre', 'escribe'],
    actors: [
      ST('ink'),
      { type: 'spot', pos: [-0.3, 0, 0.6], p: { r: 1.0 } },
      { type: 'calendar', pos: [-1.2, 2.45, -1.2], rot: [0, 0.3, 0], s: 0.6, p: { top: 'NOVIEMBRE', big: '4', color: K.coral } },
      { type: 'desk2', pos: [-0.3, 0, 0.55], p: { mon: false } },
      { type: 'laptop', pos: [-0.3, 0.78, 0.6], s: 0.55 },
      { type: 'person', pos: [-0.3, 0, 0.05], p: { ...CEO, pose: 'type' }, at: 'jefa', enter: 'pop' },
      { type: 'envelope', pos: [-0.1, 1.3, 0.85], s: 0.45, at: 'escribe', move: { to: [0.5, 2.3, -0.4], at: 'todo', dur: 0.5 }, out: 'equipo' },
      { type: 'mailfly', at: 'equipo', enter: 'none', p: { a: [0.5, 2.3, -0.4], n: 10, area: [3.0, 1.2], y: 1.2, z0: -1.4 } },
      { type: 'chairs', pos: [0.2, 0, -1.4], at: 'todo', enter: 'none', p: { cols: 6, rows: 2, gap: 0.6, stagger: 0.03 } },
    ],
    overlays: [tag('4/11/2026', '4', { size: 56, out: 'jefa' }), { type: 'plate', name: 'MELANIE PERKINS', role: 'CEO de Canva', at: 'jefa', y: 72 }] },

  // 4. El 22 por ciento pierde su puesto, cambia de rol o se muda.  — vista cenital que gira
  { id: 'b04', set: 'room', cam: { from: [1.6, 6.2, 4.6], to: [-1.2, 5.6, 5.4], look: [0, 0, -0.3], lookTo: [0, 0.3, 0], fov: 46 }, keywords: ['22', 'pierde', 'cambia'],
    actors: [
      ST('coral'),
      { type: 'pie', pos: [0, 0, -0.7], rot: [0, -0.4, 0], s: 1.05, p: { pct: 0.22, lift: 0.25 } },
      { type: 'chair', pos: [-0.05, 0.68, 0.95], rot: [0, 0.3, 0], s: 0.55, at: 'pierde', p: { color: K.cream, tip: 0.4 } },
      { type: 'person', pos: [0.45, 0.68, 0.7], rot: [0, -0.6, 0], s: 0.5, at: 'cambia', p: { shirt: K.mint, pants: K.ink, pose: 'shrug' } },
      { type: 'suitcase', pos: [0.75, 0.68, 0.25], rot: [0, -0.8, 0], s: 0.75, at: 'muda', enter: 'drop' },
    ],
    overlays: [{ type: 'big', text: '22% DEL EQUIPO', sub: 'puesto, rol o ciudad', at: '22', y: 62, size: 84 }] },

  // 5. No aclara cuántas quedan sin trabajo.  — travelling lateral
  { id: 'b05', set: 'room', cam: { from: [-1.4, 2.2, 6.4], to: [1.2, 2.3, 6.4], look: [-0.3, 1.0, 0], lookTo: [0.3, 1.0, 0], fov: 46 }, keywords: ['cuántas'],
    actors: [
      ST('teal'),
      { type: 'chair', pos: [-1.0, 0, 0], rot: [0, 0.3, 0], s: 1.2, p: { color: K.coral } },
      { type: 'chair', pos: [0, 0, -0.2], s: 1.2, p: { color: K.mustard } },
      { type: 'chair', pos: [1.0, 0, 0], rot: [0, -0.3, 0], s: 1.2, p: { color: K.mint } },
      { type: 'qmark', pos: [-1.0, 1.65, 0], s: 0.65, at: 'cuántas' },
      { type: 'qmark', pos: [0, 1.65, -0.2], s: 0.65, at: 'quedan' },
      { type: 'qmark', pos: [1.0, 1.65, 0], s: 0.65, at: 'trabajo' },
    ],
    overlays: [tag('¿CUÁNTOS DESPIDOS?', 'aclara', { y: 69.5, size: 52 }), tag('SIN DATO', 'quedan', { size: 60, color: K.coral2 })] },

  // 6. El motivo que da: por primera vez en una década, Canva frenó su crecimiento.  — grúa que sube
  { id: 'b06', set: 'room', cam: { from: [0.6, 1.4, 6.8], to: [-0.3, 2.6, 6.2], look: [0, 1.9, -0.8], lookTo: [0, 1.5, -0.8], fov: 46 }, keywords: ['década', 'frenó', 'crecimiento'],
    actors: [
      ST('ink'),
      { type: 'spot', pos: [0, 0, -0.4], p: { r: 1.6, o: 0.15 } },
      { type: 'chart', pos: [0.3, 1.6, -1.0], s: 0.88, p: { flat: 3.6 } },
      { type: 'person', pos: [-1.1, 0, -0.5], rot: [0, 0.6, 0], s: 0.95, p: { ...CEO, pose: 'point' }, out: 'frenó' },
      { type: 'person', pos: [-1.1, 0, -0.5], rot: [0, 0.6, 0], s: 0.95, at: 'frenó', enter: 'none', p: { ...CEO, pose: 'shrug' } },
    ],
    overlays: [tag('PRIMER FRENO EN 10 AÑOS', 'primera', { size: 50 })] },

  // 7. Paga al menos seis meses de sueldo a los que se van.  — dolly hacia atrás
  { id: 'b07', set: 'room', cam: { from: [0.3, 2.2, 5.4], to: [-0.2, 2.6, 7.4], look: [0, 1.35, 0], fov: 46 }, keywords: ['seis', 'sueldo'],
    actors: [
      ST('coral'),
      { type: 'months', pos: [0, 0.2, -0.4], at: 'seis', enter: 'none', p: { n: 6, r: 1.5 } },
      { type: 'carrier', pos: [-0.3, 0, 0.5], rot: [0, 0.4, 0], p: { ...YOU, shirt: K.cream } , out: 'van' },
      { type: 'carrier', pos: [-0.3, 0, 0.5], rot: [0, 1.4, 0], at: 'van', enter: 'none', move: { to: [1.6, 0, 0.9], at: 'van', dur: 1.0 }, p: { ...YOU, shirt: K.cream, walk: true } },
    ],
    overlays: [{ type: 'big', text: '6 MESES DE SUELDO', sub: 'como mínimo', at: 'seis', y: 62, size: 70 }] },

  // 8. Y pueden pedir 10.000 dólares para un proyecto propio.  — órbita alrededor de la pila
  { id: 'b08', set: 'room', cam: { from: [1.8, 2.5, 6.6], to: [-1.2, 2.3, 6.9], look: [0, 1.2, 0], fov: 46 }, keywords: ['10.000', 'proyecto'],
    actors: [
      ST('teal'),
      { type: 'spot', pos: [0, 0, 0], p: { r: 1.3, color: '#ffe6a0', o: 0.2 } },
      { type: 'bills', pos: [-0.55, 0, 0.1], rot: [0, 0.3, 0], at: 0.0, enter: 'none', p: { n: 10, stagger: 0.1 } },
      { type: 'box', pos: [0.75, 0.35, 0], p: { size: [0.9, 0.7, 0.8], color: K.teal2 } },
      { type: 'bulb', pos: [0.75, 0.7, 0], s: 1.1, at: 'proyecto', p: { on: 0.1 } },
    ],
    overlays: [{ type: 'big', text: '', count: { to: 10000, pre: 'US$ ' }, sub: 'para un proyecto propio', at: '10.000', y: 62, size: 116 }] },

  // 9. Ahora, la respuesta.  — empuje rápido al sobre
  { id: 'b09', set: 'room', cam: { from: [0, 2.6, 7.2], to: [0, 1.9, 4.6], look: [0, 1.25, 0], fov: 46 }, keywords: ['respuesta'],
    actors: [
      ST('ink'),
      { type: 'spot', pos: [0, 0, 0], p: { r: 1.2, o: 0.3 } },
      { type: 'box', pos: [0, 0.4, 0], p: { size: [1.1, 0.8, 0.9], color: K.teal } },
      { type: 'envelope', pos: [0, 1.2, 0.1], rot: [-0.15, 0, 0], s: 1.2, p: { open: 0.35 } },
    ],
    overlays: [{ type: 'big', text: 'LA RESPUESTA', at: 'respuesta', y: 62, size: 100 }] },

  // 10. La nota habla de nueva tecnología, pero no culpa a la inteligencia artificial.  — paneo de la nota al robot
  { id: 'b10', set: 'room', cam: { from: [-1.0, 2.3, 6.6], to: [0.7, 2.4, 6.9], look: [-0.6, 1.3, 0], lookTo: [0.4, 1.3, 0], fov: 46 }, keywords: ['nueva', 'culpa', 'inteligencia'],
    actors: [
      ST('coral'),
      { type: 'memo', pos: [-0.6, 1.15, -0.4], rot: [0, 0.25, 0], s: 0.85, p: { hi: 0.0 }, out: 'habla' },
      { type: 'memo', pos: [-0.6, 1.15, -0.4], rot: [0, 0.25, 0], s: 0.85, at: 'nueva', enter: 'none', p: { hi: 0.0 } },
      { type: 'robot', pos: [1.05, 0, 0.2], rot: [0, -0.4, 0], p: { pose: 'idle' } },
      { type: 'pointer', pos: [-0.05, 1.45, 0.1], at: 'pero', enter: 'none', p: { len: 0.55, color: K.ink } },
      { type: 'cross', pos: [0.35, 1.45, 0.25], at: 'culpa', p: { size: 0.55, color: K.coral2 } },
    ],
    overlays: [{ type: 'big', text: '"NUEVA TECNOLOGÍA"', sub: 'la nota no culpa a la IA', at: 'nueva', y: 62, size: 70 }] },

  // 11. Canva le dijo a la prensa que esos trabajos no los va a hacer una máquina.  — arco de izquierda a derecha
  { id: 'b11', set: 'room', cam: { from: [-1.8, 2.5, 6.8], to: [1.0, 2.3, 7.2], look: [0, 1.0, -0.2], fov: 46 }, keywords: ['prensa', 'trabajos', 'máquina'],
    actors: [
      ST('teal'),
      { type: 'mics', pos: [-1.2, 0, 0.6], rot: [0, 0.4, 0], s: 0.95, at: 'prensa', enter: 'none', p: { n: 4 } },
      { type: 'spot', pos: [0.2, 0, -0.1], at: 'trabajos', p: { r: 1.0, color: '#fff1c4', o: 0.25 } },
      { type: 'desk2', pos: [0.2, 0, -0.55] },
      { type: 'chair', pos: [0.2, 0, 0.2], rot: [0, Math.PI, 0], p: { color: K.coral } },
      { type: 'robot', pos: [0.95, 0, 0.35], rot: [0, -0.5, 0], p: { pose: 'idle' }, move: { to: [1.45, 0, -1.0], at: 'hacer', dur: 0.8 } },
      { type: 'check', pos: [0.2, 1.75, 0.2], at: 'máquina', p: { size: 0.5, color: K.mint } },
    ],
    overlays: [tag('CANVA A LA AGENCIA AAP:', 'dijo', { y: 69.5, size: 48 }), tag('ESOS TRABAJOS NO PASAN A UNA IA', 'trabajos', { size: 44 })] },

  // 12. Eso sí, admite que esa tecnología influye en qué productos hace y cómo los entrega.  — travelling a lo largo de la cinta
  { id: 'b12', set: 'room', cam: { from: [-1.5, 2.6, 6.4], to: [1.2, 2.4, 6.2], look: [-0.5, 1.0, 0], lookTo: [0.6, 0.9, 0], fov: 46 }, keywords: ['tecnología', 'influye', 'productos', 'entrega'],
    actors: [
      ST('coral'),
      { type: 'belt', pos: [0, 0, 0], p: { len: 3.2, n: 6, v: 0.7 } },
      { type: 'robot', pos: [-0.6, 0, -0.95], s: 0.95, p: { pose: 'idle' }, out: 'influye' },
      { type: 'robot', pos: [-0.6, 0, -0.95], s: 0.95, at: 'influye', enter: 'none', p: { pose: 'point' } },
      { type: 'box', pos: [1.9, 0.25, 0], at: 'entrega', enter: 'grow', p: { size: [0.7, 0.5, 0.8], color: K.teal2 } },
      { type: 'person', pos: [1.0, 0, -0.95], rot: [0, -0.3, 0], s: 0.95, p: { shirt: K.mustard, pants: K.ink, pose: 'hold' }, at: 'productos' },
    ],
    overlays: [tag('LA IA SÍ INFLUYE EN SUS PRODUCTOS', 'influye', { size: 40 })] },

  // 13. Y en tu trabajo, ¿ya cambió algo? Contalo en una palabra.  — grúa que se aleja y sube (espejo del plano 1)
  { id: 'b13', set: 'room', cam: { from: [0.4, 2.3, 6.2], to: [-0.2, 3.6, 7.8], look: [0, 1.1, -0.2], lookTo: [0, 0.9, -0.5], fov: 46 }, keywords: ['trabajo', 'cambió'],
    actors: [
      ST('teal'),
      { type: 'spot', pos: [-0.3, 0, 0.2], p: { r: 1.3, color: '#fff1c4', o: 0.2 } },
      { type: 'desk2', pos: [-0.3, 0, -0.2], s: 1.15 },
      { type: 'chair', pos: [-0.3, 0, 0.55], rot: [0, Math.PI, 0], s: 1.15, p: { color: K.coral } },
      { type: 'person', pos: [-0.3, 0, 0.5], rot: [0, Math.PI, 0], s: 1.15, at: 'tu', p: { ...YOU, pose: 'sitType' } },
      { type: 'robot', pos: [1.6, 0, -0.6], rot: [0, -0.7, 0], s: 0.9, p: { pose: 'idle' } },
      { type: 'bubble', pos: [0.55, 2.4, 0.3], s: 0.8, at: 'Contalo' },
    ],
    overlays: [tag('¿EN TU TRABAJO YA CAMBIÓ ALGO?', 'cambió', { y: 69.5, size: 44 }), tag('UNA PALABRA', 'Contalo', { size: 58, color: K.coral2 })] },
];
