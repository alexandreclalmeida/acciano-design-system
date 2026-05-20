import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Info as InfoIcon,
} from "lucide-react";
import { ICON_OPTIONS, ICON_MAPPING } from "../../storybook/lucide-icons";
import { AlertGlobal } from "./AlertGlobal";
import { Button } from "../Button/Button";

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

const meta: Meta<typeof AlertGlobal> = {
  title: "Components/Alert global",
  component: AlertGlobal,
  parameters: {
    layout: "fullscreen",
    docs: {
      subtitle:
        "Placed at the top of a page and used to convey important system-wide messages.",
    },
  },
  argTypes: {
    tone: {
      control: "select",
      options: TONE_OPTIONS,
      table: { defaultValue: { summary: "Neutral" } },
    },
    device: {
      control: "select",
      options: ["Desktop", "Mobile"],
      table: { defaultValue: { summary: "Desktop" } },
    },
    showIcon: {
      control: "boolean",
      table: { defaultValue: { summary: "true" } },
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
    children: { control: "text" },
    buttons: { table: { disable: true } },
    onClose: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof AlertGlobal>;

const BODY = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";

const DefaultButton = (
  <Button variant="Secondary" tone="Neutral" size="Small">
    Label
  </Button>
);

const InverseButton = (
  <Button variant="Secondary" tone="Inverse" size="Small">
    Label
  </Button>
);

export const Default: Story = {
  args: {
    tone: "Neutral",
    device: "Desktop",
    showIcon: true,
    showClose: true,
    children: BODY,
    buttons: DefaultButton,
  },
};

export const Mobile: Story = {
  args: {
    ...Default.args,
    device: "Mobile",
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
  args: { ...Default.args, tone: "InvNeutral", buttons: InverseButton },
};

export const InvBrand: Story = {
  args: { ...Default.args, tone: "InvBrand", buttons: InverseButton },
};

export const NoButtons: Story = {
  args: { ...Default.args, buttons: undefined },
};

export const NoIcon: Story = {
  args: { ...Default.args, showIcon: false },
};
