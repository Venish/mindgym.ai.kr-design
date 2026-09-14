"use client";

import React, { useState } from "react";
import { SubPageHeader } from "@/components/ui/SubPageHeader";
import { useModalStore } from "@/store/useModalStore";
import { MagicButton } from "@/components/godui/MagicButton";
import { AuroraText } from "@/components/godui/AuroraText";
import { Sparkle } from "@phosphor-icons/react";

interface EveningReflectionWizardProps {
  initialState?: "YES" | "NO";
  onComplete?: (state: "YES" | "NO") => void;
}

/**
 * EveningReflectionWizard: 저녁 루틴 모달 내 '저녁 체크인' 클릭 시 구동되는 2가지 회고 선택 0ms 오버레이 모달
 */
export function EveningReflectionWizard({
  initialState = "YES",
  onComplete,
}: EveningReflectionWizardProps) {
  const { closeModal } = useModalStore();
  const [selectedState, setSelectedState] = useState<"YES" | "NO">(initialState);

  const handleFinish = () => {
    if (onComplete) {
      onComplete(selectedState);
    }
    closeModal();
  };

  return (
    <div className="w-full h-full min-h-screen sm:min-h-0 bg-white flex flex-col select-none relative text-gray-900 overflow-hidden">
      {/* 1. 서브 헤더 */}
      <SubPageHeader
        title="저녁 체크인"
        leftType="back"
        onLeftClick={closeModal}
      />

      {/* 2. 전체 오버플로우 스크롤 본문 영역 */}
      <div className="flex-1 overflow-y-auto custom-scrollbar px-5 pt-3 pb-8 flex flex-col justify-between max-w-lg mx-auto w-full">
        <div className="my-auto flex flex-col justify-center py-2 gap-5 w-full">
          <div className="flex flex-col text-left pt-2 pb-1">
            <span className="txt-caption-main text-indigo-600 uppercase font-semibold inline-flex items-center gap-1.5 mb-1.5">
              <Sparkle size={14} weight="bold" className="text-indigo-600 shrink-0" />
              EVENING CHECK-IN STEP 01
            </span>

            <h1 className="text-[26px] font-black text-gray-900 leading-snug">
              오늘 하루를 <br />
              <AuroraText>돌아볼 시간이에요</AuroraText>
            </h1>

            <p className="text-xs text-gray-500 font-semibold mt-1.5 leading-relaxed">
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

        {/* 2가지 회고 카드 좌우 2분할 배치 (원본 포맷 그대로 유지) */}
        <div className="grid grid-cols-2 gap-3.5 w-full pt-4">
          <button
            type="button"
            onClick={() => setSelectedState("YES")}
            className={`h-[150px] rounded-3xl text-center p-4 flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-98 ${
              selectedState === "YES"
                ? "bg-indigo-50 border-2 border-indigo-500 shadow-sm text-indigo-900"
                : "bg-[#F8FAFC] border border-gray-100 text-gray-700 hover:bg-gray-100"
            }`}
          >
            <span className="text-base font-black leading-snug">
              오늘도 잘 <br />
              버텨냈어요.
            </span>
            <span className="text-[11px] font-semibold text-indigo-600/90 leading-tight">
              하루를 무사히 보낸 나를 다정하게 바라봐요
            </span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedState("NO")}
            className={`h-[150px] rounded-3xl text-center p-4 flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-98 ${
              selectedState === "NO"
                ? "bg-rose-50 border-2 border-rose-400 shadow-sm text-rose-900"
                : "bg-[#F8FAFC] border border-gray-100 text-gray-700 hover:bg-gray-100"
            }`}
          >
            <span className="text-base font-black leading-snug">
              조금 힘들었어요
            </span>
            <span className="text-[11px] font-semibold text-rose-600/90 leading-tight">
              나에게 회복할 시간을 내어줘도 괜찮아요
            </span>
          </button>
        </div>
      </div>

      {/* 3. 하단 닫기/완료 CTA 버튼 */}
      <div className="w-full px-5 py-5 bg-white shrink-0 max-w-lg mx-auto border-t border-gray-100">
        <MagicButton
          type="button"
          onClick={handleFinish}
          className="w-full py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          <span className="text-base font-extrabold tracking-tight">이 마음으로 하루 마무리하기</span>
        </MagicButton>
      </div>
    </div>
  </div>
);
}
