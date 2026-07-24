import type { HTMLAttributes } from 'react';

export interface PriceProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  /** The current price. */
  amount: number;
  /** The previous price. When set (and higher than `amount`), it renders struck through with an accessible "was $X" label. */
  originalAmount?: number;
  /** ISO 4217 currency code used for formatting. Defaults to USD. */
  currency?: string;
  /** BCP 47 locale for number/currency formatting. Defaults to the runtime locale. */
  locale?: string;
}
