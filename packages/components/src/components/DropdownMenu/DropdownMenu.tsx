import React from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import { MoreVertical, ChevronUp, ChevronDown } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Button } from '../Button/Button';
import { IconButton } from '../IconButton/IconButton';
import { AvatarDropdown } from '../AvatarDropdown/AvatarDropdown';
import { DropdownMenuContext } from './DropdownMenuContext';
import { useDropdownPosition } from './useDropdownPosition';
import type { DropdownAlign } from './useDropdownPosition';
import { getPortalContainer } from '../../utils/getPortalContainer';
import styles from './DropdownMenu.module.css';

export type { DropdownAlign };
export type DropdownMenuTriggerType = 'Button' | 'Icon' | 'Avatar';

export interface DropdownMenuProps {
  triggerType?: DropdownMenuTriggerType;
  label?: string;
  triggerIcon?: LucideIcon;
  avatarSrc?: string;
  avatarName?: string;
  avatarEmail?: string;
  avatarSize?: 'Medium' | 'Small';
  align?: DropdownAlign;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  triggerType = 'Button',
  label = 'Label',
  triggerIcon: TriggerIcon = MoreVertical,
  avatarSrc,
  avatarName = '',
  avatarEmail,
  avatarSize = 'Medium',
  align = 'BottomLeft',
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  children,
  className,
}) => {
  const isControlled = openProp !== undefined;
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const isOpen = isControlled ? openProp! : internalOpen;

  const triggerRef = React.useRef<HTMLDivElement>(null);
  const listRef = React.useRef<HTMLDivElement>(null);
  const listStyle = useDropdownPosition(triggerRef, isOpen, align);

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (!isControlled) setInternalOpen(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange],
  );

  const toggle = () => setOpen(!isOpen);

  React.useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      if (!triggerRef.current?.contains(target) && !listRef.current?.contains(target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen, setOpen]);

  React.useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, setOpen]);

  const contextValue = React.useMemo(
    () => ({ onItemClick: (keepOpen: boolean) => { if (!keepOpen) setOpen(false); } }),
    [setOpen],
  );

  const renderTrigger = () => {
    switch (triggerType) {
      case 'Button':
        return (
          <Button
            variant="Secondary"
            tone="Brand"
            leadingIcon={TriggerIcon !== MoreVertical ? TriggerIcon : undefined}
            trailingIcon={isOpen ? ChevronUp : ChevronDown}
            onClick={toggle}
          >
            {label}
          </Button>
        );
      case 'Icon':
        return (
          <IconButton
            variant="Tertiary"
            tone="Neutral"
            icon={TriggerIcon}
            aria-label={label}
            onClick={toggle}
          />
        );
      case 'Avatar':
        return (
          <AvatarDropdown
            type="Button"
            size={avatarSize}
            isOpen={isOpen}
            name={avatarName}
            email={avatarEmail}
            src={avatarSrc}
            onClick={toggle}
          />
        );
    }
  };

  return (
    <DropdownMenuContext.Provider value={contextValue}>
      <div ref={triggerRef} className={clsx(styles.root, className)}>
        {renderTrigger()}
      </div>
      {isOpen &&
        createPortal(
          <div ref={listRef} style={{ ...listStyle, pointerEvents: 'auto' }}>
            {children}
          </div>,
          getPortalContainer(),
        )}
    </DropdownMenuContext.Provider>
  );
};
