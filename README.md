# FluidUI

**Design that flows, everywhere.**

FluidUI is a portable [Agent Skills](https://agentskills.io/specification.md) skill for building, redesigning, and refining websites with thoughtful interfaces, fluid motion, strong responsiveness, and accessible interactions. It does not impose a house style: it inspects the project and chooses a visual direction that fits the product's purpose, audience, and content.

One authoritative core skill works across OpenCode, Claude Code, Cursor, Gemini CLI, Codex, and other compatible agents. Platform-specific installation details are documentation only — there are no separate skill versions to maintain.

## What FluidUI does

- **Adaptive design decisions** — refinement, interaction polish, motion work, layout change, partial redesign, or full redesign, chosen from evidence.
- **Purpose-fit visual systems** — typography, spacing, color, elevation, and motion tokens derived from the project, not a preset template.
- **Fluid motion engineering** — purposeful micro-interactions, entrances, reveals, and transitions using `transform` and `opacity` first.
- **Accessibility by default** — `prefers-reduced-motion`, keyboard access, visible focus, contrast, and content that works without JavaScript animation.
- **Responsive judgment** — layout re-planning at small widths instead of a shrunken desktop page.
- **Interaction quality** — real default, hover, focus, active, disabled, and loading states for meaningful controls.
- **Stack adaptability** — works within existing HTML/CSS/JS, React, Next.js, Vue, Svelte, Tailwind, or other frontend stacks.
- **Honest reporting** — distinguishes passed, failed, and not-tested checks.

## Supported platforms

| Platform | Support | Install guide | Verified status |
| --- | --- | --- | --- |
| OpenCode | Native | [integrations/opencode.md](integrations/opencode.md) | VERIFIED — discovery/loading by ID `fluidui` passed |
| Claude Code | Native | [integrations/claude-code.md](integrations/claude-code.md) | Documented; not runtime-tested |
| Cursor | Native | [integrations/cursor.md](integrations/cursor.md) | Documented; not runtime-tested |
| Gemini CLI | Native | [integrations/gemini-cli.md](integrations/gemini-cli.md) | Documented; not runtime-tested |
| Codex | Native | [integrations/codex.md](integrations/codex.md) | Documented; not runtime-tested |
| Generic Agent Skills / other compatible clients | Format-compatible | [integrations/generic-agents.md](integrations/generic-agents.md) | Spec-conformant; client-specific discovery untested |

The full matrix with official sources and limitations is in [docs/COMPATIBILITY.md](docs/COMPATIBILITY.md).

## Installation

**New here?** Read the beginner-friendly [INSTALLATION.md](INSTALLATION.md) for step-by-step commands, explanations, verification, updates, troubleshooting, and uninstall instructions.

The process is the same for every supported agent: clone this repository into the skills directory your agent discovers, keeping the folder name `fluidui`. Supported platforms are OpenCode, Claude Code, Cursor, Gemini CLI, Codex, and other Agent Skills-compatible agents; exact paths and verification status are in the [compatibility matrix](docs/COMPATIBILITY.md).

### Direct from GitHub (recommended)

Clone the repository into the platform's discovered skills directory. The final folder must be named `fluidui` and contain `SKILL.md` at its root.

#### OpenCode

Project-level:

```bash
mkdir -p .opencode/skills
git clone --depth 1 https://github.com/recklessrashdan/fluidui-web-motion-skill.git .opencode/skills/fluidui
```

User-level:

```bash
git clone --depth 1 https://github.com/recklessrashdan/fluidui-web-motion-skill.git ~/.config/opencode/skills/fluidui
```

PowerShell equivalents use `$HOME` instead of `~`, for example "$HOME/.config/opencode/skills/fluidui".

#### Claude Code

Project-level:

```bash
mkdir -p .claude/skills
git clone --depth 1 https://github.com/recklessrashdan/fluidui-web-motion-skill.git .claude/skills/fluidui
```

User-level:

```bash
git clone --depth 1 https://github.com/recklessrashdan/fluidui-web-motion-skill.git ~/.claude/skills/fluidui
```

#### Cursor

Project-level:

```bash
mkdir -p .cursor/skills
git clone --depth 1 https://github.com/recklessrashdan/fluidui-web-motion-skill.git .cursor/skills/fluidui
```

User-level: use `~/.cursor/skills/fluidui` or the generic `~/.agents/skills/fluidui`.

#### Gemini CLI

Workspace-level:

```bash
mkdir -p .gemini/skills
git clone --depth 1 https://github.com/recklessrashdan/fluidui-web-motion-skill.git .gemini/skills/fluidui
```

User-level: use `~/.gemini/skills/fluidui` or `~/.agents/skills/fluidui`. Gemini CLI also documents `gemini skills install <repo-url> --consent`.

#### Codex

Project/repository-level:

```bash
mkdir -p .agents/skills
git clone --depth 1 https://github.com/recklessrashdan/fluidui-web-motion-skill.git .agents/skills/fluidui
```

User-level: clone into `$HOME/.agents/skills/fluidui`.

#### Other compatible agents

Use the cross-client convention `.agents/skills/fluidui` for project scope or `~/.agents/skills/fluidui` for user scope.

### Manual installation

Download the repository ZIP, extract it, rename the extracted folder to `fluidui`, and move it into any documented path above. No build step, package installation, or manual file recreation is required.

### Verify the install

- OpenCode: `@fluidui Improve this page's hierarchy and motion.`
- Claude Code / Cursor: `/fluidui` or a matching request.
- Gemini CLI: `/skills list`, then use a matching request and approve the activation prompt.
- Codex: `/skills` or `$fluidui`.
- Other clients: follow the host's documented skill listing command.

## Usage with any supported agent

FluidUI's description lets a compatible agent load it automatically when a request matches. You can also request it explicitly with the platform's invocation syntax.

### Universal activation examples

- "Use FluidUI to make this webpage look premium and modern."
- "Use FluidUI to improve the motion and responsiveness of this dashboard."
- "Use FluidUI to create a futuristic landing page with smooth animations."
- "Use FluidUI to refine the existing interface without changing functionality."
- "Use FluidUI to review the page first and tell me what deserves attention before you edit."
- "Use FluidUI to fix hover and focus states across the navigation and forms."

In each case the skill should inspect the code first, state a direction, make real changes, test what is available, and report honestly.

## Updating

Inside an installed clone:

```bash
git pull --ff-only
```

If the agent does not detect the update, use its reload command or restart it. Do not edit a copied skill independently; keep changes upstream in this repository.

## Troubleshooting

| Symptom | Check |
| --- | --- |
| Skill not listed | Folder is named `fluidui`; `SKILL.md` sits directly inside it; frontmatter has `name` and `description`. |
| Stale content after update | Run `git pull --ff-only`, then reload or restart the agent. |
| Duplicate skill IDs | Remove duplicate installs or align them to the same clone; project-level sources usually override global ones. |
| Gemini CLI skill not loading | Workspace must be trusted; activation requires consent; check `/skills list`. |
| Cursor Cloud Agent missing skill | Only `~/.cursor/skills/` syncs by default; use that path or configure sync. |
| Windows path problems | Use `$HOME` in PowerShell and quoted paths such as `".opencode\skills\fluidui"`. |
| No visual verification | The skill reports source-only review when the agent has no browser tool; it does not claim unrun checks passed. |

## Compatibility and limitations

- There is one core skill; integration files are installation documentation, not alternate instruction sets.
- The Agent Skills specification defines the artifact, not a universal installer. Discovery is automatic only when the host client implements it.
- Runtime discovery was verified for OpenCode only. Other platforms are documented from official sources but were not runtime-tested here.
- Browser and performance checks depend on the host agent's tools; see [docs/VALIDATION_REPORT.md](docs/VALIDATION_REPORT.md) for what was actually run.
- Examples are teaching demos, not production applications.
- Visual judgment remains the agent's responsibility: the checklists guide decisions but do not replace them.

## Repository layout

```text
SKILL.md                  Single authoritative, platform-neutral skill
references/               Design, motion, accessibility, interaction, testing guides
examples/                 Five standalone, dependency-free demos
integrations/             Per-platform installation documentation
scripts/validate.mjs      Structure, metadata, link, example, and security checks
tests/                    Baseline fixture and recorded scenario
docs/COMPATIBILITY.md     Platform matrix with official sources
docs/VALIDATION_REPORT.md Validation and security record
.opencode/skills/fluidui/ Thin OpenCode discovery adapter
```

### Examples

| Example | Demonstrates |
| --- | --- |
| `examples/minimal/` | Editorial calm, restrained reveal, strong hierarchy |
| `examples/futuristic/` | High-contrast console UI, tabs, disciplined glow |
| `examples/dashboard/` | Data hierarchy, loading skeleton, filtering, range controls |
| `examples/animated-landing/` | Cinematic entrance, subtle scroll parallax, sticky sections |
| `examples/mobile-app/` | Mobile-first app, filter chips, stepper, tabs, accessible dialog |

Open an example's `index.html` directly in a browser; there is no build step or network dependency.

## Validation

Run local checks with Node 18 or newer:

```bash
node scripts/validate.mjs
```

The script checks Agent Skills metadata, structure, links, examples, platform docs, and a basic secret/path scan. See [docs/VALIDATION_REPORT.md](docs/VALIDATION_REPORT.md) and [tests/test-scenario.md](tests/test-scenario.md).

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Keep changes focused, dependency-free, and verified with the validation script.

## License

MIT — see [LICENSE](LICENSE).
