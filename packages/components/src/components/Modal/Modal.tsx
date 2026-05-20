import React from 'react';
import { createPortal } from 'react-dom';
import { clsx } from 'clsx';
import { X } from 'lucide-react';
import { ButtonGroupContext } from '../ButtonGroup/ButtonGroupContext';
import styles from './Modal.module.css';

export type ModalSize = 'Small' | 'Large';

export interface ModalProps {
  /** Whether the modal is open */
  open: boolean;
  /** Called when the user requests to close (Escape, backdrop click, close button) */
  onClose?: () => void;
  /** Dialog width: Small = 500px, Large = 700px */
  size?: ModalSize;
  /** Show × close button */
  showClose?: boolean;
  /** Icon capsule slot — pass <Capsule tone="…" icon={…} /> */
  capsule?: React.ReactNode;
  /** Dialog heading */
  heading?: string;
  /** Body text or rich content */
  description?: React.ReactNode;
  /** Top image URL (object-cover, 245px tall) */
  image?: string;
  /** Slot content (forms, lists, custom components) */
  children?: React.ReactNode;
  /** Button group — render prop receives onClose so buttons can close the modal */
  buttons?: (onClose: () => void) => React.ReactNode;
  /** aria-label for the dialog when no heading is provided */
  'aria-label'?: string;
}

export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  size = 'Small',
  showClose = false,
  capsule,
  heading,
  description,
  image,
  children,
  buttons,
  'aria-label': ariaLabel,
}) => {
  const dialogRef = React.useRef<HTMLDivElement>(null);
  const headingId = React.useId();

  // Focus dialog on open
  React.useEffect(() => {
    if (open) {
      dialogRef.current?.focus();
    }
  }, [open]);

  // Escape key closes modal
  React.useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose?.();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  // Body scroll lock
  React.useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  const hasCapsuleOrText = capsule || heading || description;

  const dialog = (
    <div
      className={styles.backdrop}
      onClick={onClose}
      aria-hidden="false"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={heading ? headingId : undefined}
        aria-label={!heading ? ariaLabel : undefined}
        tabIndex={-1}
        className={clsx(styles.dialog, styles[`size--${size}`])}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Content area */}
        <div className={styles.content}>
          {image && (
            <img
              className={styles.image}
              src={image}
              alt=""
              aria-hidden="true"
            />
          )}

          {hasCapsuleOrText && (
            <div className={styles.capsuleAndText}>
              {capsule && <div className={styles.capsuleSlot}>{capsule}</div>}

              {(heading || description) && (
                <div className={styles.text}>
                  {heading && (
                    <div className={clsx(styles.headingRow, showClose && styles['headingRow--withClose'])}>
                      <p id={headingId} className={styles.heading}>{heading}</p>
                    </div>
                  )}
                  {description && (
                    <p className={styles.description}>{description}</p>
                  )}
                </div>
              )}
            </div>
          )}

          {children && <div className={styles.slot}>{children}</div>}
        </div>

        {buttons && (
          <ButtonGroupContext.Provider value="Medium">
            <div className={styles.buttons}>{buttons(onClose ?? (() => {}))}</div>
          </ButtonGroupContext.Provider>
        )}

        {showClose && (
          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        )}
      </div>
    </div>
  );

  return createPortal(dialog, document.body);
};
