import React from 'react';
import { createPortal } from 'react-dom';
import { clsx } from 'clsx';
import { X } from 'lucide-react';
import { ButtonGroup } from '../ButtonGroup/ButtonGroup';
import styles from './Drawer.module.css';

export type DrawerSize = 'Small' | 'Large';

export interface DrawerProps {
  open: boolean;
  onClose?: () => void;
  size?: DrawerSize;
  heading?: string;
  children?: React.ReactNode;
  buttons?: (onClose: () => void) => React.ReactNode;
  'aria-label'?: string;
}

export const Drawer: React.FC<DrawerProps> = ({
  open,
  onClose,
  size = 'Small',
  heading,
  children,
  buttons,
  'aria-label': ariaLabel,
}) => {
  const panelRef = React.useRef<HTMLDivElement>(null);
  const headingId = React.useId();

  const [mounted, setMounted] = React.useState(open);
  const [isIn, setIsIn] = React.useState(false);

  React.useEffect(() => {
    if (open) {
      setMounted(true);
    } else {
      setIsIn(false);
    }
  }, [open]);

  React.useEffect(() => {
    if (!mounted) return;
    if (open) {
      const id = requestAnimationFrame(() => setIsIn(true));
      return () => cancelAnimationFrame(id);
    } else {
      const t = setTimeout(() => setMounted(false), 300);
      return () => clearTimeout(t);
    }
  }, [mounted, open]);

  React.useEffect(() => {
    if (isIn) panelRef.current?.focus();
  }, [isIn]);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose?.(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  React.useEffect(() => {
    if (!mounted) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [mounted]);

  if (!mounted) return null;

  return createPortal(
    <div className={styles.root}>
      <div
        className={clsx(styles.backdrop, isIn && styles['backdrop--in'])}
        onClick={onClose}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={heading ? headingId : undefined}
        aria-label={!heading ? ariaLabel : undefined}
        tabIndex={-1}
        className={clsx(styles.panel, styles[`size--${size}`], isIn && styles['panel--in'])}
      >
        <div className={styles.header}>
          <div className={styles.headingWrap}>
            {heading && (
              <p id={headingId} className={styles.heading}>{heading}</p>
            )}
          </div>
          {!buttons && (
            <button
              type="button"
              className={styles.closeBtn}
              onClick={onClose}
              aria-label="Close drawer"
            >
              <X size={20} className={styles.closeIcon} />
            </button>
          )}
        </div>

        <div className={styles.content}>
          {children}
        </div>

        {buttons && (
          <div className={styles.footer}>
            <ButtonGroup layout="Horizontal" className={styles.buttonGroup}>
              {buttons(onClose ?? (() => {}))}
            </ButtonGroup>
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
};
