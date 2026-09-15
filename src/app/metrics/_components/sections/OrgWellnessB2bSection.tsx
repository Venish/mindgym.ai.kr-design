"use client";

import React from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  PieChart,
  Pie,
} from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/analytics/charts/ChartContainer";
import {
  mockKossRadarData,
  mockRiskDistribution,
  mockDepartmentStats,
  mockOrgWellnessHistory,
} from "../../_data/mockMetricsData";
import { ShieldCheck, Buildings, ChartLineUp } from "@phosphor-icons/react";

export function OrgWellnessB2bSection() {
  return (
    <section id="org-wellness-b2b" className="flex flex-col gap-6 scroll-mt-20">
      <div className="border-b border-gray-200 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-rose-500" />
          <h2 className="text-lg font-bold text-gray-900 tracking-tight">
            5. [B2B] 조직 직무스트레스 & 부서 리포트 (Organization Health)
          </h2>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          한국인 직무스트레스(KOSS) 7대 영역 진단 점수, 4단계 위험군 분포, 부서별 웰니스 점수 및 개선 폭
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* KOSS 7대 영역 방사형 레이더(스파이더) 차트 */}
        <div className="lg:col-span-2">
          <ChartContainer
            title="한국인 직무스트레스 (KOSS) 7대 영역 진단"
            description="우리 조직의 7대 영역별 마음건강 점수 (점수가 높을수록 양호한 상태)"
            badge="조직 종합 78.2점"
          >
            <ResponsiveContainer width="100%" height={320}>
              <RadarChart data={mockKossRadarData} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
                <PolarGrid stroke="#e2e8f0" strokeDasharray="3 3" />
                <PolarAngleAxis dataKey="area" tick={{ fill: "#334155", fontSize: 12, fontWeight: 600 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#94a3b8" tick={{ fontSize: 10 }} />
                <Tooltip
                  content={
                    <ChartTooltipContent
                      valueFormatter={(v: number) => `${v}점 / 100점`}
                    />
                  }
                />
                <Radar
                  name="우리 조직 점수"
                  dataKey="score"
                  stroke="#6366f1"
                  fill="#6366f1"
                  fillOpacity={0.45}
                />
                <Radar
                  name="업계 표준 벤치마크"
                  dataKey="benchmark"
                  stroke="#94a3b8"
                  fill="#94a3b8"
                  fillOpacity={0.15}
                />
              </RadarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>

        {/* 4단계 마음건강 등급 분포 도넛 차트 */}
        <ChartContainer
          title="조직원 마음건강 4단계 등급 분포"
          description="안정군 51.8%, 고위험군 4.2%로 관리 가이드라인 범위 내 유지"
          badge="안정군 82.3%"
        >
          <div className="flex flex-col items-center w-full">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={mockRiskDistribution}
                  dataKey="rate"
                  nameKey="level"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={3}
                >
                  {mockRiskDistribution.map((entry, index) => (
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
              {mockRiskDistribution.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs px-2 py-1 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-gray-700 font-medium">{item.level}</span>
                  </div>
                  <span className="font-bold text-gray-900 tabular-nums">
                    {item.count}명 ({item.rate}%)
                  </span>
                </div>
              ))}
            </div>
          </div>
        </ChartContainer>
      </div>

      {/* 부서별 마음건강 점수 및 개선 폭 테이블 & 바 */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-gray-900">
              부서별 마음건강 진단 결과 및 개선 폭 비교
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              조직 내 부서별 평균 환산 점수, 활성 참여율 및 전월 대비 개선(Delta) 지표
            </p>
          </div>
          <span className="text-xs font-semibold px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full">
            총 7개 사업부문
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-gray-400 font-medium">
                <th className="py-3 px-3">부서명</th>
                <th className="py-3 px-3">소속 인원</th>
                <th className="py-3 px-3">마음건강 평균 점수</th>
                <th className="py-3 px-3">전월 대비 개선</th>
                <th className="py-3 px-3">리추얼 활성율</th>
                <th className="py-3 px-3">주의/위험군 비율</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-gray-700 font-medium">
              {mockDepartmentStats.map((dept, idx) => (
                <tr key={idx} className="hover:bg-gray-50/80 transition-colors">
                  <td className="py-3 px-3 font-bold text-gray-900 flex items-center gap-2">
                    <Buildings size={14} className="text-gray-400" />
                    <span>{dept.dept}</span>
                  </td>
                  <td className="py-3 px-3 tabular-nums">{dept.employees}명</td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-100 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-indigo-600 h-full rounded-full"
                          style={{ width: `${dept.avgScore}%` }}
                        />
                      </div>
                      <span className="font-bold text-gray-900 tabular-nums">
                        {dept.avgScore}점
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-3 font-bold text-emerald-600 tabular-nums">
                    {dept.delta}점
                  </td>
                  <td className="py-3 px-3 tabular-nums text-indigo-600 font-semibold">
                    {dept.activeRate}%
                  </td>
                  <td className="py-3 px-3 tabular-nums text-rose-500">
                    {dept.riskRate}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
