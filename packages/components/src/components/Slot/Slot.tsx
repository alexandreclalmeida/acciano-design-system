import React from 'react';
import clsx from 'clsx';
import styles from './Slot.module.css';

export interface SlotProps {
  label?: string;
  className?: string;
}

export const Slot: React.FC<SlotProps> = ({
  label = 'Swap with another component',
  className,
}) => (
  <div className={clsx(styles.slot, className)}>
    <p className={styles.label}>{label}</p>
  </div>
);
