import { forwardRef, useCallback, useState, type ChangeEvent } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { cn } from '../../lib/utils';
import { SearchBar } from '../SearchBar';
import { IconButton } from '../IconButton';
import { MenuIcon, CloseIcon, UserIcon, CartIcon } from '../../lib/icons';
import type { SiteHeaderProps } from './SiteHeader.types';

/**
 * SiteHeader organism — logo, primary nav, search, and account/cart actions.
 *
 * On small screens the nav collapses into a drawer built on Radix Dialog,
 * which supplies the focus trap, Escape-to-close, and scrim behaviour the
 * accessibility rules require for overlays.
 */
export const SiteHeader = forwardRef<HTMLElement, SiteHeaderProps>(
  (
    { logo, homeHref = '/', links, onSearch, cartCount, onCartClick, onAccountClick, className, ...props },
    ref
  ) => {
    const [query, setQuery] = useState('');
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleQueryChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
    }, []);

    const handleQueryClear = useCallback(() => {
      setQuery('');
    }, []);

    return (
      <header
        ref={ref}
        className={cn('w-full border-b border-border-default bg-bg-surface font-sans', className)}
        {...props}
      >
        <div className="flex items-center gap-l px-l py-m">
          {/* Mobile drawer */}
          <Dialog.Root open={drawerOpen} onOpenChange={setDrawerOpen}>
            <Dialog.Trigger asChild>
              <IconButton aria-label="Open menu" icon={<MenuIcon />} variant="ghost" className="md:hidden" />
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 bg-overlay" />
              <Dialog.Content
                className={cn(
                  'fixed inset-y-0 left-0 flex w-72 flex-col gap-l bg-bg-surface p-l font-sans shadow-lg',
                  'focus-visible:outline-none'
                )}
              >
                <div className="flex items-center justify-between">
                  <Dialog.Title className="m-0 text-base font-semibold text-content-primary">Menu</Dialog.Title>
                  <Dialog.Close asChild>
                    <IconButton aria-label="Close menu" icon={<CloseIcon />} variant="ghost" />
                  </Dialog.Close>
                </div>
                <Dialog.Description className="sr-only">Site navigation</Dialog.Description>
                <nav aria-label="Main">
                  <ul className="m-0 flex list-none flex-col gap-2xs p-0">
                    {links.map((link) => (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          className={cn(
                            'block rounded-md px-m py-s text-sm font-medium text-content-primary no-underline',
                            'hover:bg-bg-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring'
                          )}
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>

          <a
            href={homeHref}
            className="shrink-0 text-lg font-bold text-content-primary no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2"
          >
            {logo}
          </a>

          {/* Desktop nav */}
          <nav aria-label="Main" className="hidden md:block">
            <ul className="m-0 flex list-none items-center gap-2xs p-0">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={cn(
                      'rounded-md px-m py-s text-sm font-medium text-content-secondary no-underline transition-colors',
                      'hover:bg-bg-hover hover:text-content-primary',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring'
                    )}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="ml-auto hidden w-full max-w-[320px] sm:block">
            <SearchBar
              value={query}
              onChange={handleQueryChange}
              onSearch={onSearch}
              onClear={handleQueryClear}
              aria-label="Search products"
            />
          </div>

          <div className="flex shrink-0 items-center gap-2xs">
            <IconButton aria-label="Account" icon={<UserIcon />} variant="ghost" onClick={onAccountClick} />
            <span className="relative inline-flex">
              <IconButton
                aria-label={cartCount ? `Cart, ${cartCount} items` : 'Cart'}
                icon={<CartIcon />}
                variant="ghost"
                onClick={onCartClick}
              />
              {cartCount ? (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-0.5 -top-0.5 inline-flex min-w-5 items-center justify-center rounded-pill bg-brand-bg-selected px-2xs text-xs font-semibold leading-5 text-brand-text-on-brand"
                >
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              ) : null}
            </span>
          </div>
        </div>
      </header>
    );
  }
);

SiteHeader.displayName = 'SiteHeader';

export type { SiteHeaderProps, SiteHeaderLink } from './SiteHeader.types';
