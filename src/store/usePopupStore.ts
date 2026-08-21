import { create } from "zustand";

interface PopupParams {
  title: string;
  subtitle?: string;
  inputLabel?: string;
  initialValue?: string;
  placeholder?: string;
  onConfirm: (val: string) => void;
}

interface PopupState {
  isOpen: boolean;
  params: PopupParams | null;
  openPopup: (params: PopupParams) => void;
  closePopup: () => void;
}

/**
 * 전역 최상위 공통 시스템 팝업 (Z-Index z-60) Zustand 스토어
 */
export const usePopupStore = create<PopupState>((set) => ({
  isOpen: false,
  params: null,
  openPopup: (params) => set({ isOpen: true, params }),
  closePopup: () => set({ isOpen: false, params: null }),
}));
