"use client";

import React from "react";
import { Check } from "@phosphor-icons/react";

export interface EmotionChipProps {
  label: string;
  emoji?: string;
  count?: number;
  selected?: boolean;
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function EmotionChip({
  label,
  emoji,
  count,
  selected = false,
  onClick,
  size = "md",
  className = "",
}: EmotionChipProps) {
  const sizeStyles = {
    sm: "px-2.5 py-1 text-xs gap-1.5 rounded-full",
    md: "px-3.5 py-1.5 text-xs gap-2 rounded-full",
    lg: "px-4 py-2 text-sm gap-2 rounded-full",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center justify-center font-extrabold tracking-tight transition-colors border cursor-pointer select-none ${
        selected
          ? "bg-[#E9F8F0] border-[#005A34] text-[#005A34]"
          : "bg-white border-gray-200 text-[#4E5968] hover:border-[#005A34] hover:text-[#191F28] active:border-[#005A34]"
      } ${sizeStyles[size]} ${className}`}
    >
      {emoji && <span className="text-sm leading-none">{emoji}</span>}
      <span>{label}</span>
      {count !== undefined && (
        <span
          className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
            selected ? "bg-white/80 text-[#005A34]" : "bg-gray-100 text-gray-400"
          }`}
        >
          {count}
        </span>
      )}
      {selected && <Check size={13} weight="bold" className="text-[#005A34] shrink-0" />}
    </button>
  );
}
