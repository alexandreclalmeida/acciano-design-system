import React from 'react';
import clsx from 'clsx';
import { ChevronDown, ChevronUp } from 'lucide-react';
import styles from './Accordion.module.css';

// ─── Accordion ────────────────────────────────────

export interface AccordionProps {
  children: React.ReactNode;
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({ children, className }) => (
  <div className={clsx(styles.root, className)}>{children}</div>
);

// ─── AccordionItem ─────────────────────────────────

export interface AccordionItemProps {
  heading: string;
  children?: React.ReactNode;
  disabled?: boolean;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  heading,
  children,
  disabled = false,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  className,
}) => {
  const id = React.useId();
  const triggerId = `accordion-trigger-${id}`;
  const panelId = `accordion-panel-${id}`;

  const isControlled = openProp !== undefined;
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const isOpen = isControlled ? openProp : uncontrolledOpen;

  const toggle = () => {
    if (!isControlled) setUncontrolledOpen((o) => !o);
    onOpenChange?.(!isOpen);
  };

  return (
    <div
      className={clsx(
        styles.item,
        isOpen && styles['item--open'],
        disabled && styles['item--disabled'],
        className,
      )}
    >
      <button
        id={triggerId}
        type="button"
        disabled={disabled}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={toggle}
        className={styles.trigger}
      >
        <span className={styles.heading}>{heading}</span>
        {isOpen ? (
          <ChevronUp size={24} aria-hidden className={styles.icon} />
        ) : (
          <ChevronDown size={24} aria-hidden className={styles.icon} />
        )}
      </button>
      {isOpen && (
        <div
          id={panelId}
          role="region"
          aria-labelledby={triggerId}
          className={styles.content}
        >
          {children}
        </div>
      )}
    </div>
  );
};
