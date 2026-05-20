import React from 'react';
import { clsx } from 'clsx';
import { Info, CheckCircle2, AlertTriangle, AlertCircle, X } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { AlertTone } from '../Alert/Alert';
import styles from './AlertGlobal.module.css';

const DEFAULT_ICONS: Record<AlertTone, LucideIcon> = {
  Neutral: Info,
  Brand: Info,
  Info: Info,
  Success: CheckCircle2,
  Warning: AlertTriangle,
  Critical: AlertCircle,
  InvNeutral: Info,
  InvBrand: Info,
};

export interface AlertGlobalProps {
  /** Visual tone — controls background, border and icon colors */
  tone?: AlertTone;
  /** Device layout mode */
  device?: 'Desktop' | 'Mobile';
  /** Show icon */
  showIcon?: boolean;
  /** Show close button */
  showClose?: boolean;
  /** Override the default tone icon */
  icon?: LucideIcon;
  /** Alert message */
  children: React.ReactNode;
  /** Button group slot */
  buttons?: React.ReactNode;
  /** Close button callback */
  onClose?: () => void;
}

export const AlertGlobal: React.FC<AlertGlobalProps> = ({
  tone = 'Neutral',
  device = 'Desktop',
  showIcon = true,
  showClose = true,
  icon,
  children,
  buttons,
  onClose,
}) => {
  const IconComponent = icon ?? DEFAULT_ICONS[tone];
  const isMobile = device === 'Mobile';

  return (
    <div
      className={clsx(
        styles.alertGlobal,
        styles[`tone--${tone}`],
        styles[`device--${device}`],
      )}
      role="alert"
    >
      <div className={styles.container}>
        {showIcon && (
          <div className={styles.iconWrap} aria-hidden="true">
            <IconComponent size={24} />
          </div>
        )}

        <div className={styles.content}>
          <p className={styles.body}>{children}</p>
          {isMobile && buttons && (
            <div className={styles.buttonsSlot}>{buttons}</div>
          )}
        </div>

        {!isMobile && buttons && (
          <div className={styles.buttonsSlot}>{buttons}</div>
        )}

        {showClose && (
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close alert"
            type="button"
          >
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  );
};
