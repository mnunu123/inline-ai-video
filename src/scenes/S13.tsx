// Scene 13: CTA — 마무리 + 구독·좋아요 + 무료 체험 유도 (15초)
import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {BG, Subs, Tag} from '../shared';
import {D} from '../constants';

const SUBS = [
  {s: 0,   e: 150, t: '지금 인라인 AI 홈페이지에서 무료로 체험해보세요!'},
  {s: 150, e: 300, t: '구독이랑 좋아요는 영상 제작에 큰 힘이 돼요.'},
  {s: 300, e: 450, t: '다음 영상도 기대해주세요. 감사합니다!'},
];

// 중앙 로고 + 슬로건
const LogoSection: React.FC<{frame: number}> = ({frame}) => {
  const {fps} = useVideoConfig();
  const sc = spring({fps, frame: Math.max(0, frame - 10), config: {stiffness: 120, damping: 14}});
  const op = interpolate(frame, [0, 20], [0, 1], {extrapolateRight: 'clamp'});

  // 글로우 펄스
  const glowOp = interpolate(frame % 90, [0, 45, 90], [0.4, 1, 0.4], {extrapolateRight: 'clamp'});

  return (
    <div style={{
      opacity: op, transform: `scale(${sc})`,
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16,
    }}>
      {/* 로고 */}
      <div style={{
        position: 'relative',
        width: 120, height: 120, borderRadius: 28,
        background: `linear-gradient(135deg, ${D.accent}, ${D.accent2})`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 60,
        boxShadow: `0 0 ${80 * glowOp}px ${D.accent}60, 0 0 ${40 * glowOp}px ${D.accent2}40`,
      }}>
        ✍️
      </div>
      {/* 제품명 */}
      <div style={{
        fontFamily: D.fontH, fontSize: 68, fontWeight: 900,
        color: D.text, letterSpacing: '-0.04em',
        textShadow: `0 0 40px ${D.accent}40`,
      }}>
        인라인 AI
      </div>
      <div style={{
        fontFamily: D.fontB, fontSize: 20, color: D.muted,
        letterSpacing: '0.04em',
      }}>
        당신의 문서 작업을 10배 빠르게
      </div>
    </div>
  );
};

// CTA 버튼
const CTAButton: React.FC<{frame: number; delay: number; label: string; icon: string; color: string; isPrimary?: boolean}> = (
  {frame, delay, label, icon, color, isPrimary = false}
) => {
  const {fps} = useVideoConfig();
  const lf = Math.max(0, frame - delay);
  const sc = spring({fps, frame: lf, config: {stiffness: 200, damping: 18}});
  const op = interpolate(lf, [0, 12], [0, 1], {extrapolateRight: 'clamp'});

  // 버튼 호버 효과 (주기적 스케일)
  const pulse = isPrimary
    ? 1 + interpolate(frame % 60, [0, 30, 60], [0, 0.03, 0], {extrapolateRight: 'clamp'})
    : 1;

  return (
    <div style={{
      opacity: op, transform: `scale(${sc * pulse})`,
      background: isPrimary
        ? `linear-gradient(135deg, ${color}, ${D.accent2})`
        : `${color}18`,
      border: `1.5px solid ${color}${isPrimary ? 'FF' : '60'}`,
      borderRadius: 14, padding: isPrimary ? '18px 36px' : '14px 28px',
      display: 'flex', alignItems: 'center', gap: 10,
      cursor: 'pointer',
      boxShadow: isPrimary ? `0 8px 32px ${color}40` : `0 4px 16px ${color}20`,
    }}>
      <span style={{fontSize: isPrimary ? 24 : 20}}>{icon}</span>
      <span style={{
        fontFamily: D.fontB, fontSize: isPrimary ? 20 : 16, fontWeight: 700,
        color: isPrimary ? '#fff' : color,
      }}>
        {label}
      </span>
    </div>
  );
};

// 소셜 카운터 배지
const SocialBadge: React.FC<{frame: number; delay: number; icon: string; count: string; label: string}> = (
  {frame, delay, icon, count, label}
) => {
  const lf = Math.max(0, frame - delay);
  const op = interpolate(lf, [0, 20], [0, 1], {extrapolateRight: 'clamp'});
  const ty = interpolate(lf, [0, 20], [10, 0], {extrapolateRight: 'clamp'});

  return (
    <div style={{
      opacity: op, transform: `translateY(${ty}px)`,
      display: 'flex', alignItems: 'center', gap: 8,
      background: D.surface, border: `1px solid ${D.border}`,
      borderRadius: 8, padding: '8px 16px',
    }}>
      <span style={{fontSize: 18}}>{icon}</span>
      <div>
        <div style={{fontFamily: D.fontH, fontSize: 18, fontWeight: 700, color: D.text}}>{count}</div>
        <div style={{fontFamily: D.fontB, fontSize: 11, color: D.muted}}>{label}</div>
      </div>
    </div>
  );
};

export const S13: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill>
      <BG a="#4f46e5" />
      <Tag label="🎬  마무리" frame={frame} />

      {/* 상단: 로고 + 슬로건 */}
      <AbsoluteFill style={{
        justifyContent: 'flex-start', alignItems: 'center',
        paddingTop: 120,
      }}>
        <LogoSection frame={frame} />
      </AbsoluteFill>

      {/* 중단: CTA 버튼들 */}
      <AbsoluteFill style={{
        justifyContent: 'center', alignItems: 'center',
        flexDirection: 'row', gap: 20,
        marginTop: 120,
      }}>
        <CTAButton
          frame={frame} delay={60}
          label="무료로 시작하기" icon="🚀"
          color={D.accent} isPrimary
        />
        <CTAButton
          frame={frame} delay={90}
          label="구독" icon="🔔"
          color={D.accent3}
        />
        <CTAButton
          frame={frame} delay={110}
          label="좋아요" icon="👍"
          color={D.accent2}
        />
      </AbsoluteFill>

      {/* 하단: 소셜 카운터 + URL */}
      <AbsoluteFill style={{
        justifyContent: 'flex-end', alignItems: 'center',
        paddingBottom: 160, flexDirection: 'column', gap: 14,
      }}>
        <div style={{display: 'flex', gap: 12}}>
          <SocialBadge frame={frame} delay={150} icon="🌐" count="inline-ai.kr" label="공식 사이트" />
          <SocialBadge frame={frame} delay={170} icon="💬" count="무료 체험" label="지금 바로" />
          <SocialBadge frame={frame} delay={190} icon="📧" count="문의하기" label="hello@inline-ai.kr" />
        </div>

        {/* 마지막 자막 위 감사 문구 */}
        <div style={{
          opacity: interpolate(Math.max(0, frame - 280), [0, 20], [0, 1], {extrapolateRight: 'clamp'}),
          fontFamily: D.fontB, fontSize: 16, color: D.muted,
          letterSpacing: '0.08em',
        }}>
          시청해 주셔서 감사합니다 🙏
        </div>
      </AbsoluteFill>

      <Subs slides={SUBS} />
    </AbsoluteFill>
  );
};
