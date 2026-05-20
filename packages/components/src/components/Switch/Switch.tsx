import React from 'react';
import clsx from 'clsx';
import styles from './Switch.module.css';

export type SwitchSize = 'small' | 'micro';

export interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  size?: SwitchSize;
  label?: string;
  showLabel?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
}

export const Switch: React.FC<SwitchProps> = ({
  checked,
  defaultChecked = false,
  size = 'small',
  label = 'Label',
  showLabel = true,
  disabled = false,
  onChange,
  className,
}) => {
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked);
  const isControlled = checked !== undefined;
  const isChecked = isControlled ? checked : internalChecked;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) setInternalChecked(e.target.checked);
    onChange?.(e.target.checked);
  };

  return (
    <label
      className={clsx(styles.root, styles[`size--${size}`], className)}
      data-disabled={disabled || undefined}
    >
      <span className={styles.toggle}>
        <input
          type="checkbox"
          className={styles.input}
          checked={isChecked}
          onChange={handleChange}
          disabled={disabled}
          aria-label={label}
        />
        <span className={styles.track} />
        <span className={styles.thumb} />
      </span>
      {showLabel && <span className={styles.label}>{label}</span>}
    </label>
  );
};
