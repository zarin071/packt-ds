import type { HTMLAttributes, ReactNode } from 'react';

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
  /** Renders the card as a pressable element with hover/focus states. */
  interactive?: boolean;
}
