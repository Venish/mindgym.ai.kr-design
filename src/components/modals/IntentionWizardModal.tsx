"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkle, Check } from "@phosphor-icons/react";
import { useMindGym } from "@/context/MindGymContext";
import { MagicButton } from "../godui/MagicButton";
import { AnimatedArrowRightIcon } from "../animated-icons/AnimatedArrowRightIcon";

export function IntentionWizardModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { currentIntention, setCurrentIntention } = useMindGym();
  const [selected, setSelected] = useState(currentIntention);

  const intentions = [
    "안정된 8월",
    "자기자비 넘치는 달",
    "불안을 흘려보내는 달",
    "자존감이 솟아나는 달",
    "나에게 다정한 달",
    "차분하고 균형잡힌 달",
  ];

  if (!isOpen) return null;

  const handleSave = () => {
    setCurrentIntention(selected);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/55 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="w-full max-w-md bg-white rounded-[32px] p-6 shadow-2xl flex flex-col gap-5"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[#00C474]">
              <Sparkle size={24} weight="fill" />
              <h3 className="text-lg font-black text-gray-900">이달의 지향 감정어 설정</h3>
            </div>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 text-gray-400">
              <X size={20} />
            </button>
          </div>

          <div>
            <p className="text-xs font-semibold text-gray-500">
              이번 달 내 마음 정원이 지향할 핵심 가치 문구를 선택해 주세요.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-2.5 my-1">
            {intentions.map((item) => (
              <button
                key={item}
                onClick={() => setSelected(item)}
                className={`py-3.5 px-4 rounded-2xl text-sm font-bold transition-all text-left flex items-center justify-between ${
                  selected === item
                    ? "bg-[#00C474] text-white shadow-soft"
                    : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span>"{item}" 가꾸기</span>
                {selected === item && <Check size={18} weight="bold" />}
              </button>
            ))}
          </div>

          <MagicButton onClick={handleSave} className="w-full" rightIcon={<AnimatedArrowRightIcon size={18} />}>
            <span>지향점 설정하기</span>
          </MagicButton>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
