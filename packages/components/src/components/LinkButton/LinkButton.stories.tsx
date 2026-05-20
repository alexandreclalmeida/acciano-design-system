import type { Meta, StoryObj } from "@storybook/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ICON_OPTIONS, ICON_MAPPING } from "../../storybook/lucide-icons";
import { LinkButton } from "./LinkButton";

const meta: Meta<typeof LinkButton> = {
  title: "Components/Link button",
  component: LinkButton,
  parameters: {
    layout: "centered",
    docs: {
      subtitle:
        "Used to take people to another page or a different part of the same page.",
    },
  },
  argTypes: {
    children: { table: { defaultValue: { summary: "Link" } } },
    tone: {
      control: "select",
      options: ["link", "neutral", "critical", "inverse"],
      table: { defaultValue: { summary: "link" } },
    },
    size: {
      control: "select",
      options: ["base", "small"],
      table: { defaultValue: { summary: "base" } },
    },
    weight: {
      control: "select",
      options: ["regular", "bold"],
      table: { defaultValue: { summary: "regular" } },
    },
    underline: {
      control: "boolean",
      table: { defaultValue: { summary: "true" } },
    },
    disabled: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    leadingIcon: {
      control: "select",
      options: ["none", ...ICON_OPTIONS],
      mapping: { none: undefined, ...ICON_MAPPING },
      table: { defaultValue: { summary: "none" } },
    },
    trailingIcon: {
      control: "select",
      options: ["none", ...ICON_OPTIONS],
      mapping: { none: undefined, ...ICON_MAPPING },
      table: { defaultValue: { summary: "none" } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof LinkButton>;

export const Default: Story = {
  args: {
    children: "Link",
    tone: "link",
    size: "base",
    weight: "regular",
    underline: true,
  },
};

export const Neutral: Story = {
  args: { children: "Link", tone: "neutral", size: "base", weight: "regular" },
};

export const Critical: Story = {
  args: { children: "Link", tone: "critical", size: "base", weight: "regular" },
};

export const InverseTone: Story = {
  name: "Inverse",
  args: { children: "Link", tone: "inverse", size: "base", weight: "regular" },
};

export const Bold: Story = {
  args: { children: "Link", tone: "link", size: "base", weight: "bold" },
};

export const WithLeadingIcon: Story = {
  args: {
    children: "Link",
    tone: "link",
    size: "base",
    weight: "regular",
    leadingIcon: ArrowLeft,
  },
};

export const WithTrailingIcon: Story = {
  args: {
    children: "Link",
    tone: "link",
    size: "base",
    weight: "regular",
    trailingIcon: ArrowRight,
  },
};

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <LinkButton tone="link" size="base" weight="regular">
        Link
      </LinkButton>
      <LinkButton tone="link" size="small" weight="regular">
        Link
      </LinkButton>
    </div>
  ),
};
