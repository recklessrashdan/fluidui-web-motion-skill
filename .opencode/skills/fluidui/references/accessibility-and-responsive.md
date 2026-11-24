# Accessibility and responsive design

## Accessibility checklist

- Semantics: real headings in order, landmarks (`header`, `nav`, `main`, `footer`), buttons for actions, links for navigation.
- Keyboard: every interactive element reachable and operable; no keyboard traps unless correctly managed inside a dialog.
- Focus: never remove outlines without a visible replacement; `:focus-visible` styling must be clear in every theme.
- Labels: form controls have programmatic labels; icon-only controls have accessible names; errors are announced.
- Contrast: text and meaningful UI meet WCAG AA; check hover, active, disabled, and placeholder states too.
- Motion: honor `prefers-reduced-motion`, avoid flashing, avoid large/violent movement, provide static equivalents.
- Content: never hidden until animation completes; no essential meaning conveyed by color or animation alone.
- Touch: comfortable target sizes and spacing; hover is an enhancement, not a requirement.
- State: loading, empty, error, and success states are understandable without animation or color alone.

Reduced-motion global fallback is in `SKILL.md`. When a project has its own system, adapt rather than override it wholesale.

## Responsive checklist

- Inspect current breakpoints and content-driven breakpoints; do not copy a desktop grid to mobile.
- Test roughly 360, 390, 768, 1024, 1440, and 1920 px widths (and a short landscape viewport if relevant).
- No horizontal scrolling of the document; check long words, tables, code, images, and fixed-width components.
- Fluid type (`clamp`) or a deliberate scale; maintain line length and hierarchy.
- Navigation: collapse or restructure on small screens; keep the primary action reachable.
- Spacing: preserve rhythm; reduce large section padding on phones without making elements cramped.
- Touch: larger targets, simpler hover effects, no hover-only menus, careful modal height on small screens.
- Motion: fewer simultaneous effects on mobile; disable parallax/large blurs where they cost frames.

## Quick verification

1. Resize through each width and check reading order, overflow, and tap targets.
2. Tab through the page: visible focus, logical order, working dialogs and menus.
3. Enable OS reduced-motion (or emulate via browser devtools) and confirm content is fully present and usable.
4. Disable JavaScript: core content and navigation still work.
