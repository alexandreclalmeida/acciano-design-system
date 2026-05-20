import React from 'react';
import clsx from 'clsx';
import { ChevronDown, ChevronUp, MoreVertical } from 'lucide-react';
import { AvatarLabelled } from '../AvatarLabelled';
import type { AvatarType } from '../Avatar';
import styles from './AvatarDropdown.module.css';

export type AvatarDropdownType = 'Button' | 'Navigation';

export interface AvatarDropdownProps {
  type?: AvatarDropdownType;
  size?: 'Medium' | 'Small';
  disabled?: boolean;
  /** Controla direção do chevron (Button) */
  isOpen?: boolean;
  name: string;
  email?: string;
  avatarType?: AvatarType;
  src?: string;
  initials?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

export const AvatarDropdown: React.FC<AvatarDropdownProps> = ({
  type = 'Button',
  size = 'Medium',
  disabled = false,
  isOpen = false,
  name,
  email,
  avatarType = 'Photo',
  src,
  initials,
  onClick,
  className,
}) => (
  <button
    type="button"
    disabled={disabled}
    onClick={onClick}
    className={clsx(
      styles.root,
      styles[`type--${type}`],
      disabled && styles.disabled,
      className,
    )}
  >
    <AvatarLabelled
      size={size}
      name={name}
      email={email}
      type={avatarType}
      src={src}
      initials={initials}
      className={type === 'Navigation' ? styles.labelFlex : undefined}
    />
    {type === 'Button' && (
      isOpen
        ? <ChevronUp size={24} className={styles.icon} />
        : <ChevronDown size={24} className={styles.icon} />
    )}
    {type === 'Navigation' && (
      <MoreVertical size={24} className={styles.icon} />
    )}
  </button>
);
