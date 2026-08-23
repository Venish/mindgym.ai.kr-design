"use client";

import React from "react";
import { useModalStore } from "@/store/useModalStore";
import { TermsOfServiceView } from "@/components/dashboard/TermsOfServiceView";
import { PrivacyPolicyView } from "@/components/dashboard/PrivacyPolicyView";

/**
 * ShowcaseParallaxFooter: 바닥 고정 메뉴바 위로 100% 훤히 노출되는 패럴랙스 푸터 (pb-28)
 */
export function ShowcaseParallaxFooter() {
  const { openModal } = useModalStore();

  const handleOpenTerms = () => {
    openModal({
      type: "slide-up",
      content: <TermsOfServiceView />,
    });
  };

  const handleOpenPrivacy = () => {
    openModal({
      type: "slide-up",
      content: <PrivacyPolicyView />,
    });
  };

  return (
    <footer className="w-full bg-white text-slate-500 px-6 pt-8 pb-28 text-xs font-sans select-none border-none flex flex-col items-center justify-center gap-3 text-center">
      {/* 1. 이용약관 & 개인정보 처리방침 링크 */}
      <div className="flex items-center gap-2.5 text-xs font-bold text-slate-700">
        <button
          type="button"
          onClick={handleOpenTerms}
          className="hover:text-emerald-600 active:scale-95 transition-all cursor-pointer outline-none bg-[#F9FAFB] px-3.5 py-1.5 rounded-lg border-none"
        >
          이용약관
        </button>
        <button
          type="button"
          onClick={handleOpenPrivacy}
          className="hover:text-emerald-600 active:scale-95 transition-all cursor-pointer outline-none bg-[#F9FAFB] px-3.5 py-1.5 rounded-lg border-none font-extrabold text-slate-800"
        >
          개인정보 처리방침
        </button>
      </div>

      {/* 2. Copyright 표기 */}
      <p className="text-[11px] text-slate-400 font-sans tracking-tight">
        Copyright ⓒ WELLBI Inc. All rights reserved.
      </p>
    </footer>
  );
}
