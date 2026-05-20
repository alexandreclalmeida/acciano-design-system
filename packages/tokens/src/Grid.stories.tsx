import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "Foundations/Layout grids",
  parameters: {
    layout: "padded",
    controls: { disable: true },
    docs: {
      subtitle:
        "Consist of vertical columns separated by empty spaces called gutters. Columns provide a structure for the layout of the main elements of an interface to align with.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Tokens extraídos do Figma ────────────────────────────────────────────────
const FRAME_BG = "#f5f6fa"; // --background/alternate
const BLOCK_BG = "#ffffff"; // --fill/inverse/high
const BLOCK_R = 16;
const BLOCK_H = 192;
const BLOCK_SHADOW =
  "0px 4px 8px -2px rgba(0,0,0,0.04), 0px 2px 4px -2px rgba(0,0,0,0.08)";
// ─── Subcomponentes ───────────────────────────────────────────────────────────

function Block({ width }: { width: number }) {
  return (
    <div
      style={{
        flexShrink: 0,
        width,
        height: BLOCK_H,
        backgroundColor: BLOCK_BG,
        borderRadius: BLOCK_R,
        boxShadow: BLOCK_SHADOW,
      }}
    />
  );
}

function SpecLine({
  breakpoint,
  cols,
  gutter,
  margin,
}: {
  breakpoint: number;
  cols: number;
  gutter: number;
  margin: number;
}) {
  const sep = (
    <span style={{ color: "rgba(9,27,102,0.25)", paddingInline: 4 }}>|</span>
  );
  return (
    <p
      style={{
        margin: 0,
        fontSize: 16,
        color: "rgba(4,13,51,0.65)",
        display: "flex",
        alignItems: "center",
        gap: 4,
      }}
    >
      <span>{breakpoint} px</span>
      {sep}
      <span>{cols} columns</span>
      {sep}
      <span>{gutter} px gutter</span>
      {sep}
      <span>{margin} px margin</span>
    </p>
  );
}

// ─── Stories ─────────────────────────────────────────────────────────────────

export const Desktop: Story = {
  render: () => {
    const w = 1440,
      px = 120,
      py = 80,
      gap = 32;
    const cw = w - px * 2; // 1200
    const half = (cw - gap) / 2; // 584
    const third = Math.floor((cw - gap * 2) / 3); // 378 (floor evita overflow de 1px no flex)
    const quarter = (cw - gap * 3) / 4; // 276

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div>
          <h2
            style={{
              margin: "0 0 4px",
              fontSize: 24,
              fontWeight: 600,
              color: "rgba(2,6,23,0.9)",
            }}
          >
            Desktop
          </h2>
          <SpecLine breakpoint={w} cols={12} gutter={gap} margin={px} />
        </div>
        <div style={{ overflowX: "auto" }}>
          <div
            style={{
              position: "relative",
              width: w,
              boxSizing: "border-box",
              paddingInline: px,
              paddingBlock: py,
              backgroundColor: FRAME_BG,
              display: "flex",
              flexWrap: "wrap",
              gap,
              alignContent: "flex-start",
            }}
          >
            {/* Linha 1: 12 cols */}
            <Block width={cw} />
            {/* Linha 2: 6+6 */}
            <Block width={half} />
            <Block width={half} />
            {/* Linha 3: 4+4+4 */}
            <Block width={third} />
            <Block width={third} />
            <Block width={third} />
            {/* Linha 4: 3+3+3+3 */}
            <Block width={quarter} />
            <Block width={quarter} />
            <Block width={quarter} />
            <Block width={quarter} />
          </div>
        </div>
      </div>
    );
  },
};

export const Tablet: Story = {
  render: () => {
    const w = 768,
      p = 48,
      gap = 24,
      frameH = 1024;
    const cw = w - p * 2; // 672
    const half = (cw - gap) / 2; // 324
    const quarter = (cw - gap * 3) / 4; // 150

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div>
          <h2
            style={{
              margin: "0 0 4px",
              fontSize: 24,
              fontWeight: 600,
              color: "rgba(2,6,23,0.9)",
            }}
          >
            Tablet
          </h2>
          <SpecLine breakpoint={w} cols={8} gutter={gap} margin={p} />
        </div>
        <div style={{ overflowX: "auto" }}>
          <div
            style={{
              position: "relative",
              width: w,
              height: frameH,
              boxSizing: "border-box",
              padding: p,
              backgroundColor: FRAME_BG,
              display: "flex",
              flexWrap: "wrap",
              gap,
              alignContent: "flex-start",
              overflow: "hidden",
            }}
          >
            {/* Linha 1: 8 cols */}
            <Block width={cw} />
            {/* Linha 2: 4+4 */}
            <Block width={half} />
            <Block width={half} />
            {/* Linha 3: 2+2+2+2 */}
            <Block width={quarter} />
            <Block width={quarter} />
            <Block width={quarter} />
            <Block width={quarter} />
          </div>
        </div>
      </div>
    );
  },
};

export const Mobile: Story = {
  render: () => {
    const w = 428,
      p = 32,
      gap = 16,
      frameH = 926;
    const cw = w - p * 2; // 364
    const half = (cw - gap) / 2; // 174

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div>
          <h2
            style={{
              margin: "0 0 4px",
              fontSize: 24,
              fontWeight: 600,
              color: "rgba(2,6,23,0.9)",
            }}
          >
            Mobile
          </h2>
          <SpecLine breakpoint={w} cols={4} gutter={gap} margin={p} />
        </div>
        <div style={{ overflowX: "auto" }}>
          <div
            style={{
              position: "relative",
              width: w,
              height: frameH,
              boxSizing: "border-box",
              padding: p,
              backgroundColor: FRAME_BG,
              display: "flex",
              flexWrap: "wrap",
              gap,
              alignContent: "flex-start",
              overflow: "hidden",
            }}
          >
            {/* Linha 1: 4 cols */}
            <Block width={cw} />
            {/* Linha 2: 2+2 */}
            <Block width={half} />
            <Block width={half} />
          </div>
        </div>
      </div>
    );
  },
};
