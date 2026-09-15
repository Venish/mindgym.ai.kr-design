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
      className={`bg-theme-card-subtle p-1 rounded-2xl flex items-center relative select-none ${
        fullWidth ? "w-full" : "inline-flex"
      } ${className}`}
    >
      {/* 1D 수평(X축) 전용 슬라이딩 백그라운드 캡슐 */}
      <motion.div
        className="absolute top-1 bottom-1 bg-theme-card rounded-xl shadow-xs z-0"
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
        const defaultActiveBadge = item.badgeActiveColor || "bg-emerald-100 dark:bg-emerald-950/60 text-[#00C474] dark:text-emerald-400";

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onChange(item.id)}
            className={`relative py-2.5 px-3.5 text-[13.5px] rounded-xl transition-colors duration-200 cursor-pointer z-10 flex-1 text-center font-bold ${
              isActive ? "txt-brand-ink" : "text-theme-muted hover:txt-brand-ink font-medium"
            }`}
          >
            <span className="flex items-center justify-center gap-1.5">
              {item.label}
              {typeof item.count === "number" && (
                <span
                  className={`px-1.5 py-0.5 rounded-full text-[10px] font-black ${
                    isActive ? defaultActiveBadge : "bg-theme-card-subtle text-theme-muted"
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
