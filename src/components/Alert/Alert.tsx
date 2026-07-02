import type { HTMLAttributes, ReactNode } from 'react';
import { InfoIcon, SuccessIcon, WarningIcon, ErrorIcon, CloseIcon } from '../icons';
import styles from './Alert.module.css';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

const variantIcon: Record<AlertVariant, ReactNode> = {
  info: <InfoIcon />,
  success: <SuccessIcon />,
  warning: <WarningIcon />,
  error: <ErrorIcon />,
};

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  /** Bold heading line. */
  title?: string;
  /** Supporting body text (or arbitrary children). */
  description?: ReactNode;
  /** Show the default variant icon. Pass a node to override it. */
  icon?: boolean | ReactNode;
  /** Renders a close button and calls this when clicked. */
  onClose?: () => void;
}

/**
 * Alert / Toast molecule.
 *
 * Tokens: `--packt-semantic-colors-light-background-{variant}-default`,
 * `--packt-semantic-colors-light-border-{variant}`,
 * `--packt-semantic-colors-light-icon-{variant}-default`, content colors for
 * title/description, `--packt-radius-m`, `--packt-space-*`. Uses `role="alert"`
 * so screen readers announce it.
 */
export const Alert = ({
  variant = 'info',
  title,
  description,
  icon = true,
  onClose,
  children,
  className,
  ...rest
}: AlertProps) => {
  const iconNode = icon === true ? variantIcon[variant] : icon || null;

  return (
    <div
      role="alert"
      className={[styles.alert, styles[variant], className ?? ''].filter(Boolean).join(' ')}
      {...rest}
    >
      {iconNode && <span className={styles.icon}>{iconNode}</span>}
      <div className={styles.body}>
        {title && <span className={styles.title}>{title}</span>}
        {(description || children) && (
          <span className={styles.description}>{description ?? children}</span>
        )}
      </div>
      {onClose && (
        <button type="button" className={styles.close} onClick={onClose} aria-label="Dismiss">
          <CloseIcon />
        </button>
      )}
    </div>
  );
};

Alert.displayName = 'Alert';
