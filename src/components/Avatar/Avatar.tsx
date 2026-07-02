import type { HTMLAttributes } from 'react';
import { UserIcon } from '../icons';
import styles from './Avatar.module.css';

export type AvatarSize = 'small' | 'medium' | 'large';
export type AvatarStatus = 'online' | 'offline' | 'away';

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  /** Image URL. Omit to show initials or fallback icon. */
  src?: string;
  /** Alt text for the image. */
  alt?: string;
  /** Initials shown when no image is provided (max 2 chars). */
  initials?: string;
  size?: AvatarSize;
  /** Status indicator dot. */
  status?: AvatarStatus;
}

/**
 * Avatar molecule.
 *
 * Tokens: `--packt-semantic-colors-light-background-brand-default` (initials bg),
 * `--packt-semantic-colors-light-content-brand-default` (initials text),
 * `--packt-radius-circle`, sizes via `--packt-size-*`,
 * `--packt-green-500` (online), `--packt-neutral-400` (offline), `--packt-yellow-500` (away).
 */
export const Avatar = ({
  src,
  alt = '',
  initials,
  size = 'medium',
  status,
  className,
  ...rest
}: AvatarProps) => (
  <span
    className={[styles.avatar, styles[size], className ?? ''].filter(Boolean).join(' ')}
    aria-label={alt || initials || 'Avatar'}
    {...rest}
  >
    {src ? (
      <img className={styles.image} src={src} alt={alt} />
    ) : initials ? (
      <span className={styles.initials} aria-hidden="true">
        {initials.slice(0, 2).toUpperCase()}
      </span>
    ) : (
      <span className={styles.fallback} aria-hidden="true">
        <UserIcon />
      </span>
    )}
    {status && (
      <span
        className={[styles.status, styles[status]].join(' ')}
        aria-label={`Status: ${status}`}
      />
    )}
  </span>
);

Avatar.displayName = 'Avatar';
