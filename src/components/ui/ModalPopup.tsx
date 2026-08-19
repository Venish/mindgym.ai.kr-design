"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ModalPopupProps {
  isOpen: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  className?: string;
  duration?: number;
}

export function ModalPopup({
  isOpen,
  onClose,
  children,
  className = "",
  duration = 0.2,
}: ModalPopupProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-5">
          {/* 백드롭 오버레이 (opacity 0 -> 1 -> 0) / backdrop-blur 주석 처리 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration, ease: "easeOut" }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40"
          />

          {/* 공통 팝업 모달 본체 (scale 0.9, opacity 0 에서 시작 및 종료 / duration 250ms / ease) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{
              duration,
              ease: "easeOut",
            }}
            className={`bg-white text-left p-7 rounded-[28px] shadow-2xl shadow-emerald-900/15 max-w-sm w-full relative overflow-hidden border border-emerald-100/50 z-10 ${className}`}
          >
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
