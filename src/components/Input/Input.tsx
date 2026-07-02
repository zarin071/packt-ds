import { useId, useState } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import { SearchIcon } from '../icons';
import styles from './Input.module.css';

export type InputSize = 'small' | 'medium' | 'large';
export type InputType = 'text' | 'password' | 'search' | 'email';

const sizeClass: Record<InputSize, string> = {
  small: styles.sm,
  medium: styles.md,
  large: styles.lg,
};

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Field label rendered above the control. */
  label?: string;
  /** Helper/description text below the control. Replaced by `error` when set. */
  helperText?: string;
  /** Error message; switches border + helper text to the error tokens. */
  error?: string;
  size?: InputSize;
  type?: InputType;
  /** Marks the field as required (adds a `*` and the `required` attribute). */
  required?: boolean;
  /** Custom leading icon. `search` type gets a search icon by default. */
  startIcon?: ReactNode;
  /** Custom trailing icon/adornment. */
  endIcon?: ReactNode;
}

/**
 * Input molecule.
 *
 * Tokens: `--packt-semantic-colors-light-border-*` (default/brand focus/error),
 * `--packt-semantic-colors-light-background-primary`/`-disabled`,
 * content colors for label/helper/error text, `--packt-radius-s`, `--packt-size-*`
 * for height/type-scale, Outfit font family. Focus uses `--packt-focus-ring`.
 */
export const Input = ({
  label,
  helperText,
  error,
  size = 'medium',
  type = 'text',
  required = false,
  disabled = false,
  startIcon,
  endIcon,
  id,
  className,
  ...rest
}: InputProps) => {
  const reactId = useId();
  const inputId = id ?? reactId;
  const helperId = `${inputId}-help`;
  const hasError = Boolean(error);

  const leading = startIcon ?? (type === 'search' ? <SearchIcon /> : undefined);

  const fieldClasses = [
    styles.field,
    sizeClass[size],
    hasError ? styles.error : '',
    disabled ? styles.disabled : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={[styles.wrapper, className ?? ''].filter(Boolean).join(' ')}>
      {label && (
        <label className={styles.label} htmlFor={inputId}>
          {label}
          {required && <span className={styles.required} aria-hidden="true">*</span>}
        </label>
      )}
      <div className={fieldClasses}>
        {leading && <span className={styles.icon}>{leading}</span>}
        <input
          id={inputId}
          type={type}
          className={styles.input}
          disabled={disabled}
          required={required}
          aria-invalid={hasError || undefined}
          aria-describedby={helperText || error ? helperId : undefined}
          {...rest}
        />
        {endIcon && <span className={styles.icon}>{endIcon}</span>}
      </div>
      {(error || helperText) && (
        <span
          id={helperId}
          className={[styles.helper, hasError ? styles.helperError : ''].filter(Boolean).join(' ')}
        >
          {error || helperText}
        </span>
      )}
    </div>
  );
};

Input.displayName = 'Input';
