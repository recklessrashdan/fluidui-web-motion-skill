# Cursor integration

**Official documentation:** [Agent Skills](https://cursor.com/docs/skills), [Plugins](https://cursor.com/docs/plugins), [Plugin reference](https://cursor.com/docs/reference/plugins).

**Support:** Native Agent Skills discovery based on the open standard.

## Project-level installation

```bash
mkdir -p .cursor/skills
git clone --depth 1 https://github.com/recklessrashdan/fluidui-web-motion-skill.git .cursor/skills/fluidui
```

The generic `.agents/skills/fluidui` path is also discovered by Cursor.

## User-level installation

Clone into `~/.cursor/skills/fluidui` (PowerShell: `$HOME/.cursor/skills/fluidui`), or the generic `~/.agents/skills/fluidui`.

## Discovery and use

Cursor automatically discovers skills at startup from `.cursor/skills/`, `.agents/skills/`, and compatibility paths including `.claude/skills/` and `.codex/skills/`. The model chooses relevant skills; `/fluidui` invokes it manually. Manage installed skills under **Customize → Skills**.

## Verified status

**DOCUMENTED / NOT RUNTIME-TESTED.** Paths and invocation come from official Cursor documentation. Cursor is installed in the validation environment, but no live skill-discovery test was performed, so this is not claimed as verified.

## Limitations

- Cursor notes that skills are not imported on their own; for team distribution, package them in a plugin/marketplace or commit the project-level directory.
- Only `~/.cursor/skills/` syncs to Cloud Agents; `~/.agents/skills/` and unsynced local skills do not.
- Skill `name` must match the parent folder name; keep the folder named `fluidui`.
- For remote SSH and Cloud Agent use, review Cursor's sync settings separately.
