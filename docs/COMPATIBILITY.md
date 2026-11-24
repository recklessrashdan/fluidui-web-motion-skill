# FluidUI compatibility matrix

**Research date:** 2026-11-25. Sources are official platform documentation linked below. “Documented” means the path and behavior were verified against official docs; it does **not** mean a live discovery test was run in this environment.

| Platform | Native Agent Skills support | Project install path | User/global install path | Discovery | Verified status | Key limitations |
| --- | --- | --- | --- | --- | --- | --- |
| OpenCode | Yes | `.opencode/skills/fluidui/` (thin adapter included in this repo); `.agents/skills/fluidui/` also works | `~/.config/opencode/skills/fluidui/`; `~/.agents/skills/fluidui/` | Automatic; directory name is the ID; `@fluidui` or skill tool | **VERIFIED** — fresh-session discovery/loading by ID `fluidui` passed | Project skills override global; duplicate IDs resolved by later source; no documented `skills install` command |
| Claude Code | Yes | `.claude/skills/fluidui/` | `~/.claude/skills/fluidui/` | Automatic; `/fluidui`; `/reload-skills` | **DOCUMENTED / NOT RUNTIME-TESTED** | CLI unavailable during validation; Claude-only frontmatter extensions deliberately avoided |
| Cursor | Yes | `.cursor/skills/fluidui/` or `.agents/skills/fluidui/` | `~/.cursor/skills/fluidui/` or `~/.agents/skills/fluidui/` | Automatic at startup; `/fluidui`; Customize → Skills | **DOCUMENTED / NOT RUNTIME-TESTED** | Cloud Agents sync only `~/.cursor/skills`; team distribution uses plugins/marketplace; folder name must match `name` |
| Gemini CLI | Yes | `.gemini/skills/fluidui/` or `.agents/skills/fluidui/` | `~/.gemini/skills/fluidui/` or `~/.agents/skills/fluidui/` | Automatic; consent prompt after activation; `/skills list`, `/skills reload` | **DOCUMENTED / NOT RUNTIME-TESTED** | Trusted workspace required; CLI unavailable during validation; unpaid/Google One tiers transitioned to Antigravity CLI |
| Codex | Yes | `.agents/skills/fluidui/` | `$HOME/.agents/skills/fluidui/` | Automatic; `/skills` or `$fluidui`; restart if stale | **DOCUMENTED / NOT RUNTIME-TESTED** | CLI unavailable during validation; canonical path is `.agents/skills`, not `~/.codex/skills` |
| Generic Agent Skills clients | Format support depends on client | `.agents/skills/fluidui/` | `~/.agents/skills/fluidui/` | Client-specific | **SPEC-CONFORMANT / NOT RUNTIME-TESTED** | Spec defines the artifact, not installation or discovery behavior |

## Official sources

- Agent Skills specification: https://agentskills.io/specification.md
- Agent Skills client implementation guide: https://agentskills.io/client-implementation/adding-skills-support.md
- OpenCode skills: https://opencode.ai/docs/skills/
- Claude Code skills: https://code.claude.com/docs/en/skills.md
- Cursor Agent Skills: https://cursor.com/docs/skills.md
- Gemini CLI Agent Skills: https://geminicli.com/docs/cli/skills/
- Codex skills: https://developers.openai.com/codex/skills.md

## Installation model

There is one authoritative skill at the repository root. Install it by cloning this repository into the platform's discovered skill directory under the folder name `fluidui`, so the result is `<skills-dir>/fluidui/SKILL.md`. No platform-specific copy is maintained. Platform details live in [`../integrations/`](../integrations/) and are documentation only.

## Updating

From inside an installed clone:

```bash
git pull --ff-only
```

If a platform does not detect the update, restart the agent or use its documented reload command.

## What is not claimed

- No runtime discovery test is claimed for Claude Code, Cursor, Gemini CLI, Codex, or arbitrary Agent Skills clients.
- No browser or performance audit is claimed for any platform beyond what is recorded in [`VALIDATION_REPORT.md`](VALIDATION_REPORT.md).
- “Native support” refers to each platform's documented ability to load Agent Skills, not to an endorsement of FluidUI by that platform.
