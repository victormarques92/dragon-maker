import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { UserDTO } from '../dtos';

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
