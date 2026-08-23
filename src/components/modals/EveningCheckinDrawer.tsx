"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, MoonStars, Sparkle, ArrowRight } from "@phosphor-icons/react";
import { useMindGym } from "@/context/MindGymContext";
import { useRouter } from "next/navigation";
import { MagicButton } from "../godui/MagicButton";
import { AnimatedArrowRightIcon } from "../animated-icons/AnimatedArrowRightIcon";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";

export function EveningCheckinDrawer({
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

  const emotions = ["뿌듯함", "편안함", "보통임", "피곤함", "지침/스트레스", "우울함"];

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
    router.push("/player/RT-002");
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
            <div className="flex items-center gap-2 text-indigo-600">
              <MoonStars size={26} weight="fill" />
              <span className="text-sm font-bold tracking-tight">저녁 체크인</span>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <X size={20} weight="bold" />
            </button>
          </div>

          {step === "EMOTION" ? (
            /* STEP 1: 오늘 하루 감정 정리 */
            <div className="flex flex-col gap-5">
              <div>
                <h2 className="text-xl font-bold text-gray-900 leading-snug">
                  {userName || "보노보노"}님, <br />
                  오늘 하루는 어떻게 마감하시나요?
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  오늘 하루 동안의 마음 상태를 선택해주세요.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {emotions.map((emo) => {
                  const isSelected = selectedEmotion === emo;
                  return (
                    <button
                      key={emo}
                      onClick={() => handleSelectEmotion(emo)}
                      className={`p-4 rounded-2xl border text-sm font-bold transition-all text-left flex items-center justify-between ${
                        isSelected
                          ? "border-indigo-500 bg-indigo-50 text-indigo-700 shadow-sm"
                          : "border-gray-100 bg-[#F9FAFB] text-gray-700 hover:border-gray-200"
                      }`}
                    >
                      <span>{emo}</span>
                      {isSelected && (
                        <span className="w-2 h-2 rounded-full bg-indigo-500" />
                      )}
                    </button>
                  );
                })}
              </div>

              <button
                disabled={!selectedEmotion}
                onClick={handleNextStep}
                className={`w-full py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                  selectedEmotion
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20 active:scale-[0.98]"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              >
                <span>다음 단계로</span>
                <ArrowRight size={18} weight="bold" />
              </button>
            </div>
          ) : (
            /* STEP 2: 저녁 마감 처방 리추얼 */
            <div className="flex flex-col gap-5">
              <div>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full mb-2">
                  <Sparkle size={12} weight="fill" /> 저녁 마감 처방
                </span>
                <h2 className="text-xl font-bold text-gray-900 leading-snug">
                  [{selectedEmotion}] 하루를 보낸 당신에게 <br />
                  3분 이완 수면 명상을 추천해요
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  오늘 쌓인 피로를 내려놓고 수면을 준비해보세요.
                </p>
              </div>

              <div className="bg-[#F8FAFC] rounded-2xl p-4 flex items-center gap-4 border border-gray-100">
                <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-black text-lg shrink-0">
                  02
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900">
                    저녁 명상: 하루의 피로 씻어내기
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    소요시간 3분 · 덤벨 +5 DB
                  </p>
                </div>
              </div>

              <MagicButton
                onClick={handleStartRitual}
                className="w-full py-4 text-sm bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/25"
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
