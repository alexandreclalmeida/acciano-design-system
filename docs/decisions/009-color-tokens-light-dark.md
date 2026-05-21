# ADR 009 — Tokens de cor por modo (light/dark)

**Date:** 2025  
**Status:** Accepted

## Context

The Acciano Design System supports light and dark themes. Color tokens need to change based on the active theme without requiring any changes to component code.

The main options considered were:

- **Duplicate CSS classes** — separate `.light` and `.dark` class sets per component
- **CSS custom properties with `data-theme`** — single property name, value swapped by a data attribute on the root element
- **JavaScript-driven theming** — theme applied via inline styles or a JS context

## Decision

Use **CSS custom properties scoped to `[data-theme]`**, with `:root` and `[data-theme="light"]` sharing the same light values and `[data-theme="dark"]` overriding them.

## Rationale

- **Components stay theme-agnostic:** A component always references `var(--color-text-high)` — it has no knowledge of which theme is active. The cascade handles the swap.
- **Single source of change:** Switching themes requires only toggling a `data-theme` attribute on the root element. No JavaScript logic needed inside components.
- **Aligns with the token architecture:** The `Color` collection in Figma already has explicit `light` and `dark` modes. The CSS output mirrors that structure directly.
- **JavaScript-driven theming adds unnecessary complexity:** Inline styles or context-based theming would bypass the cascade, making overrides harder and breaking the token contract.

## Consequences

- Style Dictionary generates two CSS blocks: `:root, [data-theme="light"]` and `[data-theme="dark"]`.
- The Storybook `addon-themes` integration applies the `data-theme` attribute to the preview root, enabling live theme switching in the documentation.
- Components never import or reference `Theme` tokens directly — only `Color`, `Typography`, and `Foundations`.
