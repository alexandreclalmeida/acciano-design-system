import React from 'react';
import clsx from 'clsx';
import styles from './TagGroup.module.css';

export interface TagGroupProps {
  children: React.ReactNode;
  className?: string;
}

export const TagGroup: React.FC<TagGroupProps> = ({ children, className }) => (
  <div className={clsx(styles.tagGroup, className)}>{children}</div>
);
