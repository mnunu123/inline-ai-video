// Scene 1: Hook — 한글 문서 작업의 고통 → 인라인 AI 등장 (18초)
import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {BG, Subs, Tag} from '../shared';
import {D} from '../constants';

const SUBS = [
  {s: 0,   e: 135, t: '한글 문서 작업, 매일 몇 시간씩 하고 계세요?'},
  {s: 135, e: 270, t: '보고서, 기안문, 소장... 아직도 직접 다 타이핑하시나요?'},
  {s: 270, e: 420, t: '그 시간을 10분의 1로 줄여주는 도구가 나왔어요.'},
  {s: 420, e: 540, t: '오늘은 인라인 AI를 소개해드릴게요!'},
];

// 한글 문서 제목들 (배경 플로팅 텍스트)
const DOC_TITLES = ['보고서.hwp', '기안문.hwp', '소장.hwp', '생활기록부.hwp', '제안서.hwp', '계약서.hwp'];

export const S1: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // 배경 플로팅 문서 제목
  const floatOp = interpolate(frame, [0, 20, 230, 270], [0, 0.35, 0.35, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  // "아직도 복붙하세요?" 질문 텍스트
  const qOp = interpolate(frame, [10, 30, 200, 240], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const qY  = interpolate(frame, [10, 30], [24, 0], {extrapolateRight: 'clamp'});

  // 인라인 AI 로고 스프링 등장
  const logoSc = spring({fps, frame: frame - 250, config: {stiffness: 200, damping: 14}});
  const logoOp = interpolate(frame, [250, 268], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const glow   = interpolate(Math.sin(frame * 0.07), [-1, 1], [20, 45]);

  const subOp  = interpolate(frame, [320, 345], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill>
      <BG a="#4f46e5" />
      <Tag label="📄  인라인 AI 소개" frame={frame} />

      {/* 배경 플로팅 문서 제목 */}
      {DOC_TITLES.map((t, i) => (
        <div key={i} style={{
          position: 'absolute',
          top: `${15 + i * 13}%`,
          left: `${5 + i * 14}%`,
          fontFamily: D.fontM, fontSize: 18, color: D.muted,
          opacity: floatOp,
          transform: `rotate(${i % 2 === 0 ? -3 : 2}deg)`,
        }}>{t}</div>
      ))}

      {/* 도입 질문 */}
      <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: 24}}>
        <div style={{
          fontFamily: D.fontH, fontSize: 72, fontWeight: 700, color: D.text,
          opacity: qOp, transform: `translateY(${qY}px)`, letterSpacing: '-0.02em',
          textAlign: 'center',
        }}>
          아직도 복사·붙여넣기<br />하고 계세요?
        </div>
      </AbsoluteFill>

      {/* 인라인 AI 로고 등장 */}
      <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: 22}}>
        <div style={{
          fontFamily: D.fontH, fontSize: 148, fontWeight: 800, color: D.accent,
          opacity: logoOp, transform: `scale(${logoSc})`,
          letterSpacing: '-0.04em', lineHeight: 1,
          textShadow: `0 0 ${glow}px ${D.accent}90, 0 0 80px ${D.accent}40`,
        }}>
          inline AI
        </div>
        <div style={{
          fontFamily: D.fontB, fontSize: 34, color: D.muted,
          opacity: subOp, letterSpacing: '-0.01em',
        }}>
          한글 문서 작업의 혁명
        </div>
      </AbsoluteFill>

      <Subs slides={SUBS} />
    </AbsoluteFill>
  );
};
