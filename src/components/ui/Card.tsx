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
  // 10가지 파스텔 팔레트 및 3단계 Neutral Gray Card 전면 무테(borderless) 스펙
  const variantStyles: Record<CardVariant, string> = {
    mint: "bg-[var(--color-pastel-mint-bg)] border-transparent text-[var(--color-pastel-mint-text)]",
    olive: "bg-[var(--color-pastel-olive-bg)] border-transparent text-[var(--color-pastel-olive-text)]",
    sky: "bg-[var(--color-pastel-sky-bg)] border-transparent text-[var(--color-pastel-sky-text)]",
    yellow: "bg-[var(--color-pastel-yellow-bg)] border-transparent text-[var(--color-pastel-yellow-text)]",
    rose: "bg-[var(--color-pastel-rose-bg)] border-transparent text-[var(--color-pastel-rose-text)]",
    lavender: "bg-[var(--color-pastel-lavender-bg)] border-transparent text-[var(--color-pastel-lavender-text)]",
    peach: "bg-[var(--color-pastel-peach-bg)] border-transparent text-[var(--color-pastel-peach-text)]",
    mist: "bg-[var(--color-pastel-mist-bg)] border-transparent text-[var(--color-pastel-mist-text)]",
    sand: "bg-[var(--color-pastel-sand-bg)] border-transparent text-[var(--color-pastel-sand-text)]",
    surface: "bg-[var(--color-neutral-surface)] border-transparent text-[var(--color-neutral-ink)]",
    grayLight: "bg-[var(--color-pastel-gray-light-bg)] border-transparent text-[#191F28]",
    grayMid: "bg-[var(--color-pastel-gray-mid-bg)] border-transparent text-[#191F28]",
    grayDark: "bg-[var(--color-pastel-gray-dark-bg)] border-transparent text-white",
  };

  const borderStyle = "border border-transparent";
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
