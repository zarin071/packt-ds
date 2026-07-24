import { forwardRef, type ElementRef } from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { cva } from 'class-variance-authority';
import { cn } from '../../../lib/utils';
import { UserIcon } from '../../../lib/icons';
import type { AvatarProps } from './Avatar.types';

export const avatarVariants = cva(
  [
    'relative inline-flex shrink-0 items-center justify-center overflow-visible',
    'rounded-circle border border-border-default bg-brand-bg-hover font-sans',
  ].join(' '),
  {
    variants: {
      size: {
        sm: 'size-8 text-xs',
        md: 'size-10 text-sm',
        lg: 'size-14 text-xl',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const statusDotVariants = cva('absolute bottom-0 right-0 rounded-circle border-2 border-bg-surface', {
  variants: {
    size: {
      sm: 'size-2',
      md: 'size-2.5',
      lg: 'size-3',
    },
    status: {
      online: 'bg-status-bg-success',
      away: 'bg-status-bg-warning',
      offline: 'bg-neutral-400',
    },
  },
  defaultVariants: {
    size: 'md',
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
      alt,
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
      role="img"
      className={cn(avatarVariants({ size }), className)}
      aria-label={alt}
      {...props}
    >
      <AvatarPrimitive.Image
        className="size-full rounded-[inherit] object-cover"
        src={src}
        alt={alt}
      />
      <AvatarPrimitive.Fallback
        className="flex size-full items-center justify-center rounded-[inherit]"
        // Only delay the fallback when there's an image that might load — with
        // no src, show initials/icon immediately.
        delayMs={src ? fallbackDelayMs : 0}
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
        <span
          role="img"
          className={statusDotVariants({ size, status })}
          aria-label={`Status: ${status}`}
        />
      )}
    </AvatarPrimitive.Root>
  )
);

Avatar.displayName = 'Avatar';

export type { AvatarProps, AvatarSize, AvatarStatus } from './Avatar.types';
