# ADR 003 — CSS Modules over CSS-in-JS or utility classes

**Date:** 2025  
**Status:** Accepted

## Context

React component styling can be approached in several ways. The main options evaluated were:

- **CSS Modules** — scoped CSS files per component, imported as objects in TypeScript
- **CSS-in-JS** (Styled Components, Emotion) — styles written in JavaScript, injected at runtime
- **Utility-first CSS** (Tailwind CSS) — styles applied via utility class names directly in JSX
- **Plain CSS** with BEM naming — global CSS with manually scoped class names

## Decision

Use **CSS Modules** (`.module.css` files) with CSS custom properties from the token system.

## Rationale

- **No runtime cost:** CSS-in-JS libraries inject styles at runtime, which adds JavaScript weight and can cause flash-of-unstyled-content. CSS Modules are processed at build time — the output is static CSS.
- **Scoping without overhead:** CSS Modules provide automatic class name scoping without requiring a naming convention like BEM or a runtime library. Collisions are impossible by construction.
- **Tokens stay as custom properties:** Using CSS Modules means token consumption happens naturally via `var(--token-name)` in CSS — the same way tokens work in any standard stylesheet. CSS-in-JS would require wrapping tokens in JS variables or theme providers.
- **Tailwind was ruled out by design origin:** Acciano components originate from a Figma UI Kit built without any CSS framework in mind. Tailwind utility classes would couple the component API to Tailwind's presence in the consumer's project, which contradicts the goal of a self-contained design system. The token scale and naming conventions are *aligned* with Tailwind (for familiarity), but Tailwind itself is not used.
- **Separation of concerns is preserved:** Styles live in `.module.css` files alongside their component. Reading a component's CSS gives a complete picture of its visual behavior without parsing JSX.

## Consequences

- Every component has a corresponding `.module.css` file.
- No visual values are hardcoded in CSS — all values come from `var(--token-name)`.
- The `clsx` utility is used for conditional class composition, which is the only styling-related dependency beyond CSS Modules themselves.
