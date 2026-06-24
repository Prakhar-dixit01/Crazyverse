import { create } from 'zustand';

interface AppState {
  chaosMode: boolean;
  toggleChaosMode: () => void;
  isMatrixMode: boolean;
  toggleMatrixMode: () => void;
}

export const useStore = create<AppState>((set) => ({
  chaosMode: false,
  toggleChaosMode: () => set((state) => ({ chaosMode: !state.chaosMode })),
  isMatrixMode: false,
  toggleMatrixMode: () => set((state) => ({ isMatrixMode: !state.isMatrixMode })),
}));
