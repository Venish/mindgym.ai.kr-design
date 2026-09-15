"use client";

import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
} from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/analytics/charts/ChartContainer";
import { mockActiveTrendData, mockRetentionCohort } from "../../_data/mockMetricsData";

export function ActivationRetentionSection() {
  return (
    <section id="activation-retention" className="flex flex-col gap-6 scroll-mt-20">
      <div className="border-b border-gray-200 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <h2 className="text-lg font-bold text-gray-900 tracking-tight">
            2. 활성도 및 지속 잔존율 (Activation & Cohort Retention)
          </h2>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          월간/주간 활성 사용자(MAU/WAU)의 성장 추이 및 3개월 코호트 지속 사용률 분석
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* MAU / WAU 활성 사용자 추이 에어리어 차트 */}
        <ChartContainer
          title="월간/주간 활성 사용자(MAU & WAU) 추이"
          description="최근 6개월간 지속적인 사용자 유입 및 정기 참여 임직원 증가세"
          badge="MAU 892명 (+53.7%)"
        >
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart
              data={mockActiveTrendData}
              margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorMau" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorWau" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip
                content={
                  <ChartTooltipContent
                    valueFormatter={(v: number) => `${v.toLocaleString()}명`}
                  />
                }
              />
              <Legend
                wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }}
                iconType="circle"
              />
              <Area
                type="monotone"
                dataKey="mau"
                name="월간 활성 (MAU)"
                stroke="#6366f1"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#colorMau)"
              />
              <Area
                type="monotone"
                dataKey="wau"
                name="주간 활성 (WAU)"
                stroke="#10b981"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorWau)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>

        {/* 지속 및 코호트 잔존율 바 차트 */}
        <ChartContainer
          title="기간별 지속 잔존율 vs 벤치마크"
          description="웰니스 솔루션 업계 벤치마크 대비 높은 지속 참여율 유지"
          badge="업계 평균 대비 +18%p"
        >
          <ResponsiveContainer width="100%" height={280}>
            <BarChart
              data={mockRetentionCohort}
              margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="cohort" stroke="#94a3b8" fontSize={11} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} unit="%" />
              <Tooltip
                content={
                  <ChartTooltipContent
                    valueFormatter={(v: number) => `${v}%`}
                  />
                }
              />
              <Legend
                wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }}
                iconType="circle"
              />
              <Bar dataKey="rate" name="웰비아이 조직 달성률" fill="#6366f1" radius={[6, 6, 0, 0]} barSize={20} />
              <Bar dataKey="benchmark" name="업계 평균 벤치마크" fill="#e2e8f0" radius={[6, 6, 0, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </section>
  );
}
