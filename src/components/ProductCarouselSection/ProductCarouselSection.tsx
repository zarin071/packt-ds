import { forwardRef, useRef } from 'react';
import { cn } from '../../lib/utils';
import { IconButton } from '../IconButton';
import { ChevronLeftIcon, ChevronRightIcon } from '../../lib/icons';
import type { ProductCarouselSectionProps } from './ProductCarouselSection.types';

/**
 * ProductCarouselSection organism — a heading + horizontally scrolling row
 * of slides (typically ProductCards).
 *
 * - CSS scroll-snap does the positioning; the arrows (IconButton) scroll a
 *   page at a time.
 * - The track is keyboard navigable: it's a single tab stop and native
 *   horizontal arrow-key scrolling applies while focused; interactive
 *   content inside slides remains reachable with Tab.
 * - `aria-roledescription="carousel"` on the region, and each slide is a
 *   `group` with `aria-roledescription="slide"` and an "N of M" label.
 */
export const ProductCarouselSection = forwardRef<HTMLElement, ProductCarouselSectionProps>(
  ({ title, items, className, ...props }, ref) => {
    const trackRef = useRef<HTMLDivElement>(null);

    const scrollByPage = (direction: 1 | -1) => {
      const track = trackRef.current;
      if (!track) return;
      track.scrollBy?.({ left: direction * track.clientWidth * 0.9, behavior: 'smooth' });
    };

    return (
      <section
        ref={ref}
        aria-roledescription="carousel"
        aria-label={title}
        className={cn('flex w-full flex-col gap-l font-sans', className)}
        {...props}
      >
        <div className="flex items-center gap-s">
          <h2 className="m-0 flex-1 text-xl font-semibold text-content-primary">{title}</h2>
          <IconButton
            aria-label="Previous items"
            icon={<ChevronLeftIcon />}
            variant="secondary"
            onClick={() => scrollByPage(-1)}
          />
          <IconButton
            aria-label="Next items"
            icon={<ChevronRightIcon />}
            variant="secondary"
            onClick={() => scrollByPage(1)}
          />
        </div>

        {/* APG carousel pattern: plain divs — a list would be broken by the
            slide group roles, so the track itself is a labelled group. */}
        <div
          ref={trackRef}
          role="group"
          tabIndex={0}
          aria-label={`${title} items`}
          className={cn(
            'flex snap-x snap-mandatory gap-l overflow-x-auto pb-s',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2'
          )}
        >
          {items.map((item, index) => (
            <div
              key={index}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${items.length}`}
              className="w-64 shrink-0 snap-start"
            >
              {item}
            </div>
          ))}
        </div>
      </section>
    );
  }
);

ProductCarouselSection.displayName = 'ProductCarouselSection';

export type { ProductCarouselSectionProps } from './ProductCarouselSection.types';
