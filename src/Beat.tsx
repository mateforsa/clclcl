import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { ThreeCanvas } from '@remotion/three';
import { useThree } from '@react-three/fiber';
import { clamp, eio, eo, lerp, pop, V3 } from './kit/math';
import { REG } from './kit/Props';
import { SETS } from './kit/Sets';
import { Overlays, Subtitles, OverlaySpec } from './kit/Overlays';

export type At = string | number | undefined;
export type Actor = { type: string; pos?: V3; rot?: V3; s?: number; at?: At; enter?: 'pop' | 'drop' | 'grow' | 'none'; out?: At; p?: any;
  move?: { to: V3; at?: At; dur?: number }; spin?: number; bob?: number };
export type BeatSpec = { id: string; set?: 'neon' | 'room' | 'void'; cam: { from: V3; to: V3; look: V3; lookTo?: V3; fov?: number; shift?: number };
  actors: Actor[]; overlays?: OverlaySpec[]; keywords?: string[]; noSubs?: boolean };
export type TBeat = { id: string; start: number; end: number; text: string; words: { w: string; s: number; e: number }[] };

const norm = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9$]/g, '');
export const makeWhen = (tb: TBeat) => (at: At): number => {
  if (at === undefined) return 0;
  if (typeof at === 'number') return at < 0 ? tb.end - tb.start + at : at;
  const [word, nth] = at.split('#'); let k = Number(nth ?? 1);
  for (const w of tb.words) if (w.w.split(' ').some((x) => norm(x).startsWith(norm(word))) && --k === 0) return w.s - tb.start;
  throw new Error(`[${tb.id}] la palabra "${at}" no está en: ${tb.text}`);
};

const Cam: React.FC<{ cam: BeatSpec['cam']; k: number; dshift: number }> = ({ cam, k, dshift }) => {
  const { camera, size } = useThree(); (camera as any).setViewOffset(size.width, size.height, 0, -size.height * (cam.shift ?? dshift), size.width, size.height); const e = eio(k) * 0.5 + k * 0.5; const lt = cam.lookTo ?? cam.look;
  camera.position.set(lerp(cam.from[0], cam.to[0], e), lerp(cam.from[1], cam.to[1], e), lerp(cam.from[2], cam.to[2], e));
  (camera as any).fov = cam.fov ?? 42; camera.lookAt(lerp(cam.look[0], lt[0], e), lerp(cam.look[1], lt[1], e), lerp(cam.look[2], lt[2], e)); camera.updateProjectionMatrix();
  return null;
};
const ActorView: React.FC<{ a: Actor; t: number; when: (a: At) => number }> = ({ a, t, when }) => {
  const Cmp = REG[a.type]; if (!Cmp) throw new Error('actor desconocido: ' + a.type);
  const at = when(a.at); const tt = t - at; const enter = a.enter ?? (a.at === undefined ? 'none' : 'pop');
  if (tt < 0 && a.at !== undefined) return null; if (a.out !== undefined && t >= when(a.out)) return null;
  let [x, y, z] = a.pos ?? [0, 0, 0]; let sc: V3 = [a.s ?? 1, a.s ?? 1, a.s ?? 1];
  if (enter === 'pop') { const k = pop(tt); sc = [sc[0] * k, sc[1] * k, sc[2] * k]; }
  if (enter === 'drop') y += (1 - eo(tt / 0.35)) * 5;
  if (enter === 'grow') sc = [sc[0], sc[1] * Math.max(0.001, eo(tt / 0.5)), sc[2]];
  if (a.move) { const k = eio((t - when(a.move.at)) / (a.move.dur ?? 0.6)); x = lerp(x, a.move.to[0], k); y = lerp(y, a.move.to[1], k); z = lerp(z, a.move.to[2], k); }
  if (a.bob) y += Math.sin(t * 2.4) * a.bob;
  const r = a.rot ?? [0, 0, 0];
  return <group position={[x, y, z]} rotation={[r[0], r[1] + (a.spin ?? 0) * t, r[2]]} scale={sc}><Cmp t={t} tt={tt} p={a.p ?? {}} /></group>;
};

export const BeatView: React.FC<{ spec: BeatSpec; tb: TBeat; dur: number }> = ({ spec, tb, dur }) => {
  const frame = useCurrentFrame(); const { fps, width, height } = useVideoConfig(); const t = frame / fps; const when = makeWhen(tb);
  const SetC = SETS[spec.set ?? 'neon'];
  return (
    <AbsoluteFill style={{ background: '#140a2e' }}>
      <ThreeCanvas width={width} height={height} linear={false} camera={{ fov: 42, near: 0.1, far: 200 }}>
        <Cam cam={spec.cam} k={clamp(t / dur)} dshift={(spec.overlays ?? []).some((o) => o.type === 'big') ? 0.0 : 0.05} />
        <SetC />
        {spec.actors.map((a, i) => <ActorView key={i} a={a} t={t} when={when} />)}
      </ThreeCanvas>
      <AbsoluteFill style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0) 55%, rgba(8,3,24,.55) 100%)' }} />
      <Overlays list={spec.overlays ?? []} t={t} when={when} />
      {!spec.noSubs && <Subtitles tb={tb} t={t + tb.start} keywords={spec.keywords ?? []} />}
    </AbsoluteFill>
  );
};
