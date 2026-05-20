import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ProgressIndicator } from "./ProgressIndicator";

const meta: Meta<typeof ProgressIndicator> = {
  title: "Components/Progress indicator",
  component: ProgressIndicator,
  parameters: {
    layout: "padded",
    docs: {
      subtitle:
        "Shows users how far they've progressed through a series of steps.",
    },
  },
  argTypes: {
    currentStep: {
      control: "number",
      table: { defaultValue: { summary: "1" } },
    },
    totalSteps: {
      control: "number",
      table: { defaultValue: { summary: "5" } },
    },
    label: {
      control: "text",
      table: {
        defaultValue: { summary: "Step {currentStep} of {totalSteps}" },
      },
    },
    onBack: { table: { disable: true } },
    className: { table: { disable: true } },
  },
  render: (args) => {
    const [step, setStep] = React.useState(args.currentStep ?? 1);
    React.useEffect(() => {
      setStep(args.currentStep ?? 1);
    }, [args.currentStep]);
    return (
      <div style={{ width: 600 }}>
        <ProgressIndicator
          {...args}
          currentStep={step}
          onBack={() => setStep((s) => Math.max(0, s - 1))}
        />
      </div>
    );
  },
};

export default meta;
type Story = StoryObj<typeof ProgressIndicator>;

export const Default: Story = {
  args: {
    currentStep: 1,
    totalSteps: 5,
  },
};

export const NotStarted: Story = {
  args: {
    currentStep: 0,
    totalSteps: 5,
  },
  parameters: { controls: { disable: true } },
};

export const Complete: Story = {
  args: {
    currentStep: 5,
    totalSteps: 5,
  },
  parameters: { controls: { disable: true } },
};

export const AllSteps: Story = {
  render: () => (
    <div
      style={{ display: "flex", flexDirection: "column", gap: 32, width: 600 }}
    >
      {[0, 1, 2, 3, 4, 5].map((step) => (
        <ProgressIndicator key={step} currentStep={step} totalSteps={5} />
      ))}
    </div>
  ),
  parameters: { controls: { disable: true } },
};
