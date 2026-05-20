import {
  InstagramIcon,
  FacebookIcon,
  LinkedinIcon,
  XTwitterIcon,
  YoutubeIcon,
} from '@acciano/icons';

export { InstagramIcon, FacebookIcon, LinkedinIcon, XTwitterIcon, YoutubeIcon };

export const BRAND_ICONS = {
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  linkedin: LinkedinIcon,
  'x-twitter': XTwitterIcon,
  youtube: YoutubeIcon,
} as const;

export const BRAND_LABELS: Record<keyof typeof BRAND_ICONS, string> = {
  instagram: 'Instagram',
  facebook: 'Facebook',
  linkedin: 'LinkedIn',
  'x-twitter': 'X (Twitter)',
  youtube: 'YouTube',
};
