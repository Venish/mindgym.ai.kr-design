"use client";

import React from "react";
import {
  Users,
  Fire,
  CheckCircle,
  TrendUp,
  ArrowUpRight,
  ShieldCheck,
} from "@phosphor-icons/react";
import { mockSummaryKPI } from "../../_data/mockMetricsData";

export function MetricOverviewKpi() {
  const kpiCards = [
    {
      title: "월간 활성 임직원 (MAU)",
      value: `${mockSummaryKPI.monthlyActiveUsers.toLocaleString()}명`,
      sub: `발급 인원(${mockSummaryKPI.accountIssuedCount}명) 대비 71.4%`,
      trend: "+8.2% 전월대비",
      icon: Users,
      color: "indigo",
      bgGradient: "from-indigo-50/50 to-white",
    },
    {
      title: "월간 총 리추얼 실행수",
      value: `${mockSummaryKPI.monthlyRitualCompletions.toLocaleString()}회`,
      sub: "1인당 월평균 16.6회 실행",
      trend: "+14.3% 전월대비",
      icon: Fire,
      color: "emerald",
      bgGradient: "from-emerald-50/50 to-white",
    },
    {
      title: "리추얼 완주율 (Completion)",
      value: `${mockSummaryKPI.avgCompletionRate}%`,
      sub: "시작 후 끝까지 완료한 비율",
      trend: "+2.1%p 향상",
      icon: CheckCircle,
      color: "sky",
      bgGradient: "from-sky-50/50 to-white",
    },
    {
      title: "조직 마음건강 환산 점수",
      value: `${mockSummaryKPI.orgWellnessScore}점`,
      sub: "7개 직무스트레스 영역 종합",
      trend: `+${mockSummaryKPI.wellnessScoreDelta}점 개선`,
      icon: ShieldCheck,
      color: "amber",
      bgGradient: "from-amber-50/50 to-white",
    },
  ];

  return (
    <section id="overview-kpi" className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">
            조직 마음건강 및 대시보드 지표 총괄
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            2026년 9월 누적 운영 현황 및 48개 핵심 지표 요약
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className={`p-5 rounded-2xl bg-white border border-gray-100 shadow-xs flex flex-col justify-between transition-all duration-200 hover:shadow-md hover:-translate-y-0.5`}
            >
              <div className="flex items-start justify-between">
                <span className="text-xs font-semibold text-gray-500">{card.title}</span>
                <div className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center text-gray-700">
                  <Icon size={18} weight="bold" />
                </div>
              </div>
              <div className="mt-4">
                <div className="text-2xl font-extrabold text-gray-900 tracking-tight tabular-nums">
                  {card.value}
                </div>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-50 text-[11px]">
                  <span className="text-gray-400">{card.sub}</span>
                  <span className="font-semibold text-emerald-600 flex items-center gap-0.5">
                    <ArrowUpRight size={12} weight="bold" />
                    {card.trend}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
