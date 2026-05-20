import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Divider } from "./Divider";

const meta: Meta<typeof Divider> = {
  title: "Components/Divider",
  component: Divider,
  parameters: {
    layout: "centered",
    docs: {
      subtitle: "A thin line used to separate or group related content.",
    },
  },
  argTypes: {
    contrast: {
      control: "select",
      options: ["Low", "High"],
      table: { defaultValue: { summary: "Low" } },
    },
  },
  render: (args) => (
    <div style={{ width: "400px" }}>
      <Divider {...args} />
    </div>
  ),
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const Default: Story = {
  args: { contrast: "Low" },
};

export const High: Story = {
  args: { contrast: "High" },
};
