"use client";

import React, { useState, useEffect } from "react";
import { DesignGuideHeader } from "./_components/DesignGuideHeader";
import { DesignGuideSidebar } from "./_components/DesignGuideSidebar";
import { ColorSystemSection } from "./_components/ColorSystemSection";
import { RadiusSystemSection } from "./_components/RadiusSystemSection";
import { TypographySection } from "./_components/TypographySection";
import { ButtonSystemSection } from "./_components/ButtonSystemSection";
import { BadgeChipSection } from "./_components/BadgeChipSection";
import { RitualSystemSection } from "./_components/RitualSystemSection";
import { FormControlsSection } from "./_components/FormControlsSection";
import { AuroraHeroSection } from "./_components/AuroraHeroSection";
import { MotionIconSection } from "./_components/MotionIconSection";
import { FlatTemplatesSection } from "./_components/FlatTemplatesSection";
import { FlatComponentsSection } from "./_components/FlatComponentsSection";

export default function DesignGuidePage() {
  const [activeSection, setActiveSection] = useState<string>("colors");

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // IntersectionObserver로 스크롤 시 현재 보는 섹션 자동 하이라이팅
  useEffect(() => {
    const sectionIds = [
      "colors",
      "radius",
      "typography",
      "buttons",
      "badges",
      "rituals",
      "forms",
      "flat-components",
      "templates",
      "aurora-hero",
      "motion",
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.25 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main className="fixed inset-0 z-[9999] bg-white text-[#191F28] font-sans flex flex-col w-screen h-screen overflow-hidden">
      {/* 1. 최상단 고정 헤더 (상단 탭 제거 및 깔끔한 로고/Hero 보존) */}
      <DesignGuideHeader />

      {/* 2. 본문 2단 포털 레이아웃 (Left Sidebar 260px + Right Viewport) */}
      <div className="flex flex-1 overflow-hidden w-full max-w-[1600px] mx-auto">
        {/* 좌측 고정 디자인 시스템 카테고리 사이드바 */}
        <DesignGuideSidebar
          activeSection={activeSection}
          onSelectSection={scrollToSection}
        />

        {/* 우측 독립 스크롤 메인 뷰포트 영역 */}
        <div className="flex-1 overflow-y-auto px-8 py-10 flex flex-col gap-16">
          {/* 1. Color System & Ratio */}
          <ColorSystemSection />

          {/* 2. Concentric Border Radius System Scale */}
          <RadiusSystemSection />

          {/* 3. Typography System */}
          <TypographySection />

          {/* 3. Button & Action System */}
          <ButtonSystemSection />

          {/* 4. Badges, Tags & Emotion Chips */}
          <BadgeChipSection />

          {/* 5. Ritual Component System */}
          <RitualSystemSection />

          {/* 6. Form Controls */}
          <FormControlsSection />

          {/* 7. Real Flat Dashboard Components */}
          <FlatComponentsSection />

          {/* 8. Flat Dashboard Template Architecture */}
          <FlatTemplatesSection />

          {/* 9. Aurora Mouse Hover Hero Cards */}
          <AuroraHeroSection />

          {/* 10. Motion & Icons */}
          <MotionIconSection />

          {/* 푸터 */}
          <footer className="border-t border-gray-200 bg-white p-6 rounded-2xl text-center text-xs text-gray-400 font-medium">
            © 2026 MindGym · Design System Standard Specification (Figma & Toss TDS Portal Specification)
          </footer>
        </div>
      </div>
    </main>
  );
}
