import { forwardRef, useCallback, useRef, useState } from 'react';
import { cn } from '../../lib/utils';
import { IconButton } from '../IconButton';
import { PaginationDots } from '../PaginationDots';
import { ChevronLeftIcon, ChevronRightIcon } from '../../lib/icons';
import type { HeroCarouselProps } from './HeroCarousel.types';

/**
 * HeroCarousel organism — full-width promo slides with scroll-snap, arrow
 * IconButtons, and PaginationDots. `aria-roledescription="carousel"` on the
 * region; each slide is a labelled `group`. No autoplay — slides only move
 * on user action, so there's nothing to pause.
 */
export const HeroCarousel = forwardRef<HTMLElement, HeroCarouselProps>(
  ({ slides, label = 'Featured', className, ...props }, ref) => {
    const trackRef = useRef<HTMLDivElement>(null);
    const [active, setActive] = useState(0);

    const goTo = useCallback((index: number) => {
      const clamped = Math.max(0, Math.min(slides.length - 1, index));
      setActive(clamped);
      const track = trackRef.current;
      track?.scrollTo?.({ left: clamped * track.clientWidth, behavior: 'smooth' });
    }, [slides.length]);

    const rafRef = useRef<number>(0);
    const handleScroll = useCallback(() => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const track = trackRef.current;
        if (!track || track.clientWidth === 0) return;
        setActive(Math.round(track.scrollLeft / track.clientWidth));
      });
    }, []);

    return (
      <section
        ref={ref}
        aria-roledescription="carousel"
        aria-label={label}
        className={cn('relative w-full font-sans', className)}
        {...props}
      >
        <div
          ref={trackRef}
          onScroll={handleScroll}
          className="flex snap-x snap-mandatory overflow-x-auto rounded-lg"
        >
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${slides.length}`}
              className="w-full shrink-0 snap-start"
            >
              {slide.content}
            </div>
          ))}
        </div>

        <div className="mt-s flex items-center justify-center gap-l">
          <IconButton
            aria-label="Previous slide"
            icon={<ChevronLeftIcon />}
            variant="ghost"
            disabled={active === 0}
            onClick={() => goTo(active - 1)}
          />
          <PaginationDots count={slides.length} activeIndex={active} onSelect={goTo} label={`${label} slides`} />
          <IconButton
            aria-label="Next slide"
            icon={<ChevronRightIcon />}
            variant="ghost"
            disabled={active === slides.length - 1}
            onClick={() => goTo(active + 1)}
          />
        </div>
      </section>
    );
  }
);

HeroCarousel.displayName = 'HeroCarousel';

export type { HeroCarouselProps, HeroSlide } from './HeroCarousel.types';
