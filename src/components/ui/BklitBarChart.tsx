"use client";

import React from "react";
import { motion } from "framer-motion";

export interface BklitBarDomainItem {
  name: string;
  sub: string;
  score: number;
  maxScore?: number;
  status: string;
  barColor: string;
  textColor: string;
}

export interface BklitBarComparisonItem {
  name: string;
  sub: string;
  month1Label: string;
  month1Score: number;
  month1Color: string;
  month1Status: string;
  month2Label: string;
  month2Score: number;
  month2Color: string;
  month2Status: string;
  diffText: string;
  isImproved: boolean;
}

interface BklitBarChartProps {
  domains?: BklitBarDomainItem[];
  comparisonItems?: BklitBarComparisonItem[];
  compareMode?: boolean;
  className?: string;
}

/**
 * BklitBarChart: bklit.com 공식 모던 스펙 기반 단일 겹침(Overlaid Bar) 및 영역별 진단 막대 그래프 컴포넌트
 */
export function BklitBarChart({
  domains,
  comparisonItems,
  compareMode = false,
  className = "",
}: BklitBarChartProps) {
  // 1. 2개 월 선택 시 단일 겹침 비교 모드 (Single Overlaid Progress Bar & 월/점수 표기 제거, 순수 증감표시)
  if (compareMode && comparisonItems && comparisonItems.length > 0) {
    const firstItem = comparisonItems[0];

    return (
      <div className={`w-full bg-[#F8FAFC] rounded-2xl p-4 flex flex-col gap-4 shadow-2xs ${className}`}>
        {/* 오버레이 파스텔 범례 (Legend) */}
        <div className="w-full flex items-center justify-between border-b border-gray-200/60 pb-2.5">
          <div className="flex items-center gap-3 text-xs font-bold">
            <span className="flex items-center gap-1.5 text-gray-800">
              <span className="w-2.5 h-2.5 rounded-full bg-[#6EE7B7]" />
              {firstItem.month1Label}
            </span>
            <span className="flex items-center gap-1.5 text-gray-600">
              <span className="w-2.5 h-2.5 rounded-full bg-[#A5B4FC]" />
              {firstItem.month2Label} (이전)
            </span>
          </div>

          <span className="text-[11px] font-extrabold text-[#059669] bg-emerald-50 px-2.5 py-0.5 rounded-full">
            단일 바 겹침 비교
          </span>
        </div>

        {/* 8개 영역 단일 겹침 바 렌더링 */}
        {comparisonItems.map((item, idx) => {
          const max = 10;
          const p1 = Math.min(100, Math.round((item.month1Score / max) * 100)); // 최신 월 (Month 1)
          const p2 = Math.min(100, Math.round((item.month2Score / max) * 100)); // 이전 월 (Month 2)

          const diff = item.month1Score - item.month2Score;
          const isImproved = diff < 0; // 스트레스 감소
          const isSame = diff === 0;

          return (
            <div key={idx} className="flex flex-col gap-1.5 group">
              {/* 상단: 영역 이름 + 순수 증감 상태 배지 (점수/월 표기 완제거!) */}
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-800 tracking-tight text-[13px]">
                    {item.name}
                  </span>
                  <span className="text-[11px] text-gray-400 font-medium">
                    {item.sub}
                  </span>
                </div>

                {/* 순수 증감 상태 배지 */}
                <div className="flex items-center gap-1.5">
                  {isSame ? (
                    <span className="font-extrabold text-[11.5px] px-2 py-0.5 rounded-md bg-gray-100 text-gray-500">
                      유지 ⚪
                    </span>
                  ) : isImproved ? (
                    <span className="font-extrabold text-[11.5px] px-2 py-0.5 rounded-md bg-emerald-50 text-[#059669]">
                      감소 🟢
                    </span>
                  ) : (
                    <span className="font-extrabold text-[11.5px] px-2 py-0.5 rounded-md bg-rose-50 text-[#E57373]">
                      증가 🔴
                    </span>
                  )}
                </div>
              </div>

              {/* 하나의 프로그레스 트랙 바 안에서 겹쳐서 오버레이 (Single Overlaid Bar) */}
              <div className="w-full h-3 bg-gray-200/70 rounded-full overflow-hidden relative">
                {/* Month 2 이전 월 기준 바 (파스텔 라벤더/인디고 bg-[#A5B4FC]) */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${p2}%` }}
                  transition={{
                    duration: 0.7,
                    delay: idx * 0.04 + 0.05,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="h-full rounded-full bg-[#A5B4FC]/80 absolute left-0 top-0"
                />

                {/* Month 1 최신 월 겹침 오버레이 바 (파스텔 민트 bg-[#6EE7B7]) */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${p1}%` }}
                  transition={{
                    duration: 0.7,
                    delay: idx * 0.04,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="h-full rounded-full bg-[#6EE7B7] absolute left-0 top-0 opacity-90 shadow-2xs"
                />
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // 2. 단일 월 선택 모드 (Single Bar Chart)
  if (!domains) return null;

  return (
    <div className={`w-full bg-[#F8FAFC] rounded-2xl p-3.5 flex flex-col gap-3.5 shadow-2xs ${className}`}>
      {domains.map((domain, idx) => {
        const max = domain.maxScore || 10;
        const percent = Math.min(100, Math.round((domain.score / max) * 100));

        return (
          <div key={idx} className="flex flex-col gap-1.5 group">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-gray-800 tracking-tight text-[13px]">
                  {domain.name}
                </span>
                <span className="text-[11px] text-gray-400 font-medium">
                  {domain.sub}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className={`font-black text-[12px] px-2 py-0.5 rounded-md bg-white shadow-2xs ${domain.textColor}`}>
                  {domain.status}
                </span>
                <span className="font-black text-gray-900 text-[13px] tabular-nums">
                  {domain.score}점
                </span>
              </div>
            </div>

            <div className="w-full h-2.5 bg-gray-200/60 rounded-full overflow-hidden relative">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${percent}%` }}
                transition={{
                  duration: 0.7,
                  delay: idx * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`h-full rounded-full ${domain.barColor} transition-all duration-300 group-hover:brightness-105`}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
