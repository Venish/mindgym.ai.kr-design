import { create } from "zustand";
import React from "react";

export type ModalType = "slide-up" | "slide-left";

export interface ModalItem {
  id: string;
  type: ModalType;
  content: React.ReactNode;
  onClose?: () => void;
}

interface ModalState {
  modalStack: ModalItem[];
  isOpen: boolean;
  openModal: (params: { type: ModalType; content: React.ReactNode; onClose?: () => void }) => void;
  closeModal: () => void;
  clearModals: () => void;
}

/**
 * 전역 App-Like Overlay 모달 Zustand 스토어 (다중 오버레이 스택 지원)
 * - 모달 위에 모달(예: 마이페이지 시트 위에 3단계 지향점 위저드)이 차곡차곡 쌓여 0ms로 나타남
 */
export const useModalStore = create<ModalState>((set, get) => ({
  modalStack: [],
  get isOpen() {
    return get().modalStack.length > 0;
  },

  openModal: ({ type, content, onClose }) => {
    const newItem: ModalItem = {
      id: Math.random().toString(36).substring(2, 9),
      type,
      content,
      onClose,
    };
    set((state) => ({ modalStack: [...state.modalStack, newItem] }));
  },

  closeModal: () => {
    const stack = get().modalStack;
    if (stack.length === 0) return;

    const topModal = stack[stack.length - 1];
    if (topModal.onClose) {
      topModal.onClose();
    }

    set((state) => ({ modalStack: state.modalStack.slice(0, -1) }));
  },

  clearModals: () => {
    set({ modalStack: [] });
  },
}));
