import React from "react";
import clsx from "clsx";
import { createPortal } from "react-dom";
import { Search, X, AlertCircle } from "lucide-react";
import { Tag } from "../Tag/Tag";
import { DropdownMenuList } from "../DropdownMenu/DropdownMenuList";
import type { DropdownItemConfig } from "../DropdownMenu/DropdownMenuList";
import { useDropdownPosition } from "../DropdownMenu/useDropdownPosition";
import { getPortalContainer } from "../../utils/getPortalContainer";
import styles from "./Autocomplete.module.css";

export interface AutocompleteOption {
  value: string;
  label: string;
}

export interface AutocompleteProps {
  mode?: "Single" | "Multiple";
  label?: string;
  hideLabel?: boolean;
  required?: boolean;
  optional?: boolean;
  id?: string;
  name?: string;
  placeholder?: string;
  /** Multiple mode: max tags shown before "+N" chip (default 2) */
  maxVisibleTags?: number;
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
  options?: AutocompleteOption[];
  error?: boolean;
  disabled?: boolean;
  helperText?: string;
  className?: string;
}

export const Autocomplete: React.FC<AutocompleteProps> = ({
  mode = "Single",
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
  const isControlledSingle = mode === "Single" && value !== undefined;
  const [internalSingleValue, setInternalSingleValue] = React.useState<string>(
    defaultValue ?? "",
  );
  const currentSingleValue = isControlledSingle ? value! : internalSingleValue;

  // ── Multiple mode ──────────────────────────────────────────────────────────
  const isControlledMultiple = mode === "Multiple" && values !== undefined;
  const [internalMultipleValues, setInternalMultipleValues] = React.useState<
    string[]
  >(defaultValues ?? []);
  const currentMultipleValues = isControlledMultiple
    ? values!
    : internalMultipleValues;

  // ── Input text (for display + filtering) ──────────────────────────────────
  const [inputText, setInputText] = React.useState(() => {
    if (mode === "Single") {
      const init = value ?? defaultValue ?? "";
      return options.find((o) => o.value === init)?.label ?? "";
    }
    return "";
  });

  // Sync input text when controlled single value changes externally
  React.useEffect(() => {
    if (isControlledSingle) {
      const opt = options.find((o) => o.value === value);
      setInputText(opt?.label ?? "");
    }
  }, [value, isControlledSingle, options]);

  // ── Dropdown ───────────────────────────────────────────────────────────────
  const [isOpen, setIsOpen] = React.useState(false);
  const fieldWrapRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const listRef = React.useRef<HTMLDivElement>(null);
  const listStyle = useDropdownPosition(fieldWrapRef, isOpen, "BottomLeft");

  const filteredOptions = React.useMemo(() => {
    const text = inputText.toLowerCase().trim();
    if (!text) return options;
    return options.filter((o) => o.label.toLowerCase().includes(text));
  }, [options, inputText]);

  const showDropdown = isOpen && filteredOptions.length > 0;
  const fieldWidth = fieldWrapRef.current?.offsetWidth;

  // ── Interactions ───────────────────────────────────────────────────────────
  const handleFocus = () => {
    if (!disabled) setIsOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setInputText(text);
    setIsOpen(true);
    // Clear committed single value when user edits the text
    if (mode === "Single" && currentSingleValue) {
      if (!isControlledSingle) setInternalSingleValue("");
    }
  };

  const handleSelectSingle = (val: string) => {
    const opt = options.find((o) => o.value === val);
    setInputText(opt?.label ?? "");
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
    inputRef.current?.focus();
  };

  const handleClearAll = () => {
    if (!isControlledMultiple) setInternalMultipleValues([]);
    onValuesChange?.([]);
    inputRef.current?.focus();
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
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen]);

  // Close on Escape
  React.useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen]);

  // ── Dropdown items ─────────────────────────────────────────────────────────
  const items: DropdownItemConfig[] = filteredOptions.map((opt) => {
    if (mode === "Multiple") {
      return {
        type: "Checkbox" as const,
        label: opt.label,
        checked: currentMultipleValues.includes(opt.value),
        onCheckedChange: (checked: boolean) =>
          handleToggleMultiple(opt.value, checked),
      };
    }
    return {
      type: "Single" as const,
      label: opt.label,
      onClick: () => handleSelectSingle(opt.value),
    };
  });

  const labelOfValue = (val: string) =>
    options.find((o) => o.value === val)?.label ?? val;

  const hasMultipleValues =
    mode === "Multiple" && currentMultipleValues.length > 0;

  const helperRole = disabled ? "disabled" : error ? "critical" : "hint";

  return (
    <div
      className={clsx(
        styles.root,
        disabled && styles["root--disabled"],
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
          className={clsx(
            styles.field,
            error && !disabled && styles["field--critical"],
            disabled && styles["field--disabled"],
          )}
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-owns={showDropdown ? `${id}-listbox` : undefined}
          onClick={() => inputRef.current?.focus()}
        >
          <div className={styles.content}>
            <Search size={24} className={styles.leadingIcon} aria-hidden />

            <div className={styles.inputArea}>
              {/* Multiple: up to maxVisibleTags tags + +N chip */}
              {mode === "Multiple" && hasMultipleValues && (
                <div className={styles.tagGroup}>
                  {currentMultipleValues.slice(0, maxVisibleTags).map((val) => (
                    <Tag
                      key={val}
                      size="Medium"
                      label={labelOfValue(val)}
                      onDismiss={
                        !disabled ? () => handleRemoveTag(val) : undefined
                      }
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

              <input
                ref={inputRef}
                id={id}
                name={mode === "Single" ? name : undefined}
                type="text"
                className={styles.input}
                value={inputText}
                onChange={handleInputChange}
                onFocus={handleFocus}
                disabled={disabled}
                placeholder={!hasMultipleValues ? placeholder : undefined}
                aria-autocomplete="list"
                aria-describedby={helperText ? `${id}-helper` : undefined}
                autoComplete="off"
              />
            </div>

            {/* Multiple: clear all */}
            {hasMultipleValues && !disabled && (
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
            )}
          </div>
        </div>
      </div>

      {helperText && (
        <div
          id={`${id}-helper`}
          className={clsx(
            styles.helper,
            helperRole === "critical" && styles["helper--critical"],
            helperRole === "disabled" && styles["helper--disabled"],
          )}
          aria-live={helperRole === "critical" ? "polite" : undefined}
        >
          {helperRole === "critical" && (
            <AlertCircle size={20} className={styles.helperIcon} />
          )}
          <span>{helperText}</span>
        </div>
      )}

      {/* Multiple mode: hidden inputs for form integration */}
      {mode === "Multiple" &&
        name &&
        currentMultipleValues.map((val) => (
          <input key={val} type="hidden" name={name} value={val} />
        ))}

      {showDropdown &&
        createPortal(
          <div
            ref={listRef}
            style={{ ...listStyle, pointerEvents: 'auto' }}
            role="listbox"
            id={`${id}-listbox`}
          >
            <DropdownMenuList items={items} width={fieldWidth} />
          </div>,
          getPortalContainer(),
        )}
    </div>
  );
};
