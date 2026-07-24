import { forwardRef } from 'react';
import type { MaterialIconProps } from './MaterialIcon.types';

const SIZE_PX: Record<string, number> = { sm: 16, md: 20, lg: 24 };

// Covers both the fontsource bundle ('…Variable') and the Google Fonts CDN ('…').
const FONT_FAMILY =
  "'Material Symbols Outlined Variable', 'Material Symbols Outlined', sans-serif";

/**
 * MaterialIcon — renders a Google Material Symbols Outlined icon.
 *
 * The font is bundled locally when using Storybook (via @fontsource-variable).
 * In your own app, import the font once near the root:
 *
 *   import '@zarin071/packt-ds/material-icons.css';   // Google CDN
 *
 * Or install and import @fontsource-variable/material-symbols-outlined yourself.
 *
 * Icon names: https://fonts.google.com/icons
 */
export const MaterialIcon = forwardRef<HTMLSpanElement, MaterialIconProps>(
  (
    {
      name,
      size = 'md',
      fill = false,
      weight = 400,
      grade = 0,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const px = SIZE_PX[size];
    return (
      <span
        ref={ref}
        className={className}
        aria-hidden="true"
        style={{
          fontFamily: FONT_FAMILY,
          fontSize: px,
          fontWeight: weight,
          fontVariationSettings: `'FILL' ${fill ? 1 : 0}, 'wght' ${weight}, 'GRAD' ${grade}, 'opsz' ${px}`,
          lineHeight: 1,
          display: 'inline-block',
          userSelect: 'none' as const,
          verticalAlign: 'middle',
          flexShrink: 0,
          textTransform: 'none' as const,
          letterSpacing: 'normal',
          wordWrap: 'normal' as const,
          direction: 'ltr' as const,
          WebkitFontSmoothing: 'antialiased',
          ...style,
        }}
        {...props}
      >
        {name}
      </span>
    );
  }
);

MaterialIcon.displayName = 'MaterialIcon';

export type { MaterialIconProps, MaterialIconSize } from './MaterialIcon.types';
