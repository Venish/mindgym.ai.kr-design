"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/analytics/charts/ChartContainer";
import {
  mockTopRituals,
  mockRitualThemeDistribution,
  mockContentEngagement,
} from "../../_data/mockMetricsData";
import { Bell, Newspaper, WarningCircle, FirstAid } from "@phosphor-icons/react";

export function RitualsContentSection() {
  return (
    <section id="rituals-content" className="flex flex-col gap-6 scroll-mt-20">
      <div className="border-b border-gray-200 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-purple-500" />
          <h2 className="text-lg font-bold text-gray-900 tracking-tight">
            4. 리추얼 선호도 및 안전망 분석 (Rituals & Safety Net)
          </h2>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          최다 실행 TOP 10 리추얼, 6대 웰니스 테마 비중, 푸시/매거진 인게이지먼트 및 SOS 케어 반응률
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 리추얼 최다 실행 TOP 10 가로 바 차트 */}
        <div className="lg:col-span-2">
          <ChartContainer
            title="가장 많이 실행된 리추얼 TOP 10"
            description="호흡/스트레스 완화 및 수면 유도 리추얼이 전체 실행의 과반수를 견인"
            badge="TOP 10 랭킹"
          >
            <ResponsiveContainer width="100%" height={360}>
              <BarChart
                data={mockTopRituals}
                layout="vertical"
                margin={{ top: 10, right: 30, left: 70, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis
                  type="category"
                  dataKey="name"
                  stroke="#475569"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  content={
                    <ChartTooltipContent
                      valueFormatter={(v: number) => `${v.toLocaleString()}회`}
                    />
                  }
                />
                <Bar
                  dataKey="runs"
                  name="실행 횟수"
                  fill="#818cf8"
                  radius={[0, 6, 6, 0]}
                  barSize={18}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>

        {/* 6대 테마별 실행 비중 도넛 차트 */}
        <ChartContainer
          title="6대 테마별 실행 비중"
          description="스트레스 해소와 수면이 전체의 52% 차지"
          badge="테마 선호도"
        >
          <div className="flex flex-col items-center w-full">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={mockRitualThemeDistribution}
                  dataKey="value"
                  nameKey="theme"
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={3}
                >
                  {mockRitualThemeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  content={
                    <ChartTooltipContent
                      valueFormatter={(v: number) => `${v}%`}
                    />
                  }
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="w-full grid grid-cols-2 gap-1.5 mt-2">
              {mockRitualThemeDistribution.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-[11px] px-2 py-1 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="text-gray-700 truncate">{item.theme}</span>
                  </div>
                  <span className="font-bold text-gray-900 tabular-nums">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </ChartContainer>
      </div>

      {/* 알림 및 콘텐츠 & 안전망(SOS) KPI 그리드 */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-3.5 bg-white rounded-xl border border-gray-100 flex flex-col justify-between">
          <div className="flex items-center gap-1.5 text-gray-500 text-xs">
            <Bell size={14} className="text-indigo-600" />
            <span>푸시 클릭률</span>
          </div>
          <div className="text-lg font-bold text-gray-900 mt-2 tabular-nums">
            {mockContentEngagement.pushClickRate}%
          </div>
        </div>

        <div className="p-3.5 bg-white rounded-xl border border-gray-100 flex flex-col justify-between">
          <div className="flex items-center gap-1.5 text-gray-500 text-xs">
            <Bell size={14} className="text-indigo-600" />
            <span>30분내 복귀율</span>
          </div>
          <div className="text-lg font-bold text-gray-900 mt-2 tabular-nums">
            {mockContentEngagement.pushReturnRate}%
          </div>
        </div>

        <div className="p-3.5 bg-white rounded-xl border border-gray-100 flex flex-col justify-between">
          <div className="flex items-center gap-1.5 text-gray-500 text-xs">
            <Bell size={14} className="text-indigo-600" />
            <span>즉시 실행 전환율</span>
          </div>
          <div className="text-lg font-bold text-indigo-600 mt-2 tabular-nums">
            {mockContentEngagement.pushActionRate}%
          </div>
        </div>

        <div className="p-3.5 bg-white rounded-xl border border-gray-100 flex flex-col justify-between">
          <div className="flex items-center gap-1.5 text-gray-500 text-xs">
            <Newspaper size={14} className="text-purple-600" />
            <span>매거진 열람률</span>
          </div>
          <div className="text-lg font-bold text-gray-900 mt-2 tabular-nums">
            {mockContentEngagement.magazineReadRate}%
          </div>
        </div>

        <div className="p-3.5 bg-white rounded-xl border border-gray-100 flex flex-col justify-between">
          <div className="flex items-center gap-1.5 text-gray-500 text-xs">
            <WarningCircle size={14} className="text-rose-600" />
            <span>SOS 긴급케어 비중</span>
          </div>
          <div className="text-lg font-bold text-rose-600 mt-2 tabular-nums">
            {mockContentEngagement.sosUsageRatio}%
          </div>
        </div>

        <div className="p-3.5 bg-white rounded-xl border border-gray-100 flex flex-col justify-between">
          <div className="flex items-center gap-1.5 text-gray-500 text-xs">
            <FirstAid size={14} className="text-emerald-600" />
            <span>EAP 현장케어 신청</span>
          </div>
          <div className="text-lg font-bold text-emerald-600 mt-2 tabular-nums">
            {mockContentEngagement.onSiteCareRequests}건
          </div>
        </div>
      </div>
    </section>
  );
}
