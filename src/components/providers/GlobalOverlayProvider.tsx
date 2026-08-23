"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useModalStore } from "@/store/useModalStore";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";

/**
 * GlobalOverlayProvider: 마인드짐 430px 모바일 프레임 맞춤 다중 모달 오버레이 뷰어 (Z-Index: z-40 스택)
 * - 중앙 useBodyScrollLock 훅을 사용하여 배경 대시보드 스크롤을 단일 통합 관리하는 뷰어
 */
export function GlobalOverlayProvider() {
  const { modalStack, closeModal } = useModalStore();

  // 모달 스택 카운트에 따른 중앙집중 스크롤 락 통합 통제
  useBodyScrollLock(modalStack.length > 0);

  return (
    <AnimatePresence>
      {modalStack.map((modal, index) => {
        const isSlideUp = modal.type === "slide-up";
        const zIndex = 40 + index * 5; // 첫 번째 모달 z-40, 두 번째 모달 z-45 ...

        return (
          /* 고정 430px 마스킹 프레임 (화면 중앙 정지, overflow-hidden으로 밖으로 튀어나오는 그래픽 100% 차단) */
          <motion.div
            key={modal.id}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 1 }}
            style={{ zIndex }}
            className="fixed inset-0 max-w-[430px] mx-auto flex items-end justify-center pointer-events-none select-none overflow-hidden"
          >
            {/* iOS 글래스모피즘 백드롭 (430px 고정 프레임 내부에서만 fade) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeModal}
              className="absolute inset-0 bg-black/15 backdrop-blur-md backdrop-saturate-150 pointer-events-auto cursor-default z-0"
            />

            {/* 실제 모달 콘텐츠 (430px 고정 마스킹 프레임 내부에서만 x: 100% -> 0 -> 100% 이동!) */}
            <motion.div
              initial={isSlideUp ? { y: "100%" } : { x: "100%" }}
              animate={isSlideUp ? { y: 0 } : { x: 0 }}
              exit={isSlideUp ? { y: "100%" } : { x: "100%" }}
              transition={{ type: "spring", stiffness: 380, damping: 36, mass: 0.9 }}
              className="w-full h-full bg-white flex flex-col relative overflow-y-auto no-scrollbar pointer-events-auto shadow-2xl z-10"
            >
              {modal.content}
            </motion.div>
          </motion.div>
        );
      })}
    </AnimatePresence>
  );
}
