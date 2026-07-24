import { forwardRef, useId } from 'react';
import { cn } from '../../../lib/utils';
import { Label } from '../../atoms/Label';
import { Input } from '../../atoms/Input';
import { Icon } from '../../atoms/Icon';
import { ErrorIcon } from '../../../lib/icons';
import type { FormFieldProps } from './FormField.types';

/**
 * FormField molecule — Label + Input + helper/error text with the ARIA
 * wiring done for you (`htmlFor`/`id`, `aria-describedby`, `aria-invalid`).
 * Errors are shown with an icon **and** text, never colour alone.
 */
export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, id, helperText, error, required, className, ...inputProps }, ref) => {
    const autoId = useId();
    const fieldId = id ?? autoId;
    const helperId = `${fieldId}-helper`;
    const errorId = `${fieldId}-error`;
    const hasError = Boolean(error);

    const describedBy =
      [helperText && !hasError ? helperId : null, hasError ? errorId : null]
        .filter(Boolean)
        .join(' ') || undefined;

    return (
      <div className={cn('flex w-full flex-col gap-2xs font-sans', className)}>
        <Label htmlFor={fieldId} required={required}>
          {label}
        </Label>
        <Input
          ref={ref}
          id={fieldId}
          required={required}
          error={error}
          aria-describedby={describedBy}
          {...inputProps}
        />
        {helperText && !hasError && (
          <p id={helperId} className="m-0 text-xs text-content-tertiary">
            {helperText}
          </p>
        )}
        {hasError && (
          <p id={errorId} role="alert" className="m-0 flex items-center gap-2xs text-xs text-status-text-error">
            <Icon size="sm">
              <ErrorIcon />
            </Icon>
            {error}
          </p>
        )}
      </div>
    );
  }
);

FormField.displayName = 'FormField';

export type { FormFieldProps } from './FormField.types';
