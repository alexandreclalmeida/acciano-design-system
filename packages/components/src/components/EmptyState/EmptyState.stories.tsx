import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Monitor } from "lucide-react";
import { EmptyState } from "./EmptyState";
import { Capsule } from "../Capsule/Capsule";
import { Button } from "../Button/Button";
import { ButtonGroup } from "../ButtonGroup/ButtonGroup";

const HEADING = "Heading";
const DESCRIPTION =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

const DefaultCapsule = (
  <Capsule icon={Monitor} tone="Neutral" variant="Filled" />
);

const DefaultActions = (
  <ButtonGroup size="Medium">
    <Button variant="Primary" tone="Brand">
      Label
    </Button>
    <Button variant="Secondary" tone="Brand">
      Label
    </Button>
    <Button variant="Tertiary" tone="Brand">
      Label
    </Button>
  </ButtonGroup>
);

const meta: Meta<typeof EmptyState> = {
  title: "Components/Empty state",
  component: EmptyState,
  parameters: {
    layout: "centered",
    docs: {
      subtitle: "Used when a table, list, or chart has no data to display.",
    },
  },
  argTypes: {
    heading: { table: { defaultValue: { summary: HEADING } } },
    description: { table: { defaultValue: { summary: DESCRIPTION } } },
    capsule: { table: { disable: true } },
    actions: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {
  args: {
    capsule: DefaultCapsule,
    heading: HEADING,
    description: DESCRIPTION,
    actions: DefaultActions,
  },
};

export const NoCapsule: Story = {
  args: {
    heading: HEADING,
    description: DESCRIPTION,
    actions: DefaultActions,
  },
};

