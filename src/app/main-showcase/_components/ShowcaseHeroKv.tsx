"use client";

import React from "react";
import Link from "next/link";
import { Sparkle, CalendarBlank, Gear } from "@phosphor-icons/react";
import { AuroraText } from "@/components/godui/AuroraText";
import { AnimatedMorningSun } from "@/components/animated-icons/AnimatedMorningSun";
import { AnimatedEveningMoon } from "@/components/animated-icons/AnimatedEveningMoon";

interface ShowcaseHeroKvProps {
  userName?: string;
  morningEmotion?: string;
  levelNum?: number;
  showAllDemoCards?: boolean;
}

/**
 * 2. ShowcaseHeroKv: 상단 키비주얼
 * "오늘의 마음, 차분함" + "이번 주 마음 이정표 (지나갔지만 못한 화요일만 회색 text-gray-400/80 표기)"
 */
export function ShowcaseHeroKv({
  userName = "보노보노",
  morningEmotion = "차분함",
  levelNum = 1,
  showAllDemoCards = false,
}: ShowcaseHeroKvProps) {
  // 오늘 = 수요일 기준 주간 7일 이정표 데이터
  // isPast: true (지나간 날), isDone: false (못한 날 -> 화요일만 회색)
  const weekDays = [
    { label: "월", icon: "/images/icons/1.png", isDone: true, isToday: false, isPast: true, title: "미소 명상" },
    { label: "화", icon: null, isDone: false, isToday: false, isPast: true, title: "화요일 (못함)" },
    { label: "수", icon: "/images/icons/3.png", isDone: true, isToday: true, isPast: false, title: "마음 호흡 (오늘)" },
    { label: "목", icon: null, isDone: false, isToday: false, isPast: false, title: "목요일" },
    { label: "금", icon: null, isDone: false, isToday: false, isPast: false, title: "금요일" },
    { label: "토", icon: null, isDone: false, isToday: false, isPast: false, title: "토요일" },
    { label: "일", icon: null, isDone: false, isToday: false, isPast: false, title: "일요일" },
  ];

  // 레벨 및 감정 키워드에 따른 동적 컬러 클래스 매핑
  const getDynamicEmotionColor = (emotion: string, level: number) => {
    if (emotion === "차분함") return "txt-brand-ink";
    if (emotion === "상쾌함") return "text-emerald-700";
    if (emotion === "설렘") return "text-amber-700";
    if (emotion === "불안함") return "text-indigo-700";
    
    const levelColors = [
      "txt-brand-ink",
      "text-emerald-800",
      "text-amber-800",
      "text-indigo-800",
      "text-teal-800",
      "text-rose-800",
      "text-purple-800",
    ];
    return levelColors[(level - 1) % levelColors.length];
  };

  const emotionColorClass = getDynamicEmotionColor(morningEmotion, levelNum);

  return (
    <div className="flex flex-col gap-2.5 w-full">
      {/* =========================================================================
          1. [최상단 기본 히어로 카드] 지나갔지만 못한 화요일만 회색 text-gray-400/80 표기
         ========================================================================= */}
      <div className="relative bg-gradient-to-b from-emerald-100/70 via-teal-50/40 to-emerald-50/30 rounded-2xl pt-5 px-5 pb-3 shadow-2xs transition-all duration-300 overflow-hidden flex flex-col items-center justify-center text-center gap-2">
        
        {/* 우측 최상단 톱니바퀴 설정 아이콘 버튼 */}
        <Link
          href="/onboarding?mode=monthly_start"
          className="absolute top-1.5 right-1.5 z-20 p-1.5 rounded-full text-gray-400/60 hover:text-emerald-700 hover:bg-emerald-100/50 transition-all active:scale-95 outline-none"
          title="나의 여정 모드 설정"
        >
          <Gear size={19} weight="bold" className="text-gray-400/60 hover:text-emerald-700 transition-colors" />
        </Link>

        {/* A. Hero 상단: "보노보노님의 오늘 마음, 차분함" */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center gap-2 w-full py-1 mt-0.5">
          <h1 className="text-lg font-semibold txt-brand-ink tracking-tight leading-snug text-center">
            <AuroraText className="font-extrabold inline-block">{userName}</AuroraText>님의 오늘 마음,
          </h1>

          <div className={`text-3xl font-bold tracking-tight leading-none ${emotionColorClass} transition-colors duration-300`}>
            "{morningEmotion}"
          </div>
        </div>

        {/* B. Hero 내부 하단: 이번 주 마음 이정표 (지나갔는데 못한 화요일만 회색) */}
        <div className="w-full flex flex-col items-center gap-2 z-10 mt-3.5 pt-2 pb-0.5">
          <div className="flex items-center justify-center w-full px-1">
            <span className="text-xs font-medium text-gray-500/90 tracking-tight">
              이번 주 마음 이정표
            </span>
          </div>

          {/* 7일간의 스탬프 + 8번째 달력 서클 칩 */}
          <div className="flex items-center justify-center gap-1.5 w-full">
            {weekDays.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center justify-center text-center relative py-0.5"
              >
                {/* border-0 무경계 w-9 h-9 정원 원 박스 */}
                <div className="w-9 h-9 rounded-full bg-white/95 shadow-2xs flex items-center justify-center shrink-0 p-1 border-0">
                  {item.isDone && item.icon ? (
                    /* 실천 완료한 날 (월, 수): 3D 리추얼 아이콘 */
                    <img
                      src={item.icon}
                      alt={item.title}
                      className="w-7 h-7 object-contain drop-shadow-2xs"
                    />
                  ) : (
                    /* 미실천 요일 글자: 지나갔지만 못한 날(화)만 회색, 미래 요일(목~일)은 text-gray-700 */
                    <span className={`text-sm font-semibold leading-none ${
                      item.isPast ? "text-gray-400/80" : "text-gray-700"
                    }`}>
                      {item.label}
                    </span>
                  )}
                </div>

                {/* 수요일(오늘) 밑에 미니 그린 점(Dot) 인디케이터 */}
                {item.isToday && (
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00C474] absolute -bottom-1 shadow-2xs animate-pulse" />
                )}
              </div>
            ))}

            {/* 일요일('일') 칩 바로 우측 옆: border-0 무경계 달력 아이콘 서클 칩 */}
            <div className="flex flex-col items-center justify-center text-center relative py-0.5">
              <button
                type="button"
                className="w-9 h-9 rounded-full bg-white/95 hover:bg-emerald-50/80 shadow-2xs flex items-center justify-center shrink-0 p-1 text-gray-600 hover:text-[#00C474] transition-all active:scale-95 border-0 outline-none"
                title="전체 월간 달력 보기"
              >
                <CalendarBlank size={18} weight="bold" className="text-[#00C474]" />
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* =========================================================================
          [숨김 처리 옵션] showAllDemoCards=true 일 때만 표시
         ========================================================================= */}
      {showAllDemoCards && (
        <>
          {/* 아침 루틴 미완료 독려 배너 */}
          <div className="relative bg-gradient-to-b from-amber-100/70 via-amber-50/40 to-amber-50/30 rounded-2xl p-6 shadow-2xs transition-all duration-300 overflow-hidden flex flex-col justify-between">
            <div className="relative z-10 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-extrabold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-2xs bg-amber-200/60 text-amber-900">
                  <Sparkle size={13} weight="fill" />
                  <span>☀️ AM CHECK-IN · 아침 루틴</span>
                </span>
                <AnimatedMorningSun className="w-10 h-10 shrink-0" />
              </div>

              <div className="flex flex-col gap-2 my-1">
                <h1 className="text-xl font-black txt-brand-ink tracking-tight leading-snug">
                  <span className="text-amber-800 font-black">{userName}</span>님, 오늘 아침 <br />
                  <span className="txt-brand-ink font-black">나를 다독이는 첫 걸음 🌅</span>
                </h1>
                <p className="text-xs text-gray-600 font-medium leading-relaxed">
                  오늘 하루 나를 채울 아침 감정을 선택해보세요.
                </p>
              </div>
            </div>
          </div>

          {/* 저녁 루틴 미완료 독려 배너 */}
          <div className="relative bg-gradient-to-b from-indigo-100/70 via-purple-50/40 to-indigo-50/30 rounded-2xl p-6 shadow-2xs transition-all duration-300 overflow-hidden flex flex-col justify-between">
            <div className="relative z-10 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-extrabold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-2xs bg-indigo-200/60 text-indigo-900">
                  <Sparkle size={13} weight="fill" />
                  <span>🌙 PM CHECK-IN · 저녁 하루 회고</span>
                </span>
                <AnimatedEveningMoon className="w-10 h-10 shrink-0" />
              </div>

              <div className="flex flex-col gap-2 my-1">
                <h1 className="text-xl font-black txt-brand-ink tracking-tight leading-snug">
                  <span className="text-[#00C474] font-black">{userName}</span>님, 오늘 하루 <br />
                  <span className="txt-brand-ink font-black">바라던 하루가 되었나요? 🌙</span>
                </h1>
                <p className="text-xs text-gray-600 font-medium leading-relaxed">
                  오늘 아침의 다짐을 돌아보며 다정한 쉼표를 전해보세요.
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
