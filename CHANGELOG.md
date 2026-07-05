# Changelog

All notable changes to packt-ds will be documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
Versioning follows [Semantic Versioning](https://semver.org/).

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
