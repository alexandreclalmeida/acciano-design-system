import React from 'react';
import clsx from 'clsx';
import type { LucideIcon } from 'lucide-react';
import { Badge } from '../Badge/Badge';
import { Count } from '../Count/Count';
import { Divider } from '../Divider/Divider';
import { Slot } from '../Slot/Slot';
import styles from './NavigationSideItem.module.css';

export type NavSideItemType =
  | 'Default'
  | 'Header'
  | 'Divider'
  | 'DividerFull'
  | 'Slot'
  | 'Alert'
  | 'Button'
  | 'Search'
  | 'Avatar';

export interface NavigationSideItemProps {
  type?: NavSideItemType;
  /** Label text — used by Default and Header */
  label?: string;
  /** Leading icon (Default only) */
  icon?: LucideIcon;
  /** Selected state (Default only) */
  selected?: boolean;
  /** Disabled state (Default only) */
  disabled?: boolean;
  /** Badge label (Default only) */
  badge?: string;
  /** Badge icon (Default only) */
  badgeIcon?: LucideIcon;
  /** Count value (Default only) */
  count?: number;
  /** Renders as <a> when provided (Default only) */
  href?: string;
  /** Renders as <button> when provided (Default only) */
  onClick?: () => void;
  /** Alert heading (Alert only) */
  alertHeading?: string;
  /** Alert body text (Alert only) */
  alertDescription?: string;
  /** Content slot for Button, Search, Avatar, Slot types */
  children?: React.ReactNode;
  className?: string;
}

export const NavigationSideItem: React.FC<NavigationSideItemProps> = ({
  type = 'Default',
  label,
  icon: Icon,
  selected = false,
  disabled = false,
  badge,
  badgeIcon,
  count,
  href,
  onClick,
  alertHeading,
  alertDescription,
  children,
  className,
}) => {
  const baseClass = clsx(
    styles.item,
    styles[`type--${type}`],
    type === 'Default' && selected && styles.selected,
    type === 'Default' && disabled && styles.disabled,
    className,
  );

  // ── Header ──────────────────────────────────────────────────
  if (type === 'Header') {
    return (
      <div className={baseClass}>
        <span className={styles.headerLabel}>{label}</span>
      </div>
    );
  }

  // ── Dividers ─────────────────────────────────────────────────
  if (type === 'Divider' || type === 'DividerFull') {
    return (
      <div className={baseClass}>
        <Divider contrast="Low" className={styles.dividerLine} />
      </div>
    );
  }

  // ── Slot ──────────────────────────────────────────────────────
  if (type === 'Slot') {
    return (
      <div className={baseClass}>
        <div className={styles.fillContent}>
          {children ?? <Slot />}
        </div>
      </div>
    );
  }

  // ── Alert ─────────────────────────────────────────────────────
  if (type === 'Alert') {
    return (
      <div className={baseClass}>
        <div className={styles.alertCard}>
          <div className={styles.alertCardInner}>
            {alertHeading && <p className={styles.alertHeading}>{alertHeading}</p>}
            {alertDescription && <p className={styles.alertDesc}>{alertDescription}</p>}
          </div>
        </div>
      </div>
    );
  }

  // ── Button / Search / Avatar ──────────────────────────────────
  if (type === 'Button' || type === 'Search') {
    return (
      <div className={baseClass}>
        <div className={styles.fillContent}>{children}</div>
      </div>
    );
  }

  if (type === 'Avatar') {
    return (
      <div className={baseClass}>{children}</div>
    );
  }

  // ── Default ───────────────────────────────────────────────────
  const content = (
    <>
      {Icon && <Icon size={24} className={styles.icon} aria-hidden />}
      <span className={styles.label}>{label}</span>
      {badge && (
        <Badge
          label={badge}
          tone="Brand"
          size="Small"
          icon={badgeIcon}
          className={styles.badgeSlot}
        />
      )}
      {count !== undefined && (
        <Count emphasis="Strong" className={styles.countSlot}>
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
        aria-disabled={disabled || undefined}
        aria-current={selected ? 'page' : undefined}
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
        disabled={disabled}
        onClick={onClick}
        aria-current={selected ? 'page' : undefined}
        className={baseClass}
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
