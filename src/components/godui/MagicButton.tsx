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
  const baseStyles = "group relative inline-flex items-center justify-center overflow-hidden rounded-xl font-semibold ui-btn-action";
  
  const variantStyles = {
    primary: "bg-[var(--color-brand-green)] text-white shadow-[0_4px_20px_rgba(0,196,115,0.25)] hover:opacity-95",
    secondary: "bg-emerald-50 text-[var(--color-brand-green)] hover:bg-emerald-100",
    outline: "bg-white text-gray-700 hover:bg-gray-50 shadow-soft border border-gray-200/80",
    ghost: "bg-transparent text-gray-400 hover:text-gray-600 shadow-none font-medium",
  };

  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      className={cn(baseStyles, variantStyles[variant], "px-6 py-3 text-base min-h-[44px]", className)}
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
