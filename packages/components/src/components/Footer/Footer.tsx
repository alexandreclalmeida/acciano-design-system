import React from 'react';
import clsx from 'clsx';
import { LogoAcciano } from '@acciano/logos';
import { LinkButton } from '../LinkButton/LinkButton';
import { BRAND_ICONS, BRAND_LABELS } from './_BrandIcons';
import styles from './Footer.module.css';

export type FooterDevice = 'Desktop' | 'Tablet' | 'Mobile';
export type FooterSize = 'Small' | 'Large' | 'About';
export type SocialIconType = keyof typeof BRAND_ICONS;

export interface FooterLink {
  label: string;
  href?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

export interface FooterColumn {
  heading: string;
  links: FooterLink[];
}

export interface FooterSocialLink {
  icon: SocialIconType;
  href?: string;
  label?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

export interface FooterProps {
  device?: FooterDevice;
  size?: FooterSize;
  /** Small: horizontal nav link row */
  links?: FooterLink[];
  /** Large/About: link columns */
  columns?: FooterColumn[];
  /** Social links — icon-only in Small/About, icon+label in Large */
  socialLinks?: FooterSocialLink[];
  /** About: description text in the left panel */
  description?: string;
  copyright?: string;
  className?: string;
}

function renderColumn(col: FooterColumn) {
  return (
    <div key={col.heading} className={styles.column}>
      <p className={styles.columnHeading}>{col.heading}</p>
      <div className={styles.columnList}>
        {col.links.map((link) => (
          <LinkButton
            key={link.label}
            tone="neutral"
            size="base"
            underline={false}
            href={link.href}
            onClick={link.onClick}
            className={styles.colLink}
          >
            {link.label}
          </LinkButton>
        ))}
      </div>
    </div>
  );
}

function SocialColumn({ socialLinks }: { socialLinks: FooterSocialLink[] }) {
  return (
    <div className={styles.column}>
      <p className={styles.columnHeading}>Follow us</p>
      <div className={styles.columnList}>
        {socialLinks.map((s) => {
          const Icon = BRAND_ICONS[s.icon];
          const label = s.label ?? BRAND_LABELS[s.icon];
          return (
            <a
              key={s.icon}
              href={s.href}
              onClick={s.onClick}
              className={styles.socialLink}
              aria-label={label}
            >
              <Icon width={20} height={20} className={styles.socialLinkIcon} />
              {label}
            </a>
          );
        })}
      </div>
    </div>
  );
}

function SocialIconRow({
  socialLinks,
  size,
}: {
  socialLinks: FooterSocialLink[];
  size: number;
}) {
  return (
    <div className={styles.social}>
      {socialLinks.map((s) => {
        const Icon = BRAND_ICONS[s.icon];
        const label = s.label ?? BRAND_LABELS[s.icon];
        return (
          <a
            key={s.icon}
            href={s.href}
            onClick={s.onClick}
            className={styles.socialIcon}
            aria-label={label}
          >
            <Icon width={size} height={size} />
          </a>
        );
      })}
    </div>
  );
}

export const Footer: React.FC<FooterProps> = ({
  device = 'Desktop',
  size = 'Small',
  links = [],
  columns = [],
  socialLinks = [],
  description,
  copyright = '© 2025 acla.design',
  className,
}) => {
  const isMobile = device === 'Mobile';
  const isTablet = device === 'Tablet';
  const rootCls = clsx(
    styles.root,
    styles[`size--${size}`],
    isMobile && styles['device--Mobile'],
    isTablet && styles['device--Tablet'],
    className,
  );

  // ── Small ───────────────────────────────────────────
  if (size === 'Small') {
    return (
      <footer className={rootCls}>
        <div className={styles.topRow}>
          <LogoAcciano />
          {socialLinks.length > 0 && <SocialIconRow socialLinks={socialLinks} size={24} />}
        </div>
        <div className={styles.bottomSmall}>
          {links.length > 0 && (
            <div className={styles.navLinks}>
              {links.map((link) => (
                <LinkButton
                  key={link.label}
                  tone="neutral"
                  size="base"
                  underline={false}
                  href={link.href}
                  onClick={link.onClick}
                  className={styles.navLink}
                >
                  {link.label}
                </LinkButton>
              ))}
            </div>
          )}
          <p className={styles.copyright}>{copyright}</p>
        </div>
      </footer>
    );
  }

  // ── Large ───────────────────────────────────────────
  if (size === 'Large') {
    if (isMobile) {
      const pairs = [];
      for (let i = 0; i < columns.length; i += 2) {
        pairs.push(columns.slice(i, i + 2));
      }
      return (
        <footer className={rootCls}>
          <div className={styles.mobileLargeLinks}>
            {pairs.map((pair, i) => (
              <div key={i} className={styles.mobileRow}>
                {pair.map(renderColumn)}
              </div>
            ))}
            {socialLinks.length > 0 && (
              <div className={styles.mobileRow}>
                <SocialColumn socialLinks={socialLinks} />
              </div>
            )}
          </div>
          <div className={styles.bottomBarMobile}>
            <LogoAcciano />
            <p className={styles.copyright}>{copyright}</p>
          </div>
        </footer>
      );
    }

    return (
      <footer className={rootCls}>
        <div className={styles.largeColumns}>
          {columns.map(renderColumn)}
          {socialLinks.length > 0 && <SocialColumn socialLinks={socialLinks} />}
        </div>
        <div className={styles.bottomBar}>
          <LogoAcciano />
          <p className={styles.copyright}>{copyright}</p>
        </div>
      </footer>
    );
  }

  // ── About ───────────────────────────────────────────
  if (isMobile) {
    const pairs = [];
    for (let i = 0; i < columns.length; i += 2) {
      pairs.push(columns.slice(i, i + 2));
    }
    return (
      <footer className={rootCls}>
        <div className={styles.tabletAboutTop}>
          <LogoAcciano />
          {description && <p className={styles.aboutDesc}>{description}</p>}
        </div>
        <div className={styles.mobileLargeLinks}>
          {pairs.map((pair, i) => (
            <div key={i} className={styles.mobileRow}>
              {pair.map(renderColumn)}
            </div>
          ))}
        </div>
        <div className={styles.bottomBarMobile}>
          {socialLinks.length > 0 && <SocialIconRow socialLinks={socialLinks} size={24} />}
          <p className={styles.copyright}>{copyright}</p>
        </div>
      </footer>
    );
  }

  // ── About (Tablet): logo+desc empilhados acima das colunas ────
  if (isTablet) {
    return (
      <footer className={rootCls}>
        <div className={styles.tabletAboutTop}>
          <LogoAcciano />
          {description && <p className={styles.aboutDesc}>{description}</p>}
        </div>
        <div className={styles.tabletColumns}>
          {columns.map(renderColumn)}
        </div>
        <div className={styles.bottomBarAbout}>
          <p className={clsx(styles.copyright, styles.copyrightFlex)}>{copyright}</p>
          {socialLinks.length > 0 && <SocialIconRow socialLinks={socialLinks} size={24} />}
        </div>
      </footer>
    );
  }

  // ── About (Desktop): logo+desc à esquerda, colunas à direita ──
  return (
    <footer className={rootCls}>
      <div className={styles.aboutContent}>
        <div className={styles.aboutLeft}>
          <LogoAcciano />
          {description && <p className={styles.aboutDesc}>{description}</p>}
        </div>
        <div className={styles.aboutColumns}>
          {columns.map(renderColumn)}
        </div>
      </div>
      <div className={styles.bottomBarAbout}>
        <p className={clsx(styles.copyright, styles.copyrightFlex)}>{copyright}</p>
        {socialLinks.length > 0 && <SocialIconRow socialLinks={socialLinks} size={24} />}
      </div>
    </footer>
  );
};
