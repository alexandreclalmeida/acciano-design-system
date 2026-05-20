import type { Meta, StoryObj } from "@storybook/react";
import { Slot } from "./Slot";

const meta: Meta<typeof Slot> = {
  title: "Components/Slot",
  component: Slot,
  parameters: {
    layout: "centered",
    docs: {
      subtitle: "A placeholder used to swap with other components.",
    },
  },
  argTypes: {
    label: {
      table: { defaultValue: { summary: "Swap with another component" } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Slot>;

export const Default: Story = {
  args: {},
};
