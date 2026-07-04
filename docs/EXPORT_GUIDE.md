# Export Guide — Figma to Published Storybook

Documents the full path a token or component change takes from Figma to the live Storybook.  
For the token pipeline internals (what the generated CSS files mean, how to hand-maintain `tokens.theme.css`), see `TOKEN-PIPELINE.md`.  
For the design principles and why these rules exist, see `design-system-spec/design-principles/PRINCIPLES.md`.

---

## Pre-export checklist

Run through this before hitting **Push** in Tokens Studio. The CI pipeline has no review gate — once you push, the change goes live. These checks are the only quality control that happens before publish.

### 1. Variable naming

- Component names: singular noun, no version suffix — `Button` not `Buttons`, not `Button v2`
- Slash grouping for categories: `Forms/Input`, `Overlay/Modal`
- Variant properties must match React prop names exactly:

  | Figma property | React prop |
  |----------------|------------|
  | `Variant`      | `variant`  |
  | `Size`         | `size`     |
  | `Disabled`     | `disabled` |
  | `Loading`      | `loading`  |

- Variant option values must match React values exactly:

  | Figma option | React value |
  |--------------|-------------|
  | `Primary`    | `primary`   |
  | `Secondary`  | `secondary` |
  | `Small`      | `sm`        |
  | `Medium`     | `md`        |
  | `Large`      | `lg`        |

  Mismatches break Code Connect without custom transforms. See `design-system-spec/figma-rules/RULES.md §Naming conventions`.

### 2. Variable scopes

Every variable must have the correct Figma scope set or it won't appear in the right panel:

| Variable type             | Figma scope                      |
|---------------------------|----------------------------------|
| Background / fill colours | `FRAME_FILL`, `SHAPE_FILL`       |
| Text colours              | `TEXT_FILL`, `STROKE_COLOR`      |
| Border / stroke colours   | `STROKE_COLOR`                   |
| Border radius             | `CORNER_RADIUS`                  |
| Spacing / padding         | `GAP`                            |
| Stroke width              | `STROKE_FLOAT`                   |
| Font size                 | `FONT_SIZE`                      |
| Line height               | `LINE_HEIGHT`                    |
| Letter spacing            | `LETTER_SPACING`                 |
| Font weight               | `FONT_STYLE`                     |
| Font family               | `FONT_FAMILY`                    |
| Breakpoints               | `WIDTH_HEIGHT`                   |

### 3. Units — px only, no percentages

**All dimension values must be bare numbers (no unit suffix).** Tokens Studio exports numeric values; Style Dictionary's `number/px` transform appends `px` automatically.

If Figma has exported a value as a percentage string (e.g. `"120%"` for `lineHeight`, `"-5%"` for `letterSpacing`), the `unit/percentToPx` transform in `style-dictionary.config.js` will convert it to `px` at build time. However, it is better to fix the source value in Figma so the token JSON stays clean:

- `lineHeight`: enter `20` not `120%`
- `letterSpacing`: enter `-0.5` not `-5%`
- `fontSize`: enter `16` not `16px`

### 4. Variable collections structure

Tokens Studio must be configured to match this collection layout exactly:

```
Collection 1: Primitives / Color    — mode: Default
  Groups: Orange/, Teal/, Violet/, Neutral/, Base/

Collection 2: Semantic / Color      — modes: Light, Dark
  Groups: Brand/, Hub-Learn/, Hub-News/, Content/,
          Background/, Border/, Icon/, Surface/, Overlay/

Collection 3: Semantic / Type       — modes: Large Desktop, Desktop, Tablet, Mobile
  Groups: Heading/, Text/

Collection 4: Borders               — mode: Default
  Groups: Radius/, Width/

Collection 5: Space                 — mode: Default
  Groups: Space/ (2XS through 12XL)

Collection 6: Layout                — mode: Default
  Groups: Breakpoint/, Unit/
```

### 5. Component structure (before pushing a new component)

If the push includes a new or updated component, verify in Figma:

- All layers are named semantically (no `Rectangle 12`, `Group 4`, `Frame 8`)
- All fills are linked to a variable from Collection 2 — no raw hex values
- All text layers reference a text style or variables from Collection 3
- Autolayout is applied — no absolute positioning where Autolayout applies
- All padding and gap values reference `Space/` variables
- The component has a description in the component panel
- A Code Connect file exists at `src/components/[Name]/[Name].figma.ts`

---

## How a token change reaches production

```
Figma Variables
     ↓  Tokens Studio "Push"
design-tokens branch  →  tokens/design-tokens.json updated
     ↓  .github/workflows/tokens-sync.yml
     │    1. npm run tokens          (Style Dictionary rebuilds CSS)
     │    2. commits src/tokens/*.css back onto design-tokens
     │    3. merges design-tokens → main directly
     ↓  push to main
     .github/workflows/storybook-deploy.yml
     │    1. npm run build-storybook
     │    2. deploy to GitHub Pages
     ↓
Live Storybook reflects the new tokens
```

**There is no manual step and no review gate.** Once Tokens Studio pushes to `design-tokens`, the change reaches the published Storybook without anyone clicking merge. The pre-export checklist above is the only quality control that runs before publish.

---

## Triggering the export

Nothing to do beyond your normal workflow: edit variables in Figma, then hit **Push** in Tokens Studio with the sync branch set to `design-tokens`. That push is the trigger — the rest is automatic.

---

## Checking it worked

1. **GitHub → Actions tab** — look for a `Sync design tokens` run triggered by your push, then a `Deploy Storybook` run right after it. Both should finish green within a couple of minutes.
2. **`main` branch** — should show a new merge commit `chore: sync design tokens from Figma`, and inside it a `chore: rebuild design tokens` commit updating `src/tokens/tokens.css` / `tokens.dark.css`.
3. **Live Storybook URL** — refresh and confirm the new values show up (e.g. check the affected Foundation page — Colour, Typography, Spacing, or Border).

---

## If the Action fails

**`Sync design tokens` fails at `npm run tokens`**  
Style Dictionary couldn't parse something in `design-tokens.json` — almost always a `$type` mismatch, a broken `{reference}`, or a percentage string that wasn't handled (see §3 above). Fix it in Figma, re-push from Tokens Studio; the workflow re-runs automatically on the new push. See `TOKEN-PIPELINE.md` for what to check.

**`Sync design tokens` fails at the merge step**  
Usually means `main` has diverged in a way that conflicts with the generated CSS (e.g. someone hand-edited `tokens.css`, which should never happen). Resolve the conflict manually: pull both branches locally, merge, push to `main`.

**`Deploy Storybook` fails**  
This runs independently of the token sync — a broken story or a `build-storybook` error unrelated to tokens will block deployment even if the token sync succeeded. Check the failing step's logs in the Actions tab; the CSS changes are still safely merged into `main` regardless.

**Nothing triggered at all**  
Confirm Tokens Studio's sync branch is exactly `design-tokens` and that it actually pushed a change to `tokens/design-tokens.json` — the workflow only fires on pushes that touch that specific file.

---

## Spec references

| Topic | File |
|-------|------|
| Figma naming, scopes, Code Connect rules | `design-system-spec/figma-rules/RULES.md` |
| React component structure and prop rules | `design-system-spec/react-rules/RULES.md` |
| Storybook story and MDX conventions | `design-system-spec/storybook-rules/RULES.md` |
| Design principles (why these rules exist) | `design-system-spec/design-principles/PRINCIPLES.md` |
| Token pipeline internals | `docs/TOKEN-PIPELINE.md` |
| Style Dictionary transforms | `style-dictionary.config.js` |
