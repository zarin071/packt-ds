import { forwardRef } from 'react';
import { cn } from '../../../lib/utils';
import { SocialLinks } from '../../molecules/SocialLinks';
import type { SiteFooterProps } from './SiteFooter.types';

/**
 * SiteFooter organism — link columns (each its own labelled nav), SocialLinks,
 * and a copyright line, inside a `contentinfo` landmark.
 */
export const SiteFooter = forwardRef<HTMLElement, SiteFooterProps>(
  ({ columns, socialLinks, copyright, className, ...props }, ref) => (
    <footer
      ref={ref}
      className={cn('w-full border-t border-border-default bg-bg-page font-sans', className)}
      {...props}
    >
      <div className="grid grid-cols-2 gap-2xl p-2xl md:grid-cols-4">
        {columns.map((column) => (
          <nav key={column.heading} aria-label={column.heading}>
            <h3 className="m-0 mb-s text-sm font-semibold text-content-primary">{column.heading}</h3>
            <ul className="m-0 flex list-none flex-col gap-2xs p-0">
              {column.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={cn(
                      'text-sm text-content-tertiary no-underline transition-colors',
                      'hover:text-content-primary hover:underline',
                      'focus-visible:rounded-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring'
                    )}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="flex flex-col items-start gap-s border-t border-border-default px-2xl py-l sm:flex-row sm:items-center">
        <p className="m-0 flex-1 text-xs text-content-tertiary">
          {copyright ?? `© ${new Date().getFullYear()} Packt Publishing. All rights reserved.`}
        </p>
        {socialLinks && socialLinks.length > 0 && <SocialLinks links={socialLinks} label="Packt on social media" />}
      </div>
    </footer>
  )
);

SiteFooter.displayName = 'SiteFooter';

export type { SiteFooterProps, FooterColumn } from './SiteFooter.types';
