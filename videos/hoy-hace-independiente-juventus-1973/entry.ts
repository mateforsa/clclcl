import { registerRoot } from 'remotion';
import timing from './timing.json';
import { BEATS } from './beats';
import { EXTRA } from './props';
import { makeRoot } from '../../src/Video';

// Sin tocar src/, solo en este video:
// 1) Subtítulos: el motor deja 20 px entre palabras y agranda la activa un 6 %; en palabras largas eso deja la unión en 9-13 px
//    (el revisor pide >= 14). Como en exportaciones-agro-5717, el hueco horizontal entre palabras pasa a 32 px.
// 2) Tono de TV vieja / VHS: el 3D (canvas) va un poco desaturado y cálido. Los textos HTML quedan iguales.
if (typeof document !== 'undefined' && !document.getElementById('subs-gap')) {
  const st = document.createElement('style'); st.id = 'subs-gap';
  st.textContent = 'div[style*="gap: 6px 20px"]{column-gap:32px !important} canvas{filter:saturate(.8) contrast(1.06) sepia(.14)}';
  document.head.appendChild(st);
}
registerRoot(makeRoot(timing, BEATS, EXTRA));
