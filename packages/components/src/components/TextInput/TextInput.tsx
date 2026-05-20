import React from 'react';
import clsx from 'clsx';
import type { LucideIcon } from 'lucide-react';
import { AlertCircle } from 'lucide-react';
import styles from './TextInput.module.css';

export type TextInputSize = 'Medium' | 'Small';

export interface TextInputProps {
  label?: string;
  hideLabel?: boolean;
  required?: boolean;
  optional?: boolean;
  id?: string;
  name?: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  leadingIcon?: LucideIcon;
  trailingIcon?: LucideIcon;
  size?: TextInputSize;
  error?: boolean;
  disabled?: boolean;
  helperText?: string;
  className?: string;
}

const ICON_SIZE: Record<TextInputSize, number> = { Medium: 24, Small: 16 };
const HELPER_ICON_SIZE: Record<TextInputSize, number> = { Medium: 20, Small: 16 };

export const TextInput: React.FC<TextInputProps> = ({
  label,
  hideLabel = false,
  required = false,
  optional = false,
  id: idProp,
  name,
  type = 'text',
  placeholder,
  value,
  defaultValue,
  onChange,
  leadingIcon: LeadingIcon,
  trailingIcon: TrailingIcon,
  size = 'Medium',
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
        styles[`size--${size}`],
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

      <div className={styles.fieldWrap}>
        <div
          className={clsx(
            styles.field,
            error && !disabled && styles['field--critical'],
            disabled && styles['field--disabled'],
          )}
        >
          <div className={styles.content}>
            {LeadingIcon && <LeadingIcon size={ICON_SIZE[size]} className={styles.icon} />}
            <input
              id={id}
              name={name}
              type={type}
              placeholder={placeholder}
              value={value}
              defaultValue={defaultValue}
              onChange={onChange}
              disabled={disabled}
              aria-invalid={error && !disabled ? true : undefined}
              aria-describedby={helperText ? `${id}-helper` : undefined}
              className={styles.input}
            />
            {TrailingIcon && <TrailingIcon size={ICON_SIZE[size]} className={styles.icon} />}
          </div>
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
            <AlertCircle size={HELPER_ICON_SIZE[size]} className={styles.helperIcon} />
          )}
          <span>{helperText}</span>
        </div>
      )}
    </div>
  );
};
