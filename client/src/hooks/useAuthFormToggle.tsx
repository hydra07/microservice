import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AuthFormToggleStore {
  isOpen: boolean;
  setIsOpen: (open?: boolean) => void;
}

export const useAuthFormToggle = create(
  persist<AuthFormToggleStore>(
    (set, get) => ({
      isOpen: true,
      setIsOpen: (open?: boolean) => {
        open !== undefined
          ? set({ isOpen: open })
          : set({ isOpen: !get().isOpen });
      },
    }),
    {
      name: 'authFormOpen',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
