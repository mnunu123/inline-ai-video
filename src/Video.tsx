// 메인 영상 컴포넌트 — 오디오 트랙 + 13개 씬 Sequence 합성 (총 5400프레임 = 3분 @ 30fps)
import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {TIMING} from './constants';
import {AudioTrack} from './AudioTrack';
import {S1} from './scenes/S1';
import {S2} from './scenes/S2';
import {S3} from './scenes/S3';
import {S4} from './scenes/S4';
import {S5} from './scenes/S5';
import {S6} from './scenes/S6';
import {S7} from './scenes/S7';
import {S8} from './scenes/S8';
import {S9} from './scenes/S9';
import {S10} from './scenes/S10';
import {S11} from './scenes/S11';
import {S12} from './scenes/S12';
import {S13} from './scenes/S13';

// AudioTrack을 먼저 마운트해서 전체 타임라인에 오디오 큐를 배치
export const InlineAIVideo: React.FC = () => (
  <AbsoluteFill>
    <AudioTrack />

    <Sequence from={TIMING.S1.from}  durationInFrames={TIMING.S1.dur}><S1  /></Sequence>
    <Sequence from={TIMING.S2.from}  durationInFrames={TIMING.S2.dur}><S2  /></Sequence>
    <Sequence from={TIMING.S3.from}  durationInFrames={TIMING.S3.dur}><S3  /></Sequence>
    <Sequence from={TIMING.S4.from}  durationInFrames={TIMING.S4.dur}><S4  /></Sequence>
    <Sequence from={TIMING.S5.from}  durationInFrames={TIMING.S5.dur}><S5  /></Sequence>
    <Sequence from={TIMING.S6.from}  durationInFrames={TIMING.S6.dur}><S6  /></Sequence>
    <Sequence from={TIMING.S7.from}  durationInFrames={TIMING.S7.dur}><S7  /></Sequence>
    <Sequence from={TIMING.S8.from}  durationInFrames={TIMING.S8.dur}><S8  /></Sequence>
    <Sequence from={TIMING.S9.from}  durationInFrames={TIMING.S9.dur}><S9  /></Sequence>
    <Sequence from={TIMING.S10.from} durationInFrames={TIMING.S10.dur}><S10 /></Sequence>
    <Sequence from={TIMING.S11.from} durationInFrames={TIMING.S11.dur}><S11 /></Sequence>
    <Sequence from={TIMING.S12.from} durationInFrames={TIMING.S12.dur}><S12 /></Sequence>
    <Sequence from={TIMING.S13.from} durationInFrames={TIMING.S13.dur}><S13 /></Sequence>
  </AbsoluteFill>
);
