import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { ContactDTO } from '../dtos';

interface Store {
  contactList: ContactDTO[];
  setNewContact: (data: ContactDTO) => void;
  removeContact: (contactId: string) => void;
  editContact: (updatedContact: ContactDTO) => void;
}

const sortByName = (list: ContactDTO[]) =>
  [...list].sort((a, b) =>
    a.name.localeCompare(b.name, 'pt-BR'),
  );

export const useContactList = create<Store>()(
  persist(
    (set, get) => ({
      contactList: [],
      setNewContact: (newContact: ContactDTO) => {
        const contactList = get().contactList;

        const updatedList = sortByName([
          ...contactList,
          newContact,
        ]);

        set({ contactList: updatedList });
      },
      editContact: (updatedContact: ContactDTO) => {
        const updatedList = get().contactList.map(contact =>
          contact.id === updatedContact.id
            ? updatedContact
            : contact,
        );

        set({ contactList: sortByName(updatedList) });
      },
      removeContact: (contactId: string) => {
        const filtered = get().contactList.filter(
          contact => contact.id !== contactId,
        );

        set({ contactList: sortByName(filtered) });
      },
    }),
    {
      name: '_gm-contactList',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
