"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface RadarMetric {
  key: string;
  label: string;
  sub?: string;
  maxValue?: number;
}

export interface RadarSeries {
  label: string;
  color: string;
  values: Record<string, number>;
}

interface RadarChartProps {
  metrics: RadarMetric[];
  data: RadarSeries[];
  size?: number;
  levels?: number;
  className?: string;
}

export function BklitRadarChart({
  metrics,
  data,
  size = 280,
  levels = 5,
  className = "",
}: RadarChartProps) {
  const [hoveredPoint, setHoveredPoint] = useState<{
    metricLabel: string;
    value: number;
    x: number;
    y: number;
    color: string;
  } | null>(null);

  const cx = size / 2;
  const cy = size / 2;
  const R = (size / 2) * 0.72;
  const numMetrics = metrics.length;

  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="overflow-visible"
      >
        {/* 1. RadarGrid (5단계 레벨 영역 파스텔 틴트 Zone Fill concentric polygon rings) */}
        {Array.from({ length: levels })
          .map((_, i) => levels - 1 - i) // 역순 렌더링으로 큰 링 위에 작은 링이 예쁘게 포개짐
          .map((levelIndex) => {
            const levelRatio = (levelIndex + 1) / levels;
            const points = metrics
              .map((_, i) => {
                const angle = (Math.PI * 2 * i) / numMetrics - Math.PI / 2;
                const r = R * levelRatio;
                return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
              })
              .join(" ");

            const levelFills = [
              "rgba(0, 196, 116, 0.10)", // Level 1 (중심 0~2점: 최상/안전 에메랄드)
              "rgba(0, 196, 116, 0.04)", // Level 2 (2~4점: 양호 에메랄드)
              "rgba(251, 140, 0, 0.05)", // Level 3 (4~6점: 보통 옐로우/오렌지)
              "rgba(251, 140, 0, 0.09)", // Level 4 (6~8점: 주의 오렌지)
              "rgba(229, 57, 53, 0.08)", // Level 5 (외곽 8~10점: 위험/경고 로즈)
            ];

            return (
              <polygon
                key={`ring-${levelIndex}`}
                points={points}
                fill={levelFills[levelIndex] || "none"}
                stroke="none"
              />
            );
          })}

        {/* 2. RadarAxis (Radial Lines - 테두리선 제거로 최소화) */}
        {metrics.map((_, i) => {
          const angle = (Math.PI * 2 * i) / numMetrics - Math.PI / 2;
          const x2 = cx + R * Math.cos(angle);
          const y2 = cy + R * Math.sin(angle);
          return (
            <line
              key={`axis-${i}`}
              x1={cx}
              y1={cy}
              x2={x2}
              y2={y2}
              stroke="rgba(226, 232, 240, 0.4)"
              strokeWidth="0.8"
            />
          );
        })}

        {/* 3. RadarArea (Animated Series Polygons & Points) */}
        {data.map((series, seriesIndex) => {
          const points = metrics
            .map((m, i) => {
              const max = m.maxValue || 10;
              const val = series.values[m.key] ?? 0;
              const angle = (Math.PI * 2 * i) / numMetrics - Math.PI / 2;
              const r = (R * Math.min(val, max)) / max;
              return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
            })
            .join(" ");

          return (
            <g key={`series-${seriesIndex}`}>
              {/* Polygon Area */}
              <motion.polygon
                initial={{ opacity: 0, scale: 0.2 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: seriesIndex * 0.15 }}
                style={{ transformOrigin: `${cx}px ${cy}px` }}
                points={points}
                fill={`${series.color}25`}
                stroke={series.color}
                strokeWidth="2.8"
                strokeLinejoin="round"
              />

              {/* Points */}
              {metrics.map((m, i) => {
                const max = m.maxValue || 10;
                const val = series.values[m.key] ?? 0;
                const angle = (Math.PI * 2 * i) / numMetrics - Math.PI / 2;
                const r = (R * Math.min(val, max)) / max;
                const px = cx + r * Math.cos(angle);
                const py = cy + r * Math.sin(angle);

                return (
                  <motion.circle
                    key={`point-${seriesIndex}-${i}`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.4 + i * 0.05 }}
                    cx={px}
                    cy={py}
                    r="4.5"
                    fill={series.color}
                    stroke="#ffffff"
                    strokeWidth="2"
                    className="cursor-pointer transition-transform hover:scale-150"
                    onMouseEnter={() =>
                      setHoveredPoint({
                        metricLabel: m.label,
                        value: val,
                        x: px,
                        y: py,
                        color: series.color,
                      })
                    }
                    onMouseLeave={() => setHoveredPoint(null)}
                  />
                );
              })}
            </g>
          );
        })}

        {/* 4. RadarLabels (Metric Labels: bklit.com 모던 타이포 규격 적용) */}
        {metrics.map((m, i) => {
          const angle = (Math.PI * 2 * i) / numMetrics - Math.PI / 2;
          const labelRadius = R + 26;
          const lx = cx + labelRadius * Math.cos(angle);
          const ly = cy + labelRadius * Math.sin(angle);

          return (
            <text
              key={`label-${i}`}
              x={lx}
              y={ly}
              textAnchor="middle"
              dominantBaseline="central"
              className="text-[12.5px] font-bold fill-gray-800 tracking-tight"
            >
              {m.label}
            </text>
          );
        })}
      </svg>

      {/* Hover Interactive Tooltip (bklit.com 공식 섀도우 & 툴팁 스타일) */}
      <AnimatePresence>
        {hoveredPoint && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            style={{
              left: hoveredPoint.x,
              top: hoveredPoint.y - 12,
            }}
            className="absolute -translate-x-1/2 -translate-y-full pointer-events-none z-20 bg-gray-900/95 backdrop-blur-xs text-white text-[12px] font-bold px-3 py-1.5 rounded-xl shadow-2xl border border-gray-800 flex items-center gap-1.5 whitespace-nowrap"
          >
            <span
              className="w-2 h-2 rounded-full inline-block shrink-0"
              style={{ backgroundColor: hoveredPoint.color }}
            />
            <span className="text-gray-300 font-semibold">{hoveredPoint.metricLabel}:</span>
            <span className="text-[#00C474] font-black">{hoveredPoint.value}점</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * SpiderChart: 스파이더 차트 스킬 규격용 명시적 Alias 컴포넌트 Export
 */
export const SpiderChart = BklitRadarChart;
