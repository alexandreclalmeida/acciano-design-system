import React from 'react';
import clsx from 'clsx';
import styles from './Tooltip.module.css';

export type TooltipDirection = 'Up' | 'Down' | 'Left' | 'Right';
export type TooltipSize = 'Small' | 'Large';

export interface TooltipProps {
  content: React.ReactNode;
  description?: React.ReactNode;
  direction?: TooltipDirection;
  size?: TooltipSize;
  children: React.ReactElement;
  className?: string;
}

// Cada direção tem path e dimensões próprias — sem rotação CSS,
// que manteria o box de layout nas dimensões originais e criaria gap.
const ARROW_SHAPES: Record<
  TooltipDirection,
  { width: number; height: number; d: string }
> = {
  Up:    { width: 12, height: 8,  d: 'M0 0L12 0L6 8Z' },   // aponta para baixo
  Down:  { width: 12, height: 8,  d: 'M0 8L12 8L6 0Z' },   // aponta para cima
  Left:  { width: 8,  height: 12, d: 'M0 0L8 6L0 12Z' },   // aponta para direita
  Right: { width: 8,  height: 12, d: 'M8 0L0 6L8 12Z' },   // aponta para esquerda
};

const Arrow: React.FC<{ direction: TooltipDirection }> = ({ direction }) => {
  const { width, height, d } = ARROW_SHAPES[direction];
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      aria-hidden="true"
      className={styles.arrow}
    >
      <path d={d} fill="currentColor" />
    </svg>
  );
};

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  description,
  direction = 'Up',
  size = 'Small',
  children,
  className,
}) => {
  const id = React.useId();
  const [visible, setVisible] = React.useState(false);
  const hideTimer = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const show = () => {
    clearTimeout(hideTimer.current);
    setVisible(true);
  };

  const hide = () => {
    hideTimer.current = setTimeout(() => setVisible(false), 100);
  };

  React.useEffect(() => () => clearTimeout(hideTimer.current), []);

  const isLarge = size === 'Large';
  const arrowFirst = direction === 'Down' || direction === 'Right';

  const arrowEl = (
    <div className={clsx(styles.arrowWrap, styles[`arrowWrap--${direction.toLowerCase()}`])}>
      <Arrow direction={direction} />
    </div>
  );

  const balloonEl = (
    <div className={clsx(styles.balloon, isLarge && styles['balloon--large'])}>
      <span className={clsx(styles.content, isLarge && styles['content--large'])}>{content}</span>
      {isLarge && description && <span className={styles.description}>{description}</span>}
    </div>
  );

  return (
    <div
      className={clsx(styles.root, className)}
      onMouseEnter={show}
      onMouseLeave={hide}
    >
      {React.cloneElement(children, {
        'aria-describedby': id,
        onFocus: show,
        onBlur: hide,
      } as React.HTMLAttributes<HTMLElement>)}
      <div
        id={id}
        role="tooltip"
        className={clsx(
          styles.tooltip,
          styles[`direction--${direction.toLowerCase()}`],
          visible && styles['tooltip--visible'],
        )}
      >
        {arrowFirst ? (
          <>{arrowEl}{balloonEl}</>
        ) : (
          <>{balloonEl}{arrowEl}</>
        )}
      </div>
    </div>
  );
};
