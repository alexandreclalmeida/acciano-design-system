import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "./Switch";

const meta: Meta<typeof Switch> = {
  title: "Components/Switch",
  component: Switch,
  parameters: {
    layout: "centered",
    docs: {
      subtitle: "Used to switch between 2 options that take immediate effect.",
    },
  },
  argTypes: {
    label: { table: { defaultValue: { summary: "Label" } } },
    defaultChecked: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    checked: { table: { disable: true } },
    size: {
      control: "select",
      options: ["small", "micro"],
      table: { defaultValue: { summary: "small" } },
    },
    showLabel: {
      control: "boolean",
      table: { defaultValue: { summary: "true" } },
    },
    disabled: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: { label: "Label", size: "small", defaultChecked: false },
};

export const Checked: Story = {
  args: { label: "Label", size: "small", defaultChecked: true },
};

export const WithoutLabel: Story = {
  args: {
    label: "Label",
    size: "small",
    defaultChecked: false,
    showLabel: false,
  },
};

export const Disabled: Story = {
  args: {
    label: "Label",
    size: "small",
    defaultChecked: false,
    disabled: true,
  },
};

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <Switch label="Label" size="small" />
      <Switch label="Label" size="micro" />
    </div>
  ),
};
