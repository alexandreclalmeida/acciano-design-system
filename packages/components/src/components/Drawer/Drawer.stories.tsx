import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Drawer } from "./Drawer";
import { Button } from "../Button/Button";
import { Slot } from "../Slot/Slot";
import { TextInput } from "../TextInput/TextInput";

const meta: Meta<typeof Drawer> = {
  title: "Components/Drawer",
  component: Drawer,
  parameters: {
    layout: "centered",
    docs: {
      subtitle:
        "A panel tha slides in from the right side of the screen when triggered by an interactive element like a button. Similar to a Modal, the Drawer floats above the rest of the page, preventing interaction with the underlying content.",
    },
  },
  argTypes: {
    size: {
      control: "select",
      options: ["Small", "Large"],
      table: { defaultValue: { summary: "Small" } },
    },
    heading: {
      control: "text",
      table: { defaultValue: { summary: "Heading" } },
    },
    open: { table: { disable: true } },
    onClose: { table: { disable: true } },
    children: { table: { disable: true } },
    buttons: { table: { disable: true } },
    "aria-label": { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof Drawer>;

function DrawerTrigger({
  label = "Open drawer",
  children,
}: {
  label?: string;
  children: (props: { open: boolean; onClose: () => void }) => React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <Button variant="Primary" tone="Brand" onClick={() => setOpen(true)}>
        {label}
      </Button>
      {children({ open, onClose: () => setOpen(false) })}
    </div>
  );
}

export const Default: Story = {
  args: {
    size: "Small",
    heading: "Heading",
  },
  render: (args) => (
    <DrawerTrigger>
      {({ open, onClose }) => (
        <Drawer
          {...args}
          open={open}
          onClose={onClose}
          buttons={(close) => (
            <>
              <Button variant="Primary" tone="Brand" onClick={close}>
                Confirm
              </Button>
              <Button variant="Secondary" tone="Brand" onClick={close}>
                Cancel
              </Button>
              <Button variant="Tertiary" tone="Brand" onClick={close}>
                Skip
              </Button>
            </>
          )}
        >
          <Slot />
          <Slot />
          <Slot />
        </Drawer>
      )}
    </DrawerTrigger>
  ),
};

export const Large: Story = {
  args: {
    ...Default.args,
    size: "Large",
  },
  render: (args) => (
    <DrawerTrigger label="Open large drawer">
      {({ open, onClose }) => (
        <Drawer
          {...args}
          open={open}
          onClose={onClose}
          buttons={(close) => (
            <>
              <Button variant="Primary" tone="Brand" onClick={close}>
                Confirm
              </Button>
              <Button variant="Secondary" tone="Brand" onClick={close}>
                Cancel
              </Button>
              <Button variant="Tertiary" tone="Brand" onClick={close}>
                Skip
              </Button>
            </>
          )}
        >
          <Slot />
          <Slot />
          <Slot />
        </Drawer>
      )}
    </DrawerTrigger>
  ),
};

export const WithForm: Story = {
  args: {
    ...Default.args,
    heading: "Edit profile",
  },
  render: (args) => (
    <DrawerTrigger label="Open form drawer">
      {({ open, onClose }) => (
        <Drawer
          {...args}
          open={open}
          onClose={onClose}
          buttons={(close) => (
            <>
              <Button variant="Primary" tone="Brand" onClick={close}>
                Save changes
              </Button>
              <Button variant="Secondary" tone="Brand" onClick={close}>
                Discard
              </Button>
              <Button variant="Tertiary" tone="Brand" onClick={close}>
                Skip
              </Button>
            </>
          )}
        >
          <TextInput label="First name" />
          <TextInput label="Last name" />
          <TextInput label="Email" />
        </Drawer>
      )}
    </DrawerTrigger>
  ),
};

export const NoButtons: Story = {
  args: {
    ...Default.args,
    heading: "Details",
  },
  render: (args) => (
    <DrawerTrigger label="Open no buttons">
      {({ open, onClose }) => (
        <Drawer {...args} open={open} onClose={onClose}>
          <Slot />
          <Slot />
          <Slot />
        </Drawer>
      )}
    </DrawerTrigger>
  ),
};
