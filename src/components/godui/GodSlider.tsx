"use client";

import React, { useRef } from "react";

export interface GodSliderOption<T> {
  label: string;
  value: T;
  speedText?: string;
}

export interface GodSliderProps<T extends number> {
  value: T;
  options: GodSliderOption<T>[];
  onChange: (value: T) => void;
  title?: string;
  className?: string;
}

/**
 * GodSlider Component
 * 아날로그 하드웨어 볼륨 노브 / 조 조절 레버 느낌의 촉감 좋은 슬라이더 컨트롤 컴포넌트입니다.
 */
export function GodSlider<T extends number>({
  value,
  options,
  onChange,
  title = "파쇄 속도 조절",
  className = "",
}: GodSliderProps<T>) {
  const trackRef = useRef<HTMLDivElement | null>(null);

  // Find index of current selected value
  const currentIndex = options.findIndex((opt) => opt.value === value);
  const safeIndex = currentIndex !== -1 ? currentIndex : 0;
  const fillPercent = (safeIndex / Math.max(1, options.length - 1)) * 100;

  const currentOption = options[safeIndex];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const idx = parseInt(e.target.value, 10);
    if (options[idx]) {
      onChange(options[idx].value);
    }
  };

  return (
    <div className={`w-full flex flex-col gap-1.5 bg-[#F2F8F5] p-3 px-4 rounded-none ${className}`}>
      {/* 1. 상단 라벨 및 현재 값 표시 */}
      <div className="flex items-center justify-between select-none">
        <span className="text-xs font-bold text-gray-700">
          {title}
        </span>
        <span className="text-xs font-black text-[#008A50] bg-emerald-100/90 px-2.5 py-0.5 rounded-full font-mono">
          {currentOption?.label}
        </span>
      </div>

      {/* 2. 볼륨 슬라이더 트랙 & 인터랙티브 썸 노브 */}
      <div className="relative w-full py-2 flex items-center" ref={trackRef}>
        {/* 미활성 트랙 배경 */}
        <div className="w-full h-3 bg-emerald-100/70 rounded-full overflow-hidden relative border border-emerald-200/50">
          {/* Active Fill Gradient */}
          <div
            className="h-full bg-gradient-to-r from-[#00C473] to-[#009B5A] rounded-full transition-all duration-200"
            style={{ width: `${fillPercent}%` }}
          />
        </div>

        {/* 하드웨어 볼륨 슬라이더 Range Input (Overlay) */}
        <input
          type="range"
          min={0}
          max={options.length - 1}
          step={1}
          value={safeIndex}
          onChange={handleInputChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
        />

        {/* 볼륨 노브 (Volume Knob Visual Thumb) */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-7 h-7 bg-white rounded-full border-2 border-[#00C473] shadow-[0_3px_10px_rgba(0,196,115,0.35)] flex items-center justify-center pointer-events-none transition-all duration-200 z-10"
          style={{ left: `calc(${fillPercent}% - 14px)` }}
        >
          {/* 노브 중앙 그립 바 */}
          <div className="w-1.5 h-3 bg-[#00C473] rounded-full" />
        </div>
      </div>
    </div>
  );
}
