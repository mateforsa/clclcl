// Plano único para la foto de perfil del canal (no es un video).
import type { BeatSpec } from '../../src/Beat';
import { C } from '../../src/kit/math';
export const BEATS: BeatSpec[] = [
  { id: 'b01', cam: { from: [0.6, 1.9, 7.4], to: [0.6, 1.9, 7.4], look: [0, 1.25, 0], fov: 40, shift: 0 },
    actors: [
      { type: 'ring', pos: [0, 0.03, 0], p: { r: 0.85, color: C.cyan } },
      { type: 'person', rot: [0, 0.25, 0], p: { shirt: C.gold, hair: '#15102b', pose: 'shrug' } },
      { type: 'label', pos: [0, 2.3, 0], p: { text: '?', w: 0.7, h: 0.7, size: 0.95, color: C.magenta, weight: 900 } },
    ] },
];
