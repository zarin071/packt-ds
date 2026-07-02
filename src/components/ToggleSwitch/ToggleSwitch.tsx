import { useId, type InputHTMLAttributes } from 'react';
import styles from './ToggleSwitch.module.css';

export type ToggleSize = 'small' | 'medium' | 'large';

export interface ToggleSwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /** Visible label rendered beside the toggle. */
  label?: string;
  size?: ToggleSize;
}

/**
 * ToggleSwitch molecule.
 *
 * Tokens: `--packt-semantic-colors-light-background-brand-selected` (on track),
 * `--packt-semantic-colors-light-border-primary` (off track border),
 * `--packt-semantic-colors-light-background-disabled` (disabled track),
 * `--packt-base-white` (thumb), `--packt-radius-pill`, `--packt-focus-ring`.
 */
export const ToggleSwitch = ({
  label,
  size = 'medium',
  disabled = false,
  className,
  id,
  ...rest
}: ToggleSwitchProps) => {
  const reactId = useId();
  const inputId = id ?? reactId;

  const wrapperClasses = [
    styles.wrapper,
    styles[size],
    disabled ? styles.disabled : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <label className={wrapperClasses} htmlFor={inputId}>
      <span className={styles.track}>
        <input
          id={inputId}
          type="checkbox"
          role="switch"
          className={styles.input}
          disabled={disabled}
          {...rest}
        />
        <span className={styles.thumb} aria-hidden="true" />
      </span>
      {label && <span className={styles.labelText}>{label}</span>}
    </label>
  );
};

ToggleSwitch.displayName = 'ToggleSwitch';
