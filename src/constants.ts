// 인라인 AI 영상 디자인 토큰 및 씬 타이밍 (30fps, 5400프레임 = 3분)

export const D = {
  bg:      '#0a0b16',   // 딥 네이비 배경
  surface: '#12142a',   // 카드/패널 배경
  border:  '#1e2048',   // 구분선
  accent:  '#4f46e5',   // 인디고 (메인 강조)
  accent2: '#10b981',   // 에메랄드 (성공/긍정)
  accent3: '#f59e0b',   // 앰버 (하이라이트)
  text:    '#f0f0ff',   // 기본 텍스트
  muted:   '#8886a8',   // 보조 텍스트
  docBg:   '#ffffff',   // 문서 흰 배경
  docLine: '#e8e8ee',   // 문서 줄 색상
  fontH:   '"Nanum Myeongjo", serif',
  fontB:   '"Noto Sans KR", sans-serif',
  fontM:   '"JetBrains Mono", monospace',
} as const;

export type Slide = {s: number; e: number; t: string};

// 13개 씬 타이밍 — 합계 5400프레임 = 180초
export const TIMING = {
  S1:  {from: 0,    dur: 540},  // 18s – Hook/도입
  S2:  {from: 540,  dur: 420},  // 14s – 인라인 AI란?
  S3:  {from: 960,  dur: 390},  // 13s – vs ChatGPT
  S4:  {from: 1350, dur: 360},  // 12s – 시작 방법
  S5:  {from: 1710, dur: 450},  // 15s – UI 3분할
  S6:  {from: 2160, dur: 360},  // 12s – 선택적 수정
  S7:  {from: 2520, dur: 360},  // 12s – 자동 채우기
  S8:  {from: 2880, dur: 480},  // 16s – 대상 사용자
  S9:  {from: 3360, dur: 390},  // 13s – 데이터 보안
  S10: {from: 3750, dur: 390},  // 13s – 고급 활용
  S11: {from: 4140, dur: 360},  // 12s – 현황 통계
  S12: {from: 4500, dur: 450},  // 15s – 핵심 차별점
  S13: {from: 4950, dur: 450},  // 15s – CTA
} as const;
