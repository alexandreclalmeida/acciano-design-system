import React from 'react';
import type { ButtonGroupSize } from './ButtonGroup';

/** Fornece o `size` do ButtonGroup para filhos Button e IconButton. */
export const ButtonGroupContext = React.createContext<ButtonGroupSize | null>(null);
