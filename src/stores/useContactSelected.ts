import { create } from 'zustand';
import type { ContactDTO } from '../dtos';

interface Store {
  currentContact?: ContactDTO;
  setCurrentContact: (contact: ContactDTO) => void;
}

export const useContactSelected = create<Store>()(set => ({
  currentContact: undefined,
  setCurrentContact: (contact: ContactDTO) =>
    set({ currentContact: contact }),
}));
