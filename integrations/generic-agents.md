# Generic Agent Skills installation

**Official documentation:** [Specification](https://agentskills.io/specification.md), [Client implementation guide](https://agentskills.io/client-implementation/adding-skills-support.md), [Quickstart](https://agentskills.io/skill-creation/quickstart.md).

**Support:** The open Agent Skills specification defines the skill artifact, not a universal installer. Any client that implements the standard can load FluidUI from a conforming directory.

## Installation

The specification's recommended cross-client location is `.agents/skills/`:

```bash
mkdir -p .agents/skills
git clone --depth 1 https://github.com/recklessrashdan/fluidui-web-motion-skill.git .agents/skills/fluidui
```

For user-wide availability, clone into `~/.agents/skills/fluidui` (PowerShell: `$HOME/.agents/skills/fluidui`). Clients may also scan `<project>/.<client>/skills/` and `~/.<client>/skills/`.

## Conformance

The repository root contains a single authoritative [`SKILL.md`](../SKILL.md) with lowercase `name: fluidui`, a non-empty activation `description`, `license`, and a short `compatibility` field. Supporting `references/`, `examples/`, `scripts/`, and `tests/` directories follow the specification's optional layout. If the `skills-ref` CLI is available, check conformance with:

```bash
skills-ref validate ./fluidui
```

## Verified status

**SPEC-CONFORMANT / NOT RUNTIME-TESTED.** Frontmatter, directory layout, and links are checked by [`scripts/validate.mjs`](../scripts/validate.mjs). Actual discovery depends on the host client and was not tested for arbitrary agents.

## Limitations

- Discovery is automatic only if the host client implements it; there is no universal `skills install` command.
- The specification does not mandate where skill directories live.
- Do not edit a copied skill independently; update the clone from this repository instead.
