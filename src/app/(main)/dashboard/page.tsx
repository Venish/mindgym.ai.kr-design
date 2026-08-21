"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useMindGym } from "@/context/MindGymContext";

// Modularized Showcase Components 100% Import (@/components/dashboard)
import { ShowcaseHeader } from "@/components/dashboard/ShowcaseHeader";
import { ShowcaseMonthlyMe } from "@/components/dashboard/ShowcaseMonthlyMe";
import { ShowcaseHeroKv } from "@/components/dashboard/ShowcaseHeroKv";
import { ShowcaseBentoGrid } from "@/components/dashboard/ShowcaseBentoGrid";
import { ShowcaseTodayRoutines } from "@/components/dashboard/ShowcaseTodayRoutines";
import { ShowcasePauseBanner } from "@/components/dashboard/ShowcasePauseBanner";
import { ShowcaseFixedBottomBar } from "@/components/dashboard/ShowcaseFixedBottomBar";

// Modals
import { MorningCheckinDrawer } from "@/components/modals/MorningCheckinDrawer";
import { EveningCheckinDrawer } from "@/components/modals/EveningCheckinDrawer";
import { GoldenGardenModal } from "@/components/modals/GoldenGardenModal";
import { MagazineViewerModal } from "@/components/modals/MagazineViewerModal";
import { magazinesData } from "@/data/magazines";

function DashboardContent() {
  const { getLevelNumber, getNextLevelDiff, userName, completedDays } = useMindGym();
  const searchParams = useSearchParams();

  const levelNum = getLevelNumber();
  const nextDiff = getNextLevelDiff();
  const completedDaysCount = completedDays?.length || 14;

  const [isMorningOpen, setIsMorningOpen] = useState(false);
  const [isEveningOpen, setIsEveningOpen] = useState(false);
  const [isGoldenOpen, setIsGoldenOpen] = useState(false);
  const [isMagazineOpen, setIsMagazineOpen] = useState(false);

  const param = (
    searchParams.get("type") ||
    searchParams.get("checkin") ||
    searchParams.get("time") ||
    searchParams.get("mode") ||
    searchParams.get("pop") ||
    ""
  ).toLowerCase();

  useEffect(() => {
    if (completedDays.length === 30) {
      setIsGoldenOpen(true);
    }

    if (!param) return;

    const autoOpenTimer = setTimeout(() => {
      if (["morning", "day", "am", "morning_checkin"].includes(param)) {
        setIsMorningOpen(true);
      } else if (["evening", "night", "pm", "evening_checkin"].includes(param)) {
        setIsEveningOpen(true);
      }
    }, 350);

    return () => clearTimeout(autoOpenTimer);
  }, [completedDays, param]);

  return (
    <div className="w-full max-w-[430px] min-h-screen mx-auto bg-white relative flex flex-col justify-between overflow-x-hidden text-gray-900 select-none font-sans no-scrollbar">
      
      {/* 대시보드 스크롤 바디 (pb-32로 하단 고정 네비바 가림 방지) */}
      <main className="flex-1 px-4 pt-2 pb-32 flex flex-col gap-4 text-left">
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

      {/* 7. 하단 고정 앱 바로가기 메뉴 바 */}
      <ShowcaseFixedBottomBar />

      {/* 대시보드 팝업 모달 렌더링 */}
      <MorningCheckinDrawer isOpen={isMorningOpen} onClose={() => setIsMorningOpen(false)} />
      <EveningCheckinDrawer isOpen={isEveningOpen} onClose={() => setIsEveningOpen(false)} />
      <GoldenGardenModal isOpen={isGoldenOpen} onClose={() => setIsGoldenOpen(false)} />
      <MagazineViewerModal
        magazine={isMagazineOpen ? magazinesData[0] || null : null}
        onClose={() => setIsMagazineOpen(false)}
      />
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="p-5 pt-16 flex items-center justify-center min-h-screen text-gray-400">대시보드 불러오는 중...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
