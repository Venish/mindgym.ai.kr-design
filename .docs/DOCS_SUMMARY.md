# 📚 [.docs] 폴더 전체 구성 및 상세 분석 정리 문서

본 문서는 프로젝트 `.docs/` 디렉토리 하위에 위치한 모든 기획서, 데이터 스키마, 디자인 가이드, 그리고 CSV/MD 시트 데이터를 완벽하게 분석하여 일목요연하게 정리한 종합 참조 문서입니다.

---

## 1. 📂 디렉토리 구조 개요

```text
.docs/
├── data/
│   └── dev-data-schema.md           # 전역 상태 및 데이터 스키마 명세
├── design/
│   ├── design-system-guide.md       # OKLCH 메인 컬러(#00C474) & 무테(Borderless) 디자인 가이드
│   ├── motion-animation-library.md  # Vercel 스타일 SVG 동적 애니메이션 아이콘 명세
│   └── stitch-integration-guide.md  # Google Stitch UI 스티칭 연동 지침
├── features/
│   └── dashboard-main-home-spec.md  # [P-18-v3] 마음의 쉼터 및 누적 실천 대시보드 기획서
├── md/
│   └── godui-integration-plan.md    # GodUI 컴포넌트 통합 가이드
├── sheets/
│   ├── 01_KOSS_문항.md (.csv)        # 한국인 직무스트레스(KOSS) 36개 진단 문항
│   ├── 02_감정단어_상황코드.md (.csv) # 24가지 감정단어 및 상황 코드 매핑
│   ├── 03_KOSS_점수_산정_로직.md (.csv)# KOSS 영역별 점수 계산 및 3단계 평가 로직
│   ├── 04_리추얼_목록_72개.md (.csv)  # 72가지 맞춤 마음 단련 리추얼 목록
│   ├── 05_덤벨_성장_시스템.md (.csv)  # 8단계 덤벨 등급 및 누적 수치 시스템
│   ├── 06_상황코드_리추얼_매핑.md (.csv)# KOSS 상황코드별 추천 리추얼 매핑
│   ├── 07_리추얼_실행_스트릭.md (.csv)# 마음 정원 캘린더 기록 및 휴식일 처리 룰
│   ├── 08_이달의_나_워딩.md (.csv)   # 이달의 나 지향점 선언 문구 세트
│   ├── 09_데일리_체크인_워딩.md (.csv)# 아침/낮/저녁 체크인 및 위로 워딩 데이터
│   └── README.md                    # 시트 데이터 운용 가이드
└── specs/
    ├── app-navigation-spec.md       # Next.js App Router 4대 탭 & 라우팅 명세 (v9)
    └── ui-ux-specification.md       # 통합 화면 기획 및 UI/UX 상세 설계서 (v8)
```

---

## 2. 📄 주요 영역별 상세 내용 정리

### 2.1 🎯 기획 및 라우팅 명세 (`/specs`)
* **`app-navigation-spec.md` (v9)**:
  * **전역 상태 엔진**: `MindGymContext.tsx` 기반으로 `totalDumbbells`, `completedDays`, `restDays`, `currentIntention`, `favorites`, `readMagazines`를 관리하며 `localStorage`와 자동 동기화.
  * **핵심 가치 전환**: 게임형 스트릭 리셋과 쉴드 아이템을 철저히 배제하고, '누적 실천 캘린더(마음 정원)' 및 '자연스러운 휴식일(Rest Day)' 중심의 자기자비 심리학 적용.
  * **아이콘 체계**: 정적 Phosphor Icons와 Framer Motion 기반 Vercel 동적 SVG 애니메이션 아이콘의 하이브리드 배치.
* **`ui-ux-specification.md` (v8)**:
  * **4대 글로벌 탭 구조**:
    1. `[탭 1] /dashboard`: 누적 마음 정원 대시보드, 아침/낮/저녁 체크인 바텀시트, 30일 완성 골든 가든 팝업.
    2. `[탭 2] /ritual`: 3열 그리드 형태의 자율 리추얼 라이브러리 및 상세 바텀시트.
    3. `[탭 3] /magazine`: 월간 매거진 서재 및 완독 감지 토스트 뷰어.
    4. `[탭 4] /report`: KOSS 8대 영역 다이어그램 리포트, 과거 정원 월간 아카이브 서재.
  * **독립 뷰**:
    * `/onboarding`: 서비스 소개 및 KOSS 36문항 진단.
    * `/player/[id]`: 자막 싱크 오디오 명상 플레이어 & 덤벨 정산 오버레이.

---

### 2.2 🎨 디자인 시스템 및 애니메이션 (`/design`)
* **`design-system-guide.md`**:
  * **메인 컬러**: `#00C474` (Brand Primary Green). 금지 컬러 `#015A35` 사용 안 함.
  * **무테(Borderless) 원칙**: 배경색이 있는 컨테이너/카드/패널에는 `border` 선을 100% 제거하고, 무경계 패딩과 소프트 섀도우만 적용. 테두리는 Pure White 카드에만 섬세한 헤어라인으로 제한.
  * **OKLCH 스펙트럼**: 파스텔 민트, 에메랄드, 소프트 사파이어 등의 시각적 안도감을 주는 커스텀 OKLCH 토큰 정의.
* **`motion-animation-library.md`**:
  * `AnimatedSprout` (완료일 초록 새싹 스프링 모션), `AnimatedCoffeeCup` (휴식일 따뜻한 찻잔 김 모션), `AnimatedMorningSun` (아침 해 무한 회전), `AnimatedEveningMoon` (저녁 달 숨쉬기 모션) 등 Vercel 스타일 Framer Motion SVG 컴포넌트 규격.
* **`stitch-integration-guide.md`**:
  * Google Stitch 기반 디자인 시스템 연동 및 퍼포먼스 가이드라인.

---

### 2.3 📊 데이터 스키마 및 시트 데이터 (`/data`, `/sheets`)
* **`dev-data-schema.md`**:
  * TypeScript 타입 정의: `UserProgress`, `RitualItem`, `CheckInRecord`, `KOSSResult`, `MagazineItem` 등 API 및 Context 데이터 인터페이스 구체화.
* **`sheets/` 데이터 구축 현황**:
  1. **`01_KOSS_문항`**: 물리적 환경, 직무 요구, 직무 자율, 관계 갈등, 직무 불안, 조직 체계, 보상 부적절, 직장 문화 등 8개 영역 36개 문항 데이터.
  2. **`02_감정단어_상황코드`**: 24가지 감정 상태(불안, 피로, 무기력, 분노 등)와 대응 코드 매핑.
  3. **`03_KOSS_점수_산정_로직`**: 영역별 100점 환산 로직 및 🟢안정(0~33), 🟡주의(34~66), 🔴위험(67~100) 3단계 평가 산식.
  4. **`04_리추얼_목록_72개`**: 3분 숏폼, 7분 하이브리드, 15분 딥다이브로 구성된 72개 리추얼 데이터베이스.
  5. **`05_덤벨_성장_시스템`**: Lv.1 나무 덤벨(0~149)부터 Lv.8 다이아 덤벨(2,500+)까지 8단계 수직 진화 테이블.
  6. **`06_상황코드_리추얼_매핑`**: 상황 코드 및 KOSS 취약 영역 기반 개인화 리추얼 자동 추천 엔진 규격.
  7. **`07_리추얼_실행_스트릭`**: 30일 완성 캘린더 판정 룰 및 미완료일의 자동 `REST_DAY` 보정 로직.
  8. **`08_이달의_나_워딩`**: "안정된 8월", "당당한 나" 등 월간 지향점 가이드 문구.
  9. **`09_데일리_체크인_워딩`**: 시간대별 정서 환영 카피 및 위로 멘트 리소스.

---

### 2.4 💡 대시보드 및 GodUI 계획 (`/features`, `/md`)
* **`dashboard-main-home-spec.md` (P-18-v3)**:
  * 대시보드 캘린더 와이어프레임, 실시간 시간대 스캔 유동 배너, KOSS 상황 매핑 추천 카드 명세.
* **`godui-integration-plan.md`**:
  * GodUI 설계 시스템 및 UI 엔지니어링 스킬 적용 가이드.
