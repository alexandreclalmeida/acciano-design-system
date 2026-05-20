import React from 'react';
import { clsx } from 'clsx';
import {
  DotInfoIcon,
  DotSuccessIcon,
  DotOnlineIcon,
  DotWarningIcon,
  DotAwayIcon,
  DotCriticalIcon,
  DotBusyIcon,
  DotOfflineIcon,
} from '@acciano/icons';
import styles from './Dot.module.css';

export type DotType =
  | 'Info'
  | 'Success'
  | 'Online'
  | 'Warning'
  | 'Away'
  | 'Critical'
  | 'Busy'
  | 'Offline'
  | 'Notification';

export type DotSize = 'Large' | 'Medium' | 'Small';

export interface DotProps {
  type?: DotType;
  size?: DotSize;
  /** Anel ao redor do dot para separação visual em fundos coloridos */
  outline?: boolean;
  className?: string;
}

const SVG_ICONS: Partial<Record<DotType, React.FC<React.SVGProps<SVGSVGElement>>>> = {
  Info: DotInfoIcon,
  Success: DotSuccessIcon,
  Online: DotOnlineIcon,
  Warning: DotWarningIcon,
  Away: DotAwayIcon,
  Critical: DotCriticalIcon,
  Busy: DotBusyIcon,
  Offline: DotOfflineIcon,
};

const ARIA_LABELS: Record<DotType, string> = {
  Info: 'Info',
  Success: 'Success',
  Online: 'Online',
  Warning: 'Warning',
  Away: 'Away',
  Critical: 'Critical',
  Busy: 'Busy',
  Offline: 'Offline',
  Notification: 'Notification',
};

export const Dot: React.FC<DotProps> = ({
  type = 'Info',
  size = 'Large',
  outline = false,
  className,
}) => {
  const SvgIcon = SVG_ICONS[type];
  const showSvg = Boolean(SvgIcon) && size !== 'Small';

  return (
    <span
      role="img"
      aria-label={ARIA_LABELS[type]}
      className={clsx(
        styles.dot,
        styles[`size--${size}`],
        !showSvg && styles[`type--${type}`],
        outline && styles.outline,
        className,
      )}
    >
      {showSvg && SvgIcon && <SvgIcon width="100%" height="100%" />}
    </span>
  );
};
