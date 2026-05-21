# ADR 013 — Storybook com Vite

**Date:** 2026  
**Status:** Accepted

## Context

Storybook requires a bundler to compile stories and component source. The two main options supported by Storybook are Webpack and Vite. The choice affects build speed, configuration complexity, and alignment with the rest of the project toolchain.

The main options considered were:

- **Storybook with Webpack** — the historically default bundler for Storybook
- **Storybook with Vite** — the newer, faster alternative using native ES modules

## Decision

Use **Storybook with the Vite builder** (`@storybook/builder-vite`).

## Rationale

- **Consistency with the project toolchain:** The Acciano monorepo already uses Vite as the build tool for packages. Using Vite for Storybook eliminates a second bundler from the project, keeping the toolchain uniform.
- **Faster cold starts and HMR:** Vite's native ES module approach starts the dev server significantly faster than Webpack, especially as the component library grows. Hot module replacement is near-instant.
- **Simpler configuration:** Vite's configuration surface is smaller than Webpack's. For a project without complex custom loaders or legacy browser requirements, Webpack's flexibility is unnecessary overhead.
- **CSS Modules work out of the box:** Vite has built-in support for CSS Modules, which is the styling approach used throughout Acciano. No additional loaders or plugins required.

## Consequences

- The Storybook configuration in `apps/storybook/.storybook/main.ts` uses `framework: '@storybook/react-vite'`.
- TypeScript path aliases and CSS Module imports resolve the same way in Storybook as in the rest of the project.
- Browser support targets follow Vite's defaults — modern browsers only, no IE11 compatibility.
