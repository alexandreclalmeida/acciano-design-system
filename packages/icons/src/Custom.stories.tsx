import type { Meta, StoryObj } from "@storybook/react";
import {
  CheckIcon,
  PartialIcon,
  RadioIcon,
  DotAwayIcon,
  DotBusyIcon,
  DotCriticalIcon,
  DotInfoIcon,
  DotOfflineIcon,
  DotOnlineIcon,
  DotSuccessIcon,
  DotWarningIcon,
  RatingStarEmptyIcon,
  RatingStarHalfIcon,
  RatingStarFullIcon,
  RatingHeartEmptyIcon,
  RatingHeartHalfIcon,
  RatingHeartFullIcon,
  RatingCircleEmptyIcon,
  RatingCircleHalfIcon,
  RatingCircleFullIcon,
} from "./generated/custom";

const ICONS = [
  { name: "CheckIcon", Icon: CheckIcon },
  { name: "PartialIcon", Icon: PartialIcon },
  { name: "RadioIcon", Icon: RadioIcon },
  { name: "DotAwayIcon", Icon: DotAwayIcon },
  { name: "DotBusyIcon", Icon: DotBusyIcon },
  { name: "DotCriticalIcon", Icon: DotCriticalIcon },
  { name: "DotInfoIcon", Icon: DotInfoIcon },
  { name: "DotOfflineIcon", Icon: DotOfflineIcon },
  { name: "DotOnlineIcon", Icon: DotOnlineIcon },
  { name: "DotSuccessIcon", Icon: DotSuccessIcon },
  { name: "DotWarningIcon", Icon: DotWarningIcon },
  { name: "RatingStarEmptyIcon", Icon: RatingStarEmptyIcon },
  { name: "RatingStarHalfIcon", Icon: RatingStarHalfIcon },
  { name: "RatingStarFullIcon", Icon: RatingStarFullIcon },
  { name: "RatingHeartEmptyIcon", Icon: RatingHeartEmptyIcon },
  { name: "RatingHeartHalfIcon", Icon: RatingHeartHalfIcon },
  { name: "RatingHeartFullIcon", Icon: RatingHeartFullIcon },
  { name: "RatingCircleEmptyIcon", Icon: RatingCircleEmptyIcon },
  { name: "RatingCircleHalfIcon", Icon: RatingCircleHalfIcon },
  { name: "RatingCircleFullIcon", Icon: RatingCircleFullIcon },
] as const;

const COLOR_OPTIONS = [
  "currentColor",
  "var(--color-icon-neutral)",
  "var(--color-icon-brand)",
  "var(--color-text-high)",
];

type Args = { size: number; color: string };

const meta: Meta<Args> = {
  title: "Foundations/Icons/Custom",
  parameters: {
    layout: "padded",
    docs: {
      subtitle: "Custom-built icons to append to the default set.",
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
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <p
        style={{ margin: 0, fontSize: "12px", color: "var(--color-text-low)" }}
      >
        The <code style={{ fontFamily: "monospace" }}>size</code> and{" "}
        <code style={{ fontFamily: "monospace" }}>color</code> controls only
        affect icons that use{" "}
        <code style={{ fontFamily: "monospace" }}>currentColor</code> (Check,
        Partial, Radio). Dot and Rating icons have fixed colors defined via CSS
        tokens.
      </p>
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
    </div>
  ),
};
