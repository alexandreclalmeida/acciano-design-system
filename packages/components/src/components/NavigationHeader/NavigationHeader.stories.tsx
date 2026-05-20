import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  LayoutDashboard,
  Folder,
  Users,
  Bell,
  Settings,
  HelpCircle,
  Star,
  LogOut,
} from "lucide-react";
import { LogoAcciano } from "@acciano/logos";
import { NavigationHeader } from "./NavigationHeader";
import { NavigationHeaderItem } from "./NavigationHeaderItem";
import { NavigationSideItem } from "../NavigationSide/NavigationSideItem";
import { Button } from "../Button/Button";
import { ButtonGroup } from "../ButtonGroup/ButtonGroup";
import { Avatar } from "../Avatar/Avatar";
import { AvatarDropdown } from "../AvatarDropdown/AvatarDropdown";
import { DropdownMenu } from "../DropdownMenu/DropdownMenu";
import { DropdownMenuList } from "../DropdownMenu/DropdownMenuList";
import { Divider } from "../Divider/Divider";
import { SearchInput } from "../SearchInput/SearchInput";
import { IconButton } from "../IconButton/IconButton";
import { Breadcrumbs } from "../Breadcrumbs/Breadcrumbs";

const AVATAR_SRC = "https://i.pravatar.cc/150?img=12";

const AVATAR_ITEMS = [
  { label: "Profile", leadingIcon: Users, onClick: () => {} },
  { label: "Starred", leadingIcon: Star, count: 3, onClick: () => {} },
  { type: "Divider" as const },
  {
    label: "Sign out",
    type: "Critical" as const,
    leadingIcon: LogOut,
    onClick: () => {},
  },
];

// ─── Meta ──────────────────────────────────────────────────────

const meta: Meta<typeof NavigationHeader> = {
  title: "Components/Navigation header",
  component: NavigationHeader,
  parameters: {
    layout: "fullscreen",
    docs: {
      subtitle:
        "Placed at the top of a website or application to house branding and navigation.",
    },
  },
  argTypes: {
    device: {
      control: "select",
      options: ["Desktop", "MobileClosed", "MobileOpen"],
      table: { defaultValue: { summary: "Desktop" } },
    },
    logo: { table: { disable: true } },
    children: { table: { disable: true } },
    breadcrumbs: { table: { disable: true } },
    search: { table: { disable: true } },
    menuRight: { table: { disable: true } },
    buttons: { table: { disable: true } },
    avatar: { table: { disable: true } },
    mobileContent: { table: { disable: true } },
    mobileBottomContent: { table: { disable: true } },
    mobileBarRightSlot: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof NavigationHeader>;

// ─── Default — logo + 3 tabs + avatar dropdown ─────────────────

export const Default: Story = {
  render: () => (
    <NavigationHeader
      logo={<LogoAcciano width={140} />}
      avatar={
        <DropdownMenu
          triggerType="Avatar"
          avatarSize="Small"
          avatarName="Alex Acciano"
          avatarEmail="alex.acciano@aa.com"
          avatarSrc={AVATAR_SRC}
          align="BottomRight"
        >
          <DropdownMenuList items={AVATAR_ITEMS} />
        </DropdownMenu>
      }
    >
      <NavigationHeaderItem
        label="Dashboard"
        icon={LayoutDashboard}
        selected
        onClick={() => {}}
      />
      <NavigationHeaderItem label="Projects" icon={Folder} onClick={() => {}} />
      <NavigationHeaderItem label="Team" icon={Users} onClick={() => {}} />
    </NavigationHeader>
  ),
};

// ─── With Search Bar — logo + search medium (esquerda) + 2 botões ─

export const WithSearchBar: Story = {
  render: () => (
    <NavigationHeader
      logo={<LogoAcciano width={140} />}
      breadcrumbs={<SearchInput placeholder="Search" />}
      buttons={
        <>
          <Button variant="Secondary" tone="Brand" size="Small">
            Log in
          </Button>
          <Button variant="Primary" tone="Brand" size="Small">
            Get started
          </Button>
        </>
      }
    />
  ),
};

// ─── Breadcrumbs — breadcrumbs + 3 icon buttons medium + avatar ──

export const WithBreadcrumbs: Story = {
  render: () => (
    <NavigationHeader
      breadcrumbs={
        <Breadcrumbs
          items={[
            { label: "Home", href: "#" },
            { label: "Projects", href: "#" },
            { label: "Design System" },
          ]}
        />
      }
      menuRight={
        <>
          <IconButton
            variant="Tertiary"
            tone="Neutral"
            size="Medium"
            icon={Bell}
            showDot
            aria-label="Notifications"
          />
          <IconButton
            variant="Tertiary"
            tone="Neutral"
            size="Medium"
            icon={Settings}
            aria-label="Settings"
          />
          <IconButton
            variant="Tertiary"
            tone="Neutral"
            size="Medium"
            icon={HelpCircle}
            aria-label="Help"
          />
        </>
      }
      avatar={
        <DropdownMenu
          triggerType="Avatar"
          avatarSize="Small"
          avatarName="Alex Acciano"
          avatarEmail="alex.acciano@aa.com"
          avatarSrc={AVATAR_SRC}
          align="BottomRight"
        >
          <DropdownMenuList items={AVATAR_ITEMS} />
        </DropdownMenu>
      }
    />
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
        <NavigationHeader
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
          <NavigationHeader
            device="MobileOpen"
            onCloseClick={() => setOpen(false)}
            mobileContent={
              <>
                <NavigationSideItem
                  type="Default"
                  label="Dashboard"
                  icon={LayoutDashboard}
                  selected
                  onClick={() => {}}
                />
                <NavigationSideItem
                  type="Default"
                  label="Projects"
                  icon={Folder}
                  onClick={() => {}}
                />
                <NavigationSideItem
                  type="Default"
                  label="Team"
                  icon={Users}
                  onClick={() => {}}
                />
              </>
            }
            mobileBottomContent={
              <>
                <NavigationSideItem type="Slot">
                  <ButtonGroup layout="Vertical">
                    <Button variant="Secondary" tone="Brand">
                      Log in
                    </Button>
                    <Button variant="Primary" tone="Brand">
                      Get started
                    </Button>
                  </ButtonGroup>
                </NavigationSideItem>
                <NavigationSideItem type="DividerFull" />
                <NavigationSideItem type="Avatar">
                  <AvatarDropdown
                    type="Navigation"
                    name="Alex Acciano"
                    email="alex.acciano@aa.com"
                    src={AVATAR_SRC}
                  />
                </NavigationSideItem>
              </>
            }
          />
        )}
      </div>
    );
  },
};
