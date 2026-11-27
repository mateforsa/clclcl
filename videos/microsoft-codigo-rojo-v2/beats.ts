import type { BeatSpec } from '../../src/Beat';
import { SLATE, SIG, AMBER, MINT } from './props';

// Versión 2: otro look que el original (neón violeta con edificio "MICROSOFT", sobres, globo, memos con lupa, balizas,
// servidores violetas y carteles de capítulo). Acá: oficina abierta de día (alfombra gris azulada, ventanal celeste),
// datacenter grafito que pasa a luz roja, sala de operaciones azul marino con pared de pantallas y mesa-mapa.
// Metáfora que abre y cierra: tu escritorio con la bandeja de entrada (b01 se corta, b11 vuelve y reenviás el mail).
// Textos 2D: exactamente los de "## Placas por plano" de guion.md, entre el 64% y el 77% de alto, x 46%.
// Los 5 a 6 días (b06) y la hora (b07) van en planos separados, sin flecha ni comparación entre ellos.
const OFFICE = { type: 'stage', p: { kind: 'office' } };
const OPEN = { type: 'stage', p: { kind: 'office', open: true } };
const DC = (red?: number) => ({ type: 'stage', p: { kind: 'dc', red } });
const OPS = (red?: number) => ({ type: 'stage', p: { kind: 'ops', red } });
const GREEN = '#0e7a55', VIOLET = '#5a4bd6', DARKAMB = '#a86400';
const tag = (text: string, at: any, o: any = {}) => ({ type: 'tag' as const, text, at, x: 46, y: 69, color: SLATE, size: 44, ...o });
const YOU = { shirt: '#3d6fa8', pants: '#2a2f38', hair: '#2a1c12', skin: '#e0b48f' };
const CO1 = { shirt: '#e07a4f', pants: '#3a3d44', hair: '#5a3a1a', skin: '#c98d62' };
const CO2 = { shirt: '#6aa58a', pants: '#2a2f38', hair: '#1a1410', skin: '#f0c9a4' };
const OPR = { shirt: '#2b3446', pants: '#1d222b', hair: '#8d8aa0', skin: '#f0c9a4' };
const IT = { shirt: '#ffb000', pants: '#2a2f38', hair: '#2a1c12', skin: '#c98d62', cap: '#1f2a3a' };
const PI = Math.PI;
const chair = (x: number, z: number, rot = 0) => [
  { type: 'box', pos: [x, 0.45, z] as any, rot: [0, rot, 0] as any, p: { size: [0.5, 0.08, 0.5], color: '#2b3038' } },
  { type: 'box', pos: [x, 0.22, z] as any, p: { size: [0.06, 0.44, 0.06], color: '#59626e' } },
];

export const BEATS: BeatSpec[] = [
  // 1. ¿El 12 de noviembre se te cortó el mail del trabajo? No era tu compu.  (sobre el hombro, empuje lento a la pantalla)
  { id: 'b01', set: 'room', cam: { from: [1.25, 2.55, 4.0], to: [0.8, 2.4, 3.2], look: [0, 1.2, -0.6], lookTo: [-0.05, 1.25, -0.7], fov: 46 }, keywords: ['12', 'noviembre', 'mail'],
    actors: [
      OFFICE,
      { type: 'workdesk', pos: [0, 0, -0.4], p: { mon: { off: 1.25 } } },
      ...chair(-0.35, 0.45),
      { type: 'person', pos: [-0.35, 0, 0.5], rot: [0, PI * 1.1, 0], p: { ...YOU, pose: 'sitType' }, out: 'cortó' },
      { type: 'person', pos: [-0.35, 0, 0.5], rot: [0, PI * 1.1, 0], at: 'cortó', enter: 'none', p: { ...YOU, pose: 'sit' } },
      { type: 'workdesk', pos: [-1.7, 0, -2.0], s: 0.85, p: { mon: { off: 0.2 }, mug: MINT } },
      { type: 'workdesk', pos: [1.7, 0, -2.0], s: 0.85, at: 'compu', enter: 'none', p: { mon: { off: 0 } } },
      { type: 'person', pos: [1.25, 0, -0.5], rot: [0, -0.5, 0], at: 'No#2', p: { ...CO1, pose: 'shrug' } },
    ],
    overlays: [tag('¿SE TE CORTÓ EL MAIL DEL TRABAJO?', 0, { size: 38, y: 68 }), tag('12 DE NOVIEMBRE', '12', { color: SIG, size: 34, y: 74.5 })] },

  // 2. Se cayó el correo de empresas de Microsoft casi 24 horas.  (grúa alta que sube sobre el piso: las pantallas caen en cascada)
  { id: 'b02', set: 'room', cam: { from: [0.3, 4.4, 4.6], to: [-0.2, 6.0, 5.0], look: [0, 0.5, -0.9], lookTo: [0, 0.4, -1.1], fov: 46 }, keywords: ['empresas', 'Microsoft', '24'],
    actors: [
      OPEN,
      ...[-1.35, 0, 1.35].flatMap((x, i) => [0.6, -0.9, -2.4].map((z, j) => ({ type: 'workdesk', pos: [x, 0, z] as any, s: 0.72, p: { mon: { off: 0.25 + (i * 3 + j) * 0.17 }, mug: [AMBER, MINT, SIG][(i + j) % 3] } }))),
      { type: 'person', pos: [-1.35, 0, 1.15], rot: [0, PI, 0], s: 0.75, p: { ...YOU, pose: 'sitType' }, out: 'empresas' },
      { type: 'person', pos: [-1.35, 0, 1.15], rot: [0, PI * 0.8, 0], s: 0.75, at: 'empresas', enter: 'none', p: { ...YOU, pose: 'shrug' } },
      { type: 'person', pos: [1.35, 0, -0.35], rot: [0, PI, 0], s: 0.75, p: { ...CO2, pose: 'sitType' }, out: 'Microsoft' },
      { type: 'person', pos: [1.35, 0, -0.35], rot: [0, -PI * 0.8, 0], s: 0.75, at: 'Microsoft', enter: 'none', p: { ...CO2, pose: 'shrug' } },
      { type: 'person', pos: [0, 0, -1.85], rot: [0, 0, 0], s: 0.75, at: 'casi', p: { ...CO1, pose: 'sad' } },
      { type: 'person', pos: [0.55, 0, 1.2], rot: [0, -0.6, 0], s: 0.75, at: '24', p: { ...OPR, pose: 'shrug' } },
    ],
    overlays: [tag('CASI 24 HORAS SIN CORREO', 'casi', { color: SIG, size: 50, y: 69 })] },

  // 3. Y adentro, según memos que leyó Reuters, se prendió una alarma: Código Rojo.  (órbita baja alrededor de la carpeta; la sala pasa a rojo)
  { id: 'b03', set: 'room', cam: { from: [-1.3, 2.7, 4.6], to: [1.0, 2.5, 4.1], look: [0, 1.0, -0.4], lookTo: [0.1, 1.1, -0.6], fov: 46 }, keywords: ['adentro', 'Reuters', 'alarma', 'Código', 'Rojo'],
    actors: [
      OPS(2.78),
      { type: 'box', pos: [0, 0.5, 0.4], p: { size: [2.0, 1.0, 1.0], color: '#2a3446' } },
      { type: 'folder', pos: [0, 1.01, 0.45], rot: [0, -0.15, 0], s: 0.85, at: 'memos', enter: 'none', p: { open: 0.1 } },
      { type: 'siren', pos: [-1.6, 3.15, -3.5], s: 1.2, p: { on: 2.78 } },
      { type: 'siren', pos: [1.6, 3.15, -3.5], s: 1.2, p: { on: 2.78 } },
      { type: 'person', pos: [-1.2, 0, -1.4], rot: [0, 0.3, 0], s: 0.95, p: { ...OPR, pose: 'idle' }, out: 'prendió' },
      { type: 'person', pos: [-1.2, 0, -1.4], rot: [0, 0.3, 0], s: 0.95, at: 'prendió', enter: 'none', p: { ...OPR, pose: 'shrug' } },
      { type: 'person', pos: [1.2, 0, -1.2], rot: [0, -0.4, 0], s: 0.95, at: 'adentro', p: { ...CO2, pose: 'idle' }, out: 'Código' },
      { type: 'person', pos: [1.2, 0, -1.2], rot: [0, -0.4, 0], s: 0.95, at: 'Código', enter: 'none', p: { ...CO2, pose: 'point' } },
    ],
    overlays: [tag('según memos que leyó Reuters', 'Reuters', { size: 32, y: 75, color: 'rgba(19,32,58,.92)' }), tag('CÓDIGO ROJO', 'Código', { color: SIG, size: 80, y: 68 })] },

  // 4. No fue un ataque: un arreglo de julio en sus servidores traía un defecto que nadie vio en cuatro meses.  (travelling hacia adelante por el pasillo de racks)
  { id: 'b04', set: 'room', cam: { from: [0.35, 1.95, 5.2], to: [0.0, 1.75, 3.5], look: [0, 1.35, -1], lookTo: [-0.2, 1.4, -1.2], fov: 46 }, keywords: ['ataque', 'servidores', 'cuatro'],
    actors: [
      DC(),
      ...[0.8, -0.3, -1.4, -2.5].flatMap((z, i) => [
        { type: 'rack', pos: [-1.35, 0, z] as any, rot: [0, PI / 2, 0] as any, p: { seed: i } },
        { type: 'rack', pos: [1.35, 0, z] as any, rot: [0, -PI / 2, 0] as any, p: { seed: i + 5 } },
      ]),
      { type: 'noattack', pos: [0, 0, 0.9], p: { ban: 0.49 }, out: 'arreglo' },
      { type: 'box', pos: [0, 0.65, -1.0], at: 'julio', enter: 'grow', p: { size: [0.06, 1.3, 0.06], color: '#59626e' } },
      { type: 'flipcal', pos: [0, 1.75, -1.0], s: 1.15, at: 'julio', p: { start: 0.9, every: 0.5 } },
      { type: 'glitch', pos: [-0.93, 1.25, -0.3], rot: [0, PI / 2, 0], s: 1.3, at: 'defecto' },
      { type: 'person', pos: [0.55, 0, -0.1], rot: [0, -0.5, 0], s: 0.92, at: 'nadie', p: { ...OPR, pose: 'shrug' } },
    ],
    overlays: [tag('NO FUE UN ATAQUE', 'ataque', { color: SIG, size: 52, y: 67.5 }), tag('JULIO → NOVIEMBRE: 4 MESES SIN VERLO', 'cuatro', { size: 34, y: 74.5 })] },

  // 5. Le sumaron el tráfico de Teams a esos servidores con menos capacidad, y se trabaron.  (lateral alto que corre junto a la cinta)
  { id: 'b05', set: 'room', cam: { from: [-1.2, 3.4, 4.9], to: [-0.2, 3.1, 4.5], look: [0, 0.75, -0.2], lookTo: [0.2, 0.8, -0.4], fov: 46 }, keywords: ['Teams', 'servidores', 'capacidad', 'trabaron'],
    actors: [
      DC(4.17),
      { type: 'traffic', pos: [0, 0, 2.2], rot: [0, PI / 2, 0], p: { len: 2.95, gap: 0.55, speed: 0.9, extra: 1.26, jam: 4.17 } },
      { type: 'rack', pos: [-0.95, 0, -1.2], p: { seed: 1, dark: 2.76 } },
      { type: 'rack', pos: [0, 0, -1.2], p: { seed: 2, red: 4.17 } },
      { type: 'rack', pos: [0.95, 0, -1.2], p: { seed: 3, dark: 2.9 } },
      { type: 'cross', pos: [-0.8, 1.3, -0.7], s: 0.4, at: 'menos' },
      { type: 'cross', pos: [0.95, 1.3, -0.7], s: 0.4, at: 'capacidad' },
    ],
    overlays: [tag('+ TRÁFICO DE TEAMS', 'Teams', { color: VIOLET, size: 50, y: 67.5 }), tag('- CAPACIDAD', 'capacidad', { color: SIG, size: 50, y: 74.5 })] },

  // 6. Otro memo admite que un arreglo urgente tardaba cinco o seis días en llegar a todo el mundo.  (picado que baja y gira sobre la mesa-mapa)
  { id: 'b06', set: 'room', cam: { from: [1.0, 4.6, 3.4], to: [-0.5, 3.6, 3.5], look: [0, 0.85, -0.2], lookTo: [0, 0.9, -0.3], fov: 46 }, keywords: ['urgente', 'cinco', 'seis'],
    actors: [
      OPS(),
      { type: 'maptable', pos: [0, 0, 0], p: { pins: [[-1.25, -0.45], [-0.8, 0.45], [-0.15, -0.55], [0.2, 0.35], [0.85, -0.5], [1.25, 0.45]], travel: { at: 1.36, dur: 3.9 } } },
      { type: 'folder', pos: [1.0, 0.93, 0.7], rot: [0, -0.4, 0], s: 0.4, at: 'memo', p: { open: 0.15 } },
      { type: 'person', pos: [-1.0, 0, 1.45], rot: [0, PI * 0.85, 0], p: { ...OPR, pose: 'hold' } },
      { type: 'flipcal', pos: [0, 1.35, -1.6], s: 0.75, at: 'tardaba', p: { months: ['DÍA 1', 'DÍA 2', 'DÍA 3', 'DÍA 4', 'DÍA 5', 'DÍA 6'], start: 0.2, every: 0.42 } },
      { type: 'box', pos: [0, 0.5, -1.6], at: 'tardaba', enter: 'grow', p: { size: [0.06, 1.0, 0.06], color: '#59626e' } },
    ],
    overlays: [tag('ARREGLO URGENTE: 5 A 6 DÍAS', 'cinco', { color: DARKAMB, size: 46, y: 70 })] },

  // 7. La meta nueva es resolver una caída global en una hora.  (contrapicado que empuja hacia el cronómetro)
  { id: 'b07', set: 'room', cam: { from: [0.7, 0.9, 5.9], to: [0.1, 1.2, 4.9], look: [0, 1.5, 0], lookTo: [0, 1.7, 0], fov: 46 }, keywords: ['global', 'hora'],
    actors: [
      { type: 'stage', p: { kind: 'office', dim: true } },
      { type: 'box', pos: [0, 0.35, 0], p: { size: [1.3, 0.7, 0.8], color: SLATE } },
      { type: 'stopwatch', pos: [0, 1.75, 0.05], s: 0.8, p: { sweep: 0.28 } },
      { type: 'ring', pos: [0, 0.03, 0], at: 'global', p: { r: 1.1, color: MINT } },
      { type: 'person', pos: [-1.3, 0, 0.6], rot: [0, 0.5, 0], p: { ...CO2, pose: 'idle' }, out: 'resolver' },
      { type: 'person', pos: [-1.3, 0, 0.6], rot: [0, 0.5, 0], at: 'resolver', enter: 'none', p: { ...CO2, pose: 'point' } },
      { type: 'person', pos: [1.3, 0, 0.7], rot: [0, -0.5, 0], at: 'caída', p: { ...OPR, pose: 'hold' } },
      { type: 'check', pos: [1.05, 2.7, 0.3], s: 0.6, at: 'hora' },
    ],
    overlays: [tag('META: 1 HORA', 'meta', { color: GREEN, size: 64, y: 70 })] },

  // 8. Es un memo interno, no una promesa a los clientes.  (deslizamiento lateral frente a la pared de vidrio)
  { id: 'b08', set: 'room', cam: { from: [-1.1, 3.1, 4.1], to: [0.6, 2.95, 3.9], look: [-0.1, 0.75, -0.5], lookTo: [0.2, 0.75, -0.6], fov: 46 }, keywords: ['interno', 'promesa'],
    actors: [
      OFFICE,
      { type: 'box', pos: [0, 0.45, 0.2], p: { size: [1.9, 0.9, 1.0], color: '#f4f6f8' } },
      { type: 'folder', pos: [0, 0.91, 0.25], rot: [0, 0.1, 0], s: 0.95, p: { open: 0, stamp: 0.64 } },
      { type: 'glass', pos: [0, 0, -0.9], p: { w: 4.4, h: 2.6 } },
      { type: 'person', pos: [-1.1, 0, 1.3], rot: [0, PI * 0.9, 0], s: 0.95, p: { ...OPR, pose: 'hold' } },
      { type: 'person', pos: [-1.6, 0, -1.8], rot: [0, PI / 2, 0], p: { ...CO1, pose: 'walk' }, move: { to: [-0.6, 0, -1.8], at: 0, dur: 2.4 }, out: 'clientes' },
      { type: 'person', pos: [-0.6, 0, -1.8], at: 'clientes', enter: 'none', p: { ...CO1, pose: 'idle' } },
      { type: 'person', pos: [0.2, 0, -1.9], at: 'clientes', p: { ...CO2, pose: 'shrug', phase: 1 } },
      { type: 'person', pos: [1.0, 0, -1.7], at: 'clientes', p: { ...YOU, pose: 'idle', phase: 2 } },
    ],
    overlays: [tag('MEMO INTERNO, NO PROMESA', 'interno', { size: 48, y: 70 })] },

  // 9. Si tu empresa paga Microsoft 365, puede reclamar un descuento.  (empuje frontal: la factura y el cupón)
  { id: 'b09', set: 'room', cam: { from: [0.3, 2.1, 5.6], to: [-0.15, 1.95, 4.5], look: [0, 1.45, 0], lookTo: [0, 1.5, 0], fov: 46 }, keywords: ['Microsoft', 'descuento'],
    actors: [
      OFFICE,
      { type: 'workdesk', pos: [-1.6, 0, -1.6], s: 0.85, p: { mon: {} } },
      { type: 'workdesk', pos: [1.6, 0, -1.6], s: 0.85, p: { mon: {}, mug: MINT } },
      { type: 'person', pos: [-0.75, 0, 0.1], rot: [0, 0.35, 0], p: { ...CO1, pose: 'hold' }, out: 'reclamar' },
      { type: 'person', pos: [-0.75, 0, 0.1], rot: [0, 0.35, 0], at: 'reclamar', enter: 'none', p: { ...CO1, pose: 'point' } },
      { type: 'invoice', pos: [0.45, 2.0, -0.3], rot: [0, -0.15, 0.04], s: 1.0, at: 'paga', bob: 0.03 },
      { type: 'ticket', pos: [0.25, 1.55, 0.7], s: 0.7, at: 'descuento', enter: 'pop' },
    ],
    overlays: [tag('TU EMPRESA PUEDE RECLAMAR UN DESCUENTO', 'empresa', { color: GREEN, size: 34, y: 70 })] },

  // 10. No llega solo: según guías especializadas, comprando directo se pide hasta el 31 de diciembre.  (se aleja del escritorio)
  { id: 'b10', set: 'room', cam: { from: [0.15, 1.95, 2.8], to: [-0.15, 2.35, 4.1], look: [0, 1.05, -0.3], lookTo: [0, 1.1, -0.3], fov: 46 }, keywords: ['especializadas', 'comprando', '31'],
    actors: [
      OFFICE,
      { type: 'box', pos: [0, 0.37, -0.2], p: { size: [2.4, 0.74, 1.1], color: '#f4f6f8' } },
      { type: 'tray', pos: [-0.7, 0.75, 0.0], rot: [0, 0.2, 0] },
      { type: 'cross', pos: [-0.7, 1.25, 0.05], s: 0.35, at: 'solo' },
      { type: 'claim', pos: [0.05, 1.35, -0.35], rot: [-0.25, 0, 0], at: 'según', p: { checks: [0.4, 1.9, 2.5, 3.0] } },
      { type: 'deskcal', pos: [0.6, 0.75, 0.05], rot: [0, -0.3, 0], s: 0.6, at: '31', p: { circle: 0.15 } },
    ],
    overlays: [tag('compra directa, según guías especializadas', 'según', { size: 28, y: 75.5, color: 'rgba(31,42,58,.92)' }), tag('HASTA EL 31/12', '31', { color: SIG, size: 60, y: 68.5 })] },

  // 11. Mandáselo al de sistemas de tu trabajo.  (vuelve el escritorio de b01; grúa que sube mientras el mail vuela)
  { id: 'b11', set: 'room', cam: { from: [0.5, 1.8, 3.5], to: [0.35, 2.6, 4.2], look: [0.25, 1.3, -0.5], lookTo: [0.35, 1.25, -0.6], fov: 46 }, keywords: ['Mandáselo', 'sistemas'],
    actors: [
      OFFICE,
      { type: 'workdesk', pos: [-0.1, 0, -0.4], p: { mon: { mode: 'sent' } } },
      ...chair(-0.45, 0.45),
      { type: 'person', pos: [-0.45, 0, 0.5], rot: [0, PI, 0], p: { ...YOU, pose: 'sitType' } },
      { type: 'fly', pos: [-0.1, 1.5, -0.4], p: { to: [1.2, -0.1, -0.3], at: 0.3, dur: 0.9 }, out: 1.25 },
      { type: 'person', pos: [1.1, 0, -0.8], rot: [0, -0.4, 0], p: { ...IT, pose: 'idle' }, out: 'sistemas' },
      { type: 'person', pos: [1.1, 0, -0.8], rot: [0, -0.4, 0], at: 'sistemas', enter: 'none', p: { ...IT, pose: 'hold' } },
      { type: 'check', pos: [1.1, 2.4, -0.8], s: 0.45, at: 'trabajo' },
    ],
    overlays: [tag('MANDÁSELO AL DE SISTEMAS', 0.05, { color: DARKAMB, size: 48, y: 70 })] },
];
