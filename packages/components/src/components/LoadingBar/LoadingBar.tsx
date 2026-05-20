import React from 'react';
import clsx from 'clsx';
import styles from './LoadingBar.module.css';

export interface LoadingBarProps {
  value?: number;
  showLabel?: boolean;
  className?: string;
}

export const LoadingBar: React.FC<LoadingBarProps> = ({
  value = 0,
  showLabel = true,
  className,
}) => {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      className={clsx(styles.loadingBar, className)}
    >
      <div className={styles.track}>
        <div className={styles.bar} style={{ width: `${clamped}%` }} />
      </div>
      {showLabel && (
        <span className={styles.label}>{clamped}%</span>
      )}
    </div>
  );
};
