import React from 'react';
import { AbsoluteFill, Audio, Sequence, continueRender, delayRender, staticFile, useVideoConfig } from 'remotion';
import '@fontsource/poppins/500.css'; import '@fontsource/poppins/600.css'; import '@fontsource/poppins/700.css'; import '@fontsource/poppins/800.css'; import '@fontsource/poppins/900.css';
import timing from './timing.json';
import { BEATS } from './beats';
import { BeatView } from './Beat';

export const FPS = 30;
export const frameOf = (s: number) => Math.round(s * FPS);
export const TOTAL = frameOf(timing.duration);
export const Video: React.FC<{ audio?: string }> = ({ audio = 'mix.wav' }) => {
  const [ok, setOk] = React.useState(false); const [h] = React.useState(() => delayRender('fuentes'));
  React.useEffect(() => { Promise.all([500, 600, 700, 800, 900].map((w) => document.fonts.load(`${w} 40px Poppins`, 'Añ0'))).then(() => { setOk(true); continueRender(h); }); }, [h]);
  if (!ok) return null;
  return (
    <AbsoluteFill style={{ background: '#140a2e' }}>
      {timing.beats.map((tb, i) => { const spec = BEATS.find((b) => b.id === tb.id); const from = frameOf(tb.start); const to = i + 1 < timing.beats.length ? frameOf(timing.beats[i + 1].start) : TOTAL;
        if (!spec) return null;
        return <Sequence key={tb.id} from={from} durationInFrames={to - from} name={tb.id}><BeatView spec={spec} tb={tb} dur={(to - from) / FPS} /></Sequence>; })}
      <Audio src={staticFile(audio)} />
    </AbsoluteFill>
  );
};
