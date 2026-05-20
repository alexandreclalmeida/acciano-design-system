import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Home,
  Folder,
  Users,
  Bell,
  Settings,
  LogOut,
  HelpCircle,
  Search,
} from "lucide-react";
import { LogoAcciano } from "@acciano/logos";
import { NavigationSide } from "./NavigationSide";
import { NavigationSideItem } from "./NavigationSideItem";
import { SearchInput } from "../SearchInput/SearchInput";
import { Button } from "../Button/Button";
import { Avatar } from "../Avatar/Avatar";
import { AvatarDropdown } from "../AvatarDropdown/AvatarDropdown";

const AVATAR_SRC = "https://i.pravatar.cc/150?img=12";

// ─── Shared content ───────────────────────────────────────────

const MiddleItems = ({ selected = 0 }: { selected?: number }) => (
  <>
    <NavigationSideItem
      type="Default"
      label="Dashboard"
      icon={Home}
      selected={selected === 0}
      onClick={() => {}}
    />
    <NavigationSideItem
      type="Default"
      label="Projects"
      icon={Folder}
      selected={selected === 1}
      onClick={() => {}}
    />
    <NavigationSideItem
      type="Default"
      label="Team"
      icon={Users}
      selected={selected === 2}
      onClick={() => {}}
    />
    <NavigationSideItem
      type="Default"
      label="Notifications"
      icon={Bell}
      count={8}
      selected={selected === 3}
      onClick={() => {}}
    />
    <NavigationSideItem
      type="Default"
      label="Activity"
      icon={Search}
      badge="New"
      selected={selected === 4}
      onClick={() => {}}
    />
  </>
);

const BottomItems = () => (
  <>
    <NavigationSideItem
      type="Default"
      label="Settings"
      icon={Settings}
      onClick={() => {}}
    />
    <NavigationSideItem
      type="Default"
      label="Help"
      icon={HelpCircle}
      onClick={() => {}}
    />
    <NavigationSideItem
      type="Default"
      label="Log out"
      icon={LogOut}
      onClick={() => {}}
    />
  </>
);

const NavAvatar = () => (
  <NavigationSideItem type="Avatar">
    <AvatarDropdown
      type="Navigation"
      name="Alex Acciano"
      email="alex.acciano@aa.com"
      src={AVATAR_SRC}
    />
  </NavigationSideItem>
);

// ─── Meta ─────────────────────────────────────────────────────

const meta: Meta<typeof NavigationSide> = {
  title: "Components/Navigation side",
  component: NavigationSide,
  parameters: {
    layout: "fullscreen",
    docs: {
      subtitle:
        "Placed on the side of an application to house branding and navigation.",
    },
  },
  argTypes: {
    device: {
      control: "select",
      options: ["Desktop", "MobileClosed", "MobileOpen"],
      table: { defaultValue: { summary: "Desktop" } },
    },
    logo: { table: { disable: true } },
    topContent: { table: { disable: true } },
    children: { table: { disable: true } },
    bottomContent: { table: { disable: true } },
    mobileBarRightSlot: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof NavigationSide>;

// ─── Default — nav completo com todas as seções ───────────────

export const Default: Story = {
  render: () => (
    <div style={{ display: "flex", height: "100vh" }}>
      <NavigationSide
        device="Desktop"
        logo={<LogoAcciano />}
        topContent={<SearchInput placeholder="Search" />}
        bottomContent={
          <>
            <BottomItems />
            <NavigationSideItem type="Divider" />
            <NavigationSideItem
              type="Alert"
              alertHeading="Upgrade plan"
              alertDescription="Get access to all features and unlimited projects."
            />
            <NavigationSideItem type="Button">
              <Button variant="Primary" tone="Brand">
                Get started
              </Button>
            </NavigationSideItem>
            <NavAvatar />
          </>
        }
      >
        <MiddleItems selected={0} />
      </NavigationSide>
    </div>
  ),
};

// ─── With Sections — headers e dividers ──────────────────────

export const WithSections: Story = {
  render: () => (
    <div style={{ display: "flex", height: "100vh" }}>
      <NavigationSide
        device="Desktop"
        logo={<LogoAcciano />}
        bottomContent={
          <>
            <NavigationSideItem type="Divider" />
            <BottomItems />
            <NavAvatar />
          </>
        }
      >
        <NavigationSideItem type="Header" label="Main" />
        <NavigationSideItem
          type="Default"
          label="Dashboard"
          icon={Home}
          selected
          onClick={() => {}}
        />
        <NavigationSideItem
          type="Default"
          label="Projects"
          icon={Folder}
          onClick={() => {}}
        />
        <NavigationSideItem type="Divider" />
        <NavigationSideItem type="Header" label="Workspace" />
        <NavigationSideItem
          type="Default"
          label="Team"
          icon={Users}
          onClick={() => {}}
        />
        <NavigationSideItem
          type="Default"
          label="Notifications"
          icon={Bell}
          count={3}
          onClick={() => {}}
        />
        <NavigationSideItem
          type="Default"
          label="Activity"
          icon={Search}
          onClick={() => {}}
        />
      </NavigationSide>
    </div>
  ),
};

// ─── Mobile — barra fechada ↔ painel aberto ───────────────────

export const Mobile: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "var(--color-background-base)",
        }}
      >
        <NavigationSide
          device="MobileClosed"
          logo={<LogoAcciano width={140} />}
          onMenuClick={() => setOpen(true)}
          mobileBarRightSlot={
            <Avatar
              size="Small"
              type="Photo"
              src={AVATAR_SRC}
              alt="Alex Acciano"
            />
          }
        />
        {open && (
          <NavigationSide
            device="MobileOpen"
            topContent={<SearchInput placeholder="Search" />}
            onCloseClick={() => setOpen(false)}
            bottomContent={
              <>
                <BottomItems />
                <NavigationSideItem type="Divider" />
                <NavigationSideItem
                  type="Alert"
                  alertHeading="Upgrade plan"
                  alertDescription="Get access to all features and unlimited projects."
                />
                <NavigationSideItem type="Button">
                  <Button variant="Primary" tone="Brand">
                    Get started
                  </Button>
                </NavigationSideItem>
                <NavAvatar />
              </>
            }
          >
            <MiddleItems selected={0} />
          </NavigationSide>
        )}
      </div>
    );
  },
};
