# DESIGN.md

> Generated from `design-tokens.json` — your single merged Tokens Studio export.
> Every value is resolved from source. No placeholders.
>
> **Token set load order** (from `$metadata.tokenSetOrder`):
> `theme` → `Primitives-colors/Mode 1` → `Semantic-colors/Light` → `Semantic-colors/Dark`
> → `Primitive - Type/Mode 1` → `Semantic - Type/Large Desktop` → `Semantic - Type/Desktop`
> → `Semantic - Type/Tablet` → `Semantic - Type/Mobile`
> → `Borders/Mode 1` → `Space/Mode 1` → `Layout/Mode 1` → `Unit/Mode 1`

---

## Table of contents

1. [Primitive colour palette](#1-primitive-colour-palette)
2. [Semantic colour tokens — light mode](#2-semantic-colour-tokens--light-mode)
3. [Semantic colour tokens — dark mode](#3-semantic-colour-tokens--dark-mode)
4. [Typography primitives](#4-typography-primitives)
5. [Responsive type scale](#5-responsive-type-scale)
6. [Spacing scale](#6-spacing-scale)
7. [Border tokens](#7-border-tokens)
8. [Layout & breakpoints](#8-layout--breakpoints)
9. [Component tokens](#9-component-tokens)
10. [Dark mode CSS](#10-dark-mode-css)
11. [Where to place this file](#11-where-to-place-this-file)
12. [How to use it](#12-how-to-use-it)

---

## 1. Primitive colour palette

Raw values only — never used directly in components. Always consumed via semantic tokens.

### Orange — Brand

| Token | Hex |
|-------|-----|
| `Orange.100` | `#fee3d9` |
| `Orange.200` | `#fdc6b3` |
| `Orange.300` | `#fbaa8d` |
| `Orange.400` | `#fa8d67` |
| `Orange.500` | `#f97141` ← **primary brand** |
| `Orange.600` | `#cd603a` |
| `Orange.700` | `#a15033` |
| `Orange.800` | `#763f2c` |
| `Orange.900` | `#4a2f25` |

### Blue — Info

| Token | Hex |
|-------|-----|
| `Blue.100` | `#d6e0f5` |
| `Blue.200` | `#adc2eb` |
| `Blue.300` | `#85a3e0` |
| `Blue.400` | `#5c85d6` |
| `Blue.500` | `#3366cc` |
| `Blue.600` | `#2f58a9` |
| `Blue.700` | `#2b4986` |
| `Blue.800` | `#263b64` |
| `Blue.900` | `#222c41` |

### Green — Success

| Token | Hex |
|-------|-----|
| `Green.100` | `#d9fee3` |
| `Green.200` | `#b3fdc6` |
| `Green.300` | `#8dfbaa` |
| `Green.400` | `#67fa8d` |
| `Green.500` | `#41f971` |
| `Green.600` | `#3acd60` |
| `Green.700` | `#279544` |
| `Green.800` | `#1a642d` |
| `Green.900` | `#254a2f` |

### Red — Error

| Token | Hex |
|-------|-----|
| `Red.100` | `#f9d2d9` |
| `Red.200` | `#f2a4b3` |
| `Red.300` | `#ec778d` |
| `Red.400` | `#e54967` |
| `Red.500` | `#df1c41` |
| `Red.600` | `#b81c3a` |
| `Red.700` | `#921d33` |
| `Red.800` | `#6b1d2c` |
| `Red.900` | `#451e25` |

### Yellow — Warning

| Token | Hex |
|-------|-----|
| `Yellow.100` | `#fcf6cc` |
| `Yellow.200` | `#f8ed9a` |
| `Yellow.300` | `#f5e467` |
| `Yellow.400` | `#f1db35` |
| `Yellow.500` | `#eed202` |
| `Yellow.600` | `#c4ae08` |
| `Yellow.700` | `#9b8a0d` |
| `Yellow.800` | `#716613` |
| `Yellow.900` | `#484218` |

### Neutral

| Token | Hex | Role |
|-------|-----|------|
| `neutral.100` | `#f6f6f6` | Page bg / disabled bg |
| `neutral.200` | `#e4e4e4` | Hover bg / dividers |
| `neutral.300` | `#d2d2d2` | Tertiary bg |
| `neutral.400` | `#a6a6a6` | Disabled border / icon |
| `neutral.500` | `#797979` | Tertiary text |
| `neutral.600` | `#4d4d4d` | Secondary text |
| `neutral.700` | `#1a1a1a` | Selected bg (light) / secondary bg (dark) |
| `neutral.800` | `#1f1f1f` | — |
| `neutral.900` | `#1e1e1e` | — |

### Base

| Token | Hex |
|-------|-----|
| `Base.white` | `#ffffff` |
| `Base.black` | `#000000` |

---

## 2. Semantic colour tokens — light mode

Applied on `:root`. Each row shows the Tokens Studio reference and the resolved hex.

### Content (text & stroke)

| Token | Reference | Resolved |
|-------|-----------|----------|
| `Content.primary` | `{Base.black}` | `#000000` |
| `Content.secondary` | `{neutral.600}` | `#4d4d4d` |
| `Content.tertiary` | `{neutral.500}` | `#797979` |
| `Content.disabled` | `{neutral.100}` | `#f6f6f6` |
| `Content.hover` | `{Base.black}` | `#000000` |
| `Content.focus` | `{Base.black}` | `#000000` |
| `Content.selected` | `{Base.white}` | `#ffffff` |
| `Content.Brand-Default` | `{Orange.500}` | `#f97141` |
| `Content.Brand-hover` | `{Orange.500}` | `#f97141` |
| `Content.Brand-Selected` | `{Base.white}` | `#ffffff` |
| `Content.Info-default` | `{Blue.500}` | `#3366cc` |
| `Content.Info-hover` | `{Blue.600}` | `#2f58a9` |
| `Content.Info-selected` | `{Base.white}` | `#ffffff` |
| `Content.Success-default` | `{Green.500}` | `#41f971` |
| `Content.Success-hover` | `{Green.600}` | `#3acd60` |
| `Content.Success-Selected` | `{Base.white}` | `#ffffff` |
| `Content.Error-default` | `{Red.500}` | `#df1c41` |
| `Content.Error-hover` | `{Red.600}` | `#b81c3a` |
| `Content.Error-Selected` | `{Base.white}` | `#ffffff` |
| `Content.Warning-default` | `{Yellow.500}` | `#eed202` |
| `Content.Warning-hover` | `{Yellow.600}` | `#c4ae08` |
| `Content.Warning-Selected` | `{Base.white}` | `#ffffff` |

### Background

| Token | Reference | Resolved |
|-------|-----------|----------|
| `Background.primary` | `{Base.white}` | `#ffffff` |
| `Background.secondary` | `{neutral.200}` | `#e4e4e4` |
| `Background.tertiary` | `{neutral.300}` | `#d2d2d2` |
| `Background.hover` | `{neutral.200}` | `#e4e4e4` |
| `Background.pressed` | `{neutral.200}` | `#e4e4e4` |
| `Background.selected` | `{neutral.700}` | `#1a1a1a` |
| `Background.disabled` | `{neutral.100}` | `#f6f6f6` |
| `Background.brand-default` | `{Base.white}` | `#ffffff` |
| `Background.brand-hover` | `{Orange.100}` | `#fee3d9` |
| `Background.brand-pressed` | `{Orange.200}` | `#fdc6b3` |
| `Background.brand-selected` | `{Orange.500}` | `#f97141` |
| `Background.info-default` | `{Blue.100}` | `#d6e0f5` |
| `Background.info-hover` | `{Blue.200}` | `#adc2eb` |
| `Background.info-selected` | `{Blue.500}` | `#3366cc` |
| `Background.success-default` | `{Green.100}` | `#d9fee3` |
| `Background.success-hover` | `{Green.200}` | `#b3fdc6` |
| `Background.success-selected` | `{Green.500}` | `#41f971` |
| `Background.error-default` | `{Red.100}` | `#f9d2d9` |
| `Background.error-hover` | `{Red.200}` | `#f2a4b3` |
| `Background.error-selected` | `{Red.500}` | `#df1c41` |
| `Background.warning-default` | `{Yellow.100}` | `#fcf6cc` |
| `Background.warning-hover` | `{Yellow.200}` | `#f8ed9a` |
| `Background.warning-selected` | `{Yellow.500}` | `#eed202` |

### Border

| Token | Reference | Resolved |
|-------|-----------|----------|
| `Border.primary` | `{Base.black}` | `#000000` |
| `Border.secondary` | `{neutral.600}` | `#4d4d4d` |
| `Border.tertiary` | `{neutral.500}` | `#797979` |
| `Border.divide` | `{neutral.200}` | `#e4e4e4` |
| `Border.disabled` | `{neutral.400}` | `#a6a6a6` |
| `Border.Brand-Default` | `{Orange.500}` | `#f97141` |
| `Border.Brand-Selected` | `{Orange.500}` | `#f97141` |
| `Border.Border-hover` | `{Orange.600}` | `#cd603a` |
| `Border.Info` | `{Blue.500}` | `#3366cc` |
| `Border.Success` | `{Green.500}` | `#41f971` |
| `Border.Warning` | `{Yellow.500}` | `#eed202` |
| `Border.Error` | `{Red.500}` | `#df1c41` |

### Icon

| Token | Reference | Resolved |
|-------|-----------|----------|
| `Icon.primary` | `{Base.black}` | `#000000` |
| `Icon.hover` | `{Base.black}` | `#000000` |
| `Icon.focus` | `{Base.black}` | `#000000` |
| `Icon.selected` | `{Base.white}` | `#ffffff` |
| `Icon.disabled` | `{neutral.400}` | `#a6a6a6` |
| `Icon.Brand-Default` | `{Orange.500}` | `#f97141` |
| `Icon.Brand-hover` | `{Orange.600}` | `#cd603a` |
| `Icon.Info-default` | `{Blue.500}` | `#3366cc` |
| `Icon.Info-hover` | `{Blue.600}` | `#2f58a9` |
| `Icon.Warning-default` | `{Yellow.500}` | `#eed202` |
| `Icon.Warning-hover` | `{Yellow.600}` | `#c4ae08` |
| `Icon.Error-default` | `{Red.500}` | `#df1c41` |
| `Icon.Error-hover` | `{Red.600}` | `#b81c3a` |
| `Icon.Success-default` | `{Green.500}` | `#41f971` |
| `Icon.Success-hover` | `{Green.600}` | `#3acd60` |

### Surface

Light mode: all seven levels resolve to `#ffffff`. Elevation is expressed through shadow, not background colour.

| Token | Resolved |
|-------|----------|
| `Surface.L0` – `Surface.L6` | `#ffffff` |

### Overlay

| Token | Value | Use |
|-------|-------|-----|
| `Overlay.Overlay50` | `#1a1a1a` @ 50% (`#1a1a1a80`) | Modal / drawer scrim |
| `Overlay.Overlayinverse` | `#ffffff` @ 50% (`#ffffff80`) | Inverse scrim |

---

## 3. Semantic colour tokens — dark mode

Applied via `[data-theme="dark"]`. Only tokens that change from light are shown.

### Content

| Token | Dark reference | Dark value | Δ |
|-------|---------------|------------|---|
| `Content.primary` | `{Base.white}` | `#ffffff` | flipped |
| `Content.secondary` | `{neutral.100}` | `#f6f6f6` | lighter |
| `Content.tertiary` | `{neutral.200}` | `#e4e4e4` | lighter |
| `Content.disabled` | `{neutral.500}` | `#797979` | mid-grey |
| `Content.hover` | `{Base.white}` | `#ffffff` | flipped |
| `Content.focus` | `{Base.white}` | `#ffffff` | flipped |
| `Content.selected` | `{Base.black}` | `#000000` | flipped |
| `Content.Brand-hover` | `{Orange.100}` | `#fee3d9` | tint (was 500) |
| `Content.Info-hover` | `{Blue.400}` | `#5c85d6` | lighter step |
| `Content.Info-selected` | `{Base.black}` | `#000000` | flipped |
| `Content.Success-hover` | `{Green.400}` | `#67fa8d` | lighter step |
| `Content.Success-Selected` | `{Base.black}` | `#000000` | flipped |
| `Content.Error-hover` | `{Red.400}` | `#e54967` | lighter step |
| `Content.Error-Selected` | `{Base.black}` | `#000000` | flipped |
| `Content.Warning-hover` | `{Yellow.400}` | `#f1db35` | lighter step |
| `Content.Warning-Selected` | `{Base.black}` | `#000000` | flipped |

### Background

| Token | Dark reference | Dark value | Δ |
|-------|---------------|------------|---|
| `Background.primary` | `{Base.black}` | `#000000` | flipped |
| `Background.secondary` | `{neutral.700}` | `#1a1a1a` | darkened |
| `Background.tertiary` | `{neutral.600}` | `#4d4d4d` | darkened |
| `Background.hover` | `{neutral.500}` | `#797979` | darkened |
| `Background.pressed` | `{neutral.500}` | `#797979` | darkened |
| `Background.selected` | `{neutral.200}` | `#e4e4e4` | flipped (light on dark) |
| `Background.disabled` | `{neutral.300}` | `#d2d2d2` | changed |
| `Background.brand-default` | `{Base.black}` | `#000000` | darkened |
| `Background.brand-hover` | `{Orange.600}` | `#cd603a` | deeper (was 100) |
| `Background.brand-pressed` | `{Orange.700}` | `#a15033` | deeper (was 200) |
| `Background.info-default` | `{Blue.700}` | `#2b4986` | dark shade (was 100) |
| `Background.info-hover` | `{Blue.600}` | `#2f58a9` | dark shade (was 200) |
| `Background.success-default` | `{Green.700}` | `#279544` | dark shade (was 100) |
| `Background.success-hover` | `{Green.600}` | `#3acd60` | dark shade (was 200) |
| `Background.error-default` | `{Red.700}` | `#921d33` | dark shade (was 100) |
| `Background.error-hover` | `{Red.600}` | `#b81c3a` | dark shade (was 200) |
| `Background.warning-default` | `{Yellow.700}` | `#9b8a0d` | dark shade (was 100) |
| `Background.warning-hover` | `{Yellow.600}` | `#c4ae08` | dark shade (was 200) |

### Border (dark mode — notable: primary/secondary/tertiary/divide ALL flip to white)

| Token | Dark reference | Dark value |
|-------|---------------|------------|
| `Border.primary` | `{Base.white}` | `#ffffff` |
| `Border.secondary` | `{Base.white}` | `#ffffff` |
| `Border.tertiary` | `{Base.white}` | `#ffffff` |
| `Border.divide` | `{Base.white}` | `#ffffff` |
| `Border.disabled` | `{neutral.300}` | `#d2d2d2` |
| `Border.Border-hover` | `{Orange.700}` | `#a15033` |

### Icon (dark mode)

| Token | Dark reference | Dark value |
|-------|---------------|------------|
| `Icon.primary` | `{Base.white}` | `#ffffff` |
| `Icon.hover` | `{Base.white}` | `#ffffff` |
| `Icon.focus` | `{Base.white}` | `#ffffff` |
| `Icon.selected` | `{Base.black}` | `#000000` |
| `Icon.disabled` | `{neutral.600}` | `#4d4d4d` |

### Surface (dark mode — elevation via background)

| Token | Dark reference | Dark value |
|-------|---------------|------------|
| `Surface.L0` | `{neutral.600}` | `#4d4d4d` |
| `Surface.L1` | `{neutral.600}` | `#4d4d4d` |
| `Surface.L2` | `{neutral.600}` | `#4d4d4d` |
| `Surface.L3` | `{neutral.600}` | `#4d4d4d` |
| `Surface.L4` | `{neutral.600}` | `#4d4d4d` |
| `Surface.L5` | `{neutral.500}` | `#797979` |
| `Surface.L6` | `{neutral.400}` | `#a6a6a6` |

### Overlay (dark mode — inverted)

| Token | Dark value |
|-------|------------|
| `Overlay.Overlay50` | `#ffffff80` |
| `Overlay.Overlayinverse` | `#1a1a1a80` |

---

## 4. Typography primitives

**Font family:** `Outfit` — single family for all roles and breakpoints.

### Weights

| Token | CSS value |
|-------|-----------|
| `weight.Regular` | 400 |
| `weight.medium` | 500 |
| `weight.semibold` | 600 |
| `weight.bold` | 700 |

### Letter spacing

| Token | Value | Use |
|-------|-------|-----|
| `letter-spacing.neg1` | −1px | Large headings (5XL–XL on desktop) |
| `letter-spacing.neg05` | −0.5px | Heading.L, medium body text (XL–M) |
| `letter-spacing.none` | 0px | All regular text and small labels |

### Size primitives (from `Unit.*`)

`10, 12, 14, 16, 18, 20, 24, 28, 32, 40, 48, 56, 64, 72 px`

### Line-height primitives (from `Unit.*`)

`14, 16, 18, 20, 24, 28, 32, 40, 48, 56, 64, 72, 80, 88 px`

---

## 5. Responsive type scale

Font family: `Outfit` across all breakpoints.

### Breakpoints

| Token | Activates at |
|-------|-------------|
| `Breakpoint.Large-Desktop` | ≥ 1440px |
| `Breakpoint.Desktop` | ≥ 1024px |
| `Breakpoint.Tablet` | ≥ 768px |
| `Breakpoint.Mobile` | ≤ 393px |

---

### Heading scale

#### Desktop & Large Desktop (≥ 1024px) — identical

| Style | Weight | Size | Line height | Letter spacing |
|-------|--------|------|-------------|----------------|
| `Heading.5XL` | Bold 700 | 72px | 80px | −1px |
| `Heading.4XL` | Bold 700 | 64px | 72px | −1px |
| `Heading.3XL` | Bold 700 | 56px | 64px | −1px |
| `Heading.2XL` | Bold 700 | 48px | 56px | −1px |
| `Heading.XL` | Bold 700 | 40px | 48px | −1px |
| `Heading.L` | Semibold 600 | 32px | 40px | −0.5px |
| `Heading.M` | Semibold 600 | 28px | 32px | −1px |
| `Heading.S` | Semibold 600 | 24px | 28px | −1px |

#### Tablet & Mobile (< 1024px) — identical

Weight steps down; upper sizes reduce by one step.

| Style | Weight | Size | Line height | Letter spacing | Δ vs Desktop |
|-------|--------|------|-------------|----------------|-------------|
| `Heading.5XL` | Semibold 600 | 64px | 72px | −1px | −8px, Bold→Semibold |
| `Heading.4XL` | Semibold 600 | 56px | 64px | −1px | −8px, Bold→Semibold |
| `Heading.3XL` | Semibold 600 | 48px | 56px | −1px | −8px, Bold→Semibold |
| `Heading.2XL` | Semibold 600 | 40px | 48px | −1px | −8px, Bold→Semibold |
| `Heading.XL` | Semibold 600 | 32px | 40px | −1px | −8px, Bold→Semibold |
| `Heading.L` | Medium 500 | 28px | 32px | −0.5px | Semibold→Medium |
| `Heading.M` | Medium 500 | 24px | 28px | −1px | Semibold→Medium |
| `Heading.S` | Medium 500 | 20px | 24px | −1px | −4px, Semibold→Medium |

> **Key insight:** The single heading breakpoint is at **1024px** (Desktop → Tablet). There is no separate change at 1440px — Large Desktop and Desktop are byte-for-byte identical.

---

### Text scale — constant across all breakpoints

#### Regular (400)

| Style | Size | Line height | Letter spacing |
|-------|------|-------------|----------------|
| `Text.Regular.XL` | 20px | 28px | 0px |
| `Text.Regular.L` | 16px | 24px | 0px |
| `Text.Regular.M` | 14px | 20px | 0px |
| `Text.Regular.S` | 12px | 16px | 0px |
| `Text.Regular.XS` | 10px | 14px | 0px |

#### Medium (500)

| Style | Size | Line height | Letter spacing |
|-------|------|-------------|----------------|
| `Text.Medium.XL` | 20px | 28px | −0.5px |
| `Text.Medium.L` | 16px | 24px | −0.5px |
| `Text.Medium.M` | 14px | 20px | −0.5px |
| `Text.Medium.S` | 12px | 16px | 0px |
| `Text.Medium.XS` | 10px | 14px | 0px |

> **Note:** `Text.Medium.XL` letter-spacing on Mobile is `−1px` (not `−0.5px`). `Text.Medium.XS` on Desktop is `−0.5px`; on all others it is `0px`. All other text values are identical across all four breakpoints.

---

## 6. Spacing scale

Scope: `GAP` (autolayout gap; also usable for padding and margin).

| Token | Value | CSS var |
|-------|-------|---------|
| `Space.None` | 0px | `--space-none` |
| `Space.2XS` | 2px | `--space-2xs` |
| `Space.XS` | 4px | `--space-xs` |
| `Space.S` | 8px | `--space-s` |
| `Space.M` | 12px | `--space-m` |
| `Space.L` | 16px | `--space-l` |
| `Space.XL` | 24px | `--space-xl` |
| `Space.2XL` | 32px | `--space-2xl` |
| `Space.3XL` | 40px | `--space-3xl` |
| `Space.4XL` | 48px | `--space-4xl` |
| `Space.5XL` | 56px | `--space-5xl` |
| `Space.6XL` | 64px | `--space-6xl` |
| `Space.7XL` | 72px | `--space-7xl` |
| `Space.8XL` | 80px | `--space-8xl` |
| `Space.9XL` | 88px | `--space-9xl` |
| `Space.10XL` | 96px | `--space-10xl` |
| `Space.11XL` | 104px | `--space-11xl` |
| `Space.12XL` | 112px | `--space-12xl` |

---

## 7. Border tokens

### Radius

| Token | Value | Use |
|-------|-------|-----|
| `Radius.none` | 0px | Sharp corners |
| `Radius.XS` | 4px | Small tags, badges |
| `Radius.S` | 8px | Inputs, small cards |
| `Radius.M` | 12px | Cards, dropdowns |
| `Radius.L` | 16px | Large cards, modals |
| `Radius.Circle` | 50px | Avatars, round buttons |
| `Radius.Pill` | 999px | Pill badges, full-radius |

### Stroke width

| Token | Value | Use |
|-------|-------|-----|
| `Width.XS` | 1px | Default border |
| `Width.S` | 1.5px | Subtle emphasis |
| `Width.M` | 2px | Focus / active state |
| `Width.L` | 4px | Strong accent |
| `Width.XL` | 8px | Bold graphic |

---

## 8. Layout & breakpoints

### Breakpoints

| Token | Value |
|-------|-------|
| `Breakpoint.Mobile` | 393px |
| `Breakpoint.Tablet` | 768px |
| `Breakpoint.Desktop` | 1024px |
| `Breakpoint.Large-Desktop` | 1440px |

### Unit scale (base numeric reference)

`2, 4, 8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 40, 48, 56, 64, 72, 80, 88, 96, 104, 112, 120`

---

## 9. Component tokens

Defined in the `theme` key of `design-tokens.json`.

### Button — primary

| Token | Reference | Resolved |
|-------|-----------|----------|
| `button.primary.background` | `{accent.default}` → `Background.brand-selected` | `#f97141` |
| `button.primary.text` | `{accent.onAccent}` → `Content.selected` | `#ffffff` |
| `button.borderRadius` | `{borderRadius.lg}` → `Radius.L` | `16px` |
| `button.borderWidth` | `{dimension.sm}` → `Width.XS` | `1px` |

### Card

| Token | Reference | Resolved |
|-------|-----------|----------|
| `card.borderRadius` | `{borderRadius.lg}` → `Radius.L` | `16px` |
| `card.background` | `{bg.default}` → `Background.primary` | `#ffffff` |
| `card.padding` | `{dimension.md}` → `Space.L` | `16px` |

### Box shadow

```css
/* theme.boxShadow.default */
box-shadow:
  5px 5px 5px 3px rgba(0, 0, 0, 0.15),      /* drop */
  inset 4px 4px 5px 6px rgba(0, 0, 0, 0.20); /* inner */
```

### Typography composites

| Token | Family | Weight | Size ref | Letter spacing |
|-------|--------|--------|----------|----------------|
| `typography.H1.Bold` | Outfit | 700 | `{fontSizes.h1}` | −1px |
| `typography.H1.Regular` | Outfit | 400 | `{fontSizes.h1}` | −1px |
| `typography.H2.Bold` | Outfit | 700 | `{fontSizes.h2}` | −1px |
| `typography.H2.Regular` | Outfit | 400 | `{fontSizes.h2}` | −1px |
| `typography.Body` | Outfit | 400 | `{fontSizes.body}` | — |

---

## 10. Dark mode CSS

### Strategy

Set `data-theme="dark"` on `<html>`. All semantics are redeclared as CSS custom properties under that selector. Zero component code changes required.

```html
<html>                   <!-- light (default) -->
<html data-theme="dark"> <!-- dark -->
```

### Full CSS output

```css
/* ── Light (default) ─────────────────────────────── */
:root {
  /* Content */
  --content-primary:           #000000;
  --content-secondary:         #4d4d4d;
  --content-tertiary:          #797979;
  --content-disabled:          #f6f6f6;
  --content-hover:             #000000;
  --content-focus:             #000000;
  --content-selected:          #ffffff;
  --content-brand-default:     #f97141;
  --content-brand-hover:       #f97141;
  --content-brand-selected:    #ffffff;
  --content-info-default:      #3366cc;
  --content-info-hover:        #2f58a9;
  --content-info-selected:     #ffffff;
  --content-success-default:   #41f971;
  --content-success-hover:     #3acd60;
  --content-success-selected:  #ffffff;
  --content-error-default:     #df1c41;
  --content-error-hover:       #b81c3a;
  --content-error-selected:    #ffffff;
  --content-warning-default:   #eed202;
  --content-warning-hover:     #c4ae08;
  --content-warning-selected:  #ffffff;

  /* Background */
  --bg-primary:                #ffffff;
  --bg-secondary:              #e4e4e4;
  --bg-tertiary:               #d2d2d2;
  --bg-hover:                  #e4e4e4;
  --bg-pressed:                #e4e4e4;
  --bg-selected:               #1a1a1a;
  --bg-disabled:               #f6f6f6;
  --bg-brand-default:          #ffffff;
  --bg-brand-hover:            #fee3d9;
  --bg-brand-pressed:          #fdc6b3;
  --bg-brand-selected:         #f97141;
  --bg-info-default:           #d6e0f5;
  --bg-info-hover:             #adc2eb;
  --bg-info-selected:          #3366cc;
  --bg-success-default:        #d9fee3;
  --bg-success-hover:          #b3fdc6;
  --bg-success-selected:       #41f971;
  --bg-error-default:          #f9d2d9;
  --bg-error-hover:            #f2a4b3;
  --bg-error-selected:         #df1c41;
  --bg-warning-default:        #fcf6cc;
  --bg-warning-hover:          #f8ed9a;
  --bg-warning-selected:       #eed202;

  /* Border */
  --border-primary:            #000000;
  --border-secondary:          #4d4d4d;
  --border-tertiary:           #797979;
  --border-divide:             #e4e4e4;
  --border-disabled:           #a6a6a6;
  --border-brand-default:      #f97141;
  --border-brand-selected:     #f97141;
  --border-hover:              #cd603a;
  --border-info:               #3366cc;
  --border-success:            #41f971;
  --border-warning:            #eed202;
  --border-error:              #df1c41;

  /* Icon */
  --icon-primary:              #000000;
  --icon-hover:                #000000;
  --icon-focus:                #000000;
  --icon-selected:             #ffffff;
  --icon-disabled:             #a6a6a6;
  --icon-brand-default:        #f97141;
  --icon-brand-hover:          #cd603a;
  --icon-info-default:         #3366cc;
  --icon-info-hover:           #2f58a9;
  --icon-warning-default:      #eed202;
  --icon-warning-hover:        #c4ae08;
  --icon-error-default:        #df1c41;
  --icon-error-hover:          #b81c3a;
  --icon-success-default:      #41f971;
  --icon-success-hover:        #3acd60;

  /* Surface */
  --surface-l0: #ffffff;  --surface-l1: #ffffff;  --surface-l2: #ffffff;
  --surface-l3: #ffffff;  --surface-l4: #ffffff;  --surface-l5: #ffffff;
  --surface-l6: #ffffff;

  /* Overlay */
  --overlay-50:                #1a1a1a80;
  --overlay-inverse:           #ffffff80;

  /* Spacing */
  --space-none: 0px;   --space-2xs: 2px;   --space-xs:  4px;
  --space-s:    8px;   --space-m:  12px;   --space-l:  16px;
  --space-xl:  24px;   --space-2xl:32px;   --space-3xl:40px;
  --space-4xl: 48px;   --space-5xl:56px;   --space-6xl:64px;
  --space-7xl: 72px;   --space-8xl:80px;   --space-9xl:88px;
  --space-10xl:96px;   --space-11xl:104px; --space-12xl:112px;

  /* Border radius */
  --radius-none:    0px;  --radius-xs:     4px;
  --radius-s:       8px;  --radius-m:     12px;
  --radius-l:      16px;  --radius-circle:50px;
  --radius-pill:  999px;

  /* Stroke width */
  --width-xs: 1px;  --width-s: 1.5px;  --width-m: 2px;
  --width-l:  4px;  --width-xl: 8px;
}

/* ── Dark mode ────────────────────────────────────── */
[data-theme="dark"] {
  --content-primary:           #ffffff;
  --content-secondary:         #f6f6f6;
  --content-tertiary:          #e4e4e4;
  --content-disabled:          #797979;
  --content-hover:             #ffffff;
  --content-focus:             #ffffff;
  --content-selected:          #000000;
  --content-brand-hover:       #fee3d9;
  --content-info-hover:        #5c85d6;
  --content-info-selected:     #000000;
  --content-success-hover:     #67fa8d;
  --content-success-selected:  #000000;
  --content-error-hover:       #e54967;
  --content-error-selected:    #000000;
  --content-warning-hover:     #f1db35;
  --content-warning-selected:  #000000;

  --bg-primary:                #000000;
  --bg-secondary:              #1a1a1a;
  --bg-tertiary:               #4d4d4d;
  --bg-hover:                  #797979;
  --bg-pressed:                #797979;
  --bg-selected:               #e4e4e4;
  --bg-disabled:               #d2d2d2;
  --bg-brand-default:          #000000;
  --bg-brand-hover:            #cd603a;
  --bg-brand-pressed:          #a15033;
  --bg-info-default:           #2b4986;
  --bg-info-hover:             #2f58a9;
  --bg-success-default:        #279544;
  --bg-success-hover:          #3acd60;
  --bg-error-default:          #921d33;
  --bg-error-hover:            #b81c3a;
  --bg-warning-default:        #9b8a0d;
  --bg-warning-hover:          #c4ae08;

  --border-primary:            #ffffff;
  --border-secondary:          #ffffff;
  --border-tertiary:           #ffffff;
  --border-divide:             #ffffff;
  --border-disabled:           #d2d2d2;
  --border-hover:              #a15033;

  --icon-primary:              #ffffff;
  --icon-hover:                #ffffff;
  --icon-focus:                #ffffff;
  --icon-selected:             #000000;
  --icon-disabled:             #4d4d4d;

  --surface-l0: #4d4d4d;  --surface-l1: #4d4d4d;  --surface-l2: #4d4d4d;
  --surface-l3: #4d4d4d;  --surface-l4: #4d4d4d;  --surface-l5: #797979;
  --surface-l6: #a6a6a6;

  --overlay-50:                #ffffff80;
  --overlay-inverse:           #1a1a1a80;
}

/* ── Responsive headings ──────────────────────────── */
/* Desktop / Large Desktop (≥ 1024px) */
.heading-5xl { font-family: 'Outfit', sans-serif; font-weight: 700; font-size: 72px; line-height: 80px; letter-spacing: -1px; }
.heading-4xl { font-family: 'Outfit', sans-serif; font-weight: 700; font-size: 64px; line-height: 72px; letter-spacing: -1px; }
.heading-3xl { font-family: 'Outfit', sans-serif; font-weight: 700; font-size: 56px; line-height: 64px; letter-spacing: -1px; }
.heading-2xl { font-family: 'Outfit', sans-serif; font-weight: 700; font-size: 48px; line-height: 56px; letter-spacing: -1px; }
.heading-xl  { font-family: 'Outfit', sans-serif; font-weight: 700; font-size: 40px; line-height: 48px; letter-spacing: -1px; }
.heading-l   { font-family: 'Outfit', sans-serif; font-weight: 600; font-size: 32px; line-height: 40px; letter-spacing: -0.5px; }
.heading-m   { font-family: 'Outfit', sans-serif; font-weight: 600; font-size: 28px; line-height: 32px; letter-spacing: -1px; }
.heading-s   { font-family: 'Outfit', sans-serif; font-weight: 600; font-size: 24px; line-height: 28px; letter-spacing: -1px; }

/* Tablet / Mobile (< 1024px) */
@media (max-width: 1023px) {
  .heading-5xl { font-weight: 600; font-size: 64px; line-height: 72px; }
  .heading-4xl { font-weight: 600; font-size: 56px; line-height: 64px; }
  .heading-3xl { font-weight: 600; font-size: 48px; line-height: 56px; }
  .heading-2xl { font-weight: 600; font-size: 40px; line-height: 48px; }
  .heading-xl  { font-weight: 600; font-size: 32px; line-height: 40px; }
  .heading-l   { font-weight: 500; font-size: 28px; line-height: 32px; }
  .heading-m   { font-weight: 500; font-size: 24px; line-height: 28px; }
  .heading-s   { font-weight: 500; font-size: 20px; line-height: 24px; }
}

/* Body text — constant across all breakpoints */
.text-regular-xl { font-family: 'Outfit', sans-serif; font-weight: 400; font-size: 20px; line-height: 28px; letter-spacing: 0; }
.text-regular-l  { font-family: 'Outfit', sans-serif; font-weight: 400; font-size: 16px; line-height: 24px; letter-spacing: 0; }
.text-regular-m  { font-family: 'Outfit', sans-serif; font-weight: 400; font-size: 14px; line-height: 20px; letter-spacing: 0; }
.text-regular-s  { font-family: 'Outfit', sans-serif; font-weight: 400; font-size: 12px; line-height: 16px; letter-spacing: 0; }
.text-regular-xs { font-family: 'Outfit', sans-serif; font-weight: 400; font-size: 10px; line-height: 14px; letter-spacing: 0; }
.text-medium-xl  { font-family: 'Outfit', sans-serif; font-weight: 500; font-size: 20px; line-height: 28px; letter-spacing: -0.5px; }
.text-medium-l   { font-family: 'Outfit', sans-serif; font-weight: 500; font-size: 16px; line-height: 24px; letter-spacing: -0.5px; }
.text-medium-m   { font-family: 'Outfit', sans-serif; font-weight: 500; font-size: 14px; line-height: 20px; letter-spacing: -0.5px; }
.text-medium-s   { font-family: 'Outfit', sans-serif; font-weight: 500; font-size: 12px; line-height: 16px; letter-spacing: 0; }
.text-medium-xs  { font-family: 'Outfit', sans-serif; font-weight: 500; font-size: 10px; line-height: 14px; letter-spacing: 0; }
```

---

## 11. Where to place this file

### Project structure

```
your-project/
├── tokens/
│   └── design-tokens.json          ← your Tokens Studio source (keep here)
├── styles/
│   ├── tokens.css                  ← generated CSS (from Style Dictionary or manual)
│   └── tokens.dark.css             ← dark mode overrides (or inline in tokens.css)
├── docs/
│   └── DESIGN.md                   ← THIS FILE — lives here
├── src/
│   └── ...
└── package.json
```

### For Storybook

```
.storybook/
├── DESIGN.md   ← also acceptable; Storybook can reference it in docs
```

### For a monorepo / design system package

```
packages/design-system/
├── tokens/
│   └── design-tokens.json
├── src/
├── docs/
│   └── DESIGN.md                   ← here
└── README.md                       ← link to DESIGN.md from here
```

**Rule:** Keep `DESIGN.md` co-located with `design-tokens.json`. They should always move together.

---

## 12. How to use it

### Option A — Style Dictionary (recommended)

Install and configure Style Dictionary to read `design-tokens.json` and output the CSS block from Section 10.

```bash
npm install style-dictionary --save-dev
```

```js
// style-dictionary.config.js
export default {
  source: ['tokens/design-tokens.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'styles/',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
          options: { selector: ':root' },
          // filter to light semantic tokens only
        },
        {
          destination: 'tokens.dark.css',
          format: 'css/variables',
          options: { selector: '[data-theme="dark"]' },
          // filter to dark semantic tokens only
        }
      ]
    }
  }
};
```

```bash
npx style-dictionary build
```

Import in your app root:

```ts
// main.ts / _app.tsx / layout.tsx
import '../styles/tokens.css';
import '../styles/tokens.dark.css';
```

---

### Option B — Tokens Studio + GitHub Actions (automatic)

1. In Figma → Tokens Studio → Sync → push to GitHub on every publish
2. GitHub Action runs Style Dictionary on push to `main`:

```yaml
# .github/workflows/tokens.yml
name: Build tokens
on:
  push:
    paths: ['tokens/design-tokens.json']
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - run: npx style-dictionary build
      - uses: stefanzweifel/git-auto-commit-action@v5
        with:
          commit_message: 'chore: build tokens'
          file_pattern: 'styles/*.css'
```

---

### Option C — Direct paste (no build step)

Copy the full CSS block from Section 10 directly into your global stylesheet. Update it manually whenever `design-tokens.json` changes.

```html
<!-- index.html -->
<link rel="stylesheet" href="tokens.css" />
```

---

### Consuming tokens in components

```tsx
// React + CSS modules
const Button = () => (
  <button
    style={{
      background: 'var(--bg-brand-selected)',   // #f97141
      color: 'var(--content-selected)',           // #ffffff
      borderRadius: 'var(--radius-l)',            // 16px
      padding: `var(--space-m) var(--space-xl)`, // 12px 24px
    }}
  >
    Primary
  </button>
);
```

```css
/* Plain CSS */
.card {
  background:    var(--bg-primary);
  border-radius: var(--radius-l);
  padding:       var(--space-xl);
  border:        var(--width-xs) solid var(--border-divide);
}
```

```ts
// Tailwind — extend config from JS token output
// tailwind.config.ts
import tokens from './tokens/design-tokens.json';

export default {
  theme: {
    extend: {
      colors: {
        'brand':     '#f97141', // Orange.500
        'brand-600': '#cd603a',
      },
      borderRadius: {
        'l':    '16px',
        'pill': '999px',
      },
      spacing: {
        'space-l':  '16px',
        'space-xl': '24px',
      },
    },
  },
};
```

---

### Dark mode toggle (JavaScript)

```ts
// theme.ts
type Theme = 'light' | 'dark' | 'system';

export function applyTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === 'dark') {
    root.setAttribute('data-theme', 'dark');
  } else if (theme === 'light') {
    root.removeAttribute('data-theme');
  } else {
    // system
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    prefersDark
      ? root.setAttribute('data-theme', 'dark')
      : root.removeAttribute('data-theme');
  }
  localStorage.setItem('theme', theme);
}

export function initTheme() {
  const saved = localStorage.getItem('theme') as Theme | null;
  applyTheme(saved ?? 'system');
}
```

---

### Updating the design system

When a designer publishes a new token set from Figma:

1. Tokens Studio pushes updated `design-tokens.json` to the repo
2. Run `npx style-dictionary build` (or GitHub Action does it automatically)
3. The CSS files regenerate — no component changes needed
4. Update `DESIGN.md` last-updated date at the bottom

---

*Source: `design-tokens.json` (merged Tokens Studio export)*
*Token sets: `theme` · `Primitives-colors/Mode 1` · `Semantic-colors/Light` · `Semantic-colors/Dark` · `Primitive - Type/Mode 1` · `Semantic - Type/*` · `Borders/Mode 1` · `Space/Mode 1` · `Layout/Mode 1` · `Unit/Mode 1`*
*Last updated: June 2026*