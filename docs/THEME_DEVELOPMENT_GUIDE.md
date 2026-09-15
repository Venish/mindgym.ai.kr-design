# e-마음짐 전역 테마 & 다크모드 개발 표준 가이드

본 문서는 e-마음짐 프로젝트의 **5대 웰니스 테마 시스템**, **다크 모드**, **72종 리추얼 독립 캔버스** 개발 및 유지보수를 위한 공식 표준 지침입니다.

---

## 1. 전역 테마 토큰 매핑 규격 (Strict Token Mapping)

컴포넌트 작성 시 하드코딩된 Tailwind 유틸리티(`bg-white`, `text-gray-900` 등)의 단독 사용을 엄격히 금지하며, 반드시 아래 표준 시맨틱 클래스를 사용합니다.

| UI 요소 | 표준 클래스 | 라이트 테마 (`fresh-mint` 등) | 다크 모드 (`.dark`) | 설명 |
|---|---|---|---|---|
| **앱 최상단 캔버스** | `bg-theme-app` | `--theme-bg-app` (#F2F9F5 등) | `#0F172A` | 대시보드 및 서브페이지 기본 배경 |
| **메인 카드 배경** | `bg-theme-card` | `#FFFFFF` | `#1E293B` | 기본 카드, 모달 팝업, 헤더 바 |
| **서브/틴트 카드 배경** | `bg-theme-card-subtle` | `#E5F4EC` / `#F9FAFB` | `#334155` | 칩 배경, 입력창 기본 배경 |
| **헤어라인 보더** | `border-theme-subtle` | `#D2EBDD` / `#E5E7EB` | `#334155` | 순수 화이트 카드 헤어라인 테두리 |
| **메인 텍스트** | `txt-brand-ink` | `#0F172A` / `#1C1917` | `#F8FAFC` | 제목, 본문, 핵심 라벨 |
| **보조/뮤트 텍스트** | `text-theme-muted` | `#64748B` | `#94A3B8` | 서브 캡션, 시간, 미완료 라벨 |
| **브랜드 시그니처 텍스트** | `txt-brand-green` | `#00BA66` / `#00C474` | `#34D399` | 카테고리 뱃지, 포인트 수치 |

---

## 2. 다크모드 컬러 페어링 수칙 (High-Luminance Bug Prevention)

라이트 모드에서 감성적 틴트(`bg-*-50`)를 사용할 경우, 다크 모드에서 밝은 박스로 번쩍거리는 현상을 막기 위해 반드시 `dark:bg-*-950/*` 페어를 지정합니다.

```tsx
// ❌ WRONG (다크 모드 시 밝은 녹색/보라색 박스로 번쩍거림)
<div className="bg-emerald-50 text-emerald-800">...</div>
<div className="bg-indigo-50 text-indigo-800">...</div>

// ✅ CORRECT (다크 모드 시 부드러운 다크 틴트로 완벽 대응)
<div className="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300">...</div>
<div className="bg-indigo-50 dark:bg-indigo-950/40 text-indigo-800 dark:text-indigo-300">...</div>
```

---

## 3. 72종 리추얼 독립 캔버스 스코프 (`[data-ritual-sheet]`)

- 72종 리추얼 화면 컨테이너에는 반드시 `data-ritual-sheet` 속성을 유지합니다.
- 리추얼 실행 화면은 전역 다크모드/테마 변수 오버라이드에서 격리되어, 6대 카테고리 수채화 파스텔 그라디언트와 딥 잉크 폰트(`txt-brand-ink` -> `#0F172A`)를 100% 보존합니다.

---

## 4. 비흰색 박스 무경계 원칙 (Non-White Container Borderless Principle)

- 배경색이 순수 흰색(`bg-white`)이 아닌 박스(`bg-gray-50`, `bg-emerald-50`, `bg-theme-card-subtle` 등)에는 `border`를 적용하지 않습니다.
- 테두리는 순수 `bg-white` 카드에만 섬세한 헤어라인(`border border-theme-subtle` 또는 `border border-gray-100`)으로 허용합니다.
