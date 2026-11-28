// SOLO control de calidad (no es el render): objetos clave en magenta, placas en verde semitransparente, sin subtítulos.
import { registerRoot } from 'remotion';
import timing from './timing.json';
import { BEATS } from './beats';
import { EXTRA } from './props';
import { makeRoot } from '../../src/Video';
(window as any).__QCF = true;
if (typeof document !== 'undefined' && !document.getElementById('qc-css')) {
  const st = document.createElement('style'); st.id = 'qc-css';
  st.textContent = 'div[style*="-50%"]{background:rgba(0,255,0,.5) !important;color:transparent !important;box-shadow:none !important} div[style*="gap: 6px 20px"]{display:none !important}';
  document.head.appendChild(st);
}
registerRoot(makeRoot(timing, BEATS, EXTRA));
