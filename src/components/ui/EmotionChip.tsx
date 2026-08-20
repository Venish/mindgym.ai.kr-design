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
          ? "bg-[var(--color-pastel-mint-bg)] border-transparent txt-brand-forest"
          : "bg-white border-gray-200 txt-brand-slate hover:border-[var(--color-forest-green)] hover:txt-brand-ink active:border-[var(--color-forest-green)]"
      } ${sizeStyles[size]} ${className}`}
    >
      {emoji && <span className="text-sm leading-none">{emoji}</span>}
      <span>{label}</span>
      {count !== undefined && (
        <span
          className={`txt-caption-compact font-mono px-1.5 py-0.2 rounded-full ${
            selected ? "bg-white/80 txt-brand-forest" : "bg-gray-100 text-gray-400"
          }`}
        >
          {count}
        </span>
      )}
      {selected && <Check size={13} weight="bold" className="txt-brand-forest shrink-0" />}
    </button>
  );
}
