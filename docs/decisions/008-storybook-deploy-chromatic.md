# ADR 008 — Storybook deployment via Chromatic

**Date:** 2026  
**Status:** Accepted

## Context

The Storybook documentation needs to be publicly accessible — not just on a local machine — so that the design system can function as a portfolio piece and be referenced from anywhere. Several deployment options were evaluated:

- **GitHub Pages** — free static hosting via GitHub, requires manual workflow configuration
- **Vercel / Netlify** — general-purpose deployment platforms with generous free tiers
- **Chromatic** — deployment platform built specifically for Storybook, made by the Storybook maintainers

## Decision

Deploy Storybook via **Chromatic**, with automatic deployment triggered on every push to `main` via a GitHub Actions workflow.

## Rationale

- **Purpose-built for Storybook:** Chromatic understands Storybook's build output natively. Setup requires no custom configuration beyond pointing it at the build directory — there is no need to configure static file routing, base URLs, or asset paths.
- **Permanent per-branch URLs:** Chromatic generates a stable permalink for the latest published build of each branch (`https://main--{appId}.chromatic.com`). This URL always resolves to the most recent deployment, making it safe to share permanently.
- **Visual testing foundation:** Chromatic provides component snapshot testing out of the box. While not actively used at this stage, the infrastructure is in place to add visual regression tests in the future.
- **Figma integration:** Chromatic supports linking stories to Figma components, making it possible to view the Figma design and the live implementation side by side. This is particularly valuable for a design system where Figma is the source of truth.
- **GitHub integration:** Chromatic reports build status directly on GitHub commits and pull requests.

## Consequences

- The `CHROMATIC_PROJECT_TOKEN` is stored as a GitHub Actions secret and never exposed in the codebase.
- The `chromatic` script in `package.json` uses the `CHROMATIC_PROJECT_TOKEN` environment variable instead of a hardcoded token.
- Every push to `main` triggers: dependency installation → full package build → Storybook build → Chromatic publish.
- The build order in `package.json` is critical: `tokens → icons → logos → components`. An incorrect order causes the CI build to fail because `@acciano/components` depends on `@acciano/icons`, which must be built first.
