import type { HTMLAttributes } from 'react';

export interface UploadedFile {
  name: string;
  size: number;
  file: File;
}

export interface FileUploadProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Accepted MIME types or extensions (passed to the `<input accept>`). */
  accept?: string;
  /** Allow selecting/dropping more than one file at a time. */
  multiple?: boolean;
  /** Called with the full current file list whenever it changes. */
  onChange?: (files: UploadedFile[]) => void;
  /** Disable the drop zone. */
  disabled?: boolean;
}
