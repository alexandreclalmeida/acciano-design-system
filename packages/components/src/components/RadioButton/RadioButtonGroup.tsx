import React from 'react';
import clsx from 'clsx';
import { AlertCircle } from 'lucide-react';
import type { RadioButtonSize } from './RadioButton';
import styles from './RadioButtonGroup.module.css';

interface RadioButtonGroupContextValue {
  name?: string;
  size?: RadioButtonSize;
  error?: boolean;
  groupValue?: string;
  onChange?: (value: string) => void;
}

export const RadioButtonGroupContext =
  React.createContext<RadioButtonGroupContextValue>({});

export interface RadioButtonGroupProps {
  name: string;
  label?: string;
  required?: boolean;
  optional?: boolean;
  helperText?: string;
  error?: boolean;
  size?: RadioButtonSize;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

export const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({
  name,
  label,
  required = false,
  optional = false,
  helperText,
  error = false,
  size = 'Large',
  value,
  defaultValue,
  onChange,
  children,
  className,
}) => {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? '');
  const groupValue = isControlled ? value : internalValue;

  const handleChange = React.useCallback(
    (val: string) => {
      if (!isControlled) setInternalValue(val);
      onChange?.(val);
    },
    [isControlled, onChange],
  );

  const ctx = React.useMemo<RadioButtonGroupContextValue>(
    () => ({ name, size, error, groupValue, onChange: handleChange }),
    [name, size, error, groupValue, handleChange],
  );

  return (
    <RadioButtonGroupContext.Provider value={ctx}>
      <div
        role="radiogroup"
        aria-labelledby={label ? `${name}-label` : undefined}
        className={clsx(styles.root, className)}
      >
        {label && (
          <div id={`${name}-label`} className={styles.label}>
            <span>{label}</span>
            {required && <span className={styles.labelRequired}>*</span>}
            {optional && !required && (
              <span className={styles.labelOptional}>(optional)</span>
            )}
          </div>
        )}

        {helperText && (
          <div className={clsx(styles.helper, error && styles['helper--error'])}>
            {error && <AlertCircle size={20} className={styles.helperIcon} />}
            <span>{helperText}</span>
          </div>
        )}

        <div className={styles.list}>{children}</div>
      </div>
    </RadioButtonGroupContext.Provider>
  );
};
