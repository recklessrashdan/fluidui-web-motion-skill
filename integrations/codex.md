# Codex integration

**Official documentation:** [Build skills](https://developers.openai.com/codex/skills.md), [Customization concepts](https://developers.openai.com/codex/concepts/customization.md).

**Support:** Native. Codex states that skills build on the open Agent Skills standard; standalone skills work in Codex CLI and the IDE extension.

## Project-level installation

```bash
mkdir -p .agents/skills
git clone --depth 1 https://github.com/recklessrashdan/fluidui-web-motion-skill.git .agents/skills/fluidui
```

Codex scans `.agents/skills` from the current working directory up to the repository root, so this also covers parent repositories.

## User-level installation

Clone into `$HOME/.agents/skills/fluidui` (PowerShell: `$HOME/.agents/skills/fluidui`). Admin skills under `/etc/codex/skills` are a separate managed tier.

## Discovery and use

Codex detects skill changes automatically; restart it if an update does not appear. The description drives implicit activation; `/skills` or `$fluidui` invokes the skill explicitly. Native helpers `$skill-creator` and `$skill-installer` exist, but cloning this repository keeps one authoritative copy.

## Verified status

**DOCUMENTED / NOT RUNTIME-TESTED.** Paths and discovery behavior come from official Codex documentation. The Codex CLI was not installed in the validation environment, so no live discovery test was performed.

## Limitations

- The canonical documentation uses `$HOME/.agents/skills`; a separate use-case page mentions `~/.codex/skills`, which was not treated as current canonical behavior here.
- Optional `agents/openai.yaml` metadata can configure invocation policy for Codex, but FluidUI does not require it.
- Do not maintain a second copy of the core instructions inside the clone.
