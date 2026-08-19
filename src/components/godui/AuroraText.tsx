"use client";

import React from "react";
import { cn } from "@/lib/utils";

export function AuroraText({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "bg-gradient-to-r from-emerald-500 via-teal-400 to-sky-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-aurora font-black",
        className
      )}
    >
      {children}
    </span>
  );
}
