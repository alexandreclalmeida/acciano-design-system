import type { Meta, StoryObj } from "@storybook/react";
import { File, Home, Settings, Users, Bell } from "lucide-react";
import { ICON_OPTIONS, ICON_MAPPING } from "../../storybook/lucide-icons";
import { Tabs, TabList, Tab, TabPanel } from "./Tabs";

const meta: Meta<typeof Tab> = {
  title: "Components/Tabs",
  component: Tab,
  parameters: {
    layout: "padded",
    docs: {
      subtitle: "Used for navigation or to show and hide content.",
    },
  },
  argTypes: {
    children: {
      control: "text",
      table: { defaultValue: { summary: "Label" } },
    },
    disabled: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    leadingIcon: {
      control: "select",
      options: ["none", ...ICON_OPTIONS],
      mapping: { none: undefined, ...ICON_MAPPING },
      table: { defaultValue: { summary: "none" } },
    },
    count: {
      control: "number",
      table: { defaultValue: { summary: "—" } },
    },
    value: { table: { disable: true } },
    className: { table: { disable: true } },
  },
  render: ({ value: _v, ...args }) => (
    <Tabs defaultValue="first">
      <TabList>
        <Tab value="first" {...args} />
        <Tab value="second">Other</Tab>
        <Tab value="third">Another</Tab>
        <Tab value="fourth">More</Tab>
      </TabList>
      <TabPanel value="first">
        <p style={{ padding: "16px 0", color: "var(--color-text-high)" }}>First tab content</p>
      </TabPanel>
      <TabPanel value="second">
        <p style={{ padding: "16px 0", color: "var(--color-text-high)" }}>Second tab content</p>
      </TabPanel>
      <TabPanel value="third">
        <p style={{ padding: "16px 0", color: "var(--color-text-high)" }}>Third tab content</p>
      </TabPanel>
      <TabPanel value="fourth">
        <p style={{ padding: "16px 0", color: "var(--color-text-high)" }}>Fourth tab content</p>
      </TabPanel>
    </Tabs>
  ),
};

export default meta;
type Story = StoryObj<typeof Tab>;

export const Default: Story = {
  args: {
    children: "Label",
    disabled: false,
  },
};

export const WithIcons: Story = {
  render: () => (
    <Tabs defaultValue="home">
      <TabList>
        <Tab value="home" leadingIcon={Home}>Home</Tab>
        <Tab value="users" leadingIcon={Users}>Users</Tab>
        <Tab value="files" leadingIcon={File}>Files</Tab>
        <Tab value="settings" leadingIcon={Settings}>Settings</Tab>
      </TabList>
      <TabPanel value="home">
        <p style={{ padding: "16px 0", color: "var(--color-text-high)" }}>Home content</p>
      </TabPanel>
      <TabPanel value="users">
        <p style={{ padding: "16px 0", color: "var(--color-text-high)" }}>Users content</p>
      </TabPanel>
      <TabPanel value="files">
        <p style={{ padding: "16px 0", color: "var(--color-text-high)" }}>Files content</p>
      </TabPanel>
      <TabPanel value="settings">
        <p style={{ padding: "16px 0", color: "var(--color-text-high)" }}>Settings content</p>
      </TabPanel>
    </Tabs>
  ),
};

export const WithCount: Story = {
  render: () => (
    <Tabs defaultValue="all">
      <TabList>
        <Tab value="all" count={24}>All</Tab>
        <Tab value="active" count={8}>Active</Tab>
        <Tab value="notifications" count={3} leadingIcon={Bell}>Notifications</Tab>
        <Tab value="archived">Archived</Tab>
      </TabList>
      <TabPanel value="all">
        <p style={{ padding: "16px 0", color: "var(--color-text-high)" }}>All items</p>
      </TabPanel>
      <TabPanel value="active">
        <p style={{ padding: "16px 0", color: "var(--color-text-high)" }}>Active items</p>
      </TabPanel>
      <TabPanel value="notifications">
        <p style={{ padding: "16px 0", color: "var(--color-text-high)" }}>Notifications</p>
      </TabPanel>
      <TabPanel value="archived">
        <p style={{ padding: "16px 0", color: "var(--color-text-high)" }}>Archived items</p>
      </TabPanel>
    </Tabs>
  ),
};

export const WithDisabled: Story = {
  render: () => (
    <Tabs defaultValue="active">
      <TabList>
        <Tab value="active">Active</Tab>
        <Tab value="pending">Pending</Tab>
        <Tab value="draft" disabled>Draft</Tab>
        <Tab value="archived" disabled>Archived</Tab>
      </TabList>
      <TabPanel value="active">
        <p style={{ padding: "16px 0", color: "var(--color-text-high)" }}>Active content</p>
      </TabPanel>
      <TabPanel value="pending">
        <p style={{ padding: "16px 0", color: "var(--color-text-high)" }}>Pending content</p>
      </TabPanel>
    </Tabs>
  ),
};
