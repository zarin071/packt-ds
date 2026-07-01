# SKILL: Governance & System Health Audit

## Purpose
Audit the operational health of a design system — not just what's in it,
but how it's maintained, measured, and adopted. Surfaces design debt,
tracks adoption metrics, and flags governance gaps that lead to system decay.

---

## When to invoke
- "Governance audit", "system health check", "design debt review", "adoption metrics"
- During quarterly design system reviews
- When stakeholders ask "is the design system actually being used?"
- Before planning a system investment or refresh

---

## Step-by-step instructions

### Step 1 — Component inventory health

Via Figma MCP, check the library for signs of decay:

**Stale component signals:**
- Components with "WIP", "Draft", "TODO", "Review" in their name
- Components last edited > 6 months ago that haven't been versioned
- Components with no instances anywhere in connected files
- Components with > 3 deprecated variants still active
- Page organisation inconsistency (some pages organised, some chaotic)

**Duplication debt:**
- Count components that are near-duplicates (same concept, different execution)
- Count components that exist both as a standalone AND embedded in a complex component
  but are not the same master component

### Step 2 — Naming debt inventory

Audit the overall naming quality at a system level (not just per component):

- [ ] All components follow the same naming convention?
- [ ] All variables/tokens follow the same naming convention?
- [ ] Are there conflicts between component names and token names?
  (e.g., a component called `Card` and a token called `card-background` — is `card` a component namespace or a token category?)
- [ ] Are there numbers in names that suggest accretion: `Button-v2`, `Modal-new-2024`?

Report: % of components with clean names vs % with naming debt.

### Step 3 — Adoption scoring

If usage file access is available via Figma MCP:

**Per component:**
- How many instances exist across connected design files?
- Which components have 0 instances? (built but never used)
- Which components have the most detachments relative to their usage count?

**System-wide:**
- What % of design files in the organisation are connected to this library?
- What % of frames in connected files use at least 1 library component?

Report: Top 10 most-used, top 10 least-used, top 10 most-detached components.

### Step 4 — Versioning and changelog check

A healthy system has documented change management:

Check for:
- [ ] A version number system (semver or dated versions: v2.4.1 or 2025-Q2)
- [ ] A changelog file or page in the Figma file documenting changes
- [ ] Breaking changes clearly labelled
- [ ] Migration guides for major version changes
- [ ] A "What's New" section in the documentation site

Flag: No versioning system in place.
Flag: Breaking changes made without a migration path.
Flag: Last changelog entry > 3 months old (system may be unmaintained).

### Step 5 — Contribution and review process check

A system without governance decays to inconsistency.

Ask/check:
- [ ] Is there a contribution model? (Who can add components? What's the review process?)
- [ ] Are there component proposal templates?
- [ ] Is there a defined owner for the design system?
- [ ] Are there SLAs for issue resolution / contribution review?
- [ ] Is the system's roadmap public to its consumers?

Flag: No defined contribution process.
Flag: No single owner or team responsible for the system.

### Step 6 — Token and component debt ratio

Compute the debt ratio:

**Token debt:**
- Count: total tokens in the system
- Count: tokens that are unused (defined but never referenced in any component)
- Count: hardcoded values in components that should be tokens
- Debt ratio = (unused tokens + hardcoded instances) / total tokens × 100

**Component debt:**
- Count: deprecated components still in the library
- Count: components with 0 usage instances
- Count: duplicate/near-duplicate components
- Debt ratio = (deprecated + unused + duplicates) / total components × 100

### Step 7 — Performance / file health check

Via Figma MCP, check for Figma file health:

- Are there extremely large components (thousands of layers) that indicate poor architecture?
- Are there detached component instances that have been manually rebuilt (adding file weight)?
- Are all assets (images, illustrations) properly linked rather than embedded?
- Are there fonts used that are not in the token system?

---

## Scoring

| Check | Points |
|-------|--------|
| < 10% stale/WIP components | 15 |
| < 10% naming debt | 10 |
| Adoption data available and > 60% file coverage | 15 |
| Versioning system in place | 15 |
| Changelog up to date (< 3 months) | 10 |
| Contribution process documented | 15 |
| Token debt ratio < 20% | 10 |
| Component debt ratio < 15% | 10 |
| **Total** | **100** |

---

## Output template

```
## Governance & System Health Audit Report

**Score: XX/100**
**System owner:** [known / unknown]
**Last changelog entry:** [date / not found]

### Stale components
- [N] components with WIP/Draft/TODO labels
- [N] components with 0 usage instances

### Naming debt
- [N] components ([%]) with naming violations
- [N] tokens ([%]) with naming violations

### Adoption metrics
- Files connected to library: [N] ([%] of org)
- Top 5 most-used: [list]
- Top 5 most-detached: [list]
- Unused components: [N]

### Versioning
[Current version / No versioning detected]
[Changelog: up to date / stale / missing]

### Debt ratios
- Token debt: [X]%
- Component debt: [X]%

### Governance gaps
- [list]

### Priority fix queue
1. [item]
```

---

## References
- Design System Health by Dan Mall: https://danmall.com/
- Measuring DS adoption: https://medium.com/eightshapes-llc/measuring-design-system-adoption-45d15d53b5f7
- Contribution models: https://www.designsystemscollective.com/
- Semantic versioning: https://semver.org/
