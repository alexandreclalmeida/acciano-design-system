import type { Meta, StoryObj } from "@storybook/react";
import { Settings, User, LogOut, Star, Bell } from "lucide-react";
import { ICON_OPTIONS, ICON_MAPPING } from "../../storybook/lucide-icons";
import { DropdownMenu } from "./DropdownMenu";
import { DropdownMenuList } from "./DropdownMenuList";
import React from "react";

const SAMPLE_ITEMS = [
  { label: "Edit", leadingIcon: Settings, onClick: () => {} },
  { label: "Starred", leadingIcon: Star, count: 3, onClick: () => {} },
  { type: "Divider" as const },
  {
    label: "Sign out",
    type: "Critical" as const,
    leadingIcon: LogOut,
    onClick: () => {},
  },
];

const meta: Meta<typeof DropdownMenu> = {
  title: "Components/Dropdown menu",
  component: DropdownMenu,
  parameters: {
    layout: "centered",
    docs: {
      subtitle: "Displays a list of actions or options when pressed.",
    },
  },
  argTypes: {
    triggerType: {
      control: "select",
      options: ["Button", "Icon", "Avatar"],
      table: { defaultValue: { summary: "Button" } },
    },
    label: {
      control: "text",
      table: { defaultValue: { summary: "Label" } },
    },
    triggerIcon: {
      control: "select",
      options: ["none", ...ICON_OPTIONS],
      mapping: { none: undefined, ...ICON_MAPPING },
      table: { defaultValue: { summary: "MoreVertical" } },
    },
    align: {
      control: "select",
      options: ["BottomLeft", "BottomRight", "TopLeft", "TopRight"],
      table: { defaultValue: { summary: "BottomLeft" } },
    },
    avatarSrc: { table: { disable: true } },
    avatarName: { table: { disable: true } },
    avatarEmail: { table: { disable: true } },
    open: { table: { disable: true } },
    defaultOpen: { table: { disable: true } },
    onOpenChange: { table: { disable: true } },
    children: { table: { disable: true } },
    className: { table: { disable: true } },
  },
  render: (args) => (
    <div style={{ padding: "200px 300px" }}>
      <DropdownMenu {...args}>
        <DropdownMenuList items={SAMPLE_ITEMS} />
      </DropdownMenu>
    </div>
  ),
};

export default meta;
type Story = StoryObj<typeof DropdownMenu>;

export const Default: Story = {
  args: {
    triggerType: "Button",
    label: "Options",
    align: "BottomLeft",
  },
};

export const IconButton: Story = {
  args: {
    triggerType: "Icon",
    label: "Open menu",
    align: "BottomLeft",
  },
};

export const AvatarDropdown: Story = {
  render: () => (
    <div style={{ padding: "200px 300px" }}>
      <DropdownMenu
        triggerType="Avatar"
        avatarName="Alex Lima"
        avatarEmail="alex@acciano.com"
        align="BottomLeft"
      >
        <DropdownMenuList items={SAMPLE_ITEMS} />
      </DropdownMenu>
    </div>
  ),
};

export const AllItemTypes: Story = {
  render: () => {
    const [notifications, setNotifications] = React.useState(false);
    const [darkMode, setDarkMode] = React.useState(true);
    return (
      <div style={{ padding: "400px 300px" }}>
        <DropdownMenu label="All types" triggerType="Button" align="BottomLeft">
          <DropdownMenuList
            items={[
              { type: "Heading", label: "Account" },
              { label: "Profile", leadingIcon: User, onClick: () => {} },
              {
                label: "Settings",
                leadingIcon: Settings,
                trailingIcon: Bell,
                onClick: () => {},
              },
              {
                label: "Starred",
                leadingIcon: Star,
                count: 3,
                onClick: () => {},
              },
              { type: "Divider" },
              { type: "Heading", label: "Options" },
              {
                label: "Notifications",
                leadingIcon: Bell,
                switchChecked: notifications,
                onSwitchChange: setNotifications,
              },
              {
                label: "Dark mode",
                switchChecked: darkMode,
                onSwitchChange: setDarkMode,
              },
              { type: "Divider" },
              {
                label: "Sign out",
                type: "Critical",
                leadingIcon: LogOut,
                onClick: () => {},
              },
            ]}
          />
        </DropdownMenu>
      </div>
    );
  },
};
