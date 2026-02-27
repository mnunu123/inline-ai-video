// Scene 7: 자동 채우기 — 참고 자료 기반 문서 자동 완성 시연 (12초)
import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {BG, Subs, Tag} from '../shared';
import {D} from '../constants';

const SUBS = [
  {s: 0,   e: 120, t: '참고 자료만 올려두면, 문서를 자동으로 채워줘요.'},
  {s: 120, e: 240, t: '보고서 양식에 내용을 직접 입력할 필요가 없어요.'},
  {s: 240, e: 360, t: 'AI가 맥락을 파악해서 딱 맞는 내용을 넣어줘요.'},
];

// 채워지는 문서 라인 애니메이션
const FillingDoc: React.FC<{frame: number}> = ({frame}) => {
  const lines = [
    {label: '1. 사업 개요', width: 88, delay: 40},
    {label: '2. 추진 배경', width: 72, delay: 70},
    {label: '3. 세부 내용', width: 95, delay: 100},
    {label: '4. 예산 계획', width: 65, delay: 130},
    {label: '5. 기대 효과', width: 80, delay: 160},
    {label: '6. 향후 일정', width: 75, delay: 190},
  ];

  return (
    <div style={{
      background: D.docBg, borderRadius: 8, width: 400, overflow: 'hidden',
      boxShadow: '0 12px 48px rgba(0,0,0,0.5)',
    }}>
      {/* 타이틀 바 */}
      <div style={{background: '#f2f2f7', padding: '8px 14px', display: 'flex', gap: 7, alignItems: 'center'}}>
        {['#ff5f57', '#febc2e', '#28c840'].map((c, i) => (
          <div key={i} style={{width: 11, height: 11, borderRadius: '50%', background: c}} />
        ))}
        <span style={{marginLeft: 8, fontSize: 12, color: '#666', fontFamily: 'sans-serif'}}>보고서_자동완성.hwp</span>
      </div>

      {/* 문서 내용 */}
      <div style={{padding: '18px 22px', display: 'flex', flexDirection: 'column', gap: 14}}>
        {lines.map((line, i) => {
          const lf = Math.max(0, frame - line.delay);
          const progress = interpolate(lf, [0, 25], [0, 1], {extrapolateRight: 'clamp'});
          const filled = progress > 0.5;

          return (
            <div key={i} style={{display: 'flex', flexDirection: 'column', gap: 5}}>
              {/* 섹션 라벨 */}
              <div style={{
                fontSize: 12, fontFamily: 'sans-serif', color: '#333', fontWeight: 700,
                opacity: interpolate(lf, [0, 10], [0, 1], {extrapolateRight: 'clamp'}),
              }}>
                {line.label}
              </div>
              {/* 채워지는 바 */}
              <div style={{
                height: 10, background: '#f0f0f5', borderRadius: 3, overflow: 'hidden',
              }}>
                <div style={{
                  height: '100%', width: `${progress * line.width}%`,
                  background: filled
                    ? `linear-gradient(90deg, ${D.accent}80, ${D.accent2}80)`
                    : `linear-gradient(90deg, ${D.accent3}80, ${D.accent3}40)`,
                  borderRadius: 3,
                  transition: 'background 0.3s',
                  boxShadow: filled ? `0 0 8px ${D.accent}40` : 'none',
                }} />
              </div>
            </div>
          );
        })}

        {/* 완료 표시 */}
        <div style={{
          opacity: interpolate(Math.max(0, frame - 220), [0, 20], [0, 1], {extrapolateRight: 'clamp'}),
          background: `${D.accent2}15`, border: `1px solid ${D.accent2}50`,
          borderRadius: 6, padding: '8px 12px',
          fontFamily: 'sans-serif', fontSize: 13, color: D.accent2, fontWeight: 600,
          display: 'flex', alignItems: 'center', gap: 6,
        }}>
          <span>✅</span> 모든 항목 자동 완성!
        </div>
      </div>
    </div>
  );
};

// 참고 자료 카드
const RefCard: React.FC<{frame: number; icon: string; label: string; delay: number}> = ({frame, icon, label, delay}) => {
  const {fps} = useVideoConfig();
  const lf = Math.max(0, frame - delay);
  const sc = spring({fps, frame: lf, config: {stiffness: 200, damping: 18}});
  const op = interpolate(lf, [0, 10], [0, 1], {extrapolateRight: 'clamp'});

  return (
    <div style={{
      opacity: op, transform: `scale(${sc})`,
      background: D.surface, border: `1px solid ${D.accent3}50`,
      borderRadius: 8, padding: '12px 16px',
      display: 'flex', alignItems: 'center', gap: 10,
      boxShadow: `0 0 20px ${D.accent3}15`,
    }}>
      <span style={{fontSize: 22}}>{icon}</span>
      <span style={{fontFamily: D.fontB, fontSize: 14, color: D.text}}>{label}</span>
    </div>
  );
};

export const S7: React.FC = () => {
  const frame = useCurrentFrame();
  const titleOp = interpolate(frame, [0, 18], [0, 1], {extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill>
      <BG a="#10b981" />
      <Tag label="📥  자동 채우기" frame={frame} />

      <div style={{
        position: 'absolute', top: 95, left: 0, right: 0, textAlign: 'center',
        fontFamily: D.fontH, fontSize: 58, fontWeight: 800, color: D.text,
        opacity: titleOp, letterSpacing: '-0.03em',
      }}>
        참고 자료 → <span style={{color: D.accent2}}>문서 자동 완성</span>
      </div>

      <AbsoluteFill style={{
        justifyContent: 'center', alignItems: 'center',
        flexDirection: 'row', gap: 48, marginTop: 60,
      }}>
        {/* 왼쪽: 참고 자료 목록 */}
        <div style={{display: 'flex', flexDirection: 'column', gap: 12, width: 260}}>
          <div style={{
            fontFamily: D.fontB, fontSize: 14, color: D.muted,
            marginBottom: 4, letterSpacing: '0.08em', textTransform: 'uppercase',
          }}>
            참고 자료
          </div>
          <RefCard frame={frame} icon="📄" label="작년도_보고서.pdf" delay={20} />
          <RefCard frame={frame} icon="📊" label="통계_데이터.xlsx" delay={45} />
          <RefCard frame={frame} icon="📋" label="관련_법령.hwp" delay={70} />
        </div>

        {/* 화살표 + AI 뱃지 */}
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
          opacity: interpolate(frame, [80, 100], [0, 1], {extrapolateRight: 'clamp'}),
        }}>
          <div style={{
            background: `${D.accent}20`, border: `1px solid ${D.accent}60`,
            borderRadius: 20, padding: '6px 14px',
            fontFamily: D.fontB, fontSize: 13, color: D.accent,
          }}>
            🤖 AI 분석
          </div>
          <div style={{fontSize: 32, color: D.accent}}>→</div>
        </div>

        {/* 오른쪽: 자동 완성되는 문서 */}
        <FillingDoc frame={frame} />
      </AbsoluteFill>

      <Subs slides={SUBS} />
    </AbsoluteFill>
  );
};
