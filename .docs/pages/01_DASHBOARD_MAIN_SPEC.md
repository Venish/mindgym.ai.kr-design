# 🏠 [PAGE-SPEC 01] 대시보드 메인 홈 (`/dashboard`) 상세 구현 명세서

본 문서는 `main-showcase` (`http://localhost:3000/main-showcase`)의 모듈화된 UI 컴포넌트 구조를 기반으로 **`src/app/(main)/dashboard/page.tsx`**를 완성하기 위한 페이지별 실전 개발 명세서입니다.

---

## 1. 🎯 페이지 개요 & 베이스 구조

* **라우트 경로**: `/dashboard` (Next.js App Router `src/app/(main)/dashboard/page.tsx`)
* **디자인 베이스**: `main-showcase` 430px 에디토리얼 모바일 뷰 (`bg-white`, borderless 샌드박스)
* **핵심 역할**:
  * 이달의 나 지향점 선언 카운터 및 덤벨 레벨 상태 표출.
  * 누적 마음 정원 캘린더 (`AnimatedSprout`, `AnimatedCoffeeCup`) 시각화.
  * 시간대 스캔 기반 유동 배너 및 아침/저녁 회고 바텀시트 슬라이드업.
  * 30일 누적 완성 시 전체화면 골든 가든 축하 팝업.

---

## 2. 🧩 컴포넌트 모듈 구조 & 매핑

```text
src/app/(main)/dashboard/
├── page.tsx                           # 대시보드 메인 조립 컨테이너 (Suspense 포함)
└── _components/
    ├── DashboardHeader.tsx            # 메인 상단 브랜드 헤더 & 덤벨 레벨 캡슐 (ShowcaseHeader 기반)
    ├── DashboardMonthlyMe.tsx         # [이달의 나] 카운터 & 뱃지 (ShowcaseMonthlyMe 기반)
    ├── DashboardHeroKv.tsx            # 키비주얼 배너 & 시간대별 인사말 (ShowcaseHeroKv 기반)
    ├── DashboardBentoGrid.tsx         # 2열 벤토 30초 체크인 & 덤벨 성장의 길 (ShowcaseBentoGrid 기반)
    ├── DashboardTodayRoutines.tsx     # 오늘의 루틴 3가지 플랫 리스트 (ShowcaseTodayRoutines 기반)
    ├── DashboardPauseBanner.tsx       # 매거진 3분 아티클 스팟라이트 카드 (ShowcasePauseBanner 기반)
    └── DashboardGardenCalendar.tsx    # Vercel SVG 새싹/찻잔 애니메이션 탑재 누적 캘린더
```

---

## 3. 🧠 전역 상태 연동 & 프론트엔드 데이터 흐름 (`MindGymContext.tsx`)

### 3.1 사용 상태 및 메서드
```typescript
const {
  userName,
  totalDumbbells,
  completedDays,
  restDays,
  currentIntention,
  getLevelName,
  getNextLevelDiff,
  getLevelNumber,
  markTodayCompleted,
  markTodayRest,
} = useMindGym();
```

### 3.2 시간대 스캔 및 바텀시트 트리거 룰
* **오전 (05:00 ~ 11:00)**: 접속 시 `MorningCheckInBottomSheet` 자동 오픈 유도.
* **낮 (11:30 ~ 14:30)**: 미완료 시 `DashboardHeroKv` 배너가 "낮 체크인 2분 긴급 회복"으로 유동 전환.
* **저녁 (18:00 ~ 24:00)**: `[오늘 저녁 회고하기]` 터치 시 `EveningCheckInBottomSheet` 오픈.
* **30일 마일스톤**: `completedDays.length === 30` 도달 즉시 `GoldenGardenCompletionModal` 전체화면 활성화.

---

## 4. 🎨 디자인 & micro-interaction 지침

* **Non-White Container 무테(Borderless) 원칙**: 배경색이 적용된 모든 카드는 `border`를 일절 포함하지 않고 소프트 섀도우(`shadow-2xs` ~ `shadow-xs`)와 여백만으로 구성.
* **클릭/터치 모션**: 모든 버튼 및 카드 클릭 시 `scale(0.96)`, `transition-transform` 명시.
* **숫자 롤링**: `completedDays.length` 및 덤벨 수치는 `NumberTicker` 컴포넌트로 부드럽게 카운팅.
