import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { TagGroup } from "./TagGroup";
import { Tag } from "../Tag/Tag";

const meta: Meta<typeof TagGroup> = {
  title: "Components/Tag/Tag group",
  component: TagGroup,
  parameters: {
    layout: "centered",
    docs: {
      subtitle: "A wrapping collection of Tag components.",
    },
  },
  argTypes: {
    children: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof TagGroup>;

export const Default: Story = {
  render: () => (
    <TagGroup>
      <Tag label="Design" />
      <Tag label="React" />
      <Tag label="TypeScript" />
      <Tag label="Figma" />
    </TagGroup>
  ),
};

export const WithSelected: Story = {
  render: () => (
    <TagGroup>
      <Tag label="Design" selected />
      <Tag label="React" selected />
      <Tag label="TypeScript" />
      <Tag label="Figma" />
    </TagGroup>
  ),
};

export const WithDismiss: Story = {
  render: () => (
    <TagGroup>
      <Tag label="Design" onDismiss={() => {}} />
      <Tag label="React" onDismiss={() => {}} />
      <Tag label="TypeScript" onDismiss={() => {}} />
      <Tag label="Figma" onDismiss={() => {}} />
    </TagGroup>
  ),
};
