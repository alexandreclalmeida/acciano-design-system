import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Rating } from "./Rating";

const meta: Meta<typeof Rating> = {
  component: Rating,
  parameters: {
    layout: "centered",
    docs: {
      subtitle: "Used to display a rating value with optional numeric label and review count.",
    },
  },
  argTypes: {
    type: {
      control: "select",
      options: ["Star", "Heart", "Circle"],
      table: { defaultValue: { summary: "Star" } },
    },
    layout: {
      control: "select",
      options: ["Horizontal", "Vertical"],
      table: { defaultValue: { summary: "Horizontal" } },
    },
    value: {
      control: { type: "number", min: 0, max: 5, step: 0.5 },
      table: { defaultValue: { summary: "3.5" } },
    },
    showNumber: {
      control: "boolean",
      table: { defaultValue: { summary: "true" } },
    },
    showReviews: {
      control: "boolean",
      table: { defaultValue: { summary: "true" } },
    },
    reviewCount: {
      control: "number",
      table: { defaultValue: { summary: "23" } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Rating>;

export const Default: Story = {
  args: { type: "Star", layout: "Horizontal", value: 3.5 },
};

export const Vertical: Story = {
  args: { type: "Star", layout: "Vertical", value: 3.5 },
};

export const Heart: Story = {
  args: { type: "Heart", layout: "Horizontal", value: 3.5 },
};

export const HeartVertical: Story = {
  args: { type: "Heart", layout: "Vertical", value: 3.5 },
};

export const Circle: Story = {
  args: { type: "Circle", layout: "Horizontal", value: 3.5 },
};

export const CircleVertical: Story = {
  args: { type: "Circle", layout: "Vertical", value: 3.5 },
};
