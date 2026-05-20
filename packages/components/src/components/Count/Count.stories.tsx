import type { Meta, StoryObj } from "@storybook/react";
import { Count } from "./Count";

const meta: Meta<typeof Count> = {
  component: Count,
  parameters: {
    layout: "centered",
    docs: {
      subtitle: "Used to show the number of notifications.",
    },
  },
  argTypes: {
    children: { table: { defaultValue: { summary: "8" } } },
    emphasis: {
      control: "select",
      options: ["Strong", "Moderate", "Weak"],
      table: { defaultValue: { summary: "Strong" } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Count>;

export const Default: Story = {
  args: { emphasis: "Strong", children: 8 },
};

export const Moderate: Story = {
  args: { emphasis: "Moderate", children: 8 },
};

export const Weak: Story = {
  args: { emphasis: "Weak", children: 8 },
};

