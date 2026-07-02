# Packt Design System — Token Pipeline Rules

This documents how tokens flow from Figma to CSS, what's auto-generated, what's manual, and how to avoid the issues found in the audit.

---

## Pipeline overview

```
Figma Variables
      ↓  (Tokens Studio plugin export)
tokens/design-tokens.json    ← source of truth, commit this
      ↓  (npm run tokens)
src/tokens/tokens.css        ← auto-generated, DO NOT EDIT
src/tokens/tokens.dark.css   ← auto-generated, DO NOT EDIT
      ↓  (manual layer)
src/components/tokens.helpers.css   ← manual patches only
src/tokens/tokens.theme.css         ← theme-aware aliases (manual, see below)
```

**Rule: never hand-edit `tokens.css` or `tokens.dark.css`.** They are build artifacts. Any edit will be overwritten the next time `npm run tokens` runs. If you need to patch a value, fix it in `design-tokens.json` or add it to `tokens.helpers.css`.

---

## Exporting from Figma correctly

1. Install **Tokens Studio for Figma** (free plugin)
2. In the plugin, sync your Figma Variables to a token set
3. Export as **W3C Design Tokens** format (`.json`) to `tokens/design-tokens.json`
4. Run `npm run tokens` to regenerate CSS

### What to check before exporting

| Figma variable type | Must be set to | Why |
|---|---|---|
| Border radius | `$type: "dimension"` | So Style Dictionary adds `px` |
| Spacing | `$type: "dimension"` | Same |
| Font size | `$type: "dimension"` | Same |
| Font weight | `$type: "fontWeight"` | So SD maps `"Bold"` → `700` |
| Border width | `$type: "dimension"` | Same |
| Color | `$type: "color"` | SD outputs hex |
| Line height | `$type: "dimension"` | Same |

If a token comes through as the wrong type, fix the `$type` in `design-tokens.json` before running the build — don't patch in CSS.

---

## Naming rules — set in Figma, enforced here

Token names become CSS variable names. A mistake in Figma naming creates a bug in CSS that propagates everywhere.

**Rules:**
- No repeated path segments — `border / hover` not `border / border-hover` (produces `--packt-border-border-hover`)
- Use kebab-case only — no spaces, no camelCase, no underscores
- Semantic tokens follow: `{category}-{role}-{state}` — e.g. `background-brand-hover`, `content-error-default`
- Palette tokens follow: `{color}-{step}` — e.g. `orange-500`, `neutral-700`
- Never name a token after a specific component — `button-background` belongs in the component CSS, not in tokens

**Before exporting, check for:**
- Any token where a path segment repeats its parent (the `border-hover` problem)
- Any token that references a component name
- Any spelling difference between light and dark counterparts (they must match exactly except for `light`/`dark` in the path)

---

## The `tokens.theme.css` file — theme-aware aliases

This file is the bridge that makes dark mode work without a `theme` prop. It is **manually maintained** and must be updated whenever a new semantic token is added.

### Structure

```css
/* src/tokens/tokens.theme.css */

:root {
  /* Maps alias → light semantic token by default */
  --packt-bg-primary:            var(--packt-semantic-colors-light-background-primary);
  --packt-bg-secondary:          var(--packt-semantic-colors-light-background-secondary);
  --packt-bg-brand-default:      var(--packt-semantic-colors-light-background-brand-default);
  --packt-bg-brand-hover:        var(--packt-semantic-colors-light-background-brand-hover);
  --packt-bg-brand-pressed:      var(--packt-semantic-colors-light-background-brand-pressed);
  --packt-bg-brand-selected:     var(--packt-semantic-colors-light-background-brand-selected);
  --packt-bg-disabled:           var(--packt-semantic-colors-light-background-disabled);
  --packt-bg-error-default:      var(--packt-semantic-colors-light-background-error-default);
  --packt-bg-error-hover:        var(--packt-semantic-colors-light-background-error-hover);
  --packt-bg-error-selected:     var(--packt-semantic-colors-light-background-error-selected);

  --packt-content-primary:       var(--packt-semantic-colors-light-content-primary);
  --packt-content-secondary:     var(--packt-semantic-colors-light-content-secondary);
  --packt-content-tertiary:      var(--packt-semantic-colors-light-content-tertiary);
  --packt-content-disabled:      var(--packt-semantic-colors-light-content-disabled);
  --packt-content-brand-default: var(--packt-semantic-colors-light-content-brand-default);
  --packt-content-brand-selected:var(--packt-semantic-colors-light-content-brand-selected);
  --packt-content-error-default: var(--packt-semantic-colors-light-content-error-default);
  --packt-content-error-selected:var(--packt-semantic-colors-light-content-error-selected);

  --packt-border-primary:        var(--packt-semantic-colors-light-border-primary);
  --packt-border-secondary:      var(--packt-semantic-colors-light-border-secondary);
  --packt-border-tertiary:       var(--packt-semantic-colors-light-border-tertiary);
  --packt-border-disabled:       var(--packt-semantic-colors-light-border-disabled);
  --packt-border-brand-default:  var(--packt-semantic-colors-light-border-brand-default);
  --packt-border-error:          var(--packt-semantic-colors-light-border-error);
  --packt-border-divide:         var(--packt-semantic-colors-light-border-divide);

  --packt-icon-primary:          var(--packt-semantic-colors-light-icon-primary);
  --packt-icon-disabled:         var(--packt-semantic-colors-light-icon-disabled);
  --packt-icon-brand-default:    var(--packt-semantic-colors-light-icon-brand-default);
  --packt-icon-brand-hover:      var(--packt-semantic-colors-light-icon-brand-hover);
  --packt-icon-error-default:    var(--packt-semantic-colors-light-icon-error-default);
}

[data-theme="dark"],
.dark {
  /* Remaps aliases → dark semantic tokens */
  --packt-bg-primary:            var(--packt-semantic-colors-dark-background-primary);
  --packt-bg-secondary:          var(--packt-semantic-colors-dark-background-secondary);
  --packt-bg-brand-default:      var(--packt-semantic-colors-dark-background-brand-default);
  --packt-bg-brand-hover:        var(--packt-semantic-colors-dark-background-brand-hover);
  --packt-bg-brand-pressed:      var(--packt-semantic-colors-dark-background-brand-pressed);
  --packt-bg-brand-selected:     var(--packt-semantic-colors-dark-background-brand-selected);
  --packt-bg-disabled:           var(--packt-semantic-colors-dark-background-disabled);
  --packt-bg-error-default:      var(--packt-semantic-colors-dark-background-error-default);
  --packt-bg-error-hover:        var(--packt-semantic-colors-dark-background-error-hover);
  --packt-bg-error-selected:     var(--packt-semantic-colors-dark-background-error-selected);

  --packt-content-primary:       var(--packt-semantic-colors-dark-content-primary);
  --packt-content-secondary:     var(--packt-semantic-colors-dark-content-secondary);
  --packt-content-tertiary:      var(--packt-semantic-colors-dark-content-tertiary);
  --packt-content-disabled:      var(--packt-semantic-colors-dark-content-disabled);
  --packt-content-brand-default: var(--packt-semantic-colors-dark-content-brand-default);
  --packt-content-brand-selected:var(--packt-semantic-colors-dark-content-brand-selected);
  --packt-content-error-default: var(--packt-semantic-colors-dark-content-error-default);
  --packt-content-error-selected:var(--packt-semantic-colors-dark-content-error-selected);

  --packt-border-primary:        var(--packt-semantic-colors-dark-border-primary);
  --packt-border-secondary:      var(--packt-semantic-colors-dark-border-secondary);
  --packt-border-tertiary:       var(--packt-semantic-colors-dark-border-tertiary);
  --packt-border-disabled:       var(--packt-semantic-colors-dark-border-disabled);
  --packt-border-brand-default:  var(--packt-semantic-colors-dark-border-brand-default);
  --packt-border-error:          var(--packt-semantic-colors-dark-border-error);
  --packt-border-divide:         var(--packt-semantic-colors-dark-border-divide);

  --packt-icon-primary:          var(--packt-semantic-colors-dark-icon-primary);
  --packt-icon-disabled:         var(--packt-semantic-colors-dark-icon-disabled);
  --packt-icon-brand-default:    var(--packt-semantic-colors-dark-icon-brand-default);
  --packt-icon-brand-hover:      var(--packt-semantic-colors-dark-icon-brand-hover);
  --packt-icon-error-default:    var(--packt-semantic-colors-dark-icon-error-default);
}
```

### When you add a new semantic token

1. Add it to `design-tokens.json` in Figma and export
2. Run `npm run tokens` — it appears in `tokens.css` and `tokens.dark.css`
3. **Add the alias to `tokens.theme.css`** — both the `:root` (light) and `[data-theme="dark"]` (dark) blocks
4. Use the alias (`--packt-bg-*`, `--packt-content-*`) in your component CSS

If you skip step 3, the new token won't be dark-mode aware.

---

## What belongs where

| File | Auto-generated? | Edit it? | Purpose |
|---|---|---|---|
| `tokens/design-tokens.json` | No — from Figma | Yes, in Figma | Source of truth |
| `src/tokens/tokens.css` | ✅ Yes | ❌ Never | All primitive + semantic light vars |
| `src/tokens/tokens.dark.css` | ✅ Yes | ❌ Never | Semantic dark vars |
| `src/tokens/tokens.theme.css` | ❌ No | ✅ Yes (carefully) | Theme-aware aliases used by components |
| `src/components/tokens.helpers.css` | ❌ No | ✅ Yes | Numeric weight aliases, focus ring — SD gaps |

---

## Running the pipeline

```bash
# After every Figma export:
npm run tokens

# Then verify:
# 1. No new double-prefix variable names (grep for '--packt-*-*-' patterns with repetition)
# 2. Dimension values have calc(... * 1px) — or upgrade SD to emit units directly
# 3. tokens.theme.css updated if new semantic tokens were added
```

---

## Checklist before running `npm run tokens`

- [ ] Token names follow `{category}-{role}-{state}` with no repeated segments
- [ ] All dimension tokens have `$type: "dimension"` in the JSON
- [ ] All font weight tokens have `$type: "fontWeight"`
- [ ] Light and dark counterparts have matching names (only `light`/`dark` differs in the path)
- [ ] No component-specific names in the token JSON (e.g. `button-background`)
- [ ] Any new semantic tokens are noted — you'll need to add them to `tokens.theme.css` after build
