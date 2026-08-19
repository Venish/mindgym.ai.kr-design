"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkle, Heart, Check, Trophy } from "@phosphor-icons/react";
import { AnimatedEveningMoon } from "../animated-icons/AnimatedEveningMoon";
import { AnimatedArrowRightIcon } from "../animated-icons/AnimatedArrowRightIcon";
import { MagicButton } from "../godui/MagicButton";
import { useMindGym } from "@/context/MindGymContext";
import { useRouter } from "next/navigation";

export function EveningCheckinDrawer({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { userName, addDumbbells, markTodayCompleted, markTodayRest } = useMindGym();
  const router = useRouter();
  const [step, setStep] = useState<"QUESTION" | "YES_RESULT" | "NO_RESULT" | "SUMMARY">("QUESTION");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleYes = () => {
    markTodayCompleted();
    addDumbbells(3);
    setStep("YES_RESULT");
  };

  const handleNo = () => {
    markTodayRest();
    setStep("NO_RESULT");
  };

  const handleFinish = () => {
    onClose();
    setStep("QUESTION");
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
          className="w-full max-w-md bg-white rounded-t-[32px] p-6 shadow-2xl flex flex-col gap-5 max-h-[85vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AnimatedEveningMoon size={36} />
              <span className="text-xs font-black bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-full uppercase">
                저녁 하루 회고
              </span>
            </div>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 text-gray-400">
              <X size={20} />
            </button>
          </div>

          {step === "QUESTION" && (
            <div className="flex flex-col gap-4">
              <div>
                <h3 className="text-xl font-extrabold text-gray-900 leading-snug">
                  오늘 하루 고생 많으셨어요, {userName}님! <br />
                  아침 다짐에 마음이 얼마나 닿았나요?
                </h3>
                <p className="text-xs font-medium text-gray-500 mt-1">
                  결과와 상관없이 정직한 회고 자체가 훌륭한 마음 단련입니다.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 my-3">
                <button
                  onClick={handleYes}
                  className="py-6 px-4 rounded-2xl bg-emerald-50 text-[#00C474] font-black text-base hover:bg-emerald-100 transition-all flex flex-col items-center justify-center gap-2"
                >
                  <Check size={28} weight="bold" />
                  <span>잘 다독여냈어요</span>
                </button>
                <button
                  onClick={handleNo}
                  className="py-6 px-4 rounded-2xl bg-gray-100 text-gray-700 font-bold text-base hover:bg-gray-200 transition-all flex flex-col items-center justify-center gap-2"
                >
                  <Heart size={28} weight="fill" className="text-rose-400" />
                  <span>조금 힘들었어요</span>
                </button>
              </div>
            </div>
          )}

          {step === "YES_RESULT" && (
            <div className="flex flex-col gap-4 text-center py-2">
              <div className="w-16 h-16 bg-emerald-100 text-[#00C474] rounded-full flex items-center justify-center mx-auto">
                <Trophy size={32} weight="fill" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-gray-900">
                  훌륭합니다! +3 덤벨 지급 완료!
                </h3>
                <p className="text-xs font-medium text-gray-600 mt-1">
                  오늘 마음 정원에 또 하나의 푸른 새싹 도장이 날인되었습니다.
                </p>
              </div>

              <MagicButton onClick={() => setStep("SUMMARY")} className="w-full mt-2" rightIcon={<AnimatedArrowRightIcon size={18} />}>
                <span>오늘 하루 정산 카드 보기</span>
              </MagicButton>
            </div>
          )}

          {step === "NO_RESULT" && (
            <div className="flex flex-col gap-4 text-center py-2">
              <div className="w-16 h-16 bg-indigo-50 text-indigo-500 rounded-full flex items-center justify-center mx-auto">
                <Heart size={32} weight="fill" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-gray-900">
                  하루 쉬어가는 것도 건강한 단련입니다
                </h3>
                <p className="text-xs font-medium text-gray-600 mt-1">
                  괜찮습니다! 자책하지 마세요. 오늘 정원은 '자연스러운 휴식일(Rest Day)'로 안전하게 보존됩니다.
                </p>
              </div>

              <MagicButton onClick={() => setStep("SUMMARY")} className="w-full mt-2" rightIcon={<AnimatedArrowRightIcon size={18} />}>
                <span>오늘 정산 마무리하기</span>
              </MagicButton>
            </div>
          )}

          {step === "SUMMARY" && (
            <div className="flex flex-col gap-4">
              <div className="bg-gradient-to-br from-emerald-500 to-teal-700 text-white p-5 rounded-2xl shadow-lg flex flex-col gap-3">
                <div className="flex justify-between items-center text-xs opacity-90 font-bold">
                  <span>MIND GYM DAILY REPORT</span>
                  <span>{new Date().toLocaleDateString()}</span>
                </div>
                <h4 className="text-lg font-black">{userName}님의 오늘 마음 영수증</h4>
                <div className="border-t border-white/20 pt-2 text-xs flex flex-col gap-1.5 opacity-90">
                  <div className="flex justify-between">
                    <span>기분 상태</span>
                    <span className="font-bold">회고 완료</span>
                  </div>
                  <div className="flex justify-between">
                    <span>획득 보상</span>
                    <span className="font-bold">덤벨 보충 완료</span>
                  </div>
                </div>
              </div>

              <MagicButton onClick={handleFinish} className="w-full" rightIcon={<AnimatedArrowRightIcon size={18} />}>
                <span>확인 및 완료</span>
              </MagicButton>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
}
