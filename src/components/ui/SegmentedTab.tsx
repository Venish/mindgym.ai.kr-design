"use client";

import React from "react";
import { motion } from "framer-motion";

export interface SegmentedTabItem {
  id: string;
  label: string;
  count?: number;
  badgeActiveColor?: string;
}

interface SegmentedTabProps {
  items: SegmentedTabItem[];
  activeId: string;
  onChange: (id: string) => void;
  fullWidth?: boolean;
  className?: string;
  layoutId?: string;
}

/**
 * SegmentedTab: 전역 공통 0ms 슬라이딩 모션 스위칭 탭 컴포넌트
 */
export function SegmentedTab({
  items,
  activeId,
  onChange,
  fullWidth = true,
  className = "",
}: SegmentedTabProps) {
  const activeIndex = Math.max(0, items.findIndex((item) => item.id === activeId));
  const itemCount = items.length;

  return (
    <div
      className={`bg-[#F1F5F9] p-1 rounded-2xl flex items-center relative select-none ${
        fullWidth ? "w-full" : "inline-flex"
      } ${className}`}
    >
      {/* 1D 수평(X축) 전용 슬라이딩 백그라운드 캡슐 */}
      <motion.div
        className="absolute top-1 bottom-1 bg-white rounded-xl shadow-xs z-0"
        style={{
          width: `calc((100% - 0.5rem - ${(itemCount - 1) * 0.25}rem) / ${itemCount})`,
        }}
        animate={{
          x: `calc(${activeIndex} * (100% + 0.25rem))`,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 35 }}
      />

      {items.map((item) => {
        const isActive = item.id === activeId;
        const defaultActiveBadge = item.badgeActiveColor || "bg-emerald-100 text-[#00C474]";

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onChange(item.id)}
            className={`relative py-2.5 px-3.5 text-[13.5px] rounded-xl transition-colors duration-200 cursor-pointer active:scale-95 z-10 flex-1 text-center font-bold ${
              isActive ? "text-gray-900" : "text-gray-500 hover:text-gray-800 font-medium"
            }`}
          >
            <span className="flex items-center justify-center gap-1.5">
              {item.label}
              {typeof item.count === "number" && (
                <span
                  className={`px-1.5 py-0.5 rounded-full text-[10px] font-black ${
                    isActive ? defaultActiveBadge : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {item.count}
                </span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}
