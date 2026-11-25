// Exporta los instantes de cada evento visual (para sincronizar los SFX): npx tsx scripts/events.ts <slug>
import fs from 'fs';
const slug = process.argv[2]; if (!slug) { console.error('uso: events.ts <slug>'); process.exit(1); }
const { BEATS } = require(`../videos/${slug}/beats`);
const timing = JSON.parse(fs.readFileSync(`videos/${slug}/timing.json`, 'utf8'));
const norm = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9$]/g, '');
const ev: { t: number; k: string }[] = [];
for (const tb of timing.beats) {
  const spec = BEATS.find((b: any) => b.id === tb.id); if (!spec) throw new Error('falta ' + tb.id);
  const when = (at: any): number => { if (at === undefined) return 0; if (typeof at === 'number') return at;
    const [w, n] = at.split('#'); let k = Number(n ?? 1);
    for (const x of tb.words) if (x.w.split(' ').some((y: string) => norm(y).startsWith(norm(w))) && --k === 0) return x.s - tb.start; throw new Error(`[${tb.id}] ${at}`); };
  ev.push({ t: tb.start, k: 'cut' });
  for (const a of spec.actors) if (a.at !== undefined) ev.push({ t: tb.start + when(a.at), k: a.type === 'coins' ? 'coins' : a.type === 'cross' ? 'bad' : a.type === 'clips' || a.type === 'crowd' ? 'swarm' : 'pop' });
  for (const o of spec.overlays ?? []) ev.push({ t: tb.start + when((o as any).at), k: o.type === 'chapter' ? 'chapter' : o.type === 'big' ? ((o as any).count ? 'count' : 'boom') : 'pop' });
}
fs.writeFileSync(`videos/${slug}/events.json`, JSON.stringify(ev.sort((a, b) => a.t - b.t)));
console.log(ev.length, 'eventos');
