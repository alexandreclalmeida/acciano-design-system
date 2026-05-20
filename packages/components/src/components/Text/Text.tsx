import React from 'react';
import { clsx } from 'clsx';
import styles from './Text.module.css';

export type TextVariant =
  | 'Hero'
  | 'H1'
  | 'H2'
  | 'H3'
  | 'H4'
  | 'H5'
  | 'Lead'
  | 'Large'
  | 'Base'
  | 'Small'
  | 'Tiny'
  | 'Nano'
  | 'Link'
  | 'Uppercase'
  | 'Code';

export interface TextProps {
  /** Variante tipográfica do texto */
  variant?: TextVariant;
  /** Elemento HTML renderizado */
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
}

export const Text: React.FC<TextProps> = ({
  variant = 'Base',
  as: Tag = 'p',
  children,
  className,
}) => {
  return (
    <Tag className={clsx(styles.text, styles[`variant--${variant}`], className)}>
      {children}
    </Tag>
  );
};
