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
        {/* 1. RadarGrid (Concentric Polygon Level Rings) */}
        {Array.from({ length: levels }).map((_, levelIndex) => {
          const levelRatio = (levelIndex + 1) / levels;
          const points = metrics
            .map((_, i) => {
              const angle = (Math.PI * 2 * i) / numMetrics - Math.PI / 2;
              const r = R * levelRatio;
              return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
            })
            .join(" ");

          return (
            <polygon
              key={`ring-${levelIndex}`}
              points={points}
              fill="none"
              stroke="#E2E8F0"
              strokeWidth={levelIndex + 1 === levels ? "1.5" : "1"}
              strokeDasharray={levelIndex + 1 === levels ? "none" : "3 3"}
            />
          );
        })}

        {/* 2. RadarAxis (Radial Lines) */}
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
              stroke="#E2E8F0"
              strokeWidth="1.2"
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

        {/* 4. RadarLabels (Metric Labels) */}
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
              className="text-[14px] font-semibold fill-gray-800 tracking-tight"
            >
              {m.label}
            </text>
          );
        })}
      </svg>

      {/* Hover Interactive Tooltip */}
      <AnimatePresence>
        {hoveredPoint && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            style={{
              left: hoveredPoint.x,
              top: hoveredPoint.y - 12,
            }}
            className="absolute -translate-x-1/2 -translate-y-full pointer-events-none z-20 bg-gray-900 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-lg flex items-center gap-1.5 whitespace-nowrap"
          >
            <span
              className="w-2 h-2 rounded-full inline-block"
              style={{ backgroundColor: hoveredPoint.color }}
            />
            <span>{hoveredPoint.metricLabel}:</span>
            <span className="text-[#00C474] font-extrabold">{hoveredPoint.value}점</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
