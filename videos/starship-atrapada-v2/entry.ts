import { registerRoot } from 'remotion';
import timing from './timing.json';
import { BEATS } from './beats';
import { EXTRA } from './props';
import { makeRoot } from '../../src/Video';
registerRoot(makeRoot(timing, BEATS, EXTRA));
