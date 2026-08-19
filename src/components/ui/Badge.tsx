"use client";

import React from "react";

export type BadgeVariant =
  | "mint"
  | "olive"
  | "sky"
  | "yellow"
  | "rose"
  | "lavender"
  | "peach"
  | "mist"
  | "sand"
  | "forest"
  | "dark"
  | "surface"
  | "outline"
  | "amber"; // 기존 하위 호환 유지

export interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  className?: string;
}

export function Badge({
  children,
  variant = "mint",
  size = "md",
  icon,
  className = "",
}: BadgeProps) {
  // 동일 톤앤매너 10종 파스텔 뱃지 스펙 (전역 CSS 변수 참조)
  const variantStyles: Record<BadgeVariant, string> = {
    mint: "bg-[var(--color-pastel-mint-bg)] text-[var(--color-pastel-mint-text)] font-bold",
    olive: "bg-[var(--color-pastel-olive-bg)] text-[var(--color-pastel-olive-text)] font-bold",
    sky: "bg-[var(--color-pastel-sky-bg)] text-[var(--color-pastel-sky-text)] font-bold",
    yellow: "bg-[var(--color-pastel-yellow-bg)] text-[var(--color-pastel-yellow-text)] font-bold",
    rose: "bg-[var(--color-pastel-rose-bg)] text-[var(--color-pastel-rose-text)] font-bold",
    lavender: "bg-[var(--color-pastel-lavender-bg)] text-[var(--color-pastel-lavender-text)] font-bold",
    peach: "bg-[var(--color-pastel-peach-bg)] text-[var(--color-pastel-peach-text)] font-bold",
    mist: "bg-[var(--color-pastel-mist-bg)] text-[var(--color-pastel-mist-text)] font-bold",
    sand: "bg-[var(--color-pastel-sand-bg)] text-[var(--color-pastel-sand-text)] font-bold",
    forest: "bg-[var(--color-forest-green)] text-white font-extrabold",
    dark: "bg-[var(--color-neutral-ink)] text-white font-extrabold",
    surface: "bg-[var(--color-neutral-surface)] text-[var(--color-neutral-gray-700)] font-bold",
    outline: "bg-white text-[var(--color-neutral-ink)] font-bold border border-gray-200",
    amber: "bg-[var(--color-pastel-yellow-bg)] text-[var(--color-pastel-yellow-text)] font-bold",
  };

  const sizeStyles = {
    sm: "px-[0.625rem] py-[0.25rem] text-[0.625rem] rounded-full gap-1",
    md: "px-[0.75rem] py-[0.375rem] text-[0.75rem] rounded-full gap-1.5",
    lg: "px-[1rem] py-[0.5rem] text-[0.75rem] rounded-full gap-1.5",
  };

  return (
    <span
      className={`inline-flex items-center justify-center tracking-tight leading-none shrink-0 ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
}
