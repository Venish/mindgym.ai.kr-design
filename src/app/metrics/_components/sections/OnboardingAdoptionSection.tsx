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
  Cell,
} from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/analytics/charts/ChartContainer";
import { mockFunnelData, mockOnboardingKPIs } from "../../_data/mockMetricsData";
import { CheckCircle, UsersThree, ArrowRight } from "@phosphor-icons/react";

export function OnboardingAdoptionSection() {
  return (
    <section id="onboarding-adoption" className="flex flex-col gap-6 scroll-mt-20">
      <div className="border-b border-gray-200 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-indigo-600" />
          <h2 className="text-lg font-bold text-gray-900 tracking-tight">
            1. 도입 및 온보딩 현황 (Adoption & Funnel)
          </h2>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          임직원 앱 설치부터 첫 리추얼 실행까지의 단계별 전환율 및 초기 정착률 지표
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 가입 및 온보딩 퍼널 차트 */}
        <div className="lg:col-span-2">
          <ChartContainer
            title="가입 및 첫 실행 온보딩 퍼널 (Funnel)"
            description="앱 설치(1,180명) 대비 최종 첫 리추얼 실행(864명)까지의 이탈/전환 추이"
            badge="전체 전환율 73.2%"
          >
            <ResponsiveContainer width="100%" height={280}>
              <BarChart
                data={mockFunnelData}
                layout="vertical"
                margin={{ top: 10, right: 30, left: 40, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" domain={[0, 1200]} stroke="#94a3b8" fontSize={12} tickLine={false} />
                <YAxis
                  type="category"
                  dataKey="step"
                  stroke="#475569"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  content={
                    <ChartTooltipContent
                      valueFormatter={(v: number) => `${v.toLocaleString()}명 (${((v / 1180) * 100).toFixed(1)}%)`}
                    />
                  }
                />
                <Bar dataKey="count" radius={[0, 8, 8, 0]} barSize={26}>
                  {mockFunnelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>

        {/* 초기 도입 및 재방문 정착률 스탯 카드 */}
        <div className="flex flex-col gap-4">
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs flex flex-col justify-between h-full">
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              초기 정착 & 리텐션 핵심 지표
            </h4>

            <div className="flex flex-col gap-4 my-2">
              <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                <div>
                  <div className="text-xs font-semibold text-gray-700">도입 정착률 (첫 주 3회)</div>
                  <div className="text-[11px] text-gray-400">설치 7일 내 3회 이상 완료</div>
                </div>
                <div className="text-lg font-bold text-indigo-600 tabular-nums">
                  {mockOnboardingKPIs.adoptionSettlementRate}%
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                <div>
                  <div className="text-xs font-semibold text-gray-700">첫 리추얼 전환율</div>
                  <div className="text-[11px] text-gray-400">가입 완료자 중 즉시 실행</div>
                </div>
                <div className="text-lg font-bold text-emerald-600 tabular-nums">
                  {mockOnboardingKPIs.firstRitualConversion}%
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                <div>
                  <div className="text-xs font-semibold text-gray-700">Day 1 재방문율</div>
                  <div className="text-[11px] text-gray-400">가입 익일 앱 재접속률</div>
                </div>
                <div className="text-lg font-bold text-sky-600 tabular-nums">
                  {mockOnboardingKPIs.day1Retention}%
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                <div>
                  <div className="text-xs font-semibold text-gray-700">Day 7 재방문율</div>
                  <div className="text-[11px] text-gray-400">가입 7일차 재접속률</div>
                </div>
                <div className="text-lg font-bold text-amber-600 tabular-nums">
                  {mockOnboardingKPIs.day7Retention}%
                </div>
              </div>
            </div>

            <p className="text-[11px] text-gray-400 leading-relaxed">
              * 웰비아이 권장 표준 정착률(70%) 대비 <strong className="text-indigo-600">+12.3%p</strong> 높은 초기 참여도를 보이고 있습니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
