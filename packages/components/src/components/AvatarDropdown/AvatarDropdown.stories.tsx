import type { Meta, StoryObj } from "@storybook/react";
import { AvatarDropdown } from "./AvatarDropdown";

const AVATAR_SRC = "https://i.pravatar.cc/150?img=12";

const meta: Meta<typeof AvatarDropdown> = {
  title: "Components/Avatar/Avatar dropdown",
  component: AvatarDropdown,
  parameters: {
    layout: "centered",
    docs: {
      subtitle:
        "Combines an avatar with a dropdown trigger for user account actions.",
    },
  },
  argTypes: {
    type: {
      control: "select",
      options: ["Button", "Navigation"],
      table: { defaultValue: { summary: "Button" } },
    },
    avatarType: {
      control: "select",
      options: ["Photo", "Icon", "Initials"],
      table: { defaultValue: { summary: "Photo" } },
    },
    isOpen: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    disabled: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    name: { table: { defaultValue: { summary: "Alex Acciano" } } },
    initials: { control: "text", table: { defaultValue: { summary: "AA" } } },
  },
  args: { initials: "AA" },
};

export default meta;
type Story = StoryObj<typeof AvatarDropdown>;

export const Default: Story = {
  args: {
    type: "Button",
    name: "Alex Acciano",
    avatarType: "Photo",
    src: AVATAR_SRC,
  },
};

export const Navigation: Story = {
  args: {
    type: "Navigation",
    name: "Alex Acciano",
    avatarType: "Photo",
    src: AVATAR_SRC,
  },
};

export const Open: Story = {
  args: {
    type: "Button",
    name: "Alex Acciano",
    avatarType: "Photo",
    src: AVATAR_SRC,
    isOpen: true,
  },
};

export const Disabled: Story = {
  args: {
    type: "Button",
    name: "Alex Acciano",
    avatarType: "Photo",
    src: AVATAR_SRC,
    disabled: true,
  },
};
