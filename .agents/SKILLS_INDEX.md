# .agents Agent Skills Unified Index

이 프로젝트(`e-mindgym-test-nextjs`)에서 사용 가능한 총 19종의 Agent 스킬 통합 인덱스 문서입니다.
모든 스킬은 표준 스킬 경로인 `.agents/skills/` 하위로 수합되었으며, 4가지 Prefix(`godui-`, `style-`, `tool-`, `brand-`)로 직관화되어 있습니다.

---

## 📌 스킬 그룹별 직관적 인덱스 (4 Categories)

### 1. ⚙️ GodUI & Component Engineering Skills (6종)
React 컴포넌트 엔지니어링, OKLCH 토큰 관리, 디자인 시스템 구현 및 모션/인터랙션 미세조정 전용 스킬입니다.

| 스킬명 (Skill Name) | 위치 (Location) | 용도 및 핵심 기능 |
| --- | --- | --- |
| `godui-component-creation` | `.agents/skills/godui-component-creation/SKILL.md` | GodUI 컴포넌트 라이브러리 신규 생성, Tailwind 와이어링 및 스토리북 구성 |
| `component-creation` | `.agents/skills/component-creation/SKILL.md` | 범용 재사용 UI 컴포넌트 설계 및 안티패턴 방지 지침 |
| `godui-learn-article` | `.agents/skills/godui-learn-article/SKILL.md` | GodUI 문서 페이지 내 Learn 탭 아티클 및 인터랙티브 아티클 작성 |
| `make-interfaces-feel-better` | `.agents/skills/make-interfaces-feel-better/SKILL.md` | UI 감성 미세조정 (스프링 피직스, 호버/프레스 스케일, 동심원 곡률, tabular-nums) |
| `frontend-design` | `.agents/skills/frontend-design/SKILL.md` | 정형화된 기본값을 탈피한 차별화된 비주얼 프론트엔드 디자인 조율 |
| `oklch-skill` | `.agents/skills/oklch-skill/SKILL.md` | OKLCH 컬러 스페이스 변환, 파스텔/다크모드 팔레트 생성 및 Tailwind v4 테밍 |

---

### 2. 🎨 Visual Aesthetic Styles (`style-*` 6종)
특정 비주얼 아키텍처 및 디자인 스타일 룩앤필을 정의하는 스킬 모음입니다.

| 스킬명 (Skill Name) | 위치 (Location) | 용도 및 핵심 기능 |
| --- | --- | --- |
| `style-minimalist` | `.agents/skills/style-minimalist/SKILL.md` | 에디토리얼 스타일, 웜 모노크롬, 플랫 벤토 그리드, 엠비언트 글로우 미니멀리즘 |
| `style-brutalist` | `.agents/skills/style-brutalist/SKILL.md` | 스위스 타이포그래피 + 밀리터리/산업용 청사진 터미널 감성의 인더스트리얼 브루탈리즘 |
| `style-soft-wellness` | `.agents/skills/style-soft-wellness/SKILL.md` | 소프트 파스텔 톤 웰니스, 자기자비 힐링 감성 인터페이스 |
| `style-taste` | `.agents/skills/style-taste/SKILL.md` | 최신 프리미엄 디자인 취향 및 비주얼 가이던스 시스템 |
| `style-taste-v1` | `.agents/skills/style-taste-v1/SKILL.md` | 프리미엄 UI 디테일 및 룩앤필 1.0 가이드 규격 |
| `style-gpt-taste` | `.agents/skills/style-gpt-taste/SKILL.md` | GPT 기반 UI 감성 및 가이드라인 제어 규격 |

---

### 3. 🖼️ Image & Generative Tools (`tool-*` 4종)
디자인 시안 이미지 변환, AI UI 모크업 생성 및 리디자인 전용 스킬 모음입니다.

| 스킬명 (Skill Name) | 위치 (Location) | 용도 및 핵심 기능 |
| --- | --- | --- |
| `tool-image-to-code` | `.agents/skills/tool-image-to-code/SKILL.md` | 디자인 시안/스크린샷 이미지를 분석하여 1:1 정밀 코드로 변환 |
| `tool-imagegen-web` | `.agents/skills/tool-imagegen-web/SKILL.md` | 웹 프론트엔드 모크업 이미지 생성 프로필 및 프롬프트 연동 |
| `tool-imagegen-mobile` | `.agents/skills/tool-imagegen-mobile/SKILL.md` | 모바일 앱 UI 모크업 이미지 생성 프로필 연동 |
| `tool-redesign` | `.agents/skills/tool-redesign/SKILL.md` | 기존 구형 레거시 UI를 최신 디자인 표준으로 리팩토링 및 리디자인 |

---

### 4. 📦 Brand Kit & Output Systems (`brand-*` 3종)
브랜드 킷 정의 및 최종 UI 출력 포맷팅 규격 스킬 모음입니다.

| 스킬명 (Skill Name) | 위치 (Location) | 용도 및 핵심 기능 |
| --- | --- | --- |
| `brand-kit` | `.agents/skills/brand-kit/SKILL.md` | 브랜드 컬러, 로고, 타이포그래피, 뱃지 킷 통합 구성 |
| `brand-stitch` | `.agents/skills/brand-stitch/SKILL.md` | UI 멀티 컴포넌트 스티치 및 조립 프로토콜 |
| `brand-output` | `.agents/skills/brand-output/SKILL.md` | 컴포넌트 코드 및 렌더링 결과물 최종 출력 규격 |
