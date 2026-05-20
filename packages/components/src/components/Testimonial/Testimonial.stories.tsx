import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Testimonial } from "./Testimonial";

const QUOTE =
  '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."';

const meta: Meta<typeof Testimonial> = {
  title: "Components/Testimonial",
  component: Testimonial,
  parameters: {
    layout: "centered",
    docs: {
      subtitle: "Used to display user feedback.",
    },
  },
  argTypes: {
    align: {
      control: "select",
      options: ["Left", "Center"],
      table: { defaultValue: { summary: "Left" } },
    },
    name: { control: "text" },
    email: { control: "text" },
    avatarSrc: { control: "text" },
    quote: { control: "text" },
    rating: {
      control: { type: "number", min: 0, max: 5, step: 0.5 },
      table: { defaultValue: { summary: "5" } },
    },
    showAvatar: {
      control: "boolean",
      table: { defaultValue: { summary: "true" } },
    },
    showQuote: {
      control: "boolean",
      table: { defaultValue: { summary: "true" } },
    },
    showRating: {
      control: "boolean",
      table: { defaultValue: { summary: "true" } },
    },
    className: { table: { disable: true } },
  },
  render: (args) => (
    <div style={{ width: 364 }}>
      <Testimonial {...args} />
    </div>
  ),
};

export default meta;
type Story = StoryObj<typeof Testimonial>;

export const Default: Story = {
  args: {
    align: "Left",
    name: "Alex Acciano",
    email: "alex.acciano@aa.com",
    avatarSrc: "https://i.pravatar.cc/96?img=11",
    quote: QUOTE,
    rating: 5,
    showAvatar: true,
    showQuote: true,
    showRating: true,
  },
};

export const Center: Story = {
  args: {
    ...Default.args,
    align: "Center",
  },
  parameters: { controls: { disable: true } },
};

export const NoAvatar: Story = {
  args: {
    ...Default.args,
    showAvatar: false,
  },
  parameters: { controls: { disable: true } },
};

export const NoRating: Story = {
  args: {
    ...Default.args,
    showRating: false,
  },
  parameters: { controls: { disable: true } },
};

