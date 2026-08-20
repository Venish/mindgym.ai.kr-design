"use client";

import React from "react";
import { motion } from "framer-motion";

export function AnimatedMorningSun({ size = 48, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* 360도 무한 회전하는 아침 햇살 살 모션 */}
      <motion.g
        animate={{ rotate: [0, 360] }}
        transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
        style={{ transformOrigin: "24px 24px" }}
      >
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <line
            key={i}
            x1="24"
            y1="5"
            x2="24"
            y2="9"
            stroke="#FFB236"
            strokeWidth="3.5"
            strokeLinecap="round"
            transform={`rotate(${angle} 24 24)`}
          />
        ))}
      </motion.g>
      {/* 중앙 따스한 해 (고정 원) */}
      <circle
        cx="24"
        cy="24"
        r="9.5"
        fill="#FFD05B"
        stroke="#FFB236"
        strokeWidth="3"
      />
    </svg>
  );
}
