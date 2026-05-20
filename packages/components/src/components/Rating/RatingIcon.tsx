import {
  RatingStarEmptyIcon, RatingStarHalfIcon, RatingStarFullIcon,
  RatingHeartEmptyIcon, RatingHeartHalfIcon, RatingHeartFullIcon,
  RatingCircleEmptyIcon, RatingCircleHalfIcon, RatingCircleFullIcon,
} from '@acciano/icons';

export type RatingIconType = 'Star' | 'Heart' | 'Circle';
export type RatingIconState = 'empty' | 'half' | 'full';

const ICONS = {
  Star:   { empty: RatingStarEmptyIcon,   half: RatingStarHalfIcon,   full: RatingStarFullIcon },
  Heart:  { empty: RatingHeartEmptyIcon,  half: RatingHeartHalfIcon,  full: RatingHeartFullIcon },
  Circle: { empty: RatingCircleEmptyIcon, half: RatingCircleHalfIcon, full: RatingCircleFullIcon },
} as const;

export function RatingIcon({ type, state }: { type: RatingIconType; state: RatingIconState }) {
  const Icon = ICONS[type][state];
  return <Icon />;
}
