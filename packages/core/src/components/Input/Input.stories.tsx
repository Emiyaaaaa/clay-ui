import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';
import '../../styles/tailwind.css';

const meta: Meta<typeof Input> = {
  title: 'Core/Input',
  component: Input,
  args: { placeholder: 'Enter text...' },
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

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
    label: 'Email address',
    placeholder: 'Enter your email',
  },
};

export const WithDescription: Story = {
  args: { 
    label: 'Password',
    placeholder: 'Enter your password',
    description: 'Must be at least 8 characters long',
  },
};

export const WithError: Story = {
  args: { 
    label: 'Email address',
    placeholder: 'Enter your email',
    error: 'Please enter a valid email address',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <Input size="sm" placeholder="Small input" />
      <Input size="md" placeholder="Medium input" />
      <Input size="lg" placeholder="Large input" />
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <Input 
        placeholder="Search..." 
        leadingIcon={
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        }
      />
      <Input 
        placeholder="Password" 
        type="password"
        trailingIcon={
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        }
      />
    </div>
  ),
};

export const Disabled: Story = {
  args: { 
    label: 'Disabled input',
    placeholder: 'This input is disabled',
    disabled: true,
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
      <Input {...args} />
    </div>
  ),
};
