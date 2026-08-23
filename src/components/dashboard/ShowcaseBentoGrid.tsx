"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Sparkle, ArrowRight } from "@phosphor-icons/react";
import { getIconPath } from "@/utils/iconMap";
import { useModalStore } from "@/store/useModalStore";
import { CommonRitualSheet } from "@/components/dashboard/CommonRitualSheet";
import { CommonKossDiagnosisSheet } from "@/components/dashboard/CommonKossDiagnosisSheet";

interface ShowcaseBentoGridProps {
  levelNum?: number;
  nextDiff?: number;
}

/**
 * 3. ShowcaseBentoGrid: 이달의 리추얼 & 30초 마음진단 2열 벤토 모듈
 */
export function ShowcaseBentoGrid({}: ShowcaseBentoGridProps) {
  const router = useRouter();
  const { openModal } = useModalStore();

  return (
    <div className="grid grid-cols-2 gap-3.5">
      {/* [1열 - 왼쪽] 이달의 리추얼 카드 -> CommonRitualSheet slide-left 0ms 모달 연동 */}
      <div
        onClick={() =>
          openModal({
            type: "slide-left",
            content: (
              <CommonRitualSheet
                ritualTitle="미소 명상"
                ritualCategory="이달의 대표 리추얼"
                ritualTime="3분"
                description="입가에 옅은 미소를 지으며 얼굴 근육의 긴장을 풀고, 평온한 기운이 온몸에 스며들도록 정돈하는 이달의 대표 리추얼입니다."
              />
            ),
          })
        }
        className="bg-white border border-gray-200/90 rounded-2xl p-3.5 shadow-2xs flex flex-col justify-between min-h-[136px] relative overflow-hidden group hover:border-[#00C474] transition-all cursor-pointer active:scale-[0.98]"
      >
        <div className="flex flex-col gap-1.5 relative z-10">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black txt-brand-ink">이달의 리추얼</span>
            <span className="text-[10px] font-bold text-[#00C474] bg-emerald-50 px-1.5 py-0.5 rounded">
              8월 대표
            </span>
          </div>

          <div className="my-1 flex items-center justify-center py-1 animate-pulse hover:scale-110 transition-transform duration-300">
            <img
              src={getIconPath(1)}
              alt="미소 명상"
              className="w-10 h-10 object-contain drop-shadow-md"
            />
          </div>

          <p className="text-[11px] text-gray-700 font-bold text-center leading-tight">
            미소 명상 <span className="text-[#00C474] font-black">· 3분</span>
          </p>
        </div>
      </div>

      {/* [2열 - 오른쪽] 30초 마음진단 칩 -> CommonKossDiagnosisSheet slide-left 모달 연동 */}
      <div
        onClick={() =>
          openModal({
            type: "slide-left",
            content: <CommonKossDiagnosisSheet />,
          })
        }
        className="bg-white border border-gray-200/90 rounded-2xl p-4 shadow-2xs flex flex-col justify-between hover:border-[#00C474] transition-all cursor-pointer group min-h-[136px] active:scale-[0.98]"
      >
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1.5">
            <Sparkle size={15} weight="fill" className="txt-brand-green shrink-0" />
            <h2 className="text-xs font-black txt-brand-ink">30초 마음진단</h2>
          </div>
          <p className="txt-caption-compact text-gray-500 font-medium leading-relaxed">
            KOSS 직무 스트레스 검증
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
