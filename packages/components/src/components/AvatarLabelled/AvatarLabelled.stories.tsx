import type { Meta, StoryObj } from "@storybook/react";
import { AvatarLabelled } from "./AvatarLabelled";

const AVATAR_SRC = "https://i.pravatar.cc/150?img=12";

const meta: Meta<typeof AvatarLabelled> = {
  title: "Components/Avatar/Avatar labelled",
  component: AvatarLabelled,
  parameters: {
    layout: "centered",
    docs: {
      subtitle:
        "Displays an avatar alongside the user's name and email address.",
    },
  },
  argTypes: {
    size: {
      control: "select",
      options: ["Large", "Medium", "Small"],
      table: { defaultValue: { summary: "Medium" } },
    },
    type: {
      control: "select",
      options: ["Photo", "Icon", "Initials"],
      table: { defaultValue: { summary: "Photo" } },
    },
    name: { table: { defaultValue: { summary: "Alex Acciano" } } },
    email: { table: { defaultValue: { summary: "alex@acciano.com" } } },
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
type Story = StoryObj<typeof AvatarLabelled>;

export const Default: Story = {
  args: {
    size: "Medium",
    name: "Alex Acciano",
    email: "alex@acciano.com",
    type: "Photo",
    src: AVATAR_SRC,
  },
};

export const Initials: Story = {
  args: {
    size: "Medium",
    name: "Alex Acciano",
    email: "alex@acciano.com",
    type: "Initials",
    initials: "AA",
  },
};

export const WithStatus: Story = {
  args: {
    size: "Medium",
    name: "Alex Acciano",
    email: "alex@acciano.com",
    type: "Photo",
    src: AVATAR_SRC,
    status: "Online",
  },
};

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <AvatarLabelled
        size="Large"
        name="Alex Acciano"
        email="alex@acciano.com"
        type="Photo"
        src={AVATAR_SRC}
      />
      <AvatarLabelled
        size="Medium"
        name="Alex Acciano"
        email="alex@acciano.com"
        type="Photo"
        src={AVATAR_SRC}
      />
      <AvatarLabelled
        size="Small"
        name="Alex Acciano"
        type="Photo"
        src={AVATAR_SRC}
      />
    </div>
  ),
};
