import { useRef, useState, type ChangeEvent, type DragEvent, type HTMLAttributes } from 'react';
import { UploadIcon, FileIcon, CloseIcon } from '../icons';
import styles from './FileUpload.module.css';

export interface UploadedFile {
  name: string;
  size: number;
  file: File;
}

export interface FileUploadProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Accepted MIME types or extensions (passed to the `<input accept>`). */
  accept?: string;
  multiple?: boolean;
  onChange?: (files: UploadedFile[]) => void;
  /** Disable the drop zone. */
  disabled?: boolean;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * FileUpload molecule.
 *
 * Tokens: `--packt-semantic-colors-light-border-divide` (dashed zone border),
 * `--packt-semantic-colors-light-border-brand-default` (drag-over border),
 * `--packt-semantic-colors-light-background-brand-hover` (drag-over bg),
 * `--packt-semantic-colors-light-background-primary` (zone bg),
 * `--packt-semantic-colors-light-icon-brand-default` (upload icon),
 * `--packt-radius-s/m`, `--packt-space-*`, `--packt-size-12/14`.
 */
export const FileUpload = ({
  accept,
  multiple = false,
  onChange,
  disabled = false,
  className,
  ...rest
}: FileUploadProps) => {
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

  return (
    <div className={[styles.root, className ?? ''].filter(Boolean).join(' ')} {...rest}>
      <div
        className={[styles.zone, dragging ? styles.dragging : '', disabled ? styles.disabled : '']
          .filter(Boolean)
          .join(' ')}
        onDragOver={(e) => { e.preventDefault(); if (!disabled) setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => !disabled && inputRef.current?.click()}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label="Drop files here or click to upload"
        onKeyDown={(e) => { if ((e.key === 'Enter' || e.key === ' ') && !disabled) inputRef.current?.click(); }}
      >
        <input
          ref={inputRef}
          type="file"
          className={styles.hiddenInput}
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={handleChange}
          tabIndex={-1}
          aria-hidden="true"
        />
        <span className={styles.uploadIcon} aria-hidden="true">
          <UploadIcon />
        </span>
        <span className={styles.zoneText}>
          <span className={styles.zonePrimary}>Drop files here</span>
          <span className={styles.zoneSecondary}>or click to browse</span>
        </span>
        {accept && (
          <span className={styles.accepts}>{accept}</span>
        )}
      </div>

      {files.length > 0 && (
        <ul className={styles.fileList} aria-label="Uploaded files">
          {files.map((f, i) => (
            <li key={`${f.name}-${i}`} className={styles.fileItem}>
              <span className={styles.fileIcon} aria-hidden="true">
                <FileIcon />
              </span>
              <span className={styles.fileInfo}>
                <span className={styles.fileName}>{f.name}</span>
                <span className={styles.fileSize}>{formatBytes(f.size)}</span>
              </span>
              <button
                type="button"
                className={styles.removeBtn}
                onClick={() => removeFile(i)}
                aria-label={`Remove ${f.name}`}
              >
                <CloseIcon />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

FileUpload.displayName = 'FileUpload';
