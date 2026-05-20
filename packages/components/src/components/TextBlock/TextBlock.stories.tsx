import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Bell } from "lucide-react";
import { TextBlock } from "./TextBlock";
import { Capsule } from "../Capsule/Capsule";
import { LinkButton } from "../LinkButton/LinkButton";

const HEADING = "Heading";
const TEXT = "The quick brown fox jumps over the lazy dog.";

const meta: Meta<typeof TextBlock> = {
  title: "Components/Text block",
  component: TextBlock,
  parameters: {
    layout: "centered",
    docs: {
      subtitle: "A structured content block with heading, body, and optional actions.",
    },
  },
  argTypes: {
    align: {
      control: "select",
      options: ["Left", "Center"],
      table: { defaultValue: { summary: "Left" } },
    },
    heading: { table: { defaultValue: { summary: "Heading" } } },
    text: { table: { defaultValue: { summary: TEXT } } },
    capsule: { table: { disable: true } },
    link: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof TextBlock>;

export const Default: Story = {
  args: { align: "Left", heading: HEADING, text: TEXT },
};

export const Center: Story = {
  args: { align: "Center", heading: HEADING, text: TEXT },
};

export const WithCapsule: Story = {
  args: {
    align: "Left",
    heading: HEADING,
    text: TEXT,
    capsule: <Capsule icon={Bell} tone="Brand" variant="Filled" />,
  },
};

export const WithLink: Story = {
  args: {
    align: "Left",
    heading: HEADING,
    text: TEXT,
    link: <LinkButton tone="link">Learn more</LinkButton>,
  },
};

export const Full: Story = {
  args: {
    align: "Left",
    heading: HEADING,
    text: TEXT,
    capsule: <Capsule icon={Bell} tone="Brand" variant="Filled" />,
    link: <LinkButton tone="link">Learn more</LinkButton>,
  },
};

