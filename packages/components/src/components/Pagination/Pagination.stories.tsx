import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Pagination } from "./Pagination";

const meta: Meta<typeof Pagination> = {
  title: "Components/Pagination",
  component: Pagination,
  parameters: {
    layout: "padded",
    docs: {
      subtitle: "Allows users to navigate between different pages.",
    },
  },
  argTypes: {
    currentPage: {
      control: "number",
      table: { defaultValue: { summary: "1" } },
    },
    totalPages: {
      control: "number",
      table: { defaultValue: { summary: "10" } },
    },
    device: {
      control: "select",
      options: ["Desktop", "Mobile"],
      table: { defaultValue: { summary: "Desktop" } },
    },
    disabled: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    summaryText: { control: "text" },
    onPageChange: { table: { disable: true } },
    className: { table: { disable: true } },
  },
  render: (args) => {
    const [page, setPage] = React.useState(args.currentPage ?? 2);
    return (
      <Pagination
        {...args}
        currentPage={page}
        onPageChange={setPage}
        summaryText={
          args.device === "Mobile"
            ? undefined
            : `Showing ${(page - 1) * 10 + 1} – ${Math.min(page * 10, 128)} of 128`
        }
      />
    );
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  args: {
    currentPage: 2,
    totalPages: 10,
    device: "Desktop",
    disabled: false,
  },
};

export const FirstPage: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
    device: "Desktop",
  },
  parameters: { controls: { disable: true } },
};

export const LastPage: Story = {
  args: {
    currentPage: 10,
    totalPages: 10,
    device: "Desktop",
  },
  parameters: { controls: { disable: true } },
};

export const MiddlePage: Story = {
  args: {
    currentPage: 5,
    totalPages: 10,
    device: "Desktop",
  },
  parameters: { controls: { disable: true } },
};

export const FewPages: Story = {
  render: () => {
    const [page, setPage] = React.useState(2);
    return (
      <Pagination
        currentPage={page}
        totalPages={5}
        onPageChange={setPage}
        summaryText={`Showing ${(page - 1) * 10 + 1} – ${Math.min(page * 10, 50)} of 50`}
        device="Desktop"
      />
    );
  },
  parameters: { controls: { disable: true } },
};

export const Mobile: Story = {
  render: () => {
    const [page, setPage] = React.useState(2);
    return (
      <div style={{ width: 364 }}>
        <Pagination
          currentPage={page}
          totalPages={20}
          onPageChange={setPage}
          device="Mobile"
        />
      </div>
    );
  },
  parameters: { controls: { disable: true } },
};

export const Disabled: Story = {
  args: {
    currentPage: 2,
    totalPages: 10,
    device: "Desktop",
    disabled: true,
  },
};
