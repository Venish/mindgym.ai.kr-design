"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Barbell } from "@phosphor-icons/react";
import { NumberTicker } from "@/components/godui/NumberTicker";
import { SplitFlapDisplay } from "@/components/godui/SplitFlapDisplay";
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

  const now = new Date();
  const currentMonthNum = now.getMonth() + 1;
  const currentMonthEng = now.toLocaleString("en-US", { month: "short" }).toUpperCase();

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
    <div className="w-full flex items-center justify-between px-0.5 py-1 gap-2.5 select-none">
      {/* ===== [좌측 이달의 나 & 003 플랩 통합 마이페이지 그룹 (바닥 items-end 정렬)] ===== */}
      <div
        onClick={handleMyPageOpen}
        className="flex items-end gap-2.5 text-left cursor-pointer group active:scale-95 transition-all w-auto shrink-0"
        title="이달의 나 & 연속 실천 기록 마이페이지 모달 보기"
      >
        {/* 1. 8월 미니 달력 뱃지 */}
        <div className="w-10 h-10 rounded-md bg-white flex flex-col items-center justify-between shrink-0 border border-emerald-300/90 shadow-2xs group-hover:scale-105 transition-transform overflow-hidden">
          {/* 상단 슬림 에메랄드 캘린더 헤더 띠 */}
          <div className="w-full bg-[#00C474] h-3 flex items-center justify-center shrink-0">
            <span className="text-[8px] font-bold text-white tracking-widest leading-none">
              {currentMonthEng}
            </span>
          </div>
          {/* 하단 대형 숫자 '8' 전용 표출 영역 */}
          <div className="w-full flex-1 flex items-center justify-center bg-white text-gray-900 font-black text-[22px] tracking-tighter leading-none">
            {currentMonthNum}
          </div>
        </div>

        {/* 2. 이달의 나 텍스트 블록 (바닥 라인 맞춰 pb-[1px]) */}
        <div className="flex flex-col gap-0.5 w-auto shrink-0 pb-[1px]">
          <div className="flex items-center gap-1 text-[11px] font-extrabold text-emerald-800 tracking-tight">
            <span>이달의 나</span>
          </div>
          <div className="text-[13px] font-black text-[#00C474] tracking-tight leading-snug">
            {displayIntention}
          </div>
        </div>

        {/* 3. 03 스플릿 플랩 디스플레이 (2자리 자릿수 minLength={2}) */}
        <div className="shrink-0 flex items-end pb-[1px]">
          <SplitFlapDisplay value={completedDaysCount} minLength={2} size="lg" />
        </div>
      </div>

      {/* ===== [우측 마음 덤벨 성장의 길 짐 레벨 독립 버튼] ===== */}
      <button
        type="button"
        onClick={() =>
          openModal({
            type: "slide-up",
            content: <DumbbellProgressSheet />,
          })
        }
        className="flex items-center gap-1.5 bg-gray-100 hover:bg-emerald-50 px-3.5 py-2 rounded-full shrink-0 shadow-2xs cursor-pointer active:scale-95 transition-all outline-none"
        title="내 성장의 길 덤벨 레벨 보기 (밑에서 위로 스르륵)"
      >
        <Barbell size={18} weight="fill" className="text-[#00C474]" />
        <span className="text-sm font-mono font-black text-gray-800">
          Lv.{levelNum}
        </span>
      </button>
    </div>
  );
}
