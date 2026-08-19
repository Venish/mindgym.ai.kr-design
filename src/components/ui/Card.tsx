"use client";

import React from "react";

export type CardVariant =
  | "mint"
  | "olive"
  | "sky"
  | "yellow"
  | "rose"
  | "lavender"
  | "peach"
  | "mist"
  | "sand"
  | "surface"
  | "grayLight"
  | "grayMid"
  | "grayDark";

export interface CardProps {
  children: React.ReactNode;
  variant?: CardVariant;
  borderWidth?: "1px" | "2px";
  clickable?: boolean;
  onClick?: () => void;
  className?: string;
}

export function Card({
  children,
  variant = "surface",
  borderWidth = "1px",
  clickable = false,
  onClick,
  className = "",
}: CardProps) {
  // 10가지 파스텔 팔레트 및 3단계 Neutral Gray Card 스펙
  const variantStyles: Record<CardVariant, string> = {
    mint: "bg-[var(--color-pastel-mint-bg)] border-[var(--color-brand-green)]/30 text-[var(--color-pastel-mint-text)] hover:border-[var(--color-pastel-mint-text)]",
    olive: "bg-[var(--color-pastel-olive-bg)] border-[#C6D4B7] text-[var(--color-pastel-olive-text)] hover:border-[var(--color-pastel-olive-text)]",
    sky: "bg-[var(--color-pastel-sky-bg)] border-[#BBD5E8] text-[var(--color-pastel-sky-text)] hover:border-[var(--color-pastel-sky-text)]",
    yellow: "bg-[var(--color-pastel-yellow-bg)] border-[#EFE2C5] text-[var(--color-pastel-yellow-text)] hover:border-[var(--color-pastel-yellow-text)]",
    rose: "bg-[var(--color-pastel-rose-bg)] border-[#EAD1CC] text-[var(--color-pastel-rose-text)] hover:border-[var(--color-pastel-rose-text)]",
    lavender: "bg-[var(--color-pastel-lavender-bg)] border-[#D7CAE9] text-[var(--color-pastel-lavender-text)] hover:border-[var(--color-pastel-lavender-text)]",
    peach: "bg-[var(--color-pastel-peach-bg)] border-[#EFE0D0] text-[var(--color-pastel-peach-text)] hover:border-[var(--color-pastel-peach-text)]",
    mist: "bg-[var(--color-pastel-mist-bg)] border-[#C8D4DC] text-[var(--color-pastel-mist-text)] hover:border-[var(--color-pastel-mist-text)]",
    sand: "bg-[var(--color-pastel-sand-bg)] border-[#E3E0D8] text-[var(--color-pastel-sand-text)] hover:border-[var(--color-pastel-sand-text)]",
    surface: "bg-[var(--color-neutral-surface)] border-gray-200 text-[var(--color-neutral-ink)] hover:border-[var(--color-forest-green)]",
    // 3단계 Neutral Scale 우측 3종 1:1 매칭 카드 스펙 (Surface #F9FAFB | Gray 200 #EDEFF2 | Gray 400 #B0B8C1)
    grayLight: "bg-[var(--color-pastel-gray-light-bg)] border-gray-200 text-[#191F28] hover:border-gray-400",
    grayMid: "bg-[var(--color-pastel-gray-mid-bg)] border-[#EDEFF2] text-[#191F28] hover:border-gray-500",
    grayDark: "bg-[var(--color-pastel-gray-dark-bg)] border-[#B0B8C1] text-white hover:border-[#191F28]",
  };

  const borderStyle = borderWidth === "2px" ? "border-2" : "border";
  const cursorStyle = clickable ? "cursor-pointer ui-card-accent-hover" : "transition-colors";

  return (
    <div
      onClick={onClick}
      className={`rounded-3xl p-[1.25rem] text-left relative overflow-hidden shadow-2xs ${borderStyle} ${variantStyles[variant]} ${cursorStyle} ${className}`}
    >
      {children}
    </div>
  );
}
