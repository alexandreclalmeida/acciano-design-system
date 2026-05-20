import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "./Avatar";

const AVATAR_SRC = "https://i.pravatar.cc/150?img=12";

const meta: Meta<typeof Avatar> = {
  title: "Components/Avatar/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
    docs: {
      subtitle: "A visual representation of a user.",
    },
  },
  argTypes: {
    type: {
      control: "select",
      options: ["Photo", "Icon", "Initials"],
      table: { defaultValue: { summary: "Photo" } },
    },
    size: {
      control: "select",
      options: ["Large", "Medium", "Small"],
      table: { defaultValue: { summary: "Medium" } },
    },
    initials: { control: "text", table: { defaultValue: { summary: "AA" } } },
    status: {
      control: "select",
      options: [
        "none",
        "Info",
        "Success",
        "Online",
        "Warning",
        "Away",
        "Critical",
        "Busy",
        "Offline",
        "Notification",
      ],
      mapping: { none: undefined },
      table: { defaultValue: { summary: "none" } },
    },
    showNotification: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
  },
  args: { initials: "AA" },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: { type: "Photo", size: "Medium", src: AVATAR_SRC, alt: "Alex Acciano" },
};

export const Initials: Story = {
  args: { type: "Initials", size: "Medium", initials: "AA" },
};

export const Icon: Story = {
  args: { type: "Icon", size: "Medium" },
};

export const WithStatus: Story = {
  args: {
    type: "Photo",
    size: "Medium",
    src: AVATAR_SRC,
    alt: "Alex Acciano",
    status: "Online",
  },
};

export const WithNotification: Story = {
  args: {
    type: "Photo",
    size: "Medium",
    src: AVATAR_SRC,
    alt: "Alex Acciano",
    showNotification: true,
  },
};

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <Avatar type="Photo" size="Large" src={AVATAR_SRC} alt="Alex Acciano" />
      <Avatar type="Photo" size="Medium" src={AVATAR_SRC} alt="Alex Acciano" />
      <Avatar type="Photo" size="Small" src={AVATAR_SRC} alt="Alex Acciano" />
    </div>
  ),
};
