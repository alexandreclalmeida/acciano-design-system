import type { Meta, StoryObj } from "@storybook/react";
import { Accordion, AccordionItem } from "./Accordion";

const LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

const meta: Meta<typeof AccordionItem> = {
  title: "Components/Accordion",
  component: AccordionItem,
  parameters: {
    layout: "padded",
    docs: {
      subtitle:
        "A list of headings that toggle the display of further information.",
    },
  },
  argTypes: {
    heading: {
      control: "text",
      table: { defaultValue: { summary: "Heading label" } },
    },
    disabled: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    open: { table: { disable: true } },
    defaultOpen: { table: { disable: true } },
    onOpenChange: { table: { disable: true } },
    children: { table: { disable: true } },
    className: { table: { disable: true } },
  },
  render: (args) => (
    <div style={{ maxWidth: "600px", width: "100%" }}>
      <Accordion>
        <AccordionItem {...args}>{LOREM}</AccordionItem>
        <AccordionItem heading="Second item">{LOREM}</AccordionItem>
        <AccordionItem heading="Third item">{LOREM}</AccordionItem>
      </Accordion>
    </div>
  ),
};

export default meta;
type Story = StoryObj<typeof AccordionItem>;

export const Default: Story = {
  args: {
    heading: "Heading label",
    disabled: false,
  },
};

export const Open: Story = {
  render: () => (
    <div style={{ maxWidth: "600px", width: "100%" }}>
      <Accordion>
        <AccordionItem heading="First item" defaultOpen>
          {LOREM}
        </AccordionItem>
        <AccordionItem heading="Second item">{LOREM}</AccordionItem>
        <AccordionItem heading="Third item">{LOREM}</AccordionItem>
      </Accordion>
    </div>
  ),
};

export const MultipleOpen: Story = {
  render: () => (
    <div style={{ maxWidth: "600px", width: "100%" }}>
      <Accordion>
        <AccordionItem heading="First item" defaultOpen>
          {LOREM}
        </AccordionItem>
        <AccordionItem heading="Second item" defaultOpen>
          {LOREM}
        </AccordionItem>
        <AccordionItem heading="Third item">{LOREM}</AccordionItem>
      </Accordion>
    </div>
  ),
};

export const WithDisabled: Story = {
  render: () => (
    <div style={{ maxWidth: "600px", width: "100%" }}>
      <Accordion>
        <AccordionItem heading="First item" defaultOpen>
          {LOREM}
        </AccordionItem>
        <AccordionItem heading="Disabled item" disabled>
          {LOREM}
        </AccordionItem>
        <AccordionItem heading="Disabled and open" disabled defaultOpen>
          {LOREM}
        </AccordionItem>
        <AccordionItem heading="Third item">{LOREM}</AccordionItem>
      </Accordion>
    </div>
  ),
};
