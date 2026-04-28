import { create } from "zustand";

interface SidebarStore {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
  open: () => void;
}

export const useSidebarStore = create<SidebarStore>((set) => ({
  isOpen: true,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  close: () => set({ isOpen: false }),
  open: () => set({ isOpen: true }),
}));

interface FilterStore {
  season: string | null;
  year: number | null;
  status: string | null;
  phase: string | null;
  setSeason: (season: string | null) => void;
  setYear: (year: number | null) => void;
  setStatus: (status: string | null) => void;
  setPhase: (phase: string | null) => void;
  reset: () => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
  season: null,
  year: null,
  status: null,
  phase: null,
  setSeason: (season) => set({ season }),
  setYear: (year) => set({ year }),
  setStatus: (status) => set({ status }),
  setPhase: (phase) => set({ phase }),
  reset: () => set({ season: null, year: null, status: null, phase: null }),
}));
