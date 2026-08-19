"use client";

import React from "react";
import Image from "next/image";
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
      <Image
        src="/images/logo_icon.svg"
        alt="MindGym Logo Icon"
        width={iconSizes[size]}
        height={iconSizes[size]}
        className="shrink-0"
        priority
      />
      <span className={cn("font-black tracking-tight txt-brand-ink lowercase leading-none", textClasses[size])}>
        mindgym
      </span>
    </div>
  );
}
