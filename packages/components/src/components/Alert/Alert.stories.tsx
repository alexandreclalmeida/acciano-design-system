import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Info as InfoIcon,
} from "lucide-react";
import { ICON_OPTIONS, ICON_MAPPING } from "../../storybook/lucide-icons";
import { Alert } from "./Alert";
import { Button } from "../Button/Button";
import { LinkButton } from "../LinkButton/LinkButton";

const TONE_OPTIONS = [
  "Neutral",
  "Brand",
  "Info",
  "Success",
  "Warning",
  "Critical",
  "InvNeutral",
  "InvBrand",
] as const;

const meta: Meta<typeof Alert> = {
  title: "Components/Alert",
  component: Alert,
  parameters: {
    layout: "centered",
    docs: {
      subtitle: "Used to convey an important message or status.",
    },
  },
  argTypes: {
    tone: {
      control: "select",
      options: TONE_OPTIONS,
      table: { defaultValue: { summary: "Neutral" } },
    },
    layout: {
      control: "select",
      options: ["Horizontal", "Vertical"],
      table: { defaultValue: { summary: "Horizontal" } },
    },
    size: {
      control: "select",
      options: ["Large", "Small"],
      table: { defaultValue: { summary: "Large" } },
    },
    showBar: {
      control: "boolean",
      table: { defaultValue: { summary: "true" } },
    },
    showIcon: {
      control: "boolean",
      table: { defaultValue: { summary: "true" } },
    },
    showCapsule: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    showClose: {
      control: "boolean",
      table: { defaultValue: { summary: "true" } },
    },
    icon: {
      control: "select",
      options: ["none", ...ICON_OPTIONS],
      mapping: { none: undefined, ...ICON_MAPPING },
      table: { defaultValue: { summary: "none (tone default)" } },
    },
    heading: {
      control: "text",
      table: { defaultValue: { summary: "Heading" } },
    },
    children: { table: { disable: true } },
    list: { table: { disable: true } },
    link: { table: { disable: true } },
    buttons: { table: { disable: true } },
    onClose: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

const BODY =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

const BODY_SHORT = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";

export const Default: Story = {
  args: {
    tone: "Neutral",
    layout: "Horizontal",
    size: "Large",
    showBar: true,
    showIcon: true,
    showCapsule: false,
    showClose: true,
    heading: "Heading",
    children: BODY,
  },
};

export const Small: Story = {
  args: {
    ...Default.args,
    size: "Small",
    children: BODY_SHORT,
  },
};

export const Vertical: Story = {
  args: {
    ...Default.args,
    layout: "Vertical",
  },
};

export const Brand: Story = {
  args: { ...Default.args, tone: "Brand" },
};

export const InfoTone: Story = {
  name: "Info",
  args: { ...Default.args, tone: "Info", icon: InfoIcon },
};

export const Success: Story = {
  args: { ...Default.args, tone: "Success", icon: CheckCircle2 },
};

export const Warning: Story = {
  args: { ...Default.args, tone: "Warning", icon: AlertTriangle },
};

export const Critical: Story = {
  args: { ...Default.args, tone: "Critical", icon: AlertCircle },
};

export const InvNeutral: Story = {
  args: { ...Default.args, tone: "InvNeutral" },
};

export const InvBrand: Story = {
  args: { ...Default.args, tone: "InvBrand" },
};

export const WithList: Story = {
  args: {
    ...Default.args,
    tone: "Critical",
    icon: AlertCircle,
    heading: "Please fix the following errors",
    children: "The form could not be submitted due to the following issues:",
    list: [
      "Email address is invalid",
      "Password must be at least 8 characters",
      "Date of birth is required",
    ],
  },
};

export const WithLink: Story = {
  args: {
    ...Default.args,
    tone: "Info",
    heading: "Update available",
    children: "A new version of the application is ready to install.",
    link: (
      <LinkButton tone="link" weight="bold">
        Learn more
      </LinkButton>
    ),
  },
};

export const WithButtons: Story = {
  args: {
    ...Default.args,
    tone: "Warning",
    icon: AlertTriangle,
    heading: "Unsaved changes",
    children:
      "You have unsaved changes that will be lost if you leave this page.",
    buttons: (
      <>
        <Button variant="Primary" tone="Neutral" size="Small">
          Save changes
        </Button>
        <Button variant="Secondary" tone="Neutral" size="Small">
          Discard
        </Button>
      </>
    ),
  },
};

export const WithCapsule: Story = {
  args: {
    ...Default.args,
    tone: "Success",
    icon: CheckCircle2,
    showIcon: false,
    showCapsule: true,
    heading: "Payment successful",
    children:
      "Your payment has been processed successfully. A receipt has been sent to your email.",
    layout: "Vertical",
  },
};

export const NoBar: Story = {
  args: {
    ...Default.args,
    showBar: false,
    heading: "Did you know?",
    children:
      "You can customise your dashboard layout by dragging and dropping widgets.",
  },
};

export const NoHeading: Story = {
  args: {
    ...Default.args,
    heading: undefined,
    children: "Your session will expire in 5 minutes. Please save your work.",
    tone: "Warning",
    icon: AlertTriangle,
  },
};
