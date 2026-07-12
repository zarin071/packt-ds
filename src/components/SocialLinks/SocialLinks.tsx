import { forwardRef, type ReactNode } from 'react';
import { cn } from '../../lib/utils';
import { Icon } from '../Icon';
import { GitHubIcon, TwitterIcon, LinkedInIcon, YouTubeIcon } from '../icons';
import type { SocialLinksProps, SocialPlatform } from './SocialLinks.types';

const PLATFORMS: Record<SocialPlatform, { icon: ReactNode; name: string }> = {
  github: { icon: <GitHubIcon />, name: 'GitHub' },
  twitter: { icon: <TwitterIcon />, name: 'X (Twitter)' },
  linkedin: { icon: <LinkedInIcon />, name: 'LinkedIn' },
  youtube: { icon: <YouTubeIcon />, name: 'YouTube' },
};

/**
 * SocialLinks molecule — a row of external social links. Each opens in a new
 * tab with `rel="noopener noreferrer"`, and its accessible name includes a
 * visually-hidden "(opens in new tab)" so screen-reader users are warned the
 * link leaves the page. The icon is decorative (aria-hidden via the Icon atom).
 */
export const SocialLinks = forwardRef<HTMLUListElement, SocialLinksProps>(
  ({ links, label = 'Social links', className, ...props }, ref) => (
    <ul
      ref={ref}
      aria-label={label}
      className={cn('flex list-none items-center gap-xs p-0 font-sans', className)}
      {...props}
    >
      {links.map((link) => {
        const meta = PLATFORMS[link.platform];
        const name = link.label ?? meta.name;
        return (
          <li key={link.platform}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'inline-flex size-11 items-center justify-center rounded-md text-content-secondary transition-colors',
                'hover:bg-bg-hover hover:text-brand-text-default',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2'
              )}
            >
              <Icon size="md">{meta.icon}</Icon>
              <span className="sr-only">{name} (opens in new tab)</span>
            </a>
          </li>
        );
      })}
    </ul>
  )
);

SocialLinks.displayName = 'SocialLinks';

export type { SocialLinksProps, SocialLink, SocialPlatform } from './SocialLinks.types';
