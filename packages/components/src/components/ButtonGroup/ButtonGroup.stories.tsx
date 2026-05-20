import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ButtonGroup } from "./ButtonGroup";
import { Button } from "../Button/Button";

const meta: Meta<typeof ButtonGroup> = {
  title: "Components/Button group",
  component: ButtonGroup,
  parameters: {
    layout: "centered",
    docs: {
      subtitle:
        "A group of 3 buttons that can be placed horizontally for large screens or stacked vertically for mobile.",
    },
  },
  argTypes: {
    layout: {
      control: "select",
      options: ["Horizontal", "Vertical"],
      table: { defaultValue: { summary: "Horizontal" } },
    },
    order: {
      control: "select",
      options: ["Default", "Reverse"],
      table: { defaultValue: { summary: "Default" } },
    },
    size: {
      control: "select",
      options: ["Large", "Medium", "Small"],
      table: { defaultValue: { summary: "Medium" } },
    },
    children: { table: { disable: true } },
  },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant="Primary" tone="Brand">
        Save
      </Button>
      <Button variant="Secondary" tone="Brand">
        Cancel
      </Button>
    </ButtonGroup>
  ),
};

export default meta;
type Story = StoryObj<typeof ButtonGroup>;

export const Default: Story = {
  args: { layout: "Horizontal", order: "Default", size: "Medium" },
};

export const Vertical: Story = {
  args: { layout: "Vertical", order: "Default", size: "Medium" },
  render: (args) => (
    <div style={{ width: "320px" }}>
      <ButtonGroup {...args}>
        <Button variant="Primary" tone="Brand">
          Save
        </Button>
        <Button variant="Secondary" tone="Brand">
          Cancel
        </Button>
      </ButtonGroup>
    </div>
  ),
};

export const Reverse: Story = {
  args: { layout: "Horizontal", order: "Reverse", size: "Medium" },
};

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <ButtonGroup layout="Horizontal" order="Default" size="Large">
        <Button variant="Primary" tone="Brand">
          Save
        </Button>
        <Button variant="Secondary" tone="Brand">
          Cancel
        </Button>
      </ButtonGroup>
      <ButtonGroup layout="Horizontal" order="Default" size="Medium">
        <Button variant="Primary" tone="Brand">
          Save
        </Button>
        <Button variant="Secondary" tone="Brand">
          Cancel
        </Button>
      </ButtonGroup>
      <ButtonGroup layout="Horizontal" order="Default" size="Small">
        <Button variant="Primary" tone="Brand">
          Save
        </Button>
        <Button variant="Secondary" tone="Brand">
          Cancel
        </Button>
      </ButtonGroup>
    </div>
  ),
};
