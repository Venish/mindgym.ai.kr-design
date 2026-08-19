"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkle, Play, Sun, Moon, Info, Barbell, Compass, Plus, Check, CaretRight, BookOpen, BookBookmark } from "@phosphor-icons/react";
import { AuroraText } from "@/components/godui/AuroraText";
import { NeumorphCard } from "@/components/godui/NeumorphCard";
import { SpotlightCard } from "@/components/godui/SpotlightCard";
import { NumberTicker } from "@/components/godui/NumberTicker";
import { AnimatedTooltip } from "@/components/godui/AnimatedTooltip";
import { MorphingDialog } from "@/components/godui/MorphingDialog";
import { RitualCard } from "@/components/common/RitualCard";
import { DumbbellProgressBar } from "@/components/ui/DumbbellProgressBar";
import { CalendarGrid } from "@/components/ui/CalendarGrid";
import { useMindGym } from "@/context/MindGymContext";
import { AnimatedMorningSun } from "@/components/animated-icons/AnimatedMorningSun";
import { MorningCheckinDrawer } from "@/components/modals/MorningCheckinDrawer";
import { EveningCheckinDrawer } from "@/components/modals/EveningCheckinDrawer";
import { GoldenGardenModal } from "@/components/modals/GoldenGardenModal";
import { MagazineViewerModal } from "@/components/modals/MagazineViewerModal";
import { magazinesData } from "@/data/magazines";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function DashboardContent() {
  const { userName, completedDays } = useMindGym();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isMorningOpen, setIsMorningOpen] = useState(false);
  const [isEveningOpen, setIsEveningOpen] = useState(false);
  const [isGoldenOpen, setIsGoldenOpen] = useState(false);
  const [isMagazineOpen, setIsMagazineOpen] = useState(false);

  // 드래그 후 마우스 뗐을 때 클릭 이벤트 오작동 방지 ref
  const isDraggingRef = React.useRef(false);

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

    // URL parameter가 명시적으로 지정되었을 때만 팝업 slide-up (기본 /dashboard 접근 시 팝업 안 나옴)
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
    <div className="flex-1 flex flex-col gap-5 p-5 pt-16 relative">
      {/* 웰컴 상단 영역 */}
      <div className="flex flex-col gap-3.5 relative z-10 pt-2 pb-1">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold text-gray-500 tracking-tight">
              8월 1일 토요일
            </p>
            <h2 className="text-2xl font-black text-gray-900 leading-tight mt-1">
              <span className="text-[#00C474]">{userName || "보노보노"}</span>님, 오늘 하루도 <br />
              함께해요
            </h2>
          </div>

          <div className="shrink-0 p-1">
            <AnimatedMorningSun size={52} />
          </div>
        </div>

        {/* 가로로 길게 확장된 [이달의 나] 뱃지 카드 (수평 밸런스 정돈) */}
        <div className="w-full flex items-center justify-between bg-emerald-50/70 border border-emerald-100/80 p-4 rounded-2xl shadow-2xs gap-3">
          {/* 좌측: 이달의 나 지향점 & 실천일 */}
          <div className="flex flex-col gap-0.5 flex-1 text-left">
            <span className="text-xs font-bold text-emerald-800 tracking-tight flex items-center gap-1">
              <Sparkle size={12} weight="fill" className="text-[#00C474]" />
              이달의 나
            </span>
            <span className="text-lg font-black text-gray-900 tracking-tight">
              차분한 <span className="text-[var(--color-brand-green)]">8월</span> · <span className="text-[var(--color-brand-green)] tabular-nums">14일</span>째
            </span>
          </div>

          {/* 우측: 정갈하게 연동된 시그니처 덤벨 뱃지 */}
          <div className="flex items-center gap-1.5 bg-white border border-emerald-200/80 px-3 py-2 rounded-xl shrink-0 shadow-2xs">
            <Barbell size={20} weight="fill" className="text-[#00C474]" />
            <span className="text-xs font-mono font-black text-gray-900">Lv.2</span>
          </div>
        </div>
      </div>

      {/* Framer Motion 물리 엔진 기반 내가 추가한 이달의 리추얼 드래그 칩 바 (드래그 클릭 오작동 완벽 방어) */}
      <div className="-mx-5 px-5 overflow-hidden py-1.5 cursor-grab active:cursor-grabbing">
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
          {/* 맨 왼쪽: 나의 여정을 나타내는 나침반 아이콘 (규격 64x64 -> 4remx4rem) */}
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

          {/* 맨 오른쪽: 아직 비어있는 슬롯을 표시하는 플러스 빈 슬롯 박스 (규격 64x64 -> 4remx4rem) */}
          <button
            type="button"
            onClick={() => handleSafeClick(() => router.push("/ritual"))}
            className="flex items-center justify-center w-[4rem] h-[4rem] rounded-2xl border-2 border-dashed border-gray-300 hover:border-[var(--color-brand-green)] bg-gray-50/50 hover:bg-emerald-50/40 text-gray-400 hover:text-[var(--color-brand-green)] shrink-0 transition-all active:scale-[0.96] group"
            title="리추얼 추가하기 (빈 슬롯)"
          >
            <Plus size={22} weight="bold" className="text-gray-400 group-hover:text-[var(--color-brand-green)] transition-colors" />
          </button>
        </motion.div>
      </div>

      {/* 이달의 마음 근력 캘린더 (NumberTicker 롤링 카운터 연결) */}
      <CalendarGrid />

      {/* 오늘의 루틴 3가지 섹션 (타이포 위계 및 여백 정돈) */}
      <div className="flex flex-col gap-3 w-full">
        {/* 상단 헤더: 타이틀 & 진행률 */}
        <div className="flex items-center justify-between px-0.5">
          <h3 className="text-base font-black text-gray-900 tracking-tight">오늘의 루틴 3가지</h3>
          <span className="text-xs font-bold text-[#00C474] bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
            1 / 3 완료
          </span>
        </div>

        {/* 한 줄 리스트 형태 (variant="compact") 공통 RitualCard 목록 */}
        <div className="flex flex-col gap-2.5">
          {/* 1. 오프먼트 (완료됨) */}
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

          {/* 2. 한 칸 완벽주의 */}
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

          {/* 3. 빈손산책 */}
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

      {/* 지금 나에게 맞는 이야기 섹션 (SpotlightCard 적용 및 가독성 정돈) */}
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
          className="w-full py-2.5 bg-gray-900 hover:bg-[var(--color-brand-green)] text-white rounded-2xl font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs btn-press-scale z-10 mt-1"
        >
          <BookBookmark size={16} weight="bold" />
          <span>이야기 읽어보기</span>
        </button>
      </SpotlightCard>

      {/* 모달 렌더링 */}
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
