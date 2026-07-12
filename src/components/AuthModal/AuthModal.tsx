import { useMemo, useState, type FormEvent } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { cn } from '../../lib/utils';
import { FormField } from '../FormField';
import { Button } from '../Button';
import { IconButton } from '../IconButton';
import { Icon } from '../Icon';
import { CloseIcon, SuccessIcon, MinusIcon } from '../icons';
import type { AuthModalProps } from './AuthModal.types';

interface Requirement {
  id: string;
  label: string;
  test: (password: string) => boolean;
}

const REQUIREMENTS: Requirement[] = [
  { id: 'length', label: 'At least 8 characters', test: (pw) => pw.length >= 8 },
  { id: 'uppercase', label: 'One uppercase letter', test: (pw) => /[A-Z]/.test(pw) },
  { id: 'number', label: 'One number', test: (pw) => /\d/.test(pw) },
];

/**
 * AuthModal organism — a sign-up dialog built on Radix Dialog (focus trap,
 * Escape-to-close, scrim) composing FormField and the password-checklist
 * pattern: every requirement is shown with an **icon + text** — a filled
 * check when met, a minus when not — plus a visually-hidden "Met/Not met"
 * prefix, so state is never communicated by colour alone.
 */
export function AuthModal({
  open,
  onOpenChange,
  onSubmit,
  title = 'Create your account',
  submitLabel = 'Create account',
}: AuthModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const results = useMemo(
    () => REQUIREMENTS.map((req) => ({ ...req, met: req.test(password) })),
    [password]
  );
  const allMet = results.every((r) => r.met);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!allMet) return;
    onSubmit?.({ email, password });
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-overlay" />
        <Dialog.Content
          className={cn(
            'fixed left-1/2 top-1/2 w-[min(92vw,420px)] -translate-x-1/2 -translate-y-1/2',
            'flex flex-col gap-l rounded-lg border border-border-default bg-bg-surface p-2xl font-sans shadow-xl',
            'focus-visible:outline-none'
          )}
        >
          <div className="flex items-start justify-between gap-s">
            <Dialog.Title className="m-0 text-xl font-semibold text-content-primary">{title}</Dialog.Title>
            <Dialog.Close asChild>
              <IconButton aria-label="Close dialog" icon={<CloseIcon />} variant="ghost" />
            </Dialog.Close>
          </div>
          <Dialog.Description className="m-0 -mt-s text-sm text-content-secondary">
            Read anywhere. Track your learning. Sync your library.
          </Dialog.Description>

          <form className="flex flex-col gap-l" onSubmit={handleSubmit} noValidate>
            <FormField
              label="Email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="flex flex-col gap-s">
              <FormField
                label="Password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-describedby="auth-password-requirements"
              />
              <ul
                id="auth-password-requirements"
                aria-label="Password requirements"
                className="m-0 flex list-none flex-col gap-2xs p-0"
              >
                {results.map((req) => (
                  <li
                    key={req.id}
                    className={cn(
                      'flex items-center gap-xs text-xs',
                      req.met ? 'text-status-text-success' : 'text-content-tertiary'
                    )}
                  >
                    <Icon size="sm">{req.met ? <SuccessIcon /> : <MinusIcon />}</Icon>
                    <span className="sr-only">{req.met ? 'Met:' : 'Not met:'}</span>
                    {req.label}
                  </li>
                ))}
              </ul>
            </div>
            <Button type="submit" variant="primary" className="w-full" disabled={!allMet}>
              {submitLabel}
            </Button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

AuthModal.displayName = 'AuthModal';

export type { AuthModalProps } from './AuthModal.types';
