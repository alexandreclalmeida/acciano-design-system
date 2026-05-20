import React from 'react';
import clsx from 'clsx';
import { ButtonGroupContext } from './ButtonGroupContext';
import styles from './ButtonGroup.module.css';

export type ButtonGroupLayout = 'Horizontal' | 'Vertical';
export type ButtonGroupOrder = 'Default' | 'Reverse';
export type ButtonGroupSize = 'Large' | 'Medium' | 'Small';

export interface ButtonGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  layout?: ButtonGroupLayout;
  order?: ButtonGroupOrder;
  size?: ButtonGroupSize;
  children: React.ReactNode;
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  layout = 'Horizontal',
  order = 'Default',
  size = 'Medium',
  children,
  className,
  ...rest
}) => (
  <ButtonGroupContext.Provider value={size}>
    <div
      {...rest}
      className={clsx(
        styles.root,
        styles[`layout--${layout}`],
        order === 'Reverse' && styles['order--Reverse'],
        className,
      )}
    >
      {children}
    </div>
  </ButtonGroupContext.Provider>
);
