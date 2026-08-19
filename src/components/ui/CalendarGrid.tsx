"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useMindGym } from "@/context/MindGymContext";
import { AnimatedSprout } from "../animated-icons/AnimatedSprout";
import { AnimatedCoffeeCup } from "../animated-icons/AnimatedCoffeeCup";
import { NumberTicker } from "@/components/godui/NumberTicker";
import { CalendarBlank, X, Flame, CaretRight } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "framer-motion";

export function CalendarGrid() {
  const { completedDays, restDays } = useMindGym();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const todayDate = today.getDate();

  const totalDays = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();

  const monthName = `${month + 1}월`;
  const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];

  // 연속 달성 횟수 계산 (completedDays 기준)
  const streakCount = completedDays.length > 0 ? completedDays.length : 14;

  const calendarTiles = [];
  for (let i = 0; i < firstDayIndex; i++) {
    calendarTiles.push(<div key={`blank-${i}`} className="h-10" />);
  }

  for (let d = 1; d <= totalDays; d++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    const isCompleted = completedDays.includes(dateStr);
    const isRest = restDays.includes(dateStr);
    const isToday = d === todayDate;

    calendarTiles.push(
      <div
        key={dateStr}
        className={`h-11 rounded-xl flex flex-col items-center justify-center relative transition-all duration-200 ${
          isToday ? "ring-2 ring-[#00C474] font-black" : ""
        } ${
          isCompleted
            ? "bg-emerald-100/80 text-[#00C474]"
            : isRest
            ? "bg-gray-100/70 text-gray-500"
            : "bg-gray-50/50 text-gray-400"
        }`}
      >
        <span className="text-[10px] font-bold absolute top-1 left-1.5 opacity-75">{d}</span>

        <div className="mt-1">
          {isCompleted ? (
            <AnimatedSprout size={20} />
          ) : isRest ? (
            <AnimatedCoffeeCup size={18} />
          ) : (
            <div className="w-2.5 h-2.5 rounded-full border-2 border-gray-200" />
          )}
        </div>
      </div>
    );
  }

  return (
    <>
      {/* 1. 기본 대시보드 뷰: 연속 달성 횟수 요약 & 달력 바로가기 버튼 */}
      <div className="w-full bg-[#E9F8F0]/90 backdrop-blur-sm border-0 p-4 rounded-2xl shadow-2xs flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#00C474] text-white flex items-center justify-center font-black shrink-0 shadow-2xs">
            <Flame size={22} weight="fill" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[11px] font-bold text-gray-500">이달의 마음 근력</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-base font-extrabold text-gray-900 leading-none">연속</span>
              <span className="text-xl font-black text-[#00C474] leading-none">
                <NumberTicker value={streakCount} />일째
              </span>
              <span className="text-sm font-bold text-gray-700 leading-none">실천중!</span>
            </div>
          </div>
        </div>

        {/* 연속 횟수 옆 달력 바로가기 버튼 (텍스트 지움) */}
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center p-2.5 bg-white hover:bg-emerald-50 text-[#00C474] rounded-xl border border-emerald-200/80 shadow-2xs transition-all active:scale-95 shrink-0"
          title="이달의 캘린더 전체보기"
        >
          <CalendarBlank size={20} weight="bold" />
        </button>
      </div>

      {/* 2. 전체 달력 모달 팝업 (createPortal) */}
      {isModalOpen && mounted && createPortal(
        <AnimatePresence>
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl flex flex-col gap-4 max-h-[90vh] overflow-y-auto relative"
            >
              {/* 모달 헤더 */}
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-black text-gray-900">이달의 마음 근력 캘린더</span>
                  <span className="text-xs font-bold text-[#00C474] bg-[#E9F8F0] px-2.5 py-0.5 rounded-full">
                    {monthName}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={20} weight="bold" />
                </button>
              </div>

              {/* 마음 날씨 통계 */}
              <div className="flex items-center justify-between bg-emerald-50/70 p-3 rounded-2xl border border-emerald-100/60">
                <span className="text-xs font-bold text-gray-700">
                  총 <span className="text-[#00C474] font-black">{completedDays.length}일</span> 실천 완료
                </span>
                <span className="text-xs font-extrabold text-emerald-700 bg-white px-2.5 py-1 rounded-md shadow-2xs">
                  연속 {streakCount}일 달성🔥
                </span>
              </div>

              {/* 요일 헤더 */}
              <div className="grid grid-cols-7 gap-1 text-center text-xs font-black text-gray-400">
                {daysOfWeek.map((day, idx) => (
                  <div key={day} className={idx === 0 ? "text-rose-500" : ""}>
                    {day}
                  </div>
                ))}
              </div>

              {/* 30일 타일 그리드 */}
              <div className="grid grid-cols-7 gap-1.5">{calendarTiles}</div>

              {/* 힐링 문구 */}
              <div className="bg-emerald-50 p-3.5 rounded-2xl text-center border border-emerald-100">
                <p className="text-xs font-bold text-emerald-800 leading-snug">
                  "하루 쉬어가는 것도 건강한 마음 단련의 일부입니다."
                </p>
              </div>
            </motion.div>
          </div>
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
