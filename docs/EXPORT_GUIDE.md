# Export Guide — Figma to Published Storybook

This documents the automated path a token change takes from Figma to the live Storybook. For the rules your Figma variables must follow before exporting, see `DESIGN.md`. For what the generated CSS files mean and how to hand-maintain `tokens.theme.css`, see `TOKEN-PIPELINE.md`.

---

## How a token change reaches production

```
Figma Variables
     ↓  Token Studio "Push"
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

**There is no manual step and no review gate.** Once Token Studio pushes to `design-tokens`, the change reaches the published Storybook without anyone clicking merge. This is intentional for speed, but it means the checklist in `DESIGN.md` §4 is the only check that happens before publish — get it right before pushing.

---

## Triggering it

Nothing to do beyond your normal workflow: edit variables in Figma, then hit **Push** in Token Studio with the sync branch set to `design-tokens`. That push is the trigger — the rest is automatic.

---

## Checking it worked

1. **GitHub → Actions tab** — look for a `Sync design tokens` run triggered by your push, then a `Deploy Storybook` run right after it. Both should finish green within a couple of minutes.
2. **`main` branch** — should show a new merge commit `chore: sync design tokens from Figma`, and inside it a `chore: rebuild design tokens` commit updating `src/tokens/tokens.css` / `tokens.dark.css`.
3. **Live Storybook URL** — refresh and confirm the new values show up (e.g. check the affected Foundation page — Colour, Typography, Spacing, or Border).

---

## If the Action fails

**`Sync design tokens` fails at `npm run tokens`**
Style Dictionary couldn't parse something in `design-tokens.json` — almost always a `$type` mismatch or a broken reference (see `TOKEN-PIPELINE.md` §"What to check before exporting"). Fix it in Figma, re-push from Token Studio; the workflow will re-run automatically on the new push.

**`Sync design tokens` fails at the merge step**
Usually means `main` has diverged in a way that conflicts with the generated CSS (e.g. someone hand-edited `tokens.css`, which should never happen — see `TOKEN-PIPELINE.md`). Resolve the conflict manually: pull both branches locally, merge, push to `main`.

**`Deploy Storybook` fails**
This runs independently of the token sync — a broken story or a `build-storybook` error unrelated to tokens will block deployment even if the token sync itself succeeded. Check the failing step's logs in the Actions tab; the CSS changes are still safely merged into `main` regardless.

**Nothing triggered at all**
Confirm Token Studio's sync branch is exactly `design-tokens` and that it actually pushed a change to `tokens/design-tokens.json` — the workflow only fires on pushes that touch that specific file.
