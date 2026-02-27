// 공용 컴포넌트: BG(배경), Subs(자막), Tag(씬 태그), DocMock(문서 목업)
import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {D, Slide} from './constants';

// 그리드 + 방사형 그라디언트 배경
export const BG: React.FC<{a?: string}> = ({a = '#4f46e5'}) => (
  <AbsoluteFill style={{background: D.bg, overflow: 'hidden'}}>
    <AbsoluteFill style={{
      backgroundImage: [
        'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px)',
        'linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
      ].join(','),
      backgroundSize: '80px 80px',
    }} />
    <AbsoluteFill style={{background: `radial-gradient(ellipse 65% 50% at 12% 18%, ${a}28 0%, transparent 60%)`}} />
    <AbsoluteFill style={{background: `radial-gradient(ellipse 45% 40% at 88% 82%, ${D.accent2}18 0%, transparent 55%)`}} />
  </AbsoluteFill>
);

// YouTube 스타일 한국어 자막
export const Subs: React.FC<{slides: Slide[]}> = ({slides}) => {
  const f = useCurrentFrame();
  const active = slides.find(s => f >= s.s && f < s.e);
  if (!active) return null;
  const lf  = f - active.s;
  const dur = active.e - active.s;
  const op  = interpolate(lf, [0, 8, dur - 8, dur], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const ty  = interpolate(lf, [0, 10], [12, 0], {extrapolateRight: 'clamp'});
  return (
    <div style={{
      position: 'absolute', bottom: 68, left: '50%',
      transform: `translateX(-50%) translateY(${ty}px)`,
      background: 'rgba(0,0,0,0.88)', color: '#fff',
      padding: '12px 34px', borderRadius: 8,
      fontSize: 36, fontFamily: D.fontB, fontWeight: 400,
      whiteSpace: 'nowrap', opacity: op, zIndex: 100,
      letterSpacing: '-0.01em',
    }}>
      {active.t}
    </div>
  );
};

// 씬 상단 카테고리 태그
export const Tag: React.FC<{label: string; frame: number}> = ({label, frame}) => {
  const op = interpolate(frame, [0, 12], [0, 1], {extrapolateRight: 'clamp'});
  return (
    <div style={{
      position: 'absolute', top: 56, left: 80,
      fontFamily: D.fontM, fontSize: 12, color: D.accent,
      letterSpacing: '0.16em', textTransform: 'uppercase',
      border: `1px solid ${D.accent}50`, padding: '5px 14px', borderRadius: 2,
      opacity: op,
    }}>
      {label}
    </div>
  );
};

// HWP 문서 목업 컴포넌트 (흰 배경 + 선 + 선택 하이라이트)
export const DocMock: React.FC<{
  title?: string;
  lines?: number;
  highlighted?: number[];
  delay?: number;
  frame: number;
  width?: number;
}> = ({title = '문서1.hwp', lines = 9, highlighted = [], delay = 0, frame, width = 460}) => {
  const lf = Math.max(0, frame - delay);
  const op = interpolate(lf, [0, 18], [0, 1], {extrapolateRight: 'clamp'});
  const ty = interpolate(lf, [0, 18], [20, 0], {extrapolateRight: 'clamp'});
  return (
    <div style={{
      background: D.docBg, borderRadius: 6, width,
      boxShadow: '0 12px 48px rgba(0,0,0,0.5)',
      opacity: op, transform: `translateY(${ty}px)`, overflow: 'hidden',
    }}>
      {/* 타이틀 바 */}
      <div style={{background: '#f2f2f7', padding: '8px 14px', display: 'flex', gap: 7, alignItems: 'center'}}>
        {['#ff5f57','#febc2e','#28c840'].map((c,i) => <div key={i} style={{width:11,height:11,borderRadius:'50%',background:c}} />)}
        <span style={{marginLeft: 8, fontSize: 12, color: '#666', fontFamily: 'sans-serif'}}>{title}</span>
      </div>
      {/* 문서 줄 */}
      <div style={{padding: '18px 22px'}}>
        {Array.from({length: lines}).map((_, i) => (
          <div key={i} style={{
            height: 14, marginBottom: 11,
            background: highlighted.includes(i) ? `${D.accent}22` : D.docLine,
            borderRadius: 2,
            width: i === lines-1 ? '55%' : i % 2 === 0 ? '92%' : '78%',
            border: highlighted.includes(i) ? `1.5px solid ${D.accent}80` : 'none',
            boxShadow: highlighted.includes(i) ? `0 0 8px ${D.accent}40` : 'none',
          }} />
        ))}
      </div>
    </div>
  );
};
