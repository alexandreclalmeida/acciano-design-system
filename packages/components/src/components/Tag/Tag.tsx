import React from 'react';
import clsx from 'clsx';
import { Check, X } from 'lucide-react';
import styles from './Tag.module.css';

export type TagSize = 'Medium' | 'Small';

export interface TagProps {
  label: string;
  size?: TagSize;
  selected?: boolean;
  disabled?: boolean;
  onDismiss?: (e: React.MouseEvent) => void;
  onClick?: () => void;
  className?: string;
}

export const Tag: React.FC<TagProps> = ({
  label,
  size = 'Medium',
  selected = false,
  disabled = false,
  onDismiss,
  onClick,
  className,
}) => {
  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDismiss?.(e);
  };

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        styles.tag,
        styles[`size--${size}`],
        selected && styles['state--selected'],
        className,
      )}
    >
      {selected && <Check size={size === 'Small' ? 16 : 20} className={styles.checkIcon} />}
      <span className={styles.label}>{label}</span>
      {onDismiss && (
        <span
          role="button"
          aria-label="Remove"
          tabIndex={disabled ? -1 : 0}
          onClick={handleDismiss}
          onKeyDown={(e) => e.key === 'Enter' && handleDismiss(e as unknown as React.MouseEvent)}
          className={styles.dismissIcon}
        >
          <X size={16} />
        </span>
      )}
    </button>
  );
};
