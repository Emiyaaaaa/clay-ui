import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { InputNumber } from './InputNumber';

describe('InputNumber', () => {
  it('renders input element', () => {
    render(<InputNumber placeholder="Enter number" />);
    expect(screen.getByPlaceholderText('Enter number')).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<InputNumber label="Amount" placeholder="Enter amount" />);
    expect(screen.getByLabelText('Amount')).toBeInTheDocument();
  });

  it('renders with description', () => {
    render(<InputNumber label="Price" description="Enter the price" />);
    expect(screen.getByText('Enter the price')).toBeInTheDocument();
  });

  it('renders with error message', () => {
    render(<InputNumber label="Quantity" error="Invalid quantity" />);
    expect(screen.getByText('Invalid quantity')).toBeInTheDocument();
  });

  it('handles user input', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<InputNumber placeholder="Enter number" onChange={onChange} />);
    
    const input = screen.getByPlaceholderText('Enter number');
    await user.type(input, '123');
    
    expect(onChange).toHaveBeenCalled();
    expect(input).toHaveValue('123');
  });

  it('supports disabled state', () => {
    render(<InputNumber placeholder="Disabled input" disabled />);
    const input = screen.getByPlaceholderText('Disabled input');
    expect(input).toBeDisabled();
  });

  it('applies correct size classes', () => {
    const { rerender } = render(<InputNumber size="sm" placeholder="Small" />);
    expect(screen.getByPlaceholderText('Small')).toHaveClass('h-9', 'px-3', 'text-sm');

    rerender(<InputNumber size="md" placeholder="Medium" />);
    expect(screen.getByPlaceholderText('Medium')).toHaveClass('h-10', 'px-4', 'text-sm');

    rerender(<InputNumber size="lg" placeholder="Large" />);
    expect(screen.getByPlaceholderText('Large')).toHaveClass('h-12', 'px-5', 'text-base');
  });

  it('applies correct variant classes', () => {
    const { rerender } = render(<InputNumber variant="default" placeholder="Default" />);
    expect(screen.getByPlaceholderText('Default')).toHaveClass('bg-surface', 'shadow-neu');

    rerender(<InputNumber variant="filled" placeholder="Filled" />);
    expect(screen.getByPlaceholderText('Filled')).toHaveClass('bg-gray-100');

    rerender(<InputNumber variant="outlined" placeholder="Outlined" />);
    expect(screen.getByPlaceholderText('Outlined')).toHaveClass('bg-transparent', 'border');
  });

  it('applies error styling when error is present', () => {
    render(<InputNumber error="Error message" placeholder="Input with error" />);
    const input = screen.getByPlaceholderText('Input with error');
    expect(input).toHaveClass('border-red-500');
  });

  it('renders with prefix', () => {
    render(<InputNumber prefix="$" placeholder="Price" />);
    expect(screen.getByText('$')).toBeInTheDocument();
  });

  it('renders with suffix', () => {
    render(<InputNumber suffix="kg" placeholder="Weight" />);
    expect(screen.getByText('kg')).toBeInTheDocument();
  });

  it('applies fullWidth class when fullWidth is true', () => {
    render(<InputNumber fullWidth placeholder="Full width input" />);
    const input = screen.getByPlaceholderText('Full width input');
    expect(input).toHaveClass('w-full');
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    render(<InputNumber ref={ref} placeholder="Input with ref" />);
    expect(ref).toHaveBeenCalled();
  });

  it('handles step up with arrow keys', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<InputNumber value={10} step={5} onChange={onChange} />);
    
    const input = screen.getByDisplayValue('10');
    await user.click(input);
    await user.keyboard('{ArrowUp}');
    
    expect(onChange).toHaveBeenCalledWith(15, expect.any(Object));
  });

  it('handles step down with arrow keys', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<InputNumber value={10} step={5} onChange={onChange} />);
    
    const input = screen.getByDisplayValue('10');
    await user.click(input);
    await user.keyboard('{ArrowDown}');
    
    expect(onChange).toHaveBeenCalledWith(5, expect.any(Object));
  });

  it('respects min value', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<InputNumber value={5} min={10} step={5} onChange={onChange} />);
    
    const input = screen.getByDisplayValue('5');
    await user.click(input);
    await user.keyboard('{ArrowUp}');
    
    expect(onChange).toHaveBeenCalledWith(10, expect.any(Object));
  });

  it('respects max value', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<InputNumber value={15} max={10} step={5} onChange={onChange} />);
    
    const input = screen.getByDisplayValue('15');
    await user.click(input);
    await user.keyboard('{ArrowUp}');
    
    expect(onChange).toHaveBeenCalledWith(10, expect.any(Object));
  });

  it('formats numbers with thousand separator', () => {
    render(<InputNumber value={1234567} thousandSeparator="," />);
    expect(screen.getByDisplayValue('1,234,567')).toBeInTheDocument();
  });

  it('formats numbers with precision', () => {
    render(<InputNumber value={123.456} precision={2} />);
    expect(screen.getByDisplayValue('123.46')).toBeInTheDocument();
  });

  it('handles wheel events for stepping', () => {
    const onChange = vi.fn();
    render(<InputNumber value={10} step={1} onChange={onChange} />);
    
    const input = screen.getByDisplayValue('10');
    input.focus();
    fireEvent.wheel(input, { deltaY: -100 }); // Scroll up
    
    expect(onChange).toHaveBeenCalledWith(11, expect.any(Object));
  });

  it('shows controls by default', () => {
    render(<InputNumber placeholder="With controls" />);
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(2); // Up and down buttons
  });

  it('hides controls when showControls is false', () => {
    render(<InputNumber placeholder="No controls" showControls={false} />);
    const buttons = screen.queryAllByRole('button');
    expect(buttons).toHaveLength(0);
  });

  it('renders controls on the left when specified', () => {
    render(<InputNumber placeholder="Left controls" controlsPosition="left" />);
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(2);
  });

  it('renders controls on both sides when specified', () => {
    render(<InputNumber placeholder="Both controls" controlsPosition="both" />);
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(4); // 2 on each side
  });

  it('handles decimal input when allowDecimal is true', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<InputNumber allowDecimal onChange={onChange} />);
    
    const input = screen.getByRole('textbox');
    await user.type(input, '123.45');
    
    expect(onChange).toHaveBeenCalledWith(123.45, expect.any(Object));
  });

  it('prevents decimal input when allowDecimal is false', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<InputNumber allowDecimal={false} onChange={onChange} />);
    
    const input = screen.getByRole('textbox');
    await user.type(input, '123.45');
    
    // Should only accept the integer part (decimal point is blocked)
    expect(input).toHaveValue('12345');
  });

  it('handles negative numbers when allowNegative is true', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<InputNumber allowNegative onChange={onChange} />);
    
    const input = screen.getByRole('textbox');
    await user.type(input, '-123');
    
    expect(onChange).toHaveBeenCalledWith(-123, expect.any(Object));
  });

  it('prevents negative numbers when allowNegative is false', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<InputNumber allowNegative={false} onChange={onChange} />);
    
    const input = screen.getByRole('textbox');
    await user.type(input, '-123');
    
    // Should not accept negative sign
    expect(input).toHaveValue('123');
  });
});
