import { registerRoot } from 'remotion';
import timing from './timing.json';
import { BEATS } from './beats';
import { EXTRA } from './props';
import { makeRoot } from '../../src/Video';

// Subtítulos: el motor deja 20 px entre palabras y agranda la activa un 6 %; en palabras largas ("exportaciones",
// "agroindustriales", "5.717 millones") eso deja la unión en 9-13 px (el revisor pide >= 14). Sin tocar src/: solo en este
// video, el hueco horizontal entre palabras del renglón de subtítulos pasa a 32 px (el resto del estilo queda igual).
if (typeof document !== 'undefined' && !document.getElementById('subs-gap')) {
  const st = document.createElement('style'); st.id = 'subs-gap';
  st.textContent = 'div[style*="gap: 6px 20px"]{column-gap:32px !important}';
  document.head.appendChild(st);
}
registerRoot(makeRoot(timing, BEATS, EXTRA));
