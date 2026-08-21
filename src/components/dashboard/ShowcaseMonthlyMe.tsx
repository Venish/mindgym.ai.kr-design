"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Barbell } from "@phosphor-icons/react";
import { NumberTicker } from "@/components/godui/NumberTicker";
import { useModalStore } from "@/store/useModalStore";
import { MyPageSheet } from "@/components/dashboard/MyPageSheet";

import { useMindGym } from "@/context/MindGymContext";

import { DumbbellProgressSheet } from "@/components/dashboard/DumbbellProgressSheet";

interface ShowcaseMonthlyMeProps {
  userName?: string;
  levelNum?: number;
  completedDaysCount?: number;
}

/**
 * 1. ShowcaseMonthlyMe: [이달의 나] 컴포넌트
 * - 아바타 클릭 시 전역 0ms App-Like Overlay 모달로 MyPageSheet 발동!
 */
export function ShowcaseMonthlyMe({
  userName = "보노보노",
  levelNum = 1,
  completedDaysCount = 2,
}: ShowcaseMonthlyMeProps) {
  const router = useRouter();
  const { openModal } = useModalStore();
  const { currentIntention } = useMindGym();

  const initialChar = userName ? userName.charAt(0) : "보";
  const displayIntention =
    currentIntention && currentIntention.includes("·")
      ? currentIntention
      : "활기차게 · 따뜻하게 · 성장하며";

  const handleMyPageOpen = () => {
    openModal({
      type: "slide-up",
      content: <MyPageSheet />,
    });
  };

  return (
    <div className="w-full flex items-center justify-between px-0.5 py-1 gap-3 select-none">
      {/* 좌측: 40px 대형 이니셜 아바타 + 2줄 텍스트 -> 0ms MyPageSheet 발동 */}
      <div
        onClick={handleMyPageOpen}
        className="flex items-center gap-2.5 text-left cursor-pointer group active:scale-95 transition-transform"
      >
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-200 via-teal-200 to-emerald-300 text-emerald-950 font-black text-xl flex items-center justify-center shrink-0 border border-emerald-300/80 shadow-2xs leading-none p-0 group-hover:scale-105 transition-transform">
          {initialChar}
        </div>

        <div className="flex flex-col gap-0.5 min-w-0 flex-1">
          <span className="text-[11px] font-extrabold text-emerald-800 tracking-tight">
            이달의 나
          </span>
          <div className="text-[13px] font-black text-gray-900 tracking-tight leading-snug flex items-center gap-1 flex-wrap">
            <span className="text-[#00C474] font-black">{displayIntention}</span>
            <span className="text-gray-900 shrink-0 font-bold">8월 · </span>
            <span className="text-[#00C474] font-black inline-flex items-center shrink-0" style={{ color: "#00C474" }}>
              <NumberTicker value={completedDaysCount} className="text-[#00C474] font-black" />
            </span>
            <span className="shrink-0 font-bold">일째</span>
          </div>
        </div>
      </div>

      {/* 우측 뱃지: 덤벨(Barbell + Lv.1) 뱃지 -> 밑에서 위로 슬라이딩 업 DumbbellProgressSheet 모달 발동 */}
      <button
        type="button"
        onClick={() =>
          openModal({
            type: "slide-up",
            content: <DumbbellProgressSheet />,
          })
        }
        className="flex items-center gap-1.5 bg-gray-100 hover:bg-emerald-50 px-3.5 py-1.5 rounded-full shrink-0 shadow-2xs cursor-pointer active:scale-95 transition-all outline-none"
        title="내 성장의 길 레벨 보기 (밑에서 위로 스르륵)"
      >
        <Barbell size={18} weight="fill" className="text-[#00C474]" />
        <span className="text-sm font-mono font-black text-gray-800">
          Lv.{levelNum}
        </span>
      </button>
    </div>
  );
}
