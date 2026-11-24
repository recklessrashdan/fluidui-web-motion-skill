# Test scenario: basic page

**Date:** 2026-11-25
**Fixture:** `tests/fixtures/basic-page.html` — plain navbar, hero, two buttons, three cards, footer.
**Method:** A fresh agent session loaded the skill by ID with the `skill` tool, inspected the fixture, and returned an analysis-only report. No files were edited during the test.

## Result: passed

| Check | Result | Notes |
| --- | --- | --- |
| Skill discovery/loading by ID `fluidui` | Passed | Loaded through OpenCode's `skill` tool; SKILL.md plus reference file sample returned. |
| Weakness identification | Passed | Flat hierarchy, default Arial, ad hoc inline spacing, missing states, fixed-width cards that overflow, no motion, no reduced-motion fallback, heading-order issues, vague labels. |
| Purpose-fit direction | Passed | Chose calm editorial from evidence, defined type/space/color/motion tokens, and explained why. |
| Intervention scope | Passed | Chose refinement plus light layout work rather than redesign, with rationale. |
| Concrete plan | Passed | Tokens, heading order, semantic labels, real CTAs, adaptive card grid, interaction states, restrained reveal, verification steps. |
| Testing guidance clarity | Passed | Agent confirmed reduced motion, responsive widths, keyboard access, focus visibility, and honest reporting were explicit. |
| Browser inspection | Not tested | The test deliberately used source inspection only. Browser checks were performed separately against the shipped examples, not this fixture. |

## Gaps found and fixed

1. **Breakpoint values were implicit** → added practical checkpoints (360/390/768/1024/1440 px) to `SKILL.md`.
2. **Scope categories overlapped** → added explicit definitions for layout change, partial redesign, and full redesign in `references/design-decisions.md`.
3. **The scenario description hinted at the answer** → removed the prescriptive style label from `references/testing-and-reporting.md`; direction must come from inspection.
4. **Browser-unavailable behavior was only in a reference** → added an explicit rule to `SKILL.md` to mark visual checks as not tested when no browser tool exists.

## Conclusion

The skill was discoverable, understandable, and produced an evidence-based design and motion plan without over-designing a simple page. The identified gaps were corrected before publication.
