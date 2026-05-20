import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Hero } from "./Hero";
import { Button } from "../Button/Button";
import { TextInput } from "../TextInput/TextInput";
import { Tag } from "../Tag/Tag";
import { AvatarStack } from "../AvatarStack/AvatarStack";
import { Avatar } from "../Avatar/Avatar";
import { Rating } from "../Rating/Rating";

// ─── Shared constants ───────────────────────────────────────────

const HEADING = "Lorem ipsum dolor sit amet consectetur";
const DESCRIPTION =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.";
const IMAGE_SRC =
  "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=1200&h=900&fit=crop&crop=top";
const AVATAR_SRCS = [
  "https://i.pravatar.cc/96?img=2",
  "https://i.pravatar.cc/96?img=3",
  "https://i.pravatar.cc/96?img=4",
  "https://i.pravatar.cc/96?img=5",
  "https://i.pravatar.cc/96?img=6",
];

// ─── Slot helpers ───────────────────────────────────────────────

const EmailSlot = (
  <>
    <div style={{ width: 320 }}>
      <TextInput placeholder="Email" />
    </div>
    <Button variant="Primary" tone="Brand" size="Medium">
      Subscribe
    </Button>
  </>
);

const ButtonsSlotLarge = (
  <>
    <Button variant="Primary" tone="Brand" size="Large">
      Buy now
    </Button>
    <Button variant="Secondary" tone="Brand" size="Large">
      Free preview
    </Button>
  </>
);

const ButtonsSlotMedium = (
  <>
    <Button variant="Primary" tone="Brand" size="Medium">
      Buy now
    </Button>
    <Button variant="Secondary" tone="Brand" size="Medium">
      Free preview
    </Button>
  </>
);

const SocialSlot5 = (
  <>
    <AvatarStack size="Medium">
      {AVATAR_SRCS.map((src, i) => (
        <Avatar
          key={src}
          type="Photo"
          size="Medium"
          src={src}
          alt={`User ${i + 1}`}
        />
      ))}
    </AvatarStack>
    <Rating
      type="Star"
      layout="Vertical"
      value={3.5}
      showNumber
      showReviews
      reviewCount={23}
    />
  </>
);

const SocialSlot3 = (
  <>
    <AvatarStack size="Medium">
      {AVATAR_SRCS.slice(0, 3).map((src, i) => (
        <Avatar
          key={src}
          type="Photo"
          size="Medium"
          src={src}
          alt={`User ${i + 1}`}
        />
      ))}
    </AvatarStack>
    <Rating
      type="Star"
      layout="Vertical"
      value={3.5}
      showNumber
      showReviews
      reviewCount={23}
    />
  </>
);

const DefaultTag = <Tag label="New feature" size="Small" />;

// ─── Meta ───────────────────────────────────────────────────────

const meta: Meta<typeof Hero> = {
  title: "Components/Hero",
  component: Hero,
  parameters: {
    layout: "fullscreen",
    docs: {
      subtitle:
        "A large banner that generally sits under a website header to introduce the page or product.",
    },
  },
  argTypes: {
    type: {
      control: "select",
      options: [
        "Horizontal",
        "Horizontal padded",
        "Vertical",
        "Vertical large",
        "Vertical small",
      ],
      table: { defaultValue: { summary: "Horizontal" } },
    },
    device: {
      control: "select",
      options: ["Desktop", "Tablet", "Mobile"],
      table: { defaultValue: { summary: "Desktop" } },
    },
    heading: { control: "text" },
    description: { control: "text" },
    label: { control: "text" },
    tag: { table: { disable: true } },
    emailSlot: { table: { disable: true } },
    buttonsSlot: { table: { disable: true } },
    socialSlot: { table: { disable: true } },
    imageSrc: { control: "text" },
    imageAlt: { control: "text" },
    className: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof Hero>;

// ─── Desktop ─────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    type: "Horizontal",
    device: "Desktop",
    heading: HEADING,
    description: DESCRIPTION,
    emailSlot: EmailSlot,
    buttonsSlot: ButtonsSlotLarge,
    socialSlot: SocialSlot5,
    imageSrc: IMAGE_SRC,
  },
};

export const HorizontalPadded: Story = {
  args: {
    ...Default.args,
    type: "Horizontal padded",
  },
  parameters: { controls: { disable: true } },
};

export const Vertical: Story = {
  args: {
    ...Default.args,
    type: "Vertical",
  },
  parameters: { controls: { disable: true } },
};

export const VerticalLarge: Story = {
  args: {
    ...Default.args,
    type: "Vertical large",
  },
  parameters: { controls: { disable: true } },
};

export const VerticalSmall: Story = {
  args: {
    ...Default.args,
    type: "Vertical small",
  },
  parameters: { controls: { disable: true } },
};

// ─── With optional content ────────────────────────────────────────

export const WithLabel: Story = {
  args: {
    ...Default.args,
    label: "New release",
  },
  parameters: { controls: { disable: true } },
};

export const WithTag: Story = {
  args: {
    ...Default.args,
    tag: DefaultTag,
  },
  parameters: { controls: { disable: true } },
};

// ─── Tablet ───────────────────────────────────────────────────────

export const Tablet: Story = {
  args: {
    type: "Horizontal",
    device: "Tablet",
    heading: HEADING,
    description: DESCRIPTION,
    emailSlot: EmailSlot,
    buttonsSlot: ButtonsSlotLarge,
    socialSlot: SocialSlot5,
    imageSrc: IMAGE_SRC,
  },
  parameters: { controls: { disable: true } },
};

// ─── Mobile ───────────────────────────────────────────────────────

export const Mobile: Story = {
  args: {
    type: "Horizontal",
    device: "Mobile",
    heading: HEADING,
    description: DESCRIPTION,
    emailSlot: (
      <>
        <TextInput placeholder="Email" />
        <Button variant="Primary" tone="Brand" size="Medium">
          Subscribe
        </Button>
      </>
    ),
    buttonsSlot: ButtonsSlotMedium,
    socialSlot: SocialSlot3,
    imageSrc: IMAGE_SRC,
  },
  parameters: { controls: { disable: true } },
};
