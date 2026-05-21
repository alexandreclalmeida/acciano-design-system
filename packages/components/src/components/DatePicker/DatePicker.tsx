import React from 'react';
import clsx from 'clsx';
import { createPortal } from 'react-dom';
import { Calendar as CalendarIcon, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { useDropdownPosition } from '../DropdownMenu/useDropdownPosition';
import { getPortalContainer } from '../../utils/getPortalContainer';
import styles from './DatePicker.module.css';

// ─── Helpers ─────────────────────────────────────────────

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function formatDate(date: Date) {
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = date.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

// ─── Calendar cell ────────────────────────────────────────

type CalendarCellMonth = 'prev' | 'current' | 'next';
type CalendarDayType = 'Default' | 'Weekend' | 'Selected' | 'Today' | 'Other';

interface CalendarCell {
  day: number;
  month: CalendarCellMonth;
  date: Date;
}

function buildCalendarCells(year: number, month: number): CalendarCell[] {
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const cells: CalendarCell[] = [];

  for (let i = firstWeekday - 1; i >= 0; i--) {
    const day = daysInPrevMonth - i;
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevYear = month === 0 ? year - 1 : year;
    cells.push({ day, month: 'prev', date: new Date(prevYear, prevMonth, day) });
  }

  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, month: 'current', date: new Date(year, month, d) });
  }

  const remainder = cells.length % 7;
  const nextCount = remainder === 0 ? 0 : 7 - remainder;
  for (let d = 1; d <= nextCount; d++) {
    const nextMonth = month === 11 ? 0 : month + 1;
    const nextYear = month === 11 ? year + 1 : year;
    cells.push({ day: d, month: 'next', date: new Date(nextYear, nextMonth, d) });
  }

  return cells;
}

function getDayType(cell: CalendarCell, selectedDate: Date | null, today: Date): CalendarDayType {
  if (cell.month !== 'current') return 'Other';
  if (isSameDay(cell.date, today)) return 'Today';
  if (selectedDate && isSameDay(cell.date, selectedDate)) return 'Selected';
  const weekday = cell.date.getDay();
  if (weekday === 0 || weekday === 6) return 'Weekend';
  return 'Default';
}

// ─── CalendarDay ─────────────────────────────────────────

interface CalendarDayProps {
  cell: CalendarCell;
  type: CalendarDayType;
  event?: boolean;
  onClick?: () => void;
}

const CalendarDay: React.FC<CalendarDayProps> = ({ cell, type, event = false, onClick }) => {
  const isOther = type === 'Other';

  const dotClass =
    type === 'Today'
      ? styles['eventDot--inverse']
      : isOther
        ? styles['eventDot--other']
        : styles['eventDot--brand'];

  if (isOther) {
    return (
      <div className={clsx(styles.day, styles['day--other'])}>
        <span className={styles.dayLabel}>{cell.day}</span>
        {event && <span className={clsx(styles.eventDot, dotClass)} />}
      </div>
    );
  }

  return (
    <button
      type="button"
      className={clsx(styles.day, styles[`day--${type.toLowerCase()}`])}
      onClick={onClick}
      aria-pressed={type === 'Selected' || undefined}
      aria-current={type === 'Today' ? 'date' : undefined}
    >
      <span className={styles.dayLabel}>{cell.day}</span>
      {event && <span className={clsx(styles.eventDot, dotClass)} />}
    </button>
  );
};

// ─── CalendarPanel ───────────────────────────────────────

interface CalendarPanelProps {
  year: number;
  month: number;
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  eventDates: Date[];
}

const CalendarPanel: React.FC<CalendarPanelProps> = ({
  year,
  month,
  selectedDate,
  onSelectDate,
  onPrevMonth,
  onNextMonth,
  eventDates,
}) => {
  const today = React.useMemo(() => new Date(), []);
  const cells = React.useMemo(() => buildCalendarCells(year, month), [year, month]);
  const hasEvent = (date: Date) => eventDates.some((ed) => isSameDay(ed, date));

  return (
    <div className={styles.calendar}>
      <div className={styles.calendarMonth}>
        <button
          type="button"
          className={styles.calendarNavBtn}
          onClick={onPrevMonth}
          aria-label="Previous month"
        >
          <ChevronLeft size={24} className={styles.calendarNavIcon} aria-hidden />
        </button>
        <div className={styles.calendarMonthLabel}>
          <span className={styles.calendarMonthText}>
            {MONTHS[month]} {year}
          </span>
        </div>
        <button
          type="button"
          className={styles.calendarNavBtn}
          onClick={onNextMonth}
          aria-label="Next month"
        >
          <ChevronRight size={24} className={styles.calendarNavIcon} aria-hidden />
        </button>
      </div>

      <div className={styles.calendarWeek}>
        {WEEKDAYS.map((wd) => (
          <div key={wd} className={styles.calendarWeekday}>
            <span className={styles.calendarWeekdayLabel}>{wd}</span>
          </div>
        ))}
      </div>

      <div className={styles.calendarDays}>
        {cells.map((cell, idx) => {
          const type = getDayType(cell, selectedDate, today);
          return (
            <CalendarDay
              key={idx}
              cell={cell}
              type={type}
              event={hasEvent(cell.date)}
              onClick={type !== 'Other' ? () => onSelectDate(cell.date) : undefined}
            />
          );
        })}
      </div>
    </div>
  );
};

// ─── DatePicker ──────────────────────────────────────────

export interface DatePickerProps {
  label?: string;
  hideLabel?: boolean;
  required?: boolean;
  optional?: boolean;
  id?: string;
  name?: string;
  value?: Date | null;
  defaultValue?: Date;
  onChange?: (date: Date) => void;
  error?: boolean;
  disabled?: boolean;
  helperText?: string;
  eventDates?: Date[];
  className?: string;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  label,
  hideLabel = false,
  required = false,
  optional = false,
  id: idProp,
  name,
  value,
  defaultValue,
  onChange,
  error = false,
  disabled = false,
  helperText,
  eventDates = [],
  className,
}) => {
  const generatedId = React.useId();
  const id = idProp ?? generatedId;

  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = React.useState<Date | null>(defaultValue ?? null);
  const selectedDate = isControlled ? (value ?? null) : internalValue;

  const [isOpen, setIsOpen] = React.useState(false);

  const [calYear, setCalYear] = React.useState(() => (selectedDate ?? new Date()).getFullYear());
  const [calMonth, setCalMonth] = React.useState(() => (selectedDate ?? new Date()).getMonth());

  React.useEffect(() => {
    if (selectedDate) {
      setCalYear(selectedDate.getFullYear());
      setCalMonth(selectedDate.getMonth());
    }
  }, [selectedDate]);

  const fieldWrapRef = React.useRef<HTMLDivElement>(null);
  const calendarRef = React.useRef<HTMLDivElement>(null);
  const calendarStyle = useDropdownPosition(fieldWrapRef, isOpen, 'BottomLeft');

  const handleSelectDate = (date: Date) => {
    if (!isControlled) setInternalValue(date);
    onChange?.(date);
    setIsOpen(false);
  };

  const handleToggle = () => setIsOpen((prev) => !prev);

  const handlePrevMonth = () =>
    setCalMonth((m) => {
      if (m === 0) { setCalYear((y) => y - 1); return 11; }
      return m - 1;
    });

  const handleNextMonth = () =>
    setCalMonth((m) => {
      if (m === 11) { setCalYear((y) => y + 1); return 0; }
      return m + 1;
    });

  React.useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      if (!fieldWrapRef.current?.contains(target) && !calendarRef.current?.contains(target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen]);

  React.useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen]);

  const fieldWidth = fieldWrapRef.current?.offsetWidth;
  const helperRole = disabled ? 'disabled' : error ? 'critical' : 'hint';
  const displayValue = selectedDate ? formatDate(selectedDate) : '';

  return (
    <div className={clsx(styles.root, disabled && styles['root--disabled'], className)}>
      {!hideLabel && label && (
        <label htmlFor={id} className={styles.label}>
          <span className={styles.labelText}>{label}</span>
          {required && <span className={styles.labelRequired}>*</span>}
          {optional && !required && <span className={styles.labelOptional}>(optional)</span>}
        </label>
      )}

      <div ref={fieldWrapRef} className={styles.fieldWrap}>
        {disabled ? (
          <div className={clsx(styles.field, styles['field--disabled'])}>
            <div className={styles.content}>
              <span className={clsx(styles.valueText, styles['valueText--disabled'])}>{displayValue}</span>
              <CalendarIcon size={24} className={styles.icon} aria-hidden />
            </div>
          </div>
        ) : (
          <button
            id={id}
            type="button"
            className={clsx(styles.field, error && styles['field--critical'])}
            aria-expanded={isOpen}
            aria-haspopup="dialog"
            aria-describedby={helperText ? `${id}-helper` : undefined}
            onClick={handleToggle}
          >
            <div className={styles.content}>
              <span className={styles.valueText}>{displayValue}</span>
              <CalendarIcon size={24} className={styles.icon} aria-hidden />
            </div>
          </button>
        )}
      </div>

      {helperText && (
        <div
          id={`${id}-helper`}
          className={clsx(
            styles.helper,
            helperRole === 'critical' && styles['helper--critical'],
            helperRole === 'disabled' && styles['helper--disabled'],
          )}
          aria-live={helperRole === 'critical' ? 'polite' : undefined}
        >
          {helperRole === 'critical' && <AlertCircle size={20} className={styles.helperIcon} aria-hidden />}
          <span>{helperText}</span>
        </div>
      )}

      {name && selectedDate && <input type="hidden" name={name} value={selectedDate.toISOString()} />}

      {isOpen &&
        createPortal(
          <div
            ref={calendarRef}
            style={{ ...calendarStyle, width: fieldWidth, pointerEvents: 'auto' }}
            role="dialog"
            aria-label="Choose date"
            aria-modal="true"
          >
            <CalendarPanel
              year={calYear}
              month={calMonth}
              selectedDate={selectedDate}
              onSelectDate={handleSelectDate}
              onPrevMonth={handlePrevMonth}
              onNextMonth={handleNextMonth}
              eventDates={eventDates}
            />
          </div>,
          getPortalContainer(),
        )}
    </div>
  );
};
