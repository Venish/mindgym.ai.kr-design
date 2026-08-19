"use client";

import React from "react";
import { motion } from "framer-motion";
import { Warning } from "@phosphor-icons/react";
import { AuroraText } from "@/components/godui/AuroraText";
import { MagicButton } from "@/components/godui/MagicButton";
import { BklitRadarChart } from "@/components/ui/BklitRadarChart";
import { AnimatedArrowRightIcon } from "@/components/animated-icons/AnimatedArrowRightIcon";

interface KossResultViewProps {
  onNext: () => void;
}

export function KossResultView({ onNext }: KossResultViewProps) {
  const radarMetrics = [
    { key: "demand", label: "직무요구" },
    { key: "autonomy", label: "자율성" },
    { key: "culture", label: "조직문화" },
    { key: "reward", label: "보상부적절" },
    { key: "relation", label: "관계갈등" },
    { key: "wlb", label: "직업불안정" },
    { key: "environment", label: "물리환경" },
    { key: "stability", label: "조직체계" },
  ];

  const radarData = [
    {
      name: "내 스트레스",
      label: "내 스트레스",
      color: "#00C474",
      values: {
        demand: 8,
        autonomy: 5,
        culture: 7,
        reward: 6,
        relation: 4,
        wlb: 6,
        environment: 3,
        stability: 5,
      },
    },
  ];

  return (
    <motion.div
      key="result"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.3 }}
      className="flex-1 flex flex-col justify-between my-auto z-10 pt-2 pb-4 gap-4 text-left"
    >
      <div className="flex flex-col gap-3">
        {/* 상단 subheader 및 배지 */}
        <div className="flex justify-between items-center pt-2">
          <span className="text-[11px] font-medium text-gray-400">
            2026.08.12 기준 · KOSS 36문항
          </span>
          <span className="text-[11px] font-bold text-[#00C474] bg-emerald-50/80 px-2.5 py-0.5 rounded-full border border-emerald-100">
            진단 완료
          </span>
        </div>

        {/* 메인 타이틀 */}
        <div>
          <h1 className="text-[26px] font-black txt-brand-ink leading-tight">
            종합 스트레스 지도
          </h1>
          <p className="text-xs txt-brand-clay mt-1 font-medium">
            최근 나의 마음 상태를 8가지 지표로 직관적으로 시각화했어요.
          </p>
        </div>

        {/* Bklit 레이더 차트 */}
        <div className="w-full flex justify-center items-center py-2 my-1 overflow-visible">
          <BklitRadarChart
            metrics={radarMetrics}
            data={radarData}
            size={350}
            levels={5}
          />
        </div>

        {/* 집중 관리 영역 카드 */}
        <div className="relative overflow-hidden bg-amber-50/80 rounded-3xl p-5 text-left flex flex-col gap-2">
          <div className="absolute -right-3 -bottom-3 text-amber-500/25 pointer-events-none select-none z-0">
            <Warning size={130} weight="bold" />
          </div>

          <div className="relative z-10 flex justify-between items-center">
            <span className="text-xs font-extrabold text-amber-700 bg-amber-100/90 px-3 py-1 rounded-full flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              집중 케어 필요 영역
            </span>
          </div>

          <div className="relative z-10">
            <h3 className="text-xl font-black txt-brand-ink tracking-tight mt-1">
              직무 요구도 · 8점
            </h3>
            <p className="text-xs txt-brand-clay leading-relaxed mt-1.5 font-medium">
              업무량과 속도 관련 스트레스가 높아요. <br />
              맞춤 루틴으로 함께 관리해드릴게요.
            </p>
          </div>
        </div>
      </div>

      {/* 메인 CTA 버튼 */}
      <div className="pt-2">
        <MagicButton onClick={onNext} className="w-full" rightIcon={<AnimatedArrowRightIcon size={18} />}>
          <span>이달의 나 설정하기</span>
        </MagicButton>
      </div>
    </motion.div>
  );
}
