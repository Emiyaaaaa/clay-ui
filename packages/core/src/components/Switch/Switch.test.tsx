import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Switch } from './Switch';

describe('Switch', () => {
  it('renders switch without label', () => {
    render(<Switch />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('renders switch with label', () => {
    render(<Switch label="Enable notifications" />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getByText('Enable notifications')).toBeInTheDocument();
  });

  it('renders switch with description', () => {
    render(<Switch label="Enable notifications" description="Receive email updates" />);
    expect(screen.getByText('Enable notifications')).toBeInTheDocument();
    expect(screen.getByText('Receive email updates')).toBeInTheDocument();
  });

  it('renders switch with error', () => {
    render(<Switch label="Enable notifications" error="This field is required" />);
    expect(screen.getByText('Enable notifications')).toBeInTheDocument();
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('handles change event', async () => {
    const onChange = vi.fn();
    render(<Switch label="Toggle me" onChange={onChange} />);
    
    const checkbox = screen.getByRole('checkbox');
    await userEvent.click(checkbox);
    
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('supports checked state', () => {
    render(<Switch label="Checked switch" checked />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  it('supports disabled state', () => {
    render(<Switch label="Disabled switch" disabled />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeDisabled();
  });

  it('supports different sizes', () => {
    const { rerender } = render(<Switch label="Small switch" size="sm" />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();

    rerender(<Switch label="Medium switch" size="md" />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();

    rerender(<Switch label="Large switch" size="lg" />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    render(<Switch ref={ref} />);
    expect(ref).toHaveBeenCalled();
  });
});
