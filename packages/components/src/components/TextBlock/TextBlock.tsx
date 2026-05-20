import React from 'react';
import clsx from 'clsx';
import styles from './TextBlock.module.css';

export type TextBlockAlign = 'Left' | 'Center';

export interface TextBlockProps {
  align?: TextBlockAlign;
  capsule?: React.ReactNode;
  heading?: string;
  text?: string;
  link?: React.ReactNode;
  className?: string;
}

export const TextBlock: React.FC<TextBlockProps> = ({
  align = 'Left',
  capsule,
  heading,
  text,
  link,
  className,
}) => {
  const isCenter = align === 'Center';

  return (
    <div className={clsx(styles.textBlock, isCenter && styles['align--Center'], className)}>
      {capsule}
      {(heading || text) && (
        <div className={clsx(styles.textGroup, isCenter && styles['textGroup--center'])}>
          {heading && (
            <h4 className={clsx(styles.heading, isCenter && styles['heading--center'])}>
              {heading}
            </h4>
          )}
          {text && (
            <p className={clsx(styles.text, isCenter && styles['text--center'])}>
              {text}
            </p>
          )}
        </div>
      )}
      {link}
    </div>
  );
};
