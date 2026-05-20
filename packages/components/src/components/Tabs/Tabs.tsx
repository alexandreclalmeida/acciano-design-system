import React from 'react';
import clsx from 'clsx';
import type { LucideIcon } from 'lucide-react';
import { Count } from '../Count/Count';
import styles from './Tabs.module.css';

// ─── Context ──────────────────────────────────────

interface TabsContextValue {
  value: string;
  onChange: (value: string) => void;
}

const TabsContext = React.createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const ctx = React.useContext(TabsContext);
  if (!ctx) throw new Error('Tab* must be used within <Tabs>');
  return ctx;
}

// ─── Tabs ─────────────────────────────────────────

export interface TabsProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  value: valueProp,
  defaultValue = '',
  onChange,
  children,
  className,
}) => {
  const isControlled = valueProp !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue);
  const value = isControlled ? (valueProp ?? '') : uncontrolledValue;

  const handleChange = React.useCallback(
    (next: string) => {
      if (!isControlled) setUncontrolledValue(next);
      onChange?.(next);
    },
    [isControlled, onChange],
  );

  return (
    <TabsContext.Provider value={{ value, onChange: handleChange }}>
      <div className={clsx(styles.tabs, className)}>{children}</div>
    </TabsContext.Provider>
  );
};

// ─── TabList ──────────────────────────────────────

export interface TabListProps {
  children: React.ReactNode;
  className?: string;
}

export const TabList: React.FC<TabListProps> = ({ children, className }) => (
  <div role="tablist" className={clsx(styles.tabList, className)}>
    {children}
  </div>
);

// ─── Tab ──────────────────────────────────────────

export interface TabProps {
  value: string;
  children: React.ReactNode;
  leadingIcon?: LucideIcon;
  count?: number;
  disabled?: boolean;
  className?: string;
}

export const Tab: React.FC<TabProps> = ({
  value,
  children,
  leadingIcon: LeadingIcon,
  count,
  disabled = false,
  className,
}) => {
  const { value: selectedValue, onChange } = useTabsContext();
  const isSelected = selectedValue === value;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    const tablist = e.currentTarget.closest('[role="tablist"]');
    if (!tablist) return;
    const tabs = Array.from(
      tablist.querySelectorAll<HTMLButtonElement>('[role="tab"]:not(:disabled)'),
    );
    const index = tabs.indexOf(e.currentTarget);
    let next = -1;
    if (e.key === 'ArrowRight') next = (index + 1) % tabs.length;
    else if (e.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = tabs.length - 1;
    if (next >= 0) {
      e.preventDefault();
      tabs[next].focus();
      tabs[next].click();
    }
  };

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isSelected}
      aria-controls={`tabpanel-${value}`}
      id={`tab-${value}`}
      disabled={disabled}
      onClick={() => onChange(value)}
      onKeyDown={handleKeyDown}
      tabIndex={isSelected ? 0 : -1}
      className={clsx(styles.tab, isSelected && styles['tab--selected'], className)}
    >
      <div className={styles.content}>
        {LeadingIcon && <LeadingIcon size={20} className={styles.icon} aria-hidden />}
        <span className={styles.label}>{children}</span>
        {count !== undefined && <Count emphasis="Weak">{count}</Count>}
      </div>
    </button>
  );
};

// ─── TabPanel ─────────────────────────────────────

export interface TabPanelProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

export const TabPanel: React.FC<TabPanelProps> = ({ value, children, className }) => {
  const { value: selectedValue } = useTabsContext();
  if (selectedValue !== value) return null;

  return (
    <div
      id={`tabpanel-${value}`}
      role="tabpanel"
      aria-labelledby={`tab-${value}`}
      tabIndex={0}
      className={clsx(styles.tabPanel, className)}
    >
      {children}
    </div>
  );
};
