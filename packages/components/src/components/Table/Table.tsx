import React from 'react';
import clsx from 'clsx';
import { ArrowUpDown, MoveUp, MoveDown } from 'lucide-react';
import { Checkbox } from '../Checkbox/Checkbox';
import { Pagination } from '../Pagination/Pagination';
import styles from './Table.module.css';

// ─── Types ─────────────────────────────────────────

export type TableStyle = 'Default' | 'Striped';
export type TableSortDirection = 'asc' | 'desc';
export type TableCellAlign = 'left' | 'right';
export type TableCellGap = 'sm' | 'md';

export interface TableColumnDef {
  id: string;
  heading: string;
  align?: TableCellAlign;
  sortable?: boolean;
  width?: string;
  minWidth?: string;
  gap?: TableCellGap;
  cell: (row: unknown, rowIndex: number) => React.ReactNode;
}

// ─── TableHeadingCell ──────────────────────────────

export interface TableHeadingCellProps {
  align?: TableCellAlign;
  sortable?: 'No' | 'Yes' | 'Up' | 'Down';
  onSort?: () => void;
  isCheckbox?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export const TableHeadingCell: React.FC<TableHeadingCellProps> = ({
  align = 'left',
  sortable = 'No',
  onSort,
  isCheckbox = false,
  children,
  className,
}) => {
  const isSortable = sortable !== 'No';
  const isRight = align === 'right';

  const ariaSort =
    sortable === 'Up' ? ('ascending' as const) :
    sortable === 'Down' ? ('descending' as const) :
    isSortable ? ('none' as const) :
    undefined;

  const SortIcon =
    sortable === 'Up' ? MoveUp :
    sortable === 'Down' ? MoveDown :
    ArrowUpDown;

  return (
    <th
      scope="col"
      aria-sort={ariaSort}
      className={clsx(
        styles.headingCell,
        isCheckbox && styles['headingCell--checkbox'],
        className,
      )}
    >
      {isCheckbox ? (
        <div className={styles.checkboxCellInner}>{children}</div>
      ) : isSortable ? (
        <button
          type="button"
          className={clsx(styles.sortButton, isRight && styles['sortButton--right'])}
          onClick={onSort}
        >
          {isRight && (
            <SortIcon
              size={16}
              aria-hidden
              className={clsx(styles.sortIcon, sortable !== 'Yes' && styles['sortIcon--active'])}
            />
          )}
          <span className={styles.headingText}>{children}</span>
          {!isRight && (
            <SortIcon
              size={16}
              aria-hidden
              className={clsx(styles.sortIcon, sortable !== 'Yes' && styles['sortIcon--active'])}
            />
          )}
        </button>
      ) : (
        <div className={clsx(styles.headingCellInner, isRight && styles['headingCellInner--right'])}>
          <span className={styles.headingText}>{children}</span>
        </div>
      )}
    </th>
  );
};

// ─── TableDataCell ─────────────────────────────────

export interface TableDataCellProps {
  align?: TableCellAlign;
  gap?: TableCellGap;
  alternate?: boolean;
  isCheckbox?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export const TableDataCell: React.FC<TableDataCellProps> = ({
  align = 'left',
  gap,
  alternate = false,
  isCheckbox = false,
  children,
  className,
}) => (
  <td
    className={clsx(
      styles.dataCell,
      alternate && styles['dataCell--alternate'],
      isCheckbox && styles['dataCell--checkbox'],
      className,
    )}
  >
    <div
      className={clsx(
        styles.dataCellInner,
        align === 'right' && styles['dataCellInner--right'],
        gap === 'sm' && styles['dataCellInner--gap-sm'],
        gap === 'md' && styles['dataCellInner--gap-md'],
      )}
    >
      {children}
    </div>
  </td>
);

// ─── Table ─────────────────────────────────────────

export interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  summaryText?: string;
  disabled?: boolean;
}

export interface TableProps {
  columns: TableColumnDef[];
  rows: unknown[];
  style?: TableStyle;
  // Selection
  selectable?: boolean;
  selectedRows?: number[];
  defaultSelectedRows?: number[];
  onSelectionChange?: (rows: number[]) => void;
  // Sort
  sortColumnId?: string | null;
  sortDirection?: TableSortDirection;
  defaultSortColumnId?: string;
  defaultSortDirection?: TableSortDirection;
  onSortChange?: (columnId: string | null, direction: TableSortDirection | null) => void;
  // Pagination
  pagination?: TablePaginationProps;
  className?: string;
}

export const Table: React.FC<TableProps> = ({
  columns,
  rows,
  style = 'Default',
  selectable = false,
  selectedRows: selectedRowsProp,
  defaultSelectedRows,
  onSelectionChange,
  sortColumnId: sortColumnIdProp,
  sortDirection: sortDirectionProp,
  defaultSortColumnId,
  defaultSortDirection,
  onSortChange,
  pagination,
  className,
}) => {
  // ── Selection ────────────────────────────────────
  const isSelectionControlled = selectedRowsProp !== undefined;
  const [uncontrolledSelected, setUncontrolledSelected] = React.useState<number[]>(
    defaultSelectedRows ?? [],
  );
  const selectedRows = isSelectionControlled ? selectedRowsProp : uncontrolledSelected;

  const commitSelection = (next: number[]) => {
    if (!isSelectionControlled) setUncontrolledSelected(next);
    onSelectionChange?.(next);
  };

  const allSelected = rows.length > 0 && selectedRows.length === rows.length;
  const someSelected = selectedRows.length > 0 && selectedRows.length < rows.length;

  const toggleAll = () => commitSelection(allSelected ? [] : rows.map((_, i) => i));
  const toggleRow = (i: number) =>
    commitSelection(
      selectedRows.includes(i) ? selectedRows.filter((r) => r !== i) : [...selectedRows, i],
    );

  // ── Sort ─────────────────────────────────────────
  const isSortControlled = sortColumnIdProp !== undefined;
  const [uncontrolledSortId, setUncontrolledSortId] = React.useState<string | null>(
    defaultSortColumnId ?? null,
  );
  const [uncontrolledSortDir, setUncontrolledSortDir] = React.useState<TableSortDirection | null>(
    defaultSortDirection ?? null,
  );
  const sortColumnId = isSortControlled ? sortColumnIdProp : uncontrolledSortId;
  const sortDirection = isSortControlled ? (sortDirectionProp ?? null) : uncontrolledSortDir;

  const handleSortClick = (columnId: string) => {
    let nextId: string | null;
    let nextDir: TableSortDirection | null;

    if (sortColumnId !== columnId) {
      nextId = columnId;
      nextDir = 'asc';
    } else if (sortDirection === 'asc') {
      nextId = columnId;
      nextDir = 'desc';
    } else {
      nextId = null;
      nextDir = null;
    }

    if (!isSortControlled) {
      setUncontrolledSortId(nextId);
      setUncontrolledSortDir(nextDir);
    }
    onSortChange?.(nextId, nextDir);
  };

  const getSortableState = (col: TableColumnDef): 'No' | 'Yes' | 'Up' | 'Down' => {
    if (!col.sortable) return 'No';
    if (col.id !== sortColumnId) return 'Yes';
    return sortDirection === 'asc' ? 'Up' : 'Down';
  };

  // ── Row style ────────────────────────────────────
  const isAlternate = (rowIndex: number) =>
    selectedRows.includes(rowIndex) || (style === 'Striped' && rowIndex % 2 !== 0);

  return (
    <div className={clsx(styles.root, className)}>
      <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <colgroup>
          {selectable && <col className={styles.colCheckbox} />}
          {columns.map((col) => (
            <col
              key={col.id}
              style={{
                width: col.width,
                minWidth: col.minWidth ?? (!col.width ? '120px' : undefined),
              }}
            />
          ))}
        </colgroup>

        <thead>
          <tr>
            {selectable && (
              <TableHeadingCell isCheckbox>
                <Checkbox
                  size="Small"
                  checked={allSelected}
                  indeterminate={someSelected}
                  onChange={() => toggleAll()}
                />
              </TableHeadingCell>
            )}
            {columns.map((col) => (
              <TableHeadingCell
                key={col.id}
                align={col.align}
                sortable={getSortableState(col)}
                onSort={col.sortable ? () => handleSortClick(col.id) : undefined}
              >
                {col.heading}
              </TableHeadingCell>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {selectable && (
                <TableDataCell isCheckbox alternate={isAlternate(rowIndex)}>
                  <Checkbox
                    size="Small"
                    checked={selectedRows.includes(rowIndex)}
                    onChange={() => toggleRow(rowIndex)}
                  />
                </TableDataCell>
              )}
              {columns.map((col) => (
                <TableDataCell
                  key={col.id}
                  align={col.align}
                  gap={col.gap}
                  alternate={isAlternate(rowIndex)}
                >
                  {col.cell(row, rowIndex)}
                </TableDataCell>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      {pagination && <Pagination {...pagination} />}
    </div>
  );
};
