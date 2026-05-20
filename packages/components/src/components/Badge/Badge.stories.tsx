import type { Meta, StoryObj } from "@storybook/react";
import { Info as InfoIcon } from "lucide-react";
import { ICON_OPTIONS, ICON_MAPPING } from "../../storybook/lucide-icons";
import { Badge } from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
    docs: {
      subtitle: "A display-only element used to indicate status.",
    },
  },
  argTypes: {
    label: { table: { defaultValue: { summary: "Label" } } },
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
      ],
      table: { defaultValue: { summary: "Brand" } },
    },
    size: {
      control: "select",
      options: ["Medium", "Small"],
      table: { defaultValue: { summary: "Medium" } },
    },
    icon: {
      control: "select",
      options: ["none", ...ICON_OPTIONS],
      mapping: { none: undefined, ...ICON_MAPPING },
      table: { defaultValue: { summary: "none" } },
    },
    dot: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    dotType: {
      control: "select",
      options: [
        "Info",
        "Success",
        "Online",
        "Warning",
        "Away",
        "Critical",
        "Busy",
        "Offline",
        "Notification",
      ],
      table: { defaultValue: { summary: "Info" } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: { label: "Label", tone: "Brand", size: "Medium" },
};

export const Neutral: Story = {
  args: { label: "Label", tone: "Neutral", size: "Medium" },
};

export const Info: Story = {
  args: { label: "Label", tone: "Info", size: "Medium" },
};

export const Success: Story = {
  args: { label: "Label", tone: "Success", size: "Medium" },
};

export const Warning: Story = {
  args: { label: "Label", tone: "Warning", size: "Medium" },
};

export const Critical: Story = {
  args: { label: "Label", tone: "Critical", size: "Medium" },
};

export const Alter: Story = {
  args: { label: "Label", tone: "Alter", size: "Medium" },
};

export const WithIcon: Story = {
  args: { label: "Label", tone: "Brand", size: "Medium", icon: InfoIcon },
};

export const WithDot: Story = {
  args: {
    label: "Label",
    tone: "Brand",
    size: "Medium",
    dot: true,
    dotType: "Info",
  },
};

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <Badge label="Label" tone="Brand" size="Medium" />
      <Badge label="Label" tone="Brand" size="Small" />
    </div>
  ),
};
