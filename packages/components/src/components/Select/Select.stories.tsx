import type { Meta, StoryObj } from "@storybook/react";
import { Briefcase, User, Building2 } from "lucide-react";
import { Select } from "./Select";
import { disabledA11y } from "../../storybook/a11y";

const COUNTRY_OPTIONS = [
  { value: "br", label: "Brazil" },
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
  { value: "jp", label: "Japan" },
];

const ROLE_OPTIONS = [
  { value: "designer", label: "Designer", icon: Briefcase },
  { value: "engineer", label: "Engineer", icon: Briefcase },
  { value: "manager", label: "Manager", icon: User },
  { value: "director", label: "Director", icon: Building2 },
  { value: "other", label: "Other", icon: Briefcase },
];

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  parameters: {
    layout: "centered",
    docs: {
      subtitle: "Allows users to choose one option from a dropdown list.",
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
    options: { table: { disable: true } },
    onChange: { table: { disable: true } },
    className: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

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

export const WithHelperText: Story = {
  args: {
    label: "Country",
    placeholder: "Select a country",
    helperText: "Your country of residence.",
    options: COUNTRY_OPTIONS,
  },
};

export const Critical: Story = {
  args: {
    label: "Country",
    placeholder: "Select a country",
    error: true,
    helperText: "Please select a valid option.",
    options: COUNTRY_OPTIONS,
  },
};

export const Disabled: Story = {
  parameters: { ...disabledA11y },
  args: {
    label: "Country",
    placeholder: "Select a country",
    disabled: true,
    helperText: "This field is not available.",
    options: COUNTRY_OPTIONS,
  },
};

export const Required: Story = {
  args: {
    label: "Country",
    placeholder: "Select a country",
    required: true,
    options: COUNTRY_OPTIONS,
  },
};

export const Optional: Story = {
  args: {
    label: "Country",
    placeholder: "Select a country",
    optional: true,
    options: COUNTRY_OPTIONS,
  },
};

export const WithIconsAndValue: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: "320px", paddingBottom: "280px" }}>
        <Story />
      </div>
    ),
  ],
  args: {
    label: "Role",
    placeholder: "Select a role",
    defaultValue: "designer",
    options: ROLE_OPTIONS,
  },
};
