import { forwardRef, type ElementRef } from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { UserIcon } from '../icons';
import type { AvatarProps } from './Avatar.types';

export const avatarVariants = cva(
  [
    'relative inline-flex shrink-0 items-center justify-center overflow-visible',
    'rounded-circle border border-border-default bg-brand-bg-hover font-sans',
  ].join(' '),
  {
    variants: {
      size: {
        small: 'size-6 text-xs',
        medium: 'size-10 text-sm',
        large: 'size-14 text-xl',
      },
    },
    defaultVariants: {
      size: 'medium',
    },
  }
);

const statusDotVariants = cva('absolute bottom-0 right-0 rounded-circle border-2 border-bg-surface', {
  variants: {
    size: {
      small: 'size-2',
      medium: 'size-2.5',
      large: 'size-3',
    },
    status: {
      online: 'bg-status-bg-success',
      away: 'bg-status-bg-warning',
      offline: 'bg-neutral-400',
    },
  },
  defaultVariants: {
    size: 'medium',
    status: 'offline',
  },
});

/**
 * Avatar molecule, built on Radix Avatar — `Fallback` only renders after the
 * image fails to load or the load has taken longer than `fallbackDelayMs`,
 * which avoids a flash of initials/icon while a fast-loading image is
 * in flight (a plain `<img>` can't do this).
 */
export const Avatar = forwardRef<ElementRef<typeof AvatarPrimitive.Root>, AvatarProps>(
  (
    {
      className,
      src,
      alt = '',
      initials,
      size,
      status,
      fallbackDelayMs = 600,
      ...props
    },
    ref
  ) => (
    <AvatarPrimitive.Root
      ref={ref}
      className={cn(avatarVariants({ size }), className)}
      aria-label={alt || initials || 'Avatar'}
      {...props}
    >
      <AvatarPrimitive.Image
        className="size-full rounded-[inherit] object-cover"
        src={src}
        alt={alt}
      />
      <AvatarPrimitive.Fallback
        className="flex size-full items-center justify-center rounded-[inherit]"
        delayMs={fallbackDelayMs}
      >
        {initials ? (
          <span className="font-semibold leading-none text-brand-text-default" aria-hidden="true">
            {initials.slice(0, 2).toUpperCase()}
          </span>
        ) : (
          <span className="flex size-3/5 items-center justify-center text-content-primary" aria-hidden="true">
            <UserIcon />
          </span>
        )}
      </AvatarPrimitive.Fallback>
      {status && (
        <span className={statusDotVariants({ size, status })} aria-label={`Status: ${status}`} />
      )}
    </AvatarPrimitive.Root>
  )
);

Avatar.displayName = 'Avatar';

export type { AvatarProps, AvatarSize, AvatarStatus } from './Avatar.types';
