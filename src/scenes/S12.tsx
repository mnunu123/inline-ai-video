// Scene 12: 핵심 차별점 — 인라인 AI만의 3가지 강점 요약 (15초)
import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {BG, Subs, Tag} from '../shared';
import {D} from '../constants';

const SUBS = [
  {s: 0,   e: 150, t: '그래서 인라인 AI가 왜 다른지, 딱 3가지로 정리할게요.'},
  {s: 150, e: 300, t: 'HWP 완벽 지원, 컨텍스트 유지, 그리고 한국어 최적화!'},
  {s: 300, e: 450, t: '이 세 가지가 합쳐지면 진짜 다른 경험이 돼요.'},
];

// 차별점 3가지
const DIFFS = [
  {
    num: '01', icon: '📝', title: 'HWP 완벽 지원',
    points: [
      '한글(HWP) 파일 직접 편집',
      '표·그림·서식 100% 유지',
      '변환 없이 바로 작업',
    ],
    color: D.accent,
  },
  {
    num: '02', icon: '🧠', title: '문서 컨텍스트 유지',
    points: [
      '문서 전체 맥락을 AI가 기억',
      '앞뒤 내용 참고해서 수정',
      '일관성 있는 문체 자동 유지',
    ],
    color: D.accent2,
  },
  {
    num: '03', icon: '🇰🇷', title: '한국어 최적화',
    points: [
      '공문서 어투 자동 조정',
      '한국어 맞춤법·문법 특화',
      '행정 용어 정확하게 사용',
    ],
    color: D.accent3,
  },
];

// 차이점 카드 컴포넌트
const DiffCard: React.FC<{diff: typeof DIFFS[0]; frame: number; index: number}> = ({diff, frame, index}) => {
  const {fps} = useVideoConfig();
  const delay = 30 + index * 50;
  const lf = Math.max(0, frame - delay);
  const sc = spring({fps, frame: lf, config: {stiffness: 160, damping: 17}});
  const op = interpolate(lf, [0, 15], [0, 1], {extrapolateRight: 'clamp'});
  const ty = interpolate(lf, [0, 20], [30, 0], {extrapolateRight: 'clamp'});

  return (
    <div style={{
      opacity: op, transform: `scale(${sc}) translateY(${ty}px)`,
      background: D.surface, border: `1px solid ${diff.color}50`,
      borderRadius: 16, padding: '28px 26px',
      display: 'flex', flexDirection: 'column', gap: 16,
      width: 280, boxShadow: `0 8px 40px ${diff.color}20`,
      position: 'relative', overflow: 'hidden',
    }}>
      {/* 배경 번호 워터마크 */}
      <div style={{
        position: 'absolute', right: -10, top: -10,
        fontFamily: D.fontH, fontSize: 100, fontWeight: 900,
        color: `${diff.color}08`, lineHeight: 1,
        userSelect: 'none',
      }}>
        {diff.num}
      </div>

      {/* 헤더 */}
      <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
        <div style={{
          width: 52, height: 52, borderRadius: 14,
          background: `${diff.color}20`, border: `1.5px solid ${diff.color}50`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 28,
        }}>
          {diff.icon}
        </div>
        <div>
          <div style={{fontFamily: D.fontM, fontSize: 11, color: diff.color, letterSpacing: '0.1em'}}>
            포인트 {diff.num}
          </div>
          <div style={{fontFamily: D.fontB, fontSize: 18, fontWeight: 700, color: D.text}}>
            {diff.title}
          </div>
        </div>
      </div>

      {/* 구분선 */}
      <div style={{height: 1, background: `${diff.color}30`}} />

      {/* 포인트 목록 */}
      <div style={{display: 'flex', flexDirection: 'column', gap: 10}}>
        {diff.points.map((point, i) => {
          const pointLf = Math.max(0, frame - (delay + 20 + i * 15));
          const pointOp = interpolate(pointLf, [0, 12], [0, 1], {extrapolateRight: 'clamp'});
          return (
            <div key={i} style={{
              opacity: pointOp,
              display: 'flex', alignItems: 'flex-start', gap: 10,
            }}>
              <div style={{
                width: 6, height: 6, borderRadius: '50%',
                background: diff.color, marginTop: 6, flexShrink: 0,
              }} />
              <span style={{fontFamily: D.fontB, fontSize: 14, color: D.muted, lineHeight: 1.5}}>
                {point}
              </span>
            </div>
          );
        })}
      </div>

      {/* 하단 강조 배지 */}
      <div style={{
        background: `${diff.color}15`, borderRadius: 8, padding: '8px 12px',
        fontFamily: D.fontM, fontSize: 12, color: diff.color,
        textAlign: 'center', letterSpacing: '0.05em',
      }}>
        타 제품 대비 독보적 우위
      </div>
    </div>
  );
};

export const S12: React.FC = () => {
  const frame = useCurrentFrame();
  const titleOp = interpolate(frame, [0, 18], [0, 1], {extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill>
      <BG a="#4f46e5" />
      <Tag label="🏆  핵심 차별점" frame={frame} />

      <div style={{
        position: 'absolute', top: 80, left: 0, right: 0, textAlign: 'center',
        fontFamily: D.fontH, fontSize: 54, fontWeight: 800, color: D.text,
        opacity: titleOp, letterSpacing: '-0.03em',
      }}>
        <span style={{color: D.accent}}>3가지</span>로 차별화된 이유
      </div>

      {/* 3개 카드 */}
      <AbsoluteFill style={{
        justifyContent: 'center', alignItems: 'center',
        flexDirection: 'row', gap: 24, paddingTop: 60,
      }}>
        {DIFFS.map((diff, i) => (
          <DiffCard key={diff.num} diff={diff} frame={frame} index={i} />
        ))}
      </AbsoluteFill>

      <Subs slides={SUBS} />
    </AbsoluteFill>
  );
};
