<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Agent Rules & Available Skills

Skills live in `.agents/skills/`. Read the relevant `SKILL.md` **before** starting matching tasks.

## Skills Trigger Map

| Task Scenario / Trigger | Skill to Invoke | Location |
| --- | --- | --- |
| **UI Polish & Detail**<br>(Animations, hover/press scale, shadows, border-radius, typography, "make it feel better", "feels off") | `make-interfaces-feel-better`<br>`frontend-design` | `.agents/skills/make-interfaces-feel-better/SKILL.md`<br>`.agents/skills/frontend-design/SKILL.md` |
| **Color & Theme**<br>(OKLCH color system, dark mode, contrast, color tokens) | `oklch-skill` | `.agents/skills/oklch-skill/SKILL.md` |
| **Creating UI Components**<br>(New reusable component implementation or modification) | `godui-component-creation`<br>`component-creation` | `.agents/skills/godui-component-creation/SKILL.md`<br>`.agents/skills/component-creation/SKILL.md` |

## Core UI Gotchas & Coding Guidelines

- **Static Tailwind Classes Only**: Never construct dynamic Tailwind class strings like `grid-cols-${n}` (Tailwind purge/scan won't pick them up). Map to static class lookup dictionaries.
- **Inline Utilities over CSS Blocks**: Prefer inline Tailwind utilities over creating new `@layer components` blocks.
- **Concentric Border Radius**: Keep inner `radius = outerRadius - padding`.
- **Tabular Numbers**: Use `tabular-nums` for dynamic numbers/counters to avoid layout shifts.
- **Micro-Interactions**: Use `scale(0.96)` for click/press states. Avoid `transition: all` — specify exact transition properties (e.g. `transition-transform`).
- **Z-Index Scale**: Use predefined semantic z-index values (`z-base`, `z-overlay`, `z-modal`, etc.) instead of arbitrary numbers.

