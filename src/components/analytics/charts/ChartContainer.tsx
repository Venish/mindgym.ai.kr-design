"use client";

import React from "react";
import { clsx } from "clsx";

export interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  badge?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}

/**
 * Bklit UI 스타일의 모던 차트 카드 래퍼 컴포넌트
 * - 순수 흰색 카드에만 섬세한 헤어라인 테두리 적용 (프로젝트 원칙)
 * - 상단 타이틀, 캡션, 뱃지, 우측 액션 슬롯 지원
 */
export function ChartContainer({
  title,
  description,
  badge,
  action,
  children,
  className,
  ...props
}: ChartContainerProps) {
  return (
    <div
      className={clsx(
        "bg-white rounded-2xl border border-[var(--color-border-card,#E5E7EB)] p-6 shadow-sm flex flex-col justify-between transition-all duration-200 hover:shadow-md",
        className
      )}
      {...props}
    >
      {(title || description || badge || action) && (
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              {title && (
                <h3 className="text-base font-bold text-[var(--color-brand-ink,#111827)] tracking-tight">
                  {title}
                </h3>
              )}
              {badge && (
                <span className="px-2 py-0.5 text-[11px] font-semibold tracking-wide rounded-full bg-indigo-50 text-indigo-600">
                  {badge}
                </span>
              )}
            </div>
            {description && (
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                {description}
              </p>
            )}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}
      <div className="w-full flex-1 min-h-[260px] flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}

/**
 * Bklit UI 커스텀 툴팁
 */
export function ChartTooltipContent({
  active,
  payload,
  label,
  valueFormatter = (val: any) => `${val}`,
}: any) {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-xl shadow-lg border border-gray-100 text-xs font-sans pointer-events-none z-50">
      {label && <div className="font-bold text-gray-900 mb-1.5 pb-1 border-b border-gray-100">{label}</div>}
      <div className="flex flex-col gap-1">
        {payload.map((entry: any, index: number) => (
          <div key={`item-${index}`} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-1.5">
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: entry.color || entry.fill }}
              />
              <span className="text-gray-600">{entry.name}:</span>
            </div>
            <span className="font-bold text-gray-900 tabular-nums">
              {valueFormatter(entry.value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
