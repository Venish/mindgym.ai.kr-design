"use client";

import React from "react";

interface SelectChipButtonProps {
  label: string;
  selected: boolean;
  onClick: () => void;
  className?: string;
}

export function SelectChipButton({
  label,
  selected,
  onClick,
  className = "",
}: SelectChipButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-5 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 ${
        selected
          ? "bg-[#00C474] text-white shadow-soft scale-[1.02]"
          : "bg-gray-100/90 text-gray-700 hover:bg-gray-200/80 active:scale-95 border border-transparent"
      } ${className}`}
    >
      {label}
    </button>
  );
}
