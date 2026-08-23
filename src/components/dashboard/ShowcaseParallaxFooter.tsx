"use client";

import React from "react";
import { useModalStore } from "@/store/useModalStore";

/**
 * ShowcaseParallaxFooter: 모니터 및 모바일 디바이스 가시성을 100% 보장하는 화이트 패럴랙스 푸터
 */
export function ShowcaseParallaxFooter() {
  const { openModal } = useModalStore();

  const handleOpenTerms = (type: string) => {
    openModal({
      type: "slide-left",
      content: (
        <div className="w-full bg-white min-h-full p-6 text-left select-text">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            {type === "terms" ? "이용약관" : "개인정보 처리방침"}
          </h2>
          <p className="text-xs text-gray-600 leading-relaxed whitespace-pre-line">
            {type === "terms"
              ? `제1조 (목적)\n본 약관은 (주)웰비아이가 제공하는 e월간 마음건강 마인드짐 서비스의 이용조건 및 절차, 이용자와 당사의 권리·의무 및 책임사항을 규정함을 목적으로 합니다.\n\n제2조 (용어의 정의)\n1. "서비스"란 당사가 제공하는 마음건강 진단, 리추얼 세션, 30초 체크인 및 관련 제반 서비스를 의미합니다.\n2. "회원"이란 본 약관에 동의하고 서비스를 이용하는 고객을 말합니다.`
              : `1. 개인정보의 수집 및 이용 목적\n(주)웰비아이는 맞춤형 마음건강 리추얼 세션 제공, 서비스 이용 분석 및 고객 문의 대응을 위해 최소한의 개인정보를 수집합니다.\n\n2. 수집하는 개인정보 항목\n- 필수항목: 이름(닉네임), 마음건강 진단 결과, 완성 리추얼 내역\n\n3. 개인정보의 보유 및 이용기간\n회원 탈퇴 시 또는 목적 달성 시 즉시 파기합니다.`}
          </p>
        </div>
      ),
    });
  };

  return (
    <footer className="w-full bg-white text-slate-500 px-6 pt-8 pb-28 text-xs font-sans select-none border-t border-gray-100 flex flex-col items-center justify-center gap-3.5 text-center">
      {/* 1. 이용약관 & 개인정보 처리방침 링크 */}
      <div className="flex items-center gap-3 text-xs font-bold text-slate-700">
        <button
          type="button"
          onClick={() => handleOpenTerms("terms")}
          className="hover:text-emerald-600 active:scale-95 transition-all cursor-pointer outline-none bg-slate-100 px-3.5 py-1.5 rounded-lg border border-slate-200 shadow-2xs"
        >
          이용약관
        </button>
        <span className="text-gray-300 font-normal">|</span>
        <button
          type="button"
          onClick={() => handleOpenTerms("privacy")}
          className="hover:text-emerald-600 active:scale-95 transition-all cursor-pointer outline-none bg-slate-100 px-3.5 py-1.5 rounded-lg border border-slate-200 shadow-2xs font-extrabold text-slate-800"
        >
          개인정보 처리방침
        </button>
      </div>

      {/* 2. Copyright 표기 */}
      <p className="text-[11px] text-slate-400 font-mono">
        Copyright ⓒ WELLBI Inc. All rights reserved.
      </p>
    </footer>
  );
}
