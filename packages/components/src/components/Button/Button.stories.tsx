import type { Meta, StoryObj } from "@storybook/react";
import { ICON_OPTIONS, ICON_MAPPING } from "../../storybook/lucide-icons";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      subtitle:
        "User to trigger actions. The button type should indicate the importance of the action.",
    },
  },
  argTypes: {
    children: { table: { defaultValue: { summary: "Label" } } },
    disabled: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    variant: {
      control: "select",
      options: ["Primary", "Secondary", "Tertiary"],
      table: { defaultValue: { summary: "Primary" } },
    },
    tone: {
      control: "select",
      options: ["Brand", "Neutral", "Critical", "Inverse"],
      table: { defaultValue: { summary: "Brand" } },
    },
    size: {
      control: "select",
      options: ["Large", "Medium", "Small"],
      table: { defaultValue: { summary: "Medium" } },
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
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: "Label",
    variant: "Primary",
    tone: "Brand",
    size: "Medium",
  },
};

export const Secondary: Story = {
  args: {
    children: "Label",
    variant: "Secondary",
    tone: "Brand",
    size: "Medium",
  },
};

export const Tertiary: Story = {
  args: {
    children: "Label",
    variant: "Tertiary",
    tone: "Brand",
    size: "Medium",
  },
};

export const Neutral: Story = {
  args: {
    children: "Label",
    variant: "Primary",
    tone: "Neutral",
    size: "Medium",
  },
};

export const Critical: Story = {
  args: {
    children: "Label",
    variant: "Primary",
    tone: "Critical",
    size: "Medium",
  },
};

export const InverseTone: Story = {
  name: "Inverse",
  args: {
    children: "Label",
    variant: "Primary",
    tone: "Inverse",
    size: "Medium",
  },
};

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <Button variant="Primary" tone="Brand" size="Large">
        Label
      </Button>
      <Button variant="Primary" tone="Brand" size="Medium">
        Label
      </Button>
      <Button variant="Primary" tone="Brand" size="Small">
        Label
      </Button>
    </div>
  ),
};
