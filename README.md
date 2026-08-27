# 인라인 AI 소개 영상 (Inline AI Intro Video)

"인라인 AI"(아래아한글에 직접 연동되는 문서 작업 AI 비서) 제품을 소개하는 **3분(180초) 영상**을
[Remotion](https://www.remotion.dev/)으로 코드 기반 제작한 프로젝트입니다.

- **해상도/프레임레이트**: 1920×1080, 30fps, 5400프레임(3분)
- **구성**: 13개 씬(Scene), 씬별 자막에 맞춘 TTS 음성(ElevenLabs)
- **주제 흐름**: 문제 제기(Hook) → 인라인 AI 소개 → ChatGPT 대비 차별점 → 사용법 → UI 소개 → 대상 사용자 → ...

## 씬 구성

`src/constants.ts`의 `TIMING`에 씬별 시작 프레임/길이가 정의되어 있고, `src/scenes/S1.tsx` ~ `S13.tsx`가
각 씬을 렌더링합니다.

| 씬 | 내용 |
| --- | --- |
| S1 | Hook — 한글 문서 작업의 고통, "인라인 AI"를 소개하겠다는 도입 |
| S2 | 인라인 AI란? — 한글 문서 위에서 바로 작동하는 AI 비서 |
| S3 | vs ChatGPT — 복사·붙여넣기 없이 한글 프로그램 안에서 직접 작성 |
| S4 | 시작 방법 |
| S5 | UI 3분할 소개 |
| S6 | 선택적 수정 기능 |
| S7 | 자동 채우기 기능 |
| S8 | 대상 사용자 |
| S9~S13 | (이어지는 활용 사례/마무리) |

## 오디오 파이프라인

씬별 자막 텍스트를 `scripts/generate-audio.js`가 ElevenLabs TTS API로 변환해
`public/audio/{sceneId}_{n}.mp3`로 저장하고, `src/AudioTrack.tsx`가 프레임 타이밍에 맞춰 재생합니다.

```bash
# .env 파일에 ELEVENLABS_API_KEY, ELEVENLABS_VOICE_ID 설정 후
npm run generate-audio
```

## 실행

```bash
npm install

# 미리보기 (Remotion Studio)
npm run start

# 렌더링 (out/video.mp4)
npm run build
```

## 디렉터리 구조

```
src/
  Root.tsx        # Composition 정의 (1920x1080, 30fps, 5400프레임)
  Video.tsx        # 전체 씬을 이어붙이는 최상위 컴포넌트
  constants.ts      # 디자인 토큰(D) + 씬별 타이밍(TIMING)
  shared.tsx        # 공용 컴포넌트 (배경, 자막, 태그 등)
  AudioTrack.tsx    # 씬별 오디오 재생
  scenes/S1~S13.tsx # 씬별 애니메이션
scripts/
  generate-audio.js # ElevenLabs TTS로 자막 → mp3 생성
public/audio/       # 생성된 씬별 음성 파일
```
