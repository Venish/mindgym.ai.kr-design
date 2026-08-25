"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sparkle, CalendarBlank, Gear, PencilSimple, Coffee } from "@phosphor-icons/react";
import { AuroraText } from "@/components/godui/AuroraText";
import { AnimatedMorningSun } from "@/components/animated-icons/AnimatedMorningSun";
import { AnimatedEveningMoon } from "@/components/animated-icons/AnimatedEveningMoon";

import { useMindGym } from "@/context/MindGymContext";
import { getIconPath } from "@/utils/iconMap";
import { useModalStore } from "@/store/useModalStore";
import { CalendarSheet } from "@/components/dashboard/CalendarSheet";
import { TodayMindSelectionWizard } from "@/components/common/TodayMindSelectionWizard";
import { EveningReflectionWizard } from "@/components/common/EveningReflectionWizard";
import { RoutineSetupSheet } from "@/components/dashboard/RoutineSetupSheet";

interface ShowcaseHeroKvProps {
  userName?: string;
  morningEmotion?: string;
  todayQuote?: string;
  levelNum?: number;
  showAllDemoCards?: boolean;
}

/**
 * 2. ShowcaseHeroKv: 상단 키비주얼
 * "오늘의 마음, 차분함" + [오늘의 한 줄 다짐 메모] + "이번 주 마음 이정표"
 */
export function ShowcaseHeroKv({
  morningEmotion = "차분함",
  todayQuote = "오늘도 남 비교하지 말고 내 페이스대로 걷기",
  levelNum = 1,
}: ShowcaseHeroKvProps) {
  const router = useRouter();
  const { openModal } = useModalStore();
  const { userName: contextUserName, currentIntention } = useMindGym();

  const weekDays = [
    { label: "월", icon: getIconPath(1), isDone: true, isSkipped: false, isToday: false, isPast: true, title: "미소 명상", link: "/player/RT-001" },
    { label: "화", icon: null, isDone: false, isSkipped: true, isToday: false, isPast: true, title: "휴식 (건너뜀)", link: "/checkin" },
    { label: "수", icon: getIconPath(3), isDone: true, isSkipped: false, isToday: true, isPast: false, title: "마음 호흡 (오늘)", link: "/player/RT-003" },
    { label: "목", icon: null, isDone: false, isSkipped: false, isToday: false, isPast: false, title: "목요일", link: "/checkin" },
    { label: "금", icon: null, isDone: false, isSkipped: false, isToday: false, isPast: false, title: "금요일", link: "/checkin" },
    { label: "토", icon: null, isDone: false, isSkipped: false, isToday: false, isPast: false, title: "토요일", link: "/checkin" },
    { label: "일", icon: null, isDone: false, isSkipped: false, isToday: false, isPast: false, title: "일요일", link: "/checkin" },
  ];

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
      <div className="relative bg-gradient-to-b from-emerald-100/85 via-teal-50/65 to-emerald-50/45 rounded-3xl pt-4 px-5 pb-6 shadow-2xs transition-all duration-300 overflow-hidden flex flex-col items-center justify-center text-center gap-3 min-h-[220px]">
        {/* 메인 히어로 상단: 아침 & 저녁 루틴 팝업 활성화 칩 바 */}
        <div className="flex items-center justify-between w-full z-20">
          <div className="flex items-center gap-2">
            {/* 아침 루틴 팝업 버튼 -> 낮 체크인 (TodayMindSelectionWizard) 실행 */}
            <button
              type="button"
              onClick={() =>
                openModal({
                  type: "slide-left",
                  content: <TodayMindSelectionWizard />,
                })
              }
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 hover:bg-white text-emerald-950 border border-emerald-200/80 shadow-2xs transition-all active:scale-95 cursor-pointer text-xs font-bold"
              title="오늘의 마음가짐 선택 (낮 체크인)"
            >
              <AnimatedMorningSun size={18} />
              <span>아침 루틴</span>
              <span className="text-[10px] font-extrabold text-[#00C474] bg-emerald-50 px-1.5 py-0.5 rounded-md">07:00</span>
            </button>

            {/* 저녁 루틴 팝업 버튼 -> 밤 체크인 (EveningReflectionWizard) 실행 */}
            <button
              type="button"
              onClick={() =>
                openModal({
                  type: "slide-left",
                  content: <EveningReflectionWizard />,
                })
              }
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 hover:bg-white text-indigo-950 border border-indigo-200/80 shadow-2xs transition-all active:scale-95 cursor-pointer text-xs font-bold"
              title="오늘 저녁 회고 (밤 체크인)"
            >
              <AnimatedEveningMoon size={18} />
              <span>저녁 루틴</span>
              <span className="text-[10px] font-extrabold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded-md">23:00</span>
            </button>
          </div>

          {/* 전체 설정 톱니바퀴 */}
          <button
            type="button"
            onClick={() =>
              openModal({
                type: "slide-up",
                content: <RoutineSetupSheet />,
              })
            }
            className="p-1.5 rounded-full text-gray-500/80 hover:text-emerald-700 hover:bg-white/80 transition-all active:scale-95 outline-none cursor-pointer"
            title="아침 · 저녁 루틴 설정 (밑에서 위로 스르륵)"
          >
            <Gear size={19} weight="bold" />
          </button>
        </div>

        {/* 1. 오늘 마음 ('차분함' 영역 클릭 시 '오늘의 마음가짐 선택' 슬라이딩 위저드 모달 띄우기) */}
        <div
          onClick={() =>
            openModal({
              type: "slide-left",
              content: <TodayMindSelectionWizard />,
            })
          }
          className="relative z-10 flex flex-col items-center justify-center text-center gap-1.5 w-full py-0.5 mt-0.5 cursor-pointer group"
          title="오늘의 마음가짐 선택하기 (차분함)"
        >
          <h1 className="text-base font-semibold txt-brand-ink tracking-tight leading-snug text-center">
            <AuroraText className="font-extrabold inline-block">{contextUserName}</AuroraText>님의 오늘 마음,
          </h1>

          <div className={`text-3xl font-extrabold tracking-tight leading-none ${emotionColorClass} transition-colors duration-300 group-hover:scale-105 transition-transform my-1`}>
            {morningEmotion}
          </div>

          {/* 오늘 메모 */}
          <p className="text-[0.9375rem] font-bold text-emerald-950/80 tracking-tight leading-relaxed max-w-[95%] mx-auto mt-1 group-hover:text-emerald-900 transition-colors">
            {todayQuote}
          </p>
        </div>

        {/* 3. 이번 주 마음 이정표 (월~일 스탬프 칩은 클릭 비활성화, 우측 달력 아이콘만 클릭 허용) */}
        <div className="w-full flex flex-col items-center gap-2 z-10 mt-1.5 pt-1.5 pb-0.5">
          <div className="flex items-center justify-start w-full px-1">
            <span className="text-xs font-medium text-gray-500/90 tracking-tight">
              이번 주 마음 이정표
            </span>
          </div>

          <div className="flex items-center justify-center gap-1.5 w-full">
            {weekDays.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center justify-center text-center relative py-0.5 select-none cursor-default"
              >
                {item.isDone && item.icon ? (
                  <div className="w-9 h-9 rounded-full bg-white/95 shadow-2xs flex items-center justify-center shrink-0 p-1 border-0">
                    <img
                      src={item.icon}
                      alt={item.title}
                      className="w-7 h-7 object-contain drop-shadow-2xs"
                    />
                  </div>
                ) : item.isSkipped ? (
                  <div className="w-9 h-9 flex items-center justify-center shrink-0">
                    <Coffee size={22} weight="fill" className="text-gray-400/85" />
                  </div>
                ) : (
                  <div className="w-9 h-9 rounded-full bg-white/95 shadow-2xs flex items-center justify-center shrink-0 p-1 border-0">
                    <span className={`text-sm font-semibold leading-none ${
                      item.isDone ? "text-gray-700" : "text-gray-400/80"
                    }`}>
                      {item.label}
                    </span>
                  </div>
                )}

                {item.isToday && (
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00C474] absolute -bottom-1 shadow-2xs animate-pulse" />
                )}
              </div>
            ))}

            {/* 맨 우측 달력 버튼만 클릭 가능 -> 오른쪽에서 왼쪽으로 slide-left 모달 열림 */}
            <div className="flex flex-col items-center justify-center text-center relative py-0.5">
              <button
                type="button"
                onClick={() =>
                  openModal({
                    type: "slide-left",
                    content: <CalendarSheet />,
                  })
                }
                className="w-9 h-9 rounded-full bg-white/95 hover:bg-emerald-50/80 shadow-2xs flex items-center justify-center shrink-0 p-1 text-gray-600 hover:text-[#00C474] transition-all active:scale-95 border-0 outline-none cursor-pointer"
                title="전체 월간 달력 보기 (오른쪽에서 왼쪽으로 스르륵)"
              >
                <CalendarBlank size={18} weight="bold" className="text-[#00C474]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
