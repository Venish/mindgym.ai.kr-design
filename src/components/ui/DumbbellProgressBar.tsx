"use client";

import React from "react";
import { useMindGym } from "@/context/MindGymContext";

export function DumbbellProgressBar() {
  const { totalDumbbells, getLevelName, getLevelNumber, getNextLevelDiff } = useMindGym();

  const levelName = getLevelName();
  const levelNum = getLevelNumber();
  const nextDiff = getNextLevelDiff();

  const levelLimits = [0, 150, 300, 500, 800, 1200, 1800, 2500, 3500];
  const currentMin = levelLimits[levelNum - 1] || 0;
  const currentMax = levelLimits[levelNum] || 3500;
  const progressPercent = Math.min(
    100,
    Math.max(0, Math.round(((totalDumbbells - currentMin) / (currentMax - currentMin)) * 100))
  );

  return (
    <div className="w-full bg-brand-mint-light p-4 rounded-2xl flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="txt-body-main font-black txt-brand-ink">{levelName}</span>
          <span className="txt-caption-main txt-brand-green bg-white px-2 py-0.5 rounded-full shadow-sm">
            Lv.{levelNum}
          </span>
        </div>
        <span className="txt-caption-main txt-brand-clay">
          {totalDumbbells} 덤벨
        </span>
      </div>

      <div className="w-full h-3 bg-white rounded-full overflow-hidden p-0.5 shadow-inner">
        <div
          className="h-full bg-gradient-to-r from-[#55DFA0] to-[#00C474] rounded-full transition-all duration-500"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="flex justify-between items-center txt-micro-main txt-brand-tea pt-0.5">
        <span>다음 단계까지</span>
        <span className="txt-brand-green">
          {nextDiff > 0 ? `덤벨 ${nextDiff}개 남음` : "최고 레벨 달성!"}
        </span>
      </div>
    </div>
  );
}
