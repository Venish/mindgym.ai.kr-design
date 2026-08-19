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
      <defs>
        {/* 1. 묵직하고 몽환적인 딥 밤하늘 방사형 그라데이션 (Deeper Rich Gradient Contrast) */}
        <radialGradient id="nightRadialAuraGrad" cx="50%" cy="50%" r="52%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="#030712" stopOpacity="1" />
          <stop offset="40%" stopColor="#0F172A" stopOpacity="0.98" />
          <stop offset="72%" stopColor="#1E1B4B" stopOpacity="0.95" />
          <stop offset="90%" stopColor="#312E81" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#6366F1" stopOpacity="0.88" />
        </radialGradient>

        {/* 2. 달 우측 하단 구름 그라데이션 */}
        <linearGradient id="eveningCloudGrad" x1="20" y1="28" x2="42" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#E0E7FF" stopOpacity="0.85" />
        </linearGradient>
      </defs>

      {/* 뚜렷한 외곽선 경계 없이 중앙 부위로 부드럽게 스며드는 방사형 밤하늘 배경 */}
      <circle cx="24" cy="24" r="21.5" fill="url(#nightRadialAuraGrad)" />

      {/* 1. 메인 따스한 달 (Crescent Moon) - 원래 스펙 패스 */}
      <path
        d="M32 15C32 23.8366 24.8366 31 16 31C14.4 31 12.86 30.76 11.42 30.31C16.88 34.62 23.88 35.25 29.6 32.22C35.32 29.19 38.08 22.68 36.5 16.14C35.79 13.2 34.25 10.66 32.32 8.78C32.11 10.78 32 12.87 32 15Z"
        fill="#F59E0B"
        stroke="#D97706"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      {/* 2. 좌측 상단 반짝이는 밤하늘 큰 별 (Sparkle Star 1) */}
      <motion.path
        d="M12 10L13.2 13.8L17 15L13.2 16.2L12 20L10.8 16.2L7 15L10.8 13.8L12 10Z"
        fill="#FBBF24"
        animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.15, 0.8] }}
        transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
        style={{ transformOrigin: "12px 15px" }}
      />



      {/* 4. 달 우측 하단 부드럽고 몽글몽글한 밤 구름 (오른쪽으로 조금 더 이동) */}
      <g transform="translate(4, 0)">
        <path
          d="M 22 38.5 C 20 38.5 18.5 37 18.5 35 C 18.5 33.3 19.7 31.8 21.4 31.4 C 22.1 29 24.3 27.2 27 27.2 C 30.2 27.2 32.8 29.5 33.3 32.5 C 34.2 31.9 35.3 31.5 36.5 31.5 C 39.2 31.5 41.5 33.6 41.5 36.3 C 41.5 37.5 41 38.5 39.5 38.5 Z"
          fill="url(#eveningCloudGrad)"
          stroke="#C7D2FE"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
