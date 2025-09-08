import React from 'react';

export type ButtonVariant = 'primary' | 'ghost' | 'soft';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const base =
  'inline-flex items-center justify-center select-none rounded-xl font-medium transition-colors outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-500';

const sizeMap: Record<ButtonSize, string> = {
  sm: 'h-9 px-3 text-sm gap-2',
  md: 'h-10 px-4 text-sm gap-2',
  lg: 'h-12 px-5 text-base gap-3',
};

const variantMap: Record<ButtonVariant, string> = {
  primary:
    'text-white bg-primary-600 shadow-neu active:shadow-neu-inset hover:bg-primary-500 disabled:opacity-50',
  ghost:
    'bg-surface text-gray-800 shadow-neu hover:shadow-neu-inset active:shadow-neu-inset disabled:opacity-50',
  soft:
    'bg-surface text-primary-600 shadow-neu hover:bg-surface-dark hover:shadow-neu-inset active:shadow-neu-inset',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      label,
      children,
      variant = 'primary',
      size = 'md',
      leadingIcon,
      trailingIcon,
      fullWidth,
      className,
      ...rest
    },
    ref,
  ) => {
    const content = (
      <>
        {leadingIcon ? <span aria-hidden="true" className="-ml-0.5">{leadingIcon}</span> : null}
        <span>{label ?? children}</span>
        {trailingIcon ? <span aria-hidden="true" className="-mr-0.5">{trailingIcon}</span> : null}
      </>
    );

    return (
      <button
        ref={ref}
        className={[
          base,
          sizeMap[size],
          variantMap[variant],
          fullWidth ? 'w-full' : '',
          className ?? '',
        ].join(' ')}
        {...rest}
      >
        {content}
      </button>
    );
  },
);

Button.displayName = 'Button';

export default Button;


