import { forwardRef, type ElementRef } from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import type { TabProps } from './Tab.types';

export const tabListVariants = cva('flex items-end gap-0 border-b border-border-default font-sans', {
  variants: {
    variant: {
      default: '',
      brand: '',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export const tabTriggerVariants = cva(
  [
    'relative inline-flex items-center gap-xs whitespace-nowrap rounded-t-xs px-xl py-m text-sm font-medium',
    'text-content-tertiary transition-colors',
    'hover:bg-bg-hover hover:text-content-primary',
    'disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2',
    "after:absolute after:inset-x-0 after:-bottom-px after:h-m after:rounded-t-xs after:bg-transparent after:content-['']",
    'data-[state=active]:font-semibold data-[state=active]:text-content-primary',
    'data-[state=active]:after:bg-border-strong',
  ].join(' '),
  {
    variants: {
      variant: {
        default: '',
        brand: 'data-[state=active]:text-brand-text-default data-[state=active]:after:bg-brand-border-default',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

/**
 * Tab molecule — a tab list built on Radix Tabs for real roving-tabindex
 * keyboard navigation (arrow keys, Home/End). This component renders only
 * the tablist itself (no content panels); pair each tab's `key` with your
 * own content elsewhere.
 *
 * Tokens: `border-border-default`/`border-strong` (divider + default indicator),
 * `brand-border-default`/`brand-text-default` (brand indicator + active text),
 * `content-tertiary`/`content-primary` (inactive/active text), `bg-hover` (hover),
 * `focus-ring`.
 */
export const Tab = forwardRef<ElementRef<typeof TabsPrimitive.Root>, TabProps>(
  (
    {
      items,
      variant = 'default',
      activeKey: controlledKey,
      defaultActiveKey,
      onChange,
      className,
      'aria-label': ariaLabel = 'Tab navigation',
      ...rest
    },
    ref
  ) => {
    const isControlled = controlledKey !== undefined;

    return (
      <TabsPrimitive.Root
        ref={ref}
        value={isControlled ? controlledKey : undefined}
        defaultValue={!isControlled ? defaultActiveKey ?? items[0]?.key : undefined}
        onValueChange={onChange}
        className={cn('font-sans', className)}
        {...rest}
      >
        <TabsPrimitive.List className={tabListVariants({ variant })} aria-label={ariaLabel}>
          {items.map((item) => (
            <TabsPrimitive.Trigger
              key={item.key}
              value={item.key}
              disabled={item.disabled}
              className={tabTriggerVariants({ variant })}
            >
              {item.icon && (
                <span className="inline-flex text-base" aria-hidden="true">
                  {item.icon}
                </span>
              )}
              {item.label}
            </TabsPrimitive.Trigger>
          ))}
        </TabsPrimitive.List>
      </TabsPrimitive.Root>
    );
  }
);

Tab.displayName = 'Tab';

export type { TabProps, TabItem, TabVariant } from './Tab.types';
