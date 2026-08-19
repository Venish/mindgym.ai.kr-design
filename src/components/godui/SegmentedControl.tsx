"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SegmentedControlItem {
  id: string;
  label: string;
  count?: number;
}

interface SegmentedControlProps {
  items: SegmentedControlItem[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
}

export function SegmentedControl({
  items,
  activeId,
  onChange,
  className = "",
}: SegmentedControlProps) {
  return (
    <div className={cn("inline-flex items-center gap-1 bg-gray-100/80 p-1 rounded-2xl", className)}>
      {items.map((item) => {
        const isActive = item.id === activeId;
        return (
          <button
            key={item.id}
            onClick={() => onChange(item.id)}
            className={cn(
              "relative px-4 py-2 text-xs font-semibold rounded-xl transition-colors duration-200 z-10",
              isActive ? "txt-brand-green font-bold" : "txt-brand-clay hover:txt-brand-ink"
            )}
          >
            {isActive && (
              <motion.div
                layoutId="segmented-control-active"
                className="absolute inset-0 bg-white rounded-xl shadow-soft -z-10"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="flex items-center gap-1.5">
              {item.label}
              {typeof item.count === "number" && (
                <span
                  className={cn(
                    "px-1.5 py-0.5 rounded-full text-[10px] font-medium",
                    isActive ? "bg-brand-mint-light txt-brand-green" : "bg-gray-200 text-gray-500"
                  )}
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
