"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { MagicButton } from "@/components/godui/MagicButton";
import { RitualRainbowIconCard } from "@/components/ui/RitualGlassIconCard";
import { getRitualTitleByIconNum } from "@/data/ritualsDetailData";

export interface CommonErrorTemplateProps {
  /** 에러 코드 뱃지 텍스트 (예: "404 · Page Not Found" / "500 · Server Error") */
  badgeCode: string;
  /** 뱃지 색상 테마 ("amber" | "rose") */
  badgeColor?: "amber" | "rose";
  /** 메인 타이틀 헤딩 (예: "길을 잃으셨나요?" / "잠시 문제가 발생했습니다") */
  title: string;
  /** 본문 설명 문구 */
  description: React.ReactNode;
  /** 메인 CTA 버튼 텍스트 (지정 시 표시, 예: "다시 시도하기") */
  mainButtonLabel?: string;
  /** 메인 CTA 버튼 클릭 핸들러 (500 reset 등) */
  onMainButtonClick?: () => void;
  /** 메인 CTA 버튼 아이콘 */
  mainButtonIcon?: React.ReactNode;
  /** '이전 페이지로' 버튼 노출 여부 (404 전용) */
  showBackButton?: boolean;
}

/**
 * CommonErrorTemplate: 404/500 예외 페이지 100% 공통 템플릿 컴포넌트
 * - 단 한 곳에서 문구/디자인/아이콘/버튼 구조를 100% 통합 관리
 */
export function CommonErrorTemplate({
  badgeCode,
  badgeColor = "amber",
  title,
  description,
  mainButtonLabel,
  onMainButtonClick,
  mainButtonIcon,
  showBackButton = false,
}: CommonErrorTemplateProps) {
  const [randomIconNum, setRandomIconNum] = useState<number>(1);
  const [ritualTitle, setRitualTitle] = useState<string>("미소 명상");

  useEffect(() => {
    // 1~72개 리추얼 공식 아이콘 중 랜덤 1개 선택 및 해당 공식 제목 매핑
    const randomNum = Math.floor(Math.random() * 72) + 1;
    setRandomIconNum(randomNum);
    setRitualTitle(getRitualTitleByIconNum(randomNum));
  }, []);

  const badgeBgClass =
    badgeColor === "rose"
      ? "text-rose-600 bg-rose-50/80"
      : "text-amber-600 bg-amber-50/80";

  return (
    <div className="min-h-screen w-full bg-white flex flex-col items-center justify-center p-6 text-center select-none">
      <div className="w-full max-w-sm flex flex-col items-center gap-5 my-auto">
        {/* 메인 푸터 미소 명상과 100% 동일한 RitualRainbowIconCard 대형 랜덤 아이콘 & 실제 제목 바인딩 */}
        <div className="my-2">
          <RitualRainbowIconCard
            icon={randomIconNum}
            name={ritualTitle}
            size="lg"
          />
        </div>

        {/* 뱃지 */}
        <span
          className={`text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider ${badgeBgClass}`}
        >
          {badgeCode}
        </span>

        {/* 타이틀 */}
        <h1 className="text-2xl font-black text-gray-900 tracking-tight leading-snug">
          {title}
        </h1>

        {/* 본문 설명 */}
        <div className="text-sm font-medium text-gray-600 leading-relaxed text-center font-sans">
          {description}
        </div>

        {/* 버튼 영역 */}
        <div className="w-full flex flex-col gap-2.5 pt-3">
          {/* 메인 커스텀 CTA (예: 500 다시 시도하기) */}
          {mainButtonLabel && (
            <button
              type="button"
              onClick={onMainButtonClick}
              className="w-full"
            >
              <MagicButton
                type="button"
                className="w-full bg-[#00C474] hover:bg-[#00B068] text-white font-extrabold py-3.5 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {mainButtonIcon}
                <span>{mainButtonLabel}</span>
              </MagicButton>
            </button>
          )}

          {/* 공통 홈으로 이동 버튼 */}
          <Link href="/dashboard" className="w-full">
            <MagicButton
              type="button"
              className="w-full bg-[#00C474] hover:bg-[#00B068] text-white font-extrabold py-3.5 rounded-2xl shadow-md transition-all flex items-center justify-center cursor-pointer"
            >
              <span>홈으로</span>
            </MagicButton>
          </Link>

          {/* 404 전용 이전 페이지로 고스트 버튼 */}
          {showBackButton && (
            <button
              type="button"
              onClick={() => window.history.back()}
              className="w-full py-2.5 bg-transparent hover:bg-gray-50 text-gray-500 hover:text-gray-900 font-bold text-xs transition-all flex items-center justify-center cursor-pointer"
            >
              <span>이전 페이지로</span>
            </button>
          )}
        </div>
      </div>

      {/* 대시보드 푸터와 100% 동일한 Copyright */}
      <p className="text-[11px] text-slate-400 font-sans tracking-tight mt-6">
        Copyright ⓒ WELLBI Inc. All rights reserved.
      </p>
    </div>
  );
}
