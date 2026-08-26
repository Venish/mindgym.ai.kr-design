"use client";

import React, { useState, useEffect } from "react";
import { Trash, CheckCircle, Sparkle, X } from "@phosphor-icons/react";

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
    <div className="w-full bg-[#F7FAF8] p-6 rounded-t-3xl flex flex-col gap-4 max-w-lg mx-auto max-h-[85vh] overflow-hidden select-none">
      {/* 상단 타이틀 헤더 */}
      <div className="flex justify-between items-center pb-3 border-b border-gray-200 shrink-0">
        <div className="flex items-center gap-2">
          <Sparkle size={20} className="text-[#00C473]" weight="fill" />
          <h3 className="text-lg font-bold text-gray-900">
            나의 스트레스 목록 ({history.length})
          </h3>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-200/60 transition-colors cursor-pointer"
        >
          <X size={20} weight="bold" />
        </button>
      </div>

      {/* 스트레스 기록 리스트 스크롤 영역 */}
      <div className="flex-1 overflow-y-auto flex flex-col gap-3 pr-1 py-1">
        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center text-gray-400 gap-2">
            <CheckCircle size={44} weight="thin" className="text-emerald-300" />
            <p className="text-sm font-semibold text-gray-600">
              아직 기록된 파쇄 스트레스가 없습니다.
            </p>
            <p className="text-xs text-gray-400">
              마음을 답답하게 하는 일을 파쇄기에 넣어 가볍게 비워보세요.
            </p>
          </div>
        ) : (
          history.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-2 relative group hover:border-emerald-200 transition-all"
            >
              {/* 상단 뱃지 및 날짜 */}
              <div className="flex justify-between items-center text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#00C473] font-extrabold text-[11px]">
                    {item.stressLevel}
                  </span>
                  {item.presetLabel && (
                    <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 font-semibold text-[11px]">
                      {item.presetLabel}
                    </span>
                  )}
                </div>
                <span className="text-gray-400 font-medium text-[11px]">
                  {item.createdAt}
                </span>
              </div>

              {/* 작성 내용 */}
              <p className="text-sm font-medium text-gray-800 leading-relaxed whitespace-pre-line pt-1">
                "{item.text}"
              </p>

              {/* 하단 힐링 지침 & 삭제 버튼 */}
              <div className="flex justify-between items-center pt-2 border-t border-gray-50 text-[11px]">
                <span className="text-emerald-600 font-medium flex items-center gap-1">
                  <CheckCircle size={13} weight="fill" />
                  마음에서 깨끗이 비워진 스트레스
                </span>
                <button
                  type="button"
                  onClick={() => handleDeleteItem(item.id)}
                  className="text-gray-400 hover:text-rose-500 p-1 transition-colors cursor-pointer"
                  title="기록 삭제"
                >
                  <Trash size={14} weight="regular" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 하단 전체 비우기 기능 */}
      {history.length > 0 && (
        <div className="shrink-0 pt-2 border-t border-gray-200 flex justify-end">
          <button
            type="button"
            onClick={handleClearAll}
            className="text-xs text-gray-400 hover:text-rose-500 font-semibold px-2 py-1 cursor-pointer transition-colors"
          >
            기록 전체 비우기
          </button>
        </div>
      )}
    </div>
  );
}
