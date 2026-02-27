// Scene 10: 고급 활용 — 템플릿·매크로·일괄 처리 고급 기능 소개 (13초)
import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {BG, Subs, Tag} from '../shared';
import {D} from '../constants';

const SUBS = [
  {s: 0,   e: 130, t: '익숙해지면 고급 기능도 쓸 수 있어요.'},
  {s: 130, e: 260, t: '나만의 AI 템플릿을 만들어서 반복 업무를 자동화해요.'},
  {s: 260, e: 390, t: '수십 개 문서도 한 번에 처리할 수 있어요!'},
];

// 고급 기능 아이템
const FEATURES = [
  {
    icon: '📐', title: '커스텀 템플릿',
    desc: '자주 쓰는 문서 양식을 AI 프롬프트로 저장',
    color: D.accent, step: '01',
  },
  {
    icon: '⚡', title: '매크로 단축키',
    desc: '단축키 하나로 즐겨쓰는 AI 명령 즉시 실행',
    color: D.accent3, step: '02',
  },
  {
    icon: '🔄', title: '일괄 처리',
    desc: '여러 문서에 동일한 AI 작업을 한 번에 적용',
    color: D.accent2, step: '03',
  },
];

// 터미널 스타일 코드 뷰
const TerminalCard: React.FC<{frame: number}> = ({frame}) => {
  const op = interpolate(Math.max(0, frame - 100), [0, 20], [0, 1], {extrapolateRight: 'clamp'});
  const ty = interpolate(Math.max(0, frame - 100), [0, 20], [20, 0], {extrapolateRight: 'clamp'});

  const lines = [
    {text: '# 일괄 처리 예시', color: D.muted, delay: 110},
    {text: '문서 목록: 보고서_1.hwp ~ 50.hwp', color: D.text, delay: 130},
    {text: '적용 명령: "3번 항목을 구체화해줘"', color: D.accent3, delay: 150},
    {text: '처리 중... ████████░░ 80%', color: D.accent, delay: 200},
    {text: '✓ 50개 문서 완료! (2분 소요)', color: D.accent2, delay: 240},
  ];

  return (
    <div style={{
      opacity: op, transform: `translateY(${ty}px)`,
      background: '#0d1117', border: `1px solid ${D.border}`,
      borderRadius: 10, overflow: 'hidden', width: 400,
      boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
    }}>
      {/* 터미널 헤더 */}
      <div style={{
        background: '#1e1e2e', padding: '8px 14px',
        display: 'flex', alignItems: 'center', gap: 7,
      }}>
        {['#ff5f57', '#febc2e', '#28c840'].map((c, i) => (
          <div key={i} style={{width: 11, height: 11, borderRadius: '50%', background: c}} />
        ))}
        <span style={{marginLeft: 8, fontFamily: D.fontM, fontSize: 11, color: D.muted}}>
          inline-ai — 일괄처리
        </span>
      </div>
      {/* 터미널 내용 */}
      <div style={{padding: '14px 18px', display: 'flex', flexDirection: 'column', gap: 8}}>
        {lines.map((line, i) => {
          const lf = Math.max(0, frame - line.delay);
          const lineOp = interpolate(lf, [0, 12], [0, 1], {extrapolateRight: 'clamp'});
          return (
            <div key={i} style={{
              opacity: lineOp,
              fontFamily: D.fontM, fontSize: 13, color: line.color,
              display: 'flex', gap: 8,
            }}>
              <span style={{color: D.accent2, flexShrink: 0}}>{'>'}</span>
              <span>{line.text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// 기능 카드
const FeatureCard: React.FC<{feat: typeof FEATURES[0]; frame: number}> = ({feat, frame}) => {
  const {fps} = useVideoConfig();
  const delay = 20 + FEATURES.indexOf(feat) * 35;
  const lf = Math.max(0, frame - delay);
  const sc = spring({fps, frame: lf, config: {stiffness: 180, damping: 16}});
  const op = interpolate(lf, [0, 12], [0, 1], {extrapolateRight: 'clamp'});

  return (
    <div style={{
      opacity: op, transform: `scale(${sc})`,
      background: D.surface, border: `1px solid ${feat.color}40`,
      borderRadius: 12, padding: '18px 20px',
      display: 'flex', flexDirection: 'column', gap: 10,
      width: 200, boxShadow: `0 4px 20px ${feat.color}15`,
    }}>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <span style={{fontSize: 28}}>{feat.icon}</span>
        <span style={{
          fontFamily: D.fontM, fontSize: 11, color: feat.color,
          background: `${feat.color}20`, padding: '3px 8px', borderRadius: 4,
        }}>
          {feat.step}
        </span>
      </div>
      <div style={{fontFamily: D.fontB, fontSize: 16, fontWeight: 700, color: feat.color}}>
        {feat.title}
      </div>
      <div style={{fontFamily: D.fontB, fontSize: 13, color: D.muted, lineHeight: 1.5}}>
        {feat.desc}
      </div>
    </div>
  );
};

export const S10: React.FC = () => {
  const frame = useCurrentFrame();
  const titleOp = interpolate(frame, [0, 18], [0, 1], {extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill>
      <BG a="#a78bfa" />
      <Tag label="⚡  고급 활용" frame={frame} />

      <div style={{
        position: 'absolute', top: 88, left: 0, right: 0, textAlign: 'center',
        fontFamily: D.fontH, fontSize: 56, fontWeight: 800, color: D.text,
        opacity: titleOp, letterSpacing: '-0.03em',
      }}>
        <span style={{color: '#a78bfa'}}>고급 기능</span>으로 더 빠르게
      </div>

      <AbsoluteFill style={{
        justifyContent: 'center', alignItems: 'center',
        flexDirection: 'row', gap: 40, paddingTop: 60,
      }}>
        {/* 왼쪽: 3개 기능 카드 */}
        <div style={{display: 'flex', flexDirection: 'column', gap: 14}}>
          {FEATURES.map(feat => (
            <FeatureCard key={feat.title} feat={feat} frame={frame} />
          ))}
        </div>

        {/* 오른쪽: 터미널 카드 */}
        <TerminalCard frame={frame} />
      </AbsoluteFill>

      <Subs slides={SUBS} />
    </AbsoluteFill>
  );
};
