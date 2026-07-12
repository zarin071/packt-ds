import type { BadgeProps } from '../Badge';

export type FormatType = 'ebook' | 'paperback' | 'video' | 'audiobook';

export interface FormatBadgeProps extends Omit<BadgeProps, 'variant' | 'icon' | 'children'> {
  /** The product format. Determines the icon and label. */
  format: FormatType;
}
