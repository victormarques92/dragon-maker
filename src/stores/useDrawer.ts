import { create } from 'zustand';

interface Store {
  openDrawer: boolean;
  setOpenDrawer: (value: boolean) => void;
}

export const useDrawer = create<Store>()(set => ({
  openDrawer: false,
  setOpenDrawer: (value: boolean) => set({ openDrawer: value }),
}));
