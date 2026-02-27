// 자막 타이밍과 동기화된 오디오 트랙 — 절대 프레임 기준으로 MP3를 Sequence에 배치
// generate-audio.js 실행 후 public/audio/*.mp3 가 존재해야 동작합니다
import React from 'react';
import {Audio, Sequence, interpolate, staticFile} from 'remotion';

// 절대 프레임 = 씬 시작(TIMING.Sn.from) + 자막 로컬 시작(s) 로 계산
// dur 은 자막 슬라이드 지속 프레임 수
const CUES = [
  // Scene 1 — Hook (from=0), 540f
  {id: 's1_1', from: 0,    dur: 135},
  {id: 's1_2', from: 135,  dur: 135},
  {id: 's1_3', from: 270,  dur: 150},
  {id: 's1_4', from: 420,  dur: 120},

  // Scene 2 — 인라인 AI란? (from=540), 420f
  {id: 's2_1', from: 540,  dur: 140},
  {id: 's2_2', from: 680,  dur: 140},
  {id: 's2_3', from: 820,  dur: 140},

  // Scene 3 — vs ChatGPT (from=960), 390f
  {id: 's3_1', from: 960,  dur: 130},
  {id: 's3_2', from: 1090, dur: 130},
  {id: 's3_3', from: 1220, dur: 130},

  // Scene 4 — 시작하기 (from=1350), 360f
  {id: 's4_1', from: 1350, dur: 120},
  {id: 's4_2', from: 1470, dur: 120},
  {id: 's4_3', from: 1590, dur: 120},

  // Scene 5 — UI 3분할 (from=1710), 450f
  {id: 's5_1', from: 1710, dur: 150},
  {id: 's5_2', from: 1860, dur: 150},
  {id: 's5_3', from: 2010, dur: 150},

  // Scene 6 — 선택적 수정 (from=2160), 360f
  {id: 's6_1', from: 2160, dur: 120},
  {id: 's6_2', from: 2280, dur: 120},
  {id: 's6_3', from: 2400, dur: 120},

  // Scene 7 — 자동 채우기 (from=2520), 360f
  {id: 's7_1', from: 2520, dur: 120},
  {id: 's7_2', from: 2640, dur: 120},
  {id: 's7_3', from: 2760, dur: 120},

  // Scene 8 — 대상 사용자 (from=2880), 480f
  {id: 's8_1', from: 2880, dur: 120},
  {id: 's8_2', from: 3000, dur: 120},
  {id: 's8_3', from: 3120, dur: 120},
  {id: 's8_4', from: 3240, dur: 120},

  // Scene 9 — 데이터 보안 (from=3360), 390f
  {id: 's9_1', from: 3360, dur: 130},
  {id: 's9_2', from: 3490, dur: 130},
  {id: 's9_3', from: 3620, dur: 130},

  // Scene 10 — 고급 활용 (from=3750), 390f
  {id: 's10_1', from: 3750, dur: 130},
  {id: 's10_2', from: 3880, dur: 130},
  {id: 's10_3', from: 4010, dur: 130},

  // Scene 11 — 현황 통계 (from=4140), 360f
  {id: 's11_1', from: 4140, dur: 120},
  {id: 's11_2', from: 4260, dur: 120},
  {id: 's11_3', from: 4380, dur: 120},

  // Scene 12 — 핵심 차별점 (from=4500), 450f
  {id: 's12_1', from: 4500, dur: 150},
  {id: 's12_2', from: 4650, dur: 150},
  {id: 's12_3', from: 4800, dur: 150},

  // Scene 13 — CTA (from=4950), 450f
  {id: 's13_1', from: 4950, dur: 150},
  {id: 's13_2', from: 5100, dur: 150},
  {id: 's13_3', from: 5250, dur: 150},
] as const;

// 각 오디오 큐를 Sequence로 감싸서 자막 타이밍에 정확히 맞춤
export const AudioTrack: React.FC = () => (
  <>
    {CUES.map(cue => (
      <Sequence
        key={cue.id}
        from={cue.from}
        durationInFrames={cue.dur + 20} // 오디오 자연스러운 페이드아웃 여유
      >
        <Audio
          src={staticFile(`audio/${cue.id}.mp3`)}
          // 처음 4프레임 페이드인, 마지막 8프레임 페이드아웃
          volume={(f) =>
            interpolate(
              f,
              [0, 4, cue.dur - 8, cue.dur + 20],
              [0, 1,           1,             0],
              {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
            )
          }
        />
      </Sequence>
    ))}
  </>
);
