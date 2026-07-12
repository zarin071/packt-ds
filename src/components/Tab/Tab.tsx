import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import type { TabProps } from './Tab.types';

/**
 * Tabs primitives, built on Radix Tabs for real roving-tabindex keyboard
 * navigation (arrow keys, Home/End) and correct ARIA wiring. Compose them:
 *
 * ```tsx
 * <Tabs defaultValue="overview">
 *   <TabList aria-label="Course sections">
 *     <Tab value="overview">Overview</Tab>
 *     <Tab value="curriculum" icon={<FileIcon />}>Curriculum</Tab>
 *   </TabList>
 *   <TabPanel value="overview">…</TabPanel>
 *   <TabPanel value="curriculum">…</TabPanel>
 * </Tabs>
 * ```
 */
export const Tabs = TabsPrimitive.Root;

export const tabListVariants = cva('inline-flex items-end gap-0 border-b border-border-default font-sans');

export const TabList = forwardRef<
  ElementRef<typeof TabsPrimitive.List>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List ref={ref} className={cn(tabListVariants(), className)} {...props} />
));
TabList.displayName = 'TabList';

export const tabTriggerVariants = cva(
  [
    'relative inline-flex items-center gap-xs whitespace-nowrap rounded-t-xs px-xl py-m text-sm font-medium',
    'text-content-tertiary transition-colors',
    'hover:bg-bg-hover hover:text-content-primary',
    'disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2',
    "after:absolute after:inset-x-0 after:-bottom-px after:h-[2px] after:rounded-t-xs after:bg-transparent after:content-['']",
    // Active state uses Brand tokens.
    'data-[state=active]:font-semibold data-[state=active]:text-brand-text-default',
    'data-[state=active]:after:bg-brand-border-default',
  ].join(' ')
);

/**
 * A single tab — a styled Radix `Tabs.Trigger`. Must be rendered inside a
 * `TabList` within a `Tabs` root. Its `value` links it to a `TabPanel`.
 */
export const Tab = forwardRef<ElementRef<typeof TabsPrimitive.Trigger>, TabProps>(
  ({ className, icon, children, ...props }, ref) => (
    <TabsPrimitive.Trigger ref={ref} className={cn(tabTriggerVariants(), className)} {...props}>
      {icon && (
        <span className="inline-flex text-base [&>svg]:size-4" aria-hidden="true">
          {icon}
        </span>
      )}
      {children}
    </TabsPrimitive.Trigger>
  )
);
Tab.displayName = 'Tab';

export const TabPanel = forwardRef<
  ElementRef<typeof TabsPrimitive.Content>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'pt-l font-sans text-content-primary',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2',
      className
    )}
    {...props}
  />
));
TabPanel.displayName = 'TabPanel';

export type { TabProps } from './Tab.types';
