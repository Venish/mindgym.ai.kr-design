"use client";

import React from "react";
import Image from "next/image";
import { CaretRight } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "framer-motion";
import { useAutoRolling } from "@/hooks/useAutoRolling";

const SCENARIOS = [
  "출근길 숨막힘부터 퇴근 후 번아웃까지, 실전 100% 활용기",
  "출근 전부터 메신저 알림에 숨이 턱 막힐 때?",
  "오후 2시, 모니터 앞인데 뇌가 멈췄을 때?",
  "회의 중 상사나 동료 말에 욱하고 화날 때?",
  "진상 고객·갑질로 멘탈이 바스러졌을 때?",
  "퇴근길, 낮에 들었던 한마디가 계속 맴돌 때?",
  "마감 압박과 자책감으로 무기력해질 때?",
];

/**
 * ShowcaseWorkplaceGuideTipBar
 * - 로고 아이콘 + 6대 오피스 시나리오 3D Marquee 드럼 플립 롤링 바
 */
export function ShowcaseWorkplaceGuideTipBar() {
  const { currentIndex, setIsHovered } = useAutoRolling(SCENARIOS.length, 4000);

  const handleClick = () => {
    // 상세 시트 연동은 추후 작업 예정
    console.log("Open workplace ritual guide sheet, scenario:", SCENARIOS[currentIndex]);
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="w-full bg-theme-card border border-theme-card hover:border-[#009E5C]/60 rounded-xl px-4 py-3 flex items-center justify-between gap-3 cursor-pointer transition-all shadow-2xs group"
    >
      <div className="flex items-center gap-3 min-w-0 flex-1 overflow-hidden">
        {/* 1. 좌측 로고 심볼 아이콘 (천천히 360도 무한 회전) */}
        <div className="w-5 h-5 flex items-center justify-center shrink-0">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="w-[18px] h-[18px] flex items-center justify-center shrink-0"
          >
            <Image
              src="/images/logo_icon.svg"
              alt="MindGym"
              width={18}
              height={18}
              className="w-[18px] h-[18px] object-contain shrink-0"
            />
          </motion.div>
        </div>

        {/* 2. 중앙 연속 롤링 텍스트 영역 (실린더 Marquee) */}
        <div className="flex-1 overflow-hidden h-[20px] relative">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.p
              key={currentIndex}
              initial={{ y: "100%", opacity: 0.3 }}
              animate={{
                y: "0%",
                opacity: 1,
                transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
              }}
              exit={{
                y: "-100%",
                opacity: 0.3,
                transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
              }}
              className="text-[13px] font-medium txt-brand-ink tracking-tight leading-[20px] truncate w-full select-none group-hover:text-[#009E5C] transition-colors"
            >
              {SCENARIOS[currentIndex]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      {/* 3. 우측 바로가기 화살표 (잠시멈춤과 동일한 size=18) */}
      <CaretRight
        size={18}
        className="text-theme-muted group-hover:txt-brand-ink transition-colors shrink-0"
      />
    </div>
  );
}
