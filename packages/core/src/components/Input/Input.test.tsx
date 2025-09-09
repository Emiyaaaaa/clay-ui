import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Input } from './Input';

describe('Input', () => {
  it('renders input element', () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<Input label="Email" placeholder="Enter email" />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('renders with description', () => {
    render(<Input label="Password" description="Must be at least 8 characters" />);
    expect(screen.getByText('Must be at least 8 characters')).toBeInTheDocument();
  });

  it('renders with error message', () => {
    render(<Input label="Email" error="Invalid email address" />);
    expect(screen.getByText('Invalid email address')).toBeInTheDocument();
  });

  it('handles user input', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Input placeholder="Enter text" onChange={onChange} />);
    
    const input = screen.getByPlaceholderText('Enter text');
    await user.type(input, 'Hello World');
    
    expect(onChange).toHaveBeenCalled();
    expect(input).toHaveValue('Hello World');
  });

  it('supports disabled state', () => {
    render(<Input placeholder="Disabled input" disabled />);
    const input = screen.getByPlaceholderText('Disabled input');
    expect(input).toBeDisabled();
  });

  it('applies correct size classes', () => {
    const { rerender } = render(<Input size="sm" placeholder="Small" />);
    expect(screen.getByPlaceholderText('Small')).toHaveClass('h-9', 'px-3', 'text-sm');

    rerender(<Input size="md" placeholder="Medium" />);
    expect(screen.getByPlaceholderText('Medium')).toHaveClass('h-10', 'px-4', 'text-sm');

    rerender(<Input size="lg" placeholder="Large" />);
    expect(screen.getByPlaceholderText('Large')).toHaveClass('h-12', 'px-5', 'text-base');
  });

  it('applies correct variant classes', () => {
    const { rerender } = render(<Input variant="default" placeholder="Default" />);
    expect(screen.getByPlaceholderText('Default')).toHaveClass('bg-surface', 'shadow-neu');

    rerender(<Input variant="filled" placeholder="Filled" />);
    expect(screen.getByPlaceholderText('Filled')).toHaveClass('bg-gray-100');

    rerender(<Input variant="outlined" placeholder="Outlined" />);
    expect(screen.getByPlaceholderText('Outlined')).toHaveClass('bg-transparent', 'border');
  });

  it('applies error styling when error is present', () => {
    render(<Input error="Error message" placeholder="Input with error" />);
    const input = screen.getByPlaceholderText('Input with error');
    expect(input).toHaveClass('border-red-500');
  });

  it('renders with leading icon', () => {
    const icon = <span data-testid="leading-icon">🔍</span>;
    render(<Input leadingIcon={icon} placeholder="Search" />);
    expect(screen.getByTestId('leading-icon')).toBeInTheDocument();
  });

  it('renders with trailing icon', () => {
    const icon = <span data-testid="trailing-icon">👁</span>;
    render(<Input trailingIcon={icon} placeholder="Password" />);
    expect(screen.getByTestId('trailing-icon')).toBeInTheDocument();
  });

  it('applies fullWidth class when fullWidth is true', () => {
    render(<Input fullWidth placeholder="Full width input" />);
    const input = screen.getByPlaceholderText('Full width input');
    expect(input).toHaveClass('w-full');
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    render(<Input ref={ref} placeholder="Input with ref" />);
    expect(ref).toHaveBeenCalled();
  });

  it('passes through other props', () => {
    render(<Input data-testid="custom-input" type="email" placeholder="Email input" />);
    const input = screen.getByTestId('custom-input');
    expect(input).toHaveAttribute('type', 'email');
  });
});
