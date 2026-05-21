import type { Meta, StoryObj } from "@storybook/react";
import { DatePicker } from "./DatePicker";
import { disabledA11y } from "../../storybook/a11y";

const EVENT_DATES = [
  new Date(2025, 3, 7), // Apr 7
  new Date(2025, 3, 14), // Apr 14
  new Date(2025, 3, 21), // Apr 21
];

const meta: Meta<typeof DatePicker> = {
  title: "Components/Date picker",
  component: DatePicker,
  parameters: {
    layout: "centered",
    docs: {
      subtitle:
        "Allows users to manually enter a date into the text field or select one from the calendar.",
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: "364px", paddingBottom: "420px" }}>
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
    helperText: { control: "text" },
    id: { table: { disable: true } },
    name: { table: { disable: true } },
    value: { table: { disable: true } },
    defaultValue: { table: { disable: true } },
    onChange: { table: { disable: true } },
    eventDates: { table: { disable: true } },
    className: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  args: {
    label: "Date of birth",
    helperText: "(dd/mm/yyyy)",
  },
};

export const WithValue: Story = {
  args: {
    label: "Date of birth",
    defaultValue: new Date(2025, 3, 5),
    helperText: "(dd/mm/yyyy)",
  },
};

export const WithHelperText: Story = {
  args: {
    label: "Appointment",
    helperText: "Select a date for your appointment.",
  },
};

export const Critical: Story = {
  args: {
    label: "Date of birth",
    error: true,
    helperText: "Please select a valid date.",
  },
};

export const Disabled: Story = {
  parameters: { ...disabledA11y },
  args: {
    label: "Date of birth",
    disabled: true,
    helperText: "(dd/mm/yyyy)",
  },
};

export const Required: Story = {
  args: {
    label: "Date of birth",
    required: true,
    helperText: "(dd/mm/yyyy)",
  },
};

export const Optional: Story = {
  args: {
    label: "Date of birth",
    optional: true,
    helperText: "(dd/mm/yyyy)",
  },
};

export const WithEvents: Story = {
  args: {
    label: "Appointment",
    defaultValue: new Date(2025, 3, 5),
    eventDates: EVENT_DATES,
    helperText: "Dates with events are marked with a dot.",
  },
};
