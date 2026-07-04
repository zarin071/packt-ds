import type { ReactNode } from 'react';
import './Button.css';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

const Spinner = () => (
  <svg className="btn__spinner" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" strokeOpacity="0.3" />
    <path d="M14 8a6 6 0 0 1-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  label: string;
  disabled?: boolean;
  loading?: boolean;
  icon?: ReactNode;
  iconPosition?: 'start' | 'end';
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  label,
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'start',
}: ButtonProps) => {
  const leadingIcon = loading ? <Spinner /> : (icon && iconPosition === 'start' && <span className="btn__icon">{icon}</span>);
  const trailingIcon = !loading && icon && iconPosition === 'end' && <span className="btn__icon">{icon}</span>;

  return (
    <button
      className={`btn btn--${variant} btn--${size}${loading ? ' btn--loading' : ''}`}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
    >
      {leadingIcon}
      {label}
      {trailingIcon}
    </button>
  );
};
