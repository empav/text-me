import { create } from 'zustand';

interface ProfileDrawerStore {
  isOpen: boolean;
  toggle: () => void;
  setOpen: () => void;
  open: () => void;
  close: () => void;
}

const useProfileDrawer = create<ProfileDrawerStore>((set) => ({
  isOpen: false,
  setOpen: () => set({ isOpen: true }),
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export default useProfileDrawer;
