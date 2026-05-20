import React from 'react';
import clsx from 'clsx';
import { CheckIcon, PartialIcon } from '@acciano/icons';
import styles from './Checkbox.module.css';
import { CheckboxGroupContext } from './CheckboxGroup';

export type CheckboxSize = 'Large' | 'Small';

export interface CheckboxProps {
  label?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  indeterminate?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  size?: CheckboxSize;
  error?: boolean;
  disabled?: boolean;
  id?: string;
  name?: string;
  value?: string;
  className?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  defaultChecked,
  indeterminate = false,
  onChange,
  size: sizeProp,
  error: errorProp = false,
  disabled = false,
  id: idProp,
  name,
  value,
  className,
}) => {
  const groupCtx = React.useContext(CheckboxGroupContext);
  const size = sizeProp ?? groupCtx.size ?? 'Large';
  const error = errorProp || (groupCtx.error ?? false);

  const generatedId = React.useId();
  const id = idProp ?? generatedId;
  const inputRef = React.useRef<HTMLInputElement>(null);

  const isControlled = checked !== undefined;
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked ?? false);
  const currentChecked = isControlled ? checked : internalChecked;
  const isIndeterminate = indeterminate && !currentChecked;

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = isIndeterminate;
    }
  }, [isIndeterminate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) setInternalChecked(e.target.checked);
    onChange?.(e);
  };

  const showIcon = currentChecked || isIndeterminate;

  return (
    <label
      htmlFor={id}
      className={clsx(
        styles.root,
        size === 'Small' && styles['root--small'],
        disabled && styles['root--disabled'],
        className,
      )}
    >
      <input
        ref={inputRef}
        type="checkbox"
        id={id}
        name={name}
        value={value}
        checked={isControlled ? currentChecked : undefined}
        defaultChecked={!isControlled ? defaultChecked : undefined}
        onChange={handleChange}
        disabled={disabled}
        aria-invalid={error && !disabled ? true : undefined}
        className={styles.input}
      />
      <span
        className={clsx(
          styles.box,
          currentChecked && styles['box--checked'],
          isIndeterminate && styles['box--indeterminate'],
          error && !disabled && styles['box--error'],
          disabled && styles['box--disabled'],
        )}
      >
        {showIcon && (
          isIndeterminate
            ? <PartialIcon className={styles.iconPartial} aria-hidden="true" />
            : <CheckIcon className={styles.iconCheck} aria-hidden="true" />
        )}
      </span>
      {label && <span className={styles.label}>{label}</span>}
    </label>
  );
};
