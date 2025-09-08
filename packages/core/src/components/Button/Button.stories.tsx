import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import '../../styles/tailwind.css';

const meta: Meta<typeof Button> = {
  title: 'Core/Button',
  component: Button,
  args: { label: 'Click me' },
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: { variant: 'primary' },
};

export const Ghost: Story = {
  args: { variant: 'ghost' },
};

export const Soft: Story = {
  args: { variant: 'soft' },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex gap-4">
      <Button size="sm" label="Small" />
      <Button size="md" label="Medium" />
      <Button size="lg" label="Large" />
    </div>
  ),
};


