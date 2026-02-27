// Scene 6: 선택적 수정 — 특정 문단/표 선택해서 AI 수정 시연 (12초)
import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {BG, DocMock, Subs, Tag} from '../shared';
import {D} from '../constants';

const SUBS = [
  {s: 0,   e: 120, t: '특정 문단이나 표만 콕 집어서 수정할 수 있어요.'},
  {s: 120, e: 240, t: '문서 전체를 다시 쓸 필요 없이, AI가 딱 그 부분만 고쳐줘요.'},
  {s: 240, e: 360, t: '이 기능 하나가 인라인 AI를 특별하게 만들어요.'},
];

// 텍스트 선택 커서 애니메이션 컴포넌트
const SelectionBox: React.FC<{frame: number; delay: number; color: string; lines: string[]}> = ({frame, delay, color, lines}) => {
  const {fps} = useVideoConfig();
  const lf = Math.max(0, frame - delay);
  const sc = spring({fps, frame: lf, config: {stiffness: 200, damping: 18}});
  const op = interpolate(lf, [0, 10], [0, 1], {extrapolateRight: 'clamp'});

  return (
    <div style={{opacity: op, transform: `scale(${sc})`, display: 'flex', flexDirection: 'column', gap: 6}}>
      {/* 선택된 텍스트 블록 시뮬레이션 */}
      <div style={{
        background: `${color}22`, border: `2px solid ${color}80`,
        borderRadius: 6, padding: '12px 18px',
        boxShadow: `0 0 20px ${color}30`,
      }}>
        {lines.map((line, i) => (
          <div key={i} style={{
            height: 12, marginBottom: i < lines.length - 1 ? 10 : 0,
            background: `${color}40`, borderRadius: 3,
            width: i % 2 === 0 ? '100%' : '75%',
          }} />
        ))}
        {/* 선택 핸들 표시 */}
        <div style={{
          position: 'absolute', top: -6, left: 8,
          width: 12, height: 12, borderRadius: '50%',
          background: color, boxShadow: `0 0 8px ${color}`,
        }} />
        <div style={{
          position: 'absolute', bottom: -6, right: 8,
          width: 12, height: 12, borderRadius: '50%',
          background: color, boxShadow: `0 0 8px ${color}`,
        }} />
      </div>
      {/* AI 수정 버튼 */}
      <div style={{
        background: `${color}18`, border: `1px solid ${color}60`,
        borderRadius: 6, padding: '8px 14px',
        fontFamily: D.fontB, fontSize: 13, color,
        display: 'inline-flex', alignItems: 'center', gap: 6,
        alignSelf: 'flex-end',
      }}>
        <span>✨</span> AI로 수정하기
      </div>
    </div>
  );
};

// AI 응답 패널
const AIResponse: React.FC<{frame: number; delay: number}> = ({frame, delay}) => {
  const {fps} = useVideoConfig();
  const lf = Math.max(0, frame - delay);
  const op = interpolate(lf, [0, 15], [0, 1], {extrapolateRight: 'clamp'});
  const tx = interpolate(lf, [0, 15], [30, 0], {extrapolateRight: 'clamp'});
  const sc = spring({fps, frame: lf, config: {stiffness: 160, damping: 20}});

  return (
    <div style={{
      opacity: op, transform: `translateX(${tx}px) scale(${sc})`,
      background: D.surface, border: `1px solid ${D.accent2}50`,
      borderRadius: 12, padding: '18px 22px', width: 320,
      boxShadow: `0 0 32px ${D.accent2}20`,
    }}>
      <div style={{
        fontFamily: D.fontB, fontSize: 14, color: D.accent2,
        fontWeight: 700, marginBottom: 12,
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <span>🤖</span> AI 수정 완료
      </div>
      {/* 수정된 내용 라인들 */}
      {[100, 85, 92, 60].map((w, i) => (
        <div key={i} style={{
          height: 11, marginBottom: 9,
          background: i < 3 ? `${D.accent2}30` : `${D.accent2}15`,
          borderRadius: 3, width: `${w}%`,
          border: i < 3 ? `1px solid ${D.accent2}40` : 'none',
        }} />
      ))}
      <div style={{
        marginTop: 12, padding: '8px 12px',
        background: `${D.accent2}12`, borderRadius: 6,
        fontFamily: D.fontB, fontSize: 12, color: D.accent2,
      }}>
        ✓ 선택한 문단만 정밀 수정됨
      </div>
    </div>
  );
};

export const S6: React.FC = () => {
  const frame = useCurrentFrame();
  const titleOp = interpolate(frame, [0, 18], [0, 1], {extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill>
      <BG a="#4f46e5" />
      <Tag label="✏️  선택적 수정" frame={frame} />

      <div style={{
        position: 'absolute', top: 95, left: 0, right: 0, textAlign: 'center',
        fontFamily: D.fontH, fontSize: 58, fontWeight: 800, color: D.text,
        opacity: titleOp, letterSpacing: '-0.03em',
      }}>
        필요한 부분만 <span style={{color: D.accent}}>콕 집어</span> 수정
      </div>

      {/* 메인 레이아웃: 문서 + 화살표 + AI 응답 */}
      <AbsoluteFill style={{
        justifyContent: 'center', alignItems: 'center',
        flexDirection: 'row', gap: 40, marginTop: 60,
      }}>
        {/* 왼쪽: 문서 (선택 영역 하이라이트) */}
        <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
          <DocMock
            title="기안문_초안.hwp"
            lines={10}
            highlighted={[3, 4, 5]}
            delay={20}
            frame={frame}
            width={380}
          />
          {/* 선택 박스 오버레이 */}
          <div style={{position: 'relative', marginTop: -8}}>
            <SelectionBox
              frame={frame} delay={80}
              color={D.accent3}
              lines={['', '', '']}
            />
          </div>
        </div>

        {/* 화살표 */}
        <div style={{
          opacity: interpolate(frame, [100, 120], [0, 1], {extrapolateRight: 'clamp'}),
          fontSize: 48, color: D.accent2,
        }}>
          →
        </div>

        {/* 오른쪽: AI 응답 */}
        <AIResponse frame={frame} delay={130} />
      </AbsoluteFill>

      <Subs slides={SUBS} />
    </AbsoluteFill>
  );
};
