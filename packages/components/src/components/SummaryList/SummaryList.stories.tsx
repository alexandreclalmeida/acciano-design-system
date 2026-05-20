import type { Meta, StoryObj } from "@storybook/react";
import { Copy, Download, Trash2, MoreVertical } from "lucide-react";
import { SummaryItem, SummaryColumn, SummaryList } from "./SummaryList";
import { LinkButton } from "../LinkButton/LinkButton";
import { IconButton } from "../IconButton/IconButton";

const meta: Meta<typeof SummaryItem> = {
  title: "Components/Summary list",
  component: SummaryItem,
  parameters: {
    layout: "centered",
    docs: {
      subtitle: "Used to display data pairs or form inputs.",
    },
  },
  argTypes: {
    type: {
      control: "select",
      options: ["Term", "Description", "Link", "Action icons", "Action links"],
      table: { defaultValue: { summary: "Term" } },
    },
    children: { table: { disable: true } },
    className: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof SummaryItem>;

const TERMS = ["First name", "Last name", "Email", "Role", "Department"];
const VALUES = ["John", "Doe", "john@example.com", "Designer", "Product"];

export const Default: Story = {
  render: () => (
    <div style={{ width: 640 }}>
      <SummaryList>
        <SummaryColumn type="Term">
          {TERMS.map((term) => (
            <SummaryItem key={term}>{term}</SummaryItem>
          ))}
        </SummaryColumn>
        <SummaryColumn type="Description">
          {VALUES.map((val) => (
            <SummaryItem key={val}>{val}</SummaryItem>
          ))}
        </SummaryColumn>
        <SummaryColumn type="Action links">
          {TERMS.map((term) => (
            <SummaryItem key={term}>
              <LinkButton tone="link" size="small">
                Edit
              </LinkButton>
              <LinkButton tone="critical" size="small">
                Delete
              </LinkButton>
            </SummaryItem>
          ))}
        </SummaryColumn>
      </SummaryList>
    </div>
  ),
  parameters: { controls: { disable: true } },
};

export const WithActionIcons: Story = {
  render: () => (
    <div style={{ width: 640 }}>
      <SummaryList>
        <SummaryColumn type="Term">
          {TERMS.map((term) => (
            <SummaryItem key={term}>{term}</SummaryItem>
          ))}
        </SummaryColumn>
        <SummaryColumn type="Description">
          {VALUES.map((val) => (
            <SummaryItem key={val}>{val}</SummaryItem>
          ))}
        </SummaryColumn>
        <SummaryColumn type="Action icons">
          {TERMS.map((term) => (
            <SummaryItem key={term}>
              <IconButton
                icon={Copy}
                variant="Tertiary"
                tone="Neutral"
                size="Medium"
                aria-label="Copy"
              />
              <IconButton
                icon={Download}
                variant="Tertiary"
                tone="Neutral"
                size="Medium"
                aria-label="Download"
              />
              <IconButton
                icon={Trash2}
                variant="Tertiary"
                tone="Neutral"
                size="Medium"
                aria-label="Delete"
              />
              <IconButton
                icon={MoreVertical}
                variant="Tertiary"
                tone="Neutral"
                size="Medium"
                aria-label="More options"
              />
            </SummaryItem>
          ))}
        </SummaryColumn>
      </SummaryList>
    </div>
  ),
  parameters: { controls: { disable: true } },
};
