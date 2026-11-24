# OpenCode integration

**Official documentation:** [Skills](https://opencode.ai/docs/skills/), [Migration guide](https://opencode.ai/docs/migrate-v1/).

**Support:** Native Agent Skills discovery. OpenCode scans project sources up to the project root and user-level sources, advertises skills with a `description`, and loads the body on demand.

## Project-level installation

```bash
mkdir -p .opencode/skills
git clone --depth 1 https://github.com/recklessrashdan/fluidui-web-motion-skill.git .opencode/skills/fluidui
```

PowerShell:

```powershell
New-Item -ItemType Directory -Force ".opencode\skills" | Out-Null
git clone --depth 1 https://github.com/recklessrashdan/fluidui-web-motion-skill.git ".opencode\skills\fluidui"
```

## User-level installation

Clone into `~/.config/opencode/skills/fluidui` (PowerShell: `$HOME/.config/opencode/skills/fluidui`). OpenCode also discovers compatibility locations such as `~/.agents/skills` and `.agents/skills`.

## Discovery and use

The directory name is the skill ID, so the install path must end in `fluidui`. Skills with a description are advertised to the model; invoke explicitly with `@fluidui` or through OpenCode's skill tool. OpenCode reloads skills after file changes; restart or force a refresh if a new skill does not appear.

This repository also contains a thin adapter at `.opencode/skills/fluidui/SKILL.md` for developing the skill in place. It points to the root [`SKILL.md`](../SKILL.md); it is not a second copy of the instructions.

## Verified status

**VERIFIED.** Discovery and loading by ID `fluidui` was confirmed in a fresh session. See [`docs/VALIDATION_REPORT.md`](../docs/VALIDATION_REPORT.md).

## Limitations

- Later discovery sources override duplicate IDs; project `.opencode/skills` outranks global skills.
- OpenCode does not document an `opencode skills install` command; installation is by placing the directory or configuring a `skills` source in `opencode.json(c)`.
- V2 does not enforce lowercase kebab-case IDs, but FluidUI follows the portable specification anyway.
