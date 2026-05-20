import React from 'react';
import clsx from 'clsx';
import { AlertCircle } from 'lucide-react';
import styles from './TextArea.module.css';

export interface TextAreaProps {
  label?: string;
  hideLabel?: boolean;
  required?: boolean;
  optional?: boolean;
  id?: string;
  name?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  rows?: number;
  error?: boolean;
  disabled?: boolean;
  helperText?: string;
  className?: string;
}

const Grabber: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
  >
    <path d="M10.8523 4.19139C11.1149 3.9362 11.5405 3.9362 11.8031 4.19139C12.0656 4.44658 12.0656 4.86033 11.8031 5.11552L5.14768 11.5844C4.88513 11.8396 4.45946 11.8396 4.19691 11.5844C3.93436 11.3292 3.93436 10.9154 4.19691 10.6603L10.8523 4.19139Z" fill="currentColor" />
    <path d="M10.8523 8.11212C11.1149 7.85693 11.5405 7.85693 11.8031 8.11212C12.0656 8.3673 12.0656 8.78105 11.8031 9.03624L8.95077 11.8086C8.68822 12.0638 8.26255 12.0638 8 11.8086C7.73745 11.5534 7.73745 11.1397 8 10.8845L10.8523 8.11212Z" fill="currentColor" />
  </svg>
);

export const TextArea: React.FC<TextAreaProps> = ({
  label,
  hideLabel = false,
  required = false,
  optional = false,
  id: idProp,
  name,
  placeholder,
  value,
  defaultValue,
  onChange,
  rows = 4,
  error = false,
  disabled = false,
  helperText,
  className,
}) => {
  const generatedId = React.useId();
  const id = idProp ?? generatedId;

  const helperRole = disabled ? 'disabled' : error ? 'critical' : 'hint';

  return (
    <div
      className={clsx(
        styles.root,
        disabled && styles['root--disabled'],
        className,
      )}
    >
      {!hideLabel && label && (
        <label htmlFor={id} className={styles.label}>
          <span className={styles.labelText}>{label}</span>
          {required && <span className={styles.labelRequired}>*</span>}
          {optional && !required && <span className={styles.labelOptional}>(optional)</span>}
        </label>
      )}

      <div className={styles.areaWrap}>
        <div
          className={clsx(
            styles.area,
            error && !disabled && styles['area--critical'],
            disabled && styles['area--disabled'],
          )}
        >
          <textarea
            id={id}
            name={name}
            placeholder={placeholder}
            value={value}
            defaultValue={defaultValue}
            onChange={onChange}
            rows={rows}
            disabled={disabled}
            aria-invalid={error && !disabled ? true : undefined}
            aria-describedby={helperText ? `${id}-helper` : undefined}
            className={styles.textarea}
          />
          <Grabber className={styles.grabber} />
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
