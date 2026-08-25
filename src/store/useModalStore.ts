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
  replaceModal: (params: { type: ModalType; content: React.ReactNode; onClose?: () => void }) => void;
  closeModal: () => void;
  clearModals: () => void;
}

/**
 * 전역 App-Like Overlay 모달 Zustand 스토어 (다중 오버레이 스택 및 치환 지원)
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

  replaceModal: ({ type, content, onClose }) => {
    const newItem: ModalItem = {
      id: Math.random().toString(36).substring(2, 9),
      type,
      content,
      onClose,
    };
    set((state) => {
      const currentStack = state.modalStack;
      if (currentStack.length === 0) {
        return { modalStack: [newItem] };
      }
      const topModal = currentStack[currentStack.length - 1];
      if (topModal.onClose) {
        try {
          topModal.onClose();
        } catch (e) {
          console.error("onClose error in replaceModal:", e);
        }
      }
      return { modalStack: [...currentStack.slice(0, -1), newItem] };
    });
  },

  closeModal: () => {
    const stack = get().modalStack;
    if (stack.length === 0) return;

    const topModal = stack[stack.length - 1];
    if (topModal.onClose) {
      try {
        topModal.onClose();
      } catch (e) {
        console.error("onClose error in closeModal:", e);
      }
    }

    set((state) => ({ modalStack: state.modalStack.slice(0, -1) }));
  },

  clearModals: () => {
    const stack = get().modalStack;
    stack.forEach((modal) => {
      if (modal.onClose) {
        try {
          modal.onClose();
        } catch (e) {
          console.error("onClose error in clearModals:", e);
        }
      }
    });
    set({ modalStack: [] });
  },
}));
