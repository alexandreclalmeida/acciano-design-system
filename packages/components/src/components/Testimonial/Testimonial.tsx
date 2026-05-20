import React from 'react';
import clsx from 'clsx';
import { AvatarLabelled } from '../AvatarLabelled/AvatarLabelled';
import { Rating } from '../Rating/Rating';
import styles from './Testimonial.module.css';

export interface TestimonialProps {
  /** Layout alignment. Default: "Left". */
  align?: 'Left' | 'Center';
  /** Person's name shown in the avatar. */
  name: string;
  /** Person's email shown below the name. */
  email?: string;
  /** Photo URL for the avatar. Falls back to initials when omitted. */
  avatarSrc?: string;
  /** The testimonial quote text (include surrounding quotes in the string). */
  quote: string;
  /** Star rating value (0–5). Default: 5. */
  rating?: number;
  showAvatar?: boolean;
  showQuote?: boolean;
  showRating?: boolean;
  className?: string;
}

export const Testimonial: React.FC<TestimonialProps> = ({
  align = 'Left',
  name,
  email,
  avatarSrc,
  quote,
  rating = 5,
  showAvatar = true,
  showQuote = true,
  showRating = true,
  className,
}) => (
  <div className={clsx(styles.root, styles[`align--${align}`], className)}>
    {showAvatar && (
      <AvatarLabelled name={name} email={email} src={avatarSrc} size="Medium" type="Photo" />
    )}
    {showQuote && (
      <p className={styles.quote}>{quote}</p>
    )}
    {showRating && (
      <Rating type="Star" layout="Horizontal" value={rating} showNumber={false} showReviews={false} />
    )}
  </div>
);
