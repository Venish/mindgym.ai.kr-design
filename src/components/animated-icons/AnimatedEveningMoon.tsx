"use client";

import React from "react";
import { motion } from "framer-motion";

export function AnimatedEveningMoon({ size = 48, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* 1. 밤하늘 은은한 후광 달빛 링 오라 펄스 모션 */}
      <motion.circle
        cx="24"
        cy="24"
        r="18"
        fill="none"
        stroke="#818CF8"
        strokeWidth="1.5"
        strokeDasharray="3 3"
        animate={{ rotate: [0, 360], opacity: [0.2, 0.45, 0.2] }}
        transition={{ repeat: Infinity, duration: 16, ease: "linear" }}
        style={{ transformOrigin: "24px 24px" }}
      />

      {/* 2. 메인 따스한 달 (Crescent Moon) 부유 & 미세 기울기 모션 */}
      <motion.path
        d="M32 15C32 23.8366 24.8366 31 16 31C14.4 31 12.86 30.76 11.42 30.31C16.88 34.62 23.88 35.25 29.6 32.22C35.32 29.19 38.08 22.68 36.5 16.14C35.79 13.2 34.25 10.66 32.32 8.78C32.11 10.78 32 12.87 32 15Z"
        fill="#F59E0B"
        stroke="#D97706"
        strokeWidth="2.5"
        strokeLinejoin="round"
        animate={{ y: [-2, 2, -2], rotate: [-4, 4, -4] }}
        transition={{ repeat: Infinity, duration: 4.2, ease: "easeInOut" }}
        style={{ transformOrigin: "24px 24px" }}
      />

      {/* 3. 좌측 상단 반짝이는 밤하늘 큰 별 (Sparkle Star 1) */}
      <motion.path
        d="M12 10L13.2 13.8L17 15L13.2 16.2L12 20L10.8 16.2L7 15L10.8 13.8L12 10Z"
        fill="#FBBF24"
        animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.15, 0.8] }}
        transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
        style={{ transformOrigin: "12px 15px" }}
      />

      {/* 4. 우측 하단 작은 별 (Sparkle Star 2) */}
      <motion.path
        d="M36 31L36.8 33.2L39 34L36.8 34.8L36 37L35.2 34.8L33 34L35.2 33.2L36 31Z"
        fill="#FDE68A"
        animate={{ opacity: [0.2, 0.9, 0.2], scale: [0.75, 1.1, 0.75] }}
        transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut", delay: 0.6 }}
        style={{ transformOrigin: "36px 34px" }}
      />

      {/* 5. 우측 상단 미세 꼬마 별 (Sparkle Star 3) */}
      <motion.circle
        cx="38"
        cy="12"
        r="1.5"
        fill="#E0E7FF"
        animate={{ opacity: [0.2, 1, 0.2] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut", delay: 1.1 }}
      />
    </svg>
  );
}
