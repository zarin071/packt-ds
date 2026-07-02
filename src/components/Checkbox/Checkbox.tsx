import { useId, type InputHTMLAttributes } from 'react';
import { CheckIcon, MinusIcon } from '../icons';
import styles from './Checkbox.module.css';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /** Visible label rendered beside the checkbox. */
  label?: string;
  /** Indeterminate state (dash icon). Overrides `checked` visually. */
  indeterminate?: boolean;
  /** Error message switches border to error token. */
  error?: string;
}

/**
 * Checkbox molecule.
 *
 * Tokens: `--packt-semantic-colors-light-background-brand-selected` (checked fill),
 * `--packt-semantic-colors-light-border-primary` (unchecked border),
 * `--packt-semantic-colors-light-border-error` (error border),
 * `--packt-semantic-colors-light-background-disabled` / `border-disabled` (disabled),
 * `--packt-radius-xs`, `--packt-size-16/14`, `--packt-space-s`, `--packt-focus-ring`.
 */
export const Checkbox = ({
  label,
  indeterminate = false,
  error,
  disabled = false,
  checked,
  className,
  id,
  ...rest
}: CheckboxProps) => {
  const reactId = useId();
  const inputId = id ?? reactId;
  const errorId = `${inputId}-error`;

  const wrapperClasses = [
    styles.wrapper,
    disabled ? styles.disabled : '',
    error ? styles.hasError : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={wrapperClasses}>
      <label className={styles.label} htmlFor={inputId}>
        <span className={styles.control}>
          <input
            id={inputId}
            type="checkbox"
            className={styles.input}
            disabled={disabled}
            checked={checked}
            aria-checked={indeterminate ? 'mixed' : checked}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? errorId : undefined}
            {...rest}
          />
          <span className={[styles.box, indeterminate ? styles.indeterminate : ''].filter(Boolean).join(' ')} aria-hidden="true">
            {indeterminate ? <MinusIcon /> : <CheckIcon />}
          </span>
        </span>
        {label && <span className={styles.labelText}>{label}</span>}
      </label>
      {error && (
        <span id={errorId} className={styles.errorText}>
          {error}
        </span>
      )}
    </div>
  );
};

Checkbox.displayName = 'Checkbox';
