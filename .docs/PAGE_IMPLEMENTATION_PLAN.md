# 🛠️ 메인 페이지 기준 남은 기능 구현 프로세스 & 로드맵 (Page Implementation Plan)

본 문서는 현재 **1차 모듈화 구성이 완료된 메인 쇼케이스 페이지 (`http://localhost:3000/main-showcase`)**를 기반으로, 마인드짐 앱의 전체 남은 라우트, 모달, 바텀시트, 애니메이션 컴포넌트들을 순차적으로 구축하기 위한 **시니어 디자인 엔지니어링 실전 구현 로드맵**입니다.

---

## 1. 📐 구현 로드맵 및 개발 우선순위 개요

| 단계 | 라우트/컴포넌트 영역 | 주요 구현 대상 및 작업 단위 | 관련 스킬 & 디자인 지침 |
| :---: | :--- | :--- | :--- |
| **Phase 1** | **전역 상태 엔진 & 레이아웃 통합** | `MindGymContext.tsx` 고도화, 전역 탑바/바텀바 동적 탭 연동 | `app-navigation-spec.md`, `godui-component-creation` |
| **Phase 2** | **대시보드 메인 홈 완성 (`/dashboard`)** | 누적 마음 정원 캘린더 (`AnimatedSprout`, `AnimatedCoffeeCup`), 아침/저녁 바텀시트, 30일 완성 골드 팝업 | `style-soft-wellness`, `motion-animation-library`, `oklch-skill` |
| **Phase 3** | **자율 리추얼 라이브러리 (`/ritual`)** | 3열 그리드 레이아웃, 카테고리 필터링, 상세 바텀시트 & 즐겨찾기 | `ui-ux-specification.md`, `make-interfaces-feel-better` |
| **Phase 4** | **월간 매거진 서재 (`/magazine`)** | 매거진 서재 그리드, 완독 감지 모달 뷰어 & 토스트 리워드 | `style-minimalist`, `full-output-enforcement` |
| **Phase 5** | **KOSS 리포트 & 아카이브 (`/report`)** | KOSS 8대 다이어그램 차트, 이달의 나 지향점 위저드, 과거 정원 앨범 | `dev-data-schema.md`, `sheets/01_KOSS_문항.md` |
| **Phase 6** | **온보딩 & KOSS 진단 (`/onboarding`)** | 3단계 슬라이드 인트로 & KOSS 36개 문항 인터랙티브 진단 플로우 | `brand-stitch`, `tool-image-to-code` |
| **Phase 7** | **오디오 명상 플레이어 (`/player/[id]`)** | 자막 싱크 오디오 플레이어 & 완료 덤벨 정산 모달 연동 | `make-interfaces-feel-better`, `oklch-skill` |

---

## 2. 🚀 단계별 세부 구현 명세

### 2.1 Phase 1. 전역 상태 엔진 고도화 & 글로벌 레이아웃 연동
* **목표**: 메인 쇼케이스에서 사용 중인 임시 스탯 데이터를 전역 `MindGymContext.tsx`와 연동하고, 하단 바텀바 탭 클릭 시 실제 라우트로 부드럽게 점프하도록 배치.
* **작업 파일**:
  * `src/context/MindGymContext.tsx` (전역 상태 및 LocalStorage 동기화)
  * `src/app/(main)/layout.tsx` (공통 모바일 헤더 + 하단 고정 메뉴 바)
* **디자인 및 코드 표준**:
  * `scale(0.96)` 터치 micro-interaction 적용 (`transition-transform`).
  * Non-White Container 무테(Borderless) 원칙 100% 사수.

---

### 2.2 Phase 2. 대시보드 메인 홈 완성 (`/dashboard`)
* **목표**: 현재 쇼케이스 벤토 그리드를 넘어서, 실시간 시간대 스캔 유동 배너와 인터랙티브 바텀시트 플로우 완성.
* **작업 파일**:
  * `src/app/(main)/dashboard/page.tsx`
  * `src/components/animations/AnimatedSprout.tsx` (초록 새싹 스프링 SVG)
  * `src/components/animations/AnimatedCoffeeCup.tsx` (찻잔 김 모션 SVG)
  * `src/components/modals/MorningCheckInBottomSheet.tsx`
  * `src/components/modals/EveningCheckInBottomSheet.tsx`
  * `src/components/modals/GoldenGardenCompletionModal.tsx`
* **심리학적 지침**:
  * 스트릭 리셋 경고 노출 금지. "하루 쉬어가는 것도 건강한 마음 단련의 일부입니다." 자비 문구 배치.

---

### 2.3 Phase 3. 자율 리추얼 라이브러리 (`/ritual`)
* **목표**: 72개 리추얼 데이터베이스 구축 및 3열 그리드 UI 완성.
* **작업 파일**:
  * `src/app/(main)/ritual/page.tsx`
  * `src/app/(main)/ritual/_components/RitualGridItem.tsx`
  * `src/components/modals/RitualDetailBottomSheet.tsx`
* **UX/UI 지침**:
  * 파스텔 톤 원형 아이콘 + 리추얼 타이틀 컴팩트 배치.
  * 즐겨찾기 토글 시 즉시 LocalStorage 동기화 및 마이크로 토스트 피드백.

---

### 2.4 Phase 4. 월간 매거진 서재 (`/magazine`)
* **목표**: 에디토리얼 타이포그래피 스타일의 서재 및 완독 감지 모달 뷰어 구현.
* **작업 파일**:
  * `src/app/(main)/magazine/page.tsx`
  * `src/components/modals/MagazineViewerModal.tsx`
* **기술 명세**:
  * 스크롤 이벤트 디바운스 센싱 (`scrollTop + clientHeight >= scrollHeight - 50`).
  * 1분 이상 정독 체류 센싱 후 `+10 덤벨` 지급 및 토스트 연출.

---

### 2.5 Phase 5. KOSS 분석 리포트 & 과거 아카이브 (`/report`)
* **목표**: KOSS 8대 영역 다이어그램 및 과거 가꾸었던 정원 컬렉션 구축.
* **작업 파일**:
  * `src/app/(main)/report/page.tsx`
  * `src/app/(main)/report/_components/KossRadarChart.tsx`
  * `src/app/(main)/report/_components/PastGardenAlbum.tsx`
  * `src/components/modals/MonthlyIntentionWizardModal.tsx`
* **디자인 가이드**:
  * 게임형 가방/방패 비주얼을 배제하고 서재 형태의 품격 있는 '명예 트로피 진열장'으로 연출.

---

### 2.6 Phase 6. 온보딩 & KOSS 36문항 진단 (`/onboarding`)
* **목표**: 신규 사용자를 위한 가로 스와이프 인트로 & KOSS 36개 문항 진단 플로우 구축.
* **작업 파일**:
  * `src/app/onboarding/page.tsx`
  * `src/app/onboarding/_components/KossDiagnosticForm.tsx`

---

### 2.7 Phase 7. 자막 싱크 오디오 명상 플레이어 (`/player/[id]`)
* **목표**: 오디오 명상 플레이어 및 완료 후 정산 모달 구현.
* **작업 파일**:
  * `src/app/player/[id]/page.tsx`
  * `src/components/modals/DumbbellRewardModal.tsx`

---

## 3. 🎨 적용 디자인 스킬 & 가이드 맵핑

```text
┌──────────────────────────────────────────────────────────┐
│              GodUI & Style Skill Guidance                │
├──────────────────────────┬───────────────────────────────┤
│ oklch-skill              │ #00C474, OKLCH 파스텔 팔레트  │
│ style-soft-wellness      │ 무테(Borderless) & 자비 UX    │
│ make-interfaces-feel-better │ scale(0.96), Vercel SVG 모션   │
│ godui-component-creation │ 고품질 재사용 컴포넌트 규격   │
│ full-output-enforcement  │ 생략 없는 완전한 출력 보장    │
└──────────────────────────┴───────────────────────────────┘
```
