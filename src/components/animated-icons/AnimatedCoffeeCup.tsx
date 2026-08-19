"use client";

import React from "react";
import { motion } from "framer-motion";

export function AnimatedCoffeeCup({ size = 24, className = "" }: { size?: number; className?: string }) {
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
        d="M8 5C8.5 4 8.5 3 9 2"
        stroke="#A0AEC0"
        strokeWidth="1.5"
        strokeLinecap="round"
        animate={{ y: [2, -1, 2], opacity: [0.3, 0.8, 0.3] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
      />
      <motion.path
        d="M12 4.5C12.5 3.5 12.5 2.5 13 1.5"
        stroke="#A0AEC0"
        strokeWidth="1.5"
        strokeLinecap="round"
        animate={{ y: [1, -2, 1], opacity: [0.4, 0.9, 0.4] }}
        transition={{ repeat: Infinity, duration: 2.1, ease: "easeInOut", delay: 0.3 }}
      />
      <motion.path
        d="M16 5C16.5 4 16.5 3 17 2"
        stroke="#A0AEC0"
        strokeWidth="1.5"
        strokeLinecap="round"
        animate={{ y: [2, -1, 2], opacity: [0.3, 0.8, 0.3] }}
        transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut", delay: 0.6 }}
      />
      <path
        d="M5 8H19V14C19 16.5 17 18.5 14.5 18.5H9.5C7 18.5 5 16.5 5 14V8Z"
        fill="#F8FAFC"
        stroke="#A0AEC0"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M19 10C21 10 22 11 22 12.5C22 14 21 15 19 15"
        stroke="#A0AEC0"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M3 21H21"
        stroke="#A0AEC0"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
