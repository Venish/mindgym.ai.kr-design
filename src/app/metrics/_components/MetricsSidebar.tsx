"use client";

import React from "react";
import {
  Sparkle,
  FunnelSimple,
  UsersThree,
  Fire,
  Heartbeat,
  Flower,
  ChartPieSlice,
} from "@phosphor-icons/react";

interface MetricsSidebarProps {
  activeSection: string;
  onSelectSection: (id: string) => void;
}

export function MetricsSidebar({ activeSection, onSelectSection }: MetricsSidebarProps) {
  const menuGroups = [
    {
      title: "OVERVIEW",
      items: [
        { id: "overview-kpi", label: "핵심 요약 KPI (Executive)", icon: Sparkle },
      ],
    },
    {
      title: "사용 현황 분석",
      items: [
        { id: "onboarding-adoption", label: "1. 도입 및 가입 퍼널", icon: FunnelSimple },
        { id: "activation-retention", label: "2. 활성도 및 잔존 (코호트)", icon: UsersThree },
        { id: "engagement-pattern", label: "3. 실행량 및 시간대 패턴", icon: Fire },
        { id: "rituals-content", label: "4. 리추얼 & 테마 선호도", icon: Flower },
      ],
    },
    {
      title: "B2B 마음건강 리포트",
      items: [
        { id: "org-wellness-b2b", label: "5. 조직 직무스트레스 & 부서", icon: Heartbeat },
      ],
    },
  ];

  return (
    <aside className="w-64 border-r border-[var(--color-border-card,#E5E7EB)] bg-white/60 backdrop-blur-sm p-4 flex flex-col justify-between shrink-0 h-full overflow-y-auto">
      <div className="flex flex-col gap-6">
        {menuGroups.map((group, gIdx) => (
          <div key={gIdx} className="flex flex-col gap-1.5">
            <h4 className="text-[11px] font-bold text-gray-400 px-3 uppercase tracking-wider">
              {group.title}
            </h4>
            <div className="flex flex-col gap-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onSelectSection(item.id)}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-left transition-all duration-150 ${
                      isActive
                        ? "bg-indigo-600 text-white shadow-sm"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                  >
                    <Icon size={16} weight={isActive ? "bold" : "regular"} className="shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* 하단 시스템 정보 */}
      <div className="p-3 bg-indigo-50/60 rounded-xl border border-indigo-100/50 flex flex-col gap-1 text-[11px] text-indigo-900 mt-4">
        <div className="font-bold flex items-center gap-1.5">
          <ChartPieSlice size={14} className="text-indigo-600" />
          <span>대시보드 지표 0910 기준</span>
        </div>
        <p className="text-indigo-700/80 leading-relaxed text-[10px]">
          전체 48개 운영/B2B 핵심 지표가 실시간 연동되어 표출됩니다.
        </p>
      </div>
    </aside>
  );
}
