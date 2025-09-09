import React from 'react';

export type SwitchSize = 'sm' | 'md' | 'lg';

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  label?: string;
  size?: SwitchSize;
  description?: string;
  error?: string;
}

const sizeMap: Record<SwitchSize, { track: string; thumb: string; text: string }> = {
  sm: {
    track: 'h-4 w-7',
    thumb: 'h-3 w-3',
    text: 'text-sm',
  },
  md: {
    track: 'h-5 w-9',
    thumb: 'h-4 w-4',
    text: 'text-sm',
  },
  lg: {
    track: 'h-6 w-11',
    thumb: 'h-5 w-5',
    text: 'text-base',
  },
};

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      label,
      size = 'md',
      description,
      error,
      className,
      disabled,
      ...rest
    },
    ref,
  ) => {
    const sizeClasses = sizeMap[size];
    const hasError = !!error;

    const switchElement = (
      <div className="relative inline-flex">
        <input
          ref={ref}
          type="checkbox"
          className="sr-only"
          disabled={disabled}
          {...rest}
        />
        <div
          className={[
            'relative inline-flex items-center rounded-full transition-colors duration-200 ease-in-out cursor-pointer',
            sizeClasses.track,
            disabled ? 'opacity-50 cursor-not-allowed' : '',
            hasError
              ? 'bg-red-200'
              : 'bg-gray-200 peer-checked:bg-primary-600 peer-focus:ring-2 peer-focus:ring-primary-500 peer-focus:ring-offset-2',
            className ?? '',
          ].join(' ')}
        >
          <span
            className={[
              'inline-block rounded-full bg-white shadow transform transition-transform duration-200 ease-in-out',
              sizeClasses.thumb,
            ].join(' ')}
            style={{
              transform: rest.checked ? `translateX(${size === 'sm' ? '12px' : size === 'md' ? '16px' : '20px'})` : 'translateX(2px)',
            }}
          />
        </div>
      </div>
    );

    if (!label && !description && !error) {
      return switchElement;
    }

    return (
      <div className="flex items-start space-x-3">
        {switchElement}
        <div className="flex-1 min-w-0">
          {label && (
            <label
              className={[
                'block font-medium text-gray-900 cursor-pointer',
                sizeClasses.text,
                disabled ? 'opacity-50 cursor-not-allowed' : '',
              ].join(' ')}
              htmlFor={rest.id}
            >
              {label}
            </label>
          )}
          {description && (
            <p
              className={[
                'mt-1 text-gray-500',
                sizeClasses.text,
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
      </div>
    );
  },
);

Switch.displayName = 'Switch';

export default Switch;
