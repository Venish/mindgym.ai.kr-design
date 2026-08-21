"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CaretDown, Clock, Check } from "@phosphor-icons/react";

interface GodTimePickerProps {
  value: string; // 예: "07:00" 또는 "오후 11:00"
  onChange: (val: string) => void;
  disabled?: boolean;
  theme?: "emerald" | "indigo";
}

const AM_TIMES = [
  "00:00", "00:30", "01:00", "01:30",
  "02:00", "02:30", "03:00", "03:30",
  "04:00", "04:30", "05:00", "05:30",
  "06:00", "06:30", "07:00", "07:30",
  "08:00", "08:30", "09:00", "09:30",
  "10:00", "10:30", "11:00", "11:30",
];

const PM_TIMES = [
  "12:00", "12:30", "01:00", "01:30",
  "02:00", "02:30", "03:00", "03:30",
  "04:00", "04:30", "05:00", "05:30",
  "06:00", "06:30", "07:00", "07:30",
  "08:00", "08:30", "09:00", "09:30",
  "10:00", "10:30", "11:00", "11:30",
];

export function GodTimePicker({
  value = "07:00",
  onChange,
  disabled = false,
  theme = "emerald",
}: GodTimePickerProps) {
  const safeValue = value || "07:00";
  const [isOpen, setIsOpen] = useState(false);

  // 테마별 클래스 매핑
  const isIndigo = theme === "indigo";
  const clockColorClass = isIndigo ? "text-indigo-600" : "text-[#00C474]";
  const borderOpenClass = isIndigo
    ? "border-indigo-500 ring-2 ring-indigo-500/20 shadow-md"
    : "border-[#00C474] ring-2 ring-[#00C474]/20 shadow-md";
  const borderHoverClass = isIndigo ? "hover:border-indigo-300" : "hover:border-emerald-300";
  const activeTabClass = isIndigo
    ? "bg-indigo-600 text-white shadow-md font-extrabold scale-[1.02]"
    : "bg-[#00C474] text-white shadow-md font-extrabold scale-[1.02]";
  const selectedChipClass = isIndigo
    ? "bg-indigo-600 text-white shadow-sm ring-1 ring-indigo-600"
    : "bg-[#00C474] text-white shadow-sm ring-1 ring-[#00C474]";
  const chipHoverClass = isIndigo
    ? "hover:bg-indigo-50 hover:text-indigo-600"
    : "hover:bg-emerald-50 hover:text-[#00C474]";
  
  // 현재 가리키고 있는 탭 ('오전' | '오후')
  const [period, setPeriod] = useState<"오전" | "오후">(
    safeValue.includes("오후") ? "오후" : "오전"
  );

  const containerRef = useRef<HTMLDivElement>(null);

  // value 분리 (예: "오전 08:00" -> timeOnly = "08:00")
  const rawTimeStr = safeValue.replace(/^(오전|오후)\s*/, "").trim();
  const timeOnly = rawTimeStr || "07:00";

  // value 변경 시 period 상태 동기화
  useEffect(() => {
    if (safeValue.includes("오후")) {
      setPeriod("오후");
    } else if (safeValue.includes("오전")) {
      setPeriod("오전");
    }
  }, [safeValue]);

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectTime = (selectedTime: string) => {
    const fullTimeStr = `${period} ${selectedTime}`;
    onChange(fullTimeStr);
    setIsOpen(false);
  };

  const handlePeriodChange = (newPeriod: "오전" | "오후") => {
    setPeriod(newPeriod);
    const fullTimeStr = `${newPeriod} ${timeOnly}`;
    onChange(fullTimeStr);
  };

  const currentList = period === "오전" ? AM_TIMES : PM_TIMES;

  return (
    <div ref={containerRef} className="relative w-full">
      {/* 시간 선택 메인 버튼 칩 */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`w-full py-3.5 px-4 bg-white border rounded-2xl flex items-center justify-between transition-all duration-200 cursor-pointer ${
          isOpen ? borderOpenClass : `border-gray-200/90 ${borderHoverClass}`
        } ${disabled ? "opacity-40 cursor-not-allowed" : ""}`}
      >
        <div className="flex items-center gap-2.5">
          <Clock size={20} weight="fill" className={clockColorClass} />
          <span className="text-base font-black text-gray-900 tracking-tight">
            {period} {timeOnly}
          </span>
        </div>

        {/* 심플한 화살표 아이콘 */}
        <div className="flex items-center text-gray-400">
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <CaretDown size={20} weight="bold" className={`text-gray-500 ${isIndigo ? "hover:text-indigo-600" : "hover:text-[#00C474]"}`} />
          </motion.div>
        </div>
      </button>

      {/* 부드럽게 펼쳐지는 커스텀 24시간 팝업 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 4, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 right-0 top-full z-50 mt-1.5 bg-white border border-gray-200/90 rounded-2xl shadow-xl p-3"
          >
            {/* 상단 클릭 감 명확한(Selectable Chip) 오전/오후 선택 탭 */}
            <div className="flex gap-2 mb-3">
              <button
                type="button"
                onClick={() => handlePeriodChange("오전")}
                className={`flex-1 py-2.5 px-3 rounded-xl text-sm font-extrabold transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer ${
                  period === "오전"
                    ? activeTabClass
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200/80"
                }`}
              >
                <span>오전</span>
                {period === "오전" && <Check size={16} weight="bold" />}
              </button>

              <button
                type="button"
                onClick={() => handlePeriodChange("오후")}
                className={`flex-1 py-2.5 px-3 rounded-xl text-sm font-extrabold transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer ${
                  period === "오후"
                    ? activeTabClass
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200/80"
                }`}
              >
                <span>오후</span>
                {period === "오후" && <Check size={16} weight="bold" />}
              </button>
            </div>

            {/* 30분 단위 시분 시간 칩 목록 */}
            <div className="max-h-52 overflow-y-auto pr-1 grid grid-cols-3 gap-1.5 scrollbar-thin scrollbar-thumb-gray-200">
              {currentList.map((t) => {
                const isSelected = timeOnly === t;
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => handleSelectTime(t)}
                    className={`py-2.5 px-2 rounded-xl flex items-center justify-center text-sm font-black transition-all duration-150 cursor-pointer ${
                      isSelected
                        ? selectedChipClass
                        : `bg-gray-50 text-gray-900 border border-gray-100 ${chipHoverClass}`
                    }`}
                  >
                    <span>{t}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
