# Design System Audit Skills — Master Index

This folder contains modular SKILL.md files for auditing a design system connected via Figma MCP.
Each skill is self-contained. Run them independently or chain them for a full audit.

---

## How to invoke

Connect your Figma MCP and say:
> "Run the [SKILL NAME] audit on my design system"

Or for a full audit:
> "Run the complete design system audit using all skill files in this folder"

---

## Skill Registry

| File | Audit Domain | Priority |
|------|-------------|----------|
| `01-token-architecture.md` | Token hierarchy, naming, primitive→semantic→component layers | 🔴 Core |
| `02-component-anatomy.md` | Component structure, variants, props, states, slot coverage | 🔴 Core |
| `03-wcag-accessibility.md` | WCAG 2.2 AA/AAA checklist, focus, ARIA, keyboard nav | 🔴 Core |
| `04-contrast-color.md` | Contrast ratios, color usage, semantic color misuse | 🔴 Core |
| `05-theming-dark-mode.md` | Light/dark mode coverage, mode completeness, hardcoded values | 🟠 High |
| `06-typography-scale.md` | Type scale logic, variable font tokens, line-height, responsive type | 🟠 High |
| `07-spacing-layout.md` | Spacing scale consistency, layout tokens, grid system | 🟠 High |
| `08-motion-tokens.md` | Animation tokens, reduced-motion support, duration/easing coverage | 🟠 High |
| `09-component-docs.md` | Documentation completeness, usage guidelines, do/don't coverage | 🟡 Medium |
| `10-design-code-sync.md` | Figma↔code parity, Code Connect mapping, detached components | 🟡 Medium |
| `11-icon-system.md` | Icon set completeness, naming, sizing grid, accessibility labels | 🟡 Medium |
| `12-pattern-consistency.md` | Cross-component pattern reuse, anti-patterns, UX consistency | 🟡 Medium |
| `13-localization-density.md` | Text expansion, RTL readiness, content density variants | 🟢 Enhancement |
| `14-governance-health.md` | Component debt, detachment rate, adoption scoring, versioning | 🟢 Enhancement |

---

## Output format

Each skill produces a structured audit report with:
- **Score** (0–100) per section
- **Findings** listed as PASS / WARN / FAIL
- **Recommended fixes** with specificity
- **Priority queue** ordered by impact

---

## Environment assumptions

- Figma MCP is connected and authenticated
- The target file/library is specified before running
- For code-sync skills (10), a repository or Storybook URL is needed
- WCAG skills default to WCAG 2.2 Level AA unless otherwise specified
