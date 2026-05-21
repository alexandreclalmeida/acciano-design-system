import type { Meta, StoryObj } from "@storybook/react";
import { Stepper } from "./Stepper";
import { disabledA11y } from "../../storybook/a11y";

const meta: Meta<typeof Stepper> = {
  title: "Components/Stepper",
  component: Stepper,
  parameters: {
    layout: "centered",
    docs: {
      subtitle:
        "Allows users to incrementally increase or decrease a number using buttons or by typing.",
    },
  },
  argTypes: {
    label: {
      control: "text",
      table: { defaultValue: { summary: "—" } },
    },
    helperText: {
      control: "text",
      table: { defaultValue: { summary: "—" } },
    },
    defaultValue: {
      control: "number",
      table: { defaultValue: { summary: "0" } },
    },
    min: {
      control: "number",
      table: { defaultValue: { summary: "—" } },
    },
    max: {
      control: "number",
      table: { defaultValue: { summary: "—" } },
    },
    step: {
      control: "number",
      table: { defaultValue: { summary: "1" } },
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
    hideLabel: { table: { disable: true } },
    id: { table: { disable: true } },
    value: { table: { disable: true } },
    onChange: { table: { disable: true } },
    editable: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    className: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof Stepper>;

export const Default: Story = {
  args: {
    label: "Quantity",
    defaultValue: 0,
    helperText: "Choose how many items you want.",
  },
};

export const Critical: Story = {
  args: {
    label: "Quantity",
    defaultValue: 0,
    error: true,
    helperText: "Value must be greater than zero.",
  },
};

export const Disabled: Story = {
  parameters: { ...disabledA11y },
  args: {
    label: "Quantity",
    defaultValue: 5,
    disabled: true,
    helperText: "This field is currently unavailable.",
  },
};

export const WithMinMax: Story = {
  args: {
    label: "Quantity",
    defaultValue: 1,
    min: 0,
    max: 10,
    helperText: "Min: 0 — Max: 10",
  },
};

export const Editable: Story = {
  args: {
    label: "Quantity",
    defaultValue: 0,
    editable: true,
    min: 0,
    max: 100,
    helperText: "You can also type a value directly.",
  },
};

export const NoLabel: Story = {
  args: {
    defaultValue: 0,
  },
};
