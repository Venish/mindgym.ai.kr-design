"use client";

import React from "react";
import { CaretRight, List } from "@phosphor-icons/react";

/**
 * 5. ShowcasePauseBanner: 잠시멈춤 VOL.11 매거진 추천 배너 모듈 (순수 텍스트 헤더 + 우측 햄버거 메뉴 아이콘)
 */
export function ShowcasePauseBanner() {
  return (
    <div className="flex flex-col gap-3 w-full">
      {/* 섹션 헤더: 오늘의 루틴과 동일한 순수 텍스트 + 우측 햄버거 메뉴 */}
      <div className="flex items-center justify-between px-0.5">
        <h2 className="text-lg font-black text-gray-900 tracking-tight">
          지금 나에게 맞는 이야기
        </h2>
        <button
          type="button"
          aria-label="메뉴"
          className="p-1 text-gray-400 hover:text-gray-900 transition-colors rounded-lg active:scale-95"
        >
          <List size={20} weight="bold" />
        </button>
      </div>

      {/* 잠시멈춤 매거진 배너 카드 (#F9FAFB Surface 배경) */}
      <div className="bg-[#F9FAFB] hover:bg-[#F2F4F7] rounded-2xl p-4 flex items-center justify-between cursor-pointer transition-all active:scale-[0.98]">
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
