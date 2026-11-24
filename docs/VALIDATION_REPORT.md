# Validation report

**Date:** 2026-11-25
**Scope:** skill structure, instructions, examples, security, and local browser behavior.

## Automated validation

Command: `node scripts/validate.mjs` → **8/8 passed**.

| Check | Result |
| --- | --- |
| Required files exist | Passed — 14 required files present |
| YAML frontmatter | Passed — `name: FluidUI`, 313-character discovery description, no XML-style tags |
| Skill ID and layout | Passed — `.opencode/skills/fluidui/SKILL.md`, kebab-case ID |
| Required guidance | Passed — 12 sections and required motion/a11y/responsive/performance concepts; no duplicate headings |
| Reference links | Passed — 5 references and all relative markdown links resolve |
| README formatting | Passed — 14 headings, 8 balanced code blocks, required sections present |
| Examples | Passed — 5 standalone HTML demos with viewport meta, titles, reduced-motion CSS, working scripts, and no external assets |
| Security scan | Passed — 18 files scanned; no secrets, tokens, personal paths, or sensitive file types |

## Discovery and scenario test

- OpenCode advertised the skill automatically after the files were written.
- A fresh agent session loaded it by ID `fluidui` through the `skill` tool: **passed**.
- Analysis-only test against `tests/fixtures/basic-page.html`: **passed**. The agent identified concrete UI/motion/a11y weaknesses, chose a proportionate scope, and produced an evidence-based plan. Gaps it reported were fixed. See `tests/test-scenario.md`.

## Browser checks

Standalone examples were opened in Chromium through the in-app browser and exercised with JavaScript:

| Example | Checks | Result |
| --- | --- | --- |
| minimal-professional | Rendered accessibility tree, headings/links present, no console errors, no overflow at tested viewport | Passed |
| smooth-dashboard | Range switch produced 12 bars; search filtered to 1 event; refresh set `aria-busy=true`; no console errors or overflow | Passed |
| bold-futuristic | Tab selection switched panels and `aria-selected`; no console errors or overflow | Passed |
| responsive-mobile | Stepper updated cart, filter hid other categories, dialog opened and closed, toast text correct, tab switch worked, no console errors or overflow | Passed |
| animated-landing | Scroll added header state and set parallax drift to 36 px; no console errors or overflow | Passed |

## Not tested

- OS-level `prefers-reduced-motion` emulation in the browser. The CSS rule is present in all five examples and checked statically, but no emulated run was performed.
- Multiple browser viewport widths. Responsive guidance was verified in source, and no overflow occurred at the available viewport (~1136 px); emulated 360/390/768/1440 px runs were not available.
- Lighthouse and performance traces. No profile was collected.
- GitHub repository creation and push: GitHub CLI reported no authenticated hosts. See the final response for manual publication steps.

## Remaining issues

None found in the local deliverable. The untested items above are limitations of the test environment, not known defects.
