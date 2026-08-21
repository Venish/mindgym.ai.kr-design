"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus } from "@phosphor-icons/react";
import { useModalStore } from "@/store/useModalStore";
import { CommonRitualSheet } from "@/components/dashboard/CommonRitualSheet";
import { FooterMoreSheet } from "@/components/dashboard/FooterMoreSheet";

/**
 * ShowcaseFixedBottomBar: 5개 슬롯 하단 네비게이션
 * (모든 슬롯의 마우스 Hover 배경 및 피드백을 빈 슬롯과 100% 동일하게 통일)
 */
export function ShowcaseFixedBottomBar() {
  const router = useRouter();
  const { openModal } = useModalStore();

  const handleOpenFooterMore = () => {
    openModal({
      type: "slide-up",
      content: <FooterMoreSheet />,
    });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-[430px] w-full mx-auto z-40 bg-white/95 backdrop-blur-md border-t border-gray-200/70 shadow-lg rounded-t-3xl px-3 py-2 flex items-start justify-around select-none">
      {/* 1. 로고 탭 ("더보기" -> FooterMoreSheet slide-up 2단계 익스팬션 모달 연동) */}
      <button
        type="button"
        onClick={handleOpenFooterMore}
        className="flex flex-col items-center justify-center shrink-0 transition-transform active:scale-95 group outline-none cursor-pointer"
        title="전체 리추얼 및 서비스 보기"
      >
        <div className="flex flex-col items-center justify-center w-[3.6rem] h-[3.6rem] rounded-2xl bg-white group-hover:bg-emerald-50/50 group-hover:border-emerald-300 border border-gray-200 shadow-2xs transition-colors">
          <img
            src="/images/logo_icon.svg"
            alt="MindGym Logo"
            className="w-6 h-6 object-contain"
          />
        </div>
        <span className="text-[10px] font-bold text-gray-700 tracking-tight mt-1 group-hover:text-[#00C474] transition-colors leading-tight">
          더보기
        </span>
      </button>

      {/* 2. 리추얼 1 탭 ("미소 명상" -> CommonRitualSheet slide-left 모달 연동) */}
      <button
        type="button"
        onClick={() =>
          openModal({
            type: "slide-left",
            content: (
              <CommonRitualSheet
                ritualTitle="미소 명상"
                ritualCategory="휴식과 충전"
                ritualTime="3분"
                description="입가에 옅은 미소를 지으며 얼굴 근육의 긴장을 풀고, 평온한 기운이 온몸에 스며들도록 정돈하는 미소 명상 리추얼입니다."
              />
            ),
          })
        }
        className="flex flex-col items-center justify-center shrink-0 transition-transform active:scale-95 group outline-none"
        title="미소 명상 실행하기"
      >
        <div className="flex flex-col items-center justify-center w-[3.6rem] h-[3.6rem] rounded-2xl bg-white group-hover:bg-emerald-50/50 group-hover:border-emerald-300 border border-gray-200 shadow-2xs p-0.5 transition-colors">
          <img
            src="/images/icons/1.png"
            alt="Ritual Icon 1"
            className="w-11 h-11 object-contain drop-shadow-2xs"
          />
        </div>
        <span className="text-[10px] font-bold text-gray-700 tracking-tight mt-1 group-hover:text-[#00C474] transition-colors leading-tight">
          미소 명상
        </span>
      </button>

      {/* 3. 리추얼 2 탭 ("마음일기" -> /player/RT-012) */}
      <button
        type="button"
        onClick={() => router.push("/player/RT-012")}
        className="flex flex-col items-center justify-center shrink-0 transition-transform active:scale-95 group outline-none"
        title="마음일기 작성하기"
      >
        <div className="flex flex-col items-center justify-center w-[3.6rem] h-[3.6rem] rounded-2xl bg-white group-hover:bg-emerald-50/50 group-hover:border-emerald-300 border border-gray-200 shadow-2xs p-0.5 transition-colors">
          <img
            src="/images/icons/2.png"
            alt="Ritual Icon 2"
            className="w-11 h-11 object-contain drop-shadow-2xs"
          />
        </div>
        <span className="text-[10px] font-bold text-gray-700 tracking-tight mt-1 group-hover:text-[#00C474] transition-colors leading-tight">
          마음일기
        </span>
      </button>

      {/* 4. 빈 슬롯 바로가기 1 -> /ritual */}
      <button
        type="button"
        onClick={() => router.push("/ritual")}
        className="flex flex-col items-center justify-center shrink-0 transition-transform active:scale-95 group outline-none"
        title="리추얼 추가하기 (빈 슬롯 1)"
      >
        <div className="flex items-center justify-center w-[3.6rem] h-[3.6rem] rounded-2xl border-2 border-dashed border-gray-300 group-hover:border-emerald-300 bg-gray-50/50 group-hover:bg-emerald-50/50 text-gray-400 group-hover:text-[#00C474] transition-all">
          <Plus size={22} weight="bold" className="text-gray-400 group-hover:text-[#00C474] transition-colors" />
        </div>
        <span className="h-[14px] mt-1 block" aria-hidden="true" />
      </button>

      {/* 5. 빈 슬롯 바로가기 2 -> /ritual */}
      <button
        type="button"
        onClick={() => router.push("/ritual")}
        className="flex flex-col items-center justify-center shrink-0 transition-transform active:scale-95 group outline-none"
        title="리추얼 추가하기 (빈 슬롯 2)"
      >
        <div className="flex items-center justify-center w-[3.6rem] h-[3.6rem] rounded-2xl border-2 border-dashed border-gray-300 group-hover:border-emerald-300 bg-gray-50/50 group-hover:bg-emerald-50/50 text-gray-400 group-hover:text-[#00C474] transition-all">
          <Plus size={22} weight="bold" className="text-gray-400 group-hover:text-[#00C474] transition-colors" />
        </div>
        <span className="h-[14px] mt-1 block" aria-hidden="true" />
      </button>
    </div>
  );
}
