"use client";

import React from "react";
import { motion } from "framer-motion";
import { MagicButton } from "@/components/godui/MagicButton";
import { AnimatedArrowRightIcon } from "@/components/animated-icons/AnimatedArrowRightIcon";

interface MonthlyIntentionViewProps {
  selectedKeyword: string;
  onNext: () => void;
}

export function MonthlyIntentionView({ selectedKeyword, onNext }: MonthlyIntentionViewProps) {
  return (
    <motion.div
      key="monthly_intention"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="flex-1 flex flex-col justify-between my-auto z-10 pt-4 pb-4 gap-6 text-left"
    >
      <div className="flex flex-col gap-5 pt-2">
        {/* 상단 파스텔 히어로 카드 */}
        <div className="p-6 bg-gradient-to-br from-emerald-600 to-[#00C474] text-white rounded-3xl shadow-card text-center relative overflow-hidden">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-3 backdrop-blur-sm shadow-soft">
            🌿
          </div>
          <span className="text-xs font-bold text-white/80 uppercase tracking-wider block mb-1">
            이달의 나 · 8월
          </span>
          <h2 className="text-2xl font-black tracking-tight mb-1">{selectedKeyword}</h2>
          <p className="text-xs text-white/90 font-medium">이달을 함께 살아가기로 했어요 🌙</p>
        </div>

        {/* 안내 가이드 카드 3종 */}
        <div className="p-4 bg-[#F8FAF9] border border-gray-100 rounded-2xl flex flex-col gap-3.5 shadow-soft">
          <span className="text-xs font-extrabold text-gray-800">앞으로 이런 순간들에 함께할게요</span>
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#00C474] flex items-center justify-center text-sm font-bold shrink-0">
              ☀️
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-gray-900">매일 아침 체크인</span>
              <span className="text-[11px] text-gray-500 font-medium">
                "오늘도 {selectedKeyword} 하루를 만들어볼까요?"
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center text-sm font-bold shrink-0">
              🏋️
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-gray-900">리추얼 완료 후</span>
              <span className="text-[11px] text-gray-500 font-medium">
                "{selectedKeyword}에 한 걸음 더"
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-sm font-bold shrink-0">
              🌙
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-gray-900">월말 함께 돌아보기</span>
              <span className="text-[11px] text-gray-500 font-medium">
                "{selectedKeyword}, 어떠셨나요?"
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 공통 MagicButton 적용 */}
      <MagicButton onClick={onNext} className="w-full mt-2">
        <span>✨ {selectedKeyword}를 위한 첫 번째 리추얼</span>
      </MagicButton>
    </motion.div>
  );
}
