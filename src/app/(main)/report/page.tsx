"use client";

import React, { useState } from "react";
import { ChartBar, CalendarCheck, Sparkle, Trophy, ArrowRight, Gear, Info } from "@phosphor-icons/react";
import { NeumorphCard } from "@/components/godui/NeumorphCard";
import { SpotlightCard } from "@/components/godui/SpotlightCard";
import { NumberTicker } from "@/components/godui/NumberTicker";
import { AnimatedTooltip } from "@/components/godui/AnimatedTooltip";
import { IntentionWizardModal } from "@/components/modals/IntentionWizardModal";
import { useMindGym } from "@/context/MindGymContext";

export function ReportPage() {
  const { userName, totalDumbbells, completedDays, restDays, currentIntention, getLevelName, getLevelNumber } = useMindGym();
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  const levelName = getLevelName();
  const levelNum = getLevelNumber();

  const domainScores = [
    { name: "물리환경", score: 32.5, status: "양호", color: "#00C474" },
    { name: "직무요구", score: 68.0, status: "위험", color: "#E53935" },
    { name: "직무자율", score: 55.2, status: "주의", color: "#FB8C00" },
    { name: "관계갈등", score: 41.0, status: "양호", color: "#00C474" },
    { name: "직업불안정", score: 38.0, status: "양호", color: "#00C474" },
    { name: "조직체계", score: 52.1, status: "주의", color: "#FB8C00" },
    { name: "보상부적절", score: 61.4, status: "주의", color: "#FB8C00" },
    { name: "직장문화", score: 45.0, status: "주의", color: "#FB8C00" },
  ];

  return (
    <div className="flex-1 flex flex-col gap-5 p-5 bg-white">
      {/* Header */}
      <div>
        <span className="text-[10px] font-bold text-[#00C474] bg-emerald-50 px-2.5 py-1 rounded-full">
          진단 및 누적 아카이브
        </span>
        <h2 className="text-xl font-black text-gray-900 mt-1">
          KOSS 리포트 & 아카이브 📊
        </h2>
        <p className="text-xs font-medium text-gray-500 mt-0.5">
          내 직무 스트레스 8대 영역 진단 수치와 지난 정원 수집 기록입니다.
        </p>
      </div>

      {/* 종합 명예 서재 스탯 카드 (SpotlightCard 적용) */}
      <SpotlightCard
        spotlightColor="rgba(255, 255, 255, 0.25)"
        className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white flex flex-col gap-3 p-5 rounded-3xl"
      >
        <div className="flex justify-between items-center text-xs font-bold opacity-90">
          <span>{userName}님의 마음 명예 트로피</span>
          <div className="flex items-center gap-1.5 bg-white/20 px-2.5 py-0.5 rounded-full">
            <span>Lv.{levelNum} {levelName}</span>
            <AnimatedTooltip content={`다음 승급까지 덤벨 5개 필요`}>
              <Info size={14} className="cursor-pointer text-white/80 hover:text-white" />
            </AnimatedTooltip>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center py-2 bg-white/10 rounded-2xl">
          <div>
            <p className="text-[10px] opacity-80 font-bold">누적 실천일</p>
            <p className="text-lg font-black text-white tabular-nums flex items-center justify-center">
              <NumberTicker value={completedDays.length} />일
            </p>
          </div>
          <div className="border-x border-white/20">
            <p className="text-[10px] opacity-80 font-bold">자연스러운 쉼</p>
            <p className="text-lg font-black text-emerald-200 tabular-nums flex items-center justify-center">
              <NumberTicker value={restDays.length} />일
            </p>
          </div>
          <div>
            <p className="text-[10px] opacity-80 font-bold">보유 덤벨</p>
            <p className="text-lg font-black text-amber-300 tabular-nums flex items-center justify-center">
              <NumberTicker value={totalDumbbells} />개
            </p>
          </div>
        </div>
      </SpotlightCard>

      {/* 이달의 나 지향 감정어 관리 */}
      <NeumorphCard className="flex items-center justify-between border border-emerald-100">
        <div>
          <span className="text-[10px] font-bold text-gray-400">현재 선언된 지향점</span>
          <h4 className="text-sm font-extrabold text-gray-900 mt-0.5">"{currentIntention}"</h4>
        </div>
        <button
          onClick={() => setIsWizardOpen(true)}
          className="py-2 px-3 bg-emerald-50 text-[var(--color-brand-green)] font-bold text-xs rounded-xl flex items-center gap-1 hover:bg-emerald-100 active:scale-[0.96] transition-all"
        >
          <Gear size={14} />
          <span>지향점 변경</span>
        </button>
      </NeumorphCard>

      {/* KOSS 8대 영역 수치 바 */}
      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-extrabold text-gray-900 flex items-center gap-1.5">
          <span>🎯 KOSS 8대 영역 정밀 진단</span>
          <AnimatedTooltip content="한국인 직무 스트레스 측정 도구 8개 하부 요인 점수">
            <Info size={16} className="text-gray-400 cursor-pointer hover:text-gray-600" />
          </AnimatedTooltip>
        </h3>

        <div className="grid grid-cols-1 gap-2.5">
          {domainScores.map((d) => (
            <div key={d.name} className="bg-gray-50 p-3 rounded-2xl flex flex-col gap-1.5">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-gray-800 flex items-center gap-1">
                  {d.name}
                  <AnimatedTooltip content={`${d.name} 평가 지수: ${d.score}점 (${d.status})`}>
                    <Info size={12} className="text-gray-400 cursor-pointer" />
                  </AnimatedTooltip>
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 tabular-nums flex items-center gap-0.5">
                    <NumberTicker value={d.score} />점
                  </span>
                  <span
                    className="px-2 py-0.5 rounded text-[10px] font-black text-white"
                    style={{ backgroundColor: d.color }}
                  >
                    {d.status}
                  </span>
                </div>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${d.score}%`, backgroundColor: d.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 과거 마음 정원 월간 컬렉션 (P-19) */}
      <div className="flex flex-col gap-3 pt-2">
        <h3 className="text-sm font-extrabold text-gray-900">🗓️ 지난 월간 정원 아카이브 컬렉션</h3>

        <div className="grid grid-cols-2 gap-3">
          {[
            { month: "2026년 7월 정원", count: 28, badge: "🏆 7월 완성자" },
            { month: "2026년 6월 정원", count: 25, badge: "🌱 초록 마스터" },
          ].map((item) => (
            <NeumorphCard key={item.month} className="p-4 flex flex-col gap-2 border border-gray-50">
              <span className="text-[10px] font-bold text-gray-400">{item.month}</span>
              <h4 className="text-xs font-extrabold text-gray-900">실천 완료: {item.count}일</h4>
              <span className="text-[10px] font-bold text-[#00C474] bg-emerald-50 px-2 py-0.5 rounded self-start">
                {item.badge}
              </span>
            </NeumorphCard>
          ))}
        </div>
      </div>

      {/* Intention Wizard Modal */}
      <IntentionWizardModal isOpen={isWizardOpen} onClose={() => setIsWizardOpen(false)} />
    </div>
  );
}

export default ReportPage;
