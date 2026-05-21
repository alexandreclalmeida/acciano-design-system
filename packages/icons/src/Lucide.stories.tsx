import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "Foundations/Icons/Lucide",
  parameters: {
    layout: "padded",
    controls: { disable: true },
    docs: {
      subtitle:
        "An open-source icon library that provides 1600+ vector (svg) files for displaying icons and symbols in digital and non-digital projects.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const p: React.CSSProperties = {
  margin: 0,
  color: "var(--color-text-high)",
  lineHeight: "1.6",
  fontSize: "14px",
};

export const Default: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        maxWidth: "640px",
      }}
    >
      <p style={{ margin: 0 }}>
        <a
          href="https://lucide.dev"
          target="_blank"
          rel="noreferrer"
          style={{
            color: "var(--color-text-link)",
            fontSize: "14px",
            fontWeight: 700,
          }}
        >
          lucide.dev →
        </a>
      </p>
      <h2
        style={{
          margin: 0,
          fontSize: "16px",
          fontWeight: 600,
          color: "var(--color-text-high)",
        }}
      >
        Lucide license
      </h2>
      <p style={p}>ISC License</p>
      <p style={p}>
        Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as
        part of Feather (MIT). All other copyright (c) for Lucide are held by
        Lucide Contributors 2022.
      </p>
      <p style={p}>
        Permission to use, copy, modify, and/or distribute this software for any
        purpose with or without fee is hereby granted, provided that the above
        copyright notice and this permission notice appear in all copies.
      </p>
      <p style={{ ...p, color: "var(--color-text-low)" }}>
        THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
        WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
        MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
        ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
        WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
        ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
        OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
      </p>
    </div>
  ),
};
