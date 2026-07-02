import type { HTMLAttributes, ReactNode } from 'react';
import styles from './Card.module.css';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Optional image URL shown at the top of the card. */
  imageSrc?: string;
  /** Alt text for the image. */
  imageAlt?: string;
  /** Card heading. */
  title?: string;
  /** Supporting body text. */
  description?: ReactNode;
  /** Action area content (e.g. buttons). Rendered at the bottom of the card. */
  actions?: ReactNode;
  /** Renders the card as a pressable element with hover/active states. */
  interactive?: boolean;
}

/**
 * Card molecule.
 *
 * Tokens: `--packt-semantic-colors-light-background-primary` (bg),
 * `--packt-semantic-colors-light-border-divide` (border),
 * `--packt-semantic-colors-light-background-hover` (interactive hover),
 * `--packt-radius-m/l`, `--packt-space-l/xl`, `--packt-size-16/14`,
 * box-shadow from component token `boxShadow.default`.
 */
export const Card = ({
  imageSrc,
  imageAlt = '',
  title,
  description,
  actions,
  interactive = false,
  className,
  children,
  ...rest
}: CardProps) => (
  <div
    className={[styles.card, interactive ? styles.interactive : '', className ?? '']
      .filter(Boolean)
      .join(' ')}
    {...rest}
  >
    {imageSrc && (
      <div className={styles.imageWrapper}>
        <img className={styles.image} src={imageSrc} alt={imageAlt} />
      </div>
    )}
    <div className={styles.body}>
      {title && <h3 className={styles.title}>{title}</h3>}
      {description && <p className={styles.description}>{description}</p>}
      {children}
    </div>
    {actions && <div className={styles.actions}>{actions}</div>}
  </div>
);

Card.displayName = 'Card';
