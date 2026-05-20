import type { Meta, StoryObj } from "@storybook/react";
import { ArrowRight, Monitor } from "lucide-react";
import { AvatarLabelled } from "../AvatarLabelled/AvatarLabelled";
import { Capsule } from "../Capsule/Capsule";
import { LinkButton } from "../LinkButton/LinkButton";
import { Tag } from "../Tag/Tag";
import { TagGroup } from "../TagGroup/TagGroup";
import { Card } from "./Card";

const IMAGE_URL =
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80";

const LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  parameters: {
    layout: "centered",
    docs: {
      subtitle: "Used to display content and actions on a single topic.",
    },
  },
  argTypes: {
    layout: {
      control: "select",
      options: ["Vertical", "Horizontal"],
      table: { defaultValue: { summary: "Vertical" } },
    },
    heading: { control: "text" },
    label: { control: "text" },
    description: { control: "text" },
    imageSrc: { table: { disable: true } },
    imageAlt: { table: { disable: true } },
    capsule: { table: { disable: true } },
    link: { table: { disable: true } },
    avatar: { table: { disable: true } },
    tags: { table: { disable: true } },
    children: { table: { disable: true } },
    className: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <div style={{ width: "364px" }}>
      <Card
        imageSrc={IMAGE_URL}
        heading="Heading"
        description={LOREM}
        avatar={
          <AvatarLabelled name="Alex Acciano" email="alex.acciano@aa.com" />
        }
      />
    </div>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <div style={{ width: "600px" }}>
      <Card
        layout="Horizontal"
        imageSrc={IMAGE_URL}
        heading="Heading"
        description={LOREM}
        avatar={
          <AvatarLabelled name="Alex Acciano" email="alex.acciano@aa.com" />
        }
      />
    </div>
  ),
};

export const WithTags: Story = {
  render: () => (
    <div style={{ width: "364px" }}>
      <Card
        imageSrc={IMAGE_URL}
        heading="Heading"
        description={LOREM}
        avatar={
          <AvatarLabelled name="Alex Acciano" email="alex.acciano@aa.com" />
        }
        tags={
          <TagGroup>
            <Tag label="Label" size="Small" />
            <Tag label="Label" size="Small" />
            <Tag label="Label" size="Small" />
          </TagGroup>
        }
      />
    </div>
  ),
};

export const NoImage: Story = {
  render: () => (
    <div style={{ width: "364px" }}>
      <Card
        capsule={<Capsule tone="Brand" variant="Filled" icon={Monitor} />}
        heading="Heading"
        description={LOREM}
        link={
          <LinkButton
            tone="neutral"
            size="base"
            weight="bold"
            trailingIcon={ArrowRight}
            underline={false}
          >
            Link
          </LinkButton>
        }
      />
    </div>
  ),
};

export const Minimal: Story = {
  render: () => (
    <div style={{ width: "364px" }}>
      <Card heading="Heading" description={LOREM} />
    </div>
  ),
};
