import type { HTMLAttributes } from 'react';

export interface AuthCTAProps extends HTMLAttributes<HTMLElement> {
  title?: string;
  description?: string;
  signUpLabel?: string;
  signInLabel?: string;
  onSignUp?: () => void;
  onSignIn?: () => void;
}
