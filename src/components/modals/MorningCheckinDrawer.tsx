"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkle, ArrowRight } from "@phosphor-icons/react";
import { AnimatedMorningSun } from "../animated-icons/AnimatedMorningSun";
import { AnimatedArrowRightIcon } from "../animated-icons/AnimatedArrowRightIcon";
import { MagicButton } from "../godui/MagicButton";
import { useMindGym } from "@/context/MindGymContext";
import { useRouter } from "next/navigation";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";

export function MorningCheckinDrawer({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { userName, addDumbbells, markTodayCompleted } = useMindGym();
  const router = useRouter();
  const [step, setStep] = useState<"EMOTION" | "PRESCRIPTION">("EMOTION");
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  // 중앙 스크롤 락 훅 사용
  useBodyScrollLock(isOpen);

  useEffect(() => {
    setMounted(true);
  }, []);

  const emotions = ["상쾌함", "차분함", "설렘", "조금 피곤함", "불안함", "무기력함"];

  const handleSelectEmotion = (emo: string) => {
    setSelectedEmotion(emo);
  };

  const handleNextStep = () => {
    if (!selectedEmotion) return;
    setStep("PRESCRIPTION");
  };

  const handleStartRitual = () => {
    markTodayCompleted();
    addDumbbells(5);
    onClose();
    router.push("/player/RT-001");
  };

  if (!isOpen || !mounted) return null;

  return createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-end justify-center bg-black/50 backdrop-blur-xs">
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
          className="w-full max-w-[430px] bg-white rounded-t-3xl p-6 relative flex flex-col gap-5 max-h-[90vh] overflow-y-auto no-scrollbar"
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AnimatedMorningSun size={28} />
              <span className="text-sm font-bold text-[#00C474] tracking-tight">
                30초 체크인
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <X size={20} weight="bold" />
            </button>
          </div>

          {step === "EMOTION" ? (
            /* STEP 1: 감정 선택 */
            <div className="flex flex-col gap-5">
              <div>
                <h2 className="text-xl font-bold text-gray-900 leading-snug">
                  {userName || "보노보노"}님, <br />
                  오늘 아침 기분은 어떠신가요?
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  가장 마음에 와닿는 단어를 하나 선택해주세요.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {emotions.map((emo) => {
                  const isSelected = selectedEmotion === emo;
                  return (
                    <button
                      key={emo}
                      onClick={() => handleSelectEmotion(emo)}
                      className={`p-4 rounded-2xl border text-sm font-bold transition-all text-left flex items-center justify-between ${isSelected
                          ? "border-[#00C474] bg-[#EBFBF3] text-[#00874E] shadow-sm"
                          : "border-gray-100 bg-[#F9FAFB] text-gray-700 hover:border-gray-200"
                        }`}
                    >
                      <span>{emo}</span>
                      {isSelected && (
                        <span className="w-2 h-2 rounded-full bg-[#00C474]" />
                      )}
                    </button>
                  );
                })}
              </div>

              <button
                disabled={!selectedEmotion}
                onClick={handleNextStep}
                className={`w-full py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${selectedEmotion
                    ? "bg-[#00C474] text-white shadow-lg shadow-[#00C474]/20 active:scale-[0.98]"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
              >
                <span>다음 단계로</span>
                <ArrowRight size={18} weight="bold" />
              </button>
            </div>
          ) : (
            /* STEP 2: 처방 리추얼 안내 */
            <div className="flex flex-col gap-5">
              <div>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full mb-2">
                  <Sparkle size={12} weight="fill" /> 맞춤 마음 처방
                </span>
                <h2 className="text-xl font-bold text-gray-900 leading-snug">
                  [{selectedEmotion}] 마음을 위한 <br />
                  3분 호흡 리추얼이 준비되었어요
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  지금 바로 가볍게 호흡하며 하루를 시작해볼까요?
                </p>
              </div>

              <div className="bg-[#F8FAFC] rounded-2xl p-4 flex items-center gap-4 border border-gray-100">
                <div className="w-12 h-12 rounded-xl bg-[#EBFBF3] text-[#00C474] flex items-center justify-center font-black text-lg shrink-0">
                  01
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900">
                    아침 명상: 차분한 하루의 시작
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    소요시간 3분 · 덤벨 +5 DB
                  </p>
                </div>
              </div>

              <MagicButton
                onClick={handleStartRitual}
                className="w-full py-4 text-sm shadow-emerald-500/25"
              >
                <span>리추얼 시작하고 +5 DB 받기</span>
                <AnimatedArrowRightIcon size={18} />
              </MagicButton>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
}
