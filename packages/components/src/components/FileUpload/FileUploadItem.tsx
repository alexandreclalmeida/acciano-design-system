import React from 'react';
import clsx from 'clsx';
import { File as FileIcon, X } from 'lucide-react';
import { LoadingBar } from '../LoadingBar/LoadingBar';
import styles from './FileUploadItem.module.css';

export interface FileUploadItemProps {
  name: string;
  size?: string;
  status?: 'uploading' | 'uploaded';
  progress?: number;
  href?: string;
  onRemove?: () => void;
  className?: string;
}

export const FileUploadItem: React.FC<FileUploadItemProps> = ({
  name,
  size,
  status = 'uploaded',
  progress = 0,
  href,
  onRemove,
  className,
}) => {
  const isUploading = status === 'uploading';

  return (
    <div className={clsx(styles.item, className)}>
      <div className={styles.capsule}>
        <FileIcon size={24} className={styles.fileIcon} aria-hidden />
      </div>

      <div className={styles.text}>
        {!isUploading && href ? (
          <a href={href} className={styles['name--link']} download>
            {name}
          </a>
        ) : (
          <span className={clsx(styles.name, !isUploading && styles['name--uploaded'])}>{name}</span>
        )}
        {size && <span className={styles.fileSize}>{size}</span>}
      </div>

      {isUploading && (
        <div className={styles.progressWrap}>
          <LoadingBar value={progress} showLabel={false} />
        </div>
      )}

      <button
        type="button"
        className={styles.removeBtn}
        onClick={onRemove}
        aria-label={`Remove ${name}`}
      >
        <X size={16} className={styles.removeIcon} aria-hidden />
      </button>
    </div>
  );
};
