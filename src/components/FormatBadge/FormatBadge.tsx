import { forwardRef, type ReactNode } from 'react';
import { Badge } from '../Badge';
import { FileIcon, BookIcon, PlayIcon, HeadphonesIcon } from '../icons';
import type { FormatBadgeProps, FormatType } from './FormatBadge.types';

const FORMAT_MAP: Record<FormatType, { icon: ReactNode; label: string }> = {
  ebook: { icon: <FileIcon />, label: 'E-book' },
  paperback: { icon: <BookIcon />, label: 'Paperback' },
  video: { icon: <PlayIcon />, label: 'Video' },
  audiobook: { icon: <HeadphonesIcon />, label: 'Audiobook' },
};

/**
 * FormatBadge molecule — a Badge preset for product formats. Each `format`
 * maps to a fixed icon and label, rendered through the neutral Badge atom.
 */
export const FormatBadge = forwardRef<HTMLSpanElement, FormatBadgeProps>(
  ({ format, ...props }, ref) => {
    const { icon, label } = FORMAT_MAP[format];
    return (
      <Badge ref={ref} variant="neutral" icon={icon} {...props}>
        {label}
      </Badge>
    );
  }
);

FormatBadge.displayName = 'FormatBadge';

export type { FormatBadgeProps, FormatType } from './FormatBadge.types';
