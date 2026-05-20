import React from 'react';
import clsx from 'clsx';
import styles from './Divider.module.css';

export type DividerContrast = 'Low' | 'High';

export interface DividerProps {
  contrast?: DividerContrast;
  className?: string;
}

export const Divider: React.FC<DividerProps> = ({
  contrast = 'Low',
  className,
}) => (
  <hr className={clsx(styles.divider, styles[`contrast--${contrast}`], className)} />
);
