# Testing and reporting

## Test scenarios

### Scenario A — basic page (fixture: `tests/fixtures/basic-page.html`)

A plain navbar, hero, buttons, cards, and footer. Expected FluidUI outcome:

1. Identify weak hierarchy (everything similar size), inconsistent spacing, bare buttons, card overload, no focus styling, no reduced-motion handling.
2. Choose a purpose-fit direction from the evidence. Do not prescribe a style before inspection; a calm editorial direction is one candidate if the content supports it.
3. Propose a small system: one display/body type pairing, spacing scale, neutral + one accent, subtle elevation, short entrance motion.
4. Implement real nav links, useful buttons, consistent states, responsive nav, reduced motion, and a visible footer.
5. Verify at phone/tablet/desktop widths, keyboard, and reduced motion.

Run this scenario by asking an agent to apply the skill to the fixture and comparing its plan with the expectations above. See `tests/test-scenario.md` for the recorded result.

### Scenario B — existing project

Run the project's own build/lint/typecheck/tests before and after changes. Inspect at least one page in a browser, exercise the primary interaction, and verify no regression in unrelated routes.

## Verification checklist

- Frontmatter parses; `name` and `description` are present; description states what and when.
- Skill ID from directory path is `fluidui`; supporting references exist and are linked.
- Examples open as standalone HTML, with no external network dependency or console errors.
- `prefers-reduced-motion`, responsive guidance, performance guidance, and safety constraints appear in `SKILL.md`.
- No secrets, absolute personal paths, or unrelated project files are included.
- Confirm a host agent discovers the skill if one is available; loading it by ID in a fresh session is the strongest check. If no host is available, mark discovery as not tested.

## Report honesty

Classify every check as **passed**, **failed**, or **not tested**. A missing tool is "not available", not "passed". Do not claim a browser test if only source was read. List unresolved issues instead of implying completeness.
