import { forwardRef } from 'react';
import type { MaterialIconProps } from './MaterialIcon.types';

const SIZE_PX: Record<string, number> = { sm: 16, md: 20, lg: 24 };

/**
 * MaterialIcon — renders a Google Material Symbols Outlined icon.
 *
 * Requires the Material Symbols font to be loaded in the document.
 * Add this link in your app's <head>:
 *
 *   <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@16..48,100..700,0..1,-50..200&display=block" rel="stylesheet" />
 *
 * Or import '@zarin071/packt-ds/material-icons.css' (loads from Google CDN).
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
        className={`material-symbols-outlined${className ? ` ${className}` : ''}`}
        aria-hidden="true"
        style={{
          fontSize: px,
          fontVariationSettings: `'FILL' ${fill ? 1 : 0}, 'wght' ${weight}, 'GRAD' ${grade}, 'opsz' ${px}`,
          lineHeight: 1,
          display: 'inline-block',
          userSelect: 'none',
          verticalAlign: 'middle',
          flexShrink: 0,
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
