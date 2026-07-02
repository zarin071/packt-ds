import { useRef, type InputHTMLAttributes, type ChangeEvent } from 'react';
import { SearchIcon, CloseIcon, SpinnerIcon } from '../icons';
import styles from './SearchBar.module.css';

export interface SearchBarProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Called when the clear button is pressed. */
  onClear?: () => void;
  /** Shows a spinner in place of the search icon. */
  loading?: boolean;
}

/**
 * SearchBar molecule.
 *
 * Tokens: `--packt-semantic-colors-light-border-primary`/`-brand-default` (focus),
 * `--packt-semantic-colors-light-background-primary`, `--packt-semantic-colors-light-icon-primary`,
 * `--packt-radius-pill`, `--packt-space-*`, `--packt-size-*`, `--packt-focus-ring`.
 */
export const SearchBar = ({
  value,
  onChange,
  onClear,
  loading = false,
  disabled = false,
  placeholder = 'Search…',
  className,
  ...rest
}: SearchBarProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const hasValue = Boolean(value);

  const handleClear = () => {
    onClear?.();
    inputRef.current?.focus();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);
  };

  return (
    <div
      className={[
        styles.wrapper,
        disabled ? styles.disabled : '',
        className ?? '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <span className={styles.leadIcon} aria-hidden="true">
        {loading ? (
          <span className={styles.spinner}>
            <SpinnerIcon />
          </span>
        ) : (
          <SearchIcon />
        )}
      </span>
      <input
        ref={inputRef}
        type="search"
        className={styles.input}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        placeholder={placeholder}
        aria-label={rest['aria-label'] ?? 'Search'}
        {...rest}
      />
      {hasValue && !loading && (
        <button
          type="button"
          className={styles.clearBtn}
          onClick={handleClear}
          aria-label="Clear search"
          tabIndex={0}
        >
          <CloseIcon />
        </button>
      )}
    </div>
  );
};

SearchBar.displayName = 'SearchBar';
