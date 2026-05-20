import React from 'react';
import clsx from 'clsx';
import type { LucideIcon } from 'lucide-react';
import styles from './SegmentedControl.module.css';

export interface SegmentedControlOption {
  value: string;
  label: string;
  icon?: LucideIcon;
  disabled?: boolean;
}

export interface SegmentedControlProps {
  options: SegmentedControlOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  size?: 'Medium' | 'Small';
  disabled?: boolean;
  className?: string;
}

export const SegmentedControl: React.FC<SegmentedControlProps> = ({
  options,
  value: valueProp,
  defaultValue,
  onChange,
  size = 'Medium',
  disabled = false,
  className,
}) => {
  const isControlled = valueProp !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = React.useState(
    defaultValue ?? options[0]?.value ?? '',
  );
  const selectedValue = isControlled ? (valueProp ?? '') : uncontrolledValue;

  const handleSelect = React.useCallback(
    (val: string) => {
      if (!isControlled) setUncontrolledValue(val);
      onChange?.(val);
    },
    [isControlled, onChange],
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const items = Array.from(
      e.currentTarget.querySelectorAll<HTMLButtonElement>('[role="radio"]:not(:disabled)'),
    );
    const focused = document.activeElement as HTMLButtonElement;
    const index = items.indexOf(focused);
    let next = -1;
    if (e.key === 'ArrowRight') next = (index + 1) % items.length;
    else if (e.key === 'ArrowLeft') next = (index - 1 + items.length) % items.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = items.length - 1;
    if (next >= 0) {
      e.preventDefault();
      items[next].focus();
      const val = items[next].dataset.value;
      if (val) handleSelect(val);
    }
  };

  const iconSize = size === 'Small' ? 16 : 20;

  return (
    <div
      role="radiogroup"
      className={clsx(styles.container, className)}
      onKeyDown={handleKeyDown}
    >
      {options.map((option) => {
        const isSelected = option.value === selectedValue;
        const isItemDisabled = disabled || option.disabled;
        const Icon = option.icon;

        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={isSelected}
            data-value={option.value}
            disabled={isItemDisabled}
            tabIndex={isSelected ? 0 : -1}
            onClick={() => handleSelect(option.value)}
            className={clsx(
              styles.item,
              size === 'Small' ? styles['item--small'] : styles['item--medium'],
              isSelected && styles['item--selected'],
            )}
          >
            <span className={styles.content}>
              {Icon && <Icon size={iconSize} className={styles.icon} aria-hidden />}
              <span className={styles.label}>{option.label}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
};
