"use client";

import React, { useState, useEffect } from "react";
import { MagicButton } from "@/components/godui/MagicButton";
import { useMindGym } from "@/context/MindGymContext";
import { useModalStore } from "@/store/useModalStore";
import { Smiley, Play, Pause, CheckCircle, Sparkle } from "@phosphor-icons/react";

interface RT001SmileMeditationProps {
  onComplete?: () => void;
}

/**
 * RT-001 미소 명상 (3분 아침 이완 명상)
 * - 1단계: 자세 정돈 및 미소 호흡 가이드
 * - 2단계: 3분 미소 이완 타이머 & 긍정 정서 누적
 * - 3단계: 미소 습관 완성 및 +3 덤벨 적립
 */
export function RT001_SmileMeditation({ onComplete }: RT001SmileMeditationProps) {
  const { addDumbbells } = useMindGym();
  const { clearModals } = useModalStore();

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [secondsLeft, setSecondsLeft] = useState(180); // 3분 = 180초
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      setIsRunning(false);
      setCurrentStep(3);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, secondsLeft]);

  const handleStart = () => {
    setCurrentStep(2);
    setIsRunning(true);
  };

  const handleFinish = () => {
    addDumbbells(3);
    setIsCompleted(true);
    if (onComplete) onComplete();
    setTimeout(() => {
      clearModals();
    }, 600);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  return (
    <div className="w-full flex flex-col items-center justify-between flex-1 min-h-[460px] py-4 text-center">
      {/* Step 1: 미소 준비 */}
      {currentStep === 1 && (
        <div className="flex flex-col items-center gap-4 my-auto w-full max-w-sm">
          <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center shadow-sm">
            <Smiley size={38} weight="fill" />
          </div>

          <span className="text-xs font-extrabold text-amber-600 bg-amber-50 px-3.5 py-1 rounded-full">
            1단계 · 미소 호흡 준비
          </span>

          <h2 className="text-2xl font-black text-gray-900 tracking-tight">
            아침 미소 명상 (3분)
          </h2>

          <p className="text-sm font-medium text-gray-600 leading-relaxed text-center px-2">
            입가에 옅은 미소를 지으며 얼굴 80여 개 근육의 긴장을 해소하고 한달 동안 긍정 정서를 누적하세요.
          </p>

          <div className="w-full bg-amber-50/60 rounded-2xl p-4 border border-amber-100/80 text-left text-xs font-semibold text-gray-700 flex flex-col gap-2 my-2">
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-amber-200 text-amber-900 font-bold text-[10px] flex items-center justify-center shrink-0">1</span>
              <span>양 어깨와 이마의 주름을 가볍게 이완하기</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-amber-200 text-amber-900 font-bold text-[10px] flex items-center justify-center shrink-0">2</span>
              <span>입꼬리를 살짝 올린 미소로 호흡하기</span>
            </div>
          </div>

          <MagicButton
            type="button"
            onClick={handleStart}
            className="w-full bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-base py-4 rounded-full shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Play size={20} weight="fill" />
            <span>3분 미소 명상 시작하기</span>
          </MagicButton>
        </div>
      )}

      {/* Step 2: 3분 타이머 */}
      {currentStep === 2 && (
        <div className="flex flex-col items-center justify-center gap-4 my-auto w-full max-w-sm">
          <span className="text-xs font-extrabold text-amber-600 bg-amber-50 px-3.5 py-1 rounded-full">
            2단계 · 3분 미소 이완 진행 중
          </span>

          <div className="w-44 h-44 rounded-full border-4 border-amber-400 bg-amber-50/50 flex flex-col items-center justify-center my-2 shadow-sm relative overflow-hidden">
            <span className="text-4xl font-black text-amber-600 font-mono tracking-tight">
              {formatTime(secondsLeft)}
            </span>
            <span className="text-xs font-bold text-amber-800 mt-1">
              옅은 미소 유지
            </span>
          </div>

          <p className="text-sm font-semibold text-gray-600 leading-snug">
            얼굴 근육이 풀리고 내면에 평온한 에너지가 차오릅니다.
          </p>

          <div className="flex gap-2 w-full pt-2">
            <button
              type="button"
              onClick={() => setIsRunning(!isRunning)}
              className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-xl text-sm transition-all"
            >
              {isRunning ? "일시정지" : "다시 시작"}
            </button>

            <button
              type="button"
              onClick={() => setCurrentStep(3)}
              className="flex-1 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl text-sm transition-all"
            >
              명상 완료하기
            </button>
          </div>
        </div>
      )}

      {/* Step 3: 미소 명상 완료 */}
      {currentStep === 3 && (
        <div className="flex flex-col items-center gap-5 my-auto w-full max-w-sm">
          <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center shadow-sm">
            <Sparkle size={36} weight="fill" />
          </div>

          <h2 className="text-2xl font-black text-gray-900 tracking-tight">
            미소 명상 완수!
          </h2>

          <p className="text-sm font-medium text-gray-600 leading-relaxed text-center px-4">
            오늘 아침 미소 습관을 가슴에 새겼습니다. 매일 아침 온화한 미소와 함께 하루를 밝혀주세요.
          </p>

          <MagicButton
            type="button"
            onClick={handleFinish}
            className="w-full bg-[#00C474] hover:bg-[#00B068] text-white font-extrabold text-base py-4 rounded-full shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {isCompleted ? (
              <>
                <CheckCircle size={20} weight="fill" />
                <span>+3 덤벨 적립 및 메인으로</span>
              </>
            ) : (
              <span>실천 완료하고 돌아가기</span>
            )}
          </MagicButton>
        </div>
      )}
    </div>
  );
}
