import { forwardRef, useRef, type KeyboardEvent } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../../lib/utils';
import { Input } from '../../atoms/Input';
import { SearchIcon, CloseIcon, SpinnerIcon } from '../../../lib/icons';
import type { SearchBarProps } from './SearchBar.types';

export const searchBarVariants = cva(
  [
    'flex w-full items-center gap-xs rounded-pill border bg-bg-surface px-m',
    'transition-colors',
    'focus-within:ring-2 focus-within:ring-focus-ring focus-within:ring-offset-2',
  ].join(' '),
  {
    variants: {
      disabled: {
        true: 'cursor-not-allowed border-border-disabled bg-bg-disabled',
        false: 'border-border-default',
      },
    },
    defaultVariants: {
      disabled: false,
    },
  }
);

/**
 * SearchBar molecule — composes the Input atom with a leading search icon
 * (or spinner while `loading`) and a trailing clear button.
 */
export const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  (
    {
      className,
      value,
      onChange,
      onSearch,
      onClear,
      loading = false,
      disabled = false,
      placeholder = 'Search…',
      onKeyDown,
      ...rest
    },
    ref
  ) => {
    const innerRef = useRef<HTMLInputElement>(null);
    const hasValue = Boolean(value);

    const handleClear = () => {
      onClear?.();
      innerRef.current?.focus();
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      onKeyDown?.(e);
      if (e.key === 'Enter') {
        onSearch?.(String(value ?? ''));
      }
    };

    return (
      <div className={cn(searchBarVariants({ disabled }), className)}>
        <span className="flex shrink-0 items-center text-content-secondary" aria-hidden="true">
          {loading ? (
            <SpinnerIcon className="size-4 animate-spin" />
          ) : (
            <SearchIcon className="size-4" />
          )}
        </span>
        <Input
          ref={(node) => {
            innerRef.current = node;
            if (typeof ref === 'function') ref(node);
            else if (ref) ref.current = node;
          }}
          type="search"
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder={placeholder}
          aria-label={rest['aria-label'] ?? 'Search'}
          className={cn(
            'h-auto w-full border-0 bg-transparent p-0 shadow-none',
            'focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0',
            '[&::-webkit-search-cancel-button]:hidden'
          )}
          {...rest}
        />
        {hasValue && !loading && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Clear search"
            className={cn(
              'flex shrink-0 items-center justify-center rounded-circle text-content-secondary transition-colors',
              'hover:text-content-primary',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2'
            )}
          >
            <CloseIcon className="size-4" aria-hidden="true" />
          </button>
        )}
      </div>
    );
  }
);

SearchBar.displayName = 'SearchBar';

export type { SearchBarProps } from './SearchBar.types';
