"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function BrandLogo({ className = "", size = "md" }: BrandLogoProps) {
  const heights = {
    sm: "h-[20px]",
    md: "h-[24px]",
    lg: "h-[30px]",
  };

  const pxHeights = {
    sm: 20,
    md: 24,
    lg: 30,
  };

  // viewBox 512 x 112 (Aspect ratio 4.57 : 1)
  const pxWidths = {
    sm: 91,
    md: 110,
    lg: 137,
  };

  return (
    <div className={cn("inline-flex items-center select-none cursor-default shrink-0", className)}>
      <Image
        src="/images/logo.svg"
        alt="MindGym Logo"
        width={pxWidths[size]}
        height={pxHeights[size]}
        className={cn("w-auto shrink-0 object-contain", heights[size])}
        priority
      />
    </div>
  );
}
