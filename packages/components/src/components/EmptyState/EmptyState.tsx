import React from 'react';
import clsx from 'clsx';
import styles from './EmptyState.module.css';

export interface EmptyStateProps {
  capsule?: React.ReactNode;
  heading?: string;
  description?: string;
  actions?: React.ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  capsule,
  heading,
  description,
  actions,
  className,
}) => (
  <div className={clsx(styles.root, className)}>
    {capsule}
    {(heading || description) && (
      <div className={styles.textGroup}>
        {heading && <h5 className={styles.heading}>{heading}</h5>}
        {description && <p className={styles.description}>{description}</p>}
      </div>
    )}
    {actions}
  </div>
);
