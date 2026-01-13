import { create } from 'zustand';

interface GalleryState {
  activeTag: string;
  hoveredCaseId: string | null;
  lockedTag: string | null;
  
  // Actions
  setActiveTag: (tag: string) => void;
  setHoveredCaseId: (id: string | null) => void;
  toggleLockedTag: (tag: string) => void;
  clearSelection: () => void;
}

export const useGalleryState = create<GalleryState>((set) => ({
  activeTag: 'all',
  hoveredCaseId: null,
  lockedTag: null,
  
  setActiveTag: (tag) => set({ activeTag: tag }),
  setHoveredCaseId: (id) => set({ hoveredCaseId: id }),
  toggleLockedTag: (tag) => set((state) => ({
    lockedTag: state.lockedTag === tag ? null : tag,
    activeTag: state.lockedTag === tag ? 'all' : tag,
  })),
  clearSelection: () => set({ activeTag: 'all', lockedTag: null, hoveredCaseId: null }),
}));
