"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkle, Check } from "@phosphor-icons/react";
import { useMindGym } from "@/context/MindGymContext";
import { MagicButton } from "@/components/godui/MagicButton";
import { AnimatedArrowRightIcon } from "@/components/animated-icons/AnimatedArrowRightIcon";

interface IntentionWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const INTENTION_KEYWORDS = [
  "안정된",
  "자기자비 넘치는",
  "불안을 흘려보내는",
  "자존감이 솟아나는",
  "나에게 다정한",
  "차분하고 균형잡힌",
];

/**
 * IntentionWizardModal: 온보딩 & 메인 대시보드 전역 공통 [이달의 나] 지향 감정어 선택 모달
 * - "8월" 월 텍스트와 분리되어 오직 지향 감정어("안정된")만 선택 및 설정
 */
export function IntentionWizardModal({
  isOpen,
  onClose,
}: IntentionWizardModalProps) {
  const { currentIntention, setCurrentIntention } = useMindGym();
  
  // "안정된 8월" 형태로 저장된 데이터에서 "안정된"만 추출 보정
  const initialCleanKeyword = currentIntention.replace(/\s*\d+월\s*/g, "").trim() || "안정된";
  const [selected, setSelected] = useState(initialCleanKeyword);

  useEffect(() => {
    if (isOpen) {
      const clean = currentIntention.replace(/\s*\d+월\s*/g, "").trim() || "안정된";
      setSelected(clean);
    }
  }, [isOpen, currentIntention]);

  if (!isOpen) return null;

  const handleSave = () => {
    setCurrentIntention(selected);
    onClose();
  };

  return (
    <AnimatePresence>
      <div
        style={{ zIndex: 9999 }}
        className="fixed inset-0 max-w-[430px] mx-auto flex items-center justify-center p-5 pointer-events-auto select-none"
      >
        {/* iOS Glass 백드롭 (z-9999) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          onClick={onClose}
          style={{ zIndex: 9999 }}
          className="absolute inset-0 bg-black/35 backdrop-blur-md cursor-pointer"
        />

        {/* 메인 팝업 본체 (rounded-[28px], shadow-2xl) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 10 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          style={{ zIndex: 10000 }}
          className="w-full max-w-[360px] bg-white rounded-[28px] p-6 shadow-2xl flex flex-col gap-4 relative overflow-hidden border border-emerald-100/50 text-left"
        >
          {/* 상단 은은한 그린 앰비언트 글로우 */}
          <div className="absolute -top-12 -right-12 w-36 h-36 bg-[#00C474]/10 rounded-full blur-2xl pointer-events-none" />

          {/* 타이틀 헤더 */}
          <div className="flex flex-col gap-1 relative z-10">
            <div className="flex items-center gap-1.5 text-[#00C474]">
              <Sparkle size={20} weight="fill" />
              <span className="text-xs font-extrabold tracking-tight bg-emerald-50 px-2.5 py-0.5 rounded-full">
                이달의 나 선택
              </span>
            </div>
            <h3 className="text-xl font-black text-gray-900 tracking-tight leading-snug mt-1">
              8월을 이끌어갈 마음 지향어
            </h3>
            <p className="txt-caption-main text-gray-500 font-medium leading-relaxed">
              이번 달 내 마음 정원이 지향할 핵심 가치어를 선택해 주세요.
            </p>
          </div>

          {/* 키워드 리스트 선택 영역 */}
          <div className="grid grid-cols-1 gap-2 my-1 relative z-10">
            {INTENTION_KEYWORDS.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setSelected(item)}
                className={`py-3 px-4 rounded-2xl text-sm font-bold transition-all text-left flex items-center justify-between cursor-pointer active:scale-95 ${
                  selected === item
                    ? "bg-[#00C474] text-white shadow-md"
                    : "bg-gray-50 text-gray-800 hover:bg-gray-100"
                }`}
              >
                <span>"{item}" 8월</span>
                {selected === item && <Check size={18} weight="bold" />}
              </button>
            ))}
          </div>

          {/* 확인 버튼 */}
          <div className="pt-1 relative z-10">
            <MagicButton
              onClick={handleSave}
              className="w-full text-base font-extrabold py-3.5"
              rightIcon={<AnimatedArrowRightIcon size={18} />}
            >
              <span>"{selected}" 8월로 설정하기</span>
            </MagicButton>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
