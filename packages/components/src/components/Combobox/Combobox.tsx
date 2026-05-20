import React from 'react';
import clsx from 'clsx';
import { createPortal } from 'react-dom';
import { ChevronDown, ChevronUp, X, AlertCircle } from 'lucide-react';
import { Tag } from '../Tag/Tag';
import { DropdownMenuList } from '../DropdownMenu/DropdownMenuList';
import type { DropdownItemConfig } from '../DropdownMenu/DropdownMenuList';
import { useDropdownPosition } from '../DropdownMenu/useDropdownPosition';
import styles from './Combobox.module.css';

export interface ComboboxOption {
  value: string;
  label: string;
}

export interface ComboboxProps {
  mode?: 'Single' | 'Multiple';
  label?: string;
  hideLabel?: boolean;
  required?: boolean;
  optional?: boolean;
  id?: string;
  name?: string;
  placeholder?: string;
  /** Single mode: controlled value */
  value?: string;
  /** Single mode: initial uncontrolled value */
  defaultValue?: string;
  /** Single mode: fires when an option is committed */
  onChange?: (value: string) => void;
  /** Multiple mode: controlled values */
  values?: string[];
  /** Multiple mode: initial uncontrolled values */
  defaultValues?: string[];
  /** Multiple mode: fires on every selection change */
  onValuesChange?: (values: string[]) => void;
  options?: ComboboxOption[];
  error?: boolean;
  disabled?: boolean;
  helperText?: string;
  /** Multiple mode: max tags shown before "+N" chip (default 2) */
  maxVisibleTags?: number;
  className?: string;
}

export const Combobox: React.FC<ComboboxProps> = ({
  mode = 'Single',
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
  values,
  defaultValues,
  onValuesChange,
  options = [],
  error = false,
  disabled = false,
  helperText,
  maxVisibleTags = 2,
  className,
}) => {
  const generatedId = React.useId();
  const id = idProp ?? generatedId;

  // ── Single mode ────────────────────────────────────────────────────────────
  const isControlledSingle = mode === 'Single' && value !== undefined;
  const [internalSingleValue, setInternalSingleValue] = React.useState(defaultValue ?? '');
  const currentSingleValue = isControlledSingle ? value! : internalSingleValue;

  // ── Multiple mode ──────────────────────────────────────────────────────────
  const isControlledMultiple = mode === 'Multiple' && values !== undefined;
  const [internalMultipleValues, setInternalMultipleValues] = React.useState<string[]>(
    defaultValues ?? [],
  );
  const currentMultipleValues = isControlledMultiple ? values! : internalMultipleValues;

  // ── Dropdown ───────────────────────────────────────────────────────────────
  const [isOpen, setIsOpen] = React.useState(false);
  const fieldWrapRef = React.useRef<HTMLDivElement>(null);
  const fieldRef = React.useRef<HTMLDivElement>(null);
  const listRef = React.useRef<HTMLDivElement>(null);
  const listStyle = useDropdownPosition(fieldWrapRef, isOpen, 'BottomLeft');
  const fieldWidth = fieldWrapRef.current?.offsetWidth;

  // ── Interactions ───────────────────────────────────────────────────────────
  const toggle = () => {
    if (!disabled) setIsOpen((prev) => !prev);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle();
    }
  };

  const handleSelectSingle = (val: string) => {
    if (!isControlledSingle) setInternalSingleValue(val);
    onChange?.(val);
    setIsOpen(false);
  };

  const handleToggleMultiple = (val: string, checked: boolean) => {
    const next = checked
      ? [...currentMultipleValues, val]
      : currentMultipleValues.filter((v) => v !== val);
    if (!isControlledMultiple) setInternalMultipleValues(next);
    onValuesChange?.(next);
  };

  const handleRemoveTag = (val: string) => {
    const next = currentMultipleValues.filter((v) => v !== val);
    if (!isControlledMultiple) setInternalMultipleValues(next);
    onValuesChange?.(next);
  };

  const handleClearAll = () => {
    if (!isControlledMultiple) setInternalMultipleValues([]);
    onValuesChange?.([]);
  };

  // Close on outside click
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

  // Close on Escape
  React.useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        fieldRef.current?.blur();
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen]);

  // ── Dropdown items ─────────────────────────────────────────────────────────
  const items: DropdownItemConfig[] = options.map((opt) => {
    if (mode === 'Multiple') {
      return {
        type: 'Checkbox' as const,
        label: opt.label,
        checked: currentMultipleValues.includes(opt.value),
        onCheckedChange: (checked: boolean) => handleToggleMultiple(opt.value, checked),
      };
    }
    return {
      type: 'Single' as const,
      label: opt.label,
      onClick: () => handleSelectSingle(opt.value),
    };
  });

  const labelOfValue = (val: string) => options.find((o) => o.value === val)?.label ?? val;

  const selectedLabel =
    mode === 'Single' ? options.find((o) => o.value === currentSingleValue)?.label : undefined;

  const hasMultipleValues = mode === 'Multiple' && currentMultipleValues.length > 0;

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
        <div
          ref={fieldRef}
          id={id}
          className={clsx(
            styles.field,
            error && !disabled && styles['field--critical'],
            disabled && styles['field--disabled'],
          )}
          onClick={toggle}
          onKeyDown={handleKeyDown}
          tabIndex={disabled ? -1 : 0}
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-disabled={disabled || undefined}
          aria-describedby={helperText ? `${id}-helper` : undefined}
        >
          <div className={styles.content}>
            {mode === 'Single' && (
              <span
                className={clsx(
                  styles.valueText,
                  !selectedLabel && styles['valueText--placeholder'],
                )}
              >
                {selectedLabel ?? placeholder ?? ''}
              </span>
            )}

            {mode === 'Multiple' && (
              <div className={styles.inputArea}>
                {hasMultipleValues && (
                  <div className={styles.tagGroup}>
                    {currentMultipleValues.slice(0, maxVisibleTags).map((val) => (
                      <Tag
                        key={val}
                        size="Medium"
                        label={labelOfValue(val)}
                        onDismiss={!disabled ? () => handleRemoveTag(val) : undefined}
                        disabled={disabled}
                      />
                    ))}
                    {currentMultipleValues.length > maxVisibleTags && (
                      <span className={styles.overflowCount}>
                        +{currentMultipleValues.length - maxVisibleTags}
                      </span>
                    )}
                  </div>
                )}
              </div>
            )}

            {mode === 'Multiple' && hasMultipleValues && !disabled && (
              <div className={styles.auxiliar}>
                <button
                  type="button"
                  className={styles.clearButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClearAll();
                  }}
                  aria-label="Clear all"
                  tabIndex={-1}
                >
                  <X size={24} className={styles.clearIcon} aria-hidden />
                </button>
              </div>
            )}

            {isOpen ? (
              <ChevronUp size={24} className={styles.icon} aria-hidden />
            ) : (
              <ChevronDown size={24} className={styles.icon} aria-hidden />
            )}
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
            <AlertCircle size={20} className={styles.helperIcon} />
          )}
          <span>{helperText}</span>
        </div>
      )}

      {/* Hidden inputs for form integration */}
      {mode === 'Single' && name && (
        <input type="hidden" name={name} value={currentSingleValue} />
      )}
      {mode === 'Multiple' && name &&
        currentMultipleValues.map((val) => (
          <input key={val} type="hidden" name={name} value={val} />
        ))}

      {isOpen && options.length > 0 &&
        createPortal(
          <div ref={listRef} style={listStyle} role="listbox">
            <DropdownMenuList items={items} width={fieldWidth} />
          </div>,
          document.body,
        )}
    </div>
  );
};
