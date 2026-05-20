import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { RadioButton } from "./RadioButton";

const meta: Meta<typeof RadioButton> = {
  title: "Components/Radio button/Radio button",
  component: RadioButton,
  parameters: {
    layout: "centered",
    docs: {
      subtitle: "Allows users to select a single option from a list.",
    },
  },
  decorators: [
    (Story) => (
      <div style={{ minWidth: "200px" }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    size: {
      control: "select",
      options: ["Large", "Small"],
      table: { defaultValue: { summary: "Large" } },
    },
    error: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    disabled: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    label: { control: "text" },
    checked: { table: { disable: true } },
    defaultChecked: { table: { disable: true } },
    onChange: { table: { disable: true } },
    name: { table: { disable: true } },
    value: { table: { disable: true } },
    id: { table: { disable: true } },
    className: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof RadioButton>;

export const Default: Story = {
  args: {
    label: "Label",
    size: "Large",
    error: false,
    disabled: false,
  },
};

export const Checked: Story = {
  args: {
    label: "Label",
    defaultChecked: true,
  },
};

export const Critical: Story = {
  args: {
    label: "Label",
    error: true,
  },
};

export const CriticalChecked: Story = {
  args: {
    label: "Label",
    error: true,
    defaultChecked: true,
  },
};

export const Disabled: Story = {
  args: {
    label: "Label",
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: "Label",
    disabled: true,
    defaultChecked: true,
  },
};

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <RadioButton label="Large" size="Large" defaultChecked />
      <RadioButton label="Small" size="Small" defaultChecked />
    </div>
  ),
};
