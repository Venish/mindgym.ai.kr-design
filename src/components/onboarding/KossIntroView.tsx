"use client";

import React from "react";
import { motion } from "framer-motion";
import { AnimatedSparkleIcon } from "@/components/animated-icons/AnimatedSparkleIcon";
import { AuroraText } from "@/components/godui/AuroraText";
import { MagicButton } from "@/components/godui/MagicButton";
import { AnimatedArrowRightIcon } from "@/components/animated-icons/AnimatedArrowRightIcon";

interface KossIntroViewProps {
  nickname: string;
  onStart: () => void;
  onSkip: () => void;
}

export function KossIntroView({ nickname, onStart, onSkip }: KossIntroViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.3 }}
      className="flex-1 flex flex-col justify-between my-auto z-10 pt-4 pb-4"
    >
      {/* 수직 정중앙 통합 영역 */}
      <div className="flex-1 flex flex-col items-center justify-center text-center my-auto px-4 pb-12">
        <div className="w-20 h-20 bg-emerald-50/80 text-[#00C474] rounded-3xl flex items-center justify-center border border-emerald-100/90 shadow-soft mb-5">
          <AnimatedSparkleIcon size={44} />
        </div>

        <h1 className="text-[28px] font-black txt-brand-ink leading-snug tracking-tight max-w-sm">
          <span className="block mb-1">
            <span className="text-[#00C474]">{nickname}</span> 님,
          </span>
          지금 마음 상태를 <br />
          <AuroraText className="inline-block mt-1">체크해 볼게요</AuroraText>
        </h1>

        <p className="txt-caption-main text-gray-500 leading-relaxed max-w-xs text-center mt-3 font-normal mb-6">
          36개 질문으로 최근 나의 마음 상태를 살펴봐요. <br />
          결과를 바탕으로 나에게 맞는 맞춤 리추얼을 추천해 드려요.
        </p>
      </div>

      {/* 하단 메인 CTA 시작 버튼 & 다음에 하기 보조 버튼 */}
      <div className="w-full pt-2 pb-2 shrink-0 z-10 flex flex-col gap-2">
        <MagicButton onClick={onStart} className="w-full" rightIcon={<AnimatedArrowRightIcon size={18} />}>
          <span>마음 상태 체크 시작</span>
        </MagicButton>

        <MagicButton
          onClick={onSkip}
          variant="ghost"
          className="w-full text-gray-400 hover:text-gray-600 font-medium py-2 text-sm"
        >
          <span>다음에 하기</span>
        </MagicButton>

      </div>
    </motion.div>
  );
}
