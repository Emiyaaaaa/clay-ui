import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { InputNumber } from './InputNumber';
import '../../styles/tailwind.css';

const meta: Meta<typeof InputNumber> = {
  title: 'Core/InputNumber',
  component: InputNumber,
  args: { placeholder: 'Enter number...' },
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof InputNumber>;

export const Default: Story = {
  args: { variant: 'default' },
};

export const Filled: Story = {
  args: { variant: 'filled' },
};

export const Outlined: Story = {
  args: { variant: 'outlined' },
};

export const WithLabel: Story = {
  args: { 
    label: 'Amount',
    placeholder: 'Enter amount',
  },
};

export const WithDescription: Story = {
  args: { 
    label: 'Price',
    placeholder: 'Enter price',
    description: 'Enter the price in USD',
  },
};

export const WithError: Story = {
  args: { 
    label: 'Quantity',
    placeholder: 'Enter quantity',
    error: 'Quantity must be greater than 0',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <InputNumber size="sm" placeholder="Small input" />
      <InputNumber size="md" placeholder="Medium input" />
      <InputNumber size="lg" placeholder="Large input" />
    </div>
  ),
};

export const WithMinMax: Story = {
  args: { 
    label: 'Age',
    placeholder: 'Enter age',
    min: 0,
    max: 120,
    description: 'Age must be between 0 and 120',
  },
};

export const WithStep: Story = {
  args: { 
    label: 'Quantity',
    placeholder: 'Enter quantity',
    step: 5,
    min: 0,
    description: 'Increments of 5',
  },
};

export const WithPrecision: Story = {
  args: { 
    label: 'Price',
    placeholder: 'Enter price',
    precision: 2,
    description: 'Two decimal places',
  },
};

export const WithPrefixSuffix: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <InputNumber 
        label="Price"
        placeholder="0.00"
        prefix="$"
        precision={2}
      />
      <InputNumber 
        label="Weight"
        placeholder="0"
        suffix="kg"
      />
      <InputNumber 
        label="Percentage"
        placeholder="0"
        suffix="%"
        max={100}
      />
    </div>
  ),
};

export const WithThousandSeparator: Story = {
  args: { 
    label: 'Large Number',
    placeholder: 'Enter large number',
    thousandSeparator: ',',
    description: 'Numbers will be formatted with commas',
  },
};

export const WithoutControls: Story = {
  args: { 
    label: 'Number Input',
    placeholder: 'Enter number',
    showControls: false,
    description: 'No increment/decrement buttons',
  },
};

export const ControlsLeft: Story = {
  args: { 
    label: 'Number Input',
    placeholder: 'Enter number',
    controlsPosition: 'left',
    description: 'Controls on the left side',
  },
};

export const ControlsBoth: Story = {
  args: { 
    label: 'Number Input',
    placeholder: 'Enter number',
    controlsPosition: 'both',
    description: 'Controls on both sides',
  },
};

export const IntegerOnly: Story = {
  args: { 
    label: 'Quantity',
    placeholder: 'Enter quantity',
    allowDecimal: false,
    description: 'Only whole numbers allowed',
  },
};

export const PositiveOnly: Story = {
  args: { 
    label: 'Count',
    placeholder: 'Enter count',
    allowNegative: false,
    min: 0,
    description: 'Only positive numbers allowed',
  },
};

export const Disabled: Story = {
  args: { 
    label: 'Disabled input',
    placeholder: 'This input is disabled',
    disabled: true,
    value: 42,
  },
};

export const FullWidth: Story = {
  args: { 
    label: 'Full width input',
    placeholder: 'This input takes full width',
    fullWidth: true,
  },
  render: (args) => (
    <div className="w-full max-w-md">
      <InputNumber {...args} />
    </div>
  ),
};

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState<number | undefined>(undefined);
    
    return (
      <div className="space-y-4 w-80">
        <InputNumber 
          label="Interactive Example"
          placeholder="Enter a number"
          value={value}
          onChange={(newValue) => setValue(newValue)}
          min={0}
          max={1000}
          step={10}
          precision={2}
          thousandSeparator=","
          prefix="$"
        />
        <div className="text-sm text-gray-600">
          Current value: {value !== undefined ? value : 'undefined'}
        </div>
      </div>
    );
  },
};

export const Currency: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <InputNumber 
        label="USD Amount"
        placeholder="0.00"
        prefix="$"
        precision={2}
        thousandSeparator=","
        description="US Dollar amount"
      />
      <InputNumber 
        label="EUR Amount"
        placeholder="0,00"
        prefix="€"
        precision={2}
        thousandSeparator="."
        decimalSeparator=","
        description="Euro amount (European format)"
      />
    </div>
  ),
};
