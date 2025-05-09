import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { UserDTO } from '../dtos';
import { useContactList } from './useContactList';

interface Store {
  registeredUsers: UserDTO[];
  setNewUser: (data: UserDTO) => void;
  removeRegisteredUser: (userId: string) => void;
}

export const useRegisteredUsers = create<Store>()(
  persist(
    (set, get) => ({
      registeredUsers: [],
      setNewUser: (newUser: UserDTO) => {
        const registeredUsers = get().registeredUsers;

        set({
          registeredUsers: [...registeredUsers, newUser],
        });
      },
      removeRegisteredUser: (userId: string) => {
        const { contactList, removeContact } =
          useContactList.getState();

        contactList
          .filter(contact => contact.createdBy === userId)
          .forEach(contact => {
            if (contact.id) {
              removeContact(contact.id);
            }
          });

        const filtered = get().registeredUsers.filter(
          user => user.id !== userId,
        );

        set({ registeredUsers: filtered });
      },
    }),
    {
      name: '_gm-registeredUsers',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
