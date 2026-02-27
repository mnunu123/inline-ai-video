// Scene 2: 인라인 AI란? — HWP 직접 연동 개념 (14초)
import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {BG, Subs, Tag, DocMock} from '../shared';
import {D} from '../constants';

const SUBS = [
  {s: 0,   e: 140, t: '인라인 AI는 한글 문서 위에서 바로 작동하는 AI 비서예요.'},
  {s: 140, e: 280, t: 'ChatGPT, Claude랑 근본적으로 다른 점이 있어요.'},
  {s: 280, e: 420, t: '아래아한글에 직접 연동돼서, 복사 붙여넣기가 필요 없어요.'},
];

const Arrow: React.FC<{delay: number; frame: number; color?: string}> = ({delay, frame, color = D.accent}) => {
  const op = interpolate(Math.max(0, frame - delay), [0, 12], [0, 1], {extrapolateRight: 'clamp'});
  return <div style={{fontFamily: D.fontM, fontSize: 44, color, opacity: op, paddingBottom: 6}}>→</div>;
};

const Chip: React.FC<{label: string; icon: string; delay: number; frame: number; highlight?: boolean}> = ({label, icon, delay, frame, highlight}) => {
  const {fps} = useVideoConfig();
  const sc = spring({fps, frame: Math.max(0, frame - delay), config: {stiffness: 220, damping: 14}});
  const op = interpolate(Math.max(0, frame - delay), [0, 8], [0, 1], {extrapolateRight: 'clamp'});
  return (
    <div style={{
      background: highlight ? `${D.accent}20` : D.surface,
      border: `1px solid ${highlight ? D.accent : D.border}`,
      borderRadius: 10, padding: '20px 32px',
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
      opacity: op, transform: `scale(${sc})`, minWidth: 180,
    }}>
      <span style={{fontSize: 44}}>{icon}</span>
      <span style={{fontFamily: D.fontB, fontSize: 20, color: highlight ? D.accent : D.text, fontWeight: 600, textAlign: 'center'}}>{label}</span>
    </div>
  );
};

export const S2: React.FC = () => {
  const frame = useCurrentFrame();
  const titleOp = interpolate(frame, [0, 18], [0, 1], {extrapolateRight: 'clamp'});
  const defOp   = interpolate(frame, [160, 185], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill>
      <BG a="#4f46e5" />
      <Tag label="✅  정의" frame={frame} />

      <div style={{position: 'absolute', top: 135, left: 0, right: 0, textAlign: 'center',
        fontFamily: D.fontH, fontSize: 64, fontWeight: 800, color: D.text,
        opacity: titleOp, letterSpacing: '-0.03em'}}>
        <span style={{color: D.accent}}>인라인 AI</span>란 무엇인가?
      </div>

      {/* 연동 다이어그램 */}
      <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 18, marginTop: 30}}>
        <Chip label="한글(HWP)" icon="📄" delay={20}  frame={frame} />
        <Arrow delay={42} frame={frame} />
        <Chip label="inline AI" icon="🤖" delay={45}  frame={frame} highlight />
        <Arrow delay={67} frame={frame} />
        <Chip label="완성된 문서" icon="✨" delay={70}  frame={frame} />
      </AbsoluteFill>

      {/* + 오른쪽에 DocMock */}
      <div style={{position: 'absolute', right: 120, top: '50%', transform: 'translateY(-50%)'}}>
        <DocMock highlighted={[2, 3, 5]} delay={90} frame={frame} width={400} />
      </div>

      {/* 핵심 정의 */}
      <div style={{
        position: 'absolute', bottom: 190, left: 0, right: 0, textAlign: 'center',
        fontFamily: D.fontB, fontSize: 36, color: D.muted,
        opacity: defOp,
      }}>
        복사·붙여넣기 없이 → AI가 문서를 직접 편집
      </div>

      <Subs slides={SUBS} />
    </AbsoluteFill>
  );
};
