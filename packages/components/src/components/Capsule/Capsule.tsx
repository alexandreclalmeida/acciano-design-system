import React from 'react';
import clsx from 'clsx';
import type { LucideIcon } from 'lucide-react';
import styles from './Capsule.module.css';

export type CapsuleTone =
  | 'Brand'
  | 'Neutral'
  | 'Info'
  | 'Success'
  | 'Warning'
  | 'Critical'
  | 'Alter'
  | 'Inverse';

export type CapsuleVariant = 'Filled' | 'Stroked';

export interface CapsuleProps {
  tone?: CapsuleTone;
  variant?: CapsuleVariant;
  icon: LucideIcon;
  className?: string;
}

export const Capsule: React.FC<CapsuleProps> = ({
  tone = 'Brand',
  variant = 'Filled',
  icon: Icon,
  className,
}) => (
  <span
    className={clsx(
      styles.capsule,
      styles[`tone--${tone}`],
      styles[`variant--${variant}`],
      className,
    )}
  >
    <Icon size={24} />
  </span>
);
