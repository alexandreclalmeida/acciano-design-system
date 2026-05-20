import type { Meta, StoryObj } from "@storybook/react";
import { Bell } from "lucide-react";
import { ICON_OPTIONS, ICON_MAPPING } from "../../storybook/lucide-icons";
import { Capsule } from "./Capsule";

const meta: Meta<typeof Capsule> = {
  title: "Components/Capsule",
  component: Capsule,
  parameters: {
    layout: "centered",
    docs: {
      subtitle:
        "Used to make icons appear larger and more prominent while giving them a consistent shape.",
    },
  },
  argTypes: {
    icon: {
      control: "select",
      options: ICON_OPTIONS,
      mapping: ICON_MAPPING,
      table: { defaultValue: { summary: "Bell" } },
    },
    tone: {
      control: "select",
      options: [
        "Brand",
        "Neutral",
        "Info",
        "Success",
        "Warning",
        "Critical",
        "Alter",
        "Inverse",
      ],
      table: { defaultValue: { summary: "Brand" } },
    },
    variant: {
      control: "select",
      options: ["Filled", "Stroked"],
      table: { defaultValue: { summary: "Filled" } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Capsule>;

export const Default: Story = {
  args: { icon: Bell, tone: "Brand", variant: "Filled" },
};

export const Neutral: Story = {
  args: { icon: Bell, tone: "Neutral", variant: "Filled" },
};

export const Info: Story = {
  args: { icon: Bell, tone: "Info", variant: "Filled" },
};

export const Success: Story = {
  args: { icon: Bell, tone: "Success", variant: "Filled" },
};

export const Warning: Story = {
  args: { icon: Bell, tone: "Warning", variant: "Filled" },
};

export const Critical: Story = {
  args: { icon: Bell, tone: "Critical", variant: "Filled" },
};

export const Alter: Story = {
  args: { icon: Bell, tone: "Alter", variant: "Filled" },
};

export const InverseTone: Story = {
  name: "Inverse",
  args: { icon: Bell, tone: "Inverse", variant: "Filled" },
};

export const Variants: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <Capsule icon={Bell} tone="Brand" variant="Filled" />
      <Capsule icon={Bell} tone="Brand" variant="Stroked" />
    </div>
  ),
};
