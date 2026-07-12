import { forwardRef } from 'react';
import { cn } from '../../lib/utils';
import { Button } from '../Button';
import type { FeatureSpotlightProps } from './FeatureSpotlight.types';

/**
 * FeatureSpotlight organism — a promotional band for hub content. The root
 * carries `data-hub="packt"` so it (and anything themed off the attribute)
 * picks up the Hub-Packt blue token set; all colours below use `hub-*`
 * utilities rather than brand orange.
 */
export const FeatureSpotlight = forwardRef<HTMLElement, FeatureSpotlightProps>(
  ({ eyebrow, title, description, ctaLabel, ctaHref, media, hub = 'packt', className, ...props }, ref) => (
    <section
      ref={ref}
      data-hub={hub}
      aria-label={title}
      className={cn(
        'flex w-full flex-col gap-2xl overflow-hidden rounded-l border border-hub-border-default bg-hub-tag-bg p-2xl font-sans md:flex-row md:items-center',
        className
      )}
      {...props}
    >
      <div className="flex flex-1 flex-col items-start gap-m">
        {eyebrow && (
          <p className="m-0 text-xs font-semibold uppercase tracking-wide text-hub-text-default">{eyebrow}</p>
        )}
        <h2 className="m-0 text-2xl font-bold text-content-primary">{title}</h2>
        {description && <p className="m-0 max-w-[36rem] text-sm text-content-secondary">{description}</p>}
        <Button
          asChild
          variant="primary"
          className="border-transparent bg-hub-bg-selected text-hub-text-on-hub hover:bg-hub-bg-selected"
        >
          <a href={ctaHref}>{ctaLabel}</a>
        </Button>
      </div>
      {media && <div className="shrink-0 md:max-w-[40%]">{media}</div>}
    </section>
  )
);

FeatureSpotlight.displayName = 'FeatureSpotlight';

export type { FeatureSpotlightProps } from './FeatureSpotlight.types';
