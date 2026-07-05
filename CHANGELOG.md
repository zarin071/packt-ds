# Changelog

All notable changes to packt-ds will be documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
Versioning follows [Semantic Versioning](https://semver.org/).

---

## [Unreleased] — 2026-07-05

### Changed — Token set migration (PascalCase → lowercase kebab)

- All 13 Figma-generated PascalCase token sets removed from `tokens/token.json`
  and replaced with 8 canonical lowercase sets:
  `primitive-colors/default`, `semantic-colors/light`, `semantic-colors/dark`,
  `primitive-type/default`, `space/default`, `border/default`,
  `breakpoints/default`, `unit/default`
- CSS variable naming updated across the board:
  - Background group: `--packt-background-*` → `--packt-bg-*`
  - Hub group: `--packt-hub-packt-*` → `--packt-hub-*`
  - Brand tag tokens: `--packt-brand-tag-bg` → `--packt-brand-tag-bg-default`,
    `--packt-brand-tag-text` → `--packt-brand-tag-text-default`
  - Hub tag tokens: same `-default` suffix pattern applied
  - Status error tokens: `--packt-status-error-text/icon` →
    `--packt-status-text/icon-error` (now consistent with warning/success/info)
  - Overlay: `--packt-overlay-overlay50` → `--packt-overlay-overlay-50`,
    `--packt-overlay-overlayinverse` → `--packt-overlay-overlay-inverse`
  - `--packt-border-elevated` added; `--packt-border-disabled` removed
    (Tailwind bridge falls back to `--packt-border-default`)
- `src/styles/tailwind.css` updated to reference all new `--packt-*` aliases;
  Figma typo `icoon-default` (double-o) normalised at the bridge layer so
  components continue to use `brand-icon-default` / `hub-icon-default`
- New hub tokens added to Tailwind bridge: `bg-pressed`, `bg-selected-hover`,
  `border-hover`, `icon-hover`

### Added

- `scripts/dedupe-tokens.js` — removes rename artifacts and numbered-conflict
  duplicates Tokens Studio leaves behind on every Figma push
- `npm run tokens:dedupe` script
- `.github/workflows/tokens-sync.yml` — added `Deduplicate token groups` step
  before CSS rebuild so the pipeline stays clean automatically
- 16 new component spec files under `design-system-spec/component-specs/`:
  Avatar, Breadcrumb, Card, Checkbox, EmptyState, FileUpload, Icon, Label,
  ListItem, Pagination, ProgressBar, RadioButton, SearchBar, Tab,
  ToggleSwitch, Tooltip

---

## [1.0.0] — 2026-07-05

### Added
- 22 components: Alert, Avatar, Badge, Breadcrumb, Button, Card, Checkbox,
  EmptyState, FileUpload, Icon, Input, Label, ListItem, Pagination,
  ProgressBar, RadioButton, SearchBar, Select, Tab, Tag, ToggleSwitch, Tooltip
- 3-layer token pipeline: `tokens.css` (primitives in `:root`) →
  `tokens.light.css` / `tokens.dark.css` (semantic, `var()` references into
  primitives) → `tokens.theme.css` (theme-agnostic aliases, auto-generated)
- GitHub Actions workflow: auto-rebuilds all four CSS token files on push to
  `design-tokens` branch and merges to `main`
- Tailwind v4 token bridge (`src/styles/tailwind.css`) mapping theme-aware
  `--packt-*` aliases into Tailwind `@theme` utilities
- Style Dictionary v4 config with Tokens Studio multi-set JSON support,
  custom `name/packt` transform, and `packt/semantic-to-var` transform
- `design-system-spec/` — machine + human readable source of truth covering
  React rules, Storybook rules, Figma rules, accessibility rules, and
  design principles
- Package exports for tokens, light, dark, and theme CSS files
