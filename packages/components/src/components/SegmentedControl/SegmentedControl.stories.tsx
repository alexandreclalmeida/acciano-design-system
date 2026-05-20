import type { Meta, StoryObj } from "@storybook/react";
import { Home, Users, File, Settings, Bell } from "lucide-react";
import { SegmentedControl } from "./SegmentedControl";

const TEXT_OPTIONS = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "pending", label: "Pending" },
  { value: "draft", label: "Draft" },
  { value: "archived", label: "Archived" },
];

const ICON_OPTIONS = [
  { value: "home", label: "Home", icon: Home },
  { value: "users", label: "Users", icon: Users },
  { value: "files", label: "Files", icon: File },
  { value: "settings", label: "Settings", icon: Settings },
  { value: "bell", label: "Alerts", icon: Bell },
];

const meta: Meta<typeof SegmentedControl> = {
  title: "Components/Segmented control",
  component: SegmentedControl,
  parameters: {
    layout: "centered",
    docs: {
      subtitle: "Used to select 1 option from up to 5 related options.",
    },
  },
  argTypes: {
    size: {
      control: "select",
      options: ["Medium", "Small"],
      table: { defaultValue: { summary: "Medium" } },
    },
    disabled: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    options: { table: { disable: true } },
    value: { table: { disable: true } },
    defaultValue: { table: { disable: true } },
    onChange: { table: { disable: true } },
    className: { table: { disable: true } },
  },
  render: ({ size, disabled }) => (
    <SegmentedControl
      options={TEXT_OPTIONS}
      defaultValue="all"
      size={size}
      disabled={disabled}
    />
  ),
};

export default meta;
type Story = StoryObj<typeof SegmentedControl>;

export const Default: Story = {
  args: {
    size: "Medium",
    disabled: false,
  },
};

export const Small: Story = {
  args: {
    size: "Small",
    disabled: false,
  },
};

export const WithIcons: Story = {
  render: () => (
    <SegmentedControl
      options={ICON_OPTIONS}
      defaultValue="home"
      size="Medium"
    />
  ),
  parameters: { controls: { disable: true } },
};

export const WithIconsSmall: Story = {
  render: () => (
    <SegmentedControl options={ICON_OPTIONS} defaultValue="home" size="Small" />
  ),
  parameters: { controls: { disable: true } },
};

export const WithDisabledOption: Story = {
  render: () => (
    <SegmentedControl
      options={[
        { value: "all", label: "All" },
        { value: "active", label: "Active" },
        { value: "draft", label: "Draft", disabled: true },
        { value: "archived", label: "Archived", disabled: true },
      ]}
      defaultValue="all"
      size="Medium"
    />
  ),
  parameters: { controls: { disable: true } },
};

export const Disabled: Story = {
  args: {
    size: "Medium",
    disabled: true,
  },
};
