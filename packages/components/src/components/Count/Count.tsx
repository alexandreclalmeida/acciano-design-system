import React from 'react';
import clsx from 'clsx';
import styles from './Count.module.css';

export type CountEmphasis = 'Strong' | 'Moderate' | 'Weak';

export interface CountProps {
  emphasis?: CountEmphasis;
  children: React.ReactNode;
  className?: string;
}

export const Count: React.FC<CountProps> = ({
  emphasis = 'Strong',
  children,
  className,
}) => (
  <span className={clsx(styles.count, styles[`emphasis--${emphasis}`], className)}>
    {children}
  </span>
);
