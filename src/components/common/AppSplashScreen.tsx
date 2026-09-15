"use client";

import React from "react";
import { motion } from "framer-motion";
import { AnimatedLogoIcon } from "@/components/animated-icons/AnimatedLogoIcon";
import { AnimatedLogoText } from "@/components/animated-icons/AnimatedLogoText";

interface AppSplashScreenProps {
  onFinish?: () => void;
}

/**
 * AppSplashScreen: 새로고침 및 앱 초기 구동 시 100% 동일하게 렌더링되는 공식 스플래시 로고 로딩 컴포넌트
 * 기존 디자인(로고 아이콘 5개 잎 순차 모션 + 텍스트 솟구침) 100% 보존
 */
export function AppSplashScreen({}: AppSplashScreenProps) {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2, ease: "easeOut" } }}
      className="fixed inset-0 z-[9999] max-w-[430px] mx-auto flex flex-col items-center justify-center bg-theme-app p-6 pb-20 min-h-screen min-h-[100dvh] select-none transition-colors duration-200"
    >
      {/* 상단: 5개 잎 순차 모션 AnimatedLogoIcon, 하단: 한 자씩 솟구치는 AnimatedLogoText */}
      <div className="flex flex-col items-center gap-3">
        <AnimatedLogoIcon size={64} />
        <AnimatedLogoText height={28} className="mt-1" />
      </div>
    </motion.div>
  );
}
