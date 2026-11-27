// SOLO control de calidad del productor (se borra antes de entregar): el video sin subtítulos ni placas
import { registerRoot } from 'remotion';
import timing from './timing.json';
import { BEATS } from './beats';
import { EXTRA } from './props';
import { makeRoot } from '../../src/Video';
registerRoot(makeRoot(timing, BEATS.map((b) => ({ ...b, noSubs: true, overlays: [] })), EXTRA));
