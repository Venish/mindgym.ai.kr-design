"use client";

import React from "react";
import Link from "next/link";
import {
  ChartLineUp,
  SlidersHorizontal,
  DownloadSimple,
  Buildings,
  ArrowLeft,
} from "@phosphor-icons/react";
import { ThemeSwitcher } from "@/components/ui/ThemeSwitcher";

export function MetricsHeader() {
  return (
    <header className="h-16 border-b border-[var(--color-border-card,#E5E7EB)] bg-white/80 backdrop-blur-md px-6 flex items-center justify-between z-30 shrink-0">
      {/* 좌측 로고 및 브레드크럼 */}
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard"
          className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-900 transition-colors p-1.5 rounded-lg hover:bg-gray-100"
        >
          <ArrowLeft size={16} weight="bold" />
          <span>대시보드로 돌아가기</span>
        </Link>
        <div className="h-4 w-px bg-gray-200" />
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-sm">
            <ChartLineUp size={20} weight="bold" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-bold text-gray-900 tracking-tight">
                마인드짐 통합 통계 포털
              </h1>
              <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200/50">
                B2B Enterprise
              </span>
            </div>
            <p className="text-[11px] text-gray-400">
              조직 마음건강 지표 및 리추얼 활성 분석
            </p>
          </div>
        </div>
      </div>

      {/* 중앙/우측 필터 및 컨트롤 */}
      <div className="flex items-center gap-3">
        {/* 기업 선택 셀렉트 */}
        <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-200 text-xs">
          <Buildings size={16} className="text-gray-500" />
          <span className="font-semibold text-gray-800">(주)웰비아이 엔터프라이즈</span>
          <span className="text-gray-400">|</span>
          <span className="text-gray-500 font-medium">전체 1,250명</span>
        </div>

        {/* 기간 필터 */}
        <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl text-xs font-semibold text-gray-600">
          <button className="px-2.5 py-1 rounded-lg hover:text-gray-900 transition-colors">
            주간
          </button>
          <button className="px-2.5 py-1 rounded-lg bg-white text-indigo-600 shadow-xs">
            월간 (2026.09)
          </button>
          <button className="px-2.5 py-1 rounded-lg hover:text-gray-900 transition-colors">
            분기
          </button>
        </div>

        {/* 엑셀/CSV 리포트 다운로드 버튼 */}
        <button
          onClick={() => alert("통계 지표 엑셀 리포트 다운로드가 시작됩니다.")}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gray-900 hover:bg-black text-white text-xs font-semibold transition-transform active:scale-95 shadow-sm"
        >
          <DownloadSimple size={15} weight="bold" />
          <span>리포트 다운로드</span>
        </button>

        <div className="h-4 w-px bg-gray-200" />

        {/* 테마 스위처 */}
        <ThemeSwitcher />
      </div>
    </header>
  );
}
