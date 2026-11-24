# Design decisions

## Inspect before acting

Answer these from the code and content, not from assumption:

1. **Purpose:** What does the user come here to do or understand? What is the primary action?
2. **Audience:** Expert or novice? Casual or high-stakes? What tone builds trust?
3. **Content:** Long-form, visual, data-heavy, transactional? What should dominate the page?
4. **Stack:** Framework, styling approach, build tooling, existing dependencies and motion library.
5. **Strengths:** What already works? Preserve it and match its conventions.
6. **Weaknesses:** Hierarchy, spacing, alignment, color consistency, layout balance, navigation, states, accessibility, motion quality.
7. **Motion inventory:** What moves today, why, and does it help? What should stay static?
8. **Scope:** Is a small refinement enough, or is the underlying structure the problem?

## Intervention matrix

| Signal | Preferred intervention |
| --- | --- |
| Good structure, weak polish | Refine type scale, spacing rhythm, color roles, elevation; add purposeful micro-feedback |
| Interactions feel unresponsive | Add/standardize hover, focus, active, disabled, loading states |
| Motion is absent or lifeless | Add a small vocabulary: entrance, reveal, state feedback; stagger sparingly |
| Motion is excessive or janky | Remove loops, reduce duration/blur, animate transform/opacity, honor reduced motion |
| Layout is cramped or unbalanced | Rework grid, whitespace, and reading order before adding decoration |
| Visual identity is unclear or generic | Define tokens from brand/content; choose one distinct typographic or color idea |
| Structure fights the task | Partial or full redesign, with explicit user-facing rationale |
| Mobile is a broken desktop shrink | Replan navigation, component order, spacing, and touch targets at small widths |

Scope terms: **layout change** keeps the same content and information architecture and improves grid, rhythm, and reflow. **Partial redesign** replaces significant component patterns but keeps the core structure. **Full redesign** changes information architecture, navigation model, or visual identity. Choose the smallest category that solves the identified problem.

## Token worksheet

Write down the direction before editing so choices stay coherent:

- **Type:** one heading face + one body face (or one family with clear weights), 5–7 step scale, line length target.
- **Space:** a base unit (4 or 8 px) and a small set of increments; use spacing to group, not to fill.
- **Color:** one neutral family, one primary accent, one semantic set for success/warning/error. Check contrast.
- **Surface/elevation:** flat vs layered; define shadow or border roles, not ad hoc per card.
- **Motion:** one easing pair, a short duration set, and a rule for when motion is used.

## Anti-patterns to reject

- A gradient, glow, or glass panel on every section.
- Identical card grids regardless of content hierarchy.
- Animating everything on load or on every scroll event.
- Decorative effects that cover text, distract from the primary action, or slow the user.
- Redesigning because the skill was invoked, not because the project needed it.

## Reporting template

```markdown
## What changed
- Design: ...
- Motion: ...
- Responsive: ...
- Accessibility: ...

## Checks performed
- Build/lint/typecheck: passed | failed | not available
- Browser widths tested: ...
- Reduced motion: verified | not tested
- Remaining issues: ...
```

Never report a check as passed unless it was actually run.
