import React from 'react';
import clsx from 'clsx';
import { Menu, X } from 'lucide-react';
import styles from './NavigationHeader.module.css';

export type NavHeaderDevice = 'Desktop' | 'MobileClosed' | 'MobileOpen';

export interface NavigationHeaderProps {
  device?: NavHeaderDevice;
  /** Logo slot — shown on desktop and mobile bar */
  logo?: React.ReactNode;
  /** Horizontal nav tab items (Desktop only, left side) */
  children?: React.ReactNode;
  /** Desktop only: breadcrumbs slot (shown between logo and tabs) */
  breadcrumbs?: React.ReactNode;
  /** Desktop right: search input slot */
  search?: React.ReactNode;
  /** Desktop/Mobile right: icon button row */
  menuRight?: React.ReactNode;
  /** Desktop right: button group slot */
  buttons?: React.ReactNode;
  /** Desktop right: avatar/dropdown slot */
  avatar?: React.ReactNode;
  /** Mobile open panel: middle section content (nav items) */
  mobileContent?: React.ReactNode;
  /** Mobile open panel: bottom section content (buttons + avatar) */
  mobileBottomContent?: React.ReactNode;
  /** Mobile closed: right-side slot (e.g. small Avatar) */
  mobileBarRightSlot?: React.ReactNode;
  /** Hamburger button click handler (MobileClosed) */
  onMenuClick?: () => void;
  /** Close button or backdrop click handler (MobileOpen) */
  onCloseClick?: () => void;
  className?: string;
}

export const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  device = 'Desktop',
  logo,
  children,
  breadcrumbs,
  search,
  menuRight,
  buttons,
  avatar,
  mobileContent,
  mobileBottomContent,
  mobileBarRightSlot,
  onMenuClick,
  onCloseClick,
  className,
}) => {
  // ── Desktop ──────────────────────────────────────
  if (device === 'Desktop') {
    return (
      <header className={clsx(styles.root, className)} aria-label="Header navigation">
        {/* Left: logo + breadcrumbs + menu tabs */}
        <div className={styles.left}>
          {logo}
          {breadcrumbs}
          {children && <div className={styles.menuLeft}>{children}</div>}
        </div>

        {/* Right: search + menu icons + buttons + avatar */}
        {(search || menuRight || buttons || avatar) && (
          <div className={styles.right}>
            {search}
            {menuRight && <div className={styles.menuRight}>{menuRight}</div>}
            {buttons}
            {avatar}
          </div>
        )}
      </header>
    );
  }

  // ── Mobile Closed ────────────────────────────────
  if (device === 'MobileClosed') {
    return (
      <header className={clsx(styles.mobileBar, className)} aria-label="Header navigation">
        <div className={styles.mobileBarLeft}>
          <button
            type="button"
            className={styles.iconBtn}
            onClick={onMenuClick}
            aria-label="Open navigation menu"
          >
            <Menu size={24} className={styles.iconBtnIcon} aria-hidden />
          </button>
          {logo}
        </div>

        {(menuRight || mobileBarRightSlot) && (
          <div className={styles.mobileBarRight}>
            {menuRight && <div className={styles.menuRight}>{menuRight}</div>}
            {mobileBarRightSlot}
          </div>
        )}
      </header>
    );
  }

  // ── Mobile Open ──────────────────────────────────
  return (
    <div className={clsx(styles.overlay, className)} role="dialog" aria-modal="true" aria-label="Navigation menu">
      {/* Backdrop */}
      <div className={styles.backdrop} onClick={onCloseClick} aria-hidden="true" />

      {/* Panel */}
      <div className={styles.panel}>
        {/* Top: close button */}
        <div className={styles.panelTop}>
          <div className={styles.panelCloseRow}>
            <button
              type="button"
              className={styles.iconBtn}
              onClick={onCloseClick}
              aria-label="Close navigation menu"
            >
              <X size={24} className={styles.iconBtnIcon} aria-hidden />
            </button>
          </div>
        </div>

        {/* Middle: nav items */}
        <div className={styles.panelMiddle}>{mobileContent}</div>

        {/* Bottom: buttons + avatar */}
        {mobileBottomContent && (
          <div className={styles.panelBottom}>{mobileBottomContent}</div>
        )}
      </div>
    </div>
  );
};
