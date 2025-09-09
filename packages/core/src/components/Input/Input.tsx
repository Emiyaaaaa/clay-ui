import React from 'react';

export type InputVariant = 'default' | 'filled' | 'outlined';
export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  variant?: InputVariant;
  size?: InputSize;
  description?: string;
  error?: string;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const base = 'block w-full rounded-xl border-0 transition-colors outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-500';

const sizeMap: Record<InputSize, string> = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-5 text-base',
};

const variantMap: Record<InputVariant, string> = {
  default: 'bg-surface text-gray-900 placeholder:text-gray-500 shadow-neu focus-visible:shadow-neu-inset',
  filled: 'bg-gray-100 text-gray-900 placeholder:text-gray-500 focus:bg-white focus:shadow-neu',
  outlined: 'bg-transparent text-gray-900 placeholder:text-gray-500 border border-gray-300 focus:border-primary-500',
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      variant = 'default',
      size = 'md',
      description,
      error,
      leadingIcon,
      trailingIcon,
      fullWidth,
      className,
      disabled,
      id,
      ...rest
    },
    ref,
  ) => {
    const hasError = !!error;
    const sizeClasses = sizeMap[size];
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    const inputElement = (
      <div className="relative">
        {leadingIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            {leadingIcon}
          </div>
        )}
        <input
          ref={ref}
          id={inputId}
          className={[
            base,
            sizeClasses,
            variantMap[variant],
            hasError ? 'border-red-500 focus-visible:outline-red-500' : '',
            disabled ? 'opacity-50 cursor-not-allowed' : '',
            leadingIcon ? 'pl-10' : '',
            trailingIcon ? 'pr-10' : '',
            fullWidth ? 'w-full' : '',
            className ?? '',
          ].join(' ')}
          disabled={disabled}
          {...rest}
        />
        {trailingIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            {trailingIcon}
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

Input.displayName = 'Input';

export default Input;
