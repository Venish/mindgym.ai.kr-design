"use client";

import React, { useState, useEffect } from "react";
import { MetricsHeader } from "./_components/MetricsHeader";
import { MetricsSidebar } from "./_components/MetricsSidebar";
import { MetricOverviewKpi } from "./_components/sections/MetricOverviewKpi";
import { OnboardingAdoptionSection } from "./_components/sections/OnboardingAdoptionSection";
import { ActivationRetentionSection } from "./_components/sections/ActivationRetentionSection";
import { EngagementPatternSection } from "./_components/sections/EngagementPatternSection";
import { RitualsContentSection } from "./_components/sections/RitualsContentSection";
import { OrgWellnessB2bSection } from "./_components/sections/OrgWellnessB2bSection";

export default function MetricsDashboardPage() {
  const [activeSection, setActiveSection] = useState<string>("overview-kpi");

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // 스크롤 위치에 따른 사이드바 하이라이팅
  useEffect(() => {
    const sectionIds = [
      "overview-kpi",
      "onboarding-adoption",
      "activation-retention",
      "engagement-pattern",
      "rituals-content",
      "org-wellness-b2b",
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.2 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main className="fixed inset-0 z-[9999] bg-[var(--color-bg-app,#F8FAFC)] dark:bg-slate-950 text-gray-900 dark:text-slate-100 font-sans flex flex-col w-screen h-screen overflow-hidden transition-colors duration-300">
      {/* 1. 최상단 고정 헤더 */}
      <MetricsHeader />

      {/* 2. 본문 2단 포털 레이아웃 (좌측 고정 사이드바 + 우측 독립 스크롤 메인 뷰포트) */}
      <div className="flex flex-1 overflow-hidden w-full max-w-[1700px] mx-auto">
        {/* 좌측 사이드바 */}
        <MetricsSidebar
          activeSection={activeSection}
          onSelectSection={scrollToSection}
        />

        {/* 우측 독립 스크롤 메인 뷰포트 */}
        <div className="flex-1 overflow-y-auto px-8 py-8 flex flex-col gap-14 scroll-smooth">
          {/* 0. 종합 개요 KPI 요약 카드 */}
          <MetricOverviewKpi />

          {/* 1. 도입 및 온보딩 현황 */}
          <OnboardingAdoptionSection />

          {/* 2. 활성도 및 지속 잔존율 */}
          <ActivationRetentionSection />

          {/* 3. 실행량 및 시간대별 루틴 패턴 */}
          <EngagementPatternSection />

          {/* 4. 리추얼 선호도 및 안전망 분석 */}
          <RitualsContentSection />

          {/* 5. [B2B] 조직 직무스트레스 & 부서 분석 */}
          <OrgWellnessB2bSection />

          {/* 푸터 영역 */}
          <footer className="pt-6 pb-12 border-t border-gray-200/60 text-xs text-gray-400 flex items-center justify-between">
            <div>© 2026 WelbiAI Corp. Mind Gym Analytics Platform. All rights reserved.</div>
            <div className="flex items-center gap-4">
              <span>지표 기준일자: 2026.09.10</span>
              <span>데이터 갱신 주기: 실시간 (Real-time Stream)</span>
            </div>
          </footer>
        </div>
      </div>
    </main>
  );
}
