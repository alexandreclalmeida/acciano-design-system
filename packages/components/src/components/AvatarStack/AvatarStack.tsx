import React from 'react';
import clsx from 'clsx';
import type { AvatarSize } from '../Avatar';
import styles from './AvatarStack.module.css';

export interface AvatarStackProps {
  size?: AvatarSize;
  /** Número máximo de avatares visíveis antes do chip de overflow */
  max?: number;
  children: React.ReactNode;
  className?: string;
}

export const AvatarStack: React.FC<AvatarStackProps> = ({
  size = 'Medium',
  max = 5,
  children,
  className,
}) => {
  const all = React.Children.toArray(children);
  const visible = all.slice(0, max);
  const overflow = all.length - visible.length;

  return (
    <div className={clsx(styles.root, className)}>
      {visible.map((child, i) => (
        <div
          key={i}
          className={clsx(styles.slot, styles[`slot--${size}`])}
          style={{ zIndex: i + 1 }}
        >
          {child}
        </div>
      ))}
      {overflow > 0 && (
        <div
          className={clsx(styles.slot, styles[`slot--${size}`])}
          style={{ zIndex: visible.length + 1 }}
        >
          <div className={clsx(styles.overflow, styles[`overflow--${size}`])}>
            <span className={clsx(styles.overflowText, styles[`overflowText--${size}`])}>
              {overflow > 99 ? '99+' : `+${overflow}`}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
