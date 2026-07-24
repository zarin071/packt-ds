import type { HTMLAttributes } from 'react';
import type { FormatType } from '../../molecules/FormatBadge';
import type { PriceOption } from '../../molecules/PriceBlock';

export interface ProductCardProps extends HTMLAttributes<HTMLElement> {
  /** Cover image URL. Rendered at a fixed 3:4 aspect ratio, lazy-loaded. */
  coverSrc: string;
  /** Alt text for the cover image. */
  coverAlt: string;
  /** Product title. Clamped to two lines. */
  title: string;
  /** Meta row, e.g. "By Jane Doe · Nov 2025". */
  meta?: string;
  /** 0–5 star rating (halves supported). */
  rating?: number;
  /** Review count shown next to the rating. */
  ratingCount?: number;
  /** Available formats, rendered as a FormatBadge row. */
  formats?: FormatType[];
  /** Purchasable options passed to PriceBlock. */
  priceOptions: PriceOption[];
  /** Controlled selected format (PriceBlock). */
  selectedFormat?: string;
  onSelectFormat?: (format: string) => void;
  /** ISO 4217 currency for prices. Defaults to USD. */
  currency?: string;
  /**
   * Add-to-cart handler. If it returns a promise, the button shows its
   * loading state until the promise settles.
   */
  onAddToCart?: () => void | Promise<void>;
  /** Button label. Defaults to "Add to cart". */
  addToCartLabel?: string;
}
