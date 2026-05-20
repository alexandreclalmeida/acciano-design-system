# ADR 007 — Dropdown positioning via React Portal

**Date:** 2025  
**Status:** Accepted

## Context

Several components (Select, Autocomplete, Combobox, Dropdown Menu, Date Picker) require a floating panel that appears above other content. The challenge is that CSS `overflow: hidden` or `overflow: clip` on ancestor elements clips absolutely positioned children, making it impossible to position a dropdown relative to its trigger when any ancestor has constrained overflow.

Options considered:

- **Absolute positioning relative to the trigger** — dropdown is a child of the trigger's container
- **React Portal to `document.body`** — dropdown is rendered outside the component tree, appended directly to the body
- **Fixed positioning without Portal** — dropdown uses `position: fixed` and is calculated relative to the viewport

## Decision

All floating panels are rendered via **React Portal** (`createPortal`) appended to `document.body`, with `position: fixed` and coordinates calculated from `getBoundingClientRect()` at render time.

A shared `useDropdownPosition` hook handles position calculation, accounting for scroll offsets and triggering a recalculation via `requestAnimationFrame` when the dropdown opens.

## Rationale

- **Overflow clipping is unavoidable:** Acciano components are meant to be used inside any layout — cards, modals, sidebars, tables — all of which may have `overflow: hidden`. A dropdown that clips inside its container is broken by definition.
- **Portal escapes the stacking context:** Rendering to `document.body` guarantees the dropdown appears above all other content regardless of `z-index` stacking contexts in the parent tree.
- **`getBoundingClientRect` + `position: fixed` is reliable:** This combination gives pixel-accurate positioning relative to the viewport without depending on the DOM tree structure. The dropdown's top/left coordinates are set explicitly at open time.
- **`requestAnimationFrame` prevents layout thrash:** Reading `getBoundingClientRect` inside a `rAF` callback ensures the measurement happens after the browser has completed layout, giving accurate coordinates even when the dropdown opens during an animation or transition.

## Consequences

- Dropdowns are not clipped by ancestor `overflow` properties.
- Position must be recalculated if the trigger moves (e.g., window resize, scroll). A scroll event listener on `window` handles this and closes the dropdown if the trigger scrolls out of view.
- The Portal approach means the dropdown is outside the component's DOM subtree — click-outside detection must check both the trigger and the portal content to avoid false closes.
