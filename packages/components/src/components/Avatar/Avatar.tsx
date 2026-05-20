import React from 'react';
import clsx from 'clsx';
import { User } from 'lucide-react';
import { Dot } from '../Dot';
import type { DotType, DotSize } from '../Dot';
import styles from './Avatar.module.css';

export type AvatarType = 'Photo' | 'Icon' | 'Initials';
export type AvatarSize = 'Large' | 'Medium' | 'Small';

export interface AvatarProps {
  type?: AvatarType;
  size?: AvatarSize;
  /** URL da imagem (Photo) */
  src?: string;
  alt?: string;
  /** Até 2 caracteres (Initials) */
  initials?: string;
  /** Badge de presença no canto inferior-direito */
  status?: DotType;
  /** Badge de notificação no canto superior-direito */
  showNotification?: boolean;
  className?: string;
}

const ICON_SIZE: Record<AvatarSize, number> = {
  Large: 32,
  Medium: 24,
  Small: 20,
};

const DOT_SIZE: Record<AvatarSize, DotSize> = {
  Small: 'Small',
  Medium: 'Medium',
  Large: 'Large',
};

export const Avatar: React.FC<AvatarProps> = ({
  type = 'Photo',
  size = 'Medium',
  src,
  alt = '',
  initials,
  status,
  showNotification = false,
  className,
}) => {
  const [imgError, setImgError] = React.useState(false);

  // Reset error state when src changes
  React.useEffect(() => {
    setImgError(false);
  }, [src]);

  // Fallback chain: Photo → Initials (if available) → Icon
  const resolvedType =
    type === 'Photo' && (!src || imgError)
      ? (initials ? 'Initials' : 'Icon')
      : type;

  return (
    <div
      className={clsx(
        styles.root,
        styles[`size--${size}`],
        (resolvedType === 'Icon' || resolvedType === 'Initials') && styles['type--filled'],
        className,
      )}
    >
      {resolvedType === 'Photo' && (
        <img
          src={src}
          alt={alt}
          className={styles.photo}
          onError={() => setImgError(true)}
        />
      )}

      {resolvedType === 'Icon' && (
        <User size={ICON_SIZE[size]} className={styles.icon} />
      )}

      {resolvedType === 'Initials' && (
        <span className={clsx(styles.initials, styles[`initials--${size}`])}>
          {(initials ?? '').slice(0, 2)}
        </span>
      )}

      {status && (
        <Dot
          type={status}
          size={DOT_SIZE[size]}
          outline
          className={styles.statusBadge}
        />
      )}

      {showNotification && (
        <Dot
          type="Notification"
          size={DOT_SIZE[size]}
          outline
          className={styles.notifBadge}
        />
      )}
    </div>
  );
};
