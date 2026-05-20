# ADR 002 — Design tokens as an independent package

**Date:** 2025  
**Status:** Accepted

## Context

Design tokens (colors, spacing, typography, radius, elevation) need to be consumed by components and by the Storybook app. The question was where these tokens should live and in what format they should be distributed.

Options considered:

- **Tokens co-located inside `packages/components`** — tokens and components in the same package
- **Tokens as a separate package (`@acciano/tokens`)** — independent package that outputs CSS files
- **Tokens as a JS/TS module** — exported as JavaScript objects instead of CSS custom properties

## Decision

Tokens live in **`packages/tokens`** as an independent package that outputs CSS custom properties via Style Dictionary. Components consume tokens via `var(--token-name)` in CSS, never by importing JS values.

## Rationale

- **Separation of concerns:** Tokens represent the visual foundation of the system — they should be independent from component implementation. This allows tokens to evolve without touching component code, and vice versa.
- **CSS custom properties are the right primitive:** Custom properties work natively in CSS, support live theme switching via `data-theme` attribute, cascade correctly, and require no runtime JavaScript. A JS token object would require either CSS-in-JS or a build step to inject values.
- **Style Dictionary as the build tool:** The JSON source format (exported directly from Figma) is human-readable and tooling-agnostic. Style Dictionary transforms it into multiple CSS outputs (color modes, typography breakpoints, elevation) in a single build step.
- **Consumed by any consumer:** Because the output is plain CSS, any future project that uses Acciano components just needs to import the CSS files — no framework coupling.

## Consequences

- Components never hardcode visual values. Every color, spacing value, radius, and shadow references a `var(--token-name)`.
- The `packages/tokens/dist/` directory is intentionally committed to the repository so that the Storybook app works immediately after cloning, without requiring a build step first.
- Token architecture follows a layered model: `_Primitive Color → Theme → Color / Foundations / Typography`. Components only consume the public semantic layer (`Color`, `Foundations`, `Typography`) — never primitives or theme aliases directly.
