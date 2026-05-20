import type { Meta, StoryObj } from "@storybook/react";
import { FileUpload } from "./FileUpload";
import { FileList } from "./FileList";
import { FileUploadItem } from "./FileUploadItem";

const meta: Meta<typeof FileUpload> = {
  title: "Components/File upload",
  component: FileUpload,
  parameters: {
    layout: "centered",
    docs: {
      subtitle:
        "Used to upload files via drag and drop or by browsing. A list of uploaded files are displayed below the drop zone.",
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: "600px" }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    error: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    disabled: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    required: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    optional: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    hideLabel: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    multiple: {
      control: "boolean",
      table: { defaultValue: { summary: "true" } },
    },
    label: { control: "text" },
    helperText: { control: "text" },
    maxSizeLabel: { control: "text" },
    id: { table: { disable: true } },
    name: { table: { disable: true } },
    accept: { table: { disable: true } },
    onChange: { table: { disable: true } },
    className: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof FileUpload>;

export const Default: Story = {
  args: {
    label: "Attachments",
  },
};

export const Critical: Story = {
  args: {
    label: "Attachments",
    error: true,
    helperText: "File exceeds the maximum size allowed.",
  },
};

export const WithFiles: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <FileUpload label="Attachments" />
      <FileList>
        <FileUploadItem
          name="Document.pdf"
          size="1.2MB"
          status="uploaded"
          href="#"
        />
        <FileUploadItem
          name="Photo.png"
          size="3.4MB"
          status="uploading"
          progress={75}
        />
        <FileUploadItem
          name="Report.docx"
          size="250KB"
          status="uploading"
          progress={25}
        />
      </FileList>
    </div>
  ),
};
