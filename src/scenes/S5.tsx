// Scene 5: UI 3분할 — 참고자료|문서|AI채팅 레이아웃 시각화 (15초)
import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {BG, Subs, Tag} from '../shared';
import {D} from '../constants';

const SUBS = [
  {s: 0,   e: 150, t: '화면은 3분할 구조예요.'},
  {s: 150, e: 300, t: '왼쪽에 참고 자료, 가운데에 문서, 오른쪽에 AI 채팅창이에요.'},
  {s: 300, e: 450, t: '커서(Cursor)에서 영감받은 UI라 개발자분들께 익숙할 거예요.'},
];

const Panel: React.FC<{
  label: string; icon: string; desc: string[]; color: string;
  delay: number; frame: number; width: number;
}> = ({label, icon, desc, color, delay, frame, width}) => {
  const {fps} = useVideoConfig();
  const sc = spring({fps, frame: Math.max(0, frame - delay), config: {stiffness: 180, damping: 15}});
  const op = interpolate(Math.max(0, frame - delay), [0, 10], [0, 1], {extrapolateRight: 'clamp'});

  return (
    <div style={{
      background: D.surface, border: `1px solid ${color}60`,
      borderRadius: 12, width, height: 520, overflow: 'hidden',
      opacity: op, transform: `scale(${sc})`,
      display: 'flex', flexDirection: 'column',
      boxShadow: `0 0 32px ${color}20`,
    }}>
      {/* 패널 헤더 */}
      <div style={{
        background: `${color}18`, borderBottom: `1px solid ${color}40`,
        padding: '12px 18px', display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <span style={{fontSize: 22}}>{icon}</span>
        <span style={{fontFamily: D.fontB, fontSize: 18, color, fontWeight: 700}}>{label}</span>
      </div>

      {/* 패널 내용 */}
      <div style={{padding: '16px 18px', flex: 1, display: 'flex', flexDirection: 'column', gap: 10}}>
        {desc.map((d, i) => (
          <div key={i} style={{
            background: `${color}10`, border: `1px solid ${color}25`,
            borderRadius: 6, padding: '10px 14px',
            fontFamily: D.fontB, fontSize: 15, color: D.muted,
          }}>
            {d}
          </div>
        ))}
      </div>
    </div>
  );
};

export const S5: React.FC = () => {
  const frame = useCurrentFrame();
  const titleOp = interpolate(frame, [0, 18], [0, 1], {extrapolateRight: 'clamp'});
  const labelOp = interpolate(frame, [200, 220], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill>
      <BG a="#4f46e5" />
      <Tag label="🖥️  UI 구조" frame={frame} />

      <div style={{position: 'absolute', top: 100, left: 0, right: 0, textAlign: 'center',
        fontFamily: D.fontH, fontSize: 60, fontWeight: 800, color: D.text,
        opacity: titleOp, letterSpacing: '-0.03em'}}>
        3분할 화면 구조
      </div>

      <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 14, marginTop: 50}}>
        <Panel
          label="참고 자료" icon="📋"
          desc={['보고서_참고.pdf', '이전_기안문.hwp', '관련_법령.pdf']}
          color={D.accent3} delay={25} frame={frame} width={300}
        />
        <Panel
          label="문서 편집" icon="📝"
          desc={['■ 1. 사업 개요', '■ 2. 추진 현황', '■ 3. 예산 계획', '■ 4. 기대 효과']}
          color={D.accent} delay={55} frame={frame} width={420}
        />
        <Panel
          label="AI 채팅" icon="🤖"
          desc={['3번 예산 부분을 더 구체적으로 써줘', '→ AI: 반영했어요!', '표 형식으로 정리해줘', '→ AI: 완료!']}
          color={D.accent2} delay={85} frame={frame} width={300}
        />
      </AbsoluteFill>

      <div style={{
        position: 'absolute', bottom: 185, left: 0, right: 0, textAlign: 'center',
        fontFamily: D.fontM, fontSize: 18, color: D.muted, opacity: labelOp,
        letterSpacing: '0.05em',
      }}>
        참고자료 패널  ·  문서 편집 패널  ·  AI 채팅 패널
      </div>

      <Subs slides={SUBS} />
    </AbsoluteFill>
  );
};
