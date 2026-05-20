import React from 'react';
import { clsx } from 'clsx';
import { Info, CheckCircle2, AlertTriangle, AlertCircle, X } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import styles from './Alert.module.css';

export type AlertTone =
  | 'Neutral'
  | 'Brand'
  | 'Info'
  | 'Success'
  | 'Warning'
  | 'Critical'
  | 'InvNeutral'
  | 'InvBrand';

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

export interface AlertProps {
  /** Visual tone — controls background, border, bar and icon colors */
  tone?: AlertTone;
  /** Layout direction */
  layout?: 'Horizontal' | 'Vertical';
  /** Size variant */
  size?: 'Large' | 'Small';
  /** Show colored left bar */
  showBar?: boolean;
  /** Show icon (default true); uses tone-default icon when no icon prop is given */
  showIcon?: boolean;
  /** Show icon inside a circular capsule instead of bare */
  showCapsule?: boolean;
  /** Show close button */
  showClose?: boolean;
  /** Override the default tone icon */
  icon?: LucideIcon;
  /** Alert heading */
  heading?: string;
  /** Alert body/description */
  children: React.ReactNode;
  /** Optional bullet list items */
  list?: string[];
  /** Link button slot (e.g. <LinkButton>) */
  link?: React.ReactNode;
  /** Button group slot (e.g. <Button> or <ButtonGroup>) */
  buttons?: React.ReactNode;
  /** Close button callback */
  onClose?: () => void;
}

export const Alert: React.FC<AlertProps> = ({
  tone = 'Neutral',
  layout = 'Horizontal',
  size = 'Large',
  showBar = true,
  showIcon = true,
  showCapsule = false,
  showClose = true,
  icon,
  heading,
  children,
  list,
  link,
  buttons,
  onClose,
}) => {
  const IconComponent = icon ?? DEFAULT_ICONS[tone];
  const renderBareIcon = showIcon && !showCapsule;

  return (
    <div
      className={clsx(
        styles.alert,
        styles[`tone--${tone}`],
        styles[`size--${size}`],
        styles[`layout--${layout}`],
      )}
      role="alert"
    >
      {showBar && <div className={styles.bar} aria-hidden="true" />}

      <div className={styles.container}>
        {renderBareIcon && (
          <div className={styles.iconWrap} aria-hidden="true">
            <IconComponent size={24} />
          </div>
        )}

        {showCapsule && (
          <div className={styles.capsule} aria-hidden="true">
            <IconComponent size={24} />
          </div>
        )}

        {size === 'Large' ? (
          <div className={styles.content}>
            {heading && <p className={styles.heading}>{heading}</p>}
            <div className={styles.elements}>
              <p className={styles.body}>{children}</p>
              {list && list.length > 0 && (
                <ul className={styles.list}>
                  {list.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}
              {link && <div className={styles.linkSlot}>{link}</div>}
              {buttons && <div className={styles.buttonsSlot}>{buttons}</div>}
            </div>
          </div>
        ) : (
          <div className={styles.content}>
            <div className={styles.textArea}>
              {heading && <p className={styles.heading}>{heading}</p>}
              <p className={styles.body}>{children}</p>
              {list && list.length > 0 && (
                <ul className={styles.list}>
                  {list.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
            {link && <div className={styles.linkSlot}>{link}</div>}
            {buttons && <div className={styles.buttonsSlot}>{buttons}</div>}
          </div>
        )}

        {showClose && (
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close alert"
            type="button"
          >
            <X size={24} />
          </button>
        )}
      </div>
    </div>
  );
};
