# bpCore Design System — Adoption Report

Source data compiled by designers across the bp product portfolio. Raw spreadsheets are co-located in this folder.

---

## 1. Portfolio-wide coverage (`projects-using-bpcore-deep-dive.xlsx`)

**221 total projects** consuming bpCore were audited against UI & Design Token usage and coded-component adoption.

### UI & Design Token adoption

| Tier | Threshold | Projects | Share |
|------|-----------|----------|-------|
| Influenced | < 20% | 36 | 16% |
| Partial | 20 – 90% | 90 | 41% |
| Complete | > 90% | 90 | 41% |
| **Total** | | **216** | **~98%** |

> ~5 projects had no coverage marker recorded.

### Coded component adoption

| Layer | Projects actively using |
|-------|------------------------|
| CSS | 0 |
| Tokens | 0 |
| Components | 2 (`bp Helix`, `bp pulse`) |

**Key insight:** Design token adoption is broad (82% of audited projects at Partial or Complete) but coded-component handoff is nearly zero. Only 2 of 221 projects consume bpCore React components directly — signalling a significant design-to-development gap.

---

## 2. Prioritised-product deep dive (`bpCore-baseline.xlsx`)

22 priority products were assessed on both **Design** and **Development** maturity across four levels:
`Not using` → `Influencing` → `Fully Consumed` → `Supportable`

### Summary table

| Product | Design | Dev | Dev Supportable? |
|---------|--------|-----|-----------------|
| Refinery Campaign Planning & Execution | Not using | Not using | Unknown |
| BioSphere | Not using | Not using | Unknown |
| BioVerse | Fully Consumed | Influencing | Yes |
| bpme Global App | Fully Consumed | Not using | No |
| Credit Risk Mgmt (Rubix) | Not using | Not using | Unknown |
| Crude & Feedstock Quality | Influencing | Not using | Unknown |
| IRIS Incident Management & Reporting | Influencing | Influencing | Yes |
| ERP Transformation | Not using | Not using | Unknown |
| Fleet Foundations (OneFleet) | Fully Consumed | Not using | Yes |
| Global Integrated Pricing Programme | Influencing | Influencing | Yes |
| Integrated CRM | Not using | Not using | Unknown |
| Intelligent Planning (Castrol – Project Spring) | Not using | Not using | Unknown |
| MyAirbp | Fully Consumed | Not using | No |
| Pivot | Fully Consumed | Influencing | Yes |
| Production Optimization & Surveillance | Not using | Not using | Unknown |
| Production Surveillance | Not using | Not using | Unknown |
| Retail Operating System | Influencing | Not using | Unknown |
| Virtual Asset Management Platform (Digital Twin) | Not using | Not using | Unknown |
| Wells & Subsurface Application Platforms | Fully Consumed | Fully Consumed | Yes |
| Wells Real Time Operations | Fully Consumed | Fully Consumed | Yes |

### Maturity breakdown (22 priority products)

**Design**

| Level | Count |
|-------|-------|
| Not using | 10 |
| Influencing | 4 |
| Fully Consumed | 6 |

**Development**

| Level | Count |
|-------|-------|
| Not using | 14 |
| Influencing | 4 |
| Fully Consumed | 2 |

### Design-to-development handoff gap

Of the 6 products that are **Fully Consumed** on the design side, only **2** (Wells & Subsurface, Wells Real Time Operations) have reached the same level in development. The other 4 (BioVerse, bpme Global App, Fleet Foundations, MyAirbp, Pivot) lag at `Not using` or `Influencing` on the dev side.

This represents a **design-ahead, dev-behind** pattern across the majority of priority products — the design system is being used to ship polished UIs in Figma, but component libraries and tokens are not yet wired into front-end codebases.

---

## 3. Recommended next steps

1. **Close the dev gap on the 4 Fully-Consumed design / low-dev products** — BioVerse, bpme Global App, Fleet Foundations, and Pivot are the highest-leverage targets: design is already aligned, so a focused token/component integration sprint would deliver the most visible improvement.
2. **Establish a coded-component baseline** — with 0/221 projects on CSS or Tokens and only 2 on Components, a clear integration guide and reference implementation (see `docs/DeveloperGuide.mdx`) is the critical unlock.
3. **Revisit the 10 priority products marked "Unknown" supportability** — these need a discovery session to determine whether bpCore is even on their roadmap.

---

*Data sources: designer audit spreadsheets, Q3 2025. See raw files in this directory for full project list.*
