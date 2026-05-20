import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { LogoAcciano } from "./LogoAcciano";

const meta: Meta<typeof LogoAcciano> = {
  title: "Brands/Acciano",
  component: LogoAcciano,
  parameters: {
    layout: "centered",
    docs: {
      subtitle: "The Acciano brand logo.",
    },
  },
  argTypes: {
    width: {
      control: { type: "number", min: 60, max: 400, step: 10 },
      table: { defaultValue: { summary: "178" } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { width: 178 },
};
