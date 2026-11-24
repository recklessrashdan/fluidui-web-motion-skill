# Test scenario: basic page

**Date:** 2026-11-25
**Fixture:** `tests/fixtures/basic-page.html` — plain navbar, hero, two buttons, three cards, footer.
**Method:** A fresh agent session loaded the `fluidui` skill through the available skill-loading mechanism, inspected the fixture, and returned an analysis-only report. No fixture files were edited.

## Result: passed

| Check | Result | Notes |
| --- | --- | --- |
| Skill discovery/loading by ID `fluidui` | Passed | Loaded in a fresh session; the thin OpenCode adapter resolved to the root platform-neutral `SKILL.md`. |
| Core portability | Passed | Loaded instructions contained no OpenCode, Claude, Cursor, Gemini, or Codex commands; reference paths used the portable `references/` layout. |
| Weakness identification | Passed | Flat hierarchy, default Arial, ad hoc inline spacing, missing states, fixed-width cards that overflow, no motion, no reduced-motion fallback, heading-order issues, vague labels. |
| Purpose-fit direction | Passed | Chose calm editorial from evidence, defined type/space/color/motion tokens, and explained why. |
| Intervention scope | Passed | Chose refinement plus light layout work rather than redesign, with rationale. |
| Concrete plan | Passed | Tokens, heading order, semantic labels, real CTAs, adaptive card grid, interaction states, restrained reveal, keyboard/reduced-motion verification. |
| Honest reporting | Passed | Separated passed checks from items requiring a browser or not tested. |

## Universal upgrade re-check

After moving the authoritative skill to the repository root and adding platform documentation:

- `node scripts/validate.mjs` → 14/14 passed.
- OpenCode discovery was re-tested in a fresh session and still resolved the skill by ID `fluidui`.
- The five examples were renamed (`minimal`, `futuristic`, `dashboard`, `animated-landing`, `mobile-app`) with no content changes; browser interaction results from the earlier run remain applicable.
- Other platforms are documented from official sources but marked **not runtime-tested** because their CLIs were unavailable or no live discovery test was performed.
