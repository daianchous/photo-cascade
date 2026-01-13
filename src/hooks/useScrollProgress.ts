import { create } from 'zustand';

interface ScrollState {
  scrollProgress: number; // 0 = hero, 1 = gallery fully visible, 2 = text section
  setScrollProgress: (progress: number) => void;
}

export const useScrollProgress = create<ScrollState>((set) => ({
  scrollProgress: 0,
  setScrollProgress: (progress) => set({ scrollProgress: progress }),
}));
