import React from 'react';
import clsx from 'clsx';
import { Avatar } from '../Avatar';
import type { AvatarType, AvatarSize } from '../Avatar';
import type { DotType } from '../Dot';
import styles from './AvatarLabelled.module.css';

export interface AvatarLabelledProps {
  size?: AvatarSize;
  name: string;
  /** Exibido apenas em Medium e Large */
  email?: string;
  type?: AvatarType;
  src?: string;
  initials?: string;
  status?: DotType;
  showNotification?: boolean;
  className?: string;
}

function deriveInitials(name: string): string {
  return name.trim().split(/\s+/).filter(Boolean).slice(0, 2).map(w => w[0].toUpperCase()).join('');
}

export const AvatarLabelled: React.FC<AvatarLabelledProps> = ({
  size = 'Medium',
  name,
  email,
  type = 'Photo',
  src,
  initials,
  status,
  showNotification = false,
  className,
}) => (
  <div className={clsx(styles.root, styles[`gap--${size}`], className)}>
    <Avatar
      type={type}
      size={size}
      src={src}
      initials={initials ?? deriveInitials(name)}
      status={status}
      showNotification={showNotification}
    />
    <div className={styles.text}>
      <span className={clsx(styles.name, styles[`name--${size}`])}>{name}</span>
      {size !== 'Small' && email && (
        <span className={styles.email}>{email}</span>
      )}
    </div>
  </div>
);
