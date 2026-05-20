import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Text } from "./Text";

const SAMPLE = "The quick brown fox jumps over the lazy dog.";

const meta: Meta<typeof Text> = {
  title: "Components/Text",
  component: Text,
  parameters: {
    layout: "centered",
    docs: {
      subtitle:
        "Used to quickly apply text styles and swap with placeholder slots.",
    },
  },
  argTypes: {
    children: { table: { defaultValue: { summary: SAMPLE } } },
    variant: {
      control: "select",
      options: [
        "Hero",
        "H1",
        "H2",
        "H3",
        "H4",
        "H5",
        "Lead",
        "Large",
        "Base",
        "Small",
        "Tiny",
        "Nano",
        "Link",
        "Uppercase",
        "Code",
      ],
      table: { defaultValue: { summary: "Base" } },
    },
    as: {
      control: "select",
      options: [
        "p",
        "span",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "div",
        "label",
      ],
      table: { defaultValue: { summary: "p" } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Hero: Story = {
  args: { variant: "Hero", children: SAMPLE },
};

export const H1: Story = {
  name: "H1",
  args: { variant: "H1", children: SAMPLE },
};

export const H2: Story = {
  name: "H2",
  args: { variant: "H2", children: SAMPLE },
};

export const H3: Story = {
  name: "H3",
  args: { variant: "H3", children: SAMPLE },
};

export const H4: Story = {
  name: "H4",
  args: { variant: "H4", children: SAMPLE },
};

export const H5: Story = {
  name: "H5",
  args: { variant: "H5", children: SAMPLE },
};

export const Lead: Story = {
  args: { variant: "Lead", children: SAMPLE },
};

export const Large: Story = {
  args: { variant: "Large", children: SAMPLE },
};

export const Base: Story = {
  args: { variant: "Base", children: SAMPLE },
};

export const Small: Story = {
  args: { variant: "Small", children: SAMPLE },
};

export const Tiny: Story = {
  args: { variant: "Tiny", children: SAMPLE },
};

export const Nano: Story = {
  args: { variant: "Nano", children: SAMPLE },
};

export const Link: Story = {
  args: { variant: "Link", children: SAMPLE },
};

export const Uppercase: Story = {
  args: { variant: "Uppercase", children: SAMPLE },
};

export const Code: Story = {
  args: { variant: "Code", children: "const answer = 42;" },
};
