"use client";

import React from "react";

interface CommonCardGridProps {
  children: React.ReactNode;
  cols?: 1 | 2 | 3 | 4;
  className?: string;
}

/**
 * CommonCardGrid: 마인드짐 카드 및 리추얼 전역 공통 그리드 레이아웃
 * - 기본값: 3열 카드 그리드 (`grid-cols-3 gap-2.5`)
 */
export function CommonCardGrid({
  children,
  cols = 3,
  className = "",
}: CommonCardGridProps) {
  const colClasses = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
  };

  return (
    <div className={`grid ${colClasses[cols]} gap-2.5 w-full ${className}`}>
      {children}
    </div>
  );
}
