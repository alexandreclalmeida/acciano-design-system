import type { Meta, StoryObj } from "@storybook/react";
import { Bell } from "lucide-react";
import { ICON_OPTIONS, ICON_MAPPING } from "../../storybook/lucide-icons";
import { IconButton } from "./IconButton";

const meta: Meta<typeof IconButton> = {
  title: "Components/Icon button",
  component: IconButton,
  parameters: {
    layout: "centered",
    docs: {
      subtitle:
        "Used to trigger actions when space is limited. The button type should indicate the importance of the action.",
    },
  },
  argTypes: {
    icon: {
      control: "select",
      options: ICON_OPTIONS,
      mapping: ICON_MAPPING,
      table: { defaultValue: { summary: "Bell" } },
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
    shape: {
      control: "select",
      options: ["Square", "Circle"],
      table: { defaultValue: { summary: "Square" } },
    },
    disabled: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    showDot: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    showCount: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    count: {
      control: "number",
      table: { defaultValue: { summary: "0" } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Default: Story = {
  args: {
    icon: Bell,
    variant: "Primary",
    tone: "Brand",
    size: "Medium",
    shape: "Square",
    "aria-label": "Notifications",
  },
};

export const Secondary: Story = {
  args: {
    icon: Bell,
    variant: "Secondary",
    tone: "Brand",
    size: "Medium",
    shape: "Square",
    "aria-label": "Notifications",
  },
};

export const Tertiary: Story = {
  args: {
    icon: Bell,
    variant: "Tertiary",
    tone: "Brand",
    size: "Medium",
    shape: "Square",
    "aria-label": "Notifications",
  },
};

export const Neutral: Story = {
  args: {
    icon: Bell,
    variant: "Primary",
    tone: "Neutral",
    size: "Medium",
    shape: "Square",
    "aria-label": "Notifications",
  },
};

export const Critical: Story = {
  args: {
    icon: Bell,
    variant: "Primary",
    tone: "Critical",
    size: "Medium",
    shape: "Square",
    "aria-label": "Notifications",
  },
};

export const InverseTone: Story = {
  name: "Inverse",
  args: {
    icon: Bell,
    variant: "Primary",
    tone: "Inverse",
    size: "Medium",
    shape: "Square",
    "aria-label": "Notifications",
  },
};

export const Circle: Story = {
  args: {
    icon: Bell,
    variant: "Primary",
    tone: "Brand",
    size: "Medium",
    shape: "Circle",
    "aria-label": "Notifications",
  },
};

export const WithDot: Story = {
  args: {
    icon: Bell,
    variant: "Tertiary",
    tone: "Brand",
    size: "Medium",
    shape: "Square",
    showDot: true,
    "aria-label": "Notifications",
  },
};

export const WithCount: Story = {
  args: {
    icon: Bell,
    variant: "Tertiary",
    tone: "Brand",
    size: "Medium",
    shape: "Square",
    showCount: true,
    count: 5,
    "aria-label": "Notifications",
  },
};

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <IconButton
        icon={Bell}
        variant="Primary"
        tone="Brand"
        size="Large"
        aria-label="Notifications"
      />
      <IconButton
        icon={Bell}
        variant="Primary"
        tone="Brand"
        size="Medium"
        aria-label="Notifications"
      />
      <IconButton
        icon={Bell}
        variant="Primary"
        tone="Brand"
        size="Small"
        aria-label="Notifications"
      />
    </div>
  ),
};
