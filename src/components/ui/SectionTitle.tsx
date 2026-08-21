"use client";

import React from "react";

interface SectionTitleProps {
  title: string;
  action?: React.ReactNode;
  className?: string;
}

/**
 * SectionTitle: 메인 대시보드 공통 섹션 중제목 컴포넌트
 * (클릭/링크 이동이 없는 순수 타이틀 정적 뷰어)
 */
export function SectionTitle({
  title,
  action,
  className = "",
}: SectionTitleProps) {
  return (
    <div className={`flex items-center justify-between px-0.5 py-0.5 select-none ${className}`}>
      <h2 className="text-[0.9375rem] font-bold text-gray-900 tracking-tight leading-none cursor-default">
        {title}
      </h2>
      {action && <div className="flex items-center">{action}</div>}
    </div>
  );
}
