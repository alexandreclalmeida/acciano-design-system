import React from 'react';
import clsx from 'clsx';
import styles from './Card.module.css';

export type CardLayout = 'Vertical' | 'Horizontal';

export interface CardProps {
  layout?: CardLayout;
  imageSrc?: string;
  imageAlt?: string;
  capsule?: React.ReactNode;
  label?: string;
  heading?: string;
  description?: string;
  link?: React.ReactNode;
  avatar?: React.ReactNode;
  tags?: React.ReactNode;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  layout = 'Vertical',
  imageSrc,
  imageAlt = '',
  capsule,
  label,
  heading,
  description,
  link,
  avatar,
  tags,
  children,
  onClick,
  className,
}) => {
  const isHorizontal = layout === 'Horizontal';
  const isInteractive = Boolean(onClick);
  const hasText = label || heading || description;
  const hasCapsuleOrText = capsule || hasText;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.(e as unknown as React.MouseEvent<HTMLDivElement>);
    }
  };

  return (
    <div
      className={clsx(
        styles.root,
        isHorizontal ? styles['root--horizontal'] : styles['root--vertical'],
        isInteractive && styles['root--interactive'],
        className,
      )}
      onClick={onClick}
      {...(isInteractive && {
        role: 'button',
        tabIndex: 0,
        onKeyDown: handleKeyDown,
      })}
    >
      <div className={styles.stateCard} />

      <div
        className={clsx(
          styles.container,
          isHorizontal ? styles['container--horizontal'] : styles['container--vertical'],
        )}
      >
        {imageSrc && (
          <div
            className={clsx(
              styles.imageFrame,
              isHorizontal ? styles['imageFrame--horizontal'] : styles['imageFrame--vertical'],
            )}
          >
            <img src={imageSrc} alt={imageAlt} className={styles.img} />
          </div>
        )}

        <div className={styles.content}>
          {hasCapsuleOrText && (
            <div className={styles.capsuleAndText}>
              {capsule}
              {hasText && (
                <div className={styles.text}>
                  {(label || heading) && (
                    <div className={styles.headingGroup}>
                      {label && <p className={styles.label}>{label}</p>}
                      {heading && <p className={styles.heading}>{heading}</p>}
                    </div>
                  )}
                  {description && <p className={styles.description}>{description}</p>}
                </div>
              )}
            </div>
          )}
          {link && <div className={styles.linkSlot}>{link}</div>}
          {avatar}
          {tags}
          {children}
        </div>
      </div>
    </div>
  );
};
