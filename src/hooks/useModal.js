import { useState } from 'react';

export default function useModal(defaultState = false) {
  const [isOpen, setIsOpen] = useState(defaultState);

  return {
    isOpen,
    openModal: () => setIsOpen(true),
    closeModal: () => setIsOpen(false),
    toggleModal: () => setIsOpen((current) => !current),
  };
}
