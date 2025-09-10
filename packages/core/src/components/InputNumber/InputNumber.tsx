import React, { useState, useCallback } from 'react';

export type InputNumberVariant = 'default' | 'filled' | 'outlined';
export type InputNumberSize = 'sm' | 'md' | 'lg';

export interface InputNumberProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type' | 'value' | 'onChange'> {
  label?: string;
  variant?: InputNumberVariant;
  size?: InputNumberSize;
  description?: string;
  error?: string;
  fullWidth?: boolean;
  value?: number | string;
  defaultValue?: number | string;
  onChange?: (value: number | undefined, event: React.ChangeEvent<HTMLInputElement>) => void;
  min?: number;
  max?: number;
  step?: number;
  precision?: number;
  showControls?: boolean;
  controlsPosition?: 'right' | 'left' | 'both';
  allowNegative?: boolean;
  allowDecimal?: boolean;
  thousandSeparator?: string;
  decimalSeparator?: string;
  prefix?: string;
  suffix?: string;
}

const base = 'block w-full rounded-xl border-0 transition-colors outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-500';

const sizeMap: Record<InputNumberSize, { input: string; button: string; icon: string }> = {
  sm: {
    input: 'h-9 px-3 text-sm',
    button: 'h-4 w-4',
    icon: 'w-3 h-3',
  },
  md: {
    input: 'h-10 px-4 text-sm',
    button: 'h-5 w-5',
    icon: 'w-4 h-4',
  },
  lg: {
    input: 'h-12 px-5 text-base',
    button: 'h-6 w-6',
    icon: 'w-5 h-5',
  },
};

const variantMap: Record<InputNumberVariant, string> = {
  default: 'bg-surface text-gray-900 placeholder:text-gray-500 shadow-neu focus-visible:shadow-neu-inset',
  filled: 'bg-gray-100 text-gray-900 placeholder:text-gray-500 focus:bg-white focus:shadow-neu',
  outlined: 'bg-transparent text-gray-900 placeholder:text-gray-500 border border-gray-300 focus:border-primary-500',
};

const formatNumber = (value: number, precision?: number, thousandSeparator = ',', decimalSeparator = '.'): string => {
  if (isNaN(value)) return '';
  
  const fixed = precision !== undefined ? value.toFixed(precision) : value.toString();
  const [integer, decimal] = fixed.split('.');
  
  const formattedInteger = integer.replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator);
  
  return decimal ? `${formattedInteger}${decimalSeparator}${decimal}` : formattedInteger;
};

const parseNumber = (value: string, thousandSeparator = ',', decimalSeparator = '.'): number => {
  if (!value) return NaN;
  
  const cleaned = value
    .replace(new RegExp(`\\${thousandSeparator}`, 'g'), '')
    .replace(decimalSeparator, '.');
  
  return parseFloat(cleaned);
};

export const InputNumber = React.forwardRef<HTMLInputElement, InputNumberProps>(
  (
    {
      label,
      variant = 'default',
      size = 'md',
      description,
      error,
      fullWidth,
      className,
      disabled,
      id,
      value,
      defaultValue,
      onChange,
      min,
      max,
      step = 1,
      precision,
      showControls = true,
      controlsPosition = 'right',
      allowNegative = true,
      allowDecimal = true,
      thousandSeparator = ',',
      decimalSeparator = '.',
      prefix,
      suffix,
      ...rest
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = useState<string>(() => {
      const initialValue = value !== undefined ? value : defaultValue;
      return initialValue !== undefined ? formatNumber(Number(initialValue), precision, thousandSeparator, decimalSeparator) : '';
    });

    const hasError = !!error;
    const sizeClasses = sizeMap[size];
    const inputId = id || `input-number-${Math.random().toString(36).substr(2, 9)}`;

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
      let inputValue = event.target.value;
      
      // Validate input based on allowDecimal and allowNegative
      if (!allowDecimal && inputValue.includes(decimalSeparator)) {
        return; // Don't update if decimal is not allowed
      }
      
      if (!allowNegative && inputValue.startsWith('-')) {
        return; // Don't update if negative is not allowed
      }
      
      const numericValue = parseNumber(inputValue, thousandSeparator, decimalSeparator);
      
      setInternalValue(inputValue);
      
      if (onChange) {
        onChange(isNaN(numericValue) ? undefined : numericValue, event);
      }
    }, [onChange, thousandSeparator, decimalSeparator, allowDecimal, allowNegative]);

    const handleStep = useCallback((direction: 'up' | 'down') => {
      if (disabled) return;
      
      const currentValue = parseNumber(internalValue, thousandSeparator, decimalSeparator);
      const currentNumeric = isNaN(currentValue) ? 0 : currentValue;
      
      let newValue = direction === 'up' ? currentNumeric + step : currentNumeric - step;
      
      if (min !== undefined) newValue = Math.max(newValue, min);
      if (max !== undefined) newValue = Math.min(newValue, max);
      
      const formattedValue = formatNumber(newValue, precision, thousandSeparator, decimalSeparator);
      setInternalValue(formattedValue);
      
      if (onChange) {
        const syntheticEvent = {
          target: { value: formattedValue },
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(newValue, syntheticEvent);
      }
    }, [internalValue, step, min, max, precision, thousandSeparator, decimalSeparator, disabled, onChange]);

    const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'ArrowUp') {
        event.preventDefault();
        handleStep('up');
      } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        handleStep('down');
      }
    }, [handleStep]);

    const handleWheel = useCallback((event: React.WheelEvent<HTMLInputElement>) => {
      if (document.activeElement === event.currentTarget) {
        event.preventDefault();
        handleStep(event.deltaY < 0 ? 'up' : 'down');
      }
    }, [handleStep]);

    const ControlButton = ({ direction, position }: { direction: 'up' | 'down'; position: 'left' | 'right' }) => (
      <button
        type="button"
        className={[
          'absolute top-1/2 -translate-y-1/2 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors',
          position === 'left' ? 'left-1' : 'right-1',
          sizeClasses.button,
          disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
        ].join(' ')}
        onClick={() => handleStep(direction)}
        disabled={disabled}
        tabIndex={-1}
      >
        {direction === 'up' ? (
          <svg className={sizeClasses.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        ) : (
          <svg className={sizeClasses.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </button>
    );

    const inputElement = (
      <div className="relative">
        {showControls && (controlsPosition === 'left' || controlsPosition === 'both') && (
          <div className="absolute left-0 top-0 h-full flex flex-col">
            <ControlButton direction="up" position="left" />
            <ControlButton direction="down" position="left" />
          </div>
        )}
        
        {prefix && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
            {prefix}
          </div>
        )}
        
        <input
          ref={ref}
          id={inputId}
          type="text"
          inputMode="numeric"
          className={[
            base,
            sizeClasses.input,
            variantMap[variant],
            hasError ? 'border-red-500 focus-visible:outline-red-500' : '',
            disabled ? 'opacity-50 cursor-not-allowed' : '',
            prefix ? 'pl-8' : '',
            suffix || showControls ? 'pr-8' : '',
            fullWidth ? 'w-full' : '',
            className ?? '',
          ].join(' ')}
          disabled={disabled}
          value={internalValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onWheel={handleWheel}
          {...rest}
        />
        
        {suffix && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
            {suffix}
          </div>
        )}
        
        {showControls && (controlsPosition === 'right' || controlsPosition === 'both') && (
          <div className="absolute right-0 top-0 h-full flex flex-col">
            <ControlButton direction="up" position="right" />
            <ControlButton direction="down" position="right" />
          </div>
        )}
      </div>
    );

    if (!label && !description && !error) {
      return inputElement;
    }

    return (
      <div className={fullWidth ? 'w-full' : ''}>
        {label && (
          <label
            className={[
              'block text-sm font-medium text-gray-900 mb-1',
              disabled ? 'opacity-50' : '',
            ].join(' ')}
            htmlFor={inputId}
          >
            {label}
          </label>
        )}
        {inputElement}
        {description && !error && (
          <p
            className={[
              'mt-1 text-sm text-gray-500',
              disabled ? 'opacity-50' : '',
            ].join(' ')}
          >
            {description}
          </p>
        )}
        {error && (
          <p className="mt-1 text-sm text-red-600">
            {error}
          </p>
        )}
      </div>
    );
  },
);

InputNumber.displayName = 'InputNumber';

export default InputNumber;
