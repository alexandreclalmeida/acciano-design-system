import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { RadioButtonGroup } from './RadioButtonGroup';
import { RadioButton } from './RadioButton';

const meta: Meta<typeof RadioButtonGroup> = {
  title: 'Components/Radio button/Radio button group',
  component: RadioButtonGroup,
  parameters: {
    layout: 'centered',
    docs: {
      subtitle: 'Groups radio buttons under a shared label for single selection.',
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
    name: { table: { disable: true } },
    value: { table: { disable: true } },
    defaultValue: { table: { disable: true } },
    onChange: { table: { disable: true } },
    children: { table: { disable: true } },
    className: { table: { disable: true } },
  },
  render: (args) => (
    <RadioButtonGroup {...args} name="story-group">
      <RadioButton label="Option 1" value="1" defaultChecked />
      <RadioButton label="Option 2" value="2" />
      <RadioButton label="Option 3" value="3" />
      <RadioButton label="Option 4" value="4" />
      <RadioButton label="Option 5" value="5" />
    </RadioButtonGroup>
  ),
};

export default meta;
type Story = StoryObj<typeof RadioButtonGroup>;

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
      <RadioButtonGroup label="Large" name="size-large" size="Large">
        <RadioButton label="Option 1" value="1" defaultChecked />
        <RadioButton label="Option 2" value="2" />
        <RadioButton label="Option 3" value="3" />
      </RadioButtonGroup>
      <RadioButtonGroup label="Small" name="size-small" size="Small">
        <RadioButton label="Option 1" value="1" defaultChecked />
        <RadioButton label="Option 2" value="2" />
        <RadioButton label="Option 3" value="3" />
      </RadioButtonGroup>
    </div>
  ),
};
