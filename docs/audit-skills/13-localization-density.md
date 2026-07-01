# SKILL: Localization & Content Density Audit

## Purpose
Audit a design system's readiness for internationalization (i18n).
Checks text expansion tolerance, RTL layout support, content density variants,
numeric/date formatting, and locale-specific component behavior.

---

## When to invoke
- "Localization audit", "i18n readiness", "RTL support", "multi-language check"
- Before expanding a product to new markets
- When a German or Japanese locale is planned (both stress-test layouts hard)

---

## Step-by-step instructions

### Step 1 — Text expansion stress test

Different languages use more characters than English. Components must accommodate expansion.

**Expansion rates by language:**
| Language | Expansion vs English |
|----------|---------------------|
| German | +30–35% |
| French | +15–20% |
| Russian | +15–30% |
| Arabic | +25–30% (RTL) |
| Japanese/Chinese | −10 to −30% (character compression) |
| Finnish | +30–40% |

**For each text-bearing component, check:**
- Does button label wrap or truncate gracefully at 130% text length?
- Does navigation label wrap or truncate at 135%?
- Do form labels remain readable at 130%?
- Do notification/toast messages not overflow their container at 130%?
- Do table column headers handle longer labels?

**Test by simulating expansion:** Replace all text with Lorem versions 30% longer and inspect.

Flag: Components where text at +30% breaks layout, overflows container, or becomes unreadable.

### Step 2 — Truncation strategy audit

Check that truncation is handled consistently:

- Navigation items: should truncate with `...` at max width
- Buttons: should NOT truncate — button text should always be fully visible
- Table cells: should truncate with tooltip showing full value
- Tags/chips: should truncate at max-width
- Notification messages: can wrap to 2 lines maximum

Flag: Buttons with truncation (always a bug — resize the button)
Flag: Components with no defined max-width AND no truncation rule

### Step 3 — RTL layout readiness

For products launching in Arabic, Hebrew, Persian, or Urdu markets:

Check each component for:
- [ ] Horizontal padding is symmetric (or uses `padding-inline-start/end` in code equivalent)
- [ ] Icons that carry directional meaning have RTL flipped variants
  (arrows, chevrons, back buttons, directional UI icons)
- [ ] Progress indicators flow right-to-left in RTL
- [ ] Sliders go right-to-left in RTL
- [ ] Navigation hierarchy reads right-to-left
- [ ] Form field labels position correctly in RTL (still attached to their input)
- [ ] Text alignment is not hardcoded to `left` (should be `start`)

In Figma: Check if any components have RTL variants or if the file has an RTL mode.

Flag: No RTL variants or mode for any component (report as "RTL not supported").
Flag: Icons with directional meaning (→, ←, ↗) with no RTL flip.

### Step 4 — Number, date, and currency formatting

Components displaying data must be locale-aware:

Check if components document how to handle:
- [ ] Date formats (MM/DD/YYYY vs DD/MM/YYYY vs YYYY-MM-DD)
- [ ] Number formats (1,000.00 vs 1.000,00 vs 1 000,00)
- [ ] Currency (symbol position, decimal convention)
- [ ] Time formats (12h vs 24h)
- [ ] Phone number formats

Flag: Hard-coded date format in a date picker component (e.g., "MM/DD/YYYY" in the placeholder)
Flag: Currency symbol hardcoded into a price component (e.g., "$" before the number)

### Step 5 — Content density variants

Data-heavy products (enterprise, analytics, admin panels) need density control.

Check if components have density variants:
- **Comfortable/Default:** Full padding, generous line height
- **Compact:** Reduced padding (typically 75% of default)
- **Dense:** Minimal padding for data grids, code views (typically 50% of default)

If density is not handled, check:
- Are spacing tokens structured to allow density switching via a mode?
- Are there component size variants (sm/md/lg) that can serve as density proxies?

Flag: Enterprise components (data tables, lists, sidebars) with only 1 density.

### Step 6 — Character set and font support

Check the selected typefaces:
- Do they support Latin Extended (needed for accented characters: ñ, ü, é, ø)?
- Do they support Cyrillic (Russian, Ukrainian, Bulgarian)?
- Do they support Greek?
- For global products: do they support Arabic, Hebrew, Devanagari, CJK?

Flag: Typefaces used that don't support required character sets for target markets.
Recommend: Use a variable font or font stack with system fallbacks for unsupported scripts.

---

## Scoring

| Check | Points |
|-------|--------|
| Key components tolerate +30% text expansion | 25 |
| Truncation strategy defined per component | 15 |
| RTL variants exist for directional components | 20 |
| Date/number formatting is not hardcoded | 15 |
| Density variants for data-heavy components | 15 |
| Font supports required character sets | 10 |
| **Total** | **100** |

---

## Output template

```
## Localization & Content Density Audit Report

**Score: XX/100**
**RTL support:** [Yes (variants defined) / Partial / No]
**Density variants:** [Yes / Partial / No]

### Text expansion failures (+30% simulation)
- [component]: text overflows [container/button/label] at 130%

### Truncation gaps
- [component]: no truncation rule defined

### RTL issues
- [component]: hardcoded left alignment / directional icon with no RTL flip

### Hardcoded formatting
- [component]: date format hardcoded / currency symbol hardcoded

### Font character set
- [font name]: missing [character set] — affects [markets]

### Priority fix queue
1. [item]
```

---

## References
- W3C i18n checklist: https://www.w3.org/International/i18n-drafts/nav/checklist
- RTL styling guide: https://rtlstyling.com/
- Figma RTL community resources: https://www.figma.com/community/tag/rtl
- Text expansion testing: https://www.w3.org/International/articles/article-text-reuse/
- Unicode font coverage: https://www.fileformat.info/info/unicode/
