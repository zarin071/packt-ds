export interface AuthModalProps {
  /** Controlled open state (Radix Dialog). */
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Called with the entered credentials when the form is submitted and the password meets all requirements. */
  onSubmit?: (values: { email: string; password: string }) => void;
  /** Dialog heading. */
  title?: string;
  /** Submit button label. */
  submitLabel?: string;
}
