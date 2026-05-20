import React from 'react';
import clsx from 'clsx';
import styles from './SummaryList.module.css';

export type SummaryItemType = 'Term' | 'Description' | 'Link' | 'Action icons' | 'Action links';

const TYPE_CLASS: Record<SummaryItemType, string> = {
  'Term': styles['item--term'],
  'Description': styles['item--description'],
  'Link': styles['item--link'],
  'Action icons': styles['item--action-icons'],
  'Action links': styles['item--action-links'],
};

// ─── Context ───────────────────────────────────────

const SummaryColumnContext = React.createContext<SummaryItemType>('Term');

// ─── SummaryItem ───────────────────────────────────

export interface SummaryItemProps {
  type?: SummaryItemType;
  children?: React.ReactNode;
  className?: string;
}

export const SummaryItem: React.FC<SummaryItemProps> = ({ type: typeProp, children, className }) => {
  const contextType = React.useContext(SummaryColumnContext);
  const type = typeProp ?? contextType;
  return (
    <div className={clsx(styles.item, TYPE_CLASS[type], className)}>
      {children}
    </div>
  );
};

// ─── SummaryColumn ─────────────────────────────────

export interface SummaryColumnProps {
  type?: SummaryItemType;
  children: React.ReactNode;
  className?: string;
}

export const SummaryColumn: React.FC<SummaryColumnProps> = ({ type = 'Term', children, className }) => (
  <SummaryColumnContext.Provider value={type}>
    <div className={clsx(styles.column, className)}>
      {children}
    </div>
  </SummaryColumnContext.Provider>
);

// ─── SummaryList ───────────────────────────────────

export interface SummaryListProps {
  children: React.ReactNode;
  className?: string;
}

export const SummaryList: React.FC<SummaryListProps> = ({ children, className }) => (
  <div className={clsx(styles.root, className)}>
    {children}
  </div>
);
