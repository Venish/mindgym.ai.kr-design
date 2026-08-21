"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Check } from "@phosphor-icons/react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { CommonCardGrid } from "@/components/ui/CommonCardGrid";

import { useModalStore } from "@/store/useModalStore";
import { CommonRitualSheet } from "@/components/dashboard/CommonRitualSheet";
import { CommonSosDiagnosisSheet } from "@/components/dashboard/CommonSosDiagnosisSheet";

/**
 * 4. ShowcaseTodayRoutines: "오늘 나를 위한 맞춤 추천" 3열 추천 루틴 카드 모듈
 * (공통 CommonCardGrid 3열 사용)
 */
export function ShowcaseTodayRoutines() {
  const router = useRouter();
  const { openModal } = useModalStore();

  return (
    <div className="flex flex-col gap-2.5 w-full">
      {/* 공통 섹션 중제목 컴포넌트 사용 */}
      <SectionTitle title="오늘 나를 위한 맞춤 추천" />

      {/* 전역 공통 3열 카드 그리드 컴포넌트 적용 */}
      <CommonCardGrid cols={3}>
        {/* 1. 추천 루틴 1 (오프먼트 -> CommonRitualSheet slide-left 모달 연동) */}
        <div
          onClick={() =>
            openModal({
              type: "slide-left",
              content: (
                <CommonRitualSheet
                  ritualTitle="오프먼트"
                  ritualCategory="휴식과 충전"
                  ritualTime="5분"
                  description="스마트폰 화면을 끄고 조용히 오프라인 감각에 온전히 몰입하는 5분간의 마음 쉼표 리추얼입니다."
                />
              ),
            })
          }
          className="bg-white border border-gray-200 hover:border-emerald-300 rounded-xl p-3.5 flex flex-col justify-between h-[134px] cursor-pointer active:scale-95 transition-all shadow-2xs"
        >
          <div className="w-[30px] h-[30px] rounded-lg bg-emerald-50 text-[#00C474] flex items-center justify-center shrink-0">
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

        {/* 2. 추천 루틴 2 (한 칸 완벽주의 -> CommonRitualSheet slide-left 모달 연동) */}
        <div
          onClick={() =>
            openModal({
              type: "slide-left",
              content: (
                <CommonRitualSheet
                  ritualTitle="한 칸 완벽주의"
                  ritualCategory="스트레스 비우기"
                  ritualTime="3분"
                  description="내 주변의 소소한 한 칸을 정돈하며 복잡한 마음을 가지런히 비워냅니다. 거창한 변화가 아닌 눈앞의 작은 실행 하나로 완벽주의의 부담을 내려놓으세요."
                />
              ),
            })
          }
          className="bg-[var(--color-pastel-mint-bg)] hover:bg-emerald-100/70 rounded-xl p-3.5 flex flex-col justify-between h-[134px] cursor-pointer active:scale-95 transition-all shadow-2xs"
        >
          <div className="w-[30px] h-[30px] rounded-lg bg-white text-[#00C474] text-xs font-black flex items-center justify-center shrink-0 shadow-2xs">
            3분
          </div>
          <div className="flex flex-col text-left">
            <h3 className="text-[0.9375rem] font-bold text-gray-900 leading-snug tracking-tight">
              한 칸 완벽주의
            </h3>
            <span className="text-[13px] font-semibold text-gray-600 mt-1">
              서랍 정돈
            </span>
          </div>
        </div>

        {/* 3. 긴급 SOS 처방 카드 (CommonSosDiagnosisSheet slide-left 모달 연동) */}
        <div
          onClick={() =>
            openModal({
              type: "slide-left",
              content: <CommonSosDiagnosisSheet />,
            })
          }
          className="bg-[#F9FAFB] hover:bg-[#F2F4F7] rounded-xl p-3.5 flex flex-col justify-between h-[134px] cursor-pointer active:scale-95 transition-all shadow-2xs group"
        >
          <div className="w-[30px] h-[30px] rounded-lg bg-rose-100 text-rose-800 text-[11px] font-black tracking-tight flex items-center justify-center shrink-0 shadow-2xs">
            SOS
          </div>
          <div className="flex flex-col text-left">
            <h3 className="text-[0.9375rem] font-bold text-gray-900 group-hover:text-rose-600 leading-snug tracking-tight">
              지금 멘탈 진정
            </h3>
            <span className="text-[13px] font-semibold text-gray-500 mt-1">
              내 상황별 맞춤
            </span>
          </div>
        </div>
      </CommonCardGrid>
    </div>
  );
}
