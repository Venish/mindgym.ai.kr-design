"use client";

import React, { useState } from "react";
import {
  CaretLeft,
  CaretRight,
  CheckCircle,
  CalendarBlank,
} from "@phosphor-icons/react";
import { SubPageHeader } from "@/components/ui/SubPageHeader";
import { Badge } from "@/components/ui/Badge";
import { useMindGym } from "@/context/MindGymContext";
import { useModalStore } from "@/store/useModalStore";

interface DayRecord {
  day: number;
  isDone: boolean;
  rituals?: string[];
  emotion?: string;
  memo?: string;
  db?: number;
}

const AUGUST_2026_RECORDS: Record<number, DayRecord> = {
  1: { day: 1, isDone: true, rituals: ["미소 명상 리추얼"], emotion: "차분함", memo: "8월 첫날 가벼운 마음으로 시작!", db: 3 },
  3: { day: 3, isDone: true, rituals: ["마음일기 적기"], emotion: "상쾌함", memo: "주초 집중력을 높였다.", db: 3 },
  5: { day: 5, isDone: true, rituals: ["4-7-8 호흡법"], emotion: "차분함", memo: "천천히 숨을 들이쉬고 내쉬기.", db: 3 },
  7: { day: 7, isDone: true, rituals: ["감사 일기 쓰기"], emotion: "설렘", memo: "주말을 앞두고 만난 사람들에게 감사.", db: 3 },
  8: { day: 8, isDone: true, rituals: ["퇴근 길 바디스캔"], emotion: "차분함", memo: "어깨 누적 긴장을 풀었다.", db: 3 },
  10: { day: 10, isDone: true, rituals: ["자기 자비 스트레칭"], emotion: "상쾌함", memo: "스스로를 따뜻하게 다독였다.", db: 3 },
  12: { day: 12, isDone: true, rituals: ["KOSS 직무진단 완료"], emotion: "차분함", memo: "내 스트레스 상태를 정확히 진단함.", db: 5 },
  14: { day: 14, isDone: true, rituals: ["수면 딥 슬립 음원"], emotion: "편안함", memo: "푹 잠자고 상쾌하게 일어났다.", db: 3 },
  15: { day: 15, isDone: true, rituals: ["미소 명상 리추얼"], emotion: "차분함", memo: "광대 근육을 펴고 미소짓기.", db: 3 },
  17: { day: 17, isDone: true, rituals: ["마음일기 적기"], emotion: "평온함", memo: "새로운 한 주의 목표를 정리함.", db: 3 },
  18: { day: 18, isDone: true, rituals: ["4-7-8 호흡법"], emotion: "차분함", memo: "업무 전 호흡으로 집중력 강화.", db: 3 },
  19: { day: 19, isDone: true, rituals: ["직무 스트레스 비우기 노트"], emotion: "상쾌함", memo: "머릿속 복잡한 생각을 정리했다.", db: 3 },
  20: { day: 20, isDone: true, rituals: ["미소 명상 리추얼", "마음일기 적기"], emotion: "차분함", memo: "오늘도 남 비교하지 말고 내 페이스대로 걷기", db: 6 },
};

/**
 * CalendarSheet: 오른쪽에서 왼쪽으로 스르륵 열리는 (slide-left) 0ms 오버레이 달력 모달
 */
export function CalendarSheet() {
  const { closeModal } = useModalStore();
  const { userName } = useMindGym();

  // 선택한 일자 (기본값 20일 - 오늘)
  const [selectedDay, setSelectedDay] = useState<number>(20);

  const emptyPrefixCount = 6;
  const totalDaysInAug = 31;
  const todayNum = 20;

  const currentRecord = AUGUST_2026_RECORDS[selectedDay];

  return (
    <div className="w-full min-h-full bg-white flex flex-col select-none relative pb-12 text-gray-900 overflow-y-auto">
      {/* 1. 상단 서브 헤더 (X 닫기 또는 ← 클릭 시 슬라이딩 아웃) */}
      <SubPageHeader
        title="월간 출석 달력"
        leftType="back"
        onLeftClick={closeModal}
      />

      <div className="flex flex-col w-full px-5 pt-3 gap-6 text-left max-w-lg mx-auto">
        {/* 2. 이번 달 마음 단련 3대 출석 스탯 */}
        <div className="w-full flex flex-col gap-3">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-[0.9375rem] font-bold text-gray-900 tracking-tight">
              {userName}님의 8월 출석 현황
            </h2>
            <Badge variant="mint" size="md">
              7일 연속 출석 중
            </Badge>
          </div>

          <div className="grid grid-cols-3 gap-2.5">
            <div className="bg-[#F0FDF4] rounded-2xl p-3 flex flex-col items-center justify-center text-center shadow-2xs">
              <span className="text-[11.5px] font-extrabold text-emerald-800 mb-0.5">
                연속 출석
              </span>
              <span className="text-xl font-black text-[#00C474] tabular-nums mt-0.5">
                7일째
              </span>
            </div>

            <div className="bg-[#F8FAFC] rounded-2xl p-3 flex flex-col items-center justify-center text-center shadow-2xs">
              <span className="text-[11.5px] font-extrabold text-gray-600 mb-0.5">
                8월 실천
              </span>
              <span className="text-xl font-black text-gray-900 tabular-nums mt-0.5">
                14일
              </span>
            </div>

            <div className="bg-[#F8FAFC] rounded-2xl p-3 flex flex-col items-center justify-center text-center shadow-2xs">
              <span className="text-[11.5px] font-extrabold text-gray-600 mb-0.5">
                누적 출석
              </span>
              <span className="text-xl font-black text-gray-900 tabular-nums mt-0.5">
                28일
              </span>
            </div>
          </div>
        </div>

        {/* 3. 2026년 8월 달력 그리드 */}
        <div className="w-full bg-[#F8FAFC] rounded-3xl p-4 flex flex-col gap-3.5 shadow-2xs">
          {/* 달력 상단 월 컨트롤 */}
          <div className="flex items-center justify-between px-2 pt-1 border-b border-gray-200/60 pb-3">
            <button
              type="button"
              className="p-1 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
              title="이전 달"
            >
              <CaretLeft size={20} weight="bold" />
            </button>
            <div className="flex items-center gap-2">
              <CalendarBlank size={20} weight="bold" className="text-[#00C474]" />
              <h3 className="text-base font-extrabold text-gray-900 tracking-tight">
                2026년 8월
              </h3>
            </div>
            <button
              type="button"
              className="p-1 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
              title="다음 달"
            >
              <CaretRight size={20} weight="bold" />
            </button>
          </div>

          {/* 7열 요일 헤더 */}
          <div className="grid grid-cols-7 text-center text-xs font-bold text-gray-400 py-1">
            <span className="text-rose-500">일</span>
            <span>월</span>
            <span>화</span>
            <span>수</span>
            <span>목</span>
            <span>금</span>
            <span className="text-indigo-500">토</span>
          </div>

          {/* 일자 그리드 */}
          <div className="grid grid-cols-7 gap-1.5 text-center">
            {/* 8월 1일 이전 6개 빈 날짜 셀 */}
            {Array.from({ length: emptyPrefixCount }).map((_, i) => (
              <div key={`empty-${i}`} className="h-10 rounded-xl" />
            ))}

            {/* 1일 ~ 31일 실천 날짜 셀 */}
            {Array.from({ length: totalDaysInAug }).map((_, i) => {
              const dayNum = i + 1;
              const rec = AUGUST_2026_RECORDS[dayNum];
              const isDone = rec?.isDone;
              const isSelected = selectedDay === dayNum;
              const isToday = dayNum === todayNum;

              return (
                <button
                  key={dayNum}
                  type="button"
                  onClick={() => setSelectedDay(dayNum)}
                  className={`h-11 rounded-2xl flex flex-col items-center justify-center relative transition-all cursor-pointer active:scale-95 ${
                    isSelected
                      ? "bg-[#00C474] text-white shadow-xs font-extrabold ring-2 ring-emerald-300/80"
                      : isDone
                      ? "bg-emerald-100/70 text-emerald-950 font-bold hover:bg-emerald-200/60"
                      : "bg-white text-gray-700 hover:bg-gray-100 font-medium"
                  }`}
                >
                  <span className={`text-[13px] ${isToday && !isSelected ? "text-[#00C474] font-black" : ""}`}>
                    {dayNum}
                  </span>

                  {/* 출석 도장 점 표시 */}
                  {isDone && (
                    <span className={`w-1.5 h-1.5 rounded-full mt-0.5 ${
                      isSelected ? "bg-white" : "bg-[#00C474]"
                    }`} />
                  )}

                  {/* 오늘 표시 링 */}
                  {isToday && !isSelected && (
                    <span className="absolute inset-0 rounded-2xl border-2 border-[#00C474] pointer-events-none" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. 선택 일자 단련 기록 카드 */}
        <div className="w-full flex flex-col gap-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-[0.9375rem] font-bold text-gray-900 tracking-tight flex items-center gap-1.5">
              <span>8월 {selectedDay}일 단련 기록</span>
              {selectedDay === todayNum && (
                <span className="text-[11px] font-extrabold text-[#00C474] bg-emerald-50 px-2 py-0.5 rounded-full">
                  오늘
                </span>
              )}
            </h3>
            {currentRecord && (
              <span className="text-xs font-bold text-[#00C474]">
                +{currentRecord.db} DB 적립
              </span>
            )}
          </div>

          {currentRecord ? (
            <div className="w-full bg-[#F8FAFC] rounded-3xl p-4 flex flex-col gap-3 shadow-2xs text-left">
              {/* 완수한 리추얼 목록 */}
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold text-gray-500">완수한 마음 단련</span>
                {currentRecord.rituals?.map((rit, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-white rounded-xl p-3 shadow-2xs">
                    <CheckCircle size={20} weight="fill" className="text-[#00C474] shrink-0" />
                    <span className="text-[14px] font-bold text-gray-900">{rit}</span>
                  </div>
                ))}
              </div>

              {/* 감정 & 실천 메모 */}
              <div className="flex flex-col gap-1.5 pt-2 border-t border-gray-200/60">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-gray-500">이날의 마음:</span>
                  <span className="text-xs font-extrabold text-[#00C474] bg-emerald-100/80 px-2.5 py-0.5 rounded-full">
                    {currentRecord.emotion}
                  </span>
                </div>
                {currentRecord.memo && (
                  <p className="text-xs font-medium text-gray-700 leading-relaxed bg-white rounded-xl p-3 shadow-2xs mt-1">
                    "{currentRecord.memo}"
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="w-full bg-[#F8FAFC] rounded-3xl p-6 flex flex-col items-center justify-center text-center gap-2 shadow-2xs">
              <CalendarBlank size={36} weight="duotone" className="text-gray-300" />
              <span className="text-sm font-bold text-gray-500">
                8월 {selectedDay}일에는 출석 기록이 없어요.
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
