# 🎨 마인드짐(MindGym) OKLCH 디자인 시스템 & UI 엔지니어링 가이드

본 가이드는 **마인드짐(MindGym)** 모바일 웹 앱의 최신 메인 쇼케이스(`http://localhost:3000/main-showcase`) 및 `src/app/globals.css`에 구축된 **OKLCH 전역 토큰 스펙트럼, 무테(Borderless) 컨테이너 원칙, GodUI 엔지니어링 컴포넌트 규격**을 정리한 표준 디자인 시스템 지침서입니다.

---

## 1. 🌈 OKLCH 브랜드 전역 토큰 스펙트럼 (`src/app/globals.css`)

마인드짐은 브라우저 P3 넓은 색역과 시각적 안도감을 위해 `globals.css` 내 `:root`에 **OKLCH 기반 지각적 인지 보정 전역 토큰**을 표준으로 정의하여 사용합니다.

### 1.1 OKLCH 시그니처 & 파스텔 토큰 명세

```css
:root {
  /* 🟩 Primary Brand & Mint Tokens */
  --color-signature-green: oklch(0.72 0.19 155);  /* Hex #00C474 호환 메인 에메랄드 */
  --color-brand-green: oklch(0.72 0.19 155);      /* 브랜드 시그니처 그린 */
  --color-forest-green: oklch(0.42 0.12 155);     /* 딥 포레스트 액센트 */
  --color-mint-tint: oklch(0.97 0.03 155);        /* 파스텔 민트 틴트 배경 */

  /* ⬛ Neutral Ink & Gray Scale (OKLCH 인지 보정 톤) */
  --color-neutral-ink: oklch(0.22 0.02 260);      /* 본문 텍스트 (Deep Ink) */
  --color-neutral-gray-700: oklch(0.42 0.03 260); /* 서브 카피 텍스트 */
  --color-neutral-gray-500: oklch(0.64 0.03 260); /* 메타 정보 텍스트 */
  --color-neutral-gray-400: oklch(0.76 0.02 260); /* 플레이스홀더 / 비활성 텍스트 */
  --color-neutral-gray-200: oklch(0.94 0.01 260); /* 소프트 구분선 */
  --color-neutral-surface: oklch(0.985 0.005 260);/* 무테 서피스 카드 배경 (#F9FAFB) */

  /* 🟨 Ambient Accent Tokens */
  --color-golden-accent: oklch(0.78 0.18 85);    /* #F59E0B 30일 골든 가든 액센트 */
}
```

### 1.2 Tailwind & 인라인 사용 규칙
* **Tailwind 변수 참조**: `text-[var(--color-brand-green)]`, `bg-[var(--color-mint-tint)]`, `border-[var(--color-neutral-gray-200)]` 방식으로 적극 사용.
* ⚠️ **금지 컬러 규칙**: 칙칙하고 톤다운된 구형 초록색 `#015A35` 사용을 엄격히 배제합니다.

---

## 2. 📐 무테(Borderless) 레이아웃 원칙 (★필수 수칙★)

* **Non-White Container Borderless Principle**:
  배경색이 순수 흰색(`bg-white`)이 아닌 박스/컨테이너/패널 (`bg-gray-50`, `bg-emerald-50`, `bg-[var(--color-mint-tint)]`, `bg-[#F9FAFB]` 등)에는 **테두리 선(`border`, `border-gray-200` 등)을 100% 제거**하고, 푹신한 여백(`padding`)과 소프트 섀도우(`shadow-2xs` ~ `shadow-xs`)만으로 영역을 구분합니다.
* **Pure White Card Exception**:
  순수 `bg-white` 카드가 파스텔 배경 위에 놓일 때만 섬세한 1px 미세 헤어라인(`border border-emerald-100/60` 또는 `border border-gray-100`)을 허용합니다.
* **Concentric Border Radius Scale**:
  `Inner Radius = Outer Radius - Padding` 수식을 준수하여 모서리 비율이 곡면을 정밀하게 감싸도록 구현합니다.

---

## 3. 🧩 GodUI 엔지니어링 컴포넌트 체계

1. **`AuroraText`**:
   * 메인 사용자 이름(`김민우님`) 및 브랜드 타이틀에 적용되는 동적 파스텔 오로라 글라디언트 텍스트.
2. **`NeumorphCard`**:
   * 소프트 엠보싱 깊이감을 주는 고급스러운 [이달의 나] 뱃지 카드.
3. **`SpotlightCard`**:
   * 마우스/터치 궤적을 따라 부드러운 그린 앰비언트 조명이 추적되는 아티클 매거진 배너.
4. **`NumberTicker`**:
   * 누적 실천일수(`14일째`) 및 덤벨 획득 수치 롤링 카운터 애니메이션 컴포넌트 (`tabular-nums` 적용).

---

## 4. 🖼️ 하이브리드 아이콘 체계 (Phosphor + Vercel SVG)

* **정적 아이콘 시스템**: Phosphor Icons (`@phosphor-icons/react`)
  * `Barbell`, `Sparkle`, `Compass`, `BookOpen`, `House`, `User`, `Plus`, `Check` 등 정제된 벡터 아이콘 사용.
* **동적 SVG 애니메이션 시스템**: Framer Motion 기반 Vercel 스타일 SVG
  * **`AnimatedSprout`**: 실천 완료 날짜 타일에 뻗어나오는 초록 새싹 스프링 팅글 모션.
  * **`AnimatedCoffeeCup`**: 휴식일 타일에 김이 피어오르는 따뜻한 찻잔 루프 모션.
  * **`AnimatedMorningSun`**: 아침 체크인 시 무한 회전하는 긍정 활력 태양 모션.
  * **`AnimatedEveningMoon`**: 저녁 체크인 시 숨쉬듯 둥실거리는 편안한 달 모션.

---

## 5. 👆 Micro-Interactions & UX 지침

* **터치 피드백**: 모든 클릭 가능 요소에 `active:scale-[0.96]`, `transition-transform` 적용.
* **드래그 오작동 방지**: `framer-motion` `drag="x"` 사용 시 `isDraggingRef`를 두어 드래그 후 클릭 탭 오작동을 완벽 방지.
* **정서적 자비 문구**: "하루 쉬어가는 것도 건강한 마음 단련의 일부입니다." 등의 자책감 방지 문구 상시 노출.
