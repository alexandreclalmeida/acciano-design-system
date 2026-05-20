import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Breadcrumbs } from "./Breadcrumbs";

const ITEMS = [
  { label: "Link", href: "#" },
  { label: "Link", href: "#" },
  { label: "Link", href: "#" },
];

const meta: Meta<typeof Breadcrumbs> = {
  title: "Components/Breadcrumbs",
  component: Breadcrumbs,
  parameters: {
    layout: "centered",
    docs: {
      subtitle:
        "A navigational element that displays the user's path within a website or application.",
    },
  },
  argTypes: {
    collapsed: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    items: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof Breadcrumbs>;

export const Default: Story = {
  args: { items: ITEMS, collapsed: false },
};

export const Collapsed: Story = {
  args: { items: ITEMS, collapsed: true },
};
