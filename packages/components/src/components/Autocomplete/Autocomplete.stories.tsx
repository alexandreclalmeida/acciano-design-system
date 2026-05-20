import type { Meta, StoryObj } from "@storybook/react";
import { Autocomplete } from "./Autocomplete";

const COUNTRY_OPTIONS = [
  { value: "br", label: "Brazil" },
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
  { value: "jp", label: "Japan" },
];

const meta: Meta<typeof Autocomplete> = {
  title: "Components/Autocomplete",
  component: Autocomplete,
  parameters: {
    layout: "centered",
    docs: {
      subtitle: "Filters a list of options as a user types a search term.",
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
    className: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof Autocomplete>;

export const Default: Story = {
  args: {
    label: "Country",
    placeholder: "Search…",
    helperText: "Start typing to search",
    options: COUNTRY_OPTIONS,
  },
};

export const WithValue: Story = {
  args: {
    label: "Country",
    placeholder: "Search…",
    helperText: "Start typing to search",
    defaultValue: "br",
    options: COUNTRY_OPTIONS,
  },
};

export const Critical: Story = {
  args: {
    label: "Country",
    placeholder: "Search…",
    error: true,
    helperText: "Error message",
    options: COUNTRY_OPTIONS,
  },
};

export const Disabled: Story = {
  args: {
    label: "Country",
    placeholder: "Search…",
    disabled: true,
    helperText: "Start typing to search",
    options: COUNTRY_OPTIONS,
  },
};

export const Multiple: Story = {
  args: {
    mode: "Multiple",
    label: "Countries",
    placeholder: "Search…",
    helperText: "Start typing to search",
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
    placeholder: "Search…",
    helperText: "Start typing to search",
    defaultValues: ["br", "us"],
    options: COUNTRY_OPTIONS,
  },
};
