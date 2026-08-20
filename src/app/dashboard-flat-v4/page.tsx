"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  CaretRight,
  Sparkle,
  Barbell,
  House,
  BookOpen,
  User,
  Compass,
  Plus,
  BookBookmark,
} from "@phosphor-icons/react";
import { AuroraText } from "@/components/godui/AuroraText";
import { NeumorphCard } from "@/components/godui/NeumorphCard";
import { SpotlightCard } from "@/components/godui/SpotlightCard";
import { NumberTicker } from "@/components/godui/NumberTicker";
import { RitualCard } from "@/components/common/RitualCard";
import { CalendarGrid } from "@/components/ui/CalendarGrid";
import { useMindGym } from "@/context/MindGymContext";
import { AnimatedMorningSun } from "@/components/animated-icons/AnimatedMorningSun";
import { MorningCheckinDrawer } from "@/components/modals/MorningCheckinDrawer";
import { EveningCheckinDrawer } from "@/components/modals/EveningCheckinDrawer";
import { GoldenGardenModal } from "@/components/modals/GoldenGardenModal";
import { MagazineViewerModal } from "@/components/modals/MagazineViewerModal";
import { magazinesData } from "@/data/magazines";
import { BrandLogo } from "@/components/ui/BrandLogo";

function DashboardFlatV4Content() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { userName, completedDays, getLevelNumber, getNextLevelDiff, getLevelName } = useMindGym();

  const [activeTab, setActiveTab] = useState<"home" | "ritual" | "magazine" | "my">("home");
  const [isMorningOpen, setIsMorningOpen] = useState(false);
  const [isEveningOpen, setIsEveningOpen] = useState(false);
  const [isGoldenOpen, setIsGoldenOpen] = useState(false);
  const [isMagazineOpen, setIsMagazineOpen] = useState(false);

  const isDraggingRef = useRef(false);

  const handleSafeClick = (action: () => void) => {
    if (isDraggingRef.current) return;
    action();
  };

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

  const levelNum = getLevelNumber ? getLevelNumber() : 2;
  const levelName = getLevelName ? getLevelName() : "돌 덤벨 (Lv.2)";

  return (
    <main className="min-h-screen bg-white text-gray-900 font-sans flex flex-col items-center justify-start relative pb-20 select-none">
      {/* 430px 에디토리얼 모바일 프레임 (무테 수려한 버블감) */}
      <div className="w-full max-w-[430px] min-h-screen bg-white flex flex-col relative border-x border-gray-100 shadow-xs overflow-hidden">
        
        {/* 1. 상단 브랜드 고정 헤더 */}
        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md px-5 py-3.5 flex items-center justify-between border-b border-gray-50">
          <div onClick={() => router.push("/dashboard")} className="cursor-pointer">
            <BrandLogo size="md" />
          </div>

          {/* 덤벨 스탯 캡슐 뱃지 */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F9FAFB] rounded-full border border-emerald-100/60 shadow-2xs">
            <Barbell size={16} weight="fill" className="text-[var(--color-brand-green)]" />
            <span className="text-xs font-black text-gray-800 tracking-tight">
              {levelName.split(" ")[0]} · Lv.{levelNum}
            </span>
          </div>
        </header>

        {/* 대시보드 메인 스크롤 콘텐츠 */}
        <div className="flex-1 flex flex-col gap-5 px-5 pt-3 pb-24 text-left">
          
          {/* 2. 환영 인사 및 아침 태양 애니메이션 */}
          <div className="flex items-center justify-between gap-4 pt-1">
            <div>
              <p className="text-xs font-extrabold text-gray-400 tracking-tight">
                8월의 마음 정원
              </p>
              <h2 className="text-2xl font-black text-gray-900 leading-tight mt-0.5 tracking-tight">
                <AuroraText className="font-black text-[#00C474] inline-block">{userName || "보노보노"}</AuroraText>님, 오늘 하루도 <br />
                함께해요
              </h2>
            </div>

            <div className="shrink-0 p-1">
              <AnimatedMorningSun size={48} />
            </div>
          </div>

          {/* 3. [이달의 나] NeumorphCard 뱃지 카드 */}
          <NeumorphCard className="w-full flex items-center justify-between p-4 rounded-2xl gap-3">
            <div className="flex flex-col gap-0.5 flex-1 text-left">
              <span className="text-xs font-bold text-emerald-800 tracking-tight flex items-center gap-1">
                <Sparkle size={12} weight="fill" className="text-[#00C474]" />
                이달의 나
              </span>
              <div className="text-lg font-black text-gray-900 tracking-tight flex items-center gap-1">
                <span>차분한 <span className="text-[var(--color-brand-green)]">8월</span> ·</span>
                <span className="text-[var(--color-brand-green)] inline-flex items-center">
                  <NumberTicker value={completedDays.length || 14} />일
                </span>
                <span>째</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 bg-white border border-emerald-200/80 px-3 py-2 rounded-xl shrink-0 shadow-2xs">
              <Barbell size={20} weight="fill" className="text-[#00C474]" />
              <span className="text-xs font-mono font-black text-gray-900">Lv.{levelNum}</span>
            </div>
          </NeumorphCard>

          {/* 4. 나만의 리추얼 드래그 칩 가로 스크롤 */}
          <div className="-mx-5 px-5 overflow-hidden py-1 cursor-grab active:cursor-grabbing">
            <motion.div
              drag="x"
              dragConstraints={{ left: -280, right: 0 }}
              dragElastic={0.12}
              onDragStart={() => {
                isDraggingRef.current = true;
              }}
              onDragEnd={() => {
                setTimeout(() => {
                  isDraggingRef.current = false;
                }, 120);
              }}
              className="flex items-center gap-2.5 shrink-0 select-none"
            >
              <button
                type="button"
                onClick={() => handleSafeClick(() => router.push("/onboarding?mode=monthly_start"))}
                className="flex items-center justify-center w-[4rem] h-[4rem] rounded-2xl bg-gray-100/80 hover:bg-gray-200/80 text-gray-700 shrink-0 transition-all active:scale-[0.96] border border-gray-200/60 shadow-2xs outline-none"
                title="나의 여정 설정"
              >
                <Compass size={24} weight="duotone" className="text-gray-700" />
              </button>

              <RitualCard
                variant="icon-only"
                title="미소 명상"
                icon="smiley"
                onClick={() => handleSafeClick(() => router.push("/player/RT-001"))}
              />
              <RitualCard
                variant="icon-only"
                title="마음일기"
                icon="notebook"
                onClick={() => handleSafeClick(() => router.push("/player/RT-012"))}
              />
              <RitualCard
                variant="icon-only"
                title="망할 확률 계산기"
                icon="brain"
                onClick={() => handleSafeClick(() => router.push("/player/RT-005"))}
              />
              <RitualCard
                variant="icon-only"
                title="미고사"
                icon="heart"
                onClick={() => handleSafeClick(() => router.push("/player/RT-013"))}
              />
              <RitualCard
                variant="icon-only"
                title="아침 햇살 산책"
                icon="sun"
                onClick={() => handleSafeClick(() => router.push("/player/RT-004"))}
              />

              <button
                type="button"
                onClick={() => handleSafeClick(() => router.push("/ritual"))}
                className="flex items-center justify-center w-[4rem] h-[4rem] rounded-2xl border-2 border-dashed border-gray-300 hover:border-[var(--color-brand-green)] bg-gray-50/50 hover:bg-emerald-50/40 text-gray-400 hover:text-[var(--color-brand-green)] shrink-0 transition-all active:scale-[0.96] group"
                title="리추얼 추가하기"
              >
                <Plus size={22} weight="bold" className="text-gray-400 group-hover:text-[var(--color-brand-green)] transition-colors" />
              </button>
            </motion.div>
          </div>

          {/* 5. 누적 마음 근력 캘린더 */}
          <CalendarGrid />

          {/* 6. 오늘의 루틴 3가지 섹션 */}
          <div className="flex flex-col gap-3 w-full">
            <div className="flex items-center justify-between px-0.5">
              <h3 className="text-base font-black text-gray-900 tracking-tight">오늘의 루틴 3가지</h3>
              <span className="text-xs font-bold text-[#00C474] bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
                1 / 3 완료
              </span>
            </div>

            <div className="flex flex-col gap-2.5">
              <RitualCard
                variant="compact"
                title="오프먼트"
                dailyTime="하루 5분"
                level="쉬움"
                duration="화면 밖 5분"
                reward="✓ 완료"
                icon="smiley"
                selected={true}
                onClick={() => router.push("/player/RT-001")}
              />

              <RitualCard
                variant="compact"
                title="한 칸 완벽주의"
                dailyTime="하루 3분"
                level="서랍 정돈"
                duration="가볍게 정리"
                reward="3분"
                icon="notebook"
                selected={false}
                onClick={() => router.push("/player/RT-012")}
              />

              <RitualCard
                variant="compact"
                title="빈손산책"
                dailyTime="하루 10분"
                level="산책"
                duration="폰 없이 천천히"
                reward="10분"
                icon="sun"
                selected={false}
                onClick={() => router.push("/player/RT-004")}
              />
            </div>
          </div>

          {/* 7. 아티클 매거진 스팟라이트 카드 */}
          <SpotlightCard
            spotlightColor="rgba(0, 196, 116, 0.12)"
            className="w-full bg-white p-5 rounded-3xl border border-gray-200/90 hover:border-[var(--color-brand-green)] transition-all shadow-xs flex flex-col gap-3 relative overflow-hidden"
          >
            <div className="flex items-center justify-between z-10">
              <div className="flex items-center gap-1.5 text-gray-900">
                <BookOpen size={18} weight="bold" className="text-[var(--color-brand-green)]" />
                <span className="text-xs font-black tracking-tight text-gray-900">지금 나에게 맞는 이야기</span>
              </div>
              <span className="text-[11px] font-bold text-gray-500 bg-gray-50 px-2.5 py-0.5 rounded-full border border-gray-200/80">
                3분 아티클
              </span>
            </div>

            <div className="flex flex-col gap-1 z-10 text-left">
              <h4 className="text-base font-black text-gray-900 leading-snug tracking-tight">
                "번아웃 시대, 나를 다독이는 자기자비의 기술"
              </h4>
              <p className="text-xs font-normal text-gray-500 leading-relaxed">
                남에게는 한없이 친절하면서 왜 나에게는 엄격할까요? 내 안의 다정한 변호인을 깨우는 심리학 이야기.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsMagazineOpen(true)}
              className="w-full py-2.5 bg-gray-900 hover:bg-[var(--color-brand-green)] text-white rounded-2xl font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs active:scale-[0.97] z-10 mt-1"
            >
              <BookBookmark size={16} weight="bold" />
              <span>이야기 읽어보기</span>
            </button>
          </SpotlightCard>
        </div>

        {/* 8. 하단 고정 바로가기 앱 바 (텍스트 라벨 포함) */}
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white/95 backdrop-blur-md border-t border-gray-100 px-6 py-2.5 flex items-center justify-between z-40 shadow-lg">
          <button
            type="button"
            onClick={() => {
              setActiveTab("home");
              router.push("/dashboard");
            }}
            className={`flex flex-col items-center gap-1 transition-colors ${
              activeTab === "home" ? "text-[var(--color-brand-green)]" : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <House size={22} weight={activeTab === "home" ? "fill" : "regular"} />
            <span className="text-[11px] font-bold">홈</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab("ritual");
              router.push("/ritual");
            }}
            className={`flex flex-col items-center gap-1 transition-colors ${
              activeTab === "ritual" ? "text-[var(--color-brand-green)]" : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <Barbell size={22} weight={activeTab === "ritual" ? "fill" : "regular"} />
            <span className="text-[11px] font-bold">리추얼</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab("magazine");
              router.push("/magazine");
            }}
            className={`flex flex-col items-center gap-1 transition-colors ${
              activeTab === "magazine" ? "text-[var(--color-brand-green)]" : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <BookOpen size={22} weight={activeTab === "magazine" ? "fill" : "regular"} />
            <span className="text-[11px] font-bold">매거진</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab("my");
              router.push("/report");
            }}
            className={`flex flex-col items-center gap-1 transition-colors ${
              activeTab === "my" ? "text-[var(--color-brand-green)]" : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <User size={22} weight={activeTab === "my" ? "fill" : "regular"} />
            <span className="text-[11px] font-bold">분석리포트</span>
          </button>
        </nav>

        {/* 모달 연동 */}
        <MorningCheckinDrawer isOpen={isMorningOpen} onClose={() => setIsMorningOpen(false)} />
        <EveningCheckinDrawer isOpen={isEveningOpen} onClose={() => setIsEveningOpen(false)} />
        <GoldenGardenModal isOpen={isGoldenOpen} onClose={() => setIsGoldenOpen(false)} />
        <MagazineViewerModal
          magazine={isMagazineOpen ? magazinesData[0] || null : null}
          onClose={() => setIsMagazineOpen(false)}
        />
      </div>
    </main>
  );
}

export default function DashboardFlatV4Page() {
  return (
    <Suspense fallback={<div className="p-5 pt-16 flex items-center justify-center min-h-screen text-gray-400">대시보드 V4 불러오는 중...</div>}>
      <DashboardFlatV4Content />
    </Suspense>
  );
}
