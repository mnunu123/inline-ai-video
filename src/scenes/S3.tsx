// Scene 3: vs ChatGPT/Claude — 기존 방식과 비교 (13초)
import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {BG, Subs, Tag} from '../shared';
import {D} from '../constants';

const SUBS = [
  {s: 0,   e: 130, t: 'ChatGPT에서 글 쓰고, 한글에 붙여넣는 거... 불편하셨죠?'},
  {s: 130, e: 260, t: '인라인 AI는 한글 프로그램 안에서 AI가 직접 작성해줘요.'},
  {s: 260, e: 390, t: '양식이 깨질 걱정도 없어요. 기존 양식 그대로 유지되거든요.'},
];

const Col: React.FC<{title: string; steps: string[]; color: string; delay: number; frame: number; bad?: boolean}> = ({title, steps, color, delay, frame, bad}) => {
  const op = interpolate(Math.max(0, frame - delay), [0, 18], [0, 1], {extrapolateRight: 'clamp'});
  const ty = interpolate(Math.max(0, frame - delay), [0, 18], [28, 0], {extrapolateRight: 'clamp'});
  return (
    <div style={{opacity: op, transform: `translateY(${ty}px)`, width: 520}}>
      <div style={{
        fontFamily: D.fontB, fontSize: 26, fontWeight: 700, color,
        textAlign: 'center', marginBottom: 20,
        padding: '10px 0', borderBottom: `2px solid ${color}50`,
      }}>{title}</div>
      {steps.map((s, i) => (
        <div key={i} style={{
          background: D.surface, border: `1px solid ${D.border}`,
          borderRadius: 8, padding: '14px 20px', marginBottom: 10,
          fontFamily: D.fontB, fontSize: 22, color: bad ? D.muted : D.text,
          display: 'flex', alignItems: 'center', gap: 12,
          textDecoration: bad ? 'line-through' : 'none',
          opacity: bad ? 0.7 : 1,
        }}>
          <span style={{fontSize: 26}}>{s.split(' ')[0]}</span>
          <span>{s.slice(s.indexOf(' ')+1)}</span>
        </div>
      ))}
    </div>
  );
};

export const S3: React.FC = () => {
  const frame = useCurrentFrame();
  const titleOp = interpolate(frame, [0, 18], [0, 1], {extrapolateRight: 'clamp'});
  const vsOp    = interpolate(frame, [30, 50], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill>
      <BG a="#ef444420" />
      <Tag label="🆚  비교" frame={frame} />

      <div style={{position: 'absolute', top: 120, left: 0, right: 0, textAlign: 'center',
        fontFamily: D.fontH, fontSize: 60, fontWeight: 800, color: D.text,
        opacity: titleOp, letterSpacing: '-0.03em'}}>
        기존 방식 vs <span style={{color: D.accent}}>인라인 AI</span>
      </div>

      <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 48, marginTop: 60}}>
        <Col
          title="❌  기존 방식"
          steps={['📝 ChatGPT에 질문', '📋 결과 복사', '📂 한글 열기', '⌨️ 붙여넣기 + 수동 수정', '💥 양식 깨짐']}
          color="#ef4444"
          delay={20} frame={frame} bad
        />

        <div style={{fontFamily: D.fontH, fontSize: 52, color: D.muted, opacity: vsOp, fontWeight: 700}}>VS</div>

        <Col
          title="✅  인라인 AI"
          steps={['📄 한글 문서 열기', '💬 AI에게 지시', '✨ AI가 직접 편집', '🎯 양식 그대로 유지']}
          color={D.accent2}
          delay={55} frame={frame}
        />
      </AbsoluteFill>

      <Subs slides={SUBS} />
    </AbsoluteFill>
  );
};
