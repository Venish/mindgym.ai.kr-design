"use client";

import React, { useState } from "react";
import { MagicButton } from "@/components/godui/MagicButton";
import { useMindGym } from "@/context/MindGymContext";
import { useModalStore } from "@/store/useModalStore";
import { Trash, Sparkle, CheckCircle, ArrowRight, Scissors } from "@phosphor-icons/react";

interface RT018StressShredderProps {
  onComplete?: () => void;
}

/**
 * RT-018 스트레스 분쇄 (종이 파쇄하기)
 * - 1단계: 나를 괴롭히는 분노/스트레스 종이에 적기
 * - 2단계: 종이 파쇄 물리 모션 애니메이션 인터랙션
 * - 3단계: 마음 비우기 완료 & +3 덤벨 적립
 */
export function RT018_StressShredder({ onComplete }: RT018StressShredderProps) {
  const { addDumbbells } = useMindGym();
  const { clearModals } = useModalStore();

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [worryText, setWorryText] = useState("");
  const [isShredding, setIsShredding] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // 1단계 -> 2단계 이동 (파쇄 실행)
  const handleStartShred = () => {
    if (!worryText.trim()) return;
    setCurrentStep(2);
    setIsShredding(true);

    // 2.5초간 파쇄 모션 후 완료 3단계로 이동
    setTimeout(() => {
      setIsShredding(false);
      setCurrentStep(3);
    }, 2500);
  };

  // 3단계 최종 완료
  const handleFinalFinish = () => {
    addDumbbells(3);
    setIsCompleted(true);
    if (onComplete) onComplete();
    setTimeout(() => {
      clearModals();
    }, 600);
  };

  return (
    <div className="w-full flex flex-col items-center justify-between flex-1 min-h-[460px] py-4 text-center">
      {/* Step 1: 종이에 스트레스 적기 */}
      {currentStep === 1 && (
        <div className="flex flex-col items-center gap-4 my-auto w-full max-w-sm">
          <span className="text-xs font-extrabold text-rose-600 bg-rose-50 px-3.5 py-1 rounded-full">
            1단계 · 감정 시각화
          </span>

          <h2 className="text-2xl font-black text-gray-900 tracking-tight">
            종이에 스트레스 적기
          </h2>

          <p className="text-sm font-medium text-gray-600 leading-snug">
            나를 화나게 하거나 억울하게 만드는 솔직한 마음을 가감 없이 적어보세요.
          </p>

          {/* 종이 메타포 텍스트에어리어 (노트 스타일) */}
          <div className="w-full bg-[#FFFDF5] border border-amber-200/80 rounded-2xl p-4 shadow-sm relative text-left my-2">
            <textarea
              value={worryText}
              onChange={(e) => setWorryText(e.target.value)}
              placeholder="예: 오늘 회의에서 내 의견을 은근히 무시당해서 종일 화가 나고 자존감이 떨어졌다..."
              rows={4}
              className="w-full bg-transparent border-none outline-none text-sm font-semibold text-gray-800 placeholder-gray-400 resize-none leading-relaxed"
            />
            <div className="text-[11px] font-bold text-amber-600/70 text-right mt-1">
              종이에 박제된 스트레스 📝
            </div>
          </div>

          <MagicButton
            type="button"
            disabled={!worryText.trim()}
            onClick={handleStartShred}
            className="w-full bg-rose-500 hover:bg-rose-600 text-white font-extrabold text-base py-3.5 rounded-full shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Scissors size={20} weight="bold" />
            <span>이 종이 갈갈이 분쇄하기</span>
          </MagicButton>
        </div>
      )}

      {/* Step 2: 종이 파쇄 물리 애니메이션 */}
      {currentStep === 2 && (
        <div className="flex flex-col items-center justify-center gap-6 my-auto w-full max-w-sm">
          <span className="text-xs font-extrabold text-amber-600 bg-amber-50 px-3.5 py-1 rounded-full animate-pulse">
            2단계 · 물리적 파쇄 진행 중
          </span>

          <h2 className="text-2xl font-black text-gray-900 tracking-tight">
            스트레스 조각내기 ✂️
          </h2>

          {/* 파쇄기 인터랙션 메타포 visual */}
          <div className="w-48 h-48 bg-gray-900 rounded-3xl p-4 relative overflow-hidden flex flex-col items-center justify-center shadow-lg border border-gray-800">
            {/* 파쇄기 톱니 롤러 시각화 */}
            <div className="w-full h-8 bg-gray-800 rounded-lg flex items-center justify-around border-b border-gray-700">
              <div className="w-6 h-6 rounded-full border-2 border-dashed border-amber-400 animate-spin" />
              <div className="w-6 h-6 rounded-full border-2 border-dashed border-amber-400 animate-spin" />
              <div className="w-6 h-6 rounded-full border-2 border-dashed border-amber-400 animate-spin" />
            </div>

            {/* 내려오는 종이 애니메이션 */}
            <div className="w-36 bg-[#FFFDF5] text-gray-800 text-[10px] p-2 rounded shadow my-2 font-mono overflow-hidden max-h-16 animate-bounce">
              "{worryText.slice(0, 30)}..."
            </div>

            {/* 아래로 낙하하는 조각들 */}
            <div className="flex justify-center gap-1.5 opacity-80">
              <span className="w-2 h-4 bg-amber-200 rounded-xs animate-pulse" />
              <span className="w-2 h-5 bg-amber-300 rounded-xs animate-ping" />
              <span className="w-2 h-3 bg-amber-200 rounded-xs animate-bounce" />
            </div>
          </div>

          <p className="text-xs font-bold text-gray-500 animate-pulse">
            종이가 파쇄기 속에서 수많은 조각으로 찢어집니다...
          </p>
        </div>
      )}

      {/* Step 3: 완성 및 해소 감정 카드 */}
      {currentStep === 3 && (
        <div className="flex flex-col items-center gap-5 my-auto w-full max-w-sm">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-[#00C474] flex items-center justify-center shadow-sm">
            <Sparkle size={36} weight="fill" />
          </div>

          <h2 className="text-2xl font-black text-gray-900 tracking-tight">
            스트레스 비우기 완료!
          </h2>

          <p className="text-sm font-medium text-gray-600 leading-relaxed text-center px-4">
            나를 지독하게 괴롭히던 고민 종이가 사라졌습니다. 시각적 후련함과 함께 가벼워진 내 마음을 느껴보세요.
          </p>

          <div className="w-full bg-emerald-50/70 rounded-2xl p-4 border border-emerald-100/80 text-left">
            <div className="text-xs font-extrabold text-[#00C474] flex items-center gap-1">
              <span>보상 완료</span>
            </div>
            <p className="text-xs font-semibold text-emerald-900 mt-1">
              마음 건강 리추얼 실천으로 <span className="font-bold text-[#00C474]">+3 덤벨</span>이 적립되었습니다.
            </p>
          </div>

          <MagicButton
            type="button"
            onClick={handleFinalFinish}
            className="w-full bg-[#00C474] hover:bg-[#00B068] text-white font-extrabold text-base py-4 rounded-full shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
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
