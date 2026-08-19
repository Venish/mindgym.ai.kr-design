"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
}

export interface GodTabBarProps {
  items: TabItem[];
  activeTab?: string;
  defaultActiveTab?: string;
  onTabChange?: (id: string) => void;
  variant?: "pill" | "underline" | "card";
  className?: string;
  tabClassName?: string;
}

export function GodTabBar({
  items,
  activeTab: controlledActiveTab,
  defaultActiveTab,
  onTabChange,
  variant = "pill",
  className = "",
  tabClassName = "",
}: GodTabBarProps) {
  const [internalActiveTab, setInternalActiveTab] = useState<string>(
    defaultActiveTab || items[0]?.id || ""
  );

  const activeId = controlledActiveTab !== undefined ? controlledActiveTab : internalActiveTab;

  const handleTabClick = (id: string) => {
    if (controlledActiveTab === undefined) {
      setInternalActiveTab(id);
    }
    onTabChange?.(id);
  };

  if (variant === "underline") {
    return (
      <div className={cn("relative flex items-center border-b border-gray-200/80 w-full select-none", className)}>
        {items.map((tab) => {
          const isActive = tab.id === activeId;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleTabClick(tab.id)}
              className={cn(
                "relative flex items-center gap-2 px-4 py-3 text-sm font-extrabold transition-colors active:scale-[0.97]",
                isActive ? "text-[var(--color-brand-green)]" : "text-gray-500 hover:text-gray-900",
                tabClassName
              )}
            >
              {tab.icon && <span className="shrink-0">{tab.icon}</span>}
              <span>{tab.label}</span>
              {tab.badge !== undefined && (
                <span
                  className={cn(
                    "ml-1 px-1.5 py-0.5 text-[10px] font-black rounded-full tabular-nums",
                    isActive ? "bg-emerald-100 text-[var(--color-brand-green)]" : "bg-gray-100 text-gray-500"
                  )}
                >
                  {tab.badge}
                </span>
              )}

              {/* 하단 언더라인 슬라이딩 스프링 애니메이션 */}
              {isActive && (
                <motion.div
                  layoutId="activeTabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-brand-green)] rounded-full"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>
    );
  }

  const isPill = variant === "pill";
  const isCard = variant === "card";

  const containerRadius = isPill ? "rounded-full" : "rounded-xl";
  const innerRadius = isPill ? "rounded-full" : "rounded-lg";

  return (
    <div
      className={cn(
        "relative flex items-center p-1.5 bg-gray-100/90 backdrop-blur-sm border border-gray-200/80 shadow-2xs w-fit select-none",
        containerRadius,
        isCard && "bg-white p-1.5 border-gray-200 shadow-soft",
        className
      )}
    >
      {items.map((tab) => {
        const isActive = tab.id === activeId;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => handleTabClick(tab.id)}
            className={cn(
              "relative flex items-center justify-center gap-2 px-4 py-2 text-xs font-black transition-colors z-10 active:scale-[0.96]",
              innerRadius,
              isActive ? "text-[var(--color-brand-green)]" : "text-gray-600 hover:text-gray-900",
              tabClassName
            )}
          >
            {tab.icon && <span className="shrink-0">{tab.icon}</span>}
            <span>{tab.label}</span>
            {tab.badge !== undefined && (
              <span
                className={cn(
                  "px-1.5 py-0.5 text-[9px] font-black rounded-full tabular-nums",
                  isActive ? "bg-emerald-100 text-[var(--color-brand-green)]" : "bg-gray-200/70 text-gray-500"
                )}
              >
                {tab.badge}
              </span>
            )}

            {/* Pill/Card 슬라이딩 백드롭 모션 (Framer Motion layoutId) */}
            {isActive && (
              <motion.div
                layoutId="activeTabPill"
                className={cn(
                  "absolute inset-0 bg-white border border-gray-200/90 shadow-2xs z-[-1]",
                  innerRadius
                )}
                transition={{ type: "spring", stiffness: 450, damping: 32 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
