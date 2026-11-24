# Contributing

Contributions are welcome. Keep the skill small enough that an agent can follow it without burning context.

## Guidelines

1. Change the root [`SKILL.md`](SKILL.md) only for core instructions. Put depth in `references/`.
2. Keep the core skill platform-neutral. Tool-specific commands belong in `integrations/` and `docs/COMPATIBILITY.md`.
3. Keep examples standalone, dependency-free, and accessible. Every demo must include a reduced-motion path.
4. Prefer native CSS and platform APIs over new packages.
5. Run `node scripts/validate.mjs` before opening a pull request.
6. Never add credentials, private paths, telemetry, or remote assets.
7. Report validation results honestly, including anything not tested.

## Platform support changes

- Use official documentation as the source of truth and link it in the integration guide.
- Distinguish native support from manual installation and from runtime-verified discovery.
- Do not add a second copy of the core instructions; adapters must stay thin and point to the root `SKILL.md`.
- Update the compatibility matrix when platform paths or verification status change.

## Suggested improvements

- Additional framework-specific notes backed by real project testing.
- New examples that demonstrate a distinct visual direction.
- Clearer checks for interaction states or responsive edge cases.
- Runtime discovery tests for platforms currently marked documented but not tested.

Keep the repository's MIT license and attribution intact.
