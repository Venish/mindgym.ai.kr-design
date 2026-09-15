"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useMindGym } from "@/context/MindGymContext";
import { useModalStore } from "@/store/useModalStore";

// Modularized Showcase Components 100% Import (@/components/dashboard)
import { ShowcaseHeader } from "@/components/dashboard/ShowcaseHeader";
import { ShowcaseMonthlyMe } from "@/components/dashboard/ShowcaseMonthlyMe";
import { ShowcaseHeroKv } from "@/components/dashboard/ShowcaseHeroKv";
import { ShowcaseSosPrescription } from "@/components/dashboard/ShowcaseSosPrescription";
import { ShowcaseWorkplaceGuideTipBar } from "@/components/dashboard/ShowcaseWorkplaceGuideTipBar";
import { ShowcaseMindSwitchBar } from "@/components/dashboard/ShowcaseMindSwitchBar";
import { ShowcasePauseBanner } from "@/components/dashboard/ShowcasePauseBanner";
import { ShowcaseParallaxFooter } from "@/components/dashboard/ShowcaseParallaxFooter";
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
  const { openModal, closeModal } = useModalStore();

  const levelNum = getLevelNumber();
  const nextDiff = getNextLevelDiff();
  const completedDaysCount = completedDays?.length || 14;

  const param = searchParams
    ? (
        searchParams.get("type") ||
        searchParams.get("checkin") ||
        searchParams.get("time") ||
        searchParams.get("mode") ||
        searchParams.get("pop") ||
        ""
      ).toLowerCase()
    : "";

  useEffect(() => {
    if (completedDays.length === 30) {
      openModal({
        type: "slide-up",
        content: <GoldenGardenModal isOpen={true} onClose={closeModal} />,
      });
    }

    if (!param) return;

    const autoOpenTimer = setTimeout(() => {
      if (["morning", "day", "am", "morning_checkin"].includes(param)) {
        openModal({
          type: "slide-up",
          content: <MorningCheckinDrawer isOpen={true} onClose={closeModal} />,
        });
      } else if (["evening", "night", "pm", "evening_checkin"].includes(param)) {
        openModal({
          type: "slide-up",
          content: <EveningCheckinDrawer isOpen={true} onClose={closeModal} />,
        });
      }
    }, 350);

    return () => clearTimeout(autoOpenTimer);
  }, [completedDays, param, openModal, closeModal]);

  return (
    <div className="w-full max-w-[430px] min-h-screen mx-auto bg-theme-app relative flex flex-col justify-between overflow-x-hidden txt-brand-ink select-none font-sans no-scrollbar transition-colors duration-200">
      {/* 1. 대시보드 메인 카드 레이어 (패럴랙스 mb-[220px] 복원 & pb-40 내여백 보존) */}
      <main className="relative z-10 bg-theme-app flex-1 min-h-screen px-4 pt-2 pb-40 flex flex-col gap-4 text-left shadow-lg rounded-b-2xl mb-[220px] transition-colors duration-200">
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

        {/* 4. 마음 스위치 (한 줄 4열 원터치 토글 바) */}
        <ShowcaseMindSwitchBar />

        {/* 5. 긴급 SOS 처방 (4종 감정별 즉각 리추얼 연동) */}
        <ShowcaseSosPrescription />

        {/* 6. 직장인 실전 리추얼 100% 활용기 (TIP 한 줄 띠 배너) */}
        <ShowcaseWorkplaceGuideTipBar />

        {/* 7. 잠시멈춤 VOL.11 매거진 배너 */}
        <ShowcasePauseBanner />
      </main>

      {/* 2. 뒤편 픽스 고정 패럴랙스 푸터 레이어 (fixed bottom-0 z-0 복원) */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto z-0 w-full bg-theme-app pointer-events-auto transition-colors duration-200">
        <ShowcaseParallaxFooter />
      </div>

      {/* 3. 최하단 고정 앱 바로가기 메뉴 바 (최상단 z-40) */}
      <ShowcaseFixedBottomBar />
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F9FAFB]" />}>
      <DashboardContent />
    </Suspense>
  );
}
