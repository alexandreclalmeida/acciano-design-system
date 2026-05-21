# ADR 010 — Tipografia responsiva via media query

**Date:** 2025  
**Status:** Accepted

## Context

The Acciano Design System defines two sets of typography values: one for desktop and one for mobile. Font sizes, line heights, and other typographic properties need to adapt to the viewport without requiring component-level media queries.

The main options considered were:

- **Component-level media queries** — each component handles its own typographic breakpoints
- **CSS custom properties with a global media query** — token values swapped at the `:root` level via `@media`
- **Fluid typography with `clamp()`** — continuous scaling between breakpoints

## Decision

Use **CSS custom properties redefined inside a global `@media (max-width: 768px)` block** at `:root` level.

## Rationale

- **Components stay breakpoint-agnostic:** A component references `var(--font-size-h1)` and automatically gets the correct value for the current viewport. No per-component media queries needed.
- **Single point of control:** All typographic breakpoints are defined once, in the token output. Adding or adjusting a breakpoint value requires changing only the token source.
- **Mirrors the Figma structure:** The `Typography` collection has explicit `Desktop` and `Mobile` modes. The CSS output reflects that structure directly.
- **`clamp()` was ruled out:** Fluid scaling introduces intermediate values not defined in the design — any size between desktop and mobile would be arbitrary, diverging from the Figma source of truth.

## Consequences

- Style Dictionary generates a base `:root` block with desktop values and a `@media (max-width: 768px)` block that overrides them with mobile values.
- The breakpoint (768px) is the single canonical threshold for typography. Layout breakpoints for components may differ and are handled separately.
- Components never hard-code font sizes — they always consume `var(--font-size-*)` and `var(--line-height-*)` tokens.
