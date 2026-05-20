import type { Meta, StoryObj } from "@storybook/react";
import { AvatarStack } from "./AvatarStack";
import { Avatar } from "../Avatar/Avatar";

const AVATARS = [
  { src: "https://i.pravatar.cc/150?img=2", alt: "User 1" },
  { src: "https://i.pravatar.cc/150?img=3", alt: "User 2" },
  { src: "https://i.pravatar.cc/150?img=4", alt: "User 3" },
  { src: "https://i.pravatar.cc/150?img=5", alt: "User 4" },
  { src: "https://i.pravatar.cc/150?img=6", alt: "User 5" },
  { src: "https://i.pravatar.cc/150?img=7", alt: "User 6" },
  { src: "https://i.pravatar.cc/150?img=8", alt: "User 7" },
];

const meta: Meta<typeof AvatarStack> = {
  title: "Components/Avatar/Avatar stack",
  component: AvatarStack,
  parameters: {
    layout: "centered",
    docs: {
      subtitle:
        "Shows a compact group of overlapping avatars with an overflow count.",
    },
  },
  argTypes: {
    size: {
      control: "select",
      options: ["Large", "Medium", "Small"],
      table: { defaultValue: { summary: "Medium" } },
    },
    max: {
      control: { type: "number", min: 1 },
      table: { defaultValue: { summary: "5" } },
    },
    children: { table: { disable: true } },
  },
  render: (args) => (
    <AvatarStack {...args}>
      {AVATARS.slice(0, 3).map((a) => (
        <Avatar
          key={a.src}
          type="Photo"
          size={args.size ?? "Medium"}
          src={a.src}
          alt={a.alt}
        />
      ))}
    </AvatarStack>
  ),
};

export default meta;
type Story = StoryObj<typeof AvatarStack>;

export const Default: Story = {
  args: { size: "Medium", max: 5 },
};

export const WithOverflow: Story = {
  args: { size: "Medium", max: 5 },
  render: (args) => (
    <AvatarStack {...args}>
      {AVATARS.map((a) => (
        <Avatar
          key={a.src}
          type="Photo"
          size="Medium"
          src={a.src}
          alt={a.alt}
        />
      ))}
    </AvatarStack>
  ),
};

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {(["Large", "Medium", "Small"] as const).map((size) => (
        <AvatarStack key={size} size={size}>
          {AVATARS.slice(0, 3).map((a) => (
            <Avatar
              key={a.src}
              type="Photo"
              size={size}
              src={a.src}
              alt={a.alt}
            />
          ))}
        </AvatarStack>
      ))}
    </div>
  ),
};
