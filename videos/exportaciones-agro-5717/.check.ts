import { BEATS } from './beats';
import timing from './timing.json';
const norm = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9$]/g, '');
const nk = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]/g, '');
const letters = (s: string) => s.replace(/[^\p{L}\p{N}]/gu, '').length;
let bad = 0; const say = (m: string) => { bad++; console.log('  !! ' + m); };
for (const b of BEATS) {
  const tb = (timing as any).beats.find((x: any) => x.id === b.id);
  const anchors: string[] = [];
  const walk = (o: any) => { if (!o || typeof o !== 'object') return; for (const k of ['at', 'out']) if (typeof o[k] === 'string') anchors.push(o[k]); if (o.move && typeof o.move.at === 'string') anchors.push(o.move.at); };
  b.actors.forEach(walk); (b.overlays ?? []).forEach(walk);
  const lines: string[] = [];
  for (const a of anchors) {
    const [word, nth] = a.split('#'); let k = Number(nth ?? 1); let hit: any = null;
    const all = tb.words.filter((w: any) => w.w.split(' ').some((x: string) => norm(x).startsWith(norm(word))));
    for (const w of tb.words) if (w.w.split(' ').some((x: string) => norm(x).startsWith(norm(word))) && --k === 0) { hit = w; break; }
    if (!hit) { say(`${b.id} ancla "${a}" no existe`); continue; }
    if (!hit.w.split(' ').includes(word)) say(`${b.id} ancla "${a}" cae en "${hit.w}" (no es el token exacto)`);
    if (!nth && all.length > 1) say(`${b.id} ancla "${a}" calza con ${all.length} palabras: ${all.map((w: any) => w.w).join(', ')}`);
    lines.push(`${a}@${(hit.s - tb.start).toFixed(2)}`);
  }
  const kw = (b.keywords ?? []).map(nk);
  for (const k of b.keywords ?? []) { const ex = tb.words.filter((w: any) => w.w === k); if (!ex.length) say(`${b.id} keyword "${k}" no es token exacto`);
    const hl = tb.words.filter((w: any) => nk(w.w).startsWith(nk(k))); if (hl.length > ex.length) say(`${b.id} keyword "${k}" resalta además: ${hl.map((w: any) => w.w).join(', ')}`); }
  // chunks como Subtitles
  const out: any[][] = []; let cur: any[] = []; let len = 0;
  for (const w of tb.words) { cur.push(w); len += w.w.length; if (/[.?!:]$/.test(w.w) || cur.length >= 3 || len >= 15) { out.push(cur); cur = []; len = 0; } }
  if (cur.length) { if (cur.length === 1 && out.length && !/[.?!:]$/.test(out[out.length - 1][out[out.length - 1].length - 1].w)) out[out.length - 1].push(...cur); else out.push(cur); }
  const isK = (w: any) => kw.some((k) => nk(w.w).startsWith(k));
  for (const ch of out) for (let i = 0; i + 1 < ch.length; i++) { const a = ch[i], c = ch[i + 1];
    if (!isK(a) && !isK(c) && letters(a.w) + letters(c.w) > 20) say(`${b.id} pegadas: "${a.w} ${c.w}"`);
    if (c.s - a.e < 0.04 && !isK(a) && !isK(c) && letters(a.w) >= 7 && letters(c.w) >= 7) say(`${b.id} transición rápida: "${a.w}"->"${c.w}" (${(c.s - a.e).toFixed(3)})`); }
  for (const o of (b.overlays ?? []) as any[]) if (o.type === 'tag') { const h = (o.size ?? 44) * 1.5 + 12; const y = o.y / 100 * 1920; const wpx = o.text.length * (o.size ?? 44) * 0.64 + 52;
    if (y + h / 2 > 1450 || y - h / 2 < 250) say(`${b.id} tag "${o.text}" fuera de zona (${(y - h / 2) | 0}-${(y + h / 2) | 0})`);
    if (wpx > 900) say(`${b.id} tag "${o.text}" ancho ~${wpx | 0}px`); }
  else if (o.type === 'pill') say(`${b.id} usa pill`);
  console.log(b.id, out.map((c) => c.map((w: any) => w.w).join(' ')).join(' | '), '\n   anclas:', lines.join(' '));
}
console.log(bad ? `${bad} problemas` : 'OK');
