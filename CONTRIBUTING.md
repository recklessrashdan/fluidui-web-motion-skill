# Contributing

Contributions are welcome. Keep the skill small enough that an agent can follow it without burning context.

## Guidelines

1. Change `SKILL.md` only for core instructions. Put depth in `references/`.
2. Keep examples standalone, dependency-free, and accessible. Every demo must include a reduced-motion path.
3. Prefer native CSS and platform APIs over new packages.
4. Run `node scripts/validate.mjs` before opening a pull request.
5. Never add credentials, private paths, telemetry, or remote assets.
6. Report validation results honestly, including anything not tested.

## Suggested improvements

- Additional framework-specific notes backed by real project testing.
- New examples that demonstrate a distinct visual direction.
- Clearer checks for interaction states or responsive edge cases.

Keep the repository's MIT license and attribution intact.
