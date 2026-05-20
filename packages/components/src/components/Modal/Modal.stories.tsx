import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Monitor, AlertCircle } from "lucide-react";
import { Modal } from "./Modal";
import { Capsule } from "../Capsule/Capsule";
import { Button } from "../Button/Button";
import { Slot } from "../Slot/Slot";

const meta: Meta<typeof Modal> = {
  title: "Components/Modal",
  component: Modal,
  parameters: {
    layout: "centered",
    docs: {
      subtitle:
        "Used to present critical information that requires immediate attention. The modal floats above the rest of the page, preventing interaction with the underlying content.",
    },
  },
  argTypes: {
    size: {
      control: "select",
      options: ["Small", "Large"],
      table: { defaultValue: { summary: "Small" } },
    },
    showClose: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    heading: {
      control: "text",
      table: { defaultValue: { summary: "Heading" } },
    },
    open: { table: { disable: true } },
    onClose: { table: { disable: true } },
    capsule: { table: { disable: true } },
    description: { table: { disable: true } },
    image: { table: { disable: true } },
    children: { table: { disable: true } },
    buttons: { table: { disable: true } },
    "aria-label": { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

const DESCRIPTION =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.";

function ModalTrigger({
  label = "Open modal",
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
    showClose: false,
    heading: "Heading",
  },
  render: (args) => (
    <ModalTrigger>
      {({ open, onClose }) => (
        <Modal
          {...args}
          open={open}
          onClose={onClose}
          capsule={<Capsule tone="Neutral" variant="Filled" icon={Monitor} />}
          description={DESCRIPTION}
          buttons={(close) => (
            <>
              <Button variant="Primary" tone="Brand" onClick={close}>
                Confirm
              </Button>
              <Button variant="Secondary" tone="Brand" onClick={close}>
                Cancel
              </Button>
            </>
          )}
        >
          <Slot />
        </Modal>
      )}
    </ModalTrigger>
  ),
};

export const Large: Story = {
  args: {
    ...Default.args,
    size: "Large",
  },
  render: (args) => (
    <ModalTrigger label="Open large modal">
      {({ open, onClose }) => (
        <Modal
          {...args}
          open={open}
          onClose={onClose}
          capsule={<Capsule tone="Neutral" variant="Filled" icon={Monitor} />}
          description={DESCRIPTION}
          buttons={(close) => (
            <>
              <Button variant="Primary" tone="Brand" onClick={close}>
                Confirm
              </Button>
              <Button variant="Secondary" tone="Brand" onClick={close}>
                Cancel
              </Button>
            </>
          )}
        >
          <Slot />
        </Modal>
      )}
    </ModalTrigger>
  ),
};

export const Critical: Story = {
  args: {
    ...Default.args,
    heading: "Delete account?",
  },
  render: (args) => (
    <ModalTrigger label="Open critical modal">
      {({ open, onClose }) => (
        <Modal
          {...args}
          open={open}
          onClose={onClose}
          capsule={
            <Capsule tone="Critical" variant="Filled" icon={AlertCircle} />
          }
          description="This action cannot be undone. All your data will be permanently removed and cannot be recovered."
          buttons={(close) => (
            <>
              <Button variant="Primary" tone="Critical" onClick={close}>
                Delete
              </Button>
              <Button variant="Secondary" tone="Neutral" onClick={close}>
                Cancel
              </Button>
            </>
          )}
        />
      )}
    </ModalTrigger>
  ),
};

export const WithImage: Story = {
  args: {
    ...Default.args,
    heading: "New feature",
  },
  render: (args) => (
    <ModalTrigger label="Open with image">
      {({ open, onClose }) => (
        <Modal
          {...args}
          open={open}
          onClose={onClose}
          image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=700&q=80"
          description={DESCRIPTION}
          buttons={(close) => (
            <>
              <Button variant="Primary" tone="Brand" onClick={close}>
                Get started
              </Button>
              <Button variant="Secondary" tone="Brand" onClick={close}>
                Maybe later
              </Button>
            </>
          )}
        />
      )}
    </ModalTrigger>
  ),
};

export const NoCapsule: Story = {
  args: {
    ...Default.args,
  },
  render: (args) => (
    <ModalTrigger label="Open no capsule">
      {({ open, onClose }) => (
        <Modal
          {...args}
          open={open}
          onClose={onClose}
          description={DESCRIPTION}
          buttons={(close) => (
            <>
              <Button variant="Primary" tone="Brand" onClick={close}>
                Confirm
              </Button>
              <Button variant="Secondary" tone="Brand" onClick={close}>
                Cancel
              </Button>
            </>
          )}
        >
          <Slot />
        </Modal>
      )}
    </ModalTrigger>
  ),
};

export const NoButtons: Story = {
  args: {
    ...Default.args,
    showClose: true,
  },
  render: (args) => (
    <ModalTrigger label="Open no buttons">
      {({ open, onClose }) => (
        <Modal
          {...args}
          open={open}
          onClose={onClose}
          capsule={<Capsule tone="Neutral" variant="Filled" icon={Monitor} />}
          description={DESCRIPTION}
        >
          <Slot />
        </Modal>
      )}
    </ModalTrigger>
  ),
};
