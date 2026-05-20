import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Slider } from "./Slider";

const meta: Meta<typeof Slider> = {
  component: Slider,
  parameters: {
    layout: "centered",
    docs: {
      subtitle: "Used to select a number within a range.",
    },
  },
  argTypes: {
    label: { table: { defaultValue: { summary: "Label" } } },
    defaultValue: {
      control: { type: "number", min: 0, max: 100, step: 1 },
      table: { defaultValue: { summary: "0" } },
    },
    value: { table: { disable: true } },
    min: {
      control: { type: "number" },
      table: { defaultValue: { summary: "0" } },
    },
    max: {
      control: { type: "number" },
      table: { defaultValue: { summary: "100" } },
    },
    step: {
      control: { type: "number" },
      table: { defaultValue: { summary: "1" } },
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
  render: (args) => (
    <div style={{ width: "400px" }}>
      <Slider {...args} />
    </div>
  ),
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  args: { label: "Label", defaultValue: 50 },
};

export const WithoutLabel: Story = {
  args: { label: "Label", defaultValue: 50, showLabel: false },
};

export const Disabled: Story = {
  args: { label: "Label", defaultValue: 50, disabled: true },
};
