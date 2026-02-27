// Remotion 루트 — 1920×1080, 30fps, 180초(3분)
import React from 'react';
import {Composition} from 'remotion';
import {InlineAIVideo} from './Video';

export const RemotionRoot: React.FC = () => (
  <Composition
    id="InlineAIVideo"
    component={InlineAIVideo}
    durationInFrames={5400}
    fps={30}
    width={1920}
    height={1080}
  />
);
