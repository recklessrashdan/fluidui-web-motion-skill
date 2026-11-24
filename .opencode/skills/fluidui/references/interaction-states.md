# Interaction states

## State matrix

| Element | Default | Hover | Focus | Active / pressed | Disabled | Loading |
| --- | --- | --- | --- | --- | --- | --- |
| Button | clear label and hierarchy | subtle color or 1–2 px lift | visible ring, same affordance | brief press-down or darker fill | muted, `aria-disabled`, no fake action | spinner or label change, prevent duplicate submit |
| Link | distinguishable from text | underline or color shift | visible ring/underline | brief opacity shift | `aria-disabled` if applicable | n/a |
| Nav item | current state marked | subtle background/underline | visible ring | pressed feedback | n/a | n/a |
| Input | border, label, hint | slight border shift | strong ring, no layout jump | caret visible | disabled styling, not focusable | inline progress if async |
| Card (interactive) | clear affordance | elevation/border shift | ring on the focusable element | press feedback | muted, no pointer action | skeleton only while loading |
| Dialog | backdrop + surface | n/a | focus moves in, returns on close | n/a | n/a | disable actions while saving |

Do not add a state that cannot actually occur. Every control must do what its label promises.

## Feedback patterns

- Prefer small transforms and color changes over large movement.
- Provide immediate feedback on click/tap; async actions show pending state and a final success/error result.
- Validate forms inline with text and `aria-describedby`; do not rely on red borders alone.
- Toasts: polite for confirmations, assertive for errors; auto-dismiss only when loss of information is acceptable.
- Tooltips: supplement, never replace, labels; dismissible with Escape and on blur.
- Switches/sliders: native inputs or correct ARIA roles; keep keyboard semantics and value announcements.

## Implementation notes

- Keep hover and `:focus-visible` styles visually related.
- Use `prefers-reduced-motion` for transforms; color/feedback should still work.
- Do not trap focus except in a modal with a close path; always restore focus to the trigger.
- Avoid `pointer-events: none` on elements that must remain keyboard accessible.
