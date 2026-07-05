import { forwardRef, useRef, useState, type ChangeEvent, type DragEvent, type KeyboardEvent } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { UploadIcon, FileIcon, CloseIcon } from '../icons';
import type { FileUploadProps, UploadedFile } from './FileUpload.types';

export const fileUploadZoneVariants = cva(
  [
    'flex select-none flex-col items-center justify-center gap-m rounded-s border-2 border-dashed',
    'bg-bg-surface px-2xl py-2xl text-center transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2',
  ].join(' '),
  {
    variants: {
      dragging: {
        true: 'border-brand-border-default bg-brand-bg-hover',
        false: 'border-border-default',
      },
      disabled: {
        true: 'cursor-not-allowed border-border-disabled bg-bg-disabled opacity-60',
        false: 'cursor-pointer hover:border-brand-border-default hover:bg-brand-bg-hover',
      },
    },
    defaultVariants: {
      dragging: false,
      disabled: false,
    },
  }
);

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * FileUpload molecule — a drag-and-drop / click-to-browse drop zone plus a
 * list of currently selected files, each removable.
 */
export const FileUpload = forwardRef<HTMLDivElement, FileUploadProps>(
  ({ accept, multiple = false, onChange, disabled = false, className, ...rest }, ref) => {
    const [files, setFiles] = useState<UploadedFile[]>([]);
    const [dragging, setDragging] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const addFiles = (incoming: FileList | null) => {
      if (!incoming) return;
      const next: UploadedFile[] = Array.from(incoming).map((f) => ({
        name: f.name,
        size: f.size,
        file: f,
      }));
      const merged = multiple ? [...files, ...next] : next;
      setFiles(merged);
      onChange?.(merged);
    };

    const removeFile = (index: number) => {
      const next = files.filter((_, i) => i !== index);
      setFiles(next);
      onChange?.(next);
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setDragging(false);
      if (!disabled) addFiles(e.dataTransfer.files);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      addFiles(e.target.files);
      e.target.value = '';
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
      if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
        e.preventDefault();
        inputRef.current?.click();
      }
    };

    return (
      <div ref={ref} className={cn('flex flex-col gap-s', className)} {...rest}>
        <div
          className={fileUploadZoneVariants({ dragging, disabled })}
          onDragOver={(e) => {
            e.preventDefault();
            if (!disabled) setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => !disabled && inputRef.current?.click()}
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-label="Drop files here or click to upload"
          aria-disabled={disabled || undefined}
          onKeyDown={handleKeyDown}
        >
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            accept={accept}
            multiple={multiple}
            disabled={disabled}
            onChange={handleChange}
            tabIndex={-1}
            aria-hidden="true"
          />
          <span className="flex text-brand-icon-default" aria-hidden="true">
            <UploadIcon className="size-8" />
          </span>
          <span className="flex flex-col gap-0.5">
            <span className="text-sm font-medium text-content-primary">Drop files here</span>
            <span className="text-xs text-content-tertiary">or click to browse</span>
          </span>
          {accept && <span className="text-[10px] text-content-tertiary">{accept}</span>}
        </div>

        {files.length > 0 && (
          <ul className="flex list-none flex-col gap-xs p-0" aria-label="Uploaded files">
            {files.map((f, i) => (
              <li
                key={`${f.name}-${i}`}
                className="flex items-center gap-s rounded-xs border border-border-default bg-bg-surface px-l py-m"
              >
                <span className="flex shrink-0 text-content-secondary" aria-hidden="true">
                  <FileIcon className="size-5" />
                </span>
                <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <span className="truncate text-sm font-medium text-content-primary">{f.name}</span>
                  <span className="text-xs text-content-tertiary">{formatBytes(f.size)}</span>
                </span>
                <button
                  type="button"
                  onClick={() => removeFile(i)}
                  aria-label={`Remove ${f.name}`}
                  className={cn(
                    'flex shrink-0 items-center justify-center rounded-xs p-2xs text-content-secondary transition-colors',
                    'hover:bg-status-bg-error hover:text-status-text-error',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2'
                  )}
                >
                  <CloseIcon className="size-4" aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
);

FileUpload.displayName = 'FileUpload';

export type { FileUploadProps, UploadedFile } from './FileUpload.types';
