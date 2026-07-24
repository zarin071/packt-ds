import { forwardRef, type ElementRef } from 'react';
import { cn } from '../../../lib/utils';
import { Tabs, Tab, TabList, TabPanel } from '../../atoms/Tab';
import type { TabGroupProps } from './TabGroup.types';

/**
 * TabGroup molecule — a data-driven wrapper over the Radix Tabs primitives
 * (`Tabs` / `TabList` / `Tab` / `TabPanel`). Pass an `items` array and it wires
 * up the tablist and panels for you; Radix provides arrow-key / Home / End
 * navigation and the ARIA roles. The active tab uses Brand tokens.
 */
export const TabGroup = forwardRef<ElementRef<typeof Tabs>, TabGroupProps>(
  ({ items, label, defaultValue, className, ...props }, ref) => {
    const hasPanels = items.some((item) => item.content != null);

    return (
      <Tabs
        ref={ref}
        defaultValue={defaultValue ?? items[0]?.value}
        className={cn('font-sans', className)}
        {...props}
      >
        <TabList aria-label={label}>
          {items.map((item) => (
            <Tab key={item.value} value={item.value} icon={item.icon} disabled={item.disabled}>
              {item.label}
            </Tab>
          ))}
        </TabList>
        {hasPanels &&
          items.map((item) => (
            <TabPanel key={item.value} value={item.value}>
              {item.content}
            </TabPanel>
          ))}
      </Tabs>
    );
  }
);

TabGroup.displayName = 'TabGroup';

export type { TabGroupProps, TabGroupItem } from './TabGroup.types';
