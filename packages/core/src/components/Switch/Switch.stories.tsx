import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from './Switch';
import '../../styles/tailwind.css';

const meta: Meta<typeof Switch> = {
  title: 'Core/Switch',
  component: Switch,
  args: { label: 'Enable notifications' },
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    checked: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {};

export const WithDescription: Story = {
  args: {
    label: 'Enable notifications',
    description: 'Receive email updates about your account',
  },
};

export const WithError: Story = {
  args: {
    label: 'Enable notifications',
    error: 'This field is required',
  },
};

export const Checked: Story = {
  args: {
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    checked: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Switch size="sm" label="Small" />
        <Switch size="sm" label="Small checked" checked />
      </div>
      <div className="flex items-center gap-4">
        <Switch size="md" label="Medium" />
        <Switch size="md" label="Medium checked" checked />
      </div>
      <div className="flex items-center gap-4">
        <Switch size="lg" label="Large" />
        <Switch size="lg" label="Large checked" checked />
      </div>
    </div>
  ),
};

export const WithoutLabel: Story = {
  render: () => (
    <div className="flex gap-4">
      <Switch />
      <Switch checked />
      <Switch disabled />
      <Switch disabled checked />
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Default</h3>
        <Switch label="Default switch" />
        <Switch label="Default checked" checked />
      </div>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">With Description</h3>
        <Switch 
          label="Notifications" 
          description="Get notified about updates" 
        />
        <Switch 
          label="Marketing" 
          description="Receive promotional emails" 
          checked 
        />
      </div>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">With Error</h3>
        <Switch 
          label="Required field" 
          error="This field is required" 
        />
      </div>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Disabled</h3>
        <Switch label="Disabled switch" disabled />
        <Switch label="Disabled checked" disabled checked />
      </div>
    </div>
  ),
};
