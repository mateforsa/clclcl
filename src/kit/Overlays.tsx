import React from 'react';
import { AbsoluteFill, Img, staticFile } from 'remotion';
import { C, clamp, eo, lerp, pop } from './math';

export type OverlaySpec =
  | { type: 'pill'; text: string; at?: any; red?: boolean; out?: any }
  | { type: 'big'; text: string; sub?: string; at?: any; y?: number; count?: { to: number; pre?: string; post?: string; dec?: number }; red?: boolean; out?: any; size?: number }
  | { type: 'chapter'; n: string; title: string; at?: any }
  | { type: 'plate'; name: string; role: string; at?: any; y?: number; out?: any }
  | { type: 'cover'; kicker?: string; lines: { t: string; c?: 'yellow' | 'red' | 'cyan'; size?: number }[]; y?: number; at?: any }
  | { type: 'photo'; src: string; at?: any; out?: any; mode?: 'full' | 'card'; caption?: string; credit?: string; zoom?: [number, number]; pan?: [number, number]; dur?: number; tilt?: number }
  | { type: 'tag'; text: string; at?: any; x: number; y: number; color?: string; out?: any; size?: number };
const F = 'Poppins, sans-serif';
const fmt = (v: number, dec = 0) => v.toFixed(dec).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');

export const Overlays: React.FC<{ list: OverlaySpec[]; t: number; when: (a: any) => number }> = ({ list, t, when }) => (
  <AbsoluteFill style={{ fontFamily: F }}>
    {list.map((o, i) => {
      const tt = t - when(o.at); if (tt < 0) return null; if ((o as any).out !== undefined && t >= when((o as any).out)) return null;
      const k = pop(tt);
      if (o.type === 'pill') return (
        <div key={i} style={{ position: 'absolute', left: 0, right: 0, top: '77.5%', display: 'flex', justifyContent: 'center' }}>
          <div style={{ transform: `scale(${k})`, background: o.red ? C.red : 'rgba(20,10,46,.88)', border: `4px solid ${o.red ? '#ff8b96' : C.cyan}`, color: '#fff', fontWeight: 700, fontSize: 50, padding: '10px 44px', borderRadius: 60, letterSpacing: 1, boxShadow: `0 0 34px ${o.red ? C.red : C.cyan}88` }}>{o.text}</div>
        </div>);
      if (o.type === 'big') {
        const txt = o.count ? `${o.count.pre ?? ''}${fmt(lerp(0, o.count.to, eo(tt / 0.9)), o.count.dec ?? 0)}${o.count.post ?? ''}` : o.text; const col = o.red ? C.red : C.gold;
        return (
          <div key={i} style={{ position: 'absolute', left: 0, right: 0, top: `${o.y ?? 66}%`, display: 'flex', justifyContent: 'center' }}>
            <div style={{ transform: `scale(${k})`, textAlign: 'center', background: 'rgba(16,8,40,.9)', border: `7px solid ${col}`, borderRadius: 30, padding: '4px 40px 10px', boxShadow: `0 0 60px ${col}99, inset 0 0 30px ${col}33`, maxWidth: 900 }}>
              <div style={{ color: col, fontWeight: 900, fontSize: o.size ?? 112, lineHeight: 1.08, textShadow: `0 0 28px ${col}aa`, whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' }}>{txt}</div>
              {o.sub && <div style={{ color: '#fff', fontWeight: 600, fontSize: 38, marginTop: 0 }}>{o.sub}</div>}
            </div>
          </div>);
      }
      if (o.type === 'chapter') return (
        <AbsoluteFill key={i} style={{ justifyContent: 'center', alignItems: 'center', background: `rgba(14,6,36,${0.74 * clamp(tt / 0.2)})` }}>
          <div style={{ transform: `scale(${k})`, textAlign: 'center', marginTop: 120 }}>
            <div style={{ color: '#fff', fontWeight: 900, fontSize: 150, letterSpacing: 4, lineHeight: 1, textShadow: `0 0 50px ${C.magenta}, 0 0 100px ${C.magenta}, 0 0 12px #fff` }}>{o.n}</div>
            <div style={{ color: C.gold, fontWeight: 800, fontSize: 84, marginTop: 20, opacity: clamp((tt - 0.35) / 0.2), textShadow: `0 0 30px ${C.gold}99` }}>{o.title}</div>
          </div>
        </AbsoluteFill>);
      if (o.type === 'plate') return (
        <div key={i} style={{ position: 'absolute', left: 0, right: 0, top: `${o.y ?? 66}%`, display: 'flex', justifyContent: 'center' }}>
          <div style={{ transform: `translateX(${(1 - eo(tt / 0.3)) * -200}px)`, opacity: clamp(tt / 0.15), background: '#fff', borderLeft: `16px solid ${C.magenta}`, padding: '10px 34px', borderRadius: 10, boxShadow: '0 10px 40px rgba(0,0,0,.5)' }}>
            <span style={{ color: '#1a1030', fontWeight: 800, fontSize: 48 }}>{o.name}</span><span style={{ color: '#6b5aa8', fontWeight: 500, fontSize: 38 }}> · {o.role}</span>
          </div>
        </div>);
      if (o.type === 'cover') { const col = { yellow: '#ffe14a', red: '#ff3b4e', cyan: C.cyan } as any; const st = '0 0 0 #000, 6px 6px 0 #000, -6px 6px 0 #000, 6px -6px 0 #000, -6px -6px 0 #000, 0 10px 0 #000, 0 18px 40px rgba(0,0,0,.9)';
        return (
        <AbsoluteFill key={i} style={{ background: 'linear-gradient(180deg, rgba(8,3,24,.55) 0%, rgba(8,3,24,0) 30%, rgba(8,3,24,0) 48%, rgba(8,3,24,.92) 72%, rgba(8,3,24,.98) 100%)' }}>
          {o.kicker && <div style={{ position: 'absolute', left: 0, right: 0, top: '23.5%', display: 'flex', justifyContent: 'center' }}>
            <div style={{ background: C.red, color: '#fff', fontWeight: 900, fontSize: 64, padding: '6px 40px', borderRadius: 16, letterSpacing: 3, transform: 'rotate(-3deg)', boxShadow: '0 10px 0 #000, 0 20px 50px rgba(0,0,0,.6)' }}>{o.kicker}</div></div>}
          <div style={{ position: 'absolute', left: 30, right: 30, top: `${o.y ?? 56}%`, textAlign: 'center', transform: 'rotate(-2deg)' }}>
            {o.lines.map((l, j) => <div key={j} style={{ color: l.c ? col[l.c] : '#fff', fontWeight: 900, fontSize: l.size ?? 150, lineHeight: 1.02, letterSpacing: -2, textShadow: st, whiteSpace: 'nowrap' }}>{l.t}</div>)}
          </div>
        </AbsoluteFill>); }
      if (o.type === 'photo') {
        // Foto real animada sin IA: zoom y paneo lentos. `src` es un archivo de videos/<slug>/public/fotos/.
        const dur = o.dur ?? (o.out !== undefined ? when(o.out) - when(o.at) : 4); const p = clamp(tt / Math.max(dur, 0.1));
        const [z0, z1] = o.zoom ?? [1.04, 1.16]; const [px, py] = o.pan ?? [0, -2]; const z = lerp(z0, z1, p);
        const img = <Img src={staticFile('fotos/' + o.src)} style={{ width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${z}) translate(${px * p}%, ${py * p}%)` }} />;
        const pie = (o.caption || o.credit) && (
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '60px 26px 18px', background: 'linear-gradient(transparent, rgba(8,3,24,.92))', color: '#fff' }}>
            {o.caption && <div style={{ fontWeight: 800, fontSize: 44, lineHeight: 1.1 }}>{o.caption}</div>}
            {o.credit && <div style={{ fontWeight: 500, fontSize: 24, opacity: 0.75, marginTop: 4 }}>Foto: {o.credit}</div>}
          </div>);
        if ((o.mode ?? 'card') === 'full') return (
          <AbsoluteFill key={i} style={{ opacity: clamp(tt / 0.18), overflow: 'hidden', background: '#0b0420' }}>
            {img}
            <AbsoluteFill style={{ background: 'linear-gradient(180deg, rgba(8,3,24,.8) 0%, rgba(8,3,24,0) 30%, rgba(8,3,24,0) 62%, rgba(8,3,24,.9) 100%)' }} />
            {pie && <div style={{ position: 'absolute', left: 60, right: 140, bottom: '20%' }}>{pie}</div>}
          </AbsoluteFill>);
        return (
          <div key={i} style={{ position: 'absolute', left: '9%', right: '9%', top: '27%', height: '37%', transform: `scale(${k}) rotate(${o.tilt ?? -2}deg)`,
            border: '12px solid #fff', borderRadius: 26, overflow: 'hidden', boxShadow: '0 30px 80px rgba(0,0,0,.7), 0 0 0 4px #000', background: '#0b0420' }}>
            {img}{pie}
          </div>);
      }
      if (o.type === 'tag') return (
        <div key={i} style={{ position: 'absolute', left: `${o.x}%`, top: `${o.y}%`, transform: `translate(-50%,-50%) scale(${k})`, background: o.color ?? C.blue, color: '#fff', fontWeight: 800, fontSize: o.size ?? 44, padding: '6px 26px', borderRadius: 14, whiteSpace: 'nowrap', boxShadow: '0 8px 30px rgba(0,0,0,.45)' }}>{o.text}</div>);
      return null;
    })}
  </AbsoluteFill>
);

const nk = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]/g, '');
export const Subtitles: React.FC<{ tb: { words: { w: string; s: number; e: number }[] }; t: number; keywords: string[] }> = ({ tb, t, keywords }) => {
  const chunks = React.useMemo(() => { const out: typeof tb.words[] = []; let cur: typeof tb.words = []; let len = 0;
    for (const w of tb.words) { cur.push(w); len += w.w.length; if (/[.?!:]$/.test(w.w) || cur.length >= 3 || len >= 15) { out.push(cur); cur = []; len = 0; } }
    if (cur.length) { if (cur.length === 1 && out.length && !/[.?!:]$/.test(out[out.length - 1][out[out.length - 1].length - 1].w)) out[out.length - 1].push(...cur); else out.push(cur); } return out; }, [tb]);
  let idx = 0; for (let i = 0; i < chunks.length; i++) if (t >= chunks[i][0].s - 0.04) idx = i;
  const ch = chunks[idx]; const kw = keywords.map(nk);
  return (
    <div style={{ position: 'absolute', left: 50, right: 50, top: '15.5%', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '6px 20px', fontFamily: F }}>
      {ch.map((w, i) => { const said = t >= w.e, act = t >= w.s - 0.04 && !said; const isK = kw.some((k) => nk(w.w).startsWith(k));
        return <span key={idx + '-' + i} style={{ fontSize: 68, lineHeight: 1.2, fontWeight: act || isK ? 800 : 500, color: act ? '#fff' : said ? 'rgba(255,255,255,.55)' : 'rgba(255,255,255,.9)',
          background: isK ? C.blue : 'transparent', padding: isK ? '0 18px' : 0, borderRadius: 14, transform: `scale(${act ? 1.06 : 1})`, textShadow: '0 4px 18px rgba(0,0,0,.85), 0 0 4px rgba(0,0,0,.9)' }}>{w.w}</span>; })}
    </div>
  );
};
