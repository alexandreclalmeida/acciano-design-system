import type { Meta, StoryObj } from "@storybook/react";
import { TextArea } from "./TextArea";

const meta: Meta<typeof TextArea> = {
  title: "Components/Text area",
  component: TextArea,
  parameters: {
    layout: "centered",
    docs: {
      subtitle: "Allows users to enter multiple lines of text.",
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: "320px" }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    rows: {
      control: { type: "number", min: 1, max: 20 },
      table: { defaultValue: { summary: "4" } },
    },
    error: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    disabled: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    required: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    optional: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    hideLabel: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    label: { control: "text" },
    placeholder: { control: "text" },
    helperText: { control: "text" },
    defaultValue: {
      control: "text",
      description:
        "Valor inicial (uncontrolled). Quando preenchido, exibe o estado Value — texto em `text/high` em vez do placeholder em `text/low`.",
    },
    id: { table: { disable: true } },
    name: { table: { disable: true } },
    value: { table: { disable: true } },
    onChange: { table: { disable: true } },
    className: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof TextArea>;

export const Default: Story = {
  args: {
    label: "Label",
    placeholder: "Placeholder",
    rows: 4,
    error: false,
    disabled: false,
  },
};

export const WithHelperText: Story = {
  args: {
    label: "Label",
    placeholder: "Placeholder",
    helperText: "Helper text",
  },
};

export const WithValue: Story = {
  args: {
    label: "Label",
    placeholder: "Placeholder",
    defaultValue:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
    helperText: "Helper text",
  },
};

export const Critical: Story = {
  args: {
    label: "Label",
    placeholder: "Placeholder",
    error: true,
    helperText: "Helper text",
  },
};

export const FilledCritical: Story = {
  args: {
    label: "Label",
    defaultValue: "Invalid content entered here.",
    error: true,
    helperText: "Helper text",
  },
};

export const Disabled: Story = {
  args: {
    label: "Label",
    placeholder: "Placeholder",
    disabled: true,
    helperText: "Helper text",
  },
};

export const FilledDisabled: Story = {
  args: {
    label: "Label",
    defaultValue: "Locked content that cannot be edited.",
    disabled: true,
    helperText: "Helper text",
  },
};

export const Required: Story = {
  args: {
    label: "Label",
    placeholder: "Placeholder",
    required: true,
  },
};

export const Optional: Story = {
  args: {
    label: "Label",
    placeholder: "Placeholder",
    optional: true,
  },
};
