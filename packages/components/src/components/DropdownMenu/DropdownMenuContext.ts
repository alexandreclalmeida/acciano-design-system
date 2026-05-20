import React from 'react';

interface DropdownMenuContextValue {
  onItemClick: (keepOpen: boolean) => void;
}

export const DropdownMenuContext = React.createContext<DropdownMenuContextValue | null>(null);
