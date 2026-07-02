import type { HTMLAttributes } from 'react';
import styles from './ProgressBar.module.css';

export type ProgressSize = 'small' | 'medium' | 'large';

export interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  /** Value 0–100. */
  value: number;
  size?: ProgressSize;
  /** Show the percentage label beside/inside the bar. */
  showLabel?: boolean;
  /** Accessible label for the progress bar. */
  label?: string;
}

/**
 * ProgressBar molecule.
 *
 * Tokens: `--packt-semantic-colors-light-background-brand-selected` (fill),
 * `--packt-neutral-200` (track bg), `--packt-radius-pill`,
 * `--packt-size-12` (label text), `--packt-space-xs/s`.
 */
export const ProgressBar = ({
  value,
  size = 'medium',
  showLabel = false,
  label = 'Progress',
  className,
  ...rest
}: ProgressBarProps) => {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div
      className={[styles.wrapper, className ?? ''].filter(Boolean).join(' ')}
      {...rest}
    >
      <div
        className={[styles.track, styles[size]].join(' ')}
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
      >
        <div className={styles.fill} style={{ width: `${clamped}%` }} />
      </div>
      {showLabel && (
        <span className={styles.label} aria-hidden="true">
          {clamped}%
        </span>
      )}
    </div>
  );
};

ProgressBar.displayName = 'ProgressBar';
