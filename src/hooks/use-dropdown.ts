'use client';

import { useState, useCallback } from 'react';

type UseDropdownReturn = {
  isOpen: null | HTMLElement;
  handleOpen: (event: React.MouseEvent) => void;
  handleClose: () => void;
  handleSelectOption: (onSelect: (() => void) | null) => void;
};

const useDropdown = (): UseDropdownReturn => {
  const [isOpen, setIsOpen] = useState<null | HTMLElement>(null);

  const handleOpen = useCallback((event: React.MouseEvent) => {
    setIsOpen(event.currentTarget as HTMLElement);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(null);
  }, []);

  const handleSelectOption = useCallback((onSelect: (() => void) | null) => {
    if (onSelect) {
      onSelect();
    }
    setIsOpen(null);
  }, []);

  return { isOpen, handleOpen, handleClose, handleSelectOption };
};

export default useDropdown;
