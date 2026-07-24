import { forwardRef, useState } from 'react';
import { cn } from '../../../lib/utils';
import { Rating } from '../../atoms/Rating';
import { FormatBadge } from '../../molecules/FormatBadge';
import { PriceBlock } from '../../molecules/PriceBlock';
import { Button } from '../../atoms/Button';
import type { ProductCardProps } from './ProductCard.types';

/**
 * ProductCard organism — a full storefront product card composing the
 * Rating, FormatBadge, PriceBlock, and Button building blocks.
 *
 * - Cover renders at a fixed 3:4 aspect ratio and lazy-loads.
 * - Title is clamped to two lines so card heights stay aligned in grids.
 * - "Add to cart" shows the Button's loading state while an async
 *   `onAddToCart` is in flight (and is disabled meanwhile via `loading`).
 */
export const ProductCard = forwardRef<HTMLElement, ProductCardProps>(
  (
    {
      coverSrc,
      coverAlt,
      title,
      meta,
      rating,
      ratingCount,
      formats,
      priceOptions,
      selectedFormat,
      onSelectFormat,
      currency = 'USD',
      onAddToCart,
      addToCartLabel = 'Add to cart',
      className,
      ...props
    },
    ref
  ) => {
    const [adding, setAdding] = useState(false);

    const handleAddToCart = async () => {
      if (!onAddToCart || adding) return;
      setAdding(true);
      try {
        await onAddToCart();
      } finally {
        setAdding(false);
      }
    };

    return (
      <article
        ref={ref}
        className={cn(
          'flex w-full flex-col overflow-hidden rounded-lg border border-border-default bg-bg-surface font-sans',
          className
        )}
        {...props}
      >
        <div className="p-l pb-0">
          <div className="aspect-[4/3] w-full overflow-hidden rounded-md bg-bg-page">
            <img src={coverSrc} alt={coverAlt} loading="lazy" className="size-full object-cover" />
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-s p-l pt-m">
          <h3 className="line-clamp-2 text-base font-semibold leading-6 text-content-primary" title={title}>
            {title}
          </h3>

          {meta && <p className="m-0 text-xs text-content-tertiary">{meta}</p>}

          {rating != null && <Rating value={rating} count={ratingCount} size="sm" />}

          {formats && formats.length > 0 && (
            <div className="flex flex-wrap gap-xs">
              {formats.map((format) => (
                <FormatBadge key={format} format={format} />
              ))}
            </div>
          )}

          <PriceBlock
            items={priceOptions}
            selectedFormat={selectedFormat}
            onSelect={onSelectFormat}
            currency={currency}
            label={`Choose a format for ${title}`}
          />

          <Button
            variant="primary"
            className="mt-auto w-full"
            loading={adding}
            onClick={handleAddToCart}
          >
            {addToCartLabel}
          </Button>
        </div>
      </article>
    );
  }
);

ProductCard.displayName = 'ProductCard';

export type { ProductCardProps } from './ProductCard.types';
