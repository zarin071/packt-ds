import { forwardRef, useId, type ElementRef } from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { ChevronDownIcon, CheckIcon } from '../icons';
import type { SelectProps } from './Select.types';

export const selectTriggerVariants = cva(
  [
    'flex w-full items-center justify-between gap-xs rounded-sm border bg-bg-surface text-content-primary transition-colors',
    'data-[placeholder]:text-content-tertiary',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:bg-bg-disabled disabled:text-content-disabled',
    '[&_svg]:shrink-0',
  ].join(' '),
  {
    variants: {
      size: {
        small: 'h-8 px-m text-sm [&_svg]:size-4',
        medium: 'h-10 px-l text-sm [&_svg]:size-4',
        large: 'h-12 px-xl text-base [&_svg]:size-5',
      },
      error: {
        true: 'border-status-border-error focus-visible:ring-status-border-error',
        false: 'border-border-default focus-visible:ring-focus-ring',
      },
    },
    defaultVariants: {
      size: 'medium',
      error: false,
    },
  }
);

/**
 * Select molecule — built on Radix Select for correct listbox keyboard nav,
 * focus management, and portal-based positioning.
 *
 * Tokens: `border-default`/`border-status-border-error` (border),
 * `bg-bg-surface`/`bg-bg-disabled` (field), `content-primary`/`content-tertiary`
 * (text/placeholder), `radius-s` (field + content), `focus-ring`.
 */
export const Select = forwardRef<ElementRef<typeof SelectPrimitive.Trigger>, SelectProps>(
  (
    {
      label,
      helperText,
      error,
      size = 'medium',
      placeholder,
      options = [],
      disabled = false,
      required = false,
      className,
      triggerClassName,
      id,
      name,
      value,
      defaultValue,
      onValueChange,
      children,
      ...rest
    },
    ref
  ) => {
    const reactId = useId();
    const selectId = id ?? reactId;
    const helperId = `${selectId}-help`;
    const hasError = Boolean(error);

    return (
      <div className={cn('flex flex-col gap-xs font-sans', className)}>
        {label && (
          <label className="text-sm font-medium text-content-secondary" htmlFor={selectId}>
            {label}
            {required && (
              <span className="ml-2xs text-status-text-error" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}
        <SelectPrimitive.Root
          value={value}
          defaultValue={defaultValue}
          onValueChange={onValueChange}
          disabled={disabled}
          required={required}
          name={name}
          {...rest}
        >
          <SelectPrimitive.Trigger
            ref={ref}
            id={selectId}
            className={cn(selectTriggerVariants({ size, error: hasError }), triggerClassName)}
            aria-invalid={hasError || undefined}
            aria-describedby={helperText || error ? helperId : undefined}
          >
            <SelectPrimitive.Value placeholder={placeholder} />
            <SelectPrimitive.Icon asChild>
              <ChevronDownIcon aria-hidden="true" className="text-content-secondary" />
            </SelectPrimitive.Icon>
          </SelectPrimitive.Trigger>
          <SelectPrimitive.Portal>
            <SelectPrimitive.Content
              className="z-50 overflow-hidden rounded-sm border border-border-default bg-bg-surface text-content-primary"
              position="popper"
              sideOffset={4}
            >
              <SelectPrimitive.Viewport className="p-2xs">
                {options.map((opt) => (
                  <SelectPrimitive.Item
                    key={opt.value}
                    value={opt.value}
                    disabled={opt.disabled}
                    className={cn(
                      'relative flex cursor-pointer select-none items-center rounded-xs py-xs pl-l pr-s text-sm outline-none',
                      'data-[highlighted]:bg-bg-hover data-[highlighted]:text-content-primary',
                      'data-[disabled]:pointer-events-none data-[disabled]:text-content-disabled'
                    )}
                  >
                    <span className="absolute left-xs inline-flex items-center">
                      <SelectPrimitive.ItemIndicator>
                        <CheckIcon aria-hidden="true" className="size-4 text-brand-icon-default" />
                      </SelectPrimitive.ItemIndicator>
                    </span>
                    <SelectPrimitive.ItemText>{opt.label}</SelectPrimitive.ItemText>
                  </SelectPrimitive.Item>
                ))}
                {children}
              </SelectPrimitive.Viewport>
            </SelectPrimitive.Content>
          </SelectPrimitive.Portal>
        </SelectPrimitive.Root>
        {(error || helperText) && (
          <span
            id={helperId}
            className={cn('text-xs', hasError ? 'text-status-text-error' : 'text-content-tertiary')}
          >
            {error || helperText}
          </span>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export type { SelectProps, SelectOption, SelectSize } from './Select.types';
