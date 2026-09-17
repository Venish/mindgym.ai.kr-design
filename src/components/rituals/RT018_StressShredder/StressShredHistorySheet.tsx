"use client";

import React, { useState, useEffect } from "react";
import { Trash, CheckCircle, Clock } from "@phosphor-icons/react";
import { SubPageHeader } from "@/components/ui/SubPageHeader";

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

export interface ShredHistoryItem {
  id: string;
  text: string;
  presetLabel: string | null;
  stressLevel: string;
  createdAt: string;
}

const STORAGE_KEY = "mindgym_shred_history";

export function getShredHistory(): ShredHistoryItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveShredItem(text: string, presetLabel: string | null, stressLevel: string) {
  if (typeof window === "undefined") return;
  try {
    const history = getShredHistory();
    const now = new Date();
    const formattedDate = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, "0")}.${String(
      now.getDate()
    ).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(
      now.getMinutes()
    ).padStart(2, "0")}`;

    const newItem: ShredHistoryItem = {
      id: "shred_" + Date.now(),
      text: text.trim() || "말없이 삼켰던 답답함과 마음의 스트레스",
      presetLabel,
      stressLevel,
      createdAt: formattedDate,
    };

    const updated = [newItem, ...history];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated.slice(0, 50))); // 최대 50개 보관
  } catch (e) {
    console.error("Failed to save shred history:", e);
  }
}

interface StressShredHistorySheetProps {
  onClose: () => void;
}

export function StressShredHistorySheet({ onClose }: StressShredHistorySheetProps) {
  const [history, setHistory] = useState<ShredHistoryItem[]>([]);

  useEffect(() => {
    setHistory(getShredHistory());
  }, []);

  const handleDeleteItem = (id: string) => {
    const updated = history.filter((item) => item.id !== id);
    setHistory(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    }
  };

  const handleClearAll = () => {
    if (confirm("파쇄 기록을 모두 삭제하시겠습니까?")) {
      setHistory([]);
      if (typeof window !== "undefined") {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  };

  return (
    <div
      data-ritual-sheet
      className="w-full h-full min-h-full bg-theme-app flex flex-col justify-between select-none relative txt-brand-ink transition-colors duration-300 border-none shadow-none"
    >
      {/* 1. 상단 공통 서브페이지 헤더 */}
      <SubPageHeader
        title={`나의 스트레스 목록 (${history.length})`}
        leftType="close"
        onLeftClick={onClose}
        rightContent={
          history.length > 0 ? (
            <button
              type="button"
              onClick={handleClearAll}
              className="text-xs text-theme-muted hover:text-rose-500 font-semibold px-2 py-1 cursor-pointer transition-colors"
            >
              전체 비우기
            </button>
          ) : (
            <div className="w-8" />
          )
        }
      />

      {/* 2. 스트레스 기록 리스트 스크롤 영역 */}
      <div className="flex-1 overflow-y-auto flex flex-col gap-3 px-5 py-3 w-full max-w-lg mx-auto">
        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center text-theme-muted gap-3 my-auto">
            <CheckCircle size={48} weight="thin" className="txt-brand-green" />
            <p className="text-sm font-semibold txt-brand-ink">
              아직 기록된 파쇄 스트레스가 없습니다.
            </p>
            <p className="text-xs text-theme-muted">
              마음을 답답하게 하는 일을 파쇄기에 넣어 가볍게 비워보세요.
            </p>
          </div>
        ) : (
          history.map((item) => (
            <div
              key={item.id}
              className="bg-theme-card p-4 rounded-2xl border border-theme-subtle shadow-2xs flex flex-col gap-2.5 relative group hover:border-[#00C474] transition-all"
            >
              {/* 상단 뱃지 및 날짜 */}
              <div className="flex justify-between items-center text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-theme-card-subtle txt-brand-green font-extrabold text-[11px]">
                    {item.stressLevel}
                  </span>
                  {item.presetLabel && (
                    <span className="px-2 py-0.5 rounded-full bg-theme-subtle text-theme-muted font-semibold text-[11px]">
                      {item.presetLabel}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1 text-[11px] font-bold text-theme-muted shrink-0">
                  <Clock size={12} weight="bold" />
                  <span>{formatTimeAgo(item.createdAt)}</span>
                </div>
              </div>

              {/* 작성 내용 */}
              <p className="text-sm font-medium txt-brand-ink leading-relaxed whitespace-pre-line pt-0.5">
                "{item.text}"
              </p>

              {/* 하단 힐링 지침 & 삭제 버튼 */}
              <div className="flex justify-between items-center pt-2.5 border-t border-theme-subtle/60 text-[11px]">
                <span className="txt-brand-green font-medium flex items-center gap-1">
                  <CheckCircle size={13} weight="fill" />
                  마음에서 깨끗이 비워진 스트레스
                </span>
                <button
                  type="button"
                  onClick={() => handleDeleteItem(item.id)}
                  className="text-theme-muted hover:text-rose-500 p-1 transition-colors cursor-pointer"
                  title="기록 삭제"
                >
                  <Trash size={14} weight="regular" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

