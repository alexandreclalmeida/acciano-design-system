import React from 'react';
import clsx from 'clsx';
import styles from './FileList.module.css';

export interface FileListProps {
  children?: React.ReactNode;
  className?: string;
}

export const FileList: React.FC<FileListProps> = ({ children, className }) => {
  return (
    <div className={clsx(styles.list, className)}>
      {children}
    </div>
  );
};
