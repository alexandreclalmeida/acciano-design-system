import React from 'react';
import clsx from 'clsx';
import { RatingIcon } from './RatingIcon';
import type { RatingIconType } from './RatingIcon';
import { LinkButton } from '../LinkButton/LinkButton';
import styles from './Rating.module.css';

export type { RatingIconType };
export type RatingLayout = 'Horizontal' | 'Vertical';

export interface RatingProps {
  type?: RatingIconType;
  layout?: RatingLayout;
  value?: number;
  showNumber?: boolean;
  showReviews?: boolean;
  reviewCount?: number;
  onReviewsClick?: React.MouseEventHandler<HTMLAnchorElement>;
  className?: string;
}

const TOTAL = 5;

function getStates(value: number) {
  const full = Math.floor(value);
  const hasHalf = value - full >= 0.5;
  const empty = TOTAL - full - (hasHalf ? 1 : 0);
  return { full, hasHalf, empty };
}

export const Rating: React.FC<RatingProps> = ({
  type = 'Star',
  layout = 'Horizontal',
  value = 3.5,
  showNumber = true,
  showReviews = true,
  reviewCount = 23,
  onReviewsClick,
  className,
}) => {
  const isVertical = layout === 'Vertical';
  const { full, hasHalf, empty } = getStates(value);

  const icons = (
    <div className={styles.icons}>
      {Array.from({ length: full }, (_, i) => (
        <RatingIcon key={`full-${i}`} type={type} state="full" />
      ))}
      {hasHalf && <RatingIcon key="half" type={type} state="half" />}
      {Array.from({ length: empty }, (_, i) => (
        <RatingIcon key={`empty-${i}`} type={type} state="empty" />
      ))}
    </div>
  );

  const reviews = showReviews ? (
    isVertical ? (
      <div className={styles.reviewsVertical}>
        <span className={styles.reviewsFrom}>From</span>
        <LinkButton size="small" onClick={onReviewsClick}>
          {reviewCount} reviews
        </LinkButton>
      </div>
    ) : (
      <LinkButton size="small" onClick={onReviewsClick}>
        ({reviewCount} reviews)
      </LinkButton>
    )
  ) : null;

  return (
    <div className={clsx(styles.root, isVertical && styles['layout--Vertical'], className)}>
      <div className={styles.iconsAndNumber}>
        {icons}
        {showNumber && (
          <span className={styles.number}>
            {value.toLocaleString('pt-BR')}
          </span>
        )}
      </div>
      {reviews}
    </div>
  );
};
