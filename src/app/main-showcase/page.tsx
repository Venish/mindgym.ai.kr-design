"use client";

import React from "react";
import { useMindGym } from "@/context/MindGymContext";

// Modularized Independent Section Components
import { ShowcaseHeader } from "./_components/ShowcaseHeader";
import { ShowcaseMonthlyMe } from "./_components/ShowcaseMonthlyMe";
import { ShowcaseHeroKv } from "./_components/ShowcaseHeroKv";
import { ShowcaseBentoGrid } from "./_components/ShowcaseBentoGrid";
import { ShowcaseTodayRoutines } from "./_components/ShowcaseTodayRoutines";
import { ShowcasePauseBanner } from "./_components/ShowcasePauseBanner";
import { ShowcaseFixedBottomBar } from "./_components/ShowcaseFixedBottomBar";

/**
 * MainShowcasePage (Senior Design Engineering Modular Architecture)
 *
 * App Layout with Fixed Bottom Bar:
 * - Top Header & Hero Sections
 * - Bento Grid & Routines
 * - Fixed Bottom Navigation Bar (with text captions)
 */
export default function MainShowcasePage() {
  const { getLevelNumber, getNextLevelDiff, userName, completedDays } = useMindGym();

  const levelNum = getLevelNumber();
  const nextDiff = getNextLevelDiff();
  const completedDaysCount = completedDays?.length || 14;

  return (
    // 앱 스마트폰 폭(max-w-[430px]) 기준 100% 에디토리얼 모바일 뷰 (bg-white)
    <div className="w-full max-w-[430px] min-h-screen mx-auto bg-white relative flex flex-col justify-between overflow-hidden text-gray-900 select-none shadow-xs font-sans">
      
      {/* 메인 스크롤 바디 (하단 텍스트 포함 메뉴 공간 확보를 위해 pb-32 지정) */}
      <main className="flex-1 overflow-y-auto px-4 pt-2 pb-32 flex flex-col gap-4 text-left">
        {/* 1. 상단 메뉴 헤더 컴포넌트 */}
        <ShowcaseHeader userName={userName || "보노보노"} levelNum={levelNum} />

        {/* 2. [이달의 나] 영역 */}
        <ShowcaseMonthlyMe
          userName={userName || "보노보노"}
          levelNum={levelNum}
          completedDaysCount={completedDaysCount}
        />

        {/* 3. 상단 키비주얼 배너 ("보노보노님의 오늘 마음," & "차분함") */}
        <ShowcaseHeroKv
          userName={userName || "보노보노"}
          morningEmotion="차분함"
          levelNum={levelNum}
        />

        {/* 4. 30초 체크인 & 덤벨 성장의 길 2열 벤토 */}
        <ShowcaseBentoGrid levelNum={levelNum} nextDiff={nextDiff} />

        {/* 5. 오늘의 루틴 3가지 (플랫 3열) */}
        <ShowcaseTodayRoutines />

        {/* 6. 잠시멈춤 VOL.11 매거진 배너 */}
        <ShowcasePauseBanner />
      </main>

      {/* 7. 하단 고정 앱 바로가기 메뉴 바 (텍스트 라벨 내장) */}
      <ShowcaseFixedBottomBar />

    </div>
  );
}
