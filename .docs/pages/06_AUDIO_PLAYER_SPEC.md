# 🎧 [PAGE-SPEC 06] 가이드 자막 싱크 오디오 명상 플레이어 (`/player/[id]`) 상세 구현 명세서

본 문서는 오디오 가이드 재생 및 자막 싱크, 덤벨 정산 모달을 **`src/app/player/[id]/page.tsx`**에 구축하기 위한 개발 명세서입니다.

---

## 1. 🎯 페이지 개요 & 베이스 구조

* **라우트 경로**: `/player/[id]` (Next.js App Router `src/app/player/[id]/page.tsx`)
* **디자인 컨셉**: 몰입감 넘치는 가로/세로 어두운 웰니스 오디오 플레이어 (Dark Soft Audio Player).
* **핵심 역할**:
  * 선택된 리추얼 오디오 트랙 재생/일시정지 및 프로그레스 슬라이더 컨트롤.
  * 오디오 재생 시간에 맞춘 자막 하이라이트 싱크(Lyric Sync) 연출.
  * 재생 완료 시 `+3~10 덤벨` 지급 및 당일 정원 '실천(🪴)' 도장 날인 팝업 연동.

---

## 2. 🧩 컴포넌트 모듈 구조

```text
src/app/player/[id]/
├── page.tsx                           # 오디오 명상 플레이어 컨테이너
└── _components/
    ├── AudioPlayerControls.tsx        # 재생/일시정지, 10초 뒤로/앞으로, 프로그레스 타임라인
    ├── SubtitleSyncViewer.tsx         # 시간대 기반 오디오 가이드 자막 롤링 뷰어
    └── DumbbellRewardModal.tsx        # 오디오 재생 완료 시 덤벨 획득 & 새싹 도장 팝업
```

---

## 3. 🧠 자막 싱크 & 완료 덤벨 보상 연동

```typescript
export interface SubtitleCue {
  timeSec: number;    // 자막 시작 시간 (초 단위)
  text: string;       // 자막 내용
}

// 오디오 완료 센싱
const handleAudioEnded = () => {
  markTodayCompleted(); // 당일 마음 정원 완료 도장 처리
  addDumbbells(ritual.dumbbell); // 덤벨 추가
  setIsRewardModalOpen(true);    // 정산 팝업 오픈
};
```

---

## 4. 🎨 UX & 모션 가이드

* **배경 시각화**: 은은하게 숨 쉬는 파동 애니메이션 (Waveform Pulse).
* **자막 가독성**: 현재 재생 중인 굵은 흰색 글씨(`text-white font-bold`), 이전/다음 자막은 반투명 연회색(`text-white/40`).
