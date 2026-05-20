import type { Meta, StoryObj } from "@storybook/react";
import { Tag } from "./Tag";

const meta: Meta<typeof Tag> = {
  title: "Components/Tag/Tag",
  component: Tag,
  parameters: {
    layout: "centered",
    docs: {
      subtitle: "Used to label or categorize content.",
    },
  },
  argTypes: {
    label: { table: { defaultValue: { summary: "Label" } } },
    size: {
      control: "select",
      options: ["Medium", "Small"],
      table: { defaultValue: { summary: "Medium" } },
    },
    selected: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    disabled: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    onDismiss: { table: { disable: true } },
    onClick: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const Default: Story = {
  args: { label: "Label", size: "Medium" },
};

export const Selected: Story = {
  args: { label: "Label", size: "Medium", selected: true },
};

export const WithDismiss: Story = {
  args: { label: "Label", size: "Medium", onDismiss: () => {} },
};

export const Disabled: Story = {
  args: { label: "Label", size: "Medium", disabled: true },
};

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <Tag label="Label" size="Medium" />
      <Tag label="Label" size="Small" />
    </div>
  ),
};
