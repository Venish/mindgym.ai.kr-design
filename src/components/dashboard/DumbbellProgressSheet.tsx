"use client";

import React, { useState } from "react";
import {
  CheckCircle,
  Lock,
  Sparkle,
  Trophy,
  Lightning,
  BookOpen,
  CalendarCheck,
  Barbell,
} from "@phosphor-icons/react";
import { SubPageHeader } from "@/components/ui/SubPageHeader";
import { AnimatedDumbbell } from "@/components/animated-icons/AnimatedDumbbell";
import { useMindGym } from "@/context/MindGymContext";
import { useModalStore } from "@/store/useModalStore";

interface DumbbellLevelItem {
  level: number;
  variant: "wood" | "stone" | "iron" | "bronze" | "silver" | "gold";
  name: string;
  minDumbbells: number;
  maxDumbbells: number;
  desc: string;
}

const DUMBBELL_LEVELS: DumbbellLevelItem[] = [
  { level: 1, variant: "wood", name: "나무 덤벨", minDumbbells: 0, maxDumbbells: 149, desc: "마음을 돌보는 기초가 쌓이고 있어요" },
  { level: 2, variant: "stone", name: "돌 덤벨", minDumbbells: 150, maxDumbbells: 299, desc: "나를 붙잡는 힘이 생기고 있어요" },
  { level: 3, variant: "iron", name: "철 덤벨", minDumbbells: 300, maxDumbbells: 499, desc: "내 루틴이 조금씩 자리잡고 있어요" },
  { level: 4, variant: "bronze", name: "동 덤벨", minDumbbells: 500, maxDumbbells: 799, desc: "회복력이 점점 커지고 있어요" },
  { level: 5, variant: "silver", name: "은 덤벨", minDumbbells: 800, maxDumbbells: 1199, desc: "마음건강 루틴이 단단해지고 있어요" },
  { level: 6, variant: "gold", name: "금 덤벨", minDumbbells: 1200, maxDumbbells: 1799, desc: "마음을 지키는 힘이 자리잡았어요" },
];

/**
 * DumbbellProgressSheet: 밑에서 위로 슬라이딩 업(slide-up)되는 마음 근력 덤벨 성장의 길 전용 모달
 * - 기본 덤벨 등급: 금 덤벨 (Gold)
 */
export function DumbbellProgressSheet() {
  const { closeModal } = useModalStore();
  const { userName, totalDumbbells } = useMindGym();
  const currentCardRef = React.useRef<HTMLDivElement>(null);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  // 로딩 시 프로그레스 바 차오름 애니메이션 상태
  const [isProgressAnimated, setIsProgressAnimated] = React.useState(false);

  // 마우스 드래그 스와이프 상태
  const isDraggingRef = React.useRef(false);
  const startXRef = React.useRef(0);
  const scrollLeftRef = React.useRef(0);

  // 기본 수치: 금 덤벨 기준 (1,250 DB)
  const displayDumbbells = totalDumbbells > 0 ? totalDumbbells : 1250;
  const currentLevelNum = 6; // 금 덤벨
  const currentLevelName = "금 덤벨";
  const nextTarget = 1800; // 플래티넘 덤벨 기준
  const remaining = Math.max(0, nextTarget - displayDumbbells);
  const progressPercent = Math.min(100, Math.round((displayDumbbells / nextTarget) * 100));

  // 마운트 시 프로그레스 차오름 & 착용 중인 덤벨 카드로 자동 중앙 스크롤 포커스!
  React.useEffect(() => {
    const animTimer = setTimeout(() => {
      setIsProgressAnimated(true);
    }, 200);

    const timer = setTimeout(() => {
      currentCardRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }, 250);

    return () => {
      clearTimeout(animTimer);
      clearTimeout(timer);
    };
  }, []);

  // 마우스 드래그 스와이핑 핸들러
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    if (scrollContainerRef.current) {
      startXRef.current = e.pageX - scrollContainerRef.current.offsetLeft;
      scrollLeftRef.current = scrollContainerRef.current.scrollLeft;
    }
  };

  const handleMouseLeave = () => {
    isDraggingRef.current = false;
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.8; // 스와이프 감도
    scrollContainerRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  return (
    <div className="w-full min-h-full bg-theme-app flex flex-col select-none relative pb-12 txt-brand-ink overflow-y-auto transition-colors duration-300">
      {/* 1. 서브 헤더 (✕ 닫기 터치 시 밑으로 슬라이딩 아웃) */}
      <SubPageHeader
        title="나의 마음덤벨"
        leftType="close"
        onLeftClick={closeModal}
      />

      <div className="flex flex-col w-full px-5 pt-3 gap-6 text-left max-w-lg mx-auto">
        {/* 2. 현재 덤벨 등급 키비주얼 메인 카드 (디자인 가이드 공통 금빛 카드 규격) */}
        <div className="w-full bg-theme-card border border-theme-card rounded-3xl p-5 txt-brand-ink flex flex-col items-center justify-center text-center relative shadow-2xs">
          <div className="mb-2.5">
            <span className="text-[11.5px] font-extrabold text-amber-900 dark:text-amber-300 bg-amber-100/90 dark:bg-amber-950/60 px-3 py-1 rounded-full border border-amber-300/60 dark:border-amber-700/60 inline-flex items-center gap-1.5 shadow-2xs">
              <Sparkle size={13} weight="fill" className="text-amber-500 animate-pulse" />
              Lv.{currentLevelNum} {currentLevelName} · <span className="font-black text-amber-700 dark:text-amber-400">마인드 리더</span>
            </span>
          </div>

          {/* 중앙 대형 골드 덤벨 순수 비주얼 (size=160 큼직하게 확대) */}
          <div className="my-3 py-2 flex items-center justify-center drop-shadow-xl scale-110">
            <AnimatedDumbbell level="gold" size={160} />
          </div>

          <h3 className="text-xl font-black txt-brand-ink tracking-tight mt-1">
            마음을 지키는 힘이 자리잡았어요
          </h3>
          <p className="text-xs font-semibold text-theme-muted mt-1 mb-3">
            마음건강 최고 덤벨 등급 달성! ✨
          </p>

          {/* 세그먼트 프로그레스 인디케이터 라인 바 (총 6개 세그먼트) */}
          <div className="w-full max-w-[220px] flex items-center gap-1.5 justify-center my-1">
            {[true, true, true, true, true, true].map((active, idx) => (
              <div
                key={idx}
                className={`h-2 flex-1 rounded-full transition-all duration-700 ease-out ${
                  isProgressAnimated && active
                    ? "bg-amber-500 shadow-2xs scale-100 opacity-100"
                    : "bg-theme-card-subtle opacity-50 scale-95"
                }`}
                style={{ transitionDelay: `${idx * 80}ms` }}
              />
            ))}
          </div>

          <div className="w-full flex justify-between items-center text-[11px] font-extrabold text-theme-muted mt-3 pt-2 border-t border-theme-subtle px-1">
            <span>현재 {displayDumbbells} DB</span>
            <span>최고 등급 달성</span>
          </div>
        </div>

        {/* 3. 7대 덤벨 등급 성장의 길 수평 스크롤 가로 카루셀 로드맵 */}
        <div className="w-full flex flex-col gap-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-base font-extrabold txt-brand-ink tracking-tight">
              덤벨 성장 단계
            </h3>
          </div>

          {/* 수평 스크롤 가로 트랙 (full-bleed 꽉 찬 마이너스 마진 -mx-5 px-5, 손 스와이프 느낌 극대화) */}
          <div
            ref={scrollContainerRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onWheel={(e) => {
              if (e.deltaY !== 0) {
                e.currentTarget.scrollLeft += e.deltaY;
              }
            }}
            className="-mx-5 px-5 w-[calc(100%+2.5rem)] flex items-stretch gap-3 overflow-x-auto touch-pan-x overscroll-x-contain py-2 select-none cursor-grab active:cursor-grabbing no-scrollbar"
          >
            {DUMBBELL_LEVELS.map((item) => {
              const isCurrent = item.level === currentLevelNum;
              const isAchieved = item.level < currentLevelNum;

              return (
                <div
                  key={item.level}
                  ref={isCurrent ? currentCardRef : null}
                  className={`min-w-[104px] max-w-[104px] rounded-2xl p-2.5 flex flex-col items-center justify-between text-center transition-all shrink-0 shadow-2xs ${
                    isCurrent
                      ? "bg-amber-50/90 dark:bg-amber-950/40 border-2 border-amber-400/90 shadow-xs ring-2 ring-amber-300/40"
                      : isAchieved
                      ? "bg-theme-card border border-theme-card"
                      : "bg-theme-card-subtle border border-theme-subtle opacity-60"
                  }`}
                >
                  <div className="w-full flex items-center justify-between mb-1">
                    <span className={`text-[9.5px] font-extrabold px-1.5 py-0.5 rounded-full ${
                      isCurrent
                        ? "bg-amber-500 text-white shadow-2xs"
                        : "bg-theme-card-subtle text-theme-muted"
                    }`}>
                      Lv.{item.level}
                    </span>

                    {isCurrent || isAchieved ? (
                      <CheckCircle size={14} weight="fill" className="text-[#00C474]" />
                    ) : (
                      <Lock size={13} weight="bold" className="text-theme-muted" />
                    )}
                  </div>

                  {/* 덤벨 아이콘 (size=54 큼직하게 확대) */}
                  <div className="my-1.5 py-0.5 flex items-center justify-center drop-shadow-xs">
                    <AnimatedDumbbell level={item.variant} size={54} />
                  </div>

                  <div className="flex flex-col items-center mt-0.5">
                    <h4 className="text-[12px] font-extrabold txt-brand-ink tracking-tight leading-tight">
                      {item.name}
                    </h4>
                    <span className="text-[9.5px] font-bold text-theme-muted mt-0.5">
                      {item.minDumbbells} DB ~
                    </span>
                  </div>

                  {isCurrent && (
                    <span className="text-[9px] font-black text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/70 px-1.5 py-0.5 rounded-full mt-1.5 border border-amber-200 dark:border-amber-800/60">
                      착용 중 🌟
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. 덤벨 모으기 안내 가이드 카드 (감싸기 외곽 박스 제거 & 서피스 4열 카드) */}
        <div className="w-full flex flex-col gap-3 px-1 text-left">
          <h3 className="text-base font-extrabold txt-brand-ink tracking-tight">
            덤벨 강화 기준
          </h3>

          <div className="grid grid-cols-2 gap-2.5 pt-0.5">
            <div className="bg-theme-card border border-theme-card rounded-2xl p-3.5 flex items-center gap-3 shadow-2xs">
              <div className="w-9 h-9 rounded-xl bg-theme-card-subtle text-theme-accent flex items-center justify-center shrink-0 shadow-2xs border border-theme-subtle">
                <Barbell size={20} weight="bold" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-extrabold text-theme-muted tracking-tight">리추얼 완수</span>
                <span className="text-xs font-extrabold text-theme-accent">+3 DB</span>
              </div>
            </div>

            <div className="bg-theme-card border border-theme-card rounded-2xl p-3.5 flex items-center gap-3 shadow-2xs">
              <div className="w-9 h-9 rounded-xl bg-theme-card-subtle text-amber-600 flex items-center justify-center shrink-0 shadow-2xs border border-theme-subtle">
                <BookOpen size={20} weight="bold" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-extrabold text-theme-muted tracking-tight">매거진 완독</span>
                <span className="text-xs font-extrabold text-amber-600">+10 DB</span>
              </div>
            </div>

            <div className="bg-theme-card border border-theme-card rounded-2xl p-3.5 flex items-center gap-3 shadow-2xs">
              <div className="w-9 h-9 rounded-xl bg-theme-card-subtle text-indigo-600 flex items-center justify-center shrink-0 shadow-2xs border border-theme-subtle">
                <Sparkle size={20} weight="bold" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-extrabold text-theme-muted tracking-tight">KOSS 직무진단</span>
                <span className="text-xs font-extrabold text-indigo-600">+5 DB</span>
              </div>
            </div>

            <div className="bg-theme-card border border-theme-card rounded-2xl p-3.5 flex items-center gap-3 shadow-2xs">
              <div className="w-9 h-9 rounded-xl bg-theme-card-subtle text-rose-600 flex items-center justify-center shrink-0 shadow-2xs border border-theme-subtle">
                <CalendarCheck size={20} weight="bold" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-extrabold text-theme-muted tracking-tight">30일 마스터</span>
                <span className="text-xs font-extrabold text-rose-600">+30 DB</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
