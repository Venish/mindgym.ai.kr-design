"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function BrandLogo({ className = "", size = "md" }: BrandLogoProps) {
  const iconSizes = {
    sm: 18,
    md: 22,
    lg: 28,
  };

  const textClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  return (
    <div className={cn("inline-flex items-center gap-1.5 select-none cursor-pointer", className)}>
      <svg
        width={iconSizes[size]}
        height={iconSizes[size]}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        <path d="M16 4V28" stroke="#00C473" strokeWidth="4" strokeLinecap="round" />
        <path d="M6 10L26 22" stroke="#00C473" strokeWidth="4" strokeLinecap="round" />
        <path d="M6 22L26 10" stroke="#00C473" strokeWidth="4" strokeLinecap="round" />
      </svg>
      <span className={cn("font-black tracking-tight text-[#191F28] lowercase leading-none", textClasses[size])}>
        mindgym
      </span>
    </div>
  );
}
