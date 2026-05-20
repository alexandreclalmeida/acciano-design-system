import React from 'react';
import clsx from 'clsx';
import { Menu, X } from 'lucide-react';
import styles from './NavigationSide.module.css';

export type NavSideDevice = 'Desktop' | 'MobileClosed' | 'MobileOpen';

export interface NavigationSideProps {
  /** Layout variant */
  device?: NavSideDevice;
  /** Logo slot — e.g. <LogoAcciano /> */
  logo?: React.ReactNode;
  /** Content rendered below the logo in Top section (e.g. SearchInput) */
  topContent?: React.ReactNode;
  /** Middle nav items (main navigation) */
  children?: React.ReactNode;
  /** Bottom section items (footer links + optional sections) */
  bottomContent?: React.ReactNode;
  /** Called when the hamburger button is pressed (MobileClosed) */
  onMenuClick?: () => void;
  /** Called when the X close button or backdrop is pressed (MobileOpen) */
  onCloseClick?: () => void;
  /** Right slot for the mobile bar — e.g. a small Avatar */
  mobileBarRightSlot?: React.ReactNode;
  className?: string;
}

export const NavigationSide: React.FC<NavigationSideProps> = ({
  device = 'Desktop',
  logo,
  topContent,
  children,
  bottomContent,
  onMenuClick,
  onCloseClick,
  mobileBarRightSlot,
  className,
}) => {
  // ── Desktop ─────────────────────────────────────────────────
  if (device === 'Desktop') {
    return (
      <nav className={clsx(styles.root, className)} aria-label="Side navigation">
        {/* Top: logo + topContent */}
        {(logo || topContent) && (
          <div className={styles.top}>
            {logo && <div className={styles.logoWrap}>{logo}</div>}
            {topContent && <div className={styles.topContent}>{topContent}</div>}
          </div>
        )}

        {/* Middle: main nav items */}
        <div className={styles.middle}>{children}</div>

        {/* Bottom: footer items */}
        {bottomContent && (
          <div className={styles.bottom}>{bottomContent}</div>
        )}
      </nav>
    );
  }

  // ── Mobile Closed (top bar) ──────────────────────────────────
  if (device === 'MobileClosed') {
    return (
      <header className={clsx(styles.mobileBar, className)} aria-label="Mobile navigation bar">
        <button
          type="button"
          className={styles.mobileMenuBtn}
          onClick={onMenuClick}
          aria-label="Open navigation menu"
        >
          <Menu size={24} className={styles.mobileMenuIcon} />
        </button>
        {logo && <div className={styles.mobileBarLogo}>{logo}</div>}
        {mobileBarRightSlot && (
          <div className={styles.mobileBarRight}>{mobileBarRightSlot}</div>
        )}
      </header>
    );
  }

  // ── Mobile Open (overlay + panel) ───────────────────────────
  return (
    <div className={clsx(styles.overlay, className)} aria-modal="true" role="dialog">
      {/* Backdrop */}
      <div
        className={styles.backdrop}
        onClick={onCloseClick}
        aria-hidden="true"
      />

      {/* Panel */}
      <nav className={styles.panel} aria-label="Side navigation">
        {/* Close button row */}
        <div className={styles.mobileCloseRow}>
          <button
            type="button"
            className={styles.mobileCloseBtn}
            onClick={onCloseClick}
            aria-label="Close navigation menu"
          >
            <X size={24} className={styles.mobileCloseIcon} />
          </button>
        </div>

        {/* Top content (search etc.) */}
        {topContent && (
          <div className={styles.mobileTopContent}>{topContent}</div>
        )}

        {/* Middle */}
        <div className={styles.middle}>{children}</div>

        {/* Bottom */}
        {bottomContent && (
          <div className={styles.bottom}>{bottomContent}</div>
        )}
      </nav>
    </div>
  );
};
