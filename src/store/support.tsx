import { create } from "zustand";

interface SupportState {
  showSupportPopup: boolean;
  setShowSupportPopup: (show: boolean) => void;
}

export const useSupportStore = create<SupportState>((set) => ({
  showSupportPopup: false,
  setShowSupportPopup: (show) => set({ showSupportPopup: show }),
}));
