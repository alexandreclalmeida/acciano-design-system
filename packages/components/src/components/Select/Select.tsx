import React from 'react';
import clsx from 'clsx';
import { createPortal } from 'react-dom';
import { ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { DropdownMenuList } from '../DropdownMenu/DropdownMenuList';
import type { DropdownItemConfig } from '../DropdownMenu/DropdownMenuList';
import { useDropdownPosition } from '../DropdownMenu/useDropdownPosition';
import styles from './Select.module.css';

export interface SelectOption {
  value: string;
  label: string;
  icon?: LucideIcon;
}

export interface SelectProps {
  label?: string;
  hideLabel?: boolean;
  required?: boolean;
  optional?: boolean;
  id?: string;
  name?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  options?: SelectOption[];
  error?: boolean;
  disabled?: boolean;
  helperText?: string;
  className?: string;
}

export const Select: React.FC<SelectProps> = ({
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
  options = [],
  error = false,
  disabled = false,
  helperText,
  className,
}) => {
  const generatedId = React.useId();
  const id = idProp ?? generatedId;

  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? '');
  const currentValue = isControlled ? value! : internalValue;

  const [isOpen, setIsOpen] = React.useState(false);

  const fieldWrapRef = React.useRef<HTMLDivElement>(null);
  const listRef = React.useRef<HTMLDivElement>(null);
  const listStyle = useDropdownPosition(fieldWrapRef, isOpen, 'BottomLeft');

  const selectedOption = options.find((o) => o.value === currentValue);

  const handleSelect = (val: string) => {
    if (!isControlled) setInternalValue(val);
    onChange?.(val);
    setIsOpen(false);
  };

  const toggle = () => setIsOpen((prev) => !prev);

  React.useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        !fieldWrapRef.current?.contains(target) &&
        !listRef.current?.contains(target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen]);

  React.useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen]);

  const items: DropdownItemConfig[] = options.map((opt) => ({
    type: 'Single' as const,
    label: opt.label,
    leadingIcon: opt.icon,
    onClick: () => handleSelect(opt.value),
  }));

  const fieldWidth = fieldWrapRef.current?.offsetWidth;

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
          {optional && !required && (
            <span className={styles.labelOptional}>(optional)</span>
          )}
        </label>
      )}

      <div ref={fieldWrapRef} className={styles.fieldWrap}>
        <button
          id={id}
          type="button"
          className={clsx(
            styles.field,
            error && !disabled && styles['field--critical'],
            disabled && styles['field--disabled'],
          )}
          disabled={disabled}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-describedby={helperText ? `${id}-helper` : undefined}
          onClick={toggle}
        >
          <div className={styles.content}>
            <span
              className={clsx(
                styles.valueText,
                !selectedOption && styles['valueText--placeholder'],
              )}
            >
              {selectedOption ? selectedOption.label : (placeholder ?? '')}
            </span>
            {isOpen ? (
              <ChevronUp size={24} className={styles.icon} aria-hidden />
            ) : (
              <ChevronDown size={24} className={styles.icon} aria-hidden />
            )}
          </div>
        </button>
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

      {/* hidden input para integração com forms */}
      {name && <input type="hidden" name={name} value={currentValue} />}

      {isOpen &&
        createPortal(
          <div ref={listRef} style={listStyle} role="listbox">
            <DropdownMenuList items={items} width={fieldWidth} />
          </div>,
          document.body,
        )}
    </div>
  );
};
