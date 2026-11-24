# Claude Code integration

**Official documentation:** [Extend Claude with skills](https://code.claude.com/docs/en/skills.md).

**Support:** Native. Claude Code states that its skills follow the open Agent Skills standard, with some Claude-specific extensions. FluidUI uses only the portable fields (`name`, `description`, `license`, `compatibility`).

## Project-level installation

```bash
mkdir -p .claude/skills
git clone --depth 1 https://github.com/recklessrashdan/fluidui-web-motion-skill.git .claude/skills/fluidui
```

PowerShell:

```powershell
New-Item -ItemType Directory -Force ".claude\skills" | Out-Null
git clone --depth 1 https://github.com/recklessrashdan/fluidui-web-motion-skill.git ".claude\skills\fluidui"
```

Commit the resulting directory to share the skill with collaborators.

## User-level installation

Clone into `~/.claude/skills/fluidui` (PowerShell: `$HOME/.claude/skills/fluidui`). Personal skills are available in all projects on that machine.

## Discovery and use

Claude Code discovers skills in `.claude/skills/`, `~/.claude/skills/`, nested `.claude/skills/` directories, managed-settings directories, plugin skills, and `--add-dir` sources. It loads a skill when the request matches, or on explicit `/fluidui`. Use `/reload-skills` to force a refresh after changes.

## Verified status

**DOCUMENTED / NOT RUNTIME-TESTED.** Paths and behavior above come from the official Claude Code documentation. The Claude Code CLI was not installed in the validation environment, so no live discovery test was performed.

## Limitations

- Claude Code accepts extra frontmatter fields that are not portable; this repository deliberately avoids them.
- Managed enterprise skills and skills synced from claude.ai are separate installation tiers.
- The root [`SKILL.md`](../SKILL.md) is authoritative; do not edit a copied skill independently.
