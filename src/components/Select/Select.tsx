import { useId, type SelectHTMLAttributes } from 'react';
import { ChevronDownIcon } from '../icons';
import styles from './Select.module.css';

export type SelectSize = 'small' | 'medium' | 'large';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  /** Field label rendered above the control. */
  label?: string;
  /** Helper text below the control. Replaced by `error` when set. */
  helperText?: string;
  /** Error message; switches border + helper text to error tokens. */
  error?: string;
  size?: SelectSize;
  /** Placeholder option shown when no value is selected. */
  placeholder?: string;
  options?: SelectOption[];
}

/**
 * Select molecule.
 *
 * Tokens: `--packt-semantic-colors-light-border-primary` (default border),
 * `--packt-semantic-colors-light-border-error` (error), `--packt-semantic-colors-light-border-brand-default` (focus),
 * `--packt-semantic-colors-light-background-primary`/`-disabled`,
 * `--packt-radius-s`, `--packt-size-*`, `--packt-space-*`, `--packt-focus-ring`.
 */
export const Select = ({
  label,
  helperText,
  error,
  size = 'medium',
  placeholder,
  options = [],
  disabled = false,
  required = false,
  className,
  id,
  children,
  ...rest
}: SelectProps) => {
  const reactId = useId();
  const selectId = id ?? reactId;
  const helperId = `${selectId}-help`;
  const hasError = Boolean(error);

  const fieldClasses = [
    styles.field,
    styles[size],
    hasError ? styles.error : '',
    disabled ? styles.disabled : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={[styles.wrapper, className ?? ''].filter(Boolean).join(' ')}>
      {label && (
        <label className={styles.label} htmlFor={selectId}>
          {label}
          {required && <span className={styles.required} aria-hidden="true">*</span>}
        </label>
      )}
      <div className={fieldClasses}>
        <select
          id={selectId}
          className={styles.select}
          disabled={disabled}
          required={required}
          aria-invalid={hasError || undefined}
          aria-describedby={helperText || error ? helperId : undefined}
          {...rest}
        >
          {placeholder && (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.label}
            </option>
          ))}
          {children}
        </select>
        <span className={styles.chevron} aria-hidden="true">
          <ChevronDownIcon />
        </span>
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

Select.displayName = 'Select';
