// Scene 9: 데이터 보안 — 로컬 처리·암호화·개인정보 보호 시각화 (13초)
import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {BG, Subs, Tag} from '../shared';
import {D} from '../constants';

const SUBS = [
  {s: 0,   e: 130, t: '내 문서가 외부로 유출될까 걱정되시죠?'},
  {s: 130, e: 260, t: '인라인 AI는 문서를 서버에 저장하지 않아요.'},
  {s: 260, e: 390, t: '보안이 중요한 공공기관과 기업에서도 안심하고 쓸 수 있어요.'},
];

// 보안 특징 아이템
const SECURITY_ITEMS = [
  {icon: '🔒', title: '로컬 처리', desc: '문서가 내 PC에서만 처리됨', color: D.accent},
  {icon: '🛡️', title: '무저장 원칙', desc: '대화 내용 서버 저장 없음',    color: D.accent2},
  {icon: '🔐', title: 'E2E 암호화', desc: 'API 통신 전 구간 암호화',      color: D.accent3},
  {icon: '✅', title: '공공기관 적합', desc: '공공기관 보안 지침 준수',   color: '#a78bfa'},
];

// 흐르는 암호화 파티클
const EncryptParticle: React.FC<{x: number; y: number; frame: number; delay: number; char: string}> = ({x, y, frame, delay, char}) => {
  const lf = Math.max(0, frame - delay);
  const op = interpolate(lf % 60, [0, 10, 50, 60], [0, 0.7, 0.7, 0], {extrapolateRight: 'clamp'});
  const ty = interpolate(lf % 60, [0, 60], [0, -20], {extrapolateRight: 'clamp'});

  return (
    <div style={{
      position: 'absolute', left: x, top: y,
      opacity: op, transform: `translateY(${ty}px)`,
      fontFamily: D.fontM, fontSize: 11, color: D.accent2,
    }}>
      {char}
    </div>
  );
};

// 보안 아이템 카드
const SecurityCard: React.FC<{item: typeof SECURITY_ITEMS[0]; index: number; frame: number}> = ({item, index, frame}) => {
  const {fps} = useVideoConfig();
  const delay = 40 + index * 40;
  const lf = Math.max(0, frame - delay);
  const sc = spring({fps, frame: lf, config: {stiffness: 200, damping: 18}});
  const op = interpolate(lf, [0, 12], [0, 1], {extrapolateRight: 'clamp'});

  return (
    <div style={{
      opacity: op, transform: `scale(${sc})`,
      background: D.surface, border: `1px solid ${item.color}40`,
      borderRadius: 12, padding: '18px 20px',
      display: 'flex', flexDirection: 'column', gap: 10,
      boxShadow: `0 0 24px ${item.color}15`,
      width: 200,
    }}>
      <div style={{fontSize: 32}}>{item.icon}</div>
      <div style={{fontFamily: D.fontB, fontSize: 16, fontWeight: 700, color: item.color}}>
        {item.title}
      </div>
      <div style={{fontFamily: D.fontB, fontSize: 13, color: D.muted, lineHeight: 1.5}}>
        {item.desc}
      </div>
      {/* 인증 체크 */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 6,
        marginTop: 4,
      }}>
        <div style={{
          width: 16, height: 16, borderRadius: '50%',
          background: `${item.color}30`, border: `1.5px solid ${item.color}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 9, color: item.color,
        }}>
          ✓
        </div>
        <span style={{fontFamily: D.fontM, fontSize: 10, color: item.color}}>검증 완료</span>
      </div>
    </div>
  );
};

// 중앙 방패 아이콘
const ShieldCenter: React.FC<{frame: number}> = ({frame}) => {
  const {fps} = useVideoConfig();
  const sc = spring({fps, frame: Math.max(0, frame - 10), config: {stiffness: 120, damping: 14}});
  const pulseOp = interpolate(frame % 60, [0, 30, 60], [0.3, 0.8, 0.3], {extrapolateRight: 'clamp'});

  return (
    <div style={{
      position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center',
      transform: `scale(${sc})`,
    }}>
      {/* 맥박 원 */}
      <div style={{
        position: 'absolute',
        width: 140, height: 140, borderRadius: '50%',
        border: `2px solid ${D.accent2}`,
        opacity: pulseOp,
        transform: `scale(${1 + pulseOp * 0.2})`,
      }} />
      {/* 방패 배경 */}
      <div style={{
        width: 100, height: 100, borderRadius: '50%',
        background: `radial-gradient(circle, ${D.accent2}30, ${D.accent}20)`,
        border: `2px solid ${D.accent2}60`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 48,
        boxShadow: `0 0 40px ${D.accent2}40`,
      }}>
        🛡️
      </div>
    </div>
  );
};

export const S9: React.FC = () => {
  const frame = useCurrentFrame();
  const titleOp = interpolate(frame, [0, 18], [0, 1], {extrapolateRight: 'clamp'});

  // 암호화 파티클 위치들
  const particles = [
    {x: 80, y: 200, char: '01'}, {x: 140, y: 350, char: '10'},
    {x: 200, y: 250, char: 'AE'}, {x: 1680, y: 220, char: 'FF'},
    {x: 1740, y: 320, char: '3C'}, {x: 1800, y: 260, char: '7B'},
    {x: 400, y: 600, char: '♦'}, {x: 1500, y: 580, char: '♦'},
  ];

  return (
    <AbsoluteFill>
      <BG a="#10b981" />
      <Tag label="🔒  데이터 보안" frame={frame} />

      {/* 배경 파티클 */}
      {particles.map((p, i) => (
        <EncryptParticle key={i} {...p} frame={frame} delay={i * 15} />
      ))}

      <div style={{
        position: 'absolute', top: 88, left: 0, right: 0, textAlign: 'center',
        fontFamily: D.fontH, fontSize: 56, fontWeight: 800, color: D.text,
        opacity: titleOp, letterSpacing: '-0.03em',
      }}>
        내 문서는 <span style={{color: D.accent2}}>철저히 보호</span>돼요
      </div>

      {/* 메인: 방패 중앙 + 4개 카드 */}
      <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', paddingTop: 60}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 50}}>
          {/* 왼쪽 2개 카드 */}
          <div style={{display: 'flex', flexDirection: 'column', gap: 16}}>
            {SECURITY_ITEMS.slice(0, 2).map((item, i) => (
              <SecurityCard key={item.title} item={item} index={i} frame={frame} />
            ))}
          </div>

          {/* 중앙 방패 */}
          <ShieldCenter frame={frame} />

          {/* 오른쪽 2개 카드 */}
          <div style={{display: 'flex', flexDirection: 'column', gap: 16}}>
            {SECURITY_ITEMS.slice(2).map((item, i) => (
              <SecurityCard key={item.title} item={item} index={i + 2} frame={frame} />
            ))}
          </div>
        </div>
      </AbsoluteFill>

      <Subs slides={SUBS} />
    </AbsoluteFill>
  );
};
