import { registerRoot } from 'remotion';
import timing from './timing.json';
import { BEATS } from './beats';
import { EXTRA } from './props';
import { makeRoot } from '../../src/Video';
if (typeof document !== 'undefined' && !document.getElementById('subs-gap')) {
  const st = document.createElement('style'); st.id = 'subs-gap';
  st.textContent = 'div[style*="gap: 6px 20px"]{column-gap:32px !important;left:100px !important;right:118px !important} div[style*="gap: 6px 20px"] > span[style*="padding: 0px 18px"]{margin:0 8px}'
   + ' canvas{visibility:hidden !important} div[style*="radial-gradient"]{display:none !important}'
   + ' div[style*="translate(-50%, -50%)"]{background:#ff0000 !important;color:#ff0000 !important;box-shadow:none !important}';
  document.head.appendChild(st);
}
registerRoot(makeRoot(timing, BEATS.map((b) => ({ ...b, actors: [] })), EXTRA));
