import React from 'react';
import clsx from 'clsx';
import styles from './Slider.module.css';

export interface SliderProps {
  label?: string;
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  showLabel?: boolean;
  disabled?: boolean;
  onChange?: (value: number) => void;
  className?: string;
}

export const Slider: React.FC<SliderProps> = ({
  label = 'Label',
  value,
  defaultValue = 0,
  min = 0,
  max = 100,
  step = 1,
  showLabel = true,
  disabled = false,
  onChange,
  className,
}) => {
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;
  const clamped = Math.min(max, Math.max(min, currentValue));
  const pct = max > min ? (clamped - min) / (max - min) : 0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = Number(e.target.value);
    if (!isControlled) setInternalValue(next);
    onChange?.(next);
  };

  return (
    <div
      className={clsx(styles.root, className)}
      style={{ '--pct': pct } as React.CSSProperties}
      data-disabled={disabled || undefined}
    >
      {showLabel && (
        <div className={styles.labelRow}>
          <span className={styles.labelText}>{label}</span>
          <span className={styles.valueText}>{Math.round(pct * 100)}%</span>
        </div>
      )}
      <div className={styles.trackWrapper}>
        <div className={styles.track}>
          <div className={styles.bar}>
            <div className={styles.handle} />
          </div>
        </div>
        <input
          type="range"
          className={styles.input}
          min={min}
          max={max}
          step={step}
          value={clamped}
          onChange={handleChange}
          disabled={disabled}
          aria-label={label}
        />
      </div>
    </div>
  );
};
