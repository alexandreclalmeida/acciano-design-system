import type { Meta, StoryObj } from "@storybook/react";
import { IconButton } from "../IconButton/IconButton";
import { Info } from "lucide-react";
import { Tooltip } from "./Tooltip";

const DESCRIPTION =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.";

const meta: Meta<typeof Tooltip> = {
  title: "Components/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
    docs: {
      subtitle:
        "A floating message that's displayed on hover or press of an interactive element.",
    },
  },
  argTypes: {
    content: {
      control: "text",
      table: { defaultValue: { summary: "Lorem ipsum dolor" } },
    },
    description: {
      control: "text",
      table: { defaultValue: { summary: "—" } },
    },
    direction: {
      control: "select",
      options: ["Up", "Down", "Left", "Right"],
      table: { defaultValue: { summary: "Up" } },
    },
    size: {
      control: "select",
      options: ["Small", "Large"],
      table: { defaultValue: { summary: "Small" } },
    },
    children: { table: { disable: true } },
    className: { table: { disable: true } },
  },
  render: (args) => (
    <div style={{ padding: "100px" }}>
      <Tooltip {...args}>
        <IconButton
          variant="Tertiary"
          tone="Neutral"
          icon={Info}
          aria-label="Info"
        />
      </Tooltip>
    </div>
  ),
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    content: "Lorem ipsum dolor",
    direction: "Up",
    size: "Small",
  },
};

export const Down: Story = {
  args: {
    content: "Lorem ipsum dolor",
    direction: "Down",
    size: "Small",
  },
};

export const Left: Story = {
  args: {
    content: "Lorem ipsum dolor",
    direction: "Left",
    size: "Small",
  },
};

export const Right: Story = {
  args: {
    content: "Lorem ipsum dolor",
    direction: "Right",
    size: "Small",
  },
};

export const Large: Story = {
  args: {
    content: "Lorem ipsum dolor",
    description: DESCRIPTION,
    direction: "Up",
    size: "Large",
  },
  render: (args) => (
    <div style={{ padding: "200px 100px" }}>
      <Tooltip {...args}>
        <IconButton
          variant="Tertiary"
          tone="Neutral"
          icon={Info}
          aria-label="Info"
        />
      </Tooltip>
    </div>
  ),
};

export const LargeDown: Story = {
  args: {
    content: "Lorem ipsum dolor",
    description: DESCRIPTION,
    direction: "Down",
    size: "Large",
  },
  render: (args) => (
    <div style={{ padding: "200px 100px" }}>
      <Tooltip {...args}>
        <IconButton
          variant="Tertiary"
          tone="Neutral"
          icon={Info}
          aria-label="Info"
        />
      </Tooltip>
    </div>
  ),
};

export const LargeLeft: Story = {
  args: {
    content: "Lorem ipsum dolor",
    description: DESCRIPTION,
    direction: "Left",
    size: "Large",
  },
};

export const LargeRight: Story = {
  args: {
    content: "Lorem ipsum dolor",
    description: DESCRIPTION,
    direction: "Right",
    size: "Large",
  },
};
