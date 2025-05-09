import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { UserDTO } from '../dtos';

interface Store {
  user?: UserDTO;
  setUser: (data: UserDTO) => void;
  removeUser: () => void;
}

export const useUser = create<Store>()(
  persist(
    set => ({
      user: undefined,
      setUser: (data: UserDTO) => set({ user: data }),
      removeUser: () => set({ user: undefined }),
    }),
    {
      name: '_gm-user',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
