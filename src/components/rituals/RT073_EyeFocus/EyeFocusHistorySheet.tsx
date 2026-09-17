"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Clock } from "@phosphor-icons/react";
import { SubPageHeader } from "@/components/ui/SubPageHeader";
import { SegmentedTab } from "@/components/ui/SegmentedTab";
import { DifficultyLevel } from "./types";

export function formatTimeAgo(dateStr: string): string {
  try {
    const parts = dateStr.split(" ");
    if (parts.length < 2) return dateStr;
    const [y, m, d] = parts[0].split(".").map(Number);
    const [hh, mm] = parts[1].split(":").map(Number);
    const targetDate = new Date(y, m - 1, d, hh, mm);
    const now = new Date();
    const diffSec = Math.floor((now.getTime() - targetDate.getTime()) / 1000);

    if (diffSec < 60) return "방금 전";
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin}분 전`;
    const diffHours = Math.floor(diffMin / 60);
    if (diffHours < 24) return `${diffHours}시간 전`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays === 1) return "1일 전";
    if (diffDays < 7) return `${diffDays}일 전`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}주 전`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)}달 전`;
    return parts[0];
  } catch {
    return dateStr;
  }
}

export interface EyeFocusHistoryItem {
  id: string;
  totalScore: number;
  accuracy: number;
  avgReactionTime: number;
  hits: number;
  misses: number;
  grade: "S" | "A" | "B" | "C";
  difficulty?: DifficultyLevel;
  createdAt: string;
}

const STORAGE_KEY = "mindgym_eye_focus_history";

// 초기 기본 샘플 기록
const DEFAULT_INITIAL_HISTORY: EyeFocusHistoryItem[] = [
  {
    id: "ef_sample_1",
    totalScore: 420,
    accuracy: 90,
    avgReactionTime: 238,
    hits: 9,
    misses: 1,
    grade: "S",
    difficulty: "normal",
    createdAt: "2026.09.17 10:15",
  },
  {
    id: "ef_sample_2",
    totalScore: 390,
    accuracy: 85,
    avgReactionTime: 265,
    hits: 8,
    misses: 2,
    grade: "A",
    difficulty: "normal",
    createdAt: "2026.09.16 14:30",
  },
  {
    id: "ef_sample_3",
    totalScore: 360,
    accuracy: 80,
    avgReactionTime: 284,
    hits: 8,
    misses: 2,
    grade: "A",
    difficulty: "easy",
    createdAt: "2026.09.15 09:15",
  },
];

export function getEyeFocusHistory(): EyeFocusHistoryItem[] {
  if (typeof window === "undefined") return DEFAULT_INITIAL_HISTORY;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_INITIAL_HISTORY));
      return DEFAULT_INITIAL_HISTORY;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_INITIAL_HISTORY;
  }
}

export function saveEyeFocusRecord(
  totalScore: number,
  hits: number,
  misses: number,
  avgReactionTime: number,
  _sessionType: string = "routine",
  _modeTitle: string = "시선 맑음 통합 루틴",
  difficulty: DifficultyLevel = "normal"
) {
  if (typeof window === "undefined") return;
  try {
    const history = getEyeFocusHistory();
    const now = new Date();
    const formattedDate = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, "0")}.${String(
      now.getDate()
    ).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(
      now.getMinutes()
    ).padStart(2, "0")}`;

    const totalTrials = hits + misses || 1;
    const accuracy = Math.round((hits / totalTrials) * 100);

    let grade: "S" | "A" | "B" | "C" = "B";
    if (accuracy >= 90 && avgReactionTime < 300) grade = "S";
    else if (accuracy >= 80 && avgReactionTime < 450) grade = "A";
    else if (accuracy >= 60) grade = "B";
    else grade = "C";

    const newItem: EyeFocusHistoryItem = {
      id: "ef_" + Date.now(),
      totalScore,
      accuracy,
      avgReactionTime: Math.round(avgReactionTime) || 280,
      hits,
      misses,
      grade,
      difficulty,
      createdAt: formattedDate,
    };

    const updated = [newItem, ...history];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated.slice(0, 50)));
  } catch (e) {
    console.error("Failed to save eye focus history:", e);
  }
}

type TabDifficulty = "all" | "easy" | "normal" | "hard";

interface EyeFocusHistorySheetProps {
  onClose: () => void;
}

/**
 * EyeFocusHistorySheet: '나의 시선 맑음' 훈련 기록 보관함 시트
 */
export function EyeFocusHistorySheet({ onClose }: EyeFocusHistorySheetProps) {
  const [history, setHistory] = useState<EyeFocusHistoryItem[]>([]);
  const [activeTab, setActiveTab] = useState<TabDifficulty>("all");

  useEffect(() => {
    setHistory(getEyeFocusHistory());
  }, []);

  // 연속 훈련(참가) 일수 (Streak) 계산
  const calculateStreak = (items: EyeFocusHistoryItem[]) => {
    if (items.length === 0) return 0;

    const dateSet = new Set(
      items.map((item) => item.createdAt.split(" ")[0])
    );
    const sortedDates = Array.from(dateSet).sort().reverse();

    if (sortedDates.length === 0) return 0;

    let streak = 0;
    const now = new Date();
    const todayStr = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, "0")}.${String(
      now.getDate()
    ).padStart(2, "0")}`;

    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = `${yesterday.getFullYear()}.${String(yesterday.getMonth() + 1).padStart(2, "0")}.${String(
      yesterday.getDate()
    ).padStart(2, "0")}`;

    let checkDate = new Date();
    if (!dateSet.has(todayStr)) {
      if (dateSet.has(yesterdayStr)) {
        checkDate = yesterday;
      } else {
        return 0;
      }
    }

    while (true) {
      const dateKey = `${checkDate.getFullYear()}.${String(checkDate.getMonth() + 1).padStart(2, "0")}.${String(
        checkDate.getDate()
      ).padStart(2, "0")}`;

      if (dateSet.has(dateKey)) {
        streak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }

    return streak;
  };

  // 누적 통계
  const totalWorkouts = history.length;
  const streakDays = calculateStreak(history);
  const avgAccuracy = totalWorkouts > 0 
    ? Math.round(history.reduce((acc, cur) => acc + cur.accuracy, 0) / totalWorkouts)
    : 0;

  // 난이도별 필터링된 기록 리스트
  const filteredHistory = history.filter((item) => {
    if (activeTab === "all") return true;
    if (activeTab === "normal") return item.difficulty === "normal" || !item.difficulty;
    return item.difficulty === activeTab;
  });

  // 슬라이딩 스위치 탭 아이템 리스트 (숫자 제거)
  const tabItems = [
    { id: "all", label: "전체" },
    { id: "easy", label: "초급" },
    { id: "normal", label: "중급" },
    { id: "hard", label: "고급" },
  ];

  return (
    <div
      data-ritual-sheet
      className="w-full h-full min-h-full bg-theme-app flex flex-col justify-between select-none relative txt-brand-ink transition-colors duration-300 border-none shadow-none"
    >
      {/* 1. 상단 공통 서브페이지 헤더 */}
      <SubPageHeader
        title={`나의 시선 맑음 (${history.length})`}
        leftType="close"
        onLeftClick={onClose}
      />

      {/* 2. 시선 맑음 훈련 기록 리스트 스크롤 영역 */}
      <div className="flex-1 overflow-y-auto flex flex-col gap-3 px-3.5 sm:px-4 py-3 w-full max-w-lg mx-auto text-left">
        
        {/* 상단 3대 누적 요약 카드 (월간 출석 달력 상단 박스 3개와 동일한 스타일) */}
        {totalWorkouts > 0 && (
          <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
            <div className="bg-theme-card-subtle rounded-2xl p-3 flex flex-col items-center justify-center text-center shadow-2xs">
              <span className="text-[11.5px] font-extrabold text-theme-muted mb-0.5">
                연속 참가
              </span>
              <span className="text-xl font-black text-theme-accent tabular-nums mt-0.5">
                {streakDays}일째
              </span>
            </div>

            <div className="bg-theme-card border border-theme-card rounded-2xl p-3 flex flex-col items-center justify-center text-center shadow-2xs">
              <span className="text-[11.5px] font-extrabold text-theme-muted mb-0.5">
                총 훈련
              </span>
              <span className="text-xl font-black txt-brand-ink tabular-nums mt-0.5">
                {totalWorkouts}회
              </span>
            </div>

            <div className="bg-theme-card border border-theme-card rounded-2xl p-3 flex flex-col items-center justify-center text-center shadow-2xs">
              <span className="text-[11.5px] font-extrabold text-theme-muted mb-0.5">
                평균 정답률
              </span>
              <span className="text-xl font-black txt-brand-ink tabular-nums mt-0.5">
                {avgAccuracy}%
              </span>
            </div>
          </div>
        )}

        {/* 3. 상단 요약과 상세 사이의 난이도 스위치 탭 (공통 SegmentedTab) */}
        <div className="w-full pt-1 pb-0.5">
          <SegmentedTab
            items={tabItems}
            activeId={activeTab}
            onChange={(id) => setActiveTab(id as TabDifficulty)}
          />
        </div>

        {/* 4. 훈련 기록 리스트 목록 */}
        {filteredHistory.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center text-theme-muted gap-3 my-auto">
            <CheckCircle size={48} weight="thin" className="txt-brand-green" />
            <p className="text-sm font-semibold txt-brand-ink">
              선택한 난이도의 훈련 기록이 없습니다.
            </p>
            <p className="text-xs text-theme-muted">
              시선 맑음 통합 루틴을 완수하고 맑은 시선 기록을 채워보세요.
            </p>
          </div>
        ) : (
          filteredHistory.map((item) => (
            <div
              key={item.id}
              className="bg-theme-card pt-3.5 pb-2.5 px-3.5 sm:px-4 rounded-2xl border border-theme-subtle shadow-2xs flex flex-col gap-2 relative group hover:border-[#00C474] transition-all"
            >
              {/* 상단 뱃지 및 날짜 */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span
                    className={`px-2.5 py-0.5 rounded-full font-bold text-xs sm:text-[13px] border ${
                      item.grade === "S"
                        ? "border-emerald-500/30 bg-emerald-500/10 text-[#00BA66] dark:text-emerald-400"
                        : item.grade === "A"
                        ? "border-sky-500/30 bg-sky-500/10 text-sky-600 dark:text-sky-400"
                        : item.grade === "B"
                        ? "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400"
                        : "border-rose-500/30 bg-rose-500/10 text-rose-600 dark:text-rose-400"
                    }`}
                  >
                    등급 {item.grade}
                  </span>
                  <span className="txt-brand-ink font-bold text-xs sm:text-[13px] ml-0.5">
                    {item.totalScore}점
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-medium text-theme-muted shrink-0">
                  <Clock size={12} weight="bold" />
                  <span>{formatTimeAgo(item.createdAt)}</span>
                </div>
              </div>

              {/* 3대 핵심 지표 바 (bold 굵기 완화) */}
              <div className="grid grid-cols-3 gap-2 pt-2.5 pb-0 text-center">
                <div className="flex flex-col items-center">
                  <span className="text-xs sm:text-[13px] font-medium text-theme-muted mb-0.5">정답률</span>
                  <span className="text-base sm:text-lg font-bold txt-brand-ink tabular-nums">
                    {item.accuracy}%
                  </span>
                </div>
                <div className="flex flex-col items-center border-x border-theme-subtle/40">
                  <span className="text-xs sm:text-[13px] font-medium text-theme-muted mb-0.5">평균 반응속도</span>
                  <span className="text-base sm:text-lg font-bold txt-brand-ink tabular-nums">
                    {item.avgReactionTime}ms
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-xs sm:text-[13px] font-medium text-theme-muted mb-0.5">적중 / 놓침</span>
                  <span className="text-base sm:text-lg font-bold txt-brand-ink tabular-nums">
                    {item.hits} / {item.misses}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
