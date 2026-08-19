# Senior Design Engineering Principles & Style Guide

Linear, Vercel, Stripe 감성의 프론트엔드 디자인 엔지니어링 표준 규칙 문서입니다.
일반적인 AI 스타일(보라색 그라데이션, 정형화된 3열 카드, 두꺼운 그림자 등)을 배제하고, 프리미엄 UI 디자인을 일관되게 적용하기 위해 지속적으로 참조합니다.

---

## 1. Visual Hierarchy & Layout (시각적 위계 및 레이아웃)
- **비대칭 레이아웃**: 좌측 텍스트/우측 일러스트 형태의 대칭적인 히어로 섹션을 지양하고, 대담한 에디토리얼 타이포그래피 또는 비대칭 Bento Grid 레이아웃을 사용합니다.
- **Dynamic Aspect Ratio & Overlap**: 요소 간 은은한 겹침(Overlap)과 다채로운 비율을 적용해 정형화된 그리드 틀을 탈피합니다.
- **여유로운 섹션 여백**: 섹션 간 여백은 최소 `py-24` (`120px`) 이상으로 여유 있게 설정합니다.
- **Negative Space 강조**: 모든 컨테이너를 가득 채우기보다여백(Negative Space)의 미학을 적극 활용합니다.

## 2. Color, Borders & Surface (컬러, 테두리 및 표면 처리)
- **Base Theme**: 딥 모노크롬 팔레트 (다크 차콜 `#09090b` 또는 정교한 웜 오프화이트 `#fafafa`)를 기본으로 사용합니다.
- **Accent Color**: 주 액션(Primary CTA) 및 활성 상태 인디케이터용 포인트 컬러는 최대 1개로 제한합니다 (예: `#00FF66`, `#F59E0B`, `#3B82F6` 등).
- **Hairline Border**: 순수 흰색(`bg-white`) 배경 박스에만 가독성을 위한 섬세한 헤어라인 테두리(`border border-gray-100` / `border border-gray-200`)를 적용합니다.
- **Non-White Container Borderless Principle (★필수 지침★)**: 배경색이 틴트/컬러/그레이/파스텔 (`bg-gray-50`, `bg-emerald-50`, `bg-indigo-50`, `bg-[var(--color-pastel-mint-bg)]`, `bg-[#F9FAFB]` 등)인 모든 박스/컨테이너/칩/패널에는 테두리(`border`)를 절대로 붙이지 않고 무경계(Borderless)로 처리합니다.
- **Ambient Glow & Grain**: 화려한 멀티 컬러 그라데이션 대신 은은한 앰비언트 글로우(`radial-gradient`)나 2-3% 수준의 CSS Grain 오버레이를 활용해 깊이감을 연출합니다.

## 3. Typography (타이포그래피 스펙)
- **Contrast Pairing**: 헤드라인에는 에디토리얼 세리프/그로테스크 디스플레이 폰트를, 본문에는 깔끔한 기하학 산세리프(Geometric Sans-serif)를 조합하여 대비감을 만듭니다.
- **Micro-labels**: 뱃지 및 섹션 태그에는 대문자 모노스페이스 폰트를 사용합니다 (`text-[11px] font-mono tracking-widest text-muted-foreground`).
- **Fluid Headline Scale**: 헤드라인은 극적인 스케일감을 부여합니다 (예: `text-5xl md:text-7xl tracking-tight font-medium`).

## 4. Components & Interactions (컴포넌트 및 인터랙션)
- **Hover Highlights**: 카드 요소는 섬세한 호버 하이라이트 효과를 필수로 포함합니다 (`hover:border-white/20 transition-all duration-300`).
- **Spring Physics Animation**: 애니메이션에는 단순 리니어(Linear) CSS transition 대신 Framer Motion 스프링 피직스(`damping: 20-25`, `stiffness: 200-300`)를 적용합니다.
- **Interactive Feedback**: 마우스 커서 스폿 효과(Cursor spotlight) 또는 로드 시 순차적 페이드인(Staggered fade-in)으로 인터랙션 피드백을 제공합니다.
