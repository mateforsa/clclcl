import React from 'react';
import { Composition } from 'remotion';
import { Video, TOTAL, FPS } from './Video';
export const Root: React.FC = () => <Composition id="Video" component={Video} durationInFrames={TOTAL} fps={FPS} width={1080} height={1920} />;
