// ElevenLabs TTS API로 자막별 MP3 파일을 생성해서 public/audio/ 에 저장하는 스크립트
// 실행: node scripts/generate-audio.js
// 전제: Node.js 18+ (native fetch), .env 파일 설정 완료

require('dotenv').config();
const fs   = require('fs');
const path = require('path');

const API_KEY  = process.env.ELEVENLABS_API_KEY;
const VOICE_ID = process.env.ELEVENLABS_VOICE_ID;
const API_URL  = `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`;

// ─── 자막 목록 (씬 순서 · 이모지 제거한 TTS 텍스트) ────────────────────────────
// id 는 AudioTrack.tsx 의 파일명과 1:1 대응됩니다
const SUBTITLES = [
  // Scene 1 — Hook
  {id: 's1_1', text: '한글 문서 작업, 매일 몇 시간씩 하고 계세요?'},
  {id: 's1_2', text: '보고서, 기안문, 소장... 아직도 직접 다 타이핑하시나요?'},
  {id: 's1_3', text: '그 시간을 10분의 1로 줄여주는 도구가 나왔어요.'},
  {id: 's1_4', text: '오늘은 인라인 AI를 소개해드릴게요!'},

  // Scene 2 — 인라인 AI란?
  {id: 's2_1', text: '인라인 AI는 한글 문서 위에서 바로 작동하는 AI 비서예요.'},
  {id: 's2_2', text: 'ChatGPT, Claude랑 근본적으로 다른 점이 있어요.'},
  {id: 's2_3', text: '아래아한글에 직접 연동돼서, 복사 붙여넣기가 필요 없어요.'},

  // Scene 3 — vs ChatGPT
  {id: 's3_1', text: 'ChatGPT에서 글 쓰고, 한글에 붙여넣는 거... 불편하셨죠?'},
  {id: 's3_2', text: '인라인 AI는 한글 프로그램 안에서 AI가 직접 작성해줘요.'},
  {id: 's3_3', text: '양식이 깨질 걱정도 없어요. 기존 양식 그대로 유지되거든요.'},

  // Scene 4 — 시작하기
  {id: 's4_1', text: '시작 방법은 되게 간단해요.'},
  {id: 's4_2', text: '설치하고, 문서 열고, AI한테 지시하면 끝이에요.'},
  {id: 's4_3', text: '별도 학습 없이 바로 쓸 수 있어요.'},

  // Scene 5 — UI 3분할
  {id: 's5_1', text: '화면은 3분할 구조예요.'},
  {id: 's5_2', text: '왼쪽에 참고 자료, 가운데에 문서, 오른쪽에 AI 채팅창이에요.'},
  {id: 's5_3', text: '커서에서 영감받은 UI라 개발자분들께 익숙할 거예요.'},

  // Scene 6 — 선택적 수정
  {id: 's6_1', text: '특정 문단이나 표만 콕 집어서 수정할 수 있어요.'},
  {id: 's6_2', text: '문서 전체를 다시 쓸 필요 없이, AI가 딱 그 부분만 고쳐줘요.'},
  {id: 's6_3', text: '이 기능 하나가 인라인 AI를 특별하게 만들어요.'},

  // Scene 7 — 자동 채우기
  {id: 's7_1', text: '참고 자료만 올려두면, 문서를 자동으로 채워줘요.'},
  {id: 's7_2', text: '보고서 양식에 내용을 직접 입력할 필요가 없어요.'},
  {id: 's7_3', text: 'AI가 맥락을 파악해서 딱 맞는 내용을 넣어줘요.'},

  // Scene 8 — 대상 사용자
  {id: 's8_1', text: '공무원, 직장인, 연구자... 문서 쓰는 모든 분께 맞아요.'},
  {id: 's8_2', text: '어떤 직종이든 반복 업무를 AI가 대신해줘요.'},
  {id: 's8_3', text: '특히 한글을 많이 쓰는 분들께 최강이에요.'},
  {id: 's8_4', text: '지금 당장 써보면 왜 이게 필요했는지 알 거예요.'},

  // Scene 9 — 데이터 보안
  {id: 's9_1', text: '내 문서가 외부로 유출될까 걱정되시죠?'},
  {id: 's9_2', text: '인라인 AI는 문서를 서버에 저장하지 않아요.'},
  {id: 's9_3', text: '보안이 중요한 공공기관과 기업에서도 안심하고 쓸 수 있어요.'},

  // Scene 10 — 고급 활용
  {id: 's10_1', text: '익숙해지면 고급 기능도 쓸 수 있어요.'},
  {id: 's10_2', text: '나만의 AI 템플릿을 만들어서 반복 업무를 자동화해요.'},
  {id: 's10_3', text: '수십 개 문서도 한 번에 처리할 수 있어요!'},

  // Scene 11 — 현황 통계
  {id: 's11_1', text: '실제 사용자들이 체감한 변화를 숫자로 보여드릴게요.'},
  {id: 's11_2', text: '문서 작성 시간이 평균 73% 줄었어요!'},
  {id: 's11_3', text: '한번 쓰기 시작하면 되돌아가기가 힘들다는 분들이 많아요.'},

  // Scene 12 — 핵심 차별점
  {id: 's12_1', text: '그래서 인라인 AI가 왜 다른지, 딱 3가지로 정리할게요.'},
  {id: 's12_2', text: 'HWP 완벽 지원, 컨텍스트 유지, 그리고 한국어 최적화!'},
  {id: 's12_3', text: '이 세 가지가 합쳐지면 진짜 다른 경험이 돼요.'},

  // Scene 13 — CTA
  {id: 's13_1', text: '지금 인라인 AI 홈페이지에서 무료로 체험해보세요!'},
  {id: 's13_2', text: '구독이랑 좋아요는 영상 제작에 큰 힘이 돼요.'},
  {id: 's13_3', text: '다음 영상도 기대해주세요. 감사합니다!'},
];

// ─── ElevenLabs API 호출: 텍스트 → MP3 버퍼 반환 ─────────────────────────────
async function textToSpeech(text) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'xi-api-key':   API_KEY,
      'Content-Type': 'application/json',
      'Accept':       'audio/mpeg',
    },
    body: JSON.stringify({
      text,
      model_id: 'eleven_multilingual_v2',
      voice_settings: {
        stability:        0.5,
        similarity_boost: 0.8,
        style:            0.0,
        use_speaker_boost: true,
      },
    }),
  });

  if (!response.ok) {
    const errBody = await response.text();
    throw new Error(`ElevenLabs API ${response.status}: ${errBody}`);
  }

  return Buffer.from(await response.arrayBuffer());
}

// ─── 메인 실행 ────────────────────────────────────────────────────────────────
async function main() {
  if (!API_KEY)  throw new Error('.env 에 ELEVENLABS_API_KEY 가 없어요.');
  if (!VOICE_ID) throw new Error('.env 에 ELEVENLABS_VOICE_ID 가 없어요.');

  const outDir = path.join(__dirname, '..', 'public', 'audio');
  fs.mkdirSync(outDir, {recursive: true});

  // 이미 생성된 파일은 건너뜀 (재실행 안전)
  const existing = fs.readdirSync(outDir).filter(f => f.endsWith('.mp3'));
  const toGenerate = SUBTITLES.filter(s => !existing.includes(`${s.id}.mp3`));

  console.log(`\n🎙  ElevenLabs TTS 생성 시작 (총 ${SUBTITLES.length}개, 신규 ${toGenerate.length}개)\n`);

  if (toGenerate.length === 0) {
    console.log('✅ 모든 파일이 이미 존재합니다. 삭제 후 재실행하면 재생성됩니다.\n');
    return;
  }

  const results = {ok: [], fail: []};

  for (const sub of toGenerate) {
    const outPath = path.join(outDir, `${sub.id}.mp3`);
    try {
      const buf = await textToSpeech(sub.text);
      fs.writeFileSync(outPath, buf);
      const kb = (buf.length / 1024).toFixed(1);
      console.log(`  ✓ [${sub.id}] ${kb}KB  — "${sub.text.slice(0, 28)}..."`);
      results.ok.push(sub.id);
    } catch (err) {
      console.error(`  ✗ [${sub.id}] 실패: ${err.message}`);
      results.fail.push(sub.id);
    }

    // ElevenLabs 무료 플랜 rate limit 방지 (500ms 간격)
    await new Promise(r => setTimeout(r, 500));
  }

  console.log(`\n─────────────────────────────────`);
  console.log(`✅ 성공: ${results.ok.length}개`);
  if (results.fail.length > 0) {
    console.log(`❌ 실패: ${results.fail.length}개 → ${results.fail.join(', ')}`);
    console.log(`   실패한 항목은 다시 실행하면 재시도됩니다.`);
  }
  console.log(`📂 저장 위치: public/audio/`);
  console.log(`▶  이제 npm start 로 Studio를 열면 오디오가 적용돼요!\n`);
}

main().catch(err => {
  console.error('\n💥 치명적 오류:', err.message);
  process.exit(1);
});
