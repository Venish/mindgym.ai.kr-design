"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, SpinnerGap } from "@phosphor-icons/react";
import { AnimatedLogoIcon } from "@/components/animated-icons/AnimatedLogoIcon";
import { AuroraText } from "@/components/godui/AuroraText";
import { NumberTicker } from "@/components/godui/NumberTicker";
import { SpotlightCard } from "@/components/godui/SpotlightCard";

interface AnalyzingBridgeViewProps {
  analysisStep: number;
}

export function AnalyzingBridgeView({ analysisStep }: AnalyzingBridgeViewProps) {
  return (
    <motion.div
      key="analyzing"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="flex-1 flex flex-col items-center justify-center text-center px-4 my-auto z-10 gap-6"
    >
      {/* MindGym 심볼 & godui NumberTicker 진행률 수치 */}
      <div className="flex flex-col items-center justify-center gap-1.5 my-2">
        <div className="w-20 h-20 bg-emerald-50/80 text-[#00C474] rounded-3xl flex items-center justify-center border border-emerald-100/90 shadow-soft mb-1">
          <AnimatedLogoIcon size={44} />
        </div>
        <div className="flex items-center text-2xl font-black text-[#00C474] tracking-tight font-mono">
          <NumberTicker value={100} decimalPlaces={1} delay={0.1} className="text-[#00C474] font-black text-2xl" />
          <span className="ml-0.5">%</span>
        </div>
      </div>

      <div>
        <div className="inline-flex items-center gap-1 text-[11px] font-extrabold text-[#00C474] bg-emerald-50 px-3 py-1 rounded-full mb-2">
          <span>✳ KOSS AI REALTIME ANALYSIS</span>
        </div>
        <h2 className="txt-title-section txt-brand-ink leading-snug">
          36개 답변을 바탕으로<br />
          <AuroraText>마음 정원 지도를 작성 중입니다</AuroraText>
        </h2>
        <p className="txt-caption-main txt-brand-clay mt-2">
          8가지 직무 영역 중 지금 어디가 가장 지쳐있는지<br />
          정밀 심리학 지표로 탐색하고 있어요
        </p>
      </div>

      {/* godui SpotlightCard 스포트라이트 체크리스트 박스 */}
      <SpotlightCard
        spotlightColor="rgba(0, 196, 116, 0.16)"
        className="w-full flex flex-col gap-2.5 text-left p-4 bg-white/90 border border-gray-100 rounded-3xl shadow-soft"
      >
        {[
          "직무 요구 · 업무량 패턴 분석 완료",
          "관계 · 소통 및 조직 문화 패턴 분석 완료",
          "감정 소진 및 번아웃 위험도 정밀 분석 완료",
          "개인 맞춤 틈새 처방 리추얼 3가지 선별 완료",
        ].map((stepText, idx) => (
          <div
            key={idx}
            className={`p-3 px-4 rounded-2xl flex items-center gap-3 transition-all duration-300 ${
              analysisStep >= idx + 1
                ? "bg-emerald-50/80 text-emerald-900 font-bold"
                : "bg-gray-50/80 text-gray-400 opacity-50"
            }`}
          >
            {analysisStep >= idx + 1 ? (
              <motion.div
                initial={{ scale: 0, rotate: -30 }}
                animate={{ scale: [0, 1.35, 1], rotate: 0 }}
                transition={{ type: "spring", stiffness: 350, damping: 14 }}
              >
                <CheckCircle size={18} weight="fill" className="text-[#00C474]" />
              </motion.div>
            ) : (
              <SpinnerGap size={18} className="animate-spin text-gray-400" />
            )}
            <span className="txt-caption-main">{stepText}</span>
          </div>
        ))}
      </SpotlightCard>
    </motion.div>
  );
}
