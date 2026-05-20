import React from 'react';
import clsx from 'clsx';
import { RadioIcon } from '@acciano/icons';
import styles from './RadioButton.module.css';
import { RadioButtonGroupContext } from './RadioButtonGroup';

export type RadioButtonSize = 'Large' | 'Small';

export interface RadioButtonProps {
  label?: string;
  value?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  size?: RadioButtonSize;
  error?: boolean;
  disabled?: boolean;
  name?: string;
  id?: string;
  className?: string;
}

export const RadioButton: React.FC<RadioButtonProps> = ({
  label,
  value,
  checked,
  defaultChecked,
  onChange,
  size: sizeProp,
  error: errorProp = false,
  disabled = false,
  name: nameProp,
  id: idProp,
  className,
}) => {
  const groupCtx = React.useContext(RadioButtonGroupContext);
  const size = sizeProp ?? groupCtx.size ?? 'Large';
  const error = errorProp || (groupCtx.error ?? false);
  const name = nameProp ?? groupCtx.name;

  const generatedId = React.useId();
  const id = idProp ?? generatedId;

  const isControlledByGroup = groupCtx.groupValue !== undefined && value !== undefined;
  const isControlledDirectly = checked !== undefined;
  const isControlled = isControlledByGroup || isControlledDirectly;

  const [internalChecked, setInternalChecked] = React.useState(defaultChecked ?? false);

  const currentChecked = isControlledByGroup
    ? groupCtx.groupValue === value
    : isControlledDirectly
      ? checked
      : internalChecked;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) setInternalChecked(e.target.checked);
    if (isControlledByGroup && value !== undefined) groupCtx.onChange?.(value);
    onChange?.(e);
  };

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
        type="radio"
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
          error && !disabled && styles['box--error'],
          disabled && styles['box--disabled'],
        )}
      >
        {currentChecked && (
          <RadioIcon className={styles.iconRadio} aria-hidden="true" />
        )}
      </span>
      {label && <span className={styles.label}>{label}</span>}
    </label>
  );
};
