"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
 * "오늘의 마음, 차분함" + "이번 주 마음 이정표"
 */
export function ShowcaseHeroKv({
  userName = "보노보노",
  morningEmotion = "차분함",
  levelNum = 1,
  showAllDemoCards = false,
}: ShowcaseHeroKvProps) {
  const router = useRouter();

  const weekDays = [
    { label: "월", icon: "/images/icons/1.png", isDone: true, isToday: false, isPast: true, title: "미소 명상", link: "/player/RT-001" },
    { label: "화", icon: null, isDone: false, isToday: false, isPast: true, title: "화요일 (못함)", link: "/checkin" },
    { label: "수", icon: "/images/icons/3.png", isDone: true, isToday: true, isPast: false, title: "마음 호흡 (오늘)", link: "/player/RT-003" },
    { label: "목", icon: null, isDone: false, isToday: false, isPast: false, title: "목요일", link: "/checkin" },
    { label: "금", icon: null, isDone: false, isToday: false, isPast: false, title: "금요일", link: "/checkin" },
    { label: "토", icon: null, isDone: false, isToday: false, isPast: false, title: "토요일", link: "/checkin" },
    { label: "일", icon: null, isDone: false, isToday: false, isPast: false, title: "일요일", link: "/checkin" },
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
      <div className="relative bg-gradient-to-b from-emerald-100/70 via-teal-50/40 to-emerald-50/30 rounded-2xl pt-5 px-5 pb-3 shadow-2xs transition-all duration-300 overflow-hidden flex flex-col items-center justify-center text-center gap-2">
        {/* 톱니바퀴 -> /settings */}
        <Link
          href="/settings"
          className="absolute top-1.5 right-1.5 z-20 p-1.5 rounded-full text-gray-400/60 hover:text-emerald-700 hover:bg-emerald-100/50 transition-all active:scale-95 outline-none"
          title="나의 여정 모드 설정"
        >
          <Gear size={19} weight="bold" className="text-gray-400/60 hover:text-emerald-700 transition-colors" />
        </Link>

        {/* 오늘 마음 구역 -> /checkin */}
        <div
          onClick={() => router.push("/checkin")}
          className="relative z-10 flex flex-col items-center justify-center text-center gap-2 w-full py-1 mt-0.5 cursor-pointer group"
        >
          <h1 className="text-lg font-semibold txt-brand-ink tracking-tight leading-snug text-center">
            <AuroraText className="font-extrabold inline-block">{userName}</AuroraText>님의 오늘 마음,
          </h1>

          <div className={`text-3xl font-bold tracking-tight leading-none ${emotionColorClass} transition-colors duration-300 group-hover:scale-105 transition-transform`}>
            "{morningEmotion}"
          </div>
        </div>

        <div className="w-full flex flex-col items-center gap-2 z-10 mt-3.5 pt-2 pb-0.5">
          <div className="flex items-center justify-between w-full px-1">
            <span className="text-xs font-medium text-gray-500/90 tracking-tight">
              이번 주 마음 이정표
            </span>
            <button
              onClick={() => router.push("/calendar")}
              className="text-[11px] font-bold text-[#00C474] hover:underline"
            >
              전체보기
            </button>
          </div>

          <div className="flex items-center justify-center gap-1.5 w-full">
            {weekDays.map((item, idx) => (
              <div
                key={idx}
                onClick={() => router.push(item.link)}
                className="flex flex-col items-center justify-center text-center relative py-0.5 cursor-pointer group"
              >
                <div className="w-9 h-9 rounded-full bg-white/95 group-hover:bg-emerald-50 shadow-2xs flex items-center justify-center shrink-0 p-1 border-0 transition-transform active:scale-95">
                  {item.isDone && item.icon ? (
                    <img
                      src={item.icon}
                      alt={item.title}
                      className="w-7 h-7 object-contain drop-shadow-2xs"
                    />
                  ) : (
                    <span className={`text-sm font-semibold leading-none ${
                      item.isPast ? "text-gray-400/80" : "text-gray-700"
                    }`}>
                      {item.label}
                    </span>
                  )}
                </div>

                {item.isToday && (
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00C474] absolute -bottom-1 shadow-2xs animate-pulse" />
                )}
              </div>
            ))}

            <div className="flex flex-col items-center justify-center text-center relative py-0.5">
              <button
                type="button"
                onClick={() => router.push("/calendar")}
                className="w-9 h-9 rounded-full bg-white/95 hover:bg-emerald-50/80 shadow-2xs flex items-center justify-center shrink-0 p-1 text-gray-600 hover:text-[#00C474] transition-all active:scale-95 border-0 outline-none"
                title="전체 월간 달력 보기"
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
