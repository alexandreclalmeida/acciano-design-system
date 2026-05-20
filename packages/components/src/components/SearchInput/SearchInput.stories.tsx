import type { Meta, StoryObj } from "@storybook/react";
import { SearchInput } from "./SearchInput";

const meta: Meta<typeof SearchInput> = {
  title: "Components/Search input",
  component: SearchInput,
  parameters: {
    layout: "centered",
    docs: {
      subtitle:
        "Allows users to find content by entering a search term. A search can be triggered by typing or by pressing a button.",
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: "320px" }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    variant: {
      control: "select",
      options: ["Default", "Button"],
      table: { defaultValue: { summary: "Default" } },
    },
    size: {
      control: "select",
      options: ["Medium", "Small"],
      table: { defaultValue: { summary: "Medium" } },
    },
    disabled: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    placeholder: { control: "text" },
    buttonLabel: { control: "text" },
    defaultValue: {
      control: "text",
      description:
        "Valor inicial (uncontrolled). Quando preenchido, exibe o botão X de limpar.",
    },
    value: { table: { disable: true } },
    onChange: { table: { disable: true } },
    onSearch: { table: { disable: true } },
    className: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof SearchInput>;

export const Default: Story = {
  args: {
    variant: "Default",
    size: "Medium",
    placeholder: "Search",
    disabled: false,
  },
};

export const WithButton: Story = {
  args: {
    variant: "Button",
    size: "Medium",
    placeholder: "Search",
    buttonLabel: "Search",
    disabled: false,
  },
};

export const WithValue: Story = {
  args: {
    variant: "Default",
    size: "Medium",
    defaultValue: "Filled",
  },
};

export const WithValueAndButton: Story = {
  args: {
    variant: "Button",
    size: "Medium",
    defaultValue: "Filled",
    buttonLabel: "Search",
  },
};

export const Disabled: Story = {
  args: {
    variant: "Default",
    size: "Medium",
    placeholder: "Search",
    disabled: true,
  },
};

export const DisabledWithButton: Story = {
  args: {
    variant: "Button",
    size: "Medium",
    placeholder: "Search",
    buttonLabel: "Search",
    disabled: true,
  },
};

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        width: "320px",
      }}
    >
      <SearchInput size="Medium" placeholder="Medium — Default" />
      <SearchInput size="Small" placeholder="Small — Default" />
      <SearchInput
        variant="Button"
        size="Medium"
        placeholder="Medium — Button"
        buttonLabel="Search"
      />
      <SearchInput
        variant="Button"
        size="Small"
        placeholder="Small — Button"
        buttonLabel="Search"
      />
    </div>
  ),
};
