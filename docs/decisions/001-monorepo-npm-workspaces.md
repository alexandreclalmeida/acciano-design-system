# ADR 001 — Monorepo com npm workspaces

**Date:** 2025  
**Status:** Accepted

## Context

The Acciano Design System consists of multiple interdependent packages: design tokens, UI components, icons, logos, and a Storybook documentation app. These packages need to coexist, reference each other locally, and be built in a coordinated way.

The main options considered were:

- **Multiple separate repositories** — one repo per package
- **Monorepo with npm workspaces** — single repo, multiple packages managed natively by npm
- **Monorepo with Turborepo or Nx** — monorepo with an orchestration layer on top

## Decision

Use a **monorepo with npm workspaces** (native npm feature, no additional tooling).

## Rationale

- **Simplicity over orchestration:** Turborepo and Nx add caching, task pipelines, and dependency graphs — valuable for large teams, unnecessary for a solo project. npm workspaces handle local package resolution with zero configuration overhead.
- **Local package references work out of the box:** `@acciano/components` can import `@acciano/icons` and `@acciano/tokens` as if they were published packages, without publishing or symlinking manually.
- **Single source of truth:** One repository, one git history, one place to run builds and checks. Changes to tokens and components are always in sync.
- **Separate repos would create friction:** Coordinating changes across multiple repos (tokens change → components need update) would require versioning, publishing, and updating dependencies constantly — a significant overhead for a solo workflow.

## Consequences

- All packages share a single `node_modules` at the root, which saves disk space and keeps dependency versions consistent.
- Build order must be managed explicitly: packages that depend on others must be built after their dependencies (`tokens → icons → logos → components`).
- The Storybook app lives in `apps/storybook/` and references all packages as workspace dependencies, always using the local source.
