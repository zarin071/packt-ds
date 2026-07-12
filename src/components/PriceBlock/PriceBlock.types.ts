import type { HTMLAttributes, ReactNode } from 'react';

export interface PriceOption {
  /** Unique format identifier (also the radio value), e.g. "ebook". */
  format: string;
  /** Visible label. Defaults to `format`. */
  label?: string;
  /** Optional leading icon. Always aria-hidden. */
  icon?: ReactNode;
  price: number;
  /** Previous price — rendered struck through by the Price atom. */
  originalPrice?: number;
}

export interface PriceBlockProps extends Omit<HTMLAttributes<HTMLFieldSetElement>, 'onSelect'> {
  /** The purchasable format options. */
  items: PriceOption[];
  /** The currently selected format value (controlled). */
  selectedFormat?: string;
  /** Called with the chosen format value. */
  onSelect?: (format: string) => void;
  /** ISO 4217 currency code passed to the Price atom. Defaults to USD. */
  currency?: string;
  /** Accessible label for the radio group. */
  label?: string;
}
