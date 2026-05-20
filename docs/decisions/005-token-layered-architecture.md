# ADR 005 — Layered token architecture

**Date:** 2025  
**Status:** Accepted

## Context

Design tokens need to serve multiple purposes: define raw values, enable theming, provide semantic meaning to components, and support light/dark color modes. The question was how to structure the token hierarchy to satisfy all these needs without creating coupling or confusion.

## Decision

Tokens follow a **four-layer architecture**:

```
_Primitive Color  ──┐
                    ├──▶  Theme  ──▶  Color         (light / dark)
_Tailwind CSS  ─────┘                Foundations
                                     Typography     (desktop / mobile)
```

- **`_Primitive Color` and `_Tailwind CSS`** (prefixed with `_`) — internal raw values. Never referenced by components.
- **`Theme`** — public, customizable by the user. Maps primitives to semantic roles (e.g., `brand → blue`). This is where a consumer would override the brand color. Never consumed directly by components.
- **`Color`, `Foundations`, `Typography`** — public semantic tokens. The only layer components consume.

## Rationale

- **Separation between "what the value is" and "what it means":** A primitive `#1D4ED8` has no semantic meaning. The `Theme` layer gives it a role (`brand`). The `Color` layer gives it context (`--color-text-brand`, `--color-fill-selected-high`). Components reference context, not values.
- **Theming without touching components:** A consumer who wants to change the brand color from blue to green only needs to override the `Theme` layer. The change propagates automatically to all `Color` tokens and therefore to all components — no component code changes required.
- **`_` prefix convention mirrors Figma:** In the Figma file, internal collections use the `_` prefix to signal they are not for external consumption. The code follows the same convention for clarity and consistency between design and implementation.
- **Light/dark mode via CSS attribute:** `Color` tokens are generated as two CSS blocks — one for `[data-theme="light"]` and one for `[data-theme="dark"]`. Toggling the `data-theme` attribute on the root element switches the entire color system. No JavaScript theme logic is needed in components.

## Consequences

- Components are completely decoupled from color mode — they respond to theme changes automatically via CSS cascade.
- Adding a new color mode (e.g., high-contrast) requires only a new CSS block in the `Color` layer, with no changes to any component.
- The `_Primitive` and `_Tailwind` collections are excluded from the Style Dictionary public output, preventing accidental use.
