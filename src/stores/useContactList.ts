import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { ContactDTO } from '../dtos';
import { useUser } from './useUser';

interface Store {
  contactList: ContactDTO[];
  setNewContact: (data: ContactDTO) => void;
  removeContact: (contactId: string) => void;
  editContact: (updatedContact: ContactDTO) => void;
}

export const useContactList = create<Store>()(
  persist(
    (set, get) => ({
      contactList: [],
      setNewContact: (newContact: ContactDTO) => {
        const { user } = useUser.getState();

        const contactList = get().contactList;

        const updatedList = [
          ...contactList,
          {
            ...newContact,
            createdBy: user?.id as string,
          },
        ];

        set({ contactList: updatedList });
      },
      editContact: (updatedContact: ContactDTO) => {
        const updatedList = get().contactList.map(contact =>
          contact.id === updatedContact.id
            ? updatedContact
            : contact,
        );

        set({ contactList: updatedList });
      },
      removeContact: (contactId: string) => {
        const filtered = get().contactList.filter(
          contact => contact.id !== contactId,
        );

        set({ contactList: filtered });
      },
    }),
    {
      name: '_gm-contactList',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
