<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Agent Rules & Available Skills

Skills live in `.agents/skills/`. Read the relevant `SKILL.md` **before** starting matching tasks.

## Skills Trigger Map (Total 19 Skills)

전체 스킬 요약 인덱스는 [.agents/SKILLS_INDEX.md](file:///d:/01.%EC%97%85%EB%AC%B4/2026/%EC%9B%B0%EB%B9%84%EC%95%84%EC%9D%B4/e%EC%9B%94%EA%B0%84%20%EB%A7%88%EC%9D%8C%EA%B1%B4%EA%B0%95/05.HTML/e-mindgym-test-nextjs/.agents/SKILLS_INDEX.md) 문서에서 확인할 수 있습니다.

### 1. ⚙️ GodUI & UI Engineering
| Task Scenario / Trigger | Skill to Invoke | Location |
| --- | --- | --- |
| **UI Polish & Micro-Interactions**<br>(Animations, hover/press scale, shadows, border-radius, typography, "make it feel better") | `make-interfaces-feel-better`<br>`frontend-design` | `.agents/skills/make-interfaces-feel-better/SKILL.md`<br>`.agents/skills/frontend-design/SKILL.md` |
| **Color & OKLCH Theme**<br>(OKLCH color system, dark mode, contrast, color tokens) | `oklch-skill` | `.agents/skills/oklch-skill/SKILL.md` |
| **Component & Learn Docs Creation**<br>(New component, storybook, learn article docs) | `godui-component-creation`<br>`component-creation`<br>`godui-learn-article` | `.agents/skills/godui-component-creation/SKILL.md`<br>`.agents/skills/component-creation/SKILL.md`<br>`.agents/skills/godui-learn-article/SKILL.md` |

### 2. 🎨 Visual Aesthetic Styles & Design System (`style-*`)
| Task Scenario / Trigger | Skill to Invoke | Location |
| --- | --- | --- |
| **Minimalist & Editorial UI**<br>(Warm monochrome, flat bento grid, muted pastels, clean document style) | `style-minimalist` | `.agents/skills/style-minimalist/SKILL.md` |
| **Industrial Brutalism UI**<br>(Swiss typography, military/terminal blueprint, raw mechanical, halftones) | `style-brutalist` | `.agents/skills/style-brutalist/SKILL.md` |
| **Soft Wellness UI**<br>(Pastel wellness, healing, self-compassion soft interface) | `style-soft-wellness` | `.agents/skills/style-soft-wellness/SKILL.md` |
| **Design Taste & Guidance**<br>(Visual taste system, premium UI design guidance) | `style-taste`<br>`style-taste-v1`<br>`style-gpt-taste` | `.agents/skills/style-taste/SKILL.md`<br>`.agents/skills/style-taste-v1/SKILL.md`<br>`.agents/skills/style-gpt-taste/SKILL.md` |

### 3. 🖼️ Image, Generative & Conversion Tools (`tool-*`)
| Task Scenario / Trigger | Skill to Invoke | Location |
| --- | --- | --- |
| **Image-to-Code Conversion**<br>(Convert mockup screenshot/design image to TSX code) | `tool-image-to-code` | `.agents/skills/tool-image-to-code/SKILL.md` |
| **UI Mockup Image Generation**<br>(Generate web & mobile UI mockup preview images) | `tool-imagegen-web`<br>`tool-imagegen-mobile` | `.agents/skills/tool-imagegen-web/SKILL.md`<br>`.agents/skills/tool-imagegen-mobile/SKILL.md` |
| **UI Redesign & Refactoring**<br>(Refactor existing legacy UI to modern design standards) | `tool-redesign` | `.agents/skills/tool-redesign/SKILL.md` |

### 4. 📦 Brand Kit & Output Systems (`brand-*`)
| Task Scenario / Trigger | Skill to Invoke | Location |
| --- | --- | --- |
| **Brand Kit & System Assembly**<br>(Brandkit definitions, UI component stitching, output specs) | `brand-kit`<br>`brand-stitch`<br>`brand-output` | `.agents/skills/brand-kit/SKILL.md`<br>`.agents/skills/brand-stitch/SKILL.md`<br>`.agents/skills/brand-output/SKILL.md` |

## Core UI Gotchas & Coding Guidelines

- **Static Tailwind Classes Only**: Never construct dynamic Tailwind class strings like `grid-cols-${n}` (Tailwind purge/scan won't pick them up). Map to static class lookup dictionaries.
- **Inline Utilities over CSS Blocks**: Prefer inline Tailwind utilities over creating new `@layer components` blocks.
- **Concentric Border Radius**: Keep inner `radius = outerRadius - padding`.
- **Tabular Numbers**: Use `tabular-nums` for dynamic numbers/counters to avoid layout shifts.
- **Micro-Interactions**: Use `scale(0.96)` for click/press states. Avoid `transition: all` — specify exact transition properties (e.g. `transition-transform`).
- **Z-Index Scale (★3단계 전역 레이어 스택 지침★)**:
  1) `z-10` : 기본 메인 대시보드 (`/dashboard`)
  2) `z-40` : 대시보드 바로 위 오버레이 서브 모달/시트 (`GlobalOverlayProvider` - 클릭 뚫림 100% 차단)
  3) `z-60` : 최상위 레벨업/골든가든 축하 팝업 & 시스템 모달 (`GlobalPopupProvider`)
- **Non-White Container Borderless Principle (★필수 지침★)**: 배경색이 흰색(`bg-white`)이 아닌 박스/컨테이너/패널 (`bg-gray-50`, `bg-emerald-50`, `bg-indigo-50`, `bg-[var(--color-pastel-mint-bg)]`, `bg-[#F9FAFB]` 등)에는 테두리(`border border-...`)를 절대 적용하지 않고 100% 무경계(Borderless)로 제작합니다. 테두리는 순수 `bg-white` 카드에만 섬세한 헤어라인으로 허용합니다.
- **App-Like Global Overlay Navigation Principle (★0ms 네이티브 오버레이 아키텍처★)**: 서브 페이지/알림/체크인/리추얼 상세 등 팝업 바텀시트 모달은 라우트 전체를 바꾸지 않고 대시보드가 100% 렌더링된 채로 유지되는 Framer Motion 전역 Overlay 방식 (`useModalStore` / `GlobalOverlayProvider`)을 사용합니다. 닫을 때도 `AnimatePresence` `exit={{ y: '100%' }}` / `exit={{ x: '100%' }}` 아웃 모션으로 끊김 없이 내려가도록 보장합니다.
- **Silent Background Data Refresh Principle (★무로딩 즉각 백그라운드 갱신 수칙★)**: 모달 창 닫힘 시 대시보드가 갱신될 때 중간 로딩 스피너/화면이나 "데이터를 불러오는 중입니다" 텍스트 노출 없이 0ms로 조용하고 매끄럽게 상태만 즉각 갱신합니다.



