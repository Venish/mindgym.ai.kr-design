"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Sparkle } from "@phosphor-icons/react";
import { MagicButton } from "../godui/MagicButton";
import { AnimatedArrowRightIcon } from "../animated-icons/AnimatedArrowRightIcon";

export function GoldenGardenModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="w-full max-w-sm bg-gradient-to-b from-amber-50 via-white to-amber-100/60 rounded-[32px] p-6 shadow-2xl text-center flex flex-col items-center gap-4 relative border border-amber-200/60"
        >
          <div className="w-20 h-20 bg-gradient-to-tr from-amber-400 to-yellow-300 rounded-full flex items-center justify-center shadow-lg text-white my-2">
            <Trophy size={44} weight="fill" />
          </div>

          <div>
            <span className="text-[11px] font-black tracking-widest text-amber-600 bg-amber-100/80 px-3 py-1 rounded-full uppercase">
              30-DAY GARDEN COMPLETED
            </span>
            <h3 className="text-2xl font-black text-gray-900 mt-2">
              30일 마음 정원 완공!
            </h3>
            <p className="text-xs font-semibold text-gray-600 mt-1.5 leading-relaxed">
              축하합니다! 끊임없는 노력으로 한 달간의 아름다운 마음 정원을 완성해 내셨습니다.
            </p>
          </div>

          <div className="w-full bg-white/90 p-4 rounded-2xl border border-amber-200/50 flex flex-col gap-2 text-left text-xs font-bold text-gray-700">
            <div className="flex items-center gap-2 text-amber-600">
              <Sparkle size={18} weight="fill" />
              <span>'Golden Garden' 스킨 해금</span>
            </div>
            <div className="flex items-center gap-2 text-amber-600">
              <Sparkle size={18} weight="fill" />
              <span>보너스 +30 덤벨 즉시 지급</span>
            </div>
            <div className="flex items-center gap-2 text-amber-600">
              <Sparkle size={18} weight="fill" />
              <span>30일 종합 분석 마음 리포트 생성</span>
            </div>
          </div>

          <MagicButton onClick={onClose} className="w-full mt-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-white border-none shadow-amber-200" rightIcon={<AnimatedArrowRightIcon size={18} />}>
            <span>골드 가든 스킨 적용하기</span>
          </MagicButton>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
