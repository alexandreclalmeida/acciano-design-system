# ADR 014 — `packages/tokens/dist/` versionado no Git

**Date:** 2026  
**Status:** Accepted

## Context

Style Dictionary generates CSS output files in `packages/tokens/dist/`. Generated files are typically excluded from version control — they can be reconstructed from source at any time. However, the Acciano monorepo has a specific constraint: other packages (`@acciano/components`, `apps/storybook`) import these CSS files directly from `dist/` at runtime.

The main options considered were:

- **Exclude `dist/` from Git** — consumers run the token build before starting development
- **Commit `dist/` to Git** — generated files are versioned alongside source
- **Publish `@acciano/tokens` to npm** — consumers install the package instead of referencing the local path

## Decision

**Commit `packages/tokens/dist/` to Git** using a force-include rule in `.gitignore`.

## Rationale

- **Eliminates a required build step for consumers:** Without committing `dist/`, every developer (or CI environment) must run the token build before the Storybook app or components can resolve their CSS imports. This creates a fragile setup where missing a build step produces cryptic import errors.
- **The generated output is stable and predictable:** Style Dictionary is deterministic — the same token source always produces the same CSS output. Versioning the output does not introduce noise; diffs are meaningful and reflect actual token changes.
- **npm publishing is premature:** Publishing `@acciano/tokens` as a versioned npm package would solve the same problem but adds release management overhead that is not justified for the current stage of the project.
- **CI reliability:** GitHub Actions can run `npm ci` and immediately build Storybook without a separate token generation step, because `dist/` is already present in the repository.

## Consequences

- `.gitignore` includes `packages/tokens/dist/` in the ignore list but overrides it with `!packages/tokens/dist/` (force include).
- Token CSS changes are visible in pull request diffs, making it easy to review the impact of token source changes.
- When tokens are modified, the build must be run locally and the updated `dist/` files committed alongside the source changes.
