import { registerRoot } from 'remotion';
import timing from './timing.json';
import { BEATS } from './beats';
import { EXTRA } from './props';
import { makeRoot } from '../../src/Video';

// Subtítulos: el motor deja 20 px entre palabras y agranda la activa un 6 %; con palabras largas la unión baja de 14 px.
// Igual que en hoy-hace-magallanes-pacifico (sin tocar src/): solo en este video el hueco horizontal entre palabras pasa a 32 px
// y las palabras clave (recuadro azul) llevan 8 px más de cada lado: el recuadro cuenta como tinta en la medición.
if (typeof document !== 'undefined' && !document.getElementById('subs-gap')) {
  const st = document.createElement('style'); st.id = 'subs-gap';
  st.textContent = 'div[style*="gap: 6px 20px"]{column-gap:32px !important;left:100px !important;right:118px !important} div[style*="gap: 6px 20px"] > span[style*="padding: 0px 18px"]{margin:0 8px}';
  document.head.appendChild(st);
}
registerRoot(makeRoot(timing, BEATS, EXTRA));
