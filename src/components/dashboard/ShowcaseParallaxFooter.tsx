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
    <footer className="w-full bg-theme-app text-slate-500 dark:text-slate-400 px-6 pt-8 pb-28 text-xs font-sans select-none border-none flex flex-col items-center justify-center gap-3 text-center transition-colors duration-200">
      {/* 1. 이용약관 & 개인정보 처리방침 링크 */}
      <div className="flex items-center gap-2.5 text-xs font-bold text-slate-700 dark:text-slate-300">
        <button
          type="button"
          onClick={handleOpenTerms}
          className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-all cursor-pointer outline-none bg-[#F9FAFB] dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-3.5 py-1.5 rounded-lg border-none"
        >
          이용약관
        </button>
        <button
          type="button"
          onClick={handleOpenPrivacy}
          className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-all cursor-pointer outline-none bg-[#F9FAFB] dark:bg-slate-800 text-slate-800 dark:text-slate-200 px-3.5 py-1.5 rounded-lg border-none font-extrabold"
        >
          개인정보 처리방침
        </button>
      </div>

      {/* 2. Copyright 표기 */}
      <p className="text-[11px] text-slate-400 dark:text-slate-500 font-sans tracking-tight">
        Copyright ⓒ WELLBI Inc. All rights reserved.
      </p>
    </footer>
  );
}
