# ADR 011 — Logos como pacote independente

**Date:** 2025  
**Status:** Accepted

## Context

The Acciano Design System includes brand logos (the Acciano logo and potentially others). Logos are distinct from icons: they are multi-path, multi-color SVG compositions that represent brands, not UI affordances.

The main options considered were:

- **Logos inside `packages/icons`** — same package as custom and brand icons
- **Logos inside `packages/components`** — treated as regular UI components
- **Logos as an independent package (`packages/logos`)** — separate from both icons and components

## Decision

Create a dedicated **`packages/logos`** package, independent from `packages/icons` and `packages/components`.

## Rationale

- **Different nature from icons:** Icons are single-color, size-agnostic glyphs consumed by UI components. Logos are brand assets with fixed proportions, specific colors, and compositions that must not be altered. Mixing them would blur this distinction.
- **Different consumption pattern:** Logos are used in specific, intentional contexts (headers, footers, about pages). Icons are used throughout the component system. Separating them makes the API surface of each package cleaner.
- **Independent versioning:** Logo assets may change at a different cadence than icons or components. A separate package allows updates to be isolated.
- **Internal composition pattern:** Each logo exposes a single public component (e.g. `LogoAcciano`) that internally composes a `_Symbol` — the isolated brand mark. The `_Symbol` follows the same `_` convention as internal tokens and is never exported directly.

## Consequences

- `packages/logos` is a standalone npm workspace package with its own `package.json` and `index.ts`.
- Logo components use inline styles (no CSS module) so they work directly from `dist` without requiring CSS injection by the consumer.
- The build order in the monorepo root is: `tokens → icons → logos → components`.
