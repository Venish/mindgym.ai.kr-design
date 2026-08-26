"use client";

import React from "react";

export interface GodMemoPaperProps {
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  title?: string;
  icon?: string;
  minHeight?: string;
  readOnly?: boolean;
  className?: string;
}

/**
 * GodMemoPaper Component
 * Warm Ivory Cream 종이 텍스처, 아날로그 마스킹 테이프, 은은한 원고지 줄눈이 표현된 아날로그 메모지 컴포넌트입니다.
 */
export function GodMemoPaper({
  value,
  onChange,
  placeholder = "이곳에 마음을 솔직하게 적어보세요...",
  title,
  icon = "📝",
  minHeight = "min-h-[170px]",
  readOnly = false,
  className = "",
}: GodMemoPaperProps) {
  return (
    <div
      className={`w-full border border-[#EBE3D3] focus-within:border-[#00C473] focus-within:ring-3 focus-within:ring-[#00C473]/15 rounded-xs p-5 pt-6 shadow-[0_10px_25px_-5px_rgba(180,165,140,0.25),0_2px_6px_rgba(0,0,0,0.03)] relative transition-all duration-200 my-3 ${minHeight} ${className}`}
      style={{
        background: "radial-gradient(ellipse at top left, #FFFDF8 0%, #FAF5EA 100%)",
      }}
    >
      {/* 1. 상단 아날로그 마스킹 테이프 스티커 (Vintage Washi Tape) */}
      <div
        className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-28 h-6 bg-[#F5E5C9] border border-[#E2CB9F] rounded-xs shadow-sm rotate-[-1.5deg] z-20 pointer-events-none flex items-center justify-center"
      >
        <div className="w-16 h-[1.5px] bg-amber-900/25 rounded-full" />
      </div>

      {/* 2. 타이틀 헤더 */}
      {title && (
        <div className="flex items-center justify-between mb-2 select-none">
          <h4 className="text-xs font-bold text-amber-900/80 flex items-center gap-1">
            <span>{icon}</span> {title}
          </h4>
        </div>
      )}

      {/* 3. 종이 텍스처 및 은은한 원고지 줄눈 내장 Textarea */}
      <textarea
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        placeholder={placeholder}
        className="w-full h-full bg-transparent border-none outline-none text-base font-semibold text-gray-800 placeholder-amber-900/35 resize-none leading-[2rem] min-h-[120px]"
        style={{
          lineHeight: "2rem",
          backgroundImage: "linear-gradient(transparent 92%, #EAE0CE 92%)",
          backgroundSize: "100% 2rem",
        }}
      />
    </div>
  );
}
