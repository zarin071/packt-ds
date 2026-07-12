import { forwardRef } from 'react';
import { cn } from '../../lib/utils';
import { Button } from '../Button';
import type { AuthCTAProps } from './AuthCTA.types';

/**
 * AuthCTA organism — a brand-tinted band prompting sign-up, with a secondary
 * sign-in action for returning users.
 */
export const AuthCTA = forwardRef<HTMLElement, AuthCTAProps>(
  (
    {
      title = 'Read anywhere. Learn everywhere.',
      description = 'Create a free account to sync your library, track progress, and get personal recommendations.',
      signUpLabel = 'Create free account',
      signInLabel = 'Sign in',
      onSignUp,
      onSignIn,
      className,
      ...props
    },
    ref
  ) => (
    <section
      ref={ref}
      aria-label={title}
      className={cn(
        'flex w-full flex-col items-start gap-l rounded-lg border border-brand-border-default bg-brand-bg-default p-2xl font-sans md:flex-row md:items-center',
        className
      )}
      {...props}
    >
      <div className="flex flex-1 flex-col gap-xs">
        <h2 className="m-0 text-xl font-bold text-content-primary">{title}</h2>
        <p className="m-0 max-w-[36rem] text-sm text-content-secondary">{description}</p>
      </div>
      <div className="flex shrink-0 flex-wrap items-center gap-s">
        <Button variant="primary" onClick={onSignUp}>
          {signUpLabel}
        </Button>
        <Button variant="ghost" onClick={onSignIn}>
          {signInLabel}
        </Button>
      </div>
    </section>
  )
);

AuthCTA.displayName = 'AuthCTA';

export type { AuthCTAProps } from './AuthCTA.types';
