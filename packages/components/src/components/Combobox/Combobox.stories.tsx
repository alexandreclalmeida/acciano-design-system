import type { Meta, StoryObj } from "@storybook/react";
import { Combobox } from "./Combobox";

const COUNTRY_OPTIONS = [
  { value: "br", label: "Brazil" },
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
  { value: "jp", label: "Japan" },
];

const meta: Meta<typeof Combobox> = {
  title: "Components/Combobox",
  component: Combobox,
  parameters: {
    layout: "centered",
    docs: {
      subtitle: "Select one or more options from a dropdown list.",
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
    mode: {
      control: "select",
      options: ["Single", "Multiple"],
      table: { defaultValue: { summary: "Single" } },
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
    id: { table: { disable: true } },
    name: { table: { disable: true } },
    value: { table: { disable: true } },
    defaultValue: { table: { disable: true } },
    onChange: { table: { disable: true } },
    values: { table: { disable: true } },
    defaultValues: { table: { disable: true } },
    onValuesChange: { table: { disable: true } },
    options: { table: { disable: true } },
    maxVisibleTags: { table: { disable: true } },
    className: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof Combobox>;

export const Default: Story = {
  args: {
    label: "Country",
    placeholder: "Select a country",
    options: COUNTRY_OPTIONS,
  },
};

export const WithValue: Story = {
  args: {
    label: "Country",
    placeholder: "Select a country",
    defaultValue: "br",
    options: COUNTRY_OPTIONS,
  },
};

export const Critical: Story = {
  args: {
    label: "Country",
    placeholder: "Select a country",
    error: true,
    helperText: "Error message",
    options: COUNTRY_OPTIONS,
  },
};

export const Disabled: Story = {
  args: {
    label: "Country",
    placeholder: "Select a country",
    disabled: true,
    options: COUNTRY_OPTIONS,
  },
};

export const Multiple: Story = {
  args: {
    mode: "Multiple",
    label: "Countries",
    options: COUNTRY_OPTIONS,
  },
};

export const MultipleWithValues: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: "320px", paddingBottom: "320px" }}>
        <Story />
      </div>
    ),
  ],
  args: {
    mode: "Multiple",
    label: "Countries",
    defaultValues: ["br", "us", "uk"],
    options: COUNTRY_OPTIONS,
  },
};
