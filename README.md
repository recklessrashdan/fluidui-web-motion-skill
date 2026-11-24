# FluidUI

**Design that flows.**

FluidUI is a reusable OpenCode skill for building, redesigning, and refining websites with thoughtful interfaces, fluid motion, strong responsiveness, and accessible interactions. It does not impose a house style: it inspects the project and chooses a visual direction that fits the product's purpose, audience, and content.

## Why it exists

Most "make it beautiful" prompts produce the same generic layout. FluidUI replaces that reflex with a decision process: inspect first, identify what actually needs work, choose a proportion of refined minimalism and bold futurism, then make a small coherent set of changes and verify them.

## Features

- **Adaptive design decisions** — refinement, interaction polish, motion work, layout change, partial redesign, or full redesign, chosen from evidence.
- **Purpose-fit visual systems** — typography, spacing, color, elevation, and motion tokens derived from the project, not a preset template.
- **Fluid motion engineering** — purposeful micro-interactions, entrances, reveals, and transitions using `transform` and `opacity` first.
- **Accessibility by default** — `prefers-reduced-motion`, keyboard access, visible focus, contrast, and content that works without JavaScript animation.
- **Responsive judgment** — layout re-planning at small widths instead of a shrunken desktop page.
- **Interaction quality** — real default, hover, focus, active, disabled, and loading states for meaningful controls.
- **Stack adaptability** — works within existing HTML/CSS/JS, React, Next.js, Vue, Svelte, Tailwind, or other frontend stacks.
- **Honest reporting** — distinguishes passed, failed, and not-tested checks.

## Installation

Copy the skill directory into the project where you use OpenCode:

```text
<your-project>/.opencode/skills/fluidui/
```

The directory must contain `SKILL.md`. From a clone of this repository on PowerShell:

```powershell
Copy-Item -Recurse .opencode\skills\fluidui <your-project>\.opencode\skills\fluidui
```

To make it available in every project, copy it to your global OpenCode skills directory instead:

```text
~/.config/opencode/skills/fluidui/
```

OpenCode also discovers compatibility locations such as `~/.claude/skills` and `~/.agents/skills`, plus the project-local `.claude/skills` and `.agents/skills`. Project `.opencode/skills` has the highest discovery precedence. OpenCode reloads skills after files change; `/reload` forces a refresh if needed.

## Usage with OpenCode

OpenCode advertises the skill from its description, so an agent can load it automatically when a request matches. You can also request it explicitly with `@fluidui`.

```text
@fluidui Improve this landing page's hierarchy, motion, and mobile layout.
```

```text
@fluidui Review the existing dashboard. Tell me what to refine before changing anything.
```

```text
@fluidui Our site feels generic. Choose a visual direction that fits our brand and apply it.
```

### Activation examples

- "Make this page feel premium without slowing it down."
- "Fix the hover and focus states across the navigation and forms."
- "Our scroll animations are janky and ignore reduced motion."
- "Redesign the mobile layout; the desktop version does not shrink well."
- "Add a loading and empty state that match the current design system."

In each case the skill should inspect the code first, state a direction, make real changes, test what is available, and report honestly.

## What is included

```text
.opencode/skills/fluidui/SKILL.md                  Core instructions
.opencode/skills/fluidui/references/               Detailed decision and check guides
examples/                                          Five standalone, dependency-free demos
tests/                                             Baseline fixture and recorded scenario
scripts/validate.mjs                               Local structure, reference, and security checks
```

### Examples

| Example | Demonstrates |
| --- | --- |
| `examples/minimal-professional` | Editorial calm, restrained reveal, strong hierarchy |
| `examples/bold-futuristic` | High-contrast console UI, tabs, disciplined glow |
| `examples/smooth-dashboard` | Data hierarchy, loading skeleton, filtering, range controls |
| `examples/animated-landing` | Cinematic entrance, subtle scroll parallax, sticky sections |
| `examples/responsive-mobile` | Mobile-first app, filter chips, stepper, tabs, accessible dialog |

Open an example's `index.html` directly in a browser; there is no build step or network dependency.

## Animation philosophy

Motion should orient, confirm, or guide attention — not decorate. Prefer short, calm transitions with consistent easing; animate `transform` and `opacity` rather than layout properties; stagger sparingly; avoid endless loops. CSS is the default. An animation library is added only when the project already uses one or when the required behavior is impractical without it.

## Accessibility

Reduced motion is mandatory. Content is never hidden until an animation succeeds, hover is never the only path, focus stays visible, keyboard operation is preserved, and contrast is checked across states. The skill includes a global reduced-motion fallback that can be adapted to an existing motion system.

## Limitations

- The skill provides instructions; it cannot inspect or test a browser unless the host agent has browser tools.
- It does not install frameworks or dependencies for styling or animation by default.
- Examples are teaching demos, not production applications.
- Visual judgment remains the agent's responsibility: the checklists guide decisions but do not replace them.

## Validation

Run local checks with Node 18 or newer:

```powershell
node scripts/validate.mjs
```

The script checks skill structure, frontmatter, references, example integrity, and a basic secret/path scan. See `tests/test-scenario.md` for the recorded design-analysis scenario.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Keep changes focused, dependency-free, and verified with the validation script.

## License

MIT — see [LICENSE](LICENSE).
