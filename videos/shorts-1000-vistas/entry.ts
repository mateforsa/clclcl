import { registerRoot } from 'remotion';
import timing from './timing.json';
import { BEATS } from './beats';
import { makeRoot } from '../../src/Video';
registerRoot(makeRoot(timing, BEATS));
