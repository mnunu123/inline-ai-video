// Scene 11: 현황 통계 — 생산성 향상 수치·사용자 현황 인포그래픽 (12초)
import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {BG, Subs, Tag} from '../shared';
import {D} from '../constants';

const SUBS = [
  {s: 0,   e: 120, t: '실제 사용자들이 체감한 변화를 숫자로 보여드릴게요.'},
  {s: 120, e: 240, t: '문서 작성 시간이 평균 73% 줄었어요!'},
  {s: 240, e: 360, t: '한번 쓰기 시작하면 되돌아가기가 힘들다는 분들이 많아요.'},
];

// 통계 아이템
const STATS = [
  {value: 73, unit: '%', label: '업무 시간 단축', color: D.accent,  suffix: '↓', delay: 20},
  {value: 4.8, unit: '점', label: '사용자 만족도',  color: D.accent2, suffix: '★', delay: 60},
  {value: 12, unit: '분', label: '문서 평균 완성',  color: D.accent3, suffix: '⚡', delay: 100},
  {value: 50, unit: 'K+', label: '월간 활성 사용자', color: '#a78bfa', suffix: '👤', delay: 140},
];

// 카운터 애니메이션 (숫자가 올라가는 효과)
const StatCard: React.FC<{stat: typeof STATS[0]; frame: number}> = ({stat, frame}) => {
  const {fps} = useVideoConfig();
  const lf = Math.max(0, frame - stat.delay);
  const sc = spring({fps, frame: lf, config: {stiffness: 160, damping: 18}});
  const op = interpolate(lf, [0, 12], [0, 1], {extrapolateRight: 'clamp'});

  // 숫자 카운트업 (0 → target)
  const countProgress = interpolate(lf, [0, 60], [0, 1], {extrapolateRight: 'clamp'});
  const displayValue = stat.value * countProgress;
  const formattedValue = stat.value % 1 !== 0
    ? displayValue.toFixed(1)
    : Math.round(displayValue).toString();

  return (
    <div style={{
      opacity: op, transform: `scale(${sc})`,
      background: D.surface, border: `1px solid ${stat.color}40`,
      borderRadius: 16, padding: '28px 30px',
      display: 'flex', flexDirection: 'column', gap: 12,
      boxShadow: `0 8px 32px ${stat.color}20`,
      width: 220, alignItems: 'center', textAlign: 'center',
    }}>
      {/* 아이콘 배지 */}
      <div style={{
        width: 50, height: 50, borderRadius: '50%',
        background: `${stat.color}20`, border: `2px solid ${stat.color}40`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 22,
      }}>
        {stat.suffix}
      </div>

      {/* 숫자 */}
      <div style={{
        fontFamily: D.fontH, fontSize: 52, fontWeight: 900,
        color: stat.color, lineHeight: 1,
        textShadow: `0 0 20px ${stat.color}60`,
      }}>
        {formattedValue}
        <span style={{fontSize: 24}}>{stat.unit}</span>
      </div>

      {/* 라벨 */}
      <div style={{
        fontFamily: D.fontB, fontSize: 15, color: D.muted,
        lineHeight: 1.4,
      }}>
        {stat.label}
      </div>

      {/* 프로그레스 바 */}
      <div style={{width: '100%', height: 4, background: D.border, borderRadius: 2, overflow: 'hidden'}}>
        <div style={{
          height: '100%', width: `${countProgress * 100}%`,
          background: `linear-gradient(90deg, ${stat.color}, ${stat.color}60)`,
          borderRadius: 2,
        }} />
      </div>
    </div>
  );
};

export const S11: React.FC = () => {
  const frame = useCurrentFrame();
  const titleOp = interpolate(frame, [0, 18], [0, 1], {extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill>
      <BG a="#4f46e5" />
      <Tag label="📊  실제 효과" frame={frame} />

      <div style={{
        position: 'absolute', top: 88, left: 0, right: 0, textAlign: 'center',
        fontFamily: D.fontH, fontSize: 56, fontWeight: 800, color: D.text,
        opacity: titleOp, letterSpacing: '-0.03em',
      }}>
        숫자로 보는 <span style={{color: D.accent}}>실제 효과</span>
      </div>

      {/* 4개 통계 카드 */}
      <AbsoluteFill style={{
        justifyContent: 'center', alignItems: 'center',
        flexDirection: 'row', gap: 24, paddingTop: 60,
      }}>
        {STATS.map(stat => (
          <StatCard key={stat.label} stat={stat} frame={frame} />
        ))}
      </AbsoluteFill>

      <Subs slides={SUBS} />
    </AbsoluteFill>
  );
};
