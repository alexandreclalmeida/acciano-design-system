import React from 'react';
import clsx from 'clsx';
import type { LucideIcon } from 'lucide-react';
import { ButtonGroupContext } from '../ButtonGroup/ButtonGroupContext';
import styles from './Button.module.css';

export type ButtonVariant = 'Primary' | 'Secondary' | 'Tertiary';
export type ButtonTone = 'Brand' | 'Neutral' | 'Critical' | 'Inverse';
export type ButtonSize = 'Large' | 'Medium' | 'Small';

export interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  tone?: ButtonTone;
  size?: ButtonSize;
  disabled?: boolean;
  leadingIcon?: LucideIcon;
  trailingIcon?: LucideIcon;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

const ICON_SIZE: Record<ButtonSize, number> = { Large: 24, Medium: 20, Small: 16 };

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'Primary',
  tone = 'Brand',
  size: sizeProp,
  disabled = false,
  leadingIcon: LeadingIcon,
  trailingIcon: TrailingIcon,
  onClick,
  type = 'button',
  className,
}) => {
  const groupSize = React.useContext(ButtonGroupContext);
  const size = sizeProp ?? groupSize ?? 'Medium';

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        styles.root,
        styles[`variant--${variant}`],
        styles[`tone--${tone}`],
        styles[`size--${size}`],
        className,
      )}
    >
      <span className={styles.content}>
        {LeadingIcon && <LeadingIcon size={ICON_SIZE[size]} className={styles.icon} />}
        <span className={styles.label}>{children}</span>
        {TrailingIcon && <TrailingIcon size={ICON_SIZE[size]} className={styles.icon} />}
      </span>
    </button>
  );
};
