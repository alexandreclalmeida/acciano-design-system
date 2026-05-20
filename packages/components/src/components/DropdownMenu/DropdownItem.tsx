import React from 'react';
import clsx from 'clsx';
import type { LucideIcon } from 'lucide-react';
import { Checkbox } from '../Checkbox/Checkbox';
import { Switch } from '../Switch/Switch';
import { Divider } from '../Divider/Divider';
import { AvatarLabelled } from '../AvatarLabelled/AvatarLabelled';
import type { AvatarSize } from '../Avatar/Avatar';
import styles from './DropdownItem.module.css';

export type DropdownItemType =
  | 'Single'
  | 'Dual'
  | 'Checkbox'
  | 'Avatar'
  | 'Heading'
  | 'Divider'
  | 'Critical';

export interface DropdownItemConfig {
  type?: DropdownItemType;
  label?: string;
  /** Dual: linha de subtítulo abaixo do label */
  description?: string;
  /** Single, Dual, Critical */
  leadingIcon?: LucideIcon;
  /** Single, Dual, Critical, Checkbox, Avatar */
  trailingIcon?: LucideIcon;
  badge?: string;
  count?: number;
  /** Checkbox: estado controlado */
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  /** Single, Dual, Critical com toggle */
  switchChecked?: boolean;
  onSwitchChange?: (checked: boolean) => void;
  /** Avatar */
  avatarSrc?: string;
  avatarName?: string;
  avatarEmail?: string;
  avatarSize?: AvatarSize;
  disabled?: boolean;
  onClick?: () => void;
}

interface DropdownItemProps extends DropdownItemConfig {
  className?: string;
}

export const DropdownItem: React.FC<DropdownItemProps> = ({
  type = 'Single',
  label,
  description,
  leadingIcon: LeadingIcon,
  trailingIcon: TrailingIcon,
  badge,
  count,
  checked,
  onCheckedChange,
  switchChecked,
  onSwitchChange,
  avatarSrc,
  avatarName = '',
  avatarEmail,
  avatarSize = 'Medium',
  disabled = false,
  onClick,
  className,
}) => {
  const isCritical = type === 'Critical';
  const hasSwitch = switchChecked !== undefined;

  // Estado interno para Checkbox uncontrolled
  const [internalChecked, setInternalChecked] = React.useState(false);
  const isCheckedControlled = checked !== undefined;
  const currentChecked = isCheckedControlled ? checked! : internalChecked;

  const handleCheck = (newChecked: boolean) => {
    if (!isCheckedControlled) setInternalChecked(newChecked);
    onCheckedChange?.(newChecked);
  };

  // ─── Trailing elements ─────────────────────────────────────────────────
  const trailing = (
    <>
      {hasSwitch && (
        <span onClick={(e) => e.stopPropagation()}>
          <Switch
            checked={switchChecked}
            onChange={onSwitchChange}
            disabled={disabled}
            showLabel={false}
            label={label ?? ''}
            size="micro"
          />
        </span>
      )}
      {badge !== undefined && (
        <span className={clsx(styles.badge, isCritical && styles['badge--critical'])}>
          {badge}
        </span>
      )}
      {count !== undefined && (
        <span className={clsx(styles.count, isCritical && styles['count--critical'])}>
          {count}
        </span>
      )}
      {TrailingIcon && (
        <TrailingIcon
          size={20}
          className={clsx(styles.icon, isCritical && styles['icon--critical'])}
          aria-hidden
        />
      )}
    </>
  );

  // ─── Divider ────────────────────────────────────────────────────────────
  if (type === 'Divider') {
    return (
      <div className={clsx(styles.item, styles['item--divider'], className)}>
        <Divider contrast="Low" />
      </div>
    );
  }

  // ─── Heading ────────────────────────────────────────────────────────────
  if (type === 'Heading') {
    return (
      <div className={clsx(styles.item, styles['item--heading'], className)}>
        <span className={styles.labelHeading}>{label}</span>
      </div>
    );
  }

  // ─── Avatar ─────────────────────────────────────────────────────────────
  if (type === 'Avatar') {
    return (
      <div
        className={clsx(
          styles.item,
          styles['item--interactive'],
          disabled && styles['item--disabled'],
          className,
        )}
        onClick={!disabled ? onClick : undefined}
      >
        <div className={styles.content}>
          <AvatarLabelled name={avatarName} email={avatarEmail} src={avatarSrc} size={avatarSize} />
          {trailing}
        </div>
      </div>
    );
  }

  // ─── Checkbox ────────────────────────────────────────────────────────────
  if (type === 'Checkbox') {
    return (
      <div
        className={clsx(
          styles.item,
          styles['item--interactive'],
          disabled && styles['item--disabled'],
          className,
        )}
        onClick={!disabled ? () => handleCheck(!currentChecked) : undefined}
      >
        <div className={styles.content}>
          {/* stopPropagation evita double-toggle: Checkbox tem label própria */}
          <span onClick={(e) => e.stopPropagation()}>
            <Checkbox
              size="Small"
              checked={currentChecked}
              onChange={(e) => handleCheck(e.target.checked)}
              disabled={disabled}
            />
          </span>
          <span className={styles.label}>{label}</span>
          {trailing}
        </div>
      </div>
    );
  }

  // ─── Single / Dual / Critical ────────────────────────────────────────────
  const handleRowClick = () => {
    if (disabled) return;
    if (!hasSwitch) onClick?.();
  };

  return (
    <div
      className={clsx(
        styles.item,
        styles['item--interactive'],
        disabled && styles['item--disabled'],
        className,
      )}
      onClick={handleRowClick}
    >
      <div className={styles.content}>
        {LeadingIcon && (
          <LeadingIcon
            size={24}
            className={clsx(styles.icon, isCritical && styles['icon--critical'])}
            aria-hidden
          />
        )}

        {type === 'Dual' ? (
          <div className={styles.textGroup}>
            <span className={styles.label}>{label}</span>
            {description && <span className={styles.description}>{description}</span>}
          </div>
        ) : (
          <span className={clsx(styles.label, isCritical && styles['label--critical'])}>
            {label}
          </span>
        )}

        {trailing}
      </div>
    </div>
  );
};
