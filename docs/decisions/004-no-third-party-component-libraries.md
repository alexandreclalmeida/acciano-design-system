# ADR 004 — No third-party component libraries

**Date:** 2025  
**Status:** Accepted

## Context

Building a complete set of UI components from scratch is significant work. Many projects accelerate development by building on top of existing component libraries (Radix UI, shadcn/ui, Chakra UI, Material UI, Ant Design) that provide pre-built, accessible primitives.

The question was whether Acciano components should be built on top of any such library, or built entirely from scratch.

## Decision

All Acciano components are **custom-built from scratch**. No third-party component library is used as a visual or structural base.

The only exception: **Radix UI primitives may be used exclusively for accessibility behavior** (e.g., focus trap management in dialogs) when the behavior would otherwise require significant non-trivial implementation. The visual output must be 100% Acciano in all cases.

## Rationale

- **Design fidelity:** Every Acciano component originates from a Figma UI Kit. Third-party libraries bring their own visual opinions, DOM structure, and class names that would conflict with or constrain the Figma-first implementation.
- **Portfolio intent:** Acciano exists to demonstrate UI engineering skills. Using a library as a base would obscure the actual work — the components would be wrappers around someone else's implementation rather than original work.
- **No coupling to external APIs:** Third-party component APIs change with major versions, which would force Acciano to track upstream breaking changes. Custom components evolve only when Acciano itself decides to change.
- **Practical UI origin:** The Figma UI Kit was built inspired by Practical UI by Adham Dannaway, which itself was designed without reference to any existing component library. The code implementation follows the same philosophy.

## Consequences

- Each component requires full implementation: markup, styles, interactions, keyboard navigation, and ARIA attributes.
- Accessibility patterns (roving tabindex, focus management, ARIA roles) are implemented manually following WAI-ARIA specifications.
- The implementation effort is higher, but the result is a codebase where every line exists intentionally and reflects the design system's own decisions.
