import { forwardRef } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../../lib/utils';
import type { CardProps } from './Card.types';

export const cardVariants = cva(
  [
    'flex flex-col overflow-hidden rounded-md border border-border-default bg-bg-surface font-sans',
    'shadow-sm',
  ].join(' '),
  {
    variants: {
      interactive: {
        true: [
          'cursor-pointer transition-colors',
          'hover:bg-bg-hover',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2',
        ].join(' '),
        false: '',
      },
    },
    defaultVariants: {
      interactive: false,
    },
  }
);

/**
 * Card molecule — a bordered content container with an optional image, title,
 * description, and action row. Plain semantic HTML: the `interactive` variant
 * only adds visual affordances, so give the root a `tabIndex`/`role`/keyboard
 * handler yourself if you make it clickable (or wrap it in a real `<button>`/`<a>`).
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      imageSrc,
      imageAlt = '',
      title,
      description,
      actions,
      interactive = false,
      children,
      ...props
    },
    ref
  ) => (
    <div ref={ref} className={cn(cardVariants({ interactive }), className)} {...props}>
      {imageSrc && (
        <div className="aspect-video w-full shrink-0 overflow-hidden">
          <img className="block h-full w-full object-cover" src={imageSrc} alt={imageAlt} />
        </div>
      )}
      <div className="flex flex-1 flex-col gap-xs p-l">
        {title && <h3 className="m-0 text-base font-semibold leading-6 text-content-primary">{title}</h3>}
        {description && <p className="m-0 text-sm leading-5 text-content-secondary">{description}</p>}
        {children}
      </div>
      {actions && (
        <div className="flex items-center gap-s border-t border-border-default px-l py-m">
          {actions}
        </div>
      )}
    </div>
  )
);

Card.displayName = 'Card';

export type { CardProps } from './Card.types';
