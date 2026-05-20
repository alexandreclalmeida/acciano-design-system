import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { LoadingBar } from "./LoadingBar";

const meta: Meta<typeof LoadingBar> = {
  title: "Components/Loading bar",
  component: LoadingBar,
  parameters: {
    layout: "centered",
    docs: {
      subtitle:
        "Used to show the progress of a process, like uploading or downloading a file.",
    },
  },
  argTypes: {
    value: {
      control: { type: "number", min: 0, max: 100, step: 1 },
      table: { defaultValue: { summary: "0" } },
    },
    showLabel: {
      control: "boolean",
      table: { defaultValue: { summary: "true" } },
    },
  },
  render: (args) => (
    <div style={{ width: "400px" }}>
      <LoadingBar {...args} />
    </div>
  ),
};

export default meta;
type Story = StoryObj<typeof LoadingBar>;

export const Default: Story = {
  args: { value: 50, showLabel: true },
};

export const WithoutLabel: Story = {
  args: { value: 50, showLabel: false },
};
