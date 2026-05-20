import React from 'react';
import clsx from 'clsx';
import { Dot } from '../Dot';
import { Count } from '../Count';
import { ButtonGroupContext } from '../ButtonGroup/ButtonGroupContext';
import styles from './IconButton.module.css';

export type IconButtonVariant = 'Primary' | 'Secondary' | 'Tertiary';
export type IconButtonTone = 'Brand' | 'Neutral' | 'Critical' | 'Inverse';
export type IconButtonSize = 'Large' | 'Medium' | 'Small';
export type IconButtonShape = 'Square' | 'Circle';

export interface IconButtonProps {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  variant?: IconButtonVariant;
  tone?: IconButtonTone;
  size?: IconButtonSize;
  shape?: IconButtonShape;
  disabled?: boolean;
  showDot?: boolean;
  showCount?: boolean;
  count?: number;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  'aria-label'?: string;
}

const ICON_SIZE: Record<IconButtonSize, number> = {
  Large: 32,
  Medium: 24,
  Small: 16,
};

export const IconButton: React.FC<IconButtonProps> = ({
  icon: Icon,
  variant = 'Primary',
  tone = 'Brand',
  size: sizeProp,
  shape = 'Square',
  disabled = false,
  showDot = false,
  showCount = false,
  count,
  onClick,
  type = 'button',
  className,
  'aria-label': ariaLabel,
}) => {
  const groupSize = React.useContext(ButtonGroupContext);
  const size = sizeProp ?? groupSize ?? 'Medium';

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
      className={clsx(
        styles.root,
        styles[`variant--${variant}`],
        styles[`tone--${tone}`],
        styles[`size--${size}`],
        styles[`shape--${shape}`],
        className,
      )}
    >
      <Icon size={ICON_SIZE[size]} />
      {showDot && (
        <Dot type="Notification" size="Small" outline className={styles.dotBadge} />
      )}
      {showCount && count !== undefined && (
        <Count emphasis="Strong" className={styles.countBadge}>
          {count > 99 ? '99+' : count}
        </Count>
      )}
    </button>
  );
};
