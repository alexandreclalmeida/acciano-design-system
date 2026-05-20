import React from 'react';
import clsx from 'clsx';
import type { LucideIcon } from 'lucide-react';
import styles from './LinkButton.module.css';

export type LinkButtonTone = 'link' | 'neutral' | 'critical' | 'inverse';
export type LinkButtonSize = 'base' | 'small';
export type LinkButtonWeight = 'regular' | 'bold';

export interface LinkButtonProps {
  children: React.ReactNode;
  tone?: LinkButtonTone;
  size?: LinkButtonSize;
  weight?: LinkButtonWeight;
  underline?: boolean;
  disabled?: boolean;
  leadingIcon?: LucideIcon;
  trailingIcon?: LucideIcon;
  href?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  className?: string;
}

export const LinkButton: React.FC<LinkButtonProps> = ({
  children,
  tone = 'link',
  size = 'base',
  weight = 'regular',
  underline = true,
  disabled = false,
  leadingIcon: LeadingIcon,
  trailingIcon: TrailingIcon,
  href,
  onClick,
  className,
}) => (
  <a
    href={disabled ? undefined : href}
    onClick={disabled ? undefined : onClick}
    aria-disabled={disabled || undefined}
    tabIndex={disabled ? -1 : 0}
    className={clsx(
      styles.root,
      styles[`tone--${tone}`],
      styles[`size--${size}`],
      styles[`weight--${weight}`],
      underline && styles.underline,
      disabled && styles.disabled,
      className,
    )}
  >
    {LeadingIcon && <LeadingIcon size={20} className={styles.icon} />}
    {children}
    {TrailingIcon && <TrailingIcon size={20} className={styles.icon} />}
  </a>
);
