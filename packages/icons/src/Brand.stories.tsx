import type { Meta, StoryObj } from "@storybook/react";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  XTwitterIcon,
  YoutubeIcon,
} from "./generated/brand";

const ICONS = [
  { name: "FacebookIcon", Icon: FacebookIcon },
  { name: "InstagramIcon", Icon: InstagramIcon },
  { name: "LinkedinIcon", Icon: LinkedinIcon },
  { name: "XTwitterIcon", Icon: XTwitterIcon },
  { name: "YoutubeIcon", Icon: YoutubeIcon },
] as const;

const COLOR_OPTIONS = [
  "currentColor",
  "var(--color-icon-neutral)",
  "var(--color-icon-brand)",
  "var(--color-text-high)",
];

type Args = { size: number; color: string };

const meta: Meta<Args> = {
  title: "Foundations/Icons/Brand",
  parameters: {
    layout: "padded",
    docs: {
      subtitle: "Brand and social media icons in gray.",
    },
  },
  argTypes: {
    size: {
      control: "number",
      table: { defaultValue: { summary: "24" } },
    },
    color: {
      control: "select",
      options: COLOR_OPTIONS,
      table: { defaultValue: { summary: "currentColor" } },
    },
  },
  args: {
    size: 24,
    color: "currentColor",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(108px, 1fr))",
        gap: "8px",
      }}
    >
      {ICONS.map(({ name, Icon }) => (
        <div
          key={name}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px 8px",
            gap: "10px",
            minHeight: "88px",
            borderRadius: "8px",
            backgroundColor: "var(--color-background-raised)",
          }}
        >
          <Icon
            width={args.size}
            height={args.size}
            style={{ color: args.color, flexShrink: 0 }}
          />
          <span
            style={{
              fontFamily: "monospace",
              fontSize: "10px",
              color: "var(--color-text-low)",
              textAlign: "center",
              wordBreak: "break-all",
              lineHeight: "1.4",
            }}
          >
            {name}
          </span>
        </div>
      ))}
    </div>
  ),
};
