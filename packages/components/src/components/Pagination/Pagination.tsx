import React from 'react';
import clsx from 'clsx';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { LinkButton } from '../LinkButton/LinkButton';
import { IconButton } from '../IconButton/IconButton';
import styles from './Pagination.module.css';

// ─── Page generation ──────────────────────────────

type PageItem = number | '...';

function generatePages(current: number, total: number): PageItem[] {
  const safeTotal = Math.max(1, total);
  if (safeTotal <= 7) return Array.from({ length: safeTotal }, (_, i) => i + 1);

  const shown = new Set<number>([1, safeTotal]);
  if (current - 1 >= 1) shown.add(current - 1);
  shown.add(Math.min(Math.max(current, 1), safeTotal));
  if (current + 1 <= safeTotal) shown.add(current + 1);

  const sorted = [...shown].sort((a, b) => a - b);
  const result: PageItem[] = [];
  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) result.push('...');
    result.push(sorted[i]);
  }
  return result;
}

// ─── PageButton (internal) ────────────────────────

interface PageButtonProps {
  page: number;
  isSelected: boolean;
  disabled?: boolean;
  onClick: () => void;
}

const PageButton: React.FC<PageButtonProps> = ({ page, isSelected, disabled, onClick }) => (
  <button
    type="button"
    aria-label={`Page ${page}`}
    aria-current={isSelected ? 'page' : undefined}
    disabled={disabled}
    onClick={onClick}
    className={clsx(styles.pageBtn, isSelected && styles['pageBtn--selected'])}
  >
    <span className={styles.pageBtnText}>{page}</span>
  </button>
);

// ─── Pagination ───────────────────────────────────

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  device?: 'Desktop' | 'Mobile';
  /** Desktop: shown on the right (e.g. "Showing 11 – 20 of 128"). Mobile: shown in the centre; defaults to "Showing {current} of {total}". */
  summaryText?: string;
  disabled?: boolean;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  device = 'Desktop',
  summaryText,
  disabled = false,
  className,
}) => {
  const isPrevDisabled = disabled || currentPage <= 1;
  const isNextDisabled = disabled || currentPage >= totalPages;

  const handlePrev = () => { if (!isPrevDisabled) onPageChange(currentPage - 1); };
  const handleNext = () => { if (!isNextDisabled) onPageChange(currentPage + 1); };

  if (device === 'Mobile') {
    const mobileSummary = summaryText ?? `Showing ${currentPage} of ${totalPages}`;
    return (
      <nav aria-label="Pagination" className={clsx(styles.mobile, className)}>
        <IconButton
          icon={ArrowLeft}
          variant="Tertiary"
          tone="Neutral"
          size="Medium"
          aria-label="Previous page"
          disabled={isPrevDisabled}
          onClick={handlePrev}
        />
        <span className={styles.mobileSummary}>{mobileSummary}</span>
        <IconButton
          icon={ArrowRight}
          variant="Tertiary"
          tone="Neutral"
          size="Medium"
          aria-label="Next page"
          disabled={isNextDisabled}
          onClick={handleNext}
        />
      </nav>
    );
  }

  // Desktop
  const pages = generatePages(currentPage, totalPages);

  return (
    <nav aria-label="Pagination" className={clsx(styles.desktop, className)}>
      <div className={styles.buttons}>
        <div className={styles.prevNav}>
          <LinkButton
            tone="neutral"
            size="small"
            underline={false}
            className={styles.navLink}
            leadingIcon={ArrowLeft}
            disabled={isPrevDisabled}
            onClick={handlePrev}
          >
            Previous
          </LinkButton>
        </div>

        {pages.map((item, i) =>
          item === '...' ? (
            <span key={`ellipsis-${i}`} className={styles.ellipsis} aria-hidden>
              ...
            </span>
          ) : (
            <PageButton
              key={item}
              page={item}
              isSelected={item === currentPage}
              disabled={disabled}
              onClick={() => onPageChange(item)}
            />
          ),
        )}

        <div className={styles.nextNav}>
          <LinkButton
            tone="neutral"
            size="small"
            underline={false}
            className={styles.navLink}
            trailingIcon={ArrowRight}
            disabled={isNextDisabled}
            onClick={handleNext}
          >
            Next
          </LinkButton>
        </div>
      </div>

      {summaryText && (
        <span className={styles.summary}>{summaryText}</span>
      )}
    </nav>
  );
};
