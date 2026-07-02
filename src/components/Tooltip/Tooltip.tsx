import { useState, useRef, type ReactNode, type HTMLAttributes } from 'react';
import styles from './Tooltip.module.css';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  /** The tooltip text content. */
  content: ReactNode;
  position?: TooltipPosition;
  /** The trigger element that receives the tooltip. */
  children: ReactNode;
  /** Additional class for the wrapper span. */
  className?: string;
}

/**
 * Tooltip molecule.
 *
 * Tokens: `--packt-semantic-colors-light-background-selected` (tip bg = dark),
 * `--packt-semantic-colors-light-content-selected` (tip text = white),
 * `--packt-radius-xs`, `--packt-space-xs/s`, `--packt-size-12`.
 */
export const Tooltip = ({
  content,
  position = 'top',
  children,
  className,
}: TooltipProps) => {
  const [visible, setVisible] = useState(false);
  const tipId = useRef(`tip-${Math.random().toString(36).slice(2)}`).current;

  const show = () => setVisible(true);
  const hide = () => setVisible(false);

  return (
    <span
      className={[styles.wrapper, className ?? ''].filter(Boolean).join(' ')}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocusCapture={show}
      onBlurCapture={hide}
    >
      <span aria-describedby={visible ? tipId : undefined}>{children}</span>
      <span
        id={tipId}
        role="tooltip"
        className={[styles.tip, styles[position], visible ? styles.visible : ''].filter(Boolean).join(' ')}
      >
        {content}
        <span className={styles.arrow} aria-hidden="true" />
      </span>
    </span>
  );
};

Tooltip.displayName = 'Tooltip';
