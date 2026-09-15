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
  mockVolumeKPIs,
  mockUserVolumeSegments,
  mockTimeOfDayData,
} from "../../_data/mockMetricsData";
import { Clock, Lightning, Flame } from "@phosphor-icons/react";

export function EngagementPatternSection() {
  return (
    <section id="engagement-pattern" className="flex flex-col gap-6 scroll-mt-20">
      <div className="border-b border-gray-200 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-500" />
          <h2 className="text-lg font-bold text-gray-900 tracking-tight">
            3. 실행량 및 시간대별 루틴 패턴 (Volume & Time Patterns)
          </h2>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          총 실행량(리추얼 및 체크인), 사용자 사용량 구간(Light/Medium/Heavy), 출퇴근/취침 시간대별 집중 패턴
        </p>
      </div>

      {/* 실행량 요약 미니 카드 4종 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
          <span className="text-[11px] font-semibold text-gray-400">총 마음 체크인</span>
          <div className="text-xl font-bold text-gray-900 mt-1 tabular-nums">
            {mockVolumeKPIs.totalCheckins.toLocaleString()}회
          </div>
          <span className="text-[11px] text-emerald-600 mt-0.5 block">감정 기록 활발</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
          <span className="text-[11px] font-semibold text-gray-400">1인당 월평균 실행</span>
          <div className="text-xl font-bold text-gray-900 mt-1 tabular-nums">
            {mockVolumeKPIs.avgRunsPerUserMonth}회
          </div>
          <span className="text-[11px] text-gray-400 mt-0.5 block">주 4.2회 수준</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
          <span className="text-[11px] font-semibold text-gray-400">평균 소요 시간</span>
          <div className="text-xl font-bold text-gray-900 mt-1 tabular-nums">
            {mockVolumeKPIs.avgCompletionTimeMinutes}
          </div>
          <span className="text-[11px] text-indigo-600 mt-0.5 block">마이크로 리추얼 지향</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
          <span className="text-[11px] font-semibold text-gray-400">평균 연속 스트릭</span>
          <div className="text-xl font-bold text-gray-900 mt-1 tabular-nums">
            {mockVolumeKPIs.avgStreakDays}일 연속
          </div>
          <span className="text-[11px] text-amber-600 mt-0.5 block">습관 형성 단계</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 시간대별 실행 집중도 바 차트 (출근 및 취침 피크) */}
        <div className="lg:col-span-2">
          <ChartContainer
            title="시간대별 리추얼 실행 분포 (24H Timeline)"
            description="오전 8시(출근/아침 활력)와 밤 22시(수면/숙면 이완)에 최고 피크 형성"
            badge="골든 타임 분석"
          >
            <ResponsiveContainer width="100%" height={280}>
              <BarChart
                data={mockTimeOfDayData}
                margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
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
                  fill="#6366f1"
                  radius={[6, 6, 0, 0]}
                  barSize={24}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>

        {/* 사용자 사용량 구간 파이 차트 */}
        <ChartContainer
          title="사용량 구간별 인원 분포"
          description="월 6회 이상 정기적으로 실천하는 코어 유저 비중 72.5%"
          badge="충성도 세그먼트"
        >
          <div className="flex flex-col items-center w-full">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={mockUserVolumeSegments}
                  dataKey="percentage"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={4}
                >
                  {mockUserVolumeSegments.map((entry, index) => (
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
            <div className="w-full flex flex-col gap-1.5 mt-2">
              {mockUserVolumeSegments.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs px-2 py-1 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-gray-700 font-medium">{item.name}</span>
                  </div>
                  <span className="font-bold text-gray-900 tabular-nums">{item.count}명 ({item.percentage}%)</span>
                </div>
              ))}
            </div>
          </div>
        </ChartContainer>
      </div>
    </section>
  );
}
