"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Sparkle, ArrowRight } from "@phosphor-icons/react";

interface ShowcaseBentoGridProps {
  levelNum?: number;
  nextDiff?: number;
}

/**
 * 3. ShowcaseBentoGrid: 이달의 리추얼 & 30초 체크인 2열 벤토 모듈
 */
export function ShowcaseBentoGrid({}: ShowcaseBentoGridProps) {
  const router = useRouter();

  return (
    <div className="grid grid-cols-2 gap-3.5">
      {/* [1열 - 왼쪽] 이달의 리추얼 카드 -> /player/RT-001 */}
      <div
        onClick={() => router.push("/player/RT-001")}
        className="bg-white border border-gray-200/90 rounded-2xl p-3.5 shadow-2xs flex flex-col justify-between min-h-[136px] relative overflow-hidden group hover:border-[#00C474] transition-all cursor-pointer active:scale-[0.98]"
      >
        <div className="flex flex-col gap-1.5 relative z-10">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black txt-brand-ink">이달의 리추얼</span>
            <span className="text-[10px] font-bold text-[#00C474] bg-emerald-50 px-1.5 py-0.5 rounded">
              8월 대표
            </span>
          </div>

          <div className="my-1 flex items-center justify-center py-1 group-hover:scale-105 transition-transform duration-300">
            <img
              src="/images/icons/1.png"
              alt="미소 명상"
              className="w-10 h-10 object-contain drop-shadow-2xs"
            />
          </div>

          <p className="text-[11px] text-gray-700 font-bold text-center leading-tight">
            미소 명상 <span className="text-[#00C474] font-black">· 3분</span>
          </p>
        </div>
      </div>

      {/* [2열 - 오른쪽] 30초 체크인 칩 -> /checkin */}
      <div
        onClick={() => router.push("/checkin")}
        className="bg-white border border-gray-200/90 rounded-2xl p-4 shadow-2xs flex flex-col justify-between hover:border-[#00C474] transition-all cursor-pointer group min-h-[136px] active:scale-[0.98]"
      >
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1.5">
            <Sparkle size={15} weight="fill" className="txt-brand-green shrink-0" />
            <h2 className="text-xs font-black txt-brand-ink">30초 체크인</h2>
          </div>
          <p className="txt-caption-compact text-gray-500 font-medium leading-relaxed">
            지금 내 마음 날씨 진단
          </p>
        </div>

        <div className="flex items-center justify-between text-[11px] font-extrabold text-[#00C474] pt-2.5 border-t border-gray-100 mt-3">
          <span>진단 시작</span>
          <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
}
