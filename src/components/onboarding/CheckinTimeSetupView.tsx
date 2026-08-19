"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "@phosphor-icons/react";
import { AuroraText } from "@/components/godui/AuroraText";
import { MagicButton } from "@/components/godui/MagicButton";
import { GodTimePicker } from "@/components/godui/GodTimePicker";
import { AnimatedArrowRightIcon } from "@/components/animated-icons/AnimatedArrowRightIcon";

interface CheckinTimeSetupViewProps {
  morningTime: string;
  eveningTime: string;
  onSelectMorningTime: (t: string) => void;
  onSelectEveningTime: (t: string) => void;
  onComplete: () => void;
}

export function CheckinTimeSetupView({
  morningTime,
  eveningTime,
  onSelectMorningTime,
  onSelectEveningTime,
  onComplete,
}: CheckinTimeSetupViewProps) {
  const [isMorningEnabled, setIsMorningEnabled] = React.useState(true);
  const [isEveningEnabled, setIsEveningEnabled] = React.useState(true);

  const wakeUpOptions = [
    "05:00", "05:30", "06:00", "06:30", "07:00", "07:30",
    "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00"
  ];
  const sleepOptions = [
    "20:00", "20:30", "21:00", "21:30", "22:00", "22:30",
    "23:00", "23:30", "00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00", "03:30", "04:00"
  ];

  return (
    <motion.div
      key="checkin_time_setup"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="flex-1 flex flex-col justify-between my-auto z-10 pt-4 pb-4 gap-6 text-left"
    >
      <div className="flex flex-col gap-5 pt-2">
        <div className="flex flex-col gap-1.5 shrink-0 pt-2 text-center">
          {/* 상단 태그 뱃지 */}
          <div className="flex justify-center items-center gap-2">
            <span className="text-xs font-bold text-[#00C474] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/60">
              거의 다 왔어요 · 마지막 단계
            </span>
          </div>

          {/* 메인 타이틀 */}
          <h1 className="text-2xl font-black text-gray-900 tracking-tight text-center mt-1">
            언제 체크인 알림을 받을까요?
          </h1>

          {/* 서브 타이틀 */}
          <div className="flex items-center justify-center gap-3 mt-1.5 mb-4">
            <div className="h-[1px] w-5 bg-gradient-to-r from-transparent to-gray-300" />
            <span className="text-xs font-semibold text-gray-500 tracking-tight">
              정해진 시간에 알림을 드려요 · 언제든 환경설정에서 변경 가능해요
            </span>
            <div className="h-[1px] w-5 bg-gradient-to-l from-transparent to-gray-300" />
          </div>
        </div>

        {/* 일어나는 시간 설정 카드 */}
        <div className="p-4 bg-[#F8FAF9] rounded-2xl flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Sun size={24} weight="fill" className="text-amber-500 shrink-0" />
              <span className="text-base font-bold text-gray-900">일어나는 시간</span>
            </div>

            <button
              type="button"
              onClick={() => setIsMorningEnabled(!isMorningEnabled)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                isMorningEnabled ? "bg-[#00C474]" : "bg-gray-300"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  isMorningEnabled ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          <div className={isMorningEnabled ? "opacity-100 transition-opacity" : "opacity-40 pointer-events-none transition-opacity"}>
            <GodTimePicker
              value={morningTime}
              onChange={(t) => onSelectMorningTime(t)}
              disabled={!isMorningEnabled}
            />
          </div>
        </div>

        {/* 자는 시간 설정 카드 */}
        <div className="p-4 bg-[#F8FAF9] rounded-2xl flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Moon size={24} weight="fill" className="text-indigo-500 shrink-0" />
              <span className="text-base font-bold text-gray-900">자는 시간</span>
            </div>

            <button
              type="button"
              onClick={() => setIsEveningEnabled(!isEveningEnabled)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                isEveningEnabled ? "bg-[#00C474]" : "bg-gray-300"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-[#00C474] shadow ring-0 transition duration-200 ease-in-out ${
                  isEveningEnabled ? "translate-x-5 bg-white" : "translate-x-0 bg-white"
                }`}
              />
            </button>
          </div>

          <div className={isEveningEnabled ? "opacity-100 transition-opacity" : "opacity-40 pointer-events-none transition-opacity"}>
            <GodTimePicker
              value={eveningTime}
              onChange={(t) => onSelectEveningTime(t)}
              disabled={!isEveningEnabled}
            />
          </div>
        </div>
      </div>

      {/* 3. 하단 탐색 버튼 그룹 & 다음에 하기 고스트 버튼 */}
      <div className="flex flex-col gap-2 mt-auto pt-2 shrink-0">
        <div className="flex gap-2.5">
          <MagicButton onClick={onComplete} className="flex-1 py-4" rightIcon={<AnimatedArrowRightIcon size={18} />}>
            <span className="text-sm font-bold">다음 단계로 (이달의 나 설정)</span>
          </MagicButton>
        </div>

        {/* 메인 CTA 버튼과 X축 위치 1:1 완벽 수평 정렬 */}
        <div className="flex gap-2.5">
          <MagicButton
            onClick={onComplete}
            variant="ghost"
            className="flex-1 text-gray-400 hover:text-gray-600 font-medium py-3 text-sm"
          >
            <span>다음에 하기</span>
          </MagicButton>
        </div>
      </div>
    </motion.div>
  );
}
