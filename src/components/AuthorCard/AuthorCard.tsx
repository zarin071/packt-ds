import { forwardRef } from 'react';
import { cn } from '../../lib/utils';
import { Avatar } from '../Avatar';
import { SocialLinks } from '../SocialLinks';
import type { AuthorCardProps } from './AuthorCard.types';

/**
 * AuthorCard organism — Avatar + name/role/bio + SocialLinks.
 */
export const AuthorCard = forwardRef<HTMLElement, AuthorCardProps>(
  ({ name, role, bio, avatarSrc, initials, links, className, ...props }, ref) => (
    <article
      ref={ref}
      className={cn(
        'flex w-full flex-col gap-m rounded-l border border-border-default bg-bg-surface p-l font-sans',
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-m">
        <Avatar src={avatarSrc} initials={initials} alt={name} size="lg" />
        <div className="min-w-0">
          <h3 className="m-0 truncate text-base font-semibold text-content-primary">{name}</h3>
          {role && <p className="m-0 truncate text-sm text-content-tertiary">{role}</p>}
        </div>
      </div>
      {bio && <p className="m-0 line-clamp-3 text-sm leading-5 text-content-secondary">{bio}</p>}
      {links && links.length > 0 && (
        <SocialLinks links={links} label={`${name} on social media`} className="-ml-2xs" />
      )}
    </article>
  )
);

AuthorCard.displayName = 'AuthorCard';

export type { AuthorCardProps } from './AuthorCard.types';
