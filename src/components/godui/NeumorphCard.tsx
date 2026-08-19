"use client";

import React from "react";
import { cn } from "@/lib/utils";

export function NeumorphCard({
  children,
  className = "",
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "bg-white rounded-[24px] p-5 shadow-soft transition-all duration-300 hover:shadow-soft-depth",
        onClick && "cursor-pointer active:scale-[0.99]",
        className
      )}
    >
      {children}
    </div>
  );
}
