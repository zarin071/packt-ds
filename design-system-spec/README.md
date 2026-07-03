# Design System Specification (DSS)
# Packt Design System — Machine + Human readable source of truth

## What this is

This folder is the **single source of truth** for Packt DS.
It is structured to be consumed by both humans and AI (Claude Code, Figma MCP, Storybook).

When you give Claude any file from this folder, it should be able to generate:
- A production-ready React component
- Its Storybook story
- Its test file
- Its token consumption map
- Its Figma Code Connect mapping

## Folder map

```
01-foundations/         Raw design decisions. Colors, type, spacing, radius, motion.
02-semantic-tokens/     Intent-based aliases. What tokens MEAN, not what they ARE.
03-component-specs/     Per-component machine-readable specs. Claude's primary input.
04-patterns/            Multi-component compositions. Forms, cards, navigation flows.
05-accessibility/       WCAG rules, ARIA patterns, keyboard maps. Applied per component.
06-design-principles/   The WHY. Headless-first, token-driven, brand rules.
07-react-rules/         Coding standards, prop conventions, file structure rules.
08-storybook-rules/     Story conventions, MDX templates, addon config rules.
09-figma-rules/         Variable naming, component structure, Code Connect rules.
10-mcp-prompts/         Pre-built prompts for Figma MCP audit tasks.
```

## How to use with Claude

### Generate a component from spec

```
Read 03-component-specs/Button.md and 07-react-rules/RULES.md
then generate a production-ready Button component for Packt DS.
```

### Audit Figma against spec

```
Read 03-component-specs/Button.md and 09-figma-rules/RULES.md
then connect to my Figma library and audit the Button component
against the spec. Report any gaps.
```

### Generate a Storybook docs page

```
Read 03-component-specs/Button.md and 08-storybook-rules/RULES.md
then generate Button.mdx for Storybook with full usage documentation.
```

## Source files

- Design tokens source: `tokens/design-tokens.json` (Tokens Studio export)
- Token reference: `docs/DESIGN.md`
- Component library entry: `src/index.ts`
- Storybook config: `.storybook/`

## Versioning

This spec is versioned with the codebase.
When a component spec changes, the component, story, and Figma Code Connect
must all be updated in the same PR.

Spec version: 1.0.0
Last updated: June 2026
Maintained by: Design Systems team
