// control: keywords exactas sin choque por prefijo, n.º de molinos (119), subtítulos con dos palabras largas en un renglón
import timing from './timing.json';
import { BEATS } from './beats';
import { cabaPts } from './props';
const nk = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]/g, '');
let bad = 0;
for (const b of BEATS) { const tb = (timing as any).beats.find((x: any) => x.id === b.id);
  for (const k of b.keywords ?? []) { const exact = tb.words.filter((w: any) => w.w === k); const pref = tb.words.filter((w: any) => nk(w.w).startsWith(nk(k)));
    if (exact.length !== 1 || pref.length !== 1) { bad++; console.log('KEYWORD', b.id, k, 'exactas', exact.length, 'por prefijo', pref.map((w: any) => w.w)); } }
  // renglones del motor: 3 palabras o >=15 letras
  const ch: any[][] = []; let cur: any[] = []; let len = 0;
  for (const w of tb.words) { cur.push(w); len += w.w.length; if (/[.?!:]$/.test(w.w) || cur.length >= 3 || len >= 15) { ch.push(cur); cur = []; len = 0; } }
  if (cur.length) { if (cur.length === 1 && ch.length && !/[.?!:]$/.test(ch[ch.length - 1][ch[ch.length - 1].length - 1].w)) ch[ch.length - 1].push(...cur); else ch.push(cur); }
  for (const c of ch) { const kws = (b.keywords ?? []).map(nk); const plain = c.filter((w: any) => !kws.some((k) => nk(w.w).startsWith(k)));
    const L = c.reduce((s: number, w: any) => s + w.w.length, 0); console.log(b.id, c.map((w: any) => (kws.some((k) => nk(w.w).startsWith(k)) ? '[' + w.w + ']' : w.w)).join(' '), L > 18 ? ' <-- LARGO ' + L : ''); }
  for (let i = 1; i < tb.words.length; i++) { const g = tb.words[i].s - tb.words[i - 1].e; if (g < 0.04 && tb.words[i].w.length + tb.words[i - 1].w.length > 14) console.log('  TRANSICION', b.id, tb.words[i - 1].w, tb.words[i].w, g.toFixed(3)); }
}
console.log('molinos CABA:', cabaPts(2.5, 119, 3).length, 'keywords mal:', bad);
