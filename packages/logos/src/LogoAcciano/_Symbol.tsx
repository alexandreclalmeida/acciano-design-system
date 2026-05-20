import React from 'react';

interface SymbolProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const _Symbol: React.FC<SymbolProps> = ({ size = 32, className, style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className={className}
    style={style}
  >
    <path
      opacity="0.2"
      d="M30.5 16C30.5 7.99187 24.0081 1.5 16 1.5C7.99187 1.5 1.5 7.99187 1.5 16C1.5 24.0081 7.99187 30.5 16 30.5V32C7.16344 32 0 24.8366 0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16C32 24.8366 24.8366 32 16 32V30.5C24.0081 30.5 30.5 24.0081 30.5 16Z"
      fill="currentColor"
    />
    <path d="M16 0L19 13L16 10.1111L13 13L16 0Z" fill="currentColor" />
    <path opacity="0.4" d="M16 32L19 19L16 21.8889L13 19L16 32Z" fill="currentColor" />
    <path opacity="0.4" d="M0 16L13 13L10.1111 16L13 19L0 16Z" fill="currentColor" />
    <path opacity="0.4" d="M32 16L19 13L21.8889 16L19 19L32 16Z" fill="currentColor" />
    <path
      d="M16 19C17.6569 19 19 17.6569 19 16C19 14.3431 17.6569 13 16 13C14.3431 13 13 14.3431 13 16C13 17.6569 14.3431 19 16 19Z"
      fill="currentColor"
    />
  </svg>
);
