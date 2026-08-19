"use client";

import React from "react";
import { ModalPopup } from "@/components/ui/ModalPopup";
import { AuroraText } from "@/components/godui/AuroraText";
import { MagicButton } from "@/components/godui/MagicButton";
import { AnimatedArrowRightIcon } from "@/components/animated-icons/AnimatedArrowRightIcon";

interface CeoPopupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CeoPopupModal({ isOpen, onClose }: CeoPopupModalProps) {
  return (
    <ModalPopup isOpen={isOpen} onClose={onClose}>
      {/* 상단 은은한 그린 앰비언트 글로우 */}
      <div className="absolute -top-12 -right-12 w-36 h-36 bg-[#00C474]/10 rounded-full blur-2xl pointer-events-none" />

      {/* 따옴표 장식 & 뱃지 */}
      <div className="flex items-center justify-between mb-3">
        <div className="text-4xl text-[#00C474] leading-none font-black">“</div>
        <span className="txt-micro-main txt-brand-green bg-emerald-50 px-3 py-1 rounded-full font-bold">
          CEO WELCOME MESSAGE
        </span>
      </div>

      {/* 인사말 본문 */}
      <h2 className="text-xl font-extrabold leading-snug tracking-tight txt-brand-ink mb-2">
        우리 회사의 가장 소중한 자산은 <br />
        <AuroraText className="inline-block mt-0.5">여러분의 마음입니다.</AuroraText>
      </h2>

      <p className="txt-caption-main txt-brand-clay leading-relaxed mb-6">
        바쁜 일상 속에서도 마음을 돌볼 시간, <br />
        <strong className="font-extrabold text-gray-900">마인드짐</strong>이 함께 만들어 드릴게요.
      </p>

      {/* CEO 서명 카드 */}
      <div className="flex items-center gap-3 p-3.5 bg-emerald-50/70 rounded-2xl mb-6">
        <div className="w-10 h-10 rounded-full bg-white text-[#00C474] flex items-center justify-center text-lg shrink-0 shadow-soft font-bold">
          👤
        </div>
        <div className="flex flex-col text-left">
          <span className="text-xs font-extrabold txt-brand-ink">홍길동 대표이사</span>
          <span className="text-[11px] txt-brand-clay mt-0.5 font-medium">웰비아이 · 2026년 8월</span>
        </div>
      </div>

      {/* 확인 버튼 */}
      <MagicButton onClick={onClose} className="w-full" rightIcon={<AnimatedArrowRightIcon size={18} />}>
        <span>시작할게요</span>
      </MagicButton>
    </ModalPopup>
  );
}
