"use client";

import React from "react";
import { Check } from "@phosphor-icons/react";

/**
 * 4. ShowcaseTodayRoutines: 오늘의 루틴 3가지 3열 리추얼 카드 모듈 (박스 없는 플랫 레이아웃)
 */
export function ShowcaseTodayRoutines() {
  return (
    <div className="flex flex-col gap-3 w-full">
      {/* 타이틀 헤더 */}
      <div className="flex items-center justify-between px-0.5">
        <h2 className="text-lg font-black text-gray-900 tracking-tight">
          오늘의 루틴 3가지
        </h2>
        <span className="text-sm font-bold text-gray-400 tabular-nums">
          1/3
        </span>
      </div>

      {/* 3열 리추얼 카드 그리드 */}
      <div className="grid grid-cols-3 gap-2.5">
        {/* 1. 완료 리추얼 카드 */}
        <div className="bg-white border border-gray-200 rounded-xl p-3.5 flex flex-col justify-between h-[134px]">
          <div className="w-[30px] h-[30px] rounded-lg bg-emerald-50 txt-brand-green-accent flex items-center justify-center shrink-0">
            <Check size={16} weight="bold" />
          </div>
          <div className="flex flex-col text-left">
            <h3 className="text-[0.9375rem] font-bold text-gray-400 line-through tracking-tight leading-snug">
              오프먼트
            </h3>
            <span className="text-[13px] font-semibold text-gray-400 mt-1">
              완료
            </span>
          </div>
        </div>

        {/* 2. 진행중 리추얼 카드 (Mint Tint Surface) */}
        <div className="bg-[var(--color-pastel-mint-bg)] rounded-xl p-3.5 flex flex-col justify-between h-[134px]">
          <div className="w-[30px] h-[30px] rounded-lg bg-white txt-brand-green-accent text-xs font-black flex items-center justify-center shrink-0 shadow-2xs">
            3분
          </div>
          <div className="flex flex-col text-left">
            <h3 className="text-[0.9375rem] font-bold text-gray-900 leading-snug tracking-tight">
              한 칸 완벽주의
            </h3>
            <span className="text-[13px] font-semibold text-gray-500 mt-1">
              서랍 정리
            </span>
          </div>
        </div>

        {/* 3. 미완료 리추얼 카드 */}
        <div className="bg-white border border-gray-200 hover:border-[#005A34] rounded-xl p-3.5 flex flex-col justify-between h-[134px] cursor-pointer active:scale-95 transition-transform">
          <div className="w-[30px] h-[30px] rounded-lg bg-white text-amber-600 text-xs font-black flex items-center justify-center shrink-0 border border-amber-200/80 shadow-2xs">
            10분
          </div>
          <div className="flex flex-col text-left">
            <h3 className="text-[0.9375rem] font-bold text-gray-900 leading-snug tracking-tight">
              빈손산책
            </h3>
            <span className="text-[13px] font-semibold text-gray-500 mt-1">
              폰 없이
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
