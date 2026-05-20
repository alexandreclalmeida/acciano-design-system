import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { CheckboxGroup } from './CheckboxGroup';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof CheckboxGroup> = {
  title: 'Components/Checkbox/Checkbox group',
  component: CheckboxGroup,
  parameters: {
    layout: 'centered',
    docs: {
      subtitle: 'Groups related checkboxes under a shared label.',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '308px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    size: {
      control: 'select',
      options: ['Large', 'Small'],
      table: { defaultValue: { summary: 'Large' } },
    },
    error: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    required: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    optional: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    label: { control: 'text' },
    helperText: { control: 'text' },
    children: { table: { disable: true } },
    className: { table: { disable: true } },
  },
  render: (args) => (
    <CheckboxGroup {...args}>
      <Checkbox label="Option 1" defaultChecked />
      <Checkbox label="Option 2" />
      <Checkbox label="Option 3" />
    </CheckboxGroup>
  ),
};

export default meta;
type Story = StoryObj<typeof CheckboxGroup>;

export const Default: Story = {
  args: {
    label: 'Label',
    size: 'Large',
    error: false,
    required: false,
    optional: false,
  },
};

export const Required: Story = {
  args: {
    label: 'Label',
    required: true,
  },
};

export const Optional: Story = {
  args: {
    label: 'Label',
    optional: true,
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Label',
    helperText: 'Helper text',
  },
};

export const Error: Story = {
  args: {
    label: 'Label',
    error: true,
    helperText: 'Helper text',
  },
};

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <CheckboxGroup label="Large" size="Large">
        <Checkbox label="Option 1" defaultChecked />
        <Checkbox label="Option 2" />
        <Checkbox label="Option 3" />
      </CheckboxGroup>
      <CheckboxGroup label="Small" size="Small">
        <Checkbox label="Option 1" defaultChecked />
        <Checkbox label="Option 2" />
        <Checkbox label="Option 3" />
      </CheckboxGroup>
    </div>
  ),
};
