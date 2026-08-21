"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { CaretRight, List } from "@phosphor-icons/react";
import { SectionTitle } from "@/components/ui/SectionTitle";

import { useModalStore } from "@/store/useModalStore";
import { MagazineListSheet } from "@/components/dashboard/MagazineListSheet";

/**
 * 5. ShowcasePauseBanner: 잠시멈춤 VOL.11 매거진 추천 배너 모듈
 */
export function ShowcasePauseBanner() {
  const router = useRouter();
  const { openModal } = useModalStore();

  const handleOpenMagazine = () => {
    openModal({
      type: "slide-left",
      content: <MagazineListSheet initialMagazineId="mag-vol11" />,
    });
  };

  return (
    <div className="flex flex-col gap-2.5 w-full">
      {/* 공통 섹션 중제목 컴포넌트 사용 */}
      <SectionTitle
        title="지금 나에게 맞는 이야기"
        action={
          <button
            type="button"
            aria-label="메뉴"
            onClick={handleOpenMagazine}
            className="p-1 text-gray-400 hover:text-gray-900 transition-colors rounded-lg active:scale-95 outline-none cursor-pointer"
            title="매거진 라이브러리 전체보기"
          >
            <List size={18} weight="bold" />
          </button>
        }
      />

      {/* 잠시멈춤 매거진 배너 카드 -> MagazineListSheet slide-left 모달 연동 */}
      <div
        onClick={handleOpenMagazine}
        className="bg-[#F9FAFB] hover:bg-[#F2F4F7] rounded-2xl p-4 flex items-center justify-between cursor-pointer transition-all active:scale-[0.98] shadow-2xs"
      >
        <div className="flex items-center gap-3.5">
          <div className="w-[48px] h-[64px] bg-gradient-to-b from-[#7CE0B0] to-[#4ECB93] rounded-xl flex flex-col justify-end items-center pb-2 text-white shrink-0 shadow-2xs">
            <span className="text-xs font-bold font-mono tracking-tighter text-white uppercase">
              VOL.11
            </span>
          </div>
          <div className="flex flex-col text-left">
            <h3 className="text-[1.0625rem] font-black text-gray-900 tracking-tight leading-tight">
              잠시멈춤
            </h3>
            <span className="text-xs font-semibold text-gray-400 mt-1">
              이달의 추천 마인드 스토어
            </span>
          </div>
        </div>
        <CaretRight size={18} className="text-gray-400" />
      </div>
    </div>
  );
}
