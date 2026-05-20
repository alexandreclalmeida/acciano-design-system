# ADR 006 — Icons as an independent package with a build pipeline

**Date:** 2025  
**Status:** Accepted

## Context

Acciano uses two types of icons: Lucide Icons (an external open-source library) for general UI iconography, and custom icons (status indicators, rating symbols, form control icons) that are designed specifically for Acciano components and exported from Figma.

The custom icons needed a home and a distribution strategy.

## Decision

Custom icons live in **`packages/icons`** (`@acciano/icons`) as an independent package with an automated build pipeline:

1. SVG files are exported from Figma and saved to `packages/icons/svgs/`
2. A build script (`scripts/build-icons.ts`) reads the SVGs and generates React components in `src/generated/`
3. The generated files are committed and exported via the package's `index.ts`

Lucide Icons remain a direct dependency (`lucide-react`) — imported by name without any wrapper.

## Rationale

- **Single source of truth for custom icons:** SVGs come from Figma. The build pipeline ensures the React components always match the Figma source without manual copy-pasting.
- **Separation from UI components:** Icons are a foundational primitive used by many components. Keeping them in a separate package avoids circular dependencies and allows the icon set to evolve independently.
- **Separation from logos:** Icons and logos serve different purposes — icons are functional UI elements, logos are brand marks. They have different update cadences, different API conventions, and different consumers. Keeping them in separate packages (`@acciano/icons` vs `@acciano/logos`) makes this boundary explicit.
- **Lucide as a direct dependency, not wrapped:** Wrapping Lucide icons in Acciano components would add a layer of indirection with no benefit. Lucide's API is stable, its icons are already accessible SVG components, and its naming convention is used directly in Figma. Components import from `lucide-react` by the original icon name.
- **Generated files are committed:** The `src/generated/` directory is generated but committed to the repository. This makes the package usable immediately after cloning without running a build step, and makes changes to the icon set visible in git diffs.

## Consequences

- New custom icons follow a defined workflow: export SVG from Figma → save to `svgs/` → run `npm run build:icons` → commit generated output.
- The `src/generated/` files must never be edited manually — they are overwritten on every build.
- Custom icon components follow a naming convention: `[Group][Variant]Icon` (e.g., `DotAwayIcon`, `RatingStarFullIcon`, `CheckIcon`).
