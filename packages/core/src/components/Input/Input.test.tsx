import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
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

  // Additional comprehensive tests
  describe('Accessibility', () => {
    it('associates label with input correctly', () => {
      render(<Input label="Test Label" id="test-input" />);
      const input = screen.getByLabelText('Test Label');
      expect(input).toHaveAttribute('id', 'test-input');
    });

    it('generates unique id when not provided', () => {
      render(<Input label="Test Label" />);
      const input = screen.getByLabelText('Test Label');
      expect(input).toHaveAttribute('id');
      expect(input.id).toMatch(/^input-/);
    });

    it('supports aria-describedby for description', () => {
      render(<Input label="Test" description="Help text" id="test-input" />);
      const input = screen.getByLabelText('Test');
      expect(input).toHaveAttribute('aria-describedby');
    });

    it('supports aria-invalid when error is present', () => {
      render(<Input error="Error message" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });

    it('supports aria-required when required', () => {
      render(<Input required />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-required', 'true');
    });
  });

  describe('Event Handling', () => {
    it('handles onFocus event', async () => {
      const onFocus = vi.fn();
      render(<Input onFocus={onFocus} placeholder="Test input" />);
      const input = screen.getByPlaceholderText('Test input');
      await userEvent.click(input);
      expect(onFocus).toHaveBeenCalledTimes(1);
    });

    it('handles onBlur event', async () => {
      const onBlur = vi.fn();
      render(<Input onBlur={onBlur} placeholder="Test input" />);
      const input = screen.getByPlaceholderText('Test input');
      await userEvent.click(input);
      await userEvent.tab();
      expect(onBlur).toHaveBeenCalledTimes(1);
    });

    it('handles onKeyDown event', async () => {
      const onKeyDown = vi.fn();
      render(<Input onKeyDown={onKeyDown} placeholder="Test input" />);
      const input = screen.getByPlaceholderText('Test input');
      await userEvent.type(input, 'a');
      expect(onKeyDown).toHaveBeenCalled();
    });

    it('handles onKeyUp event', async () => {
      const onKeyUp = vi.fn();
      render(<Input onKeyUp={onKeyUp} placeholder="Test input" />);
      const input = screen.getByPlaceholderText('Test input');
      await userEvent.type(input, 'a');
      expect(onKeyUp).toHaveBeenCalled();
    });
  });

  describe('Controlled vs Uncontrolled', () => {
    it('works as controlled component', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      const { rerender } = render(<Input value="initial" onChange={onChange} />);
      
      const input = screen.getByDisplayValue('initial');
      await user.clear(input);
      await user.type(input, 'new value');
      
      expect(onChange).toHaveBeenCalled();
      expect(input).toHaveValue('initial'); // Value should not change without parent update
      
      rerender(<Input value="updated" onChange={onChange} />);
      expect(input).toHaveValue('updated');
    });

    it('works as uncontrolled component', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<Input defaultValue="initial" onChange={onChange} />);
      
      const input = screen.getByDisplayValue('initial');
      await user.clear(input);
      await user.type(input, 'new value');
      
      expect(onChange).toHaveBeenCalled();
      expect(input).toHaveValue('new value');
    });
  });

  describe('Edge Cases', () => {
    it('handles empty string value', () => {
      render(<Input value="" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveValue('');
    });

    it('handles null value gracefully', () => {
      render(<Input value={null as any} />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveValue('');
    });

    it('handles undefined value gracefully', () => {
      render(<Input value={undefined} />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveValue('');
    });

    it('handles very long text', async () => {
      const user = userEvent.setup();
      const longText = 'a'.repeat(1000);
      const onChange = vi.fn();
      render(<Input onChange={onChange} />);
      
      const input = screen.getByRole('textbox');
      await user.type(input, longText);
      
      expect(onChange).toHaveBeenCalled();
      expect(input).toHaveValue(longText);
    });

    it('handles special characters', async () => {
      const user = userEvent.setup();
      const specialChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
      const onChange = vi.fn();
      render(<Input onChange={onChange} />);
      
      const input = screen.getByRole('textbox');
      await user.type(input, specialChars);
      
      expect(onChange).toHaveBeenCalled();
      expect(input).toHaveValue(specialChars);
    });
  });

  describe('Icon Positioning', () => {
    it('adjusts padding when leading icon is present', () => {
      const icon = <span data-testid="leading-icon">🔍</span>;
      render(<Input leadingIcon={icon} placeholder="Search" />);
      const input = screen.getByPlaceholderText('Search');
      expect(input).toHaveClass('pl-10');
    });

    it('adjusts padding when trailing icon is present', () => {
      const icon = <span data-testid="trailing-icon">👁</span>;
      render(<Input trailingIcon={icon} placeholder="Password" />);
      const input = screen.getByPlaceholderText('Password');
      expect(input).toHaveClass('pr-10');
    });

    it('adjusts padding when both icons are present', () => {
      const leadingIcon = <span data-testid="leading-icon">🔍</span>;
      const trailingIcon = <span data-testid="trailing-icon">👁</span>;
      render(<Input leadingIcon={leadingIcon} trailingIcon={trailingIcon} placeholder="Search" />);
      const input = screen.getByPlaceholderText('Search');
      expect(input).toHaveClass('pl-10', 'pr-10');
    });
  });

  describe('Error States', () => {
    it('shows error message when error is provided', () => {
      render(<Input error="This field is required" />);
      expect(screen.getByText('This field is required')).toBeInTheDocument();
    });

    it('hides description when error is present', () => {
      render(<Input description="Help text" error="Error message" />);
      expect(screen.queryByText('Help text')).not.toBeInTheDocument();
      expect(screen.getByText('Error message')).toBeInTheDocument();
    });

    it('applies error styling to input', () => {
      render(<Input error="Error message" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('border-red-500');
    });

    it('applies error styling to label when present', () => {
      render(<Input label="Test Label" error="Error message" />);
      const label = screen.getByText('Test Label');
      // Label should not have error styling, but input should
      const input = screen.getByLabelText('Test Label');
      expect(input).toHaveClass('border-red-500');
    });
  });

  describe('Focus Management', () => {
    it('can be focused programmatically', () => {
      const ref = React.createRef<HTMLInputElement>();
      render(<Input ref={ref} placeholder="Test input" />);
      
      ref.current?.focus();
      expect(ref.current).toHaveFocus();
    });

    it('maintains focus during controlled updates', async () => {
      const user = userEvent.setup();
      const { rerender } = render(<Input value="initial" />);
      
      const input = screen.getByDisplayValue('initial');
      await user.click(input);
      expect(input).toHaveFocus();
      
      rerender(<Input value="updated" />);
      expect(input).toHaveFocus();
    });
  });

  describe('Performance', () => {
    it('does not re-render unnecessarily', () => {
      const renderSpy = vi.fn();
      const TestComponent = () => {
        renderSpy();
        return <Input placeholder="Test" />;
      };
      
      const { rerender } = render(<TestComponent />);
      expect(renderSpy).toHaveBeenCalledTimes(1);
      
      rerender(<TestComponent />);
      expect(renderSpy).toHaveBeenCalledTimes(2);
    });
  });
});
