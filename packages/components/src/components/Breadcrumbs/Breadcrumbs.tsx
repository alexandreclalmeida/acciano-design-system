import React from 'react';
import clsx from 'clsx';
import { ChevronRight, Ellipsis } from 'lucide-react';
import { LinkButton } from '../LinkButton/LinkButton';
import styles from './Breadcrumbs.module.css';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  collapsed?: boolean;
  onEllipsisClick?: () => void;
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  collapsed = false,
  onEllipsisClick,
  className,
}) => {
  const visibleItems: Array<BreadcrumbItem | null> =
    collapsed && items.length > 2
      ? [items[0], null, items[items.length - 1]]
      : items;

  return (
    <nav aria-label="Breadcrumb" className={clsx(styles.nav, className)}>
      <ol className={styles.list}>
        {visibleItems.map((item, index) => {
          const isLast = index === visibleItems.length - 1;
          return (
            <li key={index} className={styles.item}>
              {index > 0 && (
                <ChevronRight size={20} className={styles.separator} aria-hidden />
              )}
              {item === null ? (
                <button
                  type="button"
                  onClick={onEllipsisClick}
                  className={styles.ellipsis}
                  aria-label="Show hidden pages"
                >
                  <Ellipsis size={20} />
                </button>
              ) : (
                <LinkButton
                  tone="neutral"
                  size="small"
                  underline={false}
                  href={item.href}
                  onClick={item.onClick}
                  className={styles.link}
                  {...(isLast ? { 'aria-current': 'page' } : {})}
                >
                  {item.label}
                </LinkButton>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
