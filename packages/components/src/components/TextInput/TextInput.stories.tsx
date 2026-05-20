import type { Meta, StoryObj } from "@storybook/react";
import { Mail, Eye } from "lucide-react";
import { ICON_OPTIONS, ICON_MAPPING } from "../../storybook/lucide-icons";
import { TextInput } from "./TextInput";

const meta: Meta<typeof TextInput> = {
  title: "Components/Text input",
  component: TextInput,
  parameters: {
    layout: "centered",
    docs: {
      subtitle: "Allows users to enter a single line of text.",
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
    size: {
      control: "select",
      options: ["Medium", "Small"],
      table: { defaultValue: { summary: "Medium" } },
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
    leadingIcon: {
      control: "select",
      options: ["none", ...ICON_OPTIONS],
      mapping: { none: undefined, ...ICON_MAPPING },
      table: { defaultValue: { summary: "none" } },
    },
    trailingIcon: {
      control: "select",
      options: ["none", ...ICON_OPTIONS],
      mapping: { none: undefined, ...ICON_MAPPING },
      table: { defaultValue: { summary: "none" } },
    },
    defaultValue: {
      control: "text",
      description:
        "Valor inicial (uncontrolled). Quando preenchido, exibe o estado Value — texto em `text/high` em vez do placeholder em `text/low`.",
    },
    type: { table: { disable: true } },
    id: { table: { disable: true } },
    name: { table: { disable: true } },
    value: { table: { disable: true } },
    onChange: { table: { disable: true } },
    className: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof TextInput>;

export const Default: Story = {
  args: {
    label: "Label",
    placeholder: "Placeholder",
    size: "Medium",
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
    defaultValue: "Value",
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
    defaultValue: "Invalid value",
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
    defaultValue: "Locked value",
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

export const WithLeadingIcon: Story = {
  args: {
    label: "Email",
    placeholder: "name@example.com",
    leadingIcon: Mail,
  },
};

export const WithTrailingIcon: Story = {
  args: {
    label: "Password",
    placeholder: "Enter password",
    type: "password",
    trailingIcon: Eye,
  },
};

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        width: "320px",
      }}
    >
      <TextInput
        label="Medium — Placeholder"
        placeholder="Placeholder"
        size="Medium"
      />
      <TextInput
        label="Medium — Value"
        placeholder="Placeholder"
        defaultValue="Value"
        size="Medium"
      />
      <TextInput
        label="Small — Placeholder"
        placeholder="Placeholder"
        size="Small"
      />
      <TextInput
        label="Small — Value"
        placeholder="Placeholder"
        defaultValue="Value"
        size="Small"
      />
    </div>
  ),
};
