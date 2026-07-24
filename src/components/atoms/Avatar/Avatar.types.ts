import type { ComponentPropsWithoutRef } from 'react';
import type { Root } from '@radix-ui/react-avatar';

export type AvatarSize = 'sm' | 'md' | 'lg';
export type AvatarStatus = 'online' | 'offline' | 'away';

export interface AvatarProps extends ComponentPropsWithoutRef<typeof Root> {
  /** Image URL. Omit to show initials or a fallback icon. */
  src?: string;
  /**
   * Accessible name for the avatar (usually the person's name). Required —
   * it becomes the image alt text and the control's accessible label.
   */
  alt: string;
  /** Initials shown when no image is provided/loadable (max 2 chars). */
  initials?: string;
  size?: AvatarSize;
  /** Status indicator dot rendered at the bottom-right corner. */
  status?: AvatarStatus;
  /** Milliseconds to wait for the image before showing the fallback. Mirrors Radix's `delayMs`. */
  fallbackDelayMs?: number;
}
