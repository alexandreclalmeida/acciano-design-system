import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Dot } from "./Dot";

const meta: Meta<typeof Dot> = {
  component: Dot,
  parameters: {
    layout: "centered",
    docs: {
      subtitle: "Used to indicate notifications or online status.",
    },
  },
  argTypes: {
    type: {
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
    size: {
      control: "select",
      options: ["Large", "Medium", "Small"],
      table: { defaultValue: { summary: "Large" } },
    },
    outline: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Dot>;

export const Default: Story = {
  args: { type: "Info", size: "Large" },
};

export const Success: Story = {
  args: { type: "Success", size: "Large" },
};

export const Online: Story = {
  args: { type: "Online", size: "Large" },
};

export const Warning: Story = {
  args: { type: "Warning", size: "Large" },
};

export const Away: Story = {
  args: { type: "Away", size: "Large" },
};

export const Critical: Story = {
  args: { type: "Critical", size: "Large" },
};

export const Busy: Story = {
  args: { type: "Busy", size: "Large" },
};

export const Offline: Story = {
  args: { type: "Offline", size: "Large" },
};

export const Notification: Story = {
  args: { type: "Notification", size: "Large" },
};

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <Dot type="Info" size="Large" />
      <Dot type="Info" size="Medium" />
      <Dot type="Info" size="Small" />
    </div>
  ),
};
