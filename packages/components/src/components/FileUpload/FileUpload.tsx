import React from 'react';
import clsx from 'clsx';
import { Upload, AlertCircle } from 'lucide-react';
import { Button } from '../Button/Button';
import styles from './FileUpload.module.css';

export interface FileUploadProps {
  label?: string;
  hideLabel?: boolean;
  required?: boolean;
  optional?: boolean;
  id?: string;
  name?: string;
  accept?: string;
  multiple?: boolean;
  maxSizeLabel?: string;
  error?: boolean;
  helperText?: string;
  onChange?: (files: File[]) => void;
  disabled?: boolean;
  className?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  label,
  hideLabel = false,
  required = false,
  optional = false,
  id: idProp,
  name,
  accept,
  multiple = true,
  maxSizeLabel = 'Maximum file size: 5MB',
  error = false,
  helperText,
  onChange,
  disabled = false,
  className,
}) => {
  const generatedId = React.useId();
  const id = idProp ?? generatedId;
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = React.useState(false);

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    onChange?.(Array.from(fileList));
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!disabled) setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDragging(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (!disabled) handleFiles(e.dataTransfer.files);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
    e.target.value = '';
  };

  const helperRole = error ? 'critical' : 'hint';

  return (
    <div className={clsx(styles.root, className)}>
      {!hideLabel && label && (
        <label htmlFor={id} className={styles.label}>
          <span className={styles.labelText}>{label}</span>
          {required && <span className={styles.labelRequired}>*</span>}
          {optional && !required && <span className={styles.labelOptional}>(optional)</span>}
        </label>
      )}

      <div
        className={clsx(
          styles.dropArea,
          error && styles['dropArea--error'],
          isDragging && !error && styles['dropArea--dragging'],
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        aria-disabled={disabled || undefined}
      >
        <div className={styles.container}>
          <div className={clsx(styles.iconCapsule, error && styles['iconCapsule--error'])}>
            <Upload
              size={24}
              className={clsx(styles.uploadIcon, error && styles['uploadIcon--error'])}
              aria-hidden
            />
          </div>
          <div className={styles.dropText}>
            <span className={styles.dropHeading}>Drag and drop files here</span>
            <span className={styles.dropSubtext}>{maxSizeLabel}</span>
          </div>
        </div>

        <Button
          variant="Secondary"
          tone={error ? 'Neutral' : 'Brand'}
          size="Small"
          type="button"
          disabled={disabled}
          onClick={() => inputRef.current?.click()}
        >
          Browse files
        </Button>

        <input
          ref={inputRef}
          id={id}
          name={name}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={handleInputChange}
          className={styles.hiddenInput}
          aria-describedby={helperText ? `${id}-helper` : undefined}
          tabIndex={-1}
        />
      </div>

      {helperText && (
        <div
          id={`${id}-helper`}
          className={clsx(
            styles.helper,
            helperRole === 'critical' && styles['helper--critical'],
          )}
          aria-live={helperRole === 'critical' ? 'polite' : undefined}
        >
          {helperRole === 'critical' && (
            <AlertCircle size={20} className={styles.helperIcon} aria-hidden />
          )}
          <span>{helperText}</span>
        </div>
      )}
    </div>
  );
};
