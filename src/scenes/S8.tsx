// Scene 8: 대상 사용자 — 다양한 직군별 활용 사례 소개 (16초)
import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {BG, Subs, Tag} from '../shared';
import {D} from '../constants';

const SUBS = [
  {s: 0,   e: 120, t: '공무원, 직장인, 연구자... 문서 쓰는 모든 분께 맞아요.'},
  {s: 120, e: 240, t: '어떤 직종이든 반복 업무를 AI가 대신해줘요.'},
  {s: 240, e: 360, t: '특히 한글(HWP)을 많이 쓰는 분들께 최강이에요.'},
  {s: 360, e: 480, t: '지금 당장 써보면 왜 이게 필요했는지 알 거예요.'},
];

interface UserCard {
  icon: string;
  role: string;
  useCase: string;
  color: string;
  delay: number;
}

const USER_CARDS: UserCard[] = [
  {icon: '🏛️', role: '공무원',   useCase: '기안문·보고서 자동화',     color: D.accent,  delay: 20},
  {icon: '💼', role: '직장인',   useCase: '회의록·기획서 빠르게',     color: D.accent2, delay: 60},
  {icon: '🔬', role: '연구자',   useCase: '논문 초안·요약 작성',       color: D.accent3, delay: 100},
  {icon: '📚', role: '학생',     useCase: '레포트·과제 품질 향상',     color: '#a78bfa', delay: 140},
  {icon: '⚖️', role: '법무 담당', useCase: '계약서·법률 문서 검토',   color: '#f87171', delay: 180},
  {icon: '🏥', role: '의료진',   useCase: '진료 기록·보고서 정리',   color: '#34d399', delay: 220},
];

const Card: React.FC<{card: UserCard; frame: number}> = ({card, frame}) => {
  const {fps} = useVideoConfig();
  const lf = Math.max(0, frame - card.delay);
  const sc = spring({fps, frame: lf, config: {stiffness: 180, damping: 16}});
  const op = interpolate(lf, [0, 10], [0, 1], {extrapolateRight: 'clamp'});
  const ty = interpolate(lf, [0, 15], [20, 0], {extrapolateRight: 'clamp'});

  return (
    <div style={{
      opacity: op, transform: `scale(${sc}) translateY(${ty}px)`,
      background: D.surface, border: `1px solid ${card.color}40`,
      borderRadius: 14, padding: '20px 22px', width: 220,
      boxShadow: `0 4px 24px ${card.color}15`,
      display: 'flex', flexDirection: 'column', gap: 10,
    }}>
      {/* 아이콘 + 직종 */}
      <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
        <div style={{
          width: 44, height: 44, borderRadius: 12,
          background: `${card.color}20`, border: `1px solid ${card.color}40`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 24,
        }}>
          {card.icon}
        </div>
        <span style={{
          fontFamily: D.fontB, fontSize: 18, fontWeight: 700,
          color: card.color,
        }}>
          {card.role}
        </span>
      </div>

      {/* 활용 사례 */}
      <div style={{
        background: `${card.color}12`, borderRadius: 8,
        padding: '8px 12px',
        fontFamily: D.fontB, fontSize: 13, color: D.muted,
        lineHeight: 1.5,
      }}>
        {card.useCase}
      </div>

      {/* 효과 게이지 */}
      <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
        <span style={{fontFamily: D.fontM, fontSize: 11, color: D.muted}}>업무 단축</span>
        <div style={{flex: 1, height: 4, background: D.border, borderRadius: 2, overflow: 'hidden'}}>
          <div style={{
            height: '100%', width: '75%',
            background: `linear-gradient(90deg, ${card.color}, ${card.color}80)`,
            borderRadius: 2,
          }} />
        </div>
        <span style={{fontFamily: D.fontM, fontSize: 11, color: card.color, fontWeight: 700}}>75%</span>
      </div>
    </div>
  );
};

export const S8: React.FC = () => {
  const frame = useCurrentFrame();
  const titleOp = interpolate(frame, [0, 18], [0, 1], {extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill>
      <BG a="#f59e0b" />
      <Tag label="👥  대상 사용자" frame={frame} />

      <div style={{
        position: 'absolute', top: 80, left: 0, right: 0, textAlign: 'center',
        fontFamily: D.fontH, fontSize: 54, fontWeight: 800, color: D.text,
        opacity: titleOp, letterSpacing: '-0.03em',
      }}>
        <span style={{color: D.accent3}}>문서 쓰는 모든 분</span>을 위해
      </div>

      {/* 2×3 카드 그리드 */}
      <AbsoluteFill style={{
        justifyContent: 'center', alignItems: 'center',
        paddingTop: 60,
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 18,
        }}>
          {USER_CARDS.map((card) => (
            <Card key={card.role} card={card} frame={frame} />
          ))}
        </div>
      </AbsoluteFill>

      <Subs slides={SUBS} />
    </AbsoluteFill>
  );
};
