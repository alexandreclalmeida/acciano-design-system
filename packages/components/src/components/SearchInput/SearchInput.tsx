import React from 'react';
import clsx from 'clsx';
import { Search, X } from 'lucide-react';
import { Button } from '../Button/Button';
import styles from './SearchInput.module.css';

export type SearchInputVariant = 'Default' | 'Button';
export type SearchInputSize = 'Medium' | 'Small';

export interface SearchInputProps {
  variant?: SearchInputVariant;
  size?: SearchInputSize;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onSearch?: (value: string) => void;
  buttonLabel?: string;
  disabled?: boolean;
  className?: string;
}

const ICON_SIZE: Record<SearchInputSize, number> = { Medium: 24, Small: 16 };

export const SearchInput: React.FC<SearchInputProps> = ({
  variant = 'Default',
  size = 'Medium',
  placeholder = 'Search',
  value,
  defaultValue,
  onChange,
  onSearch,
  buttonLabel = 'Search',
  disabled = false,
  className,
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const isControlled = value !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue ?? '');
  const currentValue = isControlled ? (value ?? '') : uncontrolledValue;
  const hasValue = currentValue.length > 0;

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!isControlled) setUncontrolledValue(e.target.value);
    onChange?.(e);
  };

  const handleClear = () => {
    if (!isControlled) setUncontrolledValue('');
    onChange?.({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>);
    inputRef.current?.focus();
  };

  const handleSearch = () => {
    onSearch?.(inputRef.current?.value ?? '');
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className={clsx(styles.root, styles[`size--${size}`], className)}>
      <div
        className={clsx(
          styles.field,
          variant === 'Button' && styles['field--button'],
          disabled && styles['field--disabled'],
        )}
      >
        <div className={styles.content}>
          <Search size={ICON_SIZE[size]} className={styles.icon} aria-hidden />
          <input
            ref={inputRef}
            type="text"
            placeholder={placeholder}
            value={isControlled ? value : undefined}
            defaultValue={!isControlled ? defaultValue : undefined}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            className={styles.input}
          />
          {hasValue && !disabled && (
            <button
              type="button"
              className={styles.clearButton}
              onClick={handleClear}
              aria-label="Clear search"
            >
              <X size={ICON_SIZE[size]} />
            </button>
          )}
        </div>
      </div>

      {variant === 'Button' && (
        <Button
          variant="Primary"
          tone="Brand"
          size={size}
          disabled={disabled}
          onClick={handleSearch}
          className={styles.searchButton}
        >
          {buttonLabel}
        </Button>
      )}
    </div>
  );
};
