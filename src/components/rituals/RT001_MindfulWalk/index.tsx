"use client";

import React, { useState, useEffect } from "react";
import { MagicButton } from "@/components/godui/MagicButton";
import { useMindGym } from "@/context/MindGymContext";
import { useModalStore } from "@/store/useModalStore";
import { Footprints, Play, Pause, CheckCircle, Sparkle } from "@phosphor-icons/react";

interface RT001MindfulWalkProps {
  onComplete?: () => void;
}

/**
 * RT-001 기분 전환 산책 (5분 산책 그라운딩)
 * - 1단계: 산책 준비 및 오감 그라운딩 체크
 * - 2단계: 5분 오감 집중 타이머 & 발바닥 감각 모니터링
 * - 3단계: 기분 전환 실천 완료 및 +3 덤벨 적립
 */
export function RT001_MindfulWalk({ onComplete }: RT001MindfulWalkProps) {
  const { addDumbbells } = useMindGym();
  const { clearModals } = useModalStore();

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [secondsLeft, setSecondsLeft] = useState(300); // 5분 = 300초
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

  const handleStartWalk = () => {
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
      {/* Step 1: 산책 준비 */}
      {currentStep === 1 && (
        <div className="flex flex-col items-center gap-4 my-auto w-full max-w-sm">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-[#00C474] flex items-center justify-center shadow-sm">
            <Footprints size={36} weight="fill" />
          </div>

          <span className="text-xs font-extrabold text-[#00C474] bg-emerald-50 px-3.5 py-1 rounded-full">
            1단계 · 산책 준비
          </span>

          <h2 className="text-2xl font-black text-gray-900 tracking-tight">
            기분 전환 5분 산책
          </h2>

          <p className="text-sm font-medium text-gray-600 leading-relaxed text-center px-2">
            스마트폰 화면을 주머니에 넣고, 신발끈을 매어보세요. 복잡한 생각을 내려놓고 가볍게 밖으로 나갑니다.
          </p>

          <div className="w-full bg-gray-50 rounded-2xl p-4 border border-gray-100/80 text-left text-xs font-semibold text-gray-700 flex flex-col gap-2 my-2">
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-emerald-100 text-[#00C474] font-bold text-[10px] flex items-center justify-center shrink-0">1</span>
              <span>발바닥이 지면에 닿는 촉감에 집중하기</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-emerald-100 text-[#00C474] font-bold text-[10px] flex items-center justify-center shrink-0">2</span>
              <span>스쳐 지나가는 바람의 온도 느끼기</span>
            </div>
          </div>

          <MagicButton
            type="button"
            onClick={handleStartWalk}
            className="w-full bg-[#00C474] hover:bg-[#00B068] text-white font-extrabold text-base py-4 rounded-full shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Play size={20} weight="fill" />
            <span>5분 산책 시작하기</span>
          </MagicButton>
        </div>
      )}

      {/* Step 2: 5분 타이머 */}
      {currentStep === 2 && (
        <div className="flex flex-col items-center justify-center gap-4 my-auto w-full max-w-sm">
          <span className="text-xs font-extrabold text-[#00C474] bg-emerald-50 px-3.5 py-1 rounded-full">
            2단계 · 5분 오감 산책 진행 중
          </span>

          <div className="w-44 h-44 rounded-full border-4 border-[#00C474] bg-emerald-50/50 flex flex-col items-center justify-center my-2 shadow-sm relative overflow-hidden">
            <span className="text-4xl font-black text-[#00C474] font-mono tracking-tight">
              {formatTime(secondsLeft)}
            </span>
            <span className="text-xs font-bold text-emerald-800 mt-1">
              발바닥 감각에 집중
            </span>
          </div>

          <p className="text-sm font-semibold text-gray-600 leading-snug">
            걸음걸음마다 마음의 짐이 내려놓아지는 것을 느껴보세요.
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
              className="flex-1 py-3 bg-[#00C474] hover:bg-[#00B068] text-white font-bold rounded-xl text-sm transition-all"
            >
              산책 완료하기
            </button>
          </div>
        </div>
      )}

      {/* Step 3: 산책 완료 */}
      {currentStep === 3 && (
        <div className="flex flex-col items-center gap-5 my-auto w-full max-w-sm">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-[#00C474] flex items-center justify-center shadow-sm">
            <Sparkle size={36} weight="fill" />
          </div>

          <h2 className="text-2xl font-black text-gray-900 tracking-tight">
            기분 전환 산책 완료!
          </h2>

          <p className="text-sm font-medium text-gray-600 leading-relaxed text-center px-4">
            바깥 공기를 쐬고 온 몸과 마음에 상쾌한 생기가 채워졌습니다. 오늘 하루도 나를 다정하게 응원해 주세요.
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
