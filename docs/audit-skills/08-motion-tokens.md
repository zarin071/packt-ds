# SKILL: Motion & Animation Tokens Audit

## Purpose
Audit the motion system in a Figma design system.
Checks for duration/easing token coverage, semantic motion naming,
reduced-motion accessibility support, and whether animations serve hierarchy
rather than just decoration.

---

## When to invoke
- "Motion audit", "animation tokens", "check transitions", "reduced motion"
- When building out the motion layer of a new design system
- Before engineering handoff of interactive components

---

## Step-by-step instructions

### Step 1 — Inventory motion tokens

Via Figma MCP, extract:
- Duration variables (if defined)
- Easing/cubic-bezier variables (if defined)
- Any animation prototype connections on components

List all motion-related variables and group by:
- Duration
- Easing curves
- Delay (if present)

### Step 2 — Duration token coverage check

A motion system needs durations across the full range of animation contexts:

| Token | Range | Purpose |
|-------|-------|---------|
| `duration-instant` | 0ms | Immediate feedback (no transition) |
| `duration-fast` | 100–150ms | Micro-interactions (toggles, checkboxes) |
| `duration-moderate` | 200–300ms | State transitions (hover, active, expand) |
| `duration-slow` | 400–500ms | Layout shifts, page transitions |
| `duration-deliberate` | 600–800ms | Onboarding, feature introductions |

Check:
- Does the system have at least 3–4 distinct duration tokens?
- Are durations within human perception ranges? (<100ms feels instant, >700ms feels slow)
- Is there a `duration-none: 0ms` token for reduced-motion override?

Flag: Systems with only 1–2 duration values (usually `200ms` and `300ms`).
Flag: Durations > 1000ms used for non-deliberate/loading contexts.

### Step 3 — Easing token coverage check

Easing curves should be semantic, not arbitrary cubic-bezier values.

| Token | Curve | Use case |
|-------|-------|----------|
| `easing-linear` | `linear` | Progress bars, loaders |
| `easing-ease-in` | `cubic-bezier(0.4, 0, 1, 1)` | Elements exiting screen |
| `easing-ease-out` | `cubic-bezier(0, 0, 0.2, 1)` | Elements entering screen |
| `easing-ease-in-out` | `cubic-bezier(0.4, 0, 0.2, 1)` | State changes, toggles |
| `easing-spring` | custom | Playful/bouncy interactions |

Check:
- Do easing tokens cover at least ease-in, ease-out, ease-in-out?
- Are easing curves named semantically (`easing-enter`, `easing-exit`) rather than with curve values?
- Is spring/bounce easing available for playful product contexts?

### Step 4 — Semantic motion naming

Like color tokens, motion tokens should be named for purpose, not value.

PASS:
- `duration-component-hover` → references `duration-fast`
- `duration-overlay-enter` → references `duration-moderate`
- `easing-enter`, `easing-exit`

FAIL:
- `transition-200ms` (value in name)
- `animation-ease` (too vague)
- `fast` (no domain context)

### Step 5 — Reduced-motion accessibility check

This is the highest-priority motion accessibility requirement.

Check for:
- [ ] A `prefers-reduced-motion` mode or token set (e.g., all durations set to 0ms in a "reduced" mode)
- [ ] Components with prototype animations documented with their reduced-motion fallback
- [ ] A `motion-safe` / `motion-reduced` boolean variable or mode
- [ ] Guidance in component documentation about which animations are decorative vs functional

**WCAG criterion:** 2.3.3 Animation from Interactions (AAA) — motion can be disabled by users.
Also relevant to users with vestibular disorders.

Flag: No reduced-motion token or mode in the system.
Flag: Components with looping animations (spinners are OK; background parallax loops are not).
Flag: Any animation involving flashing (> 3 flashes/sec = WCAG 2.3.1 Level A failure).

### Step 6 — Motion hierarchy review

Motion should communicate hierarchy and meaning, not just be decorative.

Audit which motion roles are covered in the system:
- [ ] Feedback (button press response, checkbox toggle)
- [ ] Transition (page or view changes)
- [ ] Emergence (dropdown, modal, tooltip appearance)
- [ ] Dismissal (modal close, toast disappear)
- [ ] Emphasis (shake for error, pulse for notification)
- [ ] Loading/progress (spinner, skeleton, progress bar)
- [ ] Decoration (hero animations, illustration loops — should be lowest priority)

Flag: Systems where ALL motion is decorative only (no functional motion defined).
Flag: Emergence/dismissal using the same duration as micro-interactions (should be slower).

### Step 7 — Component prototype check

In Figma, scan components for prototype connections:
- Are smart-animate transitions applied to state changes?
- Are durations and easings from the token system (or at least consistent values)?
- Are there any prototype animations that can't be replicated in code?

Flag: Prototype animations using arbitrary durations (e.g., 237ms, 412ms).
Flag: Animations that rely on Figma-specific features with no code equivalent.

---

## Scoring

| Check | Points |
|-------|--------|
| Duration tokens cover 3+ semantic ranges | 20 |
| Easing tokens cover in/out/in-out minimum | 15 |
| Tokens named semantically (not by value) | 15 |
| Reduced-motion mode or tokens exist | 30 |
| Motion covers functional roles (not just decorative) | 15 |
| Prototype animations use consistent durations | 5 |
| **Total** | **100** |

---

## Output template

```
## Motion & Animation Tokens Audit Report

**Score: XX/100**
**Duration tokens found:** [N]
**Easing tokens found:** [N]

### Missing duration ranges
- [range]: no token defined

### Missing easing types
- [type]: not covered

### Reduced-motion
[PASS: mode/tokens defined / FAIL: not addressed — high priority fix]

### Prototype animation consistency
- [N] components use arbitrary durations: [list]

### Priority fix queue
1. [item]
```

---

## References
- Material Design motion system: https://m3.material.io/styles/motion/overview
- WCAG 2.3.3 Animation: https://www.w3.org/TR/WCAG22/#animation-from-interactions
- Designing Accessible Animation (Val Head): https://valhead.com/
- CSS prefers-reduced-motion: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion
