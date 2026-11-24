# Validation report — FluidUI Universal

**Date:** 2026-11-25
**Scope:** portable Agent Skills core, platform installation documentation, examples, security, OpenCode discovery, and previously completed browser behavior checks.

## Automated validation

Command: `node scripts/validate.mjs` → **14/14 passed**.

| Check | Result |
| --- | --- |
| Required files exist | Passed — 27 required files present |
| Core Agent Skills frontmatter | Passed — `name: fluidui`, 313-character activation description, `license: MIT`, valid `compatibility` |
| Core skill is platform-neutral | Passed — no platform commands or install paths in `SKILL.md` |
| Portable directory structure | Passed — core at root, one thin adapter, six support directories |
| Adapters are thin and point to core | Passed — adapter is 11 lines, points to `../../../SKILL.md`, duplicates no core sections |
| Reference guides exist and are linked | Passed — 5 references linked and present |
| Relative markdown links | Passed — 18 markdown files, 20 relative links resolve |
| README covers universal installation | Passed — 23 headings, 10 code blocks, 6 platforms, 4 required activation examples |
| Platform integration docs | Passed — 6 guides with official source, path, and status label |
| Compatibility matrix | Passed — 6 platform rows and 6 official source URLs |
| Examples | Passed — 5 standalone HTML demos with viewport meta, titles, reduced-motion CSS, working scripts, and no external assets |
| Tests and scenario | Passed — fixture, recorded scenario, and testing guide aligned |
| No duplicated core instructions | Passed — 14 unique core sections, no duplicate file names |
| Security scan | Passed — 27 files scanned; no secrets, tokens, personal paths, or sensitive file types |

## Platform research

Official documentation was consulted on 2026-11-25 for the Agent Skills specification and every target platform. Full citations and paths are in [`COMPATIBILITY.md`](COMPATIBILITY.md).

| Platform | Status in this project |
| --- | --- |
| OpenCode | VERIFIED — fresh-session discovery/loading by ID `fluidui` passed after the universal restructure |
| Claude Code | Documented from official docs; not runtime-tested (CLI unavailable) |
| Cursor | Documented from official docs; not runtime-tested (no live discovery test performed) |
| Gemini CLI | Documented from official docs; not runtime-tested (CLI unavailable) |
| Codex | Documented from official docs; not runtime-tested (CLI unavailable) |
| Generic Agent Skills clients | Spec-conformant by local validation; client-specific discovery not tested |

No platform is marked fully verified merely because a Markdown file was opened.

## Discovery and scenario test

- OpenCode discovered the thin adapter at `.opencode/skills/fluidui/SKILL.md`, which directs the agent to the root `SKILL.md`.
- A fresh agent session loaded skill ID `fluidui` and received the platform-neutral core instructions with all five reference paths.
- The basic-page scenario remains recorded in [`../tests/test-scenario.md`](../tests/test-scenario.md): the agent identified flat hierarchy, ad hoc spacing, missing states, overflow risk, no motion, and no reduced-motion handling; it chose a proportionate refinement with a purpose-fit direction.
- Examples were unchanged in content and only renamed for the universal layout. Earlier browser interaction checks still apply: dashboard filter/range/refresh, futuristic tabs, mobile cart/filter/dialog/toast/tabs, and animated-landing scroll parallax all passed. No console errors or horizontal overflow were observed at the tested viewport.

## Security

Final scan covered all 27 tracked/project files after the restructure:

- No API keys, access tokens, passwords, or secret files
- No personal computer paths or private data in project files
- No unrelated project artifacts
- No remote scripts, external assets, telemetry code, or suspicious dependencies
- One authoritative `SKILL.md`; the only other `SKILL.md` is a thin OpenCode discovery shim
- All examples remain self-contained HTML/CSS/JS with dependency-free interactions

## Passed

- All 14 automated checks
- Official-document research for the specification and five platforms
- OpenCode discovery/loading after the universal restructure
- Basic-page design-analysis scenario
- Interactive behavior in all five examples (content unchanged; earlier browser run)
- Reduced-motion CSS presence in all five examples

## Failed

- None outstanding.

## Not tested

- Live skill discovery/loading in Claude Code, Cursor, Gemini CLI, Codex, or arbitrary Agent Skills clients
- OS-level `prefers-reduced-motion` emulation in browser
- Multiple emulated viewport widths; only the available browser viewport was checked
- Lighthouse audits and performance traces
- GitHub-rendered README after the universal update (verification is planned after push)
