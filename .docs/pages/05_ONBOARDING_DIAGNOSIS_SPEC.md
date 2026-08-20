# 🚀 [PAGE-SPEC 05] 온보딩 & KOSS 36문항 진단 (`/onboarding`) 상세 구현 명세서

본 문서는 신규 가입 사용자를 위한 가로 스와이프 인트로 슬라이드 및 KOSS 36개 문항 진단 설문 드로잉을 **`src/app/onboarding/page.tsx`**에 구축하기 위한 개발 명세서입니다.

---

## 1. 🎯 페이지 개요 & 베이스 구조

* **라우트 경로**: `/onboarding` (Next.js App Router `src/app/onboarding/page.tsx`)
* **디자인 컨셉**: 모션 스와이프 슬라이드 ➔ 인라인 설문 드로잉.
* **핵심 역할**:
  * 마인드짐 3대 킬러 카피 온보딩 슬라이드 제공.
  * KOSS 36개 문항 4점 리커트 척도 설문 드로잉.
  * 완료 시 `🌱 첫 자아 씨앗(Gold Sprout Theme)` 및 웰컴 덤벨 즉시 부여 후 `/dashboard`로 라우팅 점프.

---

## 2. 🧩 컴포넌트 모듈 구조

```text
src/app/onboarding/
├── page.tsx                           # 온보딩 메인 컨테이너
└── _components/
    ├── OnboardingSlides.tsx           # 3단계 킬러 카피 가로 스와이프 슬라이드
    ├── KossDiagnosticForm.tsx         # KOSS 36문항 인라인 진단 폼 & 프로그레스 바
    └── DiagnosticCompleteResult.tsx   # 웰컴 기프트 및 첫 정원 해금 축하 오버레이
```

---

## 3. 🧠 KOSS 36문항 설문 데이터 매핑 (`sheets/01_KOSS_문항.md`)

```typescript
export interface KossQuestionItem {
  id: number;          // 1 ~ 36
  domain: string;      // 예: "물리적 환경", "직무 요구", "관계 갈등" 등
  questionText: string;// 예: "나의 업무 장소는 공기가 쾌적하지 못하거나 소음이 심하다."
  isReverseScore: boolean; // 역채점 문항 여부
}
```

---

## 4. 🎨 UX & 전환 모션 명세

1. **슬라이드 모션**: `framer-motion` `AnimatePresence` 및 `drag="x"`를 이용한 매끄러운 가로 스와이프.
2. **진단 프로그레스 바**: `(현재 응답 문항 번호 / 36) * 100%` 상단 실시간 그린 게이지 바 카운팅.
3. **완료 웰컴 보상**: 진단 완료 버튼 터치 시 폭죽 파티클 모션과 함께 `🌱 첫 자아 씨앗` 지급 팝업 오픈 ➔ `[내 정원으로 이동하기]` 클릭 시 대시보드 메인 홈 진입.
