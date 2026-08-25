"use client";

import React, { useState } from "react";
import { SubPageHeader } from "@/components/ui/SubPageHeader";
import { useModalStore } from "@/store/useModalStore";
import { MagicButton } from "@/components/godui/MagicButton";
import { Check, Sparkle } from "@phosphor-icons/react";

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
    <div className="w-full min-h-full bg-white flex flex-col justify-between select-none relative text-gray-900 overflow-y-auto">
      {/* 1. 서브 헤더 */}
      <SubPageHeader
        title="오늘 하루 저녁 회고"
        leftType="back"
        onLeftClick={closeModal}
      />

      {/* 2. 메인 콘텐츠 (수직 정중앙 valign center 배치) */}
      <div className="flex-1 flex flex-col justify-center my-auto max-w-lg mx-auto w-full px-5 py-6 gap-6 text-left">
        <div className="flex flex-col text-left pt-2 pb-1">
          <span className="txt-caption-main text-indigo-600 uppercase font-semibold inline-flex items-center gap-1.5 mb-1.5">
            <Sparkle size={14} weight="bold" className="text-indigo-600 shrink-0" />
            EVENING REFLECTION STEP 01
          </span>

          <h1 className="text-[26px] font-black text-gray-900 leading-tight">
            오늘 하루 나에게 <br />
            <span className="text-indigo-600 block mt-1">보내는 회고예요</span>
          </h1>

          <p className="text-xs text-gray-500 font-semibold mt-2.5 leading-relaxed">
            오늘 있었던 하루를 2가지 따뜻한 답변 중 하나로 다독여보세요
          </p>
        </div>

        {/* 중앙 수평 구분선 (첨부 이미지 스타일) */}
        <div className="flex items-center gap-3 w-full pt-2 pb-1">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-gray-200 to-gray-300" />
          <span className="text-sm font-extrabold text-gray-700 shrink-0 text-center">
            오늘 저녁 회고 선택
          </span>
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-gray-200 to-gray-300" />
        </div>

        {/* 2가지 회고 카드 좌우 2분할 배치 */}
        <div className="grid grid-cols-2 gap-3.5 w-full pt-4">
          <button
            type="button"
            onClick={() => setSelectedState("YES")}
            className={`h-[150px] rounded-3xl text-center p-4.5 flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
              selectedState === "YES"
                ? "bg-indigo-50 border-2 border-indigo-500 shadow-sm text-indigo-900"
                : "bg-[#F8FAFC] border border-gray-100 text-gray-700 hover:bg-gray-100"
            }`}
          >
            <span className="text-lg font-black">잘 다독여냈어요</span>
            <span className="text-xs font-semibold text-indigo-600/90 leading-tight">오늘 하루도 최선을 다해 잘 보냈어요</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedState("NO")}
            className={`h-[150px] rounded-3xl text-center p-4.5 flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
              selectedState === "NO"
                ? "bg-rose-50 border-2 border-rose-400 shadow-sm text-rose-900"
                : "bg-[#F8FAFC] border border-gray-100 text-gray-700 hover:bg-gray-100"
            }`}
          >
            <span className="text-lg font-black">조금 힘들었어요</span>
            <span className="text-xs font-semibold text-rose-600/90 leading-tight">지친 나에게 따뜻한 휴식이 필요해요</span>
          </button>
        </div>
      </div>

      {/* 3. 하단 닫기/완료 CTA 버튼 (아침 체크인과 100% 동일한 톤앤매너) */}
      <div className="w-full px-5 py-6 bg-white shrink-0 max-w-lg mx-auto border-t border-gray-100">
        <MagicButton
          type="button"
          onClick={handleFinish}
          className="w-full py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          <span className="text-base font-extrabold tracking-tight">이 마음으로 하루 마무리하기</span>
        </MagicButton>
      </div>
    </div>
  );
}
