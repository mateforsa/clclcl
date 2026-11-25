import React from 'react';
import { AbsoluteFill, Audio, Composition, Sequence, continueRender, delayRender, staticFile } from 'remotion';
import '@fontsource/poppins/500.css'; import '@fontsource/poppins/600.css'; import '@fontsource/poppins/700.css'; import '@fontsource/poppins/800.css'; import '@fontsource/poppins/900.css';
import { BeatView, BeatSpec, TBeat } from './Beat';
import { REG } from './kit/Props';

export const FPS = 30;
const frameOf = (s: number) => Math.round(s * FPS);
type Timing = { duration: number; beats: TBeat[] };
const Video: React.FC<{ timing: Timing; beats: BeatSpec[] }> = ({ timing, beats }) => {
  const [ok, setOk] = React.useState(false); const [h] = React.useState(() => delayRender('fuentes'));
  React.useEffect(() => { Promise.all([500, 600, 700, 800, 900].map((w) => document.fonts.load(`${w} 40px Poppins`, 'Añ0'))).then(() => { setOk(true); continueRender(h); }); }, [h]);
  if (!ok) return null;
  const total = frameOf(timing.duration);
  return (
    <AbsoluteFill style={{ background: '#140a2e' }}>
      {timing.beats.map((tb, i) => { const spec = beats.find((b) => b.id === tb.id); const from = frameOf(tb.start); const to = i + 1 < timing.beats.length ? frameOf(timing.beats[i + 1].start) : total;
        if (!spec) return null;
        return <Sequence key={tb.id} from={from} durationInFrames={to - from} name={tb.id}><BeatView spec={spec} tb={tb} dur={(to - from) / FPS} /></Sequence>; })}
      <Audio src={staticFile('mix.wav')} />
    </AbsoluteFill>
  );
};
/** Root de un video. `extra` = props propios del video (videos/<slug>/props.tsx) que se suman al kit. */
export const makeRoot = (timing: Timing, beats: BeatSpec[], extra: Record<string, React.FC<any>> = {}): React.FC => {
  Object.assign(REG, extra);
  return () => <Composition id="Video" component={Video as any} defaultProps={{ timing, beats }} durationInFrames={frameOf(timing.duration)} fps={FPS} width={1080} height={1920} />;
};
