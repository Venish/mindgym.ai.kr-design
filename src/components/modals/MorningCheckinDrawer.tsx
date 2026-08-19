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
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="w-full max-w-md bg-white rounded-t-[32px] p-6 shadow-2xl flex flex-col gap-5 max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AnimatedMorningSun size={36} />
              <span className="text-xs font-black bg-amber-50 text-amber-600 px-2.5 py-1 rounded-full uppercase">
                오전 아침 체크인
              </span>
            </div>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 text-gray-400">
              <X size={20} />
            </button>
          </div>

          {step === "EMOTION" ? (
            <div className="flex flex-col gap-4">
              <div>
                <h3 className="text-xl font-extrabold text-gray-900 leading-snug">
                  좋은 아침이에요, {userName}님! <br />
                  지금 이 순간 마음 날씨는 어떤가요?
                </h3>
                <p className="text-xs font-medium text-gray-500 mt-1">
                  오늘 나를 채울 감정 키워드를 하나 선택해보세요.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2.5 my-2">
                {emotions.map((emo) => (
                  <button
                    key={emo}
                    onClick={() => handleSelectEmotion(emo)}
                    className={`py-3.5 px-4 rounded-2xl text-sm font-bold transition-all text-left flex items-center justify-between ${
                      selectedEmotion === emo
                        ? "bg-[#00C474] text-white shadow-soft"
                        : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <span>{emo}</span>
                    {selectedEmotion === emo && <Sparkle size={16} weight="fill" />}
                  </button>
                ))}
              </div>

              <MagicButton
                onClick={handleNextStep}
                className="w-full mt-2"
                variant={selectedEmotion ? "primary" : "outline"}
                rightIcon={<AnimatedArrowRightIcon size={18} />}
              >
                <span>오늘의 처방 받기</span>
              </MagicButton>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="bg-emerald-50/70 p-4 rounded-2xl">
                <span className="text-xs font-bold text-[#00C474]">선택한 감정: {selectedEmotion}</span>
                <h4 className="text-lg font-extrabold text-gray-900 mt-1">
                  추천 처방: [미소 명상] (1분 코스)
                </h4>
                <p className="text-xs font-medium text-gray-600 mt-1">
                  시각화 명상으로 미소를 그리며 아침의 마음 긴장을 은근히 풀어냅니다.
                </p>
              </div>

              <div className="bg-gray-50 p-3.5 rounded-2xl flex items-center justify-between text-xs text-gray-600 font-bold">
                <span>완수 시 보상</span>
                <span className="text-[#00C474]">+5 덤벨 & 정원 도장</span>
              </div>

              <MagicButton onClick={handleStartRitual} className="w-full" rightIcon={<AnimatedArrowRightIcon size={18} />}>
                <span>1분 처방 시작하기 (+5 덤벨)</span>
              </MagicButton>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
}
