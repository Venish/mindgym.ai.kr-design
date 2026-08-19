"use client";

import React from "react";
import { motion } from "framer-motion";

export function AnimatedSprout({ size = 24, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <motion.path
        d="M4 20H20"
        stroke="#55DFA0"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.4 }}
      />
      <motion.path
        d="M12 20C12 15 11 11 15 8"
        stroke="#00C474"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
      />
      <motion.path
        d="M15 8C17.5 8 19 6 18 4C16 3 14 5.5 15 8Z"
        fill="#00C474"
        initial={{ scale: 0, originX: "15px", originY: "8px" }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 220, damping: 10, delay: 0.7 }}
      />
      <motion.path
        d="M11.5 13C9 13 8 11.5 9 10C10.5 9 11.5 11.5 11.5 13Z"
        fill="#55DFA0"
        initial={{ scale: 0, originX: "11.5px", originY: "13px" }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.9 }}
      />
    </svg>
  );
}
