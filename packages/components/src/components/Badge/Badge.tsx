import React from 'react';
import clsx from 'clsx';
import type { LucideIcon } from 'lucide-react';
import { Dot } from '../Dot';
import type { DotType } from '../Dot';
import styles from './Badge.module.css';

export type BadgeTone =
  | 'Brand'
  | 'Neutral'
  | 'Info'
  | 'Success'
  | 'Warning'
  | 'Critical'
  | 'Alter';

export type BadgeSize = 'Medium' | 'Small';

export interface BadgeProps {
  label: string;
  tone?: BadgeTone;
  size?: BadgeSize;
  icon?: LucideIcon;
  dot?: boolean;
  dotType?: DotType;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  tone = 'Brand',
  size = 'Medium',
  icon: Icon,
  dot = false,
  dotType = 'Info',
  className,
}) => (
  <span
    className={clsx(
      styles.badge,
      styles[`tone--${tone}`],
      styles[`size--${size}`],
      className,
    )}
  >
    {Icon && !dot && (
      <span className={styles.iconSlot}>
        <Icon size={size === 'Small' ? 16 : 20} />
      </span>
    )}
    {dot && !Icon && (
      <span className={styles.dotSlot}>
        <Dot size="Medium" type={dotType} />
      </span>
    )}
    <span className={styles.label}>{label}</span>
  </span>
);
