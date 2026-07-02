import { useId, type InputHTMLAttributes } from 'react';
import styles from './RadioButton.module.css';

export interface RadioButtonProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /** Visible label rendered beside the radio. */
  label?: string;
  /** Error message switches border to error token. */
  error?: string;
}

/**
 * RadioButton molecule.
 *
 * Tokens: `--packt-semantic-colors-light-background-brand-selected` (checked dot fill),
 * `--packt-semantic-colors-light-border-primary` (unchecked ring),
 * `--packt-semantic-colors-light-border-error` (error state),
 * `--packt-semantic-colors-light-background-disabled` (disabled fill),
 * `--packt-radius-circle`, `--packt-size-16`, `--packt-space-s`, `--packt-focus-ring`.
 */
export const RadioButton = ({
  label,
  error,
  disabled = false,
  className,
  id,
  ...rest
}: RadioButtonProps) => {
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
            type="radio"
            className={styles.input}
            disabled={disabled}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? errorId : undefined}
            {...rest}
          />
          <span className={styles.ring} aria-hidden="true">
            <span className={styles.dot} />
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

RadioButton.displayName = 'RadioButton';
