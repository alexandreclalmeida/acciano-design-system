import React from 'react';
import clsx from 'clsx';
import { AlertCircle } from 'lucide-react';
import type { CheckboxSize } from './Checkbox';
import styles from './CheckboxGroup.module.css';

interface CheckboxGroupContextValue {
  size?: CheckboxSize;
  error?: boolean;
}

export const CheckboxGroupContext = React.createContext<CheckboxGroupContextValue>({});

export interface CheckboxGroupProps {
  label?: string;
  required?: boolean;
  optional?: boolean;
  helperText?: string;
  error?: boolean;
  size?: CheckboxSize;
  children: React.ReactNode;
  className?: string;
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  label,
  required = false,
  optional = false,
  helperText,
  error = false,
  size = 'Large',
  children,
  className,
}) => {
  const ctx = React.useMemo<CheckboxGroupContextValue>(
    () => ({ size, error }),
    [size, error],
  );

  return (
    <CheckboxGroupContext.Provider value={ctx}>
      <div className={clsx(styles.root, className)} role="group">
        {label && (
          <div className={styles.label}>
            <span>{label}</span>
            {required && <span className={styles.labelRequired}>*</span>}
            {optional && !required && (
              <span className={styles.labelOptional}>(optional)</span>
            )}
          </div>
        )}

        {helperText && (
          <div
            className={clsx(
              styles.helper,
              error && styles['helper--error'],
            )}
          >
            {error && <AlertCircle size={20} className={styles.helperIcon} />}
            <span>{helperText}</span>
          </div>
        )}

        <div className={styles.list}>{children}</div>
      </div>
    </CheckboxGroupContext.Provider>
  );
};
