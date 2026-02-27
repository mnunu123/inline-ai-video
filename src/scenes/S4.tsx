// Scene 4: 시작하기 — 4단계 설치 및 사용법 (12초)
import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {BG, Subs, Tag} from '../shared';
import {D} from '../constants';

const SUBS = [
  {s: 0,   e: 120, t: '시작 방법은 되게 간단해요.'},
  {s: 120, e: 240, t: '설치하고, 문서 열고, AI한테 지시하면 끝이에요.'},
  {s: 240, e: 360, t: '별도 학습 없이 바로 쓸 수 있어요.'},
];

const STEPS = [
  {n: 1, icon: '⬇️', title: '설치',       desc: 'inline-ai.com 에서\n다운로드 & 설치'},
  {n: 2, icon: '📄', title: '문서 열기',  desc: 'HWP / DOCX / PDF\n불러오기'},
  {n: 3, icon: '💬', title: 'AI 지시',    desc: '오른쪽 채팅창에\n원하는 작업 입력'},
  {n: 4, icon: '✨', title: '완성',       desc: 'AI가 직접 문서를\n편집·완성'},
];

const Step: React.FC<{n: number; icon: string; title: string; desc: string; delay: number; frame: number}> = ({n, icon, title, desc, delay, frame}) => {
  const {fps} = useVideoConfig();
  const sc = spring({fps, frame: Math.max(0, frame - delay), config: {stiffness: 200, damping: 14}});
  const op = interpolate(Math.max(0, frame - delay), [0, 10], [0, 1], {extrapolateRight: 'clamp'});
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14,
      opacity: op, transform: `scale(${sc})`,
    }}>
      {/* 번호 원 */}
      <div style={{
        width: 64, height: 64, borderRadius: '50%',
        background: `${D.accent}20`, border: `2px solid ${D.accent}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: D.fontM, fontSize: 26, color: D.accent, fontWeight: 700,
      }}>{n}</div>

      {/* 아이콘 + 카드 */}
      <div style={{
        background: D.surface, border: `1px solid ${D.border}`,
        borderRadius: 12, padding: '24px 28px',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
        width: 220,
      }}>
        <span style={{fontSize: 44}}>{icon}</span>
        <span style={{fontFamily: D.fontH, fontSize: 24, color: D.text, fontWeight: 700}}>{title}</span>
        <span style={{fontFamily: D.fontB, fontSize: 17, color: D.muted, textAlign: 'center', whiteSpace: 'pre-line'}}>{desc}</span>
      </div>
    </div>
  );
};

const ConnLine: React.FC<{delay: number; frame: number}> = ({delay, frame}) => {
  const op = interpolate(Math.max(0, frame - delay), [0, 10], [0, 1], {extrapolateRight: 'clamp'});
  return (
    <div style={{
      width: 60, height: 2,
      background: `linear-gradient(90deg, ${D.accent}60, ${D.accent2}60)`,
      opacity: op, marginTop: -80,
    }} />
  );
};

export const S4: React.FC = () => {
  const frame = useCurrentFrame();
  const titleOp = interpolate(frame, [0, 18], [0, 1], {extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill>
      <BG a="#10b98120" />
      <Tag label="🚀  시작하기" frame={frame} />

      <div style={{position: 'absolute', top: 120, left: 0, right: 0, textAlign: 'center',
        fontFamily: D.fontH, fontSize: 64, fontWeight: 800, color: D.text,
        opacity: titleOp, letterSpacing: '-0.03em'}}>
        딱 4단계면 끝
      </div>

      <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 18, marginTop: 40}}>
        {STEPS.map((s, i) => (
          <React.Fragment key={i}>
            <Step {...s} delay={20 + i * 40} frame={frame} />
            {i < STEPS.length - 1 && <ConnLine delay={55 + i * 40} frame={frame} />}
          </React.Fragment>
        ))}
      </AbsoluteFill>

      <Subs slides={SUBS} />
    </AbsoluteFill>
  );
};
