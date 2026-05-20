import React from 'react';
import clsx from 'clsx';
import styles from './Hero.module.css';

export type HeroType =
  | 'Horizontal'
  | 'Horizontal padded'
  | 'Vertical'
  | 'Vertical large'
  | 'Vertical small';

export type HeroDevice = 'Desktop' | 'Tablet' | 'Mobile';

export interface HeroProps {
  type?: HeroType;
  device?: HeroDevice;
  /** Overline label above the heading (uppercase, text-low). */
  label?: string;
  /** Slot for a Tag or pill component above the heading. */
  tag?: React.ReactNode;
  /** Main Display/Hero heading. */
  heading: React.ReactNode;
  /** Supporting description paragraph. */
  description: React.ReactNode;
  /** Slot for an email input + subscribe button row. */
  emailSlot?: React.ReactNode;
  /** Slot for CTA buttons (e.g. ButtonGroup). */
  buttonsSlot?: React.ReactNode;
  /** Slot for social proof (e.g. AvatarStack + Rating). */
  socialSlot?: React.ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
}

const TYPE_CLASS: Record<HeroType, string> = {
  'Horizontal': styles['type--Horizontal'],
  'Horizontal padded': styles['type--HorizontalPadded'],
  'Vertical': styles['type--Vertical'],
  'Vertical large': styles['type--VerticalLarge'],
  'Vertical small': styles['type--VerticalSmall'],
};

export const Hero: React.FC<HeroProps> = ({
  type = 'Horizontal',
  device = 'Desktop',
  label,
  tag,
  heading,
  description,
  emailSlot,
  buttonsSlot,
  socialSlot,
  imageSrc,
  imageAlt = '',
  className,
}) => (
  <div
    className={clsx(
      styles.root,
      TYPE_CLASS[type],
      styles[`device--${device}`],
      className,
    )}
  >
    <div className={styles.content}>
      <div className={styles.topContainer}>
        {label && <span className={styles.label}>{label}</span>}
        {tag}
        <div className={styles.textBlock}>
          <p className={styles.heading}>{heading}</p>
          <p className={styles.description}>{description}</p>
        </div>
      </div>
      {emailSlot && <div className={styles.emailRow}>{emailSlot}</div>}
      {buttonsSlot && <div className={styles.buttonRow}>{buttonsSlot}</div>}
      {socialSlot && <div className={styles.social}>{socialSlot}</div>}
    </div>

    {imageSrc && (
      <div className={styles.imageFrame}>
        <div className={styles.imageInner}>
          <img src={imageSrc} alt={imageAlt} className={styles.img} />
        </div>
      </div>
    )}
  </div>
);
