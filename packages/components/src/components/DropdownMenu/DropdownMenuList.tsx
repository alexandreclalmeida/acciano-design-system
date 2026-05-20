import React from 'react';
import clsx from 'clsx';
import { DropdownMenuContext } from './DropdownMenuContext';
import { DropdownItem, type DropdownItemConfig } from './DropdownItem';
import styles from './DropdownMenuList.module.css';

export type { DropdownItemConfig, DropdownItemType } from './DropdownItem';

export interface DropdownMenuListProps {
  items: DropdownItemConfig[];
  /** Largura da lista. Default: 280px. Select pode passar a largura do campo. */
  width?: number | string;
  className?: string;
}

export const DropdownMenuList: React.FC<DropdownMenuListProps> = ({
  items,
  width,
  className,
}) => {
  const menuCtx = React.useContext(DropdownMenuContext);

  return (
    <div
      className={clsx(styles.list, className)}
      style={width !== undefined ? { width } : undefined}
    >
      {items.map((item, index) => {
        const isInteractiveRow =
          item.type !== 'Checkbox' &&
          item.type !== 'Heading' &&
          item.type !== 'Divider' &&
          item.switchChecked === undefined;

        return (
          <DropdownItem
            key={index}
            {...item}
            onClick={
              isInteractiveRow
                ? () => {
                    item.onClick?.();
                    menuCtx?.onItemClick(false);
                  }
                : item.onClick
            }
          />
        );
      })}
    </div>
  );
};
