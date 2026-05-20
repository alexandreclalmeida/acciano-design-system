import React from 'react';
import clsx from 'clsx';
import type { LucideIcon } from 'lucide-react';
import { Count } from '../Count/Count';
import styles from './NavigationHeaderItem.module.css';

export interface NavigationHeaderItemProps {
  label: string;
  icon?: LucideIcon;
  count?: number;
  selected?: boolean;
  disabled?: boolean;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export const NavigationHeaderItem: React.FC<NavigationHeaderItemProps> = ({
  label,
  icon: Icon,
  count,
  selected = false,
  disabled = false,
  href,
  onClick,
  className,
}) => {
  const baseClass = clsx(
    styles.item,
    selected && styles['item--selected'],
    disabled && styles['item--disabled'],
    className,
  );

  const content = (
    <>
      {Icon && <Icon size={24} className={styles.icon} aria-hidden />}
      <span className={styles.label}>{label}</span>
      {count !== undefined && (
        <Count emphasis="Weak" className={styles.count}>
          {count}
        </Count>
      )}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={baseClass}
        aria-current={selected ? 'page' : undefined}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : undefined}
      >
        {content}
      </a>
    );
  }

  if (onClick) {
    return (
      <button
        type="button"
        className={baseClass}
        onClick={onClick}
        disabled={disabled}
        aria-current={selected ? 'page' : undefined}
      >
        {content}
      </button>
    );
  }

  return (
    <div className={baseClass} aria-current={selected ? 'page' : undefined}>
      {content}
    </div>
  );
};
