"use client";

import React from "react";
import { Barbell } from "@phosphor-icons/react";
import { NumberTicker } from "@/components/godui/NumberTicker";

interface ShowcaseMonthlyMeProps {
  userName?: string;
  levelNum?: number;
  completedDaysCount?: number;
}

/**
 * 1. ShowcaseMonthlyMe: [이달의 나] 컴포넌트
 * "이달의 나" 서브 타이틀 컬러 100% 원복 (text-emerald-800)
 */
export function ShowcaseMonthlyMe({
  userName = "보노보노",
  levelNum = 1,
  completedDaysCount = 2,
}: ShowcaseMonthlyMeProps) {
  // 닉네임의 첫 글자 추출 (예: "보노보노" -> "보")
  const initialChar = userName ? userName.charAt(0) : "보";

  return (
    <div className="w-full flex items-center justify-between px-0.5 py-1 gap-3">
      {/* 좌측: 40px 대형 이니셜 아바타 + 2줄 텍스트 (이달의 나 서브 타이틀 text-emerald-800 100% 원복) */}
      <div className="flex items-center gap-2.5 text-left">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-200 via-teal-200 to-emerald-300 text-emerald-950 font-black text-xl flex items-center justify-center shrink-0 border border-emerald-300/80 shadow-2xs leading-none p-0">
          {initialChar}
        </div>

        <div className="flex flex-col gap-0.5">
          <span className="text-[11px] font-extrabold text-emerald-800 tracking-tight">
            이달의 나
          </span>
          <div className="text-base font-black text-gray-900 tracking-tight flex items-center gap-0.5">
            <span>차분한 <span className="text-[#00C474] font-black">8</span>월 · </span>
            <span className="text-[#00C474] font-black inline-flex items-center" style={{ color: "#00C474" }}>
              <NumberTicker value={completedDaysCount} className="text-[#00C474] font-black" />
            </span>
            <span>일째</span>
          </div>
        </div>
      </div>

      {/* 우측 뱃지: 연속 2일 & 덤벨(Barbell + Lv.1) 뱃지 */}
      <div className="flex items-center gap-1.5 bg-gray-100 border border-gray-200/70 px-3.5 py-1.5 rounded-full shrink-0 shadow-2xs">
        <Barbell size={18} weight="fill" className="text-[#00C474]" />
        <span className="text-sm font-mono font-black text-gray-800">
          Lv.{levelNum}
        </span>
      </div>
    </div>
  );
}
