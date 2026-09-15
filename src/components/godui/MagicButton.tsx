"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagicButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  rightIcon?: React.ReactNode;
}

export function MagicButton({
  children,
  className = "",
  variant = "primary",
  rightIcon,
  ...props
}: MagicButtonProps) {
  const baseStyles = "group relative inline-flex items-center justify-center overflow-hidden rounded-2xl font-bold ui-btn-action transition-all duration-200 cursor-pointer select-none";
  
  const variantStyles = {
    primary: "bg-[var(--color-brand-green)] text-white shadow-[0_4px_20px_rgba(0,196,115,0.22)] hover:opacity-95 active:scale-[0.96]",
    secondary: "bg-emerald-50 dark:bg-emerald-950/50 text-[var(--color-brand-green)] hover:bg-emerald-100 dark:hover:bg-emerald-900/50",
    outline: "bg-theme-card text-theme-main hover:bg-theme-card-subtle shadow-soft border border-theme-subtle",
    ghost: "bg-transparent text-theme-muted hover:text-theme-main shadow-none font-medium text-[13px] min-h-[40px] rounded-xl",
  };

  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      className={cn(
        baseStyles,
        variantStyles[variant],
        variant === "ghost" ? "px-4 py-2 min-h-[40px]" : "px-6 py-3.5 text-[15px] min-h-[52px]",
        className
      )}
      {...(props as any)}
    >
      {/* 텍스트: 정중앙 정렬 */}
      <span className="relative z-10 flex items-center justify-center text-center">
        {children}
      </span>

      {/* 우측 아이콘: absolute 우측 정렬 */}
      {rightIcon && (
        <span className="absolute right-5 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center">
          {rightIcon}
        </span>
      )}
    </motion.button>
  );
}
