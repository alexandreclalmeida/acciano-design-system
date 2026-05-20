import React from 'react';
import clsx from 'clsx';
import { Minus, Plus, AlertCircle } from 'lucide-react';
import styles from './Stepper.module.css';

export interface StepperProps {
  label?: string;
  hideLabel?: boolean;
  required?: boolean;
  optional?: boolean;
  id?: string;
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  editable?: boolean;
  error?: boolean;
  disabled?: boolean;
  helperText?: string;
  className?: string;
}

export const Stepper: React.FC<StepperProps> = ({
  label,
  hideLabel = false,
  required = false,
  optional = false,
  id: idProp,
  value: valueProp,
  defaultValue = 0,
  onChange,
  min,
  max,
  step = 1,
  editable = false,
  error = false,
  disabled = false,
  helperText,
  className,
}) => {
  const generatedId = React.useId();
  const id = idProp ?? generatedId;

  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const isControlled = valueProp !== undefined;
  const value = isControlled ? valueProp : internalValue;

  const [inputText, setInputText] = React.useState(String(value));

  React.useEffect(() => {
    setInputText(String(value));
  }, [value]);

  const update = (next: number) => {
    let clamped = next;
    if (min !== undefined) clamped = Math.max(min, clamped);
    if (max !== undefined) clamped = Math.min(max, clamped);
    if (!isControlled) setInternalValue(clamped);
    onChange?.(clamped);
  };

  const commitInput = () => {
    const parsed = parseFloat(inputText);
    if (!isNaN(parsed)) {
      update(parsed);
    } else {
      setInputText(String(value));
    }
  };

  const helperRole = disabled ? 'disabled' : error ? 'critical' : 'hint';
  const canDecrement = min === undefined || value > min;
  const canIncrement = max === undefined || value < max;

  const valueEl = editable ? (
    <input
      id={`${id}-output`}
      type="text"
      inputMode="numeric"
      className={styles.valueInput}
      value={inputText}
      disabled={disabled}
      onChange={(e) => setInputText(e.target.value)}
      onBlur={commitInput}
      onKeyDown={(e) => {
        if (e.key === 'Enter') commitInput();
        if (e.key === 'ArrowUp') { e.preventDefault(); update(value + step); }
        if (e.key === 'ArrowDown') { e.preventDefault(); update(value - step); }
      }}
      aria-label={label}
    />
  ) : (
    <output
      id={`${id}-output`}
      className={styles.valueDisplay}
      aria-live="polite"
      aria-atomic="true"
    >
      {value}
    </output>
  );

  return (
    <div
      className={clsx(
        styles.root,
        disabled && styles['root--disabled'],
        className,
      )}
    >
      {!hideLabel && label && (
        <label htmlFor={`${id}-output`} className={styles.label}>
          <span className={styles.labelText}>{label}</span>
          {required && <span className={styles.labelRequired}>*</span>}
          {optional && !required && <span className={styles.labelOptional}>(optional)</span>}
        </label>
      )}

      <div className={styles.fieldWrap}>
        <div
          className={clsx(
            styles.field,
            error && !disabled && styles['field--critical'],
            disabled && styles['field--disabled'],
          )}
        >
          <button
            type="button"
            className={clsx(styles.stepBtn, styles['stepBtn--left'])}
            onClick={() => update(value - step)}
            disabled={disabled || !canDecrement}
            aria-label="Decrease"
          >
            <Minus size={24} />
          </button>

          {valueEl}

          <button
            type="button"
            className={clsx(styles.stepBtn, styles['stepBtn--right'])}
            onClick={() => update(value + step)}
            disabled={disabled || !canIncrement}
            aria-label="Increase"
          >
            <Plus size={24} />
          </button>
        </div>
      </div>

      {helperText && (
        <div
          id={`${id}-helper`}
          className={clsx(
            styles.helper,
            helperRole === 'critical' && styles['helper--critical'],
            helperRole === 'disabled' && styles['helper--disabled'],
          )}
          aria-live={helperRole === 'critical' ? 'polite' : undefined}
        >
          {helperRole === 'critical' && (
            <AlertCircle size={20} className={styles.helperIcon} />
          )}
          <span>{helperText}</span>
        </div>
      )}
    </div>
  );
};
