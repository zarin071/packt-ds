import { useState, type HTMLAttributes, type ReactNode } from 'react';
import styles from './Tab.module.css';

export type TabVariant = 'default' | 'brand';

export interface TabItem {
  key: string;
  label: string;
  /** Optional icon displayed before the label. */
  icon?: ReactNode;
  disabled?: boolean;
}

export interface TabProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  items: TabItem[];
  variant?: TabVariant;
  /** Controlled active tab key. */
  activeKey?: string;
  /** Default active tab key (uncontrolled). */
  defaultActiveKey?: string;
  /** Fired when a tab is selected. */
  onChange?: (key: string) => void;
}

/**
 * Tab molecule.
 *
 * Tokens: `--packt-semantic-colors-light-border-brand-default` (active indicator),
 * `--packt-semantic-colors-light-content-brand-default` (active text),
 * `--packt-semantic-colors-light-content-tertiary` (inactive),
 * `--packt-semantic-colors-light-background-hover` (hover),
 * `--packt-width-m`, `--packt-space-m/xl`, `--packt-size-14`, `--packt-focus-ring`.
 */
export const Tab = ({
  items,
  variant = 'default',
  activeKey: controlledKey,
  defaultActiveKey,
  onChange,
  className,
  ...rest
}: TabProps) => {
  const [internalKey, setInternalKey] = useState<string>(
    defaultActiveKey ?? items[0]?.key ?? ''
  );
  const active = controlledKey ?? internalKey;

  const handleSelect = (key: string) => {
    setInternalKey(key);
    onChange?.(key);
  };

  return (
    <div
      className={[styles.root, styles[variant], className ?? ''].filter(Boolean).join(' ')}
      {...rest}
    >
      <div role="tablist" className={styles.list} aria-label="Tab navigation">
        {items.map((item) => {
          const isActive = item.key === active;
          return (
            <button
              key={item.key}
              role="tab"
              type="button"
              aria-selected={isActive}
              disabled={item.disabled}
              className={[styles.tab, isActive ? styles.active : ''].filter(Boolean).join(' ')}
              onClick={() => !item.disabled && handleSelect(item.key)}
            >
              {item.icon && <span className={styles.tabIcon} aria-hidden="true">{item.icon}</span>}
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

Tab.displayName = 'Tab';
