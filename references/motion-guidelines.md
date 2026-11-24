# Motion and performance

## Timing vocabulary

| Action | Duration | Easing | Notes |
| --- | --- | --- | --- |
| Button/icon/toggle feedback | 120–200 ms | ease-out or custom cubic-bezier | Immediate, small transform or color change |
| Input focus / underline | 150–250 ms | ease-out | Never delay typing or focus indication |
| Entrance / scroll reveal | 200–400 ms | ease-out | Reveal near viewport; keep content visible if JS fails |
| Modal / dropdown | 180–300 ms | ease-in-out | Animate opacity + small translate/scale |
| Page/route transition | 300–500 ms | ease-in-out | Keep navigation responsive; avoid blocking content |
| Stagger step | 40–80 ms | same as parent | Cap total stagger; never hundreds of items |
| Ambient loop | Avoid | — | Only for genuine ongoing state (e.g., live indicator) |

Example easing: `--ease-out: cubic-bezier(0.22, 1, 0.36, 1);`

## Small, reusable recipes

Simple reveal (progressive enhancement: content is visible by default):

```css
.js .reveal { opacity: 0; transform: translateY(12px); transition: opacity .35s var(--ease-out), transform .35s var(--ease-out); }
.js .reveal.is-visible { opacity: 1; transform: none; }
@media (prefers-reduced-motion: reduce) {
  .js .reveal { opacity: 1; transform: none; transition: none; }
}
```

Add `.js` to the root element only when the observer script is running, and reveal all elements immediately if the observer is unsupported. Essential content must never depend on JavaScript.

Modal open/close: animate `opacity` and `transform: translateY(8px) scale(.98)`; set `display`/visibility outside the transition, keep focus handling synchronous, and close immediately on Escape.

Scroll parallax: use `transform` driven by a throttled/`requestAnimationFrame` scroll handler or CSS `animation-timeline` where supported; keep movement small (a few percent of viewport), and disable it under reduced motion and on low-power mobile where appropriate.

Hover/tap feedback: keep hover and focus visually equivalent; add `:active` for press feedback; touch users get state changes on tap without needing hover.

## Performance checklist

- Animate `transform` and `opacity` first; compositor-friendly.
- Avoid animating `width`, `height`, `top`, `left`, margins, `box-shadow`, or large blur areas.
- Add `will-change` only to a few elements immediately before an animation, and remove it afterward.
- Avoid synchronous layout reads inside scroll handlers; batch with `requestAnimationFrame`.
- Cap simultaneous animations; do not animate long lists or entire grids at once.
- No infinite CSS animations that consume battery without conveying state.
- Test on a small viewport and, if possible, with CPU throttling; remove effects that stutter.

## Library decision

Use native CSS by default. Adopt Framer Motion, GSAP, Motion One, or a framework equivalent only when the project already uses it, or when the required sequencing/gestures/route transitions are impractical in CSS. State the reason before adding a dependency; add one library, not a stack of them.
