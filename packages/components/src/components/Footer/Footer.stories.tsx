import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Footer } from "./Footer";
import type { FooterColumn, FooterLink, FooterSocialLink } from "./Footer";

// ─── Sample data ───────────────────────────────────────────────

const NAV_LINKS: FooterLink[] = [
  { label: "Home", href: "#" },
  { label: "About", href: "#" },
  { label: "Work", href: "#" },
  { label: "Services", href: "#" },
  { label: "Contact", href: "#" },
];

const SOCIAL_LINKS: FooterSocialLink[] = [
  { icon: "instagram", href: "#" },
  { icon: "facebook", href: "#" },
  { icon: "linkedin", href: "#" },
  { icon: "x-twitter", href: "#" },
  { icon: "youtube", href: "#" },
];

const COLUMNS: FooterColumn[] = [
  {
    heading: "Product",
    links: [
      { label: "Features", href: "#" },
      { label: "Pricing", href: "#" },
      { label: "Changelog", href: "#" },
      { label: "Roadmap", href: "#" },
      { label: "Status", href: "#" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Press", href: "#" },
      { label: "Partners", href: "#" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Documentation", href: "#" },
      { label: "Guides", href: "#" },
      { label: "Support", href: "#" },
      { label: "API", href: "#" },
      { label: "Community", href: "#" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
      { label: "Cookies", href: "#" },
      { label: "Licenses", href: "#" },
      { label: "Security", href: "#" },
    ],
  },
];

const DESCRIPTION =
  "A design system built with care for developers and designers who value consistency, accessibility, and craft.";

// ─── Meta ───────────────────────────────────────────────────────

const meta: Meta<typeof Footer> = {
  title: "Components/Footer",
  component: Footer,
  parameters: {
    layout: "fullscreen",
    docs: {
      subtitle:
        "Placed at the bottom of a website or application to house branding and navigation.",
    },
  },
  argTypes: {
    device: {
      control: "select",
      options: ["Desktop", "Tablet", "Mobile"],
      table: { defaultValue: { summary: "Desktop" } },
    },
    size: {
      control: "select",
      options: ["Small", "Large", "About"],
      table: { defaultValue: { summary: "Small" } },
    },
    links: { table: { disable: true } },
    columns: { table: { disable: true } },
    socialLinks: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof Footer>;

// ─── Desktop ─────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    device: "Desktop",
    size: "Small",
    links: NAV_LINKS,
    socialLinks: SOCIAL_LINKS,
  },
};

export const Large: Story = {
  args: {
    device: "Desktop",
    size: "Large",
    columns: COLUMNS,
    socialLinks: SOCIAL_LINKS,
  },
};

// ─── Tablet ──────────────────────────────────────────────────────

export const Tablet: Story = {
  args: {
    device: "Tablet",
    size: "Small",
    links: NAV_LINKS,
    socialLinks: SOCIAL_LINKS,
  },
};

export const TabletLarge: Story = {
  name: "Tablet / Large",
  args: {
    device: "Tablet",
    size: "About",
    columns: COLUMNS,
    socialLinks: SOCIAL_LINKS,
    description: DESCRIPTION,
  },
};

// ─── Mobile ───────────────────────────────────────────────────────

export const Mobile: Story = {
  args: {
    device: "Mobile",
    size: "Small",
    links: NAV_LINKS,
    socialLinks: SOCIAL_LINKS,
  },
};

export const MobileLarge: Story = {
  name: "Mobile / Large",
  args: {
    device: "Mobile",
    size: "About",
    columns: COLUMNS,
    socialLinks: SOCIAL_LINKS,
    description: DESCRIPTION,
  },
};
