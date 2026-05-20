# Acciano Design System

A personal design system — tokens, components, and documentation in one place.

Acciano started as a UI engineering study and evolved into a complete design system: structured tokens, 50+ React components, and interactive documentation via Storybook. Every component originates from a Figma UI Kit and is implemented without third-party component libraries.

**[View in Figma](https://www.figma.com/design/uiFtDBaCNOzuTtDZgza3Zb/Acciano-UI-Design-Kit)** · **[Storybook](https://placeholder-storybook-url.com)** · **[LinkedIn](https://www.linkedin.com/in/alexandre-lopes-almeida)**

---

## What's inside

```
acciano-design-system/
├── packages/
│   ├── tokens/       # Design tokens → CSS custom properties (Style Dictionary)
│   ├── components/   # 50+ React components
│   ├── icons/        # Custom and brand icons as React components
│   └── logos/        # Logo components
└── apps/
    └── storybook/    # Interactive documentation
```

## Stack

- **React** + **TypeScript**
- **CSS Modules** with design tokens as CSS custom properties
- **Vite** for building
- **Style Dictionary** for token generation
- **Storybook** for documentation
- **Lucide Icons** for UI iconography

No third-party component libraries. Every component is custom-built from the Figma source.

## Token architecture

Tokens follow a layered architecture: primitive values → theme aliases → semantic tokens consumed by components.

Six CSS files are generated from JSON sources:

| File                     | Contents                            |
| ------------------------ | ----------------------------------- |
| `foundations.css`        | Spacing, radius, border, blur, grid |
| `color.light.css`        | Semantic color tokens — light mode  |
| `color.dark.css`         | Semantic color tokens — dark mode   |
| `typography.desktop.css` | Type scale — desktop                |
| `typography.mobile.css`  | Type scale — mobile                 |
| `elevation.css`          | Shadow tokens                       |

## Running locally

```bash
# Install dependencies
npm install

# Build tokens (required before running Storybook)
npm run build:tokens

# Start Storybook
npm run storybook
```

Storybook runs at `http://localhost:6006`.

## Components

50+ components across 11 implementation phases — from primitives to full page-level compositions.

Phases covered: primitives · composition · interactive controls · actions & avatars · forms · navigation · overlays · content · page-level components.

Full component inventory and status available in [`.claude/05_COMPONENTS.md`](.claude/05_COMPONENTS.md).

---

## Disclaimer

Acciano DS began as a personal educational study inspired by licensed resources and UI engineering concepts from [Practical UI](https://practical-ui.com) by Adham Dannaway.

Over time, the project evolved into an independent internal design system used exclusively in personal projects, experiments, and AI-assisted workflows.

This repository and its related case study are shared strictly for portfolio and educational purposes. They are not intended for redistribution, resale, public duplication, or use as a competing UI kit or design system.

All original materials, concepts, and assets remain subject to their respective licenses and copyrights.
