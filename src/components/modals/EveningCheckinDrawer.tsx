"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, MoonStars, Sparkle, ArrowRight } from "@phosphor-icons/react";
import { useMindGym } from "@/context/MindGymContext";
import { useRouter } from "next/navigation";
import { MagicButton } from "../godui/MagicButton";
import { AuroraText } from "@/components/godui/AuroraText";
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
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  // 중앙 스크롤 락 훅 사용
  useBodyScrollLock(isOpen);

  useEffect(() => {
    setMounted(true);
  }, []);

  const options = [
    {
      title: "오늘도 잘 버텨냈어요.",
      desc: "하루를 무사히 보낸 나를 다정하게 바라봐요",
    },
    {
      title: "조금 힘들었어요",
      desc: "나에게 회복할 시간을 내어줘도 괜찮아요",
    },
  ];

  const handleSelectOption = (title: string) => {
    setSelectedOption(title);
  };

  const handleNextStep = () => {
    if (!selectedOption) return;
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
            /* STEP 1: 오늘 하루 회고 문구 선택 */
            <div className="flex flex-col gap-5">
              <div>
                <h2 className="text-2xl font-black text-gray-900 leading-snug">
                  오늘 하루를 <br />
                  <AuroraText>돌아볼 시간이에요</AuroraText>
                </h2>
                <p className="text-xs font-semibold text-gray-500 mt-1.5 leading-relaxed">
                  지금의 마음에 더 가까운 문장을 하나 골라보세요
                </p>
              </div>

              {/* 내 마음 돌아보기 구분선 */}
              <div className="flex items-center gap-3 w-full pt-1 pb-1">
                <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-gray-200 to-gray-300" />
                <span className="text-sm font-bold text-gray-700 shrink-0 text-center">
                  내 마음 돌아보기
                </span>
                <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-gray-200 to-gray-300" />
              </div>

              {/* 문구 2종 선택 옵션 카드 */}
              <div className="flex flex-col gap-3">
                {options.map((opt) => {
                  const isSelected = selectedOption === opt.title;
                  return (
                    <button
                      key={opt.title}
                      type="button"
                      onClick={() => handleSelectOption(opt.title)}
                      className={`p-4.5 rounded-2xl border text-left transition-all cursor-pointer active:scale-98 ${
                        isSelected
                          ? "border-[#00C474] bg-emerald-50/70 ring-2 ring-[#00C474]/20 shadow-xs"
                          : "border-gray-150 bg-[#F8FAFC] hover:bg-gray-100"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="text-[15px] font-extrabold text-gray-900 leading-snug">
                          {opt.title}
                        </h3>
                        {isSelected && (
                          <span className="w-2.5 h-2.5 rounded-full bg-[#00C474]" />
                        )}
                      </div>
                      <p className="text-xs font-semibold text-gray-500 mt-1 leading-relaxed">
                        {opt.desc}
                      </p>
                    </button>
                  );
                })}
              </div>

              <button
                disabled={!selectedOption}
                onClick={handleNextStep}
                className={`w-full py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                  selectedOption
                    ? "bg-[#00C474] text-white shadow-lg shadow-emerald-500/20 active:scale-[0.98]"
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
                  [{selectedOption}] 하루를 보낸 당신에게 <br />
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
