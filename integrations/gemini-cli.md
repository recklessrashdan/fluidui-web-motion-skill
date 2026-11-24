# Gemini CLI integration

**Official documentation:** [Agent Skills](https://geminicli.com/docs/cli/skills/), [Creating skills](https://geminicli.com/docs/cli/creating-skills/), [Skills tutorial](https://geminicli.com/docs/cli/tutorials/skills-getting-started/).

**Support:** Native Agent Skills discovery based on the open standard.

## Workspace-level installation

```bash
mkdir -p .gemini/skills
git clone --depth 1 https://github.com/recklessrashdan/fluidui-web-motion-skill.git .gemini/skills/fluidui
```

The `.agents/skills/fluidui` alias is also discovered. Within a discovery tier, `.agents/skills` takes precedence over `.gemini/skills`.

## User-level installation

Clone into `~/.gemini/skills/fluidui` (PowerShell: `$HOME/.gemini/skills/fluidui`), or `~/.agents/skills/fluidui`.

Gemini CLI also documents a remote installer:

```bash
gemini skills install https://github.com/recklessrashdan/fluidui-web-motion-skill.git --consent
```

## Discovery and use

At session start, Gemini CLI injects skill names and descriptions. The model activates a skill, then the user approves a consent prompt before the body is loaded. Check with `/skills list` (or `gemini skills list --all`) and refresh with `/skills reload`.

## Verified status

**DOCUMENTED / NOT RUNTIME-TESTED.** Paths, commands, and the consent flow come from official Gemini CLI documentation. The CLI was not installed in the validation environment, so no live discovery test was performed.

## Limitations

- Workspace skills require a trusted workspace.
- Activation requires user consent; a skill being listed does not mean its body was loaded.
- Google's transition notice states that unpaid and Google One tiers were replaced by Antigravity CLI on June 18, 2026; enterprise access remains unchanged.
- Custom commands are a separate mechanism (TOML files under `.gemini/commands/`), not Agent Skills.
