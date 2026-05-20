import React from 'react';

export type DropdownAlign = 'BottomLeft' | 'BottomRight' | 'TopLeft' | 'TopRight';

const GAP = 8;

export function useDropdownPosition(
  triggerRef: React.RefObject<HTMLElement | null>,
  open: boolean,
  align: DropdownAlign = 'BottomLeft',
): React.CSSProperties {
  const [style, setStyle] = React.useState<React.CSSProperties>({});
  const rafRef = React.useRef<number | null>(null);

  const compute = React.useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const isBottom = align.startsWith('Bottom');
    const isLeft = align.endsWith('Left');
    setStyle({
      position: 'fixed',
      zIndex: 1000,
      ...(isBottom
        ? { top: rect.bottom + GAP }
        : { bottom: window.innerHeight - rect.top + GAP }),
      ...(isLeft ? { left: rect.left } : { right: window.innerWidth - rect.right }),
    });
  }, [align, triggerRef]);

  const scheduleUpdate = React.useCallback(() => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      compute();
      rafRef.current = null;
    });
  }, [compute]);

  // Calcula a posição inicial de forma síncrona para evitar flash
  React.useLayoutEffect(() => {
    if (!open) { setStyle({}); return; }
    compute();
  }, [open, compute]);

  // Mantém a posição sincronizada durante scroll e resize
  React.useEffect(() => {
    if (!open) return;
    window.addEventListener('scroll', scheduleUpdate, { capture: true, passive: true });
    window.addEventListener('resize', scheduleUpdate);
    return () => {
      window.removeEventListener('scroll', scheduleUpdate, { capture: true });
      window.removeEventListener('resize', scheduleUpdate);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [open, scheduleUpdate]);

  return style;
}
